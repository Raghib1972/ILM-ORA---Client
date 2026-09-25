export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerDetailsPage from "@/SuperAdmin/trainer-control/TrainerDetailsPage";

export default function Page() {
  return <TrainerDetailsPage />;
}
