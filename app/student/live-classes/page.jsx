export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import LiveClasses from "@/Student/LiveClasses";

export default function Page() {
  return <LiveClasses />;
}
