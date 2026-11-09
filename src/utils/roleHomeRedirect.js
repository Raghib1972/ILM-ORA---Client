// Role -> real dashboard URL (IlmDemoSidebar ke ROLE_HOME_PATH ke same)
export function getRoleHomeRoute(role) {
  const r = (role || "").toString().trim().toUpperCase();
  if (r === "SUPER_ADMIN") return "/superadmin";
  if (r === "BUSINESS") return "/business";
  if (["ADMIN", "TENANT_ADMIN", "MANAGER", "PARTNERSHIP"].includes(r))
    return "/admin";
  if (r === "TRAINER") return "/trainer";
  if (r === "STUDENT") return "/student";
  return "/onboarding"; // role unknown (onboarding pending)
}