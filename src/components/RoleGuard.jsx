"use client";

// Next.js port of components/RoleGuard.jsx. Same logic, same role checks,
// same redirect targets — only the timing changed (deferred to client-only,
// same reason as ProtectedRoute.jsx: localStorage isn't readable during
// Next's server render, so the check now runs in an effect after mount
// instead of synchronously during render).
//
// Note: the original passed `state={{ from: location }}` to the /login
// redirect. Next.js's router has no equivalent concept of route state, and
// nothing on the /login side currently reads it anyway (confirmed against
// the real Login.jsx) — so this is dropped as truly inert, not a
// functional loss.
import { useEffect, useState } from "react";
import { useNavigate } from "@/lib/routerCompat";
import auth from "@/auth";

export default function RoleGuard({ children, allowedRoles = [] }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking"); // "checking" | "ok" | "redirecting"

  useEffect(() => {
    // 1) Token check
    if (!auth.isAuthenticated()) {
      setStatus("redirecting");
      navigate("/login", { replace: true });
      return;
    }

    // 2) Role from localStorage — identical logic to the original
    const lmsUser = localStorage.getItem("lms_user");
    const role = lmsUser
      ? JSON.parse(lmsUser).role?.toUpperCase() || localStorage.getItem("role")
      : null;

    if (!role) {
      setStatus("redirecting");
      navigate("/login", { replace: true });
      return;
    }

    // 3) ADMIN can access everything (no restriction)
    if (role === "ADMIN") {
      setStatus("ok");
      return;
    }

    // 4) If allowedRoles provided, check role
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      setStatus("redirecting");
      if (role === "STUDENT") return navigate("/student", { replace: true });
      if (role === "TRAINER") return navigate("/trainer", { replace: true });
      if (role === "BUSINESS") return navigate("/business", { replace: true });
      return navigate("/", { replace: true });
    }

    // allowed
    setStatus("ok");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status !== "ok") return null;
  return children;
}
