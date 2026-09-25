export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminLiveSessions from "@/Admin/AdminLiveSessions";

export default function Page() {
  return <AdminLiveSessions />;
}
