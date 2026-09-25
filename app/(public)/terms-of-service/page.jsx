import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Terms of Service | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/terms-of-service" },
};

export default function Page() {
  return <PageClient />;
}
