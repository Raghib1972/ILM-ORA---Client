export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerCompilerPage from "@/Trainer/TrainerCompilerPage";

export default function Page() {
  return <TrainerCompilerPage />;
}
