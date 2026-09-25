// The existing React dashboards (Student/Trainer/Admin/Business/SuperAdmin)
// stay in the original React/Vite app per the migration rules — they were
// never migrated to Next.js. That means as of Day 3, the public site and
// the dashboard app are two separate deployables. A path like "/student"
// does not exist in this Next.js app's route tree, so client-side
// navigation to it (next/navigation's router.push) would 404 inside Next.js
// instead of reaching the dashboard. Anything under one of these prefixes
// must be a real browser navigation instead, exactly like clicking a link
// to another site — see useNavigate() in routerCompat.js.
//
// "/ilm-demo" is included because that's the actual post-login landing
// page the existing app sends every role except SUPER_ADMIN to today (see
// Login.jsx) — not a per-role dashboard route directly. Preserved as-is.
export const DASHBOARD_PATH_PREFIXES = [
  // "/student" removed — migrated into this Next.js app's own route tree
  // under app/student/ (Task 4).
  // "/ilm-demo" removed — migrated into this Next.js app's own route tree
  // under app/ilm-demo/ (ilm-demo pages + sidebar migration).
  // "/trainer" removed — migrated into this Next.js app's own route tree
  // under app/trainer/ (Task 5).
  // "/admin" removed — migrated into this Next.js app's own route tree
  // under app/admin/ (Task 6).
  // "/superadmin" removed — migrated into this Next.js app's own route tree
  // under app/superadmin/ (SuperAdmin Phase 1A).
  // Update this list again once Business gets its own Task.
  "/business",
];

export function isDashboardPath(path) {
  if (typeof path !== "string") return false;
  return DASHBOARD_PATH_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(prefix + "/") || path.startsWith(prefix + "?")
  );
}

// Same-origin by default (assumes the dashboard app is served from the same
// domain, e.g. via reverse proxy — the same assumption the existing single
// SPA build implicitly made). Set NEXT_PUBLIC_DASHBOARD_APP_URL if the
// dashboard is deployed on a different origin.
export function toDashboardUrl(path) {
  const base = process.env.NEXT_PUBLIC_DASHBOARD_APP_URL || "";
  return `${base}${path}`;
}
