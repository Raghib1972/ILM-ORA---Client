// Reproduces the existing public/sitemap.xml exactly — same URLs, same
// priorities, nothing added or removed. Using Next's sitemap.js convention
// instead of a static file so future page additions can extend this list
// in one place; content is unchanged for this foundation step.
export default function sitemap() {
  const base = "https://ilmora.texora.ai";

  const entries = [
    { path: "/", priority: 1.0 },
    { path: "/all-courses", priority: 0.9 },

    { path: "/student-hub", priority: 0.8 },
    { path: "/trainer-hub", priority: 0.8 },
    { path: "/manager-hub", priority: 0.8 },
    { path: "/resume-builder", priority: 0.8 },

    { path: "/study-abroad", priority: 0.7 },
    { path: "/ilm-ora-gulf", priority: 0.7 },
    { path: "/ilm-ora-meet", priority: 0.7 },
    { path: "/ilm-ora-talk", priority: 0.6 },
    { path: "/platforms", priority: 0.6 },
    { path: "/fde-academy", priority: 0.6 },
    { path: "/workspace", priority: 0.6 },

    { path: "/school-class", priority: 0.6 },
    { path: "/school-class/9", priority: 0.6 },
    { path: "/school-class/9/math", priority: 0.6 },
    { path: "/school-class/9/ai", priority: 0.6 },

    { path: "/about", priority: 0.6 },
    { path: "/pricing", priority: 0.6 },
    { path: "/careers", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
    { path: "/faq", priority: 0.5 },
    { path: "/help-center", priority: 0.5 },

    { path: "/ai-companion", priority: 0.6 },
    { path: "/whiteboard", priority: 0.6 },
    { path: "/coding-lab", priority: 0.6 },
    { path: "/study-plan", priority: 0.6 },

    { path: "/privacy-policy", priority: 0.3 },
    { path: "/terms-of-service", priority: 0.3 },
  ];

  return entries.map((e) => ({
    url: `${base}${e.path}`,
    priority: e.priority,
  }));
}
