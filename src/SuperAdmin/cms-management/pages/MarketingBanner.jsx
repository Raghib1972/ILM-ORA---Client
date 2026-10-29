"use client";

// src/SuperAdmin/pages/cms/MarketingBanner.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  listBanners,
  createBanner,
  updateBanner,
  setBannerStatus,
  deleteBanner,
  uploadLogo,
  resolveAssetUrl,
  isUploadedLogo,
} from "./marketingBannerApi";

// ── API ───────────────────────────────────────────────────────
// Real backend (course-service via API Gateway). See ./marketingBannerApi.js
//   GET    /api/cms/marketing-banner                 -> list
//   POST   /api/cms/marketing-banner                 -> create
//   PUT    /api/cms/marketing-banner/:id             -> update
//   PATCH  /api/cms/marketing-banner/:id/status      body: { enabled }
//   DELETE /api/cms/marketing-banner/:id             -> delete
//   POST   /api/cms/marketing-banner/upload-logo     multipart/form-data (file)

const DEFAULTS = {
  enabled: true,
  logoUrl: "",
  logoAlt: "Texora",
  headline: "Simplify HR, Empower Your Workforce",
  description:
    "All-in-one HR software to manage hiring, payroll, attendance, leave, and boost productivity — all from a single platform.",
  buttonText: "Explore Texora",
  buttonLink: "https://texora.ai",
  openInNewTab: true,
  dismissible: true,
};

// Backend returns an ISO timestamp; the table shows just the date.
const fmtDate = (v) => (v ? String(v).slice(0, 10) : "—");

// ── Shared UI pieces (component ke bahar, taaki typing me focus na jaye) ──
const makeInputStyle = (t) => (hasErr) => ({
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  fontSize: 13,
  color: t.text,
  background: t.input,
  border: `1px solid ${hasErr ? "#f87171" : t.bdr}`,
  borderRadius: 8,
  outline: "none",
  fontFamily: "inherit",
});

const Field = ({ t, label, hint, error, children }) => (
  <div style={{ marginBottom: 18 }}>
    <label
      style={{
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        color: t.text,
        marginBottom: 6,
      }}
    >
      {label}
    </label>
    {children}
    {error ? (
      <p style={{ margin: "5px 0 0", fontSize: 12, color: "#f87171" }}>{error}</p>
    ) : hint ? (
      <p style={{ margin: "5px 0 0", fontSize: 12, color: t.sub }}>{hint}</p>
    ) : null}
  </div>
);

const Switch = ({ t, dark, checked, onChange, label, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    style={{
      flexShrink: 0,
      width: 42,
      height: 24,
      borderRadius: 999,
      border: "none",
      cursor: disabled ? "default" : "pointer",
      padding: 0,
      position: "relative",
      background: checked ? t.accent : dark ? "#334155" : "#cbd5e1",
      transition: "background .15s",
      opacity: disabled ? 0.6 : 1,
    }}
  >
    <span
      style={{
        position: "absolute",
        top: 3,
        left: checked ? 21 : 3,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "#fff",
        transition: "left .15s",
      }}
    />
  </button>
);

const Toggle = ({ t, dark, checked, onChange, label, hint }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: "12px 0",
      borderBottom: `1px solid ${t.bdr}`,
    }}
  >
    <div>
      <div style={{ fontSize: 13, fontWeight: 600, color: t.text }}>{label}</div>
      {hint && <div style={{ fontSize: 12, color: t.sub, marginTop: 2 }}>{hint}</div>}
    </div>
    <Switch t={t} dark={dark} checked={checked} onChange={onChange} label={label} />
  </div>
);

const BannerPreview = ({ b }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "8px 16px",
      background: "#fdf0e6",
      borderRadius: 8,
      overflowX: "auto",
      border: "1px solid #f1dcc8",
    }}
  >
    {b.logoUrl ? (
      <img
        className="texora-banner__logo"
        src={resolveAssetUrl(b.logoUrl)}
        alt={b.logoAlt}
        style={{ flexShrink: 0 }}
      />
    ) : (
      <div
        style={{
          flexShrink: 0,
          height: 28,
          padding: "0 14px",
          display: "flex",
          alignItems: "center",
          background: "#1e3a8a",
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        {b.logoAlt || "Logo"}
      </div>
    )}
    <div style={{ width: 1, height: 22, background: "#d6c7b8", flexShrink: 0 }} />
    <span style={{ fontSize: 13, fontWeight: 500, color: "#1f2937", whiteSpace: "nowrap" }}>
      {b.headline || "Headline"}
    </span>
    <div style={{ width: 1, height: 22, background: "#d6c7b8", flexShrink: 0 }} />
    <span
      style={{
        flex: 1,
        minWidth: 0,
        fontSize: 11,
        color: "#6b7280",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {b.description}
    </span>
    <span
      style={{
        flexShrink: 0,
        padding: "6px 14px",
        borderRadius: 6,
        background: "#f97316",
        color: "#fff",
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {b.buttonText || "Button"} →
    </span>
    {b.dismissible && <span style={{ flexShrink: 0, color: "#374151", fontSize: 16 }}>✕</span>}
  </div>
);

const Modal = ({ t, title, onClose, children, width = 900 }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 600,
      background: "rgba(0,0,0,.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}
  >
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%",
        maxWidth: width,
        maxHeight: "90vh",
        overflowY: "auto",
        background: t.card,
        border: `1px solid ${t.bdr}`,
        borderRadius: 12,
        padding: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: t.text }}>{title}</h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "none",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
            color: t.sub,
          }}
        >
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

// ── Form (Add / Edit) ───────────────────────────────────────
const BannerForm = ({ t, dark, initial, onCancel, onSaved, isEdit }) => {
  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);
  const inputStyle = makeInputStyle(t);

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Real upload: sends multipart/form-data, stores only the returned URL in logoUrl.
  const onLogoPick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((x) => ({ ...x, logoUrl: "Please select an image file." }));
      return;
    }
    if (file.size > 1024 * 1024) {
      setErrors((x) => ({ ...x, logoUrl: "Image must be smaller than 1 MB." }));
      return;
    }
    setUploading(true);
    try {
      const res = await uploadLogo(file);
      set("logoUrl", res.url);
    } catch (err) {
      setErrors((x) => ({ ...x, logoUrl: err.message || "Logo upload failed. Please try again." }));
    } finally {
      setUploading(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.headline.trim()) e.headline = "Headline is required.";
    if (!form.buttonText.trim()) e.buttonText = "Button text is required.";
    const link = form.buttonLink.trim();
    if (!link) e.buttonLink = "Button link is required.";
    else if (!/^(https?:\/\/[^\s]+|\/(?!\/)[^\s]*)$/i.test(link))
      e.buttonLink = "Link must start with http://, https://, or / and contain no spaces.";
    const logo = (form.logoUrl || "").trim();
    if (logo && !isUploadedLogo(logo) && !/^https?:\/\/[^\s]+$/i.test(logo))
      e.logoUrl = "Logo must be an uploaded image or an http(s) image URL.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async () => {
    if (uploading || !validate()) return;
    setSaving(true);
    try {
      const saved = isEdit ? await updateBanner(form.id, form) : await createBanner(form);
      onSaved(saved, isEdit);
    } catch (err) {
      onSaved(null, isEdit, err.message || "Could not save the banner. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: t.text }}>
          {isEdit ? "Edit Banner" : "Add Banner"}
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: t.sub }}>
          Edit the promotional strip shown at the very top of the landing page.
        </p>
      </div>

      <div
        style={{
          background: t.card,
          border: `1px solid ${t.bdr}`,
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 10 }}>
          Live preview
          {!form.enabled && (
            <span style={{ marginLeft: 8, fontWeight: 500, color: "#f59e0b" }}>
              (Inactive — hidden on website)
            </span>
          )}
        </div>
        <BannerPreview b={form} />
      </div>

      <div
        style={{
          background: t.card,
          border: `1px solid ${t.bdr}`,
          borderRadius: 12,
          padding: 20,
        }}
      >
        <Field
          t={t}
          label="Logo image"
          hint="Recommended: transparent PNG or SVG, at least 56 px tall (for example 160 × 56 px), up to 1 MB. The logo is displayed at 28 px tall on desktop and 22 px on mobile, and the width adjusts automatically. Crop tightly, without extra padding."
          error={errors.logoUrl}
        >
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={onLogoPick}
              style={{ display: "none" }}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                padding: "9px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: t.text,
                background: "none",
                border: `1px solid ${t.bdr}`,
                borderRadius: 8,
                cursor: uploading ? "default" : "pointer",
                opacity: uploading ? 0.7 : 1,
              }}
            >
              {uploading ? "Uploading…" : "Upload logo"}
            </button>
            {form.logoUrl && (
              <button
                type="button"
                onClick={() => set("logoUrl", "")}
                disabled={uploading}
                style={{
                  padding: "9px 14px",
                  fontSize: 13,
                  color: "#f87171",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Or paste an image URL (https://…)"
            value={isUploadedLogo(form.logoUrl) ? "" : form.logoUrl}
            onChange={(e) => set("logoUrl", e.target.value)}
            style={{ ...inputStyle(false), marginTop: 10 }}
          />
        </Field>

        <Field t={t} label="Logo alt text" hint="Describes the logo for screen readers.">
          <input
            type="text"
            value={form.logoAlt}
            maxLength={100}
            onChange={(e) => set("logoAlt", e.target.value)}
            style={inputStyle(false)}
          />
        </Field>

        <Field t={t} label="Headline" error={errors.headline}>
          <input
            type="text"
            value={form.headline}
            maxLength={80}
            onChange={(e) => set("headline", e.target.value)}
            style={inputStyle(!!errors.headline)}
          />
        </Field>

        <Field
          t={t}
          label="Description"
          hint={`${form.description.length}/160 characters. This text may be hidden on small screens.`}
        >
          <textarea
            rows={3}
            value={form.description}
            maxLength={160}
            onChange={(e) => set("description", e.target.value)}
            style={{ ...inputStyle(false), resize: "vertical" }}
          />
        </Field>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          <Field t={t} label="Button text" error={errors.buttonText}>
            <input
              type="text"
              value={form.buttonText}
              maxLength={24}
              onChange={(e) => set("buttonText", e.target.value)}
              style={inputStyle(!!errors.buttonText)}
            />
          </Field>
          <Field t={t} label="Button link" error={errors.buttonLink}>
            <input
              type="text"
              placeholder="https://texora.ai"
              value={form.buttonLink}
              maxLength={1000}
              onChange={(e) => set("buttonLink", e.target.value)}
              style={inputStyle(!!errors.buttonLink)}
            />
          </Field>
        </div>

        <div style={{ marginTop: 6 }}>
          <Toggle
            t={t}
            dark={dark}
            label="Active (show banner on website)"
            hint="When turned off, the banner is removed from the landing page."
            checked={form.enabled}
            onChange={(v) => set("enabled", v)}
          />
          <Toggle
            t={t}
            dark={dark}
            label="Open link in new tab"
            checked={form.openInNewTab}
            onChange={(v) => set("openInNewTab", v)}
          />
          <Toggle
            t={t}
            dark={dark}
            label="Allow visitors to close the banner"
            hint="Shows a ✕ close button on the right side of the banner."
            checked={form.dismissible}
            onChange={(v) => set("dismissible", v)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 22 }}>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            style={{
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 600,
              color: t.sub,
              background: "none",
              border: `1px solid ${t.bdr}`,
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving || uploading}
            style={{
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: t.accent,
              border: "none",
              borderRadius: 8,
              cursor: saving || uploading ? "default" : "pointer",
              opacity: saving || uploading ? 0.7 : 1,
            }}
          >
            {saving ? "Saving…" : isEdit ? "Update banner" : "Create banner"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main page: List + Form switch ───────────────────────────
const MarketingBanner = () => {
  const { dark } = useTheme();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [view, setView] = useState("list"); // "list" | "form"
  const [editing, setEditing] = useState(null); // banner object or null (add)
  const [viewing, setViewing] = useState(null); // banner for View modal
  const [deleting, setDeleting] = useState(null); // banner for delete confirm
  const [busyId, setBusyId] = useState(null);
  const [toast, setToast] = useState(null);

  const t = {
    page: dark ? "#0d0d14" : "#f8fafc",
    card: dark ? "#13131f" : "#ffffff",
    bdr: dark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.10)",
    text: dark ? "#ffffff" : "#111111",
    sub: dark ? "#94a3b8" : "#64748b",
    input: dark ? "rgba(255,255,255,.04)" : "#ffffff",
    accent: "#7c3aed",
  };

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Load list ───────────────────────────────────────────────
  const loadBanners = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await listBanners();
      setBanners(Array.isArray(data) ? data : []);
    } catch (err) {
      setLoadError(err.message || "Could not load banners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Actions ─────────────────────────────────────────────────
  const openAdd = () => {
    setEditing(null);
    setView("form");
  };
  const openEdit = (b) => {
    setEditing(b);
    setView("form");
  };

  const onSaved = (saved, isEdit, errMsg) => {
    if (!saved) {
      showToast("err", errMsg);
      return;
    }
    setBanners((list) =>
      isEdit ? list.map((x) => (x.id === saved.id ? saved : x)) : [saved, ...list]
    );
    showToast("ok", isEdit ? "Banner updated." : "Banner created.");
    setView("list");
    setEditing(null);
  };

  const toggleStatus = async (b) => {
    const next = !b.enabled;
    setBusyId(b.id);
    try {
      const updated = await setBannerStatus(b.id, next);
      setBanners((list) => list.map((x) => (x.id === b.id ? { ...x, ...updated } : x)));
      showToast("ok", next ? "Banner activated." : "Banner deactivated.");
    } catch (err) {
      showToast("err", err.message || "Could not change the status.");
    } finally {
      setBusyId(null);
    }
  };

  const confirmDelete = async () => {
    const b = deleting;
    setBusyId(b.id);
    try {
      await deleteBanner(b.id);
      setBanners((list) => list.filter((x) => x.id !== b.id));
      showToast("ok", "Banner deleted.");
      setDeleting(null);
    } catch (err) {
      showToast("err", err.message || "Could not delete the banner.");
    } finally {
      setBusyId(null);
    }
  };

  const th = {
    textAlign: "left",
    padding: "12px 14px",
    fontSize: 12,
    fontWeight: 600,
    color: t.sub,
    textTransform: "uppercase",
    letterSpacing: ".04em",
    borderBottom: `1px solid ${t.bdr}`,
    whiteSpace: "nowrap",
  };
  const td = {
    padding: "12px 14px",
    fontSize: 13,
    color: t.text,
    borderBottom: `1px solid ${t.bdr}`,
    verticalAlign: "middle",
  };
  const actBtn = (color) => ({
    padding: "6px 10px",
    fontSize: 12,
    fontWeight: 600,
    color,
    background: "none",
    border: `1px solid ${t.bdr}`,
    borderRadius: 6,
    cursor: "pointer",
  });

  if (loading) {
    return <div style={{ padding: 32, color: t.sub, fontSize: 14 }}>Loading banners…</div>;
  }

  if (loadError) {
    return (
      <div style={{ padding: 32 }}>
        <p style={{ margin: "0 0 12px", color: "#f87171", fontSize: 14 }}>{loadError}</p>
        <button type="button" style={actBtn(t.accent)} onClick={loadBanners}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "transparent", padding: "24px 0 48px" }}>
      <div style={{ width: "100%" }}>
        {view === "form" ? (
          <BannerForm
            key={editing ? editing.id : "new"}
            t={t}
            dark={dark}
            isEdit={!!editing}
            initial={
              editing
                ? { ...DEFAULTS, ...editing, logoUrl: editing.logoUrl || "", logoAlt: editing.logoAlt || "", description: editing.description || "" }
                : { ...DEFAULTS, enabled: false }
            }
            onCancel={() => {
              setView("list");
              setEditing(null);
            }}
            onSaved={onSaved}
          />
        ) : (
          <>
            {/* Title + Add button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              <div>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: t.text }}>
                  Marketing Banners
                </h1>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: t.sub }}>
                  Manage the promotional strips for the landing page. You can keep multiple
                  banners active at the same time.
                </p>
              </div>
              <button
                type="button"
                onClick={openAdd}
                style={{
                  padding: "10px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  background: t.accent,
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                + Add banner
              </button>
            </div>

            {/* Table */}
            <div
              style={{
                background: t.card,
                border: `1px solid ${t.bdr}`,
                borderRadius: 12,
                overflowX: "auto",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
                <thead>
                  <tr>
                    <th style={th}>#</th>
                    <th style={th}>Logo</th>
                    <th style={th}>Headline</th>
                    <th style={th}>Button</th>
                    <th style={th}>Status</th>
                    <th style={th}>Updated</th>
                    <th style={{ ...th, textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        style={{ ...td, textAlign: "center", color: t.sub, padding: 32 }}
                      >
                        No banners yet. Click “Add banner” to create one.
                      </td>
                    </tr>
                  ) : (
                    banners.map((b, i) => (
                      <tr key={b.id}>
                        <td style={{ ...td, color: t.sub }}>{i + 1}</td>
                        <td style={td}>
                          {b.logoUrl ? (
                            <img
                              src={resolveAssetUrl(b.logoUrl)}
                              alt={b.logoAlt}
                              style={{ height: 24, width: "auto", objectFit: "contain" }}
                            />
                          ) : (
                            <span
                              style={{
                                display: "inline-block",
                                padding: "4px 10px",
                                background: "#1e3a8a",
                                color: "#fff",
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {b.logoAlt || "Logo"}
                            </span>
                          )}
                        </td>
                        <td style={{ ...td, maxWidth: 320 }}>
                          <div style={{ fontWeight: 600 }}>{b.headline}</div>
                          <div
                            style={{
                              fontSize: 12,
                              color: t.sub,
                              marginTop: 2,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              maxWidth: 320,
                            }}
                          >
                            {b.description}
                          </div>
                        </td>
                        <td style={td}>
                          <div>{b.buttonText}</div>
                          <div style={{ fontSize: 12, color: t.sub }}>{b.buttonLink}</div>
                        </td>
                        <td style={td}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Switch
                              t={t}
                              dark={dark}
                              checked={b.enabled}
                              disabled={busyId === b.id}
                              label={`Toggle ${b.headline}`}
                              onChange={() => toggleStatus(b)}
                            />
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: b.enabled ? "#16a34a" : t.sub,
                              }}
                            >
                              {b.enabled ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </td>
                        <td style={{ ...td, color: t.sub, whiteSpace: "nowrap" }}>
                          {fmtDate(b.updatedAt)}
                        </td>
                        <td style={{ ...td, textAlign: "right", whiteSpace: "nowrap" }}>
                          <div style={{ display: "inline-flex", gap: 6 }}>
                            <button type="button" style={actBtn(t.text)} onClick={() => setViewing(b)}>
                              View
                            </button>
                            <button type="button" style={actBtn(t.accent)} onClick={() => openEdit(b)}>
                              Edit
                            </button>
                            <button
                              type="button"
                              style={actBtn("#f87171")}
                              onClick={() => setDeleting(b)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* View modal */}
      {viewing && (
        <Modal t={t} title="Banner details" onClose={() => setViewing(null)}>
          <div style={{ marginBottom: 16 }}>
            <BannerPreview b={{ ...viewing, enabled: true }} />
          </div>
          {[
            ["Status", viewing.enabled ? "Active" : "Inactive"],
            ["Headline", viewing.headline],
            ["Description", viewing.description],
            ["Button text", viewing.buttonText],
            ["Button link", viewing.buttonLink],
            ["Logo alt text", viewing.logoAlt],
            ["Open in new tab", viewing.openInNewTab ? "Yes" : "No"],
            ["Visitors can close", viewing.dismissible ? "Yes" : "No"],
            ["Last updated", fmtDate(viewing.updatedAt)],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                gap: 12,
                padding: "8px 0",
                borderBottom: `1px solid ${t.bdr}`,
                fontSize: 13,
              }}
            >
              <div style={{ width: 140, flexShrink: 0, color: t.sub, fontWeight: 600 }}>{k}</div>
              <div style={{ color: t.text, wordBreak: "break-word" }}>{v}</div>
            </div>
          ))}
        </Modal>
      )}

      {/* Delete confirm modal */}
      {deleting && (
        <Modal t={t} title="Delete banner?" onClose={() => setDeleting(null)} width={420}>
          <p style={{ margin: "0 0 18px", fontSize: 13, color: t.sub }}>
            “{deleting.headline}” will be permanently removed. This cannot be undone.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              type="button"
              onClick={() => setDeleting(null)}
              style={{
                padding: "9px 14px",
                fontSize: 13,
                fontWeight: 600,
                color: t.sub,
                background: "none",
                border: `1px solid ${t.bdr}`,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={busyId === deleting.id}
              style={{
                padding: "9px 16px",
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                background: "#dc2626",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                opacity: busyId === deleting.id ? 0.7 : 1,
              }}
            >
              {busyId === deleting.id ? "Deleting…" : "Delete"}
            </button>
          </div>
        </Modal>
      )}

      <style>{`
        .texora-banner__logo {
          height: 28px;
          width: auto;
          object-fit: contain;
        }
        @media (max-width: 640px) {
          .texora-banner__logo {
            height: 22px;
          }
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 700,
            padding: "11px 16px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 500,
            color: "#fff",
            background: toast.type === "ok" ? "#16a34a" : "#dc2626",
            boxShadow: "0 8px 24px rgba(0,0,0,.25)",
          }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default MarketingBanner;
