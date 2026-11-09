"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Paperclip, Plus, Send, Trash2, X } from "lucide-react";
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
  CLAUDE_ACCENT,
  CLAUDE_ACCENT_SOFT,
} from "@/design-system";
import PageHead from "../../../components/PageHead";
import { useToast } from "../../../components/Toast";
import {
  askNoteTracker,
  deleteNoteTrackerConversation,
  getNoteTrackerConversations,
  getNoteTrackerMessages,
  noteTrackerErrorInfo,
  saveNoteTrackerMessageAsNote,
} from "../../../../../../services/noteTrackerService";
import {
  MAX_QUESTION_LENGTH,
  NT_GAP,
  NT_LIMITS,
  errorMessage,
  fmtDateLabel,
  inputStyle,
  isFatalError,
} from "./ntUtils";
import { NT_CSS } from "./ntStyles";
import NtSessionPicker from "./NtSessionPicker";
import NtModeCards from "./NtModeCards";
import NtMessage from "./NtMessage";
import NtResourcePicker from "./NtResourcePicker";
import NtErrorNotice from "./NtErrorNotice";
import { NtSkeletonRows, NtThinking } from "./NtSkeleton";

const toLocalMessage = (m) => ({
  id: m.id,
  role: m.role,
  content: m.content || "",
  mode: m.mode,
  found: m.found,
  citations: Array.isArray(m.citations) ? m.citations : [],
  coverage: m.coverage || null,
});

// ───────────── one row of the conversation history ─────────────
function ConversationRow({ c, mode, active, busy, onOpen, onDelete }) {
  const t = T[mode] || T.light;
  const [hov, setHov] = useState(false);
  const title = c.title || "Untitled chat";
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: NT_GAP.xs,
        borderRadius: RADIUS.messageBubble,
        background: active
          ? mode === "dark"
            ? t.iconBg
            : CLAUDE_ACCENT_SOFT
          : hov
            ? t.recentItemBgHov
            : t.recentItemBg,
        border: `1px solid ${active ? CLAUDE_ACCENT : t.recentItemBorder}`,
      }}
    >
      <button
        type="button"
        aria-current={active ? "true" : undefined}
        onClick={() => onOpen(c)}
        style={{
          flex: 1,
          minWidth: 0,
          textAlign: "left",
          cursor: "pointer",
          padding: NT_GAP.md,
          background: "transparent",
          border: 0,
          color: t.text,
          fontFamily: FONT_FAMILY,
          fontSize: FONT_SIZE.bodySmall,
          fontWeight: active ? FONT_WEIGHT.semibold : FONT_WEIGHT.medium,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </button>
      <Button
        variant="ghost"
        size="sm"
        mode={mode}
        icon={Trash2}
        disabled={busy}
        onClick={() => onDelete(c)}
        aria-label={`Delete chat: ${title}`}
        style={{ padding: `0 ${NT_GAP.sm}px` }}
      />
    </div>
  );
}

// ───────────── page ─────────────
/**
 * @param {object|null} [initialSession]
 * @param {(noteId: string) => void} [onOpenNotes]  open the Notes page on that note (shell navigation)
 */
export default function NoteTrackerAsk({ initialSession = null, onOpenNotes }) {
  const isDark = useAutoDarkMode();
  const mode = isDark ? "dark" : "light";
  const t = T[mode];
  const showToast = useToast();

  const [fatal, setFatal] = useState(null);
  const [session, setSession] = useState(
    initialSession && initialSession.sessionId ? initialSession : null,
  );
  const [changing, setChanging] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [convLoading, setConvLoading] = useState(false);
  const [convError, setConvError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [openingConv, setOpeningConv] = useState(null);

  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [activeMode, setActiveMode] = useState("");
  const [sendError, setSendError] = useState(null);
  const [focusTick, setFocusTick] = useState(0);

  // resources attached to the questions of this chat: [{ id, fileName }]
  // (kept for the whole chat; cleared by a new chat, a new meeting or opening another chat)
  const [attached, setAttached] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  // answers saved as notes in this page session: messageId -> noteId
  const [savedNotes, setSavedNotes] = useState({});
  const [savingMsgId, setSavingMsgId] = useState(null);

  const epochRef = useRef(0); // bumped when the chat is reset, so late answers are ignored
  const convReqRef = useRef(0);
  const localIdRef = useRef(0);
  const lastReqRef = useRef(null);
  const threadRef = useRef(null);
  const inputRef = useRef(null);
  const wasSendingRef = useRef(false);

  const sessionId = session ? session.sessionId : null;
  const overLimit = input.length > MAX_QUESTION_LENGTH;

  // ── conversation list of the selected session ──
  const loadConversations = useCallback(async () => {
    if (!sessionId) return;
    const req = ++convReqRef.current;
    setConvLoading(true);
    setConvError(null);
    try {
      const res = await getNoteTrackerConversations(sessionId);
      if (req !== convReqRef.current) return;
      setConversations(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      if (req !== convReqRef.current) return;
      const info = noteTrackerErrorInfo(e);
      setConversations([]);
      if (isFatalError(info)) setFatal(info);
      else setConvError(info);
    } finally {
      if (req === convReqRef.current) setConvLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    setConversations([]);
    loadConversations();
  }, [loadConversations]);

  // ── reset the chat area (new session / new chat / open another chat) ──
  const resetChat = useCallback(() => {
    epochRef.current += 1;
    setConversationId(null);
    setMessages([]);
    setMsgError(null);
    setMsgLoading(false);
    setOpeningConv(null);
    setSendError(null);
    setSending(false);
    setActiveMode("");
    setInput("");
    setAttached([]);
    setPickerOpen(false);
  }, []);

  const handlePickSession = (s, date) => {
    setChanging(false);
    if (s.sessionId === sessionId) return;
    resetChat();
    setSession({
      sessionId: s.sessionId,
      title: s.title,
      label: s.label,
      startedAtIst: s.startedAtIst,
      date,
    });
  };

  const startNewChat = () => {
    resetChat();
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  // ── open an existing conversation ──
  const openConversation = useCallback(async (c) => {
    epochRef.current += 1;
    const epoch = epochRef.current;
    setConversationId(c.id);
    setOpeningConv(c);
    setMessages([]);
    setMsgError(null);
    setSendError(null);
    setSending(false);
    setActiveMode("");
    setAttached([]);
    setMsgLoading(true);
    try {
      const res = await getNoteTrackerMessages(c.id);
      if (epoch !== epochRef.current) return;
      setMessages(Array.isArray(res.data) ? res.data.map(toLocalMessage) : []);
      setFocusTick((n) => n + 1);
    } catch (e) {
      if (epoch !== epochRef.current) return;
      const info = noteTrackerErrorInfo(e);
      if (isFatalError(info)) setFatal(info);
      else setMsgError(info);
    } finally {
      if (epoch === epochRef.current) setMsgLoading(false);
    }
  }, []);

  // focus the conversation area once an opened chat is on screen
  useEffect(() => {
    if (focusTick > 0 && threadRef.current) threadRef.current.focus();
  }, [focusTick]);

  // keep the newest message in view
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, sending, sendError]);

  // give the input focus back after an answer arrived
  useEffect(() => {
    if (wasSendingRef.current && !sending && inputRef.current) {
      inputRef.current.focus();
    }
    wasSendingRef.current = sending;
  }, [sending]);

  // ── delete ──
  const handleDelete = async (c) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm("Delete this chat? This cannot be undone.")
    ) {
      return;
    }
    setDeletingId(c.id);
    try {
      await deleteNoteTrackerConversation(c.id);
      setConversations((list) => list.filter((x) => x.id !== c.id));
      if (c.id === conversationId) resetChat();
      showToast("Chat deleted");
    } catch (e) {
      const info = noteTrackerErrorInfo(e);
      if (isFatalError(info)) setFatal(info);
      else showToast(info.message);
    } finally {
      setDeletingId(null);
    }
  };

  // ── save an answer as a note ──
  const saveAnswerAsNote = useCallback(
    async (msg, title) => {
      setSavingMsgId(msg.id);
      try {
        const res = await saveNoteTrackerMessageAsNote(msg.id, title);
        const noteId = res.data && res.data.id ? res.data.id : true;
        setSavedNotes((m) => ({ ...m, [msg.id]: noteId }));
        showToast("Saved to Notes");
        return true;
      } catch (e) {
        const info = noteTrackerErrorInfo(e);
        // saving is owner-only: a 403 here is about this message, not about the whole feature,
        // so only "Note Tracker is off" replaces the page; everything else is a message
        if (info.code === "NOTETRACKER_DISABLED") setFatal(info);
        else showToast(errorMessage(info));
        return false;
      } finally {
        setSavingMsgId(null);
      }
    },
    [showToast],
  );

  // ── ask ──
  const send = useCallback(
    async ({ question, askMode, retry = false }) => {
      if (!sessionId || sending) return;
      const epoch = epochRef.current;
      setSendError(null);
      setSending(true);
      setActiveMode(askMode === "ASK" ? "" : askMode);
      if (!retry) {
        localIdRef.current += 1;
        setMessages((m) => [
          ...m,
          {
            id: `local-${localIdRef.current}`,
            role: "user",
            content: question,
            mode: askMode,
          },
        ]);
        setInput("");
      }
      lastReqRef.current = { question, askMode };
      try {
        const res = await askNoteTracker(sessionId, {
          question,
          conversationId,
          mode: askMode,
          resourceIds: attached.map((a) => a.id),
        });
        if (epoch !== epochRef.current) return;
        const d = res.data || {};
        const isNewChat = !conversationId;
        if (d.conversationId) setConversationId(d.conversationId);
        setMessages((m) => [
          ...m,
          {
            id: d.messageId || `local-a-${Date.now()}`,
            role: "assistant",
            content: d.answer || "",
            mode: d.mode || askMode,
            found: d.found,
            citations: Array.isArray(d.citations) ? d.citations : [],
            coverage: d.coverage || null,
            remainingToday: d.remainingToday,
          },
        ]);
        if (isNewChat) loadConversations();
      } catch (e) {
        if (epoch !== epochRef.current) return;
        const info = noteTrackerErrorInfo(e);
        if (isFatalError(info)) setFatal(info);
        else setSendError(info);
      } finally {
        if (epoch === epochRef.current) {
          setSending(false);
          setActiveMode("");
        }
      }
    },
    [sessionId, sending, conversationId, loadConversations, attached],
  );

  const submitQuestion = () => {
    const q = input.trim();
    if (!q || overLimit) return;
    send({ question: q, askMode: "ASK" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      submitQuestion();
    }
  };

  const handleQuickMode = (item) => {
    if (overLimit) return;
    send({ question: input.trim(), askMode: item.mode });
  };

  const retryLast = () => {
    const last = lastReqRef.current;
    if (last) send({ question: last.question, askMode: last.askMode, retry: true });
  };

  // ───────────── render ─────────────
  const head = (
    <PageHead
      eyebrow="Note Tracker"
      title="Ask"
      subtitle="Ask questions about a recorded meeting, or pick a quick action such as a summary or action items."
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

  const muted = {
    margin: 0,
    color: t.textSub,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE.bodySmall,
    lineHeight: LINE_HEIGHT.body,
  };

  return (
    <div className="ws-content">
      <style>{NT_CSS}</style>
      {head}

      <div className="nt-two-col">
        {/* ── left: meeting + history ── */}
        <div className="nt-stack">
          {(!session || changing) && (
            <>
              {session && (
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    mode={mode}
                    onClick={() => setChanging(false)}
                  >
                    Back to chats
                  </Button>
                </div>
              )}
              <NtSessionPicker
                mode={mode}
                selectedId={sessionId}
                onSelect={handlePickSession}
                onFatal={setFatal}
                initialDate={session ? session.date : undefined}
              />
            </>
          )}

          {session && !changing && (
            <>
              <Panel
                mode={mode}
                title="Meeting"
                action={
                  <Button
                    variant="secondary"
                    size="sm"
                    mode={mode}
                    onClick={() => setChanging(true)}
                  >
                    Change
                  </Button>
                }
              >
                <div style={{ fontFamily: FONT_FAMILY, color: t.text }}>
                  <div
                    style={{
                      fontSize: FONT_SIZE.cardLabel,
                      fontWeight: FONT_WEIGHT.semibold,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {session.title || "Untitled meeting"}
                  </div>
                  <div style={{ ...muted, marginTop: NT_GAP.xs }}>
                    {[
                      session.label,
                      session.date ? fmtDateLabel(session.date) : "",
                      session.startedAtIst,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                </div>
              </Panel>

              <Panel
                mode={mode}
                title="Chats"
                action={
                  <Button
                    variant="secondary"
                    size="sm"
                    mode={mode}
                    icon={Plus}
                    onClick={startNewChat}
                  >
                    New chat
                  </Button>
                }
              >
                {convLoading && <NtSkeletonRows count={3} height={44} mode={mode} />}
                {!convLoading && convError && (
                  <NtErrorNotice error={convError} mode={mode} onRetry={loadConversations} />
                )}
                {!convLoading && !convError && conversations.length === 0 && (
                  <p style={muted}>No chats for this meeting yet. Ask your first question.</p>
                )}
                {!convLoading && !convError && conversations.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: NT_GAP.sm }}>
                    {conversations.map((c) => (
                      <ConversationRow
                        key={c.id}
                        c={c}
                        mode={mode}
                        active={c.id === conversationId}
                        busy={deletingId === c.id}
                        onOpen={openConversation}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </Panel>
            </>
          )}
        </div>

        {/* ── right: chat ── */}
        <Panel mode={mode}>
          {!session ? (
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
              <MessageCircle size={26} color={t.emptyIcon} aria-hidden="true" />
              Pick a meeting on the left to start asking questions.
            </div>
          ) : (
            <div className="nt-stack">
              <NtModeCards
                mode={mode}
                activeMode={activeMode}
                disabled={sending || overLimit}
                onPick={handleQuickMode}
              />

              <div
                ref={threadRef}
                tabIndex={-1}
                role="log"
                aria-live="polite"
                aria-label={
                  openingConv
                    ? `Conversation: ${openingConv.title || "Untitled chat"}`
                    : "Conversation"
                }
                className="nt-thread"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: NT_GAP.md,
                  padding: NT_GAP.sm,
                  border: `1px solid ${t.border}`,
                  borderRadius: RADIUS.messageBubble,
                  outline: "none",
                }}
              >
                {msgLoading && <NtSkeletonRows count={3} height={72} mode={mode} />}
                {!msgLoading && msgError && (
                  <NtErrorNotice
                    error={msgError}
                    mode={mode}
                    onRetry={() => openingConv && openConversation(openingConv)}
                  />
                )}
                {!msgLoading && !msgError && messages.length === 0 && !sending && (
                  <p style={{ ...muted, padding: NT_GAP.md }}>
                    Ask a question about this meeting, or choose a quick action above.
                    To add an extra instruction to a quick action, type it first.
                  </p>
                )}
                {messages.map((m) => (
                  <NtMessage
                    key={m.id}
                    msg={m}
                    mode={mode}
                    onNotify={showToast}
                    onSaveNote={saveAnswerAsNote}
                    savedNoteId={savedNotes[m.id]}
                    saving={savingMsgId === m.id}
                    onOpenNote={onOpenNotes}
                  />
                ))}
                {sending && <NtThinking mode={mode} />}
                {sendError && (
                  <NtErrorNotice error={sendError} mode={mode} onRetry={retryLast} />
                )}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: NT_GAP.sm,
                    marginBottom: NT_GAP.sm,
                  }}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    mode={mode}
                    icon={Paperclip}
                    disabled={sending}
                    aria-haspopup="dialog"
                    onClick={() => setPickerOpen(true)}
                  >
                    {attached.length > 0
                      ? `Attach resources (${attached.length})`
                      : "Attach resources"}
                  </Button>
                  {attached.map((a) => (
                    <span
                      key={a.id}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: NT_GAP.xs,
                        maxWidth: "100%",
                        padding: `${NT_GAP.xs / 2}px ${NT_GAP.xs}px ${NT_GAP.xs / 2}px ${NT_GAP.md}px`,
                        borderRadius: RADIUS.pill,
                        background: t.pillBg,
                        border: `1px solid ${t.pillBorder}`,
                        color: t.pillText,
                        fontFamily: FONT_FAMILY,
                        fontSize: FONT_SIZE.bodySmall,
                      }}
                    >
                      <span style={{ overflowWrap: "anywhere" }}>{a.fileName || "Resource"}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        mode={mode}
                        icon={X}
                        disabled={sending}
                        onClick={() => setAttached((list) => list.filter((x) => x.id !== a.id))}
                        aria-label={`Remove resource: ${a.fileName || "Resource"}`}
                        style={{ height: 22, padding: `0 ${NT_GAP.xs}px` }}
                      />
                    </span>
                  ))}
                </div>
                {attached.length > 0 && (
                  <p style={{ ...muted, fontSize: FONT_SIZE.caption, marginBottom: NT_GAP.sm }}>
                    These files are used as extra context for every question in this chat until
                    you remove them.
                  </p>
                )}
                <div className="nt-composer-row">
                  <textarea
                    ref={inputRef}
                    rows={2}
                    value={input}
                    disabled={sending}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Your question"
                    aria-describedby="nt-input-hint"
                    aria-invalid={overLimit}
                    placeholder="Ask something about this meeting…"
                    style={{
                      ...inputStyle(t, mode),
                      flex: 1,
                      minWidth: 0,
                      resize: "vertical",
                      opacity: sending ? 0.6 : 1,
                    }}
                  />
                  <Button
                    variant="primary"
                    mode={mode}
                    icon={Send}
                    disabled={sending || !input.trim() || overLimit}
                    onClick={submitQuestion}
                    aria-label="Send question"
                  >
                    Send
                  </Button>
                </div>
                <div
                  id="nt-input-hint"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: NT_GAP.sm,
                    marginTop: NT_GAP.xs,
                    fontFamily: FONT_FAMILY,
                    fontSize: FONT_SIZE.caption,
                    color: overLimit ? t.overdueText : t.textMuted,
                  }}
                >
                  <span>Enter to send · Shift+Enter for a new line</span>
                  {input.length > MAX_QUESTION_LENGTH * 0.8 && (
                    <span>{`${input.length} / ${MAX_QUESTION_LENGTH}`}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </Panel>
      </div>

      {pickerOpen && session && (
        <NtResourcePicker
          mode={mode}
          selected={attached}
          max={NT_LIMITS.resourcesPerQuestion}
          sessionId={sessionId}
          onClose={() => setPickerOpen(false)}
          onConfirm={(list) => {
            setAttached(list);
            setPickerOpen(false);
          }}
          onFatal={setFatal}
        />
      )}
    </div>
  );
}
