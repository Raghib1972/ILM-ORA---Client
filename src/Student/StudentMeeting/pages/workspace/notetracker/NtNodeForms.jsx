"use client";

import React from "react";
import { ArrowDown, ArrowUp, Ban, GitBranch, ListChecks, Sparkles, StickyNote, Trash2, Zap } from "lucide-react";
import {
  T,
  Badge,
  Button,
  CLAUDE_ACCENT,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  RADIUS,
} from "@/design-system";
import { NT_GAP } from "./ntUtils";
import { NtBanner, NtField, NtSelect, NtTextArea, NtTextInput } from "./ntForms";
import {
  AI_KINDS,
  IF_FIELDS,
  IF_OPS,
  TRIGGER_OPTIONS,
  WF_LIMITS,
  nodeTitle,
} from "./ntWorkflowRules";

const ICONS = {
  trigger: Zap,
  ai: Sparkles,
  SAVE_TO_NOTES: StickyNote,
  CREATE_TASKS: ListChecks,
  IF: GitBranch,
  STOP: Ban,
};

/** Icon of a node or of a node result ({type, kind}). */
export const nodeIcon = (node) =>
  ICONS[node?.type === "trigger" || node?.type === "ai" ? node.type : node?.kind] || Sparkles;

const TYPE_BADGE = {
  trigger: { tone: "info", label: "Trigger" },
  ai: { tone: "purple", label: "AI step" },
  action: { tone: "success", label: "Action" },
  control: { tone: "warning", label: "Control" },
};

const AI_OPTIONS = AI_KINDS.map((k) => ({ value: k.value, label: k.label }));
const FIELD_OPTIONS = IF_FIELDS.map((f) => ({ value: f.value, label: f.label }));
const OP_OPTIONS = IF_OPS.map((o) => ({ value: o.value, label: o.label }));

// ───────────── the settings of one node ─────────────
function NodeFields({ node, mode, onChange }) {
  const t = T[mode] || T.light;
  const c = node.config || {};
  const idp = `nt-node-${node.id}`;
  const note = {
    margin: 0,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.bodySmall,
    lineHeight: LINE_HEIGHT.body,
    color: t.textSub,
  };
  const setConfig = (patch) => onChange({ ...node, config: { ...c, ...patch } });

  if (node.type === "trigger") {
    return (
      <div className="nt-form-stack">
        <NtField id={`${idp}-kind`} label="Start the workflow" mode={mode}>
          <NtSelect
            mode={mode}
            value={node.kind}
            options={TRIGGER_OPTIONS}
            onChange={(e) => onChange({ ...node, kind: e.target.value })}
          />
        </NtField>
        <p style={note}>
          {node.kind === "REPORT_READY"
            ? "Runs automatically for meetings that finish after you activate the workflow. You can still run it by hand on any meeting."
            : "Runs only when you choose “Run on a meeting”."}
        </p>
      </div>
    );
  }

  if (node.type === "ai") {
    const instruction = String(c.instruction ?? "");
    return (
      <div className="nt-form-stack">
        <NtField id={`${idp}-kind`} label="Produce" mode={mode}>
          <NtSelect
            mode={mode}
            value={node.kind}
            options={AI_OPTIONS}
            onChange={(e) => onChange({ ...node, kind: e.target.value })}
          />
        </NtField>
        <NtField
          id={`${idp}-instruction`}
          label="Extra instruction (optional)"
          hint="For example: “Keep it under five bullet points.”"
          mode={mode}
          count={instruction.length}
          max={WF_LIMITS.instruction}
        >
          <NtTextArea
            mode={mode}
            rows={3}
            value={instruction}
            onChange={(e) => setConfig({ instruction: e.target.value })}
          />
        </NtField>
      </div>
    );
  }

  if (node.kind === "SAVE_TO_NOTES") {
    const title = String(c.title ?? "");
    return (
      <div className="nt-form-stack">
        <NtField
          id={`${idp}-title`}
          label="Note title (optional)"
          hint="Leave it empty to use a default title."
          mode={mode}
          count={title.length}
          max={WF_LIMITS.saveTitle}
        >
          <NtTextInput mode={mode} value={title} onChange={(e) => setConfig({ title: e.target.value })} />
        </NtField>
        <p style={note}>Saves the result of the nearest AI step above as a note.</p>
      </div>
    );
  }

  if (node.kind === "CREATE_TASKS") {
    return (
      <p style={note}>
        {`Creates one task for each action item (up to ${WF_LIMITS.maxTasksPerRun} per run). The nearest AI step above must be “Action items”.`}
      </p>
    );
  }

  if (node.kind === "IF") {
    const textField = c.field === "transcript_contains";
    const changeField = (field) => {
      if (field === "transcript_contains") onChange({ ...node, config: { field, op: "contains", value: "" } });
      else if (textField) onChange({ ...node, config: { field, op: ">=", value: "" } });
      else onChange({ ...node, config: { ...c, field } });
    };
    return (
      <div className="nt-form-stack">
        <div className="nt-node-grid">
          <NtField id={`${idp}-field`} label="Check" mode={mode}>
            <NtSelect mode={mode} value={c.field || ""} options={FIELD_OPTIONS} onChange={(e) => changeField(e.target.value)} />
          </NtField>
          {textField ? (
            <NtField
              id={`${idp}-value`}
              label="Text to look for"
              mode={mode}
              count={String(c.value ?? "").length}
              max={WF_LIMITS.ifText}
            >
              <NtTextInput mode={mode} value={String(c.value ?? "")} onChange={(e) => setConfig({ op: "contains", value: e.target.value })} />
            </NtField>
          ) : (
            <div className="nt-node-grid">
              <NtField id={`${idp}-op`} label="Comparison" mode={mode}>
                <NtSelect mode={mode} value={c.op || ">="} options={OP_OPTIONS} onChange={(e) => setConfig({ op: e.target.value })} />
              </NtField>
              <NtField id={`${idp}-value`} label="Value" mode={mode}>
                <NtTextInput
                  mode={mode}
                  type="number"
                  inputMode="decimal"
                  value={c.value ?? ""}
                  onChange={(e) => setConfig({ value: e.target.value })}
                />
              </NtField>
            </div>
          )}
        </div>
        <p style={note}>If this is not true, the rest of the run is skipped.</p>
      </div>
    );
  }

  if (node.kind === "STOP") {
    return <p style={note}>Ends the run here. Steps after it do not run.</p>;
  }
  return null;
}

// ───────────── card ─────────────
/**
 * @param {object} node            editor node
 * @param {number} index           0-based position
 * @param {number} total
 * @param {string[]} [issues]      client-side problems of this node
 * @param {(next) => void} onChange
 * @param {() => void} onRemove
 * @param {(dir: "up"|"down") => void} onMove
 */
export default function NtNodeCard({ node, index, total, mode, issues = [], onChange, onRemove, onMove }) {
  const t = T[mode] || T.light;
  const Icon = nodeIcon(node);
  const isTrigger = index === 0;
  const badge = TYPE_BADGE[node.type] || TYPE_BADGE.action;
  const canUp = !isTrigger && index > 1;
  const canDown = !isTrigger && index < total - 1;
  const label = nodeTitle(node);

  return (
    <li
      aria-label={`Step ${index + 1}: ${label}`}
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: NT_GAP.md,
        padding: NT_GAP.md,
        borderRadius: RADIUS.messageBubble,
        background: t.recentItemBg,
        border: `1px solid ${issues.length > 0 ? t.overdueBorder : t.recentItemBorder}`,
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: NT_GAP.sm, flexWrap: "wrap" }}>
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 30,
            height: 30,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: RADIUS.chip,
            background: t.iconBg,
            border: `1px solid ${t.iconBorder}`,
            color: CLAUDE_ACCENT,
          }}
        >
          <Icon size={16} />
        </span>
        <div
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
          <span style={{ color: t.textMuted, fontWeight: FONT_WEIGHT.medium }}>{`${index + 1}. `}</span>
          {label}
        </div>
        <Badge tone={badge.tone}>{badge.label}</Badge>
        {!isTrigger && (
          <div style={{ display: "inline-flex", gap: NT_GAP.xs }}>
            <Button
              id={`nt-node-${node.id}-up`}
              variant="ghost"
              size="sm"
              mode={mode}
              icon={ArrowUp}
              disabled={!canUp}
              onClick={() => onMove("up")}
              aria-label={`Move step ${index + 1} up`}
              style={{ padding: `0 ${NT_GAP.sm}px` }}
            />
            <Button
              id={`nt-node-${node.id}-down`}
              variant="ghost"
              size="sm"
              mode={mode}
              icon={ArrowDown}
              disabled={!canDown}
              onClick={() => onMove("down")}
              aria-label={`Move step ${index + 1} down`}
              style={{ padding: `0 ${NT_GAP.sm}px` }}
            />
            <Button
              variant="ghost"
              size="sm"
              mode={mode}
              icon={Trash2}
              onClick={onRemove}
              aria-label={`Remove step ${index + 1}: ${label}`}
              style={{ padding: `0 ${NT_GAP.sm}px` }}
            />
          </div>
        )}
      </div>

      <NodeFields node={node} mode={mode} onChange={onChange} />

      {issues.length > 0 && (
        <NtBanner tone="error" mode={mode}>
          {issues.map((m) => (
            <div key={m}>{m}</div>
          ))}
        </NtBanner>
      )}
    </li>
  );
}
