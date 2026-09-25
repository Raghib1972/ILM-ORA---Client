export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import VideoLectures from "@/Student/videolecctures";

export default function Page() {
  return <VideoLectures />;
}
