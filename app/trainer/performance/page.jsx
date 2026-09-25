export const dynamic = "force-dynamic"; // trainer dashboard pages are client-rendered (localStorage/auth) throughout

import PerformanceAnalysis from "@/Trainer/PerformanceAnalysis";

export default function Page() {
  return <PerformanceAnalysis />;
}
