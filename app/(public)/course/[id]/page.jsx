export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import CoursePreview from "@/legacy-pages/CoursePreview";
import { courseService } from "@/services/courseService";

export async function generateMetadata({ params }) {
  try {
    const { data } = await courseService.getById(params.id);
    const title = data?.title || data?.name;
    if (!title) return {};
    return {
      title: `${title} | ILM ORA`,
      description: data?.shortDescription || data?.description || undefined,
      alternates: { canonical: `https://ilmora.texora.ai/course/${params.id}` },
      openGraph: {
        title: `${title} | ILM ORA`,
        description: data?.shortDescription || data?.description || undefined,
        images: data?.thumbnailUrl ? [{ url: data.thumbnailUrl }] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default function Page() {
  return <CoursePreview />;
}
