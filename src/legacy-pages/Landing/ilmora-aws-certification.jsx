
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "@/lib/routerCompat";

// // Same shared shell (AnnouncementBanner, Navbar, Footer) used by StudyAbroad, Careers, About etc.
// import PublicLayout from "../Landing/components/PublicLayout";
// // Data now lives in awsCertData.js (shared with the detail page)
// import { CERTS, LEVELS } from "./awsCertData";

// const LEVEL_NAMES = Object.keys(LEVELS);
// const countBy = (l) => CERTS.filter((c) => c.level === l).length;

// /* ---------- HOOKS ---------- */
// function useReveal() {
//   const ref = useRef(null);
//   const [seen, setSeen] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el || typeof IntersectionObserver === "undefined") return setSeen(true);
//     const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);
//   return [ref, seen];
// }

// function Count({ to, prefix = "" }) {
//   const [ref, seen] = useReveal();
//   const [n, setN] = useState(0);
//   useEffect(() => {
//     if (!seen) return;
//     let raf, t0;
//     const step = (t) => {
//       t0 = t0 || t;
//       const p = Math.min((t - t0) / 1200, 1);
//       setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
//       if (p < 1) raf = requestAnimationFrame(step);
//     };
//     raf = requestAnimationFrame(step);
//     return () => cancelAnimationFrame(raf);
//   }, [seen, to]);
//   return <span ref={ref}>{prefix}{n}</span>;
// }

// /* ---------- 3D HERO STACK ---------- */
// function HeroStack({ onPick }) {
//   const [r, setR] = useState({ x: 58, z: -38 });
//   const [hot, setHot] = useState(null);
//   const move = (e) => {
//     const b = e.currentTarget.getBoundingClientRect();
//     const px = (e.clientX - b.left) / b.width - 0.5;
//     const py = (e.clientY - b.top) / b.height - 0.5;
//     setR({ x: 58 - py * 18, z: -38 + px * 30 });
//   };
//   const order = [...LEVEL_NAMES].reverse();
//   return (
//     <div className="stage" onPointerMove={move} onPointerLeave={() => setR({ x: 58, z: -38 })}>
//       <div className="glow" />
//       <div className="stack" style={{ transform: `rotateX(${r.x}deg) rotateZ(${r.z}deg)` }}>
//         {order.map((l, i) => (
//           <button
//             key={l}
//             className={"plate" + (hot === l ? " hot" : "")}
//             style={{ "--c": LEVELS[l].color, "--n": order.length - 1 - i, "--d": `${i * 0.35}s` }}
//             onMouseEnter={() => setHot(l)}
//             onMouseLeave={() => setHot(null)}
//             onClick={() => onPick(l)}
//             aria-label={`Show ${l} certifications`}
//           >
//             <span className="plate-label">{l}</span>
//             <span className="plate-count">{countBy(l)} exams</span>
//           </button>
//         ))}
//       </div>
     
//     </div>
//   );
// }

// /* ---------- FLIP CARD ---------- */
// function CertCard({ c, i }) {
//   const [flip, setFlip] = useState(false);
//   const [tilt, setTilt] = useState({ x: 0, y: 0 });
//   const [ref, seen] = useReveal();
//   const navigate = useNavigate();
//   const col = LEVELS[c.level].color;
//   // opens OUR OWN detail page: /ilmora-aws-certification/clf-c02
//   const go = () => navigate(`/ilmora-aws-certification/${c.code.toLowerCase()}`);
//   const move = (e) => {
//     const b = e.currentTarget.getBoundingClientRect();
//     setTilt({ x: -((e.clientY - b.top) / b.height - 0.5) * 12, y: ((e.clientX - b.left) / b.width - 0.5) * 14 });
//   };
//   return (
//     <div ref={ref} className={"card-wrap" + (seen ? " in" : "")} style={{ "--c": col, "--i": i % 3 }}>
//       <div
//         className="card-tilt"
//         onMouseMove={move}
//         onMouseLeave={() => setTilt({ x: 0, y: 0 })}
//         style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
//       >
//         <div className={"card" + (flip ? " flip" : "")}>
//           <div className="face front">
//             <div className="tag">{c.level}</div>
//             <h3>{c.name}</h3>
//             <div className="code">{c.code}</div>
//             <div className="meta">
//               <div><b>${c.fee}</b><span>Exam fee</span></div>
//               <div><b>{c.time}</b><span>Exam time</span></div>
//               <div><b>3 yrs</b><span>Valid for</span></div>
//             </div>
//             <div className="front-actions">
//               <button className="flip-btn" onClick={() => setFlip(true)}>See what it covers</button>
//               <button className="guide" onClick={go}>Exam guide</button>
//             </div>
//           </div>
//           <div className="face back">
//             <h4>Best for</h4>
//             <p>{c.role}</p>
//             <h4>Before you start</h4>
//             <p>{c.exp}. {c.elig}.</p>
//             <h4>You will work with</h4>
//             <div className="chips">{c.tech.map((t) => <i key={t}>{t}</i>)}</div>
//             <div className="back-actions">
//               <button className="flip-btn" onClick={() => setFlip(false)}>Back</button>
//               <button className="guide" onClick={go}>Exam guide</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Cube({ t, d, i }) {
//   const [on, setOn] = useState(false);
//   return (
//     <div
//       className={"cube-scene" + (on ? " on" : "")}
//       style={{ "--i": i }}
//       role="button"
//       tabIndex={0}
//       onClick={() => setOn(!on)}
//       onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOn(!on)}
//     >
//       <div className="cube">
//         <div className="cf f1"><h3>{t}</h3></div>
//         <div className="cf f2"><p>{d}</p></div>
//       </div>
//     </div>
//   );
// }

// /* ---------- PAGE ---------- */
// export default function IlmoraCertification({ theme, toggleTheme, setShowLoginModal, scrollToSection, signupUrl = "" }) {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const isDark = theme === "dark";
//   useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [pathname]);
//   useEffect(() => { document.title = "AWS Certification Courses | ILM ORA"; }, []);
//   const [level, setLevel] = useState("All");
//   const listRef = useRef(null);
//   const pick = (l) => {
//     setLevel(l);
//     listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };
//   const shown = level === "All" ? CERTS : CERTS.filter((c) => c.level === level);
//   const [pathRef, pathSeen] = useReveal();
//   const [whyRef, whySeen] = useReveal();

//   return (
//     <PublicLayout
//       theme={theme}
//       toggleTheme={toggleTheme}
//       setShowLoginModal={setShowLoginModal}
//       scrollToSection={scrollToSection}
//     >
//         <style dangerouslySetInnerHTML={{ __html: CSS }} />
//     <div className={"ilm" + (isDark ? " dark" : "")}>

//       {/* HERO */}
//       <section className="hero cream">
//         <div className="hero-copy">
         
//          <h1>Get certified on the cloud <span style={{ color: "#F97316" }}>that runs half the internet.</span></h1>
//           <p>
//             AWS offers 12 exams across four levels. Learn what each one teaches, who it is for and what it
//             costs, then pick the path that fits your job goal. ILM ORA trains you with projects and
//             assessments until you are exam ready.
//           </p>
//           <div className="cta-row">
//             <button className="btn primary" onClick={() => pick("All")}>Explore all exams</button>
//             <button className="btn ghost" onClick={() => pathRef.current?.scrollIntoView({ behavior: "smooth" })}>Find my path</button>
//           </div>
//         </div>
//         <HeroStack onPick={pick} />
//       </section>

//       {/* STATS */}
//       <section className="stats white">
//         <div><b><Count to={CERTS.length} /></b><span>AWS exams covered</span></div>
//         <div><b><Count to={100} prefix="$" /></b><span>Lowest exam fee</span></div>
//         <div><b><Count to={3} /> yrs</b><span>Every certificate stays valid</span></div>
//         <div><b><Count to={0} /></b><span>Prerequisites to sit any exam</span></div>
//       </section>

//       {/* PATH */}
//       <section className="sec cream" ref={pathRef}>
//         <h2>Four levels. One clear way up.</h2>
//         <p className="sub">Each level builds on the last. You can start at any of them, but this is the usual order.</p>
//         <div className={"stairs" + (pathSeen ? " in" : "")}>
//           {LEVEL_NAMES.map((l, i) => (
//             <button key={l} className="step" style={{ "--c": LEVELS[l].color, "--h": `${130 + i * 62}px`, "--i": i }} onClick={() => pick(l)}>
//               <div className="step-top">
//                 <small>Step {i + 1}</small>
//                 <strong>{l}</strong>
//                 <p>{LEVELS[l].blurb}</p>
//               </div>
//               <div className="step-block"><span>{countBy(l)} exams</span></div>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* CERT LIST */}
//       <section className="sec white" ref={listRef}>
//         <h2>Pick an exam</h2>
//         <p className="sub">Flip any card to see who it suits, what you need beforehand and which AWS services it tests.</p>
//         <div className="tabs" role="tablist">
//           {["All", ...LEVEL_NAMES].map((l) => (
//             <button key={l} role="tab" aria-selected={level === l} className={level === l ? "on" : ""} onClick={() => setLevel(l)}>
//               {l}
//               <em>{l === "All" ? CERTS.length : countBy(l)}</em>
//             </button>
//           ))}
//         </div>
//         <div className="grid" key={level}>
//           {shown.map((c, i) => <CertCard key={c.code} c={c} i={i} />)}
//         </div>
//       </section>

//       {/* WHY */}
//       <section className="sec cream" ref={whyRef}>
//         <h2>What you get with ILM ORA</h2>
//         <div className={"cubes" + (whySeen ? " in" : "")}>
//           {[
//             ["Learn by building", "Every topic ends with a hands-on project on real AWS services."],
//             ["Practice like the exam", "Timed assessments that match the real exam length and style."],
//             ["Mentor support", "Stuck on IAM or VPC? Ask a mentor who has already passed."],
//             ["Proof for employers", "Finish with projects and scores you can show in interviews."],
//           ].map(([t, d], i) => (
//             <Cube key={t} t={t} d={d} i={i} />
//           ))}
//         </div>
//         <p className="sub center">Hover or tap a block to turn it.</p>
//       </section>

//       {/* CTA */}
//       <section className="final white">
//         <h2>Ready to pass your first AWS exam?</h2>
//         <p>Start with the level that matches where you are today.</p>
//         <button className="btn primary big" onClick={() => (signupUrl ? navigate(signupUrl) : setShowLoginModal ? setShowLoginModal(true) : pick("All"))}>Get started with ILM ORA</button>
//       </section>
//     </div>
//     </PublicLayout>
//   );
// }

// /* ---------- STYLES ---------- */
// const CSS = `
// .ilm{--cream:#F6EDE6;--white:#ffffff;--card:#ffffff;--tx:#1E293B;--tx2:#334155;--mut:#475569;--or:#F97316;--ord:#EA580C;--line:#E5E7EB;--w:1280px;background:var(--white);color:var(--tx);font-family:inherit;overflow-x:hidden;line-height:1.625;-webkit-text-size-adjust:100%}
// .ilm *{box-sizing:border-box}
// .ilm h1,.ilm h2,.ilm h3,.ilm h4{margin:0}
// .ilm button{font-family:inherit;cursor:pointer}
// .ilm :focus-visible{outline:2px solid var(--or);outline-offset:3px}
// .ilm .cream{background:var(--cream);--face:var(--card)}
// .ilm .white{background:var(--white);--face:var(--cream)}
// .ilm .hero,.ilm .sec,.ilm .stats,.ilm .final{padding-left:max(20px,calc((100% - var(--w))/2));padding-right:max(20px,calc((100% - var(--w))/2))}
// .ilm .hero{display:grid;grid-template-columns:1.05fr 1fr;gap:32px;align-items:center;padding-top:clamp(40px,7vw,80px);padding-bottom:clamp(32px,5vw,56px)}
// .ilm .pill{display:inline-flex;align-items:center;padding:6px 16px;border:1px solid rgba(249,115,22,.2);background:rgba(249,115,22,.1);color:var(--or);border-radius:9999px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
// .ilm .hero h1{font-size:clamp(30px,5vw,60px);line-height:1.1;font-weight:600;margin:18px 0;letter-spacing:-.025em;color:var(--tx);animation:ilm-rise .9s cubic-bezier(.2,.8,.2,1) both}
// .ilm .hero p{color:var(--mut);font-size:clamp(16px,1.6vw,18px);max-width:520px;animation:ilm-rise .9s .15s cubic-bezier(.2,.8,.2,1) both}
// .ilm .cta-row{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap;animation:ilm-rise .9s .3s cubic-bezier(.2,.8,.2,1) both}
// @keyframes ilm-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
// .ilm .btn{padding:14px 24px;border-radius:12px;font-weight:600;font-size:16px;border:1px solid transparent;transition:all .3s}
// .ilm .btn:hover{transform:scale(1.05)}
// .ilm .btn.primary{background:#EA580C;color:#fff;box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)}
// .ilm .btn.primary:hover{background:#C2410C}
// .ilm .btn.ghost{background:#1E293B;color:#fff}
// .ilm .btn.ghost:hover{background:#334155}
// .ilm .btn.big{padding:16px 32px;font-size:16px}
// .ilm .stage{position:relative;height:clamp(300px,50vw,460px);perspective:1100px;display:flex;align-items:center;justify-content:center;touch-action:pan-y}
// .ilm .glow{position:absolute;width:min(340px,80%);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.26),transparent 70%);filter:blur(20px)}
// .ilm .stack{--u:clamp(30px,9vw,62px);position:relative;width:clamp(150px,44vw,230px);aspect-ratio:1;transform-style:preserve-3d;transition:transform .25s ease-out}
// .ilm .plate{position:absolute;inset:0;transform-style:preserve-3d;transform:translateZ(calc(var(--n)*var(--u)));border-radius:clamp(14px,3vw,22px);border:2px solid var(--c);background:linear-gradient(135deg,color-mix(in srgb,var(--c) 26%,var(--card)),var(--card) 85%);box-shadow:0 10px 30px color-mix(in srgb,var(--c) 28%,transparent);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:clamp(10px,2.4vw,16px);color:var(--tx);animation:ilm-bob 4s ease-in-out infinite;animation-delay:var(--d);transition:filter .2s,box-shadow .2s}
// .ilm .plate.hot{filter:saturate(1.3);box-shadow:0 0 44px var(--c)}
// .ilm .plate-label{font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-weight:700;font-size:clamp(13px,3.4vw,17px)}
// .ilm .plate-count{font-size:12px;color:var(--mut)}
// @keyframes ilm-bob{0%,100%{translate:0 0 0}50%{translate:0 0 12px}}
// .ilm .stage-hint{position:absolute;bottom:0;margin:0;font-size:13px;color:var(--mut);text-align:center}
// .ilm .stats{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid var(--line)}
// .ilm .stats div{padding:clamp(18px,3vw,30px) 10px;text-align:center}
// .ilm .stats b{display:block;font-size:clamp(28px,4vw,40px);line-height:1.2;font-weight:600;letter-spacing:-.025em;color:var(--or)}
// .ilm .stats b span{font-size:inherit;font-weight:inherit;color:inherit}
// .ilm .stats div > span{display:block;color:var(--mut);font-size:16px;font-weight:500}
// .ilm .sec{padding-top:clamp(32px,4vw,40px);padding-bottom:clamp(32px,4vw,40px)}
// .ilm .sec h2,.ilm .final h2{font-size:clamp(24px,3.6vw,36px);font-weight:600;letter-spacing:-.025em;line-height:1.25;color:var(--tx)}
// .ilm .sub{color:var(--mut);max-width:672px;margin:12px 0 32px;font-size:clamp(16px,1.5vw,18px);line-height:1.625}
// .ilm .sub.center{text-align:center;margin:30px auto 0;font-size:14px}
// .ilm .stairs{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;perspective:1200px;align-items:end}
// .ilm .step{all:unset;cursor:pointer;display:flex;flex-direction:column;justify-content:flex-end;gap:14px;opacity:0;transform:rotateX(25deg) translateY(50px);transition:opacity .8s,transform .8s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.15s)}
// .ilm .stairs.in .step{opacity:1;transform:none}
// .ilm .step:focus-visible{outline:2px solid var(--or);outline-offset:4px;border-radius:12px}
// .ilm .step-top small{color:var(--c);font-weight:600}
// .ilm .step-top strong{display:block;font-size:20px;font-weight:600;letter-spacing:-.025em;color:var(--tx);margin:2px 0 6px}
// .ilm .step-top p{margin:0;color:var(--mut);font-size:14px}
// .ilm .step-block{height:var(--h);border-radius:14px;background:linear-gradient(160deg,color-mix(in srgb,var(--c) 32%,var(--card)),var(--card));border:1px solid var(--c);box-shadow:10px 10px 0 color-mix(in srgb,var(--c) 22%,transparent);display:flex;align-items:flex-end;padding:14px;font-weight:600;font-size:14px;transition:transform .25s}
// .ilm .step:hover .step-block{transform:translate(-4px,-6px)}
// .ilm .tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:32px}
// .ilm .tabs button{background:var(--card);color:var(--tx);border:1px solid var(--line);border-radius:9999px;padding:9px 20px;font-size:14px;font-weight:600;transition:all .3s;box-shadow:0 4px 6px -1px rgba(0,0,0,.06)}
// .ilm .tabs button em{font-style:normal;margin-left:8px;opacity:.7}
// .ilm .tabs button.on{background:var(--or);color:#fff;border-color:var(--or);box-shadow:0 10px 15px -3px rgba(249,115,22,.3)}
// .ilm .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:26px;perspective:1400px}
// .ilm .card-wrap{opacity:0;transform:translateY(40px) rotateX(-12deg);transition:opacity .7s,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.1s)}
// .ilm .card-wrap.in{opacity:1;transform:none}
// .ilm .card-tilt{transition:transform .15s ease-out;transform-style:preserve-3d}
// .ilm .card{position:relative;height:340px;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.3,.8,.2,1)}
// .ilm .card.flip{transform:rotateY(180deg)}
// .ilm .face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:16px;padding:22px;background:var(--face);border:1px solid color-mix(in srgb,var(--c) 45%,var(--line));box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);display:flex;flex-direction:column;pointer-events:none}
// .ilm .face::before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:4px;border-radius:0 4px 4px 0;background:var(--c)}
// .ilm .front{transform:translateZ(1px)}
// .ilm .back{transform:rotateY(180deg) translateZ(1px);overflow:auto}
// .ilm .card:not(.flip) .front,.ilm .card.flip .back{pointer-events:auto}
// .ilm .tag{align-self:flex-start;font-size:12px;font-weight:600;color:var(--c);border:1px solid var(--c);padding:3px 10px;border-radius:99px;background:var(--card)}
// .ilm .front h3{font-size:clamp(18px,2vw,20px);line-height:1.25;font-weight:600;letter-spacing:-.025em;color:var(--tx);margin:16px 0 6px}
// .ilm .code{color:var(--mut);font-size:14px}
// .ilm .meta{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:auto;padding:14px 0}
// .ilm .meta b{display:block;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-size:16px}
// .ilm .meta span{font-size:12px;color:var(--mut)}
// .ilm .front-actions,.ilm .back-actions{display:flex;justify-content:space-between;align-items:center;gap:10px}
// .ilm .back-actions{margin-top:auto;padding-top:12px}
// .ilm .flip-btn{background:var(--card);border:1px solid var(--line);color:var(--tx);border-radius:10px;padding:10px 14px;font-size:14px;font-weight:500;transition:.2s;min-height:40px}
// .ilm .flip-btn:hover{border-color:var(--c);color:var(--c)}
// .ilm .guide{display:inline-flex;align-items:center;justify-content:center;min-height:40px;padding:10px 14px;border:0;border-radius:10px;background:var(--c);color:#fff;font-size:14px;font-weight:600;text-decoration:none;cursor:pointer;transition:transform .2s,filter .2s}
// .ilm .guide:hover{transform:translateY(-2px);filter:brightness(1.08)}
// .ilm .back h4{font-size:12px;color:var(--c);margin:10px 0 3px;font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;font-weight:600}
// .ilm .back h4:first-child{margin-top:0}
// .ilm .back p{margin:0;font-size:14px;color:var(--tx2)}
// .ilm .chips{display:flex;flex-wrap:wrap;gap:6px}
// .ilm .chips i{font-style:normal;font-size:12px;padding:3px 9px;border-radius:8px;background:color-mix(in srgb,var(--c) 14%,var(--card));color:var(--tx2);border:1px solid color-mix(in srgb,var(--c) 25%,var(--card))}
// .ilm .cubes{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;perspective:1000px;margin-top:36px}
// .ilm .cube-scene{height:200px;cursor:pointer;opacity:0;transform:translateY(40px);transition:opacity .7s,transform .7s;transition-delay:calc(var(--i)*.12s)}
// .ilm .cubes.in .cube-scene{opacity:1;transform:none}
// .ilm .cube{position:relative;width:100%;height:100%;transform-style:preserve-3d;transform:translateZ(-100px);transition:transform .8s cubic-bezier(.3,.8,.2,1)}
// .ilm .cube-scene.on .cube,.ilm .cube-scene:focus-visible .cube{transform:translateZ(-100px) rotateX(-90deg)}
// @media(hover:hover){.ilm .cube-scene:hover .cube{transform:translateZ(-100px) rotateX(-90deg)}}
// .ilm .cf{position:absolute;inset:0;border-radius:16px;padding:20px;display:flex;align-items:center;border:1px solid var(--line);background:var(--card);backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 12px 26px rgba(120,80,40,.14)}
// .ilm .cf h3{font-size:clamp(18px,2vw,20px);font-weight:600;letter-spacing:-.025em;color:var(--tx)}
// .ilm .cf p{margin:0;font-size:14.5px;color:#fff}
// .ilm .f1{transform:rotateX(0) translateZ(100px)}
// .ilm .f2{transform:rotateX(90deg) translateZ(100px);background:linear-gradient(150deg,#f97316,#c2410c);border-color:var(--or)}
// .ilm .final{text-align:center;padding-top:clamp(64px,9vw,100px);padding-bottom:clamp(64px,9vw,100px);background:radial-gradient(ellipse at 50% 0,rgba(249,115,22,.14),transparent 65%),var(--white)}
// .ilm .final p{color:var(--mut);margin:12px 0 28px;font-size:clamp(16px,1.6vw,18px)}
// @media(min-width:1600px){.ilm{--w:1360px}}
// @media(max-width:1100px){.ilm .hero{gap:16px}
// .ilm .stairs,.ilm .cubes{gap:16px}
// .ilm .step-top strong{font-size:18px}}
// @media(max-width:900px){.ilm .hero{grid-template-columns:1fr;text-align:center}
// .ilm .hero p{margin-left:auto;margin-right:auto}
// .ilm .cta-row{justify-content:center}
// .ilm .stairs,.ilm .cubes{grid-template-columns:repeat(2,1fr)}
// .ilm .stats{grid-template-columns:repeat(2,1fr)}
// .ilm .stats div{border-bottom:1px solid var(--line)}
// .ilm .sub{max-width:none}}
// @media(max-width:768px){.ilm .card{height:350px}}
// @media(max-width:560px){.ilm .stairs,.ilm .cubes{grid-template-columns:1fr}
// .ilm .step-block{height:calc(var(--h)*.55)}
// .ilm .card{height:370px}
// .ilm .tabs{flex-wrap:nowrap;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 6px;-webkit-overflow-scrolling:touch}
// .ilm .tabs button{flex:0 0 auto}
// .ilm .btn{flex:1 1 100%;text-align:center}
// .ilm .front-actions{flex-wrap:wrap}}
// @media(max-width:380px){.ilm .face{padding:18px}
// .ilm .card{height:390px}
// .ilm .meta b{font-size:14px}}
// @media(prefers-reduced-motion:reduce){.ilm *{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}}
// .ilm.dark{--cream:#000000;--white:#0F172A;--card:#111827;--tx:#ffffff;--tx2:#CBD5E1;--mut:#CBD5E1;--line:#1F2937}
// .ilm .hero h1,.ilm .sec h2,.ilm .final h2,.ilm .step-top strong,.ilm .front h3,.ilm .cf h3,.ilm .stats b{font-weight:500}
// .ilm .step-top small,.ilm .step-block,.ilm .tag,.ilm .back h4,.ilm .plate-label,.ilm .meta b,.ilm .pill{font-weight:500}
// .ilm .btn,.ilm .tabs button,.ilm .guide,.ilm .flip-btn{font-weight:500}
// .ilm .stats div > span{font-weight:400}
// .ilm,.ilm *{font-family:inherit!important}
// `;



































"use client";
/**
 * ilmora-aws-certification.jsx  (ONE FILE)
 * - Old HERO (3D level stack) + "What you get with ILM ORA" cubes, copied from the old UI
 * - New certification listing, 22 section pages and detail pages (state-based, no extra files)
 * - Old Navbar + Footer through the same PublicLayout import the old page used
 * Needs only: ./awsCertData (your existing file) and ../Landing/components/PublicLayout
 */
import { useEffect, useRef, useState } from "react";

// Same shared shell (AnnouncementBanner, Navbar, Footer) used by StudyAbroad, Careers, About etc.
import PublicLayout from "../Landing/components/PublicLayout";
import { CERTS, LEVELS } from "./awsCertData";

const LEVEL_NAMES = Object.keys(LEVELS);
const countBy = (l) => CERTS.filter((c) => c.level === l).length;
const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const isStep = (it) => /^\d\./.test(it.t);

/* ---------- PAGE CONTENT (original copy, one entry per page) ---------- */
const P = (title, intro, sections, cta = "Get started") => ({ title, intro, sections, cta });
const S = (h, items, sub) => ({ h, items, sub });
const CI = (lv, t, d, b) => ({ t, d, b, lv });
const I = (t, d) => ({ t, d });

const PAGES = {
  home: P(
    "Ilmora Certification",
    "Earn an industry-recognized credential in cloud and AI to grow your career and business.",
    [
      S("Business certifications", [
        CI("Business", "Ilmora Certified AI Business Strategist (beta exam)", "Validate the business judgment that takes AI from adoption to scale.", "#d6246e"),
      ], "Validate strategic expertise in applying cloud and AI to business outcomes. No technical experience is needed."),
      S("Foundational certifications", [
        CI("Foundational", "Ilmora Certified Cloud Practitioner", "Showcase foundational knowledge of cloud concepts, pricing and security.", "#3a4452"),
        CI("Foundational", "Ilmora Certified AI Practitioner", "Prove you understand AI, machine learning and generative AI basics.", "#3a4452"),
      ], "Validate cloud and AI fundamental knowledge as well as core concepts. No prior experience needed."),
      S("Associate certifications", [
        CI("Associate", "Ilmora Certified Solutions Architect - Associate", "Validate your skills in designing resilient, cost-aware systems.", "#3b4cf0"),
        CI("Associate", "Ilmora Certified Machine Learning Engineer - Associate", "Position yourself in demand for building and deploying ML models.", "#3b4cf0"),
        CI("Associate", "Ilmora Certified Data Engineer - Associate", "Show your ability to design data pipelines and keep data quality high.", "#3b4cf0"),
        CI("Associate", "Ilmora Certified CloudOps Engineer - Associate", "Validate skills in deploying, managing and operating workloads.", "#3b4cf0"),
        CI("Associate", "Ilmora Certified Developer - Associate", "Validate proficiency in developing, testing and debugging cloud apps.", "#3b4cf0"),
      ], "Validate core cloud skills. Prior cloud or IT experience recommended."),
      S("Professional certifications", [
        CI("Professional", "Ilmora Certified DevOps Engineer - Professional", "Advanced skills in delivering software through automation.", "#0f8a96"),
        CI("Professional", "Ilmora Certified Generative AI Developer - Professional", "Validate skills in building and deploying production generative AI.", "#0f8a96"),
        CI("Professional", "Ilmora Certified Solutions Architect - Professional", "Validate advanced skills in designing complex, multi-team solutions.", "#0f8a96"),
      ], "Master advanced cloud architecture and solutions. 2+ years of experience required."),
      S("Specialty certifications", [
        CI("Specialty", "Ilmora Certified Security - Specialty", "Validate your knowledge of securing workloads and architectures.", "#6b3fd1"),
        CI("Specialty", "Ilmora Certified Advanced Networking - Specialty", "Validate skills in designing and securing complex networks.", "#6b3fd1"),
      ], "Demonstrate expertise in specific cloud technologies and services."),
    ],
    "Schedule an exam"
  ),

  /* ---- Get Trained ---- */
  topic: P("Find training by topic", "Browse learning by subject, from storage to security to machine learning.", [
    S("Popular topics", [
      I("Compute & Networking", "Virtual servers, containers, load balancing and private networks."),
      I("Storage & Databases", "Object storage, relational and NoSQL data, backups."),
      I("Security & Identity", "Access control, encryption and compliance basics."),
      I("AI & Machine Learning", "Model building, deployment and responsible AI."),
      I("DevOps & Automation", "Pipelines, infrastructure as code and monitoring."),
      I("Cost & Governance", "Budgets, tagging, right-sizing and policy."),
    ]),
  ], "Browse all topics"),
  classroom: P("Find classroom training", "Learn live with an instructor, in person or online.", [
    S("Formats", [
      I("In-person classes", "Hands-on labs in a classroom near you."),
      I("Virtual classes", "Live instructor sessions from anywhere."),
      I("Private team classes", "A dedicated session shaped around your team's goals."),
    ]),
    S("What to expect", [
      I("2 to 5 days", "Most courses run a few focused days."),
      I("Guided labs", "Practice every concept in a real sandbox."),
      I("Course materials", "Slides, notes and lab guides you keep."),
    ]),
  ], "Find a class"),
  digital: P("Find digital training", "Self-paced courses, labs and games you can start in minutes.", [
    S("Learn your way", [
      I("Free courses", "Short lessons on cloud fundamentals."),
      I("Hands-on labs", "Practice in a safe environment with step-by-step goals."),
      I("Learning plans", "Curated paths from beginner to advanced."),
      I("Practice exams", "Check your readiness before exam day."),
    ]),
  ], "Start learning"),
  event: P("Find a training event", "Workshops, bootcamps and community days all year.", [
    S("Upcoming event types", [
      I("Exam readiness bootcamps", "Review exam domains with an expert coach."),
      I("Build days", "Create a working project in one session."),
      I("Community meetups", "Meet learners and practitioners near you."),
    ]),
  ], "View calendar"),
  trainingPartner: P("Find a training partner", "Approved partners deliver Ilmora courses in your language and region.", [
    S("Why learn with a partner", [
      I("Local language", "Courses delivered in many languages."),
      I("Flexible schedules", "Weekday, weekend and evening options."),
      I("Verified instructors", "Every trainer meets our quality bar."),
    ]),
  ], "Search partners"),
  live: P("Find training on live streams", "Watch live sessions, ask questions and learn alongside others.", [
    S("Live shows", [
      I("Weekly builds", "Watch a service built from scratch."),
      I("Exam office hours", "Bring your questions to certified coaches."),
      I("Career talks", "Hear how others moved into cloud roles."),
    ]),
  ], "See the schedule"),

  /* ---- Get Certified ---- */
  overview: P("Certification overview", "Four levels, many roles. Choose the path that fits your goals.", [
    S("Levels", [
      I("Foundational", "No prior experience needed. Learn the core ideas."),
      I("Associate", "Around a year of hands-on experience."),
      I("Professional", "Two or more years designing and operating solutions."),
      I("Specialty", "Deep expertise in one area such as security or data."),
    ]),
    S("Role paths", [
      I("Architect", "Design systems that scale."),
      I("Developer", "Build and ship cloud applications."),
      I("Operations", "Run, monitor and automate."),
      I("Data & AI", "Turn data into decisions."),
    ]),
  ], "Explore exams"),
  schedule: P("Schedule an exam", "Choose a test center or take your exam online.", [
    S("Steps", [
      I("1. Sign in", "Use your Ilmora Certification account."),
      I("2. Pick an exam", "Select the exam and language."),
      I("3. Choose a slot", "Test center or online proctored."),
      I("4. Confirm", "Pay or apply a voucher and receive your confirmation email."),
    ]),
    S("Good to know", [
      I("Accessibility", "Request extra time or other accommodations."),
      I("Reschedule", "Change your slot up to 24 hours before."),
    ]),
  ], "Sign in to schedule"),
  prepare: P("Prepare for an exam", "Everything you need to walk in confident.", [
    S("Prepare with", [
      I("Exam guides", "See domains, weights and sample topics."),
      I("Sample questions", "Get a feel for the question style."),
      I("Official practice exams", "Timed practice with score reports."),
      I("Study groups", "Learn with peers online."),
    ]),
  ], "Open study guide"),
  vouchers: P("Buy exam vouchers", "Buy vouchers for yourself or your whole team.", [
    S("Options", [
      I("Single voucher", "One exam, valid for one year."),
      I("Team bundle", "Save when you buy in volume."),
      I("Retake coverage", "Add a second attempt to your purchase."),
    ]),
  ], "Buy a voucher"),
  maintain: P("Maintain your certification", "Certifications stay current when you renew them.", [
    S("Keeping current", [
      I("Renew by exam", "Take the latest version before expiry."),
      I("Digital badge", "Share your credential on professional networks."),
      I("Renewal reminders", "We email you well before your date."),
    ]),
  ], "Renew now"),

  /* ---- Develop Your Team ---- */
  team: P("Develop your team", "Help everyone on your team learn, certify and apply new skills.", [
    S("Programs for organizations", [
      I("Team learning plans", "Assign courses and track completion."),
      I("Skills assessments", "Find gaps before they slow a project."),
      I("Cohort bootcamps", "Train a group together over several weeks."),
      I("Executive briefings", "Cloud and AI strategy for leaders."),
    ]),
    S("Results to expect", [
      I("Faster delivery", "Teams ship with fewer blockers."),
      I("Lower cost", "Better design means leaner bills."),
      I("Higher retention", "Learning paths keep people growing."),
    ]),
  ], "Talk to us"),

  /* ---- Partner Training ---- */
  partnerOverview: P("Partner training overview", "Skills and credentials for companies that build and sell on Ilmora.", [
    S("What partners get", [
      I("Sales learning", "Position cloud and AI value with confidence."),
      I("Technical learning", "Deep dives for architects and engineers."),
      I("Recognition", "Show customers your team's credentials."),
    ]),
  ], "Join as a partner"),
  partnerCert: P("Partner certification", "Credentials that prove your team's expertise to customers.", [
    S("Tracks", [
      I("Business", "For sales and account teams."),
      I("Technical", "For solution architects and engineers."),
      I("Specialist", "For focus areas such as migration or data."),
    ]),
  ], "View tracks"),
  partnerPlans: P("Partner learning plans", "Ready-made plans that take a role from beginner to ready.", [
    S("Plans", [
      I("Sales accelerator", "Four weeks to a confident pitch."),
      I("Solution builder", "Hands-on path for architects."),
      I("Delivery lead", "Plan and run customer projects."),
    ]),
  ], "Pick a plan"),
  partnerCast: P("PartnerCast webinars", "Short live and on-demand webinars for partners.", [
    S("Series", [
      I("What's new", "Monthly updates on services and programs."),
      I("Customer stories", "How partners won and delivered."),
      I("Deep dives", "Technical sessions with Q&A."),
    ]),
  ], "Watch webinars"),

  /* ---- Education Programs ---- */
  academy: P("Ilmora Academy", "A ready-to-teach cloud curriculum for universities and colleges.", [
    S("For institutions", [
      I("Course content", "Slides, labs and assessments."),
      I("Educator training", "Get instructors ready to teach."),
      I("Student credits", "Lab access for every learner."),
    ]),
  ], "Apply as an institution"),
  educate: P("Ilmora Educate", "Free learning resources and credits for students.", [
    S("For students", [
      I("Learning credits", "Practice without worrying about cost."),
      I("Career resources", "Resume tips and job boards."),
      I("Student community", "Learn with peers worldwide."),
    ]),
  ], "Join now"),
  launch: P("Ilmora Launch", "A full-time pathway into your first cloud job, no experience needed.", [
    S("The program", [
      I("Learn", "Cloud, Linux, Python and networking basics."),
      I("Practice", "Build projects with mentor feedback."),
      I("Get hired", "Interview prep and employer introductions."),
    ]),
  ], "See upcoming cohorts"),
  skills: P("Ilmora Skills Centers", "Community spaces to learn, build and meet.", [
    S("Inside a center", [
      I("Free workshops", "Short sessions for all levels."),
      I("Co-working space", "A place to study and build."),
      I("Career events", "Meet hiring teams and mentors."),
    ]),
  ], "Find a center"),
};

/* ---------- NAVIGATION ---------- */
const MENUS = [
  { label: "Get Trained", items: [
    ["Find Training by Topic", "topic"], ["Find Classroom Training", "classroom"],
    ["Find Digital Training", "digital"], ["Find a Training Event", "event"],
    ["Find an Ilmora Training Partner", "trainingPartner"], ["Find Training on Live Streams", "live"] ] },
  { label: "Get Certified", items: [
    ["Certification Overview", "overview"], ["Schedule an Exam", "schedule"],
    ["Prepare for an Exam", "prepare"], ["Buy Exam Vouchers", "vouchers"],
    ["Maintain your certification", "maintain"] ] },
  { label: "Develop Your Team", page: "team" },
  { label: "Partner Training", items: [
    ["Partner Training Overview", "partnerOverview"], ["Partner Certification", "partnerCert"],
    ["Partner Learning Plans", "partnerPlans"], ["PartnerCast Webinars", "partnerCast"] ] },
  { label: "Education Programs", items: [
    ["Ilmora Academy", "academy"], ["Ilmora Educate", "educate"],
    ["Ilmora Launch", "launch"], ["Ilmora Skills Centers", "skills"] ] },
];

const D = { roles: "Analysts, engineers, managers, students", lang: "English, Hindi, Japanese", mode: "Online" };
const G = {
  home: { cat: "Certification", dur: "90 to 130 minutes", fmt: "65 questions, multiple choice and multiple response", cost: "100 to 150 USD", who: "Professionals building or proving cloud and AI skills", mode: "Test center or online proctored" },
  topic: { cat: "Learning path", dur: "6 to 10 hours", fmt: "Short modules, labs and a final quiz", cost: "Free to start", who: "Learners who want depth in one subject area", mode: "Online, self-paced" },
  classroom: { cat: "Instructor-led", dur: "2 to 5 days", fmt: "Live lectures with guided labs", cost: "From 600 USD per seat", who: "Learners who prefer a live instructor and peers", mode: "In person or virtual classroom" },
  digital: { cat: "Digital course", dur: "1 to 8 hours", fmt: "Video lessons, labs and knowledge checks", cost: "Free, with optional paid labs", who: "Self-paced learners at any level", mode: "Online, self-paced" },
  event: { cat: "Event", dur: "Half day to 2 days", fmt: "Talks, workshops and build sessions", cost: "Free to 150 USD", who: "Learners who want coaching and networking", mode: "In person or live online" },
  trainingPartner: { cat: "Partner-delivered", dur: "Varies by course", fmt: "Ilmora curriculum taught by approved trainers", cost: "Set by each partner", who: "Learners who want local-language or local-time classes", mode: "In person or virtual" },
  live: { cat: "Live stream", dur: "60 to 90 minutes", fmt: "Live show with chat Q&A, replay afterwards", cost: "Free", who: "Anyone who learns well by watching and asking", mode: "Live stream and on-demand" },
  overview: { cat: "Certification level", dur: "90 to 180 minutes", fmt: "Scenario-based multiple choice and multiple response", cost: "100 to 300 USD", who: "Candidates choosing the right exam level", mode: "Test center or online proctored" },
  schedule: { cat: "Exam booking", dur: "About 10 minutes to book", fmt: "Online booking with confirmation email", cost: "Exam fee applies", who: "Candidates ready to pick a date", mode: "Test center or online proctored" },
  prepare: { cat: "Exam preparation", dur: "2 to 6 weeks suggested", fmt: "Guides, practice questions and mock exams", cost: "Free and paid options", who: "Candidates planning their study time", mode: "Online, self-paced" },
  vouchers: { cat: "Exam voucher", dur: "Valid for 12 months", fmt: "Digital code, used at booking", cost: "Exam price, bundles discounted", who: "Individuals and teams paying for exams", mode: "Delivered by email" },
  maintain: { cat: "Renewal", dur: "Every 3 years", fmt: "Renew by exam or by a newer exam", cost: "Reduced renewal fee", who: "Certified professionals keeping credentials active", mode: "Online" },
  team: { cat: "Team program", dur: "4 to 12 weeks", fmt: "Blended learning with coaching and reports", cost: "Custom quote", who: "Managers and L&D leads with teams of 5 or more", roles: "Engineering managers, L&D leads, HR partners", mode: "Online or on-site" },
  partnerOverview: { cat: "Partner program", dur: "Ongoing", fmt: "Courses, credentials and recognition tiers", cost: "Included with partnership", who: "Staff at Ilmora partner companies", roles: "Sales, pre-sales, architects, delivery leads", mode: "Online" },
  partnerCert: { cat: "Partner credential", dur: "60 to 120 minutes", fmt: "Role-based online exam", cost: "Free for partner staff", who: "Partner employees proving customer-facing skills", roles: "Sales, solution architects, engineers", mode: "Online proctored" },
  partnerPlans: { cat: "Learning plan", dur: "2 to 6 weeks", fmt: "Ordered courses with checkpoints", cost: "Free for partner staff", who: "Partner staff following a role path", roles: "Sales, architects, delivery leads", mode: "Online, self-paced" },
  partnerCast: { cat: "Webinar", dur: "45 minutes", fmt: "Live session, slides and recording", cost: "Free for partners", who: "Partner staff keeping up with changes", roles: "Sales, marketing, engineers", mode: "Live and on-demand" },
  academy: { cat: "Education program", dur: "One semester", fmt: "Curriculum, labs and assessments", cost: "Free for approved institutions", who: "Universities and colleges adding cloud courses", roles: "Lecturers, department heads, lab coordinators", mode: "In class and online" },
  educate: { cat: "Education program", dur: "Self-paced", fmt: "Learning credits and career resources", cost: "Free for students", who: "Students at eligible schools", roles: "Undergraduates, graduates, career changers", mode: "Online" },
  launch: { cat: "Career program", dur: "12 to 16 weeks", fmt: "Full-time cohort with mentors and projects", cost: "Free or income-share, by region", who: "Beginners aiming for a first cloud job", roles: "Career changers, graduates, support staff", mode: "Virtual cohort" },
  skills: { cat: "Community space", dur: "Drop in", fmt: "Workshops, study rooms and events", cost: "Free", who: "Learners who want a place to study and meet others", roles: "Students, job seekers, local builders", mode: "In person" },
};
const LV = {
  Business: { cat: "Business", dur: "170 minutes", fmt: "85 questions, multiple choice and multiple response", cost: "50 USD (beta pricing; standard price is 100 USD)", who: "Professionals who drive AI outcomes. No coding or cloud experience needed", roles: "Product managers, consultants, business analysts, marketers" },
  Foundational: { cat: "Foundational", dur: "90 minutes", fmt: "65 questions, multiple choice and multiple response", cost: "100 USD", who: "Anyone starting out. No prior experience needed", roles: "Sales, finance, project managers, students" },
  Associate: { cat: "Associate", dur: "130 minutes", fmt: "65 questions, multiple choice and multiple response", cost: "150 USD", who: "People with about a year of hands-on cloud or IT experience", roles: "Engineers, developers, architects, operators" },
  Professional: { cat: "Professional", dur: "180 minutes", fmt: "75 questions, scenario-based", cost: "300 USD", who: "People with 2+ years designing and running cloud solutions", roles: "Senior engineers, lead architects, DevOps leads" },
  Specialty: { cat: "Specialty", dur: "170 minutes", fmt: "65 questions, scenario-based", cost: "300 USD", who: "People with deep experience in one technical area", roles: "Security engineers, network architects, specialists" },
};
const HERO = { Business: "#ffd9ea", Foundational: "#d8eefc", Associate: "#fff3b0", Professional: "#cdf2ea", Specialty: "#e5d8ff" };
const ROWS = [["Category", "cat"], ["Exam duration", "dur"], ["Exam format", "fmt"], ["Cost", "cost"], ["Intended candidate", "who"], ["Candidate role examples", "roles"], ["Testing options", "mode"], ["Languages offered", "lang"]];
const EXAMY = ["home", "overview", "schedule", "prepare", "vouchers", "maintain", "partnerCert"];

/* ---------- OLD UI: hooks, 3D hero stack, cubes ---------- */
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

/* ---------- BADGES + CARDS ---------- */
function Hex({ color = "#4f46e5", t, lv, size = 120 }) {
  const short = t.replace(/^Ilmora Certified /, "").replace(/ \(beta exam\)/, "").split(" - ")[0];
  const lines = [];
  short.split(" ").forEach((w) => {
    const l = lines[lines.length - 1];
    if (l && (l + " " + w).length <= 11) lines[lines.length - 1] = l + " " + w;
    else lines.push(w);
  });
  return (
    <svg viewBox="0 0 100 112" width={size} height={size * 1.12} role="img" aria-label={short}>
      <polygon points="50,2 96,28 96,84 50,110 4,84 4,28" fill={color} />
      <polygon points="50,8 91,31 91,81 50,104 9,81 9,31" fill="none" stroke="#fff" strokeOpacity=".35" />
      <text x="50" y="30" fill="#fff" fontSize="8" textAnchor="middle" opacity=".85">ilmora</text>
      {lines.slice(0, 3).map((l, i) => (
        <text key={i} x="50" y={50 + i * 11} fill="#fff" fontSize="9.5" fontWeight="700" textAnchor="middle">{l}</text>
      ))}
      {lv && <text x="50" y="94" fill="#fff" fontSize="7" textAnchor="middle" opacity=".9">{lv}</text>}
    </svg>
  );
}

function Card({ it, onOpen }) {
  if (it.b) {
    return (
      <button className="bcard" onClick={onOpen}>
        <Hex color={it.b} t={it.t} lv={it.lv} size={92} />
        <h3>{it.t}</h3><p>{it.d}</p>
        <span className="foot"><span>→</span><span className="plus">+</span></span>
      </button>
    );
  }
  return (
    <button className="card" onClick={onOpen}>
      <h3>{it.t}</h3><p>{it.d}</p><span className="more-link">View details ›</span>
    </button>
  );
}

function Feedback() {
  const [v, setV] = useState(null);
  return (
    <section className="fb">
      <div className="fbin">
        <div>
          <h3>Did you find what you were looking for today?</h3>
          <p>Let us know so we can improve the quality of the content on our pages.</p>
        </div>
        {v ? <p className="thanks" role="status">Thanks for your feedback.</p> : (
          <div className="fbb"><button onClick={() => setV("y")}>Yes</button><button onClick={() => setV("n")}>No</button></div>
        )}
      </div>
    </section>
  );
}

/* ---------- SUB NAV (Training and Certification bar) ---------- */
function SubNav({ pid, go, home }) {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => setOpen(null), [pid]);
  return (
    <div className={"subwrap" + (home ? " tohome" : "")} ref={ref}>
      <div className="subbar">
        <button className="subtitle" onClick={() => go("home")}>Training and Certification</button>
        <div className="subnav">
          {MENUS.map((m) => (
            <div className="mi" key={m.label}>
              <button
                className={open === m.label ? "on" : ""}
                aria-expanded={open === m.label}
                onClick={() => (m.page ? go(m.page) : setOpen(open === m.label ? null : m.label))}
              >
                {m.label}
                {m.items && (
                  <svg className="car" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ transform: open === m.label ? "rotate(180deg)" : "none" }}>
                    <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              {m.items && open === m.label && (
                <ul className="dd">
                  {m.items.map(([t, id]) => (
                    <li key={id}><button className={pid === id ? "cur" : ""} onClick={() => go(id)}>{t}</button></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- OLD HERO + WHAT YOU GET (copied sections) ---------- */
function IlmHero({ dark }) {
  const pick = (l) => jump(l.toLowerCase()); // plate click scrolls to that level section
  return (
    <div className={"ilm" + (dark ? " dark" : "")}>
      <section className="hero cream">
              <div className="hero-copy">
         
               <h1>Get certified on the cloud <span style={{ color: "#F97316" }}>that runs half the internet.</span></h1>
                <p>
                  AWS offers 12 exams across four levels. Learn what each one teaches, who it is for and what it
                  costs, then pick the path that fits your job goal. ILM ORA trains you with projects and
                  assessments until you are exam ready.
                </p>
                <div className="cta-row">
                  <button className="btn primary" onClick={() => jump("exams")}>Explore all exams</button>
                  <button className="btn ghost" onClick={() => jump("foundational")}>Find my path</button>
                </div>
              </div>
              <HeroStack onPick={pick} />
            </section>
    </div>
  );
}

function IlmWhy({ dark }) {
  const [whyRef, whySeen] = useReveal();
  return (
    <div className={"ilm" + (dark ? " dark" : "")}>
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
            </section>
    </div>
  );
}

/* ---------- ILM ORA SCHEDULE FORM ---------- */
function ScheduleForm() {
  const [f, setF] = useState({ name: "", email: "", date: "", mode: "Online proctored" });
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().slice(0, 10);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const valid = f.name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(f.email) && f.date >= today && f.date !== "";
  const submit = (e) => { e.preventDefault(); if (valid) setSent(true); };
  if (sent) {
    return (
      <div className="sform done" role="status">
        <h3>Request received</h3>
        <p>Thanks, {f.name.trim()}. We will email {f.email} within one business day to confirm your {f.mode.toLowerCase()} slot on {f.date}.</p>
        <button className="sbtn on" onClick={() => { setSent(false); setF({ name: "", email: "", date: "", mode: "Online proctored" }); }}>Make another request</button>
      </div>
    );
  }
  return (
    <form className="sform" onSubmit={submit} noValidate>
      <label htmlFor="sf-name">Full name</label>
      <input id="sf-name" type="text" autoComplete="name" value={f.name} onChange={set("name")} />
      <label htmlFor="sf-email">Email</label>
      <input id="sf-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} />
      <label htmlFor="sf-date">Preferred date</label>
      <input id="sf-date" type="date" min={today} value={f.date} onChange={set("date")} />
      <label htmlFor="sf-mode">Delivery</label>
      <select id="sf-mode" value={f.mode} onChange={set("mode")}>
        <option>Online proctored</option>
        <option>Test center</option>
      </select>
      <button type="submit" className={"sbtn" + (valid ? " on" : "")} disabled={!valid}>Confirm request</button>
    </form>
  );
}

/* ---------- LISTING (home + every section page) ---------- */
function Listing({ pid, go, open, dark }) {
  const data = PAGES[pid];
  const links = MENUS.flatMap((m) => (m.items ? m.items : [[m.label, m.page]])).filter(([, id]) => id !== pid).slice(0, 8);
  return (
    <>
      {pid === "home" ? (
        <IlmHero dark={dark} />
      ) : (
        <section className="phero">
          <div className="inner">
            <div className="crumbs">
              <button onClick={() => go("home")}>Ilmora</button> › <button onClick={() => go("home")}>Certification</button> › <span>{data.title}</span>
            </div>
            <h1>{data.title}</h1>
            <p className="lead">{data.intro}</p>
            <div className="btns">
              <button className="dark" onClick={() => go("schedule")}>{data.cta}</button>
              <button className="ghost" onClick={() => go("prepare")}>Prepare for an exam</button>
            </div>
          </div>
        </section>
      )}

      <div className="inner body" id="exams">
        {data.sections.map((s) => (
          <section key={s.h} id={s.h.split(" ")[0].toLowerCase()}>
            <h2>{s.h}</h2>
            {s.sub && <p className="secsub">{s.sub}</p>}
            <div className="grid">
              {s.items.map((it) =>
                isStep(it) ? (
                  <article key={it.t}><h3>{it.t}</h3><p>{it.d}</p></article>
                ) : (
                  <Card key={it.t} it={it} onOpen={() => open(pid, it)} />
                )
              )}
            </div>
          </section>
        ))}
        {pid === "schedule" && (
          <section id="book">
            <h2>Request your exam slot</h2>
            <p className="secsub">Tell us when you would like to sit the exam. We confirm by email.</p>
            <ScheduleForm />
          </section>
        )}
        {pid !== "home" && (
          <section>
            <h2>Keep exploring</h2>
            <div className="chips">{links.map(([t, id]) => <button key={id} onClick={() => go(id)}>{t}</button>)}</div>
          </section>
        )}
      </div>

      {pid === "home" && <IlmWhy dark={dark} />}
    </>
  );
}

/* ---------- DETAIL PAGE ---------- */
function Detail({ pid, it, go, open }) {
  const [ok, setOk] = useState(false);
  const pg = PAGES[pid];
  const f = { ...D, ...G[pid], ...(LV[it.lv] || {}) };
  const exam = EXAMY.includes(pid);
  const all = pg.sections.flatMap((s) => s.items).filter((x) => x.t !== it.t && !/^\d\./.test(x.t));
  const sibs = [...all.filter((x) => x.lv && x.lv === it.lv), ...all.filter((x) => !x.lv || x.lv !== it.lv)];
  const steps = [
    ["Get to know it", `Review the outline for ${it.t}, then try the official sample questions to understand the style.`],
    ["Refresh your knowledge and skills", "Enroll in digital courses where you need to fill gaps, with labs and quizzes along the way."],
    ["Review and practice", "Revisit each domain, then reinforce it with exam-style questions and walkthroughs from instructors."],
    [exam ? "Assess your readiness" : "Finish and share", exam ? "Take the official practice exam and confirm you are consistently passing." : "Complete the final activity and earn a digital badge to share."],
  ];
  const faqs = [
    [`Who should take ${it.t}?`, `${f.who}. Typical roles include ${f.roles.toLowerCase()}.`],
    ["How long does it take?", `Plan for ${f.dur.toLowerCase()}. Format: ${f.fmt.toLowerCase()}.`],
    ["What does it cost?", `${f.cost}. Team and voucher options are on the Buy Exam Vouchers page.`],
    ["Can I take it in my language?", `Offered in ${f.lang}. More languages are added each quarter.`],
    ["How long is it valid for?", "Credentials stay valid for three years and can be renewed by exam or with a newer exam."],
    ...(sibs[0] ? [[`How is it different from ${sibs[0].t}?`, `${it.t}: ${it.d} ${sibs[0].t}: ${sibs[0].d}`]] : []),
  ];
  const more = [["overview", "Learn more about Ilmora Certification exams", "Review the options for your exam and language."], ["live", "Ilmora Training Live", "Free live and on-demand sessions with experts."], ["prepare", "Certification FAQs", "Answers to common questions about getting certified."], ["schedule", "Information and policies", "Scheduling, ID requirements and exam rules."], ["vouchers", "Exam vouchers", "Buy, distribute and track vouchers for a team."]].filter(([id]) => id !== pid);
  const bg = HERO[it.lv] || "#ece6ff";
  return (
    <>
      <section className="phero" style={{ background: `linear-gradient(180deg, ${bg} 0%, #fff 100%)` }}>
        <div className="inner">
          <div className="crumbs">
            <button onClick={() => go("home")}>Ilmora</button> › <button onClick={() => go(pid)}>{pg.title}</button> › <span>{it.t}</span>
          </div>
          <h1>{it.t}</h1>
          <p className="lead">{it.d}</p>
          <div className="btns"><button className="dark" onClick={() => setOk(true)}>{pg.cta}</button></div>
          {ok && <p className="note" role="status">Saved. We will email next steps for {it.t}.</p>}
        </div>
      </section>
      <div className="inner body">
        <section className="ov intro">
          <div className="badgebox"><Hex color={it.b || "#4f46e5"} t={it.t} lv={it.lv} size={190} /></div>
          <div>
            <h2>{it.t}</h2>
            <p className="para">{it.d} This {f.cat.toLowerCase()} focuses on practical, role-based skills you can use straight away, and the content is refreshed regularly as tools and practices change.</p>
            <p className="para" style={{ marginTop: 14 }}><button className="lnk" onClick={() => go("schedule")}>Schedule an exam</button></p>
          </div>
        </section>
        <section className="ov">
          <div><h2>{exam ? "Exam overview" : "Program overview"}</h2><p className="para">{it.t}</p></div>
          <div className="rows">{ROWS.map(([k, key]) => <div key={k}><h3>{k}</h3><p>{f[key]}</p></div>)}</div>
        </section>
        <section className="ov">
          <div><h2>Prepare for {exam ? "the exam" : "it"}</h2><p className="para">Go from start to certified. Follow our prep plan on Ilmora Skill Builder, our online learning center, so you can approach the day with confidence.</p></div>
          <div className="steps">
            {steps.map(([t, d], i) => <div className="step" key={t}><span className="num">{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}
          </div>
        </section>
        <section className="ov faq">
          <h2>Key FAQs to help you get started</h2>
          <div>{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>
        <section className="ov rel">
          <div className="roundbadge" aria-hidden="true"><span>ilmora</span><strong>Agentic AI</strong><span>Microcredential</span></div>
          <div>
            <h2>Related credentials</h2>
            <p className="para">Show you can solve real problems with cloud technologies. Through timed, hands-on challenges, you demonstrate practical job readiness and build a portfolio of verified skills that complement your certifications.</p>
            <div className="links">{sibs.slice(0, 2).map((x) => <button key={x.t} className="lnk" onClick={() => open(pid, x)}>{x.t}</button>)}</div>
          </div>
        </section>
        <section>
          <h2>Additional resources</h2>
          <div className="grid">
            {more.map(([id, t, d]) => <button key={id} className="bcard plain" onClick={() => go(id)}><h3>{t}</h3><p>{d}</p><span className="foot"><span>→</span></span></button>)}
          </div>
        </section>
      </div>
    </>
  );
}

/* ---------- PAGE ---------- */
export default function IlmoraCertification({ theme, toggleTheme, setShowLoginModal, scrollToSection, signupUrl = "" }) {
  const isDark = theme === "dark";
  const [route, setRoute] = useState({ pid: "home", it: null });
  const go = (pid) => setRoute({ pid, it: null });
  const open = (pid, it) => setRoute({ pid, it });
  useEffect(() => { document.title = "AWS Certification Courses | ILM ORA"; }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [route]);

  return (
    <PublicLayout
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={setShowLoginModal}
      scrollToSection={scrollToSection}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={"il" + (isDark ? " dark" : "")}>
        <SubNav pid={route.pid} go={go} home={route.pid === "home" && !route.it} />
        <main>
          {route.it ? <Detail key={route.it.t} pid={route.pid} it={route.it} go={go} open={open} /> : <Listing pid={route.pid} go={go} open={open} dark={isDark} />}
        </main>
        <Feedback key={route.pid + (route.it ? route.it.t : "")} />
      </div>
    </PublicLayout>
  );
}

/* ---------- STYLES ---------- */
const CSS = `
.il{--ink:#161b26;--mut:#4b5363;--line:#d9dce3;--bg:#fff;font-family:inherit;color:var(--ink);background:var(--bg);overflow-x:clip}
.il *{box-sizing:border-box}
.il button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
.il button:focus-visible,.il a:focus-visible{outline:2px solid #4f46e5;outline-offset:2px}
.il a{color:inherit;text-decoration:none}
.il .dark{background:#161b26!important;color:#fff!important;border-radius:999px;padding:13px 26px;font-weight:600}
.il .ghost{border:2px solid #161b26!important;border-radius:999px;padding:11px 26px;font-weight:600}
.il .subwrap{padding:24px 24px 20px;background:linear-gradient(#fbe3ef,#fdf0f6);position:relative;z-index:5}
.il .subwrap.tohome{background:linear-gradient(#fbe3ef,#F6EDE6)}
.il .subbar{background:#fff;border:1px solid #d9dce3;border-radius:14px;display:flex;align-items:center;gap:24px;padding:8px 24px 8px 40px;flex-wrap:nowrap;width:100%}
.il .subtitle{display:inline-block;font-size:17px;font-weight:600;margin-right:0;min-width:240px;padding:12px 0;white-space:nowrap;text-align:left}
.il .subnav{display:flex;gap:4px;flex-wrap:nowrap}
.il .mi{position:relative}
.il .mi>button,.il .mi>a{display:flex;align-items:center;white-space:nowrap;padding:12px 16px;border-radius:8px;font-size:15px;font-weight:500}
.il .mi>button:hover,.il .mi>button.on,.il .mi>a:hover{background:#e4e5e9}
.il .car{margin-left:10px;transition:transform .15s}
.il .dd{position:absolute;top:calc(100% + 5px);left:0;z-index:20;min-width:280px;background:#fff;border:1px solid #d0d3da;border-radius:8px;padding:20px 18px;margin:0;list-style:none;box-shadow:0 6px 20px rgba(22,27,38,.1)}
.il .dd li{margin:0 0 4px;padding:0;list-style:none}
.il .dd li:last-child{margin-bottom:0}
.il .dd a,.il .dd button{display:block;width:100%;text-align:left;padding:12px 16px;border-radius:8px;font-size:15px;line-height:20px;white-space:nowrap;background:transparent}
.il .dd a:hover,.il .dd button:hover{background:#e4e5e9}
.il .dd a.cur,.il .dd button.cur{background:#161b26;color:#fff}
.il .phero{background:linear-gradient(180deg,#fdf0f6 0%,#f3e7fb 55%,#fff 100%);padding:36px 24px 72px}
.il .inner{max-width:1328px;margin:0 auto}
.il .crumbs{font-size:14px;color:var(--mut);margin-bottom:36px}
.il .crumbs a,.il .crumbs button{text-decoration:underline;color:var(--ink)}
.il .phero h1{font-size:clamp(34px,5vw,52px);line-height:1.1;letter-spacing:-.02em;margin:0 0 18px;font-weight:600}
.il .lead{font-size:20px;line-height:1.5;max-width:560px;margin:0 0 32px}
.il .btns{display:flex;gap:16px;flex-wrap:wrap}
.il .body{padding:56px 24px 72px}
.il .body section{margin-bottom:56px}
.il .body h2{font-size:28px;font-weight:600;margin:0 0 24px;letter-spacing:-.01em}
.il .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:20px}
.il article{border:1px solid var(--line);border-radius:12px;padding:22px}
.il article h3{margin:0 0 8px;font-size:18px;font-weight:600}
.il article p{margin:0;color:var(--mut);line-height:1.55;font-size:15px}
.il .card{display:block;text-align:left;border:1px solid var(--line)!important;border-radius:12px;padding:22px;background:#fff!important}
.il .card:hover{border-color:#4f46e5!important;background:#faf7ff!important}
.il .card h3{margin:0 0 8px;font-size:18px;font-weight:600}
.il .card p{margin:0 0 14px;color:var(--mut);line-height:1.55;font-size:15px}
.il .more-link{font-size:14px;font-weight:600;color:#4f46e5}
.il .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0;border:1px solid var(--line);border-radius:12px;overflow:hidden}
.il .facts div{padding:18px 20px;border-right:1px solid var(--line)}
.il .facts div:last-child{border-right:0}
.il .facts span{display:block;font-size:13px;color:var(--mut);margin-bottom:4px}
.il .facts strong{font-size:16px;font-weight:600}
.il .learn{margin:0;padding-left:22px;line-height:1.9;font-size:17px}
.il .para{max-width:68ch;line-height:1.65;font-size:17px;margin:0}
.il .note{margin:22px 0 0;padding:12px 16px;border-radius:10px;background:#fff;border:1px solid #4f46e5;display:inline-block}
.il .ov{display:grid;grid-template-columns:1fr 1.3fr;gap:48px}
.il .rows h3{font-size:22px;font-weight:600;margin:0 0 6px}
.il .rows p{margin:0 0 26px;color:var(--mut);line-height:1.6}
.il .faq details{border-bottom:1px solid var(--line);padding:18px 0}
.il .faq summary{cursor:pointer;font-weight:600;font-size:18px}
.il .faq details p{margin:12px 0 0;color:var(--mut);line-height:1.65;max-width:70ch}
.il .secsub{margin:-12px 0 26px;color:var(--mut);max-width:70ch}
.il .bcard{display:flex;flex-direction:column;text-align:left;background:#eeeef7!important;border-radius:6px;padding:28px 22px 18px;min-height:300px}
.il .bcard:hover{background:#e3e3f3!important}
.il .bcard svg{margin-bottom:26px}
.il .bcard h3{margin:0 0 8px;font-size:15px;font-weight:700;line-height:1.35}
.il .bcard p{margin:0 0 20px;font-size:13px;color:var(--mut);line-height:1.5}
.il .bcard.plain{min-height:170px;padding-top:22px}
.il .foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:18px}
.il .plus{width:24px;height:24px;border:1px solid #9aa0ad;border-radius:50%;display:grid;place-items:center;font-size:15px;line-height:1}
.il .intro{align-items:center}
.il .badgebox{display:grid;place-items:center}
.il .lnk{color:#4f46e5!important;text-decoration:underline;font-weight:500}
.il .steps .step{display:grid;grid-template-columns:56px 1fr;gap:12px;margin-bottom:34px}
.il .num{font-size:34px;font-weight:600;color:#2f45e0;line-height:1}
.il .step h3{margin:0 0 8px;font-size:20px;font-weight:600}
.il .step p{margin:0;color:var(--mut);line-height:1.6}
.il .faq summary{list-style:none;display:flex;justify-content:space-between;gap:16px}
.il .faq summary::-webkit-details-marker{display:none}
.il .faq summary::after{content:"+";font-size:22px;font-weight:400;line-height:1}
.il .faq details[open] summary::after{content:"−"}
.il .roundbadge{width:210px;height:210px;border-radius:50%;background:radial-gradient(circle at 30% 25%,#c43fe0,#6a1fa8);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:6px solid #3a0f66;margin:auto}
.il .roundbadge strong{font-size:24px;margin:6px 0}
.il .roundbadge span{font-size:12px;opacity:.9}
.il .links{display:flex;flex-direction:column;align-items:flex-start;gap:8px;margin-top:14px}
.il .fb{margin:56px 20px}
.il .fbin{max-width:1280px;margin:0 auto;border-radius:6px;padding:40px 48px;display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap;background:linear-gradient(100deg,#b9f3c6,#8ef0ef 60%,#a9f7e3)}
.il .fbin h3{margin:0 0 6px;font-size:22px;font-weight:600}
.il .fbin p{margin:0;font-size:14px}
.il .fbb{display:flex;gap:14px}
.il .fbb button{background:#161b26;color:#fff;border-radius:999px;padding:12px 44px;font-weight:600}
.il .thanks{font-weight:600}
.il .sform{max-width:560px}
.il .sform label{display:block;font-weight:600;font-size:15px;color:#1E293B;margin:0 0 6px}
.il .sform input,.il .sform select{display:block;width:100%;box-sizing:border-box;margin:0 0 20px;padding:8px 10px;min-height:36px;font:inherit;font-size:15px;color:#1E293B;background:#F6EDE6;border:1px solid #E8D9CC;border-radius:6px}
.il .sform input:focus,.il .sform select:focus{outline:2px solid #F97316;outline-offset:1px;background:#fff}
.il .sform .sbtn,.il .sdone .sbtn{background:#fdba8c;color:#fff;border-radius:6px;padding:12px 20px;font-weight:600;font-size:15px;cursor:not-allowed}
.il .sform .sbtn.on{background:#EA580C;cursor:pointer}
.il .sform .sbtn.on:hover{background:#C2410C}
.il .sform.done{padding:22px;border:1px solid #E8D9CC;border-left:4px solid #F97316;border-radius:10px;background:#F6EDE6}
.il .sform.done h3{margin:0 0 6px;font-size:20px;font-weight:600}
.il .sform.done p{margin:0 0 16px;color:var(--mut);line-height:1.6}
.il .chips{display:flex;flex-wrap:wrap;gap:10px}
.il .chips a{display:inline-block;border:1px solid var(--line);border-radius:999px;padding:10px 18px;font-size:14px}
.il .chips a:hover{background:#f3e7fb}
.il footer{border-top:1px solid var(--line);padding:24px 40px;color:var(--mut);font-size:14px}
@media(max-width:1100px){.il .mi:nth-last-child(-n+2) .dd{left:auto;right:0}}
@media(max-width:1020px){.il .subbar{flex-wrap:wrap}.il .subnav{flex-wrap:wrap}}
@media(max-width:820px){.il .ov{grid-template-columns:1fr;gap:20px}
.il .subbar{padding:10px 16px;gap:8px;flex-wrap:wrap}
.il .subnav{flex-wrap:wrap}
.il .subnav{width:100%}
.il .dd{position:static;margin-top:6px;box-shadow:none}}
@media(prefers-reduced-motion:no-preference){.il .dd{animation:ddin .12s ease-out}
@keyframes ddin{from{opacity:0;transform:translateY(-4px)}}}
.il .dark,.il .ghost{display:inline-block;text-align:center}
.il .crumbs a{text-decoration:underline;color:var(--ink)}
.il .card:focus-visible,.il .bcard:focus-visible{outline:2px solid #4f46e5}



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