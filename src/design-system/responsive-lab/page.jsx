// Dev-only playground for the Phase 1b toolkit. Open: http://localhost:3000/responsive-lab
// In production this route returns 404.
// (The folder is NOT named _responsive-lab: Next.js ignores folders that start
//  with "_", so that URL would never exist.)
import { notFound } from "next/navigation";
import LabClient from "./LabClient";

export const metadata = { title: "Responsive Lab", robots: { index: false, follow: false } };

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <LabClient />;
}
