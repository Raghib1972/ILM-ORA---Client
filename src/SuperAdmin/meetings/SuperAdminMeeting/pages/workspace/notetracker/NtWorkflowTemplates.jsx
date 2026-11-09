"use client";

import React, { useCallback, useEffect, useState } from "react";
import { LayoutTemplate } from "lucide-react";
import {
  T,
  Badge,
  Button,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  RADIUS,
} from "@/design-system";
import { useToast } from "../../../components/Toast";
import {
  createNoteTrackerWorkflowFromTemplate,
  getNoteTrackerWorkflowTemplates,
  noteTrackerGenericErrorInfo,
} from "../../../../../../services/noteTrackerService";
import { NT_GAP, errorMessage, triggerLabel } from "./ntUtils";
import NtApiError from "./NtApiError";
import { NtSkeletonRows } from "./NtSkeleton";
import { NtEmptyState } from "./ntForms";
import { asArray, isWorkflowsFatal, summarizeNodes } from "./ntWorkflowRules";

/**
 * Templates gallery.
 * @param {(workflowDto) => void} onUse  called with the new DRAFT; the parent opens it in the editor
 * @param {(info) => void} onFatal
 */
export default function NtWorkflowTemplates({ mode, onUse, onFatal }) {
  const t = T[mode] || T.light;
  const showToast = useToast();
  const [state, setState] = useState({ items: [], loading: true, error: null });
  const [busyKey, setBusyKey] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let off = false;
    setState((s) => ({ ...s, loading: true, error: null }));
    getNoteTrackerWorkflowTemplates()
      .then((res) => {
        if (!off) setState({ items: asArray(res.data), loading: false, error: null });
      })
      .catch((e) => {
        if (off) return;
        const info = noteTrackerGenericErrorInfo(e);
        if (isWorkflowsFatal(info)) onFatal(info);
        else setState({ items: [], loading: false, error: info });
      });
    return () => {
      off = true;
    };
  }, [tick, onFatal]);

  const reload = useCallback(() => setTick((n) => n + 1), []);

  const use = async (tpl) => {
    if (busyKey) return;
    setBusyKey(tpl.key);
    try {
      const res = await createNoteTrackerWorkflowFromTemplate(tpl.key);
      showToast("Template added as a draft");
      onUse(res.data);
    } catch (e) {
      const info = noteTrackerGenericErrorInfo(e);
      if (isWorkflowsFatal(info)) onFatal(info);
      else showToast(errorMessage(info));
      setBusyKey(null);
    }
  };

  if (state.loading) return <NtSkeletonRows count={3} height={150} mode={mode} />;
  if (state.error) return <NtApiError error={state.error} mode={mode} onRetry={reload} />;
  if (state.items.length === 0) {
    return (
      <NtEmptyState
        mode={mode}
        icon={LayoutTemplate}
        title="No templates available"
        text="You can still build a workflow from scratch."
      />
    );
  }

  return (
    <ul
      aria-label="Workflow templates"
      className="nt-card-grid"
      style={{ margin: 0, padding: 0, listStyle: "none" }}
    >
      {state.items.map((tpl) => {
        const steps = summarizeNodes(tpl.nodes);
        return (
          <li
            key={tpl.key}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: NT_GAP.sm,
              padding: NT_GAP.md,
              minWidth: 0,
              borderRadius: RADIUS.messageBubble,
              background: t.cardBg,
              border: `1px solid ${t.border}`,
              fontFamily: FONT_FAMILY,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: FONT_SIZE.cardLabel,
                fontWeight: FONT_WEIGHT.semibold,
                color: t.text,
                overflowWrap: "anywhere",
              }}
            >
              {tpl.name}
            </h3>
            <div>
              <Badge tone={tpl.triggerType === "REPORT_READY" ? "info" : "neutral"}>
                {triggerLabel(tpl.triggerType)}
              </Badge>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: FONT_SIZE.bodySmall,
                lineHeight: LINE_HEIGHT.body,
                color: t.textSub,
                overflowWrap: "anywhere",
              }}
            >
              {tpl.description}
            </p>
            {steps.length > 0 && (
              <ol
                aria-label={`Steps of ${tpl.name}`}
                style={{
                  margin: 0,
                  paddingLeft: NT_GAP.md + NT_GAP.sm,
                  fontSize: FONT_SIZE.caption,
                  lineHeight: LINE_HEIGHT.body,
                  color: t.textSub,
                }}
              >
                {steps.map((line, i) => (
                  <li key={`${i}-${line}`} style={{ overflowWrap: "anywhere" }}>
                    {line}
                  </li>
                ))}
              </ol>
            )}
            <div style={{ marginTop: "auto", paddingTop: NT_GAP.sm }}>
              <Button
                variant="primary"
                size="sm"
                mode={mode}
                disabled={!!busyKey}
                onClick={() => use(tpl)}
                aria-label={`Use template: ${tpl.name}`}
              >
                {busyKey === tpl.key ? "Adding…" : "Use this template"}
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
