"use client";


import Pricing from "@/legacy-pages/Company/Pricing";
import { usePublicShell } from "@/context/PublicShellContext";

export default function Page() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <Pricing
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}
