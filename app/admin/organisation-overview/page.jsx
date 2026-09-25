export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import OrganisationOverview from "@/Admin/OrganisationOverview";

export default function Page() {
  return <OrganisationOverview />;
}
