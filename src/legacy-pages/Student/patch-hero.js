// Usage:  node patch-hero.js path/to/OnboardingLanding.jsx
// Creates OnboardingLanding.jsx.bak and patches the file in place.
const fs = require('fs');
const file = process.argv[2] || 'OnboardingLanding.jsx';
let src = fs.readFileSync(file, 'utf8');

if (src.includes('class="hero hero2"')) {
  console.log('Already patched. Nothing to do.');
  process.exit(0);
}

const NEW_CSS = String.raw`
#ilm-onboarding .hero2{padding:34px 0 28px;position:relative}
#ilm-onboarding .h2g{display:grid;grid-template-columns:1fr 1fr;align-items:center;position:relative}
#ilm-onboarding .h2g:before{content:"";position:absolute;left:50%;top:4%;bottom:4%;width:1px;background:var(--bd)}
#ilm-onboarding .h2l{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 44px 0 8px}
#ilm-onboarding .h2r{text-align:center;padding:0 8px 0 44px}
#ilm-onboarding .gpill{display:inline-flex;align-items:center;gap:10px;padding:8px 18px;border-radius:999px;border:1px solid var(--bd);background:var(--bg);font-weight:700;font-size:1rem;margin-bottom:12px;box-shadow:var(--sh)}
#ilm-onboarding .gpill b{color:var(--or)}
#ilm-onboarding .hero2 .eb{border:1px solid color-mix(in srgb,var(--or) 45%,transparent);background:color-mix(in srgb,var(--or) 8%,transparent);padding:7px 18px;font-size:.9rem;margin-bottom:12px}
#ilm-onboarding .hero2 .eb:before{display:none}
#ilm-onboarding .hero2 h1{font-size:clamp(2.2rem,4.4vw,3.6rem)!important;line-height:1.05!important;letter-spacing:-1.5px!important;font-weight:700!important}
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
`;

const NEW_HEADER = String.raw`<header class="hero hero2" id="top"><div class="bgfx" aria-hidden="true"><i class="a"></i><i class="b"></i><i class="c"></i></div><div class="w">
<div class="h2g">
<div class="h2l">
<div class="gpill" id="gp"></div>
<span class="eb">AI-powered LMS · Learn · Teach · Manage</span>
<h1>One platform.<br><span class="o">Learn, teach</span> <span class="g">and manage.</span></h1>
<p class="lead" id="lead"></p>
<div class="seg" role="group" aria-label="Choose experience"><button data-r="individual" aria-pressed="true">Individual</button><button data-r="corporate" aria-pressed="false">Corporate</button></div>
<div class="stats"><div class="st rv" style="--i:0"><b data-n="500" data-d="0" data-s="+">500+</b><span>Early Learners</span><i class="bar" style="--w:85%"></i></div><div class="st rv" style="--i:1"><b data-n="15" data-d="0" data-s="+">15+</b><span>Expert Mentors</span><i class="bar" style="--w:55%"></i></div><div class="st rv" style="--i:2"><b data-n="20" data-d="0" data-s="+">20+</b><span>Courses Live</span><i class="bar" style="--w:65%"></i></div><div class="st rv" style="--i:3"><b data-n="4.9" data-d="1" data-s="★">4.9★</b><span>Average Rating</span><i class="bar" style="--w:98%"></i></div></div>
</div>
<div class="h2r"><h2>Choose Your Experience</h2><p>Explore real product dashboards and get started in seconds.</p><div class="xg" id="xg"></div></div>
</div>
<div class="hfw"><div class="frame" id="hf"></div></div>
</div></header>`;

const NEW_JS = String.raw`
(function(){
 var CH=[["graduation","Student","LMS Dashboard","#8B5CF6","Student"],["users","Trainer","Teaching Dashboard","#22C55E","Trainer"],["handshake","Business & Partnership","Growth Dashboard","#F97316","Business & Partnership"],["grid","ILM ORA Workspace","Team Collaboration","#3B82F6","Workspace"],["calendar","ILM ORA Calendar","Scheduling & Events","#EC4899","Calendar"],["building","Corporate","Enterprise Dashboard","#94A3B8","",1]];
 var xg=$("xg");
 if(xg){xg.innerHTML=CH.map(function(c,i){return'<button type="button" class="xc'+(c[5]?' soon':'')+'" data-xc="'+i+'" style="--c:'+c[3]+'"'+(c[5]?' disabled':'')+'>'+(c[5]?'<span class="xb">COMING SOON</span>':'')+'<span class="xi">'+svgIcon(c[0])+'</span><strong>'+e(c[1])+'</strong><small>'+e(c[2])+'</small></button>'}).join("")}
 ROOT.addEventListener("click",function(ev){
  var b=ev.target.closest("[data-xc]");if(!b||b.disabled)return;
  var lab=CH[+b.dataset.xc][4];
  function find(){var bs=ROOT.querySelectorAll("button");for(var i=0;i<bs.length;i++){if(bs[i].closest("#xg"))continue;if(bs[i].textContent.trim()===lab)return bs[i]}}
  var t=find();
  if(!t){var ind=ROOT.querySelector('.seg button[data-r="individual"]');if(ind){ind.click();t=find()}}
  if(t){t.click();var a=find()||t;a.scrollIntoView({behavior:"smooth",block:"center"})}
 });
 function gp(){var h=new Date().getHours(),m=h>=5&&h<12,a=h>=12&&h<17,g=m?"Good Morning":a?"Good Afternoon":"Good Evening",ic=m?"☀️":a?"🌤️":"🌙",n=getWelcomeUserName(),el=$("gp");
  if(el)el.innerHTML='<span aria-hidden="true">'+ic+'</span><span>'+g+(n&&n!=="there"?', <b>'+escapeWelcomeText(n)+'</b>':'')+' 👋</span>'}
 gp();setInterval(gp,60000);
})();
`;

fs.writeFileSync(file + '.bak', src);

// 1) CSS: insert before the closing backtick of the CSS const
let n1 = 0;
src = src.replace(/`;(\s*)const HTML = `/, (m, ws) => { n1++; return NEW_CSS + '`;' + ws + 'const HTML = `'; });

// 2) HTML: replace the old <header class="hero" id="top"> ... </header>
let n2 = 0;
src = src.replace(/<header class="hero" id="top">[\s\S]*?<\/header>/, () => { n2++; return NEW_HEADER; });

// 3) JS: insert at the end of SCRIPT, before its closing backtick
let n3 = 0;
src = src.replace(/(\}\)\(\);\s*)`;(\s*export default function)/, (m, a, b) => { n3++; return a + NEW_JS + '`;' + b; });

if (n1 !== 1 || n2 !== 1 || n3 !== 1) {
  console.error('Patch FAILED (css:' + n1 + ', html:' + n2 + ', js:' + n3 + '). File not modified. Backup is at ' + file + '.bak');
  process.exit(1);
}

fs.writeFileSync(file, src);
console.log('Patched OK. Backup: ' + file + '.bak');