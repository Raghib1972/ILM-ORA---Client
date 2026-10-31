"use client";

/* ─────────────────────────────────────────────────────────────────────────
   HR Hub EXTRAS  →  same folder as HRHub.jsx

   Part map (final page order, every section is one numbered Part):
     01 Hero  ·  02 Global HR products  ·  03 HRMS domains (10)
     04 21 modules (vision / audience / use case)  ·  05 HR Hub learning app
     06 Dashboards  ·  07 HRMS onboarding (12 stages)  ·  08 ATS guide
     09 ATS workbench (working demo)  ·  10 HR in action (videos)  ·  11 Contact
   ───────────────────────────────────────────────────────────────────────── */

import { useCallback, useEffect, useRef, useState } from "react";
import D from "./hr-hubData";
import { getHash as getRoute, setHash as setRoute, onHash as onRoute } from "./hr-hubRoute";
import "./hr-hubExtras.css";

const pad = (n) => String(n).padStart(2, "0");
const inr = (n) => "\u20B9" + Math.round(n).toLocaleString("en-IN");

/* localStorage helpers: never throw (private mode, blocked storage) */
const store = {
  get(k, fallback) {
    try { const v = window.localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  },
  set(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { window.localStorage.removeItem(k); } catch (e) { /* ignore */ }
  },
};

/* ═════════════════════════ 1. PART MAP ═════════════════════════ */
export const PARTS = [
  { id: "hero", label: "Hero", title: "Welcome", blurb: "What this hub is and where to start." },
  { id: "global", label: "Global HR", title: "Global HR products", blurb: "Well-known HR platforms, for reference." },
  { id: "domains", label: "Domains", title: "HRMS domains", blurb: "The 10 domains an HRMS covers." },
  { id: "modules", label: "Modules", title: "21 modules", blurb: "Vision, audience and use case of every module." },
  { id: "learn", label: "Learn", title: "HR Hub learning app", blurb: "Lessons, journey, templates, quiz and glossary." },
  { id: "dashboards", label: "Dashboards", title: "HR dashboards", blurb: "What HR data looks like in a working HRMS." },
  { id: "onboarding", label: "Onboarding", title: "HRMS onboarding", blurb: "12 setup stages, role-based, save and resume." },
  { id: "ats", label: "ATS Guide", title: "ATS guide", blurb: "How recruitment tracking works and who uses what." },
  { id: "atslab", label: "ATS Demo", title: "ATS workbench", blurb: "Parse a resume, move it through a pipeline, schedule an interview." },
  { id: "videos", label: "Videos", title: "HR in action", blurb: "Short scenario clips." },
  { id: "contact", label: "Contact", title: "Contact us", blurb: "Tell us what you need." },
].map((p, i) => ({ ...p, no: i + 1 }));

/* Scroll only (never touches location.hash: the hash belongs to the HR Hub router) */
export function goPart(id) {
  const el = typeof document !== "undefined" && document.getElementById("part-" + id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* the site navbar = nearest fixed/sticky element at the top of the screen that is NOT inside our page */
function findSiteNav(page) {
  const el = document.elementFromPoint(Math.max(1, window.innerWidth / 2), 4);
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    if (page && page.contains(n)) return null;
    const pos = window.getComputedStyle(n).position;
    if (pos === "fixed" || pos === "sticky") return n;
  }
  return null;
}

export function PageMapNav() {
    const ref = useRef(null);
  const [active, setActive] = useState("hero");
  const [hash, setHash] = useState("");

   useEffect(() => {
    const on = () => setHash(getRoute());
    on();
    return onRoute(on);
  }, []);

  useEffect(() => {
    const page = ref.current && ref.current.closest(".hrx-page");
    let closedGap = 0;
    const measure = () => {
      try {
        const nav = findSiteNav(page);
        if (!nav || !page) return;
        const bottom = Math.round(nav.getBoundingClientRect().bottom);
        if (bottom > 0 && bottom < 200) page.style.setProperty("--hrx-nav", bottom + "px");
        /* remove the accidental gap under the navbar (only measured at the very top) */
        if (window.scrollY < 5 && !closedGap) {
          const gap = Math.round(page.getBoundingClientRect().top - bottom);
          if (gap > 0 && gap <= 40) { closedGap = gap; page.style.marginTop = -gap + "px"; }
        }
      } catch (e) { /* measuring is best effort */ }
    };
    const track = () => {
      const line = (parseInt(getComputedStyle(page || document.body).getPropertyValue("--hrx-nav"), 10) || 68) + 90;
      let cur = PARTS[0].id;
      PARTS.forEach((p) => {
        const el = document.getElementById("part-" + p.id);
        if (el && el.getBoundingClientRect().top <= line) cur = p.id;
      });
      setActive(cur);
    };
    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; track(); }); };
    const t = setTimeout(() => { measure(); track(); }, 60);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t); cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (page && closedGap) page.style.marginTop = "";
    };
  }, []);

    const HUB = [
    ["modules", "Modules"], ["journey", "Journey"], ["p/lifecycle", "Lifecycle"], ["templates", "Templates"],
    ["p/assess", "Assessment"], ["p/analytics", "Analytics"], ["p/demo", "Texora Demo"], ["glossary", "Glossary"],
    ["p/about", "About"], ["me", "My Progress"],
  ];
  const hp = hash.replace(/^#\/?/, "").split("/");
  const hubAct = hp[0] === "m" || hp[0] === "l" ? "modules" : hp[0] === "p" ? "p/" + hp[1] : hp[0];
  const openHub = (e, r) => {
    e.preventDefault();
    const target = "#/" + r;
        const cur = getRoute();
    const same = cur === target || (!r && (cur === "" || cur === "#/"));
    if (!same) setRoute(target);
    goPart("learn");
  };

    useEffect(() => {
    const box = ref.current && ref.current.querySelector(".hrx-sn-in");
    const el = box && box.querySelector("a.on");
    if (!box || !el || box.scrollWidth <= box.clientWidth + 2) return;
    const left = box.scrollLeft + (el.getBoundingClientRect().left - box.getBoundingClientRect().left) - (box.clientWidth - el.offsetWidth) / 2;
    box.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active, hash]);

   const boxRef = useRef(null);
  const [canL, setCanL] = useState(false);
  const [canR, setCanR] = useState(false);
  const edge = useCallback(() => {
    const b = boxRef.current;
    if (!b) return;
    setCanL(b.scrollLeft > 4);
    setCanR(b.scrollLeft + b.clientWidth < b.scrollWidth - 4);
  }, []);
  useEffect(() => {
    edge();
    const t = setTimeout(edge, 300);
    window.addEventListener("resize", edge);
    return () => { clearTimeout(t); window.removeEventListener("resize", edge); };
  }, [edge]);
  useEffect(() => {
    const b = boxRef.current;
    const el = b && b.querySelector("a.on");
    if (!b || !el || b.scrollWidth <= b.clientWidth + 2) return;
    const left = b.scrollLeft + (el.getBoundingClientRect().left - b.getBoundingClientRect().left) - (b.clientWidth - el.offsetWidth) / 2;
    b.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active, hash]);
  const nudge = (dir) => {
    const b = boxRef.current;
    if (b) b.scrollBy({ left: dir * Math.max(200, b.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <nav className="hrx-sn hrx-pm" ref={ref} aria-label="Page sections">
      <button type="button" className={"hrx-sn-arr l" + (canL ? " show" : "")} aria-label="Scroll left" tabIndex={canL ? 0 : -1} onClick={() => nudge(-1)}>‹</button>
      <div className="hrx-sn-in" ref={boxRef} onScroll={edge}>
        {PARTS.map((p) => (
          <a key={p.id} href={"#part-" + p.id} className={active === p.id ? "on" : ""}
            aria-current={active === p.id ? "true" : undefined}
            onClick={(e) => { e.preventDefault(); goPart(p.id); }}>
            {p.label}
          </a>
        ))}
        <span className="hrx-sep" aria-hidden="true" />
        {HUB.map(([r, label]) => (
          <a key={r} href={"#/" + r} className={active === "learn" && hubAct === r ? "on" : ""}
            onClick={(e) => openHub(e, r)}>{label}</a>
        ))}
            </div>
      <button type="button" className={"hrx-sn-arr r" + (canR ? " show" : "")} aria-label="Scroll right" tabIndex={canR ? 0 : -1} onClick={() => nudge(1)}>›</button>
    </nav>
  );
}

export function PartHead({ id }) {
  const p = PARTS.find((x) => x.id === id);
  if (!p) return null;
  /* visible header hata diya: sirf invisible anchor (scroll ke liye) */
  return <div className="hrx-part-h hrx-part-h--bare" id={"part-" + id} aria-hidden="true" />;
}

export function PartFoot() {
  return null; /* Prev / Next buttons hata diye */
}

export function Part({ id, bare, children }) {
  return (<><PartHead id={id} bare={bare} />{children}<PartFoot id={id} /></>);
}

function Tip({ text }) {
  return <span className="hrx-tip" tabIndex={0} role="img" aria-label={text} data-tip={text}>?</span>;
}

/* ═════════════════════════ 2. HRMS DOMAINS (10) ═════════════════════════ */
export const HRMS_DOMAINS = [
  { id: "core", name: "Core HR & Employee Records", mods: [3], users: "HR operations, HR managers, employees (self-service)",
    covers: "The single source of truth for every employee: records, documents, letters, approvals and audit trail.",
    features: ["Employee master", "Document vault", "Letters & templates", "Self-service", "Change approvals"] },
  { id: "talent", name: "Talent Acquisition & Employer Brand", mods: [1, 19], users: "Recruiters, hiring managers, marketing",
    covers: "Planning roles, attracting and selecting candidates, and presenting the organisation as an employer.",
    features: ["Requisitions", "Job posting", "ATS pipeline", "Interview scorecards", "Career page"] },
  { id: "join", name: "Onboarding & Offboarding", mods: [2, 20], users: "HR executives, managers, IT, finance, joiners and leavers",
    covers: "Joining, induction, transfers and exits, with checklists for access, assets and settlement.",
    features: ["Pre-joining tasks", "Day-1 checklist", "30-60-90 plan", "Clearance", "Full and final"] },
  { id: "time", name: "Attendance & Leave", mods: [4], users: "Employees, line managers, HR executives, payroll",
    covers: "Time, shifts, leave and holidays, closed each month so payroll gets clean inputs.",
    features: ["Shifts & rosters", "Regularisation", "Leave balances", "Approvals", "Month-end lock"] },
  { id: "pay", name: "Payroll & Compensation", mods: [5, 6], users: "Payroll officers, finance, compensation analysts",
    covers: "Salary structures, monthly payroll, statutory deductions, benefits and pay revisions.",
    features: ["Salary structures", "Payroll run", "Statutory filings", "Payslips", "Benefits"] },
  { id: "perf", name: "Performance & Goals", mods: [7], users: "Managers, HR business partners, employees",
    covers: "Goals, check-ins, reviews and calibration that link effort to outcomes.",
    features: ["Goal setting", "Check-ins", "Review cycles", "Calibration", "Improvement plans"] },
  { id: "grow", name: "Learning, Talent & Careers", mods: [8, 14, 15], users: "L&D managers, HR business partners, managers, employees",
    covers: "Skills, training, high-potential talent, career paths and succession for key roles.",
    features: ["Training needs", "Courses & impact", "Talent review", "Career paths", "Succession"] },
  { id: "people", name: "Employee Relations & Engagement", mods: [9, 16, 17, 18], users: "ER specialists, HR heads, managers, EHS officers",
    covers: "Grievances, engagement, inclusion, health, safety and wellbeing.",
    features: ["Case management", "Pulse surveys", "Inclusion data", "Incident log", "Wellbeing"] },
  { id: "gov", name: "Compliance, Policy & Governance", mods: [10, 11], users: "Compliance officers, legal, HR heads",
    covers: "Labour-law compliance, policies, acknowledgements and audit readiness.",
    features: ["Compliance calendar", "Registers", "Policy library", "Acknowledgements", "Audit trail"] },
  { id: "insight", name: "Analytics, Planning & Client Solutions", mods: [12, 13, 21], users: "HR analysts, HR heads, finance, HR sales teams",
    covers: "Metrics, dashboards, workforce planning and HR sales for client hiring requirements.",
    features: ["Metric library", "Dashboards", "Headcount planning", "Client requirements", "Proposals"] },
];

export function HRMSDomains() {
  const total = HRMS_DOMAINS.reduce((a, d) => a + d.mods.length, 0);
  const show = (id) => {
    window.dispatchEvent(new CustomEvent("hrx-domain", { detail: id }));
    goPart("modules");
  };
  const loop = [...HRMS_DOMAINS, ...HRMS_DOMAINS]; /* 2 copies => endless loop */
  return (
    <section className="hrx-x hrx-dmq" aria-labelledby="hrx-dom-t">
      <div className="hrx-sec-head">
        <h2 id="hrx-dom-t">HRMS domains</h2>
        <p className="hrx-sec-sub">
          An HRMS is easier to understand when it is split into 10 domains. Each domain below lists what it covers,
          the screens you would expect, who uses it, and which of the {total} learning modules belong to it.
          Every module sits in exactly one domain.
        </p>
      </div>
      <div className="hrx-gp-marq">
        <div className="hrx-gp-track">
          {loop.map((d, i) => {
            const dup = i >= HRMS_DOMAINS.length;
            return (
              <article className="hrx-dcard" key={d.id + "-" + i} aria-hidden={dup ? true : undefined}>
                <b className="hrx-dno">{pad((i % HRMS_DOMAINS.length) + 1)}</b>
                <h3>{d.name}</h3>
                <p>{d.covers}</p>
                <ul className="hrx-chips">{d.features.map((f) => <li key={f}>{f}</li>)}</ul>
                <p className="hrx-dm"><b>Used by</b><span>{d.users}</span></p>
                <p className="hrx-dm"><b>Modules</b>
                  <span>{d.mods.map((n) => <a key={n} className="hrx-mlink" href={"#/m/" + n} title={D.mods[n - 1].name} tabIndex={dup ? -1 : undefined}>{pad(n)}</a>)}</span>
                </p>
                <button type="button" className="hrx-link" tabIndex={dup ? -1 : undefined} onClick={() => show(d.id)}>See these modules &darr;</button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ 3. 21 MODULES: VISION / AUDIENCE / USE CASE ═════════════════════════ */
export const MODULE_INFO = {
  1: ["Hire the right people quickly and fairly, against an approved headcount.", "Recruiters, hiring managers, HR executives", "Take one hire from requisition to offer with a scorecard at every interview round."],
  2: ["Make the first 90 days smooth so new joiners become productive sooner.", "HR executives, reporting managers, IT and admin, new joiners", "Complete pre-joining documents, day-1 setup and a 30-60-90 day plan."],
  3: ["Keep every employee record accurate, secure and easy to retrieve.", "HR operations team, HR managers, employees (self-service)", "Change a record with approval and an audit trail, then issue the matching letter."],
  4: ["Track time and absence consistently so pay and planning stay correct.", "Employees, line managers, HR executives, payroll team", "Approve leave, regularise attendance and close the month for payroll."],
  5: ["Pay every person accurately and on time, with a clean audit trail.", "Payroll officers, finance, HR managers", "Run a monthly cycle: inputs, calculation, review, release and statutory filing."],
  6: ["Design pay and benefits that are fair, competitive and affordable.", "Compensation analysts, HR heads, finance", "Build a salary band and test a revision cycle against budget."],
  7: ["Link goals, feedback and outcomes so performance talks are clear and fair.", "Managers, HR business partners, employees", "Set goals, run a review cycle and calibrate ratings."],
  8: ["Build the skills the business needs and prove the training worked.", "L&D managers, trainers, managers, employees", "Run a training-needs analysis and measure impact after the course."],
  9: ["Resolve concerns early and fairly, and keep the workplace respectful.", "ER specialists, HR managers, line managers", "Handle a grievance: intake, fact-finding, outcome and record keeping."],
  10: ["Keep the organisation compliant and audit-ready.", "Compliance officers, HR heads, legal, payroll", "Maintain a compliance calendar and registers, then prepare for an inspection."],
  11: ["Make policies clear, versioned and acknowledged by everyone.", "Policy owners, legal, HR managers, employees", "Draft, approve and publish a policy, then track who has acknowledged it."],
  12: ["Turn HR data into decisions people can trust.", "HR analysts, HRIS admins, HR leaders", "Define metrics, build a dashboard and set data-quality rules."],
  13: ["Have the right people in the right roles for next year's plan.", "HR heads, finance, business leaders", "Forecast headcount demand against supply and plan the hiring."],
  14: ["Identify and grow high-potential people.", "HR business partners, managers, talent leads", "Run a talent review and a 9-box discussion."],
  15: ["Make sure key roles always have ready successors and people see a path ahead.", "HR heads, managers, employees", "Map career paths and build a succession plan for critical roles."],
  16: ["Understand how people feel and act on what you learn.", "HR heads, managers, culture teams", "Run a pulse survey and turn the results into an action plan."],
  17: ["Build fair processes and an inclusive workplace.", "HR heads, inclusion leads, hiring managers", "Review hiring and pay data for gaps and set inclusion actions."],
  18: ["Protect people's safety and support their wellbeing.", "EHS officers, HR managers, managers, employees", "Log an incident, investigate it and track corrective actions."],
  19: ["Be the employer candidates want to join and employees are proud of.", "Marketing, talent acquisition, HR heads", "Write an employee value proposition and measure career-page results."],
  20: ["Let people leave respectfully, with access, assets and knowledge handled.", "HR executives, managers, IT, finance, leavers", "Run clearance, full-and-final settlement and an exit interview."],
  21: ["Turn client hiring needs into fulfilled requirements and clear proposals.", "HR sales executives, account managers, recruiters", "Take a client requirement, search candidates, track fulfilment and cost a proposal."],
};

const domainOfModule = (n) => HRMS_DOMAINS.find((d) => d.mods.includes(n));

export function ModuleVision() {
  const [dom, setDom] = useState("");
  const [q, setQ] = useState("");
  useEffect(() => {
    const on = (e) => { setDom(e.detail || ""); setQ(""); };
    window.addEventListener("hrx-domain", on);
    return () => window.removeEventListener("hrx-domain", on);
  }, []);
  const list = D.mods.filter((m) => {
    const d = domainOfModule(m.n);
    const hay = (m.name + " " + MODULE_INFO[m.n].join(" ")).toLowerCase();
    return (!dom || (d && d.id === dom)) && hay.includes(q.trim().toLowerCase());
  });
  return (
    <section className="hrx-x" aria-labelledby="hrx-mod-t">
      <div className="hrx-sec-head">
        <h2 id="hrx-mod-t">The 21 modules: vision, audience and use case</h2>
        <p className="hrx-sec-sub">For each module: why it exists, who it is for, and one practical thing you will be able to do after it. Open a card to go to the full lessons.</p>
        <div className="hrx-filter">
          <input type="search" placeholder="Search a module, role or use case" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search modules" />
          <div className="hrx-chiprow" role="group" aria-label="Filter by domain">
            <button type="button" className={!dom ? "on" : ""} onClick={() => setDom("")}>All 21</button>
            {HRMS_DOMAINS.map((d, i) => (
              <button type="button" key={d.id} className={dom === d.id ? "on" : ""} onClick={() => setDom(d.id)}>{pad(i + 1)} {d.name.split(" & ")[0].split(",")[0]}</button>
            ))}
          </div>
        </div>
        <p className="hrx-count" role="status">{list.length} of {D.mods.length} modules shown</p>
        <div className="hrx-mgrid">
          {list.map((m) => {
            const [vision, audience, use] = MODULE_INFO[m.n];
            const d = domainOfModule(m.n);
            return (
              <article className="hrx-mcard" key={m.n}>
                <header><b>{pad(m.n)}</b><span>{d ? d.name : ""}</span></header>
                <h3>{m.name}</h3>
                <p className="hrx-dm"><b>Vision</b><span>{vision}</span></p>
                <p className="hrx-dm"><b>Audience</b><span>{audience}</span></p>
                <p className="hrx-dm"><b>Use case</b><span>{use}</span></p>
                <a className="hrx-link" href={"#/m/" + m.n}>Open module {pad(m.n)} &rarr;</a>
              </article>
            );
          })}
        </div>
        {!list.length && <p className="hrx-empty">No module matches. Clear the search or choose All 21.</p>}
      </div>
    </section>
  );
}

/* ═════════════════════════ 4. DASHBOARDS (sample data) ═════════════════════════ */
const Bar = ({ pct, tone }) => <div className="hrx-bar"><i className={tone || ""} style={{ width: Math.max(0, Math.min(100, pct)) + "%" }} /></div>;

function Spark({ data, label }) {
  const w = 220, h = 54, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 4 - ((v - min) / Math.max(1, max - min)) * (h - 10)}`).join(" ");
  return (<svg viewBox={`0 0 ${w} ${h}`} className="hrx-spark" role="img" aria-label={label}><polyline points={pts} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" /></svg>);
}

const Kpi = ({ label, value, note, good }) => (
  <div className="hrx-kpi"><span>{label}</span><b>{value}</b><em className={good === false ? "bad" : good ? "ok" : ""}>{note}</em></div>
);

const DEPTS = [
  ["Engineering", 82, 9800000], ["Sales", 46, 5200000], ["Operations", 38, 3400000], ["HR & Admin", 14, 1300000],
  ["Finance", 18, 2100000], ["Support", 50, 3000000],
];
const LEAVES0 = [
  { id: 1, name: "Aarav Mehta", dept: "Engineering", type: "Casual leave", from: "2026-11-10", to: "2026-11-12", days: 3, bal: 7 },
  { id: 2, name: "Diya Nair", dept: "Engineering", type: "Casual leave", from: "2026-11-11", to: "2026-11-13", days: 3, bal: 5 },
  { id: 3, name: "Kabir Shah", dept: "Sales", type: "Earned leave", from: "2026-11-17", to: "2026-11-21", days: 5, bal: 4 },
  { id: 4, name: "Isha Rao", dept: "Support", type: "Sick leave", from: "2026-11-05", to: "2026-11-06", days: 2, bal: 6 },
  { id: 5, name: "Rohan Gupta", dept: "Operations", type: "Earned leave", from: "2026-12-01", to: "2026-12-05", days: 5, bal: 12 },
  { id: 6, name: "Meera Iyer", dept: "Finance", type: "Casual leave", from: "2026-11-24", to: "2026-11-24", days: 1, bal: 2 },
];

function LeaveBoard() {
  const [st, setSt] = useState({});
  const set = (id, v) => setSt((p) => ({ ...p, [id]: v }));
  const clash = (r) => LEAVES0.find((o) => o.id !== r.id && o.dept === r.dept && st[o.id] !== "rejected" && o.from <= r.to && r.from <= o.to);
  const cnt = (v) => LEAVES0.filter((r) => (st[r.id] || "pending") === v).length;
  return (
    <div>
      <div className="hrx-kpis">
        <Kpi label="Pending" value={cnt("pending")} note="waiting for a decision" />
        <Kpi label="Approved" value={cnt("approved")} note="this cycle" good />
        <Kpi label="Rejected" value={cnt("rejected")} note="with reason" good={false} />
      </div>
      <div className="hrx-tw"><table className="hrx-table">
        <thead><tr><th>Employee</th><th>Type</th><th>Dates</th><th>Days</th><th>Balance after</th><th>Checks</th><th>Action</th></tr></thead>
        <tbody>{LEAVES0.map((r) => {
          const s = st[r.id] || "pending", after = r.bal - r.days, c = clash(r);
          return (
            <tr key={r.id}>
              <td><b>{r.name}</b><br /><small>{r.dept}</small></td><td>{r.type}</td>
              <td>{r.from} to {r.to}</td><td>{r.days}</td>
              <td className={after < 0 ? "neg" : ""}>{after}</td>
              <td>{after < 0 && <span className="hrx-flag bad">Exceeds balance</span>}{c && <span className="hrx-flag warn">Clash: {c.name}</span>}{after >= 0 && !c && <span className="hrx-flag ok">Clear</span>}</td>
              <td>{s === "pending" ? (<>
                <button type="button" className="hrx-sm ok" disabled={after < 0} onClick={() => set(r.id, "approved")}>Approve</button>
                <button type="button" className="hrx-sm no" onClick={() => set(r.id, "rejected")}>Reject</button></>) : (
                <span className={"hrx-flag " + (s === "approved" ? "ok" : "bad")}>{s === "approved" ? "Approved" : "Rejected"} <button type="button" className="hrx-undo" onClick={() => set(r.id, "pending")}>undo</button></span>)}</td>
            </tr>);
        })}</tbody></table></div>
    </div>
  );
}

function PayrollBoard() {
  const rows = DEPTS.map(([d, n, gross]) => { const ded = Math.round(gross * 0.17); return { d, n, gross, ded, net: gross - ded }; });
  const T = rows.reduce((a, r) => ({ n: a.n + r.n, gross: a.gross + r.gross, ded: a.ded + r.ded, net: a.net + r.net }), { n: 0, gross: 0, ded: 0, net: 0 });
  const steps = [["Inputs locked", 1], ["Calculated", 1], ["Reviewed", 1], ["Approved", 0], ["Released", 0], ["Filed", 0]];
  return (
    <div>
      <ol className="hrx-steps" aria-label="Payroll cycle status">{steps.map(([s, done], i) => <li key={s} className={done ? "done" : i === 3 ? "cur" : ""}><b>{i + 1}</b>{s}</li>)}</ol>
      <div className="hrx-kpis">
        <Kpi label="Employees paid" value={T.n} note="October 2026 cycle" />
        <Kpi label="Gross pay" value={inr(T.gross)} note="all departments" />
        <Kpi label="Deductions" value={inr(T.ded)} note="statutory and other (sample 17%)" />
        <Kpi label="Net pay" value={inr(T.net)} note="to be released" good />
      </div>
      <div className="hrx-tw"><table className="hrx-table">
        <thead><tr><th>Department</th><th>Employees</th><th>Gross</th><th>Deductions</th><th>Net</th><th>Share of gross</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r.d}><td><b>{r.d}</b></td><td>{r.n}</td><td>{inr(r.gross)}</td><td>{inr(r.ded)}</td><td>{inr(r.net)}</td><td style={{ minWidth: 120 }}><Bar pct={(r.gross / T.gross) * 100} /></td></tr>)}</tbody>
      </table></div>
      <h4 className="hrx-h4">Exceptions to review before approval</h4>
      <ul className="hrx-list"><li>3 employees have loss-of-pay changes after the attendance lock.</li><li>2 new joiners need pro-rata salary checked.</li><li>1 bank account is missing, so that payment will fail.</li></ul>
    </div>
  );
}

function OverviewBoard() {
  const total = DEPTS.reduce((a, d) => a + d[1], 0);
  return (
    <div>
      <div className="hrx-kpis">
        <Kpi label="Headcount" value={total} note="+6 this month" good />
        <Kpi label="Attrition (12 months)" value="11.4%" note="0.8 pt lower than last year" good />
        <Kpi label="Open roles" value="14" note="5 older than 45 days" good={false} />
        <Kpi label="Time to hire" value="31 days" note="target 30" />
        <Kpi label="Absenteeism" value="2.8%" note="within the 3% limit" good />
        <Kpi label="Engagement" value="74 / 100" note="+2 vs last survey" good />
      </div>
      <div className="hrx-two">
        <div className="hrx-card"><h4 className="hrx-h4">Headcount by department</h4>
          {DEPTS.map((d) => <div className="hrx-row" key={d[0]}><span>{d[0]}</span><Bar pct={(d[1] / 90) * 100} /><b>{d[1]}</b></div>)}</div>
        <div className="hrx-card"><h4 className="hrx-h4">Headcount, last 12 months</h4>
          <Spark data={[226, 228, 229, 231, 233, 233, 236, 238, 240, 242, 242, total]} label="Headcount rising from 226 to 248 over 12 months" />
          <p className="hrx-note">226 to {total}. Hires 41, exits 19.</p></div>
      </div>
    </div>
  );
}

function AttendanceBoard() {
  const days = [["Mon", 96.1], ["Tue", 95.4], ["Wed", 94.8], ["Thu", 95.9], ["Fri", 92.7], ["Sat", 90.2]];
  const dept = [["Engineering", 96], ["Sales", 91], ["Operations", 94], ["HR & Admin", 97], ["Finance", 98], ["Support", 93]];
  return (
    <div>
      <div className="hrx-kpis"><Kpi label="Present today" value="231 / 248" note="93.1%" good /><Kpi label="Late marks (week)" value="37" note="down from 52" good /><Kpi label="Regularisation requests" value="12" note="4 waiting for a manager" good={false} /></div>
      <div className="hrx-two">
        <div className="hrx-card"><h4 className="hrx-h4">Attendance this week (%)</h4>{days.map(([d, v]) => <div className="hrx-row" key={d}><span>{d}</span><Bar pct={v} /><b>{v}</b></div>)}</div>
        <div className="hrx-card"><h4 className="hrx-h4">Attendance by department (%)</h4>{dept.map(([d, v]) => <div className="hrx-row" key={d}><span>{d}</span><Bar pct={v} tone={v < 92 ? "warn" : ""} /><b>{v}</b></div>)}</div>
      </div>
    </div>
  );
}

function RecruitBoard() {
  const f = [["Applied", 420], ["Screened", 180], ["Shortlisted", 64], ["Interviewed", 38], ["Offered", 12], ["Joined", 9]];
  const src = [["Career page", 38], ["Job boards", 31], ["Referrals", 21], ["Agencies", 10]];
  return (
    <div>
      <div className="hrx-kpis"><Kpi label="Open roles" value="14" note="across 5 departments" /><Kpi label="Offer acceptance" value="75%" note="9 of 12" good /><Kpi label="Cost per hire" value={inr(42000)} note="sample figure" /></div>
      <div className="hrx-two">
        <div className="hrx-card"><h4 className="hrx-h4">Hiring funnel</h4>
          {f.map(([s, n], i) => <div className="hrx-row" key={s}><span>{s}</span><Bar pct={(n / 420) * 100} /><b>{n}{i ? <small> ({Math.round((n / f[i - 1][1]) * 100)}%)</small> : ""}</b></div>)}</div>
        <div className="hrx-card"><h4 className="hrx-h4">Where candidates come from (%)</h4>{src.map(([s, n]) => <div className="hrx-row" key={s}><span>{s}</span><Bar pct={n} /><b>{n}</b></div>)}</div>
      </div>
    </div>
  );
}

function PerformBoard() {
  const dist = [["1 · Needs improvement", 4], ["2 · Below expectation", 11], ["3 · Meets expectation", 58], ["4 · Exceeds", 22], ["5 · Outstanding", 5]];
  const goals = [["Engineering", 78], ["Sales", 64], ["Operations", 71], ["HR & Admin", 88], ["Finance", 82], ["Support", 69]];
  return (
    <div>
      <div className="hrx-kpis"><Kpi label="Reviews completed" value="182 / 248" note="73%, closes in 9 days" good={false} /><Kpi label="Goals set" value="96%" note="Q4 cycle" good /><Kpi label="Calibration" value="2 of 6" note="departments done" /></div>
      <div className="hrx-two">
        <div className="hrx-card"><h4 className="hrx-h4">Rating distribution (%)</h4>{dist.map(([s, n]) => <div className="hrx-row" key={s}><span>{s}</span><Bar pct={n} /><b>{n}</b></div>)}</div>
        <div className="hrx-card"><h4 className="hrx-h4">Goal completion by department (%)</h4>{goals.map(([s, n]) => <div className="hrx-row" key={s}><span>{s}</span><Bar pct={n} tone={n < 70 ? "warn" : ""} /><b>{n}</b></div>)}</div>
      </div>
    </div>
  );
}

const BOARDS = [
  ["overview", "HR overview", OverviewBoard], ["payroll", "Payroll", PayrollBoard], ["leave", "Leave approval", LeaveBoard],
  ["attendance", "Attendance", AttendanceBoard], ["recruit", "Recruitment", RecruitBoard], ["perf", "Performance", PerformBoard],
];

export function HubDashboards() {
  const [tab, setTab] = useState("overview");
  const cur = BOARDS.find((b) => b[0] === tab) || BOARDS[0];
  const Board = cur[2];
  return (
    <section className="hrx-x" aria-labelledby="hrx-db-t">
      <div className="hrx-sec-head">
        <h2 id="hrx-db-t">HR dashboards</h2>
        <p className="hrx-sec-sub">Six dashboards of the kind an HRMS shows every day. All numbers are <b>sample data for learning</b>, not a real company. The leave board is interactive: try approving and rejecting.</p>
        <div className="hrx-tabs" role="tablist" aria-label="Dashboards">
          {BOARDS.map(([id, label]) => <button type="button" role="tab" key={id} aria-selected={tab === id} className={tab === id ? "on" : ""} onClick={() => setTab(id)}>{label}</button>)}
        </div>
        <div className="hrx-panel" role="tabpanel" aria-label={cur[1]}><Board /></div>
      </div>
    </section>
  );
}

/* ═════════════════════════ 5. HRMS ONBOARDING (12 stages) ═════════════════════════ */
export const OB_ROLES = [["admin", "HR Admin"], ["hrm", "HR Manager"], ["pay", "Payroll Officer"], ["mgr", "Hiring / Line Manager"], ["emp", "Employee"]];

export const OB_STAGES = [
  { t: "Company profile", own: ["admin"], why: "Names, calendar and branding appear on every payslip and letter.",
    items: [["Legal name and brand name confirmed", "Must match registration documents."], ["Logo and letterhead uploaded", "Used on letters and payslips."], ["Financial year and working calendar set", "Sets the payroll year and leave year."]], field: ["Company name", "e.g. Acme Pvt Ltd"] },
  { t: "Entities and locations", own: ["admin"], why: "Each legal entity has its own tax and statutory registrations.",
    items: [["Legal entities added", "Each entity has its own PAN, TAN, PF and ESI details (India example)."], ["Office locations added", "Locations drive holidays and statutory rules."], ["Holiday calendar mapped to locations", "Different states can have different holidays."]], field: ["Number of locations", "e.g. 3"] },
  { t: "Organisation structure", own: ["admin", "hrm"], why: "Departments, grades and reporting lines drive approvals and reports.",
    items: [["Departments created", "Keep to one level at first."], ["Designations and grades defined", "Needed for pay bands."], ["Reporting lines mapped", "Every employee needs one manager for approvals."]], field: ["Number of departments", "e.g. 6"] },
  { t: "Roles and access", own: ["admin"], why: "Least-privilege access protects personal and salary data.",
    items: [["Roles defined", "HR Admin, HR Manager, Payroll Officer, Manager, Employee."], ["Permissions assigned per role", "Give only what the role needs."], ["Approval workflows enabled", "Leave, expenses and changes need an approver."]] },
  { t: "Employee data import", own: ["admin", "hrm"], why: "Clean data now avoids payroll errors later.",
    items: [["Import template downloaded", "Use the template exactly as given."], ["Data cleaned and validated", "Duplicate IDs and missing PAN are the usual blockers."], ["Import done and headcount reconciled", "Imported count must equal the HR master list."]], field: ["Employees to import", "e.g. 248"] },
  { t: "Attendance and shifts", own: ["hrm"], why: "Attendance feeds payroll, so rules must be settled first.",
    items: [["Shifts and weekly offs defined", "Include night and rotational shifts."], ["Attendance source chosen", "Biometric, mobile app or manual entry."], ["Regularisation rules set", "Who can correct a missed punch, and by when."]] },
  { t: "Leave policies", own: ["hrm"], why: "Leave rules must match the written policy.",
    items: [["Leave types created", "Casual, sick, earned, maternity, etc."], ["Accrual and carry-forward set", "Check against the policy document."], ["Approval chain defined", "Manager first, HR for long leave."]] },
  { t: "Payroll setup", own: ["pay", "admin"], why: "Pay structures and statutory settings decide every salary.",
    items: [["Salary components and structures", "Basic, allowances, deductions."], ["Statutory settings", "PF, ESI, professional tax and TDS (India examples)."], ["Pay calendar and cut-off dates", "Attendance lock date must come before payroll."], ["Parallel run planned", "Run old and new systems together once."]], field: ["Salary day of month", "e.g. 28"] },
  { t: "Recruitment and ATS", own: ["hrm", "mgr"], why: "A standard hiring process makes decisions comparable.",
    items: [["Job templates and approval flow", "Requisition approval before posting."], ["Pipeline stages configured", "Applied to Hired, with clear exit reasons."], ["Interview scorecards and panels", "Same criteria for every candidate."]] },
  { t: "Performance cycle", own: ["hrm", "mgr"], why: "Goals and review dates must be known before the cycle opens.",
    items: [["Review cycle and rating scale", "Annual, half-yearly or quarterly."], ["Goal templates ready", "Use measurable goals."], ["Calibration schedule fixed", "Needed to keep ratings fair."]] },
  { t: "Policies and compliance", own: ["admin", "hrm"], why: "People must acknowledge the rules that apply to them.",
    items: [["Policies uploaded for acknowledgement", "Version and effective date on each."], ["Compliance calendar loaded", "Due dates for returns and registers."], ["Data privacy consent configured", "Explain what data is used and why."]] },
  { t: "Review and go-live", own: ["admin"], why: "A pilot and training prevent a messy launch.",
    items: [["Pilot group tested end to end", "Test leave, payroll and an approval."], ["Users trained", "Short sessions by role."], ["Go-live announced", "Share date, support contact and help links."]], last: true },
];

const OB_KEY = "hrx-onboarding-v1";

export function HRMSOnboarding() {
  const [role, setRole] = useState("admin");
  const [cur, setCur] = useState(0);
  const [checks, setChecks] = useState({});
  const [fields, setFields] = useState({});
  const [savedAt, setSavedAt] = useState("");
  const [resume, setResume] = useState(null);
  const ready = useRef(false);

  useEffect(() => {
    const s = store.get(OB_KEY, null);
    if (s && typeof s === "object") {
      setRole(s.role || "admin"); setChecks(s.checks || {}); setFields(s.fields || {}); setSavedAt(s.savedAt || "");
      const any = Object.keys(s.checks || {}).length > 0;
      if (any) { setCur(Math.min(11, s.cur || 0)); setResume(Math.min(11, s.cur || 0)); }
    }
    ready.current = true;
  }, []);

  const save = useCallback((next) => {
    const when = new Date().toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
    const ok = store.set(OB_KEY, { ...next, savedAt: when });
    setSavedAt(ok ? when : "");
  }, []);

  const stageDone = (i) => OB_STAGES[i].items.every((_, k) => checks[i + "." + k]);
  const doneCount = OB_STAGES.filter((_, i) => stageDone(i)).length;
  const st = OB_STAGES[cur];
  const canEdit = role === "admin" || st.own.includes(role);
  const roleName = (OB_ROLES.find((r) => r[0] === role) || [])[1];
  const ownerNames = st.own.map((o) => (OB_ROLES.find((r) => r[0] === o) || [])[1]).join(", ");
  const blocked = st.last && doneCount < 11;

  const toggle = (k) => {
    if (!canEdit || blocked) return;
    const nc = { ...checks, [cur + "." + k]: !checks[cur + "." + k] };
    if (!nc[cur + "." + k]) delete nc[cur + "." + k];
    setChecks(nc); save({ role, cur, checks: nc, fields });
  };
  const setField = (v) => { const nf = { ...fields, [cur]: v }; setFields(nf); save({ role, cur, checks, fields: nf }); };
  const pick = (r) => { setRole(r); save({ role: r, cur, checks, fields }); };
  const go = (i) => { const n = Math.max(0, Math.min(11, i)); setCur(n); save({ role, cur: n, checks, fields }); setResume(null); };
  const reset = () => {
    if (typeof window !== "undefined" && !window.confirm("Clear all saved onboarding progress?")) return;
    store.del(OB_KEY); setChecks({}); setFields({}); setCur(0); setSavedAt(""); setResume(null);
  };

  return (
    <section className="hrx-x" aria-labelledby="hrx-ob-t">
      <div className="hrx-sec-head">
        <h2 id="hrx-ob-t">HRMS onboarding: 12 stages</h2>
        <p className="hrx-sec-sub">A guided set-up for a company moving to an HRMS. Choose your role: you can edit the stages your role owns and view the rest. Progress is saved in this browser, so you can leave and resume. Hover or focus the <span className="hrx-tip inline" aria-hidden="true">?</span> marks for help.</p>

        <div className="hrx-ob-top">
          <label className="hrx-ob-role">Viewing as
            <select value={role} onChange={(e) => pick(e.target.value)}>{OB_ROLES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </label>
          <div className="hrx-ob-prog" aria-label={`${doneCount} of 12 stages complete`}><Bar pct={(doneCount / 12) * 100} /><b>{doneCount} / 12 complete</b></div>
          <span className="hrx-ob-saved" role="status">{savedAt ? "Saved " + savedAt : "Not saved yet"}</span>
          <button type="button" className="hrx-link" onClick={reset}>Start over</button>
        </div>

        {resume !== null && (
          <p className="hrx-msg ok" role="status">Welcome back. You stopped at stage {resume + 1}, {OB_STAGES[resume].t}.
            <button type="button" className="hrx-link" onClick={() => setResume(null)}> Continue here</button></p>
        )}

        <div className="hrx-ob">
          <ol className="hrx-ob-list" aria-label="Onboarding stages">
            {OB_STAGES.map((s, i) => {
              const mine = role === "admin" || s.own.includes(role);
              return (
                <li key={s.t}><button type="button" className={(i === cur ? "on " : "") + (stageDone(i) ? "done " : "") + (mine ? "mine" : "")} aria-current={i === cur ? "step" : undefined} onClick={() => go(i)}>
                  <b>{stageDone(i) ? "\u2713" : i + 1}</b><span>{s.t}</span>{mine && role !== "admin" && <small>yours</small>}</button></li>);
            })}
          </ol>
          <div className="hrx-ob-main">
            <p className="hrx-eyebrow">Stage {cur + 1} of 12 · Owner: {ownerNames}</p>
            <h3>{st.t}</h3>
            <p className="hrx-note">{st.why}</p>
            {!canEdit && <p className="hrx-msg no" role="note">{roleName} can view this stage but not change it. Switch role to {ownerNames.split(",")[0]} to edit.</p>}
            {blocked && <p className="hrx-msg no" role="note">Finish stages 1 to 11 first. {11 - doneCount} still open.</p>}
            <ul className="hrx-checks">
              {st.items.map(([label, tip], k) => (
                <li key={label}><label className={!canEdit || blocked ? "ro" : ""}>
                  <input type="checkbox" checked={!!checks[cur + "." + k]} disabled={!canEdit || blocked} onChange={() => toggle(k)} />
                  <span>{label}</span></label><Tip text={tip} /></li>))}
            </ul>
            {st.field && (
              <div className="hrx-f"><label htmlFor="hrx-ob-field">{st.field[0]}</label>
                <input id="hrx-ob-field" disabled={!canEdit} value={fields[cur] || ""} placeholder={st.field[1]} onChange={(e) => setField(e.target.value)} /></div>)}
            <div className="hrx-ob-nav">
              <button type="button" className="hrx-b2x" onClick={() => go(cur - 1)} disabled={cur === 0}>&larr; Previous</button>
              <button type="button" className="hrx-b1x" onClick={() => go(cur + 1)} disabled={cur === 11}>{stageDone(cur) ? "Next stage" : "Skip for now"} &rarr;</button>
            </div>
            {cur === 11 && doneCount === 12 && <p className="hrx-msg ok" role="status">All 12 stages complete. You are ready to go live.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ 6. ATS WORKBENCH (working demo, runs in the browser) ═════════════════════════ */
export const ATS_JOBS = [
  { id: "j1", title: "HR Executive", minYears: 2, skills: ["recruitment", "onboarding", "excel", "communication", "hris"] },
  { id: "j2", title: "Payroll Specialist", minYears: 3, skills: ["payroll", "pf", "esi", "tds", "excel", "compliance"] },
  { id: "j3", title: "Talent Acquisition Lead", minYears: 5, skills: ["sourcing", "interviewing", "ats", "stakeholder", "employer branding", "analytics"] },
];
export const ATS_STAGES = ["Applied", "Screening", "Shortlisted", "Interview", "Offer", "Hired", "Rejected"];
const PANEL = ["Neha Kapoor (HR Manager)", "Vikram Joshi (Hiring Manager)", "Sana Ali (Senior Recruiter)", "Rahul Verma (Team Lead)"];
const SKILL_DICT = ["recruitment", "sourcing", "interviewing", "onboarding", "payroll", "pf", "esi", "tds", "excel", "hris", "ats", "compliance",
  "communication", "stakeholder", "analytics", "employer branding", "performance management", "learning", "sql", "power bi", "negotiation", "labour law", "employee relations"];
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* Parse plain resume text. Honest limits: names/skills are guessed from text, so always review. */
export function parseResume(text) {
  const t = String(text || "").replace(/\r/g, "");
  const lines = t.split("\n").map((l) => l.trim()).filter(Boolean);
  const email = (t.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/) || [""])[0];
  const phone = ((t.match(/(\+?\d[\d\s\-()]{8,16}\d)/) || [""])[0]).trim();
  const nameLine = lines.find((l) => l.length <= 40 && !/@|\d{4,}|resume|curriculum|cv\b/i.test(l) && /^[A-Za-z][A-Za-z .'-]+$/.test(l));
  const yrs = [...t.matchAll(/(\d{1,2})\+?\s*(?:years?|yrs?)/gi)].map((m) => +m[1]).filter((n) => n < 50);
  const lower = t.toLowerCase();
  const skills = SKILL_DICT.filter((s) => new RegExp("(^|[^a-z])" + esc(s) + "([^a-z]|$)", "i").test(lower));
  const edu = (t.match(/\b(mba|pgdm|mhrm|b\.?tech|m\.?tech|bba|b\.?com|m\.?com|b\.?sc|m\.?sc|bachelor|master|ph\.?d)\b/i) || [""])[0];
  return { name: nameLine || "Unnamed candidate", email, phone, years: yrs.length ? Math.max(...yrs) : 0, skills, edu };
}

export function scoreCandidate(job, p) {
  const hit = job.skills.filter((s) => p.skills.includes(s));
  const skillPart = (hit.length / job.skills.length) * 70;
  const yearPart = Math.min(1, p.years / job.minYears) * 30;
  return { score: Math.round(skillPart + yearPart), hit, miss: job.skills.filter((s) => !hit.includes(s)) };
}

const ATS_KEY = "hrx-ats-v1";
const seedCands = () => [
  { id: "s1", sample: true, name: "Priya Sharma", email: "priya.sharma@example.com", phone: "+91 98765 43210", years: 4, skills: ["recruitment", "onboarding", "excel", "communication"], edu: "MBA", jobId: "j1", score: 0, stage: "Screening" },
  { id: "s2", sample: true, name: "Arjun Singh", email: "arjun.singh@example.com", phone: "+91 91234 56780", years: 6, skills: ["payroll", "pf", "esi", "tds", "compliance", "excel"], edu: "B.Com", jobId: "j2", score: 0, stage: "Shortlisted" },
  { id: "s3", sample: true, name: "Neel Desai", email: "neel.desai@example.com", phone: "+91 99887 76655", years: 2, skills: ["sourcing", "interviewing"], edu: "BBA", jobId: "j3", score: 0, stage: "Applied" },
].map((c) => ({ ...c, score: scoreCandidate(ATS_JOBS.find((j) => j.id === c.jobId), c).score }));

export function ATSWorkbench() {
  const [cands, setCands] = useState([]);
  const [ivs, setIvs] = useState([]);
  const [jobId, setJobId] = useState("j1");
  const [text, setText] = useState("");
  const [parsed, setParsed] = useState(null);
  const [msg, setMsg] = useState(null);
  const [today, setToday] = useState("");
  const [iv, setIv] = useState({ cid: "", date: "", time: "", mode: "Video", panel: PANEL[0] });
  const [ivErr, setIvErr] = useState("");
  const fileRef = useRef(null);
  const loaded = useRef(false);

  useEffect(() => {
    const s = store.get(ATS_KEY, null);
    setCands(s && Array.isArray(s.cands) ? s.cands : seedCands());
    setIvs(s && Array.isArray(s.ivs) ? s.ivs : []);
    const d = new Date(); setToday(d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()));
    loaded.current = true;
  }, []);
  useEffect(() => { if (loaded.current) store.set(ATS_KEY, { cands, ivs }); }, [cands, ivs]);

  const job = ATS_JOBS.find((j) => j.id === jobId);
  const preview = parsed ? scoreCandidate(job, parsed) : null;

  const onFile = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setMsg(null);
    if (f.size > 1024 * 1024) { setMsg(["no", "File is larger than 1 MB. Please use a smaller text file."]); e.target.value = ""; return; }
    if (!/\.(txt|md|csv|rtf)$/i.test(f.name) && !/^text\//.test(f.type)) {
      setMsg(["no", "PDF and Word files need the server-side parser, which is not built yet. Save the resume as .txt or paste the text below."]); e.target.value = ""; return;
    }
    try { const t = await f.text(); setText(t); setParsed(parseResume(t)); setMsg(["ok", `Read ${f.name}. Review the extracted details before adding.`]); }
    catch (err) { setMsg(["no", "Could not read that file. Try pasting the text instead."]); }
    e.target.value = "";
  };
  const doParse = () => {
    if (text.trim().length < 30) { setMsg(["no", "Paste at least a few lines of resume text first."]); return; }
    setParsed(parseResume(text)); setMsg(["ok", "Extracted. Check the details, fix anything wrong, then add to the pipeline."]);
  };
  const addCand = () => {
    if (!parsed) return;
    if (!parsed.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(parsed.email)) { setMsg(["no", "A valid email is needed to add the candidate. Type it into the email box."]); return; }
    if (cands.some((c) => c.email.toLowerCase() === parsed.email.toLowerCase() && c.jobId === jobId)) { setMsg(["no", "This candidate has already applied for this job."]); return; }
    const sc = scoreCandidate(job, parsed);
    setCands((p) => [{ id: "c" + Date.now(), name: parsed.name, email: parsed.email, phone: parsed.phone, years: parsed.years, skills: parsed.skills, edu: parsed.edu, jobId, score: sc.score, stage: "Applied" }, ...p]);
    setParsed(null); setText(""); setMsg(["ok", "Candidate added to Applied."]);
  };
  const move = (id, dir) => setCands((p) => p.map((c) => {
    if (c.id !== id) return c;
    const i = ATS_STAGES.indexOf(c.stage), pipe = ATS_STAGES.length - 1; /* last = Rejected */
    if (dir === "rej") return { ...c, stage: "Rejected" };
    if (c.stage === "Rejected") return { ...c, stage: "Applied" };
    return { ...c, stage: ATS_STAGES[Math.max(0, Math.min(pipe - 1, i + dir))] };
  }));
  const remove = (id) => { setCands((p) => p.filter((c) => c.id !== id)); setIvs((p) => p.filter((x) => x.cid !== id)); };

  const schedule = () => {
    setIvErr("");
    if (!iv.cid) return setIvErr("Choose a candidate.");
    if (!iv.date || !iv.time) return setIvErr("Choose a date and a time.");
    if (iv.date < today) return setIvErr("That date is in the past.");
    const clash = ivs.find((x) => x.date === iv.date && x.time === iv.time && x.panel === iv.panel);
    if (clash) return setIvErr(`${iv.panel} is already booked at that time (${(cands.find((c) => c.id === clash.cid) || {}).name || "another candidate"}).`);
    setIvs((p) => [...p.filter((x) => x.cid !== iv.cid), { ...iv, id: "i" + Date.now() }]);
    setCands((p) => p.map((c) => (c.id === iv.cid && ["Applied", "Screening", "Shortlisted"].includes(c.stage) ? { ...c, stage: "Interview" } : c)));
    setIv({ cid: "", date: "", time: "", mode: "Video", panel: PANEL[0] });
  };
  const reset = () => { if (window.confirm("Remove all candidates and interviews you added in this demo?")) { store.del(ATS_KEY); setCands(seedCands()); setIvs([]); setParsed(null); setText(""); setMsg(null); } };
  const open = cands.filter((c) => !["Hired", "Rejected"].includes(c.stage));

  return (
    <section className="hrx-x" aria-labelledby="hrx-lab-t">
      <div className="hrx-sec-head">
        <h2 id="hrx-lab-t">ATS workbench: try the workflow</h2>
        <p className="hrx-sec-sub">A working demo that runs only in your browser. Nothing is uploaded, and data stays on this device. It shows the three core jobs of an ATS: reading a resume, moving candidates through a pipeline, and scheduling interviews. Names marked sample are made up. Real PDF and Word parsing needs the backend and is not part of this demo.</p>

        <h3 className="hrx-ats-h">1. Resume upload and parsing</h3>
        <div className="hrx-lab-grid">
          <div className="hrx-card">
            <div className="hrx-f"><label htmlFor="hrx-job">Applying for</label>
              <select id="hrx-job" value={jobId} onChange={(e) => setJobId(e.target.value)}>{ATS_JOBS.map((j) => <option key={j.id} value={j.id}>{j.title} (needs {j.minYears}+ years)</option>)}</select></div>
            <div className="hrx-f"><label htmlFor="hrx-file">Upload a text resume (.txt, .md, .csv)</label>
              <input id="hrx-file" ref={fileRef} type="file" accept=".txt,.md,.csv,.rtf,text/plain" onChange={onFile} /></div>
            <div className="hrx-f"><label htmlFor="hrx-paste">or paste resume text</label>
              <textarea id="hrx-paste" rows={7} value={text} onChange={(e) => setText(e.target.value)} placeholder={"Asha Verma\nasha.verma@example.com  +91 90000 11111\nHR Executive with 4 years of experience in recruitment, onboarding, payroll and Excel.\nMBA (HR)"} /></div>
            <button type="button" className="hrx-b1x" onClick={doParse}>Extract details</button>
            {msg && <p className={"hrx-msg " + msg[0]} role={msg[0] === "no" ? "alert" : "status"}>{msg[1]}</p>}
          </div>
          <div className="hrx-card">
            <h4 className="hrx-h4">Extracted profile</h4>
            {!parsed ? <p className="hrx-note">Nothing yet. Upload or paste a resume and press Extract details.</p> : (<>
              <div className="hrx-f"><label htmlFor="hrx-pn">Name</label><input id="hrx-pn" value={parsed.name} onChange={(e) => setParsed({ ...parsed, name: e.target.value })} /></div>
              <div className="hrx-f2">
                <div className="hrx-f"><label htmlFor="hrx-pe">Email</label><input id="hrx-pe" value={parsed.email} onChange={(e) => setParsed({ ...parsed, email: e.target.value })} /></div>
                <div className="hrx-f"><label htmlFor="hrx-pp">Phone</label><input id="hrx-pp" value={parsed.phone} onChange={(e) => setParsed({ ...parsed, phone: e.target.value })} /></div>
              </div>
              <p className="hrx-note">Experience: <b>{parsed.years} years</b> · Education: <b>{parsed.edu || "not found"}</b></p>
              <ul className="hrx-chips">{parsed.skills.length ? parsed.skills.map((s) => <li key={s} className={job.skills.includes(s) ? "hit" : ""}>{s}</li>) : <li>no known skills found</li>}</ul>
              <div className="hrx-match"><b>Match for {job.title}: {preview.score}%</b><Bar pct={preview.score} tone={preview.score < 50 ? "warn" : ""} /></div>
              {preview.miss.length > 0 && <p className="hrx-note">Missing: {preview.miss.join(", ")}</p>}
              <button type="button" className="hrx-b1x" onClick={addCand}>Add to pipeline</button></>)}
          </div>
        </div>

        <h3 className="hrx-ats-h">2. Recruitment pipeline</h3>
        <p className="hrx-note">Use the arrows to move a candidate between stages. Reject sends the candidate to Rejected; the left arrow on a rejected card brings them back to Applied.</p>
        <div className="hrx-kan" role="list" aria-label="Recruitment pipeline">
          {ATS_STAGES.map((stg) => {
            const col = cands.filter((c) => c.stage === stg);
            return (
              <div className="hrx-col" key={stg} role="listitem" aria-label={stg}>
                <h4>{stg} <span>{col.length}</span></h4>
                {col.map((c) => {
                  const j = ATS_JOBS.find((x) => x.id === c.jobId) || ATS_JOBS[0];
                  return (
                    <article className="hrx-cc" key={c.id}>
                      <b>{c.name}</b>{c.sample && <small className="hrx-samp">sample</small>}
                      <span>{j.title}</span>
                      <span className="hrx-sc">Match {c.score}%</span>
                      <div className="hrx-cacts">
                        <button type="button" aria-label={`Move ${c.name} back`} onClick={() => move(c.id, -1)} disabled={c.stage === "Applied"}>&larr;</button>
                        <button type="button" aria-label={`Move ${c.name} forward`} onClick={() => move(c.id, 1)} disabled={c.stage === "Hired" || c.stage === "Rejected"}>&rarr;</button>
                        {c.stage !== "Rejected" && c.stage !== "Hired" && <button type="button" className="rej" onClick={() => move(c.id, "rej")}>Reject</button>}
                        <button type="button" className="rm" aria-label={`Remove ${c.name}`} onClick={() => remove(c.id)}>&times;</button>
                      </div>
                    </article>);
                })}
              </div>);
          })}
        </div>

        <h3 className="hrx-ats-h">3. Interview scheduling</h3>
        <div className="hrx-lab-grid">
          <div className="hrx-card">
            <div className="hrx-f"><label htmlFor="hrx-ic">Candidate</label>
              <select id="hrx-ic" value={iv.cid} onChange={(e) => setIv({ ...iv, cid: e.target.value })}><option value="">Select a candidate</option>{open.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.stage})</option>)}</select></div>
            <div className="hrx-f2">
              <div className="hrx-f"><label htmlFor="hrx-id">Date</label><input id="hrx-id" type="date" min={today} value={iv.date} onChange={(e) => setIv({ ...iv, date: e.target.value })} /></div>
              <div className="hrx-f"><label htmlFor="hrx-it">Time</label><input id="hrx-it" type="time" value={iv.time} onChange={(e) => setIv({ ...iv, time: e.target.value })} /></div>
            </div>
            <div className="hrx-f2">
              <div className="hrx-f"><label htmlFor="hrx-im">Mode</label><select id="hrx-im" value={iv.mode} onChange={(e) => setIv({ ...iv, mode: e.target.value })}><option>Video</option><option>On-site</option><option>Phone</option></select></div>
              <div className="hrx-f"><label htmlFor="hrx-ip">Panel</label><select id="hrx-ip" value={iv.panel} onChange={(e) => setIv({ ...iv, panel: e.target.value })}>{PANEL.map((p) => <option key={p}>{p}</option>)}</select></div>
            </div>
            <button type="button" className="hrx-b1x" onClick={schedule}>Schedule interview</button>
            {ivErr && <p className="hrx-msg no" role="alert">{ivErr}</p>}
          </div>
          <div className="hrx-card">
            <h4 className="hrx-h4">Scheduled interviews</h4>
            {!ivs.length ? <p className="hrx-note">None yet. A booked interview also moves the candidate to the Interview stage.</p> : (
              <ul className="hrx-list">{[...ivs].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map((x) => (
                <li key={x.id}><b>{(cands.find((c) => c.id === x.cid) || {}).name || "Candidate removed"}</b> · {x.date} at {x.time} · {x.mode}<br /><small>{x.panel}</small>
                  <button type="button" className="hrx-undo" onClick={() => setIvs((p) => p.filter((y) => y.id !== x.id))}>cancel</button></li>))}</ul>)}
          </div>
        </div>
        <p><button type="button" className="hrx-link" onClick={reset}>Reset the demo data</button></p>
      </div>
    </section>
  );
}

/* ═════════════════════════ 7. ASSET AUDIT (development only, logs to the console) ═════════════════════════ */
export function auditHubAssets({ resolveImg, resolveVid, reelKeys, vid }) {
  if (typeof process !== "undefined" && process.env && process.env.NODE_ENV === "production") return;
  const miss = [];
  const chk = (kind, key, fn) => { if (!fn(key)) miss.push({ kind, key }); };
  for (let n = 1; n <= 21; n++) { chk("image", "module-" + pad(n), resolveImg); chk("video", "module-" + pad(n), resolveVid); }
  ["ta", "ops", "rew", "dev", "exp", "gov", "str", "sal"].forEach((k) => chk("image", "domain-" + k, resolveImg));
  for (let n = 1; n <= 9; n++) chk("image", "lifecycle-" + n, resolveImg);
  ["hero", "journey", "classification", "templates", "assessment", "analytics", "demo", "about", "hr-sales"].forEach((k) => chk("image", k, resolveImg));
  ["welcome", "journey", "hr-sales", "assessment", "analytics", "demo", "about"].forEach((k) => chk("video", k, resolveVid));
  (reelKeys || []).forEach((k) => chk("video (reel)", k, vid));
  /* structure checks: every module belongs to exactly one domain, and every module has info */
  const seen = HRMS_DOMAINS.flatMap((d) => d.mods);
  for (let n = 1; n <= D.mods.length; n++) {
    if (seen.filter((x) => x === n).length !== 1) miss.push({ kind: "domain mapping", key: "module " + n });
    if (!MODULE_INFO[n]) miss.push({ kind: "module info", key: "module " + n });
  }
  if (miss.length) { console.warn("[HR Hub audit] " + miss.length + " problem(s):"); console.table(miss); }
  else console.info("[HR Hub audit] all mapped images, videos and module mappings resolve.");
}
