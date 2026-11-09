"use client";

import React from "react";
import { AlertTriangle, Paperclip } from "lucide-react";
import { T, FONT_FAMILY, FONT_SIZE, LINE_HEIGHT, RADIUS } from "@/design-system";
import { NT_GAP, fmtNumber } from "./ntUtils";

// Two notices under an answer:
//  1. the meeting was too long to send in full (coverage.complete === false)  -> amber
//  2. attached resources were shortened (coverage.resources[].truncated)       -> muted
export default function NtCoverageNotice({ coverage, mode }) {
  const t = T[mode] || T.light;
  if (!coverage) return null;

  const incomplete = coverage.complete === false;
  const shortened = Array.isArray(coverage.resources)
    ? coverage.resources.filter((r) => r && r.truncated)
    : [];
  if (!incomplete && shortened.length === 0) return null;

  const ranges = Array.isArray(coverage.includedRanges)
    ? coverage.includedRanges
    : [];
  const rangeText = ranges
    .map((r) => `${r?.from ?? "?"} – ${r?.to ?? "?"}`)
    .join(", ");
  const hasCounts =
    Number.isFinite(Number(coverage.includedLines)) &&
    Number.isFinite(Number(coverage.totalLines)) &&
    Number(coverage.totalLines) > 0;

  const resourceText = shortened
    .map(
      (r) =>
        `${r.fileName || "A resource"} (${fmtNumber(r.includedChars)} of ${fmtNumber(r.totalChars)} characters)`,
    )
    .join("; ");

  return (
    <>
      {incomplete && (
        <div
          role="note"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: NT_GAP.sm,
            marginTop: NT_GAP.sm,
            padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
            borderRadius: RADIUS.input,
            background: t.newBadgeBg,
            border: `1px solid ${t.newBadgeBorder}`,
            color: t.newBadgeText,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.bodySmall,
            lineHeight: LINE_HEIGHT.body,
          }}
        >
          <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
          <span style={{ overflowWrap: "anywhere" }}>
            This meeting is long; the answer is based on these parts:{" "}
            {rangeText || "only part of the transcript"}
            {hasCounts
              ? ` (${coverage.includedLines} of ${coverage.totalLines} lines).`
              : "."}
          </span>
        </div>
      )}

      {shortened.length > 0 && (
        <div
          role="note"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: NT_GAP.sm,
            marginTop: NT_GAP.sm,
            padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
            borderRadius: RADIUS.input,
            background: t.pillBg,
            border: `1px solid ${t.pillBorder}`,
            color: t.pillText,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.bodySmall,
            lineHeight: LINE_HEIGHT.body,
          }}
        >
          <Paperclip size={14} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
          <span style={{ overflowWrap: "anywhere" }}>
            {`Only part of ${shortened.length === 1 ? "an attached file was" : "some attached files were"} used as context: ${resourceText}.`}
          </span>
        </div>
      )}
    </>
  );
}
