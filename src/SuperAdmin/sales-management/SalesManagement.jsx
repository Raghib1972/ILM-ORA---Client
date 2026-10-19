"use client";

// src/SuperAdmin/sales-management/SalesManagement.jsx
// Frontend-only Sales Management (all data in localStorage until the API is connected).
// Visual language copied from the Workspace page: Poppins, white sidebar, grey content area, soft-tone stat cards.
import React, { useState, useEffect, useRef } from "react";
import {
  LayoutGrid, Users, Inbox, Send, Megaphone, IndianRupee, Briefcase, Share2, Bot,
  Target, TrendingUp, CheckCircle2, Zap, BookOpen, Plus, Menu, X, Search, ArrowRight,
  Pencil, Trash2, GripVertical, ListChecks, History, Download, Upload, RotateCcw,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/* ───────── Data model ───────── */
const SRC = ["Website", "SEO", "Google Ads", "Meta Ads", "LinkedIn", "YouTube", "Webinar", "WhatsApp", "Chatbot", "Referral", "Partner", "Manual/CSV", "API"];
const INB = ["Website", "SEO", "Google Ads", "Meta Ads", "LinkedIn", "YouTube", "Webinar", "WhatsApp", "Chatbot", "Referral"];
const STG = ["New", "Contacted", "Qualified", "Demo/Counselling", "Proposal", "Negotiation", "Won", "Lost"];
const QUAL = ["Qualified", "Demo/Counselling", "Proposal", "Negotiation", "Won"];
const OWN = ["Neha", "Rohit", "Kabir", "Anita"];
const SEQ = ["Account Research", "Contact Discovery", "Personalization", "Outreach", "Follow-up", "Meeting", "Demo", "Proposal", "Deal"];
const SEG = ["Students", "Professionals", "Job seekers", "Career switchers", "Schools", "Colleges", "Universities", "Training institutes", "Corporates", "HR/L&D", "EdTech companies"];
const FUN = ["Lead", "Discovery", "Requirement", "Solution", "Proposal", "SOW", "Contract", "Implementation", "AMC/Support"];
const SVC = ["LMS implementation", "CRM implementation", "ERP implementation", "AI chatbot", "AI Tutor", "AI Agent development", "Multi-Agent systems", "RAG implementation", "WhatsApp AI", "Website/mobile development", "Data analytics", "AI automation", "Cloud/DevOps", "Managed application support"];
const NUM = ["n", "r", "L", "p", "R"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const RANGES = [["all", "All time"], ["month", "This month"], ["last", "Last month"], ["30d", "Last 30 days"]];

// col = [key, label, type, options]  type: s text · o select · d date · n number · r ₹k · L ₹ lakh · p % · R ₹
// n = singular name · f = filter column · ap = approval queue · lab = [active label, inactive label]
const E = {
  leads:     { n: "Lead", f: "stage", c: [["name", "Lead"], ["source", "Source", "o", SRC], ["campaign", "Campaign"], ["course", "Course"], ["owner", "Owner", "o", OWN], ["score", "AI score", "n"], ["stage", "Stage", "o", STG], ["next", "Next action"], ["rev", "Exp. revenue", "r"], ["prob", "Probability", "p"], ["created", "Created", "d"]] },
  campaigns: { n: "Channel", c: [["channel", "Channel"], ["leads", "Leads", "n"], ["spend", "Spend", "L"]] },
  accounts:  { n: "Account", f: "stage", c: [["account", "Account"], ["segment", "Segment", "o", SEG], ["contact", "Contact"], ["stage", "Sequence step", "o", SEQ], ["owner", "Owner", "o", OWN], ["last", "Last activity"]] },
  streams:   { n: "Stream", f: "type", c: [["name", "Revenue stream"], ["type", "Type", "o", ["B2C", "B2B", "SaaS", "Services", "Referral"]], ["amt", "This month", "L"], ["model", "Model"]] },
  trend:     { n: "Month", c: [["month", "Month"], ["amt", "Revenue", "L"]] },
  services:  { n: "Engagement", f: "stage", c: [["svc", "Service", "o", SVC], ["client", "Client"], ["stage", "Funnel stage", "o", FUN], ["val", "Value", "L"]] },
  referrals: { n: "Program", c: [["prog", "Program", "o", ["Student", "Alumni", "Mentor", "Partner"]], ["refr", "Referrers", "n"], ["refs", "Referrals", "n"], ["enr", "Enrolled", "n"], ["rev", "Revenue", "L"], ["com", "Commission", "L"]] },
  approvals: { n: "Request", ap: 1, c: [["text", "Action waiting for approval"], ["by", "Requested by"]] },
  agents:    { n: "Agent", c: [["name", "Agent"], ["role", "Responsibility"], ["tasks", "Tasks today", "n"], ["succ", "Success", "p"]] },
  autos:     { n: "Automation", f: "pri", c: [["name", "Automation"], ["pri", "Priority", "o", ["Priority 1", "Priority 2", "Priority 3"]], ["st", "Build stage", "o", ["Planned", "In build", "Live"]]] },
  tasks:     { n: "Task", f: "type", lab: ["Pending", "Done"], c: [["title", "Task"], ["lead", "Lead / account"], ["type", "Type", "o", ["Call", "Email", "WhatsApp", "Meeting"]], ["due", "Due date", "d"], ["owner", "Owner", "o", OWN]] },
  activity:  { n: "Activity", f: "type", c: [["lead", "Lead / account"], ["type", "Type", "o", ["Call", "Email", "WhatsApp", "Meeting", "Note"]], ["note", "Details"], ["date", "Date", "d"], ["by", "By", "o", OWN]] },
};
// A trailing 0 after the last column marks a row as inactive / done.
const SD = {
  leads: [
    ["Aarav Mehta", "Website", "AI Engineer Oct", "AI Engineer Program", "Neha", 86, "Qualified", "Book counselling", 85, 40, "2026-10-12"],
    ["Priya Nair", "WhatsApp", "Click-to-chat", "Data Analytics", "Rohit", 74, "Demo/Counselling", "Send proposal", 45, 55, "2026-10-08"],
    ["Sunrise Engg. College", "LinkedIn", "Campus AI Lab", "LMS SaaS", "Kabir", 91, "Proposal", "Share SOW draft", 1200, 60, "2026-09-24"],
    ["Rahul Verma", "Google Ads", "GenAI Search", "GenAI Bootcamp", "Neha", 58, "Contacted", "Follow-up call", 60, 20, "2026-10-15"],
    ["Sana Qureshi", "Referral", "Alumni Referral", "Python to ML", "Rohit", 80, "Negotiation", "Confirm discount", 38, 75, "2026-09-28"],
    ["Vikram Singh", "Meta Ads", "Career Switch", "Full-Stack Dev", "Anita", 42, "New", "Auto-assign", 70, 10, "2026-10-17"],
    ["Nova Tech HR", "Webinar", "L&D Webinar", "B2B Training", "Kabir", 77, "Qualified", "Discovery call", 850, 35, "2026-10-05"],
    ["Global Edu Group", "Partner", "Partner Programme", "AI Agent SaaS", "Kabir", 88, "Negotiation", "Pricing approval", 1800, 70, "2026-09-18"],
    ["Karan Shah", "SEO", "RAG guide", "RAG & Agents", "Neha", 63, "Contacted", "Send syllabus", 55, 25, "2026-10-16"],
    ["Arjun Pillai", "API", "Partner API", "Data Analytics", "Rohit", 95, "Won", "LMS onboarding", 45, 100, "2026-09-12"],
    ["Tanya Bose", "Meta Ads", "Career Switch", "Full-Stack Dev", "Anita", 30, "Lost", "Closed: budget", 70, 0, "2026-09-02"],
    ["Meera Joshi", "Webinar", "AI Career Webinar", "GenAI Bootcamp", "Anita", 68, "Qualified", "Book counselling", 60, 35, "2026-10-14"],
    ["Orbit Retail", "LinkedIn", "Retail Analytics", "Data Analytics", "Kabir", 72, "Contacted", "Intro call", 300, 20, "2026-10-13"],
    ["Dev Patel", "Chatbot", "Website Chatbot", "Full-Stack Dev", "Neha", 55, "New", "Auto-assign", 70, 10, "2026-10-18"],
  ],
  campaigns: [["SEO / Content", 1140, 0.9], ["Google Ads", 860, 6.4], ["Meta Ads", 720, 4.8], ["LinkedIn", 410, 3.1], ["YouTube", 520, 1.2], ["Webinars", 680, 1.5], ["Email", 490, 0.3]],
  accounts: [["Sunrise Engg. College", "Colleges", "Dr. Menon", "Proposal", "Kabir", "Call · 1d ago"], ["Nova Tech HR", "HR/L&D", "Ritu Jain", "Meeting", "Kabir", "Email · 2d ago"], ["Global Edu Group", "EdTech companies", "A. Khan", "Demo", "Kabir", "Meeting · 2d ago"], ["Bright Minds School", "Schools", "Mrs. Pillai", "Follow-up", "Rohit", "Opened proposal"], ["Apex University", "Universities", "Prof. Sethi", "Contact Discovery", "Neha", "LinkedIn viewed"], ["Finserve Corp", "Corporates", "P. Rao", "Account Research", "Rohit", "Added by agent"]],
  streams: [["B2C Course", "B2C", 18.2, "One-time course fee"], ["Subscription", "B2C", 6.8, "Monthly/annual learning plan"], ["Cohort", "B2C", 24.6, "Premium live cohort"], ["Certification", "B2C", 5.4, "Assessment + certificate"], ["Mentorship", "B2C", 3.1, "Paid mentor sessions"], ["B2B Training", "B2B", 12.8, "Corporate programs"], ["LMS SaaS", "SaaS", 6.9, "Institution subscription"], ["AI Agent SaaS", "SaaS", 3.7, "Agent usage/subscription"], ["CRM SaaS", "SaaS", 2.6, "Monthly/annual"], ["ERP SaaS", "SaaS", 1.4, "Module-based subscription"], ["Implementation", "Services", 14.2, "One-time project fee"], ["Consulting", "Services", 7.9, "Professional services"], ["Managed Services", "Services", 9.4, "Monthly retainer"], ["Referral", "Referral", 9.2, "Partner/alumni revenue share"]],
  trend: [["May", 82], ["Jun", 91], ["Jul", 98], ["Aug", 107], ["Sep", 116]],
  services: [["LMS implementation", "Sunrise Engg. College", "Proposal", 12], ["AI chatbot", "Bright Minds School", "Implementation", 6.5], ["CRM implementation", "Nova Tech HR", "SOW", 9], ["AI Agent development", "Global Edu Group", "Solution", 18], ["RAG implementation", "Finserve Corp", "Requirement", 7.5], ["WhatsApp AI", "Skillbridge Institute", "AMC/Support", 2.4], ["Managed application support", "Apex University", "AMC/Support", 3.2], ["Data analytics", "Orbit Retail", "Discovery", 5]],
  referrals: [["Student", 310, 98, 24, 3.1, 0.4], ["Alumni", 140, 71, 22, 3.6, 0.5], ["Mentor", 22, 16, 6, 0.9, 0.2], ["Partner", 18, 29, 9, 1.6, 0.3]],
  approvals: [["Send WhatsApp campaign to 2,400 contacts", "Marketing Agent · external communication"], ["Refund ₹18,000 for student #2041", "Support Agent · refund"], ["Edit invoice INV-1187 (GST correction)", "ERP Agent · financial record"]],
  agents: [["Marketing", "Content, campaigns, segmentation", 312, 93], ["Lead Generation", "Prospect discovery, lead creation", 540, 89], ["Inbound Sales", "Answer questions, qualify leads", 788, 92], ["Outbound Sales", "Personalised prospecting, follow-up", 430, 86], ["Admissions", "Course recommendations, enrollment", 221, 94], ["Cohort", "Batch communication, reminders", 365, 95], ["Learning", "Personalised tutoring, learning paths", 1204, 91], ["Assessment", "Tests, evaluation, skill gaps", 276, 90], ["Support", "Student and customer support", 642, 92], ["CRM", "Update records, next actions", 910, 96], ["ERP", "Orders, invoices, operations", 188, 97], ["Referral", "Referral opportunities", 74, 88], ["Management", "Executive summaries, KPI intelligence", 31, 98]],
  autos: [["Lead capture", "Priority 1", "Live"], ["CRM assignment", "Priority 1", "Live"], ["WhatsApp acknowledgement", "Priority 1", "Live"], ["Follow-up reminders", "Priority 1", "Live"], ["Demo scheduling", "Priority 1", "In build"], ["Lead scoring", "Priority 2", "Live"], ["Automated nurture", "Priority 2", "In build"], ["Payment reminders", "Priority 2", "Planned"], ["AI Sales Agent", "Priority 3", "In build"], ["AI Support Agent", "Priority 3", "Planned"], ["Multi-Agent workflows", "Priority 3", "Planned"]],
  tasks: [
    ["Call Aarav for counselling", "Aarav Mehta", "Call", "2026-10-18", "Neha"],
    ["Send proposal to Priya", "Priya Nair", "Email", "2026-10-19", "Rohit"],
    ["Share SOW draft", "Sunrise Engg. College", "Email", "2026-10-20", "Kabir"],
    ["Demo for Nova Tech HR", "Nova Tech HR", "Meeting", "2026-10-22", "Kabir"],
    ["Send syllabus on WhatsApp", "Karan Shah", "WhatsApp", "2026-10-17", "Neha"],
    ["Confirm alumni discount", "Sana Qureshi", "Call", "2026-10-18", "Rohit"],
    ["Pricing approval follow-up", "Global Edu Group", "Call", "2026-10-21", "Kabir"],
    ["Intro call with Orbit Retail", "Orbit Retail", "Call", "2026-10-23", "Kabir"],
    ["Send webinar recording", "Meera Joshi", "Email", "2026-10-19", "Anita"],
    ["Send brochure to Rahul", "Rahul Verma", "WhatsApp", "2026-10-16", "Neha", 0],
  ],
  activity: [
    ["Aarav Mehta", "Call", "Interested in AI Engineer Oct batch", "2026-10-16", "Neha"],
    ["Priya Nair", "WhatsApp", "Asked for fee and EMI details", "2026-10-15", "Rohit"],
    ["Sunrise Engg. College", "Meeting", "Reviewed LMS scope with principal", "2026-10-14", "Kabir"],
    ["Sana Qureshi", "Email", "Sent alumni discount offer", "2026-10-13", "Rohit"],
    ["Global Edu Group", "Note", "Pricing approval pending from finance", "2026-10-12", "Kabir"],
    ["Rahul Verma", "Call", "No answer, retry tomorrow", "2026-10-11", "Neha"],
    ["Nova Tech HR", "Meeting", "Discovery call done, needs CRM + training", "2026-10-10", "Kabir"],
    ["Karan Shah", "Email", "Shared RAG and Agents syllabus", "2026-10-09", "Neha"],
  ],
};
const seed = () => Object.fromEntries(Object.entries(SD).map(([e, rows]) => [e, rows.map((r, i) => ({ id: `${e}${i}`, on: r[E[e].c.length] !== 0, ...Object.fromEntries(E[e].c.map((c, j) => [c[0], r[j]])) }))]));
const KEY = "ilmora-sales-mgmt-v1";
const L = (v) => "₹" + Math.round(v * 10) / 10 + "L";
const N = (v) => Math.round(v).toLocaleString("en-IN");
const fmtDate = (v) => { if (!v) return ""; const [y, m, d] = String(v).split("-"); return m ? `${+d} ${MON[+m - 1]} ${y}` : String(v); };
const fmt = (t, v) => (v === undefined || v === null ? "" : t === "r" ? "₹" + v + "k" : t === "L" ? L(v) : t === "p" ? v + "%" : t === "R" ? "₹" + N(v) : t === "d" ? fmtDate(v) : v);
// built-in options + options added by the user for this entity/column
const mergeOpts = (opts, e, c) => [...new Set([...c[3], ...(opts[e + "." + c[0]] || [])])];
const pad2 = (n) => String(n).padStart(2, "0");
const rangeTest = (range, t) => {
  if (range === "all" || !t) return () => true;
  const [y, m, dd] = t.split("-").map(Number);
  if (range === "month") return (d) => String(d || "").slice(0, 7) === `${y}-${pad2(m)}`;
  if (range === "last") { const pm = m === 1 ? 12 : m - 1, py = m === 1 ? y - 1 : y; return (d) => String(d || "").slice(0, 7) === `${py}-${pad2(pm)}`; }
  const c = new Date(y, m - 1, dd - 30);
  const cs = `${c.getFullYear()}-${pad2(c.getMonth() + 1)}-${pad2(c.getDate())}`;
  return (d) => !!d && String(d) >= cs;
};
const csvParse = (t) => {
  const r = []; let c = [], s = "", q = false;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (q) { if (ch === '"') { if (t[i + 1] === '"') { s += '"'; i++; } else q = false; } else s += ch; }
    else if (ch === '"') q = true;
    else if (ch === ",") { c.push(s); s = ""; }
    else if (ch === "\n" || ch === "\r") { if (ch === "\r" && t[i + 1] === "\n") i++; c.push(s); s = ""; r.push(c); c = []; }
    else s += ch;
  }
  if (s || c.length) { c.push(s); r.push(c); }
  return r.filter((x) => x.some((y) => y.trim()));
};

const NAV = [
  { group: "Main", items: [["overview", "Overview", LayoutGrid], ["leads", "CRM Leads", Users], ["inbound", "Inbound", Inbox], ["outbound", "Outbound", Send], ["tasks", "Tasks", ListChecks], ["activity", "Activity", History]] },
  { group: "Manage", items: [["marketing", "Marketing", Megaphone], ["revenue", "Revenue", IndianRupee], ["services", "Services", Briefcase], ["referral", "Referral", Share2]] },
  { group: "Configuration", items: [["ai", "AI & Automation", Bot]] },
];
const PAGE = {
  overview: { t: "Sales Overview", s: "Track leads, campaigns, revenue and referrals across the whole sales funnel.", add: ["leads", "Add Lead"] },
  leads: { t: "CRM Leads", s: "Manage your pipeline from first contact to enrollment. Click a lead name for details.", add: ["leads", "Add Lead"] },
  inbound: { t: "Inbound Sales", s: "Leads that come to you: website, ads, webinars, WhatsApp and referrals.", add: ["leads", "Add Lead"] },
  outbound: { t: "Outbound Sales", s: "Target accounts and your outreach sequence.", add: ["accounts", "Add Account"] },
  tasks: { t: "Follow-up Tasks", s: "Calls, emails and meetings you need to do next.", add: ["tasks", "Add Task"] },
  activity: { t: "Activity Log", s: "Every call, email, meeting and note against a lead.", add: ["activity", "Add Activity"] },
  marketing: { t: "Marketing & Lead Generation", s: "Channels, spend and cost per lead.", add: ["campaigns", "Add Channel"] },
  revenue: { t: "Revenue", s: "Revenue streams across courses, SaaS, services and referrals.", add: ["streams", "Add Stream"] },
  services: { t: "EdTech AI Services", s: "Implementation, consulting and managed support.", add: ["services", "Add Engagement"] },
  referral: { t: "Referral Engine", s: "Student, alumni, mentor and partner programs.", add: ["referrals", "Add Program"] },
  ai: { t: "AI & Automation", s: "Agents, automations and the human approval queue.", add: ["autos", "Add Automation"] },
};
const FILL = { violet: "", indigo: "", emerald: "g", cyan: "b", amber: "a", red: "r" };
const stageTone = (s) => (s === "Won" ? "live" : s === "Lost" ? "muted" : s === "Proposal" || s === "Negotiation" ? "warn" : s === "New" || s === "Contacted" ? "info" : "");

/* ───────── Styles (scoped to .sm-shell) ───────── */
const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");
.sm-shell{--brand:#7c3aed;--brand-2:#a855f7;--brand-deep:#6d28d9;--live:#16a34a;--bg:#f1f5f9;--card:#fff;--text:#0f172a;--muted:#64748b;--border:#e2e8f0;
--r-lg:16px;--r-md:12px;--r-sm:8px;--sh:0 1px 6px rgba(0,0,0,.06);--sh-h:0 6px 24px rgba(0,0,0,.1);--sh-d:0 16px 40px rgba(0,0,0,.14);
--p-solid:#7c3aed;--p-soft:#ede9fe;--g-solid:#16a34a;--g-soft:#dcfce7;--a-solid:#f59e0b;--a-soft:#fef3c7;--x-solid:#ef4444;--x-soft:#fee2e2;--b-solid:#3b82f6;--b-soft:#dbeafe;
font-family:"Poppins",sans-serif;letter-spacing:.01em;color:var(--text);-webkit-font-smoothing:antialiased;
display:grid;grid-template-columns:200px minmax(0,1fr);width:100%;min-width:0;max-width:100%;position:relative}
.sm-shell.dark{--bg:#0a0a0a;--card:#111;--text:#f5f5f5;--muted:#a1a1aa;--border:rgba(255,255,255,.08);--p-soft:rgba(124,58,237,.18);--g-soft:rgba(22,163,74,.18);--a-soft:rgba(245,158,11,.18);--x-soft:rgba(239,68,68,.18);--b-soft:rgba(59,130,246,.18);--sh:0 1px 6px rgba(0,0,0,.5);--sh-h:0 6px 24px rgba(0,0,0,.65);--sh-d:0 16px 40px rgba(0,0,0,.7)}
.sm-shell *{box-sizing:border-box}
.sm-shell button,.sm-shell input,.sm-shell select{font-family:inherit;max-width:100%}

/* mobile menu toggle */
.sm-shell .sm-mtoggle{display:none;align-items:center;gap:8px;grid-column:1/-1;width:fit-content}
.sm-backdrop{display:none}

/* sidebar */
.sm-sidebar{background:var(--card);border-right:1px solid var(--border);padding:12px 10px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;min-width:0}
.sm-sidebar-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 4px 10px;font-size:13px;border-bottom:1px solid var(--border)}
.sm-sidebar-head span{display:flex;align-items:center;gap:8px}
.sm-iconbtn{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--muted);cursor:pointer;flex-shrink:0}
.sm-iconbtn:hover{background:rgba(124,58,237,.08);color:var(--brand-deep)}
.sm-close{display:none}
.sm-group{display:flex;flex-direction:column;gap:2px}
.sm-group-label{font-size:10px;letter-spacing:.08em;color:var(--muted);padding:8px 8px 4px;text-transform:uppercase}
.sm-item{display:flex;align-items:center;gap:8px;padding:7px 9px;border-radius:8px;border:none;background:transparent;color:var(--text);font-size:12.5px;cursor:pointer;width:100%;text-align:left}
.sm-item svg{flex-shrink:0;color:var(--muted)}
.sm-item:hover{background:rgba(124,58,237,.07)}
.sm-item.on{background:rgba(124,58,237,.12);color:var(--brand-deep)}
.sm-shell.dark .sm-item.on{color:#c4b5fd}
.sm-item.on svg{color:var(--brand)}
.sm-nb{margin-left:auto;font-style:normal;font-size:10px;line-height:1.4;background:var(--x-soft);color:var(--x-solid);border-radius:999px;padding:1px 7px}
.sm-sidebar.collapsed .sm-item span,.sm-sidebar.collapsed .sm-group-label,.sm-sidebar.collapsed .sm-sidebar-head span,.sm-sidebar.collapsed .sm-nb{display:none}

/* content + split layout */
.sm-content{min-width:0;max-width:100%;padding:14px 14px 40px;background:var(--bg)}
.sm-split{display:flex;align-items:flex-start;gap:0;min-width:0}
.sm-main{flex:1 1 0;min-width:0}
.sm-main>*+*{margin-top:12px}
.sm-main>.sm-head+*{margin-top:14px}

/* header */
.sm-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap}
.sm-head-title{min-width:0;flex:1 1 240px}
.sm-head h1{font-size:clamp(18px,1.7vw,22px);line-height:1.15;margin:0 0 4px;letter-spacing:-.02em}
.sm-head p{margin:0;font-size:12px;color:var(--muted)}
.sm-head-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;flex-shrink:0}
.sm-live,.sm-date,.sm-head-actions .sm-btn{height:30px;padding-top:0;padding-bottom:0}
.sm-head-actions .sm-in{margin-top:0;width:auto;height:30px;padding:0 10px}
.sm-live{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--live);background:var(--g-soft);padding:0 10px;border-radius:999px;white-space:nowrap}
.sm-live i{width:6px;height:6px;border-radius:999px;background:var(--live);box-shadow:0 0 0 3px rgba(22,163,74,.25)}
.sm-date{display:inline-flex;align-items:center;font-size:11.5px;color:var(--muted);background:var(--card);border:1px solid var(--border);padding:0 10px;border-radius:8px;white-space:nowrap}

/* buttons */
.sm-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border-radius:var(--r-sm);font-size:12.5px;line-height:1.2;cursor:pointer;white-space:nowrap;padding:8px 14px;border:1px solid var(--border);background:var(--card);color:var(--text);transition:background .15s ease}
.sm-btn:hover{background:rgba(124,58,237,.06)}
.sm-btn:disabled{opacity:.45;cursor:default}
.sm-btn.primary{background:var(--brand);border-color:transparent;color:#fff}
.sm-btn.primary:hover{background:var(--brand-deep)}
.sm-btn.danger{background:var(--x-soft);color:var(--x-solid);border-color:transparent}
.sm-btn.ok{background:var(--g-soft);color:var(--g-solid);border-color:transparent}
.sm-btn.solid{background:var(--x-solid);color:#fff;border-color:transparent}
.sm-btn.xs{padding:4px 8px;font-size:11.5px;border-radius:7px;height:26px}

/* stats */
.sm-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
.sm-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px;align-items:start}
.sm-stat{background:var(--card);border:1px solid var(--border);border-radius:var(--r-md);padding:12px 14px;display:flex;flex-direction:row;align-items:center;gap:12px;box-shadow:var(--sh);transition:box-shadow .15s ease,transform .15s ease;min-width:0;overflow:hidden}
.sm-stat[role=button]{cursor:pointer}
.sm-stat:hover{box-shadow:var(--sh-h);transform:translateY(-1px)}
.sm-stat-icon{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--p-soft);color:var(--p-solid);flex-shrink:0}
.sm-stat.live .sm-stat-icon{background:var(--g-soft);color:var(--g-solid)}
.sm-stat.accent .sm-stat-icon{background:var(--a-soft);color:var(--a-solid)}
.sm-stat.pink .sm-stat-icon{background:var(--x-soft);color:var(--x-solid)}
.sm-stat.info .sm-stat-icon{background:var(--b-soft);color:var(--b-solid)}
.sm-stat-body{min-width:0;display:flex;flex-direction:column;gap:1px}
.sm-stat-value{font-size:19px;letter-spacing:-.01em;line-height:1.2;white-space:nowrap}
.sm-stat-label{font-size:11.5px;color:var(--muted)}
.sm-stat-delta{font-size:10.5px;color:var(--g-solid)}

/* sections */
.sm-sec{background:var(--card);border:1px solid var(--border);border-radius:var(--r-md);padding:14px;box-shadow:var(--sh);min-width:0}
.sm-sec-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:10px;flex-wrap:wrap}
.sm-sec-head h2{font-size:14px;margin:0}
.sm-sec-head p{font-size:11px;color:var(--muted);margin:1px 0 0}
.sm-link{font-size:11.5px;color:var(--brand);background:none;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px}
.sm-badge{font-size:10px;padding:3px 8px;border-radius:999px;white-space:nowrap;background:var(--p-soft);color:var(--brand-deep);border:none;line-height:1.3}
.sm-shell.dark .sm-badge{color:#c4b5fd}
.sm-badge.info{background:var(--b-soft);color:#1d4ed8}.sm-badge.warn{background:var(--a-soft);color:#b45309}.sm-badge.live{background:var(--g-soft);color:#15803d}.sm-badge.muted{background:var(--bg);color:var(--muted)}
button.sm-badge{cursor:pointer}

/* rows, bars, charts */
.sm-row{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:0 10px 10px 0;border-left:3px solid var(--brand);margin-bottom:6px;background:rgba(124,58,237,.03);min-width:0}
.sm-avatar{width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;background:linear-gradient(135deg,var(--brand-2),var(--brand))}
.sm-row .t{font-size:12.5px}.sm-row .m{font-size:11px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sm-bar{display:grid;grid-template-columns:minmax(80px,120px) 1fr 56px;gap:8px;align-items:center;margin:6px 0;font-size:11.5px}
.sm-bar>span:first-child{color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sm-bar>em{font-style:normal;text-align:right}
.sm-bar-t{height:6px;border-radius:99px;background:var(--bg);overflow:hidden}
.sm-bar-f{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--brand-2),var(--brand));transition:width .6s}
.sm-bar-f.g{background:var(--g-solid)}.sm-bar-f.a{background:var(--a-solid)}.sm-bar-f.b{background:var(--b-solid)}.sm-bar-f.r{background:var(--x-solid)}
.sm-mini{display:flex;align-items:flex-end;gap:6px;height:56px}
.sm-mini div{flex:1;border-radius:4px 4px 0 0;background:linear-gradient(180deg,var(--brand-2),var(--brand));opacity:.85;min-height:3px}
.sm-mini-l{display:flex;justify-content:space-between;margin-top:6px}.sm-mini-l span{font-size:10px;color:var(--muted);flex:1;text-align:center}

/* flow chips (numbered, equal width) */
.sm-flow{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px}
.sm-chip{display:flex;align-items:center;gap:10px;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:8px 10px;min-width:0}
.sm-chip-n{width:22px;height:22px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10.5px;background:var(--p-soft);color:var(--brand-deep)}
.sm-chip-t{display:flex;flex-direction:column;gap:1px;min-width:0}
.sm-chip-l{font-size:11.5px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sm-chip-t b{font-size:15px;line-height:1.2;color:var(--brand)}

.sm-stages{display:grid;grid-auto-flow:column;grid-auto-columns:minmax(104px,1fr);gap:8px;overflow-x:auto;padding-bottom:4px}
.sm-stage{text-align:left;cursor:pointer;background:var(--bg);border:2px solid transparent;border-radius:10px;padding:8px 10px;color:var(--muted);font-size:11px;line-height:1.35}
.sm-stage b{display:block;font-size:16px;color:var(--text)}
.sm-stage.on{border-color:var(--brand)}

/* tools + table */
.sm-tools{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;align-items:center}
.sm-tools .sm-sp{flex:1}
.sm-search{display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:0 10px;height:32px;flex:1;min-width:160px;max-width:300px}
.sm-search input{border:none;outline:none;background:transparent;font-size:12.5px;width:100%;color:var(--text)}
.sm-search svg{color:var(--muted);flex-shrink:0}
.sm-in{width:100%;margin-top:4px;background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:8px;padding:7px 10px;font-size:12.5px;outline:none}
.sm-in:focus{border-color:var(--brand);box-shadow:0 0 0 3px rgba(124,58,237,.15)}
.sm-tools .sm-in{margin-top:0;width:auto;height:32px;padding:0 10px}
.sm-tw{overflow-x:auto;border:1px solid var(--border);border-radius:10px}
.sm-table{width:100%;border-collapse:collapse}
.sm-table th{text-align:left;padding:8px 10px;font-size:10.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid var(--border);white-space:nowrap;background:rgba(124,58,237,.04)}
.sm-table th.sort{cursor:pointer;user-select:none}
.sm-table th.sort:hover{color:var(--brand)}
.sm-table td{padding:7px 10px;font-size:12px;color:var(--muted);border-bottom:1px solid var(--border);white-space:nowrap;vertical-align:middle;height:38px}
.sm-table th.num,.sm-table td.num{text-align:right}
.sm-table th.act,.sm-table td.act{text-align:right;width:1%}
.sm-table td:first-child{color:var(--text)}
.sm-table td.late{color:var(--x-solid)}
.sm-table tbody tr:last-child td{border-bottom:none}
.sm-table tbody tr:hover{background:rgba(124,58,237,.03)}
.sm-table tr.sel{background:rgba(124,58,237,.09)}
.sm-table tr.off td{opacity:.5}.sm-table tr.off td.keep{opacity:1}
.sm-name{background:none;border:none;padding:0;color:var(--text);cursor:pointer;text-align:left;font-size:inherit}
.sm-name:hover{color:var(--brand);text-decoration:underline}
.sm-acts{display:flex;gap:5px;justify-content:flex-end;align-items:center}
.sm-conf{font-size:11px;color:var(--x-solid);margin-right:2px}
.sm-empty{text-align:center;padding:22px 12px;color:var(--muted);font-size:12.5px}
.sm-pager{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:10px;font-size:11.5px;color:var(--muted);flex-wrap:wrap}
.sm-pager div{display:flex;gap:6px;align-items:center}

/* right-side panel (form + detail) */
.sm-panel{position:sticky;top:10px;flex-shrink:0;margin-left:14px;background:var(--card);border:1px solid var(--border);border-radius:var(--r-md);box-shadow:var(--sh-h);display:flex;flex-direction:column;max-height:calc(100vh - 20px);overflow:visible;z-index:5}
.sm-resizer{position:absolute;left:-11px;top:0;bottom:0;width:12px;cursor:col-resize;display:flex;align-items:center;justify-content:center;touch-action:none;z-index:6}
.sm-resizer::before{content:"";width:4px;height:44px;border-radius:99px;background:var(--border);transition:background .15s}
.sm-resizer:hover::before,.sm-resizer.drag::before{background:var(--brand)}
.sm-panel-head{display:flex;align-items:center;gap:8px;padding:10px 12px;color:#fff;background:linear-gradient(135deg,var(--brand),var(--brand-2));border-radius:var(--r-md) var(--r-md) 0 0}
.sm-panel-head h3{margin:0;font-size:13.5px;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sm-panel-head .sm-grip{opacity:.7;flex-shrink:0}
.sm-panel-head button{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:7px;border:none;background:rgba(255,255,255,.2);color:#fff;cursor:pointer}
.sm-panel-head button:hover{background:rgba(255,255,255,.32)}
.sm-panel-body{padding:12px;overflow-y:auto;flex:1;min-height:0}
.sm-fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.sm-fgrid label,.sm-fl{display:block;font-size:11px;color:var(--muted);min-width:0}
.sm-fgrid label.full{grid-column:1/-1}
.sm-panel-foot{display:flex;gap:8px;padding:10px 12px;border-top:1px solid var(--border)}
.sm-panel-foot .sm-btn{flex:1}

/* dropdown + add-option button */
.sm-sel{display:flex;gap:6px;align-items:center;margin-top:4px}
.sm-sel .sm-in{margin-top:0;flex:1;min-width:0}
.sm-plus{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;flex-shrink:0;border-radius:8px;border:1px solid var(--border);background:var(--p-soft);color:var(--brand-deep);cursor:pointer}
.sm-plus:hover{background:var(--brand);color:#fff}
.sm-addopt{display:flex;gap:6px;align-items:center;margin-top:6px}
.sm-addopt .sm-in{margin-top:0;flex:1;min-width:0}

/* lead detail */
.sm-sub{font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin:16px 0 8px;display:flex;justify-content:space-between;align-items:center;gap:8px}
.sm-kv{display:grid;grid-template-columns:104px 1fr;gap:6px 10px;font-size:12px;margin:0}
.sm-kv dt{color:var(--muted)}
.sm-kv dd{margin:0;min-width:0;overflow-wrap:anywhere}
.sm-li{display:flex;gap:8px;align-items:flex-start;padding:7px 9px;border:1px solid var(--border);border-radius:8px;margin-bottom:6px;font-size:12px}
.sm-li .grow{flex:1;min-width:0}
.sm-li .meta{font-size:10.5px;color:var(--muted);margin-top:2px}
.sm-li.late .meta{color:var(--x-solid)}

.sm-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:900;background:var(--text);color:var(--card);padding:8px 16px;border-radius:999px;font-size:12.5px;box-shadow:var(--sh-d)}

@media (max-width:1280px){.sm-shell{grid-template-columns:188px minmax(0,1fr)}}
@media (max-width:1024px){.sm-shell{grid-template-columns:176px minmax(0,1fr)}}
@media (max-width:860px){
.sm-shell{grid-template-columns:minmax(0,1fr);grid-template-rows:auto 1fr}
.sm-shell .sm-mtoggle{display:inline-flex}
.sm-sidebar{position:fixed;top:0;left:0;bottom:0;width:260px;max-width:84vw;z-index:220;transform:translateX(-100%);transition:transform .22s ease;box-shadow:var(--sh-d)}
.sm-sidebar.open{transform:translateX(0)}
.sm-close{display:inline-flex}
.sm-backdrop{display:block;position:fixed;inset:0;background:rgba(20,16,31,.45);z-index:210}
.sm-content{grid-column:1;grid-row:2}
.sm-panel{position:fixed;top:0;right:0;bottom:0;margin:0;width:min(100%,420px) !important;max-height:none;border-radius:0;z-index:300}
.sm-panel-head{border-radius:0}
.sm-resizer{display:none}
}
@media (max-width:480px){.sm-content{padding:12px 12px 40px}}

/* no bold anywhere */
.sm-shell,.sm-shell *{font-weight:400 !important}
`;

/* ───────── UI pieces ───────── */
const Stat = ({ label, value, sub, tone = "", icon: Icon, onClick }) => (
  <div className={`sm-stat ${tone}`} onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? (ev) => ev.key === "Enter" && onClick() : undefined}>
    <div className="sm-stat-icon"><Icon size={16} /></div>
    <div className="sm-stat-body">
      <div className="sm-stat-value">{value}</div>
      <div className="sm-stat-label">{label}</div>
      {sub && <div className="sm-stat-delta">{sub}</div>}
    </div>
  </div>
);
const Sec = ({ title, sub, right, children }) => (
  <section className="sm-sec">
    {(title || right) && (
      <div className="sm-sec-head">
        <div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>
        {right}
      </div>
    )}
    {children}
  </section>
);
const Bars = ({ rows, color = "violet" }) => {
  if (!rows.length) return <div className="sm-empty">No data yet. Add a record to see this chart.</div>;
  const m = Math.max(1, ...rows.map((r) => r[1]));
  return rows.map((r, i) => (
    <div className="sm-bar" key={i}>
      <span>{r[0]}</span>
      <div className="sm-bar-t"><div className={`sm-bar-f ${FILL[color]}`} style={{ width: `${(r[1] / m) * 100}%` }} /></div>
      <em>{r[2] ?? r[1]}</em>
    </div>
  ));
};
const Flow = ({ steps }) => (
  <div className="sm-flow">
    {steps.map((s, i) => {
      const hasVal = Array.isArray(s);
      return (
        <div className="sm-chip" key={i}>
          <span className="sm-chip-n">{i + 1}</span>
          <div className="sm-chip-t">
            <span className="sm-chip-l" title={hasVal ? s[0] : s}>{hasVal ? s[0] : s}</span>
            {hasVal && <b>{s[1]}</b>}
          </div>
        </div>
      );
    })}
  </div>
);

/* ───────── Right-side panel shell (drag the left edge to resize) ───────── */
const useResize = (width, onResize) => {
  const [drag, setDrag] = useState(false);
  const start = (ev) => {
    ev.preventDefault();
    const sx = ev.clientX, sw = width;
    setDrag(true);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    const mv = (x) => onResize(Math.min(640, Math.max(300, sw + (sx - x.clientX))));
    const up = () => {
      setDrag(false);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      window.removeEventListener("pointermove", mv);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", mv);
    window.addEventListener("pointerup", up);
  };
  return [drag, start];
};
const Shell = ({ title, width, onResize, onClose, foot, children }) => {
  const [drag, start] = useResize(width, onResize);
  return (
    <aside className="sm-panel" style={{ width }}>
      <div className={`sm-resizer${drag ? " drag" : ""}`} onPointerDown={start} title="Drag to resize" />
      <div className="sm-panel-head">
        <GripVertical size={14} className="sm-grip" />
        <h3>{title}</h3>
        <button type="button" onClick={onClose} aria-label="Close panel"><X size={14} /></button>
      </div>
      <div className="sm-panel-body">{children}</div>
      {foot && <div className="sm-panel-foot">{foot}</div>}
    </aside>
  );
};

/* ───────── Add / Edit form ───────── */
const FormPanel = ({ panel, width, onResize, setDb, say, onClose, opts, addOpt, todayISO, names }) => {
  const { e, rec, preset = {} } = panel;
  const m = E[e];
  const [v, setV] = useState(() => Object.fromEntries(m.c.map((c) => {
    const def = c[2] === "o" ? c[3][0] : c[2] === "d" ? todayISO : "";
    return [c[0], rec ? (rec[c[0]] ?? def) : preset[c[0]] !== undefined ? preset[c[0]] : def];
  })));
  const [adding, setAdding] = useState(null);
  const [nv, setNv] = useState("");

  const doAdd = (c) => {
    const val = nv.trim();
    if (!val) return say("Type an option name");
    if (mergeOpts(opts, e, c).some((o) => o.toLowerCase() === val.toLowerCase())) return say("Already exists");
    addOpt(e, c[0], val);
    setV((p) => ({ ...p, [c[0]]: val }));
    setAdding(null);
    setNv("");
    say("Option added");
  };

  const save = () => {
    const o = {};
    for (const c of m.c) { const x = v[c[0]]; o[c[0]] = NUM.includes(c[2]) ? parseFloat(x) || 0 : String(x ?? "").trim(); }
    if (!String(o[m.c[0][0]]).trim()) return say("Please enter " + m.c[0][1].toLowerCase());
    setDb((d) => ({ ...d, [e]: rec ? d[e].map((r) => (r.id === rec.id ? { ...r, ...o } : r)) : [{ id: e + Date.now(), on: true, ...o }, ...d[e]] }));
    onClose(); say("Saved");
  };

  return (
    <Shell
      title={`${rec ? "Edit" : "Add"} ${m.n}`}
      width={width}
      onResize={onResize}
      onClose={onClose}
      foot={<><button className="sm-btn" onClick={onClose}>Cancel</button><button className="sm-btn primary" onClick={save}>Save</button></>}
    >
      <div className="sm-fgrid">
        {m.c.map((c, i) => (
          <label key={c[0]} className={i === 0 ? "full" : ""}>
            {c[1]}
            {c[2] === "o" ? (
              <>
                <div className="sm-sel">
                  <select className="sm-in" value={v[c[0]]} onChange={(ev) => setV({ ...v, [c[0]]: ev.target.value })}>
                    {mergeOpts(opts, e, c).map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <button type="button" className="sm-plus" title={`Add new ${c[1].toLowerCase()}`} onClick={(ev) => { ev.preventDefault(); setAdding(adding === c[0] ? null : c[0]); setNv(""); }}><Plus size={14} /></button>
                </div>
                {adding === c[0] && (
                  <div className="sm-addopt">
                    <input className="sm-in" autoFocus placeholder={`New ${c[1].toLowerCase()}…`} value={nv} onChange={(ev) => setNv(ev.target.value)} onKeyDown={(ev) => { if (ev.key === "Enter") { ev.preventDefault(); doAdd(c); } }} />
                    <button type="button" className="sm-btn primary xs" onClick={(ev) => { ev.preventDefault(); doAdd(c); }}>Add</button>
                  </div>
                )}
              </>
            ) : (
              <input
                className="sm-in"
                type={NUM.includes(c[2]) ? "number" : c[2] === "d" ? "date" : "text"}
                step="any"
                list={c[0] === "lead" ? "sm-names" : undefined}
                value={v[c[0]] ?? ""}
                onChange={(ev) => setV({ ...v, [c[0]]: ev.target.value })}
              />
            )}
          </label>
        ))}
      </div>
      <datalist id="sm-names">{names.map((n) => <option key={n} value={n} />)}</datalist>
    </Shell>
  );
};

/* ───────── Lead / account detail ───────── */
const DetailPanel = ({ panel, width, onResize, db, setDb, say, onClose, openForm, opts, todayISO }) => {
  const { e } = panel;
  const m = E[e];
  const r = db[e].find((x) => x.id === panel.rec.id);
  if (!r) return null;
  const name = r[m.c[0][0]];
  const tasks = db.tasks.filter((t) => t.lead === name);
  const acts = db.activity.filter((a) => a.lead === name).sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const sc = m.c.find((c) => c[0] === "stage");

  const setStage = (val) => {
    if (val === r.stage) return;
    setDb((d) => ({
      ...d,
      [e]: d[e].map((x) => (x.id === r.id ? { ...x, stage: val } : x)),
      activity: [{ id: "activity" + Date.now(), on: true, lead: name, type: "Note", note: "Stage changed to " + val, date: todayISO, by: r.owner || OWN[0] }, ...d.activity],
    }));
    say("Stage updated");
  };
  const toggleTask = (id) => setDb((d) => ({ ...d, tasks: d.tasks.map((t) => (t.id === id ? { ...t, on: !t.on } : t)) }));

  return (
    <Shell
      title={name}
      width={width}
      onResize={onResize}
      onClose={onClose}
      foot={<><button className="sm-btn" onClick={onClose}>Close</button><button className="sm-btn primary" onClick={() => openForm(e, r)}><Pencil size={13} /> Edit</button></>}
    >
      {sc && (
        <label className="sm-fl">
          {sc[1]}
          <select className="sm-in" value={r.stage} onChange={(ev) => setStage(ev.target.value)}>
            {mergeOpts(opts, e, sc).map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
      )}
      <div className="sm-sub"><span>Details</span></div>
      <dl className="sm-kv">
        {m.c.slice(1).filter((c) => c[0] !== "stage").map((c) => {
          const val = fmt(c[2], r[c[0]]);
          return <React.Fragment key={c[0]}><dt>{c[1]}</dt><dd>{val === "" || val == null ? "—" : val}</dd></React.Fragment>;
        })}
        <dt>Status</dt><dd>{r.on ? "Active" : "Inactive"}</dd>
      </dl>

      <div className="sm-sub">
        <span>Tasks ({tasks.length})</span>
        <button className="sm-btn xs" onClick={() => openForm("tasks", null, { lead: name })}><Plus size={12} /> Task</button>
      </div>
      {tasks.length ? tasks.map((t) => (
        <div key={t.id} className={`sm-li${t.on && todayISO && t.due < todayISO ? " late" : ""}`}>
          <div className="grow"><div>{t.title}</div><div className="meta">{t.type} · due {fmtDate(t.due)} · {t.owner}</div></div>
          <button className={`sm-badge ${t.on ? "warn" : "live"}`} onClick={() => toggleTask(t.id)} title="Click to switch">{t.on ? "Pending" : "Done"}</button>
        </div>
      )) : <div className="sm-empty">No tasks yet.</div>}

      <div className="sm-sub">
        <span>Activity ({acts.length})</span>
        <button className="sm-btn xs" onClick={() => openForm("activity", null, { lead: name })}><Plus size={12} /> Activity</button>
      </div>
      {acts.length ? acts.map((a) => (
        <div key={a.id} className="sm-li">
          <span className="sm-badge info">{a.type}</span>
          <div className="grow"><div>{a.note}</div><div className="meta">{fmtDate(a.date)} · {a.by}</div></div>
        </div>
      )) : <div className="sm-empty">No activity yet.</div>}
    </Shell>
  );
};

/* ───────── Generic CRUD table ───────── */
const Crud = ({ e, title, db, setDb, say, openForm, openView, editingId, pre, sub, opts, todayISO }) => {
  const m = E[e];
  const canView = e === "leads" || e === "accounts";
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const [del, setDel] = useState(null);
  const [sk, setSk] = useState(null);
  const [sa, setSa] = useState(true);
  const [pg, setPg] = useState(1);
  const fileRef = useRef(null);
  const fc = m.c.find((c) => c[0] === m.f);
  const isNum = (c) => NUM.includes(c[2]);
  const patch = (fn) => setDb((d) => ({ ...d, [e]: fn(d[e]) }));
  const all = db[e].filter((r) => (!pre || pre(r)) && (f === "All" || r[m.f] === f) && m.c.map((c) => r[c[0]]).join(" ").toLowerCase().includes(q.toLowerCase()));
  const sorted = sk ? [...all].sort((a, b) => {
    const c = m.c.find((x) => x[0] === sk), x = a[sk], y = b[sk];
    const r = isNum(c) ? (+x || 0) - (+y || 0) : String(x ?? "").localeCompare(String(y ?? ""));
    return sa ? r : -r;
  }) : all;
  const pages = Math.max(1, Math.ceil(sorted.length / 10));
  const p = Math.min(pg, pages);
  const rows = sorted.slice((p - 1) * 10, p * 10);
  const sortBy = (k) => { if (sk === k) setSa(!sa); else { setSk(k); setSa(true); } };

  const exportCsv = () => {
    const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [m.c.map((c) => esc(c[1])).join(","), ...sorted.map((r) => m.c.map((c) => esc(r[c[0]])).join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = e + ".csv";
    a.click();
    say("Exported " + sorted.length + " rows");
  };
  const importCsv = (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    const rd = new FileReader();
    rd.onload = () => {
      const [h, ...d] = csvParse(String(rd.result));
      if (!h) return say("File is empty");
      const idx = m.c.map((c) => h.findIndex((x) => x.trim().toLowerCase() === c[1].toLowerCase()));
      const add = d.map((r, i) => ({ id: e + Date.now() + i, on: true, ...Object.fromEntries(m.c.map((c, j) => { const val = idx[j] >= 0 ? r[idx[j]] ?? "" : ""; return [c[0], isNum(c) ? parseFloat(val) || 0 : val.trim()]; })) })).filter((r) => String(r[m.c[0][0]]).trim());
      if (!add.length) return say("No valid rows found (check column names)");
      patch((a) => [...add, ...a]);
      say(add.length + " rows imported");
    };
    rd.readAsText(file);
    ev.target.value = "";
  };

  return (
    <Sec title={`${title} (${all.length})`} sub={sub} right={<button className="sm-btn primary xs" onClick={() => openForm(e, null)}><Plus size={13} /> Add {m.n}</button>}>
      <div className="sm-tools">
        <label className="sm-search"><Search size={14} /><input value={q} onChange={(ev) => { setQ(ev.target.value); setPg(1); }} placeholder="Search…" /></label>
        {fc && (
          <select className="sm-in" value={f} onChange={(ev) => { setF(ev.target.value); setPg(1); }}>
            {["All", ...(fc[3] ? mergeOpts(opts, e, fc) : [...new Set(db[e].map((r) => r[m.f]))])].map((o) => <option key={o}>{o}</option>)}
          </select>
        )}
        <span className="sm-sp" />
        {!m.ap && (
          <>
            <button className="sm-btn xs" onClick={exportCsv}><Download size={12} /> Export CSV</button>
            <button className="sm-btn xs" onClick={() => fileRef.current && fileRef.current.click()}><Upload size={12} /> Import CSV</button>
            <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={importCsv} />
          </>
        )}
      </div>
      {rows.length ? (
        <>
          <div className="sm-tw">
            <table className="sm-table">
              <thead>
                <tr>
                  {m.c.map((c) => <th key={c[0]} className={`sort${isNum(c) ? " num" : ""}`} onClick={() => sortBy(c[0])}>{c[1]}{sk === c[0] ? (sa ? " ▲" : " ▼") : ""}</th>)}
                  {!m.ap && <th>Status</th>}
                  <th className="act">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className={`${r.on ? "" : "off"}${editingId === r.id ? " sel" : ""}`}>
                    {m.c.map((c, ci) => {
                      const late = e === "tasks" && c[2] === "d" && r.on && todayISO && r[c[0]] && r[c[0]] < todayISO;
                      return (
                        <td key={c[0]} className={`${isNum(c) ? "num" : ""}${late ? " late" : ""}`}>
                          {c[0] === "stage" && e === "leads" ? (
                            <span className={`sm-badge ${stageTone(r.stage)}`}>{r.stage}</span>
                          ) : ci === 0 && canView ? (
                            <button className="sm-name" title="Open details" onClick={() => openView(e, r)}>{r[c[0]]}</button>
                          ) : fmt(c[2], r[c[0]])}
                        </td>
                      );
                    })}
                    {!m.ap && (
                      <td className="keep">
                        <button className={`sm-badge ${r.on ? "live" : "muted"}`} title="Click to switch" onClick={() => { patch((a) => a.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x))); say(r.on ? "Marked " + (m.lab ? m.lab[1].toLowerCase() : "inactive") : "Marked " + (m.lab ? m.lab[0].toLowerCase() : "active")); }}>{m.lab ? m.lab[r.on ? 0 : 1] : r.on ? "Active" : "Inactive"}</button>
                      </td>
                    )}
                    <td className="keep act">
                      <div className="sm-acts">
                        {del === r.id ? (
                          <>
                            <span className="sm-conf">Delete?</span>
                            <button className="sm-btn solid xs" onClick={() => { patch((a) => a.filter((x) => x.id !== r.id)); setDel(null); say("Deleted"); }}>Yes</button>
                            <button className="sm-btn xs" onClick={() => setDel(null)}>No</button>
                          </>
                        ) : (
                          <>
                            {m.ap ? (
                              <>
                                <button className="sm-btn ok xs" onClick={() => { patch((a) => a.filter((x) => x.id !== r.id)); say("Approved"); }}>Approve</button>
                                <button className="sm-btn xs" onClick={() => { patch((a) => a.filter((x) => x.id !== r.id)); say("Rejected"); }}>Reject</button>
                              </>
                            ) : (
                              <button className="sm-btn xs" onClick={() => openForm(e, r)}><Pencil size={12} /> Edit</button>
                            )}
                            <button className="sm-btn danger xs" onClick={() => setDel(r.id)}><Trash2 size={12} /> Delete</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sorted.length > 10 && (
            <div className="sm-pager">
              <span>Showing {(p - 1) * 10 + 1}–{Math.min(p * 10, sorted.length)} of {sorted.length}</span>
              <div>
                <button className="sm-btn xs" disabled={p <= 1} onClick={() => setPg(p - 1)}>Prev</button>
                <span>Page {p} / {pages}</span>
                <button className="sm-btn xs" disabled={p >= pages} onClick={() => setPg(p + 1)}>Next</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="sm-empty">Nothing here. Change the search, period or add a {m.n.toLowerCase()}.</div>
      )}
    </Sec>
  );
};

/* ───────── Page ───────── */
const SalesManagement = ({ initialTab = "overview" }) => {
  const { dark } = useTheme();
  const [tab, setTab] = useState(initialTab);
  const [db, setDb] = useState(seed);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState("");
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [panel, setPanel] = useState(null); // { mode: "form" | "view", e, rec, preset, k }
  const [pw, setPw] = useState(380);
  const [today, setToday] = useState("");
  const [todayISO, setTodayISO] = useState("");
  const [opts, setOpts] = useState({}); // user-added dropdown options: { "leads.source": ["Custom"] }
  const [range, setRange] = useState("all");
  const [rs, setRs] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setDb({ ...seed(), ...JSON.parse(s) }); } catch {}
    try { const o = localStorage.getItem(KEY + "-opts"); if (o) setOpts(JSON.parse(o)); } catch {}
    setReady(true);
    const d = new Date();
    setToday(d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric", year: "numeric" }));
    setTodayISO(d.toLocaleDateString("en-CA"));
  }, []);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {} }, [db, ready]);
  useEffect(() => { if (ready) try { localStorage.setItem(KEY + "-opts", JSON.stringify(opts)); } catch {} }, [opts, ready]);
  useEffect(() => { if (!toast) return; const h = setTimeout(() => setToast(""), 1800); return () => clearTimeout(h); }, [toast]);
  useEffect(() => { if (!rs) return; const h = setTimeout(() => setRs(false), 3000); return () => clearTimeout(h); }, [rs]);
  useEffect(() => {
    if (!panel) return;
    const h = (ev) => ev.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [panel]);

  const say = setToast;
  const addOpt = (e, k, val) => setOpts((p) => ({ ...p, [e + "." + k]: [...(p[e + "." + k] || []), val] }));
  const openForm = (e, rec, preset) => setPanel({ mode: "form", e, rec, preset, k: Date.now() });
  const openView = (e, rec) => setPanel({ mode: "view", e, rec, k: Date.now() });
  const closePanel = () => setPanel(null);
  const nav = (k) => { setTab(k); setOpen(false); setPanel(null); };
  const resetDemo = () => {
    if (!rs) return setRs(true);
    setDb(seed()); setOpts({}); setPanel(null); setStage(""); setRange("all"); setRs(false);
    say("Demo data restored");
  };

  // period filter applies to leads (created), tasks (due) and activity (date)
  const inR = rangeTest(range, todayISO);
  const dbv = { ...db, leads: db.leads.filter((r) => inR(r.created)), tasks: db.tasks.filter((r) => inR(r.due)), activity: db.activity.filter((r) => inR(r.date)) };
  const act = (e) => dbv[e].filter((r) => r.on);
  const cnt = (e, f = () => true) => act(e).filter(f).length;
  const sum = (e, k, f = () => true) => act(e).filter(f).reduce((a, r) => a + (+r[k] || 0), 0);
  const avg = (e, k) => { const a = act(e); return a.length ? Math.round(a.reduce((s, r) => s + (+r[k] || 0), 0) / a.length) : 0; };
  const by = (e, k, keys) => keys.map((x) => [x, cnt(e, (r) => r[k] === x)]).filter((x) => x[1]);
  const editingId = panel && panel.rec ? panel.rec.id : null;
  const C = { db: dbv, setDb, say, openForm, openView, opts, todayISO, editingId };
  const go = (k) => () => nav(k);
  const allStg = [...STG, ...(opts["leads.stage"] || [])];
  const isLate = (r) => !!todayISO && !!r.due && r.due < todayISO;

  const leads = act("leads"), nL = Math.max(1, leads.length);
  const totalLeads = sum("campaigns", "leads");
  const won = cnt("leads", (r) => r.stage === "Won");
  const lost = cnt("leads", (r) => r.stage === "Lost");
  const open_ = leads.filter((r) => r.stage !== "Won" && r.stage !== "Lost");
  const weighted = open_.reduce((a, r) => a + ((+r.rev || 0) * (+r.prob || 0)) / 100, 0) / 100; // ₹k → ₹L
  const mql = totalLeads * (leads.filter((r) => r.score >= 55).length / nL);
  const sql = totalLeads * (leads.filter((r) => QUAL.includes(r.stage)).length / nL);
  const total = sum("streams", "amt");
  const pending = db.approvals.length;
  const live = cnt("autos", (r) => r.st === "Live"), nA = Math.max(1, cnt("autos"));
  const inbound = leads.filter((r) => INB.includes(r.source));
  const inbWon = inbound.filter((r) => r.stage === "Won").length;
  const overdueAll = db.tasks.filter((r) => r.on && isLate(r)).length;
  const badges = { tasks: overdueAll, ai: pending };
  const names = [...new Set([...db.leads.map((r) => r.name), ...db.accounts.map((r) => r.account)])];

  let body = null;
  if (tab === "overview") {
    const trend = act("trend");
    const d = [...trend.map((r) => +r.amt || 0), Math.round(total)];
    const lab = [...trend.map((r) => r.month), "Now"];
    const mx = Math.max(...d, 1);
    body = (
      <>
        <div className="sm-stats">
          <Stat icon={Users} label="Total Leads" value={N(totalLeads)} sub={`${leads.length} in CRM`} onClick={go("leads")} />
          <Stat icon={Target} tone="info" label="MQL / SQL" value={`${N(mql)} / ${N(sql)}`} sub="Qualified pipeline" onClick={go("inbound")} />
          <Stat icon={TrendingUp} tone="live" label="Conversion" value={(won / nL * 100).toFixed(1) + "%"} sub={`${won} won deal(s)`} onClick={go("leads")} />
          <Stat icon={IndianRupee} tone="live" label="Monthly Revenue" value={L(total)} sub="Active streams only" onClick={go("revenue")} />
          <Stat icon={CheckCircle2} tone="accent" label="Pending Approvals" value={pending} sub="Awaiting review" onClick={go("ai")} />
          <Stat icon={Megaphone} tone="pink" label="Cost per Lead" value={"₹" + N(sum("campaigns", "spend") * 1e5 / Math.max(1, totalLeads))} sub="Spend ÷ leads" onClick={go("marketing")} />
          <Stat icon={Share2} label="Referral Revenue" value={L(sum("referrals", "rev"))} sub={`${sum("referrals", "enr")} enrolled`} onClick={go("referral")} />
          <Stat icon={Zap} tone="info" label="Automation Rate" value={Math.round(live / nA * 100) + "%"} sub={`${live} live automations`} onClick={go("ai")} />
          <Stat icon={Briefcase} tone="accent" label="Weighted Pipeline" value={L(weighted)} sub={`${open_.length} open leads`} onClick={go("leads")} />
          <Stat icon={ListChecks} tone="pink" label="Open Tasks" value={cnt("tasks")} sub={`${cnt("tasks", isLate)} overdue`} onClick={go("tasks")} />
        </div>
        <div className="sm-two">
          <Sec title="Revenue" sub="Monthly earnings (₹ lakh). Edit history on the Revenue page" right={<span className="sm-badge live">{L(total)} this month</span>}>
            <div className="sm-mini">{d.map((x, i) => <div key={i} title={`${lab[i]}: ${L(x)}`} style={{ height: `${(x / mx) * 100}%` }} />)}</div>
            <div className="sm-mini-l">{lab.map((m, i) => <span key={i}>{m}</span>)}</div>
          </Sec>
          <Sec title="Leads by stage" sub="Active CRM records"><Bars rows={by("leads", "stage", allStg)} /></Sec>
        </div>
        <div className="sm-two">
          <Sec title="Recent leads" right={<button className="sm-link" onClick={go("leads")}>View all <ArrowRight size={13} /></button>}>
            {dbv.leads.slice(0, 5).map((r) => (
              <div className="sm-row" key={r.id}>
                <div className="sm-avatar">{(r.name || "?")[0]}</div>
                <div style={{ flex: 1, minWidth: 0 }}><div className="t">{r.name}</div><div className="m">{r.course} · {r.source}</div></div>
                <span className={`sm-badge ${stageTone(r.stage)}`}>{r.stage}</span>
              </div>
            ))}
            {!dbv.leads.length && <div className="sm-empty">No leads in this period.</div>}
          </Sec>
          <Sec title="Top revenue streams" sub="₹ lakh per month"><Bars color="emerald" rows={[...act("streams")].sort((a, b) => b.amt - a.amt).slice(0, 6).map((x) => [x.name, x.amt, L(x.amt)])} /></Sec>
        </div>
      </>
    );
  } else if (tab === "leads") {
    body = (
      <>
        <div className="sm-stats">
          <Stat icon={Users} label="Leads in CRM" value={leads.length} sub={`${open_.length} open`} />
          <Stat icon={CheckCircle2} tone="live" label="Won" value={won} />
          <Stat icon={X} tone="pink" label="Lost" value={lost} />
          <Stat icon={TrendingUp} tone="info" label="Win rate" value={(won + lost ? (won / (won + lost)) * 100 : 0).toFixed(0) + "%"} sub="Won ÷ (won + lost)" />
        </div>
        <Sec title="Pipeline by stage" sub="Click a stage to filter the table">
          <div className="sm-stages">
            {allStg.map((s) => (
              <button key={s} className={`sm-stage ${stage === s ? "on" : ""}`} onClick={() => setStage(stage === s ? "" : s)}>
                {s}<b>{cnt("leads", (r) => r.stage === s)}</b>{L(sum("leads", "rev", (r) => r.stage === s) / 100)} expected
              </button>
            ))}
          </div>
        </Sec>
        <Crud e="leads" title="Leads" pre={(r) => !stage || r.stage === stage} {...C} />
      </>
    );
  } else if (tab === "inbound") {
    body = (
      <>
        <div className="sm-stats">
          <Stat icon={Users} label="Inbound leads" value={inbound.length} />
          <Stat icon={Target} tone="info" label="MQL" value={inbound.filter((r) => r.score >= 55).length} />
          <Stat icon={TrendingUp} tone="accent" label="Demo bookings" value={inbound.filter((r) => r.stage === "Demo/Counselling").length} />
          <Stat icon={CheckCircle2} tone="live" label="Enrollment" value={inbWon} sub={(inbWon / Math.max(1, inbound.length) * 100).toFixed(1) + "% conversion"} />
        </div>
        <div className="sm-two">
          <Sec title="Inbound lead sources"><Bars rows={by("leads", "source", INB)} /></Sec>
          <Sec title="Automated flow" sub="Inbound Sales Agent"><Flow steps={["Visitor", "AI Chat", "Lead Capture", "Qualification", "CRM", "Lead Score", "Assignment", "Demo", "Follow-up", "Enrollment"]} /></Sec>
        </div>
        <Crud e="leads" title="Inbound leads" pre={(r) => INB.includes(r.source)} {...C} />
      </>
    );
  } else if (tab === "outbound") {
    body = (
      <>
        <div className="sm-two">
          <Sec title="ICP segments"><Bars color="indigo" rows={by("accounts", "segment", SEG)} /></Sec>
          <Sec title="Outbound sequence"><Flow steps={SEQ.map((s) => [s, cnt("accounts", (r) => r.stage === s)])} /></Sec>
        </div>
        <Crud e="accounts" title="Target accounts" {...C} />
      </>
    );
  } else if (tab === "tasks") {
    body = (
      <>
        <div className="sm-stats">
          <Stat icon={ListChecks} tone="accent" label="Pending tasks" value={cnt("tasks")} />
          <Stat icon={Zap} tone="pink" label="Overdue" value={cnt("tasks", isLate)} />
          <Stat icon={Target} tone="info" label="Due today" value={cnt("tasks", (r) => !!todayISO && r.due === todayISO)} />
          <Stat icon={CheckCircle2} tone="live" label="Done" value={dbv.tasks.length - cnt("tasks")} sub="Marked done" />
        </div>
        <Crud e="tasks" title="Follow-up tasks" sub="Pending = active, Done = inactive. Overdue dates show in red" {...C} />
      </>
    );
  } else if (tab === "activity") {
    body = (
      <>
        <div className="sm-stats">
          <Stat icon={History} label="Total activities" value={dbv.activity.length} />
          <Stat icon={Users} tone="info" label="Calls" value={dbv.activity.filter((r) => r.type === "Call").length} />
          <Stat icon={Briefcase} tone="accent" label="Meetings" value={dbv.activity.filter((r) => r.type === "Meeting").length} />
          <Stat icon={BookOpen} tone="live" label="Notes" value={dbv.activity.filter((r) => r.type === "Note").length} />
        </div>
        <Crud e="activity" title="Activity timeline" {...C} />
      </>
    );
  } else if (tab === "marketing") {
    body = (
      <>
        <Crud e="campaigns" title="Marketing channels" {...C} />
        <div className="sm-two">
          <Sec title="Lead sources (from CRM)"><Bars color="cyan" rows={by("leads", "source", SRC)} /></Sec>
          <Sec title="Cost per lead" sub="Spend ÷ leads"><Bars color="amber" rows={act("campaigns").map((c) => [c.channel, Math.round(c.leads ? c.spend * 1e5 / c.leads : 0), "₹" + N(c.leads ? c.spend * 1e5 / c.leads : 0)])} /></Sec>
        </div>
      </>
    );
  } else if (tab === "revenue") {
    body = (
      <>
        <div className="sm-stats">
          <Stat icon={IndianRupee} tone="live" label="Total revenue" value={L(total)} sub="Active streams" />
          {["B2C", "B2B", "SaaS"].map((k, i) => <Stat key={k} icon={TrendingUp} tone={["", "info", "accent"][i]} label={k} value={L(sum("streams", "amt", (r) => r.type === k))} />)}
        </div>
        <Sec title="Revenue by stream" sub="Only active streams count"><Bars color="emerald" rows={act("streams").map((x) => [x.name, x.amt, L(x.amt)])} /></Sec>
        <Crud e="streams" title="Revenue streams" {...C} />
        <Crud e="trend" title="Revenue history" sub="Past months shown in the Overview chart (₹ lakh)" {...C} />
      </>
    );
  } else if (tab === "services") {
    body = (
      <>
        <div className="sm-stats">
          <Stat icon={IndianRupee} label="Service pipeline" value={L(sum("services", "val"))} />
          <Stat icon={BookOpen} tone="info" label="Engagements" value={cnt("services")} />
          <Stat icon={Zap} tone="accent" label="In implementation" value={cnt("services", (r) => r.stage === "Implementation")} />
          <Stat icon={CheckCircle2} tone="live" label="AMC / support" value={cnt("services", (r) => r.stage === "AMC/Support")} />
        </div>
        <Sec title="Service sales funnel"><Flow steps={FUN.map((s) => [s, cnt("services", (r) => r.stage === s)])} /></Sec>
        <Crud e="services" title="Service engagements" {...C} />
      </>
    );
  } else if (tab === "referral") {
    body = (
      <>
        <Sec title="Referral to commission"><Flow steps={[["Referral", sum("referrals", "refs")], ["Lead", Math.round(sum("referrals", "refs") * 0.8)], ["Enrollment", sum("referrals", "enr")], ["Revenue", L(sum("referrals", "rev"))], ["Commission", L(sum("referrals", "com"))]]} /></Sec>
        <Crud e="referrals" title="Referral programs" {...C} />
      </>
    );
  } else {
    body = (
      <>
        <div className="sm-stats">
          <Stat icon={Zap} tone="info" label="Live automations" value={live} />
          <Stat icon={CheckCircle2} tone="accent" label="Pending approvals" value={pending} />
          <Stat icon={Bot} label="Agent success" value={avg("agents", "succ") + "%"} sub={`${cnt("agents")} agents active`} />
        </div>
        <Crud e="approvals" title="Human approval queue" sub="External communications, refunds, financial changes and high-impact decisions need a person" {...C} />
        <Crud e="agents" title="AI agents" {...C} />
        <Crud e="autos" title="Automations" {...C} />
      </>
    );
  }

  const P = PAGE[tab];
  return (
    <div className={`sm-shell${dark ? " dark" : ""}`}>
      <style>{CSS}</style>
      <button type="button" className="sm-btn sm-mtoggle" onClick={() => setOpen(true)} aria-label="Open navigation menu"><Menu size={18} /> Menu</button>
      <aside className={`sm-sidebar${open ? " open" : ""}${collapsed ? " collapsed" : ""}`}>
        <div className="sm-sidebar-head">
          <span><LayoutGrid size={15} color="var(--brand)" /> Sales</span>
          <button type="button" className="sm-iconbtn" onClick={() => setCollapsed((p) => !p)} aria-label="Collapse navigation menu"><Menu size={14} /></button>
          <button type="button" className="sm-iconbtn sm-close" onClick={() => setOpen(false)} aria-label="Close navigation menu"><X size={14} /></button>
        </div>
        {NAV.map((g) => (
          <div className="sm-group" key={g.group}>
            <div className="sm-group-label">{g.group}</div>
            {g.items.map(([k, label, Icon]) => (
              <button key={k} type="button" className={`sm-item${tab === k ? " on" : ""}`} onClick={() => nav(k)} title={label}>
                <Icon size={15} /><span>{label}</span>{badges[k] ? <em className="sm-nb">{badges[k]}</em> : null}
              </button>
            ))}
          </div>
        ))}
      </aside>
      {open && <div className="sm-backdrop" onMouseDown={() => setOpen(false)} aria-hidden="true" />}
      <div className="sm-content">
        <div className="sm-split">
          <div className="sm-main">
            <div className="sm-head">
              <div className="sm-head-title"><h1>{P.t}</h1><p>{P.s}</p></div>
              <div className="sm-head-actions">
                <span className="sm-live"><i /> Live</span>
                <select className="sm-in" value={range} onChange={(ev) => setRange(ev.target.value)} title="Period filter (leads, tasks, activity)">
                  {RANGES.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
                {today && <span className="sm-date">{today}</span>}
                <button className="sm-btn" onClick={resetDemo} title="Restore the original dummy data"><RotateCcw size={13} /> {rs ? "Click again to confirm" : "Reset demo data"}</button>
                <button className="sm-btn primary" onClick={() => openForm(P.add[0], null)}><Plus size={14} /> {P.add[1]}</button>
              </div>
            </div>
            <React.Fragment key={tab}>{body}</React.Fragment>
          </div>
          {panel && panel.mode === "form" && (
            <FormPanel key={panel.k} panel={panel} width={pw} onResize={setPw} setDb={setDb} say={say} opts={opts} addOpt={addOpt} todayISO={todayISO} names={names} onClose={closePanel} />
          )}
          {panel && panel.mode === "view" && (
            <DetailPanel key={panel.k} panel={panel} width={pw} onResize={setPw} db={db} setDb={setDb} say={say} openForm={openForm} opts={opts} todayISO={todayISO} onClose={closePanel} />
          )}
        </div>
      </div>
      {toast && <div className="sm-toast">{toast}</div>}
    </div>
  );
};

export default SalesManagement;