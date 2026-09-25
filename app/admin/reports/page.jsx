export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import OrgReports from "@/Admin/OrgReports";

export default function Page() {
  return <OrgReports />;
}
