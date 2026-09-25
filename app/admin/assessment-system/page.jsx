export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminAssessmentSystem from "@/Admin/AdminAssessmentSystem";

export default function Page() {
  return <AdminAssessmentSystem />;
}
