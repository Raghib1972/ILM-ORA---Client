"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, History, RefreshCw } from "lucide-react";
import {
  T,
  Button,
  Panel,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  RADIUS,
} from "@/design-system";
import {
  getNoteTrackerRuns,
  getNoteTrackerWorkflowRuns,
  getNoteTrackerWorkflows,
} from "../../../../../../services/noteTrackerService";
import {
  NT_GAP,
  fmtDateTimeIst,
  fmtDuration,
  fmtNumber,
  runTriggerLabel,
  shortId,
} from "./ntUtils";
import useNtPagedList from "./useNtPagedList";
import NtApiError from "./NtApiError";
import NtStatusBadge from "./NtStatusBadge";
import { NtSkeletonRows } from "./NtSkeleton";
import { NtEmptyState, NtPager } from "./ntForms";

const fetchRuns = ({ workflowId, ...params }) =>
  workflowId ? getNoteTrackerWorkflowRuns(workflowId, params) : getNoteTrackerRuns(params);

const runSeconds = (run) => {
  const a = Date.parse(run.startedAt);
  const b = Date.parse(run.completedAt);
  return Number.isFinite(a) && Number.isFinite(b) && b >= a ? (b - a) / 1000 : null;
};

/**
 * Runs of one workflow (workflow given) or all runs (workflow = null).
 * @param {(run) => void} onOpenRun
 * @param {() => void} [onBack]    shown when looking at one workflow's runs
 */
export default function NtRunsPanel({ mode, workflow = null, onOpenRun, onBack, onFatal }) {
  const t = T[mode] || T.light;
  const [names, setNames] = useState({}); // workflowId -> name (best effort, "all runs" view)
  const list = useNtPagedList(fetchRuns, { workflowId: workflow?.id }, { onFatal });

  useEffect(() => {
    if (workflow) return undefined;
    let off = false;
    getNoteTrackerWorkflows({ page: 0, size: 100 })
      .then((res) => {
        if (off) return;
        const map = {};
        (res.data?.items || []).forEach((w) => {
          map[w.id] = w.name;
        });
        setNames(map);
      })
      .catch(() => {}); // names are a nicety; the list works without them
    return () => {
      off = true;
    };
  }, [workflow]);

  const small = { fontFamily: FONT_FAMILY, fontSize: FONT_SIZE.caption, color: t.textSub };

  return (
    <div className="nt-stack">
      {onBack && (
        <div>
          <Button variant="ghost" size="sm" mode={mode} icon={ChevronLeft} onClick={onBack}>
            Back to workflows
          </Button>
        </div>
      )}
      <Panel
        mode={mode}
        title={workflow ? `Runs of “${workflow.name}”` : "All runs"}
        action={
          <Button variant="ghost" size="sm" mode={mode} icon={RefreshCw} onClick={list.reload} aria-label="Refresh runs">
            Refresh
          </Button>
        }
      >
        {list.loading && <NtSkeletonRows count={4} height={64} mode={mode} />}

        {!list.loading && list.error && <NtApiError error={list.error} mode={mode} onRetry={list.reload} />}

        {!list.loading && !list.error && list.items.length === 0 && (
          <NtEmptyState
            mode={mode}
            icon={History}
            title="No runs yet"
            text={
              workflow
                ? "Run this workflow on a meeting, or activate it to run on new meetings."
                : "When a workflow runs, it appears here."
            }
          />
        )}

        {!list.loading && !list.error && list.items.length > 0 && (
          <>
            <ul
              aria-label="Runs"
              style={{ display: "flex", flexDirection: "column", gap: NT_GAP.sm, margin: 0, padding: 0 }}
            >
              {list.items.map((run) => {
                const secs = runSeconds(run);
                const tokens = (Number(run.promptTokens) || 0) + (Number(run.completionTokens) || 0);
                const title = workflow ? null : names[run.workflowId] || `Workflow ${shortId(run.workflowId)}`;
                return (
                  <li
                    key={run.id}
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: NT_GAP.md,
                      padding: NT_GAP.md,
                      borderRadius: RADIUS.messageBubble,
                      background: t.recentItemBg,
                      border: `1px solid ${t.recentItemBorder}`,
                      minWidth: 0,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 200 }}>
                      {title && (
                        <div
                          style={{
                            fontFamily: FONT_FAMILY,
                            fontSize: FONT_SIZE.cardLabel,
                            fontWeight: FONT_WEIGHT.semibold,
                            color: t.text,
                            overflowWrap: "anywhere",
                            marginBottom: NT_GAP.xs,
                          }}
                        >
                          {title}
                        </div>
                      )}
                      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: NT_GAP.sm, ...small }}>
                        <NtStatusBadge kind="run" value={run.status} />
                        <span>{runTriggerLabel(run.triggeredBy)}</span>
                        <span>{`Meeting ${shortId(run.sessionId)}`}</span>
                        <span>{fmtDateTimeIst(run.createdAt)}</span>
                        {secs !== null && <span>{fmtDuration(secs)}</span>}
                        {tokens > 0 && <span>{`${fmtNumber(tokens)} tokens`}</span>}
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      mode={mode}
                      onClick={() => onOpenRun(run)}
                      aria-label={`View run from ${fmtDateTimeIst(run.createdAt)}`}
                    >
                      View details
                    </Button>
                  </li>
                );
              })}
            </ul>
            <NtPager
              mode={mode}
              page={list.page}
              totalPages={list.totalPages}
              totalElements={list.totalElements}
              onPage={list.setPage}
            />
          </>
        )}
      </Panel>
    </div>
  );
}
