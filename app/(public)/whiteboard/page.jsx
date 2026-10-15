import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Online Whiteboard - Teach and Collaborate | ILM ORA",
  description: "Use the ILM ORA online whiteboard to teach, explain and collaborate in real time during live classes.",
  alternates: { canonical: "https://ilmora.texora.ai/whiteboard" },
};

export default function Page() {
  return <PageClient />;
}
