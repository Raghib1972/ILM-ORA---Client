import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "School Classes - Online Lessons by Subject | ILM ORA",
  description: "Explore online school classes on ILM ORA. Choose your class and start learning subjects like Math and AI with structured lessons.",
  alternates: { canonical: "https://ilmora.texora.ai/board" },
};

export default function Page() {
  return <PageClient />;
}
