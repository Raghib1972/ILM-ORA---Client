import PageClient from "./client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AWS Certification Courses and Exam Prep | ILM ORA",
  description: "Prepare for AWS certification exams with ILM ORA courses and guidance. Explore every AWS exam code in one place.",
  alternates: {
  canonical: "https://ilmora.texora.ai/aws",
  },
};

export default function Page() {
  return <PageClient />;
}