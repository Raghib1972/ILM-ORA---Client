"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, CheckCircle2, ChevronLeft, HelpCircle, ListChecks, Loader2, MinusCircle, XCircle } from "lucide-react";
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
import { getNoteTrackerWorkflow } from "../../../../../../services/noteTrackerService";
import {
  NT_GAP,
  fmtDateTimeIst,
  fmtDuration,
  fmtNumber,
  isRunFinal,
  runTriggerLabel,
  shortId,
} from "./ntUtils";
import useNtRunPolling from "./useNtRunPolling";
import NtApiError from "./NtApiError";
import NtStatusBadge from "./NtStatusBadge";
import NtAnswerText from "./NtAnswerText";
import NtCitationChips from "./NtCitationChips";
import { NtSkeletonRows } from "./NtSkeleton";
import { NtBanner } from "./ntForms";
import { nodeIcon } from "./NtNodeForms";
import { asArray, isWorkflowsFatal, nodeTitle, parseNodes, resultTitle } from "./ntWorkflowRules";

// ───────────── result of one node ─────────────
function NodeResult({ r, index, mode, onOpenNote, onOpenTasks }) {
  const t = T[mode] || T.light;
  const Icon = nodeIcon(r);
  const StatusIcon = r.status === "OK" ? CheckCircle2 : r.status === "FAILED" ? XCircle : MinusCircle;
  const tokens = (Number(r.promptTokens) || 0) + (Number(r.completionTokens) || 0);
  const muted = {
    margin: 0,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.bodySmall,
    lineHeight: LINE_HEIGHT.body,
    color: t.textSub,
    overflowWrap: "anywhere",
  };

  return (
    <li
      aria-label={`Step ${index + 1}: ${resultTitle(r)}`}
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: NT_GAP.sm,
        padding: NT_GAP.md,
        borderRadius: RADIUS.messageBubble,
        background: t.recentItemBg,
        border: `1px solid ${r.status === "FAILED" ? t.overdueBorder : t.recentItemBorder}`,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: NT_GAP.sm }}>
        <Icon size={16} color={t.textSub} aria-hidden="true" />
        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.cardLabel,
            fontWeight: FONT_WEIGHT.semibold,
            color: t.text,
            overflowWrap: "anywhere",
          }}
        >
          {`${index + 1}. ${resultTitle(r)}`}
        </span>
        <StatusIcon size={14} color={r.status === "OK" ? t.liveColor : t.textSub} aria-hidden="true" />
        <NtStatusBadge kind="node" value={r.status} />
      </div>

      {r.found === false && (
        <div
          role="note"
          style={{
            display: "flex",
            alignItems: "center",
            gap: NT_GAP.sm,
            padding: `${NT_GAP.xs + 2}px ${NT_GAP.md}px`,
            borderRadius: RADIUS.input,
            background: t.pillBg,
            border: `1px solid ${t.pillBorder}`,
            color: t.pillText,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.bodySmall,
          }}
        >
          <HelpCircle size={14} aria-hidden="true" />
          Not discussed in this meeting
        </div>
      )}

      {r.text && <NtAnswerText text={r.text} mode={mode} />}
      <NtCitationChips citations={r.citations} mode={mode} />

      {r.notice && <NtBanner tone="info" mode={mode}>{r.notice}</NtBanner>}
      {r.message && <p style={muted}>{r.message}</p>}

      {(r.noteId || Number(r.tasksCreated) > 0) && (
        <div className="nt-row-actions">
          {r.noteId && (
            <Button
              variant="secondary"
              size="sm"
              mode={mode}
              icon={BookOpen}
              disabled={!onOpenNote}
              onClick={() => onOpenNote && onOpenNote(r.noteId)}
            >
              Open note
            </Button>
          )}
          {Number(r.tasksCreated) > 0 && (
            <>
              <span style={{ ...muted, color: t.text }}>
                {`${r.tasksCreated} ${Number(r.tasksCreated) === 1 ? "task" : "tasks"} created`}
              </span>
              {onOpenTasks && (
                <Button variant="ghost" size="sm" mode={mode} icon={ListChecks} onClick={onOpenTasks}>
                  Open tasks
                </Button>
              )}
            </>
          )}
        </div>
      )}

      {tokens > 0 && (
        <p style={{ ...muted, fontSize: FONT_SIZE.caption, color: t.textMuted }}>{`${fmtNumber(tokens)} tokens`}</p>
      )}
    </li>
  );
}

// ───────────── a step that has not run yet ─────────────
function PendingNode({ node, index, mode, active }) {
  const t = T[mode] || T.light;
  const Icon = nodeIcon(node);
  return (
    <li
      aria-label={`Step ${index + 1}: ${nodeTitle(node)} (${active ? "running" : "waiting"})`}
      style={{
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        gap: NT_GAP.sm,
        padding: NT_GAP.md,
        borderRadius: RADIUS.messageBubble,
        border: `1px dashed ${t.emptyBorder}`,
        background: t.emptyBg,
        color: t.textSub,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE.bodySmall,
      }}
    >
      {active ? <Loader2 size={16} className="nt-spin" aria-hidden="true" /> : <Icon size={16} aria-hidden="true" />}
      <span style={{ overflowWrap: "anywhere" }}>{`${index + 1}. ${nodeTitle(node)}`}</span>
      <span style={{ marginLeft: "auto" }}>{active ? "Running…" : "Waiting"}</span>
    </li>
  );
}

// ───────────── run detail ─────────────
/**
 * Detail of one run. Polls while the run is PENDING / RUNNING (see useNtRunPolling).
 * @param {string} runId
 * @param {() => void} onBack
 * @param {(noteId: string) => void} [onOpenNote]
 * @param {() => void} [onOpenTasks]
 * @param {(info) => void} onFatal
 */
export default function NtRunDetail({ runId, mode, onBack, onOpenNote, onOpenTasks, onFatal }) {
  const t = T[mode] || T.light;
  const { run, loading, error, timedOut, polling, refresh } = useNtRunPolling(runId);
  const [workflow, setWorkflow] = useState(null);
  const workflowId = run?.workflowId;

  // escalate errors that replace the page
  useEffect(() => {
    if (error && isWorkflowsFatal(error)) onFatal(error);
  }, [error, onFatal]);

  // the workflow (best effort): its name and the list of steps, to show what is still to come
  useEffect(() => {
    if (!workflowId) return undefined;
    let off = false;
    getNoteTrackerWorkflow(workflowId)
      .then((res) => {
        if (!off) setWorkflow(res.data || null);
      })
      .catch(() => {
        if (!off) setWorkflow(null); // deleted or not readable: the results still show
      });
    return () => {
      off = true;
    };
  }, [workflowId]);

  const results = asArray(run?.result);
  const steps = workflow ? parseNodes(workflow.nodes) : [];
  const total = steps.length;
  const running = !!run && !isRunFinal(run.status);
  const tokens = run ? (Number(run.promptTokens) || 0) + (Number(run.completionTokens) || 0) : 0;
  const secs =
    run && Date.parse(run.startedAt) && Date.parse(run.completedAt)
      ? (Date.parse(run.completedAt) - Date.parse(run.startedAt)) / 1000
      : null;
  const pending = running ? steps.slice(results.length) : [];
  const small = { fontFamily: FONT_FAMILY, fontSize: FONT_SIZE.bodySmall, color: t.textSub };

  return (
    <div className="nt-stack">
      <div>
        <Button variant="ghost" size="sm" mode={mode} icon={ChevronLeft} onClick={onBack}>
          Back
        </Button>
      </div>

      {loading && !run && <NtSkeletonRows count={3} height={80} mode={mode} />}

      {error && !isWorkflowsFatal(error) && <NtApiError error={error} mode={mode} onRetry={refresh} />}

      {run && (
        <Panel mode={mode} title={workflow ? `Run of “${workflow.name}”` : "Workflow run"}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: NT_GAP.sm + NT_GAP.xs }}>
            <NtStatusBadge kind="run" value={run.status} />
            <span style={small}>{runTriggerLabel(run.triggeredBy)}</span>
            <span style={small}>{`Meeting ${shortId(run.sessionId)}`}</span>
            <span style={small}>{`Started ${fmtDateTimeIst(run.startedAt || run.createdAt)}`}</span>
            {run.completedAt && <span style={small}>{`Finished ${fmtDateTimeIst(run.completedAt)}`}</span>}
            {secs !== null && secs >= 0 && <span style={small}>{fmtDuration(secs)}</span>}
            {tokens > 0 && (
              <span style={small}>
                {`${fmtNumber(tokens)} tokens (${fmtNumber(run.promptTokens)} in, ${fmtNumber(run.completionTokens)} out)`}
              </span>
            )}
          </div>

          {running && !timedOut && (
            <div
              role="status"
              aria-live="polite"
              style={{
                display: "flex",
                alignItems: "center",
                gap: NT_GAP.sm,
                marginTop: NT_GAP.md,
                fontFamily: FONT_FAMILY,
                fontSize: FONT_SIZE.body,
                color: t.text,
              }}
            >
              <Loader2 size={16} className="nt-spin" aria-hidden="true" />
              <span>
                {run.status === "PENDING" ? "Waiting to start…" : "Running…"}{" "}
                {total > 0
                  ? `${Math.min(results.length, total)} of ${total} steps done`
                  : `${results.length} ${results.length === 1 ? "step" : "steps"} done`}
              </span>
            </div>
          )}
          {running && !timedOut && (
            <p style={{ ...small, margin: `${NT_GAP.xs}px 0 0` }}>
              This page updates by itself. You can leave it; the run continues on the server.
            </p>
          )}

          {timedOut && (
            <NtBanner tone="warning" title="This run is taking longer than expected" mode={mode} style={{ marginTop: NT_GAP.md }}>
              <div>It may still be running. We stopped checking automatically after 5 minutes.</div>
              <div style={{ marginTop: NT_GAP.sm }}>
                <Button variant="secondary" size="sm" mode={mode} onClick={refresh}>
                  Check again
                </Button>
              </div>
            </NtBanner>
          )}

          {run.status === "FAILED" && (
            <NtBanner tone="error" title="The run failed" mode={mode} style={{ marginTop: NT_GAP.md }}>
              {run.error || "Something went wrong while running this workflow."}
            </NtBanner>
          )}
          {run.status === "CANCELLED" && (
            <NtBanner tone="info" mode={mode} style={{ marginTop: NT_GAP.md }}>
              {run.error || "This run was cancelled."}
            </NtBanner>
          )}
          {run.status === "COMPLETED" && run.error && (
            <NtBanner tone="warning" mode={mode} style={{ marginTop: NT_GAP.md }}>
              {run.error}
            </NtBanner>
          )}
        </Panel>
      )}

      {run && (results.length > 0 || pending.length > 0) && (
        <Panel mode={mode} title="Steps">
          <ol aria-label="Step results" style={{ display: "flex", flexDirection: "column", gap: NT_GAP.sm, margin: 0, padding: 0 }}>
            {results.map((r, i) => (
              <NodeResult
                key={`${r?.nodeId ?? "node"}-${i}`}
                r={r || {}}
                index={i}
                mode={mode}
                onOpenNote={onOpenNote}
                onOpenTasks={onOpenTasks}
              />
            ))}
            {pending.map((n, j) => (
              <PendingNode key={`p-${n.id}`} node={n} index={results.length + j} mode={mode} active={j === 0 && polling} />
            ))}
          </ol>
        </Panel>
      )}

      {run && !running && results.length === 0 && run.status !== "FAILED" && (
        <NtBanner tone="info" mode={mode}>
          This run has no step results.
        </NtBanner>
      )}
    </div>
  );
}
