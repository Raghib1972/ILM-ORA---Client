export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminControlPage from "@/SuperAdmin/admin-control/AdminControlPage";

export default function Page() {
  return <AdminControlPage />;
}
