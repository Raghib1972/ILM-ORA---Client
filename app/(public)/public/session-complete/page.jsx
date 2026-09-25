export const metadata = {
  title: "Session Complete | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/public/session-complete" },
};

export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import PublicSessionComplete from "@/legacy-pages/public/PublicSessionComplete";

export default function Page() {
  return <PublicSessionComplete />;
}
