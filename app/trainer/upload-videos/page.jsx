export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import UploadVideos from "@/Trainer/UploadVideos";

export default function Page() {
  return <UploadVideos />;
}
