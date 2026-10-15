import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "ILM ORA Meet - Online Meetings and Scheduling",
  description: "ILM ORA Meet lets you schedule and join online meetings and sessions with a simple booking and calendar experience.",
  alternates: { canonical: "https://ilmora.texora.ai/calendry" },
};

export default function Page() {
  return <PageClient />;
}
