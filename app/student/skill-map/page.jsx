export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import SkillMap from "@/Student/SkillMap";

export default function Page() {
  return <SkillMap />;
}
