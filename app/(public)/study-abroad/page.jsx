import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Study Abroad - Guidance and Programs | ILM ORA",
  description: "Plan your study abroad journey with ILM ORA. Explore programs, guidance and preparation support for international study.",
  alternates: { canonical: "https://ilmora.texora.ai/study-abroad" },
};

export default function Page() {
  return <PageClient />;
}
