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
    ? {
        text: "#F1F5F9",
        sub: "#94A3B8",
        border: "rgba(255,255,255,0.12)",
        bg: "transparent",
        surface: "#161B26",
        accent: "#F97316",
      }
    : {};

// Static CSS (no interpolation) so this stays a plain server component.
// Colours come in through CSS variables set on <nav>.
const CSS = `
.rl-marq{overflow:hidden;padding:14px 0 26px;
}
.rl-track{list-style:none;margin:0;padding:0;display:flex;width:max-content;
  animation:rl-scroll 60s linear infinite;will-change:transform;}
.rl-track li{flex:none;width:260px;margin-right:20px;}
.rl-marq:hover .rl-track,.rl-marq:focus-within .rl-track{animation-play-state:paused;}
@keyframes rl-scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.rl-card{display:block;height:116px;perspective:900px;text-decoration:none;outline:none;}
.rl-flip{position:relative;display:block;width:100%;height:100%;transform-style:preserve-3d;
  transition:transform .65s cubic-bezier(.2,.8,.2,1);}
.rl-f,.rl-b{position:absolute;inset:0;border-radius:14px;padding:18px 20px;
  backface-visibility:hidden;-webkit-backface-visibility:hidden;}
.rl-f{background:var(--rl-front);border:1.5px solid var(--rl-border);
  box-shadow:0 2px 10px rgba(26,35,64,.05);}
.rl-f b{display:block;font-weight:600;font-size:20px;line-height:1.3;color:var(--rl-accent);}
.rl-f small{display:none;font-size:16px;color:var(--rl-sub);margin-top:2px;}
.rl-b{transform:rotateX(180deg);color:#fff;display:flex;flex-direction:column;
  justify-content:space-between;background:linear-gradient(135deg,var(--rl-accent),#b8390b);
  box-shadow:0 14px 28px -10px var(--rl-accent);}
.rl-b span{font-size:17px;line-height:1.5;font-weight:500;}
.rl-b em{font-style:normal;font-weight:600;font-size:14px;opacity:.85;}

@media (hover:hover){
  .rl-card:hover .rl-flip,.rl-card:focus-visible .rl-flip{transform:rotateX(180deg);}
}
.rl-card:focus-visible .rl-f,.rl-card:focus-visible .rl-b{outline:2px solid var(--rl-accent);outline-offset:2px;}

/* touch screens: no hover, so show title + description on the front, no flip */
@media (hover:none){
  .rl-card{height:100%;perspective:none;}
  .rl-track li{display:flex;}
  .rl-track li .rl-card{width:100%;}
  .rl-flip{height:auto;transform-style:flat;}
  .rl-f{position:static;}
  .rl-f small{display:block;}
  .rl-b{display:none;}
}
@media (prefers-reduced-motion:reduce){
  .rl-flip{transition:none;}
  .rl-marq{overflow-x:auto;}
  .rl-track{animation:none;}
  .rl-dup{display:none;}
}
`;

// Server-rendered, crawlable <a href> links (real internal links for SEO).
export default function RelatedLinks({
  title = "Explore more on ILM ORA",
  accentWord = "ILM ORA",
  subtitle = "Explore live courses, certifications, workshops, and learning hubs designed to help you build real-world skills and grow your career.",
  links = [],
  colors = {},
}) {
  const c = {
    text: "#1E293B",
    sub: "#4B5563",
    border: "#EFE0CB",
    bg: "#FFFFFF",
    surface: "#FFFFFF",
    accent: "#F97316",
    ...colors,
  };
  const i = accentWord ? title.indexOf(accentWord) : -1;
  const head = i >= 0 ? [title.slice(0, i), accentWord, title.slice(i + accentWord.length)] : [title];
  const vars = {
    "--rl-text": c.text,
    "--rl-sub": c.sub,
    "--rl-border": c.border,
    "--rl-front": c.surface,
    "--rl-accent": c.accent,
  };
  return (
    <nav
      aria-label={title}
      style={{ ...vars, padding: "64px 0", background: c.bg, borderTop: "1px solid " + c.border }}
    >
      <style>{CSS}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <h2 style={{ fontSize: "clamp(28px, 3.4vw, 38px)", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.02em", color: c.text, margin: "0 0 14px", textAlign: "center" }}>
          {head[0]}
          {head[1] && <span style={{ color: c.accent }}>{head[1]}</span>}
          {head[2]}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 17, lineHeight: 1.7, color: c.sub, maxWidth: 640, margin: "0 auto 28px", textAlign: "center" }}>
            {subtitle}
          </p>
        )}
      </div>
      <div className="rl-marq">
          <ul className="rl-track">
            {links.map((l) => (
              <li key={l.href}>
              <Link href={l.href} className="rl-card">
                <span className="rl-flip">
                  <span className="rl-f">
                    <b>{l.label}</b>
                    <small>{l.desc}</small>
                  </span>
                  <span className="rl-b">
                    <span>{l.desc}</span>
                    <em>Open →</em>
                  </span>
                </span>
              </Link>
              </li>
            ))}
            {/* duplicate set = seamless loop; hidden from screen readers / keyboard */}
            {links.map((l) => (
              <li key={"dup-" + l.href} className="rl-dup" aria-hidden="true">
              <Link href={l.href} className="rl-card" tabIndex={-1}>
                <span className="rl-flip">
                  <span className="rl-f">
                    <b>{l.label}</b>
                    <small>{l.desc}</small>
                  </span>
                  <span className="rl-b">
                    <span>{l.desc}</span>
                    <em>Open →</em>
                  </span>
                </span>
              </Link>
              </li>
            ))}
          </ul>
      </div>
    </nav>
  );
}