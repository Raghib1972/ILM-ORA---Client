// ═══════════════════════════════════════════════════════════════
// BREAKPOINTS — the ONE scale for the whole app (Phase 1b)
//
// Values 640/768/1024/1280/1536 are IDENTICAL to Tailwind's defaults, so the
// Tailwind prefixes you already use (sm: md: lg: xl: 2xl:) mean exactly the
// same thing as these names. We only ADD two:  xs (360) and 3xl (1920).
//
//   name  min-width  typical devices
//   base  0          small phones (320-359)
//   xs    360        Android 360x800, iPhone 390x844, Pixel 412x915
//   sm    640        large phones landscape, phablets
//   md    768        iPad mini / small tablets (portrait)
//   lg    1024       iPad / iPad Pro landscape, small laptop
//   xl    1280       laptop 1366x768
//   2xl   1536       MacBook / desktop 1920x1080
//   3xl   1920       large desktop / ultrawide (content max-width kicks in)
//
// Do NOT invent page-local numbers (767, 769, 1100 ...). If a layout needs a
// different switch point, that is a signal to change THIS file, once.
// ═══════════════════════════════════════════════════════════════

export const BP = { xs: 360, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536, "3xl": 1920 };

/** Ascending order. "base" = below xs. */
export const BP_ORDER = ["base", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"];

/**
 * What JS-driven code assumes on the SERVER and during hydration.
 * "xl" = desktop-safe. CSS-driven layout never flashes (the browser decides),
 * only JS-driven branches switch right after hydration.
 */
export const SERVER_DEFAULT_BP = "xl";

/** Media-query helpers:  up("md") -> (min-width: 768px) */
export const up = (name) => `(min-width: ${BP[name]}px)`;
/** down("md") -> below md, i.e. (max-width: 767.98px) */
export const down = (name) => `(max-width: ${BP[name] - 0.02}px)`;

/** Max content width on very wide screens (also --content-max in CSS). */
export const CONTENT_MAX = 1680;

/** Overlay stacking order (also --z-* in CSS). */
export const Z = { base: 1, sticky: 20, nav: 40, drawer: 60, modal: 80, popover: 90, toast: 100 };

/**
 * Old names from tokens/spacing.js BREAKPOINTS  ->  where they map now.
 * (Old file stays untouched so PageContainer keeps working; migrate pages
 *  to the new names as they are touched in Phase 3.)
 */
export const LEGACY_BREAKPOINT_MAP = {
  desktop: "xl", // 1280
  laptop: "lg", // 1024
  tablet: "md", // 834  -> use md (768) or lg (1024) depending on layout
  tabletSmall: "md", // 700
  phablet: "sm", // 640
  mobile: "xs", // 480  -> xs (360) .. sm (640)
  mobileSmall: "xs", // 380
};
