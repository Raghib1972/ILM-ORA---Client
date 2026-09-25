export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminAttendance from "@/Admin/AdminAttendance";

export default function Page() {
  return <AdminAttendance />;
}
