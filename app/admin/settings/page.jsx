export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import OrgSettings from "@/Admin/OrgSettings";

export default function Page() {
  return <OrgSettings />;
}
