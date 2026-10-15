import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "ILM ORA Talk - Online Communication Practice",
  description: "ILM ORA Talk helps you connect and communicate online with live conversations and practice sessions.",
  alternates: { canonical: "https://ilmora.texora.ai/talk" },
};

export default function Page() {
  return <PageClient />;
}
