export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import EditProfile from "@/legacy-pages/common/EditProfile";

export default function Page() {
  return <EditProfile />;
}
