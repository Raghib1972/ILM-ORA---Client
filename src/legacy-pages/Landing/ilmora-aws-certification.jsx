
"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@/lib/routerCompat";

// Same shared shell (AnnouncementBanner, Navbar, Footer) used by StudyAbroad, Careers, About etc.
import PublicLayout from "../Landing/components/PublicLayout";
// Data now lives in awsCertData.js (shared with the detail page)
import { CERTS, LEVELS } from "./awsCertData";

const LEVEL_NAMES = Object.keys(LEVELS);
const countBy = (l) => CERTS.filter((c) => c.level === l).length;

/* ---------- HOOKS ---------- */
function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Count({ to, prefix = "" }) {
  const [ref, seen] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, t0;
    const step = (t) => {
      t0 = t0 || t;
      const p = Math.min((t - t0) / 1200, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{prefix}{n}</span>;
}

/* ---------- 3D HERO STACK ---------- */
function HeroStack({ onPick }) {
  const [r, setR] = useState({ x: 58, z: -38 });
  const [hot, setHot] = useState(null);
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    setR({ x: 58 - py * 18, z: -38 + px * 30 });
  };
  const order = [...LEVEL_NAMES].reverse();
  return (
    <div className="stage" onPointerMove={move} onPointerLeave={() => setR({ x: 58, z: -38 })}>
      <div className="glow" />
      <div className="stack" style={{ transform: `rotateX(${r.x}deg) rotateZ(${r.z}deg)` }}>
        {order.map((l, i) => (
          <button
            key={l}
            className={"plate" + (hot === l ? " hot" : "")}
            style={{ "--c": LEVELS[l].color, "--n": order.length - 1 - i, "--d": `${i * 0.35}s` }}
            onMouseEnter={() => setHot(l)}
            onMouseLeave={() => setHot(null)}
            onClick={() => onPick(l)}
            aria-label={`Show ${l} certifications`}
          >
            <span className="plate-label">{l}</span>
            <span className="plate-count">{countBy(l)} exams</span>
          </button>
        ))}
      </div>
      <p className="stage-hint">Move your mouse. Tap a layer to see its exams.</p>
    </div>
  );
}

/* ---------- FLIP CARD ---------- */
function CertCard({ c, i }) {
  const [flip, setFlip] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [ref, seen] = useReveal();
  const navigate = useNavigate();
  const col = LEVELS[c.level].color;
  // opens OUR OWN detail page: /ilmora-aws-certification/clf-c02
  const go = () => navigate(`/ilmora-aws-certification/${c.code.toLowerCase()}`);
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    setTilt({ x: -((e.clientY - b.top) / b.height - 0.5) * 12, y: ((e.clientX - b.left) / b.width - 0.5) * 14 });
  };
  return (
    <div ref={ref} className={"card-wrap" + (seen ? " in" : "")} style={{ "--c": col, "--i": i % 3 }}>
      <div
        className="card-tilt"
        onMouseMove={move}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className={"card" + (flip ? " flip" : "")}>
          <div className="face front">
            <div className="tag">{c.level}</div>
            <h3>{c.name}</h3>
            <div className="code">{c.code}</div>
            <div className="meta">
              <div><b>${c.fee}</b><span>Exam fee</span></div>
              <div><b>{c.time}</b><span>Exam time</span></div>
              <div><b>3 yrs</b><span>Valid for</span></div>
            </div>
            <div className="front-actions">
              <button className="flip-btn" onClick={() => setFlip(true)}>See what it covers</button>
              <button className="guide" onClick={go}>Exam guide</button>
            </div>
          </div>
          <div className="face back">
            <h4>Best for</h4>
            <p>{c.role}</p>
            <h4>Before you start</h4>
            <p>{c.exp}. {c.elig}.</p>
            <h4>You will work with</h4>
            <div className="chips">{c.tech.map((t) => <i key={t}>{t}</i>)}</div>
            <div className="back-actions">
              <button className="flip-btn" onClick={() => setFlip(false)}>Back</button>
              <button className="guide" onClick={go}>Exam guide</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cube({ t, d, i }) {
  const [on, setOn] = useState(false);
  return (
    <div
      className={"cube-scene" + (on ? " on" : "")}
      style={{ "--i": i }}
      role="button"
      tabIndex={0}
      onClick={() => setOn(!on)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOn(!on)}
    >
      <div className="cube">
        <div className="cf f1"><h3>{t}</h3></div>
        <div className="cf f2"><p>{d}</p></div>
      </div>
    </div>
  );
}

/* ---------- PAGE ---------- */
export default function IlmoraCertification({ theme, toggleTheme, setShowLoginModal, scrollToSection, signupUrl = "" }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
  useEffect(() => { document.title = "AWS Certification Courses | ILM ORA"; }, []);
  const [level, setLevel] = useState("All");
  const listRef = useRef(null);
  const pick = (l) => {
    setLevel(l);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const shown = level === "All" ? CERTS : CERTS.filter((c) => c.level === level);
  const [pathRef, pathSeen] = useReveal();
  const [whyRef, whySeen] = useReveal();

  return (
    <PublicLayout
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
      scrollToSection={scrollToSection}
    >
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
    <div className={"ilm" + (isDark ? " dark" : "")}>

      {/* HERO */}
      <section className="hero cream">
        <div className="hero-copy">
         
         <h1>Get certified on the cloud <span style={{ color: "#F97316" }}>that runs half the internet.</span></h1>
          <p>
            AWS offers 12 exams across four levels. Learn what each one teaches, who it is for and what it
            costs, then pick the path that fits your job goal. ILM ORA trains you with projects and
            assessments until you are exam ready.
          </p>
          <div className="cta-row">
            <button className="btn primary" onClick={() => pick("All")}>Explore all exams</button>
            <button className="btn ghost" onClick={() => pathRef.current?.scrollIntoView({ behavior: "smooth" })}>Find my path</button>
          </div>
        </div>
        <HeroStack onPick={pick} />
      </section>

      {/* STATS */}
      <section className="stats white">
        <div><b><Count to={CERTS.length} /></b><span>AWS exams covered</span></div>
        <div><b><Count to={100} prefix="$" /></b><span>Lowest exam fee</span></div>
        <div><b><Count to={3} /> yrs</b><span>Every certificate stays valid</span></div>
        <div><b><Count to={0} /></b><span>Prerequisites to sit any exam</span></div>
      </section>

      {/* PATH */}
      <section className="sec cream" ref={pathRef}>
        <h2>Four levels. One clear way up.</h2>
        <p className="sub">Each level builds on the last. You can start at any of them, but this is the usual order.</p>
        <div className={"stairs" + (pathSeen ? " in" : "")}>
          {LEVEL_NAMES.map((l, i) => (
            <button key={l} className="step" style={{ "--c": LEVELS[l].color, "--h": `${130 + i * 62}px`, "--i": i }} onClick={() => pick(l)}>
              <div className="step-top">
                <small>Step {i + 1}</small>
                <strong>{l}</strong>
                <p>{LEVELS[l].blurb}</p>
              </div>
              <div className="step-block"><span>{countBy(l)} exams</span></div>
            </button>
          ))}
        </div>
      </section>

      {/* CERT LIST */}
      <section className="sec white" ref={listRef}>
        <h2>Pick an exam</h2>
        <p className="sub">Flip any card to see who it suits, what you need beforehand and which AWS services it tests.</p>
        <div className="tabs" role="tablist">
          {["All", ...LEVEL_NAMES].map((l) => (
            <button key={l} role="tab" aria-selected={level === l} className={level === l ? "on" : ""} onClick={() => setLevel(l)}>
              {l}
              <em>{l === "All" ? CERTS.length : countBy(l)}</em>
            </button>
          ))}
        </div>
        <div className="grid" key={level}>
          {shown.map((c, i) => <CertCard key={c.code} c={c} i={i} />)}
        </div>
      </section>

      {/* WHY */}
      <section className="sec cream" ref={whyRef}>
        <h2>What you get with ILM ORA</h2>
        <div className={"cubes" + (whySeen ? " in" : "")}>
          {[
            ["Learn by building", "Every topic ends with a hands-on project on real AWS services."],
            ["Practice like the exam", "Timed assessments that match the real exam length and style."],
            ["Mentor support", "Stuck on IAM or VPC? Ask a mentor who has already passed."],
            ["Proof for employers", "Finish with projects and scores you can show in interviews."],
          ].map(([t, d], i) => (
            <Cube key={t} t={t} d={d} i={i} />
          ))}
        </div>
        <p className="sub center">Hover or tap a block to turn it.</p>
      </section>

      {/* CTA */}
      <section className="final white">
        <h2>Ready to pass your first AWS exam?</h2>
        <p>Start with the level that matches where you are today.</p>
        <button className="btn primary big" onClick={() => (signupUrl ? navigate(signupUrl) : setShowLoginModal ? setShowLoginModal(true) : pick("All"))}>Get started with ILM ORA</button>
      </section>
    </div>
    </PublicLayout>
  );
}

/* ---------- STYLES ---------- */
const CSS = `
.ilm{--cream:#F6EDE6;--white:#ffffff;--card:#ffffff;--tx:#1E293B;--tx2:#334155;--mut:#475569;--or:#F97316;--ord:#EA580C;--line:#E5E7EB;--w:1280px;background:var(--white);color:var(--tx);font-family:inherit;overflow-x:hidden;line-height:1.625;-webkit-text-size-adjust:100%}
.ilm *{box-sizing:border-box}
.ilm h1,.ilm h2,.ilm h3,.ilm h4{margin:0}
.ilm button{font-family:inherit;cursor:pointer}
.ilm :focus-visible{outline:2px solid var(--or);outline-offset:3px}
.ilm .cream{background:var(--cream);--face:var(--card)}
.ilm .white{background:var(--white);--face:var(--cream)}
.ilm .hero,.ilm .sec,.ilm .stats,.ilm .final{padding-left:max(20px,calc((100% - var(--w))/2));padding-right:max(20px,calc((100% - var(--w))/2))}
.ilm .hero{display:grid;grid-template-columns:1.05fr 1fr;gap:32px;align-items:center;padding-top:clamp(40px,7vw,80px);padding-bottom:clamp(32px,5vw,56px)}
.ilm .pill{display:inline-flex;align-items:center;padding:6px 16px;border:1px solid rgba(249,115,22,.2);background:rgba(249,115,22,.1);color:var(--or);border-radius:9999px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
.ilm .hero h1{font-size:clamp(30px,5vw,60px);line-height:1.1;font-weight:600;margin:18px 0;letter-spacing:-.025em;color:var(--tx);animation:ilm-rise .9s cubic-bezier(.2,.8,.2,1) both}
.ilm .hero p{color:var(--mut);font-size:clamp(16px,1.6vw,18px);max-width:520px;animation:ilm-rise .9s .15s cubic-bezier(.2,.8,.2,1) both}
.ilm .cta-row{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap;animation:ilm-rise .9s .3s cubic-bezier(.2,.8,.2,1) both}
@keyframes ilm-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.ilm .btn{padding:14px 24px;border-radius:12px;font-weight:600;font-size:16px;border:1px solid transparent;transition:all .3s}
.ilm .btn:hover{transform:scale(1.05)}
.ilm .btn.primary{background:#EA580C;color:#fff;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)}
.ilm .btn.primary:hover{background:#C2410C}
.ilm .btn.ghost{background:#1E293B;color:#fff}
.ilm .btn.ghost:hover{background:#334155}
.ilm .btn.big{padding:16px 32px;font-size:16px}
.ilm .stage{position:relative;height:clamp(300px,50vw,460px);perspective:1100px;display:flex;align-items:center;justify-content:center;touch-action:pan-y}
.ilm .glow{position:absolute;width:min(340px,80%);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.26),transparent 70%);filter:blur(20px)}
.ilm .stack{--u:clamp(30px,9vw,62px);position:relative;width:clamp(150px,44vw,230px);aspect-ratio:1;transform-style:preserve-3d;transition:transform .25s ease-out}
.ilm .plate{position:absolute;inset:0;transform-style:preserve-3d;transform:translateZ(calc(var(--n)*var(--u)));border-radius:clamp(14px,3vw,22px);border:2px solid var(--c);background:linear-gradient(135deg,color-mix(in srgb,var(--c) 26%,var(--card)),var(--card) 85%);box-shadow:0 10px 30px color-mix(in srgb,var(--c) 28%,transparent);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:clamp(10px,2.4vw,16px);color:var(--tx);animation:ilm-bob 4s ease-in-out infinite;animation-delay:var(--d);transition:filter .2s,box-shadow .2s}
.ilm .plate.hot{filter:saturate(1.3);box-shadow:0 0 44px var(--c)}
.ilm .plate-label{font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-weight:700;font-size:clamp(13px,3.4vw,17px)}
.ilm .plate-count{font-size:12px;color:var(--mut)}
@keyframes ilm-bob{0%,100%{translate:0 0 0}50%{translate:0 0 12px}}
.ilm .stage-hint{position:absolute;bottom:0;margin:0;font-size:13px;color:var(--mut);text-align:center}
.ilm .stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--line)}
.ilm .stats div{padding:clamp(18px,3vw,30px) 10px;text-align:center}
.ilm .stats b{display:block;font-size:clamp(28px,4vw,40px);line-height:1.2;font-weight:600;letter-spacing:-.025em;color:var(--or)}
.ilm .stats b span{font-size:inherit;font-weight:inherit;color:inherit}
.ilm .stats div > span{display:block;color:var(--mut);font-size:16px;font-weight:500}
.ilm .sec{padding-top:clamp(32px,4vw,40px);padding-bottom:clamp(32px,4vw,40px)}
.ilm .sec h2,.ilm .final h2{font-size:clamp(24px,3.6vw,36px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:var(--tx)}
.ilm .sub{color:var(--mut);max-width:672px;margin:12px 0 32px;font-size:clamp(16px,1.5vw,18px);line-height:1.625}
.ilm .sub.center{text-align:center;margin:30px auto 0;font-size:14px}
.ilm .stairs{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;perspective:1200px;align-items:end}
.ilm .step{all:unset;cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;gap:14px;opacity:0;transform:rotateX(25deg) translateY(50px);transition:opacity .8s,transform .8s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.15s)}
.ilm .stairs.in .step{opacity:1;transform:none}
.ilm .step:focus-visible{outline:2px solid var(--or);outline-offset:4px;border-radius:12px}
.ilm .step-top small{color:var(--c);font-weight:600}
.ilm .step-top strong{display:block;font-size:20px;font-weight:600;letter-spacing:-.025em;color:var(--tx);margin:2px 0 6px}
.ilm .step-top p{margin:0;color:var(--mut);font-size:14px}
.ilm .step-block{height:var(--h);border-radius:14px;background:linear-gradient(160deg,color-mix(in srgb,var(--c) 32%,var(--card)),var(--card));border:1px solid var(--c);box-shadow:10px 10px 0 color-mix(in srgb,var(--c) 22%,transparent);display:flex;align-items:flex-end;padding:14px;font-weight:600;font-size:14px;transition:transform .25s}
.ilm .step:hover .step-block{transform:translate(-4px,-6px)}
.ilm .tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
.ilm .tabs button{background:var(--card);color:var(--tx);border:1px solid var(--line);border-radius:9999px;padding:9px 20px;font-size:14px;font-weight:600;transition:all .3s;box-shadow:0 4px 6px -1px rgba(0,0,0,.06)}
.ilm .tabs button em{font-style:normal;margin-left:8px;opacity:.7}
.ilm .tabs button.on{background:var(--or);color:#fff;border-color:var(--or);box-shadow:0 10px 15px -3px rgba(249,115,22,.3)}
.ilm .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:26px;perspective:1400px}
.ilm .card-wrap{opacity:0;transform:translateY(40px) rotateX(-12deg);transition:opacity .7s,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.1s)}
.ilm .card-wrap.in{opacity:1;transform:none}
.ilm .card-tilt{transition:transform .15s ease-out;transform-style:preserve-3d}
.ilm .card{position:relative;height:340px;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.3,.8,.2,1)}
.ilm .card.flip{transform:rotateY(180deg)}
.ilm .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:16px;padding:22px;background:var(--face);border:1px solid color-mix(in srgb,var(--c) 45%,var(--line));box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);display:flex;flex-direction:column;pointer-events:none}
.ilm .face::before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:4px;border-radius:0 4px 4px 0;background:var(--c)}
.ilm .front{transform:translateZ(1px)}
.ilm .back{transform:rotateY(180deg) translateZ(1px);overflow:auto}
.ilm .card:not(.flip) .front,.ilm .card.flip .back{pointer-events:auto}
.ilm .tag{align-self:flex-start;font-size:12px;font-weight:600;color:var(--c);border:1px solid var(--c);padding:3px 10px;border-radius:99px;background:var(--card)}
.ilm .front h3{font-size:clamp(18px,2vw,20px);line-height:1.25;font-weight:600;letter-spacing:-.025em;color:var(--tx);margin:16px 0 6px}
.ilm .code{color:var(--mut);font-size:14px}
.ilm .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:auto;padding:14px 0}
.ilm .meta b{display:block;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-size:16px}
.ilm .meta span{font-size:12px;color:var(--mut)}
.ilm .front-actions,.ilm .back-actions{display:flex;justify-content:space-between;align-items:center;gap:10px}
.ilm .back-actions{margin-top:auto;padding-top:12px}
.ilm .flip-btn{background:var(--card);border:1px solid var(--line);color:var(--tx);border-radius:10px;padding:10px 14px;font-size:14px;font-weight:500;transition:.2s;min-height:40px}
.ilm .flip-btn:hover{border-color:var(--c);color:var(--c)}
.ilm .guide{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:10px 14px;border:0;border-radius:10px;background:var(--c);color:#fff;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:transform .2s,filter .2s}
.ilm .guide:hover{transform:translateY(-2px);filter:brightness(1.08)}
.ilm .back h4{font-size:12px;color:var(--c);margin:10px 0 3px;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-weight:600}
.ilm .back h4:first-child{margin-top:0}
.ilm .back p{margin:0;font-size:14px;color:var(--tx2)}
.ilm .chips{display:flex;flex-wrap:wrap;gap:6px}
.ilm .chips i{font-style:normal;font-size:12px;padding:3px 9px;border-radius:8px;background:color-mix(in srgb,var(--c) 14%,var(--card));color:var(--tx2);border:1px solid color-mix(in srgb,var(--c) 25%,var(--card))}
.ilm .cubes{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;perspective:1000px;margin-top:36px}
.ilm .cube-scene{height:200px;cursor:pointer;opacity:0;transform:translateY(40px);transition:opacity .7s,transform .7s;transition-delay:calc(var(--i)*.12s)}
.ilm .cubes.in .cube-scene{opacity:1;transform:none}
.ilm .cube{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:translateZ(-100px);transition:transform .8s cubic-bezier(.3,.8,.2,1)}
.ilm .cube-scene.on .cube,.ilm .cube-scene:focus-visible .cube{transform:translateZ(-100px) rotateX(-90deg)}
@media(hover:hover){.ilm .cube-scene:hover .cube{transform:translateZ(-100px) rotateX(-90deg)}}
.ilm .cf{position:absolute;inset:0;border-radius:16px;padding:20px;display:flex;align-items:center;border:1px solid var(--line);background:var(--card);backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 12px 26px rgba(120,80,40,.14)}
.ilm .cf h3{font-size:clamp(18px,2vw,20px);font-weight:600;letter-spacing:-.025em;color:var(--tx)}
.ilm .cf p{margin:0;font-size:14.5px;color:#fff}
.ilm .f1{transform:rotateX(0) translateZ(100px)}
.ilm .f2{transform:rotateX(90deg) translateZ(100px);background:linear-gradient(150deg,#f97316,#c2410c);border-color:var(--or)}
.ilm .final{text-align:center;padding-top:clamp(64px,9vw,100px);padding-bottom:clamp(64px,9vw,100px);background:radial-gradient(ellipse at 50% 0,rgba(249,115,22,.14),transparent 65%),var(--white)}
.ilm .final p{color:var(--mut);margin:12px 0 28px;font-size:clamp(16px,1.6vw,18px)}
@media(min-width:1600px){.ilm{--w:1360px}}
@media(max-width:1100px){.ilm .hero{gap:16px}
.ilm .stairs,.ilm .cubes{gap:16px}
.ilm .step-top strong{font-size:18px}}
@media(max-width:900px){.ilm .hero{grid-template-columns:1fr;text-align:center}
.ilm .hero p{margin-left:auto;margin-right:auto}
.ilm .cta-row{justify-content:center}
.ilm .stairs,.ilm .cubes{grid-template-columns:repeat(2,1fr)}
.ilm .stats{grid-template-columns:repeat(2,1fr)}
.ilm .stats div{border-bottom:1px solid var(--line)}
.ilm .sub{max-width:none}}
@media(max-width:768px){.ilm .card{height:350px}}
@media(max-width:560px){.ilm .stairs,.ilm .cubes{grid-template-columns:1fr}
.ilm .step-block{height:calc(var(--h)*.55)}
.ilm .card{height:370px}
.ilm .tabs{flex-wrap:nowrap;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 6px;-webkit-overflow-scrolling:touch}
.ilm .tabs button{flex:0 0 auto}
.ilm .btn{flex:1 1 100%;text-align:center}
.ilm .front-actions{flex-wrap:wrap}}
@media(max-width:380px){.ilm .face{padding:18px}
.ilm .card{height:390px}
.ilm .meta b{font-size:14px}}
@media(prefers-reduced-motion:reduce){.ilm *{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}}
.ilm.dark{--cream:#000000;--white:#0F172A;--card:#111827;--tx:#ffffff;--tx2:#CBD5E1;--mut:#CBD5E1;--line:#1F2937}
.ilm .hero h1,.ilm .sec h2,.ilm .final h2,.ilm .step-top strong,.ilm .front h3,.ilm .cf h3,.ilm .stats b{font-weight:500}
.ilm .step-top small,.ilm .step-block,.ilm .tag,.ilm .back h4,.ilm .plate-label,.ilm .meta b,.ilm .pill{font-weight:500}
.ilm .btn,.ilm .tabs button,.ilm .guide,.ilm .flip-btn{font-weight:500}
.ilm .stats div > span{font-weight:400}
.ilm,.ilm *{font-family:inherit!important}
`;