export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import UsageAnalytics from "@/Admin/UsageAnalytics";

export default function Page() {
  return <UsageAnalytics />;
}
