export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerDashboard from "@/Trainer/Dashboard";

export default function Page() {
  return <TrainerDashboard />;
}
