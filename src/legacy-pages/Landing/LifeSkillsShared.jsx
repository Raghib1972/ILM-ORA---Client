"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import "./LifeSkills.css";
// Wahi shared navbar + footer jo ManagerHub / Careers / About / Pricing use karte hain
import PublicLayout from "./components/PublicLayout";

/* ------------------------------------------------------------------
   SHARED PIECES for the 3 Life Skills pages:
     LifeSkills.jsx     -> /life-skills             (hub: choose an option)
     LifeSkillsAI.jsx   -> /life-skills/with-ai     (Learn with an AI Coach)
     LifeSkillsOwn.jsx  -> /life-skills/without-ai   (Learn on Your Own)
   Route paths yahin se badalte hain:
------------------------------------------------------------------- */
const ROUTES = { hub: "/life-skills", ai: "/life-skills/ai", own: "/life-skills" };

import img081 from "../../assets/life-skills-webp/Screenshot_20261024-005657.webp";
import img082 from "../../assets/life-skills-webp/Screenshot_20261024-005713.webp";
import img083 from "../../assets/life-skills-webp/Screenshot_20261024-005725.webp";
import img084 from "../../assets/life-skills-webp/Screenshot_20261024-005743.webp";
import img085 from "../../assets/life-skills-webp/Screenshot_20261024-005759.webp";
import img086 from "../../assets/life-skills-webp/Screenshot_20261024-005813.webp";
import img087 from "../../assets/life-skills-webp/Screenshot_20261024-005826.webp";
import img088 from "../../assets/life-skills-webp/Screenshot_20261024-005839.webp";
import img089 from "../../assets/life-skills-webp/Screenshot_20261024-005851.webp";
import img090 from "../../assets/life-skills-webp/Screenshot_20261024-005906.webp";
import img091 from "../../assets/life-skills-webp/Screenshot_20261024-005916.webp";
import img092 from "../../assets/life-skills-webp/life-skills-learning-journey.webp";
import img093 from "../../assets/life-skills-webp/Screenshot_20261024-005946.webp";
import img094 from "../../assets/life-skills-webp/life-skills-ai-coach.webp";

const DARK = {
  pageBg: "#000000", cardBg: "#111827", border: "#1F2937",
  text: "#ffffff", textSub: "#CBD5E1", textMuted: "#94A3B8",
  pillBg: "rgba(255,255,255,0.06)",
};
const LIGHT = {
  pageBg: "#F8FAFC", cardBg: "#ffffff", border: "#E5E7EB",
  text: "#1E293B", textSub: "#475569", textMuted: "#94A3B8",
  pillBg: "#F1F5F9",
};

const IMG = {
  "081": img081,
  "082": img082,
  "083": img083,
  "084": img084,
  "085": img085,
  "086": img086,
  "087": img087,
  "088": img088,
  "089": img089,
  "090": img090,
  "091": img091,
  "092": img092,
  "093": img093,
  "094": img094,
};

// Next.js import object deta hai ({ src, width, height }); Vite string deta hai. Dono chalenge.
const src = (m) => (m && typeof m === "object" && "src" in m ? m.src : m);

const Y = "#F2B632";

const SKILLS = [
  "Communication",
  "Self-awareness & Emotional Intelligence",
  "Critical Thinking & Problem-Solving",
  "Teamwork & Leadership",
  "Digital Literacy & Cybersecurity",
  "Ethics & Personal Finance",
  "Career Readiness",
  "Entrepreneurial Thinking",
];

const SKILL_CARDS = [
  ["💬", "Communication", "Speaking clearly, writing, listening, body language, respectful conversation."],
  ["🧭", "Self-awareness & Emotional Intelligence", "Understanding feelings, empathy, staying calm, responding thoughtfully."],
  ["🔍", "Critical Thinking & Problem-Solving", "Asking good questions, checking information, comparing options, deciding."],
  ["🤝", "Teamwork & Leadership", "Working together, handling disagreements, taking responsibility, leading."],
  ["🔐", "Digital Literacy & Cybersecurity", "Using technology safely, protecting your information, responsible use."],
  ["⚖️", "Ethics & Personal Finance", "Making fair choices, basic money management, informed daily decisions."],
  ["💼", "Career Readiness", "Interviews, workplace behaviour, confidence, adapting to change."],
  ["💡", "Entrepreneurial Thinking", "Understanding customer problems, testing ideas, creativity, design thinking."],
];

const COACH_NAME = "Learn with an AI Coach";
const OWN_NAME = "Learn on Your Own";

function Ph({ text }) {
  return text.split(/(\[.*?\])/g).map((part, i) =>
    /^\[.*\]$/.test(part) ? (
      <span className="ph" key={i}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

// Photo + optional caption (real image)
function Fig({ k, alt, cap, id }) {
  return (
    <figure className="photo">
      <img id={id} src={src(IMG[k])} alt={alt} loading={id ? "eager" : "lazy"} />
      {cap ? <figcaption>{cap}</figcaption> : null}
    </figure>
  );
}

function Person({ c, x, y, w, s = "p" }) {
  return <use href={`#ls-${s}`} x={x} y={y} width={w} height={w * 1.4} style={{ color: c }} />;
}

function Road({ c, ico }) {
  const d = "M80 470C80 390 280 400 280 300S80 220 80 130 220 60 280 40";
  const stops = [
    [80, 470, "Beginner"],
    [280, 300, "Intermediate"],
    [80, 130, "Advanced"],
  ];
  return (
    <svg className="road" viewBox="0 -30 360 550" role="img" aria-label="Roadmap: Beginner, Intermediate, Advanced, your action plan">
      <path d={d} fill="none" stroke={c} strokeWidth="40" strokeLinecap="round" />
      <path className="flow" d={d} fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="9 12" opacity=".75" />
      {stops.map(([x, y, label]) => {
        const left = x < 150;
        return (
          <g key={label}>
            <circle cx={x} cy={y} r="24" fill="#fff" stroke={Y} strokeWidth="5" />
            <text x={x} y={y + 8} textAnchor="middle" fontSize="22">
              {ico}
            </text>
            <text
              x={left ? x + 34 : x - 34}
              y={y + 6}
              textAnchor={left ? "start" : "end"}
              fontFamily="Figtree,sans-serif"
              fontWeight="700"
              fontSize="17"
              fill="var(--ink)"
            >
              {label}
            </text>
          </g>
        );
      })}
      <circle cx="280" cy="40" r="24" fill="#fff" stroke={Y} strokeWidth="5" />
      <text x="280" y="48" textAnchor="middle" fontSize="22">
        🚩
      </text>
      <text x="280" y="-6" textAnchor="middle" fontFamily="Figtree,sans-serif" fontWeight="700" fontSize="17" fill="var(--ink)">
        Your plan
      </text>
    </svg>
  );
}

const mutedLine = { stroke: "var(--muted)", strokeWidth: 4, strokeLinecap: "round" };
const label12 = { fontFamily: "Figtree,sans-serif", fontSize: 12, fontWeight: 700, fill: "var(--ink)" };

function BeforeAfterSvg() {
  return (
    <figure className="photo">
      <svg viewBox="0 0 240 180" role="img" aria-label="Before: a first practice attempt. After: a retry using the coach suggestions.">
        <rect width="240" height="180" fill="var(--tint)" />
        <rect x="6" y="6" width="108" height="168" rx="12" fill="var(--card)" />
        <rect x="126" y="6" width="108" height="168" rx="12" fill="var(--card)" />
        <g {...label12}>
          <text x="16" y="26">Before</text>
          <text x="136" y="26">After</text>
        </g>
        <Person c="#0F8F8F" x={14} y={92} w={38} />
        <Person c="#0F8F8F" x={134} y={92} w={38} />
        <rect x="40" y="40" width="68" height="40" rx="9" fill="none" stroke="#E86A5C" strokeWidth="2" />
        <path d="M50 56h46M50 68h30" stroke="#E86A5C" strokeWidth="4" strokeLinecap="round" />
        <rect x="160" y="40" width="68" height="40" rx="9" fill="none" stroke="#2FB67C" strokeWidth="2" />
        <path d="M170 56h46M170 68h30" stroke="#2FB67C" strokeWidth="4" strokeLinecap="round" />
        <path d="M196 124l6 7 11-14" fill="none" stroke="#2FB67C" strokeWidth="4" strokeLinecap="round" />
        <path d="M116 90h8m-4-4l4 4-4 4" fill="none" stroke="var(--ink)" strokeWidth="2" />
      </svg>
      <figcaption>Practise, get suggestions, try again</figcaption>
    </figure>
  );
}

function AssessSvg() {
  return (
    <figure className="photo">
      <svg viewBox="0 0 240 160" role="img" aria-label="A learner with a skills checklist and a scenario card">
        <rect width="240" height="160" fill="var(--tint)" />
        <Person c="#0F8F8F" x={12} y={66} w={50} />
        <rect x="76" y="12" width="152" height="74" rx="10" fill="var(--card)" stroke="#5B3FD6" strokeWidth="2" />
        <path d="M90 30l5 6 9-11M90 50l5 6 9-11" fill="none" stroke="#2FB67C" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="97" cy="71" r="6" fill="none" stroke="#F2B632" strokeWidth="3" />
        <path d="M116 30h90M116 50h70M116 71h54" {...mutedLine} />
        <rect x="76" y="98" width="152" height="50" rx="10" fill="var(--card)" stroke="#F2B632" strokeWidth="2" />
        <text x="90" y="118" {...label12}>Scenario</text>
        <path d="M90 130h96" {...mutedLine} />
      </svg>
      <figcaption>Illustration: a checklist and a scenario card</figcaption>
    </figure>
  );
}

function PlanSvg() {
  const stones = [
    [36, 96, "#5B3FD6"],
    [94, 87, "#0F8F8F"],
    [152, 78, "#2FB67C"],
    [210, 69, "#F2B632"],
    [268, 60, "#E86A5C"],
    [326, 51, "#5B3FD6"],
    [384, 42, "#0F8F8F"],
  ];
  return (
    <figure className="photo" style={{ marginBottom: 14 }}>
      <svg viewBox="0 0 420 110" role="img" aria-label="Seven stepping stones, one for each day, leading up to a flag">
        <rect width="420" height="110" fill="var(--tint)" />
        <use href="#ls-p" x="20" y="44" width="32" height="45" style={{ color: "#0F8F8F" }} />
        <g stroke="#fff" strokeWidth="2">
          {stones.map(([cx, cy, fill]) => (
            <ellipse key={cx} cx={cx} cy={cy} rx="24" ry="9" fill={fill} />
          ))}
        </g>
        <g fill="#fff" fontFamily="Figtree,sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
          {stones.map(([cx, cy], i) => (
            <text key={cx} x={cx} y={cy + 4}>
              {i + 1}
            </text>
          ))}
        </g>
        <path d="M384 34V8" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M384 8l18 7-18 7z" fill="#F2B632" />
      </svg>
    </figure>
  );
}

const CHAPTERS = [
  {
    t: "The problem",
    p: "Riya has an interview next month. She knows the answers but freezes when she has to speak.",
    svg: (
      <>
        <Person c="#0F8F8F" x={12} y={40} w={44} />
        <rect x="66" y="12" width="70" height="38" rx="10" fill="var(--card)" stroke="#E86A5C" strokeWidth="2" />
        <g fill="#E86A5C">
          <circle cx="86" cy="31" r="4" />
          <circle cx="101" cy="31" r="4" />
          <circle cx="116" cy="31" r="4" />
        </g>
        <circle cx="164" cy="42" r="22" fill="none" stroke="#F2B632" strokeWidth="3" />
        <path d="M164 30v12l8 6" stroke="#F2B632" strokeWidth="3" fill="none" strokeLinecap="round" />
      </>
    ),
  },
  {
    t: "Choose one skill",
    p: "She picks Communication and sets one goal: answer three common questions calmly.",
    svg: (
      <>
        <Person c="#0F8F8F" x={12} y={40} w={44} />
        <g strokeWidth="2" fill="var(--card)">
          <rect x="70" y="14" width="116" height="26" rx="8" stroke="#2FB67C" />
          <rect x="70" y="48" width="116" height="26" rx="8" stroke="#8E7CFF" />
          <rect x="70" y="82" width="116" height="26" rx="8" stroke="#F2B632" />
        </g>
        <path d="M162 22l6 7 11-13" fill="none" stroke="#2FB67C" strokeWidth="4" strokeLinecap="round" />
        <path d="M82 27h60M82 61h46M82 95h54" {...mutedLine} />
      </>
    ),
  },
  {
    t: "Two ways to practise",
    p: "With the AI coach (preview): rehearse a mock interview, then retry after each suggestion. On her own: write answers in a journal and role-play with a friend.",
    svg: (
      <>
        <Person c="#5B3FD6" x={8} y={52} w={34} />
        <rect x="44" y="14" width="48" height="30" rx="8" fill="var(--card)" stroke="#5B3FD6" strokeWidth="2" />
        <path d="M52 26h30M52 34h20" stroke="#5B3FD6" strokeWidth="3" strokeLinecap="round" />
        <path d="M100 10v100" stroke="var(--line)" strokeWidth="2" strokeDasharray="4 5" />
        <Person c="#0F8F8F" x={110} y={52} w={34} />
        <Person c="#E86A5C" x={160} y={52} w={30} s="q" />
        <rect x="116" y="96" width="70" height="12" rx="6" fill="#B98A5E" />
        <path d="M130 94l18-8 18 8" fill="var(--card)" stroke="#0F8F8F" strokeWidth="2" />
      </>
    ),
  },
  {
    t: "Check, don’t guess",
    p: "A short quiz, then a practical task scored on a checklist. The two results stay separate.",
    svg: (
      <>
        <rect x="14" y="12" width="80" height="96" rx="10" fill="var(--card)" stroke="#5B3FD6" strokeWidth="2" />
        <path d="M26 34l5 6 9-11M26 60l5 6 9-11" fill="none" stroke="#2FB67C" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="32" cy="88" r="6" fill="none" stroke="#F2B632" strokeWidth="3" />
        <path d="M48 34h36M48 60h28M48 88h24" {...mutedLine} />
        <rect x="108" y="12" width="78" height="96" rx="10" fill="var(--card)" stroke="#0F8F8F" strokeWidth="2" />
        <text x="120" y="38" {...label12}>Quiz</text>
        <text x="120" y="78" {...label12}>Task</text>
        <path d="M120 46h54M120 86h40" {...mutedLine} />
      </>
    ),
  },
  {
    t: "Her next week",
    p: "Seven small actions, one per day. The real proof is using the skill in the actual interview.",
    svg: (
      <>
        <Person c="#0F8F8F" x={8} y={34} w={30} />
        <g stroke="#fff" strokeWidth="2">
          <ellipse cx="26" cy="104" rx="16" ry="6" fill="#5B3FD6" />
          <ellipse cx="55" cy="98" rx="16" ry="6" fill="#0F8F8F" />
          <ellipse cx="84" cy="92" rx="16" ry="6" fill="#2FB67C" />
          <ellipse cx="113" cy="86" rx="16" ry="6" fill="#F2B632" />
          <ellipse cx="142" cy="80" rx="16" ry="6" fill="#E86A5C" />
          <ellipse cx="171" cy="74" rx="16" ry="6" fill="#5B3FD6" />
        </g>
        <path d="M171 66V30" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M171 30l16 6-16 6z" fill="#F2B632" />
      </>
    ),
  },
];

/* ---------- NEW: illustrations specific to each option ---------- */

// AI Coach page: dialogue scene
function DialogueSvg() {
  return (
    <figure className="photo">
      <svg viewBox="0 0 240 180" role="img" aria-label="A learner answers a mock-interview question from the AI coach, then reads a suggestion">
        <rect width="240" height="180" fill="var(--tint)" />
        <rect x="10" y="12" width="130" height="40" rx="12" fill="var(--card)" stroke="#5B3FD6" strokeWidth="2" />
        <text x="20" y="30" {...label12}>Coach asks</text>
        <path d="M20 41h90" {...mutedLine} />
        <rect x="100" y="62" width="130" height="40" rx="12" fill="var(--card)" stroke="#0F8F8F" strokeWidth="2" />
        <text x="110" y="80" {...label12}>You answer</text>
        <path d="M110 91h90" {...mutedLine} />
        <rect x="10" y="112" width="140" height="50" rx="12" fill="var(--card)" stroke="#F2B632" strokeWidth="2" />
        <text x="20" y="130" {...label12}>Suggestion</text>
        <path d="M20 146h100" {...mutedLine} />
        <path d="M160 130l6 7 11-14" fill="none" stroke="#2FB67C" strokeWidth="4" strokeLinecap="round" />
        <use href="#ls-p" x="192" y="112" width="34" height="48" style={{ color: "#0F8F8F" }} />
      </svg>
      <figcaption>Illustration: question, answer, suggestion, then retry</figcaption>
    </figure>
  );
}

// On Your Own page: journal + worksheet checklist
function WorksheetSvg() {
  return (
    <figure className="photo">
      <svg viewBox="0 0 240 180" role="img" aria-label="A journal page with writing lines next to a worksheet checklist">
        <rect width="240" height="180" fill="var(--tint)" />
        <rect x="24" y="16" width="120" height="148" rx="10" fill="var(--card)" stroke="#0F8F8F" strokeWidth="2" />
        <text x="38" y="38" {...label12}>My journal</text>
        <path d="M38 56h92M38 76h74M38 96h86M38 116h60" {...mutedLine} />
        <rect x="160" y="40" width="58" height="88" rx="8" fill="var(--card)" stroke="#F2B632" strokeWidth="2" />
        <path d="M170 62l4 5 7-9M170 86l4 5 7-9" fill="none" stroke="#2FB67C" strokeWidth="3" strokeLinecap="round" />
        <circle cx="174" cy="110" r="5" fill="none" stroke="#F2B632" strokeWidth="3" />
        <path d="M186 64h22M186 88h22M186 110h22" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <figcaption>Illustration: journal prompts and a worksheet checklist</figcaption>
    </figure>
  );
}

// On Your Own page: practising with a friend
function PeerPracticeSvg() {
  return (
    <figure className="photo">
      <svg viewBox="0 0 240 180" role="img" aria-label="Two people practising a conversation across a table with a worksheet between them">
        <rect width="240" height="180" fill="var(--tint)" />
        <Person c="#0F8F8F" x={30} y={40} w={50} />
        <Person c="#E86A5C" x={150} y={44} w={46} s="q" />
        <rect x="24" y="124" width="172" height="14" rx="7" fill="#B98A5E" />
        <rect x="86" y="98" width="48" height="26" rx="4" fill="var(--card)" stroke="#0F8F8F" strokeWidth="2" />
        <path d="M94 108h32M94 116h22" {...mutedLine} />
      </svg>
      <figcaption>Illustration: role-play with a friend, classmate or mentor</figcaption>
    </figure>
  );
}

// Story chapter 3, one per option
const CHAPTER_AI = {
  t: "Practise with the AI coach",
  p: "Riya rehearses a mock interview with the AI coach (preview), reads each suggestion, then tries again.",
  svg: (
    <>
      <Person c="#0F8F8F" x={10} y={50} w={40} />
      <rect x="58" y="12" width="110" height="34" rx="10" fill="var(--card)" stroke="#5B3FD6" strokeWidth="2" />
      <path d="M70 24h70M70 34h46" stroke="#5B3FD6" strokeWidth="3" strokeLinecap="round" />
      <rect x="72" y="56" width="110" height="34" rx="10" fill="var(--card)" stroke="#F2B632" strokeWidth="2" />
      <path d="M84 68h70M84 78h46" {...mutedLine} />
      <path d="M110 108h56m-6-6l6 6-6 6" fill="none" stroke="#2FB67C" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
};
const CHAPTER_OWN = {
  t: "Practise on her own",
  p: "Riya writes her answers in a journal, then role-plays the interview with a friend. No AI needed.",
  svg: (
    <>
      <Person c="#0F8F8F" x={10} y={50} w={40} />
      <rect x="58" y="16" width="64" height="84" rx="8" fill="var(--card)" stroke="#0F8F8F" strokeWidth="2" />
      <path d="M68 36h44M68 52h34M68 68h40M68 84h26" {...mutedLine} />
      <Person c="#E86A5C" x={142} y={46} w={36} s="q" />
      <rect x="132" y="104" width="56" height="8" rx="4" fill="#B98A5E" />
    </>
  ),
};

function Mode({ id, m, afterHero, extra }) {
  return (
    <div id={id} className={`mode ${id} fx`}>
      <div className="two">
        <div>
          <span className="eyebrow" style={{ marginTop: 10 }}>{m.eyebrow}</span>
          <h1>{m.name}</h1>
          <p className="sub">{m.title}</p>
          <p>{m.sub}</p>
          {m.status ? (
            <>
              <p className="status">{m.status}</p>
              <br />
            </>
          ) : null}
          <a className="btn" href="#join">
            {m.cta}
          </a>{" "}
          <a className="btn alt" href={m.other.href}>
            {m.other.label}
          </a>
        </div>
        <Fig k={m.hero[0]} alt={m.hero[1]} cap={m.hero[2]} />
      </div>
      {afterHero}

      <h3 style={{ marginTop: 18 }}>Your five steps</h3>
      <ol className="steps">
        {m.steps.map(([t, d]) => (
          <li key={t}>
            <b>{t}</b>
            {d}
          </li>
        ))}
      </ol>

      <details className="journey">
        <summary>See all 8 stages of this journey</summary>
        <ol>
          {m.journey.map(([t, d]) => (
            <li key={t}>
              <b>{t}.</b> {d}
            </li>
          ))}
        </ol>
      </details>

      <h3 style={{ marginTop: 18 }}>Your roadmap: Beginner to Advanced</h3>
      <div className="map">
        <Road c={m.c} ico={m.ico} />
        <div className="lv">
          {m.lv.map((v) => (
            <article className="card" key={v.tag}>
              <img src={src(IMG[v.img])} alt={v.alt} loading="lazy" />
              <div>
                <span className="tag">{v.tag}</span>
                <h3>{v.skills}</h3>
                <ul>
                  {v.items.map(([b, t]) => (
                    <li key={b}>
                      <b>{b}</b> {t}
                    </li>
                  ))}
                </ul>
                <p style={{ margin: 0, fontSize: ".95rem" }}>
                  <b>You finish with:</b> {v.finish}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

            <h3>See it in action</h3>
      <div className="gal">
        <div className="gal-track">
          {[0, 1].map((dup) => (
            <div className="gal-set" key={dup} aria-hidden={dup === 1 ? "true" : undefined}>
              {m.gal.map(([k, alt, cap]) => (
                <Fig key={k} k={k} alt={dup === 1 ? "" : alt} cap={cap} />
              ))}
              {extra}
            </div>
          ))}
        </div>
      </div>

      <div className="notes">
        {m.notes.map(([t, d]) => (
          <div className="note" key={t}>
            <h3>{t}</h3>
            <p>
              <Ph text={d} />
            </p>
          </div>
        ))}
      </div>

      <div className="faq" style={{ marginTop: 20 }}>
        <h3>FAQs</h3>
        {m.faq.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>
              <Ph text={a} />
            </p>
          </details>
        ))}
      </div>

      <p style={{ marginTop: 20 }}>
        <a className="btn" href="#join">
          Get Started
        </a>
      </p>
    </div>
  );
}

function useLsTheme({ theme: themeProp, toggleTheme: toggleThemeProp }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return document.documentElement.classList.contains("dark");
    } catch {
      return false;
    }
  });
  const isControlled = themeProp !== undefined;
  const theme = isControlled ? themeProp : darkMode ? "dark" : "light";
  const toggleTheme = () => {
    if (isControlled && toggleThemeProp) {
      toggleThemeProp();
      return;
    }
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
        document.documentElement.classList.toggle("dark", next);
      } catch {}
      return next;
    });
  };
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "theme") setDarkMode(e.newValue === "dark");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const dark = theme === "dark";
  const t = dark ? DARK : LIGHT;
  const vars = {
    "--paper": t.pageBg,
    "--ink": t.text,
    "--muted": t.textSub,
    "--card": t.cardBg,
    "--tint": t.pillBg,
    "--line": t.border,
    "--amber": "#F2B632",
    "--on": dark ? "#15122B" : "#ffffff",
    "--c1": dark ? "#A99BFF" : "#5B3FD6",
    "--c2": dark ? "#4FD0C8" : "#0F8F8F",
    "--err": dark ? "#FF9C8F" : "#C0392B",
    "--imgf": dark ? 0.9 : 1,
    "--grid": dark ? "rgba(169,155,255,.12)" : "rgba(46,32,120,.07)",
    "--glow": dark ? "rgba(79,208,200,.25)" : "rgba(91,63,214,.22)",
    colorScheme: dark ? "dark" : "light",
    background: t.pageBg,
    color: t.text,
  };

  // smooth scroll sirf is page par
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "smooth";
    return () => {
      el.style.scrollBehavior = prev;
    };
  }, []);
  return { theme, toggleTheme, vars };
}

function LsShell({ props, nav, banner, children }) {
  const { theme, toggleTheme, vars } = useLsTheme(props || {});
  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={props?.setShowLoginModal} scrollToSection={props?.scrollToSection}>
      <div className="ls" style={vars}>
      {/* person symbols used by the SVG illustrations */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="ls-p" viewBox="0 0 60 84">
          <path d="M12 84c0-26 7-38 18-38s18 12 18 38z" fill="currentColor" />
          <circle cx="30" cy="22" r="13" fill="#E8B08A" />
          <path d="M16 21c-1-16 28-18 29-1-9-6-19-6-29 1z" fill="#3B2A26" />
        </symbol>
        <symbol id="ls-q" viewBox="0 0 60 84">
          <path d="M12 84c0-26 7-38 18-38s18 12 18 38z" fill="currentColor" />
          <circle cx="30" cy="22" r="13" fill="#B97B58" />
          <path d="M15 24c-3-20 31-20 30 0-3-9-9-12-15-12s-12 3-15 12z" fill="#1E1A22" />
        </symbol>
      </svg>

      <header className="bar">
        <div className="in">
          <nav className="nav" aria-label="Page sections">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

        <div className="banner" role="note">{banner}</div>

        {children}
      </div>
    </PublicLayout>
  );
}

function JoinForm({ option }) {
  const [form, setForm] = useState({ name: "", email: "", option: option, level: "", skill: "", goal: "", agree: false });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const refs = { name: useRef(null), email: useRef(null), level: useRef(null), skill: useRef(null), agree: useRef(null) };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const checks = [
      ["name", form.name.trim().length > 1, "Enter your full name."],
      ["email", /^\S+@\S+\.\S+$/.test(form.email.trim()), "Enter a valid email, like name@example.com."],
      ["level", !!form.level, "Choose a starting level."],
      ["skill", !!form.skill, "Choose a skill."],
      ["agree", form.agree, "Please agree to the privacy policy."],
    ];
    const errs = {};
    let first = null;
    checks.forEach(([k, ok, msg]) => {
      if (!ok) {
        errs[k] = msg;
        if (!first) first = k;
      }
    });
    setErrors(errs);
    if (first) {
      setResult(null);
      refs[first].current?.focus();
      return;
    }
    setResult({ option: form.option, level: form.level, skill: form.skill });
  };

  const inv = (k) => (errors[k] ? "true" : "false");
  return (
      <section id="join">
        <h2>Join Life Skills</h2>
        <p className="sub">Tell us where you want to start. Do not share passwords or ID numbers.</p>
        <form id="f" noValidate onSubmit={onSubmit}>
          <div className="g2 r">
            <div>
              <label htmlFor="n">Full name</label>
              <input id="n" type="text" autoComplete="name" ref={refs.name} value={form.name} onChange={set("name")} aria-invalid={inv("name")} />
              <p className="err" id="e-n">{errors.name || ""}</p>
            </div>
            <div>
              <label htmlFor="m">Email</label>
              <input id="m" type="email" autoComplete="email" ref={refs.email} value={form.email} onChange={set("email")} aria-invalid={inv("email")} />
              <p className="err" id="e-m">{errors.email || ""}</p>
            </div>
          </div>

            <p style={{ margin: 0 }}>
              <b>Your option:</b> {option}
            </p>

          <div className="g2 r">
            <div>
              <label htmlFor="l">Starting level</label>
              <select id="l" ref={refs.level} value={form.level} onChange={set("level")} aria-invalid={inv("level")}>
                <option value="">Choose a level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <p className="err" id="e-l">{errors.level || ""}</p>
            </div>
            <div>
              <label htmlFor="s">Skill to start with</label>
              <select id="s" ref={refs.skill} value={form.skill} onChange={set("skill")} aria-invalid={inv("skill")}>
                <option value="">Choose a skill</option>
                {SKILLS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <p className="err" id="e-s">{errors.skill || ""}</p>
            </div>
          </div>

          <div>
            <label htmlFor="g">Your goal (optional)</label>
            <textarea id="g" rows={3} placeholder="For example: feel confident in job interviews" value={form.goal} onChange={set("goal")} />
          </div>

          <div>
            <label style={{ fontWeight: 500, display: "flex", gap: 8 }}>
              <input id="c" type="checkbox" ref={refs.agree} checked={form.agree} onChange={set("agree")} aria-invalid={inv("agree")} /> I agree to the
              privacy policy <span className="ph">[add link]</span>
            </label>
            <p className="err" id="e-c">{errors.agree || ""}</p>
          </div>

          <button className="btn" type="submit" style={{ "--a": "var(--ink)" }}>
            Get Started
          </button>

          {result ? (
            <div id="ok" role="status">
              <p style={{ margin: "0 0 6px" }}>
                <b>Your entries are valid.</b> Option: {result.option}, level: {result.level}, first skill: {result.skill}.
              </p>
              <p style={{ margin: 0 }}>Sign-up is not connected yet, so nothing has been sent or saved.</p>
            </div>
          ) : null}

          <p className="small">Pending: sign-up is not connected to a backend yet, so submitting only checks your entries.</p>
        </form>
      </section>
  );
}

function QuickFacts() {
  return (
    <>
      {/* QUICK FACTS */}
      <section aria-labelledby="fh">
        <h2 id="fh">Quick facts</h2>
        <div className="facts">
          <div className="fact">
            <b>Who it is for</b>Students, job-seekers and early-career learners. No experience needed.
          </div>
          <div className="fact">
            <b>Time</b>
            <span className="ph">[X hours per week]</span>, at your own pace.
          </div>
          <div className="fact">
            <b>Cost</b>
            <span className="ph">[Free / price]</span>
          </div>
          <div className="fact">
            <b>You finish with</b>Your progress summary and a one-week action plan.
          </div>
        </div>
      </section>
    </>
  );
}

function StorySection({ chapters, note }) {
  return (
    <>
      <section id="story" aria-labelledby="sth">
        <span className="eyebrow">The storyline</span>
        <h2 id="sth">Meet Riya: from “I freeze in interviews” to a plan she can follow</h2>
        <p className="status">Illustrative story with a made-up learner. Not a real result.</p>
        <ol className="chap" id="chap">
          {chapters.map((c, i) => (
            <li key={c.t}>
              <svg viewBox="0 0 200 120" role="img" aria-label={c.t}>
                {c.svg}
              </svg>
              <div>
                <span className="lab" style={{ margin: "0 0 4px" }}>
                  Chapter {i + 1}
                </span>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="callout">{note}</p>
      </section>
    </>
  );
}

function AssessSection({ ai }) {
  return (
    <>
      <section id="assess" aria-labelledby="ah">
        <h2 id="ah">How you are assessed</h2>
        <p className="sub">
          Six clear stages, the same in both options so results are comparable. Each result is shown on its own and never merged into one score.
        </p>
        <div className="two" style={{ alignItems: "start" }}>
          <ol className="stages">
            <li>
              <b>Starting point</b>
              <span className="lab">Where you are today (your own rating)</span>
              <br />
              Record your goal and a self-rating.
            </li>
            <li>
              <b>Knowledge check</b>
              <span className="lab">Quiz score</span>
              <br />
              A fixed quiz with an explanation for every answer.
            </li>
            <li>
              <b>Practical task</b>
              <span className="lab">Practical task</span>
              <br />
              Apply the skill in a scenario or a real task.
            </li>
            <li>
              <b>Feedback</b>
              <span className="lab">{ai ? "Checklist score · Coach suggestion" : "Checklist score · Answer key"}</span>
              <br />
              {ai ? "A clear checklist, an answer key or an AI suggestion, plus human feedback if available." : "A clear checklist, an answer key and an optional mentor comment."}
            </li>
            <li>
              <b>Progress review</b>
              <span className="lab">Your progress</span>
              <br />
              Compare your earlier and later results.
            </li>
            <li>
              <b>Next action</b>
              <span className="lab">Your next step</span>
              <br />
              Revise, retry or move to the next skill.
            </li>
          </ol>
          <AssessSvg />
        </div>
        <p className="callout">
          <b>Completing a lesson is not the same as mastering a skill.</b> We never show “Skill mastered” from completion alone.{" "}
          {ai ? "AI feedback is a suggestion: the checklist and your use of the skill in a real situation are the main evidence." : "Your checklist and your use of the skill in a real situation are the main evidence."} No certificate or verified-skill claim is made unless a real verification process exists.
        </p>
      </section>
    </>
  );
}

function ProgressSection() {
  return (
    <>
      <section id="progress" aria-labelledby="ph2">
        <h2 id="ph2">Track your progress</h2>
        <p className="sub">
          This is how your progress will be shown. Each indicator stays separate and nothing is pre-filled or estimated.
        </p>
        <p className="status">Progress tracking: preview, not live yet</p>
        <div className="indgrid">
          <div className="ind">
            <span>Lessons completed</span>
            <b>—</b>
            <small>Appears after your first lesson</small>
          </div>
          <div className="ind">
            <span>Practice activities done</span>
            <b>—</b>
            <small>Counted from real activity</small>
          </div>
          <div className="ind">
            <span>Quiz score</span>
            <b>—</b>
            <small>With number of attempts</small>
            <div className="bar2">
              <i style={{ width: 0 }}></i>
            </div>
          </div>
          <div className="ind">
            <span>Practical checklist</span>
            <b>—</b>
            <small>Items met out of total</small>
            <div className="bar2">
              <i style={{ width: 0 }}></i>
            </div>
          </div>
          <div className="ind">
            <span>Your own confidence</span>
            <b>—</b>
            <small>Your own rating, not a test result</small>
          </div>
          <div className="ind">
            <span>Next recommended activity</span>
            <b>—</b>
            <small>Shown after your first result</small>
          </div>
        </div>
        <p className="small" style={{ marginTop: 10 }}>
          Completing lessons does not mean you have mastered a skill.
        </p>
      </section>
    </>
  );
}

function PlanSection() {
  return (
    <>
      <section id="plan" aria-labelledby="wh">
        <h2 id="wh">Your one-week improvement plan</h2>
        <p className="sub">Turn feedback into small steps you can finish. Write one action for each day.</p>
        <PlanSvg />
        <div className="days">
          {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "My strengths", "What I will improve", "Next skill to learn"].map((d) => (
            <div className="dayc" key={d}>
              <b>{d}</b>
              <i></i>
            </div>
          ))}
        </div>
        <p className="small" style={{ marginTop: 10 }}>
          One small action per day, based on your feedback. Your plan is written after you start learning.
        </p>
      </section>
    </>
  );
}

function HorizonSection() {
  return (
    <>
      <section id="future" className="fx" aria-labelledby="fh2">
        <span className="eyebrow">Your horizon</span>
        <h2 id="fh2">Where this journey leads</h2>
        <p className="sub">Start small, build step by step, then choose your next pathway.</p>
        <ol className="hz">
          <li>
            <b>Today</b>Pick one skill and set one goal.
          </li>
          <li>
            <b>This week</b>Follow your one-week plan: one small action a day.
          </li>
          <li>
            <b>This month</b>Move from Beginner towards Intermediate, using real situations as proof.
          </li>
          <li>
            <b>Next pathway</b>Continue with AI Literacy or AI Entrepreneur. Both are separate courses.
          </li>
        </ol>
      </section>
    </>
  );
}

function SkillsSection({ title }) {
  return (
    <>
      <section id="skills">
        <h2>{title}</h2>
        <div className="skills">
          {SKILL_CARDS.map(([ico, t, d]) => (
            <div className="skill" key={t}>
              <i>{ico}</i>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, color: "var(--muted)" }}>
          Each skill has a short lesson, a real-life example, common mistakes, a practice activity and a quick check.
        </p>
        <h2 style={{ marginTop: 32 }}>Related courses</h2>
        <p className="sub">Separate from Life Skills.</p>
        <div className="rel">
          <div className="rc">
            <h3>AI Literacy</h3>
            <p>Understand what AI is, how to write good prompts, how to check AI answers, and how to protect privacy and avoid bias.</p>
            <em>Good next step after Life Skills.</em>
          </div>
          <div className="rc">
            <h3>AI Entrepreneur</h3>
            <p>Find a real problem, talk to customers, test your idea, build a simple first version and pitch it.</p>
            <em>For learners who want to start something of their own.</em>
          </div>
        </div>
      </section>
    </>
  );
}

export {
  ROUTES, IMG, src, SKILLS, SKILL_CARDS, COACH_NAME, OWN_NAME, CHAPTERS, CHAPTER_AI, CHAPTER_OWN,
  Ph, Fig, Person, Road, BeforeAfterSvg, DialogueSvg, WorksheetSvg, PeerPracticeSvg,
  Mode, LsShell, JoinForm, QuickFacts, StorySection, AssessSection, ProgressSection, PlanSection, HorizonSection, SkillsSection,
};
