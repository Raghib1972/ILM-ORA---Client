export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import MyCourses from "@/Student/MyCourses";

export default function Page() {
  return <MyCourses />;
}
