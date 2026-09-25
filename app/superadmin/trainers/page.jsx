export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerControlPage from "@/SuperAdmin/trainer-control/TrainerControlPage";

export default function Page() {
  return <TrainerControlPage />;
}
