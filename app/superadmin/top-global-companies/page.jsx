export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import TopGlobalCompanies from "@/SuperAdmin/components/layout/TopGlobalCompanies";

export default function Page() {
  return <TopGlobalCompanies />;
}
