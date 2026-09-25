export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import AttemptQuiz from "@/Student/AttemptQuiz";

export default function Page() {
  return <AttemptQuiz />;
}
