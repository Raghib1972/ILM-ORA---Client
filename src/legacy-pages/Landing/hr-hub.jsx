"use client";

/* ─────────────────────────────────────────────────────────────────────────
   HR Hub page  →  src/legacy-pages/Landing/HRHub.jsx

   Files needed in the same folder:
     hr-hub.css · hr-hubData.js · hr-hubEngine.js · hr-hubExtras.jsx · hr-hubExtras.css

   What this page contains
   1. Hero intro (video, live counters)
   2. The complete HR Hub learning app (engine): Home, Modules, Lessons, Journey,
      Lifecycle, Templates, Assessment, Analytics, Texora demo, About, Glossary,
      My Progress, Ctrl+K search, theme toggle
   3. All images and videos from src/assets/HR-Hub, auto-imported and mapped
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import PublicLayout, { openSignupModal } from "./components/PublicLayout";
import mountHRHub from "./hr-hubEngine";
import "./hr-hub.css";
import {
  PageMapNav, Part, PartHead, PartFoot,
  HRMSDomains, ModuleVision, HubDashboards, HRMSOnboarding, ATSWorkbench,
  auditHubAssets,
} from "./hr-hubExtras";

/* ── Auto-import every image / video (any file extension) ─────────────── */
const imgCtx = require.context("../../assets/HR-Hub/images", false, /\.(jpe?g|png|webp|avif)$/i);
const vidCtx = require.context("../../assets/HR-Hub/videos", false, /\.(mp4|webm|mov)$/i);

const toUrl = (m) => {
  const d = m && m.default !== undefined ? m.default : m;
  return typeof d === "string" ? d : d?.src || "";
};
const build = (ctx) => ctx.keys().map((k) => ({ k, url: toUrl(ctx(k)) }));
const IMGS = build(imgCtx);
const VIDS = build(vidCtx);
const IMG_URLS = IMGS.map((f) => f.url);
const VID_URLS = VIDS.map((f) => f.url);

/* ── Global HR product logos (src/assets/HR-Hub/Logo) ─────────────────── */
const logoCtx = require.context("../../assets/HR-Hub/Logo", false, /\.(jpe?g|png|webp|avif|svg)$/i);
const LOGOS = build(logoCtx);
const logo = (name) =>
  LOGOS.find((f) => f.k.replace(/^.*\//, "").replace(/\.\w+$/, "").toLowerCase() === name.toLowerCase())?.url || "";

const GLOBAL_PRODUCTS = [
  {
    file: "texora-logo", name: "Texora AI",
    desc: "HR product featured in the HR Hub demonstrations. Demos are shown only for workflows confirmed live in the product.",
    vision: "Show how the HR processes taught in the Hub work in a real product.",
    features: ["Recruitment workflows", "HR Sales (in development)"],
    domain: "Recruitment · HR Sales", audience: "Recruiters, HR teams and hiring managers",
  },
  {
    file: "Workday", name: "Workday",
    desc: "Cloud platform that brings HR, payroll, talent and finance together in one system.",
    vision: "One system of record, so people data and finance data stay consistent across a large organisation.",
    features: ["Unified HCM", "Talent & performance", "Workforce planning", "Reporting & analytics"],
    domain: "Core HR", audience: "Large and mid-to-large enterprises",
  },
  {
    file: "SAP_SuccessFactors", name: "SAP SuccessFactors",
    desc: "Cloud human capital management suite from SAP covering the employee lifecycle, from hiring to retirement.",
    vision: "Connect talent decisions with business strategy across a global workforce.",
    features: ["Recruiting & onboarding", "Performance & goals", "Learning", "Succession & compensation"],
    domain: "Performance Management · Learning & Development", audience: "Global enterprises, especially SAP customers",
  },
  {
    file: "Oracle_HCM", name: "Oracle HCM",
    desc: "Oracle's cloud suite for core HR, talent, workforce management and payroll.",
    vision: "Run HR processes in one cloud application suite, with analytics and automation built in.",
    features: ["Global HR", "Talent management", "Workforce management", "Payroll & analytics"],
    domain: "Core HR · Payroll & Compensation", audience: "Large and multinational enterprises",
  },
  {
    file: "BambooHR", name: "BambooHR",
    desc: "HR software built for small and growing businesses, focused on employee records, hiring and onboarding.",
    vision: "Make HR simple, so small teams spend less time on admin and more on people.",
    features: ["Employee database", "Applicant tracking", "Onboarding", "Time off & performance"],
    domain: "Onboarding & Offboarding · Core HR", audience: "Small and medium businesses",
  },
  {
    file: "ADP", name: "ADP",
    desc: "Global provider of payroll, HR, tax, benefits and time-tracking technology and services.",
    vision: "Help organisations pay people accurately and stay compliant with payroll and tax rules.",
    features: ["Payroll processing", "Tax compliance", "Time & attendance", "Benefits administration"],
    domain: "Payroll & Compensation", audience: "Businesses of every size, from small firms to enterprises",
  },
  {
    file: "Zoho_People", name: "Zoho People",
    desc: "Cloud HR software from Zoho for employee records, attendance, leave and appraisals.",
    vision: "Affordable, easy-to-configure HR for growing teams.",
    features: ["Employee self-service", "Attendance & timesheets", "Leave tracking", "Appraisals & learning"],
    domain: "Attendance & Leave · Core HR", audience: "Small and mid-size businesses",
  },
];

function LogoTile({ file, name }) {
  const [failed, setFailed] = useState(false);
  const src = logo(file);
  return (
    <div className="hrx-gp-logo">
      {src && !failed ? (
        <img src={src} alt={`${name} logo`} loading="lazy" decoding="async" onError={() => setFailed(true)} />
      ) : (
        <span>{name}</span>
      )}
    </div>
  );
}

function GlobalHRProducts() {
  const loop = [...GLOBAL_PRODUCTS, ...GLOBAL_PRODUCTS]; /* 2 copies => seamless endless loop */
  return (
    <section className="hrx-gp" id="global-hr-products" aria-labelledby="hrx-gp-title">
      <div className="hrx-gp-head">
        <h2 id="hrx-gp-title">Global HR products for reference</h2>
        <p className="hrx-gp-sub">
          Well-known HR platforms used worldwide, shown so you can compare how each one organises HR work.
        </p>
      </div>
      <div className="hrx-gp-marq">
        <div className="hrx-gp-track">
          {loop.map((p, i) => (
            <article
              className="hrx-gp-card"
              key={`${p.file}-${i}`}
              aria-hidden={i >= GLOBAL_PRODUCTS.length ? true : undefined}
            >
              <LogoTile file={p.file} name={p.name} />
              <h3>{p.name}{p.own && <small className="hrx-gp-badge">ILM ORA product</small>}</h3>
              <p className="hrx-gp-desc">{p.desc}</p>
              <p className="hrx-gp-meta"><b>Vision and purpose</b><span>{p.vision}</span></p>
              <p className="hrx-gp-meta"><b>Related HR domain</b><span>{p.domain}</span></p>
              <p className="hrx-gp-meta"><b>Target audience</b><span>{p.audience}</span></p>
              <ul aria-label={`${p.name} key features`}>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <div className="hrx-gp-head">
        <p className="hrx-gp-note">
          Other products shown are global references only, not integrations or partnerships with ILM ORA.
          Names and logos belong to their respective owners.
        </p>
      </div>
    </section>
  );
}

/* ── ATS (Applicant Tracking System) concept guide ───────────────────── */
const ATS_STEPS = [
  ["Job Requisition", "A hiring manager raises the need with role, headcount and budget. HR approves it before any hiring starts.", "Hiring Manager, HR Manager"],
  ["Job Posting", "The approved role is published on the career page and job boards with clear criteria.", "Recruiter"],
  ["Application", "Candidates apply and upload resumes. The system reads each resume and builds a searchable profile.", "Candidate"],
  ["Screening", "Resumes are checked against the must-have criteria. Clear mismatches are closed with a message.", "Recruiter, HR Executive"],
  ["Shortlisting", "Best-fit candidates move forward and are shared with the hiring manager for review.", "Recruiter, Hiring Manager"],
  ["Interview", "Interview rounds are scheduled with candidates and panels. Feedback is recorded on a scorecard.", "Interviewers, HR Executive"],
  ["Assessment", "Skill tests or practical tasks are given and scored in the same candidate record.", "Interviewers"],
  ["Selection", "Scorecards are compared and the hiring decision is documented.", "Hiring Manager, HR Manager"],
  ["Offer Letter", "Compensation is approved, the offer letter is sent and the candidate accepts or declines.", "HR Manager, HR Executive"],
  ["Hiring", "The candidate is marked as hired and handed over to onboarding.", "HR Executive"],
];

const ATS_FEATURES = [
  "Job Requisition Management", "Job Posting", "Candidate Database", "Resume Upload & Parsing",
  "Resume Screening", "Application Tracking", "Candidate Shortlisting", "Interview Scheduling",
  "Interview Management", "Assessments", "Recruitment Pipeline", "Offer Letters",
  "Candidate Communication", "Recruitment Analytics",
];

const ATS_ROLES = [
  { name: "Recruiters", focus: "Source, screen and move candidates through the pipeline every day.",
    uses: ["Job Posting", "Candidate Database", "Resume Upload & Parsing", "Resume Screening", "Application Tracking", "Candidate Shortlisting", "Recruitment Pipeline", "Candidate Communication"] },
  { name: "Talent Acquisition Teams", focus: "Plan hiring across roles, manage the talent pool and track team performance.",
    uses: ["Job Requisition Management", "Job Posting", "Candidate Database", "Recruitment Pipeline", "Recruitment Analytics"] },
  { name: "HR Managers", focus: "Approve requisitions and offers, and watch hiring metrics.",
    uses: ["Job Requisition Management", "Recruitment Pipeline", "Offer Letters", "Recruitment Analytics"] },
  { name: "HR Executives", focus: "Handle coordination: schedules, candidate records, communication and offer paperwork.",
    uses: ["Candidate Database", "Application Tracking", "Interview Scheduling", "Candidate Communication", "Offer Letters"] },
  { name: "Hiring Managers", focus: "Raise openings, review shortlists and decide who to hire.",
    uses: ["Job Requisition Management", "Candidate Shortlisting", "Interview Management", "Recruitment Pipeline"] },
  { name: "Interviewers", focus: "Take the interview, score the candidate and submit feedback on time.",
    uses: ["Interview Scheduling", "Interview Management", "Assessments"] },
  { name: "Candidates", focus: "Apply, track the application status, book interview slots and respond to offers.",
    uses: ["Resume Upload & Parsing", "Application Tracking", "Interview Scheduling", "Assessments", "Candidate Communication", "Offer Letters"] },
];

function ATSSection() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(0);
  const s = ATS_STEPS[step];
  const r = ATS_ROLES[role];
  return (
    <section className="hrx-ats" id="ats" aria-labelledby="hrx-ats-title">
      <div className="hrx-sec-head">
        <h2 id="hrx-ats-title">ATS: how recruitment tracking works</h2>
        <p className="hrx-sec-sub">
          An Applicant Tracking System (ATS) follows every hire from the first requisition to the final joining.
          This is a concept guide to the workflow and who uses each part. It is not a feature list of any one product.
        </p>

        <h3 className="hrx-ats-h">Recruitment workflow</h3>
        <ol className="hrx-ats-flow">
          {ATS_STEPS.map((x, i) => (
            <li key={x[0]}>
              <button type="button" className={i === step ? "on" : ""} aria-pressed={i === step} onClick={() => setStep(i)}>
                <b>{i + 1}</b>{x[0]}
              </button>
            </li>
          ))}
        </ol>
        <div className="hrx-ats-detail" aria-live="polite">
          <h4>{step + 1}. {s[0]}</h4>
          <p>{s[1]}</p>
          <p className="hrx-ats-own"><b>Handled by</b>{s[2]}</p>
        </div>

        <h3 className="hrx-ats-h">Who uses which ATS function</h3>
        <div className="hrx-ats-roles" role="tablist" aria-label="ATS audience">
          {ATS_ROLES.map((x, i) => (
            <button type="button" role="tab" aria-selected={i === role} key={x.name} className={i === role ? "on" : ""} onClick={() => setRole(i)}>
              {x.name}
            </button>
          ))}
        </div>
        <p className="hrx-ats-focus"><b>{r.name}:</b> {r.focus}</p>
        <ul className="hrx-ats-feat" aria-label={`ATS functions for ${r.name}`}>
          {ATS_FEATURES.map((f) => {
            const used = r.uses.includes(f);
            return <li key={f} className={used ? "on" : ""}>{used ? "✓ " : ""}{f}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}

/* ── Contact / lead form ──────────────────────────────────────────────── */
/* Set ONE of these in your .env (Next: NEXT_PUBLIC_..., CRA: REACT_APP_...) to your real endpoint.
   If it is empty the form shows a clear "not connected" error. It never fakes a success. */
const CONTACT_API_URL =
  process.env.NEXT_PUBLIC_CONTACT_API_URL || process.env.REACT_APP_CONTACT_API_URL || "";

/* TEMPORARY demo mode: until the backend URL is set, localhost (npm start) shows the success message
   WITHOUT sending anything anywhere. Production builds still show "not connected" (unless forced via env). */
const CONTACT_DEMO =
  !CONTACT_API_URL &&
  (process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_CONTACT_DEMO === "true" ||
    process.env.REACT_APP_CONTACT_DEMO === "true");

const CONTACT_SUBJECTS = ["HRMS demo", "ATS (recruitment)", "Pricing", "Product information", "Partnership", "General enquiry"];
const CONTACT_EMPTY = { name: "", email: "", phone: "", subject: "", message: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateContact(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Email address is required.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Enter a valid email, for example name@company.com.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Phone number is required.";
  else if (!/^\+?[0-9\s\-()]+$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15)
    e.phone = "Enter a valid phone number (7 to 15 digits).";
  if (!v.subject) e.subject = "Please choose a subject.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
}

function ContactSection() {
  const [vals, setVals] = useState(CONTACT_EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); /* idle | sending | ok | fail */
  const [note, setNote] = useState("");
  const busy = useRef(false);
  const lastSent = useRef("");
  const formRef = useRef(null);

  const set = (k) => (ev) => {
    setVals((p) => ({ ...p, [k]: ev.target.value }));
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
    if (status !== "sending") setStatus("idle");
  };
  const blur = (k) => () => setErrors((p) => ({ ...p, [k]: validateContact(vals)[k] }));

  const submit = async (ev) => {
    ev.preventDefault();
    if (busy.current) return; /* blocks double clicks */
    if (vals.website) return; /* honeypot: bots only */
    const errs = validateContact(vals);
    setErrors(errs);
    const bad = Object.keys(errs)[0];
    if (bad) { formRef.current?.querySelector(`[name="${bad}"]`)?.focus(); return; }

    const payload = {
      name: vals.name.trim(), email: vals.email.trim(), phone: vals.phone.trim(),
      subject: vals.subject, message: vals.message.trim(), source: "hr-hub",
    };
    const sig = JSON.stringify(payload);
    if (sig === lastSent.current) {
      setStatus("fail"); setNote("This enquiry was already sent. Change the details if you want to send another.");
      return;
    }
    if (!CONTACT_API_URL && !CONTACT_DEMO) {
      setStatus("fail"); setNote("The contact service is not connected yet, so your message was not sent. Please try again later.");
      return;
    }

    busy.current = true; setStatus("sending");
    if (CONTACT_DEMO) {
      /* DEMO ONLY: nothing is sent. Remove this block once the backend URL is configured. */
      console.warn("[HR Hub contact] DEMO mode: this message was NOT sent to any server.", payload);
      await new Promise((r) => setTimeout(r, 800));
      lastSent.current = sig;
      setVals(CONTACT_EMPTY); setErrors({}); setStatus("ok");
      busy.current = false;
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: sig, signal: ctrl.signal,
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      lastSent.current = sig;
      setVals(CONTACT_EMPTY); setErrors({}); setStatus("ok");
    } catch (err) {
      setStatus("fail");
      setNote(err && err.name === "AbortError"
        ? "The request timed out. Please try again."
        : "We could not send your message. Please check your connection and try again.");
    } finally {
      clearTimeout(timer); busy.current = false;
    }
  };

  const field = (k, label, props = {}) => (
    <div className={"hrx-f" + (errors[k] ? " bad" : "")}>
      <label htmlFor={"hrx-c-" + k}>{label} <i aria-hidden="true">*</i></label>
      {props.as === "textarea" ? (
        <textarea id={"hrx-c-" + k} name={k} rows={4} value={vals[k]} onChange={set(k)} onBlur={blur(k)}
          aria-invalid={!!errors[k]} aria-describedby={errors[k] ? "hrx-e-" + k : undefined} />
      ) : props.as === "select" ? (
        <select id={"hrx-c-" + k} name={k} value={vals[k]} onChange={set(k)} onBlur={blur(k)}
          aria-invalid={!!errors[k]} aria-describedby={errors[k] ? "hrx-e-" + k : undefined}>
          <option value="">Select a subject</option>
          {CONTACT_SUBJECTS.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
      ) : (
        <input id={"hrx-c-" + k} name={k} value={vals[k]} onChange={set(k)} onBlur={blur(k)}
          aria-invalid={!!errors[k]} aria-describedby={errors[k] ? "hrx-e-" + k : undefined} {...props} />
      )}
      {errors[k] && <span className="hrx-err" id={"hrx-e-" + k} role="alert">{errors[k]}</span>}
    </div>
  );

  return (
    <section className="hrx-ct" id="contact" aria-labelledby="hrx-ct-title">
      <div className="hrx-sec-head hrx-ct-grid">
        <div>
          <h2 id="hrx-ct-title">Contact us</h2>
          <p className="hrx-sec-sub">Tell us what you need and we will get back to you by email.</p>
          <ul className="hrx-ct-list">
            {CONTACT_SUBJECTS.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <form ref={formRef} className="hrx-ct-form" onSubmit={submit} noValidate>
          {field("name", "Full name", { type: "text", autoComplete: "name" })}
          <div className="hrx-f2">
            {field("email", "Email address", { type: "email", autoComplete: "email", inputMode: "email" })}
            {field("phone", "Phone number", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
          </div>
          {field("subject", "Subject", { as: "select" })}
          {field("message", "Message", { as: "textarea" })}
          <input className="hrx-hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
            value={vals.website} onChange={set("website")} />
          <button type="submit" className="hrx-b1" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "ok" && <p className="hrx-msg ok" role="status">Thank you. Your message has been sent and we will reply by email.</p>}
          {status === "fail" && <p className="hrx-msg no" role="alert">{note}</p>}
        </form>
      </div>
    </section>
  );
}

const img = (part) => IMGS.find((f) => f.k.includes(part))?.url || "";
const vid = (part) => VIDS.find((f) => f.k.includes(part))?.url || "";

/* ── Which file shows where ───────────────────────────────────────────── */
// Module 1..21 → image (unique part of the filename)
const MODULE_IMG = {
  1: "edmond-dantes", 2: "rock-staar", 3: "8wLZi9OhsWU", 4: "mizunokozuki", 5: "danilyuk-7654163",
  6: "danilyuk-8112158", 7: "mikhail-nilov", 8: "silverkblack", 9: "gustavo-fring", 10: "heiYgqp0Tsk",
  11: "tima-miroshnichenko", 12: "shkrabaanthony", 13: "carlos-muza", 14: "yankrukov", 15: "sora-shimazaki",
  16: "Kxo17w7BurY", 17: "SvYifX5HkeQ", 18: "TCZ12fCpFVw", 19: "campaign-creators", 20: "cottonbro",
  21: "radission-us",
};
// Domain cards
const DOMAIN_IMG = {
  ta: "edmond-dantes", ops: "5668839", rew: "danilyuk-7654163", dev: "silverkblack",
  exp: "Kxo17w7BurY", gov: "heiYgqp0Tsk", str: "carlos-muza", sal: "radission-us",
};
// Employee-lifecycle stages (9), cycled through the remaining photos
const LIFECYCLE_IMG = [
  "carlos-muza", "edmond-dantes", "gustavo-fring", "rock-staar", "5668839",
  "mikhail-nilov", "Kxo17w7BurY", "danilyuk-7654163", "cottonbro",
];
// Section banner images
const BANNER_IMG = {
  hero: "windows-WJPHT", journey: "werner-pfennig", classification: "mizunokozuki", templates: "tima-miroshnichenko",
  assessment: "silverkblack", analytics: "shkrabaanthony", demo: "yankrukov", about: "vitaly-gariev-TCZ12fCpFVw",
  "hr-sales": "redd-francisco",
};
// Section banner videos
const BANNER_VID = {
  welcome: "7647627", journey: "46285", "hr-sales": "273922", assessment: "8716579",
  analytics: "5439075", demo: "6325854", about: "7252825",
};
// Wide / tall clips used for module + demo slots (cycled so every video is used)
const VIDEO_CYCLE = ["46285", "273922", "8716579", "7647627", "5439075", "6325854", "7252825", "8558444"];

const resolveImg = (key) => {
  let m;
  if ((m = key.match(/^module-(\d+)$/))) return img(MODULE_IMG[+m[1]] || "");
  if ((m = key.match(/^domain-(\w+)$/))) return img(DOMAIN_IMG[m[1]] || "");
  if ((m = key.match(/^lifecycle-(\d+)$/))) return img(LIFECYCLE_IMG[(+m[1] - 1) % LIFECYCLE_IMG.length]);
  if (BANNER_IMG[key]) return img(BANNER_IMG[key]) || IMG_URLS[0] || "";
  return "";
};
const resolveVid = (key) => {
  if (BANNER_VID[key]) return vid(BANNER_VID[key]);
  let m;
  if ((m = key.match(/^module-(\d+)(?:-(?:walkthrough|demo))?$/))) {
    const n = +m[1];
    const off = key.endsWith("-walkthrough") ? 3 : key.endsWith("-demo") ? 5 : 0;
    return vid(VIDEO_CYCLE[(n + off) % VIDEO_CYCLE.length]);
  }
  if ((m = key.match(/^demo-(\d+)$/))) return vid(VIDEO_CYCLE[(+m[1] - 1) % VIDEO_CYCLE.length]);
  return "";
};

/* ── Small helpers for the hero intro ─────────────────────────────────── */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function Counter({ to, suffix = "", seen }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, t0;
    const tick = (t) => {
      t0 = t0 || t;
      const p = Math.min(1, (t - t0) / 1600);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <>{v}{suffix}</>;
}

function LazyVideo({ src, className = "", style }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); near.disconnect(); } }, { rootMargin: "300px" });
    near.observe(el);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.5 });
    io.observe(el);
    return () => { near.disconnect(); io.disconnect(); };
  }, [src]);
  if (!src) return <div className={className} style={{ background: "linear-gradient(135deg,#2e9b3e,#f97316)", ...style }} />;
  return (
    <video
      ref={ref}
      src={on ? `${src}#t=0.1` : undefined}
      muted loop playsInline preload="metadata"
      className={className}
      style={style}
      onLoadedData={(e) => {
        const v = e.currentTarget, r = v.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > window.innerHeight * 0.1) v.play().catch(() => {});
      }}
    />
  );
}

const STATS = [
  [21, "", "HR modules"],
  [24, "", "Week journey"],
  [100, "+", "Lessons"],
  [50, "+", "Templates"],
];

const CSS = `
.hrx-wow{position:relative;overflow:hidden;color:#fff;isolation:isolate;min-height:640px;display:flex;align-items:center}
.hrx-wow video,.hrx-wow .hrx-fallback{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-3;transform:scale(1.06);animation:hrxZoom 24s ease-in-out infinite alternate}
@keyframes hrxZoom{to{transform:scale(1.16)}}
.hrx-wow:after{content:"";position:absolute;inset:0;z-index:-2;background:
 radial-gradient(60% 80% at 15% 30%,rgba(249,115,22,.35),transparent 60%),
 radial-gradient(50% 70% at 90% 80%,rgba(46,155,62,.35),transparent 60%),
 linear-gradient(100deg,rgba(12,8,4,.93) 22%,rgba(12,8,4,.45))}
.hrx-in{max-width:1200px;margin:auto;padding:90px 24px 80px;width:100%;position:relative}
.hrx-pill{display:inline-flex;gap:8px;align-items:center;padding:8px 18px;border-radius:40px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(10px)}
.hrx-pill i{width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 0 rgba(74,222,128,.7);animation:hrxPing 1.8s infinite}
@keyframes hrxPing{70%{box-shadow:0 0 0 12px rgba(74,222,128,0)}}
.hrx-h1{font:700 clamp(40px,6.6vw,84px)/1.02 'Space Grotesk',Inter,sans-serif;letter-spacing:-2px;margin:22px 0 18px;max-width:880px}
.hrx-h1 span{background:linear-gradient(90deg,#fb923c,#4ade80,#fb923c);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:hrxShine 5s linear infinite}
@keyframes hrxShine{to{background-position:200% center}}
.hrx-sub{font-size:clamp(16px,1.7vw,21px);color:#e7dccf;max-width:640px}
.hrx-btns{display:flex;gap:14px;flex-wrap:wrap;margin-top:34px}
.hrx-b1,.hrx-b2{padding:15px 28px;border-radius:14px;font-weight:700;border:0;cursor:pointer;font-size:16px;transition:transform .25s,box-shadow .25s}
.hrx-b1{background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;box-shadow:0 10px 30px rgba(249,115,22,.5)}
.hrx-b2{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.4);backdrop-filter:blur(8px)}
.hrx-b1:hover,.hrx-b2:hover{transform:translateY(-3px) scale(1.03)}
.hrx-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:54px;max-width:760px}
.hrx-st{padding:16px 18px;border-radius:18px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(12px)}
.hrx-st b{display:block;font:700 34px 'Space Grotesk',sans-serif;color:#fdba74}
.hrx-st span{font-size:13px;color:#e7dccf}
.hrx-orb{position:absolute;border-radius:50%;filter:blur(2px);opacity:.55;animation:hrxFloat 9s ease-in-out infinite;z-index:-1}
@keyframes hrxFloat{50%{transform:translateY(-34px) translateX(14px)}}
.hrx-scroll{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);width:26px;height:42px;border:2px solid rgba(255,255,255,.6);border-radius:16px}
.hrx-scroll:after{content:"";position:absolute;left:50%;top:8px;width:4px;height:8px;margin-left:-2px;border-radius:3px;background:#fff;animation:hrxWheel 1.6s infinite}
@keyframes hrxWheel{to{transform:translateY(14px);opacity:0}}
.hrx-mq{background:#17110b;padding:20px 0;overflow:hidden;border-block:1px solid rgba(255,255,255,.08)}
.hrx-track{display:flex;gap:16px;width:max-content;animation:hrxMq 60s linear infinite}
.hrx-mq:hover .hrx-track{animation-play-state:paused}
@keyframes hrxMq{to{transform:translateX(-50%)}}
.hrx-track img{height:130px;width:200px;object-fit:cover;border-radius:16px;filter:saturate(1.1);transition:transform .35s,filter .35s}
.hrx-track img:hover{transform:scale(1.1) rotate(-1.5deg);filter:saturate(1.4)}
.hrx-reel{max-width:1200px;margin:0 auto;padding:70px 24px 10px}
.hrx-reel h2{font:700 clamp(28px,4vw,44px) 'Space Grotesk',sans-serif;letter-spacing:-1px;color:var(--tx,#0f172a)}
.hrx-reel p{color:var(--mu,#475569);margin:8px 0 26px;max-width:620px}
.hrx-vg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.hrx-vg figure{position:relative;border-radius:20px;overflow:hidden;box-shadow:0 18px 40px rgba(15,23,42,.18);transition:transform .35s;margin:0}
.hrx-vg figure:hover{transform:translateY(-8px) scale(1.02)}
.hrx-vg video,.hrx-vg .hrx-fb{display:block;width:100%;aspect-ratio:9/14;object-fit:cover}
.hrx-vg figure.w{grid-column:span 2}.hrx-vg figure.w video,.hrx-vg figure.w .hrx-fb{aspect-ratio:16/10}
.hrx-vg figcaption{position:absolute;inset:auto 0 0;padding:34px 16px 14px;font-weight:700;font-size:15px;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.8))}
.hrx-cta{position:relative;overflow:hidden;color:#fff;text-align:center;padding:90px 24px;isolation:isolate;margin-top:30px}
.hrx-cta img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.hrx-cta:before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(120deg,rgba(12,8,4,.88),rgba(20,60,28,.75))}
.hrx-cta h2{font:700 clamp(30px,4.6vw,54px)/1.08 'Space Grotesk',sans-serif;max-width:800px;margin:auto}
.hrx-cta p{margin:14px auto 28px;max-width:560px;color:#e7dccf}
.hrx-rv{opacity:0;transform:translateY(30px);transition:opacity .8s,transform .8s}.hrx-rv.in{opacity:1;transform:none}
@media(max-width:900px){.hrx-stats{grid-template-columns:repeat(2,1fr)}.hrx-vg{grid-template-columns:repeat(2,1fr)}.hrx-vg figure.w{grid-column:span 2}.hrx-wow{min-height:560px}}
@media(prefers-reduced-motion:reduce){.hrx-wow video,.hrx-wow .hrx-fallback,.hrx-track,.hrx-orb{animation:none}}
:root{--hrx-nav:68px}
.hrx-sn{position:sticky;top:var(--hrx-nav,68px);z-index:25;background:#2a2a2a;color:#fff;border-bottom:1px solid rgba(255,255,255,.06)}
.hrx-sn-in{max-width:1400px;margin:0 auto;display:flex;align-items:center;gap:4px;padding:6px 32px;overflow-x:auto;scrollbar-width:none;font:600 14px/1 Inter,system-ui,sans-serif}
.hrx-sn-in::-webkit-scrollbar{display:none}
.hrx-sn a{padding:8px 14px;border-radius:8px;white-space:nowrap;color:#fff;text-decoration:none;transition:background .2s,color .2s}
.hrx-sn a:hover{color:#f97316}
.hrx-sn a.on{background:#f97316;color:#fff}
.hrx-sn-ic{margin-left:auto;flex:none;min-width:34px;height:32px;border:1px solid #555;border-radius:8px;background:none;color:#fff;cursor:pointer}
.hrx-sn-ic:hover{border-color:#f97316}
.hrx-pill{background:rgba(255,255,255,.92);border:1.5px solid #2e9b3e;color:#2e9b3e;backdrop-filter:none;padding:7px 16px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.hrx-pill i{background:#2e9b3e}
.hrx-wow{min-height:0}
.hrx-in{padding:44px 24px 40px}
.hrx-h1{font-size:clamp(30px,4.6vw,54px);letter-spacing:-1.2px;margin:14px 0 12px;max-width:760px}
.hrx-sub{font-size:clamp(14px,1.3vw,17px);max-width:600px}
.hrx-btns{margin-top:20px;gap:10px}
.hrx-b1,.hrx-b2{padding:11px 20px;font-size:14px;border-radius:12px}
.hrx-stats{margin-top:26px;gap:10px;max-width:640px}
.hrx-st{padding:10px 14px;border-radius:14px}
.hrx-st b{font-size:24px}
.hrx-st span{font-size:12px}
.hrx-scroll{display:none}
.hrx-mq{padding:12px 0}
.hrx-track img{height:84px;width:130px;border-radius:12px}
.hrx-reel{padding:40px 24px 6px}
.hrx-reel h2{font-size:clamp(22px,3vw,32px)}
.hrx-reel p{margin:6px 0 18px}
.hrx-vg{gap:10px}
.hrx-cta{padding:52px 24px;margin-top:18px}
.hrx-cta h2{font-size:clamp(24px,3.2vw,38px)}
.hrx-cta p{margin:10px auto 20px}
@media(max-width:900px){.hrx-sn-in{padding:6px 14px}}
.hrx-wow video,.hrx-wow .hrx-fallback{animation:none;transform:none}
.hrx-orb{display:none}
.hrx-pill,.hrx-b2,.hrx-st{backdrop-filter:none;-webkit-backdrop-filter:none}
.hrx-mq{contain:content}
.hrx-track{animation-duration:80s;will-change:transform}
.hrx-track img{filter:none}
.hrx-vg figure{box-shadow:0 8px 20px rgba(15,23,42,.14)}
`;

export default function HRHub({ theme: themeProp, toggleTheme: toggleProp, scrollToSection }) {
  const [localTheme, setLocalTheme] = useState("light");
  const theme = themeProp ?? localTheme;
  const toggleTheme = toggleProp ?? (() => setLocalTheme((t) => (t === "dark" ? "light" : "dark")));

  const rootRef = useRef(null);
  const [statsRef, statsSeen] = useInView(0.3);
  const [reelRef, reelSeen] = useInView(0.12);

  /* Mount the complete HR Hub app (all sections / routes) */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    /* Always open at the top (hero): disable browser scroll restoration and scroll to top */
    const prevRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

   

       /* let the hero paint first, then mount the heavy learning app */
    let unmount;
    let cancelled = false;
    const start = () => { if (!cancelled) unmount = mountHRHub(root, { img: resolveImg, vid: resolveVid }); };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 600 })
      : setTimeout(start, 60);
    return () => {
      cancelled = true;
      if (window.requestIdleCallback) window.cancelIdleCallback(idle); else clearTimeout(idle);
      window.history.scrollRestoration = prevRestoration || "auto";
      if (typeof unmount === "function") unmount();
    };
  }, []);

  /* Keep the HR Hub dark/light theme in sync with the site theme */
  useEffect(() => {
    if (rootRef.current) rootRef.current.dataset.theme = theme === "dark" ? "dark" : "";
  }, [theme]);

  const heroVideo = vid("7647627") || VID_URLS[0];

  const reel = [
    ["46285", "Teams at work", true],
    ["5439075", "Interview room"],
    ["6325854", "Coaching moment"],
    ["273922", "Hiring conversations", true],
    ["7252825", "Team huddle"],
    ["8558444", "Policy review"],
    ["8716579", "Training sessions", true],
    ["7647627", "Learning spaces", true],
  ];

  /* Dev only: logs any image / video key that does not resolve */
  useEffect(() => {
    auditHubAssets({ resolveImg, resolveVid, reelKeys: reel.map((r) => r[0]), vid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} scrollToSection={scrollToSection}>
      <style>{CSS}</style>
      <div className="hrx-page" data-theme={theme === "dark" ? "dark" : "light"}>
        {/* Single sticky sub navbar (page sections + hub pages) */}
        <PageMapNav />

        {/* ── 1. HERO ── */}
        <PartHead id="hero" />
        <section className="hrx-wow">
          {heroVideo ? (
                       <video src={heroVideo} poster={img("windows-WJPHT") || undefined} autoPlay muted loop playsInline preload="auto" />
          ) : (
            <div className="hrx-fallback" style={{ background: "linear-gradient(135deg,#2e9b3e,#f97316)" }} />
          )}
          <span className="hrx-orb" style={{ width: 220, height: 220, right: "8%", top: "12%", background: "radial-gradient(circle at 30% 30%,#fdba74,#f97316 60%,transparent 70%)" }} />
          <span className="hrx-orb" style={{ width: 160, height: 160, right: "22%", bottom: "14%", animationDelay: "-3s", background: "radial-gradient(circle at 30% 30%,#86efac,#2e9b3e 60%,transparent 70%)" }} />
          <span className="hrx-orb" style={{ width: 90, height: 90, left: "46%", top: "16%", animationDelay: "-6s", background: "radial-gradient(circle at 30% 30%,#7dd3fc,#0ea5e9 60%,transparent 70%)" }} />

          <div className="hrx-in">
            <h1 className="hrx-h1">
              Learn HR from <span>first hire to final exit</span>
            </h1>
            <p className="hrx-sub">
              Lessons, workflows, templates, case studies, quizzes and Texora AI demos, all in one guided journey.
              Open it, click anything, and watch the whole HR world come alive.
            </p>
           

            <div className="hrx-stats" ref={statsRef}>
              {STATS.map(([n, s, l]) => (
                <div className="hrx-st" key={l}>
                  <b><Counter to={n} suffix={s} seen={statsSeen} /></b>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hrx-scroll" aria-hidden />
        </section>

        <PartFoot id="hero" />

        {/* ── 2. GLOBAL HR PRODUCTS ── */}
        <Part id="global"><GlobalHRProducts /></Part>

        {/* ── 3. HRMS DOMAINS ── */}
        <Part id="domains"><HRMSDomains /></Part>

        {/* ── 4. 21 MODULES ── */}
        <Part id="modules"><ModuleVision /></Part>

        {/* ── 5. THE COMPLETE HR HUB APP (engine mounts here) ── */}
        <Part id="learn">
          <div ref={rootRef} className="hrh" id="hr-hub-app" />
        </Part>

        {/* ── 6-9. DASHBOARDS, ONBOARDING, ATS GUIDE, ATS WORKBENCH ── */}
        <Part id="dashboards"><HubDashboards /></Part>

        <Part id="onboarding"><HRMSOnboarding /></Part>

        <Part id="ats"><ATSSection /></Part>

        <Part id="atslab"><ATSWorkbench /></Part>

        {/* ── 10. VIDEO REEL ── */}
        <PartHead id="videos" />
        <section className="hrx-reel" ref={reelRef} style={{ opacity: reelSeen ? 1 : 0, transition: "opacity .8s" }}>
          <h2>HR in action</h2>
          <p>Short scenario clips from the demo catalogue. They play as you scroll.</p>
          <div className="hrx-vg">
            {reel.map(([k, label, wide]) => (
              <figure key={k} className={wide ? "w" : ""}>
                {reelSeen ? <LazyVideo src={vid(k)} className="hrx-fb" /> : <div className="hrx-fb" style={{ background: "#17110b" }} />}
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <PartFoot id="videos" />

        {/* ── 11. CONTACT ── */}
        <Part id="contact"><ContactSection /></Part>

        {/* ── FINAL CTA ── */}
        <section className="hrx-cta">
          {img("windows-WJPHT") && <img src={img("windows-WJPHT")} alt="" loading="lazy" />}
          <h2>Ready to build your HR career?</h2>
          <p>Create a free account and start with Module 1 today.</p>
          <button className="hrx-b1" onClick={openSignupModal}>Get started</button>
        </section>
      </div>
    </PublicLayout>
  );
}