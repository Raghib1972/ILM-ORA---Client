export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import WhiteboardPanel from "@/Trainer/WhiteboardPanel";

export default function Page() {
  return <WhiteboardPanel />;
}
