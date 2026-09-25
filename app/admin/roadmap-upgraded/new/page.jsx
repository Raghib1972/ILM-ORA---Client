export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminRoadmapUpgradedWizard from "@/Admin/AdminRoadmapUpgradedWizard";

export default function Page() {
  return <AdminRoadmapUpgradedWizard />;
}
