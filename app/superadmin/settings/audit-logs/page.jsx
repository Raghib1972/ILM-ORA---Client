export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import AuditLogs from "@/SuperAdmin/settings/AuditLogs";

export default function Page() {
  return <AuditLogs />;
}
