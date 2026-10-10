"use client";

// src/pages/Landing/components/TexoraFloatingWidget.jsx

import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import texoraLogo from "../../../assets/texora-logo.webp";
import "./texora-floating-widget.css";

const TEXORA_URL = "https://texora.ai/";

const TexoraFloatingWidget = () => {
    const [isOpen, setIsOpen] = useState(true);
  const bannerRef = useRef(null);

  // Tell the fixed Navbar how much banner is currently visible,
  // so the Navbar sits right below the banner (and snaps to top on scroll/close).
  useEffect(() => {
    const root = document.documentElement;
    const el = bannerRef.current;

    if (!isOpen || !el) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExplore = () => {
    window.open(TEXORA_URL, "_blank", "noopener,noreferrer");
  };

  return (
        <div
      ref={bannerRef}
      className="texora-banner"
      role="region"
      aria-label="Texora AI announcement"
    >
      <div className="texora-banner__inner">
        {/* Logo */}
        <img
          src={texoraLogo.src}
          alt="Texora AI"
          className="texora-banner__logo"
        />

        <span className="texora-banner__divider" aria-hidden="true" />

        {/* Heading */}
        <h3 className="texora-banner__title">
          Simplify HR, Empower Your Workforce
        </h3>

        <span
          className="texora-banner__divider texora-banner__divider--accent"
          aria-hidden="true"
        />

        {/* Summary */}
        <p className="texora-banner__summary">
          All-in-one HR software to manage hiring, payroll, attendance,
          leave, and boost productivity — all from a single platform.
        </p>

        {/* CTA */}
        <button
          type="button"
          className="texora-banner__cta"
          onClick={handleExplore}
        >
          <span>Explore Texora</span>
          <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Close */}
      <button
        type="button"
        className="texora-banner__close"
        onClick={() => setIsOpen(false)}
        aria-label="Close announcement"
      >
        <X size={18} strokeWidth={2.2} />
      </button>
    </div>
  );
};
export default TexoraFloatingWidget;