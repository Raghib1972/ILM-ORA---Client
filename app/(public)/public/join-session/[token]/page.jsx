export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import PublicJoinSession from "@/legacy-pages/public/PublicJoinSession";

export const metadata = {
  title: "Join Session | ILM ORA",
  // Session/auth-specific pages: content is per-visitor and not meant to
  // be indexed (matches robots.js, which already disallows these paths).
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PublicJoinSession />;
}
