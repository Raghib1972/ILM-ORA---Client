import Link from "next/link";

// One shared list of crawlable internal links (real, existing public pages).
export const SITE_LINKS = [
  { href: "/all-courses", label: "All Courses", desc: "Browse live expert-led classes" },
  { href: "/workshops", label: "Workshops", desc: "Live and on-demand workshops" },
  { href: "/student-hub", label: "Student Hub", desc: "Learn, track and grow" },
  { href: "/trainer-hub", label: "Trainer Hub", desc: "Teach and manage classes" },
  { href: "/manager-hub", label: "Manager Hub", desc: "Manage teams and learning" },
  { href: "/aws", label: "AWS Certification", desc: "Courses and exam prep" },
  { href: "/google", label: "Google Certification", desc: "Courses and exam prep" },
  { href: "/microsoft", label: "Microsoft Certification", desc: "Courses and exam prep" },
  { href: "/cisco", label: "Cisco Certification", desc: "Exams and training" },
  { href: "/study-plan", label: "Study Plan", desc: "Personalised learning roadmap" },
  { href: "/pricing", label: "Pricing", desc: "Plans and course fees" },
  { href: "/faq", label: "FAQ", desc: "Answers to common questions" },
];

// Colours for dark / light pages.
export const relatedLinksColors = (isDark) =>
  isDark
    ? { text: "#F1F5F9", sub: "#94A3B8", border: "rgba(255,255,255,0.12)", bg: "transparent", accent: "#F97316" }
    : {};

// Server-rendered, crawlable <a href> links (real internal links for SEO).
export default function RelatedLinks({ title = "Explore more on ILM ORA", links = [], colors = {} }) {
  const c = { text: "#0F172A", sub: "#57606F", border: "#EFE0CB", bg: "transparent", accent: "#F97316", ...colors };
  return (
    <nav aria-label={title} style={{ padding: "48px 24px", background: c.bg, borderTop: "1px solid " + c.border }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: c.text, margin: "0 0 16px" }}>{title}</h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} style={{ display: "block", padding: "12px 14px", border: "1px solid " + c.border, borderRadius: 10, textDecoration: "none", color: c.text }}>
                <span style={{ fontWeight: 700, color: c.accent }}>{l.label}</span>
                <span style={{ display: "block", fontSize: 13, color: c.sub, marginTop: 2 }}>{l.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
