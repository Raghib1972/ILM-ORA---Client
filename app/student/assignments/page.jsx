export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import StudentAssignments from "@/Student/StudentAssignments";

export default function Page() {
  return <StudentAssignments />;
}
