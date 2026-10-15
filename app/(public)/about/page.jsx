import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "About ILM ORA - Live Learning Platform by Texora AI",
  description: "Learn about ILM ORA, the live learning platform by Texora AI offering expert-led classes in product, design, growth and marketing.",
  alternates: { canonical: "https://ilmora.texora.ai/about" },
};

export default function Page() {
  return <PageClient />;
}
