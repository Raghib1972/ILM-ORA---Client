"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@/lib/routerCompat";

// Same shared shell (AnnouncementBanner, Navbar, Footer) used by StudyAbroad, Careers, About etc.
import PublicLayout from "../Landing/components/PublicLayout";

/* ---------- DATA (from MicroSoft.xlsx) ---------- */
const LEVELS = {
  "Fundamental": { color: "#16a34a", blurb: "Start here. Learn the basics of Azure, AI, data and GitHub. No experience needed." },
  "Associate": { color: "#ea580c", blurb: "Do real job tasks as an administrator, developer, analyst or engineer." },
  "Expert": { color: "#2563eb", blurb: "Design and lead big solutions. Made for people with 2+ years of experience." },
  "Specialty": { color: "#9333ea", blurb: "Go deep on one workload such as SAP on Azure, Virtual Desktop or Cosmos DB." },
  "Applied Skills": { color: "#0d9488", blurb: "Free hands-on lab tests that prove you can do one specific task." },
};
const STEP_LABELS = ["Step 1", "Step 2", "Step 3", "Add-on", "Free labs"];

const CERTS = [
  ["Microsoft Azure Fundamentals", "AZ-900", "Fundamental", "Cloud Computing", 99, "45 min", "Lifetime", "Student, Fresher, Cloud Beginner", "No experience needed", "No prerequisites", ["Azure", "Cloud", "Compute", "Storage", "Networking"], "https://learn.microsoft.com/credentials/certifications/azure-fundamentals/"],
  ["Microsoft Azure AI Fundamentals", "AI-900", "Fundamental", "AI", 99, "45 min", "Lifetime", "AI Beginner", "No experience needed", "No prerequisites", ["Azure AI", "ML", "NLP", "Computer Vision"], "https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/"],
  ["Microsoft Azure Data Fundamentals", "DP-900", "Fundamental", "Data", 99, "45 min", "Lifetime", "Data Beginner", "No experience needed", "No prerequisites", ["SQL", "Azure SQL", "Cosmos DB", "Data Analytics"], "https://learn.microsoft.com/credentials/certifications/azure-data-fundamentals/"],
  ["Microsoft Azure Administrator Associate", "AZ-104", "Associate", "Cloud Computing", 165, "100 min", "1 yr", "Azure Administrator, Cloud Administrator", "6–12 Months Azure Experience", "Azure Fundamentals Recommended", ["Azure VM", "Storage", "VNet", "IAM", "Monitor"], "https://learn.microsoft.com/credentials/certifications/azure-administrator/"],
  ["Microsoft Azure Developer Associate", "AZ-204", "Associate", "Cloud Computing", 165, "100 min", "1 yr", "Azure Developer", "1–2 Years Development", "Programming Knowledge", ["App Service", "Functions", "Storage", "Cosmos DB", "APIs"], "https://learn.microsoft.com/credentials/certifications/azure-developer/"],
  ["Microsoft Azure Network Engineer Associate", "AZ-700", "Associate", "Networking", 165, "100 min", "1 yr", "Network Engineer", "1–2 Years Networking", "Azure Fundamentals", ["VNet", "VPN", "ExpressRoute", "DNS", "Load Balancer"], "https://learn.microsoft.com/credentials/certifications/azure-network-engineer-associate/"],
  ["Microsoft Azure Security Engineer Associate", "AZ-500", "Associate", "Security", 165, "100 min", "1 yr", "Security Engineer", "1–2 Years Azure Security", "Azure Administration Knowledge", ["Microsoft Defender", "Entra ID", "Key Vault", "Sentinel"], "https://learn.microsoft.com/credentials/certifications/azure-security-engineer/"],
  ["Windows Server Hybrid Administrator Associate", "AZ-800", "Associate", "Windows Server", 165, "100 min", "1 yr", "Windows Administrator", "1–2 Years Windows Server", "Windows Server Basics", ["Windows Server", "Azure Arc", "Active Directory"], "https://learn.microsoft.com/credentials/certifications/windows-server-hybrid-administrator/"],
  ["Configuring Windows Server Hybrid Advanced Services", "AZ-801", "Associate", "Windows Server", 165, "100 min", "1 yr", "Hybrid Administrator", "1–2 Years Windows Server", "AZ-800 Recommended", ["Windows Server", "Azure", "AD DS"], "https://learn.microsoft.com/credentials/certifications/exams/az-801/"],
  ["Azure AI Engineer Associate", "AI-102", "Associate", "AI", 165, "100 min", "1 yr", "AI Engineer", "1 Year AI Experience", "AI-900 Recommended", ["Azure AI", "Cognitive Services", "OpenAI"], "https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/"],
  ["Azure Data Engineer Associate", "DP-203", "Associate", "Data", 165, "100 min", "1 yr", "Data Engineer", "1–2 Years Data Engineering", "Data Fundamentals", ["Azure Synapse", "Data Factory", "SQL"], "https://learn.microsoft.com/credentials/certifications/azure-data-engineer/"],
  ["Azure Database Administrator Associate", "DP-300", "Associate", "Data", 165, "100 min", "1 yr", "Database Administrator", "1–2 Years DBA Experience", "SQL Knowledge", ["Azure SQL", "SQL Server"], "https://learn.microsoft.com/credentials/certifications/azure-database-administrator-associate/"],
  ["Azure Data Scientist Associate", "DP-100", "Associate", "AI", 165, "100 min", "1 yr", "Data Scientist", "1–2 Years ML Experience", "Python & ML Basics", ["Azure ML", "Python", "AI"], "https://learn.microsoft.com/credentials/certifications/azure-data-scientist/"],
  ["Identity and Access Administrator Associate", "SC-300", "Associate", "Security", 165, "100 min", "1 yr", "IAM Engineer", "1 Year Identity Management", "Identity Basics", ["Microsoft Entra ID", "MFA", "Conditional Access"], "https://learn.microsoft.com/credentials/certifications/identity-and-access-administrator/"],
  ["Security Operations Analyst Associate", "SC-200", "Associate", "Security", 165, "100 min", "1 yr", "SOC Analyst", "1 Year SOC Experience", "Security Fundamentals", ["Microsoft Sentinel", "Defender XDR"], "https://learn.microsoft.com/credentials/certifications/security-operations-analyst/"],
  ["Microsoft 365 Administrator", "MS-102", "Associate", "Microsoft 365", 165, "100 min", "1 yr", "Microsoft 365 Administrator", "1–2 Years Microsoft 365", "Microsoft 365 Basics", ["Exchange Online", "Teams", "SharePoint"], "https://learn.microsoft.com/credentials/certifications/m365-administrator-expert/"],
  ["Endpoint Administrator Associate", "MD-102", "Associate", "Endpoint Management", 165, "100 min", "1 yr", "Endpoint Administrator", "1 Year Endpoint Management", "Windows Basics", ["Intune", "Windows", "Autopilot"], "https://learn.microsoft.com/credentials/certifications/modern-desktop/"],
  ["Power Platform App Maker Associate", "PL-100", "Associate", "Power Platform", 165, "100 min", "1 yr", "App Maker", "6–12 Months Experience", "PL-900 Recommended", ["Power Apps", "Dataverse"], "https://learn.microsoft.com/credentials/certifications/power-platform-app-maker/"],
  ["Microsoft Power Platform Functional Consultant Associate", "PL-200", "Associate", "Power Platform", 165, "100 min", "1 yr", "Functional Consultant", "1 Year Power Platform", "PL-900 Recommended", ["Power Apps", "Power Automate", "Dataverse", "Power BI"], "https://learn.microsoft.com/credentials/certifications/power-platform-functional-consultant-associate/"],
  ["Microsoft Power BI Data Analyst Associate", "PL-300", "Associate", "Power Platform", 165, "100 min", "1 yr", "Data Analyst", "6–12 Months Power BI", "Data Fundamentals Recommended", ["Power BI", "DAX", "Power Query", "Excel"], "https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst-associate/"],
  ["Microsoft Power Platform Developer Associate", "PL-400", "Associate", "Power Platform", 165, "100 min", "1 yr", "Power Platform Developer", "1–2 Years Development", "PL-900 Recommended", ["Power Apps", "Dataverse", "Power Automate", "Azure"], "https://learn.microsoft.com/credentials/certifications/power-platform-developer-associate/"],
  ["Dynamics 365 Customer Service Functional Consultant Associate", "MB-230", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "CRM Functional Consultant", "1 Year CRM Experience", "Dynamics 365 Basics", ["Dynamics 365 Customer Service"], "https://learn.microsoft.com/credentials/certifications/d365-customer-service-functional-consultant-associate/"],
  ["Dynamics 365 Field Service Functional Consultant Associate", "MB-240", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "Field Service Consultant", "1 Year Field Service", "Dynamics 365 Basics", ["Dynamics 365 Field Service"], "https://learn.microsoft.com/credentials/certifications/d365-field-service-functional-consultant-associate/"],
  ["Dynamics 365 Customer Data Platform Specialist Associate", "MB-260", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "CDP Specialist", "1 Year Customer Insights", "Data Fundamentals", ["Dynamics 365 Customer Insights"], "https://learn.microsoft.com/credentials/certifications/exams/mb-260/"],
  ["Dynamics 365 Supply Chain Management Functional Consultant Associate", "MB-330", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "Supply Chain Consultant", "1–2 Years SCM Experience", "ERP Basics", ["Dynamics 365 SCM"], "https://learn.microsoft.com/credentials/certifications/d365-supply-chain-management-functional-consultant-associate/"],
  ["Dynamics 365 Finance and Operations Apps Developer Associate", "MB-500", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "ERP Developer", "1–2 Years Development", "Development Knowledge", ["Dynamics 365 F&O", "X++", "Azure"], "https://learn.microsoft.com/credentials/certifications/d365-finance-and-operations-apps-developer-associate/"],
  ["GitHub Foundations", "GH-900", "Fundamental", "GitHub", 99, "60 min", "Lifetime", "Student, Developer", "No experience needed", "No Prerequisites", ["Git", "GitHub", "GitHub Actions"], "https://learn.microsoft.com/credentials/certifications/github-foundations/"],
  ["GitHub Administrator", "GH-300", "Associate", "GitHub", 165, "100 min", "1 yr", "GitHub Administrator", "1 Year GitHub Admin", "GitHub Foundations Recommended", ["GitHub Enterprise", "Actions", "Security"], "https://learn.microsoft.com/credentials/certifications/github-administration/"],
  ["GitHub Advanced Security", "GH-500", "Associate", "GitHub", 165, "100 min", "1 yr", "DevSecOps Engineer", "1–2 Years Security", "GitHub Administrator Recommended", ["GitHub Advanced Security", "CodeQL", "Secret Scanning"], "https://learn.microsoft.com/credentials/certifications/github-advanced-security/"],
  ["Azure Solutions Architect Expert", "AZ-305", "Expert", "Azure", 165, "100 min", "1 yr", "Solutions Architect", "2+ Years Azure Experience", "AZ-104 Recommended", ["Azure Compute", "Storage", "Networking", "Identity"], "https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/"],
  ["Azure DevOps Engineer Expert", "AZ-400", "Expert", "Azure", 165, "100 min", "1 yr", "DevOps Engineer", "2+ Years DevOps Experience", "AZ-104 or AZ-204 Recommended", ["Azure DevOps", "GitHub", "Kubernetes", "Pipelines"], "https://learn.microsoft.com/credentials/certifications/devops-engineer/"],
  ["Cybersecurity Architect Expert", "SC-100", "Expert", "Security", 165, "100 min", "1 yr", "Security Architect", "2+ Years Security Experience", "SC-200 or SC-300 Recommended", ["Microsoft Defender", "Sentinel", "Entra ID"], "https://learn.microsoft.com/credentials/certifications/cybersecurity-architect-expert/"],
  ["Power Platform Solution Architect Expert", "PL-600", "Expert", "Power Platform", 165, "100 min", "1 yr", "Solution Architect", "2+ Years Power Platform", "PL-200/PL-400 Recommended", ["Power Platform", "Dataverse", "Azure"], "https://learn.microsoft.com/credentials/certifications/power-platform-solution-architect-expert/"],
  ["Dynamics 365 Finance and Operations Apps Solution Architect Expert", "MB-700", "Expert", "Dynamics 365", 165, "100 min", "1 yr", "Solution Architect", "2–3 Years Dynamics 365 Experience", "MB-500 Recommended", ["Dynamics 365 Finance & Operations", "Azure"], "https://learn.microsoft.com/credentials/certifications/d365-finance-and-operations-apps-solution-architect-expert/"],
  ["Planning and Administering Microsoft Azure for SAP Workloads", "AZ-120", "Specialty", "SAP on Azure", 165, "100 min", "1 yr", "SAP on Azure Engineer", "2+ Years Azure + SAP", "AZ-104 Recommended", ["Azure", "SAP HANA", "Virtual Machines"], "https://learn.microsoft.com/credentials/certifications/azure-for-sap-workloads-specialty/"],
  ["Configuring and Operating Microsoft Azure Virtual Desktop", "AZ-140", "Specialty", "Azure Virtual Desktop", 165, "100 min", "1 yr", "Azure Virtual Desktop Administrator", "1–2 Years Azure Experience", "Azure Fundamentals", ["Azure Virtual Desktop", "Windows 365"], "https://learn.microsoft.com/credentials/certifications/azure-virtual-desktop-specialty/"],
  ["Designing and Implementing Cloud-Native Applications Using Microsoft Azure Cosmos DB", "DP-420", "Specialty", "Database", 165, "100 min", "1 yr", "Cosmos DB Developer", "1–2 Years Cosmos DB", "DP-900 Recommended", ["Azure Cosmos DB", "NoSQL"], "https://learn.microsoft.com/credentials/certifications/azure-cosmos-db-developer-specialty/"],
  ["Deploy and Configure Azure Virtual Desktop", "Applied Skills", "Applied Skills", "Azure", 0, "120 min", "Lifetime", "Azure Administrator", "Lab Experience Recommended", "Basic Azure Knowledge", ["Azure Virtual Desktop"], "https://learn.microsoft.com/en-us/credentials/applied-skills/deploy-and-configure-azure-monitor/"],
  ["Deploy and Manage Azure Arc-enabled Servers", "Applied Skills", "Applied Skills", "Azure", 0, "120 min", "Lifetime", "Hybrid Cloud Engineer", "Lab Experience Recommended", "Azure Fundamentals", ["Azure Arc", "Windows Server"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Develop Generative AI Solutions with Azure OpenAI Service", "Applied Skills", "Applied Skills", "AI", 0, "120 min", "Lifetime", "AI Engineer", "Azure AI Basics", "AI-900 Recommended", ["Azure OpenAI", "Prompt Engineering"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Build Intelligent Apps with Azure AI Services", "Applied Skills", "Applied Skills", "AI", 0, "120 min", "Lifetime", "AI Developer", "Azure AI Experience", "AI Fundamentals", ["Azure AI Services", "Cognitive Services"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Deploy Cloud-Native Apps Using Azure Container Apps", "Applied Skills", "Applied Skills", "Azure", 0, "120 min", "Lifetime", "Cloud Developer", "Docker Knowledge", "Containers Basics", ["Azure Container Apps", "Docker"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Deploy and Manage Applications on Azure Kubernetes Service (AKS)", "Applied Skills", "Applied Skills", "Kubernetes", 0, "120 min", "Lifetime", "Kubernetes Engineer", "AKS Experience Recommended", "Kubernetes Basics", ["AKS", "Kubernetes", "Azure"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Implement a Data Analytics Solution with Microsoft Fabric", "Applied Skills", "Applied Skills", "Data", 0, "120 min", "Lifetime", "Data Analyst", "Fabric Basics", "Data Fundamentals", ["Microsoft Fabric", "Power BI"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Accelerate Development with GitHub Copilot", "Applied Skills", "Applied Skills", "GitHub", 0, "120 min", "Lifetime", "Software Developer", "Developer Experience", "GitHub Basics", ["GitHub Copilot", "AI Coding"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Secure Identities with Microsoft Entra", "Applied Skills", "Applied Skills", "Security", 0, "120 min", "Lifetime", "Identity Administrator", "Identity Basics", "SC-900 Recommended", ["Microsoft Entra ID", "MFA"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Implement Microsoft Defender for Cloud", "Applied Skills", "Applied Skills", "Security", 0, "120 min", "Lifetime", "Cloud Security Engineer", "Security Basics", "Azure Fundamentals", ["Microsoft Defender for Cloud"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
  ["Implement CI/CD with Azure DevOps and GitHub Actions", "Applied Skills", "Applied Skills", "DevOps", 0, "120 min", "Lifetime", "DevOps Engineer", "DevOps Basics", "Git Knowledge", ["Azure DevOps", "GitHub Actions"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"]
].map(([name, code, level, cat, fee, time, valid, role, exp, elig, tech, url]) => ({ name, code, level, cat, fee, time, valid, role, exp, elig, tech, url }));
const FREE_COUNT = CERTS.filter((c) => c.fee === 0).length;
const MIN_PAID = Math.min(...CERTS.filter((c) => c.fee > 0).map((c) => c.fee));
const CATEGORIES = [...new Set(CERTS.map((c) => c.cat))];

const LEVEL_NAMES = Object.keys(LEVELS);
const countBy = (l) => CERTS.filter((c) => c.level === l).length;

/* ---------- HOOKS ---------- */
function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Count({ to, prefix = "" }) {
  const [ref, seen] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, t0;
    const step = (t) => {
      t0 = t0 || t;
      const p = Math.min((t - t0) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{prefix}{n}</span>;
}

/* ---------- 3D HERO STACK ---------- */
function HeroStack({ onPick }) {
  const [r, setR] = useState({ x: 58, z: -38 });
  const [hot, setHot] = useState(null);
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    setR({ x: 58 - py * 18, z: -38 + px * 30 });
  };
  const order = [...LEVEL_NAMES].reverse();
  return (
    <div className="stage" onPointerMove={move} onPointerLeave={() => setR({ x: 58, z: -38 })}>
      <div className="glow" />
      <div className="stack" style={{ transform: `rotateX(${r.x}deg) rotateZ(${r.z}deg)` }}>
        {order.map((l, i) => (
          <button
            key={l}
            className={"plate" + (hot === l ? " hot" : "")}
            style={{ "--c": LEVELS[l].color, "--n": order.length - 1 - i, "--d": `${i * 0.35}s` }}
            onMouseEnter={() => setHot(l)}
            onMouseLeave={() => setHot(null)}
            onClick={() => onPick(l)}
            aria-label={`Show ${l} certifications`}
          >
            <span className="plate-label">{l}</span>
            <span className="plate-count">{countBy(l)} exams</span>
          </button>
        ))}
      </div>
      <p className="stage-hint">Move your mouse. Tap a layer to see its exams.</p>
    </div>
  );
}

/* ---------- FLIP CARD ---------- */
function CertCard({ c, i }) {
  const [flip, setFlip] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ref, seen] = useReveal();
  const col = LEVELS[c.level].color;
  // makes sure the link always opens in a new tab, even inside the 3D card
  const open = (url) => (e) => { e.stopPropagation(); e.preventDefault(); window.open(url, "_blank", "noopener,noreferrer"); };
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    setTilt({ x: -((e.clientY - b.top) / b.height - 0.5) * 12, y: ((e.clientX - b.left) / b.width - 0.5) * 14 });
  };
  return (
    <div ref={ref} className={"card-wrap" + (seen ? " in" : "")} style={{ "--c": col, "--i": i % 3 }}>
      <div
        className="card-tilt"
        onMouseMove={move}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className={"card" + (flip ? " flip" : "")}>
          <div className="face front">
            <div className="tag">{c.level}</div>
            <h3>{c.name}</h3>
            <div className="code">{c.cat} · {c.code}</div>
            <div className="meta">
              <div><b>{c.fee ? "$" + c.fee : "Free"}</b><span>Exam fee</span></div>
              <div><b>{c.time}</b><span>Exam time</span></div>
              <div><b>{c.valid}</b><span>Valid for</span></div>
            </div>
            <div className="front-actions"><button className="flip-btn" onClick={() => setFlip(true)}>See what it covers</button><a className="guide" href={c.url} target="_blank" rel="noopener noreferrer" onClick={open(c.url)}>Exam guide</a></div>
          </div>
          <div className="face back">
            <h4>Best for</h4>
            <p>{c.role}</p>
            <h4>Before you start</h4>
            <p>{c.elig}. {c.exp}.</p>
            <h4>You will work with</h4>
            <div className="chips">{c.tech.map((t) => <i key={t}>{t}</i>)}</div>
            <div className="back-actions">
              <button className="flip-btn" onClick={() => setFlip(false)}>Back</button>
              <a className="guide" href={c.url} target="_blank" rel="noopener noreferrer" onClick={open(c.url)}>Exam guide</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cube({ t, d, i }) {
  const [on, setOn] = useState(false);
  return (
    <div
      className={"cube-scene" + (on ? " on" : "")}
      style={{ "--i": i }}
      role="button"
      tabIndex={0}
      onClick={() => setOn(!on)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOn(!on)}
    >
      <div className="cube">
        <div className="cf f1"><h3>{t}</h3></div>
        <div className="cf f2"><p>{d}</p></div>
      </div>
    </div>
  );
}

/* ---------- PAGE ---------- */
export default function IlmoraMicrosoft({ theme, toggleTheme, setShowLoginModal, scrollToSection, signupUrl = "" }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  useEffect(() => { document.title = "Microsoft Certification Courses | ILM ORA"; }, []);
  const [level, setLevel] = useState("All");
  const [cat, setCat] = useState("All");
  const [limit, setLimit] = useState(12);
  const listRef = useRef(null);
  const pick = (l) => {
    setLevel(l);
    setLimit(12);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const filtered = CERTS.filter((c) => (level === "All" || c.level === level) && (cat === "All" || c.cat === cat));
  const shown = filtered.slice(0, limit);
  const [pathRef, pathSeen] = useReveal();
  const [whyRef, whySeen] = useReveal();

  return (
    <PublicLayout
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
      scrollToSection={scrollToSection}
    >
    <style dangerouslySetInnerHTML={{ __html: CSS }} />
    <div className={"ilm" + (isDark ? " dark" : "")}>

      {/* HERO */}
      <section className="hero cream">
        <div className="hero-copy">
          <h1>Learn the tools every company already runs on.</h1>
          <p>
            Microsoft offers {CERTS.length} credentials across five levels, from Azure and AI to Power BI,
            Dynamics 365 and GitHub. See what each one teaches, who it is for and what it costs, then pick
            the path that fits your job goal. ILM ORA trains you with projects and assessments until you
            are exam ready.
          </p>
          <div className="cta-row">
            <button className="btn primary" onClick={() => pick("All")}>Explore all exams</button>
            <button className="btn ghost" onClick={() => pathRef.current?.scrollIntoView({ behavior: "smooth" })}>Find my path</button>
          </div>
        </div>
        <HeroStack onPick={pick} />
      </section>

      {/* STATS */}
      <section className="stats white">
        <div><b><Count to={CERTS.length} /></b><span>Microsoft credentials covered</span></div>
        <div><b><Count to={FREE_COUNT} /></b><span>Free Applied Skills labs</span></div>
        <div><b><Count to={MIN_PAID} prefix="$" /></b><span>Lowest paid exam fee</span></div>
        <div><b><Count to={CATEGORIES.length} /></b><span>Technology areas</span></div>
      </section>

      {/* PATH */}
      <section className="sec cream" ref={pathRef}>
        <h2>Five levels. One clear way up.</h2>
        <p className="sub">Fundamental to Expert is the usual order. Specialty exams and free Applied Skills labs can be added at any time.</p>
        <div className={"stairs" + (pathSeen ? " in" : "")}>
          {LEVEL_NAMES.map((l, i) => (
            <button key={l} className="step" style={{ "--c": LEVELS[l].color, "--h": `${110 + i * 50}px`, "--i": i }} onClick={() => pick(l)}>
              <div className="step-top">
                <small>{STEP_LABELS[i]}</small>
                <strong>{l}</strong>
                <p>{LEVELS[l].blurb}</p>
              </div>
              <div className="step-block"><span>{countBy(l)} exams</span></div>
            </button>
          ))}
        </div>
      </section>

      {/* CERT LIST */}
      <section className="sec white" ref={listRef}>
        <h2>Pick an exam</h2>
        <p className="sub">Flip any card to see who it suits, what you need beforehand and which Microsoft tools it tests.</p>
        <div className="tabs" role="tablist">
          {["All", ...LEVEL_NAMES].map((l) => (
            <button key={l} role="tab" aria-selected={level === l} className={level === l ? "on" : ""} onClick={() => { setLevel(l); setLimit(12); }}>
              {l}
              <em>{l === "All" ? CERTS.length : countBy(l)}</em>
            </button>
          ))}
        </div>
        <div className="filters">
          <label htmlFor="ms-cat">Technology area</label>
          <select id="ms-cat" className="cat" value={cat} onChange={(e) => { setCat(e.target.value); setLimit(12); }}>
            <option value="All">All areas</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <span className="found">{filtered.length} found</span>
        </div>
        <div className="grid" key={level + cat}>
          {shown.map((c, i) => <CertCard key={c.name} c={c} i={i} />)}
        </div>
        {filtered.length === 0 && <p className="sub">Nothing here yet. Try another level or area.</p>}
        {filtered.length > limit && (
          <div className="more">
            <button className="btn ghost" onClick={() => setLimit(limit + 12)}>Show more ({filtered.length - limit} left)</button>
          </div>
        )}
      </section>

      {/* WHY */}
      <section className="sec cream" ref={whyRef}>
        <h2>What you get with ILM ORA</h2>
        <div className={"cubes" + (whySeen ? " in" : "")}>
          {[
            ["Learn by building", "Every topic ends with a hands-on project on real Microsoft tools."],
            ["Practice like the exam", "Timed assessments that match the real exam length and style."],
            ["Mentor support", "Stuck on Entra ID or Power BI? Ask a mentor who has already passed."],
            ["Proof for employers", "Finish with projects and scores you can show in interviews."],
          ].map(([t, d], i) => (
            <Cube key={t} t={t} d={d} i={i} />
          ))}
        </div>
        <p className="sub center">Hover or tap a block to turn it.</p>
      </section>

      {/* CTA */}
      <section className="final white">
        <h2>Ready to pass your first Microsoft exam?</h2>
        <p>Start with the level that matches where you are today.</p>
        <button className="btn primary big" onClick={() => (signupUrl ? navigate(signupUrl) : setShowLoginModal ? setShowLoginModal(true) : pick("All"))}>Get started with ILM ORA</button>
      </section>
    </div>
    </PublicLayout>
  );
}

/* ---------- STYLES ---------- */
const CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.ilm{--cream:#f6ede6;--white:#ffffff;--card:#ffffff;--tx:#1f1b18;--tx2:#3b332d;--mut:#6a5f57;--or:#f97316;--ord:#c2410c;--line:#e7d9cd;--w:1200px;background:var(--white);color:var(--tx);font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;overflow-x:hidden;line-height:1.55;-webkit-text-size-adjust:100%}
.ilm *{box-sizing:border-box}
.ilm h1,.ilm h2,.ilm h3,.ilm h4{font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;margin:0}
.ilm button{font-family:inherit;cursor:pointer}
.ilm :focus-visible{outline:2px solid var(--or);outline-offset:3px}
.ilm .cream{background:var(--cream);--face:var(--card)}
.ilm .white{background:var(--white);--face:var(--cream)}
.ilm .hero,.ilm .sec,.ilm .stats,.ilm .final{padding-left:max(20px,calc((100% - var(--w))/2));padding-right:max(20px,calc((100% - var(--w))/2))}
.ilm .hero{display:grid;grid-template-columns:1.05fr 1fr;gap:32px;align-items:center;padding-top:clamp(40px,7vw,80px);padding-bottom:clamp(32px,5vw,56px)}
.ilm .pill{display:inline-block;padding:6px 14px;border:1px solid rgba(234,88,12,.45);background:var(--card);color:var(--ord);border-radius:99px;font-size:13px;font-weight:600}
.ilm .hero h1{font-size:clamp(28px,4.4vw,48px);line-height:1.15;font-weight:600;margin:18px 0;letter-spacing:-.02em;animation:ilm-rise .9s cubic-bezier(.2,.8,.2,1) both}
.ilm .hero p{color:var(--mut);font-size:clamp(16px,1.6vw,18px);max-width:520px;animation:ilm-rise .9s .15s cubic-bezier(.2,.8,.2,1) both}
.ilm .cta-row{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap;animation:ilm-rise .9s .3s cubic-bezier(.2,.8,.2,1) both}
@keyframes ilm-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.ilm .btn{padding:13px 24px;border-radius:12px;font-weight:600;font-size:15px;border:1px solid transparent;transition:transform .2s,box-shadow .2s}
.ilm .btn:hover{transform:translateY(-2px)}
.ilm .btn.primary{background:var(--or);color:#fff;box-shadow:0 8px 22px rgba(249,115,22,.35)}
.ilm .btn.ghost{background:var(--card);color:var(--tx);border-color:var(--line)}
.ilm .btn.big{padding:16px 34px;font-size:17px}
.ilm .stage{position:relative;height:clamp(300px,50vw,460px);perspective:1100px;display:flex;align-items:center;justify-content:center;touch-action:pan-y}
.ilm .glow{position:absolute;width:min(340px,80%);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.26),transparent 70%);filter:blur(20px)}
.ilm .stack{--u:clamp(30px,9vw,62px);position:relative;width:clamp(150px,44vw,230px);aspect-ratio:1;transform-style:preserve-3d;transition:transform .25s ease-out}
.ilm .plate{position:absolute;inset:0;transform-style:preserve-3d;transform:translateZ(calc(var(--n)*var(--u)));border-radius:clamp(14px,3vw,22px);border:2px solid var(--c);background:linear-gradient(135deg,color-mix(in srgb,var(--c) 26%,var(--card)),var(--card) 85%);box-shadow:0 10px 30px color-mix(in srgb,var(--c) 28%,transparent);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:clamp(10px,2.4vw,16px);color:var(--tx);animation:ilm-bob 4s ease-in-out infinite;animation-delay:var(--d);transition:filter .2s,box-shadow .2s}
.ilm .plate.hot{filter:saturate(1.3);box-shadow:0 0 44px var(--c)}
.ilm .plate-label{font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-weight:700;font-size:clamp(13px,3.4vw,17px)}
.ilm .plate-count{font-size:12px;color:var(--mut)}
@keyframes ilm-bob{0%,100%{translate:0 0 0}50%{translate:0 0 12px}}
.ilm .stage-hint{position:absolute;bottom:0;margin:0;font-size:13px;color:var(--mut);text-align:center}
.ilm .stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--line)}
.ilm .stats div{padding:clamp(18px,3vw,30px) 10px;text-align:center}
.ilm .stats b{display:block;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-size:clamp(26px,4vw,38px);color:var(--or)}
.ilm .stats div>span{color:var(--mut);font-size:14px}
.ilm .sec{padding-top:clamp(56px,8vw,96px);padding-bottom:clamp(56px,8vw,96px)}
.ilm .sec h2,.ilm .final h2{font-size:clamp(24px,3vw,34px);font-weight:600;letter-spacing:-.01em;line-height:1.2}
.ilm .sub{color:var(--mut);max-width:600px;margin:10px 0 36px;font-size:clamp(15px,1.5vw,17px)}
.ilm .sub.center{text-align:center;margin:30px auto 0;font-size:14px}
.ilm .stairs{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;perspective:1200px;align-items:end}
.ilm .step{all:unset;cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;gap:14px;opacity:0;transform:rotateX(25deg) translateY(50px);transition:opacity .8s,transform .8s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.15s)}
.ilm .stairs.in .step{opacity:1;transform:none}
.ilm .step:focus-visible{outline:2px solid var(--or);outline-offset:4px;border-radius:12px}
.ilm .step-top small{color:var(--c);font-weight:600}
.ilm .step-top strong{display:block;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-size:18px;font-weight:600;margin:2px 0 6px}
.ilm .step-top p{margin:0;color:var(--mut);font-size:14px}
.ilm .step-block{height:var(--h);border-radius:14px;background:linear-gradient(160deg,color-mix(in srgb,var(--c) 32%,var(--card)),var(--card));border:1px solid var(--c);box-shadow:10px 10px 0 color-mix(in srgb,var(--c) 22%,transparent);display:flex;align-items:flex-end;padding:14px;font-weight:600;font-size:14px;transition:transform .25s}
.ilm .step:hover .step-block{transform:translate(-4px,-6px)}
.ilm .tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
.ilm .tabs button{background:var(--cream);color:var(--mut);border:1px solid var(--line);border-radius:99px;padding:9px 18px;font-size:14px;font-weight:500;transition:.2s}
.ilm .tabs button em{font-style:normal;margin-left:8px;opacity:.7}
.ilm .tabs button.on{background:var(--or);color:#fff;border-color:var(--or)}
.ilm .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:26px;perspective:1400px}
.ilm .card-wrap{opacity:0;transform:translateY(40px) rotateX(-12deg);transition:opacity .7s,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.1s)}
.ilm .card-wrap.in{opacity:1;transform:none}
.ilm .card-tilt{transition:transform .15s ease-out;transform-style:preserve-3d}
.ilm .card{position:relative;height:360px;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.3,.8,.2,1)}
.ilm .card.flip{transform:rotateY(180deg)}
.ilm .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:18px;padding:22px;background:var(--face);border:1px solid color-mix(in srgb,var(--c) 45%,var(--line));box-shadow:0 14px 30px rgba(120,80,40,.16);display:flex;flex-direction:column;pointer-events:none}
.ilm .face::before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:4px;border-radius:0 4px 4px 0;background:var(--c)}
.ilm .front{transform:translateZ(1px)}
.ilm .back{transform:rotateY(180deg) translateZ(1px);overflow:auto}
.ilm .card:not(.flip) .front,.ilm .card.flip .back{pointer-events:auto}
.ilm .tag{align-self:flex-start;font-size:12px;font-weight:600;color:var(--c);border:1px solid var(--c);padding:3px 10px;border-radius:99px;background:var(--card)}
.ilm .front h3{font-size:clamp(16px,1.7vw,19px);font-weight:600;line-height:1.25;margin:16px 0 6px}
.ilm .code{color:var(--mut);font-size:14px}
.ilm .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:auto;padding:14px 0}
.ilm .meta b{display:block;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-size:16px}
.ilm .meta span{font-size:12px;color:var(--mut)}
.ilm .front-actions,.ilm .back-actions{display:flex;justify-content:space-between;align-items:center;gap:10px}
.ilm .back-actions{margin-top:auto;padding-top:12px}
.ilm .flip-btn{background:var(--card);border:1px solid var(--line);color:var(--tx);border-radius:10px;padding:10px 14px;font-size:14px;font-weight:500;transition:.2s;min-height:40px}
.ilm .flip-btn:hover{border-color:var(--c);color:var(--c)}
.ilm a.guide{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:10px 14px;border-radius:10px;background:var(--c);color:#fff;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:transform .2s,filter .2s}
.ilm a.guide:hover{transform:translateY(-2px);filter:brightness(1.08)}
.ilm .back h4{font-size:12px;color:var(--c);margin:10px 0 3px;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-weight:600}
.ilm .back h4:first-child{margin-top:0}
.ilm .back p{margin:0;font-size:14px;color:var(--tx2)}
.ilm .chips{display:flex;flex-wrap:wrap;gap:6px}
.ilm .chips i{font-style:normal;font-size:12px;padding:3px 9px;border-radius:8px;background:color-mix(in srgb,var(--c) 14%,var(--card));color:var(--tx2);border:1px solid color-mix(in srgb,var(--c) 25%,var(--card))}
.ilm .cubes{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;perspective:1000px;margin-top:36px}
.ilm .cube-scene{height:200px;cursor:pointer;opacity:0;transform:translateY(40px);transition:opacity .7s,transform .7s;transition-delay:calc(var(--i)*.12s)}
.ilm .cubes.in .cube-scene{opacity:1;transform:none}
.ilm .cube{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:translateZ(-100px);transition:transform .8s cubic-bezier(.3,.8,.2,1)}
.ilm .cube-scene.on .cube,.ilm .cube-scene:focus-visible .cube{transform:translateZ(-100px) rotateX(-90deg)}
@media(hover:hover){.ilm .cube-scene:hover .cube{transform:translateZ(-100px) rotateX(-90deg)}}
.ilm .cf{position:absolute;inset:0;border-radius:16px;padding:22px;display:flex;align-items:flex-start;border:1px solid var(--line);background:var(--card);backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 12px 26px rgba(120,80,40,.14)}
.ilm .cf h3{font-size:clamp(17px,1.8vw,19px);font-weight:600;line-height:1.3}
.ilm .cf p{margin:0;font-size:14.5px;color:#fff}
.ilm .f1{transform:rotateX(0) translateZ(100px)}
.ilm .f2{transform:rotateX(90deg) translateZ(100px);background:linear-gradient(150deg,#f97316,#c2410c);border-color:var(--or)}
.ilm .final{text-align:center;padding-top:clamp(64px,9vw,100px);padding-bottom:clamp(64px,9vw,100px);background:radial-gradient(ellipse at 50% 0,rgba(249,115,22,.14),transparent 65%),var(--white)}
.ilm .final p{color:var(--mut);margin:12px 0 28px;font-size:clamp(16px,1.6vw,18px)}
@media(min-width:1600px){.ilm{--w:1360px}}
@media(max-width:1100px){.ilm .hero{gap:16px}
.ilm .stairs,.ilm .cubes{gap:16px}
.ilm .step-top strong{font-size:18px}}
@media(max-width:900px){.ilm .hero{grid-template-columns:1fr;text-align:center}
.ilm .hero p{margin-left:auto;margin-right:auto}
.ilm .cta-row{justify-content:center}
.ilm .stairs,.ilm .cubes{grid-template-columns:repeat(2,1fr)}
.ilm .stairs .step:last-child{grid-column:1/-1}
.ilm .stats{grid-template-columns:repeat(2,1fr)}
.ilm .stats div{border-bottom:1px solid var(--line)}
.ilm .sub{max-width:none}}
@media(max-width:768px){.ilm .card{height:370px}}
@media(max-width:560px){.ilm .stairs,.ilm .cubes{grid-template-columns:1fr}
.ilm .step-block{height:calc(var(--h)*.55)}
.ilm .card{height:390px}
.ilm .tabs{flex-wrap:nowrap;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 6px;-webkit-overflow-scrolling:touch}
.ilm .tabs button{flex:0 0 auto}
.ilm .btn{flex:1 1 100%;text-align:center}
.ilm .front-actions{flex-wrap:wrap}}
@media(max-width:380px){.ilm .face{padding:18px}
.ilm .card{height:410px}
.ilm .meta b{font-size:14px}}
@media(prefers-reduced-motion:reduce){.ilm *{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}}
.ilm .filters{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:-8px 0 28px}
.ilm .filters label{font-size:14px;font-weight:600;color:var(--mut)}
.ilm .cat{background:var(--cream);color:var(--tx);border:1px solid var(--line);border-radius:10px;padding:10px 14px;font-size:14px;font-family:inherit;min-height:42px;max-width:100%}
.ilm .found{font-size:14px;color:var(--mut)}
.ilm .more{display:flex;justify-content:center;margin-top:34px}
.ilm.dark{--cream:#0c0c14;--white:#0f0f18;--card:#13131e;--tx:#f1f5f9;--tx2:#cbd5e1;--mut:#94a3b8;--line:rgba(255,255,255,.1)}
`;