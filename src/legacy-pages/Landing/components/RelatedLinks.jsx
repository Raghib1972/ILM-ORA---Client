"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// One shared list of crawlable internal links (real, existing public pages).
export const SITE_LINKS = [
  { href: "/all-courses", label: "All Courses", desc: "Browse live expert-led classes" },
  { href: "/workshops", label: "Workshops", desc: "Live and on-demand workshops" },
  { href: "/student-hub", label: "Student Hub", desc: "Learn, track and grow" },
  { href: "/trainer-hub", label: "Trainer Hub", desc: "Teach and manage classes" },
  { href: "/manager-hub", label: "Manager Hub", desc: "Manage teams and learning" },
  
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

const CSS = `
.rl-marq{overflow:hidden;padding:4px 0 6px;}
.rl-track{list-style:none;margin:0;padding:0;display:flex;width:max-content;
  animation:rl-scroll 60s linear infinite;will-change:transform;}
.rl-track li{flex:none;width:210px;margin-right:14px;}
.rl-marq:hover .rl-track,.rl-marq:focus-within .rl-track{animation-play-state:paused;}
@keyframes rl-scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.rl-card{display:block;height:64px;perspective:900px;text-decoration:none;outline:none;
  -webkit-tap-highlight-color:transparent;}
.rl-flip{position:relative;display:block;width:100%;height:100%;transform-style:preserve-3d;
  transition:transform .65s cubic-bezier(.2,.8,.2,1);}
.rl-f,.rl-b{position:absolute;inset:0;border-radius:12px;padding:10px 14px;
  backface-visibility:hidden;-webkit-backface-visibility:hidden;}
.rl-f{background:var(--rl-front);border:1.5px solid var(--rl-border);
  box-shadow:0 2px 10px rgba(26,35,64,.05);}
.rl-f b{display:block;font-weight:400;font-size:16px;line-height:1.3;color:var(--rl-accent);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.rl-f small{display:none;font-size:13px;color:var(--rl-sub);margin-top:2px;}
.rl-b{transform:rotateX(180deg);color:#fff;display:flex;flex-direction:column;
  justify-content:space-between;background:linear-gradient(135deg,var(--rl-accent),#b8390b);
  box-shadow:0 10px 22px -12px rgba(249,115,22,.5);}
.rl-b span{font-size:12px;line-height:1.35;font-weight:400;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.rl-b em{font-style:normal;font-weight:500;font-size:12px;opacity:.85;}

/* big monitors: slightly wider cards, still compact */
@media (min-width:1800px){
  .rl-track li{width:240px;margin-right:16px;}
}

@media (hover:hover) and (pointer:fine){
  .rl-card:hover .rl-flip,.rl-card:focus-visible .rl-flip{transform:rotateX(180deg);}
}
.rl-card:focus-visible .rl-f,.rl-card:focus-visible .rl-b{outline:2px solid var(--rl-accent);outline-offset:2px;}

/* touch screens: no hover. Card in the centre of the screen (.rl-on) or being pressed turns orange. */

@media (hover:none), (pointer:coarse){
  .rl-marq{
    width:100%;
    overflow:hidden;
  }

  .rl-track{
    display:flex;
    width:max-content;
    align-items:stretch;
    animation:rl-scroll 35s linear infinite;
    will-change:transform;
  }

  .rl-track li{
    display:block;
    flex:0 0 210px;
    width:210px;
    margin-right:14px;
  }

  .rl-track li .rl-card{
    display:block;
    width:100%;
    height:74px;
    box-sizing:border-box;
    perspective:none;
  }

  .rl-flip{
    display:block;
    width:100%;
    height:100%;
    transform-style:flat;
  }

  .rl-f{
    position:static;
    display:block;
    box-sizing:border-box;
    width:100%;
    height:100%;
    padding:10px 14px;
    overflow-wrap:break-word;
    transition:background .35s ease,border-color .35s ease,box-shadow .35s ease;
  }

  .rl-f b{
    font-size:15px;
    transition:color .35s ease;
  }

  .rl-f small{
    display:block;
    font-size:12px;
    line-height:1.4;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    transition:color .35s ease;
  }

  .rl-b{
    display:none;
  }

  .rl-card.rl-on .rl-f,
  .rl-card:active .rl-f{
    background:linear-gradient(135deg,var(--rl-accent),#b8390b);
    border-color:transparent;
    box-shadow:0 10px 22px -12px rgba(249,115,22,.5);
  }

  .rl-card.rl-on .rl-f b,
  .rl-card.rl-on .rl-f small,
  .rl-card:active .rl-f b,
  .rl-card:active .rl-f small{
    color:#fff;
  }

  .rl-marq:active .rl-track{
    animation-play-state:paused;
  }
}

@media (prefers-reduced-motion:reduce){
  .rl-flip{transition:none;}
  .rl-marq{overflow-x:auto;}
  .rl-track{animation:none;}
  .rl-dup{display:none;}
}
`;

export default function RelatedLinks({
  title = "Explore more on ILM ORA",
  accentWord = "ILM ORA",
  subtitle = "Explore live courses, certifications, workshops, and learning hubs designed to help you build real-world skills and grow your career.",
  links = [],
  colors = {},
}) {
  const marqRef = useRef(null);

  // Touch devices: highlight the card that is passing through the screen centre.
  useEffect(() => {
    const root = marqRef.current;
    if (!root || typeof window === "undefined") return;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!touch || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.target.classList.toggle("rl-on", e.isIntersecting)
        );
      },
      {
        root: null,
        rootMargin: "0px -35% 0px -35%",
        threshold: 0,
      }
    );

    root.querySelectorAll(".rl-card").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [links]);

  const c = {
    text: "#1E293B",
    sub: "#4B5563",
    border: "#E2E8F0",
    bg: "transparent",
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

  const card = (l, extra = {}) => (
    <Link href={l.href} className="rl-card" {...extra}>
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
  );

  return (
    <nav
      aria-label={title}
      onTouchStart={() => {}} /* lets :active work on iOS Safari */
      style={{
        ...vars,
        padding: "10px 0",
        background: c.bg,
        borderTop: "none",
        overflowX: "clip",
      }}
    >
      <style>{CSS}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Full-width white box: heading + subheading, each on one line */}
        <div
          style={{
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
            maxWidth: "none",
            boxSizing: "border-box",
            background: c.surface,
            borderTop: `1px solid ${c.border}`,
            borderBottom: `1px solid ${c.border}`,
            boxShadow: "0 1px 3px rgba(15,23,42,0.06)",
            padding: "10px 16px",
            marginBottom: 10,
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(16px, 2.2vw, 24px)",
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: c.text,
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {head[0]}
            {head[1] && <span style={{ color: c.accent }}>{head[1]}</span>}
            {head[2]}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: "clamp(11px, 1.3vw, 14px)",
                fontWeight: 400,
                lineHeight: 1.4,
                color: c.sub,
                margin: "2px 0 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="rl-marq" ref={marqRef}>
        <ul className="rl-track">
          {links.map((l) => (
            <li key={l.href}>{card(l)}</li>
          ))}
          {/* duplicate set = seamless loop; hidden from screen readers / keyboard */}
          {links.map((l) => (
            <li key={"dup-" + l.href} className="rl-dup" aria-hidden="true">
              {card(l, { tabIndex: -1 })}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}