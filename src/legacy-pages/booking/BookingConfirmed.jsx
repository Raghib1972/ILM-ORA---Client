"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Calendar,
  Globe,
  User,
  Video,
  MapPin,
  Loader2,
} from "lucide-react";
import { getBooking, cancelBooking } from "@/services/bookingService";
import { BOOKING_CSS } from "./bookingStyles";

export default function BookingConfirmed() {
  const { token } = useParams();
  const router = useRouter();
  const [b, setB] = useState(null);
  const [error, setError] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [browserTz, setBrowserTz] = useState("");

  // Read browser timezone in an effect to avoid hydration mismatch.
  useEffect(() => {
    setBrowserTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const load = () =>
    getBooking(token)
      .then((r) => setB(r.data))
      .catch(() => setError("We couldn't find this booking."));
  useEffect(() => {
    load();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const doCancel = () => {
    setBusy(true);
    cancelBooking(token, reason)
      .then((r) => {
        setB(r.data);
        setCancelling(false);
      })
      .catch((e) => setError(e?.response?.data?.error || "Could not cancel."))
      .finally(() => setBusy(false));
  };

  const wrap = (children) => (
    <div className="bk-root">
      <style>{BOOKING_CSS}</style>
      <div className="bk-card" style={{ minHeight: 0 }}>
        <div className="bk-main bk-center">{children}</div>
      </div>
    </div>
  );

  if (error && !b)
    return wrap(
      <>
        <h2>Booking not found</h2>
        <p>{error}</p>
      </>,
    );
  if (!b || !browserTz) return wrap(<Loader2 className="bk-spin" size={32} />);

  const tz = b.guestTimezone || browserTz;
  const s = new Date(b.startUtc),
    e = new Date(b.endUtc);
  const t = (d) =>
    d
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: tz,
      })
      .replace(/\s/g, "")
      .toLowerCase();
  const dateStr = s.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: tz,
  });
  const cancelled = b.status === "CANCELLED";
  const past = e < new Date();

  return wrap(
    <>
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          fontSize: 26,
        }}
      >
        {cancelled ? (
          <XCircle color="#dc2626" />
        ) : (
          <CheckCircle2 color="#16a34a" />
        )}
        {cancelled ? "This meeting was cancelled" : "You are scheduled!"}
      </h1>
      {!cancelled && (
        <p style={{ color: "#6b7280" }}>
          A confirmation email has been sent to {b.guestEmail}.
        </p>
      )}

      <div className="bk-box">
        <h3 style={{ margin: 0, fontSize: 20 }}>{b.title}</h3>
        <div className="bk-meta">
          <User size={18} /> {b.hostName}
        </div>
        <div className="bk-meta">
          <Calendar size={18} /> {t(s)} – {t(e)}, {dateStr}
        </div>
        <div className="bk-meta">
          <Globe size={18} /> {tz}
        </div>
        {b.mode === "ONLINE" && b.meetingUrl && !cancelled && (
          <div className="bk-meta">
            <Video size={18} />{" "}
            <a
              href={b.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#006bff" }}
            >
              Join meeting
            </a>
          </div>
        )}
        {b.mode === "IN_PERSON" && b.location && (
          <div className="bk-meta">
            <MapPin size={18} /> {b.location}
          </div>
        )}
        {b.guestEmails?.length > 0 && (
          <div className="bk-meta" style={{ fontSize: 13 }}>
            Guests: {b.guestEmails.join(", ")}
          </div>
        )}
      </div>

      {!cancelled && !past && !cancelling && (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            className="bk-ghost"
            onClick={() => router.push(`/book/${b.pageSlug}?reschedule=${token}`)}
          >
            Reschedule
          </button>
          <button className="bk-danger" onClick={() => setCancelling(true)}>
            Cancel
          </button>
        </div>
      )}
      {cancelling && (
        <div className="bk-form" style={{ margin: "0 auto" }}>
          <label htmlFor="bk-reason">Reason for cancelling (optional)</label>
          <textarea
            id="bk-reason"
            rows={3}
            value={reason}
            onChange={(ev) => setReason(ev.target.value)}
          />
          {error && <p className="bk-err">{error}</p>}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <button className="bk-ghost" onClick={() => setCancelling(false)}>
              Keep meeting
            </button>
            <button className="bk-danger" onClick={doCancel} disabled={busy}>
              {busy ? "Cancelling..." : "Confirm cancel"}
            </button>
          </div>
        </div>
      )}
    </>,
  );
}