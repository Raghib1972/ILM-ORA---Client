export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminDashboard from "@/SuperAdmin/dashboard/SuperAdminDashboard";

export default function Page() {
  return <SuperAdminDashboard />;
}
