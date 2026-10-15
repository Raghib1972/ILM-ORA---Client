import PageClient from "./client";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Google Certification Courses | ILM ORA",
  description:
    "Explore Google certification courses and exam preparation with ILM ORA. Find training, exam details and next steps in one place.",
  alternates: { canonical: "https://ilmora.texora.ai/google" },
};

export default function Page() {
  return <PageClient />;
}