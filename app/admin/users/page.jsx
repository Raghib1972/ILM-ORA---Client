export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AllUsers from "@/Admin/AllUsers";

export default function Page() {
  return <AllUsers />;
}
