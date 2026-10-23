// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Eye, MessageSquare, Heart, TrendingUp, RefreshCw, Lightbulb, Shirt, Sparkles,
//   Users, Search, Flag, ClipboardList, X, CheckCircle2, ArrowRight, Route, Target,
//   Brain, ShieldCheck, AlertTriangle,
// } from "lucide-react";
// // Same shared shell used by ManagerHub / StudentHub (navbar + footer).
// import PublicLayout from "../Landing/components/PublicLayout";
// import body1 from "@/assets/body-1.webp";
// import body2 from "@/assets/body-2.webp";

// /* ═══ THEME (same tokens as Manager Hub) ═══ */
// const DARK = {
//   pageBg: "#000000", cardBg: "#111827", border: "#1F2937", borderHov: "#374151",
//   text: "#ffffff", textSub: "#CBD5E1", textMuted: "#94A3B8",
//   pillBg: "rgba(255,255,255,0.06)", barBg: "rgba(255,255,255,0.10)", shadow: "0 4px 20px rgba(0,0,0,0.45)",
// };
// const LIGHT = {
//   pageBg: "#F8FAFC", cardBg: "#ffffff", border: "#E5E7EB", borderHov: "#D1D5DB",
//   text: "#1E293B", textSub: "#475569", textMuted: "#94A3B8",
//   pillBg: "#F1F5F9", barBg: "#E2E8F0", shadow: "0 1px 3px rgba(15,23,42,0.08)",
// };

// /* ═══ BACKEND ═══
//    Set NEXT_PUBLIC_PD_API_URL in .env.local (e.g. https://api.ilmora.texora.ai/pd/register).
//    POST JSON. Success only if the server replies 2xx with {"ok":true,"emailSent":true|false,"message":"optional"}.
//    Errors: non-2xx with {"ok":false,"error":"reason"}. */
// const API_URL = process.env.NEXT_PUBLIC_PD_API_URL || "";
// const TIMEOUT_MS = 15000;
// // Body-language images come from src/assets (body-1, body-2).
// const IMG_POSTURE = body1?.src || body1;
// const IMG_ARMS = body2?.src || body2;

// async function submitRegistration(data) {
//   if (!API_URL) throw new Error("not-configured");
//   const ac = new AbortController();
//   const to = setTimeout(() => ac.abort(), TIMEOUT_MS);
//   try {
//     const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), signal: ac.signal });
//     let j = null;
//     try { j = await res.json(); } catch {}
//     if (!res.ok || !j || j.ok !== true) throw new Error((j && j.error) || `server-${res.status}`);
//     return j;
//   } finally { clearTimeout(to); }
// }
// function regErr(e) {
//   if (e?.message === "not-configured") return "Registration is not available yet because the server is not connected. Nothing was saved.";
//   if (e?.name === "AbortError") return "The server took too long to respond, so your registration is not confirmed. Please try again.";
//   if (e instanceof TypeError) return "Could not reach the server. Check your connection and try again.";
//   if (e?.message && !/^server-/.test(e.message)) return e.message;
//   return `The server could not save your registration (${e?.message || "unknown error"}). Please try again.`;
// }

// /* ═══ DATA ═══ */
// const STAGES = [["Know", 1, 7, "#0e8fa8", "What did you learn about your strengths, habits and triggers?"], ["Express", 8, 14, "#f97316", "Where did your communication or body language help or hurt this week?"], ["Balance", 15, 21, "#22c55e", "What helped you stay calm, and what would you do differently next time?"], ["Execute", 22, 30, "#c2410c", "Which habits will you keep, and how will you stay consistent?"]];
// const stageColor = (d) => (STAGES.find((s) => d <= s[2]) || STAGES[3])[3];
// const TASKS = ["List 5 strengths and 3 weaknesses. Write one real example for each.", "Write down the habits you repeat daily. Mark each as helpful or unhelpful.", "Pick one habit that holds you back and note what usually triggers it.", "Choose one habit to drop first and write a replacement action.", "Log each moment of stress, anger or worry today, with its trigger.", "Ask one trusted person: what do I do well, and what should I improve?", "Review the week: what surprised you about yourself? Write three lines.", "In one conversation, let the person finish, then summarise before you reply.", "Explain something you know in 30 seconds, out loud.", "Sit upright with relaxed shoulders through one full meeting or call.", "Keep steady eye contact (about 3 seconds at a time) in one conversation.", "Rewrite one email or message so it is shorter and clearer.", "Use an “I” statement once today: I feel … when … because …", "Ask for feedback on how you came across this week. Write three lines.", "When you feel tension, pause: breathe in for 4, out for 6, then respond.", "Name your emotion precisely three times today (“frustrated”, not “bad”).", "Spend 10 minutes on a task you have been avoiding.", "Politely say no to one request you do not have time for.", "Write down a recent mistake and one lesson from it, without self-blame.", "Replace “I can’t do this” with “I can’t do this yet” and take one small step.", "Review the week: when did you stay calm, and when not? Write three lines.", "Set one clear goal for the next 30 days and write the first step.", "Break the goal into three weekly actions and put them in your calendar.", "Choose 3 habits to keep long term and write when you will do each.", "Do all 3 habits today and tick them off.", "Help someone with a task or share something you learned.", "Review a past mistake as data: what happened, and what would you change?", "Do all 3 habits again and note what made it easy or hard.", "Retake the self-check on this page and compare it with your first result.", "Write your 30-day review: what changed, what stays, what is next?"];
// const MILES = [[1, "Baseline audit", null, "n"], [5, "Track your triggers", Eye, "b"], [10, "Active listening", MessageSquare, "t"], [15, "Emotional pause", Heart, "b"], [20, "Growth mindset", TrendingUp, "t"], [25, "Habits in action", RefreshCw, "b"], [30, "Review and re-test", null, "n"]];
// const MX = [110, 240, 370, 500, 630, 760, 890];
// const RIBBON = "M110 250C175 250 175 130 240 130S305 250 370 250S435 130 500 130S565 250 630 250S695 130 760 130S825 250 890 250";

// const LESSONS = [
//   ["Self-awareness and personal growth", "in", "Self-awareness is noticing your thoughts, feelings and habits as they happen. Growth starts with an honest baseline, not a target.", "You snap at a teammate after a long day. Later you ask: was it their comment, or was I already tired and stressed?", ["What am I good at that others notice?", "Which situation makes me react in a way I regret?", "Which habit would a close friend ask me to change?"], "Keep a five-minute evening log for three days: what happened, what you felt, what you did, and what you would repeat."],
//   ["Emotional intelligence and confidence", "in", "Emotional intelligence means recognising your emotions, managing them, and reading other people’s. Confidence grows from small proof that you can handle hard things.", "Your manager criticises your report. Instead of defending at once, you breathe, ask which part to fix first, and reply calmly.", ["What emotion did I feel most today, and what caused it?", "What did I avoid this week because I feared failing?", "What is one small uncomfortable step I can take tomorrow?"], "Emotional Pause: when tension rises, breathe in for 4 and out for 6, name the feeling in one word, then choose your response."],
//   ["Communication and active listening", "ex", "Good communication has two halves: saying things clearly and listening to understand. Many conflicts come from skipping the second half.", "A colleague says the deadline is impossible. You reply, “So testing time is the main problem?” before offering a fix. They feel heard and the talk turns practical.", ["When did I last interrupt someone, and what was I afraid of missing?", "Can I state my main point in two sentences?", "Do people leave my conversations clear on what happens next?"], "Summarise before replying: in each conversation today, repeat the other person’s point in your own words before you answer."],
//   ["Body language and professional etiquette", "ex", "People read posture, eye contact and tone before they weigh your words. Etiquette is the shared habit of being punctual, respectful and clear. Cues vary by culture, so treat them as hints, not proof.", "In an interview you sit upright, keep your hands visible, nod while listening and arrive ten minutes early. You look prepared before you speak.", ["What does my posture say when I am nervous?", "Do I look at the person speaking, or at my phone?", "Am I on time and prepared for meetings?"], "Record a one-minute video of yourself explaining your day. Watch it muted and note posture, hands and expression. Fix one thing."],
// ];

// const PN = ["Self-Awareness", "Communication", "Emotional Balance", "Confidence", "Discipline"];
// const OPT = ["Never", "Rarely", "Sometimes", "Often", "Always"];
// const QS = ["I can name my main strengths and weak spots without hesitation.", "I notice what triggers my stress or anger before it takes over.", "In conversations, I let people finish before I reply.", "I can explain my main point clearly in a few sentences.", "When I am upset, I pause before reacting.", "I recover from setbacks within a reasonable time.", "I speak up in groups when I have something useful to say.", "I try tasks that make me uncomfortable.", "I finish what I commit to, even when motivation is low.", "I follow a routine or plan for my goals."];
// const RECS = ["Do the Week 1 tasks: a strengths audit and a trigger log (days 1–7).", "Practise summarising before replying in at least two conversations a day (Week 2).", "Use the Emotional Pause: breathe, name the feeling, then respond (Week 3).", "Do one small uncomfortable task a day and note what happened (Week 3).", "Pick three habits and tick them off for the rest of the 30 days (Week 4)."];
// const band = (p) => (p >= 70 ? ["Strength", "#16a34a"] : p >= 45 ? ["Developing", "#d97706"] : ["Focus area", "#dc2626"]);

// const MBTI = [["INTJ", "Architect", "Analysts"], ["INTP", "Logician", "Analysts"], ["ENTJ", "Commander", "Analysts"], ["ENTP", "Debater", "Analysts"], ["INFJ", "Advocate", "Diplomats"], ["INFP", "Mediator", "Diplomats"], ["ENFJ", "Protagonist", "Diplomats"], ["ENFP", "Campaigner", "Diplomats"], ["ISTJ", "Logistician", "Sentinels"], ["ISFJ", "Defender", "Sentinels"], ["ESTJ", "Executive", "Sentinels"], ["ESFJ", "Consul", "Sentinels"], ["ISTP", "Virtuoso", "Explorers"], ["ISFP", "Adventurer", "Explorers"], ["ESTP", "Entrepreneur", "Explorers"], ["ESFP", "Entertainer", "Explorers"]];
// const GCOL = { Analysts: "#7c3aed", Diplomats: "#16a34a", Sentinels: "#2563eb", Explorers: "#d97706" };
// const RULES = [["Know Yourself", "Understand your strengths, limitations, habits and emotional triggers."], ["Keep Learning", "Skills expand through deliberate practice and feedback."], ["Listen First", "Seek to understand before attempting to be understood."], ["Control Your Response", "You cannot control every situation, but you control your choices and reactions."], ["Take Ownership", "Accept full responsibility for commitments, mistakes and progress."], ["Stay Adaptable", "Adjust tactics immediately when new data or circumstances require it."], ["Invest in Others", "True development lifts and empowers the teams around you."]];
// const FAQ = [["Is the self-check a medical or clinical test?", "No. It is a short self-reported reflection tool and cannot diagnose anything. If you are struggling with your mental health, please speak to a qualified professional."], ["Can personality really change?", "Core tendencies stay fairly stable, but habits, skills and how you respond can change with regular practice. That is what the 30-day plan trains."], ["Does my MBTI type limit how far I can grow?", "No. MBTI describes natural preferences, not intelligence, ability or character. Your choices and habits matter more than a four-letter type."], ["How much time does the plan need each day?", "Most tasks take 10 to 30 minutes. You can note your preferred daily time when you register."], ["Is my progress saved?", "Tracker progress, reflections and self-check results are saved in this browser on this device only. Clearing browser data removes them."], ["What do the assessments cost?", "The first two assessments are free. From the third one it is ₹199."]];
// const STEPS = [["Explore", "Read the lessons, 30-day plan, 16 types and golden rules. No sign-up needed.", "#0e8fa8"], ["Assess", "Register with the form. Your assessment link is sent once email delivery is active.", "#f97316"], ["Improve and re-test", "Follow your plan, then take Assessment 2 and compare your growth.", "#22c55e"], ["Keep growing", "Assessment 3 onwards is ₹199, with a new report each time.", "#8b5cf6"]];

// /* ═══ HELPERS ═══ */
// function useLS(key, init) {
//   const [v, setV] = useState(init);
//   const [ok, setOk] = useState(true);
//   useEffect(() => { try { const s = localStorage.getItem(key); if (s) setV(JSON.parse(s)); } catch {} }, [key]);
//   const set = (n) => setV((p) => { const x = typeof n === "function" ? n(p) : n; try { localStorage.setItem(key, JSON.stringify(x)); } catch { setOk(false); } return x; });
//   return [v, set, ok];
// }
// function Marquee({ items, rev, d = 45 }) {
//   return (
//     <div className="pd-mq">
//       <div className={`pd-mq-track${rev ? " rev" : ""}`} style={{ animationDuration: `${d}s` }}>
//         {[...items, ...items.map((n, i) => <div key={`d${i}`} aria-hidden="true">{n.props.children}</div>)].map((n, i) => (n.key?.startsWith?.("d") ? n : <div key={i}>{n.props.children}</div>))}
//       </div>
//     </div>
//   );
// }
// const Head = ({ badge, title, sub }) => (
//   <div className="pd-head"><h2 dangerouslySetInnerHTML={{ __html: title }} />{sub && <p>{sub}</p>}</div>
// );

// // Smooth-scroll without adding #hash to the URL
// const goTo = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };

// /* ═══ HOW TO IDENTIFY PERSONALITY ═══ */
// // [title, short line, side, row, icon, detail]
// const IDENTIFY = [
//   ["Communication style", "Clear, listens before replying", "L", 0, MessageSquare, "Do they speak clearly, let others finish and ask questions? Good listening says more than fluent talking."],
//   ["Body language", "Posture, eye contact, gestures", "L", 1, Eye, "Notice posture, eye contact and expression over time. Cues vary by culture and nerves, so treat them as hints, not proof."],
//   ["Behaviour with others", "Respect for everyone", "L", 2, Users, "Watch how they treat people who cannot help them: juniors, support staff, strangers, waiters."],
//   ["Emotional responses", "Calm or reactive under stress", "R", 0, Heart, "See how they handle pressure, criticism and delays. Self-control matters more than never feeling upset."],
//   ["Confidence & decisions", "Owns choices and attitude", "R", 1, TrendingUp, "Look for calm confidence, openness to feedback and willingness to own a decision. Loudness is not confidence."],
//   ["Words match actions", "Consistency over time", "R", 2, Target, "Do promises, stated values and actions line up again and again? Consistency over weeks is the strongest signal."],
// ];
// const CAUTION = [
//   ["Appearance is not personality.", "Clothes, accent, looks or a profile photo cannot tell you who someone really is."],
//   ["One moment is not a pattern.", "A bad day, nerves or a mood can hide someone’s usual behaviour. Look for repeats across situations and time."],
//   ["Beware of false identity.", "People can show a polished image online or in a short meeting. Verify claims and watch behaviour over time."],
//   ["Do not label quickly.", "Treat what you notice as questions to explore. Never use it as the only basis for hiring, promotion or judging someone."],
// ];
// const INTERNAL = [
//   ["Self-awareness & mindset", Brain, "Knowing your strengths, habits and triggers, and believing you can grow."],
//   ["Emotional balance & regulation", Heart, "Noticing feelings early and choosing a calm response."],
//   ["Confidence & resilience", TrendingUp, "Trusting yourself and recovering after setbacks."],
//   ["Integrity, values & discipline", ShieldCheck, "Doing the right thing and following through, even when no one is watching."],
//   ["Personal responsibility", ClipboardList, "Owning commitments, mistakes and progress without excuses."],
// ];
// const EXTERNAL = [
//   ["Communication & active listening", MessageSquare, "Saying things clearly and listening to understand before you reply."],
//   ["Body language & posture", Eye, "Upright posture, steady eye contact and open gestures show confidence."],
//   ["Respectful behaviour & empathy", Heart, "Treating everyone with courtesy and understanding how they feel."],
//   ["Dressing & personal hygiene", Shirt, "Clean, neat and suitable for the setting. It shows care, not wealth."],
//   ["Professional etiquette", Sparkles, "Being punctual, prepared, polite and clear in every interaction."],
//   ["Leadership & collaboration", Flag, "Taking initiative, sharing credit and helping the team move forward."],
// ];

// const IDENT_CSS = `
// .pd-ill{width:100%;max-width:640px;margin:0 auto;display:block}
// .pd-ic{width:38px;height:38px;border-radius:11px;background:var(--c);display:flex;align-items:center;justify-content:center;flex:none}
// .pd-idc{display:flex;gap:12px;align-items:flex-start;border-top:3px solid var(--c)}
// .pd-idc .pd-h3{margin-bottom:3px}.pd-idc .pd-sub{margin-bottom:0}
// .pd-fcard{border-top:4px solid var(--c)}.pd-fcard .pd-ic{margin-bottom:10px}.pd-fcard .pd-sub{margin-bottom:0}
// #pd-identify .pd-mq-track>div,#pd-external .pd-mq-track>div{flex-basis:clamp(270px,24vw,330px)}
// .pd-warn{margin-top:14px;border-color:#d97706;background:rgba(217,119,6,.08)}
// .pd-warn-h{display:flex;align-items:center;gap:8px;color:#d97706;margin-bottom:4px}.pd-warn-h .pd-h3{color:inherit;margin:0}
// .pd-warn ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:10px 20px;margin-top:8px}
// .pd-warn li{font-size:13.5px;line-height:1.55;color:var(--pd-sub)}.pd-warn li b{color:var(--pd-text)}
// @media(max-width:700px){.pd-warn ul{grid-template-columns:1fr}}
// `;

// const SHORT = ["Communication", "Body language", "Behaviour", "Emotions", "Confidence", "Consistency"];

// function IdentifyMap() {
//   const cx = 320, cy = 250, rx = 250, ry = 190;
//   const pts = IDENTIFY.map((_, i) => {
//     const a = (((210 + i * 60) % 360) * Math.PI) / 180;
//     return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
//   });
//   return (
//     <svg className="pd-ill" viewBox="0 0 640 520" role="img" aria-label="How to identify personality: six signals around a person" fontFamily="Plus Jakarta Sans,sans-serif">
//       <defs><clipPath id="pdc"><circle cx={cx} cy={cy} r="96" /></clipPath></defs>
//       <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="var(--pd-border)" strokeWidth="1.5" strokeDasharray="4 6" />
//       {IDENTIFY.map(([t, , side], i) => (
//         <line key={t} x1={cx} y1={cy} x2={pts[i][0]} y2={pts[i][1]} stroke={side === "L" ? "#f97316" : "#0e8fa8"} strokeWidth="2" strokeDasharray="5 5" strokeOpacity=".7" />
//       ))}
//       <circle cx={cx} cy={cy} r="120" fill="#f9731626" />
//       <circle cx={cx} cy={cy} r="96" fill="#12141c" />
//       <g clipPath="url(#pdc)">
//         <ellipse cx={cx} cy="348" rx="82" ry="64" fill="#fb923c" />
//         <circle cx={cx} cy="222" r="36" fill="#fdba74" />
//       </g>
//       <Brain x={cx - 15} y="207" size={30} color="#12141c" strokeWidth={2} />
//       <circle cx="226" cy="168" r="4" fill="#0e8fa8" /><circle cx="418" cy="176" r="5" fill="#f97316" /><circle cx="236" cy="338" r="3.5" fill="#f97316" /><circle cx="408" cy="332" r="4" fill="#0e8fa8" />
//       {IDENTIFY.map(([t, , side, , Icon], i) => {
//         const [x, y] = pts[i], c = side === "L" ? "#f97316" : "#0e8fa8";
//         return (
//           <g key={t}>
//             <circle cx={x} cy={y} r="32" fill={c} stroke="var(--pd-card)" strokeWidth="5" />
//             <Icon x={x - 14} y={y - 14} size={28} color="#fff" strokeWidth={2} />
//             <text x={x} y={y + 56} textAnchor="middle" fontSize="16" fontWeight="600" style={{ fill: "var(--pd-text)" }}>{SHORT[i]}</text>
//           </g>
//         );
//       })}
//     </svg>
//   );
// }

// function FoundationGrid({ items, c }) {
//   return (
//     <div className="pd-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))" }}>
//       {items.map(([t, Icon, d]) => (
//         <div key={t} className="pd-card pd-fcard" style={{ "--c": c }}>
//           <div className="pd-ic"><Icon size={20} color="#fff" /></div>
//           <h3 className="pd-h3">{t}</h3>
//           <p className="pd-sub">{d}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// function IdentifyPersonality() {
//   return (
//     <>
//       <style>{IDENT_CSS}</style>
//       <section className="pd-sec" id="pd-identify"><div className="pd-wrap">
//         <Head badge="Identify" title='How to <span style="color:#f97316">Identify Personality?</span>' sub="Personality shows up as patterns in what people say, do and feel. Look at six signals together, over time, and never from one observation." />
//         <div className="pd-card" style={{ padding: 16 }}>
//           <IdentifyMap />
//           <p className="pd-note">Observe patterns over time, not single moments.</p>
//         </div>
//         <Marquee d={45} items={IDENTIFY.map(([t, , side, , Icon, d], i) => (
//           <div key={`e${i}`}>
//             <div className="pd-card pd-idc" style={{ "--c": side === "L" ? "#f97316" : "#0e8fa8" }}>
//               <div className="pd-ic"><Icon size={20} color="#fff" /></div>
//               <div><h3 className="pd-h3">{t}</h3><p className="pd-sub">{d}</p></div>
//             </div>
//           </div>
//         ))} />
//         <div className="pd-card pd-warn">
//           <div className="pd-warn-h"><AlertTriangle size={20} /><h3 className="pd-h3">Be careful before you judge</h3></div>
//           <p className="pd-sub" style={{ marginBottom: 0 }}>Personality cannot be accurately determined from appearance or from one isolated behaviour.</p>
//           <ul>{CAUTION.map(([h, p]) => <li key={h}><b>{h}</b> {p}</li>)}</ul>
//         </div>
//       </div></section>

//       <section className="pd-sec" id="pd-internal"><div className="pd-wrap">
//         <Head badge="Internal" title='Internal <span style="color:#0e8fa8">Foundation</span>' sub="What is built within. It is hard to see from outside, but it drives everything others notice." />
//         <FoundationGrid items={INTERNAL} c="#0e8fa8" />
//       </div></section>

//       <section className="pd-sec" id="pd-external"><div className="pd-wrap">
//         <Head badge="External" title='External <span style="color:#f97316">Foundation</span>' sub="What shows outside. These visible signals work best when they come from a strong internal base." />
//         <Marquee rev d={45} items={EXTERNAL.map(([t, Icon, d], i) => (
//           <div key={`x${i}`}>
//             <div className="pd-card pd-fcard" style={{ "--c": "#f97316" }}>
//               <div className="pd-ic"><Icon size={20} color="#fff" /></div>
//               <h3 className="pd-h3">{t}</h3>
//               <p className="pd-sub">{d}</p>
//             </div>
//           </div>
//         ))} />
//       </div></section>
//     </>
//   );
// }

// /* ═══ JOURNEY DIAGRAM + TRACKER ═══ */
// function JourneyDiagram({ done }) {
//   const ref = useRef(null);
//   const [on, setOn] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el || typeof IntersectionObserver === "undefined") { setOn(true); return; }
//     const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);
//   return (
//     <div ref={ref} className={`pd-card pd-jr${on ? " on" : ""}`}>
//       <svg className="pd-jsv" viewBox="0 0 1000 470" role="img" aria-label="30-day journey: milestones on day 1, 5, 10, 15, 20, 25 and 30" fontFamily="Space Grotesk,sans-serif">
//         <defs><linearGradient id="pdjg" gradientUnits="userSpaceOnUse" x1="110" y1="0" x2="890" y2="0">{[[0, "#0e8fa8"], [.25, "#0e8fa8"], [.4, "#f97316"], [.55, "#f97316"], [.65, "#22c55e"], [.78, "#22c55e"], [.9, "#c2410c"]].map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}</linearGradient></defs>
//         <path className="rib" d={RIBBON} stroke="#e6e8f0" />
//         <path className="rib rib2" pathLength="1" d={RIBBON} stroke="url(#pdjg)" />
//         {MILES.map(([d, cap, Icon, pos], k) => {
//           const x = MX[k], y = k % 2 ? 130 : 250, c = stageColor(d);
//           return (
//             <g key={d} className={`jn${done[d] ? " done" : ""}`} style={{ "--c": c, transitionDelay: `${0.3 + k * 0.35}s` }}>
//               {pos === "b" && <><line x1={x} y1={y + 45} x2={x} y2="314" stroke={c} strokeWidth="2" strokeDasharray="4 4" /><circle cx={x} cy="340" r="26" fill={c} /><Icon x={x - 13} y={327} size={26} color="#fff" /><text x={x} y="384" textAnchor="middle" fontSize="13" fontWeight="600" fill="#64748b">{cap}</text></>}
//               {pos === "t" && <><line x1={x} y1="86" x2={x} y2={y - 45} stroke={c} strokeWidth="2" strokeDasharray="4 4" /><circle cx={x} cy="60" r="26" fill={c} /><Icon x={x - 13} y={47} size={26} color="#fff" /><text x={x} y="20" textAnchor="middle" fontSize="13" fontWeight="600" fill="#64748b">{cap}</text></>}
//               {pos === "n" && <><line x1={x} y1="76" x2={x} y2={y - 45} stroke={c} strokeWidth="2" strokeDasharray="4 4" /><rect x={x - 55} y="40" width="110" height="36" rx="10" fill={c} /><text x={x} y="64" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">{d === 1 ? "START" : "FINISH"}</text><text x={x} y={y + 78} textAnchor="middle" fontSize="13" fontWeight="600" fill="#64748b">{cap}</text></>}
//               <g transform={`translate(${x} ${y})`}><rect className="dm" x="-32" y="-32" width="64" height="64" rx="10" transform="rotate(45)" /><text className="dt" y="-4" textAnchor="middle" fontSize="12">DAY</text><text className="dt" y="17" textAnchor="middle" fontSize="21">{String(d).padStart(2, "0")}</text></g>
//             </g>
//           );
//         })}
//         <g className="jn" style={{ transitionDelay: "2.8s" }}><rect x="400" y="424" width="200" height="40" rx="20" fill="#12141c" /><text x="440" y="449" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">TOTAL</text><rect x="482" y="426" width="36" height="36" rx="6" transform="rotate(45 500 444)" fill="#f97316" /><text x="500" y="450" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">30</text><text x="562" y="449" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">DAYS</text></g>
//       </svg>
//       <ol className="pd-jrl">{MILES.map(([d, cap]) => <li key={d} className={done[d] ? "done" : ""} style={{ "--c": stageColor(d) }}><b>Day {d}</b> · {cap}</li>)}</ol>
//       <div className="pd-legend2">{STAGES.map((s) => <span key={s[0]} style={{ "--c": s[3] }}>{s[0]} · Days {s[1]}–{s[2]}</span>)}</div>
//       <p className="pd-note">Each diamond fills in when you finish that day’s task in the tracker below.</p>
//     </div>
//   );
// }

// function Tracker({ tk, setTk, ok }) {
//   const [cur, setCur] = useState(0);
//   const s = STAGES[cur];
//   const cnt = (a, b) => { let c = 0; for (let d = a; d <= b; d++) if (tk.d[d]) c++; return c; };
//   const total = cnt(1, 30), pc = Math.round((total / 30) * 100);
//   const days = []; for (let d = s[1]; d <= s[2]; d++) days.push(d);
//   return (
//     <div className="pd-card" style={{ marginTop: 14 }}>
//       <h3 className="pd-h3">Daily tracker</h3>
//       <p className="pd-sub">Tick each task when you finish it. Progress and reflections are saved in this browser.</p>
//       {!ok && <p className="pd-err">Your browser is blocking storage, so progress will reset when you refresh.</p>}
//       <div className="pd-row-b"><b>{total} of 30 tasks done</b><b>{pc}%</b></div>
//       <div className="pd-bar"><i style={{ width: `${pc}%` }} /></div>
//       <div className="pd-tabs" role="tablist" aria-label="Stages">
//         {STAGES.map((g, i) => <button key={g[0]} type="button" role="tab" aria-selected={i === cur} className="pd-tab" onClick={() => setCur(i)}>{g[0]} <small>{cnt(g[1], g[2])}/{g[2] - g[1] + 1}</small></button>)}
//       </div>
//       {days.map((d) => (
//         <label key={d} className={`pd-tk${tk.d[d] ? " dn" : ""}`}>
//           <input type="checkbox" checked={!!tk.d[d]} onChange={(e) => setTk((p) => { const n = { ...p.d }; if (e.target.checked) n[d] = true; else delete n[d]; return { ...p, d: n }; })} />
//           <span><b>Day {d}.</b> {TASKS[d - 1]}</span>
//         </label>
//       ))}
//       <label className="pd-lbl" htmlFor="pd-note" style={{ marginTop: 14 }}>Weekly reflection ({s[0]}): {s[4]}</label>
//       <textarea id="pd-note" className="pd-in" rows={3} placeholder="Write a few lines. Only you can see this." value={tk.n[s[0]] || ""} onChange={(e) => setTk((p) => ({ ...p, n: { ...p.n, [s[0]]: e.target.value } }))} />
//       <div className="pd-sum"><b>Summary</b>
//         <ul>{STAGES.map((g) => { const dd = []; for (let d = g[1]; d <= g[2]; d++) if (tk.d[d]) dd.push(d); return <li key={g[0]}><b>{g[0]}:</b> {dd.length}/{g[2] - g[1] + 1} done{dd.length ? ` (day ${dd.join(", ")})` : ""}{tk.n[g[0]] ? " · reflection saved" : ""}</li>; })}</ul>
//         <button type="button" className="pd-btn s sm" onClick={() => { if (window.confirm("Reset all progress and reflections?")) setTk({ d: {}, n: {} }); }}>Reset progress</button>
//       </div>
//     </div>
//   );
// }

// /* ═══ SELF-CHECK ═══ */
// function SelfCheck() {
//   const [att, setAtt, ok] = useLS("pd_attempts", []);
//   const [ans, setAns] = useState({});
//   const [err, setErr] = useState("");
//   const submit = (e) => {
//     e.preventDefault();
//     const miss = QS.findIndex((_, i) => !ans[i]);
//     if (miss > -1) { setErr(`Answer all 10 statements. Statement ${miss + 1} is still blank.`); document.querySelector(`input[name="pdq${miss}"]`)?.focus(); return; }
//     setErr("");
//     const s = PN.map((_, i) => Math.round(((ans[2 * i] + ans[2 * i + 1] - 2) / 8) * 100));
//     setAtt((p) => [...p, { t: Date.now(), s }].slice(-10));
//   };
//   const last = att[att.length - 1];
//   const L = last?.s, ov = L ? Math.round(L.reduce((a, b) => a + b, 0) / 5) : 0;
//   const ord = L ? L.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]) : [];
//   const top = ord.filter((o) => o[0] >= 70).map((o) => PN[o[1]]), hi = top.length ? top : ord[0] ? [PN[ord[0][1]]] : [], low = ord.slice(-2).reverse();
//   return (
//     <div className="pd-two pd-top">
//       <form className="pd-card" onSubmit={submit} noValidate>
//         <p className="pd-sub">How often is each statement true for you? Never · Rarely · Sometimes · Often · Always</p>
//         {QS.map((q, i) => (
//           <fieldset key={i} className="pd-q"><legend>{i + 1}. {q}</legend>
//             <div className="pd-lk">{OPT.map((o, j) => <label key={o}><input type="radio" name={`pdq${i}`} value={j + 1} checked={ans[i] === j + 1} onChange={() => setAns((p) => ({ ...p, [i]: j + 1 }))} aria-label={o} />{o}</label>)}</div>
//           </fieldset>
//         ))}
//         <div className="pd-err" role="alert">{err}</div>
//         <button className="pd-btn p" type="submit">See my results</button>
//       </form>
//       <div aria-live="polite">
//         {!L ? <div className="pd-card"><h3 className="pd-h3">Your results</h3><p className="pd-sub">Answer all ten statements to see your strengths, focus areas and what to practise next.</p></div> : (
//           <div className="pd-card">
//             <h3 className="pd-h3">Your results: {ov}% overall</h3>
//             <p className="pd-sub">Attempt {att.length}, {new Date(last.t).toLocaleDateString()}. This shows how you see yourself right now, not a final verdict.</p>
//             {!ok && <p className="pd-err">Results are shown but your browser blocked saving them.</p>}
//             {L.map((v, i) => <div key={i} className="pd-rw"><div><b>{PN[i]}</b><span style={{ color: band(v)[1], fontWeight: 600 }}>{band(v)[0]} · {v}%</span></div><div className="pd-bar"><i style={{ width: `${v}%` }} /></div></div>)}
//             <h4 className="pd-h4">{top.length ? "Strengths" : "Your highest area"}</h4>
//             <p className="pd-sub">{hi.join(", ")}. Keep using {hi.length > 1 ? "these" : "this"} and look for ways to help others with it.</p>
//             <h4 className="pd-h4">Improvement areas and what to practise</h4>
//             <ul className="pd-ul">{low.map((o) => <li key={o[1]}><b>{PN[o[1]]} ({o[0]}%).</b> {RECS[o[1]]}</li>)}</ul>
//             {att.length > 1 && (
//               <>
//                 <h4 className="pd-h4">Compare: first attempt and latest</h4>
//                 <div style={{ overflowX: "auto" }}><table className="pd-table"><thead><tr><th>Area</th><th>First</th><th>Latest</th><th>Change</th></tr></thead>
//                   <tbody>{PN.map((p, i) => { const c = L[i] - att[0].s[i]; return <tr key={p}><td>{p}</td><td>{att[0].s[i]}%</td><td>{L[i]}%</td><td>{c > 0 ? "+" : ""}{c}</td></tr>; })}</tbody></table></div>
//               </>
//             )}
//             <div className="pd-actions"><button type="button" className="pd-btn s sm" onClick={() => { setAns({}); setErr(""); }}>Retake</button><button type="button" className="pd-btn s sm" onClick={() => { if (window.confirm("Delete all saved self-check results?")) setAtt([]); }}>Clear saved results</button></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ═══ REGISTRATION MODAL ═══ */
// const GOALS = ["Self-Awareness", "Confidence", "Communication", "Emotional Control", "Leadership", "Discipline & Habits"];
// const CHALLENGES = ["Fear of public speaking", "Overthinking / stress", "Low self-confidence", "Poor listening", "Procrastination", "Handling conflict"];
// function RegisterModal({ onClose }) {
//   const [f, setF] = useState({ name: "", email: "", goal: GOALS[0], challenge: CHALLENGES[0], energy: "Introvert", mbti: "Not sure", dailyTime: "10 min" });
//   const [st, setSt] = useState("idle");
//   const [msg, setMsg] = useState("");
//   const [res, setRes] = useState(null);
//   const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
//   useEffect(() => {
//     const k = (e) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", k);
//     document.body.style.overflow = "hidden";
//     return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
//   }, [onClose]);
//   const submit = async (e) => {
//     e.preventDefault();
//     if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email.trim())) { setSt("error"); setMsg("Enter your full name and a valid email address."); return; }
//     setSt("loading"); setMsg("");
//     try { setRes(await submitRegistration({ ...f, name: f.name.trim(), email: f.email.trim() })); setSt("ok"); }
//     catch (err) { setSt("error"); setMsg(regErr(err)); }
//   };
//   const Sel = ({ k, label, opts }) => <div><label className="pd-lbl" htmlFor={`pd-${k}`}>{label}</label><select id={`pd-${k}`} className="pd-in" value={f[k]} onChange={set(k)}>{opts.map((o) => <option key={o}>{o}</option>)}</select></div>;
//   return (
//     <div className="pd-modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
//       <div className="pd-mb" role="dialog" aria-modal="true" aria-label="Registration form">
//         <button type="button" className="pd-x" onClick={onClose} aria-label="Close"><X size={20} /></button>
//         {st === "ok" ? (
//           <div style={{ textAlign: "center" }}>
//             <CheckCircle2 size={52} color="#16a34a" />
//             <h3 className="pd-h3" style={{ fontSize: 22, marginTop: 8 }}>Registration confirmed</h3>
//             <p className="pd-sub" style={{ margin: "8px auto" }}>Thanks, {f.name.trim()}. {res?.message ? `${res.message} ` : ""}{res?.emailSent === true ? `We have emailed your assessment link to ${f.email.trim()}. Check your spam folder if you do not see it.` : "Your details are saved. Email delivery is not confirmed yet, so you will not get a link until the service confirms it. You can take the self-check on this page now."}</p>
//             <div className="pd-actions" style={{ justifyContent: "center" }}><a className="pd-btn s" href="#pd-check" onClick={(e) => { onClose(); goTo("pd-check")(e); }}>Take the self-check</a><button type="button" className="pd-btn p" onClick={onClose}>Done</button></div>
//           </div>
//         ) : (
//           <form onSubmit={submit} noValidate>
//             <h3 className="pd-h3">Create your free profile</h3>
//             <p className="pd-sub">Tell us what you need. We tailor your assessment and plan to it.</p>
//             <div className="pd-fg">
//               <div><label className="pd-lbl" htmlFor="pd-name">Full name</label><input id="pd-name" className="pd-in" autoComplete="name" value={f.name} onChange={set("name")} placeholder="Your full name" autoFocus /></div>
//               <div><label className="pd-lbl" htmlFor="pd-email">Email</label><input id="pd-email" type="email" className="pd-in" autoComplete="email" value={f.email} onChange={set("email")} placeholder="you@example.com" /></div>
//               <Sel k="goal" label="Main growth goal" opts={GOALS} /><Sel k="challenge" label="Biggest challenge" opts={CHALLENGES} />
//               <Sel k="energy" label="Energy style" opts={["Introvert", "Extrovert", "Ambivert"]} /><Sel k="mbti" label="MBTI type" opts={["Not sure", ...MBTI.map((m) => m[0])]} />
//               <Sel k="dailyTime" label="Daily time" opts={["10 min", "20 min", "30 min", "1 hour"]} />
//             </div>
//             <div className="pd-err" role="alert">{msg}</div>
//             <button className="pd-btn p" type="submit" disabled={st === "loading"} style={{ width: "100%" }}>{st === "loading" ? "Submitting…" : "Submit and start assessment"}</button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ═══ CSS ═══ */
// const PD_CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// .pd-page,.pd-page *,.pd-page *::before,.pd-page *::after{box-sizing:border-box}
// .pd-page h1,.pd-page h2,.pd-page h3,.pd-page h4,.pd-page p,.pd-page ul,.pd-page ol{margin:0;padding:0}
// .pd-page{font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;scroll-behavior:smooth;-webkit-text-size-adjust:100%}
// .pd-page h1,.pd-page h2,.pd-page h3,.pd-page h4,.pd-page b{font-weight:500}
// .pd-page a{color:inherit;text-decoration:none}
// .pd-wrap{width:100%;max-width:1760px;margin:0 auto;padding:0 clamp(12px,2.4vw,32px)}
// .pd-sec{padding:clamp(16px,2.6vw,26px) 0;scroll-margin-top:80px}
// .pd-head{text-align:center;margin-bottom:clamp(10px,1.8vw,16px)}
// .pd-badge{display:inline-flex;background:rgba(249,115,22,.08);border:1px solid rgba(249,115,22,.22);border-radius:99px;padding:4px 14px;margin-bottom:6px;font-size:12.5px;font-weight:500;color:#f97316}
// .pd-head h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,2.6vw,30px);line-height:1.15;letter-spacing:-.03em;color:var(--pd-text);margin-bottom:4px}
// .pd-head p{color:var(--pd-sub);font-size:14px;max-width:760px;margin:0 auto;line-height:1.5}
// .pd-card{background:var(--pd-card);border:1px solid var(--pd-border);border-radius:16px;padding:14px;box-shadow:var(--pd-shadow);min-width:0}
// .pd-h3{font-family:'Space Grotesk',sans-serif;font-size:16px;letter-spacing:-.02em;color:var(--pd-text);margin-bottom:4px}
// .pd-h4{font-family:'Space Grotesk',sans-serif;font-size:14px;color:var(--pd-text);margin:12px 0 4px}
// .pd-sub{font-size:13.5px;line-height:1.55;color:var(--pd-sub);margin-bottom:8px}
// .pd-ul{padding-left:18px;font-size:13.5px;line-height:1.55;color:var(--pd-sub)}
// .pd-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}
// .pd-two{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:center}.pd-top{align-items:start}
// @media(max-width:900px){.pd-two{grid-template-columns:1fr}}
// .pd-btn{font-family:inherit;cursor:pointer;border-radius:12px;padding:11px 20px;font-size:14px;font-weight:500;display:inline-flex;align-items:center;justify-content:center;gap:8px}
// .pd-btn.p{background:#f97316;color:#fff;border:1.5px solid #f97316}.pd-btn.s{background:transparent;color:var(--pd-text);border:1.5px solid var(--pd-border)}
// .pd-btn.sm{padding:7px 14px;font-size:13px}.pd-btn[disabled]{opacity:.6;cursor:wait}
// .pd-btn:focus-visible,.pd-tab:focus-visible,.pd-in:focus-visible,summary:focus-visible,.pd-tk input:focus-visible{outline:2px solid #f97316;outline-offset:3px}
// .pd-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
// .pd-hero{padding:clamp(18px,3vw,30px) 0;border-bottom:1px solid var(--pd-border)}
// .pd-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3.6vw,38px);line-height:1.15;letter-spacing:-.03em;color:var(--pd-text);margin:8px 0 6px}
// .pd-hero p.l{font-size:clamp(14px,1.8vw,16px);line-height:1.6;color:var(--pd-sub);max-width:760px;margin-bottom:14px}
// .pd-stats{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.pd-stats div{background:var(--pd-pill);border:1px solid var(--pd-border);border-radius:12px;padding:8px 14px;font-size:12.5px;color:var(--pd-muted)}.pd-stats b{display:block;font-family:'Space Grotesk',sans-serif;font-size:18px;color:var(--pd-text)}
// .pd-step{border-top:3px solid var(--c)}.pd-step small{font-size:11px;color:var(--c);font-weight:600}
// .pd-map{width:100%;display:block}.pd-maplist{display:none;grid-template-columns:1fr 1fr;gap:8px}.pd-legend{text-align:center;font-size:12.5px;margin-top:8px}
// .pd-chip{padding:10px;border-radius:12px;border:1px solid;font-size:13px;font-weight:500}.pd-chip.in{color:#0b6f84;background:#0e8fa81a;border-color:#0e8fa8}.pd-chip.ex{color:#c2410c;background:#f973161a;border-color:#f97316}
// @media(max-width:700px){.pd-map{display:none}.pd-maplist{display:grid}}
// .pd-ie{display:flex;flex-direction:column;gap:10px}.pd-ie .pd-card{border-top:4px solid var(--c)}
// details.pd-dt{border:1px solid var(--pd-border);border-radius:14px;background:var(--pd-card);padding:0 14px;box-shadow:var(--pd-shadow)}
// details.pd-dt summary{cursor:pointer;padding:12px 0;font-family:'Space Grotesk',sans-serif;font-size:15px;color:var(--pd-text)}
// .pd-dt .bd{padding-bottom:12px;font-size:13.5px;color:var(--pd-sub);line-height:1.55}.pd-dt h4{margin:10px 0 3px;font-size:13px;color:#f97316}
// .pd-tag{display:inline-block;font-size:11px;font-weight:600;border:1px solid;border-radius:99px;padding:1px 9px;margin-right:8px}
// .pd-fig{margin:0;background:var(--pd-card);border:1px solid var(--pd-border);border-radius:16px;overflow:hidden;box-shadow:var(--pd-shadow)}.pd-fig img{width:100%;height:auto;display:block}.pd-fig figcaption{padding:10px 14px;font-size:13px;color:var(--pd-sub);border-top:1px solid var(--pd-border)}
// .pd-jr .pd-jsv{width:100%;display:block}.pd-jr .rib{fill:none;stroke-width:26;stroke-linecap:round}
// .pd-jr .rib2{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.6s ease}.pd-jr.on .rib2{stroke-dashoffset:0}
// .pd-jr .jn{opacity:0;transform:scale(.7);transform-box:fill-box;transform-origin:center;transition:opacity .5s,transform .5s}.pd-jr.on .jn{opacity:1;transform:none}
// .pd-jr .dm{fill:#fff;stroke:var(--c);stroke-width:4;transition:fill .3s}.pd-jr .done .dm{fill:var(--c)}.pd-jr .dt{fill:#1b2033;font-weight:700}.pd-jr .done .dt{fill:#fff}
// .pd-jrl{display:none;list-style:none;padding:0 0 0 18px!important;border-left:3px solid var(--pd-border)}.pd-jrl li{position:relative;padding:7px 0 7px 14px;font-size:14px;color:var(--pd-sub)}
// .pd-jrl li::before{content:"";position:absolute;left:-27px;top:12px;width:14px;height:14px;border-radius:50%;background:var(--c);border:3px solid var(--pd-card);box-shadow:0 0 0 2px var(--c)}.pd-jrl li.done b::after{content:" ✓";color:#16a34a}.pd-jrl b{color:var(--pd-text)}
// .pd-legend2{display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font-size:12.5px;color:var(--pd-sub);margin-top:6px}.pd-legend2 span::before{content:"";display:inline-block;width:10px;height:10px;border-radius:3px;background:var(--c);margin-right:6px}
// .pd-note{text-align:center;font-size:12.5px;color:var(--pd-muted);margin-top:6px}
// @media(max-width:760px){.pd-jsv{display:none}.pd-jrl{display:block}}
// @media(prefers-reduced-motion:reduce){.pd-jr .rib2{stroke-dashoffset:0;transition:none}.pd-jr .jn{opacity:1;transform:none;transition:none}}
// .pd-row-b{display:flex;justify-content:space-between;font-size:13.5px;color:var(--pd-text);margin-bottom:6px}
// .pd-bar{height:10px;background:var(--pd-bar);border-radius:9px;overflow:hidden}.pd-bar i{display:block;height:100%;background:linear-gradient(90deg,#0e8fa8,#f97316);transition:width .4s}
// .pd-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.pd-tab{font-family:inherit;font-size:13.5px;font-weight:500;padding:7px 14px;border-radius:12px;cursor:pointer;background:transparent;color:var(--pd-text);border:1.5px solid var(--pd-border)}.pd-tab[aria-selected=true]{border-color:#f97316;background:rgba(249,115,22,.1);color:#f97316}
// .pd-tk{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--pd-border);cursor:pointer;font-size:14px;color:var(--pd-text);align-items:flex-start}.pd-tk input{width:19px;height:19px;margin-top:2px;accent-color:#f97316;flex:none}.pd-tk.dn span{color:var(--pd-muted);text-decoration:line-through}
// .pd-lbl{display:block;font-size:12.5px;font-weight:500;color:var(--pd-sub);margin:10px 0 4px}
// .pd-in{width:100%;padding:9px 12px;border:1px solid var(--pd-border);border-radius:10px;font:inherit;font-size:14px;background:var(--pd-pill);color:var(--pd-text)}
// .pd-sum{margin-top:14px;font-size:13.5px;color:var(--pd-sub)}.pd-sum ul{padding-left:18px;margin:4px 0 10px}
// .pd-err{color:#dc2626;font-size:13px;min-height:18px;margin:6px 0}
// .pd-q{border:0;padding:0;margin:0 0 12px;min-width:0}.pd-q legend{font-size:13.5px;font-weight:500;color:var(--pd-text);padding:0;margin-bottom:6px}
// .pd-lk{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}.pd-lk label{position:relative;text-align:center;border:1.5px solid var(--pd-border);border-radius:10px;padding:8px 2px;font-size:11.5px;color:var(--pd-text);cursor:pointer}
// .pd-lk input{position:absolute;inset:0;width:100%;height:100%;opacity:0;margin:0;cursor:pointer}.pd-lk label:has(input:checked){border-color:#f97316;background:rgba(249,115,22,.1);font-weight:700}.pd-lk label:has(input:focus-visible){outline:2px solid #f97316}
// .pd-rw{margin:10px 0}.pd-rw>div:first-child{display:flex;justify-content:space-between;gap:8px;font-size:13.5px;color:var(--pd-text);margin-bottom:3px}
// .pd-table{width:100%;border-collapse:collapse;font-size:13px}.pd-table th,.pd-table td{padding:8px 10px;border-bottom:1px solid var(--pd-border);text-align:left;color:var(--pd-sub)}.pd-table th{background:#f97316;color:#fff}
// .pd-mq{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent);mask-image:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent);margin-top:8px}
// .pd-mq-track{display:flex;gap:12px;width:max-content;padding:4px 0;animation:pdMq 45s linear infinite}.pd-mq-track.rev{animation-direction:reverse}.pd-mq:hover .pd-mq-track{animation-play-state:paused}
// .pd-mq-track>div{flex:0 0 clamp(170px,16vw,220px);display:flex}.pd-mq-track>div>.pd-card{flex:1}.pd-mq-track.wide>div{flex-basis:clamp(240px,21vw,290px)}
// @keyframes pdMq{to{transform:translateX(calc(-50% - 6px))}}
// @media(prefers-reduced-motion:reduce){.pd-mq{overflow-x:auto;-webkit-mask-image:none;mask-image:none}.pd-mq-track{animation:none}}
// .pd-mbti{text-align:center;padding:10px}.pd-mbti b{display:block;font-family:'Space Grotesk',sans-serif;font-size:20px}.pd-mbti small{color:var(--pd-muted);display:block;font-size:12px}
// .pd-cta{background:linear-gradient(135deg,#1E293B,#0f172a);padding:16px 0;margin-top:clamp(16px,2.6vw,26px)}
// .pd-cta-in{display:flex;align-items:center;justify-content:space-between;gap:14px 32px;flex-wrap:wrap}.pd-cta h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,2.6vw,28px);line-height:1.2;letter-spacing:-.03em;color:#fff;margin-bottom:4px}.pd-cta p{font-size:14px;color:rgba(255,255,255,.6);max-width:640px;line-height:1.5}
// .pd-cta .pd-btn.s{color:#fff;border-color:rgba(255,255,255,.2)}
// @media(max-width:600px){.pd-cta-in{text-align:center;justify-content:center}.pd-cta .pd-actions{width:100%;flex-direction:column}.pd-cta .pd-btn{width:100%}}
// .pd-disc{font-size:12.5px;line-height:1.55;color:var(--pd-muted);text-align:center;max-width:900px;margin:14px auto 0}
// .pd-modal{position:fixed;inset:0;z-index:1000;background:rgba(5,7,12,.78);overflow-y:auto;padding:16px}
// .pd-mb{position:relative;max-width:640px;margin:20px auto;background:var(--pd-card);color:var(--pd-text);border:1px solid var(--pd-border);border-radius:20px;padding:22px}
// .pd-x{position:absolute;top:10px;right:10px;background:none;border:0;cursor:pointer;color:var(--pd-muted);padding:6px}
// .pd-fg{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}@media(max-width:560px){.pd-fg{grid-template-columns:1fr}.pd-lk label{font-size:10.5px}}
// @media(max-width:600px){.pd-g{grid-template-columns:1fr}.pd-card{padding:12px}}
// .pd-page ::-webkit-scrollbar{width:6px;height:6px}.pd-page ::-webkit-scrollbar-thumb{background:rgba(249,115,22,.3);border-radius:99px}
// `;

// /* ═══ PAGE ═══ */
// export default function PersonalityDevelopment({ theme: themeProp, toggleTheme: toggleThemeProp, setShowLoginModal, scrollToSection }) {
//   const [darkMode, setDarkMode] = useState(() => {
//     try { const s = localStorage.getItem("theme"); if (s) return s === "dark"; return document.documentElement.classList.contains("dark"); } catch { return false; }
//   });
//   const controlled = themeProp !== undefined;
//   const theme = controlled ? themeProp : darkMode ? "dark" : "light";
//   const toggleTheme = () => {
//     if (controlled && toggleThemeProp) { toggleThemeProp(); return; }
//     setDarkMode((p) => { const n = !p; try { localStorage.setItem("theme", n ? "dark" : "light"); document.documentElement.classList.toggle("dark", n); } catch {} return n; });
//   };
//   useEffect(() => {
//     const f = (e) => e.key === "theme" && setDarkMode(e.newValue === "dark");
//     window.addEventListener("storage", f);
//     return () => window.removeEventListener("storage", f);
//   }, []);
//   const t = theme === "dark" ? DARK : LIGHT;

//   const [open, setOpen] = useState(false);
//   const [tk, setTk, tkOk] = useLS("pd_track", { d: {}, n: {} });
//   const rows = [MBTI.slice(0, 8), MBTI.slice(8)];

//   return (
//     <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={setShowLoginModal} scrollToSection={scrollToSection}>
//       <div className="pd-page" style={{ "--pd-text": t.text, "--pd-sub": t.textSub, "--pd-muted": t.textMuted, "--pd-card": t.cardBg, "--pd-border": t.border, "--pd-pill": t.pillBg, "--pd-bar": t.barBg, "--pd-shadow": t.shadow, background: t.pageBg, color: t.text, minHeight: "100vh", transition: "background .3s,color .3s" }}>
//         <style>{PD_CSS}</style>

//         <section className="pd-hero"><div className="pd-wrap">

//           <h1>Know your personality. <span style={{ color: "#f97316" }}>Improve it. Prove it.</span></h1>
//           <p className="l">A practical 30-day personality development program. Learn the skills, follow a daily plan, take the self-check and re-test to see real change.</p>
//           <div className="pd-actions"><button type="button" className="pd-btn p" onClick={() => setOpen(true)}>Start Free Assessment <ArrowRight size={15} /></button><a className="pd-btn s" href="#pd-how" onClick={goTo("pd-how")}>See how it works</a></div>
//           <div className="pd-stats"><div><b>2</b>free assessments</div><div><b>30 days</b>guided plan</div><div><b>16</b>MBTI types explained</div><div><b>₹199</b>from Assessment 3</div></div>
//         </div></section>

//         <section className="pd-sec" id="pd-how"><div className="pd-wrap">
//           <Head badge="How it works" title='How it <span style="color:#f97316">works</span>' sub="Read everything free. Sign up only when you want your own assessment." />
//           <div className="pd-g">{STEPS.map(([h, p, c], i) => <div key={h} className="pd-card pd-step" style={{ "--c": c }}><small>Step {i + 1}{i === 3 ? " · ₹199" : " · Free"}</small><h3 className="pd-h3">{h}</h3><p className="pd-sub" style={{ marginBottom: 0 }}>{p}</p></div>)}</div>
//         </div></section>

//         <IdentifyPersonality />

//         <section className="pd-sec" id="pd-learn"><div className="pd-wrap">
//           <Head badge="Learn" title='Learn the <span style="color:#f97316">skills</span>' sub="Internal lessons build you from within; external lessons change how you come across. Each has a real-life example, reflection questions and one exercise." />
//           <div className="pd-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", alignItems: "start" }}>
//             {LESSONS.map((l, i) => (
//               <details key={l[0]} className="pd-dt" open={i === 0}>
//                 <summary><span className="pd-tag" style={{ color: l[1] === "in" ? "#0e8fa8" : "#f97316" }}>{l[1] === "in" ? "Internal" : "External"}</span>{l[0]}</summary>
//                 <div className="bd"><p>{l[2]}</p><h4>Real-life situation</h4><p>{l[3]}</p><h4>Ask yourself</h4><ul className="pd-ul">{l[4].map((q) => <li key={q}>{q}</li>)}</ul><h4>Try this</h4><p>{l[5]}</p></div>
//               </details>
//             ))}
//           </div>
//         </div></section>

//         <section className="pd-sec" id="pd-body"><div className="pd-wrap">
//           <Head badge="Body language" title='Body language <span style="color:#f97316">speaks first</span>' sub="Before you say a word, your posture and gestures tell people how open, confident or guarded you are." />
//           <div className="pd-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))" }}>
//             <figure className="pd-fig"><img src={IMG_POSTURE} alt="Closed posture versus open posture" loading="lazy" /><figcaption><b>Posture.</b> A closed posture can read as hostility or anxiety. An open posture signals friendliness and willingness.</figcaption></figure>
//             <figure className="pd-fig"><img src={IMG_ARMS} alt="Crossed arms versus hands on hips" loading="lazy" /><figcaption><b>Gestures.</b> Crossed arms can look defensive. Hands on hips can signal control, or aggression if overdone.</figcaption></figure>
//           </div>
//         </div></section>

//         <section className="pd-sec" id="pd-journey"><div className="pd-wrap">
//           <Head badge="30-day plan" title='Your 30-day <span style="color:#f97316">journey</span>' sub="Four stages: Know, Express, Balance and Execute. Move from knowing yourself to executing with consistency." />
//           <JourneyDiagram done={tk.d} />
//           <Tracker tk={tk} setTk={setTk} ok={tkOk} />
//         </div></section>

//         <section className="pd-sec" id="pd-check"><div className="pd-wrap">
//           <Head badge="Self-check" title='Quick <span style="color:#f97316">self-check</span>' sub="Ten statements, about three minutes. Retake it after your 30-day plan to compare. Answers stay in this browser only." />
//           <SelfCheck />
//           <div className="pd-card" style={{ marginTop: 14 }}><h3 className="pd-h3">What this self-check can and cannot tell you</h3>
//             <ul className="pd-ul"><li>It is a self-reported snapshot, not a clinical, diagnostic or scientifically validated test.</li><li>Results shift with mood, stress and context, so use them as prompts for reflection.</li><li>MBTI describes natural preferences. It does not measure intelligence, ability, character or overall personality development, and it should never be the sole basis for hiring or promotion.</li></ul></div>
//         </div></section>

//         <section className="pd-sec" id="pd-mbti"><div className="pd-wrap">
//           <Head badge="16 types" title='Discover your <span style="color:#f97316">MBTI type</span>' sub="Four preferences combine into 16 types. MBTI describes natural preferences, not intelligence, ability or character." />
//           {rows.map((r, k) => <Marquee key={k} rev={k === 1} d={40} items={r.map((m) => <div key={m[0]}><div className="pd-card pd-mbti"><b style={{ color: GCOL[m[2]] }}>{m[0]}</b><small>{m[2]}</small></div></div>)} />)}
//         </div></section>

//         <section className="pd-sec" id="pd-rules"><div className="pd-wrap">
//           <Head badge="Golden rules" title='7 golden rules of <span style="color:#f97316">personal growth</span>' />
//           <Marquee d={50} items={RULES.map((r, i) => <div key={r[0]}><div className="pd-card" style={{ borderTop: "3px solid #f97316" }}><h3 className="pd-h3"><span style={{ color: "#f97316" }}>{i + 1}.</span> {r[0]}</h3><p className="pd-sub" style={{ marginBottom: 0 }}>{r[1]}</p></div></div>)} />
//           <style>{`#pd-rules .pd-mq-track>div{flex-basis:clamp(240px,21vw,290px)}`}</style>
//         </div></section>

//         <section className="pd-sec" id="pd-faq"><div className="pd-wrap">
//           <Head badge="FAQ" title='Common <span style="color:#f97316">questions</span>' sub="Short, honest answers before you start." />
//           <div className="pd-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", alignItems: "start" }}>
//             {FAQ.map(([q, a]) => <details key={q} className="pd-dt"><summary>{q}</summary><div className="bd"><p>{a}</p></div></details>)}
//           </div>
//         </div></section>

//         <div className="pd-cta"><div className="pd-wrap pd-cta-in">
//           <div><h2>Ready to see where you <span style={{ color: "#f97316" }}>stand?</span></h2><p>You are not limited by a four-letter type. Your choices, habits and actions decide your growth. Your first two assessments are free.</p></div>
//           <div className="pd-actions" style={{ marginTop: 0 }}><button type="button" className="pd-btn p" onClick={() => setOpen(true)}>Start Free Assessment</button><a className="pd-btn s" href="#pd-how" onClick={goTo("pd-how")}>Explore first</a></div>
//         </div></div>

//         {open && <RegisterModal onClose={() => setOpen(false)} />}
//       </div>
//     </PublicLayout>
//   );
// }
























































"use client";

import { useState, useEffect, useRef } from "react";
import {
  Eye, MessageSquare, Heart, TrendingUp, RefreshCw, Lightbulb, Shirt, Sparkles,
  Users, Search, Flag, ClipboardList, X, CheckCircle2, ArrowRight, Route, Target,
  Brain, ShieldCheck, AlertTriangle, ChevronLeft, ChevronRight,
} from "lucide-react";
// Same shared shell used by ManagerHub / StudentHub (navbar + footer).
import PublicLayout from "../Landing/components/PublicLayout";
// Images live in: src/assets/personallity development/  (folder name has a double "l" and a space)
import body1 from "@/assets/personallity development/body-1.webp";
import body2 from "@/assets/personallity development/body-2.webp";
// Hero slider images (same folder). Extensions match the actual files on disk.
import hero1 from "@/assets/personallity development/images1.jpg";
import hero2 from "@/assets/personallity development/images 2.jpg";
import hero3 from "@/assets/personallity development/images 3.webp";
import hero4 from "@/assets/personallity development/images 4.webp";
import hero5 from "@/assets/personallity development/iamges 5.png";

/* ═══ THEME (same tokens as Manager Hub) ═══ */
const DARK = {
  pageBg: "#000000", cardBg: "#111827", border: "#1F2937", borderHov: "#374151",
  text: "#ffffff", textSub: "#CBD5E1", textMuted: "#94A3B8",
  pillBg: "rgba(255,255,255,0.06)", barBg: "rgba(255,255,255,0.10)", shadow: "0 4px 20px rgba(0,0,0,0.45)",
};
const LIGHT = {
  pageBg: "#F8FAFC", cardBg: "#ffffff", border: "#E5E7EB", borderHov: "#D1D5DB",
  text: "#1E293B", textSub: "#475569", textMuted: "#94A3B8",
  pillBg: "#F1F5F9", barBg: "#E2E8F0", shadow: "0 1px 3px rgba(15,23,42,0.08)",
};

/* ═══ BACKEND ═══
   Set NEXT_PUBLIC_PD_API_URL in .env.local (e.g. https://api.ilmora.texora.ai/pd/register).
   POST JSON. Success only if the server replies 2xx with {"ok":true,"emailSent":true|false,"message":"optional"}.
   Errors: non-2xx with {"ok":false,"error":"reason"}. */
const API_URL = process.env.NEXT_PUBLIC_PD_API_URL || "";
const TIMEOUT_MS = 15000;
// Body-language images come from src/assets/personallity development (body-1, body-2).
const IMG_POSTURE = body1?.src || body1;
const IMG_ARMS = body2?.src || body2;

async function submitRegistration(data) {
  if (!API_URL) throw new Error("not-configured");
  const ac = new AbortController();
  const to = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), signal: ac.signal });
    let j = null;
    try { j = await res.json(); } catch {}
    if (!res.ok || !j || j.ok !== true) throw new Error((j && j.error) || `server-${res.status}`);
    return j;
  } finally { clearTimeout(to); }
}
function regErr(e) {
  if (e?.message === "not-configured") return "Registration is not available yet because the server is not connected. Nothing was saved.";
  if (e?.name === "AbortError") return "The server took too long to respond, so your registration is not confirmed. Please try again.";
  if (e instanceof TypeError) return "Could not reach the server. Check your connection and try again.";
  if (e?.message && !/^server-/.test(e.message)) return e.message;
  return `The server could not save your registration (${e?.message || "unknown error"}). Please try again.`;
}

/* ═══ DATA ═══ */
const STAGES = [["Know", 1, 7, "#0e8fa8", "What did you learn about your strengths, habits and triggers?"], ["Express", 8, 14, "#f97316", "Where did your communication or body language help or hurt this week?"], ["Balance", 15, 21, "#22c55e", "What helped you stay calm, and what would you do differently next time?"], ["Execute", 22, 30, "#c2410c", "Which habits will you keep, and how will you stay consistent?"]];
const stageColor = (d) => (STAGES.find((s) => d <= s[2]) || STAGES[3])[3];
const TASKS = ["List 5 strengths and 3 weaknesses. Write one real example for each.", "Write down the habits you repeat daily. Mark each as helpful or unhelpful.", "Pick one habit that holds you back and note what usually triggers it.", "Choose one habit to drop first and write a replacement action.", "Log each moment of stress, anger or worry today, with its trigger.", "Ask one trusted person: what do I do well, and what should I improve?", "Review the week: what surprised you about yourself? Write three lines.", "In one conversation, let the person finish, then summarise before you reply.", "Explain something you know in 30 seconds, out loud.", "Sit upright with relaxed shoulders through one full meeting or call.", "Keep steady eye contact (about 3 seconds at a time) in one conversation.", "Rewrite one email or message so it is shorter and clearer.", "Use an “I” statement once today: I feel … when … because …", "Ask for feedback on how you came across this week. Write three lines.", "When you feel tension, pause: breathe in for 4, out for 6, then respond.", "Name your emotion precisely three times today (“frustrated”, not “bad”).", "Spend 10 minutes on a task you have been avoiding.", "Politely say no to one request you do not have time for.", "Write down a recent mistake and one lesson from it, without self-blame.", "Replace “I can’t do this” with “I can’t do this yet” and take one small step.", "Review the week: when did you stay calm, and when not? Write three lines.", "Set one clear goal for the next 30 days and write the first step.", "Break the goal into three weekly actions and put them in your calendar.", "Choose 3 habits to keep long term and write when you will do each.", "Do all 3 habits today and tick them off.", "Help someone with a task or share something you learned.", "Review a past mistake as data: what happened, and what would you change?", "Do all 3 habits again and note what made it easy or hard.", "Retake the self-check on this page and compare it with your first result.", "Write your 30-day review: what changed, what stays, what is next?"];
const MILES = [[1, "Baseline audit", null, "n"], [5, "Track your triggers", Eye, "b"], [10, "Active listening", MessageSquare, "t"], [15, "Emotional pause", Heart, "b"], [20, "Growth mindset", TrendingUp, "t"], [25, "Habits in action", RefreshCw, "b"], [30, "Review and re-test", null, "n"]];
const MX = [110, 240, 370, 500, 630, 760, 890];
const RIBBON = "M110 250C175 250 175 130 240 130S305 250 370 250S435 130 500 130S565 250 630 250S695 130 760 130S825 250 890 250";

const LESSONS = [
  ["Self-awareness and personal growth", "in", "Self-awareness is noticing your thoughts, feelings and habits as they happen. Growth starts with an honest baseline, not a target.", "You snap at a teammate after a long day. Later you ask: was it their comment, or was I already tired and stressed?", ["What am I good at that others notice?", "Which situation makes me react in a way I regret?", "Which habit would a close friend ask me to change?"], "Keep a five-minute evening log for three days: what happened, what you felt, what you did, and what you would repeat."],
  ["Emotional intelligence and confidence", "in", "Emotional intelligence means recognising your emotions, managing them, and reading other people’s. Confidence grows from small proof that you can handle hard things.", "Your manager criticises your report. Instead of defending at once, you breathe, ask which part to fix first, and reply calmly.", ["What emotion did I feel most today, and what caused it?", "What did I avoid this week because I feared failing?", "What is one small uncomfortable step I can take tomorrow?"], "Emotional Pause: when tension rises, breathe in for 4 and out for 6, name the feeling in one word, then choose your response."],
  ["Communication and active listening", "ex", "Good communication has two halves: saying things clearly and listening to understand. Many conflicts come from skipping the second half.", "A colleague says the deadline is impossible. You reply, “So testing time is the main problem?” before offering a fix. They feel heard and the talk turns practical.", ["When did I last interrupt someone, and what was I afraid of missing?", "Can I state my main point in two sentences?", "Do people leave my conversations clear on what happens next?"], "Summarise before replying: in each conversation today, repeat the other person’s point in your own words before you answer."],
  ["Body language and professional etiquette", "ex", "People read posture, eye contact and tone before they weigh your words. Etiquette is the shared habit of being punctual, respectful and clear. Cues vary by culture, so treat them as hints, not proof.", "In an interview you sit upright, keep your hands visible, nod while listening and arrive ten minutes early. You look prepared before you speak.", ["What does my posture say when I am nervous?", "Do I look at the person speaking, or at my phone?", "Am I on time and prepared for meetings?"], "Record a one-minute video of yourself explaining your day. Watch it muted and note posture, hands and expression. Fix one thing."],
];

const PN = ["Self-Awareness", "Communication", "Emotional Balance", "Confidence", "Discipline"];
const OPT = ["Never", "Rarely", "Sometimes", "Often", "Always"];
const QS = ["I can name my main strengths and weak spots without hesitation.", "I notice what triggers my stress or anger before it takes over.", "In conversations, I let people finish before I reply.", "I can explain my main point clearly in a few sentences.", "When I am upset, I pause before reacting.", "I recover from setbacks within a reasonable time.", "I speak up in groups when I have something useful to say.", "I try tasks that make me uncomfortable.", "I finish what I commit to, even when motivation is low.", "I follow a routine or plan for my goals."];
const RECS = ["Do the Week 1 tasks: a strengths audit and a trigger log (days 1–7).", "Practise summarising before replying in at least two conversations a day (Week 2).", "Use the Emotional Pause: breathe, name the feeling, then respond (Week 3).", "Do one small uncomfortable task a day and note what happened (Week 3).", "Pick three habits and tick them off for the rest of the 30 days (Week 4)."];
const band = (p) => (p >= 70 ? ["Strength", "#16a34a"] : p >= 45 ? ["Developing", "#d97706"] : ["Focus area", "#dc2626"]);

const MBTI = [["INTJ", "Architect", "Analysts"], ["INTP", "Logician", "Analysts"], ["ENTJ", "Commander", "Analysts"], ["ENTP", "Debater", "Analysts"], ["INFJ", "Advocate", "Diplomats"], ["INFP", "Mediator", "Diplomats"], ["ENFJ", "Protagonist", "Diplomats"], ["ENFP", "Campaigner", "Diplomats"], ["ISTJ", "Logistician", "Sentinels"], ["ISFJ", "Defender", "Sentinels"], ["ESTJ", "Executive", "Sentinels"], ["ESFJ", "Consul", "Sentinels"], ["ISTP", "Virtuoso", "Explorers"], ["ISFP", "Adventurer", "Explorers"], ["ESTP", "Entrepreneur", "Explorers"], ["ESFP", "Entertainer", "Explorers"]];
const GCOL = { Analysts: "#7c3aed", Diplomats: "#16a34a", Sentinels: "#2563eb", Explorers: "#d97706" };
const RULES = [["Know Yourself", "Understand your strengths, limitations, habits and emotional triggers."], ["Keep Learning", "Skills expand through deliberate practice and feedback."], ["Listen First", "Seek to understand before attempting to be understood."], ["Control Your Response", "You cannot control every situation, but you control your choices and reactions."], ["Take Ownership", "Accept full responsibility for commitments, mistakes and progress."], ["Stay Adaptable", "Adjust tactics immediately when new data or circumstances require it."], ["Invest in Others", "True development lifts and empowers the teams around you."]];
const FAQ = [["Is the self-check a medical or clinical test?", "No. It is a short self-reported reflection tool and cannot diagnose anything. If you are struggling with your mental health, please speak to a qualified professional."], ["Can personality really change?", "Core tendencies stay fairly stable, but habits, skills and how you respond can change with regular practice. That is what the 30-day plan trains."], ["Does my MBTI type limit how far I can grow?", "No. MBTI describes natural preferences, not intelligence, ability or character. Your choices and habits matter more than a four-letter type."], ["How much time does the plan need each day?", "Most tasks take 10 to 30 minutes. You can note your preferred daily time when you register."], ["Is my progress saved?", "Tracker progress, reflections and self-check results are saved in this browser on this device only. Clearing browser data removes them."], ["What do the assessments cost?", "The first two assessments are free. From the third one it is ₹199."]];
const STEPS = [["Explore", "Read the lessons, 30-day plan, 16 types and golden rules. No sign-up needed.", "#0e8fa8"], ["Assess", "Register with the form. Your assessment link is sent once email delivery is active.", "#f97316"], ["Improve and re-test", "Follow your plan, then take Assessment 2 and compare your growth.", "#22c55e"], ["Keep growing", "Assessment 3 onwards is ₹199, with a new report each time.", "#8b5cf6"]];

/* ═══ HELPERS ═══ */
function useLS(key, init) {
  const [v, setV] = useState(init);
  const [ok, setOk] = useState(true);
  useEffect(() => { try { const s = localStorage.getItem(key); if (s) setV(JSON.parse(s)); } catch {} }, [key]);
  const set = (n) => setV((p) => { const x = typeof n === "function" ? n(p) : n; try { localStorage.setItem(key, JSON.stringify(x)); } catch { setOk(false); } return x; });
  return [v, set, ok];
}
function Marquee({ items, rev, d = 45 }) {
  return (
    <div className="pd-mq">
      <div className={`pd-mq-track${rev ? " rev" : ""}`} style={{ animationDuration: `${d}s` }}>
        {[...items, ...items.map((n, i) => <div key={`d${i}`} aria-hidden="true">{n.props.children}</div>)].map((n, i) => (n.key?.startsWith?.("d") ? n : <div key={i}>{n.props.children}</div>))}
      </div>
    </div>
  );
}
const Head = ({ badge, title, sub }) => (
  <div className="pd-head"><h2 dangerouslySetInnerHTML={{ __html: title }} />{sub && <p>{sub}</p>}</div>
);

// Smooth-scroll without adding #hash to the URL
const goTo = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };

/* ═══ HOW TO IDENTIFY PERSONALITY ═══ */
// [title, short line, side, row, icon, detail]
const IDENTIFY = [
  ["Communication style", "Clear, listens before replying", "L", 0, MessageSquare, "Do they speak clearly, let others finish and ask questions? Good listening says more than fluent talking."],
  ["Body language", "Posture, eye contact, gestures", "L", 1, Eye, "Notice posture, eye contact and expression over time. Cues vary by culture and nerves, so treat them as hints, not proof."],
  ["Behaviour with others", "Respect for everyone", "L", 2, Users, "Watch how they treat people who cannot help them: juniors, support staff, strangers, waiters."],
  ["Emotional responses", "Calm or reactive under stress", "R", 0, Heart, "See how they handle pressure, criticism and delays. Self-control matters more than never feeling upset."],
  ["Confidence & decisions", "Owns choices and attitude", "R", 1, TrendingUp, "Look for calm confidence, openness to feedback and willingness to own a decision. Loudness is not confidence."],
  ["Words match actions", "Consistency over time", "R", 2, Target, "Do promises, stated values and actions line up again and again? Consistency over weeks is the strongest signal."],
];
const CAUTION = [
  ["Appearance is not personality.", "Clothes, accent, looks or a profile photo cannot tell you who someone really is."],
  ["One moment is not a pattern.", "A bad day, nerves or a mood can hide someone’s usual behaviour. Look for repeats across situations and time."],
  ["Beware of false identity.", "People can show a polished image online or in a short meeting. Verify claims and watch behaviour over time."],
  ["Do not label quickly.", "Treat what you notice as questions to explore. Never use it as the only basis for hiring, promotion or judging someone."],
];
const INTERNAL = [
  ["Self-awareness & mindset", Brain, "Knowing your strengths, habits and triggers, and believing you can grow."],
  ["Emotional balance & regulation", Heart, "Noticing feelings early and choosing a calm response."],
  ["Confidence & resilience", TrendingUp, "Trusting yourself and recovering after setbacks."],
  ["Integrity, values & discipline", ShieldCheck, "Doing the right thing and following through, even when no one is watching."],
  ["Personal responsibility", ClipboardList, "Owning commitments, mistakes and progress without excuses."],
];
const EXTERNAL = [
  ["Communication & active listening", MessageSquare, "Saying things clearly and listening to understand before you reply."],
  ["Body language & posture", Eye, "Upright posture, steady eye contact and open gestures show confidence."],
  ["Respectful behaviour & empathy", Heart, "Treating everyone with courtesy and understanding how they feel."],
  ["Dressing & personal hygiene", Shirt, "Clean, neat and suitable for the setting. It shows care, not wealth."],
  ["Professional etiquette", Sparkles, "Being punctual, prepared, polite and clear in every interaction."],
  ["Leadership & collaboration", Flag, "Taking initiative, sharing credit and helping the team move forward."],
];

const IDENT_CSS = `
.pd-ill{width:100%;max-width:640px;margin:0 auto;display:block}
.pd-ic{width:38px;height:38px;border-radius:11px;background:var(--c);display:flex;align-items:center;justify-content:center;flex:none}
.pd-idc{display:flex;gap:12px;align-items:flex-start;border-top:3px solid var(--c)}
.pd-idc .pd-h3{margin-bottom:3px}.pd-idc .pd-sub{margin-bottom:0}
.pd-fcard{border-top:4px solid var(--c)}.pd-fcard .pd-ic{margin-bottom:10px}.pd-fcard .pd-sub{margin-bottom:0}
#pd-identify .pd-mq-track>div,#pd-external .pd-mq-track>div{flex-basis:clamp(270px,24vw,330px)}
.pd-warn{margin-top:14px;border-color:#d97706;background:rgba(217,119,6,.08)}
.pd-warn-h{display:flex;align-items:center;gap:8px;color:#d97706;margin-bottom:4px}.pd-warn-h .pd-h3{color:inherit;margin:0}
.pd-warn ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:10px 20px;margin-top:8px}
.pd-warn li{font-size:13.5px;line-height:1.55;color:var(--pd-sub)}.pd-warn li b{color:var(--pd-text)}
@media(max-width:700px){.pd-warn ul{grid-template-columns:1fr}}
`;

const SHORT = ["Communication", "Body language", "Behaviour", "Emotions", "Confidence", "Consistency"];

function IdentifyMap() {
  const cx = 320, cy = 250, rx = 250, ry = 190;
  const pts = IDENTIFY.map((_, i) => {
    const a = (((210 + i * 60) % 360) * Math.PI) / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });
  return (
    <svg className="pd-ill" viewBox="0 0 640 520" role="img" aria-label="How to identify personality: six signals around a person" fontFamily="Plus Jakarta Sans,sans-serif">
      <defs><clipPath id="pdc"><circle cx={cx} cy={cy} r="96" /></clipPath></defs>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="var(--pd-border)" strokeWidth="1.5" strokeDasharray="4 6" />
      {IDENTIFY.map(([t, , side], i) => (
        <line key={t} x1={cx} y1={cy} x2={pts[i][0]} y2={pts[i][1]} stroke={side === "L" ? "#f97316" : "#0e8fa8"} strokeWidth="2" strokeDasharray="5 5" strokeOpacity=".7" />
      ))}
      <circle cx={cx} cy={cy} r="120" fill="#f9731626" />
      <circle cx={cx} cy={cy} r="96" fill="#12141c" />
      <g clipPath="url(#pdc)">
        <ellipse cx={cx} cy="348" rx="82" ry="64" fill="#fb923c" />
        <circle cx={cx} cy="222" r="36" fill="#fdba74" />
      </g>
      <Brain x={cx - 15} y="207" size={30} color="#12141c" strokeWidth={2} />
      <circle cx="226" cy="168" r="4" fill="#0e8fa8" /><circle cx="418" cy="176" r="5" fill="#f97316" /><circle cx="236" cy="338" r="3.5" fill="#f97316" /><circle cx="408" cy="332" r="4" fill="#0e8fa8" />
      {IDENTIFY.map(([t, , side, , Icon], i) => {
        const [x, y] = pts[i], c = side === "L" ? "#f97316" : "#0e8fa8";
        return (
          <g key={t}>
            <circle cx={x} cy={y} r="32" fill={c} stroke="var(--pd-card)" strokeWidth="5" />
            <Icon x={x - 14} y={y - 14} size={28} color="#fff" strokeWidth={2} />
            <text x={x} y={y + 56} textAnchor="middle" fontSize="16" fontWeight="600" style={{ fill: "var(--pd-text)" }}>{SHORT[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function FoundationGrid({ items, c }) {
  return (
    <div className="pd-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))" }}>
      {items.map(([t, Icon, d]) => (
        <div key={t} className="pd-card pd-fcard" style={{ "--c": c }}>
          <div className="pd-ic"><Icon size={20} color="#fff" /></div>
          <h3 className="pd-h3">{t}</h3>
          <p className="pd-sub">{d}</p>
        </div>
      ))}
    </div>
  );
}

function IdentifyPersonality() {
  return (
    <>
      <style>{IDENT_CSS}</style>
      <section className="pd-sec" id="pd-identify"><div className="pd-wrap">
        <Head badge="Identify" title='How to <span style="color:#f97316">Identify Personality?</span>' sub="Personality shows up as patterns in what people say, do and feel. Look at six signals together, over time, and never from one observation." />
        <div className="pd-card" style={{ padding: 16 }}>
          <IdentifyMap />
          <p className="pd-note">Observe patterns over time, not single moments.</p>
        </div>
        <Marquee d={45} items={IDENTIFY.map(([t, , side, , Icon, d], i) => (
          <div key={`e${i}`}>
            <div className="pd-card pd-idc" style={{ "--c": side === "L" ? "#f97316" : "#0e8fa8" }}>
              <div className="pd-ic"><Icon size={20} color="#fff" /></div>
              <div><h3 className="pd-h3">{t}</h3><p className="pd-sub">{d}</p></div>
            </div>
          </div>
        ))} />
        <div className="pd-card pd-warn">
          <div className="pd-warn-h"><AlertTriangle size={20} /><h3 className="pd-h3">Be careful before you judge</h3></div>
          <p className="pd-sub" style={{ marginBottom: 0 }}>Personality cannot be accurately determined from appearance or from one isolated behaviour.</p>
          <ul>{CAUTION.map(([h, p]) => <li key={h}><b>{h}</b> {p}</li>)}</ul>
        </div>
      </div></section>

      <section className="pd-sec" id="pd-internal"><div className="pd-wrap">
        <Head badge="Internal" title='Internal <span style="color:#0e8fa8">Foundation</span>' sub="What is built within. It is hard to see from outside, but it drives everything others notice." />
        <FoundationGrid items={INTERNAL} c="#0e8fa8" />
      </div></section>

      <section className="pd-sec" id="pd-external"><div className="pd-wrap">
        <Head badge="External" title='External <span style="color:#f97316">Foundation</span>' sub="What shows outside. These visible signals work best when they come from a strong internal base." />
        <Marquee rev d={45} items={EXTERNAL.map(([t, Icon, d], i) => (
          <div key={`x${i}`}>
            <div className="pd-card pd-fcard" style={{ "--c": "#f97316" }}>
              <div className="pd-ic"><Icon size={20} color="#fff" /></div>
              <h3 className="pd-h3">{t}</h3>
              <p className="pd-sub">{d}</p>
            </div>
          </div>
        ))} />
      </div></section>
    </>
  );
}

/* ═══ JOURNEY DIAGRAM + TRACKER ═══ */
function JourneyDiagram({ done }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`pd-card pd-jr${on ? " on" : ""}`}>
      <svg className="pd-jsv" viewBox="0 0 1000 470" role="img" aria-label="30-day journey: milestones on day 1, 5, 10, 15, 20, 25 and 30" fontFamily="Space Grotesk,sans-serif">
        <defs><linearGradient id="pdjg" gradientUnits="userSpaceOnUse" x1="110" y1="0" x2="890" y2="0">{[[0, "#0e8fa8"], [.25, "#0e8fa8"], [.4, "#f97316"], [.55, "#f97316"], [.65, "#22c55e"], [.78, "#22c55e"], [.9, "#c2410c"]].map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}</linearGradient></defs>
        <path className="rib" d={RIBBON} stroke="#e6e8f0" />
        <path className="rib rib2" pathLength="1" d={RIBBON} stroke="url(#pdjg)" />
        {MILES.map(([d, cap, Icon, pos], k) => {
          const x = MX[k], y = k % 2 ? 130 : 250, c = stageColor(d);
          return (
            <g key={d} className={`jn${done[d] ? " done" : ""}`} style={{ "--c": c, transitionDelay: `${0.3 + k * 0.35}s` }}>
              {pos === "b" && <><line x1={x} y1={y + 45} x2={x} y2="314" stroke={c} strokeWidth="2" strokeDasharray="4 4" /><circle cx={x} cy="340" r="26" fill={c} /><Icon x={x - 13} y={327} size={26} color="#fff" /><text x={x} y="384" textAnchor="middle" fontSize="13" fontWeight="600" fill="#64748b">{cap}</text></>}
              {pos === "t" && <><line x1={x} y1="86" x2={x} y2={y - 45} stroke={c} strokeWidth="2" strokeDasharray="4 4" /><circle cx={x} cy="60" r="26" fill={c} /><Icon x={x - 13} y={47} size={26} color="#fff" /><text x={x} y="20" textAnchor="middle" fontSize="13" fontWeight="600" fill="#64748b">{cap}</text></>}
              {pos === "n" && <><line x1={x} y1="76" x2={x} y2={y - 45} stroke={c} strokeWidth="2" strokeDasharray="4 4" /><rect x={x - 55} y="40" width="110" height="36" rx="10" fill={c} /><text x={x} y="64" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">{d === 1 ? "START" : "FINISH"}</text><text x={x} y={y + 78} textAnchor="middle" fontSize="13" fontWeight="600" fill="#64748b">{cap}</text></>}
              <g transform={`translate(${x} ${y})`}><rect className="dm" x="-32" y="-32" width="64" height="64" rx="10" transform="rotate(45)" /><text className="dt" y="-4" textAnchor="middle" fontSize="12">DAY</text><text className="dt" y="17" textAnchor="middle" fontSize="21">{String(d).padStart(2, "0")}</text></g>
            </g>
          );
        })}
        <g className="jn" style={{ transitionDelay: "2.8s" }}><rect x="400" y="424" width="200" height="40" rx="20" fill="#12141c" /><text x="440" y="449" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">TOTAL</text><rect x="482" y="426" width="36" height="36" rx="6" transform="rotate(45 500 444)" fill="#f97316" /><text x="500" y="450" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff">30</text><text x="562" y="449" textAnchor="middle" fontSize="12" fontWeight="600" fill="#fff">DAYS</text></g>
      </svg>
      <ol className="pd-jrl">{MILES.map(([d, cap]) => <li key={d} className={done[d] ? "done" : ""} style={{ "--c": stageColor(d) }}><b>Day {d}</b> · {cap}</li>)}</ol>
      <div className="pd-legend2">{STAGES.map((s) => <span key={s[0]} style={{ "--c": s[3] }}>{s[0]} · Days {s[1]}–{s[2]}</span>)}</div>
      <p className="pd-note">Each diamond fills in when you finish that day’s task in the tracker below.</p>
    </div>
  );
}

function Tracker({ tk, setTk, ok }) {
  const [cur, setCur] = useState(0);
  const s = STAGES[cur];
  const cnt = (a, b) => { let c = 0; for (let d = a; d <= b; d++) if (tk.d[d]) c++; return c; };
  const total = cnt(1, 30), pc = Math.round((total / 30) * 100);
  const days = []; for (let d = s[1]; d <= s[2]; d++) days.push(d);
  return (
    <div className="pd-card" style={{ marginTop: 14 }}>
      <h3 className="pd-h3">Daily tracker</h3>
      <p className="pd-sub">Tick each task when you finish it. Progress and reflections are saved in this browser.</p>
      {!ok && <p className="pd-err">Your browser is blocking storage, so progress will reset when you refresh.</p>}
      <div className="pd-row-b"><b>{total} of 30 tasks done</b><b>{pc}%</b></div>
      <div className="pd-bar"><i style={{ width: `${pc}%` }} /></div>
      <div className="pd-tabs" role="tablist" aria-label="Stages">
        {STAGES.map((g, i) => <button key={g[0]} type="button" role="tab" aria-selected={i === cur} className="pd-tab" onClick={() => setCur(i)}>{g[0]} <small>{cnt(g[1], g[2])}/{g[2] - g[1] + 1}</small></button>)}
      </div>
      {days.map((d) => (
        <label key={d} className={`pd-tk${tk.d[d] ? " dn" : ""}`}>
          <input type="checkbox" checked={!!tk.d[d]} onChange={(e) => setTk((p) => { const n = { ...p.d }; if (e.target.checked) n[d] = true; else delete n[d]; return { ...p, d: n }; })} />
          <span><b>Day {d}.</b> {TASKS[d - 1]}</span>
        </label>
      ))}
      <label className="pd-lbl" htmlFor="pd-note" style={{ marginTop: 14 }}>Weekly reflection ({s[0]}): {s[4]}</label>
      <textarea id="pd-note" className="pd-in" rows={3} placeholder="Write a few lines. Only you can see this." value={tk.n[s[0]] || ""} onChange={(e) => setTk((p) => ({ ...p, n: { ...p.n, [s[0]]: e.target.value } }))} />
      <div className="pd-sum"><b>Summary</b>
        <ul>{STAGES.map((g) => { const dd = []; for (let d = g[1]; d <= g[2]; d++) if (tk.d[d]) dd.push(d); return <li key={g[0]}><b>{g[0]}:</b> {dd.length}/{g[2] - g[1] + 1} done{dd.length ? ` (day ${dd.join(", ")})` : ""}{tk.n[g[0]] ? " · reflection saved" : ""}</li>; })}</ul>
        <button type="button" className="pd-btn s sm" onClick={() => { if (window.confirm("Reset all progress and reflections?")) setTk({ d: {}, n: {} }); }}>Reset progress</button>
      </div>
    </div>
  );
}

/* ═══ SELF-CHECK ═══ */
function SelfCheck() {
  const [att, setAtt, ok] = useLS("pd_attempts", []);
  const [ans, setAns] = useState({});
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const miss = QS.findIndex((_, i) => !ans[i]);
    if (miss > -1) { setErr(`Answer all 10 statements. Statement ${miss + 1} is still blank.`); document.querySelector(`input[name="pdq${miss}"]`)?.focus(); return; }
    setErr("");
    const s = PN.map((_, i) => Math.round(((ans[2 * i] + ans[2 * i + 1] - 2) / 8) * 100));
    setAtt((p) => [...p, { t: Date.now(), s }].slice(-10));
  };
  const last = att[att.length - 1];
  const L = last?.s, ov = L ? Math.round(L.reduce((a, b) => a + b, 0) / 5) : 0;
  const ord = L ? L.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]) : [];
  const top = ord.filter((o) => o[0] >= 70).map((o) => PN[o[1]]), hi = top.length ? top : ord[0] ? [PN[ord[0][1]]] : [], low = ord.slice(-2).reverse();
  return (
    <div className="pd-two pd-top">
      <form className="pd-card" onSubmit={submit} noValidate>
        <p className="pd-sub">How often is each statement true for you? Never · Rarely · Sometimes · Often · Always</p>
        {QS.map((q, i) => (
          <fieldset key={i} className="pd-q"><legend>{i + 1}. {q}</legend>
            <div className="pd-lk">{OPT.map((o, j) => <label key={o}><input type="radio" name={`pdq${i}`} value={j + 1} checked={ans[i] === j + 1} onChange={() => setAns((p) => ({ ...p, [i]: j + 1 }))} aria-label={o} />{o}</label>)}</div>
          </fieldset>
        ))}
        <div className="pd-err" role="alert">{err}</div>
        <button className="pd-btn p" type="submit">See my results</button>
      </form>
      <div aria-live="polite">
        {!L ? <div className="pd-card"><h3 className="pd-h3">Your results</h3><p className="pd-sub">Answer all ten statements to see your strengths, focus areas and what to practise next.</p></div> : (
          <div className="pd-card">
            <h3 className="pd-h3">Your results: {ov}% overall</h3>
            <p className="pd-sub">Attempt {att.length}, {new Date(last.t).toLocaleDateString()}. This shows how you see yourself right now, not a final verdict.</p>
            {!ok && <p className="pd-err">Results are shown but your browser blocked saving them.</p>}
            {L.map((v, i) => <div key={i} className="pd-rw"><div><b>{PN[i]}</b><span style={{ color: band(v)[1], fontWeight: 600 }}>{band(v)[0]} · {v}%</span></div><div className="pd-bar"><i style={{ width: `${v}%` }} /></div></div>)}
            <h4 className="pd-h4">{top.length ? "Strengths" : "Your highest area"}</h4>
            <p className="pd-sub">{hi.join(", ")}. Keep using {hi.length > 1 ? "these" : "this"} and look for ways to help others with it.</p>
            <h4 className="pd-h4">Improvement areas and what to practise</h4>
            <ul className="pd-ul">{low.map((o) => <li key={o[1]}><b>{PN[o[1]]} ({o[0]}%).</b> {RECS[o[1]]}</li>)}</ul>
            {att.length > 1 && (
              <>
                <h4 className="pd-h4">Compare: first attempt and latest</h4>
                <div style={{ overflowX: "auto" }}><table className="pd-table"><thead><tr><th>Area</th><th>First</th><th>Latest</th><th>Change</th></tr></thead>
                  <tbody>{PN.map((p, i) => { const c = L[i] - att[0].s[i]; return <tr key={p}><td>{p}</td><td>{att[0].s[i]}%</td><td>{L[i]}%</td><td>{c > 0 ? "+" : ""}{c}</td></tr>; })}</tbody></table></div>
              </>
            )}
            <div className="pd-actions"><button type="button" className="pd-btn s sm" onClick={() => { setAns({}); setErr(""); }}>Retake</button><button type="button" className="pd-btn s sm" onClick={() => { if (window.confirm("Delete all saved self-check results?")) setAtt([]); }}>Clear saved results</button></div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ REGISTRATION MODAL ═══ */
const GOALS = ["Self-Awareness", "Confidence", "Communication", "Emotional Control", "Leadership", "Discipline & Habits"];
const CHALLENGES = ["Fear of public speaking", "Overthinking / stress", "Low self-confidence", "Poor listening", "Procrastination", "Handling conflict"];
function RegisterModal({ onClose }) {
  const [f, setF] = useState({ name: "", email: "", goal: GOALS[0], challenge: CHALLENGES[0], energy: "Introvert", mbti: "Not sure", dailyTime: "10 min" });
  const [st, setSt] = useState("idle");
  const [msg, setMsg] = useState("");
  const [res, setRes] = useState(null);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);
  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email.trim())) { setSt("error"); setMsg("Enter your full name and a valid email address."); return; }
    setSt("loading"); setMsg("");
    try { setRes(await submitRegistration({ ...f, name: f.name.trim(), email: f.email.trim() })); setSt("ok"); }
    catch (err) { setSt("error"); setMsg(regErr(err)); }
  };
  const Sel = ({ k, label, opts }) => <div><label className="pd-lbl" htmlFor={`pd-${k}`}>{label}</label><select id={`pd-${k}`} className="pd-in" value={f[k]} onChange={set(k)}>{opts.map((o) => <option key={o}>{o}</option>)}</select></div>;
  return (
    <div className="pd-modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pd-mb" role="dialog" aria-modal="true" aria-label="Registration form">
        <button type="button" className="pd-x" onClick={onClose} aria-label="Close"><X size={20} /></button>
        {st === "ok" ? (
          <div style={{ textAlign: "center" }}>
            <CheckCircle2 size={52} color="#16a34a" />
            <h3 className="pd-h3" style={{ fontSize: 22, marginTop: 8 }}>Registration confirmed</h3>
            <p className="pd-sub" style={{ margin: "8px auto" }}>Thanks, {f.name.trim()}. {res?.message ? `${res.message} ` : ""}{res?.emailSent === true ? `We have emailed your assessment link to ${f.email.trim()}. Check your spam folder if you do not see it.` : "Your details are saved. Email delivery is not confirmed yet, so you will not get a link until the service confirms it. You can take the self-check on this page now."}</p>
            <div className="pd-actions" style={{ justifyContent: "center" }}><a className="pd-btn s" href="#pd-check" onClick={(e) => { onClose(); goTo("pd-check")(e); }}>Take the self-check</a><button type="button" className="pd-btn p" onClick={onClose}>Done</button></div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h3 className="pd-h3">Create your free profile</h3>
            <p className="pd-sub">Tell us what you need. We tailor your assessment and plan to it.</p>
            <div className="pd-fg">
              <div><label className="pd-lbl" htmlFor="pd-name">Full name</label><input id="pd-name" className="pd-in" autoComplete="name" value={f.name} onChange={set("name")} placeholder="Your full name" autoFocus /></div>
              <div><label className="pd-lbl" htmlFor="pd-email">Email</label><input id="pd-email" type="email" className="pd-in" autoComplete="email" value={f.email} onChange={set("email")} placeholder="you@example.com" /></div>
              <Sel k="goal" label="Main growth goal" opts={GOALS} /><Sel k="challenge" label="Biggest challenge" opts={CHALLENGES} />
              <Sel k="energy" label="Energy style" opts={["Introvert", "Extrovert", "Ambivert"]} /><Sel k="mbti" label="MBTI type" opts={["Not sure", ...MBTI.map((m) => m[0])]} />
              <Sel k="dailyTime" label="Daily time" opts={["10 min", "20 min", "30 min", "1 hour"]} />
            </div>
            <div className="pd-err" role="alert">{msg}</div>
            <button className="pd-btn p" type="submit" disabled={st === "loading"} style={{ width: "100%" }}>{st === "loading" ? "Submitting…" : "Submit and start assessment"}</button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ═══ HERO SLIDER (text left, image right, auto-moving) ═══ */
const hsrc = (m) => m?.src || m;
const HERO = [
  { title: "Know your personality.", accent: " Improve it. Prove it.", text: "A practical 30-day personality development program. Learn the skills, follow a daily plan, take the self-check and re-test to see real change.", img: hsrc(hero1), alt: "Person climbing steps toward a goal flag", link: ["See how it works", "pd-how"] },
  { title: "Track your growth,", accent: " one day at a time.", text: "Each day has one small task. Tick it off, write a short weekly reflection and watch your progress build across four stages.", img: hsrc(hero2), alt: "Personal growth charts and progress", link: ["See the 30-day plan", "pd-journey"] },
    { title: "Balance pressure,", accent: " people and growth.", text: "Real growth is balance: staying steady under pressure, working well with others and helping them move forward. Active listening and clear speaking make that possible.", img: hsrc(hero3), alt: "Person balancing on a tightrope with teamwork and helping scenes", link: ["Learn the skills", "pd-learn"] },
  { title: "Seven areas that", accent: " shape your growth.", text: "Self-reflection, self-development, emotional balance, mentoring, confidence and motivation work together. Build them from within first.", img: hsrc(hero4), alt: "Personal growth icons: self reflection, development, emotional balance, mentoring, confidence, motivation", link: ["See the inner foundation", "pd-internal"] },
  { title: "Four areas build", accent: " your personality.", text: "Emotional, social, physical and professional skills grow together. Strengthen all four and the way you come across changes.", img: hsrc(hero5), alt: "Circular diagram of emotional, social, physical and professional growth areas", link: ["See the outer foundation", "pd-external"] },
];

const HERO_CSS = `
.pd-hs-view{overflow:hidden}
.pd-hs-track{display:flex;transition:transform .7s cubic-bezier(.65,0,.35,1)}
.pd-hs-slide{flex:0 0 100%;min-width:0;display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,2vw,24px);align-items:center;padding:0}
.pd-hs-h{font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.8vw,44px);line-height:1.12;letter-spacing:-.03em;color:var(--pd-text);margin-bottom:10px}
.pd-hs-p{font-size:clamp(14px,1.6vw,16.5px);line-height:1.65;color:var(--pd-sub);max-width:none;margin-bottom:6px}
.pd-hs-img{background:#fff;border:1px solid var(--pd-border);border-radius:20px;box-shadow:var(--pd-shadow);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;padding:clamp(6px,1vw,12px);overflow:hidden}
.pd-hs-img img{width:100%;height:100%;object-fit:contain;display:block}
.pd-hs-ctl{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:12px}
.pd-hs-arrow{width:34px;height:34px;border-radius:50%;border:1.5px solid var(--pd-border);background:transparent;color:var(--pd-text);display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
.pd-hs-arrow:hover{border-color:#f97316;color:#f97316}
.pd-hs-arrow:focus-visible,.pd-hs-dot:focus-visible{outline:2px solid #f97316;outline-offset:3px}
.pd-hs-dots{display:flex;gap:8px;align-items:center}
.pd-hs-dot{width:9px;height:9px;border-radius:99px;border:0;padding:0;background:var(--pd-bar);cursor:pointer;transition:width .3s,background .3s}
.pd-hs-dot[aria-current=true]{width:26px;background:#f97316}
@media(max-width:800px){.pd-hs-slide{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){.pd-hs-track{transition:none}}
`;

function HeroSlider({ onStart }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = HERO.length;
  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % n), 5000);
    return () => clearInterval(id);
  }, [paused, n, i]);
  return (
    <section className="pd-hero" aria-roledescription="carousel" aria-label="Personality development highlights"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <style>{HERO_CSS}</style>
      <div className="pd-wrap">
        <div className="pd-hs-view">
          <div className="pd-hs-track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {HERO.map((s, k) => {
              const H = k === 0 ? "h1" : "h2";
              return (
                <div key={k} className="pd-hs-slide" role="group" aria-roledescription="slide" aria-label={`${k + 1} of ${n}`} aria-hidden={k !== i} inert={k !== i ? "" : undefined}>
                  <div>
                    <H className="pd-hs-h">{s.title}<span style={{ color: "#f97316" }}>{s.accent}</span></H>
                    <p className="pd-hs-p">{s.text}</p>
                                        <div className="pd-actions">
                      <button type="button" className="pd-btn p" onClick={onStart}>Start Free Assessment <ArrowRight size={15} /></button>
                      <a className="pd-btn s" href={`#${s.link[1]}`} onClick={goTo(s.link[1])}>{s.link[0]}</a>
                    </div>
                    <div className="pd-stats"><div><b>2</b>free assessments</div><div><b>30 days</b>guided plan</div><div><b>16</b>MBTI types explained</div><div><b>₹199</b>from Assessment 3</div></div>
                  </div>
                  <div className="pd-hs-img"><img src={s.img} alt={s.alt} loading={k === 0 ? "eager" : "lazy"} /></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pd-hs-ctl">
          <button type="button" className="pd-hs-arrow" aria-label="Previous slide" onClick={() => setI((i - 1 + n) % n)}><ChevronLeft size={18} /></button>
          <div className="pd-hs-dots">{HERO.map((_, k) => <button key={k} type="button" className="pd-hs-dot" aria-label={`Go to slide ${k + 1}`} aria-current={k === i} onClick={() => setI(k)} />)}</div>
          <button type="button" className="pd-hs-arrow" aria-label="Next slide" onClick={() => setI((i + 1) % n)}><ChevronRight size={18} /></button>
        </div>
             </div>
    </section>
  );
}

/* ═══ CSS ═══ */
const PD_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.pd-page,.pd-page *,.pd-page *::before,.pd-page *::after{box-sizing:border-box}
.pd-page h1,.pd-page h2,.pd-page h3,.pd-page h4,.pd-page p,.pd-page ul,.pd-page ol{margin:0;padding:0}
.pd-page{font-family:'Plus Jakarta Sans',sans-serif;overflow-x:hidden;scroll-behavior:smooth;-webkit-text-size-adjust:100%}
.pd-page h1,.pd-page h2,.pd-page h3,.pd-page h4,.pd-page b{font-weight:500}
.pd-page a{color:inherit;text-decoration:none}
.pd-wrap{width:100%;max-width:1760px;margin:0 auto;padding:0 clamp(12px,2.4vw,32px)}
.pd-sec{padding:clamp(16px,2.6vw,26px) 0;scroll-margin-top:80px}
.pd-head{text-align:center;margin-bottom:clamp(10px,1.8vw,16px)}
.pd-badge{display:inline-flex;background:rgba(249,115,22,.08);border:1px solid rgba(249,115,22,.22);border-radius:99px;padding:4px 14px;margin-bottom:6px;font-size:12.5px;font-weight:500;color:#f97316}
.pd-head h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,2.6vw,30px);line-height:1.15;letter-spacing:-.03em;color:var(--pd-text);margin-bottom:4px}
.pd-head p{color:var(--pd-sub);font-size:14px;max-width:760px;margin:0 auto;line-height:1.5}
.pd-card{background:var(--pd-card);border:1px solid var(--pd-border);border-radius:16px;padding:14px;box-shadow:var(--pd-shadow);min-width:0}
.pd-h3{font-family:'Space Grotesk',sans-serif;font-size:16px;letter-spacing:-.02em;color:var(--pd-text);margin-bottom:4px}
.pd-h4{font-family:'Space Grotesk',sans-serif;font-size:14px;color:var(--pd-text);margin:12px 0 4px}
.pd-sub{font-size:13.5px;line-height:1.55;color:var(--pd-sub);margin-bottom:8px}
.pd-ul{padding-left:18px;font-size:13.5px;line-height:1.55;color:var(--pd-sub)}
.pd-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px}
.pd-two{display:grid;grid-template-columns:1fr 1fr;gap:14px;align-items:center}.pd-top{align-items:start}
@media(max-width:900px){.pd-two{grid-template-columns:1fr}}
.pd-btn{font-family:inherit;cursor:pointer;border-radius:12px;padding:11px 20px;font-size:14px;font-weight:500;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.pd-btn.p{background:#f97316;color:#fff;border:1.5px solid #f97316}.pd-btn.s{background:transparent;color:var(--pd-text);border:1.5px solid var(--pd-border)}
.pd-btn.sm{padding:7px 14px;font-size:13px}.pd-btn[disabled]{opacity:.6;cursor:wait}
.pd-btn:focus-visible,.pd-tab:focus-visible,.pd-in:focus-visible,summary:focus-visible,.pd-tk input:focus-visible{outline:2px solid #f97316;outline-offset:3px}
.pd-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.pd-hero{padding:clamp(18px,3vw,30px) 0;border-bottom:1px solid var(--pd-border)}
.pd-hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3.6vw,38px);line-height:1.15;letter-spacing:-.03em;color:var(--pd-text);margin:8px 0 6px}
.pd-hero p.l{font-size:clamp(14px,1.8vw,16px);line-height:1.6;color:var(--pd-sub);max-width:760px;margin-bottom:14px}
.pd-stats{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}.pd-stats div{background:var(--pd-pill);border:1px solid var(--pd-border);border-radius:12px;padding:8px 14px;font-size:12.5px;color:var(--pd-muted)}.pd-stats b{display:block;font-family:'Space Grotesk',sans-serif;font-size:18px;color:var(--pd-text)}
.pd-step{border-top:3px solid var(--c)}.pd-step small{font-size:11px;color:var(--c);font-weight:600}
.pd-map{width:100%;display:block}.pd-maplist{display:none;grid-template-columns:1fr 1fr;gap:8px}.pd-legend{text-align:center;font-size:12.5px;margin-top:8px}
.pd-chip{padding:10px;border-radius:12px;border:1px solid;font-size:13px;font-weight:500}.pd-chip.in{color:#0b6f84;background:#0e8fa81a;border-color:#0e8fa8}.pd-chip.ex{color:#c2410c;background:#f973161a;border-color:#f97316}
@media(max-width:700px){.pd-map{display:none}.pd-maplist{display:grid}}
.pd-ie{display:flex;flex-direction:column;gap:10px}.pd-ie .pd-card{border-top:4px solid var(--c)}
details.pd-dt{border:1px solid var(--pd-border);border-radius:14px;background:var(--pd-card);padding:0 14px;box-shadow:var(--pd-shadow)}
details.pd-dt summary{cursor:pointer;padding:12px 0;font-family:'Space Grotesk',sans-serif;font-size:15px;color:var(--pd-text)}
.pd-dt .bd{padding-bottom:12px;font-size:13.5px;color:var(--pd-sub);line-height:1.55}.pd-dt h4{margin:10px 0 3px;font-size:13px;color:#f97316}
.pd-tag{display:inline-block;font-size:11px;font-weight:600;border:1px solid;border-radius:99px;padding:1px 9px;margin-right:8px}
.pd-fig{margin:0;background:var(--pd-card);border:1px solid var(--pd-border);border-radius:16px;overflow:hidden;box-shadow:var(--pd-shadow)}.pd-fig img{width:100%;height:auto;display:block}.pd-fig figcaption{padding:10px 14px;font-size:13px;color:var(--pd-sub);border-top:1px solid var(--pd-border)}
.pd-jr .pd-jsv{width:100%;display:block}.pd-jr .rib{fill:none;stroke-width:26;stroke-linecap:round}
.pd-jr .rib2{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 2.6s ease}.pd-jr.on .rib2{stroke-dashoffset:0}
.pd-jr .jn{opacity:0;transform:scale(.7);transform-box:fill-box;transform-origin:center;transition:opacity .5s,transform .5s}.pd-jr.on .jn{opacity:1;transform:none}
.pd-jr .dm{fill:#fff;stroke:var(--c);stroke-width:4;transition:fill .3s}.pd-jr .done .dm{fill:var(--c)}.pd-jr .dt{fill:#1b2033;font-weight:700}.pd-jr .done .dt{fill:#fff}
.pd-jrl{display:none;list-style:none;padding:0 0 0 18px!important;border-left:3px solid var(--pd-border)}.pd-jrl li{position:relative;padding:7px 0 7px 14px;font-size:14px;color:var(--pd-sub)}
.pd-jrl li::before{content:"";position:absolute;left:-27px;top:12px;width:14px;height:14px;border-radius:50%;background:var(--c);border:3px solid var(--pd-card);box-shadow:0 0 0 2px var(--c)}.pd-jrl li.done b::after{content:" ✓";color:#16a34a}.pd-jrl b{color:var(--pd-text)}
.pd-legend2{display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font-size:12.5px;color:var(--pd-sub);margin-top:6px}.pd-legend2 span::before{content:"";display:inline-block;width:10px;height:10px;border-radius:3px;background:var(--c);margin-right:6px}
.pd-note{text-align:center;font-size:12.5px;color:var(--pd-muted);margin-top:6px}
@media(max-width:760px){.pd-jsv{display:none}.pd-jrl{display:block}}
@media(prefers-reduced-motion:reduce){.pd-jr .rib2{stroke-dashoffset:0;transition:none}.pd-jr .jn{opacity:1;transform:none;transition:none}}
.pd-row-b{display:flex;justify-content:space-between;font-size:13.5px;color:var(--pd-text);margin-bottom:6px}
.pd-bar{height:10px;background:var(--pd-bar);border-radius:9px;overflow:hidden}.pd-bar i{display:block;height:100%;background:linear-gradient(90deg,#0e8fa8,#f97316);transition:width .4s}
.pd-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0}.pd-tab{font-family:inherit;font-size:13.5px;font-weight:500;padding:7px 14px;border-radius:12px;cursor:pointer;background:transparent;color:var(--pd-text);border:1.5px solid var(--pd-border)}.pd-tab[aria-selected=true]{border-color:#f97316;background:rgba(249,115,22,.1);color:#f97316}
.pd-tk{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--pd-border);cursor:pointer;font-size:14px;color:var(--pd-text);align-items:flex-start}.pd-tk input{width:19px;height:19px;margin-top:2px;accent-color:#f97316;flex:none}.pd-tk.dn span{color:var(--pd-muted);text-decoration:line-through}
.pd-lbl{display:block;font-size:12.5px;font-weight:500;color:var(--pd-sub);margin:10px 0 4px}
.pd-in{width:100%;padding:9px 12px;border:1px solid var(--pd-border);border-radius:10px;font:inherit;font-size:14px;background:var(--pd-pill);color:var(--pd-text)}
.pd-sum{margin-top:14px;font-size:13.5px;color:var(--pd-sub)}.pd-sum ul{padding-left:18px;margin:4px 0 10px}
.pd-err{color:#dc2626;font-size:13px;min-height:18px;margin:6px 0}
.pd-q{border:0;padding:0;margin:0 0 12px;min-width:0}.pd-q legend{font-size:13.5px;font-weight:500;color:var(--pd-text);padding:0;margin-bottom:6px}
.pd-lk{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}.pd-lk label{position:relative;text-align:center;border:1.5px solid var(--pd-border);border-radius:10px;padding:8px 2px;font-size:11.5px;color:var(--pd-text);cursor:pointer}
.pd-lk input{position:absolute;inset:0;width:100%;height:100%;opacity:0;margin:0;cursor:pointer}.pd-lk label:has(input:checked){border-color:#f97316;background:rgba(249,115,22,.1);font-weight:700}.pd-lk label:has(input:focus-visible){outline:2px solid #f97316}
.pd-rw{margin:10px 0}.pd-rw>div:first-child{display:flex;justify-content:space-between;gap:8px;font-size:13.5px;color:var(--pd-text);margin-bottom:3px}
.pd-table{width:100%;border-collapse:collapse;font-size:13px}.pd-table th,.pd-table td{padding:8px 10px;border-bottom:1px solid var(--pd-border);text-align:left;color:var(--pd-sub)}.pd-table th{background:#f97316;color:#fff}
.pd-mq{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent);mask-image:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent);margin-top:8px}
.pd-mq-track{display:flex;gap:12px;width:max-content;padding:4px 0;animation:pdMq 45s linear infinite}.pd-mq-track.rev{animation-direction:reverse}.pd-mq:hover .pd-mq-track{animation-play-state:paused}
.pd-mq-track>div{flex:0 0 clamp(170px,16vw,220px);display:flex}.pd-mq-track>div>.pd-card{flex:1}.pd-mq-track.wide>div{flex-basis:clamp(240px,21vw,290px)}
@keyframes pdMq{to{transform:translateX(calc(-50% - 6px))}}
@media(prefers-reduced-motion:reduce){.pd-mq{overflow-x:auto;-webkit-mask-image:none;mask-image:none}.pd-mq-track{animation:none}}
.pd-mbti{text-align:center;padding:10px}.pd-mbti b{display:block;font-family:'Space Grotesk',sans-serif;font-size:20px}.pd-mbti small{color:var(--pd-muted);display:block;font-size:12px}
.pd-cta{background:linear-gradient(135deg,#1E293B,#0f172a);padding:16px 0;margin-top:clamp(16px,2.6vw,26px)}
.pd-cta-in{display:flex;align-items:center;justify-content:space-between;gap:14px 32px;flex-wrap:wrap}.pd-cta h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,2.6vw,28px);line-height:1.2;letter-spacing:-.03em;color:#fff;margin-bottom:4px}.pd-cta p{font-size:14px;color:rgba(255,255,255,.6);max-width:640px;line-height:1.5}
.pd-cta .pd-btn.s{color:#fff;border-color:rgba(255,255,255,.2)}
@media(max-width:600px){.pd-cta-in{text-align:center;justify-content:center}.pd-cta .pd-actions{width:100%;flex-direction:column}.pd-cta .pd-btn{width:100%}}
.pd-disc{font-size:12.5px;line-height:1.55;color:var(--pd-muted);text-align:center;max-width:900px;margin:14px auto 0}
.pd-modal{position:fixed;inset:0;z-index:1000;background:rgba(5,7,12,.78);overflow-y:auto;padding:16px}
.pd-mb{position:relative;max-width:640px;margin:20px auto;background:var(--pd-card);color:var(--pd-text);border:1px solid var(--pd-border);border-radius:20px;padding:22px}
.pd-x{position:absolute;top:10px;right:10px;background:none;border:0;cursor:pointer;color:var(--pd-muted);padding:6px}
.pd-fg{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}@media(max-width:560px){.pd-fg{grid-template-columns:1fr}.pd-lk label{font-size:10.5px}}
@media(max-width:600px){.pd-g{grid-template-columns:1fr}.pd-card{padding:12px}}
.pd-page ::-webkit-scrollbar{width:6px;height:6px}.pd-page ::-webkit-scrollbar-thumb{background:rgba(249,115,22,.3);border-radius:99px}
`;

/* ═══ PAGE ═══ */
export default function PersonalityDevelopment({ theme: themeProp, toggleTheme: toggleThemeProp, setShowLoginModal, scrollToSection }) {
  const [darkMode, setDarkMode] = useState(() => {
    try { const s = localStorage.getItem("theme"); if (s) return s === "dark"; return document.documentElement.classList.contains("dark"); } catch { return false; }
  });
  const controlled = themeProp !== undefined;
  const theme = controlled ? themeProp : darkMode ? "dark" : "light";
  const toggleTheme = () => {
    if (controlled && toggleThemeProp) { toggleThemeProp(); return; }
    setDarkMode((p) => { const n = !p; try { localStorage.setItem("theme", n ? "dark" : "light"); document.documentElement.classList.toggle("dark", n); } catch {} return n; });
  };
  useEffect(() => {
    const f = (e) => e.key === "theme" && setDarkMode(e.newValue === "dark");
    window.addEventListener("storage", f);
    return () => window.removeEventListener("storage", f);
  }, []);
  const t = theme === "dark" ? DARK : LIGHT;

  const [open, setOpen] = useState(false);
  const [tk, setTk, tkOk] = useLS("pd_track", { d: {}, n: {} });
  const rows = [MBTI.slice(0, 8), MBTI.slice(8)];

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={setShowLoginModal} scrollToSection={scrollToSection}>
      <div className="pd-page" style={{ "--pd-text": t.text, "--pd-sub": t.textSub, "--pd-muted": t.textMuted, "--pd-card": t.cardBg, "--pd-border": t.border, "--pd-pill": t.pillBg, "--pd-bar": t.barBg, "--pd-shadow": t.shadow, background: t.pageBg, color: t.text, minHeight: "100vh", transition: "background .3s,color .3s" }}>
        <style>{PD_CSS}</style>

        <HeroSlider onStart={() => setOpen(true)} />

        <section className="pd-sec" id="pd-how"><div className="pd-wrap">
          <Head badge="How it works" title='How it <span style="color:#f97316">works</span>' sub="Read everything free. Sign up only when you want your own assessment." />
          <div className="pd-g">{STEPS.map(([h, p, c], i) => <div key={h} className="pd-card pd-step" style={{ "--c": c }}><small>Step {i + 1}{i === 3 ? " · ₹199" : " · Free"}</small><h3 className="pd-h3">{h}</h3><p className="pd-sub" style={{ marginBottom: 0 }}>{p}</p></div>)}</div>
        </div></section>

        <IdentifyPersonality />

        <section className="pd-sec" id="pd-learn"><div className="pd-wrap">
          <Head badge="Learn" title='Learn the <span style="color:#f97316">skills</span>' sub="Internal lessons build you from within; external lessons change how you come across. Each has a real-life example, reflection questions and one exercise." />
          <div className="pd-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", alignItems: "start" }}>
            {LESSONS.map((l, i) => (
              <details key={l[0]} className="pd-dt" open={i === 0}>
                <summary><span className="pd-tag" style={{ color: l[1] === "in" ? "#0e8fa8" : "#f97316" }}>{l[1] === "in" ? "Internal" : "External"}</span>{l[0]}</summary>
                <div className="bd"><p>{l[2]}</p><h4>Real-life situation</h4><p>{l[3]}</p><h4>Ask yourself</h4><ul className="pd-ul">{l[4].map((q) => <li key={q}>{q}</li>)}</ul><h4>Try this</h4><p>{l[5]}</p></div>
              </details>
            ))}
          </div>
        </div></section>

        <section className="pd-sec" id="pd-body"><div className="pd-wrap">
          <Head badge="Body language" title='Body language <span style="color:#f97316">speaks first</span>' sub="Before you say a word, your posture and gestures tell people how open, confident or guarded you are." />
          <div className="pd-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))" }}>
            <figure className="pd-fig"><img src={IMG_POSTURE} alt="Closed posture versus open posture" loading="lazy" /><figcaption><b>Posture.</b> A closed posture can read as hostility or anxiety. An open posture signals friendliness and willingness.</figcaption></figure>
            <figure className="pd-fig"><img src={IMG_ARMS} alt="Crossed arms versus hands on hips" loading="lazy" /><figcaption><b>Gestures.</b> Crossed arms can look defensive. Hands on hips can signal control, or aggression if overdone.</figcaption></figure>
          </div>
        </div></section>

        <section className="pd-sec" id="pd-journey"><div className="pd-wrap">
          <Head badge="30-day plan" title='Your 30-day <span style="color:#f97316">journey</span>' sub="Four stages: Know, Express, Balance and Execute. Move from knowing yourself to executing with consistency." />
          <JourneyDiagram done={tk.d} />
          <Tracker tk={tk} setTk={setTk} ok={tkOk} />
        </div></section>

        <section className="pd-sec" id="pd-check"><div className="pd-wrap">
          <Head badge="Self-check" title='Quick <span style="color:#f97316">self-check</span>' sub="Ten statements, about three minutes. Retake it after your 30-day plan to compare. Answers stay in this browser only." />
          <SelfCheck />
          <div className="pd-card" style={{ marginTop: 14 }}><h3 className="pd-h3">What this self-check can and cannot tell you</h3>
            <ul className="pd-ul"><li>It is a self-reported snapshot, not a clinical, diagnostic or scientifically validated test.</li><li>Results shift with mood, stress and context, so use them as prompts for reflection.</li><li>MBTI describes natural preferences. It does not measure intelligence, ability, character or overall personality development, and it should never be the sole basis for hiring or promotion.</li></ul></div>
        </div></section>

        <section className="pd-sec" id="pd-mbti"><div className="pd-wrap">
          <Head badge="16 types" title='Discover your <span style="color:#f97316">MBTI type</span>' sub="Four preferences combine into 16 types. MBTI describes natural preferences, not intelligence, ability or character." />
          {rows.map((r, k) => <Marquee key={k} rev={k === 1} d={40} items={r.map((m) => <div key={m[0]}><div className="pd-card pd-mbti"><b style={{ color: GCOL[m[2]] }}>{m[0]}</b><small>{m[2]}</small></div></div>)} />)}
        </div></section>

        <section className="pd-sec" id="pd-rules"><div className="pd-wrap">
          <Head badge="Golden rules" title='7 golden rules of <span style="color:#f97316">personal growth</span>' />
          <Marquee d={50} items={RULES.map((r, i) => <div key={r[0]}><div className="pd-card" style={{ borderTop: "3px solid #f97316" }}><h3 className="pd-h3"><span style={{ color: "#f97316" }}>{i + 1}.</span> {r[0]}</h3><p className="pd-sub" style={{ marginBottom: 0 }}>{r[1]}</p></div></div>)} />
          <style>{`#pd-rules .pd-mq-track>div{flex-basis:clamp(240px,21vw,290px)}`}</style>
        </div></section>

        <section className="pd-sec" id="pd-faq"><div className="pd-wrap">
          <Head badge="FAQ" title='Common <span style="color:#f97316">questions</span>' sub="Short, honest answers before you start." />
          <div className="pd-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", alignItems: "start" }}>
            {FAQ.map(([q, a]) => <details key={q} className="pd-dt"><summary>{q}</summary><div className="bd"><p>{a}</p></div></details>)}
          </div>
        </div></section>

        <div className="pd-cta"><div className="pd-wrap pd-cta-in">
          <div><h2>Ready to see where you <span style={{ color: "#f97316" }}>stand?</span></h2><p>You are not limited by a four-letter type. Your choices, habits and actions decide your growth. Your first two assessments are free.</p></div>
          <div className="pd-actions" style={{ marginTop: 0 }}><button type="button" className="pd-btn p" onClick={() => setOpen(true)}>Start Free Assessment</button><a className="pd-btn s" href="#pd-how" onClick={goTo("pd-how")}>Explore first</a></div>
        </div></div>

        {open && <RegisterModal onClose={() => setOpen(false)} />}
      </div>
    </PublicLayout>
  );
}