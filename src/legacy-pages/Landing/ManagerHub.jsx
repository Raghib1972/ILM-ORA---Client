// "use client";

// import { useState, useEffect, useRef, createContext, useContext } from "react";
// import {
//   LayoutDashboard, Package, Users, GraduationCap, Video,
//   BarChart2, FolderOpen, Award, Rocket, MessageSquare,
//   Settings, ChevronRight, Sun, Moon, TrendingUp,
//   Star, Clock, Briefcase, BookOpen, FileText, Download,
//   Upload, Plus, CheckCircle2, Lock, ArrowRight,
//   Activity, Building2, ClipboardList, Workflow, PlayCircle,
//   Calendar, Edit2, Search, Shield,
// } from "lucide-react";
// import authService from "../../services/authService";
// import { registerFcmToken } from "../../services/firebaseService";
// // ✅ Same shared shell used by every other public page (Careers, About,
// // Pricing, Contact, FAQ, etc). Lives at src/pages/Landing/components/PublicLayout.
// // If ManagerHub.jsx lives somewhere other than alongside Careers.jsx,
// // adjust this relative path to point at the same PublicLayout file.
// import PublicLayout from "../Landing/components/PublicLayout";

// /* ═══════════════════════════════════════════════════════════════
//    THEME
// ═══════════════════════════════════════════════════════════════ */
// const DARK = {
//   pageBg: "#0a0a0a", cardBg: "#111111", sectionBg: "#0d0d0d",
//   heroBg: "#141414", border: "rgba(255,255,255,0.07)",
//   borderHov: "rgba(255,255,255,0.15)", text: "#ffffff",
//   textSub: "rgba(255,255,255,0.55)", textMuted: "rgba(255,255,255,0.3)",
//   pillBg: "rgba(255,255,255,0.04)", iconBg: "rgba(255,255,255,0.06)",
//   barBg: "rgba(255,255,255,0.07)", shadow: "0 4px 20px rgba(0,0,0,0.4)",
//   navBg: "rgba(10,10,10,0.95)", btnBg: "rgba(255,255,255,0.07)",
// };
// const LIGHT = {
//   pageBg: "#F8F3EE", cardBg: "#ffffff", sectionBg: "#f2ece6",
//   heroBg: "#ffffff", border: "#e8e0d8", borderHov: "#d4c8be",
//   text: "#1E293B", textSub: "#64748b", textMuted: "#94a3b8",
//   pillBg: "#f1ede8", iconBg: "#fdf8f4", barBg: "#f1ede8",
//   shadow: "0 2px 12px rgba(0,0,0,0.07)", navBg: "rgba(255,255,255,0.95)",
//   btnBg: "#f3f4f6",
// };

// /* ═══════════════════════════════════════════════════════════════
//    THEME CONTEXT
// ═══════════════════════════════════════════════════════════════ */
// const ThemeContext = createContext(DARK);
// const useTheme = () => useContext(ThemeContext);

// /* ═══════════════════════════════════════════════════════════════
//    DATA
// ═══════════════════════════════════════════════════════════════ */
// const FEATURES = [
//   { color: "#F97316", icon: Package,      title: "Batch Management",    desc: "Create, edit, and manage multiple course batches with custom schedules, student quotas, and trainer assignments." },
//   { color: "#3b82f6", icon: Users,        title: "Student Management",  desc: "Enroll students, track progress, review scores, and manage their full learning journey end to end." },
//   { color: "#8b5cf6", icon: GraduationCap,title: "Trainer Assignment",  desc: "Assign, reassign, and review trainers per batch. Monitor session delivery and trainer performance." },
//   { color: "#22c55e", icon: Video,        title: "Live Session Control",desc: "Schedule and monitor live classes, review attendance, recordings, and session feedback in real time." },
//   { color: "#f59e0b", icon: ClipboardList,title: "Assessments & Quizzes",desc: "Create and assign quizzes, review scores, set passing criteria, and track batch-wise performance." },
//   { color: "#ec4899", icon: FolderOpen,   title: "Resource Upload",     desc: "Upload PDFs, videos, lecture slides, and assignments. Organise by batch, course, and topic." },
//   { color: "#14b8a6", icon: Award,        title: "Certificate Issuance",desc: "Generate and issue verifiable certificates to students who complete courses with passing grades." },
//   { color: "#f97316", icon: Rocket,       title: "Placement Tracking",  desc: "Track job placements, company tie-ups, offer details, and aggregate placement statistics." },
//   { color: "#6366f1", icon: BarChart2,    title: "Usage Analytics",     desc: "View real-time charts on enrollments, session attendance, resource downloads, and batch completion rates." },
//   { color: "#0ea5e9", icon: Building2,    title: "Department Control",  desc: "Manage departments, branches, and categories to keep your platform structure clean and scalable." },
//   { color: "#a855f7", icon: MessageSquare,title: "Feedback & Reports",  desc: "Collect structured feedback from students and trainers. Generate org-level reports with one click." },
//   { color: "#22c55e", icon: Settings,     title: "Org Settings",        desc: "Configure org name, branding, notification templates, admin roles, and platform-wide settings." },
// ];

// const BATCHES = [
//   { title: "Java Backend Batch 12",     students: 42, trainer: "Rahul S.", color: "#f97316", tag: "Backend",  progress: 68, status: "Active" },
//   { title: "React Development Batch 8", students: 35, trainer: "Priya M.", color: "#3b82f6", tag: "Frontend", progress: 45, status: "Active" },
//   { title: "AWS Fundamentals Batch 5",  students: 28, trainer: "Arjun K.", color: "#22c55e", tag: "Cloud",    progress: 30, status: "Active" },
// ];

// const TRAINERS = [
//   { name: "Rahul Sharma", role: "Java & Backend Expert",  exp: "8 yrs", initials: "RS", color: "#F97316", rating: 4.9, batches: 3, students: 128 },
//   { name: "Priya Mehta",  role: "React & Frontend Lead",  exp: "6 yrs", initials: "PM", color: "#3b82f6", rating: 4.8, batches: 2, students: 94  },
//   { name: "Arjun Kumar",  role: "AWS & DevOps Engineer",  exp: "7 yrs", initials: "AK", color: "#8b5cf6", rating: 4.9, batches: 2, students: 76  },
// ];

// const STUDENTS = [
//   { name: "Ayesha Khan", batch: "Java Batch 12",  progress: 82, quizzes: 7, status: "Active"    },
//   { name: "Rohan Mehta", batch: "React Batch 8",  progress: 60, quizzes: 5, status: "Active"    },
//   { name: "Sara Gupta",  batch: "AWS Batch 5",    progress: 44, quizzes: 3, status: "Active"    },
//   { name: "Aman Verma",  batch: "Java Batch 12",  progress: 91, quizzes: 8, status: "Completed" },
//   { name: "Pooja Singh", batch: "React Batch 8",  progress: 30, quizzes: 2, status: "At Risk"   },
// ];

// const SESSIONS = [
//   { title: "Java Backend Masterclass", time: "Today • 6:00 PM",    trainer: "Rahul S.", avatar: "RS", live: true,  color: "#ef4444", attendance: 38   },
//   { title: "React Workshop",           time: "Tomorrow • 7:00 PM", trainer: "Priya M.", avatar: "PM", live: false, color: "#3b82f6", attendance: null },
//   { title: "AWS Bootcamp",             time: "Wed • 5:00 PM",      trainer: "Arjun K.", avatar: "AK", live: false, color: "#8b5cf6", attendance: null },
// ];

// const SKILLS = [
//   { name: "Java",          pct: 78, color: "#f97316" },
//   { name: "React",         pct: 65, color: "#3b82f6" },
//   { name: "SQL",           pct: 72, color: "#8b5cf6" },
//   { name: "AWS",           pct: 48, color: "#22c55e" },
//   { name: "System Design", pct: 55, color: "#f59e0b" },
// ];

// const RESOURCES = [
//   { color: "#f97316", icon: FileText,     title: "PDF Notes Library", desc: "Topic-wise notes uploaded by trainers for offline revision.",        tag: "128 Files"    },
//   { color: "#3b82f6", icon: Video,        title: "Recorded Sessions", desc: "All past live sessions archived and accessible on demand.",           tag: "214 Videos"   },
//   { color: "#8b5cf6", icon: BookOpen,     title: "Video Lectures",    desc: "Curated video tutorials covering every concept in the syllabus.",     tag: "340 Lectures" },
//   { color: "#22c55e", icon: ClipboardList,title: "Assignments",       desc: "Practice assignments with test cases, rubrics, and grading.",         tag: "96 Tasks"     },
// ];

// const CERTS = [
//   { student: "Aman Verma",  course: "Java Backend Engineering", grade: "A+", date: "May 2025",    status: "Issued"  },
//   { student: "Rohan Mehta", course: "React Development",        grade: "B+", date: "Apr 2025",    status: "Issued"  },
//   { student: "Sara Gupta",  course: "AWS Fundamentals",         grade: "--", date: "In Progress", status: "Pending" },
//   { student: "Ayesha Khan", course: "Java Backend Engineering", grade: "--", date: "In Progress", status: "Pending" },
// ];

// const PLACEMENTS = [
//   { student: "Aman Verma",  batch: "Java Batch 11", company: "Infosys",     role: "Backend Dev",    package: "₹7.5L", status: "Joined"         },
//   { student: "Deepak Nair", batch: "React Batch 7", company: "TCS Digital", role: "Frontend Dev",   package: "₹6.8L", status: "Joined"         },
//   { student: "Sneha Rao",   batch: "Java Batch 10", company: "Wipro",       role: "Java Engineer",  package: "₹8.2L", status: "Offer Accepted" },
//   { student: "Aryan Das",   batch: "AWS Batch 4",   company: "HCL Cloud",   role: "Cloud Engineer", package: "₹9.5L", status: "Interviewing"   },
// ];

// const FEEDBACK = [
//   { name: "Ayesha K.", rating: 5, text: "Trainer Rahul explained Spring Boot in a very practical way.", batch: "Java 12" },
//   { name: "Rohan M.",  rating: 4, text: "React workshop was great. More coding exercises would help.",  batch: "React 8" },
//   { name: "Sara G.",   rating: 5, text: "AWS batch resources are very well organised. Loving it!",      batch: "AWS 5"   },
// ];

// const REPORTS = [
//   { icon: BarChart2,     title: "Monthly Enrollment Report",   desc: "All enrollments in the current month across batches."        },
//   { icon: GraduationCap, title: "Trainer Performance Report",  desc: "Session delivery, attendance, and feedback summary."         },
//   { icon: Rocket,        title: "Placement Statistics Report", desc: "Placement rates, companies, packages for the quarter."       },
//   { icon: ClipboardList, title: "Batch Completion Report",     desc: "Completion rates, quiz scores, and certifications."          },
// ];

// const ROADMAP = [
//   { step: "Step 1", title: "Create Batch & Set Schedule",           status: "done"    },
//   { step: "Step 2", title: "Assign Trainers & Students",            status: "done"    },
//   { step: "Step 3", title: "Upload Resources & Materials",          status: "current" },
//   { step: "Step 4", title: "Launch Live Sessions",                  status: "locked"  },
//   { step: "Step 5", title: "Review Progress & Assessments",         status: "locked"  },
//   { step: "Step 6", title: "Issue Certificates & Track Placements", status: "locked"  },
// ];

// const ACTIVITY_LOG = [
//   { event: "New Student Enrolled", user: "Ayesha Khan", module: "Java Backend Batch 12", time: "2 min ago",  status: "Success",   statusColor: "#22c55e" },
//   { event: "Trainer Assigned",     user: "Rahul S.",    module: "React Batch 8",          time: "18 min ago", status: "Done",      statusColor: "#22c55e" },
//   { event: "Resource Uploaded",    user: "Admin",       module: "Spring Boot Notes",       time: "1 hr ago",   status: "Published", statusColor: "#3b82f6" },
//   { event: "Certificate Issued",   user: "Rohan M.",    module: "Java Backend Batch 11",  time: "3 hr ago",   status: "Issued",    statusColor: "#f97316" },
//   { event: "Batch Created",        user: "Manager",     module: "AWS Batch 5",            time: "Yesterday",  status: "Active",    statusColor: "#22c55e" },
// ];

// const MONTHS      = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// const ENROLL_VALS = [82,96,74,110,138,122,145,160,143,178,192,210];

// /* ═══════════════════════════════════════════════════════════════
//    PAGES CONFIG
// ═══════════════════════════════════════════════════════════════ */
// const PAGES = [
//   { id: "home",         label: "Home",         icon: LayoutDashboard },
//   { id: "overview",     label: "Overview",     icon: Activity        },
//   { id: "batches",      label: "Batches",      icon: Package         },
//   { id: "trainers",     label: "Trainers",     icon: GraduationCap   },
//   { id: "students",     label: "Students",     icon: Users           },
//   { id: "sessions",     label: "Sessions",     icon: Video           },
//   { id: "analytics",    label: "Analytics",    icon: BarChart2       },
//   { id: "resources",    label: "Resources",    icon: FolderOpen      },
//   { id: "certificates", label: "Certificates", icon: Award           },
//   { id: "placements",   label: "Placements",   icon: Rocket          },
//   { id: "feedback",     label: "Feedback",     icon: MessageSquare   },
//   { id: "workflow",     label: "Workflow",     icon: Workflow        },
// ];

// /* ═══════════════════════════════════════════════════════════════
//    HELPERS
// ═══════════════════════════════════════════════════════════════ */
// const hex2rgba = (hex, a) => {
//   const r = parseInt(hex.slice(1,3),16);
//   const g = parseInt(hex.slice(3,5),16);
//   const b = parseInt(hex.slice(5,7),16);
//   return `rgba(${r},${g},${b},${a})`;
// };

// function useWindowWidth() {
//   const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
//   useEffect(() => {
//     const handler = () => setW(window.innerWidth);
//     window.addEventListener("resize", handler);
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//   return w;
// }

// /* ═══════════════════════════════════════════════════════════════
//    SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════════════════ */
// function ProgressBar({ pct, color }) {
//   const t = useTheme();
//   const [width, setWidth] = useState(0);
//   useEffect(() => {
//     const id = setTimeout(() => setWidth(pct), 300);
//     return () => clearTimeout(id);
//   }, [pct]);
//   return (
//     <div style={{ background: t.barBg, borderRadius:99, height:8, overflow:"hidden", width:"100%" }}>
//       <div style={{ height:"100%", borderRadius:99, background:color, width:`${width}%`, transition:"width 1.2s cubic-bezier(.4,0,.2,1)" }} />
//     </div>
//   );
// }

// function Pill({ label, color }) {
//   return (
//     <span style={{
//       display:"inline-flex", alignItems:"center", borderRadius:99,
//       padding:"3px 10px", fontSize:11, fontWeight:700,
//       background:hex2rgba(color,0.12), color, whiteSpace:"nowrap"
//     }}>{label}</span>
//   );
// }

// function Badge({ label }) {
//   return (
//     <div style={{
//       display:"inline-flex", alignItems:"center", gap:6,
//       background:"rgba(249,115,22,0.08)", border:"1px solid rgba(249,115,22,0.22)",
//       borderRadius:99, padding:"6px 16px", marginBottom:16,
//       fontSize:13, fontWeight:600, color:"#f97316"
//     }}>{label}</div>
//   );
// }

// function SectionTitle({ badge, title, sub }) {
//   const t = useTheme();
//   return (
//     <div style={{ textAlign:"center", marginBottom:48 }}>
//       <Badge label={badge} />
//       <h2 style={{
//         fontFamily:"'Space Grotesk',sans-serif",
//         fontSize:"clamp(22px,4vw,38px)", fontWeight:700,
//         lineHeight:1.15, letterSpacing:"-.03em", color: t.text, marginBottom:14
//       }} dangerouslySetInnerHTML={{ __html: title }} />
//       {sub && <p style={{ color: t.textSub, fontSize:"clamp(14px,2vw,16px)", maxWidth:560, margin:"0 auto", lineHeight:1.7 }}>{sub}</p>}
//     </div>
//   );
// }

// function Card({ children, style={}, hover=true, onClick }) {
//   const t = useTheme();
//   const [hov, setHov] = useState(false);
//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => hover && setHov(true)}
//       onMouseLeave={() => hover && setHov(false)}
//       style={{
//         background: t.cardBg,
//         border:`1px solid ${hov ? t.borderHov : t.border}`,
//         borderRadius:18, padding:24, boxShadow: t.shadow,
//         transform: hover && hov ? "translateY(-3px)" : "none",
//         transition:"all .25s", cursor: onClick?"pointer":"default",
//         wordBreak:"break-word", ...style
//       }}
//     >{children}</div>
//   );
// }

// function StatCard({ icon:Icon, iconColor, value, label, trend, trendUp }) {
//   const t = useTheme();
//   return (
//     <div style={{
//       background: t.cardBg, border:`1px solid ${t.border}`,
//       borderRadius:16, padding:"18px 20px", boxShadow: t.shadow
//     }}>
//       <Icon size={26} color={iconColor||"#f97316"} style={{ marginBottom:8 }} />
//       <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(22px,3vw,28px)", fontWeight:700, color: t.text, letterSpacing:"-.03em" }}>{value}</div>
//       <div style={{ fontSize:13, color: t.textMuted, fontWeight:500, marginTop:4 }}>{label}</div>
//       {trend && (
//         <div style={{ fontSize:12, fontWeight:700, marginTop:8, color: trendUp===true?"#22c55e":trendUp===false?"#ef4444":"#f97316" }}>{trend}</div>
//       )}
//     </div>
//   );
// }

// function Avatar({ initials, color, size=48 }) {
//   return (
//     <div style={{
//       width:size, height:size, borderRadius:"50%",
//       display:"flex", alignItems:"center", justifyContent:"center",
//       background:hex2rgba(color,0.18), border:`2px solid ${hex2rgba(color,0.4)}`,
//       color, fontSize:size*0.3, fontWeight:800,
//       fontFamily:"'Space Grotesk',sans-serif", flexShrink:0
//     }}>{initials}</div>
//   );
// }

// function PageWrapper({ children }) {
//   const w = useWindowWidth();
//   const px = w < 640 ? "16px" : w < 900 ? "20px" : "clamp(16px,4vw,24px)";
//   const py = w < 640 ? "32px" : "clamp(40px,6vw,72px)";
//   return (
//     <div style={{ maxWidth:1200, margin:"0 auto", padding:`${py} ${px}` }}>
//       {children}
//     </div>
//   );
// }

// function ActivityTable({ w }) {
//   const t = useTheme();
//   const isMobile = w < 640;
//   if (isMobile) {
//     return (
//       <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"12px 16px" }}>
//         {ACTIVITY_LOG.map((row,i) => (
//           <div key={i} style={{ background: t.iconBg, borderRadius:12, padding:"12px 14px", border:`1px solid ${t.border}` }}>
//             <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
//               <span style={{ fontWeight:600, color: t.text, fontSize:13 }}>{row.event}</span>
//               <Pill label={row.status} color={row.statusColor} />
//             </div>
//             <div style={{ fontSize:12, color: t.textSub }}>{row.user} · {row.module}</div>
//             <div style={{ fontSize:11, color: t.textMuted, marginTop:4 }}>{row.time}</div>
//           </div>
//         ))}
//       </div>
//     );
//   }
//   return (
//     <div style={{ overflowX:"auto" }}>
//       <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
//         <thead>
//           <tr>{["Event","User","Module","Time","Status"].map(h=>(
//             <th key={h} style={{ color: t.textMuted, fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:".06em", padding:"10px 14px", borderBottom:`1px solid ${t.border}`, textAlign:"left" }}>{h}</th>
//           ))}</tr>
//         </thead>
//         <tbody>
//           {ACTIVITY_LOG.map((row,i)=>(
//             <tr key={i}
//               onMouseEnter={e=>e.currentTarget.style.background=t.iconBg}
//               onMouseLeave={e=>e.currentTarget.style.background=""}
//             >
//               <td style={{ padding:"13px 14px", borderBottom:`1px solid ${t.border}`, color: t.text }}>{row.event}</td>
//               <td style={{ padding:"13px 14px", borderBottom:`1px solid ${t.border}`, color: t.textSub }}>{row.user}</td>
//               <td style={{ padding:"13px 14px", borderBottom:`1px solid ${t.border}`, color: t.textSub }}>{row.module}</td>
//               <td style={{ padding:"13px 14px", borderBottom:`1px solid ${t.border}`, color: t.textMuted, whiteSpace:"nowrap" }}>{row.time}</td>
//               <td style={{ padding:"13px 14px", borderBottom:`1px solid ${t.border}` }}><Pill label={row.status} color={row.statusColor} /></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function EnrollmentChart() {
//   const t = useTheme();
//   const maxVal=220, W=580, H=180, pad=40, bW=32;
//   const gap=(W-pad*2-MONTHS.length*bW)/(MONTHS.length-1);
//   return (
//     <div style={{ background: t.cardBg, border:`1px solid ${t.border}`, borderRadius:18, padding:"clamp(16px,3vw,28px) clamp(12px,3vw,24px)", boxShadow: t.shadow }}>
//       <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"clamp(14px,2vw,17px)", color: t.text, marginBottom:4, letterSpacing:"-.02em" }}>Monthly Enrollments</div>
//       <div style={{ fontSize:12, color: t.textMuted, marginBottom:20 }}>New student enrollments per month (2025)</div>
//       <div style={{ overflowX:"auto" }}>
//         <svg viewBox={`0 0 ${W} ${H+24}`} style={{ width:"100%", minWidth:300 }}>
//           {MONTHS.map((m,i)=>{
//             const x=pad+i*(bW+gap);
//             const h2=Math.round((ENROLL_VALS[i]/maxVal)*(H-20));
//             const y=H-h2;
//             const hl=i>=9;
//             return (
//               <g key={m}>
//                 <rect x={x} y={y} width={bW} rx={5} height={h2} fill={hl?"#f97316":"rgba(249,115,22,0.32)"} />
//                 <text x={x+bW/2} y={H+14} textAnchor="middle" fill={t.textMuted} fontSize={10} fontFamily="Plus Jakarta Sans,sans-serif">{m}</text>
//                 {hl&&<text x={x+bW/2} y={y-6} textAnchor="middle" fill="#f97316" fontSize={10} fontWeight={700} fontFamily="Space Grotesk,sans-serif">{ENROLL_VALS[i]}</text>}
//               </g>
//             );
//           })}
//         </svg>
//       </div>
//     </div>
//   );
// }

// function RoadmapList() {
//   const t = useTheme();
//   return (
//     <div style={{ maxWidth:640, margin:"0 auto", position:"relative" }}>
//       <div style={{ position:"absolute", left:23, top:24, bottom:24, width:2, background:`linear-gradient(to bottom, #f97316, ${t.border})` }} />
//       <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
//         {ROADMAP.map((r,i)=>{
//           const done=r.status==="done", cur=r.status==="current", locked=r.status==="locked";
//           return (
//             <div key={i} style={{ display:"flex", alignItems:"center", gap:16, position:"relative" }}>
//               <div style={{
//                 width:48, height:48, borderRadius:"50%", flexShrink:0, zIndex:1,
//                 display:"flex", alignItems:"center", justifyContent:"center",
//                 background: done?"#f97316":cur?"rgba(249,115,22,.12)": t.iconBg,
//                 border:`2px solid ${done||cur?"#f97316": t.border}`,
//                 color: done?"#fff":cur?"#f97316": t.textMuted
//               }}>
//                 {done?<CheckCircle2 size={20}/>:cur?<ArrowRight size={20}/>:<Lock size={18}/>}
//               </div>
//               <div style={{
//                 flex:1, background: t.cardBg,
//                 border:`1px solid ${cur?"rgba(249,115,22,.35)": t.border}`,
//                 borderRadius:14, padding:"14px 18px",
//                 display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8,
//                 boxShadow: t.shadow, opacity:locked?0.55:1
//               }}>
//                 <div>
//                   <div style={{ fontSize:11, color: t.textMuted, fontWeight:600, marginBottom:2, letterSpacing:".04em", textTransform:"uppercase" }}>{r.step}</div>
//                   <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(13px,2vw,15px)", fontWeight:600, color: t.text, letterSpacing:"-.02em" }}>{r.title}</div>
//                 </div>
//                 {done&&<span style={{ background:"rgba(34,197,94,.12)", color:"#22c55e", border:"1px solid rgba(34,197,94,.25)", borderRadius:99, padding:"4px 10px", fontSize:11, fontWeight:700, display:"inline-flex", alignItems:"center", gap:4, flexShrink:0 }}><CheckCircle2 size={11}/> Done</span>}
//                 {cur&&<span style={{ background:"rgba(249,115,22,.12)", color:"#f97316", border:"1px solid rgba(249,115,22,.25)", borderRadius:99, padding:"4px 10px", fontSize:11, fontWeight:700, display:"inline-flex", alignItems:"center", gap:4, flexShrink:0 }}><ArrowRight size={11}/> Active</span>}
//                 {locked&&<span style={{ background: t.pillBg, color: t.textMuted, border:`1px solid ${t.border}`, borderRadius:99, padding:"4px 10px", fontSize:11, fontWeight:600, display:"inline-flex", alignItems:"center", gap:4, flexShrink:0 }}><Lock size={11}/> Locked</span>}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    CARD COMPONENTS
// ═══════════════════════════════════════════════════════════════ */
// function FeatureCard({ f }) {
//   const t = useTheme();
//   const [hov,setHov]=useState(false);
//   const Icon=f.icon;
//   return (
//     <div
//       onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
//       style={{
//         background: t.cardBg, borderRadius:18, padding:"22px 20px",
//         border:`1.5px solid ${hov?hex2rgba(f.color,0.4):hex2rgba(f.color,0.16)}`,
//         borderTop:`3px solid ${f.color}`,
//         boxShadow:hov?`0 12px 36px ${hex2rgba(f.color,0.18)}`:`0 2px 12px ${hex2rgba(f.color,0.07)}`,
//         transform:hov?"translateY(-5px)":"none",
//         transition:"all .25s", cursor:"pointer"
//       }}
//     >
//       <div style={{ width:48, height:48, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14, background:hex2rgba(f.color,0.12), border:`1.5px solid ${hex2rgba(f.color,0.3)}` }}>
//         <Icon size={22} color={f.color}/>
//       </div>
//       <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(14px,2vw,16px)", fontWeight:700, color:f.color, marginBottom:8, letterSpacing:"-.02em" }}>{f.title}</h3>
//       <p style={{ fontSize:"clamp(12px,1.5vw,13.5px)", color: t.textSub, lineHeight:1.65, margin:0 }}>{f.desc}</p>
//     </div>
//   );
// }

// function BatchCard({ b }) {
//   const t = useTheme();
//   const [hov,setHov]=useState(false);
//   return (
//     <div
//       onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
//       style={{
//         background: t.cardBg, borderRadius:18, overflow:"hidden",
//         border:`1px solid ${hov?hex2rgba(b.color,0.5):hex2rgba(b.color,0.28)}`,
//         boxShadow: t.shadow, transform:hov?"translateY(-3px)":"none", transition:"all .25s"
//       }}
//     >
//       <div style={{ height:80, display:"flex", alignItems:"center", justifyContent:"center", background:hex2rgba(b.color,0.12) }}>
//         <Package size={40} color={b.color}/>
//       </div>
//       <div style={{ padding:"16px 18px 20px" }}>
//         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8, flexWrap:"wrap", gap:6 }}>
//           <span style={{ background:hex2rgba(b.color,0.15), color:b.color, borderRadius:99, padding:"3px 10px", fontSize:11, fontWeight:700 }}>{b.tag}</span>
//           <div style={{ display:"flex", alignItems:"center", gap:6 }}>
//             <span style={{ background:"rgba(34,197,94,.12)", color:"#22c55e", borderRadius:99, padding:"3px 8px", fontSize:11, fontWeight:700 }}>{b.status}</span>
//             <span style={{ color:b.color, fontWeight:700, fontSize:14, fontFamily:"'Space Grotesk',sans-serif" }}>{b.progress}%</span>
//           </div>
//         </div>
//         <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(13px,2vw,15px)", fontWeight:600, color: t.text, margin:"0 0 5px", letterSpacing:"-.02em" }}>{b.title}</h3>
//         <div style={{ fontSize:12, color: t.textMuted, marginBottom:10 }}>Trainer: {b.trainer} · {b.students} students</div>
//         <ProgressBar pct={b.progress} color={b.color}/>
//         <div style={{ display:"flex", gap:8, marginTop:14 }}>
//           <button style={{ flex:1, background:b.color, color:"#fff", border:"none", borderRadius:10, padding:"8px 0", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Manage</button>
//           <button style={{ flex:1, background:"transparent", border:`1.5px solid ${b.color}`, color:b.color, borderRadius:10, padding:"8px 0", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>+ Assign</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TrainerCard({ tr }) {
//   const t = useTheme();
//   const [hov,setHov]=useState(false);
//   return (
//     <div
//       onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
//       style={{
//         background: t.cardBg, borderRadius:20, padding:"24px 20px",
//         border:`1px solid ${hov?hex2rgba(tr.color,0.4): t.border}`,
//         boxShadow: t.shadow, transform:hov?"translateY(-4px)":"none",
//         transition:"all .25s", textAlign:"center"
//       }}
//     >
//       <div style={{ display:"flex", justifyContent:"center" }}>
//         <Avatar initials={tr.initials} color={tr.color} size={68}/>
//       </div>
//       <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(15px,2vw,18px)", fontWeight:700, color: t.text, margin:"14px 0 4px", letterSpacing:"-.02em" }}>{tr.name}</div>
//       <div style={{ fontSize:13, color: t.textSub, marginBottom:8 }}>{tr.role}</div>
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:10, flexWrap:"wrap" }}>
//         <span style={{ fontSize:12, color: t.textMuted, display:"flex", alignItems:"center", gap:4 }}><Clock size={12}/> {tr.exp}</span>
//         <span style={{ color:"#f59e0b", fontSize:12.5, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif", display:"flex", alignItems:"center", gap:3 }}><Star size={12} fill="#f59e0b"/> {tr.rating}</span>
//       </div>
//       <div style={{ display:"flex", justifyContent:"center", gap:20, marginBottom:18 }}>
//         {[["Batches",tr.batches],["Students",tr.students]].map(([l,v])=>(
//           <div key={l} style={{ textAlign:"center" }}>
//             <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:700, color:tr.color }}>{v}</div>
//             <div style={{ fontSize:11, color: t.textMuted }}>{l}</div>
//           </div>
//         ))}
//       </div>
//       <div style={{ display:"flex", gap:8 }}>
//         <button style={{ flex:1, background:tr.color, color:"#fff", border:"none", borderRadius:10, padding:"9px 0", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Assign Batch</button>
//         <button style={{ flex:1, background:"transparent", border:`1.5px solid ${tr.color}`, color:tr.color, borderRadius:10, padding:"9px 0", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>View Profile</button>
//       </div>
//     </div>
//   );
// }

// function ResourceCard({ r }) {
//   const t = useTheme();
//   const [hov,setHov]=useState(false);
//   const Icon=r.icon;
//   return (
//     <div
//       onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
//       style={{
//         background: t.cardBg, borderRadius:18, padding:"20px 18px",
//         border:`1px solid ${hov?hex2rgba(r.color,0.4): t.border}`,
//         boxShadow: t.shadow, transform:hov?"translateY(-4px)":"none",
//         transition:"all .25s", cursor:"pointer"
//       }}
//     >
//       <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14, flexWrap:"wrap", gap:8 }}>
//         <div style={{ background:hex2rgba(r.color,0.12), border:`1px solid ${hex2rgba(r.color,0.22)}`, borderRadius:12, padding:10 }}>
//           <Icon size={20} color={r.color}/>
//         </div>
//         <span style={{ background:hex2rgba(r.color,0.1), color:r.color, fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:99 }}>{r.tag}</span>
//       </div>
//       <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(14px,2vw,16px)", fontWeight:600, color: t.text, marginBottom:8, letterSpacing:"-.02em" }}>{r.title}</h3>
//       <p style={{ fontSize:"clamp(12px,1.5vw,13.5px)", color: t.textSub, lineHeight:1.65, marginBottom:14 }}>{r.desc}</p>
//       <div style={{ display:"flex", gap:8 }}>
//         <button style={{ flex:1, background:r.color, color:"#fff", border:"none", borderRadius:10, padding:8, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:5 }}>
//           <Upload size={13}/> Upload
//         </button>
//         <button style={{ flex:1, background:"transparent", border:`1.5px solid ${r.color}`, color:r.color, borderRadius:10, padding:8, fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Manage</button>
//       </div>
//     </div>
//   );
// }

// function SessionCard({ s }) {
//   const t = useTheme();
//   const [hov,setHov]=useState(false);
//   return (
//     <div
//       onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
//       style={{
//         background: t.cardBg, borderRadius:18, padding:20,
//         border:`1px solid ${hov?hex2rgba(s.color,0.4): t.border}`,
//         boxShadow: t.shadow, transform:hov?"translateY(-3px)":"none", transition:"all .25s"
//       }}
//     >
//       <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
//         <Avatar initials={s.avatar} color={s.color} size={46}/>
//         <div style={{ flex:1, minWidth:0 }}>
//           {s.live&&(
//             <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:"rgba(239,68,68,.12)", color:"#ef4444", fontSize:10.5, fontWeight:700, padding:"2px 8px", borderRadius:99, marginBottom:5 }}>
//               <span style={{ width:6, height:6, borderRadius:"50%", background:"#ef4444", display:"inline-block", animation:"pulse 1.4s infinite" }}/> LIVE
//             </div>
//           )}
//           <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(14px,2vw,16px)", fontWeight:600, color: t.text, margin:"0 0 4px", letterSpacing:"-.02em" }}>{s.title}</h3>
//           <div style={{ fontSize:12, color: t.textMuted, display:"flex", alignItems:"center", gap:5 }}><Calendar size={12}/> {s.time}</div>
//           <div style={{ fontSize:12, color: t.textSub, marginTop:3 }}>Trainer: {s.trainer}{s.attendance?` · ${s.attendance} joined`:""}</div>
//         </div>
//       </div>
//       <div style={{ display:"flex", gap:8, marginTop:16 }}>
//         <button style={{ flex:1, background:s.live?"#ef4444":s.color, color:"#fff", border:"none", borderRadius:11, padding:"9px 0", fontWeight:700, fontSize:13, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6, fontFamily:"inherit" }}>
//           <PlayCircle size={14}/> {s.live?"Monitor Live":"Schedule"}
//         </button>
//         <button style={{ flex:1, background:"transparent", border:`1.5px solid ${t.border}`, color: t.textMuted, borderRadius:11, padding:"9px 0", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6 }}>
//           <Edit2 size={13}/> Edit
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    HOME PAGE
// ═══════════════════════════════════════════════════════════════ */
// function HomePage({ setPage }) {
//   const t = useTheme();
//   const w = useWindowWidth();
//   const isPhone = w < 640;
//   const isTablet = w >= 640 && w < 900;

//   return (
//     <div>
//       {/* HERO */}
//       <section style={{ background: t.heroBg, padding:"clamp(36px,7vw,64px) 0", borderBottom:`1px solid ${t.border}` }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <div style={{
//             display:"grid",
//             gridTemplateColumns: isPhone ? "1fr" : isTablet ? "1fr" : "1fr 1fr",
//             gap: isPhone ? 36 : isTablet ? 40 : 64,
//             alignItems:"center"
//           }}>
//             <div>
//               <Badge label="✦ Manager Control Panel"/>
//               <h1 style={{
//                 fontFamily:"'Space Grotesk',sans-serif",
//                 fontSize:"clamp(28px,5vw,54px)", fontWeight:700,
//                 lineHeight:1.12, letterSpacing:"-.035em", color: t.text, marginBottom:18
//               }}>
//                 Manage Your <span style={{ color:"#f97316" }}>Learning Operations</span>
//               </h1>
//               <p style={{ color: t.textSub, fontSize:"clamp(14px,2vw,17px)", lineHeight:1.75, maxWidth:480, marginBottom:36 }}>
//                 Oversee batches, assign trainers, track student performance, upload resources, review certifications, and drive placements — all from one powerful dashboard.
//               </p>
//               <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
//                 <button onClick={()=>setPage("overview")} style={{
//                   background:"#f97316", color:"#fff", border:"none", borderRadius:14,
//                   padding:"12px 24px", fontWeight:700, fontSize:"clamp(13px,2vw,15px)",
//                   display:"inline-flex", alignItems:"center", gap:8, cursor:"pointer",
//                   boxShadow:"0 6px 24px rgba(249,115,22,.35)", fontFamily:"inherit",
//                   ...(isPhone&&{width:"100%",justifyContent:"center"})
//                 }}>
//                   <LayoutDashboard size={17}/> Open Manager Hub
//                 </button>
//                 <button onClick={()=>setPage("analytics")} style={{
//                   background:"transparent", color: t.text,
//                   border:`1.5px solid ${t.border}`, borderRadius:14,
//                   padding:"12px 24px", fontWeight:600, fontSize:"clamp(13px,2vw,15px)",
//                   display:"inline-flex", alignItems:"center", gap:8, cursor:"pointer", fontFamily:"inherit",
//                   ...(isPhone&&{width:"100%",justifyContent:"center"})
//                 }}>
//                   <BarChart2 size={17}/> View Analytics
//                 </button>
//               </div>
//               <div style={{ display:"flex", gap:isPhone?20:32, marginTop:40, flexWrap:"wrap" }}>
//                 {[["48","Active Batches"],["1.2k","Enrolled Students"],["24","Trainers"],["91%","Placement Rate"]].map(([v,l])=>(
//                   <div key={l}>
//                     <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,3vw,24px)", fontWeight:700, color: t.text, letterSpacing:"-.03em" }}>{v}</div>
//                     <div style={{ fontSize:12, color: t.textMuted, fontWeight:500, marginTop:2 }}>{l}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {!isPhone && (
//               <div style={{
//                 background:"linear-gradient(135deg,rgba(249,115,22,.07) 0%,rgba(30,41,59,.05) 100%)",
//                 border:`1px solid ${t.border}`, borderRadius:24, padding:"clamp(18px,3vw,28px)",
//                 position:"relative", overflow:"hidden"
//               }}>
//                 <div style={{ background:"#1e2329", borderRadius:14, padding:"clamp(14px,2vw,18px)", marginBottom:14, fontFamily:"monospace", fontSize:"clamp(10px,1.3vw,13px)", lineHeight:1.7, overflowX:"auto" }}>
//                   <div style={{ display:"flex", gap:6, marginBottom:10 }}>
//                     {["#ff5f57","#ffbd2e","#28c840"].map(c=><div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, flexShrink:0 }}/>)}
//                   </div>
//                   <div><span style={{ color:"#8b949e" }}>// Manager Dashboard</span></div>
//                   <div><span style={{ color:"#ff7b72" }}>const</span> <span style={{ color:"#79c0ff" }}>status</span> = <span style={{ color:"#3fb950" }}>fetchBatchStatus</span>();</div>
//                   <div style={{ paddingLeft:16 }}><span style={{ color:"#a5d6ff" }}>"48 batches running"</span></div>
//                   <div><span style={{ color:"#3fb950" }}>return</span> <span style={{ color:"#a5d6ff" }}>Overview()</span></div>
//                 </div>
//                 <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
//                   {[
//                     { icon:Users,      color:"#f97316", label:"Students",     val:"1,240"   },
//                     { icon:TrendingUp, color:"#22c55e", label:"Placements",   val:"91%"     },
//                     { icon:Calendar,   color:"#3b82f6", label:"Live Sessions", val:"3 Today" },
//                     { icon:Award,      color:"#a855f7", label:"Certs Issued",  val:"342"    },
//                   ].map(({icon:Icon,color,label,val})=>(
//                     <div key={label} style={{ background: t.cardBg, border:`1px solid ${t.border}`, borderRadius:11, padding:"10px 12px", display:"flex", alignItems:"center", gap:10 }}>
//                       <div style={{ background: t.iconBg, border:`1px solid ${t.border}`, borderRadius:8, padding:7, display:"flex", flexShrink:0 }}>
//                         <Icon size={15} color={color}/>
//                       </div>
//                       <div>
//                         <div style={{ fontSize:11, color: t.textMuted, fontWeight:500 }}>{label}</div>
//                         <div style={{ fontSize:13, color: t.text, fontWeight:700 }}>{val}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div style={{ position:"absolute", top:-40, right:-40, width:150, height:150, borderRadius:"50%", border:"2px solid rgba(249,115,22,.15)", pointerEvents:"none" }}/>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* OVERVIEW METRICS */}
//       <section style={{ padding:"clamp(40px,7vw,72px) 0", background: t.sectionBg }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <SectionTitle badge="Platform Overview" title='Manager <span style="color:#f97316">Dashboard Overview</span>' sub="A real-time snapshot of everything happening across your learning platform."/>
//           <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isPhone?"140px":"170px"},1fr))`, gap:isPhone?10:14, marginBottom:28 }}>
//             <StatCard icon={Package}      iconColor="#f97316" value="48"    label="Active Batches"     trend="↑ 6 this month"     trendUp={true}/>
//             <StatCard icon={Users}        iconColor="#3b82f6" value="1,240" label="Total Students"     trend="↑ 142 this month"   trendUp={true}/>
//             <StatCard icon={GraduationCap}iconColor="#8b5cf6" value="24"    label="Active Trainers"    trend="→ Stable"/>
//             <StatCard icon={Video}        iconColor="#22c55e" value="342"   label="Live Sessions Done" trend="↑ 18 this week"     trendUp={true}/>
//             <StatCard icon={Rocket}       iconColor="#f59e0b" value="91%"   label="Placement Rate"     trend="↑ 3% vs last batch" trendUp={true}/>
//           </div>
//           <div style={{ background: t.cardBg, border:`1px solid ${t.border}`, borderRadius:18, overflow:"hidden", boxShadow: t.shadow }}>
//             <div style={{ padding:"16px 20px", borderBottom:`1px solid ${t.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
//               <div>
//                 <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"clamp(14px,2vw,17px)", color: t.text, letterSpacing:"-.02em" }}>Recent Activity Log</div>
//                 <div style={{ fontSize:12, color: t.textMuted, marginTop:2 }}>Last 5 events across the platform</div>
//               </div>
//               <button style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:10, padding:"9px 16px", fontWeight:700, fontSize:13, display:"inline-flex", alignItems:"center", gap:6, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
//                 <Activity size={13}/> View All Logs
//               </button>
//             </div>
//             <ActivityTable w={w}/>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section style={{ padding:"clamp(40px,7vw,72px) 0", background: t.pageBg }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <SectionTitle badge="Admin Features" title='Everything You <span style="color:#f97316">Control</span>' sub="Complete toolkit to manage every aspect of your learning operations with precision."/>
//           <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isPhone?"100%":"220px"},1fr))`, gap:16 }}>
//             {FEATURES.map(f=><FeatureCard key={f.title} f={f}/>)}
//           </div>
//         </div>
//       </section>

//       {/* BATCHES PREVIEW */}
//       <section style={{ padding:"clamp(40px,7vw,72px) 0", background: t.sectionBg }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:36, flexWrap:"wrap", gap:14 }}>
//             <div>
//               <Badge label="📦 Batch Management"/>
//               <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:700, letterSpacing:"-.03em", color: t.text, marginTop:4 }}>
//                 Active <span style={{ color:"#f97316" }}>Batches</span>
//               </h2>
//             </div>
//             <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
//               <button onClick={()=>setPage("batches")} style={{ background:"transparent", border:`1.5px solid ${t.border}`, color: t.text, borderRadius:10, padding:"9px 16px", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>View All</button>
//               <button style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:10, padding:"9px 16px", fontWeight:700, fontSize:13, display:"inline-flex", alignItems:"center", gap:5, cursor:"pointer", fontFamily:"inherit" }}>
//                 <Plus size={13}/> Create Batch
//               </button>
//             </div>
//           </div>
//           <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isPhone?"100%":"260px"},1fr))`, gap:18 }}>
//             {BATCHES.map(b=><BatchCard key={b.title} b={b}/>)}
//           </div>
//         </div>
//       </section>

//       {/* TRAINERS PREVIEW */}
//       <section style={{ padding:"clamp(40px,7vw,72px) 0", background: t.pageBg }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <SectionTitle badge="Expert Mentors" title='Trainer <span style="color:#f97316">Management</span>' sub="Assign, review, and manage your panel of industry trainers with full control."/>
//           <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isPhone?"100%":"260px"},1fr))`, gap:18 }}>
//             {TRAINERS.map(tr=><TrainerCard key={tr.name} tr={tr}/>)}
//           </div>
//         </div>
//       </section>

//       {/* ANALYTICS PREVIEW */}
//       <section style={{ padding:"clamp(40px,7vw,72px) 0", background: t.sectionBg }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <SectionTitle badge="Usage Analytics" title='Platform <span style="color:#f97316">Analytics</span>' sub="Deep insights on student engagement, batch progress, and trainer performance."/>
//           <div style={{ display:"grid", gridTemplateColumns: isPhone?"1fr": isTablet?"1fr":"1fr 1fr", gap:isPhone?32:56, alignItems:"center", marginBottom:40 }}>
//             <div>
//               <Badge label="📊 Skill Proficiency Across Batches"/>
//               <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,3vw,22px)", fontWeight:700, color: t.text, margin:"0 0 10px", letterSpacing:"-.02em" }}>
//                 Average <span style={{ color:"#f97316" }}>Skill Levels</span>
//               </h3>
//               <p style={{ color: t.textSub, fontSize:"clamp(13px,2vw,15px)", lineHeight:1.7, marginBottom:24 }}>
//                 AI-aggregated skill proficiency of all enrolled students based on quizzes and coding performance.
//               </p>
//               <button onClick={()=>setPage("analytics")} style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:13, padding:"11px 20px", fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8, fontSize:14 }}>
//                 <BarChart2 size={15}/> Full Analytics Report
//               </button>
//             </div>
//             <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
//               {SKILLS.map(sk=>(
//                 <div key={sk.name}>
//                   <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
//                     <span style={{ color: t.text, fontWeight:600, fontSize:"clamp(13px,2vw,15px)" }}>{sk.name}</span>
//                     <span style={{ color:sk.color, fontWeight:700, fontSize:"clamp(13px,2vw,15px)", fontFamily:"'Space Grotesk',sans-serif" }}>{sk.pct}%</span>
//                   </div>
//                   <ProgressBar pct={sk.pct} color={sk.color}/>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <EnrollmentChart/>
//         </div>
//       </section>

//       {/* RESOURCES PREVIEW */}
//       <section style={{ padding:"clamp(40px,7vw,72px) 0", background: t.pageBg }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <SectionTitle badge="📁 Resources" title='Learning <span style="color:#f97316">Resources</span>' sub="Upload, organise, and publish study materials across all batches and courses."/>
//           <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isPhone?"100%":"220px"},1fr))`, gap:16 }}>
//             {RESOURCES.map(r=><ResourceCard key={r.title} r={r}/>)}
//           </div>
//         </div>
//       </section>

//       {/* FEEDBACK & REPORTS */}
//       <section style={{ padding:"clamp(40px,7vw,72px) 0", background: t.sectionBg }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <SectionTitle badge="📋 Feedback" title='Feedback <span style="color:#f97316">&amp; Reports</span>' sub="Review student and trainer feedback, generate org-level reports, and act on insights."/>
//           <div style={{ display:"grid", gridTemplateColumns: isPhone?"1fr": isTablet?"1fr":"1fr 1fr", gap:isPhone?32:52, alignItems:"start" }}>
//             <div>
//               <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(15px,2vw,18px)", fontWeight:700, color: t.text, marginBottom:16, letterSpacing:"-.02em" }}>Recent Feedback</div>
//               <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//                 {FEEDBACK.map((f,i)=>(
//                   <Card key={i} style={{ borderRadius:13, padding:"14px 18px" }}>
//                     <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
//                       <Avatar initials={f.name.split(" ").map(w=>w[0]).join("")} color="#f97316" size={34}/>
//                       <div>
//                         <div style={{ fontWeight:600, color: t.text, fontSize:13 }}>{f.name}</div>
//                         <div style={{ fontSize:11, color: t.textMuted }}>{f.batch}</div>
//                       </div>
//                       <div style={{ marginLeft:"auto", color:"#f59e0b", fontSize:12.5, fontWeight:700, display:"flex", alignItems:"center", gap:3 }}>
//                         <Star size={12} fill="#f59e0b"/> {f.rating}/5
//                       </div>
//                     </div>
//                     <p style={{ fontSize:13, color: t.textSub, lineHeight:1.6, margin:0 }}>"{f.text}"</p>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(15px,2vw,18px)", fontWeight:700, color: t.text, marginBottom:16, letterSpacing:"-.02em" }}>Generate Reports</div>
//               <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//                 {REPORTS.map((r,i)=>{
//                   const Icon=r.icon;
//                   return (
//                     <Card key={i} style={{ borderRadius:13, padding:"14px 18px", display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}>
//                       <Icon size={24} color="#f97316" style={{ flexShrink:0 }}/>
//                       <div style={{ flex:1, minWidth:0 }}>
//                         <div style={{ fontWeight:600, color: t.text, fontSize:13 }}>{r.title}</div>
//                         <div style={{ fontSize:12, color: t.textMuted, marginTop:2 }}>{r.desc}</div>
//                       </div>
//                       <button style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:4, flexShrink:0 }}>
//                         <Download size={11}/> Export
//                       </button>
//                     </Card>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* WORKFLOW */}
//       <section style={{ padding:"clamp(40px,7vw,72px) 0", background: t.pageBg }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)` }}>
//           <SectionTitle badge="🗺️ Workflow" title='Manager <span style="color:#f97316">Workflow</span>' sub="The standard operating process every Manager follows to run a successful batch."/>
//           <RoadmapList/>
//         </div>
//       </section>

//       {/* CTA */}
//       <div style={{ padding:"clamp(40px,7vw,60px) 0", background:"linear-gradient(135deg,#1E293B 0%,#0f172a 100%)", position:"relative", overflow:"hidden", textAlign:"center" }}>
//         <div style={{ position:"absolute", top:-40, left:-40, width:200, height:200, borderRadius:"50%", background:"rgba(249,115,22,.1)", filter:"blur(50px)", pointerEvents:"none" }}/>
//         <div style={{ position:"absolute", bottom:-40, right:-40, width:180, height:180, borderRadius:"50%", background:"rgba(249,115,22,.07)", filter:"blur(40px)", pointerEvents:"none" }}/>
//         <div style={{ maxWidth:680, margin:"0 auto", padding:`0 clamp(16px,4vw,24px)`, position:"relative" }}>
//           <Badge label="⚡ Start Managing"/>
//           <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(22px,4vw,40px)", fontWeight:700, color:"#fff", lineHeight:1.15, letterSpacing:"-.035em", margin:"0 0 12px" }}>
//             Ready To Run Your <span style={{ color:"#f97316" }}>Learning Platform?</span>
//           </h2>
//           <p style={{ color:"rgba(255,255,255,.45)", fontSize:"clamp(13px,2vw,15px)", lineHeight:1.65, maxWidth:480, margin:"0 auto 24px" }}>
//             Access the full Manager Hub to control every batch, trainer, student, and resource from one place.
//           </p>
//           <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
//             <button onClick={()=>setPage("overview")} style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:12, padding:"11px 22px", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8, ...(isPhone&&{width:"100%",justifyContent:"center"}) }}>
//               <LayoutDashboard size={15}/> Open Manager Hub
//             </button>
//             <button onClick={()=>setPage("feedback")} style={{ background:"transparent", color:"#fff", border:"1.5px solid rgba(255,255,255,.18)", borderRadius:12, padding:"11px 22px", fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:"inherit", ...(isPhone&&{width:"100%"}) }}>
//               View Reports
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    INNER PAGES
// ═══════════════════════════════════════════════════════════════ */
// function OverviewPage() {
//   const t = useTheme();
//   const w = useWindowWidth();
//   return (
//     <PageWrapper>
//       <SectionTitle badge="Platform Overview" title='Manager <span style="color:#f97316">Dashboard Overview</span>' sub="A real-time snapshot of everything happening across your learning platform."/>
//       <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${w<640?"140px":"170px"},1fr))`, gap:w<640?10:14, marginBottom:28 }}>
//         <StatCard icon={Package}      iconColor="#f97316" value="48"    label="Active Batches"     trend="↑ 6 this month"     trendUp={true}/>
//         <StatCard icon={Users}        iconColor="#3b82f6" value="1,240" label="Total Students"     trend="↑ 142 this month"   trendUp={true}/>
//         <StatCard icon={GraduationCap}iconColor="#8b5cf6" value="24"    label="Active Trainers"    trend="→ Stable"/>
//         <StatCard icon={Video}        iconColor="#22c55e" value="342"   label="Live Sessions Done" trend="↑ 18 this week"     trendUp={true}/>
//         <StatCard icon={Rocket}       iconColor="#f59e0b" value="91%"   label="Placement Rate"     trend="↑ 3% vs last batch" trendUp={true}/>
//       </div>
//       <div style={{ background: t.cardBg, border:`1px solid ${t.border}`, borderRadius:18, overflow:"hidden", boxShadow: t.shadow }}>
//         <div style={{ padding:"16px 20px", borderBottom:`1px solid ${t.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
//           <div>
//             <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:"clamp(14px,2vw,17px)", color: t.text, letterSpacing:"-.02em" }}>Recent Activity Log</div>
//             <div style={{ fontSize:12, color: t.textMuted, marginTop:2 }}>Last 5 events across the platform</div>
//           </div>
//           <button style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:10, padding:"9px 16px", fontWeight:700, fontSize:13, display:"inline-flex", alignItems:"center", gap:6, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
//             <Activity size={13}/> View All Logs
//           </button>
//         </div>
//         <ActivityTable w={w}/>
//       </div>
//     </PageWrapper>
//   );
// }

// function BatchesPage() {
//   const t = useTheme();
//   const w = useWindowWidth();
//   return (
//     <PageWrapper>
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:36, flexWrap:"wrap", gap:14 }}>
//         <div>
//           <Badge label="📦 Batch Management"/>
//           <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:700, letterSpacing:"-.03em", color: t.text, marginTop:4 }}>
//             Active <span style={{ color:"#f97316" }}>Batches</span>
//           </h2>
//         </div>
//         <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
//           <button style={{ background:"transparent", border:`1.5px solid ${t.border}`, color: t.text, borderRadius:10, padding:"9px 16px", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>View All</button>
//           <button style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:10, padding:"9px 16px", fontWeight:700, fontSize:13, display:"inline-flex", alignItems:"center", gap:5, cursor:"pointer", fontFamily:"inherit" }}>
//             <Plus size={13}/> Create Batch
//           </button>
//         </div>
//       </div>
//       <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${w<640?"100%":"260px"},1fr))`, gap:18 }}>
//         {BATCHES.map(b=><BatchCard key={b.title} b={b}/>)}
//       </div>
//     </PageWrapper>
//   );
// }

// function TrainersPage() {
//   const w = useWindowWidth();
//   return (
//     <PageWrapper>
//       <SectionTitle badge="Expert Mentors" title='Trainer <span style="color:#f97316">Management</span>' sub="Assign, review, and manage your panel of industry trainers with full control."/>
//       <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${w<640?"100%":"260px"},1fr))`, gap:18 }}>
//         {TRAINERS.map(tr=><TrainerCard key={tr.name} tr={tr}/>)}
//       </div>
//     </PageWrapper>
//   );
// }

// function StudentsPage() {
//   const t = useTheme();
//   const w = useWindowWidth();
//   const [search, setSearch] = useState("");
//   const filtered = STUDENTS.filter(s =>
//     s.name.toLowerCase().includes(search.toLowerCase()) ||
//     s.batch.toLowerCase().includes(search.toLowerCase())
//   );
//   const statusColor = { Active:"#22c55e", "At Risk":"#ef4444", Completed:"#3b82f6" };
//   const isMobile = w < 640;

//   return (
//     <PageWrapper>
//       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:36, flexWrap:"wrap", gap:14 }}>
//         <div>
//           <Badge label="👥 All Students"/>
//           <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(22px,4vw,36px)", fontWeight:700, letterSpacing:"-.03em", color: t.text, marginTop:4 }}>
//             Student <span style={{ color:"#f97316" }}>Directory</span>
//           </h2>
//         </div>
//         <button style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:10, padding:"9px 16px", fontWeight:700, fontSize:13, display:"inline-flex", alignItems:"center", gap:5, cursor:"pointer", fontFamily:"inherit" }}>
//           <Plus size={13}/> Add Student
//         </button>
//       </div>
//       <div style={{ background: t.cardBg, border:`1px solid ${t.border}`, borderRadius:18, overflow:"hidden", boxShadow: t.shadow }}>
//         <div style={{ padding:"14px 18px", borderBottom:`1px solid ${t.border}` }}>
//           <div style={{ display:"flex", alignItems:"center", gap:8, background: t.iconBg, border:`1px solid ${t.border}`, borderRadius:10, padding:"9px 14px" }}>
//             <Search size={15} color={t.textMuted} style={{ flexShrink:0 }}/>
//             <input
//               placeholder="Search students…"
//               value={search}
//               onChange={e=>setSearch(e.target.value)}
//               style={{ flex:1, background:"transparent", border:"none", outline:"none", color: t.text, fontFamily:"inherit", fontSize:14 }}
//             />
//           </div>
//         </div>
//         {isMobile ? (
//           <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"12px 16px" }}>
//             {filtered.map((s,i)=>(
//               <div key={i} style={{ background: t.iconBg, borderRadius:12, padding:"12px 14px", border:`1px solid ${t.border}` }}>
//                 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
//                   <span style={{ fontWeight:600, color: t.text, fontSize:13 }}>{s.name}</span>
//                   <Pill label={s.status} color={statusColor[s.status]||"#888"}/>
//                 </div>
//                 <div style={{ fontSize:12, color: t.textSub, marginBottom:8 }}>{s.batch} · {s.quizzes} quizzes done</div>
//                 <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                   <div style={{ flex:1, background: t.barBg, borderRadius:99, height:6, overflow:"hidden" }}>
//                     <div style={{ height:"100%", borderRadius:99, background:"#f97316", width:`${s.progress}%` }}/>
//                   </div>
//                   <span style={{ fontSize:12, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"#f97316" }}>{s.progress}%</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div style={{ overflowX:"auto" }}>
//             <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
//               <thead>
//                 <tr>{["Student","Batch","Progress","Quizzes","Status","Action"].map(h=>(
//                   <th key={h} style={{ color: t.textMuted, fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:".06em", padding:"10px 14px", borderBottom:`1px solid ${t.border}`, textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
//                 ))}</tr>
//               </thead>
//               <tbody>
//                 {filtered.map((s,i)=>(
//                   <tr key={i}
//                     onMouseEnter={e=>e.currentTarget.style.background=t.iconBg}
//                     onMouseLeave={e=>e.currentTarget.style.background=""}
//                   >
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, fontWeight:600, color: t.text }}>{s.name}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, color: t.textSub, whiteSpace:"nowrap" }}>{s.batch}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}` }}>
//                       <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                         <div style={{ background: t.barBg, borderRadius:99, height:6, width:70, overflow:"hidden", flexShrink:0 }}>
//                           <div style={{ height:"100%", borderRadius:99, background:"#f97316", width:`${s.progress}%` }}/>
//                         </div>
//                         <span style={{ fontSize:12, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"#f97316" }}>{s.progress}%</span>
//                       </div>
//                     </td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, color: t.textSub, whiteSpace:"nowrap" }}>{s.quizzes} done</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}` }}><Pill label={s.status} color={statusColor[s.status]||"#888"}/></td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}` }}>
//                       <button style={{ background:"transparent", border:`1px solid ${t.border}`, borderRadius:8, padding:"5px 10px", fontSize:12, cursor:"pointer", color: t.textSub, fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:4, whiteSpace:"nowrap" }}>
//                         View <ChevronRight size={12}/>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </PageWrapper>
//   );
// }

// function SessionsPage() {
//   const w = useWindowWidth();
//   return (
//     <PageWrapper>
//       <SectionTitle badge="📹 Live Sessions" title='Manage <span style="color:#f97316">Live Sessions</span>' sub="Schedule, monitor, and review all trainer-led live sessions in real time."/>
//       <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${w<640?"100%":"260px"},1fr))`, gap:18 }}>
//         {SESSIONS.map(s=><SessionCard key={s.title} s={s}/>)}
//       </div>
//     </PageWrapper>
//   );
// }

// function AnalyticsPage() {
//   const t = useTheme();
//   const w = useWindowWidth();
//   const isPhone = w < 640;
//   return (
//     <PageWrapper>
//       <SectionTitle badge="Usage Analytics" title='Platform <span style="color:#f97316">Analytics</span>' sub="Deep insights on student engagement, batch progress, and trainer performance."/>
//       <div style={{ display:"grid", gridTemplateColumns: isPhone?"1fr":"1fr 1fr", gap:isPhone?32:56, alignItems:"center", marginBottom:40 }}>
//         <div>
//           <Badge label="📊 Skill Proficiency Across Batches"/>
//           <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(18px,3vw,22px)", fontWeight:700, color: t.text, margin:"0 0 10px", letterSpacing:"-.02em" }}>
//             Average <span style={{ color:"#f97316" }}>Skill Levels</span>
//           </h3>
//           <p style={{ color: t.textSub, fontSize:"clamp(13px,2vw,15px)", lineHeight:1.7, marginBottom:24 }}>
//             AI-aggregated skill proficiency of all enrolled students based on quizzes and coding performance.
//           </p>
//           <button style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:13, padding:"11px 20px", fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:8, fontSize:14 }}>
//             <BarChart2 size={15}/> Full Analytics Report
//           </button>
//         </div>
//         <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
//           {SKILLS.map(sk=>(
//             <div key={sk.name}>
//               <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
//                 <span style={{ color: t.text, fontWeight:600, fontSize:"clamp(13px,2vw,15px)" }}>{sk.name}</span>
//                 <span style={{ color:sk.color, fontWeight:700, fontSize:"clamp(13px,2vw,15px)", fontFamily:"'Space Grotesk',sans-serif" }}>{sk.pct}%</span>
//               </div>
//               <ProgressBar pct={sk.pct} color={sk.color}/>
//             </div>
//           ))}
//         </div>
//       </div>
//       <EnrollmentChart/>
//     </PageWrapper>
//   );
// }

// function ResourcesPage() {
//   const w = useWindowWidth();
//   return (
//     <PageWrapper>
//       <SectionTitle badge="📁 Resources" title='Learning <span style="color:#f97316">Resources</span>' sub="Upload, organise, and publish study materials across all batches and courses."/>
//       <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${w<640?"100%":"220px"},1fr))`, gap:16 }}>
//         {RESOURCES.map(r=><ResourceCard key={r.title} r={r}/>)}
//       </div>
//     </PageWrapper>
//   );
// }

// function CertificatesPage() {
//   const t = useTheme();
//   const w = useWindowWidth();
//   const isMobile = w < 640;
//   return (
//     <PageWrapper>
//       <SectionTitle badge="🏆 Certificates" title='Certificate <span style="color:#f97316">Management</span>' sub="Issue, review, and verify certificates for completed learners."/>
//       <div style={{ background: t.cardBg, border:`1px solid ${t.border}`, borderRadius:18, overflow:"hidden", boxShadow: t.shadow, maxWidth:isMobile?"100%":860, margin:"0 auto" }}>
//         {isMobile ? (
//           <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"12px 16px" }}>
//             {CERTS.map((c,i)=>(
//               <div key={i} style={{ background: t.iconBg, borderRadius:12, padding:"14px 16px", border:`1px solid ${t.border}` }}>
//                 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
//                   <span style={{ fontWeight:600, color: t.text, fontSize:13 }}>{c.student}</span>
//                   <Pill label={c.status} color={c.status==="Issued"?"#22c55e":"#f97316"}/>
//                 </div>
//                 <div style={{ fontSize:12, color: t.textSub, marginBottom:4 }}>{c.course}</div>
//                 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                   <div>
//                     <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"#f97316", fontSize:13 }}>{c.grade}</span>
//                     <span style={{ fontSize:11, color: t.textMuted, marginLeft:8 }}>{c.date}</span>
//                   </div>
//                   <button style={{ background:c.status==="Issued"?"#f97316":"transparent", color:c.status==="Issued"?"#fff": t.textMuted, border:`1px solid ${c.status==="Issued"?"#f97316": t.border}`, borderRadius:8, padding:"5px 10px", fontSize:11, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:4 }}>
//                     {c.status==="Issued"?<><Download size={11}/> Download</>:"Pending"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div style={{ overflowX:"auto" }}>
//             <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
//               <thead>
//                 <tr>{["Student","Course","Grade","Date","Status","Action"].map(h=>(
//                   <th key={h} style={{ color: t.textMuted, fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:".06em", padding:"10px 14px", borderBottom:`1px solid ${t.border}`, textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
//                 ))}</tr>
//               </thead>
//               <tbody>
//                 {CERTS.map((c,i)=>(
//                   <tr key={i}
//                     onMouseEnter={e=>e.currentTarget.style.background=t.iconBg}
//                     onMouseLeave={e=>e.currentTarget.style.background=""}
//                   >
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, fontWeight:600, color: t.text }}>{c.student}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, color: t.textSub }}>{c.course}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"#f97316" }}>{c.grade}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, color: t.textMuted, whiteSpace:"nowrap" }}>{c.date}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}` }}><Pill label={c.status} color={c.status==="Issued"?"#22c55e":"#f97316"}/></td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}` }}>
//                       <button style={{ background:c.status==="Issued"?"#f97316":"transparent", color:c.status==="Issued"?"#fff": t.textMuted, border:`1px solid ${c.status==="Issued"?"#f97316": t.border}`, borderRadius:8, padding:"5px 11px", fontSize:12, cursor:"pointer", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:4 }}>
//                         {c.status==="Issued"?<><Download size={12}/> Download</>:"Pending"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </PageWrapper>
//   );
// }

// function PlacementsPage() {
//   const t = useTheme();
//   const w = useWindowWidth();
//   const isMobile = w < 640;
//   const statusColors = { Joined:"#22c55e", "Offer Accepted":"#f97316", Interviewing:"#3b82f6" };
//   return (
//     <PageWrapper>
//       <SectionTitle badge="🚀 Placements" title='Placement <span style="color:#f97316">Tracker</span>' sub="Track student job placements, company tie-ups, and offer letters in one place."/>
//       <div style={{ display:"grid", gridTemplateColumns:`repeat(auto-fit,minmax(${isMobile?"140px":"170px"},1fr))`, gap:isMobile?10:14, marginBottom:28 }}>
//         <StatCard icon={Building2} iconColor="#22c55e" value="87"    label="Students Placed"   trend="This Quarter"/>
//         <StatCard icon={Briefcase} iconColor="#f97316" value="34"    label="Partner Companies" trend="↑ 4 new" trendUp={true}/>
//         <StatCard icon={TrendingUp}iconColor="#3b82f6" value="₹8.4L" label="Avg. Package"       trend="↑ ₹60k vs last" trendUp={true}/>
//       </div>
//       <div style={{ background: t.cardBg, border:`1px solid ${t.border}`, borderRadius:18, overflow:"hidden", boxShadow: t.shadow }}>
//         {isMobile ? (
//           <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"12px 16px" }}>
//             {PLACEMENTS.map((p,i)=>(
//               <div key={i} style={{ background: t.iconBg, borderRadius:12, padding:"14px 16px", border:`1px solid ${t.border}` }}>
//                 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
//                   <span style={{ fontWeight:600, color: t.text, fontSize:13 }}>{p.student}</span>
//                   <Pill label={p.status} color={statusColors[p.status]||"#888"}/>
//                 </div>
//                 <div style={{ fontSize:12, color: t.textSub, marginBottom:4 }}>{p.company} · {p.role}</div>
//                 <div style={{ fontSize:12, color: t.textMuted }}>{p.batch}</div>
//                 <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"#22c55e", fontSize:14, marginTop:6 }}>{p.package}</div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div style={{ overflowX:"auto" }}>
//             <table style={{ width:"100%", borderCollapse:"collapse", fontSize:14 }}>
//               <thead>
//                 <tr>{["Student","Batch","Company","Role","Package","Status"].map(h=>(
//                   <th key={h} style={{ color: t.textMuted, fontWeight:600, fontSize:12, textTransform:"uppercase", letterSpacing:".06em", padding:"10px 14px", borderBottom:`1px solid ${t.border}`, textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
//                 ))}</tr>
//               </thead>
//               <tbody>
//                 {PLACEMENTS.map((p,i)=>(
//                   <tr key={i}
//                     onMouseEnter={e=>e.currentTarget.style.background=t.iconBg}
//                     onMouseLeave={e=>e.currentTarget.style.background=""}
//                   >
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, fontWeight:600, color: t.text }}>{p.student}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, color: t.textSub, whiteSpace:"nowrap" }}>{p.batch}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, color: t.text }}>{p.company}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, color: t.textSub, whiteSpace:"nowrap" }}>{p.role}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}`, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:"#22c55e", whiteSpace:"nowrap" }}>{p.package}</td>
//                     <td style={{ padding:"12px 14px", borderBottom:`1px solid ${t.border}` }}><Pill label={p.status} color={statusColors[p.status]||"#888"}/></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </PageWrapper>
//   );
// }

// function FeedbackPage() {
//   const t = useTheme();
//   const w = useWindowWidth();
//   const isPhone = w < 640;
//   return (
//     <PageWrapper>
//       <SectionTitle badge="📋 Feedback" title='Feedback <span style="color:#f97316">&amp; Reports</span>' sub="Review student and trainer feedback, generate org-level reports, and act on insights."/>
//       <div style={{ display:"grid", gridTemplateColumns: isPhone?"1fr":"1fr 1fr", gap:isPhone?32:52, alignItems:"start" }}>
//         <div>
//           <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(15px,2vw,18px)", fontWeight:700, color: t.text, marginBottom:16, letterSpacing:"-.02em" }}>Recent Feedback</div>
//           <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//             {FEEDBACK.map((f,i)=>(
//               <Card key={i} style={{ borderRadius:13, padding:"14px 18px" }}>
//                 <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
//                   <Avatar initials={f.name.split(" ").map(w=>w[0]).join("")} color="#f97316" size={34}/>
//                   <div>
//                     <div style={{ fontWeight:600, color: t.text, fontSize:13 }}>{f.name}</div>
//                     <div style={{ fontSize:11, color: t.textMuted }}>{f.batch}</div>
//                   </div>
//                   <div style={{ marginLeft:"auto", color:"#f59e0b", fontSize:12.5, fontWeight:700, display:"flex", alignItems:"center", gap:3 }}>
//                     <Star size={12} fill="#f59e0b"/> {f.rating}/5
//                   </div>
//                 </div>
//                 <p style={{ fontSize:13, color: t.textSub, lineHeight:1.6, margin:0 }}>"{f.text}"</p>
//               </Card>
//             ))}
//           </div>
//         </div>
//         <div>
//           <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(15px,2vw,18px)", fontWeight:700, color: t.text, marginBottom:16, letterSpacing:"-.02em" }}>Generate Reports</div>
//           <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//             {REPORTS.map((r,i)=>{
//               const Icon=r.icon;
//               return (
//                 <Card key={i} style={{ borderRadius:13, padding:"14px 18px", display:"flex", alignItems:"center", gap:12, cursor:"pointer" }}>
//                   <Icon size={24} color="#f97316" style={{ flexShrink:0 }}/>
//                   <div style={{ flex:1, minWidth:0 }}>
//                     <div style={{ fontWeight:600, color: t.text, fontSize:13 }}>{r.title}</div>
//                     <div style={{ fontSize:12, color: t.textMuted, marginTop:2 }}>{r.desc}</div>
//                   </div>
//                   <button style={{ background:"#f97316", color:"#fff", border:"none", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit", display:"inline-flex", alignItems:"center", gap:4, flexShrink:0 }}>
//                     <Download size={11}/> Export
//                   </button>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </PageWrapper>
//   );
// }

// function WorkflowPage() {
//   return (
//     <PageWrapper>
//       <SectionTitle badge="🗺️ Workflow" title='Manager <span style="color:#f97316">Workflow</span>' sub="The standard operating process every Manager follows to run a successful batch."/>
//       <RoadmapList/>
//     </PageWrapper>
//   );
// }


// /* ═══════════════════════════════════════════════════════════════
//    SIDEBAR
// ═══════════════════════════════════════════════════════════════ */
// function Sidebar({ page, setPage }) {
//   const t = useTheme();
//   return (
//     <div style={{
//       width:210, flexShrink:0, background: t.cardBg,
//       borderRight:`1px solid ${t.border}`,
//       minHeight:"100vh",
//       position:"sticky", top:0, overflowY:"auto",
//       padding:"12px 0", alignSelf:"flex-start"
//     }}>
//       {PAGES.map(p=>{
//         const Icon=p.icon;
//         const active=page===p.id;
//         return (
//           <button key={p.id} onClick={()=>setPage(p.id)} style={{
//             width:"100%", display:"flex", alignItems:"center", gap:10,
//             padding:"10px 16px", border:"none",
//             background: active?"rgba(249,115,22,0.08)":"transparent",
//             cursor:"pointer", textAlign:"left", fontSize:13.5, fontWeight:active?600:500,
//             color: active?"#f97316": t.textSub, fontFamily:"inherit",
//             borderLeft:`3px solid ${active?"#f97316":"transparent"}`,
//             transition:"all .15s"
//           }}>
//             <Icon size={15} color={active?"#f97316": t.textMuted}/> {p.label}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    APP ROOT
// ═══════════════════════════════════════════════════════════════ */
// /* ✅ ALIGNMENT FIX (same fix as the Careers page): everything is scoped
//    under `.mh-page` instead of bare `*` / `html` / `body` selectors.
//    The old global reset (`*,*::before,*::after{margin:0;padding:0;}`
//    plus a bare `html{...}` / `body{...}`) leaked outside this component
//    and stripped margin/padding off PublicLayout's navbar and footer —
//    that's what caused the "cut"/misaligned look. Scoping it under
//    `.mh-page` keeps ManagerHub's own reset local to ManagerHub only. */
// const MH_CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

// .mh-page, .mh-page *, .mh-page *::before, .mh-page *::after { box-sizing:border-box; }
// .mh-page h1, .mh-page h2, .mh-page h3, .mh-page h4,
// .mh-page p, .mh-page ul, .mh-page ol, .mh-page figure,
// .mh-page button, .mh-page span, .mh-page div, .mh-page a { margin:0; padding:0; }
// .mh-page { scroll-behavior:smooth; font-family:'Plus Jakarta Sans',sans-serif; overflow-x:hidden; }

// @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
// .mh-page ::-webkit-scrollbar { width:6px; height:6px; }
// .mh-page ::-webkit-scrollbar-track { background:transparent; }
// .mh-page ::-webkit-scrollbar-thumb { background:rgba(249,115,22,0.3); border-radius:99px; }
// .mh-page input::placeholder { color:var(--mh-text-muted); }
// `;

// export default function ManagerHub({
//   theme = "light",
//   toggleTheme,
//   setShowLoginModal,
//   scrollToSection,
// }) {
//   const dark = theme === "dark";
//   const [page, setPage] = useState("home");
//   const t = dark ? DARK : LIGHT;
//   const w = useWindowWidth();
//   const showSidebar = w >= 900;
//   const isHome = page === "home";

//   const pageComponents = {
//     home:         <HomePage setPage={setPage}/>,
//     overview:     <OverviewPage/>,
//     batches:      <BatchesPage/>,
//     trainers:     <TrainersPage/>,
//     students:     <StudentsPage/>,
//     sessions:     <SessionsPage/>,
//     analytics:    <AnalyticsPage/>,
//     resources:    <ResourcesPage/>,
//     certificates: <CertificatesPage/>,
//     placements:   <PlacementsPage/>,
//     feedback:     <FeedbackPage/>,
//     workflow:     <WorkflowPage/>,
//   };

//   return (
//     <ThemeContext.Provider value={t}>
//       {/* ✅ Same shared shell every other public page uses — gives
//           ManagerHub the exact same AnnouncementBanner → Navbar →
//           ... → Footer as Careers/About/Pricing, so there's only ONE
//           site navbar and ONE footer on the page. */}
//       <PublicLayout
//         theme={theme}
//         toggleTheme={toggleTheme}
//         setShowLoginModal={setShowLoginModal}
//         scrollToSection={scrollToSection}
//       >
//         <div
//           className="mh-page"
//           style={{
//             "--mh-text-muted": t.textMuted,
//             background: t.pageBg, color: t.text,
//             minHeight: "100vh", width: "100%",
//             transition: "background .3s,color .3s",
//           }}
//         >
//           <style>{MH_CSS}</style>

//           <div style={{ display:"flex", alignItems:"flex-start" }}>
//             {!isHome && showSidebar && (
//               <Sidebar page={page} setPage={setPage}/>
//             )}
//             <div style={{ flex:1, minWidth:0, background: t.pageBg }}>
//               {pageComponents[page] || pageComponents["home"]}
//             </div>
//           </div>
//         </div>
//       </PublicLayout>
//     </ThemeContext.Provider>
//   );
// }



















































































"use client";

import { useState, useEffect, createContext, useContext } from "react";
import {
  LayoutDashboard, Package, Users, GraduationCap, Video,
  BarChart2, FolderOpen, Award, Rocket, MessageSquare,
  Settings, ChevronRight, TrendingUp,
  Star, Clock, Briefcase, BookOpen, FileText, Download,
  Upload, Plus, CheckCircle2, Lock, ArrowRight,
  Activity, Building2, ClipboardList, Workflow, PlayCircle,
  Calendar, Edit2, Search, Route, Target,
} from "lucide-react";
// Same shared shell used by every other public page (Careers, About, Pricing...).
// If ManagerHub.jsx lives somewhere else, adjust this relative path.
import PublicLayout from "../Landing/components/PublicLayout";

/* ═══════════════════════════════════════════════════════════════
   THEME  (same tokens as Student Hub: ONE background everywhere)
   light #F8FAFC · dark #000 · cards white / gray-900
═══════════════════════════════════════════════════════════════ */
const DARK = {
  pageBg: "#000000", cardBg: "#111827", sectionBg: "#000000",
  heroBg: "#000000", border: "#1F2937",
  borderHov: "#374151", text: "#ffffff",
  textSub: "#CBD5E1", textMuted: "#94A3B8",
  pillBg: "rgba(255,255,255,0.06)", iconBg: "rgba(255,255,255,0.06)",
  barBg: "rgba(255,255,255,0.10)", shadow: "0 4px 20px rgba(0,0,0,0.45)",
};
const LIGHT = {
  pageBg: "#F8FAFC", cardBg: "#ffffff", sectionBg: "#F8FAFC",
  heroBg: "#F8FAFC", border: "#E5E7EB", borderHov: "#D1D5DB",
  text: "#1E293B", textSub: "#475569", textMuted: "#94A3B8",
  pillBg: "#F1F5F9", iconBg: "#F1F5F9", barBg: "#E2E8F0",
  shadow: "0 1px 3px rgba(15,23,42,0.08)",
};

const ThemeContext = createContext(DARK);
const useTheme = () => useContext(ThemeContext);

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const FEATURES = [
  { color: "#F97316", icon: Package,       title: "Batch Management",      desc: "Create, edit, and manage multiple course batches with custom schedules, student quotas, and trainer assignments." },
  { color: "#3b82f6", icon: Users,         title: "Student Management",    desc: "Enroll students, track progress, review scores, and manage their full learning journey end to end." },
  { color: "#8b5cf6", icon: GraduationCap, title: "Trainer Assignment",    desc: "Assign, reassign, and review trainers per batch. Monitor session delivery and trainer performance." },
  { color: "#22c55e", icon: Video,         title: "Live Session Control",  desc: "Schedule and monitor live classes, review attendance, recordings, and session feedback in real time." },
  { color: "#f59e0b", icon: ClipboardList, title: "Assessments & Quizzes", desc: "Create and assign quizzes, review scores, set passing criteria, and track batch-wise performance." },
  { color: "#ec4899", icon: FolderOpen,    title: "Resource Upload",       desc: "Upload PDFs, videos, lecture slides, and assignments. Organise by batch, course, and topic." },
  { color: "#14b8a6", icon: Award,         title: "Certificate Issuance",  desc: "Generate and issue verifiable certificates to students who complete courses with passing grades." },
  { color: "#f97316", icon: Rocket,        title: "Placement Tracking",    desc: "Track job placements, company tie-ups, offer details, and aggregate placement statistics." },
  { color: "#6366f1", icon: BarChart2,     title: "Usage Analytics",       desc: "View real-time charts on enrollments, session attendance, resource downloads, and batch completion rates." },
  { color: "#0ea5e9", icon: Building2,     title: "Department Control",    desc: "Manage departments, branches, and categories to keep your platform structure clean and scalable." },
  { color: "#a855f7", icon: MessageSquare, title: "Feedback & Reports",    desc: "Collect structured feedback from students and trainers. Generate org-level reports with one click." },
  { color: "#22c55e", icon: Settings,      title: "Org Settings",          desc: "Configure org name, branding, notification templates, admin roles, and platform-wide settings." },
];

const BATCHES = [
  { title: "Java Backend Batch 12",     students: 42, trainer: "Rahul S.", color: "#f97316", tag: "Backend",  progress: 68, status: "Active" },
  { title: "React Development Batch 8", students: 35, trainer: "Priya M.", color: "#3b82f6", tag: "Frontend", progress: 45, status: "Active" },
  { title: "AWS Fundamentals Batch 5",  students: 28, trainer: "Arjun K.", color: "#22c55e", tag: "Cloud",    progress: 30, status: "Active" },
];

const TRAINERS = [
  { name: "Rahul Sharma", role: "Java & Backend Expert", exp: "8 yrs", initials: "RS", color: "#F97316", rating: 4.9, batches: 3, students: 128 },
  { name: "Priya Mehta",  role: "React & Frontend Lead", exp: "6 yrs", initials: "PM", color: "#3b82f6", rating: 4.8, batches: 2, students: 94  },
  { name: "Arjun Kumar",  role: "AWS & DevOps Engineer", exp: "7 yrs", initials: "AK", color: "#8b5cf6", rating: 4.9, batches: 2, students: 76  },
];

const STUDENTS = [
  { name: "Ayesha Khan", batch: "Java Batch 12", progress: 82, quizzes: 7, status: "Active"    },
  { name: "Rohan Mehta", batch: "React Batch 8", progress: 60, quizzes: 5, status: "Active"    },
  { name: "Sara Gupta",  batch: "AWS Batch 5",   progress: 44, quizzes: 3, status: "Active"    },
  { name: "Aman Verma",  batch: "Java Batch 12", progress: 91, quizzes: 8, status: "Completed" },
  { name: "Pooja Singh", batch: "React Batch 8", progress: 30, quizzes: 2, status: "At Risk"   },
];

const SESSIONS = [
  { title: "Java Backend Masterclass", time: "Today • 6:00 PM",    trainer: "Rahul S.", avatar: "RS", live: true,  color: "#ef4444", attendance: 38   },
  { title: "React Workshop",           time: "Tomorrow • 7:00 PM", trainer: "Priya M.", avatar: "PM", live: false, color: "#3b82f6", attendance: null },
  { title: "AWS Bootcamp",             time: "Wed • 5:00 PM",      trainer: "Arjun K.", avatar: "AK", live: false, color: "#8b5cf6", attendance: null },
];

const SKILLS = [
  { name: "Java",          pct: 78, color: "#f97316" },
  { name: "React",         pct: 65, color: "#3b82f6" },
  { name: "SQL",           pct: 72, color: "#8b5cf6" },
  { name: "AWS",           pct: 48, color: "#22c55e" },
  { name: "System Design", pct: 55, color: "#f59e0b" },
];

const RESOURCES = [
  { color: "#f97316", icon: FileText,      title: "PDF Notes Library", desc: "Topic-wise notes uploaded by trainers for offline revision.",     tag: "128 Files"    },
  { color: "#3b82f6", icon: Video,         title: "Recorded Sessions", desc: "All past live sessions archived and accessible on demand.",        tag: "214 Videos"   },
  { color: "#8b5cf6", icon: BookOpen,      title: "Video Lectures",    desc: "Curated video tutorials covering every concept in the syllabus.",  tag: "340 Lectures" },
  { color: "#22c55e", icon: ClipboardList, title: "Assignments",       desc: "Practice assignments with test cases, rubrics, and grading.",      tag: "96 Tasks"     },
];

const CERTS = [
  { student: "Aman Verma",  course: "Java Backend Engineering", grade: "A+", date: "May 2025",    status: "Issued"  },
  { student: "Rohan Mehta", course: "React Development",        grade: "B+", date: "Apr 2025",    status: "Issued"  },
  { student: "Sara Gupta",  course: "AWS Fundamentals",         grade: "--", date: "In Progress", status: "Pending" },
  { student: "Ayesha Khan", course: "Java Backend Engineering", grade: "--", date: "In Progress", status: "Pending" },
];

const PLACEMENTS = [
  { student: "Aman Verma",  batch: "Java Batch 11", company: "Infosys",     role: "Backend Dev",    package: "₹7.5L", status: "Joined"         },
  { student: "Deepak Nair", batch: "React Batch 7", company: "TCS Digital", role: "Frontend Dev",   package: "₹6.8L", status: "Joined"         },
  { student: "Sneha Rao",   batch: "Java Batch 10", company: "Wipro",       role: "Java Engineer",  package: "₹8.2L", status: "Offer Accepted" },
  { student: "Aryan Das",   batch: "AWS Batch 4",   company: "HCL Cloud",   role: "Cloud Engineer", package: "₹9.5L", status: "Interviewing"   },
];

const FEEDBACK = [
  { name: "Ayesha K.", rating: 5, text: "Trainer Rahul explained Spring Boot in a very practical way.", batch: "Java 12" },
  { name: "Rohan M.",  rating: 4, text: "React workshop was great. More coding exercises would help.",  batch: "React 8" },
  { name: "Sara G.",   rating: 5, text: "AWS batch resources are very well organised. Loving it!",      batch: "AWS 5"   },
];

const REPORTS = [
  { icon: BarChart2,     title: "Monthly Enrollment Report",   desc: "All enrollments in the current month across batches." },
  { icon: GraduationCap, title: "Trainer Performance Report",  desc: "Session delivery, attendance, and feedback summary."  },
  { icon: Rocket,        title: "Placement Statistics Report", desc: "Placement rates, companies, packages for the quarter." },
  { icon: ClipboardList, title: "Batch Completion Report",     desc: "Completion rates, quiz scores, and certifications."   },
];

const ROADMAP = [
  { step: "Step 1", title: "Create Batch & Set Schedule",           status: "done"    },
  { step: "Step 2", title: "Assign Trainers & Students",            status: "done"    },
  { step: "Step 3", title: "Upload Resources & Materials",          status: "current" },
  { step: "Step 4", title: "Launch Live Sessions",                  status: "locked"  },
  { step: "Step 5", title: "Review Progress & Assessments",         status: "locked"  },
  { step: "Step 6", title: "Issue Certificates & Track Placements", status: "locked"  },
];

const ACTIVITY_LOG = [
  { event: "New Student Enrolled", user: "Ayesha Khan", module: "Java Backend Batch 12", time: "2 min ago",  status: "Success",   statusColor: "#22c55e" },
  { event: "Trainer Assigned",     user: "Rahul S.",    module: "React Batch 8",         time: "18 min ago", status: "Done",      statusColor: "#22c55e" },
  { event: "Resource Uploaded",    user: "Admin",       module: "Spring Boot Notes",     time: "1 hr ago",   status: "Published", statusColor: "#3b82f6" },
  { event: "Certificate Issued",   user: "Rohan M.",    module: "Java Backend Batch 11", time: "3 hr ago",   status: "Issued",    statusColor: "#f97316" },
  { event: "Batch Created",        user: "Manager",     module: "AWS Batch 5",           time: "Yesterday",  status: "Active",    statusColor: "#22c55e" },
];

const MONTHS      = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const ENROLL_VALS = [82,96,74,110,138,122,145,160,143,178,192,210];

const PAGES = [
  { id: "home",         label: "Home",         icon: LayoutDashboard },
  { id: "overview",     label: "Overview",     icon: Activity        },
  { id: "batches",      label: "Batches",      icon: Package         },
  { id: "trainers",     label: "Trainers",     icon: GraduationCap   },
  { id: "students",     label: "Students",     icon: Users           },
  { id: "sessions",     label: "Sessions",     icon: Video           },
  { id: "analytics",    label: "Analytics",    icon: BarChart2       },
  { id: "resources",    label: "Resources",    icon: FolderOpen      },
  { id: "certificates", label: "Certificates", icon: Award           },
  { id: "placements",   label: "Placements",   icon: Rocket          },
  { id: "feedback",     label: "Feedback",     icon: MessageSquare   },
  { id: "workflow",     label: "Workflow",     icon: Workflow        },
];

/* ═══════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════ */
const hex2rgba = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}

const SG = "'Space Grotesk',sans-serif";

/* ═══════════════════════════════════════════════════════════════
   SHARED UI
═══════════════════════════════════════════════════════════════ */
function ProgressBar({ pct, color }) {
  const t = useTheme();
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setWidth(pct), 300);
    return () => clearTimeout(id);
  }, [pct]);
  return (
    <div style={{ background: t.barBg, borderRadius: 99, height: 8, overflow: "hidden", width: "100%" }}>
      <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${color}, ${color}cc)`, width: `${width}%`, transition: "width 1.2s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function Pill({ label, color }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", borderRadius: 99,
      padding: "3px 10px", fontSize: 11, fontWeight: 500,
      background: hex2rgba(color, 0.12), color, whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function Badge({ label }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.22)",
      borderRadius: 99, padding: "4px 14px", marginBottom: 6,
      fontSize: 12.5, fontWeight: 500, color: "#f97316",
    }}>{label}</div>
  );
}

function SectionTitle({ badge, title, sub }) {
  const t = useTheme();
  return (
    <div style={{ textAlign: "center", marginBottom: "clamp(10px,1.8vw,16px)" }}>
      <Badge label={badge} />
      <h2 style={{
        fontFamily: SG, fontSize: "clamp(20px,2.6vw,30px)", fontWeight: 500,
        lineHeight: 1.15, letterSpacing: "-.03em", color: t.text, margin: "0 0 4px",
      }} dangerouslySetInnerHTML={{ __html: title }} />
      {sub && <p style={{ color: t.textSub, fontSize: 14, maxWidth: 760, margin: "0 auto", lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

function HeadRow({ badge, title, children }) {
  const t = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(10px,1.8vw,16px)", flexWrap: "wrap", gap: 12 }}>
      <div>
        <Badge label={badge} />
        <h2 style={{ fontFamily: SG, fontSize: "clamp(20px,2.6vw,30px)", fontWeight: 500, letterSpacing: "-.03em", color: t.text, margin: 0, lineHeight: 1.15 }}
          dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{children}</div>
    </div>
  );
}

function Card({ children, style = {}, hover = true, onClick }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHov(true)}
      onMouseLeave={() => hover && setHov(false)}
      style={{
        background: t.cardBg,
        border: `1px solid ${hov ? t.borderHov : t.border}`,
        borderRadius: 16, padding: 14, boxShadow: t.shadow,
        transform: hover && hov ? "translateY(-3px)" : "none",
        transition: "all .25s", cursor: onClick ? "pointer" : "default",
        wordBreak: "break-word", ...style,
      }}
    >{children}</div>
  );
}

function StatCard({ icon: Icon, iconColor, value, label, trend, trendUp }) {
  const t = useTheme();
  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, padding: "14px 16px", boxShadow: t.shadow }}>
      <Icon size={22} color={iconColor || "#f97316"} style={{ marginBottom: 6 }} />
      <div style={{ fontFamily: SG, fontSize: "clamp(20px,2.6vw,26px)", fontWeight: 500, color: t.text, letterSpacing: "-.03em" }}>{value}</div>
      <div style={{ fontSize: 12.5, color: t.textMuted, marginTop: 2 }}>{label}</div>
      {trend && (
        <div style={{ fontSize: 12, fontWeight: 500, marginTop: 6, color: trendUp === true ? "#22c55e" : trendUp === false ? "#ef4444" : "#f97316" }}>{trend}</div>
      )}
    </div>
  );
}

function Avatar({ initials, color, size = 48 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: hex2rgba(color, 0.18), border: `2px solid ${hex2rgba(color, 0.4)}`,
      color, fontSize: size * 0.3, fontWeight: 500,
      fontFamily: SG, flexShrink: 0,
    }}>{initials}</div>
  );
}

/* Page / section wrappers — one compact, full-width container */
function PageWrapper({ children }) {
  return <div className="mh-wrap mh-pad">{children}</div>;
}
function Section({ id, children, last }) {
  const t = useTheme();
  return (
    <section id={id} className={`mh-sec${last ? " mh-sec-last" : ""}`} style={{ background: t.pageBg }}>
      <div className="mh-wrap">{children}</div>
    </section>
  );
}

function Marquee({ items, duration = 45 }) {
  const set = items.map((node, i) => <div className="mh-mq-item" key={i}>{node}</div>);
  const dup = items.map((node, i) => <div className="mh-mq-item" key={`d${i}`}>{node}</div>);
  return (
    <div className="mh-mq" style={{ "--d": `${duration}s` }}>
      <div className="mh-mq-track">
        <div className="mh-mq-set">{set}</div>
        <div className="mh-mq-set" aria-hidden="true" {...{ inert: "" }}>{dup}</div>
      </div>
    </div>
  );
}

function BtnPrimary({ children, onClick, style = {} }) {
  return (
    <button onClick={onClick} style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", fontWeight: 500, fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", ...style }}>{children}</button>
  );
}
function BtnGhost({ children, onClick }) {
  const t = useTheme();
  return (
    <button onClick={onClick} style={{ background: "transparent", border: `1.5px solid ${t.border}`, color: t.text, borderRadius: 10, padding: "8px 14px", fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>{children}</button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TABLES / CHARTS
═══════════════════════════════════════════════════════════════ */
const thStyle = (t) => ({ color: t.textMuted, fontWeight: 500, fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", padding: "8px 14px", borderBottom: `1px solid ${t.border}`, textAlign: "left", whiteSpace: "nowrap" });
const tdStyle = (t, extra = {}) => ({ padding: "9px 14px", borderBottom: `1px solid ${t.border}`, ...extra });

function ActivityTable({ w }) {
  const t = useTheme();
  if (w < 640) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "10px 12px" }}>
        {ACTIVITY_LOG.map((row, i) => (
          <div key={i} style={{ background: t.iconBg, borderRadius: 12, padding: "10px 12px", border: `1px solid ${t.border}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4, gap: 8 }}>
              <span style={{ fontWeight: 500, color: t.text, fontSize: 13 }}>{row.event}</span>
              <Pill label={row.status} color={row.statusColor} />
            </div>
            <div style={{ fontSize: 12, color: t.textSub }}>{row.user} · {row.module}</div>
            <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3 }}>{row.time}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead><tr>{["Event", "User", "Module", "Time", "Status"].map(h => <th key={h} style={thStyle(t)}>{h}</th>)}</tr></thead>
        <tbody>
          {ACTIVITY_LOG.map((row, i) => (
            <tr key={i}
              onMouseEnter={e => (e.currentTarget.style.background = t.iconBg)}
              onMouseLeave={e => (e.currentTarget.style.background = "")}>
              <td style={tdStyle(t, { color: t.text })}>{row.event}</td>
              <td style={tdStyle(t, { color: t.textSub })}>{row.user}</td>
              <td style={tdStyle(t, { color: t.textSub })}>{row.module}</td>
              <td style={tdStyle(t, { color: t.textMuted, whiteSpace: "nowrap" })}>{row.time}</td>
              <td style={tdStyle(t)}><Pill label={row.status} color={row.statusColor} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EnrollmentChart() {
  const t = useTheme();
  const maxVal = 220, W = 580, H = 180, pad = 40, bW = 32;
  const gap = (W - pad * 2 - MONTHS.length * bW) / (MONTHS.length - 1);
  return (
    <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, padding: "clamp(12px,2.4vw,20px)", boxShadow: t.shadow }}>
      <div style={{ fontFamily: SG, fontWeight: 500, fontSize: "clamp(14px,2vw,16px)", color: t.text, marginBottom: 2, letterSpacing: "-.02em" }}>Monthly Enrollments</div>
      <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 12 }}>New student enrollments per month (2025)</div>
      <div style={{ overflowX: "auto" }}>
        <svg viewBox={`0 0 ${W} ${H + 24}`} style={{ width: "100%", minWidth: 300 }}>
          {MONTHS.map((m, i) => {
            const x = pad + i * (bW + gap);
            const h2 = Math.round((ENROLL_VALS[i] / maxVal) * (H - 20));
            const y = H - h2;
            const hl = i >= 9;
            return (
              <g key={m}>
                <rect x={x} y={y} width={bW} rx={5} height={h2} fill={hl ? "#f97316" : "rgba(249,115,22,0.32)"} />
                <text x={x + bW / 2} y={H + 14} textAnchor="middle" fill={t.textMuted} fontSize={10} fontFamily="Plus Jakarta Sans,sans-serif">{m}</text>
                {hl && <text x={x + bW / 2} y={y - 6} textAnchor="middle" fill="#f97316" fontSize={10} fontWeight={500} fontFamily="Space Grotesk,sans-serif">{ENROLL_VALS[i]}</text>}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function RoadmapList() {
  const t = useTheme();
  return (
    <div style={{ position: "relative" }}>
      <div className="mh-rm-line" style={{ position: "absolute", left: 21, top: 22, bottom: 22, width: 2, background: `linear-gradient(to bottom, #f97316, ${t.border})` }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ROADMAP.map((r, i) => {
          const done = r.status === "done", cur = r.status === "current", locked = r.status === "locked";
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
              <div className="mh-rm-dot" style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0, zIndex: 1,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: done ? "#f97316" : cur ? "rgba(249,115,22,.12)" : t.iconBg,
                border: `2px solid ${done || cur ? "#f97316" : t.border}`,
                color: done ? "#fff" : cur ? "#f97316" : t.textMuted,
                boxShadow: done ? "0 0 0 4px rgba(249,115,22,.18)" : cur ? "0 0 0 6px rgba(249,115,22,.1)" : "none",
              }}>
                {done ? <CheckCircle2 size={19} /> : cur ? <ArrowRight size={19} /> : <Lock size={16} />}
              </div>
              <div style={{
                flex: 1, minWidth: 0, background: t.cardBg,
                border: `1px solid ${cur ? "rgba(249,115,22,.35)" : t.border}`,
                borderRadius: 14, padding: "12px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
                boxShadow: cur ? "0 4px 20px rgba(249,115,22,.15)" : t.shadow, opacity: locked ? 0.55 : 1,
              }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 500, marginBottom: 2, letterSpacing: ".04em", textTransform: "uppercase" }}>{r.step}</div>
                  <div style={{ fontFamily: SG, fontSize: "clamp(13px,2vw,15px)", fontWeight: 500, color: t.text, letterSpacing: "-.02em" }}>{r.title}</div>
                </div>
                {done && <span style={{ background: "rgba(34,197,94,.12)", color: "#22c55e", border: "1px solid rgba(34,197,94,.25)", borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0 }}><CheckCircle2 size={11} /> Done</span>}
                {cur && <span style={{ background: "rgba(249,115,22,.12)", color: "#f97316", border: "1px solid rgba(249,115,22,.25)", borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0 }}><ArrowRight size={11} /> Active</span>}
                {locked && <span style={{ background: t.pillBg, color: t.textMuted, border: `1px solid ${t.border}`, borderRadius: 99, padding: "4px 10px", fontSize: 11, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0 }}><Lock size={11} /> Locked</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CARD COMPONENTS
═══════════════════════════════════════════════════════════════ */
function FeatureCard({ f }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  const Icon = f.icon;
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="mh-pc"
      style={{
        background: hov
          ? `linear-gradient(145deg,${hex2rgba(f.color, 0.1)} 0%,${t.cardBg} 60%)`
          : `linear-gradient(145deg,${hex2rgba(f.color, 0.05)} 0%,${t.cardBg} 55%)`,
        borderRadius: 16, padding: "16px 16px",
        border: `1.5px solid ${hov ? hex2rgba(f.color, 0.4) : hex2rgba(f.color, 0.18)}`,
        borderTop: `3px solid ${f.color}`,
        boxShadow: hov ? `0 12px 36px ${hex2rgba(f.color, 0.18)}` : `0 2px 12px ${hex2rgba(f.color, 0.07)}`,
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all .25s", cursor: "pointer", wordBreak: "break-word",
      }}
    >
      <div className="mh-ico2" style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, background: hex2rgba(f.color, 0.12), border: `1.5px solid ${hex2rgba(f.color, 0.3)}` }}>
        <Icon size={20} color={f.color} />
      </div>
      <h3 style={{ fontFamily: SG, fontSize: "clamp(14px,2vw,16px)", fontWeight: 500, color: f.color, margin: "0 0 6px", letterSpacing: "-.02em" }}>{f.title}</h3>
      <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.55, margin: 0 }}>{f.desc}</p>
    </div>
  );
}

function BatchCard({ b }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="mh-bc"
      style={{
        background: t.cardBg, borderRadius: 16, overflow: "hidden",
        border: `1px solid ${hov ? hex2rgba(b.color, 0.5) : hex2rgba(b.color, 0.28)}`,
        boxShadow: t.shadow, transform: hov ? "translateY(-3px)" : "none", transition: "all .25s",
        display: "flex", flexDirection: "column",
      }}
    >
      <div className="mh-bc-top" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", background: hex2rgba(b.color, 0.12) }}>
        <Package size={32} color={b.color} />
      </div>
      <div className="mh-bc-in" style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
          <span style={{ background: hex2rgba(b.color, 0.15), color: b.color, borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 500 }}>{b.tag}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ background: "rgba(34,197,94,.12)", color: "#22c55e", borderRadius: 99, padding: "3px 8px", fontSize: 11, fontWeight: 500 }}>{b.status}</span>
            <span style={{ color: b.color, fontWeight: 500, fontSize: 14, fontFamily: SG }}>{b.progress}%</span>
          </div>
        </div>
        <h3 style={{ fontFamily: SG, fontSize: "clamp(13px,2vw,15px)", fontWeight: 500, color: t.text, margin: "0 0 4px", letterSpacing: "-.02em" }}>{b.title}</h3>
        <div style={{ fontSize: 12, color: t.textMuted, marginBottom: 8 }}>Trainer: {b.trainer} · {b.students} students</div>
        <ProgressBar pct={b.progress} color={b.color} />
        <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 12 }}>
          <button style={{ flex: 1, background: b.color, color: "#fff", border: "none", borderRadius: 10, padding: "8px 0", fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Manage</button>
          <button style={{ flex: 1, background: "transparent", border: `1.5px solid ${b.color}`, color: b.color, borderRadius: 10, padding: "8px 0", fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>+ Assign</button>
        </div>
      </div>
    </div>
  );
}

function TrainerCard({ tr }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="mh-pc"
      style={{
        background: t.cardBg, borderRadius: 18, padding: "18px 16px",
        border: `1px solid ${hov ? hex2rgba(tr.color, 0.4) : t.border}`,
        boxShadow: t.shadow, transform: hov ? "translateY(-4px)" : "none",
        transition: "all .25s", textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Avatar initials={tr.initials} color={tr.color} size={60} />
      </div>
      <div style={{ fontFamily: SG, fontSize: "clamp(15px,2vw,17px)", fontWeight: 500, color: t.text, margin: "10px 0 2px", letterSpacing: "-.02em" }}>{tr.name}</div>
      <div style={{ fontSize: 13, color: t.textSub, marginBottom: 6 }}>{tr.role}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: t.textMuted, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {tr.exp}</span>
        <span style={{ color: "#f59e0b", fontSize: 12.5, fontWeight: 500, fontFamily: SG, display: "flex", alignItems: "center", gap: 3 }}><Star size={12} fill="#f59e0b" stroke="none" /> {tr.rating}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginBottom: 12 }}>
        {[["Batches", tr.batches], ["Students", tr.students]].map(([l, v]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: SG, fontSize: 17, fontWeight: 500, color: tr.color }}>{v}</div>
            <div style={{ fontSize: 11, color: t.textMuted }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ flex: 1, background: tr.color, color: "#fff", border: "none", borderRadius: 10, padding: "8px 0", fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Assign Batch</button>
        <button style={{ flex: 1, background: "transparent", border: `1.5px solid ${tr.color}`, color: tr.color, borderRadius: 10, padding: "8px 0", fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>View Profile</button>
      </div>
    </div>
  );
}

function ResourceCard({ r }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  const Icon = r.icon;
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="mh-pc"
      style={{
        background: t.cardBg, borderRadius: 16, padding: "14px 14px",
        border: `1px solid ${hov ? hex2rgba(r.color, 0.4) : t.border}`,
        boxShadow: t.shadow, transform: hov ? "translateY(-3px)" : "none",
        transition: "all .25s", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: 6,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ background: hex2rgba(r.color, 0.12), border: `1px solid ${hex2rgba(r.color, 0.22)}`, borderRadius: 11, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={19} color={r.color} />
        </div>
        <span style={{ background: hex2rgba(r.color, 0.12), color: r.color, fontSize: 11, fontWeight: 500, padding: "2px 9px", borderRadius: 99, whiteSpace: "nowrap" }}>{r.tag}</span>
      </div>
      <h3 style={{ fontFamily: SG, fontSize: 15, fontWeight: 500, color: t.text, margin: "4px 0 0", letterSpacing: "-.02em" }}>{r.title}</h3>
      <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.5, margin: 0 }}>{r.desc}</p>
      <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 8 }}>
        <button style={{ flex: 1, background: r.color, color: "#fff", border: "none", borderRadius: 10, padding: 8, fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <Upload size={13} /> Upload
        </button>
        <button style={{ flex: 1, background: "transparent", border: `1.5px solid ${r.color}`, color: r.color, borderRadius: 10, padding: 8, fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Manage</button>
      </div>
    </div>
  );
}

function SessionCard({ s }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="mh-pc"
      style={{
        background: t.cardBg, borderRadius: 16, padding: 16,
        border: `1px solid ${hov ? hex2rgba(s.color, 0.4) : t.border}`,
        boxShadow: t.shadow, transform: hov ? "translateY(-3px)" : "none", transition: "all .25s",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Avatar initials={s.avatar} color={s.color} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {s.live && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(239,68,68,.12)", color: "#ef4444", fontSize: 10.5, fontWeight: 500, padding: "2px 8px", borderRadius: 99, marginBottom: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "mhPulse 1.4s infinite" }} /> LIVE
            </div>
          )}
          <h3 style={{ fontFamily: SG, fontSize: "clamp(14px,2vw,16px)", fontWeight: 500, color: t.text, margin: "0 0 3px", letterSpacing: "-.02em" }}>{s.title}</h3>
          <div style={{ fontSize: 12, color: t.textMuted, display: "flex", alignItems: "center", gap: 5 }}><Calendar size={12} /> {s.time}</div>
          <div style={{ fontSize: 12, color: t.textSub, marginTop: 3 }}>Trainer: {s.trainer}{s.attendance ? ` · ${s.attendance} joined` : ""}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button style={{ flex: 1, background: s.live ? "#ef4444" : s.color, color: "#fff", border: "none", borderRadius: 10, padding: "8px 0", fontWeight: 500, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontFamily: "inherit" }}>
          <PlayCircle size={14} /> {s.live ? "Monitor Live" : "Schedule"}
        </button>
        <button style={{ flex: 1, background: "transparent", border: `1.5px solid ${t.border}`, color: t.textSub, borderRadius: 10, padding: "8px 0", fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Edit2 size={13} /> Edit
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MANAGER JOURNEY (flow diagram + 6 stages)
═══════════════════════════════════════════════════════════════ */
const MJ_JOURNEY = [
  { n: 1, color: "#F97316", Icon: LayoutDashboard, title: "Overview & Monitor",  short: "Dashboard snapshot",
    what: "Live snapshot of batches, students, trainers, sessions and placements.",
    benefit: "Spot what needs attention first.",
    links: [["Overview", "overview"]] },
  { n: 2, color: "#3b82f6", Icon: Package,         title: "Batches & Trainers",  short: "Create & assign",
    what: "Create batches, set schedules and assign trainers.",
    benefit: "The right trainer on every batch.",
    links: [["Batches", "batches"], ["Trainers", "trainers"]] },
  { n: 3, color: "#8b5cf6", Icon: Users,           title: "Students & Sessions", short: "Enroll & run classes",
    what: "Enroll students, track progress and monitor live sessions.",
    benefit: "Catch at-risk learners early.",
    links: [["Students", "students"], ["Sessions", "sessions"]] },
  { n: 4, color: "#ec4899", Icon: FolderOpen,      title: "Learning Resources",  short: "Notes, videos, tasks",
    what: "Upload and organise PDFs, recordings, lectures and assignments.",
    benefit: "Study material ready for every batch.",
    links: [["Resources", "resources"]] },
  { n: 5, color: "#22c55e", Icon: Award,           title: "Certify & Place",     short: "Certificates & jobs",
    what: "Issue certificates and track placements and offers.",
    benefit: "Proof of skills and hiring outcomes.",
    links: [["Certificates", "certificates"], ["Placements", "placements"]] },
  { n: 6, color: "#f59e0b", Icon: BarChart2,       title: "Review & Improve",    short: "Analytics & feedback",
    what: "Analytics, feedback, reports and the standard workflow.",
    benefit: "Fix gaps and run the next batch better.",
    links: [["Analytics", "analytics"], ["Feedback", "feedback"], ["Workflow", "workflow"]] },
];

const MJ_OVERVIEW = [
  { color: "#F97316", Icon: Users,           label: "Who it’s for", title: "Managers & admins",           text: "Authorized users who run batches, trainers and learner outcomes." },
  { color: "#3b82f6", Icon: LayoutDashboard, label: "What it is",   title: "One control panel",           text: "Batches, trainers, students, sessions, resources and placements together." },
  { color: "#8b5cf6", Icon: Route,           label: "How it works", title: "Six stages, one loop",        text: "Monitor, organise, run, resource, certify, review. Insights feed the next batch." },
  { color: "#22c55e", Icon: Target,          label: "Benefit",      title: "Less admin, better outcomes", text: "Fewer tools to juggle, clearer progress, faster decisions." },
];

const MJ_CSS = `
#mhj, #mhj *, #mhj *::before, #mhj *::after { box-sizing: border-box; }
#mhj { padding: clamp(16px, 2.6vw, 26px) 0; }
#mhj .mj-in { max-width: 1760px; margin: 0 auto; padding: 0 clamp(12px, 2.4vw, 32px); }
#mhj .mj-head { text-align: center; margin-bottom: clamp(12px, 2vw, 18px); }
#mhj .mj-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(249,115,22,.08); border: 1px solid rgba(249,115,22,.22); border-radius: 99px; padding: 5px 14px; margin-bottom: 8px; font-size: 12.5px; font-weight: 500; color: #f97316; }
#mhj .mj-head h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(20px, 2.6vw, 30px); font-weight: 500; line-height: 1.15; letter-spacing: -.03em; color: var(--mj-text); margin: 0 0 6px; }
#mhj .mj-head p { font-size: 14px; line-height: 1.5; color: var(--mj-sub); max-width: 620px; margin: 0 auto; }

#mhj .mj-ico { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 38px; height: 38px; border-radius: 11px; color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); border: 1px solid color-mix(in srgb, var(--c) 28%, transparent); }

#mhj .mj-ov { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; margin-bottom: clamp(12px, 2vw, 16px); }
#mhj .mj-oc { display: flex; flex-direction: column; gap: 4px; min-width: 0; padding: 12px 14px; border-radius: 16px; background: var(--mj-card); border: 1px solid var(--mj-border); border-top: 3px solid var(--c); box-shadow: var(--mj-shadow); }
#mhj .mj-oc small { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; color: var(--c); }
#mhj .mj-oc h3 { font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; font-weight: 500; line-height: 1.3; color: var(--mj-text); margin: 0; overflow-wrap: anywhere; }
#mhj .mj-oc p { font-size: 12.5px; line-height: 1.45; color: var(--mj-sub); margin: 0; }
#mhj .mj-go { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 6px; }
#mhj .mj-go button { font-family: inherit; font-size: 12.5px; font-weight: 500; border-radius: 10px; padding: 6px 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
#mhj .mj-go .p { background: #f97316; color: #fff; border: 1.5px solid #f97316; }
#mhj .mj-go .s { background: transparent; color: var(--mj-text); border: 1.5px solid var(--mj-border); }

#mhj .mj-flow { background: var(--mj-card); border: 1px solid var(--mj-border); border-radius: 18px; box-shadow: var(--mj-shadow); padding: clamp(14px, 2.5vw, 20px); margin-bottom: 14px; min-width: 0; }
#mhj .mj-flow-h { display: flex; align-items: center; justify-content: space-between; gap: 4px 12px; flex-wrap: wrap; margin-bottom: 14px; }
#mhj .mj-flow-h h3 { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 500; margin: 0; color: var(--mj-text); }
#mhj .mj-flow-h span { font-size: 12px; color: var(--mj-muted); }
#mhj .mj-fg { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0 24px; }
#mhj .mj-fn { position: relative; display: flex; min-width: 0; }
#mhj .mj-fn > a { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; padding: 12px 8px; border-radius: 14px; text-decoration: none; color: inherit; border: 1.5px solid color-mix(in srgb, var(--c) 32%, transparent); background: linear-gradient(160deg, color-mix(in srgb, var(--c) 10%, transparent), var(--mj-card) 72%); transition: transform .25s, box-shadow .25s, border-color .25s; }
#mhj .mj-fn > a:hover { transform: translateY(-3px); border-color: var(--c); box-shadow: 0 8px 22px color-mix(in srgb, var(--c) 22%, transparent); }
#mhj .mj-fn > a:focus-visible, #mhj .mj-chips button:focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }
#mhj .mj-fn-num { font-size: 11.5px; font-weight: 500; color: #fff; background: var(--c); border-radius: 99px; padding: 1px 9px; white-space: nowrap; }
#mhj .mj-fn-t { display: block; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 500; line-height: 1.25; letter-spacing: -.02em; color: var(--mj-text); overflow-wrap: anywhere; }
#mhj .mj-fn-s { display: block; margin-top: 3px; font-size: 11.5px; line-height: 1.4; color: var(--mj-sub); }
#mhj .mj-fn-chip { display: none; margin-top: 5px; font-size: 11px; color: #f97316; background: rgba(249,115,22,.1); border: 1px solid rgba(249,115,22,.25); border-radius: 99px; padding: 1px 9px; }
#mhj .mj-fn:nth-child(-n+5)::after { content: "→"; position: absolute; right: -22px; top: 50%; margin-top: -10px; width: 20px; height: 20px; border-radius: 50%; background: #f97316; color: #fff; font-size: 11px; line-height: 20px; text-align: center; z-index: 2; }
#mhj .mj-fl { grid-column: 2 / 7; position: relative; margin: 10px calc((100% - 96px) / 10) 18px; height: 30px; border: 2px dashed #f97316; border-top: 0; border-radius: 0 0 16px 16px; list-style: none; }
#mhj .mj-fl-t { position: absolute; top: -12px; height: 12px; border-left: 2px dashed #f97316; }
#mhj .mj-fl-t.a { left: -2px; } #mhj .mj-fl-t.b { left: calc(25% - 1px); } #mhj .mj-fl-t.c { left: calc(50% - 1px); } #mhj .mj-fl-t.d { right: -2px; }
#mhj .mj-fl-t.a::before, #mhj .mj-fl-t.b::before, #mhj .mj-fl-t.c::before { content: ""; position: absolute; top: -1px; left: -6px; border: 5px solid transparent; border-top: 0; border-bottom: 8px solid #f97316; }
#mhj .mj-fl-lbl { position: absolute; left: 50%; bottom: -13px; transform: translateX(-50%); display: flex; align-items: center; gap: 6px; max-width: calc(100% + 40px); background: var(--mj-card); border: 1.5px solid rgba(249,115,22,.4); border-radius: 99px; padding: 4px 12px; font-size: 12px; color: #f97316; text-align: center; line-height: 1.3; }
#mhj .mj-fl-desc { display: none; }

#mhj .mj-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 0 26px; position: relative; align-items: stretch; }
#mhj .mj-st { position: relative; display: flex; scroll-margin-top: 90px; }
#mhj .mj-card { flex: 1; min-width: 0; padding: 12px; border-radius: 16px; background: var(--mj-card); border: 1px solid var(--mj-border); border-top: 3px solid var(--c); box-shadow: var(--mj-shadow); display: flex; flex-direction: column; gap: 8px; transition: transform .25s, box-shadow .25s; }
#mhj .mj-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px color-mix(in srgb, var(--c) 22%, transparent); }
#mhj .mj-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
#mhj .mj-top .mj-ico { width: 34px; height: 34px; border-radius: 10px; }
#mhj .mj-n { font-size: 12px; font-weight: 500; color: var(--c); background: color-mix(in srgb, var(--c) 12%, transparent); border-radius: 99px; padding: 2px 9px; }
#mhj .mj-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500; line-height: 1.25; letter-spacing: -.02em; color: var(--mj-text); margin: 0; overflow-wrap: anywhere; }
#mhj .mj-what { font-size: 12.5px; line-height: 1.45; color: var(--mj-sub); margin: 0; }
#mhj .mj-ben { display: flex; align-items: flex-start; gap: 6px; font-size: 12px; line-height: 1.4; color: var(--mj-text); background: color-mix(in srgb, var(--c) 9%, transparent); border-radius: 8px; padding: 6px 8px; margin: 0; }
#mhj .mj-ben svg { color: var(--c); flex-shrink: 0; margin-top: 1px; }
#mhj .mj-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; padding-top: 2px; }
#mhj .mj-chips button { font-family: inherit; font-size: 11.5px; padding: 3px 9px; border-radius: 99px; background: var(--mj-pill); border: 1px solid var(--mj-border); color: var(--mj-text); display: inline-flex; align-items: center; gap: 2px; cursor: pointer; }
#mhj .mj-chips button:hover { border-color: var(--c); color: var(--c); }
#mhj .mj-dot { display: none; }
#mhj .mj-st:not(:last-child)::after { content: "→"; position: absolute; right: -25px; top: 22px; width: 22px; height: 22px; border-radius: 50%; background: #f97316; color: #fff; font-size: 12px; line-height: 22px; text-align: center; z-index: 2; }
#mhj .mj-loop { margin: 14px auto 0; width: fit-content; max-width: 100%; text-align: center; font-size: 13px; line-height: 1.55; color: var(--mj-sub); padding: 10px 16px; border: 1.5px dashed var(--mj-border); border-radius: 12px; background: var(--mj-card); }
#mhj .mj-loop b { color: #f97316; font-weight: 500; }
@media (min-width: 1280px) { #mhj .mj-card h3 { min-height: 2.5em; } }
@media (min-width: 1100px) { #mhj .mj-loop { white-space: nowrap; } }

@media (max-width: 1279px) {
  #mhj .mj-list { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 30px; }
  #mhj .mj-st:nth-child(4) { grid-column: 3; grid-row: 2; }
  #mhj .mj-st:nth-child(5) { grid-column: 2; grid-row: 2; }
  #mhj .mj-st:nth-child(6) { grid-column: 1; grid-row: 2; }
  #mhj .mj-st:nth-child(3)::after { content: "↓"; right: auto; left: 50%; top: auto; bottom: -27px; margin-left: -11px; }
  #mhj .mj-st:nth-child(4)::after, #mhj .mj-st:nth-child(5)::after { content: "←"; right: auto; left: -26px; }
}
@media (max-width: 1099px) {
  #mhj .mj-ov { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  #mhj .mj-oc:last-child { grid-column: 1 / -1; }
  #mhj .mj-fg { display: flex; flex-direction: column; gap: 20px; }
  #mhj .mj-fn > a { flex-direction: row; text-align: left; gap: 12px; padding: 10px 12px; }
  #mhj .mj-fn-t { font-size: 14px; } #mhj .mj-fn-s { font-size: 12px; }
  #mhj .mj-fn:nth-child(-n+5)::after { content: "↓"; right: auto; left: 50%; margin-left: -10px; top: auto; bottom: -21px; margin-top: 0; }
  #mhj .mj-fn:nth-child(6) .mj-fn-chip { display: inline-block; }
  #mhj .mj-fl { margin: 0; height: auto; border: 1.5px dashed #f97316; border-radius: 12px; padding: 8px 12px; background: rgba(249,115,22,.05); }
  #mhj .mj-fl-t { display: none; }
  #mhj .mj-fl-lbl { position: static; transform: none; max-width: none; background: none; border: 0; padding: 0; justify-content: center; flex-wrap: wrap; }
  #mhj .mj-fl-desc { display: block; margin-top: 4px; font-size: 12px; color: var(--mj-sub); text-align: center; line-height: 1.5; }
}
@media (max-width: 900px) {
  #mhj .mj-list { display: flex; flex-direction: column; gap: 20px; }
  #mhj .mj-list::before { content: ""; position: absolute; left: 17px; top: 18px; bottom: 18px; width: 2px; background: linear-gradient(#f97316, var(--mj-border)); }
  #mhj .mj-st { padding-left: 50px; grid-column: auto !important; grid-row: auto !important; }
  #mhj .mj-dot { display: flex; position: absolute; left: 0; top: 10px; width: 36px; height: 36px; border-radius: 50%; align-items: center; justify-content: center; background: #f97316; color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500; z-index: 1; box-shadow: 0 0 0 4px rgba(249,115,22,.15); }
  #mhj .mj-st:nth-child(n)::after { content: "↓"; left: 7px !important; right: auto !important; top: auto !important; bottom: -22px !important; margin: 0 !important; }
  #mhj .mj-st:last-child::after { display: none !important; }
  #mhj .mj-n { display: none; }
  #mhj .mj-card { padding: 12px 14px; }
}
@media (max-width: 520px) { #mhj .mj-ov { grid-template-columns: 1fr; } }
@media (max-width: 380px) { #mhj .mj-st { padding-left: 42px; } #mhj .mj-dot { width: 32px; height: 32px; font-size: 13px; } #mhj .mj-list::before { left: 15px; } }
`;

function ManagerJourney({ setPage }) {
  const t = useTheme();
  const vars = {
    "--mj-card": t.cardBg, "--mj-border": t.border, "--mj-text": t.text,
    "--mj-sub": t.textSub, "--mj-muted": t.textMuted, "--mj-pill": t.pillBg, "--mj-shadow": t.shadow,
  };
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const openPage = (id) => () => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="mhj" style={{ ...vars, background: t.pageBg }}>
      <style>{MJ_CSS}</style>
      <div className="mj-in">
        <div className="mj-head">
          <div className="mj-badge"><Route size={13} /> Manager Journey</div>
          <h2>Six Stages From <span style={{ color: "#f97316" }}>Setup To Results</span></h2>
          <p>See who the Manager Hub is for, what each stage does and how it helps. Every stage opens a tool you already have.</p>
        </div>

        <div className="mj-ov" role="list" aria-label="Manager Hub at a glance">
          {MJ_OVERVIEW.map(o => (
            <div key={o.label} role="listitem" className="mj-oc" style={{ "--c": o.color }}>
              <small><o.Icon size={13} />{o.label}</small>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </div>
          ))}
          <div role="listitem" className="mj-oc" style={{ "--c": "#f97316" }}>
            <small><ArrowRight size={13} />What’s next</small>
            <h3>Start with the overview</h3>
            <p>Check today’s numbers, then manage batches.</p>
            <div className="mj-go">
              <button type="button" className="p" onClick={openPage("overview")}><LayoutDashboard size={12} /> Overview</button>
              <button type="button" className="s" onClick={openPage("batches")}>Batches</button>
            </div>
          </div>
        </div>

        <div className="mj-flow" role="group" aria-labelledby="mj-flow-t">
          <div className="mj-flow-h"><h3 id="mj-flow-t">Manager journey at a glance</h3><span>Tap a stage to jump to its details</span></div>
          <ol className="mj-fg" aria-label="Six-stage manager journey with a feedback loop from Review and Improve back to Batches, Students and Resources">
            {MJ_JOURNEY.map(j => (
              <li key={j.n} className="mj-fn" style={{ "--c": j.color }}>
                <a href={`#mhj-stage-${j.n}`} onClick={scrollTo(`mhj-stage-${j.n}`)} aria-label={`Stage ${j.n} of 6: ${j.title}. ${j.short}.`}>
                  <span className="mj-fn-num" aria-hidden="true">Stage {j.n}</span>
                  <span className="mj-ico" aria-hidden="true"><j.Icon size={20} /></span>
                  <span>
                    <span className="mj-fn-t">{j.title}</span>
                    <span className="mj-fn-s">{j.short}</span>
                    {j.n === 6 && <span className="mj-fn-chip" aria-hidden="true">↻ Loops back to 2, 3 &amp; 4</span>}
                  </span>
                </a>
              </li>
            ))}
            <li className="mj-fl" aria-label="Feedback loop: insights from Review and Improve go back to Batches, Students and Resources">
              <span className="mj-fl-t a" aria-hidden="true" /><span className="mj-fl-t b" aria-hidden="true" /><span className="mj-fl-t c" aria-hidden="true" /><span className="mj-fl-t d" aria-hidden="true" />
              <span className="mj-fl-lbl"><span aria-hidden="true">↻</span> Insights feed your next batch</span>
              <span className="mj-fl-desc">Insights from Review &amp; Improve (Stage 6) shape how you set up Batches (2), run Students &amp; Sessions (3) and prepare Resources (4).</span>
            </li>
          </ol>
        </div>

        <ol className="mj-list">
          {MJ_JOURNEY.map(j => (
            <li key={j.n} className="mj-st" id={`mhj-stage-${j.n}`}>
              <span className="mj-dot">{j.n}</span>
              <article className="mj-card" style={{ "--c": j.color }}>
                <div className="mj-top"><span className="mj-ico"><j.Icon size={18} /></span><span className="mj-n">Stage {j.n}</span></div>
                <h3>{j.title}</h3>
                <p className="mj-what">{j.what}</p>
                <p className="mj-ben"><CheckCircle2 size={13} aria-hidden="true" /><span>{j.benefit}</span></p>
                <div className="mj-chips">
                  {j.links.map(([label, id]) => (
                    <button key={id} type="button" onClick={openPage(id)}>{label} <ChevronRight size={12} /></button>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
        <p className="mj-loop"><b>It’s a loop, not a line.</b> What you learn in <b>Review &amp; Improve</b> shapes how you set up, run and resource the next batch.</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MANAGER HERO
═══════════════════════════════════════════════════════════════ */
const MH_HERO_ACTIONS = [
  { color: "#F97316", Icon: LayoutDashboard, title: "Open Overview",   desc: "Today’s numbers and activity log.", to: "overview", primary: true },
  { color: "#3b82f6", Icon: Package,         title: "Manage Batches",  desc: "Create, edit and track batches.",   to: "batches" },
  { color: "#8b5cf6", Icon: GraduationCap,   title: "Assign Trainers", desc: "Review and assign trainers.",       to: "trainers" },
  { color: "#22c55e", Icon: BarChart2,       title: "View Analytics",  desc: "Skills, enrollments and trends.",   to: "analytics" },
];

const MH_GLANCE = [
  { color: "#F97316", Icon: Package,       label: "Active Batches",      value: "48" },
  { color: "#3b82f6", Icon: Users,         label: "Total Students",      value: "1,240" },
  { color: "#8b5cf6", Icon: GraduationCap, label: "Active Trainers",     value: "24" },
  { color: "#ef4444", Icon: Video,         label: "Live Sessions Today", value: "3" },
  { color: "#14b8a6", Icon: Award,         label: "Certificates Issued", value: "342" },
  { color: "#22c55e", Icon: Rocket,        label: "Placement Rate",      value: "91%" },
  { color: "#f59e0b", Icon: Briefcase,     label: "Students Placed",     value: "87" },
  { color: "#6366f1", Icon: Building2,     label: "Partner Companies",   value: "34" },
];

const MH_HERO_CSS = `
#mhh, #mhh *, #mhh *::before, #mhh *::after { box-sizing: border-box; }
#mhh { padding: clamp(12px, 2vw, 18px) 0; border-bottom: 1px solid var(--mj-border); }
#mhh .mh-in { max-width: 1760px; margin: 0 auto; padding: 0 clamp(12px, 2.4vw, 32px); }
#mhh .mh-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(249,115,22,.08); border: 1px solid rgba(249,115,22,.22); border-radius: 99px; padding: 4px 12px; margin-bottom: 10px; font-size: 12.5px; font-weight: 500; color: #f97316; }
#mhh h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(22px, 3.2vw, 32px); font-weight: 500; line-height: 1.15; letter-spacing: -.03em; color: var(--mj-text); margin: 0 0 4px; overflow-wrap: anywhere; }
#mhh .mh-sub { font-size: clamp(14px, 1.8vw, 16px); line-height: 1.6; color: var(--mj-sub); max-width: 900px; margin: 0 0 12px; }
#mhh .mh-acts { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
#mhh .mh-ac { font-family: inherit; text-align: left; cursor: pointer; display: flex; flex-direction: column; gap: 6px; padding: 14px; border-radius: 16px; min-width: 0; color: inherit; border: 1.5px solid color-mix(in srgb, var(--c) 30%, transparent); border-top: 3px solid var(--c); background: linear-gradient(150deg, color-mix(in srgb, var(--c) 8%, transparent), var(--mj-card) 60%); box-shadow: var(--mj-shadow); transition: transform .25s, box-shadow .25s; }
#mhh .mh-ac:hover { transform: translateY(-3px); box-shadow: 0 10px 26px color-mix(in srgb, var(--c) 24%, transparent); }
#mhh .mh-ac:focus-visible { outline: 2px solid #f97316; outline-offset: 3px; }
#mhh .mh-ac h3 { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 500; letter-spacing: -.02em; color: var(--mj-text); margin: 0; }
#mhh .mh-ac p { font-size: 12.5px; line-height: 1.45; color: var(--mj-sub); margin: 0; }
#mhh .mh-go { margin-top: auto; display: flex; align-items: center; gap: 4px; font-size: 12.5px; font-weight: 500; color: var(--c); }
#mhh .mh-ac.primary { background: var(--c); border-color: var(--c); box-shadow: 0 8px 24px rgba(249,115,22,.32); }
#mhh .mh-ac.primary h3, #mhh .mh-ac.primary p, #mhh .mh-ac.primary .mh-go { color: #fff; }
#mhh .mh-ico { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 40px; height: 40px; border-radius: 12px; color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); border: 1px solid color-mix(in srgb, var(--c) 28%, transparent); }
#mhh .mh-ac.primary .mh-ico { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.35); color: #fff; }
#mhh .mh-ov { margin-top: 10px; border: 1px solid var(--mj-border); border-radius: 16px; background: var(--mj-card); box-shadow: var(--mj-shadow); padding: 14px; }
#mhh .mh-ov h2 { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 500; color: var(--mj-text); margin: 0 0 10px; }
#mhh .mh-ov-g { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
#mhh .mh-ovi { display: flex; flex-direction: column; gap: 4px; padding: 10px 12px; border-radius: 12px; background: var(--mj-pill); border: 1px solid var(--mj-border); min-width: 0; }
#mhh .mh-ovi small { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; letter-spacing: .05em; text-transform: uppercase; color: var(--c); }
#mhh .mh-ovi strong { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 500; color: var(--mj-text); overflow-wrap: anywhere; }
@media (max-width: 1099px) {
  #mhh .mh-acts { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  #mhh .mh-ov-g { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 520px) {
  #mhh .mh-acts { grid-template-columns: 1fr; gap: 8px; }
  #mhh .mh-ac { flex-direction: row; align-items: center; gap: 4px 12px; padding: 12px; }
  #mhh .mh-ac > div { flex: 1; min-width: 0; }
  #mhh .mh-go { margin: 0 0 0 auto; flex-shrink: 0; }
  #mhh .mh-ov-g { gap: 8px; }
  #mhh .mh-ovi { padding: 8px 10px; }
}
`;

function ManagerHero({ setPage }) {
  const t = useTheme();
  const vars = {
    "--mj-card": t.cardBg, "--mj-border": t.border, "--mj-text": t.text,
    "--mj-sub": t.textSub, "--mj-muted": t.textMuted, "--mj-pill": t.pillBg, "--mj-shadow": t.shadow,
  };
  const open = (id) => () => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <section id="mhh" style={{ ...vars, background: t.pageBg }}>
      <style>{MH_HERO_CSS}</style>
      <div className="mh-in">
        <div className="mh-badge"><LayoutDashboard size={13} /> Manager Control Panel</div>
        <h1>Manage Your <span style={{ color: "#f97316" }}>Learning Operations</span></h1>
        <p className="mh-sub">
          Oversee batches, assign trainers, track student performance, upload resources, issue certificates and drive placements, all from one dashboard.
        </p>

        <nav className="mh-acts" aria-label="Quick actions">
          {MH_HERO_ACTIONS.map(a => (
            <button key={a.title} type="button" onClick={open(a.to)} className={`mh-ac${a.primary ? " primary" : ""}`} style={{ "--c": a.color }}>
              <span className="mh-ico" aria-hidden="true"><a.Icon size={20} /></span>
              <div><h3>{a.title}</h3><p>{a.desc}</p></div>
              <span className="mh-go">Open <ArrowRight size={13} /></span>
            </button>
          ))}
        </nav>

        <div className="mh-ov" role="region" aria-labelledby="mh-glance">
          <h2 id="mh-glance">Your platform at a glance</h2>
          <div className="mh-ov-g">
            {MH_GLANCE.map(g => (
              <div key={g.label} className="mh-ovi" style={{ "--c": g.color }}>
                <small><g.Icon size={13} />{g.label}</small>
                <strong>{g.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTENT BLOCKS (shared by Home sections AND inner pages)
═══════════════════════════════════════════════════════════════ */
function OverviewBlock() {
  const t = useTheme();
  const w = useWindowWidth();
  return (
    <>
      <SectionTitle badge="Platform Overview" title='Manager <span style="color:#f97316">Dashboard Overview</span>' sub="A real-time snapshot of everything happening across your learning platform." />
      <div className="mh-grid-xs" style={{ marginBottom: 14 }}>
        <StatCard icon={Package}       iconColor="#f97316" value="48"    label="Active Batches"     trend="↑ 6 this month"     trendUp={true} />
        <StatCard icon={Users}         iconColor="#3b82f6" value="1,240" label="Total Students"     trend="↑ 142 this month"   trendUp={true} />
        <StatCard icon={GraduationCap} iconColor="#8b5cf6" value="24"    label="Active Trainers"    trend="→ Stable" />
        <StatCard icon={Video}         iconColor="#22c55e" value="342"   label="Live Sessions Done" trend="↑ 18 this week"     trendUp={true} />
        <StatCard icon={Rocket}        iconColor="#f59e0b" value="91%"   label="Placement Rate"     trend="↑ 3% vs last batch" trendUp={true} />
      </div>
      <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", boxShadow: t.shadow }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontFamily: SG, fontWeight: 500, fontSize: "clamp(14px,2vw,16px)", color: t.text, letterSpacing: "-.02em" }}>Recent Activity Log</div>
            <div style={{ fontSize: 12, color: t.textMuted, marginTop: 1 }}>Last 5 events across the platform</div>
          </div>
          <BtnPrimary><Activity size={13} /> View All Logs</BtnPrimary>
        </div>
        <ActivityTable w={w} />
      </div>
    </>
  );
}

function FeaturesBlock({ moving }) {
  return (
    <>
      <SectionTitle badge="Admin Features" title='Everything You <span style="color:#f97316">Control</span>' sub="Complete toolkit to manage every aspect of your learning operations with precision." />
      {moving
        ? <Marquee duration={70} items={FEATURES.map(f => <FeatureCard key={f.title} f={f} />)} />
        : <div className="mh-grid-sm">{FEATURES.map(f => <FeatureCard key={f.title} f={f} />)}</div>}
    </>
  );
}

function BatchesBlock({ setPage, moving }) {
  return (
    <>
      <HeadRow badge="📦 Batch Management" title='Active <span style="color:#f97316">Batches</span>'>
        {setPage && <BtnGhost onClick={() => setPage("batches")}>View All</BtnGhost>}
        <BtnPrimary><Plus size={13} /> Create Batch</BtnPrimary>
      </HeadRow>
      {moving
        ? <Marquee items={BATCHES.map(b => <BatchCard key={b.title} b={b} />)} />
        : <div className="mh-grid">{BATCHES.map(b => <BatchCard key={b.title} b={b} />)}</div>}
    </>
  );
}

function TrainersBlock({ moving }) {
  return (
    <>
      <SectionTitle badge="Expert Mentors" title='Trainer <span style="color:#f97316">Management</span>' sub="Assign, review, and manage your panel of industry trainers with full control." />
      {moving
        ? <Marquee duration={40} items={TRAINERS.map(tr => <TrainerCard key={tr.name} tr={tr} />)} />
        : <div className="mh-grid">{TRAINERS.map(tr => <TrainerCard key={tr.name} tr={tr} />)}</div>}
    </>
  );
}

function AnalyticsBlock({ setPage }) {
  const t = useTheme();
  return (
    <>
      <SectionTitle badge="Usage Analytics" title='Platform <span style="color:#f97316">Analytics</span>' sub="Deep insights on student engagement, batch progress, and trainer performance." />
      <div className="mh-two" style={{ marginBottom: 14 }}>
        <div>
          <Badge label="📊 Skill Proficiency Across Batches" />
          <h3 style={{ fontFamily: SG, fontSize: "clamp(18px,2.4vw,22px)", fontWeight: 500, color: t.text, margin: "0 0 8px", letterSpacing: "-.02em" }}>
            Average <span style={{ color: "#f97316" }}>Skill Levels</span>
          </h3>
          <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>
            AI-aggregated skill proficiency of all enrolled students based on quizzes and coding performance.
          </p>
          <BtnPrimary onClick={setPage ? () => setPage("analytics") : undefined} style={{ borderRadius: 12, padding: "10px 18px", fontSize: 14 }}>
            <BarChart2 size={15} /> Full Analytics Report
          </BtnPrimary>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {SKILLS.map(sk => (
            <div key={sk.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: t.text, fontWeight: 500, fontSize: 14 }}>{sk.name}</span>
                <span style={{ color: sk.color, fontWeight: 500, fontSize: 14, fontFamily: SG }}>{sk.pct}%</span>
              </div>
              <ProgressBar pct={sk.pct} color={sk.color} />
            </div>
          ))}
        </div>
      </div>
      <EnrollmentChart />
    </>
  );
}

function ResourcesBlock({ moving }) {
  return (
    <>
      <SectionTitle badge="📁 Resources" title='Learning <span style="color:#f97316">Resources</span>' sub="Upload, organise, and publish study materials across all batches and courses." />
      {moving
        ? <Marquee duration={48} items={RESOURCES.map(r => <ResourceCard key={r.title} r={r} />)} />
        : <div className="mh-grid-sm">{RESOURCES.map(r => <ResourceCard key={r.title} r={r} />)}</div>}
    </>
  );
}

function FeedbackBlock() {
  const t = useTheme();
  return (
    <>
      <SectionTitle badge="📋 Feedback" title='Feedback <span style="color:#f97316">&amp; Reports</span>' sub="Review student and trainer feedback, generate org-level reports, and act on insights." />
      <div className="mh-two mh-two-start">
        <div>
          <div style={{ fontFamily: SG, fontSize: "clamp(15px,2vw,17px)", fontWeight: 500, color: t.text, marginBottom: 10, letterSpacing: "-.02em" }}>Recent Feedback</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEEDBACK.map((f, i) => (
              <Card key={i} style={{ borderRadius: 14, padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Avatar initials={f.name.split(" ").map(x => x[0]).join("")} color="#f97316" size={32} />
                  <div>
                    <div style={{ fontWeight: 500, color: t.text, fontSize: 13 }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: t.textMuted }}>{f.batch}</div>
                  </div>
                  <div style={{ marginLeft: "auto", color: "#f59e0b", fontSize: 12.5, fontWeight: 500, display: "flex", alignItems: "center", gap: 3 }}>
                    <Star size={12} fill="#f59e0b" stroke="none" /> {f.rating}/5
                  </div>
                </div>
                <p style={{ fontSize: 13, color: t.textSub, lineHeight: 1.5, margin: 0 }}>"{f.text}"</p>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: SG, fontSize: "clamp(15px,2vw,17px)", fontWeight: 500, color: t.text, marginBottom: 10, letterSpacing: "-.02em" }}>Generate Reports</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {REPORTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <Card key={i} style={{ borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                  <Icon size={22} color="#f97316" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, color: t.text, fontSize: 13 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: t.textMuted, marginTop: 1 }}>{r.desc}</div>
                  </div>
                  <button style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    <Download size={11} /> Export
                  </button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

function WorkflowBlock() {
  return (
    <>
      <SectionTitle badge="🗺️ Workflow" title='Manager <span style="color:#f97316">Workflow</span>' sub="The standard operating process every Manager follows to run a successful batch." />
      <RoadmapList />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
function HomePage({ setPage }) {
  return (
    <div>
      <ManagerHero setPage={setPage} />
      <ManagerJourney setPage={setPage} />

      <Section id="overview-sec"><OverviewBlock /></Section>
      <Section id="features"><FeaturesBlock moving /></Section>
      <Section id="batches-sec"><BatchesBlock setPage={setPage} moving /></Section>
      <Section id="trainers-sec"><TrainersBlock moving /></Section>
      <Section id="analytics-sec"><AnalyticsBlock setPage={setPage} /></Section>
      <Section id="resources-sec"><ResourcesBlock moving /></Section>
      <Section id="feedback-sec"><FeedbackBlock /></Section>
      <Section id="workflow-sec" last><WorkflowBlock /></Section>

      {/* CTA BANNER (compact, same as Trainer Hub) */}
      <div id="cta" className="mh-cta">
        <div className="mh-wrap mh-cta-in">
          <div className="mh-cta-txt">
            <h2>Ready To Run Your <span style={{ color: "#f97316" }}>Learning Platform?</span></h2>
            <p>Access the full Manager Hub to control every batch, trainer, student, and resource from one place.</p>
          </div>
          <div className="mh-cta-btns">
            <button type="button" className="p" onClick={() => { setPage("overview"); window.scrollTo({ top: 0, behavior: "smooth" }); }}><LayoutDashboard size={15} /> Open Manager Hub</button>
            <button type="button" className="s" onClick={() => { setPage("feedback"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>View Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INNER PAGES
═══════════════════════════════════════════════════════════════ */
const OverviewPage  = () => <PageWrapper><OverviewBlock /></PageWrapper>;
const BatchesPage   = () => <PageWrapper><BatchesBlock /></PageWrapper>;
const TrainersPage  = () => <PageWrapper><TrainersBlock /></PageWrapper>;
const AnalyticsPage = () => <PageWrapper><AnalyticsBlock /></PageWrapper>;
const ResourcesPage = () => <PageWrapper><ResourcesBlock /></PageWrapper>;
const FeedbackPage  = () => <PageWrapper><FeedbackBlock /></PageWrapper>;
const WorkflowPage  = () => <PageWrapper><WorkflowBlock /></PageWrapper>;

function SessionsPage() {
  return (
    <PageWrapper>
      <SectionTitle badge="📹 Live Sessions" title='Manage <span style="color:#f97316">Live Sessions</span>' sub="Schedule, monitor, and review all trainer-led live sessions in real time." />
      <div className="mh-grid">
        {SESSIONS.map(s => <SessionCard key={s.title} s={s} />)}
      </div>
    </PageWrapper>
  );
}

function StudentsPage() {
  const t = useTheme();
  const w = useWindowWidth();
  const [search, setSearch] = useState("");
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.batch.toLowerCase().includes(search.toLowerCase())
  );
  const statusColor = { Active: "#22c55e", "At Risk": "#ef4444", Completed: "#3b82f6" };
  const isMobile = w < 640;

  return (
    <PageWrapper>
      <HeadRow badge="👥 All Students" title='Student <span style="color:#f97316">Directory</span>'>
        <BtnPrimary><Plus size={13} /> Add Student</BtnPrimary>
      </HeadRow>
      <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", boxShadow: t.shadow }}>
        <div style={{ padding: "10px 14px", borderBottom: `1px solid ${t.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: t.iconBg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "8px 12px" }}>
            <Search size={15} color={t.textMuted} style={{ flexShrink: 0 }} />
            <input
              placeholder="Search students…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: t.text, fontFamily: "inherit", fontSize: 14 }}
            />
          </div>
        </div>
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "10px 12px" }}>
            {filtered.map((s, i) => (
              <div key={i} style={{ background: t.iconBg, borderRadius: 12, padding: "10px 12px", border: `1px solid ${t.border}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 500, color: t.text, fontSize: 13 }}>{s.name}</span>
                  <Pill label={s.status} color={statusColor[s.status] || "#888"} />
                </div>
                <div style={{ fontSize: 12, color: t.textSub, marginBottom: 6 }}>{s.batch} · {s.quizzes} quizzes done</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, background: t.barBg, borderRadius: 99, height: 6, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 99, background: "#f97316", width: `${s.progress}%` }} />
                  </div>
                  <span style={{ fontSize: 12, fontFamily: SG, fontWeight: 500, color: "#f97316" }}>{s.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead><tr>{["Student", "Batch", "Progress", "Quizzes", "Status", "Action"].map(h => <th key={h} style={thStyle(t)}>{h}</th>)}</tr></thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={i}
                    onMouseEnter={e => (e.currentTarget.style.background = t.iconBg)}
                    onMouseLeave={e => (e.currentTarget.style.background = "")}>
                    <td style={tdStyle(t, { fontWeight: 500, color: t.text })}>{s.name}</td>
                    <td style={tdStyle(t, { color: t.textSub, whiteSpace: "nowrap" })}>{s.batch}</td>
                    <td style={tdStyle(t)}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ background: t.barBg, borderRadius: 99, height: 6, width: 70, overflow: "hidden", flexShrink: 0 }}>
                          <div style={{ height: "100%", borderRadius: 99, background: "#f97316", width: `${s.progress}%` }} />
                        </div>
                        <span style={{ fontSize: 12, fontFamily: SG, fontWeight: 500, color: "#f97316" }}>{s.progress}%</span>
                      </div>
                    </td>
                    <td style={tdStyle(t, { color: t.textSub, whiteSpace: "nowrap" })}>{s.quizzes} done</td>
                    <td style={tdStyle(t)}><Pill label={s.status} color={statusColor[s.status] || "#888"} /></td>
                    <td style={tdStyle(t)}>
                      <button style={{ background: "transparent", border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 10px", fontSize: 12, cursor: "pointer", color: t.textSub, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
                        View <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

function CertificatesPage() {
  const t = useTheme();
  const w = useWindowWidth();
  const isMobile = w < 640;
  return (
    <PageWrapper>
      <SectionTitle badge="🏆 Certificates" title='Certificate <span style="color:#f97316">Management</span>' sub="Issue, review, and verify certificates for completed learners." />
      <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", boxShadow: t.shadow }}>
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "10px 12px" }}>
            {CERTS.map((c, i) => (
              <div key={i} style={{ background: t.iconBg, borderRadius: 12, padding: "12px 14px", border: `1px solid ${t.border}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 500, color: t.text, fontSize: 13 }}>{c.student}</span>
                  <Pill label={c.status} color={c.status === "Issued" ? "#22c55e" : "#f97316"} />
                </div>
                <div style={{ fontSize: 12, color: t.textSub, marginBottom: 4 }}>{c.course}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontFamily: SG, fontWeight: 500, color: "#f97316", fontSize: 13 }}>{c.grade}</span>
                    <span style={{ fontSize: 11, color: t.textMuted, marginLeft: 8 }}>{c.date}</span>
                  </div>
                  <button style={{ background: c.status === "Issued" ? "#f97316" : "transparent", color: c.status === "Issued" ? "#fff" : t.textMuted, border: `1px solid ${c.status === "Issued" ? "#f97316" : t.border}`, borderRadius: 8, padding: "5px 10px", fontSize: 11, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    {c.status === "Issued" ? <><Download size={11} /> Download</> : "Pending"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead><tr>{["Student", "Course", "Grade", "Date", "Status", "Action"].map(h => <th key={h} style={thStyle(t)}>{h}</th>)}</tr></thead>
              <tbody>
                {CERTS.map((c, i) => (
                  <tr key={i}
                    onMouseEnter={e => (e.currentTarget.style.background = t.iconBg)}
                    onMouseLeave={e => (e.currentTarget.style.background = "")}>
                    <td style={tdStyle(t, { fontWeight: 500, color: t.text })}>{c.student}</td>
                    <td style={tdStyle(t, { color: t.textSub })}>{c.course}</td>
                    <td style={tdStyle(t, { fontFamily: SG, fontWeight: 500, color: "#f97316" })}>{c.grade}</td>
                    <td style={tdStyle(t, { color: t.textMuted, whiteSpace: "nowrap" })}>{c.date}</td>
                    <td style={tdStyle(t)}><Pill label={c.status} color={c.status === "Issued" ? "#22c55e" : "#f97316"} /></td>
                    <td style={tdStyle(t)}>
                      <button style={{ background: c.status === "Issued" ? "#f97316" : "transparent", color: c.status === "Issued" ? "#fff" : t.textMuted, border: `1px solid ${c.status === "Issued" ? "#f97316" : t.border}`, borderRadius: 8, padding: "5px 11px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 4 }}>
                        {c.status === "Issued" ? <><Download size={12} /> Download</> : "Pending"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

function PlacementsPage() {
  const t = useTheme();
  const w = useWindowWidth();
  const isMobile = w < 640;
  const statusColors = { Joined: "#22c55e", "Offer Accepted": "#f97316", Interviewing: "#3b82f6" };
  return (
    <PageWrapper>
      <SectionTitle badge="🚀 Placements" title='Placement <span style="color:#f97316">Tracker</span>' sub="Track student job placements, company tie-ups, and offer letters in one place." />
      <div className="mh-grid-xs" style={{ marginBottom: 14 }}>
        <StatCard icon={Building2}  iconColor="#22c55e" value="87"    label="Students Placed"   trend="This Quarter" />
        <StatCard icon={Briefcase}  iconColor="#f97316" value="34"    label="Partner Companies" trend="↑ 4 new" trendUp={true} />
        <StatCard icon={TrendingUp} iconColor="#3b82f6" value="₹8.4L" label="Avg. Package"      trend="↑ ₹60k vs last" trendUp={true} />
      </div>
      <div style={{ background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", boxShadow: t.shadow }}>
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "10px 12px" }}>
            {PLACEMENTS.map((p, i) => (
              <div key={i} style={{ background: t.iconBg, borderRadius: 12, padding: "12px 14px", border: `1px solid ${t.border}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 500, color: t.text, fontSize: 13 }}>{p.student}</span>
                  <Pill label={p.status} color={statusColors[p.status] || "#888"} />
                </div>
                <div style={{ fontSize: 12, color: t.textSub, marginBottom: 3 }}>{p.company} · {p.role}</div>
                <div style={{ fontSize: 12, color: t.textMuted }}>{p.batch}</div>
                <div style={{ fontFamily: SG, fontWeight: 500, color: "#22c55e", fontSize: 14, marginTop: 4 }}>{p.package}</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead><tr>{["Student", "Batch", "Company", "Role", "Package", "Status"].map(h => <th key={h} style={thStyle(t)}>{h}</th>)}</tr></thead>
              <tbody>
                {PLACEMENTS.map((p, i) => (
                  <tr key={i}
                    onMouseEnter={e => (e.currentTarget.style.background = t.iconBg)}
                    onMouseLeave={e => (e.currentTarget.style.background = "")}>
                    <td style={tdStyle(t, { fontWeight: 500, color: t.text })}>{p.student}</td>
                    <td style={tdStyle(t, { color: t.textSub, whiteSpace: "nowrap" })}>{p.batch}</td>
                    <td style={tdStyle(t, { color: t.text })}>{p.company}</td>
                    <td style={tdStyle(t, { color: t.textSub, whiteSpace: "nowrap" })}>{p.role}</td>
                    <td style={tdStyle(t, { fontFamily: SG, fontWeight: 500, color: "#22c55e", whiteSpace: "nowrap" })}>{p.package}</td>
                    <td style={tdStyle(t)}><Pill label={p.status} color={statusColors[p.status] || "#888"} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════════════════ */
function PageTabs({ page, setPage }) {
  return (
    <nav className="mh-tabs" aria-label="Manager Hub pages">
      {PAGES.map(p => {
        const Icon = p.icon;
        return (
          <button key={p.id} type="button" className={page === p.id ? "on" : ""} onClick={() => { setPage(p.id); window.scrollTo({ top: 0 }); }}>
            <Icon size={13} /> {p.label}
          </button>
        );
      })}
    </nav>
  );
}

function Sidebar({ page, setPage }) {
  const t = useTheme();
  return (
    <div style={{
      width: 196, flexShrink: 0, background: t.cardBg,
      borderRight: `1px solid ${t.border}`,
      minHeight: "100vh", position: "sticky", top: 0, overflowY: "auto",
      padding: "8px 0", alignSelf: "flex-start",
    }}>
      {PAGES.map(p => {
        const Icon = p.icon;
        const active = page === p.id;
        return (
          <button key={p.id} onClick={() => { setPage(p.id); window.scrollTo({ top: 0 }); }} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "9px 16px", border: "none",
            background: active ? "rgba(249,115,22,0.08)" : "transparent",
            cursor: "pointer", textAlign: "left", fontSize: 13.5, fontWeight: active ? 500 : 400,
            color: active ? "#f97316" : t.textSub, fontFamily: "inherit",
            borderLeft: `3px solid ${active ? "#f97316" : "transparent"}`,
            transition: "all .15s",
          }}>
            <Icon size={15} color={active ? "#f97316" : t.textMuted} /> {p.label}
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   APP ROOT
   Everything is scoped under `.mh-page` so nothing leaks into
   PublicLayout's navbar / footer. Layout classes (.mh-wrap, .mh-grid…)
   give the same compact, full-width spacing as Student Hub.
═══════════════════════════════════════════════════════════════ */
const MH_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.mh-page, .mh-page *, .mh-page *::before, .mh-page *::after { box-sizing: border-box; }
.mh-page h1, .mh-page h2, .mh-page h3, .mh-page h4,
.mh-page p, .mh-page ul, .mh-page ol, .mh-page figure { margin: 0; padding: 0; }
.mh-page button, .mh-page a { margin: 0; }
.mh-page { scroll-behavior: smooth; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }

/* regular-weight, compact text (same as Student Hub) */
.mh-page h1, .mh-page h2, .mh-page h3, .mh-page h4, .mh-page b, .mh-page strong { font-weight: 500 !important; }
.mh-page a { color: inherit; text-decoration: none; }

/* compact layout */
.mh-sec  { padding: clamp(16px, 2.6vw, 26px) 0; width: 100%; }
.mh-pad  { padding-top: clamp(16px, 2.6vw, 26px); padding-bottom: clamp(16px, 2.6vw, 26px); }
.mh-wrap { width: 100%; max-width: 1760px; margin: 0 auto; padding-left: clamp(12px, 2.4vw, 32px); padding-right: clamp(12px, 2.4vw, 32px); }

.mh-grid    { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.mh-grid-sm { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; align-items: stretch; }
.mh-grid-xs { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; }
.mh-two     { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(20px, 4vw, 40px); align-items: center; }
.mh-two-start { align-items: start; }
@media (max-width: 860px) { .mh-two { grid-template-columns: 1fr; gap: 24px; } }
@media (max-width: 520px) { .mh-grid, .mh-grid-sm { grid-template-columns: 1fr; } .mh-grid-xs { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; } }

/* ── single-row moving strip (same as Trainer Hub) ── */
.mh-mq { overflow: hidden; position: relative; -webkit-mask-image: linear-gradient(90deg, transparent, #000 2%, #000 98%, transparent); mask-image: linear-gradient(90deg, transparent, #000 2%, #000 98%, transparent); }
.mh-mq-track { display: flex; gap: 12px; width: max-content; padding: 6px 0 10px; animation: mhMq var(--d, 45s) linear infinite; }
.mh-mq-set { display: flex; gap: 12px; }
.mh-mq-item { flex: 0 0 clamp(250px, 21vw, 290px); min-width: 0; display: flex; }
.mh-mq-item > div { flex: 1; display: flex; flex-direction: column; height: 100%; }
.mh-mq-item > div > :nth-last-child(2) { margin-bottom: 12px; }
.mh-mq-item > div > :last-child { margin-top: auto; }
.mh-mq:hover .mh-mq-track, .mh-mq:focus-within .mh-mq-track, .mh-mq:active .mh-mq-track { animation-play-state: paused; }
@keyframes mhMq { from { transform: translateX(0); } to { transform: translateX(calc(-50% - 6px)); } }
@media (prefers-reduced-motion: reduce) {
  .mh-mq { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .mh-mq-track { animation: none; }
  .mh-mq-set[aria-hidden="true"] { display: none; }
}

/* ═════════ RESPONSIVE: desktop / laptop / mac / iPad / iPad mini / tablet / phones (iPhone, Pixel) ═════════ */
.mh-page { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
.mh-page img, .mh-page svg { max-width: 100%; }

/* in-page nav for screens without the sidebar (< 900px) */
.mh-tabs { display: flex; gap: 8px; overflow-x: auto; padding: 8px clamp(12px, 2.4vw, 32px); border-bottom: 1px solid var(--mh-border); background: var(--mh-card); scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.mh-tabs::-webkit-scrollbar { display: none; }
.mh-tabs button { flex-shrink: 0; font-family: inherit; font-size: 13px; font-weight: 500; white-space: nowrap; padding: 7px 14px; border-radius: 99px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; background: transparent; color: var(--mh-sub); border: 1.5px solid var(--mh-border); }
.mh-tabs button.on { background: rgba(249,115,22,.1); color: #f97316; border-color: #f97316; }

/* large screens (27" / 4K / big Mac displays) */
@media (min-width: 1800px) { .mh-mq-item { flex-basis: 300px; } }

/* iPad Pro / small laptops */
@media (max-width: 1099px) { .mh-mq-item { flex-basis: 250px; } }

/* iPad / iPad mini / tablets */
@media (max-width: 820px) {
  .mh-mq-item { flex-basis: 232px; }
  .mh-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mh-grid-sm { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* phones (iPhone, Pixel, Galaxy…): smaller, tighter cards */
@media (max-width: 600px) {
  .mh-sec { padding: 12px 0; }
  .mh-pad { padding-top: 12px; padding-bottom: 12px; }
  .mh-grid, .mh-grid-sm { grid-template-columns: 1fr; gap: 10px; }
  .mh-mq-track, .mh-mq-set { gap: 10px; }
  .mh-mq-item { flex-basis: min(208px, 66vw); }
  .mh-mq-item h3 { font-size: 13.5px !important; }
  .mh-mq-item p { font-size: 12px !important; line-height: 1.45 !important; }
  .mh-pc { padding: 12px !important; border-radius: 14px !important; }
  .mh-ico2 { width: 34px !important; height: 34px !important; margin-bottom: 6px !important; border-radius: 10px !important; }
  .mh-bc { border-radius: 14px !important; }
  .mh-bc-top { height: 40px !important; }
  .mh-bc-top svg { width: 24px; height: 24px; }
  .mh-bc-in { padding: 10px 12px 12px !important; }
  .mh-rm-dot { width: 36px !important; height: 36px !important; }
  .mh-rm-line { left: 17px !important; }
  .mh-page h2 { overflow-wrap: anywhere; }
}

/* very small phones (≤ 380px: iPhone SE, Galaxy Fold) */
@media (max-width: 380px) {
  .mh-mq-item { flex-basis: 190px; }
  .mh-tabs button { padding: 6px 11px; font-size: 12.5px; }
}

/* touch devices: no sticky hover lift */
@media (hover: none) { .mh-pc:hover { transform: none !important; } }

/* ── compact CTA banner (same as Trainer Hub) ── */
.mh-sec-last { padding-bottom: 10px; }
.mh-cta { background: linear-gradient(135deg, #1E293B 0%, #0f172a 100%); padding: 16px 0; margin: 0; }
.mh-cta-in { display: flex; align-items: center; justify-content: space-between; gap: 14px 32px; flex-wrap: wrap; }
.mh-cta-txt { min-width: 0; flex: 1 1 380px; text-align: left; }
.mh-cta-txt h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(20px, 2.6vw, 28px); line-height: 1.2; letter-spacing: -0.03em; color: #fff; margin: 0 0 4px; }
.mh-cta-txt p { font-size: 14px; line-height: 1.5; color: rgba(255,255,255,.55); margin: 0; }
.mh-cta-btns { display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap; }
.mh-cta-btns button { font-family: inherit; cursor: pointer; border-radius: 12px; padding: 11px 22px; font-size: 14.5px; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 8px; }
.mh-cta-btns .p { background: #f97316; color: #fff; border: none; }
.mh-cta-btns .s { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.18); }
@media (max-width: 720px) {
  .mh-cta-txt { text-align: center; }
  .mh-cta-btns { justify-content: center; width: 100%; }
}
@media (max-width: 480px) { .mh-cta-btns { flex-direction: column; align-items: stretch; } .mh-cta-btns button { width: 100%; } }

@keyframes mhPulse { 0%,100% { opacity: 1; } 50% { opacity: .4; } }
.mh-page ::-webkit-scrollbar { width: 6px; height: 6px; }
.mh-page ::-webkit-scrollbar-track { background: transparent; }
.mh-page ::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.3); border-radius: 99px; }
.mh-page input::placeholder { color: var(--mh-text-muted); }
`;

export default function ManagerHub({
  theme: themeProp,
  toggleTheme: toggleThemeProp,
  setShowLoginModal,
  scrollToSection,
}) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return document.documentElement.classList.contains("dark");
    } catch { return false; }
  });
  const isControlled = themeProp !== undefined;
  const theme = isControlled ? themeProp : (darkMode ? "dark" : "light");
  const toggleTheme = () => {
    if (isControlled && toggleThemeProp) { toggleThemeProp(); return; }
    setDarkMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
        document.documentElement.classList.toggle("dark", next);
      } catch {}
      return next;
    });
  };
  useEffect(() => {
    const onStorage = (e) => { if (e.key === "theme") setDarkMode(e.newValue === "dark"); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const dark = theme === "dark";
  const [page, setPage] = useState("home");
  const t = dark ? DARK : LIGHT;
  const w = useWindowWidth();
  const showSidebar = w >= 900;
  const isHome = page === "home";

  const pageComponents = {
    home:         <HomePage setPage={setPage} />,
    overview:     <OverviewPage />,
    batches:      <BatchesPage />,
    trainers:     <TrainersPage />,
    students:     <StudentsPage />,
    sessions:     <SessionsPage />,
    analytics:    <AnalyticsPage />,
    resources:    <ResourcesPage />,
    certificates: <CertificatesPage />,
    placements:   <PlacementsPage />,
    feedback:     <FeedbackPage />,
    workflow:     <WorkflowPage />,
  };

  return (
    <ThemeContext.Provider value={t}>
      <PublicLayout
        theme={theme}
        toggleTheme={toggleTheme}
        setShowLoginModal={setShowLoginModal}
        scrollToSection={scrollToSection}
      >
        <div
          className="mh-page"
          style={{
            "--mh-text-muted": t.textMuted, "--mh-border": t.border, "--mh-card": t.cardBg, "--mh-sub": t.textSub,
            background: t.pageBg, color: t.text,
            minHeight: "100vh", width: "100%",
            transition: "background .3s,color .3s",
          }}
        >
          <style>{MH_CSS}</style>

          {!showSidebar && <PageTabs page={page} setPage={setPage} />}
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {!isHome && showSidebar && <Sidebar page={page} setPage={setPage} />}
            <div style={{ flex: 1, minWidth: 0, background: t.pageBg }}>
              {pageComponents[page] || pageComponents["home"]}
            </div>
          </div>
        </div>
      </PublicLayout>
    </ThemeContext.Provider>
  );
}