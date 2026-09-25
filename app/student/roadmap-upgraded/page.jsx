export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import StudentRoadmapUpgraded from "@/Student/StudentRoadmapUpgraded";

export default function Page() {
  return <StudentRoadmapUpgraded />;
}
