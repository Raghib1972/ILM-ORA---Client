export const metadata = {
  title: "Class 9 Math | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/school-class/9/math" },
};

export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import Class9Math from "@/legacy-pages/Landing/Subjects/Class9Math";

export default function Page() {
  return <Class9Math />;
}
