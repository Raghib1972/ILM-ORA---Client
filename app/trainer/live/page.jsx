export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerLiveClasses from "@/Trainer/TrainerLiveClasses";

export default function Page() {
  return <TrainerLiveClasses />;
}
