// "use client";

// // src/pages/Landing/components/TexoraFloatingWidget.jsx

// import { ArrowRight, X } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import texoraLogo from "../../../assets/texora-logo.webp";
// import "./texora-floating-widget.css";

// const TEXORA_URL = "https://texora.ai/";

// const TexoraFloatingWidget = () => {
//     const [isOpen, setIsOpen] = useState(true);
//   const bannerRef = useRef(null);

//   // Tell the fixed Navbar how much banner is currently visible,
//   // so the Navbar sits right below the banner (and snaps to top on scroll/close).
//   useEffect(() => {
//     const root = document.documentElement;
//     const el = bannerRef.current;

//     if (!isOpen || !el) {
//       root.style.setProperty("--texora-banner-h", "0px");
//       return;
//     }

//     const update = () => {
//       const visible = Math.max(0, el.offsetHeight - window.scrollY);
//       root.style.setProperty("--texora-banner-h", `${visible}px`);
//     };

//     update();
//     window.addEventListener("scroll", update, { passive: true });
//     window.addEventListener("resize", update);
//     const ro = new ResizeObserver(update);
//     ro.observe(el);

//     return () => {
//       window.removeEventListener("scroll", update);
//       window.removeEventListener("resize", update);
//       ro.disconnect();
//       root.style.setProperty("--texora-banner-h", "0px");
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleExplore = () => {
//     window.open(TEXORA_URL, "_blank", "noopener,noreferrer");
//   };

//   return (
//         <div
//       ref={bannerRef}
//       className="texora-banner"
//       role="region"
//       aria-label="Texora AI announcement"
//     >
//       <div className="texora-banner__inner">
//         {/* Logo */}
//         <img
//           src={texoraLogo.src}
//           alt="Texora AI"
//           className="texora-banner__logo"
//         />

//         <span className="texora-banner__divider" aria-hidden="true" />

//         {/* Heading */}
//         <h3 className="texora-banner__title">
//           Simplify HR, Empower Your Workforce
//         </h3>

//         <span
//           className="texora-banner__divider texora-banner__divider--accent"
//           aria-hidden="true"
//         />

//         {/* Summary */}
//         <p className="texora-banner__summary">
//           All-in-one HR software to manage hiring, payroll, attendance,
//           leave, and boost productivity — all from a single platform.
//         </p>

//         {/* CTA */}
//         <button
//           type="button"
//           className="texora-banner__cta"
//           onClick={handleExplore}
//         >
//           <span>Explore Texora</span>
//           <ArrowRight size={16} strokeWidth={2.5} />
//         </button>
//       </div>

//       {/* Close */}
//       <button
//         type="button"
//         className="texora-banner__close"
//         onClick={() => setIsOpen(false)}
//         aria-label="Close announcement"
//       >
//         <X size={18} strokeWidth={2.2} />
//       </button>
//     </div>
//   );
// };
// export default TexoraFloatingWidget;





















"use client";

// src/pages/Landing/components/TexoraFloatingWidget.jsx

import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import texoraLogo from "../../../assets/texora-logo.webp";
import "./texora-floating-widget.css";

// ── API (course-service via gateway) ─────────────────────────────
const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:9000/api"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const DISMISS_KEY = "texora_dismissed_marketing_banners";
const ROTATE_MS = 4500;

// Shown only if the API call fails (server down). An EMPTY list from the API
// means "no active banner" and nothing is shown.
const DEFAULT_BANNER = {
  id: "default",
  enabled: true,
  logoUrl: "",
  logoAlt: "Texora AI",
  headline: "Simplify HR, Empower Your Workforce",
  description:
    "All-in-one HR software to manage hiring, payroll, attendance, leave, and boost productivity — all from a single platform.",
  buttonText: "Explore Texora",
  buttonLink: "https://texora.ai/",
  openInNewTab: true,
  dismissible: true,
};

const resolveUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/")) return `${API_BASE}${url}`;
  return "";
};

// Only http(s) or site-relative links are ever opened.
const safeLink = (url) =>
  /^(https?:\/\/[^\s]+|\/(?!\/)[^\s]*)$/i.test(url || "") ? url : null;

const readDismissed = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem(DISMISS_KEY) || "[]");
  } catch {
    return [];
  }
};

const TexoraFloatingWidget = () => {
  const [banners, setBanners] = useState(null); // null = still loading
  const [dismissed, setDismissed] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const bannerRef = useRef(null);

  // ── Load active banners ──
  useEffect(() => {
    setDismissed(readDismissed());
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cms/marketing-banner/public`);
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!cancelled) setBanners(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setBanners([DEFAULT_BANNER]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const list = (banners || []).filter(
    (b) => b.enabled !== false && !dismissed.includes(b.id),
  );
  const hasBanner = list.length > 0;
  const current = hasBanner ? list[index % list.length] : null;

  // ── Carousel: auto-change every few seconds (pauses on hover / hidden tab) ──
  useEffect(() => {
    if (list.length < 2 || paused) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => (i + 1) % list.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [list.length, paused]);

  // Tell the fixed Navbar how much banner is currently visible,
  // so the Navbar sits right below the banner (and snaps to top on scroll/close).
  useEffect(() => {
    const root = document.documentElement;
    const el = bannerRef.current;

    if (!hasBanner || !el) {
      root.style.setProperty("--texora-banner-h", "0px");
      return;
    }

    const update = () => {
      const visible = Math.max(0, el.offsetHeight - window.scrollY);
      root.style.setProperty("--texora-banner-h", `${visible}px`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
      root.style.setProperty("--texora-banner-h", "0px");
    };
  }, [hasBanner]);

  if (!current) return null;

  const href = safeLink(current.buttonLink);
  const logo =
    current.id === "default" ? texoraLogo.src : resolveUrl(current.logoUrl);

  const handleExplore = () => {
    if (!href) return;
    if (current.openInNewTab) window.open(href, "_blank", "noopener,noreferrer");
    else window.location.href = href;
  };

  const handleClose = () => {
    const next = [...dismissed, current.id];
    setDismissed(next);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      ref={bannerRef}
      className="texora-banner"
      role="region"
      aria-label={current.headline}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={current.id} className="texora-banner__inner texora-banner__slide">
        {/* Logo */}
        {logo ? (
          <>
            <img
              src={logo}
              alt={current.logoAlt || ""}
              className="texora-banner__logo"
            />
            <span className="texora-banner__divider" aria-hidden="true" />
          </>
        ) : null}

        {/* Heading */}
        <h3 className="texora-banner__title">{current.headline}</h3>

        {/* Summary */}
        {current.description && (
          <>
            <span
              className="texora-banner__divider texora-banner__divider--accent"
              aria-hidden="true"
            />
            <p className="texora-banner__summary">{current.description}</p>
          </>
        )}

        {/* CTA */}
        {href && (
          <button
            type="button"
            className="texora-banner__cta"
            onClick={handleExplore}
            style={current.description ? undefined : { marginLeft: "auto" }}
          >
            <span>{current.buttonText}</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Carousel dots (only when more than one banner) */}
      {list.length > 1 && (
        <div className="texora-banner__dots">
          {list.map((b, i) => (
            <button
              key={b.id}
              type="button"
              aria-label={`Show banner ${i + 1}`}
              className={`texora-banner__dot${
                i === index % list.length ? " texora-banner__dot--active" : ""
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}

      {/* Close */}
      {current.dismissible !== false && (
        <button
          type="button"
          className="texora-banner__close"
          onClick={handleClose}
          aria-label="Close announcement"
        >
          <X size={18} strokeWidth={2.2} />
        </button>
      )}
    </div>
  );
};
export default TexoraFloatingWidget;