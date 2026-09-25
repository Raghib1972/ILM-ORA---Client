export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import StartLiveSession from "@/Trainer/StartLiveSession";

export default function Page() {
  return <StartLiveSession />;
}
