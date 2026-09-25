export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminProfile from "@/SuperAdmin/profile/SuperAdminProfile";

export default function Page() {
  return <SuperAdminProfile />;
}
