export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import Certificates from "@/Student/certificates";

export default function Page() {
  return <Certificates />;
}
