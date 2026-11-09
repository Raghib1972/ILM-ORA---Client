"use client";

// ═══════════════════════════════════════════════════════════════
// SSR-safe media hooks (Phase 1b)
//
// Built on useSyncExternalStore, so:
//  - the server and the FIRST client render both use the server snapshot
//    -> no hydration mismatch warning in Next.js;
//  - right after hydration React re-renders with the real value;
//  - updates come from matchMedia "change" events (no resize polling).
//
// PREFER CSS (media queries / rs-* classes) for layout. Use these hooks only
// when you must change WHAT renders (e.g. swap a component), not how it looks.
// ═══════════════════════════════════════════════════════════════
import { useCallback, useMemo, useSyncExternalStore } from "react";
import { BP, BP_ORDER, SERVER_DEFAULT_BP } from "../tokens/breakpoints";

const canMatch = () => typeof window !== "undefined" && typeof window.matchMedia === "function";

function listen(mql, cb) {
  if (mql.addEventListener) {
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  }
  mql.addListener(cb); // old Safari
  return () => mql.removeListener(cb);
}

/**
 * @param {string} query e.g. "(min-width: 768px)"
 * @param {boolean} serverValue value assumed on the server + during hydration
 */
export function useMediaQuery(query, serverValue = false) {
  const subscribe = useCallback(
    (cb) => {
      if (!canMatch()) return () => {};
      return listen(window.matchMedia(query), cb);
    },
    [query]
  );
  const getSnapshot = useCallback(() => (canMatch() ? window.matchMedia(query).matches : serverValue), [query, serverValue]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ── Breakpoint name ("base" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl") ──
const BP_QUERIES = Object.entries(BP).map(([name, px]) => [name, `(min-width: ${px}px)`]);

function currentBp() {
  let name = "base";
  for (const [n, q] of BP_QUERIES) if (window.matchMedia(q).matches) name = n;
  return name; // primitive string -> stable snapshot, no render loop
}

function subscribeBp(cb) {
  if (!canMatch()) return () => {};
  const offs = BP_QUERIES.map(([, q]) => listen(window.matchMedia(q), cb));
  return () => offs.forEach((off) => off());
}

/**
 * const { bp, isMobile, isTablet, isDesktop, gte, lt } = useBreakpoint();
 *   gte("md") -> width >= 768      lt("lg") -> width < 1024
 *   isMobile  -> < md (768)        isTablet -> md..lg-1 (768-1023)   isDesktop -> >= lg (1024)
 * Server / first render assume SERVER_DEFAULT_BP ("xl").
 */
export function useBreakpoint() {
  const bp = useSyncExternalStore(
    subscribeBp,
    () => (canMatch() ? currentBp() : SERVER_DEFAULT_BP),
    () => SERVER_DEFAULT_BP
  );
  return useMemo(() => {
    const i = BP_ORDER.indexOf(bp);
    const gte = (name) => i >= BP_ORDER.indexOf(name);
    return {
      bp,
      gte,
      lt: (name) => !gte(name),
      isMobile: !gte("md"),
      isTablet: gte("md") && !gte("lg"),
      isDesktop: gte("lg"),
    };
  }, [bp]);
}

/** Finger/pen primary input (phones, tablets). Server assumes false. */
export const useIsTouch = () => useMediaQuery("(pointer: coarse)", false);
/** Can the primary input hover (mouse/trackpad)? Server assumes true. */
export const useCanHover = () => useMediaQuery("(hover: hover)", true);
export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)", false);
/** Landscape orientation. Server assumes true. */
export const useIsLandscape = () => useMediaQuery("(orientation: landscape)", true);
