export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import OrganizationAdminDetailsPage from "@/SuperAdmin/admin-control/OrganizationAdminDetailsPage";

export default function Page() {
  return <OrganizationAdminDetailsPage />;
}
