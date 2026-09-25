export const metadata = {
  title: "Public Sessions | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/public/sessions" },
};

export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import PublicSessionsPage from "@/legacy-pages/public/PublicSessionsPage";

export default function Page() {
  return <PublicSessionsPage />;
}
