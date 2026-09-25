export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminFeedback from "@/SuperAdmin/admin-control/SuperAdminFeedback";

export default function Page() {
  return <SuperAdminFeedback />;
}
