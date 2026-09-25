export const dynamic = "force-dynamic"; // superadmin dashboard pages are client-rendered (localStorage/auth) throughout

import SendEmail from "@/SuperAdmin/settings/SendEmail";

export default function Page() {
  return <SendEmail />;
}
