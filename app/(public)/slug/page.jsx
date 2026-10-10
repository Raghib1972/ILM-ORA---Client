export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import CourseDetailsPage from "@/legacy-pages/Landing/CourseDetailsPage";
import {
  SITE_URL,
  fetchCourseById,
  getCourseSlug,
  resolveCourse,
} from "@/lib/courseSlug";

export async function generateMetadata({ params }) {
  try {
    const { slug } = await params;
    const item = await resolveCourse(slug);
    if (!item) return {};
    const data = await fetchCourseById(item.id);
    const title = data?.title || item.title;
    if (!title) return {};
    const description = data?.shortDescription || data?.description || undefined;
    return {
      title: `${title} | ILM ORA`,
      description,
      alternates: { canonical: `${SITE_URL}/${getCourseSlug(item)}` },
      openGraph: {
        title: `${title} | ILM ORA`,
        description,
        images: data?.thumbnailUrl ? [{ url: data.thumbnailUrl }] : undefined,
      },
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  let item = null;
  let apiFailed = false;
  try {
    item = await resolveCourse(slug);
  } catch {
    apiFailed = true; // API down, client component khud handle karega
  }
  if (!item && !apiFailed && !/^\d+$/.test(slug)) notFound();
  return <CourseDetailsPage />;
}