export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerBatchesPage from "@/Trainer/TrainerBatchesPage";

export default function Page() {
  return <TrainerBatchesPage />;
}
