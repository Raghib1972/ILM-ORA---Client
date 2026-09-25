export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import StudentFeedback from "@/Student/Studentfeedback";

export default function Page() {
  return <StudentFeedback />;
}
