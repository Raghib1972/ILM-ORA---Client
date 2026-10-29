"use client";

import React, { useEffect, useState } from "react";
import PublicLayout from "./components/PublicLayout";
import ToraCXAgenticCX from "./ToraCXAgenticCX";

/* Same theme flow as iq-test.jsx:
   - own localStorage key "toracx_theme" (falls back to site key "theme")
   - Navbar toggle -> handleToggleTheme -> state -> data-theme on ToraCX root
   - <html> gets class "dark" + data-theme so Navbar/Footer follow too */
export default function Toracxpage({ theme, toggleTheme, scrollToSection }) {
  const controlled = theme === "dark" || theme === "light";
  const [localTheme, setLocalTheme] = useState("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let t = null;
    try {
      t = localStorage.getItem("toracx_theme") || localStorage.getItem("theme");
    } catch (e) {}
    if (t !== "dark" && t !== "light") {
      t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    setLocalTheme(t);
    setReady(true);
  }, []);

  const activeTheme = controlled ? theme : ready ? localTheme : "light";

  const handleToggleTheme = () => {
    if (typeof toggleTheme === "function") toggleTheme();
    if (!controlled) setLocalTheme((p) => (p === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (controlled || !ready) return;
    const de = document.documentElement;
    de.classList.toggle("dark", activeTheme === "dark");
    de.setAttribute("data-theme", activeTheme);
    try {
      localStorage.setItem("toracx_theme", activeTheme);
    } catch (e) {}
  }, [activeTheme, controlled, ready]);

  return (
    <PublicLayout
      theme={activeTheme}
      toggleTheme={handleToggleTheme}
      scrollToSection={scrollToSection}
    >
      <ToraCXAgenticCX theme={activeTheme} />
    </PublicLayout>
  );
}