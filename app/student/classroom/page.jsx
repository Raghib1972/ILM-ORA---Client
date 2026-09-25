export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import StudentClassroomPage from "@/Student/StudentClassroomPage";

export default function Page() {
  return <StudentClassroomPage />;
}
