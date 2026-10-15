export const metadata = {
  title: "Class 9 Math - Online Classes and Lessons | ILM ORA",
  description: "Class 9 Maths online lessons on ILM ORA, with step-by-step explanations and structured practice.",
  alternates: { canonical: "https://ilmora.texora.ai/board/9/math" },
};

export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import Class9Math from "@/legacy-pages/Landing/Subjects/Class9Math";

export default function Page() {
  return <Class9Math />;
}
