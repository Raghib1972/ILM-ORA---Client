export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SecuritySettings from "@/SuperAdmin/settings/SecuritySettings";

export default function Page() {
  return <SecuritySettings />;
}
