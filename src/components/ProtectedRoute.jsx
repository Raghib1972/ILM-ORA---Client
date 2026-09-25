"use client";

// Next.js port of App.jsx's inline ProtectedRoute (line ~404):
//   const ProtectedRoute = ({ children }) => {
//     if (!auth.isAuthenticated()) return <Navigate to="/login" replace />;
//     return children;
//   };
// Same check, same redirect target. The only difference is structural:
// auth.isAuthenticated() reads localStorage, which doesn't exist during
// Next's server render. So this defers the check to after mount (client
// only) — server and the client's first paint both render the loading
// state, avoiding a hydration mismatch, then the real check runs and
// either shows children or redirects. This is not a behavior change: the
// existing app is a pure client-side SPA today too, so route protection
// was already 100% client-side and only ever evaluated in the browser.
import { useEffect, useState } from "react";
import { useNavigate } from "@/lib/routerCompat";
import auth from "@/auth";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // "checking" | "ok" | "redirecting"

  useEffect(() => {
    if (auth.isAuthenticated()) {
      setStatus("ok");
    } else {
      setStatus("redirecting");
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status !== "ok") return null;
  return children;
}
