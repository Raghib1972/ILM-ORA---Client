import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Workspace - Collaborate and Learn Together | ILM ORA",
  description: "ILM ORA Workspace is a collaborative space for live meetings, learning sessions and team work online.",
  alternates: { canonical: "https://ilmora.texora.ai/workspace" },
};

export default function Page() {
  return <PageClient />;
}
