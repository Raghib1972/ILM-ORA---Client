export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerFeedback from "@/Trainer/Trainerfeedback";

export default function Page() {
  return <TrainerFeedback />;
}
