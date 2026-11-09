"use client";

import React, { useEffect, useRef, useState } from "react";
import { Paperclip, Upload, X } from "lucide-react";
import {
  T,
  Badge,
  Button,
  CLAUDE_ACCENT,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  RADIUS,
} from "@/design-system";
import {
  getNoteTrackerResources,
  noteTrackerGenericErrorInfo,
  uploadNoteTrackerResource,
} from "../../../../../../services/noteTrackerService";
import {
  MAX_UPLOAD_BYTES,
  NT_GAP,
  UPLOAD_EXTENSIONS,
  errorMessage,
  fmtBytes,
  fmtNumber,
  isFatalError,
  validateUploadFile,
} from "./ntUtils";
import useNtPagedList from "./useNtPagedList";
import NtModal from "./NtModal";
import NtApiError from "./NtApiError";
import { NtSkeletonRows } from "./NtSkeleton";
import { NtBanner, NtEmptyState, NtField, NtPager, NtTextInput } from "./ntForms";

const ACCEPT = UPLOAD_EXTENSIONS.join(",");

const extLabel = (r) => {
  const name = String(r?.fileName || "");
  const dot = name.lastIndexOf(".");
  return dot > -1 && name.length - dot <= 6 ? name.slice(dot + 1).toUpperCase() : "FILE";
};

const isCancel = (e) =>
  e?.code === "ERR_CANCELED" || e?.name === "CanceledError" || e?.name === "AbortError";

/**
 * Pick resources to attach to a question (and upload a new one).
 *
 * @param {Array<{id: string, fileName: string}>} selected   currently attached
 * @param {number} max                                       most resources per question (10)
 * @param {string|null} [sessionId]                          a new upload is linked to this meeting
 * @param {(list: Array<{id, fileName}>) => void} onConfirm
 * @param {() => void} onClose
 * @param {(info) => void} onFatal
 */
export default function NtResourcePicker({ mode, selected, max, sessionId, onConfirm, onClose, onFatal }) {
  const t = T[mode] || T.light;
  const [sel, setSel] = useState(() => {
    const m = {};
    (selected || []).forEach((r) => {
      m[r.id] = { id: r.id, fileName: r.fileName };
    });
    return m;
  });
  const list = useNtPagedList(getNoteTrackerResources, {}, { onFatal });

  // upload
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [inputKey, setInputKey] = useState(0);
  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const count = Object.keys(sel).length;
  const full = count >= max;

  const toggle = (r) =>
    setSel((m) => {
      const next = { ...m };
      if (next[r.id]) delete next[r.id];
      else if (Object.keys(next).length < max) next[r.id] = { id: r.id, fileName: r.fileName };
      return next;
    });

  const handleFile = (e) => {
    const f = (e.target.files && e.target.files[0]) || null;
    setFile(f);
    setFileError(f ? validateUploadFile(f) : "");
    setUploadError(null);
  };

  const startUpload = async () => {
    if (uploading) return;
    const problem = validateUploadFile(file);
    if (problem) {
      setFileError(problem);
      return;
    }
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setUploading(true);
    setProgress(0);
    setUploadError(null);
    try {
      const res = await uploadNoteTrackerResource(file, {
        sessionId: sessionId || undefined,
        signal: ctrl.signal,
        onProgress: (p) => {
          if (mountedRef.current) setProgress(p);
        },
      });
      if (!mountedRef.current) return;
      const created = res.data;
      if (created && created.id) {
        // the new file is attached right away (if there is room)
        setSel((m) =>
          Object.keys(m).length < max ? { ...m, [created.id]: { id: created.id, fileName: created.fileName } } : m,
        );
      }
      setFile(null);
      setFileError("");
      setInputKey((k) => k + 1);
      if (list.page === 0) list.reload();
      else list.setPage(0);
    } catch (e) {
      if (!mountedRef.current) return;
      if (isCancel(e)) return;
      const info = noteTrackerGenericErrorInfo(e);
      if (isFatalError(info)) onFatal(info);
      else setUploadError(info);
    } finally {
      abortRef.current = null;
      if (mountedRef.current) setUploading(false);
    }
  };

  const small = { fontFamily: FONT_FAMILY, fontSize: FONT_SIZE.caption, color: t.textSub };

  return (
    <NtModal
      title="Attach resources"
      mode={mode}
      width={680}
      busy={uploading}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" mode={mode} disabled={uploading || count === 0} onClick={() => setSel({})}>
            Clear selection
          </Button>
          <Button variant="secondary" mode={mode} disabled={uploading} onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            mode={mode}
            icon={Paperclip}
            disabled={uploading}
            onClick={() => onConfirm(Object.values(sel))}
          >
            {count > 0 ? `Attach (${count})` : "Attach none"}
          </Button>
        </>
      }
    >
      <div className="nt-form-stack">
        <NtBanner tone="info" mode={mode}>
          {`Attached files are used as extra context when you ask a question. You can attach up to ${max} per question.`}
        </NtBanner>

        {/* ── upload a new file ── */}
        <div className="nt-form-stack">
          <NtField
            id="nt-pick-file"
            label="Upload a new file"
            mode={mode}
            error={fileError}
            hint={`PDF, DOCX, TXT or MD · up to ${fmtBytes(MAX_UPLOAD_BYTES).replace(".0", "")}`}
          >
            <NtTextInput
              key={inputKey}
              mode={mode}
              type="file"
              accept={ACCEPT}
              invalid={!!fileError}
              disabled={uploading}
              onChange={handleFile}
            />
          </NtField>

          {uploadError && (
            <NtBanner tone="error" title="The file could not be uploaded" mode={mode}>
              {uploadError.status === 413
                ? "The server refused this file because it is too large."
                : errorMessage(uploadError)}
            </NtBanner>
          )}

          {uploading && (
            <div>
              <div
                role="progressbar"
                aria-label="Upload progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                style={{ height: 8, borderRadius: RADIUS.pill, background: t.barBg, overflow: "hidden" }}
              >
                <div
                  style={{ width: `${progress}%`, height: "100%", background: CLAUDE_ACCENT, transition: "width 0.2s ease" }}
                />
              </div>
              <div role="status" aria-live="polite" style={{ ...small, marginTop: NT_GAP.xs }}>
                {progress >= 100 ? "Reading the file…" : `Uploading… ${progress}%`}
              </div>
            </div>
          )}

          <div className="nt-row-actions">
            <Button
              variant="secondary"
              size="sm"
              mode={mode}
              icon={Upload}
              disabled={uploading || !file || !!fileError}
              onClick={startUpload}
            >
              {uploading ? "Uploading…" : "Upload"}
            </Button>
            {uploading && (
              <Button
                variant="ghost"
                size="sm"
                mode={mode}
                icon={X}
                onClick={() => abortRef.current && abortRef.current.abort()}
              >
                Cancel upload
              </Button>
            )}
          </div>
        </div>

        {/* ── your resources ── */}
        <div>
          <div
            style={{
              ...small,
              fontSize: FONT_SIZE.bodySmall,
              fontWeight: FONT_WEIGHT.semibold,
              color: t.text,
              marginBottom: NT_GAP.sm,
            }}
          >
            {`Your resources · ${count} of ${max} selected`}
          </div>

          {list.loading && <NtSkeletonRows count={3} height={52} mode={mode} />}
          {!list.loading && list.error && <NtApiError error={list.error} mode={mode} onRetry={list.reload} />}
          {!list.loading && !list.error && list.items.length === 0 && (
            <NtEmptyState
              mode={mode}
              icon={Paperclip}
              title="No resources yet"
              text="Upload a PDF, Word, text or Markdown file above."
            />
          )}

          {!list.loading && !list.error && list.items.length > 0 && (
            <>
              <ul
                aria-label="Resources"
                style={{ display: "flex", flexDirection: "column", gap: NT_GAP.sm, margin: 0, padding: 0 }}
              >
                {list.items.map((r) => {
                  const checked = !!sel[r.id];
                  const id = `nt-pick-${r.id}`;
                  return (
                    <li key={r.id} style={{ listStyle: "none" }}>
                      <label
                        htmlFor={id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: NT_GAP.md,
                          padding: NT_GAP.md,
                          borderRadius: RADIUS.messageBubble,
                          background: checked ? t.iconBg : t.recentItemBg,
                          border: `1px solid ${checked ? CLAUDE_ACCENT : t.recentItemBorder}`,
                          cursor: !checked && full ? "not-allowed" : "pointer",
                          opacity: !checked && full ? 0.6 : 1,
                          minWidth: 0,
                        }}
                      >
                        <input
                          id={id}
                          type="checkbox"
                          checked={checked}
                          disabled={uploading || (!checked && full)}
                          onChange={() => toggle(r)}
                          style={{ accentColor: CLAUDE_ACCENT, marginTop: NT_GAP.xs, flexShrink: 0 }}
                        />
                        <span style={{ flex: 1, minWidth: 0, fontFamily: FONT_FAMILY }}>
                          <span
                            style={{
                              display: "block",
                              fontSize: FONT_SIZE.bodySmall,
                              fontWeight: FONT_WEIGHT.semibold,
                              color: t.text,
                              overflowWrap: "anywhere",
                            }}
                          >
                            {r.fileName || "Untitled file"}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: NT_GAP.sm,
                              marginTop: NT_GAP.xs,
                              ...small,
                            }}
                          >
                            <Badge tone="neutral">{extLabel(r)}</Badge>
                            <span>{fmtBytes(r.fileSize)}</span>
                            <span>{`${fmtNumber(r.textChars)} characters`}</span>
                            {r.textTruncated && <Badge tone="warning">Text was shortened</Badge>}
                          </span>
                        </span>
                      </label>
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
                disabled={uploading}
              />
            </>
          )}
        </div>
      </div>
    </NtModal>
  );
}
