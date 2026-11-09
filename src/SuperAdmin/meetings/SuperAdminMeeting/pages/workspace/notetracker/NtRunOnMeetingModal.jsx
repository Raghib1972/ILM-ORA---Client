"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/design-system";
import {
  noteTrackerGenericErrorInfo,
  runNoteTrackerWorkflow,
} from "../../../../../../services/noteTrackerService";
import { errorMessage, sessionLabel } from "./ntUtils";
import NtModal from "./NtModal";
import NtSessionPicker from "./NtSessionPicker";
import { NtBanner } from "./ntForms";
import { isWorkflowsFatal } from "./ntWorkflowRules";

/**
 * "Run on a meeting": pick a meeting, then start the run.
 * Server answers 202 {runId, status}; the parent then opens the run view (which polls).
 * Errors shown in the dialog: 429 WORKFLOW_DAILY_LIMIT (server text), 503 NOTETRACKER_BUSY,
 * 400 and others (server text).
 *
 * @param {object} workflow            WorkflowDto
 * @param {(runId: string) => void} onStarted
 * @param {() => void} onClose
 * @param {(info) => void} onFatal
 */
export default function NtRunOnMeetingModal({ workflow, mode, onStarted, onClose, onFatal }) {
  const [session, setSession] = useState(null); // { sessionId, title, label, date }
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState(null);

  const start = async () => {
    if (!session || starting) return;
    setStarting(true);
    setError(null);
    try {
      const res = await runNoteTrackerWorkflow(workflow.id, session.sessionId);
      const runId = res.data?.runId;
      if (!runId) {
        setError({ status: 0, code: "", message: "The run was accepted, but the server did not return a run id. Open the Runs tab to find it." });
        setStarting(false);
        return;
      }
      onStarted(runId);
    } catch (e) {
      const info = noteTrackerGenericErrorInfo(e);
      if (isWorkflowsFatal(info)) {
        onFatal(info);
        return;
      }
      setError(info);
      setStarting(false);
    }
  };

  return (
    <NtModal
      title={`Run “${workflow.name}” on a meeting`}
      mode={mode}
      width={680}
      busy={starting}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" mode={mode} disabled={starting} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" mode={mode} icon={Play} disabled={!session || starting} onClick={start}>
            {starting ? "Starting…" : "Run workflow"}
          </Button>
        </>
      }
    >
      <div className="nt-form-stack">
        {error && (
          <NtBanner tone={error.status === 429 || error.code === "NOTETRACKER_BUSY" ? "warning" : "error"} mode={mode}>
            {errorMessage(error)}
          </NtBanner>
        )}
        <NtSessionPicker
          mode={mode}
          selectedId={session?.sessionId || null}
          onSelect={(s, date) => {
            setError(null);
            setSession({ sessionId: s.sessionId, title: s.title, label: s.label, date });
          }}
          onFatal={onFatal}
        />
        {session && (
          <NtBanner tone="info" mode={mode}>
            {`Selected: ${sessionLabel(session)}`}
          </NtBanner>
        )}
      </div>
    </NtModal>
  );
}
