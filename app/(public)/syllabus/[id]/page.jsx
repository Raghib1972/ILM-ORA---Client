export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import SyllabusPage from "@/legacy-pages/Landing/Syllabus";
import { courseService } from "@/services/courseService";

export async function generateMetadata({ params }) {
  try {
    const { data } = await courseService.getFeaturedProgramById(params.id);
    const title = data?.title || data?.name;
    if (!title) return {};
    return {
      title: `${title} Syllabus | ILM ORA`,
      description: data?.shortDescription || data?.description || undefined,
      alternates: { canonical: `https://ilmora.texora.ai/syllabus/${params.id}` },
      openGraph: {
        title: `${title} Syllabus | ILM ORA`,
        description: data?.shortDescription || data?.description || undefined,
      },
    };
  } catch {
    return {};
  }
}

export default function Page() {
  return <SyllabusPage />;
}
