export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import DoubtsManagement from "@/Trainer/DoubtsManagement";

export default function Page() {
  return <DoubtsManagement />;
}
