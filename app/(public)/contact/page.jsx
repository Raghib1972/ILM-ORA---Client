import PageClient from "./client";
import { CONTACT_FAQS } from "@/data/contactFaqs";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "Contact ILM ORA - Get Support and Sales Help",
  description: "Contact the ILM ORA team for support, course questions or partnerships. We are here to help you learn and grow.",
  alternates: { canonical: "https://ilmora.texora.ai/contact" },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CONTACT_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageClient />
    </>
  );
}
