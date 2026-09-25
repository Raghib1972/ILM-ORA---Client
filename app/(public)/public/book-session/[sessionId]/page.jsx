export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import PublicBooking from "@/legacy-pages/public/PublicBooking";

export const metadata = {
  title: "Book a Session | ILM ORA",
  // Session/auth-specific pages: content is per-visitor and not meant to
  // be indexed (matches robots.js, which already disallows these paths).
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PublicBooking />;
}
