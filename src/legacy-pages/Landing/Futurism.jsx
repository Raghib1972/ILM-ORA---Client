"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import "./Futurism.css";
// Navbar and footer come from PublicLayout (same shell as Storyline / PersonalityDevelopment).
import PublicLayout from "./components/PublicLayout";

/* ------------------------------------------------------------------ */
/*  IMAGES  (one folder: src/assets/ILMORA_Futurism_SVGs/)            */
/*  13 photos (.webp) + SVG illustrations (all in this one folder)    */
/* ------------------------------------------------------------------ */
import imgHero from "@/assets/ILMORA_Futurism_SVGs/01_hero_future_vision.webp";
import imgJourney from "@/assets/ILMORA_Futurism_SVGs/02_journey_10_steps.webp";
import imgRoadmap from "@/assets/ILMORA_Futurism_SVGs/03_roadmap_6_levels.webp";
import imgScen from "@/assets/ILMORA_Futurism_SVGs/04_scenarios_it_support.webp";
import imgMethod from "@/assets/ILMORA_Futurism_SVGs/05_method_6_steps.webp";
import imgPlan from "@/assets/ILMORA_Futurism_SVGs/06_future_plan_preview.webp";
import imgQuiz from "@/assets/ILMORA_Futurism_SVGs/07_quiz_interface.webp";
import imgProgress from "@/assets/ILMORA_Futurism_SVGs/08_progress_checklist.webp";
import imgNext from "@/assets/ILMORA_Futurism_SVGs/09_next_step.webp";
import imgPersona from "@/assets/ILMORA_Futurism_SVGs/10_persona_student.webp";
import imgRecheck from "@/assets/ILMORA_Futurism_SVGs/11_recheck_signals.webp";
import imgMentor from "@/assets/ILMORA_Futurism_SVGs/12_ask_a_mentor.webp";
import imgSecond from "@/assets/ILMORA_Futurism_SVGs/13_second_question.webp";

import svgHeroThinking from "@/assets/ILMORA_Futurism_SVGs/hero_future_thinking.svg";
import svgBetter from "@/assets/ILMORA_Futurism_SVGs/better_decisions.svg";
import svgCareer from "@/assets/ILMORA_Futurism_SVGs/career_growth.svg";
import svgEmerging from "@/assets/ILMORA_Futurism_SVGs/emerging_technology.svg";
import svgRisk from "@/assets/ILMORA_Futurism_SVGs/risk_identification.svg";
import svgFact from "@/assets/ILMORA_Futurism_SVGs/fact_trend_forecast.svg";
import svgPestle from "@/assets/ILMORA_Futurism_SVGs/pestle_diagram.svg";
import svgScenario from "@/assets/ILMORA_Futurism_SVGs/scenario_paths.svg";
import svgSignals from "@/assets/ILMORA_Futurism_SVGs/signals_scanning.svg";
import svgComplete from "@/assets/ILMORA_Futurism_SVGs/course_complete.svg";
import svgNextStep from "@/assets/ILMORA_Futurism_SVGs/next_step.svg";

/* Next.js static imports give { src, width, height }. This works for both. */
const u = (m) => (m && m.src) || m;

/* ------------------------------------------------------------------ */
/*  SMALL HELPERS                                                     */
/* ------------------------------------------------------------------ */
// Fill time and cost only with confirmed values. Empty shows "To be confirmed".
const CONFIG = { nextModuleUrl: "", time: "", cost: "" };
const shown = (v) => (v && v.trim() ? v : "To be confirmed");
const FACTS = [
  ["For", "Students, job-seekers and early-career learners"],
  ["Format", "Self-paced, six levels"],
  ["Time", shown(CONFIG.time)],
  ["Cost", shown(CONFIG.cost)],
  ["Outcome", "A one-page Future Plan you can copy or print"],
];
const PHASES = [
  ["Understand", "What Futurism is and why it matters", "#gain"],
  ["Learn", "Six levels, a worked example and the 6-step method", "#roadmap"],
  ["Build", "Write your own one-page Future Plan", "#builder"],
  ["Check", "Take the quiz, review and finish", "#quiz"],
];

const store = {
  get(k) {
    try {
      return JSON.parse(window.localStorage.getItem("ilm_fut_" + k));
    } catch (e) {
      return null;
    }
  },
  set(k, v) {
    try {
      const j = JSON.stringify(v);
      window.localStorage.setItem("ilm_fut_" + k, j);
      return window.localStorage.getItem("ilm_fut_" + k) === j;
    } catch (e) {
      return false;
    }
  },
};

const prefersReduced = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function copyText(t) {
  try {
    await navigator.clipboard.writeText(t);
    return true;
  } catch (e) {
    try {
      const a = document.createElement("textarea");
      a.value = t;
      a.setAttribute("readonly", "");
      a.style.position = "fixed";
      a.style.opacity = "0";
      document.body.append(a);
      a.select();
      const ok = document.execCommand("copy");
      a.remove();
      return ok;
    } catch (e2) {
      return false;
    }
  }
}

/* renders trusted, static HTML strings that live in this file */
const H = ({ as: T = "span", h, ...p }) => <T {...p} dangerouslySetInnerHTML={{ __html: h }} />;

/* ------------------------------------------------------------------ */
/*  CONTENT                                                           */
/* ------------------------------------------------------------------ */
const NAV = [
  ["#gain", "What you gain"],
  ["#why", "Why it matters"],
  ["#journey", "Journey"],
  ["#roadmap", "6 Levels"],
  ["#lessons", "Learn"],
  ["#example", "Example"],
  ["#method", "Method"],
  ["#builder", "Build plan"],
  ["#quiz", "Quiz"],
  ["#review", "Review & finish"],
  ["#next", "Next step"],
];

const JR = [
  ["Discover", "#intro", "Read what Futurism is and who the guide is for.", "A clear picture of the guide and its output.", "See what you gain", "#gain"],
  ["Understand", "#why", "See why future-focused thinking matters, with everyday examples.", "Four reasons to learn it.", "See why it matters", "#why"],
  ["Explore the learning path", "#roadmap", "Browse the six levels and pick where to begin.", "Purpose, outcomes and a practice task for each level.", "Open the learning path", "#roadmap"],
  ["Start learning", "#lessons", "Open Level 1 and read the short lesson.", "Plain-English definitions, examples and a quick check.", "Start Level 1", "#lesson-1", "start"],
  ["Learn and practise", "#example", "Study the worked example and the six-step method.", "A pattern you can reuse on any question.", "See the worked example", "#example"],
  ["Build your Future Plan", "#builder", "Fill in seven parts about a topic you choose.", "A one-page plan you can copy or print.", "Open the plan builder", "#builder"],
  ["Take the quiz", "#quiz", "Answer five questions, one at a time.", "A score and an explanation for every answer.", "Take the quiz", "#quiz"],
  ["Review progress", "#review", "Tick the self-review checklist and read your summary.", "An honest view of what you have done on this page.", "Review my progress", "#review"],
  ["Finish", "#finish", "Complete the plan, the checklist and the quiz.", "A finished plan that is yours to keep. No certificate is issued.", "See my finish status", "#finish"],
  ["Next step", "#next", "Choose what to do next with your plan.", "Ideas to keep the plan alive.", "Choose a next step", "#next"],
];

const WHY = [
  [svgCareer, "Career planning", "Notice changing skills early and plan your learning.", "A student sees new skills in job listings and adds them to a study plan."],
  [svgEmerging, "Emerging technology", "Spot new tools and opportunities before they are everywhere.", "A new AI tool appears in a company’s product."],
  [svgRisk, "Uncertainty and risks", "Do not bet everything on one guess. Think about side effects, fairness and disruption early.", "Ask who could be harmed by a new rule."],
  [svgBetter, "Better decisions", "Choose plans that still work if things change.", "Pick skills that help in several futures."],
];

const GX = [
  "Example: “Many offices store files online” is a fact. “More offices move online each year” is a trend. “Most will by 2031” is a forecast.",
  "Example: for IT support, falling software costs (economy) and new security rules (politics) can push in different directions, giving a good, a hard and a mixed future.",
  "Example: if routine tickets are automated, who loses entry-level practice, and what could replace it?",
  "Example: one page with your question, a five-year time frame, three signals, two drivers, three scenarios, two actions and two signals to recheck.",
  "Example: five questions, each with an explanation, then a checklist you tick yourself.",
];

const LV = [
  ["The basics", "Tell a fact, a trend, a forecast and a possible future apart.", "Four plain-English words, and the three kinds of future: possible, plausible and preferred.", "Sort five statements about remote work (see the quiz).", "“Many people work from home” is a fact. “Remote work has grown every year” is a trend."],
  ["What changes the future", "Name the forces that push change.", "Six areas: technology, society, economy, politics, environment and human behaviour.", "Pick a topic and name one driver in three of the six areas.", "For IT support: software costs (economy), new security rules (politics), cloud tools (technology)."],
  ["Your toolkit", "Choose a simple tool for your question.", "Scanning for signals, trend checks, expert views and basic research.", "Find three signals about your chosen topic today.", "Scan job listings for entry-level IT roles and note which skills appear more often."],
  ["Scenarios", "Write 2–4 stories of how the future could unfold.", "How to write a good case, a hard case and a mixed case, and what would cause each.", "Write three short scenarios for one question.", "Three IT-support futures: more automation, more complex systems, or a mix."],
  ["Strategy", "Test your plan and choose actions that work in many futures.", "Robust plans, early warning signs and the 6-step method.", "Pick two actions that help in all three scenarios.", "Learning networking basics helps whichever IT-support scenario happens."],
  ["Advanced thinking", "Think in systems and check ethics.", "Systems, uncertainty, ethical foresight and unintended effects.", "Ask who could be helped or harmed by your plan and name one side effect.", "If routine tickets are automated, who loses entry-level practice, and what could replace it?"],
];

const LES = [
  {
    img: svgFact,
    terms: [
      ["Fact", "Something known to be true now. Example: many offices now store files online."],
      ["Trend", "A direction of change over time. Example: more offices move files online each year."],
      ["Forecast", "A specific estimate, based on stated assumptions. Example: “If this continues, most offices will do so in five years.”"],
      ["Possible future", "A story of what could happen. Example: a world where nearly all office work is online."],
      ["Possible, plausible, preferred", "<b>Possible</b> could happen. <b>Plausible</b> could reasonably happen given what we see today. <b>Preferred</b> is the future we would like to work towards."],
    ],
    note: "A guess presented as a fact is not futurism.",
    chk: ["“Remote work has grown every year since 2020.” This is a…", ["Fact", "Trend", "Forecast"], 1, "It describes a direction of change over time."],
  },
  {
    img: svgPestle,
    terms: [
      ["Six areas", "Technology, society, economy, politics, environment and human behaviour.", 0],
      ["Driver of change", "A strong force pushing change, such as cost, rules or new technology."],
      ["PESTLE", "A checklist of six areas: Political, Economic, Social, Technological, Legal, Environmental. Use it when you are not sure what you are missing."],
    ],
    chk: ["Cost, rules or new technology pushing change are called…", ["Drivers of change", "Wild cards", "Scenarios"], 0, "A driver of change is a strong force pushing change."],
  },
  {
    img: svgSignals,
    terms: [
      ["Signal", "A small sign that something may be changing."],
      ["Weak signal", "A very early sign. It may grow into something big, or fade away."],
      ["Horizon scanning", "Regularly looking for new signals in news, research, job listings and products."],
      ["Trend analysis", "Shows direction, speed and limits of change when you have data over time."],
      ["Backcasting", "Pick the future you want, then work backwards to find the steps."],
      ["Impact / uncertainty grid", "Picks which drivers to focus on first when you have many and little time."],
    ],
    chk: ["A very early sign that may grow or fade is a…", ["Forecast", "Weak signal", "Robust plan"], 1, "A weak signal is a very early sign."],
  },
  {
    img: svgScenario,
    terms: [
      ["Scenario", "A short story of one possible future."],
      ["How many scenarios", "Write 2–4 plausible futures: a good case, a hard case and a mixed case, and what would cause each.", 0],
      ["Wild card", "A rare event that would have a big impact, like a sudden global event."],
    ],
    chk: ["Why use more than one scenario?", ["Nobody knows which one will happen", "To make the plan longer", "One is always wrong"], 0, "Nobody knows which future will happen, so plans should work in several."],
  },
  {
    img: svgBetter,
    terms: [
      ["Robust plan", "A plan that still works in several different futures."],
      ["Early warning signs", "Signals to watch that tell you a scenario may be coming true."],
      ["Choose actions", "Pick actions that work in many futures, then revisit them when evidence changes.", 0],
    ],
    note: '<a href="#method">See the 6-step method</a>',
    chk: ["A plan that still works in several futures is a…", ["Robust plan", "Weak signal", "Forecast"], 0, "A robust plan works in several different futures."],
  },
  {
    img: svgHeroThinking,
    terms: [
      ["Systems thinking", "See how parts connect and affect each other."],
      ["Handling uncertainty", "State your assumptions and test them."],
      ["Ethical foresight", "Ask who could be helped or harmed, and whether it is fair, private and safe."],
      ["Unintended effects", "Look for side effects before they happen."],
    ],
    chk: ["Asking who could be harmed and whether a plan is fair is…", ["Backcasting", "Ethical foresight", "Horizon scanning"], 1, "Ethical foresight asks who could be helped or harmed."],
  },
];

const GT = [];
LES.forEach((l, i) =>
  l.terms.forEach((t) => {
    if (t[2] !== 0) GT.push([t[0], t[1].replace(/<[^>]+>/g, ""), i + 1]);
  })
);

const PS = [
  ["student", "How could the field I want to study change over the next five years, and which skills will still matter?", "The next five years"],
  ["job-seeker", "How might the roles I am applying for change over the next three years?", "The next three years"],
  ["early-career learner", "How could my current field change, and what should I learn now to stay flexible?", "The next five years"],
];
const PERSONAS = [
  ["Students", "Plan what to study when the world of work is changing."],
  ["Job-seekers", "Notice which skills keep appearing and choose where to build."],
  ["Early-career learners", "Make choices that still work if your field changes."],
];

const SC = [
  ["A · More automation", "Software handles routine tickets.", "Troubleshooting, security, communication, checking AI output.", "Assumes tools keep improving at routine tasks."],
  ["B · More complex systems", "Cloud, remote work and security issues create harder problems.", "Deep technical knowledge, handling incidents.", "Assumes systems keep getting more connected."],
  ["C · Mixed change", "Software does repetitive work; people handle exceptions and users.", "A mix of both lists.", "Assumes both changes happen at once."],
];
const SD = [
  ["A · More automation", "Job listings mention AI tools; routine-ticket volume falls; companies hire fewer entry-level staff.", "Entry-level support staff and people changing careers into IT.", "Practise troubleshooting, security and checking automated output."],
  ["B · More complex systems", "More cloud and remote tools appear; security incidents are in the news; employers ask for deeper technical skills.", "Small businesses and new graduates without hands-on experience.", "Build networking, cloud and operating-system basics through projects."],
  ["C · Mixed change", "Both signs appear: tools handle repetitive tasks while users still need human help.", "Everyone, unevenly: roles change rather than disappear.", "Combine technical basics with communication, and keep rechecking listings."],
];

const ST = [
  ["Ask the question", "Write what you want to explore and set a time frame.", "Question and time frame"],
  ["Scan for signals", "Look at research, job listings, new rules, products and expert comments.", "Signals"],
  ["Find the drivers", "Pick the biggest forces causing change.", "Drivers"],
  ["Build scenarios", "Write 2–4 plausible futures: a good case, a hard case and a mixed case.", "Scenarios"],
  ["Check the impact", "Ask who gains, who is at risk, which skills change and which assumptions could be wrong.", "Shapes your actions"],
  ["Act and review", "Choose next steps, list signals to watch and revisit your plan when evidence changes.", "Actions and signals to monitor"],
];
const MF = ["f_q", "f_sg", "f_dr", "f_sc", "f_ac", "f_wt"];

const FD = [
  ["q", "Question", "What do you want to explore?", "How might entry-level IT support change over the next five years?", "Step 1"],
  ["tf", "Time frame", "Over what period?", "The next five years", "Step 1"],
  ["sg", "Three signals you can find today", "Use news, job listings or people you know.", "1) New tools in job listings\n2) A company news item\n3) A new security rule", "Step 2"],
  ["dr", "Two drivers of change", "The biggest forces causing change.", "1) Cost of software\n2) New security rules", "Step 3"],
  ["sc", "Three short scenarios: good, hard, mixed", "One or two sentences each.", "Good: …\nHard: …\nMixed: …", "Step 4"],
  ["ac", "Two actions that help in all three", "Actions that work whichever scenario happens.", "1) Learn networking basics\n2) Practise clear communication", "Steps 5–6"],
  ["wt", "Two signals to check again in three months", "What will you look at again?", "1) Skills in new job listings\n2) New company tools", "Step 6"],
];
const EXP = {
  q: "How might entry-level IT support change over the next five years?",
  tf: "The next five years",
  sg: "1) New tools in job listings\n2) A company news item about automation\n3) A new security rule",
  dr: "1) Cost of software\n2) New security rules",
  sc: "Good: Software handles routine tickets and people focus on harder problems.\nHard: Fewer entry-level roles and higher skill expectations.\nMixed: Software does repetitive work; people handle exceptions and users.",
  ac: "1) Learn networking basics\n2) Practise clear communication",
  wt: "1) Skills named in new job listings\n2) New company tools",
};

const Q = [
  ["“Many people now work from home.” Fact, trend, forecast or possible future?", ["Fact", "Trend", "Forecast", "Possible future"], 0, "It is something known to be true now.", 1],
  ["“Remote work has grown every year since 2020.”", ["Fact", "Trend", "Forecast", "Possible future"], 1, "It describes a direction of change over time.", 1],
  ["“By 2030, 60% of jobs will be remote.”", ["Fact", "Trend", "Forecast", "Possible future"], 2, "It is a specific estimate and needs stated assumptions.", 1],
  ["Why use more than one scenario?", ["Because nobody knows which one will happen, so plans should work in several", "To make the report longer", "Because one scenario is always wrong"], 0, "Nobody knows which future will happen. Plans should work in several.", 4],
  ["A futuristic city picture appears in an advert, with no evidence or decisions. Is it futurism?", ["Yes, it shows the future", "No, it has no method, evidence or link to decisions", "Only if it has robots"], 1, "Futurism needs a method, evidence and a link to decisions.", 0],
];

const CK = [
  "The question and time frame are clear.",
  "Evidence and assumptions are kept separate.",
  "More than one plausible future is considered.",
  "Impacts, risks, opportunities and ethics are reviewed.",
  "The plan ends with actions and signals to watch.",
];

/* ------------------------------------------------------------------ */
/*  REUSABLE PIECES                                                   */
/* ------------------------------------------------------------------ */
function MiniCheck({ c }) {
  const [pick, setPick] = useState(null);
  const ok = pick === c[2];
  return (
    <div className="qc">
      <b>Quick check (not scored):</b> {c[0]}
      <div role="group" aria-label="Answers">
        {c[1].map((o, i) => (
          <button key={i} className="ob" type="button" onClick={() => setPick(i)}>
            {o}
          </button>
        ))}
      </div>
      {pick !== null && (
        <p className={"ex" + (ok ? " ok" : "")} role="status">
          {(ok ? "Correct. " : "Not quite. ") + c[3]}
        </p>
      )}
    </div>
  );
}

/* Moving card strip. Falls back to a static wrapped grid when cards fit. */
function Marquee({ items, render, wide, id, className = "" }) {
  const wrap = useRef(null);
  const track = useRef(null);
  const [need, setNeed] = useState(false);
  const [dur, setDur] = useState(60);
  const [pz, setPz] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    const t = track.current;
    if (!el || !t) return;
    const measure = () => {
      const kids = [...t.children].filter((c) => !c.hasAttribute("data-mqc"));
      const gap = 14;
      const w = kids.reduce((a, c) => a + c.offsetWidth + gap, 0);
      setNeed(kids.length > 0 && w - gap > el.clientWidth + 1);
      setDur(Math.max(20, Math.round(w / 40)));
    };
    measure();
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [items.length, wide]);

  const hp = { "data-mqc": "1", "aria-hidden": "true" };
  return (
    <div
      id={id}
      ref={wrap}
      className={`mqv ${wide ? "wd" : ""} ${need ? "" : "st"} ${pz ? "pz" : ""} ${className}`}
      onTouchStart={() => setPz(true)}
      onTouchEnd={() => setTimeout(() => setPz(false), 2500)}
    >
      <div className="mqt" ref={track} style={{ "--mqd": dur + "s" }}>
        {items.map((it, i) => (
          <Fragment key={"a" + i}>{render(it, false, {})}</Fragment>
        ))}
        {need &&
          items.map((it, i) => (
            <Fragment key={"b" + i}>{render(it, true, hp)}</Fragment>
          ))}
      </div>
    </div>
  );
}

function GainItem({ title, children, example }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <div>
        <b>{title}</b>
        <p>{children}</p>
        <button type="button" className="mo" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? "Hide example" : "See an example"}
        </button>
        {open && <p className="gx ex">{example}</p>}
      </div>
    </li>
  );
}

function PlanList({ fields, S, id }) {
  return (
    <dl id={id} style={{ margin: 0 }}>
      {fields.map((f) => (
        <Fragment key={f[0]}>
          <dt>{f[1]}</dt>
          <dd>{S[f[0]]}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */
export default function Futurism({ theme: themeProp, toggleTheme: toggleThemeProp, setShowLoginModal, scrollToSection }) {
  // Theme: use the parent's if given, otherwise follow the site theme (html.dark / localStorage "theme").
  // Starts as light on server and client so hydration matches, then syncs after mount.
  const [darkMode, setDarkMode] = useState(false);
  const controlled = themeProp !== undefined;
  const theme = controlled ? themeProp : darkMode ? "dark" : "light";
  const toggleTheme = () => {
    if (controlled && toggleThemeProp) {
      toggleThemeProp();
      return;
    }
    const n = !darkMode;
    setDarkMode(n);
    try {
      window.localStorage.setItem("theme", n ? "dark" : "light");
      document.documentElement.classList.toggle("dark", n);
    } catch (e) {}
  };
  useEffect(() => {
    const read = () => {
      const h = document.documentElement;
      if (h.classList.contains("dark")) return true;
      const dt = h.getAttribute("data-theme");
      if (dt) return dt === "dark";
      try {
        return window.localStorage.getItem("theme") === "dark";
      } catch (e) {
        return false;
      }
    };
    setDarkMode(read());
    const mo = new MutationObserver(() => setDarkMode(read()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    const f = (e) => e.key === "theme" && setDarkMode(read());
    window.addEventListener("storage", f);
    return () => {
      mo.disconnect();
      window.removeEventListener("storage", f);
    };
  }, []);

  const rootRef = useRef(null);
  const barRef = useRef(null);

  const [LS, setLS] = useState({ v: [0, 0, 0, 0, 0, 0], d: [0, 0, 0, 0, 0, 0] });
  const LSr = useRef(LS);
  const [lmOk, setLmOk] = useState(true);
  const [ri, setRi] = useState(0);
  const [openL, setOpenL] = useState({});
  const [S, setS] = useState({});
  const [errs, setErrs] = useState({});
  const [hasDraft, setHasDraft] = useState(false);
  const [active, setActive] = useState("");
  const [bm, setBm] = useState("");
  const [nm, setNm] = useState("");
  const [qi, setQi] = useState(0);
  const [qp, setQp] = useState(-1);
  const [qs, setQs] = useState(0);
  const [qa, setQa] = useState([]);
  const [qerr, setQerr] = useState("");
  const [ck, setCk] = useState(CK.map(() => false));
  const [jv, setJv] = useState([]);
  const [pi, setPi] = useState(null);
  const [si, setSi] = useState(0);
  const [ms, setMs] = useState(0);
  const [gq, setGq] = useState("");

  /* ---------- load saved state (client only) ---------- */
  useEffect(() => {
    const l = store.get("levels");
    if (l && Array.isArray(l.v) && Array.isArray(l.d)) {
      LSr.current = l;
      setLS(l);
    }
    const c = store.get("ck");
    if (Array.isArray(c)) setCk(CK.map((_, i) => !!c[i]));
    const j = store.get("jv");
    if (Array.isArray(j)) setJv(j);
    setHasDraft(!!store.get("draft"));
  }, []);

  const updLS = useCallback((fn) => {
    const n = fn(LSr.current);
    LSr.current = n;
    setLS(n);
    setLmOk(store.set("levels", n));
  }, []);

  /* ---------- open lesson from #lesson-N ---------- */
  useEffect(() => {
    const f = (first) => {
      const m = window.location.hash.match(/^#lesson-([1-6])$/);
      if (!m) return;
      setOpenL((o) => (o[m[1]] ? o : { ...o, [m[1]]: true }));
      if (first)
        setTimeout(() => {
          const d = document.getElementById("lesson-" + m[1]);
          if (d) d.scrollIntoView({ block: "start" });
        }, 120);
    };
    f(true);
    const h = () => f(false);
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);

  /* ---------- scroll progress, nav highlight, reveal ---------- */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const m = h.scrollHeight - h.clientHeight;
      if (barRef.current) barRef.current.style.width = (m > 0 ? (h.scrollTop / m) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const cleanups = [() => window.removeEventListener("scroll", onScroll)];
    if ("IntersectionObserver" in window && rootRef.current) {
      const so = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) setActive("#" + e.target.id);
          }),
        { rootMargin: "-40% 0px -55% 0px" }
      );
      NAV.forEach(([h]) => {
        const sec = document.getElementById(h.slice(1));
        if (sec) so.observe(sec);
      });
      cleanups.push(() => so.disconnect());

      if (!prefersReduced()) {
        const ro = new IntersectionObserver(
          (es) =>
            es.forEach((e) => {
              if (e.isIntersecting) {
                e.target.setAttribute("data-rv", "in");
                ro.unobserve(e.target);
              }
            }),
          { threshold: 0.05 }
        );
        rootRef.current
          .querySelectorAll(".sh,.jr li,.gains li,.why .mqt>div,.fork>.sc,.mg>div,.sheet,.fig,.out,.merge>div,.nx>.c")
          .forEach((el) => {
            el.setAttribute("data-rv", "");
            ro.observe(el);
          });
        cleanups.push(() => ro.disconnect());
      }
    }
    return () => cleanups.forEach((c) => c());
  }, []);

  /* ---------- lessons ---------- */
  const startL = (n) => {
    setRi(n - 1);
    updLS((s) => ({ ...s, v: s.v.map((x, i) => (i === n - 1 ? 1 : x)) }));
    setOpenL((o) => ({ ...o, [n]: true }));
    setTimeout(() => {
      const d = document.getElementById("lesson-" + n);
      if (!d) return;
      d.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "start" });
      const s = d.querySelector("summary");
      if (s) s.focus({ preventScroll: true });
    }, 60);
  };
  const LL = (n, label) => (
    <a
      href={"#lesson-" + n}
      onClick={(e) => {
        e.preventDefault();
        startL(n);
      }}
    >
      {label}
    </a>
  );
  const onToggle = (e, n) => {
    const o = e.currentTarget.open;
    setOpenL((s) => (!!s[n] === o ? s : { ...s, [n]: o }));
    if (o && !LSr.current.v[n - 1]) {
      updLS((s) => ({ ...s, v: s.v.map((x, i) => (i === n - 1 ? 1 : x)) }));
    }
  };

  /* ---------- journey ---------- */
  const visit = (i) =>
    setJv((p) => {
      if (p.includes(i)) return p;
      const n = [...p, i];
      store.set("jv", n);
      return n;
    });

  /* ---------- roadmap ---------- */
  const l = LV[ri];
  const st = LS.d[ri] ? ["Completed by you", "d"] : LS.v[ri] ? ["In progress", "p"] : ["Not started", ""];
  const cta = LS.d[ri] ? "Review this level" : LS.v[ri] ? "Continue learning" : "Open Level " + (ri + 1);
  const tabKey = (e) => {
    let n = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (ri + 1) % 6;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (ri + 5) % 6;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = 5;
    if (n !== null) {
      e.preventDefault();
      setRi(n);
      requestAnimationFrame(() => {
        const t = document.getElementById("t" + n);
        if (t) t.focus();
      });
    }
  };

  /* ---------- builder ---------- */
  const filled = FD.filter((f) => (S[f[0]] || "").trim());
  const setField = (k, v) => {
    setS((p) => ({ ...p, [k]: v }));
    setErrs((p) => (p[k] ? { ...p, [k]: "" } : p));
  };
  const planText = () => filled.map((f) => f[1] + ":\n" + S[f[0]]).join("\n\n");
  const validate = () => {
    const e = {};
    let first = null;
    FD.forEach((f) => {
      if (!(S[f[0]] || "").trim()) {
        e[f[0]] = `Please complete “${f[1]}”.`;
        if (!first) first = f[0];
      }
    });
    setErrs(e);
    if (first) {
      const t = document.getElementById("f_" + first);
      if (t) t.focus();
      setBm(`${FD.length - filled.length} part(s) still need an answer.`);
      return false;
    }
    return true;
  };
  const focusField = (id) => setTimeout(() => {
    const t = document.getElementById(id);
    if (t) t.focus({ preventScroll: true });
  }, 500);

  /* ---------- quiz ---------- */
  const qDone = qi >= Q.length;
  const QS = qDone ? qa.filter((x, k) => x === Q[k][2]).length : null;
  const qMounted = useRef(false);
  useEffect(() => {
    if (!qMounted.current) {
      qMounted.current = true;
      return;
    }
    const f = document.querySelector("#qz legend, #qz .score");
    if (f) {
      f.tabIndex = -1;
      f.focus({ preventScroll: true });
    }
  }, [qi, qs]);
  const qSubmit = () => {
    if (!qs) {
      if (qp < 0) {
        setQerr("Please choose an answer.");
        return;
      }
      setQerr("");
      setQs(1);
      setQa((a) => {
        const n = [...a];
        n[qi] = qp;
        return n;
      });
    } else {
      setQi(qi + 1);
      setQp(-1);
      setQs(0);
    }
  };
  const reviewLink = (q) =>
    q[4] ? (
      LL(q[4], "Review the lesson")
    ) : (
      <a href="#spot">Review the lesson</a>
    );

  /* ---------- review / finish ---------- */
  const ckCount = ck.filter(Boolean).length;
  const lvDone = LS.d.filter(Boolean).length;
  const okArr = [filled.length === FD.length, ckCount === CK.length, QS !== null];
  const all = okArr.every(Boolean);
  const todo = [
    ["Fill in all seven parts of your Future Plan", `${filled.length} of ${FD.length} done`, "#builder"],
    ["Tick all five self-review checks", `${ckCount} of ${CK.length} done`, "#ck"],
    ["Finish the quiz", QS === null ? "not finished" : `score ${QS} / ${Q.length}`, "#quiz"],
  ];

  /* ---------- glossary ---------- */
  const gqn = gq.trim().toLowerCase();
  const gRes = GT.filter((t) => !gqn || (t[0] + " " + t[1]).toLowerCase().includes(gqn));

  /* ---------- plan helpers shared by buttons ---------- */
  const goBuilder = () => {
    window.location.hash = "#builder";
  };

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={setShowLoginModal} scrollToSection={scrollToSection}>
    <div className="fut" ref={rootRef} data-theme={theme}>
      <div id="sp" ref={barRef} aria-hidden="true" />
      <a className="skip" href="#main">Skip to content</a>

      {/* SUB NAVBAR: sits right below the main PublicLayout navbar */}
      <nav className="subnav" aria-label="Page sections">
        <div className="w">
          <span className="sn-t">Life Skills <i>/</i> <b>Futurism</b></span>
          <div className="nl">
            {NAV.map(([h, t]) => (
              <a key={h} href={h} className={active === h ? "on" : undefined} aria-current={active === h ? "true" : undefined}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main id="main">
        {/* 1 HERO */}
        <section className="hero" id="intro" aria-labelledby="h1">
          <div className="w">
            <div className="hg">
              <div>
                <h1 id="h1">See what could change. <em>Decide what to do today.</em></h1>
                <p className="lead">
                  Futurism is future-focused thinking. In six short levels you learn to spot signals, compare possible futures and choose actions that still work if things change. You finish with a one-page Future Plan of your own.
                </p>
                <div className="row">
                  <a
                    className="btn or js-start"
                    href="#lesson-1"
                    onClick={(e) => {
                      e.preventDefault();
                      startL(1);
                    }}
                  >
                    Start Learning
                  </a>
                  <a className="btn o" href="#journey">See how it works</a>
                </div>
                <p className="note">
                  Here, <em>Futurism</em> means future-focused thinking, not the early-1900s art movement of the same name.
                </p>
              </div>
              <div className="hv">
                <div className="fr">
                  <img
                    src={u(imgHero)}
                    alt="Two colleagues study a glowing holographic model of a future city, with data screens floating above them."
                    width="1080"
                    height="698"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
                <a className="mini" href="#builder" aria-label="Your output: one-page Future Plan. Open the plan builder">
                  <b>Your output</b>
                  <div>One-page Future Plan</div>
                  <i></i><i></i><i></i><i></i><i></i><i></i>
                </a>
              </div>
            </div>
            <p className="rail-l" style={{ marginBottom: 12 }}>Your journey in ten steps</p>
            <Marquee
              className="rail-mq"
              items={JR.map((j, i) => [j, i])}
              render={(it, hid, hp) => (
                <div {...hp} className={"rp" + (jv.includes(it[1]) ? " vis" : "")}>
                  <a href={it[0][1]} tabIndex={hid ? -1 : undefined} onClick={() => visit(it[1])}>
                    <i>{it[1] + 1}</i>
                    {it[0][0]}
                  </a>
                </div>
              )}
            />
            <div className="how">
              <p>
                <b>How this page is organised.</b> Four phases, in this order. The ten steps above are the whole route. The six levels are the lessons inside it (steps 3 to 5). The 6-step method is the routine you repeat on any question, and your Future Plan follows it.
              </p>
              <ol className="ph4" aria-label="Four phases">
                {PHASES.map((x, i) => (
                  <li key={x[0]}>
                    <a href={x[2]}>
                      <i>{i + 1}</i>
                      <span>
                        <b>{x[0]}</b>
                        {x[1]}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <div className="mq" aria-hidden="true">
          <div className="mq-t">
            {[0, 1].map((k) => (
              <div className="mq-h" key={k}>
                {[0, 1, 2, 3].map((n) => (
                  <span key={n}>{JR.map((j) => j[0]).join(" → ")} →</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* QUICK FACTS */}
        <section className="s alt compact" aria-label="Quick facts">
          <div className="w">
            <div className="fgrid">
              {FACTS.map((f) => (
                <div key={f[0]} className="c">
                  <span className="k">{f[0]}</span>
                  <p>{f[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2 WHO + GAIN */}
        <section className="s" id="gain">
          <div className="w">
            <div className="sp">
              <div>
                <h2>Built for people deciding what to learn and do next.</h2>
                <p className="mu">
                  No background is needed. If you are choosing a study path, a first job or a new skill, this guide gives you a simple method for thinking about change.
                </p>
                <ul className="who" aria-label="Choose who you are">
                  {PERSONAS.map((p, i) => (
                    <li key={i}>
                      <button type="button" className="pb" aria-pressed={pi === i} onClick={() => setPi(i)}>
                        <span className="dot">{i + 1}</span>
                        <span>
                          <b>{p[0]}</b>
                          <span>{p[1]}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="c" id="pp" aria-live="polite" style={{ marginTop: 14 }}>
                  {pi === null ? (
                    <p className="mu" style={{ margin: 0 }}>Choose the option that describes you to get a starter question for your plan.</p>
                  ) : (
                    <>
                      <span className="k">Starter question for a {PS[pi][0]}</span>
                      <p style={{ fontWeight: 700, fontSize: "1.05rem", margin: "6px 0" }}>{PS[pi][1]}</p>
                      <p className="note">Time frame: {PS[pi][2]}. You can change both in the plan builder.</p>
                      <button
                        className="btn sm"
                        type="button"
                        onClick={() => {
                          setS((p) => ({ ...p, q: PS[pi][1], tf: PS[pi][2] }));
                          goBuilder();
                          focusField("f_sg");
                          setBm("Starter question added. Now add three signals.");
                        }}
                      >
                        Use this in my Future Plan
                      </button>
                    </>
                  )}
                </div>
              </div>
              <figure className="fig">
                <img src={u(imgPersona)} alt="A learner writes notes by hand in a notebook, planning what to learn next." width="1080" height="720" loading="lazy" />
              </figure>
            </div>

            <div style={{ marginTop: "clamp(48px,7vw,96px)" }}>
              <h2>Five things you can do when you finish.</h2>
            </div>
            <ol className="gains" style={{ marginTop: 20 }}>
              <GainItem title="Tell facts, trends, forecasts, signals and possible futures apart" example={GX[0]}>
                Stop treating a guess as a fact. {LL(1, "Level 1")}
              </GainItem>
              <GainItem title="Find drivers of change and explore more than one scenario" example={GX[1]}>
                Name the forces behind change and write good, hard and mixed cases. {LL(2, "Levels 2–4")}
              </GainItem>
              <GainItem title="Weigh risks, opportunities, impacts and ethics" example={GX[2]}>
                Ask who gains, who is at risk and what could go wrong. {LL(6, "Levels 5–6")}
              </GainItem>
              <GainItem title="Create a practical one-page Future Plan" example={GX[3]}>
                Question, time frame, signals, drivers, scenarios, actions and signals to monitor. <a href="#builder">Plan builder</a>
              </GainItem>
              <GainItem title="Check your understanding" example={GX[4]}>
                A five-question quiz with explanations, and a self-review checklist. <a href="#quiz">Quiz</a>
              </GainItem>
            </ol>

            <div className="out">
              <div>
                <h3 style={{ fontSize: "1.6rem", color: "var(--ac)" }}>A Future Plan on one page.</h3>
                <p className="mu">
                  You choose a topic that matters to you, such as your chosen career in five years. The plan builder walks you through seven parts. You can copy the plan as text or print it. This guide does not give a certificate or a qualification. The plan is your own work.
                </p>
                <div className="row">
                  <a className="btn" href="#builder">Go to the plan builder</a>
                </div>
              </div>
              <div className="sheet" aria-label="Structure of the Future Plan">
                <span className="tag">Structure preview</span>
                <h3>My Future Plan</h3>
                <dl>
                  {[
                    ["Question", "What do I want to explore?"],
                    ["Time frame", "Over what period?"],
                    ["Signals", "Three signs of change I can find today"],
                    ["Drivers", "The biggest forces behind the change"],
                    ["Scenarios", "A good, a hard and a mixed future"],
                    ["Actions", "Steps that help in all three"],
                    ["Signals to monitor", "What I will check again in three months"],
                  ].map((r, i) => (
                    <Fragment key={i}>
                      <dt><span>{i + 1}</span>{r[0]}</dt>
                      <dd>{r[1]}</dd>
                    </Fragment>
                  ))}
                </dl>
              </div>
            </div>

            <div id="why" style={{ marginTop: "clamp(56px,8vw,104px)" }}>
              <h2>Prepare for several futures, not one guess.</h2>
              <p className="mu" style={{ maxWidth: 780, fontSize: "1.08rem" }}>
                Futurism does not predict the future. It uses evidence, trends and imagination to help you decide today.
              </p>
              <div className="why">
                <Marquee
                  wide
                  items={WHY}
                  render={(a, hid, hp) => (
                    <div {...hp}>
                      <img src={u(a[0])} alt="" loading="lazy" width="1200" height="720" />
                      <div>
                        <h3>{a[1]}</h3>
                        <p>{a[2]}</p>
                        <i>Example: {a[3]}</i>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3 JOURNEY */}
        <section className="s alt" id="journey">
          <div className="w">
            <div className="sp ph">
              <div className="sh">
                <h2>From first look to a finished plan, in ten steps.</h2>
                <p>Each step says what you do and what you get. You can move in order or jump to any step.</p>
              </div>
              <figure className="fig ph" style={{ "--mw": "600px" }}>
                <img
                  src={u(imgJourney)}
                  alt="A person arranges notes and ideas on a corkboard, working through a plan one step at a time."
                  width="1080"
                  height="597"
                  decoding="async"
                  loading="lazy"
                />
              </figure>
            </div>
            <ol className="jr" id="jr">
              {JR.map((j, i) => {
                const v = jv.includes(i);
                return (
                  <li key={i}>
                    <span className="nb" aria-hidden="true" style={v ? { background: "#15803D" } : undefined}>
                      {v ? "✓" : i + 1}
                    </span>
                    <div
                      className="cd"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        if (e.target.closest("a,button")) return;
                        visit(i);
                        if (j[6]) startL(1);
                        else window.location.hash = j[5];
                      }}
                    >
                      <span className="ph">Step {i + 1}</span>
                      {v && (
                        <span className="vc badge e" style={{ marginLeft: 8 }}>Visited</span>
                      )}
                      <h3>{j[0]}</h3>
                      <dl>
                        <dt>You do</dt>
                        <dd>{j[2]}</dd>
                        <dt>You get</dt>
                        <dd>{j[3]}</dd>
                      </dl>
                      <a
                        className="btn o sm"
                        href={j[5]}
                        onClick={(e) => {
                          visit(i);
                          if (j[6]) {
                            e.preventDefault();
                            startL(1);
                          }
                        }}
                      >
                        {j[4]}
                      </a>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="jnote">
              <b>How progress works:</b> there are no accounts, scores sent anywhere or percentages. Level marks and the checklist are self-managed and kept in this browser only. Your plan is saved only if you press “Save draft”.
            </p>
          </div>
        </section>

        {/* 4 ROADMAP */}
        <section className="s" id="roadmap">
          <div className="w">
            <div className="sp ph">
              <div className="sh">
                <h2>Six levels, from the basics to advanced thinking.</h2>
                <p>Choose a level to see its purpose, what you will understand, a practical example and a way to open the lesson.</p>
              </div>
              <figure className="fig ph" style={{ "--mw": "600px" }}>
                <img
                  src={u(imgRoadmap)}
                  alt="A green, sustainable city with wind turbines and solar panels, where a group of professionals discuss what comes next."
                  width="1080"
                  height="664"
                  decoding="async"
                  loading="lazy"
                />
              </figure>
            </div>
            <div id="rm">
              <div className="tabs" role="tablist" aria-label="Six levels">
                {LV.map((v, k) => (
                  <button
                    key={k}
                    role="tab"
                    id={"t" + k}
                    className={LS.d[k] ? "dn" : ""}
                    aria-selected={ri === k}
                    aria-controls="rp"
                    tabIndex={ri === k ? 0 : -1}
                    onClick={() => setRi(k)}
                    onKeyDown={tabKey}
                    type="button"
                  >
                    <i>{k + 1}</i>
                    {v[0]}
                  </button>
                ))}
              </div>
              <div className="panel" id="rp" role="tabpanel" aria-labelledby={"t" + ri}>
                <div>
                  <span className="k">Level {ri + 1} of 6</span> <span className={"chip " + st[1]}>{st[0]}</span>
                  <h3>{l[0]}</h3>
                  <dl>
                    <dt>Purpose</dt>
                    <dd>{l[1]}</dd>
                    <dt>What you will understand</dt>
                    <dd>{l[2]}</dd>
                    <dt>Practice</dt>
                    <dd>{l[3]}</dd>
                    <dt>Practical example</dt>
                    <dd><div className="ex">{l[4]}</div></dd>
                  </dl>
                  <div className="row">
                    <a
                      className="btn"
                      href={"#lesson-" + (ri + 1)}
                      onClick={(e) => {
                        e.preventDefault();
                        startL(ri + 1);
                      }}
                    >
                      {cta}
                    </a>
                    <button
                      className="btn o"
                      type="button"
                      aria-pressed={!!LS.d[ri]}
                      onClick={() =>
                        updLS((s) => {
                          const d = [...s.d];
                          const v = [...s.v];
                          d[ri] = d[ri] ? 0 : 1;
                          if (d[ri]) v[ri] = 1;
                          return { v, d };
                        })
                      }
                    >
                      {LS.d[ri] ? "Mark as not completed" : "Mark level as completed"}
                    </button>
                  </div>
                  <p className="note">
                    Status is self-managed: it only changes when you open the lesson or press the button.{" "}
                    {lmOk ? "Stored in this browser only." : "Could not be saved here, so it resets when you reload."}
                  </p>
                </div>
                <figure className="fig" style={{ alignSelf: "center" }}>
                  <img src={u(LES[ri].img)} alt={l[0] + ": illustration"} width="1200" height="720" />
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 5 CONCEPTS */}
        <section className="s alt" id="lessons">
          <div className="w">
            <div className="sh">
              <h2>Short explanations, examples and quick checks.</h2>
              <p>Open a level. Each one ends with a quick check that is not scored.</p>
            </div>
            <div id="ls">
              {LES.map((x, i) => (
                <details key={i} id={"lesson-" + (i + 1)} open={!!openL[i + 1]} onToggle={(e) => onToggle(e, i + 1)}>
                  <summary>
                    <span className="n">{i + 1}</span>
                    Level {i + 1}: {LV[i][0]}
                  </summary>
                  <div>
                    <div className="sp">
                      <div>
                        <p className="mu"><b>Purpose:</b> {LV[i][1]}</p>
                        <dl className="d">
                          {x.terms.map((t) => (
                            <Fragment key={t[0]}>
                              <dt>{t[0]}</dt>
                              <H as="dd" h={t[1]} />
                            </Fragment>
                          ))}
                        </dl>
                        {x.note && <H as="p" className="note" h={x.note} />}
                      </div>
                      <figure className="fig">
                        <img src={u(x.img)} alt={LV[i][0] + ": illustration"} loading="lazy" width="1200" height="720" />
                      </figure>
                    </div>
                    <MiniCheck c={x.chk} />
                  </div>
                </details>
              ))}
            </div>

            <div className="c sp2" id="spot">
              <span className="k">Observe</span>
              <h3>How to tell real futurism from a futuristic picture</h3>
              <p className="mu">A futuristic picture is not futurism. Futurism uses a method and ends in decisions. Ask whether it:</p>
              <ul className="l mu">
                <li>Looks beyond today and asks what could change.</li>
                <li>Uses signals, trends, evidence, expert input or clearly stated assumptions.</li>
                <li>Considers more than one possible outcome.</li>
                <li>Explains opportunities, risks and who could be affected.</li>
                <li>Links the future to choices people can make now.</li>
              </ul>
              <MiniCheck
                c={[
                  "An advert shows a glowing city with flying cars. No evidence, no choices. Is it futurism?",
                  ["Yes", "No"],
                  1,
                  "A futuristic picture with no method, evidence or link to decisions is not futurism.",
                ]}
              />
            </div>

            <div className="gl" id="glossary">
              <h2 style={{ fontSize: "clamp(1.4rem,2.6vw,1.9rem)" }}>Key terms in plain English.</h2>
              <label className="f" htmlFor="gq" style={{ marginTop: 8 }}>Filter terms</label>
              <input
                type="search"
                id="gq"
                placeholder="Type a word, such as signal"
                autoComplete="off"
                value={gq}
                onChange={(e) => setGq(e.target.value)}
              />
              <p className="note" id="gc" role="status" aria-live="polite">
                {gRes.length ? `${gRes.length} of ${GT.length} terms shown.` : "No terms match. Try another word."}
              </p>
              <div className="gg" id="gg">
                <Marquee
                  items={gRes}
                  render={(t, hid, hp) => (
                    <div {...hp}>
                      <b>{t[0]}</b>
                      <p>{t[1]}</p>
                      <a
                        href={"#lesson-" + t[2]}
                        tabIndex={hid ? -1 : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          startL(t[2]);
                        }}
                      >
                        Level {t[2]}
                      </a>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 6 EXAMPLE */}
        <section className="s" id="example">
          <div className="w">
            <div className="sp">
              <div>
                <h2>The future of IT support.</h2>
                <p>
                  <span className="badge h">Hypothetical</span>
                  <span className="badge a">Assumption</span>
                  <span className="badge e">Evidence to check</span>
                </p>
                <p className="mu">
                  <b>This is an illustration of the method, not a prediction.</b> The scenarios are hypothetical and no statistics are claimed. Check current job listings and industry reports before using it for real decisions.
                </p>
              </div>
              <figure className="fig ph" style={{ "--mw": "600px" }}>
                <img
                  src={u(imgScen)}
                  alt="Three people at laptops in front of a huge wall display of city data, showing technology teams planning for different futures."
                  width="1080"
                  height="484"
                  decoding="async"
                  loading="lazy"
                />
              </figure>
            </div>
            <span className="qpill">Question: How might entry-level IT support change over the next five years?</span>
            <div className="fork" id="itg">
              {SC.map((a, i) => (
                <button type="button" key={i} className="sc" aria-pressed={si === i} onClick={() => setSi(i)}>
                  <span className="badge h">Hypothetical</span>
                  <strong className="t">{a[0]}</strong>
                  <span className="p"><b>What could happen:</b> {a[1]}</span>
                  <span className="p"><b>Skills that may matter:</b> {a[2]}</span>
                  <span className="p"><span className="badge a">Assumption</span> {a[3]}</span>
                </button>
              ))}
            </div>
            <div className="c" id="scd" aria-live="polite" style={{ marginTop: 18 }}>
              <span className="k">Selected: {SD[si][0]}</span>
              <dl className="d">
                <dt>Signals that would point to this</dt>
                <dd>{SD[si][1]}</dd>
                <dt>Who is affected</dt>
                <dd>{SD[si][2]}</dd>
                <dt>A sensible action</dt>
                <dd>{SD[si][3]}</dd>
              </dl>
              <p className="note">Hypothetical illustration, not a prediction. Check current job listings.</p>
            </div>
            <div className="merge">
              <div>
                <span className="k">Actions that could work in all three</span>
                <p>Learn networking basics, operating systems, simple scripting, cloud basics, cybersecurity and clear communication. Recheck job listings every few months.</p>
              </div>
              <div>
                <span className="k">Signals worth monitoring</span>
                <p>Skills named in new job listings, new company tools, new security rules.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 METHOD */}
        <section className="s alt" id="method">
          <div className="w">
            <div className="sp" style={{ alignItems: "center" }}>
              <div>
                <h2>The 6-step Futurism method.</h2>
                <p className="mu">Follow the same six steps for any question. Each step feeds one part of your Future Plan.</p>
              </div>
              <figure className="fig ph ct" style={{ "--mw": "460px" }}>
                <img
                  src={u(imgMethod)}
                  alt="A researcher compares data dashboards, network maps and charts on glass screens: scanning signals and finding drivers."
                  width="1080"
                  height="1050"
                  decoding="async"
                  loading="lazy"
                />
              </figure>
            </div>
            <ol className="loop" id="mflow" style={{ marginTop: 34 }}>
              {ST.map((s, i) => (
                <li key={i}>
                  <button type="button" className="lb" aria-pressed={ms === i} onClick={() => setMs(i)}>
                    <i>{i + 1}</i>
                    <b>{s[0]}</b>
                  </button>
                </li>
              ))}
            </ol>
            <div className="back" aria-hidden="true">
              <span>↺ Step 6 loops back to step 2 when evidence changes</span>
            </div>
            <div className="c" id="mdet" aria-live="polite" style={{ marginBottom: 14 }}>
              <span className="k">Step {ms + 1} of 6</span>
              <h3 style={{ margin: "4px 0" }}>{ST[ms][0]}</h3>
              <p className="mu">{ST[ms][1]}</p>
              <p className="note">Plan part: {ST[ms][2]}</p>
              <button
                className="btn sm"
                type="button"
                onClick={() => {
                  goBuilder();
                  focusField(MF[ms]);
                }}
              >
                Fill this in my plan
              </button>
            </div>
            <div className="mg" id="mg">
              {ST.map((s, i) => (
                <div key={i} className={ms === i ? "sel" : undefined}>
                  <span className="n">{i + 1}</span>
                  <h3>{s[0]}</h3>
                  <p>{s[1]}</p>
                  <span className="pf">→ Plan part: {s[2]}</span>
                </div>
              ))}
            </div>
            <div className="c" style={{ marginTop: 14 }}>
              <b>↺ Revisit when evidence changes.</b>
              <p className="mu">Step 6 loops back to step 2. When new evidence appears, scan again and update your drivers, scenarios and actions.</p>
            </div>
          </div>
        </section>

        {/* 8 BUILDER */}
        <section className="s" id="builder">
          <div className="w">
            <div className="sh">
              <h2>Seven parts. One page. Your own topic.</h2>
              <p>Pick a topic that matters to you, such as your chosen career in five years. Fill in each part. The preview updates as you type.</p>
            </div>
            <div className="sp">
              <div>
                <figure className="fig ph lf" style={{ marginBottom: 16, "--mw": "600px" }}>
                  <img
                    src={u(imgPlan)}
                    alt="A person writes a plan in a notebook beside a laptop showing a flowchart and charts."
                    width="1080"
                    height="712"
                    decoding="async"
                    loading="lazy"
                  />
                </figure>
                <form className="c" id="bf" noValidate aria-label="Future Plan builder" onSubmit={(e) => e.preventDefault()}>
                  {FD.map((f) => (
                    <Fragment key={f[0]}>
                      <label className="f" htmlFor={"f_" + f[0]}>{f[1]} <span>{f[4]}</span></label>
                      <p className="hint" id={"h_" + f[0]}>{f[2]}</p>
                      <textarea
                        id={"f_" + f[0]}
                        rows={f[0] === "q" || f[0] === "tf" ? 2 : 3}
                        aria-describedby={`h_${f[0]} e_${f[0]}`}
                        aria-invalid={errs[f[0]] ? "true" : undefined}
                        placeholder={"Example: " + f[3]}
                        value={S[f[0]] || ""}
                        onChange={(e) => setField(f[0], e.target.value)}
                      />
                      <p className="er" id={"e_" + f[0]} role="alert">{errs[f[0]] || ""}</p>
                    </Fragment>
                  ))}
                </form>
              </div>
              <div className="stk">
                <div className="c" id="pvc">
                  <h3>Your one-page Future Plan</h3>
                  <div className="bar" aria-hidden="true">
                    <i id="pbar" style={{ width: Math.round((filled.length / FD.length) * 100) + "%" }}></i>
                  </div>
                  <p className="note" id="pcount">{filled.length} of {FD.length} parts filled in</p>
                  <PlanList fields={filled} S={S} id="pv" />
                  {!filled.length && <p className="mu">Your answers will appear here as you type.</p>}
                </div>
                <div className="row">
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      if (validate()) setBm("All seven parts are filled in. Now review it with the checklist below.");
                    }}
                  >
                    Check my plan
                  </button>
                  <button
                    className="btn o"
                    type="button"
                    onClick={() => {
                      const ok = store.set("draft", S);
                      if (ok) setHasDraft(true);
                      setBm(ok ? "Draft saved in this browser on this device." : "Draft could not be saved here. Use “Copy as text” to keep your plan.");
                    }}
                  >
                    Save draft
                  </button>
                  {hasDraft && (
                    <button
                      className="btn o"
                      type="button"
                      onClick={() => {
                        setS(store.get("draft") || {});
                        setErrs({});
                        setBm("Saved draft loaded.");
                      }}
                    >
                      Resume saved draft
                    </button>
                  )}
                </div>
                <div className="row" style={{ marginTop: 10 }}>
                  <button
                    className="btn o sm"
                    type="button"
                    onClick={async () => {
                      if (!filled.length) return setBm("Nothing to copy yet.");
                      setBm((await copyText(planText())) ? "Copied to clipboard." : "Copy is not available in this browser. Select the preview text and copy it by hand.");
                    }}
                  >
                    Copy as text
                  </button>
                  <button
                    className="btn o sm"
                    type="button"
                    onClick={() => {
                      if (validate()) window.print();
                    }}
                  >
                    Print / Save as PDF
                  </button>
                  <button
                    className="btn o sm"
                    type="button"
                    onClick={() => {
                      if (filled.length && !window.confirm("Replace what you typed with the example plan?")) return;
                      setS({ ...EXP });
                      setErrs({});
                      setBm("Example plan loaded. Replace it with your own topic.");
                    }}
                  >
                    Fill with example plan
                  </button>
                  <button
                    className="btn o sm"
                    type="button"
                    onClick={() => {
                      if (window.confirm("Clear everything you entered?")) {
                        setS({});
                        setErrs({});
                        setBm("Plan cleared. A saved draft, if any, is unchanged.");
                      }
                    }}
                  >
                    Reset
                  </button>
                </div>
                <p className="note" aria-live="polite" id="bm" role="status">{bm}</p>
                <div className="store">
                  <b>Where your plan lives.</b> Typing updates the preview only in this open page. “Save draft” stores it in this browser on this device. “Copy as text” puts it on your clipboard so you can paste it elsewhere. Nothing is sent to a server, and clearing browser data removes a saved draft.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9 QUIZ */}
        <section className="s alt" id="quiz">
          <div className="w">
            <div className="sp ph">
              <div className="sh">
                <h2>Check what you have learned.</h2>
                <p>Five questions, one at a time. Every answer comes with an explanation and a link back to the lesson.</p>
              </div>
              <figure className="fig ph" style={{ "--mw": "600px" }}>
                <img
                  src={u(imgQuiz)}
                  alt="A student explains an idea to a classroom in front of a screen: checking what you understand by explaining it."
                  width="1080"
                  height="571"
                  decoding="async"
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="c" id="qz" style={{ maxWidth: 860 }}>
              <div className="qd" aria-hidden="true">
                {Q.map((q, k) => {
                  const cls =
                    k < qi || (k === qi && qs)
                      ? qa[k] === q[2] ? "ok" : "no"
                      : k === qi ? "on" : "";
                  return <i key={k} className={cls}></i>;
                })}
              </div>
              {qDone ? (
                <>
                  <span className="k">Quiz finished</span>
                  <p className="score">{QS} / {Q.length}</p>
                  <p className="mu">This score stays on this page only and is not sent anywhere.</p>
                  <ul className="l">
                    {Q.map((q, k) => (
                      <li key={k}>
                        {qa[k] === q[2] ? "✔ Correct" : "✘ Not quite"}: {q[0]}
                        <br />
                        <span className="note">
                          {q[3]} {qa[k] === q[2] ? null : reviewLink(q)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="row">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => {
                        setQi(0);
                        setQp(-1);
                        setQs(0);
                        setQa([]);
                        setQerr("");
                      }}
                    >
                      Retry the quiz
                    </button>
                    <a className="btn o" href="#review">Go to review</a>
                  </div>
                </>
              ) : (
                <>
                  <fieldset disabled={!!qs}>
                    <legend>Question {qi + 1} of {Q.length}: {Q[qi][0]}</legend>
                    {Q[qi][1].map((o, k) => (
                      <label
                        key={k}
                        className={"opt " + (qs && k === Q[qi][2] ? "is-ok" : qs && k === qp ? "is-no" : "")}
                      >
                        <input type="radio" name="qz" value={k} checked={qp === k} onChange={() => setQp(k)} />
                        <span>{o}</span>
                      </label>
                    ))}
                  </fieldset>
                  <p className="er" role="alert" id="qe">{qerr}</p>
                  <div aria-live="polite">
                    {qs ? (
                      <p className={"ex " + (qp === Q[qi][2] ? "ok" : "")}>
                        <b>{qp === Q[qi][2] ? "Correct. " : "Not quite. "}</b>
                        {Q[qi][3]} {qp === Q[qi][2] ? null : reviewLink(Q[qi])}
                      </p>
                    ) : null}
                  </div>
                  <div className="row">
                    <button className="btn" type="button" id="qb" onClick={qSubmit}>
                      {!qs ? "Submit answer" : qi === Q.length - 1 ? "See quiz score" : "Next question"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* 10 REVIEW */}
        <section className="s" id="review">
          <div className="w">
            <div className="sh">
              <h2>Review your plan, then see where you stand.</h2>
              <p>Everything below reflects only what you did on this page.</p>
            </div>
            <div className="sp">
              <div>
                <div className="c">
                  <h3>Plan summary</h3>
                  <PlanList fields={filled} S={S} id="rsum" />
                  {!filled.length && <p className="mu">Your plan will appear here once you use the plan builder.</p>}
                </div>
                <div className="c" style={{ marginTop: 14 }}>
                  <h3>Self-review checklist</h3>
                  <div id="ck">
                    {CK.map((c, i) => (
                      <label className="chk" key={i}>
                        <input
                          type="checkbox"
                          checked={ck[i]}
                          onChange={(e) => {
                            const n = [...ck];
                            n[i] = e.target.checked;
                            setCk(n);
                            store.set("ck", n);
                          }}
                        />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                  <p>
                    <b id="cc">Checklist: {ckCount} of {CK.length} checked</b>{" "}
                    <span className="note">(self-review only; separate from the quiz score)</span>
                  </p>
                </div>
              </div>
              <div>
                <div className="c">
                  <h3>Your progress in this browser</h3>
                  <ul className="l mu" id="prog">
                    <li>Plan: {filled.length} of {FD.length} parts filled in</li>
                    <li>Levels marked completed by you: {lvDone} of 6</li>
                    <li>Checklist: {ckCount} of {CK.length} (self-review)</li>
                    <li>Quiz score: {QS === null ? "not finished yet" : QS + " / " + Q.length}</li>
                  </ul>
                  <p className="note">Self-managed. Level marks and the checklist are saved in this browser. The quiz score lasts until you reload.</p>
                </div>
                <figure className="fig ph lf" style={{ marginTop: 14, "--mw": "600px" }}>
                  <img
                    src={u(imgProgress)}
                    alt="An open notebook with an outline, sticky notes and a coffee: a checklist for reviewing progress."
                    width="1080"
                    height="536"
                    decoding="async"
                    loading="lazy"
                  />
                  <figcaption>Illustration only. Your own progress is shown by the checklist and level marks on this page.</figcaption>
                </figure>
              </div>
            </div>

            <div className={"fin" + (all ? " done" : "")} id="finish" aria-live="polite">
              <div>
                <span className="k" id="fk">{all ? "Finished" : "Finish"}</span>
                <h3 style={{ fontSize: "1.6rem", margin: "6px 0" }} id="ft">
                  {all ? "You have finished this guide." : "Three things left to finish."}
                </h3>
                <p className="mu" id="fp">
                  {all
                    ? "Your plan, checklist and quiz are complete. The plan is yours to keep: copy it or print it from the plan builder. This page does not issue a certificate or record your result anywhere."
                    : "Finishing means completing the activities on this page. It is self-managed and not recorded anywhere."}
                </p>
                <ul className="todo" id="td">
                  {todo.map((t, i) => (
                    <li key={i} className={okArr[i] ? "y" : ""}>
                      <b aria-hidden="true">{okArr[i] ? "✓" : i + 1}</b>
                      <span>{t[0]} <span className="note">({t[1]})</span></span>
                      {okArr[i] ? null : <a href={t[2]}>Go</a>}
                    </li>
                  ))}
                </ul>
              </div>
              <figure className="fig">
                <img
                  id="endimg"
                  src={u(all ? svgComplete : svgNextStep)}
                  alt={all ? "A green check mark: you finished the plan, the checklist and the quiz" : "Continue learning: three activities left"}
                  width="1200"
                  height="720"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* 11 NEXT */}
        <section className="s alt" id="next">
          <div className="w">
            <div className="sp ph">
              <div className="sh">
                <h2>Keep your plan alive.</h2>
                <p>A plan is only useful if you return to it. Choose one thing to do next.</p>
              </div>
              <figure className="fig ph" style={{ "--mw": "600px" }}>
                <img
                  src={u(imgNext)}
                  alt="People walk through a bright green city with solar canopies and electric cars: a future worth working towards."
                  width="1080"
                  height="586"
                  decoding="async"
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="row" id="nx" style={{ margin: "0 0 22px" }}>
              <a className="btn" href="#builder">Update my plan</a>
              <button
                className="btn o"
                type="button"
                onClick={async () =>
                  setNm(!filled.length ? "Your plan is empty. Build it first." : (await copyText(planText())) ? "Plan copied to clipboard." : "Copy is not available in this browser.")
                }
              >
                Copy my plan
              </button>
              <a className="btn o" href="#roadmap">Revisit a level</a>
              <button
                className="btn o"
                type="button"
                onClick={() => {
                  if (window.confirm("Clear the plan builder to start a new plan? A saved draft is unchanged.")) {
                    setS({});
                    setErrs({});
                    setNm("Plan builder cleared. Pick a new question.");
                    goBuilder();
                    focusField("f_q");
                  }
                }}
              >
                Start another plan
              </button>
              {CONFIG.nextModuleUrl ? (
                <a className="btn or" href={CONFIG.nextModuleUrl}>Explore next module</a>
              ) : null}
            </div>
            <p className="note" aria-live="polite" id="nm" role="status">{nm}</p>
            <div className="nx">
              <div className="c">
                <img src={u(imgRecheck)} alt="Printed storyboards and a notebook spread across a desk, being reviewed again." width="1080" height="592" loading="lazy" />
                <h3>Recheck your signals</h3>
                <p className="mu">In about three months, look at the signals you listed. Did anything change? This page does not send reminders, so set one in your own calendar.</p>
              </div>
              <div className="c">
                <img src={u(imgMentor)} alt="Three colleagues point at a planning board and discuss it together." width="1080" height="566" loading="lazy" />
                <h3>Ask a mentor</h3>
                <p className="mu">Share your plan with a mentor or friend and ask: “What would you add?” Another view often finds a driver you missed.</p>
              </div>
              <div className="c">
                <img src={u(imgSecond)} alt="A person pins new cards onto a fresh corkboard to start another plan." width="1080" height="589" loading="lazy" />
                <h3>Try a second question</h3>
                <p className="mu">Run the six steps again on a different question. The method gets quicker each time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
    </PublicLayout>
  );
}