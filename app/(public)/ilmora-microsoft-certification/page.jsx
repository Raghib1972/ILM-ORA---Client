import PageClient from "./client";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Microsoft Certification Courses | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/ilmora-microsoft-certification" },
};

export default function Page() {
  return <PageClient />;
}