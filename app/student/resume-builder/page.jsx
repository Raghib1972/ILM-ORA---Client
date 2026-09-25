export const dynamic = "force-dynamic"; // student dashboard pages are client-rendered (localStorage/auth) throughout

import ResumeBuilder from "@/Student/ResumeBuilder";

export default function Page() {
  return <ResumeBuilder />;
}
