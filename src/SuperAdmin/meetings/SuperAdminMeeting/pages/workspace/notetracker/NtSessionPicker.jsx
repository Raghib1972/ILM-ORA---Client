"use client";

import React, { useEffect, useRef, useState } from "react";
import { ClipboardList, Mic, RefreshCw, Users } from "lucide-react";
import {
  T,
  Badge,
  Button,
  Panel,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  RADIUS,
  CLAUDE_ACCENT,
} from "@/design-system";
import {
  getNoteTrackerDays,
  getNoteTrackerSessions,
  noteTrackerErrorInfo,
} from "../../../../../../services/noteTrackerService";
import {
  NT_GAP,
  daysAgoIst,
  fmtDateLabel,
  inputStyle,
  isFatalError,
  reportBadge,
  todayIst,
} from "./ntUtils";
import NtErrorNotice from "./NtErrorNotice";
import { NtSkeletonRows } from "./NtSkeleton";

function SessionItem({ s, mode, active, onSelect }) {
  const t = T[mode] || T.light;
  const [hov, setHov] = useState(false);
  const rb = reportBadge(s.reportStatus);

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(s)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        padding: NT_GAP.md,
        fontFamily: FONT_FAMILY,
        color: t.text,
        background: hov ? t.recentItemBgHov : t.recentItemBg,
        border: `1px solid ${active ? CLAUDE_ACCENT : t.recentItemBorder}`,
        borderRadius: RADIUS.messageBubble,
        transition: "all 0.15s ease",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: NT_GAP.sm,
        }}
      >
        <span style={{ fontSize: FONT_SIZE.cardLabel, fontWeight: FONT_WEIGHT.semibold }}>
          {s.label || "Meeting"}
        </span>
        {rb && <Badge tone={rb.tone}>{rb.label}</Badge>}
      </span>
      <span
        style={{
          display: "block",
          marginTop: NT_GAP.xs,
          fontSize: FONT_SIZE.bodySmall,
          fontWeight: FONT_WEIGHT.medium,
          overflowWrap: "anywhere",
        }}
      >
        {s.title || "Untitled meeting"}
      </span>
      <span
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: NT_GAP.xs + 2,
          marginTop: NT_GAP.xs,
          fontSize: FONT_SIZE.caption,
          color: t.textSub,
        }}
      >
        <span>{`${s.startedAtIst || "—"} – ${s.endedAtIst || "ongoing"}`}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
          <Users size={11} aria-hidden="true" /> {s.participantCount ?? 0}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
          <Mic size={11} aria-hidden="true" /> {s.speakerCount ?? 0}
        </span>
      </span>
    </button>
  );
}

/**
 * Day chips + date input + sessions of the chosen day.
 * @param {"light"|"dark"} mode
 * @param {string|null} selectedId        highlighted sessionId
 * @param {(session, date) => void} onSelect
 * @param {(info) => void} [onFatal]      called for NOTETRACKER_DISABLED / 403
 * @param {string} [initialDate]          yyyy-MM-dd (defaults to today, IST)
 */
export default function NtSessionPicker({
  mode,
  selectedId,
  onSelect,
  onFatal,
  initialDate,
}) {
  const t = T[mode] || T.light;
  const [date, setDate] = useState(initialDate || todayIst());
  const [days, setDays] = useState([]);
  const [daysLoading, setDaysLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  const onFatalRef = useRef(onFatal);
  useEffect(() => {
    onFatalRef.current = onFatal;
  }, [onFatal]);

  // days (last 30 days, IST)
  useEffect(() => {
    let off = false;
    setDaysLoading(true);
    getNoteTrackerDays({ from: daysAgoIst(30), to: todayIst(), page: 0, size: 31 })
      .then((res) => {
        if (!off) setDays(res.data?.items || []);
      })
      .catch((e) => {
        if (off) return;
        const info = noteTrackerErrorInfo(e);
        if (isFatalError(info)) onFatalRef.current?.(info);
      })
      .finally(() => {
        if (!off) setDaysLoading(false);
      });
    return () => {
      off = true;
    };
  }, [tick]);

  // sessions of the chosen date
  useEffect(() => {
    let off = false;
    setLoading(true);
    setError(null);
    getNoteTrackerSessions({ date, page: 0, size: 50 })
      .then((res) => {
        if (!off) setSessions(res.data?.items || []);
      })
      .catch((e) => {
        if (off) return;
        const info = noteTrackerErrorInfo(e);
        setSessions([]);
        if (isFatalError(info)) onFatalRef.current?.(info);
        else setError(info);
      })
      .finally(() => {
        if (!off) setLoading(false);
      });
    return () => {
      off = true;
    };
  }, [date, tick]);

  return (
    <Panel
      mode={mode}
      title="Meetings"
      action={
        <Button
          variant="ghost"
          size="sm"
          mode={mode}
          icon={RefreshCw}
          onClick={() => setTick((n) => n + 1)}
          aria-label="Refresh meetings"
        >
          Refresh
        </Button>
      }
    >
      <input
        type="date"
        aria-label="Meeting date"
        value={date}
        max={todayIst()}
        onChange={(e) => e.target.value && setDate(e.target.value)}
        style={{ ...inputStyle(t, mode), marginBottom: NT_GAP.sm }}
      />

      {daysLoading && days.length === 0 && (
        <div style={{ marginBottom: NT_GAP.sm }}>
          <NtSkeletonRows count={1} height={28} mode={mode} />
        </div>
      )}
      {days.length > 0 && (
        <div
          role="group"
          aria-label="Recent days"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: NT_GAP.xs + 2,
            marginBottom: NT_GAP.md,
          }}
        >
          {days.slice(0, 10).map((d) => {
            const active = d.date === date;
            return (
              <button
                key={d.date}
                type="button"
                aria-pressed={active}
                onClick={() => setDate(d.date)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: NT_GAP.xs + 2,
                  cursor: "pointer",
                  padding: `${NT_GAP.xs}px ${NT_GAP.md - 2}px`,
                  borderRadius: RADIUS.pill,
                  fontFamily: FONT_FAMILY,
                  fontSize: FONT_SIZE.caption,
                  fontWeight: active ? FONT_WEIGHT.bold : FONT_WEIGHT.regular,
                  background: t.pillBg,
                  color: active ? CLAUDE_ACCENT : t.pillText,
                  border: `1px solid ${active ? CLAUDE_ACCENT : t.pillBorder}`,
                }}
              >
                {fmtDateLabel(d.date)}
                <span style={{ fontWeight: FONT_WEIGHT.bold }}>{d.sessionCount}</span>
              </button>
            );
          })}
        </div>
      )}

      {loading && <NtSkeletonRows count={3} height={72} mode={mode} />}

      {!loading && error && (
        <NtErrorNotice error={error} mode={mode} onRetry={() => setTick((n) => n + 1)} />
      )}

      {!loading && !error && sessions.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: NT_GAP.sm,
            padding: `${NT_GAP.md * 2}px ${NT_GAP.md}px`,
            textAlign: "center",
            borderRadius: RADIUS.messageBubble,
            background: t.emptyBg,
            border: `1px dashed ${t.emptyBorder}`,
            color: t.textSub,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.bodySmall,
          }}
        >
          <ClipboardList size={22} color={t.emptyIcon} aria-hidden="true" />
          No recorded meetings on this day.
        </div>
      )}

      {!loading && !error && sessions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: NT_GAP.sm }}>
          {sessions.map((s) => (
            <SessionItem
              key={s.sessionId}
              s={s}
              mode={mode}
              active={selectedId === s.sessionId}
              onSelect={(item) => onSelect(item, date)}
            />
          ))}
        </div>
      )}
    </Panel>
  );
}
