export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import Branches from "@/Admin/Branches";

export default function Page() {
  return <Branches />;
}
