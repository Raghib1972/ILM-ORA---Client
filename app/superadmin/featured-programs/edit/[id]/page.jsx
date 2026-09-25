export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import AddEditProgram from "@/SuperAdmin/featured-programs/pages/AddEditProgram";

export default function Page() {
  return <AddEditProgram />;
}
