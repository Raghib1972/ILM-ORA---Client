"use client";
// Place at: src/legacy-pages/Landing/Storyline.jsx
// Navbar and footer come from PublicLayout (same as PersonalityDevelopment).
// Hero photo: src/assets/storyline/01_hero_student_learning.jpg (imported below).
import { useEffect, useState } from "react";
// Same shared shell used by PersonalityDevelopment / ManagerHub (navbar + footer).
import PublicLayout from "./components/PublicLayout";
import heroImg from "../../assets/storyline/01_hero_student_learning.jpg";

/* ---------- Configure these (leave empty to show "To be confirmed") ---------- */
const CONFIG = { time: "", cost: "" };
const shown = (v) => (v && v.trim() ? v : "To be confirmed");

/* ---------- Helpers ---------- */
const range = (n) => Array.from({ length: n }, (_, i) => i);
const shuffle = (a) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};
function usePerms(lens) {
  const [p, setP] = useState(() => lens.map((n) => range(n)));
  const mix = () => setP(lens.map((n) => shuffle(range(n))));
  useEffect(mix, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [p, mix];
}

/* ---------- Content ---------- */
const FLOW = ["Idea", "Events", "People", "Challenge", "Ending", "Message"];
const WHY = [
  ["Structure", "Organise information clearly."],
  ["Connection", "Help people relate to goals, feelings and choices."],
  ["Memorability", "Make ideas easier to understand and remember."],
  ["Change", "Show how a person, team or situation moves from problem to result."],
];
const OBS = [
  ["Who?", "Who is the main person?", ["A student", "A teacher", "An examiner"], "The student is the main person; the story follows her journey."],
  ["Wants what?", "What goal drives them?", ["To pass the examination", "To make friends", "To buy a laptop"], "The goal drives every event that follows."],
  ["Why now?", "What starts the action?", ["Repeatedly running out of time", "A holiday", "A new teacher"], "The time pressure is the trigger that starts the action."],
  ["What blocks them?", "What is the obstacle?", ["Poor time management", "A broken pen", "Noisy neighbours"], "The obstacle is tied to the goal, which makes it meaningful."],
  ["What changes?", "What turning point moves things forward?", ["Builds a study plan and asks for feedback", "Stops studying", "Changes subject"], "Choosing to plan and ask for help changes the direction."],
  ["What is the result?", "How does it end and what is learned?", ["Score improves; steady habits help", "Nothing changes", "The exam is cancelled"], "The ending supports the message: small, steady habits can change results."],
];
const LEVELS = [
  ["The basics", "Name your topic, audience and one main message. Put 3–5 events in order.", "#sl-steps", "Go to the 6 steps"],
  ["Structure", "Write a beginning that sets the scene, a middle that develops it and an ending that resolves it.", "#sl-compare", "See events vs a real story"],
  ["Characters", "Define your main person: their goal, reason, strengths and obstacles.", "#sl-glossary", "See the key terms"],
  ["Plot", "Add a challenge, stakes, cause and effect, a turning point and a believable ending.", "#sl-case", "Follow the case study"],
  ["Advanced techniques", "Use hints, flashbacks, parallel stories, branching choices and other perspectives.", "#sl-advanced", "Explore techniques"],
  ["Review", "Check clarity, pacing, emotion, consistency and whether the ending supports the message.", "#sl-checklist", "Open the checklist"],
];
const GLOSSARY = [
  ["Stakes", "What the character could win or lose.", "A scholarship could be lost."],
  ["Conflict", "The obstacle blocking the goal.", "Not enough time to study."],
  ["Turning point", "The moment events change direction.", "The student asks a teacher for help."],
  ["Character arc", "How beliefs, skills or behaviour change.", "From “I can’t manage time” to “I have a system”."],
  ["Foreshadowing", "An early hint of something that happens later.", "A missed practice test at the start."],
  ["Flashback", "An earlier event shown to explain the present.", "Showing last term’s failed exam."],
  ["Parallel storylines", "Two connected journeys told together.", "A student’s story and a teacher’s story."],
  ["Branching story", "Choices lead to different endings.", "“Do you ask for help or study alone?”"],
  ["Symbol / theme", "A repeated object or idea carrying meaning.", "A clock that appears in every scene."],
  ["Unreliable narrator", "A storyteller whose version cannot be fully trusted.", "A character who hides their mistakes."],
];
const STEPS = [
  ["Define the purpose", "Write one sentence: “This story helps [audience] understand [message].”"],
  ["Outline the events", "Write the beginning, 2–4 important middle events and the ending."],
  ["Add motivation", "Say what the main person wants and why."],
  ["Add obstacles", "Make the challenge meaningful and linked to the goal."],
  ["Resolve it", "Show the result, lesson or next action."],
  ["Improve it", "Remove extra events, check the links between events and read it aloud."],
];
const CASE = [
  ["Before", "The student struggles with time management.", "It sets up the goal and the problem.", "It leads to missed practice tests."],
  ["Challenge", "The student misses practice tests.", "It shows the stakes: the struggle has consequences.", "It pushes the student to act."],
  ["Turning point", "The student creates a weekly study plan and asks for feedback.", "The direction changes: from reacting to taking control.", "The new habits lead to a better result."],
  ["Outcome", "The student’s final score improves.", "The ending supports the message.", "The story closes: small, steady habits can change results."],
];
const ADV = [
  ["Foreshadowing", "Early hints make a later outcome feel earned.", "Avoid hints that never pay off."],
  ["Flashback", "Use when the past helps explain the present.", "Avoid too many jumps in time."],
  ["Parallel storylines", "Two journeys explain or enrich each other.", "Avoid confusion about who is who."],
  ["Branching narrative", "The audience practises making choices.", "Keep endings connected to the choices."],
  ["Character arc", "The message is about change.", "Avoid change that happens too suddenly."],
  ["Theme and symbol", "Repeated objects or ideas carry deeper meaning.", "Avoid overusing the symbol."],
];
const BRANCH = {
  a: "You ask a teacher for feedback. You learn which topics eat your time and adjust your weekly plan. Possible limit: it takes effort to ask and to act on advice.",
  b: "You build your own plan and keep going. You may enjoy full control and build discipline. Possible limit: blind spots stay hidden, so you may repeat the same mistakes.",
};
const FIELDS = [
  ["Purpose and audience", [["topic", "Story topic", "t"], ["audience", "Intended audience", "t"], ["message", "Main message", "t"]]],
  ["Character and goal", [["character", "Main character", "t"], ["goal", "Character’s goal", "t"], ["motive", "Motivation (why they want it)", "t"]]],
  ["Events and obstacles", [["beginning", "Beginning", "a"], ["middle", "Middle events (one per line)", "a"], ["obstacle", "Main obstacle", "t"]]],
  ["Turning point and resolution", [["turning", "Turning point", "t"], ["action", "Action or decision", "t"], ["ending", "Ending", "a"], ["lesson", "Lesson or message", "t"]]],
];
const LABELS = { topic: "Topic", audience: "Audience", message: "Main message", character: "Character", goal: "Goal", motive: "Motivation", beginning: "Beginning", middle: "Middle events", obstacle: "Obstacle", turning: "Turning point", action: "Action or decision", ending: "Ending", lesson: "Lesson" };
const QUIZ = [
  ["“A team builds an app, launches it and gets users.” Is this a strong storyline?", ["Yes, it has a clear sequence", "Not yet — it lists events but has no goal, challenge or reason to care", "Yes, because it has an ending"], 1, "It lists events but has no clear goal, challenge or reason to care."],
  ["What does conflict do in a story?", ["It decorates the story", "It blocks the goal and creates the need for a choice or change", "It ends the story"], 1, "Conflict blocks the goal and forces a choice or change."],
  ["What is a turning point?", ["The first sentence", "The moment events change direction", "The final message"], 1, "It is the moment events change direction."],
  ["You show a character failing a test at the start so the final success feels earned. Which technique is this?", ["Flashback", "Foreshadowing", "Branching"], 1, "An early hint that pays off later is foreshadowing."],
  ["Can you explain a storyline in two or three sentences?", ["Yes, if goal, challenge, key events and result are clear — otherwise it may be too scattered", "No, a storyline needs a full page", "Only if there are no characters"], 0, "If you can state goal, challenge, key events and result, you have found the core storyline. If not, the story may be too scattered."],
];
const CHECK = [
  "The audience and main message are clear.",
  "Events follow a logical order, and each one causes the next.",
  "The goal and challenge matter to the character and audience.",
  "The ending answers the central question or points to a meaningful next step.",
  "Pictures and visuals support the story and do not distract from it.",
];

/* ---------- Small shared pieces ---------- */
const Head = ({ tag, title, children }) => (
  <header className="sl-head">
    <span className="sl-eb">{tag}</span>
    <h2>{title}</h2>
    {children && <p className="sl-mu">{children}</p>}
  </header>
);

function Marquee({ children, tiles = false }) {
  return (
    <div className={`sl-mq ${tiles ? "tiles" : ""}`} aria-hidden="true">
      <div className="sl-mq-track">
        <div className="sl-mq-half">{children}</div>
        <div className="sl-mq-half">{children}</div>
      </div>
    </div>
  );
}

function PathFlow({ labels }) {
  return (
    <ol className="sl-path">
      {labels.map((t, i) => (
        <li key={t}><i>{i + 1}</i><b>{t}</b></li>
      ))}
    </ol>
  );
}

function Road({ active }) {
  const P = [[60, 200], [170, 140], [270, 185], [380, 110], [480, 150], [560, 60]];
  return (
    <svg viewBox="0 0 620 250" role="img" aria-label="Winding path through six levels" className="sl-svg">
      <path className="sl-dash" d="M60 200 C100 120 140 190 170 140 S250 200 270 185 S340 100 380 110 S450 160 480 150 S540 90 560 60" fill="none" stroke="#F97316" strokeWidth="6" strokeLinecap="round" strokeDasharray="14 14" />
      {P.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r={i === active ? 26 : 20} fill={i === active ? "var(--sl-pp)" : "var(--sl-sf)"} stroke="var(--sl-pp)" strokeWidth="4" />
          <text x={p[0]} y={p[1] + 7} textAnchor="middle" fontSize="20" fontWeight="700" fill={i === active ? "#fff" : "var(--sl-pp)"}>{i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

/* ---------- Observe ---------- */
function Observe() {
  const [perms, mix] = usePerms(OBS.map((q) => q[2].length));
  const [ans, setAns] = useState(OBS.map(() => -1));
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const check = () => {
    if (ans.includes(-1)) return setErr("Please answer all six questions.");
    setErr(""); setDone(true);
  };
  const retry = () => { setAns(OBS.map(() => -1)); setDone(false); setErr(""); mix(); };
  const score = ans.filter((a, i) => a === 0).length;
  return (
    <>
      <div className="sl-grid obs" role="group" aria-label="Six questions about the scenario">
        {OBS.map((q, i) => (
          <fieldset key={q[0]} className="sl-q" disabled={done}>
            <legend>{i + 1}. {q[0]} — {q[1]}</legend>
            {perms[i].map((oi) => (
              <label key={oi} className="sl-opt">
                <input type="radio" name={`obs${i}`} checked={ans[i] === oi} onChange={() => setAns(ans.map((a, k) => (k === i ? oi : a)))} />
                <span>{q[2][oi]}</span>
              </label>
            ))}
            {done && (
              <p className={`sl-ex ${ans[i] === 0 ? "ok" : "no"}`}>
                <strong>{ans[i] === 0 ? "✔ Matches the scenario. " : "✘ Not quite. "}</strong>{q[3]}
              </p>
            )}
          </fieldset>
        ))}
      </div>
      <div className="sl-row">
        {!done ? <button className="sl-btn" type="button" onClick={check}>Check my answers</button> : <button className="sl-btn o" type="button" onClick={retry}>Try again</button>}
      </div>
      {err && <p className="sl-er" role="alert">{err}</p>}
      {done && (
        <div className="sl-card nh" aria-live="polite">
          <strong>Your summary ({score}/6 match the scenario)</strong>
          <ul className="sl-l">{OBS.map((q, i) => <li key={q[0]}>{q[0]} {q[2][ans[i]]}</li>)}</ul>
        </div>
      )}
    </>
  );
}

/* ---------- Roadmap ---------- */
function Roadmap() {
  const [i, setI] = useState(0);
  const l = LEVELS[i];
  const onKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") setI((i + 1) % 6);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") setI((i + 5) % 6);
  };
  return (
    <>
      <div className="sl-rm" role="tablist" aria-label="Six levels" onKeyDown={onKey}>
        {LEVELS.map((lv, k) => (
          <button key={lv[0]} role="tab" aria-selected={i === k} tabIndex={i === k ? 0 : -1} onClick={() => setI(k)}>
            <i>{k + 1}</i><span>{lv[0]}</span>
          </button>
        ))}
      </div>
      <div className="sl-card nh sl-split" role="tabpanel" aria-live="polite">
        <div>
          <span className="sl-mini">Level {i + 1}</span>
          <h3>{l[0]}</h3>
          <p>{l[1]}</p>
          <a className="sl-btn" href={l[2]}>{l[3]}</a>
        </div>
        <Road active={i} />
      </div>
      <p className="sl-note">Progress is not tracked on this page, so no levels are marked complete.</p>
    </>
  );
}

/* ---------- Case + branching ---------- */
function Case() {
  const [i, setI] = useState(0);
  return (
    <>
      <div className="sl-tabs" role="tablist" aria-label="Case study scenes">
        {CASE.map((c, k) => (
          <button key={c[0]} role="tab" aria-selected={i === k} onClick={() => setI(k)}>{k + 1}. {c[0]}</button>
        ))}
        <button role="tab" aria-selected={i === 4} onClick={() => setI(4)}>Full summary</button>
      </div>
      <div className="sl-card nh" aria-live="polite">
        {i === 4 ? (
          <p><strong>Summary:</strong> A student struggles with time management and misses practice tests. She builds a weekly study plan, asks a teacher for feedback and improves her final score. <em>Message: small, steady habits can change results.</em></p>
        ) : (
          <>
            <h3>{CASE[i][0]}</h3>
            <p>{CASE[i][1]}</p>
            <p><strong>Why it matters:</strong> {CASE[i][2]}</p>
            <p><strong>What it leads to:</strong> {CASE[i][3]}</p>
          </>
        )}
      </div>
    </>
  );
}

function Branch() {
  const [b, setB] = useState(null);
  return (
    <div>
      <h3>Try a branching story: do you ask for help or study alone?</h3>
      <div className="sl-tabs">
        <button aria-pressed={b === "a"} onClick={() => setB("a")}>Ask for help</button>
        <button aria-pressed={b === "b"} onClick={() => setB("b")}>Study alone</button>
      </div>
      <div className="sl-card nh" aria-live="polite">{b ? BRANCH[b] : "Choose an option to see what might happen."}</div>
      <p className="sl-note">Illustrative learning scenarios, not guaranteed real-life outcomes.</p>
    </div>
  );
}
function BranchMap() {
  return (
    <svg viewBox="0 0 620 230" role="img" aria-label="Branching story map" className="sl-svg">
      <g fill="none" stroke="#F97316" strokeWidth="4" strokeDasharray="10 10" className="sl-dash">
        <path d="M110 115 C180 115 190 50 270 50 L380 50" />
        <path d="M110 115 C180 115 190 180 270 180 L380 180" />
      </g>
      <g fontWeight="700" textAnchor="middle" fontSize="17">
        <rect x="20" y="92" width="110" height="46" rx="12" fill="var(--sl-pp)" />
        <text x="75" y="121" fill="#fff">Choice</text>
        <rect x="380" y="26" width="200" height="48" rx="12" fill="var(--sl-sf)" stroke="#16A34A" strokeWidth="3" />
        <text x="480" y="56" fill="#16A34A">Feedback</text>
        <rect x="380" y="156" width="200" height="48" rx="12" fill="var(--sl-sf)" stroke="#F97316" strokeWidth="3" />
        <text x="480" y="186" fill="#EA580C">Independence</text>
        <text x="250" y="38" fill="var(--sl-mu)" fontSize="14">Ask for help</text>
        <text x="250" y="206" fill="var(--sl-mu)" fontSize="14">Study alone</text>
      </g>
    </svg>
  );
}

/* ---------- Builder ---------- */
function Builder({ S, setS }) {
  const [step, setStep] = useState(0);
  const [errs, setErrs] = useState({});
  const set = (k, v) => setS((s) => ({ ...s, [k]: v }));
  const next = () => {
    if (step === 4) { document.getElementById("sl-checklist")?.scrollIntoView({ behavior: "smooth" }); return; }
    const e = {};
    FIELDS[step][1].forEach(([k]) => { if (!(S[k] || "").trim()) e[k] = "This field is required."; });
    setErrs(e);
    if (!Object.keys(e).length) setStep(step + 1);
  };
  const reset = () => { if (window.confirm("Clear everything you entered?")) { setS({}); setStep(0); setErrs({}); } };
  const filled = Object.keys(LABELS).filter((k) => (S[k] || "").trim());
  return (
    <div className="sl-split top">
      <form className="sl-card nh" noValidate onSubmit={(e) => e.preventDefault()}>
        <div className="sl-bar" aria-hidden="true">{range(5).map((k) => <span key={k} className={k <= step ? "on" : ""} />)}</div>
        {step < 4 ? (
          <>
            <h3>Step {step + 1} of 5: {FIELDS[step][0]}</h3>
            {FIELDS[step][1].map(([k, label, type]) => (
              <div key={k}>
                <label className="sl-f" htmlFor={`sl_${k}`}>{label} *</label>
                {type === "a"
                  ? <textarea id={`sl_${k}`} rows={3} value={S[k] || ""} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errs[k]} aria-describedby={`sle_${k}`} />
                  : <input id={`sl_${k}`} type="text" value={S[k] || ""} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errs[k]} aria-describedby={`sle_${k}`} />}
                <div className="sl-er" id={`sle_${k}`} role="alert">{errs[k] || ""}</div>
              </div>
            ))}
          </>
        ) : (
          <>
            <h3>Step 5 of 5: Preview and review</h3>
            <p>Check your story in the preview. Use Back to edit anything, then continue to the checklist.</p>
            <p className="sl-mu"><strong>{S.character || "[Character]"}</strong> wants <strong>{S.goal || "[goal]"}</strong>, but <strong>{S.obstacle || "[obstacle]"}</strong>. They <strong>{S.action || "[action]"}</strong>, and <strong>{S.ending || "[result]"}</strong>. The message: <strong>{S.lesson || "[lesson]"}</strong>.</p>
          </>
        )}
        <div className="sl-row">
          {step > 0 && <button className="sl-btn o" type="button" onClick={() => setStep(step - 1)}>Back</button>}
          <button className="sl-btn" type="button" onClick={next}>{step === 4 ? "Go to checklist" : "Next"}</button>
          <button className="sl-btn o" type="button" onClick={reset}>Reset</button>
        </div>
      </form>
      <div className="sl-card nh">
        <strong>Live preview</strong>
        {filled.length ? (
          <dl className="sl-pv">{filled.map((k) => <div key={k}><dt>{LABELS[k]}</dt><dd>{S[k]}</dd></div>)}</dl>
        ) : <p className="sl-mu">Your answers will appear here as you type.</p>}
      </div>
    </div>
  );
}

/* ---------- Quiz ---------- */
function Quiz() {
  const [perms, mix] = usePerms(QUIZ.map((q) => q[1].length));
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState(-1);
  const [sent, setSent] = useState(false);
  const [ans, setAns] = useState([]);
  const [err, setErr] = useState("");
  const q = QUIZ[qi];
  const submit = () => {
    if (picked < 0) return setErr("Please choose an answer.");
    setErr(""); setSent(true); setAns((a) => { const n = [...a]; n[qi] = picked; return n; });
  };
  const next = () => { setQi(qi + 1); setPicked(-1); setSent(false); };
  const retry = () => { setQi(0); setPicked(-1); setSent(false); setAns([]); mix(); };
  if (qi >= QUIZ.length) {
    const n = ans.filter((a, i) => a === QUIZ[i][2]).length;
    return (
      <div className="sl-card nh" aria-live="polite">
        <h3>Quiz Score: {n} / {QUIZ.length}</h3>
        <ul className="sl-l">{QUIZ.map((x, i) => <li key={i}>{ans[i] === x[2] ? "✔" : "✘"} {x[0]}<br /><span className="sl-note">{x[3]}</span></li>)}</ul>
        <button className="sl-btn" type="button" onClick={retry}>Retry</button>
      </div>
    );
  }
  return (
    <div className="sl-card nh" aria-live="polite">
      <fieldset className="sl-q plain" disabled={sent}>
        <legend>Question {qi + 1} of {QUIZ.length}: {q[0]}</legend>
        {perms[qi].map((oi) => (
          <label key={oi} className="sl-opt">
            <input type="radio" name="slquiz" checked={picked === oi} onChange={() => setPicked(oi)} />
            <span>{q[1][oi]}</span>
          </label>
        ))}
      </fieldset>
      {err && <p className="sl-er" role="alert">{err}</p>}
      {sent && <p className={`sl-ex ${picked === q[2] ? "ok" : "no"}`}><strong>{picked === q[2] ? "✔ Correct. " : "✘ Not quite. "}</strong>{q[3]}</p>}
      <div className="sl-row">
        {!sent ? <button className="sl-btn" type="button" onClick={submit}>Submit answer</button>
          : <button className="sl-btn" type="button" onClick={next}>{qi === QUIZ.length - 1 ? "See Quiz Score" : "Next question"}</button>}
      </div>
    </div>
  );
}

/* ---------- Outcome (result + next steps, merged) ---------- */
function Outcome({ S, cc }) {
  const [msg, setMsg] = useState("");
  const keys = Object.keys(LABELS).filter((k) => (S[k] || "").trim());
  const copy = async () => {
    if (!keys.length) return setMsg("Nothing to copy yet.");
    try { await navigator.clipboard.writeText(keys.map((k) => `${LABELS[k]}: ${S[k]}`).join("\n")); setMsg("Copied."); }
    catch { setMsg("Copy is not available in this browser."); }
  };
  return (
    <section className="sl-cta" id="sl-outcome">
      <div className="sl-wrap sl-cta-in">
        <div><h2>Your story is <em>taking shape.</em></h2><p>A storyline is a connected journey in which each event moves the story towards an outcome.</p></div>
        <div className="sl-row nm">
          <a className="sl-btn orange" href="#sl-checklist">Review My Story</a>
          <a className="sl-btn o" href="#sl-builder">Edit My Story</a>
          <button className="sl-btn o" type="button" onClick={copy}>Copy as text</button>
        </div>
        <div className="sl-card nh full">
          {keys.length ? (
            <>
              <h3>{S.topic || "Your storyline"}</h3>
              <dl className="sl-pv wide">
                {keys.filter((k) => k !== "topic").map((k) => <div key={k}><dt>{LABELS[k]}</dt><dd>{S[k]}</dd></div>)}
                <div><dt>Review checklist</dt><dd>{cc.filter(Boolean).length} of {CHECK.length} items checked</dd></div>
              </dl>
            </>
          ) : <p className="sl-mu">Your finished storyline will appear here once you use the builder.</p>}
        </div>
        <span className="sl-note" aria-live="polite">{msg}</span>
        <div className="sl-next" id="sl-next">
          <div>
            <h3>Keep building your life skills.</h3>
            <p>Tell your story to a friend or mentor and ask them to name its goal, challenge and result. If they cannot, revise it. Related areas: Communication and Career Readiness.</p>
          </div>
          <a className="sl-btn orange" href="#sl-roadmap">Continue Learning</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function Storyline({
  heroSrc = typeof heroImg === "string" ? heroImg : heroImg.src,
  theme: themeProp,
  toggleTheme: toggleThemeProp,
  setShowLoginModal,
  scrollToSection,
}) {
  // Theme: use the parent's if given, otherwise keep our own (same logic as PersonalityDevelopment).
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const s = localStorage.getItem("theme");
      if (s) return s === "dark";
      return document.documentElement.classList.contains("dark");
    } catch { return false; }
  });
  const controlled = themeProp !== undefined;
  const theme = controlled ? themeProp : darkMode ? "dark" : "light";
  const toggleTheme = () => {
    if (controlled && toggleThemeProp) { toggleThemeProp(); return; }
    setDarkMode((p) => {
      const n = !p;
      try { localStorage.setItem("theme", n ? "dark" : "light"); document.documentElement.classList.toggle("dark", n); } catch {}
      return n;
    });
  };
  useEffect(() => {
    const f = (e) => e.key === "theme" && setDarkMode(e.newValue === "dark");
    window.addEventListener("storage", f);
    return () => window.removeEventListener("storage", f);
  }, []);
  const [S, setS] = useState({});
  const [cc, setCc] = useState(CHECK.map(() => false));
  const facts = [
    ["For", "Students, job-seekers, early-career learners"],
    ["Format", "Self-paced"],
    ["Time", shown(CONFIG.time)],
    ["Cost", shown(CONFIG.cost)],
    ["Outcome", "One finished storyline, reviewed with a checklist"],
  ];
  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={setShowLoginModal} scrollToSection={scrollToSection}>
    <div className="sl" id="sl-top" data-theme={theme}>
      <style>{CSS}</style>

      {/* ===== PHASE 1: INTRODUCE ===== */}

      {/* Hero */}
      <section className="sl-sec sl-hero-sec">
        <div className="sl-wrap sl-hero">
          <div>
            <span className="sl-eb">Life Skills / Storyline</span>
            <h1>Turn Your Ideas Into Stories That Matter.</h1>
            <p className="sl-mu">Learn how to structure ideas, develop characters, build meaningful challenges and create stories that people understand and remember.</p>
            <div className="sl-row">
              <a className="sl-btn" href="#sl-roadmap">Start Learning</a>
              <a className="sl-btn o" href="#sl-concept">Explore the Journey</a>
            </div>
            <div className="sl-pills"><span>6 learning levels</span><span>Self-paced</span><span>Practical storyline project</span></div>
          </div>
          <figure className="sl-hv">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroSrc} alt="A student planning a story at a desk with a notebook and laptop" width="355" height="222" />
            <figcaption className="sl-flowchips" aria-label="Storyline progression">{FLOW.map((f) => <span key={f}>{f}</span>)}</figcaption>
          </figure>
        </div>
      </section>

      <Marquee>{range(4).map((n) => <span key={n} className="sl-mq-i">{FLOW.join(" → ")} →</span>)}</Marquee>

      {/* Facts */}
      <section className="sl-sec alt compact">
        <div className="sl-wrap">
          <div className="sl-grid f5">{facts.map((f) => <div key={f[0]} className="sl-card hov"><span className="sl-mini">{f[0]}</span><p>{f[1]}</p></div>)}</div>
          <p className="sl-note">Here, <em>storyline</em> means how a story is structured — not the Articulate Storyline software.</p>
        </div>
      </section>

      {/* ===== PHASE 2: UNDERSTAND ===== */}

      {/* Concept */}
      <section className="sl-sec" id="sl-concept">
        <div className="sl-wrap">
          <Head tag="What is a storyline?" title="Every Great Story Has a Journey.">
            A storyline is the sequence of connected events in a story. It shows what happens, who it happens to, what goes wrong, how things change and why the story matters.
          </Head>
          <PathFlow labels={FLOW} />
          <p className="sl-quote">“A story is not just a list of events. Each event should lead to the next, and the ending should support the message.”</p>
        </div>
      </section>

      {/* Why */}
      <section className="sl-sec alt">
        <div className="sl-wrap">
          <Head tag="Why learn it" title="Turn Disconnected Ideas Into Meaningful Stories." />
          <div className="sl-grid g4">{WHY.map((w) => <div key={w[0]} className="sl-card hov"><h3>{w[0]}</h3><p>{w[1]}</p></div>)}</div>
        </div>
      </section>

      {/* Observe */}
      <section className="sl-sec" id="sl-observe">
        <div className="sl-wrap">
          <Head tag="Observe" title="Learn to Spot the Story Behind Every Situation.">Storylines appear in websites, videos, presentations, lessons, adverts and real life. Ask six questions.</Head>
          <PathFlow labels={["Who?", "Wants what?", "Why now?", "Blocks", "Changes", "Result"]} />
          <div className="sl-card nh scn"><strong>Scenario</strong><p>A student wants to pass an examination but repeatedly runs out of time. The student builds a weekly study plan, asks a teacher for feedback and improves the final score.</p></div>
          <Observe />
        </div>
      </section>

      {/* ===== PHASE 3: LEARN (follows Roadmap level order 1 → 6) ===== */}

      {/* Roadmap */}
      <section className="sl-sec alt" id="sl-roadmap">
        <div className="sl-wrap">
          <Head tag="Your path" title="Your Journey From Storytelling Basics to Advanced Techniques." />
          <Roadmap />
        </div>
      </section>

      {/* Level 1: Steps */}
      <section className="sl-sec" id="sl-steps">
        <div className="sl-wrap">
          <Head tag="Create" title="Build Your Own Story, One Step at a Time." />
          <div className="sl-grid g3">{STEPS.map((s, i) => <div key={s[0]} className="sl-card hov"><span className="sl-num">{i + 1}</span><h3>{s[0]}</h3><p>{s[1]}</p></div>)}</div>
          <div className="sl-card hov tpl"><strong>Template</strong><p>[Character] wants [goal], but [obstacle]. They [action or choice], and [result]. The message: [lesson].</p></div>
          <div className="sl-row"><a className="sl-btn" href="#sl-builder">Build My Storyline</a></div>
        </div>
      </section>

      {/* Level 2: Compare */}
      <section className="sl-sec alt" id="sl-compare">
        <div className="sl-wrap">
          <Head tag="Compare" title="See the Difference Between Events and a Real Story." />
          <div className="sl-grid g2">
            <div className="sl-card hov weak">
              <span className="sl-tag">Weak Storyline</span>
              <h3>“A student studies, takes an exam and passes.”</h3>
              <div className="sl-bd wk"><div>Studies</div><i>·</i><div>Takes exam</div><i>·</i><div>Passes</div></div>
              <p>Lists events, but there is no meaningful goal, challenge or change.</p>
            </div>
            <div className="sl-card hov strong">
              <span className="sl-tag g">Strong Storyline</span>
              <h3>“A student struggles with time management and misses practice tests. She builds a weekly study plan, asks a teacher for feedback and improves her final score.”</h3>
              <div className="sl-bd"><div>Struggle</div><i>→</i><div>Decision</div><i>→</i><div>Outcome</div></div>
              <p><strong>Message:</strong> small, steady habits can change results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Level 3: Glossary */}
      <section className="sl-sec" id="sl-glossary">
        <div className="sl-wrap">
          <Head tag="Terminology" title="Understand the Language of Storytelling." />
        </div>
        <Marquee tiles>
          {range(2).map((n) => GLOSSARY.map((g) => <a key={n + g[0]} href="#sl-glossary-grid" tabIndex={-1}><span>{g[0]}</span><small>Open →</small></a>))}
        </Marquee>
        <div className="sl-wrap" id="sl-glossary-grid">
          <div className="sl-grid g3">{GLOSSARY.map((g) => <div key={g[0]} className="sl-card hov"><h3>{g[0]}</h3><p>{g[1]}</p><p><em>Example:</em> {g[2]}</p></div>)}</div>
        </div>
      </section>

      {/* Level 4: Case */}
      <section className="sl-sec alt" id="sl-case">
        <div className="sl-wrap">
          <Head tag="Case study" title="Follow One Story From Challenge to Outcome." />
          <PathFlow labels={CASE.map((c) => c[0])} />
          <Case />
        </div>
      </section>

      {/* Level 5: Advanced */}
      <section className="sl-sec" id="sl-advanced">
        <div className="sl-wrap">
          <Head tag="Advanced" title="Go Beyond the Basics." />
          <div className="sl-grid g3">{ADV.map((a) => <div key={a[0]} className="sl-card hov"><h3>{a[0]}</h3><p>{a[1]}</p><p><em>Careful:</em> {a[2]}</p></div>)}</div>
          <div className="sl-split top gap"><Branch /><BranchMap /></div>
        </div>
      </section>

      {/* ===== PHASE 4: PRACTICE ===== */}

      {/* Lab */}
      <section className="sl-sec alt" id="sl-lab">
        <div className="sl-wrap">
          <Head tag="Practical lab · 30–45 minutes" title="Now Create a Story From Your Own Experience.">Pick a real challenge — a hard exam, a group project or a first interview — and work through these steps.</Head>
          <ol className="sl-lab">
            {["Write the purpose sentence.", "List the beginning, three middle events and the ending.", "Define the goal and motivation.", "Name the main obstacle.", "Write the result and lesson.", "Read it aloud and cut what does not move the story."].map((t, i) => <li key={t} className="sl-card hov"><span className="sl-num">{i + 1}</span>{t}</li>)}
          </ol>
          <div className="sl-row"><a className="sl-btn" href="#sl-builder">Start My Story</a></div>
        </div>
      </section>

      {/* Builder */}
      <section className="sl-sec" id="sl-builder">
        <div className="sl-wrap">
          <Head tag="Builder" title="Bring Your Story to Life.">Your answers stay on this page during your visit. Nothing is saved to a server — copy your story before closing.</Head>
          <Builder S={S} setS={setS} />
        </div>
      </section>

      {/* ===== PHASE 5: CHECK ===== */}

      {/* Quiz */}
      <section className="sl-sec alt" id="sl-quiz">
        <div className="sl-wrap"><Head tag="Knowledge check" title="Check What You Have Learned." /><Quiz /></div>
      </section>

      {/* Level 6: Checklist */}
      <section className="sl-sec" id="sl-checklist">
        <div className="sl-wrap">
          <Head tag="Review" title="Make Your Story Clear, Connected and Meaningful." />
          <div className="sl-ck">
            {CHECK.map((c, i) => (
              <label key={c} className="sl-chk">
                <input type="checkbox" checked={cc[i]} onChange={() => setCc(cc.map((v, k) => (k === i ? !v : v)))} />
                <span>{c}</span>
              </label>
            ))}
          </div>
          <p><strong>Checklist: {cc.filter(Boolean).length} of {CHECK.length} checked</strong> <span className="sl-note">(self-review only; separate from the Quiz Score)</span></p>
        </div>
      </section>

      {/* ===== PHASE 6: FINISH (result + next steps) ===== */}
      <Outcome S={S} cc={cc} />
    </div>
    </PublicLayout>
  );
}

/* ---------- Styles (scoped under .sl) ---------- */
const CSS = `
.sl{--sl-pp:#5B3FD9;--sl-or:#F97316;--sl-gr:#16A34A;--sl-bg:#F8F9FC;--sl-sf:#fff;--sl-tx:#1E2433;--sl-mu:#5B6475;--sl-bd:#E0E4EE;--sl-gl:#E9ECF4;--sl-tint:rgba(238,240,250,.75);--sl-ord:#C2410C;--sl-teal:#0E7C7C;
 --sl-pad:max(clamp(16px,3.2vw,48px),env(safe-area-inset-left));--sl-padr:max(clamp(16px,3.2vw,48px),env(safe-area-inset-right));
 font-family:inherit;color:var(--sl-tx);line-height:1.6;background-color:var(--sl-bg);background-image:linear-gradient(var(--sl-gl) 1px,transparent 1px),linear-gradient(90deg,var(--sl-gl) 1px,transparent 1px);background-size:28px 28px;overflow-x:clip;-webkit-text-size-adjust:100%;scroll-behavior:smooth}
.sl[data-theme="dark"]{--sl-bg:#12141C;--sl-gl:#1B1F2B;--sl-pp:#A594FF;--sl-sf:#1B1E29;--sl-tx:#EEF0F7;--sl-mu:#A9B0C2;--sl-bd:#2D3243;--sl-tint:rgba(30,34,48,.75);--sl-ord:#FDBA74;--sl-teal:#5EEAD4}
.sl *,.sl *::before,.sl *::after{box-sizing:border-box}
.sl [id]{scroll-margin-top:110px}
.sl h1,.sl h2,.sl h3{line-height:1.15;margin:0 0 .5em;font-family:var(--font-heading,inherit);font-weight:700;overflow-wrap:anywhere}
.sl h1{font-size:clamp(1.9rem,5.2vw,3.3rem);color:var(--sl-pp)}.sl h2{font-size:clamp(1.45rem,3.4vw,2.2rem);color:var(--sl-pp)}.sl h3{font-size:clamp(1rem,1.6vw,1.15rem)}
.sl p{margin:.3em 0 0}.sl a{color:inherit}
.sl-wrap{width:100%;margin:0;padding-left:var(--sl-pad);padding-right:var(--sl-padr)}
.sl-sec{padding:clamp(40px,6vw,72px) 0}.sl-sec.alt{background:var(--sl-tint)}.sl-sec.compact{padding:clamp(24px,3vw,36px) 0}
.sl-head{margin-bottom:clamp(18px,3vw,28px);max-width:900px}
.sl-eb{display:inline-block;font-size:.72rem;letter-spacing:.08em;font-weight:700;color:var(--sl-teal);border:1.5px solid var(--sl-teal);border-radius:999px;padding:3px 12px;text-transform:uppercase;margin-bottom:14px}
.sl-mu{color:var(--sl-mu)}.sl-note{font-size:.85rem;color:var(--sl-mu)}.sl-mini{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--sl-ord)}
.sl-quote{font-weight:600;margin-top:20px;max-width:900px}
.sl-btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 20px;border-radius:10px;border:1.5px solid var(--sl-pp);background:var(--sl-pp);color:#fff!important;font:600 .95rem/1.2 inherit;font-family:inherit;cursor:pointer;text-decoration:none;text-align:center;transition:filter .2s,background .2s;-webkit-tap-highlight-color:transparent}
.sl-btn:hover{filter:brightness(.93)}.sl-btn.o{background:transparent;color:var(--sl-pp)!important}.sl-btn.o:hover{background:var(--sl-tint);filter:none}.sl-btn.orange{background:var(--sl-or);border-color:var(--sl-or)}
.sl :focus-visible{outline:3px solid var(--sl-gr);outline-offset:2px}
.sl-row{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.sl-row.nm{margin:0}
.sl-hero{display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(24px,4vw,56px);align-items:center}
.sl-hv{margin:0;background:var(--sl-sf);border:1px solid var(--sl-bd);border-radius:16px;padding:16px;text-align:center}.sl-hv img{width:min(100%,380px);height:auto;margin:0 auto;border-radius:10px;display:block}
.sl-pills,.sl-flowchips{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.sl-flowchips{justify-content:center;margin-top:14px}
.sl-pills span,.sl-flowchips span{background:var(--sl-sf);border:1px solid var(--sl-bd);border-radius:999px;padding:4px 14px;font-size:.85rem;font-weight:500}
.sl-flowchips span{border-radius:8px;padding:4px 10px;font-size:.8rem}
.sl-grid{display:grid;gap:16px}.sl-grid.g2{grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))}.sl-grid.g3{grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}.sl-grid.g4{grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))}.sl-grid.f5{grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))}.sl-grid.obs{grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));margin-top:18px}
.sl-card{background:var(--sl-sf);border:1px solid var(--sl-bd);border-radius:12px;padding:clamp(14px,2vw,20px);min-width:0}.sl-card p{color:var(--sl-mu);font-size:.95rem}
.sl-card.nh,.sl-card.scn{margin-top:16px}.sl-card.tpl{margin-top:16px}
.sl-num{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--sl-pp);color:#fff;font-weight:700;margin-bottom:8px;flex:none}
.sl-card,.sl-pills span,.sl-flowchips span,.sl-chk,.sl-bd div{transition:background .25s,color .25s,transform .25s,box-shadow .25s,border-color .25s}
@media (hover:hover){.sl-card.hov:hover,.sl-chk:hover,.sl-pills span:hover{background:linear-gradient(135deg,#C2410C,#F97316);color:#fff;border-color:#F97316;transform:translateY(-4px);box-shadow:0 14px 28px rgba(194,65,12,.28)}.sl-card.hov:hover *{color:#fff!important}.sl-card.hov:hover .sl-tag{color:#111!important}.sl-card.hov:hover .sl-tag.g{color:#fff!important}.sl-card.hov:hover .sl-bd div{background:var(--sl-sf);color:var(--sl-tx)!important}.sl-card.hov:hover .sl-num{background:#fff}.sl-card.hov:hover .sl-num{color:#C2410C!important}}
.sl-tag{display:inline-block;font-size:.75rem;font-weight:700;padding:2px 10px;border-radius:999px;background:#B8B0A4;color:#111;margin-bottom:10px}.sl-tag.g{background:var(--sl-gr);color:#fff}
.sl-card.weak{border:2px dashed #B8B0A4}.sl-card.strong{border:2px solid var(--sl-gr)}
.sl-bd{display:flex;gap:8px;align-items:stretch;margin:12px 0}.sl-bd div{flex:1;border:1.5px solid var(--sl-bd);border-radius:10px;padding:10px 6px;text-align:center;font-weight:600;font-size:.88rem;background:var(--sl-sf);color:var(--sl-tx);display:flex;align-items:center;justify-content:center}.sl-bd i{align-self:center;color:var(--sl-gr);font-weight:700;font-style:normal}.sl-bd.wk div{opacity:.75;border-style:dashed}.sl-bd.wk i{color:#999}
.sl-path{display:flex;list-style:none;margin:8px 0 0;padding:0}.sl-path li{flex:1;text-align:center;position:relative;padding:0 6px;min-width:0}
.sl-path i{display:grid;place-items:center;width:clamp(44px,5vw,56px);height:clamp(44px,5vw,56px);margin:0 auto 8px;border-radius:50%;background:var(--sl-sf);border:3px solid var(--sl-pp);font:700 1.1rem inherit;font-style:normal;color:var(--sl-pp);position:relative;z-index:1}
.sl-path li:not(:last-child)::after{content:"";position:absolute;top:calc(clamp(44px,5vw,56px)/2 - 2px);left:50%;width:100%;height:4px;background:repeating-linear-gradient(90deg,var(--sl-or) 0 12px,transparent 12px 24px);background-size:24px 4px;animation:sl-dash 1s linear infinite}
.sl-path b{display:block;font-size:.88rem;overflow-wrap:anywhere}
@media(max-width:640px){.sl-path{flex-direction:column;gap:14px}.sl-path li{display:flex;gap:14px;align-items:center;text-align:left;padding:0}.sl-path i{margin:0;flex:none}.sl-path li:not(:last-child)::after{top:calc(clamp(44px,5vw,56px) + 2px);left:calc(clamp(44px,5vw,56px)/2 - 2px);width:4px;height:14px;background:repeating-linear-gradient(180deg,var(--sl-or) 0 8px,transparent 8px 14px);animation:none}}
.sl-rm{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;position:relative;margin:8px 0 20px}.sl-rm::before{content:"";position:absolute;top:23px;left:4%;right:4%;height:4px;background:repeating-linear-gradient(90deg,var(--sl-or) 0 10px,transparent 10px 18px);animation:sl-dash 1s linear infinite}
.sl-rm button{position:relative;background:none;border:0;cursor:pointer;color:var(--sl-tx);font:500 .85rem inherit;font-family:inherit;text-align:center;padding:0 2px;min-height:44px}.sl-rm i{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--sl-sf);border:3px solid var(--sl-or);margin:0 auto 6px;font-style:normal;font-weight:700}.sl-rm button[aria-selected=true] i{background:var(--sl-pp);border-color:var(--sl-pp);color:#fff}.sl-rm button[aria-selected=true] span{font-weight:700}
@media(max-width:700px){.sl-rm{grid-template-columns:1fr;gap:6px}.sl-rm::before{top:0;bottom:0;left:22px;right:auto;width:4px;height:auto;background:repeating-linear-gradient(180deg,var(--sl-or) 0 10px,transparent 10px 18px);animation:none}.sl-rm button{display:flex;align-items:center;gap:12px;text-align:left}.sl-rm i{margin:0;flex:none}}
.sl-split{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,3vw,32px);align-items:center}.sl-split.top{align-items:start}.sl-split.gap{margin-top:28px}.sl-split>*{min-width:0}
.sl-svg{width:100%;height:auto;display:block}.sl-dash{animation:sl-dd 1.2s linear infinite}
.sl-q{border:1px solid var(--sl-bd);background:var(--sl-sf);border-radius:12px;padding:18px;margin:0;min-width:0}.sl-q.plain{border:0;padding:0;background:transparent}
.sl-q legend{float:left;width:100%;padding:0;margin:0 0 10px;font-weight:600;line-height:1.35}.sl-q legend+*{clear:both}
.sl-opt{display:flex;gap:10px;align-items:flex-start;padding:8px 6px;border-radius:8px;cursor:pointer;min-height:44px}.sl-opt input{margin-top:4px;accent-color:var(--sl-pp);width:20px;height:20px;flex:none}
.sl-ex{font-size:.9rem;margin-top:8px;padding:8px 12px;border-radius:8px;background:var(--sl-tint);color:var(--sl-tx)!important;border-left:4px solid var(--sl-or)}.sl-ex.ok{border-left-color:var(--sl-gr)}
.sl-er{color:#B91C1C;font-size:.85rem;min-height:1.2em;margin:.3em 0 0}.sl[data-theme="dark"] .sl-er{color:#FCA5A5}
.sl-l{margin:.5em 0;padding-left:1.2em}
.sl-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.sl-tabs button{border:1px solid var(--sl-bd);background:var(--sl-sf);color:var(--sl-tx);border-radius:10px;padding:10px 14px;font:500 .9rem inherit;font-family:inherit;cursor:pointer;min-height:44px}.sl-tabs button[aria-selected=true],.sl-tabs button[aria-pressed=true]{background:var(--sl-pp);color:#fff;border-color:var(--sl-pp)}
.sl-f{display:block;font-weight:600;margin:12px 0 4px;font-size:.92rem}
.sl input[type=text],.sl textarea{width:100%;font:inherit;font-size:16px;padding:10px 12px;border:1px solid var(--sl-bd);border-radius:10px;background:var(--sl-bg);color:var(--sl-tx)}
.sl-bar{display:flex;gap:6px;margin-bottom:14px}.sl-bar span{flex:1;height:6px;border-radius:3px;background:var(--sl-bd)}.sl-bar span.on{background:var(--sl-or)}
.sl-pv{margin:8px 0 0}.sl-pv dt{font-size:.75rem;text-transform:uppercase;letter-spacing:.06em;color:var(--sl-ord);margin-top:10px;font-weight:700}.sl-pv dd{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}.sl-pv.wide{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:2px 24px}
.sl-lab{list-style:none;margin:0;padding:0;display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}.sl-lab li{display:flex;gap:12px;align-items:center;font-weight:500}.sl-lab .sl-num{margin:0}
.sl-ck{display:grid;gap:8px;margin-bottom:14px;max-width:900px}.sl-chk{display:flex;gap:12px;padding:12px;border:1px solid var(--sl-bd);border-radius:12px;background:var(--sl-sf);cursor:pointer;min-height:44px;align-items:flex-start}.sl-chk input{width:22px;height:22px;accent-color:var(--sl-gr);margin-top:2px;flex:none}
.sl-cta{background:var(--sl-sf);border-block:1px solid var(--sl-bd);padding:clamp(22px,3vw,32px) 0}.sl-cta-in{display:flex;flex-wrap:wrap;gap:20px 32px;align-items:center;justify-content:space-between}.sl-cta h2{margin:0 0 6px}.sl-cta h2 em{color:var(--sl-or);font-style:normal}.sl-cta p{color:var(--sl-mu);margin:0;max-width:760px}.sl-card.full{flex:1 1 100%;background:var(--sl-bg);margin-top:0}
.sl-next{flex:1 1 100%;display:flex;flex-wrap:wrap;gap:12px 24px;align-items:center;justify-content:space-between;border-top:1px solid var(--sl-bd);padding-top:20px}.sl-next h3{margin:0 0 4px;color:var(--sl-pp)}
.sl-mq{overflow:hidden;background:var(--sl-pp);color:#fff;padding:12px 0;font-weight:600;white-space:nowrap;display:flex}
.sl-mq-track{display:flex;width:max-content;animation:sl-mq 40s linear infinite}.sl-mq-half{display:flex;flex:none}.sl-mq-i{margin:0 22px}.sl-mq:hover .sl-mq-track{animation-play-state:paused}
.sl-mq.tiles{background:transparent;padding:6px 0;margin-bottom:20px}.sl-mq.tiles .sl-mq-track{animation-duration:50s}
.sl-mq.tiles a{display:block;margin:0 8px;padding:14px 26px;min-width:150px;background:var(--sl-sf);border:1px solid var(--sl-bd);border-radius:12px;text-decoration:none;color:#EA580C;font-weight:700;transition:all .25s}.sl-mq.tiles small{display:none;font-weight:500;font-size:.8rem}
@media (hover:hover){.sl-mq.tiles a:hover{background:linear-gradient(135deg,#C2410C,#F97316);color:#fff;transform:translateY(-4px);box-shadow:0 14px 28px rgba(194,65,12,.28);border-color:#F97316}.sl-mq.tiles a:hover small{display:block}}
@keyframes sl-mq{to{transform:translateX(-50%)}}@keyframes sl-dash{to{background-position:24px 0}}@keyframes sl-dd{to{stroke-dashoffset:-40}}
@media(max-width:900px){.sl-hero,.sl-split{grid-template-columns:1fr}.sl-hv{max-width:520px;width:100%;margin:0 auto}}
@media(max-width:430px){.sl-row .sl-btn{flex:1 1 100%}.sl-bd{flex-direction:column}.sl-bd i{transform:rotate(90deg)}}
@media(min-width:1700px){.sl{font-size:18px}}
@media(prefers-reduced-motion:reduce){.sl{scroll-behavior:auto}.sl *{animation:none!important;transition:none!important}}
`;