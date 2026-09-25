export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import StudentCourseView from "@/Student/StudentCourseView";

export default function Page() {
  return <StudentCourseView />;
}
