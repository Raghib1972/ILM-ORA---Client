"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, Code, EyeOff, Plus, Save } from "lucide-react";
import {
  T,
  Button,
  Panel,
  FONT_FAMILY,
  FONT_SIZE,
  LINE_HEIGHT,
  RADIUS,
} from "@/design-system";
import { useToast } from "../../../components/Toast";
import {
  createNoteTrackerWorkflow,
  noteTrackerGenericErrorInfo,
  updateNoteTrackerWorkflow,
} from "../../../../../../services/noteTrackerService";
import { NT_GAP, NT_LIMITS, confirmAction, errorMessage } from "./ntUtils";
import NtStatusBadge from "./NtStatusBadge";
import NtNodeCard from "./NtNodeForms";
import { NtBanner, NtField, NtSelect, NtTextArea, NtTextInput } from "./ntForms";
import {
  PALETTE,
  WF_LIMITS,
  cleanNodes,
  defaultNodes,
  isWorkflowsFatal,
  makeNode,
  parseNodes,
  validateNodes,
} from "./ntWorkflowRules";

/**
 * Create / edit a workflow.
 * @param {object|null} workflow   WorkflowDto to edit, or null for a new one
 * @param {() => void} onBack
 * @param {(dto) => void} onSaved
 * @param {(info) => void} onFatal
 */
export default function NtWorkflowBuilder({ workflow, mode, onBack, onSaved, onFatal }) {
  const t = T[mode] || T.light;
  const showToast = useToast();
  const isEdit = !!workflow;

  const [name, setName] = useState(workflow?.name || "");
  const [description, setDescription] = useState(workflow?.description || "");
  const [nodes, setNodes] = useState(() => {
    const parsed = workflow ? parseNodes(workflow.nodes) : [];
    return parsed.length > 0 ? parsed : defaultNodes();
  });
  const [paletteId, setPaletteId] = useState(PALETTE[0].id);
  const [showJson, setShowJson] = useState(false);
  const [triedSave, setTriedSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [announce, setAnnounce] = useState("");
  const [focusReq, setFocusReq] = useState(null); // { id, dir }

  const payloadNodes = cleanNodes(nodes);
  const snapshot = JSON.stringify({ name: name.trim(), description: description.trim(), nodes: payloadNodes });
  const initialSnapshot = useRef(snapshot);
  const dirty = snapshot !== initialSnapshot.current;

  const validation = validateNodes(nodes);
  const aiCount = nodes.filter((n) => n.type === "ai").length;
  const atMax = nodes.length >= WF_LIMITS.maxNodes;

  const nameError = !name.trim()
    ? "Please enter a name."
    : name.trim().length > NT_LIMITS.workflowName
      ? `The name can have at most ${NT_LIMITS.workflowName} characters.`
      : "";
  const descError =
    description.length > NT_LIMITS.workflowDescription
      ? `The description can have at most ${NT_LIMITS.workflowDescription} characters.`
      : "";

  // after a move, put the focus back on the button that was used
  useEffect(() => {
    if (!focusReq) return;
    const primary = document.getElementById(`nt-node-${focusReq.id}-${focusReq.dir}`);
    const other = document.getElementById(`nt-node-${focusReq.id}-${focusReq.dir === "up" ? "down" : "up"}`);
    const el = primary && !primary.disabled ? primary : other;
    if (el) el.focus();
    setFocusReq(null);
  }, [focusReq]);

  const edited = () => setServerError(null);

  const updateNode = (i, next) => {
    edited();
    setNodes((list) => list.map((n, idx) => (idx === i ? next : n)));
  };

  const removeNode = (i) => {
    edited();
    setAnnounce(`Removed step ${i + 1}.`);
    setNodes((list) => list.filter((_, idx) => idx !== i));
  };

  const moveNode = (i, dir) => {
    const j = dir === "up" ? i - 1 : i + 1;
    if (i < 1 || j < 1 || j >= nodes.length) return; // the trigger stays first
    edited();
    const id = nodes[i].id;
    setNodes((list) => {
      const next = list.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setAnnounce(`Moved to position ${j + 1} of ${nodes.length}.`);
    setFocusReq({ id, dir });
  };

  const addNode = () => {
    if (atMax) return;
    const node = makeNode(paletteId, nodes);
    if (!node) return;
    edited();
    setNodes((list) => [...list, node]);
    setAnnounce(`Added step ${nodes.length + 1}.`);
  };

  const handleBack = () => {
    if (saving) return;
    if (dirty && !confirmAction("Discard your changes?")) return;
    onBack();
  };

  const save = async () => {
    if (saving) return;
    setTriedSave(true);
    setServerError(null);
    if (nameError || descError || validation.count > 0) return;

    const body = {
      name: name.trim(),
      triggerType: nodes[0].kind,
      nodes: payloadNodes,
    };
    setSaving(true);
    try {
      let res;
      if (isEdit) {
        res = await updateNoteTrackerWorkflow(workflow.id, { ...body, description: description.trim() });
      } else {
        res = await createNoteTrackerWorkflow({ ...body, description: description.trim() || undefined });
      }
      showToast(isEdit ? "Workflow saved" : "Workflow created as a draft");
      onSaved(res.data);
    } catch (e) {
      const info = noteTrackerGenericErrorInfo(e);
      if (isWorkflowsFatal(info)) {
        onFatal(info);
        return;
      }
      setServerError(info); // the server's message (INVALID_NODES, validation ...) is shown as it is
      setSaving(false);
    }
  };

  const paletteOptions = PALETTE.map((p) => ({
    value: p.id,
    label: p.type === "ai" && aiCount >= WF_LIMITS.maxAiNodes ? `${p.label} (limit reached)` : p.label,
  }));
  const selectedPalette = PALETTE.find((p) => p.id === paletteId);
  const aiBlocked = selectedPalette?.type === "ai" && aiCount >= WF_LIMITS.maxAiNodes;

  return (
    <div className="nt-stack">
      <div className="nt-row-actions">
        <Button variant="ghost" size="sm" mode={mode} icon={ChevronLeft} disabled={saving} onClick={handleBack}>
          Back to workflows
        </Button>
        {isEdit && <NtStatusBadge kind="workflow" value={workflow.status} />}
      </div>

      <Panel mode={mode} title={isEdit ? "Edit workflow" : "New workflow"}>
        <div className="nt-form-stack">
          <NtField
            id="nt-wf-name"
            label="Name"
            required
            mode={mode}
            error={triedSave ? nameError : ""}
            count={name.length}
            max={NT_LIMITS.workflowName}
          >
            <NtTextInput
              mode={mode}
              invalid={triedSave && !!nameError}
              value={name}
              data-autofocus
              onChange={(e) => {
                edited();
                setName(e.target.value);
              }}
            />
          </NtField>
          <NtField
            id="nt-wf-desc"
            label="Description (optional)"
            mode={mode}
            error={triedSave ? descError : ""}
            count={description.length}
            max={NT_LIMITS.workflowDescription}
          >
            <NtTextArea
              mode={mode}
              invalid={triedSave && !!descError}
              rows={3}
              value={description}
              onChange={(e) => {
                edited();
                setDescription(e.target.value);
              }}
            />
          </NtField>
        </div>
      </Panel>

      <Panel
        mode={mode}
        title={`Steps (${nodes.length} of ${WF_LIMITS.maxNodes})`}
        action={
          <Button
            variant="ghost"
            size="sm"
            mode={mode}
            icon={showJson ? EyeOff : Code}
            aria-expanded={showJson}
            aria-controls="nt-wf-json"
            onClick={() => setShowJson((v) => !v)}
          >
            {showJson ? "Hide JSON preview" : "JSON preview"}
          </Button>
        }
      >
        <div className="nt-form-stack">
          <p
            style={{
              margin: 0,
              fontFamily: FONT_FAMILY,
              fontSize: FONT_SIZE.bodySmall,
              lineHeight: LINE_HEIGHT.body,
              color: t.textSub,
            }}
          >
            Steps run from top to bottom. The first step is the trigger. You can use up to{" "}
            {WF_LIMITS.maxAiNodes} AI steps.
          </p>

          {triedSave && validation.global.length > 0 && (
            <NtBanner tone="error" mode={mode}>
              {validation.global.map((m) => (
                <div key={m}>{m}</div>
              ))}
            </NtBanner>
          )}

          <ol
            aria-label="Workflow steps"
            style={{ display: "flex", flexDirection: "column", gap: NT_GAP.md, margin: 0, padding: 0 }}
          >
            {nodes.map((n, i) => (
              <NtNodeCard
                key={n.id}
                node={n}
                index={i}
                total={nodes.length}
                mode={mode}
                issues={triedSave ? validation.byIndex[i] || [] : []}
                onChange={(next) => updateNode(i, next)}
                onRemove={() => removeNode(i)}
                onMove={(dir) => moveNode(i, dir)}
              />
            ))}
          </ol>

          <div className="nt-toolbar">
            <NtField id="nt-wf-add" label="Add a step" mode={mode} style={{ minWidth: 240 }}>
              <NtSelect
                mode={mode}
                value={paletteId}
                options={paletteOptions}
                disabled={atMax}
                onChange={(e) => setPaletteId(e.target.value)}
              />
            </NtField>
            <Button variant="secondary" mode={mode} icon={Plus} disabled={atMax || aiBlocked} onClick={addNode}>
              Add step
            </Button>
          </div>
          {atMax && (
            <p style={{ margin: 0, fontFamily: FONT_FAMILY, fontSize: FONT_SIZE.caption, color: t.textSub }}>
              {`A workflow can have at most ${WF_LIMITS.maxNodes} steps.`}
            </p>
          )}

          {showJson && (
            <pre
              id="nt-wf-json"
              aria-label="Steps as JSON (read-only)"
              tabIndex={0}
              style={{
                margin: 0,
                padding: NT_GAP.md,
                overflow: "auto",
                maxHeight: 320,
                borderRadius: RADIUS.input,
                background: t.inputBg,
                border: `1px solid ${t.border}`,
                color: t.text,
                fontFamily: FONT_FAMILY,
                fontSize: FONT_SIZE.caption,
                lineHeight: LINE_HEIGHT.body,
                whiteSpace: "pre",
              }}
            >
              {JSON.stringify(payloadNodes, null, 2)}
            </pre>
          )}
        </div>
      </Panel>

      {serverError && (
        <NtBanner
          tone="error"
          title={serverError.code === "INVALID_NODES" ? "The server rejected these steps" : "The workflow could not be saved"}
          mode={mode}
        >
          {errorMessage(serverError)}
        </NtBanner>
      )}

      <div className="nt-row-actions">
        <Button variant="primary" mode={mode} icon={Save} disabled={saving} onClick={save}>
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create workflow"}
        </Button>
        <Button variant="secondary" mode={mode} disabled={saving} onClick={handleBack}>
          Cancel
        </Button>
        {triedSave && (nameError || descError || validation.count > 0) && (
          <span role="alert" style={{ fontFamily: FONT_FAMILY, fontSize: FONT_SIZE.bodySmall, color: t.overdueText }}>
            Please fix the highlighted problems first.
          </span>
        )}
      </div>

      <div
        aria-live="polite"
        role="status"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}
      >
        {announce}
      </div>
    </div>
  );
}
