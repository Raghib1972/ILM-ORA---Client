'use client';

import IlmoraWorkshops from '../../../src/legacy-pages/Landing/Ilmora-workshops';
import { usePublicShell } from '@/context/PublicShellContext';

export default function Client() {
  const { theme, toggleTheme, setShowLoginModal } = usePublicShell();
  return (
    <IlmoraWorkshops
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
    />
  );
}