export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import DepartmentList from "@/Admin/DepartmentList";

export default function Page() {
  return <DepartmentList />;
}
