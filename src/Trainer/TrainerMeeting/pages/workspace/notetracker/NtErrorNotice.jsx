"use client";

import React from "react";
import { AlertTriangle, ClipboardList, RefreshCw } from "lucide-react";
import {
  T,
  Button,
  Panel,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  RADIUS,
} from "@/design-system";
import { NT_GAP, classifyError } from "./ntUtils";

// Maps an error info {status, code, message} to a friendly notice.
//  - disabled / forbidden  -> centred "screen" block (replaces the page content)
//  - limit                 -> amber banner with the server message
//  - validation / notfound / other -> red banner with the server message
//  - retry (503, network)  -> "Please try again in a moment" + retry button
export default function NtErrorNotice({ error, mode, onRetry, style }) {
  const t = T[mode] || T.light;
  if (!error) return null;
  const kind = classifyError(error);

  // ── full-screen style messages ──
  if (kind === "disabled" || kind === "forbidden") {
    const title =
      kind === "disabled"
        ? "Note Tracker is not enabled yet"
        : "You don't have access to Note Tracker";
    const text =
      kind === "disabled"
        ? "This feature has not been switched on for your workspace yet. Please check back later or contact your administrator."
        : "Note Tracker is available to Super Admins only.";
    return (
      <Panel mode={mode} style={style}>
        <div
          role="status"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: NT_GAP.sm,
            padding: `${NT_GAP.md * 2}px ${NT_GAP.md}px`,
            fontFamily: FONT_FAMILY,
          }}
        >
          <ClipboardList size={28} color={t.emptyIcon} aria-hidden="true" />
          <h3
            style={{
              margin: 0,
              fontSize: FONT_SIZE.sectionTitle,
              fontWeight: FONT_WEIGHT.semibold,
              color: t.text,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: 0,
              maxWidth: 420,
              fontSize: FONT_SIZE.body,
              lineHeight: LINE_HEIGHT.body,
              color: t.textSub,
            }}
          >
            {text}
          </p>
        </div>
      </Panel>
    );
  }

  // ── inline banners ──
  let title;
  let text;
  let tone = "error";
  let canRetry = false;

  if (kind === "limit") {
    title = "Daily limit reached";
    text =
      error.message ||
      "You have used all of today's questions. Please try again tomorrow.";
    tone = "warning";
  } else if (kind === "validation") {
    title = "Please check your request";
    text = error.message || "The request could not be accepted.";
  } else if (kind === "notfound") {
    title = "Not found";
    text = error.message || "We could not find that meeting or chat.";
  } else if (kind === "retry") {
    title = "Please try again in a moment";
    text =
      error.code === "TIMEOUT"
        ? error.message
        : "Note Tracker could not be reached right now.";
    canRetry = true;
  } else {
    title = "Something went wrong";
    text = error.message || "Something went wrong.";
    canRetry = true;
  }

  const bg = tone === "warning" ? t.newBadgeBg : t.overdueBg;
  const border = tone === "warning" ? t.newBadgeBorder : t.overdueBorder;
  const color = tone === "warning" ? t.newBadgeText : t.overdueText;

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: NT_GAP.sm,
        padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
        borderRadius: RADIUS.input,
        background: bg,
        border: `1px solid ${border}`,
        color,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE.bodySmall,
        lineHeight: LINE_HEIGHT.body,
        ...style,
      }}
    >
      <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: FONT_WEIGHT.semibold }}>{title}</div>
        <div style={{ overflowWrap: "anywhere" }}>{text}</div>
        {canRetry && onRetry && (
          <div style={{ marginTop: NT_GAP.sm }}>
            <Button
              variant="secondary"
              size="sm"
              mode={mode}
              icon={RefreshCw}
              onClick={onRetry}
            >
              Try again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
