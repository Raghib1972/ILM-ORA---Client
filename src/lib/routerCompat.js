"use client";

// Compatibility layer so components originally written against
// react-router-dom run unmodified under Next.js App Router.
// No navigation/URL behavior is changed — same destinations, same param
// names (folder segments were named to match: :id -> [id], etc.).
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { isDashboardPath, toDashboardUrl } from "./dashboardRoutes";

export function useNavigate() {
  const router = useRouter();
  return (to, options) => {
    if (typeof to === "number") {
      if (to === -1) return router.back();
      if (to === 1) return router.forward();
      return router.back();
    }
    // Dashboard routes (/student, /trainer, /admin, /business, /superadmin,
    // /ilm-demo) live in the separate React app, not this Next.js app's
    // route tree — a client-side push would 404 here. Do a real browser
    // navigation instead, same destination URL as before.
    if (isDashboardPath(to)) {
      const url = toDashboardUrl(to);
      if (options && options.replace) {
        window.location.replace(url);
      } else {
        window.location.href = url;
      }
      return;
    }
    if (options && options.replace) {
      return router.replace(to);
    }
    return router.push(to);
  };
}

// Same shape as react-router's useParams() for our route segment names.
export function useParams() {
  return useNextParams();
}

// react-router's useLocation() returns { pathname, search, hash, state, key }.
// Next.js has no equivalent to react-router's in-memory navigation `state`
// (data passed via navigate(path, { state })) — client-side navigations in
// Next.js only carry the URL. Pages that read `location.state` as an
// optimization (e.g. to skip a redundant fetch) will simply not find it and
// fall back to fetching from the API instead, which they're already written
// to do. See the Day 2 report for the specific pages this affects.
export function useLocation() {
  const pathname = usePathname();
  const searchParams = useNextSearchParams();
  const search = searchParams?.toString();
  return {
    pathname,
    search: search ? `?${search}` : "",
    hash: "",
    state: null,
    key: "default",
  };
}

// react-router's useSearchParams() returns a [URLSearchParams, setSearchParams]
// tuple. next/navigation's returns the URLSearchParams object directly, so
// this shim restores the tuple shape (get-only usage in these pages).
export function useSearchParams() {
  const searchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = (next) => {
    const params = new URLSearchParams(
      typeof next === "function" ? next(searchParams) : next
    );
    router.push(`${pathname}?${params.toString()}`);
  };

  return [searchParams, setSearchParams];
}
