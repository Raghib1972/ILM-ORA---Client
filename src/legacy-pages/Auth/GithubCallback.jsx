"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import authService from "../../services/authService";

export default function GithubCallback() {
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

    if (!code) {
      alert("GitHub login failed — no code received.");
      router.replace("/");
      return;
    }

    (async () => {
      try {
        localStorage.removeItem("lms_token");
        localStorage.removeItem("lms_user");
        localStorage.removeItem("role");

        const check = await authService.checkGithubUser({ code });

        if (check.emailMissing) {
          alert(
            "Your GitHub account has no public email. Please use Google or email/password login, or make your GitHub email public and try again.",
          );
          router.replace("/");
          return;
        }

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
              isGithubUser: true,
              profileCompleted: true,
              organizationId: check.organizationId || null,
            }),
          );
          redirectByRole(role);
          return;
        }

        // Brand new user — same Step 4 role-selection flow as Google
        sessionStorage.setItem("ilmora_github_code", code);
        localStorage.setItem(
          "lms_user",
          JSON.stringify({
            name: check.name || "",
            email: check.email || "",
            isGithubUser: true,
            isNewUser: true,
            profileCompleted: false,
          }),
        );
        router.replace("/ilm-demo");
      } catch (err) {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "GitHub login failed. Please try again.";
        alert(message);
        router.replace("/");
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Signing you in with GitHub…</p>
    </div>
  );
}
