"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  GitBranch,
  ListChecks,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import {
  T,
  Badge,
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
  createNoteTrackerTask,
  deleteNoteTrackerTask,
  getNoteTrackerTasks,
  noteTrackerGenericErrorInfo,
  updateNoteTrackerTask,
} from "../../../../../../services/noteTrackerService";
import {
  NT_GAP,
  NT_LIMITS,
  confirmAction,
  errorMessage,
  fmtDateTimeIst,
  fmtDueDate,
  isFatalError,
  isOverdue,
  sessionLabel,
} from "./ntUtils";
import useNtPagedList from "./useNtPagedList";
import NtPage from "./NtPage";
import NtModal from "./NtModal";
import NtStatusBadge from "./NtStatusBadge";
import NtApiError from "./NtApiError";
import { NtSkeletonRows } from "./NtSkeleton";
import {
  NtBanner,
  NtEmptyState,
  NtField,
  NtPager,
  NtSelect,
  NtSessionField,
  NtTextArea,
  NtTextInput,
} from "./ntForms";

const TASK_FORM_ID = "nt-task-form";

const STATUS_OPTIONS = [
  { value: "OPEN", label: "Open" },
  { value: "DONE", label: "Done" },
  { value: "", label: "All" },
];

const EMPTY_TEXT = {
  OPEN: "You have no open tasks.",
  DONE: "No task has been completed yet.",
  "": "You have no tasks yet.",
};

// ───────────── one task ─────────────
function TaskRow({ task, mode, known, busy, onToggle, onEdit, onDelete }) {
  const t = T[mode] || T.light;
  const done = task.status === "DONE";
  const overdue = isOverdue(task.dueDate, task.status);
  const byWorkflow = !!(task.workflowId || task.runId);
  const meeting = task.sessionId
    ? known && known.sessionId === task.sessionId
      ? sessionLabel(known)
      : sessionLabel({ sessionId: task.sessionId })
    : "";
  const small = {
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.caption,
    color: t.textSub,
  };

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
      <button
        type="button"
        className="nt-focus"
        disabled={busy}
        onClick={() => onToggle(task)}
        aria-label={
          done
            ? `Reopen task: ${task.title}`
            : `Mark task as done: ${task.title}`
        }
        style={{
          flexShrink: 0,
          display: "inline-flex",
          padding: 0,
          marginTop: 1,
          background: "transparent",
          border: 0,
          borderRadius: RADIUS.pill,
          cursor: busy ? "not-allowed" : "pointer",
          opacity: busy ? 0.55 : 1,
          color: done ? t.liveColor : t.textMuted,
        }}
      >
        {done ? <CheckCircle2 size={22} aria-hidden="true" /> : <Circle size={22} aria-hidden="true" />}
      </button>

      <div style={{ flex: 1, minWidth: 0, fontFamily: FONT_FAMILY }}>
        <div
          style={{
            fontSize: FONT_SIZE.cardLabel,
            fontWeight: FONT_WEIGHT.semibold,
            color: done ? t.textSub : t.text,
            textDecoration: done ? "line-through" : "none",
            overflowWrap: "anywhere",
          }}
        >
          {task.title}
        </div>
        {task.description && (
          <p
            style={{
              margin: `${NT_GAP.xs}px 0 0`,
              fontSize: FONT_SIZE.bodySmall,
              lineHeight: LINE_HEIGHT.body,
              color: t.textSub,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
            }}
          >
            {task.description}
          </p>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: NT_GAP.sm,
            marginTop: NT_GAP.sm,
            ...small,
          }}
        >
          <NtStatusBadge kind="task" value={task.status} />
          {task.dueDate && (
            <span style={{ color: overdue ? t.overdueText : t.textSub, fontWeight: overdue ? FONT_WEIGHT.semibold : FONT_WEIGHT.regular }}>
              {`Due ${fmtDueDate(task.dueDate)}${overdue ? " · overdue" : ""}`}
            </span>
          )}
          {byWorkflow ? (
            <Badge tone="purple">
              <GitBranch size={11} aria-hidden="true" /> Created by a workflow
            </Badge>
          ) : (
            <span>Added manually</span>
          )}
          {meeting && <span style={{ overflowWrap: "anywhere" }}>{meeting}</span>}
          <span>{`Created ${fmtDateTimeIst(task.createdAt)}`}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: NT_GAP.xs, justifyContent: "flex-end" }}>
        <Button
          variant="ghost"
          size="sm"
          mode={mode}
          icon={Pencil}
          disabled={busy}
          onClick={() => onEdit(task)}
          aria-label={`Edit task: ${task.title}`}
          style={{ padding: `0 ${NT_GAP.sm}px` }}
        />
        <Button
          variant="ghost"
          size="sm"
          mode={mode}
          icon={Trash2}
          disabled={busy}
          onClick={() => onDelete(task)}
          aria-label={`Delete task: ${task.title}`}
          style={{ padding: `0 ${NT_GAP.sm}px` }}
        />
      </div>
    </li>
  );
}

// ───────────── create / edit ─────────────
function TaskFormModal({ task, mode, onClose, onSaved, onFatal }) {
  const t = T[mode] || T.light;
  const isEdit = !!task;
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [session, setSession] = useState(null); // create only: PATCH has no sessionId
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  const validate = () => {
    const e = {};
    const tt = title.trim();
    if (!tt) e.title = "Please enter a title.";
    else if (tt.length > NT_LIMITS.taskTitle)
      e.title = `The title can have at most ${NT_LIMITS.taskTitle} characters.`;
    if (description.length > NT_LIMITS.taskDescription)
      e.description = `The description can have at most ${NT_LIMITS.taskDescription} characters.`;
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
      if (title.trim() !== (task.title || "")) body.title = title.trim();
      if (description.trim() !== (task.description || "")) body.description = description.trim();
      if (dueDate !== (task.dueDate || "")) body.dueDate = dueDate || CLEAR_VALUE;
      if (Object.keys(body).length === 0) {
        onClose();
        return;
      }
      request = () => updateNoteTrackerTask(task.id, body);
    } else {
      request = () =>
        createNoteTrackerTask({
          title: title.trim(),
          description: description.trim(),
          dueDate,
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
      title={isEdit ? "Edit task" : "New task"}
      mode={mode}
      width={600}
      busy={saving}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" mode={mode} disabled={saving} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" mode={mode} type="submit" form={TASK_FORM_ID} disabled={saving}>
            {saving ? "Saving…" : isEdit ? "Save changes" : "Create task"}
          </Button>
        </>
      }
    >
      <form id={TASK_FORM_ID} className="nt-form-stack" onSubmit={submit} noValidate>
        {serverError && (
          <NtBanner tone="error" mode={mode}>
            {errorMessage(serverError)}
          </NtBanner>
        )}
        <NtField
          id="nt-task-title"
          label="Title"
          required
          mode={mode}
          error={errors.title}
          count={title.length}
          max={NT_LIMITS.taskTitle}
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
          id="nt-task-desc"
          label="Description (optional)"
          mode={mode}
          error={errors.description}
          count={description.length}
          max={NT_LIMITS.taskDescription}
        >
          <NtTextArea
            mode={mode}
            invalid={!!errors.description}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </NtField>
        <div className="nt-form-row">
          <NtField id="nt-task-due" label="Due date (optional)" mode={mode}>
            <NtTextInput
              mode={mode}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </NtField>
          {isEdit ? (
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  marginBottom: NT_GAP.xs,
                  fontFamily: FONT_FAMILY,
                  fontSize: FONT_SIZE.bodySmall,
                  fontWeight: FONT_WEIGHT.semibold,
                  color: t.text,
                }}
              >
                Meeting
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: FONT_SIZE.bodySmall,
                  color: t.textSub,
                  overflowWrap: "anywhere",
                }}
              >
                {task.sessionId
                  ? sessionLabel({ sessionId: task.sessionId })
                  : "Not linked to a meeting"}
              </div>
            </div>
          ) : (
            <NtField id="nt-task-meeting" label="Meeting (optional)" mode={mode}>
              <NtSessionField mode={mode} value={session} onChange={setSession} onFatal={onFatal} disabled={saving} />
            </NtField>
          )}
        </div>
      </form>
    </NtModal>
  );
}

// ───────────── page ─────────────
export default function NoteTrackerTasks() {
  const isDark = useAutoDarkMode();
  const mode = isDark ? "dark" : "light";
  const showToast = useToast();

  const [fatal, setFatal] = useState(null);
  const [statusFilter, setStatusFilter] = useState("OPEN");
  const [filterSession, setFilterSession] = useState(null);
  const [form, setForm] = useState(null); // { task: TaskDto | null }
  const [busyIds, setBusyIds] = useState({}); // taskId -> true while a request runs

  const list = useNtPagedList(
    getNoteTrackerTasks,
    { status: statusFilter, sessionId: filterSession?.sessionId },
    { onFatal: setFatal },
  );

  const setBusy = (id, on) =>
    setBusyIds((m) => {
      const next = { ...m };
      if (on) next[id] = true;
      else delete next[id];
      return next;
    });

  // one-click complete / reopen
  const handleToggle = async (task) => {
    const next = task.status === "DONE" ? "OPEN" : "DONE";
    setBusy(task.id, true);
    try {
      const res = await updateNoteTrackerTask(task.id, { status: next });
      const updated = res.data || { ...task, status: next };
      showToast(next === "DONE" ? "Task completed" : "Task reopened");
      // with a status filter the task no longer belongs in this list
      if (statusFilter && updated.status !== statusFilter) list.reload();
      else list.replaceItem(updated);
    } catch (e) {
      const info = noteTrackerGenericErrorInfo(e);
      if (isFatalError(info)) setFatal(info);
      else showToast(errorMessage(info));
    } finally {
      setBusy(task.id, false);
    }
  };

  const handleDelete = async (task) => {
    if (!confirmAction("Delete this task? This cannot be undone.")) return;
    setBusy(task.id, true);
    try {
      await deleteNoteTrackerTask(task.id);
      showToast("Task deleted");
      list.reload();
    } catch (e) {
      const info = noteTrackerGenericErrorInfo(e);
      if (isFatalError(info)) setFatal(info);
      else showToast(errorMessage(info));
    } finally {
      setBusy(task.id, false);
    }
  };

  const handleSaved = (task, wasEdit) => {
    showToast(wasEdit ? "Task saved" : "Task created");
    setForm(null);
    list.reload();
  };

  const filtered = !!(statusFilter !== "OPEN" || filterSession);

  return (
    <NtPage
      title="Tasks"
      subtitle="Follow-ups from your meetings. Workflows can create tasks for you; you can add your own too."
      fatal={fatal}
      mode={mode}
    >
      <Panel
        mode={mode}
        title="Your tasks"
        action={
          <Button variant="primary" size="sm" mode={mode} icon={Plus} onClick={() => setForm({ task: null })}>
            New task
          </Button>
        }
      >
        <div className="nt-toolbar" style={{ marginBottom: NT_GAP.md }}>
          <NtField id="nt-tasks-status" label="Status" mode={mode} style={{ minWidth: 160 }}>
            <NtSelect
              mode={mode}
              value={statusFilter}
              options={STATUS_OPTIONS}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </NtField>
          <NtField id="nt-tasks-meeting" label="Meeting" mode={mode} style={{ minWidth: 220 }}>
            <NtSessionField mode={mode} value={filterSession} onChange={setFilterSession} onFatal={setFatal} />
          </NtField>
        </div>

        {list.loading && <NtSkeletonRows count={4} height={72} mode={mode} />}

        {!list.loading && list.error && (
          <NtApiError error={list.error} mode={mode} onRetry={list.reload} />
        )}

        {!list.loading && !list.error && list.items.length === 0 && (
          <NtEmptyState
            mode={mode}
            icon={ListChecks}
            title={filterSession ? "No tasks for this meeting" : EMPTY_TEXT[statusFilter]}
            text={
              filtered
                ? "Try a different status or meeting."
                : "Add a task yourself, or let a workflow create tasks from your meeting action items."
            }
            action={
              <Button variant="primary" size="sm" mode={mode} icon={Plus} onClick={() => setForm({ task: null })}>
                New task
              </Button>
            }
          />
        )}

        {!list.loading && !list.error && list.items.length > 0 && (
          <>
            <ul
              aria-label="Tasks"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: NT_GAP.sm,
                margin: 0,
                padding: 0,
              }}
            >
              {list.items.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  mode={mode}
                  known={filterSession}
                  busy={!!busyIds[task.id]}
                  onToggle={handleToggle}
                  onEdit={(tk) => setForm({ task: tk })}
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

      {form && (
        <TaskFormModal
          task={form.task}
          mode={mode}
          onClose={() => setForm(null)}
          onSaved={handleSaved}
          onFatal={setFatal}
        />
      )}
    </NtPage>
  );
}
