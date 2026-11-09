"use client";

import React, { useState } from "react";
import { Button, useAutoDarkMode } from "@/design-system";
import { useToast } from "../../../components/Toast";
import { NT_GAP } from "./ntUtils";
import NtPage from "./NtPage";
import NtWorkflowList from "./NtWorkflowList";
import NtWorkflowTemplates from "./NtWorkflowTemplates";
import NtWorkflowBuilder from "./NtWorkflowBuilder";
import NtRunsPanel from "./NtRunsPanel";
import NtRunDetail from "./NtRunDetail";
import NtRunOnMeetingModal from "./NtRunOnMeetingModal";

const SECTIONS = [
  { name: "list", label: "My workflows" },
  { name: "templates", label: "Templates" },
  { name: "runs-all", label: "All runs" },
];

/**
 * Workflows page: list · templates · all runs, plus the drill-down views
 * builder, runs of one workflow and run detail.
 *
 * @param {(noteId: string) => void} [onOpenNote]  open a note on the Notes page (shell navigation)
 * @param {() => void} [onOpenTasks]               open the Tasks page (shell navigation)
 */
export default function NoteTrackerWorkflows({ onOpenNote, onOpenTasks }) {
  const isDark = useAutoDarkMode();
  const mode = isDark ? "dark" : "light";
  const showToast = useToast();

  const [fatal, setFatal] = useState(null);
  // view: { name: "list"|"templates"|"runs-all"|"builder"|"wf-runs"|"run", workflow?, runId?, back? }
  const [view, setView] = useState({ name: "list" });
  const [runTarget, setRunTarget] = useState(null); // workflow whose "Run on a meeting" dialog is open

  const go = (next) => setView(next);
  const isSection = SECTIONS.some((s) => s.name === view.name);

  const handleStarted = (runId) => {
    setRunTarget(null);
    showToast("Workflow started");
    go({ name: "run", runId, back: { name: "list" } });
  };

  return (
    <NtPage
      title="Workflows"
      subtitle="Run a few steps on a meeting for you: summaries, notes and tasks."
      fatal={fatal}
      mode={mode}
    >
      {isSection && (
        <nav aria-label="Workflow sections" style={{ display: "flex", flexWrap: "wrap", gap: NT_GAP.sm }}>
          {SECTIONS.map((s) => (
            <Button
              key={s.name}
              variant={view.name === s.name ? "primary" : "secondary"}
              size="sm"
              mode={mode}
              aria-current={view.name === s.name ? "page" : undefined}
              onClick={() => go({ name: s.name })}
            >
              {s.label}
            </Button>
          ))}
        </nav>
      )}

      {view.name === "list" && (
        <NtWorkflowList
          mode={mode}
          onFatal={setFatal}
          onNew={() => go({ name: "builder", workflow: null })}
          onEdit={(wf) => go({ name: "builder", workflow: wf })}
          onRun={setRunTarget}
          onRuns={(wf) => go({ name: "wf-runs", workflow: wf })}
          onTemplates={() => go({ name: "templates" })}
        />
      )}

      {view.name === "templates" && (
        <NtWorkflowTemplates
          mode={mode}
          onFatal={setFatal}
          onUse={(dto) => go({ name: "builder", workflow: dto })}
        />
      )}

      {view.name === "runs-all" && (
        <NtRunsPanel
          mode={mode}
          onFatal={setFatal}
          onOpenRun={(run) => go({ name: "run", runId: run.id, back: { name: "runs-all" } })}
        />
      )}

      {view.name === "wf-runs" && (
        <NtRunsPanel
          mode={mode}
          workflow={view.workflow}
          onFatal={setFatal}
          onBack={() => go({ name: "list" })}
          onOpenRun={(run) => go({ name: "run", runId: run.id, back: { name: "wf-runs", workflow: view.workflow } })}
        />
      )}

      {view.name === "builder" && (
        <NtWorkflowBuilder
          key={view.workflow ? view.workflow.id : "new"}
          workflow={view.workflow}
          mode={mode}
          onFatal={setFatal}
          onBack={() => go({ name: "list" })}
          onSaved={() => go({ name: "list" })}
        />
      )}

      {view.name === "run" && (
        <NtRunDetail
          key={view.runId}
          runId={view.runId}
          mode={mode}
          onFatal={setFatal}
          onBack={() => go(view.back || { name: "list" })}
          onOpenNote={onOpenNote}
          onOpenTasks={onOpenTasks}
        />
      )}

      {runTarget && (
        <NtRunOnMeetingModal
          workflow={runTarget}
          mode={mode}
          onFatal={setFatal}
          onClose={() => setRunTarget(null)}
          onStarted={handleStarted}
        />
      )}
    </NtPage>
  );
}
