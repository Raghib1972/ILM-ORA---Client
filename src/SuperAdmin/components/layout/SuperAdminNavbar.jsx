// "use client";

// // src/SuperAdmin/components/layout/SuperAdminNavbar.jsx
// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate, useLocation } from "@/lib/routerCompat";
// import { Mail, FileSearch, ChevronDown, Menu, X } from "lucide-react";
// import { PERMISSIONS } from "@/SuperAdmin/constants/permissions";
// import { useTheme } from "../../context/ThemeContext";

// // react-router's <NavLink> isn't available under Next.js App Router. This
// // local shim reproduces the exact subset of its API this file relies on
// // (to / end / style-as-function-of-isActive / onClick / children) using the
// // routerCompat hooks, so none of the call sites below needed to change.
// const NavLink = ({ to, end = false, onClick, style, children, ...rest }) => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const isActive = end
//     ? pathname === to
//     : pathname === to || pathname.startsWith(to + "/");
//   const resolvedStyle = typeof style === "function" ? style({ isActive }) : style;
//   return (
//     <a
//       href={to}
//       onClick={(e) => {
//         e.preventDefault();
//         onClick?.(e);
//         navigate(to);
//       }}
//       style={resolvedStyle}
//       {...rest}
//     >
//       {children}
//     </a>
//   );
// };

// // ── Icons ─────────────────────────────────────────────────────
// const ic = {
//   dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
//   onboarding:
//     "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M8.5 11a4 4 0 100-8 4 4 0 000 8z M20 8v6 M23 11h-6",
//   organizations:
//     "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
//   approvals: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
//   permissions:
//     "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
//   // ✅ NEW
//   roadmap:
//     "M6 3v12 M15 6a3 3 0 106 0 3 3 0 10-6 0 M3 18a3 3 0 106 0 3 3 0 10-6 0 M18 9a9 9 0 01-9 9",
//   analytics: "M18 20V10 M12 20V4 M6 20v-6",

//   auditMonitoring: "M22 12h-4l-3 9L9 3l-3 9H2",
//   video:
//     "M23 7l-7 5 7 5V7z M14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z",
//   security: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
//   settings:
//     "M12 20a8 8 0 100-16 8 8 0 000 16z M12 14a2 2 0 100-4 2 2 0 000 4z M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41",
//   logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
//   sun: "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 17a5 5 0 100-10 5 5 0 000 10z",
//   moon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
//   user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
//   bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
//    featuredPrograms:
//     "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z M9 7h6 M9 11h6 M9 15h4",
//   // ✅ NEW — Sales Management
//   sales: "M22 7l-8.5 8.5-5-5L2 17 M16 7h6v6",
// };
// const SvgIcon = ({ d, size = 15 }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={1.75}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d={d} />
//   </svg>
// );

// // ── Nav structure — all tabs from old sidebar ─────────────────
// const NAV = [
//   {
//     type: "item",
//     label: "Dashboard",
//     path: "/superadmin",
//     icon: ic.dashboard,
//     end: true,
//     permission: null,
//   },
//   {
//     type: "dropdown",
//     label: "Access Management",
//     children: [
//       {
//         label: "Onboarding",
//         path: "/superadmin/onboarding",
//         icon: ic.onboarding,
//         permission: PERMISSIONS.VIEW_ONBOARDING,
//       },
//       {
//         label: "Organizations",
//         path: "/superadmin/organizations",
//         icon: ic.organizations,
//         permission: PERMISSIONS.VIEW_ORGANIZATIONS,
//       },
//       {
//         label: "Assessment System",
//         path: "/superadmin/assessment-system",
//         icon: ic.approvals, // clipboard-checkmark path, already defined in `ic`
//         permission: PERMISSIONS.VIEW_ORGANIZATIONS, // reuse, or swap for a dedicated permission if you have one
//       },
//       {
//         label: "Batch Management", // ✅ ADD THIS
//         path: "/superadmin/batch-control", // ✅ matches App.jsx route
//         icon: ic.permissions, // reuse any icon, or add a new one
//         permission: PERMISSIONS.MANAGE_PERMISSIONS,
//       },
//       {
//         label: "Course Management",
//         path: "/superadmin/courses",
//         icon: ic.organizations,
//         permission: null,
//       },
//       {
//         label: "Feedback Review",
//         path: "/superadmin/feedback-review",
//         icon: ic.approvals, // reuses the checkmark-circle path already defined in `ic`
//         permission: PERMISSIONS.VIEW_ANALYTICS, // swap for whatever permission gates feedback in your setup
//       },
//            {
//         label: "Attendance Review",
//         path: "/superadmin/attendance-review",
//         icon: ic.approvals,
//         permission: PERMISSIONS.VIEW_ANALYTICS,
//       },
//     ],
//   },

//   {
//     type: "item", // ✅ NEW — Sales Management
//     label: "Sales Management",
//     path: "/superadmin/sales-management",
//     icon: ic.sales,
//     permission: null,
//   },

//   {
//     type: "item",
//     label: "Analytics",
//     path: "/superadmin/analytics",
//     icon: ic.analytics,
//     permission: PERMISSIONS.VIEW_ANALYTICS,
//   },

//   {
//     type: "item",
//     label: "Audit & Monitoring",
//     path: "/superadmin/audit-monitoring",
//     icon: ic.auditMonitoring,
//     permission: PERMISSIONS.VIEW_ANALYTICS,
//   },

//   {
//     type: "item",
//     label: "WorkSpace",
//     path: "/superadmin/workspace",
//     icon: ic.video,
//     permission: null, // swap for a PERMISSIONS.* value if you want to gate it
//   },
//   {
//     type: "item", // ✅ NEW
//     label: "Roadmap",
//     path: "/superadmin/roadmap-upgraded",
//     icon: ic.roadmap,
//     permission: null,
//   },
//   {
//     type: "dropdown",
//     label: "Landing Pages",
//     children: [
//       {
//         label: "Featured Programs",
//         path: "/superadmin/featured-programs",
//         icon: ic.featuredPrograms,
//         permission: null,
//       },
//       {
//         label: "Top Global Companies",
//         path: "/superadmin/top-global-companies",
//         icon: ic.featuredPrograms,
//         permission: null,
//       },
//       {
//         label: "Mentors",
//         path: "/superadmin/mentors",
//         icon: ic.featuredPrograms,
//         permission: null,
//       },
//       {
//         label: "Upload Watch Now",
//         path: "/superadmin/upload-watch-now",
//         icon: ic.featuredPrograms,
//         permission: null,
//       },
//       {
//         label: "Banner Studio",
//         path: "/superadmin/cms/banner-studio",
//         icon: ic.featuredPrograms,
//         permission: null,
//       },
//             {
//         label: "Platform Overview",
//         path: "/superadmin/cms/platform-overview",
//         icon: ic.featuredPrograms,
//         permission: null,
//       },
//       {
//         label: "Marketing Banner",
//         path: "/superadmin/cms/marketing-banner",
//         icon: ic.featuredPrograms,
//         permission: null,
//       },
//     ],
//   },

//   {
//     type: "item",
//     label: "Security",
//     path: "/superadmin/security-settings",
//     icon: ic.security,
//     permission: PERMISSIONS.MANAGE_SECURITY,
//   },
//   {
//     type: "dropdown",
//     label: "Settings",
//     children: [
//       {
//         label: "Send Email",
//         path: "/superadmin/settings/send-email",
//         iconComponent: Mail,
//         permission: PERMISSIONS.VIEW_SETTINGS,
//       },
//       {
//         label: "Audit Logs",
//         path: "/superadmin/settings/audit-logs",
//         iconComponent: FileSearch,
//         permission: PERMISSIONS.VIEW_SETTINGS,
//       },
//       {
//         label: "Global Settings",
//         path: "/superadmin/global-settings",
//         icon: ic.settings,
//         permission: PERMISSIONS.VIEW_SETTINGS,
//       },
//     ],
//   },
// ];

// // ── Notifications ─────────────────────────────────────────────
// const INIT_NOTIFS = [
//   {
//     id: 1,
//     type: "approval",
//     msg: "New trainer application from Rajesh Kumar",
//     time: "2m ago",
//     unread: true,
//   },
//   {
//     id: 2,
//     type: "alert",
//     msg: "Student account suspended: Priya Singh",
//     time: "15m ago",
//     unread: true,
//   },
//   {
//     id: 3,
//     type: "info",
//     msg: "System backup completed successfully",
//     time: "1h ago",
//     unread: false,
//   },
//   {
//     id: 4,
//     type: "warning",
//     msg: "High CPU usage on live session server",
//     time: "2h ago",
//     unread: false,
//   },
// ];
// const NOTIF_CLR = {
//   approval: "#fbbf24",
//   alert: "#f87171",
//   info: "#60a5fa",
//   warning: "#fb923c",
// };

// // ── Hook ──────────────────────────────────────────────────────
// const useOutside = (ref, cb) => {
//   useEffect(() => {
//     const h = (e) => {
//       if (ref.current && !ref.current.contains(e.target)) cb();
//     };
//     document.addEventListener("mousedown", h);
//     return () => document.removeEventListener("mousedown", h);
//   }, [ref, cb]);
// };

// // ── Desktop dropdown ──────────────────────────────────────────
// const Dropdown = ({ group, pendingCount, dark, active, idle }) => {
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);
//   useOutside(ref, () => setOpen(false));

//   const panelBg = dark ? "#13131f" : "#fff";
//   const panelBdr = dark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.10)";
//   const itemClr = dark ? "#cbd5e1" : "#374151";
//   const activeBg = dark ? "rgba(124,58,237,.12)" : "rgba(124,58,237,.07)";

//   return (
//     <div
//       ref={ref}
//       style={{ position: "relative", display: "flex", alignItems: "stretch" }}
//     >
//       <button
//         onClick={() => setOpen((v) => !v)}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 4,
//           padding: "0 14px",
//           height: "100%",
//           background: "none",
//           border: "none",
//           cursor: "pointer",
//           color: open ? active : idle,
//           fontSize: 13,
//           fontWeight: 500,
//           borderBottom: `2px solid ${open ? active : "transparent"}`,
//           transition: "all .15s",
//           whiteSpace: "nowrap",
//         }}
//       >
//         {group.label}
//         <ChevronDown
//           size={12}
//           style={{
//             transform: open ? "rotate(180deg)" : "none",
//             transition: "transform .2s",
//           }}
//         />
//       </button>

//       {open && (
//         <div
//           style={{
//             position: "absolute",
//             top: "calc(100% + 2px)",
//             left: 0,
//             minWidth: 210,
//             zIndex: 500,
//             background: panelBg,
//             border: `1px solid ${panelBdr}`,
//             borderRadius: 10,
//             padding: 6,
//             boxShadow: dark
//               ? "0 24px 64px rgba(0,0,0,.55)"
//               : "0 8px 32px rgba(0,0,0,.14)",
//           }}
//         >
//           {group.children.map((item) => {
//             const IconEl = item.iconComponent || null;
//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => setOpen(false)}
//                 style={({ isActive }) => ({
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 9,
//                   padding: "9px 12px",
//                   borderRadius: 7,
//                   textDecoration: "none",
//                   color: isActive ? active : itemClr,
//                   background: isActive ? activeBg : "transparent",
//                   fontSize: 13,
//                   fontWeight: 500,
//                   transition: "all .12s",
//                 })}
//               >
//                 {IconEl ? (
//                   <IconEl size={13} />
//                 ) : (
//                   <SvgIcon d={item.icon} size={13} />
//                 )}
//                 <span>{item.label}</span>
//                 {item.badge && pendingCount > 0 && (
//                   <span
//                     style={{
//                       marginLeft: "auto",
//                       background: "#f59e0b",
//                       color: "#fff",
//                       fontSize: 10,
//                       fontWeight: 700,
//                       padding: "1px 6px",
//                       borderRadius: 999,
//                     }}
//                   >
//                     {pendingCount}
//                   </span>
//                 )}
//               </NavLink>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// // ── Main navbar ───────────────────────────────────────────────
// const SuperAdminNavbar = ({ pendingCount = 0, activeUsers = 0 }) => {
//   const { dark, toggleTheme } = useTheme();
//   const navigate = useNavigate();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [expandedGroup, setExpandedGroup] = useState(null);
//   const [showNotif, setShowNotif] = useState(false);
//   const [showUser, setShowUser] = useState(false);
//   const [notifs, setNotifs] = useState(INIT_NOTIFS);

//   const notifRef = useRef(null);
//   const userRef = useRef(null);

//   useOutside(notifRef, () => setShowNotif(false));
//   useOutside(userRef, () => setShowUser(false));

//   const unread = notifs.filter((n) => n.unread).length;
//   const user = { name: "Super Admin" };
//   const logout = () => {
//     window.location.href = "/";
//   };
//   const hasPermission = () => true;

//   // ── Design tokens ────────────────────────────────────────────
//   const bg = dark ? "#0d0d14" : "#ffffff";
//   const bdr = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.09)";
//   const active = dark ? "#a78bfa" : "#7c3aed";
//   const idle = dark ? "#94a3b8" : "#64748b";
//   const panel = dark ? "#13131f" : "#ffffff";
//   const pdBdr = dark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.10)";
//   const uName = dark ? "#ffffff" : "#111111";
//   const mText = dark ? "#cbd5e1" : "#374151";

//   const ibtn = (extra = {}) => ({
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     color: idle,
//     padding: "7px 8px",
//     borderRadius: 7,
//     transition: "color .15s",
//     ...extra,
//   });

//   return (
//     <>
//       {/* ══════════════════════════════════════════════════════
//           HEADER — fixed, full width, two rows
//       ══════════════════════════════════════════════════════ */}
//       <header
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 50,
//           background: bg,
//           borderBottom: `1px solid ${bdr}`,
//           boxShadow: dark ? "none" : "0 1px 8px rgba(0,0,0,.06)",
//         }}
//       >
//         {/* ── ROW 1 — Logo + Right controls (52px) ── */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             height: 52,
//             padding: "0 20px",
//             borderBottom: `1px solid ${bdr}`,
//           }}
//         >
//           {/* Logo */}
//           <div style={{ flexShrink: 0, marginRight: 24 }}>
//             <h3
//               style={{
//                 margin: 0,
//                 fontSize: 19,
//                 fontWeight: 700,
//                 letterSpacing: "-0.05em",
//                 lineHeight: 1,
//               }}
//             >
//               <span style={{ color: "#22c55e" }}>ILM</span>
//               <span style={{ color: "#f97316" }}>&nbsp;ORA</span>
//             </h3>
//             <span
//               style={{
//                 fontSize: 8,
//                 fontWeight: 700,
//                 letterSpacing: "0.18em",
//                 textTransform: "uppercase",
//                 color: idle,
//               }}
//             >
//               SuperAdmin Panel
//             </span>
//           </div>

//           <div style={{ flex: 1 }} />

//           {/* Right controls */}
//           <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
//             {/* Stats — desktop only */}
//             <div
//               className="sa-stats"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 14,
//                 fontSize: 12,
//                 paddingRight: 8,
//               }}
//             >
//               <span
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 5,
//                   color: idle,
//                 }}
//               >
//                 <span
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     background: "#34d399",
//                     display: "inline-block",
//                   }}
//                 />
//                 <b style={{ color: uName, fontWeight: 600 }}>{activeUsers}</b>
//                 &nbsp;active
//               </span>
//               <span
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 5,
//                   color: idle,
//                 }}
//               >
//                 <span
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: "50%",
//                     background: "#fbbf24",
//                     display: "inline-block",
//                   }}
//                 />
//                 <b style={{ color: uName, fontWeight: 600 }}>{pendingCount}</b>
//                 &nbsp;pending
//               </span>
//             </div>

//             <div
//               className="sa-stats"
//               style={{ width: 1, height: 20, background: bdr, margin: "0 6px" }}
//             />

//             {/* Theme toggle */}
//             <button
//               onClick={toggleTheme}
//               title={dark ? "Light Mode" : "Dark Mode"}
//               style={ibtn()}
//             >
//               <SvgIcon d={dark ? ic.sun : ic.moon} size={17} />
//             </button>

//             {/* Bell */}
//             <div style={{ position: "relative" }} ref={notifRef}>
//               <button
//                 onClick={() => {
//                   setShowNotif((v) => !v);
//                   setShowUser(false);
//                 }}
//                 style={ibtn({ position: "relative" })}
//               >
//                 <SvgIcon d={ic.bell} size={18} />
//                 {unread > 0 && (
//                   <span
//                     style={{
//                       position: "absolute",
//                       top: 4,
//                       right: 4,
//                       width: 15,
//                       height: 15,
//                       background: "#7c3aed",
//                       color: "#fff",
//                       fontSize: 8,
//                       fontWeight: 700,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                     }}
//                   >
//                     {unread}
//                   </span>
//                 )}
//               </button>

//               {showNotif && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     right: 0,
//                     top: "calc(100% + 6px)",
//                     width: 304,
//                     background: panel,
//                     border: `1px solid ${pdBdr}`,
//                     borderRadius: 12,
//                     zIndex: 600,
//                     boxShadow: dark
//                       ? "0 24px 64px rgba(0,0,0,.55)"
//                       : "0 8px 32px rgba(0,0,0,.14)",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       padding: "11px 14px",
//                       borderBottom: `1px solid ${pdBdr}`,
//                     }}
//                   >
//                     <span
//                       style={{ color: uName, fontSize: 13, fontWeight: 600 }}
//                     >
//                       Notifications
//                     </span>
//                     {unread > 0 && (
//                       <button
//                         onClick={() =>
//                           setNotifs((n) =>
//                             n.map((x) => ({ ...x, unread: false })),
//                           )
//                         }
//                         style={{
//                           fontSize: 11,
//                           color: "#a78bfa",
//                           background: "none",
//                           border: "none",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Mark all read
//                       </button>
//                     )}
//                   </div>
//                   <div style={{ maxHeight: 280, overflowY: "auto" }}>
//                     {notifs.map((n) => (
//                       <div
//                         key={n.id}
//                         style={{
//                           display: "flex",
//                           alignItems: "flex-start",
//                           gap: 8,
//                           padding: "10px 14px",
//                           borderBottom: `1px solid ${pdBdr}`,
//                           background: n.unread
//                             ? dark
//                               ? "rgba(124,58,237,.05)"
//                               : "rgba(124,58,237,.04)"
//                             : "transparent",
//                         }}
//                       >
//                         <span
//                           style={{
//                             marginTop: 5,
//                             width: 6,
//                             height: 6,
//                             borderRadius: "50%",
//                             flexShrink: 0,
//                             background: n.unread
//                               ? NOTIF_CLR[n.type]
//                               : "#475569",
//                             display: "inline-block",
//                           }}
//                         />
//                         <div>
//                           <p
//                             style={{
//                               fontSize: 12,
//                               color: mText,
//                               margin: 0,
//                               lineHeight: 1.4,
//                             }}
//                           >
//                             {n.msg}
//                           </p>
//                           <p
//                             style={{
//                               fontSize: 11,
//                               color: idle,
//                               margin: "3px 0 0",
//                             }}
//                           >
//                             {n.time}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <div style={{ padding: "8px 14px", textAlign: "center" }}>
//                     <button
//                       style={{
//                         fontSize: 11,
//                         color: "#a78bfa",
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       View all notifications
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div
//               className="sa-stats"
//               style={{ width: 1, height: 20, background: bdr, margin: "0 6px" }}
//             />

//             {/* User chip — desktop only */}
//             <div
//               ref={userRef}
//               style={{ position: "relative" }}
//               className="sa-stats"
//             >
//               <button
//                 onClick={() => {
//                   setShowUser((v) => !v);
//                   setShowNotif(false);
//                 }}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   background: dark
//                     ? "rgba(255,255,255,.04)"
//                     : "rgba(0,0,0,.04)",
//                   border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.10)"}`,
//                   borderRadius: 8,
//                   padding: "5px 10px 5px 6px",
//                   cursor: "pointer",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 26,
//                     height: 26,
//                     borderRadius: "50%",
//                     background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     color: "#fff",
//                     fontSize: 11,
//                     fontWeight: 700,
//                     flexShrink: 0,
//                   }}
//                 >
//                   {user.name?.[0] || "S"}
//                 </div>
//                 <div style={{ textAlign: "left" }}>
//                   <p
//                     style={{
//                       fontSize: 12,
//                       color: uName,
//                       fontWeight: 500,
//                       margin: 0,
//                       lineHeight: 1.2,
//                     }}
//                   >
//                     {user.name}
//                   </p>
//                   <p
//                     style={{
//                       fontSize: 9,
//                       color: "#a78bfa",
//                       margin: 0,
//                       textTransform: "uppercase",
//                       letterSpacing: "0.08em",
//                     }}
//                   >
//                     Super Admin
//                   </p>
//                 </div>
//                 <ChevronDown
//                   size={11}
//                   style={{
//                     color: idle,
//                     marginLeft: 2,
//                     transform: showUser ? "rotate(180deg)" : "none",
//                     transition: "transform .2s",
//                   }}
//                 />
//               </button>

//               {showUser && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     right: 0,
//                     top: "calc(100% + 6px)",
//                     minWidth: 160,
//                     background: panel,
//                     border: `1px solid ${pdBdr}`,
//                     borderRadius: 10,
//                     padding: 6,
//                     zIndex: 600,
//                     boxShadow: dark
//                       ? "0 24px 64px rgba(0,0,0,.55)"
//                       : "0 8px 32px rgba(0,0,0,.14)",
//                   }}
//                 >
//                   <button
//                     onClick={() => {
//                       navigate("/superadmin/profile");
//                       setShowUser(false);
//                     }}
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 8,
//                       padding: "8px 10px",
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       color: mText,
//                       fontSize: 13,
//                       borderRadius: 6,
//                       textAlign: "left",
//                     }}
//                   >
//                     <SvgIcon d={ic.user} size={13} />
//                     Profile
//                   </button>
//                   <div
//                     style={{ height: 1, background: pdBdr, margin: "3px 0" }}
//                   />
//                   <button
//                     onClick={logout}
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 8,
//                       padding: "8px 10px",
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       color: "#f87171",
//                       fontSize: 13,
//                       borderRadius: 6,
//                       textAlign: "left",
//                     }}
//                   >
//                     <SvgIcon d={ic.logout} size={13} />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Hamburger — mobile only */}
//             <button
//               onClick={() => setMobileOpen((v) => !v)}
//               className="sa-mobile-only"
//               style={{ ...ibtn(), display: "none" }}
//             >
//               {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>

//         {/* ── ROW 2 — Nav tabs (44px, desktop only) ── */}
//         <div
//           className="sa-nav-row"
//           style={{
//             display: "flex",
//             alignItems: "stretch",
//             height: 44,
//             // ✅ KEY FIX: Use padding that keeps all tabs visible
//             // overflowX hidden + flex-wrap won't work, so we use
//             // a min-width trick to let items shrink slightly if needed
//             padding: "0 12px",
//             gap: 0,
//             background: bg,
//           }}
//         >
//           {NAV.map((entry, idx) => {
//             if (entry.type === "item") {
//               if (entry.permission && !hasPermission(entry.permission))
//                 return null;
//               return (
//                 <NavLink
//                   key={entry.path}
//                   to={entry.path}
//                   end={entry.end ?? false}
//                   style={({ isActive }) => ({
//                     display: "flex",
//                     alignItems: "center",
//                     // ✅ Reduced padding so all 5 tabs fit without scrolling
//                     padding: "0 12px",
//                     height: "100%",
//                     textDecoration: "none",
//                     fontSize: 13,
//                     fontWeight: 500,
//                     whiteSpace: "nowrap",
//                     color: isActive ? active : idle,
//                     borderBottom: `2px solid ${isActive ? active : "transparent"}`,
//                     transition: "color .15s, border-color .15s",
//                     flexShrink: 0,
//                   })}
//                 >
//                   {entry.label}
//                 </NavLink>
//               );
//             }
//             if (entry.type === "dropdown") {
//               return (
//                 <Dropdown
//                   key={idx}
//                   group={entry}
//                   pendingCount={pendingCount}
//                   dark={dark}
//                   active={active}
//                   idle={idle}
//                 />
//               );
//             }
//             return null;
//           })}
//         </div>
//       </header>

//       {/* ══════════════════════════════════════════════════════
//           MOBILE DRAWER
//       ══════════════════════════════════════════════════════ */}
//       {mobileOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: 52,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: dark ? "#0d0d14" : "#fff",
//             zIndex: 49,
//             overflowY: "auto",
//             borderTop: `1px solid ${bdr}`,
//           }}
//         >
//           {/* User row */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 10,
//               padding: "14px 18px",
//               borderBottom: `1px solid ${bdr}`,
//             }}
//           >
//             <div
//               style={{
//                 width: 36,
//                 height: 36,
//                 borderRadius: "50%",
//                 background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#fff",
//                 fontSize: 14,
//                 fontWeight: 700,
//               }}
//             >
//               {user.name?.[0] || "S"}
//             </div>
//             <div>
//               <p
//                 style={{
//                   fontSize: 13,
//                   color: uName,
//                   fontWeight: 600,
//                   margin: 0,
//                 }}
//               >
//                 {user.name}
//               </p>
//               <p
//                 style={{
//                   fontSize: 10,
//                   color: "#a78bfa",
//                   margin: 0,
//                   textTransform: "uppercase",
//                   letterSpacing: "0.08em",
//                 }}
//               >
//                 Super Admin
//               </p>
//             </div>
//             <div
//               style={{
//                 marginLeft: "auto",
//                 display: "flex",
//                 gap: 12,
//                 fontSize: 11,
//                 color: idle,
//               }}
//             >
//               <span>
//                 <b style={{ color: uName }}>{activeUsers}</b> active
//               </span>
//               <span>
//                 <b style={{ color: "#fbbf24" }}>{pendingCount}</b> pending
//               </span>
//             </div>
//           </div>

//           {/* Nav items */}
//           <nav style={{ padding: "8px 10px" }}>
//             {NAV.map((entry, idx) => {
//               if (entry.type === "item") {
//                 if (entry.permission && !hasPermission(entry.permission))
//                   return null;
//                 return (
//                   <NavLink
//                     key={entry.path}
//                     to={entry.path}
//                     end={entry.end ?? false}
//                     onClick={() => setMobileOpen(false)}
//                     style={({ isActive }) => ({
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 11,
//                       padding: "11px 12px",
//                       borderRadius: 8,
//                       textDecoration: "none",
//                       color: isActive ? active : mText,
//                       background: isActive
//                         ? dark
//                           ? "rgba(124,58,237,.10)"
//                           : "rgba(124,58,237,.07)"
//                         : "transparent",
//                       fontSize: 14,
//                       fontWeight: 500,
//                       marginBottom: 2,
//                     })}
//                   >
//                     <SvgIcon d={entry.icon} size={15} />
//                     {entry.label}
//                   </NavLink>
//                 );
//               }
//               if (entry.type === "dropdown") {
//                 const isOpen = expandedGroup === idx;
//                 return (
//                   <div key={idx} style={{ marginBottom: 2 }}>
//                     <button
//                       onClick={() => setExpandedGroup(isOpen ? null : idx)}
//                       style={{
//                         width: "100%",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 11,
//                         padding: "11px 12px",
//                         borderRadius: 8,
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                         color: mText,
//                         fontSize: 14,
//                         fontWeight: 500,
//                         textAlign: "left",
//                       }}
//                     >
//                       <ChevronDown
//                         size={15}
//                         style={{
//                           color: idle,
//                           transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
//                           transition: "transform .2s",
//                         }}
//                       />
//                       {entry.label}
//                     </button>
//                     {isOpen && (
//                       <div style={{ paddingLeft: 30, paddingBottom: 4 }}>
//                         {entry.children.map((item) => {
//                           const IconEl = item.iconComponent || null;
//                           return (
//                             <NavLink
//                               key={item.path}
//                               to={item.path}
//                               onClick={() => {
//                                 setMobileOpen(false);
//                                 setExpandedGroup(null);
//                               }}
//                               style={({ isActive }) => ({
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 9,
//                                 padding: "9px 10px",
//                                 borderRadius: 7,
//                                 textDecoration: "none",
//                                 color: isActive ? active : idle,
//                                 background: isActive
//                                   ? dark
//                                     ? "rgba(124,58,237,.10)"
//                                     : "rgba(124,58,237,.07)"
//                                   : "transparent",
//                                 fontSize: 13,
//                                 fontWeight: 500,
//                                 marginBottom: 1,
//                               })}
//                             >
//                               {IconEl ? (
//                                 <IconEl size={13} />
//                               ) : (
//                                 <SvgIcon d={item.icon} size={13} />
//                               )}
//                               <span>{item.label}</span>
//                               {item.badge && pendingCount > 0 && (
//                                 <span
//                                   style={{
//                                     marginLeft: "auto",
//                                     background: "#f59e0b",
//                                     color: "#fff",
//                                     fontSize: 10,
//                                     fontWeight: 700,
//                                     padding: "1px 6px",
//                                     borderRadius: 999,
//                                   }}
//                                 >
//                                   {pendingCount}
//                                 </span>
//                               )}
//                             </NavLink>
//                           );
//                         })}
//                       </div>
//                     )}
//                   </div>
//                 );
//               }
//               return null;
//             })}
//           </nav>

//           {/* Bottom: theme + logout */}
//           <div
//             style={{
//               padding: "10px 18px",
//               borderTop: `1px solid ${bdr}`,
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//             }}
//           >
//             <button
//               onClick={toggleTheme}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 10,
//                 padding: "10px 10px",
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 color: mText,
//                 fontSize: 14,
//                 borderRadius: 8,
//                 textAlign: "left",
//               }}
//             >
//               <SvgIcon d={dark ? ic.sun : ic.moon} size={15} />
//               {dark ? "Light Mode" : "Dark Mode"}
//             </button>
//             <button
//               onClick={logout}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 10,
//                 padding: "10px 10px",
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 color: "#f87171",
//                 fontSize: 14,
//                 borderRadius: 8,
//                 textAlign: "left",
//               }}
//             >
//               <SvgIcon d={ic.logout} size={15} />
//               Logout
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ── Responsive CSS ────────────────────────────────────── */}
//       <style>{`
//         /* Desktop (>1024px): everything visible */
//         .sa-mobile-only { display: none !important; }
//         .sa-nav-row     { display: flex !important; }
//         .sa-stats       { display: flex !important; }

//         /* Tablet (769–1024px): hide stats, keep nav row */
//         @media (max-width: 1024px) and (min-width: 769px) {
//           .sa-stats { display: none !important; }
//         }

//         /* Mobile (≤768px): hide nav row, show hamburger */
//         @media (max-width: 768px) {
//           .sa-nav-row     { display: none !important; }
//           .sa-stats       { display: none !important; }
//           .sa-mobile-only { display: flex !important; }
//         }

//         /* ✅ FIX: Remove any overflow/scroll so all tabs stay visible */
//         .sa-nav-row { overflow: visible !important; }

//         /* Hover state for nav links */
//         .sa-nav-row a:hover { color: #7c3aed !important; }
//       `}</style>
//     </>
//   );
// };

// export default SuperAdminNavbar;

































"use client";

// src/SuperAdmin/components/layout/SuperAdminNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "@/lib/routerCompat";
import {
  Mail,
  FileSearch,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  Search,
  X,
} from "lucide-react";
import { PERMISSIONS } from "@/SuperAdmin/constants/permissions";
import { useTheme } from "../../context/ThemeContext";

// react-router's <NavLink> isn't available under Next.js App Router. This
// local shim reproduces the exact subset of its API this file relies on
// (to / end / style-as-function-of-isActive / onClick / children) using the
// routerCompat hooks, so none of the call sites below needed to change.
const NavLink = ({ to, end = false, onClick, style, children, ...rest }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isActive = end
    ? pathname === to
    : pathname === to || pathname.startsWith(to + "/");
  const resolvedStyle = typeof style === "function" ? style({ isActive }) : style;
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        onClick?.(e);
        navigate(to);
      }}
      style={resolvedStyle}
      {...rest}
    >
      {children}
    </a>
  );
};

// ── Icons ─────────────────────────────────────────────────────
const ic = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  onboarding:
    "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M8.5 11a4 4 0 100-8 4 4 0 000 8z M20 8v6 M23 11h-6",
  organizations:
    "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
  approvals: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  permissions:
    "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  // ✅ NEW
  roadmap:
    "M6 3v12 M15 6a3 3 0 106 0 3 3 0 10-6 0 M3 18a3 3 0 106 0 3 3 0 10-6 0 M18 9a9 9 0 01-9 9",
  analytics: "M18 20V10 M12 20V4 M6 20v-6",

  auditMonitoring: "M22 12h-4l-3 9L9 3l-3 9H2",
  video:
    "M23 7l-7 5 7 5V7z M14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z",
  security: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
  settings:
    "M12 20a8 8 0 100-16 8 8 0 000 16z M12 14a2 2 0 100-4 2 2 0 000 4z M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  sun: "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 17a5 5 0 100-10 5 5 0 000 10z",
  moon: "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
   featuredPrograms:
    "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z M9 7h6 M9 11h6 M9 15h4",
  // ✅ NEW — Sales Management
  sales: "M22 7l-8.5 8.5-5-5L2 17 M16 7h6v6",
};
const SvgIcon = ({ d, size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

// ── Nav structure — all tabs from old sidebar ─────────────────
const NAV = [
  {
    type: "item",
    label: "Dashboard",
    path: "/superadmin",
    icon: ic.dashboard,
    end: true,
    permission: null,
  },
  {
    type: "dropdown",
    label: "Access Management",
    children: [
      {
        label: "Onboarding",
        path: "/superadmin/onboarding",
        icon: ic.onboarding,
        permission: PERMISSIONS.VIEW_ONBOARDING,
      },
      {
        label: "Organizations",
        path: "/superadmin/organizations",
        icon: ic.organizations,
        permission: PERMISSIONS.VIEW_ORGANIZATIONS,
      },
      {
        label: "Assessment System",
        path: "/superadmin/assessment-system",
        icon: ic.approvals, // clipboard-checkmark path, already defined in `ic`
        permission: PERMISSIONS.VIEW_ORGANIZATIONS, // reuse, or swap for a dedicated permission if you have one
      },
      {
        label: "Batch Management", // ✅ ADD THIS
        path: "/superadmin/batch-control", // ✅ matches App.jsx route
        icon: ic.permissions, // reuse any icon, or add a new one
        permission: PERMISSIONS.MANAGE_PERMISSIONS,
      },
      {
        label: "Course Management",
        path: "/superadmin/courses",
        icon: ic.organizations,
        permission: null,
      },
      {
        label: "Feedback Review",
        path: "/superadmin/feedback-review",
        icon: ic.approvals, // reuses the checkmark-circle path already defined in `ic`
        permission: PERMISSIONS.VIEW_ANALYTICS, // swap for whatever permission gates feedback in your setup
      },
           {
        label: "Attendance Review",
        path: "/superadmin/attendance-review",
        icon: ic.approvals,
        permission: PERMISSIONS.VIEW_ANALYTICS,
      },
    ],
  },

  {
    type: "item", // ✅ NEW — Sales Management
    label: "Sales Management",
    path: "/superadmin/sales-management",
    icon: ic.sales,
    permission: null,
  },

  {
    type: "item",
    label: "Analytics",
    path: "/superadmin/analytics",
    icon: ic.analytics,
    permission: PERMISSIONS.VIEW_ANALYTICS,
  },

  {
    type: "item",
    label: "Audit & Monitoring",
    path: "/superadmin/audit-monitoring",
    icon: ic.auditMonitoring,
    permission: PERMISSIONS.VIEW_ANALYTICS,
  },

  {
    type: "item",
    label: "WorkSpace",
    path: "/superadmin/workspace",
    icon: ic.video,
    permission: null, // swap for a PERMISSIONS.* value if you want to gate it
  },
   {
  type: "item",
  label: "Workshops",
  path: "/superadmin/workshops-management",
  icon: "M12 3L2 8l10 5 10-5-10-5z M6 10.5V16l6 3 6-3v-5.5",
  permission: null,
},
  {
    type: "item", // ✅ NEW
    label: "Roadmap",
    path: "/superadmin/roadmap-upgraded",
    icon: ic.roadmap,
    permission: null,
  },
  {
    type: "dropdown",
    label: "Landing Pages",
    children: [
      {
        label: "Featured Programs",
        path: "/superadmin/featured-programs",
        icon: ic.featuredPrograms,
        permission: null,
      },
      {
        label: "Top Global Companies",
        path: "/superadmin/top-global-companies",
        icon: ic.featuredPrograms,
        permission: null,
      },
      {
        label: "Mentors",
        path: "/superadmin/mentors",
        icon: ic.featuredPrograms,
        permission: null,
      },
      {
        label: "Upload Watch Now",
        path: "/superadmin/upload-watch-now",
        icon: ic.featuredPrograms,
        permission: null,
      },
      {
        label: "Banner Studio",
        path: "/superadmin/cms/banner-studio",
        icon: ic.featuredPrograms,
        permission: null,
      },
            {
        label: "Platform Overview",
        path: "/superadmin/cms/platform-overview",
        icon: ic.featuredPrograms,
        permission: null,
      },
      {
        label: "Marketing Banner",
        path: "/superadmin/cms/marketing-banner",
        icon: ic.featuredPrograms,
        permission: null,
      },
    ],
  },

  {
    type: "item",
    label: "Security",
    path: "/superadmin/security-settings",
    icon: ic.security,
    permission: PERMISSIONS.MANAGE_SECURITY,
  },
  {
    type: "dropdown",
    label: "Settings",
    children: [
      {
        label: "Send Email",
        path: "/superadmin/settings/send-email",
        iconComponent: Mail,
        permission: PERMISSIONS.VIEW_SETTINGS,
      },
      {
        label: "Audit Logs",
        path: "/superadmin/settings/audit-logs",
        iconComponent: FileSearch,
        permission: PERMISSIONS.VIEW_SETTINGS,
      },
      {
        label: "Global Settings",
        path: "/superadmin/global-settings",
        icon: ic.settings,
        permission: PERMISSIONS.VIEW_SETTINGS,
      },
    ],
  },
];

// ── Notifications ─────────────────────────────────────────────
const INIT_NOTIFS = [
  {
    id: 1,
    type: "approval",
    msg: "New trainer application from Rajesh Kumar",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    type: "alert",
    msg: "Student account suspended: Priya Singh",
    time: "15m ago",
    unread: true,
  },
  {
    id: 3,
    type: "info",
    msg: "System backup completed successfully",
    time: "1h ago",
    unread: false,
  },
  {
    id: 4,
    type: "warning",
    msg: "High CPU usage on live session server",
    time: "2h ago",
    unread: false,
  },
];
const NOTIF_CLR = {
  approval: "#fbbf24",
  alert: "#f87171",
  info: "#60a5fa",
  warning: "#fb923c",
};

// ── Hook ──────────────────────────────────────────────────────
const useOutside = (ref, cb) => {
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) cb();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, cb]);
};

// ── Desktop sidebar (≥1024px) — the only desktop navigation ───
// Renders the SAME `NAV` config, NavLink shim and hasPermission used by the
// mobile drawer below; there is no second route list.
const SIDEBAR_W = 232;
const SIDEBAR_W_COLLAPSED = 68;

// NAV's dropdown groups carry no icon of their own, so map them here
// (keeps the NAV config itself untouched).
const GROUP_ICON = {
  "Access Management": ic.onboarding,
  "Landing Pages": ic.featuredPrograms,
  Settings: ic.settings,
};

const pathMatches = (pathname, p) =>
  pathname === p || pathname.startsWith(p + "/");

const Sidebar = ({ dark, collapsed, onToggle, pendingCount, hasPermission }) => {
  const { pathname } = useLocation();
  // Start with the group that owns the current route already open, so the
  // first paint is correct (no collapsed-then-expanded flash on page load).
  const [openGroups, setOpenGroups] = useState(() => {
    const init = {};
    NAV.forEach((entry, idx) => {
      if (
        entry.type === "dropdown" &&
        entry.children.some((c) => pathMatches(pathname, c.path))
      ) {
        init[idx] = true;
      }
    });
    return init;
  });

  // Keep it in sync on client-side navigation (never closes a group by itself).
  useEffect(() => {
    NAV.forEach((entry, idx) => {
      if (
        entry.type === "dropdown" &&
        entry.children.some((c) => pathMatches(pathname, c.path))
      ) {
        setOpenGroups((o) => (o[idx] ? o : { ...o, [idx]: true }));
      }
    });
  }, [pathname]);

  const bg = dark ? "#0d0d14" : "#ffffff";
  const bdr = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.09)";
  const text = dark ? "#e2e8f0" : "#1f2937";
  const idleIcon = dark ? "#94a3b8" : "#475569";
  const subText = dark ? "#94a3b8" : "#475569";
  const subDot = dark ? "#64748b" : "#94a3b8";
  const actBg = dark ? "rgba(249,115,22,.16)" : "#fde9dc";
  const actText = dark ? "#fdba74" : "#9a3412";
  const actIcon = dark ? "#fb923c" : "#ea580c";

  const row = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    boxSizing: "border-box",
    padding: collapsed ? "7px 0" : "7px 10px",
    justifyContent: collapsed ? "center" : "flex-start",
    borderRadius: 8,
    textDecoration: "none",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 600,
    textAlign: "left",
    color: isActive ? actText : text,
    background: isActive ? actBg : undefined,
    marginBottom: 1,
  });

  const subRow = (isActive) => ({
    display: "flex",
    alignItems: "center",
    gap: 16,
    boxSizing: "border-box",
    padding: "6px 10px 6px 17px",
    borderRadius: 8,
    textDecoration: "none",
    fontSize: 12.5,
    fontWeight: isActive ? 600 : 500,
    color: isActive ? actText : subText,
    background: isActive ? actBg : undefined,
    marginBottom: 0,
  });

  const icon = (d, isActive) => (
    <span
      style={{
        display: "inline-flex",
        flexShrink: 0,
        color: isActive ? actIcon : idleIcon,
      }}
    >
      <SvgIcon d={d} size={18} />
    </span>
  );

  return (
    <aside
      className="sa-sidebar"
      aria-label="Main navigation"
      style={{
        width: collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W,
        background: bg,
        borderRight: `1px solid ${bdr}`,
        "--sa-sb-hover": dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.045)",
      }}
    >
      {/* Brand + collapse toggle */}
      <div
        style={{
          height: 56,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? 0 : "0 12px 0 16px",
        }}
      >
        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 21,
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              <span style={{ color: "#22c55e" }}>ILM</span>
              <span style={{ color: "#f97316" }}>&nbsp;ORA</span>
            </h3>
            <span
              style={{
                display: "block",
                marginTop: 4,
                fontSize: 8.5,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: dark ? "#94a3b8" : "#475569",
                whiteSpace: "nowrap",
              }}
            >
              SuperAdmin Panel
            </span>
          </div>
        )}
        <button
          type="button"
          className="sa-sb-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            flexShrink: 0,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            background: dark ? "rgba(255,255,255,.06)" : "#f1f5f9",
            color: idleIcon,
          }}
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="sa-sb-nav"
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "6px 10px 16px",
        }}
      >
        {NAV.map((entry, idx) => {
          if (entry.type === "item") {
            if (entry.permission && !hasPermission(entry.permission))
              return null;
            const isActive = entry.end
              ? pathname === entry.path
              : pathMatches(pathname, entry.path);
            return (
              <NavLink
                key={entry.path}
                to={entry.path}
                end={entry.end ?? false}
                className="sa-sb-row"
                title={collapsed ? entry.label : undefined}
                style={row(isActive)}
              >
                {icon(entry.icon, isActive)}
                {!collapsed && <span>{entry.label}</span>}
              </NavLink>
            );
          }

          if (entry.type === "dropdown") {
            const isOpen = !collapsed && !!openGroups[idx];
            // Collapsed rail: mark the group that owns the current route.
            const ownsRoute =
              collapsed && entry.children.some((c) => pathMatches(pathname, c.path));
            return (
              <div key={idx}>
                <button
                  type="button"
                  className="sa-sb-row"
                  aria-expanded={isOpen}
                  title={collapsed ? entry.label : undefined}
                  onClick={() => {
                    if (collapsed) {
                      onToggle();
                      setOpenGroups((o) => ({ ...o, [idx]: true }));
                    } else {
                      setOpenGroups((o) => ({ ...o, [idx]: !o[idx] }));
                    }
                  }}
                  style={{ ...row(ownsRoute), border: "none", cursor: "pointer" }}
                >
                  {icon(GROUP_ICON[entry.label] || ic.featuredPrograms, ownsRoute)}
                  {!collapsed && (
                    <>
                      <span style={{ flex: 1 }}>{entry.label}</span>
                      <ChevronDown
                        size={15}
                        style={{ color: idleIcon, flexShrink: 0 }}
                      />
                    </>
                  )}
                </button>

                {isOpen && (
                  <div style={{ padding: "1px 0 4px" }}>
                    {entry.children.map((item) => {
                      const isActive = pathMatches(pathname, item.path);
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className="sa-sb-row"
                          style={subRow(isActive)}
                        >
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              flexShrink: 0,
                              background: isActive ? actIcon : subDot,
                            }}
                          />
                          <span style={{ flex: 1, minWidth: 0 }}>
                            {item.label}
                          </span>
                          {item.badge && pendingCount > 0 && (
                            <span
                              style={{
                                background: "#f59e0b",
                                color: "#fff",
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "1px 6px",
                                borderRadius: 999,
                              }}
                            >
                              {pendingCount}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </nav>
    </aside>
  );
};

// ── Main navbar ───────────────────────────────────────────────
const SuperAdminNavbar = ({ pendingCount = 0, activeUsers = 0 }) => {
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [notifs, setNotifs] = useState(INIT_NOTIFS);

  const notifRef = useRef(null);
  const userRef = useRef(null);

  useOutside(notifRef, () => setShowNotif(false));
  useOutside(userRef, () => setShowUser(false));

  // Desktop sidebar collapse is UI-only. Its width is published as a CSS
  // variable so the fixed top bar and SuperAdminLayout's <main> can offset.
  const [collapsed, setCollapsed] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sa-sidebar-w",
      `${collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W}px`,
    );
    return () => document.documentElement.style.removeProperty("--sa-sidebar-w");
  }, [collapsed]);

  // Ctrl/⌘ + K focuses the top-bar search (ignored while it is hidden <1024px).
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key && e.key.toLowerCase() === "k") {
        const el = searchRef.current;
        if (!el || el.getClientRects().length === 0) return;
        e.preventDefault();
        el.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const drawerRef = useRef(null);

  // PHASE 2B — drawer: body scroll lock, ESC closes, Tab trapped inside,
  // focus returns to whatever opened it.
  useEffect(() => {
    if (!mobileOpen) return;
    const trigger = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const f = drawerRef.current.querySelectorAll("a[href], button:not([disabled])");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (trigger && typeof trigger.focus === "function") trigger.focus();
    };
  }, [mobileOpen]);

  // PHASE 2B — the bottom bar's "More" button opens this same drawer.
  useEffect(() => {
    const open = () => setMobileOpen(true);
    window.addEventListener("ilm:open-nav", open);
    return () => window.removeEventListener("ilm:open-nav", open);
  }, []);

  // PHASE 2B — resizing / rotating to >=1024px must not leave the drawer stuck open.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => {
      if (e.matches) setMobileOpen(false);
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const unread = notifs.filter((n) => n.unread).length;
  const user = { name: "Super Admin" };
  const logout = () => {
    window.location.href = "/";
  };
  const hasPermission = () => true;

  // ── Design tokens ────────────────────────────────────────────
  const bg = dark ? "#0d0d14" : "#ffffff";
  const bdr = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.09)";
  const active = dark ? "#a78bfa" : "#7c3aed";
  const idle = dark ? "#94a3b8" : "#64748b";
  const panel = dark ? "#13131f" : "#ffffff";
  const pdBdr = dark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.10)";
  const uName = dark ? "#ffffff" : "#111111";
  const mText = dark ? "#cbd5e1" : "#374151";

  const ibtn = (extra = {}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: idle,
    padding: "7px 8px",
    borderRadius: 7,
    transition: "color .15s",
    ...extra,
  });

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          SIDEBAR — desktop (≥1024px), the only desktop navigation
      ══════════════════════════════════════════════════════ */}
      <Sidebar
        dark={dark}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        pendingCount={pendingCount}
        hasPermission={hasPermission}
      />

      {/* ══════════════════════════════════════════════════════
          TOP BAR — fixed, single row (right of the sidebar on desktop)
      ══════════════════════════════════════════════════════ */}
      <header
        className="sa-header"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 50,
          background: bg,
          borderBottom: `1px solid ${bdr}`,
          boxShadow: dark ? "none" : "0 1px 8px rgba(0,0,0,.06)",
        }}
      >
        {/* ── Search + right controls (56px desktop / 52px <1024px) ── */}
        <div
          className="sa-row1"
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {/* Logo — only shown <1024px, where the sidebar is hidden.
              On desktop the brand lives in the sidebar. */}
          <div className="sa-logo" style={{ flexShrink: 0, marginRight: 24 }}>
            <h3
              style={{
                margin: 0,
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "-0.05em",
                lineHeight: 1,
              }}
            >
              <span style={{ color: "#22c55e" }}>ILM</span>
              <span style={{ color: "#f97316" }}>&nbsp;ORA</span>
            </h3>
            <span
              className="sa-logo-sub"
              style={{
                fontSize: 8,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: idle,
              }}
            >
              SuperAdmin Panel
            </span>
          </div>

          {/* Search — desktop only. UI only: the app has no search API yet. */}
          <label
            className="sa-search"
            style={{
              alignItems: "center",
              gap: 10,
              flex: "1 1 auto",
              minWidth: 0,
              maxWidth: 460,
              height: 36,
              padding: "0 14px",
              boxSizing: "border-box",
              borderRadius: 999,
              cursor: "text",
              background: dark ? "rgba(255,255,255,.04)" : "#ffffff",
              border: `1px solid ${pdBdr}`,
              boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04)",
            }}
          >
            <Search size={18} style={{ color: idle, flexShrink: 0 }} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search anything..."
              aria-label="Search"
              autoComplete="off"
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                background: "transparent",
                color: uName,
                fontSize: 14,
                fontFamily: "inherit",
              }}
            />
            <kbd
              style={{
                flexShrink: 0,
                fontFamily: "inherit",
                fontSize: 12,
                color: idle,
                whiteSpace: "nowrap",
              }}
            >
              Ctrl + K
            </kbd>
          </label>

          <div style={{ flex: 1 }} />

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Stats — desktop only */}
            <div
              className="sa-stats"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 13,
                paddingRight: 8,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: idle,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#34d399",
                    display: "inline-block",
                  }}
                />
                <b style={{ color: uName, fontWeight: 600 }}>{activeUsers}</b>
                &nbsp;active
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: idle,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#fbbf24",
                    display: "inline-block",
                  }}
                />
                <b style={{ color: uName, fontWeight: 600 }}>{pendingCount}</b>
                &nbsp;pending
              </span>
            </div>

            <div
              className="sa-stats"
              style={{ width: 1, height: 20, background: bdr, margin: "0 6px" }}
            />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              title={dark ? "Light Mode" : "Dark Mode"}
              className="sa-iconbtn"
              style={ibtn()}
            >
              <SvgIcon d={dark ? ic.sun : ic.moon} size={17} />
            </button>

            {/* Bell */}
            <div style={{ position: "relative" }} ref={notifRef}>
              <button
                onClick={() => {
                  setShowNotif((v) => !v);
                  setShowUser(false);
                }}
                className="sa-iconbtn"
                style={ibtn({ position: "relative" })}
              >
                <SvgIcon d={ic.bell} size={18} />
                {unread > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 15,
                      height: 15,
                      background: "#7c3aed",
                      color: "#fff",
                      fontSize: 8,
                      fontWeight: 700,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {unread}
                  </span>
                )}
              </button>

              {showNotif && (
                <div
                  className="sa-sheet"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 6px)",
                    width: 304,
                    background: panel,
                    border: `1px solid ${pdBdr}`,
                    borderRadius: 12,
                    zIndex: 600,
                    boxShadow: dark
                      ? "0 24px 64px rgba(0,0,0,.55)"
                      : "0 8px 32px rgba(0,0,0,.14)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "11px 14px",
                      borderBottom: `1px solid ${pdBdr}`,
                    }}
                  >
                    <span
                      style={{ color: uName, fontSize: 13, fontWeight: 600 }}
                    >
                      Notifications
                    </span>
                    {unread > 0 && (
                      <button
                        onClick={() =>
                          setNotifs((n) =>
                            n.map((x) => ({ ...x, unread: false })),
                          )
                        }
                        style={{
                          fontSize: 11,
                          color: "#a78bfa",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div style={{ maxHeight: 280, overflowY: "auto" }}>
                    {notifs.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          padding: "10px 14px",
                          borderBottom: `1px solid ${pdBdr}`,
                          background: n.unread
                            ? dark
                              ? "rgba(124,58,237,.05)"
                              : "rgba(124,58,237,.04)"
                            : "transparent",
                        }}
                      >
                        <span
                          style={{
                            marginTop: 5,
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            flexShrink: 0,
                            background: n.unread
                              ? NOTIF_CLR[n.type]
                              : "#475569",
                            display: "inline-block",
                          }}
                        />
                        <div>
                          <p
                            style={{
                              fontSize: 12,
                              color: mText,
                              margin: 0,
                              lineHeight: 1.4,
                            }}
                          >
                            {n.msg}
                          </p>
                          <p
                            style={{
                              fontSize: 11,
                              color: idle,
                              margin: "3px 0 0",
                            }}
                          >
                            {n.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "8px 14px", textAlign: "center" }}>
                    <button
                      style={{
                        fontSize: 11,
                        color: "#a78bfa",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div
              className="sa-stats"
              style={{ width: 1, height: 20, background: bdr, margin: "0 6px" }}
            />

            {/* User chip — desktop only */}
            <div
              ref={userRef}
              style={{ position: "relative" }}
              className="sa-user"
            >
              <button
                onClick={() => {
                  setShowUser((v) => !v);
                  setShowNotif(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: dark
                    ? "rgba(255,255,255,.04)"
                    : "rgba(0,0,0,.04)",
                  border: `1px solid ${dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.10)"}`,
                  borderRadius: 12,
                  padding: "6px 12px 6px 8px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {user.name?.[0] || "S"}
                </div>
                <div className="sa-user-text" style={{ textAlign: "left" }}>
                  <p
                    style={{
                      fontSize: 13,
                      color: uName,
                      fontWeight: 600,
                      margin: 0,
                      lineHeight: 1.2,
                    }}
                  >
                    {user.name}
                  </p>
                  <p
                    style={{
                      fontSize: 10,
                      color: "#a78bfa",
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Super Admin
                  </p>
                </div>
                <ChevronDown
                  size={11}
                  className="sa-user-chev"
                  style={{
                    color: idle,
                    marginLeft: 2,
                    transform: showUser ? "rotate(180deg)" : "none",
                    transition: "transform .2s",
                  }}
                />
              </button>

              {showUser && (
                <div
                  className="sa-sheet"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 6px)",
                    minWidth: 160,
                    background: panel,
                    border: `1px solid ${pdBdr}`,
                    borderRadius: 10,
                    padding: 6,
                    zIndex: 600,
                    boxShadow: dark
                      ? "0 24px 64px rgba(0,0,0,.55)"
                      : "0 8px 32px rgba(0,0,0,.14)",
                  }}
                >
                  <button
                    onClick={() => {
                      navigate("/superadmin/profile");
                      setShowUser(false);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: mText,
                      fontSize: 13,
                      borderRadius: 6,
                      textAlign: "left",
                    }}
                  >
                    <SvgIcon d={ic.user} size={13} />
                    Profile
                  </button>
                  <div
                    style={{ height: 1, background: pdBdr, margin: "3px 0" }}
                  />
                  <button
                    onClick={logout}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#f87171",
                      fontSize: 13,
                      borderRadius: 6,
                      textAlign: "left",
                    }}
                  >
                    <SvgIcon d={ic.logout} size={13} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="sa-mobile-only sa-iconbtn"
              style={{ ...ibtn(), display: "none" }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════════════════ */}
      {mobileOpen && (
        <div
          ref={drawerRef}
          className="sa-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          tabIndex={-1}
          style={{
            position: "fixed",
            top: "calc(52px + env(safe-area-inset-top, 0px))",
            left: 0,
            right: 0,
            bottom: 0,
            background: dark ? "#0d0d14" : "#fff",
            zIndex: 49,
            overflowY: "auto",
            borderTop: `1px solid ${bdr}`,
          }}
        >
          {/* User row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 18px",
              borderBottom: `1px solid ${bdr}`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {user.name?.[0] || "S"}
            </div>
            <div>
              <p
                style={{
                  fontSize: 13,
                  color: uName,
                  fontWeight: 600,
                  margin: 0,
                }}
              >
                {user.name}
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "#a78bfa",
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Super Admin
              </p>
            </div>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: 12,
                fontSize: 11,
                color: idle,
              }}
            >
              <span>
                <b style={{ color: uName }}>{activeUsers}</b> active
              </span>
              <span>
                <b style={{ color: "#fbbf24" }}>{pendingCount}</b> pending
              </span>
            </div>
          </div>

          {/* Nav items */}
          <nav style={{ padding: "8px 10px" }}>
            {NAV.map((entry, idx) => {
              if (entry.type === "item") {
                if (entry.permission && !hasPermission(entry.permission))
                  return null;
                return (
                  <NavLink
                    key={entry.path}
                    to={entry.path}
                    end={entry.end ?? false}
                    onClick={() => setMobileOpen(false)}
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      padding: "11px 12px",
                      borderRadius: 8,
                      textDecoration: "none",
                      color: isActive ? active : mText,
                      background: isActive
                        ? dark
                          ? "rgba(124,58,237,.10)"
                          : "rgba(124,58,237,.07)"
                        : "transparent",
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 2,
                    })}
                  >
                    <SvgIcon d={entry.icon} size={15} />
                    {entry.label}
                  </NavLink>
                );
              }
              if (entry.type === "dropdown") {
                const isOpen = expandedGroup === idx;
                return (
                  <div key={idx} style={{ marginBottom: 2 }}>
                    <button
                      onClick={() => setExpandedGroup(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "11px 12px",
                        borderRadius: 8,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: mText,
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: "left",
                      }}
                    >
                      <ChevronDown
                        size={15}
                        style={{
                          color: idle,
                          transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                          transition: "transform .2s",
                        }}
                      />
                      {entry.label}
                    </button>
                    {isOpen && (
                      <div style={{ paddingLeft: 30, paddingBottom: 4 }}>
                        {entry.children.map((item) => {
                          const IconEl = item.iconComponent || null;
                          return (
                            <NavLink
                              key={item.path}
                              to={item.path}
                              onClick={() => {
                                setMobileOpen(false);
                                setExpandedGroup(null);
                              }}
                              style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: 9,
                                padding: "9px 10px",
                                borderRadius: 7,
                                textDecoration: "none",
                                color: isActive ? active : idle,
                                background: isActive
                                  ? dark
                                    ? "rgba(124,58,237,.10)"
                                    : "rgba(124,58,237,.07)"
                                  : "transparent",
                                fontSize: 13,
                                fontWeight: 500,
                                marginBottom: 1,
                              })}
                            >
                              {IconEl ? (
                                <IconEl size={13} />
                              ) : (
                                <SvgIcon d={item.icon} size={13} />
                              )}
                              <span>{item.label}</span>
                              {item.badge && pendingCount > 0 && (
                                <span
                                  style={{
                                    marginLeft: "auto",
                                    background: "#f59e0b",
                                    color: "#fff",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    padding: "1px 6px",
                                    borderRadius: 999,
                                  }}
                                >
                                  {pendingCount}
                                </span>
                              )}
                            </NavLink>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </nav>

          {/* Bottom: theme + logout */}
          <div
            style={{
              padding: "10px 18px calc(10px + env(safe-area-inset-bottom, 0px))",
              borderTop: `1px solid ${bdr}`,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: mText,
                fontSize: 14,
                borderRadius: 8,
                textAlign: "left",
              }}
            >
              <SvgIcon d={dark ? ic.sun : ic.moon} size={15} />
              {dark ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={logout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#f87171",
                fontSize: 14,
                borderRadius: 8,
                textAlign: "left",
              }}
            >
              <SvgIcon d={ic.logout} size={15} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* ── Responsive CSS ────────────────────────────────────── */}
      <style>{`
        /* Base (<1024px): sidebar + search hidden, 52px top bar with logo,
           module links live in the drawer. */
        .sa-mobile-only { display: none !important; }
        .sa-stats       { display: flex !important; }
        .sa-user        { display: flex !important; }
        .sa-header      { left: 0; padding-top: env(safe-area-inset-top, 0px); transition: left .2s ease; }
        .sa-row1        { height: 52px; }
        .sa-logo        { display: block; }
        .sa-search      { display: none; }
        .sa-sidebar {
          display: none; flex-direction: column;
          position: fixed; top: 0; left: 0; bottom: 0; z-index: 50;
          box-sizing: border-box; padding-top: env(safe-area-inset-top, 0px);
          transition: width .2s ease;
        }

        /* ≥1024px: left sidebar is the only navigation; top bar sits to its right */
        @media (min-width: 1024px) {
          .sa-header  { left: var(--sa-sidebar-w, 232px); }
          .sa-row1    { height: 56px; }
          .sa-logo    { display: none; }
          .sa-search  { display: flex; }
          .sa-sidebar { display: flex; }
        }

        /* Sidebar rows */
        .sa-sb-row { background: transparent; border: none; cursor: pointer; }
        .sa-sb-row:hover, .sa-sb-toggle:hover { background: var(--sa-sb-hover); }
        .sa-sb-row:focus-visible, .sa-sb-toggle:focus-visible { outline: 2px solid #7c3aed; outline-offset: -2px; }
        .sa-sb-nav { scrollbar-width: thin; }
        .sa-search:focus-within { border-color: #7c3aed !important; }

        /* <1024px: module links collapse into the drawer.
           Row keeps logo, theme, bell, avatar, hamburger. */
        @media (max-width: 1023px) {
          .sa-stats       { display: none !important; }
          .sa-mobile-only { display: flex !important; }
          .sa-user-text, .sa-user-chev { display: none !important; }
          .sa-user > button { padding: 3px !important; }
        }

        /* Phones: tighter top bar so five controls fit at 320px */
        @media (max-width: 639px) {
          .sa-row1 { padding: 0 12px !important; }
          .sa-logo { margin-right: 8px !important; }
        }
        @media (max-width: 359px) {
          .sa-logo-sub { display: none !important; }
        }

        /* <768px: notification + user panels become bottom sheets above the tab bar */
        @media (max-width: 767px) {
          .sa-sheet {
            position: fixed !important;
            left: 8px !important; right: 8px !important; top: auto !important;
            bottom: calc(var(--bottom-nav-h, 60px) + env(safe-area-inset-bottom, 0px) + 8px) !important;
            width: auto !important; min-width: 0 !important;
            max-height: 70vh !important; max-height: 70dvh !important;
            overflow-y: auto !important;
            border-radius: 16px !important;
          }
        }

        /* Touch devices: 44px hit areas */
        @media (pointer: coarse) {
          .sa-iconbtn { min-width: 44px; min-height: 44px; }
          .sa-user > button { min-height: 44px; }
          .sa-drawer a, .sa-drawer button { min-height: 44px; }
          .sa-sb-row { min-height: 44px; }
        }
        .sa-drawer:focus { outline: none; }

        @media (prefers-reduced-motion: reduce) {
          .sa-header *, .sa-drawer *, .sa-sidebar * { transition: none !important; }
          .sa-header, .sa-sidebar { transition: none !important; }
        }
      `}</style>
    </>
  );
};

export default SuperAdminNavbar;