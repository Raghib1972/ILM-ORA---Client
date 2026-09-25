export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SuperAdminMeetings from "@/SuperAdmin/meetings/SuperAdminMeetings";

export default function Page() {
  return <SuperAdminMeetings />;
}
