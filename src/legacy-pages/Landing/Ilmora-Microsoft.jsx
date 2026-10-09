// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "@/lib/routerCompat";

// // Same shared shell (AnnouncementBanner, Navbar, Footer) used by StudyAbroad, Careers, About etc.
// import PublicLayout from "../Landing/components/PublicLayout";

// /* ---------- DATA (from MicroSoft.xlsx) ---------- */
// const LEVELS = {
//   "Fundamental": { color: "#16a34a", blurb: "Start here. Learn the basics of Azure, AI, data and GitHub. No experience needed." },
//   "Associate": { color: "#ea580c", blurb: "Do real job tasks as an administrator, developer, analyst or engineer." },
//   "Expert": { color: "#2563eb", blurb: "Design and lead big solutions. Made for people with 2+ years of experience." },
//   "Specialty": { color: "#9333ea", blurb: "Go deep on one workload such as SAP on Azure, Virtual Desktop or Cosmos DB." },
//   "Applied Skills": { color: "#0d9488", blurb: "Free hands-on lab tests that prove you can do one specific task." },
// };
// const STEP_LABELS = ["Step 1", "Step 2", "Step 3", "Add-on", "Free labs"];

// const CERTS = [
//   ["Microsoft Azure Fundamentals", "AZ-900", "Fundamental", "Cloud Computing", 99, "45 min", "Lifetime", "Student, Fresher, Cloud Beginner", "No experience needed", "No prerequisites", ["Azure", "Cloud", "Compute", "Storage", "Networking"], "https://learn.microsoft.com/credentials/certifications/azure-fundamentals/"],
//   ["Microsoft Azure AI Fundamentals", "AI-900", "Fundamental", "AI", 99, "45 min", "Lifetime", "AI Beginner", "No experience needed", "No prerequisites", ["Azure AI", "ML", "NLP", "Computer Vision"], "https://learn.microsoft.com/credentials/certifications/azure-ai-fundamentals/"],
//   ["Microsoft Azure Data Fundamentals", "DP-900", "Fundamental", "Data", 99, "45 min", "Lifetime", "Data Beginner", "No experience needed", "No prerequisites", ["SQL", "Azure SQL", "Cosmos DB", "Data Analytics"], "https://learn.microsoft.com/credentials/certifications/azure-data-fundamentals/"],
//   ["Microsoft Azure Administrator Associate", "AZ-104", "Associate", "Cloud Computing", 165, "100 min", "1 yr", "Azure Administrator, Cloud Administrator", "6–12 Months Azure Experience", "Azure Fundamentals Recommended", ["Azure VM", "Storage", "VNet", "IAM", "Monitor"], "https://learn.microsoft.com/credentials/certifications/azure-administrator/"],
//   ["Microsoft Azure Developer Associate", "AZ-204", "Associate", "Cloud Computing", 165, "100 min", "1 yr", "Azure Developer", "1–2 Years Development", "Programming Knowledge", ["App Service", "Functions", "Storage", "Cosmos DB", "APIs"], "https://learn.microsoft.com/credentials/certifications/azure-developer/"],
//   ["Microsoft Azure Network Engineer Associate", "AZ-700", "Associate", "Networking", 165, "100 min", "1 yr", "Network Engineer", "1–2 Years Networking", "Azure Fundamentals", ["VNet", "VPN", "ExpressRoute", "DNS", "Load Balancer"], "https://learn.microsoft.com/credentials/certifications/azure-network-engineer-associate/"],
//   ["Microsoft Azure Security Engineer Associate", "AZ-500", "Associate", "Security", 165, "100 min", "1 yr", "Security Engineer", "1–2 Years Azure Security", "Azure Administration Knowledge", ["Microsoft Defender", "Entra ID", "Key Vault", "Sentinel"], "https://learn.microsoft.com/credentials/certifications/azure-security-engineer/"],
//   ["Windows Server Hybrid Administrator Associate", "AZ-800", "Associate", "Windows Server", 165, "100 min", "1 yr", "Windows Administrator", "1–2 Years Windows Server", "Windows Server Basics", ["Windows Server", "Azure Arc", "Active Directory"], "https://learn.microsoft.com/credentials/certifications/windows-server-hybrid-administrator/"],
//   ["Configuring Windows Server Hybrid Advanced Services", "AZ-801", "Associate", "Windows Server", 165, "100 min", "1 yr", "Hybrid Administrator", "1–2 Years Windows Server", "AZ-800 Recommended", ["Windows Server", "Azure", "AD DS"], "https://learn.microsoft.com/credentials/certifications/exams/az-801/"],
//   ["Azure AI Engineer Associate", "AI-102", "Associate", "AI", 165, "100 min", "1 yr", "AI Engineer", "1 Year AI Experience", "AI-900 Recommended", ["Azure AI", "Cognitive Services", "OpenAI"], "https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/"],
//   ["Azure Data Engineer Associate", "DP-203", "Associate", "Data", 165, "100 min", "1 yr", "Data Engineer", "1–2 Years Data Engineering", "Data Fundamentals", ["Azure Synapse", "Data Factory", "SQL"], "https://learn.microsoft.com/credentials/certifications/azure-data-engineer/"],
//   ["Azure Database Administrator Associate", "DP-300", "Associate", "Data", 165, "100 min", "1 yr", "Database Administrator", "1–2 Years DBA Experience", "SQL Knowledge", ["Azure SQL", "SQL Server"], "https://learn.microsoft.com/credentials/certifications/azure-database-administrator-associate/"],
//   ["Azure Data Scientist Associate", "DP-100", "Associate", "AI", 165, "100 min", "1 yr", "Data Scientist", "1–2 Years ML Experience", "Python & ML Basics", ["Azure ML", "Python", "AI"], "https://learn.microsoft.com/credentials/certifications/azure-data-scientist/"],
//   ["Identity and Access Administrator Associate", "SC-300", "Associate", "Security", 165, "100 min", "1 yr", "IAM Engineer", "1 Year Identity Management", "Identity Basics", ["Microsoft Entra ID", "MFA", "Conditional Access"], "https://learn.microsoft.com/credentials/certifications/identity-and-access-administrator/"],
//   ["Security Operations Analyst Associate", "SC-200", "Associate", "Security", 165, "100 min", "1 yr", "SOC Analyst", "1 Year SOC Experience", "Security Fundamentals", ["Microsoft Sentinel", "Defender XDR"], "https://learn.microsoft.com/credentials/certifications/security-operations-analyst/"],
//   ["Microsoft 365 Administrator", "MS-102", "Associate", "Microsoft 365", 165, "100 min", "1 yr", "Microsoft 365 Administrator", "1–2 Years Microsoft 365", "Microsoft 365 Basics", ["Exchange Online", "Teams", "SharePoint"], "https://learn.microsoft.com/credentials/certifications/m365-administrator-expert/"],
//   ["Endpoint Administrator Associate", "MD-102", "Associate", "Endpoint Management", 165, "100 min", "1 yr", "Endpoint Administrator", "1 Year Endpoint Management", "Windows Basics", ["Intune", "Windows", "Autopilot"], "https://learn.microsoft.com/credentials/certifications/modern-desktop/"],
//   ["Power Platform App Maker Associate", "PL-100", "Associate", "Power Platform", 165, "100 min", "1 yr", "App Maker", "6–12 Months Experience", "PL-900 Recommended", ["Power Apps", "Dataverse"], "https://learn.microsoft.com/credentials/certifications/power-platform-app-maker/"],
//   ["Microsoft Power Platform Functional Consultant Associate", "PL-200", "Associate", "Power Platform", 165, "100 min", "1 yr", "Functional Consultant", "1 Year Power Platform", "PL-900 Recommended", ["Power Apps", "Power Automate", "Dataverse", "Power BI"], "https://learn.microsoft.com/credentials/certifications/power-platform-functional-consultant-associate/"],
//   ["Microsoft Power BI Data Analyst Associate", "PL-300", "Associate", "Power Platform", 165, "100 min", "1 yr", "Data Analyst", "6–12 Months Power BI", "Data Fundamentals Recommended", ["Power BI", "DAX", "Power Query", "Excel"], "https://learn.microsoft.com/credentials/certifications/power-bi-data-analyst-associate/"],
//   ["Microsoft Power Platform Developer Associate", "PL-400", "Associate", "Power Platform", 165, "100 min", "1 yr", "Power Platform Developer", "1–2 Years Development", "PL-900 Recommended", ["Power Apps", "Dataverse", "Power Automate", "Azure"], "https://learn.microsoft.com/credentials/certifications/power-platform-developer-associate/"],
//   ["Dynamics 365 Customer Service Functional Consultant Associate", "MB-230", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "CRM Functional Consultant", "1 Year CRM Experience", "Dynamics 365 Basics", ["Dynamics 365 Customer Service"], "https://learn.microsoft.com/credentials/certifications/d365-customer-service-functional-consultant-associate/"],
//   ["Dynamics 365 Field Service Functional Consultant Associate", "MB-240", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "Field Service Consultant", "1 Year Field Service", "Dynamics 365 Basics", ["Dynamics 365 Field Service"], "https://learn.microsoft.com/credentials/certifications/d365-field-service-functional-consultant-associate/"],
//   ["Dynamics 365 Customer Data Platform Specialist Associate", "MB-260", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "CDP Specialist", "1 Year Customer Insights", "Data Fundamentals", ["Dynamics 365 Customer Insights"], "https://learn.microsoft.com/credentials/certifications/exams/mb-260/"],
//   ["Dynamics 365 Supply Chain Management Functional Consultant Associate", "MB-330", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "Supply Chain Consultant", "1–2 Years SCM Experience", "ERP Basics", ["Dynamics 365 SCM"], "https://learn.microsoft.com/credentials/certifications/d365-supply-chain-management-functional-consultant-associate/"],
//   ["Dynamics 365 Finance and Operations Apps Developer Associate", "MB-500", "Associate", "Dynamics 365", 165, "100 min", "1 yr", "ERP Developer", "1–2 Years Development", "Development Knowledge", ["Dynamics 365 F&O", "X++", "Azure"], "https://learn.microsoft.com/credentials/certifications/d365-finance-and-operations-apps-developer-associate/"],
//   ["GitHub Foundations", "GH-900", "Fundamental", "GitHub", 99, "60 min", "Lifetime", "Student, Developer", "No experience needed", "No Prerequisites", ["Git", "GitHub", "GitHub Actions"], "https://learn.microsoft.com/credentials/certifications/github-foundations/"],
//   ["GitHub Administrator", "GH-300", "Associate", "GitHub", 165, "100 min", "1 yr", "GitHub Administrator", "1 Year GitHub Admin", "GitHub Foundations Recommended", ["GitHub Enterprise", "Actions", "Security"], "https://learn.microsoft.com/credentials/certifications/github-administration/"],
//   ["GitHub Advanced Security", "GH-500", "Associate", "GitHub", 165, "100 min", "1 yr", "DevSecOps Engineer", "1–2 Years Security", "GitHub Administrator Recommended", ["GitHub Advanced Security", "CodeQL", "Secret Scanning"], "https://learn.microsoft.com/credentials/certifications/github-advanced-security/"],
//   ["Azure Solutions Architect Expert", "AZ-305", "Expert", "Azure", 165, "100 min", "1 yr", "Solutions Architect", "2+ Years Azure Experience", "AZ-104 Recommended", ["Azure Compute", "Storage", "Networking", "Identity"], "https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/"],
//   ["Azure DevOps Engineer Expert", "AZ-400", "Expert", "Azure", 165, "100 min", "1 yr", "DevOps Engineer", "2+ Years DevOps Experience", "AZ-104 or AZ-204 Recommended", ["Azure DevOps", "GitHub", "Kubernetes", "Pipelines"], "https://learn.microsoft.com/credentials/certifications/devops-engineer/"],
//   ["Cybersecurity Architect Expert", "SC-100", "Expert", "Security", 165, "100 min", "1 yr", "Security Architect", "2+ Years Security Experience", "SC-200 or SC-300 Recommended", ["Microsoft Defender", "Sentinel", "Entra ID"], "https://learn.microsoft.com/credentials/certifications/cybersecurity-architect-expert/"],
//   ["Power Platform Solution Architect Expert", "PL-600", "Expert", "Power Platform", 165, "100 min", "1 yr", "Solution Architect", "2+ Years Power Platform", "PL-200/PL-400 Recommended", ["Power Platform", "Dataverse", "Azure"], "https://learn.microsoft.com/credentials/certifications/power-platform-solution-architect-expert/"],
//   ["Dynamics 365 Finance and Operations Apps Solution Architect Expert", "MB-700", "Expert", "Dynamics 365", 165, "100 min", "1 yr", "Solution Architect", "2–3 Years Dynamics 365 Experience", "MB-500 Recommended", ["Dynamics 365 Finance & Operations", "Azure"], "https://learn.microsoft.com/credentials/certifications/d365-finance-and-operations-apps-solution-architect-expert/"],
//   ["Planning and Administering Microsoft Azure for SAP Workloads", "AZ-120", "Specialty", "SAP on Azure", 165, "100 min", "1 yr", "SAP on Azure Engineer", "2+ Years Azure + SAP", "AZ-104 Recommended", ["Azure", "SAP HANA", "Virtual Machines"], "https://learn.microsoft.com/credentials/certifications/azure-for-sap-workloads-specialty/"],
//   ["Configuring and Operating Microsoft Azure Virtual Desktop", "AZ-140", "Specialty", "Azure Virtual Desktop", 165, "100 min", "1 yr", "Azure Virtual Desktop Administrator", "1–2 Years Azure Experience", "Azure Fundamentals", ["Azure Virtual Desktop", "Windows 365"], "https://learn.microsoft.com/credentials/certifications/azure-virtual-desktop-specialty/"],
//   ["Designing and Implementing Cloud-Native Applications Using Microsoft Azure Cosmos DB", "DP-420", "Specialty", "Database", 165, "100 min", "1 yr", "Cosmos DB Developer", "1–2 Years Cosmos DB", "DP-900 Recommended", ["Azure Cosmos DB", "NoSQL"], "https://learn.microsoft.com/credentials/certifications/azure-cosmos-db-developer-specialty/"],
//   ["Deploy and Configure Azure Virtual Desktop", "Applied Skills", "Applied Skills", "Azure", 0, "120 min", "Lifetime", "Azure Administrator", "Lab Experience Recommended", "Basic Azure Knowledge", ["Azure Virtual Desktop"], "https://learn.microsoft.com/en-us/credentials/applied-skills/deploy-and-configure-azure-monitor/"],
//   ["Deploy and Manage Azure Arc-enabled Servers", "Applied Skills", "Applied Skills", "Azure", 0, "120 min", "Lifetime", "Hybrid Cloud Engineer", "Lab Experience Recommended", "Azure Fundamentals", ["Azure Arc", "Windows Server"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Develop Generative AI Solutions with Azure OpenAI Service", "Applied Skills", "Applied Skills", "AI", 0, "120 min", "Lifetime", "AI Engineer", "Azure AI Basics", "AI-900 Recommended", ["Azure OpenAI", "Prompt Engineering"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Build Intelligent Apps with Azure AI Services", "Applied Skills", "Applied Skills", "AI", 0, "120 min", "Lifetime", "AI Developer", "Azure AI Experience", "AI Fundamentals", ["Azure AI Services", "Cognitive Services"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Deploy Cloud-Native Apps Using Azure Container Apps", "Applied Skills", "Applied Skills", "Azure", 0, "120 min", "Lifetime", "Cloud Developer", "Docker Knowledge", "Containers Basics", ["Azure Container Apps", "Docker"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Deploy and Manage Applications on Azure Kubernetes Service (AKS)", "Applied Skills", "Applied Skills", "Kubernetes", 0, "120 min", "Lifetime", "Kubernetes Engineer", "AKS Experience Recommended", "Kubernetes Basics", ["AKS", "Kubernetes", "Azure"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Implement a Data Analytics Solution with Microsoft Fabric", "Applied Skills", "Applied Skills", "Data", 0, "120 min", "Lifetime", "Data Analyst", "Fabric Basics", "Data Fundamentals", ["Microsoft Fabric", "Power BI"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Accelerate Development with GitHub Copilot", "Applied Skills", "Applied Skills", "GitHub", 0, "120 min", "Lifetime", "Software Developer", "Developer Experience", "GitHub Basics", ["GitHub Copilot", "AI Coding"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Secure Identities with Microsoft Entra", "Applied Skills", "Applied Skills", "Security", 0, "120 min", "Lifetime", "Identity Administrator", "Identity Basics", "SC-900 Recommended", ["Microsoft Entra ID", "MFA"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Implement Microsoft Defender for Cloud", "Applied Skills", "Applied Skills", "Security", 0, "120 min", "Lifetime", "Cloud Security Engineer", "Security Basics", "Azure Fundamentals", ["Microsoft Defender for Cloud"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"],
//   ["Implement CI/CD with Azure DevOps and GitHub Actions", "Applied Skills", "Applied Skills", "DevOps", 0, "120 min", "Lifetime", "DevOps Engineer", "DevOps Basics", "Git Knowledge", ["Azure DevOps", "GitHub Actions"], "https://learn.microsoft.com/credentials/browse/?credential_types=applied%20skills"]
// ].map(([name, code, level, cat, fee, time, valid, role, exp, elig, tech, url]) => ({ name, code, level, cat, fee, time, valid, role, exp, elig, tech, url }));
// const FREE_COUNT = CERTS.filter((c) => c.fee === 0).length;
// const MIN_PAID = Math.min(...CERTS.filter((c) => c.fee > 0).map((c) => c.fee));
// const CATEGORIES = [...new Set(CERTS.map((c) => c.cat))];

// const LEVEL_NAMES = Object.keys(LEVELS);
// const countBy = (l) => CERTS.filter((c) => c.level === l).length;

// /* ---------- HOOKS ---------- */
// function useReveal() {
//   const ref = useRef(null);
//   const [seen, setSeen] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
//     const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);
//   return [ref, seen];
// }

// function Count({ to, prefix = "" }) {
//   const [ref, seen] = useReveal();
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     if (!seen) return;
//     let raf, t0;
//     const step = (t) => {
//       t0 = t0 || t;
//       const p = Math.min((t - t0) / 1200, 1);
//       setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
//       if (p < 1) raf = requestAnimationFrame(step);
//     };
//     raf = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(raf);
//   }, [seen, to]);
//   return <span ref={ref}>{prefix}{n}</span>;
// }

// /* ---------- 3D HERO STACK ---------- */
// function HeroStack({ onPick }) {
//   const [r, setR] = useState({ x: 58, z: -38 });
//   const [hot, setHot] = useState(null);
//   const move = (e) => {
//     const b = e.currentTarget.getBoundingClientRect();
//     const px = (e.clientX - b.left) / b.width - 0.5;
//     const py = (e.clientY - b.top) / b.height - 0.5;
//     setR({ x: 58 - py * 18, z: -38 + px * 30 });
//   };
//   const order = [...LEVEL_NAMES].reverse();
//   return (
//     <div className="stage" onPointerMove={move} onPointerLeave={() => setR({ x: 58, z: -38 })}>
//       <div className="glow" />
//       <div className="stack" style={{ transform: `rotateX(${r.x}deg) rotateZ(${r.z}deg)` }}>
//         {order.map((l, i) => (
//           <button
//             key={l}
//             className={"plate" + (hot === l ? " hot" : "")}
//             style={{ "--c": LEVELS[l].color, "--n": order.length - 1 - i, "--d": `${i * 0.35}s` }}
//             onMouseEnter={() => setHot(l)}
//             onMouseLeave={() => setHot(null)}
//             onClick={() => onPick(l)}
//             aria-label={`Show ${l} certifications`}
//           >
//             <span className="plate-label">{l}</span>
//             <span className="plate-count">{countBy(l)} exams</span>
//           </button>
//         ))}
//       </div>
     
//     </div>
//   );
// }

// /* ---------- FLIP CARD ---------- */
// function CertCard({ c, i }) {
//   const [flip, setFlip] = useState(false);
//   const [tilt, setTilt] = useState({ x: 0, y: 0 });
//   const [ref, seen] = useReveal();
//   const col = LEVELS[c.level].color;
//   // makes sure the link always opens in a new tab, even inside the 3D card
//   const open = (url) => (e) => { e.stopPropagation(); e.preventDefault(); window.open(url, "_blank", "noopener,noreferrer"); };
//   const move = (e) => {
//     const b = e.currentTarget.getBoundingClientRect();
//     setTilt({ x: -((e.clientY - b.top) / b.height - 0.5) * 12, y: ((e.clientX - b.left) / b.width - 0.5) * 14 });
//   };
//   return (
//     <div ref={ref} className={"card-wrap" + (seen ? " in" : "")} style={{ "--c": col, "--i": i % 3 }}>
//       <div
//         className="card-tilt"
//         onMouseMove={move}
//         onMouseLeave={() => setTilt({ x: 0, y: 0 })}
//         style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
//       >
//         <div className={"card" + (flip ? " flip" : "")}>
//           <div className="face front">
//             <div className="tag">{c.level}</div>
//             <h3>{c.name}</h3>
//             <div className="code">{c.cat} · {c.code}</div>
//             <div className="meta">
//               <div><b>{c.fee ? "$" + c.fee : "Free"}</b><span>Exam fee</span></div>
//               <div><b>{c.time}</b><span>Exam time</span></div>
//               <div><b>{c.valid}</b><span>Valid for</span></div>
//             </div>
//             <div className="front-actions"><button className="flip-btn" onClick={() => setFlip(true)}>See what it covers</button><a className="guide" href={c.url} target="_blank" rel="noopener noreferrer" onClick={open(c.url)}>Exam guide</a></div>
//           </div>
//           <div className="face back">
//             <h4>Best for</h4>
//             <p>{c.role}</p>
//             <h4>Before you start</h4>
//             <p>{c.elig}. {c.exp}.</p>
//             <h4>You will work with</h4>
//             <div className="chips">{c.tech.map((t) => <i key={t}>{t}</i>)}</div>
//             <div className="back-actions">
//               <button className="flip-btn" onClick={() => setFlip(false)}>Back</button>
//               <a className="guide" href={c.url} target="_blank" rel="noopener noreferrer" onClick={open(c.url)}>Exam guide</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Cube({ t, d, i }) {
//   const [on, setOn] = useState(false);
//   return (
//     <div
//       className={"cube-scene" + (on ? " on" : "")}
//       style={{ "--i": i }}
//       role="button"
//       tabIndex={0}
//       onClick={() => setOn(!on)}
//       onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOn(!on)}
//     >
//       <div className="cube">
//         <div className="cf f1"><h3>{t}</h3></div>
//         <div className="cf f2"><p>{d}</p></div>
//       </div>
//     </div>
//   );
// }

// /* ---------- PAGE ---------- */
// export default function IlmoraMicrosoft({ theme, toggleTheme, setShowLoginModal, scrollToSection, signupUrl = "" }) {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const isDark = theme === "dark";
//   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
//   useEffect(() => { document.title = "Microsoft Certification Courses | ILM ORA"; }, []);
//   const [level, setLevel] = useState("All");
//   const [cat, setCat] = useState("All");
//   const [limit, setLimit] = useState(12);
//   const listRef = useRef(null);
//   const pick = (l) => {
//     setLevel(l);
//     setLimit(12);
//     listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };
//   const filtered = CERTS.filter((c) => (level === "All" || c.level === level) && (cat === "All" || c.cat === cat));
//   const shown = filtered.slice(0, limit);
//   const [pathRef, pathSeen] = useReveal();
//   const [whyRef, whySeen] = useReveal();

//   return (
//     <PublicLayout
//       theme={theme}
//       toggleTheme={toggleTheme}
//       setShowLoginModal={setShowLoginModal}
//       scrollToSection={scrollToSection}
//     >
//     <style dangerouslySetInnerHTML={{ __html: CSS }} />
//     <div className={"ilm" + (isDark ? " dark" : "")}>

//       {/* HERO */}
//       <section className="hero cream">
//         <div className="hero-copy">
//           <h1>Learn the tools every company already runs on.</h1>
//           <p>
//             Microsoft offers {CERTS.length} credentials across five levels, from Azure and AI to Power BI,
//             Dynamics 365 and GitHub. See what each one teaches, who it is for and what it costs, then pick
//             the path that fits your job goal. ILM ORA trains you with projects and assessments until you
//             are exam ready.
//           </p>
//           <div className="cta-row">
//             <button className="btn primary" onClick={() => pick("All")}>Explore all exams</button>
//             <button className="btn ghost" onClick={() => pathRef.current?.scrollIntoView({ behavior: "smooth" })}>Find my path</button>
//           </div>
//         </div>
//         <HeroStack onPick={pick} />
//       </section>

//       {/* STATS */}
//       <section className="stats white">
//         <div><b><Count to={CERTS.length} /></b><span>Microsoft credentials covered</span></div>
//         <div><b><Count to={FREE_COUNT} /></b><span>Free Applied Skills labs</span></div>
//         <div><b><Count to={MIN_PAID} prefix="$" /></b><span>Lowest paid exam fee</span></div>
//         <div><b><Count to={CATEGORIES.length} /></b><span>Technology areas</span></div>
//       </section>

//       {/* PATH */}
//       <section className="sec cream" ref={pathRef}>
//         <h2>Five levels. One clear way up.</h2>
//         <p className="sub">Fundamental to Expert is the usual order. Specialty exams and free Applied Skills labs can be added at any time.</p>
//         <div className={"stairs" + (pathSeen ? " in" : "")}>
//           {LEVEL_NAMES.map((l, i) => (
//             <button key={l} className="step" style={{ "--c": LEVELS[l].color, "--h": `${110 + i * 50}px`, "--i": i }} onClick={() => pick(l)}>
//               <div className="step-top">
//                 <small>{STEP_LABELS[i]}</small>
//                 <strong>{l}</strong>
//                 <p>{LEVELS[l].blurb}</p>
//               </div>
//               <div className="step-block"><span>{countBy(l)} exams</span></div>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* CERT LIST */}
//       <section className="sec white" ref={listRef}>
//         <h2>Pick an exam</h2>
//         <p className="sub">Flip any card to see who it suits, what you need beforehand and which Microsoft tools it tests.</p>
//         <div className="tabs" role="tablist">
//           {["All", ...LEVEL_NAMES].map((l) => (
//             <button key={l} role="tab" aria-selected={level === l} className={level === l ? "on" : ""} onClick={() => { setLevel(l); setLimit(12); }}>
//               {l}
//               <em>{l === "All" ? CERTS.length : countBy(l)}</em>
//             </button>
//           ))}
//         </div>
//         <div className="filters">
//           <label htmlFor="ms-cat">Technology area</label>
//           <select id="ms-cat" className="cat" value={cat} onChange={(e) => { setCat(e.target.value); setLimit(12); }}>
//             <option value="All">All areas</option>
//             {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
//           </select>
//           <span className="found">{filtered.length} found</span>
//         </div>
//         <div className="grid" key={level + cat}>
//           {shown.map((c, i) => <CertCard key={c.name} c={c} i={i} />)}
//         </div>
//         {filtered.length === 0 && <p className="sub">Nothing here yet. Try another level or area.</p>}
//         {filtered.length > limit && (
//           <div className="more">
//             <button className="btn ghost" onClick={() => setLimit(limit + 12)}>Show more ({filtered.length - limit} left)</button>
//           </div>
//         )}
//       </section>

//       {/* WHY */}
//       <section className="sec cream" ref={whyRef}>
//         <h2>What you get with ILM ORA</h2>
//         <div className={"cubes" + (whySeen ? " in" : "")}>
//           {[
//             ["Learn by building", "Every topic ends with a hands-on project on real Microsoft tools."],
//             ["Practice like the exam", "Timed assessments that match the real exam length and style."],
//             ["Mentor support", "Stuck on Entra ID or Power BI? Ask a mentor who has already passed."],
//             ["Proof for employers", "Finish with projects and scores you can show in interviews."],
//           ].map(([t, d], i) => (
//             <Cube key={t} t={t} d={d} i={i} />
//           ))}
//         </div>
//         <p className="sub center">Hover or tap a block to turn it.</p>
//       </section>

//       {/* CTA */}
//       <section className="final white">
//         <h2>Ready to pass your first Microsoft exam?</h2>
//         <p>Start with the level that matches where you are today.</p>
//         <button className="btn primary big" onClick={() => (signupUrl ? navigate(signupUrl) : setShowLoginModal ? setShowLoginModal(true) : pick("All"))}>Get started with ILM ORA</button>
//       </section>
//     </div>
//     </PublicLayout>
//   );
// }

// /* ---------- STYLES ---------- */
// const CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// .ilm{--cream:#f6ede6;--white:#ffffff;--card:#ffffff;--tx:#1f1b18;--tx2:#3b332d;--mut:#6a5f57;--or:#f97316;--ord:#c2410c;--line:#e7d9cd;--w:1200px;background:var(--white);color:var(--tx);font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;overflow-x:hidden;line-height:1.55;-webkit-text-size-adjust:100%}
// .ilm *{box-sizing:border-box}
// .ilm h1,.ilm h2,.ilm h3,.ilm h4{font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;margin:0}
// .ilm button{font-family:inherit;cursor:pointer}
// .ilm :focus-visible{outline:2px solid var(--or);outline-offset:3px}
// .ilm .cream{background:var(--cream);--face:var(--card)}
// .ilm .white{background:var(--white);--face:var(--cream)}
// .ilm .hero,.ilm .sec,.ilm .stats,.ilm .final{padding-left:max(20px,calc((100% - var(--w))/2));padding-right:max(20px,calc((100% - var(--w))/2))}
// .ilm .hero{display:grid;grid-template-columns:1.05fr 1fr;gap:32px;align-items:center;padding-top:clamp(40px,7vw,80px);padding-bottom:clamp(32px,5vw,56px)}
// .ilm .pill{display:inline-block;padding:6px 14px;border:1px solid rgba(234,88,12,.45);background:var(--card);color:var(--ord);border-radius:99px;font-size:13px;font-weight:600}
// .ilm .hero h1{font-size:clamp(28px,4.4vw,48px);line-height:1.15;font-weight:600;margin:18px 0;letter-spacing:-.02em;animation:ilm-rise .9s cubic-bezier(.2,.8,.2,1) both}
// .ilm .hero p{color:var(--mut);font-size:clamp(16px,1.6vw,18px);max-width:520px;animation:ilm-rise .9s .15s cubic-bezier(.2,.8,.2,1) both}
// .ilm .cta-row{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap;animation:ilm-rise .9s .3s cubic-bezier(.2,.8,.2,1) both}
// @keyframes ilm-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
// .ilm .btn{padding:13px 24px;border-radius:12px;font-weight:600;font-size:15px;border:1px solid transparent;transition:transform .2s,box-shadow .2s}
// .ilm .btn:hover{transform:translateY(-2px)}
// .ilm .btn.primary{background:var(--or);color:#fff;box-shadow:0 8px 22px rgba(249,115,22,.35)}
// .ilm .btn.ghost{background:var(--card);color:var(--tx);border-color:var(--line)}
// .ilm .btn.big{padding:16px 34px;font-size:17px}
// .ilm .stage{position:relative;height:clamp(300px,50vw,460px);perspective:1100px;display:flex;align-items:center;justify-content:center;touch-action:pan-y}
// .ilm .glow{position:absolute;width:min(340px,80%);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.26),transparent 70%);filter:blur(20px)}
// .ilm .stack{--u:clamp(30px,9vw,62px);position:relative;width:clamp(150px,44vw,230px);aspect-ratio:1;transform-style:preserve-3d;transition:transform .25s ease-out}
// .ilm .plate{position:absolute;inset:0;transform-style:preserve-3d;transform:translateZ(calc(var(--n)*var(--u)));border-radius:clamp(14px,3vw,22px);border:2px solid var(--c);background:linear-gradient(135deg,color-mix(in srgb,var(--c) 26%,var(--card)),var(--card) 85%);box-shadow:0 10px 30px color-mix(in srgb,var(--c) 28%,transparent);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:clamp(10px,2.4vw,16px);color:var(--tx);animation:ilm-bob 4s ease-in-out infinite;animation-delay:var(--d);transition:filter .2s,box-shadow .2s}
// .ilm .plate.hot{filter:saturate(1.3);box-shadow:0 0 44px var(--c)}
// .ilm .plate-label{font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-weight:700;font-size:clamp(13px,3.4vw,17px)}
// .ilm .plate-count{font-size:12px;color:var(--mut)}
// @keyframes ilm-bob{0%,100%{translate:0 0 0}50%{translate:0 0 12px}}
// .ilm .stage-hint{position:absolute;bottom:0;margin:0;font-size:13px;color:var(--mut);text-align:center}
// .ilm .stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--line)}
// .ilm .stats div{padding:clamp(18px,3vw,30px) 10px;text-align:center}
// .ilm .stats b{display:block;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-size:clamp(26px,4vw,38px);color:var(--or)}
// .ilm .stats div>span{color:var(--mut);font-size:14px}
// .ilm .sec{padding-top:clamp(56px,8vw,96px);padding-bottom:clamp(56px,8vw,96px)}
// .ilm .sec h2,.ilm .final h2{font-size:clamp(24px,3vw,34px);font-weight:600;letter-spacing:-.01em;line-height:1.2}
// .ilm .sub{color:var(--mut);max-width:600px;margin:10px 0 36px;font-size:clamp(15px,1.5vw,17px)}
// .ilm .sub.center{text-align:center;margin:30px auto 0;font-size:14px}
// .ilm .stairs{display:grid;grid-template-columns:repeat(5,1fr);gap:20px;perspective:1200px;align-items:end}
// .ilm .step{all:unset;cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;gap:14px;opacity:0;transform:rotateX(25deg) translateY(50px);transition:opacity .8s,transform .8s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.15s)}
// .ilm .stairs.in .step{opacity:1;transform:none}
// .ilm .step:focus-visible{outline:2px solid var(--or);outline-offset:4px;border-radius:12px}
// .ilm .step-top small{color:var(--c);font-weight:600}
// .ilm .step-top strong{display:block;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-size:18px;font-weight:600;margin:2px 0 6px}
// .ilm .step-top p{margin:0;color:var(--mut);font-size:14px}
// .ilm .step-block{height:var(--h);border-radius:14px;background:linear-gradient(160deg,color-mix(in srgb,var(--c) 32%,var(--card)),var(--card));border:1px solid var(--c);box-shadow:10px 10px 0 color-mix(in srgb,var(--c) 22%,transparent);display:flex;align-items:flex-end;padding:14px;font-weight:600;font-size:14px;transition:transform .25s}
// .ilm .step:hover .step-block{transform:translate(-4px,-6px)}
// .ilm .tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
// .ilm .tabs button{background:var(--cream);color:var(--mut);border:1px solid var(--line);border-radius:99px;padding:9px 18px;font-size:14px;font-weight:500;transition:.2s}
// .ilm .tabs button em{font-style:normal;margin-left:8px;opacity:.7}
// .ilm .tabs button.on{background:var(--or);color:#fff;border-color:var(--or)}
// .ilm .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:26px;perspective:1400px}
// .ilm .card-wrap{opacity:0;transform:translateY(40px) rotateX(-12deg);transition:opacity .7s,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.1s)}
// .ilm .card-wrap.in{opacity:1;transform:none}
// .ilm .card-tilt{transition:transform .15s ease-out;transform-style:preserve-3d}
// .ilm .card{position:relative;height:360px;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.3,.8,.2,1)}
// .ilm .card.flip{transform:rotateY(180deg)}
// .ilm .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:18px;padding:22px;background:var(--face);border:1px solid color-mix(in srgb,var(--c) 45%,var(--line));box-shadow:0 14px 30px rgba(120,80,40,.16);display:flex;flex-direction:column;pointer-events:none}
// .ilm .face::before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:4px;border-radius:0 4px 4px 0;background:var(--c)}
// .ilm .front{transform:translateZ(1px)}
// .ilm .back{transform:rotateY(180deg) translateZ(1px);overflow:auto}
// .ilm .card:not(.flip) .front,.ilm .card.flip .back{pointer-events:auto}
// .ilm .tag{align-self:flex-start;font-size:12px;font-weight:600;color:var(--c);border:1px solid var(--c);padding:3px 10px;border-radius:99px;background:var(--card)}
// .ilm .front h3{font-size:clamp(16px,1.7vw,19px);font-weight:600;line-height:1.25;margin:16px 0 6px}
// .ilm .code{color:var(--mut);font-size:14px}
// .ilm .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:auto;padding:14px 0}
// .ilm .meta b{display:block;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-size:16px}
// .ilm .meta span{font-size:12px;color:var(--mut)}
// .ilm .front-actions,.ilm .back-actions{display:flex;justify-content:space-between;align-items:center;gap:10px}
// .ilm .back-actions{margin-top:auto;padding-top:12px}
// .ilm .flip-btn{background:var(--card);border:1px solid var(--line);color:var(--tx);border-radius:10px;padding:10px 14px;font-size:14px;font-weight:500;transition:.2s;min-height:40px}
// .ilm .flip-btn:hover{border-color:var(--c);color:var(--c)}
// .ilm a.guide{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:10px 14px;border-radius:10px;background:var(--c);color:#fff;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:transform .2s,filter .2s}
// .ilm a.guide:hover{transform:translateY(-2px);filter:brightness(1.08)}
// .ilm .back h4{font-size:12px;color:var(--c);margin:10px 0 3px;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-weight:600}
// .ilm .back h4:first-child{margin-top:0}
// .ilm .back p{margin:0;font-size:14px;color:var(--tx2)}
// .ilm .chips{display:flex;flex-wrap:wrap;gap:6px}
// .ilm .chips i{font-style:normal;font-size:12px;padding:3px 9px;border-radius:8px;background:color-mix(in srgb,var(--c) 14%,var(--card));color:var(--tx2);border:1px solid color-mix(in srgb,var(--c) 25%,var(--card))}
// .ilm .cubes{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;perspective:1000px;margin-top:36px}
// .ilm .cube-scene{height:200px;cursor:pointer;opacity:0;transform:translateY(40px);transition:opacity .7s,transform .7s;transition-delay:calc(var(--i)*.12s)}
// .ilm .cubes.in .cube-scene{opacity:1;transform:none}
// .ilm .cube{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:translateZ(-100px);transition:transform .8s cubic-bezier(.3,.8,.2,1)}
// .ilm .cube-scene.on .cube,.ilm .cube-scene:focus-visible .cube{transform:translateZ(-100px) rotateX(-90deg)}
// @media(hover:hover){.ilm .cube-scene:hover .cube{transform:translateZ(-100px) rotateX(-90deg)}}
// .ilm .cf{position:absolute;inset:0;border-radius:16px;padding:22px;display:flex;align-items:flex-start;border:1px solid var(--line);background:var(--card);backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 12px 26px rgba(120,80,40,.14)}
// .ilm .cf h3{font-size:clamp(17px,1.8vw,19px);font-weight:600;line-height:1.3}
// .ilm .cf p{margin:0;font-size:14.5px;color:#fff}
// .ilm .f1{transform:rotateX(0) translateZ(100px)}
// .ilm .f2{transform:rotateX(90deg) translateZ(100px);background:linear-gradient(150deg,#f97316,#c2410c);border-color:var(--or)}
// .ilm .final{text-align:center;padding-top:clamp(64px,9vw,100px);padding-bottom:clamp(64px,9vw,100px);background:radial-gradient(ellipse at 50% 0,rgba(249,115,22,.14),transparent 65%),var(--white)}
// .ilm .final p{color:var(--mut);margin:12px 0 28px;font-size:clamp(16px,1.6vw,18px)}
// @media(min-width:1600px){.ilm{--w:1360px}}
// @media(max-width:1100px){.ilm .hero{gap:16px}
// .ilm .stairs,.ilm .cubes{gap:16px}
// .ilm .step-top strong{font-size:18px}}
// @media(max-width:900px){.ilm .hero{grid-template-columns:1fr;text-align:center}
// .ilm .hero p{margin-left:auto;margin-right:auto}
// .ilm .cta-row{justify-content:center;position:relative;z-index:2}
// .ilm .stage{margin-top:64px;height:360px}
// .ilm .stairs,.ilm .cubes{grid-template-columns:repeat(2,1fr)}
// .ilm .stairs .step:last-child{grid-column:1/-1}
// .ilm .stats{grid-template-columns:repeat(2,1fr)}
// .ilm .stats div{border-bottom:1px solid var(--line)}
// .ilm .sub{max-width:none}}
// @media(max-width:768px){.ilm .card{height:370px}}
// @media(max-width:560px){.ilm .stairs,.ilm .cubes{grid-template-columns:1fr}
// .ilm .step-block{height:calc(var(--h)*.55)}
// .ilm .card{height:390px}
// .ilm .tabs{flex-wrap:nowrap;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 6px;-webkit-overflow-scrolling:touch}
// .ilm .tabs button{flex:0 0 auto}
// .ilm .btn{flex:1 1 100%;text-align:center}
// .ilm .front-actions{flex-wrap:wrap}}
// @media(max-width:380px){.ilm .face{padding:18px}
// .ilm .card{height:410px}
// .ilm .meta b{font-size:14px}}
// @media(prefers-reduced-motion:reduce){.ilm *{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}}
// .ilm .filters{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:-8px 0 28px}
// .ilm .filters label{font-size:14px;font-weight:600;color:var(--mut)}
// .ilm .cat{background:var(--cream);color:var(--tx);border:1px solid var(--line);border-radius:10px;padding:10px 14px;font-size:14px;font-family:inherit;min-height:42px;max-width:100%}
// .ilm .found{font-size:14px;color:var(--mut)}
// .ilm .more{display:flex;justify-content:center;margin-top:34px}
// .ilm.dark{--cream:#0c0c14;--white:#0f0f18;--card:#13131e;--tx:#f1f5f9;--tx2:#cbd5e1;--mut:#94a3b8;--line:rgba(255,255,255,.1)}
// `;
















"use client";
// MicrosoftBrowser.jsx — 128 Microsoft credentials: search, filters, sort, pagination + full detail page.
// Add-on section for the ILM ORA Microsoft page. Render it INSIDE <PublicLayout> / inside the .ilm wrapper so dark mode works.
// Usage:  import MicrosoftBrowser from "./MicrosoftBrowser";   ...   <MicrosoftBrowser />
import { useEffect, useMemo, useRef, useState } from "react";

// Same shared shell (AnnouncementBanner, Navbar, Footer) used by StudyAbroad, Careers, About etc.
// Adjust this path to match where you save this file.
import PublicLayout from "../Landing/components/PublicLayout";


// type|title|product|role|level|code
const RAW = `E|AB-100: Agentic AI Business Solutions Architect|Microsoft Power Platform|Solution Architect|Advanced|AB-100
E|AB-650: Administering Microsoft 365 and AI Services (beta)|Microsoft Agent 365|Administrator|Intermediate|AB-650
E|AI-102: Designing and Implementing a Microsoft Azure AI Solution|Azure|AI Engineer|Intermediate|AI-102
E|AI-103: Developing AI Apps and Agents on Azure|Azure|AI Engineer|Intermediate|AI-103
E|AI-500: Designing and Implementing Multi-Agent AI Solutions|Azure AI Edge|AI Engineer|Advanced|AI-500
E|AZ-104: Administering Microsoft Azure|Azure|Administrator|Intermediate|AZ-104
E|AZ-204: Developing Solutions for Microsoft Azure|Azure|Developer|Intermediate|AZ-204
E|AZ-305: Designing Microsoft Azure Infrastructure Solutions|Azure|Solution Architect|Advanced|AZ-305
E|AZ-400: Designing and Implementing Microsoft DevOps Solutions|Azure|DevOps Engineer|Advanced|AZ-400
E|AZ-500: Microsoft Azure Security Technologies|Azure|Security Engineer|Intermediate|AZ-500
E|AZ-700: Designing and Implementing Microsoft Azure Networking Solutions|Azure|Network Engineer|Intermediate|AZ-700
E|AZ-801: Configuring Windows Server Hybrid Advanced Services|Windows Server|Administrator|Advanced|AZ-801
E|AZ-802: Administering Windows Server|Windows Server|Administrator|Intermediate|AZ-802
E|DP-203: Data Engineering on Microsoft Azure|Azure|Data Engineer|Intermediate|DP-203
E|DP-300: Administering Microsoft Azure SQL Solutions|Azure|Database Administrator|Intermediate|DP-300
E|DP-600: Implementing Analytics Solutions Using Microsoft Fabric|Microsoft Fabric|Data Analyst|Intermediate|DP-600
E|DP-700: Implementing Data Engineering Solutions Using Microsoft Fabric|Microsoft Fabric|Data Engineer|Intermediate|DP-700
E|MD-102: Endpoint Administrator|Microsoft 365|Administrator|Intermediate|MD-102
E|MS-102: Microsoft 365 Administrator|Microsoft 365|Administrator|Advanced|MS-102
E|PL-200: Power Platform Functional Consultant|Microsoft Power Platform|Functional Consultant|Intermediate|PL-200
E|PL-300: Power BI Data Analyst|Microsoft Power Platform|Data Analyst|Intermediate|PL-300
E|PL-400: Power Platform Developer|Microsoft Power Platform|Developer|Intermediate|PL-400
E|PL-600: Power Platform Solution Architect|Microsoft Power Platform|Solution Architect|Advanced|PL-600
E|SC-200: Microsoft Security Operations Analyst|Microsoft Defender|Security Operations Analyst|Intermediate|SC-200
E|SC-300: Microsoft Identity and Access Administrator|Microsoft Entra|Identity and Access Administrator|Intermediate|SC-300
E|SC-401: Administering Information Security in Microsoft 365|Microsoft Purview|Information Protection and Compliance Administrator|Intermediate|SC-401
E|AI-900: Microsoft Azure AI Fundamentals|Azure|AI Engineer|Beginner|AI-900
E|AZ-900: Microsoft Azure Fundamentals|Azure|Administrator|Beginner|AZ-900
E|DP-900: Microsoft Azure Data Fundamentals|Azure|Data Engineer|Beginner|DP-900
E|MS-900: Microsoft 365 Fundamentals|Microsoft 365|Administrator|Beginner|MS-900
E|PL-900: Microsoft Power Platform Fundamentals|Microsoft Power Platform|Functional Consultant|Beginner|PL-900
E|SC-900: Microsoft Security, Compliance, and Identity Fundamentals|Microsoft Entra|Security Engineer|Beginner|SC-900
E|MB-210: Microsoft Dynamics 365 Sales|Dynamics 365|Functional Consultant|Intermediate|MB-210
E|MB-310: Microsoft Dynamics 365 Finance|Dynamics 365|Functional Consultant|Intermediate|MB-310
E|MB-500: Microsoft Dynamics 365 Finance and Operations Developer|Dynamics 365|Developer|Intermediate|MB-500
E|MS-700: Managing Microsoft Teams|Microsoft 365|Administrator|Intermediate|MS-700
E|GH-100: GitHub Administration|GitHub|Administrator|Intermediate|GH-100
E|GH-200: GitHub Actions|GitHub|DevOps Engineer|Intermediate|GH-200
E|GH-300: GitHub Copilot|GitHub|Developer|Intermediate|GH-300
E|GH-500: GitHub Advanced Security|GitHub|Security Engineer|Intermediate|GH-500
C|GitHub Actions|GitHub|DevOps Engineer|Intermediate|GH-200
C|GitHub Administration|GitHub|Administrator|Intermediate|GH-100
C|GitHub Advanced Security|GitHub|Administrator|Intermediate|GH-500
C|GitHub Certified: Agentic AI Developer|GitHub|Developer|Advanced|GH-AI
C|GitHub Copilot|GitHub|Developer|Intermediate|GH-300
C|GitHub Foundations|GitHub|Administrator|Beginner|GH-900
C|Azure Administrator Associate|Azure|Administrator|Intermediate|AZ-104
C|Azure Developer Associate|Azure|Developer|Intermediate|AZ-204
C|Azure Solutions Architect Expert|Azure|Solution Architect|Advanced|AZ-305
C|Azure DevOps Engineer Expert|Azure|DevOps Engineer|Advanced|AZ-400
C|Azure AI Engineer Associate|Azure|AI Engineer|Intermediate|AI-102
C|Azure Data Engineer Associate|Azure|Data Engineer|Intermediate|DP-203
C|Azure Security Engineer Associate|Azure|Security Engineer|Intermediate|AZ-500
C|Microsoft 365 Administrator Expert|Microsoft 365|Administrator|Advanced|MS-102
C|Power BI Data Analyst Associate|Microsoft Power Platform|Data Analyst|Intermediate|PL-300
C|Power Platform Developer Associate|Microsoft Power Platform|Developer|Intermediate|PL-400
C|Fabric Analytics Engineer Associate|Microsoft Fabric|Data Analyst|Intermediate|DP-600
C|Fabric Data Engineer Associate|Microsoft Fabric|Data Engineer|Intermediate|DP-700
C|Security Operations Analyst Associate|Microsoft Defender|Security Operations Analyst|Intermediate|SC-200
C|Identity and Access Administrator Associate|Microsoft Entra|Identity and Access Administrator|Intermediate|SC-300
C|Information Security Administrator Associate|Microsoft Purview|Information Protection and Compliance Administrator|Intermediate|SC-401
C|Dynamics 365 Sales Functional Consultant Associate|Dynamics 365|Functional Consultant|Intermediate|MB-210
C|Azure Fundamentals|Azure|Administrator|Beginner|AZ-900
C|Azure AI Fundamentals|Azure|AI Engineer|Beginner|AI-900
C|Azure Data Fundamentals|Azure|Data Engineer|Beginner|DP-900
C|Microsoft 365 Fundamentals|Microsoft 365|Administrator|Beginner|MS-900
C|Security, Compliance, and Identity Fundamentals|Microsoft Entra|Security Engineer|Beginner|SC-900
C|Power Platform Fundamentals|Microsoft Power Platform|Functional Consultant|Beginner|PL-900
C|Windows Server Hybrid Administrator Associate|Windows Server|Administrator|Intermediate|AZ-801
C|Microsoft 365 Copilot Administrator|Microsoft Copilot|Administrator|Intermediate|MS-CP
E|AZ-140: Configuring and Operating Microsoft Azure Virtual Desktop|Azure|Administrator|Intermediate|AZ-140
E|AZ-120: Planning and Administering Microsoft Azure for SAP Workloads|Azure|Administrator|Advanced|AZ-120
E|AZ-600: Configuring and Operating a Hybrid Cloud with Azure Stack Hub|Azure|Administrator|Advanced|AZ-600
E|AZ-720: Troubleshooting Microsoft Azure Connectivity|Azure|Support Engineer|Intermediate|AZ-720
E|DP-100: Designing and Implementing a Data Science Solution on Azure|Azure|Data Scientist|Intermediate|DP-100
E|DP-420: Designing and Implementing Cloud-Native Applications Using Azure Cosmos DB|Azure|Developer|Intermediate|DP-420
E|PL-100: Microsoft Power Platform App Maker|Microsoft Power Platform|Business User|Beginner|PL-100
E|PL-500: Microsoft Power Automate RPA Developer|Microsoft Power Platform|Developer|Intermediate|PL-500
E|MB-230: Microsoft Dynamics 365 Customer Service Functional Consultant|Dynamics 365|Functional Consultant|Intermediate|MB-230
E|MB-240: Microsoft Dynamics 365 Field Service|Dynamics 365|Functional Consultant|Intermediate|MB-240
E|MB-260: Microsoft Customer Data Platform Specialist|Dynamics 365|Functional Consultant|Intermediate|MB-260
E|MB-280: Microsoft Dynamics 365 Customer Experience Analyst|Dynamics 365|Business Analyst|Intermediate|MB-280
E|MB-300: Microsoft Dynamics 365: Core Finance and Operations|Dynamics 365|Functional Consultant|Intermediate|MB-300
E|MB-330: Microsoft Dynamics 365 Supply Chain Management|Dynamics 365|Functional Consultant|Intermediate|MB-330
E|MB-335: Microsoft Dynamics 365 Supply Chain Management Expert|Dynamics 365|Functional Consultant|Advanced|MB-335
E|MB-700: Microsoft Dynamics 365: Finance and Operations Apps Solution Architect|Dynamics 365|Solution Architect|Advanced|MB-700
E|MB-800: Microsoft Dynamics 365 Business Central Functional Consultant|Dynamics 365|Functional Consultant|Intermediate|MB-800
E|MB-820: Microsoft Dynamics 365 Business Central Developer|Dynamics 365|Developer|Intermediate|MB-820
E|MB-910: Microsoft Dynamics 365 Fundamentals (CRM)|Dynamics 365|Functional Consultant|Beginner|MB-910
E|MB-920: Microsoft Dynamics 365 Fundamentals (ERP)|Dynamics 365|Functional Consultant|Beginner|MB-920
E|SC-100: Microsoft Cybersecurity Architect|Microsoft Defender|Solution Architect|Advanced|SC-100
E|SC-400: Microsoft Information Protection Administrator|Microsoft Purview|Information Protection and Compliance Administrator|Intermediate|SC-400
E|MS-721: Collaboration Communications Systems Engineer|Microsoft Teams|Administrator|Intermediate|MS-721
E|MS-740: Troubleshooting Microsoft Teams|Microsoft Teams|Support Engineer|Intermediate|MS-740
E|AB-730: AI Business Professional|Microsoft Copilot|Business User|Beginner|AB-730
E|AB-731: AI Transformation Leader|Microsoft Copilot|Business User|Beginner|AB-731
E|AB-900: Microsoft 365 Copilot and Agent Administration Fundamentals|Microsoft Copilot|Administrator|Beginner|AB-900
E|GH-900: GitHub Foundations|GitHub|Administrator|Beginner|GH-900
C|Azure Network Engineer Associate|Azure|Network Engineer|Intermediate|AZ-700
C|Azure Virtual Desktop Specialty|Azure|Administrator|Intermediate|AZ-140
C|Azure for SAP Workloads Specialty|Azure|Administrator|Advanced|AZ-120
C|Azure Cosmos DB Developer Specialty|Azure|Developer|Intermediate|DP-420
C|Azure Database Administrator Associate|Azure|Database Administrator|Intermediate|DP-300
C|Azure Data Scientist Associate|Azure|Data Scientist|Intermediate|DP-100
C|Power Platform App Maker Associate|Microsoft Power Platform|Business User|Beginner|PL-100
C|Power Automate RPA Developer Associate|Microsoft Power Platform|Developer|Intermediate|PL-500
C|Power Platform Functional Consultant Associate|Microsoft Power Platform|Functional Consultant|Intermediate|PL-200
C|Power Platform Solution Architect Expert|Microsoft Power Platform|Solution Architect|Advanced|PL-600
C|Dynamics 365 Customer Service Functional Consultant Associate|Dynamics 365|Functional Consultant|Intermediate|MB-230
C|Dynamics 365 Field Service Functional Consultant Associate|Dynamics 365|Functional Consultant|Intermediate|MB-240
C|Dynamics 365 Customer Experience Analyst Associate|Dynamics 365|Business Analyst|Intermediate|MB-280
C|Dynamics 365 Finance and Operations Apps Developer Associate|Dynamics 365|Developer|Intermediate|MB-500
C|Dynamics 365 Finance Functional Consultant Associate|Dynamics 365|Functional Consultant|Intermediate|MB-310
C|Dynamics 365 Supply Chain Management Functional Consultant Associate|Dynamics 365|Functional Consultant|Intermediate|MB-330
C|Dynamics 365 Supply Chain Management Functional Consultant Expert|Dynamics 365|Functional Consultant|Advanced|MB-335
C|Dynamics 365 Finance and Operations Apps Solution Architect Expert|Dynamics 365|Solution Architect|Advanced|MB-700
C|Dynamics 365 Business Central Functional Consultant Associate|Dynamics 365|Functional Consultant|Intermediate|MB-800
C|Dynamics 365 Business Central Developer Associate|Dynamics 365|Developer|Intermediate|MB-820
C|Dynamics 365 Fundamentals (CRM)|Dynamics 365|Functional Consultant|Beginner|MB-910
C|Dynamics 365 Fundamentals (ERP)|Dynamics 365|Functional Consultant|Beginner|MB-920
C|Cybersecurity Architect Expert|Microsoft Defender|Solution Architect|Advanced|SC-100
C|Information Protection and Compliance Administrator Associate|Microsoft Purview|Information Protection and Compliance Administrator|Intermediate|SC-400
C|Teams Administrator Associate|Microsoft Teams|Administrator|Intermediate|MS-700
C|Collaboration Communications Systems Engineer Associate|Microsoft Teams|Administrator|Intermediate|MS-721
C|Endpoint Administrator Associate|Microsoft 365|Administrator|Intermediate|MD-102
C|AI Business Professional|Microsoft Copilot|Business User|Beginner|AB-730
C|AI Transformation Leader|Microsoft Copilot|Business User|Beginner|AB-731
C|Copilot and Agent Administration Fundamentals|Microsoft Copilot|Administrator|Beginner|AB-900`;

const SK = {
"AZ-104":[["Manage Azure identities and governance","20–25%"],["Implement and manage storage","15–20%"],["Deploy and manage Azure compute resources","20–25%"],["Implement and manage virtual networking","15–20%"],["Monitor and maintain Azure resources","10–15%"]],
"AZ-900":[["Describe cloud concepts","25–30%"],["Describe Azure architecture and services","35–40%"],["Describe Azure management and governance","30–35%"]],
"AZ-204":[["Develop Azure compute solutions","25–30%"],["Develop for Azure storage","15–20%"],["Implement Azure security","15–20%"],["Monitor and optimize solutions","5–10%"],["Connect to and consume Azure services","20–25%"]],
"AZ-305":[["Design identity, governance and monitoring solutions","25–30%"],["Design data storage solutions","20–25%"],["Design business continuity solutions","15–20%"],["Design infrastructure solutions","30–35%"]],
"AZ-400":[["Design and implement processes and communications","10–15%"],["Design and implement a source control strategy","10–15%"],["Design and implement build and release pipelines","50–55%"],["Develop a security and compliance plan","10–15%"],["Implement an instrumentation strategy","5–10%"]],
"AI-900":[["Describe AI workloads and considerations","15–20%"],["Fundamental principles of machine learning","15–20%"],["Computer vision workloads","15–20%"],["Natural language processing workloads","15–20%"],["Generative AI workloads","20–25%"]],
"PL-300":[["Prepare the data","25–30%"],["Model the data","25–30%"],["Visualize and analyze the data","25–30%"],["Manage and secure Power BI","15–20%"]],
"SC-200":[["Mitigate threats using Microsoft Defender XDR","25–30%"],["Mitigate threats using Defender for Cloud","15–20%"],["Mitigate threats using Microsoft Sentinel","50–55%"]],
"SC-300":[["Implement identities in Microsoft Entra ID","20–25%"],["Implement authentication and access management","25–30%"],["Plan and implement workload identities","20–25%"],["Plan and automate identity governance","20–25%"]]};

const DATA = RAW.split("\n").map((l, i) => {
  const [t, n, p, r, v, c] = l.split("|");
  return { id: i, ex: t === "E", n: (t === "E" ? "Exam " : "") + n, p, r, v, c };
});
const PRODUCTS = [...new Set(DATA.map((d) => d.p))].sort();
const ROLES = [...new Set(DATA.map((d) => d.r))].sort();
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const PER = 16;
const blank = { q: "", p: [], r: [], v: [], t: [], sort: "az", page: 1 };
// Locale-independent compare: server (Node) and browser must sort identically or React hydration fails.
const cmp = (x, y) => { const a = x.toLowerCase(), b = y.toLowerCase(); return a < b ? -1 : a > b ? 1 : 0; };
const toggle = (a, v) => (a.includes(v) ? a.filter((x) => x !== v) : [...a, v]);

const skillsOf = (d) =>
  SK[d.c] || [
    ["Plan and design " + d.p + " solutions", "20–25%"],
    ["Implement and configure " + d.p + " services", "25–30%"],
    ["Manage and secure the environment as a " + d.r, "20–25%"],
    ["Monitor, optimize and troubleshoot", "15–20%"],
    ["Integrate with related Microsoft services", "10–15%"],
  ];

/* ---------- motion helpers (client-only effects, SSR-safe) ---------- */
function Reveal({ children, i = 0 }) {
  const r = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = r.current;
    if (!el || typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={r} className={"msb-rev" + (on ? " in" : "")} style={{ "--d": i * 70 + "ms" }}>{children}</div>;
}
function Tilt({ children, max = 9 }) {
  const r = useRef(null);
  const set = (rx, ry, mx, my) => { const st = r.current.style; st.setProperty("--rx", rx + "deg"); st.setProperty("--ry", ry + "deg"); st.setProperty("--mx", mx + "%"); st.setProperty("--my", my + "%"); };
  const mv = (e) => { const b = r.current.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5; set(-y * max, x * max, (x + 0.5) * 100, (y + 0.5) * 100); };
  return <div ref={r} className="msb-tilt" onPointerMove={mv} onPointerLeave={() => set(0, 0, 50, 50)}>{children}</div>;
}
function Count({ to }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, t0;
    const step = (t) => { t0 = t0 || t; const p = Math.min((t - t0) / 1100, 1); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n}</>;
}

function Badge({ d }) {
  return (<div className="msb-b3d"><BadgeSvg d={d} /><i className="msb-gloss" /></div>);
}
function BadgeSvg({ d }) {
  return (
    <svg width="84" height="98" viewBox="0 0 84 98" aria-hidden="true" className="msb-badge-lg">
      <path d="M4 8Q4 4 8 4H76Q80 4 80 8V58Q80 82 42 94Q4 82 4 58Z" fill="#0b2a5b" />
      <path d="M10 28H74V58Q74 77 42 88Q10 77 10 58Z" fill="#0067b8" />
      <text x="42" y="20" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">Microsoft</text>
      <text x="42" y="60" fontSize={d.ex ? 17 : 10} fontWeight="700" fill="#fff" textAnchor="middle">
        {d.ex ? "EXAM" : "CERTIFICATION"}
      </text>
    </svg>
  );
}

function Card({ d, saved, onSave, onOpen, i = 0 }) {
  const on = saved.includes(d.id);
  return (
    <Reveal i={i}><Tilt>
    <div className="msb-card" onClick={() => onOpen(d.id)} role="link" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(d.id)}>
      <div className="msb-tp">{d.ex ? "EXAM" : "CERTIFICATION"}</div>
      <div className="msb-row">
        <h4>{d.n}</h4>
        <div className={"msb-badge" + (d.ex ? "" : " c")}>{d.ex ? "EXAM" : "CERT"}</div>
      </div>
      <div className="msb-meta">{d.p} • {d.r} • {d.v}</div>
      <button className={"msb-add" + (on ? " on" : "")} onClick={(e) => { e.stopPropagation(); onSave(d.id); }}>
        {on ? "✓ Added" : "⊕ Add"}
      </button>
    </div>
    </Tilt></Reveal>
  );
}

function BrowsePage({ go, initialRoute = null }) {
  const [route, setRoute] = useState(initialRoute);
  const [f, setF] = useState(blank);
  const [input, setInput] = useState("");
  const [pf, setPf] = useState("");
  const [rf, setRf] = useState("");
  const [saved, setSaved] = useState([]);
  const [open, setOpen] = useState(false);

  const rootRef = useRef(null);
  const toTop = () => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const openCard = (id) => { setRoute(id); setTimeout(toTop, 0); };
  const goHome = (e) => { e && e.preventDefault(); setRoute(null); setTimeout(toTop, 0); };

  const results = useMemo(() => {
    const q = f.q.toLowerCase();
    return DATA.filter(
      (d) =>
        (!q || (d.n + d.p + d.r + d.c).toLowerCase().includes(q)) &&
        (!f.p.length || f.p.includes(d.p)) &&
        (!f.r.length || f.r.includes(d.r)) &&
        (!f.v.length || f.v.includes(d.v)) &&
        (!f.t.length || f.t.includes(d.ex ? "Exam" : "Certification"))
    ).sort((a, b) => (f.sort === "az" ? cmp(a.n, b.n) : cmp(b.n, a.n)));
  }, [f]);

  const pages = Math.max(1, Math.ceil(results.length / PER));
  const page = Math.min(f.page, pages);
  const set = (patch) => setF((s) => ({ ...s, page: 1, ...patch }));
  const save = (id) => setSaved((s) => toggle(s, id));
  const goFilter = (g, v) => (e) => { e.preventDefault(); setF({ ...blank, [g]: [v] }); setInput(""); setRoute(null); setTimeout(toTop, 0); };

  const Check = ({ g, v }) => (
    <label className="msb-check">
      <input type="checkbox" checked={f[g].includes(v)} onChange={() => set({ [g]: toggle(f[g], v) })} />
      {v}
    </label>
  );

  /* ---------------- DETAIL PAGE ---------------- */
  if (route !== null && DATA[route]) {
    const d = DATA[route];
    const F = d.v === "Beginner";
    const beta = /beta/i.test(d.n);
    const pair = DATA.find((x) => x.id !== d.id && x.c === d.c && x.ex !== d.ex);
    const rel = DATA.filter((x) => x.id !== d.id && x !== pair && (x.p === d.p || x.r === d.r)).slice(0, 4);
    const on = saved.includes(d.id);
    const who = {
      Beginner: "No prior experience needed. A good first step into " + d.p + ".",
      Intermediate: "Hands-on experience with " + d.p + " and a working knowledge of related services.",
      Advanced: "Several years as a " + d.r + " and one or more earlier associate-level credentials.",
    }[d.v];
    return (
      <section className="msb" id="ms-browse" ref={rootRef}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="msb-dh">
          <div className="msb-wrap">
            <div className="msb-crumb">
              <a href="#ms-browse" onClick={goHome}>Credentials</a> / <a href="#ms-browse" onClick={goFilter("t", d.ex ? "Exam" : "Certification")}>{d.ex ? "Exams" : "Certifications"}</a> / {d.c}
            </div>
            <Badge d={d} />
            <div className="msb-eb">{d.ex ? "EXAMS" : "CERTIFICATIONS"}</div>
            <h1>{d.n}</h1>
          </div>
        </div>
        <div className="msb-wrap msb-det">
          <p>As a candidate for this {d.ex ? "exam" : "certification"}, you work as a {d.r} and you plan, configure, manage and secure solutions built on {d.p}. You help your organization get reliable, secure and cost-aware results, and keep those solutions running well as needs change.</p>
          <p>In this role you work closely with architects, developers, security teams and other administrators, so your {d.p} work fits with identity, networking, data, compliance and applications across the organization.</p>
          <p>{F ? "You do not need earlier experience. A basic understanding of IT and cloud ideas is enough to start." : "You should have hands-on experience with " + d.p + ", and be comfortable with the portal, command-line tools and automation scripts used in the " + d.r + " role."}</p>
          <div className="msb-note">
            <b>{beta ? "This exam is in beta." : "Good to know."}</b>
            <p>{beta ? "Beta exams may have extra questions, and results are released after the beta closes. Passing a beta exam still counts toward the credential." : "Skills measured and policies change from time to time. Check the official page before you book."}</p>
          </div>
          <p>
            <a className="msb-pill" href="#ms-browse" onClick={goFilter("p", d.p)}>{d.p}</a>
            <a className="msb-pill" href="#ms-browse" onClick={goFilter("r", d.r)}>{d.r}</a>
            <a className="msb-pill" href="#ms-browse" onClick={goFilter("v", d.v)}>{d.v}</a>
          </p>
          <button className="msb-btn" onClick={() => save(d.id)}>{on ? "✓ Added to my list" : "⊕ Add to my list"}</button>{" "}
          <button className="msb-btn o" onClick={() => go("schedule", d.id)}>Schedule exam</button>

          <div className="msb-facts">
            {[["Level", d.v], ["Role", d.r], ["Product", d.p], ["Duration", (F ? 45 : 100) + " minutes"], ["Passing score", "700 / 1000"],
              ["Price", "from ~$" + (F ? 99 : 165) + " USD"], ["Languages", "English, Hindi and 10+ more"], ["Renewal", "Free yearly online assessment"]].map(([k, v]) => (
              <div key={k}><b>{k}</b>{v}</div>
            ))}
          </div>

          {pair && <section><h3>{d.ex ? "Earns you this certification" : "Required exam"}</h3><div className="msb-rel"><Card d={pair} saved={saved} onSave={save} onOpen={openCard} /></div></section>}
          <section><h3>Skills measured</h3>
            {skillsOf(d).map(([n, w], i) => <Reveal key={n} i={i}><div className="msb-sk"><div className="msb-skt"><span>{n}</span><b>{w}</b></div><div className="msb-bar"><i style={{ "--w": parseInt(w.split("–")[1]) + "%" }} /></div></div></Reveal>)}
          </section>
          <section><h3>Who should take it</h3><p>{who}</p></section>
          <section><h3>Prerequisites</h3>
            <ul><li>{F ? "None. Basic IT awareness helps." : "Practical experience working with " + d.p + "."}</li>
              <li>{d.v === "Advanced" ? "An associate-level credential is recommended first." : "Fundamentals-level knowledge is enough to start."}</li></ul>
          </section>
          <section><h3>How to prepare</h3>
            <ol><li>Take the free self-paced learning path for {d.c} on Microsoft Learn.</li><li>Try the free practice assessment to find weak areas.</li>
              <li>Practice hands-on in a free {d.p} sandbox or trial.</li><li>Book the exam with Pearson VUE, online or at a test centre.</li></ol>
          </section>
          <section><h3>Exam policies</h3>
            <ul><li>Retake: wait 24 hours after the first attempt, 14 days after later ones.</li><li>Maximum 5 attempts per year.</li><li>Online proctoring needs a webcam, ID and a quiet room.</li></ul>
            <p className="msb-mut">Price, duration and skill weights are indicative. Confirm on the official page.</p>
          </section>
          <section><h3>Related credentials</h3>
            <div className="msb-rel">{rel.map((x, i) => <Card key={x.id} i={i} d={x} saved={saved} onSave={save} onOpen={openCard} />)}</div>
          </section>
        </div>
      </section>
    );
  }

  /* ---------------- BROWSE PAGE ---------------- */
  return (
    <div id="ms-browse" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section className="msb-hero">
        <div className="msb-hero-in">
          <h1>Browse Credentials</h1>
          <p>Learn new skills to boost your productivity and enable your organization to accomplish more with Microsoft Credentials.</p>
        </div>
        <Illus kind="keys" />
      </section>
      <div className="msb-statbar">{[[DATA.length, "Credentials"], [DATA.filter((d) => d.ex).length, "Exams"], [DATA.filter((d) => !d.ex).length, "Certifications"], [PRODUCTS.length, "Products"]].map(([n, l]) => <div key={l}><b><Count to={n} /></b><span>{l}</span></div>)}</div>
      <section className="msb msb-white">
      <div className="msb-wrap msb-layout">
        <aside>
          <button className="msb-fbtn" onClick={() => setOpen(!open)}>{open ? "Hide filters" : "Show filters"}</button>
          <div className={"msb-fs" + (open ? " open" : "")}>
            <h2>Filter</h2>
            <h3>Type</h3>
            {["Exam", "Certification"].map((v) => <Check key={v} g="t" v={v} />)}
            <h3>Products</h3>
            <input className="msb-in" placeholder="Find a product" value={pf} onChange={(e) => setPf(e.target.value)} />
            <div className="msb-fl">{PRODUCTS.filter((x) => x.toLowerCase().includes(pf.toLowerCase())).map((v) => <Check key={v} g="p" v={v} />)}</div>
            <h3>Roles</h3>
            <input className="msb-in" placeholder="Find a role" value={rf} onChange={(e) => setRf(e.target.value)} />
            <div className="msb-fl">{ROLES.filter((x) => x.toLowerCase().includes(rf.toLowerCase())).map((v) => <Check key={v} g="r" v={v} />)}</div>
            <h3>Level</h3>
            {LEVELS.map((v) => <Check key={v} g="v" v={v} />)}
            <button className="msb-clear" onClick={() => { setF(blank); setInput(""); }}>Clear all filters</button>
          </div>
        </aside>
        <main>
          <form className="msb-sr" onSubmit={(e) => { e.preventDefault(); set({ q: input }); }}>
            <input placeholder="Search" value={input} onChange={(e) => setInput(e.target.value)} />
            <button type="submit">Search</button>
          </form>
          <div className="msb-bar">
            <span className="msb-cnt">{results.length} results</span>
            <label>Sort by:{" "}
              <select value={f.sort} onChange={(e) => set({ sort: e.target.value })}>
                <option value="az">Alphabetical (A-Z)</option>
                <option value="za">Alphabetical (Z-A)</option>
              </select>
            </label>
          </div>
          {results.length ? (
            <>
              <div className="msb-grid">{results.slice((page - 1) * PER, page * PER).map((d, i) => <Card key={d.id} i={i % 4} d={d} saved={saved} onSave={save} onOpen={openCard} />)}</div>
              <div className="msb-pg">
                {Array.from({ length: pages }, (_, i) => (
                  <button key={i} className={i + 1 === page ? "cur" : ""} onClick={() => { setF({ ...f, page: i + 1 }); toTop(); }}>{i + 1}</button>
                ))}
              </div>
            </>
          ) : <div className="msb-empty">No results. Clear a filter or try a different search.</div>}
        </main>
      </div>
      </section>
    </div>
  );
}


/* =================== MICROSOFT LEARN SHELL (all links stay inside this site) =================== */
const MENUS = {
  docs: { label: "Documentation", cols: [
    ["All product documentation", "Azure documentation", "Dynamics 365 documentation", "Microsoft Copilot documentation", "Microsoft 365 documentation", "Power Platform documentation", "Code samples"],
    ["Troubleshooting documentation"]] },
  train: { label: "Training & Labs", cols: [
    ["All training", "Azure training", "Dynamics 365 training", "Microsoft Copilot training", "Microsoft 365 training", "Microsoft Power Platform training", "Labs"],
    ["Credentials", "Career paths"]] },
  qa: { label: "Q&A", cols: [
    ["Ask a question", "Azure questions", "Windows questions", "Microsoft 365 questions", "Microsoft Outlook questions", "Microsoft Teams questions", "Popular tags"],
    ["All questions"]] },
  topics: { label: "Topics", grid: [
    ["Agents", "Key concepts and resources for agentic computing"], ["Learn for Organizations", "Curated offerings to boost your team's technical skills"], ["Assessments", "Interactive guidance with custom recommendations"],
    ["Artificial intelligence", "Curated resources for AI fluency with apps and services"], ["Security", "Guidance to help you tackle security challenges"], ["Student hub", "Self-paced and interactive training for students"],
    ["DevOps", "DevOps practices, Git version control and Agile methods"], ["Startups hub", "Technical guidance to move toward enterprise readiness"], ["Educator center", "Resources for educators to bring technical innovation in their classroom"]] },
};
const Chev = ({ up }) => (<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style={{ transform: up ? "rotate(180deg)" : "none" }}><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>);

function MsChrome({ view, go }) {
  const [ban, setBan] = useState(true);
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const down = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    const key = (e) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", down);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
  }, []);
  const m = open && MENUS[open];
  const pick = (kind, title, desc) => { setOpen(null); title === "Credentials" ? go("browse") : go("page", { kind, title, desc }); };
  const tabs = [["browse", "Browse Credentials"], ["renewal", "Certification Renewals"], ["help", "FAQ & Help"]];
  return (
    <div className="msb-chrome" ref={ref}>
      {ban && (
        <div className="msb-ban">
          <span><b>Skills to secure:</b>Build practical skills that help protect yourself and your environment. <button className="msb-banlink" onClick={() => go("page", { kind: "topics", title: "Security", desc: "Guidance to help you tackle security challenges" })}>Get started ›</button></span>
          <button aria-label="Close banner" onClick={() => setBan(false)}>✕</button>
        </div>
      )}
      <div className="msb-hd">
        <button className="msb-brand" onClick={() => go("browse")} aria-label="Microsoft Learn home">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect width="11" height="11" fill="#f25022" /><rect x="13" width="11" height="11" fill="#7fba00" /><rect y="13" width="11" height="11" fill="#00a4ef" /><rect x="13" y="13" width="11" height="11" fill="#ffb900" /></svg>
          <i /><b>Learn</b>
        </button>
        <nav className="msb-nav" aria-label="Microsoft Learn">
          {Object.entries(MENUS).map(([k, v]) => (
            <button key={k} className={open === k ? "on" : ""} aria-expanded={open === k} onClick={() => setOpen(open === k ? null : k)}>{v.label} <Chev up={open === k} /></button>
          ))}
        </nav>
        {m && (
          <div className="msb-mega">
            <div className="msb-mega-l">
              {m.cols && m.cols.map((col, i) => <div key={i} className="msb-mcol">{col.map((t) => <button key={t} className="msb-mlink" onClick={() => pick(open, t)}>{t}</button>)}</div>)}
              {m.grid && <div className="msb-mgrid">{m.grid.map(([t, d]) => <button key={t} onClick={() => pick(open, t, d)}><strong>{t}</strong><span>{d}</span></button>)}</div>}
            </div>
            <aside className="msb-promo"><small>REGISTER NOW</small><strong>Microsoft Ignite | November 17-20, 2026</strong><p>Interactive learning, certifications, and direct access to experts all in one place.</p></aside>
          </div>
        )}
      </div>
      <div className="msb-subnav">
        <b>Credentials</b>
        {tabs.map(([k, t]) => <button key={k} className={view === k ? "on" : ""} onClick={() => { setOpen(null); go(k); }}>{t}</button>)}
      </div>
    </div>
  );
}

/* ---------- generic in-site page for every menu / topic link ---------- */
function relatedFor(title) {
  const t = title.toLowerCase();
  const by = (fn) => DATA.filter(fn);
  let r;
  if (t.includes("azure")) r = by((d) => d.p === "Azure");
  else if (t.includes("dynamics")) r = by((d) => d.p === "Dynamics 365");
  else if (t.includes("copilot")) r = by((d) => d.p === "Microsoft Copilot");
  else if (t.includes("power platform")) r = by((d) => d.p === "Microsoft Power Platform");
  else if (t.includes("outlook") || t.includes("365")) r = by((d) => d.p === "Microsoft 365");
  else if (t.includes("teams")) r = by((d) => d.p === "Microsoft Teams");
  else if (t.includes("windows")) r = by((d) => d.p === "Windows Server");
  else if (t.includes("security")) r = by((d) => /Defender|Entra|Purview/.test(d.p) || /Security/.test(d.r));
  else if (t.includes("devops") || t.includes("code")) r = by((d) => d.p === "GitHub" || d.r === "DevOps Engineer");
  else if (/ai|intelligence|agent/.test(t)) r = by((d) => /AI|Copilot|Agent/.test(d.r + d.p));
  else if (/student|startup|educator|organization|assessment|all|popular|tags|labs|career|troubleshoot/.test(t)) r = by((d) => d.v === "Beginner");
  else r = DATA;
  return r.length ? r.slice(0, 8) : DATA.slice(0, 8);
}
const KIND = {
  docs: ["DOCUMENTATION", ["Get started", "Short guides that explain the core ideas and set up your first project."], ["Concepts and how-to guides", "Step-by-step articles for the tasks you do most."], ["Reference and samples", "Settings, commands and working examples you can copy."]],
  train: ["TRAINING", ["Learning paths", "Ordered modules that take you from basics to job-ready skills."], ["Hands-on labs", "Practice in a safe environment with guided tasks."], ["Practice assessments", "Check what you know before you book an exam."]],
  topics: ["TOPIC", ["Start with the basics", "Short explainers that give you the big picture."], ["Build real skills", "Projects and labs you can finish in a week."], ["Prove it with a credential", "Pick an exam below and add it to your plan."]],
  qa: ["Q&A", null],
};
function PageView({ info, go }) {
  const { kind, title, desc } = info;
  const [label, ...cards] = KIND[kind] || KIND.topics;
  const [q, setQ] = useState("");
  const [sent, setSent] = useState(false);
  const rel = relatedFor(title);
  const blurb = desc || (kind === "docs" ? "Guides, concepts and reference articles for " + title.replace(/ documentation/i, "") + "." : kind === "train" ? "Learning paths and labs to build skills in " + title.replace(/ training/i, "") + "." : "Questions and answers from learners and experts about " + title.replace(/ questions/i, "") + ".");
  const qa = [["How do I get started with " + title.replace(/ (questions|documentation|training)/i, "") + "?", "Begin with the beginner credential in the list below, then follow its learning path and practice assessment."], ["Which credential should I take first?", "Pick the level that matches your experience. Fundamentals have no prerequisites."], ["How long does it take to prepare?", "Most people need two to six weeks of steady study for an associate exam and one to two weeks for a fundamentals exam."], ["Can I practice without paying?", "Yes. Use free sandboxes, practice assessments and the Applied Skills labs."]];
  return (
    <div className="msb-page">
      <section className="msb-hero">
        <div className="msb-hero-in"><small className="msb-eyebrow">{label}</small><h1>{title}</h1><p>{blurb}</p>
          <button className="msb-obtn" onClick={() => go("browse")}>Browse credentials</button></div>
        <Illus kind="keys" />
      </section>
      <section className="msb msb-white">
        {kind === "qa" ? (
          <>
            {title === "Ask a question" && (
              <div className="msb-form"><h2 className="msb-h2">Ask the community</h2>
                <textarea className="msb-in" rows={4} placeholder="Describe your question" value={q} onChange={(e) => { setQ(e.target.value); setSent(false); }} />
                <button className="msb-btn" disabled={!q.trim()} onClick={() => setSent(true)}>Post question</button>
                {sent && <div className="msb-note" style={{ marginTop: 14 }}><b>Question posted.</b><p>{q}</p></div>}
              </div>)}
            <h2 className="msb-h2" style={{ marginTop: 30 }}>Popular questions</h2>
            <div className="msb-faq">{qa.map(([a, b]) => <details key={a}><summary>{a}</summary><p>{b}</p></details>)}</div>
          </>
        ) : (
          <div className="msb-steps">{cards.map(([t, d], i) => <Reveal key={t} i={i}><Tilt><div className="msb-stepc"><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></div></Tilt></Reveal>)}</div>
        )}
        <h2 className="msb-h2" style={{ marginTop: 44 }}>Related credentials</h2>
        <div className="msb-minis">{rel.map((d, i) => <Reveal key={d.id} i={i % 4}><Tilt max={6}><button className="msb-mini" onClick={() => go("browse", d.id)}><small>{d.ex ? "EXAM" : "CERTIFICATION"}</small><b>{d.n}</b><span>{d.p} • {d.v}</span></button></Tilt></Reveal>)}</div>
        <p style={{ marginTop: 28 }}><button className="msb-btn" onClick={() => go("browse")}>Browse all credentials</button> <button className="msb-btn o" onClick={() => go("renewal")}>Certification renewals</button> <button className="msb-btn o" onClick={() => go("help")}>FAQ &amp; Help</button></p>
      </section>
    </div>
  );
}

/* ---------- Schedule exam (opened from a credential page) ---------- */
function SchedulePage({ id, go }) {
  const d = DATA[id] || DATA[0];
  const [f, setF] = useState({ name: "", email: "", date: "", mode: "Online proctored" });
  const [done, setDone] = useState(false);
  const ok = f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.date;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <div className="msb-page">
      <section className="msb-hero"><div className="msb-hero-in"><small className="msb-eyebrow">SCHEDULE EXAM</small><h1>{d.n}</h1><p>Choose a date and how you want to take it. We will send the booking details to your email.</p></div><Illus kind="keys" /></section>
      <section className="msb msb-white"><div className="msb-form">
        {done ? (
          <div className="msb-note"><b>Request received.</b><p>{f.name}, your request for {d.n} on {f.date} ({f.mode}) is saved. Confirmation will go to {f.email}.</p></div>
        ) : (
          <>
            <label>Full name<input className="msb-in" value={f.name} onChange={set("name")} /></label>
            <label>Email<input className="msb-in" type="email" value={f.email} onChange={set("email")} /></label>
            <label>Preferred date<input className="msb-in" type="date" value={f.date} onChange={set("date")} /></label>
            <label>Delivery<select className="msb-in" value={f.mode} onChange={set("mode")}><option>Online proctored</option><option>Test centre</option></select></label>
            <button className="msb-btn" disabled={!ok} onClick={() => setDone(true)}>Confirm request</button>
          </>)}
        <p style={{ marginTop: 20 }}><button className="msb-btn o" onClick={() => go("browse", d.id)}>← Back to {d.c}</button></p>
      </div></section>
    </div>
  );
}

/* ---------- Renewal eligibility checker ---------- */
function EligibilityPage({ go }) {
  const opts = DATA.filter((d) => !d.ex);
  const [id, setId] = useState(opts[0].id);
  const [exp, setExp] = useState("");
  const [res, setRes] = useState(null);
  const check = () => {
    const d = DATA[id];
    if (d.v === "Beginner") return setRes(["ok", d.n + " is a fundamentals certification. It does not expire, so there is nothing to renew."]);
    const days = Math.ceil((new Date(exp).getTime() - Date.now()) / 86400000);
    if (days < 0) return setRes(["no", "This certification has already expired. Pass the current exam again to earn it back."]);
    if (days <= 183) return setRes(["ok", "You can renew now. Take the free online assessment before it expires in " + days + " days."]);
    const from = new Date(new Date(exp).getTime() - 183 * 86400000).toDateString();
    setRes(["wait", "Renewal opens about six months before expiry. Come back on or after " + from + "."]);
  };
  return (
    <div className="msb-page">
      <section className="msb-hero"><div className="msb-hero-in"><small className="msb-eyebrow">MICROSOFT CERTIFICATION RENEWAL</small><h1>Check my eligibility</h1><p>Pick your certification and its expiry date to see if you can renew today.</p></div><Illus kind="stack" /></section>
      <section className="msb msb-white"><div className="msb-form">
        <label>Certification<select className="msb-in" value={id} onChange={(e) => { setId(+e.target.value); setRes(null); }}>{opts.map((d) => <option key={d.id} value={d.id}>{d.n}</option>)}</select></label>
        <label>Expiry date<input className="msb-in" type="date" value={exp} onChange={(e) => { setExp(e.target.value); setRes(null); }} /></label>
        <button className="msb-btn" disabled={DATA[id].v !== "Beginner" && !exp} onClick={check}>Check eligibility</button>
        {res && <div className="msb-note" style={{ marginTop: 16 }}><b>{res[0] === "ok" ? "Good news" : res[0] === "wait" ? "Not yet" : "Expired"}</b><p>{res[1]}</p></div>}
        <p style={{ marginTop: 20 }}><button className="msb-btn o" onClick={() => go("renewal")}>← Back to renewals</button></p>
      </div></section>
    </div>
  );
}

/* ---------- 3D hero scene (CSS 3D, pointer parallax) ---------- */
function Illus({ kind }) {
  const r = useRef(null);
  const put = (sx, sz) => { r.current.style.setProperty("--sx", sx + "deg"); r.current.style.setProperty("--sz", sz + "deg"); };
  const mv = (e) => { const b = r.current.getBoundingClientRect(); const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5; put(52 - y * 12, -28 + x * 16); };
  return (
    <div className="msb-illus" ref={r} onPointerMove={mv} onPointerLeave={() => put(52, -28)} aria-hidden="true">
      <div className="msb-scene">
        {kind === "keys" ? (
          <>
            {[[2, 6, 36, 30, 0, 0], [34, -8, 32, 30, 8, 1], [0, 52, 28, 36, 0, 2], [64, 10, 34, 34, 14, 3], [70, 58, 26, 30, 0, 4]].map(([l, t, w, h, z, d], i) => <i key={i} className="msb-k" style={{ left: l + "%", top: t + "%", width: w + "%", height: h + "%", "--z": z + "px", "--dl": d * 0.5 + "s" }} />)}
            <i className="msb-k big" style={{ left: "30%", top: "34%", width: "36%", height: "52%", "--z": "26px", "--dl": "0.3s" }} />
            <i className="msb-shadow" />
            <div className="msb-shield">
              <svg viewBox="0 0 140 170" width="100%" height="100%">
                <defs>
                  <linearGradient id="msb-sh1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".95" /><stop offset="1" stopColor="#cfe6fb" stopOpacity=".75" /></linearGradient>
                  <linearGradient id="msb-sh2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bcdcff" /><stop offset="1" stopColor="#4f97e0" /></linearGradient>
                </defs>
                <path d="M70 6 128 26v50c0 44-26 74-58 88C38 150 12 120 12 76V26z" fill="url(#msb-sh1)" stroke="#fff" strokeWidth="3" />
                <path d="M4 52 136 40 140 78 8 92z" fill="url(#msb-sh2)" opacity=".92" />
                <path d="M24 30 70 14v20L24 48z" fill="#fff" opacity=".7" />
              </svg>
            </div>
          </>
        ) : (
          <>
            {Array.from({ length: 24 }, (_, i) => <i key={i} className="msb-q" style={{ left: 4 + (i % 6) * 15 + "%", top: 6 + Math.floor(i / 6) * 22 + "%", "--z": (i % 3) * 6 + "px", "--dl": (i % 7) * 0.25 + "s", opacity: 0.35 + ((i * 5) % 6) * 0.1 }} />)}
            <i className="msb-slab s3" style={{ left: "22%", top: "40%", width: "50%", height: "38%", "--z": "10px", "--dl": "0s" }} />
            <i className="msb-slab s2" style={{ left: "29%", top: "33%", width: "36%", height: "30%", "--z": "46px", "--dl": ".25s" }} />
            <i className="msb-slab s1" style={{ left: "35%", top: "26%", width: "24%", height: "22%", "--z": "82px", "--dl": ".5s" }}><b /></i>
            <i className="msb-k" style={{ left: "70%", top: "6%", width: "26%", height: "30%", "--z": "20px", "--dl": ".8s" }} />
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Certification Renewals page ---------- */
function RenewalPage({ go }) {
  const steps = [["Sign in to your profile", "Open your Microsoft Learn profile and go to Credentials to see which certifications can be renewed."], ["Take the online assessment", "A short, free, open-book assessment on the latest skills for that certification. No proctor needed."], ["Pass and you are renewed", "Pass the assessment and your certification is extended by another year from its expiry date."]];
  const qa = [["When can I renew?", "You can renew starting six months before your certification expires. Renewal opens only inside that window."], ["What does it cost?", "Nothing. Renewing a Microsoft certification is free."], ["What if I miss the window?", "If your certification expires, you need to pass the current exam again to earn it back."], ["Do all credentials expire?", "No. Fundamentals certifications do not expire, so there is nothing to renew for them."], ["How many times can I try the assessment?", "If you do not pass, you can retake the assessment as many times as you need before the certification expires."]];
  return (
    <div className="msb-page">
      <section className="msb-hero ren">
        <div className="msb-hero-in">
          <small className="msb-eyebrow">MICROSOFT CERTIFICATION RENEWAL</small>
          <h1>Keep pace with technology</h1>
          <p>Validate your skills and advance your career by annually renewing your Microsoft Certification for free.</p>
          <button className="msb-obtn" onClick={() => go("eligibility")}>Check my eligibility in profile</button>
        </div>
        <Illus kind="stack" />
      </section>
      <section className="msb msb-white">
        <h2 className="msb-h2">How renewal works</h2>
        <div className="msb-steps">{steps.map(([t, d], i) => <Reveal key={t} i={i}><Tilt><div className="msb-stepc"><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></div></Tilt></Reveal>)}</div>
        <h2 className="msb-h2" style={{ marginTop: 48 }}>Renewal questions</h2>
        <div className="msb-faq">{qa.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        <p style={{ marginTop: 28 }}><button className="msb-btn" onClick={() => go("browse")}>Browse credentials</button> <button className="msb-btn o" onClick={() => go("help")}>FAQ &amp; Help</button></p>
      </section>
    </div>
  );
}

/* ---------- FAQ & Help page ---------- */
const FAQS = {
  "Assessment lab frequently asked questions": [["What is an assessment lab?", "A timed, hands-on lab in a live environment where you complete real tasks. It shows that you can do the work, not only answer questions."], ["Does it cost anything?", "Applied Skills assessments are free to take."], ["Can I try again if I do not pass?", "Yes. You can retake the lab after a short waiting period."], ["What do I need?", "A Microsoft Learn profile, a modern browser and a stable internet connection."]],
  "Exam frequently asked questions": [["How do I schedule an exam?", "Open the exam page, choose Schedule exam and sign in. You continue with Pearson VUE to pick a date, time and online or test-centre delivery."], ["What score do I need to pass?", "Most role-based exams use a passing score of 700 on a scale of 1 to 1000."], ["How many times can I retake an exam?", "Wait 24 hours after the first attempt and 14 days after later ones. You can attempt the same exam up to five times in 12 months."], ["Can I ask for accommodations?", "Yes. Ask for accommodations before you schedule so everything is ready on exam day."]],
  "Vouchers and redeeming discounts": [["How do I redeem a voucher?", "Schedule your exam through Pearson VUE and enter the voucher code at checkout."], ["Do vouchers expire?", "Yes. Each voucher shows an expiry date, so book the exam before it."], ["Can I combine a discount and a voucher?", "Usually only one offer applies to an exam. Read the terms of each offer."]],
  "Microsoft at SXSW EDU Certification Exam Vouchers": [["What is this offer?", "A limited offer of exam vouchers connected with the Microsoft presence at SXSW EDU."], ["Who can use it?", "Eligibility and dates are set by the offer. Check the official page before you plan around it."], ["How do I redeem it?", "Follow the redeem steps in the Vouchers and redeeming discounts article."]],
};
const HELP_TITLES = ["Credentials support", ...Object.keys(FAQS)];

function HelpPage({ go }) {
  const [art, setArt] = useState("Credentials support");
  const [q, setQ] = useState("");
  const [sum, setSum] = useState(false);
  const [ask, setAsk] = useState(false);
  const [aq, setAq] = useState("");
  const words = aq.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const hits = words.length ? Object.values(FAQS).flat().filter(([x, y]) => words.some((w) => (x + y).toLowerCase().includes(w))).slice(0, 3) : [];
  const list = HELP_TITLES.filter((t) => t.toLowerCase().includes(q.toLowerCase()));
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const rows = [
    ["Microsoft Certifications and Microsoft Learn credentials", <>Check these resources for answers to common questions:<ul><li><button className="msb-ln" onClick={() => setArt("Exam frequently asked questions")}>Certification process overview</button></li><li><button className="msb-ln" onClick={() => setArt("Exam frequently asked questions")}>Frequently asked questions about Certification exams</button></li></ul></>],
    ["Exam scheduling, payment and online proctoring", <>Contact Pearson VUE customer support for booking changes, payment problems and test-day issues.</>],
    ["Applied Skills and assessment labs", <>Read the <button className="msb-ln" onClick={() => setArt("Assessment lab frequently asked questions")}>assessment lab questions</button>, then submit a request if you are still stuck.</>],
    ["Vouchers and discounts", <>See <button className="msb-ln" onClick={() => setArt("Vouchers and redeeming discounts")}>Vouchers and redeeming discounts</button>.</>],
    ["Learn profile, sign-in and transcript", <>Visit the Microsoft Learn Q&amp;A or submit a support request from your profile.</>],
  ];
  return (
    <div className="msb-help">
      <aside className="msb-toc">
        <input className="msb-in" placeholder="Find by title" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Find by title" />
        <ul>{list.map((t) => <li key={t}><button className={t === art ? "on" : ""} onClick={() => { setArt(t); setSum(false); }}>{t}</button></li>)}</ul>
        {!list.length && <p className="msb-mut">No matching titles.</p>}
        <button className="msb-ln dl" onClick={() => window.print()}>⤓ Download PDF</button>
      </aside>
      <article className="msb-art">
        <div className="msb-artbar"><span><button className="msb-ln" onClick={() => go("browse")}>Learn</button> ›</span><button className="msb-ask" onClick={() => setAsk(!ask)}>✦ Ask Learn</button></div>
        {ask && <div className="msb-note" style={{ marginBottom: 16 }}><b>Ask Learn</b><input className="msb-in" style={{ marginTop: 8 }} placeholder="Type your question, e.g. retake exam" value={aq} onChange={(e) => setAq(e.target.value)} />{hits.map(([x, y]) => <p key={x}><b>{x}</b><br />{y}</p>)}{words.length > 0 && !hits.length && <p>No answer found. Try other words.</p>}</div>}
        <h1>{art}</h1>
        <button className="msb-chip" onClick={() => setSum(!sum)}>✦ Summarize this article for me</button>
        {sum && <div className="msb-note" style={{ marginTop: 12 }}><b>Quick summary</b><p>{art === "Credentials support" ? "Find the right support channel for exams, labs, vouchers and your profile, then submit a request with your exam or credential details." : "This article answers common questions. Open any question below to read the answer."}</p></div>}
        {art === "Credentials support" ? (
          <>
            <h2 id="h-contact">How to contact support</h2>
            <div className="msb-tw"><table><thead><tr><th>Area of support</th><th>How to get help</th></tr></thead><tbody>{rows.map(([a, b]) => <tr key={a}><td><i>{a}</i></td><td>{b}</td></tr>)}</tbody></table></div>
            <h2 id="h-submit">How to submit a support request</h2>
            <ol className="msb-ol"><li>Sign in to Microsoft Learn with the account you use for your credentials.</li><li>Open Credentials support and choose the category that matches your problem.</li><li>Describe the issue and add your exam code or credential name.</li><li>Submit the request and watch your email for the reply.</li></ol>
          </>
        ) : <div className="msb-faq">{FAQS[art].map(([a, b]) => <details key={a}><summary>{a}</summary><p>{b}</p></details>)}</div>}
      </article>
      <aside className="msb-inart">
        <b>In this article</b>
        {art === "Credentials support" ? <><button onClick={() => jump("h-contact")}>How to contact support</button><button onClick={() => jump("h-submit")}>How to submit a support request</button></> : FAQS[art].map(([a]) => <span key={a}>{a}</span>)}
      </aside>
    </div>
  );
}

/* ---------- Page switcher ---------- */
function MicrosoftBrowserInner() {
  const [view, setView] = useState("browse");
  const [arg, setArg] = useState(null);
  const [k, setK] = useState(0);
  const rootRef = useRef(null);
  const go = (v, a = null) => {
    if (v === "browse") setK((n) => n + 1);
    setArg(a);
    setView(v);
    setTimeout(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };
  return (
    <div className="msb-root" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <MsChrome view={view} go={go} />
      <div key={view + ":" + k + ":" + (arg && arg.title ? arg.title : "")} className="msb-vin">
      {view === "browse" && <BrowsePage key={k} go={go} initialRoute={typeof arg === "number" ? arg : null} />}
      {view === "renewal" && <RenewalPage go={go} />}
      {view === "help" && <HelpPage go={go} />}
      {view === "page" && <PageView key={arg.title} info={arg} go={go} />}
      {view === "schedule" && <SchedulePage id={arg} go={go} />}
      {view === "eligibility" && <EligibilityPage go={go} />}
      </div>
    </div>
  );
}

const CSS = `
.msb{background:var(--cream,#f6ede6);color:var(--tx,#161616);font-family:inherit;font-size:14px;line-height:1.45;padding:clamp(56px,8vw,96px) max(20px,calc((100% - var(--w,1200px))/2))}
.msb-h2{font-size:clamp(24px,3vw,34px);font-weight:600;letter-spacing:-.01em;line-height:1.2}
.msb-sub{color:var(--mut,var(--mut,#5c5c5c));max-width:640px;margin:10px 0 32px;font-size:clamp(15px,1.5vw,17px)}
.msb *{box-sizing:border-box}.msb a{color:var(--or,#0f6cbd)}
.msb-h2,.msb h1,.msb h3,.msb h4{color:var(--tx,#161616)}.msb button{font:inherit;cursor:pointer}
.msb-wrap{max-width:none;margin:0;padding:0}
.msb-top{display:flex;gap:14px;align-items:center;padding:10px 20px;border-bottom:1px solid var(--line,#e3d6cc);background:#fbf5f1}
.msb-top span{color:var(--mut,#5c5c5c)}
.msb-hero{background:linear-gradient(120deg,#ecdcd0,#e4cfc0 55%,#f1e5db);height:110px;display:flex;align-items:flex-end;padding-bottom:14px;font-size:22px;font-weight:600}
.msb-layout{display:flex;gap:28px}
.msb aside{width:250px;flex:none}.msb aside h2{font-size:22px;margin:0 0 10px}.msb aside h3{font-size:14px;margin:18px 0 6px}
.msb-fbtn{display:none;width:100%;padding:9px;margin-bottom:8px;border:1px solid var(--line,#cdbfb4);background:var(--card,#fff);border-radius:4px}
.msb-in{width:100%;padding:7px 8px;border:1px solid var(--line,#cdbfb4);background:var(--card,#fff);border-radius:3px}
.msb-fl{max-height:210px;overflow:auto;margin-top:6px}
.msb-check{display:flex;gap:8px;align-items:center;padding:3px 2px}
.msb-clear{margin-top:16px;background:none;border:0;color:var(--or,#0f6cbd);padding:0;text-decoration:underline}
.msb main{flex:1;min-width:0}
.msb-sr{display:flex}.msb-sr input{flex:1;min-width:0;padding:10px;border:1px solid var(--line,#cdbfb4);border-right:0;border-radius:3px 0 0 3px;background:var(--card,#fff)}
.msb-sr button{background:var(--or,#0f6cbd);color:#fff;border:0;padding:0 20px;border-radius:0 3px 3px 0}
.msb-bar{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin:14px 0}
.msb-cnt{background:color-mix(in srgb,var(--or,#0f6cbd) 22%,var(--card,#fff));font-weight:600;padding:1px 4px}
.msb select{padding:5px;border:1px solid var(--line,#cdbfb4);background:var(--card,#fff)}
.msb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px}
.msb-card{border:1px solid var(--line,#e0d3c9);background:var(--card,#fff);border-radius:4px;padding:14px;display:flex;flex-direction:column;gap:10px;min-height:165px;cursor:pointer}
.msb-card:hover,.msb-card:focus-visible{box-shadow:0 2px 10px rgba(0,0,0,.18);outline:none}
.msb-tp{font-size:10px;letter-spacing:.06em;color:var(--mut,#5c5c5c)}
.msb-row{display:flex;justify-content:space-between;gap:8px}
.msb-card h4{margin:0;font-size:14px;font-weight:600;color:var(--or,#0f6cbd)}
.msb-badge{width:30px;height:34px;flex:none;border-radius:4px 4px 12px 12px;background:var(--or,#0f6cbd);color:#fff;display:grid;place-items:center;font-size:9px;font-weight:700}
.msb-badge.c{background:#2b2b2b}
.msb-meta{font-size:11px;color:var(--mut,#5c5c5c);flex:1}
.msb-add{align-self:flex-end;background:none;border:0;color:var(--or,#0f6cbd);font-size:12px;padding:2px}.msb-add.on{color:#107c10;font-weight:600}
.msb-empty{padding:40px;text-align:center;color:var(--mut,#5c5c5c)}
.msb-pg{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:24px 0}
.msb-pg button{padding:5px 11px;border:1px solid var(--line,#cdbfb4);background:var(--card,#fff);border-radius:3px}.msb-pg .cur{background:var(--or,#0f6cbd);color:#fff;border-color:var(--or,#0f6cbd)}
.msb-dh{background:var(--card,#e8e6df);border:1px solid var(--line,#e0d3c9);border-radius:16px;padding:18px 24px 26px;margin-bottom:8px}
.msb-crumb{font-size:12px;color:var(--mut,#5c5c5c)}.msb-crumb a{text-decoration:none}
.msb-badge-lg{display:block;margin:26px 0 22px}.msb-badge-lg text{font-family:"Segoe UI",Arial,sans-serif}
.msb-eb{letter-spacing:.22em;font-size:14px}.msb-dh h1{font-size:34px;line-height:1.2;margin:6px 0 0}
.msb-det{max-width:900px;padding-top:26px}
.msb-det>p{font-size:17px;line-height:1.65;margin:0 0 18px}
.msb-note{border:1px solid #107c10;background:var(--card,#f1faf1);border-radius:6px;padding:14px 16px;margin:6px 0 18px}.msb-note p{margin:6px 0 0;font-size:15px}
.msb-pill{display:inline-block;background:var(--card,#fff);padding:3px 11px;border-radius:12px;margin:0 6px 6px 0;font-size:12px;text-decoration:none}
.msb-btn{background:var(--or,#0f6cbd);color:#fff!important;border:0;padding:10px 18px;border-radius:3px;text-decoration:none;display:inline-block;margin:6px 6px 0 0}
.msb-btn.o{background:none;color:var(--or,#0f6cbd)!important;border:1px solid var(--or,#0f6cbd)}
.msb-facts{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1px;background:var(--line,#d9cbc0);border:1px solid var(--line,#d9cbc0);margin:24px 0}
.msb-facts div{background:var(--card,#fff);padding:10px 12px}.msb-facts b{display:block;font-size:11px;color:var(--mut,#5c5c5c);font-weight:600}
.msb-det section{border-top:1px solid var(--line,#d9cbc0);margin-top:24px;padding-top:14px}.msb-det h3{margin:0 0 8px;font-size:18px}.msb-det li{margin:4px 0}
.msb-sk{display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid var(--line,#e3d6cc)}
.msb-minis{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;margin-top:14px}
.msb-mini{text-align:left;background:var(--cream,#f6ede6);border:1px solid var(--line,#e0d3c9);border-radius:6px;padding:14px;display:flex;flex-direction:column;gap:6px;color:var(--tx,#161616)}.msb-mini:hover{box-shadow:0 2px 10px rgba(0,0,0,.16)}.msb-mini small{font-size:10px;letter-spacing:.06em;color:var(--mut,#5c5c5c)}.msb-mini b{color:var(--or,#0f6cbd);font-size:14px}.msb-mini span{font-size:12px;color:var(--mut,#5c5c5c)}
.msb-form{max-width:560px;display:flex;flex-direction:column;gap:14px}.msb-form label{display:flex;flex-direction:column;gap:6px;font-weight:600;font-size:14px}.msb-form .msb-in,.msb-form textarea{background:var(--cream,#f6ede6);color:var(--tx,#161616);font-weight:400;font-family:inherit}.msb-form .msb-btn{align-self:flex-start}.msb-btn:disabled{opacity:.5;cursor:not-allowed}

/* ===== 3D + motion layer ===== */
@keyframes msb-vin{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes msb-drop{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}
@keyframes msb-bob{0%,100%{transform:translateZ(var(--z,0px))}50%{transform:translateZ(calc(var(--z,0px) + 16px))}}
@keyframes msb-hover{0%,100%{transform:translateZ(90px) rotateZ(28deg) rotateX(-52deg) translateY(0)}50%{transform:translateZ(110px) rotateZ(28deg) rotateX(-52deg) translateY(-10px)}}
@keyframes msb-swing{0%,100%{transform:rotateY(-18deg) rotateX(4deg)}50%{transform:rotateY(18deg) rotateX(-2deg)}}
@keyframes msb-grow{from{width:0}to{width:var(--w)}}
@keyframes msb-pulse{0%,100%{opacity:.55}50%{opacity:1}}
.msb-vin{animation:msb-vin .55s cubic-bezier(.2,.8,.2,1) both}
.msb-mega{animation:msb-drop .22s ease-out both}
.msb-rev{opacity:0;transform:translateY(34px) scale(.97);transition:opacity .6s ease,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:var(--d,0ms);height:100%}
.msb-rev.in{opacity:1;transform:none}
.msb-tilt{height:100%;position:relative;transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .18s ease-out;transform-style:preserve-3d;border-radius:8px}
.msb-tilt::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .25s;background:radial-gradient(240px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.55),transparent 60%)}
.msb-tilt:hover::after{opacity:.55}
.msb-card,.msb-stepc,.msb-mini{height:100%;transition:box-shadow .25s,border-color .25s}
.msb-tilt:hover .msb-card,.msb-tilt:hover .msb-stepc,.msb-tilt:hover .msb-mini{box-shadow:0 22px 38px -12px rgba(60,40,20,.38),0 4px 10px rgba(60,40,20,.12);border-color:var(--or,#0f6cbd)}
.msb-card h4{transition:transform .25s}.msb-tilt:hover .msb-card h4{transform:translateZ(20px)}
.msb-btn,.msb-obtn,.msb-pg button{transition:transform .2s,box-shadow .2s,background .2s}
.msb-btn:hover:not(:disabled),.msb-obtn:hover{transform:translateY(-2px);box-shadow:0 10px 22px -8px rgba(0,0,0,.35)}
.msb-btn:active,.msb-obtn:active{transform:translateY(0) scale(.98)}
.msb-add{transition:transform .2s}.msb-add:hover{transform:scale(1.08)}
.msb-check input{transition:transform .15s}.msb-check:hover input{transform:scale(1.15)}
.msb-sr button{transition:filter .2s}.msb-sr button:hover{filter:brightness(1.1)}
.msb-statbar{display:grid;grid-template-columns:repeat(4,1fr);background:var(--white,#fff);border-bottom:1px solid var(--line,#e7d9cd);padding:0 var(--pad)}
.msb-statbar div{padding:clamp(16px,2.4vw,26px) 8px;text-align:center}.msb-statbar b{display:block;font-size:clamp(24px,3.6vw,36px);color:var(--or,#0f6cbd);font-variant-numeric:tabular-nums}.msb-statbar span{font-size:13px;color:var(--mut,#5c5c5c)}
.msb-sk{display:block}.msb-skt{display:flex;justify-content:space-between;gap:12px}.msb-bar{height:7px;border-radius:99px;background:var(--line,#e3d6cc);margin-top:8px;overflow:hidden}
.msb-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--or,#0f6cbd),#ffb36b);box-shadow:0 0 10px rgba(249,115,22,.5);animation:msb-grow 1.1s cubic-bezier(.2,.8,.2,1) .15s both}
.msb-b3d{position:relative;display:inline-block;perspective:700px;margin:26px 0 22px}.msb-b3d svg{margin:0!important;animation:msb-swing 6s ease-in-out infinite;transform-style:preserve-3d;filter:drop-shadow(0 18px 14px rgba(8,30,70,.35))}
.msb-gloss{position:absolute;inset:6px 8px 20px;border-radius:10px 10px 40px 40px;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.4) 48%,transparent 62%);background-size:260% 100%;animation:msb-gl 4.5s ease-in-out infinite;pointer-events:none}
@keyframes msb-gl{0%{background-position:130% 0}60%,100%{background-position:-60% 0}}
.msb-illus{position:absolute;right:0;top:0;height:100%;width:min(62%,720px);perspective:1100px;overflow:hidden;--sx:52deg;--sz:-28deg}
.msb-scene{position:absolute;right:4%;top:50%;width:min(540px,92%);aspect-ratio:540/300;margin-top:calc(min(540px,92%) * -.28);transform:rotateX(var(--sx)) rotateZ(var(--sz));transform-style:preserve-3d;transition:transform .25s ease-out}
.msb-scene>*{position:absolute;transform-style:preserve-3d}
.msb-k{border-radius:16%/24%;background:linear-gradient(145deg,#fdfcf9,#e7e3da);animation:msb-bob 5s ease-in-out infinite;animation-delay:var(--dl,0s);transform:translateZ(var(--z,0px));box-shadow:1px 1px 0 #dedad0,2px 2px 0 #d9d5ca,3px 3px 0 #d4d0c4,4px 4px 0 #cfcbbf,5px 5px 0 #cac6ba,6px 6px 0 #c5c1b5,16px 20px 30px rgba(70,55,30,.26),inset 0 2px 3px rgba(255,255,255,.9)}
.msb-k.big{border-radius:12%/16%}
.msb-shadow{left:34%;top:48%;width:28%;height:30%;border-radius:50%;background:radial-gradient(rgba(30,70,140,.4),transparent 70%);filter:blur(8px);transform:translateZ(40px)}
.msb-shield{left:37%;top:20%;width:23%;aspect-ratio:140/170;animation:msb-hover 5s ease-in-out infinite;filter:drop-shadow(0 18px 12px rgba(30,80,160,.32));transform:translateZ(90px) rotateZ(28deg) rotateX(-52deg)}
.msb-q{width:11%;height:14%;border-radius:18%;background:linear-gradient(145deg,#d8e4ff,#8ba9ff);box-shadow:1px 1px 0 #9cb4f6,2px 2px 0 #8fa9f0,3px 3px 0 #849fe8,6px 8px 12px rgba(60,80,200,.25);animation:msb-bob 4s ease-in-out infinite,msb-pulse 3.5s ease-in-out infinite;animation-delay:var(--dl,0s);transform:translateZ(var(--z,0px))}
.msb-slab{border-radius:14%/20%;animation:msb-bob 5.5s ease-in-out infinite;animation-delay:var(--dl,0s);transform:translateZ(var(--z,0px))}
.msb-slab.s3{background:linear-gradient(145deg,#c28bdf,#7d5bd7);box-shadow:1px 1px 0 #6f4fc4,2px 2px 0 #6a4abf,3px 3px 0 #6545b8,4px 4px 0 #5f40b0,5px 5px 0 #593baa,6px 6px 0 #5337a2,7px 7px 0 #4d329a,18px 24px 34px rgba(60,30,120,.38)}
.msb-slab.s2{background:linear-gradient(145deg,#ff9a85,#e5476b);box-shadow:1px 1px 0 #d13e60,2px 2px 0 #c93a5b,3px 3px 0 #c13657,4px 4px 0 #b93252,5px 5px 0 #b02e4d,6px 6px 0 #a82a49,16px 20px 28px rgba(160,30,60,.34)}
.msb-slab.s1{background:linear-gradient(145deg,#ffb299,#ff6a55);box-shadow:1px 1px 0 #e95a47,2px 2px 0 #e05442,3px 3px 0 #d84e3d,4px 4px 0 #cf4838,5px 5px 0 #c64333,14px 18px 24px rgba(200,60,40,.36);display:grid;place-items:center}
.msb-slab.s1 b{width:46%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fff,rgba(255,255,255,.2) 70%);box-shadow:0 0 28px 8px rgba(255,255,255,.7)}
.msb-help .msb-art{animation:msb-vin .5s .1s both}
@media(max-width:900px){.msb-illus{opacity:.35}.msb-statbar{grid-template-columns:repeat(2,1fr)}}
@media(prefers-reduced-motion:reduce){.msb-root *{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}.msb-rev{opacity:1!important;transform:none!important}}
.msb-mut{color:var(--mut,#5c5c5c);font-size:12px}
.msb-rel{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
@media(max-width:820px){
 .msb-layout{flex-direction:column;gap:8px}.msb aside{width:100%}
 .msb-fbtn{display:block}.msb-fs{display:none}.msb-fs.open{display:block}
 .msb-dh h1{font-size:28px}.msb-hero{font-size:19px;height:90px}
}
@media(max-width:480px){.msb-grid,.msb-rel{grid-template-columns:1fr}.msb-det>p{font-size:16px}.msb-wrap{padding:0 14px}}

.msb-root{--ms-hero:#e8e6df;--ms-bg:#fafafa;--ms-menu:#f2f2f2;--pad:max(20px,calc((100% - var(--w,1200px))/2));background:var(--white,#fff);color:var(--tx,#161616)}
.ilm.dark .msb-root{--ms-hero:#1b1b27;--ms-bg:#13131e;--ms-menu:#191927}
.msb-chrome{position:relative;z-index:30;background:var(--ms-bg)}
.msb-ban{display:flex;justify-content:space-between;align-items:center;gap:12px;background:#efd9fc;color:#1f1b18;padding:18px var(--pad);font-size:14px}
.msb-banlink{background:none;border:0;color:#1f1b18;font-weight:600;text-decoration:underline;padding:0;font-size:inherit}.msb-ban button{background:none;border:0;font-size:16px;color:#1f1b18;padding:4px 8px}
.msb-hd{position:relative;display:flex;align-items:center;gap:18px;padding:0 var(--pad);height:54px;border-bottom:1px solid var(--line,#e0e0e0);background:var(--ms-bg)}
.msb-brand{display:flex;align-items:center;gap:10px;background:none;border:0;padding:0;color:var(--tx,#161616);flex:none}
.msb-brand i{width:1px;height:22px;background:var(--tx,#161616)}.msb-brand b{font-size:18px;font-weight:600}
.msb-nav{display:flex;gap:2px;overflow-x:auto;scrollbar-width:none;height:100%}
.msb-nav button{display:flex;align-items:center;gap:6px;background:none;border:0;padding:0 12px;font-size:14px;color:var(--tx,#161616);white-space:nowrap}
.msb-nav button:hover,.msb-nav button.on{background:var(--ms-menu)}
.msb-hr{margin-left:auto;display:flex;align-items:center;gap:20px}.msb-hr a{color:var(--tx,#161616)}.msb-hr .msb-sign{color:var(--or,#0f6cbd);text-decoration:none;font-size:14px}
.msb-mega{position:absolute;left:0;right:0;top:100%;display:flex;background:var(--ms-menu);border-top:1px solid var(--line,#e0e0e0);box-shadow:0 12px 24px rgba(0,0,0,.14);padding:34px var(--pad);gap:40px}
.msb-mega-l{flex:1;display:flex;gap:80px;min-width:0}.msb-mcol{display:flex;flex-direction:column;gap:6px;min-width:200px}
.msb-mlink{background:none;border:0;text-align:left;font-size:14px;padding:8px 0;color:var(--tx,#161616)!important;text-decoration:none}.msb-mlink:hover{text-decoration:underline}
.msb-mgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px 34px;width:100%}
.msb-mgrid button{background:none;border:0;text-align:left;padding:0;color:var(--tx,#161616)}.msb-mgrid strong{display:block;font-size:16px;font-weight:500;margin-bottom:6px}.msb-mgrid span{font-size:14px}.msb-mgrid button:hover strong{text-decoration:underline}
.msb-promo{width:300px;flex:none;border-left:1px solid var(--line,#ccc);padding-left:34px}.msb-promo small{letter-spacing:.2em;font-size:11px}.msb-promo strong{display:block;font-size:17px;font-weight:600;margin:10px 0 8px}.msb-promo p{margin:0;font-size:14px}
.msb-subnav{display:flex;align-items:center;gap:22px;padding:0 var(--pad);height:54px;border-bottom:1px solid var(--line,#e0e0e0);background:var(--ms-bg);overflow-x:auto;white-space:nowrap}
.msb-subnav b{font-size:17px;font-weight:600;margin-right:4px}.msb-subnav button{background:none;border:0;border-bottom:2px solid transparent;padding:6px 0;font-size:14px;color:var(--tx,#161616)}.msb-subnav button.on{border-bottom-color:var(--tx,#161616)}
.msb-hero{position:relative;overflow:hidden;background:var(--ms-hero);padding:clamp(40px,6vw,70px) var(--pad);min-height:300px;display:flex;align-items:center}
.msb-hero-in{position:relative;z-index:2;max-width:560px}.msb-hero h1{font-size:clamp(30px,4.6vw,44px);font-weight:600;line-height:1.15;margin:0 0 18px}.msb-hero p{font-size:16px;line-height:1.7;margin:0 0 22px;max-width:520px}
.msb-hero.ren .msb-hero h1{margin-top:4px}.msb-eyebrow{letter-spacing:.24em;font-size:13px}
.msb-obtn{display:inline-block;cursor:pointer;border:1px solid var(--tx,#161616);color:var(--tx,#161616)!important;padding:11px 14px;text-decoration:none;font-weight:600;font-size:14px;border-radius:2px;background:transparent}
.msb-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:22px}
.msb-stepc{background:var(--cream,#f6ede6);border:1px solid var(--line,#e7d9cd);border-radius:12px;padding:20px}.msb-stepc span{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:var(--or,#0f6cbd);color:#fff;font-weight:700}.msb-stepc h3{margin:12px 0 6px;font-size:17px}.msb-stepc p{margin:0;color:var(--mut,#5c5c5c)}
.msb-faq details{border-bottom:1px solid var(--line,#e0d3c9);padding:14px 0}.msb-faq summary{cursor:pointer;font-weight:600}.msb-faq p{margin:8px 0 0;color:var(--mut,#5c5c5c);line-height:1.6}
.msb-btn{background:var(--or,#0f6cbd);color:#fff;border:0;padding:10px 18px;border-radius:4px}.msb-btn.o{background:none;color:var(--or,#0f6cbd);border:1px solid var(--or,#0f6cbd)}
.msb-help{display:grid;grid-template-columns:260px minmax(0,1fr) 250px;gap:32px;padding:26px var(--pad) 60px;background:var(--white,#fff)}
.msb-toc .msb-in{background:var(--white,#fff)}.msb-toc ul{list-style:none;margin:12px 0;padding:0}.msb-toc li button{width:100%;text-align:left;background:none;border:0;padding:10px 12px;border-radius:4px;font-size:14px;color:var(--tx,#161616);line-height:1.4}.msb-toc li button.on{background:var(--cream,#eee);font-weight:600}.msb-toc li button:hover{background:var(--cream,#eee)}
.msb-ln{background:none;border:0;color:var(--or,#0f6cbd);padding:0;text-align:left;font-size:inherit;text-decoration:underline}.msb-ln.dl{margin-top:14px;font-size:14px}
.msb-artbar{display:flex;justify-content:space-between;align-items:center;font-size:14px;margin-bottom:22px}.msb-ask{border:1px solid #c2399b;background:none;color:var(--tx,#161616);padding:7px 14px;border-radius:4px;font-size:14px}
.msb-art h1{font-size:clamp(28px,4vw,40px);font-weight:600;margin:0 0 20px}.msb-art h2{font-size:clamp(22px,3vw,30px);font-weight:600;margin:30px 0 14px;scroll-margin-top:20px}
.msb-chip{background:var(--cream,#f3f3f3);border:1px solid var(--line,#d6d6d6);border-radius:6px;padding:7px 12px;font-size:12px;color:var(--tx,#161616)}
.msb-tw{overflow-x:auto}.msb-tw table{width:100%;border-collapse:collapse;font-size:14px;min-width:520px}.msb-tw th,.msb-tw td{border:1px solid var(--line,#d6d6d6);padding:10px;text-align:left;vertical-align:top}.msb-tw th{background:var(--cream,#f3f3f3)}.msb-tw ul{margin:6px 0 0;padding-left:18px}
.msb-ol{line-height:1.8;padding-left:22px}
.msb-inart{position:sticky;top:20px;align-self:start;display:flex;flex-direction:column;gap:10px;font-size:14px;padding-bottom:12px;border-bottom:1px solid var(--line,#ddd)}.msb-inart>b{font-size:18px;font-weight:600;margin-bottom:6px}.msb-inart button{background:none;border:0;text-align:left;color:var(--mut,#5c5c5c);padding:0 0 0 10px;border-left:2px solid var(--line,#ddd)}.msb-inart button:first-of-type{color:var(--tx,#161616);border-left-color:var(--tx,#161616);font-weight:600}.msb-inart span{color:var(--mut,#5c5c5c);padding-left:10px;border-left:2px solid var(--line,#ddd)}
.msb-mut{color:var(--mut,#5c5c5c);font-size:13px}
@media(max-width:1000px){.msb-help{grid-template-columns:1fr}.msb-inart{position:static;order:-1}.msb-toc ul{max-height:220px;overflow:auto}.msb-mega-l{gap:30px;flex-direction:column}.msb-mgrid{grid-template-columns:1fr 1fr}.msb-promo{display:none}}
@media(max-width:700px){.msb-illus{opacity:.22;width:100%}.msb-hd{gap:8px}.msb-brand b{display:none}.msb-mgrid{grid-template-columns:1fr}.msb-mega{padding:20px}.msb-ban{font-size:13px}}

.msb-top{padding-bottom:clamp(24px,4vw,40px)}
.msb-top .msb-sub{margin-bottom:0}
.msb-h1{font-size:clamp(28px,4.4vw,48px);font-weight:600;line-height:1.15;letter-spacing:-.02em}
.msb-white{background:var(--white,#fff);padding-top:clamp(28px,4vw,44px);padding-bottom:clamp(56px,8vw,96px)}
.msb-white .msb-card{background:var(--cream,#f6ede6)}
.msb-white .msb-in,.msb-white .msb-sr input,.msb-white select{background:var(--cream,#f6ede6);color:var(--tx,#161616)}
.msb-white .msb-pg button{background:var(--cream,#f6ede6);color:var(--tx,#161616)}
.msb-white .msb-pg .cur{background:var(--or,#0f6cbd);color:#fff}
.msb-white .msb-fbtn{background:var(--cream,#f6ede6);color:var(--tx,#161616)}
`;

const HOST_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.ilm{--cream:#f6ede6;--white:#ffffff;--card:#ffffff;--tx:#1f1b18;--tx2:#3b332d;--mut:#6a5f57;--or:#f97316;--ord:#c2410c;--line:#e7d9cd;--w:1200px;background:var(--white);color:var(--tx);font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;overflow-x:hidden;line-height:1.55}
.ilm *{box-sizing:border-box}
.ilm button{font-family:inherit;cursor:pointer}
.ilm.dark{--cream:#0c0c14;--white:#0f0f18;--card:#13131e;--tx:#f1f5f9;--tx2:#cbd5e1;--mut:#94a3b8;--line:rgba(255,255,255,.1)}
@media(min-width:1600px){.ilm{--w:1360px}}`;

/**
 * Full page: PublicLayout (Navbar + Footer) + .ilm theme wrapper + the credentials browser.
 * Props come from your router/page exactly like StudyAbroad / Careers / About.
 * Pass `embedded` if you render it INSIDE a page that already has PublicLayout and the .ilm wrapper.
 */
export default function MicrosoftBrowser({ theme, toggleTheme, setShowLoginModal, scrollToSection, embedded = false }) {
  if (embedded) return <MicrosoftBrowserInner />;
  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={setShowLoginModal} scrollToSection={scrollToSection}>
      <style dangerouslySetInnerHTML={{ __html: HOST_CSS }} />
      <div className={"ilm" + (theme === "dark" ? " dark" : "")}>
        <MicrosoftBrowserInner />
      </div>
    </PublicLayout>
  );
}