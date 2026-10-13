"use client";
/**
 * ILM ORA Workshops: one self-contained page component.
 *
 *   src/legacy-pages/Landing/Ilmora-workshops.jsx   (this file)
 *   app/(public)/Ilmora-workshops/client.jsx        renders <IlmoraWorkshops {...props} />
 *   app/(public)/Ilmora-workshops/page.jsx          metadata + <Client />
 *
 * Same pattern as Ilmora-Microsoft.jsx: the page is wrapped in <PublicLayout> (shared
 * Navbar + Footer) and in the .ilm theme wrapper, so light/dark mode follows the site.
 *
 * Inside the page, navigation uses the URL hash, so no extra Next.js routes are needed:
 *   #/workshops              listing           #/dashboard         registered workshops
 *   #/workshops/<slug>       details           #/watch/<slug>      on-demand modules
 *   #/register/<slug>        registration      #/login             sign in / sign up
 *   #/confirmation/<slug>    confirmation
 *
 * INTEGRATION: see the CONFIG block. Set USE_MOCK to false once the real endpoints exist.
 * All page styles are scoped under .wk, so no other page is affected.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Same shared shell (AnnouncementBanner, Navbar, Footer) used by Ilmora-Microsoft, StudyAbroad, Careers etc.
import PublicLayout from "../Landing/components/PublicLayout";

/* ====================================================================
   CONFIG
   ==================================================================== */

const CONFIG = {
  /** true  = sample data from the MOCK block (UI preview only, clearly labelled on the page).
   *  false = real backend through realApi below. */
  USE_MOCK: true,
  API_BASE: process.env.NEXT_PUBLIC_API_URL || '',
};

/* ====================================================================
   SCOPED STYLES (everything lives under .wk)
   ==================================================================== */
const WK_CSS = `.wk{
  --bg:var(--cream,#f6ede6); --solid:var(--card,#ffffff);
  --surface:color-mix(in srgb,var(--card,#fff) 94%,transparent);
  --text:var(--tx,#1f1b18); --muted:var(--mut,#6a5f57);
  --ln:var(--line,rgba(60,35,20,.14));
  --brand:var(--or,#f97316); --brand2:#fb8b3a; --accent:#00a857; --ok:#0f7a58; --err:#c42c49;
  --shadow:0 8px 22px rgba(60,35,10,.12); --r-lg:16px; --r-md:12px; --r-sm:8px;
  position:relative; isolation:isolate; background:var(--bg); color:var(--text);
  min-height:60vh; font-family:inherit; font-size:14px; line-height:1.5; font-weight:400;
  overflow-x:clip; -webkit-font-smoothing:antialiased;
}
.wk *,.wk *::before,.wk *::after{box-sizing:border-box}
.wk h1,.wk h2,.wk h3,.wk h4{font-family:inherit;line-height:1.15;margin:0;letter-spacing:-.012em;color:var(--text)}
.wk h1{font-size:clamp(1.7rem,3.8vw,2.5rem);font-weight:700}
.wk h2{font-size:clamp(1.05rem,2vw,1.35rem);font-weight:700}
.wk h3{font-size:.98rem;font-weight:700}
.wk p{margin:0}
.wk a{color:inherit}
.wk button,.wk input,.wk select,.wk textarea{font:inherit;color:inherit}
.wk :focus-visible{outline:3px solid var(--accent);outline-offset:2px;border-radius:6px}
.wk .wrap{width:100%;max-width:var(--w,1200px);margin:0 auto;padding:0 20px}
.wk .bgclip{position:absolute;inset:0;clip-path:inset(0);pointer-events:none;z-index:-1}
.wk .bg3d{position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;transition:opacity .6s}
.wk .wk-main{position:relative;z-index:1;outline:none;padding-bottom:44px}
.wk .notice{background:color-mix(in srgb,var(--accent) 14%,transparent);border-bottom:1px solid color-mix(in srgb,var(--accent) 40%,transparent);padding:6px 14px;text-align:center;font-size:.78rem;font-weight:600}
.wk .sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0}
.wk .muted{color:var(--muted)}

/* buttons, badges */
.wk .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid transparent;border-radius:999px;padding:7px 15px;min-height:36px;font-size:.86rem;font-weight:700;cursor:pointer;text-decoration:none;white-space:nowrap;transition:transform .18s,box-shadow .2s,background .2s}
.wk .btn:active{transform:scale(.97)}
.wk .btn-primary{background:linear-gradient(135deg,var(--brand),var(--brand2));color:#fff;box-shadow:0 6px 16px color-mix(in srgb,var(--brand) 38%,transparent)}
.wk .btn-primary:hover{box-shadow:0 9px 22px color-mix(in srgb,var(--brand) 52%,transparent);transform:translateY(-1px)}
.wk .btn-ghost{background:transparent;border-color:var(--ln);color:var(--text)}
.wk .btn-ghost:hover{background:color-mix(in srgb,var(--brand) 9%,transparent);border-color:var(--brand)}
.wk .btn[disabled],.wk .btn[aria-disabled="true"]{opacity:.55;cursor:not-allowed;transform:none;box-shadow:none}
.wk .btn-sm{padding:5px 11px;min-height:30px;font-size:.78rem}
.wk .btn-block{width:100%}
.wk .badge{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:999px;font-size:.68rem;font-weight:700;background:rgba(10,12,30,.72);color:#fff;backdrop-filter:blur(6px)}
.wk .badge.live i{width:7px;height:7px;border-radius:50%;background:#ff4d6d;animation:wkpulse 1.8s infinite}
.wk .badge.free{background:var(--accent);color:#fff}
@keyframes wkpulse{70%{box-shadow:0 0 0 7px rgba(255,77,109,0)}100%{box-shadow:0 0 0 0 rgba(255,77,109,0)}}
.wk .glass{background:var(--surface);border:1px solid var(--ln);box-shadow:var(--shadow)}

/* hero + search + filters */
.wk .hero{padding-top:28px;padding-bottom:4px}
.wk .hero h1{max-width:none}
.wk .lead{max-width:58ch;margin-top:10px;font-size:.95rem;color:var(--muted)}
.wk .searchbox{display:flex;align-items:center;gap:8px;margin-top:18px;padding:5px 5px 5px 14px;border-radius:999px;max-width:600px}
.wk .searchbox svg{flex:none;opacity:.6}
.wk .searchbox input{flex:1;min-width:0;border:0;background:transparent;outline:0;font-size:.92rem;padding:7px 0}
.wk .searchbox:focus-within{box-shadow:0 0 0 3px color-mix(in srgb,var(--brand) 50%,transparent),var(--shadow)}
.wk .cats{display:flex;gap:6px;overflow-x:auto;padding:12px 20px 4px;margin:0 -20px;scrollbar-width:none}
.wk .cats::-webkit-scrollbar{display:none}
.wk .pill{flex:none;border:1px solid var(--ln);background:var(--surface);border-radius:999px;padding:5px 13px;font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s}
.wk .pill small{opacity:.65;margin-left:4px;font-weight:600}
.wk .pill:hover{border-color:var(--brand)}
.wk .pill[aria-pressed="true"]{background:linear-gradient(135deg,var(--brand),var(--brand2));border-color:transparent;color:#fff}
.wk .filters{display:none;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:10px;padding:12px;border-radius:var(--r-md)}
.wk .filters.open{display:grid}
@media(min-width:900px){.wk .filters{display:grid}.wk #filtersBtn{display:none}}
.wk label.f{display:grid;gap:4px;font-size:.74rem;font-weight:600;color:var(--muted)}
.wk select,.wk input[type=text],.wk input[type=email],.wk input[type=password],.wk input[type=tel],.wk textarea,.wk input[type=search]{width:100%}
.wk .in,.wk select,.wk textarea{background:var(--solid);border:1px solid var(--ln);border-radius:var(--r-sm);padding:7px 10px;min-height:36px;font-size:.88rem;color:var(--text)}
.wk .in:focus,.wk select:focus,.wk textarea:focus{outline:3px solid color-mix(in srgb,var(--brand) 45%,transparent);border-color:var(--brand)}
.wk .in[aria-invalid="true"],.wk textarea[aria-invalid="true"],.wk select[aria-invalid="true"]{border-color:var(--err)}
.wk .err{color:var(--err);font-size:.76rem;font-weight:600;min-height:1em}

/* sections + cards */
.wk .sec{margin-top:30px}
.wk .sechead{display:flex;align-items:end;justify-content:space-between;gap:10px;margin-bottom:12px}
.wk .sechead p{color:var(--muted);margin-top:2px;font-size:.84rem}
.wk .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(245px,1fr));gap:16px;perspective:1100px}
.wk .row{display:flex;gap:16px;overflow-x:auto;padding:8px 20px 18px;margin:0 -20px;perspective:1100px;scrollbar-width:none}
.wk .row::-webkit-scrollbar{display:none}
@media(prefers-reduced-motion:reduce){.wk .row{scrollbar-width:thin}.wk .row::-webkit-scrollbar{display:block}}
.wk .row .card{flex:0 0 min(272px,80vw);min-width:0}
.wk .card{position:relative;min-width:0;display:flex;flex-direction:column;border-radius:var(--r-lg);background:var(--surface);border:1px solid var(--ln);box-shadow:var(--shadow);transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .3s}
.wk .card:hover{box-shadow:0 20px 38px color-mix(in srgb,var(--brand) 28%,rgba(60,25,0,.2))}
.wk .card.tilting{transition:transform .06s linear,box-shadow .3s}
.wk .card::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(220px circle at var(--mx,50%) var(--my,0%),rgba(255,255,255,.2),transparent 60%);opacity:0;transition:opacity .25s}
.wk .card:hover::after{opacity:1}
.wk .art{position:relative;border-radius:var(--r-lg) var(--r-lg) 0 0;overflow:hidden;aspect-ratio:16/8.4;margin:-1px -1px 0}
.wk .art svg{display:block;width:100%;height:100%}
.wk .art .badges{position:absolute;left:9px;top:9px;display:flex;gap:5px;flex-wrap:wrap}
.wk .cbody{display:flex;flex-direction:column;gap:7px;padding:11px 13px 13px;flex:1}
.wk .cbody h3 a{text-decoration:none}
.wk .cbody h3 a::before{content:"";position:absolute;inset:0;z-index:0;border-radius:inherit}
.wk .cbody p.sd{color:var(--muted);font-size:.8rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.wk .inst{display:flex;align-items:center;gap:8px;font-size:.8rem;font-weight:600}
.wk .av{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:.66rem;color:#fff;box-shadow:0 0 0 2px var(--solid)}
.wk .av.lg{width:58px;height:58px;font-size:1.1rem}
.wk .meta{display:flex;flex-wrap:wrap;gap:3px 11px;font-size:.74rem;color:var(--muted)}
.wk .meta span{display:inline-flex;align-items:center;gap:4px}
.wk .cfoot{margin-top:auto;flex-wrap:wrap;display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:7px;border-top:1px dashed var(--ln)}
.wk .price{font-weight:800;font-size:1.02rem}
.wk .price.free{color:var(--ok)}
.wk .cta{display:flex;gap:6px;position:relative;z-index:2}
.wk .cta .btn-sm{padding:5px 9px;font-size:.74rem}
.wk .state{display:grid;place-items:center;text-align:center;gap:9px;padding:36px 18px;border-radius:var(--r-lg)}
.wk .state svg{opacity:.85}
.wk .skel{border-radius:var(--r-lg);height:300px;background:linear-gradient(100deg,var(--surface) 30%,color-mix(in srgb,var(--brand) 13%,var(--surface)) 50%,var(--surface) 70%);background-size:300% 100%;animation:wksh 1.3s infinite linear;border:1px solid var(--ln)}
@keyframes wksh{to{background-position:-100% 0}}

/* details */
.wk .crumbs{padding-top:16px;font-size:.78rem;color:var(--muted)}
.wk .crumbs a{text-decoration:none}.wk .crumbs a:hover{text-decoration:underline}
.wk .banner{position:relative;margin-top:10px;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);height:clamp(140px,19vw,210px);transform-style:preserve-3d;perspective:1200px}
.wk .banner svg{width:100%;height:100%;display:block}
.wk .banner .badges{position:absolute;left:14px;top:14px;display:flex;gap:6px}
.wk .dgrid{display:grid;gap:18px;margin-top:18px}
@media(min-width:960px){.wk .dgrid{grid-template-columns:minmax(0,1fr) 320px;align-items:start}}
.wk .panel{border-radius:var(--r-lg);padding:18px}
.wk .panel+.panel{margin-top:12px}
.wk .panel h2{margin-bottom:10px}
.wk .aside{position:sticky;top:104px}
.wk .facts{display:grid;gap:9px;margin:12px 0;padding:0;list-style:none}
.wk .facts li{display:flex;gap:9px;align-items:flex-start;font-size:.84rem}
.wk .facts b{display:block;font-size:.7rem;color:var(--muted);font-weight:600}
.wk .ticks{display:grid;gap:7px;padding:0;margin:0;list-style:none;font-size:.88rem}
.wk .ticks li{display:flex;gap:8px}
.wk .ticks li::before{content:"";flex:none;width:17px;height:17px;margin-top:2px;border-radius:50%;background:var(--ok) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10.5l3.2 3.2L15 6.8' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/contain no-repeat}
.wk .twocol{display:grid;gap:14px}
@media(min-width:640px){.wk .twocol{grid-template-columns:1fr 1fr}}
.wk details.ag{border:1px solid var(--ln);border-radius:var(--r-md);background:var(--solid);overflow:hidden}
.wk details.ag+details.ag{margin-top:8px}
.wk details.ag summary{cursor:pointer;padding:10px 13px;display:flex;gap:10px;justify-content:space-between;align-items:center;font-weight:700;font-size:.88rem;list-style:none}
.wk details.ag summary::-webkit-details-marker{display:none}
.wk details.ag summary::after{content:"+";font-size:1.1rem;transition:transform .25s}
.wk details.ag[open] summary::after{transform:rotate(45deg)}
.wk details.ag .t{font-size:.74rem;color:var(--muted);font-weight:600}
.wk details.ag div.d{padding:0 13px 12px;color:var(--muted);font-size:.84rem}
.wk .linkbox{display:flex;gap:8px;align-items:center;background:var(--solid);border:1px dashed var(--ok);padding:8px 10px;border-radius:var(--r-sm);word-break:break-all;font-size:.8rem}
.wk .alert{padding:9px 12px;border-radius:var(--r-sm);font-weight:600;font-size:.84rem}
.wk .alert.bad{background:color-mix(in srgb,var(--err) 13%,transparent);color:var(--err);border:1px solid var(--err)}
.wk .alert.good{background:color-mix(in srgb,var(--ok) 13%,transparent);color:var(--ok);border:1px solid var(--ok)}

/* forms */
.wk .formwrap{max-width:660px;margin:22px auto 0}
.wk .formwrap.narrow{max-width:410px}
.wk .form{display:grid;gap:11px}
.wk .fr{display:grid;gap:11px}
@media(min-width:600px){.wk .fr.two{grid-template-columns:1fr 1fr}}
.wk .steps{display:flex;gap:6px;margin-bottom:14px;padding:0;list-style:none;flex-wrap:wrap}
.wk .steps li{flex:1 1 110px;padding:7px 11px;border-radius:var(--r-sm);border:1px solid var(--ln);font-weight:600;font-size:.78rem;color:var(--muted)}
.wk .steps li[aria-current="step"]{border-color:var(--brand);color:var(--text);background:color-mix(in srgb,var(--brand) 11%,transparent)}
.wk .steps li.done{color:var(--ok);border-color:var(--ok)}
.wk .tabs{display:flex;background:var(--solid);border:1px solid var(--ln);border-radius:999px;padding:3px;margin-bottom:12px}
.wk .tabs button{flex:1;border:0;background:transparent;border-radius:999px;padding:6px;font-size:.84rem;font-weight:700;cursor:pointer;color:var(--muted)}
.wk .tabs button[aria-selected="true"]{background:linear-gradient(135deg,var(--brand),var(--brand2));color:#fff}
.wk .check{display:flex;gap:8px;align-items:flex-start;font-size:.84rem}
.wk .check input{margin-top:3px;width:16px;height:16px;accent-color:var(--brand)}
.wk .spin{width:15px;height:15px;border-radius:50%;border:2.5px solid rgba(255,255,255,.4);border-top-color:#fff;animation:wkrot .7s linear infinite}
@keyframes wkrot{to{transform:rotate(360deg)}}
/* join (Maven style) */
.wk .jn{display:grid;gap:28px;max-width:900px;margin:26px auto 0;align-items:start}
@media(min-width:820px){.wk .jn{grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:44px}}
.wk .jn-info h1{font-size:clamp(1.3rem,2.6vw,1.65rem)}
.wk .jn-sub{color:var(--muted);margin-top:6px;font-size:.88rem}
.wk .jn-line{display:flex;justify-content:space-between;gap:12px;margin:22px 0 18px;font-size:.88rem;align-items:baseline}
.wk .jn-line b{font-size:1.05rem}
.wk .jn-pts{display:grid;gap:14px;list-style:none;margin:0;padding:0}
.wk .jn-pts li{display:flex;gap:12px;align-items:flex-start;font-size:.86rem}
.wk .jn-pts .ic{flex:none;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--brand) 12%,transparent);color:var(--brand)}
.wk .jn-pts b{display:block}
.wk .jn-card{padding:26px}
.wk .jn-note{font-size:.72rem;color:var(--muted);text-align:center;margin-top:8px}
.wk .jn-say{display:flex;gap:10px;align-items:flex-end;margin-top:22px}
.wk .jn-bub{background:color-mix(in srgb,var(--text) 6%,transparent);border-radius:12px;padding:12px 14px;font-size:.84rem}
.wk .jn-sum{border-top:1px solid var(--ln);margin-top:6px;padding-top:10px;display:grid;gap:6px;font-size:.84rem}
.wk .jn-sum div{display:flex;justify-content:space-between}
.wk .jn-sum .tot{font-weight:800;border-top:1px solid var(--ln);padding-top:8px}
.wk .linkbtn{background:none;border:0;padding:0;text-decoration:underline;cursor:pointer;color:inherit;font-size:inherit}


/* ticket */
.wk .ticketstage{perspective:1400px;margin:20px auto;max-width:470px}
.wk .ticket{position:relative;transform-style:preserve-3d;transform:rotateX(var(--rx,8deg)) rotateY(var(--ry,-14deg));transition:transform .3s;animation:wktin 1.1s cubic-bezier(.2,.9,.2,1) both}
@keyframes wktin{from{transform:rotateY(-120deg) scale(.7);opacity:0}}
.wk .ticket .face{border-radius:20px;overflow:hidden;box-shadow:0 30px 60px rgba(90,35,0,.34);background:var(--solid);border:1px solid var(--ln)}
.wk .ticket .top{height:120px;position:relative;transform:translateZ(26px)}
.wk .ticket .top svg{width:100%;height:100%;display:block}
.wk .ticket .mid{padding:15px 18px 6px;transform:translateZ(18px)}
.wk .ticket .perf{height:0;border-top:2px dashed var(--ln);margin:8px 14px;position:relative}
.wk .ticket .perf::before,.wk .ticket .perf::after{content:"";position:absolute;top:-11px;width:20px;height:20px;border-radius:50%;background:var(--bg)}
.wk .ticket .perf::before{left:-24px}.wk .ticket .perf::after{right:-24px}
.wk .ticket .bot{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:9px 18px 18px;transform:translateZ(22px)}
.wk .bars{height:36px;width:120px;background:repeating-linear-gradient(90deg,var(--text) 0 2px,transparent 2px 5px,var(--text) 5px 6px,transparent 6px 10px,var(--text) 10px 13px,transparent 13px 15px);opacity:.85;border-radius:4px}
.wk .confetti{position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden}
.wk .confetti i{position:absolute;top:-20px;width:8px;height:12px;border-radius:2px;animation:wkfall linear forwards}
@keyframes wkfall{to{transform:translate3d(var(--dx),110vh,0) rotate(720deg)}}

/* player + dashboard */
.wk .player{border-radius:var(--r-lg);overflow:hidden;aspect-ratio:16/9;position:relative;background:#06071a;display:grid;place-items:center}
.wk .player .bgp svg{width:100%;height:100%;display:block}
.wk .player .ctrl{position:absolute;left:0;right:0;bottom:0;padding:11px;display:flex;align-items:center;gap:10px;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff}
.wk .prog{flex:1;height:5px;border-radius:6px;background:rgba(255,255,255,.28);overflow:hidden}
.wk .prog i{display:block;height:100%;width:0;background:var(--accent);transition:width .25s linear}
.wk .lessons{display:grid;gap:6px;padding:0;list-style:none;margin:0}
.wk .lessons button{width:100%;text-align:left;display:flex;gap:8px;justify-content:space-between;padding:9px 11px;border-radius:var(--r-sm);border:1px solid var(--ln);background:var(--solid);cursor:pointer;font-weight:600;font-size:.84rem}
.wk .lessons button[aria-current="true"]{border-color:var(--brand);background:color-mix(in srgb,var(--brand) 11%,var(--solid))}
.wk .dash{display:grid;gap:12px;margin-top:16px}
.wk .dcard{display:grid;gap:12px;padding:13px;border-radius:var(--r-lg)}
@media(min-width:760px){.wk .dcard{grid-template-columns:160px 1fr auto;align-items:center}}
.wk .dcard .art{border-radius:var(--r-md);transform:none;margin:0}
.wk #toasts{position:fixed;right:14px;bottom:14px;z-index:90;display:grid;gap:8px;max-width:min(340px,calc(100vw - 28px))}
.wk .toast{padding:9px 13px;border-radius:12px;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);font-weight:600;font-size:.84rem;border-left:4px solid var(--brand);animation:wktst .35s ease}
.wk .toast.ok{border-left-color:var(--ok)}.wk .toast.bad{border-left-color:var(--err)}
@keyframes wktst{from{transform:translateY(12px);opacity:0}}
@media(prefers-reduced-motion:reduce){.wk *,.wk *::before,.wk *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}.wk .card{transform:none!important}}
`;

/** Theme + font variables, identical to the other Ilmora-* pages (see HOST_CSS in Ilmora-Microsoft.jsx). */
const HOST_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.ilm{--cream:#f6ede6;--white:#ffffff;--card:#ffffff;--tx:#1f1b18;--tx2:#3b332d;--mut:#6a5f57;--or:#f97316;--ord:#c2410c;--line:#e7d9cd;--w:1200px;background:var(--white);color:var(--tx);font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;overflow-x:hidden;line-height:1.55}
.ilm *{box-sizing:border-box}
.ilm button{font-family:inherit;cursor:pointer}
.ilm.dark{--cream:#0c0c14;--white:#0f0f18;--card:#13131e;--tx:#f1f5f9;--tx2:#cbd5e1;--mut:#94a3b8;--line:rgba(255,255,255,.1)}
@media(min-width:1600px){.ilm{--w:1360px}}`;


/* ====================================================================
   HELPERS
   ==================================================================== */
const IST = 'Asia/Kolkata';
const fmtD = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: IST });
const fmtDL = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: IST });
const fmtT = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: IST });
const money = (p) => (p === 0 ? 'Free' : '\u20B9' + p.toLocaleString('en-IN'));
const durTxt = (m) => (m >= 60 ? Math.floor(m / 60) + 'h' + (m % 60 ? ' ' + (m % 60) + 'm' : '') : m + 'm');
const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('');
const emailOK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
/** Only allow same-site relative redirects after login (prevents open redirects). */
const safeNext = (n, fallback = '/dashboard') => (typeof n === 'string' && /^\/(?!\/)/.test(n) ? n : fallback);

/** Site ke asli login (popup) ka user, localStorage se. Keys apne login ke hisaab se adjust karo. */
let SITE_USER = null;
const readSiteUser = () => {
  const toUser = (o) => ({
    id: o.id || o._id || o.userId || o.user_id || o.sub || o.email,
    name: o.name || o.fullName || o.full_name || o.username || String(o.email).split('@')[0],
    email: o.email,
    hasId: Boolean(o.id || o._id || o.userId || o.user_id || o.sub),
  });
  // JSON ke andar kahin bhi (3 level tak) email wala object dhundo
  const findUser = (o, depth = 0) => {
    if (!o || typeof o !== 'object' || depth > 3) return null;
    if (typeof o.email === 'string' && o.email.includes('@')) return toUser(o);
    for (const k of Object.keys(o)) { const r = findUser(o[k], depth + 1); if (r) return r; }
    return null;
  };
  const findToken = (o, depth = 0) => {
    if (!o || typeof o !== 'object' || depth > 3) return null;
    for (const k of Object.keys(o)) {
      if (typeof o[k] === 'string' && /token/i.test(k) && o[k].length > 20) return o[k];
      const r = findToken(o[k], depth + 1); if (r) return r;
    }
    return null;
  };
  const decodeJwt = (t) => {
    try { return JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); } catch { return null; }
  };
  try {
    let token = null, user = null;
    for (const s of [window.localStorage, window.sessionStorage]) {
      for (let i = 0; i < s.length; i++) {
        const key = s.key(i);
        if (!key || key.startsWith('ilm_')) continue; // is page ki apni mock keys chhodo
        const v = s.getItem(key);
        if (!v) continue;
        if (/^eyJ[\w-]+\.[\w-]+\.[\w-]*$/.test(v)) {
          token = token || v;
          const p = decodeJwt(v);
          if (p && !user) user = findUser(p);
        } else if (v[0] === '{' || v[0] === '[') {
          try {
            const o = JSON.parse(v);
            if (!user) user = findUser(o);
            if (!token) token = findToken(o);
          } catch {}
        }
      }
    }
    if (user && (token || user.hasId)) return { id: user.id, name: user.name, email: user.email };
  } catch {}
  return null;
};

/* ====================================================================
   MOCK DATA + MOCK BACKEND  (temporary, UI preview only; delete when the real API is connected)
   ==================================================================== */
/* =====================================================================
   MOCK DATA  (temporary, for UI development only)
   Nothing outside lib/mock/ and lib/api.js should import from here.
   Replace with the real ILM ORA workshop service.
   ===================================================================== */
const INSTRUCTORS = {
  aarav: { name: 'Aarav Mehta', role: 'AI engineer and founder', years: 9, hue: 24, bio: 'Aarav has shipped AI assistants for fintech and education teams, and previously founded a small automation start-up. He teaches by building one working system from a blank folder.' },
  neha: { name: 'Neha Kapoor', role: 'Principal product designer', years: 11, hue: 8, bio: 'Neha leads design for a consumer learning app used by millions. She runs research sprints and design critiques for teams across India and Southeast Asia.' },
  rohan: { name: 'Rohan Iyer', role: 'Staff software engineer', years: 12, hue: 150, bio: 'Rohan builds and scales backend platforms. He mentors engineers on API design, testing and delivery habits that survive real deadlines.' },
  sana: { name: 'Sana Qureshi', role: 'Head of growth', years: 8, hue: 28, bio: 'Sana has grown subscription products from zero to seven-figure revenue. She focuses on repeatable loops rather than one-off campaigns.' },
  vikram: { name: 'Vikram Rao', role: 'Fractional CFO', years: 15, hue: 150, bio: 'Vikram advises early-stage founders on cash, pricing and fundraising. He explains finance without jargon.' },
  ishita: { name: 'Ishita Bose', role: 'Leadership coach', years: 13, hue: 18, bio: 'Ishita coaches first-time managers and senior leaders through change, hard conversations and team health.' },
  kabir: { name: 'Kabir Singh', role: 'Brand strategist', years: 10, hue: 12, bio: 'Kabir has built brand narratives for consumer and B2B companies, and writes about positioning and storytelling.' },
  ananya: { name: 'Ananya Das', role: 'Applied AI researcher', years: 7, hue: 175, bio: 'Ananya applies language models to analytics and operations. She helps non-technical teams find practical, safe uses for AI.' },
};

const TPL = {
  AI: { learn: ['How modern language models work, in plain terms', 'Writing instructions that produce reliable output', 'Connecting models to tools and your own data', 'Evaluating answers and catching mistakes', 'Keeping data private and usage safe', 'Turning a prototype into a repeatable workflow'], out: ['Ship a working AI workflow of your own', 'Judge when AI helps and when it does not', 'Write prompts you can reuse across tasks', 'Share a clear plan for your team'], aud: ['Professionals who want practical AI skills', 'Founders and product managers', 'Developers new to AI tooling'], seg: ['Welcome and what we will build', 'Core ideas, demystified', 'Live build lab', 'Testing, Q&A and next steps'] },
  Development: { learn: ['Project structure that stays tidy as it grows', 'Writing and testing code with confidence', 'Reading errors and debugging faster', 'Working with APIs and data', 'Deploying to a live environment', 'Habits that make code reviews painless'], out: ['Build and deploy a small but real project', 'Debug problems without guessing', 'Review code with a clear checklist', 'Leave with a reusable starter template'], aud: ['Developers moving up a level', 'Bootcamp graduates', 'Engineering team leads'], seg: ['Setup and goals', 'Core patterns', 'Hands-on build', 'Review, Q&A and next steps'] },
  Design: { learn: ['Framing the problem before opening a design tool', 'Gathering evidence from real users', 'Turning findings into layout decisions', 'Building reusable components', 'Giving and receiving critique', 'Presenting design work to stakeholders'], out: ['Produce a portfolio-ready case study', 'Run a lightweight research round', 'Build a small component library', 'Present with confidence'], aud: ['Designers building their craft', 'Product managers', 'Founders shaping their first product'], seg: ['Warm-up and goals', 'Method walkthrough', 'Studio exercise', 'Critique, Q&A and next steps'] },
  Marketing: { learn: ['Finding the one metric that matters', 'Designing channels that compound', 'Writing messages people act on', 'Running small experiments quickly', 'Reading results without fooling yourself', 'Planning a quarter of work'], out: ['Leave with a 90-day growth plan', 'Launch one experiment this week', 'Write a clear value proposition', 'Report results the team trusts'], aud: ['Marketers and growth teams', 'Founders doing their own marketing', 'Content and community leads'], seg: ['Context and goals', 'Framework deep dive', 'Plan-building workshop', 'Feedback, Q&A and next steps'] },
  Business: { learn: ['Reading the numbers that run a business', 'Pricing with confidence', 'Planning cash for the next 12 months', 'Making decisions with incomplete data', 'Prioritising a roadmap', 'Communicating strategy to a team'], out: ['Build a simple financial model', 'Set pricing you can defend', 'Create a one-page strategy', 'Know what to track every week'], aud: ['Founders and operators', 'Product and business managers', 'Career switchers entering business roles'], seg: ['Introductions and goals', 'Key concepts', 'Worked example', 'Q&A and next steps'] },
  Leadership: { learn: ['Setting expectations without micromanaging', 'Holding clear, kind conversations', 'Leading a team through uncertainty', 'Giving feedback that lands', 'Protecting focus and energy', 'Building trust over time'], out: ['Prepare for a hard conversation', 'Create a 30-60-90 day plan', 'Give feedback with a simple structure', 'Build a personal leadership habit'], aud: ['New and aspiring managers', 'Team leads', 'Senior professionals growing influence'], seg: ['Check-in and goals', 'Core practices', 'Role-play lab', 'Reflection, Q&A and next steps'] },
};
const PRE = {
  Beginner: ['No prior experience needed', 'A laptop with a stable internet connection'],
  Intermediate: ['Some hands-on experience in this area', 'A laptop with a stable internet connection', 'Comfort sharing your screen or work'],
  Advanced: ['2+ years of relevant professional experience', 'A real project or problem to work on', 'A laptop with a stable internet connection'],
};
const AGENDA_DESC = [
  'Introductions, what you will walk away with, and a quick look at the plan.',
  'The key ideas you need, explained with examples you can reuse.',
  'You apply the ideas to a real task while the instructor gives live feedback.',
  'Wrap up, answer questions and agree on what to do next.',
];

const nowIST = new Date(Date.now() + 19800000);
const atIST = (off, hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return Date.UTC(nowIST.getUTCFullYear(), nowIST.getUTCMonth(), nowIST.getUTCDate() + off, h, m) - 19800000;
};
const mk = (slug, title, category, level, price, format, off, time, duration, popularity, seats, hue, instructorId, tags, short, long) => ({
  slug, title, category, level, price, format, start: format === 'live' ? atIST(off, time) : null,
  duration, popularity, seats, hue, instructorId, tags, short, long,
});

const WORKSHOPS = [
  mk('ai-agents-from-scratch', 'Build AI agents from scratch', 'AI', 'Intermediate', 2999, 'live', 3, '19:00', 120, 98, 60, 255, 'aarav', 'agents automation llm tools', 'Design, build and test an AI agent that completes real tasks for you.', 'In two hours you will go from a blank file to an AI agent that uses tools, remembers context and can be tested. We build one complete agent together, then adapt it to a problem from your own work.'),
  mk('prompt-engineering-masterclass', 'Prompt engineering masterclass', 'AI', 'Beginner', 0, 'live', 1, '18:30', 90, 95, 200, 230, 'ananya', 'prompts chatgpt writing productivity', 'Learn a repeatable way to get dependable answers from AI tools.', 'This free session shows how to structure instructions, give examples and check output. You will leave with a prompt library you can adapt for writing, research and analysis.'),
  mk('genai-for-business-ops', 'Generative AI for business operations', 'AI', 'Beginner', 999, 'ondemand', 0, '00:00', 140, 80, null, 170, 'ananya', 'operations automation reports', 'Find safe, practical uses for AI in everyday business tasks.', 'A recorded series on automating reports, summaries and customer replies, with templates and a risk checklist for your team.'),
  mk('fullstack-nextjs-launchpad', 'Full-stack web apps launchpad', 'Development', 'Intermediate', 3499, 'live', 6, '11:00', 180, 88, 40, 215, 'rohan', 'react nextjs javascript web', 'Build and deploy a full-stack web app with routing, data and sign-in.', 'A three-hour guided build covering pages, data fetching, forms and authentication, finishing with a live deployment you can share.'),
  mk('api-design-that-scales', 'API design that scales', 'Development', 'Advanced', 1999, 'ondemand', 0, '00:00', 150, 70, null, 195, 'rohan', 'api rest backend architecture', 'Design APIs that stay consistent and easy to evolve.', 'Recorded modules on resource modelling, versioning, pagination, errors and rate limits, drawn from real production systems.'),
  mk('git-and-ci-for-teams', 'Git and CI for teams', 'Development', 'Beginner', 0, 'live', 9, '17:00', 60, 60, 150, 205, 'rohan', 'git github workflow testing', 'Collaborate without merge-day panic using clean Git habits and automated checks.', 'A free one-hour session on branching, pull requests and setting up automated tests so every change is checked before it ships.'),
  mk('ux-research-in-a-day', 'UX research in a day', 'Design', 'Beginner', 1499, 'live', 4, '10:00', 150, 77, 35, 335, 'neha', 'ux research interviews usability', 'Plan, run and summarise a user interview round in one session.', 'Practise writing interview guides, running sessions and turning notes into clear, shareable insights.'),
  mk('design-systems-figma', 'Design systems in Figma', 'Design', 'Intermediate', 1799, 'ondemand', 0, '00:00', 160, 72, null, 310, 'neha', 'figma components tokens ui', 'Build a scalable component library from first principles.', 'Recorded lessons on tokens, variants, documentation and handoff, with a starter Figma file.'),
  mk('motion-design-for-product', 'Motion design for product', 'Design', 'Advanced', 2499, 'live', 14, '16:00', 120, 66, 0, 285, 'neha', 'animation motion ui prototyping', 'Use motion to explain what changed and guide attention in interfaces.', 'Learn timing, easing and sequencing, then prototype three interactions you can hand to engineers. This session is currently full.'),
  mk('growth-marketing-loops', 'Growth marketing loops', 'Marketing', 'Intermediate', 1999, 'live', 2, '20:00', 90, 90, 80, 25, 'sana', 'growth acquisition retention experiments', 'Design growth loops that compound instead of one-off campaigns.', 'We map your product to loops, pick a metric and plan three experiments you can launch the same week.'),
  mk('seo-in-the-ai-era', 'SEO in the AI era', 'Marketing', 'Beginner', 0, 'ondemand', 0, '00:00', 110, 85, null, 45, 'sana', 'seo search content ai', 'Make content that is found and trusted as search changes.', 'A free recorded course on search intent, content structure and measuring visibility across search engines and AI answers.'),
  mk('brand-storytelling-lab', 'Brand storytelling lab', 'Marketing', 'Beginner', 999, 'live', 11, '12:00', 100, 58, 50, 5, 'kabir', 'brand story copywriting positioning', 'Craft a brand story your audience remembers and repeats.', 'Work through positioning, voice and story arcs with live feedback on your own draft.'),
  mk('startup-finance-basics', 'Startup finance basics', 'Business', 'Beginner', 1299, 'live', 5, '19:30', 120, 74, 70, 150, 'vikram', 'finance cash pricing startup', 'Understand cash, margins and pricing well enough to decide with confidence.', 'We build a simple twelve-month cash plan together and stress-test your pricing assumptions.'),
  mk('product-strategy-bootcamp', 'Product strategy bootcamp', 'Business', 'Advanced', 3999, 'ondemand', 0, '00:00', 240, 83, null, 130, 'vikram', 'strategy roadmap product prioritisation', 'Turn market insight into a focused, defensible product strategy.', 'Recorded modules with worksheets on choosing where to play, sequencing bets and communicating strategy.'),
  mk('leading-through-change', 'Leading through change', 'Leadership', 'Intermediate', 2299, 'live', 7, '18:00', 120, 69, 45, 280, 'ishita', 'change management communication teams', 'Guide your team through uncertainty with clarity and care.', 'Practise the conversations that matter most during reorganisations, launches and setbacks.'),
  mk('first-time-manager-playbook', 'First-time manager playbook', 'Leadership', 'Beginner', 1499, 'ondemand', 0, '00:00', 130, 79, null, 300, 'ishita', 'management feedback one-on-ones', 'Start strong in your first management role.', 'Recorded sessions on one-on-ones, feedback, delegation and your first 90 days, with scripts and templates.'),
  mk('executive-presence', 'Executive presence', 'Leadership', 'Advanced', 2999, 'live', 20, '17:30', 90, 64, 25, 310, 'ishita', 'influence communication senior leadership', 'Communicate with the clarity and calm that senior roles demand.', 'A small-group lab on framing your message, handling pushback and showing up well in high-stakes rooms.'),
];

/** What a real backend keeps server-side. Never sent to the browser without an authorisation check. */
const PRIVATE = Object.fromEntries(
  WORKSHOPS.map((w, i) => [w.slug, {
    meetLink: `https://meet.ilmora.example/room/${w.slug}-${1000 + i * 37}`,
    lessons: TPL[w.category].seg.map((t, j) => ({ id: j, title: t, mins: Math.round(w.duration / 4) })),
  }]),
);

/** Public shape of a workshop: pure, safe to call on the server. */
function toPublic(w, taken = 0) {
  const tpl = TPL[w.category];
  const agenda = tpl.seg.map((title, i) => {
    const from = Math.round(w.duration * [0, 0.1, 0.45, 0.85][i]);
    const to = Math.round(w.duration * [0.1, 0.45, 0.85, 1][i]);
    return { title, time: w.format === 'live' ? `${from}\u2013${to} min` : `${Math.round(w.duration / 4)} min`, desc: AGENDA_DESC[i] };
  });
  return {
    ...w,
    instructor: INSTRUCTORS[w.instructorId],
    learn: tpl.learn, outcomes: tpl.out, audience: tpl.aud, prereq: PRE[w.level], agenda,
    seatsLeft: w.seats == null ? null : Math.max(0, w.seats - taken),
    tz: 'IST (UTC+5:30)',
  };
}
/* =====================================================================
   MOCK BACKEND  (browser-only; uses localStorage as a stand-in database)
   Replace every function with a call to the real ILM ORA API.
   ===================================================================== */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const mem = {};
const store = {
  get(k, d) {
    try { const v = window.localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return k in mem ? mem[k] : d; }
  },
  set(k, v) {
    try { window.localStorage.setItem(k, JSON.stringify(v)); } catch { mem[k] = v; }
  },
};
const fail = () => typeof window !== 'undefined' && /simulateError/.test(window.location.search);
const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const err = (message, code) => Object.assign(new Error(message), { code });

async function sha(s) {
  try {
    const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
  } catch { return btoa(s); }
}
const regsAll = () => store.get('ilm_regs', []);
const view = (w) => toPublic(w, regsAll().filter((r) => r.slug === w.slug).length);

const backend = {
  async list() {
    await sleep(reduce() ? 0 : 200);
    if (fail()) throw err('The workshop service did not respond.');
    return WORKSHOPS.map(view);
  },
  async get(slug) {
    await sleep(reduce() ? 0 : 120);
    if (fail()) throw err('The workshop service did not respond.');
    const w = WORKSHOPS.find((x) => x.slug === slug);
    if (!w) throw err('Workshop not found', 404);
    return view(w);
  },
    session: () => SITE_USER || store.get('ilm_session', null),
  async signup({ name, email, password }) {
    await sleep(500);
    const users = store.get('ilm_users', []);
    if (users.some((u) => u.email === email.toLowerCase())) throw err('An account with this email already exists. Sign in instead.');
    const u = { id: 'u' + Date.now(), name, email: email.toLowerCase(), hash: await sha(password) };
    users.push(u); store.set('ilm_users', users);
    store.set('ilm_session', { id: u.id, name: u.name, email: u.email });
    return backend.session();
  },
  async login({ email, password }) {
    await sleep(450);
    const h = await sha(password);
    const u = store.get('ilm_users', []).find((x) => x.email === email.toLowerCase() && x.hash === h);
    if (!u) throw err('Email or password is incorrect.');
    store.set('ilm_session', { id: u.id, name: u.name, email: u.email });
    return backend.session();
  },
  logout: () => store.set('ilm_session', null),
  myRegs() {
    const s = backend.session();
    return s ? regsAll().filter((r) => r.userId === s.id) : [];
  },
  myReg: (slug) => backend.myRegs().find((r) => r.slug === slug) || null,
  async register(slug, payload) {
    await sleep(900);
    const s = backend.session();
    if (!s) throw err('Please sign in to register.', 401);
    const w = WORKSHOPS.find((x) => x.slug === slug);
    if (!w) throw err('Workshop not found', 404);
    if (backend.myReg(slug)) throw err('You are already registered for this workshop.', 409);
    if (view(w).seatsLeft === 0) throw err('This workshop is full.', 410);
    if (w.price > 0 && !payload.paid) throw err('Payment is required for this workshop.', 402);
    const reg = {
      id: 'ILM-' + Math.random().toString(36).slice(2, 8).toUpperCase(), userId: s.id, slug,
      name: payload.name, email: payload.email, phone: payload.phone, level: payload.level, goal: payload.goal,
      amount: w.price, paid: w.price > 0, createdAt: Date.now(),
    };
    store.set('ilm_regs', [...regsAll(), reg]);
    return reg;
  },
  async cancel(slug) {
    await sleep(300);
    const s = backend.session();
    store.set('ilm_regs', regsAll().filter((r) => !(r.slug === slug && r.userId === (s && s.id))));
  },
  /** Only returns private content when the signed-in user is registered. */
  async access(slug) {
    await sleep(300);
    if (!backend.session()) throw err('Sign in to see your access details.', 401);
    if (!backend.myReg(slug)) throw err('Register for this workshop to unlock access.', 403);
    const w = WORKSHOPS.find((x) => x.slug === slug);
    const p = PRIVATE[slug];
    return w.format === 'live' ? { type: 'live', url: p.meetLink } : { type: 'ondemand', lessons: p.lessons };
  },
};

/* ====================================================================
   API LAYER (every component talks only to `api`)
   ==================================================================== */

/* ---------------------------------------------------------------------
   REAL API ADAPTER  (used when CONFIG.USE_MOCK === false)
   Written against the endpoints listed in the README. Adjust the paths and
   the two auth helpers to match the existing ILM ORA backend and login.
   --------------------------------------------------------------------- */
const getAuthToken = () => { try { return window.localStorage.getItem('token'); } catch { return null; } }; // TODO: use the existing auth storage
const getSessionUser = () => { try { return JSON.parse(window.localStorage.getItem('user') || 'null'); } catch { return null; } }; // TODO: use the existing auth state

async function http(path, opts = {}) {
  const token = getAuthToken();
  const res = await fetch(CONFIG.API_BASE + path, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(opts.headers || {}) },
    credentials: 'include',
  });
  if (!res.ok) {
    let msg = 'Something went wrong. Please try again.';
    try { msg = (await res.json()).message || msg; } catch {}
    throw Object.assign(new Error(msg), { code: res.status });
  }
  return res.status === 204 ? null : res.json();
}
const regsCache = { list: [] };
const realApi = {
  list: () => http('/workshops'),
  get: (slug) => http(`/workshops/${encodeURIComponent(slug)}`),
  session: getSessionUser,
  signup: (c) => http('/auth/register', { method: 'POST', body: JSON.stringify(c) }),   // TODO: existing auth
  login: (c) => http('/auth/login', { method: 'POST', body: JSON.stringify(c) }),       // TODO: existing auth
  logout: () => { try { window.localStorage.removeItem('token'); window.localStorage.removeItem('user'); } catch {} },
  myRegs: () => regsCache.list,
  myReg: (slug) => regsCache.list.find((r) => r.slug === slug) || null,
  register: async (slug, p) => { const r = await http(`/workshops/${encodeURIComponent(slug)}/register`, { method: 'POST', body: JSON.stringify(p) }); regsCache.list.push(r); return r; }, // 409 on duplicate
  cancel: async (slug) => { await http(`/workshops/${encodeURIComponent(slug)}/register`, { method: 'DELETE' }); regsCache.list = regsCache.list.filter((r) => r.slug !== slug); },
  access: (slug) => http(`/workshops/${encodeURIComponent(slug)}/access`),              // 401 / 403 when not allowed
};
// Real registrations must be loaded before pages read them (call once after login / on load):
//   realApi.loadRegs = async () => { regsCache.list = await http('/me/registrations'); };
const impl = CONFIG.USE_MOCK ? backend : realApi;
const api = {
  list: () => impl.list(), get: (s) => impl.get(s), session: () => impl.session(),
  signup: (c) => impl.signup(c), login: (c) => impl.login(c), logout: () => impl.logout(),
  myRegs: () => impl.myRegs(), myReg: (s) => impl.myReg(s),
  register: (s, p) => impl.register(s, p), cancel: (s) => impl.cancel(s), access: (s) => impl.access(s),
};

/* ====================================================================
   ROUTER (hash based)
   ==================================================================== */

/* hash router */
const RouteCtx = createContext({ parts: ['workshops'], query: new URLSearchParams(), raw: '/workshops' });
function parseHash() {
  const h = (typeof window !== 'undefined' && window.location.hash.slice(1)) || '/workshops';
  const [path, qs] = h.split('?');
  return { parts: path.split('/').filter(Boolean), query: new URLSearchParams(qs || ''), raw: h };
}
const go = (p) => { window.location.hash = p; };
const replaceRoute = (p) => { window.history.replaceState(null, '', '#' + p); window.dispatchEvent(new Event('hashchange')); };
const useRouter = () => ({ push: go, replace: replaceRoute });
const useSearchParams = () => useContext(RouteCtx).query;
function Link({ href, children, ...p }) { return <a href={'#' + href} {...p}>{children}</a>; }
function useHashRoute() {
  const [r, setR] = useState({ parts: ['workshops'], query: new URLSearchParams(), raw: '/workshops' });
  useEffect(() => {
    const on = () => setR(parseHash());
    on();
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return r;
}
function setPageMeta(title, desc) {
  document.title = title;
  if (!desc) return;
  let m = document.querySelector('meta[name="description"]');
  if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
  m.content = desc;
}

/* ====================================================================
   SHARED STATE: workshops cache, auth, toasts
   ==================================================================== */

let cache = null;
const invalidateWorkshops = () => { cache = null; };

/** Loads the workshop list once and shares it between pages. */
function useWorkshops() {
  const [state, set] = useState({ data: null, error: null, loading: true });
  const load = useCallback(() => {
    set((s) => ({ ...s, loading: true, error: null }));
    api.list()
      .then((d) => { cache = d; set({ data: d, error: null, loading: false }); })
      .catch((e) => set({ data: null, error: e, loading: false }));
  }, []);
  useEffect(() => {
    if (cache) set({ data: cache, error: null, loading: false });
    else load();
  }, [load]);
  return { ...state, reload: load };
}

const Ctx = createContext(null);

/** Auth state + toasts. Replace the api.* calls with the existing ILM ORA auth provider. */
function AppProviders({ children, openLogin }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState([]);

    const pending = useRef(null);

  // Site login (popup) ke baad user detect karo
  useEffect(() => {
    const sync = () => {
            SITE_USER = readSiteUser();
      const u = SITE_USER || store.get('ilm_session', null);
      setUser((prev) => (prev && u && prev.email === u.email ? prev : u));
      setReady(true);
      if (u && pending.current) { const n = pending.current; pending.current = null; go(n); }
    };
    sync();
    window.addEventListener('storage', sync);
    window.addEventListener('focus', sync);
    const t = setInterval(sync, 1000);
    return () => { window.removeEventListener('storage', sync); window.removeEventListener('focus', sync); clearInterval(t); };
  }, []);

  // Login chahiye: pehle wapas safe page pe jao, phir site ka popup kholo
  const requireLogin = useCallback((next, back = '/workshops') => {
    pending.current = next;
    replaceRoute(back);
    if (openLogin) openLogin(true);
  }, [openLogin]);

  const toast = useCallback((msg, kind = '') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4600);
  }, []);

    const value = useMemo(() => ({
    user, ready, toast, requireLogin,
    logout: () => { api.logout(); setUser(null); },
  }), [user, ready, toast, requireLogin]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div id="toasts" className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => <div key={t.id} className={`toast ${t.kind}`}>{t.msg}</div>)}
      </div>
    </Ctx.Provider>
  );
}

const useApp = () => useContext(Ctx);

/* ====================================================================
   UI PIECES
   ==================================================================== */
const CH = { AI: 24, Development: 152, Design: 10, Marketing: 36, Business: 166, Leadership: 20 };

const GLYPH = {
  AI: (<><path d="M300 40l14 38 38 14-38 14-14 38-14-38-38-14 38-14z" fill="#fff" opacity=".92" /><path d="M345 110l7 18 18 7-18 7-7 18-7-18-18-7 18-7z" fill="#fff" opacity=".6" /></>),
  Development: <text x="212" y="140" fontFamily="monospace" fontWeight="700" fontSize="86" fill="#fff" opacity=".92">{'</>'}</text>,
  Design: (<><circle cx="270" cy="95" r="46" fill="#fff" opacity=".45" /><circle cx="320" cy="95" r="46" fill="#fff" opacity=".4" /><circle cx="295" cy="132" r="46" fill="#fff" opacity=".5" /></>),
  Marketing: (<><rect x="230" y="110" width="24" height="46" rx="5" fill="#fff" opacity=".55" /><rect x="266" y="82" width="24" height="74" rx="5" fill="#fff" opacity=".7" /><rect x="302" y="56" width="24" height="100" rx="5" fill="#fff" opacity=".85" /><rect x="338" y="30" width="24" height="126" rx="5" fill="#fff" opacity=".95" /></>),
  Business: (<><path d="M300 100V40a60 60 0 0 1 60 60z" fill="#fff" opacity=".95" /><path d="M300 100h60a60 60 0 1 1-60-60z" fill="#fff" opacity=".45" /></>),
  Leadership: (<><path d="M240 160l55-100 40 70 25-36 40 66z" fill="#fff" opacity=".8" /><path d="M295 60V28l34 12-34 12" fill="var(--accent)" /></>),
};

/** Generated placeholder artwork. Swap for `w.thumbnailUrl` once the backend provides real images. */
function WorkshopArt({ w }) {
  const h = ((CH[w.category] || 24) + (w.hue % 14)) % 360;
  const id = 'g' + w.slug.replace(/[^a-z0-9]/g, '');
  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${w.category} workshop artwork`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={`hsl(${h} 78% 52%)`} /><stop offset="1" stopColor={`hsl(${(h + 22) % 360} 85% 27%)`} /></linearGradient>
        <radialGradient id={`${id}r`} cx=".75" cy=".2" r=".7"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="400" height="225" fill={`url(#${id})`} />
      <rect width="400" height="225" fill={`url(#${id}r)`} />
      <g stroke="#fff" strokeOpacity=".08">{Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${i * 44} 0V225M0 ${i * 26}H400`} />)}</g>
      <circle cx="60" cy="190" r="90" fill="#fff" opacity=".07" />
      {GLYPH[w.category]}
    </svg>
  );
}

function Avatar({ person, large = false }) {
  return (
    <span
      className={`av ${large ? 'lg' : ''}`}
      style={{ background: `linear-gradient(135deg,hsl(${person.hue} 75% 52%),hsl(${(person.hue + 22) % 360} 78% 36%))` }}
      aria-hidden="true"
    >
      {initials(person.name)}
    </span>
  );
}

const FormatBadge = ({ w }) =>
  w.format === 'live'
    ? <span className="badge live"><i />Live</span>
    : <span className="badge">On-demand</span>;

const Skeletons = ({ n = 6, height }) => (
  <>{Array.from({ length: n }, (_, i) => <div key={i} className="skel" style={height ? { height } : undefined} aria-hidden="true" />)}</>
);

const ErrorIcon = () => (
  <svg width="52" height="52" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="32" cy="32" r="26" /><path d="M32 18v17M32 44v2" /></svg>
);

/** Centered error / empty / restricted state. */
function StateBox({ title, text, children, icon }) {
  return (
    <div className="wrap">
      <div className="state glass" style={{ marginTop: 30 }} role="alert">
        {icon || <ErrorIcon />}
        <h2>{title}</h2>
        <p className="muted" style={{ maxWidth: '44ch' }}>{text}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}

const LinkBtn = ({ href, children, ghost, sm, block, ...p }) => (
  <Link href={href} className={`btn ${ghost ? 'btn-ghost' : 'btn-primary'} ${sm ? 'btn-sm' : ''} ${block ? 'btn-block' : ''}`} {...p}>{children}</Link>
);

const Spinner = () => <span className="spin" aria-hidden="true" />;

function Field({ id, label, error, children }) {
  return (
    <div>
      <label className="f" htmlFor={id}>{label}{children}</label>
      <div className="err" id={`${id}-e`}>{error}</div>
    </div>
  );
}

const Icons = {
  cal: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></svg>),
  clock: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  lvl: (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M5 20V14M12 20V9M19 20V4" /></svg>),
  play: (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>),
  search: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>),
};

function WorkshopCard({ w, registered = false }) {
  const ref = useRef(null);
  const full = w.format === 'live' && w.seatsLeft === 0;

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const c = ref.current;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    c.classList.add('tilting');
    c.style.setProperty('--ry', (x - 0.5) * 12 + 'deg');
    c.style.setProperty('--rx', (0.5 - y) * 10 + 'deg');
    c.style.setProperty('--mx', x * 100 + '%');
    c.style.setProperty('--my', y * 100 + '%');
  };
  const onLeave = () => {
    const c = ref.current;
    c.classList.remove('tilting');
    c.style.removeProperty('--rx');
    c.style.removeProperty('--ry');
  };

  return (
    <article className="card" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="art">
        <WorkshopArt w={w} />
        <div className="badges"><FormatBadge w={w} />{w.price === 0 && <span className="badge free">Free</span>}</div>
      </div>
      <div className="cbody">
        <h3><Link href={`/workshops/${w.slug}`}>{w.title}</Link></h3>
        <p className="sd">{w.short}</p>
        <div className="inst"><Avatar person={w.instructor} /><span>{w.instructor.name}</span></div>
        <div className="meta">
          {w.format === 'live'
            ? <span>{Icons.cal}{fmtD.format(w.start)}, {fmtT.format(w.start)}</span>
            : <span>{Icons.play}Watch anytime</span>}
          <span>{Icons.clock}{durTxt(w.duration)}</span>
          <span>{Icons.lvl}{w.level}</span>
        </div>
        <div className="cfoot">
          <span className={`price ${w.price === 0 ? 'free' : ''}`}>{money(w.price)}</span>
          <span className="cta">
            <Link className="btn btn-ghost btn-sm" href={`/workshops/${w.slug}`}>View details</Link>
            {registered ? <Link className="btn btn-primary btn-sm" href={`/workshops/${w.slug}`}>Registered</Link>
              : full ? <span className="btn btn-primary btn-sm" aria-disabled="true">Full</span>
              : <Link className="btn btn-primary btn-sm" href={`/register/${w.slug}`} aria-label={`Register now for ${w.title}`}>Register now</Link>}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ====================================================================
   PAGES
   ==================================================================== */

const CATS = ['All', 'AI', 'Development', 'Design', 'Marketing', 'Business', 'Leadership'];
const PAGE = 6;
const DEFAULTS = { date: 'any', price: 'any', level: 'any', sort: 'upcoming' };

const sorters = {
  upcoming: (a, b) => (a.format === 'live' && b.format === 'live' ? a.start - b.start : a.format === 'live' ? -1 : b.format === 'live' ? 1 : b.popularity - a.popularity),
  popular: (a, b) => b.popularity - a.popularity,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
};

function applyFilters(all, { q, cat, f }) {
  const term = q.trim().toLowerCase();
  return all.filter((w) => {
    if (cat !== 'All' && w.category !== cat) return false;
    if (term && !`${w.title} ${w.short} ${w.category} ${w.tags} ${w.instructor.name}`.toLowerCase().includes(term)) return false;
    if (f.level !== 'any' && w.level !== f.level) return false;
    if (f.price === 'free' && w.price !== 0) return false;
    if (f.price === 'paid' && w.price === 0) return false;
    if (f.price === 'u2000' && !(w.price > 0 && w.price <= 2000)) return false;
    if (f.date === 'ondemand' && w.format !== 'ondemand') return false;
    if (f.date === 'week' || f.date === 'fortnight') {
      if (w.format !== 'live') return false;
      const days = (w.start - Date.now()) / 864e5;
      if (days > (f.date === 'week' ? 7 : 14)) return false;
    }
    return true;
  });
}

/** Horizontal row that scrolls by itself (seamless loop). Pauses on hover, touch, focus, when off-screen, and with reduced motion.
 *  If all cards already fit on screen it stays still and does not duplicate anything. */
function AutoRow({ children, label }) {
  const ref = useRef(null);
  const copyRef = useRef(null);
  const dupRef = useRef(null);
  const [fits, setFits] = useState(false);

  // Does the whole set of cards fit without scrolling? (also true with reduced motion)
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setFits(true); return; }
      const c = copyRef.current && copyRef.current.children;
      if (!c || !c.length) return;
      const first = c[0], last = c[c.length - 1];
      const total = last.offsetLeft + last.offsetWidth - first.offsetLeft;
      setFits(total <= el.clientWidth - 40);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [children]);

  // Auto-scroll loop
  useEffect(() => {
    const el = ref.current;
    if (!el || fits) return undefined;
    if (dupRef.current) dupRef.current.setAttribute('inert', ''); // the looped copy is decoration only
    let raf = 0, last = 0, pos = el.scrollLeft, hold = false, visible = true, resumeTimer = 0;
    const loopLen = () => {
      const a = copyRef.current && copyRef.current.firstElementChild;
      const b = dupRef.current && dupRef.current.firstElementChild;
      return a && b ? b.offsetLeft - a.offsetLeft : 0;
    };
    const step = (t) => {
      raf = requestAnimationFrame(step);
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;
      if (hold || !visible || document.hidden) return;
      const len = loopLen();
      if (!len) return;
      pos += 0.045 * dt; // about 45px per second
      if (pos >= len) pos -= len;
      el.scrollLeft = pos;
    };
    const stop = () => { hold = true; clearTimeout(resumeTimer); };
    const go = () => { pos = el.scrollLeft; hold = false; };
    const goLater = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(go, 1800); };
    el.addEventListener('mouseenter', stop); el.addEventListener('mouseleave', go);
    el.addEventListener('touchstart', stop, { passive: true }); el.addEventListener('touchend', goLater, { passive: true });
    el.addEventListener('focusin', stop); el.addEventListener('focusout', go);
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }) : null;
    if (io) io.observe(el);
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(resumeTimer); if (io) io.disconnect();
      el.removeEventListener('mouseenter', stop); el.removeEventListener('mouseleave', go);
      el.removeEventListener('touchstart', stop); el.removeEventListener('touchend', goLater);
      el.removeEventListener('focusin', stop); el.removeEventListener('focusout', go);
    };
  }, [fits]);

  return (
    <div className="row" ref={ref} tabIndex={0} aria-label={label}>
      <div ref={copyRef} style={{ display: 'contents' }}>{children}</div>
      {!fits && <div ref={dupRef} aria-hidden="true" style={{ display: 'contents' }}>{children}</div>}
    </div>
  );
}

function WorkshopsList() {
  const router = useRouter();
  const sp = useSearchParams();
  const catParam = sp.get('cat');
  const urlCat = CATS.includes(catParam) ? catParam : 'All';
  const [cat, setCatState] = useState(urlCat);
  useEffect(() => setCatState(urlCat), [urlCat]); // follow footer / back-button changes
  const { data, error, loading, reload } = useWorkshops();
  const { user } = useApp();

  const [q, setQ] = useState('');
  const [f, setF] = useState(DEFAULTS);
  const [nU, setNU] = useState(PAGE);
  const [nO, setNO] = useState(PAGE);
  const [open, setOpen] = useState(false);

  const regs = useMemo(() => new Set(user ? api.myRegs().map((r) => r.slug) : []), [user, data]);
  const active = Boolean(q) || cat !== 'All' || f.date !== 'any' || f.price !== 'any' || f.level !== 'any';
  const results = useMemo(() => (data ? applyFilters(data, { q, cat, f }).sort(sorters[f.sort]) : []), [data, q, cat, f]);
  const live = results.filter((w) => w.format === 'live');
  const onDemand = results.filter((w) => w.format === 'ondemand');
  const trending = useMemo(() => [...results].sort(sorters.popular).slice(0, 5), [results]);

  const setCat = (c) => {
    setCatState(c); setNU(PAGE); setNO(PAGE);
    router.replace(c === 'All' ? '/workshops' : `/workshops?cat=${c}`, { scroll: false });
  };
  const setFilter = (k) => (e) => { setNU(PAGE); setNO(PAGE); setF((s) => ({ ...s, [k]: e.target.value })); };
  const reset = () => { setQ(''); setF(DEFAULTS); setNU(PAGE); setNO(PAGE); router.replace('/workshops', { scroll: false }); };

  const renderSection = ({ id, title, sub, items }) => items.length === 0 ? null : (
    <section className="sec" aria-labelledby={id} key={id}>
      <div className="sechead"><div><h2 id={id}>{title}</h2><p>{sub}</p></div></div>
      <AutoRow label={title}>{items.map((w) => <WorkshopCard key={w.slug} w={w} registered={regs.has(w.slug)} />)}</AutoRow>
    </section>
  );

  return (
    <>
      <section className="wrap hero">
        <h1>Explore Workshops</h1>
        <p className="lead">Learn a skill in an afternoon. Join a live session with a practitioner, or watch on demand whenever suits you.</p>
        <form className="searchbox glass" role="search" onSubmit={(e) => e.preventDefault()}>
          {Icons.search}
          <label htmlFor="q" className="sr">Search workshops by title or topic</label>
          <input id="q" type="search" placeholder="Search by title or topic, e.g. agents, Figma, pricing" autoComplete="off" value={q} onChange={(e) => { setQ(e.target.value); setNU(PAGE); setNO(PAGE); }} />
          <button type="button" className="btn btn-primary btn-sm" id="filtersBtn" aria-expanded={open} aria-controls="filters" onClick={() => setOpen((o) => !o)}>Filters</button>
        </form>
        <div className="cats" role="group" aria-label="Topics">
          {CATS.map((c) => (
            <button key={c} type="button" className="pill" aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}{data && <small>{c === 'All' ? data.length : data.filter((w) => w.category === c).length}</small>}
            </button>
          ))}
        </div>
        <div className={`filters glass ${open ? 'open' : ''}`} id="filters">
          <label className="f">When
            <select value={f.date} onChange={setFilter('date')}><option value="any">Any time</option><option value="week">Next 7 days</option><option value="fortnight">Next 14 days</option><option value="ondemand">On-demand only</option></select>
          </label>
          <label className="f">Price
            <select value={f.price} onChange={setFilter('price')}><option value="any">Any price</option><option value="free">Free</option><option value="u2000">Up to {'\u20B9'}2,000</option><option value="paid">Paid</option></select>
          </label>
          <label className="f">Level
            <select value={f.level} onChange={setFilter('level')}><option value="any">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
          </label>
          <label className="f">Sort by
            <select value={f.sort} onChange={setFilter('sort')}><option value="upcoming">Upcoming</option><option value="popular">Popular</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select>
          </label>
          <div style={{ display: 'flex', alignItems: 'end' }}><button type="button" className="btn btn-ghost btn-block" onClick={reset}>Reset filters</button></div>
        </div>
      </section>

      <div className="wrap">
        <p className="muted" aria-live="polite" style={{ marginTop: 14 }}>
          {data && `${results.length} workshop${results.length === 1 ? '' : 's'} ${active ? 'match your filters' : 'available'}`}
        </p>

        {loading && <div className="sec"><div className="grid"><Skeletons n={6} /></div></div>}

        {error && !loading && (
          <div className="state glass" role="alert" style={{ marginTop: 30 }}>
            <h2>We could not load workshops</h2>
            <p className="muted">{error.message} Check your connection and try again.</p>
            <button type="button" className="btn btn-primary" onClick={reload}>Try again</button>
          </div>
        )}

        {data && results.length === 0 && (
          <div className="state glass" style={{ marginTop: 26 }}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="28" cy="28" r="17" /><path d="M41 41l14 14M22 28h12" /></svg>
            <h2>No workshops match yet</h2>
            <p className="muted" style={{ maxWidth: '44ch' }}>Try a different keyword, or clear a filter to see more workshops.</p>
            <button type="button" className="btn btn-primary" onClick={reset}>Clear all filters</button>
          </div>
        )}

        {data && results.length > 0 && (
          <>
            {trending.length > 2 && !q && (
              <section className="sec" aria-labelledby="trend">
                <div className="sechead"><div><h2 id="trend">Popular right now</h2><p>What other learners are joining this week.</p></div></div>
                <AutoRow label="Popular workshops">
                  {trending.map((w) => <WorkshopCard key={w.slug} w={w} registered={regs.has(w.slug)} />)}
                </AutoRow>
              </section>
            )}
            {renderSection({ id: 'up', title: 'Upcoming workshops', sub: 'Live sessions you can join with the instructor.', items: live, n: nU, more: () => setNU((n) => n + PAGE) })}
            {renderSection({ id: 'od', title: 'On-demand workshops', sub: 'Recorded and ready when you are.', items: onDemand, n: nO, more: () => setNO((n) => n + PAGE) })}
          </>
        )}
      </div>
    </>
  );
}

function AccessPanel({ w }) {
  const [state, setState] = useState({ busy: false, url: null, error: null });
  const reveal = async () => {
    setState({ busy: true, url: null, error: null });
    try {
      const a = await api.access(w.slug);
      setState({ busy: false, url: a.url, error: null });
    } catch (e) {
      setState({ busy: false, url: null, error: e.message });
    }
  };
  return (
    <>
      <div className="alert good" role="status" style={{ marginBottom: 12 }}>You are registered for this workshop.</div>
      {w.format === 'live' ? (
        <>
          <button type="button" className="btn btn-primary btn-block" onClick={reveal} disabled={state.busy || Boolean(state.url)}>
            {state.url ? 'Join link shown below' : 'Show join link'}
          </button>
          <div style={{ marginTop: 12 }} aria-live="polite">
            {state.url && (
              <>
                <div className="linkbox"><a href={state.url} target="_blank" rel="noopener noreferrer">{state.url}</a></div>
                <p className="muted" style={{ fontSize: '.85rem', marginTop: 8 }}>Only you can see this link. Please do not share it.</p>
              </>
            )}
            {state.error && <div className="alert bad" role="alert">{state.error}</div>}
          </div>
        </>
      ) : (
        <LinkBtn href={`/watch/${w.slug}`} block>Watch recordings</LinkBtn>
      )}
    </>
  );
}

function WorkshopDetail({ slug }) {
  const { user, ready } = useApp();
  const { data: all } = useWorkshops();
  const [state, setState] = useState({ w: null, error: null, loading: true });

  const load = () => {
    setState({ w: null, error: null, loading: true });
    api.get(slug).then((w) => setState({ w, error: null, loading: false })).catch((e) => setState({ w: null, error: e, loading: false }));
  };
  useEffect(load, [slug]); // eslint-disable-line react-hooks/exhaustive-deps
  // Per-workshop title, description and structured data (SEO)
  useEffect(() => {
    const w = state.w;
    if (!w) return undefined;
    setPageMeta(`${w.title} | ILM ORA Workshops`, `${w.short} Taught by ${w.instructor.name}.`);
    const ld = {
      '@context': 'https://schema.org', '@type': w.format === 'live' ? 'Event' : 'Course', name: w.title, description: w.short,
      ...(w.format === 'live' ? { startDate: new Date(w.start).toISOString(), eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode', location: { '@type': 'VirtualLocation', url: window.location.href } } : { provider: { '@type': 'Organization', name: 'ILM ORA' } }),
      offers: { '@type': 'Offer', price: w.price, priceCurrency: 'INR' }, performer: { '@type': 'Person', name: w.instructor.name },
    };
    let el = document.getElementById('wk-ld');
    if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = 'wk-ld'; document.head.appendChild(el); }
    el.textContent = JSON.stringify(ld);
    return () => { const x = document.getElementById('wk-ld'); if (x) x.remove(); };
  }, [state.w]);

  const { w, error, loading } = state;
  if (loading) return <div className="wrap"><div className="skel" style={{ marginTop: 20, height: 220 }} /><div className="skel" style={{ marginTop: 14, height: 340 }} /></div>;
  if (error) {
    return error.code === 404
      ? <StateBox title="Workshop not found" text="It may have been removed or the link is mistyped."><LinkBtn href="/workshops">Browse workshops</LinkBtn></StateBox>
      : <StateBox title="We could not load this workshop" text={error.message}><button type="button" className="btn btn-primary" onClick={load}>Try again</button></StateBox>;
  }

  const live = w.format === 'live';
  const full = live && w.seatsLeft === 0;
  const reg = ready && user ? api.myReg(w.slug) : null;
  const regs = new Set(user ? api.myRegs().map((r) => r.slug) : []);
  const related = (all || []).filter((x) => x.slug !== w.slug && x.category === w.category)
    .concat((all || []).filter((x) => x.slug !== w.slug && x.category !== w.category && x.level === w.level)).slice(0, 3);

  const facts = [
    live ? [Icons.cal, 'Date', fmtDL.format(w.start)] : [Icons.play, 'Format', 'Recorded, watch any time'],
    live ? [Icons.clock, 'Time', `${fmtT.format(w.start)} \u2022 ${w.tz}`] : [Icons.clock, 'Total length', durTxt(w.duration)],
    ...(live ? [[Icons.clock, 'Duration', durTxt(w.duration)]] : []),
    [Icons.lvl, 'Level', w.level],
    [Icons.play, 'Format', live ? 'Live online session' : 'On-demand recordings'],
    [Icons.cal, 'Registration', full ? 'Closed, this session is full' : w.seatsLeft != null ? `Open, ${w.seatsLeft} seats left` : 'Open, enrol any time'],
  ];

  const onBannerMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const b = e.currentTarget, r = b.getBoundingClientRect();
    b.style.transform = `perspective(1200px) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 4}deg) rotateX(${(0.5 - (e.clientY - r.top) / r.height) * 3}deg)`;
  };

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/workshops">Workshops</Link> / <Link href={`/workshops?cat=${w.category}`}>{w.category}</Link> / <span aria-current="page">{w.title}</span>
      </nav>
      <div className="banner" onPointerMove={onBannerMove} onPointerLeave={(e) => { e.currentTarget.style.transform = ''; }}>
        <WorkshopArt w={w} />
        <div className="badges"><FormatBadge w={w} />{w.price === 0 && <span className="badge free">Free</span>}</div>
      </div>

      <div className="dgrid">
        <div>
          <div className="panel glass">
            <h1 style={{ fontSize: 'clamp(1.25rem,2.6vw,1.65rem)' }}>{w.title}</h1>
            <p className="lead" style={{ marginTop: 12 }}>{w.short}</p>
            <p style={{ marginTop: 16 }}>{w.long}</p>
          </div>
          <div className="panel glass"><h2>What you will learn</h2><ul className="ticks">{w.learn.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div className="panel glass"><h2>Learning outcomes</h2><ul className="ticks">{w.outcomes.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div className="panel glass">
            <h2>{live ? 'Session agenda' : 'Modules'}</h2>
            {w.agenda.map((a, i) => (
              <details className="ag" key={a.title} open={i === 0}>
                <summary><span>{a.title}</span><span className="t">{a.time}</span></summary>
                <div className="d">{a.desc}</div>
              </details>
            ))}
          </div>
          <div className="panel glass twocol">
            <div><h2>Before you join</h2><ul className="ticks" style={{ marginTop: 14 }}>{w.prereq.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div><h2>Who this is for</h2><ul className="ticks" style={{ marginTop: 14 }}>{w.audience.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
          <div className="panel glass">
            <h2>Your instructor</h2>
            <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <Avatar person={w.instructor} large />
              <div style={{ flex: 1, minWidth: 220 }}>
                <h3>{w.instructor.name}</h3>
                <p className="muted">{w.instructor.role} {'\u2022'} {w.instructor.years}+ years of experience</p>
                <p style={{ marginTop: 10 }}>{w.instructor.bio}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="aside">
          <div className="panel glass" aria-label="Registration">
            <div className="price" style={{ fontSize: '1.55rem' }}>{money(w.price)}</div>
            <ul className="facts">
              {facts.map(([icon, label, value]) => (
                <li key={label + value}><span aria-hidden="true">{icon}</span><span><b>{label}</b>{value}</span></li>
              ))}
            </ul>
            <div>
              {reg ? <AccessPanel w={w}
              /> : full ? (
                <>
                  <button type="button" className="btn btn-primary btn-block" disabled>Sold out</button>
                  <p className="muted" style={{ marginTop: 10, fontSize: '.9rem' }}>Registration is closed. Browse similar workshops below.</p>
                </>
              ) : (
                <>
                  <LinkBtn href={`/register/${w.slug}`} block>{w.price === 0 ? 'Register now, it is free' : 'Register now'}</LinkBtn>
                  <p className="muted" style={{ marginTop: 10, fontSize: '.88rem' }}>Takes about a minute. No account needed.</p>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="sec" aria-labelledby="rel">
          <div className="sechead"><h2 id="rel">Related workshops</h2></div>
          <div className="grid">{related.map((x) => <WorkshopCard key={x.slug} w={x} registered={regs.has(x.slug)} />)}</div>
        </section>
      )}
    </div>
  );
}

/** Prototype auth form. Wire login/signup to the existing ILM ORA authentication in AppProviders. */
function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const hasNext = Boolean(sp.get('next'));
  const next = safeNext(sp.get('next'));
  const { user, ready, login, signup, toast } = useApp();
  const [mode, setMode] = useState('in');
  const [v, setV] = useState({ name: '', email: '', pw: '' });
  const [errors, setErrors] = useState({});
  const [formErr, setFormErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (ready && user) router.replace(next); }, [ready, user, next, router]);

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (mode === 'up' && v.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!emailOK(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
    if (mode === 'up' ? v.pw.length < 8 : v.pw.length === 0) e.pw = mode === 'up' ? 'Use at least 8 characters.' : 'Enter your password.';
    return e;
  };
  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) { setFormErr('Please fix the highlighted fields.'); return; }
    setFormErr(''); setBusy(true);
    try {
      const u = mode === 'in' ? await login({ email: v.email.trim(), password: v.pw }) : await signup({ name: v.name.trim(), email: v.email.trim(), password: v.pw });
      toast(mode === 'in' ? `Welcome back, ${u.name.split(' ')[0]}.` : 'Account created. You are signed in.', 'ok');
      router.replace(next);
    } catch (err) {
      setFormErr(err.message); setBusy(false);
    }
  };
  const invalid = (k) => (errors[k] ? 'true' : 'false');

  return (
    <div className="wrap">
      <div className="formwrap narrow panel glass">
        <h1 style={{ fontSize: '1.45rem' }}>{mode === 'in' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="muted" style={{ margin: '8px 0 18px' }}>{hasNext ? 'Sign in to continue your registration.' : 'Access your registered workshops and join links.'}</p>
        <div className="tabs" role="tablist">
          <button type="button" role="tab" aria-selected={mode === 'in'} onClick={() => { setMode('in'); setErrors({}); setFormErr(''); }}>Sign in</button>
          <button type="button" role="tab" aria-selected={mode === 'up'} onClick={() => { setMode('up'); setErrors({}); setFormErr(''); }}>Create account</button>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          <div role="alert">{formErr && <div className="alert bad">{formErr}</div>}</div>
          {mode === 'up' && (
            <Field id="name" label="Full name" error={errors.name}>
              <input className="in" id="name" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={invalid('name')} aria-describedby="name-e" />
            </Field>
          )}
          <Field id="email" label="Email" error={errors.email}>
            <input className="in" id="email" type="email" autoComplete="email" value={v.email} onChange={set('email')} aria-invalid={invalid('email')} aria-describedby="email-e" />
          </Field>
          <Field id="pw" label={`Password${mode === 'up' ? ' (8+ characters)' : ''}`} error={errors.pw}>
            <input className="in" id="pw" type="password" autoComplete={mode === 'in' ? 'current-password' : 'new-password'} value={v.pw} onChange={set('pw')} aria-invalid={invalid('pw')} aria-describedby="pw-e" />
          </Field>
          <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
            {busy ? <><Spinner />Please wait</> : mode === 'in' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        <p className="muted" style={{ fontSize: '.82rem', marginTop: 16 }}>Prototype note: this form uses a temporary in-browser account store. Connect it to ILM ORA's existing authentication.</p>
      </div>
    </div>
  );
}

const luhn = (n) => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return s % 10 === 0; };
function RegisterFlow({ slug }) {
  const router = useRouter();
  const { user, ready, toast } = useApp();
  const [w, setW] = useState(null);
  const [loadErr, setLoadErr] = useState(null);
  const [step, setStep] = useState(1);
  const [d, setD] = useState({ name: '', email: '', phone: '', country: 'India', address: '' });
  const [pay, setPay] = useState({ cnum: '', cexp: '', ccvc: '' });
  const [promo, setPromo] = useState({ open: false, code: '', applied: false, error: '' });
  const [errors, setErrors] = useState({});
  const [formErr, setFormErr] = useState(null);
  const [busy, setBusy] = useState(false);

    // Guest checkout (Maven style): login ki zaroorat nahi
  useEffect(() => { if (user) setD((s) => ({ ...s, name: s.name || user.name, email: s.email || user.email })); }, [user]);
  useEffect(() => { api.get(slug).then(setW).catch(setLoadErr); }, [slug]);
  // Prevent duplicate registrations
  useEffect(() => {
    if (user && api.myReg(slug)) { toast('You are already registered for this workshop.'); router.replace(`/workshops/${slug}`); }
  }, [user, slug, router, toast]);

  if (loadErr) return <StateBox title="We could not load this workshop" text={loadErr.message}><LinkBtn href="/workshops">Back to workshops</LinkBtn></StateBox>;
    if (!w) return <div className="wrap"><div className="skel" style={{ marginTop: 24, height: 340, maxWidth: 900, marginInline: 'auto' }} /></div>;
  if (w.format === 'live' && w.seatsLeft === 0) {
    return <StateBox title="This workshop is full" text="Registration is closed for this session. Explore similar workshops instead."><LinkBtn href={`/workshops?cat=${w.category}`}>See more in {w.category}</LinkBtn></StateBox>;
  }

  const paid = w.price > 0;
  const live = w.format === 'live';
  const total = promo.applied ? Math.round(w.price * 0.9) : w.price;
  const setField = (k) => (e) => setD((s) => ({ ...s, [k]: e.target.value }));
  const inv = (k) => (errors[k] ? 'true' : 'false');

  const submit = async () => {
    setBusy(true); setFormErr(null);
    try {
      await api.register(slug, { ...d, level: '', goal: '', consent: true, paid });
      invalidateWorkshops();
      toast('You are registered.', 'ok');
      router.push(`/confirmation/${slug}`);
    } catch (err) {
      setFormErr({ message: err.message, duplicate: err.code === 409 });
      setBusy(false);
      if (err.code === 401) router.replace(`/login?next=${encodeURIComponent(`/register/${slug}`)}`);
    }
  };

  const onEmail = (ev) => {
    ev.preventDefault();
    if (!emailOK(d.email.trim())) { setErrors({ email: 'Enter a valid email address.' }); return; }
       setErrors({}); setFormErr(null);
    // Guest checkout: email se hi session ban jata hai (login zaroori nahi)
    const em = d.email.trim().toLowerCase();
    const cur = api.session();
    if (!cur || (String(cur.id).startsWith('g-') && cur.email !== em)) {
      store.set('ilm_session', { id: 'g-' + em, name: '', email: em });
      window.dispatchEvent(new Event('focus'));
    }
    setStep(2);
  };

  const applyPromo = () => {
    if (promo.code.trim().toUpperCase() === 'ILMORA10') setPromo((p) => ({ ...p, applied: true, error: '' }));
    else setPromo((p) => ({ ...p, applied: false, error: 'This promo code is not valid.' }));
  };

  const onPay = (ev) => {
    ev.preventDefault();
    const e = {};
    if (d.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(d.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (paid) {
      const digits = pay.cnum.replace(/\s/g, '');
      if (!(digits.length >= 13 && luhn(digits))) e.cnum = 'Enter a valid card number.';
      const m = /^(\d{2})\/(\d{2})$/.exec(pay.cexp);
      const now = new Date();
      const okExp = m && +m[1] >= 1 && +m[1] <= 12 && (2000 + +m[2] > now.getFullYear() || (2000 + +m[2] === now.getFullYear() && +m[1] >= now.getMonth() + 1));
      if (!okExp) e.cexp = 'Enter a valid, future expiry date as MM/YY.';
      if (!/^\d{3,4}$/.test(pay.ccvc)) e.ccvc = 'Enter the 3 or 4 digit security code.';
    }
    setErrors(e);
    if (Object.keys(e).length) { setFormErr({ message: 'Please fix the highlighted fields.' }); return; }
    submit();
  };

  const alertBox = formErr && (
    <div className="alert bad">{formErr.message}{formErr.duplicate && <> <Link href={`/workshops/${slug}`}>View your registration</Link></>}</div>
  );

  return (
    <div className="wrap">
      <div className="jn">
        {/* Left: workshop summary */}
        <div className="jn-info">
          <h1>{w.title}</h1>
          <p className="jn-sub">with {w.instructor.name}</p>
          <p className="jn-sub">{live ? `${fmtDL.format(w.start)}, ${fmtT.format(w.start)} IST` : 'On-demand, watch any time'}</p>
          <div className="jn-line">
            <span>1 seat</span>
            <b>{money(w.price)}</b>
          </div>
          <ul className="jn-pts">
            {w.seatsLeft != null && w.seatsLeft <= 20 && (
              <li><span className="ic" aria-hidden="true">{Icons.lvl}</span><span><b>Limited seats</b>Only {w.seatsLeft} seats left</span></li>
            )}
            <li><span className="ic" aria-hidden="true">{Icons.clock}</span><span><b>{durTxt(w.duration)} {live ? 'live session' : 'of recordings'}</b>{w.level} level</span></li>
            <li><span className="ic" aria-hidden="true">{Icons.cal}</span><span><b>Saved to My learning</b>{live ? 'Your join link unlocks there after you enroll.' : 'Your recordings unlock there after you enroll.'}</span></li>
          </ul>
        </div>

        {/* Right: step card */}
        <div>
          <div className="panel glass jn-card">
            {step === 1 ? (
              <>
                <h1 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Enter your email</h1>
                <form className="form" onSubmit={onEmail} noValidate>
                  <div role="alert">{alertBox}</div>
                  <Field id="remail" label="" error={errors.email}>
                    <input className="in" id="remail" type="email" autoComplete="email" aria-label="Email" value={d.email} onChange={setField('email')} aria-invalid={inv('email')} aria-describedby="remail-e" />
                  </Field>
                  <p className="muted" style={{ fontSize: '.72rem', marginTop: -6 }}>You will use this email to get your workshop updates.</p>
                  <button className="btn btn-primary btn-block" type="submit">Continue</button>
                  <p className="jn-note">By continuing, you agree to the workshop terms and privacy policy.</p>
                </form>
                <div className="jn-say">
                  <Avatar person={w.instructor} large />
                  <div className="jn-bub">I am excited to have you in the workshop! Once you enroll, you will get an email with next steps.</div>
                </div>
              </>
            ) : (
              <>
                <h1 style={{ fontSize: '1.3rem' }}>{paid ? 'Pay and enroll' : 'Confirm and enroll'}</h1>
                <p className="muted" style={{ fontSize: '.8rem', margin: '4px 0 14px' }}>
                  {d.email} | <button type="button" className="linkbtn" onClick={() => { setStep(1); setFormErr(null); }}>not you?</button>
                </p>
                <form className="form" onSubmit={onPay} noValidate>
                  <div role="alert">{alertBox}</div>
                  {paid && (
                    <>
                      <Field id="cnum" label="Card number" error={errors.cnum}>
                        <input className="in" id="cnum" inputMode="numeric" autoComplete="cc-number" placeholder="1234 1234 1234 1234" value={pay.cnum} onChange={(e) => setPay((s) => ({ ...s, cnum: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ') }))} aria-invalid={inv('cnum')} aria-describedby="cnum-e" />
                      </Field>
                      <div className="fr two">
                        <Field id="cexp" label="Expiration date" error={errors.cexp}>
                          <input className="in" id="cexp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" value={pay.cexp} onChange={(e) => { let x = e.target.value.replace(/\D/g, '').slice(0, 4); if (x.length > 2) x = x.slice(0, 2) + '/' + x.slice(2); setPay((s) => ({ ...s, cexp: x })); }} aria-invalid={inv('cexp')} aria-describedby="cexp-e" />
                        </Field>
                        <Field id="ccvc" label="Security code" error={errors.ccvc}>
                          <input className="in" id="ccvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={pay.ccvc} onChange={(e) => setPay((s) => ({ ...s, ccvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))} aria-invalid={inv('ccvc')} aria-describedby="ccvc-e" />
                        </Field>
                      </div>
                    </>
                  )}
                  <Field id="rname" label="Full name" error={errors.name}>
                    <input className="in" id="rname" autoComplete="name" value={d.name} onChange={setField('name')} aria-invalid={inv('name')} aria-describedby="rname-e" />
                  </Field>
                  <Field id="rphone" label="Mobile number" error={errors.phone}>
                    <input className="in" id="rphone" type="tel" autoComplete="tel" placeholder="10-digit number" value={d.phone} onChange={setField('phone')} aria-invalid={inv('phone')} aria-describedby="rphone-e" />
                  </Field>
                  {paid && (
                    <>
                      <Field id="rcountry" label="Country or region" error="">
                        <select id="rcountry" value={d.country} onChange={setField('country')}>
                          {['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore', 'Other'].map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field id="raddr" label="Address" error="">
                        <input className="in" id="raddr" autoComplete="street-address" value={d.address} onChange={setField('address')} />
                      </Field>

                      {promo.open ? (
                        <div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <input className="in" placeholder="Promo code" aria-label="Promo code" value={promo.code} onChange={(e) => setPromo((p) => ({ ...p, code: e.target.value, applied: false, error: '' }))} />
                            <button type="button" className="btn btn-ghost" onClick={applyPromo}>Apply</button>
                          </div>
                          <div className="err">{promo.error}</div>
                          {promo.applied && <div className="muted" style={{ fontSize: '.78rem' }}>Promo applied: 10% off.</div>}
                        </div>
                      ) : (
                        <button type="button" className="linkbtn" style={{ textAlign: 'left', fontSize: '.84rem' }} onClick={() => setPromo((p) => ({ ...p, open: true }))}>+ Apply promo code</button>
                      )}

                      <div className="jn-sum">
                        <div><span>Subtotal ({money(w.price)} x 1 seat)</span><span>{money(w.price)}</span></div>
                        {promo.applied && <div><span>Promo discount</span><span>-{money(w.price - total)}</span></div>}
                        <div className="tot"><span>Total</span><span>{money(total)}</span></div>
                      </div>
                    </>
                  )}
                  <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
                    {busy ? <><Spinner />Processing</> : paid ? 'Pay and enroll' : 'Confirm free registration'}
                  </button>
                  {paid && <p className="jn-note">Demo payment form. No card is charged. Connect ILM ORA's payment gateway here.</p>}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Purana register form (ab use nahi ho raha). Chaho to poora delete kar sakte ho. */
function RegisterFlowOld({ slug }) {

  const router = useRouter();
  const { user, ready, toast } = useApp();
  const [w, setW] = useState(null);
  const [loadErr, setLoadErr] = useState(null);
  const [step, setStep] = useState(1);
  const [d, setD] = useState({ name: '', email: '', phone: '', level: '', goal: '', consent: false });
  const [pay, setPay] = useState({ cname: '', cnum: '', cexp: '', ccvc: '' });
  const [errors, setErrors] = useState({});
  const [formErr, setFormErr] = useState(null);
  const [busy, setBusy] = useState(false);

  // Auth gate: Workshop Details -> Login/Signup -> Registration
  useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent(`/register/${slug}`)}`); }, [ready, user, slug, router]);
  useEffect(() => { if (user) setD((s) => ({ ...s, name: s.name || user.name, email: s.email || user.email })); }, [user]);
  useEffect(() => { api.get(slug).then(setW).catch(setLoadErr); }, [slug]);
  // Prevent duplicate registrations
  useEffect(() => {
    if (user && api.myReg(slug)) { toast('You are already registered for this workshop.'); router.replace(`/workshops/${slug}`); }
  }, [user, slug, router, toast]);

  if (loadErr) return <StateBox title="We could not load this workshop" text={loadErr.message}><LinkBtn href="/workshops">Back to workshops</LinkBtn></StateBox>;
  if (!w || !user) return <div className="wrap"><div className="skel" style={{ marginTop: 24, height: 340, maxWidth: 660, marginInline: 'auto' }} /></div>;
  if (w.format === 'live' && w.seatsLeft === 0) {
    return <StateBox title="This workshop is full" text="Registration is closed for this session. Explore similar workshops instead."><LinkBtn href={`/workshops?cat=${w.category}`}>See more in {w.category}</LinkBtn></StateBox>;
  }

  const paid = w.price > 0;
  const setField = (k) => (e) => setD((s) => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const inv = (k) => (errors[k] ? 'true' : 'false');

  const submit = async (paidNow) => {
    setBusy(true); setFormErr(null);
    try {
      await api.register(slug, { ...d, paid: paidNow });
      invalidateWorkshops();
      toast('You are registered.', 'ok');
      router.push(`/confirmation/${slug}`);
    } catch (err) {
      setFormErr({ message: err.message, duplicate: err.code === 409 });
      setBusy(false);
      if (err.code === 401) router.replace(`/login?next=${encodeURIComponent(`/register/${slug}`)}`);
    }
  };

  const onDetails = (ev) => {
    ev.preventDefault();
    const e = {};
    if (d.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!emailOK(d.email.trim())) e.email = 'Enter a valid email address.';
    if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(d.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (!d.level) e.level = 'Choose your experience level.';
    if (!d.consent) e.consent = 'Please accept to continue.';
    setErrors(e);
    if (Object.keys(e).length) { setFormErr({ message: 'Please fix the highlighted fields.' }); return; }
    setFormErr(null);
    if (paid) { setStep(2); window.scrollTo({ top: 0 }); } else submit(false);
  };

  const onPay = (ev) => {
    ev.preventDefault();
    const e = {};
    if (pay.cname.trim().length < 2) e.cname = 'Enter the name on the card.';
    const digits = pay.cnum.replace(/\s/g, '');
    if (!(digits.length >= 13 && luhn(digits))) e.cnum = 'Enter a valid card number.';
    const m = /^(\d{2})\/(\d{2})$/.exec(pay.cexp);
    const now = new Date();
    const okExp = m && +m[1] >= 1 && +m[1] <= 12 && (2000 + +m[2] > now.getFullYear() || (2000 + +m[2] === now.getFullYear() && +m[1] >= now.getMonth() + 1));
    if (!okExp) e.cexp = 'Enter a valid, future expiry date as MM/YY.';
    if (!/^\d{3,4}$/.test(pay.ccvc)) e.ccvc = 'Enter the 3 or 4 digit security code.';
    setErrors(e);
    if (Object.keys(e).length) { setFormErr({ message: 'Please fix the highlighted fields.' }); return; }
    submit(true);
  };

  const steps = [{ n: 1, t: 'Your details' }, ...(paid ? [{ n: 2, t: 'Payment' }] : [])];
  const alertBox = formErr && (
    <div className="alert bad">{formErr.message}{formErr.duplicate && <> <Link href={`/workshops/${slug}`}>View your registration</Link></>}</div>
  );

  return (
    <div className="wrap">
      <div className="formwrap">
        <ol className="steps" aria-label="Registration progress">
          {steps.map((s) => <li key={s.n} className={step > s.n ? 'done' : ''} aria-current={step === s.n ? 'step' : undefined}>{s.n}. {s.t}</li>)}
          <li>{steps.length + 1}. Confirmation</li>
        </ol>

        <div className="panel glass" style={{ marginBottom: 18, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 120, borderRadius: 12, overflow: 'hidden', flex: 'none' }}><WorkshopArt w={w} /></div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{ fontSize: '1rem' }}>{w.title}</h2>
            <p className="muted">{w.format === 'live' ? `${fmtD.format(w.start)}, ${fmtT.format(w.start)} IST` : 'On-demand'} {'\u2022'} {money(w.price)}</p>
          </div>
        </div>

        <div className="panel glass">
          {step === 1 ? (
            <>
              <h1 style={{ fontSize: '1.3rem', marginBottom: 4 }}>Your details</h1>
              <p className="muted" style={{ marginBottom: 18 }}>We use these to confirm your place and send reminders.</p>
              <form className="form" onSubmit={onDetails} noValidate>
                <div role="alert">{alertBox}</div>
                <div className="fr two">
                  <Field id="rname" label="Full name" error={errors.name}><input className="in" id="rname" autoComplete="name" value={d.name} onChange={setField('name')} aria-invalid={inv('name')} aria-describedby="rname-e" /></Field>
                  <Field id="remail" label="Email" error={errors.email}><input className="in" id="remail" type="email" autoComplete="email" value={d.email} onChange={setField('email')} aria-invalid={inv('email')} aria-describedby="remail-e" /></Field>
                </div>
                <div className="fr two">
                  <Field id="rphone" label="Mobile number" error={errors.phone}><input className="in" id="rphone" type="tel" autoComplete="tel" placeholder="10-digit number" value={d.phone} onChange={setField('phone')} aria-invalid={inv('phone')} aria-describedby="rphone-e" /></Field>
                  <Field id="rlevel" label="Your experience level" error={errors.level}>
                    <select id="rlevel" value={d.level} onChange={setField('level')} aria-invalid={inv('level')} aria-describedby="rlevel-e"><option value="">Choose one</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
                  </Field>
                </div>
                <div><label className="f" htmlFor="rgoal">What do you hope to get from this workshop? (optional)<textarea id="rgoal" rows={3} maxLength={300} value={d.goal} onChange={setField('goal')} /></label></div>
                <div>
                  <label className="check"><input type="checkbox" checked={d.consent} onChange={setField('consent')} aria-invalid={inv('consent')} aria-describedby="rconsent-e" /><span>I agree to receive session reminders and accept the workshop terms.</span></label>
                  <div className="err" id="rconsent-e">{errors.consent}</div>
                </div>
                <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
                  {busy ? <><Spinner />Processing</> : paid ? 'Continue to payment' : w.price === 0 ? 'Confirm free registration' : 'Confirm registration'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: '1.3rem', marginBottom: 4 }}>Payment</h1>
              <p className="muted" style={{ marginBottom: 14 }}>Total due today: <b style={{ color: 'var(--text)' }}>{money(w.price)}</b></p>
              <div className="alert" style={{ background: 'color-mix(in srgb,var(--accent) 20%,transparent)', border: '1px solid var(--accent)', marginBottom: 16, fontSize: '.88rem' }}>
                Demo payment form. No card is charged. Connect ILM ORA's existing payment gateway here.
              </div>
              <form className="form" onSubmit={onPay} noValidate>
                <div role="alert">{alertBox}</div>
                <Field id="cname" label="Name on card" error={errors.cname}><input className="in" id="cname" autoComplete="cc-name" value={pay.cname} onChange={(e) => setPay((s) => ({ ...s, cname: e.target.value }))} aria-invalid={inv('cname')} aria-describedby="cname-e" /></Field>
                <Field id="cnum" label="Card number" error={errors.cnum}><input className="in" id="cnum" inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" value={pay.cnum} onChange={(e) => setPay((s) => ({ ...s, cnum: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ') }))} aria-invalid={inv('cnum')} aria-describedby="cnum-e" /></Field>
                <div className="fr two">
                  <Field id="cexp" label="Expiry (MM/YY)" error={errors.cexp}><input className="in" id="cexp" inputMode="numeric" autoComplete="cc-exp" placeholder="08/29" value={pay.cexp} onChange={(e) => { let x = e.target.value.replace(/\D/g, '').slice(0, 4); if (x.length > 2) x = x.slice(0, 2) + '/' + x.slice(2); setPay((s) => ({ ...s, cexp: x })); }} aria-invalid={inv('cexp')} aria-describedby="cexp-e" /></Field>
                  <Field id="ccvc" label="CVC" error={errors.ccvc}><input className="in" id="ccvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" value={pay.ccvc} onChange={(e) => setPay((s) => ({ ...s, ccvc: e.target.value }))} aria-invalid={inv('ccvc')} aria-describedby="ccvc-e" /></Field>
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => { setStep(1); setFormErr(null); }}>Back</button>
                  <button className="btn btn-primary" style={{ flex: 1 }} type="submit" disabled={busy}>{busy ? <><Spinner />Processing</> : `Pay ${money(w.price)} and register`}</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const COLORS = ['#f97316', '#00bf63', '#ffb27a', '#ffd166', '#2dd4bf'];
const gcal = (w) => {
  const f = (t) => new Date(t).toISOString().replace(/[-:]|\.\d{3}/g, '');
  const end = w.start + w.duration * 60000;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(w.title)}&dates=${f(w.start)}/${f(end)}&details=${encodeURIComponent(`ILM ORA workshop with ${w.instructor.name}. Your join link is in My learning.`)}`;
};

function Confirmation({ slug }) {
  const router = useRouter();
  const { user, ready } = useApp();
  const [w, setW] = useState(null);
  const [reg, setReg] = useState(null);
  const [error, setError] = useState(null);
  const [pieces, setPieces] = useState([]);
  const stage = useRef(null);
  const ticket = useRef(null);

  useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent(`/confirmation/${slug}`)}`); }, [ready, user, slug, router]);
  useEffect(() => {
    if (!ready || !user) return;
    const r = api.myReg(slug);
    if (!r) { router.replace(`/workshops/${slug}`); return; }
    setReg(r);
    api.get(slug).then(setW).catch(setError);
  }, [ready, user, slug, router]);
  useEffect(() => {
    if (!w || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setPieces(Array.from({ length: 60 }, (_, i) => ({ id: i, left: Math.random() * 100, color: COLORS[i % 5], dx: Math.random() * 200 - 100, dur: 2.2 + Math.random() * 2, delay: Math.random() * 0.6 })));
    const t = setTimeout(() => setPieces([]), 5200);
    return () => clearTimeout(t);
  }, [w]);

  if (error) return <StateBox title="We could not load your registration" text={error.message}><LinkBtn href="/dashboard">Go to my learning</LinkBtn></StateBox>;
  if (!w || !reg) return <div className="wrap"><div className="skel" style={{ marginTop: 24, height: 340 }} /></div>;

  const live = w.format === 'live';
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = stage.current.getBoundingClientRect();
    const t = ticket.current;
    t.style.animation = 'none';
    t.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 26 + 'deg');
    t.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 20 + 'deg');
  };
  const onLeave = () => { ticket.current.style.setProperty('--ry', '-14deg'); ticket.current.style.setProperty('--rx', '8deg'); };

  return (
    <div className="wrap" style={{ textAlign: 'center', paddingTop: 26 }}>
      {pieces.length > 0 && (
        <div className="confetti" aria-hidden="true">
          {pieces.map((p) => <i key={p.id} style={{ left: `${p.left}%`, background: p.color, '--dx': `${p.dx}px`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />)}
        </div>
      )}
      <h1 style={{ fontSize: 'clamp(1.5rem,3.6vw,2.2rem)' }}>You are in, {reg.name.split(' ')[0]}.</h1>
      <p className="lead" style={{ margin: '12px auto 0' }}>A confirmation has been saved to your account. {live ? 'Your join link unlocks in My learning.' : 'Your recordings are ready to watch.'}</p>

      <div className="ticketstage" ref={stage} onPointerMove={onMove} onPointerLeave={onLeave}>
        <div className="ticket" ref={ticket}>
          <div className="face" style={{ textAlign: 'left' }}>
            <div className="top"><WorkshopArt w={w} /></div>
            <div className="mid">
              <h2 style={{ fontSize: '1.12rem' }}>{w.title}</h2>
              <p className="muted" style={{ marginTop: 6 }}>with {w.instructor.name}</p>
              <div className="meta" style={{ marginTop: 12, fontSize: '.92rem' }}>
                <span>{Icons.cal}{live ? fmtDL.format(w.start) : 'Watch any time'}</span>
                {live && <span>{Icons.clock}{fmtT.format(w.start)} IST</span>}
                <span>{Icons.clock}{durTxt(w.duration)}</span>
              </div>
            </div>
            <div className="perf" />
            <div className="bot">
              <div>
                <div className="muted" style={{ fontSize: '.8rem' }}>Booking reference</div>
                <b style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '.06em' }}>{reg.id}</b>
                <div className="muted" style={{ fontSize: '.82rem', marginTop: 4 }}>{reg.paid ? `Paid ${money(reg.amount)}` : 'Free registration'}</div>
              </div>
              <div className="bars" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <LinkBtn href="/dashboard">Go to my learning</LinkBtn>
        {live
          ? <a className="btn btn-ghost" href={gcal(w)} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
          : <LinkBtn href={`/watch/${w.slug}`} ghost>Start watching</LinkBtn>}
        <LinkBtn href="/workshops" ghost>Browse more workshops</LinkBtn>
      </div>
    </div>
  );
}

function Row({ w, reg, onCancelled }) {
  const { toast } = useApp();
  const [link, setLink] = useState({ url: null, error: null, busy: false });
  const [armed, setArmed] = useState(false);

  const join = async () => {
    setLink({ url: null, error: null, busy: true });
    try { const a = await api.access(w.slug); setLink({ url: a.url, error: null, busy: false }); }
    catch (e) { setLink({ url: null, error: e.message, busy: false }); }
  };
  const cancel = async () => {
    if (!armed) { setArmed(true); setTimeout(() => setArmed(false), 4000); return; }
    await api.cancel(w.slug);
    invalidateWorkshops();
    toast('Registration cancelled.', 'ok');
    onCancelled();
  };

  return (
    <article className="dcard glass">
      <div className="art"><WorkshopArt w={w} /></div>
      <div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}><FormatBadge w={w} /></div>
        <h2 style={{ fontSize: '1.02rem' }}><Link href={`/workshops/${w.slug}`} style={{ textDecoration: 'none' }}>{w.title}</Link></h2>
        <p className="muted" style={{ marginTop: 4 }}>{w.format === 'live' ? `${fmtD.format(w.start)}, ${fmtT.format(w.start)} IST` : 'Watch any time'} {'\u2022'} with {w.instructor.name}</p>
        <p className="muted" style={{ fontSize: '.85rem', marginTop: 4 }}>Reference {reg.id}</p>
        <div style={{ marginTop: 10 }} aria-live="polite">
          {link.url && <div className="linkbox"><a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></div>}
          {link.error && <div className="alert bad" role="alert">{link.error}</div>}
        </div>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {w.format === 'live'
          ? <button type="button" className="btn btn-primary btn-sm" onClick={join} disabled={link.busy || Boolean(link.url)}>{link.url ? 'Join link shown' : 'Show join link'}</button>
          : <LinkBtn href={`/watch/${w.slug}`} sm>Watch recordings</LinkBtn>}
        <LinkBtn href={`/workshops/${w.slug}`} ghost sm>Details</LinkBtn>
        <button type="button" className="btn btn-ghost btn-sm" onClick={cancel}>{armed ? 'Tap again to confirm' : 'Cancel registration'}</button>
      </div>
    </article>
  );
}

function Dashboard() {
  const router = useRouter();
  const { user, ready } = useApp();
  const { data, error, loading, reload } = useWorkshops();
  const [tick, setTick] = useState(0);

  useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent('/dashboard')}`); }, [ready, user, router]);

  const rows = useMemo(() => {
    if (!data || !user) return [];
    return api.myRegs()
      .map((reg) => ({ reg, w: data.find((x) => x.slug === reg.slug) }))
      .filter((x) => x.w)
      .sort((a, b) => (a.w.start || 1e15) - (b.w.start || 1e15));
  }, [data, user, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ready || !user) return <div className="wrap" style={{ paddingTop: 36 }}><div className="dash"><Skeletons n={2} height={140} /></div></div>;
  if (error) return <StateBox title="We could not load your workshops" text={error.message}><button type="button" className="btn btn-primary" onClick={reload}>Try again</button></StateBox>;

  return (
    <div className="wrap" style={{ paddingTop: 24 }}>
      <h1 style={{ fontSize: 'clamp(1.5rem,3.6vw,2.2rem)' }}>My learning</h1>
      <p className="lead">Signed in as {user.email}</p>
      {loading ? <div className="dash"><Skeletons n={2} height={140} /></div>
        : rows.length ? (
          <div className="dash">{rows.map(({ reg, w }) => <Row key={reg.id} w={w} reg={reg} onCancelled={() => setTick((t) => t + 1)} />)}</div>
        ) : (
          <div className="state glass" style={{ marginTop: 30 }}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><rect x="8" y="14" width="48" height="40" rx="6" /><path d="M8 26h48M22 8v10M42 8v10" /></svg>
            <h2>No registered workshops yet</h2>
            <p className="muted">Pick a workshop and it will appear here with your join link or recordings.</p>
            <LinkBtn href="/workshops">Explore workshops</LinkBtn>
          </div>
        )}
    </div>
  );
}

/** Prototype player. Replace the placeholder with ILM ORA's secure video player using signed URLs from the backend. */
function WatchPlayer({ slug }) {
  const router = useRouter();
  const { user, ready } = useApp();
  const [data, setData] = useState({ w: null, access: null, error: null });
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent(`/watch/${slug}`)}`); }, [ready, user, slug, router]);
  useEffect(() => {
    if (!ready || !user) return;
    Promise.all([api.get(slug), api.access(slug)])
      .then(([w, access]) => { if (access.type !== 'ondemand') router.replace(`/workshops/${slug}`); else setData({ w, access, error: null }); })
      .catch((error) => setData({ w: null, access: null, error }));
  }, [ready, user, slug, router]);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPct((p) => { if (p >= 100) { setPlaying(false); return 100; } return Math.min(100, p + 1.5); }), 250);
    return () => clearInterval(t);
  }, [playing]);

  const { w, access, error } = data;
  if (error) {
    const forbidden = error.code === 403;
    return (
      <StateBox title={forbidden ? 'Registration required' : 'We could not open this content'} text={forbidden ? 'Recorded content is only available to registered learners.' : error.message}>
        <LinkBtn href={`/workshops/${slug}`}>{forbidden ? 'Register for this workshop' : 'Back to workshop'}</LinkBtn>
      </StateBox>
    );
  }
  if (!w) return <div className="wrap"><div className="skel" style={{ marginTop: 24, height: 340 }} /></div>;

  const pick = (i) => { setCur(i); setPct(0); setPlaying(false); };
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb"><Link href="/dashboard">My learning</Link> / <span aria-current="page">{w.title}</span></nav>
      <div className="dgrid">
        <div>
          <div className="player">
            <div className="bgp" style={{ position: 'absolute', inset: 0, opacity: 0.8 }}><WorkshopArt w={w} /></div>
            <button type="button" className="btn btn-primary" onClick={() => setPlaying((p) => !p)} style={{ position: 'relative', borderRadius: '50%', width: 60, height: 60, padding: 0 }} aria-label={`${playing ? 'Pause' : 'Play'} lesson`}>
              {playing
                ? <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
                : <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>}
            </button>
            <div className="ctrl">
              <span style={{ fontWeight: 600, fontSize: '.9rem' }}>{access.lessons[cur].title}</span>
              <div className="prog" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}><i style={{ width: `${pct}%` }} /></div>
            </div>
          </div>
          <div className="panel glass" style={{ marginTop: 18 }}>
            <h1 style={{ fontSize: '1.2rem' }}>{w.title}</h1>
            <p className="muted" style={{ marginTop: 6 }}>Instructor: {w.instructor.name}</p>
          </div>
        </div>
        <aside className="aside">
          <div className="panel glass">
            <h2 style={{ fontSize: '1rem', marginBottom: 10 }}>Modules</h2>
            <ul className="lessons">
              {access.lessons.map((l, i) => (
                <li key={l.id}><button type="button" onClick={() => pick(i)} aria-current={i === cur ? 'true' : undefined}><span>{l.title}</span><span className="muted">{l.mins} min</span></button></li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ====================================================================
   3D BACKGROUND
   ==================================================================== */

function loadThree() {
  return new Promise((resolve, reject) => {
    if (window.THREE) return resolve(window.THREE);
    let s = document.querySelector('script[data-wk-three]');
    if (!s) {
      s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.async = true; s.dataset.wkThree = '1';
      document.head.appendChild(s);
    }
    s.addEventListener('load', () => resolve(window.THREE));
    s.addEventListener('error', reject);
  });
}

/** 3D background (three.js loaded from CDN, so no new npm dependency). Page works without WebGL. */
function Bg3D({ strong }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0, disposed = false, cleanup = () => {};
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    loadThree().then((THREE) => {
      if (disposed || !ref.current || !THREE) return;
      const canvas = ref.current;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100); camera.position.set(0, 0, 10);
      const ec = document.createElement('canvas'); ec.width = 1024; ec.height = 512;
      const g = ec.getContext('2d');
      const gr = g.createLinearGradient(0, 0, 0, 512);
      gr.addColorStop(0, '#fff0e0'); gr.addColorStop(0.45, '#8a4a22'); gr.addColorStop(1, '#140a04');
      g.fillStyle = gr; g.fillRect(0, 0, 1024, 512);
      [[120, 70, 220, 90, '#ffffff'], [560, 40, 260, 70, '#ffe9b8'], [860, 120, 120, 160, '#b8f0cf'], [330, 200, 90, 130, '#ffc49a'], [700, 230, 180, 40, '#ffe2c4']]
        .forEach(([x, y, w, h, c]) => { g.fillStyle = c; g.globalAlpha = 0.95; g.fillRect(x, y, w, h); });
      g.globalAlpha = 1;
      const et = new THREE.CanvasTexture(ec); et.mapping = THREE.EquirectangularReflectionMapping; et.encoding = THREE.sRGBEncoding;
      const pm = new THREE.PMREMGenerator(renderer);
      const envTex = pm.fromEquirectangular(et).texture; scene.environment = envTex; et.dispose(); pm.dispose();
      const group = new THREE.Group(); scene.add(group);
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.25, 0.4, 160, 28, 2, 3),
        new THREE.MeshPhysicalMaterial({ color: 0xf97316, metalness: 1, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 1.35 }));
      group.add(knot);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.035, 24, 200), new THREE.MeshStandardMaterial({ color: 0xffb25e, metalness: 1, roughness: 0.25, envMapIntensity: 1.5 }));
      ring.rotation.x = 1.2; group.add(ring);
      const ring2 = ring.clone(); ring2.scale.setScalar(1.25); ring2.rotation.set(0.4, 0.6, 0); group.add(ring2);
      const orbs = [
        { r: 0.34, c: 0x00bf63, m: 1, ro: 0.2, op: 1, a: 3.1, s: 0.7, y: 0.4 },
        { r: 0.46, c: 0xffffff, m: 0, ro: 0, op: 0.34, a: 3.6, s: -0.5, y: -0.5 },
        { r: 0.26, c: 0xffb27a, m: 0.9, ro: 0.18, op: 1, a: 2.7, s: 0.9, y: 0.8 },
      ].map((o) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(o.r, 32, 32), new THREE.MeshPhysicalMaterial({ color: o.c, metalness: o.m, roughness: o.ro, transparent: o.op < 1, opacity: o.op, clearcoat: 1, envMapIntensity: 2.2 }));
        m.userData = o; group.add(m); return m;
      });
      const N = 220, pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const r = 4 + Math.random() * 9, th = Math.random() * 6.283, ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7; pos[i * 3 + 2] = r * Math.cos(ph) - 3;
      }
      const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xffb27a, size: 0.035, transparent: true, opacity: 0.7, sizeAttenuation: true, depthWrite: false }));
      scene.add(pts);
      const l1 = new THREE.PointLight(0xff7a1f, 22, 30); l1.position.set(-4, 3, 4); scene.add(l1);
      const l2 = new THREE.PointLight(0x2ad483, 14, 30); l2.position.set(4, -2, 5); scene.add(l2);
      scene.add(new THREE.AmbientLight(0xffffff, 0.3));
      let mx = 0, my = 0, W = 0;
      const baseY = () => (window.innerWidth > 900 ? 0 : 2.6);
      const size = () => {
        W = window.innerWidth; renderer.setSize(W, window.innerHeight, false);
        camera.aspect = W / window.innerHeight; camera.updateProjectionMatrix();
        const wide = W > 900; group.position.set(wide ? 3.1 : 0, baseY(), 0); group.scale.setScalar(wide ? 0.9 : 0.5);
      };
      const onMove = (e) => { mx = e.clientX / W - 0.5; my = e.clientY / window.innerHeight - 0.5; };
      const clock = new THREE.Clock();
      const frame = (t) => {
        const sy = window.scrollY || 0;
        knot.rotation.set(t * 0.22 + my * 0.9, t * 0.3 + mx * 1.2 + sy * 0.0016, 0);
        ring.rotation.z = t * 0.25; ring2.rotation.y = t * 0.18;
        orbs.forEach((o, i) => { const d = o.userData, a = t * d.s + i * 2.1; o.position.set(Math.cos(a) * d.a, Math.sin(a * 1.3) * d.y + d.y * 0.4, Math.sin(a) * d.a * 0.8); });
        pts.rotation.y = t * 0.02 + mx * 0.15; pts.position.y = sy * 0.0009;
        l1.position.x = -4 + Math.sin(t * 0.6) * 3; l2.position.y = -2 + Math.cos(t * 0.5) * 3;
        group.position.y += (baseY() + sy * 0.0007 - group.position.y) * 0.08;
        camera.position.x += (mx * 0.6 - camera.position.x) * 0.05; camera.position.y += (-my * 0.4 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0); renderer.render(scene, camera);
      };
      size();
      const onResize = () => { size(); if (reduce) frame(1.5); };
      window.addEventListener('resize', onResize); window.addEventListener('pointermove', onMove, { passive: true });
      if (reduce) frame(1.5);
      else { let lastT = 0; const loop = (now) => { raf = requestAnimationFrame(loop); if (document.hidden || now - lastT < 33) return; lastT = now; frame(clock.getElapsedTime()); }; loop(performance.now()); } // capped at ~30fps
      cleanup = () => {
        window.removeEventListener('resize', onResize); window.removeEventListener('pointermove', onMove);
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
        envTex.dispose(); renderer.dispose();
      };
    }).catch(() => { if (ref.current) ref.current.style.display = 'none'; }); // no WebGL or CDN blocked: page still works
    return () => { disposed = true; cancelAnimationFrame(raf); cleanup(); };
  }, []);
  return <canvas ref={ref} className="bg3d" aria-hidden="true" style={{ opacity: strong ? 0.9 : 0.35 }} />;
}

/* ---------------------------------------------------------------------
   ROOT
   --------------------------------------------------------------------- */
const TITLES = {
  workshops: ['Explore Workshops | ILM ORA', 'Browse live and on-demand workshops in AI, development, design, marketing, business and leadership. Search, filter and register in minutes.'],
  dashboard: ['My learning | ILM ORA', 'Your registered workshops, join links and recordings.'],
  login: ['Sign in | ILM ORA', 'Sign in or create your ILM ORA account to register for workshops.'],
  register: ['Register for a workshop | ILM ORA', ''],
  confirmation: ['You are registered | ILM ORA', ''],
  watch: ['Watch workshop | ILM ORA', ''],
};

/** #/login?next=... aate hi site ka login popup kholta hai (in-page form nahi). */
function LoginRoute() {
  const { user, ready, requireLogin } = useApp();
  const sp = useSearchParams();
  const next = safeNext(sp.get('next'));
  useEffect(() => {
    if (!ready) return;
    if (user) { replaceRoute(next); return; }
    const m = /^\/(?:register|confirmation|watch)\/([^/?#]+)/.exec(next);
    requireLogin(next, m ? `/workshops/${m[1]}` : '/workshops');
  }, [ready, user, next, requireLogin]);
  return null;
}

function Screen({ route }) {
  const [a, slug] = route.parts;
  if (a === 'workshops' && slug) return <WorkshopDetail slug={slug} />;
  if (a === 'register' && slug) return <RegisterFlow slug={slug} />;
  if (a === 'confirmation' && slug) return <Confirmation slug={slug} />;
  if (a === 'watch' && slug) return <WatchPlayer slug={slug} />;
  if (a === 'dashboard') return <Dashboard />;
  if (a === 'login') return <LoginRoute />;
  if (!a || a === 'workshops') return <WorkshopsList />;
  return <StateBox title="We could not find that page" text="The link may be old or mistyped."><LinkBtn href="/workshops">Browse workshops</LinkBtn></StateBox>;
}

function WorkshopsApp({ openLogin }) {
  const route = useHashRoute();
  const mainRef = useRef(null);
  const key = route.parts.join('/');
  const first = route.parts[0] || 'workshops';

  useEffect(() => {
    const t = TITLES[first] || TITLES.workshops;
    if (!(first === 'workshops' && route.parts[1])) setPageMeta(t[0], t[1]); // detail page sets its own title
    window.scrollTo({ top: 0 });
    mainRef.current && mainRef.current.focus({ preventScroll: true });
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RouteCtx.Provider value={route}>
      <div className="wk">
        <style dangerouslySetInnerHTML={{ __html: WK_CSS }} />
                <AppProviders openLogin={openLogin}>
          <div className="bgclip"><Bg3D strong={key === 'workshops' || key === ''} /></div>
          <div className="wk-main" id="wk-main" tabIndex={-1} ref={mainRef}>
            {CONFIG.USE_MOCK && <div className="notice" role="note">Preview mode: sample workshops, sign-in and payment are simulated.</div>}
            <Screen route={route} />
          </div>
        </AppProviders>
      </div>
    </RouteCtx.Provider>
  );
}

/**
 * Full page: PublicLayout (Navbar + Footer) + .ilm theme wrapper + the workshops app.
 * Props come from your router/page exactly like Ilmora-Microsoft / StudyAbroad / Careers.
 * If a prop is not passed (e.g. client.jsx renders <IlmoraWorkshops /> with none), the page falls back
 * to its own theme state so it still works. Pass `embedded` to render only the content.
 */
export default function IlmoraWorkshops({ theme: themeProp, toggleTheme: toggleProp, setShowLoginModal, scrollToSection, embedded = false }) {
  const [localTheme, setLocalTheme] = useState('light');
  useEffect(() => {
    try { const t = window.localStorage.getItem('theme') || window.localStorage.getItem('ilmora-theme'); if (t) setLocalTheme(t); } catch {}
  }, []);
  const theme = themeProp ?? localTheme;
  const toggleTheme = toggleProp ?? (() => {
    const n = localTheme === 'dark' ? 'light' : 'dark';
    setLocalTheme(n);
    try { window.localStorage.setItem('theme', n); } catch {}
  });
  const openLogin = setShowLoginModal ?? (() => { window.location.href = '/ilm-demo'; });
  const scrollTo = scrollToSection ?? ((id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

    if (embedded) return <WorkshopsApp openLogin={openLogin} />;
  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={openLogin} scrollToSection={scrollTo}>
      <style dangerouslySetInnerHTML={{ __html: HOST_CSS }} />
            <div className={"ilm" + (theme === "dark" ? " dark" : "")}>
        <WorkshopsApp openLogin={openLogin} />
      </div>
    </PublicLayout>
  );
}