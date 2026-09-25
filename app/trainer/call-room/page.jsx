export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import CallRoom from "@/components/live/CallRoom";

export default function Page() {
  return <CallRoom role="trainer" />;
}
