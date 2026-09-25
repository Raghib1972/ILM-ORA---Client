export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminFeedback from "@/Admin/Adminfeedback";

export default function Page() {
  return <AdminFeedback />;
}
