export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerAttendance from "@/Trainer/Attendance";

export default function Page() {
  return <TrainerAttendance />;
}
