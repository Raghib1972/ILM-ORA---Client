export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerReports from "@/SuperAdmin/trainer-control/TrainerReports";

export default function Page() {
  return <TrainerReports />;
}
