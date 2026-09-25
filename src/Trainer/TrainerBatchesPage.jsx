
// import { useEffect, useState } from "react";
// import { useNavigate } from "@/lib/routerCompat";
// import { getTrainerBatches } from "../services/batchService";
// import { ChevronDown, ChevronUp, Users, BookOpen, Hash, GraduationCap } from "lucide-react";

// // ── Global Design System — single source of truth for colors, typography,
// // spacing, radius, shadows, StatCard, and PageContainer. This page inherits
// // from the same tokens as the Trainer Dashboard (golden reference); nothing
// // here should diverge from what's exported below.
// import { T, FONT_FAMILY, StatCard, PageContainer } from "@/design-system";

// /* ─── Local page styles (layout/animation only — colors always come from T) ─── */
// function pageStyles() {
//   return `
//     @keyframes tbfade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
//     .tb-fade { animation: tbfade .35s ease both; }
//     .tb-row:hover { background: var(--tb-row-hov); }
//     .tb-obtn:hover { opacity: .88; transform: translateY(-1px); }
//     @media (max-width: 480px) {
//       .tb-row { padding: 14px 16px !important; }
//       .tb-exp { padding: 14px 16px !important; flex-direction: column; align-items: stretch !important; }
//       .tb-obtn { width: 100%; text-align: center; }
//     }
//   `;
// }

// const TrainerBatchesPage = () => {
//   const [batches, setBatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState({});
//   const navigate = useNavigate();

//   const [isDark, setIsDark] = useState(
//     () =>
//       typeof document !== "undefined" &&
//       (document.documentElement.classList.contains("dark") ||
//         document.documentElement.getAttribute("data-theme") === "dark"),
//   );

//   useEffect(() => {
//     const obs = new MutationObserver(() => {
//       setIsDark(
//         document.documentElement.classList.contains("dark") ||
//           document.documentElement.getAttribute("data-theme") === "dark",
//       );
//     });
//     obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
//     return () => obs.disconnect();
//   }, []);

//   const t = isDark ? T.dark : T.light;

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const res = await getTrainerBatches();
//         setBatches(res || []);
//       } catch (err) {
//         console.error("Failed to load trainer batches", err);
//         setBatches([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

//   const card = { background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: 20, boxShadow: t.shadow };

//   const stat = {
//     label: "Batches Assigned",
//     numericValue: batches.length,
//     change: `${batches.length} batch${batches.length !== 1 ? "es" : ""}`,
//     trend: "up",
//     icon: Users,
//     colorKey: "blue",
//   };

//   return (
//     <>
//       <style>{pageStyles()}</style>
//       <PageContainer mode={isDark ? "dark" : "light"} pageBg={t.pageBg} textColor={t.text}>
//         {/* ═══ HERO ═══ */}
//         <div
//           className="dfade"
//           style={{
//             padding: "8px 0 24px",
//             background: "transparent",
//             border: "none",
//             borderBottom: `1px solid ${t.borderHero}`,
//             marginBottom: 20,
//             boxShadow: "none",
//           }}
//         >
//           <div className="hero-flex">
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
//                 <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7c3aed" }} className="d1" />
//                 <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: t.textSub, fontFamily: FONT_FAMILY }}>
//                   Batch Management
//                 </span>
//               </div>
//               <h1
//                 style={{
//                   fontFamily: FONT_FAMILY,
//                   fontWeight: 700,
//                   fontSize: "clamp(1.5rem,3vw,2.2rem)",
//                   margin: "0 0 6px",
//                   lineHeight: 1.1,
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 <span style={{ color: t.text }}>My </span>
//                 <span
//                   style={{
//                     background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     backgroundClip: "text",
//                   }}
//                 >
//                   Batches
//                 </span>
//               </h1>
//               <p style={{ fontSize: 12, color: t.textSub, margin: 0, fontWeight: 500, fontFamily: FONT_FAMILY }}>
//                 {batches.length} batch{batches.length !== 1 ? "es" : ""} assigned
//               </p>
//             </div>

//             <div className="hero-badges">
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 8,
//                   background: t.actBg,
//                   border: `1px solid ${t.actBorder}`,
//                   borderRadius: 10,
//                   padding: "8px 14px",
//                   fontSize: 12,
//                   fontWeight: 700,
//                   fontFamily: FONT_FAMILY,
//                   color: t.text,
//                 }}
//               >
//                 <Users size={14} color={t.textSub} />
//                 {batches.length}
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
//             <div
//               style={{
//                 width: 22,
//                 height: 22,
//                 borderRadius: "50%",
//                 border: "2px solid rgba(167,139,250,0.2)",
//                 borderTopColor: "#a78bfa",
//                 animation: "spin .8s linear infinite",
//               }}
//             />
//             <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//           </div>
//         ) : (
//           <>
//             {/* ═══ STAT ═══ */}
//             <div className="stat-grid" style={{ marginBottom: 20 }}>
//               <StatCard stat={stat} index={0} loading={false} />
//             </div>

//             {/* ═══ BATCH LIST ═══ */}
//             <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="tb-fade">
//               {batches.map((b) => {
//                 const isOpen = expanded[b.id];
//                 return (
//                   <div key={b.id} style={{ ...card, overflow: "hidden" }}>
//                     <div
//                       className="tb-row"
//                       onClick={() => toggle(b.id)}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         gap: 12,
//                         padding: "18px 22px",
//                         cursor: "pointer",
//                         userSelect: "none",
//                         background: isOpen ? t.recentItemBg : "transparent",
//                         transition: "background .15s",
//                       }}
//                     >
//                       <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
//                         <div
//                           style={{
//                             width: 40,
//                             height: 40,
//                             borderRadius: 12,
//                             flexShrink: 0,
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             background: t.iconBg,
//                             border: `1px solid ${t.iconBorder}`,
//                           }}
//                         >
//                           <BookOpen size={18} color={t.text} />
//                         </div>
//                         <div style={{ minWidth: 0 }}>
//                           <p
//                             style={{
//                               fontSize: 14,
//                               fontWeight: 700,
//                               color: t.text,
//                               margin: "0 0 3px",
//                               fontFamily: FONT_FAMILY,
//                               whiteSpace: "nowrap",
//                               overflow: "hidden",
//                               textOverflow: "ellipsis",
//                             }}
//                           >
//                             {b.batchName}
//                           </p>
//                           <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: t.textMuted }}>
//                             <Hash size={11} />
//                             <span>Batch ID: {b.id}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div style={{ color: t.textMuted, flexShrink: 0 }}>
//                         {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
//                       </div>
//                     </div>

//                     {isOpen && (
//                       <div
//                         className="tb-exp"
//                         style={{
//                           padding: "16px 22px",
//                           borderTop: `1px solid ${t.border}`,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           gap: 12,
//                           flexWrap: "wrap",
//                           background: t.recentItemBg,
//                         }}
//                       >
//                         <p style={{ fontSize: 12, color: t.textSub, flex: 1, minWidth: 160, margin: 0, fontFamily: FONT_FAMILY }}>
//                           Click <strong style={{ color: t.text }}>Open Classroom</strong> to manage students, content, and more for this batch.
//                         </p>
//                         <button
//                           className="tb-obtn"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigate(`/trainer/batches/${b.id}/students`);
//                           }}
//                           style={{
//                             padding: "10px 22px",
//                             borderRadius: 12,
//                             border: "none",
//                             background: "linear-gradient(135deg, #a78bfa, #22d3ee)",
//                             color: "#0a0a0a",
//                             fontFamily: FONT_FAMILY,
//                             fontSize: 13,
//                             fontWeight: 700,
//                             cursor: "pointer",
//                             whiteSpace: "nowrap",
//                             transition: "opacity .2s, transform .15s",
//                             boxShadow: "0 4px 14px rgba(167,139,250,0.35)",
//                           }}
//                         >
//                           Open Classroom
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>

//             {/* ═══ EMPTY STATE ═══ */}
//             {batches.length === 0 && (
//               <div style={{ ...card, padding: "60px 20px", textAlign: "center" }} className="tb-fade">
//                 <div
//                   style={{
//                     width: 60,
//                     height: 60,
//                     borderRadius: 16,
//                     margin: "0 auto 16px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     border: `1.5px dashed ${t.emptyBorder}`,
//                     background: t.emptyBg,
//                   }}
//                 >
//                   <GraduationCap size={26} color={t.emptyIcon} />
//                 </div>
//                 <p style={{ fontSize: 15, fontWeight: 700, color: t.textMuted, margin: "0 0 6px", fontFamily: FONT_FAMILY }}>
//                   No batches assigned yet
//                 </p>
//                 <p style={{ fontSize: 12, color: t.textLabel, margin: 0, fontFamily: FONT_FAMILY }}>
//                   Your batches will appear here once assigned.
//                 </p>
//               </div>
//             )}
//           </>
//         )}
//       </PageContainer>
//     </>
//   );
// };

// export default TrainerBatchesPage;





























"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "@/lib/routerCompat";
import { getTrainerBatches } from "../services/batchService";
import { ChevronDown, ChevronUp, Users, BookOpen, Hash, GraduationCap } from "lucide-react";

// ── Global Design System — same tokens/components as Batches.jsx /
// BatchReports.jsx (Golden Reference). Nothing here should diverge.
import {
  T,
  FONT_FAMILY,
  FONT_WEIGHT,
  FONT_SIZE,
  LINE_HEIGHT,
  LETTER_SPACING,
  RADIUS,
  ACCENT_PURPLE,
  StatCard,
  Hero,
  PageContainer,
} from "@/design-system";

function pageStyles() {
  return `
    @keyframes tbspin { to { transform: rotate(360deg); } }
    @keyframes tbfade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .tb-fade { animation: tbfade .35s ease both; }
    .tb-obtn:hover { opacity: .9; transform: translateY(-1px); }
    @media (max-width: 480px) {
      .tb-row { padding: 14px 16px !important; }
      .tb-exp { padding: 14px 16px !important; flex-direction: column; align-items: stretch !important; }
      .tb-obtn { width: 100%; text-align: center; }
    }
  `;
}

const TrainerBatchesPage = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [, setSearchParams] = useSearchParams();

  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      (document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark"),
  );

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(
        document.documentElement.classList.contains("dark") ||
          document.documentElement.getAttribute("data-theme") === "dark",
      );
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => obs.disconnect();
  }, []);

  const t = isDark ? T.dark : T.light;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getTrainerBatches();
        setBatches(res || []);
      } catch (err) {
        console.error("Failed to load trainer batches", err);
        setBatches([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  // ── ROUTING FIX ──────────────────────────────────────────────────────
  // Stays inside the /ilm-demo shell — sets ?section=/trainer/batches/:id/students
  // instead of navigate()-ing to the real standalone route. This is the
  // exact same mechanism every other sidebar item (Batch Management,
  // Reports & Analytics, etc.) already uses.
  const openClassroom = (id) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("section", `/trainer/batches/${id}/students`);
        return next;
      },
      { replace: false },
    );
  };

  const card = { background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: RADIUS.standardCard, boxShadow: t.shadow };

  const stat = {
    label: "Batches Assigned",
    numericValue: batches.length,
    change: `${batches.length} batch${batches.length !== 1 ? "es" : ""}`,
    trend: "up",
    icon: Users,
    colorKey: "blue",
  };

  return (
    <>
      <style>{pageStyles()}</style>
      <PageContainer mode={isDark ? "dark" : "light"} pageBg={t.pageBg} textColor={t.text}>
        {/* ═══ HERO — shared component, matches Golden Reference exactly ═══ */}
        <Hero borderHero={t.borderHero}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT_PURPLE.base }} />
              <span style={{ fontSize: FONT_SIZE.eyebrow, fontWeight: FONT_WEIGHT.bold, letterSpacing: LETTER_SPACING.eyebrowWide, textTransform: "uppercase", color: t.textSub, fontFamily: FONT_FAMILY }}>
                Batch Management
              </span>
            </div>
            <h1 style={{ fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT.heroTitle, fontSize: FONT_SIZE.heroTitle, color: t.text, margin: "0 0 6px", lineHeight: LINE_HEIGHT.heroTitle, letterSpacing: LETTER_SPACING.heroTitle }}>
  My Batches
</h1>
            <p style={{ fontSize: FONT_SIZE.bodySmall, color: t.textSub, margin: 0, fontWeight: FONT_WEIGHT.medium, fontFamily: FONT_FAMILY }}>
              {batches.length} batch{batches.length !== 1 ? "es" : ""} assigned
            </p>
          </div>

          <div className="hero-badges">
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: t.actBg, border: `1px solid ${t.actBorder}`, borderRadius: RADIUS.button, padding: "8px 14px", fontSize: 12, fontWeight: 700, fontFamily: FONT_FAMILY, color: t.text }}>
              <Users size={14} color={t.textSub} />
              {batches.length}
            </div>
          </div>
        </Hero>

        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${ACCENT_PURPLE.base}33`, borderTopColor: ACCENT_PURPLE.base, animation: "tbspin .8s linear infinite" }} />
          </div>
        ) : (
          <>
            {/* ═══ STAT ═══ */}
            <div className="stat-grid" style={{ marginBottom: 20 }}>
              <StatCard stat={stat} index={0} loading={false} />
            </div>

            {/* ═══ BATCH LIST ═══ */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }} className="tb-fade">
              {batches.map((b) => {
                const isOpen = expanded[b.id];
                return (
                  <div key={b.id} style={{ ...card, overflow: "hidden" }}>
                    <div
                      className="tb-row"
                      onClick={() => toggle(b.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        padding: "18px 22px",
                        cursor: "pointer",
                        userSelect: "none",
                        background: isOpen ? `${ACCENT_PURPLE.base}0d` : "transparent",
                        transition: "background .15s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, flex: 1 }}>
                        <div style={{ width: 40, height: 40, borderRadius: RADIUS.chip, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: t.iconBg, border: `1px solid ${t.iconBorder}` }}>
  <BookOpen size={18} color={t.text} />
</div>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, color: t.text, margin: "0 0 3px", fontFamily: FONT_FAMILY, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {b.batchName}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: t.textMuted }}>
                            <Hash size={11} />
                            <span>Batch ID: {b.id}</span>
                          </div>
                        </div>
                      </div>
                      <div style={{ color: t.textMuted, flexShrink: 0 }}>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </div>

                    {isOpen && (
                      <div
                        className="tb-exp"
                        style={{
                          padding: "16px 22px",
                          borderTop: `1px solid ${t.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 12,
                          flexWrap: "wrap",
                          background: `${ACCENT_PURPLE.base}0d`,
                        }}
                      >
                        <p style={{ fontSize: 12, color: t.textSub, flex: 1, minWidth: 160, margin: 0, fontFamily: FONT_FAMILY }}>
                          Click <strong style={{ color: t.text }}>Open Classroom</strong> to manage students, content, and more for this batch.
                        </p>
                        <button
  className="tb-obtn"
  onClick={(e) => {
    e.stopPropagation();
    openClassroom(b.id);
  }}
  style={{
    padding: "10px 22px",
    borderRadius: RADIUS.pill,
    border: `1px solid ${t.pillBorder}`,
    background: t.pillBg,
    color: t.text,
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "opacity .2s, transform .15s",
  }}
>
  Open Classroom
</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ═══ EMPTY STATE ═══ */}
            {batches.length === 0 && (
              <div style={{ ...card, padding: "56px 20px", textAlign: "center" }} className="tb-fade">
                <div style={{ width: 52, height: 52, borderRadius: 15, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px dashed ${t.emptyBorder}`, background: t.emptyBg }}>
                  <GraduationCap size={22} color={t.emptyIcon} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: "0 0 6px", fontFamily: FONT_FAMILY }}>
                  No batches assigned yet
                </p>
                <p style={{ fontSize: 12, color: t.textMuted, margin: 0, fontFamily: FONT_FAMILY }}>
                  Your batches will appear here once assigned.
                </p>
              </div>
            )}
          </>
        )}
      </PageContainer>
    </>
  );
};

export default TrainerBatchesPage;