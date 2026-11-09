"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  useBreakpoint,
  useIsTouch,
  useCanHover,
  ResponsiveGrid,
  ResponsiveTable,
  ResponsiveModal,
  ScrollTabs,
  Z,
} from "@/design-system";
import ChartFrame from "@/design-system/components/responsive/ChartFrame";

const rows = [
  { id: 1, name: "Aarav Sharma", batch: "Full-Stack 2026-A", score: 92, status: "Active" },
  { id: 2, name: "Fatima Khan", batch: "Data Science B3", score: 88, status: "Active" },
  { id: 3, name: "Rohan Verma", batch: "UI/UX Weekend", score: 74, status: "Paused" },
  { id: 4, name: "Sneha Iyer", batch: "Full-Stack 2026-A", score: 95, status: "Active" },
];
const chart = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => ({ d, v: [12, 19, 14, 25, 22, 30, 28][i] }));
const tabs = ["Overview", "Students", "Assignments", "Attendance", "Live classes", "Reports", "Certificates", "Settings"].map((l) => ({
  id: l.toLowerCase().replace(/\s/g, "-"),
  label: l,
}));

const card = { padding: 16, borderRadius: 14, border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" };
const h2 = { fontSize: "var(--fs-h2)", fontWeight: 700, margin: "28px 0 12px" };

export default function LabClient() {
  const { bp, isMobile, isTablet, isDesktop } = useBreakpoint();
  const touch = useIsTouch();
  const canHover = useCanHover();
  const [tab, setTab] = useState("overview");
  const [open, setOpen] = useState(false);

  return (
    <div className="rs-page">
      <div className="rs-header">
        <div>
          <h1 style={{ fontSize: "var(--fs-h1)", fontWeight: 800, margin: 0 }}>Responsive Lab</h1>
          <p style={{ opacity: 0.7, fontSize: "var(--fs-body)", margin: "4px 0 0" }}>Resize the window / use devtools device mode.</p>
        </div>
        <div className="rs-header-actions">
          <button className="rs-touch" style={{ ...card, padding: "8px 14px", cursor: "pointer" }} onClick={() => setOpen(true)}>
            Open modal
          </button>
        </div>
      </div>

      <h2 style={h2}>1 · Live readout (JS hooks)</h2>
      <div className="rs-grid" style={{ "--rs-min": "150px" }}>
        <div style={card}><b>bp</b><div style={{ fontSize: 22 }}>{bp}</div></div>
        <div style={card}><b>device class</b><div style={{ fontSize: 22 }}>{isMobile ? "mobile" : isTablet ? "tablet" : "desktop"}{isDesktop ? "" : ""}</div></div>
        <div style={card}><b>touch</b><div style={{ fontSize: 22 }}>{String(touch)}</div></div>
        <div style={card}><b>can hover</b><div style={{ fontSize: 22 }}>{String(canHover)}</div></div>
      </div>

      <h2 style={h2}>2 · ResponsiveGrid (auto-fit, no breakpoints)</h2>
      <ResponsiveGrid min={200}>
        {["Students", "Batches", "Live now", "Assignments", "Attendance", "Certificates"].map((t, i) => (
          <div key={t} style={card}>
            <div style={{ opacity: 0.6, fontSize: "var(--fs-small)" }}>{t}</div>
            <div style={{ fontSize: "var(--fs-h1)", fontWeight: 800 }}>{(i + 1) * 137}</div>
          </div>
        ))}
      </ResponsiveGrid>

      <h2 style={h2}>3 · ScrollTabs</h2>
      <ScrollTabs ariaLabel="Demo tabs" tabs={tabs} value={tab} onChange={setTab} />
      <p style={{ opacity: 0.7 }}>Selected: {tab}</p>

      <h2 style={h2}>4 · ResponsiveTable (cards below 768px)</h2>
      <ResponsiveTable
        columns={[
          { key: "name", label: "Student", primary: true },
          { key: "batch", label: "Batch" },
          { key: "score", label: "Score", numeric: true },
          { key: "status", label: "Status" },
          { key: "a", label: "", render: () => <button className="rs-touch" style={{ ...card, padding: "4px 10px" }}>View</button> },
        ]}
        rows={rows}
        onRowClick={() => {}}
      />

      <h2 style={h2}>5 · ChartFrame (220px phone / 320px others)</h2>
      <div style={card}>
        <ChartFrame>
          {({ compact }) => (
            <LineChart data={chart} margin={{ top: 8, right: 8, bottom: 0, left: compact ? -24 : 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="d" tick={{ fontSize: compact ? 10 : 12 }} />
              <YAxis tick={{ fontSize: compact ? 10 : 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="v" strokeWidth={2} dot={!compact} />
            </LineChart>
          )}
        </ChartFrame>
      </div>

      <h2 style={h2}>6 · Visibility helpers</h2>
      <div className="rs-row">
        <span className="rs-hide-ge-md" style={card}>only below 768</span>
        <span className="rs-hide-lt-md rs-hide-ge-lg" style={card}>768–1023</span>
        <span className="rs-hide-lt-lg" style={card}>1024 and up</span>
      </div>

      <h2 style={h2}>7 · Snap rail (swipe on phones)</h2>
      <div className="rs-snap-x">
        {["To do", "In progress", "Review", "Done"].map((c) => (
          <div key={c} style={{ ...card, minHeight: 120 }}><b>{c}</b></div>
        ))}
      </div>

      <h2 style={h2}>8 · Fluid type</h2>
      <p style={{ fontSize: "var(--fs-h1)", fontWeight: 800, margin: 0 }}>H1 fluid 20→30px</p>
      <p style={{ fontSize: "var(--fs-body)" }} className="rs-clamp-2">
        Body text scales gently. This paragraph is clamped to two lines using rs-clamp-2, so a very long sentence never blows up a card on a small phone. Keep adding words here
        to prove the clamp works across every device size we test against.
      </p>

      <h2 style={h2}>9 · z-index scale</h2>
      <div className="rs-row">{Object.entries(Z).map(([k, v]) => <span key={k} style={{ ...card, padding: "6px 10px" }}>{k}: {v}</span>)}</div>

      <ResponsiveModal
        open={open}
        onClose={() => setOpen(false)}
        title="Create batch"
        footer={<><button className="rs-touch" style={{ ...card, padding: "8px 16px" }} onClick={() => setOpen(false)}>Cancel</button><button className="rs-touch" style={{ padding: "8px 16px", borderRadius: 14, background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }} onClick={() => setOpen(false)}>Save</button></>}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <label key={i} style={{ display: "block", marginBottom: 12 }}>
            <span style={{ fontSize: "var(--fs-small)", opacity: 0.7 }}>Field {i + 1}</span>
            <input style={{ display: "block", width: "100%", padding: "10px 12px", fontSize: 16, borderRadius: 10, border: "1px solid hsl(var(--input))", background: "transparent" }} />
          </label>
        ))}
      </ResponsiveModal>
    </div>
  );
}
