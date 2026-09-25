export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import StudentControlPage from "@/SuperAdmin/student-control/StudentControlPage";

export default function Page() {
  return <StudentControlPage />;
}
