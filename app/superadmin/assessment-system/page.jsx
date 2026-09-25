export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminAssessmentSystem from "@/SuperAdmin/admin-control/SuperAdminAssessmentSystem";

export default function Page() {
  return <SuperAdminAssessmentSystem />;
}
