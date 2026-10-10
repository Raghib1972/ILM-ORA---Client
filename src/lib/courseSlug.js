const API = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000/api";
export const SITE_URL = "https://ilmora.texora.ai";

// Inn naamo se course slug nahi banega (existing routes se clash na ho)
const RESERVED = new Set([
  "login", "signup", "register", "dashboard", "courses", "course-details",
  "program-player", "learn", "api", "admin", "about", "contact", "profile",
]);

export function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/c\+\+/g, "cpp")
    .replace(/c#/g, "csharp")
    .replace(/&/g, " and ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// 100% API data: backend `slug` field (agar API deti hai) -> warna API ke
// course `title` se. Koi hardcoded/dummy slug nahi.
export function getCourseSlug(course) {
  if (!course) return "";
  let slug = slugify(course.slug || "") || slugify(course.title || "");
  if (!slug) slug = `course-${course.id}`;
  if (RESERVED.has(slug)) slug = `${slug}-course`;
  return slug;
}

let cache = { t: 0, data: null };
async function fetchSummaryList() {
  if (cache.data && Date.now() - cache.t < 5 * 60 * 1000) return cache.data;
  const res = await fetch(`${API}/course/v1/featurecourse/summary`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`summary ${res.status}`);
  const data = await res.json();
  cache = { t: Date.now(), data: Array.isArray(data) ? data : [] };
  return cache.data;
}

// slug ya numeric id -> summary course object (ya null)
export async function resolveCourse(identifier) {
  const key = decodeURIComponent(String(identifier)).toLowerCase();
  const list = await fetchSummaryList();
  return (
    list.find((c) => getCourseSlug(c) === key) ||
    list.find((c) => String(c.id) === key) ||
    null
  );
}

// slug ya id -> real numeric id (API call ke liye)
export async function resolveCourseId(identifier) {
  const item = await resolveCourse(identifier);
  if (item) return item.id;
  const key = String(identifier);
  return /^\d+$/.test(key) ? key : null; // purane numeric links bhi chalenge
}

// SEO ke liye full course detail (server-side safe, plain fetch)
export async function fetchCourseById(id) {
  const res = await fetch(`${API}/course/v1/featurecourse/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`course ${res.status}`);
  return res.json();
}