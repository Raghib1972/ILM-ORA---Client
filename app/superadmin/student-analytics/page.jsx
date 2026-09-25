export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import StudentAnalytics from "@/SuperAdmin/student-control/StudentAnalytics";

export default function Page() {
  return <StudentAnalytics />;
}
