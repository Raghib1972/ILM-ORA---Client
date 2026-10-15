// "use client";
// /**
//  * ILM ORA Cisco Certifications: one self-contained page component (same pattern as Ilmora-workshops.jsx).
//  *
//  *   src/legacy-pages/Landing/Ilmora-cisco.jsx       (this file)
//  *   app/(public)/Ilmora-cisco/client.jsx            renders <IlmoraCisco {...props} />
//  *   app/(public)/Ilmora-cisco/page.jsx              metadata + <Client />
//  *
//  * The page is wrapped in <PublicLayout> (shared Navbar + Footer) and in the .ilm theme wrapper, so light/dark
//  * mode follows the site. Inside the page, navigation uses the URL hash, so no extra Next.js routes are needed:
//  *   #/  #/how  #/certs  #/courses  #/exams  #/paths  #/partner          public pages
//  *   #/cert/<key>  #/exam/<id>  #/course/<key>  #/track/<slug>           detail pages
//  *   #/login  #/signup  #/dashboard  #/learn/<key>                       account + learning
//  *   #/checkout/<course|exam>/<key>  #/schedule/<key>  #/certificate/<id>
//  * Data: Cisco "Current Exams" list + cisco.xlsx data sheet. Accounts, orders and bookings are stored in
//  * localStorage (demo). Payment is simulated. Replace the demo parts in AppProviders with the real ILM ORA API.
//  * All styles are scoped under .cc, so no other page is affected.
//  */
// import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

// // Same shared shell (AnnouncementBanner, Navbar, Footer) used by Ilmora-Microsoft, Ilmora-workshops etc.
// import PublicLayout from "../Landing/components/PublicLayout";

// const CC_CSS = `.cc{--bg:var(--cream,#f6ede6);--solid:var(--card,#ffffff);--text:var(--tx,#1f1b18);--muted:var(--mut,#6a5f57);--ln:var(--line,#e7d9cd);--brand:var(--or,#f97316);--shadow:0 8px 22px rgba(60,35,10,.12);--pad:clamp(16px,4vw,28px);
//   position:relative;isolation:isolate;background:var(--solid);color:var(--text);font-family:inherit;font-size:15px;line-height:1.55;overflow-x:clip;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;text-size-adjust:100%}
// .cc *,.cc *::before,.cc *::after{box-sizing:border-box}
// .cc h1,.cc h2,.cc h3,.cc h4,.cc p,.cc ul,.cc ol{margin:0}
// .cc ul,.cc ol{padding:0}
// .cc a{color:inherit;text-decoration:none}
// .cc button,.cc input,.cc select{font:inherit;color:inherit}
// .cc button{cursor:pointer}
// .cc :focus-visible{outline:3px solid #2563eb;outline-offset:2px;border-radius:6px}
// .cc .sr{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
// .cc .wrap{width:100%;max-width:var(--w,1200px);margin:0 auto;padding:clamp(28px,5vw,56px) var(--pad)}
// .cc .wrap.t{padding-top:0}
// .cc .wrap.narrow{max-width:680px}
// .cc h1,.cc h2,.cc h3,.cc h4{overflow-wrap:break-word;word-break:normal;hyphens:auto}
// .cc h2{font-size:clamp(1.45rem,3.4vw,2.3rem);letter-spacing:-.02em;line-height:1.12;margin-bottom:10px}
// .cc .h3{font-size:clamp(1.15rem,2.4vw,1.45rem);margin:clamp(24px,4vw,36px) 0 14px}
// .cc .lead{color:var(--muted);max-width:68ch;margin-bottom:clamp(18px,3vw,30px);font-size:clamp(.92rem,1.6vw,1.02rem)}
// .cc .s{font-size:.82rem;color:var(--muted)}
// /* nav strip */
// .cc .tabbar{background:#2a2a2a;color:#fff}
// .cc .tabbar .wrap{padding-block:0;display:flex;align-items:center;gap:12px}
// .cc .tabs{flex:1;min-width:0;display:flex;gap:clamp(2px,1.5vw,18px);overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;scroll-snap-type:x proximity;overscroll-behavior-x:contain}
// .cc .tabs::-webkit-scrollbar{display:none}
// .cc .tabs a{flex:none;display:flex;align-items:center;padding:0 clamp(8px,1.4vw,12px);min-height:50px;font-weight:600;font-size:clamp(.82rem,1.4vw,.95rem);color:#fff;border-bottom:3px solid transparent;white-space:nowrap;scroll-snap-align:start;margin-bottom:-1px}
// .cc .tabs a:hover{border-color:rgba(249,115,22,.55)}
// .cc .tabs a.on{border-color:var(--brand)}
// .cc .acct{flex:none;display:flex;gap:10px;align-items:center;white-space:nowrap}
// .cc .acct .gw{color:#fff;font-weight:600;font-size:.88rem;background:none;border:0;padding:8px 4px}
// .cc .acct .gw:hover{text-decoration:underline}
// .cc .subinfo{background:var(--solid);border-bottom:1px solid var(--ln)}
// .cc .subinfo .wrap{padding-block:12px;display:flex;flex-wrap:wrap;gap:4px 18px;align-items:center;font-size:clamp(.8rem,1.4vw,.92rem)}
// .cc .subinfo span{color:var(--muted)}
// /* buttons */
// .cc .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:2px solid transparent;border-radius:10px;padding:10px 20px;min-height:44px;font-weight:700;font-size:.95rem;text-align:center;line-height:1.2;transition:transform .18s,box-shadow .2s,filter .2s}
// .cc .btn:active{transform:scale(.97)}
// .cc .btn.primary{background:var(--brand);color:#fff;box-shadow:0 6px 16px color-mix(in srgb,var(--brand) 35%,transparent)}
// .cc .btn.primary:hover{filter:brightness(1.07)}
// .cc .btn.ghost{border-color:var(--text);background:transparent;color:var(--text)}
// .cc .btn.ghost:hover{background:var(--text);color:var(--solid)}
// .cc .btn[disabled]{opacity:.55;cursor:not-allowed}
// .cc .btn.sm{min-height:36px;padding:5px 12px;font-size:.82rem;border-radius:8px}
// .cc .btns{display:flex;gap:12px;flex-wrap:wrap}
// .cc .btns>*{flex:0 1 auto}
// @media(max-width:480px){.cc .btns>.btn{flex:1 1 100%}}
// /* hero */
// .cc .hero{background:var(--bg);overflow:hidden}
// .cc .hero .in{max-width:var(--w,1200px);margin:0 auto;padding:clamp(28px,6vw,64px) var(--pad) clamp(16px,4vw,40px);display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(8px,3vw,32px);align-items:center}
// .cc .big{font-size:clamp(2rem,6.2vw,3.9rem);line-height:1.06;letter-spacing:-.03em;font-weight:800;margin-bottom:0}
// .cc .hero p.lead{margin:clamp(14px,2.4vw,22px) 0 clamp(18px,3vw,28px);font-size:clamp(.95rem,1.8vw,1.12rem)}
// .cc .scene{--s:clamp(170px,30vw,300px);perspective:1400px;height:calc(var(--s)*1.8);display:flex;align-items:center;justify-content:center;touch-action:pan-y}
// .cc .stack{position:relative;width:var(--s);height:var(--s);transform-style:preserve-3d;transform:rotateX(58deg) rotateZ(-38deg);transition:transform .15s ease-out}
// .cc .layer{--z:calc(var(--s)*var(--k));position:absolute;inset:0;border-radius:calc(var(--s)*.09);border:2px solid var(--c);display:flex;align-items:flex-end;padding:clamp(10px,2.2vw,20px);background:linear-gradient(135deg,var(--solid),color-mix(in srgb,var(--c) 24%,var(--solid)));box-shadow:0 30px 50px -10px color-mix(in srgb,var(--c) 40%,transparent);animation:ccfl 5s ease-in-out infinite;animation-delay:var(--d)}
// .cc .layer .lt{display:block}
// .cc .layer b{display:block;font-size:clamp(.95rem,2.2vw,1.4rem);font-weight:800;line-height:1.1}
// .cc .layer small{display:block;font-size:clamp(.62rem,1.3vw,.8rem);color:var(--muted);font-weight:600}
// .cc .layer:hover{filter:saturate(1.5)}
// @keyframes ccfl{0%,100%{transform:translateZ(var(--z))}50%{transform:translateZ(calc(var(--z) + var(--s)*.09))}}
// @media(max-width:820px){.cc .hero .in{grid-template-columns:1fr}.cc .scene{--s:clamp(150px,44vw,250px)}}
// /* stats + grids */
// .cc .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:clamp(10px,2vw,16px)}
// .cc .stat{background:var(--bg);border-radius:16px;padding:clamp(16px,2.6vw,24px);transition:transform .3s}
// .cc .stat:hover{transform:translateY(-6px) rotateX(10deg)}
// .cc .stat b{display:block;font-size:clamp(1.7rem,4vw,2.5rem);line-height:1}
// .cc .stat span{color:var(--muted);font-size:.85rem}
// .cc .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr));gap:clamp(14px,2.2vw,22px);perspective:1200px}
// .cc .card{position:relative;min-width:0;display:block;background:var(--solid);border:1px solid var(--ln);border-radius:18px;padding:clamp(16px,2.2vw,20px) clamp(16px,2.2vw,20px) 18px clamp(20px,2.6vw,24px);overflow:hidden;transform-style:preserve-3d;transition:transform .15s ease-out,box-shadow .3s}
// .cc .card:hover{box-shadow:0 24px 40px -14px rgba(0,0,0,.28)}
// .cc .card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:var(--c)}
// .cc .card::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--mx,50%) var(--my,0),rgba(255,255,255,.35),transparent 55%);opacity:0;transition:opacity .3s}
// .cc .card:hover::after{opacity:1}
// .cc .card>*{position:relative}
// .cc .tag{display:inline-block;max-width:100%;font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:99px;background:color-mix(in srgb,var(--c) 15%,var(--solid));color:var(--c)}
// .cc .card h3{font-size:clamp(.98rem,1.6vw,1.08rem);line-height:1.3;margin:10px 0 4px}
// .cc .code{font-size:clamp(1.05rem,2vw,1.25rem);font-weight:800;margin-top:10px;color:var(--c);overflow-wrap:anywhere}
// .cc .meta{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:.74rem;color:var(--muted);border-top:1px solid var(--ln);padding-top:10px;margin-top:12px}
// .cc .meta b{display:block;color:var(--text);font-size:.88rem}
// .cc .empty{grid-column:1/-1;padding:36px 16px;text-align:center;color:var(--muted)}
// .cc .filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:clamp(16px,3vw,26px)}
// .cc .pill{border:2px solid var(--ln);background:var(--solid);border-radius:99px;padding:7px 16px;min-height:40px;font-weight:700;font-size:.85rem}
// .cc .pill.on{background:var(--text);border-color:var(--text);color:var(--solid)}
// .cc .in,.cc .filters input,.cc .filters select{background:var(--solid);border:2px solid var(--ln);border-radius:10px;padding:10px 14px;min-height:44px;font-size:16px;width:100%}
// .cc .filters input{flex:1 1 220px;min-width:0}
// .cc .filters select{flex:0 1 220px;width:auto;max-width:100%}
// .cc .in:focus,.cc .filters input:focus,.cc .filters select:focus{border-color:var(--brand);outline:3px solid color-mix(in srgb,var(--brand) 35%,transparent)}
// .cc .crumb{font-size:.84rem;margin-bottom:16px;color:var(--muted)}
// .cc .crumb a{text-decoration:underline}
// .cc .band{background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 55%,#000));color:#fff;overflow:hidden}
// .cc .band .in2{max-width:var(--w,1200px);margin:0 auto;padding:clamp(26px,5vw,46px) var(--pad) clamp(30px,6vw,54px)}
// .cc .band h1{font-size:clamp(1.55rem,4.6vw,2.9rem);line-height:1.12;letter-spacing:-.02em;max-width:24ch;margin-top:12px}
// .cc .band .tag{background:rgba(255,255,255,.2);color:#fff}
// .cc .band .crumb{color:rgba(255,255,255,.85)}
// .cc .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:14px;margin-bottom:clamp(24px,4vw,40px)}
// .cc .fact{background:var(--bg);border-radius:14px;padding:14px 18px;transition:transform .3s;min-width:0}
// .cc .fact:hover{transform:perspective(600px) rotateY(-8deg) translateY(-4px)}
// .cc .fact span{display:block;font-size:.72rem;font-weight:700;color:var(--muted)}
// .cc .fact b{font-size:.98rem;overflow-wrap:anywhere}
// .cc .note{background:color-mix(in srgb,#f59e0b 14%,var(--solid));border:1px solid color-mix(in srgb,#f59e0b 45%,var(--solid));border-radius:12px;padding:12px 16px;font-size:.88rem;margin-bottom:24px}
// .cc .steps{display:flex;gap:20px;perspective:1000px;overflow-x:auto;padding:16px 6px 30px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
// .cc .step{flex:0 0 min(76vw,250px);border-radius:16px;padding:18px;background:var(--solid);border:2px solid var(--c);transform:rotateY(-14deg);transform-origin:left;transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s;box-shadow:12px 14px 0 -2px color-mix(in srgb,var(--c) 25%,var(--solid));position:relative;display:block}
// .cc .step:hover{transform:rotateY(0) translateY(-10px);box-shadow:0 26px 36px -12px rgba(0,0,0,.3)}
// .cc .step:not(:last-child)::after{content:"";position:absolute;right:-22px;top:50%;width:22px;height:3px;background:var(--ln)}
// .cc .step h4{font-size:.98rem;margin:8px 0 4px;line-height:1.3}
// .cc .step p{font-size:.82rem;color:var(--muted)}
// .cc .pn{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;margin-top:40px}
// /* forms */
// .cc .form{display:grid;gap:16px}
// .cc .fld{display:grid;gap:6px}
// .cc .fld label{font-weight:700;font-size:.86rem}
// .cc .two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
// @media(max-width:520px){.cc .two{grid-template-columns:1fr}}
// .cc .chk{display:flex;gap:10px;align-items:flex-start;font-size:.88rem}
// .cc .chk input{margin-top:3px;width:18px;height:18px;flex:none;accent-color:var(--brand)}
// .cc .err{color:#c42c49;font-weight:600;font-size:.82rem;min-height:1.2em}
// .cc .tabs2{display:flex;background:var(--bg);border-radius:99px;padding:4px;margin-bottom:18px}
// .cc .tabs2 a{flex:1;text-align:center;padding:9px;border-radius:99px;font-weight:700;font-size:.9rem;color:var(--muted)}
// .cc .tabs2 a.on{background:var(--brand);color:#fff}
// .cc .co{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:clamp(20px,4vw,30px);align-items:start}
// .cc .sum{background:var(--bg);border-radius:18px;padding:clamp(18px,3vw,24px);transform:perspective(900px) rotateY(-6deg);transition:transform .4s}
// .cc .sum:hover{transform:none}
// .cc .big2{display:block;font-size:clamp(1.9rem,5vw,2.5rem);margin:6px 0;font-weight:800}
// @media(min-width:900px){.cc .sum{position:sticky;top:110px}}
// @media(max-width:899px){.cc .co{grid-template-columns:1fr}.cc .sum{order:-1;transform:none}}
// .cc .mods{padding-left:22px;display:grid;gap:10px;max-width:760px}
// .cc .prog{height:14px;background:var(--ln);border-radius:99px;overflow:hidden}
// .cc .prog i{display:block;height:100%;background:linear-gradient(90deg,#1fa463,#2563eb);transition:width .6s}
// .cc .mlist{display:grid;gap:10px;max-width:760px}
// .cc .mod{display:flex;gap:12px;align-items:center;border:2px solid var(--ln);border-radius:12px;padding:14px 16px;min-height:52px;transition:transform .3s,background .3s;cursor:pointer}
// .cc .mod:hover{transform:perspective(700px) rotateX(4deg) translateY(-2px)}
// .cc .mod.on{background:color-mix(in srgb,#1fa463 14%,var(--solid));border-color:#1fa463}
// .cc .mod input{width:20px;height:20px;flex:none}
// .cc .mod span{min-width:0;overflow-wrap:anywhere}
// .cc .row{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;align-items:center;border:1px solid var(--ln);border-radius:14px;padding:16px 18px;margin-bottom:12px}
// .cc .row>div:first-child{min-width:0;flex:1 1 240px;overflow-wrap:anywhere}
// .cc .row .btns{gap:8px;align-items:center}
// .cc .st{font-weight:700;font-size:.78rem;padding:3px 10px;border-radius:99px;background:color-mix(in srgb,#2563eb 16%,var(--solid))}
// .cc .certscene{perspective:1200px;display:flex;justify-content:center;padding:clamp(14px,3vw,30px) 0}
// .cc .cert3d{width:min(680px,100%);min-height:clamp(280px,56vw,420px);border:clamp(5px,1.2vw,10px) double var(--c);border-radius:18px;padding:clamp(16px,4vw,30px);text-align:center;background:linear-gradient(135deg,var(--solid),var(--bg));box-shadow:0 40px 60px -20px rgba(0,0,0,.35);transition:transform .15s;display:flex;flex-direction:column;justify-content:center;gap:8px}
// .cc .cert3d h2{font-size:clamp(1.3rem,4.4vw,2.1rem);margin:0}
// .cc .cert3d h3{font-size:clamp(1.05rem,3vw,1.5rem);margin:0}
// .cc .seal{width:clamp(44px,9vw,60px);height:clamp(44px,9vw,60px);border-radius:50%;background:var(--c);color:#fff;display:grid;place-items:center;font-size:1.5rem;margin:0 auto}
// .cc .toasts{position:fixed;left:50%;transform:translateX(-50%);bottom:max(16px,env(safe-area-inset-bottom));z-index:90;display:grid;gap:8px;width:min(92vw,420px)}
// .cc .toast{background:#2a2a2a;color:#fff;padding:12px 18px;border-radius:12px;font-weight:600;font-size:.9rem;box-shadow:var(--shadow);animation:ccin .3s}
// @keyframes ccin{from{opacity:0;transform:translateY(10px)}}
// .cc .skel{border-radius:16px;height:240px;background:linear-gradient(100deg,var(--bg) 30%,color-mix(in srgb,var(--brand) 12%,var(--bg)) 50%,var(--bg) 70%);background-size:300% 100%;animation:ccsh 1.3s infinite linear}
// @keyframes ccsh{to{background-position:-100% 0}}
// .cc .cc-main{outline:none;animation:ccpg .5s cubic-bezier(.2,.8,.2,1);min-height:60vh}
// @keyframes ccpg{from{opacity:0;transform:perspective(1200px) rotateX(-5deg) translateY(12px)}to{opacity:1;transform:none}}
// @media(pointer:coarse){.cc .card:hover,.cc .stat:hover,.cc .fact:hover,.cc .mod:hover{transform:none}}
// @media(max-width:380px){.cc{font-size:14px}.cc .tabs a{padding:0 8px}}
// @media(min-width:1600px){.cc{--w:1360px}}
// @media(prefers-reduced-motion:reduce){.cc *,.cc *::before,.cc *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}.cc .step{transform:none}.cc .layer{animation:none;transform:translateZ(var(--z))}}
// @media print{body *{visibility:hidden}.cc .certscene,.cc .certscene *{visibility:visible}.cc .certscene{position:absolute;left:0;top:0;width:100%}.cc .cert3d{box-shadow:none;transform:none!important}}
// `;

// /** Theme + font variables, identical to the other Ilmora-* pages. */
// const HOST_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// .ilm{--cream:#f6ede6;--white:#ffffff;--card:#ffffff;--tx:#1f1b18;--tx2:#3b332d;--mut:#6a5f57;--or:#f97316;--ord:#c2410c;--line:#e7d9cd;--w:1200px;background:var(--white);color:var(--tx);font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;overflow-x:hidden;line-height:1.55}
// .ilm *{box-sizing:border-box}
// .ilm button{font-family:inherit;cursor:pointer}
// .ilm.dark{--cream:#0c0c14;--white:#0f0f18;--card:#13131e;--tx:#f1f5f9;--tx2:#cbd5e1;--mut:#94a3b8;--line:rgba(255,255,255,.1)}
// @media(min-width:1600px){.ilm{--w:1360px}}`;

// /* ====================================================================
//    DATA
//    ==================================================================== */
// const L={Entry:"#1fa463",Associate:"#f26b21",Professional:"#2563eb",Expert:"#8b3fd9",Specialist:"#0e8f9c"};
// const LV=Object.keys(L);
// const E="English",EJ="English, Japanese",ST="English, Arabic, Chinese, Spanish, French, Japanese, Portuguese";

// /* certifications: key, name, level, track, data-sheet row (or -1) */
// const CERTS=[
// ["aitech","Cisco AI Technical Practitioner (AITECH)","Specialist","AI",-1],
// ["caapa","Cisco AppDynamics Associate Performance Analyst","Associate","AppDynamics",-1],
// ["caaa","Cisco AppDynamics Associate Administrator","Associate","AppDynamics",-1],
// ["capi","Cisco AppDynamics Professional Implementer","Professional","AppDynamics",-1],
// ["ccnaauto","CCNA Automation","Associate","Automation",5],
// ["ccnpauto","CCNP Automation","Professional","Automation",11],
// ["cciauto","CCIE Automation","Expert","Automation",16],
// ["ccnpcol","CCNP Collaboration","Professional","Collaboration",10],
// ["cciecol","CCIE Collaboration","Expert","Collaboration",15],
// ["ccnacyb","CCNA Cybersecurity","Associate","Cybersecurity",4],
// ["ccnpcyb","CCNP Cybersecurity","Professional","Cybersecurity",-1],
// ["ccnpdc","CCNP Data Center","Professional","Data Center",7],
// ["ccied","CCIE Data Center","Expert","Data Center",14],
// ["ccde","CCDE","Expert","Design",-1],
// ["ccna","CCNA","Associate","Enterprise",3],
// ["ccnpent","CCNP Enterprise","Professional","Enterprise",6],
// ["ccieei","CCIE Enterprise Infrastructure","Expert","Enterprise",12],
// ["ft","Cisco Certified Field Technician","Specialist","Field Technician",-1],
// ["meraki","Cisco Meraki Solutions Specialist","Specialist","Meraki",-1],
// ["ccnpsec","CCNP Security","Professional","Security",8],
// ["cciesec","CCIE Security","Expert","Security",13],
// ["ccnpsp","CCNP Service Provider","Professional","Service Provider",9],
// ["cciesp","CCIE Service Provider","Expert","Service Provider",-1],
// ["ccst1","Cisco Certified Support Technician (CCST) IT Support","Entry","Support Technician",0],
// ["ccst2","Cisco Certified Support Technician (CCST) Networking","Entry","Support Technician",1],
// ["ccst3","Cisco Certified Support Technician (CCST) Cybersecurity","Entry","Support Technician",2],
// ["ccnpwl","CCNP Wireless","Professional","Wireless",-1],
// ["cciewl","CCIE Wireless","Expert","Wireless",-1]
// ].map(r=>({k:r[0],name:r[1],lvl:r[2],track:r[3],xi:r[4]}));
// const CK=Object.fromEntries(CERTS.map(c=>[c.k,c]));

// /* data sheet rows: fee, duration, validity, eligibility, experience, role, technologies */
// const D=[
// [125,"50 Minutes","3 Years","No prerequisites","None","IT Support Technician","Computer Hardware, Windows, Networking Basics","CCST IT Support"],
// [125,"50 Minutes","3 Years","No prerequisites","None","Network Support Technician","TCP/IP, Routing, Switching, IPv4, IPv6","CCST Networking"],
// [125,"50 Minutes","3 Years","No prerequisites","None","Cybersecurity Support Technician","Security Fundamentals, Network Security","CCST Cybersecurity"],
// [300,"120 Minutes","3 Years","No prerequisites","1 Year Networking Recommended","Network Engineer","Routing, Switching, IPv4, IPv6, WLAN, Automation","Cisco Certified Network Associate"],
// [300,"120 Minutes","3 Years","No prerequisites","1 Year Security Recommended","SOC Analyst","SIEM, Incident Response, Threat Analysis","Cisco Certified CyberOps Associate"],
// [300,"120 Minutes","3 Years","Programming Basics","1 Year Software/Network Experience","Network Automation Engineer","Python, REST API, Docker, Cisco APIs","Cisco Certified DevNet Associate"],
// [700,"120 Minutes Each","3 Years","CCNA Recommended","3–5 Years Enterprise Networking","Enterprise Network Engineer","Enterprise Routing, SD-WAN, Wireless","Cisco Certified Network Professional Enterprise"],
// [700,"120 Minutes Each","3 Years","CCNA Recommended","3–5 Years Data Center Experience","Data Center Engineer","Nexus, UCS, Storage, ACI","Cisco Certified Network Professional Data Center"],
// [700,"120 Minutes Each","3 Years","CCNA Recommended","3–5 Years Security Experience","Security Engineer","Cisco ISE, Firepower, VPN, Zero Trust","Cisco Certified Network Professional Security"],
// [700,"120 Minutes Each","3 Years","CCNA Recommended","3–5 Years ISP Experience","Service Provider Engineer","MPLS, BGP, Segment Routing","Cisco Certified Network Professional Service Provider"],
// [700,"120 Minutes Each","3 Years","CCNA Recommended","3–5 Years Collaboration Experience","Collaboration Engineer","Webex, CUCM, VoIP","Cisco Certified Network Professional Collaboration"],
// [700,"120 Minutes Each","3 Years","DevNet Associate Recommended","3–5 Years Automation Experience","DevOps / Automation Engineer","Python, APIs, Kubernetes, CI/CD","Cisco Certified DevNet Professional"],
// ["$1,600+","Lab 8 Hours","3 Years","CCNP-Level Knowledge","5+ Years Enterprise Networking","Network Architect","Enterprise Networking, SD-WAN, Automation","Cisco Certified Internetwork Expert Enterprise Infrastructure"],
// ["$1,600+","Lab 8 Hours","3 Years","CCNP-Level Knowledge","5+ Years Security Experience","Security Architect","Firepower, ISE, VPN, Zero Trust","Cisco Certified Internetwork Expert Security"],
// ["$1,600+","Lab 8 Hours","3 Years","CCNP-Level Knowledge","5+ Years Data Center Experience","Data Center Architect","Nexus, ACI, UCS","Cisco Certified Internetwork Expert Data Center"],
// ["$1,600+","Lab 8 Hours","3 Years","CCNP-Level Knowledge","5+ Years Collaboration Experience","Collaboration Architect","CUCM, Webex, VoIP","Cisco Certified Internetwork Expert Collaboration"],
// ["$1,600+","Lab 8 Hours","3 Years","DevNet Professional Recommended","5+ Years Automation Experience","Automation Architect","Python, APIs, Kubernetes, Cisco Platforms","Cisco Certified DevNet Expert"]
// ];

// /* career exams: track, code, name, certs, languages */
// const EX=[];
// const x=(t,c,n,k,l=E)=>EX.push({t,code:c,name:n,k:k.split(","),l,id:(c||n).toLowerCase().replace(/[^a-z0-9]+/g,"-")});
// x("AI","810-110 AITECH","Cisco AI Technical Practitioner","aitech");
// x("AppDynamics","500-420 CAAPA","Cisco AppDynamics Associate Performance Analyst","caapa",EJ);
// x("AppDynamics","500-425 CAAA","Cisco AppDynamics Associate Administrator","caaa",EJ);
// x("AppDynamics","500-430 CAPI","Cisco AppDynamics Professional Implementer","capi",EJ);
// x("Automation","200-901 CCNAAUTO","Automating Networks Using Cisco Platforms","ccnaauto",EJ);
// x("Automation","350-901 AUTOCOR","Designing, Deploying and Managing Network Automation Systems","ccnpauto,cciauto");
// x("Automation","300-435 ENAUTO","Automating and Programming Cisco Enterprise Solutions","ccnpauto,ccnpent",EJ);
// x("Automation","300-635 DCNAUTO","Automating Cisco Data Center Networking Solutions","ccnpauto,ccnpdc");
// x("Automation","","CCIE Automation practical exam","cciauto");
// x("Collaboration","350-801 CLCOR","Implementing Cisco Collaboration Core Technologies","ccnpcol,cciecol");
// x("Collaboration","300-815 CLACC","Implementing Cisco Advanced Call Control On-Premises","ccnpcol");
// x("Collaboration","300-820 CLHCT","Implementing Cisco Collaboration Hybrid and Cloud Technologies","ccnpcol");
// x("Collaboration","300-830 CLCCE","Implementing Cisco Collaboration Cloud Customer Experience","ccnpcol");
// x("Collaboration","","CCIE Collaboration lab exam","cciecol");
// x("Cybersecurity","200-201 CCNACBR","Understanding Cisco Cybersecurity Operations Fundamentals","ccnacyb");
// x("Cybersecurity","350-201 CBRCOR","Performing Cybersecurity Using Cisco Security Technologies","ccnpcyb");
// x("Cybersecurity","300-215 CBRFIR","Conducting Forensic Analysis and Incident Response Using Cisco Technologies for Cybersecurity","ccnpcyb");
// x("Cybersecurity","300-220 CBRTHD","Conducting Threat Hunting and Defending using Cisco Technologies for Cybersecurity","ccnpcyb");
// x("Data Center","350-601 DCCOR","Implementing and Operating Cisco Data Center Core Technologies","ccnpdc,ccied");
// x("Data Center","300-610 DCID","Designing Cisco Data Center Infrastructure","ccnpdc");
// x("Data Center","300-615 DCIT","Troubleshooting Cisco Data Center Infrastructure","ccnpdc");
// x("Data Center","300-620 DCACI","Implementing Cisco Application Centric Infrastructure","ccnpdc");
// x("Data Center","300-640 DCAI","Implementing Cisco Data Center AI Infrastructure","ccnpdc");
// x("Data Center","","CCIE Data Center lab exam","ccied");
// x("Design","400-007 CCDE","CCDE written exam","ccde");
// x("Design","","CCDE practical exam","ccde");
// x("Enterprise","200-301 CCNA","Cisco Certified Network Associate","ccna",EJ);
// x("Enterprise","350-401 ENCOR","Implementing Cisco Enterprise Network Core Technologies","ccnpent,ccieei",EJ);
// x("Enterprise","300-410 ENARSI","Implementing Cisco Enterprise Advanced Routing and Services","ccnpent",EJ);
// x("Enterprise","300-415 ENSDWI","Implementing Cisco Catalyst SD-WAN Solutions","ccnpent",EJ);
// x("Enterprise","300-420 ENSLD","Designing Cisco Enterprise Networks","ccnpent",EJ);
// x("Enterprise","300-440 ENCC","Designing and Implementing Secure Cloud Connectivity","ccnpent",EJ);
// x("Enterprise","300-445 ENNA","Designing and Implementing Enterprise Network Assurance","ccnpent");
// x("Enterprise","","CCIE Enterprise Infrastructure lab exam","ccieei");
// x("Field Technician","800-150 FLDTEC","Supporting Cisco Devices for Field Technicians","ft",EJ);
// x("Meraki","500-220 ECMS","Engineering Cisco Meraki Solutions","meraki");
// x("Security","350-701 SCOR","Implementing and Operating Cisco Security Core Technologies","ccnpsec,cciesec",EJ);
// x("Security","300-710 SNCF","Securing Networks with Cisco Firewalls","ccnpsec",EJ);
// x("Security","300-715 SISE","Implementing and Configuring Cisco Identity Services Engine","ccnpsec",EJ);
// x("Security","300-740 SSCA","Designing and Implementing Secure Cloud Access for Users and Endpoints","ccnpsec");
// x("Security","300-745 SDSI","Designing Cisco Security Infrastructure","ccnpsec");
// x("Security","","CCIE Security lab exam","cciesec");
// x("Service Provider","350-501 SPCOR","Implementing and Operating Cisco Service Provider Network Core Technologies","ccnpsp,cciesp");
// x("Service Provider","300-510 SPRI","Implementing Cisco Service Provider Advanced Routing Solutions","ccnpsp");
// x("Service Provider","300-515 SPVI","Implementing Cisco Service Provider VPN Services","ccnpsp");
// x("Service Provider","300-540 SPCNI","Designing and Implementing Cisco Service Provider Cloud Network Infrastructure","ccnpsp");
// x("Service Provider","","CCIE Service Provider lab exam","cciesp");
// x("Support Technician","100-140 CCST IT Support","Cisco Certified Support Technician (CCST) IT Support","ccst1",ST);
// x("Support Technician","100-150 CCST Networking","Cisco Certified Support Technician (CCST) Networking","ccst2",ST);
// x("Support Technician","100-160 CCST Cybersecurity","Cisco Certified Support Technician (CCST) Cybersecurity","ccst3",ST);
// x("Wireless","350-101 WLCOR","Implementing and Operating Cisco Wireless Core Technologies","ccnpwl,cciewl");
// x("Wireless","","CCIE Wireless lab exam","cciewl");
// x("Wireless","300-110 WLSD","Designing Cisco Wireless Networks","ccnpwl");
// x("Wireless","300-120 WLSI","Implementing Cisco Wireless Advanced Solutions","ccnpwl");
// const EXM=Object.fromEntries(EX.map(e=>[e.id,e]));

// /* partner / channel exams */
// const PX=[["500-052 UCCXD","Deploying Cisco Unified Contact Center Express (UCCXD)",E],["500-210 CSPOFE","Cisco Service Provider Optical Technology Field Engineer Representative",E],["500-442 CCEA","Administering Cisco Contact Center Enterprise (CCEA)",E],["500-443 CCEAAR","Advanced Administration and Reporting of Contact Center Enterprise (CCEAAR)",E],["500-444 CCEIT","Cisco Contact Center Enterprise Implementation and Troubleshooting (CCEIT)",E],["500-445 CCECE","Implementing Cisco Contact Center Enterprise Chat and Email (CCECE)",E],["500-470 ENSDENG","Cisco Enterprise Networks SDA, SDWAN and ISE Exam for System Engineers (ENSDENG)",E],["500-490 ENSDESIGN","Designing Cisco Enterprise Networks for Field Engineers (ENDESIGN)",E],["500-560 OCSE","Cisco Networking: On-Premise and Cloud Solutions (OCSE)",EJ],["500-710 VII","Cisco Video Infrastructure Implementation (VII)",E],["700-150 ICS","Introduction to Cisco Sales (ICS)",EJ],["700-242 CESF","Cisco Environmental Sustainability Fundamentals – Stage 1 (CESF)",E],["700-246 CESPB","Cisco Environmental Sustainability Fundamentals – Stage 2 (CESPB)",E],["700-250 SMBS","Cisco Small and Medium Business Sales (SMBS)",EJ],["700-550 USFAP","Cisco US Federal Authorized Partner (USFAP)",E],["700-750 SMBE","Cisco Small and Medium Business Engineer (SMBE)",EJ],["700-805 CRM","Cisco Renewals Manager (CRM)",EJ],["700-821 IOTSE","Cisco IoT Essentials for System Engineers (IOTSE)",E],["700-826 IOTAM","Cisco IoT Essentials for Account Managers (IOTAM)",E],["700-841 IOTASE","Cisco IoT Advantage for System Engineers (IOTASE)",E],["700-846 IOTAAM","Cisco IoT Advantage for Account Managers (IOTAAM)",E],["700-905 CHXSE","Cisco HyperFlex for Systems Engineers (CHXSE)",E],["820-605 DTCSM","Cisco Customer Success Manager",E]]
// .map(r=>({code:r[0],name:r[1],l:r[2],id:"p-"+r[0].toLowerCase().replace(/[^a-z0-9]+/g,"-")}));
// const PXM=Object.fromEntries(PX.map(e=>[e.id,e]));
// const TRACKS=[...new Set(CERTS.map(c=>c.track))];
// const slug=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,"-");
// const fee=f=>typeof f=="number"?"$"+f:f;
// const short=n=>n.replace("Cisco Certified ","");

// /* paths: ordered certification keys */
// const PATHS=[["Enterprise networking",["ccst2","ccna","ccnpent","ccieei"]],["Cybersecurity operations",["ccst3","ccnacyb","ccnpcyb"]],["Network security",["ccna","ccnpsec","cciesec"]],["Automation",["ccnaauto","ccnpauto","cciauto"]],["Data center",["ccna","ccnpdc","ccied"]],["Collaboration",["ccna","ccnpcol","cciecol"]],["Service provider",["ccna","ccnpsp","cciesp"]],["Wireless",["ccna","ccnpwl","cciewl"]],["IT support",["ccst1","ccst2","ccna"]]];


// const PRICE={Entry:49,Associate:99,Professional:199,Expert:399,Specialist:99},HRS={Entry:20,Associate:40,Professional:60,Expert:120,Specialist:25};
// const SLOTS=["09:00","11:00","13:00","15:00","17:00"];
// const COUNTRIES=["India","Pakistan","United States","United Kingdom","United Arab Emirates","Saudi Arabia","Canada","Australia","Other"];
// const GOALS=["Start an IT career","Get a networking job","Move into security","Learn automation","Upgrade my current role"];
// const PROT=["dashboard","learn","checkout","schedule","certificate"];
// const NAV=[["home","/","Home"],["how","/how","How it works"],["certs","/certs","Certifications"],["courses","/courses","Training"],["exams","/exams","Exams"],["paths","/paths","Career Paths"],["partner","/partner","Partner Exams"]];
// const HOW=[["Create your account","Free. Use your name exactly as it appears on your ID.","/signup"],["Choose a certification","Compare levels, exams and fees, then pick the one for your job goal.","/certs"],["Take the training course","Study every module, then pass the practice test and final assessment.","/courses"],["Buy your exam voucher","Pay the exam fee from the certification page.","/certs"],["Schedule your exam","Choose test center or online, then a date and time.","/dashboard"],["Pass and get your certificate","Record your result and download your certificate.","/dashboard"]];
// const EMPTY={courses:{},vouchers:[],bookings:[],certs:[]};
// const TITLES={home:["Cisco Certifications | ILM ORA","Cisco certifications, exams, training courses, exam vouchers and booking in one place."],how:["How it works | ILM ORA Cisco","Six steps from a new account to a Cisco certification."],certs:["Cisco Certifications | ILM ORA","Browse all Cisco certifications by level and track."],courses:["Cisco Training Courses | ILM ORA","One training course for every Cisco certification."],exams:["Cisco Exams | ILM ORA","All current Cisco career exams with numbers, names and languages."],paths:["Cisco Career Paths | ILM ORA","The usual order of Cisco certifications for each track."],partner:["Cisco Partner Exams | ILM ORA","Channel, partner and other Cisco exams."],dashboard:["My learning | ILM ORA Cisco","Your courses, vouchers, exam bookings and certificates."],login:["Sign in | ILM ORA","Sign in to continue."],signup:["Create account | ILM ORA","Create your ILM ORA account."]};
// const mods=c=>{const d=D[c.xi];return [...EX.filter(e=>e.k.includes(c.k)).map(e=>"Prepare: "+(e.code?e.code+" – "+e.name:e.name)),d?"Skills lab: "+d[6]:"Hands-on skills lab","Full-length practice test","Final assessment"]};
// const need=c=>Math.min(EX.filter(e=>e.k.includes(c.k)).length,c.lvl==="Professional"||c.lvl==="Expert"?2:1);
// const uid=p=>p+Math.random().toString(36).slice(2,8).toUpperCase();
// const safeNext=(n,f="/dashboard")=>typeof n==="string"&&/^\/(?!\/)/.test(n)?n:f;
// const luhn=n=>{let s=0,d=false;for(let i=n.length-1;i>=0;i--){let x=+n[i];if(d){x*=2;if(x>9)x-=9}s+=x;d=!d}return s%10===0};
// const item=(t,k)=>{const c=CK[k];if(!c)return null;if(t==="course")return{title:short(c.name)+" training course",price:PRICE[c.lvl],back:"/course/"+k};
//  const d=D[c.xi];if(!d)return null;return{title:short(c.name)+" exam voucher",price:typeof d[0]==="number"?d[0]:1600,note:typeof d[0]==="number"?"":"Lab exam fees start at $1,600 in the data sheet.",back:"/cert/"+k}};

// /* ---------- storage + hash router (same pattern as Ilmora-workshops) ---------- */
// const mem={};
// const store={get(k,d){try{const v=window.localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch{return k in mem?mem[k]:d}},set(k,v){try{window.localStorage.setItem(k,JSON.stringify(v))}catch{mem[k]=v}}};
// async function sha(s){try{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}catch{return btoa(s)}}
// const RouteCtx=createContext({parts:[],query:new URLSearchParams(),raw:"/"});
// function parseHash(){const h=(typeof window!=="undefined"&&window.location.hash.slice(1))||"/";const[path,qs]=h.split("?");return{parts:path.split("/").filter(Boolean).map(x=>{try{return decodeURIComponent(x)}catch{return x}}),query:new URLSearchParams(qs||""),raw:h}}
// const go=p=>{window.location.hash=p};
// const replaceRoute=p=>{window.history.replaceState(null,"","#"+p);window.dispatchEvent(new Event("hashchange"))};
// function useHashRoute(){const[r,setR]=useState({parts:[],query:new URLSearchParams(),raw:"/"});useEffect(()=>{const on=()=>setR(parseHash());on();window.addEventListener("hashchange",on);return()=>window.removeEventListener("hashchange",on)},[]);return r}
// const LoginCtx=createContext({openLogin:()=>{},siteUser:null});
// const GUARDED=/^\/(checkout|schedule|dashboard|learn|certificate)(\/|$)/;
// function Link({href,children,onClick,...p}){
//  const app=useContext(Ctx),{openLogin}=useContext(LoginCtx);
//  const guard=e=>{if(onClick)onClick(e);if(GUARDED.test(href)&&app&&app.ready&&!app.user){e.preventDefault();openLogin()}};
//  return <a href={"#"+href} onClick={guard} {...p}>{children}</a>}
// function setPageMeta(title,desc){document.title=title;if(!desc)return;let m=document.querySelector('meta[name="description"]');if(!m){m=document.createElement("meta");m.name="description";document.head.appendChild(m)}m.content=desc}
// const usePageTitle=(t,d)=>useEffect(()=>{if(t)setPageMeta(t,d)},[t,d]);

// /* ---------- app state: accounts, orders, bookings, toasts ---------- */
// const Ctx=createContext(null);
// const useApp=()=>useContext(Ctx);
// function AppProviders({children}){
//  const[DB,setDB]=useState({users:{},session:null,data:{}});
//  const[ready,setReady]=useState(false);
//  const[toasts,setToasts]=useState([]);
//  const dbRef=useRef(DB);dbRef.current=DB;
//  useEffect(()=>{const d=store.get("ilm_cisco_db",null);if(d)setDB(d);setReady(true)},[]);
//  useEffect(()=>{if(ready)store.set("ilm_cisco_db",DB)},[DB,ready]);
//  const{siteUser}=useContext(LoginCtx);
//  useEffect(()=>{if(!ready||!siteUser||!siteUser.email)return;const m=siteUser.email.trim().toLowerCase();
//   setDB(d=>d.session===m&&d.users[m]?d:{...d,session:m,users:{...d.users,[m]:d.users[m]||{name:siteUser.name||m.split("@")[0],hash:"site",country:COUNTRIES[0],goal:GOALS[0]}}})},[ready,siteUser]);
//  useEffect(()=>{const on=e=>{if(e.key==="ilm_cisco_db"&&e.newValue){try{setDB(JSON.parse(e.newValue))}catch{}}};window.addEventListener("storage",on);return()=>window.removeEventListener("storage",on)},[]);
//  const toast=useCallback(m=>{const id=Date.now()+Math.random();setToasts(t=>[...t,{id,m}]);setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3800)},[]);
//  const user=DB.session?DB.users[DB.session]||null:null;
//  const M=(user&&DB.data[DB.session])||EMPTY;
//  const upd=useCallback(fn=>setDB(d=>{const n=JSON.parse(JSON.stringify(d));if(n.session&&!n.data[n.session])n.data[n.session]={courses:{},vouchers:[],bookings:[],certs:[]};fn(n,n.data[n.session]);return n}),[]);
//  const signup=useCallback(async f=>{const m=f.email.trim().toLowerCase();if(dbRef.current.users[m])throw new Error("This email already has an account. Sign in instead.");const hash=await sha(f.pass);setDB(d=>({...d,session:m,users:{...d.users,[m]:{name:f.name.trim(),hash,country:f.country,goal:f.goal}}}))},[]);
//  const login=useCallback(async f=>{const m=f.email.trim().toLowerCase(),u=dbRef.current.users[m];if(!u||u.hash!==await sha(f.pass))throw new Error("Email or password is wrong. Check both and try again.");setDB(d=>({...d,session:m}))},[]);
//  const logout=useCallback(()=>{setDB(d=>({...d,session:null}));toast("You are signed out.")},[toast]);
//  const value=useMemo(()=>({DB,user,M,ready,upd,toast,signup,login,logout,email:DB.session}),[DB,user,M,ready,upd,toast,signup,login,logout]);
//  return <Ctx.Provider value={value}>{children}<div className="toasts" role="status" aria-live="polite">{toasts.map(t=><div key={t.id} className="toast">{t.m}</div>)}</div></Ctx.Provider>;
// }
// const pr=(M,k)=>Math.round(((M.courses[k]||{done:[]}).done.length)/mods(CK[k]).length*100);

// /* ---------- small UI pieces ---------- */
// function Card({to,c,tilt=true,cls="card",children}){
//  const mv=e=>{if(e.pointerType!=="mouse")return;const el=e.currentTarget,r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;el.style.transform=`rotateY(${(x-.5)*14}deg) rotateX(${(.5-y)*14}deg)`;el.style.setProperty("--mx",x*100+"%");el.style.setProperty("--my",y*100+"%")};
//  return <Link href={to} className={cls} style={{"--c":c}} onPointerMove={tilt?mv:undefined} onPointerLeave={tilt?e=>{e.currentTarget.style.transform=""}:undefined}>{children}</Link>;
// }
// const Tag=({children})=><span className="tag">{children}</span>;
// const Fact=({a,b})=><div className="fact"><span>{a}</span><b>{b}</b></div>;
// const Grid=({children})=><div className="grid">{children}</div>;
// const Crumb=({items})=><nav className="crumb" aria-label="Breadcrumb">{items.map((it,i)=>i<items.length-1?<span key={i}><Link href={it[1]}>{it[0]}</Link> / </span>:<span key={i} aria-current="page">{it}</span>)}</nav>;
// const Band=({c,crumb,tag,h})=><div className="band" style={{"--c":c}}><div className="in2"><Crumb items={crumb}/><span className="tag">{tag}</span><h1>{h}</h1></div></div>;
// const Skeleton=()=><div className="wrap"><div className="skel"/></div>;
// const NotFound=()=><div className="wrap"><h2>Page not found</h2><p className="lead">This page does not exist.</p><Link href="/" className="btn ghost">Back to home</Link></div>;
// function Count({n}){const[v,setV]=useState(0);useEffect(()=>{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setV(n);return}let x=0;const id=setInterval(()=>{x+=n/35;if(x>=n){x=n;clearInterval(id)}setV(Math.round(x))},25);return()=>clearInterval(id)},[n]);return <b>{v}</b>}
// const Steps=({ks})=><div className="steps">{ks.map(k=>{const c=CK[k],d=D[c.xi];return <Card key={k} to={"/cert/"+k} c={L[c.lvl]} tilt={false} cls="step"><Tag>{c.lvl}</Tag><h4>{short(c.name)}</h4><p>{d?d[5]+" · "+fee(d[0]):c.track}</p></Card>})}</div>;
// const CertCard=({c})=>{const d=D[c.xi],n=EX.filter(e=>e.k.includes(c.k)).length;return <Card to={"/cert/"+c.k} c={L[c.lvl]}><Tag>{c.lvl}</Tag><h3>{short(c.name)}</h3><div className="s">{c.track}</div><div className="meta"><span>Exams<b>{n}</b></span><span>Fee<b>{d?fee(d[0]):"—"}</b></span><span>Valid<b>{d?d[2]:"—"}</b></span></div></Card>};
// const ExCard=({e})=><Card to={"/exam/"+e.id} c={L[CK[e.k[0]].lvl]}><Tag>{e.t}</Tag><div className="code">{e.code||"Lab / practical"}</div><h3>{e.name}</h3><div className="s">{e.l}</div></Card>;
// const PxCard=({e})=><Card to={"/exam/"+e.id} c="#0e8f9c"><Tag>Partner</Tag><div className="code">{e.code}</div><h3>{e.name}</h3><div className="s">{e.l}</div></Card>;
// const TrackCard=({t})=>{const n=CERTS.filter(c=>c.track===t).length,m=EX.filter(e=>e.t===t).length;return <Card to={"/track/"+slug(t)} c="#2563eb"><h3>{t}</h3><div className="s">{n} certification{n>1?"s":""} · {m} exam{m>1?"s":""}</div></Card>};
// const CourseCard=({c})=><Card to={"/course/"+c.k} c={L[c.lvl]}><Tag>{c.lvl}</Tag><h3>{short(c.name)} training</h3><div className="s">{c.track}</div><div className="meta"><span>Hours<b>{HRS[c.lvl]}</b></span><span>Modules<b>{mods(c).length}</b></span><span>Price<b>${PRICE[c.lvl]}</b></span></div></Card>;
// const HowCards=()=><Grid>{HOW.map((h,i)=><Card key={i} to={h[2]} c={Object.values(L)[i%5]}><div className="code">Step {i+1}</div><h3>{h[0]}</h3><div className="s">{h[1]}</div></Card>)}</Grid>;
// const Field=({id,l,error,children})=><div className="fld"><label htmlFor={id}>{l}</label>{children}<div className="err" role={error?"alert":undefined}>{error}</div></div>;
// const Sel=({id,l,o,...r})=><Field id={id} l={l}><select id={id} className="in" {...r}>{o.map(v=><option key={v}>{v}</option>)}</select></Field>;

// /* ---------- pages ---------- */
// function Hero(){
//  const st=useRef(null);
//  const mv=e=>{if(e.pointerType!=="mouse"||!st.current)return;const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;st.current.style.transform=`rotateX(${58-y*20}deg) rotateZ(${-38+x*30}deg)`};
//  const lay=[["Entry",0],["Associate",.24],["Professional",.48],["Expert",.72]];
//  return <div className="hero"><div className="in"><div><h1 className="big">Learn the networks every company already runs on.</h1><p className="lead">Cisco has {CERTS.length} certifications and {EX.length} career exams across {TRACKS.length} tracks, from IT support to network architecture. Train, buy your voucher, book the exam and collect your certificate here.</p><div className="btns"><Link href="/signup" className="btn primary">Create free account</Link><Link href="/certs" className="btn ghost">Browse certifications</Link></div></div>
//  <div className="scene" onPointerMove={mv} onPointerLeave={()=>{if(st.current)st.current.style.transform=""}}><div className="stack" ref={st}>{lay.map((l,i)=><Link key={l[0]} href={"/certs?level="+l[0]} className="layer" style={{"--c":L[l[0]],"--k":l[1],"--d":i*.5+"s"}}><span className="lt"><b>{l[0]}</b><small>{CERTS.filter(c=>c.lvl===l[0]).length} certifications</small></span></Link>)}</div></div></div></div>;
// }
// function Home(){
//  return <><Hero/>
//  <div className="wrap"><div className="stats">{[[CERTS.length,"Certifications"],[EX.length,"Career exams"],[PX.length,"Partner exams"],[TRACKS.length,"Tracks"]].map(s=><div className="stat" key={s[1]}><Count n={s[0]}/><span>{s[1]}</span></div>)}</div></div>
//  <div className="wrap t"><h2>How it works</h2><p className="lead">New here? Follow these six steps.</p><HowCards/></div>
//  <div className="wrap t"><h2>Browse by track</h2><p className="lead">Each track lists its certifications and the exams you need.</p><Grid>{TRACKS.map(t=><TrackCard key={t} t={t}/>)}</Grid></div>
//  <div className="wrap t"><h2>Popular first steps</h2><p className="lead">The most common starting points for networking, security and support careers.</p><Grid>{["ccna","ccst2","ccnacyb"].map(k=><CertCard key={k} c={CK[k]}/>)}</Grid></div></>;
// }
// function CertsPage(){
//  const{query}=useContext(RouteCtx),qp=query.get("level"),lv=LV.includes(qp)?qp:"All";
//  const[q,setQ]=useState("");
//  const r=CERTS.filter(c=>(lv==="All"||c.lvl===lv)&&(c.name+c.track).toLowerCase().includes(q.toLowerCase()));
//  return <div className="wrap"><h2>Certifications</h2><p className="lead">Entry, associate, professional and expert certifications, plus specialist credentials. Select one to see its exams and details.</p>
//  <div className="filters" role="group" aria-label="Level">{["All",...LV].map(v=><button key={v} type="button" className={"pill"+(v===lv?" on":"")} aria-pressed={v===lv} onClick={()=>replaceRoute(v==="All"?"/certs":"/certs?level="+v)}>{v}</button>)}</div>
//  <div className="filters"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search certifications" aria-label="Search certifications"/></div>
//  <Grid>{r.length?r.map(c=><CertCard key={c.k} c={c}/>):<div className="empty">Nothing matches. Clear the search to see everything.</div>}</Grid></div>;
// }
// function ExamsPage(){
//  const[q,setQ]=useState(""),[tr,setTr]=useState("All tracks");
//  const r=EX.filter(e=>(tr==="All tracks"||e.t===tr)&&(e.code+e.name+e.t).toLowerCase().includes(q.toLowerCase()));
//  return <div className="wrap"><h2>Current exams</h2><p className="lead">Passing one or more exams is the requirement for achieving a Cisco certification. All exams are available in English; other languages vary.</p>
//  <div className="filters"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by exam number or name" aria-label="Search exams"/><select value={tr} onChange={e=>setTr(e.target.value)} aria-label="Track"><option>All tracks</option>{TRACKS.map(t=><option key={t}>{t}</option>)}</select></div>
//  <Grid>{r.length?r.map(e=><ExCard key={e.id} e={e}/>):<div className="empty">Nothing matches.</div>}</Grid></div>;
// }
// const PartnerPage=()=><div className="wrap"><h2>Channel, partner and other exams</h2><p className="lead">Exams for Cisco partners, sales, field engineers and specialists. They are not part of the career certification tracks.</p><Grid>{PX.map(e=><PxCard key={e.id} e={e}/>)}</Grid></div>;
// const PathsPage=()=><div className="wrap"><h2>Career paths</h2><p className="lead">The usual order for each track, from first certificate to expert level. Swipe sideways on small screens, select a step to open it.</p>{PATHS.map(x=><div key={x[0]}><h3 className="h3">{x[0]}</h3><Steps ks={x[1]}/></div>)}</div>;
// const HowPage=()=><div className="wrap"><h2>How it works</h2><p className="lead">From a new account to a certificate in six steps. Each card opens the page for that step.</p><HowCards/></div>;

// function CertPage({k}){
//  const{M}=useApp(),c=CK[k];
//  usePageTitle(c&&c.name+" | ILM ORA Cisco",c&&("Exams, fees and path for "+c.name));
//  if(!c)return <NotFound/>;
//  const d=D[c.xi],ex=EX.filter(e=>e.k.includes(k));
//  const role=e=>c.lvl==="Professional"?(e.k.some(z=>CK[z].lvl==="Expert")?"Core exam":"Concentration exam"):c.lvl==="Expert"?(e.code?"Qualifying exam":"Lab / practical exam"):"";
//  const pi=PATHS.find(x=>x[1].includes(k)),i=pi?pi[1].indexOf(k):-1,prev=pi&&i>0?pi[1][i-1]:null,nx=pi&&i<pi[1].length-1?pi[1][i+1]:null;
//  return <><Band c={L[c.lvl]} crumb={[["Home","/"],["Certifications","/certs"],short(c.name)]} tag={c.lvl+" · "+c.track} h={c.name}/><div className="wrap">
//  <div className="btns" style={{marginBottom:34}}><Link href={"/course/"+k} className="btn primary">{M.courses[k]?"Continue training":"Start training"}</Link><Link href={"/checkout/exam/"+k} className="btn ghost">Buy exam voucher</Link><Link href={"/schedule/"+k} className="btn ghost">Schedule exam</Link></div>
//  {d?<div className="facts"><Fact a="Exam fee (USD)" b={fee(d[0])}/><Fact a="Duration" b={d[1]}/><Fact a="Validity" b={d[2]}/><Fact a="Eligibility" b={d[3]}/><Fact a="Recommended experience" b={d[4]}/><Fact a="Best for" b={d[5]}/><Fact a="Technologies" b={d[6]}/><Fact a="Data sheet name" b={d[7]}/></div>:<div className="note">Fee, duration and eligibility for this certification are not in the data sheet yet.</div>}
//  <h3 className="h3" style={{marginTop:0}}>Required exams</h3><Grid>{ex.map(e=><div key={e.id}>{role(e)&&<div className="s" style={{fontWeight:700,marginBottom:6}}>{role(e)}</div>}<ExCard e={e}/></div>)}</Grid>
//  <h3 className="h3">Where it fits</h3>{pi?<Steps ks={pi[1]}/>:<p className="lead">This credential is a standalone specialty and is not part of a level-by-level path.</p>}
//  <div className="pn">{prev?<Link href={"/cert/"+prev} className="btn ghost">Previous: {short(CK[prev].name)}</Link>:<span/>}{nx&&<Link href={"/cert/"+nx} className="btn primary">Next: {short(CK[nx].name)}</Link>}</div></div></>;
// }
// function ExamPage({id}){
//  const e=EXM[id],x=PXM[id];
//  usePageTitle((e||x)&&((e?e.code||e.name:x.code)+" | ILM ORA Cisco"),(e||x)&&(e?e.name:x.name));
//  if(!e&&!x)return <NotFound/>;
//  if(x)return <><Band c="#0e8f9c" crumb={[["Home","/"],["Partner Exams","/partner"],x.code]} tag="Partner exam" h={x.name}/><div className="wrap"><div className="facts"><Fact a="Exam number" b={x.code}/><Fact a="Languages" b={x.l}/><Fact a="Type" b="Channel, partner and other"/></div><Link href="/partner" className="btn ghost">Back to partner exams</Link></div></>;
//  const same=EX.filter(z=>z.t===e.t&&z.id!==id);
//  return <><Band c={L[CK[e.k[0]].lvl]} crumb={[["Home","/"],["Exams","/exams"],e.code||e.name]} tag={e.t} h={e.name}/><div className="wrap"><div className="facts"><Fact a="Exam number" b={e.code||"Lab / practical exam"}/><Fact a="Track" b={e.t}/><Fact a="Languages" b={e.l}/></div>
//  <h3 className="h3" style={{marginTop:0}}>Counts toward</h3><Grid>{e.k.map(k=><CertCard key={k} c={CK[k]}/>)}</Grid>
//  {same.length>0&&<><h3 className="h3">Other {e.t} exams</h3><Grid>{same.map(z=><ExCard key={z.id} e={z}/>)}</Grid></>}</div></>;
// }
// function TrackPage({s}){
//  const t=TRACKS.find(z=>slug(z)===s);
//  usePageTitle(t&&t+" track | ILM ORA Cisco",t&&("Cisco "+t+" certifications and exams"));
//  if(!t)return <NotFound/>;
//  return <><Band c="#2563eb" crumb={[["Home","/"],"Track"]} tag="Track" h={t}/><div className="wrap"><h3 className="h3" style={{marginTop:0}}>Certifications</h3><Grid>{CERTS.filter(c=>c.track===t).map(c=><CertCard key={c.k} c={c}/>)}</Grid><h3 className="h3">Exams</h3><Grid>{EX.filter(e=>e.t===t).map(e=><ExCard key={e.id} e={e}/>)}</Grid></div></>;
// }

// function Auth({mode}){
//  const{user,ready,signup,login,toast}=useApp(),{query}=useContext(RouteCtx),next=safeNext(query.get("next"));
//  const[v,setV]=useState({name:"",email:"",pass:"",country:COUNTRIES[0],goal:GOALS[0]}),[err,setErr]=useState(""),[busy,setBusy]=useState(false);
//  useEffect(()=>{if(ready&&user)replaceRoute(next)},[ready,user,next]);
//  const set=k=>e=>setV(s=>({...s,[k]:e.target.value}));
//  const up=mode==="up",qs=query.get("next")?"?next="+encodeURIComponent(next):"";
//  const submit=async e=>{e.preventDefault();setErr("");
//   if(up&&v.name.trim().length<3)return setErr("Enter your full name.");
//   if(!/^\S+@\S+\.\S+$/.test(v.email.trim()))return setErr("Enter a valid email address.");
//   if(up&&v.pass.length<6)return setErr("Password needs at least 6 characters.");if(!v.pass)return setErr("Enter your password.");
//   setBusy(true);try{if(up){await signup(v);toast("Account created. Welcome, "+v.name.trim().split(" ")[0]+".")}else{await login(v);toast("Welcome back.")}}catch(x){setErr(x.message);setBusy(false)}};
//  return <div className="wrap narrow"><h2>{up?"Create your account":"Sign in"}</h2><p className="lead">{up?"One account for courses, exam vouchers, exam bookings and certificates. Your data is saved in this browser.":query.get("next")?"Sign in to continue.":"Welcome back."}</p>
//  <div className="tabs2"><Link href={"/login"+qs} className={up?"":"on"}>Sign in</Link><Link href={"/signup"+qs} className={up?"on":""}>Create account</Link></div>
//  <form className="form" noValidate onSubmit={submit}>
//  {up&&<Field id="a-name" l="Full name (as on your ID)"><input id="a-name" className="in" autoComplete="name" value={v.name} onChange={set("name")}/></Field>}
//  <Field id="a-email" l="Email"><input id="a-email" className="in" type="email" autoComplete="email" value={v.email} onChange={set("email")}/></Field>
//  <Field id="a-pass" l={up?"Password (6+ characters)":"Password"}><input id="a-pass" className="in" type="password" autoComplete={up?"new-password":"current-password"} value={v.pass} onChange={set("pass")}/></Field>
//  {up&&<><Sel id="a-country" l="Country" o={COUNTRIES} value={v.country} onChange={set("country")}/><Sel id="a-goal" l="Your goal" o={GOALS} value={v.goal} onChange={set("goal")}/></>}
//  <div className="err" role="alert">{err}</div><button className="btn primary" type="submit" disabled={busy}>{busy?"Please wait":up?"Create account":"Sign in"}</button></form></div>;
// }

// function CoursesPage(){
//  const[q,setQ]=useState(""),[lv,setLv]=useState("All");
//  const r=CERTS.filter(c=>(lv==="All"||c.lvl===lv)&&(c.name+c.track).toLowerCase().includes(q.toLowerCase()));
//  return <div className="wrap"><h2>Training courses</h2><p className="lead">One course for every certification. Study the modules, pass the practice test and final assessment, then book your exam.</p>
//  <div className="filters"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search courses" aria-label="Search courses"/><select value={lv} onChange={e=>setLv(e.target.value)} aria-label="Level"><option>All</option>{LV.map(v=><option key={v}>{v}</option>)}</select></div>
//  <Grid>{r.length?r.map(c=><CourseCard key={c.k} c={c}/>):<div className="empty">No course matches.</div>}</Grid></div>;
// }
// function CoursePage({k}){
//  const{M}=useApp(),c=CK[k];
//  usePageTitle(c&&short(c.name)+" training | ILM ORA Cisco",c&&("Training course for "+c.name));
//  if(!c)return <NotFound/>;
//  const ms=mods(c);
//  return <><Band c={L[c.lvl]} crumb={[["Home","/"],["Courses","/courses"],short(c.name)]} tag={c.lvl+" · "+c.track} h={short(c.name)+" training course"}/><div className="wrap"><div className="facts"><Fact a="Study time" b={HRS[c.lvl]+" hours"}/><Fact a="Modules" b={ms.length}/><Fact a="Course price" b={"$"+PRICE[c.lvl]}/><Fact a="Prepares you for" b={EX.filter(e=>e.k.includes(k)).map(e=>e.code||"Lab exam").join(", ")}/></div>
//  <div className="btns">{M.courses[k]?<Link href={"/learn/"+k} className="btn primary">Continue learning</Link>:<Link href={"/checkout/course/"+k} className="btn primary">Enroll for ${PRICE[c.lvl]}</Link>}<Link href={"/cert/"+k} className="btn ghost">View certification</Link></div>
//  <h3 className="h3">What you will study</h3><ol className="mods">{ms.map((m,i)=><li key={i}>{m}</li>)}</ol></div></>;
// }
// function LearnPage({k}){
//  const{M,upd}=useApp(),c=CK[k];
//  if(!c)return <NotFound/>;const o=M.courses[k];
//  if(!o)return <div className="wrap narrow"><h2>Enroll first</h2><p className="lead">You have not enrolled in this course yet.</p><Link href={"/course/"+k} className="btn primary">View course</Link></div>;
//  const ms=mods(c),pc=pr(M,k);
//  const toggle=(i,on)=>upd((n,m)=>{const x=m.courses[k];x.done=on?[...new Set([...x.done,i])]:x.done.filter(z=>z!==i)});
//  return <><Band c={L[c.lvl]} crumb={[["Dashboard","/dashboard"],short(c.name)]} tag="My course" h={short(c.name)+" training"}/><div className="wrap"><div className="prog" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pc}><i style={{width:pc+"%"}}/></div><p className="lead" style={{marginTop:10}}>{pc}% complete · {o.done.length} of {ms.length} modules</p>
//  <div className="mlist">{ms.map((m,i)=><label key={i} className={"mod"+(o.done.includes(i)?" on":"")}><input type="checkbox" checked={o.done.includes(i)} onChange={e=>toggle(i,e.target.checked)}/><span>{m}</span></label>)}</div>
//  {pc===100&&<><div className="note" style={{marginTop:24}}>Course complete. Next: buy your exam voucher and schedule the exam.</div><div className="btns"><Link href={"/checkout/exam/"+k} className="btn primary">Buy exam voucher</Link><Link href={"/schedule/"+k} className="btn ghost">Schedule exam</Link></div></>}</div></>;
// }

// function Checkout({t,k}){
//  const{user,email,upd,toast}=useApp(),i=item(t,k);
//  const[f,setF]=useState({cn:user?user.name:"",cc:"",ex:"",cv:"",bc:COUNTRIES[0],ag:false}),[err,setErr]=useState(""),[paying,setPaying]=useState(false);
//  if(!i)return <div className="wrap narrow"><h2>Price not available</h2><p className="lead">The exam fee for this certification is not in the data sheet yet, so a voucher cannot be bought here.</p><Link href="/certs" className="btn ghost">Back to certifications</Link></div>;
//  const set=n=>e=>setF(s=>({...s,[n]:e.target.value}));
//  const pay=e=>{e.preventDefault();const cc=f.cc.replace(/\s/g,""),ex=/^(\d{2})\/(\d{2})$/.exec(f.ex.trim());
//   if(f.cn.trim().length<3)return setErr("Enter the name on the card.");if(!(cc.length>=13&&luhn(cc)))return setErr("Enter a valid card number. Demo card: 4242 4242 4242 4242.");
//   if(!ex||+ex[1]<1||+ex[1]>12)return setErr("Enter the expiry as MM/YY.");if(new Date(2000+ +ex[2],+ex[1],1)<=new Date())return setErr("This card has expired.");
//   if(!/^\d{3,4}$/.test(f.cv))return setErr("CVV must be 3 or 4 digits.");if(!f.ag)return setErr("Tick the confirmation box to continue.");
//   setErr("");setPaying(true);
//   setTimeout(()=>{if(t==="course"){upd((n,m)=>{m.courses[k]=m.courses[k]||{done:[]}});toast("Payment received. Your course is open.");go("/learn/"+k)}else{upd((n,m)=>{m.vouchers.push({id:uid("VCH-"),k,used:false,price:i.price})});toast("Voucher purchased. Now pick your exam date.");go("/schedule/"+k)}},1100)};
//  return <div className="wrap"><Crumb items={[["Back",i.back],"Checkout"]}/><h2>Checkout</h2><div className="note">Demo payment. No real charge is made and card details are never saved.</div>
//  <div className="co"><form className="form" noValidate onSubmit={pay}>
//  <Field id="c-cn" l="Name on card"><input id="c-cn" className="in" autoComplete="cc-name" value={f.cn} onChange={set("cn")}/></Field>
//  <Field id="c-cc" l="Card number"><input id="c-cc" className="in" inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" value={f.cc} onChange={e=>setF(s=>({...s,cc:e.target.value.replace(/\D/g,"").slice(0,16).replace(/(\d{4})(?=\d)/g,"$1 ")}))}/></Field>
//  <div className="two"><Field id="c-ex" l="Expiry (MM/YY)"><input id="c-ex" className="in" inputMode="numeric" autoComplete="cc-exp" placeholder="08/29" value={f.ex} onChange={e=>{let x=e.target.value.replace(/\D/g,"").slice(0,4);if(x.length>2)x=x.slice(0,2)+"/"+x.slice(2);setF(s=>({...s,ex:x}))}}/></Field>
//  <Field id="c-cv" l="CVV"><input id="c-cv" className="in" type="password" inputMode="numeric" autoComplete="cc-csc" maxLength={4} value={f.cv} onChange={e=>setF(s=>({...s,cv:e.target.value.replace(/\D/g,"")}))}/></Field></div>
//  <Sel id="c-bc" l="Billing country" o={COUNTRIES} value={f.bc} onChange={set("bc")}/>
//  <label className="chk"><input type="checkbox" checked={f.ag} onChange={e=>setF(s=>({...s,ag:e.target.checked}))}/><span>I confirm my details are correct and agree to the purchase terms.</span></label>
//  <div className="err" role="alert">{err}</div><button className="btn primary" type="submit" disabled={paying}>{paying?"Processing…":"Pay $"+i.price}</button></form>
//  <aside className="sum"><h3>Order summary</h3><p>{i.title}</p><b className="big2">${i.price}</b>{i.note&&<p className="s">{i.note}</p>}<p className="s" style={{overflowWrap:"anywhere"}}>Account: {user&&user.name}<br/>{email}</p></aside></div></div>;
// }
// function SchedulePage({k}){
//  const{M,user,upd,toast}=useApp(),c=CK[k];
//  const[f,setF]=useState({exam:"",mode:"Test center",country:COUNTRIES[0],date:"",time:SLOTS[0],id:false}),[err,setErr]=useState("");
//  if(!c)return <NotFound/>;
//  const v=M.vouchers.filter(z=>z.k===k&&!z.used);
//  if(!v.length)return <div className="wrap narrow"><h2>Buy a voucher first</h2><p className="lead">You need an exam voucher for {short(c.name)} before you can choose a date.</p><div className="btns"><Link href={"/checkout/exam/"+k} className="btn primary">Buy exam voucher</Link><Link href="/dashboard" className="btn ghost">My dashboard</Link></div></div>;
//  const ex=EX.filter(e=>e.k.includes(k)).map(e=>e.code||e.name),min=new Date(Date.now()+864e5).toISOString().slice(0,10),exam=f.exam||ex[0];
//  const set=n=>e=>setF(s=>({...s,[n]:e.target.value}));
//  const book=e=>{e.preventDefault();if(!f.date||f.date<min)return setErr("Pick a date from tomorrow onward.");if(!f.id)return setErr("Tick the ID box to continue.");
//   const id=uid("BK-");upd((n,m)=>{const x=m.vouchers.find(z=>z.k===k&&!z.used);x.used=true;m.bookings.push({id,k,exam,mode:f.mode,country:f.country,date:f.date,time:f.time,status:"Scheduled",voucher:x.id})});toast("Exam booked: "+id);go("/dashboard")};
//  return <div className="wrap narrow"><Crumb items={[["Dashboard","/dashboard"],"Schedule exam"]}/><h2>Schedule your exam</h2><p className="lead">{short(c.name)} · voucher {v[0].id}</p>
//  <form className="form" noValidate onSubmit={book}><Sel id="s-ex" l="Exam" o={ex} value={exam} onChange={set("exam")}/><Sel id="s-mode" l="Delivery" o={["Test center","Online proctored"]} value={f.mode} onChange={set("mode")}/><Sel id="s-co" l="Country" o={COUNTRIES} value={f.country} onChange={set("country")}/>
//  <Field id="s-date" l="Exam date"><input id="s-date" className="in" type="date" min={min} value={f.date} onChange={set("date")}/></Field><Sel id="s-time" l="Start time" o={SLOTS} value={f.time} onChange={set("time")}/>
//  <label className="chk"><input type="checkbox" checked={f.id} onChange={e=>setF(s=>({...s,id:e.target.checked}))}/><span>My government ID will match the name on my account ({user&&user.name}).</span></label>
//  <div className="err" role="alert">{err}</div><button className="btn primary" type="submit">Confirm booking</button></form></div>;
// }
// function Dashboard(){
//  const{user,email,M,upd,toast}=useApp();
//  const cs=Object.keys(M.courses),vu=M.vouchers.filter(v=>!v.used);
//  const open=cs.find(k=>pr(M,k)<100),dn=cs.find(k=>pr(M,k)===100&&!M.vouchers.some(v=>v.k===k)&&!M.bookings.some(x=>x.k===k));
//  const nx=!cs.length?["Choose your first training course.","/courses","Browse courses"]:open?[`Keep going: ${short(CK[open].name)} is ${pr(M,open)}% done.`,"/learn/"+open,"Continue learning"]:vu.length?["Your voucher is ready. Pick an exam date.","/schedule/"+vu[0].k,"Schedule exam"]:dn?[`You finished ${short(CK[dn].name)}. Buy the exam voucher.`,"/checkout/exam/"+dn,"Buy voucher"]:M.bookings.some(x=>x.status==="Scheduled")?["Your exam is booked. Record the result here after you sit it.","/courses","Review courses"]:["Ready for another certification?","/certs","Browse certifications"];
//  const result=(id,act)=>{let msg="";upd((n,m)=>{const i=m.bookings.findIndex(z=>z.id===id),bk=m.bookings[i],c=CK[bk.k];
//   if(act==="cancel"){const v=m.vouchers.find(z=>z.id===bk.voucher);if(v)v.used=false;m.bookings.splice(i,1);msg="Booking cancelled. Your voucher is ready to use again."}
//   else if(act==="fail"){bk.status="Not passed";msg="Noted. Buy a new voucher to try again."}
//   else{bk.status="Passed";const ps=[...new Set(m.bookings.filter(z=>z.k===bk.k&&z.status==="Passed").map(z=>z.exam))],r=need(c)-ps.length;
//    if(r<=0&&!m.certs.some(z=>z.k===bk.k)){m.certs.push({id:uid("CERT-"),k:bk.k,exam:ps.join(", "),date:new Date().toISOString().slice(0,10),holder:n.users[n.session].name});msg="Congratulations. Your certificate is ready."}
//    else msg=r>0?`Passed. ${r} more exam${r>1?"s":""} needed for the full certification.`:"Result saved."}});setTimeout(()=>toast(msg),0)};
//  const Empty=({t,h,l})=><div className="empty" style={{border:"2px dashed var(--ln)",borderRadius:14}}>{t}<br/><Link href={h} className="btn ghost" style={{marginTop:12}}>{l}</Link></div>;
//  return <div className="wrap"><h2>Welcome, {user.name.split(" ")[0]}</h2><p className="lead" style={{overflowWrap:"anywhere"}}>{email} · {user.country} · Goal: {user.goal}</p>
//  <div className="stats">{[[cs.length,"Courses"],[vu.length,"Unused vouchers"],[M.bookings.length,"Exam bookings"],[M.certs.length,"Certificates"]].map(s=><div className="stat" key={s[1]}><b>{s[0]}</b><span>{s[1]}</span></div>)}</div>
//  <div className="note" style={{marginTop:26,display:"flex",justifyContent:"space-between",gap:14,flexWrap:"wrap",alignItems:"center"}}><span><b>Next step:</b> {nx[0]}</span><Link href={nx[1]} className="btn primary">{nx[2]}</Link></div>
//  <h3 className="h3">My courses</h3>{cs.length?<Grid>{cs.map(k=><Card key={k} to={"/learn/"+k} c={L[CK[k].lvl]}><Tag>{CK[k].lvl}</Tag><h3>{short(CK[k].name)}</h3><div className="prog" style={{margin:"12px 0 6px"}}><i style={{width:pr(M,k)+"%"}}/></div><div className="s">{pr(M,k)}% complete</div></Card>)}</Grid>:<Empty t="You have not enrolled in a course yet." h="/courses" l="Browse courses"/>}
//  <h3 className="h3">Exam vouchers</h3>{M.vouchers.length?M.vouchers.map(v=><div className="row" key={v.id}><div><b>{short(CK[v.k].name)}</b><div className="s">{v.id} · ${v.price}</div></div><div className="btns"><span className="st">{v.used?"Used":"Ready"}</span>{!v.used&&<Link href={"/schedule/"+v.k} className="btn ghost sm">Schedule exam</Link>}</div></div>):<Empty t="No vouchers yet. Buy one from a certification page." h="/certs" l="Browse certifications"/>}
//  <h3 className="h3">Exam bookings</h3>{M.bookings.length?M.bookings.map(x=><div className="row" key={x.id}><div><b>{short(CK[x.k].name)}</b><div className="s">{x.exam} · {x.date} at {x.time} · {x.mode} · {x.country}</div><div className="s">Booking {x.id}</div></div><div className="btns"><span className="st">{x.status}</span>{x.status==="Scheduled"&&<><button type="button" className="btn ghost sm" onClick={()=>result(x.id,"pass")}>I passed</button><button type="button" className="btn ghost sm" onClick={()=>result(x.id,"fail")}>I did not pass</button><button type="button" className="btn ghost sm" onClick={()=>result(x.id,"cancel")}>Cancel</button></>}{x.status==="Not passed"&&<Link href={"/checkout/exam/"+x.k} className="btn ghost sm">Buy new voucher</Link>}</div></div>):<Empty t="No exam booked yet." h="/certs" l="Pick a certification"/>}
//  <h3 className="h3">My certificates</h3>{M.certs.length?<Grid>{M.certs.map(z=><Card key={z.id} to={"/certificate/"+z.id} c={L[CK[z.k].lvl]}><Tag>{CK[z.k].lvl}</Tag><h3>{CK[z.k].name}</h3><div className="s">Issued {z.date} · {z.id}</div></Card>)}</Grid>:<Empty t="Your certificates appear here after you record a passed exam." h="/courses" l="Start training"/>}</div>;
// }
// function CertificatePage({id}){
//  const{M}=useApp(),ref=useRef(null),z=M.certs.find(c=>c.id===id);
//  if(!z)return <NotFound/>;
//  const c=CK[z.k],d=D[c.xi];
//  const mv=e=>{if(e.pointerType!=="mouse")return;const r=e.currentTarget.getBoundingClientRect();ref.current.style.transform=`rotateY(${((e.clientX-r.left)/r.width-.5)*24}deg) rotateX(${(.5-(e.clientY-r.top)/r.height)*18}deg)`};
//  return <div className="wrap"><Crumb items={[["Dashboard","/dashboard"],"Certificate"]}/>
//  <div className="certscene" onPointerMove={mv} onPointerLeave={()=>{ref.current.style.transform=""}}><div className="cert3d" ref={ref} style={{"--c":L[c.lvl]}}><div className="seal" aria-hidden="true">★</div><p className="s">Certificate of achievement</p><h2>{z.holder}</h2><p>has passed the exam for</p><h3>{c.name}</h3><p className="s">{z.exam} · Issued {z.date} · Valid {d?d[2]:"3 Years"}</p><p className="s">Credential ID {z.id}</p></div></div>
//  <div className="btns" style={{justifyContent:"center"}}><button type="button" className="btn primary" onClick={()=>window.print()}>Print or save as PDF</button><Link href="/dashboard" className="btn ghost">Back to dashboard</Link></div>
//  <p className="s" style={{textAlign:"center",marginTop:18}}>This is a practice record on ILM ORA. Official Cisco credentials are issued by Cisco after a proctored exam.</p></div>;
// }

// /* ---------- shell ---------- */
// function SubBar({first}){
//  const{user,logout}=useApp();
//  const sec={cert:"certs",course:"courses",learn:"courses",exam:"exams",track:"exams"}[first]||first;
//  return <><div className="tabbar"><div className="wrap">
//   <nav className="tabs" aria-label="Cisco sections">{NAV.map(n=><Link key={n[0]} href={n[1]} className={sec===n[0]?"on":""} aria-current={sec===n[0]?"page":undefined}>{n[2]}</Link>)}</nav>
//   {user&&<div className="acct"><Link href="/dashboard" className="gw">Dashboard</Link><button type="button" className="gw" onClick={logout}>Log out</button></div>}</div></div>
//  <div className="subinfo"><div className="wrap"><strong>Cisco</strong><span>Learn with Cisco</span><span>{CERTS.length} certifications · {EX.length} career exams · {PX.length} partner exams</span></div></div></>;
// }
// function Screen(){
//  const{parts}=useContext(RouteCtx),{user,ready}=useApp(),[p="home",a,b]=parts;
//  const{openLogin}=useContext(LoginCtx);
//  useEffect(()=>{if(ready&&PROT.includes(p)&&!user){replaceRoute("/");openLogin()}},[ready,user,p,parts]); // eslint-disable-line react-hooks/exhaustive-deps
//  if(PROT.includes(p)&&!user)return <Skeleton/>;
//  switch(p){
//   case "home":return <Home/>;case "how":return <HowPage/>;case "certs":return <CertsPage/>;case "exams":return <ExamsPage/>;case "partner":return <PartnerPage/>;case "paths":return <PathsPage/>;
//   case "cert":return <CertPage k={a}/>;case "exam":return <ExamPage id={a}/>;case "track":return <TrackPage s={a}/>;
//   case "courses":return <CoursesPage/>;case "course":return <CoursePage k={a}/>;case "learn":return <LearnPage k={a}/>;
//   case "login":return <Auth mode="in"/>;case "signup":return <Auth mode="up"/>;
//   case "checkout":return <Checkout t={a} k={b}/>;case "schedule":return <SchedulePage k={a}/>;case "dashboard":return <Dashboard/>;case "certificate":return <CertificatePage id={a}/>;
//   default:return <NotFound/>}
// }
// function CiscoApp({openLogin=()=>{},siteUser=null}){
//  const route=useHashRoute(),mainRef=useRef(null),key=route.parts.join("/"),first=route.parts[0]||"home";
//  useEffect(()=>{const t=TITLES[first];if(t)setPageMeta(t[0],t[1]);window.scrollTo({top:0});if(mainRef.current)mainRef.current.focus({preventScroll:true})},[key]); // eslint-disable-line react-hooks/exhaustive-deps
//  const lv=useMemo(()=>({openLogin,siteUser}),[openLogin,siteUser]);
//  return <RouteCtx.Provider value={route}><LoginCtx.Provider value={lv}><div className="cc"><style dangerouslySetInnerHTML={{__html:CC_CSS}}/>
//   <AppProviders><SubBar first={first}/><div className="cc-main" id="cc-main" tabIndex={-1} ref={mainRef} key={key}><Screen/></div></AppProviders></div></LoginCtx.Provider></RouteCtx.Provider>;
// }

// /**
//  * Full page: PublicLayout (shared Navbar + Footer) + .ilm theme wrapper + the Cisco portal.
//  * Props are passed exactly like Ilmora-workshops / Ilmora-Microsoft. Without props the page uses its own theme state.
//  * Pass `embedded` to render only the content (no Navbar / Footer).
//  */
// /** PublicLayout leaves a small gap under the fixed Navbar. Increase this number if a gap still shows, decrease it if the strip hides under the Navbar. */
// const NAV_GAP_FIX = 16;

// export default function IlmoraCisco({theme:themeProp,toggleTheme:toggleProp,setShowLoginModal,scrollToSection,embedded=false,siteUser=null}){
//  const[localTheme,setLocalTheme]=useState("light");
//  useEffect(()=>{try{const t=window.localStorage.getItem("theme")||window.localStorage.getItem("ilmora-theme");if(t)setLocalTheme(t)}catch{}},[]);
//  const theme=themeProp??localTheme;
//  const toggleTheme=toggleProp??(()=>{const n=localTheme==="dark"?"light":"dark";setLocalTheme(n);try{window.localStorage.setItem("theme",n)}catch{}});
//  const openLogin=setShowLoginModal??(()=>{window.location.href="/ilm-demo"});
//  const scrollTo=scrollToSection??(id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"}));
//  if(embedded)return <CiscoApp openLogin={()=>openLogin(true)} siteUser={siteUser}/>;
//  return <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={openLogin} scrollToSection={scrollTo}>
//   <style dangerouslySetInnerHTML={{__html:HOST_CSS}}/>
//     <div style={{marginTop:-16}}><div className={"ilm"+(theme==="dark"?" dark":"")}><CiscoApp openLogin={()=>openLogin(true)} siteUser={siteUser}/></div></div>
//  </PublicLayout>;
// }

































"use client";
/*
  ILM ORA · Cisco Mentorship  —  Next.js (App Router / Pages Router) single-file component
  --------------------------------------------------------------------------------------
  USE:
    app/page.js            ->  import IlmoraCisco from "./Ilmora-cisco"; export default function Page(){ return <IlmoraCisco/> }
    (or put the file in /components and import it)

  No extra npm packages needed. 3D = pure CSS 3D transforms + requestAnimationFrame.
  Routing is hash based (#/skills, #/cert/ccna, #/plan/ccna ...), same as the original HTML.

  Recommended in app/layout.js (for notch / safe-area on iPhone, Pixel, iPad):
    export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

  Responsive targets: phones (iPhone SE / Pixel / Galaxy), iPad mini, iPad, iPad Pro,
  tablets, laptops, desktops, MacBook / iMac, 2K-4K screens, phone landscape.
*/
import { useEffect, useMemo, useRef, useState } from "react";

// Shared Navbar + Footer (same as Ilmora-Microsoft / Ilmora-workshops)
import PublicLayout from "../Landing/components/PublicLayout";

/* ===================================================================== */
/* DATA                                                                   */
/* ===================================================================== */
const L = { Entry: "#1fa463", Associate: "#f26b21", Professional: "#2563eb", Expert: "#8b3fd9", Specialist: "#0e8f9c" };
const LV = Object.keys(L);
const LEVEL_CODE = { Entry: "CCST", Associate: "CCNA", Professional: "CCNP", Expert: "CCIE", Specialist: "Specialist" };

const CERTS = [
  ["aitech", "Cisco AI Technical Practitioner (AITECH)", "Specialist", "AI", -1],
  ["caapa", "Cisco AppDynamics Associate Performance Analyst", "Associate", "AppDynamics", -1],
  ["caaa", "Cisco AppDynamics Associate Administrator", "Associate", "AppDynamics", -1],
  ["capi", "Cisco AppDynamics Professional Implementer", "Professional", "AppDynamics", -1],
  ["ccnaauto", "CCNA Automation", "Associate", "Automation", 5],
  ["ccnpauto", "CCNP Automation", "Professional", "Automation", 11],
  ["cciauto", "CCIE Automation", "Expert", "Automation", 16],
  ["ccnpcol", "CCNP Collaboration", "Professional", "Collaboration", 10],
  ["cciecol", "CCIE Collaboration", "Expert", "Collaboration", 15],
  ["ccnacyb", "CCNA Cybersecurity", "Associate", "Cybersecurity", 4],
  ["ccnpcyb", "CCNP Cybersecurity", "Professional", "Cybersecurity", -1],
  ["ccnpdc", "CCNP Data Center", "Professional", "Data Center", 7],
  ["ccied", "CCIE Data Center", "Expert", "Data Center", 14],
  ["ccde", "CCDE", "Expert", "Design", -1],
  ["ccna", "CCNA", "Associate", "Enterprise", 3],
  ["ccnpent", "CCNP Enterprise", "Professional", "Enterprise", 6],
  ["ccieei", "CCIE Enterprise Infrastructure", "Expert", "Enterprise", 12],
  ["ft", "Cisco Certified Field Technician", "Specialist", "Field Technician", -1],
  ["meraki", "Cisco Meraki Solutions Specialist", "Specialist", "Meraki", -1],
  ["ccnpsec", "CCNP Security", "Professional", "Security", 8],
  ["cciesec", "CCIE Security", "Expert", "Security", 13],
  ["ccnpsp", "CCNP Service Provider", "Professional", "Service Provider", 9],
  ["cciesp", "CCIE Service Provider", "Expert", "Service Provider", -1],
  ["ccst1", "Cisco Certified Support Technician (CCST) IT Support", "Entry", "Support Technician", 0],
  ["ccst2", "Cisco Certified Support Technician (CCST) Networking", "Entry", "Support Technician", 1],
  ["ccst3", "Cisco Certified Support Technician (CCST) Cybersecurity", "Entry", "Support Technician", 2],
  ["ccnpwl", "CCNP Wireless", "Professional", "Wireless", -1],
  ["cciewl", "CCIE Wireless", "Expert", "Wireless", -1],
].map((r) => ({ k: r[0], name: r[1], lvl: r[2], track: r[3], xi: r[4] }));
const CK = Object.fromEntries(CERTS.map((c) => [c.k, c]));

/* fee, duration, validity, eligibility, experience, role, technologies */
const D = [
  [125, "50 Minutes", "3 Years", "No prerequisites", "None", "IT Support Technician", "Computer Hardware, Windows, Networking Basics"],
  [125, "50 Minutes", "3 Years", "No prerequisites", "None", "Network Support Technician", "TCP/IP, Routing, Switching, IPv4, IPv6"],
  [125, "50 Minutes", "3 Years", "No prerequisites", "None", "Cybersecurity Support Technician", "Security Fundamentals, Network Security"],
  [300, "120 Minutes", "3 Years", "No prerequisites", "1 Year Networking Recommended", "Network Engineer", "Routing, Switching, IPv4, IPv6, WLAN, Automation"],
  [300, "120 Minutes", "3 Years", "No prerequisites", "1 Year Security Recommended", "SOC Analyst", "SIEM, Incident Response, Threat Analysis"],
  [300, "120 Minutes", "3 Years", "Programming Basics", "1 Year Software/Network Experience", "Network Automation Engineer", "Python, REST API, Docker, Cisco APIs"],
  [700, "120 Minutes Each", "3 Years", "CCNA Recommended", "3–5 Years Enterprise Networking", "Enterprise Network Engineer", "Enterprise Routing, SD-WAN, Wireless"],
  [700, "120 Minutes Each", "3 Years", "CCNA Recommended", "3–5 Years Data Center Experience", "Data Center Engineer", "Nexus, UCS, Storage, ACI"],
  [700, "120 Minutes Each", "3 Years", "CCNA Recommended", "3–5 Years Security Experience", "Security Engineer", "Cisco ISE, Firepower, VPN, Zero Trust"],
  [700, "120 Minutes Each", "3 Years", "CCNA Recommended", "3–5 Years ISP Experience", "Service Provider Engineer", "MPLS, BGP, Segment Routing"],
  [700, "120 Minutes Each", "3 Years", "CCNA Recommended", "3–5 Years Collaboration Experience", "Collaboration Engineer", "Webex, CUCM, VoIP"],
  [700, "120 Minutes Each", "3 Years", "DevNet Associate Recommended", "3–5 Years Automation Experience", "DevOps / Automation Engineer", "Python, APIs, Kubernetes, CI/CD"],
  ["$1,600+", "Lab 8 Hours", "3 Years", "CCNP-Level Knowledge", "5+ Years Enterprise Networking", "Network Architect", "Enterprise Networking, SD-WAN, Automation"],
  ["$1,600+", "Lab 8 Hours", "3 Years", "CCNP-Level Knowledge", "5+ Years Security Experience", "Security Architect", "Firepower, ISE, VPN, Zero Trust"],
  ["$1,600+", "Lab 8 Hours", "3 Years", "CCNP-Level Knowledge", "5+ Years Data Center Experience", "Data Center Architect", "Nexus, ACI, UCS"],
  ["$1,600+", "Lab 8 Hours", "3 Years", "CCNP-Level Knowledge", "5+ Years Collaboration Experience", "Collaboration Architect", "CUCM, Webex, VoIP"],
  ["$1,600+", "Lab 8 Hours", "3 Years", "DevNet Professional Recommended", "5+ Years Automation Experience", "Automation Architect", "Python, APIs, Kubernetes, Cisco Platforms"],
];

const E = "English", EJ = "English, Japanese", ST = "English, Arabic, Chinese, Spanish, French, Japanese, Portuguese";
const EX = [];
const x = (t, c, n, k, l = E) => EX.push({ t, code: c, name: n, k: k.split(","), l, id: (c || n).toLowerCase().replace(/[^a-z0-9]+/g, "-") });
x("AI", "810-110 AITECH", "Cisco AI Technical Practitioner", "aitech");
x("AppDynamics", "500-420 CAAPA", "Cisco AppDynamics Associate Performance Analyst", "caapa", EJ);
x("AppDynamics", "500-425 CAAA", "Cisco AppDynamics Associate Administrator", "caaa", EJ);
x("AppDynamics", "500-430 CAPI", "Cisco AppDynamics Professional Implementer", "capi", EJ);
x("Automation", "200-901 CCNAAUTO", "Automating Networks Using Cisco Platforms", "ccnaauto", EJ);
x("Automation", "350-901 AUTOCOR", "Designing, Deploying and Managing Network Automation Systems", "ccnpauto,cciauto");
x("Automation", "300-435 ENAUTO", "Automating and Programming Cisco Enterprise Solutions", "ccnpauto,ccnpent", EJ);
x("Automation", "300-635 DCNAUTO", "Automating Cisco Data Center Networking Solutions", "ccnpauto,ccnpdc");
x("Automation", "", "CCIE Automation practical exam", "cciauto");
x("Collaboration", "350-801 CLCOR", "Implementing Cisco Collaboration Core Technologies", "ccnpcol,cciecol");
x("Collaboration", "300-815 CLACC", "Implementing Cisco Advanced Call Control On-Premises", "ccnpcol");
x("Collaboration", "300-820 CLHCT", "Implementing Cisco Collaboration Hybrid and Cloud Technologies", "ccnpcol");
x("Collaboration", "300-830 CLCCE", "Implementing Cisco Collaboration Cloud Customer Experience", "ccnpcol");
x("Collaboration", "", "CCIE Collaboration lab exam", "cciecol");
x("Cybersecurity", "200-201 CCNACBR", "Understanding Cisco Cybersecurity Operations Fundamentals", "ccnacyb");
x("Cybersecurity", "350-201 CBRCOR", "Performing Cybersecurity Using Cisco Security Technologies", "ccnpcyb");
x("Cybersecurity", "300-215 CBRFIR", "Conducting Forensic Analysis and Incident Response Using Cisco Technologies for Cybersecurity", "ccnpcyb");
x("Cybersecurity", "300-220 CBRTHD", "Conducting Threat Hunting and Defending using Cisco Technologies for Cybersecurity", "ccnpcyb");
x("Data Center", "350-601 DCCOR", "Implementing and Operating Cisco Data Center Core Technologies", "ccnpdc,ccied");
x("Data Center", "300-610 DCID", "Designing Cisco Data Center Infrastructure", "ccnpdc");
x("Data Center", "300-615 DCIT", "Troubleshooting Cisco Data Center Infrastructure", "ccnpdc");
x("Data Center", "300-620 DCACI", "Implementing Cisco Application Centric Infrastructure", "ccnpdc");
x("Data Center", "300-640 DCAI", "Implementing Cisco Data Center AI Infrastructure", "ccnpdc");
x("Data Center", "", "CCIE Data Center lab exam", "ccied");
x("Design", "400-007 CCDE", "CCDE written exam", "ccde");
x("Design", "", "CCDE practical exam", "ccde");
x("Enterprise", "200-301 CCNA", "Cisco Certified Network Associate", "ccna", EJ);
x("Enterprise", "350-401 ENCOR", "Implementing Cisco Enterprise Network Core Technologies", "ccnpent,ccieei", EJ);
x("Enterprise", "300-410 ENARSI", "Implementing Cisco Enterprise Advanced Routing and Services", "ccnpent", EJ);
x("Enterprise", "300-415 ENSDWI", "Implementing Cisco Catalyst SD-WAN Solutions", "ccnpent", EJ);
x("Enterprise", "300-420 ENSLD", "Designing Cisco Enterprise Networks", "ccnpent", EJ);
x("Enterprise", "300-440 ENCC", "Designing and Implementing Secure Cloud Connectivity", "ccnpent", EJ);
x("Enterprise", "300-445 ENNA", "Designing and Implementing Enterprise Network Assurance", "ccnpent");
x("Enterprise", "", "CCIE Enterprise Infrastructure lab exam", "ccieei");
x("Field Technician", "800-150 FLDTEC", "Supporting Cisco Devices for Field Technicians", "ft", EJ);
x("Meraki", "500-220 ECMS", "Engineering Cisco Meraki Solutions", "meraki");
x("Security", "350-701 SCOR", "Implementing and Operating Cisco Security Core Technologies", "ccnpsec,cciesec", EJ);
x("Security", "300-710 SNCF", "Securing Networks with Cisco Firewalls", "ccnpsec", EJ);
x("Security", "300-715 SISE", "Implementing and Configuring Cisco Identity Services Engine", "ccnpsec", EJ);
x("Security", "300-740 SSCA", "Designing and Implementing Secure Cloud Access for Users and Endpoints", "ccnpsec");
x("Security", "300-745 SDSI", "Designing Cisco Security Infrastructure", "ccnpsec");
x("Security", "", "CCIE Security lab exam", "cciesec");
x("Service Provider", "350-501 SPCOR", "Implementing and Operating Cisco Service Provider Network Core Technologies", "ccnpsp,cciesp");
x("Service Provider", "300-510 SPRI", "Implementing Cisco Service Provider Advanced Routing Solutions", "ccnpsp");
x("Service Provider", "300-515 SPVI", "Implementing Cisco Service Provider VPN Services", "ccnpsp");
x("Service Provider", "300-540 SPCNI", "Designing and Implementing Cisco Service Provider Cloud Network Infrastructure", "ccnpsp");
x("Service Provider", "", "CCIE Service Provider lab exam", "cciesp");
x("Support Technician", "100-140 CCST IT Support", "Cisco Certified Support Technician (CCST) IT Support", "ccst1", ST);
x("Support Technician", "100-150 CCST Networking", "Cisco Certified Support Technician (CCST) Networking", "ccst2", ST);
x("Support Technician", "100-160 CCST Cybersecurity", "Cisco Certified Support Technician (CCST) Cybersecurity", "ccst3", ST);
x("Wireless", "350-101 WLCOR", "Implementing and Operating Cisco Wireless Core Technologies", "ccnpwl,cciewl");
x("Wireless", "", "CCIE Wireless lab exam", "cciewl");
x("Wireless", "300-110 WLSD", "Designing Cisco Wireless Networks", "ccnpwl");
x("Wireless", "300-120 WLSI", "Implementing Cisco Wireless Advanced Solutions", "ccnpwl");

const PX = [
  ["500-052 UCCXD", "Deploying Cisco Unified Contact Center Express (UCCXD)", E],
  ["500-210 CSPOFE", "Cisco Service Provider Optical Technology Field Engineer Representative", E],
  ["500-442 CCEA", "Administering Cisco Contact Center Enterprise (CCEA)", E],
  ["500-443 CCEAAR", "Advanced Administration and Reporting of Contact Center Enterprise (CCEAAR)", E],
  ["500-444 CCEIT", "Cisco Contact Center Enterprise Implementation and Troubleshooting (CCEIT)", E],
  ["500-445 CCECE", "Implementing Cisco Contact Center Enterprise Chat and Email (CCECE)", E],
  ["500-470 ENSDENG", "Cisco Enterprise Networks SDA, SDWAN and ISE Exam for System Engineers", E],
  ["500-490 ENSDESIGN", "Designing Cisco Enterprise Networks for Field Engineers", E],
  ["500-560 OCSE", "Cisco Networking: On-Premise and Cloud Solutions (OCSE)", EJ],
  ["500-710 VII", "Cisco Video Infrastructure Implementation (VII)", E],
  ["700-150 ICS", "Introduction to Cisco Sales (ICS)", EJ],
  ["700-242 CESF", "Cisco Environmental Sustainability Fundamentals – Stage 1", E],
  ["700-246 CESPB", "Cisco Environmental Sustainability Fundamentals – Stage 2", E],
  ["700-250 SMBS", "Cisco Small and Medium Business Sales (SMBS)", EJ],
  ["700-550 USFAP", "Cisco US Federal Authorized Partner (USFAP)", E],
  ["700-750 SMBE", "Cisco Small and Medium Business Engineer (SMBE)", EJ],
  ["700-805 CRM", "Cisco Renewals Manager (CRM)", EJ],
  ["700-821 IOTSE", "Cisco IoT Essentials for System Engineers (IOTSE)", E],
  ["700-826 IOTAM", "Cisco IoT Essentials for Account Managers (IOTAM)", E],
  ["700-841 IOTASE", "Cisco IoT Advantage for System Engineers (IOTASE)", E],
  ["700-846 IOTAAM", "Cisco IoT Advantage for Account Managers (IOTAAM)", E],
  ["700-905 CHXSE", "Cisco HyperFlex for Systems Engineers (CHXSE)", E],
  ["820-605 DTCSM", "Cisco Customer Success Manager", E],
].map((r) => ({ code: r[0], name: r[1], l: r[2] }));

const PATHS = [
  ["Enterprise networking", ["ccst2", "ccna", "ccnpent", "ccieei"]],
  ["Cybersecurity operations", ["ccst3", "ccnacyb", "ccnpcyb"]],
  ["Network security", ["ccna", "ccnpsec", "cciesec"]],
  ["Automation", ["ccnaauto", "ccnpauto", "cciauto"]],
  ["Data center", ["ccna", "ccnpdc", "ccied"]],
  ["Collaboration", ["ccna", "ccnpcol", "cciecol"]],
  ["Service provider", ["ccna", "ccnpsp", "cciesp"]],
  ["Wireless", ["ccna", "ccnpwl", "cciewl"]],
  ["IT support", ["ccst1", "ccst2", "ccna"]],
];
const GOALS = [
  ["Start an IT career", ["ccst1", "ccst2", "ccna"]],
  ["Get a networking job", ["ccst2", "ccna", "ccnpent"]],
  ["Move into security", ["ccst3", "ccnacyb", "ccnpsec"]],
  ["Learn automation", ["ccna", "ccnaauto", "ccnpauto"]],
  ["Upgrade my current role", ["ccnpent", "ccnpsec", "ccnpdc"]],
];
const TRACKS = [...new Set(CERTS.map((c) => c.track))];
const WEEKS = { Entry: 4, Associate: 10, Professional: 14, Expert: 24, Specialist: 6 };
const HRS = { Entry: 20, Associate: 40, Professional: 60, Expert: 120, Specialist: 25 };
const PRACTICE = {
  Entry: ["Build a small home lab in Cisco Packet Tracer (free).", "Do 15 to 20 minutes of quiz questions every day.", "Explain each topic aloud in your own words."],
  Associate: ["Configure VLANs, OSPF, ACLs, NAT and DHCP in Packet Tracer or CML.", "Write one lab note per topic: goal, commands, result.", "Take a full practice test every weekend and review each wrong answer."],
  Professional: ["Rebuild each topic in a larger lab (CML or EVE-NG) and break it on purpose to troubleshoot.", "Read the official exam blueprint and tick topics off.", "Time yourself on full-length practice tests."],
  Expert: ["Practice full lab scenarios under an 8-hour clock.", "Build a troubleshooting checklist and speed up your configuration.", "Join a study group and review each other's labs."],
  Specialist: ["Work through the vendor documentation and hands-on labs for the platform.", "Take practice tests and review weak topics."],
};
const PILLARS = [
  { id: "skills", label: "Skill Development", c: "#1fa463", line: "Decide which skills to learn and how to improve them.", pts: ["Certifications by level and track", "Technologies and skills per certification", "Hands-on practice guidance"], cta: "Explore skills" },
  { id: "path", label: "Learning Path", c: "#2563eb", line: "Step-by-step: where to start and in which order to go.", pts: ["Six-step journey from account to certificate", "Career paths for every track", "Goal-based starting point"], cta: "See learning paths" },
  { id: "exam", label: "Exam Preparation", c: "#f26b21", line: "Everything you need to prepare for the certification exam.", pts: ["All current Cisco exams and partner exams", "Fees, duration and languages", "Week-by-week study plan with progress tracking"], cta: "Prepare for exams" },
  { id: "career", label: "Career Growth", c: "#8b3fd9", line: "Match certifications to the job role and the next level you want.", pts: ["Job roles for each certification", "Entry to Expert growth ladder", "Experience needed at each level"], cta: "Grow my career" },
];
const NAV = [["", "Home"], ["skills", "Skill Development"], ["path", "Learning Path"], ["exam", "Exam Preparation"], ["career", "Career Growth"], ["mentor", "Mentors"]];
const SECTION = { cert: "skills", track: "skills", plan: "exam" };
const TITLES = { "": "Cisco Mentorship", skills: "Skill Development", path: "Learning Path", exam: "Exam Preparation", career: "Career Growth", mentor: "Mentors" };
const PLAN_KEY = "ilm_cisco_plan";

/* ===================================================================== */
/* HELPERS                                                                */
/* ===================================================================== */
const short = (n) => n.replace("Cisco Certified ", "");
const fee = (f) => (typeof f === "number" ? "$" + f : f);
const exOf = (k) => EX.filter((e) => e.k.includes(k));
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-");
const store = {
  get(k, d) { try { const v = window.localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { window.localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
const prefersReduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===================================================================== */
/* HOOKS + 3D / ANIMATION PRIMITIVES                                      */
/* ===================================================================== */
function useHash() {
  const [hash, setHash] = useState("/");
  useEffect(() => {
    const on = () => setHash(window.location.hash.slice(1) || "/");
    on();
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

/* 3D scroll-reveal for any element */
function Reveal({ as: Tag = "div", className = "", i = 0, children, style, ...rest }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  return (
    <Tag ref={ref} className={`rv${seen ? " in" : ""} ${className}`} style={{ ...style, "--d": `${(i % 6) * 70}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* 3D tilt + glare card (mouse only; touch devices get the reveal animation) */
function Tilt({ as: Tag = "div", className = "", i = 0, children, style, ...rest }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const seen = useInView(ref);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--ry", ((px - 0.5) * 14).toFixed(2) + "deg");
      el.style.setProperty("--rx", ((0.5 - py) * 14).toFixed(2) + "deg");
      el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    });
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };
  return (
    <Tag
      ref={ref}
      className={`tilt rv${seen ? " in" : ""} ${className}`}
      style={{ ...style, "--d": `${(i % 6) * 70}ms` }}
      onPointerMove={move}
      onPointerLeave={leave}
      {...rest}
    >
      <i className="glare" aria-hidden="true" />
      {children}
    </Tag>
  );
}

/* Animated number */
function CountUp({ to }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (prefersReduced()) { setN(to); return; }
    let s = null, raf = 0;
    const f = (t) => {
      if (s == null) s = t;
      const p = Math.min(1, (t - s) / 1300);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{n}</span>;
}

/* Pure CSS 3D cube */
function Cube({ s = 48, c, t = 16, style }) {
  return (
    <div className="cube" style={{ "--s": typeof s === "number" ? s + "px" : s, "--cc": c || "var(--or)", "--t": t + "s", ...style }}>
      {[0, 1, 2, 3, 4, 5].map((n) => <i key={n} />)}
    </div>
  );
}

/* Hero: drag / swipe / auto-rotating 3D ring of the 5 certification levels */
function Ring() {
  const stage = useRef(null);
  const rig = useRef(null);
  const ring = useRef(null);
  const moved = useRef(false);

  useEffect(() => {
    const st = stage.current, rg = rig.current, rn = ring.current;
    if (!st || !rg || !rn) return;
    const reduce = prefersReduced();
    let a = -18, inertia = 0, drag = false, lastX = 0, startX = 0, paused = false, visible = true, raf = 0;
    let last = performance.now();
    const apply = () => { rn.style.transform = `rotateY(${a}deg)`; };
    apply();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(st);

    const tick = (t) => {
      const dt = Math.min(48, t - last);
      last = t;
      if (visible && !drag && !paused) {
        a += (0.015 + inertia) * dt;
        inertia *= Math.pow(0.94, dt / 16);
        apply();
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) raf = requestAnimationFrame(tick);

    const move = (e) => {
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      if (Math.abs(e.clientX - startX) > 6) moved.current = true;
      a += dx * 0.45;
      inertia = (dx * 0.45) / 16;
      apply();
    };
    const up = () => {
      drag = false;
      st.style.cursor = "";
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    const down = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag = true;
      moved.current = false;
      lastX = startX = e.clientX;
      st.style.cursor = "grabbing";
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
    };
    const enter = (e) => { if (e.pointerType === "mouse") paused = true; };
    const leave = () => { paused = false; };

    /* mouse parallax tilt of the whole rig */
    const parallax = (e) => {
      if (e.pointerType !== "mouse" || reduce) return;
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      rg.style.transform = `rotateX(${-10 - py * 16}deg) rotateY(${px * 20}deg)`;
    };

    st.addEventListener("pointerdown", down);
    st.addEventListener("pointerenter", enter);
    st.addEventListener("pointerleave", leave);
    window.addEventListener("pointermove", parallax);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      up();
      st.removeEventListener("pointerdown", down);
      st.removeEventListener("pointerenter", enter);
      st.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointermove", parallax);
    };
  }, []);

  return (
    <div
      className="stage"
      ref={stage}
      role="group"
      aria-label="Certification levels. Drag to rotate."
      onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); moved.current = false; } }}
    >
      <div className="rig" ref={rig}>
        <div className="ring" ref={ring}>
          {LV.map((l, i) => (
            <a key={l} draggable={false} className="panel" href={`#/skills?level=${l}`} style={{ "--c": L[l], "--i": i }}>
              <span className="pn-k">Level {i + 1}</span>
              <span className="pn-code">{LEVEL_CODE[l]}</span>
              <span className="pn-n">{l} · {CERTS.filter((c) => c.lvl === l).length} certs →</span>
            </a>
          ))}
        </div>
        <div className="core"><Cube s="var(--cs)" c="#fff" t={10} /></div>
      </div>
      <div className="floor" aria-hidden="true" />
    </div>
  );
}

/* ===================================================================== */
/* SMALL UI PIECES                                                        */
/* ===================================================================== */
const Tag = ({ t, c }) => <span className="tag" style={c ? { "--c": c } : undefined}>{t}</span>;

function CertCard({ c, i = 0 }) {
  const d = D[c.xi];
  return (
    <Tilt as="a" i={i} href={`#/cert/${c.k}`} className="card" style={{ "--c": L[c.lvl] }}>
      <Tag t={c.lvl} c={L[c.lvl]} />
      <h3>{short(c.name)}</h3>
      <div className="s">{c.track}</div>
      <div className="meta">
        <span>Exams<b>{exOf(c.k).length}</b></span>
        <span>Fee<b>{d ? fee(d[0]) : "—"}</b></span>
        <span>Valid<b>{d ? d[2] : "—"}</b></span>
      </div>
    </Tilt>
  );
}

function ExCard({ e, i = 0 }) {
  const col = L[CK[e.k[0]].lvl];
  return (
    <Tilt as="a" i={i} href={`#/cert/${e.k[0]}`} className="card" style={{ "--c": col }}>
      <Tag t={e.t} c={col} />
      <div className="code">{e.code || "Lab / practical"}</div>
      <h3>{e.name}</h3>
      <div className="s">{e.l}</div>
    </Tilt>
  );
}

function StepRow({ ks }) {
  return (
    <div className="steps">
      {ks.map((k, i) => {
        const c = CK[k], d = D[c.xi];
        return (
          <Tilt as="a" i={i} key={k + i} className="step" href={`#/cert/${k}`} style={{ "--c": L[c.lvl] }}>
            <Tag t={`Step ${i + 1} · ${c.lvl}`} c={L[c.lvl]} />
            <h4>{short(c.name)}</h4>
            <p>{d ? `${d[5]} · ${fee(d[0])}` : c.track}</p>
          </Tilt>
        );
      })}
    </div>
  );
}

function Band({ c, crumb, tg, h }) {
  return (
    <div className="band" style={{ "--c": c }}>
      <div className="deco" aria-hidden="true">
        <div className="fl" style={{ right: "8%", top: "16%", "--k": -0.15, "--fd": "7s" }}><Cube s={56} c="#fff" t={20} /></div>
        <div className="fl hide-sm" style={{ right: "24%", bottom: "12%", "--k": -0.08, "--fd": "9s" }}><Cube s={28} c="#fff" t={14} /></div>
      </div>
      <div className="in">
        <div className="crumb">{crumb}</div>
        <Tag t={tg} />
        <h1>{h}</h1>
      </div>
    </div>
  );
}

const NotFound = () => (
  <div className="wrap">
    <h2>Page not found</h2>
    <p className="lead">This page does not exist.</p>
    <a className="btn ghost" href="#/">Back to home</a>
  </div>
);

/* ===================================================================== */
/* PAGES                                                                  */
/* ===================================================================== */
function Home() {
  return (
    <>
      <section className="hero">
        <div className="deco" aria-hidden="true">
          <i className="orb o1" /><i className="orb o2" />
        
        </div>
        <div className="in hero-grid">
          <div className="copy">
            <h1 className="big">Your mentor for <span className="grad">Cisco certification.</span></h1>
            <p>
              A mentor tells you what to study, how to practice and how to prepare for the exam, so you reach your career goal with a clear direction.
              {" "}{CERTS.length} certifications, {EX.length} career exams, {TRACKS.length} tracks.
            </p>
            <div className="btns">
              <a className="btn primary" href="#/mentor">Get my study plan</a>
              <a className="btn ghost" href="#/path">Where do I start?</a>
            </div>
            <div className="stats">
              <div><b><CountUp to={CERTS.length} />+</b><span>Certifications</span></div>
              <div><b><CountUp to={EX.length} />+</b><span>Career exams</span></div>
              <div><b><CountUp to={TRACKS.length} /></b><span>Tracks</span></div>
            </div>
          </div>
          <Ring />
        </div>
      </section>

      <div className="wrap">
        <Reveal as="h2">How we help you</Reveal>
        <Reveal as="p" className="lead" i={1}>Every page of this portal belongs to one of four areas. Pick the one you need right now.</Reveal>
        <div className="cats">
          {PILLARS.map((p, i) => (
            <Tilt key={p.id} i={i} className="cat" style={{ "--c": p.c }}>
              <span className="num">{i + 1}</span>
              <h3>{p.label}</h3>
              <p>{p.line}</p>
              <ul>{p.pts.map((t) => <li key={t}>{t}</li>)}</ul>
              <a className="btn ghost" href={`#/${p.id}`}>{p.cta}</a>
            </Tilt>
          ))}
        </div>
      </div>

      <div className="wrap t">
        <Reveal as="h2">Example</Reveal>
        <Reveal className="note" i={1}>
          <b>A student wants a Cisco certification.</b> The mentor tells them what to study, how to practice and how to prepare for the exam. Try it: choose a certification on the Mentors page and get your plan.
        </Reveal>
        <Reveal as="h3" style={{ marginTop: 0 }}>Popular first steps</Reveal>
        <div className="grid">{["ccna", "ccst2", "ccnacyb"].map((k, i) => <CertCard key={k} c={CK[k]} i={i} />)}</div>
      </div>
    </>
  );
}

function Skills({ level }) {
  const cur = LV.includes(level) ? level : "All";
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const s = q.toLowerCase();
    return CERTS.filter((c) => (cur === "All" || c.lvl === cur) && (c.name + c.track + (D[c.xi] ? D[c.xi][6] : "")).toLowerCase().includes(s));
  }, [q, cur]);
  return (
    <div className="wrap">
      <h2>Skill Development</h2>
      <p className="lead">Which skills to learn and how to improve them. Every certification lists its technologies, so you can pick skills that match your goal.</p>
      <div className="filters">
        {["All", ...LV].map((v) => (
          <button key={v} className={"pill" + (v === cur ? " on" : "")} onClick={() => { window.location.hash = v === "All" ? "#/skills" : "#/skills?level=" + v; }}>{v}</button>
        ))}
      </div>
      <div className="filters">
        <input className="in" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search certification or skill, e.g. Python, SD-WAN" aria-label="Search" />
      </div>
      <div className="grid">
        {rows.length ? rows.map((c, i) => <CertCard key={c.k} c={c} i={i} />) : <div className="empty">Nothing matches. Clear the search.</div>}
      </div>
    </div>
  );
}

function Path() {
  const journey = [
    ["Create your account", "Use your name exactly as on your ID."],
    ["Choose a certification", "Compare levels, exams and fees against your job goal."],
    ["Take the training", "Study every module, then pass the practice test."],
    ["Buy your exam voucher", "Pay the exam fee for your certification."],
    ["Schedule your exam", "Test center or online, then date and time."],
    ["Pass and get certified", "Record the result and keep your certificate."],
  ];
  const cols = Object.values(L);
  return (
    <div className="wrap">
      <h2>Learning Path</h2>
      <p className="lead">Step-by-step: where to start and in what order. Choose your goal first, then follow the track.</p>
      <h3 style={{ marginTop: 0 }}>Choose your goal</h3>
      {GOALS.map((g) => (
        <div key={g[0]}>
          <h4 style={{ margin: "14px 0 4px" }}>{g[0]}</h4>
          <StepRow ks={g[1]} />
        </div>
      ))}
      <h3>The six-step journey</h3>
      <div className="grid">
        {journey.map((h, i) => (
          <Tilt key={h[0]} i={i} className="card" style={{ "--c": cols[i % 5] }}>
            <div className="code">Step {i + 1}</div>
            <h3>{h[0]}</h3>
            <div className="s">{h[1]}</div>
          </Tilt>
        ))}
      </div>
      <h3>Career paths by track</h3>
      {PATHS.map((p) => (
        <div key={p[0]}>
          <h4 style={{ margin: "14px 0 4px" }}>{p[0]}</h4>
          <StepRow ks={p[1]} />
        </div>
      ))}
    </div>
  );
}

function Exam() {
  const [q, setQ] = useState("");
  const [tr, setTr] = useState("All tracks");
  const rows = useMemo(() => {
    const s = q.toLowerCase();
    return EX.filter((e) => (tr === "All tracks" || e.t === tr) && (e.code + e.name + e.t).toLowerCase().includes(s));
  }, [q, tr]);
  return (
    <div className="wrap">
      <h2>Exam Preparation</h2>
      <p className="lead">Passing one or more exams is the requirement for a Cisco certification. Browse exams, check fees and build your study plan.</p>
      <div className="btns" style={{ marginBottom: 22 }}><a className="btn primary" href="#/mentor">Build my study plan</a></div>
      <div className="filters">
        <input className="in" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by exam number or name" aria-label="Search exams" />
        <select className="in" value={tr} onChange={(e) => setTr(e.target.value)} aria-label="Track">
          <option>All tracks</option>
          {TRACKS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="grid">
        {rows.length ? rows.map((e, i) => <ExCard key={e.id + i} e={e} i={i} />) : <div className="empty">Nothing matches.</div>}
      </div>
      <h3>Partner and channel exams</h3>
      <p className="lead">For Cisco partners, sales, field engineers and specialists. These are not part of the career certification tracks.</p>
      <div className="grid">
        {PX.map((e, i) => (
          <Tilt key={e.code} i={i} className="card" style={{ "--c": "#0e8f9c" }}>
            <Tag t="Partner" c="#0e8f9c" />
            <div className="code">{e.code}</div>
            <h3>{e.name}</h3>
            <div className="s">{e.l}</div>
          </Tilt>
        ))}
      </div>
    </div>
  );
}

function Career() {
  const lines = {
    Entry: "First job: support technician roles. No experience needed.",
    Associate: "Engineer and analyst roles. About 1 year of experience helps.",
    Professional: "Senior engineer roles. 3 to 5 years of experience.",
    Expert: "Architect roles. 5+ years and a hands-on lab exam.",
  };
  return (
    <div className="wrap">
      <h2>Career Growth</h2>
      <p className="lead">Choose the job role you want, then see which certification gets you there and what experience employers expect.</p>
      <h3 style={{ marginTop: 0 }}>Growth ladder</h3>
      <div className="cats">
        {["Entry", "Associate", "Professional", "Expert"].map((l, i) => (
          <Tilt key={l} i={i} className="cat" style={{ "--c": L[l] }}>
            <h3>{l}</h3>
            <p>{lines[l]}</p>
            <div className="s">{CERTS.filter((c) => c.lvl === l).length} certifications</div>
            <a className="btn ghost" style={{ marginTop: 12 }} href={`#/skills?level=${l}`}>View {l}</a>
          </Tilt>
        ))}
      </div>
      <h3>Job roles and the certification for each</h3>
      <div className="grid">
        {CERTS.filter((c) => D[c.xi]).map((c, i) => {
          const d = D[c.xi];
          return (
            <Tilt as="a" key={c.k} i={i} className="card" style={{ "--c": L[c.lvl] }} href={`#/cert/${c.k}`}>
              <Tag t={c.lvl} c={L[c.lvl]} />
              <h3>{d[5]}</h3>
              <div className="s">{short(c.name)}</div>
              <div className="meta"><span>Experience<b>{d[4]}</b></span></div>
            </Tilt>
          );
        })}
      </div>
      <h3>Browse by track</h3>
      <div className="grid">
        {TRACKS.map((t, i) => (
          <Tilt as="a" key={t} i={i} className="card" style={{ "--c": "#2563eb" }} href={`#/track/${slug(t)}`}>
            <h3>{t}</h3>
            <div className="s">{CERTS.filter((c) => c.track === t).length} certifications · {EX.filter((e) => e.t === t).length} exams</div>
          </Tilt>
        ))}
      </div>
    </div>
  );
}

function Mentor() {
  const [pk, setPk] = useState("ccna");
  return (
    <div className="wrap">
      <h2>Mentors</h2>
      <p className="lead">Mentors guide students and working professionals in the right direction: they improve your skills and guide you through certification exam preparation. Choose your target and get a plan.</p>
      <div className="cats">
        {PILLARS.map((p, i) => (
          <Tilt key={p.id} i={i} className="cat" style={{ "--c": p.c }}>
            <h3>{p.label}</h3>
            <p>{p.line}</p>
            <a className="btn ghost" href={`#/${p.id}`}>Open</a>
          </Tilt>
        ))}
      </div>
      <h3>Your personal study plan</h3>
      <div className="filters">
                <select className="in pick" value={pk} onChange={(e) => setPk(e.target.value)} aria-label="Choose certification">
          {LV.map((l) => (
            <optgroup key={l} label={l}>
              {CERTS.filter((c) => c.lvl === l).map((c) => <option key={c.k} value={c.k}>{short(c.name)}</option>)}
            </optgroup>
          ))}
        </select>
        <button className="btn primary" onClick={() => { window.location.hash = "#/plan/" + pk; }}>Get my plan</button>
      </div>
      <div className="s">Pick a certification and press the button.</div>
    </div>
  );
}

function Plan({ k, done, toggle }) {
  const c = CK[k];
  if (!c) return <NotFound />;
  const d = D[c.xi], ex = exOf(k), w = WEEKS[c.lvl];
  const lens = [Math.max(1, Math.round(w * 0.3)), Math.max(1, Math.round(w * 0.4)), Math.max(1, Math.round(w * 0.2))];
  lens.push(Math.max(1, w - lens[0] - lens[1] - lens[2]));
  const names = [
    ["Foundation", "Read the exam blueprint. Learn the core concepts."],
    ["Hands-on lab", "Build and break configurations. Keep lab notes."],
    ["Practice tests", "Full-length timed tests. Fix every weak topic."],
    ["Exam week", "Light revision, rest well, check ID and booking."],
  ];
  let from = 1;
  const rows = names.map((n, i) => {
    const a = from; from += lens[i];
    return { label: lens[i] > 1 ? `Week ${a}–${from - 1}` : `Week ${a}`, title: n[0], text: n[1] };
  });
  const tasks = [
    ...ex.map((e) => "Study: " + (e.code ? e.code + " – " : "") + e.name),
    d ? "Skills lab: " + d[6] : "Hands-on skills lab",
    "Full-length practice test",
    "Final revision",
  ];
  const pc = Math.round((tasks.filter((_, i) => done.includes(i)).length / tasks.length) * 100);
  return (
    <>
      <Band c={L[c.lvl]} crumb={<><a href="#/mentor">Mentors</a> / Study plan</>} tg={c.lvl + " · " + c.track} h={"Study plan: " + short(c.name)} />
      <div className="wrap">
        <div className="facts">
          <Reveal className="fact"><span>Time needed</span><b>About {w} weeks ({HRS[c.lvl]}+ hours)</b></Reveal>
          <Reveal className="fact" i={1}><span>Exam fee</span><b>{d ? fee(d[0]) : "Check with Cisco"}</b></Reveal>
          <Reveal className="fact" i={2}><span>Exam duration</span><b>{d ? d[1] : "—"}</b></Reveal>
          <Reveal className="fact" i={3}><span>Eligibility</span><b>{d ? d[3] : "—"}</b></Reveal>
        </div>
        <div className="plan">
          <Tilt className="box">
            <h4>1. What to study</h4>
            <ul>
              {ex.map((e, i) => <li key={i}>{e.code ? <><b>{e.code}</b> – </> : null}{e.name}</li>)}
              {d ? <li>Skills: {d[6]}</li> : null}
            </ul>
          </Tilt>
          <Tilt className="box" i={1}>
            <h4>2. How to practice</h4>
            <ul>{PRACTICE[c.lvl].map((t) => <li key={t}>{t}</li>)}</ul>
          </Tilt>
          <Tilt className="box" i={2}>
            <h4>3. How to prepare for the exam</h4>
            <ul>
              <li>Finish all topics before you buy the voucher.</li>
              <li>Score 85% or more on practice tests twice in a row.</li>
              <li>Book the exam, then do light revision only.</li>
              {d ? <li>Exam length: {d[1]}. Practice with the same time limit.</li> : null}
            </ul>
          </Tilt>
        </div>
        <h3>Week-by-week schedule</h3>
        {rows.map((r, i) => (
          <Reveal className="week" key={r.title} i={i}>
            <b>{r.label}</b>
            <div><b style={{ minWidth: 0 }}>{r.title}</b><div className="s">{r.text}</div></div>
          </Reveal>
        ))}
        <h3>My checklist</h3>
        <div className="prog" role="progressbar" aria-valuenow={pc} aria-valuemin={0} aria-valuemax={100}><i style={{ width: pc + "%" }} /></div>
        <p className="s" style={{ marginBottom: 12 }}>{pc}% complete. Saved in this browser.</p>
        {tasks.map((t, i) => {
          const on = done.includes(i);
          return (
            <label key={i} className={"chk" + (on ? " on" : "")}>
              <input type="checkbox" checked={on} onChange={(e) => toggle(k, i, e.target.checked)} />
              <span>{t}</span>
            </label>
          );
        })}
        <div className="btns" style={{ marginTop: 24 }}>
          <a className="btn primary" href={`#/cert/${k}`}>Certification details</a>
          <a className="btn ghost" href="#/career">Career options</a>
        </div>
      </div>
    </>
  );
}

function Cert({ k }) {
  const c = CK[k];
  if (!c) return <NotFound />;
  const d = D[c.xi], ex = exOf(k), pi = PATHS.find((p) => p[1].includes(k));
  const facts = d ? [["Exam fee (USD)", fee(d[0])], ["Duration", d[1]], ["Validity", d[2]], ["Eligibility", d[3]], ["Recommended experience", d[4]], ["Best for (career)", d[5]], ["Skills / technologies", d[6]]] : [];
  return (
    <>
      <Band c={L[c.lvl]} crumb={<><a href="#/">Home</a> / <a href="#/skills">Skill Development</a> / {short(c.name)}</>} tg={c.lvl + " · " + c.track} h={c.name} />
      <div className="wrap">
        <div className="btns" style={{ marginBottom: 28 }}><a className="btn primary" href={`#/plan/${k}`}>Get my study plan</a></div>
        {d ? (
          <div className="facts">{facts.map((f, i) => <Reveal className="fact" i={i} key={f[0]}><span>{f[0]}</span><b>{f[1]}</b></Reveal>)}</div>
        ) : (
          <div className="note">Fee, duration and eligibility for this certification are not in the data sheet yet.</div>
        )}
        <h3 style={{ marginTop: 0 }}>Required exams (Exam Preparation)</h3>
        <div className="grid">{ex.map((e, i) => <ExCard key={e.id + i} e={e} i={i} />)}</div>
        <h3>Where it fits (Learning Path)</h3>
        {pi ? <StepRow ks={pi[1]} /> : <p className="lead">This credential is a standalone specialty and is not part of a level-by-level path.</p>}
      </div>
    </>
  );
}

function Track({ s }) {
  const t = TRACKS.find((z) => slug(z) === s);
  if (!t) return <NotFound />;
  return (
    <>
      <Band c="#2563eb" crumb={<><a href="#/">Home</a> / <a href="#/career">Career Growth</a> / Track</>} tg="Track" h={t} />
      <div className="wrap">
        <h3 style={{ marginTop: 0 }}>Certifications</h3>
        <div className="grid">{CERTS.filter((c) => c.track === t).map((c, i) => <CertCard key={c.k} c={c} i={i} />)}</div>
        <h3>Exams</h3>
        <div className="grid">{EX.filter((e) => e.t === t).map((e, i) => <ExCard key={e.id + i} e={e} i={i} />)}</div>
      </div>
    </>
  );
}

/* ===================================================================== */
/* ROOT                                                                   */
/* ===================================================================== */
function CiscoApp({ theme }) {
  const hash = useHash();
  const rootRef = useRef(null);
  const navRef = useRef(null);
  const [doneMap, setDoneMap] = useState({});

  useEffect(() => { setDoneMap(store.get(PLAN_KEY, {})); }, []);
  const toggle = (k, i, on) =>
    setDoneMap((m) => {
      const s = new Set(m[k] || []);
      on ? s.add(i) : s.delete(i);
      const n = { ...m, [k]: [...s] };
      store.set(PLAN_KEY, n);
      return n;
    });

  const [p0, qs = ""] = hash.split("?");
  const [p = "", a] = p0.split("/").filter(Boolean);
  const sec = SECTION[p] || p;
  const level = new URLSearchParams(qs).get("level");

  /* title + scroll to top on route change */
  useEffect(() => {
    document.title = (TITLES[p] || "Cisco") + " | ILM ORA";
    window.scrollTo(0, 0);
  }, [p0, qs, p]);

  /* keep the active tab centred in the scrolling nav (phones / small tablets) */
  useEffect(() => {
    const nav = navRef.current;
    const el = nav && nav.querySelector(".on");
    if (el) nav.scrollTo({ left: el.offsetLeft - nav.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [sec]);

  /* scroll value drives the 3D parallax of floating cubes */
  useEffect(() => {
    if (prefersReduced()) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => rootRef.current && rootRef.current.style.setProperty("--scroll", Math.min(window.scrollY, 1500)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", on); };
  }, []);

  let page;
  if (p === "cert") page = <Cert k={a} />;
  else if (p === "plan") page = <Plan k={a} done={doneMap[a] || []} toggle={toggle} />;
  else if (p === "track") page = <Track s={a} />;
  else if (p === "") page = <Home />;
  else if (p === "skills") page = <Skills level={level} />;
  else if (p === "path") page = <Path />;
  else if (p === "exam") page = <Exam />;
  else if (p === "career") page = <Career />;
  else if (p === "mentor") page = <Mentor />;
  else page = <NotFound />;

  return (
        <div className={"ilm" + (theme === "dark" ? " dark" : "")} ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <header className="top">
        <div className="in">
          
          <nav className="tabs" ref={navRef} aria-label="Sections">
            {NAV.map((n) => (
              <a key={n[0]} href={"#/" + n[0]} className={sec === n[0] ? "on" : ""} aria-current={sec === n[0] ? "page" : undefined}>{n[1]}</a>
            ))}
          </nav>
        </div>
      </header>
      <main key={p0} className="page" tabIndex={-1}>{page}</main>
      <footer>Practice and mentoring guide on ILM ORA. Official Cisco credentials are issued by Cisco after a proctored exam. Fees are from the data sheet and can change.</footer>
    </div>
  );
}
/** PublicLayout leaves a small gap under the fixed Navbar. Increase this number if a gap shows, decrease it if the strip hides under the Navbar. */
const NAV_GAP_FIX = 16;

export default function IlmoraCisco({
  theme: themeProp,
  toggleTheme: toggleProp,
  setShowLoginModal,
  scrollToSection,
  embedded = false,
}) {
  const [localTheme, setLocalTheme] = useState("light");
  useEffect(() => {
    try {
      const t = window.localStorage.getItem("theme") || window.localStorage.getItem("ilmora-theme");
      if (t) setLocalTheme(t);
    } catch {}
  }, []);

  const theme = themeProp ?? localTheme;
  const toggleTheme =
    toggleProp ??
    (() => {
      const n = localTheme === "dark" ? "light" : "dark";
      setLocalTheme(n);
      try { window.localStorage.setItem("theme", n); } catch {}
    });
  const openLogin = setShowLoginModal ?? (() => { window.location.href = "/ilm-demo"; });
  const scrollTo =
    scrollToSection ??
    ((id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));

  if (embedded) return <CiscoApp theme={theme} />;

  return (
    <PublicLayout
      theme={theme}
      toggleTheme={toggleTheme}
      setShowLoginModal={openLogin}
      scrollToSection={scrollTo}
    >
      <div style={{ marginTop: -NAV_GAP_FIX }}>
        <CiscoApp theme={theme} />
      </div>
    </PublicLayout>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.ilm{--cream:#f6ede6;--card:#fff;--tx:#1f1b18;--mut:#6a5f57;--or:#f97316;--line:#e7d9cd;--w:1200px;--ease:cubic-bezier(.2,.8,.2,1);
  position:relative;background:var(--card);color:var(--tx);color-scheme:light;
   font:14px/1.5 'Plus Jakarta Sans','Segoe UI',system-ui,-apple-system,sans-serif;
  min-height:100vh;min-height:100dvh;overflow-x:clip;-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-font-smoothing:antialiased}
.ilm.dark{--cream:#0c0c14;--card:#13131e;--tx:#f1f5f9;--mut:#94a3b8;--line:rgba(255,255,255,.12);color-scheme:dark}

:where(.ilm) *,:where(.ilm) *::before,:where(.ilm) *::after{box-sizing:border-box}
:where(.ilm) h1,:where(.ilm) h2,:where(.ilm) h3,:where(.ilm) h4,:where(.ilm) p,:where(.ilm) ul,:where(.ilm) ol{margin:0}
:where(.ilm) ul,:where(.ilm) ol{padding:0}
:where(.ilm) a{color:inherit;text-decoration:none}
:where(.ilm) button,:where(.ilm) input,:where(.ilm) select{font:inherit;color:inherit}
:where(.ilm) button{cursor:pointer}
.ilm :focus-visible{outline:3px solid #2563eb;outline-offset:2px;border-radius:6px}

/* ---------- layout + type ---------- */
.ilm .wrap{max-width:var(--w);margin:0 auto;padding:clamp(18px,3.5vw,34px) max(clamp(16px,4vw,28px),env(safe-area-inset-left)) clamp(18px,3.5vw,34px) max(clamp(16px,4vw,28px),env(safe-area-inset-right))}
.ilm .wrap.t{padding-top:0}
.ilm h2{font-size:clamp(1.2rem,2.4vw,1.7rem);letter-spacing:-.02em;line-height:1.15;margin-bottom:8px}
.ilm h3{font-size:1rem;margin:20px 0 10px}
.ilm .lead{color:var(--mut);max-width:70ch;margin-bottom:16px;font-size:.92rem}
.ilm .s{font-size:.82rem;color:var(--mut)}

/* ---------- header ---------- */
.ilm .top{background:rgba(26,26,30,.93);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);color:#fff;position:sticky;top:var(--navoff,0px);z-index:30;padding-top:env(safe-area-inset-top)}
.ilm .top .in{max-width:var(--w);margin:0 auto;padding:0 max(16px,env(safe-area-inset-left)) 0 max(16px,env(safe-area-inset-right));display:flex;align-items:center;gap:14px}
.ilm .logo{display:flex;align-items:center;gap:10px;font-weight:800;white-space:nowrap;padding:12px 0}
.ilm .logo b{color:var(--or)}
.ilm .mini{display:inline-block;width:16px;height:16px;perspective:90px}
.ilm .tabs{display:flex;overflow-x:auto;scrollbar-width:none;flex:1;-webkit-overflow-scrolling:touch}
.ilm .tabs::-webkit-scrollbar{display:none}
.ilm .tabs a{flex:none;padding:0 14px;min-height:50px;display:flex;align-items:center;font-weight:600;font-size:.92rem;border-bottom:3px solid transparent;white-space:nowrap;transition:border-color .25s,background .25s}
.ilm .tabs a.on{border-color:var(--or)}
.ilm .tabs a:hover{border-color:rgba(249,115,22,.5);background:rgba(255,255,255,.06)}

/* ---------- 3D primitives ---------- */
.ilm .cube{position:relative;width:var(--s,48px);height:var(--s,48px);transform-style:preserve-3d;animation:cmSpin var(--t,16s) linear infinite}
.ilm .cube i{position:absolute;inset:0;border:2px solid var(--cc,var(--or));border-radius:6px;background:linear-gradient(135deg,color-mix(in srgb,var(--cc,var(--or)) 28%,transparent),color-mix(in srgb,var(--cc,var(--or)) 6%,transparent));box-shadow:inset 0 0 14px color-mix(in srgb,var(--cc,var(--or)) 35%,transparent)}
.ilm .cube i:nth-child(1){transform:translateZ(calc(var(--s)/2))}
.ilm .cube i:nth-child(2){transform:rotateY(180deg) translateZ(calc(var(--s)/2))}
.ilm .cube i:nth-child(3){transform:rotateY(90deg) translateZ(calc(var(--s)/2))}
.ilm .cube i:nth-child(4){transform:rotateY(-90deg) translateZ(calc(var(--s)/2))}
.ilm .cube i:nth-child(5){transform:rotateX(90deg) translateZ(calc(var(--s)/2))}
.ilm .cube i:nth-child(6){transform:rotateX(-90deg) translateZ(calc(var(--s)/2))}
@keyframes cmSpin{from{transform:rotateX(20deg) rotateY(0)}to{transform:rotateX(380deg) rotateY(360deg)}}
@keyframes cmFloat{from{transform:translate3d(0,-12px,0)}to{transform:translate3d(0,16px,0)}}
@keyframes cmShine{to{background-position:100% 0}}
@keyframes cmPulse{from{transform:translateX(-50%) scale(.85);opacity:.7}to{transform:translateX(-50%) scale(1.05);opacity:1}}
@keyframes cmRise{
  from{opacity:0;transform:perspective(900px) translate3d(0,42px,0) rotateX(-22deg) scale(.96)}
  to{opacity:1;transform:perspective(900px) translate3d(0,0,0) rotateX(0) rotateY(0) scale(1)}}
@keyframes cmPageIn{from{opacity:0;transform:perspective(1400px) translate3d(0,22px,0) rotateX(6deg)}to{opacity:1;transform:none}}
@keyframes cmRingIn{from{opacity:0;transform:rotateX(-10deg) scale(.55) translateZ(-300px)}}
@keyframes cmPop{0%{transform:perspective(600px) rotateX(-40deg) scale(.96)}100%{transform:none}}

.ilm .deco{position:absolute;inset:0;pointer-events:none;overflow:hidden}
.ilm .fl{position:absolute;perspective:700px;translate:0 calc(var(--scroll,0)*var(--k,-.1)*1px);animation:cmFloat var(--fd,8s) ease-in-out infinite alternate}
.ilm .orb{position:absolute;border-radius:50%;filter:blur(46px);animation:cmFloat 10s ease-in-out infinite alternate}
.ilm .orb.o1{width:clamp(160px,30vw,320px);height:clamp(160px,30vw,320px);left:-6%;top:-8%;background:var(--or);opacity:.22}
.ilm .orb.o2{width:clamp(140px,26vw,280px);height:clamp(140px,26vw,280px);right:-4%;bottom:-10%;background:#2563eb;opacity:.2;animation-delay:-4s}

/* scroll reveal + tilt */
.ilm .rv:not(.in){opacity:0}
.ilm .rv.in{animation:cmRise .85s var(--ease) backwards;animation-delay:var(--d,0ms)}
.ilm .tilt{position:relative;transform-style:preserve-3d;transform:perspective(900px) translate3d(0,var(--lift,0px),0) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .18s ease-out,box-shadow .3s;will-change:transform}
.ilm .glare{position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.26),transparent 58%)}
.ilm .tilt :is(.code,h3,h4,.tag){transition:transform .25s var(--ease)}
.ilm .tilt:active{--lift:1px}
@media(hover:hover) and (pointer:fine){
  .ilm .tilt:hover{--lift:-6px;box-shadow:0 26px 40px -18px rgba(0,0,0,.45)}
  .ilm .tilt:hover>.glare{opacity:1}
  .ilm .tilt:hover :is(.code,h3,h4,.tag){transform:translateZ(24px)}
  .ilm .cat:hover .num{transform:translateZ(28px) rotateY(360deg)}
}

/* ---------- hero ---------- */
.ilm .hero{position:relative;overflow:hidden;background:radial-gradient(900px 480px at 88% -10%,color-mix(in srgb,var(--or) 20%,transparent),transparent 62%),radial-gradient(760px 420px at -8% 112%,color-mix(in srgb,#2563eb 15%,transparent),transparent 62%),var(--cream)}
.ilm .hero .in{position:relative;z-index:1;max-width:var(--w);margin:0 auto;padding:clamp(20px,4vw,40px) max(clamp(16px,4vw,28px),env(safe-area-inset-left)) clamp(16px,3vw,32px) max(clamp(16px,4vw,28px),env(safe-area-inset-right))}
.ilm .hero-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(6px,3vw,28px);align-items:center}
.ilm .big{font-size:clamp(1.6rem,3.8vw,2.5rem);line-height:1.1;letter-spacing:-.025em;font-weight:800;max-width:20ch}
.ilm .grad{background:linear-gradient(90deg,var(--or),#8b3fd9 55%,#2563eb);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;animation:cmShine 6s linear infinite alternate}
.ilm .hero .copy>p{max-width:58ch;color:var(--mut);margin:12px 0 18px;font-size:.95rem}
.ilm .stats{display:flex;flex-wrap:wrap;gap:10px clamp(16px,3vw,30px);margin-top:20px}
.ilm .stats b{display:block;font-size:clamp(1.4rem,3vw,2rem);font-weight:800;letter-spacing:-.02em;line-height:1;margin-bottom:3px}
.ilm .stats > div > span{font-size:.78rem;font-weight:600;color:var(--mut)}

/* 3D ring */
.ilm .stage{--pw:clamp(118px,30vw,200px);--r:calc(var(--pw)*.95);--cs:clamp(38px,9vw,64px);position:relative;height:clamp(260px,64vw,420px);perspective:1100px;touch-action:pan-y;cursor:grab;user-select:none;-webkit-user-select:none;-webkit-tap-highlight-color:transparent}
.ilm .rig{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(-10deg);transition:transform .25s ease-out;animation:cmRingIn 1.1s var(--ease) backwards}
.ilm .ring{position:absolute;left:50%;top:50%;width:var(--pw);height:calc(var(--pw)*1.25);margin:calc(var(--pw)*-.625) 0 0 calc(var(--pw)*-.5);transform-style:preserve-3d}
.ilm .panel{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(10px,2.4vw,16px);border-radius:clamp(14px,2vw,20px);color:#fff;
  background:linear-gradient(155deg,var(--c),color-mix(in srgb,var(--c) 52%,#000));border:1px solid rgba(255,255,255,.35);
  box-shadow:0 20px 40px -14px color-mix(in srgb,var(--c) 70%,#000),inset 0 1px 0 rgba(255,255,255,.45);
  transform:rotateY(calc(var(--i)*72deg)) translateZ(var(--r));backface-visibility:hidden;-webkit-backface-visibility:hidden;-webkit-user-drag:none}
.ilm .pn-k{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.85}
.ilm .pn-code{font-size:clamp(1.05rem,4.2vw,1.7rem);font-weight:800;letter-spacing:-.02em;line-height:1.1}
.ilm .pn-n{font-size:clamp(.66rem,2.2vw,.8rem);font-weight:600;opacity:.95}
.ilm .core{position:absolute;left:50%;top:50%;width:var(--cs);height:var(--cs);margin:calc(var(--cs)/-2) 0 0 calc(var(--cs)/-2);transform-style:preserve-3d}
.ilm .floor{position:absolute;left:50%;bottom:3%;width:62%;height:clamp(16px,4vw,32px);transform:translateX(-50%);background:radial-gradient(closest-side,rgba(0,0,0,.38),transparent);filter:blur(6px);animation:cmPulse 6s ease-in-out infinite alternate;pointer-events:none}

/* ---------- buttons ---------- */
.ilm .btn{display:inline-flex;align-items:center;justify-content:center;border:2px solid transparent;border-radius:12px;padding:8px 18px;min-height:40px;font-size:.9rem;font-weight:700;background:none;text-align:center;transition:transform .15s,box-shadow .2s,background .2s,color .2s}
.ilm .btn.primary{background:var(--or);color:#fff;box-shadow:0 5px 0 #b8500a,0 14px 22px -10px rgba(249,115,22,.7)}
.ilm .btn.primary:hover{transform:translateY(-2px);box-shadow:0 7px 0 #b8500a,0 18px 26px -10px rgba(249,115,22,.7)}
.ilm .btn.primary:active{transform:translateY(4px);box-shadow:0 1px 0 #b8500a,0 4px 8px -4px rgba(249,115,22,.7)}
.ilm .btn.ghost{border-color:var(--tx)}
.ilm .btn.ghost:hover{background:var(--tx);color:var(--card);transform:translateY(-2px)}
.ilm .btn.ghost:active{transform:translateY(1px)}

/* ---------- cards ---------- */
.ilm .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,250px),1fr));gap:14px}
.ilm .card{display:block;border:1px solid var(--line);border-radius:16px;padding:14px 14px 14px 20px;background:var(--card)}
.ilm .card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;border-radius:18px 0 0 18px;background:var(--c,#2563eb)}
.ilm .card h3{font-size:.95rem;margin:8px 0 3px}
.ilm .tag{display:inline-block;font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:99px;background:color-mix(in srgb,var(--c,#2563eb) 15%,var(--card));color:var(--c,#2563eb)}
.ilm .code{font-size:1.15rem;font-weight:800;color:var(--c);margin-top:10px}
.ilm .meta{display:flex;flex-wrap:wrap;gap:6px 16px;font-size:.74rem;color:var(--mut);border-top:1px solid var(--line);padding-top:10px;margin-top:12px}
.ilm .meta b{display:block;color:var(--tx);font-size:.88rem}
.ilm .cats{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:18px}
.ilm .cat{border-radius:16px;padding:16px;background:var(--cream);border-top:5px solid var(--c)}
.ilm .cat h3{margin:8px 0 6px}
.ilm .cat p{color:var(--mut);font-size:.9rem;margin-bottom:14px}
.ilm .cat ul{list-style:none;display:grid;gap:6px;margin-bottom:16px;font-size:.88rem}
.ilm .cat li::before{content:"✓ ";color:var(--c);font-weight:800}
.ilm .num{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--c);color:#fff;font-weight:800;transition:transform .8s var(--ease)}

/* ---------- filters ---------- */
.ilm .filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
.ilm .pill{border:2px solid var(--line);background:var(--card);border-radius:99px;padding:7px 16px;font-weight:700;font-size:.85rem;min-height:38px;transition:transform .15s,background .2s,color .2s,border-color .2s}
.ilm .pill:hover{transform:translateY(-2px)}
.ilm .pill.on{background:var(--tx);color:var(--card);border-color:var(--tx)}
.ilm input.in,.ilm select.in{background:var(--card);border:2px solid var(--line);border-radius:10px;padding:10px 14px;min-height:44px;font-size:16px;width:100%;transition:border-color .2s,box-shadow .2s}
.ilm input.in:focus,.ilm select.in:focus{border-color:var(--or);box-shadow:0 0 0 4px color-mix(in srgb,var(--or) 20%,transparent)}
.ilm .filters input.in{flex:1 1 220px;width:auto}
.ilm .filters select.in{flex:0 1 240px;width:auto}
.ilm .filters select.in.pick{flex:0 1 340px;width:340px;max-width:100%;font-size:14px;min-height:40px;padding:8px 12px;cursor:pointer}
.ilm select.in option,.ilm select.in optgroup{font-size:14px;background:var(--card);color:var(--tx)}
.ilm select.in optgroup{font-weight:700}

/* ---------- band (inner page header) ---------- */
.ilm .band{position:relative;overflow:hidden;background:linear-gradient(135deg,var(--c),color-mix(in srgb,var(--c) 55%,#000));color:#fff}
.ilm .band .in{position:relative;z-index:1;max-width:var(--w);margin:0 auto;padding:clamp(18px,3.5vw,30px) max(clamp(16px,4vw,28px),env(safe-area-inset-left)) clamp(18px,3.5vw,30px) max(clamp(16px,4vw,28px),env(safe-area-inset-right))}
.ilm .band h1{font-size:clamp(1.3rem,3vw,2rem);line-height:1.15;margin-top:8px;max-width:28ch}
.ilm .band .tag{background:rgba(255,255,255,.2);color:#fff}
.ilm .crumb{font-size:.84rem;opacity:.9}
.ilm .crumb a{text-decoration:underline}

/* ---------- facts / steps / plan ---------- */
.ilm .facts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:14px;margin-bottom:28px}
.ilm .fact{background:var(--cream);border-radius:14px;padding:14px 18px}
.ilm .fact span{display:block;font-size:.72rem;font-weight:700;color:var(--mut)}
.ilm .note{background:color-mix(in srgb,#f59e0b 14%,var(--card));border:1px solid color-mix(in srgb,#f59e0b 45%,var(--card));border-radius:12px;padding:12px 16px;font-size:.9rem;margin-bottom:22px}
.ilm .steps{display:flex;gap:18px;overflow-x:auto;padding:12px 6px 26px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}
.ilm .step{flex:0 0 min(76vw,240px);scroll-snap-align:start;border:2px solid var(--c);border-radius:16px;padding:16px;background:var(--card)}
.ilm .step h4{margin:8px 0 4px;font-size:.95rem}
.ilm .step p{font-size:.82rem;color:var(--mut)}
.ilm .step:not(:last-child)::after{content:"→";position:absolute;right:-18px;top:46%;color:var(--mut)}
.ilm .plan{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px}
.ilm .box{border:1px solid var(--line);border-radius:16px;padding:18px;background:var(--card)}
.ilm .box h4{margin-bottom:8px}
.ilm .box ul,.ilm .box ol{padding-left:18px;display:grid;gap:6px;font-size:.9rem}
.ilm .box ul{list-style:disc}
.ilm .box ol{list-style:decimal}
.ilm .week{display:flex;gap:12px;border-left:3px solid var(--or);padding:2px 0 14px 14px}
.ilm .week b{min-width:84px}
.ilm .chk{display:flex;gap:10px;padding:12px 14px;border:2px solid var(--line);border-radius:12px;margin-bottom:10px;cursor:pointer;align-items:center;transition:border-color .25s,background .25s}
.ilm .chk.on{border-color:#1fa463;background:color-mix(in srgb,#1fa463 14%,var(--card));animation:cmPop .45s var(--ease)}
.ilm .chk input{width:20px;height:20px;flex:none;accent-color:#1fa463}
.ilm .prog{height:12px;background:var(--line);border-radius:99px;overflow:hidden;margin:10px 0}
.ilm .prog i{display:block;height:100%;background:linear-gradient(90deg,#1fa463,#2563eb);transition:width .6s var(--ease)}
.ilm .empty{padding:30px;text-align:center;color:var(--mut);grid-column:1/-1}
.ilm footer{border-top:1px solid var(--line);padding:22px max(16px,env(safe-area-inset-left)) calc(22px + env(safe-area-inset-bottom));text-align:center;color:var(--mut);font-size:.82rem}
.ilm .page{transform-origin:50% 0;animation:cmPageIn .6s var(--ease) backwards}

/* ===================================================================== */
/* RESPONSIVE                                                             */
/* ===================================================================== */
@media(min-width:601px) and (max-width:900px){
  .ilm .stage{--pw:clamp(170px,26vw,210px);height:clamp(340px,52vw,420px)}
  .ilm .hero .copy>p{max-width:56ch}
}
@media(min-width:901px){
  .ilm .hero-grid{grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr)}
    .ilm .stage{--pw:clamp(130px,14vw,180px);--cs:clamp(44px,5vw,64px);height:clamp(280px,29vw,380px)}
}
@media(min-width:1600px){
    .ilm{--w:1400px;font-size:14.5px}
  .ilm .stage{--pw:clamp(190px,14vw,250px);height:clamp(420px,30vw,540px)}
}
@media(min-width:2000px){
    .ilm{--w:1640px;font-size:15px}
  .ilm .grid{grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))}
}
@media(max-width:900px){
  .ilm .tabs{-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 24px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 24px),transparent)}
}
@media(max-width:600px){
  .ilm .hide-sm{display:none}
  .ilm .band h1{max-width:none}
  .ilm .grid,.ilm .cats,.ilm .plan{gap:14px}
  .ilm .week{flex-direction:column;gap:2px}
  .ilm .stats{gap:12px 22px}
}
@media(max-width:480px){
  .ilm .btns .btn{flex:1 1 100%}
  .ilm .tabs a{padding:0 12px;font-size:.88rem}
  .ilm .filters select.in,.ilm .filters input.in{flex:1 1 100%}
  .ilm .step{flex-basis:min(78vw,240px)}
}
@media(max-width:360px){
  .ilm{font-size:14px}
  .ilm .tabs a{padding:0 10px}
  .ilm .logo{font-size:.9rem}
  .ilm .stage{--pw:112px}
}
@media(max-height:500px) and (orientation:landscape){
  .ilm .stage{height:250px;--pw:clamp(110px,22vh,150px)}
  .ilm .hero .in{padding-top:20px;padding-bottom:20px}
}
@media(hover:none){
  .ilm .tabs a:hover{background:none}
}
@media(prefers-reduced-motion:reduce){
  .ilm *,.ilm *::before,.ilm *::after{animation:none!important;transition:none!important}
  .ilm .rv:not(.in){opacity:1}
  .ilm .tilt{transform:none!important}
  .ilm .fl{translate:none}
}
`;