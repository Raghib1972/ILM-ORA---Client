export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import OrganizationPage from "@/SuperAdmin/admin-control/OrganizationPage";

export default function Page() {
  return <OrganizationPage />;
}
