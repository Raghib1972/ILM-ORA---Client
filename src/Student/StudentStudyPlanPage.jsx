"use client";

import { useState, useEffect, useRef } from "react";
import {
  getStudentStudyPlans,
  getStudentStudyPlanById,
  markStudyPlanProgress,
  getStudentProblemById,
  submitCodeForJudge,
  runCode,
  getCodingSolveUsage,
} from "../services/assessmentService";
import { getStudentClassroom } from "../services/batchService";
import UpgradeModal from "../components/plan/UpgradeModal";
import { parsePlanError } from "../services/planErrorHandler";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Play,
  Zap,
  Check,
  RefreshCw,
  AlertTriangle,
  Target,
  Calendar,
  Trophy,
  Layers,
  FileText,
  Clock,
  Code2,
  Database,
  Brain,
  Rocket,
  Flame,
  Star,
  Award,
  Terminal,
  GitBranch,
  Puzzle,
  Cpu,
  Network,
  Globe,
  Boxes,
  Binary,
  Lightbulb,
  ListChecks,
  GraduationCap,
  Timer,
  Shapes,
} from "lucide-react";
import {
  T,
  FONT_FAMILY,
  RADIUS,
  CLAUDE_ACCENT,
  ACCENT_PURPLE,
  STAT_COLORS_FLAT,
  Button,
} from "@/design-system";

const getAuthTokenUserId = () => {
  try {
    const token = localStorage.getItem("lms_token");
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]))?.userId ?? null;
  } catch {
    return null;
  }
};

const LANGUAGES = ["JAVA", "PYTHON", "JAVASCRIPT", "BASH"];
const LANG_LABEL = {
  JAVA: "Java",
  PYTHON: "Python",
  JAVASCRIPT: "JS",
  BASH: "Bash",
};
const DEFAULT_CODE = {
  JAVA: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  PYTHON: `# Write your solution here\nprint("Hello, World!")`,
  JAVASCRIPT: `process.stdin.resume();\nprocess.stdin.setEncoding('utf8');\nlet input = '';\nprocess.stdin.on('data', d => input += d);\nprocess.stdin.on('end', () => {\n    console.log("Hello, World!");\n});`,
  BASH: `#!/bin/bash\necho "Hello, World!"`,
};

/* ── Language icons: real lucide components, no emoji ── */
const LANG_ICON_CMP = {
  JAVA: Cpu,
  PYTHON: Code2,
  JAVASCRIPT: Braces,
  BASH: Terminal,
};

/* Braces isn't exported in every lucide version — fall back to Code2 safely. */
function Braces(props) {
  return <Code2 {...props} />;
}

/* ── Plan icon resolver ─────────────────────────────────────────────
   Backend `icon` can be:
     • a lucide-style name  → "book", "code", "database", "rocket"…
     • an emoji / unicode   → "📘"
     • empty / unknown      → default BookOpen
   Earlier the raw string ("book") was printed as text; now it maps to
   a real icon component.                                              */
const PLAN_ICONS = {
  book: BookOpen,
  bookopen: BookOpen,
  study: BookOpen,
  code: Code2,
  code2: Code2,
  coding: Code2,
  terminal: Terminal,
  bash: Terminal,
  shell: Terminal,
  database: Database,
  db: Database,
  sql: Database,
  brain: Brain,
  ai: Brain,
  ml: Brain,
  rocket: Rocket,
  launch: Rocket,
  flame: Flame,
  fire: Flame,
  star: Star,
  award: Award,
  trophy: Trophy,
  target: Target,
  goal: Target,
  git: GitBranch,
  branch: GitBranch,
  puzzle: Puzzle,
  dsa: Puzzle,
  algorithm: Puzzle,
  cpu: Cpu,
  system: Cpu,
  network: Network,
  web: Globe,
  globe: Globe,
  boxes: Boxes,
  oop: Boxes,
  binary: Binary,
  bit: Binary,
  idea: Lightbulb,
  lightbulb: Lightbulb,
  checklist: ListChecks,
  list: ListChecks,
  layers: Layers,
  section: Layers,
  file: FileText,
  doc: FileText,
  calendar: Calendar,
  clock: Clock,
  timer: Timer,
  graduation: GraduationCap,
  course: GraduationCap,
  shapes: Shapes,
};

const isEmoji = (str) =>
  // anything outside basic latin/punctuation is treated as a glyph to print
  /[^\u0020-\u007E]/.test(str);

function PlanIcon({ name, size = 24 }) {
  const raw = typeof name === "string" ? name.trim() : "";

  if (raw && isEmoji(raw)) {
    return (
      <span className="sp-icon-glyph" style={{ fontSize: size }} aria-hidden="true">
        {raw}
      </span>
    );
  }

  const key = raw.toLowerCase().replace(/[\s_-]/g, "");
  const Cmp = PLAN_ICONS[key] || BookOpen;
  return <Cmp size={size} strokeWidth={1.8} aria-hidden="true" />;
}

/* ── Design-system color → "r,g,b" helper, so tints (rgba(var(--x-rgb),alpha))
   always stay in sync with the token hex values below. Styling utility only. ── */
const hexToRgbStr = (hex) => {
  const h = String(hex).replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(n.substring(0, 2), 16);
  const g = parseInt(n.substring(2, 4), 16);
  const b = parseInt(n.substring(4, 6), 16);
  return `${r},${g},${b}`;
};

/* ── Inject global styles once (same pattern as StudentCompilerPage) ──
   Every color, radius, font-family and font-size below resolves to a
   design-system token. No literal hex / rgb values live in this file
   outside the token block itself.                                      */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

  :root {
    /* ── surfaces & text ── */
    --sp-bg:            ${T.light.pageBg};
    --sp-card:          ${T.light.cardBg};
    --sp-text:          ${T.light.text};
    --sp-text-rgb:      ${hexToRgbStr(T.light.text)};
    --sp-text-muted:    ${T.light.textSub};
    --sp-border:        ${T.light.border};

    /* ── accents ── */
    --sp-accent1:       ${CLAUDE_ACCENT};
    --sp-accent1-rgb:   ${hexToRgbStr(CLAUDE_ACCENT)};
    --sp-accent2:       ${STAT_COLORS_FLAT.amber.solid};
    --sp-accent2-rgb:   ${hexToRgbStr(STAT_COLORS_FLAT.amber.solid)};
    --sp-accent3:       ${T.light.liveColor};
    --sp-accent3-rgb:   ${hexToRgbStr(T.light.liveColor)};
    --sp-accent4:       ${ACCENT_PURPLE.light};
    --sp-accent4-rgb:   ${hexToRgbStr(ACCENT_PURPLE.light)};

    /* ── neutral chip recipe: identical to the "Batch #1" pill ── */
    --sp-chip-bg:       ${T.light.pageBg};
    --sp-chip-border:   ${T.light.border};
    --sp-chip-text:     ${T.light.textSub};

    --sp-icon-bg:       ${T.light.iconBg};
    --sp-icon-border:   ${T.light.iconBorder};

    --sp-danger:        ${T.light.overdueText};
    --sp-danger-bg:     ${T.light.overdueBg};
    --sp-danger-border: ${T.light.overdueBorder};

    --sp-shadow:        ${T.light.shadow};
    --sp-shadow-lg:     ${T.light.shadowHov};
    --sp-overlay:       rgba(var(--sp-text-rgb), 0.55);

    /* ── radii ── */
    --sp-radius:        ${RADIUS.standardCard}px;
    --sp-radius-sm:     ${RADIUS.messageBubble}px;
    --sp-radius-xs:     ${RADIUS.chip}px;
    --sp-radius-pill:   ${RADIUS.pill}px;

    /* ── type scale ── */
    --sp-fs-xs:   10px;
    --sp-fs-sm:   11px;
    --sp-fs-md:   12px;
    --sp-fs-lg:   13px;
    --sp-fs-body: 13.5px;
    --sp-fs-xl:   15px;
    --sp-fs-2xl:  18px;
    --sp-fs-3xl:  26px;
    --sp-fs-4xl:  28px;
    --sp-fw-med:  500;
    --sp-fw-semi: 600;
    --sp-fw-bold: 700;
    --sp-fw-x:    800;
    --sp-fw-xx:   900;
    --sp-font:    ${FONT_FAMILY};
    --sp-font-mono: 'JetBrains Mono', monospace;
  }

  .sp-dark {
    --sp-bg:            ${T.dark.pageBg};
    --sp-card:          ${T.dark.cardBg};
    --sp-text:          ${T.dark.text};
    --sp-text-rgb:      ${hexToRgbStr(T.dark.text)};
    --sp-text-muted:    ${T.dark.textSub};
    --sp-border:        ${T.dark.border};
    --sp-accent3:       ${T.dark.liveColor};
    --sp-accent3-rgb:   ${hexToRgbStr(T.dark.liveColor)};
    --sp-chip-bg:       ${T.dark.pageBg};
    --sp-chip-border:   ${T.dark.border};
    --sp-chip-text:     ${T.dark.textSub};
    --sp-icon-bg:       ${T.dark.iconBg};
    --sp-icon-border:   ${T.dark.iconBorder};
    --sp-danger:        ${T.dark.overdueText};
    --sp-danger-bg:     ${T.dark.overdueBg};
    --sp-danger-border: ${T.dark.overdueBorder};
    --sp-shadow:        ${T.dark.shadow};
    --sp-shadow-lg:     ${T.dark.shadowHov};
  }

  .sp-root {
    font-family: var(--sp-font);
    min-height: 100vh;
    background: var(--sp-bg);
    color: var(--sp-text);
    transition: background 0.3s, color 0.3s;
    display: flex;
    flex-direction: column;
  }

  @keyframes sp-spin { to { transform: rotate(360deg); } }
  @keyframes sp-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes sp-slide-in { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes sp-shimmer { from { background-position: -400px 0; } to { background-position: 400px 0; } }
  .sp-fade-up  { animation: sp-fade-up 0.32s ease both; }
  .sp-slide-in { animation: sp-slide-in 0.25s ease both; }

  @media (prefers-reduced-motion: reduce) {
    .sp-fade-up, .sp-slide-in { animation: none; }
    .sp-plan-card { transition: none; }
  }

  .sp-loading-screen {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px;
    background: var(--sp-bg); font-family: var(--sp-font);
  }
  .sp-spinner {
    width: 44px; height: 44px;
    border: 3px solid var(--sp-border);
    border-top-color: var(--sp-accent1);
    border-radius: 50%;
    animation: sp-spin 0.8s linear infinite;
  }

  .sp-skeleton {
    background: linear-gradient(90deg,
      rgba(var(--sp-text-rgb),0.05) 25%,
      rgba(var(--sp-text-rgb),0.10) 50%,
      rgba(var(--sp-text-rgb),0.05) 75%);
    background-size: 400px 100%;
    animation: sp-shimmer 1.6s infinite linear;
  }

  /* ── top bar ── */
  .sp-nav {
    min-height: 56px;
    background: var(--sp-card);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--sp-border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 28px;
    position: sticky; top: 0; z-index: 50;
    box-shadow: var(--sp-shadow);
    flex-wrap: wrap; gap: 10px; row-gap: 8px;
  }
  .sp-nav-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; row-gap: 6px; }

  /* logo mark — same neutral recipe as the batch pill */
  .sp-logo-icon {
    width: 30px; height: 30px; border-radius: var(--sp-radius-xs);
    background: var(--sp-chip-bg); border: 1px solid var(--sp-chip-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--sp-chip-text);
  }
  .sp-logo-text { font-size: var(--sp-fs-lg); font-weight: var(--sp-fw-x); color: var(--sp-text); letter-spacing: -0.01em; }

  .sp-badge,
  .sp-batch-pill {
    font-size: var(--sp-fs-sm); font-weight: var(--sp-fw-semi);
    background: var(--sp-chip-bg); color: var(--sp-chip-text);
    border: 1px solid var(--sp-chip-border);
    border-radius: var(--sp-radius-pill); padding: 4px 12px;
  }

  .sp-flash {
    padding: 9px 24px; font-size: var(--sp-fs-lg); text-align: center;
    font-weight: var(--sp-fw-semi); font-family: var(--sp-font);
  }
  .sp-flash-ok  { background: rgba(var(--sp-accent3-rgb),0.08); border-bottom: 1px solid rgba(var(--sp-accent3-rgb),0.2); color: var(--sp-accent3); }
  .sp-flash-err { background: var(--sp-danger-bg); border-bottom: 1px solid var(--sp-danger-border); color: var(--sp-danger); }

  .sp-main { flex: 1; padding: 36px 40px; max-width: 1280px; width: 100%; margin: 0 auto; box-sizing: border-box; }

  /* section eyebrow — neutral, matches chip text */
  .sp-eyebrow-row { display: flex; align-items: center; gap: 7px; margin-bottom: 8px; }
  .sp-eyebrow-icon { display: flex; align-items: center; color: var(--sp-chip-text); }
  .sp-eyebrow-label { font-size: var(--sp-fs-sm); font-weight: var(--sp-fw-bold); color: var(--sp-chip-text); letter-spacing: 0.12em; text-transform: uppercase; }

  .sp-page-title { font-size: var(--sp-fs-4xl); font-weight: var(--sp-fw-xx); color: var(--sp-text); letter-spacing: -0.02em; line-height: 1.15; margin-bottom: 4px; }
  .sp-page-sub { font-size: var(--sp-fs-lg); color: var(--sp-text-muted); font-weight: 400; }

  .sp-stat-pill {
    display: flex; align-items: center; gap: 5px; font-size: var(--sp-fs-md); font-weight: var(--sp-fw-semi);
    color: var(--sp-chip-text); background: var(--sp-chip-bg); border: 1px solid var(--sp-chip-border);
    border-radius: var(--sp-radius-xs); padding: 5px 12px;
  }
  .sp-stat-pill svg { color: var(--sp-chip-text); }

  .sp-divider { height: 1px; background: var(--sp-border); margin-bottom: 28px; }

  .sp-plan-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }

  .sp-plan-card {
    background: var(--sp-card); border: 1px solid var(--sp-border);
    border-radius: var(--sp-radius); overflow: hidden;
    box-shadow: var(--sp-shadow); display: flex; flex-direction: column;
    cursor: pointer; text-align: left; padding: 0; font-family: var(--sp-font);
    transition: transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .sp-plan-card:hover { transform: translateY(-3px); box-shadow: var(--sp-shadow-lg); border-color: rgba(var(--sp-accent1-rgb),0.25); }
  .sp-plan-card:focus-visible { outline: 2px solid var(--sp-accent1); outline-offset: 2px; }

  .sp-plan-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 20px 16px; border-bottom: 1px solid var(--sp-border); background: var(--sp-card);
  }

  /* plan icon tile — neutral chip recipe, holds a real icon */
  .sp-plan-icon-box {
    width: 52px; height: 52px; border-radius: var(--sp-radius-sm);
    background: var(--sp-chip-bg); border: 1px solid var(--sp-chip-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--sp-chip-text); flex-shrink: 0;
  }
  .sp-plan-icon-box.lg { width: 76px; height: 76px; border-radius: var(--sp-radius); }
  .sp-icon-glyph { line-height: 1; }

  .sp-plan-body { padding: 16px 20px 14px; flex: 1; background: var(--sp-card); }
  .sp-plan-title { font-size: var(--sp-fs-xl); font-weight: var(--sp-fw-x); color: var(--sp-text); margin-bottom: 5px; line-height: 1.25; }
  .sp-plan-desc { font-size: var(--sp-fs-md); color: var(--sp-text-muted); line-height: 1.55; margin-bottom: 12px; }

  .sp-tag {
    font-size: var(--sp-fs-xs); font-weight: var(--sp-fw-bold); border-radius: var(--sp-radius-pill); padding: 3px 9px;
    display: inline-flex; align-items: center; gap: 4px;
    background: var(--sp-chip-bg); color: var(--sp-chip-text); border: 1px solid var(--sp-chip-border);
  }
  .sp-progress-track { height: 4px; background: var(--sp-icon-bg); border-radius: 4px; overflow: hidden; }
  .sp-progress-fill { height: 100%; border-radius: 4px; background: var(--sp-accent1); transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
  .sp-progress-label-row { display: flex; justify-content: space-between; margin-top: 5px; }
  .sp-progress-label { font-size: var(--sp-fs-sm); color: var(--sp-text-muted); font-weight: var(--sp-fw-med); }

  .sp-plan-footer { padding: 10px 20px; border-top: 1px solid var(--sp-border); background: var(--sp-card); display: flex; align-items: center; justify-content: space-between; }
  .sp-plan-footer-status { font-size: var(--sp-fs-md); color: var(--sp-text-muted); font-weight: var(--sp-fw-med); }
  .sp-plan-footer-open { display: flex; align-items: center; gap: 4px; font-size: var(--sp-fs-md); font-weight: var(--sp-fw-bold); color: var(--sp-chip-text); }

  .sp-empty { text-align: center; padding: 80px 0; display: flex; flex-direction: column; align-items: center; gap: 14px; }
  .sp-empty-icon {
    width: 72px; height: 72px; border-radius: var(--sp-radius);
    background: var(--sp-chip-bg); border: 1px solid var(--sp-chip-border);
    display: flex; align-items: center; justify-content: center; color: var(--sp-chip-text);
  }
  .sp-empty-title { font-size: var(--sp-fs-2xl); font-weight: var(--sp-fw-bold); color: var(--sp-text); margin-bottom: 6px; }
  .sp-empty-sub { font-size: var(--sp-fs-lg); color: var(--sp-text-muted); }

  .sp-error-screen {
    flex: 1; min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 16px; background: var(--sp-bg);
    font-family: var(--sp-font);
  }
  .sp-error-icon-wrap {
    width: 52px; height: 52px; border-radius: var(--sp-radius-sm);
    background: var(--sp-danger-bg); border: 1px solid var(--sp-danger-border);
    display: flex; align-items: center; justify-content: center; color: var(--sp-danger);
  }
  .sp-error-title { font-size: var(--sp-fs-xl); font-weight: var(--sp-fw-bold); color: var(--sp-text); }
  .sp-error-sub { font-size: var(--sp-fs-lg); color: var(--sp-text-muted); margin-top: 6px; }

  /* ── Detail view ── */
  .sp-breadcrumb-row { display: flex; align-items: center; gap: 6px; }
  .sp-breadcrumb { font-size: var(--sp-fs-md); color: var(--sp-text-muted); font-weight: var(--sp-fw-med); }
  .sp-breadcrumb-active { font-size: var(--sp-fs-md); color: var(--sp-text); font-weight: var(--sp-fw-bold); }
  .sp-breadcrumb-sep { color: var(--sp-text-muted); opacity: 0.5; display: flex; }
  .sp-nav-sep { width: 1px; height: 20px; background: var(--sp-border); }

  .sp-detail-body { max-width: 1280px; width: 100%; margin: 0 auto; padding: 36px 40px 0; box-sizing: border-box; }

  .sp-hero {
    background: var(--sp-card); border: 1px solid var(--sp-border); border-radius: var(--sp-radius);
    box-shadow: var(--sp-shadow); padding: 28px 32px; margin-bottom: 24px;
  }
  .sp-hero-content { display: flex; align-items: flex-start; gap: 24px; justify-content: space-between; flex-wrap: wrap; }
  .sp-hero-main { display: flex; align-items: flex-start; gap: 20px; flex: 1; min-width: 240px; }
  .sp-hero-title { font-size: var(--sp-fs-3xl); font-weight: var(--sp-fw-xx); color: var(--sp-text); margin-bottom: 6px; line-height: 1.15; letter-spacing: -0.02em; }
  .sp-hero-desc { font-size: var(--sp-fs-body); color: var(--sp-text-muted); margin-bottom: 16px; line-height: 1.65; max-width: 520px; }
  .sp-hero-tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .sp-hero-tag {
    font-size: var(--sp-fs-sm); font-weight: var(--sp-fw-bold);
    background: var(--sp-chip-bg); color: var(--sp-chip-text);
    border-radius: var(--sp-radius-pill); padding: 3px 10px; border: 1px solid var(--sp-chip-border);
    display: flex; align-items: center; gap: 5px;
  }
  .sp-hero-tag-done { background: rgba(var(--sp-accent3-rgb),0.10); color: var(--sp-accent3); border-color: rgba(var(--sp-accent3-rgb),0.25); }
  .sp-hero-arc-wrap { text-align: center; flex-shrink: 0; color: var(--sp-text); }
  .sp-hero-arc-label { color: var(--sp-text-muted); font-size: var(--sp-fs-xs); margin-top: 7px; font-weight: var(--sp-fw-bold); letter-spacing: 0.1em; text-transform: uppercase; }

  .sp-thin-progress { height: 4px; background: var(--sp-icon-bg); border-radius: 4px; overflow: hidden; margin-top: 18px; }
  .sp-thin-progress-fill { height: 100%; background: var(--sp-accent1); border-radius: 4px; transition: width 0.9s cubic-bezier(0.4,0,0.2,1); }

  .sp-howitworks {
    background: rgba(var(--sp-accent1-rgb),0.06); border: 1px solid rgba(var(--sp-accent1-rgb),0.16);
    border-radius: var(--sp-radius-xs); padding: 12px 16px; margin-top: 24px; margin-bottom: 28px;
    font-size: var(--sp-fs-lg); line-height: 1.55;
    display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  }
  .sp-howitworks-icon { color: var(--sp-accent1); display: flex; align-items: center; }
  .sp-howitworks span { color: var(--sp-text-muted); }
  .sp-howitworks span strong { color: var(--sp-text); font-weight: var(--sp-fw-semi); }
  .sp-howitworks span strong.sp-done-hl { color: var(--sp-accent3); }

  .sp-section-card {
    background: var(--sp-card); border: 1px solid var(--sp-border); border-radius: var(--sp-radius-sm);
    overflow: hidden; box-shadow: var(--sp-shadow);
  }
  .sp-section-header-row {
    display: flex; align-items: center; justify-content: space-between; padding: 16px 22px;
    cursor: pointer; transition: background 0.15s ease; border-left: 3px solid transparent; background: var(--sp-card);
    width: 100%; text-align: left; font-family: var(--sp-font); border-top: none; border-right: none; border-bottom: none;
  }
  .sp-section-header-row:hover { background: var(--sp-bg); }
  .sp-section-header-row:focus-visible { outline: 2px solid var(--sp-accent1); outline-offset: -2px; }
  .sp-section-header-row.open { border-left-color: var(--sp-accent1); border-bottom: 1px solid var(--sp-border); }
  .sp-section-eyebrow { font-size: var(--sp-fs-xs); font-weight: var(--sp-fw-bold); color: var(--sp-chip-text); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px; }
  .sp-section-title { font-size: var(--sp-fs-xl); font-weight: var(--sp-fw-bold); color: var(--sp-text); }
  .sp-section-desc { font-size: var(--sp-fs-md); color: var(--sp-text-muted); margin-top: 2px; }
  .sp-section-done { font-size: var(--sp-fs-md); font-weight: var(--sp-fw-bold); color: var(--sp-text-muted); }
  .sp-section-done-label { font-size: var(--sp-fs-xs); color: var(--sp-text-muted); font-weight: var(--sp-fw-med); }
  .sp-chevron-wrap {
    width: 26px; height: 26px; border-radius: var(--sp-radius-xs); background: var(--sp-chip-bg);
    border: 1px solid var(--sp-chip-border); display: flex; align-items: center; justify-content: center;
  }
  .sp-chevron-wrap svg { transition: transform 0.2s ease; color: var(--sp-chip-text); }
  .sp-chevron-wrap.open svg { transform: rotate(180deg); }
  .sp-section-progress { height: 3px; background: var(--sp-icon-bg); }
  .sp-section-progress-fill { height: 100%; background: var(--sp-accent1); transition: width 0.6s ease; }
  .sp-section-empty { padding: 22px; color: var(--sp-text-muted); font-size: var(--sp-fs-lg); text-align: center; }

  .sp-item-row {
    display: flex; align-items: center; gap: 14px; padding: 14px 24px;
    border-bottom: 1px solid var(--sp-border); transition: background 0.15s ease;
  }
  .sp-item-row:last-child { border-bottom: none; }
  .sp-item-row:hover { background: var(--sp-bg); }
  .sp-item-row.done { border-left: 3px solid var(--sp-accent3); background: rgba(var(--sp-accent3-rgb),0.03); }
  .sp-item-index { font-size: var(--sp-fs-sm); font-weight: var(--sp-fw-semi); color: var(--sp-text-muted); min-width: 22px; text-align: center; }
  .sp-item-check {
    width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; background: var(--sp-icon-bg); border: 2px solid var(--sp-icon-border); transition: all 0.22s ease;
  }
  .sp-item-check.done { background: var(--sp-accent3); border-color: var(--sp-accent3); }
  .sp-item-title { font-size: var(--sp-fs-body); font-weight: var(--sp-fw-bold); color: var(--sp-text); margin-bottom: 5px; }
  .sp-item-title.done { color: var(--sp-text-muted); text-decoration: line-through; text-decoration-color: var(--sp-text-muted); }
  .sp-item-tags { display: flex; gap: 7px; align-items: center; flex-wrap: wrap; }
  .sp-item-diff-badge {
    font-size: var(--sp-fs-xs); font-weight: var(--sp-fw-bold); border-radius: var(--sp-radius-pill); padding: 2px 8px;
    background: var(--sp-chip-bg); color: var(--sp-chip-text); border: 1px solid var(--sp-chip-border);
  }
  .sp-item-marks-badge {
    font-size: var(--sp-fs-xs); font-weight: var(--sp-fw-bold); background: var(--sp-chip-bg); color: var(--sp-chip-text);
    border: 1px solid var(--sp-chip-border); border-radius: var(--sp-radius-pill); padding: 2px 8px;
    display: flex; align-items: center; gap: 3px;
  }
  .sp-item-completed-badge {
    font-size: var(--sp-fs-xs); font-weight: var(--sp-fw-bold); background: rgba(var(--sp-accent3-rgb),0.10); color: var(--sp-accent3);
    border-radius: var(--sp-radius-pill); padding: 2px 8px; border: 1px solid rgba(var(--sp-accent3-rgb),0.22);
    display: flex; align-items: center; gap: 3px;
  }
  .sp-item-done-badge {
    font-size: var(--sp-fs-sm); font-weight: var(--sp-fw-bold); color: var(--sp-accent3); background: rgba(var(--sp-accent3-rgb),0.10);
    border-radius: var(--sp-radius-xs); padding: 5px 12px; border: 1px solid rgba(var(--sp-accent3-rgb),0.22);
    display: flex; align-items: center; gap: 4px;
  }

  .sp-btn {
    display: inline-flex; align-items: center; gap: 6px; padding: 7px 16px;
    border-radius: var(--sp-radius-xs); border: 1px solid var(--sp-border);
    font-family: var(--sp-font); font-size: var(--sp-fs-md); font-weight: var(--sp-fw-bold); cursor: pointer;
    transition: opacity 0.2s, transform 0.15s; background: var(--sp-card); color: var(--sp-text);
    white-space: nowrap;
  }
  .sp-btn:hover { opacity: 0.85; transform: translateY(-1px); }
  .sp-btn:active { transform: translateY(0); }
  .sp-btn:focus-visible { outline: 2px solid var(--sp-accent1); outline-offset: 2px; }
  .sp-btn:disabled { opacity: 0.55; cursor: default; transform: none; }
  .sp-btn-ghost { background: var(--sp-chip-bg); color: var(--sp-chip-text); border-color: var(--sp-chip-border); }
  .sp-btn-solve { background: var(--sp-text); color: var(--sp-card); border-color: transparent; padding: 6px 16px; }
  .sp-btn-run { background: var(--sp-chip-bg); color: var(--sp-chip-text); border-color: var(--sp-chip-border); }
  .sp-btn-submit { background: var(--sp-text); color: var(--sp-card); border-color: transparent; }
  .sp-btn-mark-done { background: rgba(var(--sp-accent3-rgb),0.14); color: var(--sp-accent3); border-color: rgba(var(--sp-accent3-rgb),0.3); }

  /* ── Compiler view ── */
  .sp-compiler-root { height: 100vh; background: var(--sp-bg); display: flex; flex-direction: column; font-family: var(--sp-font); overflow: hidden; }

  .sp-run-overlay {
    position: fixed; inset: 0; background: var(--sp-overlay); backdrop-filter: blur(10px);
    z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box;
  }
  .sp-run-overlay-box {
    background: var(--sp-card); border: 1px solid var(--sp-border); border-radius: var(--sp-radius);
    padding: 44px 60px; display: flex; flex-direction: column; align-items: center; gap: 18px;
    box-shadow: var(--sp-shadow-lg); min-width: 260px; max-width: 100%; box-sizing: border-box;
  }
  .sp-run-spinner {
    width: 52px; height: 52px; border: 2px solid var(--sp-border);
    border-top-color: var(--sp-accent1); border-radius: 50%; animation: sp-spin 0.7s linear infinite;
  }
  .sp-run-overlay-text { font-size: var(--sp-fs-xl); font-weight: var(--sp-fw-x); color: var(--sp-text); text-align: center; margin-bottom: 5px; display: flex; align-items: center; gap: 7px; justify-content: center; }
  .sp-run-overlay-sub { font-size: var(--sp-fs-md); color: var(--sp-text-muted); text-align: center; }

  .sp-compiler-header {
    min-height: 52px; background: var(--sp-card); backdrop-filter: blur(16px); border-bottom: 1px solid var(--sp-border);
    display: flex; align-items: center; padding: 0 18px; gap: 10px; flex-shrink: 0; z-index: 100; flex-wrap: wrap; row-gap: 6px;
  }
  .sp-lang-toggle { display: flex; background: var(--sp-chip-bg); border: 1px solid var(--sp-chip-border); border-radius: var(--sp-radius-xs); padding: 3px; gap: 2px; flex-wrap: wrap; }
  .sp-lang-btn {
    padding: 5px 12px; border-radius: 7px; border: none; cursor: pointer; background: transparent;
    font-family: var(--sp-font); font-weight: var(--sp-fw-bold); font-size: var(--sp-fs-md); color: var(--sp-text-muted);
    transition: all 0.14s ease; display: inline-flex; align-items: center; gap: 5px;
  }
  .sp-lang-btn.active { background: var(--sp-icon-bg); color: var(--sp-text); box-shadow: inset 0 0 0 1px var(--sp-icon-border); }
  .sp-lang-btn:focus-visible { outline: 2px solid var(--sp-accent1); outline-offset: 1px; }

  .sp-mark-done-banner {
    background: rgba(var(--sp-accent2-rgb),0.08); border-bottom: 1px solid rgba(var(--sp-accent2-rgb),0.2);
    padding: 8px 24px; font-size: var(--sp-fs-md); color: var(--sp-accent2); text-align: center; flex-shrink: 0;
    font-weight: var(--sp-fw-med); font-family: var(--sp-font);
    display: flex; align-items: center; justify-content: center; gap: 7px;
  }

  .sp-editor-layout { flex: 1; display: flex; overflow: hidden; }

  .sp-problem-panel { width: 370px; flex-shrink: 0; border-right: 1px solid var(--sp-border); overflow-y: auto; background: var(--sp-bg); }
  .sp-problem-detail { padding: 24px 22px 56px; }
  .sp-problem-detail-title { font-size: var(--sp-fs-2xl); font-weight: var(--sp-fw-x); color: var(--sp-text); line-height: 1.3; margin-bottom: 12px; }
  .sp-problem-tags-row { display: flex; gap: 8px; align-items: center; margin-bottom: 22px; flex-wrap: wrap; }

  .sp-section-label {
    font-size: var(--sp-fs-xs); font-weight: var(--sp-fw-bold); color: var(--sp-text-muted); letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 7px; display: flex; align-items: center; gap: 5px;
  }
  .sp-desc-text { font-size: var(--sp-fs-lg); color: var(--sp-text-muted); line-height: 1.75; }
  .sp-mono-block {
    background: rgba(var(--sp-accent1-rgb),0.06); border: 1px solid rgba(var(--sp-accent1-rgb),0.16);
    border-radius: var(--sp-radius-xs); padding: 10px 12px; font-size: var(--sp-fs-md); color: var(--sp-text);
    font-family: var(--sp-font-mono); white-space: pre-wrap; line-height: 1.7;
  }

  .sp-io-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .sp-io-box { background: var(--sp-card); border: 1px solid var(--sp-border); border-radius: var(--sp-radius-xs); padding: 10px 12px; }
  .sp-io-box.out { background: rgba(var(--sp-accent3-rgb),0.05); border-color: rgba(var(--sp-accent3-rgb),0.18); }
  .sp-io-label { font-size: var(--sp-fs-xs); font-weight: var(--sp-fw-bold); color: var(--sp-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 7px; }
  .sp-io-label.out { color: var(--sp-accent3); }
  .sp-io-content { font-size: var(--sp-fs-md); color: var(--sp-text); font-family: var(--sp-font-mono); white-space: pre-wrap; margin: 0; }
  .sp-io-content.out { color: var(--sp-accent3); }

  .sp-test-case { background: var(--sp-card); border: 1px solid var(--sp-border); border-radius: var(--sp-radius-xs); padding: 10px 12px; margin-bottom: 7px; }
  .sp-test-case-label { font-size: var(--sp-fs-xs); color: var(--sp-text-muted); font-weight: var(--sp-fw-semi); margin-bottom: 7px; }
  .sp-test-row { display: flex; gap: 9px; margin-bottom: 5px; font-size: var(--sp-fs-md); align-items: center; flex-wrap: wrap; }
  .sp-test-key { color: var(--sp-text-muted); min-width: 50px; font-weight: var(--sp-fw-semi); font-size: var(--sp-fs-xs); }
  .sp-test-val {
    color: var(--sp-accent1); background: rgba(var(--sp-accent1-rgb),0.08); padding: 2px 7px; border-radius: 4px;
    font-family: var(--sp-font-mono); font-size: var(--sp-fs-sm);
  }
  .sp-test-val.out { color: var(--sp-accent3); background: rgba(var(--sp-accent3-rgb),0.08); }

  .sp-getting-credit {
    background: rgba(var(--sp-accent1-rgb),0.06); border: 1px solid rgba(var(--sp-accent1-rgb),0.16);
    border-radius: var(--sp-radius-xs); padding: 12px 14px;
  }
  .sp-getting-credit-label { font-size: var(--sp-fs-xs); font-weight: var(--sp-fw-bold); color: var(--sp-accent1); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.08em; }
  .sp-getting-credit-text { font-size: var(--sp-fs-md); color: var(--sp-text-muted); line-height: 1.6; }
  .sp-getting-credit-text strong { color: var(--sp-text); font-weight: var(--sp-fw-semi); }
  .sp-getting-credit-text strong.done { color: var(--sp-accent3); }

  .sp-code-side { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  .sp-editor-area-wrap { flex: 1; display: flex; overflow: hidden; background: var(--sp-bg); }
  .sp-line-numbers {
    padding: 20px 12px 20px 16px; background: var(--sp-bg); border-right: 1px solid var(--sp-border);
    min-width: 50px; text-align: right; user-select: none; overflow-y: hidden; flex-shrink: 0;
    font-family: var(--sp-font-mono);
  }
  .sp-line-num { font-size: var(--sp-fs-lg); line-height: 22px; color: var(--sp-text-muted); opacity: 0.5; font-weight: var(--sp-fw-med); }
  .sp-code-textarea {
    flex: 1; background: transparent; border: none; outline: none; color: var(--sp-text);
    font-size: var(--sp-fs-body); line-height: 22px; padding: 20px 22px; resize: none;
    font-family: var(--sp-font-mono); overflow-y: auto; tab-size: 4; caret-color: var(--sp-accent1);
    letter-spacing: 0.01em;
  }

  .sp-output-panel { height: 230px; border-top: 1px solid var(--sp-border); background: var(--sp-card); flex-shrink: 0; display: flex; flex-direction: column; }
  .sp-output-tabs { display: flex; align-items: center; padding: 0 14px; border-bottom: 1px solid var(--sp-border); min-height: 38px; gap: 4px; flex-shrink: 0; background: var(--sp-bg); flex-wrap: wrap; }
  .sp-output-tab {
    padding: 5px 14px; border-radius: 7px; border: 1px solid transparent; cursor: pointer; background: transparent;
    font-family: var(--sp-font); font-weight: var(--sp-fw-semi); font-size: var(--sp-fs-md); color: var(--sp-text-muted);
    transition: all 0.14s ease; display: inline-flex; align-items: center; gap: 5px;
  }
  .sp-output-tab.active { background: rgba(var(--sp-accent1-rgb),0.10); border-color: rgba(var(--sp-accent1-rgb),0.25); color: var(--sp-accent1); }
  .sp-output-tab-meta { margin-left: auto; display: flex; align-items: center; gap: 8px; }
  .sp-output-tab-count { font-size: var(--sp-fs-sm); font-weight: var(--sp-fw-bold); color: var(--sp-text-muted); }
  .sp-output-content { flex: 1; overflow-y: auto; padding: 12px 16px; }
  .sp-output-empty { color: var(--sp-text-muted); opacity: 0.7; font-size: var(--sp-fs-md); padding-top: 10px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 7px; }
  .sp-output-empty strong { color: var(--sp-text); font-weight: var(--sp-fw-semi); }

  .sp-status-chip {
    display: inline-flex; align-items: center; gap: 5px; border-radius: var(--sp-radius-pill);
    padding: 2px 9px; font-size: var(--sp-fs-sm); font-weight: var(--sp-fw-bold);
  }
  .sp-exec-time { color: var(--sp-text-muted); font-size: var(--sp-fs-sm); display: flex; align-items: center; gap: 3px; }
  .sp-output-pre { font-size: var(--sp-fs-md); color: var(--sp-text-muted); line-height: 1.6; white-space: pre-wrap; word-break: break-all; font-family: var(--sp-font-mono); margin: 0; }

  .sp-judge-header { display: flex; gap: 10px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
  .sp-score-chip {
    font-size: var(--sp-fs-sm); background: rgba(var(--sp-accent2-rgb),0.10); color: var(--sp-accent2);
    border: 1px solid rgba(var(--sp-accent2-rgb),0.22); border-radius: var(--sp-radius-xs); padding: 2px 9px;
    font-weight: var(--sp-fw-bold); display: flex; align-items: center; gap: 4px;
  }
  .sp-judge-grid { display: flex; flex-wrap: wrap; gap: 7px; }
  .sp-judge-card { border-radius: var(--sp-radius-xs); padding: 7px 11px; min-width: 105px; font-size: var(--sp-fs-sm); border: 1px solid; }
  .sp-judge-card.pass { background: rgba(var(--sp-accent3-rgb),0.07); border-color: rgba(var(--sp-accent3-rgb),0.2); }
  .sp-judge-card.fail { background: var(--sp-danger-bg); border-color: var(--sp-danger-border); }
  .sp-judge-card-top { display: flex; justify-content: space-between; margin-bottom: 4px; }
  .sp-judge-card-label { font-weight: var(--sp-fw-bold); color: var(--sp-text-muted); font-size: var(--sp-fs-xs); }
  .sp-judge-card-verdict { font-weight: var(--sp-fw-bold); font-size: var(--sp-fs-xs); }
  .sp-judge-card-verdict.pass { color: var(--sp-accent3); }
  .sp-judge-card-verdict.fail { color: var(--sp-danger); }
  .sp-judge-card-val { color: var(--sp-accent1); background: rgba(var(--sp-accent1-rgb),0.10); padding: 1px 5px; border-radius: 3px; font-family: var(--sp-font-mono); font-size: var(--sp-fs-xs); }
  .sp-judge-card-hidden { color: var(--sp-text-muted); font-size: var(--sp-fs-xs); opacity: 0.6; }

  @media (max-width: 860px) {
    .sp-editor-layout { flex-direction: column; }
    .sp-problem-panel { width: 100%; border-right: none; border-bottom: 1px solid var(--sp-border); max-height: 40vh; }
    .sp-main { padding: 24px 18px; }
    .sp-detail-body { padding: 24px 18px 0; max-width: 100%; }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("sp-styles")) {
  const tag = document.createElement("style");
  tag.id = "sp-styles";
  tag.textContent = STYLES;
  document.head.appendChild(tag);
}

const isDarkMode = () =>
  typeof document !== "undefined" &&
  (document.documentElement.classList.contains("dark") ||
    document.documentElement.getAttribute("data-theme") === "dark");

function useTheme() {
  const [isDark, setIsDark] = useState(isDarkMode);

  useEffect(() => {
    const obs = new MutationObserver(() => setIsDark(isDarkMode()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => obs.disconnect();
  }, []);

  return { isDark, themeT: T[isDark ? "dark" : "light"] };
}

const statusColor = (s, themeT) =>
  s === "SUCCESS" ? themeT.statusCompletedText : s === "COMPILE_ERROR" ? themeT.newBadgeText : themeT.overdueText;
const statusBg = (s, themeT) =>
  s === "SUCCESS" ? themeT.statusCompletedBg : s === "COMPILE_ERROR" ? themeT.newBadgeBg : themeT.overdueBg;
const verdictColor = (v, themeT) =>
  v === "ACCEPTED" ? themeT.statusCompletedText : v === "PARTIAL" ? themeT.newBadgeText : themeT.overdueText;
const verdictBg = (v, themeT) =>
  v === "ACCEPTED" ? themeT.statusCompletedBg : v === "PARTIAL" ? themeT.newBadgeBg : themeT.overdueBg;

function Skeleton({ w = "100%", h = 16, r, style = {} }) {
  return <div className="sp-skeleton" style={{ width: w, height: h, borderRadius: r ?? RADIUS.chip, ...style }} />;
}

/* ── Arc progress — track and label both read from tokens ── */
function ArcProgress({ pct, size = 80 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} role="img" aria-label={`${pct}% complete`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--sp-icon-bg)" strokeWidth={7} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--sp-accent1)" strokeWidth={7}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <text
        x="50%" y="50%" textAnchor="middle" dy="0.35em"
        style={{ fontSize: size * 0.195, fontWeight: 800, fill: "currentColor", fontFamily: FONT_FAMILY }}
      >
        {pct}%
      </text>
    </svg>
  );
}

function SmallArc({ pct, size = 44 }) {
  const r = (size - 7) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} role="img" aria-label={`${pct}% of section complete`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--sp-icon-bg)" strokeWidth={5} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--sp-accent1)" strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x="50%" y="50%" textAnchor="middle" dy="0.35em"
        style={{ fontSize: size * 0.22, fontWeight: 800, fill: "var(--sp-accent1)", fontFamily: FONT_FAMILY }}
      >
        {pct}%
      </text>
    </svg>
  );
}

export default function StudentStudyPlanPage() {
  const { isDark, themeT } = useTheme();

  const [batchId, setBatchId] = useState(null);
  const [batchLoading, setBatchLoading] = useState(true);
  const [batchError, setBatchError] = useState(false);
  const [view, setView] = useState("list");
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [compilerItem, setCompilerItem] = useState(null);
  const [problemDetail, setProblemDetail] = useState(null);
  const [problemLoading, setProblemLoading] = useState(false);
  const [language, setLanguage] = useState("PYTHON");
  const [code, setCode] = useState(DEFAULT_CODE["PYTHON"]);
  const [runOutput, setRunOutput] = useState(null);
  const [judgeResult, setJudgeResult] = useState(null);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [canMarkDone, setCanMarkDone] = useState(false);
  const [markingItem, setMarkingItem] = useState(null);
  const [flashMsg, setFlashMsg] = useState("");
  const [flashType, setFlashType] = useState("ok");
  const [activeOutputTab, setActiveOutputTab] = useState("output");
  const [usage, setUsage] = useState(null);
  const [upgradeConfig, setUpgradeConfig] = useState(null);
  const textareaRef = useRef(null);

  const fetchUsage = () => {
    getCodingSolveUsage()
      .then((res) => setUsage(res.data))
      .catch(() => setUsage(null));
  };

  useEffect(() => {
    const init = async () => {
      setBatchLoading(true);
      try {
        const res = await getStudentClassroom();
        const classroom = res?.data || res;
        const id = classroom?.batchId || classroom?.id || null;
        if (id) setBatchId(id);
        else setBatchError(true);
      } catch {
        setBatchError(true);
      } finally {
        setBatchLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (batchId) fetchPlans();
  }, [batchId]);

  const fetchPlans = async () => {
    setPlansLoading(true);
    try {
      const res = await getStudentStudyPlans(batchId);
      setPlans(res.data || []);
    } catch {
      setPlans([]);
    } finally {
      setPlansLoading(false);
    }
  };

  const flash = (msg, type = "ok") => {
    setFlashMsg(msg);
    setFlashType(type);
    setTimeout(() => setFlashMsg(""), 3500);
  };

  const openPlan = async (plan) => {
    setPlanLoading(true);
    setView("detail");
    try {
      const res = await getStudentStudyPlanById(plan.id);
      setSelectedPlan(res.data);
      setExpandedSection(res.data?.sections?.[0]?.id ?? null);
    } catch {
      setSelectedPlan(null);
    } finally {
      setPlanLoading(false);
    }
  };

  const refreshPlanDetail = async () => {
    if (!selectedPlan) return;
    try {
      const res = await getStudentStudyPlanById(selectedPlan.id);
      setSelectedPlan(res.data);
    } catch {}
  };

  const openCompiler = async (item, sectionId) => {
    setProblemLoading(true);
    setView("compiler");
    setCompilerItem({ item, sectionId });
    setRunOutput(null);
    setJudgeResult(null);
    setCanMarkDone(false);
    setCode(DEFAULT_CODE[language]);
    fetchUsage();
    try {
      const res = await getStudentProblemById(item.problemId);
      setProblemDetail(res.data);
    } catch {
      setProblemDetail(null);
    } finally {
      setProblemLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang]);
    setRunOutput(null);
    setJudgeResult(null);
  };

  const handleRun = async () => {
    setRunLoading(true);
    setRunOutput(null);
    setJudgeResult(null);
    setActiveOutputTab("output");
    try {
      const stdin = problemDetail?.sampleInput || "";
      const res = await runCode(batchId, language, code, stdin);
      setRunOutput(res.data);
    } catch (e) {
      setRunOutput({ output: e.response?.data?.message || "Run failed.", status: "RUNTIME_ERROR" });
    } finally {
      setRunLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!problemDetail) return;
    setSubmitLoading(true);
    setJudgeResult(null);
    setRunOutput(null);
    setActiveOutputTab("results");
    try {
      const res = await submitCodeForJudge(problemDetail.id, batchId, language, code);
      const result = res.data;
      setJudgeResult(result);
      fetchUsage();
      if (result.overallVerdict === "ACCEPTED" || result.overallVerdict === "PARTIAL" || result.marksObtained > 0) {
        setCanMarkDone(true);
        flash("Solution passed. Mark it done to save your progress.", "ok");
      } else {
        flash("Solution did not pass. Review the failing cases and try again.", "err");
      }
    } catch (err) {
      const planError = parsePlanError(err);
      if (planError) {
        setUpgradeConfig({ featureLabel: planError.message });
      } else {
        setJudgeResult({ overallVerdict: "ERROR", marksObtained: 0, totalMarks: 0 });
        flash("Submission failed. Try again in a moment.", "err");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleMarkDone = async () => {
    if (!compilerItem || !judgeResult) return;
    setMarkingItem(compilerItem.item.id);
    try {
      await markStudyPlanProgress({
        studyPlanItemId: compilerItem.item.id,
        batchId,
        problemId: compilerItem.item.problemId,
        marksObtained: judgeResult.marksObtained || 0,
      });
      flash("Problem marked done.", "ok");
      await refreshPlanDetail();
      setView("detail");
      setCompilerItem(null);
      setProblemDetail(null);
      setJudgeResult(null);
      setCanMarkDone(false);
    } catch {
      flash("Progress could not be saved. Try again.", "err");
    } finally {
      setMarkingItem(null);
    }
  };

  const handleTabKey = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      const start = ta.selectionStart, end = ta.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 4; }, 0);
    }
  };

  const planProgress = (p) => {
    if (!p?.sections?.length) return 0;
    const total = p.sections.reduce((s, sec) => s + (sec.items?.length || 0), 0);
    const done = p.sections.reduce((s, sec) => s + (sec.items?.filter((i) => i.completed)?.length || 0), 0);
    return total ? Math.round((done / total) * 100) : 0;
  };

  const rootClass = `sp-root${isDark ? " sp-dark" : ""}`;

  if (batchLoading)
    return (
      <div className={rootClass}>
        <div className="sp-loading-screen">
          <div className="sp-spinner" />
          <div style={{ textAlign: "center" }}>
            <p className="sp-error-title">Loading workspace</p>
            <p className="sp-error-sub">Connecting to your batch</p>
          </div>
        </div>
      </div>
    );

  if (batchError)
    return (
      <div className={rootClass}>
        <div className="sp-error-screen">
          <div className="sp-error-icon-wrap"><AlertTriangle size={22} /></div>
          <div style={{ textAlign: "center" }}>
            <p className="sp-error-title">Batch could not be loaded</p>
            <p className="sp-error-sub">Ask your trainer to check your batch enrolment.</p>
          </div>
        </div>
      </div>
    );

  const FlashBar = () =>
    flashMsg ? <div className={`sp-flash ${flashType === "ok" ? "sp-flash-ok" : "sp-flash-err"}`}>{flashMsg}</div> : null;

  /* ══════════════════════════════════════════════════════
     COMPILER VIEW
  ══════════════════════════════════════════════════════ */
  if (view === "compiler") {
    const problem = problemDetail;
    const lineCount = code.split("\n").length;

    return (
      <div className={`sp-compiler-root${isDark ? " sp-dark" : ""}`}>
        {(runLoading || submitLoading) && (
          <div className="sp-run-overlay">
            <div className="sp-run-overlay-box">
              <div className="sp-run-spinner" />
              <div>
                <div className="sp-run-overlay-text">
                  {submitLoading ? <><Zap size={16} /> Judging your code</> : <><Play size={15} fill="currentColor" /> Running code</>}
                </div>
                <div className="sp-run-overlay-sub">
                  {submitLoading ? "Checking every test case" : "Testing with the sample input"}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="sp-compiler-header">
          <button
            className="sp-btn sp-btn-ghost"
            onClick={() => { setView("detail"); setCompilerItem(null); setProblemDetail(null); setJudgeResult(null); setCanMarkDone(false); }}
          >
            <ChevronLeft size={14} /> Back
          </button>
          <div className="sp-nav-sep" />
          <div className="sp-breadcrumb-row">
            <span className="sp-breadcrumb">Study Plans</span>
            <span className="sp-breadcrumb-sep"><ChevronRight size={12} /></span>
            {selectedPlan && <span className="sp-breadcrumb">{selectedPlan.title}</span>}
            <span className="sp-breadcrumb-sep"><ChevronRight size={12} /></span>
            <span className="sp-breadcrumb-active">{problem?.title || "Problem"}</span>
          </div>
          {problem && <span className="sp-item-diff-badge">{problem.difficulty}</span>}
          {usage && (
            <span className="sp-item-marks-badge">
              {usage.limit === "unlimited"
                ? "Unlimited solves"
                : `${usage.used}/${usage.limit} solves this month`}
            </span>
          )}

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <div className="sp-lang-toggle">
              {LANGUAGES.map((l) => {
                const LangIcon = LANG_ICON_CMP[l];
                return (
                  <button
                    key={l}
                    className={`sp-lang-btn${language === l ? " active" : ""}`}
                    onClick={() => handleLanguageChange(l)}
                  >
                    <LangIcon size={13} /> {LANG_LABEL[l]}
                  </button>
                );
              })}
            </div>
            <div className="sp-nav-sep" />
            <button className="sp-btn sp-btn-run" onClick={handleRun} disabled={runLoading || submitLoading}>
              <Play size={12} fill="currentColor" /> Run
            </button>
            <button className="sp-btn sp-btn-submit" onClick={handleSubmit} disabled={runLoading || submitLoading || !problem}>
              <Zap size={13} /> Submit
            </button>
            {canMarkDone && (
              <button className="sp-btn sp-btn-mark-done" onClick={handleMarkDone} disabled={!!markingItem}>
                {markingItem ? <><RefreshCw size={12} /> Saving</> : <><Check size={12} /> Mark done</>}
              </button>
            )}
          </div>
        </div>

        <FlashBar />

        {canMarkDone && (
          <div className="sp-mark-done-banner">
            <Trophy size={13} />
            Your solution passed. Select Mark done to save your progress.
          </div>
        )}

        <div className="sp-editor-layout">
          <div className="sp-problem-panel">
            {problemLoading ? (
              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                <Skeleton h={22} w="70%" /><Skeleton h={14} w="40%" /><Skeleton h={80} /><Skeleton h={60} /><Skeleton h={100} />
              </div>
            ) : !problem ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, padding: 32 }}>
                <div className="sp-error-icon-wrap"><AlertTriangle size={22} /></div>
                <p className="sp-error-sub" style={{ textAlign: "center" }}>Problem details could not be loaded. Go back and open it again.</p>
              </div>
            ) : (
              <div className="sp-problem-detail">
                <h2 className="sp-problem-detail-title">{problem.title}</h2>
                <div className="sp-problem-tags-row">
                  <span className="sp-item-diff-badge">{problem.difficulty}</span>
                  <span className="sp-item-marks-badge"><Trophy size={10} /> {problem.totalMarks} pts</span>
                </div>

                {[
                  { label: "Description", content: problem.description, mono: false },
                  { label: "Input format", content: problem.inputFormat, mono: false },
                  { label: "Output format", content: problem.outputFormat, mono: false },
                  { label: "Constraints", content: problem.constraints, mono: true },
                ].filter((s) => s.content).map(({ label, content, mono }) => (
                  <div key={label} style={{ marginBottom: 20 }}>
                    <div className="sp-section-label">{label}</div>
                    {mono ? <div className="sp-mono-block">{content}</div> : <p className="sp-desc-text">{content}</p>}
                  </div>
                ))}

                {(problem.sampleInput || problem.sampleOutput) && (
                  <div className="sp-io-grid">
                    {problem.sampleInput && (
                      <div className="sp-io-box">
                        <div className="sp-io-label">Input</div>
                        <pre className="sp-io-content">{problem.sampleInput}</pre>
                      </div>
                    )}
                    {problem.sampleOutput && (
                      <div className="sp-io-box out">
                        <div className="sp-io-label out">Output</div>
                        <pre className="sp-io-content out">{problem.sampleOutput}</pre>
                      </div>
                    )}
                  </div>
                )}

                {problem.visibleTestCases?.filter((tc) => !tc.isHidden).length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div className="sp-section-label">Sample test cases</div>
                    {problem.visibleTestCases.filter((tc) => !tc.isHidden).map((tc, i) => (
                      <div key={tc.id} className="sp-test-case">
                        <div className="sp-test-case-label">Case {i + 1}</div>
                        {tc.input && (
                          <div className="sp-test-row">
                            <span className="sp-test-key">Input</span>
                            <code className="sp-test-val">{tc.input}</code>
                          </div>
                        )}
                        <div className="sp-test-row">
                          <span className="sp-test-key">Expected</span>
                          <code className="sp-test-val out">{tc.expectedOutput}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="sp-getting-credit">
                  <div className="sp-getting-credit-label">Getting credit</div>
                  <div className="sp-getting-credit-text">
                    Write your solution, select <strong>Submit</strong>, then select{" "}
                    <strong className="done">Mark done</strong> once it passes.
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="sp-code-side">
            <div className="sp-editor-area-wrap">
              <div className="sp-line-numbers">
                {Array.from({ length: lineCount }, (_, i) => <div key={i} className="sp-line-num">{i + 1}</div>)}
              </div>
              <textarea
                ref={textareaRef}
                className="sp-code-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleTabKey}
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                aria-label="Code editor"
                placeholder="Start coding here"
              />
            </div>

            <div className="sp-output-panel">
              <div className="sp-output-tabs">
                {["output", "results"].map((tabName) => (
                  <button
                    key={tabName}
                    className={`sp-output-tab${activeOutputTab === tabName ? " active" : ""}`}
                    onClick={() => setActiveOutputTab(tabName)}
                  >
                    {tabName === "output" ? <><Play size={11} /> Output</> : <><Zap size={11} /> Results</>}
                  </button>
                ))}
                {judgeResult && (
                  <div className="sp-output-tab-meta">
                    <span className="sp-output-tab-count">{judgeResult.testCasesPassed}/{judgeResult.totalTestCases} passed</span>
                    <span
                      className="sp-status-chip"
                      style={{
                        color: verdictColor(judgeResult.overallVerdict, themeT),
                        background: verdictBg(judgeResult.overallVerdict, themeT),
                      }}
                    >
                      {judgeResult.overallVerdict === "ACCEPTED" ? <Check size={11} /> : <AlertTriangle size={11} />}
                      {judgeResult.overallVerdict}
                    </span>
                  </div>
                )}
              </div>

              <div className="sp-output-content">
                {activeOutputTab === "output" && (
                  <>
                    {!runOutput && !runLoading && (
                      <div className="sp-output-empty">
                        <Play size={22} />
                        <span>Select <strong>Run</strong> to test with the sample input</span>
                      </div>
                    )}
                    {runOutput && (
                      <div className="sp-slide-in">
                        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9, flexWrap: "wrap" }}>
                          <span
                            className="sp-status-chip"
                            style={{ color: statusColor(runOutput.status, themeT), background: statusBg(runOutput.status, themeT) }}
                          >
                            {runOutput.status === "SUCCESS" ? <Check size={11} /> : <AlertTriangle size={11} />}
                            {runOutput.status}
                          </span>
                          {runOutput.executionTimeMs && (
                            <span className="sp-exec-time"><Clock size={11} />{runOutput.executionTimeMs}ms</span>
                          )}
                        </div>
                        <pre className="sp-output-pre">{runOutput.output || "No output"}</pre>
                      </div>
                    )}
                  </>
                )}

                {activeOutputTab === "results" && (
                  <>
                    {!judgeResult && !submitLoading && (
                      <div className="sp-output-empty">
                        <Zap size={22} />
                        <span>Select <strong>Submit</strong> to judge all test cases</span>
                      </div>
                    )}
                    {judgeResult && (
                      <div className="sp-slide-in">
                        <div className="sp-judge-header">
                          <span className="sp-score-chip"><Trophy size={11} /> {judgeResult.marksObtained}/{judgeResult.totalMarks} pts</span>
                          {canMarkDone && (
                            <button
                              className="sp-btn sp-btn-mark-done"
                              onClick={handleMarkDone}
                              disabled={!!markingItem}
                              style={{ marginLeft: "auto", fontSize: "var(--sp-fs-sm)", padding: "4px 12px" }}
                            >
                              {markingItem ? "Saving" : <><Check size={11} /> Mark done</>}
                            </button>
                          )}
                        </div>
                        <div className="sp-judge-grid">
                          {judgeResult.judgeResults?.map((r, i) => (
                            <div key={i} className={`sp-judge-card ${r.passed ? "pass" : "fail"}`}>
                              <div className="sp-judge-card-top">
                                <span className="sp-judge-card-label">Test {i + 1}</span>
                                <span className={`sp-judge-card-verdict ${r.passed ? "pass" : "fail"}`}>{r.verdict}</span>
                              </div>
                              {!r.isHidden && r.actualOutput && <code className="sp-judge-card-val">{r.actualOutput}</code>}
                              {r.isHidden && <div className="sp-judge-card-hidden">Hidden</div>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {upgradeConfig && (
          <UpgradeModal
            isOpen={!!upgradeConfig}
            onClose={() => setUpgradeConfig(null)}
            planType="individual"
            userId={getAuthTokenUserId()}
            currentPlan={usage?.tier || "free"}
            availableTargetPlans={["pro", "premium"]}
            featureLabel={upgradeConfig.featureLabel}
            onSuccess={() => {
              setUpgradeConfig(null);
              fetchUsage();
            }}
          />
        )}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     LIST VIEW
  ══════════════════════════════════════════════════════ */
  if (view === "list") {
    const totalProblems = plans.reduce((s, p) => s + (p.totalProblems || 0), 0);
    const totalDone = plans.reduce(
      (s, p) => s + (p.sections?.reduce((ss, sec) => ss + (sec.items?.filter((i) => i.completed)?.length || 0), 0) || 0),
      0
    );

    return (
      <div className={rootClass}>
        <div className="sp-nav">
          <div className="sp-nav-left">
            <div className="sp-logo-icon"><BookOpen size={16} strokeWidth={1.8} /></div>
            <span className="sp-logo-text">Study Plans</span>
            <span className="sp-badge">Student</span>
          </div>
          <div className="sp-batch-pill">Batch #{batchId}</div>
        </div>

        <FlashBar />

        <div className="sp-main">
          <div style={{ marginBottom: 32 }}>
            <div className="sp-eyebrow-row">
              <span className="sp-eyebrow-icon"><BookOpen size={12} strokeWidth={2} /></span>
              <span className="sp-eyebrow-label">Study Plans</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <h1 className="sp-page-title">My study plans</h1>
                <p className="sp-page-sub">Track your progress and solve problems at your own pace</p>
              </div>
              {!plansLoading && plans.length > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  {[
                    { icon: <Layers size={13} />, label: `${plans.length} plan${plans.length !== 1 ? "s" : ""}` },
                    { icon: <Target size={13} />, label: `${totalProblems} problems` },
                    { icon: <Check size={13} />, label: `${totalDone} solved` },
                  ].map((s, i) => (
                    <div key={i} className="sp-stat-pill">{s.icon}{s.label}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="sp-divider" />

          {plansLoading ? (
            <div className="sp-plan-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ background: "var(--sp-card)", border: "1px solid var(--sp-border)", borderRadius: "var(--sp-radius)", overflow: "hidden" }}>
                  <Skeleton h={100} r={0} />
                  <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
                    <Skeleton h={18} w="65%" />
                    <Skeleton h={13} />
                    <Skeleton h={13} w="80%" />
                  </div>
                </div>
              ))}
            </div>
          ) : plans.length === 0 ? (
            <div className="sp-empty">
              <div className="sp-empty-icon"><BookOpen size={30} strokeWidth={1.5} /></div>
              <div>
                <div className="sp-empty-title">No study plans yet</div>
                <div className="sp-empty-sub">Your trainer hasn't assigned a plan to this batch. Check back after your next class.</div>
              </div>
            </div>
          ) : (
            <div className="sp-plan-grid">
              {plans.map((plan, idx) => {
                const pct = planProgress(plan);
                const doneCnt = plan.sections?.reduce((s, sec) => s + (sec.items?.filter((i) => i.completed)?.length || 0), 0) || 0;
                return (
                  <button
                    type="button"
                    key={plan.id}
                    className="sp-plan-card sp-fade-up"
                    onClick={() => openPlan(plan)}
                    style={{ animationDelay: `${idx * 0.06}s` }}
                  >
                    <div className="sp-plan-top">
                      <div className="sp-plan-icon-box"><PlanIcon name={plan.icon} size={26} /></div>
                      <ArcProgress pct={pct} size={56} />
                    </div>

                    <div className="sp-plan-body">
                      <div className="sp-plan-title">{plan.title}</div>
                      {plan.description && (
                        <div className="sp-plan-desc">
                          {plan.description.slice(0, 75)}{plan.description.length > 75 ? "…" : ""}
                        </div>
                      )}
                      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 14 }}>
                        <span className="sp-tag"><Target size={10} /> {plan.totalProblems || 0} problems</span>
                        {plan.dueDate && (
                          <span className="sp-tag"><Calendar size={10} /> Due {new Date(plan.dueDate).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div>
                        <div className="sp-progress-track">
                          <div className="sp-progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="sp-progress-label-row">
                          <span className="sp-progress-label">{pct}% complete</span>
                          <span className="sp-progress-label">{doneCnt}/{plan.totalProblems || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="sp-plan-footer">
                      <span className="sp-plan-footer-status">
                        {pct === 100 ? "Completed" : pct > 0 ? "In progress" : "Not started"}
                      </span>
                      <div className="sp-plan-footer-open">
                        Open plan <ChevronRight size={14} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     DETAIL VIEW
  ══════════════════════════════════════════════════════ */
  const plan = selectedPlan;
  const overallPct = plan ? planProgress(plan) : 0;

  return (
    <div className={rootClass}>
      <div className="sp-nav">
        <div className="sp-nav-left">
          <Button variant="ghost" icon={ChevronLeft} onClick={() => { setView("list"); setSelectedPlan(null); }}>
            Back
          </Button>
          <div className="sp-nav-sep" />
          <div className="sp-breadcrumb-row">
            <span className="sp-breadcrumb">Study Plans</span>
            <span className="sp-breadcrumb-sep"><ChevronRight size={12} /></span>
            <span className="sp-breadcrumb-active">{plan?.title || "Plan"}</span>
          </div>
        </div>
        <div className="sp-batch-pill">Batch #{batchId}</div>
      </div>

      <FlashBar />

      {planLoading ? (
        <div className="sp-detail-body" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18, paddingBottom: 40 }}>
          <Skeleton h={32} w="50%" />
          <Skeleton h={14} w="70%" />
          <Skeleton h={110} />
          <Skeleton h={180} />
        </div>
      ) : !plan ? (
        <div className="sp-detail-body" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, paddingBottom: 40 }}>
          <div className="sp-error-icon-wrap"><AlertTriangle size={22} /></div>
          <p className="sp-error-sub">This plan could not be loaded. Go back and open it again.</p>
          <Button variant="ghost" icon={ChevronLeft} onClick={() => setView("list")}>Go back</Button>
        </div>
      ) : (
        <div style={{ flex: 1, paddingBottom: 80 }}>
          <div className="sp-detail-body">
            <div className="sp-hero">
              <div className="sp-hero-content">
                <div className="sp-hero-main">
                  <div className="sp-plan-icon-box lg"><PlanIcon name={plan.icon} size={36} /></div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h1 className="sp-hero-title">{plan.title}</h1>
                    {plan.description && <p className="sp-hero-desc">{plan.description}</p>}
                    <div className="sp-hero-tags">
                      {[
                        { icon: <Target size={12} />, label: `${plan.totalProblems || 0} problems` },
                        plan.dueDate && { icon: <Calendar size={12} />, label: `Due ${new Date(plan.dueDate).toLocaleDateString()}` },
                        {
                          icon: overallPct === 100 ? <Check size={12} /> : <FileText size={12} />,
                          label: overallPct === 100 ? "Completed" : `${overallPct}% done`,
                          done: overallPct === 100,
                        },
                      ].filter(Boolean).map((tag, i) => (
                        <span key={i} className={`sp-hero-tag${tag.done ? " sp-hero-tag-done" : ""}`}>{tag.icon} {tag.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="sp-hero-arc-wrap">
                  <ArcProgress pct={overallPct} size={92} />
                  <div className="sp-hero-arc-label">Overall progress</div>
                </div>
              </div>
              <div className="sp-thin-progress">
                <div className="sp-thin-progress-fill" style={{ width: `${overallPct}%` }} />
              </div>
            </div>

            <div className="sp-howitworks">
              <span className="sp-howitworks-icon"><Lightbulb size={14} /></span>
              <span>
                Select <strong>Solve</strong>, write your solution, select <strong>Submit</strong>, then select{" "}
                <strong className="sp-done-hl">Mark done</strong> once it passes.
              </span>
            </div>

            {!plan.sections || plan.sections.length === 0 ? (
              <div className="sp-empty">
                <div className="sp-empty-icon"><Layers size={26} strokeWidth={1.5} /></div>
                <div className="sp-empty-sub">This plan has no sections yet.</div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {plan.sections.map((section, si) => {
                  const total = section.items?.length || 0;
                  const done = section.items?.filter((i) => i.completed)?.length || 0;
                  const sPct = total ? Math.round((done / total) * 100) : 0;
                  const isOpen = expandedSection === section.id;

                  return (
                    <div key={section.id} className="sp-section-card sp-fade-up" style={{ animationDelay: `${si * 0.06}s` }}>
                      <button
                        type="button"
                        className={`sp-section-header-row${isOpen ? " open" : ""}`}
                        aria-expanded={isOpen}
                        onClick={() => setExpandedSection(isOpen ? null : section.id)}
                      >
                        <div style={{ flex: 1 }}>
                          <div className="sp-section-eyebrow">Section {si + 1}</div>
                          <div className="sp-section-title">{section.title}</div>
                          {section.description && <div className="sp-section-desc">{section.description}</div>}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                          <div style={{ textAlign: "right" }}>
                            <div className="sp-section-done">{done}/{total}</div>
                            <div className="sp-section-done-label">done</div>
                          </div>
                          <SmallArc pct={sPct} size={42} />
                          <div className={`sp-chevron-wrap${isOpen ? " open" : ""}`}><ChevronDown size={13} /></div>
                        </div>
                      </button>

                      {isOpen && (
                        <div>
                          {!section.items || section.items.length === 0 ? (
                            <div className="sp-section-empty">No problems in this section yet.</div>
                          ) : (
                            section.items.map((item, ii) => (
                              <div key={item.id} className={`sp-item-row${item.completed ? " done" : ""}`}>
                                <div className="sp-item-index">{ii + 1}</div>
                                <div className={`sp-item-check${item.completed ? " done" : ""}`}>
                                  {item.completed && <Check size={11} color="var(--sp-card)" strokeWidth={3} />}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div className={`sp-item-title${item.completed ? " done" : ""}`}>{item.problemTitle}</div>
                                  <div className="sp-item-tags">
                                    <span className="sp-item-diff-badge">{item.problemDifficulty}</span>
                                    <span className="sp-item-marks-badge"><Trophy size={9} /> {item.problemTotalMarks} pts</span>
                                    {item.completed && (
                                      <span className="sp-item-completed-badge"><Check size={9} /> Completed</span>
                                    )}
                                  </div>
                                </div>
                                <div style={{ flexShrink: 0 }}>
                                  {item.completed ? (
                                    <span className="sp-item-done-badge"><Check size={11} /> Done</span>
                                  ) : (
                                    <button className="sp-btn sp-btn-solve" onClick={() => openCompiler(item, section.id)}>
                                      Solve <ChevronRight size={13} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                          <div className="sp-section-progress">
                            <div className="sp-section-progress-fill" style={{ width: `${sPct}%` }} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}