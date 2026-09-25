export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminCourseManagement from "@/SuperAdmin/admin-control/SuperAdminCourseManagement";

export default function Page() {
  return <SuperAdminCourseManagement />;
}
