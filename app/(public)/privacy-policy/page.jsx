import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Privacy Policy - How ILM ORA Protects Your Data",
  description: "Read the ILM ORA privacy policy to learn how we collect, use and protect your personal data.",
  alternates: { canonical: "https://ilmora.texora.ai/privacy-policy" },
};

export default function Page() {
  return <PageClient />;
}
