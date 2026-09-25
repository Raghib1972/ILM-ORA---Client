export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import MyAssignments from "@/Trainer/MyAssignments";

export default function Page() {
  return <MyAssignments />;
}
