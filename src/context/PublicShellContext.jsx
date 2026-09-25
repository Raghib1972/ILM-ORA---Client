"use client";

// Replaces App.jsx's showLoginModal state + prop-drilling for public pages.
// Theme comes from the single ThemeProvider in AppProviders (root layout).
// The login modal itself is mounted by <GlobalAuthModals /> in
// app/(public)/layout.jsx — it must NOT also be rendered here, or every
// "Login" click opens two modals.
import { createContext, useContext, useState } from "react";
import { useTheme } from "@/SuperAdmin/context/ThemeContext";

const PublicShellContext = createContext(null);

export function PublicShellProvider({ children }) {
  const { theme, toggleTheme } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <PublicShellContext.Provider
      value={{ theme, toggleTheme, showLoginModal, setShowLoginModal }}
    >
      {children}
    </PublicShellContext.Provider>
  );
}

export function usePublicShell() {
  const ctx = useContext(PublicShellContext);
  if (!ctx) {
    throw new Error("usePublicShell must be used within PublicShellProvider");
  }
  return ctx;
}