"use client";

// src/components/MarketingBannerStrip.jsx
//
// Public landing-page strip. Fetches ACTIVE banners from
//   GET <API_BASE>/api/cms/marketing-banner/public     (no auth, no admin data)
// and renders each one with the same look as the admin "Live preview".
//
// Mount it at the very top of the landing page layout:
//     <MarketingBannerStrip />
// If your landing page already has a banner component, either replace its data source
// with this endpoint or render this one instead (don't render both → duplicate banners).

import React, { useEffect, useState } from "react";

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:9000/api"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const DISMISS_KEY = "texora_dismissed_marketing_banners";

const resolveUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${API_BASE}${url}`;
  return "";
};

// Only http(s) or site-relative links are ever rendered as hrefs.
const safeLink = (url) => (/^(https?:\/\/[^\s]+|\/(?!\/)[^\s]*)$/i.test(url || "") ? url : null);

const readDismissed = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem(DISMISS_KEY) || "[]");
  } catch {
    return [];
  }
};

const MarketingBannerStrip = () => {
  const [banners, setBanners] = useState([]);
  const [dismissed, setDismissed] = useState([]);

  useEffect(() => {
    setDismissed(readDismissed());
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cms/marketing-banner/public`);
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data)) setBanners(data);
      } catch {
        /* no banner is shown if the API is unreachable */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const close = (id) => {
    const next = [...dismissed, id];
    setDismissed(next);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const visible = banners.filter((b) => b.enabled && !dismissed.includes(b.id));
  if (visible.length === 0) return null;

  return (
    <div className="texora-banner-stack">
      {visible.map((b) => {
        const href = safeLink(b.buttonLink);
        const logo = resolveUrl(b.logoUrl);
        return (
          <div key={b.id} className="texora-banner" role="region" aria-label={b.headline}>
            {logo ? (
              <img className="texora-banner__logo" src={logo} alt={b.logoAlt || ""} />
            ) : b.logoAlt ? (
              <div className="texora-banner__logo-fallback">{b.logoAlt}</div>
            ) : null}
            <div className="texora-banner__divider" />
            <span className="texora-banner__headline">{b.headline}</span>
            {b.description && (
              <>
                <div className="texora-banner__divider texora-banner__desc-part" />
                <span className="texora-banner__desc texora-banner__desc-part">{b.description}</span>
              </>
            )}
            {href && (
              <a
                className="texora-banner__cta"
                href={href}
                {...(b.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {b.buttonText} →
              </a>
            )}
            {b.dismissible && (
              <button
                type="button"
                className="texora-banner__close"
                aria-label="Close banner"
                onClick={() => close(b.id)}
              >
                ✕
              </button>
            )}
          </div>
        );
      })}

      <style>{`
        .texora-banner { display:flex; align-items:center; gap:14px; padding:8px 16px;
          background:#fdf0e6; border-bottom:1px solid #f1dcc8; overflow-x:auto; }
        .texora-banner__logo { height:28px; width:auto; object-fit:contain; flex-shrink:0; }
        .texora-banner__logo-fallback { flex-shrink:0; height:28px; padding:0 14px; display:flex;
          align-items:center; background:#1e3a8a; color:#fff; font-size:12px; font-weight:600; }
        .texora-banner__divider { width:1px; height:22px; background:#d6c7b8; flex-shrink:0; }
        .texora-banner__headline { font-size:13px; font-weight:500; color:#1f2937; white-space:nowrap; }
        .texora-banner__desc { flex:1; min-width:0; font-size:11px; color:#6b7280; white-space:nowrap;
          overflow:hidden; text-overflow:ellipsis; }
        .texora-banner__cta { flex-shrink:0; margin-left:auto; padding:6px 14px; border-radius:6px;
          background:#f97316; color:#fff; font-size:12px; font-weight:600; white-space:nowrap; text-decoration:none; }
        .texora-banner__close { flex-shrink:0; background:none; border:none; color:#374151;
          font-size:16px; cursor:pointer; padding:0 2px; }
        @media (max-width: 640px) {
          .texora-banner__logo { height:22px; }
          .texora-banner__logo-fallback { height:22px; }
          .texora-banner__desc-part { display:none; }
        }
      `}</style>
    </div>
  );
};

export default MarketingBannerStrip;
