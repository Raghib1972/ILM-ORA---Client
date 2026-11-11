"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  RefreshCw,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  getTaskOrbitDayComparison,
  taskOrbitErrorInfo,
} from "../../../../../services/taskOrbitReportService";

// Plan check of one day: the morning / sales plan of each person against what was said in the evening.
// It only SHOWS what the e-mail feature already saved. It makes no model call and sends no e-mail.
// It uses the mr-badge / mr-tone-* / mr-person / mr-overall classes that MeetingReports.jsx already defines.

// PURE-LOGIC-START
const STATUS_TEXT = {
  COMPLETED: "Completed",
  PARTLY_COMPLETED: "Partly completed",
  NOT_COMPLETED: "Not completed",
  COULD_NOT_CHECK: "Could not check",
};

const STATUS_TONE = {
  COMPLETED: "green",
  PARTLY_COMPLETED: "amber",
  NOT_COMPLETED: "red",
  COULD_NOT_CHECK: "gray",
};

const SOURCE_TEXT = { MORNING: "Morning plan", SALES: "Sales plan" };

const statusText = (s) => STATUS_TEXT[s] || "Could not check";
const statusTone = (s) => STATUS_TONE[s] || "gray";
const sourceText = (s) => SOURCE_TEXT[s] || "";

// Number of items per status. Unknown statuses are counted as "could not check".
const countStatuses = (items) => {
  const c = {
    COMPLETED: 0,
    PARTLY_COMPLETED: 0,
    NOT_COMPLETED: 0,
    COULD_NOT_CHECK: 0,
  };
  (Array.isArray(items) ? items : []).forEach((it) => {
    const k = Object.prototype.hasOwnProperty.call(c, it?.status)
      ? it.status
      : "COULD_NOT_CHECK";
    c[k] += 1;
  });
  return c;
};

// One short line for a person's header, for example "2 completed · 1 not completed".
const countsLine = (items) => {
  const c = countStatuses(items);
  const parts = [];
  if (c.COMPLETED) parts.push(`${c.COMPLETED} completed`);
  if (c.PARTLY_COMPLETED) parts.push(`${c.PARTLY_COMPLETED} partly completed`);
  if (c.NOT_COMPLETED) parts.push(`${c.NOT_COMPLETED} not completed`);
  if (c.COULD_NOT_CHECK) parts.push(`${c.COULD_NOT_CHECK} could not check`);
  return parts.join(" · ");
};

// Text for a person who has no checked items (state is not CHECKED).
const stateNote = (state) => {
  if (state === "NO_PLAN") return "No morning plan found for this person.";
  if (state === "NOT_CAPTURED")
    return "The evening update was not captured, so the plan could not be checked.";
  if (state === "CHECK_FAILED") return "The plan check could not be completed.";
  return "";
};
// PURE-LOGIC-END

function Pill({ tone, children }) {
  return <span className={`mr-badge mr-tone-${tone}`}>{children}</span>;
}

function PersonRow({ p }) {
  const [open, setOpen] = useState(false);
  const items = Array.isArray(p.items) ? p.items : [];
  const extra = Array.isArray(p.extraWork) ? p.extraWork : [];
  const note = p.state === "CHECKED" ? "" : stateNote(p.state);
  const line = p.state === "CHECKED" ? countsLine(items) : note;
  return (
    <div className="mr-person">
      <button
        type="button"
        className="mr-person-head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        <div className="mr-person-main">
          <div className="mr-person-name">{p.name || p.personKey}</div>
          {line && <div className="pc-line">{line}</div>}
        </div>
      </button>
      {open && (
        <div className="mr-person-body">
          {note && <p className="mr-muted">{note}</p>}
          {items.map((it, i) => (
            <div className="pc-item" key={i}>
              <Pill tone={statusTone(it.status)}>{statusText(it.status)}</Pill>
              <div className="pc-item-main">
                <div>{it.text}</div>
                {(sourceText(it.source) || it.reason) && (
                  <div className="pc-item-meta">
                    {[sourceText(it.source), it.reason]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                )}
              </div>
            </div>
          ))}
          {extra.length > 0 && (
            <div className="mr-block">
              <div className="mr-block-title">Extra work (not in the plan)</div>
              <ul>
                {extra.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PlanCheckPanel({ date }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notReady, setNotReady] = useState(false);
  const reqRef = useRef(0);

  const load = useCallback(async () => {
    const id = ++reqRef.current;
    setLoading(true);
    setError("");
    setNotReady(false);
    try {
      const res = await getTaskOrbitDayComparison(date);
      if (reqRef.current !== id) return;
      setData(res.data || null);
    } catch (e) {
      if (reqRef.current !== id) return;
      setData(null);
      const info = taskOrbitErrorInfo(e);
      // 404 without the TASKORBIT_DISABLED code = the server does not have this endpoint yet
      if (info.status === 404 && info.code !== "TASKORBIT_DISABLED") {
        setNotReady(true);
      } else {
        setError(info.message);
      }
    } finally {
      if (reqRef.current === id) setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    setData(null);
    load();
    return () => {
      reqRef.current += 1; // ignore an answer that comes after the day changed
    };
  }, [load]);

  const team = data?.available ? data.team : null;
  const people = data?.available && Array.isArray(data.people) ? data.people : [];

  return (
    <div className="mr-overall">
      <style>{PC_CSS}</style>
      <div className="mr-overall-head">
        <h3>Plan check</h3>
        <button
          type="button"
          className="mr-pill"
          disabled={loading}
          aria-busy={loading}
          onClick={load}
        >
          <RefreshCw size={12} /> {loading ? "Loading…" : "Refresh"}
        </button>
      </div>
      <p className="mr-muted" style={{ marginTop: 0 }}>
        Morning and sales plans of this day compared with the evening meeting.
      </p>

      {loading && !data && <p className="mr-muted">Loading…</p>}
      {error && <p className="mr-error-text">{error}</p>}
      {notReady && (
        <p className="mr-muted">Plan check is not available on the server yet.</p>
      )}
      {data && !data.available && (
        <div className="empty-state">
          <ClipboardList size={20} />
          <p>
            No plan check for this day yet. It is made about 30 minutes after
            the last evening meeting, for the rooms that send e-mails.
          </p>
        </div>
      )}

      {team && (
        <>
          <div className="pc-counts">
            <Pill tone="green">Completed {team.completed}</Pill>
            <Pill tone="amber">Partly completed {team.partlyCompleted}</Pill>
            <Pill tone="red">Not completed {team.notCompleted}</Pill>
            <Pill tone="gray">Could not check {team.couldNotCheck}</Pill>
            {team.noPlan > 0 && (
              <Pill tone="gray">No plan: {team.noPlan} people</Pill>
            )}
          </div>
          {team.summary && <p className="mr-summary-text">{team.summary}</p>}
        </>
      )}

      {people.length > 0 && (
        <div className="mr-block">
          <div className="mr-block-title">People ({people.length})</div>
          {people.map((p) => (
            <PersonRow key={p.personKey} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}

// Scoped styles (pc- prefix). Colors come from the same variables as the rest of the page.
const PC_CSS = `
.pc-counts{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 8px}
.pc-line{font-size:11px;color:var(--muted);margin-top:2px}
.pc-item{display:flex;gap:8px;align-items:flex-start;padding:6px 0;font-size:13px;line-height:1.5;border-bottom:1px solid var(--border)}
.pc-item:last-of-type{border-bottom:0}
.pc-item .mr-badge{flex-shrink:0;margin-top:2px}
.pc-item-main{flex:1;min-width:0;overflow-wrap:anywhere}
.pc-item-meta{font-size:11px;color:var(--muted);margin-top:1px}
`;
