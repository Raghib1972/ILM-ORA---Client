"use client";

import React, { useState } from "react";
import { useNavigate, useLocation } from "@/lib/routerCompat";
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { CLAUDE_ACCENT } from "@/design-system";

const UpdateEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getBasePath = () => {
    if (location.pathname.startsWith("/student")) return "/student";
    if (location.pathname.startsWith("/trainer")) return "/trainer";
    if (location.pathname.startsWith("/admin")) return "/admin";
    if (location.pathname.startsWith("/business")) return "/business";
    return "";
  };

  const basePath = getBasePath();

  const [formData, setFormData] = useState({
    currentEmail: "student@example.com", // This should come from user context/API
    newEmail: "",
    confirmEmail: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newEmail) {
      newErrors.newEmail = "New email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.newEmail)) {
      newErrors.newEmail = "Please enter a valid email address";
    }

    if (!formData.confirmEmail) {
      newErrors.confirmEmail = "Please confirm your email";
    } else if (formData.newEmail !== formData.confirmEmail) {
      newErrors.confirmEmail = "Email addresses do not match";
    }

    if (!formData.password) {
      newErrors.password = "Password is required to verify your identity";
    }

    if (formData.newEmail === formData.currentEmail) {
      newErrors.newEmail = "New email must be different from current email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Here you would call your API
      // await userService.updateEmail(formData);
      
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate(`${basePath}/settings`);
      }, 2000);
    } catch (error) {
      setErrors({ submit: "Failed to update email. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`${basePath}/settings`)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-slate-300" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-slate-100">
            Update Email Address
          </h1>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
            Change the email address associated with your account
          </p>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-green-900 dark:text-green-400">
              Email updated successfully!
            </p>
            <p className="text-xs text-green-700 dark:text-green-500 mt-0.5">
              A verification email has been sent to your new address.
            </p>
          </div>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errors.submit && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium text-red-900 dark:text-red-400">
            {errors.submit}
          </p>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 space-y-6">
          {/* CURRENT EMAIL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300">
              <Mail className="w-4 h-4" />
              Current Email
            </label>
            <div className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
              <p className="text-sm text-gray-600 dark:text-slate-400">
                {formData.currentEmail}
              </p>
            </div>
          </div>

          {/* NEW EMAIL */}
          <div className="space-y-2">
            <label
              htmlFor="newEmail"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300"
            >
              <Mail className="w-4 h-4" />
              New Email Address
            </label>
            <input
              id="newEmail"
              name="newEmail"
              type="email"
              value={formData.newEmail}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.newEmail
                  ? "border-red-300 dark:border-red-700"
                  : "border-gray-300 dark:border-slate-600"
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
              style={{ "--tw-ring-color": CLAUDE_ACCENT }}
              placeholder="your.new.email@example.com"
            />
            {errors.newEmail && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.newEmail}
              </p>
            )}
          </div>

          {/* CONFIRM EMAIL */}
          <div className="space-y-2">
            <label
              htmlFor="confirmEmail"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300"
            >
              <Mail className="w-4 h-4" />
              Confirm New Email
            </label>
            <input
              id="confirmEmail"
              name="confirmEmail"
              type="email"
              value={formData.confirmEmail}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.confirmEmail
                  ? "border-red-300 dark:border-red-700"
                  : "border-gray-300 dark:border-slate-600"
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
              style={{ "--tw-ring-color": CLAUDE_ACCENT }}
              placeholder="Confirm your new email"
            />
            {errors.confirmEmail && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmEmail}
              </p>
            )}
          </div>

          {/* PASSWORD VERIFICATION */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-slate-300"
            >
              Current Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password
                  ? "border-red-300 dark:border-red-700"
                  : "border-gray-300 dark:border-slate-600"
              } bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
              style={{ "--tw-ring-color": CLAUDE_ACCENT }}
              placeholder="Enter your password to confirm"
            />
            {errors.password && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-slate-500">
              We need your password to verify your identity
            </p>
          </div>
        </div>

        {/* INFO BOX */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-400">
                Important Information
              </p>
              <ul className="text-xs text-blue-700 dark:text-blue-500 space-y-1 list-disc list-inside">
                <li>A verification email will be sent to your new address</li>
                <li>You'll need to verify your new email within 24 hours</li>
                <li>Your current email will remain active until verification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(`${basePath}/settings`)}
            className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || success}
            className="flex-1 px-6 py-3 rounded-lg text-white font-medium shadow-sm hover:shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: CLAUDE_ACCENT }}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating...
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Updated!
              </>
            ) : (
              "Update Email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmail;