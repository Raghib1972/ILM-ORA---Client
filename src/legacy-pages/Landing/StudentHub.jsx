// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Sparkles,
//   Video, BrainCircuit, ListChecks, Code2, ClipboardCheck, MessageCircle,
//   BookOpen, Award, FileText, PlayCircle, Library, FolderOpen,
//   CheckCircle2, ArrowRight, Lock, BarChart3, Play, Download,
//   Calendar, Star, ChevronRight, Zap, Flame, Trophy, Clock,
//   Podcast, Users, TrendingUp, BookMarked, LayoutDashboard
// } from "lucide-react";
// import PublicLayout from "../Landing/components/PublicLayout";
// import authService from "../../services/authService";
// import { registerFcmToken } from "../../services/firebaseService";
// // ─── GLOBAL RESPONSIVE STYLE INJECTION ───────────────────────────────────────
// const GLOBAL_STYLES = `
//   *, *::before, *::after { box-sizing: border-box; }
//   html, body { overflow-x: hidden; width: 100%; }

//   /* Navbar responsive */
//   .sh-desktop-nav { display: flex !important; }
//   .sh-mobile-btn  { display: none !important; }
//   @media (max-width: 900px) {
//     .sh-desktop-nav { display: none !important; }
//     .sh-mobile-btn  { display: flex !important; }
//   }

//   /* Hero grid */
//   .sh-hero-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 64px;
//     align-items: center;
//   }
//   @media (max-width: 900px) {
//     .sh-hero-grid { grid-template-columns: 1fr; gap: 40px; }
//   }

//   /* Skill mapping grid */
//   .sh-skill-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 64px;
//     align-items: center;
//   }
//   @media (max-width: 860px) {
//     .sh-skill-grid { grid-template-columns: 1fr; gap: 40px; }
//   }

//   /* Generic card grid */
//   .sh-card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//     gap: 22px;
//   }
//   .sh-card-grid-sm {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//     gap: 20px;
//   }
//   .sh-cert-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//     gap: 22px;
//     max-width: 800px;
//     margin: 0 auto;
//   }

//   /* Hero buttons */
//   .sh-hero-btns {
//     display: flex;
//     gap: 14px;
//     flex-wrap: wrap;
//   }
//   @media (max-width: 480px) {
//     .sh-hero-btns { flex-direction: column; }
//     .sh-hero-btns button { width: 100%; justify-content: center; }
//   }

//   /* CTA buttons */
//   .sh-cta-btns {
//     display: flex;
//     gap: 12px;
//     justify-content: center;
//     flex-wrap: wrap;
//   }
//   @media (max-width: 480px) {
//     .sh-cta-btns { flex-direction: column; align-items: stretch; }
//     .sh-cta-btns button { width: 100%; justify-content: center; }
//   }

//   /* Hero stats row */
//   .sh-hero-stats {
//     display: flex;
//     gap: 32px;
//     margin-top: 48px;
//     flex-wrap: wrap;
//   }

//   /* Hero dashboard card inner grid */
//   .sh-dash-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 12px;
//   }
//   @media (max-width: 480px) {
//     .sh-dash-grid { grid-template-columns: 1fr; }
//   }

//   /* Roadmap container */
//   .sh-roadmap-item {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     position: relative;
//   }
//   @media (max-width: 480px) {
//     .sh-roadmap-item { gap: 12px; }
//   }

//   /* Section padding */
//   .sh-section { padding: clamp(48px, 8vw, 80px) 0; }
//   .sh-inner { max-width: 1200px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 24px); }

//   /* Section heading */
//   .sh-section-h2 {
//     font-family: 'Space Grotesk', sans-serif;
//     font-size: clamp(24px, 4vw, 40px);
//     font-weight: 700;
//     line-height: 1.15;
//     letter-spacing: -0.03em;
//   }

//   /* Prevent long strings from overflowing cards */
//   .sh-card { word-break: break-word; overflow-wrap: break-word; }

//   @keyframes shPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
// `;

// // ─── DATA ────────────────────────────────────────────────────────────────────

// const FEATURES = [
//   { color: "#F97316", title: "Live Sessions",         desc: "Join real-time classes with industry trainers. Ask questions, collaborate and learn live.",        icon: <Video size={22} /> },
//   { color: "#3b82f6", title: "Skill Mapping",         desc: "AI-driven skill gap analysis to identify your strengths and areas for improvement.",              icon: <BrainCircuit size={22} /> },
//   { color: "#8b5cf6", title: "Study Plan",            desc: "Personalized weekly study roadmap tailored to your learning goals and pace.",                      icon: <ListChecks size={22} /> },
//   { color: "#22c55e", title: "Coding Lab",            desc: "Practice DSA, system design and real-world problems in an in-browser IDE.",                       icon: <Code2 size={22} /> },
//   { color: "#f59e0b", title: "Assessments & Quizzes", desc: "Structured quizzes and mock tests to evaluate and reinforce your knowledge.",                     icon: <ClipboardCheck size={22} /> },
//   { color: "#ec4899", title: "Trainer Chat",          desc: "Direct messaging with your assigned trainer for doubt resolution anytime.",                       icon: <MessageCircle size={22} /> },
//   { color: "#14b8a6", title: "Learning Resources",    desc: "Curated PDFs, notes, recorded lectures, and reference materials at your fingertips.",             icon: <Library size={22} /> },
//   { color: "#f97316", title: "Certificates",          desc: "Earn verifiable certificates upon course completion to showcase your skills.",                    icon: <Award size={22} /> },
// ];

// const COURSES = [
//   { title: "Java Backend Engineering", progress: 75, color: "#f97316", tag: "Backend",  thumb: "☕" },
//   { title: "React Development",        progress: 45, color: "#3b82f6", tag: "Frontend", thumb: "⚛️" },
//   { title: "AWS Fundamentals",         progress: 30, color: "#f59e0b", tag: "Cloud",    thumb: "☁️" },
// ];

// const ROADMAP = [
//   { week: "Week 1", topic: "Java Basics",   status: "done"    },
//   { week: "Week 2", topic: "OOP Concepts",  status: "done"    },
//   { week: "Week 3", topic: "Collections",   status: "current" },
//   { week: "Week 4", topic: "Spring Boot",   status: "locked"  },
//   { week: "Week 5", topic: "Microservices", status: "locked"  },
// ];

// const LIVE = [
//   { title: "Java Backend Masterclass", time: "Today • 6:00 PM",    trainer: "Rahul S.",  avatar: "RS", live: true,  color: "#ef4444" },
//   { title: "React Workshop",           time: "Tomorrow • 7:00 PM", trainer: "Priya M.",  avatar: "PM", live: false, color: "#3b82f6" },
//   { title: "System Design Bootcamp",   time: "Wed • 5:00 PM",      trainer: "Arjun K.",  avatar: "AK", live: false, color: "#8b5cf6" },
// ];

// const SKILLS = [
//   { name: "Java",  pct: 80, color: "#f97316" },
//   { name: "SQL",   pct: 70, color: "#3b82f6" },
//   { name: "React", pct: 60, color: "#8b5cf6" },
//   { name: "AWS",   pct: 40, color: "#22c55e" },
// ];

// const QUIZZES = [
//   { title: "Java Quiz",        questions: 20, status: "pending",   score: null, color: "#F97316" },
//   { title: "React Quiz",       questions: 15, status: "completed", score: 88,   color: "#3b82f6" },
//   { title: "SQL Fundamentals", questions: 25, status: "pending",   score: null, color: "#22c55e" },
// ];

// const TRAINERS = [
//   { name: "Rahul Sharma", role: "Java & Backend Expert", exp: "8 years", initials: "RS", color: "#F97316", rating: 4.9 },
//   { name: "Priya Mehta",  role: "React & Frontend Lead", exp: "6 years", initials: "PM", color: "#3b82f6", rating: 4.8 },
//   { name: "Arjun Kumar",  role: "AWS & DevOps Engineer", exp: "7 years", initials: "AK", color: "#8b5cf6", rating: 4.9 },
// ];

// const RESOURCES = [
//   { color: "#f97316", title: "PDF Notes",        desc: "Detailed topic-wise notes for offline revision.",     tag: "24 Files",     icon: <FileText size={22} /> },
//   { color: "#3b82f6", title: "Recorded Classes", desc: "All past live sessions are available on demand.",     tag: "48 Videos",    icon: <Video size={22} /> },
//   { color: "#8b5cf6", title: "Video Lectures",   desc: "Curated video tutorials for every concept.",          tag: "120 Lectures", icon: <PlayCircle size={22} /> },
//   { color: "#22c55e", title: "Assignments",      desc: "Practice assignments with sample test cases.",        tag: "36 Tasks",     icon: <FolderOpen size={22} /> },
// ];

// const CERTS = [
//   { title: "Java Backend Engineering", date: "May 2025",    grade: "A+", color: "#F97316", status: "earned"  },
//   { title: "React Development",        date: "In Progress", grade: "--", color: "#3b82f6", status: "pending" },
// ];

// const ACTIVITIES = [
//   { iconColor: "#22c55e", icon: <CheckCircle2 size={16} />, text: "Completed Java Quiz",                  sub: "Score: 88% • 2 hours ago" },
//   { iconColor: "#3b82f6", icon: <Video size={16} />,        text: "Joined Live Session — React Workshop", sub: "Duration: 90 mins • Yesterday" },
//   { iconColor: "#F97316", icon: <Download size={16} />,     text: "Downloaded Notes — Spring Boot",       sub: "PDF • 3 days ago" },
//   { iconColor: "#8b5cf6", icon: <FolderOpen size={16} />,   text: "Submitted Assignment — REST APIs",     sub: "Grade Pending • 4 days ago" },
// ];

// // ─── THEME TOKENS ─────────────────────────────────────────────────────────────
// const DARK_THEME = {
//   "--sh-page-bg":    "#0a0a0a",
//   "--sh-card-bg":    "#111111",
//   "--sh-card-hover": "#161616",
//   "--sh-hero-bg":    "#141414",
//   "--sh-section-bg": "#0d0d0d",
//   "--sh-border":     "rgba(255,255,255,0.06)",
//   "--sh-border-hov": "rgba(255,255,255,0.14)",
//   "--sh-text":       "#ffffff",
//   "--sh-text-sub":   "rgba(255,255,255,0.55)",
//   "--sh-text-muted": "rgba(255,255,255,0.3)",
//   "--sh-pill-bg":    "rgba(255,255,255,0.04)",
//   "--sh-icon-bg":    "rgba(255,255,255,0.05)",
//   "--sh-bar-bg":     "rgba(255,255,255,0.06)",
//   "--sh-shadow":     "0 4px 20px rgba(0,0,0,0.4)",
//   "--sh-shadow-hov": "0 16px 48px rgba(0,0,0,0.6)",
// };

// const LIGHT_THEME = {
//   "--sh-page-bg":    "#F8F3EE",
//   "--sh-card-bg":    "#ffffff",
//   "--sh-card-hover": "#fefefe",
//   "--sh-hero-bg":    "#ffffff",
//   "--sh-section-bg": "#f2ece6",
//   "--sh-border":     "#e8e0d8",
//   "--sh-border-hov": "#d4c8be",
//   "--sh-text":       "#1E293B",
//   "--sh-text-sub":   "#64748b",
//   "--sh-text-muted": "#94a3b8",
//   "--sh-pill-bg":    "#f1ede8",
//   "--sh-icon-bg":    "#fdf8f4",
//   "--sh-bar-bg":     "#f1ede8",
//   "--sh-shadow":     "0 2px 12px rgba(0,0,0,0.07)",
//   "--sh-shadow-hov": "0 12px 40px rgba(0,0,0,0.13)",
// };

// // ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
// function ProgressBar({ value, color }) {
//   const [width, setWidth] = useState(0);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setTimeout(() => setWidth(value), 200); },
//       { threshold: 0.3 }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, [value]);

//   return (
//     <div
//       ref={ref}
//       style={{
//         background: "var(--sh-bar-bg)",
//         borderRadius: 99,
//         height: 8,
//         overflow: "hidden",
//         width: "100%",
//       }}
//     >
//       <div
//         style={{
//           height: "100%",
//           borderRadius: 99,
//           width: `${width}%`,
//           background: `linear-gradient(90deg, ${color}, ${color}cc)`,
//           transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
//         }}
//       />
//     </div>
//   );
// }

// // ─── SECTION BADGE ────────────────────────────────────────────────────────────
// function SecBadge({ children }) {
//   return (
//     <div
//       style={{
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 6,
//         background: "rgba(249,115,22,0.08)",
//         border: "1px solid rgba(249,115,22,0.22)",
//         borderRadius: 99,
//         padding: "6px 16px",
//         marginBottom: 16,
//       }}
//     >
//       <Sparkles size={13} color="#F97316" />
//       <span style={{ color: "#F97316", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>
//         {children}
//       </span>
//     </div>
//   );
// }

// // ─── MAIN COMPONENT (renamed: LearningHub → StudentHub) ───────────────────────
// export default function StudentHub({
//   setShowLoginModal,
// }) {
//   const [darkMode, setDarkMode] = useState(() => {
//     try {
//       const saved = localStorage.getItem("theme");
//       if (saved) return saved === "dark";
//       return document.documentElement.classList.contains("dark");
//     } catch { return false; }
//   });

//   const toggleTheme = () => {
//     setDarkMode(prev => {
//       const next = !prev;
//       localStorage.setItem("theme", next ? "dark" : "light");
//       document.documentElement.classList.toggle("dark", next);
//       return next;
//     });
//   };

//   useEffect(() => {
//     const onStorage = (e) => { if (e.key === "theme") setDarkMode(e.newValue === "dark"); };
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, []);

//   const theme = darkMode ? DARK_THEME : LIGHT_THEME;

//   const scrollToSection = (sectionId) => {
//     document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <PublicLayout
//   theme={darkMode ? "dark" : "light"}
//   toggleTheme={toggleTheme}
//   setShowLoginModal={setShowLoginModal}
//   scrollToSection={scrollToSection}
// >
//       <div
//         style={{
//           ...theme,
//           background: "var(--sh-page-bg)",
//           color: "var(--sh-text)",
//           fontFamily: "'Plus Jakarta Sans', sans-serif",
//           minHeight: "100vh",
//           overflowX: "hidden",
//           width: "100%",
//         }}
//       >
//         {/* Inject global responsive styles */}
//         <style>{GLOBAL_STYLES}</style>

//         {/* HERO */}
//         <HeroSection />

//         {/* FEATURES */}
//         <section className="sh-section" style={{ background: "var(--sh-section-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Platform Features</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)", marginBottom: 16 }}>
//                 Everything You Need <span style={{ color: "#F97316" }}>To Learn</span>
//               </h2>
//               <p style={{ color: "var(--sh-text-sub)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
//                 A complete ecosystem designed to take you from beginner to industry-ready professional.
//               </p>
//             </div>
//             <div className="sh-card-grid-sm">
//               {FEATURES.map(f => <FeatureCard key={f.title} f={f} />)}
//             </div>
//           </div>
//         </section>

//         {/* CONTINUE LEARNING */}
//         <section id="courses" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
//           <div className="sh-inner">
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 marginBottom: 40,
//                 flexWrap: "wrap",
//                 gap: 16,
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: 6,
//                     background: "rgba(249,115,22,0.08)",
//                     border: "1px solid rgba(249,115,22,0.22)",
//                     borderRadius: 99,
//                     padding: "6px 16px",
//                     marginBottom: 10,
//                   }}
//                 >
//                   <Flame size={12} color="#F97316" />
//                   <span style={{ color: "#F97316", fontSize: 13, fontWeight: 600 }}>In Progress</span>
//                 </div>
//                 <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>Continue Learning</h2>
//               </div>
//               <button
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 5,
//                   color: "#F97316",
//                   background: "transparent",
//                   border: "1px solid rgba(249,115,22,0.3)",
//                   borderRadius: 10,
//                   padding: "8px 16px",
//                   fontWeight: 600,
//                   fontSize: 13.5,
//                   fontFamily: "'Plus Jakarta Sans', sans-serif",
//                   cursor: "pointer",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 View All <ChevronRight size={15} />
//               </button>
//             </div>
//             <div className="sh-card-grid">
//               {COURSES.map(c => <CourseCard key={c.title} c={c} />)}
//             </div>
//           </div>
//         </section>

//         {/* ROADMAP */}
//         <section className="sh-section" style={{ background: "var(--sh-section-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Your Path</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)", marginBottom: 16 }}>
//                 Study <span style={{ color: "#F97316" }}>Roadmap</span>
//               </h2>
//               <p style={{ color: "var(--sh-text-sub)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
//                 Structured week-by-week learning path to keep you on track.
//               </p>
//             </div>
//             <RoadmapSection />
//           </div>
//         </section>

//         {/* LIVE CLASSES */}
//         <section id="live" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Real-Time Learning</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
//                 Upcoming <span style={{ color: "#F97316" }}>Live Classes</span>
//               </h2>
//             </div>
//             <div className="sh-card-grid">
//               {LIVE.map(sess => <LiveCard key={sess.title} sess={sess} />)}
//             </div>
//           </div>
//         </section>

//         {/* SKILL MAPPING */}
//         <section className="sh-section" style={{ background: "var(--sh-section-bg)" }}>
//           <div className="sh-inner">
//             <div className="sh-skill-grid">
//               <div>
//                 <div
//                   style={{
//                     display: "inline-flex",
//                     alignItems: "center",
//                     gap: 6,
//                     background: "rgba(249,115,22,0.08)",
//                     border: "1px solid rgba(249,115,22,0.22)",
//                     borderRadius: 99,
//                     padding: "6px 16px",
//                     marginBottom: 16,
//                   }}
//                 >
//                   <BrainCircuit size={13} color="#F97316" />
//                   <span style={{ color: "#F97316", fontSize: 13, fontWeight: 600 }}>AI Analysis</span>
//                 </div>
//                 <h2
//                   className="sh-section-h2"
//                   style={{ color: "var(--sh-text)", marginBottom: 14 }}
//                 >
//                   Your <span style={{ color: "#F97316" }}>Skill Map</span>
//                 </h2>
//                 <p style={{ color: "var(--sh-text-sub)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
//                   AI-driven analysis of your skill proficiency based on quizzes, assignments, and coding performance.
//                 </p>
//                 <button
//                   style={{
//                     background: "#F97316",
//                     color: "#fff",
//                     border: "none",
//                     borderRadius: 14,
//                     padding: "12px 22px",
//                     fontWeight: 700,
//                     fontSize: 14.5,
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 8,
//                     cursor: "pointer",
//                     boxShadow: "0 6px 24px rgba(249,115,22,0.35)",
//                     fontFamily: "'Plus Jakarta Sans', sans-serif",
//                   }}
//                 >
//                   <BarChart3 size={16} /> View Full Analysis
//                 </button>
//               </div>
//               <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//                 {SKILLS.map(sk => (
//                   <div key={sk.name}>
//                     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
//                       <span style={{ color: "var(--sh-text)", fontWeight: 600, fontSize: 15 }}>{sk.name}</span>
//                       <span style={{ color: sk.color, fontWeight: 700, fontSize: 15, fontFamily: "'Space Grotesk', sans-serif" }}>{sk.pct}%</span>
//                     </div>
//                     <ProgressBar value={sk.pct} color={sk.color} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CODING LAB */}
//         <section className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Practice Arena</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
//                 Today's <span style={{ color: "#F97316" }}>Coding Challenge</span>
//               </h2>
//             </div>
//             <CodingLab />
//           </div>
//         </section>

//         {/* ASSESSMENTS */}
//         <section className="sh-section" style={{ background: "var(--sh-section-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Test Your Knowledge</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
//                 Assessments <span style={{ color: "#F97316" }}>&amp; Quizzes</span>
//               </h2>
//             </div>
//             <div className="sh-card-grid">
//               {QUIZZES.map(q => <QuizCard key={q.title} q={q} />)}
//             </div>
//           </div>
//         </section>

//         {/* TRAINERS */}
//         <section id="trainers" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Expert Mentors</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)", marginBottom: 16 }}>
//                 Connect With <span style={{ color: "#F97316" }}>Your Trainers</span>
//               </h2>
//               <p style={{ color: "var(--sh-text-sub)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
//                 Get direct access to industry professionals who guide your learning journey.
//               </p>
//             </div>
//             <div className="sh-card-grid">
//               {TRAINERS.map(tr => <TrainerCard key={tr.name} tr={tr} />)}
//             </div>
//           </div>
//         </section>

//         {/* RESOURCES */}
//         <section id="resources" className="sh-section" style={{ background: "var(--sh-section-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Study Material</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)", marginBottom: 16 }}>
//                 Learning <span style={{ color: "#F97316" }}>Resources</span>
//               </h2>
//               <p style={{ color: "var(--sh-text-sub)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
//                 Everything you need to revise, practice and excel.
//               </p>
//             </div>
//             <div className="sh-card-grid-sm">
//               {RESOURCES.map(r => <ResourceCard key={r.title} r={r} />)}
//             </div>
//           </div>
//         </section>

//         {/* CERTIFICATES */}
//         <section className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Achievements</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
//                 Your <span style={{ color: "#F97316" }}>Certificates</span>
//               </h2>
//             </div>
//             <div className="sh-cert-grid">
//               {CERTS.map(c => <CertCard key={c.title} c={c} />)}
//             </div>
//           </div>
//         </section>

//         {/* RECENT ACTIVITY */}
//         <section className="sh-section" style={{ background: "var(--sh-section-bg)" }}>
//           <div className="sh-inner">
//             <div style={{ textAlign: "center", marginBottom: 56 }}>
//               <SecBadge>Timeline</SecBadge>
//               <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
//                 Recent <span style={{ color: "#F97316" }}>Activity</span>
//               </h2>
//             </div>
//             <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
//               {ACTIVITIES.map(a => <ActivityRow key={a.text} a={a} />)}
//             </div>
//           </div>
//         </section>

//         {/* CTA BANNER */}
//         <div
//           style={{
//             padding: "48px 0",
//             background: "linear-gradient(135deg, #1E293B 0%, #0f172a 100%)",
//             position: "relative",
//             overflow: "hidden",
//             textAlign: "center",
//           }}
//         >
//           {/* Decorative blobs */}
//           <div style={{ position: "absolute", top: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(249,115,22,0.1)", filter: "blur(50px)", pointerEvents: "none" }} />
//           <div style={{ position: "absolute", bottom: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(249,115,22,0.07)", filter: "blur(40px)", pointerEvents: "none" }} />

//           <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 clamp(16px,4vw,24px)", position: "relative" }}>
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 6,
//                 background: "rgba(249,115,22,0.08)",
//                 border: "1px solid rgba(249,115,22,0.22)",
//                 borderRadius: 99,
//                 padding: "5px 14px",
//                 marginBottom: 16,
//               }}
//             >
//               <Zap size={13} color="#F97316" />
//               <span style={{ color: "#F97316", fontSize: 12.5, fontWeight: 600 }}>Start Today</span>
//             </div>
//             <h2
//               style={{
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 fontSize: "clamp(24px,4vw,42px)",
//                 fontWeight: 700,
//                 color: "#fff",
//                 lineHeight: 1.15,
//                 letterSpacing: "-0.035em",
//                 margin: "0 0 12px",
//               }}
//             >
//               Ready To Become <span style={{ color: "#F97316" }}>Industry Ready?</span>
//             </h2>
//             <p
//               style={{
//                 color: "rgba(255,255,255,0.45)",
//                 fontSize: 15,
//                 lineHeight: 1.65,
//                 maxWidth: 480,
//                 margin: "0 auto 28px",
//               }}
//             >
//               Join thousands of learners accelerating their careers with ILM ORA's complete learning ecosystem.
//             </p>
//             <div className="sh-cta-btns">
//               <button
//                 style={{
//                   background: "#F97316",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 12,
//                   padding: "12px 26px",
//                   fontWeight: 700,
//                   fontSize: 15,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   cursor: "pointer",
//                   fontFamily: "'Plus Jakarta Sans', sans-serif",
//                 }}
//               >
//                 <Play size={15} fill="white" stroke="none" /> Continue Learning
//               </button>
//               <button
//                 style={{
//                   background: "transparent",
//                   color: "#fff",
//                   border: "1.5px solid rgba(255,255,255,0.18)",
//                   borderRadius: 12,
//                   padding: "12px 26px",
//                   fontWeight: 600,
//                   fontSize: 14.5,
//                   cursor: "pointer",
//                   fontFamily: "'Plus Jakarta Sans', sans-serif",
//                 }}
//               >
//                 Explore Courses
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>
//     </PublicLayout>
//   );
// }

// // ─── HERO SECTION ─────────────────────────────────────────────────────────────
// function HeroSection() {
//   return (
//     <div
//       style={{
//         background: "var(--sh-hero-bg)",
//         padding: "clamp(40px,8vw,64px) 0",
//         borderBottom: "1px solid var(--sh-border)",
//       }}
//     >
//       <div className="sh-inner">
//         <div className="sh-hero-grid">

//           {/* Left — copy */}
//           <div>
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 6,
//                 background: "rgba(249,115,22,0.08)",
//                 border: "1px solid rgba(249,115,22,0.22)",
//                 borderRadius: 99,
//                 padding: "6px 16px",
//                 marginBottom: 20,
//               }}
//             >
//               <Sparkles size={13} color="#F97316" />
//               <span style={{ color: "#F97316", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>
//                 Advanced Learning Ecosystem
//               </span>
//             </div>

//             <h1
//               style={{
//                 fontFamily: "'Space Grotesk', sans-serif",
//                 fontSize: "clamp(32px,5vw,56px)",
//                 fontWeight: 700,
//                 lineHeight: 1.12,
//                 letterSpacing: "-0.035em",
//                 color: "var(--sh-text)",
//                 marginBottom: 20,
//               }}
//             >
//               Accelerate Your <span style={{ color: "#F97316" }}>Learning Journey</span>
//             </h1>

//             <p
//               style={{
//                 color: "var(--sh-text-sub)",
//                 fontSize: "clamp(15px,2vw,17px)",
//                 lineHeight: 1.75,
//                 maxWidth: 480,
//                 marginBottom: 40,
//               }}
//             >
//               Access live sessions, coding labs, assessments, study plans, mentors, and AI-powered learning tools from one place.
//             </p>

//             <div className="sh-hero-btns">
//               <button
//                 style={{
//                   background: "#F97316",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: 14,
//                   padding: "14px 28px",
//                   fontWeight: 700,
//                   fontSize: 15,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   cursor: "pointer",
//                   boxShadow: "0 6px 24px rgba(249,115,22,0.35)",
//                   fontFamily: "'Plus Jakarta Sans', sans-serif",
//                 }}
//               >
//                 <BookOpen size={18} /> Explore Student Hub
//               </button>
//               <button
//                 style={{
//                   background: "transparent",
//                   color: "var(--sh-text)",
//                   border: "1.5px solid var(--sh-border)",
//                   borderRadius: 14,
//                   padding: "14px 28px",
//                   fontWeight: 600,
//                   fontSize: 15,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   cursor: "pointer",
//                   fontFamily: "'Plus Jakarta Sans', sans-serif",
//                 }}
//               >
//                 <Play size={18} fill="currentColor" stroke="none" /> Join Live Session
//               </button>
//             </div>

//             <div className="sh-hero-stats">
//               {[
//                 ["12k+", "Active Learners", <Users size={14} />],
//                 ["200+", "Live Sessions",   <Podcast size={14} />],
//                 ["95%",  "Placement Rate",  <TrendingUp size={14} />],
//               ].map(([num, lbl, icon]) => (
//                 <div key={lbl}>
//                   <div
//                     style={{
//                       fontFamily: "'Space Grotesk', sans-serif",
//                       fontSize: "clamp(20px,3vw,24px)",
//                       fontWeight: 700,
//                       color: "var(--sh-text)",
//                       letterSpacing: "-0.03em",
//                     }}
//                   >
//                     {num}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 13,
//                       color: "var(--sh-text-muted)",
//                       fontWeight: 500,
//                       marginTop: 2,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 4,
//                     }}
//                   >
//                     {icon}{lbl}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right — dashboard card */}
//           <div
//             style={{
//               background: "linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(30,41,59,0.05) 100%)",
//               border: "1px solid var(--sh-border)",
//               borderRadius: 28,
//               padding: "clamp(20px,4vw,32px)",
//               position: "relative",
//               overflow: "hidden",
//               width: "100%",
//               minWidth: 0,
//             }}
//           >
//             {/* Code snippet */}
//             <div
//               style={{
//                 background: "#1e2329",
//                 borderRadius: 16,
//                 padding: "clamp(14px,3vw,20px)",
//                 marginBottom: 16,
//                 fontFamily: "'JetBrains Mono', monospace",
//                 fontSize: "clamp(11px,1.5vw,13px)",
//                 lineHeight: 1.7,
//                 overflowX: "auto",
//               }}
//             >
//               <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
//                 {["#ff5f57", "#ffbd2e", "#28c840"].map(c => (
//                   <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
//                 ))}
//               </div>
//               <div><span style={{ color: "#ff7b72" }}>class</span> <span style={{ color: "#79c0ff" }}>LearningPath</span> {"{"}</div>
//               <div style={{ paddingLeft: 16 }}><span style={{ color: "#ff7b72" }}>def</span> <span style={{ color: "#d2a8ff" }}>accelerate</span>(self):</div>
//               <div style={{ paddingLeft: 32 }}><span style={{ color: "#a5d6ff" }}>"Master skills fast"</span></div>
//               <div style={{ paddingLeft: 16, color: "#3fb950" }}>return <span style={{ color: "#a5d6ff" }}>Success()</span></div>
//               <div>{"}"}</div>
//             </div>

//             {/* Mini stat cards */}
//             <div className="sh-dash-grid">
//               {[
//                 { icon: <Video size={16} color="#F97316" />,      lbl: "Live Class",  val: "Starting soon" },
//                 { icon: <Trophy size={16} color="#22c55e" />,     lbl: "Quiz Score",  val: "92/100"        },
//                 { icon: <TrendingUp size={16} color="#3b82f6" />, lbl: "Progress",    val: "75% done"      },
//                 { icon: <Award size={16} color="#a855f7" />,      lbl: "Certificate", val: "1 earned"      },
//               ].map(m => (
//                 <div
//                   key={m.lbl}
//                   style={{
//                     background: "var(--sh-card-bg)",
//                     border: "1px solid var(--sh-border)",
//                     borderRadius: 12,
//                     padding: "12px 14px",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 10,
//                     minWidth: 0,
//                   }}
//                 >
//                   <div
//                     style={{
//                       background: "var(--sh-icon-bg)",
//                       border: "1px solid var(--sh-border)",
//                       borderRadius: 8,
//                       padding: 7,
//                       display: "flex",
//                       flexShrink: 0,
//                     }}
//                   >
//                     {m.icon}
//                   </div>
//                   <div style={{ minWidth: 0 }}>
//                     <div style={{ fontSize: 11, color: "var(--sh-text-muted)", fontWeight: 500, whiteSpace: "nowrap" }}>{m.lbl}</div>
//                     <div style={{ fontSize: 13, color: "var(--sh-text)", fontWeight: 700, whiteSpace: "nowrap" }}>{m.val}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Decorative ring */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: -40, right: -40,
//                 width: 160, height: 160,
//                 borderRadius: "50%",
//                 border: "2px solid rgba(249,115,22,0.15)",
//                 pointerEvents: "none",
//               }}
//             />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── CARD COMPONENTS ──────────────────────────────────────────────────────────
// function FeatureCard({ f }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       className="sh-card"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: hovered
//           ? `linear-gradient(145deg,${f.color}18 0%,var(--sh-card-bg) 60%)`
//           : `linear-gradient(145deg,${f.color}0d 0%,var(--sh-card-bg) 55%)`,
//         border: `1.5px solid ${hovered ? f.color + "60" : f.color + "28"}`,
//         borderTop: `3px solid ${f.color}`,
//         borderRadius: 18,
//         padding: "26px 24px",
//         boxShadow: hovered ? `0 12px 36px ${f.color}28` : `0 2px 12px ${f.color}12`,
//         transform: hovered ? "translateY(-5px)" : "none",
//         transition: "all 0.25s",
//         cursor: "pointer",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <div
//         style={{
//           position: "absolute", top: -20, right: -20,
//           width: 80, height: 80,
//           borderRadius: "50%",
//           background: `${f.color}14`,
//           filter: "blur(20px)",
//           pointerEvents: "none",
//           opacity: hovered ? 1 : 0.5,
//           transition: "opacity 0.3s",
//         }}
//       />
//       <div
//         style={{
//           width: 52, height: 52,
//           borderRadius: 14,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           marginBottom: 16,
//           background: `linear-gradient(135deg,${f.color}28,${f.color}14)`,
//           border: `1.5px solid ${f.color}40`,
//           color: f.color,
//           boxShadow: `0 4px 14px ${f.color}22`,
//           flexShrink: 0,
//         }}
//       >
//         {f.icon}
//       </div>
//       <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: f.color, marginBottom: 8, letterSpacing: "-0.02em" }}>{f.title}</h3>
//       <p style={{ fontSize: 13.5, color: "var(--sh-text-sub)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
//     </div>
//   );
// }

// function CourseCard({ c }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       className="sh-card"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "var(--sh-card-bg)",
//         border: `1px solid ${hovered ? c.color + "40" : "var(--sh-border)"}`,
//         borderRadius: 18,
//         overflow: "hidden",
//         boxShadow: hovered ? `0 10px 36px ${c.color}18` : "var(--sh-shadow)",
//         transform: hovered ? "translateY(-3px)" : "none",
//         transition: "all 0.25s",
//       }}
//     >
//       <div
//         style={{
//           height: 120,
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 52,
//           background: `linear-gradient(135deg,${c.color}18,${c.color}08)`,
//         }}
//       >
//         {c.thumb}
//       </div>
//       <div style={{ padding: "20px 22px 24px" }}>
//         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
//           <span style={{ background: `${c.color}18`, color: c.color, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{c.tag}</span>
//           <span style={{ color: c.color, fontWeight: 700, fontSize: 15, fontFamily: "'Space Grotesk', sans-serif" }}>{c.progress}%</span>
//         </div>
//         <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16.5, fontWeight: 600, color: "var(--sh-text)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>{c.title}</h3>
//         <ProgressBar value={c.progress} color={c.color} />
//         <button
//           style={{
//             width: "100%", marginTop: 18,
//             background: c.color, color: "#fff",
//             border: "none", borderRadius: 12, padding: 11,
//             fontWeight: 700, fontSize: 14, cursor: "pointer",
//             display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
//             fontFamily: "'Plus Jakarta Sans', sans-serif",
//           }}
//         >
//           <Play size={15} fill="white" stroke="none" /> Continue
//         </button>
//       </div>
//     </div>
//   );
// }

// function RoadmapSection() {
//   return (
//     <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
//       {/* Vertical connector line */}
//       <div
//         style={{
//           position: "absolute",
//           left: 23, top: 24, bottom: 24,
//           width: 2,
//           background: "linear-gradient(to bottom, #F97316, var(--sh-border))",
//           pointerEvents: "none",
//         }}
//       />
//       <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//         {ROADMAP.map(r => {
//           const done   = r.status === "done";
//           const cur    = r.status === "current";
//           const locked = r.status === "locked";

//           const dotBg     = done ? "#F97316" : cur ? "rgba(249,115,22,0.12)" : "var(--sh-icon-bg)";
//           const dotBorder = done || cur ? "#F97316" : "var(--sh-border)";
//           const dotShadow = done ? "0 0 0 4px rgba(249,115,22,0.18)" : cur ? "0 0 0 6px rgba(249,115,22,0.1)" : "none";
//           const statusLabel = done ? "✓ Done" : cur ? "→ Active" : "🔒 Locked";
//           const statusStyle = done
//             ? { background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }
//             : cur
//             ? { background: "rgba(249,115,22,0.12)", color: "#F97316", border: "1px solid rgba(249,115,22,0.25)" }
//             : { background: "var(--sh-pill-bg)", color: "var(--sh-text-muted)", border: "1px solid var(--sh-border)" };

//           return (
//             <div key={r.topic} className="sh-roadmap-item">
//               {/* Dot */}
//               <div
//                 style={{
//                   width: 48, height: 48,
//                   borderRadius: "50%",
//                   flexShrink: 0,
//                   zIndex: 1,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   background: dotBg,
//                   border: `2px solid ${dotBorder}`,
//                   boxShadow: dotShadow,
//                 }}
//               >
//                 {done   ? <CheckCircle2 size={20} color="white" />              : null}
//                 {cur    ? <ArrowRight size={20} color="#F97316" />               : null}
//                 {locked ? <Lock size={16} color="var(--sh-text-muted)" />       : null}
//               </div>

//               {/* Card */}
//               <div
//                 style={{
//                   flex: 1,
//                   background: "var(--sh-card-bg)",
//                   border: `1px solid ${cur ? "rgba(249,115,22,0.35)" : "var(--sh-border)"}`,
//                   borderRadius: 14,
//                   padding: "16px 20px",
//                   boxShadow: cur ? "0 4px 20px rgba(249,115,22,0.15)" : "var(--sh-shadow)",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   flexWrap: "wrap",
//                   gap: 10,
//                   opacity: locked ? 0.55 : 1,
//                   minWidth: 0,
//                 }}
//               >
//                 <div style={{ minWidth: 0 }}>
//                   <div style={{ fontSize: 11, color: "var(--sh-text-muted)", fontWeight: 600, marginBottom: 3, letterSpacing: "0.04em", textTransform: "uppercase" }}>{r.week}</div>
//                   <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: "var(--sh-text)", letterSpacing: "-0.02em" }}>{r.topic}</div>
//                 </div>
//                 <div style={{ ...statusStyle, borderRadius: 99, padding: "4px 12px", fontSize: 11.5, fontWeight: 700, flexShrink: 0 }}>
//                   {statusLabel}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function LiveCard({ sess }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       className="sh-card"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "var(--sh-card-bg)",
//         border: `1px solid ${hovered ? sess.color + "40" : "var(--sh-border)"}`,
//         borderRadius: 18,
//         padding: 24,
//         boxShadow: hovered ? `0 10px 32px ${sess.color}18` : "var(--sh-shadow)",
//         transform: hovered ? "translateY(-3px)" : "none",
//         transition: "all 0.25s",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
//         <div
//           style={{
//             width: 48, height: 48,
//             borderRadius: "50%",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontWeight: 800, fontSize: 14,
//             flexShrink: 0,
//             fontFamily: "'Space Grotesk', sans-serif",
//             background: `${sess.color}20`,
//             border: `2px solid ${sess.color}40`,
//             color: sess.color,
//           }}
//         >
//           {sess.avatar}
//         </div>
//         <div style={{ flex: 1, minWidth: 0 }}>
//           {sess.live && (
//             <div
//               style={{
//                 background: "rgba(239,68,68,0.12)",
//                 color: "#ef4444",
//                 fontSize: 10.5, fontWeight: 700,
//                 padding: "2px 8px",
//                 borderRadius: 99,
//                 display: "inline-flex", alignItems: "center", gap: 4,
//                 marginBottom: 5,
//               }}
//             >
//               <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "shPulse 1.4s infinite", display: "inline-block" }} />
//               LIVE
//             </div>
//           )}
//           <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: "var(--sh-text)", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{sess.title}</h3>
//           <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--sh-text-muted)", fontSize: 13 }}>
//             <Calendar size={13} /> {sess.time}
//           </div>
//           <div style={{ fontSize: 12, color: "var(--sh-text-sub)", marginTop: 4 }}>Trainer: {sess.trainer}</div>
//         </div>
//       </div>
//       <button
//         style={{
//           width: "100%", marginTop: 18,
//           background: sess.live ? "#ef4444" : sess.color,
//           color: "#fff",
//           border: "none", borderRadius: 12, padding: 11,
//           fontWeight: 700, fontSize: 14, cursor: "pointer",
//           display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
//           fontFamily: "'Plus Jakarta Sans', sans-serif",
//         }}
//       >
//         <Play size={15} fill="white" stroke="none" /> {sess.live ? "Join Now" : "Set Reminder"}
//       </button>
//     </div>
//   );
// }

// function QuizCard({ q }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       className="sh-card"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "var(--sh-card-bg)",
//         border: `1px solid ${hovered ? q.color + "40" : "var(--sh-border)"}`,
//         borderRadius: 18,
//         padding: 24,
//         boxShadow: hovered ? `0 8px 28px ${q.color}18` : "var(--sh-shadow)",
//         transform: hovered ? "translateY(-3px)" : "none",
//         transition: "all 0.25s",
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
//         <div style={{ background: `${q.color}18`, border: `1px solid ${q.color}28`, borderRadius: 10, padding: 10, display: "flex", color: q.color }}>
//           <ClipboardCheck size={20} />
//         </div>
//         {q.status === "completed"
//           ? <span style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 8, padding: "4px 10px", fontSize: 11.5, fontWeight: 700 }}>✓ Done</span>
//           : <span style={{ background: "var(--sh-pill-bg)", color: "var(--sh-text-muted)", border: "1px solid var(--sh-border)", borderRadius: 8, padding: "4px 10px", fontSize: 11.5, fontWeight: 600 }}>Pending</span>
//         }
//       </div>
//       <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 600, color: "var(--sh-text)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{q.title}</h3>
//       <p style={{ fontSize: 13, color: "var(--sh-text-sub)", margin: "0 0 16px" }}>{q.questions} Questions</p>
//       {q.score !== null && (
//         <div style={{ background: `${q.color}12`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <span style={{ fontSize: 13, color: "var(--sh-text-sub)" }}>Your Score</span>
//           <span style={{ fontSize: 18, fontWeight: 700, color: q.color, fontFamily: "'Space Grotesk', sans-serif" }}>{q.score}%</span>
//         </div>
//       )}
//       <button
//         style={{
//           width: "100%",
//           background: q.status === "completed" ? "transparent" : q.color,
//           color: q.status === "completed" ? q.color : "#fff",
//           border: `1.5px solid ${q.color}`,
//           borderRadius: 11, padding: 10,
//           fontWeight: 700, fontSize: 14, cursor: "pointer",
//           fontFamily: "'Plus Jakarta Sans', sans-serif",
//         }}
//       >
//         {q.status === "completed" ? "Retake Quiz" : "Attempt Now"}
//       </button>
//     </div>
//   );
// }

// function TrainerCard({ tr }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       className="sh-card"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "var(--sh-card-bg)",
//         border: `1px solid ${hovered ? tr.color + "40" : "var(--sh-border)"}`,
//         borderRadius: 20,
//         padding: "28px 24px",
//         textAlign: "center",
//         boxShadow: hovered ? `0 12px 40px ${tr.color}18` : "var(--sh-shadow)",
//         transform: hovered ? "translateY(-4px)" : "none",
//         transition: "all 0.25s",
//       }}
//     >
//       <div
//         style={{
//           width: 72, height: 72,
//           borderRadius: "50%",
//           margin: "0 auto 16px",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           fontWeight: 800, fontSize: 22,
//           fontFamily: "'Space Grotesk', sans-serif",
//           background: `${tr.color}22`,
//           border: `3px solid ${tr.color}50`,
//           color: tr.color,
//         }}
//       >
//         {tr.initials}
//       </div>
//       <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "var(--sh-text)", marginBottom: 4, letterSpacing: "-0.02em" }}>{tr.name}</div>
//       <div style={{ fontSize: 13.5, color: "var(--sh-text-sub)", marginBottom: 6 }}>{tr.role}</div>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
//         <span style={{ fontSize: 12, color: "var(--sh-text-muted)", display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {tr.exp} exp</span>
//         <span style={{ color: "#f59e0b", fontSize: 12.5, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", gap: 3 }}><Star size={12} fill="#f59e0b" stroke="none" /> {tr.rating}</span>
//       </div>
//       <div style={{ display: "flex", gap: 10 }}>
//         <button
//           style={{
//             flex: 1, border: "none", borderRadius: 10, padding: 10,
//             fontWeight: 700, fontSize: 13.5, cursor: "pointer",
//             background: tr.color, color: "#fff",
//             fontFamily: "'Plus Jakarta Sans', sans-serif",
//             display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//           }}
//         >
//           <MessageCircle size={14} /> Chat
//         </button>
//         <button
//           style={{
//             flex: 1, background: "transparent",
//             border: `1.5px solid ${tr.color}`,
//             borderRadius: 10, padding: 10,
//             fontWeight: 600, fontSize: 13.5, cursor: "pointer",
//             color: tr.color,
//             fontFamily: "'Plus Jakarta Sans', sans-serif",
//             display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//           }}
//         >
//           <Calendar size={14} /> Schedule
//         </button>
//       </div>
//     </div>
//   );
// }

// function ResourceCard({ r }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       className="sh-card"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "var(--sh-card-bg)",
//         border: `1px solid ${hovered ? r.color + "40" : "var(--sh-border)"}`,
//         borderRadius: 18,
//         padding: "26px 24px",
//         boxShadow: hovered ? `0 8px 28px ${r.color}18` : "var(--sh-shadow)",
//         transform: hovered ? "translateY(-4px)" : "none",
//         transition: "all 0.25s",
//         cursor: "pointer",
//       }}
//     >
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
//         <div style={{ background: `${r.color}14`, border: `1px solid ${r.color}28`, borderRadius: 12, padding: 11, color: r.color }}>{r.icon}</div>
//         <span style={{ background: `${r.color}12`, color: r.color, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>{r.tag}</span>
//       </div>
//       <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: "var(--sh-text)", marginBottom: 8, letterSpacing: "-0.02em" }}>{r.title}</h3>
//       <p style={{ fontSize: 13.5, color: "var(--sh-text-sub)", lineHeight: 1.65, marginBottom: 18 }}>{r.desc}</p>
//       <div style={{ display: "flex", alignItems: "center", gap: 4, color: r.color, fontWeight: 600, fontSize: 13.5 }}>
//         View All <ChevronRight size={15} />
//       </div>
//     </div>
//   );
// }

// function CertCard({ c }) {
//   return (
//     <div
//       className="sh-card"
//       style={{
//         background: "var(--sh-card-bg)",
//         border: `2px solid ${c.status === "earned" ? c.color + "40" : "var(--sh-border)"}`,
//         borderRadius: 20,
//         padding: "28px 26px",
//         position: "relative",
//         overflow: "hidden",
//         boxShadow: c.status === "earned" ? `0 8px 32px ${c.color}20` : "var(--sh-shadow)",
//       }}
//     >
//       {c.status === "earned" && (
//         <div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%", background: `${c.color}15`, pointerEvents: "none" }} />
//       )}
//       <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
//         <div style={{ background: `${c.color}18`, border: `1.5px solid ${c.color}30`, borderRadius: 14, padding: 12, color: c.color, flexShrink: 0 }}>
//           <Award size={26} />
//         </div>
//         <div style={{ minWidth: 0 }}>
//           <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 600, color: "var(--sh-text)", margin: "0 0 3px", letterSpacing: "-0.02em" }}>{c.title}</h3>
//           <div style={{ fontSize: 12.5, color: "var(--sh-text-muted)" }}>{c.date}</div>
//         </div>
//       </div>
//       {c.status === "earned" && (
//         <div
//           style={{
//             background: `${c.color}10`,
//             borderRadius: 12,
//             padding: "10px 14px",
//             marginBottom: 16,
//             display: "flex", justifyContent: "space-between", alignItems: "center",
//           }}
//         >
//           <span style={{ fontSize: 13, color: "var(--sh-text-sub)" }}>Final Grade</span>
//           <span style={{ fontSize: 20, fontWeight: 700, color: c.color, fontFamily: "'Space Grotesk', sans-serif" }}>{c.grade}</span>
//         </div>
//       )}
//       <button
//         style={{
//           width: "100%",
//           background: c.status === "earned" ? c.color : "transparent",
//           color: c.status === "earned" ? "#fff" : "var(--sh-text-muted)",
//           border: `1.5px solid ${c.status === "earned" ? c.color : "var(--sh-border)"}`,
//           borderRadius: 11, padding: 11,
//           fontWeight: 700, fontSize: 14, cursor: "pointer",
//           display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
//           fontFamily: "'Plus Jakarta Sans', sans-serif",
//         }}
//       >
//         {c.status === "earned"
//           ? <><Download size={15} /> Download Certificate</>
//           : <><Lock size={15} /> Complete Course</>
//         }
//       </button>
//     </div>
//   );
// }

// function ActivityRow({ a }) {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       className="sh-card"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         background: "var(--sh-card-bg)",
//         border: `1px solid ${hovered ? "rgba(249,115,22,0.3)" : "var(--sh-border)"}`,
//         borderRadius: 14,
//         padding: "16px 20px",
//         display: "flex", alignItems: "center", gap: 16,
//         boxShadow: "var(--sh-shadow)",
//         transition: "border-color 0.2s",
//       }}
//     >
//       <div
//         style={{
//           borderRadius: 10, padding: 9,
//           flexShrink: 0, display: "flex",
//           background: `${a.iconColor}14`,
//           border: `1px solid ${a.iconColor}28`,
//           color: a.iconColor,
//         }}
//       >
//         {a.icon}
//       </div>
//       <div style={{ minWidth: 0 }}>
//         <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--sh-text)", letterSpacing: "-0.01em" }}>{a.text}</div>
//         <div style={{ fontSize: 12, color: "var(--sh-text-muted)", marginTop: 2 }}>{a.sub}</div>
//       </div>
//     </div>
//   );
// }

// function CodingLab() {
//   return (
//     <div style={{ maxWidth: 840, margin: "0 auto" }}>
//       <div
//         style={{
//           background: "var(--sh-card-bg)",
//           border: "1px solid var(--sh-border)",
//           borderRadius: 22,
//           overflow: "hidden",
//           boxShadow: "var(--sh-shadow)",
//         }}
//       >
//         {/* Header */}
//         <div
//           style={{
//             padding: "18px 24px",
//             borderBottom: "1px solid var(--sh-border)",
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//             flexWrap: "wrap", gap: 12,
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
//             <div style={{ background: "rgba(249,115,22,0.12)", borderRadius: 10, padding: 8, display: "flex", color: "#F97316", flexShrink: 0 }}>
//               <Code2 size={18} />
//             </div>
//             <div style={{ minWidth: 0 }}>
//               <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: "var(--sh-text)", letterSpacing: "-0.02em" }}>Reverse Linked List</div>
//               <div style={{ fontSize: 12, color: "var(--sh-text-muted)", marginTop: 2 }}>Data Structures • Linked Lists</div>
//             </div>
//           </div>
//           <span
//             style={{
//               background: "rgba(245,158,11,0.12)",
//               color: "#f59e0b",
//               border: "1px solid rgba(245,158,11,0.25)",
//               borderRadius: 8, padding: "5px 12px",
//               fontSize: 12.5, fontWeight: 700,
//               display: "flex", alignItems: "center", gap: 5,
//               flexShrink: 0,
//             }}
//           >
//             <Zap size={13} /> Medium
//           </span>
//         </div>

//         {/* Code block */}
//         <div
//           style={{
//             background: "#1e2329",
//             padding: "clamp(16px,3vw,24px)",
//             fontFamily: "'JetBrains Mono', monospace",
//             fontSize: "clamp(11px,1.5vw,13.5px)",
//             lineHeight: 1.7,
//             overflowX: "auto",
//           }}
//         >
//           {[
//             ["1",  <><span style={{ color: "#8b949e" }}>// Reverse a Linked List</span></>],
//             ["2",  <><span style={{ color: "#ff7b72" }}>class</span> <span style={{ color: "#79c0ff" }}>ListNode</span> {"{"}</>],
//             ["3",  <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#ff7b72" }}>int</span> <span style={{ color: "#e6edf3" }}>val</span>;</span></>],
//             ["4",  <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>next</span>;</span></>],
//             ["5",  <span style={{ color: "#e6edf3" }}>{"}"}</span>],
//             ["6",  ""],
//             ["7",  <><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#d2a8ff" }}>reverse</span>(<span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>head</span>) {"{"}</>],
//             ["8",  <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>prev</span> = <span style={{ color: "#ff7b72" }}>null</span>;</span></>],
//             ["9",  <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>curr</span> = <span style={{ color: "#e6edf3" }}>head</span>;</span></>],
//             ["10", <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#ff7b72" }}>while</span> (<span style={{ color: "#e6edf3" }}>curr</span> != <span style={{ color: "#ff7b72" }}>null</span>) {"{"}</span></>],
//             ["11", <><span style={{ paddingLeft: 32, display: "inline-block" }}><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>next</span> = <span style={{ color: "#e6edf3" }}>curr.next</span>;</span></>],
//             ["12", <><span style={{ paddingLeft: 32, display: "inline-block" }}><span style={{ color: "#e6edf3" }}>curr.next</span> = <span style={{ color: "#e6edf3" }}>prev</span>;</span></>],
//             ["13", <><span style={{ paddingLeft: 32, display: "inline-block" }}><span style={{ color: "#e6edf3" }}>prev</span> = <span style={{ color: "#e6edf3" }}>curr</span>;</span></>],
//             ["14", <><span style={{ paddingLeft: 32, display: "inline-block" }}><span style={{ color: "#e6edf3" }}>curr</span> = <span style={{ color: "#e6edf3" }}>next</span>;</span></>],
//             ["15", <><span style={{ paddingLeft: 16, display: "inline-block" }}>{"}"}</span></>],
//             ["16", <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#ff7b72" }}>return</span> <span style={{ color: "#e6edf3" }}>prev</span>;</span></>],
//             ["17", "}"],
//           ].map(([ln, content]) => (
//             <div key={ln}>
//               <span style={{ color: "#555", minWidth: 28, userSelect: "none", display: "inline-block" }}>{ln}</span>
//               {content}
//             </div>
//           ))}
//         </div>

//         {/* Footer actions */}
//         <div
//           style={{
//             padding: "20px 24px",
//             borderTop: "1px solid var(--sh-border)",
//             display: "flex", gap: 12,
//             flexWrap: "wrap",
//           }}
//         >
//           <button
//             style={{
//               flex: 1, minWidth: 140,
//               background: "#F97316", color: "#fff",
//               border: "none", borderRadius: 12, padding: 12,
//               fontWeight: 700, fontSize: 14.5, cursor: "pointer",
//               fontFamily: "'Plus Jakarta Sans', sans-serif",
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
//             }}
//           >
//             <Play size={16} fill="white" stroke="none" /> Solve Now
//           </button>
//           <button
//             style={{
//               flex: 1, minWidth: 140,
//               background: "transparent", color: "var(--sh-text)",
//               border: "1.5px solid var(--sh-border)",
//               borderRadius: 12, padding: 12,
//               fontWeight: 600, fontSize: 14.5, cursor: "pointer",
//               fontFamily: "'Plus Jakarta Sans', sans-serif",
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
//             }}
//           >
//             <BookMarked size={16} /> View Solutions
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }














































"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Video, BrainCircuit, ListChecks, Code2, ClipboardCheck, MessageCircle,
  BookOpen, Award, FileText, PlayCircle, Library, FolderOpen,
  CheckCircle2, ArrowRight, Lock, BarChart3, Play, Download,
  Calendar, Star, ChevronRight, Zap, Flame, Trophy, Clock,
  Podcast, Users, TrendingUp, BookMarked, LayoutDashboard,
  Compass, Route
} from "lucide-react";
import PublicLayout from "../Landing/components/PublicLayout";
import authService from "../../services/authService";
import { registerFcmToken } from "../../services/firebaseService";
// ─── GLOBAL RESPONSIVE STYLE INJECTION ───────────────────────────────────────
const GLOBAL_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { overflow-x: hidden; width: 100%; }

  /* Navbar responsive */
  .sh-desktop-nav { display: flex !important; }
  .sh-mobile-btn  { display: none !important; }
  @media (max-width: 900px) {
    .sh-desktop-nav { display: none !important; }
    .sh-mobile-btn  { display: flex !important; }
  }

  /* Hero grid */
  .sh-hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  @media (max-width: 900px) {
    .sh-hero-grid { grid-template-columns: 1fr; gap: 40px; }
  }

  /* Skill mapping grid */
  .sh-skill-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    align-items: center;
  }
  @media (max-width: 860px) {
    .sh-skill-grid { grid-template-columns: 1fr; gap: 40px; }
  }

  /* Generic card grid */
  .sh-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 14px;
  }
  .sh-card-grid-sm {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
  }
  .sh-cert-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 14px;
    max-width: none;
    margin: 0;
  }

  /* Hero buttons */
  .sh-hero-btns {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
    .sh-hero-btns { flex-direction: column; }
    .sh-hero-btns button { width: 100%; justify-content: center; }
  }

  /* CTA buttons */
  .sh-cta-btns {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media (max-width: 480px) {
    .sh-cta-btns { flex-direction: column; align-items: stretch; }
    .sh-cta-btns button { width: 100%; justify-content: center; }
  }

  /* Hero stats row */
  .sh-hero-stats {
    display: flex;
    gap: 32px;
    margin-top: 48px;
    flex-wrap: wrap;
  }

  /* Hero dashboard card inner grid */
  .sh-dash-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  @media (max-width: 480px) {
    .sh-dash-grid { grid-template-columns: 1fr; }
  }

  /* Roadmap container */
  .sh-roadmap-item {
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
  }
  @media (max-width: 480px) {
    .sh-roadmap-item { gap: 12px; }
  }

  /* Section padding */
  .sh-section { padding: clamp(16px, 2.6vw, 26px) 0; }
  .sh-inner { width: 100%; max-width: 1760px; margin: 0 auto; padding: 0 clamp(12px, 2.4vw, 32px); }

  /* Section heading */
  .sh-section-h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(20px, 2.6vw, 30px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  /* Prevent long strings from overflowing cards */
  .sh-card { word-break: break-word; overflow-wrap: break-word; }


  /* compact + regular-weight text */
  .sh-root h1, .sh-root h2, .sh-root h3, .sh-root h4, .sh-root b, .sh-root strong { font-weight: 500 !important; }
  .sh-root p, .sh-root span, .sh-root div, .sh-root button, .sh-root a, .sh-root dt, .sh-root dd { font-weight: 400; }
  .sh-root h1, .sh-root h2, .sh-root h3, .sh-root p { margin-top: 0; }
  .sh-head { margin-bottom: clamp(10px, 1.8vw, 16px); }
  .sh-head > div:first-child, .sh-section div[style*="border-radius: 99px"] { margin-bottom: 6px !important; }
  .sh-head h2 { margin: 0 0 4px !important; }
  .sh-head p { line-height: 1.5 !important; font-size: 14px !important; margin-top: 0 !important; max-width: 760px !important; }
  .sh-skill-grid { gap: clamp(20px, 4vw, 40px); }
  .sh-root a { color: inherit; text-decoration: none; }

  /* ── Student hero ── */
  .sh-hero { background: var(--sh-hero-bg); padding: clamp(12px, 2vw, 18px) 0; border-bottom: 1px solid var(--sh-border); }
  .sh-hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(22px, 3.2vw, 32px); line-height: 1.15; letter-spacing: -0.03em; margin: 0 0 4px; color: var(--sh-text); overflow-wrap: anywhere; }
  .sh-hero-sub { color: var(--sh-text-sub); font-size: clamp(14px, 1.8vw, 16px); line-height: 1.6; max-width: 900px; margin: 0 0 12px; }
  .sh-acts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  .sh-ac { display: flex; flex-direction: column; gap: 6px; padding: 14px; border-radius: 16px; min-width: 0; border: 1.5px solid color-mix(in srgb, var(--c) 30%, transparent); border-top: 3px solid var(--c); background: linear-gradient(150deg, color-mix(in srgb, var(--c) 8%, transparent), var(--sh-card-bg) 60%); box-shadow: var(--sh-shadow); transition: transform .25s, box-shadow .25s; }
  .sh-ac:hover { transform: translateY(-3px); box-shadow: 0 10px 26px color-mix(in srgb, var(--c) 24%, transparent); }
  .sh-ac:focus-visible, .sh-fn > a:focus-visible { outline: 2px solid #F97316; outline-offset: 3px; }
  .sh-ac h3 { font-size: 15px; margin: 0; letter-spacing: -0.02em; color: var(--sh-text); }
  .sh-ac p { font-size: 12.5px; line-height: 1.45; color: var(--sh-text-sub); margin: 0; }
  .sh-ac .go { margin-top: auto; display: flex; align-items: center; gap: 4px; font-size: 12.5px; color: var(--c); }
  .sh-ac.primary { background: var(--c); border-color: var(--c); box-shadow: 0 8px 24px rgba(249,115,22,.32); }
  .sh-ac.primary h3, .sh-ac.primary p, .sh-ac.primary .go { color: #fff; }
  .sh-ico { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px; color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); border: 1px solid color-mix(in srgb, var(--c) 28%, transparent); }
  .sh-ac.primary .sh-ico { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.35); color: #fff; }
  .sh-ov { margin-top: 10px; border: 1px solid var(--sh-border); border-radius: 16px; background: var(--sh-card-bg); box-shadow: var(--sh-shadow); padding: 14px; }
  .sh-ov-h { font-size: 14px; margin: 0 0 10px; color: var(--sh-text); font-family: 'Space Grotesk', sans-serif; }
  .sh-ov-g { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 10px; }
  .sh-ovi { display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border-radius: 12px; background: var(--sh-pill-bg); border: 1px solid var(--sh-border); min-width: 0; }
  .sh-ovi small { display: flex; align-items: center; gap: 6px; font-size: 11px; letter-spacing: .05em; text-transform: uppercase; color: var(--c); }
  .sh-ovi strong { font-size: 14.5px; overflow-wrap: anywhere; color: var(--sh-text); }
  .sh-ovi em { font-style: normal; font-size: 12px; color: var(--sh-text-sub); }
  .sh-ov-empty { display: flex; gap: 12px; align-items: center; color: var(--sh-text-sub); font-size: 13.5px; line-height: 1.55; }
  @media (max-width: 1099px) { .sh-acts { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 520px) {
    .sh-acts { grid-template-columns: 1fr; gap: 8px; }
    .sh-ac { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 4px 12px; padding: 12px; }
    .sh-ac > div { flex: 1; min-width: 0; }
    .sh-ac .go { width: 100%; margin-top: 0; }
  }

  /* ── Learning journey ── */
  .sh-flow { background: var(--sh-card-bg); border: 1px solid var(--sh-border); border-radius: 18px; box-shadow: var(--sh-shadow); padding: clamp(14px, 2.5vw, 20px); margin-bottom: clamp(12px, 2vw, 18px); min-width: 0; }
  .sh-flow-h { display: flex; align-items: center; justify-content: space-between; gap: 4px 12px; flex-wrap: wrap; margin-bottom: 14px; }
  .sh-flow-h h3 { font-size: 15px; margin: 0; color: var(--sh-text); }
  .sh-flow-h span { font-size: 12px; color: var(--sh-text-muted); }
  .sh-flow-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0 24px; }
  .sh-fn { position: relative; display: flex; min-width: 0; }
  .sh-fn > a { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 12px 8px; border-radius: 14px; border: 1.5px solid color-mix(in srgb, var(--c) 32%, transparent); background: linear-gradient(160deg, color-mix(in srgb, var(--c) 10%, transparent), var(--sh-card-bg) 72%); transition: transform .25s, box-shadow .25s; }
  .sh-fn > a:hover { transform: translateY(-3px); border-color: var(--c); box-shadow: 0 8px 22px color-mix(in srgb, var(--c) 22%, transparent); }
  .sh-fn-num { font-size: 11.5px; color: #fff; background: var(--c); border-radius: 99px; padding: 1px 9px; white-space: nowrap; }
  .sh-fn-t { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 13px; line-height: 1.25; letter-spacing: -0.02em; color: var(--sh-text); }
  .sh-fn-s { display: block; margin-top: 3px; font-size: 11.5px; line-height: 1.4; color: var(--sh-text-sub); }
  .sh-fn-chip { display: none; margin-top: 5px; font-size: 11px; color: #F97316; background: rgba(249,115,22,.1); border: 1px solid rgba(249,115,22,.25); border-radius: 99px; padding: 1px 9px; }
  .sh-fn:nth-child(-n+5)::after { content: "→"; position: absolute; right: -22px; top: 50%; margin-top: -10px; width: 20px; height: 20px; border-radius: 50%; background: #F97316; color: #fff; font-size: 11px; line-height: 20px; text-align: center; z-index: 2; }
  .sh-fl { grid-column: 3 / 6; position: relative; margin: 10px calc((100% - 48px) / 6) 18px; height: 30px; border: 2px dashed #F97316; border-top: 0; border-radius: 0 0 16px 16px; list-style: none; }
  .sh-fl-t { position: absolute; top: -12px; height: 12px; border-left: 2px dashed #F97316; }
  .sh-fl-t.l { left: -2px; } .sh-fl-t.m { left: calc(50% - 1px); } .sh-fl-t.r { right: -2px; }
  .sh-fl-t.l::before, .sh-fl-t.m::before { content: ""; position: absolute; top: -1px; left: -6px; border: 5px solid transparent; border-top: 0; border-bottom: 8px solid #F97316; }
  .sh-fl-lbl { position: absolute; left: 50%; bottom: -13px; transform: translateX(-50%); display: flex; align-items: center; gap: 6px; max-width: calc(100% + 40px); background: var(--sh-card-bg); border: 1.5px solid rgba(249,115,22,.4); border-radius: 99px; padding: 4px 12px; font-size: 12px; color: #F97316; text-align: center; line-height: 1.3; }
  .sh-fl-desc { display: none; }
  @media (max-width: 1099px) {
    .sh-flow-grid { display: flex; flex-direction: column; gap: 20px; max-width: none; margin: 0; }
    .sh-fn > a { flex-direction: row; text-align: left; gap: 12px; padding: 10px 12px; }
    .sh-fn-t { font-size: 14px; } .sh-fn-s { font-size: 12px; }
    .sh-fn:nth-child(-n+5)::after { content: "↓"; right: auto; left: 50%; margin-left: -10px; top: auto; bottom: -21px; margin-top: 0; }
    .sh-fn:nth-child(5) .sh-fn-chip { display: inline-block; }
    .sh-fl { margin: 0; height: auto; border: 1.5px dashed #F97316; border-radius: 12px; padding: 8px 12px; background: rgba(249,115,22,.05); }
    .sh-fl-t { display: none; }
    .sh-fl-lbl { position: static; transform: none; max-width: none; background: none; border: 0; padding: 0; justify-content: center; flex-wrap: wrap; }
    .sh-fl-desc { display: block; margin-top: 4px; font-size: 12px; color: var(--sh-text-sub); text-align: center; line-height: 1.5; }
  }
  .sh-jr-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0 26px; position: relative; }
  .sh-jr { position: relative; display: flex; scroll-margin-top: 80px; }
  .sh-jr-card { flex: 1; min-width: 0; padding: 14px 12px; border-radius: 16px; background: var(--sh-card-bg); border: 1px solid var(--sh-border); border-top: 3px solid var(--c); box-shadow: var(--sh-shadow); display: flex; flex-direction: column; gap: 8px; transition: transform .25s, box-shadow .25s; }
  .sh-jr-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px color-mix(in srgb, var(--c) 22%, transparent); }
  .sh-jr-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .sh-jr-n { font-size: 12px; color: var(--c); background: color-mix(in srgb, var(--c) 12%, transparent); border-radius: 99px; padding: 2px 9px; }
  .sh-jr h3 { font-size: 15px; line-height: 1.25; margin: 0; color: var(--sh-text); }
  .sh-jr dl { margin: 0; display: flex; flex-direction: column; gap: 6px; }
  .sh-jr dt { font-size: 10.5px; letter-spacing: .07em; text-transform: uppercase; color: var(--c); }
  .sh-jr dd { margin: 1px 0 0; font-size: 12.5px; line-height: 1.5; color: var(--sh-text-sub); }
  .sh-jr-links { display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto; padding-top: 4px; }
  .sh-jr-links a { font-size: 11.5px; padding: 4px 9px; border-radius: 99px; background: var(--sh-pill-bg); border: 1px solid var(--sh-border); color: var(--sh-text); display: inline-flex; align-items: center; gap: 2px; }
  .sh-jr-links a:hover { border-color: var(--c); color: var(--c); }
  .sh-jr-dot { display: none; }
  .sh-jr:not(:last-child)::after { content: "→"; position: absolute; right: -25px; top: 28px; width: 22px; height: 22px; border-radius: 50%; background: #F97316; color: #fff; font-size: 12px; line-height: 22px; text-align: center; z-index: 2; }
  .sh-jr-loop { margin: 12px auto 0; max-width: 760px; text-align: center; font-size: 13px; color: var(--sh-text-sub); line-height: 1.55; padding: 10px 14px; border: 1.5px dashed var(--sh-border); border-radius: 12px; background: var(--sh-card-bg); }
  .sh-jr-loop b { color: #F97316; }
  @media (max-width: 1199px) {
    .sh-jr-list { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 30px; }
    .sh-jr:nth-child(4) { grid-column: 3; grid-row: 2; } .sh-jr:nth-child(5) { grid-column: 2; grid-row: 2; } .sh-jr:nth-child(6) { grid-column: 1; grid-row: 2; }
    .sh-jr:nth-child(3)::after { content: "↓"; right: auto; left: 50%; top: auto; bottom: -27px; margin-left: -11px; }
    .sh-jr:nth-child(4)::after, .sh-jr:nth-child(5)::after { content: "←"; right: auto; left: -26px; }
  }
  @media (max-width: 900px) {
    .sh-jr-list { display: flex; flex-direction: column; gap: 20px; max-width: none; margin: 0; }
    .sh-jr-list::before { content: ""; position: absolute; left: 17px; top: 18px; bottom: 18px; width: 2px; background: linear-gradient(#F97316, var(--sh-border)); }
    .sh-jr { padding-left: 50px; grid-column: auto !important; grid-row: auto !important; }
    .sh-jr-dot { display: flex; position: absolute; left: 0; top: 10px; width: 36px; height: 36px; border-radius: 50%; align-items: center; justify-content: center; background: #F97316; color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; z-index: 1; box-shadow: 0 0 0 4px rgba(249,115,22,.15); }
    .sh-jr:nth-child(n)::after { content: "↓"; left: 7px !important; right: auto !important; top: auto !important; bottom: -22px !important; margin: 0 !important; width: 22px; height: 22px; font-size: 12px; }
    .sh-jr:last-child::after { display: none !important; }
    .sh-jr-n { display: none; }
  }
  @media (max-width: 380px) { .sh-jr { padding-left: 42px; } .sh-jr-dot { width: 32px; height: 32px; font-size: 13px; } .sh-jr-list::before { left: 15px; } .sh-fn > a { gap: 10px; padding: 9px; } }


  .sh-card-grid > .sh-card { display: flex; flex-direction: column; }
  .sh-card-grid > .sh-card > button:last-child { margin-top: auto !important; }
  .sh-root section, .sh-root .sh-hero { width: 100%; }


  /* Resource cards: compact, aligned */
  .sh-card-grid-sm { align-items: stretch; }
  .sh-res { display: flex; flex-direction: column; gap: 6px; padding: 14px !important; min-width: 0; margin: 0; background: var(--sh-card-bg); border: 1px solid var(--sh-border); border-radius: 16px; box-shadow: var(--sh-shadow); cursor: pointer; transition: transform .25s, box-shadow .25s, border-color .25s; }
  .sh-res:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--c) 40%, transparent); box-shadow: 0 8px 24px color-mix(in srgb, var(--c) 18%, transparent); }
  .sh-res-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .sh-res-ico { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 11px; color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); border: 1px solid color-mix(in srgb, var(--c) 28%, transparent); flex-shrink: 0; }
  .sh-res-ico svg { width: 20px; height: 20px; }
  .sh-res-tag { font-size: 11px; color: var(--c); background: color-mix(in srgb, var(--c) 12%, transparent); padding: 2px 9px; border-radius: 99px; white-space: nowrap; }
  .sh-res-t { font-family: 'Space Grotesk', sans-serif; font-size: 15px; margin: 4px 0 0; color: var(--sh-text); letter-spacing: -0.02em; }
  .sh-res-d { font-size: 13px; line-height: 1.5; color: var(--sh-text-sub); margin: 0; }
  .sh-res-go { margin-top: auto; padding-top: 4px; display: flex; align-items: center; gap: 3px; font-size: 13px; color: var(--c); }

  /* compact stage cards */
  .sh-jr-list { align-items: stretch; }
  .sh-jr-card { padding: 12px 12px 10px; gap: 6px; }
  .sh-jr-top .sh-ico { width: 34px !important; height: 34px !important; border-radius: 10px; }
  .sh-jr-top .sh-ico svg { width: 18px; height: 18px; }
  .sh-jr h3 { font-size: 14.5px; }
  .sh-jr dl { gap: 5px; }
  .sh-jr dt { font-size: 10px; }
  .sh-jr dd { font-size: 12.5px; line-height: 1.45; margin-top: 1px; }
  .sh-jr-links { margin-top: auto; padding-top: 6px; }
  .sh-jr dl { flex: 1; }
  .sh-jr-links a { padding: 3px 9px; }
  .sh-jr:not(:last-child)::after { top: 22px; }
  @media (max-width: 900px) { .sh-jr-card { padding: 12px 14px; } }

  /* alignment fixes */
  .sh-head { text-align: center; }
  .sh-head p { margin-left: auto !important; margin-right: auto !important; }
  .sh-card-grid-sm { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  @media (max-width: 1099px) { .sh-card-grid-sm { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 520px) { .sh-card-grid-sm { grid-template-columns: 1fr; } }
  @media (min-width: 1200px) { .sh-jr h3 { min-height: 2.5em; display: flex; align-items: flex-start; } }
  .sh-jr-loop { max-width: none; width: fit-content; }
  @media (min-width: 1100px) { .sh-jr-loop { white-space: nowrap; } }

  /* breathing room (minor) */
  .sh-jr-card { padding: 14px 14px 14px; gap: 8px; }
  .sh-jr-links { padding-top: 8px; gap: 6px; }
  .sh-jr dl { gap: 8px; }
  .sh-jr-loop { margin-top: 20px; padding: 10px 16px; }
  .sh-flow { margin-bottom: 18px; }

  /* responsive polish */
  .sh-ov-g { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  @media (max-width: 1099px) { .sh-ov-g { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 520px) { .sh-ov-g { grid-template-columns: 1fr; } .sh-ac { flex-wrap: nowrap; } .sh-ac .go { width: auto; margin: 0 0 0 auto; flex-shrink: 0; } }

  /* ── single-row moving strip (same as Trainer / Manager Hub) ── */
  .sh-mq { overflow: hidden; position: relative; -webkit-mask-image: linear-gradient(90deg, transparent, #000 2%, #000 98%, transparent); mask-image: linear-gradient(90deg, transparent, #000 2%, #000 98%, transparent); }
  .sh-mq-track { display: flex; gap: 12px; width: max-content; padding: 6px 0 10px; animation: shMq var(--d, 45s) linear infinite; }
  .sh-mq-set { display: flex; gap: 12px; }
  .sh-mq-item { flex: 0 0 clamp(250px, 21vw, 290px); min-width: 0; display: flex; }
  .sh-mq-item > .sh-card { flex: 1; display: flex; flex-direction: column; height: 100%; margin: 0; }
  .sh-mq-item > .sh-card > :nth-last-child(2) { margin-bottom: 12px; }
  .sh-mq-item > .sh-card > :last-child { margin-top: auto !important; }
  .sh-mq:hover .sh-mq-track, .sh-mq:focus-within .sh-mq-track, .sh-mq:active .sh-mq-track { animation-play-state: paused; }
  @keyframes shMq { from { transform: translateX(0); } to { transform: translateX(calc(-50% - 6px)); } }
  @media (prefers-reduced-motion: reduce) {
    .sh-mq { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
    .sh-mq-track { animation: none; }
    .sh-mq-set[aria-hidden="true"] { display: none; }
  }

  /* ── compact CTA banner ── */
  #activity { padding-bottom: 10px; }
  .sh-cta2 { background: linear-gradient(135deg, #1E293B 0%, #0f172a 100%); padding: 16px 0; margin: 0; }
  .sh-cta2-in { display: flex; align-items: center; justify-content: space-between; gap: 14px 32px; flex-wrap: wrap; }
  .sh-cta2-txt { min-width: 0; flex: 1 1 380px; text-align: left; }
  .sh-cta2-txt h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(20px, 2.6vw, 28px); line-height: 1.2; letter-spacing: -0.03em; color: #fff; margin: 0 0 4px; }
  .sh-cta2-txt p { font-size: 14px; line-height: 1.5; color: rgba(255,255,255,.55); margin: 0; }
  .sh-cta2 .sh-cta-btns { justify-content: flex-end; }
  @media (max-width: 720px) { .sh-cta2-txt { text-align: center; } .sh-cta2 .sh-cta-btns { justify-content: center; width: 100%; } }

  /* ═════ RESPONSIVE: desktop / laptop / mac / iPad / iPad mini / tablet / phones ═════ */
  .sh-root { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
  .sh-root img, .sh-root svg { max-width: 100%; }
  @media (min-width: 1800px) { .sh-mq-item { flex-basis: 300px; } }
  @media (max-width: 1099px) { .sh-mq-item { flex-basis: 250px; } }
  @media (max-width: 820px) { .sh-mq-item { flex-basis: 232px; } .sh-card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  @media (max-width: 600px) {
    .sh-section { padding: 12px 0; }
    .sh-card-grid, .sh-card-grid-sm, .sh-cert-grid { grid-template-columns: 1fr; gap: 10px; }
    .sh-mq-track, .sh-mq-set { gap: 10px; }
    .sh-mq-item { flex-basis: min(208px, 66vw); }
    .sh-mq-item h3 { font-size: 13.5px !important; }
    .sh-mq-item p { font-size: 12px !important; line-height: 1.45 !important; }
    .sh-pc { padding: 12px !important; border-radius: 14px !important; }
    .sh-res { padding: 12px !important; border-radius: 14px; }
    .sh-cc-top { height: 64px !important; font-size: 34px !important; }
    .sh-cc-in { padding: 12px 14px 14px !important; }
    .sh-rm-dot { width: 36px !important; height: 36px !important; }
    .sh-rm-line { left: 17px !important; }
    .sh-root h2 { overflow-wrap: anywhere; }
  }
  @media (max-width: 380px) { .sh-mq-item { flex-basis: 190px; } }
  @media (hover: none) { .sh-pc:hover, .sh-card:hover { transform: none !important; } }

  @keyframes shPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const FEATURES = [
  { color: "#F97316", title: "Live Sessions",         desc: "Join real-time classes with industry trainers. Ask questions, collaborate and learn live.",        icon: <Video size={22} /> },
  { color: "#3b82f6", title: "Skill Mapping",         desc: "AI-driven skill gap analysis to identify your strengths and areas for improvement.",              icon: <BrainCircuit size={22} /> },
  { color: "#8b5cf6", title: "Study Plan",            desc: "Personalized weekly study roadmap tailored to your learning goals and pace.",                      icon: <ListChecks size={22} /> },
  { color: "#22c55e", title: "Coding Lab",            desc: "Practice DSA, system design and real-world problems in an in-browser IDE.",                       icon: <Code2 size={22} /> },
  { color: "#f59e0b", title: "Assessments & Quizzes", desc: "Structured quizzes and mock tests to evaluate and reinforce your knowledge.",                     icon: <ClipboardCheck size={22} /> },
  { color: "#ec4899", title: "Trainer Chat",          desc: "Direct messaging with your assigned trainer for doubt resolution anytime.",                       icon: <MessageCircle size={22} /> },
  { color: "#14b8a6", title: "Learning Resources",    desc: "Curated PDFs, notes, recorded lectures, and reference materials at your fingertips.",             icon: <Library size={22} /> },
  { color: "#f97316", title: "Certificates",          desc: "Earn verifiable certificates upon course completion to showcase your skills.",                    icon: <Award size={22} /> },
];

const COURSES = [
  { title: "Java Backend Engineering", progress: 75, color: "#f97316", tag: "Backend",  thumb: "☕", logo: "java" },
  { title: "React Development",        progress: 45, color: "#3b82f6", tag: "Frontend", thumb: "⚛️", logo: "react" },
  { title: "AWS Fundamentals",         progress: 30, color: "#f59e0b", tag: "Cloud",    thumb: "☁️", logo: "aws" },
];

const ROADMAP = [
  { week: "Week 1", topic: "Java Basics",   status: "done"    },
  { week: "Week 2", topic: "OOP Concepts",  status: "done"    },
  { week: "Week 3", topic: "Collections",   status: "current" },
  { week: "Week 4", topic: "Spring Boot",   status: "locked"  },
  { week: "Week 5", topic: "Microservices", status: "locked"  },
];

const LIVE = [
  { title: "Java Backend Masterclass", time: "Today • 6:00 PM",    trainer: "Rahul S.",  avatar: "RS", live: true,  color: "#ef4444", logo: "java" },
  { title: "React Workshop",           time: "Tomorrow • 7:00 PM", trainer: "Priya M.",  avatar: "PM", live: false, color: "#3b82f6", logo: "react" },
  { title: "System Design Bootcamp",   time: "Wed • 5:00 PM",      trainer: "Arjun K.",  avatar: "AK", live: false, color: "#8b5cf6" },
];

const SKILLS = [
  { name: "Java",  pct: 80, color: "#f97316" },
  { name: "SQL",   pct: 70, color: "#3b82f6" },
  { name: "React", pct: 60, color: "#8b5cf6" },
  { name: "AWS",   pct: 40, color: "#22c55e" },
];

const QUIZZES = [
  { title: "Java Quiz",        questions: 20, status: "pending",   score: null, color: "#F97316", logo: "java" },
  { title: "React Quiz",       questions: 15, status: "completed", score: 88,   color: "#3b82f6", logo: "react" },
  { title: "SQL Fundamentals", questions: 25, status: "pending",   score: null, color: "#22c55e", logo: "sql" },
];

const TRAINERS = [
  { name: "Rahul Sharma", role: "Java & Backend Expert", exp: "8 years", initials: "RS", color: "#F97316", rating: 4.9 },
  { name: "Priya Mehta",  role: "React & Frontend Lead", exp: "6 years", initials: "PM", color: "#3b82f6", rating: 4.8 },
  { name: "Arjun Kumar",  role: "AWS & DevOps Engineer", exp: "7 years", initials: "AK", color: "#8b5cf6", rating: 4.9 },
];

const RESOURCES = [
  { color: "#f97316", title: "PDF Notes",        desc: "Detailed topic-wise notes for offline revision.",     tag: "24 Files",     icon: <FileText size={22} /> },
  { color: "#3b82f6", title: "Recorded Classes", desc: "All past live sessions are available on demand.",     tag: "48 Videos",    icon: <Video size={22} /> },
  { color: "#8b5cf6", title: "Video Lectures",   desc: "Curated video tutorials for every concept.",          tag: "120 Lectures", icon: <PlayCircle size={22} /> },
  { color: "#22c55e", title: "Assignments",      desc: "Practice assignments with sample test cases.",        tag: "36 Tasks",     icon: <FolderOpen size={22} /> },
];

const CERTS = [
  { title: "Java Backend Engineering", date: "May 2025",    grade: "A+", color: "#F97316", status: "earned"  },
  { title: "React Development",        date: "In Progress", grade: "--", color: "#3b82f6", status: "pending" },
];

const ACTIVITIES = [
  { iconColor: "#22c55e", icon: <CheckCircle2 size={16} />, text: "Completed Java Quiz",                  sub: "Score: 88% • 2 hours ago" },
  { iconColor: "#3b82f6", icon: <Video size={16} />,        text: "Joined Live Session — React Workshop", sub: "Duration: 90 mins • Yesterday" },
  { iconColor: "#F97316", icon: <Download size={16} />,     text: "Downloaded Notes — Spring Boot",       sub: "PDF • 3 days ago" },
  { iconColor: "#8b5cf6", icon: <FolderOpen size={16} />,   text: "Submitted Assignment — REST APIs",     sub: "Grade Pending • 4 days ago" },
];

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
// Colours match the main LMS homepage: page / hero / every section share ONE background
// (light #F8FAFC · dark #000), cards are white / gray-900, text #1E293B / white.
const DARK_THEME = {
  "--sh-page-bg":    "#000000",
  "--sh-card-bg":    "#111827",
  "--sh-card-hover": "#1F2937",
  "--sh-hero-bg":    "#000000",
  "--sh-section-bg": "#000000",
  "--sh-border":     "#1F2937",
  "--sh-border-hov": "#374151",
  "--sh-text":       "#ffffff",
  "--sh-text-sub":   "#CBD5E1",
  "--sh-text-muted": "#94A3B8",
  "--sh-pill-bg":    "rgba(255,255,255,0.06)",
  "--sh-icon-bg":    "rgba(255,255,255,0.06)",
  "--sh-bar-bg":     "rgba(255,255,255,0.10)",
  "--sh-shadow":     "0 4px 20px rgba(0,0,0,0.45)",
  "--sh-shadow-hov": "0 16px 48px rgba(0,0,0,0.6)",
};

const LIGHT_THEME = {
  "--sh-page-bg":    "#F8FAFC",
  "--sh-card-bg":    "#ffffff",
  "--sh-card-hover": "#ffffff",
  "--sh-hero-bg":    "#F8FAFC",
  "--sh-section-bg": "#F8FAFC",
  "--sh-border":     "#E5E7EB",
  "--sh-border-hov": "#D1D5DB",
  "--sh-text":       "#1E293B",
  "--sh-text-sub":   "#475569",
  "--sh-text-muted": "#94A3B8",
  "--sh-pill-bg":    "#F1F5F9",
  "--sh-icon-bg":    "#F1F5F9",
  "--sh-bar-bg":     "#E2E8F0",
  "--sh-shadow":     "0 1px 3px rgba(15,23,42,0.08)",
  "--sh-shadow-hov": "0 12px 40px rgba(15,23,42,0.13)",
};

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ value, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setWidth(value), 200); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      style={{
        background: "var(--sh-bar-bg)",
        borderRadius: 99,
        height: 8,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          height: "100%",
          borderRadius: 99,
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

// ─── SECTION BADGE ────────────────────────────────────────────────────────────
function SecBadge({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(249,115,22,0.08)",
        border: "1px solid rgba(249,115,22,0.22)",
        borderRadius: 99,
        padding: "6px 16px",
        marginBottom: 16,
      }}
    >
      <Sparkles size={13} color="#F97316" />
      <span style={{ color: "#F97316", fontSize: 13, fontWeight: 500, letterSpacing: "0.02em" }}>
        {children}
      </span>
    </div>
  );
}

// ─── REAL TECH LOGOS (official brand icons via Devicon CDN, shown on a white tile) ───
const LOGO_PATH = {
  java:  "java/java-original.svg",
  react: "react/react-original.svg",
  aws:   "amazonwebservices/amazonwebservices-original-wordmark.svg",
  sql:   "postgresql/postgresql-original.svg",
};
function TechLogo({ name, size = 40, fallback = null }) {
  const [bad, setBad] = useState(false);
  if (!LOGO_PATH[name] || bad) return fallback;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size, borderRadius: Math.round(size * 0.28), background: "#fff", border: "1px solid rgba(15,23,42,0.08)", flexShrink: 0 }}>
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${LOGO_PATH[name]}`}
        alt=""
        width={Math.round(size * 0.66)}
        height={Math.round(size * 0.66)}
        loading="lazy"
        onError={() => setBad(true)}
        style={{ objectFit: "contain", maxWidth: "100%" }}
      />
    </span>
  );
}

// ─── MOVING STRIP ─────────────────────────────────────────────────────────────
function Marquee({ items, duration = 45 }) {
  const set = items.map((node, i) => <div className="sh-mq-item" key={i}>{node}</div>);
  const dup = items.map((node, i) => <div className="sh-mq-item" key={`d${i}`}>{node}</div>);
  return (
    <div className="sh-mq" style={{ "--d": `${duration}s` }}>
      <div className="sh-mq-track">
        <div className="sh-mq-set">{set}</div>
        <div className="sh-mq-set" aria-hidden="true" {...{ inert: "" }}>{dup}</div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT (renamed: LearningHub → StudentHub) ───────────────────────
export default function StudentHub({
  setShowLoginModal,
  student, // optional real data: { name, course:{title,progress}, nextTopic, nextClass:{title,time}, pendingAssessment:{title} }
}) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return document.documentElement.classList.contains("dark");
    } catch { return false; }
  });

  const toggleTheme = () => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  useEffect(() => {
    const onStorage = (e) => { if (e.key === "theme") setDarkMode(e.newValue === "dark"); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const theme = darkMode ? DARK_THEME : LIGHT_THEME;

  const scrollToSection = (sectionId) => {
    document.querySelector(`#${sectionId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PublicLayout
  theme={darkMode ? "dark" : "light"}
  toggleTheme={toggleTheme}
  setShowLoginModal={setShowLoginModal}
  scrollToSection={scrollToSection}
>
      <div
        className="sh-root"
        style={{
          ...theme,
          background: "var(--sh-page-bg)",
          color: "var(--sh-text)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          minHeight: "100vh",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        {/* Inject global responsive styles */}
        <style>{GLOBAL_STYLES}</style>

        {/* HERO / STUDENT OVERVIEW */}
        <HeroSection student={student} />

        {/* LEARNING JOURNEY: flow diagram + six stages */}
        <JourneySection />

        {/* FEATURES */}
        <section id="features" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Platform Features</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)", marginBottom: 16 }}>
                Everything You Need <span style={{ color: "#F97316" }}>To Learn</span>
              </h2>
              <p style={{ color: "var(--sh-text-sub)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                A complete ecosystem designed to take you from beginner to industry-ready professional.
              </p>
            </div>
            <Marquee duration={70} items={FEATURES.map(f => <FeatureCard key={f.title} f={f} />)} />
          </div>
        </section>

        {/* CONTINUE LEARNING */}
        <section id="courses" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.22)",
                    borderRadius: 99,
                    padding: "6px 16px",
                    marginBottom: 10,
                  }}
                >
                  <Flame size={12} color="#F97316" />
                  <span style={{ color: "#F97316", fontSize: 13, fontWeight: 500 }}>In Progress</span>
                </div>
                <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>Continue Learning</h2>
              </div>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#F97316",
                  background: "transparent",
                  border: "1px solid rgba(249,115,22,0.3)",
                  borderRadius: 10,
                  padding: "8px 16px",
                  fontWeight: 500,
                  fontSize: 13.5,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                View All <ChevronRight size={15} />
              </button>
            </div>
            <Marquee duration={40} items={COURSES.map(c => <CourseCard key={c.title} c={c} />)} />
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Your Path</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)", marginBottom: 16 }}>
                Study <span style={{ color: "#F97316" }}>Roadmap</span>
              </h2>
              <p style={{ color: "var(--sh-text-sub)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                Structured week-by-week learning path to keep you on track.
              </p>
            </div>
            <RoadmapSection />
          </div>
        </section>

        {/* LIVE CLASSES */}
        <section id="live" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Real-Time Learning</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
                Upcoming <span style={{ color: "#F97316" }}>Live Classes</span>
              </h2>
            </div>
            <Marquee duration={40} items={LIVE.map(sess => <LiveCard key={sess.title} sess={sess} />)} />
          </div>
        </section>

        {/* SKILL MAPPING */}
        <section id="skills" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-skill-grid">
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(249,115,22,0.08)",
                    border: "1px solid rgba(249,115,22,0.22)",
                    borderRadius: 99,
                    padding: "6px 16px",
                    marginBottom: 16,
                  }}
                >
                  <BrainCircuit size={13} color="#F97316" />
                  <span style={{ color: "#F97316", fontSize: 13, fontWeight: 500 }}>AI Analysis</span>
                </div>
                <h2
                  className="sh-section-h2"
                  style={{ color: "var(--sh-text)", marginBottom: 14 }}
                >
                  Your <span style={{ color: "#F97316" }}>Skill Map</span>
                </h2>
                <p style={{ color: "var(--sh-text-sub)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                  AI-driven analysis of your skill proficiency based on quizzes, assignments, and coding performance.
                </p>
                <button
                  style={{
                    background: "#F97316",
                    color: "#fff",
                    border: "none",
                    borderRadius: 14,
                    padding: "12px 22px",
                    fontWeight: 500,
                    fontSize: 14.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    boxShadow: "0 6px 24px rgba(249,115,22,0.35)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  <BarChart3 size={16} /> View Full Analysis
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {SKILLS.map(sk => (
                  <div key={sk.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ color: "var(--sh-text)", fontWeight: 500, fontSize: 15 }}>{sk.name}</span>
                      <span style={{ color: sk.color, fontWeight: 500, fontSize: 15, fontFamily: "'Space Grotesk', sans-serif" }}>{sk.pct}%</span>
                    </div>
                    <ProgressBar value={sk.pct} color={sk.color} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CODING LAB */}
        <section id="coding" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Practice Arena</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
                Today's <span style={{ color: "#F97316" }}>Coding Challenge</span>
              </h2>
            </div>
            <CodingLab />
          </div>
        </section>

        {/* ASSESSMENTS */}
        <section id="quizzes" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Test Your Knowledge</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
                Assessments <span style={{ color: "#F97316" }}>&amp; Quizzes</span>
              </h2>
            </div>
            <Marquee duration={40} items={QUIZZES.map(q => <QuizCard key={q.title} q={q} />)} />
          </div>
        </section>

        {/* TRAINERS */}
        <section id="trainers" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Expert Mentors</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)", marginBottom: 16 }}>
                Connect With <span style={{ color: "#F97316" }}>Your Trainers</span>
              </h2>
              <p style={{ color: "var(--sh-text-sub)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                Get direct access to industry professionals who guide your learning journey.
              </p>
            </div>
            <Marquee duration={40} items={TRAINERS.map(tr => <TrainerCard key={tr.name} tr={tr} />)} />
          </div>
        </section>

        {/* RESOURCES */}
        <section id="resources" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Study Material</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)", marginBottom: 16 }}>
                Learning <span style={{ color: "#F97316" }}>Resources</span>
              </h2>
              <p style={{ color: "var(--sh-text-sub)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                Everything you need to revise, practice and excel.
              </p>
            </div>
            <Marquee duration={48} items={RESOURCES.map(r => <ResourceCard key={r.title} r={r} />)} />
          </div>
        </section>

        {/* CERTIFICATES */}
        <section id="certs" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Achievements</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
                Your <span style={{ color: "#F97316" }}>Certificates</span>
              </h2>
            </div>
            <div className="sh-cert-grid">
              {CERTS.map(c => <CertCard key={c.title} c={c} />)}
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section id="activity" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
          <div className="sh-inner">
            <div className="sh-head" style={{ textAlign: "center" }}>
              <SecBadge>Timeline</SecBadge>
              <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
                Recent <span style={{ color: "#F97316" }}>Activity</span>
              </h2>
            </div>
            <div style={{ maxWidth: "none", margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {ACTIVITIES.map(a => <ActivityRow key={a.text} a={a} />)}
            </div>
          </div>
        </section>

        {/* CTA BANNER (compact, same as Trainer / Manager Hub) */}
        <div id="cta" className="sh-cta2">
          <div className="sh-inner sh-cta2-in">
            <div className="sh-cta2-txt">
              <h2>Ready To Become <span style={{ color: "#F97316" }}>Industry Ready?</span></h2>
              <p>Join thousands of learners accelerating their careers with ILM ORA's complete learning ecosystem.</p>
            </div>
            <div className="sh-cta-btns">
              <button onClick={goTo("courses")} style={{ background: "#F97316", color: "#fff", border: "none", borderRadius: 12, padding: "11px 22px", fontWeight: 500, fontSize: 14.5, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                <Play size={15} fill="white" stroke="none" /> Continue Learning
              </button>
              <button onClick={goTo("features")} style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 12, padding: "11px 22px", fontWeight: 500, fontSize: 14.5, cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Explore Courses
              </button>
            </div>
          </div>
        </div>

      </div>
    </PublicLayout>
  );
}

// ─── HERO / STUDENT OVERVIEW ──────────────────────────────────────────────────
const goTo = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const ACTIONS = [
  { color: "#F97316", icon: <Play size={20} />,       title: "Continue Learning",        desc: "Pick up your courses where you left off.", to: "courses", primary: true },
  { color: "#3b82f6", icon: <Route size={20} />,      title: "View My Learning Journey", desc: "See all six stages and what to do next.",  to: "journey" },
  { color: "#ef4444", icon: <Video size={20} />,      title: "Upcoming Live Classes",    desc: "Join or set reminders for live sessions.", to: "live" },
  { color: "#8b5cf6", icon: <BarChart3 size={20} />,  title: "Track My Progress",        desc: "Review your skill map and activity.",      to: "skills" },
];

function HeroSection({ student }) {
  const s = student || {};
  // Only real data is shown; nothing is invented.
  const items = [];
  if (s.course?.title && s.course?.progress != null)
    items.push({ color: "#F97316", icon: <BookOpen size={13} />, label: "Current course", title: s.course.title, sub: `${s.course.progress}% complete`, bar: s.course.progress });
  if (s.nextTopic)
    items.push({ color: "#3b82f6", icon: <Route size={13} />, label: "Next roadmap topic", title: s.nextTopic, sub: "Study Roadmap" });
  if (s.nextClass?.title)
    items.push({ color: "#ef4444", icon: <Video size={13} />, label: "Next live class", title: s.nextClass.title, sub: s.nextClass.time });
  if (s.pendingAssessment?.title)
    items.push({ color: "#f59e0b", icon: <ClipboardCheck size={13} />, label: "Pending assessment", title: s.pendingAssessment.title, sub: "Not yet attempted" });

  return (
    <div id="top" className="sh-hero">
      <div className="sh-inner">
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.22)", borderRadius: 99, padding: "4px 12px", marginBottom: 10 }}>
          <LayoutDashboard size={13} color="#F97316" />
          <span style={{ color: "#F97316", fontSize: 12.5 }}>Student Dashboard</span>
        </div>
        <h1>Welcome Back, <span style={{ color: "#F97316" }}>{s.name || "Student"}</span></h1>
        <p className="sh-hero-sub">
          Continue your courses, follow your learning journey, attend live classes, practice your skills and track your progress — all from one place.
        </p>

        <nav className="sh-acts" aria-label="Quick actions">
          {ACTIONS.map(a => (
            <a key={a.title} href={`#${a.to}`} onClick={goTo(a.to)} className={`sh-ac${a.primary ? " primary" : ""}`} style={{ "--c": a.color }}>
              <span className="sh-ico" aria-hidden="true">{a.icon}</span>
              <div><h3>{a.title}</h3><p>{a.desc}</p></div>
              <span className="go">Open <ArrowRight size={13} /></span>
            </a>
          ))}
        </nav>

        <div className="sh-ov" role="region" aria-labelledby="sh-ov-t">
          <h2 id="sh-ov-t" className="sh-ov-h">Where you are right now</h2>
          {items.length ? (
            <div className="sh-ov-g">
              {items.map(it => (
                <div key={it.label} className="sh-ovi" style={{ "--c": it.color }}>
                  <small>{it.icon}{it.label}</small>
                  <strong>{it.title}</strong>
                  {it.sub && <em>{it.sub}</em>}
                  {it.bar != null && <ProgressBar value={it.bar} color={it.color} />}
                </div>
              ))}
            </div>
          ) : (
            <div className="sh-ov-empty">
              <span className="sh-ico" style={{ "--c": "#F97316" }}><Compass size={20} /></span>
              <p style={{ margin: 0 }}>Your current course, next roadmap topic, upcoming class and pending assessments will appear here as soon as you start learning.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── LEARNING JOURNEY (flow diagram + six stages) ─────────────────────────────
const JOURNEY = [
  { n: 1, color: "#F97316", icon: <Compass size={20} />,  title: "Explore & Discover", short: "See what the Hub offers", doit: "See what the Hub offers — live classes, labs, mentors and AI tools.", get: "Know exactly where to start and what's available to you.", links: [["Overview", "top"], ["Platform Features", "features"]] },
  { n: 2, color: "#3b82f6", icon: <Route size={20} />,    title: "Choose & Plan", short: "Pick a course & roadmap", doit: "Pick a course and follow a week-by-week study roadmap.", get: "A clear, personalized path so you never wonder what's next.", links: [["Continue Learning", "courses"], ["Study Roadmap", "roadmap"]] },
  { n: 3, color: "#14b8a6", icon: <BookOpen size={20} />, title: "Learn with Resources & Mentors", short: "Notes, live classes, trainers", doit: "Study notes and videos, join live classes, and chat with trainers.", get: "Concepts clarified fast with expert guidance and on-demand material.", links: [["Resources", "resources"], ["Live Classes", "live"], ["Trainers", "trainers"]] },
  { n: 4, color: "#22c55e", icon: <Code2 size={20} />,    title: "Practice & Test Skills", short: "Coding lab & quizzes", doit: "Solve coding challenges and take quizzes and assessments.", get: "Turn knowledge into skill and spot weak areas early.", links: [["Coding Lab", "coding"], ["Quizzes", "quizzes"]] },
  { n: 5, color: "#8b5cf6", icon: <BarChart3 size={20} />, title: "Track & Improve", short: "Skill map & progress", doit: "Review your skill map, activity, course progress and roadmap status.", get: "Data-driven focus on what to improve next.", links: [["Skill Map", "skills"], ["Activity", "activity"]] },
  { n: 6, color: "#ec4899", icon: <Trophy size={20} />,   title: "Achieve & Move Forward", short: "Certificates & next goal", doit: "Complete courses, earn certificates and start the next goal.", get: "Verifiable proof of skills and momentum toward your career.", links: [["Certificates", "certs"], ["Next Step", "cta"]] },
];

function JourneySection() {
  return (
    <section id="journey" className="sh-section" style={{ background: "var(--sh-page-bg)" }}>
      <div className="sh-inner">
        <div className="sh-head">
          <SecBadge>Your Learning Journey</SecBadge>
          <h2 className="sh-section-h2" style={{ color: "var(--sh-text)" }}>
            Six Steps From <span style={{ color: "#F97316" }}>Curious To Certified</span>
          </h2>
          <p style={{ color: "var(--sh-text-sub)", maxWidth: 560, margin: "0 auto" }}>
            Follow the flow — each stage links to the Student Hub tools you need, so you always know what to do next.
          </p>
        </div>

        {/* Visual flow diagram */}
        <div className="sh-flow" role="group" aria-labelledby="sh-flow-t">
          <div className="sh-flow-h"><h3 id="sh-flow-t">Your journey at a glance</h3><span>Tap a stage to jump to its details</span></div>
          <ol className="sh-flow-grid" aria-label="Six-stage learning journey with a feedback loop from Track and Improve back to Learn and Practice">
            {JOURNEY.map(j => (
              <li key={j.n} className="sh-fn" style={{ "--c": j.color }}>
                <a href={`#stage-${j.n}`} onClick={goTo(`stage-${j.n}`)} aria-label={`Stage ${j.n} of 6: ${j.title}. ${j.short}.`}>
                  <span className="sh-fn-num" aria-hidden="true">Stage {j.n}</span>
                  <span className="sh-ico" aria-hidden="true">{j.icon}</span>
                  <span>
                    <span className="sh-fn-t">{j.title}</span>
                    <span className="sh-fn-s">{j.short}</span>
                    {j.n === 5 && <span className="sh-fn-chip" aria-hidden="true">↻ Loops back to 3 &amp; 4</span>}
                  </span>
                </a>
              </li>
            ))}
            <li className="sh-fl" aria-label="Feedback loop: from Track and Improve back to Learn and Practice">
              <span className="sh-fl-t l" aria-hidden="true" /><span className="sh-fl-t m" aria-hidden="true" /><span className="sh-fl-t r" aria-hidden="true" />
              <span className="sh-fl-lbl"><span aria-hidden="true">↻</span> Improve &amp; repeat: back to Learn / Practice</span>
              <span className="sh-fl-desc">Weak spots found in Track &amp; Improve (Stage 5) send you back to Learn (Stage 3) and Practice (Stage 4).</span>
            </li>
          </ol>
        </div>

        {/* Six detailed stages */}
        <ol className="sh-jr-list">
          {JOURNEY.map(j => (
            <li key={j.n} className="sh-jr" id={`stage-${j.n}`}>
              <span className="sh-jr-dot">{j.n}</span>
              <article className="sh-jr-card" style={{ "--c": j.color }}>
                <div className="sh-jr-top"><span className="sh-ico" style={{ width: 38, height: 38 }}>{j.icon}</span><span className="sh-jr-n">Stage {j.n}</span></div>
                <h3>{j.title}</h3>
                <dl>
                  <div><dt>You do</dt><dd>{j.doit}</dd></div>
                  <div><dt>You get</dt><dd>{j.get}</dd></div>
                </dl>
                <div className="sh-jr-links">
                  {j.links.map(([label, id]) => (
                    <a key={id} href={`#${id}`} onClick={goTo(id)}>{label} <ChevronRight size={12} /></a>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
        <p className="sh-jr-loop"><b>It's a loop, not a line.</b> Weak spots found in <b>Track &amp; Improve</b> send you back to Learn and Practice — then you move forward again.</p>
      </div>
    </section>
  );
}

// ─── CARD COMPONENTS ──────────────────────────────────────────────────────────
function FeatureCard({ f }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="sh-card sh-pc"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(145deg,${f.color}18 0%,var(--sh-card-bg) 60%)`
          : `linear-gradient(145deg,${f.color}0d 0%,var(--sh-card-bg) 55%)`,
        border: `1.5px solid ${hovered ? f.color + "60" : f.color + "28"}`,
        borderTop: `3px solid ${f.color}`,
        borderRadius: 18,
        padding: "18px 18px",
        boxShadow: hovered ? `0 12px 36px ${f.color}28` : `0 2px 12px ${f.color}12`,
        transform: hovered ? "translateY(-5px)" : "none",
        transition: "all 0.25s",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute", top: -20, right: -20,
          width: 80, height: 80,
          borderRadius: "50%",
          background: `${f.color}14`,
          filter: "blur(20px)",
          pointerEvents: "none",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          width: 52, height: 52,
          borderRadius: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 16,
          background: `linear-gradient(135deg,${f.color}28,${f.color}14)`,
          border: `1.5px solid ${f.color}40`,
          color: f.color,
          boxShadow: `0 4px 14px ${f.color}22`,
          flexShrink: 0,
        }}
      >
        {f.icon}
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 500, color: f.color, marginBottom: 8, letterSpacing: "-0.02em" }}>{f.title}</h3>
      <p style={{ fontSize: 13.5, color: "var(--sh-text-sub)", lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
    </div>
  );
}

function CourseCard({ c }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="sh-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--sh-card-bg)",
        border: `1px solid ${hovered ? c.color + "40" : "var(--sh-border)"}`,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: hovered ? `0 10px 36px ${c.color}18` : "var(--sh-shadow)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.25s",
      }}
    >
      <div
        className="sh-cc-top"
        style={{
          height: 120,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 52,
          background: `linear-gradient(135deg,${c.color}18,${c.color}08)`,
        }}
      >
        <TechLogo name={c.logo} size={64} fallback={c.thumb} />
      </div>
      <div className="sh-cc-in" style={{ padding: "20px 22px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 6 }}>
          <span style={{ background: `${c.color}18`, color: c.color, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 500 }}>{c.tag}</span>
          <span style={{ color: c.color, fontWeight: 500, fontSize: 15, fontFamily: "'Space Grotesk', sans-serif" }}>{c.progress}%</span>
        </div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16.5, fontWeight: 500, color: "var(--sh-text)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>{c.title}</h3>
        <ProgressBar value={c.progress} color={c.color} />
        <button
          style={{
            width: "100%", marginTop: 18,
            background: c.color, color: "#fff",
            border: "none", borderRadius: 12, padding: 11,
            fontWeight: 500, fontSize: 14, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          <Play size={15} fill="white" stroke="none" /> Continue
        </button>
      </div>
    </div>
  );
}

function RoadmapSection() {
  return (
    <div style={{ maxWidth: "none", margin: 0, position: "relative" }}>
      {/* Vertical connector line */}
      <div
        className="sh-rm-line"
        style={{
          position: "absolute",
          left: 23, top: 24, bottom: 24,
          width: 2,
          background: "linear-gradient(to bottom, #F97316, var(--sh-border))",
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ROADMAP.map(r => {
          const done   = r.status === "done";
          const cur    = r.status === "current";
          const locked = r.status === "locked";

          const dotBg     = done ? "#F97316" : cur ? "rgba(249,115,22,0.12)" : "var(--sh-icon-bg)";
          const dotBorder = done || cur ? "#F97316" : "var(--sh-border)";
          const dotShadow = done ? "0 0 0 4px rgba(249,115,22,0.18)" : cur ? "0 0 0 6px rgba(249,115,22,0.1)" : "none";
          const statusLabel = done ? "✓ Done" : cur ? "→ Active" : "🔒 Locked";
          const statusStyle = done
            ? { background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }
            : cur
            ? { background: "rgba(249,115,22,0.12)", color: "#F97316", border: "1px solid rgba(249,115,22,0.25)" }
            : { background: "var(--sh-pill-bg)", color: "var(--sh-text-muted)", border: "1px solid var(--sh-border)" };

          return (
            <div key={r.topic} className="sh-roadmap-item">
              {/* Dot */}
              <div
                className="sh-rm-dot"
                style={{
                  width: 48, height: 48,
                  borderRadius: "50%",
                  flexShrink: 0,
                  zIndex: 1,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: dotBg,
                  border: `2px solid ${dotBorder}`,
                  boxShadow: dotShadow,
                }}
              >
                {done   ? <CheckCircle2 size={20} color="white" />              : null}
                {cur    ? <ArrowRight size={20} color="#F97316" />               : null}
                {locked ? <Lock size={16} color="var(--sh-text-muted)" />       : null}
              </div>

              {/* Card */}
              <div
                style={{
                  flex: 1,
                  background: "var(--sh-card-bg)",
                  border: `1px solid ${cur ? "rgba(249,115,22,0.35)" : "var(--sh-border)"}`,
                  borderRadius: 14,
                  padding: "16px 20px",
                  boxShadow: cur ? "0 4px 20px rgba(249,115,22,0.15)" : "var(--sh-shadow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 10,
                  opacity: locked ? 0.55 : 1,
                  minWidth: 0,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: "var(--sh-text-muted)", fontWeight: 500, marginBottom: 3, letterSpacing: "0.04em", textTransform: "uppercase" }}>{r.week}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 500, color: "var(--sh-text)", letterSpacing: "-0.02em" }}>{r.topic}</div>
                </div>
                <div style={{ ...statusStyle, borderRadius: 99, padding: "4px 12px", fontSize: 11.5, fontWeight: 500, flexShrink: 0 }}>
                  {statusLabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LiveCard({ sess }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="sh-card sh-pc"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--sh-card-bg)",
        border: `1px solid ${hovered ? sess.color + "40" : "var(--sh-border)"}`,
        borderRadius: 18,
        padding: 24,
        boxShadow: hovered ? `0 10px 32px ${sess.color}18` : "var(--sh-shadow)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.25s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div
          style={{
            width: 48, height: 48,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 500, fontSize: 14,
            flexShrink: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            background: `${sess.color}20`,
            border: `2px solid ${sess.color}40`,
            color: sess.color,
          }}
        >
          <TechLogo name={sess.logo} size={32} fallback={sess.avatar} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {sess.live && (
            <div
              style={{
                background: "rgba(239,68,68,0.12)",
                color: "#ef4444",
                fontSize: 10.5, fontWeight: 500,
                padding: "2px 8px",
                borderRadius: 99,
                display: "inline-flex", alignItems: "center", gap: 4,
                marginBottom: 5,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "shPulse 1.4s infinite", display: "inline-block" }} />
              LIVE
            </div>
          )}
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 500, color: "var(--sh-text)", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{sess.title}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--sh-text-muted)", fontSize: 13 }}>
            <Calendar size={13} /> {sess.time}
          </div>
          <div style={{ fontSize: 12, color: "var(--sh-text-sub)", marginTop: 4 }}>Trainer: {sess.trainer}</div>
        </div>
      </div>
      <button
        style={{
          width: "100%", marginTop: 18,
          background: sess.live ? "#ef4444" : sess.color,
          color: "#fff",
          border: "none", borderRadius: 12, padding: 11,
          fontWeight: 500, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <Play size={15} fill="white" stroke="none" /> {sess.live ? "Join Now" : "Set Reminder"}
      </button>
    </div>
  );
}

function QuizCard({ q }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="sh-card sh-pc"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--sh-card-bg)",
        border: `1px solid ${hovered ? q.color + "40" : "var(--sh-border)"}`,
        borderRadius: 18,
        padding: 24,
        boxShadow: hovered ? `0 8px 28px ${q.color}18` : "var(--sh-shadow)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "all 0.25s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ background: `${q.color}18`, border: `1px solid ${q.color}28`, borderRadius: 10, padding: 10, display: "flex", color: q.color }}>
          <TechLogo name={q.logo} size={30} fallback={<ClipboardCheck size={20} />} />
        </div>
        {q.status === "completed"
          ? <span style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 8, padding: "4px 10px", fontSize: 11.5, fontWeight: 500 }}>✓ Done</span>
          : <span style={{ background: "var(--sh-pill-bg)", color: "var(--sh-text-muted)", border: "1px solid var(--sh-border)", borderRadius: 8, padding: "4px 10px", fontSize: 11.5, fontWeight: 500 }}>Pending</span>
        }
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 500, color: "var(--sh-text)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{q.title}</h3>
      <p style={{ fontSize: 13, color: "var(--sh-text-sub)", margin: "0 0 16px" }}>{q.questions} Questions</p>
      {q.score !== null && (
        <div style={{ background: `${q.color}12`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--sh-text-sub)" }}>Your Score</span>
          <span style={{ fontSize: 18, fontWeight: 500, color: q.color, fontFamily: "'Space Grotesk', sans-serif" }}>{q.score}%</span>
        </div>
      )}
      <button
        style={{
          width: "100%",
          background: q.status === "completed" ? "transparent" : q.color,
          color: q.status === "completed" ? q.color : "#fff",
          border: `1.5px solid ${q.color}`,
          borderRadius: 11, padding: 10,
          fontWeight: 500, fontSize: 14, cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {q.status === "completed" ? "Retake Quiz" : "Attempt Now"}
      </button>
    </div>
  );
}

function TrainerCard({ tr }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="sh-card sh-pc"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--sh-card-bg)",
        border: `1px solid ${hovered ? tr.color + "40" : "var(--sh-border)"}`,
        borderRadius: 20,
        padding: "20px 18px",
        textAlign: "center",
        boxShadow: hovered ? `0 12px 40px ${tr.color}18` : "var(--sh-shadow)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.25s",
      }}
    >
      <div
        style={{
          width: 72, height: 72,
          borderRadius: "50%",
          margin: "0 auto 16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 500, fontSize: 22,
          fontFamily: "'Space Grotesk', sans-serif",
          background: `${tr.color}22`,
          border: `3px solid ${tr.color}50`,
          color: tr.color,
        }}
      >
        {tr.initials}
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 500, color: "var(--sh-text)", marginBottom: 4, letterSpacing: "-0.02em" }}>{tr.name}</div>
      <div style={{ fontSize: 13.5, color: "var(--sh-text-sub)", marginBottom: 6 }}>{tr.role}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--sh-text-muted)", display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {tr.exp} exp</span>
        <span style={{ color: "#f59e0b", fontSize: 12.5, fontWeight: 500, fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", gap: 3 }}><Star size={12} fill="#f59e0b" stroke="none" /> {tr.rating}</span>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          style={{
            flex: 1, border: "none", borderRadius: 10, padding: 10,
            fontWeight: 500, fontSize: 13.5, cursor: "pointer",
            background: tr.color, color: "#fff",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <MessageCircle size={14} /> Chat
        </button>
        <button
          style={{
            flex: 1, background: "transparent",
            border: `1.5px solid ${tr.color}`,
            borderRadius: 10, padding: 10,
            fontWeight: 500, fontSize: 13.5, cursor: "pointer",
            color: tr.color,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <Calendar size={14} /> Schedule
        </button>
      </div>
    </div>
  );
}

function ResourceCard({ r }) {
  return (
    <div className="sh-card sh-res" style={{ "--c": r.color }}>
      <div className="sh-res-top">
        <span className="sh-res-ico">{r.icon}</span>
        <span className="sh-res-tag">{r.tag}</span>
      </div>
      <h3 className="sh-res-t">{r.title}</h3>
      <p className="sh-res-d">{r.desc}</p>
      <div className="sh-res-go">View All <ChevronRight size={14} /></div>
    </div>
  );
}

function CertCard({ c }) {
  return (
    <div
      className="sh-card"
      style={{
        background: "var(--sh-card-bg)",
        border: `2px solid ${c.status === "earned" ? c.color + "40" : "var(--sh-border)"}`,
        borderRadius: 20,
        padding: "20px 20px",
        position: "relative",
        overflow: "hidden",
        boxShadow: c.status === "earned" ? `0 8px 32px ${c.color}20` : "var(--sh-shadow)",
      }}
    >
      {c.status === "earned" && (
        <div style={{ position: "absolute", top: -18, right: -18, width: 80, height: 80, borderRadius: "50%", background: `${c.color}15`, pointerEvents: "none" }} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div style={{ background: `${c.color}18`, border: `1.5px solid ${c.color}30`, borderRadius: 14, padding: 12, color: c.color, flexShrink: 0 }}>
          <Award size={26} />
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 500, color: "var(--sh-text)", margin: "0 0 3px", letterSpacing: "-0.02em" }}>{c.title}</h3>
          <div style={{ fontSize: 12.5, color: "var(--sh-text-muted)" }}>{c.date}</div>
        </div>
      </div>
      {c.status === "earned" && (
        <div
          style={{
            background: `${c.color}10`,
            borderRadius: 12,
            padding: "10px 14px",
            marginBottom: 16,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}
        >
          <span style={{ fontSize: 13, color: "var(--sh-text-sub)" }}>Final Grade</span>
          <span style={{ fontSize: 20, fontWeight: 500, color: c.color, fontFamily: "'Space Grotesk', sans-serif" }}>{c.grade}</span>
        </div>
      )}
      <button
        style={{
          width: "100%",
          background: c.status === "earned" ? c.color : "transparent",
          color: c.status === "earned" ? "#fff" : "var(--sh-text-muted)",
          border: `1.5px solid ${c.status === "earned" ? c.color : "var(--sh-border)"}`,
          borderRadius: 11, padding: 11,
          fontWeight: 500, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {c.status === "earned"
          ? <><Download size={15} /> Download Certificate</>
          : <><Lock size={15} /> Complete Course</>
        }
      </button>
    </div>
  );
}

function ActivityRow({ a }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="sh-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--sh-card-bg)",
        border: `1px solid ${hovered ? "rgba(249,115,22,0.3)" : "var(--sh-border)"}`,
        borderRadius: 14,
        padding: "16px 20px",
        display: "flex", alignItems: "center", gap: 16,
        boxShadow: "var(--sh-shadow)",
        transition: "border-color 0.2s",
      }}
    >
      <div
        style={{
          borderRadius: 10, padding: 9,
          flexShrink: 0, display: "flex",
          background: `${a.iconColor}14`,
          border: `1px solid ${a.iconColor}28`,
          color: a.iconColor,
        }}
      >
        {a.icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 500, color: "var(--sh-text)", letterSpacing: "-0.01em" }}>{a.text}</div>
        <div style={{ fontSize: 12, color: "var(--sh-text-muted)", marginTop: 2 }}>{a.sub}</div>
      </div>
    </div>
  );
}

function CodingLab() {
  return (
    <div style={{ maxWidth: "none", margin: 0 }}>
      <div
        style={{
          background: "var(--sh-card-bg)",
          border: "1px solid var(--sh-border)",
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "var(--sh-shadow)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid var(--sh-border)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div style={{ background: "rgba(249,115,22,0.12)", borderRadius: 10, padding: 8, display: "flex", color: "#F97316", flexShrink: 0 }}>
              <Code2 size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: 17, color: "var(--sh-text)", letterSpacing: "-0.02em" }}>Reverse Linked List</div>
              <div style={{ fontSize: 12, color: "var(--sh-text-muted)", marginTop: 2 }}>Data Structures • Linked Lists</div>
            </div>
          </div>
          <span
            style={{
              background: "rgba(245,158,11,0.12)",
              color: "#f59e0b",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: 8, padding: "5px 12px",
              fontSize: 12.5, fontWeight: 500,
              display: "flex", alignItems: "center", gap: 5,
              flexShrink: 0,
            }}
          >
            <Zap size={13} /> Medium
          </span>
        </div>

        {/* Code block */}
        <div
          style={{
            background: "#1e2329",
            padding: "clamp(16px,3vw,24px)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(11px,1.5vw,13.5px)",
            lineHeight: 1.7,
            overflowX: "auto",
          }}
        >
          {[
            ["1",  <><span style={{ color: "#8b949e" }}>// Reverse a Linked List</span></>],
            ["2",  <><span style={{ color: "#ff7b72" }}>class</span> <span style={{ color: "#79c0ff" }}>ListNode</span> {"{"}</>],
            ["3",  <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#ff7b72" }}>int</span> <span style={{ color: "#e6edf3" }}>val</span>;</span></>],
            ["4",  <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>next</span>;</span></>],
            ["5",  <span style={{ color: "#e6edf3" }}>{"}"}</span>],
            ["6",  ""],
            ["7",  <><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#d2a8ff" }}>reverse</span>(<span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>head</span>) {"{"}</>],
            ["8",  <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>prev</span> = <span style={{ color: "#ff7b72" }}>null</span>;</span></>],
            ["9",  <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>curr</span> = <span style={{ color: "#e6edf3" }}>head</span>;</span></>],
            ["10", <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#ff7b72" }}>while</span> (<span style={{ color: "#e6edf3" }}>curr</span> != <span style={{ color: "#ff7b72" }}>null</span>) {"{"}</span></>],
            ["11", <><span style={{ paddingLeft: 32, display: "inline-block" }}><span style={{ color: "#79c0ff" }}>ListNode</span> <span style={{ color: "#e6edf3" }}>next</span> = <span style={{ color: "#e6edf3" }}>curr.next</span>;</span></>],
            ["12", <><span style={{ paddingLeft: 32, display: "inline-block" }}><span style={{ color: "#e6edf3" }}>curr.next</span> = <span style={{ color: "#e6edf3" }}>prev</span>;</span></>],
            ["13", <><span style={{ paddingLeft: 32, display: "inline-block" }}><span style={{ color: "#e6edf3" }}>prev</span> = <span style={{ color: "#e6edf3" }}>curr</span>;</span></>],
            ["14", <><span style={{ paddingLeft: 32, display: "inline-block" }}><span style={{ color: "#e6edf3" }}>curr</span> = <span style={{ color: "#e6edf3" }}>next</span>;</span></>],
            ["15", <><span style={{ paddingLeft: 16, display: "inline-block" }}>{"}"}</span></>],
            ["16", <><span style={{ paddingLeft: 16, display: "inline-block" }}><span style={{ color: "#ff7b72" }}>return</span> <span style={{ color: "#e6edf3" }}>prev</span>;</span></>],
            ["17", "}"],
          ].map(([ln, content]) => (
            <div key={ln}>
              <span style={{ color: "#555", minWidth: 28, userSelect: "none", display: "inline-block" }}>{ln}</span>
              {content}
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: "20px 24px",
            borderTop: "1px solid var(--sh-border)",
            display: "flex", gap: 12,
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              flex: 1, minWidth: 140,
              background: "#F97316", color: "#fff",
              border: "none", borderRadius: 12, padding: 12,
              fontWeight: 500, fontSize: 14.5, cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}
          >
            <Play size={16} fill="white" stroke="none" /> Solve Now
          </button>
          <button
            style={{
              flex: 1, minWidth: 140,
              background: "transparent", color: "var(--sh-text)",
              border: "1.5px solid var(--sh-border)",
              borderRadius: 12, padding: 12,
              fontWeight: 500, fontSize: 14.5, cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            }}
          >
            <BookMarked size={16} /> View Solutions
          </button>
        </div>
      </div>
    </div>
  );
}