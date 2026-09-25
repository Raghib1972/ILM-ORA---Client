"use client";


import ContactUs from "@/legacy-pages/Company/ContactUs";
import { usePublicShell } from "@/context/PublicShellContext";

export default function Page() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <ContactUs
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}
