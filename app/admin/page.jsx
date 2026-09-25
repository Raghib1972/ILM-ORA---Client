export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminDashboard from "@/Admin/AdminDashboard";

export default function Page() {
  return <AdminDashboard />;
}
