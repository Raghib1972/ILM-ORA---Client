"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  CalendarDays,
  Video,
  Calendar as CalendarIcon,
  RefreshCw,
  Mail,
  Clock,
  Share2,
  Link2,
  Bell,
  Contact,
  CalendarCheck2,
  Plug,
  Settings as SettingsIcon,
  X,
  Menu,
  FileText,
} from "lucide-react";

export const WORKSPACE_TABS = [
  {
    group: "Main",
    items: [
      { id: "overview", label: "Overview", icon: LayoutGrid },
      { id: "events", label: "Events", icon: CalendarDays },
      { id: "booking-pages", label: "Booking Pages", icon: Link2, badge: "New" },
      { id: "instant-meeting", label: "Instant Meeting", icon: Video },
      { id: "calendar", label: "Calendar", icon: CalendarIcon },
      { id: "calendar-sync", label: "Calendar Sync", icon: RefreshCw },
      { id: "summaries", label: "Summaries", icon: FileText },
      { id: "email", label: "Email", icon: Mail },
    ],
  },
  {
    group: "Manage",
    items: [
      { id: "my-schedules", label: "My Schedules", icon: Clock },
      { id: "shared-with-me", label: "Shared with Me", icon: Share2 },
      { id: "reminders", label: "Reminders", icon: Bell },
      { id: "contacts", label: "Contacts", icon: Contact },
    ],
  },
  {
    group: "Configuration",
    items: [
      { id: "availability", label: "Availability", icon: CalendarCheck2 },
      { id: "integrations", label: "Integrations", icon: Plug },
      { id: "workspace-settings", label: "Workspace Settings", icon: SettingsIcon },
    ],
  },
];

// Calendry product mein sirf ye 4 tabs dikhte hain
const CALENDRY_TAB_IDS = ["booking-pages", "calendar", "calendar-sync", "availability"];

const CALENDRY_TABS = WORKSPACE_TABS.map((g) => ({
  ...g,
  items: g.items.filter((i) => CALENDRY_TAB_IDS.includes(i.id)),
})).filter((g) => g.items.length > 0);

export default function WorkspaceSidebar({
  active,
  onSelect,
  isOpen = false,
  onClose,
  mode = "workspace",
}) {
  const [collapsed, setCollapsed] = useState(false);
  const isCalendry = mode === "calendar";
  const tabs = isCalendry ? CALENDRY_TABS : WORKSPACE_TABS;
  const headLabel = isCalendry ? "Calendry" : "Workspace";

  return (
    <aside className={`ws-sidebar ${isOpen ? "is-open" : ""} ${collapsed ? "is-collapsed" : ""}`}>
      <div className="ws-sidebar-head">
        {!collapsed && (
          <span className="ws-sidebar-head-label">
                       <LayoutGrid size={16} color="var(--brand)" />
            {headLabel}
          </span>
        )}
        <button
          type="button"
          className="ws-sidebar-collapse"
          onClick={() => setCollapsed((p) => !p)}
          aria-label={collapsed ? "Expand navigation menu" : "Collapse navigation menu"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <Menu size={16} />
        </button>
        <button
          type="button"
          className="ws-sidebar-close"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X size={16} />
        </button>
      </div>
            {tabs.map((group) => (
        <div className="ws-group" key={group.group}>
          {!collapsed && <div className="ws-group-label">{group.group}</div>}
          {group.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`ws-item ${active === item.id ? "is-active" : ""}`}
              onClick={() => onSelect(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={15} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && item.badge && (
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 999,
                    background: "var(--brand, #7c3aed)",
                    color: "#fff",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      ))}
    </aside>
  );
}