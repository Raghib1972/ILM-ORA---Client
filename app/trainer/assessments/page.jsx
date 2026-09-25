export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerAssessments from "@/Trainer/Assessments";

export default function Page() {
  return <TrainerAssessments />;
}
