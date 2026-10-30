"use client";

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   HR Hub page  â†’  src/legacy-pages/Landing/HRHub.jsx

   Needs these files next to it (same folder):
     hrHub.css Â· hrHubData.js Â· hrHubEngine.js

   What this page contains
   1. Cinematic "wow" intro (video hero, live counters, parallax orbs, media marquee)
   2. The COMPLETE HR Hub app from hr-hub-full-home.html (engine):
      Home Â· All modules (21) Â· Module pages Â· Lessons Â· 24-week journey Â· Lifecycle Â·
      Templates Â· Assessment quiz Â· Analytics Â· Texora demo Â· About Â· Glossary Â·
      My Progress Â· Ctrl+K search Â· theme toggle Â· progress bar Â· chat button
   3. All 24 images + 8 videos from src/assets/HR-Hub auto-imported and mapped.
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

import { useEffect, useMemo, useRef, useState } from "react";
import PublicLayout, { openSignupModal } from "./components/PublicLayout";
import mountHRHub from "./hr-hubEngine";
import "./hr-hub.css";

/* â”€â”€ Auto-import every image / video (extension doesn't matter) â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const imgCtx = require.context("../../assets/HR-Hub/images", false, /\.(jpe?g|png|webp|avif)$/i);
const vidCtx = require.context("../../assets/HR-Hub/videos", false, /\.(mp4|webm|mov)$/i);

const toUrl = (m) => {
  const d = m && m.default !== undefined ? m.default : m;
  return typeof d === "string" ? d : d?.src || "";
};
const build = (ctx) => ctx.keys().map((k) => ({ k, url: toUrl(ctx(k)) }));
const IMGS = build(imgCtx);
const VIDS = build(vidCtx);
const IMG_URLS = IMGS.map((f) => f.url);
const VID_URLS = VIDS.map((f) => f.url);

const img = (part) => IMGS.find((f) => f.k.includes(part))?.url || "";
const vid = (part) => VIDS.find((f) => f.k.includes(part))?.url || "";

/* â”€â”€ Which file shows where â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
// Module 1..21 â†’ image (unique part of the filename)
const MODULE_IMG = {
  1: "edmond-dantes", 2: "rock-staar", 3: "8wLZi9OhsWU", 4: "mizunokozuki", 5: "danilyuk-7654163",
  6: "danilyuk-8112158", 7: "mikhail-nilov", 8: "silverkblack", 9: "gustavo-fring", 10: "heiYgqp0Tsk",
  11: "tima-miroshnichenko", 12: "shkrabaanthony", 13: "carlos-muza", 14: "yankrukov", 15: "sora-shimazaki",
  16: "Kxo17w7BurY", 17: "SvYifX5HkeQ", 18: "TCZ12fCpFVw", 19: "campaign-creators", 20: "cottonbro",
  21: "radission-us",
};
// Domain cards
const DOMAIN_IMG = {
  ta: "edmond-dantes", ops: "5668839", rew: "danilyuk-7654163", dev: "silverkblack",
  exp: "Kxo17w7BurY", gov: "heiYgqp0Tsk", str: "carlos-muza", sal: "radission-us",
};
// Employee-lifecycle stages (9) â€“ cycled through the remaining photos
const LIFECYCLE_IMG = [
  "carlos-muza", "edmond-dantes", "gustavo-fring", "rock-staar", "5668839",
  "mikhail-nilov", "Kxo17w7BurY", "danilyuk-7654163", "cottonbro",
];
// Section banner images
const BANNER_IMG = {
  hero: "windows-WJPHT", journey: "werner-pfennig", classification: "mizunokozuki", templates: "tima-miroshnichenko",
  assessment: "silverkblack", analytics: "shkrabaanthony", demo: "yankrukov", about: "vitaly-gariev-TCZ12fCpFVw",
  "hr-sales": "redd-francisco",
};
// Section banner videos
const BANNER_VID = {
  welcome: "7647627", journey: "46285", "hr-sales": "273922", assessment: "8716579",
  analytics: "5439075", demo: "6325854", about: "7252825",
};
// Wide / tall clips used for module + demo slots (cycled so every video is used)
const VIDEO_CYCLE = ["46285", "273922", "8716579", "7647627", "5439075", "6325854", "7252825", "8558444"];

const resolveImg = (key) => {
  let m;
  if ((m = key.match(/^module-(\d+)$/))) return img(MODULE_IMG[+m[1]] || "");
  if ((m = key.match(/^domain-(\w+)$/))) return img(DOMAIN_IMG[m[1]] || "");
  if ((m = key.match(/^lifecycle-(\d+)$/))) return img(LIFECYCLE_IMG[(+m[1] - 1) % LIFECYCLE_IMG.length]);
  if (BANNER_IMG[key]) return img(BANNER_IMG[key]) || IMG_URLS[0] || "";
  return "";
};
const resolveVid = (key) => {
  if (BANNER_VID[key]) return vid(BANNER_VID[key]);
  let m;
  if ((m = key.match(/^module-(\d+)(?:-(?:walkthrough|demo))?$/))) {
    const n = +m[1];
    const off = key.endsWith("-walkthrough") ? 3 : key.endsWith("-demo") ? 5 : 0;
    return vid(VIDEO_CYCLE[(n + off) % VIDEO_CYCLE.length]);
  }
  if ((m = key.match(/^demo-(\d+)$/))) return vid(VIDEO_CYCLE[(+m[1] - 1) % VIDEO_CYCLE.length]);
  return "";
};

/* â”€â”€ Little helpers for the wow intro â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

function Counter({ to, suffix = "", seen }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, t0;
    const tick = (t) => {
      t0 = t0 || t;
      const p = Math.min(1, (t - t0) / 1600);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <>{v}{suffix}</>;
}

function LazyVideo({ src, className = "", style }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    const near = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); near.disconnect(); } }, { rootMargin: "300px" });
    near.observe(el);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.5 });
    io.observe(el);
    return () => { near.disconnect(); io.disconnect(); };
  }, [src]);
  if (!src) return <div className={className} style={{ background: "linear-gradient(135deg,#2e9b3e,#f97316)", ...style }} />;
    return (
    <video
      ref={ref}
      src={on ? `${src}#t=0.1` : undefined}
      muted loop playsInline preload="metadata"
      className={className}
      style={style}
      onLoadedData={(e) => {
        const v = e.currentTarget, r = v.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > window.innerHeight * 0.1) v.play().catch(() => {});
      }}
    />
  );
}

const STATS = [
  [21, "", "HR modules"],
  [24, "", "Week journey"],
  [100, "+", "Lessons"],
  [50, "+", "Templates"],
];

const HUB_LINKS = [
  ["", "Home"], ["modules", "Modules"], ["journey", "Journey"], ["p/lifecycle", "Lifecycle"],
  ["templates", "Templates"], ["p/assess", "Assessment"], ["p/analytics", "Analytics"],
  ["p/demo", "Texora Demo"], ["glossary", "Glossary"], ["p/about", "About"], ["me", "My Progress"],
];

function HubSubNav() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    on();
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const h = hash.replace(/^#\/?/, "").split("/");
  const k = h[0];
  const act = k === "m" || k === "l" ? "modules" : k === "p" ? "p/" + h[1] : k;
    const go = () => {};
  return (
    <nav className="hrx-sn" aria-label="HR Hub sections">
      <div className="hrx-sn-in">
        {HUB_LINKS.map(([r, label]) => (
          <a key={r || "home"} href={`#/${r}`} className={act === r ? "on" : ""} onClick={go}>{label}</a>
        ))}
      </div>
    </nav>
  );
}

const CSS = `
.hrx-wow{position:relative;overflow:hidden;color:#fff;isolation:isolate;min-height:640px;display:flex;align-items:center}
.hrx-wow video,.hrx-wow .hrx-fallback{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-3;transform:scale(1.06);animation:hrxZoom 24s ease-in-out infinite alternate}
@keyframes hrxZoom{to{transform:scale(1.16)}}
.hrx-wow:after{content:"";position:absolute;inset:0;z-index:-2;background:
 radial-gradient(60% 80% at 15% 30%,rgba(249,115,22,.35),transparent 60%),
 radial-gradient(50% 70% at 90% 80%,rgba(46,155,62,.35),transparent 60%),
 linear-gradient(100deg,rgba(12,8,4,.93) 22%,rgba(12,8,4,.45))}
.hrx-in{max-width:1200px;margin:auto;padding:90px 24px 80px;width:100%;position:relative}
.hrx-pill{display:inline-flex;gap:8px;align-items:center;padding:8px 18px;border-radius:40px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(10px)}
.hrx-pill i{width:8px;height:8px;border-radius:50%;background:#4ade80;box-shadow:0 0 0 0 rgba(74,222,128,.7);animation:hrxPing 1.8s infinite}
@keyframes hrxPing{70%{box-shadow:0 0 0 12px rgba(74,222,128,0)}}
.hrx-h1{font:700 clamp(40px,6.6vw,84px)/1.02 'Space Grotesk',Inter,sans-serif;letter-spacing:-2px;margin:22px 0 18px;max-width:880px}
.hrx-h1 span{background:linear-gradient(90deg,#fb923c,#4ade80,#fb923c);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:hrxShine 5s linear infinite}
@keyframes hrxShine{to{background-position:200% center}}
.hrx-sub{font-size:clamp(16px,1.7vw,21px);color:#e7dccf;max-width:640px}
.hrx-btns{display:flex;gap:14px;flex-wrap:wrap;margin-top:34px}
.hrx-b1,.hrx-b2{padding:15px 28px;border-radius:14px;font-weight:700;border:0;cursor:pointer;font-size:16px;transition:transform .25s,box-shadow .25s}
.hrx-b1{background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;box-shadow:0 10px 30px rgba(249,115,22,.5)}
.hrx-b2{background:rgba(255,255,255,.1);color:#fff;border:1.5px solid rgba(255,255,255,.4);backdrop-filter:blur(8px)}
.hrx-b1:hover,.hrx-b2:hover{transform:translateY(-3px) scale(1.03)}
.hrx-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:54px;max-width:760px}
.hrx-st{padding:16px 18px;border-radius:18px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(12px)}
.hrx-st b{display:block;font:700 34px 'Space Grotesk',sans-serif;color:#fdba74}
.hrx-st span{font-size:13px;color:#e7dccf}
.hrx-orb{position:absolute;border-radius:50%;filter:blur(2px);opacity:.55;animation:hrxFloat 9s ease-in-out infinite;z-index:-1}
@keyframes hrxFloat{50%{transform:translateY(-34px) translateX(14px)}}
.hrx-scroll{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);width:26px;height:42px;border:2px solid rgba(255,255,255,.6);border-radius:16px}
.hrx-scroll:after{content:"";position:absolute;left:50%;top:8px;width:4px;height:8px;margin-left:-2px;border-radius:3px;background:#fff;animation:hrxWheel 1.6s infinite}
@keyframes hrxWheel{to{transform:translateY(14px);opacity:0}}
.hrx-mq{background:#17110b;padding:20px 0;overflow:hidden;border-block:1px solid rgba(255,255,255,.08)}
.hrx-track{display:flex;gap:16px;width:max-content;animation:hrxMq 60s linear infinite}
.hrx-mq:hover .hrx-track{animation-play-state:paused}
@keyframes hrxMq{to{transform:translateX(-50%)}}
.hrx-track img{height:130px;width:200px;object-fit:cover;border-radius:16px;filter:saturate(1.1);transition:transform .35s,filter .35s}
.hrx-track img:hover{transform:scale(1.1) rotate(-1.5deg);filter:saturate(1.4)}
.hrx-reel{max-width:1200px;margin:0 auto;padding:70px 24px 10px}
.hrx-reel h2{font:700 clamp(28px,4vw,44px) 'Space Grotesk',sans-serif;letter-spacing:-1px;color:var(--tx,#0f172a)}
.hrx-reel p{color:var(--mu,#475569);margin:8px 0 26px;max-width:620px}
.hrx-vg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.hrx-vg figure{position:relative;border-radius:20px;overflow:hidden;box-shadow:0 18px 40px rgba(15,23,42,.18);transition:transform .35s;margin:0}
.hrx-vg figure:hover{transform:translateY(-8px) scale(1.02)}
.hrx-vg video,.hrx-vg .hrx-fb{display:block;width:100%;aspect-ratio:9/14;object-fit:cover}
.hrx-vg figure.w{grid-column:span 2}.hrx-vg figure.w video,.hrx-vg figure.w .hrx-fb{aspect-ratio:16/10}
.hrx-vg figcaption{position:absolute;inset:auto 0 0;padding:34px 16px 14px;font-weight:700;font-size:15px;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.8))}
.hrx-cta{position:relative;overflow:hidden;color:#fff;text-align:center;padding:90px 24px;isolation:isolate;margin-top:30px}
.hrx-cta img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
.hrx-cta:before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(120deg,rgba(12,8,4,.88),rgba(20,60,28,.75))}
.hrx-cta h2{font:700 clamp(30px,4.6vw,54px)/1.08 'Space Grotesk',sans-serif;max-width:800px;margin:auto}
.hrx-cta p{margin:14px auto 28px;max-width:560px;color:#e7dccf}
.hrx-rv{opacity:0;transform:translateY(30px);transition:opacity .8s,transform .8s}.hrx-rv.in{opacity:1;transform:none}
@media(max-width:900px){.hrx-stats{grid-template-columns:repeat(2,1fr)}.hrx-vg{grid-template-columns:repeat(2,1fr)}.hrx-vg figure.w{grid-column:span 2}.hrx-wow{min-height:560px}}
@media(prefers-reduced-motion:reduce){.hrx-wow video,.hrx-wow .hrx-fallback,.hrx-track,.hrx-orb{animation:none}}
:root{--hrx-nav:68px}
.hrx-sn{position:sticky;top:var(--hrx-nav,68px);z-index:25;background:#2a2a2a;color:#fff;border-bottom:1px solid rgba(255,255,255,.06)}
.hrx-sn-in{max-width:1400px;margin:0 auto;display:flex;align-items:center;gap:4px;padding:6px 32px;overflow-x:auto;scrollbar-width:none;font:600 14px/1 Inter,system-ui,sans-serif}
.hrx-sn-in::-webkit-scrollbar{display:none}
.hrx-sn a{padding:8px 14px;border-radius:8px;white-space:nowrap;color:#fff;text-decoration:none;transition:background .2s,color .2s}
.hrx-sn a:hover{color:#f97316}
.hrx-sn a.on{background:#f97316;color:#fff}
.hrx-sn-ic{margin-left:auto;flex:none;min-width:34px;height:32px;border:1px solid #555;border-radius:8px;background:none;color:#fff;cursor:pointer}
.hrx-sn-ic:hover{border-color:#f97316}
.hrx-pill{background:rgba(255,255,255,.92);border:1.5px solid #2e9b3e;color:#2e9b3e;backdrop-filter:none;padding:7px 16px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.hrx-pill i{background:#2e9b3e}
.hrx-wow{min-height:0}
.hrx-in{padding:44px 24px 40px}
.hrx-h1{font-size:clamp(30px,4.6vw,54px);letter-spacing:-1.2px;margin:14px 0 12px;max-width:760px}
.hrx-sub{font-size:clamp(14px,1.3vw,17px);max-width:600px}
.hrx-btns{margin-top:20px;gap:10px}
.hrx-b1,.hrx-b2{padding:11px 20px;font-size:14px;border-radius:12px}
.hrx-stats{margin-top:26px;gap:10px;max-width:640px}
.hrx-st{padding:10px 14px;border-radius:14px}
.hrx-st b{font-size:24px}
.hrx-st span{font-size:12px}
.hrx-scroll{display:none}
.hrx-mq{padding:12px 0}
.hrx-track img{height:84px;width:130px;border-radius:12px}
.hrx-reel{padding:40px 24px 6px}
.hrx-reel h2{font-size:clamp(22px,3vw,32px)}
.hrx-reel p{margin:6px 0 18px}
.hrx-vg{gap:10px}
.hrx-cta{padding:52px 24px;margin-top:18px}
.hrx-cta h2{font-size:clamp(24px,3.2vw,38px)}
.hrx-cta p{margin:10px auto 20px}
@media(max-width:900px){.hrx-sn-in{padding:6px 14px}}
.hrx-wow video,.hrx-wow .hrx-fallback{animation:none;transform:none}
.hrx-orb{display:none}
.hrx-pill,.hrx-b2,.hrx-st{backdrop-filter:none;-webkit-backdrop-filter:none}
.hrx-mq{contain:content}
.hrx-track{animation-duration:80s;will-change:transform}
.hrx-track img{filter:none}
.hrx-vg figure{box-shadow:0 8px 20px rgba(15,23,42,.14)}

`;

export default function HRHub({ theme: themeProp, toggleTheme: toggleProp, scrollToSection }) {
  const [localTheme, setLocalTheme] = useState("light");
  const theme = themeProp ?? localTheme;
  const toggleTheme = toggleProp ?? (() => setLocalTheme((t) => (t === "dark" ? "light" : "dark")));

  const rootRef = useRef(null);
  const [statsRef, statsSeen] = useInView(0.3);
  const [reelRef, reelSeen] = useInView(0.12);

  /* mount the complete HR Hub app (all sections / routes from the HTML) */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!location.hash) location.hash = "#/";
    const unmount = mountHRHub(root, { img: resolveImg, vid: resolveVid });
    return unmount;
  }, []);

  /* keep the HR Hub dark/light in sync with the site theme */
  useEffect(() => {
    if (rootRef.current) rootRef.current.dataset.theme = theme === "dark" ? "dark" : "";
  }, [theme]);

  const marquee = useMemo(() => { const mq = IMG_URLS.slice(0, 12); return [...mq, ...mq]; }, []);
  const heroVideo = vid("7647627") || VID_URLS[0];

  const reel = [
    ["46285", "Teams at work", true],
    ["5439075", "Interview room"],
    ["6325854", "Coaching moment"],
    ["273922", "Hiring conversations", true],
    ["7252825", "Team huddle"],
    ["8558444", "Policy review"],
    ["8716579", "Training sessions", true],
    ["7647627", "Learning spaces", true],
  ];
  const goApp = () => rootRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} scrollToSection={scrollToSection}>
            <style>{CSS}</style>
                  <div className="hrx-page" data-theme={theme === "dark" ? "dark" : "light"}>
      <HubSubNav />

      {/* â•â• 1. WOW HERO â•â• */}
      <section className="hrx-wow">
        {heroVideo ? (
        <video src={heroVideo} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <div className="hrx-fallback" style={{ background: "linear-gradient(135deg,#2e9b3e,#f97316)" }} />
        )}
        <span className="hrx-orb" style={{ width: 220, height: 220, right: "8%", top: "12%", background: "radial-gradient(circle at 30% 30%,#fdba74,#f97316 60%,transparent 70%)" }} />
        <span className="hrx-orb" style={{ width: 160, height: 160, right: "22%", bottom: "14%", animationDelay: "-3s", background: "radial-gradient(circle at 30% 30%,#86efac,#2e9b3e 60%,transparent 70%)" }} />
        <span className="hrx-orb" style={{ width: 90, height: 90, left: "46%", top: "16%", animationDelay: "-6s", background: "radial-gradient(circle at 30% 30%,#7dd3fc,#0ea5e9 60%,transparent 70%)" }} />

        <div className="hrx-in">
          
          <h1 className="hrx-h1">
            Learn HR from <span>first hire to final exit</span>
          </h1>
          <p className="hrx-sub">
            Lessons, workflows, templates, case studies, quizzes and Texora AI demos, all in one guided journey.
            Open it, click anything, and watch the whole HR world come alive.
          </p>
          <div className="hrx-btns">
            <button className="hrx-b1" onClick={goApp}>Explore the Hub &darr;</button>
            <button className="hrx-b2" onClick={openSignupModal}>Start learning free</button>
          </div>

          <div className="hrx-stats" ref={statsRef}>
            {STATS.map(([n, s, l]) => (
              <div className="hrx-st" key={l}>
                <b><Counter to={n} suffix={s} seen={statsSeen} /></b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hrx-scroll" aria-hidden />
      </section>

      {/* â•â• 2. IMAGE MARQUEE (all 24 photos) â•â• */}
      {IMG_URLS.length > 0 && (
        <div className="hrx-mq" aria-hidden>
          <div className="hrx-track">
                        {marquee.map((u, i) => <img key={i} src={u} alt="" loading="lazy" decoding="async" width="130" height="84" />)}
          </div>
        </div>
      )}

      {/* â•â• 3. THE COMPLETE HR HUB APP (everything from the HTML) â•â• */}
      <div ref={rootRef} className="hrh" id="hr-hub-app" />

      {/* â•â• 4. VIDEO REEL (all 8 videos) â•â• */}
      <section className="hrx-reel" ref={reelRef} style={{ opacity: reelSeen ? 1 : 0, transition: "opacity .8s" }}>
        <h2>HR in action</h2>
        <p>Short scenario clips from the demo catalogue. They play as you scroll.</p>
        <div className="hrx-vg">
          {reel.map(([k, label, wide]) => (
            <figure key={k} className={wide ? "w" : ""}>
                            {reelSeen ? <LazyVideo src={vid(k)} className="hrx-fb" /> : <div className="hrx-fb" style={{ background: "#17110b" }} />}
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* â•â• 5. FINAL CTA â•â• */}
      <section className="hrx-cta">
        {img("windows-WJPHT") && <img src={img("windows-WJPHT")} alt="" loading="lazy" />}
        <h2>Ready to build your HR career?</h2>
        <p>Create a free account and start with Module 1 today.</p>
        <button className="hrx-b1" onClick={openSignupModal}>Get started</button>
      </section>
      </div>
    </PublicLayout>
  );
}
