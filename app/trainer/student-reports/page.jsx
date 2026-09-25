export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import StudentReports from "@/Trainer/StudentReports";

export default function Page() {
  return <StudentReports />;
}
