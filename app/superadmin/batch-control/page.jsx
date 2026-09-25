export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminBatchControl from "@/SuperAdmin/admin-control/SuperAdminBatchControl";

export default function Page() {
  return <SuperAdminBatchControl />;
}
