"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Video,
  MapPin,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import {
  getPublicPage,
  getPublicDates,
  getPublicSlots,
  createBooking,
  getBooking,
  rescheduleBooking,
} from "@/services/bookingService";
import { BOOKING_CSS } from "./bookingStyles";

const pad = (n) => String(n).padStart(2, "0");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const fmtTime = (iso, tz) =>
  new Date(iso)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: tz,
    })
    .replace(/\s/g, "")
    .toLowerCase();

export default function BookingPublicPage() {
  const { slug } = useParams();
  const sp = useSearchParams();
  const resToken = sp.get("reschedule");
  const router = useRouter();

  // Guest timezone is read in an effect (not during render) to avoid hydration mismatch.
  const [zones, setZones] = useState([]);
  const [tz, setTz] = useState("");
  const [page, setPage] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [existing, setExisting] = useState(null); // booking being rescheduled

  const [today] = useState(() => new Date());
  const [cursor, setCursor] = useState(() => ({
    y: new Date().getFullYear(),
    m: new Date().getMonth(),
  }));
  const [dates, setDates] = useState(new Set());
  const [selDate, setSelDate] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selSlot, setSelSlot] = useState(null);
  const [step, setStep] = useState("pick");

  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const [guests, setGuests] = useState([]);
  const [guestInput, setGuestInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    const z =
      typeof Intl.supportedValuesOf === "function"
        ? Intl.supportedValuesOf("timeZone")
        : [];
    setZones(z.includes(browserTz) ? z : [browserTz, ...z]);
    setTz(browserTz);
  }, []);

  const todayStr = tz
    ? new Date().toLocaleDateString("en-CA", { timeZone: tz })
    : "";

  useEffect(() => {
    getPublicPage(slug)
      .then((r) => setPage(r.data))
      .catch(() =>
        setLoadError(
          "This booking page doesn't exist or is no longer available.",
        ),
      );
  }, [slug]);

  useEffect(() => {
    if (!resToken) return;
    getBooking(resToken)
      .then((r) => setExisting(r.data))
      .catch(() => setLoadError("This booking link is invalid."));
  }, [resToken]);

  useEffect(() => {
    if (!page || !tz) return;
    getPublicDates(slug, `${cursor.y}-${pad(cursor.m + 1)}`, tz)
      .then((r) => setDates(new Set(r.data.dates || [])))
      .catch(() => setDates(new Set()));
  }, [page, slug, cursor, tz]);

  useEffect(() => {
    setSelSlot(null);
    if (!selDate || !tz) return;
    setSlotsLoading(true);
    getPublicSlots(slug, selDate, tz)
      .then((r) => setSlots(r.data.slots || []))
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [slug, selDate, tz]);

  const first = new Date(cursor.y, cursor.m, 1);
  const lead = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(cursor.y, cursor.m + 1, 0).getDate();
  const isCurrentMonth =
    cursor.y === today.getFullYear() && cursor.m === today.getMonth();
  const maxDate = page
    ? new Date(Date.now() + page.maxDaysAhead * 86400000)
    : today;
  const nextDisabled = new Date(cursor.y, cursor.m + 1, 1) > maxDate;
  const moveMonth = (d) =>
    setCursor((c) => {
      const n = new Date(c.y, c.m + d, 1);
      return { y: n.getFullYear(), m: n.getMonth() };
    });

  const addGuest = () => {
    const v = guestInput.trim().replace(/,$/, "").toLowerCase();
    if (!v) return;
    if (!EMAIL.test(v)) return setError("Enter a valid guest email.");
    if (guests.length >= 10) return setError("You can add up to 10 guests.");
    if (!guests.includes(v)) setGuests([...guests, v]);
    setGuestInput("");
    setError("");
  };

  const apiError = (e, fallback) => e?.response?.data?.error || fallback;

  const confirmReschedule = () => {
    setSubmitting(true);
    setError("");
    rescheduleBooking(resToken, { startUtc: selSlot, timezone: tz })
      .then((r) => router.push(`/book/confirmed/${r.data.token}`))
      .catch((e) => {
        setError(apiError(e, "Could not reschedule."));
        setSubmitting(false);
      });
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!EMAIL.test(form.email.trim()))
      return setError("Please enter a valid email.");
    if (guestInput.trim()) addGuest();
    setSubmitting(true);
    setError("");
    createBooking(slug, {
      startUtc: selSlot,
      timezone: tz,
      name: form.name.trim(),
      email: form.email.trim(),
      guestEmails: guests,
      notes: form.notes,
    })
      .then((r) => router.push(`/book/confirmed/${r.data.token}`))
      .catch((e) => {
        setError(apiError(e, "Could not book this time."));
        setSubmitting(false);
        if (e?.response?.status === 409) {
          setStep("pick");
          setSelSlot(null);
          setSelDate((d) => d);
        }
      });
  };

  const onNext = () => (resToken ? confirmReschedule() : setStep("form"));

  if (loadError)
    return (
      <div className="bk-root">
        <style>{BOOKING_CSS}</style>
        <div className="bk-card">
          <div className="bk-main bk-center" style={{ alignSelf: "center" }}>
            <h2>Link unavailable</h2>
            <p>{loadError}</p>
          </div>
        </div>
      </div>
    );
  if (!page || !tz)
    return (
      <div className="bk-root">
        <style>{BOOKING_CSS}</style>
        <Loader2 className="bk-spin" size={32} />
      </div>
    );

  const longDate = selDate
    ? new Date(`${selDate}T12:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="bk-root">
      <style>{BOOKING_CSS}</style>
      <div className="bk-card">
        <aside className="bk-side">
          {step === "form" && (
            <button
              className="bk-back"
              onClick={() => {
                setStep("pick");
                setError("");
              }}
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="bk-host">{page.hostName}</div>
          <h1 className="bk-title">{page.title}</h1>
          <div className="bk-meta">
            <Clock size={18} /> {page.durationMinutes} min
          </div>
          <div className="bk-meta">
            {page.mode === "ONLINE" ? (
              <Video size={18} />
            ) : (
              <MapPin size={18} />
            )}
            {page.mode === "ONLINE"
              ? "Online meeting (link sent by email)"
              : page.location}
          </div>
          {step === "form" && selSlot && (
            <div className="bk-meta" style={{ alignItems: "flex-start" }}>
              <Globe size={18} />
              <span>
                {fmtTime(selSlot, tz)}, {longDate}
                <br />
                <small>{tz}</small>
              </span>
            </div>
          )}
          {page.description && <p className="bk-desc">{page.description}</p>}
        </aside>

        <main className="bk-main">
          {step === "pick" && (
            <>
              <h2 className="bk-h2">
                {resToken
                  ? `Reschedule${existing ? ` — ${existing.title}` : ""}`
                  : "Select a Date & Time"}
              </h2>
              <div className="bk-cols">
                <div className="bk-cal">
                  <div className="bk-cal-head">
                    <button
                      className="bk-nav"
                      onClick={() => moveMonth(-1)}
                      disabled={isCurrentMonth}
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <span>
                      {MONTHS[cursor.m]} {cursor.y}
                    </span>
                    <button
                      className="bk-nav"
                      onClick={() => moveMonth(1)}
                      disabled={nextDisabled}
                      aria-label="Next month"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="bk-grid">
                    {DOW.map((d) => (
                      <div className="bk-dow" key={d}>
                        {d}
                      </div>
                    ))}
                    {Array.from({ length: lead }).map((_, i) => (
                      <div key={`e${i}`} />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const str = `${cursor.y}-${pad(cursor.m + 1)}-${pad(day)}`;
                      const avail = dates.has(str);
                      return (
                        <button
                          key={str}
                          disabled={!avail}
                          className={`bk-day ${avail ? "avail" : ""} ${selDate === str ? "sel" : ""} ${str === todayStr ? "today" : ""}`}
                          onClick={() => setSelDate(str)}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  <div className="bk-tz">
                    <label htmlFor="bk-tz">
                      <Globe size={13} /> Time zone
                    </label>
                    <select
                      id="bk-tz"
                      value={tz}
                      onChange={(e) => setTz(e.target.value)}
                    >
                      {zones.map((z) => (
                        <option key={z} value={z}>
                          {z}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selDate && (
                  <div className="bk-slots">
                    <h3>{longDate}</h3>
                    {slotsLoading ? (
                      <Loader2 className="bk-spin" size={22} />
                    ) : slots.length === 0 ? (
                      <p style={{ color: "#6b7280" }}>No times available.</p>
                    ) : (
                      slots.map((s) => (
                        <div className="bk-slot-row" key={s}>
                          <button
                            className={`bk-slot ${selSlot === s ? "sel" : ""}`}
                            onClick={() => setSelSlot(s)}
                          >
                            {fmtTime(s, tz)}
                          </button>
                          {selSlot === s && (
                            <button
                              className="bk-next"
                              onClick={onNext}
                              disabled={submitting}
                            >
                              {resToken
                                ? submitting
                                  ? "..."
                                  : "Confirm"
                                : "Next"}
                            </button>
                          )}
                        </div>
                      ))
                    )}
                    {error && <p className="bk-err">{error}</p>}
                  </div>
                )}
              </div>
            </>
          )}

          {step === "form" && (
            <form className="bk-form" onSubmit={submit}>
              <h2 className="bk-h2">Enter Details</h2>
              <label htmlFor="bk-name">Name *</label>
              <input
                id="bk-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <label htmlFor="bk-email">Email *</label>
              <input
                id="bk-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label htmlFor="bk-guest">Add guests (optional)</label>
              <div>
                {guests.map((g) => (
                  <span className="bk-chip" key={g}>
                    {g}
                    <button
                      type="button"
                      onClick={() => setGuests(guests.filter((x) => x !== g))}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                id="bk-guest"
                placeholder="guest@email.com — press Enter to add"
                value={guestInput}
                onChange={(e) => setGuestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addGuest();
                  }
                }}
                onBlur={addGuest}
              />
              <label htmlFor="bk-notes">
                Please share anything that will help prepare for our meeting.
              </label>
              <textarea
                id="bk-notes"
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
              {error && <p className="bk-err">{error}</p>}
              <button
                className="bk-primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Scheduling..." : "Schedule Event"}
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}