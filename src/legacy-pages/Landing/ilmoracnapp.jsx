"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PublicLayout from "./components/PublicLayout";
import "./ilmoracnapp.css";
import {
  SEC,
  COMP,
  KT,
  WHY,
  BEN,
  USE,
  BP,
  CH,
  FAQ,
  LABS,
  ITEMS,
  DM,
  RM,
  Q,
  MANAGER_EMAIL,
  STORE_KEY,
  PASS_MARK,
  LAB_PASS_RISK,
  VIDEO_INFO,
} from "./ilmoracnappData";
import { HERO_VIDEO, HERO_IMAGE, IMAGES, VIDEOS, LOGOS } from "./cnappAssets";

/* ─────────────────────────────────────────────────────────────────
   ILM ORA — CNAPP page  (route: /cnapp)
   Navbar + Footer PublicLayout se aate hain. Is file me sirf page body hai.
───────────────────────────────────────────────────────────────── */

const sid = (k) => `cn-${k}`;
const NODES = ["CSPM", "CWPP", "CIEM", "DSPM", "KSPM", "API", "CDR"];
const GROUPS = ["All", ...new Set(COMP.map((c) => c[0]))];
const SEV_ORDER = { Critical: 0, High: 1, Medium: 2, Low: 3 };

/* ── Marquee: items ko 2 baar render karta hai, CSS -50% translate se loop ── */
function Marquee({ items, render, min = 8, speed = 6, className = "" }) {
  const half = useMemo(() => {
    if (!items.length) return [];
    const rep = Math.max(1, Math.ceil(min / items.length));
    return Array.from({ length: rep }, () => items).flat();
  }, [items, min]);
  const dur = Math.max(24, Math.round(half.length * speed));

  return (
    <div className={`mq ${className}`}>
      <div className="mt" style={{ animationDuration: `${dur}s` }}>
        {[0, 1].flatMap((copy) =>
          half.map((it, i) => {
            const dup = copy === 1 || i >= items.length;
            return (
              <React.Fragment key={`${copy}-${i}`}>
                {render(it, i % items.length, dup)}
              </React.Fragment>
            );
          }),
        )}
      </div>
    </div>
  );
}

function Card({ tag, title, text, dup }) {
  return (
    <div className={`card${dup ? " dup" : ""}`} aria-hidden={dup || undefined}>
      {tag && <span className="tag">{tag}</span>}
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

const cardRender = (it, _i, dup) => (
  <Card title={it[0]} text={it[1]} dup={dup} />
);

/* ── Technology partners ── */
const PARTNERS = [
  { name: "Microsoft Azure", fb: "A", color: "#0078d4" },
  { name: "AWS", fb: "aws", color: "#ff9900" },
  { name: "Google Cloud", logo: "google-cloud" },
  { name: "Kubernetes", logo: "kubernetes" },
  { name: "Docker", logo: "docker" },
  { name: "Terraform", logo: "terraform" },
  { name: "GitHub", logo: "github", gh: true },
];

function PartnerChip({ p, dup }) {
  const src = p.logo ? LOGOS[p.logo] : "";
  return (
    <div className={`lg${dup ? " dup" : ""}`} aria-hidden={dup || undefined}>
      {src ? (
        <img
          className={p.gh ? "gh" : undefined}
          src={src}
          alt=""
          width="26"
          height="26"
          loading="lazy"
        />
      ) : (
        <span className="fb" style={{ background: p.color || "#586079" }}>
          {p.fb || p.name.slice(0, 1)}
        </span>
      )}
      {p.name}
    </div>
  );
}

function Banner({ img, title, text }) {
  if (!img) return null;
  return (
    <div className="cn-bannerwrap">
      <div
        className="cn-banner"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(15,16,48,.9),rgba(15,16,48,.35)), url(${img})`,
        }}
      >
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

/* ═════════════════════════════ PAGE ═════════════════════════════ */
export default function IlmoraCnapp() {
  /* ── theme: site ka theme (html.dark / data-theme) follow karta hai ── */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => {
      if (root.classList.contains("dark") || root.dataset.theme === "dark")
        return "dark";
      if (root.classList.contains("light") || root.dataset.theme === "light")
        return "light";
      try {
        const s = localStorage.getItem("theme");
        if (s === "dark" || s === "light") return s;
      } catch (e) {
        /* ignore */
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };
    setTheme(read());
    const mo = new MutationObserver(() => setTheme(read()));
    mo.observe(root, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => mo.disconnect();
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.classList.contains("dark") || root.dataset.theme === "dark" ? "light" : "dark";
    root.classList.toggle("dark", next === "dark");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {
      /* ignore */
    }
    setTheme(next);
  }, []);

  /* ── progress (localStorage) ── */
  const [PG, setPG] = useState({});
  const patchPG = useCallback((fn) => {
    setPG((prev) => {
      const n = fn(prev);
      if (n === prev) return prev;
      try {
        localStorage.setItem(STORE_KEY, JSON.stringify(n));
      } catch (e) {
        /* ignore */
      }
      return n;
    });
  }, []);
  const prog = useCallback(
    (k, v = 1) => patchPG((p) => (p[k] === v ? p : { ...p, [k]: v })),
    [patchPG],
  );

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      setPG((prev) => ({ ...stored, ...prev }));
    } catch (e) {
      /* ignore */
    }
  }, []);

  /* ── navigation helpers ── */
  const scrollToKey = useCallback((key) => {
    const el = document.getElementById(sid(key));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  const go = useCallback(
    (key) => (e) => {
      if (e && e.preventDefault) e.preventDefault();
      scrollToKey(key);
    },
    [scrollToKey],
  );

  const [active, setActive] = useState("hero");
  const navRef = useRef(null);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const els = SEC.map(([k]) => document.getElementById(sid(k))).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const k = en.target.id.replace(/^cn-/, "");
            setActive(k);
            prog(k);
          }
        });
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [prog]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const a = nav.querySelector("a.on");
    if (a) nav.scrollTo({ left: a.offsetLeft - 80, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── components filter ── */
  const [grp, setGrp] = useState("All");
  const compItems = useMemo(
    () => COMP.filter((c) => grp === "All" || c[0] === grp),
    [grp],
  );

  /* ── practical labs ── */
  const [li, setLi] = useState(0);
  const [sortMode, setSortMode] = useState("sev");
  const [done, setDone] = useState(() => LABS.map(() => []));

  const lab = useMemo(() => {
    const L = LABS[li];
    const d = new Set(done[li]);
    const F = L.f;
    const risk = F.filter((f) => !d.has(f.id)).reduce((s, f) => s + f.w, 0);
    const max = F.reduce((s, f) => s + f.w, 0);
    let ok;
    if (L.ctx) {
      ok = F.filter((f) => f.path && !d.has(f.id)).length < 3;
    } else {
      ok = !F.some((f) => !d.has(f.id) && (f.sev === "Critical" || f.sev === "High"));
    }
    const ctxSort = L.ctx && sortMode === "ctx";
    const list = [...F].sort((x, y) =>
      ctxSort
        ? (y.path || 0) - (x.path || 0) || y.w - x.w
        : SEV_ORDER[x.sev] - SEV_ORDER[y.sev] || y.w - x.w,
    );
    return { L, d, risk, max, ok, ctxSort, list };
  }, [li, done, sortMode]);

  useEffect(() => {
    if (lab.risk < LAB_PASS_RISK) prog(`lab${li}`);
  }, [lab.risk, li, prog]);

  const fixFinding = (id) =>
    setDone((prev) => prev.map((a, i) => (i === li ? [...a, id] : a)));
  const resetLab = () =>
    setDone((prev) => prev.map((a, i) => (i === li ? [] : a)));

  /* ── assessment ── */
  const [qi, setQi] = useState(0);
  const [ch, setCh] = useState([]);
  const [picked, setPicked] = useState(null);
  const [R, setR] = useState(null);
  const [tab, setTab] = useState("ov");
  const t0 = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    t0.current = Date.now();
    return () => clearTimeout(timer.current);
  }, []);

  const finishQuiz = (answers) => {
    const sc = Q.filter((q, i) => answers[i] === q[2]).length;
    const pc = Math.round((sc / Q.length) * 100);
    setR({ sc, pc, s: Math.round((Date.now() - t0.current) / 1000) });
    patchPG((p) => {
      const n = { ...p, best: Math.max(p.best || 0, pc) };
      if (pc >= PASS_MARK) n.pass = 1;
      return n;
    });
  };

  const pickOption = (i) => {
    if (picked !== null) return;
    setPicked(i);
    timer.current = setTimeout(() => {
      const answers = [...ch];
      answers[qi] = i;
      setCh(answers);
      setPicked(null);
      if (qi + 1 >= Q.length) finishQuiz(answers);
      else setQi(qi + 1);
    }, 450);
  };

  const retake = () => {
    clearTimeout(timer.current);
    t0.current = Date.now();
    setQi(0);
    setCh([]);
    setPicked(null);
    setR(null);
    setTab("ov");
  };

  /* ── connect form ── */
  const [fn, setFn] = useState("");
  const [fe, setFe] = useState("");
  const [fp, setFp] = useState("");
  const [fi, setFi] = useState("Course enrollment");
  const [fm, setFm] = useState("");
  const [fa, setFa] = useState(true);
  const [fs, setFs] = useState("");
  const msgRef = useRef(null);

  const repTxt = () => {
    if (!R) return "";
    const ms = Q.map((q, i) => i).filter((i) => ch[i] !== Q[i][2]);
    return `CNAPP assessment: ${R.pc}% (${R.sc} of ${Q.length}). Areas to improve: ${
      ms.map((i) => DM[i]).join(", ") || "none"
    }.`;
  };

  const connectWithReport = () => {
    const t = repTxt();
    if (t)
      setFm(
        `Hi ILM ORA team, I completed the CNAPP assessment and would like to connect.\n${t}`,
      );
    scrollToKey("connect");
  };

  const sendMsg = () => {
    const n = fn.trim();
    const em = fe.trim();
    const m = fm.trim();
    if (!n || !/^\S+@\S+\.\S+$/.test(em)) {
      setFs("Enter your name and a valid email.");
      return;
    }
    const rt = fa && !m.includes("CNAPP assessment") ? repTxt() : "";
    const body = `Name: ${n}\nEmail: ${em}\nPhone: ${fp}\nInterest: ${fi}\n\n${m}${
      rt ? `\n\n${rt}` : ""
    }`;
    const u = `mailto:${MANAGER_EMAIL}?cc=${encodeURIComponent(em)}&subject=${encodeURIComponent(
      `ILM ORA CNAPP enquiry from ${n}`,
    )}&body=${encodeURIComponent(body)}`;
    const a = document.createElement("a");
    a.href = u;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setFs(
      "Your email app is opening. The message goes to the ILM ORA manager with a copy to you. Press Send there. If nothing opens, use Copy message.",
    );
  };

  const copyMsg = async () => {
    try {
      await navigator.clipboard.writeText(fm);
    } catch (e) {
      if (msgRef.current) msgRef.current.select();
      try {
        document.execCommand("copy");
      } catch (x) {
        /* ignore */
      }
    }
    setFs("Message copied.");
  };

  /* ── progress panel numbers ── */
  const doneCount = ITEMS.filter((i) => PG[i[0]]).length;
  const pct = Math.round((doneCount / ITEMS.length) * 100);

  /* ═════════ renderers ═════════ */
  const renderQuizBody = () => {
    const q = Q[qi];
    return (
      <>
        <p style={{ color: "var(--mute)" }}>
          Question {qi + 1} of {Q.length}, {DM[qi]}
        </p>
        <div className="meter" style={{ marginBottom: 16 }}>
          <i
            style={{
              width: `${(qi / Q.length) * 100}%`,
              background: "var(--acc)",
            }}
          />
        </div>
        <h3 style={{ fontSize: 21, marginBottom: 12 }}>{q[0]}</h3>
        {q[1].map((o, i) => (
          <button
            key={i}
            type="button"
            className={`opt${picked === i ? " sel" : ""}`}
            onClick={() => pickOption(i)}
            disabled={picked !== null}
          >
            {o}
          </button>
        ))}
      </>
    );
  };

  const renderReport = () => {
    const { sc, pc, s } = R;
    const n = Q.length;
    const lvl = pc >= PASS_MARK ? "Advanced" : pc >= 40 ? "Intermediate" : "Beginner";
    const ok = (i) => ch[i] === Q[i][2];
    const miss = Q.map((q, i) => i).filter((i) => !ok(i));
    const P = (i, r) => {
      const a = (i / n) * 2 * Math.PI - Math.PI / 2;
      return [150 + r * Math.cos(a), 150 + r * Math.sin(a)];
    };

    let body;
    if (tab === "ov") {
      const poly = DM.map((d, i) =>
        P(i, ok(i) ? 100 : 14)
          .map((v) => v.toFixed(1))
          .join(","),
      ).join(" ");
      body = (
        <div className="rg">
          <svg viewBox="-30 0 360 300" role="img" aria-label="Radar chart of results by domain">
            {[33, 66, 100].map((r) => (
              <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="#ffffff30" strokeDasharray="3 4" />
            ))}
            {DM.map((d, i) => {
              const [x, y] = P(i, 100);
              const [lx, ly] = P(i, 128);
              return (
                <g key={d}>
                  <line x1="150" y1="150" x2={x} y2={y} stroke="#ffffff22" />
                  <text
                    x={lx}
                    y={ly}
                    fill={ok(i) ? "#86efac" : "#fda4af"}
                    fontSize="12"
                    fontWeight="600"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {d}
                  </text>
                </g>
              );
            })}
            <polygon points={poly} fill="#8b7bff66" stroke="#a99bff" strokeWidth="2" />
            <circle cx="150" cy="150" r="38" fill="#0b0c2a" stroke="#a99bff" strokeWidth="3" />
            <text x="150" y="152" fill="#fff" fontSize="26" fontWeight="700" textAnchor="middle">
              {pc}
            </text>
            <text x="150" y="170" fill="#c9ccf0" fontSize="9" textAnchor="middle">
              % SCORE
            </text>
          </svg>
          <div>
            <div style={{ color: "#c9ccf0" }}>Your CNAPP assessment result</div>
            <div className="lv">{lvl}</div>
            <p>
              You answered <b>{sc} of {n}</b> correctly in {Math.floor(s / 60)}m {s % 60}s. The
              pass mark is {PASS_MARK}%
              {pc >= PASS_MARK
                ? ", and you passed."
                : ". Open the Roadmap tab and revisit the modules marked in red."}
            </p>
            {DM.map((d, i) => (
              <div className="br" key={d}>
                <span>{d}</span>
                <i>
                  <b
                    style={{
                      width: `${ok(i) ? 100 : 12}%`,
                      background: ok(i) ? "#4ade80" : "#fb7185",
                    }}
                  />
                </i>
                <b style={{ color: ok(i) ? "#4ade80" : "#fb7185" }}>{ok(i) ? "Right" : "Miss"}</b>
              </div>
            ))}
            <p style={{ color: "#c9ccf0", marginTop: 10 }}>Best score so far: {PG.best ?? pc}%</p>
          </div>
        </div>
      );
    } else if (tab === "mi") {
      body = miss.length ? (
        miss.map((i) => (
          <div className="mi" key={i}>
            <b>
              {i + 1}. {Q[i][0]}
            </b>
            <br />
            Your answer: {Q[i][1][ch[i]]}
            <br />
            <span style={{ color: "#86efac" }}>Correct: {Q[i][1][Q[i][2]]}</span>
            <br />
            <small style={{ color: "#c9ccf0" }}>{Q[i][3]}</small>
          </div>
        ))
      ) : (
        <p>No mistakes. Every answer was correct.</p>
      );
    } else {
      body = (
        <>
          <p style={{ color: "#c9ccf0" }}>Built from your answers. Your weakest areas come first.</p>
          <ol className="steps">
            {miss.map((i) => (
              <li key={i}>
                <b>{DM[i]}:</b> revisit{" "}
                <a href={`#${RM[i][0]}`} onClick={go(RM[i][0])}>
                  {RM[i][1]}
                </a>
                {RM[i][2] ? (
                  <>
                    , then practice in the {RM[i][2]} lab (
                    <a href="#lab" onClick={go("lab")}>
                      open labs
                    </a>
                    )
                  </>
                ) : null}
                .
              </li>
            ))}
            {pc >= PASS_MARK ? (
              <li>
                <b>Next:</b> finish all three{" "}
                <a href="#lab" onClick={go("lab")}>
                  labs
                </a>{" "}
                and track them in{" "}
                <a href="#progress" onClick={go("progress")}>
                  My progress
                </a>
                .
              </li>
            ) : (
              <li>
                <b>Then:</b> retake the assessment and aim for {PASS_MARK}% or more.
              </li>
            )}
          </ol>
        </>
      );
    }

    return (
      <div className="rp">
        <div className="rt">
          {[
            ["ov", "Overview"],
            ["mi", `Mistakes (${miss.length})`],
            ["rm", "Roadmap"],
          ].map((t) => (
            <button
              key={t[0]}
              type="button"
              className={t[0] === tab ? "on" : ""}
              onClick={() => setTab(t[0])}
            >
              {t[1]}
            </button>
          ))}
        </div>
        {body}
        <p style={{ margin: "16px 0 0" }}>
          <button type="button" className="btn" onClick={connectWithReport}>
            Connect with ILM ORA
          </button>{" "}
          <button type="button" className="btn alt" onClick={retake}>
            Retake assessment
          </button>
        </p>
      </div>
    );
  };

  /* ═════════ JSX ═════════ */
  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="cnapp" data-theme={theme}>
        {/* ── sticky section nav (navbar ke niche) ── */}
        <div className="cn-sticky">
          <nav className="sn" ref={navRef} aria-label="Sections">
            {SEC.map(([k, label]) => (
              <a
                key={k}
                href={`#${k}`}
                data-s={k}
                className={k === active ? "on" : ""}
                onClick={go(k)}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="cn-wrap">
          {/* ───────── HERO ───────── */}
          <section id={sid("hero")} className="cn-herosec">
            <div className="cn-herobox">
              <div className="cn-heroov" />
              <div className="hero">
                <div>
                  <span className="badge">Hands-on cloud security course</span>
                  <h1>
                    Secure cloud and AI apps <em>from build to runtime</em>
                  </h1>
                  <p className="lead">
                    Learn cloud security from build to runtime. Practice in labs, then check your
                    level.
                  </p>
                  <div className="row">
                    <a className="btn" href="#why" onClick={go("why")}>
                      Start learning
                    </a>
                    <a className="btn alt" href="#quiz" onClick={go("quiz")}>
                      Check my level
                    </a>
                  </div>
                  <div className="stats">
                    <div>
                      <b>{COMP.length}</b>Components
                    </div>
                    <div>
                      <b>{GROUPS.length - 1}</b>Domains
                    </div>
                    <div>
                      <b>{Q.length}</b>Quiz questions
                    </div>
                    <div>
                      <b>{LABS.length}</b>Live labs
                    </div>
                  </div>
                  <div className="chk">
                    <span>Scored assessment</span>
                    <span>Personal roadmap</span>
                    <span>Progress tracking</span>
                  </div>
                </div>
                <div className="cn-media">
                  <div className="cn-photo">
                    {(HERO_IMAGE || IMAGES[0]) && (
                      <img
                        src={HERO_IMAGE || IMAGES[0]}
                        alt="Engineer working on cloud security"
                        loading="eager"
                      />
                    )}
                  </div>
                  {HERO_VIDEO && (
                    <div className="cn-vid">
                      <video
                        src={HERO_VIDEO}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                      />
                      <span className="cn-live">Live labs</span>
                    </div>
                  )}
                  {["CSPM", "CWPP", "CIEM"].map((n, i) => (
                    <span className={`cn-chip c${i + 1}`} key={n}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ───────── PARTNERS ───────── */}
          <section id={sid("partners")}>
            <h2>Technology partners</h2>
            <Marquee
              items={PARTNERS}
              min={14}
              speed={2.4}
              render={(p, _i, dup) => <PartnerChip p={p} dup={dup} />}
            />
          </section>

          {/* ───────── OVERVIEW ───────── */}
          <section id={sid("overview")}>
            <h2>What is a CNAPP?</h2>
            <p className="lead">
              One platform that protects cloud and AI apps across their lifecycle.
            </p>
            <div className="flow">
              <div>
                Code<small>IaC and open-source scanning</small>
              </div>
              <div>
                Build<small>Container and registry checks</small>
              </div>
              <div>
                Deploy<small>Posture and compliance gates</small>
              </div>
              <div>
                Runtime<small>Workload protection and CDR</small>
              </div>
            </div>
            <ul className="df">
              <li>
                A unified approach that protects cloud-native and AI-assisted apps and their
                infrastructure.
              </li>
              <li>It continuously evaluates risk across the entire app lifecycle.</li>
              <li>It aligns protection with build and operations, so teams stay fast.</li>
            </ul>
            <h3 style={{ marginTop: 22 }}>Key takeaways</h3>
            <Marquee items={KT} render={cardRender} />
          </section>

          <Banner
            img={IMAGES[0]}
            title="From code to cloud, one view of risk"
            text="See how posture, identity and runtime signals connect into a single picture."
          />

          {/* ───────── WHY ───────── */}
          <section id={sid("why")}>
            <h2>Why CNAPPs matter</h2>
            <p className="lead">Five reasons separate tools fall short.</p>
            <Marquee items={WHY} render={cardRender} />
          </section>

          {/* ───────── COMPONENTS ───────── */}
          <section id={sid("components")}>
            <h2>Key components</h2>
            <p className="lead">Core capabilities working as one system.</p>
            <div className="chips">
              {GROUPS.map((g) => (
                <button
                  key={g}
                  type="button"
                  className={g === grp ? "on" : ""}
                  onClick={() => setGrp(g)}
                >
                  {g}
                </button>
              ))}
            </div>
            <Marquee
              key={grp}
              items={compItems}
              render={(c, _i, dup) => <Card tag={c[0]} title={c[1]} text={c[2]} dup={dup} />}
            />
          </section>

          {/* ───────── BENEFITS ───────── */}
          <section id={sid("benefits")}>
            <h2>Benefits</h2>
            <p className="lead">What teams gain from one platform.</p>
            <Marquee items={BEN} render={cardRender} />
          </section>

          {/* ───────── COMPARE ───────── */}
          <section id={sid("compare")}>
            <h2>CNAPP vs traditional tools</h2>
            <p className="lead">Point products versus a CNAPP.</p>
            <div className="scroll">
              <table>
                <tbody>
                  <tr>
                    <th>Area</th>
                    <th>Traditional tools</th>
                    <th>CNAPP</th>
                  </tr>
                  <tr>
                    <td>Approach</td>
                    <td>Reactive, waits for issues</td>
                    <td>Proactive, spots risk early</td>
                  </tr>
                  <tr>
                    <td>Scope</td>
                    <td>Point solutions (CSPM, CWPP, IAM)</td>
                    <td>One view across workloads, apps and infrastructure</td>
                  </tr>
                  <tr>
                    <td>Alerts</td>
                    <td>Isolated, hard to rank</td>
                    <td>Contextual and prioritized</td>
                  </tr>
                  <tr>
                    <td>Teams</td>
                    <td>Security and dev in silos</td>
                    <td>Shared workflow across security, dev and ops</td>
                  </tr>
                  <tr>
                    <td>Environments</td>
                    <td>Gaps across clouds</td>
                    <td>Consistent in hybrid and multicloud</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 style={{ marginTop: 22 }}>Unified platform advantages</h3>
            <div className="grid">
              <div className="card">
                <h3>Fewer overlapping tools</h3>
                <p>Less fragmentation.</p>
              </div>
              <div className="card">
                <h3>Clear hybrid and multicloud insight</h3>
                <p>One view across environments.</p>
              </div>
              <div className="card">
                <h3>Smoother collaboration</h3>
                <p>Security, development and operations work together.</p>
              </div>
            </div>
            <p style={{ marginTop: 14 }}>
              <b>CNAPP vs CDR:</b> a CNAPP includes CDR and adds posture, identity, container and
              API protection.
            </p>
          </section>

          {/* ───────── USE CASES ───────── */}
          <section id={sid("usecases")}>
            <h2>Use cases</h2>
            <Marquee items={USE} render={cardRender} />
          </section>

          {/* ───────── ROADMAP ───────── */}
          <section id={sid("roadmap")}>
            <h2>Implementation roadmap</h2>
            <p className="lead">Plan first, then roll out in steps.</p>
            <ol className="steps">
              <li>
                <b>Align with business goals.</b> Tailor the plan to your size, industry and
                objectives.
              </li>
              <li>
                <b>Inventory and map dependencies.</b> Catalog workloads, critical assets and
                sensitive data.
              </li>
              <li>
                <b>Evaluate current posture.</b> Set baselines, find gaps and set realistic
                timelines.
              </li>
              <li>
                <b>Account for regulation.</b> Build required compliance standards into the plan.
              </li>
              <li>
                <b>Design for developers.</b> Reduce friction and false positives.
              </li>
            </ol>
            <h3>Best practices</h3>
            <Marquee items={BP} render={cardRender} />
          </section>

          {/* ───────── SOLUTIONS ───────── */}
          <section id={sid("solutions")}>
            <h2>Choosing a solution</h2>
            <p className="lead">Look for a unified platform with breadth and depth.</p>
            <Marquee items={CH} render={cardRender} />
            <p style={{ marginTop: 14 }}>
              <b>Future-proof:</b> pick a mature platform that supports new technologies, evolving
              threats, changing compliance and AI-assisted apps.
            </p>
          </section>

          {/* ───────── GALLERY (videos) — unique clips, text left / video right ───────── */}
          {VIDEOS && VIDEOS.length > 0 && (
            <section id={sid("gallery")}>
              <h2>See it in action</h2>
              <p className="lead">Short clips from the world of cloud and AI security.</p>
              <div className="cn-vrows">
                {[...new Set(VIDEOS)].map((v, i) => {
                  const info = VIDEO_INFO[i] || ["Clip", `Video ${i + 1}`, "", []];
                  return (
                    <article className="cn-vrow" key={v}>
                      <div className="cn-vtext">
                        <span className="cn-vnum">{String(i + 1).padStart(2, "0")}</span>
                        <span className="tag">{info[0]}</span>
                        <h3>{info[1]}</h3>
                        {info[2] && <p>{info[2]}</p>}
                        {info[3].length > 0 && (
                          <ul className="cn-vpills">
                            {info[3].map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="cn-vmedia">
                        <video
                          src={`${v}#t=0.1`}
                          controls
                          playsInline
                          preload="metadata"
                          aria-label={info[1]}
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <Banner
            img={IMAGES[1]}
            title="Learn by doing"
            text="Fix findings, break the attack path and unlock the deployment gate."
          />

          {/* ───────── LABS ───────── */}
          <section id={sid("lab")}>
            <h2>Practical labs</h2>
            <p className="lead">Three hands-on labs. Fix findings and unlock the gate.</p>
            <div className="chips">
              {LABS.map((l, i) => (
                <button
                  key={l.n}
                  type="button"
                  className={i === li ? "on" : ""}
                  onClick={() => setLi(i)}
                >
                  {l.n}
                </button>
              ))}
            </div>
            <p style={{ color: "var(--mute)" }}>{lab.L.b}</p>

            <div className="score">
              <div>
                <div className="num">{lab.risk}</div>
                <small>Risk score</small>
              </div>
              <div className="meter">
                <i
                  style={{
                    width: `${(lab.risk / lab.max) * 100}%`,
                    background:
                      lab.risk > 50 ? "var(--bad)" : lab.risk > 25 ? "var(--warn)" : "var(--ok)",
                  }}
                />
              </div>
              <div className="chips" style={{ margin: 0, display: lab.L.ctx ? "" : "none" }}>
                <button
                  type="button"
                  className={sortMode === "sev" ? "on" : ""}
                  onClick={() => setSortMode("sev")}
                >
                  Severity only
                </button>
                <button
                  type="button"
                  className={sortMode === "ctx" ? "on" : ""}
                  onClick={() => setSortMode("ctx")}
                >
                  CNAPP context
                </button>
              </div>
            </div>

            <div className={`path ${lab.ok ? "safe" : "live"}`}>
              {lab.L.ctx ? (
                lab.ok ? (
                  "Attack path broken. The chain Internet to VM to role to customer data can no longer be completed."
                ) : (
                  <>
                    Active attack path: <span>Internet</span> to <span>vm-web-01</span> to{" "}
                    <span>role/app-deployer</span> to <span>st-customers (PII)</span>
                  </>
                )
              ) : lab.ok ? (
                "Deployment gate passed. No Critical or High findings remain."
              ) : (
                "Deployment gate blocked: Critical or High findings are still open."
              )}
            </div>

            <div>
              {lab.list.map((f) => {
                const isDone = lab.d.has(f.id);
                return (
                  <div className={`f${isDone ? " done" : ""}`} key={f.id}>
                    <span className={`sev ${f.sev}`}>{f.sev}</span>
                    <div>
                      <span className="res">{f.res}</span>
                      <small>
                        {f.t}
                        {lab.ctxSort && f.path ? (
                          <>
                            {" "}
                            <b style={{ color: "var(--bad)" }}>On attack path: {f.why}</b>
                          </>
                        ) : null}
                      </small>
                    </div>
                    <button
                      type="button"
                      className="btn"
                      disabled={isDone}
                      onClick={() => fixFinding(f.id)}
                    >
                      {isDone ? "Fixed" : f.fix}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="msg" role="status">
              {lab.risk < LAB_PASS_RISK
                ? `Lab complete. Risk score ${lab.risk}.`
                : lab.ok
                  ? `Good move. The gate is open. Keep reducing risk below ${LAB_PASS_RISK}.`
                  : ""}
            </div>
            <button type="button" className="btn alt" onClick={resetLab}>
              Reset lab
            </button>
          </section>

          <Banner
            img={IMAGES[2]}
            title="Test yourself"
            text="Take the scored assessment and see where you stand in 8 questions."
          />

          {/* ───────── ASSESSMENT ───────── */}
          <section id={sid("quiz")}>
            <h2>Assessment</h2>
            <p className="lead">Eight questions. Pick an answer and the next one opens.</p>
            <div id="cn-qz">{R ? renderReport() : renderQuizBody()}</div>
          </section>

          {/* ───────── PROGRESS ───────── */}
          <section id={sid("progress")}>
            <h2>My progress</h2>
            <p className="lead">Saved in this browser.</p>
            <div className="score">
              <div>
                <div className="num">{pct}%</div>
                <small>Complete</small>
              </div>
              <div className="meter">
                <i style={{ width: `${pct}%`, background: "var(--acc)" }} />
              </div>
            </div>
            <div className="grid">
              {ITEMS.map((i) => (
                <div className="card" key={i[0]}>
                  <b>{PG[i[0]] ? "Done: " : "To do: "}</b>
                  {i[1]}
                </div>
              ))}
              {PG.best != null && (
                <div className="card">
                  <b>Best assessment score:</b> {PG.best}%
                </div>
              )}
            </div>
          </section>

          {/* ───────── RESOURCES ───────── */}
          <section id={sid("resources")}>
            <h2>Resources</h2>
            <div className="grid" style={{ marginTop: 14 }}>
              <div className="card">
                <span className="tag">Practice</span>
                <h3>Practical labs</h3>
                <p>Posture, IaC and container labs.</p>
                <p style={{ marginTop: 12 }}>
                  <a className="btn alt" href="#lab" onClick={go("lab")}>
                    Open labs
                  </a>
                </p>
              </div>
              <div className="card">
                <span className="tag">Test</span>
                <h3>Assessment and report</h3>
                <p>Scored report with a personal roadmap.</p>
                <p style={{ marginTop: 12 }}>
                  <a className="btn alt" href="#quiz" onClick={go("quiz")}>
                    Take assessment
                  </a>
                </p>
              </div>
              <div className="card">
                <span className="tag">Guide</span>
                <h3>Implementation roadmap</h3>
                <p>Steps and best practices.</p>
                <p style={{ marginTop: 12 }}>
                  <a className="btn alt" href="#roadmap" onClick={go("roadmap")}>
                    Read guide
                  </a>
                </p>
              </div>
              <div className="card">
                <span className="tag">Support</span>
                <h3>Talk to a mentor</h3>
                <p>Ask the ILM ORA team.</p>
                <p style={{ marginTop: 12 }}>
                  <a className="btn alt" href="#connect" onClick={go("connect")}>
                    Connect
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* ───────── CONNECT ───────── */}
          <section id={sid("connect")}>
            <h2>Connect with ILM ORA</h2>
            <p className="lead">Share your goal and your report. We reply by email.</p>
            <div className="cn">
              <div className="card">
                <h3>How we can help</h3>
                <p>Course enrollment</p>
                <p>Corporate training</p>
                <p>Mentor call</p>
              </div>
              <div className="card">
                <div className="fg">
                  <label>
                    Name
                    <input
                      value={fn}
                      onChange={(e) => setFn(e.target.value)}
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      value={fe}
                      onChange={(e) => setFe(e.target.value)}
                      autoComplete="email"
                    />
                  </label>
                  <label>
                    Phone (optional)
                    <input type="tel" value={fp} onChange={(e) => setFp(e.target.value)} />
                  </label>
                  <label>
                    I am interested in
                    <select value={fi} onChange={(e) => setFi(e.target.value)}>
                      <option>Course enrollment</option>
                      <option>Corporate training</option>
                      <option>Mentor call</option>
                    </select>
                  </label>
                </div>
                <label>
                  Message
                  <textarea
                    ref={msgRef}
                    rows={4}
                    value={fm}
                    onChange={(e) => setFm(e.target.value)}
                  />
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={fa}
                    onChange={(e) => setFa(e.target.checked)}
                    style={{ width: "auto" }}
                  />{" "}
                  Include my assessment report
                </label>
                <div className="row" style={{ margin: 0 }}>
                  <button type="button" className="btn" onClick={sendMsg}>
                    Send message
                  </button>
                  <button type="button" className="btn alt" onClick={copyMsg}>
                    Copy message
                  </button>
                </div>
                <div className="msg" role="status">
                  {fs}
                </div>
              </div>
            </div>
          </section>

          {/* ───────── FAQ ───────── */}
          <section id={sid("faq")}>
            <h2>FAQs</h2>
            <div>
              {FAQ.map((q) => (
                <details key={q[0]}>
                  <summary>{q[0]}</summary>
                  <p>{q[1]}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ───────── CTA BAND ───────── */}
          <div
            className={`band${IMAGES[3] ? " cn-bandimg" : ""}`}
            style={
              IMAGES[3]
                ? {
                    backgroundImage: `linear-gradient(135deg,rgba(23,23,34,.92),rgba(45,31,85,.82)), url(${IMAGES[3]})`,
                  }
                : undefined
            }
          >
            <div>
              <h2>Ready to test your cloud security skills?</h2>
              <p>Take the scored assessment and get a personal learning roadmap.</p>
            </div>
            <a className="btn" href="#quiz" onClick={go("quiz")}>
              Start assessment
            </a>
          </div>

        </div>

        {showUp && (
          <button
            type="button"
            className="up"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            &#8593;
          </button>
        )}
      </div>
    </PublicLayout>
  );
}