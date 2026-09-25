export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import LiveSessionControls from "@/Trainer/LiveSessionControls";

export default function Page() {
  return <LiveSessionControls />;
}
