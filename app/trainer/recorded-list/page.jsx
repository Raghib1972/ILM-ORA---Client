export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import RecordedClassList from "@/Trainer/RecordedClassList";

export default function Page() {
  return <RecordedClassList />;
}
