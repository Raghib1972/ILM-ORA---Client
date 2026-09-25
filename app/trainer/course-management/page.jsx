export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import CourseManagement from "@/Trainer/TrainerCourseManagement";

export default function Page() {
  return <CourseManagement />;
}
