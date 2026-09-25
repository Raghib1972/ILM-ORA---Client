export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminRecordedVideos from "@/Admin/AdminRecordedVideos";

export default function Page() {
  return <AdminRecordedVideos />;
}
