export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerAnalytics from "@/SuperAdmin/trainer-control/TrainerAnalytics";

export default function Page() {
  return <TrainerAnalytics />;
}
