"use client";

import React, { useEffect, useState } from "react";
import { Copy, Pencil, Plus, StickyNote, Trash2, BookOpen } from "lucide-react";
import {
  T,
  Button,
  Panel,
  useAutoDarkMode,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  RADIUS,
} from "@/design-system";
import { useToast } from "../../../components/Toast";
import {
  CLEAR_VALUE,
  createNoteTrackerNote,
  deleteNoteTrackerNote,
  getNoteTrackerNote,
  getNoteTrackerNotes,
  noteTrackerGenericErrorInfo,
  updateNoteTrackerNote,
} from "../../../../../../services/noteTrackerService";
import {
  NT_GAP,
  NT_LIMITS,
  confirmAction,
  copyToClipboard,
  errorMessage,
  fmtDateTimeIst,
  isFatalError,
  previewText,
  sessionLabel,
} from "./ntUtils";
import useNtPagedList from "./useNtPagedList";
import NtPage from "./NtPage";
import NtModal from "./NtModal";
import NtStatusBadge from "./NtStatusBadge";
import NtApiError from "./NtApiError";
import NtAnswerText from "./NtAnswerText";
import { NtSkeletonRows } from "./NtSkeleton";
import {
  NtBanner,
  NtEmptyState,
  NtField,
  NtPager,
  NtSessionField,
  NtTextArea,
  NtTextInput,
} from "./ntForms";

const NOTE_FORM_ID = "nt-note-form";

// text for the meeting a note belongs to (we only know the id unless it is the filtered meeting)
const noteMeeting = (note, known) => {
  if (!note?.sessionId) return "";
  if (known && known.sessionId === note.sessionId) return sessionLabel(known);
  return sessionLabel({ sessionId: note.sessionId });
};

const timesText = (note) => {
  const created = `Created ${fmtDateTimeIst(note.createdAt)}`;
  const changed =
    note.updatedAt && note.updatedAt !== note.createdAt
      ? ` · Updated ${fmtDateTimeIst(note.updatedAt)}`
      : "";
  return created + changed;
};

// ───────────── one note in the list ─────────────
function NoteCard({ note, mode, known, busy, onOpen, onEdit, onDelete }) {
  const t = T[mode] || T.light;
  const meeting = noteMeeting(note, known);
  const muted = {
    margin: 0,
    color: t.textSub,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.bodySmall,
    lineHeight: LINE_HEIGHT.body,
    overflowWrap: "anywhere",
  };
  return (
    <article
      aria-label={note.title || "Untitled note"}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: NT_GAP.sm,
        minWidth: 0,
        padding: NT_GAP.md,
        borderRadius: RADIUS.messageBubble,
        background: t.recentItemBg,
        border: `1px solid ${t.recentItemBorder}`,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: NT_GAP.sm,
        }}
      >
        <h3
          style={{
            margin: 0,
            minWidth: 0,
            fontSize: FONT_SIZE.cardLabel,
            fontWeight: FONT_WEIGHT.semibold,
            color: t.text,
            overflowWrap: "anywhere",
          }}
        >
          {note.title || "Untitled note"}
        </h3>
        <NtStatusBadge kind="source" value={note.source} />
      </div>

      <p style={{ ...muted, color: t.text }}>{previewText(note.content, 200)}</p>

      <p style={{ ...muted, fontSize: FONT_SIZE.caption, color: t.textMuted }}>
        {meeting ? `${meeting} · ` : ""}
        {timesText(note)}
      </p>

      <div className="nt-row-actions" style={{ marginTop: "auto" }}>
        <Button variant="secondary" size="sm" mode={mode} icon={BookOpen} onClick={() => onOpen(note)}>
          Read
        </Button>
        <Button
          variant="ghost"
          size="sm"
          mode={mode}
          icon={Pencil}
          disabled={busy}
          onClick={() => onEdit(note)}
          aria-label={`Edit note: ${note.title || "Untitled note"}`}
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          mode={mode}
          icon={Trash2}
          disabled={busy}
          onClick={() => onDelete(note)}
          aria-label={`Delete note: ${note.title || "Untitled note"}`}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}

// ───────────── read view ─────────────
function NoteViewModal({ state, mode, busy, known, onClose, onEdit, onDelete, onCopy }) {
  const t = T[mode] || T.light;
  const { note, loading, error } = state;
  const meeting = note ? noteMeeting(note, known) : "";

  const footer = note ? (
    <>
      <Button variant="secondary" mode={mode} icon={Copy} onClick={() => onCopy(note)}>
        Copy
      </Button>
      <Button variant="secondary" mode={mode} icon={Pencil} disabled={busy} onClick={() => onEdit(note)}>
        Edit
      </Button>
      <Button variant="danger" mode={mode} icon={Trash2} disabled={busy} onClick={() => onDelete(note)}>
        Delete
      </Button>
      <Button variant="primary" mode={mode} onClick={onClose}>
        Close
      </Button>
    </>
  ) : (
    <Button variant="primary" mode={mode} onClick={onClose}>
      Close
    </Button>
  );

  return (
    <NtModal
      title={note ? note.title || "Untitled note" : "Note"}
      mode={mode}
      width={720}
      onClose={onClose}
      footer={footer}
    >
      {loading && <NtSkeletonRows count={3} height={56} mode={mode} />}
      {!loading && error && <NtApiError error={error} mode={mode} />}
      {!loading && note && (
        <div style={{ fontFamily: FONT_FAMILY }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: NT_GAP.sm,
              marginBottom: NT_GAP.md,
            }}
          >
            <NtStatusBadge kind="source" value={note.source} />
            <span
              style={{
                fontSize: FONT_SIZE.caption,
                color: t.textSub,
                overflowWrap: "anywhere",
              }}
            >
              {meeting ? `${meeting} · ` : ""}
              {timesText(note)}
            </span>
          </div>
          <div
            style={{
              padding: NT_GAP.md,
              border: `1px solid ${t.border}`,
              borderRadius: RADIUS.messageBubble,
            }}
          >
            <NtAnswerText text={note.content} mode={mode} />
          </div>
        </div>
      )}
    </NtModal>
  );
}

// ───────────── create / edit ─────────────
function NoteFormModal({ note, mode, onClose, onSaved, onFatal }) {
  const isEdit = !!note;
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [session, setSession] = useState(
    note?.sessionId ? { sessionId: note.sessionId } : null,
  );
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  const validate = () => {
    const e = {};
    const tt = title.trim();
    if (!tt) e.title = "Please enter a title.";
    else if (tt.length > NT_LIMITS.noteTitle)
      e.title = `The title can have at most ${NT_LIMITS.noteTitle} characters.`;
    if (!content.trim()) e.content = "Please write the note.";
    else if (content.length > NT_LIMITS.noteContent)
      e.content = `The note can have at most ${NT_LIMITS.noteContent} characters.`;
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (saving) return;
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setServerError(null);

    let request;
    if (isEdit) {
      // send only what changed
      const body = {};
      if (title.trim() !== (note.title || "")) body.title = title.trim();
      if (content !== (note.content || "")) body.content = content;
      const before = note.sessionId || null;
      const after = session?.sessionId || null;
      if (before !== after) body.sessionId = after === null ? CLEAR_VALUE : after;
      if (Object.keys(body).length === 0) {
        onClose();
        return;
      }
      request = () => updateNoteTrackerNote(note.id, body);
    } else {
      request = () =>
        createNoteTrackerNote({
          title: title.trim(),
          content,
          sessionId: session?.sessionId,
        });
    }

    setSaving(true);
    try {
      const res = await request();
      onSaved(res.data, isEdit);
    } catch (err) {
      const info = noteTrackerGenericErrorInfo(err);
      if (isFatalError(info)) {
        onFatal(info);
        return;
      }
      setServerError(info);
      setSaving(false);
    }
  };

  return (
    <NtModal
      title={isEdit ? "Edit note" : "New note"}
      mode={mode}
      width={680}
      busy={saving}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" mode={mode} disabled={saving} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" mode={mode} type="submit" form={NOTE_FORM_ID} disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create note"}
          </Button>
        </>
      }
    >
      <form id={NOTE_FORM_ID} className="nt-form-stack" onSubmit={submit} noValidate>
        {serverError && (
          <NtBanner tone="error" mode={mode}>
            {errorMessage(serverError)}
          </NtBanner>
        )}
        <NtField
          id="nt-note-title"
          label="Title"
          required
          mode={mode}
          error={errors.title}
          count={title.length}
          max={NT_LIMITS.noteTitle}
        >
          <NtTextInput
            mode={mode}
            invalid={!!errors.title}
            value={title}
            data-autofocus
            onChange={(e) => setTitle(e.target.value)}
          />
        </NtField>
        <NtField
          id="nt-note-content"
          label="Note"
          required
          mode={mode}
          error={errors.content}
          count={content.length}
          max={NT_LIMITS.noteContent}
        >
          <NtTextArea
            mode={mode}
            invalid={!!errors.content}
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </NtField>
        <NtField
          id="nt-note-meeting"
          label="Meeting (optional)"
          hint="Link this note to a recorded meeting."
          mode={mode}
        >
          <NtSessionField mode={mode} value={session} onChange={setSession} onFatal={onFatal} disabled={saving} />
        </NtField>
      </form>
    </NtModal>
  );
}

// ───────────── page ─────────────
/**
 * @param {string|null} [initialNoteId]  open this note in the read view on arrival
 *   (the shell passes it when another page says "Open note"; remount with key=id).
 */
export default function NoteTrackerNotes({ initialNoteId = null }) {
  const isDark = useAutoDarkMode();
  const mode = isDark ? "dark" : "light";
  const t = T[mode];
  const showToast = useToast();

  const [fatal, setFatal] = useState(null);
  const [filterSession, setFilterSession] = useState(null);
  const [view, setView] = useState(null); // { note, loading, error }
  const [form, setForm] = useState(null); // { note: NoteDto | null }
  const [deletingId, setDeletingId] = useState(null);

  const list = useNtPagedList(
    getNoteTrackerNotes,
    { sessionId: filterSession?.sessionId },
    { onFatal: setFatal },
  );

  // open the note the shell asked for
  useEffect(() => {
    if (!initialNoteId) return undefined;
    let off = false;
    setView({ note: null, loading: true, error: null });
    getNoteTrackerNote(initialNoteId)
      .then((res) => {
        if (!off) setView({ note: res.data || null, loading: false, error: null });
      })
      .catch((e) => {
        if (off) return;
        const info = noteTrackerGenericErrorInfo(e);
        if (isFatalError(info)) setFatal(info);
        else setView({ note: null, loading: false, error: info });
      });
    return () => {
      off = true;
    };
  }, [initialNoteId]);

  const openNote = (note) => setView({ note, loading: false, error: null });

  const handleCopy = async (note) => {
    const ok = await copyToClipboard(note.content);
    showToast(ok ? "Copied to clipboard" : "Could not copy. Please select the text and copy it.");
  };

  const handleSaved = (note, wasEdit) => {
    showToast(wasEdit ? "Note saved" : "Note created");
    setForm(null);
    setView((v) => (v && v.note && v.note.id === note.id ? { note, loading: false, error: null } : v));
    list.reload();
  };

  const handleDelete = async (note) => {
    if (!confirmAction("Delete this note? This cannot be undone.")) return;
    setDeletingId(note.id);
    try {
      await deleteNoteTrackerNote(note.id);
      showToast("Note deleted");
      setView((v) => (v && v.note && v.note.id === note.id ? null : v));
      setForm((f) => (f && f.note && f.note.id === note.id ? null : f));
      list.reload();
    } catch (e) {
      const info = noteTrackerGenericErrorInfo(e);
      if (isFatalError(info)) setFatal(info);
      else showToast(errorMessage(info));
    } finally {
      setDeletingId(null);
    }
  };

  const muted = {
    margin: 0,
    color: t.textSub,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.bodySmall,
  };

  return (
    <NtPage
      title="Notes"
      subtitle="Answers and workflow results you saved, plus notes you write yourself."
      fatal={fatal}
      mode={mode}
    >
      <Panel
        mode={mode}
        title="Your notes"
        action={
          <Button variant="primary" size="sm" mode={mode} icon={Plus} onClick={() => setForm({ note: null })}>
            New note
          </Button>
        }
      >
        <div className="nt-toolbar" style={{ marginBottom: NT_GAP.md }}>
          <NtField id="nt-notes-filter" label="Meeting" mode={mode} style={{ minWidth: 220 }}>
            <NtSessionField mode={mode} value={filterSession} onChange={setFilterSession} onFatal={setFatal} />
          </NtField>
        </div>

        {list.loading && <NtSkeletonRows count={3} height={110} mode={mode} />}

        {!list.loading && list.error && (
          <NtApiError error={list.error} mode={mode} onRetry={list.reload} />
        )}

        {!list.loading && !list.error && list.items.length === 0 && (
          <NtEmptyState
            mode={mode}
            icon={StickyNote}
            title={filterSession ? "No notes for this meeting" : "No notes yet"}
            text={
              filterSession
                ? "Try another meeting, or remove the meeting filter."
                : "Save an answer from the Ask page, or write a note yourself."
            }
            action={
              <Button variant="primary" size="sm" mode={mode} icon={Plus} onClick={() => setForm({ note: null })}>
                New note
              </Button>
            }
          />
        )}

        {!list.loading && !list.error && list.items.length > 0 && (
          <>
            <div className="nt-card-grid">
              {list.items.map((n) => (
                <NoteCard
                  key={n.id}
                  note={n}
                  mode={mode}
                  known={filterSession}
                  busy={deletingId === n.id}
                  onOpen={openNote}
                  onEdit={(note) => setForm({ note })}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <NtPager
              mode={mode}
              page={list.page}
              totalPages={list.totalPages}
              totalElements={list.totalElements}
              onPage={list.setPage}
            />
          </>
        )}
        {!list.loading && !list.error && list.items.length > 0 && list.totalPages <= 1 && (
          <p style={{ ...muted, marginTop: NT_GAP.md }}>
            {`${list.totalElements || list.items.length} ${(list.totalElements || list.items.length) === 1 ? "note" : "notes"}`}
          </p>
        )}
      </Panel>

      {view && (
        <NoteViewModal
          state={view}
          mode={mode}
          known={filterSession}
          busy={view.note ? deletingId === view.note.id : false}
          onClose={() => setView(null)}
          onEdit={(note) => setForm({ note })}
          onDelete={handleDelete}
          onCopy={handleCopy}
        />
      )}

      {form && (
        <NoteFormModal
          note={form.note}
          mode={mode}
          onClose={() => setForm(null)}
          onSaved={handleSaved}
          onFatal={setFatal}
        />
      )}
    </NtPage>
  );
}
