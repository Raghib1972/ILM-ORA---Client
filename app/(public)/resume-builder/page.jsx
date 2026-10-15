import PageClient from "./client";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Resume Builder - Create a Resume Online | ILM ORA",
  description: "Build a professional resume online with the ILM ORA Resume Builder. Pick a layout, add your details and download.",
  alternates: { canonical: "https://ilmora.texora.ai/resume-builder" },
};

export default function Page() {
  return <PageClient />;
}
