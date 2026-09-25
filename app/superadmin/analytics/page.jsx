export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import AnalyticsDashboard from "@/SuperAdmin/analytics/AnalyticsDashboard";

export default function Page() {
  return <AnalyticsDashboard />;
}
