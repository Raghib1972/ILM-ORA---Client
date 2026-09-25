import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Study Abroad | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/study-abroad" },
};

export default function Page() {
  return <PageClient />;
}
