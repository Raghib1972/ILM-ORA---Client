import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "ILM ORA Platforms - Learning Tools and Career Hub",
  description: "Explore the ILM ORA platforms for learning, career growth and more, all connected to your Texora AI learning journey.",
  alternates: { canonical: "https://ilmora.texora.ai/career" },
};

export default function Page() {
  return <PageClient />;
}
