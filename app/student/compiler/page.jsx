export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import StudentCompilerPage from "@/Student/StudentCompilerPage";

export default function Page() {
  return <StudentCompilerPage />;
}
