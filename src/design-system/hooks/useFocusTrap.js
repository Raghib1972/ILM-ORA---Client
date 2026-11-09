"use client";

// Keeps keyboard focus inside `ref` while `active`, and gives focus back to
// whatever had it before (the button that opened the modal / drawer).
// Reused by ResponsiveModal now and by the mobile drawer in Phase 2a.
import { useEffect } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export function useFocusTrap(ref, active = true) {
  useEffect(() => {
    const root = ref.current;
    if (!active || !root) return undefined;
    const opener = document.activeElement;

    const items = () => Array.from(root.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement);
    const first = items()[0];
    (first || root).focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) {
        e.preventDefault();
        root.focus();
        return;
      }
      const a = list[0];
      const z = list[list.length - 1];
      if (e.shiftKey && (document.activeElement === a || document.activeElement === root)) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("keydown", onKey);
      if (opener && typeof opener.focus === "function" && document.contains(opener)) opener.focus({ preventScroll: true });
    };
  }, [ref, active]);
}

export default useFocusTrap;
