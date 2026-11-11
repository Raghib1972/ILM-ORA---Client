"use client";

// Phase 2A — role-aware bottom tab bar (phones only, < 768px).
// Every path below already exists in TopNavbar's menus — no new routes.
// "More" opens the existing TopNavbar drawer via a window event
// (same pattern as the existing "lms:notification" event).
import React from "react";
import { useLocation, useNavigate } from "@/lib/routerCompat";
import {
  BookOpen,
  Building2,
  ClipboardCheck,
  ClipboardEdit,
  FileText,
  Layers,
  LayoutDashboard,
  Menu,
  Radio,
} from "lucide-react";

const BOTTOM_NAV = {
  STUDENT: [
    { name: "Home", path: "/student", icon: LayoutDashboard, exact: true },
    { name: "Classes", path: "/student/live-classes", icon: Radio },
    { name: "Assignments", path: "/student/assignments", icon: ClipboardEdit },
    { name: "Learn", path: "/student/courses", icon: BookOpen },
  ],
  TRAINER: [
    { name: "Home", path: "/trainer", icon: LayoutDashboard, exact: true },
    { name: "Live", path: "/trainer/live", icon: Radio },
    { name: "Batches", path: "/trainer/batches", icon: Layers },
    { name: "Assess", path: "/trainer/assessments", icon: ClipboardCheck },
  ],
  ADMIN: [
    { name: "Home", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Org", path: "/admin/organisation-overview", icon: Building2 },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Reports", path: "/admin/reports", icon: FileText },
  ],
};

const BN_CSS = `
  .bn-root { display: none; }

  @media (max-width: 767px) {
    .bn-root {
      display: flex; align-items: stretch;
      position: fixed; left: 0; right: 0; bottom: 0;
      z-index: var(--z-nav, 30);
      height: calc(var(--bottom-nav-h, 60px) + env(safe-area-inset-bottom, 0px));
      padding: 0 env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px);
    }
    .bn-root[data-dark="false"] { background: rgba(255,255,255,0.97); border-top: 1px solid rgba(226,232,240,0.9); box-shadow: 0 -2px 12px rgba(0,0,0,0.06); }
    .bn-root[data-dark="true"]  { background: rgba(10,10,10,0.97); border-top: 1px solid rgba(255,255,255,0.08); }
  }

  .bn-item {
    flex: 1; min-width: 0; min-height: 44px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
    border: none; background: transparent; cursor: pointer; padding: 4px 2px;
    font-family: inherit; font-size: 10.5px; font-weight: 600; line-height: 1.1;
    -webkit-tap-highlight-color: transparent;
    transition: color .15s, transform .12s;
  }
  .bn-item span { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bn-item:active { transform: scale(0.94); }
  .bn-root[data-dark="false"] .bn-item { color: #64748b; }
  .bn-root[data-dark="true"]  .bn-item { color: #94a3b8; }
  .bn-root[data-dark="false"] .bn-item.active { color: #2563eb; }
  .bn-root[data-dark="true"]  .bn-item.active { color: #60a5fa; }

  @media (prefers-reduced-motion: reduce) {
    .bn-item { transition: none; }
    .bn-item:active { transform: none; }
  }
`;

const BottomNav = ({ role, isDark }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const items = BOTTOM_NAV[role];
  if (!items) return null;

  const isActive = (it) =>
    it.exact
      ? location.pathname === it.path
      : location.pathname === it.path ||
        location.pathname.startsWith(it.path + "/");

  return (
    <nav className="bn-root" data-dark={String(!!isDark)} aria-label="Primary">
      <style>{BN_CSS}</style>
      {items.map((it) => {
        const Icon = it.icon;
        const active = isActive(it);
        return (
          <button
            key={it.path}
            type="button"
            className={`bn-item ${active ? "active" : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={() => navigate(it.path)}
          >
            <Icon size={20} />
            <span>{it.name}</span>
          </button>
        );
      })}
      <button
        type="button"
        className="bn-item"
        aria-label="More — open full menu"
        onClick={() => window.dispatchEvent(new Event("ilm:open-nav"))}
      >
        <Menu size={20} />
        <span>More</span>
      </button>
    </nav>
  );
};

export default BottomNav;