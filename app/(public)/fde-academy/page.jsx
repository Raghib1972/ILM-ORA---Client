import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "FDE Academy - Career-Ready Training | ILM ORA",
  description: "FDE Academy on ILM ORA offers career-focused training to help you build job-ready skills with expert mentors.",
  alternates: { canonical: "https://ilmora.texora.ai/fde-academy" },
};

export default function Page() {
  return <PageClient />;
}
