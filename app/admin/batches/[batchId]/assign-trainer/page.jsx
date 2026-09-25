export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AssignTrainerPage from "@/Admin/AssignTrainerPage";

export default function Page() {
  return <AssignTrainerPage />;
}
