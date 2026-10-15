import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Coding Lab - Learn to Code Online | ILM ORA",
  description: "Practice coding online in the ILM ORA Coding Lab. Write, run and learn programming with guided exercises.",
  alternates: { canonical: "https://ilmora.texora.ai/coding-lab" },
};

export default function Page() {
  return <PageClient />;
}
