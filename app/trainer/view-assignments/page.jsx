export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import ViewAssignments from "@/Trainer/ViewAssignments";

export default function Page() {
  return <ViewAssignments />;
}
