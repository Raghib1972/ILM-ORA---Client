import PageClient from "./client";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { code } = await params;
  return {
    title: `${String(code || "").toUpperCase()} AWS Certification | ILM ORA`,
    alternates: {
      canonical: `https://ilmora.texora.ai/ilmora-aws-certification/${String(code || "").toLowerCase()}`,
    },
  };
}

export default function Page() {
  return <PageClient />;
}