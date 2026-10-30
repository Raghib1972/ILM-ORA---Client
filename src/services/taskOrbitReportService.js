"use client";

import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000/api";

const BASE = `${API_BASE}/meetings/taskorbit`;

// Same auth pattern as liveSessionService.js
const getAuthHeader = () => {
  const token = localStorage.getItem("lms_token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

/** GET /days?from&to&page&size  (IST dates that have sessions) */
export const getTaskOrbitDays = (params = {}) =>
  axios.get(`${BASE}/days`, { ...getAuthHeader(), params });

/** GET /sessions?date=yyyy-MM-dd&page&size */
export const getTaskOrbitSessions = (date, page = 0, size = 20) =>
  axios.get(`${BASE}/sessions`, {
    ...getAuthHeader(),
    params: { date, page, size },
  });

/** GET /sessions/{id}  (overall summary + participants + per-person reports) */
export const getTaskOrbitSession = (id) =>
  axios.get(`${BASE}/sessions/${id}`, getAuthHeader());

/** GET /sessions/{id}/status  (lightweight polling) */
export const getTaskOrbitSessionStatus = (id) =>
  axios.get(`${BASE}/sessions/${id}/status`, getAuthHeader());

/** GET /sessions/{id}/participants/{participantId}/transcript?page&size */
export const getTaskOrbitTranscript = (id, participantId, page = 0, size = 100) =>
  axios.get(`${BASE}/sessions/${id}/participants/${participantId}/transcript`, {
    ...getAuthHeader(),
    params: { page, size },
  });

/** POST /sessions/{id}/reprocess?mode=reports|full&onlyFailed=true|false */
export const reprocessTaskOrbitSession = (id, mode, onlyFailed = false) =>
  axios.post(`${BASE}/sessions/${id}/reprocess`, null, {
    ...getAuthHeader(),
    params: { mode, onlyFailed },
  });

/** Turn an axios error into { code, message } using the backend's {error,message} body. */
export const taskOrbitErrorInfo = (err) => {
  const data = err?.response?.data;
  return {
    status: err?.response?.status || 0,
    code: data?.error || "",
    message: data?.message || err?.message || "Something went wrong",
  };
};
