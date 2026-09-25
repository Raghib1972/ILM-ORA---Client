export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import BatchStudentsPage from "@/Admin/BatchStudentsPage";

export default function Page() {
  return <BatchStudentsPage />;
}
