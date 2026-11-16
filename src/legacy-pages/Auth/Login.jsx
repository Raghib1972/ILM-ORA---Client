"use client";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@/lib/routerCompat";
import auth from "../../auth";
import authService from "../../services/authService";
import { registerFcmToken } from "../../services/firebaseService";
import { getRoleHomeRoute } from "@/utils/roleHomeRedirect";
// ADDED FROM REACT: GitHub / LinkedIn OAuth URL helpers
import {
  getGithubAuthUrl,
  getLinkedinAuthUrl,
} from "../../services/oauthConfig";
const GOOGLE_CLIENT_ID =
  "572421778240-akk3kkb4f60ukuv9pcfrpg2ielm09thk.apps.googleusercontent.com";

const TexoraLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ─── UI only: Google button must follow container width ───────────
     GoogleLogin renders an iframe with a fixed pixel width (was "372"),
     which overflowed on phones. We measure the wrapper and pass that
     width instead (Google accepts 200–400px). */
  const googleWrapRef = useRef(null);
  const [googleWidth, setGoogleWidth] = useState(320);
  useEffect(() => {
    const el = googleWrapRef.current;
    if (!el) return;
    const measure = () => {
      const w = Math.max(200, Math.min(400, Math.floor(el.clientWidth)));
      setGoogleWidth((prev) => (prev === w ? prev : w));
    };
    measure();
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const redirectByRole = (role) => {
    navigate(getRoleHomeRoute(role), { replace: true });
  };
  /* ─── FCM helper ─────────────────────────────────── */
  const tryRegisterFcm = () => {
    if (Notification.permission === "granted") {
      registerFcmToken().catch(console.error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const ok = await auth.login({ email, password });
      console.log("login result:", ok);
      console.log("stored role:", auth.getCurrentRole());
      if (ok) {
        const role = (auth.getCurrentRole() || "STUDENT").toUpperCase();
        console.log("redirecting with role:", role);
        localStorage.setItem("role", role);
        // lms_user was never being written for email/password logins at all.
        // Seed a safe default — it self-corrects to the real backend value
        // the moment this user saves any Details tab (see B1–B5).
        // localStorage.setItem(
        //   "lms_user",
        //   JSON.stringify({
        //     email,
        //     role: ["TENANT_ADMIN", "ADMIN", "BUSINESS"].includes(role)
        //       ? "admin"
        //       : role.toLowerCase(),
        //     profileCompleted: false,
        //   }),
        // );
        localStorage.setItem(
          "lms_user",
          JSON.stringify({
            email,
            role: ["TENANT_ADMIN", "ADMIN", "BUSINESS"].includes(role)
              ? "admin"
              : role.toLowerCase(),
            profileCompleted: false,
            organizationId: localStorage.getItem("organizationId") || null,
          }),
        );
        tryRegisterFcm();
        redirectByRole(role);
      } else {
        alert("Login failed! Check your credentials.");
      }
    } catch (err) {
      alert(err?.response?.data?.message || err?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (res) => {
    try {
      localStorage.removeItem("lms_token");
      localStorage.removeItem("lms_user");
      localStorage.removeItem("role");

      const dec = jwtDecode(res.credential);
      const check = await authService.checkGoogleUser({
        idToken: res.credential,
      });

      // ADD THIS — tells us exactly what backend returned
      console.log("CHECK FULL OBJECT:", JSON.stringify(check));
      console.log("isNewUser:", check.isNewUser, typeof check.isNewUser);
      console.log("token:", check.token);
      console.log("role:", check.role);

      if (check.isNewUser === false && check.token && check.role) {
        const role = check.role.toUpperCase();
        localStorage.setItem("lms_token", check.token);
        localStorage.setItem("role", role);
        // ✅ ADD THESE 3 LINES
        if (check.organizationId) {
          localStorage.setItem("organizationId", check.organizationId);
        } else {
          localStorage.removeItem("organizationId");
        }
        localStorage.setItem(
          "lms_user",
          JSON.stringify({
            name: check.name || dec.name,
            email: check.email || dec.email,
            role: ["TENANT_ADMIN", "ADMIN", "BUSINESS"].includes(role)
              ? "admin"
              : role.toLowerCase(),
            isGoogleUser: true,
            profileCompleted: true,
            organizationId: check.organizationId || null,
          }),
        );
        tryRegisterFcm();
        redirectByRole(role);
        return;
      }

      // Falls here only if condition above failed
      console.log(
        "⚠️ NEW GOOGLE USER — sending to ilm-demo for role selection",
      );
      const googleInfo = {
        name: dec.name,
        email: dec.email,
        googleCredential: res.credential,
      };
      sessionStorage.setItem("ilmora_google_credential", res.credential);
      sessionStorage.setItem("ilmora_google_user", JSON.stringify(googleInfo));
      // isNewUser:true is what IlmOraDemoPage checks on mount to open the
      // Step 4 Role Selection Toast automatically.
      localStorage.setItem(
        "lms_user",
        JSON.stringify({ name: dec.name, email: dec.email, isNewUser: true }),
      );
      navigate("/onboarding", { replace: true });
    } catch (err) {
      console.error("Google login error:", err);
      alert(err?.response?.data?.message || err?.message || "Login failed");
    }
  };
  const handleGoogleError = () => console.error("Google OAuth failed");

  /* ─── SVG Icons ──────────────────────────────────── */
  const EyeOpen = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOff = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  /* ══════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pg {
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          background: #f5ece1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow-x: hidden;
          padding: clamp(12px, 3vh, 28px) 16px;
        }

        .pg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(180,100,30,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        .card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 400px;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(8px, 1.6vh, 14px);
          animation: fadeUp 0.55s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 0;
          cursor: pointer;
        }
        .logo-ilm,
        .logo-ora {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.9rem, 4.6vh, 2.3rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.01em;
        }
        .logo-ilm { color: #16a34a; }
        .logo-ora { color: #F97316; margin-left: 8px; }

        .heading { text-align: center; width: 100%; }
        .heading h2 {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.1rem, 2.6vh, 1.3rem);
          font-weight: 700;
          color: #1e0e02;
          margin-bottom: 4px;
        }
        .heading p {
          font-size: 0.8rem;
          line-height: 1.4;
          color: #8a6040;
          overflow-wrap: anywhere;
        }

        .form-box {
          width: 100%;
          min-width: 0;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(249,115,22,0.16);
          border-radius: 18px;
          padding: clamp(14px, 2.6vh, 22px) 22px;
          backdrop-filter: blur(16px);
          box-shadow: 0 16px 44px rgba(160,80,20,0.12), 0 2px 8px rgba(160,80,20,0.05);
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* Google button wrapper — never wider than the card */
        .google-wrap {
          width: 100%;
          min-width: 0;
          min-height: 40px;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }
        .google-wrap > div { max-width: 100%; }
        .google-wrap iframe { max-width: 100% !important; }

        /* GitHub / LinkedIn buttons — same height as Google's "large" button */
        .oauth-btn-row {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
          width: 100%;
        }
        .oauth-btn {
          width: 100%;
          height: 40px;
          padding: 0 12px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.85rem;
          color: #1a0e06;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s;
        }
        .oauth-btn:hover { background: #fffaf5; border-color: rgba(249,115,22,0.45); }
        .oauth-btn svg { flex-shrink: 0; }

        .or-div {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .or-line { flex: 1; height: 1px; background: rgba(180,100,30,0.15); }
        .or-text  { font-size: 0.7rem; color: #b8906a; letter-spacing: 0.1em; text-transform: uppercase; }

        .field { margin-bottom: 10px; }
        .field label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: #8a6040;
          margin-bottom: 4px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .field input {
          width: 100%;
          min-width: 0;
          padding: 9px 13px;
          background: rgba(255,255,255,0.8);
          border: 1.5px solid rgba(180,120,60,0.2);
          border-radius: 10px;
          color: #1a0e06;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .field input::placeholder { color: #c0a070; }
        .field input:focus {
          border-color: #F97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
          background: #fff;
        }
        .field input:disabled { opacity: 0.5; cursor: not-allowed; }

        .pw-wrap { position: relative; }
        .pw-wrap input { padding-right: 44px; }
        .eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #b8906a;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: color 0.2s;
          line-height: 1;
        }
        .eye-btn:hover { color: #F97316; }

        .sub-btn {
          width: 100%;
          padding: 11px;
          background: linear-gradient(135deg, #F97316, #ea580c);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.92rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          box-shadow: 0 4px 16px rgba(249,115,22,0.3);
        }
        .sub-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .sub-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .spinner {
          display: inline-block;
          width: 13px; height: 13px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .forgot-row { text-align: right; margin: 0 0 10px; }
        .forgot-row button {
          background: none; border: none; cursor: pointer;
          color: #F97316;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem; font-weight: 500;
        }
        .forgot-row button:hover { text-decoration: underline; }

        .back-link {
          text-align: center;
          font-size: 0.76rem;
          color: #b8906a;
          margin-top: 10px;
        }
        .back-link button {
          background: none; border: none; cursor: pointer;
          color: #b8906a;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.76rem;
        }
        .back-link button:hover { color: #8a6040; }

        /* ── Tablets (iPad / iPad Mini / Android tablets) ── */
        @media (min-width: 768px) {
          .card { max-width: 420px; }
        }

        /* ── Phones (Pixel, Galaxy, iPhone, iPhone SE) ── */
        @media (max-width: 600px) {
          .pg {
            justify-content: flex-start;
            padding: 20px 14px 96px; /* bottom space keeps chatbot FAB off the content */
          }
          .card { max-width: 100%; }
          .form-box { padding: 16px 14px; border-radius: 16px; }
          /* 16px stops iOS Safari auto-zooming on input focus */
          .field input { font-size: 16px; padding: 10px 12px; }
          .pw-wrap input { padding-right: 42px; }
        }

        @media (max-width: 360px) {
          .pg { padding-left: 10px; padding-right: 10px; }
          .form-box { padding: 14px 10px; }
          .oauth-btn { font-size: 0.8rem; gap: 8px; }
        }

        /* ── Short laptop screens (e.g. 1366x768 with browser chrome) ── */
        @media (min-width: 601px) and (max-height: 700px) {
          .pg { padding-top: 10px; padding-bottom: 10px; }
          .card { gap: 8px; }
          .form-box { padding: 14px 20px; }
          .google-wrap { margin-bottom: 8px; }
          .oauth-btn { height: 38px; }
          .oauth-btn-row { gap: 6px; margin-bottom: 8px; }
          .or-div { margin-bottom: 8px; }
          .field { margin-bottom: 8px; }
          .field input { padding: 8px 12px; }
          .forgot-row { margin-bottom: 8px; }
          .sub-btn { padding: 10px; }
          .back-link { margin-top: 8px; }
        }
      `}</style>

      <div className="pg">
        <div className="card">
          {/* Logo */}
          <div className="logo-badge" onClick={() => navigate("/")}>
            <span className="logo-ilm">ILM</span>
            <span className="logo-ora">ORA</span>
          </div>

          {/* Heading */}
          <div className="heading">
            <h2>Welcome back!</h2>
            <p>Sign in with Google to get started, or use your email below.</p>
          </div>

          {/* Form box */}
          <div className="form-box">
            {/* Google Login */}
            <div className="google-wrap" ref={googleWrapRef}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
                width={String(googleWidth)}
                auto_select={false}
                cancel_on_tap_outside={true}
              />
            </div>

            {/* ADDED FROM REACT: GitHub / LinkedIn — redirect-based, same visual row */}
            <div className="oauth-btn-row">
              <button
                type="button"
                className="oauth-btn"
                onClick={() => {
                  window.location.href = getGithubAuthUrl();
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                Continue with GitHub
              </button>

              <button
                type="button"
                className="oauth-btn"
                onClick={() => {
                  window.location.href = getLinkedinAuthUrl();
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
                Continue with LinkedIn
              </button>
            </div>

            {/* OR divider */}
            <div className="or-div">
              <div className="or-line" />
              <span className="or-text">OR</span>
              <div className="or-line" />
            </div>

            {/* Email / Password form */}
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="field">
                <label htmlFor="login-password">Password</label>
                <div className="pw-wrap">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword((p) => !p)}
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff /> : <EyeOpen />}
                  </button>
                </div>
              </div>

              <div className="forgot-row">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="sub-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner" />
                    Signing in…
                  </>
                ) : (
                  "Log in"
                )}
              </button>
            </form>

            <div className="back-link">
              <button onClick={() => navigate("/")}>← Back to home</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Login() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <TexoraLogin />
    </GoogleOAuthProvider>
  );
}