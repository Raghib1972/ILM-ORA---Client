export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import BatchTrainerOverviewPage from "@/Admin/BatchTrainerOverviewPage";

export default function Page() {
  return <BatchTrainerOverviewPage />;
}
