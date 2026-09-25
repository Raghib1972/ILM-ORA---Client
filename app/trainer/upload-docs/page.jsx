export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import UploadDocuments from "@/Trainer/UploadDocuments";

export default function Page() {
  return <UploadDocuments />;
}
