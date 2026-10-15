import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Trainer Hub - Teach and Manage Classes | ILM ORA",
  description: "Trainer Hub on ILM ORA helps trainers schedule live classes, manage learners and share course content.",
  alternates: { canonical: "https://ilmora.texora.ai/trainer-hub" },
};

export default function Page() {
  return <PageClient />;
}
