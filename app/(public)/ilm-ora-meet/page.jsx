import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "ILM ORA Meet | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/ilm-ora-meet" },
};

export default function Page() {
  return <PageClient />;
}
