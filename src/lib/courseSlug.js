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

const TTL = 5 * 60 * 1000;
const memCache = {}; // { [name]: { t, data } }

async function fetchList(path, timeoutMs = 8000) {
  const ctrl =
    typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = ctrl ? setTimeout(() => ctrl.abort(), timeoutMs) : null;
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: 300 },
      signal: ctrl ? ctrl.signal : undefined,
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// memory + sessionStorage cache (browser), taaki har click par dobara download na ho
async function getCachedList(name, path) {
  const hit = memCache[name];
  if (hit && Date.now() - hit.t < TTL) return hit.data;

  if (typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(`ilm_list_${name}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Date.now() - parsed.t < TTL && Array.isArray(parsed.data)) {
          memCache[name] = parsed;
          return parsed.data;
        }
      }
    } catch {
      /* ignore */
    }
  }

  const data = await fetchList(path);
  if (data.length > 0) {
    memCache[name] = { t: Date.now(), data };
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(
          `ilm_list_${name}`,
          JSON.stringify(memCache[name]),
        );
      } catch {
        /* ignore */
      }
    }
  }
  return data;
}

const getSummaryList = () =>
  getCachedList("summary", "/course/v1/featurecourse/summary");
const getFullList = () => getCachedList("full", "/course/v1/featurecourse");

// slug ya numeric id -> course object (ya null)
export async function resolveCourse(identifier) {
  const key = decodeURIComponent(String(identifier)).toLowerCase();
  const find = (list) =>
    list.find((c) => getCourseSlug(c) === key) ||
    list.find((c) => String(c.id) === key) ||
    null;

  // 1) halki summary list (fast)
  const summary = await getSummaryList();
  let item = find(summary);
  if (item) return item;

  // 2) summary mein nahi mila -> tabhi poori list
  const full = await getFullList();
  item = find(full);
  if (item) return item;

  if (summary.length === 0 && full.length === 0) {
    throw new Error("course list unavailable");
  }
  return null;
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