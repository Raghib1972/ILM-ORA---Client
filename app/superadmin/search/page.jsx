export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SearchPage from "@/legacy-pages/SearchPage";

export default function Page() {
  return <SearchPage />;
}
