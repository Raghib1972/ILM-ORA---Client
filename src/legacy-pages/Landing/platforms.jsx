
// "use client";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { useSearchParams } from "@/lib/routerCompat";
// import {
//   Rocket, BookOpen, Star, Users, Briefcase, Bot, Cloud,
//   Shield, Database, BarChart2, FlaskConical, Plug, Link2, Globe,
//   Sparkles, Server, RefreshCw, Package, Wrench, Headphones,
//   MessageSquare, Brain, Zap, Target, GraduationCap, Layers,
//   TrendingUp, Cpu, Handshake, Search, Bookmark, BookMarked,
//   ChevronRight, ChevronLeft, Layout,
//   Settings, Code2, Activity,
// } from "lucide-react";

// import heroVideo from "../../assets/collge_student.mp4";
// import discussionVideo from "../../assets/Discussion_collge.mp4";

// // Shared shell used by every other public page.
// import PublicLayout from "../Landing/components/PublicLayout";

// // ═══════════════════════════════════════════════
// //  DATA
// // ═══════════════════════════════════════════════
// const platformData = [
//   {
//     id: "dev",
//     name: "Development Engineering Platform",
//     Icon: Code2,
//     shortDesc: "Full-stack development essentials",
//     description:
//       "Master full-stack engineering with modern tools, frameworks, and architectural patterns for production-ready applications.",
//     programs: [
//       {
//         id: "ui-dev", name: "UI Development", Icon: Layout,
//         difficulty: "Beginner", duration: "8 Weeks", popular: true, beginnerFriendly: true,
//         description: "Learn to build clean, responsive, and modern user interfaces for web applications.",
//         careerOutcome: "Frontend Developer / UI Developer",
//         whoIsFor: "Students and beginners who want to build beautiful web pages and frontend screens.",
//         tools: ["HTML", "CSS", "JavaScript", "Responsive Design", "Figma Basics"],
//         syllabus: ["Web fundamentals and browser basics", "HTML structure and semantic tags", "CSS styling, box model, flexbox, and grid", "Responsive design for mobile and desktop", "JavaScript basics for UI interactions", "Forms, validation, and accessibility basics", "Landing page and dashboard UI project", "Portfolio-ready final UI project"],
//       },
//       {
//         id: "backend-dev", name: "Backend Development", Icon: Settings,
//         difficulty: "Intermediate", duration: "10 Weeks", popular: true, beginnerFriendly: false,
//         description: "Learn backend architecture, APIs, authentication, business logic, and database integration.",
//         careerOutcome: "Backend Developer / Full Stack Developer",
//         whoIsFor: "Learners who want to build server-side applications and APIs.",
//         tools: ["Java", "Spring Boot", "Node.js Basics", "REST APIs", "JWT", "PostgreSQL"],
//         syllabus: ["Backend fundamentals and client-server architecture", "REST API design and HTTP methods", "Controllers, services, repositories, and DTOs", "Authentication and authorization basics", "Database integration and transactions", "Error handling and validation", "File upload and notification basics", "Complete backend API project"],
//       },
//       {
//         id: "database", name: "Database", Icon: Database,
//         difficulty: "Beginner", duration: "6 Weeks", popular: false, beginnerFriendly: true,
//         description: "Learn database design, SQL queries, relationships, indexing, and data management.",
//         careerOutcome: "Database Developer / Backend Support Engineer",
//         whoIsFor: "Students who want strong SQL and database foundation.",
//         tools: ["SQL", "PostgreSQL", "MySQL", "ER Diagrams"],
//         syllabus: ["Database fundamentals and DBMS concepts", "Tables, rows, columns, keys, and constraints", "SQL SELECT, INSERT, UPDATE, DELETE", "Joins, grouping, sorting, and filtering", "Relationships and normalization", "Indexes and query optimization basics", "Transactions and data integrity", "Mini database design project"],
//       },
//       {
//         id: "api-soap", name: "API - SOAP", Icon: Plug,
//         difficulty: "Intermediate", duration: "5 Weeks", popular: false, beginnerFriendly: false,
//         description: "Learn SOAP APIs, XML-based services, WSDL, and enterprise integration concepts.",
//         careerOutcome: "Integration Developer / Backend Developer",
//         whoIsFor: "Learners working with enterprise or legacy service integrations.",
//         tools: ["SOAP", "XML", "WSDL", "Postman", "Java"],
//         syllabus: ["SOAP API fundamentals", "XML request and response structure", "WSDL and service contracts", "SOAP headers and body", "Error handling in SOAP services", "Testing SOAP APIs using tools", "Enterprise integration patterns", "SOAP service mini project"],
//       },
//       {
//         id: "graphql", name: "GraphQL API", Icon: Link2,
//         difficulty: "Intermediate", duration: "6 Weeks", popular: false, beginnerFriendly: false,
//         description: "Learn GraphQL schemas, queries, mutations, resolvers, and optimized data fetching.",
//         careerOutcome: "API Developer / Full Stack Developer",
//         whoIsFor: "Developers who want modern API skills beyond REST.",
//         tools: ["GraphQL", "JavaScript", "Node.js", "Apollo Basics"],
//         syllabus: ["GraphQL fundamentals", "Schema, types, and fields", "Queries and mutations", "Resolvers and data sources", "Nested data and relationships", "Error handling and validation", "GraphQL vs REST comparison", "GraphQL API mini project"],
//       },
//       {
//         id: "rest-api", name: "REST API", Icon: Globe,
//         difficulty: "Beginner to Intermediate", duration: "7 Weeks", popular: true, beginnerFriendly: true,
//         description: "Learn to design RESTful APIs using HTTP methods, status codes, resources, and clean endpoints.",
//         careerOutcome: "Backend Developer / API Developer",
//         whoIsFor: "Frontend, backend, and full-stack learners.",
//         tools: ["REST", "HTTP", "Postman", "JSON", "Java/Spring Boot"],
//         syllabus: ["REST architecture basics", "HTTP methods and status codes", "Request body, query params, and path variables", "API response structure and error format", "CRUD API development", "Authentication and protected endpoints", "API testing with Postman", "REST API final project"],
//       },
//     ],
//   },
//   {
//     id: "ai",
//     name: "AI – Agent AI",
//     Icon: Bot,
//     shortDesc: "AI, cloud, data & DevOps in one track",
//     description: "From generative AI to data pipelines — master the tools that power modern intelligent systems and cloud infrastructure.",
//     programs: [
//       {
//         id: "gen-ai", name: "Gen AI", Icon: Sparkles,
//         difficulty: "Beginner", duration: "8 Weeks", popular: true, beginnerFriendly: true,
//         description: "Learn generative AI concepts, prompt engineering, AI tools, and AI-powered workflows.",
//         careerOutcome: "AI Tools Specialist / Gen AI Associate",
//         whoIsFor: "Students, professionals, and creators who want to use AI in real work.",
//         tools: ["ChatGPT", "Prompt Engineering", "AI Agents Basics", "Automation Tools"],
//         syllabus: ["Introduction to generative AI", "LLM basics and AI model behavior", "Prompt engineering fundamentals", "Role prompts, structured prompts, and workflow planning", "AI tools for content, coding, research, and productivity", "AI agents and workflow automation basics", "Responsible AI and safety basics", "Gen AI workflow project"],
//       },
//       {
//         id: "cloud", name: "Cloud", Icon: Cloud,
//         difficulty: "Beginner", duration: "7 Weeks", popular: true, beginnerFriendly: true,
//         description: "Learn cloud fundamentals, compute, storage, networking, and deployment basics.",
//         careerOutcome: "Cloud Associate / Junior Cloud Engineer",
//         whoIsFor: "Beginners starting cloud computing.",
//         tools: ["AWS Basics", "Azure Basics", "Linux Basics", "Cloud Console"],
//         syllabus: ["Cloud computing fundamentals", "IaaS, PaaS, SaaS models", "Compute, storage, and networking basics", "Identity and access basics", "Cloud deployment concepts", "Monitoring and billing basics", "Cloud security fundamentals", "Simple cloud deployment project"],
//       },
//       {
//         id: "cloud-platform", name: "Cloud Platform", Icon: Server,
//         difficulty: "Intermediate", duration: "9 Weeks", popular: false, beginnerFriendly: false,
//         description: "Learn how cloud platforms support scalable applications, infrastructure, and enterprise systems.",
//         careerOutcome: "Cloud Platform Engineer",
//         whoIsFor: "Learners who want deeper cloud platform and infrastructure skills.",
//         tools: ["AWS/Azure/GCP Concepts", "Docker Basics", "Monitoring Tools"],
//         syllabus: ["Cloud platform architecture", "Virtual machines and container basics", "Load balancing and scaling", "Storage services and database services", "Networking and security groups", "Logging and monitoring", "Deployment architecture", "Cloud platform case study project"],
//       },
//       {
//         id: "devops", name: "DevOps", Icon: RefreshCw,
//         difficulty: "Intermediate", duration: "10 Weeks", popular: true, beginnerFriendly: false,
//         description: "Learn CI/CD, automation, deployment pipelines, containers, and release workflows.",
//         careerOutcome: "DevOps Engineer / Release Engineer",
//         whoIsFor: "Developers and operations learners who want modern deployment skills.",
//         tools: ["Git", "GitHub Actions", "Docker", "CI/CD", "Linux"],
//         syllabus: ["DevOps culture and SDLC", "Git and branching strategies", "Build and release pipelines", "CI/CD fundamentals", "Docker and container basics", "Environment variables and deployment configs", "Monitoring deployment health", "CI/CD pipeline project"],
//       },
//       {
//         id: "sre", name: "SRE", Icon: Shield,
//         difficulty: "Advanced", duration: "8 Weeks", popular: false, beginnerFriendly: false,
//         description: "Learn reliability engineering, monitoring, incident response, SLAs, SLOs, and system stability.",
//         careerOutcome: "Site Reliability Engineer",
//         whoIsFor: "Cloud, DevOps, and backend learners interested in production reliability.",
//         tools: ["Monitoring", "Logging", "Alerting", "Linux", "Incident Management"],
//         syllabus: ["SRE fundamentals", "SLIs, SLOs, and SLAs", "Monitoring and observability", "Incident response workflow", "Error budgets and reliability planning", "Capacity and performance basics", "Postmortems and RCA", "Reliability improvement project"],
//       },
//       {
//         id: "data-engineering", name: "Data Engineering", Icon: Package,
//         difficulty: "Intermediate", duration: "10 Weeks", popular: true, beginnerFriendly: false,
//         description: "Learn data pipelines, ETL workflows, warehouses, and large-scale data processing systems.",
//         careerOutcome: "Data Engineer",
//         whoIsFor: "Learners who want to build systems that move and transform data.",
//         tools: ["SQL", "Python Basics", "ETL", "Data Warehouse Concepts"],
//         syllabus: ["Data engineering fundamentals", "Data sources and ingestion", "ETL and ELT workflows", "Batch processing basics", "Data warehouse concepts", "Data quality and validation", "Pipeline scheduling basics", "Data pipeline project"],
//       },
//       {
//         id: "data-engineer", name: "Data Engineer", Icon: Wrench,
//         difficulty: "Intermediate", duration: "9 Weeks", popular: false, beginnerFriendly: false,
//         description: "Prepare for data engineer roles with databases, pipelines, cloud data tools, and analytics systems.",
//         careerOutcome: "Junior Data Engineer",
//         whoIsFor: "Students targeting data engineer jobs.",
//         tools: ["SQL", "Python", "Cloud Data Basics", "Pipelines"],
//         syllabus: ["Role of a data engineer", "SQL for data engineering", "Python for data workflows", "Data modeling basics", "Pipeline design patterns", "Cloud data services overview", "Data validation and monitoring", "Data engineer portfolio project"],
//       },
//       {
//         id: "data-analyst", name: "Data Analyst", Icon: BarChart2,
//         difficulty: "Beginner", duration: "8 Weeks", popular: true, beginnerFriendly: true,
//         description: "Learn data analysis, dashboards, reporting, SQL, Excel, BI tools, and business insights.",
//         careerOutcome: "Data Analyst / BI Analyst",
//         whoIsFor: "Learners who want analytics and reporting roles.",
//         tools: ["Excel", "SQL", "Power BI/Tableau Concepts", "Dashboards"],
//         syllabus: ["Data analysis fundamentals", "Excel for data cleaning and reporting", "SQL for analysis", "Metrics and KPIs", "Dashboard design basics", "Data visualization best practices", "Business insight storytelling", "Analytics dashboard project"],
//       },
//       {
//         id: "data-scientist", name: "Data Scientist", Icon: FlaskConical,
//         difficulty: "Advanced", duration: "12 Weeks", popular: false, beginnerFriendly: false,
//         description: "Learn machine learning, statistics, model building, data exploration, and predictive analytics.",
//         careerOutcome: "Junior Data Scientist / ML Associate",
//         whoIsFor: "Learners interested in AI, ML, prediction, and advanced analytics.",
//         tools: ["Python", "Statistics", "Machine Learning Basics", "Jupyter"],
//         syllabus: ["Data science fundamentals", "Python for data science", "Statistics and probability basics", "Data cleaning and exploration", "Machine learning fundamentals", "Model training and evaluation", "Prediction and classification use cases", "Data science capstone project"],
//       },
//     ],
//   },
//   {
//     id: "cx",
//     name: "Contact Center Platform",
//     Icon: Headphones,
//     shortDesc: "AI-powered CX & conversation design",
//     description: "Design intelligent customer experiences using AI-driven bots, conversation platforms, and modern CX frameworks.",
//     programs: [
//       {
//         id: "cx-ai", name: "AI", Icon: Bot,
//         difficulty: "Beginner", duration: "6 Weeks", popular: true, beginnerFriendly: true,
//         description: "Understand how AI improves customer support, automation, routing, and service quality.",
//         careerOutcome: "AI Customer Experience Associate",
//         whoIsFor: "Learners interested in AI-powered customer experience and support systems.",
//         tools: ["AI Basics", "Customer Support Automation", "Analytics"],
//         syllabus: ["AI in customer experience", "Customer intent and automation", "Smart routing and response suggestions", "AI-assisted agent workflows", "Quality monitoring basics", "Customer analytics basics", "AI ethics in support", "AI support use case project"],
//       },
//       {
//         id: "chatbot", name: "Chatbot", Icon: MessageSquare,
//         difficulty: "Beginner", duration: "6 Weeks", popular: true, beginnerFriendly: true,
//         description: "Learn chatbot flows, conversation design, FAQ automation, and customer interaction handling.",
//         careerOutcome: "Chatbot Designer / CX Automation Associate",
//         whoIsFor: "Support teams and learners building customer-facing bot experiences.",
//         tools: ["Conversation Design", "Bot Flow Builder Concepts", "FAQ Automation"],
//         syllabus: ["Chatbot fundamentals", "Conversation design basics", "Intents, entities, and FAQs", "Bot flow planning", "Fallback and escalation handling", "Testing chatbot conversations", "Customer journey mapping", "Chatbot flow project"],
//       },
//       {
//         id: "ai-bot", name: "AI BOT", Icon: Brain,
//         difficulty: "Intermediate", duration: "7 Weeks", popular: true, beginnerFriendly: false,
//         description: "Build intelligent AI bot experiences with automation, natural language, and smart responses.",
//         careerOutcome: "AI Bot Developer / Automation Associate",
//         whoIsFor: "Learners who want to build smarter bots for customer support and automation.",
//         tools: ["AI Bot Concepts", "NLP Basics", "Automation Workflows"],
//         syllabus: ["AI bot fundamentals", "NLP and intent detection basics", "Smart response generation", "Automation actions and triggers", "Human handoff and escalation", "Bot analytics and improvement", "AI bot testing strategy", "AI bot automation project"],
//       },
//       {
//         id: "tora-cx", name: "TORA CX", Icon: Zap,
//         difficulty: "Intermediate", duration: "8 Weeks", popular: false, beginnerFriendly: false,
//         description: "Explore TORA CX contact center platform concepts for customer experience and support operations.",
//         careerOutcome: "CX Platform Associate / Contact Center Operations Associate",
//         whoIsFor: "Learners and teams working with contact center platforms and customer experience systems.",
//         tools: ["TORA CX Concepts", "Contact Center Workflows", "Reporting", "Automation"],
//         syllabus: ["Contact center platform fundamentals", "Customer experience workflows", "Agent and supervisor operations", "Ticket routing and queue management", "Reporting and performance metrics", "Automation in CX platforms", "Quality and compliance basics", "TORA CX workflow project"],
//       },
//     ],
//   },
// ];

// // ═══════════════════════════════════════════════
// //  HELPERS
// // ═══════════════════════════════════════════════
// function getDifficultyClass(difficulty) {
//   const d = difficulty.toLowerCase();
//   if (d.includes("beginner") && !d.includes("intermediate")) return "Beginner";
//   if (d.includes("intermediate")) return "Intermediate";
//   if (d.includes("advanced")) return "Advanced";
//   return "other";
// }

// function findProgramById(programId) {
//   for (const platform of platformData) {
//     const prog = platform.programs.find((p) => p.id === programId);
//     if (prog) return { program: prog, platform };
//   }
//   return null;
// }

// // ── ROLES ──
// const ROLES = [
//   { id: "engineering", label: "Engineering",         Icon: Code2 },
//   { id: "product",     label: "Product Manager",     Icon: Target },
//   { id: "data",        label: "Data & Analytics",    Icon: BarChart2 },
//   { id: "cloud",       label: "Cloud & DevOps",      Icon: Cloud },
//   { id: "ai",          label: "AI & Automation",     Icon: Bot },
//   { id: "cx",          label: "Customer Experience", Icon: Headphones },
// ];

// // program id -> role ids (ek program ke multiple roles ho sakte hain)
// const PROGRAM_ROLES = {
//   "ui-dev":           ["engineering"],
//   "backend-dev":      ["engineering"],
//   "database":         ["engineering", "data"],
//   "api-soap":         ["engineering"],
//   "graphql":          ["engineering"],
//   "rest-api":         ["engineering"],
//   "gen-ai":           ["ai", "product"],
//   "cloud":            ["cloud"],
//   "cloud-platform":   ["cloud"],
//   "devops":           ["cloud", "engineering"],
//   "sre":              ["cloud", "engineering"],
//   "data-engineering": ["data", "engineering"],
//   "data-engineer":    ["data", "engineering"],
//   "data-analyst":     ["data", "product"],
//   "data-scientist":   ["data", "ai"],
//   "cx-ai":            ["cx", "ai", "product"],
//   "chatbot":          ["cx", "ai"],
//   "ai-bot":           ["ai", "cx"],
//   "tora-cx":          ["cx", "product"],
// };

// function getProgramRoles(programId) {
//   return (PROGRAM_ROLES[programId] || [])
//     .map((rid) => ROLES.find((r) => r.id === rid))
//     .filter(Boolean);
// }

// // ═══════════════════════════════════════════════
// //  STYLES
// //  Everything is scoped under `.ilm-plat` so nothing leaks into
// //  PublicLayout's shared navbar / footer.
// //
// //  Breakpoints used (covers all devices):
// //   ≥1280  large desktop / laptop
// //   ≤1180  iPad Pro 11" / small laptop
// //   ≤1024  iPad / iPad Air landscape / tablet landscape
// //   ≤960   sidebar becomes horizontal tabs (iPad portrait)
// //   ≤820   iPad Air / iPad portrait
// //   ≤768   iPad mini / tablets
// //   ≤640   large phones (Pixel, iPhone Pro Max)
// //   ≤480   phones (iPhone 12-15, Pixel 7/8)
// //   ≤375   small phones (iPhone SE, mini)
// //   ≤340   very small (Galaxy Fold)
// // ═══════════════════════════════════════════════
// const cssText = `
// .ilm-plat {
//   --bg: #fffaf5; --surface: #ffffff; --surface2: #fdf6ee;
//   --dark: #0f172a; --dark2: #1e293b; --mid: #374151; --muted: #64748b;
//   --border: #e8e0d6; --border2: #f0e8df;
//   --orange: #f97316; --orange-d: #ea6c0a; --orange-lt: #fff7ed;
//   --orange-md: #fed7aa; --orange-glow: rgba(249,115,22,.18);
//   --green: #16a34a; --green-lt: #f0fdf4;
//   --radius-sm: 8px; --radius: 14px; --radius-lg: 20px;
//   --shadow-sm: 0 1px 6px rgba(15,23,42,.06);
//   --shadow: 0 4px 20px rgba(15,23,42,.09);
//   --shadow-lg: 0 12px 48px rgba(15,23,42,.13);
//   --transition: .22s cubic-bezier(.4,0,.2,1);
//   --font-display: 'Georgia','Times New Roman',serif;
//   --font-body: 'Segoe UI',system-ui,-apple-system,sans-serif;
//   --nav-offset: 90px;

//   font-family: var(--font-body);
//   background: var(--bg);
//   color: var(--dark);
//   line-height: 1.6;
//   font-size: 16px;
//   scroll-behavior: smooth;
//   transition: background var(--transition), color var(--transition);
//   width: 100%;
//   max-width: 100%;
//   overflow-x: hidden;
//   -webkit-text-size-adjust: 100%;
//   text-size-adjust: 100%;
// }
// .ilm-plat[data-theme="dark"] {
//   --bg: #0f1117; --surface: #1a1f2e; --surface2: #141824;
//   --dark: #f1f5f9; --dark2: #e2e8f0; --mid: #cbd5e1; --muted: #94a3b8;
//   --border: #2a3244; --border2: #222840;
//   --orange-lt: #1c1208; --orange-md: #7c3d12; --green-lt: #052e16;
// }
// .ilm-plat, .ilm-plat *, .ilm-plat *::before, .ilm-plat *::after { box-sizing: border-box; }
// .ilm-plat a { text-decoration: none; color: inherit; }
// .ilm-plat ul { list-style: none; margin: 0; padding: 0; }
// .ilm-plat button { font-family: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
// .ilm-plat img, .ilm-plat video { max-width: 100%; }
// .ilm-plat h1, .ilm-plat h2, .ilm-plat h3, .ilm-plat p { margin-top: 0; }
// .ilm-plat ::-webkit-scrollbar { width: 6px; height: 6px; }
// .ilm-plat ::-webkit-scrollbar-track { background: var(--bg); }
// .ilm-plat ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }
// .ilm-plat ::-webkit-scrollbar-thumb:hover { background: var(--orange); }
// .ilm-plat button:focus-visible,
// .ilm-plat input:focus-visible,
// .ilm-plat article:focus-visible {
//   outline: 2px solid var(--orange); outline-offset: 2px;
// }

// /* ══════════════════════════════════════════════
//    HERO
// ══════════════════════════════════════════════ */
// .ilmora-hero {
//   position: relative; overflow: hidden;
//   padding: 72px 32px;
//   background: var(--bg);
// }
// .ilmora-hero::before {
//   content: ''; position: absolute; inset: 0; pointer-events: none;
//   background:
//     radial-gradient(ellipse 60% 70% at 0% 50%, rgba(249,115,22,.10) 0%, transparent 60%),
//     radial-gradient(ellipse 40% 50% at 100% 20%, rgba(22,163,74,.07) 0%, transparent 55%);
// }
// .ilmora-hero-inner {
//   max-width: 1200px; margin: 0 auto;
//   display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 480px);
//   gap: 52px; align-items: center; position: relative;
// }
// .ilmora-hero-text { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; }
// .ilmora-hero-badge {
//   display: inline-flex; align-items: center; gap: 8px;
//   background: var(--orange-lt); border: 1.5px solid var(--orange-md);
//   color: var(--orange); font-size: .78rem; font-weight: 700;
//   letter-spacing: .04em; text-transform: uppercase;
//   padding: 5px 15px; border-radius: 999px; margin-bottom: 22px;
//   animation: ilmoraFadeUp .5s ease both;
// }
// .ilmora-hero h1 {
//   font-family: var(--font-display);
//   font-size: clamp(1.75rem, 4vw, 3.2rem); font-weight: 700;
//   letter-spacing: -.5px; line-height: 1.18; margin-bottom: 18px;
//   color: var(--dark); animation: ilmoraFadeUp .55s .06s ease both;
//   overflow-wrap: anywhere;
// }
// .ilmora-hero h1 .highlight {
//   color: var(--orange); position: relative; display: inline-block;
// }
// .ilmora-hero h1 .highlight::after {
//   content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
//   height: 3px; background: var(--orange); border-radius: 999px; opacity: .35;
// }
// .ilmora-hero-sub {
//   font-size: 1rem; color: var(--muted); max-width: 520px;
//   margin: 0 0 32px; line-height: 1.7;
//   animation: ilmoraFadeUp .6s .12s ease both;
// }
// .ilmora-hero-btns {
//   display: flex; gap: 12px; flex-wrap: wrap;
//   animation: ilmoraFadeUp .65s .18s ease both;
// }
// .ilmora-btn-primary {
//   display: inline-flex; align-items: center; justify-content: center; gap: 7px;
//   background: var(--orange); color: #fff; padding: 13px 28px; min-height: 44px;
//   border-radius: 10px; font-size: .95rem; font-weight: 700; border: none;
//   transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
//   cursor: pointer;
// }
// .ilmora-btn-primary:hover {
//   background: var(--orange-d); transform: translateY(-2px);
//   box-shadow: 0 8px 28px rgba(249,115,22,.35);
// }
// .ilmora-hero-stats {
//   display: flex; gap: 40px; flex-wrap: wrap;
//   margin-top: 44px; animation: ilmoraFadeUp .7s .24s ease both;
// }
// .ilmora-hero-stat { text-align: left; }
// .ilmora-hero-stat .num {
//   font-family: var(--font-display); font-size: 1.8rem;
//   font-weight: 700; color: var(--dark);
// }
// .ilmora-hero-stat .num b { color: var(--orange); }
// .ilmora-hero-stat .lbl { font-size: .75rem; color: var(--muted); font-weight: 500; margin-top: 1px; }
// .ilmora-hero-video-wrap {
//   position: relative; border-radius: 20px; overflow: hidden;
//   box-shadow: 0 24px 64px rgba(15,23,42,.18), 0 0 0 1.5px var(--border);
//   animation: ilmoraFadeUp .7s .3s ease both;
//   aspect-ratio: 16/10; background: var(--dark2);
//   width: 100%; min-width: 0;
// }
// .ilmora-hero-video-wrap video {
//   width: 100%; height: 100%; object-fit: cover; display: block;
// }
// .ilmora-hero-video-wrap::before {
//   content: ''; position: absolute; top: 0; left: 0; right: 0;
//   height: 3px; background: linear-gradient(90deg, var(--orange), var(--green)); z-index: 2;
// }
// .ilmora-video-badge {
//   position: absolute; bottom: 16px; left: 16px; right: 16px; width: fit-content; max-width: calc(100% - 32px);
//   background: rgba(15,23,42,.82); backdrop-filter: blur(10px);
//   color: #fff; font-size: .75rem; font-weight: 700;
//   padding: 7px 14px; border-radius: 999px;
//   border: 1px solid rgba(255,255,255,.12);
//   display: flex; align-items: center; gap: 7px;
//   z-index: 3; letter-spacing: .03em;
// }
// .ilmora-video-badge .vbdot {
//   width: 7px; height: 7px; border-radius: 50%;
//   background: #22c55e;
//   animation: livePulse 1.4s ease-in-out infinite;
//   flex-shrink: 0;
// }
// @keyframes livePulse {
//   0%,100% { opacity: 1; transform: scale(1); }
//   50% { opacity: .5; transform: scale(1.35); }
// }

// /* SECTION */
// .ilmora-section-wrap { max-width: 1280px; margin: 0 auto; padding: 0 32px; width: 100%; }
// .ilmora-section-header { text-align: center; margin-bottom: 36px; }
// .ilmora-section-tag {
//   display: inline-flex; align-items: center; gap: 6px;
//   background: var(--orange-lt); color: var(--orange);
//   font-size: .75rem; font-weight: 700; letter-spacing: .06em;
//   text-transform: uppercase; padding: 4px 13px;
//   border-radius: 999px; margin-bottom: 14px;
// }
// .ilmora-section-header h2 {
//   font-family: var(--font-display);
//   font-size: clamp(1.5rem, 3vw, 2.4rem); font-weight: 700;
//   letter-spacing: -.3px; margin-bottom: 12px; line-height: 1.25;
// }
// .ilmora-section-header p {
//   color: var(--muted); max-width: 540px; margin: 0 auto; font-size: .95rem;
// }

// /* ══════════════════════════════════════════════
//    LAYOUT: LEFT SIDEBAR + CONTENT
// ══════════════════════════════════════════════ */
// .ilmora-layout {
//   display: grid; grid-template-columns: 270px minmax(0, 1fr);
//   gap: 28px; align-items: start;
// }

// /* SIDEBAR (docs-style left nav) */
// .ilmora-sidebar {
//   position: sticky; top: var(--nav-offset);
//   max-height: calc(100vh - 110px); overflow-y: auto;
//   background: var(--surface); border: 1.5px solid var(--border);
//   border-radius: var(--radius); padding: 14px 10px 16px;
//   min-width: 0;
// }
// .ilmora-sb-head {
//   display: flex; align-items: center; justify-content: space-between;
//   gap: 8px; padding: 4px 10px 10px;
// }
// .ilmora-sb-label { font-size: .78rem; font-weight: 700; color: var(--dark); }
// .ilmora-sb-pill {
//   display: inline-flex; align-items: center; gap: 5px;
//   background: var(--orange-lt); border: 1px solid var(--orange-md);
//   color: var(--orange); font-size: .62rem; font-weight: 700;
//   padding: 2px 8px; border-radius: 999px; letter-spacing: .03em;
// }
// .ilmora-sb-pill .pdot {
//   width: 6px; height: 6px; border-radius: 50%; background: var(--orange);
//   animation: livePulse 1.4s ease-in-out infinite;
// }
// .ilmora-sb-nav { display: flex; flex-direction: column; gap: 2px; }
// .ilmora-sb-item {
//   width: 100%; display: flex; align-items: center; gap: 10px;
//   padding: 9px 10px; min-height: 40px; border: none; border-radius: 8px;
//   background: transparent; color: var(--mid);
//   font-size: .86rem; font-weight: 500; text-align: left;
//   transition: background var(--transition), color var(--transition);
// }
// .ilmora-sb-item:hover { background: var(--surface2); color: var(--dark); }
// .ilmora-sb-item.active { background: var(--surface2); color: var(--dark); font-weight: 700; }
// .ilmora-sb-item-icon {
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0; color: var(--muted);
// }
// .ilmora-sb-item.active .ilmora-sb-item-icon { color: var(--orange); }
// .ilmora-sb-item-name { flex: 1; line-height: 1.3; min-width: 0; }
// .ilmora-sb-count {
//   font-size: .68rem; font-weight: 700; color: var(--muted);
//   background: var(--bg); border: 1px solid var(--border);
//   min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px;
//   display: inline-flex; align-items: center; justify-content: center;
// }
// .ilmora-sb-item.active .ilmora-sb-count {
//   background: var(--orange); border-color: var(--orange); color: #fff;
// }
// .ilmora-sb-chev { flex-shrink: 0; color: var(--muted); transition: transform var(--transition); }
// .ilmora-sb-item.active .ilmora-sb-chev { transform: rotate(90deg); color: var(--orange); }
// .ilmora-sb-item.active.collapsed .ilmora-sb-chev { transform: rotate(0deg); }
// .ilmora-sb-sub {
//   margin: 2px 0 8px 19px; padding-left: 10px;
//   border-left: 1.5px solid var(--border);
//   display: flex; flex-direction: column; gap: 1px;
//   animation: ilmoraCardIn .25s ease both;
// }
// .ilmora-sb-subitem {
//   width: 100%; display: block; text-align: left;
//   padding: 7px 10px; min-height: 34px; border: none; border-radius: 6px;
//   background: transparent; color: var(--muted);
//   font-size: .8rem; font-weight: 500;
//   transition: background var(--transition), color var(--transition);
// }
// .ilmora-sb-subitem:hover { background: var(--surface2); color: var(--orange); }
// .ilmora-sb-subitem.current { background: var(--orange-lt); color: var(--orange); font-weight: 700; }

// /* PLATFORM SECTION */
// .ilmora-platforms-section { padding: 80px 0; }
// .ilmora-programs-panel { min-height: 400px; min-width: 0; scroll-margin-top: var(--nav-offset); }
// .ilmora-panel-top {
//   background: var(--surface); border: 1.5px solid var(--border);
//   border-radius: var(--radius); padding: 24px 28px 20px; margin-bottom: 20px;
// }
// .ilmora-panel-title-row {
//   display: flex; align-items: flex-start; justify-content: space-between;
//   gap: 16px; flex-wrap: wrap; margin-bottom: 8px;
// }
// .ilmora-panel-icon-name { display: flex; align-items: center; gap: 12px; min-width: 0; }
// .ilmora-panel-icon {
//   width: 46px; height: 46px;
//   background: var(--orange-lt); border: 1.5px solid var(--orange-md);
//   border-radius: 12px; display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0; color: var(--orange);
// }
// .ilmora-panel-title {
//   font-family: var(--font-display); font-size: 1.35rem;
//   font-weight: 700; color: var(--dark); line-height: 1.25; overflow-wrap: anywhere;
// }
// .ilmora-panel-badge {
//   background: var(--orange); color: #fff; font-size: .75rem; font-weight: 700;
//   padding: 4px 12px; border-radius: 999px; flex-shrink: 0;
//   align-self: flex-start; margin-top: 2px;
// }
// .ilmora-panel-desc { font-size: .875rem; color: var(--muted); margin-bottom: 18px; line-height: 1.65; }
// .ilmora-panel-controls { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
// .ilmora-panel-search-wrap { position: relative; flex: 1; min-width: 200px; }
// .ilmora-panel-search-wrap .ilmora-search-icon {
//   position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
//   display: flex; align-items: center; color: var(--muted); pointer-events: none;
// }
// .ilmora-panel-search {
//   width: 100%; padding: 10px 12px 10px 38px; min-height: 42px;
//   border: 1.5px solid var(--border); border-radius: var(--radius-sm);
//   background: var(--bg); color: var(--dark);
//   font-size: 16px; /* 16px prevents iOS Safari zoom on focus */
//   transition: border-color var(--transition), box-shadow var(--transition); outline: none;
// }
// .ilmora-panel-search:focus { border-color: var(--orange); box-shadow: 0 0 0 3px var(--orange-glow); }
// .ilmora-panel-search::placeholder { color: var(--muted); }
// .ilmora-filter-btns { display: flex; gap: 6px; flex-wrap: wrap; }
// .ilmora-filter-btn {
//   padding: 8px 14px; min-height: 40px; border-radius: var(--radius-sm);
//   font-size: .8rem; font-weight: 600; white-space: nowrap;
//   background: var(--bg); color: var(--muted);
//   border: 1.5px solid var(--border); transition: all var(--transition); cursor: pointer;
// }
// .ilmora-filter-btn:hover { border-color: var(--orange-md); color: var(--dark); }
// .ilmora-filter-btn.active {
//   background: var(--orange); color: #fff; border-color: var(--orange);
//   box-shadow: 0 2px 10px rgba(249,115,22,.25);
// }

// /* PROGRAM CARDS */
// .ilmora-programs-grid {
//   display: grid; grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
//   gap: 16px; transition: opacity var(--transition);
// }
// .ilmora-programs-grid.fading { opacity: 0; transform: translateY(8px); }
// .ilmora-prog-card {
//   background: var(--surface); border: 1.5px solid var(--border);
//   border-radius: var(--radius); padding: 20px; cursor: pointer;
//   display: flex; flex-direction: column; gap: 10px; min-width: 0;
//   transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
//   animation: ilmoraCardIn .3s ease both;
// }
// .ilmora-prog-card:hover {
//   border-color: var(--orange-md);
//   box-shadow: 0 6px 28px rgba(249,115,22,.12);
//   transform: translateY(-3px);
// }
// .ilmora-prog-card-head { display: flex; align-items: center; gap: 12px; }
// .ilmora-prog-card-icon {
//   width: 40px; height: 40px; border-radius: 10px;
//   background: var(--orange-lt); border: 1.5px solid var(--orange-md);
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0; color: var(--orange);
// }
// .ilmora-prog-card-name { font-size: .925rem; font-weight: 700; color: var(--dark); line-height: 1.3; overflow-wrap: anywhere; }
// .ilmora-prog-card-desc { font-size: .8rem; color: var(--muted); line-height: 1.55; flex: 1; }
// .ilmora-prog-card-badges { display: flex; gap: 6px; flex-wrap: wrap; }
// .ilmora-badge {
//   display: inline-flex; align-items: center; gap: 4px;
//   font-size: .7rem; font-weight: 700; padding: 2px 8px;
//   border-radius: 999px; border: 1.5px solid;
// }
// .ilmora-badge-Beginner { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
// .ilmora-badge-Intermediate { background: #fff7ed; color: #f97316; border-color: #fed7aa; }
// .ilmora-badge-Advanced { background: #fff1f2; color: #e11d48; border-color: #fecdd3; }
// .ilmora-badge-other { background: var(--surface2); color: var(--muted); border-color: var(--border); }
// .ilmora-badge-duration { background: var(--surface2); color: var(--muted); border-color: var(--border); }
// .ilmora-badge-popular { background: #fff7ed; color: #f97316; border-color: #fed7aa; }
// .ilmora-badge-beginner-friendly { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
// .ilmora-prog-card-actions { display: flex; gap: 8px; margin-top: 2px; }
// .ilmora-btn-syllabus {
//   flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
//   background: var(--orange); color: #fff; padding: 8px 14px; min-height: 40px;
//   border-radius: 8px; font-size: .78rem; font-weight: 700; border: none;
//   transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
// }
// .ilmora-btn-syllabus:hover {
//   background: var(--orange-d); transform: translateY(-1px);
//   box-shadow: 0 4px 14px rgba(249,115,22,.3);
// }
// .ilmora-btn-save {
//   display: inline-flex; align-items: center; justify-content: center; gap: 5px;
//   background: var(--bg); color: var(--muted); padding: 8px 12px; min-height: 40px;
//   border-radius: 8px; font-size: .78rem; font-weight: 600;
//   border: 1.5px solid var(--border); transition: all var(--transition); white-space: nowrap;
// }
// .ilmora-btn-save:hover { border-color: var(--orange-md); color: var(--orange); background: var(--orange-lt); }
// .ilmora-btn-save.saved { background: var(--orange-lt); color: var(--orange); border-color: var(--orange); }

// /* ROLE FILTER + TAGS */
// .ilmora-role-bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
// .ilmora-role-bar-label {
//   font-size: .75rem; font-weight: 700; color: var(--muted);
//   text-transform: uppercase; letter-spacing: .05em; margin-right: 4px;
// }
// .ilmora-role-chip {
//   display: inline-flex; align-items: center; gap: 6px;
//   padding: 7px 14px; min-height: 38px; border-radius: 999px;
//   font-size: .8rem; font-weight: 600; white-space: nowrap;
//   background: var(--surface); color: var(--muted);
//   border: 1.5px solid var(--border); transition: all var(--transition);
// }
// .ilmora-role-chip:hover { border-color: var(--orange-md); color: var(--dark); }
// .ilmora-role-chip.active { background: var(--orange-lt); color: var(--orange); border-color: var(--orange); }
// .ilmora-prog-card-roles { display: flex; gap: 6px; flex-wrap: wrap; }
// .ilmora-role-tag {
//   display: inline-flex; align-items: center; gap: 4px;
//   font-size: .68rem; font-weight: 600; padding: 2px 8px;
//   border-radius: 6px; background: var(--surface2);
//   color: var(--mid); border: 1px solid var(--border);
// }

// /* EMPTY STATE */
// .ilmora-empty-state { grid-column: 1/-1; text-align: center; padding: 56px 20px; }
// .ilmora-empty-state .empty-icon {
//   display: flex; justify-content: center; margin-bottom: 14px; opacity: .4; color: var(--muted);
// }
// .ilmora-empty-state h3 { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
// .ilmora-empty-state p { color: var(--muted); font-size: .875rem; }

// /* ══════════════════════════════════════════════
//    INLINE PROGRAM DETAIL  (replaces the old popup modal)
// ══════════════════════════════════════════════ */
// .ilmora-detail {
//   background: var(--surface); border: 1.5px solid var(--border);
//   border-radius: var(--radius); overflow: hidden;
//   animation: ilmoraCardIn .3s ease both;
// }
// .ilmora-detail-bar {
//   display: flex; align-items: center; justify-content: space-between;
//   gap: 12px; flex-wrap: wrap;
//   padding: 14px 24px; border-bottom: 1.5px solid var(--border);
//   background: var(--surface2);
// }
// .ilmora-detail-back {
//   display: inline-flex; align-items: center; gap: 6px;
//   background: var(--surface); color: var(--mid);
//   padding: 8px 14px; min-height: 40px; border-radius: var(--radius-sm);
//   font-size: .82rem; font-weight: 700; border: 1.5px solid var(--border);
//   transition: all var(--transition);
// }
// .ilmora-detail-back:hover { border-color: var(--orange); color: var(--orange); background: var(--orange-lt); }
// .ilmora-detail-crumb {
//   font-size: .78rem; color: var(--muted); font-weight: 600;
//   min-width: 0; overflow-wrap: anywhere;
// }
// .ilmora-detail-crumb b { color: var(--orange); font-weight: 700; }
// .ilmora-detail-head {
//   display: flex; align-items: center; gap: 16px;
//   padding: 26px 28px 8px;
// }
// .ilmora-detail-icon {
//   width: 56px; height: 56px; border-radius: 14px;
//   background: var(--orange-lt); border: 1.5px solid var(--orange-md);
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0; color: var(--orange);
// }
// .ilmora-detail-title {
//   font-family: var(--font-display); font-size: clamp(1.25rem, 2.6vw, 1.7rem);
//   font-weight: 700; color: var(--dark); line-height: 1.25; margin: 0 0 6px;
//   overflow-wrap: anywhere;
// }
// .ilmora-detail-platform {
//   font-size: .78rem; color: var(--orange); font-weight: 600;
//   background: var(--orange-lt); border: 1px solid var(--orange-md);
//   padding: 2px 10px; border-radius: 999px; display: inline-block;
//   max-width: 100%; overflow-wrap: anywhere;
// }
// .ilmora-detail-body { padding: 18px 28px 28px; }
// .ilmora-detail-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
// .ilmora-detail-desc {
//   font-size: .92rem; color: var(--muted); line-height: 1.7; margin-bottom: 22px;
//   padding: 16px; background: var(--surface2); border-radius: var(--radius-sm);
//   border: 1px solid var(--border2);
// }
// .ilmora-detail-info-grid {
//   display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
//   gap: 14px; margin-bottom: 24px;
// }
// .ilmora-detail-info-block {
//   background: var(--surface2); border: 1px solid var(--border2);
//   border-radius: var(--radius-sm); padding: 14px 16px; min-width: 0;
// }
// .ilmora-detail-info-label {
//   display: flex; align-items: center; gap: 5px;
//   font-size: .7rem; font-weight: 700; color: var(--orange);
//   text-transform: uppercase; letter-spacing: .05em; margin-bottom: 5px;
// }
// .ilmora-detail-info-value { font-size: .875rem; color: var(--dark); font-weight: 600; overflow-wrap: anywhere; }
// .ilmora-detail-section { margin-bottom: 24px; }
// .ilmora-detail-section-title {
//   display: flex; align-items: center; gap: 7px;
//   font-size: .9rem; font-weight: 700; color: var(--dark); margin-bottom: 12px;
// }
// .ilmora-tools-list { display: flex; gap: 7px; flex-wrap: wrap; }
// .ilmora-tool-tag {
//   background: var(--surface2); color: var(--mid); font-size: .77rem;
//   font-weight: 600; padding: 4px 11px; border-radius: 999px;
//   border: 1px solid var(--border); overflow-wrap: anywhere;
// }
// .ilmora-syllabus-list {
//   display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px;
// }
// .ilmora-syllabus-item {
//   display: flex; align-items: flex-start; gap: 10px;
//   background: var(--surface2); border: 1px solid var(--border2);
//   border-radius: var(--radius-sm); padding: 11px 14px;
//   font-size: .845rem; color: var(--dark); line-height: 1.5; min-width: 0;
// }
// .ilmora-syllabus-item span:last-child { overflow-wrap: anywhere; }
// .ilmora-syllabus-num {
//   width: 22px; height: 22px; border-radius: 50%;
//   background: var(--orange); color: #fff; font-size: .7rem; font-weight: 700;
//   display: flex; align-items: center; justify-content: center;
//   flex-shrink: 0; margin-top: 1px;
// }
// .ilmora-detail-footer {
//   display: flex; align-items: center; justify-content: space-between;
//   gap: 12px; flex-wrap: wrap;
//   padding: 16px 28px; border-top: 1.5px solid var(--border);
//   background: var(--surface2);
// }
// .ilmora-detail-nav { display: flex; gap: 8px; flex-wrap: wrap; }
// .ilmora-btn-ghost {
//   display: inline-flex; align-items: center; justify-content: center; gap: 6px;
//   background: var(--surface); color: var(--mid); padding: 9px 16px; min-height: 42px;
//   border-radius: var(--radius-sm); font-size: .84rem; font-weight: 600;
//   border: 1.5px solid var(--border); transition: all var(--transition);
// }
// .ilmora-btn-ghost:hover:not(:disabled) { border-color: var(--orange-md); color: var(--orange); }
// .ilmora-btn-ghost:disabled { opacity: .45; cursor: not-allowed; }
// .ilmora-btn-modal-save {
//   display: inline-flex; align-items: center; justify-content: center; gap: 6px;
//   background: var(--orange); color: #fff; padding: 10px 22px; min-height: 42px;
//   border-radius: var(--radius-sm); font-size: .875rem; font-weight: 700; border: none;
//   transition: background var(--transition), transform var(--transition);
// }
// .ilmora-btn-modal-save:hover { background: var(--orange-d); transform: translateY(-1px); }
// .ilmora-btn-modal-save.saved { background: var(--orange-lt); color: var(--orange); border: 1.5px solid var(--orange); }

// /* WHY CHOOSE */
// .ilmora-why-section { padding: 80px 0; background: var(--surface); }
// .ilmora-why-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
// .ilmora-why-card {
//   background: var(--bg); border: 1.5px solid var(--border);
//   border-radius: var(--radius); padding: 30px 26px;
//   transition: box-shadow var(--transition), transform var(--transition);
// }
// .ilmora-why-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
// .ilmora-why-icon {
//   width: 50px; height: 50px; border-radius: 12px;
//   background: var(--orange-lt); border: 1.5px solid var(--orange-md);
//   display: flex; align-items: center; justify-content: center;
//   margin-bottom: 16px; color: var(--orange);
// }
// .ilmora-why-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
// .ilmora-why-card p { font-size: .83rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

// .ilmora-discussion-strip {
//   margin-bottom: 52px; display: grid;
//   grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; align-items: center;
// }
// .ilmora-discussion-video-wrap {
//   position: relative; border-radius: 18px; overflow: hidden;
//   box-shadow: 0 16px 48px rgba(15,23,42,.14), 0 0 0 1.5px var(--border);
//   aspect-ratio: 16/9; background: var(--dark2); width: 100%;
// }
// .ilmora-discussion-video-wrap video { width: 100%; height: 100%; object-fit: cover; display: block; }
// .ilmora-discussion-video-wrap::after {
//   content: ''; position: absolute; inset: 0;
//   background: linear-gradient(135deg, rgba(249,115,22,.08) 0%, transparent 60%);
//   pointer-events: none;
// }
// .ilmora-discussion-video-wrap::before {
//   content: ''; position: absolute; top: 0; left: 0; right: 0;
//   height: 3px; background: linear-gradient(90deg, var(--green), var(--orange)); z-index: 2;
// }
// .ilmora-discussion-text h3 {
//   font-family: var(--font-display); font-size: clamp(1.3rem, 2.4vw, 1.6rem); font-weight: 700;
//   color: var(--dark); line-height: 1.3; margin-bottom: 14px;
// }
// .ilmora-discussion-text h3 span { color: var(--orange); }
// .ilmora-discussion-text p { font-size: .93rem; color: var(--muted); line-height: 1.75; margin-bottom: 22px; }
// .ilmora-discussion-pills { display: flex; gap: 10px; flex-wrap: wrap; }
// .ilmora-dpill {
//   display: inline-flex; align-items: center; gap: 6px;
//   background: var(--orange-lt); border: 1.5px solid var(--orange-md);
//   color: var(--orange); font-size: .77rem; font-weight: 700;
//   padding: 5px 13px; border-radius: 999px;
// }

// /* TOAST */
// .ilmora-toast-container {
//   position: fixed; bottom: calc(28px + env(safe-area-inset-bottom, 0px)); right: 28px; z-index: 900;
//   display: flex; flex-direction: column; gap: 10px; pointer-events: none;
// }
// .ilmora-toast {
//   background: var(--dark); color: var(--bg); padding: 12px 18px; border-radius: 10px;
//   font-size: .845rem; font-weight: 600; box-shadow: 0 8px 28px rgba(15,23,42,.2);
//   display: flex; align-items: center; gap: 10px;
//   min-width: 220px; max-width: 340px; pointer-events: auto;
//   animation: ilmoraToastIn .3s cubic-bezier(.34,1.56,.64,1) both;
// }
// .ilmora-toast-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }

// /* ANIMATIONS */
// @keyframes ilmoraFadeUp {
//   from { opacity: 0; transform: translateY(18px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// @keyframes ilmoraCardIn {
//   from { opacity: 0; transform: translateY(12px) scale(.98); }
//   to { opacity: 1; transform: translateY(0) scale(1); }
// }
// @keyframes ilmoraToastIn {
//   from { opacity: 0; transform: translateX(50px) scale(.9); }
//   to { opacity: 1; transform: translateX(0) scale(1); }
// }

// /* Touch devices: no sticky hover lift */
// @media (hover: none) {
//   .ilmora-prog-card:hover,
//   .ilmora-why-card:hover,
//   .ilmora-btn-primary:hover,
//   .ilmora-btn-syllabus:hover,
//   .ilmora-btn-modal-save:hover { transform: none; }
// }
// @media (prefers-reduced-motion: reduce) {
//   .ilm-plat *, .ilm-plat *::before, .ilm-plat *::after {
//     animation-duration: .01ms !important; animation-iteration-count: 1 !important;
//     transition-duration: .01ms !important;
//   }
// }

// /* ══════════════════════════════════════════════
//    RESPONSIVE
// ══════════════════════════════════════════════ */

// /* ≤1180 : iPad Pro 11", small laptops */
// @media (max-width: 1180px) {
//   .ilmora-hero-inner { gap: 36px; grid-template-columns: minmax(0, 1fr) minmax(0, 420px); }
//   .ilmora-layout { grid-template-columns: 250px minmax(0, 1fr); gap: 22px; }
// }

// /* ≤1060 : hero stacks */
// @media (max-width: 1060px) {
//   .ilmora-hero-inner { grid-template-columns: minmax(0, 1fr); gap: 36px; }
//   .ilmora-hero-text { align-items: center; text-align: center; }
//   .ilmora-hero h1 { text-align: center; }
//   .ilmora-hero-sub { text-align: center; margin: 0 auto 32px; }
//   .ilmora-hero-btns { justify-content: center; }
//   .ilmora-hero-stats { justify-content: center; }
//   .ilmora-hero-stat { text-align: center; }
//   .ilmora-hero-video-wrap { max-width: 600px; margin: 0 auto; }
// }

// /* ≤1024 : iPad landscape / tablets */
// @media (max-width: 1024px) {
//   .ilmora-section-wrap { padding: 0 24px; }
//   .ilmora-platforms-section, .ilmora-why-section { padding: 64px 0; }
//   .ilmora-layout { grid-template-columns: 230px minmax(0, 1fr); gap: 18px; }
//   .ilmora-panel-top { padding: 20px 22px 18px; }
// }

// /* ≤960 : sidebar becomes horizontal tabs (iPad portrait, iPad Air) */
// @media (max-width: 960px) {
//   .ilm-plat { --nav-offset: 76px; }
//   .ilmora-layout { grid-template-columns: minmax(0, 1fr); gap: 18px; }
//   .ilmora-sidebar { position: static; max-height: none; overflow: visible; padding: 10px; }
//   .ilmora-sb-head { padding: 2px 6px 8px; }
//   .ilmora-sb-nav {
//     flex-direction: row; overflow-x: auto; gap: 6px; padding-bottom: 2px;
//     scrollbar-width: none; -webkit-overflow-scrolling: touch;
//   }
//   .ilmora-sb-nav::-webkit-scrollbar { display: none; }
//   .ilmora-sb-nav > div { flex-shrink: 0; }
//   .ilmora-sb-item { width: auto; white-space: nowrap; flex-shrink: 0; border: 1.5px solid var(--border); }
//   .ilmora-sb-item.active { border-color: var(--orange-md); }
//   .ilmora-sb-chev { display: none; }
//   .ilmora-sb-sub { display: none; }
//   .ilmora-discussion-strip { grid-template-columns: minmax(0, 1fr); gap: 22px; }
//   .ilmora-discussion-video-wrap { max-width: 600px; }
// }

// /* ≤820 : iPad Air portrait */
// @media (max-width: 820px) {
//   .ilmora-why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
//   .ilmora-hero { padding: 60px 24px; }
// }

// /* ≤768 : iPad mini, small tablets */
// @media (max-width: 768px) {
//   .ilmora-hero { padding: 52px 20px; }
//   .ilmora-hero-stats { gap: 28px; margin-top: 34px; }
//   .ilmora-platforms-section, .ilmora-why-section { padding: 52px 0; }
//   .ilmora-section-header { margin-bottom: 28px; }
//   .ilmora-detail-bar { padding: 12px 18px; }
//   .ilmora-detail-head { padding: 22px 20px 6px; }
//   .ilmora-detail-body { padding: 16px 20px 22px; }
//   .ilmora-detail-footer { padding: 14px 20px; }
// }

// /* ≤640 : large phones (Pixel, iPhone Pro Max) */
// @media (max-width: 640px) {
//   .ilmora-section-wrap { padding: 0 16px; }
//   .ilmora-hero { padding: 44px 16px 40px; }
//   .ilmora-hero-badge { font-size: .72rem; margin-bottom: 18px; }
//   .ilmora-hero-sub { font-size: .94rem; margin-bottom: 26px; }
//   .ilmora-hero-stats {
//     display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
//     gap: 20px 16px; width: 100%; max-width: 360px; margin-top: 30px;
//   }
//   .ilmora-hero-video-wrap { border-radius: 16px; aspect-ratio: 16/10; }
//   .ilmora-video-badge { bottom: 10px; left: 10px; font-size: .68rem; padding: 6px 12px; }

//   .ilmora-panel-top { padding: 16px; }
//   .ilmora-panel-icon { width: 40px; height: 40px; }
//   .ilmora-panel-title { font-size: 1.1rem; }
//   .ilmora-panel-controls { flex-direction: column; align-items: stretch; }
//   .ilmora-panel-search-wrap { min-width: 0; width: 100%; flex: none; }
//   .ilmora-filter-btns {
//     flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch;
//   }
//   .ilmora-filter-btns::-webkit-scrollbar { display: none; }
//   .ilmora-filter-btn { flex-shrink: 0; }

//   .ilmora-role-bar {
//     flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none;
//     -webkit-overflow-scrolling: touch; margin-left: -16px; margin-right: -16px; padding: 0 16px 4px;
//   }
//   .ilmora-role-bar::-webkit-scrollbar { display: none; }
//   .ilmora-role-bar-label, .ilmora-role-chip { flex-shrink: 0; }

//   .ilmora-programs-grid { grid-template-columns: minmax(0, 1fr); gap: 14px; }

//   .ilmora-detail-info-grid { grid-template-columns: minmax(0, 1fr); }
//   .ilmora-syllabus-list { grid-template-columns: minmax(0, 1fr); }
//   .ilmora-detail-head { gap: 12px; }
//   .ilmora-detail-icon { width: 46px; height: 46px; border-radius: 12px; }
//   .ilmora-detail-footer { flex-direction: column-reverse; align-items: stretch; }
//   .ilmora-detail-nav { width: 100%; }
//   .ilmora-detail-nav .ilmora-btn-ghost { flex: 1; }
//   .ilmora-btn-modal-save { width: 100%; }
//   .ilmora-detail-bar { flex-direction: column; align-items: flex-start; gap: 8px; }
//   .ilmora-detail-back { width: 100%; justify-content: center; }

//   .ilmora-why-grid { grid-template-columns: minmax(0, 1fr); gap: 16px; }
//   .ilmora-why-card { padding: 24px 20px; }
//   .ilmora-discussion-strip { margin-bottom: 36px; }

//   .ilmora-toast-container {
//     left: 16px; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); align-items: stretch;
//   }
//   .ilmora-toast { min-width: 0; max-width: none; width: 100%; }
// }

// /* ≤480 : standard phones (iPhone 12–15, Pixel 7/8) */
// @media (max-width: 480px) {
//   .ilmora-hero h1 br { display: none; }
//   .ilmora-hero-btns { width: 100%; }
//   .ilmora-hero-btns .ilmora-btn-primary { width: 100%; }
//   .ilmora-hero-stat .num { font-size: 1.5rem; }
//   .ilmora-prog-card { padding: 16px; }
//   .ilmora-prog-card-actions { flex-direction: column; }
//   .ilmora-btn-save, .ilmora-btn-syllabus { width: 100%; }
//   .ilmora-discussion-pills { gap: 8px; }
//   .ilmora-dpill { font-size: .72rem; padding: 4px 11px; }
// }

// /* ≤375 : iPhone SE / mini, small Androids */
// @media (max-width: 375px) {
//   .ilmora-section-wrap { padding: 0 12px; }
//   .ilmora-hero { padding: 36px 12px 34px; }
//   .ilmora-hero-stats { gap: 16px 12px; }
//   .ilmora-panel-top { padding: 14px; }
//   .ilmora-detail-head { padding: 18px 14px 4px; }
//   .ilmora-detail-body { padding: 14px 14px 18px; }
//   .ilmora-detail-bar, .ilmora-detail-footer { padding-left: 14px; padding-right: 14px; }
//   .ilmora-detail-desc { padding: 12px; font-size: .88rem; }
//   .ilmora-syllabus-item { padding: 10px 12px; font-size: .82rem; }
//   .ilmora-role-bar { margin-left: -12px; margin-right: -12px; padding-left: 12px; padding-right: 12px; }
// }

// /* ≤340 : very small (Galaxy Fold closed) */
// @media (max-width: 340px) {
//   .ilmora-hero-stats { grid-template-columns: minmax(0, 1fr); }
//   .ilmora-detail-title { font-size: 1.1rem; }
//   .ilmora-filter-btn, .ilmora-role-chip { font-size: .75rem; padding-left: 11px; padding-right: 11px; }
// }

// /* Landscape phones: avoid huge vertical padding */
// @media (max-height: 480px) and (orientation: landscape) {
//   .ilmora-hero { padding-top: 32px; padding-bottom: 32px; }
// }
// `;

// // ═══════════════════════════════════════════════
// //  STYLE INJECTION — React-managed, survives back navigation
// // ═══════════════════════════════════════════════
// const STYLE_ID = "ilmora-platforms-styles";

// function useInjectStyles() {
//   useEffect(() => {
//     let el = document.getElementById(STYLE_ID);
//     if (!el) {
//       el = document.createElement("style");
//       el.id = STYLE_ID;
//       document.head.appendChild(el);
//     }
//     el.textContent = cssText;
//     return () => {
//       const toRemove = document.getElementById(STYLE_ID);
//       if (toRemove) toRemove.remove();
//     };
//   }, []);
// }

// // ═══════════════════════════════════════════════
// //  TOAST HOOK
// // ═══════════════════════════════════════════════
// function useToasts() {
//   const [toasts, setToasts] = useState([]);
//   const showToast = useCallback((message) => {
//     const id = Date.now() + Math.random();
//     setToasts((prev) => [...prev, { id, message }]);
//     setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
//   }, []);
//   return { toasts, showToast };
// }

// // ═══════════════════════════════════════════════
// //  HERO
// // ═══════════════════════════════════════════════
// function Hero({ onExplore }) {
//   return (
//     <section className="ilmora-hero" id="hero">
//       <div className="ilmora-hero-inner">
//         <div className="ilmora-hero-text">
//           <div className="ilmora-hero-badge">
//             <Rocket size={13} /> Career-Ready Learning
//           </div>
//           <h1>
//             Explore Career-Ready<br />
//             Learning <span className="highlight">Platforms</span>
//           </h1>
//           <p className="ilmora-hero-sub">
//             Choose a platform, explore related programs, and view structured
//             syllabus paths designed for modern careers.
//           </p>
//           <div className="ilmora-hero-btns">
//             <button className="ilmora-btn-primary" onClick={onExplore}>
//               Explore Platforms <ChevronRight size={16} />
//             </button>
//           </div>
//           <div className="ilmora-hero-stats">
//             {[
//               { num: "3",   sup: "+",  lbl: "Learning Platforms" },
//               { num: "19",  sup: "+",  lbl: "Programs" },
//               { num: "100", sup: "%",  lbl: "Practical Focus" },
//               { num: "24",  sup: "/7", lbl: "Mentor Support" },
//             ].map((s) => (
//               <div className="ilmora-hero-stat" key={s.lbl}>
//                 <div className="num">{s.num}<b>{s.sup}</b></div>
//                 <div className="lbl">{s.lbl}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="ilmora-hero-video-wrap">
//           <video src={heroVideo} autoPlay loop muted playsInline preload="auto" />
//           <div className="ilmora-video-badge">
//             <span className="vbdot" /> Real Students. Real Learning.
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ═══════════════════════════════════════════════
// //  LEFT SIDEBAR (docs-style)
// //  Platforms list; the active platform expands to show its programs.
// // ═══════════════════════════════════════════════
// function PlatformSidebar({ platforms, activePlatformId, activeProgramId, onSelect, onOpenProgram, collapsed = false }) {
//   return (
//     <aside className="ilmora-sidebar" aria-label="Platform selector">
//       <div className="ilmora-sb-head">
//         <span className="ilmora-sb-label">Choose Your Platform</span>
//         <span className="ilmora-sb-pill"><span className="pdot" /> Enrolling</span>
//       </div>
//       <nav className="ilmora-sb-nav" role="tablist">
//         {platforms.map((platform) => {
//           const SbIcon = platform.Icon;
//           const isActive = platform.id === activePlatformId;
//           return (
//             <div key={platform.id}>
//               <button
//                 role="tab"
//                 aria-selected={isActive}
//                 aria-expanded={isActive && !collapsed}
//                 className={`ilmora-sb-item ${isActive ? "active" : ""} ${isActive && collapsed ? "collapsed" : ""}`}
//                 onClick={() => onSelect(platform.id)}
//               >
//                 <span className="ilmora-sb-item-icon"><SbIcon size={16} /></span>
//                 <span className="ilmora-sb-item-name">{platform.name}</span>
//                 <span className="ilmora-sb-count">{platform.programs.length}</span>
//                 <ChevronRight size={14} className="ilmora-sb-chev" />
//               </button>
//               {isActive && !collapsed && (
//                 <ul className="ilmora-sb-sub">
//                   {platform.programs.map((p) => (
//                     <li key={p.id}>
//                       <button
//                         className={`ilmora-sb-subitem ${activeProgramId === p.id ? "current" : ""}`}
//                         onClick={() => onOpenProgram(p.id)}
//                       >
//                         {p.name}
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

// // ═══════════════════════════════════════════════
// //  DIFFICULTY BADGE
// // ═══════════════════════════════════════════════
// function DifficultyBadge({ difficulty }) {
//   const cls = getDifficultyClass(difficulty);
//   const icons = {
//     Beginner: <GraduationCap size={10} />,
//     Intermediate: <TrendingUp size={10} />,
//     Advanced: <Cpu size={10} />,
//     other: null,
//   };
//   return (
//     <span className={`ilmora-badge ilmora-badge-${cls}`}>
//       {icons[cls]}{difficulty}
//     </span>
//   );
// }

// // ═══════════════════════════════════════════════
// //  PROGRAM CARD
// // ═══════════════════════════════════════════════
// function ProgramCard({ prog, savedInterests, onSyllabus, onSave }) {
//   const isSaved = savedInterests.has(prog.id);
//   const CardIcon = prog.Icon;
//   return (
//     <article
//       className="ilmora-prog-card"
//       tabIndex={0}
//       onClick={() => onSyllabus(prog.id)}
//       onKeyDown={(e) => { if (e.key === "Enter") onSyllabus(prog.id); }}
//     >
//       <div className="ilmora-prog-card-head">
//         <div className="ilmora-prog-card-icon"><CardIcon size={18} /></div>
//         <div className="ilmora-prog-card-name">{prog.name}</div>
//       </div>
//       <div className="ilmora-prog-card-desc">{prog.description}</div>
//       <div className="ilmora-prog-card-badges">
//         <DifficultyBadge difficulty={prog.difficulty} />
//         <span className="ilmora-badge ilmora-badge-duration">
//           <Activity size={10} /> {prog.duration}
//         </span>
//         {prog.popular && (
//           <span className="ilmora-badge ilmora-badge-popular">
//             <Star size={10} /> Popular
//           </span>
//         )}
//         {prog.beginnerFriendly && (
//           <span className="ilmora-badge ilmora-badge-beginner-friendly">
//             <GraduationCap size={10} /> Beginner
//           </span>
//         )}
//       </div>
//       <div className="ilmora-prog-card-roles">
//         {getProgramRoles(prog.id).map((r) => {
//           const RIcon = r.Icon;
//           return (
//             <span key={r.id} className="ilmora-role-tag">
//               <RIcon size={10} /> {r.label}
//             </span>
//           );
//         })}
//       </div>
//       <div className="ilmora-prog-card-actions">
//         <button
//           className="ilmora-btn-syllabus"
//           onClick={(e) => { e.stopPropagation(); onSyllabus(prog.id); }}
//         >
//           <BookOpen size={13} /> View Syllabus
//         </button>
//         <button
//           className={`ilmora-btn-save ${isSaved ? "saved" : ""}`}
//           onClick={(e) => { e.stopPropagation(); onSave(prog.id, prog.name); }}
//         >
//           {isSaved
//             ? <><BookMarked size={13} /> Saved</>
//             : <><Bookmark size={13} /> Save</>}
//         </button>
//       </div>
//     </article>
//   );
// }

// // ═══════════════════════════════════════════════
// //  INLINE PROGRAM DETAIL  (no popup — renders inside the panel)
// // ═══════════════════════════════════════════════
// function ProgramDetail({ prog, platform, savedInterests, onBack, onSave, onOpenProgram }) {
//   const isSaved = savedInterests.has(prog.id);
//   const DetailIcon = prog.Icon;
//   const idx = platform.programs.findIndex((p) => p.id === prog.id);
//   const prev = idx > 0 ? platform.programs[idx - 1] : null;
//   const next = idx < platform.programs.length - 1 ? platform.programs[idx + 1] : null;

//   return (
//     <section className="ilmora-detail" aria-label={`${prog.name} details`}>
//       <div className="ilmora-detail-bar">
//         <button className="ilmora-detail-back" onClick={onBack}>
//           <ChevronLeft size={15} /> Back to programs
//         </button>
//         <div className="ilmora-detail-crumb">
//           {platform.name} / <b>{prog.name}</b>
//         </div>
//       </div>

//       <div className="ilmora-detail-head">
//         <div className="ilmora-detail-icon"><DetailIcon size={26} /></div>
//         <div style={{ minWidth: 0 }}>
//           <h3 className="ilmora-detail-title">{prog.name}</h3>
//           <span className="ilmora-detail-platform">{platform.name}</span>
//         </div>
//       </div>

//       <div className="ilmora-detail-body">
//         <div className="ilmora-detail-meta">
//           <DifficultyBadge difficulty={prog.difficulty} />
//           <span className="ilmora-badge ilmora-badge-duration">
//             <Activity size={10} /> {prog.duration}
//           </span>
//           {prog.popular && (
//             <span className="ilmora-badge ilmora-badge-popular">
//               <Star size={10} /> Popular
//             </span>
//           )}
//           {prog.beginnerFriendly && (
//             <span className="ilmora-badge ilmora-badge-beginner-friendly">
//               <GraduationCap size={10} /> Beginner Friendly
//             </span>
//           )}
//         </div>

//         <div className="ilmora-detail-desc">{prog.description}</div>

//         <div className="ilmora-detail-info-grid">
//           <div className="ilmora-detail-info-block">
//             <div className="ilmora-detail-info-label"><Target size={11} /> Career Outcome</div>
//             <div className="ilmora-detail-info-value">{prog.careerOutcome}</div>
//           </div>
//           <div className="ilmora-detail-info-block">
//             <div className="ilmora-detail-info-label"><Users size={11} /> Who Is This For</div>
//             <div className="ilmora-detail-info-value">{prog.whoIsFor}</div>
//           </div>
//         </div>

//         <div className="ilmora-detail-section">
//           <div className="ilmora-detail-section-title"><Briefcase size={15} /> Suitable Roles</div>
//           <div className="ilmora-tools-list">
//             {getProgramRoles(prog.id).map((r) => (
//               <span key={r.id} className="ilmora-tool-tag">{r.label}</span>
//             ))}
//           </div>
//         </div>

//         <div className="ilmora-detail-section">
//           <div className="ilmora-detail-section-title"><Wrench size={15} /> Tools &amp; Technologies</div>
//           <div className="ilmora-tools-list">
//             {prog.tools.map((t) => (
//               <span key={t} className="ilmora-tool-tag">{t}</span>
//             ))}
//           </div>
//         </div>

//         <div className="ilmora-detail-section" style={{ marginBottom: 0 }}>
//           <div className="ilmora-detail-section-title"><BookOpen size={15} /> Syllabus Modules</div>
//           <div className="ilmora-syllabus-list">
//             {prog.syllabus.map((mod, i) => (
//               <div key={i} className="ilmora-syllabus-item">
//                 <span className="ilmora-syllabus-num">{i + 1}</span>
//                 <span>{mod}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="ilmora-detail-footer">
//         <div className="ilmora-detail-nav">
//           <button
//             className="ilmora-btn-ghost"
//             disabled={!prev}
//             onClick={() => prev && onOpenProgram(prev.id)}
//           >
//             <ChevronLeft size={14} /> Previous
//           </button>
//           <button
//             className="ilmora-btn-ghost"
//             disabled={!next}
//             onClick={() => next && onOpenProgram(next.id)}
//           >
//             Next <ChevronRight size={14} />
//           </button>
//         </div>
//         <button
//           className={`ilmora-btn-modal-save ${isSaved ? "saved" : ""}`}
//           onClick={() => onSave(prog.id, prog.name)}
//         >
//           {isSaved
//             ? <><BookMarked size={14} /> Already Saved</>
//             : <><Bookmark size={14} /> Save Interest</>}
//         </button>
//       </div>
//     </section>
//   );
// }

// // ═══════════════════════════════════════════════
// //  WHY CHOOSE
// // ═══════════════════════════════════════════════
// function WhyChoose() {
//   const cards = [
//     { Icon: Target,        title: "Industry-Aligned Curriculum",  text: "Every program is crafted with input from working engineers and industry leaders to reflect what employers actually need today." },
//     { Icon: GraduationCap, title: "Expert Mentors",               text: "Learn directly from seasoned professionals with years of real-world experience across development, AI, cloud, and CX platforms." },
//     { Icon: Layers,        title: "Project-Based Learning",       text: "Build portfolio-ready projects from day one. Every module ends with a hands-on deliverable you can showcase to future employers." },
//     { Icon: Rocket,        title: "Fast-Track Career Growth",     text: "Structured paths move you from beginner to job-ready efficiently — with clear milestones and real measurable outcomes." },
//     { Icon: Bot,           title: "AI & Cloud Ready",             text: "Future-proof your skills with dedicated tracks for cloud platforms, DevOps, generative AI, data science, and agent automation." },
//     { Icon: Handshake,     title: "Supportive Community",         text: "Join a thriving network of learners, alumni, and mentors. Collaborate, get feedback, and grow together beyond the classroom." },
//   ];
//   return (
//     <section className="ilmora-why-section" id="why-choose">
//       <div className="ilmora-section-wrap">
//         <div className="ilmora-section-header">
//           <div className="ilmora-section-tag"><Star size={12} /> Why ILM ORA</div>
//           <h2>Why Choose These Platforms</h2>
//           <p>We combine expert mentorship with real-world projects so you graduate with skills employers trust.</p>
//         </div>
//         <div className="ilmora-discussion-strip">
//           <div className="ilmora-discussion-video-wrap">
//             <video src={discussionVideo} autoPlay loop muted playsInline preload="auto" />
//           </div>
//           <div className="ilmora-discussion-text">
//             <h3>Learn Together,<br /><span>Grow Together</span></h3>
//             <p>
//               Our programs are built around collaborative learning. You'll work with peers,
//               get mentor feedback, and tackle real-world problems as a team — just like in
//               a professional environment.
//             </p>
//             <div className="ilmora-discussion-pills">
//               <span className="ilmora-dpill"><Users size={12} /> Peer Learning</span>
//               <span className="ilmora-dpill"><GraduationCap size={12} /> Mentor Guidance</span>
//               <span className="ilmora-dpill"><Star size={12} /> Real Projects</span>
//               <span className="ilmora-dpill"><Briefcase size={12} /> Job Ready</span>
//             </div>
//           </div>
//         </div>
//         <div className="ilmora-why-grid">
//           {cards.map((c) => {
//             const CardIcon = c.Icon;
//             return (
//               <article key={c.title} className="ilmora-why-card">
//                 <div className="ilmora-why-icon"><CardIcon size={22} /></div>
//                 <h3>{c.title}</h3>
//                 <p>{c.text}</p>
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ═══════════════════════════════════════════════
// //  TOAST CONTAINER
// // ═══════════════════════════════════════════════
// function ToastContainer({ toasts }) {
//   return (
//     <div className="ilmora-toast-container" aria-live="polite">
//       {toasts.map((t) => (
//         <div key={t.id} className="ilmora-toast">
//           <span className="ilmora-toast-dot" />
//           <span>{t.message}</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ═══════════════════════════════════════════════
// //  MAIN EXPORT
// // ═══════════════════════════════════════════════
// export default function Platforms({ theme, toggleTheme, setShowLoginModal, scrollToSection }) {
//   useInjectStyles();

//   const darkMode = theme === "dark";

//     // URL (?platform=dev | ai | cx) se selected platform padho
//   const [searchParams] = useSearchParams();
//   const platformFromUrl = searchParams.get("platform");
//   const isValidPlatform = (id) => platformData.some((p) => p.id === id);

//   const [activePlatformId, setActivePlatformId] = useState(
//     isValidPlatform(platformFromUrl) ? platformFromUrl : "dev"
//   );
//   const [activeFilter, setActiveFilter]         = useState("all");
//   const [activeRole, setActiveRole]             = useState("all");
//   const [searchQuery, setSearchQuery]           = useState("");
//   // ✅ Inline detail: id of the program currently open INSIDE the panel (null = show grid)
//   const [activeProgramId, setActiveProgramId]   = useState(null);
//   const [savedInterests, setSavedInterests]     = useState(new Set());
//   const [fading, setFading]                     = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
//   const { toasts, showToast }                   = useToasts();
//   const platformsSectionRef                     = useRef(null);
//   const panelRef                                = useRef(null);
//   const firstRender                             = useRef(true);

//    // Reset scroll on mount (fixes back-nav scroll position)
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" });
//   }, []);

//   // ✅ Navbar dropdown se URL badalte hi platform turant switch ho
//   useEffect(() => {
//     if (!platformFromUrl || !isValidPlatform(platformFromUrl)) return;
//     setActivePlatformId(platformFromUrl);
//     setActiveProgramId(null);
//     setActiveFilter("all");
//     setActiveRole("all");
//     setSearchQuery("");
//     setSidebarCollapsed(false);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [platformFromUrl]);

//   // When a program opens / closes, bring the panel top into view (important on phones & tablets)
//   useEffect(() => {
//     if (firstRender.current) { firstRender.current = false; return; }
//     panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   }, [activeProgramId]);

//   // Escape key = go back to program list
//   useEffect(() => {
//     if (!activeProgramId) return;
//     const handler = (e) => { if (e.key === "Escape") setActiveProgramId(null); };
//     document.addEventListener("keydown", handler);
//     return () => document.removeEventListener("keydown", handler);
//   }, [activeProgramId]);

//   const activePlatform = platformData.find((p) => p.id === activePlatformId);

//   const filteredPrograms = (() => {
//     let programs = activePlatform.programs;
//     if (activeFilter === "popular")
//       programs = programs.filter((p) => p.popular);
//     else if (activeFilter === "beginner")
//       programs = programs.filter((p) => p.beginnerFriendly);
//     if (activeRole !== "all")
//       programs = programs.filter((p) =>
//         getProgramRoles(p.id).some((r) => r.id === activeRole)
//       );
//     if (searchQuery.trim()) {
//       const q = searchQuery.toLowerCase();
//       programs = programs.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.description.toLowerCase().includes(q) ||
//           p.tools.some((t) => t.toLowerCase().includes(q)) ||
//           p.syllabus.some((s) => s.toLowerCase().includes(q)) ||
//           p.careerOutcome.toLowerCase().includes(q) ||
//           p.whoIsFor.toLowerCase().includes(q)
//       );
//     }
//     return programs;
//   })();

//   const handleSetPlatform = (id) => {
//     if (id === activePlatformId) {
//       setSidebarCollapsed((prev) => !prev);
//       return;
//     }
//     setSidebarCollapsed(false);
//     setFading(true);
//     setTimeout(() => {
//       setActivePlatformId(id);
//       setActiveProgramId(null); // close any open detail when platform changes
//       setActiveFilter("all");
//       setActiveRole("all");
//       setSearchQuery("");
//       setFading(false);
//       showToast(`${platformData.find((p) => p.id === id).name} selected`);
//     }, 160);
//   };

//   const handleSetFilter = (f) => {
//     setFading(true);
//     setTimeout(() => { setActiveFilter(f); setFading(false); }, 160);
//   };

//   const handleSetRole = (r) => {
//     setFading(true);
//     setTimeout(() => { setActiveRole(r); setFading(false); }, 160);
//   };

//   const handleSaveInterest = (progId, progName) => {
//     if (savedInterests.has(progId)) {
//       showToast(`Already saved: ${progName}`);
//       return;
//     }
//     setSavedInterests((prev) => new Set([...prev, progId]));
//     showToast(`Interest saved for ${progName}`);
//   };

//   // Open program INSIDE the page (no modal)
//   const openProgram = (progId) => {
//     const result = findProgramById(progId);
//     if (!result) return;
//     if (result.platform.id !== activePlatformId) setActivePlatformId(result.platform.id);
//     setActiveProgramId(progId);
//   };

//   const closeProgram = () => setActiveProgramId(null);

//   const scrollToPlatforms = () =>
//     platformsSectionRef.current?.scrollIntoView({ behavior: "smooth" });

//   const ActivePlatformIcon = activePlatform.Icon;
//   const openedProgram = activeProgramId
//     ? activePlatform.programs.find((p) => p.id === activeProgramId)
//     : null;

//   return (
//     <PublicLayout
//       theme={theme}
//       toggleTheme={toggleTheme}
//       setShowLoginModal={setShowLoginModal}
//       scrollToSection={scrollToSection}
//     >
//       <div className="ilm-plat" data-theme={darkMode ? "dark" : undefined}>
//         <Hero onExplore={scrollToPlatforms} />

//         <section id="platforms" className="ilmora-platforms-section" ref={platformsSectionRef}>
//           <div className="ilmora-section-wrap">
//             <div className="ilmora-section-header">
//               <div className="ilmora-section-tag">
//                 <BookOpen size={12} /> All Platforms
//               </div>
//               <h2>Choose Your Learning Platform</h2>
//               <p>Select a platform to explore its programs and structured learning paths.</p>
//             </div>

//             <div className="ilmora-layout">
//               <PlatformSidebar
//                 platforms={platformData}
//                 activePlatformId={activePlatformId}
//                 activeProgramId={activeProgramId}
//                 onSelect={handleSetPlatform}
//                 onOpenProgram={openProgram}
//                 collapsed={sidebarCollapsed}
//               />

//               <div className="ilmora-programs-panel" ref={panelRef}>
//                 {openedProgram ? (
//                   /* ───── INLINE DETAIL VIEW ───── */
//                   <ProgramDetail
//                     key={openedProgram.id}
//                     prog={openedProgram}
//                     platform={activePlatform}
//                     savedInterests={savedInterests}
//                     onBack={closeProgram}
//                     onSave={handleSaveInterest}
//                     onOpenProgram={openProgram}
//                   />
//                 ) : (
//                   /* ───── LIST VIEW ───── */
//                   <>
//                     <div className="ilmora-panel-top">
//                       <div className="ilmora-panel-title-row">
//                         <div className="ilmora-panel-icon-name">
//                           <div className="ilmora-panel-icon">
//                             <ActivePlatformIcon size={22} />
//                           </div>
//                           <div className="ilmora-panel-title">{activePlatform.name}</div>
//                         </div>
//                         <div className="ilmora-panel-badge">
//                           {activePlatform.programs.length} Programs
//                         </div>
//                       </div>
//                       <div className="ilmora-panel-desc">{activePlatform.description}</div>
//                       <div className="ilmora-panel-controls">
//                         <div className="ilmora-panel-search-wrap">
//                           <span className="ilmora-search-icon"><Search size={15} /></span>
//                           <input
//                             className="ilmora-panel-search"
//                             type="text"
//                             placeholder="Search programs, tools, topics…"
//                             autoComplete="off"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                           />
//                         </div>
//                         <div className="ilmora-filter-btns">
//                           {["all", "popular", "beginner"].map((f) => (
//                             <button
//                               key={f}
//                               className={`ilmora-filter-btn ${activeFilter === f ? "active" : ""}`}
//                               onClick={() => handleSetFilter(f)}
//                             >
//                               {f === "all" ? "All" : f === "popular" ? "Popular" : "Beginner Friendly"}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="ilmora-role-bar">
//                       <span className="ilmora-role-bar-label">Role:</span>
//                       <button
//                         className={`ilmora-role-chip ${activeRole === "all" ? "active" : ""}`}
//                         onClick={() => handleSetRole("all")}
//                       >
//                         All Roles
//                       </button>
//                       {ROLES.filter((r) =>
//                         activePlatform.programs.some((p) =>
//                           getProgramRoles(p.id).some((pr) => pr.id === r.id)
//                         )
//                       ).map((r) => {
//                         const RIcon = r.Icon;
//                         return (
//                           <button
//                             key={r.id}
//                             className={`ilmora-role-chip ${activeRole === r.id ? "active" : ""}`}
//                             onClick={() => handleSetRole(r.id)}
//                           >
//                             <RIcon size={13} /> {r.label}
//                           </button>
//                         );
//                       })}
//                     </div>

//                     <div className={`ilmora-programs-grid ${fading ? "fading" : ""}`}>
//                       {filteredPrograms.length === 0 ? (
//                         <div className="ilmora-empty-state">
//                           <div className="empty-icon"><Search size={48} /></div>
//                           <h3>No programs found</h3>
//                           <p>Try another keyword.</p>
//                         </div>
//                       ) : (
//                         filteredPrograms.map((prog) => (
//                           <ProgramCard
//                             key={prog.id}
//                             prog={prog}
//                             savedInterests={savedInterests}
//                             onSyllabus={openProgram}
//                             onSave={handleSaveInterest}
//                           />
//                         ))
//                       )}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         <WhyChoose />

//         <ToastContainer toasts={toasts} />
//       </div>
//     </PublicLayout>
//   );
// }




























"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "@/lib/routerCompat";
import {
  Rocket, BookOpen, Star, Users, Briefcase, Bot, Cloud,
  Shield, Database, BarChart2, FlaskConical, Plug, Link2, Globe,
  Sparkles, Server, RefreshCw, Package, Wrench, Headphones,
  MessageSquare, Brain, Zap, Target, GraduationCap, Layers,
  TrendingUp, Cpu, Handshake, Search, Bookmark, BookMarked,
  ChevronRight, ChevronLeft, Layout,
  Settings, Code2, Activity,
} from "lucide-react";

import heroVideo from "../../assets/collge_student.mp4";
import discussionVideo from "../../assets/Discussion_collge.mp4";

// Shared shell used by every other public page.
import PublicLayout from "../Landing/components/PublicLayout";

// ═══════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════
const platformData = [
  {
    id: "dev",
    name: "Development Engineering Platform",
    Icon: Code2,
    shortDesc: "Full-stack development essentials",
    description:
      "Master full-stack engineering with modern tools, frameworks, and architectural patterns for production-ready applications.",
    programs: [
      {
        id: "ui-dev", name: "UI Development", Icon: Layout,
        difficulty: "Beginner", duration: "8 Weeks", popular: true, beginnerFriendly: true,
        description: "Learn to build clean, responsive, and modern user interfaces for web applications.",
        careerOutcome: "Frontend Developer / UI Developer",
        whoIsFor: "Students and beginners who want to build beautiful web pages and frontend screens.",
        tools: ["HTML", "CSS", "JavaScript", "Responsive Design", "Figma Basics"],
        syllabus: ["Web fundamentals and browser basics", "HTML structure and semantic tags", "CSS styling, box model, flexbox, and grid", "Responsive design for mobile and desktop", "JavaScript basics for UI interactions", "Forms, validation, and accessibility basics", "Landing page and dashboard UI project", "Portfolio-ready final UI project"],
      },
      {
        id: "backend-dev", name: "Backend Development", Icon: Settings,
        difficulty: "Intermediate", duration: "10 Weeks", popular: true, beginnerFriendly: false,
        description: "Learn backend architecture, APIs, authentication, business logic, and database integration.",
        careerOutcome: "Backend Developer / Full Stack Developer",
        whoIsFor: "Learners who want to build server-side applications and APIs.",
        tools: ["Java", "Spring Boot", "Node.js Basics", "REST APIs", "JWT", "PostgreSQL"],
        syllabus: ["Backend fundamentals and client-server architecture", "REST API design and HTTP methods", "Controllers, services, repositories, and DTOs", "Authentication and authorization basics", "Database integration and transactions", "Error handling and validation", "File upload and notification basics", "Complete backend API project"],
      },
      {
        id: "database", name: "Database", Icon: Database,
        difficulty: "Beginner", duration: "6 Weeks", popular: false, beginnerFriendly: true,
        description: "Learn database design, SQL queries, relationships, indexing, and data management.",
        careerOutcome: "Database Developer / Backend Support Engineer",
        whoIsFor: "Students who want strong SQL and database foundation.",
        tools: ["SQL", "PostgreSQL", "MySQL", "ER Diagrams"],
        syllabus: ["Database fundamentals and DBMS concepts", "Tables, rows, columns, keys, and constraints", "SQL SELECT, INSERT, UPDATE, DELETE", "Joins, grouping, sorting, and filtering", "Relationships and normalization", "Indexes and query optimization basics", "Transactions and data integrity", "Mini database design project"],
      },
      {
        id: "api-soap", name: "API - SOAP", Icon: Plug,
        difficulty: "Intermediate", duration: "5 Weeks", popular: false, beginnerFriendly: false,
        description: "Learn SOAP APIs, XML-based services, WSDL, and enterprise integration concepts.",
        careerOutcome: "Integration Developer / Backend Developer",
        whoIsFor: "Learners working with enterprise or legacy service integrations.",
        tools: ["SOAP", "XML", "WSDL", "Postman", "Java"],
        syllabus: ["SOAP API fundamentals", "XML request and response structure", "WSDL and service contracts", "SOAP headers and body", "Error handling in SOAP services", "Testing SOAP APIs using tools", "Enterprise integration patterns", "SOAP service mini project"],
      },
      {
        id: "graphql", name: "GraphQL API", Icon: Link2,
        difficulty: "Intermediate", duration: "6 Weeks", popular: false, beginnerFriendly: false,
        description: "Learn GraphQL schemas, queries, mutations, resolvers, and optimized data fetching.",
        careerOutcome: "API Developer / Full Stack Developer",
        whoIsFor: "Developers who want modern API skills beyond REST.",
        tools: ["GraphQL", "JavaScript", "Node.js", "Apollo Basics"],
        syllabus: ["GraphQL fundamentals", "Schema, types, and fields", "Queries and mutations", "Resolvers and data sources", "Nested data and relationships", "Error handling and validation", "GraphQL vs REST comparison", "GraphQL API mini project"],
      },
      {
        id: "rest-api", name: "REST API", Icon: Globe,
        difficulty: "Beginner to Intermediate", duration: "7 Weeks", popular: true, beginnerFriendly: true,
        description: "Learn to design RESTful APIs using HTTP methods, status codes, resources, and clean endpoints.",
        careerOutcome: "Backend Developer / API Developer",
        whoIsFor: "Frontend, backend, and full-stack learners.",
        tools: ["REST", "HTTP", "Postman", "JSON", "Java/Spring Boot"],
        syllabus: ["REST architecture basics", "HTTP methods and status codes", "Request body, query params, and path variables", "API response structure and error format", "CRUD API development", "Authentication and protected endpoints", "API testing with Postman", "REST API final project"],
      },
    ],
  },
  {
    id: "ai",
    name: "AI – Agent AI",
    Icon: Bot,
    shortDesc: "AI, cloud, data & DevOps in one track",
    description: "From generative AI to data pipelines — master the tools that power modern intelligent systems and cloud infrastructure.",
    programs: [
      {
        id: "gen-ai", name: "Gen AI", Icon: Sparkles,
        difficulty: "Beginner", duration: "8 Weeks", popular: true, beginnerFriendly: true,
        description: "Learn generative AI concepts, prompt engineering, AI tools, and AI-powered workflows.",
        careerOutcome: "AI Tools Specialist / Gen AI Associate",
        whoIsFor: "Students, professionals, and creators who want to use AI in real work.",
        tools: ["ChatGPT", "Prompt Engineering", "AI Agents Basics", "Automation Tools"],
        syllabus: ["Introduction to generative AI", "LLM basics and AI model behavior", "Prompt engineering fundamentals", "Role prompts, structured prompts, and workflow planning", "AI tools for content, coding, research, and productivity", "AI agents and workflow automation basics", "Responsible AI and safety basics", "Gen AI workflow project"],
      },
      {
        id: "cloud", name: "Cloud", Icon: Cloud,
        difficulty: "Beginner", duration: "7 Weeks", popular: true, beginnerFriendly: true,
        description: "Learn cloud fundamentals, compute, storage, networking, and deployment basics.",
        careerOutcome: "Cloud Associate / Junior Cloud Engineer",
        whoIsFor: "Beginners starting cloud computing.",
        tools: ["AWS Basics", "Azure Basics", "Linux Basics", "Cloud Console"],
        syllabus: ["Cloud computing fundamentals", "IaaS, PaaS, SaaS models", "Compute, storage, and networking basics", "Identity and access basics", "Cloud deployment concepts", "Monitoring and billing basics", "Cloud security fundamentals", "Simple cloud deployment project"],
      },
      {
        id: "cloud-platform", name: "Cloud Platform", Icon: Server,
        difficulty: "Intermediate", duration: "9 Weeks", popular: false, beginnerFriendly: false,
        description: "Learn how cloud platforms support scalable applications, infrastructure, and enterprise systems.",
        careerOutcome: "Cloud Platform Engineer",
        whoIsFor: "Learners who want deeper cloud platform and infrastructure skills.",
        tools: ["AWS/Azure/GCP Concepts", "Docker Basics", "Monitoring Tools"],
        syllabus: ["Cloud platform architecture", "Virtual machines and container basics", "Load balancing and scaling", "Storage services and database services", "Networking and security groups", "Logging and monitoring", "Deployment architecture", "Cloud platform case study project"],
      },
      {
        id: "devops", name: "DevOps", Icon: RefreshCw,
        difficulty: "Intermediate", duration: "10 Weeks", popular: true, beginnerFriendly: false,
        description: "Learn CI/CD, automation, deployment pipelines, containers, and release workflows.",
        careerOutcome: "DevOps Engineer / Release Engineer",
        whoIsFor: "Developers and operations learners who want modern deployment skills.",
        tools: ["Git", "GitHub Actions", "Docker", "CI/CD", "Linux"],
        syllabus: ["DevOps culture and SDLC", "Git and branching strategies", "Build and release pipelines", "CI/CD fundamentals", "Docker and container basics", "Environment variables and deployment configs", "Monitoring deployment health", "CI/CD pipeline project"],
      },
      {
        id: "sre", name: "SRE", Icon: Shield,
        difficulty: "Advanced", duration: "8 Weeks", popular: false, beginnerFriendly: false,
        description: "Learn reliability engineering, monitoring, incident response, SLAs, SLOs, and system stability.",
        careerOutcome: "Site Reliability Engineer",
        whoIsFor: "Cloud, DevOps, and backend learners interested in production reliability.",
        tools: ["Monitoring", "Logging", "Alerting", "Linux", "Incident Management"],
        syllabus: ["SRE fundamentals", "SLIs, SLOs, and SLAs", "Monitoring and observability", "Incident response workflow", "Error budgets and reliability planning", "Capacity and performance basics", "Postmortems and RCA", "Reliability improvement project"],
      },
      {
        id: "data-engineering", name: "Data Engineering", Icon: Package,
        difficulty: "Intermediate", duration: "10 Weeks", popular: true, beginnerFriendly: false,
        description: "Learn data pipelines, ETL workflows, warehouses, and large-scale data processing systems.",
        careerOutcome: "Data Engineer",
        whoIsFor: "Learners who want to build systems that move and transform data.",
        tools: ["SQL", "Python Basics", "ETL", "Data Warehouse Concepts"],
        syllabus: ["Data engineering fundamentals", "Data sources and ingestion", "ETL and ELT workflows", "Batch processing basics", "Data warehouse concepts", "Data quality and validation", "Pipeline scheduling basics", "Data pipeline project"],
      },
      {
        id: "data-engineer", name: "Data Engineer", Icon: Wrench,
        difficulty: "Intermediate", duration: "9 Weeks", popular: false, beginnerFriendly: false,
        description: "Prepare for data engineer roles with databases, pipelines, cloud data tools, and analytics systems.",
        careerOutcome: "Junior Data Engineer",
        whoIsFor: "Students targeting data engineer jobs.",
        tools: ["SQL", "Python", "Cloud Data Basics", "Pipelines"],
        syllabus: ["Role of a data engineer", "SQL for data engineering", "Python for data workflows", "Data modeling basics", "Pipeline design patterns", "Cloud data services overview", "Data validation and monitoring", "Data engineer portfolio project"],
      },
      {
        id: "data-analyst", name: "Data Analyst", Icon: BarChart2,
        difficulty: "Beginner", duration: "8 Weeks", popular: true, beginnerFriendly: true,
        description: "Learn data analysis, dashboards, reporting, SQL, Excel, BI tools, and business insights.",
        careerOutcome: "Data Analyst / BI Analyst",
        whoIsFor: "Learners who want analytics and reporting roles.",
        tools: ["Excel", "SQL", "Power BI/Tableau Concepts", "Dashboards"],
        syllabus: ["Data analysis fundamentals", "Excel for data cleaning and reporting", "SQL for analysis", "Metrics and KPIs", "Dashboard design basics", "Data visualization best practices", "Business insight storytelling", "Analytics dashboard project"],
      },
      {
        id: "data-scientist", name: "Data Scientist", Icon: FlaskConical,
        difficulty: "Advanced", duration: "12 Weeks", popular: false, beginnerFriendly: false,
        description: "Learn machine learning, statistics, model building, data exploration, and predictive analytics.",
        careerOutcome: "Junior Data Scientist / ML Associate",
        whoIsFor: "Learners interested in AI, ML, prediction, and advanced analytics.",
        tools: ["Python", "Statistics", "Machine Learning Basics", "Jupyter"],
        syllabus: ["Data science fundamentals", "Python for data science", "Statistics and probability basics", "Data cleaning and exploration", "Machine learning fundamentals", "Model training and evaluation", "Prediction and classification use cases", "Data science capstone project"],
      },
    ],
  },
  {
    id: "cx",
    name: "Contact Center Platform",
    Icon: Headphones,
    shortDesc: "AI-powered CX & conversation design",
    description: "Design intelligent customer experiences using AI-driven bots, conversation platforms, and modern CX frameworks.",
    programs: [
      {
        id: "cx-ai", name: "AI", Icon: Bot,
        difficulty: "Beginner", duration: "6 Weeks", popular: true, beginnerFriendly: true,
        description: "Understand how AI improves customer support, automation, routing, and service quality.",
        careerOutcome: "AI Customer Experience Associate",
        whoIsFor: "Learners interested in AI-powered customer experience and support systems.",
        tools: ["AI Basics", "Customer Support Automation", "Analytics"],
        syllabus: ["AI in customer experience", "Customer intent and automation", "Smart routing and response suggestions", "AI-assisted agent workflows", "Quality monitoring basics", "Customer analytics basics", "AI ethics in support", "AI support use case project"],
      },
      {
        id: "chatbot", name: "Chatbot", Icon: MessageSquare,
        difficulty: "Beginner", duration: "6 Weeks", popular: true, beginnerFriendly: true,
        description: "Learn chatbot flows, conversation design, FAQ automation, and customer interaction handling.",
        careerOutcome: "Chatbot Designer / CX Automation Associate",
        whoIsFor: "Support teams and learners building customer-facing bot experiences.",
        tools: ["Conversation Design", "Bot Flow Builder Concepts", "FAQ Automation"],
        syllabus: ["Chatbot fundamentals", "Conversation design basics", "Intents, entities, and FAQs", "Bot flow planning", "Fallback and escalation handling", "Testing chatbot conversations", "Customer journey mapping", "Chatbot flow project"],
      },
      {
        id: "ai-bot", name: "AI BOT", Icon: Brain,
        difficulty: "Intermediate", duration: "7 Weeks", popular: true, beginnerFriendly: false,
        description: "Build intelligent AI bot experiences with automation, natural language, and smart responses.",
        careerOutcome: "AI Bot Developer / Automation Associate",
        whoIsFor: "Learners who want to build smarter bots for customer support and automation.",
        tools: ["AI Bot Concepts", "NLP Basics", "Automation Workflows"],
        syllabus: ["AI bot fundamentals", "NLP and intent detection basics", "Smart response generation", "Automation actions and triggers", "Human handoff and escalation", "Bot analytics and improvement", "AI bot testing strategy", "AI bot automation project"],
      },
      {
        id: "tora-cx", name: "TORA CX", Icon: Zap,
        difficulty: "Intermediate", duration: "8 Weeks", popular: false, beginnerFriendly: false,
        description: "Explore TORA CX contact center platform concepts for customer experience and support operations.",
        careerOutcome: "CX Platform Associate / Contact Center Operations Associate",
        whoIsFor: "Learners and teams working with contact center platforms and customer experience systems.",
        tools: ["TORA CX Concepts", "Contact Center Workflows", "Reporting", "Automation"],
        syllabus: ["Contact center platform fundamentals", "Customer experience workflows", "Agent and supervisor operations", "Ticket routing and queue management", "Reporting and performance metrics", "Automation in CX platforms", "Quality and compliance basics", "TORA CX workflow project"],
      },
    ],
  },
];

// ═══════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════
function getDifficultyClass(difficulty) {
  const d = difficulty.toLowerCase();
  if (d.includes("beginner") && !d.includes("intermediate")) return "Beginner";
  if (d.includes("intermediate")) return "Intermediate";
  if (d.includes("advanced")) return "Advanced";
  return "other";
}

function findProgramById(programId) {
  for (const platform of platformData) {
    const prog = platform.programs.find((p) => p.id === programId);
    if (prog) return { program: prog, platform };
  }
  return null;
}

// ── ROLES ──
const ROLES = [
  { id: "engineering", label: "Engineering",         Icon: Code2 },
  { id: "product",     label: "Product Manager",     Icon: Target },
  { id: "data",        label: "Data & Analytics",    Icon: BarChart2 },
  { id: "cloud",       label: "Cloud & DevOps",      Icon: Cloud },
  { id: "ai",          label: "AI & Automation",     Icon: Bot },
  { id: "cx",          label: "Customer Experience", Icon: Headphones },
];

// program id -> role ids (ek program ke multiple roles ho sakte hain)
const PROGRAM_ROLES = {
  "ui-dev":           ["engineering"],
  "backend-dev":      ["engineering"],
  "database":         ["engineering", "data"],
  "api-soap":         ["engineering"],
  "graphql":          ["engineering"],
  "rest-api":         ["engineering"],
  "gen-ai":           ["ai", "product"],
  "cloud":            ["cloud"],
  "cloud-platform":   ["cloud"],
  "devops":           ["cloud", "engineering"],
  "sre":              ["cloud", "engineering"],
  "data-engineering": ["data", "engineering"],
  "data-engineer":    ["data", "engineering"],
  "data-analyst":     ["data", "product"],
  "data-scientist":   ["data", "ai"],
  "cx-ai":            ["cx", "ai", "product"],
  "chatbot":          ["cx", "ai"],
  "ai-bot":           ["ai", "cx"],
  "tora-cx":          ["cx", "product"],
};

function getProgramRoles(programId) {
  return (PROGRAM_ROLES[programId] || [])
    .map((rid) => ROLES.find((r) => r.id === rid))
    .filter(Boolean);
}

// ═══════════════════════════════════════════════
//  LEARNING JOURNEYS (platform-level roadmap)
//  Abhi sirf Development Engineering ("dev") ke liye.
//  AI aur Contact Center ka journey yahin add karna hai:
//  JOURNEYS.ai = { ... }, JOURNEYS.cx = { ... }  (same shape)
//
//  stage.mode:
//    "parallel" -> programs saath mein kar sakte hain
//    "single"   -> sirf ek program
//    "sequence" -> order mein (tag se step dikhta hai)
// ═══════════════════════════════════════════════
const JOURNEYS = {
  dev: {
    title: "Development Engineering Roadmap",
    subtitle:
      "Foundation se shuru karo, Backend tak jao, phir APIs master karke capstone project banao.",
    stages: [
      {
        id: "foundation",
        label: "Foundation",
        level: "Beginner",
        mode: "parallel",
        note: "Yahan se shuru karo. UI Development aur Database ek saath seekh sakte ho.",
        programs: [{ id: "ui-dev" }, { id: "database" }],
      },
      {
        id: "core",
        label: "Core",
        level: "Intermediate",
        mode: "single",
        note: "Server-side apps banana seekho. Database ka SQL knowledge yahan kaam aata hai.",
        programs: [{ id: "backend-dev" }],
      },
      {
        id: "api",
        label: "API Layer",
        level: "Beginner to Intermediate",
        mode: "sequence",
        note: "Pehle REST API, phir GraphQL ya SOAP (dono ya apni zaroorat ke hisaab se).",
        programs: [
          { id: "rest-api", tag: "Step 1" },
          { id: "graphql", tag: "Step 2" },
          { id: "api-soap", tag: "Step 2" },
        ],
      },
    ],
    capstone: {
      name: "Capstone Project",
      description:
        "Poora full-stack project: UI + Backend + Database + APIs ek saath. Portfolio ke liye ready.",
      status: "Coming soon",
    },
  },
};

// program id -> journey info (stage, prerequisites, next programs)
const PROGRAM_JOURNEY = {
  "ui-dev":      { stage: "Foundation", requires: [],              next: ["backend-dev"] },
  "database":    { stage: "Foundation", requires: [],              next: ["backend-dev"] },
  "backend-dev": { stage: "Core",       requires: ["database"],    next: ["rest-api"] },
  "rest-api":    { stage: "API Layer",  requires: ["backend-dev"], next: ["graphql", "api-soap"] },
  "graphql":     { stage: "API Layer",  requires: ["rest-api"],    next: [], capstone: true },
  "api-soap":    { stage: "API Layer",  requires: ["rest-api"],    next: [], capstone: true },
};

function getJourney(platformId) {
  return JOURNEYS[platformId] || null;
}

// Journey ke order mein programs (journey nahi hai to original order)
function getOrderedPrograms(platform) {
  const journey = getJourney(platform.id);
  if (!journey) return platform.programs;
  const order = journey.stages.flatMap((st) => st.programs.map((p) => p.id));
  return [...platform.programs].sort((a, b) => {
    const ia = order.indexOf(a.id);
    const ib = order.indexOf(b.id);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}

function getTotalWeeks(programs) {
  return programs.reduce((sum, p) => sum + (parseInt(p.duration, 10) || 0), 0);
}

// ═══════════════════════════════════════════════
//  STYLES
//  Everything is scoped under `.ilm-plat` so nothing leaks into
//  PublicLayout's shared navbar / footer.
//
//  Breakpoints used (covers all devices):
//   ≥1280  large desktop / laptop
//   ≤1180  iPad Pro 11" / small laptop
//   ≤1024  iPad / iPad Air landscape / tablet landscape
//   ≤960   sidebar becomes horizontal tabs (iPad portrait)
//   ≤820   iPad Air / iPad portrait
//   ≤768   iPad mini / tablets
//   ≤640   large phones (Pixel, iPhone Pro Max)
//   ≤480   phones (iPhone 12-15, Pixel 7/8)
//   ≤375   small phones (iPhone SE, mini)
//   ≤340   very small (Galaxy Fold)
// ═══════════════════════════════════════════════
const cssText = `
.ilm-plat {
  --bg: #fffaf5; --surface: #ffffff; --surface2: #fdf6ee;
  --dark: #0f172a; --dark2: #1e293b; --mid: #374151; --muted: #64748b;
  --border: #e8e0d6; --border2: #f0e8df;
  --orange: #f97316; --orange-d: #ea6c0a; --orange-lt: #fff7ed;
  --orange-md: #fed7aa; --orange-glow: rgba(249,115,22,.18);
  --green: #16a34a; --green-lt: #f0fdf4;
  --radius-sm: 8px; --radius: 14px; --radius-lg: 20px;
  --shadow-sm: 0 1px 6px rgba(15,23,42,.06);
  --shadow: 0 4px 20px rgba(15,23,42,.09);
  --shadow-lg: 0 12px 48px rgba(15,23,42,.13);
  --transition: .22s cubic-bezier(.4,0,.2,1);
  --font-display: 'Georgia','Times New Roman',serif;
  --font-body: 'Segoe UI',system-ui,-apple-system,sans-serif;
  --nav-offset: 90px;

  font-family: var(--font-body);
  background: var(--bg);
  color: var(--dark);
  line-height: 1.6;
  font-size: 16px;
  scroll-behavior: smooth;
  transition: background var(--transition), color var(--transition);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
.ilm-plat[data-theme="dark"] {
  --bg: #0f1117; --surface: #1a1f2e; --surface2: #141824;
  --dark: #f1f5f9; --dark2: #e2e8f0; --mid: #cbd5e1; --muted: #94a3b8;
  --border: #2a3244; --border2: #222840;
  --orange-lt: #1c1208; --orange-md: #7c3d12; --green-lt: #052e16;
}
.ilm-plat, .ilm-plat *, .ilm-plat *::before, .ilm-plat *::after { box-sizing: border-box; }
.ilm-plat a { text-decoration: none; color: inherit; }
.ilm-plat ul { list-style: none; margin: 0; padding: 0; }
.ilm-plat button { font-family: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
.ilm-plat img, .ilm-plat video { max-width: 100%; }
.ilm-plat h1, .ilm-plat h2, .ilm-plat h3, .ilm-plat p { margin-top: 0; }
.ilm-plat ::-webkit-scrollbar { width: 6px; height: 6px; }
.ilm-plat ::-webkit-scrollbar-track { background: var(--bg); }
.ilm-plat ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }
.ilm-plat ::-webkit-scrollbar-thumb:hover { background: var(--orange); }
.ilm-plat button:focus-visible,
.ilm-plat input:focus-visible,
.ilm-plat article:focus-visible {
  outline: 2px solid var(--orange); outline-offset: 2px;
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
.ilmora-hero {
  position: relative; overflow: hidden;
  padding: 72px 32px;
  background: var(--bg);
}
.ilmora-hero::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse 60% 70% at 0% 50%, rgba(249,115,22,.10) 0%, transparent 60%),
    radial-gradient(ellipse 40% 50% at 100% 20%, rgba(22,163,74,.07) 0%, transparent 55%);
}
.ilmora-hero-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 480px);
  gap: 52px; align-items: center; position: relative;
}
.ilmora-hero-text { display: flex; flex-direction: column; align-items: flex-start; min-width: 0; }
.ilmora-hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--orange-lt); border: 1.5px solid var(--orange-md);
  color: var(--orange); font-size: .78rem; font-weight: 700;
  letter-spacing: .04em; text-transform: uppercase;
  padding: 5px 15px; border-radius: 999px; margin-bottom: 22px;
  animation: ilmoraFadeUp .5s ease both;
}
.ilmora-hero h1 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 3.2rem); font-weight: 700;
  letter-spacing: -.5px; line-height: 1.18; margin-bottom: 18px;
  color: var(--dark); animation: ilmoraFadeUp .55s .06s ease both;
  overflow-wrap: anywhere;
}
.ilmora-hero h1 .highlight {
  color: var(--orange); position: relative; display: inline-block;
}
.ilmora-hero h1 .highlight::after {
  content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
  height: 3px; background: var(--orange); border-radius: 999px; opacity: .35;
}
.ilmora-hero-sub {
  font-size: 1rem; color: var(--muted); max-width: 520px;
  margin: 0 0 32px; line-height: 1.7;
  animation: ilmoraFadeUp .6s .12s ease both;
}
.ilmora-hero-btns {
  display: flex; gap: 12px; flex-wrap: wrap;
  animation: ilmoraFadeUp .65s .18s ease both;
}
.ilmora-btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 7px;
  background: var(--orange); color: #fff; padding: 13px 28px; min-height: 44px;
  border-radius: 10px; font-size: .95rem; font-weight: 700; border: none;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
  cursor: pointer;
}
.ilmora-btn-primary:hover {
  background: var(--orange-d); transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(249,115,22,.35);
}
.ilmora-hero-stats {
  display: flex; gap: 40px; flex-wrap: wrap;
  margin-top: 44px; animation: ilmoraFadeUp .7s .24s ease both;
}
.ilmora-hero-stat { text-align: left; }
.ilmora-hero-stat .num {
  font-family: var(--font-display); font-size: 1.8rem;
  font-weight: 700; color: var(--dark);
}
.ilmora-hero-stat .num b { color: var(--orange); }
.ilmora-hero-stat .lbl { font-size: .75rem; color: var(--muted); font-weight: 500; margin-top: 1px; }
.ilmora-hero-video-wrap {
  position: relative; border-radius: 20px; overflow: hidden;
  box-shadow: 0 24px 64px rgba(15,23,42,.18), 0 0 0 1.5px var(--border);
  animation: ilmoraFadeUp .7s .3s ease both;
  aspect-ratio: 16/10; background: var(--dark2);
  width: 100%; min-width: 0;
}
.ilmora-hero-video-wrap video {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.ilmora-hero-video-wrap::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 3px; background: linear-gradient(90deg, var(--orange), var(--green)); z-index: 2;
}
.ilmora-video-badge {
  position: absolute; bottom: 16px; left: 16px; right: 16px; width: fit-content; max-width: calc(100% - 32px);
  background: rgba(15,23,42,.82); backdrop-filter: blur(10px);
  color: #fff; font-size: .75rem; font-weight: 700;
  padding: 7px 14px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,.12);
  display: flex; align-items: center; gap: 7px;
  z-index: 3; letter-spacing: .03em;
}
.ilmora-video-badge .vbdot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #22c55e;
  animation: livePulse 1.4s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes livePulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: .5; transform: scale(1.35); }
}

/* SECTION */
.ilmora-section-wrap { max-width: 1280px; margin: 0 auto; padding: 0 32px; width: 100%; }
.ilmora-section-header { text-align: center; margin-bottom: 36px; }
.ilmora-section-tag {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--orange-lt); color: var(--orange);
  font-size: .75rem; font-weight: 700; letter-spacing: .06em;
  text-transform: uppercase; padding: 4px 13px;
  border-radius: 999px; margin-bottom: 14px;
}
.ilmora-section-header h2 {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2.4rem); font-weight: 700;
  letter-spacing: -.3px; margin-bottom: 12px; line-height: 1.25;
}
.ilmora-section-header p {
  color: var(--muted); max-width: 540px; margin: 0 auto; font-size: .95rem;
}

/* ══════════════════════════════════════════════
   LAYOUT: LEFT SIDEBAR + CONTENT
══════════════════════════════════════════════ */
.ilmora-layout {
  display: grid; grid-template-columns: 270px minmax(0, 1fr);
  gap: 28px; align-items: start;
}

/* SIDEBAR (docs-style left nav) */
.ilmora-sidebar {
  position: sticky; top: var(--nav-offset);
  max-height: calc(100vh - 110px); overflow-y: auto;
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); padding: 14px 10px 16px;
  min-width: 0;
}
.ilmora-sb-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px; padding: 4px 10px 10px;
}
.ilmora-sb-label { font-size: .78rem; font-weight: 700; color: var(--dark); }
.ilmora-sb-pill {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--orange-lt); border: 1px solid var(--orange-md);
  color: var(--orange); font-size: .62rem; font-weight: 700;
  padding: 2px 8px; border-radius: 999px; letter-spacing: .03em;
}
.ilmora-sb-pill .pdot {
  width: 6px; height: 6px; border-radius: 50%; background: var(--orange);
  animation: livePulse 1.4s ease-in-out infinite;
}
.ilmora-sb-nav { display: flex; flex-direction: column; gap: 2px; }
.ilmora-sb-item {
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; min-height: 40px; border: none; border-radius: 8px;
  background: transparent; color: var(--mid);
  font-size: .86rem; font-weight: 500; text-align: left;
  transition: background var(--transition), color var(--transition);
}
.ilmora-sb-item:hover { background: var(--surface2); color: var(--dark); }
.ilmora-sb-item.active { background: var(--surface2); color: var(--dark); font-weight: 700; }
.ilmora-sb-item-icon {
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: var(--muted);
}
.ilmora-sb-item.active .ilmora-sb-item-icon { color: var(--orange); }
.ilmora-sb-item-name { flex: 1; line-height: 1.3; min-width: 0; }
.ilmora-sb-count {
  font-size: .68rem; font-weight: 700; color: var(--muted);
  background: var(--bg); border: 1px solid var(--border);
  min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px;
  display: inline-flex; align-items: center; justify-content: center;
}
.ilmora-sb-item.active .ilmora-sb-count {
  background: var(--orange); border-color: var(--orange); color: #fff;
}
.ilmora-sb-chev { flex-shrink: 0; color: var(--muted); transition: transform var(--transition); }
.ilmora-sb-item.active .ilmora-sb-chev { transform: rotate(90deg); color: var(--orange); }
.ilmora-sb-item.active.collapsed .ilmora-sb-chev { transform: rotate(0deg); }
.ilmora-sb-sub {
  margin: 2px 0 8px 19px; padding-left: 10px;
  border-left: 1.5px solid var(--border);
  display: flex; flex-direction: column; gap: 1px;
  animation: ilmoraCardIn .25s ease both;
}
.ilmora-sb-subitem {
  width: 100%; display: block; text-align: left;
  padding: 7px 10px; min-height: 34px; border: none; border-radius: 6px;
  background: transparent; color: var(--muted);
  font-size: .8rem; font-weight: 500;
  transition: background var(--transition), color var(--transition);
}
.ilmora-sb-subitem:hover { background: var(--surface2); color: var(--orange); }
.ilmora-sb-subitem.current { background: var(--orange-lt); color: var(--orange); font-weight: 700; }

/* PLATFORM SECTION */
.ilmora-platforms-section { padding: 80px 0; }
.ilmora-programs-panel { min-height: 400px; min-width: 0; scroll-margin-top: var(--nav-offset); }
.ilmora-panel-top {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); padding: 24px 28px 20px; margin-bottom: 20px;
}
.ilmora-panel-title-row {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 16px; flex-wrap: wrap; margin-bottom: 8px;
}
.ilmora-panel-icon-name { display: flex; align-items: center; gap: 12px; min-width: 0; }
.ilmora-panel-icon {
  width: 46px; height: 46px;
  background: var(--orange-lt); border: 1.5px solid var(--orange-md);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: var(--orange);
}
.ilmora-panel-title {
  font-family: var(--font-display); font-size: 1.35rem;
  font-weight: 700; color: var(--dark); line-height: 1.25; overflow-wrap: anywhere;
}
.ilmora-panel-badge {
  background: var(--orange); color: #fff; font-size: .75rem; font-weight: 700;
  padding: 4px 12px; border-radius: 999px; flex-shrink: 0;
  align-self: flex-start; margin-top: 2px;
}
.ilmora-panel-desc { font-size: .875rem; color: var(--muted); margin-bottom: 18px; line-height: 1.65; }
.ilmora-panel-controls { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.ilmora-panel-search-wrap { position: relative; flex: 1; min-width: 200px; }
.ilmora-panel-search-wrap .ilmora-search-icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  display: flex; align-items: center; color: var(--muted); pointer-events: none;
}
.ilmora-panel-search {
  width: 100%; padding: 10px 12px 10px 38px; min-height: 42px;
  border: 1.5px solid var(--border); border-radius: var(--radius-sm);
  background: var(--bg); color: var(--dark);
  font-size: 16px; /* 16px prevents iOS Safari zoom on focus */
  transition: border-color var(--transition), box-shadow var(--transition); outline: none;
}
.ilmora-panel-search:focus { border-color: var(--orange); box-shadow: 0 0 0 3px var(--orange-glow); }
.ilmora-panel-search::placeholder { color: var(--muted); }
.ilmora-filter-btns { display: flex; gap: 6px; flex-wrap: wrap; }
.ilmora-filter-btn {
  padding: 8px 14px; min-height: 40px; border-radius: var(--radius-sm);
  font-size: .8rem; font-weight: 600; white-space: nowrap;
  background: var(--bg); color: var(--muted);
  border: 1.5px solid var(--border); transition: all var(--transition); cursor: pointer;
}
.ilmora-filter-btn:hover { border-color: var(--orange-md); color: var(--dark); }
.ilmora-filter-btn.active {
  background: var(--orange); color: #fff; border-color: var(--orange);
  box-shadow: 0 2px 10px rgba(249,115,22,.25);
}

/* PROGRAM CARDS */
.ilmora-programs-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
  gap: 16px; transition: opacity var(--transition);
}
.ilmora-programs-grid.fading { opacity: 0; transform: translateY(8px); }
.ilmora-prog-card {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); padding: 20px; cursor: pointer;
  display: flex; flex-direction: column; gap: 10px; min-width: 0;
  transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
  animation: ilmoraCardIn .3s ease both;
}
.ilmora-prog-card:hover {
  border-color: var(--orange-md);
  box-shadow: 0 6px 28px rgba(249,115,22,.12);
  transform: translateY(-3px);
}
.ilmora-prog-card-head { display: flex; align-items: center; gap: 12px; }
.ilmora-prog-card-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--orange-lt); border: 1.5px solid var(--orange-md);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: var(--orange);
}
.ilmora-prog-card-name { font-size: .925rem; font-weight: 700; color: var(--dark); line-height: 1.3; overflow-wrap: anywhere; }
.ilmora-prog-card-desc { font-size: .8rem; color: var(--muted); line-height: 1.55; flex: 1; }
.ilmora-prog-card-badges { display: flex; gap: 6px; flex-wrap: wrap; }
.ilmora-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: .7rem; font-weight: 700; padding: 2px 8px;
  border-radius: 999px; border: 1.5px solid;
}
.ilmora-badge-Beginner { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
.ilmora-badge-Intermediate { background: #fff7ed; color: #f97316; border-color: #fed7aa; }
.ilmora-badge-Advanced { background: #fff1f2; color: #e11d48; border-color: #fecdd3; }
.ilmora-badge-other { background: var(--surface2); color: var(--muted); border-color: var(--border); }
.ilmora-badge-duration { background: var(--surface2); color: var(--muted); border-color: var(--border); }
.ilmora-badge-popular { background: #fff7ed; color: #f97316; border-color: #fed7aa; }
.ilmora-badge-beginner-friendly { background: #f0fdf4; color: #16a34a; border-color: #bbf7d0; }
.ilmora-prog-card-actions { display: flex; gap: 8px; margin-top: 2px; }
.ilmora-btn-syllabus {
  flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  background: var(--orange); color: #fff; padding: 8px 14px; min-height: 40px;
  border-radius: 8px; font-size: .78rem; font-weight: 700; border: none;
  transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
}
.ilmora-btn-syllabus:hover {
  background: var(--orange-d); transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(249,115,22,.3);
}
.ilmora-btn-save {
  display: inline-flex; align-items: center; justify-content: center; gap: 5px;
  background: var(--bg); color: var(--muted); padding: 8px 12px; min-height: 40px;
  border-radius: 8px; font-size: .78rem; font-weight: 600;
  border: 1.5px solid var(--border); transition: all var(--transition); white-space: nowrap;
}
.ilmora-btn-save:hover { border-color: var(--orange-md); color: var(--orange); background: var(--orange-lt); }
.ilmora-btn-save.saved { background: var(--orange-lt); color: var(--orange); border-color: var(--orange); }

/* ROLE FILTER + TAGS */
.ilmora-role-bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
.ilmora-role-bar-label {
  font-size: .75rem; font-weight: 700; color: var(--muted);
  text-transform: uppercase; letter-spacing: .05em; margin-right: 4px;
}
.ilmora-role-chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; min-height: 38px; border-radius: 999px;
  font-size: .8rem; font-weight: 600; white-space: nowrap;
  background: var(--surface); color: var(--muted);
  border: 1.5px solid var(--border); transition: all var(--transition);
}
.ilmora-role-chip:hover { border-color: var(--orange-md); color: var(--dark); }
.ilmora-role-chip.active { background: var(--orange-lt); color: var(--orange); border-color: var(--orange); }
.ilmora-prog-card-roles { display: flex; gap: 6px; flex-wrap: wrap; }
.ilmora-role-tag {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: .68rem; font-weight: 600; padding: 2px 8px;
  border-radius: 6px; background: var(--surface2);
  color: var(--mid); border: 1px solid var(--border);
}

/* EMPTY STATE */
.ilmora-empty-state { grid-column: 1/-1; text-align: center; padding: 56px 20px; }
.ilmora-empty-state .empty-icon {
  display: flex; justify-content: center; margin-bottom: 14px; opacity: .4; color: var(--muted);
}
.ilmora-empty-state h3 { font-size: 1.05rem; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
.ilmora-empty-state p { color: var(--muted); font-size: .875rem; }

/* ══════════════════════════════════════════════
   INLINE PROGRAM DETAIL  (replaces the old popup modal)
══════════════════════════════════════════════ */
.ilmora-detail {
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); overflow: hidden;
  animation: ilmoraCardIn .3s ease both;
}
.ilmora-detail-bar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; flex-wrap: wrap;
  padding: 14px 24px; border-bottom: 1.5px solid var(--border);
  background: var(--surface2);
}
.ilmora-detail-back {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--surface); color: var(--mid);
  padding: 8px 14px; min-height: 40px; border-radius: var(--radius-sm);
  font-size: .82rem; font-weight: 700; border: 1.5px solid var(--border);
  transition: all var(--transition);
}
.ilmora-detail-back:hover { border-color: var(--orange); color: var(--orange); background: var(--orange-lt); }
.ilmora-detail-crumb {
  font-size: .78rem; color: var(--muted); font-weight: 600;
  min-width: 0; overflow-wrap: anywhere;
}
.ilmora-detail-crumb b { color: var(--orange); font-weight: 700; }
.ilmora-detail-head {
  display: flex; align-items: center; gap: 16px;
  padding: 26px 28px 8px;
}
.ilmora-detail-icon {
  width: 56px; height: 56px; border-radius: 14px;
  background: var(--orange-lt); border: 1.5px solid var(--orange-md);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: var(--orange);
}
.ilmora-detail-title {
  font-family: var(--font-display); font-size: clamp(1.25rem, 2.6vw, 1.7rem);
  font-weight: 700; color: var(--dark); line-height: 1.25; margin: 0 0 6px;
  overflow-wrap: anywhere;
}
.ilmora-detail-platform {
  font-size: .78rem; color: var(--orange); font-weight: 600;
  background: var(--orange-lt); border: 1px solid var(--orange-md);
  padding: 2px 10px; border-radius: 999px; display: inline-block;
  max-width: 100%; overflow-wrap: anywhere;
}
.ilmora-detail-body { padding: 18px 28px 28px; }
.ilmora-detail-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; }
.ilmora-detail-desc {
  font-size: .92rem; color: var(--muted); line-height: 1.7; margin-bottom: 22px;
  padding: 16px; background: var(--surface2); border-radius: var(--radius-sm);
  border: 1px solid var(--border2);
}
.ilmora-detail-info-grid {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px; margin-bottom: 24px;
}
.ilmora-detail-info-block {
  background: var(--surface2); border: 1px solid var(--border2);
  border-radius: var(--radius-sm); padding: 14px 16px; min-width: 0;
}
.ilmora-detail-info-label {
  display: flex; align-items: center; gap: 5px;
  font-size: .7rem; font-weight: 700; color: var(--orange);
  text-transform: uppercase; letter-spacing: .05em; margin-bottom: 5px;
}
.ilmora-detail-info-value { font-size: .875rem; color: var(--dark); font-weight: 600; overflow-wrap: anywhere; }
.ilmora-detail-section { margin-bottom: 24px; }
.ilmora-detail-section-title {
  display: flex; align-items: center; gap: 7px;
  font-size: .9rem; font-weight: 700; color: var(--dark); margin-bottom: 12px;
}
.ilmora-tools-list { display: flex; gap: 7px; flex-wrap: wrap; }
.ilmora-tool-tag {
  background: var(--surface2); color: var(--mid); font-size: .77rem;
  font-weight: 600; padding: 4px 11px; border-radius: 999px;
  border: 1px solid var(--border); overflow-wrap: anywhere;
}
.ilmora-syllabus-list {
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px;
}
.ilmora-syllabus-item {
  display: flex; align-items: flex-start; gap: 10px;
  background: var(--surface2); border: 1px solid var(--border2);
  border-radius: var(--radius-sm); padding: 11px 14px;
  font-size: .845rem; color: var(--dark); line-height: 1.5; min-width: 0;
}
.ilmora-syllabus-item span:last-child { overflow-wrap: anywhere; }
.ilmora-syllabus-num {
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--orange); color: #fff; font-size: .7rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}
.ilmora-detail-footer {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; flex-wrap: wrap;
  padding: 16px 28px; border-top: 1.5px solid var(--border);
  background: var(--surface2);
}
.ilmora-detail-nav { display: flex; gap: 8px; flex-wrap: wrap; }
.ilmora-btn-ghost {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  background: var(--surface); color: var(--mid); padding: 9px 16px; min-height: 42px;
  border-radius: var(--radius-sm); font-size: .84rem; font-weight: 600;
  border: 1.5px solid var(--border); transition: all var(--transition);
}
.ilmora-btn-ghost:hover:not(:disabled) { border-color: var(--orange-md); color: var(--orange); }
.ilmora-btn-ghost:disabled { opacity: .45; cursor: not-allowed; }
.ilmora-btn-modal-save {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  background: var(--orange); color: #fff; padding: 10px 22px; min-height: 42px;
  border-radius: var(--radius-sm); font-size: .875rem; font-weight: 700; border: none;
  transition: background var(--transition), transform var(--transition);
}
.ilmora-btn-modal-save:hover { background: var(--orange-d); transform: translateY(-1px); }
.ilmora-btn-modal-save.saved { background: var(--orange-lt); color: var(--orange); border: 1.5px solid var(--orange); }

/* WHY CHOOSE */
.ilmora-why-section { padding: 80px 0; background: var(--surface); }
.ilmora-why-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.ilmora-why-card {
  background: var(--bg); border: 1.5px solid var(--border);
  border-radius: var(--radius); padding: 30px 26px;
  transition: box-shadow var(--transition), transform var(--transition);
}
.ilmora-why-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
.ilmora-why-icon {
  width: 50px; height: 50px; border-radius: 12px;
  background: var(--orange-lt); border: 1.5px solid var(--orange-md);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px; color: var(--orange);
}
.ilmora-why-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
.ilmora-why-card p { font-size: .83rem; color: var(--muted); line-height: 1.65; margin-bottom: 0; }

.ilmora-discussion-strip {
  margin-bottom: 52px; display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; align-items: center;
}
.ilmora-discussion-video-wrap {
  position: relative; border-radius: 18px; overflow: hidden;
  box-shadow: 0 16px 48px rgba(15,23,42,.14), 0 0 0 1.5px var(--border);
  aspect-ratio: 16/9; background: var(--dark2); width: 100%;
}
.ilmora-discussion-video-wrap video { width: 100%; height: 100%; object-fit: cover; display: block; }
.ilmora-discussion-video-wrap::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(249,115,22,.08) 0%, transparent 60%);
  pointer-events: none;
}
.ilmora-discussion-video-wrap::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0;
  height: 3px; background: linear-gradient(90deg, var(--green), var(--orange)); z-index: 2;
}
.ilmora-discussion-text h3 {
  font-family: var(--font-display); font-size: clamp(1.3rem, 2.4vw, 1.6rem); font-weight: 700;
  color: var(--dark); line-height: 1.3; margin-bottom: 14px;
}
.ilmora-discussion-text h3 span { color: var(--orange); }
.ilmora-discussion-text p { font-size: .93rem; color: var(--muted); line-height: 1.75; margin-bottom: 22px; }
.ilmora-discussion-pills { display: flex; gap: 10px; flex-wrap: wrap; }
.ilmora-dpill {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--orange-lt); border: 1.5px solid var(--orange-md);
  color: var(--orange); font-size: .77rem; font-weight: 700;
  padding: 5px 13px; border-radius: 999px;
}

/* TOAST */
.ilmora-toast-container {
  position: fixed; bottom: calc(28px + env(safe-area-inset-bottom, 0px)); right: 28px; z-index: 900;
  display: flex; flex-direction: column; gap: 10px; pointer-events: none;
}
.ilmora-toast {
  background: var(--dark); color: var(--bg); padding: 12px 18px; border-radius: 10px;
  font-size: .845rem; font-weight: 600; box-shadow: 0 8px 28px rgba(15,23,42,.2);
  display: flex; align-items: center; gap: 10px;
  min-width: 220px; max-width: 340px; pointer-events: auto;
  animation: ilmoraToastIn .3s cubic-bezier(.34,1.56,.64,1) both;
}
.ilmora-toast-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }

/* ANIMATIONS */
@keyframes ilmoraFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ilmoraCardIn {
  from { opacity: 0; transform: translateY(12px) scale(.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes ilmoraToastIn {
  from { opacity: 0; transform: translateX(50px) scale(.9); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

/* Touch devices: no sticky hover lift */
@media (hover: none) {
  .ilmora-prog-card:hover,
  .ilmora-why-card:hover,
  .ilmora-btn-primary:hover,
  .ilmora-btn-syllabus:hover,
  .ilmora-btn-modal-save:hover { transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ilm-plat *, .ilm-plat *::before, .ilm-plat *::after {
    animation-duration: .01ms !important; animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}

/* ══════════════════════════════════════════════
   RESPONSIVE
══════════════════════════════════════════════ */

/* ≤1180 : iPad Pro 11", small laptops */
@media (max-width: 1180px) {
  .ilmora-hero-inner { gap: 36px; grid-template-columns: minmax(0, 1fr) minmax(0, 420px); }
  .ilmora-layout { grid-template-columns: 250px minmax(0, 1fr); gap: 22px; }
}

/* ≤1060 : hero stacks */
@media (max-width: 1060px) {
  .ilmora-hero-inner { grid-template-columns: minmax(0, 1fr); gap: 36px; }
  .ilmora-hero-text { align-items: center; text-align: center; }
  .ilmora-hero h1 { text-align: center; }
  .ilmora-hero-sub { text-align: center; margin: 0 auto 32px; }
  .ilmora-hero-btns { justify-content: center; }
  .ilmora-hero-stats { justify-content: center; }
  .ilmora-hero-stat { text-align: center; }
  .ilmora-hero-video-wrap { max-width: 600px; margin: 0 auto; }
}

/* ≤1024 : iPad landscape / tablets */
@media (max-width: 1024px) {
  .ilmora-section-wrap { padding: 0 24px; }
  .ilmora-platforms-section, .ilmora-why-section { padding: 64px 0; }
  .ilmora-layout { grid-template-columns: 230px minmax(0, 1fr); gap: 18px; }
  .ilmora-panel-top { padding: 20px 22px 18px; }
}

/* ≤960 : sidebar becomes horizontal tabs (iPad portrait, iPad Air) */
@media (max-width: 960px) {
  .ilm-plat { --nav-offset: 76px; }
  .ilmora-layout { grid-template-columns: minmax(0, 1fr); gap: 18px; }
  .ilmora-sidebar { position: static; max-height: none; overflow: visible; padding: 10px; }
  .ilmora-sb-head { padding: 2px 6px 8px; }
  .ilmora-sb-nav {
    flex-direction: row; overflow-x: auto; gap: 6px; padding-bottom: 2px;
    scrollbar-width: none; -webkit-overflow-scrolling: touch;
  }
  .ilmora-sb-nav::-webkit-scrollbar { display: none; }
  .ilmora-sb-nav > div { flex-shrink: 0; }
  .ilmora-sb-item { width: auto; white-space: nowrap; flex-shrink: 0; border: 1.5px solid var(--border); }
  .ilmora-sb-item.active { border-color: var(--orange-md); }
  .ilmora-sb-chev { display: none; }
  .ilmora-sb-sub { display: none; }
  .ilmora-discussion-strip { grid-template-columns: minmax(0, 1fr); gap: 22px; }
  .ilmora-discussion-video-wrap { max-width: 600px; }
}

/* ≤820 : iPad Air portrait */
@media (max-width: 820px) {
  .ilmora-why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ilmora-hero { padding: 60px 24px; }
}

/* ≤768 : iPad mini, small tablets */
@media (max-width: 768px) {
  .ilmora-hero { padding: 52px 20px; }
  .ilmora-hero-stats { gap: 28px; margin-top: 34px; }
  .ilmora-platforms-section, .ilmora-why-section { padding: 52px 0; }
  .ilmora-section-header { margin-bottom: 28px; }
  .ilmora-detail-bar { padding: 12px 18px; }
  .ilmora-detail-head { padding: 22px 20px 6px; }
  .ilmora-detail-body { padding: 16px 20px 22px; }
  .ilmora-detail-footer { padding: 14px 20px; }
}

/* ≤640 : large phones (Pixel, iPhone Pro Max) */
@media (max-width: 640px) {
  .ilmora-section-wrap { padding: 0 16px; }
  .ilmora-hero { padding: 44px 16px 40px; }
  .ilmora-hero-badge { font-size: .72rem; margin-bottom: 18px; }
  .ilmora-hero-sub { font-size: .94rem; margin-bottom: 26px; }
  .ilmora-hero-stats {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px 16px; width: 100%; max-width: 360px; margin-top: 30px;
  }
  .ilmora-hero-video-wrap { border-radius: 16px; aspect-ratio: 16/10; }
  .ilmora-video-badge { bottom: 10px; left: 10px; font-size: .68rem; padding: 6px 12px; }

  .ilmora-panel-top { padding: 16px; }
  .ilmora-panel-icon { width: 40px; height: 40px; }
  .ilmora-panel-title { font-size: 1.1rem; }
  .ilmora-panel-controls { flex-direction: column; align-items: stretch; }
  .ilmora-panel-search-wrap { min-width: 0; width: 100%; flex: none; }
  .ilmora-filter-btns {
    flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch;
  }
  .ilmora-filter-btns::-webkit-scrollbar { display: none; }
  .ilmora-filter-btn { flex-shrink: 0; }

  .ilmora-role-bar {
    flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none;
    -webkit-overflow-scrolling: touch; margin-left: -16px; margin-right: -16px; padding: 0 16px 4px;
  }
  .ilmora-role-bar::-webkit-scrollbar { display: none; }
  .ilmora-role-bar-label, .ilmora-role-chip { flex-shrink: 0; }

  .ilmora-programs-grid { grid-template-columns: minmax(0, 1fr); gap: 14px; }

  .ilmora-detail-info-grid { grid-template-columns: minmax(0, 1fr); }
  .ilmora-syllabus-list { grid-template-columns: minmax(0, 1fr); }
  .ilmora-detail-head { gap: 12px; }
  .ilmora-detail-icon { width: 46px; height: 46px; border-radius: 12px; }
  .ilmora-detail-footer { flex-direction: column-reverse; align-items: stretch; }
  .ilmora-detail-nav { width: 100%; }
  .ilmora-detail-nav .ilmora-btn-ghost { flex: 1; }
  .ilmora-btn-modal-save { width: 100%; }
  .ilmora-detail-bar { flex-direction: column; align-items: flex-start; gap: 8px; }
  .ilmora-detail-back { width: 100%; justify-content: center; }

  .ilmora-why-grid { grid-template-columns: minmax(0, 1fr); gap: 16px; }
  .ilmora-why-card { padding: 24px 20px; }
  .ilmora-discussion-strip { margin-bottom: 36px; }

  .ilmora-toast-container {
    left: 16px; right: 16px; bottom: calc(16px + env(safe-area-inset-bottom, 0px)); align-items: stretch;
  }
  .ilmora-toast { min-width: 0; max-width: none; width: 100%; }
}

/* ≤480 : standard phones (iPhone 12–15, Pixel 7/8) */
@media (max-width: 480px) {
  .ilmora-hero h1 br { display: none; }
  .ilmora-hero-btns { width: 100%; }
  .ilmora-hero-btns .ilmora-btn-primary { width: 100%; }
  .ilmora-hero-stat .num { font-size: 1.5rem; }
  .ilmora-prog-card { padding: 16px; }
  .ilmora-prog-card-actions { flex-direction: column; }
  .ilmora-btn-save, .ilmora-btn-syllabus { width: 100%; }
  .ilmora-discussion-pills { gap: 8px; }
  .ilmora-dpill { font-size: .72rem; padding: 4px 11px; }
}

/* ≤375 : iPhone SE / mini, small Androids */
@media (max-width: 375px) {
  .ilmora-section-wrap { padding: 0 12px; }
  .ilmora-hero { padding: 36px 12px 34px; }
  .ilmora-hero-stats { gap: 16px 12px; }
  .ilmora-panel-top { padding: 14px; }
  .ilmora-detail-head { padding: 18px 14px 4px; }
  .ilmora-detail-body { padding: 14px 14px 18px; }
  .ilmora-detail-bar, .ilmora-detail-footer { padding-left: 14px; padding-right: 14px; }
  .ilmora-detail-desc { padding: 12px; font-size: .88rem; }
  .ilmora-syllabus-item { padding: 10px 12px; font-size: .82rem; }
  .ilmora-role-bar { margin-left: -12px; margin-right: -12px; padding-left: 12px; padding-right: 12px; }
}

/* ≤340 : very small (Galaxy Fold closed) */
@media (max-width: 340px) {
  .ilmora-hero-stats { grid-template-columns: minmax(0, 1fr); }
  .ilmora-detail-title { font-size: 1.1rem; }
  .ilmora-filter-btn, .ilmora-role-chip { font-size: .75rem; padding-left: 11px; padding-right: 11px; }
}

/* Landscape phones: avoid huge vertical padding */
@media (max-height: 480px) and (orientation: landscape) {
  .ilmora-hero { padding-top: 32px; padding-bottom: 32px; }
}
/* ══════════════════════════════════════════════
   PANEL VIEW TABS (Programs | Journey)
══════════════════════════════════════════════ */
.ilmora-view-tabs {
  display: inline-flex; gap: 4px; padding: 4px; margin-top: 16px;
  background: var(--surface2); border: 1.5px solid var(--border);
  border-radius: 999px; max-width: 100%;
}
.ilmora-view-tab {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 8px 18px; min-height: 40px; border: none; border-radius: 999px;
  background: transparent; color: var(--muted);
  font-size: .85rem; font-weight: 600;
  transition: background var(--transition), color var(--transition);
}
.ilmora-view-tab:hover { color: var(--dark); }
.ilmora-view-tab.active {
  background: var(--orange); color: #fff;
  box-shadow: 0 4px 14px rgba(249,115,22,.3);
}

/* ══════════════════════════════════════════════
   LEARNING JOURNEY (roadmap / flow)
══════════════════════════════════════════════ */
.ilmora-journey { padding: 22px 22px 26px; min-width: 0; }
.ilmora-journey-head { margin-bottom: 18px; }
.ilmora-journey-title {
  font-family: var(--font-display); font-size: 1.25rem; font-weight: 700;
  color: var(--dark); margin: 0 0 6px;
}
.ilmora-journey-sub { color: var(--muted); font-size: .9rem; margin: 0 0 14px; max-width: 620px; }
.ilmora-journey-stats { display: flex; flex-wrap: wrap; gap: 10px; }
.ilmora-journey-stat {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--orange-lt); border: 1px solid var(--orange-md);
  color: var(--orange); font-size: .76rem; font-weight: 700;
  padding: 5px 12px; border-radius: 999px;
}

.ilmora-journey-flow { list-style: none; margin: 0; padding: 0; }
.ilmora-jstage { display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 14px; }
.ilmora-jstage-rail { display: flex; flex-direction: column; align-items: center; }
.ilmora-jstage-num {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--orange); color: #fff; font-weight: 800; font-size: .88rem;
  box-shadow: 0 0 0 4px var(--orange-glow);
}
.ilmora-jstage-num.capstone { background: transparent; color: var(--orange); border: 2px dashed var(--orange); box-shadow: none; }
.ilmora-jstage-line {
  flex: 1; width: 2px; margin: 6px 0; min-height: 24px;
  background: linear-gradient(var(--orange), var(--orange-md));
  border-radius: 2px;
}
.ilmora-jstage:last-child .ilmora-jstage-line { display: none; }
.ilmora-jstage-body { padding-bottom: 22px; min-width: 0; }
.ilmora-jstage:last-child .ilmora-jstage-body { padding-bottom: 0; }
.ilmora-jstage-top { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.ilmora-jstage-name { font-size: 1.02rem; font-weight: 700; color: var(--dark); margin: 0; }
.ilmora-jstage-mode {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: .68rem; font-weight: 700; letter-spacing: .03em; text-transform: uppercase;
  color: var(--green); background: var(--green-lt);
  border: 1px solid rgba(22,163,74,.25); padding: 2px 9px; border-radius: 999px;
}
.ilmora-jstage-note { color: var(--muted); font-size: .85rem; margin: 0 0 12px; }
.ilmora-jstage-progs { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
.ilmora-jnode {
  position: relative; text-align: left; width: 100%;
  display: flex; flex-direction: column; gap: 6px;
  padding: 12px 14px; min-height: 44px;
  background: var(--surface); border: 1.5px solid var(--border);
  border-radius: var(--radius); color: var(--dark);
  transition: border-color var(--transition), transform var(--transition), box-shadow var(--transition);
}
.ilmora-jnode:hover { border-color: var(--orange); transform: translateY(-2px); box-shadow: var(--shadow); }
.ilmora-jnode-top { display: flex; align-items: center; gap: 8px; }
.ilmora-jnode-icon {
  width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: var(--orange-lt); color: var(--orange);
}
.ilmora-jnode-name { font-size: .9rem; font-weight: 700; line-height: 1.25; overflow-wrap: anywhere; }
.ilmora-jnode-meta { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: .74rem; color: var(--muted); }
.ilmora-jnode-tag {
  position: absolute; top: -9px; right: 10px;
  background: var(--dark); color: var(--surface);
  font-size: .62rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;
}
.ilmora-jnode-open { font-size: .74rem; font-weight: 700; color: var(--orange); display: inline-flex; align-items: center; gap: 3px; }
.ilmora-jcapstone {
  padding: 14px 16px; border: 2px dashed var(--orange-md);
  border-radius: var(--radius); background: var(--orange-lt);
}
.ilmora-jcapstone p { margin: 4px 0 0; font-size: .86rem; color: var(--mid); }
.ilmora-jsoon {
  display: inline-block; font-size: .66rem; font-weight: 700; letter-spacing: .04em;
  text-transform: uppercase; color: var(--orange);
  border: 1px solid var(--orange); padding: 1px 8px; border-radius: 999px;
}

/* Journey block inside program detail */
.ilmora-pj {
  margin: 0 0 22px; padding: 14px 16px;
  background: var(--surface2); border: 1.5px solid var(--border); border-radius: var(--radius);
}
.ilmora-pj-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 10px; }
.ilmora-pj-row:first-of-type { margin-top: 0; }
.ilmora-pj-label { font-size: .72rem; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .04em; min-width: 78px; }
.ilmora-pj-stage {
  display: inline-flex; align-items: center; gap: 5px;
  background: var(--orange); color: #fff; font-size: .76rem; font-weight: 700;
  padding: 4px 12px; border-radius: 999px;
}
.ilmora-pj-chip {
  display: inline-flex; align-items: center; gap: 4px; min-height: 32px;
  background: var(--surface); border: 1.5px solid var(--border); color: var(--dark);
  font-size: .8rem; font-weight: 600; padding: 4px 12px; border-radius: 999px;
  transition: border-color var(--transition), color var(--transition);
}
button.ilmora-pj-chip:hover { border-color: var(--orange); color: var(--orange); }
.ilmora-pj-chip.soft { border-style: dashed; color: var(--muted); }

@media (max-width: 640px) {
  .ilmora-journey { padding: 16px 14px 20px; }
  .ilmora-jstage { grid-template-columns: 30px minmax(0, 1fr); gap: 10px; }
  .ilmora-jstage-num { width: 28px; height: 28px; font-size: .8rem; }
  .ilmora-jstage-progs { grid-template-columns: 1fr; }
  .ilmora-view-tabs { display: flex; width: 100%; }
  .ilmora-view-tab { flex: 1; padding: 8px 10px; }
  .ilmora-pj-label { min-width: 100%; }
}
`;

// ═══════════════════════════════════════════════
//  STYLE INJECTION — React-managed, survives back navigation
// ═══════════════════════════════════════════════
const STYLE_ID = "ilmora-platforms-styles";

function useInjectStyles() {
  useEffect(() => {
    let el = document.getElementById(STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = cssText;
    return () => {
      const toRemove = document.getElementById(STYLE_ID);
      if (toRemove) toRemove.remove();
    };
  }, []);
}

// ═══════════════════════════════════════════════
//  TOAST HOOK
// ═══════════════════════════════════════════════
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);
  return { toasts, showToast };
}

// ═══════════════════════════════════════════════
//  HERO
// ═══════════════════════════════════════════════
function Hero({ onExplore }) {
  return (
    <section className="ilmora-hero" id="hero">
      <div className="ilmora-hero-inner">
        <div className="ilmora-hero-text">
          <div className="ilmora-hero-badge">
            <Rocket size={13} /> Career-Ready Learning
          </div>
          <h1>
            Explore Career-Ready<br />
            Learning <span className="highlight">Platforms</span>
          </h1>
          <p className="ilmora-hero-sub">
            Choose a platform, explore related programs, and view structured
            syllabus paths designed for modern careers.
          </p>
          <div className="ilmora-hero-btns">
            <button className="ilmora-btn-primary" onClick={onExplore}>
              Explore Platforms <ChevronRight size={16} />
            </button>
          </div>
          <div className="ilmora-hero-stats">
            {[
              { num: "3",   sup: "+",  lbl: "Learning Platforms" },
              { num: "19",  sup: "+",  lbl: "Programs" },
              { num: "100", sup: "%",  lbl: "Practical Focus" },
              { num: "24",  sup: "/7", lbl: "Mentor Support" },
            ].map((s) => (
              <div className="ilmora-hero-stat" key={s.lbl}>
                <div className="num">{s.num}<b>{s.sup}</b></div>
                <div className="lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ilmora-hero-video-wrap">
          <video src={heroVideo} autoPlay loop muted playsInline preload="auto" />
          <div className="ilmora-video-badge">
            <span className="vbdot" /> Real Students. Real Learning.
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
//  LEFT SIDEBAR (docs-style)
//  Platforms list; the active platform expands to show its programs.
// ═══════════════════════════════════════════════
function PlatformSidebar({ platforms, activePlatformId, activeProgramId, onSelect, onOpenProgram, collapsed = false }) {
  return (
    <aside className="ilmora-sidebar" aria-label="Platform selector">
      <div className="ilmora-sb-head">
        <span className="ilmora-sb-label">Choose Your Platform</span>
        <span className="ilmora-sb-pill"><span className="pdot" /> Enrolling</span>
      </div>
      <nav className="ilmora-sb-nav" role="tablist">
        {platforms.map((platform) => {
          const SbIcon = platform.Icon;
          const isActive = platform.id === activePlatformId;
          return (
            <div key={platform.id}>
              <button
                role="tab"
                aria-selected={isActive}
                aria-expanded={isActive && !collapsed}
                className={`ilmora-sb-item ${isActive ? "active" : ""} ${isActive && collapsed ? "collapsed" : ""}`}
                onClick={() => onSelect(platform.id)}
              >
                <span className="ilmora-sb-item-icon"><SbIcon size={16} /></span>
                <span className="ilmora-sb-item-name">{platform.name}</span>
                <span className="ilmora-sb-count">{platform.programs.length}</span>
                <ChevronRight size={14} className="ilmora-sb-chev" />
              </button>
              {isActive && !collapsed && (
                <ul className="ilmora-sb-sub">
                  {getOrderedPrograms(platform).map((p) => (
                    <li key={p.id}>
                      <button
                        className={`ilmora-sb-subitem ${activeProgramId === p.id ? "current" : ""}`}
                        onClick={() => onOpenProgram(p.id)}
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// ═══════════════════════════════════════════════
//  DIFFICULTY BADGE
// ═══════════════════════════════════════════════
function DifficultyBadge({ difficulty }) {
  const cls = getDifficultyClass(difficulty);
  const icons = {
    Beginner: <GraduationCap size={10} />,
    Intermediate: <TrendingUp size={10} />,
    Advanced: <Cpu size={10} />,
    other: null,
  };
  return (
    <span className={`ilmora-badge ilmora-badge-${cls}`}>
      {icons[cls]}{difficulty}
    </span>
  );
}

// ═══════════════════════════════════════════════
//  PROGRAM CARD
// ═══════════════════════════════════════════════
function ProgramCard({ prog, savedInterests, onSyllabus, onSave }) {
  const isSaved = savedInterests.has(prog.id);
  const CardIcon = prog.Icon;
  return (
    <article
      className="ilmora-prog-card"
      tabIndex={0}
      onClick={() => onSyllabus(prog.id)}
      onKeyDown={(e) => { if (e.key === "Enter") onSyllabus(prog.id); }}
    >
      <div className="ilmora-prog-card-head">
        <div className="ilmora-prog-card-icon"><CardIcon size={18} /></div>
        <div className="ilmora-prog-card-name">{prog.name}</div>
      </div>
      <div className="ilmora-prog-card-desc">{prog.description}</div>
      <div className="ilmora-prog-card-badges">
        <DifficultyBadge difficulty={prog.difficulty} />
        <span className="ilmora-badge ilmora-badge-duration">
          <Activity size={10} /> {prog.duration}
        </span>
        {prog.popular && (
          <span className="ilmora-badge ilmora-badge-popular">
            <Star size={10} /> Popular
          </span>
        )}
        {prog.beginnerFriendly && (
          <span className="ilmora-badge ilmora-badge-beginner-friendly">
            <GraduationCap size={10} /> Beginner
          </span>
        )}
      </div>
      <div className="ilmora-prog-card-roles">
        {getProgramRoles(prog.id).map((r) => {
          const RIcon = r.Icon;
          return (
            <span key={r.id} className="ilmora-role-tag">
              <RIcon size={10} /> {r.label}
            </span>
          );
        })}
      </div>
      <div className="ilmora-prog-card-actions">
        <button
          className="ilmora-btn-syllabus"
          onClick={(e) => { e.stopPropagation(); onSyllabus(prog.id); }}
        >
          <BookOpen size={13} /> View Syllabus
        </button>
        <button
          className={`ilmora-btn-save ${isSaved ? "saved" : ""}`}
          onClick={(e) => { e.stopPropagation(); onSave(prog.id, prog.name); }}
        >
          {isSaved
            ? <><BookMarked size={13} /> Saved</>
            : <><Bookmark size={13} /> Save</>}
        </button>
      </div>
    </article>
  );
}

// ═══════════════════════════════════════════════
//  INLINE PROGRAM DETAIL  (no popup — renders inside the panel)
// ═══════════════════════════════════════════════
function ProgramDetail({ prog, platform, savedInterests, onBack, onSave, onOpenProgram }) {
  const isSaved = savedInterests.has(prog.id);
  const DetailIcon = prog.Icon;
  const ordered = getOrderedPrograms(platform);
  const idx = ordered.findIndex((p) => p.id === prog.id);
  const prev = idx > 0 ? ordered[idx - 1] : null;
  const next = idx < ordered.length - 1 ? ordered[idx + 1] : null;

  return (
    <section className="ilmora-detail" aria-label={`${prog.name} details`}>
      <div className="ilmora-detail-bar">
        <button className="ilmora-detail-back" onClick={onBack}>
          <ChevronLeft size={15} /> Back to programs
        </button>
        <div className="ilmora-detail-crumb">
          {platform.name} / <b>{prog.name}</b>
        </div>
      </div>

      <div className="ilmora-detail-head">
        <div className="ilmora-detail-icon"><DetailIcon size={26} /></div>
        <div style={{ minWidth: 0 }}>
          <h3 className="ilmora-detail-title">{prog.name}</h3>
          <span className="ilmora-detail-platform">{platform.name}</span>
        </div>
      </div>

      <div className="ilmora-detail-body">
        <div className="ilmora-detail-meta">
          <DifficultyBadge difficulty={prog.difficulty} />
          <span className="ilmora-badge ilmora-badge-duration">
            <Activity size={10} /> {prog.duration}
          </span>
          {prog.popular && (
            <span className="ilmora-badge ilmora-badge-popular">
              <Star size={10} /> Popular
            </span>
          )}
          {prog.beginnerFriendly && (
            <span className="ilmora-badge ilmora-badge-beginner-friendly">
              <GraduationCap size={10} /> Beginner Friendly
            </span>
          )}
        </div>

        <div className="ilmora-detail-desc">{prog.description}</div>

        <div className="ilmora-detail-info-grid">
          <div className="ilmora-detail-info-block">
            <div className="ilmora-detail-info-label"><Target size={11} /> Career Outcome</div>
            <div className="ilmora-detail-info-value">{prog.careerOutcome}</div>
          </div>
          <div className="ilmora-detail-info-block">
            <div className="ilmora-detail-info-label"><Users size={11} /> Who Is This For</div>
            <div className="ilmora-detail-info-value">{prog.whoIsFor}</div>
          </div>
        </div>

        <ProgramJourneyInfo prog={prog} platform={platform} onOpenProgram={onOpenProgram} />

        <div className="ilmora-detail-section">
          <div className="ilmora-detail-section-title"><Briefcase size={15} /> Suitable Roles</div>
          <div className="ilmora-tools-list">
            {getProgramRoles(prog.id).map((r) => (
              <span key={r.id} className="ilmora-tool-tag">{r.label}</span>
            ))}
          </div>
        </div>

        <div className="ilmora-detail-section">
          <div className="ilmora-detail-section-title"><Wrench size={15} /> Tools &amp; Technologies</div>
          <div className="ilmora-tools-list">
            {prog.tools.map((t) => (
              <span key={t} className="ilmora-tool-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="ilmora-detail-section" style={{ marginBottom: 0 }}>
          <div className="ilmora-detail-section-title"><BookOpen size={15} /> Syllabus Modules</div>
          <div className="ilmora-syllabus-list">
            {prog.syllabus.map((mod, i) => (
              <div key={i} className="ilmora-syllabus-item">
                <span className="ilmora-syllabus-num">{i + 1}</span>
                <span>{mod}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ilmora-detail-footer">
        <div className="ilmora-detail-nav">
          <button
            className="ilmora-btn-ghost"
            disabled={!prev}
            onClick={() => prev && onOpenProgram(prev.id)}
          >
            <ChevronLeft size={14} /> Previous
          </button>
          <button
            className="ilmora-btn-ghost"
            disabled={!next}
            onClick={() => next && onOpenProgram(next.id)}
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
        <button
          className={`ilmora-btn-modal-save ${isSaved ? "saved" : ""}`}
          onClick={() => onSave(prog.id, prog.name)}
        >
          {isSaved
            ? <><BookMarked size={14} /> Already Saved</>
            : <><Bookmark size={14} /> Save Interest</>}
        </button>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
//  PLATFORM JOURNEY (roadmap flow diagram)
// ═══════════════════════════════════════════════
function PlatformJourney({ platform, journey, onOpenProgram }) {
  const byId = Object.fromEntries(platform.programs.map((p) => [p.id, p]));
  const totalWeeks = getTotalWeeks(platform.programs);
  const modeLabel = { parallel: "Learn in parallel", sequence: "In order", single: "One program" };

  return (
    <section className="ilmora-journey" aria-label={`${platform.name} learning journey`}>
      <div className="ilmora-journey-head">
        <h3 className="ilmora-journey-title">{journey.title}</h3>
        <p className="ilmora-journey-sub">{journey.subtitle}</p>
        <div className="ilmora-journey-stats">
          <span className="ilmora-journey-stat"><Layers size={12} /> {journey.stages.length} Stages</span>
          <span className="ilmora-journey-stat"><BookOpen size={12} /> {platform.programs.length} Programs</span>
          <span className="ilmora-journey-stat"><Activity size={12} /> {totalWeeks} Weeks of content</span>
        </div>
      </div>

      <ol className="ilmora-journey-flow">
        {journey.stages.map((stage, i) => (
          <li className="ilmora-jstage" key={stage.id}>
            <div className="ilmora-jstage-rail">
              <span className="ilmora-jstage-num">{i + 1}</span>
              <span className="ilmora-jstage-line" />
            </div>
            <div className="ilmora-jstage-body">
              <div className="ilmora-jstage-top">
                <h4 className="ilmora-jstage-name">{stage.label}</h4>
                <DifficultyBadge difficulty={stage.level} />
                <span className="ilmora-jstage-mode">{modeLabel[stage.mode]}</span>
              </div>
              <p className="ilmora-jstage-note">{stage.note}</p>
              <div className="ilmora-jstage-progs">
                {stage.programs.map((sp) => {
                  const prog = byId[sp.id];
                  if (!prog) return null;
                  const NodeIcon = prog.Icon;
                  return (
                    <button
                      key={sp.id}
                      className="ilmora-jnode"
                      onClick={() => onOpenProgram(sp.id)}
                    >
                      {sp.tag && <span className="ilmora-jnode-tag">{sp.tag}</span>}
                      <span className="ilmora-jnode-top">
                        <span className="ilmora-jnode-icon"><NodeIcon size={16} /></span>
                        <span className="ilmora-jnode-name">{prog.name}</span>
                      </span>
                      <span className="ilmora-jnode-meta">
                        <Activity size={11} /> {prog.duration} · {prog.difficulty}
                      </span>
                      <span className="ilmora-jnode-open">
                        View syllabus <ChevronRight size={12} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </li>
        ))}

        {journey.capstone && (
          <li className="ilmora-jstage">
            <div className="ilmora-jstage-rail">
              <span className="ilmora-jstage-num capstone"><Rocket size={14} /></span>
            </div>
            <div className="ilmora-jstage-body">
              <div className="ilmora-jcapstone">
                <div className="ilmora-jstage-top">
                  <h4 className="ilmora-jstage-name">{journey.capstone.name}</h4>
                  <span className="ilmora-jsoon">{journey.capstone.status}</span>
                </div>
                <p>{journey.capstone.description}</p>
              </div>
            </div>
          </li>
        )}
      </ol>
    </section>
  );
}

// Program detail ke andar: "Your Journey" block
function ProgramJourneyInfo({ prog, platform, onOpenProgram }) {
  const info = PROGRAM_JOURNEY[prog.id];
  if (!info) return null;
  const byId = Object.fromEntries(platform.programs.map((p) => [p.id, p]));
  const requires = info.requires.map((id) => byId[id]).filter(Boolean);
  const next = info.next.map((id) => byId[id]).filter(Boolean);

  return (
    <div className="ilmora-pj">
      <div className="ilmora-detail-section-title" style={{ marginBottom: 12 }}>
        <Layers size={15} /> Your Journey
      </div>
      <div className="ilmora-pj-row">
        <span className="ilmora-pj-label">Stage</span>
        <span className="ilmora-pj-stage">{info.stage}</span>
      </div>
      <div className="ilmora-pj-row">
        <span className="ilmora-pj-label">Before this</span>
        {requires.length === 0 ? (
          <span className="ilmora-pj-chip soft">No prerequisite, start here</span>
        ) : (
          requires.map((r) => (
            <button key={r.id} className="ilmora-pj-chip" onClick={() => onOpenProgram(r.id)}>
              <ChevronLeft size={12} /> {r.name}
            </button>
          ))
        )}
      </div>
      <div className="ilmora-pj-row">
        <span className="ilmora-pj-label">Next up</span>
        {next.map((n) => (
          <button key={n.id} className="ilmora-pj-chip" onClick={() => onOpenProgram(n.id)}>
            {n.name} <ChevronRight size={12} />
          </button>
        ))}
        {info.capstone && (
          <span className="ilmora-pj-chip soft"><Rocket size={12} /> Capstone Project (coming soon)</span>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
//  WHY CHOOSE
// ═══════════════════════════════════════════════
function WhyChoose() {
  const cards = [
    { Icon: Target,        title: "Industry-Aligned Curriculum",  text: "Every program is crafted with input from working engineers and industry leaders to reflect what employers actually need today." },
    { Icon: GraduationCap, title: "Expert Mentors",               text: "Learn directly from seasoned professionals with years of real-world experience across development, AI, cloud, and CX platforms." },
    { Icon: Layers,        title: "Project-Based Learning",       text: "Build portfolio-ready projects from day one. Every module ends with a hands-on deliverable you can showcase to future employers." },
    { Icon: Rocket,        title: "Fast-Track Career Growth",     text: "Structured paths move you from beginner to job-ready efficiently — with clear milestones and real measurable outcomes." },
    { Icon: Bot,           title: "AI & Cloud Ready",             text: "Future-proof your skills with dedicated tracks for cloud platforms, DevOps, generative AI, data science, and agent automation." },
    { Icon: Handshake,     title: "Supportive Community",         text: "Join a thriving network of learners, alumni, and mentors. Collaborate, get feedback, and grow together beyond the classroom." },
  ];
  return (
    <section className="ilmora-why-section" id="why-choose">
      <div className="ilmora-section-wrap">
        <div className="ilmora-section-header">
          <div className="ilmora-section-tag"><Star size={12} /> Why ILM ORA</div>
          <h2>Why Choose These Platforms</h2>
          <p>We combine expert mentorship with real-world projects so you graduate with skills employers trust.</p>
        </div>
        <div className="ilmora-discussion-strip">
          <div className="ilmora-discussion-video-wrap">
            <video src={discussionVideo} autoPlay loop muted playsInline preload="auto" />
          </div>
          <div className="ilmora-discussion-text">
            <h3>Learn Together,<br /><span>Grow Together</span></h3>
            <p>
              Our programs are built around collaborative learning. You'll work with peers,
              get mentor feedback, and tackle real-world problems as a team — just like in
              a professional environment.
            </p>
            <div className="ilmora-discussion-pills">
              <span className="ilmora-dpill"><Users size={12} /> Peer Learning</span>
              <span className="ilmora-dpill"><GraduationCap size={12} /> Mentor Guidance</span>
              <span className="ilmora-dpill"><Star size={12} /> Real Projects</span>
              <span className="ilmora-dpill"><Briefcase size={12} /> Job Ready</span>
            </div>
          </div>
        </div>
        <div className="ilmora-why-grid">
          {cards.map((c) => {
            const CardIcon = c.Icon;
            return (
              <article key={c.title} className="ilmora-why-card">
                <div className="ilmora-why-icon"><CardIcon size={22} /></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════
//  TOAST CONTAINER
// ═══════════════════════════════════════════════
function ToastContainer({ toasts }) {
  return (
    <div className="ilmora-toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="ilmora-toast">
          <span className="ilmora-toast-dot" />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════
//  MAIN EXPORT
// ═══════════════════════════════════════════════
export default function Platforms({ theme, toggleTheme, setShowLoginModal, scrollToSection }) {
  useInjectStyles();

  const darkMode = theme === "dark";

    // URL (?platform=dev | ai | cx) se selected platform padho
  const [searchParams] = useSearchParams();
  const platformFromUrl = searchParams.get("platform");
  const isValidPlatform = (id) => platformData.some((p) => p.id === id);

  const [activePlatformId, setActivePlatformId] = useState(
    isValidPlatform(platformFromUrl) ? platformFromUrl : "dev"
  );
  const [activeFilter, setActiveFilter]         = useState("all");
  const [activeRole, setActiveRole]             = useState("all");
  const [searchQuery, setSearchQuery]           = useState("");
  // ✅ Inline detail: id of the program currently open INSIDE the panel (null = show grid)
  const [activeProgramId, setActiveProgramId]   = useState(null);
  const [savedInterests, setSavedInterests]     = useState(new Set());
  const [fading, setFading]                     = useState(false);
  const [panelView, setPanelView]               = useState("journey"); // "journey" | "programs"
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { toasts, showToast }                   = useToasts();
  const platformsSectionRef                     = useRef(null);
  const panelRef                                = useRef(null);
  const firstRender                             = useRef(true);

   // Reset scroll on mount (fixes back-nav scroll position)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // ✅ Navbar dropdown se URL badalte hi platform turant switch ho
  useEffect(() => {
    if (!platformFromUrl || !isValidPlatform(platformFromUrl)) return;
    setActivePlatformId(platformFromUrl);
    setActiveProgramId(null);
    setActiveFilter("all");
    setActiveRole("all");
    setSearchQuery("");
    setSidebarCollapsed(false);
    setPanelView("journey");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platformFromUrl]);

  // When a program opens / closes, bring the panel top into view (important on phones & tablets)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeProgramId]);

  // Escape key = go back to program list
  useEffect(() => {
    if (!activeProgramId) return;
    const handler = (e) => { if (e.key === "Escape") setActiveProgramId(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [activeProgramId]);

  const activePlatform = platformData.find((p) => p.id === activePlatformId);

  const filteredPrograms = (() => {
    let programs = getOrderedPrograms(activePlatform);
    if (activeFilter === "popular")
      programs = programs.filter((p) => p.popular);
    else if (activeFilter === "beginner")
      programs = programs.filter((p) => p.beginnerFriendly);
    if (activeRole !== "all")
      programs = programs.filter((p) =>
        getProgramRoles(p.id).some((r) => r.id === activeRole)
      );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      programs = programs.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tools.some((t) => t.toLowerCase().includes(q)) ||
          p.syllabus.some((s) => s.toLowerCase().includes(q)) ||
          p.careerOutcome.toLowerCase().includes(q) ||
          p.whoIsFor.toLowerCase().includes(q)
      );
    }
    return programs;
  })();

  const handleSetPlatform = (id) => {
    if (id === activePlatformId) {
      setSidebarCollapsed((prev) => !prev);
      return;
    }
    setSidebarCollapsed(false);
    setFading(true);
    setTimeout(() => {
      setActivePlatformId(id);
      setActiveProgramId(null); // close any open detail when platform changes
      setActiveFilter("all");
      setActiveRole("all");
      setSearchQuery("");
      setPanelView("journey");
      setFading(false);
      showToast(`${platformData.find((p) => p.id === id).name} selected`);
    }, 160);
  };

  const handleSetFilter = (f) => {
    setFading(true);
    setTimeout(() => { setActiveFilter(f); setFading(false); }, 160);
  };

  const handleSetRole = (r) => {
    setFading(true);
    setTimeout(() => { setActiveRole(r); setFading(false); }, 160);
  };

  const handleSaveInterest = (progId, progName) => {
    if (savedInterests.has(progId)) {
      showToast(`Already saved: ${progName}`);
      return;
    }
    setSavedInterests((prev) => new Set([...prev, progId]));
    showToast(`Interest saved for ${progName}`);
  };

  // Open program INSIDE the page (no modal)
  const openProgram = (progId) => {
    const result = findProgramById(progId);
    if (!result) return;
    if (result.platform.id !== activePlatformId) setActivePlatformId(result.platform.id);
    setActiveProgramId(progId);
  };

  const closeProgram = () => setActiveProgramId(null);

  const scrollToPlatforms = () =>
    platformsSectionRef.current?.scrollIntoView({ behavior: "smooth" });

  const ActivePlatformIcon = activePlatform.Icon;
  const journey = getJourney(activePlatformId);
  const showJourney = !!journey && panelView === "journey";
  const openedProgram = activeProgramId
    ? activePlatform.programs.find((p) => p.id === activeProgramId)
    : null;

  return (
    <PublicLayout
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
      scrollToSection={scrollToSection}
    >
      <div className="ilm-plat" data-theme={darkMode ? "dark" : undefined}>
        <Hero onExplore={scrollToPlatforms} />

        <section id="platforms" className="ilmora-platforms-section" ref={platformsSectionRef}>
          <div className="ilmora-section-wrap">
            <div className="ilmora-section-header">
              <div className="ilmora-section-tag">
                <BookOpen size={12} /> All Platforms
              </div>
              <h2>Choose Your Learning Platform</h2>
              <p>Select a platform to explore its programs and structured learning paths.</p>
            </div>

            <div className="ilmora-layout">
              <PlatformSidebar
                platforms={platformData}
                activePlatformId={activePlatformId}
                activeProgramId={activeProgramId}
                onSelect={handleSetPlatform}
                onOpenProgram={openProgram}
                collapsed={sidebarCollapsed}
              />

              <div className="ilmora-programs-panel" ref={panelRef}>
                {openedProgram ? (
                  /* ───── INLINE DETAIL VIEW ───── */
                  <ProgramDetail
                    key={openedProgram.id}
                    prog={openedProgram}
                    platform={activePlatform}
                    savedInterests={savedInterests}
                    onBack={closeProgram}
                    onSave={handleSaveInterest}
                    onOpenProgram={openProgram}
                  />
                ) : (
                  /* ───── LIST VIEW ───── */
                  <>
                    <div className="ilmora-panel-top">
                      <div className="ilmora-panel-title-row">
                        <div className="ilmora-panel-icon-name">
                          <div className="ilmora-panel-icon">
                            <ActivePlatformIcon size={22} />
                          </div>
                          <div className="ilmora-panel-title">{activePlatform.name}</div>
                        </div>
                        <div className="ilmora-panel-badge">
                          {activePlatform.programs.length} Programs
                        </div>
                      </div>
                      <div className="ilmora-panel-desc">{activePlatform.description}</div>
                      {journey && (
                        <div className="ilmora-view-tabs" role="tablist" aria-label="Panel view">
                          <button
                            role="tab"
                            aria-selected={panelView === "journey"}
                            className={`ilmora-view-tab ${panelView === "journey" ? "active" : ""}`}
                            onClick={() => setPanelView("journey")}
                          >
                            <Layers size={14} /> Journey
                          </button>
                          <button
                            role="tab"
                            aria-selected={panelView === "programs"}
                            className={`ilmora-view-tab ${panelView === "programs" ? "active" : ""}`}
                            onClick={() => setPanelView("programs")}
                          >
                            <BookOpen size={14} /> All Programs
                          </button>
                        </div>
                      )}
                      {!showJourney && (
                      <div className="ilmora-panel-controls">
                        <div className="ilmora-panel-search-wrap">
                          <span className="ilmora-search-icon"><Search size={15} /></span>
                          <input
                            className="ilmora-panel-search"
                            type="text"
                            placeholder="Search programs, tools, topics…"
                            autoComplete="off"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="ilmora-filter-btns">
                          {["all", "popular", "beginner"].map((f) => (
                            <button
                              key={f}
                              className={`ilmora-filter-btn ${activeFilter === f ? "active" : ""}`}
                              onClick={() => handleSetFilter(f)}
                            >
                              {f === "all" ? "All" : f === "popular" ? "Popular" : "Beginner Friendly"}
                            </button>
                          ))}
                        </div>
                      </div>
                      )}
                    </div>

                    {showJourney ? (
                      <PlatformJourney
                        platform={activePlatform}
                        journey={journey}
                        onOpenProgram={openProgram}
                      />
                    ) : (
                    <>
                    <div className="ilmora-role-bar">
                      <span className="ilmora-role-bar-label">Role:</span>
                      <button
                        className={`ilmora-role-chip ${activeRole === "all" ? "active" : ""}`}
                        onClick={() => handleSetRole("all")}
                      >
                        All Roles
                      </button>
                      {ROLES.filter((r) =>
                        activePlatform.programs.some((p) =>
                          getProgramRoles(p.id).some((pr) => pr.id === r.id)
                        )
                      ).map((r) => {
                        const RIcon = r.Icon;
                        return (
                          <button
                            key={r.id}
                            className={`ilmora-role-chip ${activeRole === r.id ? "active" : ""}`}
                            onClick={() => handleSetRole(r.id)}
                          >
                            <RIcon size={13} /> {r.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className={`ilmora-programs-grid ${fading ? "fading" : ""}`}>
                      {filteredPrograms.length === 0 ? (
                        <div className="ilmora-empty-state">
                          <div className="empty-icon"><Search size={48} /></div>
                          <h3>No programs found</h3>
                          <p>Try another keyword.</p>
                        </div>
                      ) : (
                        filteredPrograms.map((prog) => (
                          <ProgramCard
                            key={prog.id}
                            prog={prog}
                            savedInterests={savedInterests}
                            onSyllabus={openProgram}
                            onSave={handleSaveInterest}
                          />
                        ))
                      )}
                    </div>
                    </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        <WhyChoose />

        <ToastContainer toasts={toasts} />
      </div>
    </PublicLayout>
  );
}














































