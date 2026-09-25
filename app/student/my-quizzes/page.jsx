export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import MyQuizHistory from "@/Student/MyQuizHistory";

export default function Page() {
  return <MyQuizHistory />;
}
