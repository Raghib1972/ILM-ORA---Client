"use client";

// Locks page scroll while a modal / drawer is open.
// Ref-counted: two stacked overlays don't unlock each other early.
// Compensates the scrollbar width so desktop layout doesn't jump sideways.
import { useEffect } from "react";

let locks = 0;
let prev = null;

export function useLockBodyScroll(active = true) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return undefined;
    const html = document.documentElement;
    const body = document.body;
    if (locks === 0) {
      prev = { overflow: html.style.overflow, pr: body.style.paddingRight };
      const sbw = window.innerWidth - html.clientWidth;
      html.style.overflow = "hidden";
      if (sbw > 0) body.style.paddingRight = `${sbw}px`;
    }
    locks += 1;
    return () => {
      locks = Math.max(0, locks - 1);
      if (locks === 0 && prev) {
        html.style.overflow = prev.overflow;
        body.style.paddingRight = prev.pr;
        prev = null;
      }
    };
  }, [active]);
}

export default useLockBodyScroll;
