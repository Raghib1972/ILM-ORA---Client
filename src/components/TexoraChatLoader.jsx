
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SCRIPT_URL = "https://widget.toracx.texora.ai/widget.js";

const DASHBOARD_ROUTES = [
  "/student",
  "/trainer",
  "/admin",
  "/business",
  "/partnership",
  "/superadmin",
];

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

export default function TexoraChatLoader() {
  const pathname = usePathname();

  const isDashboard = DASHBOARD_ROUTES.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    if (isDashboard) {
      removeTexoraWidget();

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
    removeTexoraWidget();

    const script = document.createElement("script");

    script.src = SCRIPT_URL;
    script.async = true;
    script.dataset.organizationId =
      "6ac8af9e340454bd184149a6";
    script.dataset.apiKey =
      process.env.NEXT_PUBLIC_TORACX_API_KEY || "";

    document.body.appendChild(script);

    return () => {
      removeTexoraWidget();
    };
  }, [isDashboard]);

  return null;
}
