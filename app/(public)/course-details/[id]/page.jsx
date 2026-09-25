export const dynamic = "force-dynamic"; // localStorage-dependent render — see Day 2 report

import CourseDetailsPage from "@/legacy-pages/Landing/CourseDetailsPage";
import { courseService } from "@/services/courseService";

// Real dynamic SEO: same courseService.getById(id) call the page itself
// uses client-side, called again here server-side purely to read the
// course's own title/description for the <title>/meta tags. No invented
// copy — if the API call fails or the course has no description, this
// falls back to the generic site-wide metadata from the root layout
// rather than fabricating anything.
export async function generateMetadata({ params }) {
  try {
    const { data } = await courseService.getById(params.id);
    const title = data?.title || data?.name;
    if (!title) return {};
    return {
      title: `${title} | ILM ORA`,
      description: data?.shortDescription || data?.description || undefined,
      alternates: {
        canonical: `https://ilmora.texora.ai/course-details/${params.id}`,
      },
      openGraph: {
        title: `${title} | ILM ORA`,
        description: data?.shortDescription || data?.description || undefined,
        images: data?.thumbnailUrl ? [{ url: data.thumbnailUrl }] : undefined,
      },
    };
  } catch {
    // API unreachable or course not found — no fake fallback content,
    // just defer to the site-wide default metadata.
    return {};
  }
}

export default function Page() {
  return <CourseDetailsPage />;
}
