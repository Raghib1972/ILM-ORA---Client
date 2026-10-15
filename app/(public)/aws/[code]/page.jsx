import PageClient from "./client";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { code } = await params;
  return {
    title: `${String(code || "").toUpperCase()} AWS Certification Course and Exam Prep | ILM ORA`,
    description: `Explore the ${String(code || "").toUpperCase()} AWS certification with ILM ORA: exam overview, preparation and training in one place.`,
    alternates: {
      canonical: `https://ilmora.texora.ai/aws/${String(code || "").toLowerCase()}`,
    },
  };
}

export default function Page() {
  return <PageClient />;
}