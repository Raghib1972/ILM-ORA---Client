export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminFiles from "@/Admin/AdminFiles";

export default function Page() {
  return <AdminFiles />;
}
