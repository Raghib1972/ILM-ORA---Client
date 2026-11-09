// ═══════════════════════════════════════════════════════════════
// Global Design System — barrel export
// Import from "@/design-system" instead of deep-importing individual
// token/component files, so every page pulls from one place.
// ═══════════════════════════════════════════════════════════════

export {
  T,
  STAT_COLORS, // legacy gradient palette — kept so old imports don't break, do not use in new code
  STAT_COLOR_SEQUENCE,
  STAT_COLORS_FLAT, // current golden-reference palette (used by StatCard)
  STAT_COLOR_SEQUENCE_FLAT,
  ACCENT_PURPLE,
  CLAUDE_ACCENT,
  CLAUDE_ACCENT_HOVER,
  CLAUDE_ACCENT_SOFT,
  BUTTON_DARK,
  BUTTON_DARK_HOVER,
} from "./tokens/colors";
export { FONT_FAMILY, FONT_IMPORT, FONT_WEIGHT, FONT_SIZE, LINE_HEIGHT, LETTER_SPACING } from "./tokens/typography";
export { PAGE_PADDING, PAGE_PADDING_BOTTOM, BREAKPOINTS, GRID_GAP, CARD_PADDING, SECTION_GAP } from "./tokens/spacing";
export { RADIUS } from "./tokens/radius";
export { statCardShadow, SHADOW_DROPDOWN, SHADOW_TOAST } from "./tokens/shadows";

export { default as PageContainer } from "./layouts/PageContainer";
export { Hero, Section } from "./layouts/Section";

export { default as StatCard } from "./components/StatCard";
export { default as Button } from "./components/Button";
export { default as Badge } from "./components/Badge";
export { default as Panel } from "./components/Panel";

export { useAutoDarkMode } from "./hooks/useAutoDarkMode";

// ── Phase 1b: responsive toolkit ──
// ChartFrame is NOT exported here (it pulls in recharts). Import it by path:
//   import ChartFrame from "@/design-system/components/responsive/ChartFrame";
export { BP, BP_ORDER, SERVER_DEFAULT_BP, CONTENT_MAX, Z, up, down, LEGACY_BREAKPOINT_MAP } from "./tokens/breakpoints";
export {
  useMediaQuery,
  useBreakpoint,
  useIsTouch,
  useCanHover,
  usePrefersReducedMotion,
  useIsLandscape,
} from "./hooks/useMediaQuery";
export { useLockBodyScroll } from "./hooks/useLockBodyScroll";
export { useFocusTrap } from "./hooks/useFocusTrap";
// export { default as ResponsiveGrid } from "./components/responsive/ResponsiveGrid";
// export { default as ResponsiveTable } from "./components/responsive/ResponsiveTable";
// export { default as ResponsiveModal } from "./components/responsive/ResponsiveModal";
// export { default as ScrollTabs } from "./components/responsive/ScrollTabs";
