export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import UploadRecordedVideo from "@/Trainer/UploadRecordedVideo";

export default function Page() {
  return <UploadRecordedVideo />;
}
