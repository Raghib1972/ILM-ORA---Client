import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Help Center - Guides and Support | ILM ORA",
  description: "Visit the ILM ORA Help Center for guides, troubleshooting and support on classes, accounts and platform features.",
  alternates: { canonical: "https://ilmora.texora.ai/help-center" },
};

export default function Page() {
  return <PageClient />;
}
