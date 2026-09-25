export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import TwoFactorAuth from "@/Student/TwoFactorAuth";

export default function Page() {
  return <TwoFactorAuth />;
}
