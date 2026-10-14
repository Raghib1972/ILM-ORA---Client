'use client';

import IlmoraCisco from '../../../src/legacy-pages/Landing/Ilmora-cisco';
import { usePublicShell } from '@/context/PublicShellContext';

export default function Client() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <IlmoraCisco
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}