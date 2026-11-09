// Shared helpers for the Note Tracker pages (pure functions + small constants).
import { T, FONT_FAMILY, FONT_SIZE, RADIUS } from "@/design-system";

export const IST = "Asia/Kolkata";

/** The few small gaps the design system has no spacing token for — kept in one place. */
export const NT_GAP = { xs: 4, sm: 8, md: 12 };

/** Text colour on top of the accent colour (white) — taken from the design system tokens. */
export const ON_ACCENT = T.dark.text;

export const MAX_QUESTION_LENGTH = 2000;

/** Default page size of every paged list (the server default is 20). */
export const PAGE_SIZE = 20;

/** Server-side limits mirrored on the client for fast feedback (the server stays authoritative). */
export const NT_LIMITS = {
  noteTitle: 200,
  noteContent: 50000,
  taskTitle: 300,
  taskDescription: 2000,
  workflowName: 200,
  workflowDescription: 1000,
  resourcesPerQuestion: 10,
};

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const UPLOAD_EXTENSIONS = [".pdf", ".docx", ".txt", ".md"];

// yyyy-MM-dd in IST
export const todayIst = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: IST });

export const daysAgoIst = (n) =>
  new Date(Date.now() - n * 86400000).toLocaleDateString("en-CA", {
    timeZone: IST,
  });

// Label for a yyyy-MM-dd key (this formats a date key, it does not convert any time)
export const fmtDateLabel = (yyyyMmDd) => {
  if (!yyyyMmDd) return "—";
  const d = new Date(`${yyyyMmDd}T00:00:00+05:30`);
  if (Number.isNaN(d.getTime())) return yyyyMmDd;
  return d.toLocaleDateString("en-IN", {
    timeZone: IST,
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};

/** "5 Sep 2026, 02:30 PM" (IST) from an ISO timestamp. */
export const fmtDateTimeIst = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/** "5 Sep 2026" from a yyyy-MM-dd key (due dates). */
export const fmtDueDate = (yyyyMmDd) => {
  if (!yyyyMmDd) return "—";
  const d = new Date(`${yyyyMmDd}T00:00:00+05:30`);
  if (Number.isNaN(d.getTime())) return String(yyyyMmDd);
  return d.toLocaleDateString("en-IN", {
    timeZone: IST,
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/** True when an OPEN task is past its due date (compares yyyy-MM-dd keys). */
export const isOverdue = (dueDate, status) =>
  status === "OPEN" && !!dueDate && String(dueDate) < todayIst();

export const fmtDuration = (sec) => {
  const s = Math.max(0, Math.round(Number(sec) || 0));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

export const fmtBytes = (n) => {
  const b = Number(n);
  if (!Number.isFinite(b) || b < 0) return "—";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
};

export const fmtNumber = (n) =>
  Number.isFinite(Number(n)) ? Number(n).toLocaleString("en-IN") : "—";

/** Collapse whitespace and cut to `max` characters (for card previews). */
export const previewText = (text, max = 160) => {
  const s = String(text ?? "").replace(/\s+/g, " ").trim();
  return s.length > max ? `${s.slice(0, max).trimEnd()}…` : s;
};

const prettify = (v) => {
  const s = String(v || "").replace(/_/g, " ").toLowerCase();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
};

export const shortId = (id) => {
  const s = String(id ?? "");
  return s.length > 10 ? `${s.slice(0, 8)}…` : s;
};

/**
 * Text for a meeting shown from either a picked session
 * ({sessionId, title, label}) or just an id ({sessionId}).
 */
export const sessionLabel = (s) => {
  if (!s) return "";
  const named = [s.label, s.title].filter(Boolean).join(" · ");
  return named || `Meeting ${shortId(s.sessionId)}`;
};

export const MODE_LABELS = {
  ASK: "Question",
  SUMMARY: "Summary",
  ACTION_ITEMS: "Action items",
  DECISIONS: "Decisions",
  BLOCKERS: "Blockers",
  STANDUP_UPDATES: "Stand-up updates",
  MINUTES: "Meeting minutes",
  STATUS_UPDATE: "Status update",
  FOLLOW_UP_EMAIL: "Follow-up email draft",
};

/** Readable labels of the activity log actions (order = order of the filter list). */
export const ACTION_LABELS = {
  ASK: "Asked a question",
  NOTE_CREATE: "Note created",
  NOTE_UPDATE: "Note updated",
  NOTE_DELETE: "Note deleted",
  RESOURCE_UPLOAD: "Resource uploaded",
  RESOURCE_DELETE: "Resource deleted",
  WORKFLOW_CREATE: "Workflow created",
  WORKFLOW_UPDATE: "Workflow updated",
  WORKFLOW_STATUS: "Workflow status changed",
  WORKFLOW_DELETE: "Workflow deleted",
  WORKFLOW_RUN: "Workflow run (manual)",
  WORKFLOW_RUN_AUTO: "Workflow run (automatic)",
  TASK_CREATE: "Task created",
  TASK_UPDATE: "Task updated",
  TASK_DELETE: "Task deleted",
};
export const ACTION_KEYS = Object.keys(ACTION_LABELS);
export const actionLabel = (a) => ACTION_LABELS[a] || prettify(a) || "—";

export const TRIGGER_LABELS = {
  MANUAL: "Manual",
  REPORT_READY: "When a meeting report is ready",
};
export const triggerLabel = (k) => TRIGGER_LABELS[k] || prettify(k) || "—";

export const RUN_TRIGGER_LABELS = { MANUAL: "Manual", AUTO: "Automatic" };
export const runTriggerLabel = (k) => RUN_TRIGGER_LABELS[k] || prettify(k) || "—";

export const FINAL_RUN_STATUSES = ["COMPLETED", "FAILED", "CANCELLED"];
export const isRunFinal = (status) =>
  FINAL_RUN_STATUSES.includes(String(status || "").toUpperCase());

const BADGES = {
  workflow: {
    DRAFT: { tone: "neutral", label: "Draft" },
    ACTIVE: { tone: "success", label: "Active" },
    PAUSED: { tone: "warning", label: "Paused" },
  },
  run: {
    PENDING: { tone: "neutral", label: "Queued" },
    RUNNING: { tone: "info", label: "Running" },
    COMPLETED: { tone: "success", label: "Completed" },
    FAILED: { tone: "danger", label: "Failed" },
    CANCELLED: { tone: "neutral", label: "Cancelled" },
  },
  node: {
    OK: { tone: "success", label: "Done" },
    SKIPPED: { tone: "neutral", label: "Skipped" },
    FAILED: { tone: "danger", label: "Failed" },
  },
  task: {
    OPEN: { tone: "info", label: "Open" },
    DONE: { tone: "success", label: "Done" },
  },
  activity: {
    SUCCESS: { tone: "success", label: "Success" },
    FAILED: { tone: "danger", label: "Failed" },
  },
  source: {
    MANUAL: { tone: "neutral", label: "Manual" },
    FROM_ANSWER: { tone: "info", label: "From answer" },
    WORKFLOW: { tone: "purple", label: "Workflow" },
  },
};

/**
 * kind: "workflow" | "run" | "node" | "task" | "activity" | "source"
 * @returns {{tone: string, label: string}}  for <Badge>; unknown values are shown as given.
 */
export const statusBadge = (kind, value) => {
  const v = String(value || "").toUpperCase();
  const hit = BADGES[kind] && BADGES[kind][v];
  return hit || { tone: "neutral", label: v ? prettify(v) : "—" };
};

/** reportStatus -> { tone, label } for <Badge>. Unknown values are shown as given. */
export const reportBadge = (status) => {
  const s = String(status || "").toUpperCase();
  if (!s) return null;
  if (s === "DONE") return { tone: "success", label: "Report ready" };
  if (s === "FAILED") return { tone: "danger", label: "Report failed" };
  const pretty = s.charAt(0) + s.slice(1).toLowerCase().replace(/_/g, " ");
  return { tone: "warning", label: pretty };
};

/**
 * Classify an error info object {status, code, message} (see noteTrackerErrorInfo).
 * @returns {"disabled"|"forbidden"|"limit"|"validation"|"notfound"|"retry"|"other"}
 */
export const classifyError = (info) => {
  const status = info?.status || 0;
  const code = info?.code || "";
  if (code === "NOTETRACKER_DISABLED") return "disabled";
  if (status === 403) return "forbidden";
  if (status === 429) return "limit";
  if (status === 400) return "validation";
  if (status === 404) return "notfound";
  if (status === 0 || status === 502 || status === 503 || status === 504)
    return "retry";
  return "other";
};

/**
 * classifyError plus the 3b codes:
 * @returns {"busy"|"workflowsDisabled"|ReturnType<typeof classifyError>}
 */
export const extendedKind = (info) => {
  const code = info?.code || "";
  if (code === "NOTETRACKER_BUSY") return "busy";
  if (code === "NOTETRACKER_WORKFLOWS_DISABLED") return "workflowsDisabled";
  return classifyError(info);
};

/** Errors that replace the whole page (feature off / no access). */
export const isFatalError = (info) => {
  const k = classifyError(info);
  return k === "disabled" || k === "forbidden";
};

/** Text for a Toast after a failed action (the server's message wins). */
export const errorMessage = (info) => {
  if (extendedKind(info) === "busy") {
    return "Note Tracker is busy right now. Please try again in a minute.";
  }
  return info?.message || "Something went wrong";
};

/** window.confirm that is safe during SSR (returns false when there is no window). */
export const confirmAction = (message) =>
  typeof window !== "undefined" && window.confirm(message);

/** Copy text to the clipboard. Resolves true on success. */
export const copyToClipboard = async (text) => {
  try {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      return false;
    }
    await navigator.clipboard.writeText(text || "");
    return true;
  } catch (_) {
    return false;
  }
};

/** Client-side upload check. Returns an error text, or "" when the file is fine. */
export const validateUploadFile = (file) => {
  if (!file) return "Please choose a file.";
  const name = String(file.name || "").toLowerCase();
  if (!UPLOAD_EXTENSIONS.some((ext) => name.endsWith(ext))) {
    return "This file type is not supported. Please upload a .pdf, .docx, .txt or .md file.";
  }
  if (!file.size) return "This file is empty.";
  if (file.size > MAX_UPLOAD_BYTES) {
    return `This file is ${fmtBytes(file.size)}. The maximum size is 10 MB.`;
  }
  return "";
};

/** Shared style for native inputs (the design system has no Input component yet). */
export const inputStyle = (t, mode) => ({
  width: "100%",
  boxSizing: "border-box",
  background: t.inputBg,
  color: t.text,
  border: `1px solid ${t.border}`,
  borderRadius: RADIUS.input,
  padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZE.body,
  colorScheme: mode === "dark" ? "dark" : "light",
});
