export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import OrganizationDetailsPage from "@/SuperAdmin/admin-control/OrganizationDetailsPage";

export default function Page() {
  return <OrganizationDetailsPage defaultTab="trainers" />;
}
