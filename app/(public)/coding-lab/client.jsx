"use client";


import CodingLabLanding from "@/legacy-pages/Landing/CodingLabLanding";
import { usePublicShell } from "@/context/PublicShellContext";

export default function Page() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <CodingLabLanding
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}
