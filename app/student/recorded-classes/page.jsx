export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import RecordedClasses from "@/Student/RecordedClasses";

export default function Page() {
  return <RecordedClasses />;
}
