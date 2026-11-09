"use client";

import React from "react";
import { GitBranch } from "lucide-react";
import {
  T,
  Button,
  Panel,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
} from "@/design-system";
import { NT_GAP, extendedKind } from "./ntUtils";
import { NtBanner } from "./ntForms";
import NtErrorNotice from "./NtErrorNotice";

/**
 * Error notice for the 3b pages. Handles the 3b-only cases and hands everything
 * else (disabled, forbidden, 429 with the server text, 400, 404, network ...)
 * to the 3a NtErrorNotice unchanged:
 *   NOTETRACKER_BUSY (503)               -> "busy, try again in a minute" + retry
 *   NOTETRACKER_WORKFLOWS_DISABLED (404) -> friendly panel (workflows page only)
 */
export default function NtApiError({ error, mode, onRetry, style }) {
  const t = T[mode] || T.light;
  if (!error) return null;
  const kind = extendedKind(error);

  if (kind === "workflowsDisabled") {
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
          <GitBranch size={28} color={t.emptyIcon} aria-hidden="true" />
          <h3
            style={{
              margin: 0,
              fontSize: FONT_SIZE.sectionTitle,
              fontWeight: FONT_WEIGHT.semibold,
              color: t.text,
            }}
          >
            Workflows are not enabled yet
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
            This part of Note Tracker has not been switched on for your workspace yet.
            Notes, resources and tasks keep working. Please check back later or contact
            your administrator.
          </p>
        </div>
      </Panel>
    );
  }

  if (kind === "busy") {
    return (
      <NtBanner tone="warning" title="Note Tracker is busy" mode={mode} style={style}>
        <div>Note Tracker is busy right now. Please try again in a minute.</div>
        {onRetry && (
          <div style={{ marginTop: NT_GAP.sm }}>
            <Button variant="secondary" size="sm" mode={mode} onClick={onRetry}>
              Try again
            </Button>
          </div>
        )}
      </NtBanner>
    );
  }

  return <NtErrorNotice error={error} mode={mode} onRetry={onRetry} style={style} />;
}
