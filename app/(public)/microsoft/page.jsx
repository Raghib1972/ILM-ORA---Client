import PageClient from "./client";
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Microsoft Certification Courses | ILM ORA",
  description:
    "Explore Microsoft certification courses and exam preparation with ILM ORA. Find training, exam details and next steps in one place.",
  alternates: { canonical: "https://ilmora.texora.ai/microsoft" },
};

export default function Page() {
  return <PageClient />;
}