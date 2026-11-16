 "use client";

import React, { useEffect, useRef, useState } from "react";
import authService from "@/services/authService";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  Clock,
  Languages,
  Camera,
  Trash2,
  Save,
  X,
  Edit3,
  BadgeCheck,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Eye,
  EyeOff,
  CreditCard,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import userService from "@/services/userService";
import { useAvatarContext } from "@/context/AvatarContext";

const INITIAL_PROFILE = {
  language: "English",
  dateFormat: "DD/MM/YYYY",
  timeFormat: "12-hour",
  workingDays: "Monday, Tuesday, Wednesday, Thursday, Friday",
  workingHoursStart: "09:00",
  workingHoursEnd: "18:00",
  phoneNumber: "",
  companyName: "",
  companyLogo: "",
};

const getSavedUser = () => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("lms_user") || "{}");
  } catch {
    return {};
  }
};

const getResponseData = (response) =>
  response?.data?.data ?? response?.data ?? {};

const getInitials = (name = "") => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "U";
  return words.slice(0, 2).map((word) => word[0].toUpperCase()).join("");
};

function SectionHeading({ icon: Icon, title, description, color = "pink" }) {
  const colors = {
    pink: "bg-pink-100 text-pink-600 dark:bg-pink-500/15 dark:text-pink-400",
    violet: "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon size={19} />
      </div>
      <div className="min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-0.5">
          {description}
        </p>
      </div>
    </div>
  );
}

function InfoField({
  label,
  icon: Icon,
  value,
  name,
  editing,
  onChange,
  placeholder,
  type = "text",
  readOnly = false,
}) {
  return (
    <div className="min-w-0 space-y-2">
      <label className="block text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
        {label}
      </label>
      <div
        className={`flex items-center gap-3 min-w-0 px-3.5 rounded-xl border transition-all ${
          editing && !readOnly
            ? "bg-white dark:bg-white/[0.04] border-pink-300 dark:border-pink-500/40 focus-within:ring-2 focus-within:ring-pink-500/15"
            : "bg-gray-50 dark:bg-white/[0.025] border-gray-200 dark:border-white/10"
        }`}
      >
        <Icon size={17} className="text-gray-400 shrink-0" />
        {editing && !readOnly ? (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full min-w-0 py-3 bg-transparent text-sm text-gray-900 dark:text-white outline-none placeholder:text-gray-400"
          />
        ) : (
          <div className="w-full min-w-0 py-3 text-sm text-gray-800 dark:text-white/85 truncate">
            {value || (
              <span className="text-gray-400 dark:text-slate-500">
                Not provided
              </span>
            )}
          </div>
        )}
        {readOnly && <LockKeyhole size={14} className="text-gray-400 shrink-0" />}
      </div>
    </div>
  );
}

function PreferenceField({ field, value, editing, onChange }) {
  const Icon = field.icon;
  return (
    <label className="min-w-0 space-y-2">
      <span className="block text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
        {field.label}
      </span>
      <div
        className={`flex items-center gap-3 min-w-0 px-3.5 rounded-xl border ${
          editing
            ? "bg-white dark:bg-white/[0.04] border-pink-300 dark:border-pink-500/40"
            : "bg-gray-50 dark:bg-white/[0.025] border-gray-200 dark:border-white/10"
        }`}
      >
        <Icon size={17} className="text-gray-400 shrink-0" />
        {editing ? (
          field.type === "select" ? (
            <select
              name={field.name}
              value={value || ""}
              onChange={onChange}
              className="w-full min-w-0 py-3 bg-transparent text-sm text-gray-900 dark:text-white outline-none"
            >
              {field.options.map((option) => (
                <option key={option} value={option} className="text-gray-900">
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={value || ""}
              onChange={onChange}
              placeholder={field.type === "text" ? "Enter working days" : ""}
              className="w-full min-w-0 py-3 bg-transparent text-sm text-gray-900 dark:text-white outline-none"
            />
          )
        ) : (
          <span className="w-full min-w-0 py-3 text-sm text-gray-800 dark:text-white/85 truncate">
            {value || "Not provided"}
          </span>
        )}
      </div>
    </label>
  );
}

export default function CalendarProfilePage({ onProfileComplete }) {
  const avatarContext = useAvatarContext();
  const profileImage = avatarContext?.profileImage ?? null;
  const uploadImage = avatarContext?.uploadImage ?? (() => {});
  const removeImage = avatarContext?.removeImage ?? (() => {});
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [originalProfile, setOriginalProfile] = useState(INITIAL_PROFILE);
  const [user, setUser] = useState({ name: "", email: "" });
  const [originalName, setOriginalName] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [security, setSecurity] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      setLoading(true);
      setError("");

      const savedUser = getSavedUser();
      const savedName =
        savedUser.displayName || savedUser.name || savedUser.fullName || "";

      setUser({
        name: savedName,
        email: savedUser.email || savedUser.username || "",
      });
      setOriginalName(savedName);

      try {
        const response = await userService.getCalendarProfile();
        const data = getResponseData(response);
        if (!mounted) return;

        const loadedProfile = {
          ...INITIAL_PROFILE,
          ...data,
          phoneNumber: data.phoneNumber || "",
        };
        setProfile(loadedProfile);
        setOriginalProfile(loadedProfile);
        setUser((previous) => ({
          name: data.displayName || data.name || previous.name,
          email: data.email || previous.email,
        }));
        setOriginalName(data.displayName || data.name || savedName);
      } catch (err) {
        if (mounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load Calendar profile. Please refresh and try again."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadProfile();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser((previous) => ({ ...previous, [name]: value }));
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((previous) => ({ ...previous, [name]: value }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhotoError("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setPhotoError("Please upload a JPG, PNG or WEBP image.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    uploadImage(file);
    event.target.value = "";
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setUser((previous) => ({ ...previous, name: originalName }));
    setSecurity({ newPassword: "", confirmPassword: "" });
    setEditing(false);
    setError("");
    setSuccess("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!user.name.trim()) {
      setError("Full Name is required.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const cleanProfile = {
        language: profile.language,
        dateFormat: profile.dateFormat,
        timeFormat: profile.timeFormat,
        workingDays: profile.workingDays,
        workingHoursStart: profile.workingHoursStart,
        workingHoursEnd: profile.workingHoursEnd,
        phoneNumber: profile.phoneNumber.trim(),
        companyName: profile.companyName.trim(),
        companyLogo: profile.companyLogo,
      };

      await userService.updateCalendarProfile(cleanProfile);

      if (user.name.trim() !== originalName) {
        await userService.updateMyProfile({
          displayName: user.name.trim(),
        });
      }

      setProfile(cleanProfile);
      setOriginalProfile(cleanProfile);
      setOriginalName(user.name.trim());
      setEditing(false);
      setSuccess("Your Calendar profile has been updated successfully.");

      try {
        const savedUser = getSavedUser();
        localStorage.setItem(
          "lms_user",
          JSON.stringify({ ...savedUser, displayName: user.name.trim() })
        );
      } catch {}

      onProfileComplete?.();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to update Calendar profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setSuccess("");

    if (!security.newPassword || !security.confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }

    if (security.newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await authService.changePassword(
        security.newPassword,
        security.confirmPassword
      );

      setSecurity({ newPassword: "", confirmPassword: "" });
      setSuccess("Password updated successfully.");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to update password."
      );
    } finally {
      setSaving(false);
    }
  };

  const completionItems = [
    !!user.name,
    !!user.email,
    !!profile.phoneNumber,
    !!profile.companyName,
    !!profile.language,
    !!profile.workingDays,
    !!profile.workingHoursStart,
    !!profile.workingHoursEnd,
  ];
  const completion = Math.round(
    (completionItems.filter(Boolean).length / completionItems.length) * 100
  );
  const initials = getInitials(user.name);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-[#F5F6F8] dark:bg-[#0a0a0f]">
        <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-500/15 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-pink-600 animate-spin" />
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
          Loading Calendar Profile...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-[#F8F7FA] dark:bg-[#0a0a0f] transition-colors duration-300">
      <div className="w-full max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-10 py-5 sm:py-8 space-y-5 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-pink-600 dark:text-pink-400">
                ILM ORA CALENDAR
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              Manage your personal details and calendar preferences.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Active Account
          </span>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-pink-100 dark:border-white/10 bg-white dark:bg-[#171717] shadow-sm">
          <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-pink-200/30 dark:bg-pink-500/5 blur-3xl pointer-events-none" />
          <div className="relative p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-7">
              <div className="flex items-center gap-4 shrink-0">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white dark:border-white/10 shadow-xl bg-pink-600 flex items-center justify-center">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Calendar profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl sm:text-4xl font-extrabold text-white">
                        {initials}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Change profile photo"
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-pink-600 hover:bg-pink-700 text-white border-4 border-white dark:border-[#171720] shadow-lg flex items-center justify-center transition-transform hover:scale-105"
                  >
                    <Camera size={17} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                {profileImage && (
                  <button
                    type="button"
                    onClick={removeImage}
                    title="Remove profile photo"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white break-words">
                    {user.name || "Calendar User"}
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wide">
                    <BadgeCheck size={13} />
                    Active
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-x-5 text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                  <span className="flex items-center gap-2 min-w-0">
                    <Mail size={15} className="shrink-0" />
                    <span className="truncate">{user.email || "Email not available"}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    Calendar Account
                  </span>
                </div>
                <div className="mt-5 max-w-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-600 dark:text-slate-300">
                      Profile Completion
                    </span>
                    <span className="text-xs font-extrabold text-pink-700 dark:text-pink-400">
                      {completion}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-pink-600 transition-all duration-700"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-2">
                    Complete your details to keep your calendar profile up to date.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:self-start">
                {!editing ? (
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(true);
                      setError("");
                      setSuccess("");
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold shadow-lg shadow-pink-600/20 transition-all hover:-translate-y-0.5"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white text-sm font-semibold"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold disabled:opacity-60"
                    >
                      {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {photoError && (
              <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">
                {photoError}
              </p>
            )}
          </div>
        </section>

        {error && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400">
            <X size={18} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03] p-2">
          <button type="button" onClick={() => setActiveTab("profile")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "profile" ? "bg-pink-600 text-white shadow" : "text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-white/10"}`}>
            <User size={16} /> Profile & Security
          </button>
          <button type="button" onClick={() => setActiveTab("security")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "security" ? "bg-pink-600 text-white shadow" : "text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-white/10"}`}>
            <LockKeyhole size={16} /> Security
          </button>
          <button type="button" onClick={() => setActiveTab("billing")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${activeTab === "billing" ? "bg-pink-600 text-white shadow" : "text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-white/10"}`}>
            <CreditCard size={16} /> Billing & Payments
          </button>
        </div>

        {activeTab === "profile" ? (
        <form onSubmit={handleSave} className="space-y-5">
          <section className="rounded-2xl sm:rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/10">
              <SectionHeading
                icon={User}
                title="Personal Information"
                description="Your personal and contact information."
                color="violet"
              />
            </div>
            <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoField
                label="Full Name"
                icon={User}
                name="name"
                value={user.name}
                editing={editing}
                placeholder="Enter your full name"
                onChange={handleUserChange}
              />
              <InfoField
                label="Email Address"
                icon={Mail}
                value={user.email}
                readOnly
              />
              <InfoField
                label="Phone Number"
                icon={Phone}
                name="phoneNumber"
                value={profile.phoneNumber}
                editing={editing}
                placeholder="Enter phone number"
                type="tel"
                onChange={handleProfileChange}
              />
              <InfoField
                label="Company Name"
                icon={User}
                name="companyName"
                value={profile.companyName}
                editing={editing}
                placeholder="Enter company name"
                onChange={handleProfileChange}
              />
              <div className="min-w-0 space-y-2">
                <label className="block text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                  Company Logo
                </label>
                <div className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.025] p-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center shrink-0">
                    {profile.companyLogo ? (
                      <img
                        src={profile.companyLogo}
                        alt="Company logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <User size={22} className="text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    {editing ? (
                      <>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            if (file.size > 2 * 1024 * 1024) {
                              setPhotoError("Company logo must be smaller than 2 MB.");
                              event.target.value = "";
                              return;
                            }
                            const reader = new FileReader();
                            reader.onload = () => {
                              setProfile((previous) => ({
                                ...previous,
                                companyLogo: String(reader.result || ""),
                              }));
                              setPhotoError("");
                            };
                            reader.readAsDataURL(file);
                            event.target.value = "";
                          }}
                          className="block w-full text-xs text-gray-600 dark:text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-pink-50 dark:file:bg-pink-500/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-pink-700 dark:file:text-pink-300"
                        />
                        <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, WEBP or SVG · Max 2 MB</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-700 dark:text-slate-300">
                        {profile.companyLogo ? "Company logo uploaded" : "No company logo added"}
                      </p>
                    )}
                  </div>
                  {editing && profile.companyLogo && (
                    <button
                      type="button"
                      onClick={() =>
                        setProfile((previous) => ({ ...previous, companyLogo: "" }))
                      }
                      className="text-xs font-semibold text-red-600 dark:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>



          {editing && (
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white text-sm font-semibold"
              >
                <X size={16} />
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold disabled:opacity-60"
              >
                {saving ? <Loader2 size={17} className="animate-spin" /> : <Save size={17} />}
                {saving ? "Saving..." : "Save Profile Details"}
              </button>
            </div>
          )}
        </form>
        ) : activeTab === "security" ? (
          <div className="space-y-5">
            <section className="rounded-2xl sm:rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
              <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-white/10">
                <SectionHeading icon={LockKeyhole} title="Security" description="Manage your account password." color="blue" />
              </div>
              <div className="p-5 sm:p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">New Password</label>
                  <div className="relative">
                    <input type={showNewPassword ? "text" : "password"} value={security.newPassword} onChange={(e) => setSecurity((v) => ({ ...v, newPassword: e.target.value }))} placeholder="Enter new password" autoComplete="new-password" className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 px-4 py-3 pr-12 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500" />
                    <button type="button" onClick={() => setShowNewPassword((v) => !v)} aria-label={showNewPassword ? "Hide new password" : "Show new password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600">
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={security.confirmPassword} onChange={(e) => setSecurity((v) => ({ ...v, confirmPassword: e.target.value }))} placeholder="Confirm new password" autoComplete="new-password" className="w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 px-4 py-3 pr-12 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500" />
                    <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-600">
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button
  type="button"
  onClick={handlePasswordChange}
  disabled={saving}
  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-sm font-bold disabled:opacity-60"
>
  {saving ? <Loader2 size={17} className="animate-spin" /> : <ShieldCheck size={17} />}
  {saving ? "Updating..." : "Update Password"}
</button>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-5">
            <section className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400"><CreditCard size={15} /> Current Subscription</div>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Free Plan</h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">You are currently using the free Calendar plan.</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">Active · ₹0 / month</div>
              </div>
              <div className="grid gap-3 border-t border-gray-100 p-5 dark:border-white/10 sm:grid-cols-3 sm:p-7">
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]"><ShieldCheck className="mb-2 text-emerald-600" size={20} /><p className="text-sm font-semibold text-gray-900 dark:text-white">Basic Calendar</p><p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Core calendar access</p></div>
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]"><CreditCard className="mb-2 text-pink-600" size={20} /><p className="text-sm font-semibold text-gray-900 dark:text-white">No payment due</p><p className="mt-1 text-xs text-gray-500 dark:text-slate-400">No active paid subscription</p></div>
                <div className="rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]"><ReceiptText className="mb-2 text-violet-600" size={20} /><p className="text-sm font-semibold text-gray-900 dark:text-white">Billing history</p><p className="mt-1 text-xs text-gray-500 dark:text-slate-400">No transactions yet</p></div>
              </div>
            </section>
            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment Methods</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">No payment method has been added to this account.</p>
              <button type="button" disabled className="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-400 dark:bg-white/10 dark:text-slate-500"><CreditCard size={16} /> Add Payment Method · Coming Soon</button>
            </section>
            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Billing History</h3>
              <div className="mt-4 rounded-2xl border border-dashed border-gray-200 p-8 text-center dark:border-white/10"><ReceiptText className="mx-auto mb-2 text-gray-400" size={28} /><p className="text-sm font-semibold text-gray-700 dark:text-slate-300">No billing records found</p><p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Your invoices and payment transactions will appear here.</p></div>
            </section>
            <p className="text-xs text-gray-500 dark:text-slate-400">Note: This is the billing UI. Live plan upgrades, payment methods and invoices require subscription/payment backend integration.</p>
          </div>
        )}
      </div>
    </main>
  );
}
