export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import BatchReports from "@/Trainer/BatchReports";

export default function Page() {
  return <BatchReports />;
}
