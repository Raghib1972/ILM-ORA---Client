"use client";


import Careers from "@/legacy-pages/Company/Careers";
import { usePublicShell } from "@/context/PublicShellContext";

export default function Page() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <Careers
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}
