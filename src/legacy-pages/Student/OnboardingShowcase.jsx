// ILM ORA — Onboarding role sections (Student / Trainer / Business / Workspace / Calendar)
// Additive module. Used by OnboardingLanding.jsx via mountShowcase(root) + SHOWCASE_CSS.
// Media is discovered by filename prefix from src/assets/Onboarding (extension-agnostic).

const B = '/onboarding-media/';
const IMG_EXT = ['webp', 'jpg', 'jpeg', 'png', 'avif'];
const VID_EXT = ['mp4', 'webm', 'mov'];
// NOTE: ab sirf base name (extension ke bina)
const M = {
  stI: B + 'student',   stV: B + 'student',
  trI: B + 'trainer',   trV: B + 'trainer',
  buI: B + 'business',  buV: B + 'business',
  wsI: B + 'workspace', wsV: B + 'workspace',
  caI: B + 'calendar',
  weI: B + 'welcome',   weV: B + 'welcome',
  hoI: B + 'how',
  wyI: B + 'why',
  ctI: B + 'cta',       ctV: B + 'cta',
};

// Agar clean naam (student.webp) na mile, to ye original filenames try honge.
// Naam galat ho to sirf yahan sahi spelling kar do (extension ke bina).
const ALIAS = {
  student:   ['vitaly-gariev-fTYbq_2B97s-unsplash', '4017223-uhd_3840_2160_30fps'],
  trainer:   ['poddar-group-of-institutions-ereEoYDIl20-unsplash', '6987045-hd_1920_1080_17fps'],
  business:  ['cherrydeck-UpsEF48wAgk-unsplash', '7647620-hd_1920_1080_30fps'],
  workspace: ['vitaly-gariev-pVyb2zYnl1c-unsplash', '6985335-uhd_3840_2160_25fps'],
  calendar:  ['dylan-gillis-KdeqA3aTnBY-unsplash'],
    welcome:   ['ashutosh-gupta-NASjMHJ9Ohl-unsplash', 'ashutosh-gupta-NASjMHJ9Ohl-unsplash (1)', 'ashutosh-gupta-NASjMHJ9Ohl-unsplash-1', 'ashutosh-gupta-NASjMHJ9Ohl-unsplash - Copy', 'ashutosh-gupta-NASjMHJ9OhI-unsplash', 'ashutosh-gupta-NASjMHJ9OhI-unsplash (1)', '4017223-uhd_3840_2160_30fps'],
  how:       ['redd-francisco-PTRzqc_h1r4-unsplash'],
  why:       ['vitaly-gariev-TSyD0nGc0Bs-unsplash'],
  cta:       ['kris-tian-TI_lwVpN_qE-unsplash', '5272272-hd_1920_1080_25fps'],
  hero:      [],
};

// HEAD request ki jagah file ko actual load karke check karta hai
const probeImg = (url) => new Promise((res) => {
  const i = new Image();
  i.onload = () => res(true);
  i.onerror = () => res(false);
  i.src = url;
});
const probeVid = (url) => new Promise((res) => {
  const v = document.createElement('video');
  let done = false;
  const fin = (ok) => {
    if (done) return;
    done = true;
    v.removeAttribute('src');
    try { v.load(); } catch (e) { /* ignore */ }
    res(ok);
  };
  v.preload = 'metadata';
  v.onloadedmetadata = () => fin(true);
  v.onerror = () => fin(false);
  setTimeout(() => fin(false), 8000);
  v.src = url;
});

// base name + extensions try karke jo file mile uska URL de deta hai
const find = (() => {
  const memo = {};
  return (base, exts) => {
    const isVid = exts.includes('mp4');
    const k = (isVid ? 'v|' : 'i|') + base;
    return memo[k] || (memo[k] = (async () => {
      const name = base.replace(B, '');
      const names = [name, ...(ALIAS[name] || [])];
      for (const n of names) {
        for (const x of exts) {
          const url = B + n + '.' + x;
          if (await (isVid ? probeVid(url) : probeImg(url))) return url;
        }
      }
      return '';
    })());
  };
})();

function hydrateMedia(scope, startVideo) {
  scope.querySelectorAll('img[data-base]').forEach((img) => {
    find(img.dataset.base, IMG_EXT).then((u) => {
      if (u) img.src = u; else img.parentElement.classList.add('nomedia');
    });
  });
  scope.querySelectorAll('video[data-vbase]').forEach((v) => {
    find(v.dataset.vbase, VID_EXT).then((u) => {
      if (!u) return v.remove();
      v.dataset.src = u;
      const s = v.closest('.rs,.rb');
      if (s && s.classList.contains('vis')) startVideo(v);
    });
  });
}


const IC = {
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  video: '<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/>',
  live: '<circle cx="12" cy="12" r="3"/><path d="M7 7a7 7 0 0 0 0 10M17 7a7 7 0 0 1 0 10"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 2h6v4H9zM9 12h6M9 16h4"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/>',
  spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  map: '<path d="M1 6l7-3 8 3 7-3v15l-7 3-8-3-7 3zM8 3v15M16 6v15"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.2 13.9 7 23l5-3 5 3-1.2-9.1"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 6-7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  cal: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M10 21h4"/>',
  bld: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 21v-6h6v6M8 7h2M14 7h2M8 11h2M14 11h2"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  pen: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  play: '<path d="M6 4l14 8-14 8z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  x: '<path d="m18 6-12 12M6 6l12 12"/>',
};
const ico = (n) =>
  '<svg class="rs-i" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  (IC[n] || IC.layers) + '</svg>';

// feature = [icon, label shown, sidebar label inside the real portal preview]
const ROLES = [
  {
    id: 'student', tab: 'Student', rev: false, alt: false,
    eb: 'Student · Learn, Grow & Achieve',
    h: 'Learn Smarter. Build Skills. Shape Your Future.',
    p: 'One classroom for everything you study: courses, live and recorded classes, assignments, quizzes, notes and AI help, with your progress tracked from the first lesson to the certificate.',
    flow: ['Learn', 'Attend', 'Practice', 'Improve', 'Prepare', 'Achieve'],
    feat: [
      ['book', 'My Courses', 'My Courses'], ['video', 'Video Lectures', 'Video Lectures'],
      ['live', 'Live Classes', 'Live Classes'], ['file', 'Documents', 'Documents'],
      ['clip', 'Assignments', 'Assignments'], ['check', 'Assessments', 'Assessments'],
      ['help', 'Quiz History', 'Quiz History'], ['spark', 'Notebook AI', 'Notebook AI'],
      ['map', 'Career Roadmap', 'Roadmap'], ['file', 'Resume Builder', 'Resume Builder'],
      ['award', 'Certificates', 'Certificates'], ['chart', 'Skill Map & Progress', 'Skill Map'],
    ],
    img: M.stI, vid: M.stV, demo: 'Watch Demo',
    cards: [['prog', 'a'], ['live', 'b'], ['cert', 'c']],
  },
  {
    id: 'trainer', tab: 'Trainer', rev: true, alt: true,
    eb: 'Trainer · Teach, Inspire & Manage',
    h: 'Teach. Inspire. Manage. Grow.',
    p: 'Plan courses, run batches and live sessions, publish lectures, mark attendance, grade work and read performance reports. Your whole teaching day lives in one dashboard.',
    flow: ['Create', 'Organise', 'Teach', 'Evaluate', 'Analyse', 'Grow'],
    feat: [
      ['layers', 'Batch Management', 'Batch Management'], ['book', 'Course Management', 'Course Management'],
      ['live', 'Live Classes', 'Live Dashboard'], ['video', 'Video Content', 'Upload Videos'],
      ['users', 'Student Reports', 'Student Reports'], ['check', 'Attendance', 'Attendance'],
      ['clip', 'Assessments', 'Assessments'], ['chart', 'Performance Analytics', 'Performance Analysis'],
      ['pen', 'Whiteboard', 'Whiteboard'], ['spark', 'AI Companion', 'AI Companion'],
      ['cal', 'Schedule & Workspace', 'Workspace'], ['help', 'Doubts', 'Doubts Management'],
    ],
    img: M.trI, vid: M.trV, demo: 'Watch Demo',
    cards: [['batch', 'a'], ['bars', 'b'], ['live2', 'c']],
  },
  {
    id: 'business', tab: 'Business & Partnership', rev: false, alt: false,
    eb: 'Business & Partnership · Manage & Scale',
    h: 'Manage Your Organisation. Empower Your People. Scale Your Growth.',
    p: 'Set up departments, branches and batches, control who can access what, run company training and measure results with reports and analytics. Partnership tools are shown as planned.',
    flow: ['Organise', 'Manage', 'Train', 'Control', 'Measure', 'Expand'],
    feat: [
      ['bld', 'Organisation Manager', 'Overview'], ['users', 'User Management', 'All Users'],
      ['layers', 'Departments', 'Departments'], ['bld', 'Branches', 'Branches'],
      ['layers', 'Batches', 'Batches'], ['book', 'Corporate Courses', 'All Courses'],
      ['shield', 'Access Control', 'Access Control'], ['award', 'Certificates', 'Certificates'],
      ['chart', 'Analytics & Reports', 'Reports'], ['chart', 'Usage Analytics', 'Usage Analytics'],
      ['check', 'Approvals & Revenue', 'Dashboard'], ['link', 'Partnership (planned)', ''],
    ],
    img: M.buI, vid: M.buV, demo: 'Watch Demo',
    cards: [['kpi', 'a'], ['net', 'b'], ['bars', 'c']],
  },
  {
    id: 'workspace', tab: 'Workspace', rev: true, alt: true,
    eb: 'ILM ORA Workspace · Shared by every role',
    h: 'One Workspace for Meetings, Mail and Scheduling',
    p: 'A separate public product for individuals and organisations: events, booking pages, instant meetings, AI summaries, email, contacts and integrations in one place.',
    flow: ['Plan', 'Meet', 'Summarise', 'Follow up'],
    feat: [
      ['cal', 'Events', 'Events'], ['link', 'Booking Pages', 'Booking Pages'],
      ['video', 'Instant Meeting', 'Instant Meeting'], ['spark', 'Summaries', 'Summaries'],
      ['mail', 'Email', 'Email'], ['users', 'Contacts', 'Contacts'],
      ['bell', 'Reminders', 'Reminders'], ['gear', 'Integrations', 'Integrations'],
    ],
    img: M.wsI, vid: M.wsV, demo: 'Watch Demo',
    cards: [['meet', 'a'], ['sum', 'b'], ['mail', 'c']],
  },
  {
    id: 'calendar', tab: 'Calendar', rev: false, alt: false,
    eb: 'ILM ORA Calendar · Shared by every role',
    h: 'Never Miss a Class, Meeting or Deadline',
    p: 'Plan classes and meetings, publish booking pages, set your availability and sync with Google Calendar, all in the same calendar for learners, trainers and teams.',
    flow: ['Schedule', 'Book', 'Sync', 'Remind'],
    feat: [
      ['cal', 'Calendar', 'Calendar'], ['link', 'Booking Pages', 'Booking Pages'],
      ['clock', 'Availability', 'Availability'], ['gear', 'Calendar Sync', 'Calendar Sync'],
      ['bell', 'Reminders', 'Reminders'], ['cal', 'My Schedules', 'My Schedules'],
    ],
    img: M.caI, vid: '', demo: 'Try Live Demo',
    cards: [['date', 'a'], ['rem', 'b'], ['sync', 'c']],
  },
];

// ---- floating preview cards (sample data, clearly labelled in caption) ----
const ring = (v) =>
  '<svg class="rs-rg" viewBox="0 0 36 36" style="--v:' + v + '"><circle class="b" cx="18" cy="18" r="15.9"/><circle class="f" cx="18" cy="18" r="15.9" pathLength="100"/></svg>';
const bars = (a) => '<div class="rs-bars">' + a.map((h, i) => '<i style="--h:' + h + '%;--d:' + i + '"></i>').join('') + '</div>';
const CARDS = {
  prog: () => ring(78) + '<div>Course progress<small><b data-n="78">0</b>% complete</small></div>',
  live: () => '<span class="rs-dot"></span><div>Live class starting<small>React Components · 10:00</small></div>',
  cert: () => '<span class="rs-ci">' + ico('award') + '</span><div>Certificate issued<small>Just now</small></div>',
  batch: () => '<span class="rs-ci">' + ico('layers') + '</span><div>Batch FS-2026-A<small><b data-n="28">0</b> students · Running</small></div>',
  bars: () => '<div>Weekly progress' + bars([40, 55, 48, 70, 82, 76, 90]) + '</div>',
  live2: () => '<span class="rs-dot"></span><div>Live now<small><b data-n="26">0</b> learners joined</small></div>',
  kpi: () => '<span class="rs-ci">' + ico('users') + '</span><div>Active learners<small><b data-n="603">0</b> this month</small></div>',
  net: () => '<svg class="rs-net" viewBox="0 0 80 50"><g stroke="currentColor" stroke-width="1.2" opacity=".5"><path d="M40 25 15 10M40 25 65 10M40 25 15 40M40 25 65 40"/></g><g fill="currentColor"><circle cx="40" cy="25" r="6"/><circle cx="15" cy="10" r="4"/><circle cx="65" cy="10" r="4"/><circle cx="15" cy="40" r="4"/><circle cx="65" cy="40" r="4"/></g></svg><div>3 branches<small>9 departments</small></div>',
  meet: () => '<span class="rs-ci">' + ico('video') + '</span><div>Instant meeting<small>Quick sync · ready</small></div>',
  sum: () => '<span class="rs-ci">' + ico('spark') + '</span><div>AI summary<small>3 action items</small></div>',
  mail: () => '<span class="rs-ci">' + ico('mail') + '</span><div>Email<small><b data-n="12">0</b> unread</small></div>',
  date: () => '<span class="rs-ci">' + ico('cal') + '</span><div>Tue, 3 Nov<small>2 classes today</small></div>',
  rem: () => '<span class="rs-ci">' + ico('bell') + '</span><div>Reminder<small>Parent-teacher · 4:00 PM</small></div>',
  sync: () => '<span class="rs-ci">' + ico('check') + '</span><div>Calendar synced<small>Google Calendar</small></div>',
};

const section = (r) => {
  const flow = r.flow.map((s, i) => '<span style="--d:' + i + '">' + s + '</span>').join('<em>›</em>');
  const feats = r.feat.map((f, i) =>
    '<button type="button" class="rs-f" style="--d:' + i + '" data-tab="' + r.tab + '" data-side="' + f[2] + '"' + (f[2] ? '' : ' disabled') + '>' + ico(f[0]) + '<span>' + f[1] + '</span></button>').join('');
  const media = r.vid
  ? '<img class="rs-img" data-base="' + r.img + '" alt="' + r.tab + ' experience"><video class="rs-vid" data-vbase="' + r.vid + '" muted loop playsinline preload="none" aria-hidden="true"></video>'
  : '<img class="rs-img" data-base="' + r.img + '" alt="' + r.tab + ' experience">';
  const demoBtn = r.vid
    ? '<button type="button" class="btn" data-demo="' + r.id + '">' + ico('play') + ' ' + r.demo + '</button>'
    : '<button type="button" class="btn" data-tab="' + r.tab + '" data-side="Calendar">' + ico('play') + ' ' + r.demo + '</button>';
  return (
    '<section class="rs' + (r.alt ? ' alt' : '') + '" id="role-' + r.id + '"><div class="w rs-g' + (r.rev ? ' rev' : '') + '">' +
    '<div class="rs-t"><span class="eb">' + r.eb + '</span><h2>' + r.h + '</h2><p>' + r.p + '</p>' +
    '<div class="rs-flow">' + flow + '</div><div class="rs-fg">' + feats + '</div>' +
    '<div class="rs-cta"><button type="button" class="btn p" data-tab="' + r.tab + '" data-side="">' + 'Explore Dashboard ' + ico('arrow') + '</button>' + demoBtn + '</div></div>' +
    '<div class="rs-m"><div class="rs-fr">' + media + '</div>' +
    r.cards.map((c, i) => '<div class="rs-c ' + c[1] + '" style="--d:' + i + '">' + CARDS[c[0]]() + '</div>').join('') +
    '<p class="rs-note">Sample preview. Open the dashboard to explore the real screens.</p></div></div></section>'
  );
};

export const SHOWCASE_CSS = `
#ilm-onboarding .rs{padding:36px 0}
#ilm-onboarding .rs.alt{background:color-mix(in srgb,var(--bg) 70%,transparent)}
#ilm-onboarding .rs-g{display:grid;grid-template-columns:1fr 1.05fr;gap:44px;align-items:center}
#ilm-onboarding .rs-g.rev .rs-m{order:-1}
#ilm-onboarding .rs-t h2{font-size:clamp(1.6rem,3vw,2.3rem);line-height:1.15;letter-spacing:-.8px;margin:6px 0 10px;color:var(--tx)}
#ilm-onboarding .rs-t>p{color:var(--mu);font-size:1rem;line-height:1.6;max-width:560px}
#ilm-onboarding .rs-flow{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;margin:16px 0 14px;font-size:.78rem;font-weight:700}
#ilm-onboarding .rs-flow span{padding:4px 11px;border-radius:99px;background:color-mix(in srgb,var(--or) 12%,var(--bg));color:var(--or)}
#ilm-onboarding .rs-flow em{font-style:normal;color:var(--mu)}
#ilm-onboarding .rs-fg{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:8px}
#ilm-onboarding .rs-f{display:flex;align-items:center;gap:9px;text-align:left;padding:9px 12px;border-radius:12px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);font-weight:600;font-size:.83rem;line-height:1.2;font-family:inherit;cursor:pointer;transition:transform .2s,border-color .2s,box-shadow .2s}
#ilm-onboarding .rs-f:hover:not(:disabled){transform:translateY(-2px);border-color:var(--or);box-shadow:0 10px 20px -12px rgba(249,115,22,.5)}
#ilm-onboarding .rs-f:disabled{opacity:.6;cursor:default}
#ilm-onboarding .rs-f .rs-i{color:var(--or);width:18px;height:18px}
#ilm-onboarding .rs-f:nth-child(even) .rs-i{color:var(--gr)}
#ilm-onboarding .rs-cta{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
#ilm-onboarding .rs-cta .btn .rs-i{width:16px;height:16px}
#ilm-onboarding .rs-m{position:relative;padding:14px}
#ilm-onboarding .rs-m:before{content:"";position:absolute;inset:0;border-radius:30px;background:radial-gradient(60% 60% at 20% 20%,rgba(249,115,22,.22),transparent),radial-gradient(60% 60% at 85% 85%,rgba(22,163,74,.22),transparent);animation:rs-glow 9s ease-in-out infinite alternate}
@keyframes rs-glow{to{transform:scale(1.04) translate(6px,-6px)}}
#ilm-onboarding .rs-fr{position:relative;border-radius:24px;overflow:hidden;aspect-ratio:4/3;background:#172033;box-shadow:0 30px 60px -28px rgba(23,32,51,.6),0 0 0 1px color-mix(in srgb,var(--tx) 8%,transparent)}
#ilm-onboarding .rs-fr img,#ilm-onboarding .rs-fr video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1),opacity .6s}
#ilm-onboarding .rs-fr video{opacity:0}
#ilm-onboarding .rs-fr video.on{opacity:1}
#ilm-onboarding .rs-m:hover .rs-fr img,#ilm-onboarding .rs-m:hover .rs-fr video{transform:scale(1.05)}
#ilm-onboarding .rs-c{position:absolute;z-index:3;display:flex;align-items:center;gap:9px;padding:9px 13px;border-radius:14px;background:var(--bg);border:1px solid var(--bd);box-shadow:0 14px 30px -12px rgba(15,23,42,.4);font-size:.78rem;font-weight:700;line-height:1.25;color:var(--tx);animation:rs-fl 5s ease-in-out infinite;animation-delay:calc(var(--d)*-1.6s)}
#ilm-onboarding .rs-c small{display:block;font-weight:500;color:var(--mu);font-size:.68rem}
#ilm-onboarding .rs-c.a{left:-6px;top:16%}
#ilm-onboarding .rs-c.b{right:-6px;top:8%}
#ilm-onboarding .rs-c.c{right:8%;bottom:6%}
@keyframes rs-fl{50%{transform:translateY(-8px)}}
#ilm-onboarding .rs-ci{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:color-mix(in srgb,var(--or) 14%,var(--bg));color:var(--or);flex:none}
#ilm-onboarding .rs-dot{width:10px;height:10px;border-radius:50%;background:#22C55E;flex:none;animation:onb-pulse 1.6s infinite}
#ilm-onboarding .rs-rg{width:34px;height:34px;transform:rotate(-90deg);flex:none}
#ilm-onboarding .rs-rg circle{fill:none;stroke-width:4.5}
#ilm-onboarding .rs-rg .b{stroke:var(--bd)}
#ilm-onboarding .rs-rg .f{stroke:var(--or);stroke-linecap:round;stroke-dasharray:0 100;transition:stroke-dasharray 1.6s cubic-bezier(.3,.7,.2,1) .3s}
#ilm-onboarding .vis .rs-rg .f{stroke-dasharray:var(--v) 100}
#ilm-onboarding .rs-bars{display:flex;align-items:flex-end;gap:4px;height:38px;margin-top:5px;min-width:96px}
#ilm-onboarding .rs-bars i{flex:1;height:0;border-radius:3px 3px 0 0;background:linear-gradient(var(--or),var(--gr));transition:height .9s cubic-bezier(.3,.7,.2,1) calc(var(--d)*80ms + .3s)}
#ilm-onboarding .vis .rs-bars i{height:var(--h)}
#ilm-onboarding .rs-net{width:56px;height:36px;color:var(--gr);flex:none}
#ilm-onboarding .rs-note{position:absolute;left:22px;bottom:-4px;font-size:.68rem;color:var(--mu);z-index:2}
#ilm-onboarding .rs-js .rs-t>*{opacity:0;transform:translateY(16px);transition:opacity .6s,transform .6s}
#ilm-onboarding .vis .rs-t>*{opacity:1;transform:none}
#ilm-onboarding .vis .rs-t>*:nth-child(2){transition-delay:.08s}
#ilm-onboarding .vis .rs-t>*:nth-child(3){transition-delay:.16s}
#ilm-onboarding .vis .rs-t>*:nth-child(4){transition-delay:.24s}
#ilm-onboarding .vis .rs-t>*:nth-child(5){transition-delay:.32s}
#ilm-onboarding .rs-js .rs-m{opacity:0;transform:translateX(24px) scale(.98);transition:opacity .8s .15s,transform .8s .15s}
#ilm-onboarding .rs-js .rs-g.rev .rs-m{transform:translateX(-24px) scale(.98)}
#ilm-onboarding .vis .rs-m,#ilm-onboarding .vis .rs-g.rev .rs-m{opacity:1;transform:none}
#ilm-onboarding .rs-mod{position:fixed;inset:0;z-index:100;background:rgba(10,14,24,.82);display:grid;place-items:center;padding:16px}
#ilm-onboarding .rs-mod>div{position:relative;width:min(960px,100%);border-radius:18px;overflow:hidden;background:#000}
#ilm-onboarding .rs-mod video{display:block;width:100%;max-height:80vh}
#ilm-onboarding .rs-mod button{position:absolute;top:10px;right:10px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(0,0,0,.65);color:#fff;cursor:pointer;display:grid;place-items:center}
@media(max-width:900px){#ilm-onboarding .rs-g{grid-template-columns:1fr;gap:22px}
#ilm-onboarding .rs-g.rev .rs-m{order:0}
#ilm-onboarding .rs-c.a{left:4px}#ilm-onboarding .rs-c.b{right:4px}
#ilm-onboarding .rs-m,#ilm-onboarding .rs-g.rev .rs-m{transform:translateY(18px)}
#ilm-onboarding .vis .rs-m,#ilm-onboarding .vis .rs-g.rev .rs-m{transform:none}}
@media(max-width:560px){#ilm-onboarding .rs{padding:22px 0}
#ilm-onboarding .rs-fg{grid-template-columns:1fr 1fr}
#ilm-onboarding .rs-c{padding:7px 10px;font-size:.72rem}
#ilm-onboarding .rs-c.c{display:none}
#ilm-onboarding .rs-cta .btn{flex:1 1 100%;justify-content:center}}
@media(prefers-reduced-motion:reduce){#ilm-onboarding .rs-c,#ilm-onboarding .rs-m:before{animation:none}
#ilm-onboarding .rs-t>*,#ilm-onboarding .rs-m,#ilm-onboarding .rs-g.rev .rs-m{opacity:1;transform:none;transition:none}
#ilm-onboarding .rs-bars i{height:var(--h)}
#ilm-onboarding .rs-rg .f{stroke-dasharray:var(--v) 100}}
#ilm-onboarding .rb{padding:26px 0}
#ilm-onboarding .rb-f{position:relative;border-radius:26px;overflow:hidden;min-height:360px;background:#172033;box-shadow:0 30px 60px -30px rgba(23,32,51,.6)}
#ilm-onboarding .rb-f img,#ilm-onboarding .rb-f video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.7,.2,1),opacity .6s}
#ilm-onboarding .rb-f video{opacity:0}
#ilm-onboarding .rb-f video.on{opacity:1}
#ilm-onboarding .rb-f:hover img,#ilm-onboarding .rb-f:hover video{transform:scale(1.04)}
#ilm-onboarding .rb-f:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(15,23,42,.72),rgba(15,23,42,.28) 55%,rgba(15,23,42,0) 85%)}
#ilm-onboarding .rb-f img,#ilm-onboarding .rb-f video,#ilm-onboarding .rs-fr img,#ilm-onboarding .rs-fr video{object-fit:cover;object-position:center 35%}
#ilm-onboarding .rb-o{position:relative;z-index:2;max-width:560px;padding:56px 44px;color:#fff;opacity:0;transform:translateY(18px);transition:opacity .7s,transform .7s}
#ilm-onboarding .rb.vis .rb-o{opacity:1;transform:none}
#ilm-onboarding .rb-o h2{color:#fff!important;font-size:clamp(1.5rem,2.8vw,2.2rem)!important;margin:8px 0 10px}
#ilm-onboarding .rb-o p{color:rgba(255,255,255,.88)!important;font-size:1rem}
#ilm-onboarding .rb-o .eb{background:rgba(255,255,255,.16);color:#fff}
#ilm-onboarding .rb-o .btn{border-color:transparent}
#ilm-onboarding .rb-o .btn.p{background:#F97316;border-color:#F97316}
@media(max-width:700px){#ilm-onboarding .rb-f{min-height:320px}#ilm-onboarding .rb-o{padding:32px 20px}}
@media(prefers-reduced-motion:reduce){#ilm-onboarding .rb-o{opacity:1;transform:none;transition:none}}
/* ===== COMPACT PASS: every section smaller, text left / media right ===== */
#ilm-onboarding section{padding:16px 0}
#ilm-onboarding .sh{margin-bottom:10px}
#ilm-onboarding .sh p{font-size:.85rem!important;margin-top:4px}
#ilm-onboarding .sh .eb{margin-bottom:6px;padding:3px 10px;font-size:.7rem}

/* Live Demo */
#ilm-onboarding #features{padding:14px 0 10px}
#ilm-onboarding #features .w{max-width:1060px}
#ilm-onboarding #features .sh h2{font-size:1.3rem!important}
#ilm-onboarding #features .sh p{display:none}
#ilm-onboarding #features .tabs{margin-bottom:8px}
#ilm-onboarding #features .tabs button{padding:5px 12px;font-size:.8rem}
#ilm-onboarding #features .show .frame{border-radius:16px}
#ilm-onboarding #features .cap{padding:6px 12px;font-size:.74rem}

/* Role sections: sab same layout, text LEFT, image/video RIGHT */
#ilm-onboarding .rs{padding:18px 0}
#ilm-onboarding .rs-g{grid-template-columns:1fr 1fr;gap:28px}
#ilm-onboarding .rs-g.rev .rs-m{order:0!important}
#ilm-onboarding .rs-t h2{font-size:clamp(1.25rem,2.2vw,1.7rem);margin:4px 0 6px;letter-spacing:-.5px}
#ilm-onboarding .rs-t>p{font-size:.88rem;line-height:1.5}
#ilm-onboarding .rs-flow{margin:10px 0;font-size:.7rem}
#ilm-onboarding .rs-flow span{padding:3px 9px}
#ilm-onboarding .rs-fg{grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:6px}
#ilm-onboarding .rs-f{padding:6px 10px;font-size:.76rem;border-radius:10px;gap:7px}
#ilm-onboarding .rs-f .rs-i{width:15px;height:15px}
#ilm-onboarding .rs-cta{margin-top:12px}
#ilm-onboarding .rs-cta .btn{padding:8px 16px;font-size:.84rem}
#ilm-onboarding .rs-m{padding:8px}
#ilm-onboarding .rs-fr{aspect-ratio:16/10;border-radius:18px}
#ilm-onboarding .rs-fr img,#ilm-onboarding .rs-fr video{object-position:center 35%}
#ilm-onboarding .rs-c{padding:6px 10px;font-size:.72rem;border-radius:12px}

/* Photo/video bands: chhote, text left, right side clear image */
#ilm-onboarding .rb{padding:10px 0}
#ilm-onboarding .rb-f,#ilm-onboarding .rb-f{min-height:230px;border-radius:20px}
#ilm-onboarding .rb-o{padding:28px 36px;max-width:520px}
#ilm-onboarding .rb-o h2{font-size:clamp(1.2rem,2.2vw,1.7rem)!important;margin:4px 0 6px}
#ilm-onboarding .rb-o p{font-size:.88rem!important}
#ilm-onboarding .rb-o .btn{padding:8px 16px;font-size:.84rem}
#ilm-onboarding .rb-f:before{background:linear-gradient(90deg,rgba(15,23,42,.78),rgba(15,23,42,.3) 50%,rgba(15,23,42,0) 80%)}

/* Baaki sections (products, how, why, faq) */
#ilm-onboarding .card.pc{min-height:0;padding:12px 14px}
#ilm-onboarding .pgr{margin-bottom:14px}
#ilm-onboarding .stp{padding:10px 14px}

@media(max-width:900px){
  #ilm-onboarding .rs-g{grid-template-columns:1fr;gap:12px}
  #ilm-onboarding .rb-f{min-height:200px}
}
/* ===== HERO: left text / right live dashboard ===== */
#ilm-onboarding .hero{padding:26px 0 14px}
#ilm-onboarding .hero .hg{display:grid;grid-template-columns:1fr 1.25fr;gap:30px;align-items:center;text-align:left}
#ilm-onboarding .hero .hg>div:first-child{display:block}
#ilm-onboarding .hero .hg>div:first-child:before{content:"AI-powered LMS · Learn · Teach · Manage";display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.04em;color:var(--or);background:color-mix(in srgb,var(--or) 12%,var(--bg));border-radius:99px;padding:4px 12px;margin-bottom:10px}
#ilm-onboarding .hero .hg h1{font-size:clamp(1.8rem,3.2vw,2.7rem)!important;line-height:1.12!important;letter-spacing:-1px!important;margin-bottom:0}
#ilm-onboarding .hero .hg p.lead{margin:10px 0 14px;font-size:.95rem!important;max-width:480px}
#ilm-onboarding .hero .hg .cta-row{justify-content:flex-start;gap:10px}
#ilm-onboarding .hero .hg .choose{align-items:flex-start}
#ilm-onboarding .hero .hg .seg button{padding:8px 18px;font-size:.88rem}
#ilm-onboarding .hero .hg .cta-row>.btn.p{padding:10px 16px;font-size:.88rem}
#ilm-onboarding .hero .hg .stats{order:0;max-width:none;width:100%;margin-top:16px;gap:8px;grid-template-columns:repeat(4,1fr)}
#ilm-onboarding .hero .hg .st{padding:8px 10px}
#ilm-onboarding .hero .hg .st b{font-size:1.15rem}
#ilm-onboarding .hero .hg .st span{font-size:.7rem}
#ilm-onboarding .hero .hfw{order:0;max-width:none;width:100%;margin:0}
#ilm-onboarding .hero .hg #hf{border-radius:18px}
#ilm-onboarding .hero .fch{padding:6px 10px;font-size:.7rem}
#ilm-onboarding .hero .fch.a{left:-10px;top:30%}
#ilm-onboarding .hero .fch.b{right:-8px;top:6%}
#ilm-onboarding .hero .fch.c{right:6%;bottom:-10px}

/* ===== LIVE DEMO: left text + tabs, right dashboard ===== */
#ilm-onboarding #features{padding:18px 0}
#ilm-onboarding #features>.w{display:grid;grid-template-columns:300px 1fr;gap:12px 28px;align-items:start;max-width:1240px}
#ilm-onboarding #features .sh{grid-column:1;grid-row:1;text-align:left;margin:0}
#ilm-onboarding #features .sh h2{font-size:1.5rem!important}
#ilm-onboarding #features .sh h2:after{margin:8px 0 0}
#ilm-onboarding #features .sh p{display:block;font-size:.84rem!important;margin:8px 0 0;max-width:none}
#ilm-onboarding #features .tabs{grid-column:1;grid-row:2;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:6px;margin:0}
#ilm-onboarding #features .tabs button{text-align:left;border-radius:12px;padding:9px 14px;font-size:.86rem}
#ilm-onboarding #features .show{grid-column:2;grid-row:1/3}
@media(max-width:900px){
  #ilm-onboarding .hero .hg{grid-template-columns:1fr;gap:16px}
  #ilm-onboarding #features>.w{grid-template-columns:1fr}
  #ilm-onboarding #features .sh,#ilm-onboarding #features .tabs,#ilm-onboarding #features .show{grid-column:1;grid-row:auto}
  #ilm-onboarding #features .tabs{flex-direction:row;flex-wrap:wrap}
}
/* ===== HERO v3: centered, no dashboard, big Individual/Corporate selector ===== */
#ilm-onboarding .hero{position:relative;padding:36px 0 20px;background:radial-gradient(640px 240px at 12% 0%,rgba(249,115,22,.16),transparent 70%),radial-gradient(640px 240px at 92% 8%,rgba(22,163,74,.14),transparent 70%)}
#ilm-onboarding .hero .hg{display:block;text-align:center}
#ilm-onboarding .hero .hfw{display:none!important}
#ilm-onboarding .hero .hg>div:first-child{display:block;max-width:900px;margin:0 auto}
#ilm-onboarding .hero .hg>div:first-child:before{content:"AI-powered LMS · Learn · Teach · Manage";display:inline-block;font-size:.74rem;font-weight:700;letter-spacing:.04em;color:var(--or);background:color-mix(in srgb,var(--or) 12%,var(--bg));border:1px solid color-mix(in srgb,var(--or) 30%,transparent);border-radius:99px;padding:5px 14px;margin-bottom:12px}
#ilm-onboarding .hero .hg h1{font-size:clamp(2rem,4.6vw,3.4rem)!important;line-height:1.1!important;letter-spacing:-1.5px!important}
#ilm-onboarding .hero .hg h1 .o{color:var(--or);-webkit-text-fill-color:var(--or)}
#ilm-onboarding .hero .hg p.lead{margin:12px auto 20px;max-width:620px;font-size:1.02rem!important}
#ilm-onboarding .hero .hg .cta-row{flex-direction:column;align-items:center;gap:14px}
#ilm-onboarding .hero .hg .choose{align-items:center;gap:8px;width:100%}
#ilm-onboarding .hero .hg .cx{font-size:.74rem}
#ilm-onboarding .seg{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:7px;border-radius:20px;width:min(560px,100%);background:var(--bg);box-shadow:0 14px 34px -18px rgba(15,23,42,.3)}
#ilm-onboarding .seg button{display:flex;flex-direction:column;align-items:center;gap:2px;padding:13px 16px;border-radius:14px;font-size:1.05rem;transition:.2s}
#ilm-onboarding .seg button:after{content:"Student · Trainer · Business";font-size:.7rem;font-weight:500;opacity:.8}
#ilm-onboarding .seg button[data-r=corporate]:after{content:"Admin · Organisation · Reports"}
#ilm-onboarding .seg button:not([aria-pressed=true]):hover{background:color-mix(in srgb,var(--or) 8%,var(--bg2))}
#ilm-onboarding .hero .hg .cta-row>.btn.p{padding:11px 22px;font-size:.92rem}
#ilm-onboarding .hero .hg .stats{max-width:760px;margin:20px auto 0;grid-template-columns:repeat(4,1fr);gap:10px}
#ilm-onboarding .hero .hg .st{text-align:center;padding:10px 8px}
#ilm-onboarding .hero .hg .st b{font-size:1.3rem}
#ilm-onboarding .hero .hg .st span{font-size:.74rem}

/* ===== LIVE DEMO: left (text + selector + tabs) / right dashboard ===== */
#ilm-onboarding #features>.w{display:grid;grid-template-columns:320px 1fr;grid-template-rows:auto 1fr;gap:12px 28px;align-items:start}
#ilm-onboarding #features .sh{grid-column:1;grid-row:1;text-align:left;margin:0}
#ilm-onboarding #features .tabs{grid-column:1;grid-row:2;align-self:start;margin:0}
#ilm-onboarding #features .show{grid-column:2;grid-row:1/3;align-self:start}
#ilm-onboarding #features .sh .seg{width:100%;margin-top:14px;padding:5px;border-radius:14px;box-shadow:none;border:1px solid var(--bd)}
#ilm-onboarding #features .sh .seg button{padding:9px 10px;font-size:.88rem;border-radius:10px}
#ilm-onboarding #features .sh .seg button:after{display:none}
#ilm-onboarding #features .tabs:before{content:"Choose a portal";font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mu);padding:2px 4px}
@media(max-width:900px){
  #ilm-onboarding #features>.w{grid-template-columns:1fr;grid-template-rows:auto}
  #ilm-onboarding #features .sh,#ilm-onboarding #features .tabs,#ilm-onboarding #features .show{grid-column:1;grid-row:auto}
   #ilm-onboarding .hero .hg .stats{grid-template-columns:repeat(2,1fr)}
}

/* ===== MEDIA FALLBACK ===== */
#ilm-onboarding .rs-fr img,#ilm-onboarding .rb-f img{color:transparent;font-size:0}
#ilm-onboarding .rs-fr img:not([src]),#ilm-onboarding .rb-f img:not([src]){display:none}
#ilm-onboarding .rs-fr.nomedia,#ilm-onboarding .rb-f.nomedia{background:linear-gradient(135deg,#1e293b,#0f172a 55%,color-mix(in srgb,var(--or) 40%,#0f172a))}

/* ===== HERO HUB ===== */
#ilm-onboarding{--host-nav:68px}
#ilm-onboarding #top{display:block!important}
#ilm-onboarding .hero{padding:20px 0 12px}
#ilm-onboarding .hero .hg>div:first-child:before{margin-bottom:8px}
#ilm-onboarding .hero .hg h1{font-size:clamp(1.7rem,3.6vw,2.6rem)!important}
#ilm-onboarding .hero .hg p.lead{margin:8px auto 12px;font-size:.95rem!important;max-width:560px}
#ilm-onboarding .hero .hg .cta-row{flex-direction:row;justify-content:center;gap:10px}
#ilm-onboarding .hero .hg .cx,#ilm-onboarding .hero .hg .cta-row>.btn.p{display:none}
#ilm-onboarding .hero .seg{width:min(380px,100%);padding:5px;border-radius:14px}
#ilm-onboarding .hero .seg button{padding:8px 14px;font-size:.92rem}
#ilm-onboarding .hero .seg button:after{display:none}
#ilm-onboarding .hero .hg .stats{max-width:620px;margin-top:12px;gap:8px}
#ilm-onboarding .hero .hg .st{padding:6px 8px}
#ilm-onboarding .hero .hg .st b{font-size:1.05rem}
#ilm-onboarding .hero .hg .st .bar{display:none}

/* sticky sub navbar */
#ilm-onboarding .hub-nav{position:sticky;top:var(--host-nav);z-index:15;background:var(--bg);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);box-shadow:0 8px 20px -16px rgba(15,23,42,.35)}
#ilm-onboarding .hub-nw{display:flex;align-items:center;gap:12px;padding-top:8px;padding-bottom:8px;overflow-x:auto;scrollbar-width:none}
#ilm-onboarding .hub-nw::-webkit-scrollbar{display:none}
#ilm-onboarding .hub-pt{flex:none}
#ilm-onboarding .hub-pt .tabs{display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:flex-start;gap:6px;margin:0}
#ilm-onboarding .hub-pt .tabs button{white-space:nowrap;padding:8px 16px;font-size:.88rem;border-radius:99px;text-align:center}
#ilm-onboarding .hub-sep{width:1px;height:22px;background:var(--bd);flex:none}
#ilm-onboarding .hub-more{display:flex;gap:2px;margin-left:auto;flex:none}
#ilm-onboarding .hub-more button{border:0;background:none;color:var(--mu);font:600 .86rem inherit;font-family:inherit;padding:8px 12px;border-radius:99px;cursor:pointer;white-space:nowrap;transition:.2s}
#ilm-onboarding .hub-more button:hover{color:var(--tx)}
#ilm-onboarding .hub-more button[aria-current=true]{color:var(--or);background:color-mix(in srgb,var(--or) 12%,var(--bg))}
#ilm-onboarding .hub:not([data-view=demo]) .hub-pt .tabs button[aria-selected=true]{background:var(--bg);color:var(--mu);border-color:var(--bd)}

/* panels */
#ilm-onboarding .hub-p{display:none;scroll-margin-top:calc(var(--host-nav) + 56px)}
#ilm-onboarding .hub[data-view=demo] .hub-p[data-p=demo],
#ilm-onboarding .hub[data-view=demo] .hub-p[data-p=roles],
#ilm-onboarding .hub[data-view=products] .hub-p[data-p=products],
#ilm-onboarding .hub[data-view=how] .hub-p[data-p=how],
#ilm-onboarding .hub[data-view=why] .hub-p[data-p=why],
#ilm-onboarding .hub[data-view=faq] .hub-p[data-p=faq]{display:block;animation:hub-in .35s ease}
@keyframes hub-in{from{opacity:0;transform:translateY(8px)}}

/* Live Demo */
#ilm-onboarding #features{padding:12px 0 4px;scroll-margin-top:calc(var(--host-nav) + 56px)}
#ilm-onboarding #features>.w{display:block;max-width:1240px}
#ilm-onboarding #features .sh{display:none}
#ilm-onboarding .hub-p[data-p=roles] .rs{padding:14px 0}
#ilm-onboarding .hub-p[data-p=products] .rb,#ilm-onboarding .hub-p[data-p=how] .rb,#ilm-onboarding .hub-p[data-p=why] .rb{padding-top:12px}

@media(max-width:700px){
  #ilm-onboarding .hub-more{margin-left:0}
  #ilm-onboarding .hero .hg .stats{grid-template-columns:repeat(2,1fr)}
}

/* ===== COMPACT CTA BAND + CARD (match reference) ===== */
#ilm-onboarding #band-cta{padding:8px 0 6px}
#ilm-onboarding #band-cta .rb-f{min-height:0;border-radius:22px;display:flex;align-items:center}
#ilm-onboarding #band-cta .rb-o{padding:24px 34px;max-width:660px}
#ilm-onboarding #band-cta .rb-o .eb{padding:4px 12px;font-size:.74rem;margin-bottom:6px;background:rgba(255,255,255,.18)}
#ilm-onboarding #band-cta .rb-o h2{max-width:470px;font-size:clamp(1.35rem,2.3vw,1.8rem)!important;line-height:1.15!important;margin:2px 0 8px!important;letter-spacing:-.5px}
#ilm-onboarding #band-cta .rb-o p{font-size:.9rem!important;line-height:1.35!important;margin:0 0 14px!important}
#ilm-onboarding #band-cta .rs-cta{margin-top:0;gap:10px}
#ilm-onboarding #band-cta .rs-cta .btn{padding:10px 22px;font-size:.92rem;border-radius:12px}
#ilm-onboarding #band-cta .rb-f:before{background:linear-gradient(90deg,rgba(15,23,42,.85),rgba(15,23,42,.45) 45%,rgba(15,23,42,0) 75%)}

#ilm-onboarding .cta{background:linear-gradient(120deg,var(--bg) 60%,color-mix(in srgb,var(--or) 5%,var(--bg)))!important;border:1px solid #E8E6E1!important;border-radius:20px!important;grid-template-columns:166px 1fr!important;gap:0 24px!important;padding:0 24px 0 0!important;overflow:hidden}
#ilm-onboarding .cta:before{background-image:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 200'><rect width='240' height='200' fill='%23FB9B0B'/><circle cx='190' cy='40' r='60' fill='%23FDB02F'/><rect x='52' y='120' width='28' height='44' rx='6' fill='%23fff'/><rect x='92' y='96' width='28' height='68' rx='6' fill='%23fff'/><rect x='132' y='66' width='28' height='98' rx='6' fill='%23fff'/><path d='M120 28 62 54l58 26 58-26z' fill='%231E293B'/><path d='M88 68v20c0 8 14 14 32 14s32-6 32-14V68l-32 14z' fill='%231E293B'/><path d='M178 54v30' stroke='%231E293B' stroke-width='4' stroke-linecap='round'/></svg>")!important}
#ilm-onboarding .cta .ceb{margin:12px 0 4px!important;font-size:.7rem!important}
#ilm-onboarding .cta h2#ct{font-size:1.35rem!important;margin:0 0 2px!important}
#ilm-onboarding .cta p#cp{font-size:.9rem!important;line-height:1.35!important;margin:0 0 8px!important;max-width:none!important}
#ilm-onboarding .cta .cch{margin:0 0 12px!important;gap:8px}
#ilm-onboarding .cta .cch span{gap:7px;font-size:.8rem;font-weight:600;padding:6px 14px;border-radius:999px;background:var(--bg);border:1px solid #E2E8F0;color:var(--tx)}
#ilm-onboarding .cta .cch span:before{display:none!important}
#ilm-onboarding .cta .cch span svg{width:16px;height:16px;flex:none;color:var(--or)}
#ilm-onboarding .cta .cch span:nth-child(even) svg{color:var(--gr)}
@media(max-width:900px){
  #ilm-onboarding .cta{grid-template-columns:1fr!important;padding:0 16px 16px 0!important}
  #ilm-onboarding #band-cta .rb-o{padding:20px 18px}
}

/* ===== PHASE 1 v2: grouped experience cards ===== */
#ilm-onboarding .xg{display:block!important;margin-top:14px!important;text-align:left}
#ilm-onboarding .xgp{margin-bottom:12px}
#ilm-onboarding .xgp:last-child{margin-bottom:0}
#ilm-onboarding .xgh{font-family:"Space Grotesk",system-ui,sans-serif;font-weight:700;font-size:.82rem;letter-spacing:.04em;color:var(--mu);margin:0 0 6px 2px;text-align:left}
#ilm-onboarding .xrow{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
#ilm-onboarding .xcd{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:96px;padding:12px 8px;border:1px solid var(--bd);border-radius:14px;background:var(--bg);color:var(--tx);cursor:pointer;font-family:inherit;text-align:center;box-shadow:0 2px 10px rgba(15,23,42,.05);transition:transform .2s,border-color .2s,box-shadow .2s}
#ilm-onboarding .xcd:hover:not(:disabled){transform:translateY(-3px);border-color:var(--c);box-shadow:0 12px 24px -14px var(--c)}
#ilm-onboarding .xcd .xic{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;color:var(--c);background:color-mix(in srgb,var(--c) 14%,transparent);margin-bottom:3px}
#ilm-onboarding .xcd .xic .ui-ico{width:20px;height:20px}
#ilm-onboarding .xcd strong{font-size:.86rem;line-height:1.2;font-family:"Space Grotesk",system-ui,sans-serif;font-weight:700;color:var(--tx)}
#ilm-onboarding .xcd small{font-size:.72rem;line-height:1.2;color:var(--mu)}
#ilm-onboarding .xcd.soon{opacity:.6;cursor:not-allowed}
#ilm-onboarding .xcd.soon .xic{filter:grayscale(1)}
#ilm-onboarding .xcd .xbd{position:absolute;top:6px;right:6px;font-size:.54rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:999px;background:var(--or);color:#fff;white-space:nowrap}
@media(max-width:560px){
  #ilm-onboarding .xrow{grid-template-columns:repeat(2,minmax(0,1fr))}
  #ilm-onboarding .xcd{min-height:88px}
}
  
/* ===== CHOOSE YOUR EXPERIENCE v3: grouped boxes (LMS / Corporate / Product) ===== */
#ilm-onboarding .xg{display:flex!important;flex-direction:column;gap:22px;margin-top:20px!important;text-align:left}
#ilm-onboarding .xg .xgp{position:relative;margin:0;padding:24px 10px 10px;border-radius:18px;border:1px solid color-mix(in srgb,var(--g) 28%,var(--bd));background:color-mix(in srgb,var(--g) 7%,var(--bg))}
#ilm-onboarding .xg .xgh{position:absolute;top:-14px;left:14px;display:inline-flex;align-items:center;gap:8px;margin:0;padding:5px 16px;border-radius:999px;background:color-mix(in srgb,var(--g) 16%,var(--bg));color:var(--g);font-family:"Space Grotesk",system-ui,sans-serif;font-weight:700;font-size:1rem;letter-spacing:0;border:1px solid color-mix(in srgb,var(--g) 25%,transparent)}
#ilm-onboarding .xg .xgh .ui-ico{width:20px;height:20px}
#ilm-onboarding .xg .xrow{display:grid;gap:10px;align-items:stretch}
#ilm-onboarding .xg .xcd{flex-direction:row;justify-content:flex-start;align-items:center;gap:12px;min-height:0;padding:12px 14px;text-align:left;border-radius:14px;background:var(--bg);border:1px solid var(--bd)}
#ilm-onboarding .xg .xcd .xic{width:44px;height:44px;border-radius:12px;margin:0;flex:none}
#ilm-onboarding .xg .xcd .xic .ui-ico{width:22px;height:22px}
#ilm-onboarding .xg .xcd .xtx{display:flex;flex-direction:column;min-width:0;gap:1px}
#ilm-onboarding .xg .xcd strong{font-size:.95rem;line-height:1.2;text-align:left}
#ilm-onboarding .xg .xcd small{font-size:.76rem;line-height:1.25;text-align:left;color:var(--mu)}
#ilm-onboarding .xg .xcd.soon{opacity:1;cursor:not-allowed;box-shadow:none}
#ilm-onboarding .xg .xcd.soon .xic{filter:none}
#ilm-onboarding .xg .xcd.soon:hover{transform:none;border-color:var(--bd);box-shadow:none}
#ilm-onboarding .xg .xsoon{display:inline-flex;align-items:center;gap:7px;align-self:center;margin:0 10px;padding:9px 16px;border-radius:999px;background:color-mix(in srgb,#F59E0B 18%,var(--bg));color:#B45309;font-weight:700;font-size:.85rem;white-space:nowrap}
#ilm-onboarding .xg .xsoon .ui-ico{width:16px;height:16px}
@media(max-width:700px){
  #ilm-onboarding .xg .xrow{grid-template-columns:1fr!important}
  #ilm-onboarding .xg .xsoon{margin:4px 0 0;justify-self:start}
}

/* ===== HERO: 3-way selector (LMS / Corporate / Product) ===== */
#ilm-onboarding .hero2 .seg{grid-template-columns:repeat(3,1fr);max-width:520px}

/* ===== LIVE DEMO: left sidebar (group + tabs) / right compact dashboard ===== */
#ilm-onboarding .hub-nw{justify-content:center}
#ilm-onboarding .hub-more{margin:0 auto}
#ilm-onboarding #features>.w{display:grid!important;grid-template-columns:220px minmax(0,1fr);gap:16px;align-items:start;max-width:1180px}
#ilm-onboarding #features .tabs{grid-column:1;grid-row:1;display:flex;flex-direction:column;flex-wrap:nowrap;justify-content:flex-start;align-items:stretch;gap:6px;margin:0;padding:12px;background:var(--bg);border:1px solid var(--bd);border-radius:18px;box-shadow:var(--sh);position:sticky;top:calc(var(--host-nav) + 64px)}
#ilm-onboarding #features .tabs:before{content:"LMS";display:block;font-family:"Space Grotesk",system-ui,sans-serif;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--or);padding:2px 6px 6px;margin-bottom:2px;border-bottom:1px solid var(--bd)}
#ilm-onboarding[data-role=corporate] #features .tabs:before{content:"Corporate"}
#ilm-onboarding[data-role=product] #features .tabs:before{content:"Product"}
#ilm-onboarding #features .tabs button{width:100%;text-align:left;padding:10px 14px;font-size:.88rem;border-radius:12px}
#ilm-onboarding #features .show{grid-column:2;grid-row:1;min-width:0}
#ilm-onboarding #features .show .frame{border-radius:16px}
#ilm-onboarding #features .fb{padding:6px 12px}
@media(max-width:900px){
  #ilm-onboarding #features>.w{grid-template-columns:1fr}
  #ilm-onboarding #features .tabs,#ilm-onboarding #features .show{grid-column:1;grid-row:auto}
  #ilm-onboarding #features .tabs{flex-direction:row;flex-wrap:wrap;position:static}
  #ilm-onboarding #features .tabs:before{width:100%}
  #ilm-onboarding #features .tabs button{width:auto}
}
  

/* ===== Inline live dashboard inside the role section's right frame ===== */
#ilm-onboarding .rs-fr.rs-live{aspect-ratio:auto;height:min(560px,70vh);background:var(--bg);overflow:hidden}
#ilm-onboarding .rs-fr.rs-live iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:var(--bg)}
#ilm-onboarding .rs-fr.rs-live:hover iframe{transform:none}
#ilm-onboarding .rs-back{position:absolute;top:10px;right:14px;z-index:5;display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid var(--bd);border-radius:999px;background:var(--bg);color:var(--tx);font:600 .74rem inherit;font-family:inherit;cursor:pointer;box-shadow:0 6px 16px -8px rgba(15,23,42,.4)}
#ilm-onboarding .rs-back .rs-i{width:13px;height:13px}
#ilm-onboarding .rs-back:hover{border-color:var(--or);color:var(--or)}

/* ===== SINGLE CTA: one clean full-width band, old white card hidden ===== */
#ilm-onboarding section:has(> .w > .cta){display:none!important}

#ilm-onboarding #band-cta{padding:14px 0 18px}
#ilm-onboarding #band-cta>.w{max-width:none;padding:0 24px}
#ilm-onboarding #band-cta .rb-f{min-height:0;height:210px;border-radius:22px;display:flex;align-items:center;box-shadow:0 24px 50px -28px rgba(15,23,42,.55)}
#ilm-onboarding #band-cta .rb-f:before{background:linear-gradient(90deg,rgba(15,23,42,.9) 0%,rgba(15,23,42,.55) 42%,rgba(15,23,42,0) 78%)}
#ilm-onboarding #band-cta .rb-o{max-width:none;width:100%;padding:0 48px;display:flex;flex-direction:column;align-items:flex-start;gap:0}
#ilm-onboarding #band-cta .rb-o .eb{margin:0 0 10px;padding:4px 12px;font-size:.72rem;letter-spacing:.06em;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22)}
#ilm-onboarding #band-cta .rb-o h2{max-width:560px;margin:0 0 6px!important;font-size:clamp(1.3rem,2.2vw,1.75rem)!important;line-height:1.18!important;letter-spacing:-.5px}
#ilm-onboarding #band-cta .rb-o p{max-width:520px;margin:0 0 16px!important;font-size:.9rem!important;line-height:1.4!important;color:rgba(255,255,255,.82)!important}
#ilm-onboarding #band-cta .rs-cta{margin:0;gap:10px}
#ilm-onboarding #band-cta .rs-cta .btn{padding:10px 22px;font-size:.9rem;border-radius:12px;font-weight:700}
#ilm-onboarding #band-cta .rs-cta .btn.p{background:var(--or);border-color:var(--or);color:#fff;box-shadow:0 10px 22px -10px rgba(249,115,22,.7)}
#ilm-onboarding #band-cta .rs-cta .btn:not(.p){background:rgba(255,255,255,.96);color:#0F172A}
@media(max-width:700px){
  #ilm-onboarding #band-cta>.w{padding:0 14px}
  #ilm-onboarding #band-cta .rb-f{height:auto;min-height:230px;padding:26px 0}
  #ilm-onboarding #band-cta .rb-o{padding:0 20px}
}

/* ===== remove blank space below footer (the bottom flash) ===== */
#ilm-onboarding{min-height:0!important;height:auto!important;padding-bottom:0!important;margin-bottom:0!important}
#ilm-onboarding>*:last-child{margin-bottom:0}
#ilm-onboarding .hub{padding-bottom:0}
#ilm-onboarding .hub>.hub-p:last-child,#ilm-onboarding #band-cta{margin-bottom:0}
#ilm-onboarding #tools,#ilm-onboarding #sp{display:none!important}

/* ===== UNIFIED COMPACT TYPOGRAPHY + BUTTONS (all onboarding pages) ===== */
#ilm-onboarding{
  --h-size:clamp(1.15rem,1.9vw,1.45rem);   /* ek hi heading size sab jagah */
  --s-size:.84rem;                          /* ek hi subheading size sab jagah */
}

/* HEADINGS: hero, section, role sections, band, CTA, products, choose experience */
#ilm-onboarding header.hero2 h1,
#ilm-onboarding .hero .hg h1,
#ilm-onboarding .hero2 h1,
#ilm-onboarding .h2r h2,
#ilm-onboarding section .sh h2,
#ilm-onboarding #features .sh h2,
#ilm-onboarding #pt,
#ilm-onboarding .rs-t h2,
#ilm-onboarding .rb-o h2,
#ilm-onboarding #band-cta .rb-o h2,
#ilm-onboarding .cta h2#ct{
  font-size:var(--h-size)!important;
  line-height:1.25!important;
  letter-spacing:-.3px!important;
  font-weight:700!important;
  margin-top:0!important;
  margin-bottom:4px!important;
}

/* SUBHEADINGS / paragraphs */
#ilm-onboarding header.hero2 p.lead,
#ilm-onboarding .hero .hg p.lead,
#ilm-onboarding .hero2 p.lead,
#ilm-onboarding .h2r>p,
#ilm-onboarding section .sh p,
#ilm-onboarding #features .sh p,
#ilm-onboarding #products .sh p,
#ilm-onboarding .rs-t>p,
#ilm-onboarding .rb-o p,
#ilm-onboarding #band-cta .rb-o p,
#ilm-onboarding .cta p#cp{
  font-size:var(--s-size)!important;
  line-height:1.45!important;
  font-weight:400!important;
  margin-top:2px!important;
  margin-bottom:8px!important;
  max-width:560px;
}

/* Small badges / eyebrow / greeting pill */
#ilm-onboarding .eb,
#ilm-onboarding section .sh .eb,
#ilm-onboarding #products .sh .eb,
#ilm-onboarding .hero2 .eb,
#ilm-onboarding .rb-o .eb,
#ilm-onboarding #band-cta .rb-o .eb{
  font-size:.7rem!important;
  padding:3px 10px!important;
  margin-bottom:6px!important;
}
#ilm-onboarding .gpill{padding:5px 12px!important;font-size:.82rem!important;margin-bottom:6px!important}

/* Card/group sub titles */
#ilm-onboarding .pgh h3{font-size:.95rem!important}
#ilm-onboarding .pgh span{font-size:.78rem!important}
#ilm-onboarding .card.pc h3{font-size:.9rem!important}
#ilm-onboarding .card.pc p{font-size:.78rem!important;line-height:1.4!important}
#ilm-onboarding .card h3,#ilm-onboarding .stp h4{font-size:.9rem!important}
#ilm-onboarding .card p,#ilm-onboarding .stp p,#ilm-onboarding details p{font-size:.78rem!important}
#ilm-onboarding summary{font-size:.86rem!important}
#ilm-onboarding .xg .xgh{font-size:.82rem!important;padding:3px 12px!important}
#ilm-onboarding .xg .xcd strong{font-size:.85rem!important}
#ilm-onboarding .xg .xcd small{font-size:.7rem!important}
#ilm-onboarding .xg .xcd{padding:8px 12px!important}
#ilm-onboarding .xg .xcd .xic{width:36px!important;height:36px!important}
#ilm-onboarding .xg .xcd .xic .ui-ico{width:18px!important;height:18px!important}
#ilm-onboarding .xg .xsoon{padding:6px 12px!important;font-size:.76rem!important}

/* ALL BUTTONS: compact */
#ilm-onboarding .btn,
#ilm-onboarding .cta .btn,
#ilm-onboarding .rs-cta .btn,
#ilm-onboarding #band-cta .rs-cta .btn,
#ilm-onboarding .hero .hg .cta-row>.btn.p{
  padding:6px 14px!important;
  font-size:.8rem!important;
  border-radius:10px!important;
  gap:6px!important;
}
#ilm-onboarding .rs-cta .btn .rs-i,#ilm-onboarding .btn .ui-ico{width:14px!important;height:14px!important}
#ilm-onboarding .seg,
#ilm-onboarding .hero2 .seg{padding:4px!important;border-radius:12px!important}
#ilm-onboarding .seg button,
#ilm-onboarding .hero2 .seg button,
#ilm-onboarding header.hero2 .seg button,
#ilm-onboarding #features .sh .seg button{
  padding:7px 10px!important;
  font-size:.8rem!important;
  border-radius:9px!important;
  min-height:0!important;
}
#ilm-onboarding .tabs button,
#ilm-onboarding #features .tabs button{padding:6px 12px!important;font-size:.8rem!important;border-radius:10px!important;min-height:0!important}
#ilm-onboarding .hub-more button{padding:6px 12px!important;font-size:.8rem!important}
#ilm-onboarding .cd button{padding:4px 10px!important;font-size:.72rem!important;min-height:0!important}
#ilm-onboarding .rs-f{padding:5px 9px!important;font-size:.74rem!important}
#ilm-onboarding .rs-back{padding:4px 10px!important;font-size:.7rem!important}
#ilm-onboarding .cta .cch span{padding:4px 10px!important;font-size:.72rem!important}

/* Section spacing bhi thoda compact */
#ilm-onboarding section{padding:14px 0!important}
#ilm-onboarding .rs{padding:12px 0!important}
#ilm-onboarding .rb{padding:8px 0!important}
#ilm-onboarding #band-cta .rb-f{height:170px!important}
#ilm-onboarding #band-cta .rb-o{padding:0 36px!important}

/* Mobile pe touch-target ko chhota na hone do (accessibility) */
@media(pointer:coarse){
  #ilm-onboarding .btn,#ilm-onboarding .seg button,#ilm-onboarding .tabs button,#ilm-onboarding summary{min-height:38px!important}
}
@media(max-width:700px){
  #ilm-onboarding{--h-size:clamp(1.05rem,5vw,1.3rem);--s-size:.8rem}
}

/* ===== CHOOSE YOUR EXPERIENCE: compact + wow ===== */
#ilm-onboarding .h2r{padding:0 4px 0 28px!important}
#ilm-onboarding .h2r h2{margin:0 0 2px!important}
#ilm-onboarding .h2r>p{margin:0 0 4px!important}

/* grid: LMS + Product full width, baaki 3 ek row mein */
#ilm-onboarding .xg{
  display:grid!important;
  grid-template-columns:repeat(6,minmax(0,1fr));
  gap:20px 8px!important;
  margin-top:16px!important;
}
#ilm-onboarding .xg .xgp{
  grid-column:span 6;
  padding:16px 8px 8px!important;
  border-radius:14px!important;
  transition:box-shadow .25s,transform .25s;
}
#ilm-onboarding .xg .xgp:nth-child(n+3){grid-column:span 2}
#ilm-onboarding .xg .xgp:hover{box-shadow:0 12px 26px -16px var(--g);transform:translateY(-2px)}

/* group pill header */
#ilm-onboarding .xg .xgh{
  top:-11px!important;left:10px!important;
  padding:2px 10px!important;
  font-size:.74rem!important;
  gap:5px!important;
  box-shadow:0 4px 10px -6px var(--g);
}
#ilm-onboarding .xg .xgh .ui-ico{width:14px!important;height:14px!important}

/* rows + cards */
#ilm-onboarding .xg .xrow{gap:6px!important}
#ilm-onboarding .xg .xcd{
  gap:8px!important;
  padding:7px 9px!important;
  border-radius:11px!important;
  transition:transform .2s,border-color .2s,box-shadow .2s;
}
#ilm-onboarding .xg .xcd:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 18px -12px var(--c)}
#ilm-onboarding .xg .xcd .xic{width:30px!important;height:30px!important;border-radius:9px!important}
#ilm-onboarding .xg .xcd .xic .ui-ico{width:16px!important;height:16px!important}
#ilm-onboarding .xg .xcd strong{font-size:.78rem!important;line-height:1.15!important}
#ilm-onboarding .xg .xcd small{font-size:.66rem!important;line-height:1.15!important}

/* Corporate / Educate Tech / SIS: chhote vertical tiles */
#ilm-onboarding .xg .xgp:nth-child(n+3) .xrow{grid-template-columns:1fr!important;gap:5px!important}
#ilm-onboarding .xg .xgp:nth-child(n+3) .xcd{
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  gap:4px!important;
  padding:8px 6px!important;
}
#ilm-onboarding .xg .xgp:nth-child(n+3) .xcd .xtx{align-items:center}
#ilm-onboarding .xg .xgp:nth-child(n+3) .xcd strong,
#ilm-onboarding .xg .xgp:nth-child(n+3) .xcd small{text-align:center}
#ilm-onboarding .xg .xgp:nth-child(n+3) .xcd small{display:none}
#ilm-onboarding .xg .xsoon{
  align-self:center!important;
  justify-self:center;
  margin:0!important;
  padding:3px 10px!important;
  font-size:.66rem!important;
  gap:5px!important;
}
#ilm-onboarding .xg .xsoon .ui-ico{width:12px!important;height:12px!important}

/* Hero left side bhi thoda tight, taaki dono taraf balance rahe */
#ilm-onboarding header.hero2{padding:6px 0 4px!important}
#ilm-onboarding .h2g:before{top:2%!important;bottom:2%!important}
#ilm-onboarding .who{margin-top:10px!important;padding:10px 14px!important}
#ilm-onboarding .whol{gap:6px!important}
#ilm-onboarding .whos b{font-size:.78rem!important}
#ilm-onboarding .whos small{font-size:.7rem!important}
#ilm-onboarding .hero2 .stats{margin-top:8px!important}

/* Mobile */
@media(max-width:700px){
  #ilm-onboarding .h2r{padding:0!important}
  #ilm-onboarding .xg .xgp:nth-child(n+3){grid-column:span 6}
  #ilm-onboarding .xg .xgp:nth-child(n+3) .xcd{flex-direction:row;justify-content:flex-start;text-align:left}
    #ilm-onboarding .xg .xgp:nth-child(n+3) .xrow{grid-template-columns:1fr auto!important}
}

/* ===== HERO v4: banner + 2 columns (reference design) ===== */
#ilm-onboarding header.hero2{padding:10px 0 8px!important}
#ilm-onboarding .h2g{
  display:grid!important;
  grid-template-columns:minmax(0,1fr) minmax(0,1.15fr)!important;
  column-gap:28px!important;
  row-gap:0!important;
  align-items:start!important;
}
#ilm-onboarding .h2l,#ilm-onboarding .h2r{display:contents!important}

/* banner (rows 1-3). Optional photo: public/onboarding-media/hero.png */
#ilm-onboarding .h2g:before{
  content:""!important;display:block!important;
  grid-column:1/-1;grid-row:1/4;align-self:stretch;
  position:relative!important;inset:auto!important;left:auto!important;top:auto!important;bottom:auto!important;
  width:auto!important;height:auto!important;
  border-radius:22px;border:1px solid var(--bd);
  background:
       url(/onboarding-media/hero.webp) right center/auto 100% no-repeat,
    radial-gradient(420px 220px at 92% 80%,rgba(249,115,22,.22),transparent 70%),
    linear-gradient(100deg,var(--bg) 0%,var(--bg2) 55%,color-mix(in srgb,var(--or) 10%,var(--bg)) 100%);
}
#ilm-onboarding .gpill{grid-column:1/-1;grid-row:1;justify-self:start;margin:16px 0 0 28px!important}
#ilm-onboarding header.hero2 h1#h1t{
  grid-column:1/-1;grid-row:2;text-align:left;max-width:62%;
  margin:6px 0 0 28px!important;
  font-size:clamp(1.6rem,3vw,2.2rem)!important;line-height:1.12!important;letter-spacing:-.8px!important;
}
#ilm-onboarding header.hero2 p.lead{
  grid-column:1/-1;grid-row:3;text-align:left;max-width:56%;
  margin:6px 0 20px 28px!important;
}

/* Choose Your Experience heading with side lines (rows 4-5) */
#ilm-onboarding .h2r h2{
  grid-column:1/-1;grid-row:4;display:flex;align-items:center;gap:14px;justify-content:center;
  margin:16px 0 2px!important;text-align:center;
}
#ilm-onboarding .h2r h2:before,#ilm-onboarding .h2r h2:after{content:"";flex:1;height:1px;background:var(--bd)}
#ilm-onboarding .h2r h2 span{color:var(--or)}
#ilm-onboarding .h2r>p{grid-column:1/-1;grid-row:5;text-align:center;max-width:none!important;margin:0 auto 12px!important}

/* left column (rows 6-8) */
#ilm-onboarding header.hero2 .seg{grid-column:1;grid-row:6;max-width:none!important;width:100%;margin:0 0 10px!important;padding:5px!important;border-radius:14px!important}
#ilm-onboarding .hero2 .stats{
  grid-column:1;grid-row:7;max-width:none!important;width:100%;
  margin:0 0 10px!important;padding:0!important;gap:8px!important;background:none!important;border:0!important;
}
#ilm-onboarding .hero2 .st{
  background:var(--bg)!important;border:1px solid var(--bd)!important;border-radius:12px!important;
  padding:8px 6px!important;box-shadow:var(--sh);
}
#ilm-onboarding .who{grid-column:1;grid-row:8;max-width:none!important;width:100%;margin:0!important}

/* right column: 5 rows */
#ilm-onboarding #xg{grid-column:2;grid-row:6/9;margin:0!important;padding-left:22px;border-left:1px solid var(--bd)}
#ilm-onboarding .xg{display:flex!important;flex-direction:column!important;gap:8px!important;text-align:left}
#ilm-onboarding .xg .xgp{
  grid-column:auto!important;position:relative;padding:0!important;overflow:hidden;
  border-radius:14px!important;background:var(--bg)!important;
  border:1.5px solid color-mix(in srgb,var(--g) 45%,var(--bd))!important;
  box-shadow:var(--sh);transition:box-shadow .25s,transform .25s;
}
#ilm-onboarding .xg .xgp:hover{transform:translateY(-1px);box-shadow:0 12px 24px -16px var(--g)}
#ilm-onboarding .xg .xgt{
  display:flex;align-items:center;gap:12px;width:100%;padding:9px 12px;
  border:0;background:none;cursor:pointer;font-family:inherit;color:var(--tx);text-align:left;
}
#ilm-onboarding .xg .xgt:disabled{cursor:not-allowed}
#ilm-onboarding .xg .xgi{display:grid;place-items:center;flex:none;width:38px;height:38px;border-radius:11px;color:var(--g);background:color-mix(in srgb,var(--g) 14%,var(--bg))}
#ilm-onboarding .xg .xgi .ui-ico{width:20px;height:20px}
#ilm-onboarding .xg .xgn{display:flex;flex-direction:column;min-width:0;flex:1}
#ilm-onboarding .xg .xgn strong{font-family:"Space Grotesk",system-ui,sans-serif;font-size:.92rem;line-height:1.2;color:var(--tx)}
#ilm-onboarding .xg .xgn small{font-size:.74rem;line-height:1.2;color:var(--mu)}
#ilm-onboarding .xg .xgc{display:grid;place-items:center;color:var(--tx);transition:transform .25s}
#ilm-onboarding .xg .xgc .ui-ico{width:16px;height:16px}
#ilm-onboarding .xg .xgp.open .xgc{transform:rotate(90deg)}
#ilm-onboarding .xg .xsoon{margin:0!important;padding:5px 12px!important;font-size:.72rem!important;align-self:center}

/* dropdown content */
#ilm-onboarding .xg .xrow{display:none!important;padding:0 10px 10px;gap:8px!important}
#ilm-onboarding .xg .xgp.open .xrow{display:grid!important;animation:hub-in .3s ease}
#ilm-onboarding .xg .xgp.open .xgt{border-bottom:1px solid var(--bd)}
#ilm-onboarding .xg .xgp.open .xrow{padding-top:10px}
#ilm-onboarding .xg .xrow .xcd{background:var(--bg2)}

/* tablet / mobile: single column */
@media(max-width:900px){
  #ilm-onboarding .h2g{grid-template-columns:minmax(0,1fr)!important}
  #ilm-onboarding header.hero2 h1#h1t,#ilm-onboarding header.hero2 p.lead{max-width:none}
  #ilm-onboarding header.hero2 .seg,#ilm-onboarding .hero2 .stats,#ilm-onboarding .who{grid-column:1}
  #ilm-onboarding #xg{grid-column:1;grid-row:9;padding-left:0;border-left:0;margin-top:10px!important}
}
@media(max-width:700px){
  #ilm-onboarding .xg .xrow{grid-template-columns:1fr!important}
   #ilm-onboarding .gpill,#ilm-onboarding header.hero2 h1#h1t,#ilm-onboarding header.hero2 p.lead{margin-left:16px!important}
}

/* ===== HERO v4 FIX: banner text visible, no pink, no left gaps ===== */

/* rows: extra height sirf last row (1fr) lega, left column stretch nahi hoga */
#ilm-onboarding .h2g{
  grid-template-rows:auto auto auto auto auto auto auto auto 1fr!important;
  align-content:start!important;
}
#ilm-onboarding #xg{grid-row:6/10!important}

/* banner background: text ke NEECHE, pink/orange glow hata diya */
#ilm-onboarding .h2g:before{
  position:static!important;
  z-index:0!important;
  min-height:150px;
  background:
    url(/onboarding-media/hero.webp) right center/auto 100% no-repeat,
    var(--bg2)!important;
}

/* banner ke upar ka text hamesha upar dikhe */
#ilm-onboarding .gpill,
#ilm-onboarding header.hero2 h1#h1t,
#ilm-onboarding header.hero2 p.lead{
  position:relative!important;
  z-index:2!important;
}

/* left column items start par align */
#ilm-onboarding header.hero2 .seg,
#ilm-onboarding .hero2 .stats,
#ilm-onboarding .who{align-self:start!important}

@media(max-width:900px){
  #ilm-onboarding .h2g{grid-template-rows:none!important}
  #ilm-onboarding .h2g:before{background:var(--bg2)!important}
}

/* banner photo: JS se --hero-img set hota hai */
#ilm-onboarding .h2g:before{
  background:
    var(--hero-img,none) right center/auto 100% no-repeat,
    var(--bg2)!important;
}
@media(max-width:900px){
  #ilm-onboarding .h2g:before{background:var(--bg2)!important}
}
  /* ===== First-time user guide ===== */
#ilm-onboarding .gd-block{position:fixed;inset:0;z-index:99990}
#ilm-onboarding .gd-ring{position:fixed;z-index:99991;border-radius:14px;box-shadow:0 0 0 9999px rgba(8,12,24,.62),0 0 0 3px var(--or);pointer-events:none;animation:gd-pulse 1.8s ease-in-out infinite}
@keyframes gd-pulse{50%{box-shadow:0 0 0 9999px rgba(8,12,24,.62),0 0 0 8px color-mix(in srgb,var(--or) 40%,transparent)}}
#ilm-onboarding .gd-card{position:fixed;z-index:99992;width:min(340px,calc(100vw - 24px));box-sizing:border-box;padding:16px 16px 14px;border-radius:16px;background:var(--bg);color:var(--tx);border:1px solid var(--bd);box-shadow:0 24px 50px -16px rgba(0,0,0,.5);font-family:inherit}
#ilm-onboarding .gd-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
#ilm-onboarding .gd-n{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--or)}
#ilm-onboarding .gd-x{border:0;background:none;color:var(--mu);font-size:1.3rem;line-height:1;cursor:pointer;padding:0 2px}
#ilm-onboarding .gd-card h4{margin:0 0 4px;font-size:1.02rem}
#ilm-onboarding .gd-card p{margin:0 0 12px;font-size:.86rem;line-height:1.5;color:var(--mu)}
#ilm-onboarding .gd-bar{display:flex;justify-content:space-between;gap:8px}
#ilm-onboarding .gd-b{border:1px solid var(--bd);background:var(--bg);color:var(--tx);border-radius:999px;padding:7px 16px;font-weight:600;font-size:.8rem;font-family:inherit;cursor:pointer}
#ilm-onboarding .gd-b.p{background:var(--or);border-color:var(--or);color:#fff}
#ilm-onboarding .gd-fab{position:fixed;left:18px;bottom:18px;z-index:9000;display:inline-flex;align-items:center;gap:8px;padding:8px 14px 8px 8px;border-radius:999px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);font-weight:600;font-size:.78rem;font-family:inherit;cursor:pointer;box-shadow:0 10px 24px -12px rgba(0,0,0,.45)}
#ilm-onboarding .gd-fab span{width:22px;height:22px;display:grid;place-items:center;border-radius:50%;background:var(--or);color:#fff;font-size:.8rem}
#ilm-onboarding .gd-fab:hover{border-color:var(--or)}

@media(prefers-reduced-motion:reduce){#ilm-onboarding .gd-ring{animation:none}}

/* ===== Live Demo: group selector (LMS / Product / Corporate / SIS / Educate Tech) ===== */
#ilm-onboarding #features .sh{display:block!important;margin:0!important;text-align:left}
#ilm-onboarding #features .sh>.eb,
#ilm-onboarding #features .sh>h2,
#ilm-onboarding #features .sh>p{display:none!important}
#ilm-onboarding #features .sh .seg{display:flex!important;flex-direction:column;gap:6px;width:100%;margin:0!important;padding:12px!important;background:var(--bg);border:1px solid var(--bd)!important;border-radius:18px!important;box-shadow:var(--sh)}
#ilm-onboarding #features .sh .seg:before{content:"Choose a module";display:block;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mu);padding:2px 6px 6px;border-bottom:1px solid var(--bd);margin-bottom:2px}
#ilm-onboarding #features .sh .seg button{display:flex!important;align-items:center;justify-content:space-between;gap:8px;width:100%;text-align:left;padding:10px 14px!important;font-size:.86rem!important;border-radius:12px!important}
#ilm-onboarding #features .sh .seg button[data-r=corporate]:after,
#ilm-onboarding #features .sh .seg button[data-r=sis]:after,
#ilm-onboarding #features .sh .seg button[data-r=edutech]:after{display:inline-block!important;content:"Coming Soon";font-size:.6rem;font-weight:700;padding:2px 8px;border-radius:999px;background:color-mix(in srgb,#F59E0B 18%,transparent);color:#B45309;opacity:1}
#ilm-onboarding #features .sh .seg button[aria-pressed=true]:after{background:rgba(255,255,255,.25)!important;color:#fff!important}
#ilm-onboarding #features .tabs{position:static!important}
@media(min-width:901px){
  #ilm-onboarding #features>.w{grid-template-rows:auto 1fr!important}
  #ilm-onboarding #features .sh{grid-column:1!important;grid-row:1!important}
  #ilm-onboarding #features .tabs{grid-column:1!important;grid-row:2!important}
  #ilm-onboarding #features .show{grid-column:2!important;grid-row:1/3!important}
}
@media(max-width:900px){
  #ilm-onboarding #features .sh .seg{flex-direction:row;flex-wrap:wrap}
  #ilm-onboarding #features .sh .seg:before{width:100%}
  #ilm-onboarding #features .sh .seg button{width:auto}
}
`;


const VIEWS = [['demo', 'Live Demo'], ['products', 'Products'], ['how', 'How it works'], ['why', 'Why ILM ORA'], ['faq', 'FAQ']];
const ANCH = { '#features': 'demo', '#top': 'demo', '#products': 'products', '#how': 'how', '#why': 'why', '#faq': 'faq' };
const TABMAP = { Student: 'student', Trainer: 'trainer', 'Business & Partnership': 'business', Admin: 'business', Corporate: 'business', Workspace: 'workspace', Calendar: 'calendar' };

function buildHub(root) {
  const q = (s) => root.querySelector(s);
  const hero = q('#top'), feat = q('#features'), tabs = q('#tabs');
  if (!hero || !feat || !tabs) return;

  const hub = document.createElement('div');
  hub.id = 'hub'; hub.className = 'hub'; hub.dataset.view = 'demo';
  hero.before(hub);

  const nav = document.createElement('div');
  nav.id = 'hub-nav'; nav.className = 'hub-nav';
    nav.innerHTML =
    '<div class="w hub-nw"><div class="hub-more">' +
    VIEWS.map((v) => '<button type="button" data-hv="' + v[0] + '" aria-current="false">' + v[1] + '</button>').join('') +
    '</div></div>';

  const mk = (p) => { const d = document.createElement('div'); d.className = 'hub-p'; d.dataset.p = p; return d; };
  const pDemo = mk('demo'), pRoles = mk('roles'), pProd = mk('products'), pHow = mk('how'), pWhy = mk('why'), pFaq = mk('faq');
  hub.append(hero, nav, pDemo, pRoles, pProd, pHow, pWhy, pFaq);

  pDemo.appendChild(feat);
  root.querySelectorAll('.rs').forEach((s) => pRoles.appendChild(s));
  const mv = (p, ...sels) => sels.forEach((s) => { const e = q(s); if (e) p.appendChild(e); });
  mv(pProd, '#band-welcome', '#products');
  mv(pHow, '#band-how', '#how');
  mv(pWhy, '#band-why', '#why');
  mv(pFaq, '#faq');

  const setView = (v) => {
    hub.dataset.view = v;
    nav.querySelectorAll('[data-hv]').forEach((b) => b.setAttribute('aria-current', String(b.dataset.hv === v)));
  };
  const sync = () => {
    const a = tabs.querySelector('[aria-selected="true"]');
    const id = a && TABMAP[a.textContent.trim()];
    pRoles.querySelectorAll('.rs').forEach((s) => { s.style.display = s.id === 'role-' + id ? '' : 'none'; });
  };

  root.addEventListener('click', (e) => {
    const h = e.target.closest('[data-hv]');
    if (h) {
      setView(h.dataset.hv);
      const p = hub.querySelector('.hub-p[data-p="' + h.dataset.hv + '"]');
      if (p && p.getBoundingClientRect().top < 0) p.scrollIntoView({ block: 'start' });
    } else {
      if (e.target.closest('#tabs')) setView('demo');
      const a = e.target.closest('a[href^="#"]');
      const v = a && ANCH[a.getAttribute('href')];
      if (v) setView(v);
    }
    setTimeout(sync, 0);
  });
    setView('demo');
  sync();
  window.dispatchEvent(new Event('resize'));
}


  // ---- FIRST-TIME USER GUIDE (spotlight tour) ----
const GUIDE_KEY = 'ilm_onb_guide_v1';
function startGuide(root) {
  const rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const seen = () => { try { return localStorage.getItem(GUIDE_KEY) === '1'; } catch (e) { return false; } };
  const mark = () => { try { localStorage.setItem(GUIDE_KEY, '1'); } catch (e) { /* ignore */ } };
  const pick = (sel) => [...root.querySelectorAll(sel)].find((e) => e.offsetWidth > 0 && e.offsetHeight > 0) || null;

  const DEF = [
    { sel: '#xg', title: 'Pick a module', text: 'Start here. Click a module card (like LMS) and its dashboard opens. Cards marked Coming Soon are on the way.' },
    { sel: '#tabs', title: 'Choose your role', text: 'Student, Trainer or Business: every role gets its own dashboard and tools. Pick the one that matches you.' },
    { sel: '.rs .rs-cta .btn.p', title: 'Try a live preview', text: 'Press Explore Dashboard to try the real screens right here. Tabs switch on their own; hover to pause, then click any tab yourself.' },
    { sel: '', title: 'You are all set', text: 'Pick a module, choose your role, then open your dashboard. You can reopen this guide anytime with the Quick guide button.' },
  ];

  let steps = [], cur = 0, raf = 0, wait = 0, ui = null;

  const fab = document.createElement('button');
  fab.type = 'button';
  fab.className = 'gd-fab';
  fab.innerHTML = '<span>?</span>Quick guide';
  root.appendChild(fab);

  const place = () => {
    if (!ui) return;
    const s = steps[cur];
    const ring = ui.querySelector('.gd-ring'), card = ui.querySelector('.gd-card');
    const vw = innerWidth, vh = innerHeight, cw = card.offsetWidth, ch = card.offsetHeight;
    if (!s.el || !s.el.isConnected) {
      ring.style.cssText = 'left:' + vw / 2 + 'px;top:' + vh / 2 + 'px;width:0;height:0';
      card.style.left = Math.max(12, (vw - cw) / 2) + 'px';
      card.style.top = Math.max(12, (vh - ch) / 2) + 'px';
      return;
    }
    const r = s.el.getBoundingClientRect(), p = 8;
    ring.style.cssText = 'left:' + (r.left - p) + 'px;top:' + (r.top - p) + 'px;width:' + (r.width + p * 2) + 'px;height:' + (r.height + p * 2) + 'px';
    let top = r.bottom + 16;
    if (top + ch > vh - 12) top = r.top - ch - 16;
    if (top < 12) top = vh - ch - 12;
    card.style.top = Math.max(12, top) + 'px';
    card.style.left = Math.max(12, Math.min(r.left, vw - cw - 12)) + 'px';
  };
  const loop = () => { place(); raf = requestAnimationFrame(loop); };

  const show = (i) => {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    const s = steps[cur];
    ui.querySelector('.gd-n').textContent = 'Step ' + (cur + 1) + ' of ' + steps.length;
    ui.querySelector('h4').textContent = s.title;
    ui.querySelector('p').textContent = s.text;
    ui.querySelector('[data-g="back"]').style.visibility = cur ? 'visible' : 'hidden';
    ui.querySelector('[data-g="next"]').textContent = cur === steps.length - 1 ? 'Got it' : 'Next';
    if (s.el) s.el.scrollIntoView({ block: 'center', behavior: rm ? 'auto' : 'smooth' });
  };

  const onKey = (e) => { if (e.key === 'Escape') close(); };
  const onClick = (e) => {
    const b = e.target.closest('[data-g]');
    if (!b) return;
    const g = b.dataset.g;
    if (g === 'next') { if (cur >= steps.length - 1) close(); else show(cur + 1); }
    else if (g === 'back') show(cur - 1);
    else close();
  };

  function close(persist) {
    cancelAnimationFrame(raf);
    document.removeEventListener('keydown', onKey);
    if (ui) { ui.remove(); ui = null; }
    fab.style.display = '';
    if (persist !== false) mark();
  }

  const open = () => {
    if (ui) return;
    steps = DEF.map((s) => ({ ...s, el: s.sel ? pick(s.sel) : null })).filter((s) => !s.sel || s.el);
    if (!steps.length) return;
    ui = document.createElement('div');
    ui.className = 'gd';
    ui.innerHTML =
      '<div class="gd-block"></div><div class="gd-ring"></div>' +
      '<div class="gd-card" role="dialog" aria-live="polite">' +
      '<div class="gd-top"><span class="gd-n"></span><button type="button" class="gd-x" data-g="skip" aria-label="Skip guide">&times;</button></div>' +
      '<h4></h4><p></p>' +
      '<div class="gd-bar"><button type="button" class="gd-b" data-g="back">Back</button><button type="button" class="gd-b p" data-g="next">Next</button></div></div>';
    root.appendChild(ui);
    fab.style.display = 'none';
    ui.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    show(0);
    loop();
  };

  fab.addEventListener('click', open);
  if (!seen()) wait = setTimeout(open, 1500);

  return () => { clearTimeout(wait); close(false); fab.remove(); };
}

export function mountShowcase(root) {
  const anchor = root.querySelector('#features');
  if (!anchor) return;
  anchor.insertAdjacentHTML('afterend', ROLES.map(section).join(''));

  const rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const conn = navigator.connection || {};
  const canVideo = !rm && !conn.saveData && matchMedia('(min-width:900px)').matches;
  const secs = root.querySelectorAll('.rs');
  secs.forEach((s) => s.classList.add('rs-js'));
  const timers = [];

  const startVideo = (v) => {
    if (!v || !v.dataset.src || !canVideo) return;
    if (!v.src) { v.src = v.dataset.src; v.addEventListener('playing', () => v.classList.add('on'), { once: true }); }
    v.play().catch(() => {});
  };

  const count = (el) => {
    const n = +el.dataset.n;
    if (rm) { el.textContent = n; return; }
    let t0 = 0;
    const f = (t) => { t0 = t0 || t; const p = Math.min(1, (t - t0) / 1300); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  };

  const mkIO = (withCount) => new IntersectionObserver((en) => {
    en.forEach((x) => {
      const s = x.target, v = s.querySelector('video[data-vbase]');
      if (x.isIntersecting) {
        if (!s.classList.contains('vis')) { s.classList.add('vis'); if (withCount) s.querySelectorAll('[data-n]').forEach(count); }
        startVideo(v);
      } else if (v && !v.paused) v.pause();
    });
  }, { threshold: 0.2 });

  const io = mkIO(true);
  secs.forEach((s) => io.observe(s));

    const PORTAL = { Student: ['student', '/student'], Trainer: ['trainer', '/trainer'], 'Business & Partnership': ['admin', '/admin'], Workspace: ['wsp', '/workspace'], Calendar: ['wsp', '/workspace'] };
  const closeInline = (fr) => {
    if (!fr || !fr._saved) return;
    fr.innerHTML = fr._saved;
    fr._saved = null;
    fr.classList.remove('rs-live');
    hydrateMedia(fr, startVideo);
  };
  const goTab = (tab, side, sec) => {
    const p = PORTAL[tab];
    const fr = sec && sec.querySelector('.rs-fr');
    if (!p || !fr) return;
    const page = tab === 'Calendar' ? 'cl' : '';
    const theme = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const eng = (root.querySelector('#eng') || {}).textContent || '';
    const doc = eng.split('<\\/script').join('</script')
      .replace('__ROLE__', p[0]).replace('__PAGE__', page).replace('__THEME__', theme);
    if (!fr._saved) fr._saved = fr.innerHTML;
    fr.classList.add('rs-live');
    fr.innerHTML =
      '<button type="button" class="rs-back" data-back="1">' + ico('x') + ' Back to preview</button>' +
      '<iframe title="' + tab + ' dashboard" srcdoc="' + doc.replace(/&/g, '&amp;').replace(/"/g, '&quot;') + '"></iframe>';
    if (side) {
      const ifr = fr.querySelector('iframe');
      let tries = 0;
      const id = setInterval(() => {
        tries++;
        try {
          const d = ifr.contentDocument;
          const nv = d && [...d.querySelectorAll('.nv')].find((n) => n.textContent.trim().startsWith(side));
          if (nv) { nv.click(); clearInterval(id); return; }
        } catch (e) { /* ignore */ }
        if (tries > 30) clearInterval(id);
      }, 150);
           timers.push(id);
    }
  };

  const openDemo = async (id) => {
    const r = ROLES.find((x) => x.id === id);
    if (!r || !r.vid) return;
    const src = await find(r.vid, VID_EXT);
    if (!src) return;
    const m = document.createElement('div');
    m.className = 'rs-mod';
    m.innerHTML = '<div><button type="button" aria-label="Close video">' + ico('x') + '</button><video src="' + src + '" controls autoplay playsinline></video></div>';
    const close = () => { m.remove(); document.removeEventListener('keydown', esc); };
    const esc = (e) => { if (e.key === 'Escape') close(); };
    m.addEventListener('click', (e) => { if (e.target === m || e.target.closest('button')) close(); });
    document.addEventListener('keydown', esc);
    root.appendChild(m);
  };

    secs.forEach((s) => s.addEventListener('click', (e) => {
    const t = e.target.closest('[data-tab]'), d = e.target.closest('[data-demo]'), bk = e.target.closest('[data-back]');
    if (bk) closeInline(s.querySelector('.rs-fr'));
    else if (d) openDemo(d.dataset.demo);
    else if (t && !t.disabled) { goTab(t.dataset.tab, t.dataset.side, s); startTour(s.querySelector('.rs-fr')); }
  }));

  // ---- photo/video bands ----
  const band = (id, img, vid, eb, h, p, btns) =>
    '<section class="rb" id="' + id + '"><div class="w"><div class="rb-f">' +
    '<img data-base="' + img + '" alt="' + eb + '">' +
    (vid ? '<video data-vbase="' + vid + '" muted loop playsinline preload="none" aria-hidden="true"></video>' : '') +
    '<div class="rb-o"><span class="eb">' + eb + '</span><h2>' + h + '</h2><p>' + p + '</p><div class="rs-cta">' + btns + '</div></div></div></div></section>';

  const b1 = band('band-welcome', M.weI, M.weV, 'Welcome to ILM ORA',
    'Where learners, trainers and organisations grow together',
    'See how classes, assessments, reports and teamwork come together on one platform.',
    '<a class="btn p" href="#features">Explore the dashboards</a>');
  const b2 = band('band-how', M.hoI, '', 'Learn together',
    'From first login to your first certificate',
    'Join a batch, attend live, practise, get feedback and track your progress, all in one place.',
    '<a class="btn p" href="#features">Try the demo</a>');
  const b3 = band('band-why', M.wyI, '', 'Built for real teams',
    'Less tool switching, more teaching and learning',
    'One login, one workspace and one set of reports for everyone involved.',
    '<a class="btn p" href="#features">See the dashboards</a>');
    const b4 = band('band-cta', M.ctI, M.ctV, 'Ready to start?',
    'Bring your classroom or your company to <span style="color:#F97316">ILM ORA</span>',
    'Open the demo, explore every module and get started when you’re ready.',
       '<a class="btn p" style="background:#F97316;border-color:#F97316;color:#fff" href="#features">Try the demo ' + ico('arrow') + '</a>');

  const at = (sel, html) => { const el = root.querySelector(sel); if (el) el.insertAdjacentHTML('beforebegin', html); };
  at('#products', b1); at('#how', b2); at('#why', b3);
  const ctaSec = root.querySelector('.cta') && root.querySelector('.cta').closest('section');
  if (ctaSec) ctaSec.insertAdjacentHTML('beforebegin', b4);

  const io2 = mkIO(false);
  root.querySelectorAll('.rb').forEach((s) => io2.observe(s));

    hydrateMedia(root, startVideo);
  buildHub(root);
  find(B + 'hero', IMG_EXT).then((u) => {
    if (u) root.style.setProperty('--hero-img', 'url(' + u + ')');
  });

    // ---- auto tab tour: har 3s next tab, page scroll nahi hota; hover par pause ----
  function startTour(fr) {
    const tf = fr && fr.querySelector('iframe');
    if (!tf || rm) return;
    clearInterval(fr._tour);
    let paused = false;
    fr.onmouseenter = () => { paused = true; };
    fr.onmouseleave = () => { paused = false; };
    fr._tour = setInterval(() => {
      if (!fr.isConnected || !fr.classList.contains('rs-live')) return clearInterval(fr._tour);
      const r = fr.getBoundingClientRect();
      if (paused || r.bottom < 0 || r.top > innerHeight) return;
      try {
        const d = tf.contentDocument;
        const list = [...d.querySelectorAll('#side .nv')];
        if (!list.length) return;
        const cur = list.findIndex((n) => n.classList.contains('on'));
        list[(cur + 1) % list.length].click();
        const sd = d.getElementById('side');
        const el = sd && sd.querySelector('.nv.on');
        if (el) {
          const a = el.getBoundingClientRect(), b = sd.getBoundingClientRect();
          sd.scrollTo({
            left: sd.scrollLeft + a.left - b.left - (sd.clientWidth - a.width) / 2,
            top: sd.scrollTop + a.top - b.top - (sd.clientHeight - a.height) / 2,
            behavior: 'smooth',
          });
        }
      } catch (e) { /* ignore */ }
    }, 3000);
    timers.push(fr._tour);
  }

  // ---- first-time user guide ----
  const stopGuide = startGuide(root);

  root._stopShowcase = () => { io.disconnect(); io2.disconnect(); timers.forEach(clearInterval); stopGuide(); };
}