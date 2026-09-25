export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import TrainerMeetings from "@/Trainer/TrainerMeetings";

export default function Page() {
  return <TrainerMeetings />;
}
