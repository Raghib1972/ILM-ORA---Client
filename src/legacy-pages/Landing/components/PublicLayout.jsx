
"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "@/lib/routerCompat";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import AnnouncementBanner from "./AnnouncementBanner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import RelatedLinks, { SITE_LINKS, relatedLinksColors } from "./RelatedLinks";

/* ── Same login popup the LMS homepage uses ──────────────────────────
   NOTE: SignupModal / ForgotPasswordModal live next to LMSHomepage.jsx
   (one level above /components), same for auth + services. If your
   folder layout differs, only these 5 import paths need adjusting. */
import SignupModal from "../SignupModal";
import ForgotPasswordModal from "../ForgotPasswordModal";
import auth from "../../../auth";
import authService from "../../../services/authService";
import {
  getGithubAuthUrl,
  getLinkedinAuthUrl,
} from "../../../services/oauthConfig";

const GOOGLE_CLIENT_ID =
  "572421778240-akk3kkb4f60ukuv9pcfrpg2ielm09thk.apps.googleusercontent.com";

/* ─────────────────────────────────────────────────────────────────
   PublicLayout — shared shell for all public-facing pages
   (Pricing, Careers, About, Contact, FAQ, Help Center, Privacy
   Policy, Terms of Service, Study Abroad, Student/Trainer/Manager
   Hub, Resume Builder, FDE Academy, etc.)

   Scope:
     AnnouncementBanner → Navbar → {children} → Footer
     + the shared Login / Signup / Forgot-password popups

   The login popup (Google / GitHub / LinkedIn / email+password) is
   owned by this layout, so every page that renders through
   PublicLayout gets a working "Get Started" button with NO per-page
   changes. A `setShowLoginModal` prop is still accepted for backwards
   compatibility but is no longer needed.

   Footer expects a `scrollToSection(sectionId, tabName?)` callback —
   on the LMS homepage this drives the course-tab state. Public pages
   don't have that section content, so unless a page passes its own
   `scrollToSection`, Footer section links just send the visitor to the
   homepage via `#sectionId`.
───────────────────────────────────────────────────────────────── */
const EV_LOGIN = "ilmora:open-login";
const EV_SIGNUP = "ilmora:open-signup";
const EV_CLOSE = "ilmora:close-auth";

const fire = (name) => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(name));
};
export const openLoginModal = () => fire(EV_LOGIN);
export const openSignupModal = () => fire(EV_SIGNUP);
export const closeAuthModals = () => fire(EV_CLOSE);

export function PublicAuthModals() {
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [showModalPw, setShowModalPw] = useState(false);

  useEffect(() => {
    const onLogin = () => {
      setShowSignupModal(false);
      setShowForgotModal(false);
      setShowLoginModal(true);
    };
    const onSignup = () => {
      setShowLoginModal(false);
      setShowForgotModal(false);
      setShowSignupModal(true);
    };
    const onClose = () => {
      setShowLoginModal(false);
      setShowSignupModal(false);
      setShowForgotModal(false);
    };
    window.addEventListener(EV_LOGIN, onLogin);
    window.addEventListener(EV_SIGNUP, onSignup);
    window.addEventListener(EV_CLOSE, onClose);
    return () => {
      window.removeEventListener(EV_LOGIN, onLogin);
      window.removeEventListener(EV_SIGNUP, onSignup);
      window.removeEventListener(EV_CLOSE, onClose);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowLoginModal(false);
    };
    if (showLoginModal) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showLoginModal]);

  /* Same role redirect as LMSHomepage / Login.jsx / OAuth callbacks */
  const redirectByRole = (role) => {
    switch ((role || "").toUpperCase()) {
      case "SUPER_ADMIN":
        navigate("/superadmin", { replace: true });
        break;
      default:
        navigate("/ilm-demo", { replace: true });
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (modalLoading) return;
    setModalLoading(true);
    try {
      const ok = await auth.login({
        email: modalEmail,
        password: modalPassword,
      });
      if (ok) {
        const role = (auth.getCurrentRole() || "STUDENT").toUpperCase();
        localStorage.setItem("role", role);
        setShowLoginModal(false);
        redirectByRole(role);
      } else {
        alert("Login failed! Check your credentials.");
      }
    } catch (err) {
      alert("Login error: " + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleModalGoogle = async (res) => {
    try {
      localStorage.removeItem("lms_token");
      localStorage.removeItem("lms_user");
      localStorage.removeItem("role");

      const dec = jwtDecode(res.credential);

      const check = await authService.checkGoogleUser({
        idToken: res.credential,
      });

      // EXISTING USER
      if (check.isNewUser === false && check.token && check.role) {
        const role = check.role.toUpperCase();
        localStorage.setItem("lms_token", check.token);
        localStorage.setItem("role", role);

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
        setShowLoginModal(false);
        redirectByRole(role);
        return;
      }

      // BRAND NEW USER
      const googleInfo = {
        name: dec.name,
        email: dec.email,
        googleCredential: res.credential,
      };
      sessionStorage.setItem("ilmora_google_credential", res.credential);
      sessionStorage.setItem("ilmora_google_user", JSON.stringify(googleInfo));

      localStorage.setItem(
        "lms_user",
        JSON.stringify({
          name: dec.name,
          email: dec.email,
          isGoogleUser: true,
          isNewUser: true,
          profileCompleted: false,
        }),
      );

      setShowLoginModal(false);
      navigate("/ilm-demo", { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Google login failed. Please try again.";
      alert(message);
    }
  };

    return (
    <>
      {/* ── Login Modal ── */}
      {showLoginModal && (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(5px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowLoginModal(false);
            }}
          >
            <div
              className="relative w-full max-w-md rounded-2xl shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(249,115,22,0.18)",
                padding: "20px 26px 18px",
                animation: "modalFadeUp 0.3s ease both",
              }}
            >
              <style>{`@keyframes modalFadeUp { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>

              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition text-xl font-bold leading-none"
                aria-label="Close"
              >
                ×
              </button>

              <div className="flex justify-center mb-2">
                <span className="text-3xl font-extrabold font-serif tracking-wide">
                  <span className="text-green-600">ILM</span>
                  <span className="text-[#F97316] ml-2">ORA</span>
                </span>
              </div>

              <div className="text-center mb-3">
                <h2 className="text-lg font-bold text-[#1e0e02] mb-0.5">
                  Welcome back!
                </h2>
              </div>

              <div className="flex justify-center mb-3">
                <GoogleLogin
                  onSuccess={handleModalGoogle}
                  onError={() => console.error("Google OAuth failed")}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="360"
                  auto_select={false}
                  cancel_on_tap_outside={true}
                />
              </div>

              {/* ADDED FROM REACT: GitHub / LinkedIn login buttons */}
              <div className="flex flex-col gap-2.5 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = getGithubAuthUrl();
                  }}
                  className="w-full py-2.5 rounded-lg border border-gray-300 bg-white flex items-center justify-center gap-2.5 text-sm font-medium text-[#1a0e06] hover:bg-gray-50 transition"
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
                  onClick={() => {
                    window.location.href = getLinkedinAuthUrl();
                  }}
                  className="w-full py-2.5 rounded-lg border border-gray-300 bg-white flex items-center justify-center gap-2.5 text-sm font-medium text-[#1a0e06] hover:bg-gray-50 transition"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#0A66C2"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                  Continue with LinkedIn
                </button>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(180,100,30,0.15)" }}
                />
                <span className="text-xs text-[#b8906a] uppercase tracking-widest font-medium">
                  OR
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(180,100,30,0.15)" }}
                />
              </div>

              <form onSubmit={handleModalSubmit}>
                <div className="mb-2">
                  <label className="block text-xs font-bold text-[#8a6040] mb-1 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    required
                    disabled={modalLoading}
                    className="w-full px-3.5 py-2 rounded-xl text-sm text-[#1a0e06] placeholder-[#c0a070] outline-none transition-all disabled:opacity-50"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1.5px solid rgba(180,120,60,0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#F97316";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(249,115,22,0.1)";
                      e.target.style.background = "#fff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(180,120,60,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div className="mb-1.5">
                  <label className="block text-xs font-bold text-[#8a6040] mb-1 uppercase tracking-widest">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showModalPw ? "text" : "password"}
                      placeholder="Enter your password"
                      value={modalPassword}
                      onChange={(e) => setModalPassword(e.target.value)}
                      required
                      disabled={modalLoading}
                      className="w-full px-3.5 py-2 pr-11 rounded-xl text-sm text-[#1a0e06] placeholder-[#c0a070] outline-none transition-all disabled:opacity-50"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        border: "1.5px solid rgba(180,120,60,0.2)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#F97316";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(249,115,22,0.1)";
                        e.target.style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(180,120,60,0.2)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalPw((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8906a] hover:text-[#F97316] transition p-0 bg-transparent border-none cursor-pointer"
                      tabIndex={-1}
                    >
                      {showModalPw ? (
                        <svg
                          width="16"
                          height="16"
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
                      ) : (
                        <svg
                          width="16"
                          height="16"
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
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-right mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowForgotModal(true);
                    }}
                    className="text-xs text-[#F97316] hover:underline bg-transparent border-none cursor-pointer font-medium p-0"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="w-full py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#F97316,#ea580c)",
                    boxShadow: "0 4px 18px rgba(249,115,22,0.32)",
                  }}
                >
                  {modalLoading ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>
              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
                className="w-full mt-2.5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                style={{
                  background: "transparent",
                  border: "2px solid #16a34a",
                  color: "#16a34a",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#16a34a";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#16a34a";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <path d="M2 12h20" />
                </svg>
                Sign up
              </button>

              <div className="text-center mt-3">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-xs text-[#b8906a] hover:text-[#8a6040] bg-transparent border-none cursor-pointer transition-colors"
                >
                  ← Back to home
                </button>
              </div>
            </div>
          </div>
        </GoogleOAuthProvider>
      )}
      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
            {showForgotModal && (
        <ForgotPasswordModal
          onClose={() => setShowForgotModal(false)}
          onSwitchToLogin={() => {
            setShowForgotModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
}

export default function PublicLayout({
  theme,
  toggleTheme,
  // eslint-disable-next-line no-unused-vars
  setShowLoginModal: _ignoredExternalSetter,
  scrollToSection,
  children,
}) {
  const navigate = useNavigate();

  const handleScrollToSection =
    scrollToSection || ((sectionId) => navigate(`/#${sectionId}`));

  return (
    <>
      <AnnouncementBanner />

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        setShowLoginModal={(open) =>
          open ? openLoginModal() : closeAuthModals()
        }
      />

      {/* Navbar is `fixed` — same 84px offset AnnouncementBanner uses. */}
      <main className="pt-[84px]">{children}</main>

      <RelatedLinks colors={relatedLinksColors(theme === "dark")} links={SITE_LINKS} />

      <Footer scrollToSection={handleScrollToSection} />

      <PublicAuthModals />
    </>
  );
}