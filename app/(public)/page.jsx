import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "ILM ORA - Intelligent Learning Management | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/" },
};

export default function Page() {
  return <PageClient />;
}
