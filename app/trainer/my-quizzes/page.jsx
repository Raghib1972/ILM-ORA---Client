export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import MyQuizzes from "@/Trainer/MyQuizzes";

export default function Page() {
  return <MyQuizzes />;
}
