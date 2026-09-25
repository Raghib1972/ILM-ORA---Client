export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import LiveAttendanceReport from "@/Trainer/LiveAttendanceReport";

export default function Page() {
  return <LiveAttendanceReport />;
}
