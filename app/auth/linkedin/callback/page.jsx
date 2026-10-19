export const dynamic = "force-dynamic"; // reads window.location / localStorage / sessionStorage

import LinkedinCallback from "@/legacy-pages/Auth/LinkedinCallback";

export const metadata = {
  title: "LinkedIn Sign In | ILM ORA",
  // OAuth callback: per-visitor, never index.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LinkedinCallback />;
}
