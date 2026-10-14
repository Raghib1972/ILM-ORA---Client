"use client";

import IlmoraGoogleCertification from "@/legacy-pages/Landing/ilmora-google-certification";
import { usePublicShell } from "@/context/PublicShellContext";

export default function PageClient() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <IlmoraGoogleCertification
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}