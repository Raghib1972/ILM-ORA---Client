"use client";

import IlmoraCertification from "@/legacy-pages/Landing/ilmora-aws-certification";
import { usePublicShell } from "@/context/PublicShellContext";

export default function PageClient() {
  const {
    theme,
    toggleTheme,
    setShowLoginModal,
    scrollToSection,
  } = usePublicShell();

  return (
    <IlmoraCertification
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
      scrollToSection={scrollToSection}
    />
  );
}