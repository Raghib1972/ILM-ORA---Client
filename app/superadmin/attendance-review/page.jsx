export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminAttendance from "@/SuperAdmin/admin-control/SuperAdminAttendance";

export default function Page() {
  return <SuperAdminAttendance />;
}
