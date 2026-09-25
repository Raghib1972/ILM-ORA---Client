export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerFiles from "@/Trainer/TrainerFiles";

export default function Page() {
  return <TrainerFiles />;
}
