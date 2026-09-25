export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import StudentNotebook from "@/Student/StudentNotebook";

export default function Page() {
  return <StudentNotebook />;
}
