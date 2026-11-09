"use client";

import React, { useState } from "react";
import {
  FileText,
  CheckSquare,
  Award,
  AlertTriangle,
  Mic,
  ClipboardList,
  BarChart2,
  Mail,
} from "lucide-react";
import {
  T,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  RADIUS,
  CLAUDE_ACCENT,
  CLAUDE_ACCENT_SOFT,
} from "@/design-system";
import { NT_GAP } from "./ntUtils";

// Modes that need no question (ASK is the normal text input of the chat).
export const QUICK_MODES = [
  { mode: "SUMMARY", label: "Summary", description: "A short overview of the meeting", icon: FileText },
  { mode: "ACTION_ITEMS", label: "Action items", description: "Who needs to do what", icon: CheckSquare },
  { mode: "DECISIONS", label: "Decisions", description: "What was agreed", icon: Award },
  { mode: "BLOCKERS", label: "Blockers", description: "What is slowing people down", icon: AlertTriangle },
  { mode: "STANDUP_UPDATES", label: "Stand-up updates", description: "What each person shared", icon: Mic },
  { mode: "MINUTES", label: "Meeting minutes", description: "Formal notes of the meeting", icon: ClipboardList },
  { mode: "STATUS_UPDATE", label: "Status update", description: "A progress update to share", icon: BarChart2 },
  { mode: "FOLLOW_UP_EMAIL", label: "Follow-up email draft", description: "An email you can edit and send", icon: Mail },
];

function ModeCard({ item, mode, active, disabled, onPick }) {
  const t = T[mode] || T.light;
  const [hov, setHov] = useState(false);
  const Icon = item.icon;
  const activeBg = mode === "dark" ? t.iconBg : CLAUDE_ACCENT_SOFT;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={active}
      onClick={() => onPick(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: NT_GAP.md,
        textAlign: "left",
        padding: NT_GAP.md,
        fontFamily: FONT_FAMILY,
        color: t.text,
        background: active ? activeBg : hov && !disabled ? t.cardBgHov : t.cardBg,
        border: `1px solid ${active ? CLAUDE_ACCENT : hov && !disabled ? t.borderHov : t.border}`,
        borderRadius: RADIUS.messageBubble,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.55 : 1,
        transition: "all 0.15s ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: 30,
          height: 30,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: RADIUS.chip,
          background: t.iconBg,
          border: `1px solid ${t.iconBorder}`,
          color: CLAUDE_ACCENT,
        }}
      >
        <Icon size={16} />
      </span>
      <span style={{ minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: FONT_SIZE.cardLabel,
            fontWeight: FONT_WEIGHT.semibold,
          }}
        >
          {item.label}
        </span>
        <span
          style={{
            display: "block",
            marginTop: 2,
            fontSize: FONT_SIZE.caption,
            color: t.textSub,
          }}
        >
          {item.description}
        </span>
      </span>
    </button>
  );
}

/**
 * @param {"light"|"dark"} mode  theme
 * @param {string} [activeMode]  currently running quick mode (highlighted)
 * @param {boolean} [disabled]
 * @param {(item) => void} onPick  called with the QUICK_MODES entry
 */
export default function NtModeCards({ mode, activeMode, disabled = false, onPick }) {
  return (
    <div
      role="group"
      aria-label="Quick actions"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
        gap: NT_GAP.sm + 2,
      }}
    >
      {QUICK_MODES.map((item) => (
        <ModeCard
          key={item.mode}
          item={item}
          mode={mode}
          active={activeMode === item.mode}
          disabled={disabled}
          onPick={onPick}
        />
      ))}
    </div>
  );
}
