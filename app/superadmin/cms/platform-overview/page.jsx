export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import PlatformOverview from "@/SuperAdmin/cms-management/pages/PlatformOverview";

export default function Page() {
  return <PlatformOverview />;
}
