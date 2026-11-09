"use client";

import React, { useEffect, useRef, useState } from "react";
import { BookOpen, Copy, CheckCircle2, HelpCircle, StickyNote } from "lucide-react";
import {
  T,
  Button,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  LINE_HEIGHT,
  RADIUS,
  CLAUDE_ACCENT,
} from "@/design-system";
import NtAnswerText from "./NtAnswerText";
import NtCitationChips from "./NtCitationChips";
import NtCoverageNotice from "./NtCoverageNotice";
import { MODE_LABELS, NT_GAP, NT_LIMITS, ON_ACCENT, inputStyle } from "./ntUtils";

/**
 * One chat message.
 * msg: { id, role: "user"|"assistant", content, mode, found, citations, coverage, remainingToday }
 * onNotify(text): optional, used for the "Copied" toast.
 * onSaveNote(msg, title): optional; returns a Promise<boolean> (true = saved). Shows "Save as note".
 * savedNoteId: id of the note this message was saved as (disables the button, shows "Open in Notes").
 * saving: a save request for this message is running.
 * onOpenNote(noteId): optional; shows "Open in Notes" after saving.
 */
export default function NtMessage({
  msg,
  mode,
  onNotify,
  onSaveNote,
  savedNoteId,
  saving = false,
  onOpenNote,
}) {
  const t = T[mode] || T.light;
  const [copied, setCopied] = useState(false);
  const [titleOpen, setTitleOpen] = useState(false);
  const [title, setTitle] = useState("");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const isUser = msg?.role === "user";
  const modeLabel =
    msg?.mode && msg.mode !== "ASK" ? MODE_LABELS[msg.mode] || msg.mode : "";

  if (isUser) {
    const text = (msg.content || "").trim();
    return (
      <div
        style={{
          alignSelf: "flex-end",
          maxWidth: "85%",
          padding: `${NT_GAP.sm}px ${NT_GAP.md}px`,
          borderRadius: RADIUS.messageBubble,
          background: CLAUDE_ACCENT,
          color: ON_ACCENT,
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZE.body,
          lineHeight: LINE_HEIGHT.body,
          overflowWrap: "anywhere",
          whiteSpace: "pre-wrap",
        }}
      >
        {modeLabel && (
          <div style={{ fontWeight: FONT_WEIGHT.semibold }}>{modeLabel}</div>
        )}
        {text}
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      if (!navigator?.clipboard?.writeText) throw new Error("unsupported");
      await navigator.clipboard.writeText(msg.content || "");
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
      onNotify?.("Copied to clipboard");
    } catch (_) {
      onNotify?.("Could not copy. Please select the text and copy it.");
    }
  };

  const left = msg.remainingToday;
  const showLeft = left !== null && left !== undefined && left !== "";

  // answers that only exist locally (no server id yet) can not be saved
  const canSave = !!onSaveNote && !!msg.id && !String(msg.id).startsWith("local-");
  const isSaved = savedNoteId !== undefined && savedNoteId !== null && savedNoteId !== false;
  const canOpenSaved = !!onOpenNote && isSaved && savedNoteId !== true;

  const submitSave = async () => {
    if (saving) return;
    const ok = await onSaveNote(msg, title.trim());
    if (ok) {
      setTitleOpen(false);
      setTitle("");
    }
  };

  return (
    <div
      style={{
        alignSelf: "stretch",
        padding: NT_GAP.md,
        borderRadius: RADIUS.messageBubble,
        background: t.recentItemBg,
        border: `1px solid ${t.recentItemBorder}`,
        fontFamily: FONT_FAMILY,
      }}
    >
      {modeLabel && (
        <div
          style={{
            marginBottom: NT_GAP.xs,
            fontSize: FONT_SIZE.caption,
            fontWeight: FONT_WEIGHT.semibold,
            color: t.textLabel,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {modeLabel}
        </div>
      )}

      {msg.found === false && (
        <div
          role="note"
          style={{
            display: "flex",
            alignItems: "center",
            gap: NT_GAP.sm,
            marginBottom: msg.content ? NT_GAP.sm : 0,
            padding: `${NT_GAP.xs + 2}px ${NT_GAP.md}px`,
            borderRadius: RADIUS.input,
            background: t.pillBg,
            border: `1px solid ${t.pillBorder}`,
            color: t.pillText,
            fontSize: FONT_SIZE.bodySmall,
          }}
        >
          <HelpCircle size={14} aria-hidden="true" />
          Not discussed in this meeting
        </div>
      )}

      <NtAnswerText text={msg.content} mode={mode} />
      <NtCitationChips citations={msg.citations} mode={mode} />
      <NtCoverageNotice coverage={msg.coverage} mode={mode} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: NT_GAP.sm,
          marginTop: NT_GAP.sm,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: NT_GAP.xs }}>
          <Button
            variant="ghost"
            size="sm"
            mode={mode}
            icon={copied ? CheckCircle2 : Copy}
            onClick={handleCopy}
            aria-label="Copy answer"
          >
            {copied ? "Copied" : "Copy"}
          </Button>
          {canSave && !isSaved && (
            <Button
              variant="ghost"
              size="sm"
              mode={mode}
              icon={StickyNote}
              disabled={saving}
              aria-expanded={titleOpen}
              onClick={() => setTitleOpen((v) => !v)}
              aria-label="Save answer as note"
            >
              Save as note
            </Button>
          )}
          {canSave && isSaved && (
            <>
              <Button
                variant="ghost"
                size="sm"
                mode={mode}
                icon={CheckCircle2}
                disabled
                aria-label="This answer is saved as a note"
              >
                Saved as note
              </Button>
              {canOpenSaved && (
                <Button
                  variant="secondary"
                  size="sm"
                  mode={mode}
                  icon={BookOpen}
                  onClick={() => onOpenNote(savedNoteId)}
                >
                  Open in Notes
                </Button>
              )}
            </>
          )}
        </div>
        {showLeft && (
          <span style={{ fontSize: FONT_SIZE.caption, color: t.textMuted }}>
            {`${left} ${Number(left) === 1 ? "question" : "questions"} left today`}
          </span>
        )}
      </div>

      {canSave && !isSaved && titleOpen && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: NT_GAP.sm,
            marginTop: NT_GAP.sm,
          }}
        >
          <input
            type="text"
            value={title}
            maxLength={NT_LIMITS.noteTitle}
            disabled={saving}
            data-autofocus
            aria-label="Note title (optional)"
            placeholder="Note title (optional)"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submitSave();
              } else if (e.key === "Escape") {
                setTitleOpen(false);
              }
            }}
            style={{ ...inputStyle(t, mode), flex: 1, minWidth: 180, width: "auto" }}
          />
          <Button variant="primary" size="sm" mode={mode} disabled={saving} onClick={submitSave}>
            {saving ? "Saving…" : "Save"}
          </Button>
          <Button variant="secondary" size="sm" mode={mode} disabled={saving} onClick={() => setTitleOpen(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
