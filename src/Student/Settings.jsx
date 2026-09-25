"use client";

import React, { useState } from "react";
import { useNavigate, useLocation } from "@/lib/routerCompat";
import { useTheme } from "../SuperAdmin/context/ThemeContext";
import { T, CLAUDE_ACCENT, CLAUDE_ACCENT_SOFT, useAutoDarkMode } from "@/design-system";
import {
  User,
  Shield,
  Bell,
  Palette,
  Mail,
  Lock,
  ChevronRight,
  Moon,
  Sun,
  Monitor,
  Check,
  Trash2,
  Smartphone,
  Globe,
  Key,
  AlertTriangle,
  Settings as SettingsIcon,
  Zap,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= BASE PATH ================= */
  const getBasePath = () => {
    if (location.pathname.startsWith("/student")) return "/student";
    if (location.pathname.startsWith("/trainer")) return "/trainer";
    if (location.pathname.startsWith("/admin")) return "/admin";
    if (location.pathname.startsWith("/business")) return "/business";
    return "";
  };

  const basePath = getBasePath();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Global design-system tokens — this page's colors now come from the
  // same T[mode] map every other Student page reads from, instead of
  // page-local Tailwind blue/slate classes.
  const isDark = useAutoDarkMode();
  const t = isDark ? T.dark : T.light;

  /* ================= THEME HANDLER ================= */
    const handleThemeChange = (newTheme) => {
    const wantDark =
      newTheme === "dark" ||
      (newTheme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (wantDark !== (theme === "dark")) toggleTheme();
  };

  /* ================= SMALL COMPONENTS ================= */

  const SettingCard = ({
    icon: Icon,
    title,
    description,
    children,
    badge,
  }) => (
    <div
      className="rounded-2xl shadow-sm hover:shadow-xl transition-all"
      style={{ border: `1px solid ${t.border}`, background: t.cardBg }}
    >
      <div className="p-6">
        <div className="flex gap-4">
          <div
            className="p-3 rounded-xl shadow-lg"
            style={{ background: CLAUDE_ACCENT }}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl" style={{ color: t.text, fontWeight: 600 }}>
                {title}
              </h2>

              {badge && (
                <span
                  className="text-xs px-2.5 py-1 rounded-full text-white"
                  style={{ background: CLAUDE_ACCENT, fontWeight: 600 }}
                >
                  {badge}
                </span>
              )}
            </div>

            <p className="text-sm" style={{ color: t.textSub }}>
              {description}
            </p>
          </div>
        </div>

        {children && <div className="mt-6 space-y-3">{children}</div>}
      </div>
    </div>
  );

  const ActionButton = ({ icon: Icon, label, onClick, subtitle }) => (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-4 rounded-xl transition hover:shadow-md"
      style={{ background: t.recentItemBg, border: `1px solid ${t.border}` }}
      onMouseEnter={(e) => (e.currentTarget.style.background = t.recentItemBgHov)}
      onMouseLeave={(e) => (e.currentTarget.style.background = t.recentItemBg)}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg" style={{ background: t.cardBg, border: `1px solid ${t.border}` }}>
          <Icon className="w-4 h-4" style={{ color: t.textSub }} />
        </div>
        <div className="text-left">
          <span className="text-sm block" style={{ color: t.text, fontWeight: 600 }}>
            {label}
          </span>
          {subtitle && (
            <span className="text-xs" style={{ color: t.textMuted }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="w-5 h-5" style={{ color: t.textMuted }} />
    </button>
  );

  const ToggleSwitch = ({ label, description, enabled, onChange }) => (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-xl transition"
      onMouseEnter={(e) => (e.currentTarget.style.background = t.recentItemBg)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div>
        <p className="text-sm" style={{ color: t.text, fontWeight: 600 }}>
          {label}
        </p>
        <p className="text-xs" style={{ color: t.textMuted }}>
          {description}
        </p>
      </div>

      <button
        onClick={() => onChange(!enabled)}
        className="relative w-12 h-6 rounded-full transition"
        style={{ background: enabled ? CLAUDE_ACCENT : t.pillBg }}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );

  const ThemeOption = ({ value, icon: Icon, label, description }) => {
    const selected = theme === value;
    return (
      <button
        onClick={() => handleThemeChange(value)}
        className="flex items-center gap-4 w-full px-5 py-4 rounded-xl transition"
        style={{
          border: `1px solid ${selected ? CLAUDE_ACCENT : t.border}`,
          background: selected ? CLAUDE_ACCENT_SOFT : "transparent",
        }}
        onMouseEnter={(e) => {
          if (!selected) e.currentTarget.style.background = t.recentItemBg;
        }}
        onMouseLeave={(e) => {
          if (!selected) e.currentTarget.style.background = "transparent";
        }}
      >
        <div
          className="p-2.5 rounded-lg"
          style={{
            background: selected ? CLAUDE_ACCENT : t.pillBg,
            color: selected ? "#fff" : t.textSub,
          }}
        >
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 text-left">
          <p className="text-sm" style={{ color: t.text, fontWeight: 600 }}>
            {label}
          </p>
          <p className="text-xs" style={{ color: t.textMuted }}>
            {description}
          </p>
        </div>

        {selected && (
          <div className="p-1 rounded-full" style={{ background: CLAUDE_ACCENT }}>
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </button>
    );
  };

  /* ================= RENDER ================= */

  return (
    <div className="min-h-screen px-6 py-8" style={{ background: t.pageBg, transition: "background 0.3s, color 0.3s" }}>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ================= HERO ================= */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 shadow-2xl text-white"
          style={{ background: `linear-gradient(135deg, ${CLAUDE_ACCENT} 0%, #C2653F 100%)` }}
        >
          <div className="absolute inset-0 bg-white/10 dark:bg-black/10" />
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-white/30 backdrop-blur shadow">
              <SettingsIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl" style={{ fontWeight: 600 }}>Settings</h1>
              <p className="text-white/85">
                Customize your experience and manage preferences
              </p>
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <SettingCard
          icon={User}
          title="Account Information"
          description="Manage personal details"
        >
          <ActionButton
            icon={Mail}
            label="Email Address"
            subtitle="Update email"
            onClick={() => navigate(`${basePath}/settings/update-email`)}
          />
          <ActionButton
            icon={User}
            label="Edit Profile"
            subtitle="Update name and avatar"
            onClick={() => navigate(`${basePath}/edit-profile`)}
          />
        </SettingCard>

        {/* SECURITY */}
        <SettingCard
          icon={Shield}
          title="Security & Privacy"
          description="Protect your account"
          badge="Important"
        >
          <ActionButton
            icon={Lock}
            label="Change Password"
            onClick={() => navigate("/reset-password")}
          />
          <ActionButton
            icon={Key}
            label="Two-Factor Authentication"
            onClick={() => navigate(`${basePath}/settings/2fa`)}
          />
          <ActionButton
            icon={Smartphone}
            label="Trusted Devices"
            onClick={() => {}}
          />
        </SettingCard>

        {/* NOTIFICATIONS */}
        <SettingCard
          icon={Bell}
          title="Notifications"
          description="Manage alerts"
        >
          <ToggleSwitch
            label="Email Notifications"
            description="Receive updates via email"
            enabled={emailNotifications}
            onChange={setEmailNotifications}
          />
          <ToggleSwitch
            label="Push Notifications"
            description="Instant alerts"
            enabled={pushNotifications}
            onChange={setPushNotifications}
          />
          <ToggleSwitch
            label="Course Updates"
            description="New lessons & announcements"
            enabled={courseUpdates}
            onChange={setCourseUpdates}
          />
          <ToggleSwitch
            label="Weekly Digest"
            description="Weekly summary"
            enabled={weeklyDigest}
            onChange={setWeeklyDigest}
          />
        </SettingCard>

        {/* APPEARANCE */}
        <SettingCard
          icon={Palette}
          title="Appearance"
          description="Choose your theme"
        >
          <ThemeOption value="light" icon={Sun} label="Light Mode" />
          <ThemeOption value="dark" icon={Moon} label="Dark Mode" />
          <ThemeOption value="system" icon={Monitor} label="System Default" />
        </SettingCard>

        {/* DANGER ZONE */}
        <div
          className="rounded-2xl p-6"
          style={{ border: `2px solid ${t.overdueBorder}`, background: t.overdueBg }}
        >
          <div className="flex gap-4">
            <div className="p-3 rounded-xl" style={{ background: t.overdueBg }}>
              <AlertTriangle className="w-6 h-6" style={{ color: t.overdueText }} />
            </div>

            <div>
              <h3 className="text-xl" style={{ color: t.overdueText, fontWeight: 600 }}>
                Danger Zone
              </h3>
              <p className="text-sm mb-4" style={{ color: t.overdueText }}>
                Deleting your account is permanent and cannot be undone.
              </p>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure? This action cannot be undone."
                    )
                  ) {
                    navigate(`${basePath}/delete-account`);
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white"
                style={{ background: t.overdueText, fontWeight: 600 }}
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;