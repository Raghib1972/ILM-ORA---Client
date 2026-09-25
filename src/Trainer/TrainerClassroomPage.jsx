"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "@/lib/routerCompat";
import { getTrainerBatchStudents } from "../services/batchService";
import { ChevronDown, Users, Search, Mail, ArrowLeft } from "lucide-react";

// ── Global Design System — same tokens as My Batches / Batch Reports.
import {
  T,
  FONT_FAMILY,
  FONT_WEIGHT,
  FONT_SIZE,
  LINE_HEIGHT,
  LETTER_SPACING,
  RADIUS,
  ACCENT_PURPLE,
  PageContainer,
  Hero,
} from "@/design-system";

const AVATAR_PALETTES = [
  { bg: "#1c1c1c", text: "#fff" },
];

function initials(email = "") {
  const name = email.split("@")[0];
  const parts = name.split(/[._-]/);
  return parts.length > 1
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

function pageStyles() {
  return `
    @keyframes tcspin { to { transform: rotate(360deg); } }
    @media (max-width: 640px) { .tc-grid { grid-template-columns: 1fr !important; } }
  `;
}

function EmptyBlock({ t, icon: Icon, title, sub }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "50px 20px", gap: 12, textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px dashed ${t.emptyBorder}`, background: t.emptyBg }}>
        <Icon size={22} color={t.emptyIcon} />
      </div>
      <p style={{ fontSize: 15, fontWeight: 700, color: t.text, margin: 0, fontFamily: FONT_FAMILY }}>{title}</p>
      {sub && <p style={{ fontSize: 12, color: t.textMuted, maxWidth: 280, lineHeight: 1.6, margin: 0, fontFamily: FONT_FAMILY }}>{sub}</p>}
    </div>
  );
}

const TrainerClassroomPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── ROUTING FIX ──────────────────────────────────────────────────────
  // This page now opens as an /ilm-demo *section*
  // (?section=/trainer/batches/:id/students), not a standalone route,
  // so batchId comes from the section value, not useParams().
  const section = searchParams.get("section") || "";
  const match = section.match(/^\/trainer\/batches\/([^/]+)\/students$/);
  const batchId = match ? match[1] : null;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState("");

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
    if (!batchId) return;
    setLoading(true);
    getTrainerBatchStudents(batchId)
      .then((res) => setStudents(res.data || []))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, [batchId]);

  const goBack = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("section", "/trainer/batches");
        return next;
      },
      { replace: false },
    );
  };

  const filtered = students.filter((e) => e.toLowerCase().includes(search.toLowerCase()));
  const card = { background: t.cardBg, border: `1px solid ${t.border}`, borderRadius: RADIUS.standardCard, boxShadow: t.shadow };

  return (
    <PageContainer mode={isDark ? "dark" : "light"} pageBg={t.pageBg} textColor={t.text}>
      <style>{pageStyles()}</style>

      {/* ═══ HERO ═══ */}
      <Hero borderHero={t.borderHero}>
        <div>
          <button
            onClick={goBack}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 10, fontSize: 12, fontWeight: 600, color: t.textMuted, fontFamily: FONT_FAMILY }}
          >
            <ArrowLeft size={14} /> Back to My Batches
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT_PURPLE.base }} />
            <span style={{ fontSize: FONT_SIZE.eyebrow, fontWeight: FONT_WEIGHT.bold, letterSpacing: LETTER_SPACING.eyebrowWide, textTransform: "uppercase", color: t.textSub, fontFamily: FONT_FAMILY }}>
              Classroom
            </span>
          </div>
          <h1 style={{ fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT.heroTitle, fontSize: FONT_SIZE.heroTitle, color: t.text, margin: "0 0 6px", lineHeight: LINE_HEIGHT.heroTitle, letterSpacing: LETTER_SPACING.heroTitle }}>
  Classroom Students
</h1>
          <p style={{ fontSize: FONT_SIZE.bodySmall, color: t.textSub, margin: 0, fontWeight: FONT_WEIGHT.medium, fontFamily: FONT_FAMILY }}>
            Batch ID: {batchId}
          </p>
        </div>

        <div className="hero-badges">
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: t.actBg, border: `1px solid ${t.actBorder}`, borderRadius: RADIUS.button, padding: "8px 14px", fontSize: 12, fontWeight: 700, fontFamily: FONT_FAMILY, color: t.text }}>
            <Users size={14} color={t.textSub} />
            {students.length} Student{students.length !== 1 ? "s" : ""}
          </div>
        </div>
      </Hero>

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${ACCENT_PURPLE.base}33`, borderTopColor: ACCENT_PURPLE.base, animation: "tcspin .8s linear infinite" }} />
        </div>
      ) : (
        <div style={{ ...card, overflow: "hidden" }}>
          {/* ═══ PANEL HEADER ═══ */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid ${t.border}`, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: RADIUS.chip, display: "flex", alignItems: "center", justifyContent: "center", background: t.iconBg, border: `1px solid ${t.iconBorder}` }}>
  <Users size={15} color={t.text} />
</div>
              <span style={{ fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT.bold, fontSize: 13, color: t.text }}>Enrolled Students</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.text, background: t.iconBg, border: `1px solid ${t.iconBorder}`, borderRadius: RADIUS.chip, padding: "2px 9px" }}>
  {students.length}
</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", borderRadius: RADIUS.button, border: `1px solid ${t.border}`, background: t.actBg }}>
                <Search size={13} color={t.textMuted} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student..."
                  style={{ background: "transparent", border: "none", outline: "none", fontFamily: FONT_FAMILY, fontSize: 12, color: t.text, width: 140 }}
                />
              </div>
              <button
                onClick={() => setIsOpen((p) => !p)}
                style={{ width: 32, height: 32, borderRadius: RADIUS.chip, border: `1px solid ${t.border}`, background: t.actBg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.textMuted }}
              >
                <ChevronDown size={15} style={{ transform: isOpen ? "rotate(0)" : "rotate(-90deg)", transition: "transform .3s" }} />
              </button>
            </div>
          </div>

          {/* ═══ BODY ═══ */}
          {isOpen && (
            <div style={{ padding: 16 }}>
              {students.length === 0 ? (
                <EmptyBlock t={t} icon={Users} title="No students yet" sub="Students assigned to this batch will appear here." />
              ) : filtered.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center", fontSize: 13, color: t.textMuted, fontFamily: FONT_FAMILY }}>
                  No students match "{search}"
                </div>
              ) : (
                <>
                  <div className="tc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 }}>
                    {filtered.map((email, i) => {
                      const name = email.split("@")[0];
                      const pal = AVATAR_PALETTES[i % AVATAR_PALETTES.length];
                      return (
                        <div key={email} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: RADIUS.chip, border: `1px solid ${t.border}`, background: t.actBg }}>
                          <div style={{ width: 40, height: 40, borderRadius: RADIUS.chip, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, background: pal.bg, color: pal.text, flexShrink: 0 }}>
                            {initials(email)}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 700, color: t.text, margin: "0 0 3px", textTransform: "capitalize", fontFamily: FONT_FAMILY }}>
                              {name.replace(/[._-]/g, " ")}
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: t.textMuted }}>
                              <Mail size={11} />
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</span>
                            </div>
                          </div>
                          <span style={{ marginLeft: "auto", fontSize: 11, color: t.textMuted, fontWeight: 700, flexShrink: 0, fontFamily: "monospace" }}>
                            #{String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${t.border}`, fontSize: 11, color: t.textMuted, fontWeight: 500, fontFamily: FONT_FAMILY }}>
                    Showing {filtered.length} of {students.length} students
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </PageContainer>
  );
};

export default TrainerClassroomPage;