"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SCRIPT_URL = "https://widget.toracx.texora.ai/widget.js";
const HIDE_STYLE_ID = "texora-chat-hide-style";

// Pure dashboard / internal route prefixes — widget is ALWAYS hidden here.
const DASHBOARD_ROUTES = [
  "/student",
  "/trainer",
  "/admin",
  "/business",
  "/partnership",
  "/superadmin",
  "/workspace",
  "/calendar",
];

// /onboarding is a hybrid route: public landing when logged out, and the
// role dashboard (?section=/student/..., /trainer/..., /admin/...) when
// logged in. The pathname never changes, so login state decides.
const HYBRID_ROUTES = ["/onboarding"];

const matchesRoute = (pathname, route) =>
  pathname === route || pathname.startsWith(`${route}/`);

// Mirrors IlmOraDemoPage: dashboard view = (token || lms_user) && role set.
function isDashboardSession() {
  try {
    const loggedIn =
      !!localStorage.getItem("lms_token") || !!localStorage.getItem("lms_user");
    if (!loggedIn) return false;
    const user = JSON.parse(localStorage.getItem("lms_user") || "{}");
    return !!user?.role;
  } catch {
    return false;
  }
}

function removeTexoraWidget() {
  // Remove the external widget script
  document
    .querySelectorAll(`script[src="${SCRIPT_URL}"]`)
    .forEach((script) => script.remove());

  // Remove the iframe injected by ToraCX
  document
    .querySelectorAll('iframe[src*="widget.toracx.texora.ai"]')
    .forEach((iframe) => iframe.remove());
}

// Extra safety net: if the widget injects a wrapper/button (not only an
// iframe), CSS keeps it invisible while on a hidden route.
function setHideStyle(on) {
  const existing = document.getElementById(HIDE_STYLE_ID);
  if (!on) {
    if (existing) existing.remove();
    return;
  }
  if (existing) return;
  const style = document.createElement("style");
  style.id = HIDE_STYLE_ID;
  style.textContent = `
    iframe[src*="toracx"],
    [id*="toracx" i],
    [class*="toracx" i],
    [id*="tora-cx" i],
    [class*="tora-cx" i] { display: none !important; visibility: hidden !important; }
  `;
  document.head.appendChild(style);
}

export default function TexoraChatLoader() {
  const pathname = usePathname() || "/";

  const isDashboardRoute = DASHBOARD_ROUTES.some((r) =>
    matchesRoute(pathname, r)
  );
  const isHybridRoute = HYBRID_ROUTES.some((r) => matchesRoute(pathname, r));

  // Re-evaluates on refresh, direct URL open, route change, other-tab
  // login/logout (storage event) and same-tab login/logout on /onboarding.
  const [sessionIsDashboard, setSessionIsDashboard] = useState(false);
  useEffect(() => {
    if (!isHybridRoute) return;
    const sync = () => setSessionIsDashboard(isDashboardSession());
    sync();
    window.addEventListener("storage", sync);
    const timer = setInterval(sync, 1000);
    return () => {
      window.removeEventListener("storage", sync);
      clearInterval(timer);
    };
  }, [isHybridRoute, pathname]);

  const hideWidget =
    isDashboardRoute || (isHybridRoute && sessionIsDashboard);

  useEffect(() => {
    if (hideWidget) {
      removeTexoraWidget();
      setHideStyle(true);

      // Keep dashboard clean if the external script tries
      // to inject its iframe again.
      const observer = new MutationObserver(removeTexoraWidget);

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }

    // Load widget only on public pages.
    setHideStyle(false);
    removeTexoraWidget();

    const script = document.createElement("script");

    script.src = SCRIPT_URL;
    script.async = true;
    script.dataset.organizationId = "6ac8af9e340454bd184149a6";
    script.dataset.apiKey = process.env.NEXT_PUBLIC_TORACX_API_KEY || "";

    document.body.appendChild(script);

    return () => {
      removeTexoraWidget();
    };
  }, [hideWidget]);

  return null;
}