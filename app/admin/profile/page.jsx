export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import ProfilePage from "@/legacy-pages/ProfilePage";

export default function Page() {
  return <ProfilePage />;
}
