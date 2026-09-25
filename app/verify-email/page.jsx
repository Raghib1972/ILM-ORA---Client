export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import VerifyEmail from "@/legacy-pages/Auth/VerifyEmail";

export const metadata = {
  title: "Verify Email | ILM ORA",
  // Session/auth-specific pages: content is per-visitor and not meant to
  // be indexed (matches robots.js, which already disallows these paths).
  robots: { index: false, follow: false },
};

export default function Page() {
  return <VerifyEmail />;
}
