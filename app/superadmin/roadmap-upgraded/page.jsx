export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminRoadmapUpgraded from "@/SuperAdmin/roadmap-control/SuperAdminRoadmapUpgraded";

export default function Page() {
  return <SuperAdminRoadmapUpgraded />;
}
