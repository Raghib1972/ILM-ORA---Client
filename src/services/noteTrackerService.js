"use client";

import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000/api";

const BASE = `${API_BASE}/meetings/notetracker`;

// Same auth pattern as taskOrbitReportService.js
const getAuthHeader = () => {
  const token = localStorage.getItem("lms_token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// The model can take up to ~60 s to answer; give it some headroom.
const ASK_TIMEOUT_MS = 90000;
// Plain CRUD calls (notes, tasks, workflows, ...).
const REQUEST_TIMEOUT_MS = 30000;
// File upload (up to 10 MB, plus server-side text extraction).
const UPLOAD_TIMEOUT_MS = 120000;

/**
 * Value sent in a PATCH body to CLEAR an optional field (e.g. remove a due date
 * or unlink a meeting). If your server expects something else, change it here.
 */
export const CLEAR_VALUE = null;

const cfg = (extra = {}) => ({
  ...getAuthHeader(),
  timeout: REQUEST_TIMEOUT_MS,
  ...extra,
});

const enc = (id) => encodeURIComponent(id);

/** Drop undefined / null / "" (used for query params and create bodies). */
const compact = (obj = {}) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== undefined && v !== null && v !== "",
    ),
  );

/** Drop only undefined (PATCH bodies: null / "" are meaningful there). */
const withoutUndefined = (obj = {}) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

// ═════════════════════ STEP 3a ═════════════════════

/** GET /days?from&to&page&size  -> PageResult<MeetingDay> */
export const getNoteTrackerDays = (params = {}) =>
  axios.get(`${BASE}/days`, { ...getAuthHeader(), params });

/** GET /sessions?date=yyyy-MM-dd  (or from & to) &page&size -> PageResult<MeetingSummaryItem> */
export const getNoteTrackerSessions = (params = {}) =>
  axios.get(`${BASE}/sessions`, { ...getAuthHeader(), params });

/** GET /sessions/{id} -> SessionDetailView */
export const getNoteTrackerSession = (sessionId) =>
  axios.get(`${BASE}/sessions/${enc(sessionId)}`, getAuthHeader());

/** POST /sessions/{id}/ask  body: { question, conversationId, mode, resourceIds } -> AskResponse */
export const askNoteTracker = (
  sessionId,
  { question = "", conversationId = null, mode = "ASK", resourceIds = [] } = {},
) =>
  axios.post(
    `${BASE}/sessions/${enc(sessionId)}/ask`,
    {
      question,
      conversationId,
      mode,
      // the server accepts at most 10 resources per question
      resourceIds: Array.isArray(resourceIds) ? resourceIds.slice(0, 10) : [],
    },
    { ...getAuthHeader(), timeout: ASK_TIMEOUT_MS },
  );

/** GET /sessions/{id}/conversations -> ConversationDto[] */
export const getNoteTrackerConversations = (sessionId) =>
  axios.get(`${BASE}/sessions/${enc(sessionId)}/conversations`, getAuthHeader());

/** GET /conversations/{id}/messages -> MessageDto[] */
export const getNoteTrackerMessages = (conversationId) =>
  axios.get(
    `${BASE}/conversations/${enc(conversationId)}/messages`,
    getAuthHeader(),
  );

/** DELETE /conversations/{id} -> 204 (owner only) */
export const deleteNoteTrackerConversation = (conversationId) =>
  axios.delete(`${BASE}/conversations/${enc(conversationId)}`, getAuthHeader());

// ═════════════════════ STEP 3b: NOTES ═════════════════════

/** GET /notes?sessionId&page&size -> PageResult<NoteDto> */
export const getNoteTrackerNotes = (params = {}) =>
  axios.get(`${BASE}/notes`, cfg({ params: compact(params) }));

/** GET /notes/{id} -> NoteDto */
export const getNoteTrackerNote = (id) =>
  axios.get(`${BASE}/notes/${enc(id)}`, cfg());

/** POST /notes { title, content, sessionId? } -> NoteDto */
export const createNoteTrackerNote = (body) =>
  axios.post(`${BASE}/notes`, compact(body), cfg());

/** PATCH /notes/{id} { title?, content?, sessionId? } -> NoteDto  (send only changed fields) */
export const updateNoteTrackerNote = (id, body) =>
  axios.patch(`${BASE}/notes/${enc(id)}`, withoutUndefined(body), cfg());

/** DELETE /notes/{id} -> 204 */
export const deleteNoteTrackerNote = (id) =>
  axios.delete(`${BASE}/notes/${enc(id)}`, cfg());

/** POST /messages/{messageId}/note  { title? } -> NoteDto (owner only) */
export const saveNoteTrackerMessageAsNote = (messageId, title) => {
  const t = typeof title === "string" ? title.trim() : "";
  return axios.post(
    `${BASE}/messages/${enc(messageId)}/note`,
    t ? { title: t } : {},
    cfg(),
  );
};

// ═════════════════════ STEP 3b: RESOURCES ═════════════════════

/**
 * POST /resources  multipart/form-data: file (required), sessionId (optional) -> ResourceDto
 * onProgress(percent 0-100) is called while the file is being sent.
 * The Content-Type header is NOT set by hand: the browser/axios adds the multipart boundary.
 */
export const uploadNoteTrackerResource = (
  file,
  { sessionId, onProgress, signal } = {},
) => {
  const form = new FormData();
  form.append("file", file);
  if (sessionId) form.append("sessionId", sessionId);
  const extra = {
    timeout: UPLOAD_TIMEOUT_MS,
    onUploadProgress: (e) => {
      if (!onProgress) return;
      const total = e.total || file.size || 0;
      onProgress(total ? Math.min(100, Math.round((e.loaded * 100) / total)) : 0);
    },
  };
  if (signal) extra.signal = signal;
  return axios.post(`${BASE}/resources`, form, cfg(extra));
};

/** GET /resources?sessionId&page&size -> PageResult<ResourceDto> */
export const getNoteTrackerResources = (params = {}) =>
  axios.get(`${BASE}/resources`, cfg({ params: compact(params) }));

/** DELETE /resources/{id} -> 204 */
export const deleteNoteTrackerResource = (id) =>
  axios.delete(`${BASE}/resources/${enc(id)}`, cfg());

// ═════════════════════ STEP 3b: TASKS ═════════════════════

/** GET /tasks?status=OPEN|DONE&sessionId&page&size -> PageResult<TaskDto> */
export const getNoteTrackerTasks = (params = {}) =>
  axios.get(`${BASE}/tasks`, cfg({ params: compact(params) }));

/** POST /tasks { title, description?, dueDate?("yyyy-MM-dd"), sessionId? } -> TaskDto */
export const createNoteTrackerTask = (body) =>
  axios.post(`${BASE}/tasks`, compact(body), cfg());

/** PATCH /tasks/{id} { title?, description?, dueDate?, status?("OPEN"|"DONE") } -> TaskDto */
export const updateNoteTrackerTask = (id, body) =>
  axios.patch(`${BASE}/tasks/${enc(id)}`, withoutUndefined(body), cfg());

/** DELETE /tasks/{id} -> 204 */
export const deleteNoteTrackerTask = (id) =>
  axios.delete(`${BASE}/tasks/${enc(id)}`, cfg());

// ═════════════════════ STEP 3b: ACTIVITY ═════════════════════

/** GET /activity?action&sessionId&from&to&page&size -> PageResult<ActivityDto> */
export const getNoteTrackerActivity = (params = {}) =>
  axios.get(`${BASE}/activity`, cfg({ params: compact(params) }));

// ═════════════════════ STEP 3b: WORKFLOWS ═════════════════════

/** GET /workflows?page&size -> PageResult<WorkflowDto> */
export const getNoteTrackerWorkflows = (params = {}) =>
  axios.get(`${BASE}/workflows`, cfg({ params: compact(params) }));

/** GET /workflows/templates -> WorkflowTemplateDto[] */
export const getNoteTrackerWorkflowTemplates = () =>
  axios.get(`${BASE}/workflows/templates`, cfg());

/** POST /workflows/from-template/{key} -> WorkflowDto (new DRAFT) */
export const createNoteTrackerWorkflowFromTemplate = (key) =>
  axios.post(`${BASE}/workflows/from-template/${enc(key)}`, {}, cfg());

/** POST /workflows { name, description?, triggerType, nodes } -> WorkflowDto (new DRAFT) */
export const createNoteTrackerWorkflow = (body) =>
  axios.post(`${BASE}/workflows`, withoutUndefined(body), cfg());

/** GET /workflows/{id} -> WorkflowDto */
export const getNoteTrackerWorkflow = (id) =>
  axios.get(`${BASE}/workflows/${enc(id)}`, cfg());

/** PUT /workflows/{id} { name, description?, triggerType, nodes } -> WorkflowDto */
export const updateNoteTrackerWorkflow = (id, body) =>
  axios.put(`${BASE}/workflows/${enc(id)}`, withoutUndefined(body), cfg());

/** DELETE /workflows/{id} -> 204 */
export const deleteNoteTrackerWorkflow = (id) =>
  axios.delete(`${BASE}/workflows/${enc(id)}`, cfg());

/** POST /workflows/{id}/duplicate -> WorkflowDto (DRAFT, name + " (copy)") */
export const duplicateNoteTrackerWorkflow = (id) =>
  axios.post(`${BASE}/workflows/${enc(id)}/duplicate`, {}, cfg());

/** PATCH /workflows/{id}/status { status: "DRAFT"|"ACTIVE"|"PAUSED" } -> WorkflowDto */
export const setNoteTrackerWorkflowStatus = (id, status) =>
  axios.patch(`${BASE}/workflows/${enc(id)}/status`, { status }, cfg());

/** POST /workflows/{id}/run { sessionId } -> 202 { runId, status } */
export const runNoteTrackerWorkflow = (id, sessionId) =>
  axios.post(`${BASE}/workflows/${enc(id)}/run`, { sessionId }, cfg());

/** GET /workflows/{id}/runs?page&size -> PageResult<WorkflowRunDto> */
export const getNoteTrackerWorkflowRuns = (id, params = {}) =>
  axios.get(`${BASE}/workflows/${enc(id)}/runs`, cfg({ params: compact(params) }));

/** GET /runs?page&size -> PageResult<WorkflowRunDto> */
export const getNoteTrackerRuns = (params = {}) =>
  axios.get(`${BASE}/runs`, cfg({ params: compact(params) }));

/** GET /runs/{runId} -> WorkflowRunDto */
export const getNoteTrackerRun = (runId) =>
  axios.get(`${BASE}/runs/${enc(runId)}`, cfg());

// ═════════════════════ errors ═════════════════════

/**
 * Turn an axios error into { status, code, message } using the backend body
 * {error, message, timestamp}.
 *   status 0 + code "TIMEOUT"  -> request took too long
 *   status 0 + code "NETWORK"  -> no response from the server
 * opts.timeoutMessage (optional) replaces the default timeout text, which is
 * worded for answers ("The answer is taking longer ...").
 */
export const noteTrackerErrorInfo = (err, opts = {}) => {
  const res = err?.response;
  if (!res) {
    const timedOut = err?.code === "ECONNABORTED" || err?.code === "ETIMEDOUT";
    return {
      status: 0,
      code: timedOut ? "TIMEOUT" : "NETWORK",
      message: timedOut
        ? opts.timeoutMessage ||
          "The answer is taking longer than expected. Please try again."
        : "Could not reach the server. Please check your connection and try again.",
    };
  }
  const body = res.data && typeof res.data === "object" ? res.data : {};
  return {
    status: res.status || 0,
    code: body.error || "",
    message: body.message || err?.message || "Something went wrong",
  };
};

/** Same as noteTrackerErrorInfo, with a timeout text that fits non-answer calls. */
export const noteTrackerGenericErrorInfo = (err) =>
  noteTrackerErrorInfo(err, {
    timeoutMessage: "The request took too long. Please try again.",
  });
