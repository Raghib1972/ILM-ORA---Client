export const dynamic = "force-dynamic"; // admin dashboard pages are client-rendered (localStorage/auth) throughout

import CertificatesAdmin from "@/Admin/CertificatesAdmin";

export default function Page() {
  return <CertificatesAdmin />;
}
