"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@/lib/routerCompat";
import PublicLayout from "../Landing/components/PublicLayout";
import { CERTS, LEVELS } from "./awsCertData";

/* ---------- ILM ORA's own content (written for our learners) ---------- */
const WEEKS = {
  Foundational: [
    ["Week 1", "Cloud basics", "Regions, zones, shared responsibility and how AWS bills you."],
    ["Week 2", "Core services", "Compute, storage, databases and networking in plain language."],
    ["Week 3", "Security and cost", "Who can do what, how to protect data and how to keep bills low."],
    ["Week 4", "Mock exams", "Timed practice, review every wrong answer, then book the exam."],
  ],
  Associate: [
    ["Weeks 1-2", "Core services deep dive", "Build each main service by hand in your own AWS account."],
    ["Weeks 3-4", "Design and troubleshoot", "Fix broken setups, compare options, learn why one design beats another."],
    ["Weeks 5-6", "Capstone project", "Ship one complete project that you can show in interviews."],
    ["Weeks 7-8", "Exam drills", "Full-length timed tests and a mentor review of weak topics."],
  ],
  Professional: [
    ["Weeks 1-3", "Multi-account design", "Organizations, shared networking and governance across teams."],
    ["Weeks 4-6", "Scale and automate", "Pipelines, rollbacks, migration and disaster recovery."],
    ["Weeks 7-9", "Case studies", "Long scenario questions: read fast, pick the best trade-off."],
    ["Weeks 10-12", "Exam drills", "Three full practice exams with mentor feedback."],
  ],
  Specialty: [
    ["Weeks 1-3", "Deep theory", "One topic, studied end to end until you can explain it to others."],
    ["Weeks 4-6", "Hands-on labs", "Break it, attack it, fix it. Labs built around real incidents."],
    ["Weeks 7-8", "Scenario practice", "Tricky multi-service questions and how to eliminate wrong options."],
    ["Weeks 9-10", "Exam drills", "Timed mocks, then a final mentor check."],
  ],
};

const PROJECTS = {
  "CLF-C02": ["Host a static website on S3", "Set up IAM users and a budget alarm", "Launch and stop your first EC2 server"],
  "AIF-C01": ["Build a Q&A chatbot with Bedrock", "Tag images automatically with Rekognition", "Score customer reviews with Comprehend"],
  "SAA-C03": ["Three-tier web app behind a load balancer", "Auto-scaling site that survives a server crash", "Whole stack rebuilt from a CloudFormation template"],
  "DVA-C02": ["Serverless to-do API with Lambda and DynamoDB", "Order queue with SQS and SNS alerts", "API Gateway with auth and rate limits"],
  "SOA-C02": ["Dashboards and alarms for a live server", "Patch fleet of servers with Systems Manager", "Backup and restore drill"],
  "DEA-C01": ["Data lake on S3 with Glue crawlers", "Query logs with Athena", "Load a warehouse in Redshift"],
  "MLA-C01": ["Train and deploy a model on SageMaker", "Monitor model drift", "Batch predictions into S3"],
  "SAP-C02": ["Multi-account landing zone", "Hybrid network between office and AWS", "Migrate a legacy app with zero downtime plan"],
  "DOP-C02": ["CI/CD pipeline with blue-green deploys", "Containers on ECS with auto rollback", "Infrastructure as code for three environments"],
  "SCS-C02": ["Lock down an account with least privilege", "Encrypt data with KMS keys", "Detect and respond to a fake attack with GuardDuty"],
  "ANS-C01": ["Transit Gateway across three VPCs", "Private link to on-premise with Direct Connect design", "DNS failover with Route 53"],
  "MLS-C01": ["End-to-end ML pipeline", "Feature engineering at scale", "Tune and compare models"],
};

const FIT = {
  Foundational: "Complete beginners, students and career switchers who want a first proof of cloud knowledge.",
  Associate: "People who want a hands-on cloud job: the level most recruiters ask for.",
  Professional: "Experienced engineers who design for large teams, many accounts and strict uptime.",
  Specialty: "Engineers who want to be the go-to person for one deep topic.",
};

/* ---------- small hook ---------- */
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

/* ---------- 3D orbit: services spin around the exam code ---------- */
function Orbit({ cert }) {
  const [r, setR] = useState({ x: 62, z: 0 });
  const [paused, setPaused] = useState(false);
  const n = cert.tech.length;
  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    setR({ x: 62 - py * 22, z: px * 26 });
  };
  return (
    <div
      className="orbit-stage"
      onPointerMove={move}
      onPointerLeave={() => { setR({ x: 62, z: 0 }); setPaused(false); }}
      onPointerEnter={() => setPaused(true)}
    >
      <div className="o-glow" />
      <div className="o-tilt" style={{ transform: `rotateX(${r.x}deg) rotateZ(${r.z}deg)` }}>
        <div className="o-core">
          <b>{cert.code}</b>
          <span>{cert.level}</span>
        </div>
        <div className="o-ring" style={{ animationPlayState: paused ? "paused" : "running" }}>
          {cert.tech.map((t, i) => (
            <div key={t} className="o-chip" style={{ "--a": `${(360 / n) * i}deg` }}>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="o-hint">Services you will work with orbit the exam. Move your mouse to tilt.</p>
    </div>
  );
}

/* ---------- 3D flip tile for each service ---------- */
function Tile({ t, level, i }) {
  const [on, setOn] = useState(false);
  return (
    <button
      className={"tile" + (on ? " on" : "")}
      style={{ "--i": i }}
      onClick={() => setOn(!on)}
      aria-pressed={on}
    >
      <span className="tile-in">
        <span className="tf a">{t}</span>
        <span className="tf b">You will practise {t} in a real lab, not just read about it.</span>
      </span>
    </button>
  );
}

/* ---------- PAGE ---------- */
export default function IlmoraCertDetail({ theme, toggleTheme, setShowLoginModal, scrollToSection, signupUrl = "" }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  // works with both React Router and Next.js: last URL segment is the exam code
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).pop() || "").toLowerCase();
  const idx = CERTS.findIndex((c) => c.code.toLowerCase() === slug);
  const cert = CERTS[idx];

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);
  useEffect(() => { document.title = cert ? `${cert.name} (${cert.code}) | ILM ORA` : "AWS Certification | ILM ORA"; }, [cert]);

  const [planRef, planSeen] = useReveal();
  const goList = () => navigate("/ilmora-aws-certification");
  const goCert = (c) => navigate(`/ilmora-aws-certification/${c.code.toLowerCase()}`);

  if (!cert) {
    return (
      <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={setShowLoginModal} scrollToSection={scrollToSection}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className={"ild" + (isDark ? " dark" : "")}>
          <section className="final white">
            <h2>We could not find that exam</h2>
            <p>The link may be old. Pick an exam from the full list.</p>
            <button className="btn primary big" onClick={goList}>See all AWS exams</button>
          </section>
        </div>
      </PublicLayout>
    );
  }

  const col = LEVELS[cert.level].color;
  const plan = WEEKS[cert.level];
  const projects = PROJECTS[cert.code] || [];
  const prev = CERTS[(idx - 1 + CERTS.length) % CERTS.length];
  const next = CERTS[(idx + 1) % CERTS.length];

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={setShowLoginModal} scrollToSection={scrollToSection}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={"ild" + (isDark ? " dark" : "")} style={{ "--c": col }}>

        {/* HERO */}
        <section className="hero cream">
          <div className="hero-copy">
            <button className="back" onClick={goList}>&larr; All AWS exams</button>
            <span className="pill">{cert.level} level</span>
            <h1>{cert.name}</h1>
            <p>{FIT[cert.level]}</p>
            <div className="facts">
              <div><b>${cert.fee}</b><span>Exam fee</span></div>
              <div><b>{cert.time}</b><span>Exam time</span></div>
              <div><b>3 yrs</b><span>Valid for</span></div>
              <div><b>{cert.code}</b><span>Exam code</span></div>
            </div>
            <div className="cta-row">
              <button className="btn primary" onClick={() => (signupUrl ? navigate(signupUrl) : setShowLoginModal && setShowLoginModal(true))}>Start this course</button>
              <button className="btn ghost" onClick={() => planRef.current?.scrollIntoView({ behavior: "smooth" })}>See the study plan</button>
            </div>
          </div>
          <Orbit cert={cert} />
        </section>

        {/* WHO + BEFORE */}
        <section className="sec white">
          <h2>Is this exam right for you?</h2>
          <div className="two">
            <div className="panel">
              <h3>Best for</h3>
              <p>{cert.role}</p>
            </div>
            <div className="panel">
              <h3>Before you start</h3>
              <p>{cert.exp}. {cert.elig}.</p>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="sec cream">
          <h2>What you will practise</h2>
          <p className="sub">Tap a block to flip it.</p>
          <div className="tiles">
            {cert.tech.map((t, i) => <Tile key={t} t={t} level={cert.level} i={i} />)}
          </div>
        </section>

        {/* PLAN */}
        <section className="sec white" ref={planRef}>
          <h2>Your study plan</h2>
          <p className="sub">A suggested route. Your mentor adjusts it to your pace.</p>
          <div className={"plan" + (planSeen ? " in" : "")}>
            {plan.map(([when, title, text], i) => (
              <div key={title} className="phase" style={{ "--i": i }}>
                <small>{when}</small>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        {projects.length > 0 && (
          <section className="sec cream">
            <h2>Projects you will build</h2>
            <p className="sub">Each one goes into your portfolio.</p>
            <div className="projects">
              {projects.map((p, i) => (
                <div key={p} className="proj" style={{ "--i": i }}>
                  <span className="proj-n">{i + 1}</span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PREV / NEXT */}
        <section className="sec white">
          <div className="pn">
            <button onClick={() => goCert(prev)}><small>Previous exam</small><strong>{prev.name}</strong></button>
            <button onClick={() => goCert(next)}><small>Next exam</small><strong>{next.name}</strong></button>
          </div>
        </section>

        {/* CTA */}
        <section className="final cream">
          <h2>Ready to pass {cert.code}?</h2>
          <p>Learn with projects, timed tests and mentors who have already passed.</p>
          <button className="btn primary big" onClick={() => (signupUrl ? navigate(signupUrl) : setShowLoginModal && setShowLoginModal(true))}>Get started with ILM ORA</button>
        </section>
      </div>
    </PublicLayout>
  );
}

/* ---------- STYLES (same tokens as the main certification page) ---------- */
const CSS = `
.ild{--cream:#F6EDE6;--white:#ffffff;--card:#ffffff;--tx:#1E293B;--tx2:#334155;--mut:#475569;--or:#F97316;--line:#E5E7EB;--w:1280px;background:var(--white);color:var(--tx);font-family:inherit;overflow-x:hidden;line-height:1.625}
.ild *{box-sizing:border-box;font-family:inherit}
.ild h1,.ild h2,.ild h3{margin:0}
.ild button{font-family:inherit;cursor:pointer}
.ild :focus-visible{outline:2px solid var(--or);outline-offset:3px}
.ild .cream{background:var(--cream)}
.ild .white{background:var(--white)}
.ild .hero,.ild .sec,.ild .final{padding-left:max(20px,calc((100% - var(--w))/2));padding-right:max(20px,calc((100% - var(--w))/2))}
.ild .hero{display:grid;grid-template-columns:1.05fr 1fr;gap:32px;align-items:center;padding-top:clamp(32px,6vw,64px);padding-bottom:clamp(32px,5vw,56px)}
.ild .back{background:none;border:0;color:var(--mut);font-size:14px;font-weight:500;padding:0;margin-bottom:18px}
.ild .back:hover{color:var(--or)}
.ild .pill{display:inline-flex;padding:6px 16px;border:1px solid var(--c);color:var(--c);background:var(--card);border-radius:9999px;font-size:13px;font-weight:600;margin-left:10px}
.ild .hero h1{font-size:clamp(30px,5vw,54px);line-height:1.1;font-weight:600;letter-spacing:-.025em;margin:16px 0}
.ild .hero p{color:var(--mut);font-size:clamp(16px,1.6vw,18px);max-width:520px;margin:0}
.ild .facts{display:grid;grid-template-columns:repeat(4,auto);gap:22px;margin-top:24px;justify-content:start}
.ild .facts b{display:block;font-size:20px;color:var(--c);font-weight:700}
.ild .facts span{font-size:13px;color:var(--mut)}
.ild .cta-row{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap}
.ild .btn{padding:14px 24px;border-radius:12px;font-weight:600;font-size:16px;border:1px solid transparent;transition:all .3s}
.ild .btn:hover{transform:scale(1.05)}
.ild .btn.primary{background:#EA580C;color:#fff}
.ild .btn.primary:hover{background:#C2410C}
.ild .btn.ghost{background:#1E293B;color:#fff}
.ild .btn.big{padding:16px 32px}

/* 3D orbit */
.ild .orbit-stage{position:relative;height:clamp(320px,50vw,470px);perspective:1100px;display:flex;align-items:center;justify-content:center;touch-action:pan-y}
.ild .o-glow{position:absolute;width:min(360px,80%);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--c) 30%,transparent),transparent 70%);filter:blur(22px)}
.ild .o-tilt{position:relative;width:0;height:0;transform-style:preserve-3d;transition:transform .25s ease-out}
.ild .o-core{position:absolute;left:-70px;top:-70px;width:140px;height:140px;border-radius:26px;background:linear-gradient(135deg,color-mix(in srgb,var(--c) 40%,var(--card)),var(--card));border:2px solid var(--c);box-shadow:0 0 50px color-mix(in srgb,var(--c) 45%,transparent);display:flex;flex-direction:column;align-items:center;justify-content:center;transform:translateZ(20px);text-align:center}
.ild .o-core b{font-size:20px;color:var(--tx)}
.ild .o-core span{font-size:12px;color:var(--mut)}
.ild .o-ring{position:absolute;left:0;top:0;transform-style:preserve-3d;animation:ild-spin 22s linear infinite}
.ild .o-chip{position:absolute;left:-44px;top:-18px;width:88px;transform-style:preserve-3d;transform:rotateZ(var(--a)) translateY(calc(-1 * clamp(110px,22vw,170px)))}
.ild .o-chip span{display:block;text-align:center;font-size:12px;font-weight:600;padding:8px 6px;border-radius:10px;background:var(--card);color:var(--tx);border:1px solid var(--c);box-shadow:0 6px 16px color-mix(in srgb,var(--c) 25%,transparent);animation:ild-counter 22s linear infinite}
@keyframes ild-spin{to{transform:rotateZ(360deg)}}
@keyframes ild-counter{to{transform:rotateZ(-360deg)}}
.ild .o-hint{position:absolute;bottom:0;margin:0;font-size:13px;color:var(--mut);text-align:center}

/* sections */
.ild .sec{padding-top:clamp(32px,4vw,48px);padding-bottom:clamp(32px,4vw,48px)}
.ild .sec h2,.ild .final h2{font-size:clamp(24px,3.6vw,34px);font-weight:600;letter-spacing:-.025em;line-height:1.25}
.ild .sub{color:var(--mut);max-width:640px;margin:10px 0 28px;font-size:clamp(15px,1.5vw,17px)}
.ild .two{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px;perspective:1000px}
.ild .panel{background:var(--cream);border-left:4px solid var(--c);border-radius:14px;padding:22px;transition:transform .3s}
.ild .panel:hover{transform:rotateX(4deg) translateY(-4px)}
.ild .panel h3{font-size:14px;color:var(--c);margin-bottom:6px}
.ild .panel p{margin:0;color:var(--tx2)}

/* flip tiles */
.ild .tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:18px;perspective:1000px}
.ild .tile{all:unset;cursor:pointer;display:block;height:120px}
.ild .tile:focus-visible{outline:2px solid var(--or);outline-offset:3px;border-radius:14px}
.ild .tile-in{display:block;position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .7s cubic-bezier(.3,.8,.2,1)}
.ild .tile.on .tile-in{transform:rotateY(180deg)}
@media(hover:hover){.ild .tile:hover .tile-in{transform:rotateY(180deg)}}
.ild .tf{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;border-radius:14px;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.ild .tf.a{background:var(--card);border:1px solid var(--c);font-weight:700;font-size:18px;color:var(--tx);box-shadow:8px 8px 0 color-mix(in srgb,var(--c) 22%,transparent)}
.ild .tf.b{transform:rotateY(180deg);background:var(--c);color:#fff;font-size:13px;font-weight:500}

/* plan */
.ild .plan{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;perspective:1200px}
.ild .phase{padding:20px;border-radius:14px;border-top:4px solid var(--c);background:var(--cream);opacity:0;transform:rotateX(28deg) translateY(40px);transition:opacity .7s,transform .7s cubic-bezier(.2,.8,.2,1);transition-delay:calc(var(--i)*.14s)}
.ild .plan.in .phase{opacity:1;transform:none}
.ild .phase small{color:var(--c);font-weight:700}
.ild .phase strong{display:block;font-size:18px;margin:2px 0 6px}
.ild .phase p{margin:0;font-size:14px;color:var(--mut)}

/* projects */
.ild .projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;perspective:1000px}
.ild .proj{display:flex;gap:14px;align-items:flex-start;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px;transition:transform .3s,box-shadow .3s}
.ild .proj:hover{transform:translateY(-6px) rotateX(5deg);box-shadow:0 14px 28px color-mix(in srgb,var(--c) 25%,transparent)}
.ild .proj-n{flex:0 0 32px;height:32px;border-radius:50%;background:var(--c);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700}
.ild .proj p{margin:0;font-weight:500}

/* prev next */
.ild .pn{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.ild .pn button{all:unset;cursor:pointer;display:block;padding:20px;border:1px solid var(--line);border-radius:14px;background:var(--cream);transition:transform .3s,border-color .3s}
.ild .pn button:hover{transform:translateY(-4px);border-color:var(--c)}
.ild .pn button:focus-visible{outline:2px solid var(--or);outline-offset:3px}
.ild .pn small{display:block;color:var(--mut);font-size:13px}
.ild .pn strong{font-size:18px}
.ild .pn button:last-child{text-align:right}
.ild .final{text-align:center;padding-top:clamp(56px,8vw,90px);padding-bottom:clamp(56px,8vw,90px)}
.ild .final h2{font-size:clamp(24px,3.6vw,36px)}
.ild .final p{color:var(--mut);margin:12px 0 28px;font-size:clamp(16px,1.6vw,18px)}

@media(max-width:900px){
.ild .hero{grid-template-columns:1fr}
.ild .plan{grid-template-columns:repeat(2,1fr)}
.ild .two,.ild .pn{grid-template-columns:1fr}}
@media(max-width:560px){
.ild .facts{grid-template-columns:repeat(2,auto)}
.ild .plan{grid-template-columns:1fr}
.ild .btn{flex:1 1 100%;text-align:center}
.ild .pill{margin-left:0;margin-top:8px}}
@media(prefers-reduced-motion:reduce){.ild *{animation:none!important;transition-duration:.01ms!important;transition-delay:0s!important}}
.ild.dark{--cream:#000000;--white:#0F172A;--card:#111827;--tx:#ffffff;--tx2:#CBD5E1;--mut:#CBD5E1;--line:#1F2937}
`;