export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import NotificationsPage from "@/legacy-pages/NotificationsPage";

export default function Page() {
  return <NotificationsPage />;
}
