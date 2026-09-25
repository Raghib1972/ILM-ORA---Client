// ═══════════════════════════════════════════════════════════════
// COLOR TOKENS — Global Design System
// Extracted verbatim from Student/DashboardPage.jsx (Golden Reference).
// DO NOT hand-tune values here without re-checking the Golden Reference —
// every page in the LMS inherits colors from this single file.
// ═══════════════════════════════════════════════════════════════

/**
 * T — full theme token map, keyed by "dark" | "light".
 * Every page/card in the LMS should read colors from T[mode], never
 * hardcode its own hex values. This is copied 1:1 from DashboardPage.jsx.
 */
export const T = {
  dark: {
    pageBg: "#0a0a0a",
    cardBg: "#111111",
    cardBgHov: "#161616",
    heroBg: "#141414",

    border: "rgba(255,255,255,0.08)",
    borderHov: "rgba(255,255,255,0.18)",
    borderHero: "rgba(255,255,255,0.09)",

    text: "#ffffff",
    textSub: "rgba(255,255,255,0.55)",
    textMuted: "rgba(255,255,255,0.42)",
    textLabel: "rgba(255,255,255,0.45)",

    pillBg: "rgba(255,255,255,0.05)",
    pillBorder: "rgba(255,255,255,0.09)",
    pillText: "rgba(255,255,255,0.5)",

    iconBg: "rgba(255,255,255,0.06)",
    iconBorder: "rgba(255,255,255,0.1)",

    calDayText: "rgba(255,255,255,0.7)",
    calDayHeader: "rgba(255,255,255,0.4)",
    calFooter: "rgba(255,255,255,0.4)",
    calFooterBdr: "rgba(255,255,255,0.07)",

    emptyBorder: "rgba(255,255,255,0.09)",
    emptyBg: "rgba(255,255,255,0.03)",
    emptyIcon: "rgba(255,255,255,0.2)",

    gridLine: "rgba(255,255,255,0.5)",
    barBg: "rgba(255,255,255,0.07)",

    actBar: "rgba(255,255,255,0.55)",
    actIcon: "rgba(255,255,255,0.45)",
    actBg: "rgba(255,255,255,0.05)",
    actBorder: "rgba(255,255,255,0.09)",

    navBtnBg: "rgba(255,255,255,0.05)",
    navBtnBorder: "rgba(255,255,255,0.1)",
    navBtnColor: "#aaa",

    todayBg: "#ffffff",
    todayText: "#000000",

    inputBg: "rgba(255,255,255,0.04)",
    overlayBg: "rgba(0,0,0,0.65)",

    shadow: "0 2px 12px rgba(0,0,0,0.35)",
    shadowHov: "0 14px 36px rgba(0,0,0,0.5)",

    liveColor: "#34d399",
    liveText: "#34d399",

    recentItemBg: "rgba(255,255,255,0.04)",
    recentItemBorder: "rgba(255,255,255,0.07)",
    recentItemBgHov: "rgba(255,255,255,0.07)",

    overdueBg: "rgba(239,68,68,0.14)",
    overdueText: "#f87171",
    overdueBorder: "rgba(239,68,68,0.25)",

    newBadgeBg: "rgba(245,158,11,0.14)",
    newBadgeText: "#fbbf24",
    newBadgeBorder: "rgba(245,158,11,0.25)",

    courseCardBg: "#111111",
    courseSkeletonBg: "rgba(255,255,255,0.06)",

    statusCompletedBg: "rgba(52,211,153,0.12)",
    statusCompletedText: "#34d399",
    statusProgressBg: "rgba(124,58,237,0.12)",
    statusProgressText: "#a78bfa",
    statusNotStartedBg: "rgba(255,255,255,0.05)",
    statusNotStartedText: "rgba(255,255,255,0.4)",
  },

  // ── "Claude" light theme — re-calibrated 2026-09-10 against a pixel
  // sample of the actual claude.ai/new screenshot (not an approximation):
  // Sidebar bg sampled #FBFBF9, main content bg sampled #FCFCFB — both are
  // near-white with only a faint warm tint, NOT the darker cream (#F0EEE8 /
  // #F7F6F2) this file used previously. Card #FFFFFF / Text #1F1E1B /
  // Secondary #6F6B64 / Border #DEDAD2 / Accent #D97757 / Button Dark #2B2926
  // are unchanged — those were already accurate.
  light: {
    // Visibly light-grey app background (sampled against the Windows File
    // Explorer reference: a soft neutral grey, NOT near-white) so white
    // cards/panels actually stand out on top of it instead of blending in.
    pageBg: "#F1F0EC",
    cardBg: "#FFFFFF",
    cardBgHov: "#FAF8F4",
    heroBg: "#FFFFFF",
    sidebarBg: "#F5F4F0",

    border: "#DEDAD2",
    borderHov: "#C9C3B8",
    borderHero: "#DEDAD2",

    // Aligned to match IlmDemoSidebar.jsx's own --sb-text / --sb-text-muted
    // exactly, so sidebar and main-content text read as the same palette.
    text: "#1F1E1B",
    textSub: "#83827A",
    textMuted: "#83827A",
    textLabel: "#83827A",

    pillBg: "#F0EEE8",
    pillBorder: "#DEDAD2",
    pillText: "#6F6B64",

    iconBg: "#F0EEE8",
    iconBorder: "#DEDAD2",

    calDayText: "#3A3833",
    calDayHeader: "#9A968C",
    calFooter: "#9A968C",
    calFooterBdr: "#DEDAD2",

    emptyBorder: "#DEDAD2",
    emptyBg: "#F7F6F2",
    emptyIcon: "#C9C3B8",

    gridLine: "rgba(31,30,27,0.12)",
    barBg: "#F0EEE8",

    actBar: "#9A968C",
    actIcon: "#9A968C",
    actBg: "#F7F6F2",
    actBorder: "#DEDAD2",

    navBtnBg: "#F7F6F2",
    navBtnBorder: "#DEDAD2",
    navBtnColor: "#6F6B64",

    todayBg: "#1F1E1B",
    todayText: "#ffffff",

    inputBg: "#F7F6F2",
    overlayBg: "rgba(31,30,27,0.45)",

    shadow: "0 1px 8px rgba(31,30,27,0.06)",
    shadowHov: "0 8px 28px rgba(31,30,27,0.10)",

    liveColor: "#16a34a",
    liveText: "#16a34a",

    recentItemBg: "#F7F6F2",
    recentItemBorder: "#DEDAD2",
    recentItemBgHov: "#F0EEE8",

    overdueBg: "#FDF0EC",
    overdueText: "#C2410C",
    overdueBorder: "#F3D9CD",

    newBadgeBg: "#FDF3E7",
    newBadgeText: "#B45309",
    newBadgeBorder: "#F1E0C4",

    courseCardBg: "#FFFFFF",
    courseSkeletonBg: "#F0EEE8",

    statusCompletedBg: "#E8F3EA",
    statusCompletedText: "#166534",
    statusProgressBg: "#FCEAE3",
    statusProgressText: "#B34D2E",
    statusNotStartedBg: "#F0EEE8",
    statusNotStartedText: "#9A968C",
  },
};

/** The single accent color from the Claude reference UI — use for every
 *  "primary" CTA, active nav state, and focus ring across the app instead
 *  of the old purple/blue accents. */
export const CLAUDE_ACCENT = "#D97757";
export const CLAUDE_ACCENT_HOVER = "#C2653F";
export const CLAUDE_ACCENT_SOFT = "#FCEAE3";
/** Dark/charcoal button color from the reference ("Upgrade now" button). */
export const BUTTON_DARK = "#2B2926";
export const BUTTON_DARK_HOVER = "#1F1E1B";

/**
 * STAT_COLORS — the exact 4(+1)-gradient palette every StatCard in the
 * LMS must reuse. This is the "Card 1 = Blue, Card 2 = Green,
 * Card 3 = Orange, Card 4 = Purple" sequence referenced in the design
 * brief. `red` is kept for warning/overdue-style stat cards that need
 * a 5th color outside the core 4-sequence.
 *
 * Usage across portals:
 *   Student   → Active Courses (blue), Completed (green), Pending (orange), Attendance (purple)
 *   Trainer   → same 4-color sequence, different labels
 *   Admin     → same 4-color sequence, different labels
 *   Analytics / Reports / Finance → same 4-color sequence
 */
export const STAT_COLORS = {
  blue: {
    gradient: "linear-gradient(135deg, #4F8CFF 0%, #2563EB 100%)",
    shadow: "rgba(37,99,235,0.35)",
  },
  green: {
    gradient: "linear-gradient(135deg, #34C77B 0%, #15803D 100%)",
    shadow: "rgba(21,128,61,0.35)",
  },
  orange: {
    gradient: "linear-gradient(135deg, #FBA23C 0%, #D97706 100%)",
    shadow: "rgba(217,119,6,0.35)",
  },
  purple: {
    gradient: "linear-gradient(135deg, #A66BF5 0%, #7C3AED 100%)",
    shadow: "rgba(124,58,237,0.35)",
  },
  red: {
    gradient: "linear-gradient(135deg, #F87171 0%, #DC2626 100%)",
    shadow: "rgba(220,38,38,0.35)",
  },
};

/** Fixed 4-card color order every dashboard's primary stat row must follow. */
export const STAT_COLOR_SEQUENCE = ["blue", "green", "orange", "purple"];

/** Accent used for chat bubbles / send buttons / active-state highlights across the app.
 *  Renamed usage-wise to the Claude terracotta accent; kept the old export name so
 *  every existing `ACCENT_PURPLE.base` / `.light` call site repaints automatically. */
export const ACCENT_PURPLE = { base: CLAUDE_ACCENT, light: "#E2916F" };

/**
 * STAT_COLORS_FLAT — SuperAdmin golden-reference stat palette (flat white
 * card + soft-tint icon badge, NOT the gradient cards in STAT_COLORS above).
 * Values taken verbatim from the SuperAdmin Onboarding Management screenshot
 * brief. This is what StatCard.jsx now renders by default across every
 * portal (Student/Trainer/Admin/Business) — STAT_COLORS (gradient) is kept
 * only so nothing that still imports it breaks.
 */
export const STAT_COLORS_FLAT = {
  purple: { solid: CLAUDE_ACCENT, soft: CLAUDE_ACCENT_SOFT }, // now the Claude accent, key kept for compatibility
  green: { solid: "#16a34a", soft: "#dcfce7" },
  amber: { solid: "#f59e0b", soft: "#fef3c7" },
  red: { solid: "#ef4444", soft: "#fee2e2" },
  blue: { solid: "#3b82f6", soft: "#dbeafe" },
};

/** Fixed color order for the primary stat row, flat-palette version. */
export const STAT_COLOR_SEQUENCE_FLAT = ["blue", "green", "amber", "red"];

export default T;