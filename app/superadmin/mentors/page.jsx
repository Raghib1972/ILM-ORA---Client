export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import MentorsManagement from "@/SuperAdmin/featured-programs/MentorsManagement";

export default function Page() {
  return <MentorsManagement />;
}
