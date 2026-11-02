"use client";
/* eslint-disable @next/next/no-img-element */

/* ─────────────────────────────────────────────────────────────────────
   Digital Marketing Hub  (ILM ORA)
   Ported 1:1 from digital-marketing-hub.html  →  Next.js / React

   • Navbar + Footer + login popups come from PublicLayout (no own header/footer)
   • Hash routing (#module-3, #lesson-1-1, #task-5, #assessment …) works the same
     as the HTML file, so all existing links keep working.
   • Progress / quiz best score / leads are saved in localStorage ("ilmora" key,
     same as the HTML version).
   • Every image + video uses ONE frame size (16:9, see .media in the CSS).
───────────────────────────────────────────────────────────────────── */
import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
} from "react";
import PublicLayout from "./components/PublicLayout";
import "./DigitalMarketingHub.css";
import {
  AI2, ALT, DD, DI, DI2, DM, FAQ, FS, GL, GLS, IC, L, LC, LK, LS, M, MI, OV,
  PG, QD, QS, R, RM, RT, ST, SUB, TD,
} from "./DigitalMarketingHubData";
import { IMG, VIDEOS } from "./DigitalMarketingHubAssets";

/* ═════════════════ storage (same key as the HTML version) ═════════════════ */
const E0 = { done: {}, best: 0, sub: {}, bm: {}, name: "", ls: {}, lead: null };
const KEY = "ilmora";
const readStore = () => {
  try { return { ...E0, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return { ...E0 }; }
};
const StoreCtx = createContext({ s: E0, update: () => {} });
const useStore = () => useContext(StoreCtx);

function StoreProvider({ children }) {
  const [s, setS] = useState(E0);
  useEffect(() => { setS(readStore()); }, []);
  const update = useCallback((fn) => {
    setS((prev) => {
      const next = fn(prev);
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode */ }
      return next;
    });
  }, []);
  return <StoreCtx.Provider value={{ s, update }}>{children}</StoreCtx.Provider>;
}

/* ═════════════════ small helpers ═════════════════ */
const pad2 = (n) => String(n).padStart(2, "0");
const sn = (n) => M[n - 1][0].replace(/ \(.*\)/, "").split(" & ")[0].split(",")[0];
const fullName = (n) => M[n - 1][0].replace(/ \(.*\)/, "");
const dn = (n) => DM.find((d) => d[4].includes(n))[1];
const elig = (s) => Object.keys(s.done).length === 21 && s.best >= 70;
const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;

function useHash() {
  const [h, setH] = useState("home");
  useEffect(() => {
    const f = () => setH((window.location.hash || "#home").slice(1) || "home");
    f();
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  return h;
}

/* measures the REAL navbar so the section bar sits flush under it (no gap),
   and lets the hub use the full page width */
function useLayoutFit(ref, dep) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const measure = () => {
      let fixedBottom = 0; let topBottom = null;
      document.querySelectorAll("header, nav, [class*='navbar' i], [class*='header' i]").forEach((el) => {
        if (root.contains(el) || el.contains(root)) return;
        const r = el.getBoundingClientRect();
        if (!r.height || r.width < window.innerWidth * 0.5) return;
        const pos = getComputedStyle(el).position;
        const atTop = r.top <= 2 && r.top > -2;
        if ((pos === "fixed" || pos === "sticky") && atTop) fixedBottom = Math.max(fixedBottom, r.bottom);
        if (atTop && r.bottom < 220) topBottom = Math.max(topBottom ?? 0, r.bottom);
      });
      root.style.setProperty("--nav-h", `${Math.round(fixedBottom)}px`);
      root.style.setProperty("--sbw", `${Math.max(0, window.innerWidth - document.documentElement.clientWidth)}px`);
      const bar = root.querySelector(".subbar");
      if (bar && window.scrollY < 2 && topBottom != null) {
        root.style.setProperty("--pull", "0px");
        const gap = bar.getBoundingClientRect().top - topBottom;
        root.style.setProperty("--pull", `${gap > 0 ? Math.round(gap) : 0}px`);
      }
    };
    measure();
    const ts = [60, 300, 900, 2000].map((ms) => setTimeout(measure, ms));
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    document.querySelectorAll("header, nav").forEach((el) => { if (!root.contains(el)) ro?.observe(el); });
    return () => { ts.forEach(clearTimeout); window.removeEventListener("resize", measure); window.removeEventListener("load", measure); ro?.disconnect(); };
  }, [ref, dep]);
}

function useCountUp(v, ms = 1500) {
  const [n, setN] = useState(reduced() ? v : 0);
  useEffect(() => {
    if (reduced()) { setN(v); return undefined; }
    let raf; const t0 = performance.now();
    const f = (t) => {
      const k = Math.min((t - t0) / ms, 1);
      setN(Math.round(v * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [v, ms]);
  return n;
}

/* ═════════════════ shared UI pieces ═════════════════ */
/* <img> that quietly tries .jpg / .png / .jpeg / .webp if the first path 404s */
const EXT = ["jpg", "png", "jpeg", "webp"];
function Img({ n, alt }) {
  const base = IMG["i" + n];
  const [src, setSrc] = useState(base);
  const tries = useRef(0);
  useEffect(() => { setSrc(base); tries.current = 0; }, [base]);
  const onError = () => {
    if (!base) return;
    const stem = base.replace(/\.[a-z0-9]+$/i, "");
    const others = EXT.map((e) => `${stem}.${e}`).filter((u) => u !== base);
    const next = others[tries.current++];
    if (next) setSrc(next);
  };
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={onError} />;
}

function Fig({ n, cap, contain }) {
  return (
    <figure className="fig">
      <div className={`media${contain || n === 12 ? " contain" : ""}`}>
        <Img n={n} alt={ALT[n]} />
      </div>
      {cap && <figcaption>{cap}</figcaption>}
    </figure>
  );
}

/* page header: title + lead on the left, ONE uniform image on the right */
function PageHead({ t, d, img, cap, tag, small, children }) {
  return (
    <div className="sh">
      <div>
        {tag}
        {small ? <h1 style={{ fontSize: "clamp(24px,3.6vw,42px)" }}>{t}</h1> : <h1>{t}</h1>}
        {d && <p className="lead">{d}</p>}
        {children}
      </div>
      {img ? <Fig n={img} cap={cap} /> : null}
    </div>
  );
}

function Section({ id, t, l, k, img, cap, children }) {
  return (
    <section id={`s-${id}`} className="sec">
      <div className="sh">
        <div>
          <h2>{t}</h2>
          <p className="lead">{l}</p>
          {k && <div className="acts"><a className="btn o" href={`#${k}`}>Open full page</a></div>}
        </div>
        {img ? <Fig n={img} cap={cap} /> : null}
      </div>
      {children}
    </section>
  );
}

const Chip = ({ n, c, short }) => (
  <a href={`#module-${n}`} className="chip" style={{ borderColor: c || LC[M[n - 1][1]] }}>
    {n}. {short ? sn(n) : fullName(n)}
  </a>
);

const Ico = ({ k, c }) => (
  <span className="ib" style={{ background: c }}>
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: IC[k] }} />
  </span>
);

const Marquee = ({ children, rv, dur }) => (
  <div className={`mq${rv ? " rv" : ""}`}>
    <div className="mt" style={dur ? { "--dur": dur } : undefined}>{children}{children}</div>
  </div>
);

const TableWrap = ({ children }) => <div className="tw"><table>{children}</table></div>;

/* ═════════════════ content blocks ═════════════════ */
function Explainer() {
  return (
    <section className="sec">
      <h2>What is digital marketing?</h2>
      <p className="lead">Digital marketing is promoting a business through online channels so the right people find it, trust it, buy from it and come back. It works best when three kinds of media work together.</p>
      <div className="cg w3 m1" style={{ marginTop: 14 }}>
        {[["Owned media", "#2f9e44", "Assets you control: your website, blog, email list and social profiles.", "A bakery's website and newsletter."],
          ["Earned media", "#e8590c", "Attention others give you: reviews, shares, mentions and press.", "A customer tagging your shop in a photo."],
          ["Paid media", "#1c7ed6", "Space you pay for: search ads, social ads, sponsored creators and display.", "A Google ad for birthday cakes."]].map((x) => (
          <div key={x[0]} className="card top5" style={{ "--c": x[1] }}>
            <h3>{x[0]}</h3><p>{x[2]}</p><p><b>Example:</b> {x[3]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="sec">
      <h2>Product vision</h2>
      <div className="card left5" style={{ marginTop: 10 }}>
        <h3>One place to learn digital marketing, practise it, and prove it on a real business.</h3>
        <p>ILM ORA takes a learner from zero knowledge to a portfolio of audits, plans and reports. Every module ends in a deliverable, and INNOVORA is the real-world case that ties all 21 modules together.</p>
      </div>
      <div className="cg w3 m1" style={{ marginTop: 12 }}>
        {[["cap", "#2f9e44", "Learn", "Short lessons with objectives, key terms, examples and common mistakes. The first two lessons of every module are free."],
          ["pen", "#e8590c", "Practise", "A guided practical, assignment and quiz in every module, with templates and checklists to work from."],
          ["chart", "#1c7ed6", "Prove", "Finish with a portfolio, an assessment score and a capstone presentation you can show employers or clients."]].map((x) => (
          <div key={x[2]} className="card"><Ico k={x[0]} c={x[1]} /><h3 style={{ marginTop: 10 }}>{x[2]}</h3><p>{x[3]}</p></div>
        ))}
      </div>
      <p style={{ marginTop: 10 }}><b>Business segments covered:</b> local business, B2B services, e-commerce, apps and mobile, education and personal brands.</p>
    </section>
  );
}

function Hero() {
  const mods = [2, 3, 6, 8, 5, 9, 11, 17];
  return (
    <div id="s-home" className="sec">
      <section className="hero">
        <div>
          <h1>Learn digital marketing from <span className="g">first click to final campaign</span></h1>
          <p className="lead">21 modules in 7 domains, guided practicals, quizzes and a real-world INNOVORA project, in one structured journey. Start with the free lessons, check your level with the assessment, and build a portfolio as you go.</p>
          <div className="acts">
            <a className="btn" href="#lesson-1-1">Start free lesson</a>
            <a className="btn o" href="#assessment">Check my level</a>
          </div>
          <div className="stats">
            {[["21", "Marketing modules"], ["7", "Domains"], ["84", "Lessons planned"], ["1", "Real project"]].map((x) => (
              <div key={x[1]} className="stat"><b>{x[0]}</b><small>{x[1]}</small></div>
            ))}
          </div>
        </div>
        <div className="vis">
          <div className="orb">
            <b>Customer</b>
            {["Website", "Search", "Social", "Content", "Paid media", "Email", "Analytics", "CRM"].map((x, i) => (
              <a key={x} href={`#module-${mods[i]}`} style={{ "--a": `${i * 45}deg` }} title={`Open Module ${mods[i]}`}>{x}</a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DomainsStrip() {
  return (
    <Marquee>
      {DM.map((d, i) => (
        <div key={d[1]} className="mc" style={{ "--c": d[3] }}>
          <Ico k={DI[i]} c={d[3]} />
          <h3>{d[1]}</h3><p>{DD[i][0]}</p>
          <small className="k">You produce</small><p style={{ marginTop: 2 }}>{DD[i][1]}</p>
          <small className="k">{d[4].length} modules</small>
          {d[4].map((n) => <Chip key={n} n={n} c={d[3]} short />)}
        </div>
      ))}
    </Marquee>
  );
}

function AudienceStrip() {
  return (
    <Marquee rv>
      {AI2.map((a) => (
        <div key={a[1]} className="mc" style={{ "--c": a[6] }}>
          <Ico k={a[0]} c={a[6]} />
          <h3>{a[1]}</h3><p><b>{a[2]}</b></p><p>{a[3]}</p>
          <small className="k">Start with</small>
          {a[4].map((n) => <Chip key={n} n={n} c={a[6]} short />)}
          <small className="k">Roles</small><p style={{ marginTop: 2 }}>{a[5]}</p>
        </div>
      ))}
    </Marquee>
  );
}

function Funnel() {
  const lay = FS.map((f, i) => {
    const y = i * 95, a = 210 - f[5] / 2, b = 210 + f[5] / 2, c = 210 - f[6] / 2, d = 210 + f[6] / 2;
    return (
      <g key={f[0]}>
        <polygon points={`${a},${y} ${b},${y} ${d},${y + 90} ${c},${y + 90}`} fill={f[4]} />
        <text x="210" y={y + 46} fill="#fff" fontSize="18" fontWeight="700" textAnchor="middle" fontFamily="Space Grotesk">{f[0]}</text>
        <text x="210" y={y + 66} fill="#fff" fillOpacity=".85" fontSize="12" textAnchor="middle">{f[3].length} modules</text>
      </g>
    );
  });
  return (
    <div id="s-fun" style={{ marginTop: "clamp(26px,4vw,40px)" }}>
      <h2>How the funnel maps to modules</h2>
      <p>Watch visitors flow down the funnel. Every stage has its own modules.</p>
      <div className="fw">
        <svg viewBox="0 0 420 380" role="img" aria-label="Marketing funnel">
          {lay}
          {[...Array(10)].map((_, i) => (
            <circle key={i} r="4" fill="#fff" fillOpacity=".9">
              <animateMotion dur={`${3.4 + (i % 3) * 0.7}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" path={`M${165 + i * 10} -4 L210 376`} />
            </circle>
          ))}
        </svg>
        <div>
          {FS.map((f) => (
            <div key={f[0]} className="fs" style={{ "--c": f[4] }}>
              <h3>{f[0]}: {f[1]}</h3><p>{f[2]}</p>
              {f[3].map((n) => <Chip key={n} n={n} c={f[4]} short />)}
            </div>
          ))}
          <div className="fs" style={{ "--c": "#5f3dc4" }}>
            <h3>Under every stage</h3><p>Planned by Modules 1 and 21, measured by Analytics (11) and AI (13).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const JC = ["#2f9e44", "#0c8599", "#1c7ed6", "#e8590c", "#ae3ec9", "#5f3dc4", "#12183a"];
function Journey() {
  return (
    <>
      <div className="lg">{Object.keys(LC).map((k) => <span key={k}><i style={{ background: LC[k] }} />{k}</span>)}</div>
      <Marquee dur="65s">
        {ST.map((st, k) => (
          <div key={st[0]} className="mc jc" style={{ "--c": JC[k % JC.length] }}>
            <span className="num" style={{ background: JC[k % JC.length] }}>{k + 1}</span>
            <h3>{st[0]}</h3><p>{st[1]}</p>
            {M.map((m, i) => (m[6] === st[0] ? <Chip key={i} n={i + 1} /> : null))}
          </div>
        ))}
      </Marquee>
    </>
  );
}

function How() {
  return (
    <div style={{ marginTop: "clamp(22px,3.5vw,36px)" }}>
      <h2>How every module works</h2>
      <p>The same five steps in all 21 modules.</p>
      <div className="steps" style={{ marginTop: 12 }}>
        {[["Lesson", "Four short lessons. Lessons 1 and 2 are free."], ["Practical", "A guided task with a clear output."], ["Assignment", "Submit a link or text and save it."], ["Quiz", "Check yourself and get instant feedback."], ["Complete", "The module is marked done on your progress page."]].map((x, i) => (
          <div key={x[0]} className="card"><b className="no">{i + 1}</b><h3>{x[0]}</h3><p>{x[1]}</p></div>
        ))}
      </div>
    </div>
  );
}

const ModuleCards = ({ list }) => (
  <div className="cg clamp">
    {list.map(({ m, i }) => (
      <a key={i} className="card" href={`#module-${i + 1}`}>
        <span className="tag" style={{ background: `${LC[m[1]]}22`, color: LC[m[1]], alignSelf: "flex-start" }}>{pad2(i + 1)} · {m[1]} · {dn(i + 1)}</span>
        <h3>{m[0]}</h3><p>{m[2]}</p>
        <p><b>Practical:</b> {m[4]}</p><p><b>Output:</b> {m[5]}</p>
      </a>
    ))}
  </div>
);
const allMods = M.map((m, i) => ({ m, i }));

function Curriculum({ page }) {
  const [q, setQ] = useState(""); const [lv, setLv] = useState("");
  const list = allMods.filter(({ m }) => (!lv || m[1] === lv) && (m[0] + m[2]).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      {page && (
        <div className="bar">
          <input aria-label="Search modules" placeholder="Search modules, e.g. SEO, email, CRM" value={q} onChange={(e) => setQ(e.target.value)} />
          <select aria-label="Level" value={lv} onChange={(e) => setLv(e.target.value)}>
            <option value="">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
          </select>
        </div>
      )}
      {list.length ? <ModuleCards list={page ? list : allMods} /> : <p>No module matches. Clear the search to see all 21.</p>}
    </>
  );
}

function RoadmapGrid() {
  return (
    <div className="cg free w3 m1">
      {ST.map((t, k) => (
        <div key={t[0]} className="card top5" style={{ "--c": "var(--or)" }}>
          <span className="tag" style={{ alignSelf: "flex-start" }}>Stage {k + 1}</span><h3>{t[0]}</h3><p>{t[1]}</p>
          <div>{M.map((m, i) => (m[6] === t[0] ? <Chip key={i} n={i + 1} c="#f26a1b" short /> : null))}</div>
        </div>
      ))}
    </div>
  );
}

function LabCards({ list }) {
  return (
    <div className="cg clamp">
      {list.map(({ m, i }) => (
        <a key={i} className="card" href={`#task-${i + 1}`}>
          <span className="tag s" style={{ alignSelf: "flex-start" }}>Module {i + 1} · {m[1]}</span>
          <h3>{m[4]}</h3><p><b>Output:</b> {m[5]}</p>
        </a>
      ))}
    </div>
  );
}

function LabFilter() {
  const [q, setQ] = useState(""); const [l, setL] = useState(""); const [st, setSt] = useState("");
  const list = allMods.filter(({ m }) => (!l || m[1] === l) && (!st || m[6] === st) && (m[0] + m[4]).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="bar">
        <input aria-label="Search tasks" placeholder="Search tasks" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="Difficulty" value={l} onChange={(e) => setL(e.target.value)}>
          <option value="">All difficulty</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option>
        </select>
        <select aria-label="Stage" value={st} onChange={(e) => setSt(e.target.value)}>
          <option value="">All stages</option>{ST.map((s) => <option key={s[0]}>{s[0]}</option>)}
        </select>
      </div>
      {list.length ? <LabCards list={list} /> : <p>No task matches. Clear the filters.</p>}
    </>
  );
}

const WEIGHTS = [["Module quizzes", "20%"], ["Practical assignments", "25%"], ["Module / campaign projects", "25%"], ["Final assessment", "20%"], ["INNOVORA capstone", "10%"]];
const WeightsTable = ({ title = "Course assessment (proposed)" }) => (
  <TableWrap>
    <thead><tr><th>{title}</th><th>Weight</th></tr></thead>
    <tbody>{WEIGHTS.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody>
  </TableWrap>
);

function ToolCards({ q = "", c = "" }) {
  const list = TD.filter((t) => (!c || t[0] === c) && (t[0] + t[1] + t[2]).toLowerCase().includes(q.toLowerCase()));
  if (!list.length) return <p>No tool matches.</p>;
  return (
    <div className="cg free w3 m1">
      {list.map((t) => (
        <div key={t[0]} className="card top5" style={{ "--c": t[4] }}>
          <span className="tag b" style={{ alignSelf: "flex-start" }}>{t[0]}</span><p>{t[1]}</p>
          <ul>
            {t[2].split(", ").map((x, k) => {
              const u = (LK.find((kk) => x.toLowerCase().includes(kk[0])) || [])[1];
              return <li key={x}>{u ? <a href={u} target="_blank" rel="noopener noreferrer" style={{ color: "var(--or)", fontWeight: 600 }}>{x}</a> : x} <span className="bd">{k ? "Optional" : "Core"}</span></li>;
            })}
          </ul>
          <p><b>Used in:</b></p>
          <div>{t[3].map((n) => <Chip key={n} n={n} c={t[4]} short />)}</div>
        </div>
      ))}
    </div>
  );
}

function ToolsFilter() {
  const [q, setQ] = useState(""); const [c, setC] = useState("");
  return (
    <>
      <div className="bar">
        <input aria-label="Search tools" placeholder="Search tools" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="Category" value={c} onChange={(e) => setC(e.target.value)}>
          <option value="">All categories</option>{TD.map((t) => <option key={t[0]}>{t[0]}</option>)}
        </select>
      </div>
      <ToolCards q={q} c={c} />
    </>
  );
}

function downloadTemplate(i) {
  const n = RM[i], m = M[n - 1];
  const t = `ILM ORA Digital Marketing Hub\n${R[i]} (${RT[i]}) v1.0\nModule ${n}: ${m[0]} · ${m[1]}\n\nHow to use: fill each section for your sample business. Label simulated data as simulated.\n\n1. Business and goal:\n2. Audience:\n${m[3].map((x, k) => `${k + 3}. ${x}:`).join("\n")}\n\nExpected output: ${m[5]}\nPractical: ${m[4]}\n`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([t], { type: "text/plain" }));
  a.download = `ILMORA_M${pad2(n)}_${R[i].toLowerCase().replace(/[^a-z0-9]+/g, "-")}_v1.0.txt`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function ResourceCards({ withFilter }) {
  const [m, setM] = useState(0); const [t, setT] = useState("");
  const list = R.map((r, i) => i).filter((i) => (!m || RM[i] === m) && (!t || RT[i] === t));
  return (
    <>
      {withFilter && (
        <div className="bar">
          <select aria-label="Module" value={m} onChange={(e) => setM(+e.target.value)}>
            <option value={0}>All modules</option>{[...new Set(RM)].map((n) => <option key={n} value={n}>Module {n}</option>)}
          </select>
          <select aria-label="Type" value={t} onChange={(e) => setT(e.target.value)}>
            <option value="">All types</option>{[...new Set(RT)].map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
      )}
      {list.length ? (
        <div className="cg">
          {list.map((i) => (
            <div key={i} className="card">
              <span className="tag s" style={{ alignSelf: "flex-start" }}>{RT[i]} · v1.0 · .txt</span>
              <h3>{R[i]}</h3><p>Module {RM[i]} · {M[RM[i] - 1][1]}</p>
              <div style={{ marginTop: "auto", paddingTop: 8 }}><button type="button" className="btn o" onClick={() => downloadTemplate(i)}>Download</button></div>
            </div>
          ))}
        </div>
      ) : <p>No resource matches.</p>}
    </>
  );
}

function InnovoraShot() {
  return (
    <div className="card shot">
      <div className="media contain"><img src={IMG.i12} alt={ALT[12]} loading="lazy" decoding="async" /></div>
      <div>
        <span className="tag b">Live platform · screenshot provided</span>
        <p>The INNOVORA home screen as supplied by the project team. It shows the Dashboard, AI Image, Design, AI Site, Product and Plans menus, and quick starts for templates, YouTube, Instagram and Facebook posts, presentations and logos. Confirm publishing approval before launch.</p>
      </div>
    </div>
  );
}
const INN = [["Project introduction", "Business, industry, problem and objectives."], ["Live website / demo", "Official URL, screenshots, user journeys."], ["Brand & audience", "Positioning, personas, messaging."], ["Website, SEO & AEO/GEO", "Pages, keyword map, audit."], ["Content & social", "Samples, pillars, calendar."], ["Paid campaigns & PPC", "Only with approved evidence."], ["Lead / e-commerce journey", "Forms, CTAs, conversion points."], ["Email, CRM & automation", "Lifecycle and nurture flow."], ["Analytics & performance", "Approved metrics only."], ["Challenges & learnings", "Decisions and outcomes."], ["Student case study", "Brief, rubric, presentation."]];
function InnovoraBody() {
  const card = (i) => (
    <div key={INN[i][0]} className="mc ic" style={{ "--c": DM[i % DM.length][3] }}>
      <span className="tag s">{"ABCDEFGHIJK"[i]} · Pending approval</span>
      <h3>{INN[i][0]}</h3><p>{INN[i][1]}</p><p><i>Metrics: not provided</i></p>
    </div>
  );
  const idx = INN.map((_, i) => i);
  return (
    <>
      <InnovoraShot />
      <Marquee dur="55s">{idx.slice(0, 6).map(card)}</Marquee>
      <Marquee rv dur="50s">{idx.slice(6).map(card)}</Marquee>
    </>
  );
}

function CareerBody() {
  return (
    <div className="cg free w3 m1">
      <div className="card"><h3>Portfolio you build</h3><ul><li>SEO audit</li><li>Campaign brief</li><li>Content calendar</li><li>Ad plan</li><li>Analytics report</li><li>INNOVORA case study</li></ul></div>
      <div className="card"><h3>Roles you can aim for</h3><ul><li>SEO executive</li><li>Performance marketer</li><li>Social media executive</li><li>Content marketer</li><li>Marketing analyst</li><li>CRM associate</li><li>E-commerce marketer</li></ul></div>
      <div className="card"><h3>Career support</h3><ul><li>Resume and LinkedIn guidance</li><li>Interview questions</li><li>Project presentation tips</li><li>Certificate eligibility checklist</li></ul></div>
    </div>
  );
}

function FaqBody() {
  return <div>{FAQ.map((f) => <details key={f[0]}><summary>{f[0]}</summary><p>{f[1]}</p></details>)}</div>;
}

function Mentors() {
  return (
    <div className="cg w3 m1">
      {["Lead trainer", "Practical mentor", "Analytics mentor"].map((r) => (
        <div key={r} className="card">
          <span className="tag s" style={{ alignSelf: "flex-start" }}>Pending approval</span><h3>{r}</h3>
          <p>Name, bio and credentials to be supplied by the Training lead.</p>
          <p><small>Guides learners, reviews assignments and gives rubric-based feedback.</small></p>
        </div>
      ))}
    </div>
  );
}

/* ── video player: ONE 16:9 frame, loads only when scrolled near ── */
function VideoCard({ v }) {
  const box = useRef(null); const [near, setNear] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") { setNear(true); return undefined; }
    const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const onPlay = (e) => document.querySelectorAll(".dmh video").forEach((x) => { if (x !== e.currentTarget) x.pause(); });
  return (
    <figure className="vc" ref={box}>
      <div className="media">
        {near && <video src={`${v.src}#t=0.1`} controls playsInline preload="metadata" controlsList="nodownload" onPlay={onPlay} aria-label={v.title} />}
      </div>
      <figcaption><b>{v.title}</b><small>{v.desc}</small></figcaption>
    </figure>
  );
}
const VideoGrid = () => <div className="vgrid">{VIDEOS.map((v) => <VideoCard key={v.title} v={v} />)}</div>;

function Gallery() {
  return (
    <div className="gal">
      {GL.map((g) => (
        <a key={g[0]} href={`#module-${g[3]}`}>
          <div className="media"><Img n={g[0]} alt={g[1]} /></div>
          <span><b>{g[1]}</b><small>{g[2]} · Module {g[3]}</small></span>
        </a>
      ))}
    </div>
  );
}

/* ═════════════════ contact / unlock form ═════════════════ */
function ContactForm() {
  const { s, update } = useStore();
  const [f, setF] = useState({ n: "", m: "", p: "", k: "", d: "", t: "", c: false });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF((o) => ({ ...o, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  if (s.lead) {
    return (
      <div className="card" style={{ maxWidth: 640, textAlign: "center", padding: "clamp(20px,4vw,36px)", border: "2px solid var(--gr)", alignItems: "center" }}>
        <div style={{ fontSize: 48, color: "var(--gr)", lineHeight: 1 }}>✓</div>
        <h2 style={{ margin: "6px 0" }}>Submitted successfully</h2>
        <p>Thank you, {s.lead.name}. Our team will contact you on {s.lead.phone || "your phone"} or {s.lead.email}. All lessons are now unlocked.</p>
        <div className="bar" style={{ justifyContent: "center" }}><a className="btn" href="#module-1">Open all lessons</a><a className="btn o" href="#assessment">Back to assessment</a></div>
      </div>
    );
  }
  const submit = (e) => {
    e.preventDefault();
    const n = f.n.trim(), m = f.m.trim(), p = f.p.trim();
    if (!n) return setErr("Please enter your name.");
    if (!/^\S+@\S+\.\S+$/.test(m)) return setErr("Please enter a valid email address.");
    if (!/^[0-9+\-\s]{8,15}$/.test(p)) return setErr("Please enter a valid mobile number.");
    if (!f.k) return setErr("Please choose your category.");
    if (!f.d) return setErr("Please choose your main interest.");
    if (!f.c) return setErr("Please tick the consent box.");
    setErr("");
    update((o) => ({ ...o, lead: { name: n, email: m, phone: p, category: f.k, interest: f.d, msg: f.t.trim(), time: new Date().toISOString() } }));
    return undefined;
  };
  return (
    <form className="card form two" onSubmit={submit} noValidate>
      <input placeholder="Full name *" value={f.n} onChange={set("n")} autoComplete="name" />
      <input type="email" placeholder="Email address *" value={f.m} onChange={set("m")} autoComplete="email" />
      <input type="tel" placeholder="Mobile number *" value={f.p} onChange={set("p")} autoComplete="tel" />
      <select value={f.k} onChange={set("k")}><option value="">I am a... (category) *</option>{["Student or fresher", "Job seeker or career switcher", "Business owner", "E-commerce seller", "Working marketer", "Freelancer or agency", "Other"].map((x) => <option key={x}>{x}</option>)}</select>
      <select value={f.d} onChange={set("d")}><option value="">My main interest *</option>{DM.map((d) => d[1]).concat(["Full course, all 21 modules", "Not sure yet"]).map((x) => <option key={x}>{x}</option>)}</select>
      <textarea rows={3} placeholder="Tell us more about your goal (optional)" value={f.t} onChange={set("t")} />
      <label className="chk"><input type="checkbox" checked={f.c} onChange={set("c")} /> I agree to be contacted about ILM ORA programmes.</label>
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn" type="submit">Submit details</button>
    </form>
  );
}

/* ═════════════════ assessment (14 questions + radar result) ═════════════════ */
function Assessment() {
  const { s, update } = useStore();
  const [z, setZ] = useState({ s: 0, i: 0, a: [], t0: 0, t1: 0, tab: "ov" });
  const zr = useRef(z); zr.current = z;
  const sr = useRef(s); sr.current = s;
  const qzRef = useRef(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (z.s !== 0 && qzRef.current) qzRef.current.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
  }, [z.s]);

  const start = () => setZ({ s: 1, i: 0, a: [], t0: Date.now(), t1: 0, tab: "ov" });
  const back = () => setZ((p) => (p.i > 0 ? { ...p, i: p.i - 1 } : p));
  const pick = (k) => {
    const a = [...zr.current.a]; a[zr.current.i] = k;
    setZ({ ...zr.current, a });
    setTimeout(() => {
      const p = zr.current;
      if (p.s !== 1 || p.a[p.i] !== k) return;
      if (p.i < QS.length - 1) { setZ({ ...p, i: p.i + 1 }); return; }
      const pc = Math.round(QS.filter((q, i) => p.a[i] === q[3]).length / QS.length * 100);
      if (pc > sr.current.best) update((o) => ({ ...o, best: pc }));
      setZ({ ...p, s: 2, t1: Date.now() });
    }, 380);
  };

  if (z.s === 1) {
    const q = QS[z.i];
    return (
      <div className="qz" ref={qzRef}>
        <div className="qpb"><i style={{ width: `${(z.i / QS.length) * 100}%` }} /></div>
        <div className="qq" key={z.i}>
          <span className="tag">Question {z.i + 1} of {QS.length} · {QD[q[0]]}</span>
          <h2 style={{ fontSize: "clamp(18px,2.6vw,28px)", margin: "6px 0 6px" }}>{q[1]}</h2>
          <p>Select one answer. You move to the next question automatically.</p>
          {q[2].map((o, k) => <button type="button" key={k} className={`opt${z.a[z.i] === k ? " sel" : ""}`} onClick={() => pick(k)}><b>{"ABCD"[k]}</b>{o}</button>)}
        </div>
        <div className="bar" style={{ justifyContent: "space-between", marginBottom: 0 }}>
          <button type="button" className="btn o" onClick={back} disabled={!z.i}>Back</button>
          <span style={{ color: "var(--mut)" }}>{z.a.filter((x) => x != null).length} answered</span>
        </div>
      </div>
    );
  }

  if (z.s === 2) return <AssessmentResult z={z} setZ={setZ} start={start} qzRef={qzRef} />;

  return (
    <div className="qz" ref={qzRef}>
      <div className="rs">
        <div>
          <h2>Test your digital marketing level</h2>
          <p>Takes about 3 minutes. Pass mark and scoring weights are proposed and pending management approval.</p>
          <div className="bar"><button type="button" className="btn" onClick={start}>Start assessment</button></div>
        </div>
        <WeightsTable />
      </div>
    </div>
  );
}

function AssessmentResult({ z, setZ, start, qzRef }) {
  const { s } = useStore();
  const c = QD.map((_, d) => QS.filter((q, i) => q[0] === d && z.a[i] === q[3]).length);
  const ok = QS.filter((q, i) => z.a[i] === q[3]).length;
  const pct = Math.round((ok / QS.length) * 100);
  const lvl = pct >= 70 ? "Advanced" : pct >= 40 ? "Intermediate" : "Beginner";
  const sec = Math.round((z.t1 - z.t0) / 1000);
  const score = useCountUp(pct);
  const an = (k) => -Math.PI / 2 + (k * 2 * Math.PI) / 7;
  const R0 = 105;
  const pt = (k, r) => [+(220 + r * Math.cos(an(k))).toFixed(1), +(190 + r * Math.sin(an(k))).toFixed(1)];
  const poly = (f) => QD.map((_, k) => pt(k, R0 * f(k)).join(",")).join(" ");
  const col = (v) => (v === 2 ? "#2f9e44" : v === 1 ? "#e6a100" : "#e03e52");
  const miss = QS.map((q, i) => [q, i]).filter((x) => z.a[x[1]] !== x[0][3]);
  const sweepEnd = pt(1, R0);
  return (
    <div className="qz" ref={qzRef}>
      <div className="qtabs">
        <button type="button" className={z.tab === "ov" ? "on" : ""} onClick={() => setZ({ ...z, tab: "ov" })}>Overview</button>
        <button type="button" className={z.tab === "mi" ? "on" : ""} onClick={() => (s.lead ? setZ({ ...z, tab: "mi" }) : (window.location.hash = "contact"))}>Mistakes ({miss.length}){s.lead ? "" : " 🔒"}</button>
      </div>
      {z.tab === "ov" ? (
        <>
          <div className="rs">
            <div>
              <svg viewBox="0 0 440 390" role="img" aria-label={`Skill radar, score ${pct}%`}>
                <defs><linearGradient id="dmh-zg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8b7cf6" stopOpacity=".85" /><stop offset="1" stopColor="#f26a1b" stopOpacity=".55" /></linearGradient></defs>
                {[0.33, 0.66, 1].map((f) => <polygon key={f} className="rg" style={{ animationDelay: `${f * 0.3}s` }} points={poly(() => f)} fill="none" stroke="#cfd6e4" strokeDasharray={f === 1 ? "4 5" : "0"} />)}
                {QD.map((_, k) => <line key={k} x1="220" y1="190" x2={pt(k, R0)[0]} y2={pt(k, R0)[1]} className="rl" />)}
                <g className="sw"><path d={`M220 190 L220 85 A105 105 0 0 1 ${sweepEnd[0]} ${sweepEnd[1]} Z`} fill="rgba(242,106,27,.14)" /></g>
                <g className="grow"><polygon points={poly((k) => Math.max(c[k] / 2, 0.08))} fill="url(#dmh-zg)" stroke="#f26a1b" strokeWidth="2" /></g>
                {QD.map((n, k) => {
                  const p = pt(k, R0 * Math.max(c[k] / 2, 0.08)), l = pt(k, R0 + 30), x = Math.cos(an(k));
                  return (
                    <g key={n}>
                      <circle className="dt" style={{ animationDelay: `${1 + k * 0.12}s` }} cx={p[0]} cy={p[1]} r="5" fill={col(c[k])} />
                      <text className="lb" style={{ animationDelay: `${0.2 + k * 0.1}s` }} x={l[0]} y={l[1]} fill="#12183a" fontSize="13" fontWeight="600" textAnchor={x > 0.3 ? "start" : x < -0.3 ? "end" : "middle"} dominantBaseline="middle">{n}</text>
                    </g>
                  );
                })}
                <circle className="pl" cx="220" cy="190" r="36" fill="none" stroke="#f26a1b" strokeWidth="2" />
                <circle className="rc" cx="220" cy="190" r="36" strokeWidth="5" />
                <circle className="arc" cx="220" cy="190" r="36" fill="none" stroke="#f26a1b" strokeWidth="5" strokeLinecap="round" strokeDasharray="226.2" strokeDashoffset={(226.2 * (1 - pct / 100)).toFixed(1)} transform="rotate(-90 220 190)" />
                <text className="rt" x="220" y="195" fontSize="26" fontWeight="700" textAnchor="middle" fontFamily="Space Grotesk">{score}</text>
              </svg>
            </div>
            <div>
              <p>Your Digital Marketing assessment result</p>
              <div className="lv2">{lvl}</div>
              <p style={{ color: "var(--ink)", fontSize: "clamp(14px,1.5vw,16px)" }}>
                You answered <b>{ok} of {QS.length}</b> correctly in {Math.floor(sec / 60)}m {sec % 60}s. The pass mark is 70% (proposed, pending approval){pct >= 70 ? ". Well done." : ", so revisit the domains marked in red and try again."}
              </p>
              {QD.map((n, d) => (
                <div key={n} className="br"><span>{n}</span><i><u style={{ animationDelay: `${0.4 + d * 0.12}s`, width: `${Math.max(c[d] * 50, 8)}%`, background: col(c[d]) }} /></i><b style={{ color: col(c[d]) }}>{c[d]}/2</b></div>
              ))}
              <button type="button" className="btn" style={{ marginTop: 12 }} onClick={start}>Retake assessment</button>
            </div>
          </div>
          {!s.lead && (
            <a className="card" href="#contact" style={{ marginTop: 18, textAlign: "center", border: "2px dashed var(--or)", alignItems: "center" }}>
              <h3>🔒 Unlock your detailed report</h3>
              <p>See every mistake with the correct answer and a personalised plan of modules to revisit. Click to open the form.</p>
            </a>
          )}
        </>
      ) : miss.length ? miss.map(([q, i]) => (
        <div key={i} style={{ margin: "0 0 16px", paddingBottom: 14, borderBottom: "1px solid var(--bd)" }}>
          <h3>{i + 1}. {q[1]}</h3>
          <p style={{ color: "#e03e52" }}>Your answer: {z.a[i] == null ? "Skipped" : q[2][z.a[i]]}</p>
          <p style={{ color: "#2f9e44" }}>Correct answer: {q[2][q[3]]}</p>
          <p>Revisit: {DM[q[0]][4].map((n) => <Chip key={n} n={n} c={DM[q[0]][3]} />)}</p>
        </div>
      )) : <p>No mistakes. All answers were correct.</p>}
    </div>
  );
}

/* ═════════════════ module / lesson / task pages ═════════════════ */
function ModuleQuiz({ n }) {
  const { update } = useStore();
  const d = L[n - 1]; const r = n % 4;
  const opts = [0, 1, 2, 3].map((p) => d[3][(p + r) % 4]);
  const [pick, setPick] = useState(null);
  const answer = (p) => {
    setPick(p);
    if (opts[p] === d[3][0]) update((o) => ({ ...o, done: { ...o.done, [n]: 1 } }));
  };
  useEffect(() => setPick(null), [n]);
  return (
    <div className="card">
      <h3>{d[2]}</h3>
      {opts.map((t, p) => <button type="button" key={t} className={`q${pick === p ? (t === d[3][0] ? " ok" : " no") : ""}`} onClick={() => answer(p)}>{t}</button>)}
      <p aria-live="polite">{pick == null ? "" : opts[pick] === d[3][0] ? "Correct. Module marked complete." : "Not quite. Re-read the key idea and try another option."}</p>
    </div>
  );
}

function ModulePage({ n }) {
  const { s, update } = useStore();
  const m = M[n - 1];
  const [txt, setTxt] = useState(""); const [saved, setSaved] = useState("");
  useEffect(() => { setTxt(s.sub[n] || ""); setSaved(""); }, [n, s.sub]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <CurriculumPage />;
  const nx = M[n];
  const d = L[n - 1];
  const imgN = MI[n] || DI2[DM.findIndex((x) => x[4].includes(n))];
  const ul = !!s.lead; const ls = s.ls || {};
  return (
    <div className="page wrap">
      <PageHead small tag={<span className="tag">Module {n} · {m[1]} · {m[6]}</span>} t={m[0]} d={m[2]} img={imgN} cap={`Module ${n} in practice.`}>
        <div className="acts"><a className="btn" href={`#task-${n}`}>Start module</a></div>
      </PageHead>
      <div className="two" style={{ marginTop: 20 }}>
        <div className="card"><h3>Syllabus</h3><ul>{m[3].map((t) => <li key={t}>{t}</li>)}</ul></div>
        <div className="card"><h3>Guided practical</h3><p>{m[4]}</p><p><b>Expected output:</b> {m[5]}</p></div>
        <div className="card"><h3>Assignment</h3><p>Submit as link, file or text. Graded on accuracy, completeness, reasoning and presentation.</p></div>
        <div className="card"><h3>Knowledge check</h3><p>Quiz with explanations, then a scored module assessment.</p></div>
      </div>

      <h2 className="sub-title">Lessons</h2>
      <div className="cg one" style={{ marginTop: 10 }}>
        {[1, 2, 3, 4].map((k) => {
          const lk = k > 2 && !ul, id = `${n}.${k}`;
          const title = LS[id] ? LS[id][0] : m[3][k - 1];
          return (
            <a key={k} className="card lrow" href={`#${lk ? "unlock" : `lesson-${n}-${k}`}`}>
              <span><b>{id}</b> &nbsp;{title}</span>
              <span className={`tag ${ls[id] ? "b" : lk ? "s" : ""}`}>{ls[id] ? "✓ Done" : lk ? "🔒 Locked" : ul ? "Open" : "Free preview"}</span>
            </a>
          );
        })}
      </div>
      {!ul && <p>Lessons 1 and 2 are free in every module. <a href="#unlock" style={{ color: "var(--or)", fontWeight: 600 }}>Share your details to unlock all lessons.</a></p>}

      {s.done[n] ? <p style={{ marginTop: 14 }}><span className="tag b">✓ Completed</span></p> : null}
      <h2 className="sub-title">Module summary</h2>
      <div className="two" style={{ marginTop: 10 }}>
        <div className="card"><span className="tag b" style={{ alignSelf: "flex-start" }}>Key idea</span><p>{d[0]}</p></div>
        <div className="card"><span className="tag" style={{ alignSelf: "flex-start" }}>Common mistake</span><p>{d[1]}</p></div>
      </div>
      <h2 className="sub-title">Module quiz</h2>
      <div style={{ marginTop: 10 }}><ModuleQuiz n={n} /></div>
      <h2 className="sub-title">Assignment</h2>
      <div className="card" style={{ marginTop: 10 }}>
        <p>{m[4]} Paste a link or your written answer.</p>
        <textarea rows={4} value={txt} onChange={(e) => setTxt(e.target.value)} aria-label="Assignment answer" />
        <div className="bar">
          <button type="button" className="btn" onClick={() => { update((o) => ({ ...o, sub: { ...o.sub, [n]: txt } })); setSaved("Saved in this browser"); }}>Save submission</button>
          <button type="button" className="btn o" onClick={() => update((o) => ({ ...o, bm: { ...o.bm, [n]: !o.bm[n] } }))}>{s.bm[n] ? "★ Bookmarked" : "☆ Bookmark"}</button>
          <span style={{ color: "var(--mut)" }}>{saved}</span>
        </div>
      </div>
      <h2 className="sub-title">Next</h2>
      <div className="bar">
        {n > 1 && <a className="btn o" href={`#module-${n - 1}`}>Previous module</a>}
        {nx ? <a className="btn" href={`#module-${n + 1}`}>Next: {nx[0]}</a> : <a className="btn" href="#innovora">Open INNOVORA capstone</a>}
      </div>
    </div>
  );
}

function LessonPage({ n, k }) {
  const { s, update } = useStore();
  const [pick, setPick] = useState(null);
  useEffect(() => setPick(null), [n, k]);
  if (!M[n - 1] || !(k >= 1 && k <= 4)) return <CurriculumPage />;
  const id = `${n}.${k}`, d = LS[id], ul = !!s.lead, ls = s.ls || {};
  const title = d ? d[0] : M[n - 1][3][k - 1];
  if (k > 2 && !ul) {
    return (
      <div className="page wrap">
        <PageHead t={`🔒 Lesson ${id} is locked`} d="Lessons 1 and 2 of every module are free. Share your details once to unlock all lessons." img={9} />
        <div className="bar"><a className="btn" href="#unlock">Unlock all lessons</a></div>
      </div>
    );
  }
  const nxt = k < 4 ? (k + 1 > 2 && !ul ? "unlock" : `lesson-${n}-${k + 1}`) : `module-${n}`;
  const top = <div className="crumb"><a href={`#module-${n}`}>← {M[n - 1][0]}</a><span className="tag">Lesson {id}</span></div>;
  const nb = <a className="btn" href={`#${nxt}`}>{k < 4 ? "Next lesson" : "Back to module quiz"}</a>;
  const imgN = MI[n];
  if (!d) {
    return (
      <div className="page wrap">
        <PageHead small tag={top} t={title} d="Full lesson content for this module is in production." img={imgN} cap={`Module ${n} in practice.`} />
        <div className="card" style={{ marginTop: 16 }}><p>This lesson will follow the standard format: objective, concept, key terms, example, mistakes, recap, knowledge check and practice.</p></div>
        <div className="bar">{nb}</div>
      </div>
    );
  }
  const r = (n + k) % 4;
  const opts = [0, 1, 2, 3].map((p) => d[8][1][(p + r) % 4]);
  const ok = (t) => t === d[8][1][0];
  const C = ({ t, children }) => <div className="card"><span className="tag b" style={{ alignSelf: "flex-start" }}>{t}</span>{children}</div>;
  const Ul = ({ a }) => <ul>{a.map((x) => <li key={x}>{x}</li>)}</ul>;
  return (
    <div className="page wrap">
      <PageHead small tag={top} t={d[0]} img={imgN} cap={`Module ${n} in practice.`} />
      <div className="cg one" style={{ marginTop: 18 }}>
        <C t="Objective"><p>{d[1]}</p></C>
        <C t="Concept"><p>{d[2]}</p></C>
        <C t="Key terms"><ul>{d[3].map((t) => <li key={t[0]}><b>{t[0]}</b>: {t[1]}</li>)}</ul></C>
        <C t="Example"><p>{d[4]}</p></C>
        <C t="Common mistakes"><Ul a={d[5]} /></C>
        <C t="Recap"><Ul a={d[6]} /></C>
        <div className="card">
          <span className="tag b" style={{ alignSelf: "flex-start" }}>Knowledge check</span><h3>{d[8][0]}</h3>
          {opts.map((t, p) => <button type="button" key={t} className={`q${pick === p ? (ok(t) ? " ok" : " no") : ""}`} onClick={() => setPick(p)}>{t}</button>)}
          <p aria-live="polite">{pick == null ? "" : ok(opts[pick]) ? "Correct." : "Not quite. Re-read the concept and try again."}</p>
        </div>
        <C t="Practice activity"><p>{d[7]}</p></C>
      </div>
      <div className="bar" style={{ marginTop: 16 }}>
        <button type="button" className={`btn${ls[id] ? " o" : ""}`} onClick={() => update((o) => ({ ...o, ls: { ...(o.ls || {}), [id]: 1 } }))}>{ls[id] ? "✓ Completed" : "Mark as complete"}</button>
        {nb}
      </div>
    </div>
  );
}

function TaskPage({ n }) {
  const m = M[n - 1];
  const [txt, setTxt] = useState(""); const [msg, setMsg] = useState("Not submitted");
  useEffect(() => {
    try { const o = JSON.parse(localStorage.getItem("ilmora_tasks") || "{}"); setTxt(o[n]?.txt || ""); setMsg(o[n] ? "Saved on this device" : "Not submitted"); } catch { setTxt(""); setMsg("Not submitted"); }
  }, [n]);
  if (!m) return <CurriculumPage />;
  const tl = TD.filter((t) => t[3].includes(n)).map((t) => t[2]).join("; ") || "Browser, spreadsheet or document editor";
  const save = () => {
    try { const o = JSON.parse(localStorage.getItem("ilmora_tasks") || "{}"); o[n] = { txt, t: Date.now() }; localStorage.setItem("ilmora_tasks", JSON.stringify(o)); } catch { /* ignore */ }
    setMsg("Saved on this device");
  };
  return (
    <div className="page wrap">
      <PageHead small tag={<span className="tag">Task · Module {n} · {m[1]}</span>} t={m[4]} d={m[2]} img={MI[n]} cap={`Module ${n} in practice.`} />
      <div className="two" style={{ marginTop: 18 }}>
        <div className="card"><h3>Scenario</h3><p>Pick a sample business. Use INNOVORA data only after the project owner approves it, otherwise label your work as a simulation.</p></div>
        <div className="card"><h3>Tools</h3><p>{tl}</p></div>
        <div className="card"><h3>Inputs</h3><ul><li>Business goal and audience</li><li>Budget or time limit</li><li>Template from <a href="#resources" style={{ color: "var(--or)" }}>Resources</a></li></ul></div>
        <div className="card"><h3>Instructions</h3><ol>{m[3].map((t) => <li key={t}>Apply: {t}</li>)}</ol></div>
        <div className="card"><h3>Expected output</h3><p>{m[5]}</p></div>
        <div className="card"><h3>Rubric</h3><ul><li>Accuracy</li><li>Completeness</li><li>Reasoning</li><li>Presentation</li></ul></div>
      </div>
      <h2 className="sub-title">Submit</h2>
      <div className="card" style={{ marginTop: 10 }}>
        <label className="lbl" htmlFor="dmh-tt">Link or text</label>
        <textarea id="dmh-tt" rows={4} placeholder="Paste a link or write your answer" value={txt} onChange={(e) => setTxt(e.target.value)} />
        <div className="bar"><button type="button" className="btn" onClick={save}>Save submission</button><span className="ok2">{msg}</span></div>
        <p><small>Trainer feedback appears here once review is enabled.</small></p>
      </div>
      <div className="bar"><a className="btn o" href="#lab">All tasks</a><a className="btn o" href={`#module-${n}`}>Module {n}</a></div>
    </div>
  );
}

/* ═════════════════ dashboard / certificate ═════════════════ */
function DashBody({ withCert }) {
  const { s, update } = useStore();
  const dnN = Object.keys(s.done).length;
  const sb = Object.values(s.sub).filter(Boolean).length;
  const bm = Object.values(s.bm).filter(Boolean).length;
  const [nm, setNm] = useState("");
  useEffect(() => setNm(s.name || ""), [s.name]);
  return (
    <>
      <div className="stats" style={{ maxWidth: "none" }}>
        {[[`${dnN}/21`, "Modules complete"], [`${s.best}%`, "Best assessment"], [sb, "Submissions"], [bm, "Bookmarks"]].map((x) => <div key={x[1]} className="stat"><b>{x[0]}</b><small>{x[1]}</small></div>)}
      </div>
      <div className="qpb big"><i style={{ width: `${(dnN / 21) * 100}%` }} /></div>
      <div className="cg">
        {M.map((m, i) => (
          <a key={i} className="card" href={`#module-${i + 1}`}>
            <span className={`tag ${s.done[i + 1] ? "b" : "s"}`} style={{ alignSelf: "flex-start" }}>{s.done[i + 1] ? "✓ Done" : "To do"}{s.bm[i + 1] ? " · ★" : ""}</span><h3>{m[0]}</h3>
          </a>
        ))}
      </div>
      {withCert && (
        <>
          <h2 className="sub-title">Certificate</h2>
          <div className="card" style={{ marginTop: 10 }}>
            <p>{elig(s) ? "You have completed all 21 modules and scored 70% or more." : "Unlocks after all 21 modules are complete and the assessment is 70% or higher (proposed rule)."}</p>
            <div className="bar">
              <input aria-label="Your full name" placeholder="Your full name" value={nm} onChange={(e) => setNm(e.target.value)} />
              <button type="button" className="btn" onClick={() => { update((o) => ({ ...o, name: nm })); window.location.hash = "certificate"; }}>View certificate</button>
            </div>
          </div>
          <Reminder />
        </>
      )}
    </>
  );
}
function Reminder() {
  const { s } = useStore();
  let n = 1; while (n <= 21 && s.done[n]) n++;
  return (
    <div className="card" style={{ marginTop: 14 }}>
      <h3>Reminders</h3>
      <p>{n > 21 ? "All 21 modules complete. Open your certificate." : <>Next step: <a href={`#module-${n}`} style={{ color: "var(--or)", fontWeight: 600 }}>Resume Module {n}, {M[n - 1][0]}</a></>}</p>
      <p><small>Reminders are computed from progress saved on this device.</small></p>
    </div>
  );
}

function CertificatePage() {
  const { s } = useStore();
  if (!elig(s)) {
    return (
      <div className="page wrap">
        <PageHead t="Certificate locked" d="Complete all 21 module quizzes and score 70% or more in the assessment." img={2} />
        <div className="bar"><a className="btn" href="#dashboard">See my progress</a></div>
      </div>
    );
  }
  return (
    <div className="page wrap">
      <div className="cert">
        <div className="logo"><b>ILM</b> <i>ORA</i></div>
        <p>Certificate of completion (preview)</p>
        <h1 style={{ fontSize: "clamp(26px,5vw,40px)" }}>{s.name || "Your name"}</h1>
        <p>has completed the Digital Marketing Professional Learning Hub, 21 modules, with an assessment score of {s.best}%.</p>
        <p>{new Date().toDateString()}</p>
        <p style={{ fontSize: 12.5 }}>Preview only. Issuer and verification rules are pending management approval.</p>
        <button type="button" className="btn no-print" onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
}

/* ═════════════════ toolkit / glossary / overview ═════════════════ */
const In = ({ l, v, on, ph, type = "number" }) => (<><label>{l}</label><input type={type} min={type === "number" ? 0 : undefined} placeholder={ph} value={v} onChange={(e) => on(e.target.value)} /></>);

function Toolkit() {
  const [u, setU] = useState({ url: "", so: "", md: "", ca: "", te: "", co: "" }); const [link, setLink] = useState("Your link appears here.");
  const [m, setM] = useState({ sp: "", rv: "", im: "", ck: "", cv: "" }); const [mo, setMo] = useState("Results appear here.");
  const [bb, setBb] = useState(""); const [rows, setRows] = useState([]);
  const f2 = (x) => (Number.isFinite(x) ? x.toFixed(2) : "n/a");
  const build = () => {
    const url = u.url.trim();
    const p = [["utm_source", u.so], ["utm_medium", u.md], ["utm_campaign", u.ca], ["utm_term", u.te], ["utm_content", u.co]].filter((x) => x[1].trim());
    setLink(url ? url + (url.includes("?") ? "&" : "?") + p.map((x) => `${x[0]}=${encodeURIComponent(x[1].trim().toLowerCase())}`).join("&") : "Enter a URL first.");
  };
  const calc = () => { const sp = +m.sp || 0, rv = +m.rv || 0, im = +m.im || 0, ck = +m.ck || 0, cv = +m.cv || 0; setMo(`CTR ${f2(ck / im * 100)}% · CPC ${f2(sp / ck)} · CPM ${f2(sp / im * 1000)} · CPA ${f2(sp / cv)} · Conv. rate ${f2(cv / ck * 100)}% · ROAS ${f2(rv / sp)}`); };
  const split = () => { const b = +bb || 0; setRows([["Search", 40], ["Social", 30], ["Email", 10], ["Content", 20]].map((x) => [x[0], x[1], f2(b * x[1] / 100)])); };
  return (
    <div className="two">
      <div className="card"><h3>UTM builder</h3>
        <div className="f">
          <In l="Page URL" type="url" ph="https://example.com" v={u.url} on={(x) => setU({ ...u, url: x })} />
          <In l="Source" type="text" ph="google" v={u.so} on={(x) => setU({ ...u, so: x })} />
          <In l="Medium" type="text" ph="cpc" v={u.md} on={(x) => setU({ ...u, md: x })} />
          <In l="Campaign" type="text" ph="spring-sale" v={u.ca} on={(x) => setU({ ...u, ca: x })} />
          <In l="Term (optional)" type="text" v={u.te} on={(x) => setU({ ...u, te: x })} />
          <In l="Content (optional)" type="text" v={u.co} on={(x) => setU({ ...u, co: x })} />
          <button type="button" className="btn" onClick={build}>Build link</button><div className="out" aria-live="polite">{link}</div>
        </div></div>
      <div className="card"><h3>Ad metrics</h3>
        <div className="f">
          <In l="Spend" v={m.sp} on={(x) => setM({ ...m, sp: x })} /><In l="Revenue" v={m.rv} on={(x) => setM({ ...m, rv: x })} />
          <In l="Impressions" v={m.im} on={(x) => setM({ ...m, im: x })} /><In l="Clicks" v={m.ck} on={(x) => setM({ ...m, ck: x })} /><In l="Conversions" v={m.cv} on={(x) => setM({ ...m, cv: x })} />
          <button type="button" className="btn" onClick={calc}>Calculate</button><div className="out" aria-live="polite">{mo}</div>
        </div></div>
      <div className="card"><h3>Budget split (example mix)</h3>
        <div className="f"><In l="Total budget" v={bb} on={setBb} /><button type="button" className="btn" onClick={split}>Split</button></div>
        <div style={{ marginTop: 10 }}><TableWrap><thead><tr><th>Channel</th><th>Share</th><th>Amount</th></tr></thead><tbody>{rows.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}%</td><td>{r[2]}</td></tr>)}</tbody></TableWrap></div>
        <p><small>The 40/30/10/20 mix is a teaching example, not a recommendation.</small></p>
      </div>
    </div>
  );
}

function GlossaryPage() {
  const [q, setQ] = useState("");
  const list = GLS.filter((g) => (g[0] + g[1]).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="bar"><input aria-label="Search terms" placeholder="Search terms" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      {list.length ? <div className="cg">{list.map((g) => <div key={g[0]} className="card"><h3>{g[0]}</h3><p>{g[1]}</p></div>)}</div> : <p>No term found.</p>}
    </>
  );
}

/* ═════════════════ full pages (same ids as the HTML hash routes) ═════════════════ */
const Pg = ({ children }) => <div className="page wrap">{children}</div>;
const H = (t, d, k) => <PageHead t={t} d={d} img={PG[k]?.[0]} cap={PG[k]?.[1]} />;
const gap = (c) => <div style={{ marginTop: 18 }}>{c}</div>;

function CurriculumPage() { return <Pg>{H("All 21 modules", "Search or filter by level and stage.", "curriculum")}{gap(<Curriculum page />)}</Pg>; }

const PAGES = {
  curriculum: CurriculumPage,
  domains: () => <Pg>{H("Domains & product vision", "What the Hub covers and where each module fits.", "domains")}<Vision /><section className="sec"><h2>7 domains, 21 modules</h2><p>Every module belongs to one domain. Hover to pause, click a module to open it.</p><DomainsStrip /></section></Pg>,
  audience: () => <Pg>{H("Who it is for", "Learner profiles and their best starting direction.", "audience")}{gap(<AudienceStrip />)}</Pg>,
  journey: () => <Pg>{H("Learning journey", "From foundation to capstone, classified by stage and level.", "journey")}{gap(<Journey />)}</Pg>,
  roadmap: () => <Pg>{H("Learning roadmap", "Seven stages from foundation to capstone. Effort estimates are published after approval.", "roadmap")}{gap(<RoadmapGrid />)}</Pg>,
  lab: () => <Pg>{H("Practical Lab", "One hands-on task per module. Filter by stage, difficulty or search, then open a task for the full brief.", "lab")}{gap(<LabFilter />)}<h2 className="sub-title">Rubric</h2><p>Accuracy, completeness, reasoning and presentation.</p></Pg>,
  assessment: () => <Pg>{H("Assessment & Quiz Center", "14 questions across 7 domains. 4 options each, one correct answer. Your result shows as a skill radar.", "assessment")}<Assessment /></Pg>,
  tools: () => <Pg>{H("Tools & technologies", "Search, filter and open official sites. Free or paid status is verified before launch.", "tools")}{gap(<ToolsFilter />)}</Pg>,
  resources: () => <Pg>{H("Resources & templates", "Filter by module or type and download a working template (.txt).", "resources")}{gap(<ResourceCards withFilter />)}</Pg>,
  innovora: () => <Pg><PageHead t="INNOVORA: a real-world project" d="Shows how all 21 modules connect in one business. Every item is labelled live, historical, proposed or simulated." img={12} />{gap(<InnovoraBody />)}</Pg>,
  career: () => <Pg>{H("Certification & career hub", "Certificate issuer and rules are pending approval.", "career")}{gap(<CareerBody />)}</Pg>,
  dashboard: () => <Pg>{H("My progress", "Saved in this browser. Login and cross-device sync need a backend.", "dashboard")}{gap(<DashBody withCert />)}</Pg>,
  certificate: CertificatePage,
  faq: () => <Pg>{H("FAQs & support", "Quick answers.", "faq")}{gap(<FaqBody />)}</Pg>,
  contact: () => <Pg>{H("Talk to our team", "Share your details and we will contact you. Submitting also unlocks every lesson.", "contact")}{gap(<ContactForm />)}</Pg>,
  toolkit: () => <Pg>{H("Marketing toolkit", "Three working tools used in Modules 5, 7, 11 and 21. They run in your browser and save nothing.", "toolkit")}{gap(<Toolkit />)}</Pg>,
  glossary: () => <Pg>{H("Glossary", "Key terms used across the 21 modules.", "glossary")}{gap(<GlossaryPage />)}</Pg>,
  trainers: () => <Pg>{H("Trainers and mentors", "Approved trainer names, bios and credentials appear here after HR and the Training lead confirm them.", "trainers")}{gap(<Mentors />)}</Pg>,
  videos: () => <Pg><PageHead t="Watch & learn" d="Short videos on planning, teamwork, presenting a strategy and the INNOVORA platform." img={9} />{gap(<VideoGrid />)}</Pg>,
  overview: () => (
    <Pg>
      {H("Final project overview", "What is built in this prototype, what needs a backend, and what needs approval.", "overview")}
      <h2 className="sub-title">What is included</h2>
      <div className="cg clamp" style={{ marginTop: 10 }}>{OV.map((o) => <a key={o[0]} className="card" href={o[2]}><h3>{o[0]}</h3><p>{o[1]}</p></a>)}</div>
      <h2 className="sub-title">Status</h2>
      <div style={{ marginTop: 10 }}><TableWrap><thead><tr><th>Area</th><th>Status</th></tr></thead><tbody>
        <tr><td>Responsive pages, search, filters, downloads, calculators, glossary, images on every page</td><td className="ok2">Built</td></tr>
        <tr><td>Login, cross-device sync, trainer workspace, admin area, assignment review, attempt history</td><td>Needs backend</td></tr>
        <tr><td>INNOVORA metrics, trainer bios, pass score, retakes, deadlines, certificate issuer, duration, ECM meaning</td><td>Needs management approval</td></tr>
        <tr><td>Clean URLs, XML sitemap, robots rules</td><td>Needs hosting setup (this page uses # routes)</td></tr>
      </tbody></TableWrap></div>
      <h2 className="sub-title">Roles</h2>
      <div className="cg free w3 m1" style={{ marginTop: 10 }}>
        <div className="card"><h3>Learner</h3><p>Studies lessons, completes quizzes and tasks, tracks progress.</p></div>
        <div className="card"><h3>Trainer</h3><p>Reviews assignments and gives feedback. Needs backend.</p></div>
        <div className="card"><h3>Admin</h3><p>Manages users, content and reports. Needs backend.</p></div>
      </div>
      <h2 className="sub-title">Approvals still needed</h2>
      <ul><li>Program name, audience and messaging</li><li>INNOVORA URL, assets and publishable metrics</li><li>Assessment weights, pass score and certificate rules</li><li>Support contact and content owner</li></ul>
      <h2 className="sub-title">Marketing in practice</h2>
      <p>What the work looks like day to day. Each photo links to the module that teaches it.</p>
      <div style={{ marginTop: 10 }}><Gallery /></div>
    </Pg>
  ),
};
PAGES.unlock = PAGES.contact;

/* ═════════════════ home (all sections, scroll-spied by the pill bar) ═════════════════ */
function Home() {
  const { s } = useStore();
  const lsN = Object.keys(s.ls || {}).length;
  return (
    <div className="page wrap">
      <Hero />
      <Explainer />
      <Vision />
      <Section id="videos" t="Watch & learn" l="Short videos on planning, teamwork, presenting a strategy and the INNOVORA platform." k="videos"><VideoGrid /></Section>
      <Section id="curriculum" t="All 21 modules" l="Each module has four lessons, a guided practical, an assignment and a quiz. Open any module to start." k="curriculum" img={PG.curriculum[0]} cap={PG.curriculum[1]}><ModuleCards list={allMods} /></Section>
      <Section id="domains" t="7 domains, 21 modules" l="Every module belongs to one domain. The strip moves on its own; hover to pause." k="domains" img={PG.domains[0]} cap={PG.domains[1]}><DomainsStrip /><Funnel /></Section>
      <Section id="audience" t="Who is this for" l="Find your profile and follow the suggested direction." k="audience" img={PG.audience[0]} cap={PG.audience[1]}><AudienceStrip /></Section>
      <Section id="journey" t="The full learning journey" l="Seven stages, colour-coded by level." k="journey" img={PG.journey[0]} cap={PG.journey[1]}><Journey /></Section>
      <Section id="roadmap" t="Learning roadmap" l="Follow the stages in order. Each stage is complete when you finish its module quizzes and save one assignment per module. Effort estimates are published after approval." k="roadmap" img={PG.roadmap[0]} cap={PG.roadmap[1]}><RoadmapGrid /></Section>
      <Section id="lab" t="Practical Lab" l="One hands-on task for every module, each with a clear deliverable, scored on accuracy, completeness, reasoning and presentation." k="lab" img={PG.lab[0]} cap={PG.lab[1]}><LabCards list={allMods} /></Section>
      <Section id="assessment" t="Assessment & quiz center" l="Test your level in about 3 minutes: 14 questions across 7 domains. You get an animated skill radar, a level and a domain-wise breakdown. Your detailed mistake report and learning plan unlock after you share your details." k="assessment" img={PG.assessment[0]} cap={PG.assessment[1]}>
        <div className="stats"><div className="stat"><b>14</b><small>Questions</small></div><div className="stat"><b>7</b><small>Domains on the radar</small></div><div className="stat"><b>70%</b><small>Proposed pass mark</small></div></div>
        <div className="bar"><a className="btn" href="#assessment">Start assessment</a></div>
        <WeightsTable />
      </Section>
      <Section id="tools" t="Tools & technologies" l="The platforms you will use in the practicals, grouped by category. Free or paid status is verified before launch." k="tools" img={PG.tools[0]} cap={PG.tools[1]}><ToolCards /></Section>
      <Section id="resources" t="Resources & templates" l="Worksheets, checklists and planners mapped to modules. Each shows file type and version." k="resources" img={PG.resources[0]} cap={PG.resources[1]}><ResourceCards /></Section>
      <Section id="innovora" t="INNOVORA: a real-world project" l="Eleven sections show how all 21 modules connect in one business. Each item is labelled live, historical, proposed or simulated, and metrics appear only with approval." k="innovora"><InnovoraBody /></Section>
      <Section id="career" t="Certification & career hub" l="Turn your work into a portfolio and a career path. Certificate issuer and rules are pending approval." k="career" img={PG.career[0]} cap={PG.career[1]}><CareerBody /></Section>
      <Section id="dashboard" t="My progress" l={`You have completed ${Object.keys(s.done).length} of 21 modules and ${lsN} lessons on this device.`} k="dashboard"><DashBody /><How /></Section>
      <Section id="mentors" t="Trainers and mentors" l="Approved trainer details are published here." k="trainers"><Mentors /></Section>
      <Section id="faq" t="FAQs & support" l="Answers to the most common questions." k="faq" img={PG.faq[0]} cap={PG.faq[1]}><FaqBody /></Section>
      <Section id="contact" t="Contact our team" l="Tell us who you are and what you want to learn. Our team will get in touch, and submitting unlocks all lessons." img={PG.contact[0]} cap={PG.contact[1]}><ContactForm /></Section>
      <div className="cta no-print">
        <div><h2>Ready to start?</h2><p>Open lesson 1.1 now. No sign-up needed for the free lessons.</p></div>
        <a className="btn w" href="#lesson-1-1">Start lesson 1.1</a>
      </div>
    </div>
  );
}

/* ═════════════════ router + section bar ═════════════════ */
function renderRoute(h) {
  if (h.startsWith("module-")) return <ModulePage n={+h.slice(7)} />;
  if (h.startsWith("lesson-")) { const [n, k] = h.slice(7).split("-").map(Number); return <LessonPage n={n} k={k} />; }
  const t = /^task-(\d+)$/.exec(h);
  if (t) return <TaskPage n={+t[1]} />;
  const P = PAGES[h];
  return P ? <P /> : <Home />;
}

function SectionBar({ h }) {
  const isHome = h === "home";
  const [spy, setSpy] = useState("home");
  const bar = useRef(null);

  useEffect(() => {
    if (!isHome) return undefined;
    let tick = false;
    const on = () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => {
        tick = false;
        let c = "home";
        SUB.forEach((x) => { const e = document.getElementById(`s-${x[0]}`); if (e && e.getBoundingClientRect().top < 190) c = x[0]; });
        setSpy(c);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [isHome]);

  const active = isHome ? spy : /^(module|lesson)-/.test(h) ? "curriculum" : /^task-/.test(h) ? "lab" : h;

  useEffect(() => {
    const sc = bar.current; const el = sc && sc.querySelector(".pill.on");
    if (el) sc.scrollTo({ left: el.offsetLeft - sc.clientWidth / 2 + el.clientWidth / 2, behavior: reduced() ? "auto" : "smooth" });
  }, [active]);

    const go = (e, id) => {
    if (isHome) {
      // home page: scroll only, URL stays http://localhost:3000/digital-marketing-hub
      const el = document.getElementById(`s-${id}`);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" }); }
      return;
    }
    // other pages (module / lesson / task etc.): "Hero" goes back home with a clean URL (no #home)
    if (id === "home") {
      e.preventDefault();
      window.history.pushState(null, "", window.location.pathname + window.location.search);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };

  return (
    <nav className="subbar no-print" aria-label="Digital Marketing Hub sections">
      <div className="scroller" ref={bar}>
        {SUB.map((x) => <a key={x[0]} className={`pill${x[0] === active ? " on" : ""}`} href={`#${x[0]}`} onClick={(e) => go(e, x[0])}>{x[1]}</a>)}
      </div>
    </nav>
  );
}

function HubShell({ theme }) {
  const h = useHash();
  const root = useRef(null);
  const mode = theme === "dark" ? "dark" : "light";
  useLayoutFit(root, h);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    window.scrollTo(0, 0);
    const t = h === "home" ? "Digital Marketing Hub | ILM ORA" : `${h.replace(/-/g, " ")} | ILM ORA Digital Marketing Hub`;
    document.title = t;
  }, [h]);
  return (
    <div className="dmh" data-theme={mode} ref={root}>
      <SectionBar h={h} />
      {renderRoute(h)}
      <p className="note wrap no-print">© ILM ORA · Digital Marketing Professional Learning Hub · Duration, pass score and certificate rules are published only after management approval.</p>
    </div>
  );
}

/* The page is rendered as <DigitalMarketingHub /> with no props, so the hub keeps the theme itself
   and hands theme + toggleTheme to PublicLayout -> the navbar moon/sun button now works. */
export default function DigitalMarketingHub({ theme: themeProp, toggleTheme: toggleProp }) {
  const [local, setLocal] = useState("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const t = ["theme", "ilm-theme", "ilmora-theme"].map((k) => localStorage.getItem(k)).find((v) => v === "dark" || v === "light");
      if (t) setLocal(t);
      else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) setLocal("dark");
    } catch { /* ignore */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || themeProp != null) return;
    try { localStorage.setItem("theme", local); } catch { /* ignore */ }
    const el = document.documentElement;
    el.classList.toggle("dark", local === "dark");
    el.setAttribute("data-theme", local);
  }, [local, ready, themeProp]);

  const theme = themeProp != null ? themeProp : local;
  const toggleTheme = toggleProp || (() => setLocal((v) => (v === "dark" ? "light" : "dark")));

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme}>
      <StoreProvider>
        <HubShell theme={theme} />
      </StoreProvider>
    </PublicLayout>
  );
}