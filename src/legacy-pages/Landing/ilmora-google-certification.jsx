"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Inter } from "next/font/google";
import PublicLayout from "@/legacy-pages/Landing/components/PublicLayout";

const display = Inter({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
/* ---------- DATA (from google.xlsx) ---------- */
const RAW = [
  ["Cloud Digital Leader","CDL","Cloud Computing","Foundational",99,"90 Minutes","3 Years","No prerequisites","Basic Cloud Knowledge","Student, Fresher, Business Professional","Cloud Computing, Google Cloud Services","https://cloud.google.com/learn/certification/cloud-digital-leader"],
  ["Associate Cloud Engineer","ACE","Cloud Computing","Associate",125,"120 Minutes","3 Years","No prerequisites","6+ months Google Cloud experience","Cloud Engineer, System Administrator","Compute Engine, Cloud Storage, IAM, VPC, Cloud Run","https://cloud.google.com/learn/certification/cloud-engineer"],
  ["Professional Cloud Architect","PCA","Cloud Architecture","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years industry (1+ year Google Cloud)","Cloud Architect","Compute Engine, VPC, IAM, GKE, Cloud SQL","https://cloud.google.com/learn/certification/cloud-architect"],
  ["Professional Cloud Developer","PCD","Application Development","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years development","Cloud Developer","Cloud Run, GKE, App Engine, Pub/Sub, Cloud Build","https://cloud.google.com/learn/certification/cloud-developer"],
  ["Professional Data Engineer","PDE","Data Engineering","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years data engineering","Data Engineer","BigQuery, Dataflow, Pub/Sub, Dataproc, Cloud Storage","https://cloud.google.com/learn/certification/data-engineer"],
  ["Professional Cloud DevOps Engineer","PCDOE","DevOps","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years DevOps","DevOps Engineer, SRE","GKE, Cloud Build, Cloud Deploy, Monitoring, Logging","https://cloud.google.com/learn/certification/cloud-devops-engineer"],
  ["Professional Cloud Security Engineer","PCSE","Security","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years security","Cloud Security Engineer","IAM, Cloud Armor, KMS, Security Command Center","https://cloud.google.com/learn/certification/cloud-security-engineer"],
  ["Professional Cloud Network Engineer","PCNE","Networking","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years networking","Network Engineer","VPC, Cloud DNS, Cloud VPN, Interconnect, Load Balancing","https://cloud.google.com/learn/certification/cloud-network-engineer"],
  ["Professional Cloud Database Engineer","PCDBE","Database","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years database","Database Engineer","Cloud SQL, AlloyDB, Spanner, Firestore, Bigtable","https://cloud.google.com/learn/certification"],
  ["Professional Machine Learning Engineer","PMLE","Artificial Intelligence","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years ML","Machine Learning Engineer","Vertex AI, TensorFlow, BigQuery ML, AI Platform","https://cloud.google.com/learn/certification/machine-learning-engineer"],
  ["Professional Cloud AI Engineer","PCAIE","Artificial Intelligence","Professional",200,"120 Minutes","2 Years","No mandatory prerequisites","3+ years AI","AI Engineer","Vertex AI, Gemini API, Generative AI, Vision AI, Natural Language AI","https://cloud.google.com/learn/certification/cloud-ai-engineer"],
];
const CERTS = RAW.map(r => ({ name:r[0], code:r[1], cat:r[2], level:r[3], fee:r[4], dur:r[5], valid:r[6], elig:r[7], exp:r[8], role:r[9], tech:r[10].split(", "), link:r[11] }));
const LEVELS = ["All","Foundational","Associate","Professional"];
const CATS = ["All", ...Array.from(new Set(CERTS.map(c => c.cat)))];
const ROLES = [
  ["Student / Fresher","Student"],["Cloud Engineer","Cloud Engineer"],["Developer","Developer"],["Data Engineer","Data Engineer"],
  ["DevOps / SRE","DevOps"],["Security","Security"],["Networking","Network"],["Database","Database"],["ML / AI","Engineer"],
];
const FAQ = [
  ["Do I need any prior experience to start?","Not for Cloud Digital Leader and Associate Cloud Engineer. Neither has a prerequisite. Professional exams don't require one either, but Google recommends 3+ years in the field."],
  ["How long does a certificate stay valid?","Foundational and Associate certificates stay valid for 3 years. Professional certificates stay valid for 2 years, then you recertify."],
  ["What does the exam cost?","Cloud Digital Leader is $99, Associate Cloud Engineer is $125, and every Professional exam is $200. Fees are paid to Google, not to Ilmora."],
  ["How long is each exam?","Cloud Digital Leader takes 90 minutes. Every other exam in this list takes 120 minutes."],
  ["Which certificate should I take first?","Start at your level. Freshers begin with Cloud Digital Leader, then move to Associate Cloud Engineer, then pick a Professional track that matches your job."],
];
const COLORS = { b:"#4285F4", r:"#EA4335", y:"#FBBC04", g:"#34A853" };
const LEVEL_COLOR = { Foundational:COLORS.g, Associate:COLORS.y, Professional:COLORS.b };

/* ---------- HOOKS ---------- */
function useInView(opts = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, opts);
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, seen];
}
function Counter({ to, suffix = "", prefix = "" }) {
  const [ref, seen] = useInView();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let raf, t0;
    const step = t => { t0 = t0 || t; const p = Math.min((t - t0) / 1400, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}
function Reveal({ children, className = "" }) {
  const [ref, seen] = useInView({ threshold: 0.12 });
  return <div ref={ref} className={`rv ${seen ? "in" : ""} ${className}`}>{children}</div>;
}
function Tilt({ children, className = "", max = 12 }) {
  const ref = useRef(null);
  const move = e => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(6px)`;
  };
  const leave = () => { ref.current.style.transform = ""; };
  return <div ref={ref} className={`tilt ${className}`} onMouseMove={move} onMouseLeave={leave}>{children}</div>;
}

/* ---------- HERO 3D SCENE ---------- */
function HeroScene() {
  const [rot, setRot] = useState({ x: -8, y: 16 });
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    setRot({ x: -8 - y * 18, y: 16 + x * 28 });
  };
  const faces = ["Cloud","AI","Data","Security","DevOps","Network"];
  return (
    <div className="scene" onMouseMove={onMove} onMouseLeave={() => setRot({ x: -8, y: 16 })} aria-hidden="true">
      <div className="stage" style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}>
        <div className="plate p3" /><div className="plate p2" />
        <div className="plate p1">
          <div className="pl-top"><span className="dots"><i style={{background:COLORS.b}}/><i style={{background:COLORS.r}}/><i style={{background:COLORS.y}}/><i style={{background:COLORS.g}}/></span><small>Ilmora x Google Cloud</small></div>
          <h4>Certified<br/>Cloud Professional</h4>
          <div className="pl-line"/><div className="pl-line s"/>
          <div className="seal"><svg viewBox="0 0 60 60" width="64" height="64"><circle cx="30" cy="30" r="26" fill="none" stroke="#FBBC04" strokeWidth="3"/><path d="M18 31l8 8 16-18" fill="none" stroke="#FBBC04" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        </div>
        <div className="cube">{faces.map((f, i) => <div key={f} className={`face f${i}`}>{f}</div>)}</div>
        <div className="ring" />
        <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
      </div>
    </div>
  );
}

/* ---------- CERT CARD (flip) ---------- */
function CertCard({ c }) {
  const [flip, setFlip] = useState(false);
  const col = LEVEL_COLOR[c.level];
  return (
    <Tilt className="cardwrap" max={8}>
      <button className={`flipper ${flip ? "flip" : ""}`} onClick={() => setFlip(f => !f)} aria-pressed={flip} aria-label={`${c.name}. Press to ${flip ? "see front" : "see exam details"}`}>
        <div className="side front" style={{ "--c": col }}>
          <div className="code" style={{ background: col }}>{c.code}</div>
          <span className="lvl" style={{ color: col }}>{c.level}</span>
          <h3>{c.name}</h3>
          <p className="muted">{c.cat}</p>
          <div className="chips">{c.tech.slice(0, 3).map(t => <em key={t}>{t}</em>)}</div>
          <span className="hint">Tap for exam details</span>
        </div>
        <div className="side back" style={{ "--c": col }}>
          <h4>{c.code} exam</h4>
          <dl>
            <div><dt>Fee</dt><dd>${c.fee}</dd></div>
            <div><dt>Duration</dt><dd>{c.dur}</dd></div>
            <div><dt>Valid for</dt><dd>{c.valid}</dd></div>
            <div><dt>Eligibility</dt><dd>{c.elig}</dd></div>
            <div><dt>Experience</dt><dd>{c.exp}</dd></div>
            <div><dt>Best for</dt><dd>{c.role}</dd></div>
          </dl>
          <a href={c.link} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>Official Google page</a>
        </div>
      </button>
    </Tilt>
  );
}

/* ---------- PAGE ---------- */
export default function IlmoraGoogle({ theme, toggleTheme, setShowLoginModal, scrollToSection }) {
  const dark = theme === "dark";
  const enroll = () => setShowLoginModal && setShowLoginModal(true);
  const [level, setLevel] = useState("All");
  const [cat, setCat] = useState("All");
  const [role, setRole] = useState(0);
  const [open, setOpen] = useState(0);
  const list = useMemo(() => CERTS.filter(c => (level === "All" || c.level === level) && (cat === "All" || c.cat === cat)), [level, cat]);
  const picks = useMemo(() => CERTS.filter(c => c.role.includes(ROLES[role][1]) || c.name.includes(ROLES[role][1])), [role]);

  return (
    <PublicLayout
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
      scrollToSection={scrollToSection}
    >
    <div className={`ilm ${dark ? "dm" : ""} ${display.variable} ${body.variable}`}>
      <style>{CSS}</style>


      {/* HERO */}
      <section className="hero">
        <div className="hero-copy">
          
          <h1>Get Google Cloud certified, one clear step at a time.</h1>
          <p className="lead">Ilmora trains you for {CERTS.length} Google Cloud exams, from Cloud Digital Leader to Professional Machine Learning Engineer. No guesswork about what to study or which exam to take first.</p>
          <div className="cta"><button className="btn" onClick={enroll}>Start learning</button><a className="btn ghost" href="#certs">See all {CERTS.length} certificates</a></div>
        </div>
        <HeroScene />
      </section>

      {/* STATS */}
      <section className="stats">
        {[[CERTS.length,"","Certificates covered"],[3,"","Levels, beginner to expert"],[99,"$","Lowest exam fee",true],[3,"yr","Longest validity"]].map(([n, s, l, pre], i) => (
          <div key={i} className="stat"><strong>{pre ? <Counter to={n} prefix="$" /> : <Counter to={n} suffix={s === "yr" ? " yrs" : ""} />}</strong><span>{l}</span></div>
        ))}
      </section>

      {/* PATH */}
      <section id="paths" className="sec">
        <Reveal>
          <h2>Your path has three levels</h2>
          <p className="sub">Each level builds on the one before it. You always know what comes next.</p>
        </Reveal>
        <div className="steps3d">
          {[
            ["Foundational","Understand what cloud is and what Google Cloud offers. No technical background needed.","Cloud Digital Leader",COLORS.g,150],
            ["Associate","Deploy and manage real projects on Google Cloud. Ideal after 6 months of hands-on work.","Associate Cloud Engineer",COLORS.y,230],
            ["Professional","Design, build, and secure production systems in your chosen specialty.","9 role-based exams",COLORS.b,320],
          ].map(([t, d, ex, col, h], i) => (
            <Reveal key={t}>
              <div className="step" style={{ "--h": h + "px", "--c": col, "--i": i }}>
                <div className="block"><span>{i + 1}</span></div>
                <div className="stext"><h3>{t}</h3><p>{d}</p><b>{ex}</b></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPLORER */}
      <section id="certs" className="sec dark">
        <Reveal>
          <h2>Explore every certificate</h2>
          <p className="sub">Filter by level or topic. Tap a card to flip it and see fee, duration, and eligibility.</p>
        </Reveal>
        <div className="filters" role="group" aria-label="Filter certificates">
          <div>{LEVELS.map(l => <button key={l} className={level === l ? "on" : ""} onClick={() => setLevel(l)}>{l}</button>)}</div>
          <div>{CATS.map(c => <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>)}</div>
        </div>
        <div className="grid">
          {list.map(c => <CertCard key={c.code} c={c} />)}
          {!list.length && <p className="empty">No certificate matches this filter. Choose “All” to see the full list.</p>}
        </div>
      </section>

      {/* FINDER */}
      <section id="finder" className="sec">
        <Reveal>
          <h2>Which certificate fits your job?</h2>
          <p className="sub">Pick your role and we’ll show the exam built for it.</p>
        </Reveal>
        <div className="roles">{ROLES.map((r, i) => <button key={r[0]} className={role === i ? "on" : ""} onClick={() => setRole(i)}>{r[0]}</button>)}</div>
        <div className="picks" key={role}>
          {picks.map(c => (
            <div key={c.code} className="pick" style={{ "--c": LEVEL_COLOR[c.level] }}>
              <div className="pcode">{c.code}</div>
              <div><h3>{c.name}</h3><p>{c.level} level · ${c.fee} · {c.dur}</p><p className="muted">Skills: {c.tech.join(", ")}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="sec soft">
        <Reveal><h2>What you get with Ilmora</h2><p className="sub">Everything is built around passing the Google exam and using the skill at work.</p></Reveal>
        <div className="feat">
          {[["Exam-focused lessons","Every topic maps to the skills each exam tests, such as BigQuery, GKE, IAM, and Vertex AI.",COLORS.b],
            ["Hands-on labs","Build on Compute Engine, Cloud Run, and Cloud Storage instead of only reading about them.",COLORS.g],
            ["Mock exams","Practice with timed 90 and 120 minute tests that match the real exam length.",COLORS.y],
            ["Mentor support","Ask questions and get unstuck before exam day.",COLORS.r]].map(([t, d, c]) => (
            <Tilt key={t} className="fcard" max={10}><i style={{ background: c }} /><h3>{t}</h3><p>{d}</p></Tilt>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec narrow">
        <Reveal><h2>Questions students ask</h2></Reveal>
        {FAQ.map(([q, a], i) => (
          <div key={q} className={`qa ${open === i ? "open" : ""}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>{q}<span>+</span></button>
            <div className="ans"><p>{a}</p></div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section id="enroll" className="final">
        <div className="cube mini" aria-hidden="true">{["G","C","P","★","☁","✓"].map((f, i) => <div key={i} className={`face f${i}`}>{f}</div>)}</div>
        <h2>Ready to earn your Google Cloud certificate?</h2>
        <p>Create your account and Ilmora will guide you from first lesson to exam day.</p>
        <button className="btn" onClick={enroll}>Enroll now</button>
      </section>

    </div>
    </PublicLayout>
  );
}

/* ---------- STYLES ---------- */
const CSS = `
.ilm{--ink:#241a14;--paper:#f6ede6;--white:#ffffff;--line:rgba(36,26,20,.14);font-family:var(--font-body),system-ui,sans-serif;color:var(--ink);background:var(--paper);overflow-x:hidden;line-height:1.55}
.ilm *{box-sizing:border-box}
.ilm h1,.ilm h2,.ilm h3,.ilm h4{font-family:var(--font-display),system-ui,sans-serif;letter-spacing:-.02em;margin:0;font-weight:600}
.ilm a{color:inherit}
.ilm button{font:inherit;cursor:pointer;color:inherit}
.ilm :focus-visible{outline:3px solid #FBBC04;outline-offset:3px}
.ilm .btn{border:0;font-size:16px;display:inline-block;background:var(--ink);color:#fff!important;padding:14px 26px;border-radius:12px;font-weight:700;text-decoration:none;transition:transform .2s,box-shadow .2s;box-shadow:0 6px 0 #000a}
.ilm .btn:hover{transform:translateY(-2px)}
.ilm .btn:active{transform:translateY(4px);box-shadow:0 2px 0 #000a}
.ilm .btn.sm{padding:9px 18px;box-shadow:none;border-radius:10px}
.ilm .btn.ghost{background:transparent;color:var(--ink)!important;border:2px solid var(--ink);box-shadow:none}
.ilm .hero{display:grid;grid-template-columns:1.15fr 1fr;align-items:center;gap:30px;padding:60px 4vw 50px;min-height:560px;background:var(--paper)}
.ilm .pill{display:inline-block;font-size:14px;font-weight:700;padding:6px 14px;border-radius:99px;background:#fff;border:1px solid var(--line);margin:0 0 18px}
.ilm .hero h1{font-size:clamp(32px,4.2vw,54px);line-height:1.12;font-weight:600;letter-spacing:-.025em;margin-bottom:18px;animation:ilm-rise .9s cubic-bezier(.2,.8,.2,1) both}
.ilm .lead{font-size:17px;max-width:520px;opacity:.75;animation:ilm-rise .9s .15s cubic-bezier(.2,.8,.2,1) both}
.ilm .cta{display:flex;gap:14px;flex-wrap:wrap;margin-top:28px;animation:ilm-rise .9s .3s cubic-bezier(.2,.8,.2,1) both}
@keyframes ilm-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.ilm .scene{perspective:1100px;height:480px;display:grid;place-items:center}
.ilm .stage{position:relative;width:340px;height:230px;transform-style:preserve-3d;transition:transform .25s ease-out}
.ilm .plate{position:absolute;inset:0;border-radius:20px}
.ilm .p1{transform:translateZ(50px);background:linear-gradient(135deg,#fff,#f6ede6);border:1px solid #fff;box-shadow:0 30px 60px rgba(36,26,20,.28);padding:22px;transform-style:preserve-3d}
.ilm .p2{transform:translateZ(25px);background:#e7d3c4}
.ilm .p3{transform:translateZ(0);background:#241a14;box-shadow:0 60px 80px rgba(36,26,20,.35)}
.ilm .pl-top{display:flex;justify-content:space-between;align-items:center}
.ilm .pl-top small{font-weight:700;opacity:.6}
.ilm .dots{display:flex;gap:5px}
.ilm .dots i{width:11px;height:11px;border-radius:50%}
.ilm .p1 h4{font-size:24px;line-height:1.1;font-weight:600;margin:24px 0 16px;transform:translateZ(20px)}
.ilm .pl-line{height:7px;border-radius:5px;background:#e7d3c4;width:70%;margin-bottom:8px}
.ilm .pl-line.s{width:45%}
.ilm .seal{position:absolute;right:22px;bottom:18px;transform:translateZ(70px);animation:ilm-bob 3.2s ease-in-out infinite;filter:drop-shadow(0 12px 8px rgba(0,0,0,.3));background:#241a14;border-radius:50%;padding:6px}
@keyframes ilm-bob{50%{transform:translateZ(90px) translateY(-8px)}}
.ilm .cube{position:absolute;left:-70px;top:-40px;width:80px;height:80px;transform-style:preserve-3d;animation:ilm-spin 14s linear infinite;transform:translateZ(110px)}
.ilm .face{position:absolute;inset:0;display:grid;place-items:center;font:700 13px var(--font-display),system-ui,sans-serif;color:#fff;border:1px solid rgba(255,255,255,.4);backface-visibility:visible}
.ilm .face.f0{transform:translateZ(40px);background:#4285F4dd}
.ilm .face.f1{transform:rotateY(90deg) translateZ(40px);background:#EA4335dd}
.ilm .face.f2{transform:rotateY(180deg) translateZ(40px);background:#34A853dd}
.ilm .face.f3{transform:rotateY(-90deg) translateZ(40px);background:#FBBC04dd;color:#241a14}
.ilm .face.f4{transform:rotateX(90deg) translateZ(40px);background:#241a14dd}
.ilm .face.f5{transform:rotateX(-90deg) translateZ(40px);background:#4285F4dd}
@keyframes ilm-spin{from{transform:translateZ(110px) rotateX(-20deg) rotateY(0)}to{transform:translateZ(110px) rotateX(340deg) rotateY(360deg)}}
.ilm .ring{position:absolute;right:-60px;bottom:-50px;width:150px;height:150px;border-radius:50%;border:10px solid #FBBC04;transform:translateZ(80px) rotateX(70deg);animation:ilm-ringspin 6s linear infinite;box-shadow:0 0 0 3px #fff3 inset}
@keyframes ilm-ringspin{to{transform:translateZ(80px) rotateX(70deg) rotateZ(360deg)}}
.ilm .orb{position:absolute;border-radius:50%;box-shadow:inset -8px -10px 18px rgba(0,0,0,.28),0 20px 24px rgba(0,0,0,.2);animation:ilm-float 5s ease-in-out infinite}
.ilm .o1{width:56px;height:56px;background:radial-gradient(circle at 30% 30%,#ff9d94,#EA4335);right:-30px;top:-30px;transform:translateZ(120px)}
.ilm .o2{width:38px;height:38px;background:radial-gradient(circle at 30% 30%,#9be2ae,#34A853);left:20px;bottom:-60px;transform:translateZ(100px);animation-delay:-2s}
.ilm .o3{width:28px;height:28px;background:radial-gradient(circle at 30% 30%,#ffe493,#FBBC04);left:-40px;top:130px;transform:translateZ(140px);animation-delay:-3.5s}
@keyframes ilm-float{50%{margin-top:-18px}}
.ilm .stats{display:grid;grid-template-columns:repeat(4,1fr);background:var(--white);color:var(--ink);padding:34px 5vw;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.ilm .stat{text-align:center;padding:6px}
.ilm .stat strong{display:block;font:600 clamp(28px,3.2vw,40px)/1.1 var(--font-display),system-ui,sans-serif;color:#f97316;letter-spacing:-.02em}
.ilm .stat > span{display:block;margin-top:2px;opacity:.7;font-size:15px;color:var(--ink)}
.ilm .sec{padding:96px 5vw;background:var(--white)}
.ilm .sec h2{font-size:clamp(26px,3.2vw,38px);font-weight:600;margin-bottom:10px}
.ilm .sub{max-width:560px;opacity:.75;font-size:17px;margin:0 0 40px}
.ilm .sec.dark,.ilm .sec.soft{background:var(--paper)}
.ilm .narrow{max-width:820px;margin:0 auto}
.ilm .rv{opacity:0;transform:translateY(28px);transition:opacity .7s,transform .7s cubic-bezier(.2,.8,.2,1)}
.ilm .rv.in{opacity:1;transform:none}
.ilm .steps3d{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;align-items:end;perspective:1200px}
.ilm .step{display:flex;flex-direction:column;justify-content:flex-end}
.ilm .block{height:var(--h);background:linear-gradient(160deg,var(--c),color-mix(in srgb,var(--c) 60%,#000));border-radius:16px 16px 0 0;transform:rotateY(-14deg) rotateX(4deg);transform-origin:bottom;display:grid;place-items:center;box-shadow:18px 16px 0 -2px color-mix(in srgb,var(--c) 45%,#000),0 30px 40px rgba(36,26,20,.2);transition:transform .5s}
.ilm .step:hover .block{transform:rotateY(-4deg) rotateX(0) translateY(-6px)}
.ilm .block span{font:700 56px var(--font-display),system-ui,sans-serif;color:#fff9}
.ilm .stext{padding:20px 4px 0}
.ilm .stext h3{font-size:21px;font-weight:600}
.ilm .stext p{margin:6px 0 10px;opacity:.8}
.ilm .stext b{font-size:14px;color:var(--ink);border-bottom:3px solid var(--c)}
.ilm .filters{display:grid;gap:12px;margin-bottom:36px}
.ilm .filters div,.ilm .roles{display:flex;gap:8px;flex-wrap:wrap}
.ilm .filters button,.ilm .roles button{padding:9px 16px;border-radius:99px;border:1.5px solid var(--line);background:transparent;transition:.2s}
.ilm .roles button{border-color:var(--line)}
.ilm .filters button:hover{border-color:var(--ink)}
.ilm .filters button.on{background:var(--ink);color:#fff;border-color:var(--ink);font-weight:700}
.ilm .roles button.on{background:var(--ink);color:#fff;font-weight:700;border-color:var(--ink)}
.ilm .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:26px}
.ilm .empty{opacity:.7}
.ilm .tilt{transition:transform .15s ease-out;will-change:transform}
.ilm .cardwrap{perspective:1000px}
.ilm .flipper{all:unset;display:block;position:relative;width:100%;height:330px;cursor:pointer;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.3,.7,.2,1);border-radius:20px}
.ilm .flipper:focus-visible{outline:3px solid #FBBC04;outline-offset:4px}
.ilm .flipper.flip{transform:rotateY(180deg)}
.ilm .side{position:absolute;inset:0;border-radius:20px;padding:24px;backface-visibility:hidden;-webkit-backface-visibility:hidden;color:var(--ink);background:#fff;border-top:6px solid var(--c);box-shadow:0 18px 34px rgba(36,26,20,.14);display:flex;flex-direction:column}
.ilm .back{transform:rotateY(180deg);background:#fffaf6}
.ilm .code{align-self:flex-start;font:800 14px var(--font-display),system-ui,sans-serif;color:#fff;padding:5px 12px;border-radius:8px;margin-bottom:12px;transform:translateZ(30px)}
.ilm .lvl{font-weight:700;font-size:14px}
.ilm .side h3{font-size:20px;line-height:1.2;font-weight:600;margin:4px 0 6px}
.ilm .muted{opacity:.65;margin:0;font-size:15px}
.ilm .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
.ilm .chips em{font-style:normal;font-size:12.5px;background:#f6ede6;padding:4px 9px;border-radius:7px}
.ilm .hint{margin-top:auto;font-size:13px;opacity:.55}
.ilm .back h4{font-size:22px;margin-bottom:10px}
.ilm .back dl{margin:0;display:grid;gap:7px;font-size:14px}
.ilm .back dl div{display:flex;justify-content:space-between;gap:12px;border-bottom:1px dashed var(--line);padding-bottom:5px}
.ilm .back dt{opacity:.6}
.ilm .back dd{margin:0;font-weight:700;text-align:right}
.ilm .back a{margin-top:auto;font-weight:700;color:var(--c);filter:brightness(.7)}
.ilm .picks{display:grid;gap:16px;margin-top:30px;max-width:760px}
.ilm .pick{display:flex;gap:18px;align-items:center;background:var(--paper);border-radius:18px;padding:20px;border:1px solid var(--line);animation:ilm-pop .5s cubic-bezier(.2,1.3,.4,1) both;border-left:8px solid var(--c)}
@keyframes ilm-pop{from{opacity:0;transform:perspective(600px) rotateX(-25deg) translateY(16px)}to{opacity:1;transform:none}}
.ilm .pcode{min-width:72px;height:72px;display:grid;place-items:center;border-radius:16px;background:var(--c);color:#fff;font:800 17px var(--font-display),system-ui,sans-serif;box-shadow:0 8px 0 color-mix(in srgb,var(--c) 55%,#000)}
.ilm .pick h3{font-size:18px;font-weight:600}
.ilm .pick p{margin:2px 0}
.ilm .feat{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px}
.ilm .fcard{background:#fff;border-radius:20px;padding:28px;box-shadow:0 14px 30px rgba(36,26,20,.08)}
.ilm .fcard i{display:block;width:44px;height:44px;border-radius:12px;margin-bottom:18px;transform:rotate(-8deg);box-shadow:5px 6px 0 rgba(36,26,20,.18)}
.ilm .fcard h3{font-size:18px;font-weight:600;margin-bottom:6px}
.ilm .fcard p{margin:0;opacity:.75}
.ilm .qa{border-bottom:1px solid var(--line)}
.ilm .qa button{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;padding:20px 0;font:600 17px var(--font-display),system-ui,sans-serif;cursor:pointer}
.ilm .qa button:focus-visible{outline:3px solid #FBBC04}
.ilm .qa span{transition:transform .3s;font-size:26px;line-height:1}
.ilm .qa.open span{transform:rotate(135deg)}
.ilm .ans{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s}
.ilm .qa.open .ans{grid-template-rows:1fr}
.ilm .ans p{overflow:hidden;margin:0;opacity:.8}
.ilm .qa.open .ans p{padding-bottom:22px}
.ilm .final{text-align:center;padding:110px 5vw;background:var(--paper);color:var(--ink);position:relative;perspective:900px}
.ilm .final h2{font-size:clamp(26px,3.2vw,38px);font-weight:600;max-width:720px;margin:30px auto 12px}
.ilm .final p{opacity:.75;margin:0 0 30px}
.ilm .cube.mini{position:relative;left:auto;top:auto;margin:0 auto;width:90px;height:90px;animation:ilm-spin2 12s linear infinite}
.ilm .cube.mini .face{font-size:30px}
.ilm .mini .f0{transform:translateZ(45px)}
.ilm .mini .f1{transform:rotateY(90deg) translateZ(45px)}
.ilm .mini .f2{transform:rotateY(180deg) translateZ(45px)}
.ilm .mini .f3{transform:rotateY(-90deg) translateZ(45px)}
.ilm .mini .f4{transform:rotateX(90deg) translateZ(45px)}
.ilm .mini .f5{transform:rotateX(-90deg) translateZ(45px)}
@keyframes ilm-spin2{from{transform:rotateX(-20deg) rotateY(0)}to{transform:rotateX(340deg) rotateY(360deg)}}
.ilm.dm{--ink:#f6ede6;--paper:#1c1511;--white:#241a14;--line:rgba(246,237,230,.16);--card:#2f231b}
.ilm.dm .pill,.ilm.dm .side,.ilm.dm .fcard{background:var(--card)}
.ilm.dm .back{background:#3a2c22}
.ilm.dm .chips em{background:#1c1511}
.ilm.dm .p1{background:linear-gradient(135deg,#3a2c22,#2f231b);border-color:#4a392d}
.ilm.dm .p2{background:#5a4638}
.ilm.dm .p3{background:#f6ede6}
.ilm.dm .pl-line{background:#5a4638}
.ilm.dm .btn{background:var(--ink);color:#1c1511!important;box-shadow:0 6px 0 #0007}
.ilm.dm .btn.ghost{background:transparent;color:var(--ink)!important}
.ilm.dm .filters button.on,.ilm.dm .roles button.on{color:#1c1511}
.ilm.dm .pick{background:var(--card)}
@media(max-width:860px){.ilm .hero{grid-template-columns:1fr;padding-top:40px}
.ilm .scene{height:380px;transform:scale(.8)}
.ilm .stats{grid-template-columns:1fr 1fr;gap:18px}
.ilm .steps3d{grid-template-columns:1fr;gap:44px}
.ilm .block{height:120px!important}
.ilm .cube{left:-30px}}
@media(prefers-reduced-motion:reduce){.ilm *{animation:none!important;transition:none!important}
.ilm .rv{opacity:1;transform:none}}
`;