export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import DashboardPage from "@/Student/DashboardPage";

export default function Page() {
  return <DashboardPage />;
}
