export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import LiveSessionHistory from "@/Trainer/LiveSessionHistory";

export default function Page() {
  return <LiveSessionHistory />;
}
