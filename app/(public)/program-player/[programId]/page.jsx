export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import ProgramPlayer from "@/legacy-pages/Landing/ProgramPlayer";
import { courseService } from "@/services/courseService";

export async function generateMetadata({ params }) {
  try {
    const { data } = await courseService.getFeaturedProgramById(params.programId);
    const title = data?.title || data?.name;
    if (!title) return {};
    return {
      title: `${title} | ILM ORA`,
      description: data?.shortDescription || data?.description || undefined,
      alternates: {
        canonical: `https://ilmora.texora.ai/program-player/${params.programId}`,
      },
    };
  } catch {
    return {};
  }
}

export default function Page() {
  return <ProgramPlayer />;
}
