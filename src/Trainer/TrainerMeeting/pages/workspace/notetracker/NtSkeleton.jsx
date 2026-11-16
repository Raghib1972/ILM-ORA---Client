"use client";

import React from "react";
import { T, FONT_FAMILY, FONT_SIZE, RADIUS } from "@/design-system";
import { NT_GAP } from "./ntUtils";

// Requires the page to render <style>{NT_CSS}</style> (nt-skel / nt-dot animations).

export function NtSkeletonRows({ count = 3, height = 56, mode }) {
  const t = T[mode] || T.light;
  return (
    <div
      aria-busy="true"
      aria-label="Loading"
      style={{ display: "flex", flexDirection: "column", gap: NT_GAP.sm }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="nt-skel"
          style={{
            height,
            borderRadius: RADIUS.messageBubble,
            background: t.courseSkeletonBg,
          }}
        />
      ))}
    </div>
  );
}

// "Thinking" bubble shown while the model answers (can take up to ~60 s).
export function NtThinking({ mode, label = "Reading the meeting…" }) {
  const t = T[mode] || T.light;
  const dot = {
    width: 6,
    height: 6,
    borderRadius: RADIUS.pill,
    background: t.textMuted,
    display: "inline-block",
  };
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: NT_GAP.sm,
        padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
        borderRadius: RADIUS.messageBubble,
        background: t.recentItemBg,
        border: `1px solid ${t.recentItemBorder}`,
        color: t.textSub,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE.bodySmall,
      }}
    >
      <span style={{ display: "inline-flex", gap: NT_GAP.xs }} aria-hidden="true">
        <span className="nt-dot" style={dot} />
        <span className="nt-dot" style={dot} />
        <span className="nt-dot" style={dot} />
      </span>
      {label} This can take up to a minute.
    </div>
  );
}

export default NtSkeletonRows;
