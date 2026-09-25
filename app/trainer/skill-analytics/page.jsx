export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerSkillMap from "@/Trainer/TrainerSkillMap";

export default function Page() {
  return <TrainerSkillMap />;
}
