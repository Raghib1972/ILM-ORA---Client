export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import PendingApprovalsPage from "@/SuperAdmin/admin-control/PendingApprovalsPage";

export default function Page() {
  return <PendingApprovalsPage />;
}
