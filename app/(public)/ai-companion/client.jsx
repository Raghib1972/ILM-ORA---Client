"use client";


import AiCompanionLanding from "@/legacy-pages/Landing/Aicampanion";
import { usePublicShell } from "@/context/PublicShellContext";

export default function Page() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <AiCompanionLanding
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}
