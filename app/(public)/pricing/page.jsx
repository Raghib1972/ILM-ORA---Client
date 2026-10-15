import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Pricing - ILM ORA Plans and Course Fees",
  description: "See ILM ORA pricing and plans for courses, live classes and teams. Compare options and choose what fits you.",
  alternates: { canonical: "https://ilmora.texora.ai/pricing" },
};

export default function Page() {
  return <PageClient />;
}
