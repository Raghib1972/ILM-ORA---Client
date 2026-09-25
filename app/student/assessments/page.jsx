export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import Assessments from "@/Student/Assessments";

export default function Page() {
  return <Assessments />;
}
