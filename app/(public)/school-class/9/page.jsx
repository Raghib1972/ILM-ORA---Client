export const metadata = {
  title: "Class 9 Subjects | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/school-class/9" },
};

export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import Class9Subjects from "@/legacy-pages/Landing/Subjects/Class9Subjects";

export default function Page() {
  return <Class9Subjects />;
}
