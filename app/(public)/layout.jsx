import { PublicShellProvider } from "@/context/PublicShellContext";
import dynamic from "next/dynamic";

const GlobalAuthModals = dynamic(() => import("@/components/GlobalAuthModals"), {
  ssr: false,
});

// Provides theme/showLoginModal state to every public page via context.
// Deliberately renders NO Navbar/Footer/PublicLayout here — some pages
// (e.g. the homepage) render their own Navbar/Footer directly, others
// wrap themselves in PublicLayout internally. Rendering shared chrome at
// this route-group level would double it up. See Day 2 report.
export default function PublicRouteGroupLayout({ children }) {
  return (
    <PublicShellProvider>
      {children}
      <GlobalAuthModals />
    </PublicShellProvider>
  );
}
