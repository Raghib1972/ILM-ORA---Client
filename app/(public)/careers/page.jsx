import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Careers at ILM ORA - Join the Texora AI Team",
  description: "Explore careers at ILM ORA and Texora AI. See open roles and join a team building the future of live learning.",
  alternates: { canonical: "https://ilmora.texora.ai/careers" },
};

export default function Page() {
  return <PageClient />;
}
