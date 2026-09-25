export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import StudentDetailsPage from "@/SuperAdmin/student-control/StudentDetailsPage";

export default function Page() {
  return <StudentDetailsPage />;
}
