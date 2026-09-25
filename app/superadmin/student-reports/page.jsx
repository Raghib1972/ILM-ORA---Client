export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import StudentReports from "@/SuperAdmin/student-control/StudentReports";

export default function Page() {
  return <StudentReports />;
}
