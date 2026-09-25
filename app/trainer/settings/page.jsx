export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerSettings from "@/Trainer/TrainerSettings";

export default function Page() {
  return <TrainerSettings />;
}
