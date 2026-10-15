import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "All Courses - Live Expert-Led Classes | ILM ORA",
  description: "Browse all ILM ORA courses with live expert-led sessions in product, design, growth, marketing and technology. Find your course today.",
  alternates: { canonical: "https://ilmora.texora.ai/all-courses" },
};

export default function Page() {
  return <PageClient />;
}
