export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import Attendance from "@/Student/Attendance";

export default function Page() {
  return <Attendance />;
}
