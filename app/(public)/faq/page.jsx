import PageClient from "./client";
import { FAQ_DATA } from "@/data/faqData";
export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2/3 report

export const metadata = {
  title: "FAQ | ILM ORA",
  alternates: { canonical: "https://ilmora.texora.ai/faq" },
};

export default function Page() {
  // Real, existing FAQ content (FAQ_DATA in FAQ.jsx) — same Q&A pairs
  // rendered on the page, reused here as-is for FAQPage structured data.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.flatMap((category) =>
      category.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      }))
    ),
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
