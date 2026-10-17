"use client";

import React, { useEffect, useState } from "react";
import { Plus, Copy, ExternalLink, Pencil, Trash2, Link2 } from "lucide-react";
import PageHead from "@/components/PageHead";
import { useToast } from "@/components/Toast";
import WorkspaceModal from "@/components/modals/WorkspaceModal";
import {
  Field,
  Row,
  SegmentedToggle,
} from "@/components/modals/FormControls";
import {
  getMyBookingPages,
  getMyBookings,
  createBookingPage,
  updateBookingPage,
  deleteBookingPage,
} from "@/services/bookingService";
import BookingsList from "./BookingsList";

const DURATIONS = [15, 20, 30, 45, 60, 90];
const BUFFERS = [0, 5, 10, 15, 30];
const NOTICE = [
  [0, "No minimum"],
  [60, "1 hour"],
  [240, "4 hours"],
  [1440, "1 day"],
  [2880, "2 days"],
];
const RANGE = [14, 30, 60, 90, 180];

const EMPTY = {
  title: "",
  ownerName: "",
  description: "",
  durationMinutes: 30,
  bufferBeforeMinutes: 0,
  bufferAfterMinutes: 0,
  minNoticeMinutes: 60,
  maxDaysAhead: 60,
  mode: "ONLINE",
  location: "",
  active: true,
};

function BookingPageForm({ page, onClose, onSaved }) {
  const showToast = useToast();
  const [f, setF] = useState(page ? { ...EMPTY, ...page } : EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (patch) => setF((p) => ({ ...p, ...patch }));

  const save = () => {
    if (!f.title.trim()) return setError("Give your booking page a title.");
    if (!f.ownerName.trim())
      return setError("Enter the host name guests will see.");
    if (f.mode === "IN_PERSON" && !f.location.trim())
      return setError("Enter a location.");
    setSaving(true);
    setError("");
    const body = {
      title: f.title.trim(),
      ownerName: f.ownerName.trim(),
      description: f.description,
      durationMinutes: Number(f.durationMinutes),
      bufferBeforeMinutes: Number(f.bufferBeforeMinutes),
      bufferAfterMinutes: Number(f.bufferAfterMinutes),
      minNoticeMinutes: Number(f.minNoticeMinutes),
      maxDaysAhead: Number(f.maxDaysAhead),
      mode: f.mode,
      location: f.location,
      active: f.active,
    };
    (page ? updateBookingPage(page.id, body) : createBookingPage(body))
      .then(() => {
        showToast(page ? "Booking page updated" : "Booking page created");
        onSaved();
      })
      .catch((e) =>
        setError(e?.response?.data?.error || "Could not save booking page"),
      )
      .finally(() => setSaving(false));
  };

  const sel = (key, opts) => (
    <select
      className="wm-input"
      value={f[key]}
      onChange={(e) => set({ [key]: e.target.value })}
    >
      {opts.map((o) =>
        Array.isArray(o) ? (
          <option key={o[0]} value={o[0]}>
            {o[1]}
          </option>
        ) : (
          <option key={o} value={o}>
            {key === "maxDaysAhead" ? `${o} days` : `${o} min`}
          </option>
        ),
      )}
    </select>
  );

  return (
    <WorkspaceModal
      title={page ? "Edit Booking Page" : "New Booking Page"}
      subtitle="Guests pick a time from your weekly availability."
      onClose={onClose}
      width={520}
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={save}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </>
      }
    >
      <Field label="Title" required id="bp-title">
        <input
          id="bp-title"
          className="wm-input"
          placeholder="e.g. 30 min meeting"
          value={f.title}
          onChange={(e) => set({ title: e.target.value })}
        />
      </Field>
      <Field label="Host name (shown to guests)" required id="bp-owner">
        <input
          id="bp-owner"
          className="wm-input"
          value={f.ownerName}
          onChange={(e) => set({ ownerName: e.target.value })}
        />
      </Field>
      <Field label="Description" id="bp-desc">
        <textarea
          id="bp-desc"
          className="wm-textarea"
          rows={3}
          value={f.description || ""}
          onChange={(e) => set({ description: e.target.value })}
        />
      </Field>
      <Row cols={3}>
        <Field label="Duration">{sel("durationMinutes", DURATIONS)}</Field>
        <Field label="Buffer before">
          {sel("bufferBeforeMinutes", BUFFERS)}
        </Field>
        <Field label="Buffer after">{sel("bufferAfterMinutes", BUFFERS)}</Field>
      </Row>
      <Row cols={2}>
        <Field label="Minimum notice">{sel("minNoticeMinutes", NOTICE)}</Field>
        <Field label="Bookable up to">{sel("maxDaysAhead", RANGE)}</Field>
      </Row>
      <Field label="Online / In-person">
        <SegmentedToggle
          options={["Online", "In-person"]}
          value={f.mode === "IN_PERSON" ? "In-person" : "Online"}
          onChange={(v) =>
            set({ mode: v === "In-person" ? "IN_PERSON" : "ONLINE" })
          }
        />
      </Field>
      {f.mode === "IN_PERSON" && (
        <Field label="Location" id="bp-loc">
          <input
            id="bp-loc"
            className="wm-input"
            value={f.location || ""}
            onChange={(e) => set({ location: e.target.value })}
          />
        </Field>
      )}
      <label
        style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}
      >
        <input
          type="checkbox"
          checked={f.active}
          onChange={(e) => set({ active: e.target.checked })}
        />
        Accepting bookings
      </label>
      {error && <p className="wm-error">{error}</p>}
    </WorkspaceModal>
  );
}

export default function BookingPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(undefined); // undefined = closed, null = new, object = edit
  const [tab, setTab] = useState("pages");
  const showToast = useToast();

  const load = () => {
    setLoading(true);
    getMyBookingPages()
      .then((r) => setPages(r.data || []))
      .catch(() => showToast("Could not load booking pages"))
      .finally(() => setLoading(false));
  };
  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const copy = (url) =>
    navigator.clipboard
      ?.writeText(url)
      .then(() => showToast("Booking link copied"));

  const remove = (p) => {
    if (!window.confirm(`Delete "${p.title}"? Its link will stop working.`))
      return;
    deleteBookingPage(p.id)
      .then(() => {
        showToast("Deleted");
        load();
      })
      .catch(() => showToast("Failed to delete"));
  };

  return (
    <div className="ws-content">
      <PageHead
        title="Booking Pages"
        subtitle="Share a link so anyone can book time with you, based on your availability."
        actions={
          <button className="btn-primary" onClick={() => setEditing(null)}>
            <Plus size={15} /> New Booking Page
          </button>
        }
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          type="button"
          className={
            tab === "pages" ? "btn-primary btn-sm" : "btn-ghost btn-sm"
          }
          onClick={() => setTab("pages")}
        >
          My pages
        </button>
        <button
          type="button"
          className={
            tab === "bookings" ? "btn-primary btn-sm" : "btn-ghost btn-sm"
          }
          onClick={() => setTab("bookings")}
        >
          Bookings
        </button>
      </div>

      {tab === "pages" && (
        <section className="section-card">
          {loading ? (
            <div className="empty-state">
              <p>Loading...</p>
            </div>
          ) : pages.length === 0 ? (
            <div className="empty-state">
              <Link2 size={30} />
              <h3>No booking pages yet</h3>
              <p>
                Set your weekly hours in Availability, then create a page and
                share its link.
              </p>
            </div>
          ) : (
            pages.map((p) => (
              <div className="list-row" key={p.id}>
                <div className="list-row-main">
                  <div className="title">{p.title}</div>
                  <div className="meta">
                    {p.durationMinutes} min ·{" "}
                    {p.mode === "ONLINE" ? "Online" : "In person"} ·{" "}
                    {p.publicUrl}
                  </div>
                </div>
                <span className={`badge ${p.active ? "info" : "muted"}`}>
                  {p.active ? "Active" : "Paused"}
                </span>
                <button
                  className="btn-ghost btn-sm"
                  onClick={() => copy(p.publicUrl)}
                >
                  <Copy size={13} /> Copy link
                </button>
                <a
                  className="btn-ghost btn-sm"
                  href={p.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={13} /> Open
                </a>
                <button
                  className="btn-ghost btn-sm"
                  onClick={() => setEditing(p)}
                >
                  <Pencil size={13} />
                </button>
                <button className="btn-ghost btn-sm" onClick={() => remove(p)}>
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </section>
      )}

      {tab === "bookings" && (
        <BookingsList fetchBookings={getMyBookings} pages={pages} />
      )}

      {editing !== undefined && (
        <BookingPageForm
          page={editing}
          onClose={() => setEditing(undefined)}
          onSaved={() => {
            setEditing(undefined);
            load();
          }}
        />
      )}
    </div>
  );
}