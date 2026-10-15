export const metadata = {
  title: "Class 9 Subjects - Online Classes and Lessons | ILM ORA",
  description: "Class 9 online subjects on ILM ORA, including Math and AI, with structured lessons and easy navigation.",
  alternates: { canonical: "https://ilmora.texora.ai/board/9" },
};

export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import Class9Subjects from "@/legacy-pages/Landing/Subjects/Class9Subjects";

export default function Page() {
  return <Class9Subjects />;
}
