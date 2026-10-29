"use client";

import { useEffect, useRef } from "react";
import { initToraCX } from "./toracxEngine";
import hero from "../../assets/toracx/hero.webp";
import chan from "../../assets/toracx/chan.webp";
import road from "../../assets/toracx/road.webp";
import dash from "../../assets/toracx/dash.webp";
import stack from "../../assets/toracx/stack.webp";
import room from "../../assets/toracx/room.webp";
import grow from "../../assets/toracx/grow.webp";
import lab from "../../assets/toracx/lab.webp";

/* ─────────────────────────────────────────────────────────────────
   ToraCX · Contact Center to Agentic CX

   Site Navbar + Footer come from PublicLayout (see Toracxpage.jsx).
   This component adds the ToraCX module header (2 levels, sticky):
     1) page links bar   2) Learn / Platforms / ... mega-menu bar
   Hash routing: /toracx-agentic-cx#/learn/journey
   All CSS is scoped under .tcx. Theme comes from the `theme` prop.
   Sticky offsets: --tcx-top = site navbar height (68px).
───────────────────────────────────────────────────────────────── */
const CSS = `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap");
.tcx{--o:#F97316;--o2:#fb923c;--o3:#fff1e4;--g:#16A34A;--g2:#22c55e;--g3:#e8f8ee;--ink:#0f172a;--mut:#475569;--bg:#fff;--soft:#fff8f1;--line:#f1e3d4;--dark:#0b1220;--r:22px;--sh:0 18px 40px -20px rgba(15,23,42,.35)}
.tcx *{box-sizing:border-box;margin:0;padding:0}
.tcx{font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:var(--bg);color:var(--ink);line-height:1.6;overflow-x:clip;-webkit-font-smoothing:antialiased}
.tcx a{color:inherit;text-decoration:none}
.tcx button{font:inherit;color:inherit}
.tcx h1,.tcx h2,.tcx h3,.tcx h4{line-height:1.12;letter-spacing:-.02em}
.tcx .wrap{max-width:1220px;margin:0 auto;padding:0 22px}
.tcx :focus-visible{outline:3px solid var(--g);outline-offset:2px;border-radius:8px}
.tcx .mut{color:var(--mut)}
.tcx .ann{background:var(--dark);color:#cbd5e1;font-size:13px;text-align:center;padding:9px 16px}
.tcx .ann a{color:var(--o2);font-weight:700;margin-left:8px}
.tcx .nav{display:flex;gap:2px;flex:1}
.tcx .nav>button,.tcx .nav>a{background:none;border:0;cursor:pointer;font-size:14.5px;font-weight:600;padding:10px 13px;border-radius:10px;color:#1e293b;display:flex;align-items:center;gap:6px}
.tcx .nav>button:hover,.tcx .nav>a:hover,.tcx .nav .on{background:var(--o3);color:#c2410c}
.tcx .nav svg{width:12px;height:12px;stroke:currentColor;fill:none;stroke-width:2.4;transition:.2s}
.tcx .nav button[aria-expanded=true] svg{transform:rotate(180deg)}
.tcx .btn{display:inline-flex;gap:8px;align-items:center;border:0;cursor:pointer;font-weight:700;font-size:15px;padding:13px 24px;border-radius:99px;transition:.2s;white-space:nowrap}
.tcx .btn.p{background:linear-gradient(135deg,var(--o),#ea580c);color:#fff;box-shadow:0 10px 22px -10px rgba(234,88,12,.8)}
.tcx .btn.s{background:#fff;color:var(--ink);border:1.5px solid #e2d6c8}
.tcx .btn.d{background:var(--ink);color:#fff}
.tcx .btn:hover{transform:translateY(-2px)}
.tcx .btn.sm{padding:10px 18px;font-size:14px}
.tcx .mega{position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:1px solid var(--line);box-shadow:0 40px 60px -30px rgba(15,23,42,.35);display:none}
.tcx .mega.open{display:block;animation:tcx-up .25s}
.tcx .mega .mi{display:grid;grid-template-columns:310px repeat(3,1fr);gap:34px;padding:30px 22px 36px}
.tcx .promo{border-radius:20px;overflow:hidden;background:var(--soft);border:1px solid var(--line);display:block;transition:.25s}
.tcx .promo:hover{transform:translateY(-3px);box-shadow:var(--sh)}
.tcx .promo img{width:100%;aspect-ratio:8/5;object-fit:cover;display:block}
.tcx .promo div{padding:16px 18px}
.tcx .promo b{display:block;font-size:17px}
.tcx .promo span{font-size:13.5px;color:var(--mut)}
.tcx .promo em{display:block;font-style:normal;color:var(--o);font-weight:800;font-size:14px;margin-top:8px}
.tcx .mcol h4{font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--o);margin-bottom:10px}
.tcx .mcol a{display:block;padding:9px 12px;margin:0 -12px;border-radius:12px;transition:.15s}
.tcx .mcol a:hover{background:var(--o3)}
.tcx .mcol a b{display:block;font-size:15px}
.tcx .mcol a small{color:var(--mut);font-size:12.5px;line-height:1.35;display:block}
.tcx .tcx-app{min-height:70vh;animation:tcx-pg .45s}
@keyframes tcx-pg{from{opacity:0;transform:translateY(14px)}}
@keyframes tcx-up{from{opacity:0;transform:translateY(10px)}}
.tcx section.sec{padding:84px 0}
.tcx .soft{background:var(--soft)}
.tcx .dk{background:radial-gradient(circle at 85% 0,#1e293b,var(--dark));color:#e2e8f0}
.tcx .dk .mut,.tcx .dk p{color:#a8b5c7}
.tcx .eyebrow{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--o);background:var(--o3);padding:6px 13px;border-radius:99px}
.tcx .dk .eyebrow{background:rgba(249,115,22,.16)}
.tcx .h2{font-size:clamp(28px,3.6vw,44px);margin:14px 0 12px}
.tcx .sub{color:var(--mut);font-size:17.5px;max-width:680px}
.tcx .dk .sub{color:#a8b5c7}
.tcx .grid{display:grid;gap:20px}
.tcx .g2{grid-template-columns:repeat(2,1fr)}
.tcx .g3{grid-template-columns:repeat(3,1fr)}
.tcx .g4{grid-template-columns:repeat(4,1fr)}
.tcx .g5{grid-template-columns:repeat(5,1fr)}
.tcx .g6{grid-template-columns:repeat(6,1fr)}
.tcx .card{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:24px;transition:.28s;display:block;position:relative}
.tcx .dk .card{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.12)}
.tcx a.card:hover,.tcx .card.hv:hover{transform:translateY(-5px);box-shadow:var(--sh);border-color:var(--o2)}
.tcx .card h3{font-size:19px;margin:14px 0 8px}
.tcx .card p{color:var(--mut);font-size:15px}
.tcx .dk .card h3{color:#fff}
.tcx .go{display:inline-flex;gap:6px;margin-top:14px;font-weight:800;font-size:14.5px;color:var(--o);transition:.2s}
.tcx a.card:hover .go{gap:12px}
.tcx .tl{font-weight:800;color:var(--o);display:inline-flex;gap:6px;transition:.2s}
.tcx .tl:hover{gap:12px}
.tcx .ico{width:50px;height:50px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--o2))}
.tcx .ico.gr{background:linear-gradient(135deg,var(--g),var(--g2))}
.tcx .ico svg{width:26px;height:26px;stroke:#fff;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.tcx .tag{display:inline-block;font-size:12px;font-weight:700;padding:4px 11px;border-radius:99px;background:var(--g3);color:#15803d}
.tcx .tag.o{background:var(--o3);color:#c2410c}
.tcx .sim{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.06em;background:#fef3c7;color:#92400e;padding:4px 10px;border-radius:8px}
.tcx .note{border-left:4px solid var(--g);background:#effaf3;padding:15px 20px;border-radius:14px;color:#14532d;font-size:15px;margin-top:26px}
.tcx .note.o{border-color:var(--o);background:#fff3e8;color:#7c2d12}
.tcx .dk .note{background:rgba(22,163,74,.14);color:#bbf7d0}
.tcx .rv{opacity:0;transform:translateY(26px);transition:opacity .7s,transform .7s}
.tcx .rv.in{opacity:1;transform:none}
.tcx .ph{padding:44px 0 70px;background:radial-gradient(circle at 92% 0,rgba(249,115,22,.16),transparent 45%),radial-gradient(circle at 0 100%,rgba(22,163,74,.13),transparent 40%),#fff}
.tcx .ph .in{display:grid;grid-template-columns:1.05fr .95fr;gap:44px;align-items:center}
.tcx .ph h1{font-size:clamp(34px,4.6vw,58px);margin:16px 0}
.tcx .ph .lead{font-size:19px;color:var(--mut);max-width:560px}
.tcx .ph .art{border-radius:28px;overflow:hidden;box-shadow:var(--sh);border:1px solid var(--line);aspect-ratio:8/5;transition:transform .25s}
.tcx .ph .art img{width:100%;height:100%;object-fit:cover;display:block}
.tcx .crumbs{display:flex;gap:8px;font-size:13.5px;color:var(--mut);margin-bottom:22px;flex-wrap:wrap}
.tcx .crumbs a{font-weight:600}
.tcx .crumbs a:hover{color:var(--o)}
.tcx .crumbs b{color:var(--ink)}
.tcx .pill{display:flex;gap:8px;flex-wrap:wrap;margin-top:26px}
.tcx .subnav{position:sticky;z-index:40;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);overflow-x:auto}
.tcx .subnav .wrap{display:flex;gap:4px;padding-top:8px;padding-bottom:8px}
.tcx .subnav a{padding:9px 16px;border-radius:99px;font-weight:700;font-size:14px;white-space:nowrap;color:var(--mut)}
.tcx .subnav a:hover{background:var(--o3)}
.tcx .subnav a.on{background:var(--ink);color:#fff}
.tcx .pn{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:50px}
.tcx .pn a{border:1px solid var(--line);border-radius:20px;padding:20px 24px;transition:.25s;background:#fff}
.tcx .pn a:hover{border-color:var(--o);transform:translateY(-3px)}
.tcx .pn small{color:var(--mut);font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:11.5px;display:block}
.tcx .pn b{font-size:18px}
.tcx .pn .n{text-align:right}
.tcx .hh{padding:60px 0 80px;background:radial-gradient(circle at 90% 5%,rgba(249,115,22,.22),transparent 42%),radial-gradient(circle at 0 90%,rgba(22,163,74,.16),transparent 40%),linear-gradient(#fffaf4,#fff)}
.tcx .hh .in{display:grid;grid-template-columns:1.02fr .98fr;gap:46px;align-items:center}
.tcx .hh h1{font-size:clamp(40px,5.6vw,72px);margin:18px 0}
.tcx .hh h1 span{background:linear-gradient(90deg,var(--o),var(--g));-webkit-background-clip:text;background-clip:text;color:transparent}
.tcx .hh .lead{font-size:19px;color:var(--mut);max-width:540px}
.tcx .cta{display:flex;gap:12px;flex-wrap:wrap;margin:28px 0 12px}
.tcx .chat{background:#fff;border-radius:28px;border:1px solid var(--line);box-shadow:0 40px 70px -30px rgba(15,23,42,.45);overflow:hidden}
.tcx .chat .top{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;background:var(--ink);color:#fff;font-weight:700;font-size:14px}
.tcx .chat .top i{display:inline-block;width:9px;height:9px;border-radius:50%;background:#22c55e;margin-right:8px;animation:tcx-bk 1.6s infinite}
@keyframes tcx-bk{50%{opacity:.3}}
.tcx .chat .body{padding:20px;display:grid;gap:12px;background:linear-gradient(#fff,#fff8f1)}
.tcx .m{max-width:82%;padding:12px 16px;border-radius:18px;font-size:14.5px;opacity:0;animation:tcx-pop .5s forwards}
@keyframes tcx-pop{from{opacity:0;transform:translateY(10px) scale(.96)}to{opacity:1;transform:none}}
.tcx .m.c{background:#fff;border:1px solid var(--line);justify-self:start;border-bottom-left-radius:4px}
.tcx .m.a{background:linear-gradient(135deg,var(--o),#ea580c);color:#fff;justify-self:end;border-bottom-right-radius:4px}
.tcx .m.t{background:#effaf3;color:#14532d;border:1px dashed var(--g);font-size:13px;justify-self:stretch;max-width:100%}
.tcx .m.h{background:var(--ink);color:#fff;justify-self:stretch;max-width:100%;font-size:13.5px}
.tcx .floatcard{position:absolute;background:#fff;border:1px solid var(--line);border-radius:18px;padding:12px 16px;box-shadow:var(--sh);font-size:13px;font-weight:700;animation:tcx-fl 6s ease-in-out infinite}
@keyframes tcx-fl{50%{transform:translateY(-9px)}}
.tcx .hv{position:relative}
.tcx .quick{margin-top:-46px;position:relative;z-index:5}
.tcx .quick .grid{background:#fff;border-radius:28px;box-shadow:var(--sh);border:1px solid var(--line);padding:14px}
.tcx .quick a{display:flex;gap:16px;align-items:center;padding:20px;border-radius:20px;transition:.2s}
.tcx .quick a:hover{background:var(--o3)}
.tcx .quick b{display:block;font-size:17px}
.tcx .quick small{color:var(--mut)}
.tcx .strip{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;padding:46px 0 10px}
.tcx .strip a{font-weight:800;font-size:18px;color:#94a3b8;padding:10px 22px;border-radius:14px;border:1px dashed #d8cbbb;transition:.2s}
.tcx .strip a:hover{color:var(--o);border-color:var(--o);background:var(--o3)}
.tcx .strip small{display:block;text-align:center;width:100%;color:var(--mut);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:12px}
.tcx .stats{background:var(--dark);color:#fff;padding:70px 0}
.tcx .stats .grid{grid-template-columns:repeat(6,1fr)}
.tcx .stats a{text-align:center;padding:18px 6px;border-radius:18px;transition:.2s}
.tcx .stats a:hover{background:rgba(255,255,255,.07)}
.tcx .num{font-size:54px;font-weight:800;background:linear-gradient(135deg,var(--o2),var(--g2));-webkit-background-clip:text;background-clip:text;color:transparent;display:block;line-height:1.1}
.tcx .stats small{color:#a8b5c7;font-weight:600}
.tcx .metric{font-size:15px;font-weight:800;color:var(--o);letter-spacing:.02em}
.tcx .tn{display:grid;grid-template-columns:200px 1fr;gap:0;padding:0;overflow:hidden}
.tcx .tn img{width:100%;height:100%;object-fit:cover}
.tcx .tn div{padding:22px}
.tcx .jstep{display:flex;gap:14px;align-items:center;padding:16px 18px;border-radius:18px;border:1px solid var(--line);background:#fff;transition:.2s}
.tcx .jstep:hover{border-color:var(--o);transform:translateY(-3px)}
.tcx .jstep b.n{width:34px;height:34px;border-radius:50%;background:var(--o);color:#fff;display:grid;place-items:center;font-size:14px;flex:0 0 34px}
.tcx .jstep.seen b.n{background:var(--g)}
.tcx .jstep span{font-weight:700;font-size:15px;line-height:1.25}
.tcx .closing{background:linear-gradient(135deg,#0b1220,#1e293b);color:#fff;border-radius:32px;padding:64px 40px;text-align:center;position:relative;overflow:hidden}
.tcx .closing::before{content:"";position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,.5),transparent 70%);right:-100px;top:-160px}
.tcx .closing>*{position:relative}
.tcx .closing p{color:#cbd5e1;max-width:680px;margin:0 auto 26px}
.tcx .tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.tcx .tab{border:1px solid var(--line);background:#fff;padding:10px 18px;border-radius:99px;font-weight:700;font-size:14px;cursor:pointer}
.tcx .tab.on{background:linear-gradient(135deg,var(--o),#ea580c);color:#fff;border-color:transparent}
.tcx .dk .tab{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.16);color:#e2e8f0}
.tcx .dk .tab.on{color:#fff}
.tcx .steps{display:grid;grid-template-columns:repeat(5,1fr)}
.tcx .st{position:relative;text-align:center;cursor:pointer;background:none;border:0;padding:0 6px}
.tcx .st .dot{width:68px;height:68px;border-radius:50%;margin:0 auto 12px;display:grid;place-items:center;background:#fff;border:2px solid var(--line);transition:.3s;position:relative;z-index:2}
.tcx .st .dot svg{width:29px;height:29px;stroke:var(--o);fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.tcx .st.on .dot{background:linear-gradient(135deg,var(--o),var(--g));border-color:transparent;transform:scale(1.14);box-shadow:var(--sh)}
.tcx .st.on .dot svg{stroke:#fff}
.tcx .st h4{font-size:15px}
.tcx .st:not(:last-child)::after{content:"";position:absolute;top:34px;left:calc(50% + 40px);right:calc(-50% + 40px);border-top:2px dashed #fdba74}
.tcx .dk .st .dot{background:#111b2e;border-color:#334155}
.tcx .dk .st h4{color:#fff}
.tcx .detail{margin-top:26px;padding:26px;border-radius:var(--r);background:#fff;border:1px solid var(--line);animation:tcx-up .4s}
.tcx .dk .detail{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.12)}
.tcx .jmap{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:18px 18px 8px;margin-bottom:26px}
.tcx .jmap svg{width:100%;height:auto;display:block}
.tcx .curve{stroke-dasharray:1200;stroke-dashoffset:1200;animation:tcx-dr 2.4s .2s forwards}
@keyframes tcx-dr{to{stroke-dashoffset:0}}
.tcx .jn{cursor:pointer}
.tcx .jn.on .ring{fill:#fff1e4;stroke-width:6}
.tcx .chips{display:flex;gap:10px;flex-wrap:wrap}
.tcx .chip{padding:9px 16px;border-radius:99px;border:1.5px solid var(--line);font-weight:700;font-size:14px;background:#fff;cursor:pointer;transition:.2s}
.tcx .chip:hover{border-color:var(--o)}
.tcx .chip.on{background:var(--g);border-color:var(--g);color:#fff}
.tcx .mock{background:#0f172a;border-radius:28px;padding:22px;color:#e2e8f0;box-shadow:var(--sh)}
.tcx .mock .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px}
.tcx .mock .dots i{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:6px}
.tcx .mt{background:#162033;border-radius:18px;padding:18px;border:2px solid #243049;cursor:pointer;text-align:left;color:#e2e8f0;transition:.25s;width:100%}
.tcx .mt:hover{border-color:#fb923c}
.tcx .mt.on{border-color:var(--o);background:#1c2840}
.tcx .mt h4{font-size:15px;color:#fff;margin-bottom:8px}
.tcx .mt svg{width:100%;height:84px}
.tcx .bar1{transform-origin:bottom;transform-box:fill-box;animation:tcx-gr 1.2s both}
@keyframes tcx-gr{from{transform:scaleY(0)}}
.tcx .pc{background:#fff;border:2px solid var(--line);border-radius:22px;padding:22px;transition:.3s;display:block;text-align:center}
.tcx .pc:hover{transform:translateY(-6px);border-color:var(--o);box-shadow:var(--sh)}
.tcx .pc svg.hex{width:72px;height:72px;margin-bottom:10px}
.tcx .pc b{display:block;font-size:17px}
.tcx .pc small{color:var(--mut)}
.tcx .tw{overflow-x:auto;border-radius:var(--r);border:1px solid var(--line);background:#fff}
.tcx table{border-collapse:collapse;width:100%;min-width:640px;font-size:14.5px}
.tcx th{background:var(--o3);text-align:left;padding:13px 18px;font-size:12.5px;letter-spacing:.05em;text-transform:uppercase;color:#9a3412}
.tcx td{padding:13px 18px;border-top:1px solid var(--line);vertical-align:top;color:var(--mut)}
.tcx td:first-child{font-weight:800;color:var(--ink)}
.tcx select,.tcx input[type=text],.tcx input[type=search]{font:inherit;padding:11px 14px;border-radius:12px;border:1.5px solid var(--line);background:#fff;width:100%}
.tcx .kv{display:grid;grid-template-columns:190px 1fr;gap:0}
.tcx .kv>div{padding:16px 0;border-top:1px solid var(--line)}
.tcx .kv>div:nth-child(odd){font-weight:800;color:var(--o)}
.tcx .kv>div:nth-child(even){color:var(--mut)}
.tcx .flow{display:flex;align-items:stretch}
.tcx .fn{flex:1;position:relative;text-align:center;cursor:pointer;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);border-radius:20px;padding:20px 12px;color:#fff;transition:.3s}
.tcx .fn:hover{border-color:var(--o)}
.tcx .fn.on{background:linear-gradient(160deg,rgba(249,115,22,.32),rgba(22,163,74,.24));border-color:var(--o2);transform:translateY(-6px)}
.tcx .fn .fi{width:58px;height:58px;border-radius:18px;margin:0 auto 10px;display:grid;place-items:center;background:linear-gradient(135deg,var(--o),var(--g))}
.tcx .fn .fi svg{width:30px;height:30px;stroke:#fff;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.tcx .fn b{display:block;font-size:16px}
.tcx .fn small{display:block;color:#a8b5c7;font-size:12.5px;margin-top:4px}
.tcx .fc{flex:0 0 44px;position:relative;align-self:center;height:3px;background:repeating-linear-gradient(90deg,#fb923c 0 6px,transparent 6px 12px);background-size:24px 3px;animation:tcx-mv 1s linear infinite}
.tcx .fc::after{content:"";position:absolute;right:-2px;top:-5px;border:6px solid transparent;border-left:9px solid var(--o2)}
@keyframes tcx-mv{to{background-position:24px 0}}
@keyframes tcx-mvv{to{background-position:0 24px}}
.tcx .hum{margin-top:18px;display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:center;padding:16px 20px;border-radius:20px;border:2px dashed var(--g2);background:rgba(22,163,74,.1)}
.tcx .cyc{display:grid;grid-template-columns:1fr 1fr;gap:34px;align-items:center}
.tcx .cyc svg{width:100%;max-width:440px;margin:auto;display:block}
.tcx .seg{cursor:pointer;transition:.3s;transform-origin:200px 200px}
.tcx .rm{display:flex;justify-content:space-between;position:relative;margin:6px 0 26px}
.tcx .rm::before{content:"";position:absolute;left:5%;right:5%;top:23px;height:4px;background:linear-gradient(90deg,var(--o),var(--g));border-radius:4px;opacity:.35}
.tcx .rm a{position:relative;z-index:1;flex:1;text-align:center}
.tcx .rm i{display:grid;place-items:center;width:48px;height:48px;border-radius:50%;margin:0 auto 6px;background:#fff;border:3px solid var(--o);font-style:normal;font-weight:800;color:var(--o);transition:.3s}
.tcx .rm a:hover i{background:var(--o);color:#fff;transform:scale(1.15)}
.tcx .rm a.cur i{background:linear-gradient(135deg,var(--o),var(--g));color:#fff;border-color:transparent;transform:scale(1.2)}
.tcx .rm small{font-size:12px;color:var(--mut);font-weight:700}
.tcx .dayb{display:flex;height:72px;border-radius:18px;overflow:hidden;margin-bottom:22px;border:1px solid var(--line)}
.tcx .dayb button{border:0;cursor:pointer;font-weight:700;font-size:12px;color:#fff;background:linear-gradient(180deg,var(--o2),var(--o));border-right:2px solid #fff;transition:.3s;padding:4px}
.tcx .dayb button:nth-child(3n){background:linear-gradient(180deg,var(--g2),var(--g))}
.tcx .dayb button.brk{background:repeating-linear-gradient(45deg,#e2e8f0 0 8px,#f1f5f9 8px 16px);color:#64748b;cursor:default}
.tcx .dayb button.on{filter:brightness(1.15);transform:scaleY(1.1)}
.tcx .acc{border:1px solid var(--line);border-radius:18px;margin-bottom:10px;background:#fff;overflow:hidden;transition:.2s}
.tcx .acc.open{border-color:var(--o);box-shadow:var(--sh)}
.tcx .acc>button{width:100%;display:grid;grid-template-columns:150px 1fr 24px;gap:16px;align-items:center;text-align:left;background:none;border:0;padding:18px 22px;cursor:pointer}
.tcx .acc .t{font-weight:800;color:var(--o);font-variant-numeric:tabular-nums}
.tcx .acc b{font-size:16px}
.tcx .acc .ch{transition:.3s;color:var(--o)}
.tcx .acc.open .ch{transform:rotate(180deg)}
.tcx .acc .bd{max-height:0;overflow:hidden;transition:max-height .4s}
.tcx .acc.open .bd{max-height:240px}
.tcx .acc .bd div{padding:0 22px 20px 188px;color:var(--mut)}
.tcx .brkr{text-align:center;font-size:12px;letter-spacing:.14em;color:var(--g);padding:8px;background:#effaf3;border-radius:10px;margin:8px 0;font-weight:800}
.tcx .ctrl{display:grid;grid-template-columns:repeat(4,1fr) auto;gap:14px;align-items:end;margin:16px 0}
.tcx .ctrl label{font-size:13px;font-weight:800;display:grid;gap:6px}
.tcx .path{display:grid;gap:10px;margin-top:14px}
.tcx .ps{display:flex;gap:14px;padding:13px 16px;border-radius:16px;border:1px solid var(--line);opacity:.25;transform:translateX(-12px);transition:.5s;background:#fff}
.tcx .ps.show{opacity:1;transform:none}
.tcx .ps i{flex:0 0 30px;height:30px;border-radius:50%;background:var(--g);color:#fff;display:grid;place-items:center;font-size:13px;font-style:normal;font-weight:800}
.tcx .ps.warn i{background:#dc2626}
.tcx .ps b{display:block}
.tcx .ps span{font-size:14px;color:var(--mut)}
.tcx .opt{display:block;width:100%;text-align:left;padding:13px 16px;margin:8px 0;border-radius:14px;border:1.5px solid var(--line);background:#fff;cursor:pointer}
.tcx .opt:hover{border-color:var(--o)}
.tcx .opt.right{background:#dcfce7;border-color:var(--g)}
.tcx .opt.wrong{background:#fee2e2;border-color:#dc2626}
.tcx .lad{display:flex;gap:10px;align-items:flex-end;margin-top:20px}
.tcx .rung{flex:1;border-radius:18px 18px 0 0;padding:16px 10px;color:#fff;font-weight:800;font-size:14px;text-align:center;background:linear-gradient(180deg,var(--o2),var(--o));cursor:pointer;transition:.3s;border:0}
.tcx .rung:hover,.tcx .rung.on{filter:brightness(1.12);transform:translateY(-8px)}
.tcx .rung:nth-child(1){min-height:90px}
.tcx .rung:nth-child(2){min-height:135px}
.tcx .rung:nth-child(3){min-height:180px}
.tcx .rung:nth-child(4){min-height:225px;background:linear-gradient(180deg,var(--g2),var(--g))}
.tcx .rung:nth-child(5){min-height:270px;background:linear-gradient(180deg,var(--g2),var(--g))}
.tcx .ck{display:flex;gap:12px;align-items:center;padding:12px 4px;border-bottom:1px solid var(--line);cursor:pointer}
.tcx .ck input{width:20px;height:20px;accent-color:var(--g)}
.tcx .bignum{width:62px;height:62px;border-radius:20px;background:linear-gradient(135deg,var(--o),var(--g));color:#fff;display:grid;place-items:center;font-weight:800;font-size:26px}
.tcx .av{width:90px;height:90px;border-radius:28px;overflow:hidden;background:linear-gradient(135deg,var(--o3),var(--g3))}
@media(max-width:1060px){.tcx .nav{display:none}
.tcx .mega{display:none!important}
.tcx .ph .in,.tcx .hh .in,.tcx .cyc{grid-template-columns:1fr}
.tcx .g4,.tcx .g5{grid-template-columns:repeat(2,1fr)}
.tcx .g6,.tcx .stats .grid{grid-template-columns:repeat(3,1fr)}
.tcx .steps{grid-template-columns:1fr;gap:6px}
.tcx .st{display:flex;gap:14px;text-align:left;align-items:center;padding:6px 0}
.tcx .st .dot{margin:0;flex:0 0 58px;width:58px;height:58px}
.tcx .st:not(:last-child)::after{display:none}
.tcx .kv{grid-template-columns:1fr}
.tcx .kv>div:nth-child(odd){border-bottom:0;padding-bottom:0}
.tcx .kv>div:nth-child(even){border-top:0;padding-top:0}
.tcx .lad{flex-direction:column}
.tcx .rung{min-height:56px!important}
.tcx .ctrl{grid-template-columns:1fr 1fr}
.tcx .acc>button{grid-template-columns:96px 1fr 20px}
.tcx .acc .bd div{padding-left:22px}
.tcx .rm small{display:none}
.tcx .rm i{width:36px;height:36px}
.tcx .dayb button{font-size:0}
.tcx .flow{flex-direction:column}
.tcx .fc{flex:0 0 34px;width:3px;height:34px;align-self:center;background:repeating-linear-gradient(180deg,#fb923c 0 6px,transparent 6px 12px);background-size:3px 24px;animation:tcx-mvv 1s linear infinite}
.tcx .fc::after{right:auto;top:auto;bottom:-4px;left:-5px;border:6px solid transparent;border-top:9px solid var(--o2);border-left:6px solid transparent}
.tcx .floatcard{display:none}
.tcx section.sec{padding:60px 0}
.tcx .tn{grid-template-columns:130px 1fr}}
@media(max-width:700px){.tcx .g2,.tcx .g3,.tcx .g4,.tcx .g5{grid-template-columns:1fr}
.tcx .stats .grid,.tcx .g6{grid-template-columns:repeat(2,1fr)}
.tcx .pn{grid-template-columns:1fr}
.tcx .num{font-size:40px}
.tcx .wrap{padding:0 18px}}
@media(prefers-reduced-motion:reduce){.tcx *,.tcx *::before,.tcx *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
.tcx .rv{opacity:1;transform:none}
.tcx .m{opacity:1}
.tcx .curve{stroke-dashoffset:0}}
.tcx{--bg:#f9fafc;--soft:#f1f4f9;--line:#e3e6ee;--gridc:#eaebef}
.tcx{font-size:17px;background-color:#f9fafc;background-image:linear-gradient(var(--gridc) 1px,transparent 1px),linear-gradient(90deg,var(--gridc) 1px,transparent 1px);background-size:30px 30px}
.tcx h1,.tcx h2,.tcx h3,.tcx .num{font-family:"Space Grotesk",Inter,system-ui,sans-serif}
.tcx .nav>button,.tcx .nav>a{color:#fff;font-size:15.5px;font-weight:600;white-space:nowrap;padding:10px 11px}
.tcx .nav>button:hover,.tcx .nav>a:hover,.tcx .nav .on{background:rgba(255,255,255,.1);color:#fff}
.tcx .btn{border-radius:10px;font-size:15px;font-weight:700;padding:14px 24px}
.tcx .btn.sm{padding:11px 20px;font-size:15px}
.tcx .btn.p{background:var(--o);box-shadow:none}
.tcx .btn.p:hover{background:#ea580c}
.tcx .btn.s{background:transparent;border:2px solid var(--o);color:#c2410c}
.tcx .ann{background:#f1f4f9;color:#111827;text-align:left;font-size:16px;padding:15px 22px;border-left:6px solid #f5b531;border-bottom:7px solid var(--o);line-height:1.5}
.tcx .ann b{font-weight:700}
.tcx .ann a{color:#c2410c;margin-left:8px}
.tcx .subnav{background:#f9fafc;border-bottom:1px solid var(--line)}
.tcx .subnav .wrap{gap:22px;padding-top:14px;padding-bottom:0}
.tcx .subnav a{padding:6px 0 8px;border-radius:0;font-size:16px;font-weight:600;color:#111827;border-bottom:3px solid #f5b531}
.tcx .subnav a:hover{background:none;border-color:var(--o)}
.tcx .subnav a.on{background:none;color:#111827;border-color:var(--o)}
.tcx .ph,.tcx .hh{background:transparent;padding:56px 0 64px}
.tcx .ph .in,.tcx .hh .in{gap:40px}
.tcx .ph h1,.tcx .hh h1{font-size:clamp(34px,3.8vw,52px);font-weight:500;letter-spacing:-.01em;line-height:1.1;margin:22px 0 22px}
.tcx .ph .lead,.tcx .hh .lead{font-size:18px;color:#475569;max-width:560px}
.tcx .eyebrow{font-size:12px;font-weight:700;letter-spacing:.12em;background:transparent;border:1.5px solid var(--g);color:#15803d;padding:6px 14px}
.tcx .dk .eyebrow{background:transparent;border-color:var(--o2);color:var(--o2)}
.tcx .ph .art,.tcx .hphoto{margin:0;border-radius:28px;background:#f1f4f9;border:1px solid #e5e8ef;box-shadow:none;aspect-ratio:auto;overflow:hidden}
.tcx .ph .art img,.tcx .hphoto img{width:100%;aspect-ratio:4/3;height:auto;object-fit:cover;display:block}
.tcx .art figcaption{padding:12px 18px 14px;font-size:14px;color:#475569;background:#f1f4f9}
.tcx .hv{position:relative}
.tcx .promo img,.tcx .tn img{object-fit:cover}
.tcx .soft{background:#f1f4f9}
.tcx .quick .grid{border-color:var(--line)}
@media(max-width:1060px){.tcx .subnav{}}
.tcx .pnav{display:flex;gap:2px;flex:1;min-width:0;overflow-x:auto;scrollbar-width:none;scroll-behavior:smooth}
.tcx .pnav::-webkit-scrollbar{display:none}
.tcx .pnav a{white-space:nowrap;color:#e5e7eb;font-size:15px;font-weight:600;padding:9px 12px;border-radius:8px}
.tcx .pnav a:hover{background:rgba(255,255,255,.12);color:#fff}
.tcx .pnav a.on{background:var(--o);color:#fff}
.tcx .subbar{background:#f1f4f9;border-bottom:1px solid var(--line);height:48px}
.tcx .subbar .wrap,.tcx .subbar .nav{height:100%;align-items:center}
.tcx .subbar .nav>button,.tcx .subbar .nav>a{color:#111827;font-size:15px;padding:8px 14px;white-space:nowrap}
.tcx .subbar .nav>button:hover,.tcx .subbar .nav>a:hover,.tcx .subbar .nav .on{background:var(--o3);color:#c2410c}
.tcx .subnav{}
.tcx .mega .mi{max-width:1220px;margin:0 auto}
.tcx{--tcx-top:68px;--tcx-bar:104px;position:relative;margin-top:-16px}
.tcx h1{font-size:2em;font-weight:700}.tcx h2{font-size:1.5em;font-weight:700}.tcx h3{font-size:1.17em;font-weight:700}.tcx h4{font-weight:700}
.tcx svg{display:inline;vertical-align:baseline}.tcx img{max-width:none}
.tcx a{color:inherit;text-decoration:none}
.tcx .subnav{top:calc(var(--tcx-top) + var(--tcx-bar))}
.tcx .tcx-head{position:sticky;top:var(--tcx-top);z-index:41}
.tcx .tcx-modbar{background:#292929;height:56px}
.tcx .tcx-modin{display:flex;align-items:center;gap:14px;height:100%}
.tcx .tcx-brand{display:flex;gap:10px;align-items:center;color:#fff;font-weight:800;font-size:18px;white-space:nowrap;flex:0 0 auto}
.tcx .tcx-brand i{width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,var(--o),var(--g));display:grid;place-items:center;color:#fff;font-style:normal}
.tcx .tcx-brand small{display:block;font-size:9px;color:#cbd5e1;letter-spacing:.1em;font-weight:700;margin-top:-2px}
.tcx .tcx-legal{background:#f1f4f9;border-top:1px solid var(--line);padding:26px 0;font-size:13px;color:#475569}
.tcx .tcx-legal b{color:#0f172a}
@media(max-width:1060px){.tcx{--tcx-bar:56px}.tcx .subbar{display:none}}
@media(max-width:700px){.tcx .tcx-brand small{display:none}}

.tcx[data-theme="dark"]{--bg:#12141C;--soft:#171a24;--line:#2D3243;--gridc:#1B1F2B;--ink:#EEF0F7;--mut:#A9B0C2;--o3:rgba(249,115,22,.16);--g3:rgba(22,163,74,.18);--sh:0 18px 40px -20px rgba(0,0,0,.7);color-scheme:dark;background-color:#12141C;color:var(--ink)}
.tcx[data-theme="dark"] .card,.tcx[data-theme="dark"] .detail,.tcx[data-theme="dark"] .jmap,.tcx[data-theme="dark"] .tw,.tcx[data-theme="dark"] .acc,.tcx[data-theme="dark"] .jstep,.tcx[data-theme="dark"] .pc,.tcx[data-theme="dark"] .pn a,.tcx[data-theme="dark"] .quick .grid,.tcx[data-theme="dark"] .chat,.tcx[data-theme="dark"] .floatcard,.tcx[data-theme="dark"] .tn,.tcx[data-theme="dark"] .opt,.tcx[data-theme="dark"] .ps,.tcx[data-theme="dark"] .chip,.tcx[data-theme="dark"] .tab,.tcx[data-theme="dark"] .st .dot,.tcx[data-theme="dark"] .rm i,.tcx[data-theme="dark"] .m.c{background:#1B1E29;color:var(--ink)}
.tcx[data-theme="dark"] .dk .card,.tcx[data-theme="dark"] .dk .tab,.tcx[data-theme="dark"] .dk .detail{background:rgba(255,255,255,.06)}
.tcx[data-theme="dark"] .tcx-legal,.tcx[data-theme="dark"] .soft,.tcx[data-theme="dark"] .art figcaption,.tcx[data-theme="dark"] .ph .art,.tcx[data-theme="dark"] .hphoto{background:#171a24}
.tcx[data-theme="dark"] .ph .art,.tcx[data-theme="dark"] .hphoto{border-color:var(--line)}
.tcx[data-theme="dark"] .ann{background:#171a24;color:var(--ink)}
.tcx[data-theme="dark"] .ann a{color:#fb923c}
.tcx[data-theme="dark"] .subbar{background:#171a24;border-bottom-color:var(--line)}
.tcx[data-theme="dark"] .subbar .nav>button,.tcx[data-theme="dark"] .subbar .nav>a{color:var(--ink)}
.tcx[data-theme="dark"] .subbar .nav>button:hover,.tcx[data-theme="dark"] .subbar .nav>a:hover,.tcx[data-theme="dark"] .subbar .nav .on{background:rgba(249,115,22,.16);color:#fdba74}
.tcx[data-theme="dark"] .mega{background:#1B1E29;border-bottom-color:var(--line)}
.tcx[data-theme="dark"] .promo{background:#171a24;border-color:var(--line)}
.tcx[data-theme="dark"] .mcol a:hover{background:rgba(249,115,22,.14)}
.tcx[data-theme="dark"] .subnav{background:rgba(18,20,28,.95);border-bottom-color:var(--line)}
.tcx[data-theme="dark"] .subnav a,.tcx[data-theme="dark"] .subnav a.on{color:var(--ink)}
.tcx[data-theme="dark"] .ph .lead,.tcx[data-theme="dark"] .hh .lead,.tcx[data-theme="dark"] .art figcaption,.tcx[data-theme="dark"] .tcx-legal{color:var(--mut)}
.tcx[data-theme="dark"] .tcx-legal b{color:var(--ink)}
.tcx[data-theme="dark"] .chat .body{background:linear-gradient(#1B1E29,#171a24)}
.tcx[data-theme="dark"] .m.t,.tcx[data-theme="dark"] .note,.tcx[data-theme="dark"] .brkr{background:rgba(22,163,74,.14);color:#bbf7d0}
.tcx[data-theme="dark"] .note.o{background:rgba(249,115,22,.14);color:#fed7aa}
.tcx[data-theme="dark"] .eyebrow{color:#4ade80;border-color:#4ade80}
.tcx[data-theme="dark"] .tag{color:#4ade80}.tcx[data-theme="dark"] .tag.o{color:#fb923c}
.tcx[data-theme="dark"] th{background:rgba(249,115,22,.14);color:#fdba74}
.tcx[data-theme="dark"] select,.tcx[data-theme="dark"] input[type=text],.tcx[data-theme="dark"] input[type=search]{background:#1B1E29;color:var(--ink);border-color:var(--line)}
.tcx[data-theme="dark"] .opt.right{background:rgba(22,163,74,.2);border-color:var(--g)}
.tcx[data-theme="dark"] .opt.wrong{background:rgba(220,38,38,.18);border-color:#dc2626}
.tcx[data-theme="dark"] .chip.on,.tcx[data-theme="dark"] .tab.on{color:#fff}
.tcx[data-theme="dark"] .dayb{border-color:var(--line)}
.tcx[data-theme="dark"] .dayb button.brk{background:repeating-linear-gradient(45deg,#2D3243 0 8px,#232838 8px 16px);color:var(--mut)}
.tcx[data-theme="dark"] .jn .ring{fill:#1B1E29}
.tcx[data-theme="dark"] .jn.on .ring{fill:rgba(249,115,22,.28)}
.tcx[data-theme="dark"] .jmap text[fill="#0f172a"],.tcx[data-theme="dark"] #cycsvg text[fill="#0f172a"]{fill:#EEF0F7}
.tcx[data-theme="dark"] #cycsvg circle[fill="#fff"]{fill:#1B1E29}
.tcx[data-theme="dark"] #cycsvg circle[stroke="#f1e3d4"]{stroke:#2D3243}
.tcx[data-theme="dark"] .card svg circle[fill="#fff1e4"]{fill:rgba(249,115,22,.2)}
.tcx[data-theme="dark"] .card svg circle[fill="#dcfce7"]{fill:rgba(22,163,74,.24)}
.tcx[data-theme="dark"] .card svg text[fill="#475569"]{fill:#A9B0C2}
.tcx[data-theme="dark"] .card svg text[fill="#c2410c"]{fill:#fdba74}
.tcx[data-theme="dark"] .card svg text[fill="#15803d"]{fill:#86efac}
.tcx[data-theme="dark"] [style*="background:#f1e3d4"]{background:#2D3243!important}
.tcx[data-theme="dark"] .strip a{background:transparent}
.tcx .ef{display:grid;gap:14px}
.tcx .ef[hidden],.tcx .eerr[hidden]{display:none}
.tcx .ef label{font-size:13px;font-weight:800;display:grid;gap:6px}
.tcx .ef input,.tcx .ef select,.tcx .ef textarea{font:inherit;font-weight:400;padding:12px 14px;border-radius:12px;border:1.5px solid var(--line);background:#fff;width:100%;color:var(--ink)}
.tcx .ef textarea{resize:vertical}
.tcx .ef input:focus,.tcx .ef select:focus,.tcx .ef textarea:focus{border-color:var(--o);outline:none}
.tcx .eerr{background:#fee2e2;color:#991b1b;border-radius:12px;padding:10px 14px;font-size:14px;font-weight:600}
.tcx .btn:disabled{opacity:.6;cursor:not-allowed;transform:none}
.tcx[data-theme="dark"] .ef input,.tcx[data-theme="dark"] .ef select,.tcx[data-theme="dark"] .ef textarea{background:#1B1E29;color:var(--ink);border-color:var(--line)}
.tcx[data-theme="dark"] .eerr{background:rgba(220,38,38,.18);color:#fecaca}
`;

/* Next static imports give { src, width, height } — the engine needs the url */
const u = (m) => (m && m.src) || m;
const IMAGES = { hero: u(hero), chan: u(chan), road: u(road), dash: u(dash), stack: u(stack), room: u(room), grow: u(grow), lab: u(lab) };

export default function ToraCXAgenticCX({ theme = "light" }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const cleanup = initToraCX(rootRef.current, IMAGES);
    return cleanup;
  }, []);

  return (
    <div className="tcx" data-theme={theme} ref={rootRef}>
      <style>{CSS}</style>

      <div className="tcx-head">
        <div className="tcx-modbar">
          <div className="wrap tcx-modin">
            <nav className="pnav" id="pnav" aria-label="ToraCX pages" />
          </div>
        </div>
        <div className="subbar">
          <div className="wrap">
            <nav className="nav" id="nav" aria-label="Sections" />
          </div>
        </div>
        <div className="mega" id="mega" />
      </div>

      <div className="ann">
        <b>Learning and workshop syllabus.</b> Version: 28 October 2026{" "}
        <a href="#/program/agenda">See the one-day workshop →</a>
      </div>

      {/* engine renders each page in here */}
      <main id="tcx-app" className="tcx-app" />

      <div className="tcx-legal">
        <div className="wrap">
          <b>ToraCX</b> / Texora AI · Contact Center Learning Academy · Version 28
          October 2026.
          <br />
          Mock dashboards, simulated workflows and illustrations are for learning
          only. Third-party product names belong to their owners; no integration
          with ToraCX is implied. Confirm current licensing, regional
          availability, security and integration details with each vendor&apos;s
          official documentation.
        </div>
      </div>
    </div>
  );
}