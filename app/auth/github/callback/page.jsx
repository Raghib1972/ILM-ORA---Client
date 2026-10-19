export const dynamic = "force-dynamic"; // reads window.location / localStorage / sessionStorage

import GithubCallback from "@/legacy-pages/Auth/GithubCallback";

export const metadata = {
  title: "GitHub Sign In | ILM ORA",
  // OAuth callback: per-visitor, never index.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <GithubCallback />;
}
