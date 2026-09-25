"use client";

// Root providers for the whole Next app (mounted once in app/layout.jsx).
// Mirrors main.jsx nesting: AvatarProvider > LiveMeetingProvider, plus:
//  - ThemeProvider: SINGLE source of truth for theme (same logic as the
//    latest App.jsx). PublicShellProvider reads it via useTheme().
//  - ErrorBoundary: same root placement as App.jsx.
//  - App.jsx side effects: seedCMSData() and FCM service worker + token.
// Deliberately NOT here: HelmetProvider (replaced by Next metadata),
// GoogleOAuthProvider (App.jsx still has a placeholder clientId; the public
// site handles its own), SuperAdmin-only providers (live in the /superadmin
// layout).
import { useState, useEffect } from "react";
import { AvatarProvider } from "@/context/AvatarContext";
import { LiveMeetingProvider } from "@/context/LiveMeetingContext";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { ThemeProvider } from "@/SuperAdmin/context/ThemeContext";

export default function AppProviders({ children }) {
  // ── Theme (same as App.jsx, hydration-safe) ───────────────
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) setTheme(saved);
    } catch {
      // localStorage unavailable — stay on light
    }
    setMounted(true);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  useEffect(() => {
    // Wait until the saved theme has been read, so we never overwrite the
    // pre-hydration script in app/layout.jsx with the placeholder "light".
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // localStorage unavailable — no-op
    }
  }, [theme, mounted]);

  // ── App.jsx: seedCMSData() on mount ───────────────────────
  useEffect(() => {
    import("@/SuperAdmin/cms-management/services/cmsSeed")
      .then(({ seedCMSData }) => seedCMSData())
      .catch((err) => console.error("CMS seed failed:", err));
  }, []);

  // ── App.jsx: FCM service worker + token ───────────────────
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", { scope: "/" })
        .then((reg) => console.log("✅ FCM SW registered:", reg.scope))
        .catch((err) => console.error("❌ FCM SW registration failed:", err));
    }

    try {
      if (
        typeof Notification !== "undefined" &&
        Notification.permission === "granted" &&
        !localStorage.getItem("fcm_token")
      ) {
        import("@/auth")
          .then(({ default: auth }) => {
            if (!auth.isAuthenticated()) return;
            return import("@/services/firebaseService").then(
              ({ registerFcmToken }) => registerFcmToken(),
            );
          })
          .catch(console.error);
      }
    } catch {
      // localStorage unavailable — skip
    }
  }, []);

  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <AvatarProvider>
        <LiveMeetingProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </LiveMeetingProvider>
      </AvatarProvider>
    </ThemeProvider>
  );
}