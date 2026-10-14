import PageClient from "./client";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Google Certification Courses | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/google" },
};

export default function Page() {
  return <PageClient />;
}