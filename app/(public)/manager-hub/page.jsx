import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Manager Hub - Manage Teams and Learning | ILM ORA",
  description: "Manager Hub on ILM ORA helps managers track team learning, assign courses and monitor progress in one dashboard.",
  alternates: { canonical: "https://ilmora.texora.ai/manager-hub" },
};

export default function Page() {
  return <PageClient />;
}
