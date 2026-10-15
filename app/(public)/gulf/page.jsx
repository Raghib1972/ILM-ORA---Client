import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "ILM ORA Gulf - Live Learning for the Gulf Region",
  description: "ILM ORA Gulf brings live, expert-led learning to learners across the Gulf region with courses built for local careers.",
  alternates: { canonical: "https://ilmora.texora.ai/gulf" },
};

export default function Page() {
  return <PageClient />;
}
