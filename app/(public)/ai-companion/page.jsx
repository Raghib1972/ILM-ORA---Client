import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "AI Companion - Your Smart Study Assistant | ILM ORA",
  description: "Meet the ILM ORA AI Companion, a smart study assistant that helps learners with doubts, practice and personalised guidance.",
  alternates: { canonical: "https://ilmora.texora.ai/ai-companion" },
};

export default function Page() {
  return <PageClient />;
}
