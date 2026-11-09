'use client';

// ILM ORA — Onboarding landing UI, scoped for use inside IlmOraDemoPage.
// Usage: <OnboardingLanding theme={theme} onLogin={() => setShowLogin(true)} />
// All CSS is scoped under #ilm-onboarding so it cannot affect the demo navbar,
// footer, sidebar or dashboards.

import { useEffect, useRef } from 'react';
import { mountShowcase, SHOWCASE_CSS } from './OnboardingShowcase';
const CSS = `#ilm-onboarding{--or:#F97316;--gr:#16A34A;--bg:#fff;--bg2:#F8FAFC;--tx:#0F172A;--mu:#64748B;--bd:#E2E8F0;--sh:0 10px 30px rgba(15,23,42,.08);--ac:var(--or);color-scheme:light}
#ilm-onboarding[data-theme=dark]{--bg:#12141C;--bg2:#1B1E29;--tx:#F1F2F6;--mu:#9CA3B5;--bd:#2D3243;--sh:0 10px 30px rgba(0,0,0,.5);color-scheme:dark}
#ilm-onboarding[data-role=corporate]{--ac:var(--gr)}
#ilm-onboarding *{box-sizing:border-box;margin:0}
#ilm-onboarding{scroll-behavior:smooth;scroll-padding-top:70px}
#ilm-onboarding{background:var(--bg);color:var(--tx);font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
#ilm-onboarding a{color:inherit;text-decoration:none}
#ilm-onboarding .w{max-width:1160px;margin:auto;padding:0 20px}
#ilm-onboarding nav{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--bd)}
#ilm-onboarding nav .w{display:flex;align-items:center;gap:22px;height:64px}
#ilm-onboarding .logo{font-weight:800;font-size:1.4rem;letter-spacing:.5px}
#ilm-onboarding .logo b{color:var(--gr)}
#ilm-onboarding .logo i{font-style:normal;color:var(--or)}
#ilm-onboarding .nl{display:flex;gap:20px;margin-left:auto;font-size:.92rem;color:var(--mu)}
#ilm-onboarding .nl a:hover{color:var(--tx)}
#ilm-onboarding .btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;font-weight:600;border:1px solid var(--bd);background:var(--bg);color:var(--tx);cursor:pointer;font-size:.92rem}
#ilm-onboarding .btn.p{background:var(--ac);border-color:var(--ac);color:#fff}
#ilm-onboarding .btn:hover{transform:translateY(-1px)}
#ilm-onboarding #th{width:40px;height:40px;padding:0;justify-content:center}
#ilm-onboarding .hero{padding:64px 0 40px;background:radial-gradient(900px 340px at 80% -10%,color-mix(in srgb,var(--ac) 16%,transparent),transparent)}
#ilm-onboarding .hg{display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center}
#ilm-onboarding .eb{display:inline-block;font-size:.78rem;font-weight:700;color:var(--ac);background:color-mix(in srgb,var(--ac) 12%,transparent);padding:5px 12px;border-radius:99px;margin-bottom:16px}
#ilm-onboarding h1{font-size:clamp(2.2rem,5vw,3.6rem);line-height:1.08;letter-spacing:-1.5px}
#ilm-onboarding h1 .o{color:var(--or)}
#ilm-onboarding h1 .g{color:var(--gr)}
#ilm-onboarding .hero p.lead{color:var(--mu);font-size:1.1rem;margin:18px 0 26px;max-width:520px}
#ilm-onboarding .seg{display:inline-flex;background:var(--bg2);border:1px solid var(--bd);border-radius:14px;padding:5px;gap:4px}
#ilm-onboarding .seg button{border:0;background:none;padding:11px 24px;border-radius:10px;font-weight:700;color:var(--mu);cursor:pointer;font-size:.95rem}
#ilm-onboarding .seg button[aria-pressed=true]{background:var(--ac);color:#fff;box-shadow:0 4px 14px color-mix(in srgb,var(--ac) 40%,transparent)}
#ilm-onboarding .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:30px}
#ilm-onboarding .st{background:var(--bg);border:1px solid var(--bd);border-radius:14px;padding:14px}
#ilm-onboarding .st b{font-size:1.5rem;display:block}
#ilm-onboarding .st span{font-size:.78rem;color:var(--mu)}
#ilm-onboarding .frame{background:var(--bg);border:1px solid var(--bd);border-radius:16px;box-shadow:var(--sh);overflow:hidden}
#ilm-onboarding .fb{display:flex;gap:6px;align-items:center;padding:10px 14px;background:var(--bg2);border-bottom:1px solid var(--bd)}
#ilm-onboarding .fb i{width:10px;height:10px;border-radius:50%;background:#EF4444}
#ilm-onboarding .fb i:nth-child(2){background:#F59E0B}
#ilm-onboarding .fb i:nth-child(3){background:#22C55E}
#ilm-onboarding .fb small{margin-left:10px;color:var(--mu);font-size:.74rem;background:var(--bg);padding:2px 10px;border-radius:6px;border:1px solid var(--bd)}
#ilm-onboarding .fbody{display:grid;grid-template-columns:170px 1fr;min-height:330px}
#ilm-onboarding .side{background:var(--bg2);border-right:1px solid var(--bd);padding:10px;font-size:.78rem;overflow:auto;max-height:420px}
#ilm-onboarding .side button{display:block;width:100%;text-align:left;border:0;background:none;color:var(--mu);padding:7px 10px;border-radius:8px;cursor:pointer;font-size:.78rem;font-family:inherit}
#ilm-onboarding .side button:hover{color:var(--tx)}
#ilm-onboarding .side button[aria-current=true]{background:color-mix(in srgb,var(--ac) 14%,transparent);color:var(--ac);font-weight:700}
#ilm-onboarding .main{padding:18px}
#ilm-onboarding .main h4{font-size:1.1rem}
#ilm-onboarding .main p{font-size:.85rem;color:var(--mu);margin:6px 0 12px}
#ilm-onboarding .chip{display:inline-block;font-size:.7rem;font-weight:700;padding:3px 10px;border-radius:99px;margin-right:6px}
#ilm-onboarding .ok{background:color-mix(in srgb,var(--gr) 15%,transparent);color:var(--gr)}
#ilm-onboarding .pl{background:color-mix(in srgb,#F59E0B 18%,transparent);color:#B45309}
#ilm-onboarding .rt{background:var(--bg2);color:var(--mu);border:1px solid var(--bd);font-family:ui-monospace,monospace}
#ilm-onboarding .skel{display:grid;gap:8px;margin-top:14px}
#ilm-onboarding .skel div{height:38px;border-radius:10px;background:linear-gradient(90deg,var(--bg2),color-mix(in srgb,var(--ac) 10%,var(--bg2)),var(--bg2));border:1px solid var(--bd)}
#ilm-onboarding .skel div:first-child{height:70px}
#ilm-onboarding sec,#ilm-onboarding section{padding:68px 0}
#ilm-onboarding section.alt{background:var(--bg2)}
#ilm-onboarding .sh{text-align:center;margin-bottom:38px}
#ilm-onboarding .sh h2{font-size:clamp(1.7rem,3.5vw,2.4rem);letter-spacing:-.8px}
#ilm-onboarding .sh p{color:var(--mu);max-width:640px;margin:10px auto 0}
#ilm-onboarding .g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px}
#ilm-onboarding .card{background:var(--bg);border:1px solid var(--bd);border-radius:18px;padding:24px;transition:.25s}
#ilm-onboarding .card:hover{transform:translateY(-4px);box-shadow:var(--sh);border-color:var(--ac)}
#ilm-onboarding .ui-ico{display:inline-block;vertical-align:middle;flex:none}
#ilm-onboarding .em .ui-ico{width:20px;height:20px}
#ilm-onboarding .sk .ui-ico{width:18px;height:18px}
#ilm-onboarding .card .ic .ui-ico{width:22px;height:22px}
#ilm-onboarding .bn .ic .ui-ico{width:20px;height:20px}
#ilm-onboarding .si .ui-ico{width:20px;height:20px}
#ilm-onboarding .rt .ui-ico{width:14px;height:14px}
#ilm-onboarding .ui-ico{display:inline-block;vertical-align:middle;flex:none}
#ilm-onboarding .em .ui-ico{width:20px;height:20px}
#ilm-onboarding .sk .ui-ico{width:18px;height:18px}
#ilm-onboarding .card .ic .ui-ico{width:22px;height:22px}
#ilm-onboarding .bn .ic .ui-ico{width:20px;height:20px}
#ilm-onboarding .si .ui-ico{width:20px;height:20px}
#ilm-onboarding .rt .ui-ico{width:14px;height:14px}
#ilm-onboarding .card .ic{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;font-size:1.3rem;background:color-mix(in srgb,var(--ac) 14%,transparent);margin-bottom:14px}
#ilm-onboarding .card h3{font-size:1.1rem;margin-bottom:6px}
#ilm-onboarding .card p{color:var(--mu);font-size:.9rem}
#ilm-onboarding .card ul{margin:10px 0 0 18px;color:var(--mu);font-size:.85rem}
#ilm-onboarding .tabs{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:26px}
#ilm-onboarding .tabs button{padding:9px 18px;border-radius:99px;border:1px solid var(--bd);background:var(--bg);color:var(--mu);font-weight:600;cursor:pointer}
#ilm-onboarding .tabs button[aria-selected=true]{background:var(--ac);border-color:var(--ac);color:#fff}
#ilm-onboarding .show{display:grid;grid-template-columns:1fr 1.2fr;gap:28px;align-items:start}
#ilm-onboarding .fl{display:grid;grid-template-columns:1fr 1fr;gap:8px}
#ilm-onboarding .fl button{text-align:left;padding:11px 14px;border-radius:12px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);cursor:pointer;font-size:.86rem;font-family:inherit}
#ilm-onboarding .fl button:hover,#ilm-onboarding .fl button[aria-current=true]{border-color:var(--ac);background:color-mix(in srgb,var(--ac) 9%,var(--bg))}
#ilm-onboarding .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;counter-reset:s}
#ilm-onboarding .stp{position:relative;padding:22px;background:var(--bg);border:1px solid var(--bd);border-radius:16px}
#ilm-onboarding .stp:before{counter-increment:s;content:counter(s);display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--ac);color:#fff;font-weight:800;margin-bottom:12px}
#ilm-onboarding .stp h4{margin-bottom:4px}
#ilm-onboarding .stp p{font-size:.86rem;color:var(--mu)}
#ilm-onboarding details{background:var(--bg);border:1px solid var(--bd);border-radius:14px;padding:16px 20px;margin-bottom:10px}
#ilm-onboarding summary{cursor:pointer;font-weight:600}
#ilm-onboarding details p{color:var(--mu);margin-top:8px;font-size:.92rem}
#ilm-onboarding .cta{text-align:center;background:linear-gradient(135deg,var(--or),#EA580C 55%,var(--gr));color:#fff;border-radius:26px;padding:56px 24px}
#ilm-onboarding .cta h2{font-size:clamp(1.7rem,4vw,2.5rem)}
#ilm-onboarding .cta p{opacity:.92;margin:10px auto 24px;max-width:540px}
#ilm-onboarding .cta .btn{background:#fff;color:#0F172A;border:0;margin:4px}
#ilm-onboarding footer{border-top:1px solid var(--bd);padding:36px 0 calc(36px + env(safe-area-inset-bottom,0));color:var(--mu);font-size:.88rem}
#ilm-onboarding footer .w{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px}
#ilm-onboarding footer nav{all:unset}
#ilm-onboarding footer a{margin-right:16px}
#ilm-onboarding footer a:hover{color:var(--tx)}
#ilm-onboarding .rv{opacity:0;transform:translateY(18px);transition:.6s}
#ilm-onboarding .rv.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){#ilm-onboarding *{transition:none!important;animation:none!important;scroll-behavior:auto!important}
#ilm-onboarding .rv{opacity:1;transform:none}}
@media(max-width:900px){#ilm-onboarding .hg,#ilm-onboarding .show{grid-template-columns:1fr}
#ilm-onboarding .g3,#ilm-onboarding .steps{grid-template-columns:1fr 1fr}
#ilm-onboarding .nl{display:none}
#ilm-onboarding .nav-sp{margin-left:auto}}
@media(max-width:560px){#ilm-onboarding .g3,#ilm-onboarding .steps,#ilm-onboarding .fl{grid-template-columns:1fr}
#ilm-onboarding .stats{grid-template-columns:repeat(2,1fr)}
#ilm-onboarding .fbody{grid-template-columns:1fr}
#ilm-onboarding .side{display:none}}
#ilm-onboarding{font-family:Inter,system-ui,sans-serif;background-color:var(--bg2);background-image:linear-gradient(var(--bd) 1px,transparent 1px),linear-gradient(90deg,var(--bd) 1px,transparent 1px);background-size:34px 34px}
#ilm-onboarding h1,#ilm-onboarding h2,#ilm-onboarding h3,#ilm-onboarding h4,#ilm-onboarding .st b,#ilm-onboarding .logo{font-family:"Space Grotesk",system-ui,sans-serif}
#ilm-onboarding nav{background:#262626;border:0;backdrop-filter:none;color:#fff}
#ilm-onboarding nav .w{height:68px;max-width:1240px}
#ilm-onboarding .logo{font-family:Georgia,"Times New Roman",serif;font-weight:700;font-size:1.7rem}
#ilm-onboarding .nl{margin:0 auto;gap:34px;color:#fff;font-weight:600;font-size:1rem}
#ilm-onboarding .nl a:hover{color:var(--or)}
#ilm-onboarding .ib{width:42px;height:42px;padding:0;justify-content:center;background:#1a1a1a;border:1px solid #3a3a3a;color:#fff;border-radius:12px;font-size:1rem}
#ilm-onboarding nav .btn.p{background:#F97316;border-color:#F97316;padding:11px 22px;border-radius:14px;font-weight:700}
#ilm-onboarding{scroll-padding-top:70px}
#ilm-onboarding .hero{background:none;padding:56px 0 36px}
#ilm-onboarding .w{max-width:1240px}
#ilm-onboarding h1{font-size:clamp(2.6rem,6vw,4.4rem);letter-spacing:-2px;line-height:1.05;font-weight:700}
#ilm-onboarding h1 .o{background:linear-gradient(90deg,#F97316,#B45309,#16A34A);-webkit-background-clip:text;background-clip:text;color:transparent}
#ilm-onboarding h1 .g{background:linear-gradient(90deg,#8A8A1E,#16A34A);-webkit-background-clip:text;background-clip:text;color:transparent}
#ilm-onboarding .hero p.lead{font-size:1.15rem;color:#64748B;max-width:600px}
#ilm-onboarding .st{border-radius:16px;padding:16px 18px}
#ilm-onboarding .st b{font-size:1.9rem;font-weight:700}
#ilm-onboarding .st span{font-size:.9rem}
#ilm-onboarding .hero .frame{border-radius:28px;box-shadow:0 24px 60px rgba(15,23,42,.18);border:0}
#ilm-onboarding .sh h2{font-size:clamp(2rem,4vw,2.9rem);font-weight:700;letter-spacing:-1.2px}
#ilm-onboarding .show{grid-template-columns:1fr}
#ilm-onboarding .show .frame{border-radius:22px}
#ilm-onboarding .dsh{display:grid;grid-template-columns:200px 1fr;min-height:430px;background:var(--bg2)}
#ilm-onboarding .compact .dsh{grid-template-columns:140px 1fr;min-height:330px}
#ilm-onboarding .dsh .side{background:#1B2233;border:0;max-height:560px;padding:12px 8px}
#ilm-onboarding .dsh .side b{display:block;color:#fff;font-family:"Space Grotesk";padding:6px 10px 10px;font-size:.95rem}
#ilm-onboarding .dsh .side button{color:#9AA4B8}
#ilm-onboarding .dsh .side button:hover{color:#fff}
#ilm-onboarding .dsh .side button[aria-current=true]{background:var(--ac);color:#fff}
#ilm-onboarding .dm{padding:16px;min-width:0}
#ilm-onboarding .tb{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
#ilm-onboarding .tb h4{font-size:1.25rem}
#ilm-onboarding .kp{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0}
#ilm-onboarding .kp div{background:var(--bg);border:1px solid var(--bd);border-radius:12px;padding:12px}
#ilm-onboarding .kp b{font-size:1.4rem;display:block}
#ilm-onboarding .kp span{font-size:.72rem;color:var(--mu)}
#ilm-onboarding .two{display:grid;grid-template-columns:1.2fr 1fr;gap:12px}
#ilm-onboarding .bx{background:var(--bg);border:1px solid var(--bd);border-radius:12px;padding:14px}
#ilm-onboarding .bx h5{font-size:.82rem;margin-bottom:10px}
#ilm-onboarding .bars{display:flex;align-items:flex-end;gap:8px;height:110px}
#ilm-onboarding .bars i{flex:1;background:linear-gradient(var(--ac),color-mix(in srgb,var(--ac) 45%,transparent));border-radius:6px 6px 0 0}
#ilm-onboarding .qa{display:grid;gap:6px}
#ilm-onboarding .qa a{font-size:.8rem;display:flex;justify-content:space-between;padding:7px 10px;border-radius:8px;background:var(--bg2);border:1px solid var(--bd)}
#ilm-onboarding .qa a:hover{border-color:var(--ac);color:var(--ac)}
#ilm-onboarding .chat{position:fixed;right:22px;bottom:calc(22px + env(safe-area-inset-bottom,0));width:58px;height:58px;border-radius:50%;background:var(--or);color:#fff;display:grid;place-items:center;font-size:1.5rem;box-shadow:0 10px 26px rgba(249,115,22,.45);z-index:30}
#ilm-onboarding .tl{height:34px}
@media(max-width:700px){#ilm-onboarding .dsh,#ilm-onboarding .compact .dsh{grid-template-columns:1fr}
#ilm-onboarding .dsh .side{display:none}
#ilm-onboarding .kp{grid-template-columns:1fr 1fr}
#ilm-onboarding .two{grid-template-columns:1fr}}
#ilm-onboarding .scw{overflow:hidden;position:relative;background:#F0EFEC}
#ilm-onboarding .scr{width:860px;transform-origin:0 0;font-family:"Space Grotesk",Inter,sans-serif;color:#111;font-size:11px;background:#F0EFEC;overflow:hidden;position:absolute;left:0;top:0}
#ilm-onboarding .sc-top{background:#161616;height:36px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;color:#fff;font-size:8px;font-weight:600}
#ilm-onboarding .sc-top .lg{font:700 15px Georgia,serif}
#ilm-onboarding .sc-top .lg b{color:#16A34A}
#ilm-onboarding .sc-top .lg i{font-style:normal;color:#F97316}
#ilm-onboarding .sc-top nav{all:unset;display:flex;gap:22px}
#ilm-onboarding .sc-top .ic{display:flex;gap:6px;align-items:center}
#ilm-onboarding .sc-top .ic u{width:15px;height:15px;border:1px solid #444;border-radius:4px;display:block}
#ilm-onboarding .sc-top .ic em{width:14px;height:14px;border-radius:50%;background:#F97316;display:block}
#ilm-onboarding .sc-b{display:flex}
#ilm-onboarding .sc-s{width:120px;background:#F6F5F2;border-right:1px solid #E5E3DE;padding:10px 6px;font-size:8px;min-height:560px;flex:none}
#ilm-onboarding .sc-s .bl{font:700 12px Georgia,serif;padding:0 4px}
#ilm-onboarding .sc-s .bl b{color:#16A34A}
#ilm-onboarding .sc-s .bl i{font-style:normal;color:#F97316}
#ilm-onboarding .sc-s .pt{font-size:5.5px;letter-spacing:1px;color:#888;padding:0 4px 8px;font-weight:700}
#ilm-onboarding .sc-s a{display:block;padding:5px 7px;border-radius:5px;color:#333;font-weight:500}
#ilm-onboarding .sc-s a:hover{background:#EAE8E3}
#ilm-onboarding .sc-s a.on{background:#E8E6E1;font-weight:700}
#ilm-onboarding .sc-s a.c{padding-left:16px;color:#666;font-size:7.5px}
#ilm-onboarding .sc-s .gh{padding:5px 7px;color:#333;font-weight:500}
#ilm-onboarding .sc-m{flex:1;padding:14px 14px 20px;min-width:0}
#ilm-onboarding .sc-m .ey{font-size:5.5px;letter-spacing:1px;color:#777;font-weight:700}
#ilm-onboarding .sc-m h3{font-size:17px;margin:3px 0 2px}
#ilm-onboarding .sc-m .sb{font-size:7px;color:#777}
#ilm-onboarding .hd{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #DEDCD6;padding-bottom:10px;margin-bottom:10px}
#ilm-onboarding .pill{display:inline-block;font-size:6.5px;font-weight:600;padding:3px 7px;border:1px solid #DDD;border-radius:6px;background:#F6F5F2;margin-left:4px}
#ilm-onboarding .pill.l{border-radius:99px;border-color:#C4B5FD;background:#F3EEFF}
#ilm-onboarding .sg{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:10px}
#ilm-onboarding .sk{background:#fff;border-radius:10px;border-bottom:3px solid #1d1d1d;padding:12px}
#ilm-onboarding .sk .i{width:18px;height:18px;border:1px solid #E3E1DC;border-radius:5px;display:grid;place-items:center;font-size:8px;margin-bottom:8px;background:#F6F5F2}
#ilm-onboarding .sk b{display:block;font-size:19px;line-height:1}
#ilm-onboarding .sk span{display:block;font-weight:700;font-size:7.5px;margin-top:6px}
#ilm-onboarding .sk small{font-size:6.5px;color:#888}
#ilm-onboarding .pg{display:grid;gap:10px;margin-bottom:10px}
#ilm-onboarding .pn{background:#fff;border-radius:10px;border:1px solid #E7E5E0;padding:10px;min-height:150px;display:flex;flex-direction:column}
#ilm-onboarding .pn .t{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-size:7.5px;margin-bottom:6px}
#ilm-onboarding .pn .t u{text-decoration:none;font-size:5.5px;border:1px solid #DDD;border-radius:99px;padding:2px 7px;background:#F6F5F2;font-weight:600}
#ilm-onboarding .em{margin:auto;text-align:center;color:#777;font-size:6.5px;font-weight:600}
#ilm-onboarding .em i{display:grid;place-items:center;width:20px;height:20px;border:1px dashed #D5D2CB;border-radius:6px;margin:0 auto 5px;font-style:normal;opacity:.6;font-size:9px}
#ilm-onboarding .em small{display:block;font-weight:400;font-size:5.5px}
#ilm-onboarding .bt{margin-top:auto;text-align:center;border:1px solid #DDD;background:#F6F5F2;border-radius:6px;padding:5px;font-size:6.5px;font-weight:600}
#ilm-onboarding .cal{font-size:6px;text-align:center}
#ilm-onboarding .cal .g{display:grid;grid-template-columns:repeat(7,1fr);gap:2px 0;margin-top:4px}
#ilm-onboarding .cal .g span{padding:3px 0}
#ilm-onboarding .cal .g .h{color:#888;font-size:5px}
#ilm-onboarding .cal .g .n{background:#E1704C;color:#fff;border-radius:4px;font-weight:700}
#ilm-onboarding .kr{display:grid;grid-template-columns:1fr 1fr;gap:5px}
#ilm-onboarding .kr div{background:#F6F5F2;border:1px solid #E7E5E0;border-radius:6px;padding:6px;font-size:6px;color:#777}
#ilm-onboarding .kr b{display:block;color:#111;font-size:7.5px}
#ilm-onboarding .strip{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:8px;padding:14px;background:var(--bg2);border-top:1px solid var(--bd)}
#ilm-onboarding .strip a{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:10px 12px;border-radius:10px;border:1px solid var(--bd);background:var(--bg);font-size:.85rem}
#ilm-onboarding .strip a:hover{border-color:var(--ac)}
#ilm-onboarding .strip p{grid-column:1/-1;font-size:.78rem;color:var(--mu);margin:0}
#ilm-onboarding section{padding:50px 0}
#ilm-onboarding .sh{margin-bottom:26px}
#ilm-onboarding .hero{padding:36px 0 28px}
#ilm-onboarding .hg{display:flex;flex-direction:column;align-items:center;text-align:center;gap:0}
#ilm-onboarding .hg>div:first-child{display:contents}
#ilm-onboarding .hg>div>div:not(.stats){justify-content:center}
#ilm-onboarding .hero p.lead{margin:12px auto 18px;font-size:1.05rem}
#ilm-onboarding .hg h1{font-size:clamp(2.2rem,5vw,3.6rem)}
#ilm-onboarding .hg #hf{order:8;width:100%;max-width:1100px;margin-top:26px;position:relative}
#ilm-onboarding .hg .stats{order:9;width:100%;max-width:1100px;margin-top:20px}
#ilm-onboarding .st b{font-size:1.5rem}
#ilm-onboarding .cn{position:absolute;top:40%;z-index:5;width:40px;height:40px;border-radius:50%;border:0;background:rgba(17,17,17,.7);color:#fff;font-size:1.4rem;cursor:pointer}
#ilm-onboarding .cn.l{left:10px}
#ilm-onboarding .cn.r{right:10px}
#ilm-onboarding .cn:hover{background:var(--or)}
#ilm-onboarding .cd{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;padding:10px;background:var(--bg);border-top:1px solid var(--bd)}
#ilm-onboarding .cd button{border:1px solid var(--bd);background:var(--bg2);color:var(--mu);padding:5px 14px;border-radius:99px;font-size:.8rem;font-weight:600;cursor:pointer}
#ilm-onboarding .cd button[aria-current=true]{background:var(--ac);border-color:var(--ac);color:#fff}
#ilm-onboarding .card{padding:20px}
#ilm-onboarding .tabs{margin-bottom:18px}
#ilm-onboarding .strip{padding:12px}
#ilm-onboarding .ws-n{width:118px;background:#fff;border-right:1px solid #E5E7EB;padding:10px 6px;font-size:8px;flex:none}
#ilm-onboarding .ws-n h6{font-size:9px;padding:2px 6px 8px;border-bottom:1px solid #EEE;margin-bottom:8px}
#ilm-onboarding .ws-n small{display:block;font-size:5.5px;letter-spacing:1px;color:#999;padding:8px 8px 3px;font-weight:700}
#ilm-onboarding .ws-n a,#ilm-onboarding .ws-n button{display:flex;align-items:center;justify-content:space-between;width:100%;border:0;background:none;text-align:left;font:500 8px "Space Grotesk",sans-serif;color:#333;padding:6px 8px;border-radius:6px}
#ilm-onboarding .ws-n button{cursor:pointer}
#ilm-onboarding .ws-n .on{background:#EDE9FE;color:#6D28D9;font-weight:700}
#ilm-onboarding .ws-n em{font-style:normal;background:#7C3AED;color:#fff;font-size:5.5px;padding:1px 5px;border-radius:99px}
#ilm-onboarding .ws-m{flex:1;background:#F1F4F9;padding:14px;min-width:0;min-height:560px}
#ilm-onboarding .ws-m h3{font-size:18px;margin:0}
#ilm-onboarding .wh{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}
#ilm-onboarding .wh div:last-child{display:flex;gap:6px;align-items:center}
#ilm-onboarding .pb{background:#7C3AED;color:#fff;padding:6px 10px;border-radius:7px;font-size:7.5px;font-weight:600}
#ilm-onboarding .pill.g{background:#DCFCE7;border-color:#DCFCE7;color:#15803D}
#ilm-onboarding .pill.w{background:#fff}
#ilm-onboarding .wk{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:10px}
#ilm-onboarding .wk div{background:#fff;border-radius:10px;padding:12px;border:1px solid #E5E7EB}
#ilm-onboarding .wk i{display:grid;place-items:center;width:20px;height:20px;border-radius:6px;font-style:normal;font-size:9px;margin-bottom:8px}
#ilm-onboarding .wk b{display:block;font-size:20px}
#ilm-onboarding .wk span{font-size:7.5px;font-weight:600;display:block;margin:4px 0}
#ilm-onboarding .wk small{font-size:6.5px;color:#16A34A;font-weight:600}
#ilm-onboarding .wg{display:grid;grid-template-columns:2fr 1fr;gap:10px}
#ilm-onboarding .wp{background:#fff;border:1px solid #E5E7EB;border-radius:10px;padding:12px;margin-bottom:10px;font-size:7.5px}
#ilm-onboarding .wp h5{font-size:8.5px;margin-bottom:6px;display:flex;justify-content:space-between}
#ilm-onboarding .wp p{color:#6B7280;font-size:7px;margin:4px 0}
#ilm-onboarding .wp .lk{color:#7C3AED;font-weight:600;font-size:7px}
#ilm-onboarding .wp .pb{display:block;text-align:center;margin-top:8px}
#ilm-onboarding .wp .ln{border:1px solid #E5E7EB;border-radius:8px;padding:8px;display:flex;justify-content:space-between;align-items:center;margin-top:6px}
#ilm-onboarding .mg{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
#ilm-onboarding .mg span{background:#EEF1F7;border:1px solid #E1E6EF;border-radius:6px;height:42px;padding:4px;font-size:6.5px;font-weight:600;color:#475569}
#ilm-onboarding .mg .h{background:none;border:0;height:auto;text-align:center;font-size:6.5px;color:#64748B}
#ilm-onboarding .mg .t{border:1px solid #7C3AED;background:#F5F0FF;color:#6D28D9}
#ilm-onboarding .mg .z{background:none;border:0}
#ilm-onboarding .seg2{display:flex;gap:4px;margin-bottom:8px;align-items:center;justify-content:space-between;font-size:8px;font-weight:600}
#ilm-onboarding .seg2 b{background:#7C3AED;color:#fff;border-radius:99px;padding:3px 9px;font-size:7px}
#ilm-onboarding .seg2 u{text-decoration:none;background:#E5E7EB;border-radius:99px;padding:3px 9px;font-size:7px;color:#64748B}
@media(max-width:700px){#ilm-onboarding .cn{display:none}}
#ilm-onboarding .scr{text-align:left}
#ilm-onboarding .ws-m .sb{font-size:7px;color:#777}
#ilm-onboarding .ws-m,#ilm-onboarding .sc-s,#ilm-onboarding .ws-n{min-height:600px}
#ilm-onboarding .ws-m h3{font-size:17px}
#ilm-onboarding .dm,#ilm-onboarding .sc-m{font-size:11px}
#ilm-onboarding .sc-s button{display:block;width:100%;text-align:left;border:0;background:none;font:500 8px "Space Grotesk",sans-serif;padding:5px 7px;border-radius:5px;color:#333;cursor:pointer}
#ilm-onboarding .sc-s button:hover{background:#EAE8E3}
#ilm-onboarding .sc-s button.c{padding-left:16px;color:#666;font-size:7.5px}
#ilm-onboarding .sc-s button.on{background:#E8E6E1;font-weight:700;color:#111}
#ilm-onboarding .fc{display:flex;gap:5px;flex-wrap:wrap;align-items:center;margin:0 0 9px}
#ilm-onboarding .fc b,#ilm-onboarding .fc u{text-decoration:none;font-size:7px;font-weight:600;padding:4px 9px;border-radius:99px;border:1px solid #DDD;background:#fff;color:#555}
#ilm-onboarding .fc b{background:#1d1d1d;color:#fff;border-color:#1d1d1d}
#ilm-onboarding .in{background:#fff;border:1px solid #E1DFDA;border-radius:8px;padding:6px 10px;font-size:7.5px;color:#999;min-width:170px}
#ilm-onboarding .th{display:grid;gap:6px;font-size:6.5px;font-weight:700;color:#777;padding:8px 10px;border-bottom:1px solid #EEE;background:#FAFAF8;border-radius:10px 10px 0 0}
#ilm-onboarding .vp{background:#0f1115;border-radius:10px;display:grid;place-items:center;color:#9aa4b8;font-size:8px;min-height:240px;text-align:center}
#ilm-onboarding .vp i{display:block;font-style:normal;font-size:22px;margin-bottom:6px;opacity:.7}
#ilm-onboarding .b2{display:inline-block;background:#1d1d1d;color:#fff;border-radius:7px;padding:6px 11px;font-size:7.5px;font-weight:600;margin-top:8px}
#ilm-onboarding .b2.o{background:#F97316}
#ilm-onboarding .ed{background:#0f1115;border-radius:8px;color:#6b7387;font:8px ui-monospace,monospace;padding:10px;min-height:250px;line-height:1.9}
#ilm-onboarding .rt{display:flex;gap:6px;margin:6px 0 10px}
#ilm-onboarding .rt span{flex:1;text-align:center;border:1px solid #E1DFDA;border-radius:8px;padding:7px 2px;font-size:6.5px;background:#fff}
#ilm-onboarding .rt span i{display:block;font-style:normal;font-size:13px}
#ilm-onboarding .fr{display:flex;justify-content:space-between;font-size:7.5px;padding:6px 0;border-bottom:1px solid #F0EEE9}
#ilm-onboarding .fr span:last-child{color:#bbb;letter-spacing:2px}
#ilm-onboarding .ta{border:1px solid #E1DFDA;border-radius:8px;min-height:60px;padding:8px;font-size:7px;color:#aaa;background:#fff;margin:6px 0}
#ilm-onboarding .sm{display:flex;justify-content:space-between;font-size:7.5px;padding:7px 0;border-bottom:1px solid #F0EEE9}
#ilm-onboarding .sm b{font-size:9px}
#ilm-onboarding .cc{display:grid;gap:8px;grid-template-columns:repeat(3,1fr);margin-top:8px}
#ilm-onboarding .cc div{border:1px solid #E7E5E0;border-radius:8px;padding:8px;font-size:7px;font-weight:600;background:#FAFAF8}
#ilm-onboarding .pg>*,#ilm-onboarding .sc-m>*,#ilm-onboarding .sg>*{min-width:0}
#ilm-onboarding .sc-m{overflow:hidden;width:0}
#ilm-onboarding .hd>div:last-child{display:flex;gap:4px;align-items:center;flex:none}
#ilm-onboarding .em{padding:10px 0}
#ilm-onboarding .sc-s{width:104px!important}
#ilm-onboarding .ws-n{width:104px!important}
#ilm-onboarding .sc-top{height:40px}
#ilm-onboarding .fb i{display:none}
#ilm-onboarding .fb{padding:8px 14px;justify-content:center}
#ilm-onboarding .fb small{margin:0;min-width:240px;text-align:center}
#ilm-onboarding .sc-m{padding:16px 16px 20px}
#ilm-onboarding .sg{gap:10px}
#ilm-onboarding .sk{padding:13px}
#ilm-onboarding .sk b{font-size:21px}
#ilm-onboarding .pn{padding:12px}
#ilm-onboarding .cn.l{left:-54px}
#ilm-onboarding .cn.r{right:-54px}
#ilm-onboarding .cn{top:45%}
@media(max-width:1260px){#ilm-onboarding .cn.l{left:8px}
#ilm-onboarding .cn.r{right:8px}}
#ilm-onboarding .cap{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:10px 16px;font-size:.82rem;color:var(--mu);background:var(--bg);border-top:1px solid var(--bd)}
#ilm-onboarding .cap a{color:var(--ac);font-weight:600}
#ilm-onboarding .ifw{position:relative;overflow:hidden;background:var(--bg2)}
#ilm-onboarding .ifw iframe{display:block;background:transparent}
#ilm-onboarding{--ag:linear-gradient(120deg,var(--or),var(--gr))}
#ilm-onboarding nav .w{height:58px}
#ilm-onboarding .logo{font-size:1.5rem}
#ilm-onboarding #sp{position:absolute;left:0;bottom:0;height:3px;width:var(--p,0%);background:linear-gradient(90deg,var(--or),#FBBF24,var(--gr));box-shadow:0 0 10px var(--or)}
#ilm-onboarding nav{box-shadow:0 8px 24px -8px rgba(0,0,0,.45)}
#ilm-onboarding section{padding:26px 0}
#ilm-onboarding .sh{margin-bottom:14px}
#ilm-onboarding .sh h2{font-size:clamp(1.5rem,3vw,2.1rem);letter-spacing:-.8px}
#ilm-onboarding .sh p{margin:6px auto 0;font-size:.95rem}
#ilm-onboarding .sh h2:after{content:"";display:block;width:52px;height:4px;border-radius:4px;margin:8px auto 0;background:var(--ag);transform:scaleX(0);transition:transform .8s cubic-bezier(.2,.7,.2,1) .2s}
#ilm-onboarding .sh.in h2:after{transform:scaleX(1)}
#ilm-onboarding .hero{position:relative;padding:18px 0 8px}
#ilm-onboarding .hero .w{position:relative;z-index:1}
#ilm-onboarding .bgfx{position:absolute;inset:0;overflow:hidden;pointer-events:none}
#ilm-onboarding .bgfx i{position:absolute;border-radius:50%;filter:blur(70px);opacity:.34;animation:onb-drift 14s ease-in-out infinite alternate}
#ilm-onboarding .bgfx .a{width:340px;height:340px;background:var(--or);left:-90px;top:-110px}
#ilm-onboarding .bgfx .b{width:380px;height:380px;background:var(--gr);right:-110px;top:30px;animation-delay:-5s}
#ilm-onboarding .bgfx .c{width:220px;height:220px;background:#FBBF24;left:42%;top:-100px;opacity:.2;animation-delay:-9s}
@keyframes onb-drift{to{transform:translate(46px,32px) scale(1.15)}}
#ilm-onboarding .eb{margin-bottom:8px;border:1px solid color-mix(in srgb,var(--ac) 30%,transparent)}
#ilm-onboarding .eb:before{content:"";display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--ac);margin-right:8px;animation:onb-pulse 1.8s infinite}
@keyframes onb-pulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--ac) 60%,transparent)}70%,100%{box-shadow:0 0 0 8px transparent}}
#ilm-onboarding .hg h1{font-size:clamp(2rem,4.6vw,3.2rem);letter-spacing:-1.5px;line-height:1.06}
#ilm-onboarding h1 .o,#ilm-onboarding h1 .g{background-size:200% 100%;animation:onb-shift 7s ease-in-out infinite alternate}
@keyframes onb-shift{to{background-position:100% 0}}
#ilm-onboarding .hero p.lead{margin:8px auto 12px;font-size:1rem;max-width:640px}
#ilm-onboarding .cta-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:center}
#ilm-onboarding .btn{transition:transform .2s,box-shadow .2s}
#ilm-onboarding .btn.p{position:relative;overflow:hidden;box-shadow:0 8px 20px -4px color-mix(in srgb,var(--ac) 55%,transparent)}
#ilm-onboarding .btn.p:after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);transform:skewX(-20deg);animation:onb-shine 3.8s infinite}
@keyframes onb-shine{0%,60%{left:-60%}100%{left:140%}}
#ilm-onboarding .hfw{order:8;width:100%;max-width:1100px;margin-top:14px;position:relative;transition:transform .25s ease-out;transform-style:preserve-3d}
#ilm-onboarding .hg #hf{order:0;max-width:none;margin-top:0;overflow:visible;border-radius:22px;box-shadow:0 34px 60px -24px rgba(15,23,42,.45),0 10px 22px -12px rgba(15,23,42,.3),0 0 0 1px color-mix(in srgb,var(--tx) 8%,transparent)}
#ilm-onboarding .hg #hf .fb{border-radius:22px 22px 0 0}
#ilm-onboarding .hg #hf .cd{border-radius:0 0 22px 22px}
#ilm-onboarding .hg #hf:after{content:"";position:absolute;inset:0;border-radius:22px;pointer-events:none;background:linear-gradient(115deg,rgba(255,255,255,.14),transparent 32%)}
#ilm-onboarding .hfw:before{content:"";position:absolute;left:8%;right:8%;bottom:-18px;height:28px;background:radial-gradient(ellipse,rgba(0,0,0,.4),transparent 70%);filter:blur(8px)}
#ilm-onboarding .fch{position:absolute;z-index:6;display:flex;align-items:center;gap:9px;padding:8px 12px;border-radius:14px;background:color-mix(in srgb,var(--bg) 84%,transparent);backdrop-filter:blur(12px);border:1px solid var(--bd);box-shadow:0 14px 30px -10px rgba(15,23,42,.35);font-size:.78rem;font-weight:700;line-height:1.25;animation:onb-float 5s ease-in-out infinite}
#ilm-onboarding .fch small{display:block;font-weight:500;color:var(--mu);font-size:.68rem}
#ilm-onboarding .fch.a{left:-12px;top:24%}
#ilm-onboarding .fch.b{right:-12px;top:10%;animation-delay:-1.6s}
#ilm-onboarding .fch.c{right:7%;bottom:-14px;animation-delay:-3s}
@keyframes onb-float{50%{transform:translateY(-8px)}}
#ilm-onboarding .ld{width:9px;height:9px;border-radius:50%;background:#22C55E;animation:onb-pulse 1.6s infinite;flex:none}
#ilm-onboarding .fch .rg{width:30px;height:30px}
#ilm-onboarding .cd button{position:relative;overflow:hidden}
#ilm-onboarding .cd button[aria-current=true]:after{content:"";position:absolute;left:0;bottom:0;height:3px;background:rgba(255,255,255,.75);animation:onb-prog 6s linear forwards}
@keyframes onb-prog{from{width:0}to{width:100%}}
#ilm-onboarding .hfw:hover .cd button:after{display:none}
#ilm-onboarding .hg .stats{margin-top:14px;gap:10px;max-width:1100px}
#ilm-onboarding .st{position:relative;padding:10px 14px;text-align:left;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(8px);box-shadow:0 8px 20px -12px rgba(15,23,42,.25);transition:transform .3s,box-shadow .3s}
#ilm-onboarding .st:hover{transform:translateY(-3px)}
#ilm-onboarding .st b{font-size:1.45rem;line-height:1.1}
#ilm-onboarding .st span{font-size:.8rem}
#ilm-onboarding .st .bar{display:block;height:3px;border-radius:3px;margin-top:7px;background:var(--bd);position:relative;overflow:hidden}
#ilm-onboarding .st .bar:after{content:"";position:absolute;inset:0;width:var(--w,70%);background:var(--ag);transform-origin:0 0;transform:scaleX(0);transition:transform 1.4s cubic-bezier(.2,.7,.2,1) .3s}
#ilm-onboarding .st.in .bar:after{transform:scaleX(1)}
#ilm-onboarding .rv{transition:transform .3s,box-shadow .3s,border-color .3s}
#ilm-onboarding .rv.in{animation:onb-rise .7s cubic-bezier(.2,.7,.2,1) backwards;animation-delay:calc(var(--i,0)*80ms)}
@keyframes onb-rise{from{opacity:0;transform:translateY(22px) scale(.97)}}
#ilm-onboarding .g3{gap:12px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr))}
#ilm-onboarding .card{position:relative;overflow:hidden;padding:16px;border-radius:16px;box-shadow:0 1px 2px rgba(15,23,42,.05),0 12px 24px -16px rgba(15,23,42,.25)}
#ilm-onboarding .card:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(240px circle at var(--mx,50%) var(--my,0),color-mix(in srgb,var(--ac) 16%,transparent),transparent 65%)}
#ilm-onboarding .card:hover:before{opacity:1}
#ilm-onboarding .card:hover,#ilm-onboarding .card.rv.in:hover{transform:translateY(-5px);border-color:var(--ac);box-shadow:0 20px 36px -16px color-mix(in srgb,var(--ac) 55%,transparent)}
#ilm-onboarding .card .ic{width:40px;height:40px;margin:0 0 10px;font-size:1.15rem;background:linear-gradient(135deg,color-mix(in srgb,var(--or) 24%,transparent),color-mix(in srgb,var(--gr) 24%,transparent));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--ac) 25%,transparent);animation:onb-bob 4s ease-in-out infinite}
@keyframes onb-bob{50%{transform:translateY(-3px) rotate(-4deg)}}
#ilm-onboarding .card h3{font-size:1rem;margin-bottom:3px}
#ilm-onboarding .card p{font-size:.86rem;line-height:1.45}
#ilm-onboarding .card ul{margin:8px 0 0 16px;font-size:.8rem;line-height:1.5}
#ilm-onboarding .card .tg{position:absolute;right:12px;top:14px}
#ilm-onboarding .card .tg .chip{margin:0}
#ilm-onboarding .mv{display:block;width:100%;height:auto;margin-top:10px;overflow:visible}
#ilm-onboarding .mv .ln{fill:none;stroke:var(--ac);stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset 1.8s cubic-bezier(.3,.7,.2,1) .35s}
#ilm-onboarding .mv .ar{fill:color-mix(in srgb,var(--ac) 14%,transparent);opacity:0;transition:opacity 1s 1.1s}
#ilm-onboarding .in .mv .ln{stroke-dashoffset:0}
#ilm-onboarding .in .mv .ar{opacity:1}
#ilm-onboarding .bn .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
#ilm-onboarding .bn .top .ic{margin:0}
#ilm-onboarding .bn .top .mv{width:96px;margin:0}
#ilm-onboarding .bn .mv .ln{stroke-width:2}
#ilm-onboarding .rg{width:44px;height:44px;transform:rotate(-90deg)}
#ilm-onboarding .rg circle{fill:none;stroke-width:4.5}
#ilm-onboarding .rg .bg{stroke:var(--bd)}
#ilm-onboarding .rg .fg{stroke:var(--ac);stroke-linecap:round;stroke-dasharray:0 100;transition:stroke-dasharray 1.6s cubic-bezier(.3,.7,.2,1) .3s}
#ilm-onboarding .in .rg .fg{stroke-dasharray:var(--v,100) 100}
#ilm-onboarding .bz rect{fill:var(--ac);transform-box:fill-box;transform-origin:bottom;transform:scaleY(0);transition:transform .8s cubic-bezier(.3,.7,.2,1) calc(var(--d)*90ms + .3s);opacity:.85}
#ilm-onboarding .in .bz rect{transform:scaleY(1)}
#ilm-onboarding .tabs{margin-bottom:10px;gap:6px}
#ilm-onboarding .tabs button{padding:7px 14px;font-size:.88rem;transition:.25s}
#ilm-onboarding .tabs button:hover{border-color:var(--ac);color:var(--tx)}
#ilm-onboarding .tabs button[aria-selected=true]{box-shadow:0 6px 16px -6px color-mix(in srgb,var(--ac) 70%,transparent);color:#fff}
#ilm-onboarding .show .frame{border-radius:20px;box-shadow:0 34px 60px -28px rgba(15,23,42,.5),0 0 0 1px color-mix(in srgb,var(--tx) 7%,transparent)}
#ilm-onboarding .steps{position:relative;gap:12px}
#ilm-onboarding .steps.rv{opacity:1;transform:none}
#ilm-onboarding .steps.rv.in{animation:none}
#ilm-onboarding .steps:before,#ilm-onboarding .steps:after{content:"";position:absolute;left:10%;top:29px;height:2px}
#ilm-onboarding .steps:before{right:10%;background:repeating-linear-gradient(90deg,var(--bd) 0 6px,transparent 6px 12px)}
#ilm-onboarding .steps:after{width:80%;background:var(--ag);box-shadow:0 0 8px var(--ac);transform-origin:0 0;transform:scaleX(0);transition:transform 1.8s cubic-bezier(.3,.7,.2,1) .2s}
#ilm-onboarding .steps.in:after{transform:scaleX(1)}
#ilm-onboarding .stp{z-index:1;padding:14px 16px;border-radius:14px;opacity:0;box-shadow:0 12px 24px -16px rgba(15,23,42,.3);transition:transform .3s,box-shadow .3s}
#ilm-onboarding .steps.in .stp{opacity:1;animation:onb-rise .7s cubic-bezier(.2,.7,.2,1) backwards;animation-delay:calc(var(--i)*.28s + .15s)}
#ilm-onboarding .stp:hover{transform:translateY(-4px)}
#ilm-onboarding .stp:before{width:32px;height:32px;margin-bottom:8px;box-shadow:0 0 0 5px color-mix(in srgb,var(--ac) 18%,transparent)}
#ilm-onboarding .stp .si{position:absolute;right:14px;top:14px;font-size:1.3rem}
#ilm-onboarding .stp h4{font-size:.98rem}
#ilm-onboarding .stp p{font-size:.82rem;line-height:1.4}
#ilm-onboarding #faq .w{max-width:980px!important}
#ilm-onboarding #fq{display:grid;grid-template-columns:1fr 1fr;gap:8px 12px;align-items:start}
#ilm-onboarding details{margin:0;padding:10px 16px;border-radius:12px;transition:border-color .2s,box-shadow .3s}
#ilm-onboarding details:hover,#ilm-onboarding details[open]{border-color:var(--ac)}
#ilm-onboarding details[open]{box-shadow:0 14px 26px -16px color-mix(in srgb,var(--ac) 60%,transparent)}
#ilm-onboarding summary{list-style:none;display:flex;justify-content:space-between;align-items:center;gap:12px;font-size:.94rem}
#ilm-onboarding summary::-webkit-details-marker{display:none}
#ilm-onboarding summary:after{content:"+";flex:none;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--ac) 14%,transparent);color:var(--ac);font-weight:700;transition:transform .3s,background .3s}
#ilm-onboarding details[open] summary:after{transform:rotate(135deg);background:var(--ac);color:#fff}
#ilm-onboarding details p{margin-top:6px;font-size:.88rem;animation:onb-fade .35s ease}
@keyframes onb-fade{from{opacity:0;transform:translateY(-6px)}}
#ilm-onboarding .cta{position:relative;overflow:hidden;padding:28px 20px;border-radius:22px;background:linear-gradient(120deg,var(--or),#EA580C 38%,#15803D 75%,var(--gr));background-size:200% 200%;animation:onb-gm 10s ease infinite;box-shadow:0 26px 50px -22px rgba(234,88,12,.6)}
#ilm-onboarding .cta.rv.in{animation:onb-gm 10s ease infinite}
@keyframes onb-gm{50%{background-position:100% 50%}}
#ilm-onboarding .cta>*{position:relative;z-index:1}
#ilm-onboarding .cta .fx{position:absolute;z-index:0;border-radius:50%;background:rgba(255,255,255,.14);animation:onb-drift 9s ease-in-out infinite alternate}
#ilm-onboarding .cta .fx.a{width:180px;height:180px;left:-40px;bottom:-80px}
#ilm-onboarding .cta .fx.b{width:120px;height:120px;right:9%;top:-50px;animation-delay:-4s}
#ilm-onboarding .cta .fx.c{width:60px;height:60px;right:-12px;bottom:18px;animation-delay:-2s}
#ilm-onboarding .cta h2{font-size:clamp(1.4rem,3.2vw,2rem)}
#ilm-onboarding .cta p{margin:6px auto 14px}
#ilm-onboarding .cta .btn{margin:3px}
#ilm-onboarding .cta .btn:hover{transform:translateY(-2px);box-shadow:0 10px 20px rgba(0,0,0,.25)}
#ilm-onboarding footer{padding:16px 0 calc(16px + env(safe-area-inset-bottom,0));font-size:.84rem}
#ilm-onboarding footer img{height:34px!important;margin-bottom:6px!important}
#ilm-onboarding .chat:after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid var(--or);animation:onb-ping 2s infinite}
@keyframes onb-ping{to{transform:scale(1.6);opacity:0}}
@media(max-width:900px){#ilm-onboarding .steps:before,#ilm-onboarding .steps:after{display:none}
#ilm-onboarding .stp{opacity:1}}
@media(max-width:700px){#ilm-onboarding .fch{display:none}
#ilm-onboarding #fq{grid-template-columns:1fr}
#ilm-onboarding .hg .stats{grid-template-columns:repeat(2,1fr)}}
@media(prefers-reduced-motion:reduce){#ilm-onboarding .stp,#ilm-onboarding .steps .stp{opacity:1}
#ilm-onboarding .st .bar:after,#ilm-onboarding .steps:after{transform:none}
#ilm-onboarding .mv .ln{stroke-dashoffset:0}
#ilm-onboarding .mv .ar{opacity:1}
#ilm-onboarding .rg .fg{stroke-dasharray:100 100}
#ilm-onboarding .bz rect{transform:none}
#ilm-onboarding .sh h2:after{transform:none}}
#ilm-onboarding{--ag:var(--or);--sh:0 4px 20px rgba(15,23,42,.06);--grid:#E8ECF1}
#ilm-onboarding[data-theme=dark]{--grid:#1B2438}
#ilm-onboarding[data-role=corporate]{--ac:var(--or)}
#ilm-onboarding{background-color:var(--bg2);background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:34px 34px;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
#ilm-onboarding section.alt,#ilm-onboarding footer{background:transparent}
#ilm-onboarding footer{background:var(--bg)}
#ilm-onboarding *{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
#ilm-onboarding nav{background:#1f1f1f;box-shadow:none}
#ilm-onboarding .bgfx,#ilm-onboarding .hfw:before,#ilm-onboarding .hg #hf:after,#ilm-onboarding .card:before,#ilm-onboarding .btn.p:after,#ilm-onboarding .chat:after,#ilm-onboarding .cta .fx{display:none!important}
#ilm-onboarding .hfw{transform:none!important;transform-style:flat;transition:none}
#ilm-onboarding h1 .o{background:none;color:var(--or);-webkit-text-fill-color:var(--or);animation:none}
#ilm-onboarding h1 .g{background:none;color:var(--tx);-webkit-text-fill-color:var(--tx);animation:none}
#ilm-onboarding .eb{background:color-mix(in srgb,var(--or) 12%,var(--bg));border:0;color:var(--or)}
#ilm-onboarding .eb:before{background:var(--or)}
#ilm-onboarding .btn.p{box-shadow:0 6px 16px -6px rgba(249,115,22,.55)}
#ilm-onboarding .hg #hf,#ilm-onboarding .show .frame{border:1px solid var(--bd);box-shadow:0 10px 30px rgba(15,23,42,.08)}
#ilm-onboarding .fch{background:var(--bg);animation:none;box-shadow:0 8px 22px rgba(15,23,42,.12)}
#ilm-onboarding .st,#ilm-onboarding .card,#ilm-onboarding .stp,#ilm-onboarding details{background:var(--bg);box-shadow:var(--sh)}
#ilm-onboarding .st{background:var(--bg)}
#ilm-onboarding .card .ic{background:color-mix(in srgb,var(--or) 12%,var(--bg));box-shadow:none;animation:none;color:var(--or)}
#ilm-onboarding .card:hover,#ilm-onboarding .card.rv.in:hover{box-shadow:0 12px 28px -12px rgba(249,115,22,.35)}
#ilm-onboarding .sh h2:after,#ilm-onboarding .st .bar:after,#ilm-onboarding #sp,#ilm-onboarding .steps:after{background:var(--or);box-shadow:none}
#ilm-onboarding .stp:before{box-shadow:none}
#ilm-onboarding .cta{background:var(--or);animation:none;box-shadow:0 20px 40px -24px rgba(249,115,22,.6)}
#ilm-onboarding .cta.rv.in{animation:onb-rise .7s cubic-bezier(.2,.7,.2,1) backwards}
#ilm-onboarding .tabs button[aria-selected=true],#ilm-onboarding .cd button[aria-current=true]{box-shadow:none}
#ilm-onboarding .chat{box-shadow:0 8px 20px rgba(249,115,22,.4)}
#ilm-onboarding{--mu:#475569;--btn:#1E293B}
#ilm-onboarding[data-theme=dark]{--mu:#94A3B8;--btn:#F97316}
#ilm-onboarding h1,#ilm-onboarding h2,#ilm-onboarding h3,#ilm-onboarding h4,#ilm-onboarding summary,#ilm-onboarding .st b{color:var(--tx);opacity:1}
#ilm-onboarding .sh h2{color:var(--tx);font-weight:700}
#ilm-onboarding .sh p,#ilm-onboarding .card p,#ilm-onboarding .stp p,#ilm-onboarding details p,#ilm-onboarding .st span,#ilm-onboarding .hero p.lead{color:var(--mu)}
#ilm-onboarding .rv{opacity:1;transform:none}
#ilm-onboarding .rv.in{animation-name:onb-rise}
@keyframes onb-rise{from{transform:translateY(16px)}}
@keyframes onb-riseo{from{opacity:0;transform:translateY(16px)}}
#ilm-onboarding .steps.in .stp{animation-name:onb-riseo}
#ilm-onboarding .btn.p{background:var(--btn);border-color:var(--btn);box-shadow:0 6px 14px -6px rgba(15,23,42,.4)}
#ilm-onboarding nav .btn.p{background:#F97316;border-color:#F97316;box-shadow:none}
#ilm-onboarding .card,#ilm-onboarding .st,#ilm-onboarding .stp,#ilm-onboarding details{border-color:#E2E8F0}
#ilm-onboarding .cta{display:grid;grid-template-columns:230px 1fr auto;align-items:center;gap:0 28px;padding:0 28px 0 0;text-align:left;background:var(--bg);color:var(--tx);border:1px solid #FCE3D0;border-radius:24px;box-shadow:0 10px 30px rgba(15,23,42,.08);min-height:150px}
#ilm-onboarding .cta:before{content:"";grid-row:1/3;grid-column:1;align-self:stretch;background:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 200'><rect width='240' height='200' fill='%23FDB515'/><circle cx='190' cy='40' r='60' fill='%23FFC93C'/><rect x='52' y='120' width='28' height='44' rx='6' fill='%23fff'/><rect x='92' y='96' width='28' height='68' rx='6' fill='%23fff'/><rect x='132' y='66' width='28' height='98' rx='6' fill='%23fff'/><path d='M120 28 62 54l58 26 58-26z' fill='%231E293B'/><path d='M88 68v20c0 8 14 14 32 14s32-6 32-14V68l-32 14z' fill='%231E293B'/><path d='M178 54v30' stroke='%231E293B' stroke-width='4' stroke-linecap='round'/></svg>") center/cover}
#ilm-onboarding .cta h2{grid-column:2;color:var(--tx);font-size:1.3rem;margin:0;align-self:end}
#ilm-onboarding .cta{grid-template-columns:150px 1fr!important;grid-template-rows:auto auto auto auto!important;align-content:center!important;align-items:start!important;padding:0 28px 0 0!important;gap:0 28px!important;min-height:0!important;background:linear-gradient(120deg,var(--bg) 55%,color-mix(in srgb,var(--or) 7%,var(--bg)))!important}
#ilm-onboarding .cta:before{grid-column:1!important;grid-row:1/5!important;background-size:cover!important;background-position:center!important}
#ilm-onboarding .cta .ceb{grid-column:2!important;grid-row:1!important;justify-self:start!important;font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--or);background:color-mix(in srgb,var(--or) 12%,transparent);padding:3px 10px;border-radius:999px;margin:16px 0 6px}
#ilm-onboarding .cta h2#ct{grid-column:2!important;grid-row:2!important;margin:0 0 6px!important;text-align:left!important;color:var(--tx)!important}
#ilm-onboarding .cta p#cp{grid-column:2!important;grid-row:3!important;font-size:.92rem!important;line-height:1.55!important;max-width:1000px!important;width:100%!important;margin:0 0 10px!important;text-align:left!important;color:var(--mu)!important;opacity:1!important}
#ilm-onboarding .cta .cch{grid-column:2;grid-row:4;display:flex;flex-wrap:wrap;gap:6px;margin:0 0 16px}
#ilm-onboarding .cta .cch span{display:inline-flex;align-items:center;gap:6px;font-size:.72rem;font-weight:600;color:var(--tx);background:var(--bg2);border:1px solid var(--bd);padding:3px 10px;border-radius:999px;line-height:1.3}
#ilm-onboarding .cta .cch span:before{content:"";width:5px;height:5px;border-radius:50%;background:var(--or)}
#ilm-onboarding .cta .cch span:nth-child(even):before{background:var(--gr)}
@media(max-width:900px){#ilm-onboarding .cta{grid-template-columns:1fr!important;padding:0 18px 18px!important;gap:0!important}
#ilm-onboarding .cta:before{grid-column:1!important;grid-row:1!important;height:90px;margin:0 -18px 12px}
#ilm-onboarding .cta .ceb{margin-top:0}
#ilm-onboarding .cta .ceb,#ilm-onboarding .cta h2#ct,#ilm-onboarding .cta p#cp,#ilm-onboarding .cta .cch{grid-column:1!important;grid-row:auto!important}
#ilm-onboarding .cta .cch{margin-bottom:0}}
#ilm-onboarding .sh h2,#ilm-onboarding .cta h2#ct,#ilm-onboarding .hg h1{font-size:clamp(1.5rem,3vw,2.1rem)!important;font-weight:700!important;letter-spacing:-.8px!important;line-height:1.2!important}
@media(max-width:600px){#ilm-onboarding .sh h2,#ilm-onboarding .cta h2#ct,#ilm-onboarding .hg h1{font-size:clamp(1.4rem,6vw,1.8rem)!important}}
#ilm-onboarding .cb{grid-column:3;grid-row:1/3;display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}
#ilm-onboarding .cta .btn{margin:0;background:var(--bg);color:var(--tx);border:1px solid #CBD5E1;box-shadow:none}
#ilm-onboarding .cta .btn.d{background:var(--btn);border-color:var(--btn);color:#fff}
#ilm-onboarding .cta .btn:hover{box-shadow:0 8px 18px rgba(15,23,42,.15)}
#ilm-onboarding .cta.rv.in{animation:onb-riseo .7s cubic-bezier(.2,.7,.2,1) backwards}
@media(max-width:900px){#ilm-onboarding .cta{grid-template-columns:1fr;padding:0 20px 20px;gap:6px}
#ilm-onboarding .cta:before{grid-row:auto;grid-column:1;height:120px;margin:0 -20px 10px}
#ilm-onboarding .cta h2,#ilm-onboarding .cta p,#ilm-onboarding .cb{grid-column:1;grid-row:auto}
#ilm-onboarding .cb{justify-content:flex-start;margin-top:8px}}
#ilm-onboarding .sh.in,#ilm-onboarding .steps.in,#ilm-onboarding .hero .in{background:none;border:0;border-radius:0;padding:0;min-width:0;color:inherit;font-size:inherit}
#ilm-onboarding #pg{grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px}
#ilm-onboarding .card:not(.bn){display:grid;grid-template-columns:34px 1fr;column-gap:10px;align-content:start;padding:12px 14px;border-radius:14px}
#ilm-onboarding .card:not(.bn) .ic{width:34px;height:34px;font-size:1rem;margin:0;border-radius:10px}
#ilm-onboarding .card:not(.bn) h3{align-self:center;font-size:.95rem;line-height:1.25;margin:0;padding-right:44px}
#ilm-onboarding .card:not(.bn) p,#ilm-onboarding .card:not(.bn) ul{grid-column:1/-1}
#ilm-onboarding .card:not(.bn) p{font-size:.82rem;line-height:1.4;margin:8px 0 0}
#ilm-onboarding .card:not(.bn) ul{list-style:none;padding:0;margin:8px 0 0;font-size:.78rem;line-height:1.4;display:grid;gap:3px}
#ilm-onboarding .card:not(.bn) li{position:relative;padding-left:16px;color:var(--mu)}
#ilm-onboarding .card:not(.bn) li:before{content:"✓";position:absolute;left:0;color:var(--or);font-weight:700}
#ilm-onboarding .card:not(.bn) .mv{display:none}
#ilm-onboarding .card .tg{top:12px;right:12px}
#ilm-onboarding .card .tg .chip{font-size:.66rem;padding:2px 8px}
#ilm-onboarding .bn{padding:12px 14px}
#ilm-onboarding .bn .top{margin-bottom:6px}
#ilm-onboarding .bn .ic{width:34px;height:34px}
#ilm-onboarding .bn .rg{width:36px;height:36px}
#ilm-onboarding .bn .top .mv{width:80px}
#ilm-onboarding .bn h3{font-size:.95rem}
#ilm-onboarding .bn p{font-size:.82rem;margin-top:3px}
#ilm-onboarding a.card{cursor:pointer;color:inherit;text-decoration:none}
#ilm-onboarding a.card:focus-visible{outline:2px solid var(--or);outline-offset:2px}
#ilm-onboarding{-webkit-text-size-adjust:100%;text-size-adjust:100%}
#ilm-onboarding{overflow-x:clip;-webkit-tap-highlight-color:transparent}
#ilm-onboarding img{max-width:100%}
#ilm-onboarding .w{padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
#ilm-onboarding #hf{touch-action:pan-y}
#ilm-onboarding .card:not(.bn) h3{padding-right:60px}
#ilm-onboarding #mb,#ilm-onboarding .mm,#ilm-onboarding .mm a.mgs{display:none}
@media(min-width:1600px){#ilm-onboarding .w,#ilm-onboarding nav .w{max-width:1380px}
#ilm-onboarding .hfw,#ilm-onboarding .hg .stats{max-width:1240px}}
@media(min-width:1920px){#ilm-onboarding{font-size:112.5%}
#ilm-onboarding{font-size:1rem}
#ilm-onboarding .w,#ilm-onboarding nav .w{max-width:1560px}
#ilm-onboarding .hfw,#ilm-onboarding .hg .stats{max-width:1400px}}
@media(min-width:2560px){#ilm-onboarding{font-size:125%}
#ilm-onboarding .w,#ilm-onboarding nav .w{max-width:1760px}
#ilm-onboarding .hfw,#ilm-onboarding .hg .stats{max-width:1560px}}
@media(max-width:1180px){#ilm-onboarding .nl{gap:22px}
#ilm-onboarding nav .w{gap:14px}}
@media(max-width:1024px){#ilm-onboarding .nl{display:none}
#ilm-onboarding #th{margin-left:auto}
#ilm-onboarding #mb{display:inline-flex}
#ilm-onboarding .mm{position:absolute;left:0;right:0;top:100%;flex-direction:column;gap:2px;padding:10px max(20px,env(safe-area-inset-left,0px)) 16px;background:#1f1f1f;border-top:1px solid #3a3a3a;box-shadow:0 18px 30px -12px rgba(0,0,0,.5);max-height:calc(100vh - 70px);max-height:calc(100dvh - 70px);overflow:auto}
#ilm-onboarding .mm.open{display:flex}
#ilm-onboarding .mm a{color:#fff;padding:13px 6px;font-weight:600;border-bottom:1px solid #2f2f2f}
#ilm-onboarding .mm a:last-child{border-bottom:0}
#ilm-onboarding .hero{padding:14px 0 6px}
#ilm-onboarding .cta{grid-template-columns:1fr;padding:0 20px 20px;gap:6px}
#ilm-onboarding .cta:before{grid-row:auto;grid-column:1;height:120px;margin:0 -20px 10px}
#ilm-onboarding .cta h2,#ilm-onboarding .cta p,#ilm-onboarding .cb{grid-column:1;grid-row:auto}
#ilm-onboarding .cb{justify-content:flex-start;margin-top:8px}}
@media(max-width:900px){#ilm-onboarding .hg h1{letter-spacing:-1px}
#ilm-onboarding .fch{padding:6px 10px;font-size:.72rem}
#ilm-onboarding .fch.a{left:6px}
#ilm-onboarding .fch.b{right:6px}
#ilm-onboarding .tb{gap:6px}}
@media(max-width:700px){#ilm-onboarding section{padding:20px 0}
#ilm-onboarding .hg h1{font-size:clamp(1.9rem,8.4vw,2.6rem);letter-spacing:-1px}
#ilm-onboarding .hero p.lead{font-size:.98rem}
#ilm-onboarding .cta-row{flex-direction:column;align-items:stretch;width:100%;gap:10px}
#ilm-onboarding .seg{display:flex;width:100%}
#ilm-onboarding .seg button{flex:1;padding:12px 10px}
#ilm-onboarding .cta-row>.btn.p{justify-content:center;width:100%}
#ilm-onboarding .st{padding:10px 12px}
#ilm-onboarding .hfw{margin-top:12px}
#ilm-onboarding .fb small{min-width:0;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#ilm-onboarding .cd{gap:5px;padding:8px}
#ilm-onboarding .cd button{padding:5px 11px;font-size:.76rem}
#ilm-onboarding .tabs button{padding:7px 12px;font-size:.84rem}
#ilm-onboarding .cap{padding:10px 12px;font-size:.78rem}
#ilm-onboarding .sh h2{font-size:clamp(1.4rem,6vw,1.8rem)}
#ilm-onboarding .sh p{font-size:.9rem}
#ilm-onboarding details{padding:10px 14px}
#ilm-onboarding summary{font-size:.9rem}
#ilm-onboarding .cb{width:100%}
#ilm-onboarding .cb .btn{flex:1 1 140px;justify-content:center}
#ilm-onboarding footer .w{flex-direction:column;gap:12px}
#ilm-onboarding footer a{display:inline-block;margin:0 14px 6px 0}
#ilm-onboarding .chat{width:52px;height:52px;font-size:1.3rem;right:max(14px,env(safe-area-inset-right,0px));bottom:calc(14px + env(safe-area-inset-bottom,0px))}}
@media(max-width:480px){#ilm-onboarding nav .w{height:54px;gap:8px}
#ilm-onboarding .logo{font-size:1.3rem}
#ilm-onboarding nav .btn.p{padding:9px 14px;font-size:.84rem;border-radius:12px}
#ilm-onboarding .ib{width:38px;height:38px}
#ilm-onboarding .hg .stats{gap:8px}
#ilm-onboarding .st b{font-size:1.2rem}
#ilm-onboarding .st span{font-size:.74rem}
#ilm-onboarding .card{padding:14px}
#ilm-onboarding .cta h2{font-size:1.15rem}}
@media(max-width:380px){#ilm-onboarding nav>.w>.btn.p{display:none}
#ilm-onboarding .mm a.mgs{display:block;margin-top:10px;background:#F97316;border-radius:12px;text-align:center;border-bottom:0}
#ilm-onboarding .hg h1{font-size:1.75rem}
#ilm-onboarding .seg button{font-size:.88rem;padding:11px 6px}
#ilm-onboarding .tabs button{padding:6px 10px;font-size:.8rem}
#ilm-onboarding .st b{font-size:1.1rem}}
@media(max-height:500px) and (orientation:landscape){#ilm-onboarding nav{position:static}
#ilm-onboarding .hero{padding-top:10px}
#ilm-onboarding section{padding:18px 0}}
@media(hover:none){#ilm-onboarding .card:hover,#ilm-onboarding .card.rv.in:hover,#ilm-onboarding .st:hover,#ilm-onboarding .stp:hover,#ilm-onboarding .btn:hover{transform:none}}
@media(pointer:coarse){#ilm-onboarding .btn,#ilm-onboarding .seg button,#ilm-onboarding .tabs button,#ilm-onboarding summary{min-height:44px}
#ilm-onboarding .cd button{min-height:40px}}
#ilm-onboarding .welcome-hero{margin:0 0 20px;padding:22px 20px 18px;text-align:center;background:linear-gradient(135deg,rgba(249,115,22,.055),rgba(255,255,255,.92) 48%,rgba(22,163,74,.055));border:1px solid var(--bd);border-radius:18px}
#ilm-onboarding .welcome-hero .welcome-time{display:flex;align-items:center;justify-content:center;gap:8px;color:var(--mu);font-size:13px;font-weight:600;margin-bottom:5px}
#ilm-onboarding .welcome-hero .welcome-title{font-family:Georgia,"Times New Roman",serif;font-size:clamp(21px,3vw,27px);font-weight:700;line-height:1.25;color:var(--tx)}
#ilm-onboarding .welcome-hero .welcome-name{background:linear-gradient(90deg,#F97316,#E56B55);-webkit-background-clip:text;background-clip:text;color:transparent}
#ilm-onboarding .welcome-hero .welcome-subtitle{font-size:13px;color:var(--mu);margin-top:5px}
@media(max-width:560px){#ilm-onboarding .welcome-hero{padding:18px 12px;margin-bottom:14px}
#ilm-onboarding .welcome-hero .welcome-subtitle{font-size:12px}}
#ilm-onboarding{position:relative;isolation:isolate;overflow-x:clip}
#ilm-onboarding > nav,#ilm-onboarding > .chat,#ilm-onboarding > footer{display:none !important}
#ilm-onboarding section,#ilm-onboarding header,#ilm-onboarding #tools{scroll-margin-top:76px}
#ilm-onboarding #tools{display:block;height:0}
#ilm-onboarding .choose{display:flex;flex-direction:column;align-items:center;gap:6px}
#ilm-onboarding .cx{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mu)}
#ilm-onboarding .pgh{grid-column:1/-1;display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-top:14px;padding-bottom:8px;border-bottom:1px solid var(--bd)}
#ilm-onboarding .pgh:first-child{margin-top:0}
#ilm-onboarding .pgh h3{font-size:1.05rem;color:var(--tx)}
#ilm-onboarding .pgh span{font-size:.82rem;color:var(--mu)}
#ilm-onboarding .sh .eb{margin-bottom:10px}
@media(max-width:700px){#ilm-onboarding .choose{width:100%}}
#ilm-onboarding #pg{display:block}
#ilm-onboarding #products .sh{margin-bottom:22px}
#ilm-onboarding #products .sh .eb{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;font-size:.95rem;font-weight:700;margin-bottom:14px}
#ilm-onboarding #products .sh .eb:before{display:none}
#ilm-onboarding #products .sh .eb .ui-ico{width:18px;height:18px}
#ilm-onboarding #pt{font-size:clamp(1.9rem,3.8vw,2.7rem)!important;line-height:1.15!important}
#ilm-onboarding #pt .o2{color:var(--or)}
#ilm-onboarding #products .sh h2:after{display:none}
#ilm-onboarding #products .sh p{font-size:1.05rem;max-width:620px}
#ilm-onboarding .pgr{margin-bottom:26px}
#ilm-onboarding .pgh{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin:0 0 14px;padding-bottom:10px;border-bottom:1px solid var(--bd)}
#ilm-onboarding .pgh h3{font-size:1.3rem;font-weight:700;color:var(--tx)}
#ilm-onboarding .pgh h3:before{content:"";display:inline-block;width:4px;height:22px;background:var(--or);border-radius:3px;margin-right:10px;vertical-align:-4px}
#ilm-onboarding .pgh span{font-size:1rem;color:var(--mu)}
#ilm-onboarding .pgd{display:grid;gap:18px}
#ilm-onboarding .pgd.c3{grid-template-columns:repeat(3,1fr)}
#ilm-onboarding .pgd.c2{grid-template-columns:repeat(2,1fr)}
#ilm-onboarding .card.pc{display:grid;grid-template-columns:56px 1fr;column-gap:16px;align-content:start;align-items:start;padding:18px 20px;border-radius:16px;min-height:112px}
#ilm-onboarding .card.pc .ic{grid-row:1/3;width:56px;height:56px;margin:0;border-radius:14px;background:color-mix(in srgb,var(--or) 12%,var(--bg))}
#ilm-onboarding .card.pc .ic .ui-ico{width:28px;height:28px}
#ilm-onboarding .card.pc h3{grid-column:2;align-self:center;font-size:1.15rem;font-weight:700;line-height:1.25;margin:0;padding-right:64px}
#ilm-onboarding .card.pc p{grid-column:2;grid-row:2;font-size:.95rem;line-height:1.5;margin:6px 0 0;color:var(--mu)}
#ilm-onboarding .card.pc .tg{top:16px;right:16px}
#ilm-onboarding .card.pc .chip{font-size:.74rem;padding:3px 10px}
#ilm-onboarding .card.pc .chip:before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:currentColor;margin-right:6px;vertical-align:1px}
@media(max-width:900px){#ilm-onboarding .pgd.c3,#ilm-onboarding .pgd.c2{grid-template-columns:1fr}}
@media(max-width:480px){#ilm-onboarding .card.pc{grid-template-columns:44px 1fr;column-gap:12px;padding:14px}
#ilm-onboarding .card.pc .ic{width:44px;height:44px}
#ilm-onboarding .card.pc .ic .ui-ico{width:22px;height:22px}
#ilm-onboarding #pt{font-size:1.6rem!important}}
#ilm-onboarding .hg h1{font-size:clamp(1.5rem,2.6vw,2.1rem)!important;line-height:1.2!important;letter-spacing:-.6px!important;font-weight:700!important}
@media(max-width:700px){#ilm-onboarding .hg h1{font-size:clamp(1.35rem,6vw,1.7rem)!important}}
#ilm-onboarding .hg h1,#ilm-onboarding .sh h2,#ilm-onboarding #pt,#ilm-onboarding .cta h2#ct{font-size:clamp(1.5rem,2.6vw,2rem)!important;line-height:1.2!important;letter-spacing:-.6px!important;font-weight:700!important}
#ilm-onboarding .hero p.lead,#ilm-onboarding .sh p,#ilm-onboarding #products .sh p,#ilm-onboarding .cta p#cp{font-size:1rem!important;line-height:1.55!important;font-weight:400!important}
@media(max-width:700px){#ilm-onboarding .hg h1,#ilm-onboarding .sh h2,#ilm-onboarding #pt,#ilm-onboarding .cta h2#ct{font-size:clamp(1.35rem,6vw,1.6rem)!important}
#ilm-onboarding .hero p.lead,#ilm-onboarding .sh p,#ilm-onboarding #products .sh p,#ilm-onboarding .cta p#cp{font-size:.92rem!important}}


#ilm-onboarding .hero2{padding:34px 0 28px;position:relative}
#ilm-onboarding .h2g{display:grid;grid-template-columns:1fr 1fr;align-items:center;position:relative}
#ilm-onboarding .h2g:before{content:"";position:absolute;left:50%;top:4%;bottom:4%;width:1px;background:var(--bd)}
#ilm-onboarding .h2l{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 44px 0 8px}
#ilm-onboarding .h2r{text-align:center;padding:0 8px 0 44px}
#ilm-onboarding .gpill{display:inline-flex;align-items:center;gap:10px;padding:8px 18px;border-radius:999px;border:1px solid var(--bd);background:var(--bg);font-weight:700;font-size:1rem;margin-bottom:12px;box-shadow:var(--sh)}
#ilm-onboarding .gpill b{color:var(--or)}
#ilm-onboarding .hero2 .eb{border:1px solid color-mix(in srgb,var(--or) 45%,transparent);background:color-mix(in srgb,var(--or) 8%,transparent);padding:7px 18px;font-size:.9rem;margin-bottom:12px}
#ilm-onboarding .hero2 .eb:before{display:none}
#ilm-onboarding .hero2 h1{font-size:clamp(2rem,3.8vw,3rem)!important;line-height:1.1!important;letter-spacing:-1px!important;font-weight:700!important}
#ilm-onboarding .hero2 p.lead{font-size:1.05rem!important;max-width:520px;margin:14px auto 18px}
#ilm-onboarding .hero2 .seg{width:100%;max-width:500px;padding:6px;border-radius:18px}
#ilm-onboarding .hero2 .seg button{flex:1;padding:14px 10px;border-radius:14px;font-size:1.05rem}
#ilm-onboarding .hero2 .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;width:100%;max-width:640px;margin-top:16px;background:var(--bg2);border:1px solid var(--bd);border-radius:18px;padding:10px 0}
#ilm-onboarding .hero2 .st{background:none;border:0;border-radius:0;box-shadow:none;text-align:center;padding:6px 8px;border-right:1px solid var(--bd)}
#ilm-onboarding .hero2 .st:last-child{border-right:0}
#ilm-onboarding .hero2 .st .bar{display:none}
#ilm-onboarding .hero2 .st b{font-size:1.5rem}
#ilm-onboarding .hero2 .hfw{display:none}
#ilm-onboarding .h2r h2{font-size:clamp(1.6rem,2.8vw,2.2rem);font-weight:700;letter-spacing:-.6px;color:var(--tx)}
#ilm-onboarding .h2r>p{color:var(--mu);margin-top:6px}
#ilm-onboarding .xg{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px}
#ilm-onboarding .xc{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:22px 10px 18px;border-radius:16px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);cursor:pointer;font-family:inherit;transition:transform .2s,border-color .2s,box-shadow .2s}
#ilm-onboarding .xc:hover{transform:translateY(-3px);border-color:var(--c);box-shadow:0 12px 24px -14px var(--c)}
#ilm-onboarding .xc .xi{width:54px;height:54px;border-radius:14px;display:grid;place-items:center;font-size:1.6rem;color:var(--c);background:color-mix(in srgb,var(--c) 16%,transparent);margin-bottom:6px}
#ilm-onboarding .xc strong{font-size:1rem;font-family:"Space Grotesk",system-ui,sans-serif}
#ilm-onboarding .xc small{font-size:.85rem;color:var(--mu)}
#ilm-onboarding .xc.soon{opacity:.6;cursor:not-allowed}
#ilm-onboarding .xc.soon:hover{transform:none;border-color:var(--bd);box-shadow:none}
#ilm-onboarding .xb{position:absolute;top:-8px;right:-6px;background:var(--or);color:#fff;font-size:.62rem;font-weight:800;letter-spacing:.06em;padding:3px 9px;border-radius:999px}
@media(max-width:900px){#ilm-onboarding .h2g{grid-template-columns:1fr;gap:28px}
#ilm-onboarding .h2g:before{display:none}
#ilm-onboarding .h2l,#ilm-onboarding .h2r{padding:0}}
@media(max-width:520px){#ilm-onboarding .xg{grid-template-columns:repeat(2,1fr)}
#ilm-onboarding .hero2 h1{font-size:clamp(1.8rem,8vw,2.4rem)!important}}
/* ── compact + clean overrides (no tint, smaller headings) ── */
#ilm-onboarding header.hero2{background:none!important;padding:16px 0 10px}
#ilm-onboarding header.hero2 .bgfx{display:none!important}
#ilm-onboarding section{padding:20px 0}
#ilm-onboarding section .sh{margin-bottom:12px}
#ilm-onboarding section .sh h2,#ilm-onboarding #pt,#ilm-onboarding .cta h2#ct{font-size:clamp(1.25rem,2.1vw,1.6rem)!important;line-height:1.2!important;letter-spacing:-.4px!important}
#ilm-onboarding section .sh p,#ilm-onboarding #products .sh p,#ilm-onboarding .cta p#cp{font-size:.88rem!important;line-height:1.45!important;margin-top:4px!important;max-width:560px}
#ilm-onboarding section .sh .eb,#ilm-onboarding #products .sh .eb{font-size:.78rem!important;padding:4px 12px!important;margin-bottom:6px!important}
#ilm-onboarding header.hero2 h1{font-size:clamp(1.7rem,3vw,2.4rem)!important;line-height:1.1!important;letter-spacing:-1px!important}
#ilm-onboarding header.hero2 p.lead{font-size:.92rem!important;margin:8px auto 12px!important}
#ilm-onboarding .gpill{padding:6px 14px!important;font-size:.9rem!important;margin-bottom:8px!important}
#ilm-onboarding .hero2 .seg button{padding:10px!important;font-size:.95rem!important}
#ilm-onboarding .hero2 .stats{margin-top:10px!important;padding:6px 0!important}
#ilm-onboarding .hero2 .st b{font-size:1.25rem!important}
#ilm-onboarding .h2r h2{font-size:clamp(1.25rem,2.1vw,1.6rem)!important}
#ilm-onboarding .h2r>p{font-size:.88rem!important;margin-top:4px!important}
#ilm-onboarding .xg{gap:10px!important;margin-top:12px!important}
#ilm-onboarding .xc{padding:14px 8px 12px!important;gap:4px!important}
#ilm-onboarding .xc .xi{width:44px!important;height:44px!important;font-size:1.3rem!important;margin-bottom:2px!important}
#ilm-onboarding .xc strong{font-size:.92rem!important}
#ilm-onboarding .xc small{font-size:.78rem!important}
#ilm-onboarding .pgh h3{font-size:1.05rem!important}
#ilm-onboarding .pgh span{font-size:.85rem!important}
#ilm-onboarding .pgr{margin-bottom:14px}
#ilm-onboarding .pgd{gap:12px}
#ilm-onboarding .card.pc{padding:12px 14px!important;min-height:0!important}
#ilm-onboarding .card.pc h3{font-size:1rem!important}
#ilm-onboarding .card.pc p{font-size:.85rem!important}
#ilm-onboarding .hub-p[data-p]{animation:none!important}

/* 5-way hero selector: LMS / Product / Corporate / Educate Tech / SIS */
#ilm-onboarding header.hero2 .seg{grid-template-columns:repeat(5,minmax(0,1fr))!important;max-width:640px!important;width:100%}
#ilm-onboarding header.hero2 .seg button{padding:10px 6px!important;font-size:.88rem!important;white-space:nowrap}
@media(max-width:700px){#ilm-onboarding header.hero2 .seg{grid-template-columns:repeat(3,minmax(0,1fr))!important}}
#ilm-onboarding[data-role=edutech] #features .tabs:before{content:"Educate Tech"}
#ilm-onboarding[data-role=sis] #features .tabs:before{content:"SIS"}

/* left column top par align, extra gap hatao */
#ilm-onboarding .h2g{align-items:start!important}
#ilm-onboarding .h2l{justify-content:flex-start!important;padding-top:0!important}
#ilm-onboarding header.hero2{padding-top:8px!important}
#ilm-onboarding .h2r h2{margin-top:0!important}
#ilm-onboarding .gpill{margin-top:4px!important}

/* who-is-it-for roadmap card (left column, below stats) */
#ilm-onboarding .who{width:100%;max-width:640px;margin-top:14px;padding:12px 16px;text-align:left;background:var(--bg);border:1px solid var(--bd);border-radius:16px;box-shadow:var(--sh)}
#ilm-onboarding .whot{font-family:"Space Grotesk",system-ui,sans-serif;font-weight:700;font-size:.88rem;color:var(--tx);margin-bottom:8px}
#ilm-onboarding .whol{position:relative;display:grid;gap:8px}
#ilm-onboarding .whol:before{content:"";position:absolute;left:11px;top:12px;bottom:12px;width:2px;background:repeating-linear-gradient(180deg,var(--bd) 0 5px,transparent 5px 9px)}
#ilm-onboarding .whos{position:relative;display:flex;gap:10px;align-items:flex-start}
#ilm-onboarding .whon{flex:none;z-index:1;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--or);color:#fff;font-size:.72rem;font-weight:800}
#ilm-onboarding .whos b{display:block;font-size:.82rem;line-height:1.25;color:var(--tx)}
#ilm-onboarding .whos small{display:block;font-size:.74rem;line-height:1.3;color:var(--mu)}
`;




const HTML = `
<nav><div class="w"><a class="logo" href="#top"><b>ILM</b> <i>ORA</i></a>
<div class="nl"><a href="https://ilmora.texora.ai/all-courses">All Courses</a><a href="#features">ILM ORA Feature</a><a href="#products">Product</a><a href="https://ilmora.texora.ai/workshops">Workshops</a><a href="https://ilmora.texora.ai/career">Career Tracks</a></div>
<button class="btn ib" id="th" aria-label="Toggle theme"><svg class="ui-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg></button><a class="btn p" href="https://ilmora.texora.ai/login"><svg class="ui-ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/></svg> Get Started</a><button class="btn ib" id="mb" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mm"><svg class="ui-ico menu-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button></div><div id="sp"></div><div class="mm" id="mm"><a href="https://ilmora.texora.ai/all-courses">All Courses</a><a href="#products">ILM ORA Feature</a><a href="#features">Product</a><a href="https://ilmora.texora.ai/workshops">Workshops</a><a href="https://ilmora.texora.ai/career">Career Tracks</a><a class="mgs" href="https://ilmora.texora.ai/login"><svg class="ui-ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/></svg> Get Started</a></div></nav>

<header class="hero hero2" id="top"><div class="w">
<div class="h2g">
<div class="h2l">
<div class="gpill" id="gp"></div>
<h1 id="h1t"><span class="o">Learn, teach</span> <span class="g">and manage.</span></h1>
<p class="lead" id="lead"></p>
<div class="seg" role="group" aria-label="Choose experience"><button data-r="individual" aria-pressed="true">LMS</button><button data-r="product" aria-pressed="false">Product</button><button data-r="corporate" aria-pressed="false">Corporate</button><button data-r="edutech" aria-pressed="false">Educate Tech</button><button data-r="sis" aria-pressed="false">SIS</button></div>
<div class="stats"><div class="st rv" style="--i:0"><b data-n="500" data-d="0" data-s="+">500+</b><span>Early Learners</span><i class="bar" style="--w:85%"></i></div><div class="st rv" style="--i:1"><b data-n="15" data-d="0" data-s="+">15+</b><span>Expert Mentors</span><i class="bar" style="--w:55%"></i></div><div class="st rv" style="--i:2"><b data-n="20" data-d="0" data-s="+">20+</b><span>Courses Live</span><i class="bar" style="--w:65%"></i></div><div class="st rv" style="--i:3"><b data-n="4.9" data-d="1" data-s="★">4.9★</b><span>Average Rating</span><i class="bar" style="--w:98%"></i></div></div>
<div class="who" id="who"></div>
</div>
<div class="h2r"><h2>Choose Your <span>Experience</span></h2><p>Pick a module to open your dashboard.</p><div class="xg" id="xg"></div></div>
</div>
<div class="hfw"><div class="frame" id="hf"></div></div>
</div></header>

<span id="tools"></span><section id="products"><div class="w"><div class="sh rv"><span class="eb"><svg class="ui-ico" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg> Products</span><h2 id="pt"></h2><p id="pp"></p></div><div class="g3" id="pg"></div></div></section>

<section class="alt" id="features"><div class="w"><div class="sh rv"><span class="eb">Live Demo</span><h2>Every feature, mapped to a real module</h2><p>Pick a portal, then click any tab in its sidebar. Every module opens a working, populated screen so you can feel the real product.</p><div class="seg" role="group" aria-label="Demo experience"><button data-r="individual" aria-pressed="true">LMS</button><button data-r="product" aria-pressed="false">Product</button><button data-r="corporate" aria-pressed="false">Corporate</button><button data-r="edutech" aria-pressed="false">Educate Tech</button><button data-r="sis" aria-pressed="false">SIS</button></div></div>
<div class="tabs" id="tabs" role="tablist"></div><div class="show"><div class="frame rv" id="pv"></div></div></div></section>

<section id="how"><div class="w"><div class="sh rv"><span class="eb">How it works</span><h2>How it works</h2><p id="hp"></p></div><div class="steps rv" id="st"></div></div></section>

<section class="alt" id="why"><div class="w"><div class="sh rv"><span class="eb">Why ILM ORA</span><h2 id="bt"></h2></div><div class="g3" id="bg"></div></div></section>

<section id="faq"><div class="w" style="max-width:780px"><div class="sh rv"><span class="eb">FAQ</span><h2>Questions, answered</h2></div><div id="fq"></div></div></section>

<section style="padding-top:0"><div class="w" style="max-width:none;padding:0 24px"><div class="cta rv"><span class="ceb">Get started</span><h2 id="ct"></h2><p id="cp"></p><div class="cch"><span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></svg>Live classes</span><span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 2h6v4H9z"/><path d="m9 13 2 2 4-4"/></svg>Assessments</span><span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M7 17l4-6M17 17l-4-6"/></svg>Roadmaps</span><span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21v-6M12 21V9M19 21V4"/></svg>Reports</span><span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.2 13.9 7 23l5-3 5 3-1.2-9.1"/></svg>Certificates</span><span><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>One login</span></div></div></div></section>

<a class="chat" href="https://ilmora.texora.ai/contact" aria-label="Chat with us"><svg class="ui-ico" viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z"/></svg></a><footer><div class="w"><div><img src="data:image/webp;base64,UklGRooLAABXRUJQVlA4IH4LAAAwNgCdASpoAXIAPm02l0ikIyIhJJRZAIANiU3fj5MxwRel89u/pf7gfkB8m1e/vf4f4AKkvL55V/3nn29R/6Q9gD9aOkP+zPqA/n/94/6v+A92z/I/th7tv7B6gH9k/0fWfehB5b37mfCz+5X7h+0x/7c5J/wH4NeBv+K6LH0Ee+/xvMD/M+BPqZ9QL8O/o/+Y/KHgxQAfU3/dcY/iAcEXQE8mX+s8fX0z7B3816hYyzzsfvnY/fOx++dj987H752P3zsfvnY9jZICou1/M1Vr5fvW2x4uGBYTotizUpJyySRsRMBi8AtOAxN0/GvwRksXvegi3BFgAGX7yCVcAJTlUUFWIJxV7Dm91xq5j3DqmHKWcraL28gQ1tyqrj+SZ1SydP49d2beEZumfwK/eij7TPNlwshL1FHiBFZ2PZeZlwvX7EefVDy7hNBQs8pW/SKbT39DCMkiayG06/fvL/w/2hmweaxarZwKkbzDVX3qSP7uq4zbdDBlWDnNnvgFDezycjHj/qg6vb+SNvF0CGYpnYlssKhY50qY1nyRN8mLdpWk1BF8e1Wvl++eJk7H752P3zsfvnY/fOiAAP7/bc3/+kIrhQwYHH/3+rjTIiAAAWcX3/sZhvnLu3HpfZbpqyY6KH7GNfyoNfR/bKu23I43G/jxwJcPI4gA91T3YvbfXv96PSkBU3/UWP6TMshpj/gUSu9MkkYgXqQApsHiGIMweoj4Lf8/Hk3QNF8RfWHR+AgXx3juvUF5R93LcRnyP/FvSS+o0sueo/+43QKuFtOBZQJQpPxMdNgD0rHOOqZJX5rL/DdEa9ff6yRY03ZNRyvYAgcXA1Z6e7uriyQqYJe7oPDeWIP6P3C8n31WHleKHLb6N6Mv1GxwspTJIi//JKKU6l/2C6W4geOzJOdGsbj305x0KgBUuX3rSPJ38gGBPSPoiKsdam40cyXvNputvEgxBHRhp79ur4RaiOtP3mO7cc8wgP/uCTh8okTY94boNmF71+9hjOM6GHH/mxVDvCC63zYsxYL6VvJX6bUfWRYrrniIWkspUZwH7PnCHGELyR6WrPZnnMQjT8/+UxK8339T8vm5YHdt9N8I/Efpvj+0rjaUZM0ZA+fbMYEV0DTdZr0JNBaOUgpXCTLbbgxHxrzPkaA7DTzWC/FElZDYqm7RAPmrqkROnTVMWKPfvoWC9DZ5Cws4iF2+4Z6zg5VaGUUxeU304yunwoDR9Vkp6o70g4pDK1n3GfiGD9bx+eJcPDQaWykehmqZRP0dR+ry02Oq1VBmZv036YBEPk3xOTljrnafT8G7K/Eoj33GOHYN2RnV8aIuFMLNgNkk7to4sVFCG7lFfqS9Aqm8bwU+7EsjHZgoyYljc1JIDFoV0KgHw5sLvlttlWi2i8UdcjBX/Py29fKqI8BcCDBpr/Z+MtO3fi2x/++7s902f7Bu9T2RPM8vv10cz5esYVvFuOwcMgZ65xZ1yMskU7DOssXxU+qZ4ipNiooYmBOUmJViOLXkLKkuYUdXskMttB/TVms8NtTAuAXaO0ejg4fcuH6Ql98OLrTlknvkaDU1BSUuVR0Jcwtbbmxczh1eLjIIO7YVViiC6WSmnkhYutEAWDrCaUOFQR6DMdhDdydzRfA1UXNsu6Q2hhcE3jWJ0WXm4O3+fhrBgrwhXJXEYPxQt2statngriLgYuaNJUelVFziyMTBV7trjrsXqlv+vkZgZeS0X0MU+SmSRJVWpQPaFXkL470zp7eGj7zP5nun1ziSONGG/s2FPEE+i+NcLaWYe/JgnVpiY4wxxuXfYJqWm19z7lYxNvLubK0UbzLTUOvUdGEg1Y22+yshE7CaP6iWZTi7dB03INJ5q+vM1patNX80UsJu8eo3Ck4+cHNh/aB6X8VD0rnFc1/+om0aGWzIyNtK/xOLIECbqWQo07YcEh967Ew3kxe6A5K90Xv3sh6mWDiv0VqQOF+LWFXW28CBo6djjcQEGL417oL8DeHR8XwbXqf17k4CZKWzsdaxbyNPe1bAohEZGZo2vc1ybiJ+/jR4tjg5IwzhpNHkR0HZlFA1gjy9megRtB6vP4mMtzGrT/sfKy39ldgUsij91aCHF6za0WmIpfU+U9nuJgVOIX9iggBylV6/q9tctdqiHaiqMcMxu4SfRqXty2zhoYBHd85ns6yl1GAjuEjVJgQr53Qxvm6K84Ryvm8h9rHZDFaHDSraWq+ZLnCWJ9UKeGQfrVN1TEotflsoZlrkOCa1zaSxbVycz5nbcGDonjl2mWN7EQGLumcAgrPTD9FnjqHUr7O9rm0tA0EFR7pw2JfNe85cHhIp7qLi9MezXPCKU2E9EU1prdXIeA61/mXOHX2TSzoAFb/bOq9SxUPrOOvlIhmQcb5HAsz2vfhw/s9YUkL8HSN+3r1x3gCKiVZIdhFinpfRV8pA8JoJr53W5UCHKQlXhZwKZmR7jzguBspLkO2qCucEBokt7MqVWXj8ipfeu2xxLaeRrB2VO4Y547q+GxVHhELr8Vt3EebwJw+SNfW8nm5vOa0nCVAGn9NvzHk1mMyuz3P+jZuu6XK3pj2pqiV2yY7pbT8/oSXiSPU0IiPDYr/0I5p4B/W7f7JXMd/B9gNbDbS6yPnoqVP/L7jwMeWqZ+H8xokofcS2QgTgt4r6c8CCH+cCbiqjqLwrwX8eEjML0ZR+88zCp+DNsKD12IMrdSxowjiyIT4toivbYF4dt0Y2AHLeUZjeCFmbjrllG2n+BBdzIEatUTuvvtCjbKNTsE0EnysLpPtCnnaovn+rb3wHTxFIvGAnQxrqWhb9RCmxt5O7veQUB/8KIPltnSLhVOipEMXJN2ADD7eO2Iky8VBJWUGd7QXyVCNOE8Wp4RtnfhTDoZxNaFP61Oq1Z4Qk4bu7miNtAhl8dknRBQf+EC54sZNOKErgD9rFPB6MLMvGzVTeJygSvCYNF6HLxM0LiFBkqsomAVaOBst09J6ALPZ6StdxU1j5s+Jj1hF+smKN6pcDm9hoMJd1Ou4H9prI6+JYsubJSRbDd6nYcOgL9/4VuPUHmFCDhMLh7WzpRGRnvFP0c0EEfxbZb61ZY+XR7/VeiDq7asPzd8UsuVat0AF0//t7MAHqvPIsRxj8Ta6ekbre9B7znjgeMGcvZ6C3q1uovcAOzNlbysC/IiwMdp8z6TWZItIaYXg7W8s9g1dYLfZA3LeZJmKv/o+R5lwI5LIEZugoZoD2MO/OEMK4kwbT3NboraytM4H8UXjKiChalGtdO/92lPp4iDlCLSDOhQOMTtkrMqeefEqfEc0XehrYz7qLR1JwOpTUiUPTzLfhgzAo6yLxyK1dbb9NUuUqUAp2uK+suRB/+MhhEK7WLLjxUe4nQoIWI4wTANkr5lOd1JNuSYGYzWdZ0n2xgipelbuDCF+uYmbO9+jFj51mGs1kXhz5YJTyU1RB576POmCW17ewaLBb5ie6aRJNgwtjRGR7ZMJUd57MQT49WFFFdmcLmG3EGV55qT0RlFO2A7aEPnp2p5CQ3I4+xtBX7oW88qgb0LwsX9jBqEBOQFgffBCMVIbv0vbG+xr3UG1dr19jdZ3QDv6MLJbVuIBvfGz+erRosRpVYZ0mRLmUTgMR8PNdsy0b2o61fm7sBgi82bBHLFAV4e98iLt0zs8ZDoU6J8k9f0N7NAMJ9bo3gjPnzsfNmIQMiTdQtfqgy02QAAAAAY3SQ1Bq02QKxabGX7KcycjkqGeJJ5/XGgtyewsMNSfJO6cRmcC6J8TEtxCmWbgSiVLrHtjLXiCZRLX8yog7lUa0FmoM1m4QY0Aua5lcsnHQAK7kNRUeqW/UHhNZtPPVlAXsihtgqqqmIBWJDRjSIMKtFpjQBL9wLAQrjpj3D5povS3NPsc1DVd6frcMFPVnCDAHSeaKgmxgU8gAAAAAAA==" alt="Texora AI" style="height:44px;border-radius:8px;display:block;margin-bottom:8px">ILM ORA is a Texora AI product<br>© 2026 Texora AI. All rights reserved.</div><div><a href="https://ilmora.texora.ai/about">About</a><a href="https://ilmora.texora.ai/pricing">Pricing</a><a href="https://ilmora.texora.ai/faq">Help</a><a href="https://ilmora.texora.ai/contact">Contact</a><a href="https://ilmora.texora.ai/privacy-policy">Privacy</a><a href="https://ilmora.texora.ai/terms-of-service">Terms</a></div></div></footer>

<script type="text/plain" id="eng"><!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ILM ORA Portal</title><style>:root{--bg:#f1f5f9;--card:#fff;--card2:#f8fafc;--bd:#e2e8f0;--tx:#0f172a;--sub:#64748b;--mu:#94a3b8;--ic:#f1f5f9;--ac:#7c3aed;--ok:#16a34a;--warn:#d97706;--bad:#dc2626;--sh:0 1px 2px rgba(15,23,42,.05);--side:#fff;--in:#fff;color-scheme:light}
:root[data-theme=dark]{--bg:#0a0a0a;--card:#111;--card2:#161616;--bd:rgba(255,255,255,.12);--tx:#fff;--sub:rgba(255,255,255,.75);--mu:rgba(255,255,255,.55);--ic:rgba(255,255,255,.06);--ok:#34d399;--warn:#fbbf24;--bad:#f87171;--sh:0 4px 20px rgba(0,0,0,.4);--side:#0d0d0d;--in:#020617;color-scheme:dark}
*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%}
body{background:var(--bg);color:var(--tx);font:14px/1.5 Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;overflow:hidden}
button{font:inherit;color:inherit;cursor:pointer}input,select,textarea{font:inherit;color:var(--tx)}
svg.i{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:none}
#app{display:grid;grid-template-rows:56px 1fr;height:100vh}
.top{display:flex;align-items:center;gap:14px;padding:0 18px;background:var(--side);border-bottom:1px solid var(--bd)}
.lg{font-weight:800;font-size:17px;letter-spacing:.4px}.lg b{color:#16a34a}.lg i{font-style:normal;color:#f97316}
.top .tag{font-size:10px;letter-spacing:.14em;font-weight:700;color:var(--mu);display:flex;align-items:center;gap:6px}.top .tag:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--ac)}
.sr{margin-left:auto;display:flex;align-items:center;gap:8px;background:var(--in);border:1px solid var(--bd);border-radius:10px;padding:6px 10px;width:260px;color:var(--mu)}.sr input{border:0;background:none;outline:0;width:100%;font-size:13px}
.ib{width:34px;height:34px;border-radius:10px;border:1px solid var(--bd);background:var(--card);display:grid;place-items:center;position:relative}.ib .dot{position:absolute;top:6px;right:7px;width:7px;height:7px;border-radius:50%;background:var(--bad)}
.av{width:34px;height:34px;border-radius:50%;background:var(--tx);color:var(--bg);display:grid;place-items:center;font-weight:700;font-size:12px}
.shell{display:grid;grid-template-columns:240px 1fr;min-height:0}
.side{background:var(--side);border-right:1px solid var(--bd);overflow:auto;padding:12px 10px 20px}
.side .gh{font-size:10px;font-weight:700;letter-spacing:.12em;color:var(--mu);text-transform:uppercase;padding:14px 10px 6px;display:flex;justify-content:space-between;cursor:pointer}
.nv{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:none;padding:8px 10px;border-radius:9px;color:var(--sub);font-size:13px;font-weight:500}
.nv:hover{background:var(--ic);color:var(--tx)}.nv.on{background:var(--tx);color:var(--bg);font-weight:600}
.nv .bd{margin-left:auto;font-size:10px;font-weight:700;background:var(--bad);color:#fff;border-radius:99px;padding:1px 7px}
.main{overflow:auto;padding:22px 26px 40px}
.hero{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:20px 22px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:flex-start;margin-bottom:16px;box-shadow:var(--sh)}
.ey{font-size:10.5px;font-weight:700;letter-spacing:.14em;color:var(--mu);text-transform:uppercase;display:flex;align-items:center;gap:7px}.ey:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--ac)}
.hero h1{font-size:26px;letter-spacing:-.5px;margin:4px 0 2px}.hero p{color:var(--sub);font-size:13.5px}
.pills{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.pill{font-size:11.5px;font-weight:600;border:1px solid var(--bd);background:var(--ic);border-radius:99px;padding:4px 12px;color:var(--sub)}.pill.l{color:var(--ok);border-color:color-mix(in srgb,var(--ok) 40%,transparent)}
.btn{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--bd);background:var(--card);border-radius:10px;padding:8px 14px;font-size:13px;font-weight:600}.btn:hover{border-color:var(--sub)}
.btn.p{background:var(--tx);color:var(--bg);border-color:var(--tx)}.btn.g{background:var(--ok);border-color:var(--ok);color:#fff}.btn.r{background:var(--bad);border-color:var(--bad);color:#fff}.btn.sm{padding:5px 10px;font-size:12px;border-radius:8px}
.sg{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin-bottom:16px}
.sk{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:16px;box-shadow:var(--sh);cursor:default;transition:.15s}.sk:hover{border-color:var(--mu);transform:translateY(-2px)}
.sk .ico{width:34px;height:34px;border-radius:10px;background:var(--ic);display:grid;place-items:center;margin-bottom:10px;color:var(--sub)}
.sk b{font-size:26px;letter-spacing:-.5px;display:block;line-height:1.1}.sk span{font-size:12.5px;font-weight:600;color:var(--sub)}.sk small{display:block;font-size:11px;color:var(--mu);margin-top:1px}
.sk .dl{font-size:11px;font-weight:700;color:var(--ok);float:right}.sk .dl.n{color:var(--bad)}
.gr{display:grid;gap:14px;margin-bottom:16px}.gr>*{min-width:0}
.pn{background:var(--card);border:1px solid var(--bd);border-radius:14px;padding:16px;box-shadow:var(--sh)}
.pn .t{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:8px}.pn .t span{font-weight:700;font-size:14px}.pn .t u{text-decoration:none;font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--mu);background:var(--ic);padding:3px 9px;border-radius:99px}
.pn .lk{display:block;margin-top:12px;font-size:12.5px;font-weight:600;color:var(--sub);cursor:pointer;background:none;border:0}.pn .lk:hover{color:var(--tx)}
.row{display:flex;align-items:center;gap:11px;padding:9px 10px;border-radius:10px;background:var(--card2);border:1px solid var(--bd);margin-bottom:8px}.row:hover{background:var(--ic)}
.row .ri{width:32px;height:32px;border-radius:9px;background:var(--ic);display:grid;place-items:center;color:var(--sub);flex:none}
.row .rt{min-width:0;flex:1}.row .rt b{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.row .rt small{font-size:11.5px;color:var(--mu)}
.bg{font-size:10.5px;font-weight:700;border-radius:99px;padding:2px 9px;background:var(--ic);color:var(--sub);white-space:nowrap;border:1px solid var(--bd)}
.bg.ok{color:var(--ok);background:color-mix(in srgb,var(--ok) 12%,transparent);border-color:transparent}.bg.warn{color:var(--warn);background:color-mix(in srgb,var(--warn) 14%,transparent);border-color:transparent}.bg.bad{color:var(--bad);background:color-mix(in srgb,var(--bad) 12%,transparent);border-color:transparent}
table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--mu);padding:9px 12px;border-bottom:1px solid var(--bd);white-space:nowrap}td{padding:11px 12px;border-bottom:1px solid var(--bd);vertical-align:middle}tr:last-child td{border-bottom:0}tbody tr:hover td{background:var(--card2)}
.tw{overflow:auto;border:1px solid var(--bd);border-radius:14px;background:var(--card);box-shadow:var(--sh)}
.pb{height:7px;border-radius:9px;background:var(--ic);overflow:hidden;min-width:70px}.pb i{display:block;height:100%;background:var(--tx);border-radius:9px}.pb.ok i{background:var(--ok)}.pb.warn i{background:var(--warn)}.pb.bad i{background:var(--bad)}
.tb{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:12px}
.ch{border:1px solid var(--bd);background:var(--card);border-radius:99px;padding:6px 14px;font-size:12.5px;font-weight:600;color:var(--sub)}.ch.on{background:var(--tx);color:var(--bg);border-color:var(--tx)}
.in{background:var(--in);border:1px solid var(--bd);border-radius:10px;padding:8px 12px;font-size:13px;outline:0;min-width:200px}.in:focus{border-color:var(--sub)}
textarea.in{width:100%;resize:vertical}
.cal{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center}.cal .h{font-size:10.5px;color:var(--mu);font-weight:700;padding:4px 0}.cal span{padding:7px 0;font-size:12.5px;border-radius:8px;position:relative}.cal span.n{background:var(--tx);color:var(--bg);font-weight:700}.cal span.e:after{content:"";position:absolute;bottom:2px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--ac)}
.cal.big span{min-height:74px;border:1px solid var(--bd);text-align:left;padding:6px;border-radius:10px;background:var(--card2)}.cal.big span.n{background:var(--card);border-color:var(--tx);color:var(--tx)}.cal.big span i{display:block;font-style:normal;font-size:10.5px;background:var(--tx);color:var(--bg);border-radius:5px;padding:1px 5px;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.cal.big span.e:after{display:none}
.fl{display:grid;gap:10px}.fl label{font-size:12px;font-weight:600;color:var(--sub);display:grid;gap:5px}.fl .in{width:100%}
.kv{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--bd);font-size:13px}.kv:last-child{border:0}.kv span{color:var(--sub)}
.tg{width:38px;height:22px;border-radius:99px;background:var(--bd);position:relative;border:0;flex:none}.tg:after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:.15s}.tg.on{background:var(--ok)}.tg.on:after{left:19px}
.chat{display:grid;grid-template-columns:280px 1fr;gap:0;height:520px;border:1px solid var(--bd);border-radius:14px;overflow:hidden;background:var(--card)}
.chat .lst{border-right:1px solid var(--bd);overflow:auto}.chat .it{padding:12px 14px;border-bottom:1px solid var(--bd);cursor:pointer;display:flex;gap:10px}.chat .it.on,.chat .it:hover{background:var(--ic)}.chat .it b{font-size:13px;display:block}.chat .it small{color:var(--mu);font-size:11.5px}
.chat .cv{display:grid;grid-template-rows:auto 1fr auto;min-height:0}.chat .ms{padding:16px;overflow:auto;display:flex;flex-direction:column;gap:8px}
.m{max-width:72%;padding:9px 13px;border-radius:14px;font-size:13px;background:var(--ic);align-self:flex-start;white-space:pre-wrap}.m.me{background:var(--tx);color:var(--bg);align-self:flex-end}
.chat .cf{display:flex;gap:8px;padding:12px;border-top:1px solid var(--bd)}.chat .cf .in{flex:1}
.vid{aspect-ratio:16/9;background:linear-gradient(135deg,#111,#2a2a3a);border-radius:12px;display:grid;place-items:center;color:#cbd5e1;position:relative}.vid i{font-style:normal;width:46px;height:46px;border-radius:50%;background:rgba(255,255,255,.15);display:grid;place-items:center;font-size:18px}
.tile{aspect-ratio:16/10;background:#1c1f2a;border-radius:10px;display:grid;place-items:center;color:#fff;font-weight:700;font-size:20px;position:relative}.tile small{position:absolute;left:8px;bottom:6px;font-size:11px;font-weight:500;opacity:.85}
.code{font:13px/1.7 ui-monospace,Menlo,monospace;background:#0f1115;color:#d6deeb;border-radius:12px;padding:14px;min-height:300px;width:100%;border:0;outline:0;resize:vertical;tab-size:4}
.out{font:12.5px/1.6 ui-monospace,Menlo,monospace;background:#0f1115;color:#9ae6b4;border-radius:12px;padding:12px;min-height:120px;white-space:pre-wrap}
canvas#wb{width:100%;height:440px;background:#fff;border:1px solid var(--bd);border-radius:12px;touch-action:none;cursor:crosshair;display:block}
.kb{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.kb .col{background:var(--card2);border:1px solid var(--bd);border-radius:12px;padding:10px}.kb h6{font-size:11px;letter-spacing:.1em;color:var(--mu);margin:2px 4px 8px;text-transform:uppercase}
.tl{border-left:2px solid var(--bd);margin-left:8px;padding-left:16px}.tl>div{position:relative;margin-bottom:14px}.tl>div:before{content:"";position:absolute;left:-23px;top:5px;width:10px;height:10px;border-radius:50%;background:var(--card);border:2px solid var(--tx)}.tl>div.d:before{background:var(--ok);border-color:var(--ok)}
.toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:var(--tx);color:var(--bg);padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;z-index:50;box-shadow:0 10px 30px rgba(0,0,0,.3)}
.mo{position:fixed;inset:0;background:rgba(0,0,0,.5);display:grid;place-items:center;z-index:40;padding:16px}.mo>div{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:20px;width:min(480px,100%);max-height:90vh;overflow:auto}
.sp{display:flex;justify-content:space-between;gap:8px;align-items:center}.mt{margin-top:12px}.muted{color:var(--mu);font-size:12px}
.svgc text{fill:var(--mu);font-size:10px}.svgc .ln{stroke:var(--tx);fill:none;stroke-width:2}.svgc .gd{stroke:var(--bd)}.svgc .br{fill:var(--tx)}
@media(max-width:900px){.shell{grid-template-columns:1fr}.side{display:flex;overflow-x:auto;padding:8px;border-right:0;border-bottom:1px solid var(--bd);gap:4px;max-height:none}.side .gh{display:none}.nv{white-space:nowrap;width:auto}.sr{display:none}.chat{grid-template-columns:1fr;height:auto}.kb{grid-template-columns:1fr}.main{padding:14px}.gr{grid-template-columns:1fr!important}}
:root{--tc:#d97757;--tcb:#f3edfd}
.sthero{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid var(--bd)}.sthero h1{font-size:34px;letter-spacing:-.5px;color:var(--tc);margin:4px 0}.sthero p{color:var(--sub);font-size:13px}
.sthero .bx{width:66px;height:52px;border-radius:12px;border:1px solid var(--bd);background:var(--card);display:grid;place-items:center;color:var(--sub)}
.stt{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:7px;margin-bottom:16px;box-shadow:var(--sh)}
.stt button{border:1px solid transparent;background:none;border-radius:99px;padding:10px;font-size:13px;font-weight:600;color:var(--sub);display:flex;gap:8px;align-items:center;justify-content:center}.stt button.on{background:var(--tcb);border-color:#c4b5fd;color:var(--tc)}
:root[data-theme=dark] .stt button.on{background:rgba(217,119,87,.14);border-color:rgba(217,119,87,.5)}
.use{display:inline-flex;gap:16px;border:1px solid var(--bd);border-radius:8px;padding:8px 12px;font-size:12.5px;background:var(--card);flex-wrap:wrap}.use .pb{width:100%;height:5px}
.stp{display:grid;grid-template-columns:repeat(4,1fr);margin:20px 0;position:relative}.stp>button{border:0;background:none;display:grid;justify-items:center;gap:6px;font-size:12.5px;color:var(--sub);position:relative}
.stp>button i{font-style:normal;width:30px;height:30px;border-radius:50%;border:2px solid var(--bd);display:grid;place-items:center;font-weight:700;background:var(--card);position:relative;z-index:1}.stp>button.on i,.stp>button.dn i{background:var(--tc);border-color:var(--tc);color:#fff}.stp>button.on{color:var(--tc);font-weight:700}
.stp>button:not(:first-child):before{content:"";position:absolute;top:15px;right:50%;width:100%;height:2px;background:var(--bd)}.stp>button.on:not(:first-child):before,.stp>button.dn:not(:first-child):before{background:var(--tc)}
.dz{border:2px dashed var(--bd);border-radius:12px;padding:30px;text-align:center;color:var(--sub);background:var(--card2);cursor:pointer}.dz:hover{border-color:var(--tc)}.dz b{display:block;color:var(--tx);margin:6px 0 2px}
.f2{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px}.f2 label{font-size:10.5px;font-weight:700;letter-spacing:.1em;color:var(--sub);text-transform:uppercase;display:grid;gap:6px}.f2 .in{width:100%;text-transform:none;letter-spacing:0;font-weight:400}
.sec{border:1px solid var(--bd);border-radius:14px;background:var(--card);margin-bottom:12px;overflow:hidden}.sec>.sh{display:flex;align-items:center;gap:12px;padding:16px 18px;cursor:pointer;width:100%;border:0;background:none;text-align:left}.sec>.sh i{font-style:normal;width:30px;height:30px;border-radius:50%;background:color-mix(in srgb,var(--tc) 15%,transparent);color:var(--tc);display:grid;place-items:center;font-weight:700}.sec>.sh b{display:block;font-size:14px}.sec>.sh small{color:var(--mu);font-size:12px}.sec>.bd{padding:4px 18px 18px;border-top:1px solid var(--bd)}.sec .bd{padding-top:16px}
.rte{display:flex;gap:6px;padding:8px;border:1px solid var(--bd);border-bottom:0;border-radius:10px 10px 0 0;background:var(--card2);font-size:12px}.rte span{padding:2px 8px;border-radius:6px;font-weight:700;color:var(--sub)}
.sel{padding:3px 12px;border-radius:99px;border:1px solid var(--bd);font-size:12px;background:var(--card)}
@media(max-width:700px){.stt{grid-template-columns:1fr 1fr}}
html{-webkit-text-size-adjust:100%}.shell,.main{min-width:0}.pn,.sk,.hero>*{min-width:0}img,video,canvas{max-width:100%}
@media(max-width:900px){#app{grid-template-rows:52px 1fr}.nv{padding:8px 12px}.chat .lst{max-height:190px;border-right:0;border-bottom:1px solid var(--bd)}.chat .cv{min-height:340px}.cal.big span{min-height:56px}.sthero h1{font-size:28px}.main{padding:14px 16px 28px}}
@media(max-width:700px){.top{gap:8px;padding:0 12px}.top .tag{display:none}.main{padding:12px 12px 28px}.hero{padding:14px}.hero h1{font-size:22px}.sg{grid-template-columns:repeat(2,1fr)!important;gap:8px}.sk{padding:12px}.sk b{font-size:22px}.pn{padding:12px}.f2{grid-template-columns:1fr}.m{max-width:88%}.sec>.sh{padding:12px 14px}.sec>.bd{padding:4px 14px 14px}.tb .in{min-width:0;flex:1 1 140px}.sthero h1{font-size:24px}.sthero .bx{display:none}.stp>button{font-size:11px}.use{width:100%}.cal.big span{min-height:44px;padding:3px;font-size:11px}.cal.big span i{display:none}canvas#wb{height:320px}.code{min-height:220px}.kv{gap:8px}}
@media(max-width:420px){.sg{gap:6px}.sk b{font-size:20px}.sk span{font-size:11.5px}.btn{padding:7px 10px;font-size:12px}.stt button{padding:8px 6px;font-size:12px}.th{font-size:6px}}
</style></head><body>
<div id="app"><header class="top"><span class="lg"><b>ILM</b> <i>ORA</i></span><span class="tag" id="tag"></span><label class="sr"><svg class="i" viewBox="0 0 24 24"><path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3"/></svg><input placeholder="Search…"></label><button class="ib" title="Notifications"><svg class="i" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg><span class="dot"></span></button><button class="ib" id="thb" title="Toggle theme"><svg class="i" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button><span class="av" id="avt"></span></header>
<div class="shell"><aside class="side" id="side"></aside><main class="main" id="main"></main></div></div>
<script>window.ILM_ROLE="__ROLE__";window.ILM_PAGE="__PAGE__"||null;window.ILM_THEME="__THEME__";
var IP={home:"M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",users:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",book:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",video:"M23 7l-7 5 7 5zM1 5h15v14H1z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8",clip:"M9 2h6v4H9zM5 4h2v2H5v14h14V6h-2V4h2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z",check:"M20 6L9 17l-5-5",msg:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",star:"M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",chart:"M3 3v18h18M7 15l4-4 3 3 5-6",spark:"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",pen:"M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",code:"M16 18l6-6-6-6M8 6l-6 6 6 6",cal:"M3 5h18v16H3zM3 10h18M8 2v4M16 2v4",layers:"M12 2l10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5",target:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4",map:"M1 6l7-3 8 3 7-3v15l-7 3-8-3-7 3zM8 3v15M16 6v15",play:"M5 3l14 9-14 9z",award:"M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12M8.2 13.9L7 23l5-3 5 3-1.2-9.1",set:"M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M14 4v4M8 10v4M16 16v4",shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",bld:"M4 22V3h10v19M14 9h6v13M8 7h2M8 11h2M8 15h2M2 22h20",up:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",bell:"M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",folder:"M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",list:"M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",clock:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M12 6v6l4 2",search:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16M21 21l-4.3-4.3",plus:"M12 5v14M5 12h14",mic:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3M19 10v2a7 7 0 0 1-14 0v-2M12 19v3",dollar:"M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",moon:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",camera:"M14 5 16 8h4v11H4V8h4l2-3zM12 10a3 3 0 1 0 0 6 3 3 0 0 0 0-6",monitor:"M3 4h18v13H3zM8 21h8M12 17v4",hand:"M8 12V5a1.5 1.5 0 0 1 3 0v6-8a1.5 1.5 0 0 1 3 0v8-6a1.5 1.5 0 0 1 3 0v7-4a1.5 1.5 0 0 1 3 0v6c0 5-3 8-7 8h-1c-3 0-5-2-6-4l-2-4a1.5 1.5 0 0 1 2.5-1.5L8 15",circle:"M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16",x:"M18 6 6 18M6 6l12 12",send:"M22 2L11 13M22 2l-7 20-4-9-9-4z"};
function ic(n){return'<svg class="i" viewBox="0 0 24 24"><path d="'+(IP[n]||IP.list)+'"/></svg>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var $=function(i){return document.getElementById(i)};
function toast(m){var t=document.createElement("div");t.className="toast";t.textContent=m;document.body.appendChild(t);setTimeout(function(){t.remove()},1800)}
function modal(title,body,ok){var m=document.createElement("div");m.className="mo";m.innerHTML='<div><div class="sp" style="margin-bottom:14px"><b style="font-size:16px">'+title+'</b><button class="btn sm" data-x>'+ic("x")+'</button></div>'+body+'<div class="sp mt" style="justify-content:flex-end"><button class="btn" data-x>Cancel</button><button class="btn p" data-ok>'+(ok||"Save")+'</button></div></div>';document.body.appendChild(m);m.onclick=function(e){if(e.target==m||e.target.closest("[data-x]"))m.remove();else if(e.target.closest("[data-ok]")){m.remove();toast("Saved ✓ (demo data)")}}}
function H(ey,t,sub,pills,btns){return'<div class="hero"><div><div class="ey">'+ey+'</div><h1>'+t+'</h1><p>'+sub+'</p></div><div class="pills">'+(pills||[]).map(function(p){return'<span class="pill">'+p+'</span>'}).join("")+(btns||"")+'<span class="pill l">● LIVE</span></div></div>'}
function B(l,c,a){return'<button class="btn '+(c||"")+'" data-act="'+(a||l)+'">'+l+'</button>'}
function S(a){return'<div class="sg">'+a.map(function(x){return'<div class="sk"><div class="ico">'+ic(x[0])+'</div>'+(x[4]?'<span class="dl'+(x[4][0]=="-"?" n":"")+'">'+x[4]+'</span>':'')+'<b>'+x[2]+'</b><span>'+x[1]+'</span>'+(x[3]?'<small>'+x[3]+'</small>':'')+'</div>'}).join("")+'</div>'}
function G(c,a){return'<div class="gr" style="grid-template-columns:'+c+'">'+a.join("")+'</div>'}
function P(t,tag,body,link){return'<div class="pn"><div class="t"><span>'+t+'</span>'+(tag?'<u>'+tag+'</u>':'')+'</div>'+body+(link?'<button class="lk" data-act="'+link+'">'+link+'</button>':'')+'</div>'}
function R(i,t,s,b,c){return'<div class="row"><div class="ri">'+ic(i)+'</div><div class="rt"><b>'+t+'</b><small>'+s+'</small></div>'+(b?'<span class="bg '+(c||"")+'">'+b+'</span>':'')+'</div>'}
function bg(t,c){return'<span class="bg '+(c||"")+'">'+t+'</span>'}
function pbar(v,c){return'<div class="pb '+(c||(v>=75?"ok":v>=50?"":v>=35?"warn":"bad"))+'"><i style="width:'+v+'%"></i></div>'}
function chips(a,on,id){return'<div class="tb" data-chips="'+(id||"")+'">'+a.map(function(x,i){return'<button class="ch'+(i==(on||0)?" on":"")+'">'+x+'</button>'}).join("")+'</div>'}
function sb(ph){return'<div class="tb"><input class="in" data-filter placeholder="'+(ph||"Search…")+'"></div>'}
function T(cols,rows,o){o=o||{};return'<div class="tw"><table><thead><tr>'+cols.map(function(c){return'<th>'+c+'</th>'}).join("")+'</tr></thead><tbody>'+rows.map(function(r){return'<tr>'+r.map(function(c){return'<td>'+c+'</td>'}).join("")+'</tr>'}).join("")+'</tbody></table></div>'}
function av(n){var p=n.split(" ");return'<span style="display:inline-flex;align-items:center;gap:9px"><span class="av" style="width:28px;height:28px;font-size:11px">'+(p[0][0]+(p[1]||" ")[0]).trim()+'</span>'+n+'</span>'}
function cal(ev,big){var h="Mon Tue Wed Thu Fri Sat Sun".split(" ").map(function(d){return'<span class="h">'+d+'</span>'}).join(""),g="";for(var i=0;i<6;i++)g+="<span></span>";for(i=1;i<=30;i++){var e=ev&&ev[i];g+='<span class="'+(i==3?"n ":"")+(e?"e":"")+'">'+i+(big&&e?e.map(function(x){return"<i>"+x+"</i>"}).join(""):"")+'</span>'}return'<div class="cal'+(big?" big":"")+'">'+h+g+'</div>'}
function bars(v,l,h){h=h||150;var w=Math.max.apply(null,v),n=v.length,W=n*44;return'<svg class="svgc" viewBox="0 0 '+W+' '+(h+24)+'" width="100%" preserveAspectRatio="xMidYMid meet">'+[0,.5,1].map(function(f){return'<line class="gd" x1="0" x2="'+W+'" y1="'+(h-f*h*.9)+'" y2="'+(h-f*h*.9)+'"/>'}).join("")+v.map(function(x,i){var bh=x/w*h*.9;return'<rect class="br" rx="4" x="'+(i*44+10)+'" y="'+(h-bh)+'" width="24" height="'+bh+'"/><text x="'+(i*44+22)+'" y="'+(h+14)+'" text-anchor="middle">'+l[i]+'</text><text x="'+(i*44+22)+'" y="'+(h-bh-4)+'" text-anchor="middle" style="fill:var(--sub)">'+x+'</text>'}).join("")+'</svg>'}
function line(v,l,h){h=h||150;var w=Math.max.apply(null,v),m=Math.min.apply(null,v),n=v.length,W=n*60,pts=v.map(function(x,i){return[i*60+30,h-(x-m)/(w-m||1)*(h-30)-10]});return'<svg class="svgc" viewBox="0 0 '+W+' '+(h+24)+'" width="100%">'+[0,.5,1].map(function(f){return'<line class="gd" x1="0" x2="'+W+'" y1="'+(h-f*(h-20))+'" y2="'+(h-f*(h-20))+'"/>'}).join("")+'<polyline class="ln" points="'+pts.map(function(p){return p.join(",")}).join(" ")+'"/>'+pts.map(function(p,i){return'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.5" fill="var(--card)" stroke="var(--tx)" stroke-width="2"/><text x="'+p[0]+'" y="'+(h+14)+'" text-anchor="middle">'+l[i]+'</text>'}).join("")+'</svg>'}
function donut(parts){var tot=parts.reduce(function(a,b){return a+b[1]},0),a=0,r=46,c=2*Math.PI*r,cols=["var(--tx)","#7c3aed","#16a34a","#d97706","#94a3b8"];return'<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><svg viewBox="0 0 120 120" width="130" height="130" style="transform:rotate(-90deg)">'+parts.map(function(p,i){var d=p[1]/tot*c,s='<circle cx="60" cy="60" r="'+r+'" fill="none" stroke="'+cols[i%5]+'" stroke-width="16" stroke-dasharray="'+d+' '+(c-d)+'" stroke-dashoffset="'+(-a)+'"/>';a+=d;return s}).join("")+'</svg><div>'+parts.map(function(p,i){return'<div style="font-size:12.5px;margin:4px 0"><span style="display:inline-block;width:9px;height:9px;border-radius:3px;background:'+cols[i%5]+';margin-right:8px"></span>'+p[0]+' <b>'+p[1]+'%</b></div>'}).join("")+'</div></div>'}
function heat(rows,cols,seed){var s='<div style="display:grid;grid-template-columns:110px repeat('+cols.length+',1fr);gap:4px;font-size:11px;align-items:center"><span></span>'+cols.map(function(c){return'<span style="text-align:center;color:var(--mu)">'+c+'</span>'}).join("");rows.forEach(function(r,i){s+='<span style="color:var(--sub);font-weight:600">'+r+'</span>';cols.forEach(function(c,j){var v=30+((i*37+j*53+seed)%70);s+='<span style="text-align:center;padding:9px 0;border-radius:6px;background:color-mix(in srgb,var(--ok) '+v+'%,transparent);font-weight:600;color:var(--tx)">'+v+'</span>'})});return s+'</div>'}
function chatShell(list,first,id){return'<div class="chat" id="'+id+'"><div class="lst">'+list.map(function(x,i){return'<div class="it'+(i?"":" on")+'" data-th="'+i+'"><span class="av">'+x[0][0]+'</span><div><b>'+x[0]+'</b><small>'+x[1]+'</small></div></div>'}).join("")+'</div><div class="cv"><div class="sp" style="padding:12px 16px;border-bottom:1px solid var(--bd)"><b id="chn">'+list[0][0]+'</b>'+bg("Open","warn")+'</div><div class="ms" id="chm">'+first+'</div><div class="cf"><input class="in" id="chi" placeholder="Type your reply…"><button class="btn p" data-send>'+ic("send")+' Send</button></div></div></div>'}
var AI_REPLIES=["Here is a concise plan: 1) recap the concept in 5 minutes, 2) a live worked example, 3) a 10-question quick quiz, 4) assign a short practice set.","I analysed Batch FS-2026-A: 4 students are below 60% in Arrays. I suggest a 20-minute remedial session on Thursday. Want me to draft it?","Draft ready ✨ — Subject: 'Weekly progress update'. Body: Hi team, this week we completed Module 6…","Quiz generated: 10 MCQs on JavaScript Closures (3 easy, 5 medium, 2 hard). You can publish it from Assessments."];

var ST=["Aarav Sharma","Diya Patel","Rohan Mehta","Ananya Iyer","Vikram Singh","Sneha Reddy","Karan Malhotra","Priya Nair","Arjun Desai","Meera Joshi","Rahul Verma","Ishita Gupta"];
var BATCHES=[["FS-2026-A","Full Stack Development","28","78","Mon-Fri · 10:00","Running"],["DS-2026-B","Data Science with Python","24","71","Mon-Sat · 14:00","Running"],["UI-2026-C","UI/UX Design Bootcamp","18","84","Tue-Thu · 17:30","Running"],["JV-2025-D","Core Java & DSA","31","92","Weekend · 09:00","Completed"],["CL-2026-E","Cloud & DevOps","22","46","Mon-Fri · 18:00","Starting"]];
var TP={};
TP.dash=function(){return H("TRAINER PORTAL","Good Afternoon, Rajesh!","All your content & student activity at a glance — Tue, 3 Nov 2026",["4 batches","123 students","3 pending doubts"])+
S([["layers","Active Batches","4","2 starting this month"],["users","Total Students","123","Across all batches","+8"],["play","Live Dashboard","46","Sessions conducted"],["clip","Assignments","18","6 awaiting review"],["video","Videos Uploaded","64","12 this month"],["file","Files Uploaded","39","PDF, PPT, notes"],["book","Courses Created","7","3 published"],["msg","Pending Doubts","3","Reply within 24h"]])+
G("1fr 1fr 1fr",[P("Recent Videos","",R("video","React Hooks Deep Dive","Uploaded 2 Nov · 48 min","Ready","ok")+R("video","Node.js Event Loop","Uploaded 30 Oct · 36 min","Ready","ok")+R("video","SQL Joins Explained","Uploaded 28 Oct · 41 min","Ready","ok")+R("video","Git Branching Strategies","Uploaded 26 Oct · 29 min","Processing","warn"),"View all"),P("Recent Files","",R("file","Module-6-Notes.pdf","Uploaded 2 Nov · 2.4 MB","PDF")+R("file","Closures-Cheatsheet.pdf","Uploaded 31 Oct · 640 KB","PDF")+R("file","API-Design-Slides.pptx","Uploaded 29 Oct · 8.1 MB","PPT")+R("file","Capstone-Rubric.docx","Uploaded 27 Oct · 120 KB","DOC"),"View all"),P("Recent Assignments","",R("clip","Build a REST API","Due 8 Nov · FS-2026-A","18/28","warn")+R("clip","Pandas Data Cleaning","Due 6 Nov · DS-2026-B","21/24","ok")+R("clip","Figma Design System","Due 10 Nov · UI-2026-C","9/18","warn")+R("clip","Dockerize an App","Due 12 Nov · CL-2026-E","0/22","bad"),"View all")])+
G("2fr 2fr 1.3fr",[P("Student Progress","THIS WEEK",bars([62,68,71,66,74,79,82],["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],130)+'<div class="muted" style="margin-top:6px">Average course completion across all batches (%)</div>',"View Reports"),P("Today's Schedule","TODAY",R("play","React Components — FS-2026-A","10:00 – 11:30 AM","Live now","ok")+R("clock","Pandas Workshop — DS-2026-B","02:00 – 03:30 PM","Upcoming")+R("clock","Design Critique — UI-2026-C","05:30 – 06:30 PM","Upcoming")+R("clock","Doubt Clearing — CL-2026-E","07:00 – 07:45 PM","Upcoming"),"Manage Batches"),P("November 2026","",cal({3:1,5:1,10:1,12:1,18:1,24:1}))])};
TP.batches=function(){return H("BATCH MANAGEMENT","Batches","Manage batches, students and schedules",["5 batches"],B("+ Create Batch","p","Create Batch"))+sb("Search batches…")+T(["Batch ID","Course","Students","Progress","Schedule","Status",""],BATCHES.map(function(b){return["<b>"+b[0]+"</b>",b[1],b[2],pbar(+b[3]),b[4],bg(b[5],b[5]=="Running"?"ok":b[5]=="Completed"?"":"warn"),'<button class="btn sm" data-act="Open batch">Open</button>']}))};
TP.workspace=function(){return H("TRAINER WORKSPACE","Workspace","Events, meetings, calendar and communication in one place",["Tue, 3 Nov 2026"],B("+ Create New","p","Create New"))+chips(["Overview","Events","Calendar","Instant Meeting","Summaries","Contacts"],0)+S([["cal","Upcoming Events","6","Next: Today 2:00 PM"],["clock","Scheduled Today","3","View calendar"],["bell","Pending Reminders","4"],["msg","Unread Emails","12","+3 today"]])+G("2fr 1fr",[P("Calendar","NOVEMBER 2026",cal({3:["React Comp.","Pandas"],5:["Parent Mtg"],10:["Demo Day"],12:["Review"],18:["Workshop"],24:["Quiz"]},true)),'<div>'+P("Instant Meeting","",'<p class="muted" style="margin-bottom:10px">Start an instant meeting with your team or students.</p>'+B("Start Instant Meeting","p","Instant meeting started"))+'<div style="height:12px"></div>'+P("Summaries","AI",R("spark","FS-A weekly sync","3 action items · 28 Oct")+R("spark","Parent–teacher call","2 action items · 25 Oct"))+'</div>'])};
TP.roadmap=function(){var m=[["Foundations: HTML, CSS, JS","Completed","d",100],["Frontend: React & State","In progress","",72],["Backend: Node, Express, REST","In progress","",45],["Databases: SQL & MongoDB","Upcoming","",0],["DevOps & Deployment","Upcoming","",0],["Capstone Project","Upcoming","",0]];return H("ROADMAP","Learning Roadmaps","Build and manage roadmaps for your batches",["3 roadmaps"],B("+ New Roadmap","p","New Roadmap"))+G("1fr 2fr",[P("My Roadmaps","",R("map","Full Stack Developer","FS-2026-A · 6 stages","Active","ok")+R("map","Data Scientist","DS-2026-B · 5 stages","Active","ok")+R("map","UI/UX Designer","UI-2026-C · 4 stages","Draft")),P("Full Stack Developer — stages","OVERALL 53%",'<div class="tl">'+m.map(function(x){return'<div class="'+x[2]+'"><b>'+x[0]+'</b> '+bg(x[1],x[2]?"ok":x[3]?"warn":"")+'<div style="margin-top:6px;max-width:360px">'+pbar(x[3])+'</div></div>'}).join("")+'</div>')])};
TP.ai=function(){return H("AI COMPANION","AI Companion","Your teaching assistant — plan lessons, draft quizzes, summarise sessions",["GPT-powered"])+G("1fr 2.2fr",[P("Quick actions","",["Generate a lesson plan","Create a quiz from my notes","Summarise last live class","Draft a parent update","Explain a concept simply"].map(function(x){return'<button class="btn" style="width:100%;margin-bottom:8px;justify-content:flex-start" data-ai="'+x+'">'+ic("spark")+x+'</button>'}).join("")),'<div class="chat" style="grid-template-columns:1fr;height:480px"><div class="cv"><div class="sp" style="padding:12px 16px;border-bottom:1px solid var(--bd)"><b>Chat</b>'+bg("Online","ok")+'</div><div class="ms" id="aim"><div class="m">Hi Rajesh! I can plan lessons, create quizzes and analyse your batches. What would you like to do?</div></div><div class="cf"><input class="in" id="aii" placeholder="Ask anything about your classes…"><button class="btn p" data-aisend>'+ic("send")+' Send</button></div></div></div>'])};
TP.wb=function(){return H("WHITEBOARD","Whiteboard","Teach visually — draw, sketch and explain",["Auto-saved"],B("Clear","","wbclear")+B("Save as image","p","Whiteboard saved"))+'<div class="tb" id="wbt">'+["#0f172a","#dc2626","#2563eb","#16a34a","#d97706"].map(function(c,i){return'<button class="ch'+(i?"":" on")+'" data-col="'+c+'" style="background:'+c+';width:30px;height:30px;padding:0;border-radius:50%"></button>'}).join("")+'<button class="ch" data-wbe>Eraser</button><input type="range" min="1" max="18" value="3" id="wbs"></div><canvas id="wb"></canvas>'};
TP.code=function(){return H("CODING LAB","Online Compiler","Write and run code during sessions",["Python 3"],B("▶ Run Code","g","run"))+G("2fr 1fr",['<div><div class="tb"><select class="in" style="min-width:140px"><option>Python</option><option>JavaScript</option><option>Java</option></select>'+B("Share with batch","","Shared with batch")+'</div><textarea class="code" id="cd" spellcheck="false"># Fibonacci — demo\\ndef fib(n):\\n    a, b = 0, 1\\n    for _ in range(n):\\n        yield a\\n        a, b = b, a + b\\n\\nprint(list(fib(10)))\\nprint("Sum:", sum(fib(10)))</textarea></div>','<div>'+P("Output","",'<div class="out" id="co">Click ▶ Run Code to see output</div>')+'<div style="height:12px"></div>'+P("Recent files","",R("code","fib.py","Today"),"")+'</div>'])};
TP.plan=function(){var r=function(a,b,c,d,e){return[a,b,c,pbar(d),bg(e,e=="Done"?"ok":e=="Live"?"warn":"")]};return H("STUDY PLAN","Study Plans","Plan study schedules for learners",["3 plans"],B("+ New Plan","p","New Plan"))+G("1fr 2fr",[P("Plans","",R("list","30-Day DSA Sprint","FS-2026-A · 120 problems","Active","ok")+R("list","SQL Mastery","DS-2026-B · 60 problems","Active","ok")+R("list","Design Fundamentals","UI-2026-C · 40 tasks","Draft")),P("30-Day DSA Sprint","PROGRESS 64%",T(["Week","Topic","Problems","Completion","Status"],[r("Week 1","Arrays & Strings","30",100,"Done"),r("Week 2","Linked Lists & Stacks","30",100,"Done"),r("Week 3","Trees & Graphs","32",58,"Live"),r("Week 4","Dynamic Programming","28",0,"Upcoming")]))])};
var VS={tab:0,step:0,sec:0};
function fld(l,t,o){return'<label>'+l+(o?'<select class="in"><option>'+o.join("</option><option>")+'</option></select>':t=="area"?'<textarea class="in" rows="4" placeholder="Describe…"></textarea>':'<input class="in" placeholder="'+(t||"")+'">')+'</label>'}
function dz(t,s){return'<div class="dz" data-act="Browse files">'+ic("up")+'<b>'+t+'</b><span>'+s+'</span></div>'}
function use(a,b,c){return'<div class="use"><b>FREE · '+a+'</b><span class="muted">'+b+'</span><div class="pb"><i style="width:0"></i></div></div>'}
function secs(a){return a.map(function(x,i){return'<div class="sec"><button class="sh" data-vsec="'+i+'"><i>'+(i+1)+'</i><div><b>'+x[0]+'</b><small>'+x[1]+'</small></div><span style="margin-left:auto;color:var(--mu)">'+(VS.sec==i?"⌃":"⌄")+'</span></button>'+(VS.sec==i?'<div class="bd">'+x[2]+'</div>':'')+'</div>'}).join("")+'<div class="sp"><button class="btn" data-vsec="'+Math.max(0,VS.sec-1)+'">← Back</button>'+(VS.sec<a.length-1?'<button class="btn p" data-vsec="'+(VS.sec+1)+'">Continue →</button>':'<button class="btn p" data-act="Published to batch ✓">Publish</button>')+'</div>'}
TP.videos=function(){var T4=[["Upload Video","video","Publish New Lecture","Upload recorded lectures for students."],["Upload Document","file","Upload Documents","Share study material and resources with students."],["Create Quiz","clip","Create Quiz","Build interactive quizzes for your batch."],["Create Assignment","book","Create Assignment","Set assignments and track submissions."]],t=VS.tab,h='<div class="sthero"><div><div class="ey" style="color:var(--mu)">TRAINER STUDIO</div><h1>'+T4[t][2]+'</h1><p>'+T4[t][3]+'</p></div><div class="bx">'+ic(T4[t][1])+'</div></div><div class="stt">'+T4.map(function(x,i){return'<button class="'+(i==t?"on":"")+'" data-vtab="'+i+'">'+ic(x[1])+x[0]+'</button>'}).join("")+'</div>',b="";
 if(t==0){var st=["Details","Video elements","Checks","Visibility"],sp=VS.step,body=[
  '<div class="f2" style="grid-template-columns:2fr 1fr">'+'<div class="fl">'+fld("Lecture title","e.g. React Hooks Deep Dive")+fld("Description","area")+'<div class="f2">'+fld("Select batch","",["Select batch","FS-2026-A","DS-2026-B","UI-2026-C"])+fld("Select course","",["Select course","Full Stack Web Development","Data Science with Python"])+'</div></div><div><div class="muted" style="margin-bottom:6px;font-weight:700;font-size:10.5px;letter-spacing:.1em">THUMBNAIL</div><div class="vid" style="aspect-ratio:16/10;background:#000"></div></div></div>',
  dz("Drag and drop your video here","MP4, MOV, MKV · max 100 MB")+'<div class="mt"><b style="font-size:13px">Chapters & resources</b></div><div class="f2 mt">'+fld("Chapter 1 title","Introduction")+fld("Timestamp","00:00")+fld("Attach resource","Link or file")+'</div>',
  ["Title and description added","Batch and course selected","Video file uploaded","Thumbnail generated","Transcoding complete"].map(function(x,i){return'<div class="kv"><span>'+x+'</span>'+bg(i<2?"Done":"Pending",i<2?"ok":"warn")+'</div>'}).join(""),
  '<div class="f2">'+fld("Visibility","",["Batch only","Public","Scheduled"])+fld("Publish date","03 Nov 2026")+fld("Notify students","",["Yes — email + app","No"])+'</div>'][sp];
  b='<div class="pn"><div class="sp" style="margin-bottom:12px"><b style="font-size:17px">Publish Lecture</b><span class="muted">Not saved</span></div>'+use("0/5 videos","0 MB / 1.0 GB")+'<div class="muted" style="margin-top:8px;font-size:12px">Max size per video upload: <b style="color:var(--tx)">100 MB</b></div><div class="stp">'+st.map(function(x,i){return'<button class="'+(i==sp?"on":i<sp?"dn":"")+'" data-vstep="'+i+'"><i>'+(i<sp?"✓":i+1)+'</i>'+x+'</button>'}).join("")+'</div></div><div class="pn mt"><b style="font-size:17px;display:block;margin-bottom:14px">'+st[sp]+'</b>'+body+'<div class="sp mt"><button class="btn" data-vstep="'+Math.max(0,sp-1)+'">← Back</button>'+(sp<3?'<button class="btn p" data-vstep="'+(sp+1)+'">Next →</button>':'<button class="btn g" data-act="Lecture published ✓">Publish Lecture</button>')+'</div></div>'+
  '<div class="pn mt"><div class="t"><span>Recent uploads</span><u>64 VIDEOS</u></div>'+T(["Title","Duration","Batch","Uploaded","Views","Status"],[["<b>React Hooks Deep Dive</b>","48:10","FS-2026-A","2 Nov","214",bg("Ready","ok")],["<b>Node.js Event Loop</b>","36:22","FS-2026-A","30 Oct","189",bg("Ready","ok")],["<b>Git Branching Strategies</b>","29:48","CL-2026-E","26 Oct","—",bg("Processing","warn")]])+'</div>'}
 else if(t==1)b='<div class="pn"><div class="ri" style="display:flex;gap:12px;align-items:center;margin-bottom:12px"><div class="ri" style="width:38px;height:38px;border-radius:10px;background:#e0e7ff;display:grid;place-items:center;color:#4f46e5">'+ic("file")+'</div><div><b style="font-size:16px">Upload Document</b><br><small class="muted">PDF, Word, PPT, Excel, ZIP and more</small></div></div><hr style="border:0;border-top:1px solid var(--bd);margin:12px 0">'+use("0/5 files","0 MB / 1.0 GB")+'<div class="muted" style="margin:8px 0 12px;font-size:12px">Max size per file upload: <b style="color:var(--tx)">100 MB</b></div>'+dz("Drag and drop your file here","or click to browse files")+'<div class="f2 mt">'+fld("Document title","e.g. Module 6 Notes")+fld("Select batch","",["Select batch","FS-2026-A","DS-2026-B"])+fld("Select course","",["Select course","Full Stack","Data Science"])+fld("Document category","",["Notes","Slides","Worksheet","Reference"])+'</div><div class="mt">'+B("Upload Document","p","Document uploaded ✓")+'</div></div>'+'<div class="pn mt"><div class="t"><span>Recent files</span></div>'+T(["File","Batch","Size","Uploaded"],[["<b>Module-6-Notes.pdf</b>","FS-2026-A","2.4 MB","2 Nov"],["<b>Closures-Cheatsheet.pdf</b>","FS-2026-A","640 KB","31 Oct"],["<b>API-Design-Slides.pptx</b>","FS-2026-A","8.1 MB","29 Oct"]])+'</div>';
 else if(t==2)b='<div class="sel" style="display:inline-block;margin-bottom:14px;padding:7px 14px">0/3 quizzes created this month</div>'+secs([["Quiz Details","Title, type, difficulty & settings",'<div class="f2">'+fld("Quiz title","e.g. React Fundamentals")+fld("Select batch","",["Select Batch","FS-2026-A","DS-2026-B"])+fld("Quiz type","",["Select Type","MCQ","Coding","Mixed"])+fld("Difficulty","",["Select Difficulty","Easy","Medium","Hard"])+fld("Category","",["Select Category","Frontend","Backend","Database"])+fld("Time limit (min)","20")+'</div>'],["Questions","Add and edit questions",'<div class="fl">'+fld("Question 1","Which hook manages state in a function component?")+'<div class="f2">'+fld("Option A","useState")+fld("Option B","useEffect")+fld("Option C","useRef")+fld("Option D","useMemo")+'</div><div>'+B("+ Add question","","Question added")+B("✨ Generate with AI","","AI generated 5 questions")+'</div></div>'],["Settings & Publish","Marks, attempts and schedule",'<div class="f2">'+fld("Total marks","20")+fld("Attempts allowed","1")+fld("Start","03 Nov 2026, 10:00")+fld("Shuffle questions","",["Yes","No"])+'</div>']]);
 else b='<div class="sel" style="display:inline-block;margin-bottom:14px;padding:7px 14px">0/3 assignments created this month</div>'+secs([["Basic Information","Title & description",'<div class="fl">'+fld("Assignment title","e.g. React Hooks Assignment")+'<div><div class="rte"><span>H1</span><span>H2</span><span>Aa</span><span>B</span><span><i>I</i></span><span><u>U</u></span><span><s>S</s></span></div><textarea class="in" rows="5" style="border-radius:0 0 10px 10px" placeholder="Describe the task, requirements and expected output…"></textarea></div></div>'],["Deadline & Marks","Due date, marks and late policy",'<div class="f2">'+fld("Select batch","",["FS-2026-A","DS-2026-B","UI-2026-C"])+fld("Due date","08 Nov 2026, 11:59 PM")+fld("Total marks","20")+fld("Late submission","",["Not allowed","10% penalty","Allowed"])+'</div>'],["Attachments","Starter files & references",dz("Drag and drop files here","Starter code, datasets, PDFs")]]);
 return h+b};
TP.courses=function(){var c=[["Full Stack Web Development","12 modules","FS-2026-A","Published",78],["Data Science with Python","10 modules","DS-2026-B","Published",71],["UI/UX Design Bootcamp","8 modules","UI-2026-C","Published",84],["Cloud & DevOps Essentials","9 modules","CL-2026-E","Draft",30],["Core Java & DSA","14 modules","JV-2025-D","Published",92]];return H("CONTENT MANAGEMENT","Course Management","Organise courses and modules",["7 courses"],B("+ Create Course","p","Create Course"))+G("repeat(auto-fit,minmax(260px,1fr))",c.map(function(x){return'<div class="pn"><div class="sp"><div class="ri" style="width:38px;height:38px;border-radius:10px;background:var(--ic);display:grid;place-items:center">'+ic("book")+'</div>'+bg(x[3],x[3]=="Published"?"ok":"warn")+'</div><b style="display:block;margin:12px 0 2px;font-size:15px">'+x[0]+'</b><small class="muted">'+x[1]+' · '+x[2]+'</small><div style="margin:12px 0 4px">'+pbar(x[4])+'</div><div class="sp"><small class="muted">'+x[4]+'% complete</small><button class="btn sm" data-act="Edit modules">Edit modules</button></div></div>'}))};
TP.assess=function(){return H("ASSESSMENTS","Assessments","Create quizzes and assignments, review submissions",["12 quizzes","18 assignments"],B("+ Create Quiz","p","quiz")+B("+ Create Assignment","","Create Assignment"))+chips(["Quizzes","Assignments","Submissions"],0)+T(["Title","Batch","Questions","Difficulty","Due","Attempts","Status"],[["<b>JavaScript Closures</b>","FS-2026-A","10",bg("Medium","warn"),"5 Nov","24/28",bg("Active","ok")],["<b>SQL Fundamentals</b>","DS-2026-B","15",bg("Easy","ok"),"6 Nov","21/24",bg("Active","ok")],["<b>React State</b>","FS-2026-A","12",bg("Hard","bad"),"9 Nov","—",bg("Scheduled")],["<b>Figma Basics</b>","UI-2026-C","8",bg("Easy","ok"),"2 Nov","18/18",bg("Closed")],["<b>Docker Concepts</b>","CL-2026-E","10",bg("Medium","warn"),"12 Nov","—",bg("Draft","warn")]])};
var ATT=[];TP.att=function(){ATT=ST.slice(0,10).map(function(n,i){return[n,i%5==3?"A":i%7==2?"L":"P"]});return H("ATTENDANCE","Attendance","Mark and review attendance — click a status to change it",["FS-2026-A · 3 Nov"],B("Save Attendance","p","Attendance saved"))+'<div id="attsum"></div>'+'<div class="tw"><table><thead><tr><th>Student</th><th>Status</th><th>Attendance (month)</th></tr></thead><tbody id="attb"></tbody></table></div>'};
TP.doubts=function(){return H("DOUBTS MANAGEMENT","Doubts","Answer student doubts",["3 pending"])+chatShell([["Aarav Sharma","Why does useEffect run twice?"],["Diya Patel","Difference between == and ==="],["Rohan Mehta","Stuck on SQL JOIN query"],["Ananya Iyer","Thanks sir, got it! ✓"]],'<div class="m">Sir, why does my useEffect run twice in development?</div><div class="m">I am on React 18 with StrictMode.</div>',"dch")};
TP.fb=function(){return H("FEEDBACK","Learner Feedback","Read feedback from your students",["4.7 ★ average"])+S([["star","Average Rating","4.7 / 5","Last 30 days","+0.2"],["msg","Responses","86","This month"],["users","Would Recommend","94%"],["target","Clarity Score","4.8"]])+G("1fr 2fr",[P("Rating split","",donut([["5 stars",62],["4 stars",25],["3 stars",9],["1–2 stars",4]])),P("Recent comments","",R("star","\\"Excellent explanations of closures!\\"","Aarav S. · FS-2026-A · ★★★★★")+R("star","\\"Loved the live coding. Slightly fast pace.\\"","Diya P. · FS-2026-A · ★★★★☆")+R("star","\\"Please share slides before class.\\"","Meera J. · UI-2026-C · ★★★★☆")+R("star","\\"Great doubt-clearing sessions.\\"","Rahul V. · DS-2026-B · ★★★★★"))])};
TP.live=function(){return H("LIVE CLASSES","Live Dashboard","Start and run live sessions",["46 sessions"],'<span id="lvb">'+B("▶ Start Live Session","g","golive")+'</span>')+'<div id="lvp"></div>'+G("2fr 1fr",[P("Session History","",T(["Session","Batch","Date","Duration","Attended","Recording"],[["<b>React Components</b>","FS-2026-A","2 Nov","1h 28m","26/28",bg("Available","ok")],["<b>Pandas Workshop</b>","DS-2026-B","1 Nov","1h 35m","22/24",bg("Available","ok")],["<b>Design Critique</b>","UI-2026-C","30 Oct","1h 02m","17/18",bg("Available","ok")],["<b>Doubt Clearing</b>","CL-2026-E","29 Oct","0h 45m","19/22",bg("Processing","warn")]])),P("Upcoming","",R("clock","Pandas Workshop","Today 2:00 PM")+R("clock","Design Critique","Today 5:30 PM")+R("clock","Doubt Clearing","Today 7:00 PM"))])};
TP.sreports=function(){return H("REPORTS & ANALYTICS","Student Reports","Per-student progress reports",["123 students"],B("⬇ Export CSV","","Exported CSV"))+sb("Search students…")+T(["Student","Batch","Attendance","Quiz avg","Assignments","Overall","Grade"],ST.map(function(n,i){var a=96-i*4,q=88-i*3+(i%3)*4,o=Math.round((a+q)/2);return[av(n),BATCHES[i%3][0],pbar(a),q+"%",(9-Math.floor(i/3))+"/9",pbar(o),bg(o>=85?"A":o>=75?"B":o>=60?"C":"D",o>=75?"ok":o>=60?"warn":"bad")]}))};
TP.breports=function(){return H("REPORTS & ANALYTICS","Batch Reports","Batch-level performance",["5 batches"])+G("1fr 1fr",[P("Completion by batch","%",bars([78,71,84,92,46],["FS-A","DS-B","UI-C","JV-D","CL-E"])),P("Attendance trend","LAST 6 WEEKS",line([86,88,84,90,92,91],["W1","W2","W3","W4","W5","W6"]))])+T(["Batch","Students","Avg score","Attendance","Assignments done","At risk"],BATCHES.map(function(b,i){return["<b>"+b[0]+"</b>",b[2],(70+i*4)+"%",(84+i*2)+"%",(80-i*5)+"%",bg((5-i)+"",i>2?"ok":"warn")]}))};
TP.perf=function(){return H("REPORTS & ANALYTICS","Performance Analysis","Performance across learners",["Nov 2026"])+S([["chart","Avg. Score","76%","+4% vs Oct","+4%"],["award","Top Performers","18","Score ≥ 90%"],["target","At Risk","9","Score < 50%","-2"],["check","Pass Rate","91%"]])+G("2fr 1fr",[P("Monthly average score","",line([64,68,66,72,74,76],["Jun","Jul","Aug","Sep","Oct","Nov"])),P("Score distribution","",donut([["90+",15],["75–89",38],["60–74",32],["<60",15]]))])+G("1fr 1fr",[P("Top 5","",ST.slice(0,5).map(function(n,i){return R("award",n,"Batch "+BATCHES[i%3][0],(97-i*2)+"%","ok")}).join("")),P("Needs attention","",ST.slice(7,12).map(function(n,i){return R("target",n,"Batch "+BATCHES[i%3][0],(52-i*3)+"%","bad")}).join(""))])};
TP.skill=function(){var sk=["JavaScript","React","Node.js","SQL","Git","Python","Testing","DevOps"],bt=["FS-A","DS-B","UI-C","JV-D","CL-E"];return H("REPORTS & ANALYTICS","Skill Analytics","Skill-level analytics for your batches",["8 skills tracked"])+G("1.3fr 1fr",[P("Skill heatmap","SCORE %",heat(sk,bt,7)),P("Skill gaps","",sk.slice(0,6).map(function(s,i){return'<div style="margin-bottom:12px"><div class="sp"><b style="font-size:13px">'+s+'</b><small class="muted">'+(86-i*7)+'%</small></div>'+pbar(86-i*7)+'</div>'}).join(""))])};

var TR=["Rajesh Kumar","Neha Kapoor","Suresh Rao","Pooja Bhatt","Amit Trivedi"];
function gen(ey,t,sub,btn,stats,chipsA,cols,rows,extra){return H(ey,t,sub,[],btn?B(btn,"p",btn):"")+(stats?S(stats):"")+(chipsA?chips(chipsA,0):"")+sb("Search…")+T(cols,rows)+(extra||"")}
var AP={};
AP.dash=function(){return H("ADMIN PORTAL","Good Afternoon, Admin!","Manage users, courses & platform performance at a glance",["1,284 users","46 courses","7 approvals"])+S([["users","Total Users","1,284","All registered accounts","+42"],["book","Active Courses","46","Currently running"],["clock","Pending Approvals","7","Awaiting review"],["dollar","Revenue (MTD)","$48.2K","This month, USD","+12%"]])+S([["award","Total Trainers","38","Active on platform"],["users","Total Students","1,206","Enrolled learners"],["layers","Active Batches","61","Running now"],["shield","Admins","6","Platform administrators"]])+G("1.4fr 1.4fr 1fr",[P("Recent Users","View all",ST.slice(0,4).map(function(n,i){return R("users",n,["Student","Student","Trainer","Student"][i]+" · joined today",i==2?"Pending":"Active",i==2?"warn":"ok")}).join("")),P("Recent Courses","View all",R("book","Cloud & DevOps Essentials","by Rajesh Kumar","Draft","warn")+R("book","Generative AI for Developers","by Neha Kapoor","Review","warn")+R("book","Advanced SQL","by Suresh Rao","Live","ok")),P("Pending Approvals","",R("clock","Course: Gen AI","Neha K.","Review")+R("clock","Trainer: Amit T.","New","Review"))])+G("2fr 1.4fr 1fr",[P("User Growth","6 MONTHS",line([780,860,940,1040,1180,1284],["Jun","Jul","Aug","Sep","Oct","Nov"])),P("Recent Activity","TODAY",'<div class="tl"><div class="d"><b>Batch FS-2026-A</b><br><small class="muted">Live session started · 10:00</small></div><div><b>New trainer registered</b><br><small class="muted">Amit Trivedi · 09:40</small></div><div class="d"><b>12 certificates issued</b><br><small class="muted">JV-2025-D · 09:10</small></div></div>'),P("November 2026","",cal({3:1,10:1,18:1}))])};
AP.org=function(){return H("ORGANISATION MANAGER","Organisation Overview","See the shape of your organisation at a glance",["3 branches"])+S([["bld","Branches","3"],["users","Departments","9"],["users","Members","1,284"],["layers","Active Programs","14"]])+G("1fr 1fr",[P("Members by role","",donut([["Students",72],["Trainers",14],["Managers",9],["Admins",5]])),P("Branches","",R("bld","Bengaluru HQ","612 members","Main","ok")+R("bld","Hyderabad","402 members","Active","ok")+R("bld","Pune","270 members","Active","ok"))])};
AP.access=function(){var r=[["Super Admin","6","All permissions"],["Trainer","38","Courses, batches, assessments"],["Student","1,206","Learning access"],["Manager","9","Reports, approvals"]];return H("ACCESS CONTROL","Roles & Permissions","Manage roles and permissions",[],B("+ New Role","p","New Role"))+T(["Role","Users","Permissions","Manage Courses","Manage Users","View Reports"],r.map(function(x,i){return["<b>"+x[0]+"</b>",x[1],x[2],'<button class="tg'+(i<2?" on":"")+'" data-tg></button>','<button class="tg'+(i==0?" on":"")+'" data-tg></button>','<button class="tg'+(i!=2?" on":"")+'" data-tg></button>']}))};
AP.courses=function(){return gen("COURSE MANAGEMENT","All Courses","Manage courses across the platform","+ Add Course",[["book","Total Courses","46"],["check","Published","39"],["clock","In Review","7"]],["All","Published","Draft","Review"],["Course","Trainer","Learners","Rating","Status"],[["<b>Full Stack Web Development</b>",TR[0],"312","4.8 ★",bg("Published","ok")],["<b>Data Science with Python</b>",TR[1],"268","4.7 ★",bg("Published","ok")],["<b>UI/UX Design Bootcamp</b>",TR[3],"204","4.9 ★",bg("Published","ok")],["<b>Generative AI for Developers</b>",TR[1],"—","—",bg("Review","warn")],["<b>Cloud & DevOps Essentials</b>",TR[0],"—","—",bg("Draft")]])};
AP.videos=function(){return gen("VIDEO MANAGEMENT","Admin Videos","Manage learning videos","⬆ Upload",[["video","Videos","412"],["clock","Hours","286h"],["users","Views","48K"]],0,["Title","Course","Duration","Views","Status"],[["<b>React Hooks Deep Dive</b>","Full Stack","48:10","2,140",bg("Ready","ok")],["<b>SQL Joins Explained</b>","Data Science","41:05","1,860",bg("Ready","ok")],["<b>Figma Auto-Layout</b>","UI/UX","52:30","970",bg("Ready","ok")],["<b>Git Branching</b>","DevOps","29:48","—",bg("Processing","warn")]])};
AP.files=function(){return gen("FILE MANAGEMENT","Admin Files","Manage shared learning files","⬆ Upload",[["folder","Files","1,096"],["file","Storage Used","38.4 GB","of 100 GB"]],0,["Name","Type","Size","Uploaded by","Date"],[["<b>Module-6-Notes.pdf</b>","PDF","2.4 MB",TR[0],"2 Nov"],["<b>Capstone-Rubric.docx</b>","DOC","120 KB",TR[1],"27 Oct"],["<b>API-Design-Slides.pptx</b>","PPT","8.1 MB",TR[0],"29 Oct"],["<b>Dataset-Titanic.csv</b>","CSV","1.2 MB",TR[1],"20 Oct"]])};
AP.live=function(){return gen("LIVE & RECORDED","Live Sessions","Monitor live training sessions",0,[["play","Live Now","3"],["cal","Today","11"],["video","Recordings","284"]],["Live","Scheduled","Completed"],["Session","Trainer","Batch","Time","Participants","Status"],[["<b>React Components</b>",TR[0],"FS-2026-A","10:00","26",bg("● Live","ok")],["<b>Pandas Workshop</b>",TR[1],"DS-2026-B","14:00","—",bg("Scheduled")],["<b>Design Critique</b>",TR[3],"UI-2026-C","17:30","—",bg("Scheduled")],["<b>Java Streams</b>",TR[2],"JV-2025-D","09:00","29",bg("Completed")]])};
AP.assess=function(){return gen("ASSESSMENT SYSTEM","Assessment System","Oversee assessments across batches",0,[["clip","Quizzes","142"],["file","Assignments","218"],["check","Avg. Pass Rate","88%"]],0,["Assessment","Type","Batch","Attempts","Avg score","Status"],[["<b>JavaScript Closures</b>","Quiz","FS-2026-A","24","74%",bg("Active","ok")],["<b>SQL Fundamentals</b>","Quiz","DS-2026-B","21","82%",bg("Active","ok")],["<b>REST API Project</b>","Assignment","FS-2026-A","18","79%",bg("Open","warn")],["<b>Figma Basics</b>","Quiz","UI-2026-C","18","91%",bg("Closed")]])};
AP.certs=function(){return gen("DOCUMENT GENERATOR","Certificates","Issue and review certificates","+ Issue Certificate",[["award","Issued","892"],["clock","This Week","34"],["check","Verified","100%"]],0,["Learner","Course","Issued","Certificate ID","Download"],ST.slice(0,5).map(function(n,i){return[av(n),["Full Stack","Data Science","UI/UX","Core Java","Full Stack"][i],(3-i%3)+" Nov","ILM-2026-"+(4021+i),'<button class="btn sm" data-act="Download">⬇ PDF</button>']}))};
AP.reports=function(){return H("DOCUMENT GENERATOR","Reports","Organisation reports",[],B("⬇ Export","","Exported"))+S([["users","User Growth","+18%","vs last quarter"],["dollar","Revenue Trend","$48.2K","MTD","+12%"],["chart","Course Performance","86%","Avg completion"],["play","Active Sessions","11","Today"]])+G("1fr 1fr",[P("Revenue","MONTHLY $K",bars([22,28,31,36,42,48],["Jun","Jul","Aug","Sep","Oct","Nov"])),P("Completion by course","%",["Full Stack:78","Data Science:71","UI/UX:84","Java:92"].map(function(x){x=x.split(":");return'<div style="margin-bottom:12px"><div class="sp"><b style="font-size:13px">'+x[0]+'</b><small class="muted">'+x[1]+'%</small></div>'+pbar(+x[1])+'</div>'}).join(""))])};
AP.usage=function(){return H("INSIGHT REVIEW","Usage Analytics","See how the platform is being used",["Last 30 days"])+S([["users","Daily Active","612","+9%","+9%"],["clock","Avg. Session","38 min"],["play","Live Minutes","92K"],["video","Video Views","18.4K"]])+G("2fr 1fr",[P("Daily active users","",line([540,566,590,574,602,598,612],["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])),P("Device split","",donut([["Desktop",58],["Mobile",34],["Tablet",8]]))])};
AP.skill=function(){return H("INSIGHT REVIEW","Skill Analytics","Skill coverage and gaps",[])+G("1.3fr 1fr",[P("Skill heatmap","SCORE %",heat(["JavaScript","Python","SQL","Design","Cloud","Testing"],["Eng","Data","Design","Ops","Sales"],11)),P("Top gaps","",["Testing:48","Cloud:57","SQL:63","Design:70"].map(function(x){x=x.split(":");return'<div style="margin-bottom:12px"><div class="sp"><b style="font-size:13px">'+x[0]+'</b><small class="muted">'+x[1]+'%</small></div>'+pbar(+x[1])+'</div>'}).join(""))])};
AP.fbk=function(){return H("INSIGHT REVIEW","Feedback Review","Review learner feedback",["4.6 ★ avg"])+S([["star","Average","4.6"],["msg","Responses","312"],["users","Recommend","92%"]])+P("Latest","",R("star","\\"Trainer explains very clearly\\"","Aarav S. · Full Stack","★★★★★","ok")+R("star","\\"More practice problems please\\"","Diya P. · Data Science","★★★★☆")+R("star","\\"Audio dropped in the last class\\"","Rohan M. · UI/UX","★★★☆☆","warn"))};
AP.att=function(){return gen("INSIGHT REVIEW","Attendance","Track training attendance",0,[["check","Avg. Attendance","89%"],["users","Present Today","962"],["clock","Late","41"]],0,["Batch","Trainer","Students","Present","Rate"],BATCHES.map(function(b,i){return["<b>"+b[0]+"</b>",TR[i],b[2],(+b[2]-i)+"",pbar(95-i*3)]}))};
AP.set=function(){var r=function(a,b,on){return'<div class="kv"><div><b style="font-size:13.5px">'+a+'</b><br><small class="muted">'+b+'</small></div><button class="tg'+(on?" on":"")+'" data-tg></button></div>'};return H("INSIGHT REVIEW","Organisation Settings","Configure organisation-level settings",[],B("Save changes","p","Settings saved"))+G("1fr 1fr",[P("General",'',' <div class="fl"><label>Organisation name<input class="in" value="Texora Learning Pvt Ltd"></label><label>Support email<input class="in" value="support@texora.ai"></label><label>Timezone<select class="in"><option>Asia/Kolkata (IST)</option></select></label></div>'),P("Preferences","",r("Email notifications","Weekly digests to admins",1)+r("Two-factor authentication","Require 2FA for admins",1)+r("Allow self sign-up","Learners can register themselves",0)+r("Public certificates","Verifiable certificate links",1))])};
/* corporate */
var CO={};
CO.dash=function(){return H("CORPORATE PORTAL","Welcome back, HR Team","Manage your organisation, teams & learning programs at a glance",["842 employees","9 departments"])+S([["users","Employees","842","Across all branches","+16"],["layers","Departments","9","Active teams"],["bld","Branches","3","Office locations"],["book","Active Programs","14","Learning programs running"]])+S([["chart","Completion Rate","81%","Across programs","+5%"],["clock","Training Hours","3,120","This month"],["award","Certificates","286","Issued"],["shield","Open Approvals","5","Awaiting review"]])+G("1.4fr 1.4fr 1fr",[P("Departments","View all",["Engineering:214","Sales:168","Operations:142","HR & Admin:64","Finance:58"].map(function(x){x=x.split(":");return R("layers",x[0],x[1]+" employees")}).join("")),P("Learning by Department","THIS MONTH",bars([88,74,81,92,69],["Eng","Sales","Ops","HR","Fin"])),P("Pending Approvals","",R("clock","Leadership Program","Sales · 12 seats","Review")+R("clock","Safety Refresher","Ops · 40 seats","Review"))])+G("2fr 1.4fr 1fr",[P("Key Reports","ORGANISATION",'<div class="sg" style="margin:0">'+[["Skill Coverage","74%"],["Training Attendance","91%"],["Completion","81%"],["Active Learners","603"]].map(function(x){return'<div class="sk"><b>'+x[1]+'</b><span>'+x[0]+'</span></div>'}).join("")+'</div>',"View Full Reports"),P("Upcoming Training","TODAY",R("clock","POSH Awareness","11:00 AM · Auditorium")+R("clock","Excel for Finance","03:00 PM · Online")+R("clock","Leadership Lab","05:00 PM · Room 4")),P("November 2026","",cal({3:1,6:1,12:1,20:1}))])};
CO.ws=function(){return TP.workspace()};CO.org=AP.org;CO.access=AP.access;CO.certs=AP.certs;CO.reports=AP.reports;CO.usage=AP.usage;CO.skill=AP.skill;CO.set=AP.set;
CO.br=function(){return gen("ORGANISATION","Branches","Office locations","+ Add Branch",[["bld","Branches","3"],["users","Employees","842"]],0,["Branch","City","Employees","Head","Status"],[["<b>HQ</b>","Bengaluru","412","Anita Rao",bg("Active","ok")],["<b>South Hub</b>","Hyderabad","248","Vivek Nair",bg("Active","ok")],["<b>West Office</b>","Pune","182","Mansi Shah",bg("Active","ok")]])};
CO.dep=function(){return gen("ORGANISATION","Departments","Active teams","+ Add Department",[["layers","Departments","9"],["users","Avg. Team Size","94"]],0,["Department","Head","Employees","Training completion","Skill coverage"],[["<b>Engineering</b>","Kiran Shetty","214",pbar(88),pbar(78)],["<b>Sales</b>","Rhea Kapoor","168",pbar(74),pbar(66)],["<b>Operations</b>","Dev Malhotra","142",pbar(81),pbar(72)],["<b>HR & Admin</b>","Anita Rao","64",pbar(92),pbar(80)],["<b>Finance</b>","Sanjay Iyer","58",pbar(69),pbar(61)]])};
CO.emp=function(){return gen("PEOPLE","Employees","Employee directory","+ Add Employee",[["users","Employees","842"],["check","Active Learners","603"],["award","Certified","286"]],0,["Employee","Department","Branch","Programs","Completion","Status"],ST.slice(0,8).map(function(n,i){return[av(n),["Engineering","Sales","Operations","Finance"][i%4],["Bengaluru","Hyderabad","Pune"][i%3],(i%4+1)+"",pbar(90-i*6),bg(i==5?"On leave":"Active",i==5?"warn":"ok")]}))};
CO.courses=function(){return gen("LEARNING","Courses","Corporate learning programs","+ Add Program",[["book","Programs","14"],["users","Enrolled","1,920"]],["All","Mandatory","Skill","Leadership"],["Program","Type","Enrolled","Completion","Due","Status"],[["<b>POSH Awareness</b>","Mandatory","842",pbar(96),"30 Nov",bg("Active","ok")],["<b>Cyber-security Basics</b>","Mandatory","842",pbar(88),"15 Dec",bg("Active","ok")],["<b>Leadership Lab</b>","Leadership","48",pbar(54),"20 Dec",bg("Active","ok")],["<b>Excel for Finance</b>","Skill","58",pbar(71),"10 Nov",bg("Closing","warn")]])};
CO.assess=function(){return AP.assess()};
CO.att=AP.att;

var AS={};
function tabs(id,l){var s=AS[id]||0;return'<div class="tb" style="margin-bottom:14px">'+l.map(function(x,i){return'<button class="ch'+(i==s?" on":"")+'" data-st="'+i+'">'+x+'</button>'}).join("")+'</div>'}
function addBtn(t,f){return'<button class="btn p" data-add="'+t+'" data-form="'+f+'">+ '+t+'</button>'}
var FORMS={
dept:'<div class="f2">'+fld("Department Name *","Enter department name")+fld("Department Head *","e.g. Dr. Rahul Sharma")+fld("Branch","",["Bengaluru HQ","Hyderabad","Pune"])+'</div>',
branch:'<div class="f2">'+fld("Branch Name *","e.g. Patna Main Campus")+fld("City *","e.g. Patna")+fld("Department","",["All departments","Engineering","Design"])+'</div>',
batch:'<div class="f2">'+fld("Batch Name *","Enter batch name")+fld("Branch *","",["Bengaluru HQ","Hyderabad","Pune"])+fld("Department","",["Engineering","Design","Data"])+fld("Trainer","",["Not assigned","Rajesh Kumar","Neha Kapoor"])+'</div>',
user:'<div class="tb"><span class="ch on">Basic Info</span><span class="ch">Student Profile</span><span class="ch">Trainer Profile</span></div><div class="f2">'+fld("Full Name *","e.g. Rahul Sharma")+fld("Email *","user@email.com")+fld("Password *","Min 8 chars, mixed symbols")+fld("Role","",["Student","Trainer","Admin"])+fld("Mobile","+91 98765 43210")+fld("City","Bengaluru")+'</div><div class="mt"><div class="pb warn"><i style="width:50%"></i></div><small class="muted">Password strength: Fair</small></div>',
course:'<div class="f2">'+fld("Course Name","e.g. React for Beginners")+fld("Category","",["Web Development","Data Science","Design"])+fld("Assign Trainer","",["Rajesh Kumar","Neha Kapoor","Suresh Rao"])+'</div><div class="mt">'+fld("Description","area")+'</div>',
cat:'<div class="f2">'+fld("Category Name","e.g. Web Development")+'</div>',
cert:'<div class="tb"><span class="ch on">Generate</span><span class="ch">Upload</span></div><div class="f2">'+fld("Student Email","student@example.com")+fld("Student Name","e.g. Aarav Sharma")+fld("Course Name","e.g. React for Beginners")+fld("Certificate Type","",["Completion","Excellence","Participation"])+'</div>'};
var NM=["Aarav Sharma","Diya Patel","Rohan Mehta","Ananya Iyer","Vikram Singh","Sneha Reddy","Karan Malhotra","Priya Nair"];
AP.org=function(){var t=AS.org||0,cols=[["Department","Head","Branches","Batches","Students"],["Branch","City","Departments","Batches","Students"],["Batch","Branch","Trainer","Students","Status"],["User","Email","Role","Branch","Status"]][t],rows=[
 [["Engineering","Kiran Shetty","3","18","412"],["Design","Pooja Bhatt","2","8","168"],["Data Science","Neha Kapoor","3","14","276"],["Cloud & DevOps","Suresh Rao","2","9","142"]],
 [["Bengaluru HQ","Bengaluru","6","28","612"],["Hyderabad","Hyderabad","5","19","402"],["Pune","Pune","4","14","270"]],
 [["FS-2026-A","Bengaluru HQ","Rajesh Kumar","28",bg("Running","ok")],["DS-2026-B","Hyderabad","Neha Kapoor","24",bg("Running","ok")],["UI-2026-C","Pune","Pooja Bhatt","18",bg("Running","ok")],["CL-2026-E","Bengaluru HQ","—","22",bg("No trainer","warn")]],
 NM.slice(0,5).map(function(n,i){return[av(n),n.split(" ")[0].toLowerCase()+"@texora.ai",["Student","Student","Trainer","Student","Admin"][i],["Bengaluru","Hyderabad","Pune"][i%3],bg("Active","ok")]})][t];
 return H("ADMIN PORTAL","Organisation Management","Departments, branches, batches and users in one place",["Plan: Growth"],'')+
 P("Organisation Setup Progress","OVERALL 86%",'<div class="sg" style="margin:0 0 12px">'+[["Departments","Done"],["Branches","Done"],["Batches","Done"],["Users","In progress"]].map(function(x,i){return'<div class="sk"><b style="font-size:16px">'+(i<3?"✓":"…")+' '+x[0]+'</b><small>'+x[1]+'</small></div>'}).join("")+'</div>'+pbar(86,"ok")+'<div class="mt">'+B("Continue Setup","p","Continue Setup")+'</div>')+'<div style="height:14px"></div>'+
 S([["layers","Departments","9"],["map","Branches","3"],["layers","Batches","61"],["users","Users","1,284"]])+
 '<div class="sp" style="margin-bottom:10px;flex-wrap:wrap">'+tabs("org",["Departments","Branches","Batches","Users"])+'<div class="tb"><select class="in" style="min-width:150px"><option>All Departments</option></select><select class="in" style="min-width:140px"><option>All Branches</option></select><select class="in" style="min-width:120px"><option>All Roles</option></select>'+addBtn("Add New",["dept","branch","batch","user"][t])+'</div></div>'+sb("Search…")+T(cols,rows.map(function(r){return r.map(function(c,i){return i==0&&c.indexOf("<")<0?"<b>"+c+"</b>":c})}))};
AP.users=function(){return H("ORGANISATION MANAGER","All Users","Manage every account in your organisation",["1,284 users"],addBtn("Add User","user"))+S([["users","Total Users","1,284"],["award","Trainers","38"],["users","Students","1,206"],["shield","Admins","6"]])+chips(["All","Admins","Trainers","Students"],0)+sb("Search users…")+T(["User","Email","Role","Joined","Status",""],NM.map(function(n,i){var r=i==2?"Trainer":i==6?"Admin":"Student";return[av(n),n.split(" ")[0].toLowerCase()+"@texora.ai",bg(r,r=="Student"?"":"warn"),(3-i%3)+" Nov",bg(i==4?"Invited":"Active",i==4?"warn":"ok"),i==4?'<button class="btn sm" data-act="Set-password email sent">Resend set-password email</button>':'<button class="btn sm" data-act="Edit user">Edit</button>']}))};
AP.dept=function(){return H("ORGANISATION MANAGER","Department Management","All departments in your organisation",[],addBtn("Add Department","dept"))+T(["Department","Head","Branches","Batches","Students"],[["<b>Engineering</b>","Kiran Shetty","3","18","412"],["<b>Design</b>","Pooja Bhatt","2","8","168"],["<b>Data Science</b>","Neha Kapoor","3","14","276"],["<b>Cloud & DevOps</b>","Suresh Rao","2","9","142"]])};
AP.branch=function(){return H("ORGANISATION MANAGER","Branch Management","All branches",[],addBtn("Add Branch","branch"))+sb("Search branches…")+T(["Branch","City","Departments","Batches","Status"],[["<b>Bengaluru HQ</b>","Bengaluru","6","28",bg("Active","ok")],["<b>Hyderabad</b>","Hyderabad","5","19",bg("Active","ok")],["<b>Pune</b>","Pune","4","14",bg("Active","ok")]])};
AP.batch=function(){return H("ORGANISATION MANAGER","Batch Management","Create batches and assign trainers & students",[],addBtn("Create Batch","batch"))+P("How it works","",'<div class="sg" style="margin:0">'+["Create a batch","Assign trainer to batch","Assign students under trainer"].map(function(x,i){return'<div class="sk"><b>'+(i+1)+'</b><span>'+x+'</span></div>'}).join("")+'</div>')+'<div style="height:14px"></div><div class="t" style="margin-bottom:8px"><b>Existing Batches</b></div>'+sb("Search batches…")+T(["Batch","Branch","Trainer","Students","Status"],[["<b>FS-2026-A</b>","Bengaluru HQ","Rajesh Kumar","28",bg("Running","ok")],["<b>DS-2026-B</b>","Hyderabad","Neha Kapoor","24",bg("Running","ok")],["<b>UI-2026-C</b>","Pune","Pooja Bhatt","18",bg("Running","ok")],["<b>CL-2026-E</b>","Bengaluru HQ",bg("Trainer not assigned","warn"),"22",bg("Starting","warn")]])};
AP.courses=function(){var t=AS.courses||0;return H("COURSE MANAGEMENT","All Courses","Create, assign and manage all courses in your organisation",["46 courses"],addBtn(t?"Add Category":"Create Course",t?"cat":"course"))+S([["book","Total Courses","46"],["check","Published","39"],["award","Trainers","38"],["list","Categories","8"]])+tabs("courses",["Course List","Category List"])+sb("Search…")+(t?T(["Category","Courses","Status"],[["<b>Web Development</b>","14",bg("Active","ok")],["<b>Data Science</b>","9",bg("Active","ok")],["<b>Design</b>","7",bg("Active","ok")],["<b>Cloud & DevOps</b>","6",bg("Active","ok")],["<b>Legacy</b>","2",bg("Inactive")]]):T(["Course","Category","Trainer","Learners","Status"],[["<b>Full Stack Web Development</b>","Web Development","Rajesh Kumar","312",bg("Assigned","ok")],["<b>Data Science with Python</b>","Data Science","Neha Kapoor","268",bg("Assigned","ok")],["<b>UI/UX Design Bootcamp</b>","Design","Pooja Bhatt","204",bg("Assigned","ok")],["<b>Cloud & DevOps Essentials</b>","Cloud & DevOps","—","—",bg("Unassigned","warn")]]))};
var PERM={Assessment:["Create & manage quizzes","Create & manage assignments","Create & manage coding problems","Create & manage study plans"],Attendance:["Mark student attendance","View marked attendance history","Download attendance report"],Batch:["View my batches","View students in batch","Trainer dashboard"],Chat:["View students to message","Send message","View conversation"],Feedback:["View my feedback","View feedback by batch","View feedback summary"],Notebook:["Create notebook","Update notebook","Delete notebook"]},PERMS={Assessment:["Attempt quizzes","Submit assignments","Solve coding problems","Access study plans"],Attendance:["View monthly attendance","View attendance history"],Batch:["View my batch","View classroom"],Chat:["Send message","View conversation"],Feedback:["Submit feedback","Check feedback status"],Notebook:["View my notebooks","Create notebook"]};
AP.access=function(){var t=AS.access||0,src=t?PERMS:PERM;return H("ACCESS CONTROL","Access Control","Manage role-based permissions",[],B("Save changes","p","Permissions saved"))+tabs("access",["TRAINERS","STUDENTS"])+G("1fr 1fr",Object.keys(src).map(function(g,gi){return P(g,src[g].length+" PERMISSIONS",src[g].map(function(x,i){return'<div class="kv"><span>'+x+'</span><button class="tg'+((i+gi)%4?" on":"")+'" data-tg></button></div>'}).join(""))}))};
AP.assess=function(){var t=AS.assess||0,n=["Quiz","Assignment","Coding Problem","Study Plan"][t];return H("ASSESSMENT SYSTEM","Assessment System","Manage all "+n.toLowerCase()+"s created by trainers",["LIVE"])+tabs("assess",["Quiz","Assignment","Coding Problem","Study Plan"])+S([["clip","Total","142"],["check","Active","96"],["users","Attempts","3,820"]])+sb("Search…")+T(["Title","Creator","Questions","Attempts","Deadline","Submissions","Created","Total Marks"],[["<b>JavaScript Closures</b>","Rajesh Kumar","10","24","5 Nov","24/28","28 Oct","20"],["<b>SQL Fundamentals</b>","Neha Kapoor","15","21","6 Nov","21/24","25 Oct","30"],["<b>React State</b>","Rajesh Kumar","12","—","9 Nov","—","1 Nov","25"],["<b>Figma Basics</b>","Pooja Bhatt","8","18","2 Nov","18/18","20 Oct","16"]])};
AP.live=function(){var t=AS.live||0;return H("LIVE & RECORDED CONTENT",t?"Admin Recorded Videos":"Admin Live Sessions","Drag rows to reorder",["LIVE"])+tabs("live",["Live Sessions","Recorded Videos"])+S([["play","Active","3"],["cal","Scheduled","8"],["check","Completed","284"]])+T(["Session","Trainer","Batch","Date","Status"],[["<b>React Components</b>","Rajesh Kumar","FS-2026-A","3 Nov · 10:00",bg(t?"Ready":"Active","ok")],["<b>Pandas Workshop</b>","Neha Kapoor","DS-2026-B","3 Nov · 14:00",bg(t?"Ready":"Scheduled","warn")],["<b>Design Critique</b>","Pooja Bhatt","UI-2026-C","2 Nov · 17:30",bg(t?"Ready":"Completed")],["<b>Doubt Clearing</b>","Suresh Rao","CL-2026-E","1 Nov · 19:00",bg(t?"Processing":"Ended")]])};
AP.att=function(){var t=AS.att||0;return H("ATTENDANCE OVERVIEW","Organization Attendance","Attendance history & reports",["LIVE"])+tabs("att",["Overview","Student Report","Trainer Session Report"])+chips(["Today","Yesterday","Last 7 Days","Last 30 Days","This Month","Custom Range"],4)+S([["check","Sessions Marked","412"],["users","Students Tracked","1,206"],["chart","Avg. Attendance","89%"],["clock","Late","41"]])+(t==2?T(["Trainer","Batch","Date","Session","Status"],[["Rajesh Kumar","FS-2026-A","3 Nov","React Components",bg("Marked","ok")],["Neha Kapoor","DS-2026-B","3 Nov","Pandas Workshop",bg("Pending","warn")]]):T(["Student","Batch","Date","Status","Rate"],NM.slice(0,6).map(function(n,i){return[av(n),["FS-2026-A","DS-2026-B","UI-2026-C"][i%3],"3 Nov",bg(i==3?"Absent":i==5?"Late":"Present",i==3?"bad":i==5?"warn":"ok"),pbar(96-i*4)]})))};
function radar(v,l){var c=90,r=70,n=v.length,pt=function(i,k){var a=-Math.PI/2+i*2*Math.PI/n;return[c+Math.cos(a)*r*k,c+Math.sin(a)*r*k]},ring=function(k){return v.map(function(_,i){return pt(i,k).join(",")}).join(" ")};return'<svg class="svgc" viewBox="0 0 180 180" width="260">'+[.33,.66,1].map(function(k){return'<polygon points="'+ring(k)+'" fill="none" class="gd"/>'}).join("")+'<polygon points="'+v.map(function(x,i){return pt(i,x/100).join(",")}).join(" ")+'" fill="rgba(124,58,237,.25)" stroke="#7c3aed" stroke-width="2"/>'+l.map(function(x,i){var p=pt(i,1.18);return'<text x="'+p[0]+'" y="'+p[1]+'" text-anchor="middle">'+x+'</text>'}).join("")+'</svg>'}
AP.reports=function(){var d=AS.rep;if(d!=null){var n=TR[d];return H("ADMIN PORTAL",n+" — Progress Report","Back to all trainers",["Secure","Live Data"],B("← Back to all trainers","","backrep"))+S([["book","Courses","3"],["layers","Batches","2"],["users","Students","52"],["chart","Avg overall","78%"]])+G("1fr 1fr",[P("Progress Breakdown","",[["Video watch",82],["File download",71],["Quiz",76],["Assignment",69]].map(function(x){return'<div style="margin-bottom:12px"><div class="sp"><b style="font-size:13px">'+x[0]+'</b><small class="muted">'+x[1]+'%</small></div>'+pbar(x[1])+'</div>'}).join("")),P("Skill Radar","",radar([82,70,76,64,88,58],["JS","React","Node","SQL","Git","Test"]))])+T(["Batch","Students","Avg video","Avg quiz","Avg assignment"],[["<b>FS-2026-A</b>","28",pbar(82),pbar(76),pbar(71)],["<b>UI-2026-C</b>","24",pbar(74),pbar(80),pbar(66)]])}
 return H("ADMIN PORTAL","Reports","Progress insights for all trainers",["Live Data"])+S([["award","Total Trainers","38"],["book","Courses","46"],["layers","Batches","61"],["users","Students","1,206"]])+T(["Trainer","Courses","Batches","Students","Avg overall",""],TR.map(function(n,i){return[av(n),3-i%2,2+i%2,40-i*4,pbar(80-i*5),'<button class="btn sm" data-rep="'+i+'">View Details</button>']}))};
AP.fbk=function(){return H("FEEDBACK ANALYTICS","Feedback Analytics","Trainer & batch feedback insights",["LIVE"],B("Export CSV","","Exported")+B("Configure Alerts","","alerts"))+S([["msg","Total Feedback","1,248"],["layers","Active Batches","61"],["star","Platform Avg","4.6"],["bell","Needs Attention","3"],["users","Anonymous Rate","38%"]])+G("1fr 1fr 1fr",[P("Trainer Leaderboard","THIS MONTH",TR.slice(0,4).map(function(n,i){return R("award",n,"Avg "+(4.9-i*.2).toFixed(1)+" · "+(120-i*14)+" responses",i==0?"#1":"","ok")}).join("")),P("Batch Performance","",bars([4.8,4.6,4.7,4.3,4.5],["FS-A","DS-B","UI-C","JV-D","CL-E"])),P("Top Feedback Tags","ALL TIME",["Clear explanations:62","Great doubt clearing:48","Hands-on projects:41","Fast pace:17"].map(function(x){x=x.split(":");return R("star",x[0],x[1]+" mentions")}).join(""))])+T(["Student","Batch","Trainer","Rating","Comment","Status"],[["Aarav S.","FS-2026-A","Rajesh Kumar","★★★★★","Excellent closures session",bg("Reviewed","ok")],["Anonymous","DS-2026-B","Neha Kapoor","★★★★☆","Please share slides earlier",bg("New","warn")],["Rohan M.","UI-2026-C","Pooja Bhatt","★★☆☆☆","Audio dropped in class",bg("Flagged","bad")]])};
AP.certs=function(){return H("DOCUMENT GENERATOR","Certificates","Issue or upload certificates for students",["LIVE"],addBtn("Issue Certificate","cert"))+sb("Search templates…")+G("repeat(auto-fit,minmax(220px,1fr))",["Course Completion","Excellence Award","Participation","Internship"].map(function(x,i){return'<div class="pn"><div class="vid" style="aspect-ratio:4/3;background:linear-gradient(135deg,#fef3c7,#fde68a);color:#92400e;font-weight:700;text-align:center;padding:10px">'+ic("award")+'<br>'+x+'</div><div class="sp mt"><b>'+x+'</b><button class="btn sm p" data-add="Issue Certificate" data-form="cert">Issue Now</button></div></div>'}))+'<div class="mt">'+T(["Learner","Course","Issued","ID"],[["Aarav Sharma","Full Stack","3 Nov","ILM-2026-4021"],["Diya Patel","Data Science","2 Nov","ILM-2026-4020"]])+'</div>'};
AP.usage=function(){var t=AS.usage||0;return H("ANALYTICS","Usage Analytics","How the platform is being used",["Live"])+tabs("usage",["Dashboard","Role-wise Usage"])+chips(["Last 7 days","Last 30 days"],0)+S([["users","Daily Active Users","612","+9%","+9%"],["clock","Avg. Session Length","38 min"],["target","Peak Concurrent Users","214"],["chart","User Engagement","74%"]])+(t?G("1fr 1fr",[P("By role","",donut([["Students",71],["Trainers",18],["Admins",6],["Managers",5]])),P("Logins by role","",bars([862,148,34,41],["Student","Trainer","Admin","Mgr"]))]):G("1fr 1fr 1fr",[P("Activity Trends","",line([540,566,590,574,602,598,612],["M","T","W","T","F","S","S"])),P("Peak Hours","",bars([40,88,120,96,70,110,64],["8","10","12","14","16","18","20"])),P("Avg. Session Length (min)","",line([31,34,36,35,38,37,38],["M","T","W","T","F","S","S"]))]))};
AP.set=function(){return H("ADMIN PORTAL","Organisation Settings","Edit organisation",["Edit Mode"],B("Save Changes","p","Settings saved"))+G("1fr 2fr",[P("Logo Preview","",'<div class="vid" style="aspect-ratio:1;max-width:180px;margin:auto;background:#fff;color:#16a34a;font-weight:800;font-size:28px;border:1px solid var(--bd)">ILM</div><div class="mt" style="text-align:center">'+B("Upload logo","","Upload logo")+'</div>')+P("Organisation Details","",'<div class="f2">'+fld("Organisation Name","Texora AI")+fld("Support Email","support@texora.ai")+fld("Contact Number","+91 98765 43210")+fld("Default Timezone","",["Asia/Kolkata (IST)","UTC","America/New_York"])+'</div><div class="mt"><b style="font-size:13px">Branding · Primary Color</b><div class="tb mt">'+["#16a34a","#f97316","#2563eb","#7c3aed","#0f172a"].map(function(c,i){return'<button class="ch'+(i?"":" on")+'" style="background:'+c+';width:34px;height:34px;padding:0;border-radius:50%"></button>'}).join("")+'</div></div>')])+S([["users","Active Users","1,284"],["chart","Monthly Growth","+6.2%"]])};
AP.skill=function(){var b=["FS-A","DS-B","UI-C","JV-D","CL-E"];return H("MANAGER PANEL","Org Skill Analytics","Skill performance across all batches",[])+S([["users","Total Students","1,206"],["chart","Org Avg Score","76%","+4%","+4%"],["award","Strong Learners","412"],["target","Need Attention","96"],["layers","Active Batches","61"]])+G("1fr 1fr",[P("Org Skill Distribution","",donut([["Strong",34],["Average",46],["Needs focus",20]])),P("Org Skill Averages","",bars([82,74,70,64,58],["JS","SQL","React","Cloud","Test"]))])+G("1fr 1.3fr",[P("Org Average Score Trend (6 months)","",line([64,68,66,72,74,76],["Jun","Jul","Aug","Sep","Oct","Nov"])),P("Skill Comparison — All Batches","",heat(["JavaScript","SQL","React","Cloud","Testing"],b,5))])};
AP.files=function(){return H("FILE MANAGEMENT","File Management","All files shared by trainers",["LIVE"])+S([["file","Total Files","1,096"],["folder","Storage Used","38.4 GB"],["check","Published","1,041"]])+sb("Search by title or trainer…")+T(["File","Category","Trainer","Batch","Status","Size"],[["<b>Module-6-Notes.pdf</b>","Notes","Rajesh Kumar","FS-2026-A",bg("Published","ok"),"2.4 MB"],["<b>Dataset-Titanic.csv</b>","Dataset","Neha Kapoor","DS-2026-B",bg("Published","ok"),"1.2 MB"],["<b>Figma-Kit.zip</b>","Resource","Pooja Bhatt","UI-2026-C",bg("Draft","warn"),"18 MB"]])};
AP.videos=function(){return H("VIDEO MANAGEMENT","Video Management","All lecture videos",["LIVE"])+chips(["All Videos","Uploaded File","YouTube","Vimeo","Direct URL"],0)+S([["video","Total Videos","412"],["check","Published","388"]])+sb("Search by title or trainer…")+T(["Video","Source","Trainer","Duration","Status"],[["<b>React Hooks Deep Dive</b>","Uploaded","Rajesh Kumar","48:10",bg("Published","ok")],["<b>SQL Joins Explained</b>","YouTube","Neha Kapoor","41:05",bg("Published","ok")],["<b>Figma Auto-Layout</b>","Vimeo","Pooja Bhatt","52:30",bg("Draft","warn")]])};
CO.org=AP.org;CO.access=AP.access;CO.certs=AP.certs;CO.reports=AP.reports;CO.usage=AP.usage;CO.skill=AP.skill;CO.set=AP.set;CO.assess=AP.assess;CO.att=AP.att;

var NAV={
trainer:{tag:"TRAINER PORTAL",home:"/trainer",nav:[["dash","Dashboard","home"],["batches","Batch Management","layers"],["workspace","Workspace","cal"],["roadmap","Roadmap","map"],["ai","AI Companion","spark"],["wb","Whiteboard","pen"],["code","Coding Lab","code"],["plan","Study Plan","list"],{g:"Content Management",c:[["videos","Upload Videos","up"],["courses","Course Management","book"],["assess","Assessments","clip"],["att","Attendance","check"],["doubts","Doubts Management","msg","3"],["fb","Feedback","star"]]},{g:"Live Classes",c:[["live","Live Dashboard","play"]]},{g:"Reports & Analytics",c:[["sreports","Student Reports","users"],["breports","Batch Reports","layers"],["perf","Performance Analysis","chart"],["skill","Skill Analytics","target"]]}],pages:TP,user:["Rajesh Kumar","RK"]},
admin:{tag:"ADMIN PORTAL",home:"/admin",nav:[["dash","Dashboard","home"],["ws","WorkSpace","cal"],{g:"Organisation Manager",c:[["org","Overview","bld"],["users","All Users","users"],["dept","Departments","layers"],["branch","Branches","map"],["batch","Batches","layers"]]},["access","Access Control","shield"],["roadmap","Roadmap","map"],["assess","Assessment System","clip"],{g:"Course Management",c:[["courses","All Courses","book"]]},{g:"Video Management",c:[["videos","Admin Videos","video"]]},{g:"File Management",c:[["files","Admin Files","folder"]]},{g:"Live & Recorded Content",c:[["live","Admin Live Sessions","play"]]},{g:"Document Generator",c:[["certs","Certificates","award"],["reports","Reports","file"]]},{g:"Insight Review",c:[["usage","Usage Analytics","chart"],["skill","Skill Analytics","target"],["fbk","Feedback Review","star"],["att","Attendance","check"],["set","Settings","set"]]}],pages:(function(){var p=Object.assign({},AP);p.ws=TP.workspace;p.roadmap=TP.roadmap;return p})(),user:["Admin User","AD"]},
corp:{tag:"CORPORATE PORTAL",home:"/corporate",nav:[["dash","Dashboard","home"],["ws","Workspace","cal"],{g:"Organisation",c:[["org","Overview","bld"],["br","Branches","map"],["dep","Departments","layers"]]},{g:"People",c:[["emp","Employees","users"],["access","Roles & Access","shield"]]},{g:"Learning",c:[["courses","Courses","book"],["assess","Assessments","clip"],["certs","Certificates","award"]]},{g:"Insights",c:[["reports","Reports","file"],["usage","Usage Analytics","chart"],["skill","Skill Analytics","target"]]},["set","Settings","set"]],pages:CO,user:["HR Team","HR"]}};
var role,cfg,cur="dash",rd=document.documentElement;
function nv(i,sel){return'<button class="nv'+(i[0]==sel?" on":"")+'" data-p="'+i[0]+'">'+ic(i[2])+i[1]+(i[3]?'<span class="bd">'+i[3]+'</span>':'')+'</button>'}
function drawSide(){$("side").innerHTML=cfg.nav.map(function(x){return x.g?'<div class="gh">'+x.g+'<span>⌄</span></div>'+x.c.map(function(i){return nv(i,cur)}).join(""):nv(x,cur)}).join("")}
function show(p){cur=p;drawSide();var f=cfg.pages[p]||function(){return"<div class='pn'>Coming soon</div>"};$("main").innerHTML=f();$("main").scrollTop=0;post(p);try{parent.postMessage({ilm:"nav",page:p},"*")}catch(e){}}
function post(p){if(p=="att"&&$("attsum"))drawAtt();if(p=="wb")initWB()}
function drawAtt(){var c={P:0,L:0,A:0};ATT.forEach(function(a){c[a[1]]++});$("attsum").innerHTML=S([["check","Present",c.P,"of "+ATT.length],["clock","Late",c.L],["users","Absent",c.A],["chart","Rate",Math.round((c.P+c.L)/ATT.length*100)+"%"]]);$("attb").innerHTML=ATT.map(function(a,i){return'<tr><td>'+av(a[0])+'</td><td>'+["P","L","A"].map(function(k){return'<button class="btn sm '+(a[1]==k?(k=="P"?"g":k=="A"?"r":"p"):"")+'" data-at="'+i+k+'" style="margin-right:6px">'+({P:"Present",L:"Late",A:"Absent"})[k]+'</button>'}).join("")+'</td><td>'+pbar(92-i*3)+'</td></tr>'}).join("")}
var wbCol="#0f172a",wbEr=0;function initWB(){var c=$("wb");if(!c)return;var r=c.getBoundingClientRect(),d=window.devicePixelRatio||1;c.width=r.width*d;c.height=440*d;var x=c.getContext("2d");x.scale(d,d);x.lineCap="round";x.lineJoin="round";var dr=0;function pt(e){var b=c.getBoundingClientRect();return[e.clientX-b.left,e.clientY-b.top]}c.onpointerdown=function(e){dr=1;var p=pt(e);x.beginPath();x.moveTo(p[0],p[1]);c.setPointerCapture(e.pointerId)};c.onpointermove=function(e){if(!dr)return;var p=pt(e);x.strokeStyle=wbEr?"#fff":wbCol;x.lineWidth=wbEr?22:+$("wbs").value;x.lineTo(p[0],p[1]);x.stroke()};c.onpointerup=function(){dr=0};wbEr=0}
var TH={dch:[["Sir, why does my useEffect run twice in development?","I am on React 18 with StrictMode."],["What is the difference between == and === ?"],["My SQL JOIN returns duplicate rows. Can you check?"],["Thanks sir, got it now!"]]};
function setRole(r,pg){role=r;cfg=NAV[r];$("tag").textContent=cfg.tag;$("avt").textContent=cfg.user[1];cur=pg||(r=="wsp"?"ov":"dash");show(cur)}
document.addEventListener("click",function(e){var t=e.target,b=t.closest("button");if(!b)return;
 if(b.dataset.p)return show(b.dataset.p);
 if(b.dataset.tg!==undefined){b.classList.toggle("on");return toast("Updated")}
 if(b.dataset.st!==undefined){AS[cur]=+b.dataset.st;return show(cur)}
 if(b.dataset.rep!==undefined){AS.rep=+b.dataset.rep;return show("reports")}
 if(b.dataset.add){return modal(b.dataset.add,FORMS[b.dataset.form]||"")}
 if(b.dataset.act=="backrep"){AS.rep=null;return show("reports")}
 if(b.dataset.act=="alerts")return modal("Configure Alerts",'<div class="kv"><span>Alert on low ratings</span><button class="tg on" data-tg></button></div><div class="f2 mt">'+fld("Low rating threshold","3.5")+'</div>');
 if(b.dataset.vtab!==undefined){VS.tab=+b.dataset.vtab;VS.step=0;VS.sec=0;return show("videos")}
 if(b.dataset.vstep!==undefined){VS.step=+b.dataset.vstep;return show("videos")}
 if(b.dataset.vsec!==undefined){VS.sec=+b.dataset.vsec;return show("videos")}
 if(b.dataset.at){var i=+b.dataset.at.slice(0,-1);ATT[i][1]=b.dataset.at.slice(-1);return drawAtt()}
 if(b.closest("[data-chips]")){b.parentNode.querySelectorAll(".ch").forEach(function(x){x.classList.remove("on")});b.classList.add("on");return}
 if(b.dataset.col){wbCol=b.dataset.col;wbEr=0;b.parentNode.querySelectorAll(".ch").forEach(function(x){x.classList.remove("on")});b.classList.add("on");return}
 if(b.dataset.wbe!==undefined){wbEr=1;return}
 if(b.dataset.ai||b.dataset.aisend!==undefined){var inp=$("aii"),q=b.dataset.ai||inp.value.trim();if(!q)return;inp.value="";var m=$("aim");m.insertAdjacentHTML("beforeend",'<div class="m me">'+esc(q)+'</div>');setTimeout(function(){m.insertAdjacentHTML("beforeend",'<div class="m">'+AI_REPLIES[Math.floor(Math.random()*AI_REPLIES.length)]+'</div>');m.scrollTop=1e5},600);return}
 if(b.dataset.send!==undefined){var i2=$("chi"),v=i2.value.trim();if(!v)return;i2.value="";var ms=$("chm");ms.insertAdjacentHTML("beforeend",'<div class="m me">'+esc(v)+'</div>');setTimeout(function(){ms.insertAdjacentHTML("beforeend",'<div class="m">Thanks sir. I will try that and update you.</div>');ms.scrollTop=1e5},700);return}
 var a=b.dataset.act;if(!a)return;
 if(a=="wbclear"){return initWB()}
 if(a=="run"){var o=$("co");o.textContent="Running…";return setTimeout(function(){o.textContent="[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\\nSum: 88\\n\\n✓ Process finished in 0.04s"},500)}
 if(a=="quiz"){VS.tab=2;VS.sec=0;return show("videos")}
 if(a=="quiz_old")return modal("Create Quiz",'<div class="fl"><label>Title<input class="in" value="JavaScript Promises"></label><label>Batch<select class="in"><option>FS-2026-A</option><option>DS-2026-B</option></select></label><label>Number of questions<input class="in" type="number" value="10"></label><label>Difficulty<select class="in"><option>Medium</option><option>Easy</option><option>Hard</option></select></label></div>',"Create Quiz");
 if(a=="golive"){var s=0;$("lvb").innerHTML=B("■ End Session","r","endlive");var pr=ST.slice(0,8).map(function(n,i){return'<div class="tile" style="background:hsl('+(i*43)+',30%,22%)">'+n.split(" ").map(function(x){return x[0]}).join("")+'<small>'+n+(i==2?" "+ic("mic"):"")+'</small></div>'}).join("");$("lvp").innerHTML='<div class="gr" style="grid-template-columns:2fr 1fr"><div class="pn"><div class="sp" style="margin-bottom:10px"><b>React Components — FS-2026-A</b><span class="bg ok" id="tm">● LIVE 00:00</span></div><div class="vid"><i>▶</i></div><div class="pills mt">'+B(ic("mic")+" Mute","")+B(ic("camera")+" Camera","")+B(ic("monitor")+" Share screen","")+B(ic("hand")+" Raise hands (2)","")+B(ic("circle")+" Record","")+'</div></div><div class="pn"><div class="t"><span>Participants</span><u>26 / 28</u></div><div class="kb" style="grid-template-columns:1fr 1fr">'+pr+'</div></div></div>';window._lt=setInterval(function(){s++;var t=$("tm");if(t)t.textContent="● LIVE "+("0"+Math.floor(s/60)).slice(-2)+":"+("0"+s%60).slice(-2)},1000);return toast("Live session started")}
 if(a=="endlive"){clearInterval(window._lt);$("lvp").innerHTML="";$("lvb").innerHTML=B("▶ Start Live Session","g","golive");return toast("Session ended — recording processing")}
 if(a.slice(0,1)=="+"||a=="Create Batch"||a=="Create New"||a=="Edit modules"||a=="Open batch")return modal(a.replace("+ ",""),'<div class="fl"><label>Name<input class="in" placeholder="Enter name"></label><label>Description<textarea class="in" rows="3" placeholder="Optional"></textarea></label></div>');
 toast(a.replace(/^[^\\w]+/,"")+" ✓ (demo)")});
document.addEventListener("input",function(e){if(e.target.hasAttribute("data-filter")){var q=e.target.value.toLowerCase();document.querySelectorAll("#main tbody tr").forEach(function(r){r.style.display=r.textContent.toLowerCase().indexOf(q)>-1?"":"none"})}});
document.addEventListener("keydown",function(e){if(e.key=="Enter"){if(e.target.id=="chi")document.querySelector("[data-send]").click();if(e.target.id=="aii")document.querySelector("[data-aisend]").click()}});
document.addEventListener("click",function(e){var it=e.target.closest("[data-th]");if(it){document.querySelectorAll("#dch .it").forEach(function(x){x.classList.remove("on")});it.classList.add("on");var i=+it.dataset.th;$("chn").textContent=it.querySelector("b").textContent;$("chm").innerHTML=TH.dch[i].map(function(m){return'<div class="m">'+m+'</div>'}).join("")}});
function theme(d){rd.dataset.theme=d?"dark":"light"}
$("thb").onclick=function(){var d=rd.dataset.theme!="dark";theme(d);try{parent.postMessage({ilm:"theme",dark:d},"*")}catch(e){}};
addEventListener("message",function(e){var d=e.data||{};if(d.ilmTheme)theme(d.ilmTheme=="dark");if(d.ilmRole)setRole(d.ilmRole)});
var q=new URLSearchParams(location.search);var qt=q.get("theme")||window.ILM_THEME;theme(qt=="dark"||(!qt&&matchMedia("(prefers-color-scheme:dark)").matches));


var SP={},WP={};
var CRS=[["Full Stack Web Development","Rajesh Kumar",78,"12 modules"],["Data Structures & Algorithms","Neha Kapoor",54,"10 modules"],["SQL & Databases","Suresh Rao",100,"6 modules"],["UI/UX Fundamentals","Pooja Bhatt",22,"8 modules"]];
SP.dash=function(){return H("STUDENT PORTAL","Good Afternoon, Aarav!","Your classroom & learning overview",["4 courses","1 completed","2 due this week"])+S([["book","Active Courses","3","1 enrolled this month"],["check","Completed Courses","1","SQL & Databases"],["clock","Pending Assessments","2","Due in 3 days"],["chart","Attendance","92%","Above 75% target","+3%"]])+G("1.4fr 1.4fr 1fr",[P("My Classroom","OVERVIEW",R("users","Batch FS-2026-A","Trainer: Rajesh Kumar · 28 students","Active","ok")+R("play","Next live class","Today 10:00 AM · React Components","Join","warn")),P("Latest Message","",R("msg","Rajesh Kumar","Please submit the REST API assignment by Sunday.")+R("msg","Admin","Your certificate for SQL is ready.","New","ok"),"Go to Inbox →"),P("November 2026","",cal({3:1,8:1,12:1,20:1}))])+G("repeat(4,1fr)",[["Video Progress","34 / 52","video",65],["Documents Progress","18 / 30","file",60],["Assignment Progress","6 / 9","clip",67],["Quiz Progress","8 / 12","clip",67]].map(function(x){return P(x[0],x[1],'<div style="margin:8px 0 6px">'+pbar(x[3])+'</div><small class="muted">'+x[3]+'% complete</small>')}))};
SP.courses=function(){return H("STUDENT PORTAL","My Courses","Showing 4 enrolled courses",["4 courses"])+chips(["All · 4","In Progress · 3","Completed · 1","Not Started · 0"],0)+G("repeat(auto-fit,minmax(260px,1fr))",CRS.map(function(c){return'<div class="pn"><div class="sp"><div class="ri" style="width:38px;height:38px;border-radius:10px;background:var(--ic);display:grid;place-items:center">'+ic("book")+'</div>'+bg(c[2]==100?"Completed":"In progress",c[2]==100?"ok":"warn")+'</div><b style="display:block;margin:12px 0 2px;font-size:15px">'+c[0]+'</b><small class="muted">'+c[1]+' · '+c[3]+'</small><div style="margin:12px 0 4px">'+pbar(c[2])+'</div><div class="sp"><small class="muted">'+c[2]+'%</small><button class="btn sm p" data-act="Continue">Continue</button></div></div>'}))};
SP.videos=function(){return H("STUDENT PORTAL","Video Lectures","Watch lectures shared by your trainers",["52 lectures"])+S([["video","Total Lectures","52"],["chart","Overall Progress","65%","Across all lectures"],["check","Completed","34"]])+G("2fr 1fr",['<div><div class="vid"><i>▶</i></div><div class="pn mt"><b>React Hooks Deep Dive</b><p class="muted">Rajesh Kumar · 48 min · useState, useEffect, custom hooks</p></div></div>',P("Lecture Library","",sb("Search lectures…")+R("video","React Hooks Deep Dive","48 min","Playing","warn")+R("video","Node.js Event Loop","36 min","Done","ok")+R("video","REST API Design","44 min","Done","ok")+R("video","JWT Authentication","39 min"))])};
SP.docs=function(){return H("STUDENT PORTAL","Documents","Study material shared by your trainers",["30 files"])+T(["File","Course","Type","Size","Shared",""],[["<b>Module-6-Notes.pdf</b>","Full Stack","PDF","2.4 MB","2 Nov",'<button class="btn sm" data-act="Preview">Preview</button>'],["<b>Closures-Cheatsheet.pdf</b>","Full Stack","PDF","640 KB","31 Oct",'<button class="btn sm" data-act="Preview">Preview</button>'],["<b>Big-O-Notes.pdf</b>","DSA","PDF","1.1 MB","28 Oct",'<button class="btn sm" data-act="Preview">Preview</button>'],["<b>SQL-Practice-Set.txt</b>","SQL","TXT","24 KB","20 Oct",'<button class="btn sm" data-act="Preview">Preview</button>']])};
SP.assign=function(){return H("STUDENT PORTAL","Assignments","View and submit your assignments",["3 active"])+chips(["Active","Submitted","Passed","Locked"],0)+T(["Assignment","Course","Due","Marks","Status",""],[["<b>Build a REST API</b>","Full Stack","8 Nov","—",bg("Pending","warn"),'<button class="btn sm p" data-act="Submit">Submit</button>'],["<b>Binary Tree Traversals</b>","DSA","10 Nov","—",bg("Pending","warn"),'<button class="btn sm p" data-act="Submit">Submit</button>'],["<b>Responsive Landing Page</b>","Full Stack","30 Oct","18/20",bg("Passed","ok"),""],["<b>SQL Joins Worksheet</b>","SQL","22 Oct","19/20",bg("Passed","ok"),""]])};
SP.assess=function(){return H("ASSESSMENT PORTAL","Your Assessments","Track your progress and attempt quizzes",["2 pending"])+S([["clip","Total Assessments","12"],["clock","Pending","2"],["cal","Due This Week","1"]])+T(["Quiz","Status","Difficulty","Time limit","Category","Marks",""],[["<b>JavaScript Closures</b>",bg("Pending","warn"),bg("Medium","warn"),"20 min","Frontend","20",'<button class="btn sm p" data-act="Start Quiz">Start</button>'],["<b>React State</b>",bg("Scheduled"),bg("Hard","bad"),"30 min","Frontend","30",""],["<b>SQL Fundamentals</b>",bg("Completed","ok"),bg("Easy","ok"),"15 min","Database","15",""]])};
SP.quiz=function(){return H("PERFORMANCE TRACKING","My Quiz History","All your past quiz attempts",[])+G("2fr 1fr",[T(["Quiz","Score","Date","Result"],[["<b>SQL Fundamentals</b>","14/15","28 Oct",bg("Passed","ok")],["<b>HTML & CSS Basics</b>","18/20","15 Oct",bg("Passed","ok")],["<b>Big-O Notation</b>","9/15","9 Oct",bg("Failed","bad")],["<b>Git Essentials</b>","12/15","1 Oct",bg("Passed","ok")]]),P("Your summary","",'<div class="kv"><span>Average Score</span><b>82%</b></div><div class="kv"><span>Passed</span><b>7</b></div><div class="kv"><span>Failed</span><b>1</b></div><div class="kv"><span>Best Attempt</span><b>95%</b></div><div class="kv"><span>Total Attempts</span><b>8</b></div>')])};
SP.att=function(){return H("ATTENDANCE TRACKING","Attendance","Track your monthly attendance",["92%"])+chips(["Today","Last 7 Days","Last 30 Days","This Month"],3)+G("2fr 1fr",[T(["Date","Session","Status"],[["3 Nov","React Components",bg("Present","ok")],["2 Nov","Node.js Routing",bg("Present","ok")],["31 Oct","REST APIs",bg("Late","warn")],["30 Oct","Databases",bg("Present","ok")],["29 Oct","Auth & JWT",bg("Absent","bad")]]),P("Summary","",'<div class="kv"><span>Attendance Rate</span><b>92%</b></div><div class="kv"><span>Present</span><b>22</b></div><div class="kv"><span>Late</span><b>1</b></div><div class="kv"><span>Absent</span><b>1</b></div>')])};
SP.live=function(){return H("LIVE SESSIONS","Live Classes","Join your trainer’s sessions",[])+G("2fr 1fr",['<div>'+P("Live Now","LIVE",R("play","React Components","Rajesh Kumar · started 10:00","Join now","ok")+'<div class="mt">'+B("Join Class","g","Joining class…")+'</div>')+'<div style="height:12px"></div>'+P("Your Recent Classes","",chips(["Today","Upcoming","Completed"],0)+R("clock","DSA — Trees","Tomorrow 2:00 PM")+R("clock","SQL Review","Thu 11:00 AM"))+'</div>',P("Today’s Schedule","",R("play","React Components","10:00 AM","Live","ok")+R("clock","DSA Practice","02:00 PM")+R("clock","Doubt Clearing","05:00 PM"))])};
SP.rec=function(){return H("STUDENT PORTAL","Recorded Lectures","Watch your recorded and live sessions",[])+G("1fr 2fr",[P("Course Content","",R("video","1. Intro to Node","32 min","✓","ok")+R("video","2. Express Routing","41 min","✓","ok")+R("video","3. Middleware","38 min","Now","warn")+R("video","4. REST Best Practices","44 min")),'<div><div class="vid"><i>▶</i></div><div class="pn mt"><b>3. Middleware</b><p class="muted">Learn how middleware functions shape the request–response cycle in Express.</p></div></div>'])};
SP.skills=function(){var s=[["JavaScript",82],["React",68],["SQL",91],["Data Structures",54],["Git",77],["Testing",41]];return H("SKILL INTELLIGENCE","Skill Map","Where you are strong and where to improve",[])+S([["chart","Total Skills","6"],["check","Strong Skills","3","Score above target"],["target","Weak Areas","1","Testing"],["chart","Avg. Score","69%"]])+P("Top Skills","",s.map(function(x){return'<div style="margin-bottom:12px"><div class="sp"><b style="font-size:13px">'+x[0]+'</b><small class="muted">'+x[1]+'%</small></div>'+pbar(x[1])+'</div>'}).join(""))};
SP.certs=function(){return H("STUDENT PORTAL","Certificate Database","View, preview and download your certificates",[])+S([["award","Total","2"],["check","Available","2"],["cal","This Week","1"],["shield","Active","2"]])+T(["File Name","Type","Preview","Download"],[["<b>SQL-Databases-Certificate.pdf</b>","PDF",'<button class="btn sm" data-act="Preview">Preview</button>','<button class="btn sm" data-act="Download">⬇ Download</button>'],["<b>HTML-CSS-Foundations.pdf</b>","PDF",'<button class="btn sm" data-act="Preview">Preview</button>','<button class="btn sm" data-act="Download">⬇ Download</button>']])};
SP.plan=TP.plan;SP.roadmap=TP.roadmap;SP.code=TP.code;SP.workspace=TP.workspace;
SP.note=function(){return H("STUDENT NOTEBOOK","My Notebooks","AI notebook grounded in your sources",["Unlimited"])+G("1fr 1.5fr 1fr",[P("Sources","",R("file","Closures-Cheatsheet.pdf","2 pages")+R("file","Module-6-Notes.pdf","18 pages")+'<div class="mt">'+B("+ Add sources","","Add sources")+'</div>'),P("Chat with Sources","LIVE",'<div class="m">Summarise closures in 3 bullet points.</div><div class="m me" style="margin-top:8px;white-space:normal">• A closure is a function that remembers its lexical scope.<br>• It enables private state and factories.<br>• Beware of stale values in loops.</div>'),P("Studio","",["Report","Flashcards","Quiz","Mind Map","Slide Deck","Audio Overview"].map(function(x){return'<button class="btn" style="margin:0 6px 6px 0" data-act="Generate '+x+'">'+x+'</button>'}).join(""))])};
SP.resume=function(){return H("AI-POWERED · ATS-OPTIMISED","Resume Builder","Choose your fastest path",[])+G("1fr 1fr 1fr",[P("Generate with AI","",'<p class="muted">AI writes a complete ATS-optimised resume from your target role</p><div class="mt">'+B("Get started","p","Get started")+'</div>'),P("Start from Scratch","",'<p class="muted">Pick a template and fill in each section yourself</p><div class="mt">'+B("Get started","","Get started")+'</div>'),P("ATS Score Checker","",'<p class="muted">Upload resume PDF for instant analysis</p><div class="mt">'+B("Choose PDF","","Choose PDF")+'</div>')])+P("My Resumes","",R("file","Aarav_Sharma_FullStack.pdf","Updated 1 Nov","ATS 86","ok")+R("file","Aarav_Sharma_General.pdf","Updated 12 Oct","ATS 71","warn"))};
SP.fb=function(){return H("FEEDBACK PORTAL","Session Feedback","Share your honest experience with us",[])+G("1fr 1fr",[P("How was this session overall?","",'<div class="tb">'+[["frown","Poor"],["meh","Okay"],["smile","Fine"],["smile","Good"],["star","Amazing"]].map(function(x,i){return'<button class="ch'+(i==3?" on":"")+'">'+ic(x[0])+" "+x[1]+'</button>'}).join("")+'</div><textarea class="in" rows="4" placeholder="Anything specific for the trainer?"></textarea><div class="mt">'+B("Submit","p","Feedback submitted")+'</div>'),P("Rate your trainer","",["Clarity of explanation","Doubt clearing","Energy & engagement","Technical depth"].map(function(x){return'<div class="kv"><span>'+x+'</span><b>★★★★☆</b></div>'}).join(""))])};
/* workspace */
var WN2=[["ov","Overview","home"],["ev","Events","cal"],["bk","Booking Pages","book"],["im","Instant Meeting","video"],["cl","Calendar","cal"],["cs","Calendar Sync","clock"],["sm","Summaries","spark"],["em","Email","msg"],["ms","My Schedules","list"],["sh","Shared with Me","users"],["rm","Reminders","bell"],["ct","Contacts","users"],["av","Availability","clock"],["ig","Integrations","layers"],["st","Workspace Settings","set"]];
WP.ov=TP.workspace;
WP.ev=function(){return H("WORKSPACE","Events","Your upcoming events",[],B("+ Create Event","p","Create Event"))+T(["Event","Date","Time","Attendees","Type"],[["<b>Demo Day — FS-2026-A</b>","10 Nov","11:00 AM","28",bg("Meeting")],["<b>Parent–Teacher Meet</b>","5 Nov","04:00 PM","14",bg("Meeting")],["<b>Hackathon Kickoff</b>","18 Nov","10:00 AM","120",bg("Workshop","warn")],["<b>Quarterly Review</b>","24 Nov","02:00 PM","9",bg("Internal")]])};
WP.bk=function(){return H("WORKSPACE","Booking Pages","Let learners book time with you",[],B("+ New Page","p","New Page"))+G("repeat(auto-fit,minmax(240px,1fr))",[["30-min Doubt Clearing","ilmora.ai/book/rajesh/doubts","14 bookings"],["Mentor Session","ilmora.ai/book/rajesh/mentor","6 bookings"],["Project Review","ilmora.ai/book/rajesh/review","9 bookings"]].map(function(x){return P(x[0],"LIVE",'<p class="muted">'+x[1]+'</p><p class="mt"><b>'+x[2]+'</b></p><div class="mt">'+B("Copy link","sm","Link copied")+'</div>')}))};
WP.im=function(){return H("WORKSPACE","Instant Meeting","Start a meeting right now",[])+P("Start an instant meeting","",'<div class="fl" style="max-width:420px"><label>Meeting title<input class="in" value="Quick sync"></label><label>Invite<input class="in" placeholder="Emails or batch name"></label></div><div class="mt">'+B("Start Instant Meeting","g","Meeting started — link copied")+'</div>')};
WP.cl=function(){return H("WORKSPACE","Calendar","View and manage your schedule",["Nov 2026"],B("+ Create Event","p","Create Event"))+P("November 2026","",cal({3:["React Comp.","Pandas"],5:["Parent Mtg"],10:["Demo Day"],12:["Review"],18:["Hackathon"],24:["Quarterly"]},true))};
WP.cs=function(){return H("WORKSPACE","Calendar Sync","Keep calendars up to date",[])+P("Connected calendars","",R("cal","Google Calendar","rajesh@texora.ai","Connected","ok")+R("cal","Outlook","Not connected","Connect")+R("cal","Apple Calendar","Not connected","Connect"))};
WP.sm=function(){return H("WORKSPACE","Summaries","AI summaries of your meetings",[])+P("Recent","",R("spark","FS-A weekly sync","3 action items · 28 Oct")+R("spark","Parent–teacher call","2 action items · 25 Oct")+R("spark","Curriculum review","5 action items · 20 Oct"))};
WP.em=function(){return H("WORKSPACE","Email","Compose and manage emails",[],B("✎ Compose","p","Compose"))+T(["From","Subject","Time"],[["<b>Admin</b>","Batch schedule updated for November","10:12 AM"],["<b>Neha Kapoor</b>","Re: Shared DSA problem set","09:40 AM"],["<b>Aarav Sharma</b>","Question on assignment 4","Yesterday"],["<b>HR</b>","Payroll cut-off reminder","2 Nov"]])};
WP.ms=function(){return H("WORKSPACE","My Schedules","Recurring schedules",[])+T(["Schedule","Repeats","Next"],[["<b>FS-2026-A Live class</b>","Mon–Fri 10:00","Today"],["<b>Office hours</b>","Thu 17:00","5 Nov"],["<b>Weekly review</b>","Fri 16:00","6 Nov"]])};
WP.sh=function(){return H("WORKSPACE","Shared with Me","Calendars & events shared with you",[])+P("Shared","",R("users","Academic Calendar 2026","Shared by Admin","View")+R("users","Neha's DSA schedule","Shared by Neha Kapoor","View"))};
WP.rm=function(){return H("WORKSPACE","Reminders","Never miss anything",[],B("+ Add Reminder","p","Add Reminder"))+P("Upcoming","",R("bell","Grade REST API submissions","Today 6:00 PM","Pending","warn")+R("bell","Upload Module 7 slides","Tomorrow 9:00 AM")+R("bell","Parent–teacher meeting","5 Nov 4:00 PM"))};
WP.ct=function(){return H("WORKSPACE","Contacts","People you work with",[],B("+ Add Contact","p","Add Contact"))+T(["Name","Role","Email"],ST.slice(0,6).map(function(n,i){return[av(n),["Student","Student","Student","Mentor","Manager","Parent"][i],n.split(" ")[0].toLowerCase()+"@mail.com"]}))};
WP.av=function(){return H("WORKSPACE","Availability","Set when learners can book you",[],B("Save","p","Availability saved"))+P("Weekly hours","",["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(function(d,i){return'<div class="kv"><span>'+d+'</span><b>'+(i<5?"10:00 AM – 06:00 PM":"Unavailable")+'</b><button class="tg'+(i<5?" on":"")+'" data-tg></button></div>'}).join(""))};
WP.ig=function(){return H("WORKSPACE","Integrations","Connect your tools",[])+G("repeat(auto-fit,minmax(220px,1fr))",["Google Meet","Zoom","Slack","Notion"].map(function(x,i){return P(x,i<2?"CONNECTED":"",'<p class="muted">Sync meetings and notifications.</p><div class="mt">'+B(i<2?"Disconnect":"Connect","",x)+'</div>')}))};
WP.st=AP.set;
NAV.student={tag:"STUDENT PORTAL",nav:[["dash","Dashboard","home"],{g:"Learning",c:[["courses","My Courses","book"],["videos","Video Lectures","video"],["docs","Documents","file"],["assign","Assignments","clip"],["assess","Assessments","clip"],["quiz","Quiz History","list"],["att","Attendance","check"]]},["roadmap","Roadmap","map"],{g:"Classes",c:[["live","Live Classes","play"],["rec","Recorded Classes","video"]]},["workspace","Workspace","cal"],["skills","Skill Map","target"],["certs","Certificates","award"],["plan","Study Plan","list"],["note","Notebook AI","spark"],["resume","Resume Builder","file"],["code","Coding Lab","code"],{g:"Support",c:[["fb","Feedback","star"]]}],pages:SP,user:["Aarav Sharma","AS"]};
NAV.wsp={tag:"ILM ORA WORKSPACE",nav:[{g:"Main",c:WN2.slice(0,8)},{g:"Manage",c:WN2.slice(8,12)},{g:"Configuration",c:WN2.slice(12)}],pages:WP,user:["Rajesh Kumar","RK"]};

setRole(window.ILM_ROLE||q.get("role")||"trainer",window.ILM_PAGE||q.get("page")||null);

<\\/script></body></html>
</script>`;

const SCRIPT = `
var S="ok",P="pl";
var CALP=["calendar","ILM ORA Calendar","One public product, shared by Individual and Corporate.",["Same Calendar for every role","Open at /calendry"],S,"/calendry"],
CALT={home:"/calendry",items:[["ILM ORA Calendar","/calendry","The public ILM ORA Calendar, shared by Individual and Corporate."]]};
var D={
individual:{
 lead:"Courses, live classes, assessments and AI tools in one place.",
 pt:"Your learning and teaching toolkit",pp:"Student, Trainer and Business & Partnership, plus the public Workspace and Calendar products.",
 prod:[["graduation","Student ","Courses, live and recorded classes, assessments, certificates and roadmaps.",["Courses, live and recorded classes","Assessments and quiz history","Skill Map, Study Plan, Roadmap"],S],
  ["users","Trainer ","Batches, live sessions, uploads, assessments and reports.",["Batches and course management","Live classes and whiteboard","Reports and AI Companion"],S],
  ["handshake","Business and Partnership","Onboarding, compliance, skill gaps and performance analytics for teams and partners.",["Team Onboarding and L&D","Skill Gap Analysis","Co-branded programs: planned"],S],
  ["grid","ILM ORA Workspace","A separate public product, available to every role.",["Open at /workspace"],S],
  CALP],
 tabs:{
 "Student":{home:"/student",items:[
 ["Dashboard","/student","Your learning home with progress and quick access to everything else."],
 ["My Courses","/student/courses","Browse and continue every course you are enrolled in."],
 ["Live Classes","/student/live-classes","Join scheduled live sessions with your trainer."],
 ["Recorded Classes","/student/recorded-classes","Rewatch past sessions any time."],
 ["Video Lectures","/student/videos","Watch uploaded lecture videos."],
 ["Documents","/student/documents","Access notes and study material shared by trainers."],
 ["Assessments","/student/assessments","Take assessments assigned to your batch."],
 ["Quiz History","/student/my-quizzes","Review past quiz attempts and results."],
 ["Assignments","/student/assignments","View, submit and track assignments."],
 ["Attendance","/student/attendance","See your attendance record."],
 ["Certificates","/student/certificates","Download certificates you have earned."],
 ["Doubts","/student/doubts","Ask doubts and follow trainer answers."],
 ["Feedback","/student/feedback","Share feedback on courses and sessions."],
 ["Skill Map","/student/skill-map","See your skills and gaps at a glance."],
 ["Study Plan","/student/study-plan","Plan your study schedule."],
 ["Learning Roadmap","/student/roadmap-upgraded","Follow a guided roadmap towards your goal."],
 ["Resume Builder","/student/resume-builder","Build a resume from within the platform."],
 ["Notebook","/student/notebook","Keep personal notes."],
 ["Online Compiler","/student/compiler","Write and run code in the browser."],
 ["Workspace","/student/workspace","Student meetings workspace."]]},
 "Trainer":{home:"/trainer",items:[
 ["Dashboard","/trainer","Overview of your batches, sessions and activity."],
 ["Batches","/trainer/batches","Manage batches and their students."],
 ["Course Management","/trainer/course-management","Organise courses and modules."],
 ["Upload Videos","/trainer/upload-videos","Upload lecture videos for learners."],
 ["Live Classes","/trainer/live","Start and run live sessions."],
 ["Whiteboard","/trainer/whiteboard","Teach visually with a whiteboard."],
 ["Assessments","/trainer/assessments","Create assessments and quizzes."],
 ["Attendance","/trainer/attendance","Mark and review attendance."],
 ["Doubts","/trainer/doubts-management","Answer student doubts."],
 ["Feedback","/trainer/feedback","Read learner feedback."],
 ["Student Reports","/trainer/student-reports","Per-student progress reports."],
 ["Batch Reports","/trainer/batch-reports","Batch-level performance reports."],
 ["Performance","/trainer/performance","Performance analysis across learners."],
 ["Skill Analytics","/trainer/skill-analytics","Skill-level analytics for your batches."],
 ["AI Companion","/trainer/ai-companion","AI assistant for trainers."],
 ["Study Plan","/trainer/study-plan","Plan study schedules for learners."],
 ["Roadmap","/trainer/roadmap-upgraded","Build and manage learning roadmaps."],
 ["Online Compiler","/trainer/compiler","Run code during sessions."],
 ["Workspace","/trainer/workspace","Trainer meetings workspace."]]},
 "Business & Partnership":{home:"/admin",items:[
 ["Team Onboarding & L&D","/admin/courses","Structured onboarding and learning programs for new hires."],
 ["Compliance & Policy Training","/admin/certificates","Mandatory training, policy and certification tracking."],
 ["Skill Gap Analysis","/admin/skill-analytics","Identify and close skill gaps across your teams."],
 ["Performance Analytics","/admin/reports","Org-wide dashboards on learning ROI and progress."],
 ["Co-Branded Programs","","Launch joint courses with academic or corporate partners.",1],
 ["Partnership & Lead Management","","Track partnership leads and revenue-sharing deals.",1]]},
 "Workspace":{home:"/workspace",items:[["ILM ORA Workspace","/workspace","The public ILM ORA Workspace product, open to individuals and organisations."]]},
 "Calendar":CALT
},
  how:["Choose LMS","Pick Student, Trainer or Business and Partnership.","Login","Use the existing login. Your role decides your dashboard.","Open your dashboard","Role routing sends you to /student or /trainer.","Learn or teach","Use courses, live classes, assessments and reports."],
 ben:[["Everything in one login","No juggling tools for classes, quizzes and reports."],["Built for growth","Roadmaps, skill map and certificates show real progress."],["AI where it helps","Trainer AI Companion and a built-in compiler."]],
 ct:"Start learning or teaching today",cp:"Pick Student, Trainer or Business & Partnership and access classes, assessments, roadmaps, reports and more."},
corporate:{
  lead:"Manage people, training and reports from one console.",
 pt:"Your organisation, one console",pp:"Corporate LMS and admin console, plus the public Workspace and Calendar products.",
 prod:[["building","Corporate LMS","Run learning programs across the company with courses, assessments, attendance and certificates.",["Courses, videos, live sessions","Assessments and certificates","Skill analytics and reports"],S],
  ["shield","Admin and Access","Organisation overview, settings, access control and usage analytics.",["Organisation overview and settings","Access Control","Usage analytics"],S],
  ["grid","ILM ORA Workspace","A separate public product, available to every role.",["Open at /workspace"],S],
  CALP],
 tabs:{
 "Admin":{home:"/admin",items:[
 ["Dashboard","/admin","Admin home with an organisation-wide summary."],
 ["Organisation Overview","/admin/organisation-overview","See the shape of your organisation at a glance."],
 ["Organisation Settings","/admin/settings","Configure organisation-level settings."],
 ["Access Control","/admin/access-control","Manage roles and permissions."],
 ["Courses","/admin/courses","Manage corporate courses."],
 ["Videos","/admin/videos","Manage learning videos."],
 ["Files","/admin/files","Manage shared learning files."],
 ["Live Sessions","/admin/live-sessions","Monitor live training sessions."],
 ["Assessment System","/admin/assessment-system","Oversee assessments across batches."],
 ["Attendance","/admin/attendance","Track training attendance."],
 ["Certificates","/admin/certificates","Issue and review certificates."],
 ["Reports","/admin/reports","Organisation reports."],
 ["Usage Analytics","/admin/usage","See how the platform is being used."],
 ["Skill Analytics","/admin/skill-analytics","Skill coverage and gaps."],
 ["Feedback Review","/admin/feedback-review","Review learner feedback."],
 ["Learning Roadmap","/admin/roadmap-upgraded","Manage roadmaps for teams."],
 ["Workspace","/admin/workspace","Admin meetings workspace."]]},
 "Workspace":{home:"/workspace",items:[["ILM ORA Workspace","/workspace","The public ILM ORA Workspace product, open to individuals and organisations."]]},
 "Calendar":CALT
},
 how:["Choose Corporate","Preview the admin console and what it manages.","Login","Use the existing login. Admin roles open /admin.","Set up your organisation","Review overview, settings and access control.","Run and measure","Run courses, then track reports and usage."],
 ben:[["Central control","Settings, roles and access in one place."],["Visible results","Reports, usage and skill analytics for decisions."],["Honest roadmap","Planned items are clearly marked, never faked."]],
 ct:"Bring ILM ORA to your organisation",cp:"Run learning for your whole team from one admin console: users, roles and access, courses, reports and skill analytics. Preview the Corporate dashboard above, or talk to us to plan your rollout."}};
var FAQ=[["Where are Workspace and Calendar?","They are public products at /workspace and /calendry, shown under both Individual and Corporate."],["Where do I log in?","Use the Login button. After login, your role opens the right dashboard: /student, /trainer or /admin."],["Can I try it before signing up?","Yes, the live demo at /onboarding renders the real Student, Trainer and Admin screens."],["Are Workspace and Calendar part of both Individual and Corporate?","Yes. ILM ORA Workspace and ILM ORA Calendar are separate public products and appear in both. Corporate adds the admin console."]];
var B="https://ilmora.texora.ai";var $=function(i){return ROOT.querySelector("#"+i)},role="individual",tab=0,fi=0,e=function(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
var ICON_PATHS={
 compass:'<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.7 6.1-5.7 2.3 2.3-5.7 6.1-2.7Z"/>',
 key:'<circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 12 9-9 2 2-2 2 2 2-3 3-2-2-3 3"/>',
 rocket:'<path d="M4.5 16.5c-1.5 1.3-2 4-2 4s2.7-.5 4-2c.8-.9.8-2.2-.1-3.1s-2.2-.9-3.1.1Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.5C14 4 19 3 21 3c0 2-1 7-5.5 10a22 22 0 0 1-3.5 2Z"/><path d="m9 12-5 1 3-5 4-1M12 15l-1 5 5-3 1-4"/>',
 chart:'<path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 6-7"/>',
 robot:'<rect x="4" y="7" width="16" height="13" rx="3"/><path d="M12 3v4M8 12h.01M16 12h.01M9 16h6"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 dollar:'<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
 check:'<path d="m20 6-11 11-5-5"/>',
 percent:'<path d="m19 5-14 14"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
 graduation:'<path d="m22 10-10-5-10 5 10 5 10-5Z"/><path d="M6 12v5c4 3 8 3 12 0v-5M22 10v6"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 video:'<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
 file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
 help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
 message:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4-.9L3 21l1.9-5.5a9 9 0 0 1-.9-4A8.5 8.5 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
 calendar:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21h4"/>',
 building:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 21V9h6v12M7 7h.01M17 7h.01M7 11h.01M17 11h.01"/>',
 handshake:'<path d="m11 17 2 2a2 2 0 0 0 3-3l-1-1M7 14l-2 2a2 2 0 0 0 3 3l2-2M8 8l3-3a3 3 0 0 1 4 0l1 1M3 9l4-4 4 4-4 4zM21 9l-4-4-4 4 4 4z"/>',
 frown:'<circle cx="12" cy="12" r="10"/><path d="M8 16s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01"/>',
 meh:'<circle cx="12" cy="12" r="10"/><path d="M8 15h8M9 9h.01M15 9h.01"/>',
 smile:'<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
 star:'<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 camera:'<path d="M14 5 16 8h4v11H4V8h4l2-3z"/><circle cx="12" cy="13" r="3"/>',
 monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
 hand:'<path d="M8 12V5a1.5 1.5 0 0 1 3 0v6-8a1.5 1.5 0 0 1 3 0v8-6a1.5 1.5 0 0 1 3 0v7-4a1.5 1.5 0 0 1 3 0v6c0 5-3 8-7 8h-1c-3 0-5-2-6-4l-2-4a1.5 1.5 0 0 1 2.5-1.5L8 15"/>',
 circle:'<circle cx="12" cy="12" r="8"/>',
 mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/>',
 x:'<path d="m18 6-12 12M6 6l12 12"/>',
 upload:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>' 
};
function svgIcon(name,cls){return'<svg class="ui-ico '+(cls||'')+'" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICON_PATHS[name]||ICON_PATHS.grid)+'</svg>'}
var SI=["compass","key","rocket","chart"],BI={individual:["key","chart","robot"],corporate:["shield","chart","compass"],product:["compass","chart","robot"]},SP=["M0 20 C14 19 20 8 36 11 S62 16 76 6 S92 4 100 2","M0 21 L14 17 L28 19 L44 10 L60 13 L78 5 L100 3","M0 18 C16 21 24 6 42 9 S70 18 84 7 S96 4 100 4","M0 20 C12 15 24 17 36 11 S60 10 72 6 S92 5 100 1","M0 19 L20 14 L34 16 L52 7 L70 11 L100 2"];
function spark(n){var d=SP[n%5];return'<svg class="mv" viewBox="0 0 100 24" aria-hidden="true"><path class="ar" d="'+d+' L100 24 L0 24Z"/><path class="ln" pathLength="1" d="'+d+'"/></svg>'}
function viz(n){if(n==0)return'<svg class="rg" viewBox="0 0 36 36" aria-hidden="true"><circle class="bg" cx="18" cy="18" r="15.9155"/><circle class="fg" cx="18" cy="18" r="15.9155" pathLength="100"/></svg>';
 if(n==1)return'<svg class="mv bz" viewBox="0 0 60 30" aria-hidden="true">'+[10,16,13,22,28].map(function(h,i){return'<rect x="'+(i*12+2)+'" y="'+(30-h)+'" width="8" height="'+h+'" rx="2" style="--d:'+i+'"/>'}).join("")+'</svg>';return spark(2)}
function chip(p){return p?'<span class="chip pl">Planned</span>':'<span class="chip ok">Live</span>'}
ICON_PATHS.layers='<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>';
ICON_PATHS.gear='<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>';
ICON_PATHS.present='<rect x="3" y="3" width="18" height="12" rx="2"/><path d="M12 15v3M8 21l4-3 4 3"/>';
var PI=[["graduation","Student","Access courses, join live classes, complete assignments, and track your learning progress."],["present","Trainer","Create and manage courses, conduct live sessions, share resources, and track learner performance."],["handshake","Business & Partnership","Manage your organisation, collaborate with partners, and drive learning and skilling at scale."]],
PO=[["building","Corporate LMS","Run training, upskilling and compliance programs for your organisation with powerful reporting and role management."],["gear","Admin Access","Control platform settings, users, roles, permissions and overall operations for your organisation."]],
PS=[["layers","ILM ORA Workspace","A collaborative workspace for tasks, projects, files and team communication across roles.","/workspace"],["calendar","ILM ORA Calendar","Plan classes, meetings and events, set reminders, and stay in sync with your team.","/calendry"]];
function cardH(p,n){var u=p[3],t=u?'a':'div';return'<'+t+' class="card pc rv"'+(u?' href="'+B+u+'" target="_blank" rel="noopener"':'')+' style="--i:'+n+'"><span class="tg"><span class="chip ok">Live</span></span><div class="ic">'+svgIcon(p[0])+'</div><h3>'+e(p[1])+'</h3><p>'+e(p[2])+'</p></'+t+'>'}
function grp(t,s,l,o,c){return'<div class="pgr"><div class="pgh"><h3>'+t+'</h3><span>– '+s+'</span></div><div class="pgd '+c+'">'+l.map(function(p,i){return cardH(p,o+i)}).join("")+'</div></div>'}
function render(){var d=D[role],tk=Object.keys(d.tabs);ROOT.dataset.role=role;
 ROOT.querySelectorAll(".seg button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.r==role)});
 var HT={individual:["Learn,","teach and manage."],product:["Plan, meet","and stay in sync."],corporate:["Train your team,","manage your organisation."],edutech:["Teach smarter,","connect your institute."],sis:["Admit, track","and manage students."]},ht2=HT[role]||HT.individual;
  $("h1t").innerHTML='<span class="o">'+ht2[0]+'</span> <span class="g">'+ht2[1]+'</span>';
 var WHO={
  individual:["Who is LMS for?",[["Student","Learners who join courses, live classes and quizzes"],["Trainer","Teachers who run batches, upload content and grade work"],["Business & Partnership","Teams and partners who manage learning at scale"]]],
  product:["Who can use Products?",[["Workspace","Anyone who needs meetings, mail and events in one place"],["Calendar","Learners, trainers and teams who plan classes and bookings"]]],
  corporate:["Who is Corporate for?",[["HR and L&D teams","Run training and compliance programs"],["Admins","Control users, roles and access"],["Managers","Track team skills and reports"]]],
  edutech:["Who is Educate Tech for?",[["Schools and institutes","Run smart classes and digital content"],["Teachers","Teach, assess and engage students"],["Parents","Stay connected with progress and updates"]]],
  sis:["Who is SIS for?",[["Admission office","Handle admissions and student records"],["Admin and accounts","Manage attendance, timetable and fees"],["Teachers and parents","View results and report cards"]]]
 },wh=WHO[role]||WHO.individual;
 $("who").innerHTML='<div class="whot">'+wh[0]+'</div><div class="whol">'+wh[1].map(function(s,i){return'<div class="whos"><span class="whon">'+(i+1)+'</span><div><b>'+e(s[0])+'</b><small>'+e(s[1])+'</small></div></div>'}).join("")+'</div>';
 $("lead").textContent=d.lead;$("pt").innerHTML='One platform, <span class="o2">built for every role</span>';$("pp").textContent="Pick the right product for your learning, training, organisation or daily work on the ILM ORA platform.";$("ct").textContent=d.ct;$("cp").textContent=d.cp;$("bt").textContent=role=="individual"?"Why learners and trainers choose it":"Why organisations choose it";
 $("hp").textContent="Four simple steps from first visit to your dashboard.";
$("pg").innerHTML=grp("For Individuals","Advance, learn and build your career",PI,0,"c3")+grp("For Organisations","Operate ILM ORA at organisation level",PO,3,"c2")+grp("Shared by everyone","Productivity tools for every role",PS,5,"c2");
 $("st").innerHTML=[0,2,4,6].map(function(i){return'<div class="stp" style="--i:'+(i/2)+'"><span class="si">'+svgIcon(SI[i/2])+'</span><h4>'+e(d.how[i])+'</h4><p>'+e(d.how[i+1])+'</p></div>'}).join("");
 $("bg").innerHTML=d.ben.map(function(b,n){return'<div class="card rv bn" style="--i:'+n+'"><div class="top"><div class="ic">'+svgIcon(BI[role][n])+'</div>'+viz(n)+'</div><h3>'+e(b[0])+'</h3><p>'+e(b[1])+'</p></div>'}).join("");
 if(tab>=tk.length)tab=0;$("tabs").innerHTML=tk.map(function(k,i){return'<button role="tab" aria-selected="'+(i==tab)+'" data-t="'+i+'">'+e(k)+'</button>'}).join("");
  fl();pv();hero();window.fx&&fx();statsUpd()}
var STAT_SET={
 individual:[[500,0,"+","Early Learners",85],[15,0,"+","Expert Mentors",55],[20,0,"+","Courses Live",65],[4.9,1,"★","Average Rating",98]],
 product:[[2,0,"","Public Products",40],[15,0,"","Workspace Modules",75],[6,0,"","Calendar Tools",45],[1,0,"","Login for Both",100]],
 corporate:[[17,0,"+","Admin Modules",80],[3,0,"","Org Levels",50],[5,0,"","Analytics Pages",45],["Soon",0,"","Full Launch",30]],
 edutech:[[6,0,"","Planned Modules",60],[3,0,"","User Groups",45],[1,0,"","Login for All",100],["Soon",0,"","Launch",30]],
 sis:[[9,0,"","Planned Modules",70],[3,0,"","User Groups",45],[1,0,"","Login for All",100],["Soon",0,"","Launch",30]]
};
var _statT=[];
function statsUpd(){
 var set=STAT_SET[role]||STAT_SET.individual,rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 _statT.forEach(function(id){cancelAnimationFrame(id)});_statT=[];
 ROOT.querySelectorAll(".hero2 .st").forEach(function(st,i){
  var s=set[i];if(!s)return;
  var b=st.querySelector("b"),sp=st.querySelector("span"),bar=st.querySelector(".bar");
  sp.textContent=s[3];
  if(bar)bar.style.setProperty("--w",s[4]+"%");
  b.removeAttribute("data-n");
  if(typeof s[0]!=="number"||rm){b.textContent=(typeof s[0]==="number"?s[0].toFixed(s[1]):s[0])+(typeof s[0]==="number"?s[2]:"");return}
  var t0=0;
  (function f(t){
   t0=t0||t;var p=Math.min(1,(t-t0)/700);
   b.textContent=(s[0]*(1-Math.pow(1-p,3))).toFixed(s[1])+s[2];
   if(p<1)_statT[i]=requestAnimationFrame(f);
  })(performance.now());
  _statT[i]=requestAnimationFrame(function f2(t){});
 });
}
function items(){var d=D[role],k=Object.keys(d.tabs)[tab],t=d.tabs[k];t.k=k;return t}
function fl(){}
var IC={u:"users",c:"book",t:"clock",d:"dollar",a:"check",p:"percent",g:"graduation",s:"grid",v:"video",f:"file",q:"help",m:"message",k:"calendar",r:"chart"};
function em(i,t,x){return'<div class="em"><i>'+svgIcon(IC[i]||"grid")+'</i>'+t+(x?'<small>'+x+'</small>':'')+'</div>'}
function pn(t,tag,body,btn){return'<div class="pn"><div class="t"><span>'+t+'</span>'+(tag?'<u>'+tag+'</u>':'')+'</div>'+body+(btn?'<div class="bt">'+btn+'</div>':'')+'</div>'}
function cal(){var h="Mon Tue Wed Thu Fri Sat Sun".split(" ").map(function(d){return'<span class="h">'+d+'</span>'}).join(""),g="";for(var i=0;i<6;i++)g+="<span></span>";for(i=1;i<=30;i++)g+='<span'+(i==3?' class="n"':'')+'>'+i+'</span>';return'<div class="pn"><div class="t"><span>November 2026</span></div><div class="cal"><div class="g">'+h+g+'</div></div></div>'}
function stats(a){return'<div class="sg" style="grid-template-columns:repeat('+a.length+',1fr)">'+a.map(function(x){return'<div class="sk"><div class="i">'+svgIcon(IC[x[0]])+'</div><b>'+(x[3]||"0")+'</b><span>'+x[1]+'</span><small>'+x[2]+'</small></div>'}).join("")+'</div>'}
function G(c){return'<div class="pg" style="grid-template-columns:'+c[0]+'">'+c[1]+'</div>'}
var PT={
student:{tag:"STUDENT PORTAL",side:["Dashboard|/student|on",{g:"Learning",c:["My Courses|/student/courses","Video Lectures|/student/videos","Documents|/student/documents","Assignments|/student/assignments","Assessments|/student/assessments","Quiz History|/student/my-quizzes","Attendance|/student/attendance"]},"Roadmap|/student/roadmap-upgraded",{g:"Classes",c:["Live Classes|/student/live-classes","Recorded Classes|/student/recorded-classes"]},"Workspace|/student/workspace","Skill Map|/student/skill-map","Certificates|/student/certificates","Study Plan|/student/study-plan","Notebook AI|/student/notebook","Resume Builder|/student/resume-builder","Coding Lab|/student/compiler",{g:"Support",c:["Feedback|/student/feedback"]}],
 hd:["Your classroom & learning overview",'<span class="pill">0 courses</span><span class="pill">0 completed</span><span class="pill">All clear ✓</span><span class="pill l">● LIVE</span>'],
 body:function(){return stats([["c","Active Courses","0 enrolled"],["a","Completed Courses","0 finished"],["t","Pending Assessments","None overdue"],["p","Attendance","Below 75%","0%"]])+G(["2fr 2fr 1fr",pn("My Classroom","OVERVIEW",em("u","No Classroom Assigned","Waiting for admin to assign trainer"))+pn("Latest Message","Expand",em("m","No messages yet"),"Go to Inbox →")+cal()])+G(["repeat(4,1fr)",[["Video Progress","0 / 0","v","No data yet","Go to Videos →"],["Documents Progress","0 / 0","f","No data yet","Go to Documents →"],["Assignment Progress","0 / 0","f","No data yet","Go to Assignments →"],["Quiz Progress","0 / 0","q","No data yet","Go to Quizzes →"]].map(function(x){return pn(x[0],x[1],em(x[2],x[3]),x[4])}).join("")])}},
trainer:{tag:"TRAINER PORTAL",side:["Dashboard|/trainer|on","Batch Management|/trainer/batches","Workspace|/trainer/workspace","Roadmap|/trainer/roadmap-upgraded","AI Companion|/trainer/ai-companion","Whiteboard|/trainer/whiteboard","Coding Lab|/trainer/compiler","Study Plan|/trainer/study-plan",{g:"Content Management",c:["Upload Videos|/trainer/upload-videos","Course Management|/trainer/course-management","Assessments|/trainer/assessments","Attendance|/trainer/attendance","Doubts Management|/trainer/doubts-management","Feedback|/trainer/feedback"]},{g:"Live Classes",c:["Live Dashboard|/trainer/live"]},{g:"Reports & Analytics",c:["Student Reports|/trainer/student-reports","Batch Reports|/trainer/batch-reports","Performance Analysis|/trainer/performance","Skill Analytics|/trainer/skill-analytics"]}],
 hd:["All your content & student activity at a glance",'<span class="pill">0 batches</span><span class="pill">0 students</span><span class="pill">No pending doubts ✓</span><span class="pill l">● LIVE</span>'],
 body:function(){return stats([["c","Active Batches","0 running"],["g","Total Students","0 enrolled"],["f","Live Dashboard","0 total"],["f","Assignments","0 total"]])+stats([["v","Videos Uploaded","0 total"],["f","Files Uploaded","0 total"],["c","Courses Created","0 total"],["q","Pending Doubts","All clear"]])+G(["1fr 1fr 1fr 1fr",pn("Recent Videos","View all",em("v","No videos uploaded yet"))+pn("Recent Files","View all",em("f","No files uploaded yet"))+pn("Recent Assignments","View all",em("f","No assignments created yet"))+"<span></span>"])+G(["2fr 2fr 1fr",pn("Student Progress","THIS WEEK",em("r","Progress tracking coming soon"),"View Reports →")+pn("Today’s Schedule","TODAY",em("t","No upcoming sessions"),"Manage Batches →")+cal()])}},
admin:{tag:"ADMIN PORTAL",side:["Dashboard|/admin|on","WorkSpace|/admin/workspace","Organisation Manager|/admin/organisation-overview","Access Control|/admin/access-control","Roadmap|/admin/roadmap-upgraded","Assessment System|/admin/assessment-system",{g:"Course Management",c:["All Courses|/admin/courses"]},{g:"Video Management",c:["Admin Videos|/admin/videos"]},{g:"File Management",c:["Admin Files|/admin/files"]},{g:"Live & Recorded Con…",c:["Admin Live Sessions|/admin/live-sessions"]},{g:"Document Generator",c:["Certificates|/admin/certificates","Reports|/admin/reports"]},{g:"Insight Review",c:["Usage Analytics|/admin/usage","Skill Analytics|/admin/skill-analytics","Feedback Review|/admin/feedback-review","Attendance|/admin/attendance","Settings|/admin/settings"]}],
 hd:["Manage users, courses & platform performance at a glance",'<span class="pill">0 users</span><span class="pill">0 courses</span><span class="pill">All clear ✓</span><span class="pill l">● LIVE</span>'],
 body:function(){return stats([["u","Total Users","All registered accounts"],["c","Active Courses","Currently running"],["t","Pending Approvals","Awaiting review"],["d","Revenue (MTD)","This month, in USD"]])+stats([["g","Total Trainers","Active on platform"],["g","Total Students","Enrolled learners"],["s","Active Batches","Running now"],["a","Admins","Platform administrators"]])+G(["2fr 2fr 1fr",pn("Recent Users","View all",em("u","No users registered yet"))+pn("Recent Courses","View all",em("c","No courses created yet"))+pn("Pending Approvals","",em("t","No pending approvals"))])+G(["2fr 2fr 1fr",pn("Key Reports","PLATFORM",'<div class="kr"><div>User Growth<b>0%</b></div><div>Revenue Trend<b>$0K</b></div><div>Course Performance<b>0%</b></div><div>Active Sessions<b>0</b></div></div>',"View Full Reports →")+pn("Recent Activity","TODAY",em("r","No recent activity"),"Manage Users →")+cal()])}}};

PT.corp={tag:"CORPORATE PORTAL",side:["Dashboard|/corporate|on","Workspace|/student/workspace",{g:"Organisation",c:["Overview|/admin/organisation-overview","Branches|","Departments|"]},{g:"People",c:["Employees|","Roles & Access|/admin/access-control"]},{g:"Learning",c:["Courses|/admin/courses","Assessments|/admin/assessment-system","Certificates|/admin/certificates"]},{g:"Insights",c:["Reports|/admin/reports","Usage Analytics|/admin/usage","Skill Analytics|/admin/skill-analytics"]},"Settings|/admin/settings"],
 hd:["Manage your organisation, teams & learning programs at a glance",'<span class="pill">0 employees</span><span class="pill">0 departments</span><span class="pill">All clear ✓</span><span class="pill l">● PREVIEW</span>'],
 body:function(){return stats([["u","Employees","Across all branches"],["s","Departments","Active teams"],["g","Branches","Office locations"],["c","Active Programs","Learning programs running"]])+stats([["p","Completion Rate","Across programs","0%"],["t","Training Hours","This month"],["g","Certificates","Issued"],["q","Open Approvals","Awaiting review"]])+G(["2fr 2fr 1fr",pn("Departments","View all",em("s","No departments yet"))+pn("Learning by Department","THIS MONTH",em("r","No progress data yet"))+pn("Pending Approvals","",em("t","No pending approvals"))])+G(["2fr 2fr 1fr",pn("Key Reports","ORGANISATION",'<div class="kr"><div>Skill Coverage<b>0%</b></div><div>Training Attendance<b>0%</b></div><div>Completion<b>0%</b></div><div>Active Learners<b>0</b></div></div>',"View Full Reports →")+pn("Upcoming Training","TODAY",em("k","No sessions scheduled"),"Open Calendar →")+cal()])}};
var CORP={home:"/corporate",items:[["Organisation Overview","/admin/organisation-overview"],["Access Control","/admin/access-control"],["Courses","/admin/courses"],["Assessments","/admin/assessment-system"],["Certificates","/admin/certificates"],["Reports","/admin/reports"],["Usage Analytics","/admin/usage"],["Skill Analytics","/admin/skill-analytics"],["Settings","/admin/settings"],["Branches","","",1],["Departments","","",1],["Employee Directory","","",1]]};
var WSI="Overview|Events|Booking Pages|Instant Meeting|Calendar Sync|Summaries|Email|My Schedules|Shared with Me|Reminders|Contacts|Availability|Integrations|Workspace Settings".split("|").map(function(n){return[n,"/student/workspace"]});
["individual","corporate"].forEach(function(r){var T=D[r].tabs,N={};if(r=="corporate")N.Corporate=CORP;Object.keys(T).forEach(function(k){if(k!="Planned"&&k!="Workspace"&&k!="Calendar")N[k]=T[k]});D[r].tabs=N});
D.product=Object.assign({},D.individual,{lead:"Workspace and Calendar to plan, meet and stay in sync.",ct:"Bring ILM ORA Workspace and Calendar to your day",cp:"Events, booking pages, instant meetings, AI summaries, email and calendar sync in one place.",tabs:{"Workspace":{home:"/student/workspace",items:WSI},"Calendar":CALT}});
PT.edutech={tag:"EDUCATE TECH",side:["Dashboard||on",{g:"Academics",c:["Smart Classroom|","Digital Content|","Exams & Results|"]},{g:"Engage",c:["Parent Connect|","Analytics|"]},"Settings|"],
 hd:["Smart learning suite for schools & institutes at a glance",'<span class="pill">0 classes</span><span class="pill">0 teachers</span><span class="pill">All clear ✓</span><span class="pill l">● PREVIEW</span>'],
 body:function(){return stats([["g","Students","Enrolled learners"],["u","Teachers","Active faculty"],["c","Smart Classes","Running now"],["p","Engagement","Across classes","0%"]])+stats([["v","Digital Content","Lessons published"],["f","Assignments","Created"],["q","Exams","Scheduled"],["m","Parent Updates","Sent this month"]])+G(["2fr 2fr 1fr",pn("Smart Classroom","View all",em("c","No classes yet"))+pn("Engagement by Class","THIS MONTH",em("r","No data yet"))+pn("Pending Tasks","",em("t","Nothing pending"))])+G(["2fr 2fr 1fr",pn("Key Reports","INSTITUTE",'<div class="kr"><div>Attendance<b>0%</b></div><div>Avg. Score<b>0%</b></div><div>Completion<b>0%</b></div><div>Active Users<b>0</b></div></div>',"View Full Reports →")+pn("Upcoming Sessions","TODAY",em("k","No sessions scheduled"),"Open Calendar →")+cal()])}};
PT.sis={tag:"SIS · STUDENT INFORMATION SYSTEM",side:["Dashboard||on",{g:"Students",c:["Admissions|","Student Records|","Attendance|"]},{g:"Academics",c:["Timetable|","Exams & Report Cards|","Fee Management|"]},{g:"Staff",c:["Staff Directory|","Reports|"]},"Settings|"],
 hd:["Admissions, records, attendance, fees and results at a glance",'<span class="pill">0 students</span><span class="pill">0 staff</span><span class="pill">All clear ✓</span><span class="pill l">● PREVIEW</span>'],
 body:function(){return stats([["g","Total Students","Enrolled"],["u","Staff","Teaching & non-teaching"],["f","New Admissions","This term"],["p","Attendance","Today","0%"]])+stats([["d","Fees Collected","This month"],["t","Fees Pending","Awaiting payment"],["a","Report Cards","Generated"],["k","Events","This month"]])+G(["2fr 2fr 1fr",pn("Recent Admissions","View all",em("g","No admissions yet"))+pn("Attendance Trend","THIS WEEK",em("r","No data yet"))+pn("Pending Approvals","",em("t","No pending approvals"))])+G(["2fr 2fr 1fr",pn("Key Reports","SCHOOL",'<div class="kr"><div>Attendance<b>0%</b></div><div>Pass Rate<b>0%</b></div><div>Fee Collection<b>0%</b></div><div>Active Students<b>0</b></div></div>',"View Full Reports →")+pn("Today's Timetable","TODAY",em("k","No periods scheduled"),"Open Timetable →")+cal()])}};
BI.edutech=BI.sis=["compass","chart","robot"];
D.edutech=Object.assign({},D.individual,{lead:"Smart classrooms, digital content and parent connect for schools and institutes.",ct:"Bring Educate Tech to your institute",cp:"Run smart classes, digital content, exams and parent communication from one place. Preview the Educate Tech dashboard above.",tabs:{"Educate Tech":{home:"",items:[]}}});
D.sis=Object.assign({},D.individual,{lead:"Student Information System: admissions, records, attendance, fees and results in one place.",ct:"Bring SIS to your school or college",cp:"Manage admissions, student records, attendance, timetable, fees and report cards from one system. Preview the SIS dashboard above.",tabs:{"SIS":{home:"",items:[]}}});
var PK={"Student":"student","Trainer":"trainer","Business & Partnership":"admin","Admin":"admin","Corporate":"corp","Educate Tech":"edutech","SIS":"sis"},fwv="overview",hi=0,ht;
var TOP='<div class="sc-top"><span class="lg"><b>ILM</b> <i>ORA</i></span><nav><span>All Courses</span><span>ILM ORA Feature ⌄</span><span>Product ⌄</span><span>Workshops</span><span>Career Tracks ⌄</span></nav><span class="ic"><u></u><u></u><u></u><em></em></span></div>';
function lnk(q,c){return'<a class="'+c+'"'+(q[1]?' href="'+B+q[1]+'" target="_blank" rel="noopener"':'')+'>'+q[0]+'</a>'}
function sideH(list){return list.map(function(x){if(typeof x=="string")return lnk(x.split("|"),x.split("|")[2]||"");return'<div class="gh">'+x.g+'</div>'+x.c.map(function(y){return lnk(y.split("|"),"c")}).join("")}).join("")}

var VP='<span class="pill l">● LIVE</span>';
var SIDE=[["dashboard","Dashboard","/student"],{g:"Learning",c:[["courses","My Courses","/student/courses"],["videos","Video Lectures","/student/videos"],["documents","Documents","/student/documents"],["assignments","Assignments","/student/assignments"],["assessments","Assessments","/student/assessments"],["quizzes","Quiz History","/student/my-quizzes"],["attendance","Attendance","/student/attendance"]]},["roadmap","Roadmap","/student/roadmap-upgraded"],{g:"Classes",c:[["live","Live Classes","/student/live-classes"],["recorded","Recorded Classes","/student/recorded-classes"]]},["workspace","Workspace","/student/workspace"],["skills","Skill Map","/student/skill-map"],["certs","Certificates","/student/certificates"],["plan","Study Plan","/student/study-plan"],["notebook","Notebook AI","/student/notebook"],["resume","Resume Builder","/student/resume-builder"],["code","Coding Lab","/student/compiler"],{g:"Support",c:[["feedback","Feedback","/student/feedback"]]}],RT={},sv="dashboard";
function sideS(act,inter){function one(i,c){RT[i[0]]=i[2];var on=i[0]==act?" on":"";return inter?'<button class="'+c+on+'" data-sv="'+i[0]+'">'+i[1]+'</button>':'<a class="'+c+on+'">'+i[1]+'</a>'}
 return SIDE.map(function(x){return x.g?'<div class="gh">'+x.g+' ›</div>'+x.c.map(function(y){return one(y,"c")}).join(""):one(x,"")}).join("")}
sideS("",false);
// welcome-clock-refresh: update the greeting every minute while the page is open
setInterval(function(){var g=ROOT.querySelector(".welcome-greeting");if(g)g.textContent=welcomeGreeting();},60000);
function pgh(eb,t,sb,p){return'<div class="hd"><div><div class="ey">● '+eb+'</div><h3>'+t+'</h3><div class="sb">'+sb+'</div></div><div>'+(p||"")+VP+'</div></div>'}
function chips(a,on){return'<div class="fc">'+a.map(function(x,i){return i==on?'<b>'+x+'</b>':'<u>'+x+'</u>'}).join("")+'</div>'}
function tbl(c,tp,ic,m,x){return'<div class="pn" style="padding:0;min-height:250px"><div class="th" style="grid-template-columns:'+tp+'">'+c.map(function(k){return'<span>'+k+'</span>'}).join("")+'</div>'+em(ic,m,x)+'</div>'}
function ep(ic,m,x,b){return'<div class="pn" style="min-height:260px">'+em(ic,m,x)+(b?'<div style="text-align:center"><span class="b2">'+b+'</span></div>':'')+'</div>'}
function sm(a){return a.map(function(x){return'<div class="sm"><span>'+x[0]+'</span><b>'+x[1]+'</b></div>'}).join("")}
var SV={
courses:function(){return pgh("STUDENT PORTAL","My Courses","Showing 0 enrolled courses",'<span class="pill">0 courses</span>')+'<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><div class="in">Search courses...</div>'+chips(["All · 0","In Progress · 0","Completed · 0","Not Started · 0"],0).replace('class="fc"','class="fc" style="margin:0"')+'</div>'+ep("c","No courses yet","Enrolled courses appear here with their progress","Upgrade Plan")},
videos:function(){return pgh("STUDENT PORTAL","Video Lectures","Watch lectures shared by your trainers")+stats([["v","Total Lectures","In your library"],["r","Overall Progress","Across all lectures","0%"],["a","Completed","Lectures finished"]]).replace("repeat(4","repeat(3")+G(["2fr 1fr",'<div><div class="vp"><div><i>▶</i>Select a lecture to play</div></div><div class="fc" style="margin-top:8px"><b>About this lecture</b><u>Transcript</u></div></div>'+pn("Lecture Library","",'<div class="in" style="min-width:0;margin-bottom:6px">Search lectures...</div>'+chips(["Not Started","In Progress","Completed"],0)+em("v","No lectures yet"),"Upgrade Plan")])},
documents:function(){return pgh("STUDENT PORTAL","Documents","Access all study materials shared by your trainers")+stats([["f","Total Files","Shared with you"],["a","Previewed","Files opened"],["r","Progress","Documents reviewed","0%"]]).replace("repeat(4","repeat(3")+G(["1fr 2fr",pn("Files","",chips(["All","PDF","Text"],0)+em("f","No documents available"),"Upgrade Plan")+'<div class="vp" style="background:#fff;border:1px solid #E7E5E0;color:#888"><div><i>'+svgIcon("file")+'</i>Preview not available<br><small>Select a document to preview it here</small></div></div>'])},
assignments:function(){return pgh("STUDENT PORTAL","Assignments","View and submit your assignments")+chips(["Active","Submitted","Passed","Locked"],0)+ep("f","No Assignments Yet","No assignments available.")},
assessments:function(){return pgh("ASSESSMENT PORTAL","Your Assessments","Track your progress and attempt quizzes")+stats([["q","Total Assessments","Assigned to you"],["t","Pending","Not attempted"],["k","Due This Week","Upcoming deadlines"]]).replace("repeat(4","repeat(3")+chips(["All Assessments","Easy","Medium","Hard"],0)+tbl(["QUIZ ID","STATUS","DIFFICULTY","TIME LIMIT","CATEGORY","TOTAL MARKS"],"1fr 1fr 1fr 1fr 1fr 1fr","a","All caught up!","No assessments available at the moment")},
quizzes:function(){return pgh("PERFORMANCE TRACKING","My Quiz History","All your past quiz attempts")+G(["2fr 1fr",'<div><div class="fc"><b>All Attempts</b></div>'+tbl(["QUIZ","SCORE","DATE","RESULT","PERFORMANCE"],"2fr 1fr 1fr 1fr 1fr","q","No Quiz Attempts Yet")+'</div>'+pn("Your summary","",sm([["Average Score","0%"],["Passed","0"],["Failed","0"],["Best Attempt","—"],["Total Attempts","0"]]))])},
attendance:function(){return pgh("ATTENDANCE TRACKING","Attendance","Track your monthly attendance and performance")+chips(["Today","Yesterday","Last 7 Days","Last 14 Days","Last 30 Days","This Week","This Month","Custom Range"],6)+G(["2fr 1fr",pn("Attendance History","",em("k","No attendance records found"))+pn("Summary","",sm([["Attendance Rate","0%"],["Present","0"],["Late","0"],["Absent","0"]])+'<div class="th" style="grid-template-columns:repeat(5,1fr);margin-top:8px"><span>PERIOD</span><span>PRESENT</span><span>LATE</span><span>ABSENT</span><span>RATE</span></div>')])},
roadmap:function(){return pgh("STUDENT PORTAL","Roadmap","Your personalised learning roadmap")+ep("r","Learning Roadmap","This is the shared Roadmap dashboard used across Student, Trainer and Admin portals.","Open Roadmap in app")},
live:function(){return pgh("LIVE SESSIONS","Live Classes","Join your trainer’s sessions")+G(["2fr 1fr",'<div>'+pn("Live Now","LIVE",em("m","No live session right now."))+'<div style="height:10px"></div>'+pn("Your Recent Classes","",chips(["Today","Upcoming","Completed"],0)+em("k","No classes yet"))+'</div>'+pn("Today’s Schedule","View all",em("t","Nothing scheduled today"))])},
recorded:function(){return pgh("STUDENT PORTAL","Recorded Lectures","Watch your recorded and live sessions")+G(["1fr 2fr",pn("Course Content","",em("v","No recorded lessons available."))+'<div><div class="vp"><div><i>▶</i>Select a lesson to start watching</div></div><div class="pn" style="margin-top:8px;min-height:60px"><div class="t"><span>Lesson Description</span></div></div></div>'])},
skills:function(){return pgh("SKILL INTELLIGENCE","Skill Map","Where you are strong and where to improve")+stats([["r","Total Skills","Tracked skills"],["a","Strong Skills","Score above target"],["q","Weak Areas","None weak ✓"],["p","Avg. Score","Across skills","0%"]])+pn("Top Skills","Showing 0",em("r","No skill data yet","Complete assessments to build your map"))},
certs:function(){return pgh("STUDENT PORTAL","Certificate Database","View, preview and download your issued certificates")+stats([["g","Total","Certificates"],["a","Available","Ready to download"],["k","This Week","Newly issued"],["s","Active","Valid certificates"]])+tbl(["FILE NAME","TYPE","PREVIEW","DOWNLOAD"],"3fr 1fr 1fr 1fr","g","No certificates issued yet.")},
plan:function(){return pgh("STUDENT PORTAL","Study Plans","Practice problems organised by plan")+G(["1fr 2fr",pn("My study plans","",em("k","No study plans yet"))+pn("Overall progress","0%",em("r","Select a plan","Open plan to see sections and problems"),"Open plan")])},
notebook:function(){var g="Infographic|Audio Overview|Video Overview|Report|Slide Deck|Mind Map|Flashcards|Quiz|Data Table".split("|").map(function(x){return'<div>'+x+'</div>'}).join("");return pgh("STUDENT NOTEBOOK","My Notebooks","All Notebooks",'<span class="pill">Unlimited</span>')+G(["1fr 1.5fr 1fr",pn("Sources","",em("f","No sources yet","PDF, images, docs, audio, and more"),"+ Add sources")+pn("Chat with Sources","Live",'<div class="em" style="text-align:left;margin:0"><b style="font-size:8.5px;color:#111">Let’s start your notebook...</b><br>What would you like this notebook to help you do?<div class="fc" style="margin-top:8px"><u>Learn about a new topic</u><u>Create something new</u><u>Make progress on a project</u></div></div>')+pn("Studio","",'<div class="sm"><span>Output Language</span><b>English</b></div><div class="cc">'+g+'</div>'+em("r","Nothing generated yet.")+'<div class="b2 o" style="text-align:center">Generate</div><div class="b2" style="text-align:center">Open Notes Editor</div>')])},
resume:function(){return pgh("AI-POWERED · ATS-OPTIMISED · GET HIRED FASTER","Resume Builder","Choose your fastest path")+G(["1fr 1fr 1fr",pn("Generate with AI","",'<div class="em">AI writes a complete ATS-optimised resume from your target role</div>',"Get started")+pn("Start from Scratch","",'<div class="em">Pick a template and fill in each section yourself</div>',"Get started")+pn("ATS Score Checker","",'<div class="em"><i>⬆</i>Upload resume PDF for instant ATS analysis<small>Drop your resume PDF here</small></div>',"Choose PDF")])+pn("My Resumes","+ New Resume",em("f","No resumes yet","Create My Resume Now"))},
code:function(){return'<div class="hd"><div><div class="ey">● CODELAB</div><h3>CodeLab</h3></div><div>'+VP+'</div></div>'+chips(["Playground","Problems","My Files","History"],0)+G(["2fr 1fr",'<div><div class="fc"><u>Python ⌄</u><b style="background:#16A34A;border-color:#16A34A">▶ Run Code</b><u>Submit</u><u>Bash Mode</u></div><div class="ed">1&nbsp; # Start coding here<br>2<br>3<br>4<br>5</div></div><div>'+pn("Output","",em("t","Run your code to see output"))+'<div style="height:8px"></div>'+pn("Custom Input","",'<div class="ta">Enter custom input here (stdin)...</div>')+'</div>'])},
feedback:function(){var f=["Poor","Okay","Fine","Good","Amazing"],e2=["frown","meh","smile","smile","star"];return pgh("FEEDBACK PORTAL","Session Feedback","Share your honest experience with us",'<span class="pill">Trainer</span><span class="pill">Batch</span>')+G(["1fr 1fr",pn("How was this session overall?","",'<div class="rt">'+f.map(function(x,i){return'<span><i>'+svgIcon(e2[i])+'</i>'+x+'</span>'}).join("")+'</div><div class="sm"><span>How was the content?</span><b>★★★★★</b></div><div class="sm"><span>Session difficulty</span><b>Easy · Hard</b></div>')+pn("Rate your trainer","",["Clarity of explanation","Doubt clearing","Energy & engagement","Technical depth"].map(function(x){return'<div class="fr"><span>'+x+'</span><span>☆☆☆☆☆</span></div>'}).join("")+'<div class="sm" style="border:0"><span>What would help most?</span></div><div class="ta">Anything specific for the trainer or admin team…</div><div class="sm"><span>Submit anonymously<br><small style="color:#999;font-weight:400">Trainer sees your feedback but not your name</small></span><b>◯</b></div>',"Submit")])}};

function escapeWelcomeText(value){return String(value||"").replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function getWelcomeUserName(){
 var candidates=[];
 try{
  if(window.__AUTH_USER__)candidates.push(window.__AUTH_USER__);
  if(window.__USER__)candidates.push(window.__USER__);
  if(window.currentUser)candidates.push(window.currentUser);
  var keys=["user","currentUser","current_user","authUser","auth_user","profile","userProfile","userData","auth","ilmora_user","ilmoraUser","lms_user","ilmora_google_user"];
  keys.forEach(function(k){var raw=localStorage.getItem(k)||sessionStorage.getItem(k);if(raw){try{candidates.push(JSON.parse(raw))}catch(e){}}});
  var tokenKeys=["token","accessToken","access_token","authToken","jwt"];
  tokenKeys.forEach(function(k){var token=localStorage.getItem(k)||sessionStorage.getItem(k);if(token&&token.split(".").length===3){try{candidates.push(JSON.parse(atob(token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"))))}catch(e){}}});
 }catch(e){}
 function findName(obj,depth){
  if(!obj||depth>3)return "";
  if(typeof obj==="string"||typeof obj!=="object")return "";
  if(Array.isArray(obj)){for(var i=0;i<obj.length;i++){var a=findName(obj[i],depth+1);if(a)return a}return ""}
  var direct=["fullName","fullname","name","displayName","display_name","firstName","first_name","given_name"];
  for(var j=0;j<direct.length;j++){var v=obj[direct[j]];if(typeof v==="string"&&v.trim()&&!/@/.test(v))return v.trim()}
  var nested=["user","profile","data","account","student","currentUser"];
  for(var n=0;n<nested.length;n++){var r=findName(obj[nested[n]],depth+1);if(r)return r}
  return "";
 }
 for(var i=0;i<candidates.length;i++){var name=findName(candidates[i],0);if(name)return name}
 var domName=document.querySelector("[data-user-name], [data-current-user-name]");
 if(domName){var v=domName.getAttribute("data-user-name")||domName.getAttribute("data-current-user-name")||domName.textContent;if(v&&v.trim())return v.trim()}
 return "there";
}
function welcomeGreeting(){var hour=new Date().getHours();if(hour>=5&&hour<12)return "Good morning";if(hour>=12&&hour<17)return "Good afternoon";return "Good evening"}
function welcomeHero(){var name=escapeWelcomeText(getWelcomeUserName());return '<section class="welcome-hero" aria-label="Personal welcome"><div class="welcome-time"><span aria-hidden="true">👋</span><span class="welcome-greeting">'+welcomeGreeting()+'</span></div><h2 class="welcome-title">Welcome back, <span class="welcome-name">'+name+'</span></h2><p class="welcome-subtitle">Your AI-powered learning hub is ready. Pick up where you left off.</p></section>'}
function sdash(h,v,inter){if(v=="workspace")return wsdash(h,inter?fwv:"overview",inter);
 var main=v=="dashboard"?welcomeHero()+pgh("STUDENT PORTAL","Your Learning Dashboard","Your classroom & learning overview",'<span class="pill">0 courses</span><span class="pill">0 completed</span>')+PT.student.body():SV[v]();
 return'<div class="fb"><i></i><i></i><i></i><small>ilmora.texora.ai'+RT[v]+'</small></div><div class="scw" data-h="'+h+'"><div class="scr" style="height:'+h+'px">'+TOP+'<div class="sc-b"><div class="sc-s"><div class="bl"><b>ILM</b> <i>ORA</i></div><div class="pt">STUDENT PORTAL</div>'+sideS(v,inter)+'</div><div class="sc-m" style="min-height:'+(h-36)+'px">'+main+'</div></div></div></div>'}
function dash(p,h,url){var P=PT[p];return'<div class="fb"><i></i><i></i><i></i><small>ilmora.texora.ai'+url+'</small></div><div class="scw" data-h="'+h+'"><div class="scr" style="height:'+h+'px">'+TOP+'<div class="sc-b"><div class="sc-s"><div class="bl"><b>ILM</b> <i>ORA</i></div><div class="pt">'+P.tag+'</div>'+sideH(P.side)+'</div><div class="sc-m"><div class="hd"><div><div class="ey">● '+P.tag+'</div><h3>Good Afternoon!</h3><div class="sb">'+P.hd[0]+'</div></div><div>'+P.hd[1]+'</div></div>'+P.body()+'</div></div></div></div>'}
var SPX=["Dashboard|/student","Learning ›|/student/courses","Roadmap|/student/roadmap-upgraded","Classes ›|/student/live-classes","Workspace|/student/workspace|on","Skill Map|/student/skill-map","Certificates|/student/certificates","Study Plan|/student/study-plan","Notebook AI|/student/notebook","Resume Builder|/student/resume-builder","Coding Lab|/student/compiler","Support ›|/student/feedback"];
var WN=[["MAIN",[["Overview","overview"],["Events"],["Booking Pages","","New"],["Instant Meeting"],["Calendar","calendar"],["Calendar Sync","sync"],["Summaries"],["Email"]]],["MANAGE",[["My Schedules"],["Shared with Me"],["Reminders"],["Contacts"]]],["CONFIGURATION",[["Availability"],["Integrations"],["Workspace Settings"]]]];
function wh(t,sub,r){return'<div class="wh"><div><h3>'+t+'</h3><div class="sb">'+sub+'</div></div><div><span class="pill g">● Live</span><span class="pill w">Tue, Nov 3, 2026</span>'+(r?'<b class="pb">'+r+'</b>':'')+'</div></div>'}
function wsmain(v){if(v=="calendar"){var c="";"Sun Mon Tue Wed Thu Fri Sat".split(" ").forEach(function(d){c+='<span class="h">'+d+'</span>'});for(var i=1;i<=30;i++)c+='<span'+(i==3?' class="t"':'')+'>'+i+'</span>';for(i=0;i<5;i++)c+='<span class="z"></span>';
 return wh("Calendar","View and manage your schedule.","+ Create Event")+'<div class="wg"><div class="wp"><div class="seg2"><span>‹ November 2026 ›</span><span><b>Month</b> <u>Week</u> <u>Day</u></span></div><div class="mg">'+c+'</div></div><div><div class="wp"><h5>November 3, 2026</h5><p>No events scheduled on this day.</p><span class="lk">View full day →</span></div></div></div>'}
 if(v=="sync")return wh("Calendar Sync","Sync your calendar to keep everything up to date.")+'<div class="wp" style="min-height:140px;text-align:center"><h5>Connected Calendar</h5><div style="margin:22px 0 6px;font-size:18px;text-align:left;color:#7C3AED">'+svgIcon("calendar")+'</div><p style="color:#111;font-weight:600;font-size:8px">No calendar connected</p><p>Connect Google Calendar to sync your events.</p><b class="pb" style="display:inline-block">Connect Google Calendar</b></div>';
 var K=[["Upcoming Events","0 total","#EDE9FE","calendar"],["Scheduled Today","View calendar →","#FEF3C7","clock"],["Pending Reminders","0 pending","#DCFCE7","bell"],["Emails","0 unread","#FEE2E2","mail"]];
 return wh("Workspace Overview","Manage your events, meetings, calendar and communications in one place.","+ Create New")+'<div class="wk">'+K.map(function(k){return'<div><i style="background:'+k[2]+'">'+svgIcon(k[3])+'</i><b>0</b><span>'+k[0]+'</span><small>'+k[1]+'</small></div>'}).join("")+'</div><div class="wg"><div class="wp" style="align-self:start"><h5>Upcoming Events <span class="lk">View all →</span></h5><p>No upcoming events.</p><p style="text-align:center;border-top:1px solid #EEE;padding-top:8px" class="lk">View full calendar →</p></div><div><div class="wp"><h5>Instant Meeting</h5><p>Start an instant meeting with your team or students.</p><b class="pb">Start Instant Meeting</b></div><div class="wp"><h5>Calendar Sync</h5><p>Sync your calendar to keep everything up to date.</p><div class="ln"><span><b>Google Calendar</b><br>Not connected</span><u class="pill">Connect</u></div></div><div class="wp"><h5>Email</h5><p>Compose and manage your emails.</p><b class="pb">Compose Email</b></div></div></div>'}
function wsdash(h,v,inter){var nav=WN.map(function(g){return'<small>'+g[0]+'</small>'+g[1].map(function(i){var on=i[1]==v?" on":"";return i[1]&&inter?'<button class="'+on+'" data-wv="'+i[1]+'">'+i[0]+'</button>':'<a class="'+on+'">'+i[0]+(i[2]?'<em>'+i[2]+'</em>':'')+'</a>'}).join("")}).join("");
 return'<div class="fb"><i></i><i></i><i></i><small>ilmora.texora.ai/student/workspace</small></div><div class="scw" data-h="'+h+'"><div class="scr" style="height:'+h+'px">'+TOP+'<div class="sc-b"><div class="sc-s"><div class="bl"><b>ILM</b> <i>ORA</i></div><div class="pt">STUDENT PORTAL</div>'+sideS("workspace",inter)+'</div><div class="ws-n"><h6>Workspace</h6>'+nav+'</div><div class="ws-m">'+wsmain(v)+'</div></div></div></div>'}
function strip(t){var n=t.k=="Corporate"?"Interactive demo with sample data — every sidebar tab is open to explore.":"Fully interactive demo with sample data — click any sidebar item to explore every tab.";return'<div class="cap"><span>'+n+'</span><a href="'+B+(t.home||"/login")+'" target="_blank" rel="noopener">Open in app →</a></div>'}
function info(t){return""}
var IFR={"Student":["student",""],"Trainer":["trainer",""],"Business & Partnership":["admin",""],"Admin":["admin",""],"Corporate":["corp",""],"Workspace":["wsp","ov"],"Calendar":["wsp","cl"]},ENG=(ROOT.querySelector("#eng")||{}).textContent||"";ENG=ENG.split("<\\\\/script").join("</script");
function curTheme(){return ROOT.dataset.theme==="dark"?"dark":"light"}
function ifr(k,h,inter){if(inter)h=500;var c=IFR[k],u={student:"/student",trainer:"/trainer",admin:"/admin",corp:"/corporate",wsp:"/workspace"}[c[0]],doc=ENG.replace("__ROLE__",c[0]).replace("__PAGE__",c[1]).replace("__THEME__",curTheme());
 return'<div class="fb"><i></i><i></i><i></i><small>ilmora.texora.ai'+u+'</small></div><div class="ifw" data-h="'+h+'"><iframe title="'+k+' portal preview" style="width:1180px;height:'+h+'px;border:0;transform-origin:0 0;'+(inter?'':'pointer-events:none;')+'" srcdoc="'+doc.replace(/&/g,"&amp;").replace(/"/g,"&quot;")+'"></iframe></div>'}
function view(t,h,inter){var k=t.k,p=PK[k];if(IFR[k])return ifr(k,h,inter)+(inter?strip(t):"");if(k=="Workspace"||k=="Calendar")return wsdash(h,inter?fwv:(k=="Calendar"?"calendar":"overview"),inter)+(inter?strip(t):"");if(k=="Student")return sdash(h,inter?sv:"dashboard",inter)+(inter?strip(t):"");if(IFR[k])return ifr(k,h,inter)+(inter?strip(t):"");return dash(p,h,t.home)+(inter?strip(t):"")}
function fit(){ROOT.querySelectorAll(".ifw").forEach(function(w){var cw=w.clientWidth;if(!cw)return;var f=w.firstElementChild,H0=+w.dataset.h,mob=innerWidth<900,H=mob?Math.max(420,Math.min(H0,Math.round(innerHeight*.78))):H0,k=mob?1:Math.min(1,cw/1180);f.style.width=(mob?cw:(k<1?1180:cw))+"px";f.style.height=(H/k)+"px";f.style.transform=k<1?"scale("+k+")":"none";w.style.height=H+"px"});ROOT.querySelectorAll(".scw").forEach(function(w){var k=w.clientWidth/860;w.firstElementChild.style.transform="scale("+k+")";w.style.height=(w.dataset.h*k)+"px"})}
function pv(){$("pv").innerHTML=view(items(),620,true);fit()}
function slides(){var d=D[role];return Object.keys(d.tabs).map(function(k){var t=d.tabs[k];t.k=k;return t})}
function auto(){clearInterval(ht);if(!matchMedia("(prefers-reduced-motion:reduce)").matches)ht=setInterval(function(){hi++;hero()},6000)}
function hero(){var hfEl=$("hf");if(!hfEl)return;var S=slides();hi=(hi+S.length)%S.length;hfEl.innerHTML=view(S[hi],380,false)+'<button class="cn l" data-c="-1" aria-label="Previous">‹</button><button class="cn r" data-c="1" aria-label="Next">›</button><div class="cd">'+S.map(function(x,i){return'<button data-a="'+i+'" aria-current="'+(i==hi)+'">'+e(x.k)+'</button>'}).join("")+'</div>';fit()}
addEventListener("resize",fit);$("hf").onmouseenter=function(){clearInterval(ht)};$("hf").onmouseleave=auto;auto();

ROOT.addEventListener("click",function(ev){var b=ev.target.closest("button");if(!b)return;
 if(b.dataset.r){role=b.dataset.r;tab=0;fi=0;hi=0;sv="dashboard";fwv="overview";render()}
 else if(b.dataset.t){tab=+b.dataset.t;fi=0;sv="dashboard";fwv=Object.keys(D[role].tabs)[tab]=="Calendar"?"calendar":"overview";render()}
 else if(b.dataset.wv){fwv=b.dataset.wv;pv()}
 else if(b.dataset.sv){sv=b.dataset.sv;if(sv=="workspace")fwv="overview";pv()}
 else if(b.dataset.c){hi+=+b.dataset.c;hero();auto()}
 else if(b.dataset.a){hi=+b.dataset.a;hero();auto()}
 
});
ROOT.addEventListener("ilm-theme",function(){syncTheme()});function syncTheme(){ROOT.querySelectorAll("iframe").forEach(function(f){try{f.contentWindow.postMessage({ilmTheme:curTheme()},"*")}catch(e){}})}
$("fq").innerHTML=FAQ.map(function(f){return'<details><summary>'+e(f[0])+'</summary><p>'+e(f[1])+'</p></details>'}).join("");
render();
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});
ROOT.querySelectorAll(".rv").forEach(function(n){io.observe(n)});

window.fx=function(){ROOT.querySelectorAll(".rv:not(.in)").forEach(function(n){io.observe(n)});
 ROOT.querySelectorAll(".card:not([data-g])").forEach(function(c){c.dataset.g=1;c.addEventListener("pointermove",function(ev){var r=c.getBoundingClientRect();c.style.setProperty("--mx",(ev.clientX-r.left)+"px");c.style.setProperty("--my",(ev.clientY-r.top)+"px")})})};
fx();
(function(){var rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
 var co=new IntersectionObserver(function(en){en.forEach(function(x){if(!x.isIntersecting)return;co.unobserve(x.target);var el=x.target,n=+el.dataset.n,d=+el.dataset.d,sf=el.dataset.s,t0=0;if(rm)return;
  (function f(t){t0=t0||t;var p=Math.min(1,(t-t0)/1400);el.textContent=(n*(1-Math.pow(1-p,3))).toFixed(d)+sf;if(p<1)requestAnimationFrame(f)})(performance.now())})},{threshold:.5});
 ROOT.querySelectorAll("[data-n]").forEach(function(n){co.observe(n)});
 var w=ROOT.querySelector(".hfw");if(!rm&&matchMedia("(hover:hover)").matches){w.addEventListener("mousemove",function(ev){var r=w.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;w.style.transform="perspective(1400px) rotateY("+x*4+"deg) rotateX("+-y*3+"deg)"});w.addEventListener("mouseleave",function(){w.style.transform=""})}
 var sp=$("sp"),tk=0;addEventListener("scroll",function(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;var h=document.documentElement.scrollHeight-innerHeight;sp.style.setProperty("--p",(h>0?scrollY/h*100:0)+"%")})},{passive:true})})();
(function(){var mb=$("mb"),mm=$("mm");
 function setM(o){if(!mb||!mm)return;mm.classList.toggle("open",o);mb.setAttribute("aria-expanded",o?"true":"false");mb.setAttribute("aria-label",o?"Close menu":"Open menu");mb.innerHTML=o?'<svg class="ui-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m18 6-12 12M6 6l12 12"/></svg>':'<svg class="ui-ico" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'}
 if(mb&&mm){mb.addEventListener("click",function(){setM(!mm.classList.contains("open"))});
  mm.addEventListener("click",function(ev){if(ev.target.closest("a"))setM(false)});
  document.addEventListener("keydown",function(ev){if(ev.key=="Escape")setM(false)});
  ROOT.addEventListener("click",function(ev){if(!ev.target.closest("nav"))setM(false)});
  addEventListener("resize",function(){if(innerWidth>1024)setM(false)})}
 addEventListener("orientationchange",function(){setTimeout(fit,250)});
 var hf=$("hf"),sx=0,sy=0,on=0;
 hf.addEventListener("touchstart",function(ev){var t=ev.touches[0];sx=t.clientX;sy=t.clientY;on=1},{passive:true});
 hf.addEventListener("touchend",function(ev){if(!on)return;on=0;var t=ev.changedTouches[0],dx=t.clientX-sx,dy=t.clientY-sy;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5){hi+=dx<0?1:-1;hero();auto()}},{passive:true})})();
 (function(){
 ROOT.addEventListener("click",function(ev){
  var a=ev.target.closest&&ev.target.closest('a[href^="#"]');
  if(!a)return;
  var id=a.getAttribute("href").slice(1);
  var t=id?ROOT.querySelector("#"+id):null;
  ev.preventDefault();
  if(t){t.scrollIntoView({behavior:"smooth",block:"start"})}
  else if(id==="top"||!id){window.scrollTo({top:0,behavior:"smooth"})}
  if(location.hash){history.replaceState(null,"",location.pathname+location.search)}
 });
 if(location.hash){history.replaceState(null,"",location.pathname+location.search)}
})();

(function(){
   ICON_PATHS.lock='<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>';
  var CH=[["graduation","Student","LMS Dashboard","#8B5CF6","Student",0,"Dashboard"],["users","Trainer","Teaching Dashboard","#22C55E","Trainer",0,"Dashboard"],["handshake","Business & Partnership","Growth Dashboard","#F97316","Business & Partnership",0,"Dashboard"],["building","Admin","Enterprise Dashboard","#64748B","",1,"Dashboard"],["grid","ILM ORA Workspace","Team Collaboration","#3B82F6","Workspace",0,"Product"],["calendar","ILM ORA Calendar","Scheduling & Events","#EC4899","Calendar",0,"Product"],["present","Educate Tech","Smart Learning Suite","#0EA5E9","",1,"Dashboard"],["file","SIS","Student Information System","#14B8A6","",1,"Dashboard"]];
 var GR=[["LMS","graduation","#8B5CF6",[0,1,2],"repeat(3,minmax(0,1fr))",0],["Product","layers","#16A34A",[4,5],"repeat(2,minmax(0,1fr))",0],["Corporate","building","#F97316",[3],"1fr auto",1],["Educate Tech","present","#0EA5E9",[6],"1fr auto",1],["SIS","file","#14B8A6",[7],"1fr auto",1]];
 var xg=$("xg");
   var XSUB={"LMS":"Learn & Grow","Product":"Work, Collaborate & Meet","Corporate":"Manage & Control","Educate Tech":"Smart Learning Suite","SIS":"Student Information System"};
  if(xg){xg.innerHTML=GR.map(function(g,gi){
   var soon=!!g[5];
   var head='<button type="button" class="xgt"'+(soon?' disabled':' data-xt aria-expanded="false"')+'><span class="xgi">'+svgIcon(g[1])+'</span><span class="xgn"><strong>'+e(g[0])+'</strong><small>'+e(XSUB[g[0]]||"")+'</small></span>'+(soon?'<span class="xsoon">'+svgIcon("lock")+'Coming Soon</span>':'<span class="xgc">'+svgIcon("arrow")+'</span>')+'</button>';
   var body=soon?'':'<div class="xrow" style="grid-template-columns:'+g[4]+'">'+g[3].map(function(i){var c=CH[i];return'<button type="button" class="xcd" data-xc="'+i+'" style="--c:'+c[3]+'"><span class="xic">'+svgIcon(c[0])+'</span><span class="xtx"><strong>'+e(c[1])+'</strong><small>'+e(c[2])+'</small></span></button>'}).join("")+'</div>';
   return'<div class="xgp" style="--g:'+g[2]+'">'+head+body+'</div>'}).join("")}
  ROOT.addEventListener("click",function(ev){var t=ev.target.closest("[data-xt]");if(!t)return;var o=t.parentNode.classList.toggle("open");t.setAttribute("aria-expanded",o)});
  ROOT.addEventListener("click",function(ev){
  var b=ev.target.closest("[data-xc]");if(!b||b.disabled)return;
      var KEYS=["student","trainer","business","corporate","workspace","calendar"];
  ROOT.dispatchEvent(new CustomEvent("ilm-role",{detail:KEYS[+b.dataset.xc]}));
 });
  function gpName(){
  var n=getWelcomeUserName();
  if(n&&n!=="there")return n;
  var w=document.querySelector(".welcome-name");
  if(w&&w.textContent.trim())return w.textContent.trim();
  var av=document.querySelector("[data-user-name]");
  if(av&&av.getAttribute("data-user-name"))return av.getAttribute("data-user-name").trim();
  return "";
 }
 function gp(){var h=new Date().getHours(),m=h>=5&&h<12,a=h>=12&&h<17,g=m?"Good Morning":a?"Good Afternoon":"Good Evening",ic=m?"☀️":a?"🌤️":"🌙",n=gpName(),el=$("gp");
  if(el)el.innerHTML='<span aria-hidden="true">'+ic+'</span><span>'+g+(n?', <b>'+escapeWelcomeText(n)+'</b>':'')+' 👋</span>'}
  gp();setTimeout(gp,300);setTimeout(gp,1200);setInterval(gp,60000);ROOT.addEventListener("ilm-name",gp);ROOT.addEventListener("ilm-name",gp);
})();
`;

export default function OnboardingLanding({ theme = 'light', onLogin, userName, onRoleSelect }) {
  const rootRef = useRef(null);

      useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // React is div ke andar kuch render nahi karta. HTML hum khud daalte hain,
    // isliye React baad mein ise reset nahi kar sakta.
               if (userName) window.__AUTH_USER__ = { name: userName };
        root.innerHTML = HTML;
        root.classList.add('ob-ready');

    const docListeners = [];
    const winListeners = [];
    const rootListeners = [];
    const intervals = [];
    const dAdd = document.addEventListener;
    const wAdd = window.addEventListener;
    const rAdd = root.addEventListener;
    const sI = window.setInterval;
    document.addEventListener = function (...a) { docListeners.push(a); return dAdd.apply(document, a); };
    window.addEventListener = function (...a) { winListeners.push(a); return wAdd.apply(window, a); };
    root.addEventListener = function (...a) { rootListeners.push(a); return rAdd.apply(root, a); };
    window.setInterval = function (...a) { const id = sI.apply(window, a); intervals.push(id); return id; };

        try {
      new Function('ROOT', SCRIPT)(root);
    } catch (err) {
      console.error('Onboarding script error:', err);
    }
    try {
      mountShowcase(root);
    } catch (err) {
      console.error('[ILM] showcase error:', err);
    } finally {
      document.addEventListener = dAdd;
      window.addEventListener = wAdd;
      root.addEventListener = rAdd;
          window.setInterval = sI;
    }

    return () => {
      docListeners.forEach((a) => document.removeEventListener(a[0], a[1], a[2]));
      winListeners.forEach((a) => window.removeEventListener(a[0], a[1], a[2]));
      rootListeners.forEach((a) => root.removeEventListener(a[0], a[1], a[2]));
      intervals.forEach((id) => clearInterval(id));
                  root._stopShowcase && root._stopShowcase();
      root.classList.remove('ob-ready');
      root.innerHTML = '';
    };
  }, []);

  // Keep the embedded portal previews in sync with the page theme
  useEffect(() => {
    rootRef.current && rootRef.current.dispatchEvent(new Event('ilm-theme'));
    }, [theme]);
    // Hero "Choose Your Experience" cards -> same handler as the top role row
  const roleCbRef = useRef(onRoleSelect);
  roleCbRef.current = onRoleSelect;
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const h = (e) => { roleCbRef.current && roleCbRef.current(e.detail); };
    root.addEventListener('ilm-role', h);
    return () => root.removeEventListener('ilm-role', h);
  }, []);

  // Real user name in the greeting
 
  useEffect(() => {
    if (!userName) return;
    window.__AUTH_USER__ = { name: userName };
    rootRef.current && rootRef.current.dispatchEvent(new Event('ilm-name'));
  }, [userName]);

  // Login / demo links open the existing login modal instead of leaving the page
  const handleClick = (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (/\/(login|ilm-demo|onboarding)\/?$/.test(href)) {
      e.preventDefault();
      if (onLogin) onLogin();
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: CSS + SHOWCASE_CSS }} />
      <div
        id="ilm-onboarding"
        ref={rootRef}
        data-theme={theme}
                onClick={handleClick}
        suppressHydrationWarning
      />
    </>
  );
}

















