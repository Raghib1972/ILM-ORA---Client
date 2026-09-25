export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import StudentMeetings from "@/Student/StudentMeetings";

export default function Page() {
  return <StudentMeetings />;
}
