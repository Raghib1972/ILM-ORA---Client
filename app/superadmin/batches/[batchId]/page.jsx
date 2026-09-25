export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import BatchDetailsPage from "@/SuperAdmin/batch-control/BatchDetailsPage";

export default function Page() {
  return <BatchDetailsPage />;
}
