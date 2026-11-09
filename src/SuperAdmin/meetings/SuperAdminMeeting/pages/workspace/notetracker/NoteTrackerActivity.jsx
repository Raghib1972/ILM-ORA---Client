"use client";

import React, { useState } from "react";
import { History, RefreshCw, X } from "lucide-react";
import {
  T,
  Button,
  Panel,
  useAutoDarkMode,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LETTER_SPACING,
} from "@/design-system";
import { getNoteTrackerActivity } from "../../../../../../services/noteTrackerService";
import {
  ACTION_KEYS,
  MODE_LABELS,
  NT_GAP,
  actionLabel,
  fmtDateTimeIst,
  shortId,
  sessionLabel,
  todayIst,
} from "./ntUtils";
import useNtPagedList from "./useNtPagedList";
import NtPage from "./NtPage";
import NtApiError from "./NtApiError";
import NtStatusBadge from "./NtStatusBadge";
import { NtSkeletonRows } from "./NtSkeleton";
import {
  NtBanner,
  NtEmptyState,
  NtField,
  NtPager,
  NtSelect,
  NtSessionField,
  NtTextInput,
} from "./ntForms";

const ACTION_OPTIONS = [
  { value: "", label: "All actions" },
  ...ACTION_KEYS.map((k) => ({ value: k, label: actionLabel(k) })),
];

export default function NoteTrackerActivity() {
  const isDark = useAutoDarkMode();
  const mode = isDark ? "dark" : "light";
  const t = T[mode];

  const [fatal, setFatal] = useState(null);
  const [action, setAction] = useState("");
  const [filterSession, setFilterSession] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const rangeError = from && to && from > to ? "The start date must not be after the end date." : "";

  const list = useNtPagedList(
    getNoteTrackerActivity,
    { action, sessionId: filterSession?.sessionId, from, to },
    { onFatal: setFatal, enabled: !rangeError },
  );

  const hasFilters = !!(action || filterSession || from || to);
  const clearFilters = () => {
    setAction("");
    setFilterSession(null);
    setFrom("");
    setTo("");
  };

  const th = {
    textAlign: "left",
    padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.caption,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: LETTER_SPACING.eyebrow,
    textTransform: "uppercase",
    color: t.textLabel,
    borderBottom: `1px solid ${t.border}`,
    whiteSpace: "nowrap",
  };
  const td = {
    padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.bodySmall,
    color: t.text,
    borderBottom: `1px solid ${t.border}`,
    verticalAlign: "top",
    overflowWrap: "anywhere",
  };

  const showTable = !rangeError && !list.loading && !list.error && list.items.length > 0;

  return (
    <NtPage
      title="Activity"
      subtitle="A read-only log of what happened in Note Tracker and when."
      fatal={fatal}
      mode={mode}
    >
      <NtBanner tone="info" mode={mode}>
        This log never contains your questions, answers or note text. It only records which
        action happened, when, and whether it worked.
      </NtBanner>

      <Panel
        mode={mode}
        title="Activity log"
        action={
          <Button
            variant="ghost"
            size="sm"
            mode={mode}
            icon={RefreshCw}
            disabled={!!rangeError}
            onClick={list.reload}
            aria-label="Refresh activity"
          >
            Refresh
          </Button>
        }
      >
        <div className="nt-toolbar" style={{ marginBottom: NT_GAP.md }}>
          <NtField id="nt-act-action" label="Action" mode={mode} style={{ minWidth: 220 }}>
            <NtSelect
              mode={mode}
              value={action}
              options={ACTION_OPTIONS}
              onChange={(e) => setAction(e.target.value)}
            />
          </NtField>
          <NtField id="nt-act-meeting" label="Meeting" mode={mode} style={{ minWidth: 220 }}>
            <NtSessionField mode={mode} value={filterSession} onChange={setFilterSession} onFatal={setFatal} />
          </NtField>
          <NtField id="nt-act-from" label="From" mode={mode} style={{ minWidth: 150 }}>
            <NtTextInput
              mode={mode}
              type="date"
              value={from}
              max={to || todayIst()}
              onChange={(e) => setFrom(e.target.value)}
            />
          </NtField>
          <NtField id="nt-act-to" label="To" mode={mode} style={{ minWidth: 150 }}>
            <NtTextInput
              mode={mode}
              type="date"
              value={to}
              min={from || undefined}
              max={todayIst()}
              onChange={(e) => setTo(e.target.value)}
            />
          </NtField>
          {hasFilters && (
            <Button variant="ghost" size="sm" mode={mode} icon={X} onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {rangeError && (
          <NtBanner tone="warning" mode={mode}>
            {rangeError}
          </NtBanner>
        )}

        {!rangeError && list.loading && <NtSkeletonRows count={5} height={44} mode={mode} />}

        {!rangeError && !list.loading && list.error && (
          <NtApiError error={list.error} mode={mode} onRetry={list.reload} />
        )}

        {!rangeError && !list.loading && !list.error && list.items.length === 0 && (
          <NtEmptyState
            mode={mode}
            icon={History}
            title={hasFilters ? "No activity for these filters" : "No activity yet"}
            text={
              hasFilters
                ? "Try a different action, meeting or date range."
                : "Your actions in Note Tracker will appear here."
            }
          />
        )}

        {showTable && (
          <>
            <div className="nt-table-wrap">
              <table className="nt-table" aria-label="Activity log">
                <thead>
                  <tr>
                    <th scope="col" style={th}>Time (IST)</th>
                    <th scope="col" style={th}>Action</th>
                    <th scope="col" style={th}>Meeting</th>
                    <th scope="col" style={th}>Mode</th>
                    <th scope="col" style={th}>Status</th>
                    <th scope="col" style={th}>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {list.items.map((a) => (
                    <tr key={a.id}>
                      <td style={{ ...td, whiteSpace: "nowrap" }}>{fmtDateTimeIst(a.createdAt)}</td>
                      <td style={td}>{actionLabel(a.action)}</td>
                      <td style={td}>
                        {a.sessionId
                          ? filterSession && filterSession.sessionId === a.sessionId
                            ? sessionLabel(filterSession)
                            : shortId(a.sessionId)
                          : "—"}
                      </td>
                      <td style={td}>{a.mode ? MODE_LABELS[a.mode] || a.mode : "—"}</td>
                      <td style={td}>
                        <NtStatusBadge kind="activity" value={a.status} />
                      </td>
                      <td style={{ ...td, color: t.textSub }}>{a.detail || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      </Panel>
    </NtPage>
  );
}
