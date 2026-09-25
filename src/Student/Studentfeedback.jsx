"use client";

import { useState, useEffect } from "react";
import {
  getStudentContext, submitFeedback, checkFeedbackStatus,
} from "../services/chatService";
import {
  Star, CheckCircle, ChevronRight, ChevronLeft, Send,
  GraduationCap, Smile, BarChart2, Lightbulb, ClipboardList, Activity,
} from "lucide-react";
import {
  T, CLAUDE_ACCENT, CLAUDE_ACCENT_HOVER, CLAUDE_ACCENT_SOFT,
  STAT_COLORS_FLAT, Button, Panel, FONT_FAMILY, FONT_IMPORT, FONT_WEIGHT,
  useAutoDarkMode,
} from "@/design-system";

/* ═══════════════════════════════════════════════
   THEME — sourced entirely from the shared design-system
   (T.light / T.dark) so this page repaints with every other
   dashboard automatically. No page-local color/dark-mode logic.
═══════════════════════════════════════════════ */

const ACCENT = CLAUDE_ACCENT;
const ACCENT2 = CLAUDE_ACCENT_HOVER;
const GRAD = `linear-gradient(135deg,${ACCENT},${ACCENT2})`;

const MOODS = [
  { icon: "😞", label: "Poor", value: "POOR" },
  { icon: "😕", label: "Okay", value: "OKAY" },
  { icon: "😐", label: "Fine", value: "FINE" },
  { icon: "😊", label: "Good", value: "GOOD" },
  { icon: "🤩", label: "Amazing", value: "AMAZING" },
];

const TRAINER_DIMS = [
  { key: "trainerClarityRating", label: "Clarity of explanation" },
  { key: "trainerDoubtClearingRating", label: "Doubt clearing" },
  { key: "trainerEnergyRating", label: "Energy & engagement" },
  { key: "trainerTechnicalDepthRating", label: "Technical depth" },
];

const CONTENT_TAGS = ["Too fast","Too slow","Just right","Hard to follow","Very clear","Needs more examples","Great real-world demos","Outdated material"];
const IMPROVE_TAGS = ["More practice time","Better code examples","Recorded sessions","Q&A time","Notes & resources","Smaller batches","Weekend doubt sessions"];

/* ── Toast ── */
function Toast({ message, type = "success", onClose, t }) {
  useEffect(() => { const t2 = setTimeout(onClose, 3000); return () => clearTimeout(t2); }, [onClose]);
  return (
    <div style={{
      position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 200,
      borderRadius: 12, padding: "12px 20px", fontSize: 12, fontWeight: FONT_WEIGHT.semibold,
      background: type === "success" ? t.statusCompletedText : t.overdueText, color: "#fff",
      boxShadow: t.shadowHov, fontFamily: FONT_FAMILY,
      animation: "sfSlideUp 0.3s ease-out", whiteSpace: "nowrap",
    }}>
      {type === "success" ? "✅" : "⚠️"} {message}
    </div>
  );
}

/* ── Star Row ── */
function StarRow({ label, value, onChange, t }) {
  const [hover, setHover] = useState(0);
  const amber = STAT_COLORS_FLAT.amber.solid;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, padding: "10px 12px", borderRadius: 12, background: t.actBg, border: `1px solid ${t.actBorder}`, transition: "border-color 0.2s" }}>
      <span style={{ fontSize: 12, color: t.textSub, fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT.medium }}>{label}</span>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} onClick={() => onChange(i)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)}
            style={{ cursor: "pointer", transition: "transform 0.15s", transform: (hover || value) >= i ? "scale(1.25) rotate(8deg)" : "scale(1)", display: "inline-flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24"
              fill={(hover || value) >= i ? amber : "none"}
              stroke={(hover || value) >= i ? amber : t.borderHov}
              strokeWidth="1.5">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Chip ── */
function Chip({ label, selected, onToggle, t }) {
  return (
    <button onClick={onToggle} style={{
      borderRadius: 999, padding: "6px 14px", fontSize: 11, cursor: "pointer",
      border: `1.5px solid ${selected ? ACCENT : t.actBorder}`,
      background: selected ? `${ACCENT}1F` : t.actBg,
      color: selected ? ACCENT : t.textMuted,
      fontWeight: selected ? FONT_WEIGHT.semibold : FONT_WEIGHT.regular,
      transform: selected ? "scale(1.04)" : "scale(1)",
      boxShadow: selected ? `0 4px 12px ${ACCENT}2E` : "none",
      transition: "all 0.18s", fontFamily: FONT_FAMILY,
    }}>
      {label}
    </button>
  );
}

/* ── Card — thin wrapper around the shared Panel so this page renders
   through the same primitive as every other dashboard, while keeping
   its own title+sub layout (Panel doesn't have a "sub" slot). ── */
function Card({ title, sub, children, t }) {
  return (
    <Panel style={{ marginBottom: 14 }} padding={20}>
      {title && <p style={{ fontSize: 13, fontWeight: FONT_WEIGHT.bold, color: t.text, margin: "0 0 4px", fontFamily: FONT_FAMILY }}>{title}</p>}
      {sub && <p style={{ fontSize: 11, color: t.textMuted, margin: "0 0 16px", fontFamily: FONT_FAMILY }}>{sub}</p>}
      {children}
    </Panel>
  );
}

/* ── NavRow — back/continue pair, now built on the shared Button ── */
function NavRow({ onBack, onNext, nextLabel = "Continue →", t }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
      {onBack && (
        <Button variant="secondary" icon={ChevronLeft} onClick={onBack}>
          Back
        </Button>
      )}
      {onNext && (
        <Button variant="primary" fullWidth onClick={onNext} style={{ justifyContent: "center" }}>
          {nextLabel} <ChevronRight size={14} />
        </Button>
      )}
    </div>
  );
}

/* ── Modal ── */
function Modal({ onClose, children, t }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: t.overlayBg, backdropFilter: "blur(6px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "90%", maxWidth: 420, borderRadius: 20, padding: "28px 28px",
        background: t.cardBg, border: `1px solid ${t.border}`,
        boxShadow: t.shadowHov, animation: "sfPopIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ── Step Icon ── */
const STEP_ICONS = [Smile, Star, ClipboardList, Lightbulb, CheckCircle];

/* ════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════ */
export default function StudentFeedback() {
  const dark = useAutoDarkMode();
  const t = dark ? T.dark : T.light;

  /* context */
  const [batchId, setBatchId] = useState(null);
  const [trainerEmail, setTrainerEmail] = useState(null);
  const [ctxLoading, setCtxLoading] = useState(true);
  const [ctxError, setCtxError] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const ctx = await getStudentContext();
        setBatchId(ctx.data.batchId);
        setTrainerEmail(ctx.data.trainerEmail);
        try {
          const s = await checkFeedbackStatus(ctx.data.batchId);
          setAlreadySubmitted(s.data.alreadySubmitted);
        } catch { setAlreadySubmitted(false); }
      } catch { setCtxError("No classroom assigned. Please contact admin."); }
      finally { setCtxLoading(false); }
    };
    load();
  }, []);

  /* form state */
  const [page, setPage] = useState(1);
  const [mood, setMood] = useState("");
  const [stars, setStars] = useState({});
  const [contentTags, setCTags] = useState([]);
  const [difficulty, setDiff] = useState(3);
  const [improveTags, setITags] = useState([]);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const progress = [20, 40, 60, 80, 100][page - 1];
  const toggleArr = (arr, setArr, val) => setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);

  function buildPreviewChips() {
    const chips = [];
    if (mood) chips.push({ text: `Overall: ${mood}`, green: ["GOOD", "AMAZING"].includes(mood) });
    Object.entries(stars).forEach(([k, v]) => { if (v) chips.push({ text: `${k}: ${v}/5`, green: v >= 4 }); });
    [...contentTags, ...improveTags].forEach(t2 => chips.push({ text: t2 }));
    if (anonymous) chips.push({ text: "🔒 Anonymous" });
    return chips.slice(0, 8);
  }

  async function handleSubmit() {
    setLoading(true); setError("");
    try {
      await submitFeedback({
        batchId, trainerEmail, moodRating: mood, anonymous,
        trainerClarityRating: stars["Clarity of explanation"] || 0,
        trainerDoubtClearingRating: stars["Doubt clearing"] || 0,
        trainerEnergyRating: stars["Energy & engagement"] || 0,
        trainerTechnicalDepthRating: stars["Technical depth"] || 0,
        contentTags, improvementTags: improveTags, comment,
      });
      setShowConfirm(false); setShowSuccess(true); setAlreadySubmitted(true);
      setToast({ message: "Feedback submitted successfully!", type: "success" });
    } catch (e) {
      if (e?.response?.status === 409) {
        const msg = e?.response?.data?.message || "You already submitted feedback for this batch";
        setError(msg); setToast({ message: msg, type: "error" }); setAlreadySubmitted(true);
      } else {
        const msg = e?.response?.data?.message || "Submission failed. Please try again.";
        setError(msg); setToast({ message: msg, type: "error" });
      }
    } finally { setLoading(false); }
  }

  const stepLabels = ["Overall", "Trainer", "Content", "Suggest", "Done"];

  /* ── Guards ── */
  if (ctxLoading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: t.pageBg, fontFamily: FONT_FAMILY }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16, animation: "sfPulse 2s infinite" }}>⏳</div>
        <p style={{ color: t.textMuted, fontSize: 13 }}>Loading your classroom…</p>
      </div>
    </div>
  );

  if (ctxError) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: t.pageBg, fontFamily: FONT_FAMILY }}>
      <div style={{ padding: "32px 40px", borderRadius: 20, background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow, textAlign: "center" }}>
        <p style={{ color: t.overdueText, fontSize: 13, margin: 0 }}>{ctxError}</p>
      </div>
    </div>
  );

  if (alreadySubmitted) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: t.pageBg, fontFamily: FONT_FAMILY }}>
      <div style={{ padding: "48px 40px", borderRadius: 24, background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow, textAlign: "center", maxWidth: 400, width: "90%" }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: t.statusCompletedBg, border: `1px solid ${t.statusCompletedText}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <CheckCircle size={26} color={t.statusCompletedText} />
        </div>
        <p style={{ fontSize: 17, fontWeight: FONT_WEIGHT.extrabold, color: t.text, margin: "0 0 8px" }}>Feedback Already Submitted</p>
        <p style={{ fontSize: 12, color: t.textMuted, margin: "0 0 20px", lineHeight: 1.6 }}>You have already submitted feedback for Batch #{batchId}. Each batch allows only one submission to ensure fair results.</p>
        <div style={{ padding: "10px 14px", borderRadius: 12, background: t.actBg, border: `1px solid ${t.actBorder}`, marginBottom: 20 }}>
          <p style={{ fontSize: 11, color: t.textSub, margin: 0 }}>
            <GraduationCap size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
            <strong>Trainer:</strong> {trainerEmail?.split("@")[0]}
          </p>
        </div>
        <Button variant="primary" fullWidth onClick={() => window.history.back()}>
          ← Go Back to Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        ${FONT_IMPORT}
        @keyframes sfFadeUp { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:translateY(0) } }
        @keyframes sfPopIn { from { opacity:0; transform:scale(0.88) translateY(16px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes sfSlideUp { from { opacity:0; transform:translate(-50%,16px) } to { opacity:1; transform:translate(-50%,0) } }
        @keyframes sfPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes sfPulseRing { 0%{box-shadow:0 0 0 0 ${ACCENT}80} 70%{box-shadow:0 0 0 8px ${ACCENT}00} 100%{box-shadow:0 0 0 0 ${ACCENT}00} }
        .sf-fade { animation: sfFadeUp 0.4s ease both; }
        .sf-live { animation: sfPulseRing 2.2s ease-out infinite; }
        .sf-page { animation: sfFadeUp 0.35s ease both; }
        .sf-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important; }
        .sf-mood:hover { transform: translateY(-4px) scale(1.06) !important; }
        input[type=range] { accent-color: ${ACCENT}; }
      `}</style>

      <div style={{ background: t.pageBg, minHeight: "100vh", fontFamily: FONT_FAMILY, transition: "background 0.3s, color 0.3s", color: t.text }}>
      <div
  style={{
    width: "100%",
    maxWidth: "100%",
    padding: "24px 32px 60px",
  }}
>

          {/* ═══ HERO BANNER ═══ */}
          <div className="sf-fade" style={{
            borderRadius: 20, padding: "22px 26px", marginBottom: 20,
            background: t.cardBg, border: `1px solid ${t.border}`, boxShadow: t.shadow,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${ACCENT}1F`, border: `1px solid ${ACCENT}38`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ClipboardList size={16} color={ACCENT} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: FONT_WEIGHT.bold, letterSpacing: "0.15em", textTransform: "uppercase", color: t.textSub }}>Feedback Portal</span>
                </div>
                <h1 style={{ fontFamily: FONT_FAMILY,fontWeight: FONT_WEIGHT.bold,fontSize: "clamp(1.5rem,3vw,2.2rem)",color: t.text,margin: "0 0 6px",lineHeight: 1.1,letterSpacing: "-0.02em",}}>Session Feedback</h1>
                <p style={{ fontSize: 11, color: t.textSub, margin: 0, fontWeight: FONT_WEIGHT.medium }}>Share your honest experience with us</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Batch badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, background: t.actBg, border: `1px solid ${t.actBorder}`, borderRadius: 12, padding: "8px 14px" }}>
                  <GraduationCap size={13} color={ACCENT} />
                  <div>
                    <p style={{ fontSize: 9, color: t.textLabel, margin: 0, fontWeight: FONT_WEIGHT.bold, letterSpacing: "0.08em", textTransform: "uppercase" }}>Trainer</p>
                    <p style={{ fontSize: 12, color: t.text, margin: 0, fontWeight: FONT_WEIGHT.bold }}>{trainerEmail?.split("@")[0] || "—"}</p>
                  </div>
                  <div style={{ width: 1, height: 24, background: t.actBorder }} />
                  <div>
                    <p style={{ fontSize: 9, color: t.textLabel, margin: 0, fontWeight: FONT_WEIGHT.bold, letterSpacing: "0.08em", textTransform: "uppercase" }}>Batch</p>
                    <p style={{ fontSize: 12, color: t.text, margin: 0, fontWeight: FONT_WEIGHT.bold }}>#{batchId}</p>
                  </div>
                </div>
                {/* Live badge */}
                <div className="sf-live" style={{ display: "flex", alignItems: "center", gap: 6, background: `${ACCENT}14`, border: `1px solid ${ACCENT}47`, borderRadius: 999, padding: "7px 14px", color: ACCENT, fontSize: 10, fontWeight: FONT_WEIGHT.bold, letterSpacing: "0.1em" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, display: "inline-block" }} />
                  LIVE
                </div>
              </div>
            </div>
          </div>

          {/* ═══ PROGRESS BAR ═══ */}
          <div style={{ height: 3, borderRadius: 99, background: t.barBg, marginBottom: 10, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 99, background: GRAD, width: `${progress}%`, transition: "width 0.5s ease" }} />
          </div>

          {/* ═══ STEP DOTS ═══ */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
            {stepLabels.map((lbl, idx) => {
              const n = idx + 1;
              const isActive = n === page;
              const isDone = n < page;
              const StepIcon = STEP_ICONS[idx];
              return (
                <div key={n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `2px solid ${isDone ? t.statusCompletedText : isActive ? ACCENT : t.actBorder}`,
                      background: isDone ? t.statusCompletedText : isActive ? `${ACCENT}1F` : t.actBg,
                      color: isDone ? "#fff" : isActive ? ACCENT : t.textMuted,
                      boxShadow: isActive ? `0 0 0 4px ${ACCENT}1F` : "none",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.25s",
                    }}>
                      {isDone ? <CheckCircle size={15} color="#fff" /> : <StepIcon size={14} />}
                    </div>
                    <span style={{ fontSize: 9, color: isActive ? ACCENT : t.textMuted, fontWeight: isActive ? FONT_WEIGHT.bold : FONT_WEIGHT.medium, letterSpacing: "0.04em" }}>{lbl}</span>
                  </div>
                  {idx < stepLabels.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: n < page ? t.statusCompletedText : t.barBg, margin: "-14px 4px 0", transition: "background 0.3s", borderRadius: 99 }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ═══ PAGE 1 — Overall Mood ═══ */}
          {page === 1 && (
            <div className="sf-page">
              <Card title="How was this session overall?" sub="Pick the one that matches your feeling" t={t}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
                  {MOODS.map(m => (
                    <button
                      key={m.value}
                      className="sf-mood"
                      onClick={() => { setMood(m.value); setToast({ message: `You selected ${m.label}!`, type: "success" }); }}
                      style={{
                        borderRadius: 16, padding: "14px 8px",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                        cursor: "pointer", border: `1.5px solid ${mood === m.value ? ACCENT : t.actBorder}`,
                        background: mood === m.value ? `${ACCENT}1F` : t.actBg,
                        transform: mood === m.value ? "translateY(-4px) scale(1.05)" : "none",
                        boxShadow: mood === m.value ? `0 8px 20px ${ACCENT}33` : "none",
                        transition: "all 0.2s", fontFamily: FONT_FAMILY,
                      }}
                    >
                      <span style={{ fontSize: 26 }}>{m.icon}</span>
                      <span style={{ fontSize: 10, fontWeight: FONT_WEIGHT.semibold, color: mood === m.value ? ACCENT : t.textMuted }}>{m.label}</span>
                    </button>
                  ))}
                </div>
              </Card>
              <NavRow onNext={() => setPage(2)} t={t} />
            </div>
          )}

          {/* ═══ PAGE 2 — Trainer Ratings ═══ */}
          {page === 2 && (
            <div className="sf-page">
              <Card title="Rate your trainer" sub="Tap a star for each dimension" t={t}>
                {TRAINER_DIMS.map(({ key, label }) => (
                  <StarRow key={key} label={label} value={stars[label] || 0}
                    onChange={v => { setStars(p => ({ ...p, [label]: v })); setToast({ message: `${label}: ${v}/5 ⭐`, type: "success" }); }}
                    t={t} />
                ))}
              </Card>
              <NavRow onBack={() => setPage(1)} onNext={() => setPage(3)} t={t} />
            </div>
          )}

          {/* ═══ PAGE 3 — Content Tags ═══ */}
          {page === 3 && (
            <div className="sf-page">
              <Card title="How was the content?" sub="Select all that apply" t={t}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {CONTENT_TAGS.map(tag => (
                    <Chip key={tag} label={tag} selected={contentTags.includes(tag)}
                      onToggle={() => { toggleArr(contentTags, setCTags, tag); setToast({ message: contentTags.includes(tag) ? `Removed "${tag}"` : `Added "${tag}"`, type: "success" }); }}
                      t={t} />
                  ))}
                </div>
              </Card>
              <Card title="Session difficulty" sub="How challenging was the material?" t={t}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, color: t.textMuted, fontWeight: FONT_WEIGHT.medium }}>Easy</span>
                  <input type="range" min="1" max="5" value={difficulty} onChange={e => setDiff(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontSize: 11, color: t.textMuted, fontWeight: FONT_WEIGHT.medium }}>Hard</span>
                  <div style={{ minWidth: 32, height: 32, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: `${ACCENT}1F`, border: `1px solid ${ACCENT}38` }}>
                    <span style={{ fontSize: 12, fontWeight: FONT_WEIGHT.extrabold, color: ACCENT }}>{difficulty}</span>
                  </div>
                </div>
              </Card>
              <NavRow onBack={() => setPage(2)} onNext={() => setPage(4)} t={t} />
            </div>
          )}

          {/* ═══ PAGE 4 — Suggestions ═══ */}
          {page === 4 && (
            <div className="sf-page">
              <Card title="What would help most?" sub="Pick your top suggestions" t={t}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {IMPROVE_TAGS.map(tag => (
                    <Chip key={tag} label={tag} selected={improveTags.includes(tag)}
                      onToggle={() => { toggleArr(improveTags, setITags, tag); setToast({ message: improveTags.includes(tag) ? "Removed suggestion" : "Added suggestion", type: "success" }); }}
                      t={t} />
                  ))}
                </div>
              </Card>
              <Card t={t}>
                <p style={{ fontSize: 9, fontWeight: FONT_WEIGHT.bold, textTransform: "uppercase", letterSpacing: "0.1em", color: t.textLabel, margin: "0 0 10px" }}>Your comments (optional)</p>
                <textarea
                  rows={4} value={comment} onChange={e => setComment(e.target.value)}
                  placeholder="Anything specific for the trainer or admin team…"
                  style={{
                    width: "100%", borderRadius: 12, padding: "12px 14px",
                    background: t.actBg, border: `1px solid ${t.actBorder}`,
                    color: t.text, fontSize: 12, resize: "none", outline: "none",
                    fontFamily: FONT_FAMILY, lineHeight: 1.6, boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = t.actBorder}
                />
                {/* Anonymous toggle */}
                <div
                  onClick={() => setAnonymous(!anonymous)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                    borderRadius: 12, marginTop: 10, cursor: "pointer",
                    background: t.actBg, border: `1px solid ${t.actBorder}`, transition: "all 0.2s",
                  }}
                >
                  <div style={{ width: 40, height: 22, borderRadius: 999, position: "relative", background: anonymous ? ACCENT : t.barBg, transition: "background 0.2s", flexShrink: 0 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: anonymous ? 21 : 3, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
                  </div>
                  <div style={{ fontSize: 11, color: t.textSub, lineHeight: 1.5 }}>
                    <strong style={{ color: t.text, display: "block", marginBottom: 1 }}>Submit anonymously</strong>
                    Trainer sees your feedback but not your name
                  </div>
                </div>
              </Card>
              {error && <p style={{ color: t.overdueText, fontSize: 11, margin: "0 0 12px" }}>{error}</p>}
              <NavRow onBack={() => setPage(3)} onNext={() => setShowConfirm(true)} nextLabel="Submit Feedback" t={t} />
            </div>
          )}

        </div>
      </div>

      {/* ═══ CONFIRM MODAL ═══ */}
      {showConfirm && (
        <Modal onClose={() => setShowConfirm(false)} t={t}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `${ACCENT}1F`, border: `1px solid ${ACCENT}38`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <Send size={22} color={ACCENT} />
            </div>
            <p style={{ fontSize: 16, fontWeight: FONT_WEIGHT.extrabold, color: t.text, margin: "0 0 6px" }}>Ready to submit?</p>
            <p style={{ fontSize: 11, color: t.textMuted, margin: "0 0 18px" }}>You can't edit it after submission.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 16, maxHeight: 120, overflowY: "auto" }}>
              {buildPreviewChips().map((c, i) => (
                <span key={i} style={{
                  padding: "4px 12px", borderRadius: 999, fontSize: 10, fontWeight: FONT_WEIGHT.semibold,
                  background: c.green ? `${t.statusCompletedText}1F` : `${ACCENT}1F`,
                  color: c.green ? t.statusCompletedText : ACCENT,
                  border: `1px solid ${c.green ? `${t.statusCompletedText}40` : `${ACCENT}40`}`,
                  fontFamily: FONT_FAMILY,
                }}>{c.text}</span>
              ))}
            </div>
            <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 16 }}>
              {anonymous ? "🔒 Submitting anonymously" : "👤 Submitting with your name"}
            </p>
            <Button variant="primary" fullWidth onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting…" : "Confirm & Submit"}
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setShowConfirm(false)} style={{ marginTop: 8 }}>
              Go back
            </Button>
          </div>
        </Modal>
      )}

      {/* ═══ SUCCESS MODAL ═══ */}
      {showSuccess && (
        <Modal onClose={() => setShowSuccess(false)} t={t}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: t.statusCompletedBg, border: `1px solid ${t.statusCompletedText}40`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <CheckCircle size={24} color={t.statusCompletedText} />
            </div>
            <p style={{ fontSize: 16, fontWeight: FONT_WEIGHT.extrabold, color: t.text, margin: "0 0 6px" }}>Feedback submitted!</p>
            <p style={{ fontSize: 11, color: t.textMuted, margin: "0 0 18px" }}>Your input helps improve every batch. Thank you!</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 18, maxHeight: 120, overflowY: "auto" }}>
              {buildPreviewChips().map((c, i) => (
                <span key={i} style={{
                  padding: "4px 12px", borderRadius: 999, fontSize: 10, fontWeight: FONT_WEIGHT.semibold,
                  background: c.green ? `${t.statusCompletedText}1F` : `${ACCENT}1F`,
                  color: c.green ? t.statusCompletedText : ACCENT,
                  border: `1px solid ${c.green ? `${t.statusCompletedText}40` : `${ACCENT}40`}`,
                  fontFamily: FONT_FAMILY,
                }}>{c.text}</span>
              ))}
            </div>
            <Button variant="primary" fullWidth onClick={() => setShowSuccess(false)}>
              Back to dashboard
            </Button>
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} t={t} />}
    </>
  );
}