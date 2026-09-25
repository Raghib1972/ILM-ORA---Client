export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminRoadmapUpgradedWizard from "@/SuperAdmin/roadmap-control/SuperAdminRoadmapUpgradedWizard";

export default function Page() {
  return <SuperAdminRoadmapUpgradedWizard />;
}
