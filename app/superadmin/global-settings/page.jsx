export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import GlobalSettings from "@/SuperAdmin/settings/GlobalSettings";

export default function Page() {
  return <GlobalSettings />;
}
