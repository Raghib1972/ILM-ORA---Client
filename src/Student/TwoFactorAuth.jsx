"use client";

import React, { useState } from "react";
import { useNavigate, useLocation } from "@/lib/routerCompat";
import { CLAUDE_ACCENT, CLAUDE_ACCENT_SOFT } from "@/design-system";
import {
  Shield,
  ArrowLeft,
  Smartphone,
  Key,
  QrCode,
  AlertCircle,
  CheckCircle,
  Copy,
  Check,
} from "lucide-react";

const TwoFactorAuth = () => {
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

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [backupCodes, setBackupCodes] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedCode, setCopiedCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated QR code and secret key
  const qrCodeUrl = "https://via.placeholder.com/200x200?text=QR+Code";
  const secretKey = "JBSWY3DPEHPK3PXP";

  const handleEnable2FA = () => {
    setShowSetup(true);
    // Generate backup codes
    const codes = Array.from({ length: 8 }, () =>
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setBackupCodes(codes);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (verificationCode.length !== 6) {
        setError("Please enter a valid 6-digit code");
        setIsLoading(false);
        return;
      }

      // Here you would verify with your backend
      setIs2FAEnabled(true);
      setShowSetup(false);
      setSuccess("Two-factor authentication has been enabled successfully!");
      setVerificationCode("");
    } catch (err) {
      setError("Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!window.confirm("Are you sure you want to disable two-factor authentication?")) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIs2FAEnabled(false);
      setSuccess("Two-factor authentication has been disabled.");
    } catch (err) {
      setError("Failed to disable 2FA. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
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
            Two-Factor Authentication
          </h1>
          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
            Add an extra layer of security to your account
          </p>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
          <p className="text-sm font-medium text-green-900 dark:text-green-400">
            {success}
          </p>
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-sm font-medium text-red-900 dark:text-red-400">
            {error}
          </p>
        </div>
      )}

      {/* MAIN CONTENT */}
      {!showSetup ? (
        <div className="space-y-6">
          {/* STATUS CARD */}
          <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl ${
                  is2FAEnabled
                    ? "bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400"
                }`}
              >
                <Shield className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                    Status
                  </h2>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      is2FAEnabled
                        ? "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                        : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-400"
                    }`}
                  >
                    {is2FAEnabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                  {is2FAEnabled
                    ? "Two-factor authentication is currently active on your account."
                    : "Two-factor authentication is not enabled. Enable it to secure your account."}
                </p>
                <button
                  onClick={is2FAEnabled ? handleDisable2FA : handleEnable2FA}
                  disabled={isLoading}
                  className={`mt-4 px-5 py-2.5 rounded-lg font-medium transition-colors text-white ${
                    is2FAEnabled ? "bg-red-600 hover:bg-red-700" : ""
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={is2FAEnabled ? undefined : { background: CLAUDE_ACCENT }}
                >
                  {isLoading
                    ? "Processing..."
                    : is2FAEnabled
                    ? "Disable 2FA"
                    : "Enable 2FA"}
                </button>
              </div>
            </div>
          </div>

          {/* INFO CARDS */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/30">
                  <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-sm">
                    Authenticator App
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 dark:text-slate-400">
                    Use apps like Google Authenticator or Authy to generate verification codes
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg" style={{ background: CLAUDE_ACCENT_SOFT }}>
                  <Key className="w-5 h-5" style={{ color: CLAUDE_ACCENT }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100 text-sm">
                    Backup Codes
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 dark:text-slate-400">
                    Save backup codes to access your account if you lose your device
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SETUP FLOW */
        <div className="space-y-6">
          {/* STEP 1: SCAN QR CODE */}
          <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 rounded-lg" style={{ background: CLAUDE_ACCENT_SOFT }}>
                <QrCode className="w-5 h-5" style={{ color: CLAUDE_ACCENT }} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100">
                  Step 1: Scan QR Code
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                  Open your authenticator app and scan this QR code
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 dark:bg-slate-800 rounded-xl">
              <div className="p-4 bg-white rounded-lg">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-slate-400 mb-2">
                  Or enter this code manually:
                </p>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg">
                  <code className="text-sm font-mono text-gray-900 dark:text-slate-100">
                    {secretKey}
                  </code>
                  <button
                    onClick={() => copyToClipboard(secretKey, "secret")}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
                  >
                    {copiedCode === "secret" ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-600 dark:text-slate-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: VERIFY CODE */}
          <form onSubmit={handleVerifyCode}>
            <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ background: CLAUDE_ACCENT_SOFT }}>
                  <Key className="w-5 h-5" style={{ color: CLAUDE_ACCENT }} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100">
                    Step 2: Verify Code
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>
              </div>

              <input
                type="text"
                maxLength="6"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 text-center text-2xl tracking-widest font-mono rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2"
                style={{ "--tw-ring-color": CLAUDE_ACCENT }}
                placeholder="000000"
              />
            </div>

            {/* STEP 3: BACKUP CODES */}
            <div className="bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950/30">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-slate-100">
                    Step 3: Save Backup Codes
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">
                    Store these codes in a safe place. You'll need them if you lose access to your authenticator.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                {backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded"
                  >
                    <code className="text-sm font-mono text-gray-900 dark:text-slate-100">
                      {code}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(code, index)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded"
                    >
                      {copiedCode === index ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-600 dark:text-slate-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSetup(false);
                  setVerificationCode("");
                  setError("");
                }}
                className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || verificationCode.length !== 6}
                className="flex-1 px-6 py-3 rounded-lg text-white font-medium shadow-sm hover:shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: CLAUDE_ACCENT }}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuth;