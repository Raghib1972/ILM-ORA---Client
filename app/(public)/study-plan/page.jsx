import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Study Plan - Personalised Learning Roadmap | ILM ORA",
  description: "Create a personalised study plan on ILM ORA with clear goals, schedules and a roadmap to track your learning progress.",
  alternates: { canonical: "https://ilmora.texora.ai/study-plan" },
};

export default function Page() {
  return <PageClient />;
}
