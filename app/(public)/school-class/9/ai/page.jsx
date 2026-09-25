export const metadata = {
  title: "Class 9 AI | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/school-class/9/ai" },
};

export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import Class9AI from "@/legacy-pages/Landing/Subjects/Class9AI";

export default function Page() {
  return <Class9AI />;
}
