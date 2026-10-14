"use client";

import IlmoraMicrosoft from "@/legacy-pages/Landing/Ilmora-Microsoft";
import { usePublicShell } from "@/context/PublicShellContext";

export default function PageClient() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <IlmoraMicrosoft
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}