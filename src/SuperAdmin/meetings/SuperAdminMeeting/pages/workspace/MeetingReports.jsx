"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Users,
  Mic,
  MicOff,
  AlertTriangle,
  FileText,
  X,
} from "lucide-react";
import PageHead from "../../components/PageHead";
import { useToast } from "../../components/Toast";
import {
  getTaskOrbitDays,
  getTaskOrbitSessions,
  getTaskOrbitSession,
  getTaskOrbitSessionStatus,
  getTaskOrbitTranscript,
  reprocessTaskOrbitSession,
  taskOrbitErrorInfo,
} from "../../../../../services/taskOrbitReportService";

// ───────────── helpers (all text is rendered as plain text by React) ─────────────
const IST = "Asia/Kolkata";

const todayIst = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: IST }); // yyyy-MM-dd

const fmtTime = (iso) =>
  iso
    ? new Date(iso).toLocaleTimeString("en-IN", {
        timeZone: IST,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "—";

const fmtDateLabel = (yyyyMmDd) =>
  new Date(`${yyyyMmDd}T00:00:00+05:30`).toLocaleDateString("en-IN", {
    timeZone: IST,
    weekday: "short",
    day: "numeric",
    month: "short",
  });

const fmtDuration = (sec) => {
  const s = Math.max(0, Math.round(sec || 0));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
};

const FINAL = new Set(["DONE", "FAILED"]);

const STATUS_LABEL = {
  OPEN: "In progress",
  CLOSING: "Closing",
  FINALIZING: "Finishing recording",
  CLOSED: "Waiting for transcription",
  PROCESSING: "Transcribing",
  TRANSCRIBED: "Writing report",
  DONE: "Report ready",
  FAILED: "Failed",
};

const statusTone = (s) =>
  s === "DONE"
    ? "green"
    : s === "FAILED"
      ? "red"
      : s === "OPEN"
        ? "blue"
        : "amber";

function Badge({ tone = "purple", children }) {
  return <span className={`mr-badge mr-tone-${tone}`}>{children}</span>;
}

function BulletList({ title, items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div className="mr-block">
      <div className="mr-block-title">{title}</div>
      <ul>
        {items.map((x, i) => (
          <li key={i}>{typeof x === "string" ? x : JSON.stringify(x)}</li>
        ))}
      </ul>
    </div>
  );
}

// ───────────── person card ─────────────
function ParticipantCard({ p, onTranscript }) {
  const [open, setOpen] = useState(false);
  const r = p.report;
  const s = r?.summary;
  return (
    <div className="mr-person">
      <button
        type="button"
        className="mr-person-head"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        <div className="mr-person-main">
          <div className="mr-person-name">{p.displayName}</div>
          <div className="mr-person-meta">
            {p.email} · joined {fmtTime(p.firstJoinedAtUtc)} · left{" "}
            {fmtTime(p.lastLeftAtUtc)} · present {fmtDuration(p.presentSeconds)}
          </div>
        </div>
        {p.joinedNoSpeech ? (
          <Badge tone="gray">
            <MicOff size={11} /> Joined, no speech
          </Badge>
        ) : (
          <Badge tone="green">
            <Mic size={11} /> Spoke {fmtDuration(p.talkSeconds)}
          </Badge>
        )}
        {r?.status === "FAILED" && <Badge tone="red">Report failed</Badge>}
      </button>

      {open && (
        <div className="mr-person-body">
          {p.joinedNoSpeech && <p className="mr-muted">Joined, no speech.</p>}
          {r?.status === "FAILED" && (
            <p className="mr-error-text">
              Report failed{r.failureReason ? `: ${r.failureReason}` : ""}.
            </p>
          )}
          {r?.status === "PENDING" && (
            <p className="mr-muted">Report is being written…</p>
          )}
          {s && (
            <>
              {s.summary && <p className="mr-summary-text">{s.summary}</p>}
              <BulletList title="Worked on" items={s.worked_on} />
              <BulletList title="Tasks done" items={s.tasks_done} />
              <BulletList title="Tasks planned" items={s.tasks_planned} />
              <BulletList title="Blockers" items={s.blockers} />
              {Array.isArray(s.notable_points) &&
                s.notable_points.length > 0 && (
                  <div className="mr-block">
                    <div className="mr-block-title">Notable points</div>
                    <ul>
                      {s.notable_points.map((n, i) => (
                        <li key={i}>
                          <b>{n.time}</b> {n.point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </>
          )}
          {p.hasSpeech && (
            <button
              type="button"
              className="btn-ghost btn-sm"
              onClick={() => onTranscript(p)}
            >
              <FileText size={13} /> View full transcript
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ───────────── transcript modal ─────────────
function TranscriptModal({ sessionId, person, onClose }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(
    async (pg) => {
      setLoading(true);
      setError("");
      try {
        const res = await getTaskOrbitTranscript(sessionId, person.id, pg, 100);
        const seg = res.data.segments;
        setItems((cur) => (pg === 0 ? seg.items : [...cur, ...seg.items]));
        setPage(seg.page);
        setTotalPages(seg.totalPages);
      } catch (e) {
        setError(taskOrbitErrorInfo(e).message);
      } finally {
        setLoading(false);
      }
    },
    [sessionId, person.id],
  );

  useEffect(() => {
    load(0);
  }, [load]);

  return (
    <div className="mr-modal-scrim" onMouseDown={onClose}>
      <div className="mr-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="mr-modal-head">
          <h3>Transcript — {person.displayName}</h3>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mr-modal-body">
          {items.map((s) => (
            <div className="mr-seg" key={s.id}>
              <span className="mr-seg-time">{s.timeIst}</span>
              <span className="mr-seg-text">{s.text}</span>
            </div>
          ))}
          {!loading && !error && items.length === 0 && (
            <p className="mr-muted">No transcript text.</p>
          )}
          {error && <p className="mr-error-text">{error}</p>}
          {loading && <p className="mr-muted">Loading…</p>}
          {!loading && page + 1 < totalPages && (
            <button
              type="button"
              className="btn-ghost btn-sm"
              onClick={() => load(page + 1)}
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ───────────── main page ─────────────
export default function MeetingReports() {
  const showToast = useToast();

  const [date, setDate] = useState(todayIst());
  const [days, setDays] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);

  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [fatal, setFatal] = useState(""); // feature off / forbidden
  const [listError, setListError] = useState("");
  const [detailError, setDetailError] = useState("");
  const [transcriptFor, setTranscriptFor] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleFatal = useCallback((e) => {
    const info = taskOrbitErrorInfo(e);
    if (info.code === "TASKORBIT_DISABLED") {
      setFatal("Meeting reports are switched off right now.");
      return true;
    }
    if (info.status === 403) {
      setFatal("Only a Super Admin can view meeting reports.");
      return true;
    }
    return false;
  }, []);

  // days list (last 30 days)
  const loadDays = useCallback(async () => {
    try {
      const res = await getTaskOrbitDays({ size: 31 });
      setDays(res.data.items || []);
    } catch (e) {
      handleFatal(e);
    }
  }, [handleFatal]);

  // sessions of the chosen date
  const loadSessions = useCallback(async () => {
    setLoadingList(true);
    setListError("");
    try {
      const res = await getTaskOrbitSessions(date, 0, 50);
      setSessions(res.data.items || []);
    } catch (e) {
      if (!handleFatal(e)) setListError(taskOrbitErrorInfo(e).message);
      setSessions([]);
    } finally {
      setLoadingList(false);
    }
  }, [date, handleFatal]);

  const loadDetail = useCallback(
    async (id, silent = false) => {
      if (!silent) setLoadingDetail(true);
      setDetailError("");
      try {
        const res = await getTaskOrbitSession(id);
        setDetail(res.data);
      } catch (e) {
        if (!handleFatal(e)) setDetailError(taskOrbitErrorInfo(e).message);
      } finally {
        setLoadingDetail(false);
      }
    },
    [handleFatal],
  );

  useEffect(() => {
    loadDays();
  }, [loadDays]);

  useEffect(() => {
    setSelectedId(null);
    setDetail(null);
    loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    if (selectedId) loadDetail(selectedId);
  }, [selectedId, loadDetail]);

  // poll status while a session is not finished
  const pollRef = useRef(null);
  useEffect(() => {
    clearInterval(pollRef.current);
    if (!selectedId || !detail || FINAL.has(detail.status)) return undefined;
    pollRef.current = setInterval(async () => {
      try {
        const res = await getTaskOrbitSessionStatus(selectedId);
        if (res.data.finished || res.data.status !== detail.status) {
          loadDetail(selectedId, true);
          loadSessions();
        }
      } catch (_) {
        /* keep polling */
      }
    }, 8000);
    return () => clearInterval(pollRef.current);
  }, [selectedId, detail, loadDetail, loadSessions]);

  const doReprocess = async (mode, onlyFailed = false) => {
    if (!detail) return;
    const warn =
      mode === "full"
        ? "Transcribe the audio again and write new reports? This costs more and takes longer."
        : "Write the reports again from the stored transcript?";
    if (typeof window !== "undefined" && !window.confirm(warn)) return;
    setBusy(true);
    try {
      const res = await reprocessTaskOrbitSession(detail.id, mode, onlyFailed);
      showToast(res.data?.message || "Re-run started");
      await loadDetail(detail.id, true);
      loadSessions();
    } catch (e) {
      showToast(taskOrbitErrorInfo(e).message);
    } finally {
      setBusy(false);
    }
  };

  // ───────────── render ─────────────
  if (fatal) {
    return (
      <div className="ws-content">
        <PageHead
          title="Meeting Reports"
          subtitle="Task Orbit meeting summaries"
        />
        <div className="section-card">
          <p className="mr-muted" style={{ margin: 0 }}>
            {fatal}
          </p>
        </div>
      </div>
    );
  }

  const failedPersons = detail?.failedPersons || 0;

  return (
    <div className="ws-content">
      <style>{MR_CSS}</style>
      <PageHead
        title="Meeting Reports"
        subtitle="Who joined, what each person said, and an overall summary of Task Orbit meetings."
        actions={
          <button
            type="button"
            className="btn-ghost btn-sm"
            onClick={() => {
              loadDays();
              loadSessions();
            }}
          >
            <RefreshCw size={13} /> Refresh
          </button>
        }
      />

      <div className="mr-grid">
        {/* ── left: date + sessions ── */}
        <div className="section-card mr-left">
          <div className="section-card-head">
            <h2>Sessions</h2>
          </div>
          <input
            type="date"
            className="mr-date"
            value={date}
            max={todayIst()}
            onChange={(e) => e.target.value && setDate(e.target.value)}
          />
          {days.length > 0 && (
            <div className="mr-days">
              {days.slice(0, 10).map((d) => (
                <button
                  key={d.date}
                  type="button"
                  className={`mr-day ${d.date === date ? "is-active" : ""}`}
                  onClick={() => setDate(d.date)}
                >
                  {fmtDateLabel(d.date)}
                  <span>{d.sessionCount}</span>
                </button>
              ))}
            </div>
          )}

          {loadingList && <p className="mr-muted">Loading…</p>}
          {listError && <p className="mr-error-text">{listError}</p>}
          {!loadingList && !listError && sessions.length === 0 && (
            <div className="empty-state">
              <ClipboardList size={22} />
              <p>No recorded meetings on this day.</p>
            </div>
          )}

          {sessions.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`mr-session ${selectedId === s.id ? "is-active" : ""}`}
              onClick={() => setSelectedId(s.id)}
            >
              <div className="mr-session-top">
                <b>{s.label}</b>
                <Badge tone={statusTone(s.status)}>
                  {STATUS_LABEL[s.status] || s.status}
                </Badge>
              </div>
              <div className="mr-session-title">{s.roomTitle}</div>
              <div className="mr-session-meta">
                {fmtTime(s.startedAtUtc)} –{" "}
                {s.endedAtUtc ? fmtTime(s.endedAtUtc) : "ongoing"} ·{" "}
                <Users size={11} /> {s.participantCount} · <Mic size={11} />{" "}
                {s.speakerCount}
              </div>
            </button>
          ))}
        </div>

        {/* ── right: detail ── */}
        <div className="section-card mr-right">
          {!selectedId && (
            <div className="empty-state">
              <ClipboardList size={26} />
              <p>Select a session to see its summary.</p>
            </div>
          )}
          {selectedId && loadingDetail && !detail && (
            <p className="mr-muted">Loading…</p>
          )}
          {detailError && <p className="mr-error-text">{detailError}</p>}

          {detail && selectedId === detail.id && (
            <>
              <div className="section-card-head">
                <h2>
                  {detail.roomTitle} · {detail.label}
                </h2>
                <Badge tone={statusTone(detail.status)}>
                  {STATUS_LABEL[detail.status] || detail.status}
                </Badge>
              </div>
              <p className="mr-muted">
                {fmtDateLabel(date)}, {fmtTime(detail.startedAtUtc)} –{" "}
                {detail.endedAtUtc ? fmtTime(detail.endedAtUtc) : "ongoing"}{" "}
                (IST) · {detail.participantCount} joined · {detail.speakerCount}{" "}
                spoke · {detail.noSpeechCount} joined with no speech
              </p>

              {(detail.partialResult || failedPersons > 0) && (
                <div className="mr-warn">
                  <AlertTriangle size={14} />
                  <span>
                    {detail.partialResult &&
                      "Some audio could not be processed. "}
                    {failedPersons > 0 &&
                      `${failedPersons} person report(s) failed. `}
                    The summary may be incomplete.
                  </span>
                </div>
              )}
              {detail.status === "FAILED" && (
                <div className="mr-warn mr-warn-red">
                  <AlertTriangle size={14} />
                  <span>
                    Processing failed
                    {detail.processingError
                      ? `: ${detail.processingError}`
                      : "."}
                  </span>
                </div>
              )}
              {detail.skipped && (
                <p className="mr-muted">
                  Too few participants — this session was not transcribed.
                </p>
              )}
              {!FINAL.has(detail.status) && (
                <p className="mr-muted">
                  {STATUS_LABEL[detail.status] || detail.status}… this page
                  updates automatically.
                </p>
              )}

              {/* overall summary */}
              {detail.summary && (
                <div className="mr-overall">
                  <h3>Overall summary</h3>
                  {detail.summary.overview && (
                    <p className="mr-summary-text">{detail.summary.overview}</p>
                  )}
                  {Array.isArray(detail.summary.key_updates) &&
                    detail.summary.key_updates.length > 0 && (
                      <div className="mr-block">
                        <div className="mr-block-title">Key updates</div>
                        <ul>
                          {detail.summary.key_updates.map((k, i) => (
                            <li key={i}>
                              <b>{k.person}:</b> {k.update}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  <BulletList
                    title="Common blockers"
                    items={detail.summary.common_blockers}
                  />
                  {Array.isArray(detail.summary.action_items) &&
                    detail.summary.action_items.length > 0 && (
                      <div className="mr-block">
                        <div className="mr-block-title">Action items</div>
                        <ul>
                          {detail.summary.action_items.map((a, i) => (
                            <li key={i}>
                              <b>{a.owner}:</b> {a.item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  <BulletList
                    title="Decisions"
                    items={detail.summary.decisions}
                  />
                </div>
              )}

              {/* people */}
              <h3 className="mr-h3">
                People ({detail.participants?.length || 0})
              </h3>
              {(detail.participants || []).map((p) => (
                <ParticipantCard
                  key={p.id}
                  p={p}
                  onTranscript={setTranscriptFor}
                />
              ))}

              {/* actions */}
              {(detail.status === "DONE" || detail.status === "FAILED") && (
                <div className="mr-actions">
                  {failedPersons > 0 && (
                    <button
                      type="button"
                      className="btn-ghost btn-sm"
                      disabled={busy}
                      onClick={() => doReprocess("reports", true)}
                    >
                      Retry failed reports
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-ghost btn-sm"
                    disabled={busy}
                    onClick={() => doReprocess("reports", false)}
                  >
                    Rewrite reports
                  </button>
                  <button
                    type="button"
                    className="btn-ghost btn-sm"
                    disabled={busy}
                    onClick={() => doReprocess("full", false)}
                  >
                    Transcribe again
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {transcriptFor && detail && (
        <TranscriptModal
          sessionId={detail.id}
          person={transcriptFor}
          onClose={() => setTranscriptFor(null)}
        />
      )}
    </div>
  );
}

// Scoped styles (mr- prefix) so workspace-styles.css stays untouched.
const MR_CSS = `
.mr-grid{display:grid;grid-template-columns:320px minmax(0,1fr);gap:16px;align-items:start}
@media(max-width:900px){.mr-grid{grid-template-columns:1fr}}
.mr-muted{color:var(--muted);font-size:12.5px;margin:6px 0}
.mr-error-text{color:var(--tone-red-solid);font-size:12.5px;margin:6px 0}
.mr-date{width:100%;box-sizing:border-box;border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:10px;padding:9px 10px;font-size:13px;margin-bottom:8px}
.mr-days{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.mr-day{border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:999px;padding:4px 10px;font-size:11.5px;cursor:pointer;display:inline-flex;gap:6px;align-items:center}
.mr-day span{background:var(--tone-purple-soft);color:var(--brand);border-radius:999px;padding:0 6px;font-weight:700}
.mr-day.is-active{border-color:var(--brand);color:var(--brand);font-weight:700}
.mr-session{display:block;width:100%;text-align:left;border:1px solid var(--border);background:var(--card);color:var(--text);border-radius:12px;padding:10px 12px;margin-top:8px;cursor:pointer}
.mr-session.is-active{border-color:var(--brand);box-shadow:0 0 0 2px var(--tone-purple-soft)}
.mr-session-top{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:13px}
.mr-session-title{font-size:12.5px;margin-top:4px;font-weight:600}
.mr-session-meta{font-size:11px;color:var(--muted);margin-top:3px;display:flex;gap:4px;align-items:center;flex-wrap:wrap}
.mr-badge{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:800;padding:3px 8px;border-radius:999px;white-space:nowrap}
.mr-tone-green{background:var(--tone-green-soft);color:var(--tone-green-solid)}
.mr-tone-red{background:var(--tone-red-soft);color:var(--tone-red-solid)}
.mr-tone-amber{background:var(--tone-amber-soft);color:#b45309}
.mr-tone-blue{background:var(--tone-blue-soft);color:var(--tone-blue-solid)}
.mr-tone-purple{background:var(--tone-purple-soft);color:var(--brand)}
.mr-tone-gray{background:var(--border);color:var(--muted)}
.mr-warn{display:flex;gap:8px;align-items:flex-start;background:var(--tone-amber-soft);color:#92400e;border-radius:10px;padding:8px 10px;font-size:12.5px;margin:8px 0}
.mr-warn-red{background:var(--tone-red-soft);color:var(--tone-red-solid)}
.mr-overall{border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin:12px 0}
.mr-overall h3,.mr-h3{font-size:14px;font-weight:800;margin:0 0 6px}
.mr-h3{margin-top:14px}
.mr-summary-text{font-size:13px;line-height:1.55;margin:4px 0 8px;white-space:pre-wrap}
.mr-block{margin:8px 0}
.mr-block-title{font-size:11px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin-bottom:3px}
.mr-block ul{margin:0;padding-left:18px;font-size:13px;line-height:1.5}
.mr-person{border:1px solid var(--border);border-radius:12px;margin-top:8px;overflow:hidden}
.mr-person-head{display:flex;align-items:center;gap:10px;width:100%;background:transparent;border:0;color:var(--text);padding:10px 12px;cursor:pointer;text-align:left}
.mr-person-main{flex:1;min-width:0}
.mr-person-name{font-size:13.5px;font-weight:700}
.mr-person-meta{font-size:11px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.mr-person-body{padding:4px 14px 12px 36px;border-top:1px solid var(--border)}
.mr-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.mr-modal-scrim{position:fixed;inset:0;background:rgba(15,23,42,.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px}
.mr-modal{background:var(--card);color:var(--text);border-radius:14px;width:min(720px,100%);max-height:80vh;display:flex;flex-direction:column;box-shadow:var(--shadow-dropdown)}
.mr-modal-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid var(--border)}
.mr-modal-head h3{margin:0;font-size:15px}
.mr-modal-body{padding:12px 16px;overflow:auto}
.mr-seg{display:flex;gap:10px;padding:5px 0;font-size:13px;line-height:1.5}
.mr-seg-time{color:var(--brand);font-weight:700;min-width:64px;flex-shrink:0}
.mr-seg-text{white-space:pre-wrap}
`;
