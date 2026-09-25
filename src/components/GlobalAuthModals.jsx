"use client";

// Mirrors App.jsx: AuthModals mounted once, listening to the single shared
// showLoginModal flag, so it's reachable from every public page's Navbar
// "Login"/"Sign up" button via setShowLoginModal (see PublicShellContext).
// The homepage is the one exception — it manages its own separate local
// login modal instance already (see LMSHomepage.jsx), matching the
// existing app's behavior exactly (see the comment in App.jsx this was
// copied from).
import AuthModals from "@/legacy-pages/Landing/components/AuthModals";
import { usePublicShell } from "@/context/PublicShellContext";

export default function GlobalAuthModals() {
  const { showLoginModal, setShowLoginModal } = usePublicShell();

  return (
    <AuthModals
      showLogin={showLoginModal}
      onCloseLogin={() => setShowLoginModal(false)}
      onOpenLogin={() => setShowLoginModal(true)}
    />
  );
}
