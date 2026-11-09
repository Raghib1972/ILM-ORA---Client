"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ClipboardList,
  MessageCircle,
  Mic,
  MicOff,
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
import PageHead from "../../../components/PageHead";
import {
  getNoteTrackerSession,
  noteTrackerErrorInfo,
} from "../../../../../../services/noteTrackerService";
import {
  NT_GAP,
  fmtDateLabel,
  fmtDuration,
  isFatalError,
  reportBadge,
} from "./ntUtils";
import { NT_CSS } from "./ntStyles";
import NtSessionPicker from "./NtSessionPicker";
import NtSummaryView from "./NtSummaryView";
import NtErrorNotice from "./NtErrorNotice";
import { NtSkeletonRows } from "./NtSkeleton";

// ───────────── one person ─────────────
function PersonCard({ p, mode }) {
  const t = T[mode] || T.light;
  const [open, setOpen] = useState(false);
  const rb = reportBadge(p.reportStatus);
  const failed = String(p.reportStatus || "").toUpperCase() === "FAILED";
  const pending = rb && rb.tone === "warning";
  const muted = {
    margin: `${NT_GAP.xs}px 0`,
    color: t.textSub,
    fontSize: FONT_SIZE.bodySmall,
  };

  return (
    <div
      style={{
        border: `1px solid ${t.border}`,
        borderRadius: RADIUS.messageBubble,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: NT_GAP.sm,
          width: "100%",
          padding: NT_GAP.md,
          textAlign: "left",
          cursor: "pointer",
          background: "transparent",
          border: 0,
          color: t.text,
          fontFamily: FONT_FAMILY,
        }}
      >
        {open ? (
          <ChevronDown size={15} aria-hidden="true" />
        ) : (
          <ChevronRight size={15} aria-hidden="true" />
        )}
        <span style={{ flex: 1, minWidth: 160 }}>
          <span
            style={{
              display: "block",
              fontSize: FONT_SIZE.cardLabel,
              fontWeight: FONT_WEIGHT.semibold,
              overflowWrap: "anywhere",
            }}
          >
            {p.name || p.email || "Unknown"}
          </span>
          <span
            style={{
              display: "block",
              marginTop: 2,
              fontSize: FONT_SIZE.caption,
              color: t.textSub,
              overflowWrap: "anywhere",
            }}
          >
            {p.email ? `${p.email} · ` : ""}
            {`joined ${p.joinedAtIst || "—"} · left ${p.leftAtIst || "—"} · present ${fmtDuration(p.presentSeconds)}`}
          </span>
        </span>
        {p.joinedNoSpeech ? (
          <Badge tone="neutral">
            <MicOff size={11} aria-hidden="true" /> Joined, no speech
          </Badge>
        ) : (
          p.talkSeconds !== null &&
          p.talkSeconds !== undefined && (
            <Badge tone="success">
              <Mic size={11} aria-hidden="true" /> Spoke {fmtDuration(p.talkSeconds)}
            </Badge>
          )
        )}
        {failed && <Badge tone="danger">Report failed</Badge>}
      </button>

      {open && (
        <div
          style={{
            padding: `${NT_GAP.xs}px ${NT_GAP.md}px ${NT_GAP.md}px`,
            borderTop: `1px solid ${t.border}`,
          }}
        >
          {p.joinedNoSpeech && <p style={muted}>Joined, no speech.</p>}
          {failed && (
            <p style={{ ...muted, color: t.overdueText }}>
              The report for this person failed.
            </p>
          )}
          {pending && <p style={muted}>The report is being written…</p>}
          {p.summary ? (
            <NtSummaryView summary={p.summary} kind="person" mode={mode} />
          ) : (
            !p.joinedNoSpeech &&
            !failed &&
            !pending && <p style={muted}>No summary available.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ───────────── page ─────────────
export default function NoteTrackerMeetings({ onAskAboutMeeting }) {
  const isDark = useAutoDarkMode();
  const mode = isDark ? "dark" : "light";
  const t = T[mode];

  const [selected, setSelected] = useState(null); // { id, date }
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fatal, setFatal] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!selected) return undefined;
    let off = false;
    setLoading(true);
    setError(null);
    setDetail(null);
    getNoteTrackerSession(selected.id)
      .then((res) => {
        if (!off) setDetail(res.data || null);
      })
      .catch((e) => {
        if (off) return;
        const info = noteTrackerErrorInfo(e);
        if (isFatalError(info)) setFatal(info);
        else setError(info);
      })
      .finally(() => {
        if (!off) setLoading(false);
      });
    return () => {
      off = true;
    };
  }, [selected, tick]);

  const head = (
    <PageHead
      eyebrow="Note Tracker"
      title="Meetings"
      subtitle="Who joined, what each person said, and an overall summary of recorded Task Orbit meetings."
    />
  );

  if (fatal) {
    return (
      <div className="ws-content">
        <style>{NT_CSS}</style>
        {head}
        <NtErrorNotice error={fatal} mode={mode} />
      </div>
    );
  }

  const overallBadge =
    detail && detail.overallReportStatus
      ? reportBadge(detail.overallReportStatus)
      : null;
  const people = Array.isArray(detail?.people) ? detail.people : [];

  return (
    <div className="ws-content">
      <style>{NT_CSS}</style>
      {head}

      <div className="nt-two-col">
        <NtSessionPicker
          mode={mode}
          selectedId={selected?.id || null}
          onSelect={(s, date) => setSelected({ id: s.sessionId, date })}
          onFatal={setFatal}
        />

        <div className="nt-stack">
          <Panel mode={mode}>
            {!selected && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: NT_GAP.sm,
                  padding: `${NT_GAP.md * 3}px ${NT_GAP.md}px`,
                  textAlign: "center",
                  color: t.textSub,
                  fontFamily: FONT_FAMILY,
                  fontSize: FONT_SIZE.body,
                }}
              >
                <ClipboardList size={26} color={t.emptyIcon} aria-hidden="true" />
                Select a meeting to see its summary.
              </div>
            )}

            {selected && loading && <NtSkeletonRows count={4} height={64} mode={mode} />}

            {selected && !loading && error && (
              <NtErrorNotice
                error={error}
                mode={mode}
                onRetry={() => setTick((n) => n + 1)}
              />
            )}

            {selected && !loading && !error && detail && (
              <div style={{ fontFamily: FONT_FAMILY, color: t.text }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: FONT_SIZE.sectionTitle,
                    fontWeight: FONT_WEIGHT.semibold,
                    overflowWrap: "anywhere",
                  }}
                >
                  {`${detail.title || "Untitled meeting"}${detail.label ? ` · ${detail.label}` : ""}`}
                </h2>
                <p
                  style={{
                    margin: `${NT_GAP.xs}px 0 0`,
                    fontSize: FONT_SIZE.bodySmall,
                    lineHeight: LINE_HEIGHT.body,
                    color: t.textSub,
                  }}
                >
                  {selected.date ? `${fmtDateLabel(selected.date)}, ` : ""}
                  {`${detail.startedAtIst || "—"} – ${detail.endedAtIst || "ongoing"} (IST) · ${detail.participantCount ?? 0} joined · ${detail.speakerCount ?? 0} spoke · ${detail.noSpeechCount ?? 0} joined with no speech`}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: NT_GAP.sm,
                    marginTop: NT_GAP.md,
                  }}
                >
                  {onAskAboutMeeting && (
                    <Button
                      variant="primary"
                      mode={mode}
                      icon={MessageCircle}
                      onClick={() =>
                        onAskAboutMeeting({
                          sessionId: detail.sessionId,
                          title: detail.title,
                          label: detail.label,
                          startedAtIst: detail.startedAtIst,
                          date: selected.date,
                        })
                      }
                    >
                      Ask about this meeting
                    </Button>
                  )}
                  {overallBadge && overallBadge.tone !== "success" && (
                    <Badge tone={overallBadge.tone}>
                      Overall summary: {overallBadge.label}
                    </Badge>
                  )}
                </div>

                <div
                  style={{
                    marginTop: NT_GAP.md,
                    padding: NT_GAP.md,
                    border: `1px solid ${t.border}`,
                    borderRadius: RADIUS.messageBubble,
                  }}
                >
                  <h3
                    style={{
                      margin: `0 0 ${NT_GAP.sm}px`,
                      fontSize: FONT_SIZE.body,
                      fontWeight: FONT_WEIGHT.semibold,
                    }}
                  >
                    Overall summary
                  </h3>
                  {detail.overallSummary ? (
                    <NtSummaryView
                      summary={detail.overallSummary}
                      kind="overall"
                      mode={mode}
                    />
                  ) : (
                    <p
                      style={{
                        margin: 0,
                        color: t.textSub,
                        fontSize: FONT_SIZE.bodySmall,
                      }}
                    >
                      There is no overall summary for this meeting yet.
                    </p>
                  )}
                </div>

                <h3
                  style={{
                    margin: `${NT_GAP.md + NT_GAP.sm}px 0 ${NT_GAP.sm}px`,
                    fontSize: FONT_SIZE.body,
                    fontWeight: FONT_WEIGHT.semibold,
                  }}
                >
                  {`People (${people.length})`}
                </h3>
                {people.length === 0 ? (
                  <p
                    style={{
                      margin: 0,
                      color: t.textSub,
                      fontSize: FONT_SIZE.bodySmall,
                    }}
                  >
                    No people were recorded for this meeting.
                  </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: NT_GAP.sm,
                    }}
                  >
                    {people.map((p, i) => (
                      <PersonCard
                        key={`${detail.sessionId}-${p.email || p.name || "p"}-${i}`}
                        p={p}
                        mode={mode}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}
