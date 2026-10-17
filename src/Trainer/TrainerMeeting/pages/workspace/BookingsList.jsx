"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FILTERS = [
  ["upcoming", "Upcoming"],
  ["past", "Past"],
  ["cancelled", "Cancelled"],
  ["all", "All"],
];

const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleString([], {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

function statusBadge(b) {
  if (b.status === "CANCELLED") return { cls: "muted", text: "Cancelled" };
  if (new Date(b.startUtc) <= new Date()) return { cls: "muted", text: "Past" };
  return { cls: "info", text: "Confirmed" };
}

function activityText(a) {
  if (a.type === "CONFIRMED") return `Booked for ${fmt(a.toStartUtc)}`;
  if (a.type === "RESCHEDULED")
    return `Moved from ${fmt(a.fromStartUtc)} to ${fmt(a.toStartUtc)}`;
  if (a.type === "CANCELLED")
    return `Cancelled (was ${fmt(a.fromStartUtc)})${a.note ? ` — "${a.note}"` : ""}`;
  return a.type;
}

export default function BookingsList({ fetchBookings, pages = [] }) {
  const [filter, setFilter] = useState("upcoming");
  const [pageId, setPageId] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchBookings({ filter, pageId: pageId || undefined })
      .then((r) => setRows(r.data || []))
      .catch(() => setError("Could not load bookings"))
      .finally(() => setLoading(false));
  }, [filter, pageId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="section-card">
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            type="button"
            className={filter === k ? "btn-primary btn-sm" : "btn-ghost btn-sm"}
            onClick={() => setFilter(k)}
          >
            {label}
          </button>
        ))}
        {pages.length > 1 && (
          <select
            className="wm-input"
            style={{ maxWidth: 220, marginLeft: "auto" }}
            value={pageId}
            onChange={(e) => setPageId(e.target.value)}
          >
            <option value="">All booking pages</option>
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <div className="empty-state">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="empty-state">
          <p>{error}</p>
        </div>
      ) : rows.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings here</h3>
          <p>Bookings made through your links will show up here.</p>
        </div>
      ) : (
        rows.map((b) => {
          const sb = statusBadge(b);
          const isOpen = open === b.id;
          return (
            <div
              key={b.id}
              style={{ borderBottom: "1px solid var(--border, #e5e7eb)" }}
            >
              <div
                className="list-row"
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(isOpen ? null : b.id)}
              >
                <div className="list-row-main">
                  <div className="title">
                    {b.guestName} · {b.guestEmail}
                  </div>
                  <div className="meta">
                    {fmt(b.startUtc)} · {b.durationMinutes} min · {b.pageTitle}
                  </div>
                </div>
                {b.rescheduleCount > 0 && (
                  <span className="badge muted">
                    Rescheduled {b.rescheduleCount}×
                  </span>
                )}
                <span className={`badge ${sb.cls}`}>{sb.text}</span>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {isOpen && (
                <div
                  style={{
                    padding: "4px 16px 16px",
                    fontSize: 13,
                    lineHeight: 1.6,
                  }}
                >
                  {b.guestEmails?.length > 0 && (
                    <div>
                      <strong>Other guests:</strong> {b.guestEmails.join(", ")}
                    </div>
                  )}
                  {b.notes && (
                    <div>
                      <strong>Notes:</strong> {b.notes}
                    </div>
                  )}
                  <div>
                    <strong>Guest timezone:</strong> {b.guestTimezone}
                  </div>
                  <div>
                    <strong>Mode:</strong>{" "}
                    {b.mode === "ONLINE"
                      ? "Online"
                      : `In person${b.location ? ` — ${b.location}` : ""}`}
                  </div>
                  {b.meetingUrl && b.status !== "CANCELLED" && (
                    <div>
                      <strong>Meeting link:</strong>{" "}
                      <a
                        href={b.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {b.meetingUrl}
                      </a>
                    </div>
                  )}
                  {b.status === "CANCELLED" && b.cancelReason && (
                    <div>
                      <strong>Cancel reason:</strong> {b.cancelReason}
                    </div>
                  )}
                  <div style={{ marginTop: 8 }}>
                    <strong>History</strong>
                  </div>
                  <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
                    {b.activity.map((a, i) => (
                      <li key={i}>
                        {activityText(a)}
                        <span style={{ opacity: 0.6 }}> · {fmt(a.at)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })
      )}
    </section>
  );
}