export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import CourseModules from "@/Trainer/TrainerCourseModules";

export default function Page() {
  return <CourseModules />;
}
