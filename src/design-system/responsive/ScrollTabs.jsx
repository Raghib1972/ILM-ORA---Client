"use client";

// Tab bar that scrolls sideways on narrow screens, fades at the overflowing
// edges, keeps the active tab centred, and supports arrow-key navigation.
//
//   <ScrollTabs ariaLabel="Batch sections" value={tab} onChange={setTab}
//     tabs={[{ id: "overview", label: "Overview" }, { id: "students", label: "Students", icon: <Users size={14}/> }]} />
import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";

export default function ScrollTabs({ tabs, value, onChange, ariaLabel, className = "", style }) {
  const ref = useRef(null);
  const [fade, setFade] = useState({ l: 0, r: 0 });
  const reduced = usePrefersReducedMotion();

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const l = el.scrollLeft > 2 ? 24 : 0;
    const r = el.scrollLeft + el.clientWidth < el.scrollWidth - 2 ? 24 : 0;
    setFade((p) => (p.l === l && p.r === r ? p : { l, r }));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(update);
      ro.observe(el);
    }
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [update, tabs.length]);

  // keep the selected tab in view
  useEffect(() => {
    const el = ref.current;
    const active = el?.querySelector('[aria-selected="true"]');
    if (!el || !active || typeof el.scrollTo !== "function") return;
    el.scrollTo({ left: active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" });
  }, [value, reduced]);

  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === value);
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = tabs.length - 1;
    if (n < 0) return;
    e.preventDefault();
    onChange?.(tabs[n].id);
    requestAnimationFrame(() => ref.current?.querySelector(`[data-tab-id="${tabs[n].id}"]`)?.focus());
  };

  return (
    <div
      ref={ref}
      className={`rs-scroll-x rs-no-bar rs-fade-x ${className}`.trim()}
      style={{ "--rs-fl": `${fade.l}px`, "--rs-fr": `${fade.r}px`, ...style }}
    >
      <div className="rs-tabs" role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            data-tab-id={t.id}
            aria-selected={t.id === value}
            tabIndex={t.id === value ? 0 : -1}
            className="rs-tab"
            onClick={() => onChange?.(t.id)}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
