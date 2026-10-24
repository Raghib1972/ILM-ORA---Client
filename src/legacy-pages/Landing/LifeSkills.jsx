"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import "./LifeSkills.css";
// Wahi shared navbar + footer jo ManagerHub / Careers / About / Pricing use karte hain
import PublicLayout from "./components/PublicLayout";

/* ------------------------------------------------------------------
   THEME: ManagerHub ke same tokens (ek hi background poore page par)
   light #F8FAFC · dark #000 · cards white / #111827
------------------------------------------------------------------- */
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

/* ------------------------------------------------------------------
   IMAGES  (src/assets/life-skills-webp/)
   HTML ke IMG["081"] ... IMG["094"] ab yahan real files se map hain.
   Agar aapki files ka extension .webp nahi hai to sirf neeche .webp
   badal dein.
------------------------------------------------------------------- */
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

/* ------------------------------------------------------------------
   DATA
------------------------------------------------------------------- */
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

const NAV = [
  ["story", "Story"],
  ["choose", "Options"],
  ["coach", "AI Coach"],
  ["own", "On Your Own"],
  ["assess", "Assessment"],
  ["progress", "Progress"],
  ["plan", "Plan"],
  ["future", "Horizon"],
  ["skills", "Skills"],
  ["join", "Join"],
];

const COACH_NAME = "Learn with an AI Coach";
const OWN_NAME = "Learn on Your Own";

const MODES = {
  coach: {
    name: COACH_NAME,
    c: "#5B3FD6",
    ico: "💬",
    hero: ["094", "A learner smiling at a laptop showing communication training with coaching feedback", "Illustration. Percentages shown are samples, not real results."],
    title: "Practise real-life situations with an AI coach, then improve step by step.",
    sub: "Learn the skill, rehearse it in realistic conversations and get suggestions you can act on. You stay in charge of your own learning.",
    steps: [
      ["Choose your skill", "Answer a few questions about where you are today, pick one skill and set a goal."],
      ["Follow your path", "Get a simple step-by-step plan: what to learn first, what to practise next and how long each step takes."],
      ["Practise real situations", "Rehearse a mock interview, a difficult conversation or a decision with your AI coach, then try again."],
      ["Check your learning", "Take a short quiz and complete a practical task. You are scored against a clear checklist."],
      ["Get your plan", "See what you completed, your strengths, what to improve and a one-week action plan."],
    ],
    lv: [
      {
        tag: "Beginner",
        skills: "Communication · Self-awareness · Digital Literacy",
        items: [
          ["Choose:", "a few questions on where you are today, then set one goal."],
          ["Learn:", "short lessons with real-life examples."],
          ["Practise:", "simple chats with the coach, such as introducing yourself or asking for help."],
          ["Check:", "short quiz plus a checklist-scored task."],
        ],
        finish: "A clear starting point and a first one-week plan.",
        img: "081",
        alt: "A learner practising a first conversation with an AI coach",
      },
      {
        tag: "Intermediate",
        skills: "Critical Thinking · Teamwork · Ethics & Personal Finance",
        items: [
          ["Choose:", "pick the skill you want to strengthen."],
          ["Learn:", "comparing options, handling disagreements, money basics."],
          ["Practise:", "role-play a teammate conflict or a decision, then retry after suggestions."],
          ["Check:", "quiz scores and attempts shown separately from the practical task."],
        ],
        finish: "Skills you can use in real situations, with notes on what to improve.",
        img: "091",
        alt: "A learner in a video-style practice conversation with suggestion bubbles",
      },
      {
        tag: "Advanced",
        skills: "Career Readiness · Entrepreneurial Thinking · Leadership",
        items: [
          ["Choose:", "set a goal tied to a job, study or project."],
          ["Learn:", "interviews, workplace behaviour, testing ideas."],
          ["Practise:", "full mock interview or short presentation with coach suggestions."],
          ["Check:", "practical task, then use the skill in a real situation as your proof."],
        ],
        finish: "A final summary: strengths, areas to improve and your next skill or course.",
        img: "082",
        alt: "A mock interview with an AI coach",
      },
    ],
    gal: [["088", "An online quiz with results", "Step 4 · Check your learning: quiz plus checklist-scored task. Illustration, sample numbers."]],
    notes: [
      ["What is an AI coach?", "A practice partner. It plays the other person and suggests how you could improve. It does not replace your own thinking, and its suggestions can be wrong, so always compare them with the checklist."],
      ["What makes it work", "Practise in the coach, then use the skill in a real situation. The real situation is the proof that you have learned it."],
      ["Use AI responsibly", "Do not share passwords, ID numbers or private details in practice chats. Treat feedback as a suggestion, not a verdict."],
      ["Your data and privacy", "[Fill in from the privacy policy: what we store, what we do not, and how you delete your practice records.]"],
    ],
    faq: [
      ["Do I need to know AI?", "No."],
      ["Is the coach always right?", "No. Check it against the checklist."],
      ["Can I learn without it?", "Yes. See Learn on Your Own."],
      ["Is my data private?", "[Link to privacy policy]"],
    ],
    cta: "Start My Journey",
    status: "AI Practice Studio: preview, not live yet",
    journey: [
      ["Welcome and introduction", "What life skills are, and how an AI coach supports your thinking without replacing it."],
      ["Identify your skills", "Reflection questions, a priority skill and a practical goal."],
      ["Personalised roadmap", "Milestones and effort estimates. It adapts only where real logic exists."],
      ["Learn the concept", "A short lesson, an example, common mistakes and a quick check."],
      ["AI Practice Studio (preview)", "Mock interview, role-play and decision scenarios, with rubric-based feedback and a retry."],
      ["Assessment", "A fixed quiz, scenario questions and a practical rubric."],
      ["Progress", "Lessons, attempts, quiz results, practice records and your own confidence, shown separately."],
      ["Improvement plan", "Strengths, areas to improve, a one-week plan and your next skill."],
    ],
  },
  own: {
    name: OWN_NAME,
    c: "#0F8F8F",
    ico: "📘",
    hero: ["093", "A learner writing in a journal in front of a self-reflection board"],
    title: "Learn at your own pace with lessons, worksheets and self-reflection. No AI needed.",
    sub: "Clear lessons, practical activities and simple checks that help you build real skills. Same skills, same plan, different practice style.",
    steps: [
      ["Choose your skill", "Use the checklist and reflection questions to find your focus skill and set a goal."],
      ["Follow your path", "Numbered modules in a fixed order, with worksheets and a progress checklist."],
      ["Practise real situations", "Use worksheets, a journal, and role-play with a friend, classmate or mentor. Add small daily challenges."],
      ["Check your learning", "Take a quiz with answer explanations. Do a practical task and score yourself with the checklist."],
      ["Get your plan", "Review your progress, note what to revise and create a one-week action plan."],
    ],
    lv: [
      {
        tag: "Beginner",
        skills: "Communication · Self-awareness · Digital Literacy",
        items: [
          ["Choose:", "a checklist and reflection questions to find your focus skill."],
          ["Learn:", "numbered modules in a fixed order."],
          ["Practise:", "worksheets, a daily journal and tiny daily challenges."],
          ["Check:", "quiz with answer explanations, then score yourself."],
        ],
        finish: "A focus skill, a started journal and a first one-week plan.",
        img: "086",
        alt: "A learner thinking about a goal next to a checklist and journal",
      },
      {
        tag: "Intermediate",
        skills: "Critical Thinking · Teamwork · Ethics & Personal Finance",
        items: [
          ["Choose:", "revisit your reflection and pick the next skill."],
          ["Learn:", "examples and notes on decisions, teamwork and money."],
          ["Practise:", "role-play with a friend or classmate, or the solo version: write it out or record yourself."],
          ["Check:", "answer key and checklist for the practical task."],
        ],
        finish: "Practice with real people and a record of what to revise.",
        img: "087",
        alt: "Four classmates practising teamwork around a table",
      },
      {
        tag: "Advanced",
        skills: "Career Readiness · Entrepreneurial Thinking · Leadership",
        items: [
          ["Choose:", "set a goal for a job, study or project."],
          ["Learn:", "interview, workplace and idea-testing modules."],
          ["Practise:", "mock interview with a mentor or on video, then reflect in your journal."],
          ["Check:", "practical task scored with the checklist. Share it with a mentor if you have one."],
        ],
        finish: "A reviewed progress record and your own action plan.",
        img: "084",
        alt: "A learner stepping up a growing chart drawn in a notebook",
      },
    ],
    gal: [
      ["085", "A learner watching a lesson and writing notes", "Step 2 · Follow your path: short lessons and worksheets"],
      ["090", "A learner studying with books and a notebook at a desk", "Step 3 · Practise: worksheets and journal"],
      ["083", "A study checklist, calendar and practice quiz on a desk", "Step 4 · Check: checklist and quiz with answer key"],
      ["089", "A learner with a study plan and weekly progress tracking", "Step 5 · Get your plan: one-week action plan. Illustration."],
    ],
    notes: [
      ["What is included", "Short lessons, real-life examples, worksheets, quizzes with answer keys, self-scoring checklists and a progress tracker."],
      ["Do I need someone to practise with?", "It helps, but it is optional. Every activity has a solo version: write it out, record yourself, or use the journal prompts."],
      ["Optional mentor feedback", "If you have a teacher or mentor, share your worksheet and checklist with them."],
    ],
    faq: [
      ["Is this a lesser version?", "No. Same skills, same plan, different practice style."],
      ["How long does it take?", "[X]"],
      ["Can I try the AI Coach later?", "Yes."],
    ],
    cta: "Start Learning",
    journey: [
      ["Welcome and introduction", "How structured lessons and practice build life skills without AI."],
      ["Self-identify your skills", "A checklist, reflection prompts and a personal learning goal."],
      ["Structured roadmap", "Numbered modules in a fixed order, with worksheets, effort estimates and a progress checklist."],
      ["Learn through content", "Short lessons, definitions, examples, diagrams and notes."],
      ["Practice in real life", "Worksheets, journaling, peer role-play, teamwork tasks and daily challenges."],
      ["Assessment", "Fixed quizzes with explanations, a self-rating, a practical rubric and optional mentor feedback."],
      ["Progress tracking", "Completed lessons, worksheets, quiz scores, milestones and reflection notes."],
      ["Improvement plan", "Revision tasks, a weekly plan and your next skill."],
    ],
  },
};

/* ------------------------------------------------------------------
   SMALL HELPERS / COMPONENTS
------------------------------------------------------------------- */

// "[placeholder]" ko highlighted span me dikhata hai
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

// SVG person (symbol #ls-p / #ls-q)
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

/* ---------- inline illustrations (SVG) ---------- */

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

/* ---------- storyline chapters ---------- */

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

/* ---------- coach / own mode section ---------- */

function Mode({ id, onPick }) {
  const m = MODES[id];
  return (
    <div id={id} className={`mode ${id} fx`}>
      <div className="two">
        <div>
          <h2>{m.name}</h2>
          <p className="sub">{m.title}</p>
          <p>{m.sub}</p>
          {m.status ? (
            <>
              <p className="status">{m.status}</p>
              <br />
            </>
          ) : null}
          <a className="btn" href="#join" onClick={() => onPick(m.name)}>
            {m.cta}
          </a>
        </div>
        <Fig k={m.hero[0]} alt={m.hero[1]} cap={m.hero[2]} />
      </div>

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
        {m.gal.map(([k, alt, cap]) => (
          <Fig key={k} k={k} alt={alt} cap={cap} />
        ))}
        {id === "coach" ? <BeforeAfterSvg /> : null}
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
        <a className="btn" href="#join" onClick={() => onPick(m.name)}>
          Get Started
        </a>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------- */
export default function LifeSkills({
  theme: themeProp,
  toggleTheme: toggleThemeProp,
  setShowLoginModal,
  scrollToSection,
}) {
  /* theme: PublicLayout se aaye (controlled) ya localStorage se (ManagerHub jaisa) */
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

  /* join form */
  const [form, setForm] = useState({ name: "", email: "", option: COACH_NAME, level: "", skill: "", goal: "", agree: false });
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
    <PublicLayout
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
      scrollToSection={scrollToSection}
    >
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
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="banner" role="note">
        <b>Preview.</b> This page shows how the Life Skills journeys are planned. Sign-up and the AI Practice Studio are not connected yet.
      </div>

      {/* HERO */}
      <section className="two fx" id="top">
        <div>
          <span className="eyebrow">Future-ready skills</span>
          <h1>Build the life skills you need for study, work and everyday life.</h1>
          <p className="sub">
            Choose a skill, learn it, practise real situations and get a clear plan for what to do next. Both options go from Beginner to Advanced.
          </p>
          <div className="row">
            <a className="btn" href="#coach" style={{ "--a": "var(--c1)" }}>
              Learn with an AI Coach
            </a>
            <a className="btn" href="#own" style={{ "--a": "var(--c2)" }}>
              Learn on Your Own
            </a>
            <a className="btn alt" href="#join" style={{ "--a": "var(--ink)" }}>
              Join now
            </a>
          </div>
          <ol className="path" aria-label="Your path">
            <li>Pick a skill</li>
            <li>Learn it</li>
            <li>Practise it</li>
            <li>Check yourself</li>
            <li>Get your next-step plan</li>
          </ol>
        </div>
        <Fig id="h-img" k="092" alt="A winding road with four milestones: self-awareness, goal setting, skill development and positive habits" />
      </section>

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

      {/* STORY */}
      <section id="story" className="fx" aria-labelledby="sth">
        <span className="eyebrow">The storyline</span>
        <h2 id="sth">Meet Riya: from “I freeze in interviews” to a plan she can follow</h2>
        <p className="status">Illustrative story with a made-up learner. Not a real result.</p>
        <ol className="chap" id="chap">
          {CHAPTERS.map((c, i) => (
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
        <p className="callout">
          The same story works in both options. The only difference is how Riya practises: with the AI coach (preview) or on her own.
        </p>
      </section>

      {/* CHOOSE */}
      <section id="choose" aria-labelledby="ch">
        <h2 id="ch">Which option is right for me?</h2>
        <div className="cmpwrap">
          <table className="cmp">
            <thead>
              <tr>
                <th></th>
                <th>Learn with an AI Coach</th>
                <th>Learn on Your Own</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Best if you want to</th>
                <td>Rehearse conversations and get instant suggestions</td>
                <td>Work through worksheets, journaling and practice with real people</td>
              </tr>
              <tr>
                <th>Practice</th>
                <td>Role-play with an AI coach</td>
                <td>Worksheets and role-play with a friend or mentor</td>
              </tr>
              <tr>
                <th>Feedback</th>
                <td>AI suggestions and a scoring checklist</td>
                <td>Answer keys and a scoring checklist</td>
              </tr>
              <tr>
                <th>Skills covered</th>
                <td>Same</td>
                <td>Same</td>
              </tr>
              <tr>
                <th>You finish with</th>
                <td>Your next-step plan</td>
                <td>Your next-step plan</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, color: "var(--muted)" }}>
          Both options teach the same skills. You can switch any time.{" "}
          <span className="ph">[Confirm that switching is supported before publishing this line.]</span>
        </p>
        <div className="row">
          <a className="btn" href="#coach" style={{ "--a": "var(--c1)" }}>
            Learn with an AI Coach
          </a>
          <a className="btn" href="#own" style={{ "--a": "var(--c2)" }}>
            Learn on Your Own
          </a>
        </div>
      </section>

      {/* MODES */}
      <Mode id="coach" onPick={(n) => setForm((f) => ({ ...f, option: n }))} />
      <Mode id="own" onPick={(n) => setForm((f) => ({ ...f, option: n }))} />

      {/* ASSESS */}
      <section id="assess" aria-labelledby="ah">
        <h2 id="ah">How you are assessed</h2>
        <p className="sub">
          The same six stages in both options, so results are comparable. Each result is shown on its own and never merged into one score.
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
              <span className="lab">Checklist score · Coach suggestion</span>
              <br />
              A clear checklist, an answer key, a mentor comment or an AI suggestion.
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
          <b>Completing a lesson is not the same as mastering a skill.</b> We never show “Skill mastered” from completion alone. AI feedback is a
          suggestion: the checklist and your use of the skill in a real situation are the main evidence. No certificate or verified-skill claim is
          made unless a real verification process exists.
        </p>
      </section>

      {/* PROGRESS */}
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

      {/* PLAN */}
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

      {/* HORIZON */}
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

      {/* SKILLS */}
      <section id="skills">
        <h2>The same 8 skills in both options</h2>
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

      {/* JOIN */}
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

          <fieldset>
            <legend>Your option</legend>
            <div className="opt">
              {[COACH_NAME, OWN_NAME].map((o) => (
                <label key={o}>
                  <input type="radio" name="o" value={o} checked={form.option === o} onChange={set("option")} /> {o}
                </label>
              ))}
            </div>
          </fieldset>

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
    </div>
    </PublicLayout>
  );
}