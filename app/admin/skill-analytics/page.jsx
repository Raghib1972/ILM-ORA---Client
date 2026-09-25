export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminSkillDashboard from "@/Admin/AdminSkillDashboard";

export default function Page() {
  return <AdminSkillDashboard />;
}
