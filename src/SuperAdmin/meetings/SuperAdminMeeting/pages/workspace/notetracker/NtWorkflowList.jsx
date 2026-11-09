"use client";

import React, { useState } from "react";
import { Copy, History, Pause, Pencil, Play, Plus, Trash2, Workflow, Zap } from "lucide-react";
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
import { useToast } from "../../../components/Toast";
import {
  duplicateNoteTrackerWorkflow,
  deleteNoteTrackerWorkflow,
  getNoteTrackerWorkflows,
  noteTrackerGenericErrorInfo,
  setNoteTrackerWorkflowStatus,
} from "../../../../../../services/noteTrackerService";
import { NT_GAP, confirmAction, errorMessage, fmtDateTimeIst, triggerLabel } from "./ntUtils";
import useNtPagedList from "./useNtPagedList";
import NtApiError from "./NtApiError";
import NtStatusBadge from "./NtStatusBadge";
import { NtSkeletonRows } from "./NtSkeleton";
import { NtBanner, NtEmptyState, NtPager } from "./ntForms";
import { isWorkflowsFatal, summarizeNodes } from "./ntWorkflowRules";

// One workflow in the list.
function WorkflowCard({ wf, mode, busy, onEdit, onRun, onRuns, onDuplicate, onDelete, onToggle }) {
  const t = T[mode] || T.light;
  const active = wf.status === "ACTIVE";
  const steps = summarizeNodes(wf.nodes);
  const small = { fontFamily: FONT_FAMILY, fontSize: FONT_SIZE.caption, color: t.textSub };

  return (
    <li
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: NT_GAP.sm,
        padding: NT_GAP.md,
        borderRadius: RADIUS.messageBubble,
        background: t.recentItemBg,
        border: `1px solid ${t.recentItemBorder}`,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: NT_GAP.sm }}>
        <h3
          style={{
            margin: 0,
            flex: 1,
            minWidth: 0,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.cardLabel,
            fontWeight: FONT_WEIGHT.semibold,
            color: t.text,
            overflowWrap: "anywhere",
          }}
        >
          {wf.name}
        </h3>
        <NtStatusBadge kind="workflow" value={wf.status} />
      </div>

      {wf.description && (
        <p
          style={{
            margin: 0,
            fontFamily: FONT_FAMILY,
            fontSize: FONT_SIZE.bodySmall,
            lineHeight: LINE_HEIGHT.body,
            color: t.textSub,
            overflowWrap: "anywhere",
          }}
        >
          {wf.description}
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: NT_GAP.sm, ...small }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: NT_GAP.xs }}>
          <Zap size={12} aria-hidden="true" />
          {triggerLabel(wf.triggerType)}
        </span>
        {active && wf.activatedAt && <span>{`Active since ${fmtDateTimeIst(wf.activatedAt)}`}</span>}
        {wf.lastRunStatus ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: NT_GAP.xs + 2 }}>
            Last run:
            <NtStatusBadge kind="run" value={wf.lastRunStatus} />
            {wf.lastRunAt && fmtDateTimeIst(wf.lastRunAt)}
          </span>
        ) : (
          <span>No runs yet</span>
        )}
      </div>

      {steps.length > 0 && (
        <p style={{ ...small, margin: 0, lineHeight: LINE_HEIGHT.body, overflowWrap: "anywhere" }}>
          {steps.join("  →  ")}
        </p>
      )}

      <div className="nt-row-actions" style={{ marginTop: NT_GAP.xs }}>
        <Button variant="secondary" size="sm" mode={mode} icon={Play} disabled={busy} onClick={() => onRun(wf)}>
          Run on a meeting
        </Button>
        <Button
          variant={active ? "secondary" : "primary"}
          size="sm"
          mode={mode}
          icon={active ? Pause : Zap}
          disabled={busy}
          onClick={() => onToggle(wf)}
          aria-label={`${active ? "Pause" : "Activate"} workflow: ${wf.name}`}
        >
          {active ? "Pause" : "Activate"}
        </Button>
        <Button variant="ghost" size="sm" mode={mode} icon={Pencil} disabled={busy} onClick={() => onEdit(wf)} aria-label={`Edit workflow: ${wf.name}`}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" mode={mode} icon={History} disabled={busy} onClick={() => onRuns(wf)} aria-label={`Runs of workflow: ${wf.name}`}>
          Runs
        </Button>
        <Button variant="ghost" size="sm" mode={mode} icon={Copy} disabled={busy} onClick={() => onDuplicate(wf)} aria-label={`Duplicate workflow: ${wf.name}`}>
          Duplicate
        </Button>
        <Button variant="ghost" size="sm" mode={mode} icon={Trash2} disabled={busy} onClick={() => onDelete(wf)} aria-label={`Delete workflow: ${wf.name}`}>
          Delete
        </Button>
      </div>
    </li>
  );
}

/**
 * "My workflows" tab.
 * @param {() => void} onNew
 * @param {(wf) => void} onEdit     open the builder
 * @param {(wf) => void} onRun      open the "Run on a meeting" dialog
 * @param {(wf) => void} onRuns     show the runs of this workflow
 * @param {(info) => void} onFatal
 * @param {() => void} onTemplates  switch to the templates tab (empty-state button)
 */
export default function NtWorkflowList({ mode, onNew, onEdit, onRun, onRuns, onFatal, onTemplates }) {
  const showToast = useToast();
  const [busyId, setBusyId] = useState(null);
  const list = useNtPagedList(getNoteTrackerWorkflows, {}, { onFatal });

  const guard = async (wf, work) => {
    setBusyId(wf.id);
    try {
      await work();
    } catch (e) {
      const info = noteTrackerGenericErrorInfo(e);
      if (isWorkflowsFatal(info)) onFatal(info);
      else showToast(errorMessage(info));
    } finally {
      setBusyId(null);
    }
  };

  const handleToggle = (wf) =>
    guard(wf, async () => {
      const next = wf.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
      const res = await setNoteTrackerWorkflowStatus(wf.id, next);
      list.replaceItem(res.data || { ...wf, status: next });
      showToast(
        next === "PAUSED"
          ? "Workflow paused"
          : wf.triggerType === "REPORT_READY"
            ? "Workflow activated. It runs for meetings that finish from now on."
            : "Workflow activated",
      );
    });

  const handleDuplicate = (wf) =>
    guard(wf, async () => {
      await duplicateNoteTrackerWorkflow(wf.id);
      showToast("Workflow duplicated as a draft");
      list.reload();
    });

  const handleDelete = (wf) => {
    if (!confirmAction(`Delete the workflow "${wf.name}"? Its runs are removed too. This cannot be undone.`)) return;
    return guard(wf, async () => {
      await deleteNoteTrackerWorkflow(wf.id);
      showToast("Workflow deleted");
      list.reload();
    });
  };

  return (
    <>
      <NtBanner tone="info" mode={mode}>
        A workflow with the trigger &apos;When a meeting report is ready&apos; runs automatically only for
        meetings that finish AFTER you activate it.
      </NtBanner>

      <Panel
        mode={mode}
        title="Your workflows"
        action={
          <Button variant="primary" size="sm" mode={mode} icon={Plus} onClick={onNew}>
            New workflow
          </Button>
        }
      >
        {list.loading && <NtSkeletonRows count={3} height={120} mode={mode} />}

        {!list.loading && list.error && <NtApiError error={list.error} mode={mode} onRetry={list.reload} />}

        {!list.loading && !list.error && list.items.length === 0 && (
          <NtEmptyState
            mode={mode}
            icon={Workflow}
            title="No workflows yet"
            text="A workflow runs a few steps on a meeting for you, such as a summary, saving a note and creating tasks. Start from a template or build your own."
            action={
              <div className="nt-row-actions" style={{ justifyContent: "center" }}>
                <Button variant="primary" size="sm" mode={mode} onClick={onTemplates}>
                  Browse templates
                </Button>
                <Button variant="secondary" size="sm" mode={mode} icon={Plus} onClick={onNew}>
                  New workflow
                </Button>
              </div>
            }
          />
        )}

        {!list.loading && !list.error && list.items.length > 0 && (
          <>
            <ul
              aria-label="Workflows"
              style={{ display: "flex", flexDirection: "column", gap: NT_GAP.md, margin: 0, padding: 0 }}
            >
              {list.items.map((wf) => (
                <WorkflowCard
                  key={wf.id}
                  wf={wf}
                  mode={mode}
                  busy={busyId === wf.id}
                  onEdit={onEdit}
                  onRun={onRun}
                  onRuns={onRuns}
                  onDuplicate={handleDuplicate}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              ))}
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
    </>
  );
}
