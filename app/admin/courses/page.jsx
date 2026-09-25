export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AllCourses from "@/Admin/AllCourses";

export default function Page() {
  return <AllCourses />;
}
