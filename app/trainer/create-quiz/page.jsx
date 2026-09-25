export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import CreateQuiz from "@/Trainer/CreateQuiz";

export default function Page() {
  return <CreateQuiz />;
}
