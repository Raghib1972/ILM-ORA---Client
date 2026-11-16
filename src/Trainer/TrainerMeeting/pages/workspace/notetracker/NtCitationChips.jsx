"use client";

import React from "react";
import { T, FONT_FAMILY, FONT_SIZE, RADIUS } from "@/design-system";
import { NT_GAP } from "./ntUtils";

// "[HH:mm:ss] person" chips under an answer. Read-only labels.
export default function NtCitationChips({ citations, mode }) {
  const t = T[mode] || T.light;
  if (!Array.isArray(citations) || citations.length === 0) return null;

  return (
    <div
      aria-label="Sources in the transcript"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: NT_GAP.xs + 2,
        marginTop: NT_GAP.sm,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZE.caption,
          color: t.textLabel,
        }}
      >
        Sources:
      </span>
      {citations.map((c, i) => (
        <span
          key={`${c?.time ?? ""}-${c?.person ?? ""}-${i}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: `${NT_GAP.xs / 2}px ${NT_GAP.sm}px`,
            borderRadius: RADIUS.pill,
            background: t.pillBg,
            border: `1px solid ${t.pillBorder}`,
            color: t.pillText,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.caption,
            whiteSpace: "nowrap",
          }}
        >
          {`[${c?.time ?? "--:--:--"}] ${c?.person ?? "Unknown"}`}
        </span>
      ))}
    </div>
  );
}
