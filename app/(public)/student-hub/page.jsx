import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Student Hub - Learn, Track and Grow | ILM ORA",
  description: "Student Hub on ILM ORA gives learners one place for classes, assignments, progress and certificates.",
  alternates: { canonical: "https://ilmora.texora.ai/student-hub" },
};

export default function Page() {
  return <PageClient />;
}
