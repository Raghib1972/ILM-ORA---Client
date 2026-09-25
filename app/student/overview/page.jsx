export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import Overview from "@/Student/overview";

export default function Page() {
  return <Overview />;
}
