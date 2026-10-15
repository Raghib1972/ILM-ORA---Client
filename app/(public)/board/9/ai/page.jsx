export const metadata = {
  title: "Class 9 AI - Online Classes and Lessons | ILM ORA",
  description: "Class 9 Artificial Intelligence online lessons on ILM ORA, with clear explanations and structured practice.",
  alternates: { canonical: "https://ilmora.texora.ai/board/9/ai" },
};

export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import Class9AI from "@/legacy-pages/Landing/Subjects/Class9AI";

export default function Page() {
  return <Class9AI />;
}
