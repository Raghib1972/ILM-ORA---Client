export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import CreateAssignments from "@/Trainer/CreateAssignments";

export default function Page() {
  return <CreateAssignments />;
}
