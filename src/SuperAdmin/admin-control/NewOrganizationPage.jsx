"use client";

// pages/NewOrganizationPage.jsx
// SuperAdmin -> Create a new organization (+ its admin, who gets a set-password email)
// Route: /superadmin/organizations/new
//
// NOTE: this file is intentionally ASCII-only (no emoji / special symbols).
// Icons are inline SVG so they can never turn into garbled text.

import React, { useState } from "react";
import { useNavigate } from "@/lib/routerCompat";
import { useTheme } from "../context/ThemeContext";
import BreadcrumbNavigation from "../components/layout/navigation/BreadcrumbNavigation";
// IMPORTANT: use the SAME import path that OrganizationPage.jsx uses for authService
// (there it is "../../services/authService"). Adjust the ../ count if needed.
import authService from "../../services/authService";

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
// Plan names MUST match com.lms.auth.constants.PlanLimits in auth-service.
// Other microservices read the same names from Kafka events.
const PLANS = ["trial", "starter", "growth"];
// Plan is not status. "trial" is a plan, so status is only active / inactive.
const STATUSES = ["active", "inactive"];

// Default limits per plan - mirror of PlanLimits.java. Used only to pre-fill
// the form; if the admin does not change them we send null and auth-service
// applies its own defaults (so the backend stays the source of truth).
const PLAN_LIMITS = {
  trial:   { students: 20,  trainers: 3,  departments: 1, branchesPerDept: 2, batchesPerBranch: 2 },
  starter: { students: 50,  trainers: 10, departments: 2, branchesPerDept: 3, batchesPerBranch: 3 },
  growth:  { students: 150, trainers: 25, departments: 5, branchesPerDept: 5, batchesPerBranch: 5 },
};

// Same durations the payment flow offers (PlanDurationLimits: 1, 6, 12 months)
const EXPIRY_CHOICES = [1, 6, 12];

// const EMAIL_RE = /\S+@\S+\.\S+/;
const EMAIL_RE = /\S+@\S+\.\S+/;

// Product catalogue (placeholder - confirm names/roles before release).
// Later this can be fetched from backend Product Management API.
const ROLE_STUDENT     = { key: "student",     label: "Student" };
const ROLE_TRAINER     = { key: "trainer",     label: "Trainer" };
const ROLE_BUSINESS_PARTNERSHIP = { key: "business_partnership", label: "Business & Partnership" };

const PRODUCTS = [
  // LMS
  { key: "lms",          group: "LMS",          label: "LMS",               roles: [] },
  // PRODUCT
  { key: "workshop",     group: "PRODUCT",      label: "ILM ORA Workshop",  roles: [] },
  { key: "workspace",    group: "PRODUCT",      label: "ILM ORA Workspace", roles: [] },
  { key: "calendry",     group: "PRODUCT",      label: "ILM ORA Calendry",  roles: [] },
  // CORPORATE
  { key: "corporate",    group: "CORPORATE",    label: "Corporate",         roles: [] },
  // EDUCATE TECH
  { key: "educate_tech", group: "EDUCATE TECH", label: "Educate Tech",      roles: [] },
  // SIS
  { key: "sis",          group: "SIS",          label: "SIS",               roles: [] },
];
// Products that are available right now. Everything else is locked ("Coming soon").
const ENABLED_PRODUCTS = ["lms"];
const isLocked = (productKey) => !ENABLED_PRODUCTS.includes(productKey);

// true only for products that have roles to choose (e.g. LMS)
const needsRoles = (productKey) =>
  (PRODUCTS.find((p) => p.key === productKey)?.roles || []).length > 0;
const INDUSTRIES = [
  "Education",
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Manufacturing",
  "Media",
  "Government",
  "Non-Profit",
  "Other",
];

const PLAN_CONFIG = {
  trial:   { label: "Trial",   dot: "#f59e0b", bg: "rgba(245,158,11,0.12)",  color: "#d97706" },
  starter: { label: "Starter", dot: "#14b8a6", bg: "rgba(20,184,166,0.12)",  color: "#0d9488" },
  growth:  { label: "Growth",  dot: "#8b5cf6", bg: "rgba(139,92,246,0.12)",  color: "#7c3aed" },
};

const STATUS_CONFIG = {
  active:   { label: "Active",   dot: "#10b981", bg: "rgba(16,185,129,0.12)", color: "#059669" },
  inactive: { label: "Inactive", dot: "#ef4444", bg: "rgba(239,68,68,0.12)",  color: "#dc2626" },
};

// -----------------------------------------------------------------------------
// ICONS (inline SVG, no emoji)
// -----------------------------------------------------------------------------
const ICON_PATHS = {
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  clipboard: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
    </>
  ),
  sliders: <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
  check: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
};

const Icon = ({ name, size = 16, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || "currentColor"}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    {ICON_PATHS[name]}
  </svg>
);

// -----------------------------------------------------------------------------
// DATE HELPERS (local time, yyyy-MM-dd)
// -----------------------------------------------------------------------------
const toISO = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Same clamping as Java LocalDate.plusMonths (Jan 31 + 1 month = Feb 28/29)
const addMonthsISO = (months) => {
  const d = new Date();
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  const lastDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, lastDay));
  return toISO(d);
};

const tomorrowISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toISO(d);
};

// -----------------------------------------------------------------------------
// INITIAL FORM STATE
// -----------------------------------------------------------------------------
const DEFAULT_PLAN = "starter";

const INITIAL_FORM = {
  name:         "",
  domain:       "",
  industry:     "",
  industryOther: "",   // custom industry name when "Other" is chosen
  location:     "",
  contactEmail: "",
  description:  "",
  adminName:    "",
  adminEmail:   "",
  plan:         DEFAULT_PLAN,
  status:       "active",
  planExpiry:   "",
//   maxStudents:  PLAN_LIMITS[DEFAULT_PLAN].students,
//   maxTrainers:  PLAN_LIMITS[DEFAULT_PLAN].trainers,
// };
  maxStudents:  PLAN_LIMITS[DEFAULT_PLAN].students,
  maxTrainers:  PLAN_LIMITS[DEFAULT_PLAN].trainers,
  products:     {},   // { lms: ["student","trainer"], workspace: ["trainer"] }
};

// -----------------------------------------------------------------------------
// FIELD COMPONENT
// -----------------------------------------------------------------------------
const Field = ({ label, required, error, hint, hintColor, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: error ? "#ef4444" : undefined }}>
      {label}
      {required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
    </label>
    {children}
    {error ? (
      <span style={{ fontSize: 11, color: "#ef4444" }}>{error}</span>
    ) : hint ? (
      <span style={{ fontSize: 11, color: hintColor }}>{hint}</span>
    ) : null}
  </div>
);

// -----------------------------------------------------------------------------
// SECTION HEADER
// -----------------------------------------------------------------------------
const SectionHeader = ({ icon, title, txtMain }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
    <span
      style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(99,102,241,0.12)", color: "#6366f1",
      }}
    >
      <Icon name={icon} size={15} />
    </span>
    <div style={{ fontSize: 13, fontWeight: 700, color: txtMain }}>{title}</div>
  </div>
);

// -----------------------------------------------------------------------------
// BADGE PREVIEW
// -----------------------------------------------------------------------------
const BadgePreview = ({ cfg }) => {
  if (!cfg) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 600, padding: "3px 9px",
      borderRadius: 999, background: cfg.bg, color: cfg.color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  );
};

// -----------------------------------------------------------------------------
// AVATAR PREVIEW
// -----------------------------------------------------------------------------
const AVATAR_COLORS = [
  ["#6366f1", "#818cf8"], ["#8b5cf6", "#a78bfa"], ["#ec4899", "#f472b6"],
  ["#14b8a6", "#2dd4bf"], ["#f59e0b", "#fbbf24"], ["#10b981", "#34d399"],
  ["#3b82f6", "#60a5fa"], ["#ef4444", "#f87171"],
];
const avatarColor = (name = "") =>
  AVATAR_COLORS[(name.charCodeAt(0) || 0) % AVATAR_COLORS.length];

function initials(name = "") {
  return name.split(" ").map((w) => w[0] || "").join("").slice(0, 2).toUpperCase() || "?";
}

// -----------------------------------------------------------------------------
// MAIN PAGE
// -----------------------------------------------------------------------------
const NewOrganizationPage = () => {
  const navigate  = useNavigate();
  const { dark }  = useTheme();

  const [form,        setForm]        = useState(INITIAL_FORM);
  const [errors,      setErrors]      = useState({});
  const [loading,     setLoading]     = useState(false);
  const [success,     setSuccess]     = useState(false);
  // const [inviteSent,  setInviteSent]  = useState(true);
    const [inviteSent,  setInviteSent]  = useState(true);
  const [inviteInfo,  setInviteInfo]  = useState(null); // { organizationCode, inviteLink, inviteStatus }
  const [copied,      setCopied]      = useState("");
  const [submitError, setSubmitError] = useState("");

  const isTrial = form.plan === "trial";
  // If "Other" is chosen, the typed name is what we save and show
  const finalIndustry =
    form.industry === "Other" ? form.industryOther.trim() : form.industry;
  const planDefaults = PLAN_LIMITS[form.plan];

  // -- Design tokens (same as rest of codebase) --
  const cardBg  = dark ? "rgba(255,255,255,0.03)" : "#ffffff";
  const cardBdr = dark ? "rgba(255,255,255,0.08)" : "#e5e7eb";
  const txtMain = dark ? "#f1f5f9" : "#0f172a";
  const txtSub  = dark ? "#64748b" : "#94a3b8";
  const inputBg = dark ? "rgba(255,255,255,0.05)" : "#f8fafc";
  const inputBdr = dark ? "rgba(255,255,255,0.10)" : "#e5e7eb";
  const inputFocus = "#6366f1";
  const divClr  = dark ? "rgba(255,255,255,0.06)" : "#f1f5f9";

  // -- Input style helper --
  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "9px 12px",
    borderRadius: 8,
    border: `1px solid ${hasError ? "#ef4444" : inputBdr}`,
    background: inputBg,
    color: txtMain,
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  });

  const selectStyle = (hasError) => ({
    ...inputStyle(hasError),
    cursor: "pointer",
  });

  // focus / blur border colour handlers
  const focusProps = (hasError) => ({
    onFocus: (e) => { e.target.style.borderColor = inputFocus; },
    onBlur:  (e) => { e.target.style.borderColor = hasError ? "#ef4444" : inputBdr; },
  });

  // -- Validation (pure: returns an errors object, does not set state) --
  const validate = () => {
    const e = {};
    if (!form.name.trim())         e.name         = "Organization name is required";
    if (!form.domain.trim())       e.domain       = "Domain is required";
    if (!form.contactEmail.trim()) e.contactEmail = "Contact email is required";
    else if (!EMAIL_RE.test(form.contactEmail))
      e.contactEmail = "Enter a valid email address";
    if (!form.industry)            e.industry     = "Please select an industry";
    else if (form.industry === "Other" && !form.industryOther.trim())
      e.industryOther = "Please enter the industry name";

    if (!form.adminName.trim())    e.adminName    = "Admin name is required";
    if (!form.adminEmail.trim())   e.adminEmail   = "Admin email is required";
    else if (!EMAIL_RE.test(form.adminEmail))
      e.adminEmail = "Enter a valid email address";

    if (!isTrial) {
      if (!form.planExpiry)
        e.planExpiry = "Expiry date is required for this plan";
      else if (form.planExpiry <= toISO(new Date()))
        e.planExpiry = "Expiry date must be in the future";
    }

    // if (Number(form.maxStudents) < 1) e.maxStudents = "Must be at least 1";
        const pKeys = Object.keys(form.products);
    if (pKeys.length === 0)
      e.products = "Select at least one product";
        else if (pKeys.some((k) => needsRoles(k) && form.products[k].length === 0))
      e.products = "Select at least one role for every selected product that has roles";

    if (Number(form.maxStudents) < 1) e.maxStudents = "Must be at least 1";
    if (Number(form.maxTrainers) < 1) e.maxTrainers = "Must be at least 1";
    return e;
  };

  // Create button is enabled only when nothing is missing
  const remaining = Object.keys(validate()).length;
  const canSubmit = remaining === 0 && !loading;

  // A past expiry date is flagged immediately while typing/picking
  const expiryLiveError =
    !isTrial && form.planExpiry && form.planExpiry <= toISO(new Date())
      ? "Expiry date must be in the future"
      : "";

  // -- Handlers --
  const set = (key, val) => {
    setForm((prev) => {
      // Picking a plan pre-fills that plan's default limits and
      // clears the expiry for trial (trial never expires).
      if (key === "plan") {
        const d = PLAN_LIMITS[val];
        return {
          ...prev,
          plan: val,
          maxStudents: d.students,
          maxTrainers: d.trainers,
          planExpiry: val === "trial" ? "" : prev.planExpiry,
        };
      }
      if (key === "industry" && val !== "Other") {
        return { ...prev, industry: val, industryOther: "" };
      }
      return { ...prev, [key]: val };
    });
    setErrors((prev) => {
      const next = { ...prev, [key]: "" };
      if (key === "plan") next.planExpiry = "";
      if (key === "industry") next.industryOther = "";
      return next;
    });
  };

  // const handleSubmit = async () => {
      const toggleProduct = (pKey) => {
    setForm((prev) => {
      // Single select: only one product at a time
      const next = prev.products[pKey] ? {} : { [pKey]: [] };
      return { ...prev, products: next };
    });
    setErrors((prev) => ({ ...prev, products: "" }));
  };

  const toggleRole = (pKey, rKey) => {
    setForm((prev) => {
      const cur = prev.products[pKey] || [];
      const roles = cur.includes(rKey) ? cur.filter((r) => r !== rKey) : [...cur, rKey];
      return { ...prev, products: { ...prev.products, [pKey]: roles } };
    });
    setErrors((prev) => ({ ...prev, products: "" }));
  };

  const copyText = async (text, which) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied(""), 1800);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setSubmitError("");
    try {
      const students = Number(form.maxStudents);
      const trainers = Number(form.maxTrainers);

      // Field names match CreateOrganizationRequest in auth-service.
      const payload = {
        name:         form.name.trim(),
        domain:       form.domain.trim(),
        contactEmail: form.contactEmail.trim(),
        location:     form.location.trim(),
        industry:     finalIndustry,
        description:  form.description.trim(),
        plan:         form.plan,
        status:       form.status,
        planExpiryDate: isTrial ? null : form.planExpiry, // yyyy-MM-dd
        // Only send a limit if it differs from the plan default (custom limit)
        maxStudents:  students !== planDefaults.students ? students : null,
        maxTrainers:  trainers !== planDefaults.trainers ? trainers : null,
      //   adminName:    form.adminName.trim(),
      //   adminEmail:   form.adminEmail.trim(),
      // };
              adminName:    form.adminName.trim(),
        adminEmail:   form.adminEmail.trim(),
        // [{ product: "lms", roles: ["student","trainer"] }, ...]
        products: Object.entries(form.products).map(([product, roles]) => ({
          product,
          roles,
        })),
      };

      const res = await authService.createOrganizationWithAdmin(payload);

      // const sent = res?.inviteEmailSent !== false;
      // setInviteSent(sent);
      // setSuccess(true);
      // if (sent) {
      //   setTimeout(() => navigate("/superadmin/organizations"), 1800);
      // }
            const sent = res?.inviteEmailSent !== false;
      setInviteSent(sent);

      // Generated by backend only. Frontend never creates tokens.
      const code   = res?.organizationCode || res?.inviteCode || null;
      const link   = res?.inviteLink || null;
      const status = res?.inviteStatus || (code ? "ACTIVE" : null);
      if (code || link) {
        setInviteInfo({ organizationCode: code, inviteLink: link, inviteStatus: status });
      }

      setSuccess(true);
      // Auto-redirect only when there is no code/link to copy
      if (sent && !code && !link) {
        setTimeout(() => navigate("/superadmin/organizations"), 1800);
      }
    } catch (err) {
      console.error("Failed to create organization:", err);
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.message;
      setSubmitError(
        status === 409
          ? "A user with this admin email already exists. Use a different admin email."
          : serverMsg ||
            (status === 400
              ? "Please check the form details and try again."
              : "Could not create the organization. Please try again.")
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  // -- Avatar preview colors --
  const [avatarA, avatarB] = avatarColor(form.name);

  // // -- Success state --
  // if (success) {
    // -- Invite code / link card (shown on success screen) --
  const inviteCard = inviteInfo ? (
    <div style={{
      width: "100%", maxWidth: 520, textAlign: "left", marginTop: 8,
      background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 12, padding: "16px 18px",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: txtSub, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Organization Invite {inviteInfo.inviteStatus ? `- ${inviteInfo.inviteStatus}` : ""}
      </div>

      {[
        { label: "Organization Code", val: inviteInfo.organizationCode, key: "code", mono: true },
        { label: "Invite Link",       val: inviteInfo.inviteLink,       key: "link", mono: false },
      ].filter((r) => r.val).map((r) => (
        <div key={r.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: txtSub, marginBottom: 3 }}>{r.label}</div>
            <div style={{
              fontSize: 13, fontWeight: 600, color: txtMain,
              fontFamily: r.mono ? "monospace" : "inherit",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {r.val}
            </div>
          </div>
          <button
            type="button"
            onClick={() => copyText(r.val, r.key)}
            style={{
              padding: "6px 12px", borderRadius: 7, fontSize: 11, fontWeight: 700,
              border: "1px solid #6366f140", background: "#6366f10d", color: "#6366f1", cursor: "pointer",
            }}
          >
            {copied === r.key ? "Copied" : r.key === "code" ? "Copy Code" : "Copy Link"}
          </button>
        </div>
      ))}
    </div>
  ) : null;

  // -- Success state --
  if (success) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 40px", gap: 14, textAlign: "center" }}>
        <Icon name={inviteSent ? "check" : "alert"} size={56} color={inviteSent ? "#10b981" : "#d97706"} />
        {/* <div style={{ fontSize: 18, fontWeight: 800, color: txtMain }}>Organization created</div> */}
                <div style={{ fontSize: 18, fontWeight: 800, color: txtMain }}>Organization created</div>
        {inviteCard}
        {inviteSent ? (
          <>
            <div style={{ fontSize: 13, color: txtSub }}>
              A set-password email was sent to {form.adminEmail.trim()}.
            </div>
            {/* <div style={{ fontSize: 12, color: txtSub }}>Redirecting to organizations list...</div> */}
                        {!inviteInfo && (
              <div style={{ fontSize: 12, color: txtSub }}>Redirecting to organizations list...</div>
            )}
            {inviteInfo && (
              <button
                onClick={() => navigate("/superadmin/organizations")}
                style={{
                  marginTop: 6, padding: "9px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
                  border: "none", cursor: "pointer",
                }}
              >
                Go to organizations
              </button>
            )}
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, color: "#d97706", maxWidth: 420 }}>
              The invite email to {form.adminEmail.trim()} could not be sent. Open the
              organization and click &quot;Resend invite&quot;.
            </div>
            <button
              onClick={() => navigate("/superadmin/organizations")}
              style={{
                marginTop: 6, padding: "9px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
                border: "none", cursor: "pointer",
              }}
            >
              Go to organizations
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Breadcrumb */}
      <BreadcrumbNavigation
        items={[
          { label: "Organizations", href: "/superadmin/organizations" },
          { label: "New Organization" },
        ]}
      />

      {/* Page Header (no buttons here - Create / Cancel are at the bottom) */}
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: txtMain, margin: 0, letterSpacing: "-0.02em" }}>
          New Organization
        </h1>
        <p style={{ fontSize: 13, color: txtSub, margin: "4px 0 0" }}>
          Fill in the details to onboard a new organization
        </p>
      </div>

      {/* Server error */}
      {submitError && (
        <div style={{
          padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: "rgba(239,68,68,0.10)", color: "#dc2626",
          border: "1px solid rgba(239,68,68,0.30)",
        }}>
          {submitError}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>

        {/* ---- LEFT: Form ---- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Basic Info */}
          <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "22px 24px" }}>
            <SectionHeader icon="building" title="Basic Information" txtMain={txtMain} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Organization Name" required error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Texora AI"
                  style={inputStyle(errors.name)}
                  {...focusProps(errors.name)}
                />
              </Field>

              <Field label="Domain" required error={errors.domain}>
                <input
                  value={form.domain}
                  onChange={(e) => set("domain", e.target.value)}
                  placeholder="e.g. texora.ai"
                  style={inputStyle(errors.domain)}
                  {...focusProps(errors.domain)}
                />
              </Field>

              <Field label="Contact Email" required error={errors.contactEmail}
                hint="General contact for the organization" hintColor={txtSub}>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => set("contactEmail", e.target.value)}
                  placeholder="e.g. contact@texora.ai"
                  style={inputStyle(errors.contactEmail)}
                  {...focusProps(errors.contactEmail)}
                />
              </Field>

              <Field label="Location">
                <input
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="e.g. New Delhi, India"
                  style={inputStyle(false)}
                  {...focusProps(false)}
                />
              </Field>

              <Field label="Industry" required error={errors.industry}>
                <select
                  value={form.industry}
                  onChange={(e) => set("industry", e.target.value)}
                  style={selectStyle(errors.industry)}
                  {...focusProps(errors.industry)}
                >
                  <option value="">Select industry...</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </Field>

              {form.industry === "Other" && (
                <Field label="Industry Name" required error={errors.industryOther}>
                  <input
                    autoFocus
                    value={form.industryOther}
                    onChange={(e) => set("industryOther", e.target.value)}
                    placeholder="e.g. Agriculture"
                    style={inputStyle(errors.industryOther)}
                    {...focusProps(errors.industryOther)}
                  />
                </Field>
              )}

              <div style={form.industry === "Other" ? { gridColumn: "1 / -1" } : undefined}>
                <Field label="Description">
                  <input
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Brief description (optional)"
                    style={inputStyle(false)}
                    {...focusProps(false)}
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Organization Admin */}
          <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "22px 24px" }}>
            <SectionHeader icon="user" title="Organization Admin" txtMain={txtMain} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Admin Name" required error={errors.adminName}>
                <input
                  value={form.adminName}
                  onChange={(e) => set("adminName", e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  style={inputStyle(errors.adminName)}
                  {...focusProps(errors.adminName)}
                />
              </Field>

              <Field label="Admin Email" required error={errors.adminEmail}
                hint="We email this address a link to set a password and sign in." hintColor={txtSub}>
                <input
                  type="email"
                  value={form.adminEmail}
                  onChange={(e) => set("adminEmail", e.target.value)}
                  placeholder="e.g. priya@texora.ai"
                  style={inputStyle(errors.adminEmail)}
                  {...focusProps(errors.adminEmail)}
                />
              </Field>
            </div>
          </div>

                {/* Products & Roles */}
          <div style={{ background: cardBg, border: `1px solid ${errors.products ? "#ef4444" : cardBdr}`, borderRadius: 14, padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <SectionHeader icon="clipboard" title="Products & Roles" txtMain={txtMain} />
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, marginBottom: 16,
                background: Object.keys(form.products).length > 0 ? "rgba(16,185,129,0.12)" : "rgba(148,163,184,0.15)",
                color: Object.keys(form.products).length > 0 ? "#059669" : txtSub,
              }}>
                {Object.keys(form.products).length} selected
              </span>
            </div>
            <div style={{ fontSize: 12, color: txtSub, marginTop: -6, marginBottom: 18, lineHeight: 1.5 }}>
                           Turn on the product this organization can use.
            </div>

            {(() => {
              const GROUPS = [
                { key: "LMS",          title: "LMS",          cols: "1fr" },
                { key: "PRODUCT",      title: "Product",      cols: "repeat(3, 1fr)" },
                { key: "CORPORATE",    title: "Corporate",    cols: "1fr" },
                { key: "EDUCATE TECH", title: "Educate Tech", cols: "1fr" },
                { key: "SIS",          title: "SIS",          cols: "1fr" },
              ];
              const DESC = {
                lms: "Courses, batches, assessments, attendance and more",
                workshop: "Run and manage workshops",
                workspace: "Team workspace and collaboration",
                calendry: "Scheduling and bookings",
                corporate: "Corporate training and programs",
                educate_tech: "Corporate education platform",
                sis: "Student information system",
              };

              const Switch = ({ on }) => (
                <span style={{
                  width: 34, height: 18, borderRadius: 999, flexShrink: 0, position: "relative",
                  background: on ? "#6366f1" : (dark ? "rgba(255,255,255,0.15)" : "#cbd5e1"),
                  transition: "background 0.15s", display: "inline-block",
                }}>
                  <span style={{
                    position: "absolute", top: 2, left: on ? 18 : 2, width: 14, height: 14,
                    borderRadius: "50%", background: "#fff", transition: "left 0.15s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }} />
                </span>
              );

              return (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {GROUPS.map((g) => {
                    const items = PRODUCTS.filter((p) => p.group === g.key);
                    if (items.length === 0) return null;
                    return (
                      <div key={g.key}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.1em", color: txtSub, textTransform: "uppercase" }}>
                            {g.title}
                          </span>
                          <span style={{ flex: 1, height: 1, background: divClr }} />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: g.cols, gap: 10 }}>
                          {items.map((p) => {
                            const selected = !!form.products[p.key];
                            const locked = isLocked(p.key);
                            const roles = form.products[p.key] || [];
                            const [ca, cb] = avatarColor(p.label);
                            return (
                                                            <div
                                key={p.key}
                                onClick={() => { if (!locked) toggleProduct(p.key); }}
                                style={{
                                  cursor: locked ? "not-allowed" : "pointer",
                                  opacity: locked ? 0.55 : 1,
                                  borderRadius: 12, padding: "14px 16px",
                                  border: `1.5px solid ${selected ? "#6366f1" : inputBdr}`,
                                  background: selected ? "rgba(99,102,241,0.07)" : inputBg,
                                  boxShadow: selected ? "0 2px 12px rgba(99,102,241,0.18)" : "none",
                                  transition: "all 0.15s",
                                }}
                              >
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                  <div style={{
                                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                                    background: selected ? `linear-gradient(135deg,${ca},${cb})` : (dark ? "rgba(255,255,255,0.08)" : "#e5e7eb"),
                                    color: selected ? "#fff" : txtSub,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 14, fontWeight: 800,
                                  }}>
                                    {initials(p.label)}
                                  </div>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: txtMain }}>{p.label}</div>
                                    <div style={{ fontSize: 11, color: txtSub, marginTop: 2, lineHeight: 1.35 }}>{DESC[p.key]}</div>
                                  </div>
                                                                    {locked ? (
                                    <span style={{
                                      fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 999,
                                      background: "rgba(148,163,184,0.18)", color: txtSub, whiteSpace: "nowrap",
                                    }}>
                                      Coming soon
                                    </span>
                                  ) : (
                                    <Switch on={selected} />
                                  )}
                                </div>

                                {selected && p.roles.length > 0 && (
                                  <div
                                    onClick={(e) => e.stopPropagation()}
                                    style={{ marginTop: 14, paddingTop: 12, borderTop: `1px dashed ${dark ? "rgba(255,255,255,0.12)" : "#c7d2fe"}` }}
                                  >
                                    <div style={{ fontSize: 10, fontWeight: 700, color: txtSub, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                                      Allowed roles
                                    </div>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                      {p.roles.map((r) => {
                                        const on = roles.includes(r.key);
                                        return (
                                          <button
                                            key={r.key}
                                            type="button"
                                            onClick={() => toggleRole(p.key, r.key)}
                                            style={{
                                              display: "inline-flex", alignItems: "center", gap: 6,
                                              padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                                              border: `1.5px solid ${on ? "#6366f1" : inputBdr}`,
                                              background: on ? "#6366f1" : "transparent",
                                              color: on ? "#fff" : txtSub, cursor: "pointer",
                                              transition: "all 0.15s",
                                            }}
                                          >
                                            {on && (
                                              <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                              </svg>
                                            )}
                                            {r.label}
                                          </button>
                                        );
                                      })}
                                    </div>
                                    {roles.length === 0 && (
                                      <div style={{ fontSize: 11, color: "#d97706", marginTop: 8 }}>
                                        Select at least one role.
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {errors.products && (
              <div style={{ fontSize: 11, color: "#ef4444", marginTop: 12 }}>{errors.products}</div>
            )}
          </div>

          {/* Plan & Status */}
          <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "22px 24px" }}>
            <SectionHeader icon="clipboard" title="Plan & Status" txtMain={txtMain} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>

              {/* Plan selector */}
              <Field label="Plan">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {PLANS.map((p) => {
                    const cfg = PLAN_CONFIG[p];
                    const active = form.plan === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => set("plan", p)}
                        style={{
                          padding: "7px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                          border: `1px solid ${active ? cfg.color : inputBdr}`,
                          background: active ? cfg.bg : inputBg,
                          color: active ? cfg.color : txtSub,
                          cursor: "pointer", transition: "all 0.15s",
                          display: "flex", alignItems: "center", gap: 5,
                          textAlign: "left",
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* Status selector */}
              <Field label="Status">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {STATUSES.map((s) => {
                    const cfg = STATUS_CONFIG[s];
                    const active = form.status === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => set("status", s)}
                        style={{
                          padding: "7px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                          border: `1px solid ${active ? cfg.color : inputBdr}`,
                          background: active ? cfg.bg : inputBg,
                          color: active ? cfg.color : txtSub,
                          cursor: "pointer", transition: "all 0.15s",
                          display: "flex", alignItems: "center", gap: 5,
                          textAlign: "left",
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </Field>

              {/* Plan Expiry */}
              <Field
                label="Plan Expiry Date"
                required={!isTrial}
                error={errors.planExpiry || expiryLiveError}
                hint={isTrial ? "Trial plans do not expire." : "When the plan ends, the organization returns to Trial."}
                hintColor={txtSub}
              >
                <input
                  type="date"
                  value={form.planExpiry}
                  min={tomorrowISO()}
                  disabled={isTrial}
                  onChange={(e) => set("planExpiry", e.target.value)}
                  style={{
                    ...inputStyle(errors.planExpiry || expiryLiveError),
                    opacity: isTrial ? 0.5 : 1,
                    cursor: isTrial ? "not-allowed" : "text",
                  }}
                  {...focusProps(errors.planExpiry || expiryLiveError)}
                />
                {!isTrial && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {EXPIRY_CHOICES.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => set("planExpiry", addMonthsISO(m))}
                        style={{
                          padding: "4px 9px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                          border: `1px solid ${inputBdr}`, background: inputBg, color: txtSub,
                          cursor: "pointer",
                        }}
                      >
                        {m} {m === 1 ? "month" : "months"}
                      </button>
                    ))}
                  </div>
                )}
              </Field>
            </div>
          </div>

          {/* Limits */}
          <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "22px 24px" }}>
            <SectionHeader icon="sliders" title="Usage Limits" txtMain={txtMain} />
            <div style={{ fontSize: 12, color: txtSub, marginBottom: 14, lineHeight: 1.5 }}>
              Pre-filled from the {PLAN_CONFIG[form.plan].label} plan, which also allows up to{" "}
              {planDefaults.departments} {planDefaults.departments === 1 ? "department" : "departments"},{" "}
              {planDefaults.branchesPerDept} branches per department and {planDefaults.batchesPerBranch} batches per
              branch. Change students or trainers only to give this organization a custom limit.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Max Students" error={errors.maxStudents}>
                <input
                  type="number"
                  min={1}
                  value={form.maxStudents}
                  onChange={(e) => set("maxStudents", e.target.value)}
                  style={inputStyle(errors.maxStudents)}
                  {...focusProps(errors.maxStudents)}
                />
              </Field>

              <Field label="Max Trainers" error={errors.maxTrainers}>
                <input
                  type="number"
                  min={1}
                  value={form.maxTrainers}
                  onChange={(e) => set("maxTrainers", e.target.value)}
                  style={inputStyle(errors.maxTrainers)}
                  {...focusProps(errors.maxTrainers)}
                />
              </Field>
            </div>
          </div>

          {/* ---- Bottom action bar: Cancel + Create (enabled only when form is complete) ---- */}
          <div
            style={{
              background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14,
              padding: "16px 24px", display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: 12, flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 600, color: canSubmit ? "#059669" : txtSub }}>
              {canSubmit
                ? "All required details are filled. Ready to create."
                : `${remaining} required ${remaining === 1 ? "item" : "items"} left to fill.`}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                onClick={() => navigate("/superadmin/organizations")}
                style={{
                  padding: "9px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  background: dark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                  color: txtSub, border: "none", cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  padding: "9px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700,
                  background: canSubmit
                    ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                    : dark ? "rgba(255,255,255,0.08)" : "#cbd5e1",
                  color: canSubmit ? "#fff" : dark ? "#64748b" : "#94a3b8",
                  border: "none",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", gap: 8,
                  transition: "background 0.15s",
                }}
              >
                {loading ? (
                  <>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                      style={{ animation: "spin 1s linear infinite" }}>
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    Create Organization
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ---- RIGHT: Live Preview ---- */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 20 }}>

          {/* Preview Card */}
          <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: txtSub, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>
              Live Preview
            </div>

            {/* Org avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg,${avatarA},${avatarB})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 18, fontWeight: 800,
              }}>
                {initials(form.name)}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: txtMain, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {form.name || "Organization Name"}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <BadgePreview cfg={STATUS_CONFIG[form.status]} />
                  <BadgePreview cfg={PLAN_CONFIG[form.plan]} />
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={{ borderTop: `1px solid ${divClr}`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { val: form.domain       || "-", label: "Domain" },
                { val: finalIndustry     || "-", label: "Industry" },
                { val: form.location     || "-", label: "Location" },
                { val: form.contactEmail || "-", label: "Email" },
                { val: form.adminEmail   || "-", label: "Admin" },
                { val: isTrial ? "No expiry" : (form.planExpiry || "-"), label: "Expires" },
              ].map(({ val, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: txtSub, minWidth: 56 }}>{label}</span>
                  <span style={{ fontSize: 12, color: txtMain, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Limits row */}
            <div style={{ borderTop: `1px solid ${divClr}`, marginTop: 12, paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Max Students", val: form.maxStudents, color: "#14b8a6" },
                { label: "Max Trainers", val: form.maxTrainers, color: "#8b5cf6" },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ textAlign: "center", padding: "10px 0", borderRadius: 8, background: dark ? "rgba(255,255,255,0.04)" : "#f8fafc" }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color, lineHeight: 1 }}>{val || 0}</div>
                  <div style={{ fontSize: 10, color: txtSub, marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 14, padding: "20px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: txtSub, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
              Checklist
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Organization name",  done: !!form.name.trim() },
                { label: "Domain",             done: !!form.domain.trim() },
                { label: "Contact email",      done: EMAIL_RE.test(form.contactEmail) },
                { label: "Industry selected",  done: !!form.industry && (form.industry !== "Other" || !!form.industryOther.trim()) },
                { label: "Admin name",         done: !!form.adminName.trim() },
                { label: "Admin email",        done: EMAIL_RE.test(form.adminEmail) },
                { label: "Plan selected",      done: !!form.plan },
                { label: "Status selected",    done: !!form.status },
                // { label: "Plan expiry",        done: isTrial || (!!form.planExpiry && !expiryLiveError) },
                                { label: "Plan expiry",        done: isTrial || (!!form.planExpiry && !expiryLiveError) },
                              { label: "Products & roles",   done: Object.keys(form.products).length > 0 && Object.keys(form.products).every((k) => !needsRoles(k) || form.products[k].length > 0) },
              ].map(({ label, done }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                    background: done ? "#10b981" : (dark ? "rgba(255,255,255,0.08)" : "#e5e7eb"),
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                  }}>
                    {done && (
                      <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 12, color: done ? txtMain : txtSub, fontWeight: done ? 600 : 400 }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default NewOrganizationPage;


