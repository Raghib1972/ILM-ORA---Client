export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AccessControlPage from "@/Admin/AccessControlPage";

export default function Page() {
  return <AccessControlPage />;
}
