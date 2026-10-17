"use client";

import React, { useState } from "react";
import { useNavigate } from "@/lib/routerCompat";
import { Mail } from "lucide-react";
import authService from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const value = email.trim();
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      // NOTE: agar authService mein method ka naam alag hai
      // (jaise sendResetLink / requestPasswordReset), sirf yahi ek line badlo.
      await authService.forgotPassword(email.trim());
      setMessage("Reset link sent! Please check your email inbox.");
    } catch (err) {
      setError(err?.response?.data?.message || "Could not send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6EDE6] px-4 py-10">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-gray-100 px-8 pt-8 pb-7">
        {/* Logo */}
        <div className="text-center">
          <span
            className="text-[32px] font-extrabold tracking-wide leading-none cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-green-600">ILM</span>
            <span className="text-[#EA580C] ml-2">ORA</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-center text-[22px] font-bold text-gray-900">
          Reset Password
        </h2>
        <p className="mt-1.5 text-center text-[13px] italic text-[#EA580C]">
          Enter your registered email to receive reset link
        </p>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {message && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-600">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          <label
            htmlFor="forgot-email"
            className="block text-[11px] font-bold tracking-wider uppercase text-[#EA580C] mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" />
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/40 focus:border-[#EA580C] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full bg-[#EA580C] hover:bg-[#d94f08] text-white font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[13px] text-[#EA580C] hover:underline bg-transparent border-none cursor-pointer"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;