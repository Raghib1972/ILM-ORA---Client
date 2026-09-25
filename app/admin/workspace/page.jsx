export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminMeetings from "@/Admin/AdminMeetings";

export default function Page() {
  return <AdminMeetings />;
}
