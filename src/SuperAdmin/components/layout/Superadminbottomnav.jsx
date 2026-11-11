"use client";

// src/SuperAdmin/components/layout/SuperAdminBottomNav.jsx
// Phase 2B — phone-only (<768px) bottom tab bar for the SuperAdmin shell.
// Every path below already exists in SuperAdminNavbar's NAV config — no new routes.
// "More" opens the navbar's existing drawer through a window event.
import React from "react";
import { useLocation, useNavigate } from "@/lib/routerCompat";
import { BarChart3, Building2, LayoutDashboard, Menu, TrendingUp } from "lucide-react";

const ITEMS = [
  { name: "Dashboard", path: "/superadmin", icon: LayoutDashboard, exact: true },
  { name: "Orgs", path: "/superadmin/organizations", icon: Building2 },
  { name: "Sales", path: "/superadmin/sales-management", icon: TrendingUp },
  { name: "Analytics", path: "/superadmin/analytics", icon: BarChart3 },
];

const CSS = `
  .sabn-root { display: none; }
  @media (max-width: 767px) {
    .sabn-root {
      display: flex; align-items: stretch;
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 40;
      height: calc(var(--bottom-nav-h, 60px) + env(safe-area-inset-bottom, 0px));
      padding: 0 env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px);
    }
    .sabn-root[data-dark="false"] { background: rgba(255,255,255,0.97); border-top: 1px solid rgba(0,0,0,0.09); box-shadow: 0 -2px 12px rgba(0,0,0,0.06); }
    .sabn-root[data-dark="true"]  { background: rgba(13,13,20,0.97); border-top: 1px solid rgba(255,255,255,0.08); }
  }
  .sabn-item {
    flex: 1; min-width: 0; min-height: 44px;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
    border: none; background: transparent; cursor: pointer; padding: 4px 2px;
    font-family: inherit; font-size: 10.5px; font-weight: 600; line-height: 1.1;
    -webkit-tap-highlight-color: transparent;
    transition: color .15s, transform .12s;
  }
  .sabn-item span { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .sabn-item:active { transform: scale(0.94); }
  .sabn-root[data-dark="false"] .sabn-item { color: #64748b; }
  .sabn-root[data-dark="true"]  .sabn-item { color: #94a3b8; }
  .sabn-root[data-dark="false"] .sabn-item.active { color: #7c3aed; }
  .sabn-root[data-dark="true"]  .sabn-item.active { color: #a78bfa; }
  @media (prefers-reduced-motion: reduce) {
    .sabn-item { transition: none; }
    .sabn-item:active { transform: none; }
  }
`;

const SuperAdminBottomNav = ({ dark }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (it) =>
    it.exact
      ? pathname === it.path
      : pathname === it.path || pathname.startsWith(it.path + "/");

  return (
    <nav className="sabn-root" data-dark={String(!!dark)} aria-label="Primary">
      <style>{CSS}</style>
      {ITEMS.map((it) => {
        const Icon = it.icon;
        const active = isActive(it);
        return (
          <button
            key={it.path}
            type="button"
            className={`sabn-item ${active ? "active" : ""}`}
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
        className="sabn-item"
        aria-label="More — open full menu"
        onClick={() => window.dispatchEvent(new Event("ilm:open-nav"))}
      >
        <Menu size={20} />
        <span>More</span>
      </button>
    </nav>
  );
};

export default SuperAdminBottomNav;