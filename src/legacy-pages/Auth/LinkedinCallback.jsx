"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import authService from "../../services/authService";

export default function LinkedinCallback() {
  const router = useRouter();
  const ran = useRef(false);

  const redirectByRole = (role) => {
    switch ((role || "").toUpperCase()) {
      case "SUPER_ADMIN":
        router.replace("/superadmin");
        break;
      default:
        router.replace("/ilm-demo");
    }
  };

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");
    const savedState = sessionStorage.getItem("linkedin_oauth_state");
    sessionStorage.removeItem("linkedin_oauth_state");

    if (!code || state !== savedState) {
      alert("LinkedIn login failed or was tampered with. Please try again.");
      router.replace("/");
      return;
    }

    (async () => {
      try {
        localStorage.removeItem("lms_token");
        localStorage.removeItem("lms_user");
        localStorage.removeItem("role");

        const check = await authService.checkLinkedinUser({ code });

        if (check.isNewUser === false && check.token && check.role) {
          const role = check.role.toUpperCase();
          localStorage.setItem("lms_token", check.token);
          localStorage.setItem("role", role);
          if (check.organizationId) {
            localStorage.setItem("organizationId", check.organizationId);
          }
          localStorage.setItem(
            "lms_user",
            JSON.stringify({
              name: check.name,
              email: check.email,
              role: ["TENANT_ADMIN", "ADMIN", "BUSINESS"].includes(role)
                ? "admin"
                : role.toLowerCase(),
              isLinkedinUser: true,
              profileCompleted: true,
              organizationId: check.organizationId || null,
            }),
          );
          redirectByRole(role);
          return;
        }

        sessionStorage.setItem("ilmora_linkedin_code", code);
        localStorage.setItem(
          "lms_user",
          JSON.stringify({
            name: check.name || "",
            email: check.email || "",
            isLinkedinUser: true,
            isNewUser: true,
            profileCompleted: false,
          }),
        );
        router.replace("/ilm-demo");
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "LinkedIn login failed. Please try again.";
        alert(message);
        router.replace("/");
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Signing you in with LinkedIn…</p>
    </div>
  );
}
