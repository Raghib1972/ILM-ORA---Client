export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import Categories from "@/Admin/Categories";

export default function Page() {
  return <Categories />;
}
