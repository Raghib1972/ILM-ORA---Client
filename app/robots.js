// Reproduces the existing public/robots.txt exactly.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/student/",
        "/trainer/",
        "/admin/",
        "/business/",
        "/superadmin/",

        "/login",
        "/reset-password",
        "/verify-email",
        "/approval-pending",
        "/apply-admin",
        "/ilm-demo",

        "/workspace/",
        "/ilmorameet/",
        "/public/book-session",
        "/public/join-session",
        "/public/booking-confirmation",
        "/public/session-complete",
        "/public/sessions",
      ],
    },
    sitemap: "https://ilmora.texora.ai/sitemap.xml",
  };
}
