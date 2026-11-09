"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, Paperclip, Trash2, Upload, X } from "lucide-react";
import {
  T,
  Badge,
  Button,
  Panel,
  useAutoDarkMode,
  CLAUDE_ACCENT,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  RADIUS,
} from "@/design-system";
import { useToast } from "../../../components/Toast";
import {
  deleteNoteTrackerResource,
  getNoteTrackerResources,
  noteTrackerGenericErrorInfo,
  uploadNoteTrackerResource,
} from "../../../../../../services/noteTrackerService";
import {
  MAX_UPLOAD_BYTES,
  NT_GAP,
  UPLOAD_EXTENSIONS,
  confirmAction,
  errorMessage,
  fmtBytes,
  fmtDateTimeIst,
  fmtNumber,
  isFatalError,
  sessionLabel,
  validateUploadFile,
} from "./ntUtils";
import useNtPagedList from "./useNtPagedList";
import NtPage from "./NtPage";
import NtApiError from "./NtApiError";
import { NtSkeletonRows } from "./NtSkeleton";
import {
  NtBanner,
  NtEmptyState,
  NtField,
  NtPager,
  NtSessionField,
  NtTextInput,
} from "./ntForms";

const ACCEPT = UPLOAD_EXTENSIONS.join(",");

// "PDF", "DOCX", ... from fileType (short form or MIME type) or the file name
const typeLabel = (r) => {
  const ft = String(r?.fileType || "").trim();
  if (ft && !ft.includes("/") && ft.length <= 8) return ft.replace(/^\./, "").toUpperCase();
  const name = String(r?.fileName || "");
  const dot = name.lastIndexOf(".");
  if (dot > -1 && name.length - dot <= 6) return name.slice(dot + 1).toUpperCase();
  if (ft.includes("/")) return ft.split("/").pop().toUpperCase();
  return "FILE";
};

const isCancel = (e) =>
  e?.code === "ERR_CANCELED" || e?.name === "CanceledError" || e?.name === "AbortError";

// the server decides the real limit; 413 usually comes from a proxy without our JSON body
const uploadErrorText = (info) =>
  info?.status === 413
    ? "The server refused this file because it is too large."
    : errorMessage(info);

// ───────────── one resource ─────────────
function ResourceRow({ r, mode, known, busy, onDelete }) {
  const t = T[mode] || T.light;
  const meeting = r.sessionId
    ? known && known.sessionId === r.sessionId
      ? sessionLabel(known)
      : sessionLabel({ sessionId: r.sessionId })
    : "";
  const small = { fontFamily: FONT_FAMILY, fontSize: FONT_SIZE.caption, color: t.textSub };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: NT_GAP.md,
        padding: NT_GAP.md,
        borderRadius: RADIUS.messageBubble,
        background: t.recentItemBg,
        border: `1px solid ${t.recentItemBorder}`,
        listStyle: "none",
        minWidth: 0,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: 34,
          height: 34,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: RADIUS.chip,
          background: t.iconBg,
          border: `1px solid ${t.iconBorder}`,
          color: CLAUDE_ACCENT,
        }}
      >
        <FileText size={17} />
      </span>

      <div style={{ flex: 1, minWidth: 0, fontFamily: FONT_FAMILY }}>
        <div
          style={{
            fontSize: FONT_SIZE.cardLabel,
            fontWeight: FONT_WEIGHT.semibold,
            color: t.text,
            overflowWrap: "anywhere",
          }}
        >
          {r.fileName || "Untitled file"}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: NT_GAP.sm,
            marginTop: NT_GAP.xs + 2,
            ...small,
          }}
        >
          <Badge tone="neutral">{typeLabel(r)}</Badge>
          <span>{fmtBytes(r.fileSize)}</span>
          <span>{`${fmtNumber(r.textChars)} characters of text`}</span>
          {r.textTruncated && <Badge tone="warning">Text was shortened</Badge>}
          {meeting && <span style={{ overflowWrap: "anywhere" }}>{meeting}</span>}
          <span>{`Uploaded ${fmtDateTimeIst(r.createdAt)}`}</span>
        </div>
        {r.textTruncated && (
          <p
            style={{
              margin: `${NT_GAP.xs + 2}px 0 0`,
              fontSize: FONT_SIZE.caption,
              lineHeight: LINE_HEIGHT.body,
              color: t.textSub,
            }}
          >
            This file has more text than can be used. Only the first part of it is used as context.
          </p>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        mode={mode}
        icon={Trash2}
        disabled={busy}
        onClick={() => onDelete(r)}
        aria-label={`Delete resource: ${r.fileName || "file"}`}
        style={{ padding: `0 ${NT_GAP.sm}px` }}
      />
    </li>
  );
}

// ───────────── page ─────────────
export default function NoteTrackerResources() {
  const isDark = useAutoDarkMode();
  const mode = isDark ? "dark" : "light";
  const t = T[mode];
  const showToast = useToast();

  const [fatal, setFatal] = useState(null);

  // upload form
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [uploadSession, setUploadSession] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [inputKey, setInputKey] = useState(0); // new key = empty <input type="file">
  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  // list
  const [filterSession, setFilterSession] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const list = useNtPagedList(
    getNoteTrackerResources,
    { sessionId: filterSession?.sessionId },
    { onFatal: setFatal },
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

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
      await uploadNoteTrackerResource(file, {
        sessionId: uploadSession?.sessionId,
        signal: ctrl.signal,
        onProgress: (p) => {
          if (mountedRef.current) setProgress(p);
        },
      });
      showToast("Resource uploaded");
      if (mountedRef.current) {
        setFile(null);
        setFileError("");
        setUploadSession(null);
        setInputKey((k) => k + 1);
        if (list.page === 0) list.reload();
        else list.setPage(0);
      }
    } catch (e) {
      if (!mountedRef.current) return;
      if (isCancel(e)) {
        showToast("Upload cancelled");
      } else {
        const info = noteTrackerGenericErrorInfo(e);
        if (isFatalError(info)) setFatal(info);
        else setUploadError(info);
      }
    } finally {
      abortRef.current = null;
      if (mountedRef.current) setUploading(false);
    }
  };

  const cancelUpload = () => {
    if (abortRef.current) abortRef.current.abort();
  };

  const handleDelete = async (r) => {
    if (!confirmAction(`Delete "${r.fileName || "this resource"}"? This cannot be undone.`)) return;
    setDeletingId(r.id);
    try {
      await deleteNoteTrackerResource(r.id);
      showToast("Resource deleted");
      list.reload();
    } catch (e) {
      const info = noteTrackerGenericErrorInfo(e);
      if (isFatalError(info)) setFatal(info);
      else showToast(errorMessage(info));
    } finally {
      setDeletingId(null);
    }
  };

  const processing = uploading && progress >= 100;

  return (
    <NtPage
      title="Resources"
      subtitle="Files you add here can be attached to a question on the Ask page."
      fatal={fatal}
      mode={mode}
    >
      <NtBanner tone="info" mode={mode}>
        Resources are used as extra context when you ask a question. Attach one on the Ask
        page, and the answer can use the text of the file next to the meeting.
      </NtBanner>

      <Panel mode={mode} title="Upload a file">
        <div className="nt-form-stack">
          <div className="nt-form-row">
            <NtField
              id="nt-res-file"
              label="File"
              required
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
            <NtField
              id="nt-res-meeting"
              label="Meeting (optional)"
              hint="Link the file to a recorded meeting."
              mode={mode}
            >
              <NtSessionField
                mode={mode}
                value={uploadSession}
                onChange={setUploadSession}
                onFatal={setFatal}
                disabled={uploading}
              />
            </NtField>
          </div>

          {file && !fileError && !uploading && (
            <p
              style={{
                margin: 0,
                fontFamily: FONT_FAMILY,
                fontSize: FONT_SIZE.bodySmall,
                color: t.textSub,
                overflowWrap: "anywhere",
              }}
            >
              {`${file.name} · ${fmtBytes(file.size)}`}
            </p>
          )}

          {uploadError && (
            <NtBanner tone="error" title="The file could not be uploaded" mode={mode}>
              {uploadErrorText(uploadError)}
            </NtBanner>
          )}

          {uploading && (
            <div style={{ fontFamily: FONT_FAMILY }}>
              <div
                role="progressbar"
                aria-label="Upload progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                style={{
                  height: 8,
                  borderRadius: RADIUS.pill,
                  background: t.barBg,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    background: CLAUDE_ACCENT,
                    transition: "width 0.2s ease",
                  }}
                />
              </div>
              <div
                role="status"
                aria-live="polite"
                style={{ marginTop: NT_GAP.xs, fontSize: FONT_SIZE.caption, color: t.textSub }}
              >
                {processing ? "Reading the file…" : `Uploading… ${progress}%`}
              </div>
            </div>
          )}

          <div className="nt-row-actions">
            <Button
              variant="primary"
              mode={mode}
              icon={Upload}
              disabled={uploading || !file || !!fileError}
              onClick={startUpload}
            >
              {uploading ? "Uploading…" : "Upload"}
            </Button>
            {uploading && (
              <Button variant="secondary" mode={mode} icon={X} onClick={cancelUpload}>
                Cancel upload
              </Button>
            )}
          </div>
        </div>
      </Panel>

      <Panel mode={mode} title="Your resources">
        <div className="nt-toolbar" style={{ marginBottom: NT_GAP.md }}>
          <NtField id="nt-res-filter" label="Meeting" mode={mode} style={{ minWidth: 220 }}>
            <NtSessionField mode={mode} value={filterSession} onChange={setFilterSession} onFatal={setFatal} />
          </NtField>
        </div>

        {list.loading && <NtSkeletonRows count={3} height={72} mode={mode} />}

        {!list.loading && list.error && (
          <NtApiError error={list.error} mode={mode} onRetry={list.reload} />
        )}

        {!list.loading && !list.error && list.items.length === 0 && (
          <NtEmptyState
            mode={mode}
            icon={Paperclip}
            title={filterSession ? "No resources for this meeting" : "No resources yet"}
            text={
              filterSession
                ? "Try another meeting, or remove the meeting filter."
                : "Upload a PDF, Word, text or Markdown file to use it as extra context."
            }
          />
        )}

        {!list.loading && !list.error && list.items.length > 0 && (
          <>
            <ul
              aria-label="Resources"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: NT_GAP.sm,
                margin: 0,
                padding: 0,
              }}
            >
              {list.items.map((r) => (
                <ResourceRow
                  key={r.id}
                  r={r}
                  mode={mode}
                  known={filterSession}
                  busy={deletingId === r.id}
                  onDelete={handleDelete}
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
    </NtPage>
  );
}
