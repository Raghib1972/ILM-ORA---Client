export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import IlmoraMeeting from "@/legacy-pages/public/IlmoraMeeting/src/components/IlmoraMeeting/IlmoraMeeting";

export const metadata = {
  title: "Meeting Room | ILM ORA",
  // Session/auth-specific pages: content is per-visitor and not meant to
  // be indexed (matches robots.js, which already disallows these paths).
  robots: { index: false, follow: false },
};

export default function Page() {
  return <IlmoraMeeting />;
}
