export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import NewOrganizationPage from "@/SuperAdmin/admin-control/NewOrganizationPage";

export default function Page() {
  return <NewOrganizationPage />;
}
