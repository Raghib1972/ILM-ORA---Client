export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import ViewSubmissions from "@/Trainer/ViewSubmissions";

export default function Page() {
  return <ViewSubmissions />;
}
