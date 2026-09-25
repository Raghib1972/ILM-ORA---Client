export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import EditAssignment from "@/Trainer/EditAssignment";

export default function Page() {
  return <EditAssignment />;
}
