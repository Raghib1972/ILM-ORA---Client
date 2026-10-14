"use client";

import IlmoraCertDetail from "@/legacy-pages/Landing/Ilmora-aws-CertDetail";
import { usePublicShell } from "@/context/PublicShellContext";

export default function PageClient() {
  const {
    theme,
    toggleTheme,
    setShowLoginModal,
    scrollToSection,
  } = usePublicShell();

  return (
    <IlmoraCertDetail
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
      scrollToSection={scrollToSection}
    />
  );
}