export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import AdminVideos from "@/Admin/AdminVideos";

export default function Page() {
  return <AdminVideos />;
}
