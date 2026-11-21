// "use client";
// /**
//  * ILM ORA Workshops: ek hi self-contained page component.
//  *
//  *   src/legacy-pages/Landing/Ilmora-workshops.jsx   (yehi file, koi nayi file nahi)
//  *   app/(public)/Ilmora-workshops/client.jsx        renders <IlmoraWorkshops {...props} />
//  *   app/(public)/Ilmora-workshops/page.jsx          metadata + <Client />
//  *
//  * Page ke andar navigation URL hash se hota hai:
//  *   #/workshops              listing           #/dashboard         registered workshops
//  *   #/workshops/<slug>       details           #/watch/<slug>      on-demand modules
//  *   #/register/<slug>        registration      #/login             sign in / sign up
//  *   #/confirmation/<slug>    confirmation
//  *
//  * IMAGES: src/assets/Workshop/ ke 10 real images neeche IMAGE IMPORTS mein hain.
//  * Agar aapki files .jpg / .jpeg / .webp hain to sirf imports ka extension badal do.
//  * Sabhi page sections IMG / MEDIA / TEAM / GALLERY / JOURNEY config se chalte hain.
//  *
//  * INTEGRATION: CONFIG block dekho. Real backend ke liye USE_MOCK = false karo.
//  * Saare styles .wk ke andar scoped hain, isliye baaki pages affect nahi hote.
//  */
// import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// // Same shared shell (AnnouncementBanner, Navbar, Footer) jo baaki Ilmora-* pages use karte hain.
// import PublicLayout from "../Landing/components/PublicLayout";

// /* ====================================================================
//    IMAGE IMPORTS  (src/assets/Workshop)
//    Extension .png assume kiya hai. Agar file .jpg / .webp hai to yahan badal do.
//    ==================================================================== */
// import imgCoding from '../../assets/Workshop/Focused Coding Workshop.webp';
// import imgCeo from '../../assets/Workshop/ILM ORA CEO Corporate Profile.webp';
// import imgDirector from '../../assets/Workshop/ILM ORA Corporate Portrait Banner.webp';
// import imgCorp from '../../assets/Workshop/ILM ORA Corporate Training Workshop.webp';
// import imgCertFull from '../../assets/Workshop/ILM ORA Full Stack Certificate.webp';
// import imgJavaCelebration from '../../assets/Workshop/ILM ORA Java Workshop Celebration.webp';
// import imgJavaLive from '../../assets/Workshop/ILM ORA Java Workshop Live.webp';
// import imgCelebration from '../../assets/Workshop/ILM ORA Workshop Celebration.webp';
// import imgInstructor from '../../assets/Workshop/ILM ORA Workshop Instructor Portrait.webp';
// import imgCertCeremony from '../../assets/Workshop/Java Workshop Certificate Ceremony.webp';
// import logo0 from '../../assets/Workshop/Logo/01_Claude.webp';
// import logo1 from '../../assets/Workshop/Logo/02_Make.webp';
// import logo2 from '../../assets/Workshop/Logo/03_Magnific_AI.webp';
// import logo3 from '../../assets/Workshop/Logo/04_Runway.webp';
// import logo4 from '../../assets/Workshop/Logo/05_Luma_AI.webp';
// import logo5 from '../../assets/Workshop/Logo/06_Topaz_Labs.webp';
// import logo6 from '../../assets/Workshop/Logo/07_DaVinci_Resolve.webp';
// import logo7 from '../../assets/Workshop/Logo/08_Midjourney.webp';
// import logo8 from '../../assets/Workshop/Logo/09_Perplexity.webp';
// import mentorShibli from '../../assets/Workshop/Mentor/M Shibli.webp';
// import mentorShareef from '../../assets/Workshop/Mentor/Shareef.webp';
// import mentorRaghib from '../../assets/Workshop/Mentor/Raghib.webp';
// import mentorVishesh from '../../assets/Workshop/Mentor/Vishesh.webp';
// import mentorPrachi from '../../assets/Workshop/Mentor/Prachi Sharan.webp';
// import mentorYash from '../../assets/Workshop/Mentor/Yash Kumar.webp';
// import cineCoding from '../../assets/Workshop/ILM_ORA_Cinematic_Video_Images_WebP/01_student_coding.webp';
// import cineMentor from '../../assets/Workshop/ILM_ORA_Cinematic_Video_Images_WebP/02_mentor_guidance.webp';
// import cineAi from '../../assets/Workshop/ILM_ORA_Cinematic_Video_Images_WebP/03_ai_learning.webp';
// import cinePresent from '../../assets/Workshop/ILM_ORA_Cinematic_Video_Images_WebP/04_product_presentation.webp';
// import imgStudentCollab from '../../assets/Workshop/ILM_ORA_Workshops_Media/Images/01_student_collaboration.webp';
// import imgMentorGuidance from '../../assets/Workshop/ILM_ORA_Workshops_Media/Images/02_mentor_guidance.webp';
// import vidEnvironment from '../../assets/Workshop/ILM_ORA_Workshops_Media/Videos/01_workshop_environment.mp4';
// import vidInstructor from '../../assets/Workshop/ILM_ORA_Workshops_Media/Videos/02_instructor_workspace.mp4';
// import vidTraining from '../../assets/Workshop/ILM_ORA_Workshops_Media/Videos/03_training_session.mp4';

// /* ====================================================================
//    CONFIG
//    ==================================================================== */

// const CONFIG = {
//   /** true  = sample data (UI preview only, page par clearly labelled).
//    *  false = real backend through realApi below. */
//   USE_MOCK: true,
//   API_BASE: process.env.NEXT_PUBLIC_API_URL || '',
//   /** Corporate / group enquiries ka email. Apna real email yahan daalo. */
//   CONTACT_EMAIL: 'workshops@ilmora.example',
//   /** Offer strip / pricing card. REAL values daalo (dates, price, refund policy). */
//   OFFER: {
//     on: true,
//     banner: 'LIMITED SEATS: Register now at the launch price',
//     cohort: 'Next cohort: SET REAL DATES',
//     startsAt: null, // ms timestamp, e.g. Date.UTC(2026, 10, 27, 13, 30). null = countdown hidden
//     price: 199, original: 9999,
//     registerSlug: 'fullstack-nextjs-launchpad', // flagship workshop jiska register page 'Reserve my seat' kholega
//     batchNote: 'Batch 1 price. Increases from the next batch.',
//     refund: 'If you complete every build and the workshop is not for you, request a refund within 24 hours of the final live session.',
//   },
// };

// /* ====================================================================
//    MEDIA CONFIG  (images / videos ek hi jagah se badlo)
//    ==================================================================== */
// /** Next.js static import object {src,width,height} ya plain string, dono chalte hain. */
// const U = (m) => (m && m.src) || m;

// const IMG = {
//   coding: U(imgCoding),
//   ceo: U(imgCeo),
//   director: U(imgDirector),
//   corp: U(imgCorp),
//   certFull: U(imgCertFull),
//   javaCelebration: U(imgJavaCelebration),
//   javaLive: U(imgJavaLive),
//   celebration: U(imgCelebration),
//   instructor: U(imgInstructor),
//     certCeremony: U(imgCertCeremony),
//   studentCollab: U(imgStudentCollab),
//   mentorGuidance: U(imgMentorGuidance),
// };

// const MEDIA = {
//   /** Hero ke liye real video (mp4 URL). Khali ho to hero photo use hota hai. */
//   heroVideo: '',
//   heroPoster: IMG.javaLive,
//     /** Per-workshop cover override: { 'ai-agents-from-scratch': '/workshops/ai-agents.jpg' } */
//   covers: {
//         'ai-agents-from-scratch': U(cineAi),
//     'prompt-engineering-masterclass': U(cineCoding),
//     'genai-for-business-ops': U(cinePresent),
//     'fullstack-nextjs-launchpad': IMG.javaLive,
//     'api-design-that-scales': U(cineCoding),
//     'git-and-ci-for-teams': IMG.mentorGuidance,
//     'ux-research-in-a-day': IMG.studentCollab,
//     'design-systems-figma': IMG.celebration,
//     'motion-design-for-product': IMG.javaCelebration,
//         'growth-marketing-loops': U(cinePresent),
//     'seo-in-the-ai-era': IMG.studentCollab,
//     'brand-storytelling-lab': IMG.celebration,
//     'startup-finance-basics': IMG.corp,
//     'product-strategy-bootcamp': U(cinePresent),
//     'leading-through-change': IMG.corp,
//     'first-time-manager-playbook': IMG.mentorGuidance,
//     'executive-presence': IMG.instructor,
//     'hiring-with-structured-interviews': IMG.studentCollab,
//     'hr-onboarding-and-retention': IMG.celebration,
//     'contact-center-qa-and-coaching': IMG.corp,
//     'handling-difficult-customers': IMG.mentorGuidance,
//     'devops-and-cicd-essentials': IMG.coding,
//     'cloud-architecture-fundamentals': U(cineCoding),
//   },
//   /** Per-workshop promo video (YouTube ID) details page par. */
//   promos: {},
//   /** Workshop instructor photo override: { aarav: '/team/aarav.jpg' } */
//      instructors: { shareef: U(mentorShareef), raghib: U(mentorRaghib), vishesh: U(mentorVishesh) },
//   /** "Experience ILM ORA Workshops" videos. youtube = YouTube ID, src = mp4 URL.
//    *  Dono khali = card "official video will be added" dikhata hai (fake video nahi). */
//     videos: [
//     { id: 'environment', tag: 'Illustrative preview', title: 'The learning environment', text: 'A look at the kind of collaborative room where hands-on sessions take place.', poster: '', pos: '50% 50%', alt: 'Illustrative video of a workshop room with learners at tables', youtube: '', src: vidEnvironment },
//     { id: 'instructor', tag: 'Illustrative preview', title: 'Instructor at work', text: 'An instructor at a laptop, the way live build sessions are guided.', poster: '', pos: '50% 30%', alt: 'Illustrative video of an instructor working on a laptop', youtube: '', src: vidInstructor },
//     { id: 'training', tag: 'Illustrative preview', title: 'A training session', text: 'A presentation-style training session with a group of learners.', poster: '', pos: '50% 50%', alt: 'Illustrative video of a training session with a presentation screen', youtube: '', src: vidTraining },
//   ],
//   /** Learner stories (sirf real, permission-cleared). Format:
//    *  { name, role, workshop, quote, photo, youtube } */
//   stories: [],
// };

// /** Har workshop category ka real cover photo. */
// const CATEGORY_COVER = {
//   AI: { src: IMG.coding, pos: '50% 40%' },
//   Development: { src: IMG.javaLive, pos: '50% 40%' },
//   Design: { src: IMG.celebration, pos: '50% 35%' },
//   Marketing: { src: IMG.javaCelebration, pos: '50% 35%' },
//   Business: { src: IMG.corp, pos: '50% 45%' },
//   Leadership: { src: IMG.corp, pos: '30% 40%' },
//   HR: { src: IMG.celebration, pos: '70% 40%' },
//   'Contact Center': { src: IMG.corp, pos: '75% 45%' },
//   Engineering: { src: IMG.coding, pos: '30% 50%' },
// };

// /** Mentors section: role apne real details se badlo. role khali ho to line khali rehti hai. */
// const MENTORS = [
//   {
//     name: 'M. Shibli',
//     role: 'Co-Founder',
//     org: 'ILM ORA',
//     img: U(mentorShibli),
//     pos: '50% 20%',
//   },
//   {
//     name: 'Shareef',
//     role: 'Workshop Trainer',
//     org: 'ILM ORA',
//     img: U(mentorShareef),
//     pos: '50% 25%',
//   },
//   {
//     name: 'Raghib',
//     role: 'Workshop Instructor',
//     org: 'ILM ORA',
//     img: U(mentorRaghib),
//     pos: '50% 70%',
//   },
//   {
//     name: 'Vishesh',
//     role: 'Workshop Trainer',
//     org: 'ILM ORA',
//     img: U(mentorVishesh),
//     pos: '50% 20%',
//   },
//   {
//     name: 'Prachi Sharan',
//     role: 'Workshop Coordinator',
//     org: 'ILM ORA',
//     img: U(mentorPrachi),
//     pos: '50% 0%',
//   },
//   {
//     name: 'Yash Kumar',
//     role: 'Workshop Coordinator',
//     org: 'ILM ORA',
//     img: U(mentorYash),
//     pos: '50% 0%',
//   },
// ];

// /** REAL learner feedback yahan daalo (sirf permission-cleared). Naya feedback upar add karo.
//  *  Text card:   { name, role, text, source: 'linkedin' | 'x' | 'whatsapp' | 'google', date: 'Nov 2026', rating: 5 }
//  *  Video card:  { name, role, text, youtube: 'YOUTUBE_ID' }  ya  { video: '/path/video.mp4', poster: U(img) }
//  *  Screenshot:  { name, shot: U(importedImage) }
//  *  photo: U(importedImage) optional. Baaki sab fields optional. */
// /** Real feedback yahan daalo. Jab isme kuch bhi ho, sample cards apne aap hat jaate hain. */
// const FEEDBACK_REAL = [
//   { name: 'Learner 1', role: 'ILM ORA learner', youtube: 'VQL78M8Y7iY' },
//   { name: 'Sample learner A', role: 'Sample role', text: 'Sample text: yahan learner ka real feedback aayega.', source: 'linkedin', date: 'Nov 2026', rating: 5, sample: true },
//   { name: 'Sample learner B', role: 'Sample role', text: 'Sample text: live build days se kaafi kuch seekhne ko mila.', source: 'x', date: 'Nov 2026', rating: 5, sample: true },
//   { name: 'Learner 2', role: 'ILM ORA learner', youtube: 'R2fnssUvazU' },
//   { name: 'Sample learner C', role: 'Sample role', text: 'Sample text: instructor ne har doubt clear kiya.', source: 'linkedin', date: 'Nov 2026', rating: 5, sample: true },
//   { name: 'Sample learner D', role: 'Sample role', text: 'Sample text: projects banane se confidence aaya.', source: 'whatsapp', date: 'Nov 2026', rating: 5, sample: true },
//   { name: 'Learner 3', role: 'ILM ORA learner', youtube: 'PlHKF8dKZXA' },
//   { name: 'Sample learner E', role: 'Sample role', text: 'Sample text: is jagah real review replace hoga.', source: 'google', date: 'Nov 2026', rating: 5, sample: true },
// ];

// /** Sirf layout preview ke liye (USE_MOCK true hone par). Real nahi hain, "Sample" tag ke saath dikhte hain. */
// const FEEDBACK_SAMPLE = Array.from({ length: 10 }, (_, i) => ({
//   name: `Sample learner ${i + 1}`,
//   role: 'Sample role',
//   text: [
//     'Sample text: yahan learner ka real feedback aayega.',
//     'Sample text: live build days se kaafi kuch seekhne ko mila.',
//     'Sample text: instructor ne har doubt clear kiya.',
//     'Sample text: projects banane se confidence aaya.',
//     'Sample text: is jagah real review replace hoga.',
//   ][i % 5],
//   source: ['linkedin', 'whatsapp', 'x', 'google'][i % 4],
//   date: 'Nov 2026',
//   rating: 5,
//   sample: true,
// }));

// const FEEDBACK = FEEDBACK_REAL.length ? FEEDBACK_REAL : (CONFIG.USE_MOCK ? FEEDBACK_SAMPLE : []);
// const FEEDBACK_PREVIEW = 6;  // home page par kitne cards
// const FEEDBACK_PAGE = 12;    // /feedback page par ek baar mein kitne
// const SOURCE_LABEL = { linkedin: 'in', x: 'X', whatsapp: 'WA', google: 'G' };

// const GALLERY = [
//   { img: IMG.javaCelebration, cap: 'Java workshop celebration', pos: '50% 40%' },
 
//   { img: IMG.coding, cap: 'Focused coding session', pos: '50% 40%' },
//   { img: IMG.corp, cap: 'Corporate training workshop', pos: '50% 45%' },
//   { img: IMG.celebration, cap: 'Workshop celebration', pos: '50% 35%' },
//   { img: IMG.javaLive, cap: 'Live Java workshop', pos: '50% 40%' },
// ];

// const JOURNEY = [
//   { ic: 'compass', t: 'Explore workshops', d: 'Search by topic, level, price or date. Every workshop shows its instructor, format, duration and seats left before you decide.', img: IMG.celebration, alt: 'Learners together at an ILM ORA workshop', pos: '50% 40%' },
//   { ic: 'select', t: 'Select your workshop', d: 'Open the details page to read the agenda, outcomes and prerequisites, then register in about a minute.', img: IMG.corp, alt: 'ILM ORA corporate training workshop in a classroom', pos: '50% 45%' },
//      { ic: 'present', t: 'Learn from experts', d: 'Join the live session with your instructor and ask questions in real time, or watch the recording whenever it suits you.', img: IMG.mentorGuidance, alt: 'Mentor guiding a learner who is working on a laptop', pos: '50% 40%' },
//   { ic: 'code', t: 'Build practical projects', d: 'Apply every idea to a real task during the session and leave with working output you can show.', img: IMG.coding, alt: 'Learner coding during a focused workshop', pos: '50% 40%' },
//   { ic: 'assess', t: 'Complete assessment', d: 'Finish the session or modules and your instructor confirms completion.', img: IMG.instructor, alt: 'ILM ORA workshop instructor', pos: '50% 25%' },
//   { ic: 'award', t: 'Earn your certificate', d: 'Verified completions receive an ILM ORA certificate with a unique ID and QR verification.', img: IMG.certCeremony, alt: 'Learners receiving certificates at a Java workshop ceremony', pos: '50% 40%' },
// ];

// /* ====================================================================
//    SCOPED STYLES (sab kuch .wk ke andar)
//    ==================================================================== */
// const WK_CSS = `.wk{
//   --bg:var(--wkbg,#fbfcfe); --solid:var(--card,#ffffff);
//   --surface:color-mix(in srgb,var(--card,#fff) 94%,transparent);
//   --text:var(--tx,#1f1b18); --muted:var(--mut,#6a5f57);
//   --ln:var(--line,rgba(60,35,20,.14));
//   --brand:var(--or,#f97316); --brand2:#fb8b3a; --accent:#16a34a; --ok:#0f7a58; --err:#c42c49;
//   --shadow:0 8px 22px rgba(60,35,10,.12); --r-lg:16px; --r-md:12px; --r-sm:8px;
//   position:relative; isolation:isolate; background-color:var(--bg); background-image:linear-gradient(var(--wkgrid,rgba(100,120,160,.16)) 1px,transparent 1px),linear-gradient(90deg,var(--wkgrid,rgba(100,120,160,.16)) 1px,transparent 1px); background-size:32px 32px; color:var(--text);
//   min-height:60vh; font-family:inherit; font-size:14px; line-height:1.5; font-weight:400;
//   overflow-x:clip; -webkit-font-smoothing:antialiased;
// }
// .wk *,.wk *::before,.wk *::after{box-sizing:border-box}
// .wk h1,.wk h2,.wk h3,.wk h4{font-family:inherit;line-height:1.15;margin:0;letter-spacing:-.012em;color:var(--text)}
// .wk h1{font-size:clamp(1.3rem,2.8vw,1.8rem);font-weight:700}
// .wk h2{font-size:clamp(.98rem,1.6vw,1.15rem);font-weight:700}
// .wk h3{font-size:.92rem;font-weight:700}
// .wk p{margin:0}
// .wk a{color:inherit}
// .wk img{max-width:100%}
// .wk button,.wk input,.wk select,.wk textarea{font:inherit;color:inherit}
// .wk :focus-visible{outline:3px solid var(--accent);outline-offset:2px;border-radius:6px}
// .wk .wrap{--gx:clamp(14px,3.2vw,56px);width:100%;max-width:1680px;margin:0 auto;padding:0 var(--gx)}
// .wk .wk-main{position:relative;z-index:1;outline:none;padding-bottom:44px}
// .wk .notice{background:color-mix(in srgb,var(--accent) 14%,transparent);border-bottom:1px solid color-mix(in srgb,var(--accent) 40%,transparent);padding:6px 14px;text-align:center;font-size:.78rem;font-weight:600}
// .wk .sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0}
// .wk .muted{color:var(--muted)}

// /* buttons, badges */
// .wk .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid transparent;border-radius:999px;padding:7px 15px;min-height:36px;font-size:.86rem;font-weight:700;cursor:pointer;text-decoration:none;white-space:nowrap;transition:transform .18s,box-shadow .2s,background .2s,border-color .2s}
// .wk .btn:active{transform:scale(.97)}
// .wk .btn-primary{background:linear-gradient(135deg,var(--brand),var(--brand2));color:#fff;box-shadow:0 6px 16px color-mix(in srgb,var(--brand) 38%,transparent)}
// .wk .btn-primary:hover{box-shadow:0 9px 22px color-mix(in srgb,var(--brand) 52%,transparent);transform:translateY(-1px)}
// .wk .btn-ghost{background:transparent;border-color:var(--ln);color:var(--text)}
// .wk .btn-ghost:hover{background:color-mix(in srgb,var(--brand) 9%,transparent);border-color:var(--brand)}
// .wk .btn-green{background:var(--accent);color:#fff}
// .wk .btn-green:hover{background:#12873e}
// .wk .btn-light{background:#fff;color:#1f1b18}
// .wk .btn-light:hover{background:#ffe9d6}
// .wk .btn-line{background:transparent;border-color:rgba(255,255,255,.55);color:#fff}
// .wk .btn-line:hover{background:rgba(255,255,255,.14);border-color:#fff}
// .wk .btn[disabled],.wk .btn[aria-disabled="true"]{opacity:.55;cursor:not-allowed;transform:none;box-shadow:none}
// .wk .btn-sm{padding:5px 11px;min-height:30px;font-size:.78rem}
// .wk .btn-lg{padding:8px 18px;min-height:40px;font-size:.88rem}
// .wk .btn-block{width:100%}
// .wk .badge{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:999px;font-size:.68rem;font-weight:700;background:rgba(10,12,30,.72);color:#fff;backdrop-filter:blur(6px)}
// .wk .badge.live i{width:7px;height:7px;border-radius:50%;background:#ff4d6d;animation:wkpulse 1.8s infinite}
// .wk .badge.free{background:var(--accent);color:#fff}
// .wk .badge.feat{background:var(--brand);color:#fff}
// @keyframes wkpulse{70%{box-shadow:0 0 0 7px rgba(255,77,109,0)}100%{box-shadow:0 0 0 0 rgba(255,77,109,0)}}
// .wk .glass{background:var(--surface);border:1px solid var(--ln);box-shadow:var(--shadow)}

// /* reveal */
// .wk .wkrv{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}
// .wk .wkrv.wkrv-on{opacity:1;transform:none}

// /* cinematic hero */
// .wk .hero2{position:relative;color:#fff;overflow:hidden;background:#0b0b10;min-height:min(64vh,480px);display:flex;flex-direction:column;justify-content:flex-end}
// .wk .hero2-bg{position:absolute;inset:-4% 0;transform:scale(1.08);will-change:transform}
// .wk .hero2-bg img,.wk .hero2-bg video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
// .wk .hero2-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,8,14,.9) 0%,rgba(8,8,14,.62) 55%,rgba(8,8,14,.34) 100%),linear-gradient(0deg,rgba(8,8,14,.88),transparent 48%)}
// .wk .hero2-in{position:relative;display:grid;gap:18px;padding-top:56px;padding-bottom:16px;align-items:end}
// @media(min-width:960px){.wk .hero2-in{grid-template-columns:minmax(0,1.5fr) minmax(280px,.75fr)}}
// .wk .hero2 h1{color:#fff;font-size:clamp(1.55rem,4.2vw,2.6rem);font-weight:800;line-height:1.08;letter-spacing:-.025em;max-width:22ch}
// .wk .hero2 p.lead{color:rgba(255,255,255,.84);font-size:clamp(.84rem,1.3vw,.95rem);max-width:56ch;margin-top:10px}
// .wk .hero2-cta{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
// .wk .livepill{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(8px);font-size:.74rem;font-weight:700;margin-bottom:12px}
// .wk .livepill i{width:8px;height:8px;border-radius:50%;background:#ff4d6d;animation:wkpulse 1.8s infinite}
// .wk .hero2-card{background:rgba(14,14,22,.58);border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(14px);border-radius:16px;padding:14px;display:grid;gap:8px}
// .wk .hero2-card small{font-size:.72rem;font-weight:700;color:#ffb27a}
// .wk .hero2-card h3{color:#fff;font-size:.95rem}
// .wk .hero2-card p{color:rgba(255,255,255,.78);font-size:.82rem}
// .wk .cdn{display:flex;gap:8px}
// .wk .cdn div{background:rgba(0,0,0,.28);border-radius:10px;padding:6px 10px;text-align:center;min-width:52px}
// .wk .cdn b{display:block;font-size:1.15rem;font-variant-numeric:tabular-nums}
// .wk .cdn small{font-size:.65rem;opacity:.85}
// .wk .hero2-stats{position:relative;display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:0;padding:12px 0 16px;border-top:1px solid rgba(255,255,255,.2)}
// @media(min-width:700px){.wk .hero2-stats{grid-template-columns:repeat(4,1fr)}}
// .wk .hero2-stats b{display:block;font-size:clamp(1.15rem,2.2vw,1.5rem);font-weight:800;line-height:1;font-variant-numeric:tabular-nums}
// .wk .hero2-stats span{font-size:.74rem;color:rgba(255,255,255,.74)}

// /* explore: search + filters */
// .wk .exhead h2.h-xl,.wk h2.h-xl{font-size:clamp(1.1rem,2vw,1.45rem);font-weight:700;letter-spacing:-.015em}
// .wk .searchbox{display:flex;align-items:center;gap:8px;margin-top:16px;padding:5px 5px 5px 14px;border-radius:999px;max-width:640px}
// .wk .searchbox svg{flex:none;opacity:.6}
// .wk .searchbox input{flex:1;min-width:0;border:0;background:transparent;outline:0;font-size:.92rem;padding:7px 0}
// .wk .searchbox:focus-within{box-shadow:0 0 0 3px color-mix(in srgb,var(--brand) 50%,transparent),var(--shadow)}
// .wk .cats{display:flex;gap:6px;overflow-x:auto;padding:12px var(--gx) 4px;margin:0 calc(var(--gx) * -1);scrollbar-width:none}
// .wk .cats::-webkit-scrollbar{display:none}
// .wk .pill{flex:none;border:1px solid var(--ln);background:var(--surface);border-radius:999px;padding:5px 13px;font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s}
// .wk .pill small{opacity:.65;margin-left:4px;font-weight:600}
// .wk .pill:hover{border-color:var(--brand)}
// .wk .pill[aria-pressed="true"]{background:linear-gradient(135deg,var(--brand),var(--brand2));border-color:transparent;color:#fff}
// .wk .filters{display:none;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-top:10px;padding:12px;border-radius:var(--r-md)}
// .wk .filters.open{display:grid}
// @media(min-width:900px){.wk .filters{display:grid}.wk #filtersBtn{display:none}}
// .wk label.f{display:grid;gap:4px;font-size:.74rem;font-weight:600;color:var(--muted)}
// .wk select,.wk input[type=text],.wk input[type=email],.wk input[type=password],.wk input[type=tel],.wk textarea,.wk input[type=search]{width:100%}
// .wk .in,.wk select,.wk textarea{background:var(--solid);border:1px solid var(--ln);border-radius:var(--r-sm);padding:7px 10px;min-height:36px;font-size:.88rem;color:var(--text)}
// .wk .in:focus,.wk select:focus,.wk textarea:focus{outline:3px solid color-mix(in srgb,var(--brand) 45%,transparent);border-color:var(--brand)}
// .wk .in[aria-invalid="true"],.wk textarea[aria-invalid="true"],.wk select[aria-invalid="true"]{border-color:var(--err)}
// .wk .err{color:var(--err);font-size:.76rem;font-weight:600;min-height:1em}

// /* sections + cards */
// .wk .sec{margin-top:30px}
// .wk .sechead{display:flex;align-items:end;justify-content:space-between;gap:10px;margin-bottom:14px}
// .wk .sechead p{color:var(--muted);margin-top:3px;font-size:.82rem;max-width:62ch}
// .wk .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px}
// .wk .row{display:flex;gap:14px;overflow-x:auto;padding:6px var(--gx) 14px;margin:0 calc(var(--gx) * -1);scrollbar-width:none}
// .wk .row::-webkit-scrollbar{display:none}
// @media(prefers-reduced-motion:reduce){.wk .row{scrollbar-width:thin}.wk .row::-webkit-scrollbar{display:block}}
// .wk .row .card{flex:0 0 min(244px,78vw);min-width:0}
// .wk .card{position:relative;min-width:0;display:flex;flex-direction:column;border-radius:var(--r-lg);background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);overflow:hidden;transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,border-color .3s}
// .wk .card:hover{transform:translateY(-4px);box-shadow:0 18px 36px color-mix(in srgb,var(--brand) 22%,rgba(60,25,0,.18))}
// .wk .card.featured{border-color:var(--brand)}
// .wk .art{position:relative;overflow:hidden;aspect-ratio:16/9;background:#1a1a22}
// .wk .art img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
// .wk .card:hover .art img{transform:scale(1.07)}
// .wk .art::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.4),transparent 55%);pointer-events:none}
// .wk .art .badges{position:absolute;left:9px;top:9px;display:flex;gap:5px;flex-wrap:wrap;z-index:1}
// .wk .cbody{display:flex;flex-direction:column;gap:6px;padding:10px 12px 12px;flex:1}
// .wk .cbody .cat{font-size:.72rem;font-weight:700;color:var(--brand)}
// .wk .cbody h3 a{text-decoration:none}
// .wk .cbody h3 a::before{content:"";position:absolute;inset:0;z-index:0;border-radius:inherit}
// .wk .cbody p.sd{color:var(--muted);font-size:.8rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
// .wk .inst{display:flex;align-items:center;gap:9px;font-size:.8rem}
// .wk .inst b{display:block;font-weight:700;line-height:1.2}
// .wk .inst small{display:block;color:var(--muted);font-size:.7rem}
// .wk .av{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:.62rem;color:#fff;box-shadow:0 0 0 2px var(--solid)}
// .wk .av.lg{width:58px;height:58px;font-size:1.1rem}
// .wk .meta{display:flex;flex-wrap:wrap;gap:3px 11px;font-size:.74rem;color:var(--muted)}
// .wk .meta span{display:inline-flex;align-items:center;gap:4px}
// .wk .meta .seat{color:var(--ok);font-weight:700}
// .wk .meta .seat.low{color:var(--err)}
// .wk .cfoot{margin-top:auto;flex-wrap:wrap;display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:9px;border-top:1px dashed var(--ln)}
// .wk .price{font-weight:800;font-size:1.04rem}
// .wk .price.free{color:var(--ok)}
// .wk .cta{display:flex;gap:6px;position:relative;z-index:2}
// .wk .cta .btn-sm{padding:5px 9px;font-size:.74rem}
// .wk .state{display:grid;place-items:center;text-align:center;gap:8px;padding:26px 16px;border-radius:var(--r-lg)}
// .wk .state svg{opacity:.85}
// .wk .skel{border-radius:var(--r-lg);height:300px;background:linear-gradient(100deg,var(--surface) 30%,color-mix(in srgb,var(--brand) 13%,var(--surface)) 50%,var(--surface) 70%);background-size:300% 100%;animation:wksh 1.3s infinite linear;border:1px solid var(--ln)}
// @keyframes wksh{to{background-position:-100% 0}}

// /* experience videos */
// .wk .xp{display:grid;gap:16px}
// @media(min-width:860px){.wk .xp{grid-template-columns:1.5fr 1fr;grid-template-rows:1fr 1fr}.wk .xp .lead{grid-row:1/3}}
// .wk .xp-card{min-height:160px}
// .wk .xp-btn{position:relative;display:block;width:100%;height:100%;min-height:160px;border:0;padding:0;border-radius:14px;overflow:hidden;cursor:pointer;background:#111;text-align:left;color:#fff}
// .wk .xp-btn[disabled]{cursor:default}
// .wk .xp-btn img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
// .wk .xp-btn:not([disabled]):hover img{transform:scale(1.05)}
// .wk .xp-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.88),rgba(8,8,14,.15) 65%)}
// .wk .xp-play{position:absolute;left:50%;top:42%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:var(--brand);display:grid;place-items:center;box-shadow:0 0 0 6px rgba(249,115,22,.28);transition:transform .25s}
// .wk .xp-btn:hover .xp-play{transform:scale(1.1)}
// .wk .xp-cap{position:absolute;left:0;right:0;bottom:0;padding:12px 14px;display:grid;gap:3px}
// .wk .xp-cap small{font-size:.72rem;font-weight:700;color:#ffb27a}
// .wk .xp-cap b{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.2}
// .wk .xp-cap em{font-style:normal;font-size:.74rem;color:rgba(255,255,255,.8);max-width:52ch}
// .wk .vm{position:fixed;inset:0;z-index:95;background:rgba(5,5,10,.86);display:grid;place-items:center;padding:16px;backdrop-filter:blur(4px)}
// .wk .vm-box{position:relative;width:min(960px,100%);aspect-ratio:16/9;background:#000;border-radius:16px;overflow:hidden}
// .wk .vm-box iframe,.wk .vm-box video{position:absolute;inset:0;width:100%;height:100%;border:0}
// .wk .vm-x{position:absolute;right:8px;top:8px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(0,0,0,.65);color:#fff;display:grid;place-items:center;cursor:pointer}

// /* topic tiles (real photos) */
// .wk .tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}
// .wk .tile{position:relative;display:block;border-radius:12px;overflow:hidden;aspect-ratio:16/10;text-decoration:none;color:#fff;background:#111}
// .wk .tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
// .wk .tile:hover img{transform:scale(1.08)}
// .wk .tile::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.92),rgba(8,8,14,.12) 62%)}
// .wk .tile div{position:absolute;left:0;right:0;bottom:0;padding:9px 11px;z-index:1}
// .wk .tile h3{color:#fff;font-size:.88rem}
// .wk .tile p{font-size:.7rem;color:rgba(255,255,255,.86);margin-top:1px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
// .wk .row .tile{flex:0 0 min(210px,62vw);min-width:0}

// /* learning journey */
// .wk .jr{display:grid;gap:14px;margin-top:14px}
// .wk .jr-step{display:grid;gap:10px;align-items:center;padding:10px;border:1px solid var(--ln);border-radius:14px;background:var(--solid)}
// @media(min-width:700px){.wk .jr-step{grid-template-columns:minmax(220px,320px) 1fr;gap:18px}}
// .wk .jr-img{border-radius:10px;overflow:hidden;background:#fff;width:100%}
// .wk .jr-img img{display:block;width:100%;height:auto;transition:transform .9s cubic-bezier(.2,.7,.2,1)}
// .wk .jr-step:hover .jr-img img{transform:scale(1.05)}
// .wk .jr-no{font-size:1.1rem;font-weight:800;line-height:1;color:var(--brand)}
// .wk .jr-step h3{font-size:.98rem;margin:6px 0 3px}
// .wk .jr-step p{color:var(--muted);font-size:.84rem;max-width:60ch}

// /* certificate showcase */
// .wk .cert{display:grid;gap:18px;align-items:center;padding:clamp(12px,2.2vw,22px);border-radius:16px;background:linear-gradient(135deg,color-mix(in srgb,var(--brand) 10%,var(--solid)),var(--solid) 55%,color-mix(in srgb,var(--accent) 10%,var(--solid)));border:1px solid var(--ln);box-shadow:var(--shadow)}
// @media(min-width:920px){.wk .cert{grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr)}}
// .wk .cert-frame{position:relative;border-radius:10px;background:#fff;padding:5px;box-shadow:0 14px 30px rgba(60,25,0,.22);transform:rotate(-1deg);transition:transform .5s;max-width:380px;margin:0 auto}
// .wk .cert-frame:hover{transform:rotate(0) scale(1.015)}
// .wk .cert-frame img{display:block;width:100%;height:auto;border-radius:6px}
// .wk .cert-frame .tagc{position:absolute;left:14px;top:-12px;background:var(--accent);color:#fff;font-size:.72rem;font-weight:700;padding:4px 11px;border-radius:999px}
// .wk .cert-list{display:grid;gap:8px;margin:10px 0 14px;padding:0;list-style:none}
// @media(min-width:560px){.wk .cert-list{grid-template-columns:1fr 1fr}}
// .wk .cert-list li{display:flex;gap:8px;align-items:center;font-size:.82rem}
// .wk .cert-list li svg{flex:none;color:var(--ok)}
// .wk .cert-act{display:flex;gap:10px;flex-wrap:wrap}
// .wk .cert-note{font-size:.72rem;color:var(--muted);margin-top:10px;max-width:60ch}

// /* team */
// .wk .team{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
// .wk .tm{border-radius:12px;overflow:hidden;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);height:100%}
// .wk .tm .ph{overflow:hidden;background:#fff}
// .wk .tm .ph img{display:block;width:100%;height:auto;transition:transform .7s}
// .wk .tm:hover .ph img{transform:scale(1.05)}
// .wk .tm .tx{padding:8px 10px}
// .wk .tm p{color:var(--muted);font-size:.74rem;margin-top:1px}
// .wk .ilist{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px 22px;margin-top:16px;padding:0;list-style:none}
// .wk .ilist li{display:flex;gap:11px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--ln)}
// .wk .ilist b{display:block;font-size:.88rem}
// .wk .ilist small{color:var(--muted);font-size:.76rem}

// /* corporate + cta band */
// .wk .band{display:grid;align-items:center;border-radius:16px;overflow:hidden;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow)}
// .wk .band img{display:block;width:100%;height:auto}
// @media(min-width:760px){.wk .band{grid-template-columns:minmax(0,1.1fr) minmax(0,1fr)}}
// .wk .band-in{padding:clamp(16px,3vw,32px)}
// .wk .band h2{font-size:clamp(1.05rem,2vw,1.4rem);font-weight:700}
// .wk .band p{color:var(--muted);margin-top:8px;font-size:.88rem}
// .wk .band .cert-act{margin-top:20px}
// .wk .plist{display:grid;gap:0;margin-top:6px;padding:0;list-style:none}
// @media(min-width:760px){.wk .plist{grid-template-columns:1fr 1fr;column-gap:44px}}
// .wk .plist li{display:grid;grid-template-columns:32px 1fr;gap:1px 10px;padding:9px 0;border-bottom:1px solid var(--ln);align-items:center}
// .wk .pi{grid-row:1/3;width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:color-mix(in srgb,var(--brand) 12%,transparent);color:var(--brand)}
// .wk .plist b{font-size:.86rem}
// .wk .plist span{color:var(--muted);font-size:.78rem}

// /* gallery + stories */
// .wk .gal{display:block;columns:2;column-gap:8px}
// @media(min-width:800px){.wk .gal{columns:3}}
// .wk .gal figure{position:relative;margin:0 0 8px;border-radius:10px;overflow:hidden;background:#111;break-inside:avoid}
// @media(min-width:800px){.wk .gal figure{aspect-ratio:auto}}
// .wk .gal img{display:block;width:100%;height:auto;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
// .wk .gal figure:hover img{transform:scale(1.07)}
// .wk .gal figcaption{position:absolute;left:0;right:0;bottom:0;padding:16px 10px 7px;color:#fff;font-size:.72rem;font-weight:600;background:linear-gradient(0deg,rgba(8,8,14,.78),transparent)}
// .wk .stories{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
// .wk .story{padding:20px;border:1px solid var(--ln);border-radius:var(--r-lg);background:var(--solid)}
// .wk .story .qt{font-size:.95rem;margin:0 0 12px}
// .wk .story .who{display:flex;gap:10px;align-items:center}
// .wk .story img.ph{width:44px;height:44px;border-radius:50%;object-fit:cover}
// .wk .empty-note{padding:16px 18px;border:1px dashed var(--ln);border-radius:var(--r-md);color:var(--muted);font-size:.86rem;margin-top:14px;max-width:70ch}

// .wk .tic{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:8px;background:var(--brand);color:#fff;margin-bottom:5px}
// .wk .jr-top{display:flex;align-items:center;gap:8px}
// .wk .jr-ic{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;background:color-mix(in srgb,var(--brand) 14%,transparent);color:var(--brand)}
// .wk .natfig{position:relative;margin:14px auto 0;max-width:820px;border-radius:12px;overflow:hidden;background:#111;border:1px solid var(--ln)}
// .wk .natfig img{display:block;width:100%;height:auto}
// .wk .natfig figcaption{padding:8px 12px;font-size:.78rem;color:var(--muted);background:var(--solid)}
// .wk img,.wk video{max-width:100%}
// .wk{-webkit-text-size-adjust:100%;text-size-adjust:100%}
// @media(max-width:640px){.wk .hero2{min-height:auto}.wk .hero2-in{padding-top:40px}.wk .xp-card,.wk .xp-btn{min-height:190px}.wk .cfoot{gap:6px}.wk .sechead{flex-wrap:wrap}}
// @media(min-width:768px) and (max-width:1100px){.wk .grid{grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}.wk .tiles{grid-template-columns:repeat(auto-fill,minmax(180px,1fr))}}
// @media(min-width:1800px){.wk{font-size:15px}.wk .tiles{grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}}
// @media(max-width:900px){.wk .wk-main{padding-bottom:84px}}
// /* details */
// .wk .crumbs{padding-top:16px;font-size:.78rem;color:var(--muted)}
// .wk .crumbs a{text-decoration:none}.wk .crumbs a:hover{text-decoration:underline}
// .wk .banner{position:relative;margin-top:10px;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);height:clamp(130px,18vw,230px);background:#111}
// .wk .banner img{width:100%;height:100%;object-fit:cover;display:block}
// .wk .banner::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.4),transparent 55%)}
// .wk .banner .badges{position:absolute;left:14px;top:14px;display:flex;gap:6px;z-index:1}
// .wk .dgrid{display:grid;gap:18px;margin-top:18px}
// @media(min-width:960px){.wk .dgrid{grid-template-columns:minmax(0,1fr) 320px;align-items:start}}
// .wk .panel{border-radius:var(--r-lg);padding:14px}
// .wk .panel+.panel{margin-top:12px}
// .wk .panel h2{margin-bottom:10px}
// .wk .aside{position:sticky;top:104px}
// .wk .facts{display:grid;gap:9px;margin:12px 0;padding:0;list-style:none}
// .wk .facts li{display:flex;gap:9px;align-items:flex-start;font-size:.84rem}
// .wk .facts b{display:block;font-size:.7rem;color:var(--muted);font-weight:600}
// .wk .ticks{display:grid;gap:7px;padding:0;margin:0;list-style:none;font-size:.88rem}
// .wk .ticks li{display:flex;gap:8px}
// .wk .ticks li::before{content:"";flex:none;width:17px;height:17px;margin-top:2px;border-radius:50%;background:var(--ok) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10.5l3.2 3.2L15 6.8' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/contain no-repeat}
// .wk .twocol{display:grid;gap:14px}
// @media(min-width:640px){.wk .twocol{grid-template-columns:1fr 1fr}}
// .wk details.ag{border:1px solid var(--ln);border-radius:var(--r-md);background:var(--solid);overflow:hidden}
// .wk details.ag+details.ag{margin-top:8px}
// .wk details.ag summary{cursor:pointer;padding:10px 13px;display:flex;gap:10px;justify-content:space-between;align-items:center;font-weight:700;font-size:.88rem;list-style:none}
// .wk details.ag summary::-webkit-details-marker{display:none}
// .wk details.ag summary::after{content:"+";font-size:1.1rem;transition:transform .25s}
// .wk details.ag[open] summary::after{transform:rotate(45deg)}
// .wk details.ag .t{font-size:.74rem;color:var(--muted);font-weight:600}
// .wk details.ag div.d{padding:0 13px 12px;color:var(--muted);font-size:.84rem}
// .wk .linkbox{display:flex;gap:8px;align-items:center;background:var(--solid);border:1px dashed var(--ok);padding:8px 10px;border-radius:var(--r-sm);word-break:break-all;font-size:.8rem}
// .wk .alert{padding:9px 12px;border-radius:var(--r-sm);font-weight:600;font-size:.84rem}
// .wk .alert.bad{background:color-mix(in srgb,var(--err) 13%,transparent);color:var(--err);border:1px solid var(--err)}
// .wk .alert.good{background:color-mix(in srgb,var(--ok) 13%,transparent);color:var(--ok);border:1px solid var(--ok)}
// .wk .certmini{display:grid;gap:14px;align-items:center}
// @media(min-width:640px){.wk .certmini{grid-template-columns:150px 1fr}}
// .wk .certmini img{display:block;width:100%;height:auto;border-radius:8px;border:1px solid var(--ln);background:#fff}

// /* forms */
// .wk .formwrap{max-width:660px;margin:22px auto 0}
// .wk .form{display:grid;gap:11px}
// .wk .fr{display:grid;gap:11px}
// @media(min-width:600px){.wk .fr.two{grid-template-columns:1fr 1fr}}
// .wk .spin{width:15px;height:15px;border-radius:50%;border:2.5px solid rgba(255,255,255,.4);border-top-color:#fff;animation:wkrot .7s linear infinite}
// @keyframes wkrot{to{transform:rotate(360deg)}}
// .wk .jn{display:grid;gap:28px;max-width:900px;margin:26px auto 0;align-items:start}
// @media(min-width:820px){.wk .jn{grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:44px}}
// .wk .jn-info h1{font-size:clamp(1.3rem,2.6vw,1.65rem)}
// .wk .jn-sub{color:var(--muted);margin-top:6px;font-size:.88rem}
// .wk .jn-line{display:flex;justify-content:space-between;gap:12px;margin:22px 0 18px;font-size:.88rem;align-items:baseline}
// .wk .jn-line b{font-size:1.05rem}
// .wk .jn-pts{display:grid;gap:14px;list-style:none;margin:0;padding:0}
// .wk .jn-pts li{display:flex;gap:12px;align-items:flex-start;font-size:.86rem}
// .wk .jn-pts .ic{flex:none;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;background:color-mix(in srgb,var(--brand) 12%,transparent);color:var(--brand)}
// .wk .jn-pts b{display:block}
// .wk .jn-card{padding:26px}
// .wk .jn-note{font-size:.72rem;color:var(--muted);text-align:center;margin-top:8px}
// .wk .jn-say{display:flex;gap:10px;align-items:flex-end;margin-top:22px}
// .wk .jn-bub{background:color-mix(in srgb,var(--text) 6%,transparent);border-radius:12px;padding:12px 14px;font-size:.84rem}
// .wk .jn-sum{border-top:1px solid var(--ln);margin-top:6px;padding-top:10px;display:grid;gap:6px;font-size:.84rem}
// .wk .jn-sum div{display:flex;justify-content:space-between}
// .wk .jn-sum .tot{font-weight:800;border-top:1px solid var(--ln);padding-top:8px}
// .wk .linkbtn{background:none;border:0;padding:0;text-decoration:underline;cursor:pointer;color:inherit;font-size:inherit}

// /* ticket */
// .wk .ticketstage{perspective:1400px;margin:20px auto;max-width:470px}
// .wk .ticket{position:relative;transform-style:preserve-3d;transform:rotateX(var(--rx,8deg)) rotateY(var(--ry,-14deg));transition:transform .3s;animation:wktin 1.1s cubic-bezier(.2,.9,.2,1) both}
// @keyframes wktin{from{transform:rotateY(-120deg) scale(.7);opacity:0}}
// .wk .ticket .face{border-radius:20px;overflow:hidden;box-shadow:0 30px 60px rgba(90,35,0,.34);background:var(--solid);border:1px solid var(--ln)}
// .wk .ticket .top{height:100px;position:relative;transform:translateZ(26px);overflow:hidden}
// .wk .ticket .top img{width:100%;height:100%;object-fit:cover;display:block}
// .wk .ticket .mid{padding:15px 18px 6px;transform:translateZ(18px)}
// .wk .ticket .perf{height:0;border-top:2px dashed var(--ln);margin:8px 14px;position:relative}
// .wk .ticket .perf::before,.wk .ticket .perf::after{content:"";position:absolute;top:-11px;width:20px;height:20px;border-radius:50%;background:var(--bg)}
// .wk .ticket .perf::before{left:-24px}.wk .ticket .perf::after{right:-24px}
// .wk .ticket .bot{display:flex;justify-content:space-between;gap:10px;align-items:center;padding:9px 18px 18px;transform:translateZ(22px)}
// .wk .bars{height:36px;width:120px;background:repeating-linear-gradient(90deg,var(--text) 0 2px,transparent 2px 5px,var(--text) 5px 6px,transparent 6px 10px,var(--text) 10px 13px,transparent 13px 15px);opacity:.85;border-radius:4px}
// .wk .confetti{position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden}
// .wk .confetti i{position:absolute;top:-20px;width:8px;height:12px;border-radius:2px;animation:wkfall linear forwards}
// @keyframes wkfall{to{transform:translate3d(var(--dx),110vh,0) rotate(720deg)}}

// /* player + dashboard */
// .wk .player{border-radius:var(--r-lg);overflow:hidden;aspect-ratio:16/9;position:relative;background:#06071a;display:grid;place-items:center}
// .wk .player .bgp img{width:100%;height:100%;object-fit:cover;display:block}
// .wk .player .ctrl{position:absolute;left:0;right:0;bottom:0;padding:11px;display:flex;align-items:center;gap:10px;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff}
// .wk .prog{flex:1;height:5px;border-radius:6px;background:rgba(255,255,255,.28);overflow:hidden}
// .wk .prog i{display:block;height:100%;width:0;background:var(--accent);transition:width .25s linear}
// .wk .lessons{display:grid;gap:6px;padding:0;list-style:none;margin:0}
// .wk .lessons button{width:100%;text-align:left;display:flex;gap:8px;justify-content:space-between;padding:9px 11px;border-radius:var(--r-sm);border:1px solid var(--ln);background:var(--solid);cursor:pointer;font-weight:600;font-size:.84rem}
// .wk .lessons button[aria-current="true"]{border-color:var(--brand);background:color-mix(in srgb,var(--brand) 11%,var(--solid))}
// .wk .dash{display:grid;gap:12px;margin-top:16px}
// .wk .dcard{display:grid;gap:12px;padding:13px;border-radius:var(--r-lg)}
// @media(min-width:760px){.wk .dcard{grid-template-columns:130px 1fr auto;align-items:center}}
// .wk .dcard .art{border-radius:var(--r-md)}
// .wk #toasts{position:fixed;right:14px;bottom:14px;z-index:90;display:grid;gap:8px;max-width:min(340px,calc(100vw - 28px))}
// .wk .toast{padding:9px 13px;border-radius:12px;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);font-weight:600;font-size:.84rem;border-left:4px solid var(--brand);animation:wktst .35s ease}
// .wk .toast.ok{border-left-color:var(--ok)}.wk .toast.bad{border-left-color:var(--err)}
// @keyframes wktst{from{transform:translateY(12px);opacity:0}}
// .wk .nl{display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:18px 0;padding:18px 22px;border-radius:var(--r-lg);color:#fff;background:linear-gradient(120deg,#c2410c,var(--brand))}
// .wk .nl h3,.wk .nl p{color:#fff}.wk .nl .btn{background:#fff;color:#c2410c}
// .wk .qt{font-style:italic;margin-bottom:12px}
// .wk .faq details{border-bottom:1px solid var(--ln);padding:12px 0}.wk .faq summary{cursor:pointer;font-weight:600}.wk .faq p{color:var(--muted);margin-top:8px}
// .wk .share{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
// .wk .stickybar{position:fixed;left:0;right:0;bottom:0;z-index:40;display:none;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));background:var(--solid);border-top:1px solid var(--ln);box-shadow:0 -6px 20px rgba(0,0,0,.12)}
// @media(max-width:900px){.wk .stickybar{display:flex}}
// @media(prefers-reduced-motion:reduce){.wk *,.wk *::before,.wk *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}.wk .wkrv{opacity:1;transform:none}.wk .hero2-bg{transform:none!important}}
// `;

// /** Theme + font variables, baaki Ilmora-* pages jaisa hi. */
// const HOST_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
// .ilm{--wkbg:#fbfcfe;--wkgrid:rgba(100,120,160,.16);--cream:#f6ede6;--white:#ffffff;--card:#ffffff;--tx:#1f1b18;--tx2:#3b332d;--mut:#6a5f57;--or:#f97316;--ord:#c2410c;--line:#e7d9cd;--w:1200px;background:var(--white);color:var(--tx);font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;overflow-x:hidden;line-height:1.55}
// .ilm *{box-sizing:border-box}
// .ilm button{font-family:inherit;cursor:pointer}
// .ilm.dark{--wkbg:#0c0c14;--wkgrid:rgba(255,255,255,.06);--cream:#0c0c14;--white:#0f0f18;--card:#13131e;--tx:#f1f5f9;--tx2:#cbd5e1;--mut:#94a3b8;--line:rgba(255,255,255,.1)}
// @media(min-width:1600px){.ilm{--w:1360px}}`;


// /* ====================================================================
//    HELPERS
//    ==================================================================== */
// const IST = 'Asia/Kolkata';
// const fmtD = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: IST });
// const fmtDL = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: IST });
// const fmtT = new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: IST });
// const money = (p) => (p === 0 ? 'Free' : '\u20B9' + p.toLocaleString('en-IN'));
// const durTxt = (m) => (m >= 60 ? Math.floor(m / 60) + 'h' + (m % 60 ? ' ' + (m % 60) + 'm' : '') : m + 'm');
// const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('');
// const emailOK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
// /** Login ke baad sirf same-site relative redirect allow (open redirect se bachav). */
// const safeNext = (n, fallback = '/dashboard') => (typeof n === 'string' && /^\/(?!\/)/.test(n) ? n : fallback);
// const scrollToId = (id) => {
//   const el = document.getElementById(id);
//   if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
// };

// /** Site ke asli login (popup) ka user, localStorage se. Keys apne login ke hisaab se adjust karo. */
// let SITE_USER = null;
// const readSiteUser = () => {
//   const toUser = (o) => ({
//     id: o.id || o._id || o.userId || o.user_id || o.sub || o.email,
//     name: o.name || o.fullName || o.full_name || o.username || String(o.email).split('@')[0],
//     email: o.email,
//     hasId: Boolean(o.id || o._id || o.userId || o.user_id || o.sub),
//   });
//   const findUser = (o, depth = 0) => {
//     if (!o || typeof o !== 'object' || depth > 3) return null;
//     if (typeof o.email === 'string' && o.email.includes('@')) return toUser(o);
//     for (const k of Object.keys(o)) { const r = findUser(o[k], depth + 1); if (r) return r; }
//     return null;
//   };
//   const findToken = (o, depth = 0) => {
//     if (!o || typeof o !== 'object' || depth > 3) return null;
//     for (const k of Object.keys(o)) {
//       if (typeof o[k] === 'string' && /token/i.test(k) && o[k].length > 20) return o[k];
//       const r = findToken(o[k], depth + 1); if (r) return r;
//     }
//     return null;
//   };
//   const decodeJwt = (t) => {
//     try { return JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); } catch { return null; }
//   };
//   try {
//     let token = null, user = null;
//     for (const s of [window.localStorage, window.sessionStorage]) {
//       for (let i = 0; i < s.length; i++) {
//         const key = s.key(i);
//         if (!key || key.startsWith('ilm_')) continue; // is page ki apni mock keys chhodo
//         const v = s.getItem(key);
//         if (!v) continue;
//         if (/^eyJ[\w-]+\.[\w-]+\.[\w-]*$/.test(v)) {
//           token = token || v;
//           const p = decodeJwt(v);
//           if (p && !user) user = findUser(p);
//         } else if (v[0] === '{' || v[0] === '[') {
//           try {
//             const o = JSON.parse(v);
//             if (!user) user = findUser(o);
//             if (!token) token = findToken(o);
//           } catch {}
//         }
//       }
//     }
//     if (user && (token || user.hasId)) return { id: user.id, name: user.name, email: user.email };
//   } catch {}
//   return null;
// };

// /* ====================================================================
//    MOCK DATA + MOCK BACKEND  (temporary, sirf UI preview; real API lagne par delete karo)
//    ==================================================================== */
// const INSTRUCTORS = {
//   aarav: { name: 'Aarav Mehta', role: 'AI engineer and founder', years: 9, hue: 24, bio: 'Aarav has shipped AI assistants for fintech and education teams, and previously founded a small automation start-up. He teaches by building one working system from a blank folder.' },
//   neha: { name: 'Neha Kapoor', role: 'Principal product designer', years: 11, hue: 8, bio: 'Neha leads design for a consumer learning app used by millions. She runs research sprints and design critiques for teams across India and Southeast Asia.' },
//   rohan: { name: 'Rohan Iyer', role: 'Staff software engineer', years: 12, hue: 150, bio: 'Rohan builds and scales backend platforms. He mentors engineers on API design, testing and delivery habits that survive real deadlines.' },
//   sana: { name: 'Sana Qureshi', role: 'Head of growth', years: 8, hue: 28, bio: 'Sana has grown subscription products from zero to seven-figure revenue. She focuses on repeatable loops rather than one-off campaigns.' },
//   vikram: { name: 'Vikram Rao', role: 'Fractional CFO', years: 15, hue: 150, bio: 'Vikram advises early-stage founders on cash, pricing and fundraising. He explains finance without jargon.' },
//   ishita: { name: 'Ishita Bose', role: 'Leadership coach', years: 13, hue: 18, bio: 'Ishita coaches first-time managers and senior leaders through change, hard conversations and team health.' },
//   kabir: { name: 'Kabir Singh', role: 'Brand strategist', years: 10, hue: 12, bio: 'Kabir has built brand narratives for consumer and B2B companies, and writes about positioning and storytelling.' },
//   meera: { name: 'Meera Joshi', role: 'HR director', years: 14, hue: 330, bio: 'Meera has built HR functions for fast-growing companies, from first hire to a few hundred people.' },
//   dinesh: { name: 'Dinesh Nair', role: 'Contact center operations head', years: 16, hue: 190, bio: 'Dinesh has run multi-site customer support operations and trains QA teams and team leaders.' },
//   tarun: { name: 'Tarun Verma', role: 'Cloud and DevOps engineer', years: 10, hue: 215, bio: 'Tarun designs cloud platforms and delivery pipelines and mentors engineers moving into DevOps.' },
//     shareef: { name: 'Shareef', role: 'Workshop trainer, ILM ORA', years: 0, hue: 24, bio: 'Shareef trains learners in ILM ORA workshops and runs the live build sessions, guiding them through hands-on projects and answering questions in real time.' },
//   ananya: { name: 'Ananya Das', role: 'Applied AI researcher', years: 7, hue: 175, bio: 'Ananya applies language models to analytics and operations. She helps non-technical teams find practical, safe uses for AI.' },
// };

// const TPL = {
//   AI: { learn: ['How modern language models work, in plain terms', 'Writing instructions that produce reliable output', 'Connecting models to tools and your own data', 'Evaluating answers and catching mistakes', 'Keeping data private and usage safe', 'Turning a prototype into a repeatable workflow'], out: ['Ship a working AI workflow of your own', 'Judge when AI helps and when it does not', 'Write prompts you can reuse across tasks', 'Share a clear plan for your team'], aud: ['Professionals who want practical AI skills', 'Founders and product managers', 'Developers new to AI tooling'], seg: ['Welcome and what we will build', 'Core ideas, demystified', 'Live build lab', 'Testing, Q&A and next steps'] },
//   Development: { learn: ['Project structure that stays tidy as it grows', 'Writing and testing code with confidence', 'Reading errors and debugging faster', 'Working with APIs and data', 'Deploying to a live environment', 'Habits that make code reviews painless'], out: ['Build and deploy a small but real project', 'Debug problems without guessing', 'Review code with a clear checklist', 'Leave with a reusable starter template'], aud: ['Developers moving up a level', 'Bootcamp graduates', 'Engineering team leads'], seg: ['Setup and goals', 'Core patterns', 'Hands-on build', 'Review, Q&A and next steps'] },
//   Design: { learn: ['Framing the problem before opening a design tool', 'Gathering evidence from real users', 'Turning findings into layout decisions', 'Building reusable components', 'Giving and receiving critique', 'Presenting design work to stakeholders'], out: ['Produce a portfolio-ready case study', 'Run a lightweight research round', 'Build a small component library', 'Present with confidence'], aud: ['Designers building their craft', 'Product managers', 'Founders shaping their first product'], seg: ['Warm-up and goals', 'Method walkthrough', 'Studio exercise', 'Critique, Q&A and next steps'] },
//   Marketing: { learn: ['Finding the one metric that matters', 'Designing channels that compound', 'Writing messages people act on', 'Running small experiments quickly', 'Reading results without fooling yourself', 'Planning a quarter of work'], out: ['Leave with a 90-day growth plan', 'Launch one experiment this week', 'Write a clear value proposition', 'Report results the team trusts'], aud: ['Marketers and growth teams', 'Founders doing their own marketing', 'Content and community leads'], seg: ['Context and goals', 'Framework deep dive', 'Plan-building workshop', 'Feedback, Q&A and next steps'] },
//   Business: { learn: ['Reading the numbers that run a business', 'Pricing with confidence', 'Planning cash for the next 12 months', 'Making decisions with incomplete data', 'Prioritising a roadmap', 'Communicating strategy to a team'], out: ['Build a simple financial model', 'Set pricing you can defend', 'Create a one-page strategy', 'Know what to track every week'], aud: ['Founders and operators', 'Product and business managers', 'Career switchers entering business roles'], seg: ['Introductions and goals', 'Key concepts', 'Worked example', 'Q&A and next steps'] },
//   Leadership: { learn: ['Setting expectations without micromanaging', 'Holding clear, kind conversations', 'Leading a team through uncertainty', 'Giving feedback that lands', 'Protecting focus and energy', 'Building trust over time'], out: ['Prepare for a hard conversation', 'Create a 30-60-90 day plan', 'Give feedback with a simple structure', 'Build a personal leadership habit'], aud: ['New and aspiring managers', 'Team leads', 'Senior professionals growing influence'], seg: ['Check-in and goals', 'Core practices', 'Role-play lab', 'Reflection, Q&A and next steps'] },
//   HR: { learn: ['Hiring a strong team with structured interviews', 'Writing clear job descriptions and offers', 'Onboarding that makes people stay', 'Performance reviews and fair feedback', 'Handling conflict and sensitive cases', 'Basics of labour law and HR compliance'], out: ['Build a structured interview scorecard', 'Create a 30-day onboarding checklist', 'Draft a review and feedback template', 'Plan an HR calendar for the year'], aud: ['HR executives and recruiters', 'Founders hiring their first team', 'Team leads who manage people'], seg: ['Check-in and goals', 'Core HR practices', 'Case study lab', 'Q&A and next steps'] },
//   'Contact Center': { learn: ['Call flow design and quality scripts', 'Handling difficult customers with empathy', 'Core metrics: AHT, CSAT, FCR and SLA', 'Workforce planning and shift scheduling', 'Quality monitoring and coaching agents', 'Using CRM, IVR and AI assist tools'], out: ['Create a QA scorecard', 'Build a call-handling playbook', 'Plan staffing for peak hours', 'Set up a weekly metrics dashboard'], aud: ['Agents and team leaders', 'QA and training specialists', 'Contact center managers and operations heads'], seg: ['Check-in and goals', 'Core practices', 'Live call simulation', 'Q&A and next steps'] },
//   Engineering: { learn: ['Cloud fundamentals and reliable architecture', 'CI/CD pipelines and infrastructure as code', 'Monitoring, logging and incident response', 'Testing strategy and QA automation', 'Data pipelines and database basics', 'Security habits for engineering teams'], out: ['Set up a working CI/CD pipeline', 'Write an incident runbook', 'Design a test plan for a service', 'Draft a simple cloud architecture diagram'], aud: ['Engineers and DevOps beginners', 'QA and support engineers', 'Students moving into tech roles'], seg: ['Check-in and goals', 'Core concepts', 'Hands-on lab', 'Review, Q&A and next steps'] },
// };
// const PRE = {
//   Beginner: ['No prior experience needed', 'A laptop with a stable internet connection'],
//   Intermediate: ['Some hands-on experience in this area', 'A laptop with a stable internet connection', 'Comfort sharing your screen or work'],
//   Advanced: ['2+ years of relevant professional experience', 'A real project or problem to work on', 'A laptop with a stable internet connection'],
// };
// const AGENDA_DESC = [
//   'Introductions, what you will walk away with, and a quick look at the plan.',
//   'The key ideas you need, explained with examples you can reuse.',
//   'You apply the ideas to a real task while the instructor gives live feedback.',
//   'Wrap up, answer questions and agree on what to do next.',
// ];

// const nowIST = new Date(Date.now() + 19800000);
// const atIST = (off, hhmm) => {
//   const [h, m] = hhmm.split(':').map(Number);
//   return Date.UTC(nowIST.getUTCFullYear(), nowIST.getUTCMonth(), nowIST.getUTCDate() + off, h, m) - 19800000;
// };
// const mk = (slug, title, category, level, price, format, off, time, duration, popularity, seats, hue, instructorId, tags, short, long) => ({
//   slug, title, category, level, price, format, start: format === 'live' ? atIST(off, time) : null,
//   duration, popularity, seats, hue, instructorId, tags, short, long,
// });

// const WORKSHOPS = [
//   mk('ai-agents-from-scratch', 'Build AI agents from scratch', 'AI', 'Intermediate', 2999, 'live', 3, '19:00', 120, 98, 60, 255, 'aarav', 'agents automation llm tools', 'Design, build and test an AI agent that completes real tasks for you.', 'In two hours you will go from a blank file to an AI agent that uses tools, remembers context and can be tested. We build one complete agent together, then adapt it to a problem from your own work.'),
//   mk('prompt-engineering-masterclass', 'Prompt engineering masterclass', 'AI', 'Beginner', 0, 'live', 1, '18:30', 90, 95, 200, 230, 'ananya', 'prompts chatgpt writing productivity', 'Learn a repeatable way to get dependable answers from AI tools.', 'This free session shows how to structure instructions, give examples and check output. You will leave with a prompt library you can adapt for writing, research and analysis.'),
//   mk('genai-for-business-ops', 'Generative AI for business operations', 'AI', 'Beginner', 999, 'ondemand', 0, '00:00', 140, 80, null, 170, 'ananya', 'operations automation reports', 'Find safe, practical uses for AI in everyday business tasks.', 'A recorded series on automating reports, summaries and customer replies, with templates and a risk checklist for your team.'),
//   mk('fullstack-nextjs-launchpad', 'Full-stack web apps launchpad', 'Development', 'Intermediate', 3499, 'live', 6, '11:00', 180, 88, 40, 215, 'shareef', 'react nextjs javascript web', 'Build and deploy a full-stack web app with routing, data and sign-in.', 'A three-hour guided build covering pages, data fetching, forms and authentication, finishing with a live deployment you can share.'),
//   mk('api-design-that-scales', 'API design that scales', 'Development', 'Advanced', 1999, 'ondemand', 0, '00:00', 150, 70, null, 195, 'rohan', 'api rest backend architecture', 'Design APIs that stay consistent and easy to evolve.', 'Recorded modules on resource modelling, versioning, pagination, errors and rate limits, drawn from real production systems.'),
//   mk('git-and-ci-for-teams', 'Git and CI for teams', 'Development', 'Beginner', 0, 'live', 9, '17:00', 60, 60, 150, 205, 'rohan', 'git github workflow testing', 'Collaborate without merge-day panic using clean Git habits and automated checks.', 'A free one-hour session on branching, pull requests and setting up automated tests so every change is checked before it ships.'),
//   mk('ux-research-in-a-day', 'UX research in a day', 'Design', 'Beginner', 1499, 'live', 4, '10:00', 150, 77, 35, 335, 'neha', 'ux research interviews usability', 'Plan, run and summarise a user interview round in one session.', 'Practise writing interview guides, running sessions and turning notes into clear, shareable insights.'),
//   mk('design-systems-figma', 'Design systems in Figma', 'Design', 'Intermediate', 1799, 'ondemand', 0, '00:00', 160, 72, null, 310, 'neha', 'figma components tokens ui', 'Build a scalable component library from first principles.', 'Recorded lessons on tokens, variants, documentation and handoff, with a starter Figma file.'),
//   mk('motion-design-for-product', 'Motion design for product', 'Design', 'Advanced', 2499, 'live', 14, '16:00', 120, 66, 0, 285, 'neha', 'animation motion ui prototyping', 'Use motion to explain what changed and guide attention in interfaces.', 'Learn timing, easing and sequencing, then prototype three interactions you can hand to engineers. This session is currently full.'),
//   mk('growth-marketing-loops', 'Growth marketing loops', 'Marketing', 'Intermediate', 1999, 'live', 2, '20:00', 90, 90, 80, 25, 'sana', 'growth acquisition retention experiments', 'Design growth loops that compound instead of one-off campaigns.', 'We map your product to loops, pick a metric and plan three experiments you can launch the same week.'),
//   mk('seo-in-the-ai-era', 'SEO in the AI era', 'Marketing', 'Beginner', 0, 'ondemand', 0, '00:00', 110, 85, null, 45, 'sana', 'seo search content ai', 'Make content that is found and trusted as search changes.', 'A free recorded course on search intent, content structure and measuring visibility across search engines and AI answers.'),
//   mk('brand-storytelling-lab', 'Brand storytelling lab', 'Marketing', 'Beginner', 999, 'live', 11, '12:00', 100, 58, 50, 5, 'kabir', 'brand story copywriting positioning', 'Craft a brand story your audience remembers and repeats.', 'Work through positioning, voice and story arcs with live feedback on your own draft.'),
//   mk('startup-finance-basics', 'Startup finance basics', 'Business', 'Beginner', 1299, 'live', 5, '19:30', 120, 74, 70, 150, 'vikram', 'finance cash pricing startup', 'Understand cash, margins and pricing well enough to decide with confidence.', 'We build a simple twelve-month cash plan together and stress-test your pricing assumptions.'),
//   mk('product-strategy-bootcamp', 'Product strategy bootcamp', 'Business', 'Advanced', 3999, 'ondemand', 0, '00:00', 240, 83, null, 130, 'vikram', 'strategy roadmap product prioritisation', 'Turn market insight into a focused, defensible product strategy.', 'Recorded modules with worksheets on choosing where to play, sequencing bets and communicating strategy.'),
//   mk('leading-through-change', 'Leading through change', 'Leadership', 'Intermediate', 2299, 'live', 7, '18:00', 120, 69, 45, 280, 'ishita', 'change management communication teams', 'Guide your team through uncertainty with clarity and care.', 'Practise the conversations that matter most during reorganisations, launches and setbacks.'),
//   mk('first-time-manager-playbook', 'First-time manager playbook', 'Leadership', 'Beginner', 1499, 'ondemand', 0, '00:00', 130, 79, null, 300, 'ishita', 'management feedback one-on-ones', 'Start strong in your first management role.', 'Recorded sessions on one-on-ones, feedback, delegation and your first 90 days, with scripts and templates.'),
//   mk('executive-presence', 'Executive presence', 'Leadership', 'Advanced', 2999, 'live', 20, '17:30', 90, 64, 25, 310, 'ishita', 'influence communication senior leadership', 'Communicate with the clarity and calm that senior roles demand.', 'A small-group lab on framing your message, handling pushback and showing up well in high-stakes rooms.'),
//   mk('hiring-with-structured-interviews', 'Hiring with structured interviews', 'HR', 'Beginner', 1299, 'live', 5, '18:00', 120, 76, 60, 330, 'meera', 'hiring recruitment interviews', 'Hire better with scorecards and consistent interview questions.', 'Build a scorecard, practise interview questions and learn to compare candidates fairly.'),
//   mk('hr-onboarding-and-retention', 'Onboarding and retention for HR teams', 'HR', 'Intermediate', 0, 'ondemand', 0, '00:00', 100, 70, null, 335, 'meera', 'onboarding retention culture hr', 'Design an onboarding journey that helps new joiners stay.', 'Recorded modules on onboarding plans, check-ins and exit insights.'),
//   mk('contact-center-qa-and-coaching', 'Contact center QA and coaching', 'Contact Center', 'Intermediate', 1499, 'live', 4, '17:00', 120, 78, 50, 190, 'dinesh', 'quality qa coaching agents', 'Score calls fairly and coach agents to improve CSAT.', 'Create a QA scorecard, review sample calls and practise coaching conversations.'),
//   mk('handling-difficult-customers', 'Handling difficult customers', 'Contact Center', 'Beginner', 0, 'live', 2, '16:30', 75, 88, 150, 195, 'dinesh', 'customer service empathy de-escalation', 'Stay calm and resolve heated calls with proven techniques.', 'Live role-play on de-escalation, empathy statements and clear closing.'),
//   mk('devops-and-cicd-essentials', 'DevOps and CI/CD essentials', 'Engineering', 'Beginner', 1999, 'live', 8, '19:00', 150, 82, 45, 215, 'tarun', 'devops cicd cloud pipelines', 'Set up a working delivery pipeline from commit to deployment.', 'Hands-on lab covering Git, automated tests, builds and deployment.'),
//   mk('cloud-architecture-fundamentals', 'Cloud architecture fundamentals', 'Engineering', 'Intermediate', 1799, 'ondemand', 0, '00:00', 160, 74, null, 220, 'tarun', 'cloud aws azure architecture', 'Design reliable, secure and cost-aware cloud systems.', 'Recorded lessons on networking, storage, scaling and monitoring.'),
// ];

// /** Jo real backend server-side rakhta hai. Authorisation check ke bina browser ko kabhi nahi jata. */
// const PRIVATE = Object.fromEntries(
//   WORKSHOPS.map((w, i) => [w.slug, {
//     meetLink: `https://meet.ilmora.example/room/${w.slug}-${1000 + i * 37}`,
//     lessons: TPL[w.category].seg.map((t, j) => ({ id: j, title: t, mins: Math.round(w.duration / 4) })),
//   }]),
// );

// /** Workshop ka public shape: pure, server par bhi safe. */
// function toPublic(w, taken = 0) {
//   const tpl = TPL[w.category];
//   const agenda = tpl.seg.map((title, i) => {
//     const from = Math.round(w.duration * [0, 0.1, 0.45, 0.85][i]);
//     const to = Math.round(w.duration * [0.1, 0.45, 0.85, 1][i]);
//     return { title, time: w.format === 'live' ? `${from}\u2013${to} min` : `${Math.round(w.duration / 4)} min`, desc: AGENDA_DESC[i] };
//   });
//   return {
//     ...w,
//     instructor: INSTRUCTORS[w.instructorId],
//     learn: tpl.learn, outcomes: tpl.out, audience: tpl.aud, prereq: PRE[w.level], agenda,
//     seatsLeft: w.seats == null ? null : Math.max(0, w.seats - taken),
//     tz: 'IST (UTC+5:30)',
//   };
// }

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// const mem = {};
// const store = {
//   get(k, d) {
//     try { const v = window.localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return k in mem ? mem[k] : d; }
//   },
//   set(k, v) {
//     try { window.localStorage.setItem(k, JSON.stringify(v)); } catch { mem[k] = v; }
//   },
// };
// const fail = () => typeof window !== 'undefined' && /simulateError/.test(window.location.search);
// const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// const err = (message, code) => Object.assign(new Error(message), { code });

// async function sha(s) {
//   try {
//     const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
//     return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
//   } catch { return btoa(s); }
// }
// const regsAll = () => store.get('ilm_regs', []);
// const view = (w) => toPublic(w, regsAll().filter((r) => r.slug === w.slug).length);

// const backend = {
//   async list() {
//     await sleep(reduce() ? 0 : 200);
//     if (fail()) throw err('The workshop service did not respond.');
//     return WORKSHOPS.map(view);
//   },
//   async get(slug) {
//     await sleep(reduce() ? 0 : 120);
//     if (fail()) throw err('The workshop service did not respond.');
//     const w = WORKSHOPS.find((x) => x.slug === slug);
//     if (!w) throw err('Workshop not found', 404);
//     return view(w);
//   },
//   session: () => SITE_USER || store.get('ilm_session', null),
//   async signup({ name, email, password }) {
//     await sleep(500);
//     const users = store.get('ilm_users', []);
//     if (users.some((u) => u.email === email.toLowerCase())) throw err('An account with this email already exists. Sign in instead.');
//     const u = { id: 'u' + Date.now(), name, email: email.toLowerCase(), hash: await sha(password) };
//     users.push(u); store.set('ilm_users', users);
//     store.set('ilm_session', { id: u.id, name: u.name, email: u.email });
//     return backend.session();
//   },
//   async login({ email, password }) {
//     await sleep(450);
//     const h = await sha(password);
//     const u = store.get('ilm_users', []).find((x) => x.email === email.toLowerCase() && x.hash === h);
//     if (!u) throw err('Email or password is incorrect.');
//     store.set('ilm_session', { id: u.id, name: u.name, email: u.email });
//     return backend.session();
//   },
//   logout: () => store.set('ilm_session', null),
//   myRegs() {
//     const s = backend.session();
//     return s ? regsAll().filter((r) => r.userId === s.id) : [];
//   },
//   myReg: (slug) => backend.myRegs().find((r) => r.slug === slug) || null,
//   async register(slug, payload) {
//     await sleep(900);
//     const s = backend.session();
//     if (!s) throw err('Please sign in to register.', 401);
//     const w = WORKSHOPS.find((x) => x.slug === slug);
//     if (!w) throw err('Workshop not found', 404);
//     if (backend.myReg(slug)) throw err('You are already registered for this workshop.', 409);
//     if (view(w).seatsLeft === 0) throw err('This workshop is full.', 410);
//     if (w.price > 0 && !payload.paid) throw err('Payment is required for this workshop.', 402);
//     const reg = {
//       id: 'ILM-' + Math.random().toString(36).slice(2, 8).toUpperCase(), userId: s.id, slug,
//       name: payload.name, email: payload.email, phone: payload.phone, level: payload.level, goal: payload.goal,
//       amount: w.price, paid: w.price > 0, createdAt: Date.now(),
//     };
//     store.set('ilm_regs', [...regsAll(), reg]);
//     return reg;
//   },
//   async cancel(slug) {
//     await sleep(300);
//     const s = backend.session();
//     store.set('ilm_regs', regsAll().filter((r) => !(r.slug === slug && r.userId === (s && s.id))));
//   },
//   /** Private content tabhi milta hai jab signed-in user registered ho. */
//   async access(slug) {
//     await sleep(300);
//     if (!backend.session()) throw err('Sign in to see your access details.', 401);
//     if (!backend.myReg(slug)) throw err('Register for this workshop to unlock access.', 403);
//     const w = WORKSHOPS.find((x) => x.slug === slug);
//     const p = PRIVATE[slug];
//     return w.format === 'live' ? { type: 'live', url: p.meetLink } : { type: 'ondemand', lessons: p.lessons };
//   },
// };

// /* ====================================================================
//    API LAYER (har component sirf `api` se baat karta hai)
//    ==================================================================== */
// const getAuthToken = () => { try { return window.localStorage.getItem('token'); } catch { return null; } }; // TODO: existing auth storage
// const getSessionUser = () => { try { return JSON.parse(window.localStorage.getItem('user') || 'null'); } catch { return null; } }; // TODO: existing auth state

// async function http(path, opts = {}) {
//   const token = getAuthToken();
//   const res = await fetch(CONFIG.API_BASE + path, {
//     ...opts,
//     headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(opts.headers || {}) },
//     credentials: 'include',
//   });
//   if (!res.ok) {
//     let msg = 'Something went wrong. Please try again.';
//     try { msg = (await res.json()).message || msg; } catch {}
//     throw Object.assign(new Error(msg), { code: res.status });
//   }
//   return res.status === 204 ? null : res.json();
// }
// const regsCache = { list: [] };
// const realApi = {
//   list: () => http('/workshops'),
//   get: (slug) => http(`/workshops/${encodeURIComponent(slug)}`),
//   session: getSessionUser,
//   signup: (c) => http('/auth/register', { method: 'POST', body: JSON.stringify(c) }),   // TODO: existing auth
//   login: (c) => http('/auth/login', { method: 'POST', body: JSON.stringify(c) }),       // TODO: existing auth
//   logout: () => { try { window.localStorage.removeItem('token'); window.localStorage.removeItem('user'); } catch {} },
//   myRegs: () => regsCache.list,
//   myReg: (slug) => regsCache.list.find((r) => r.slug === slug) || null,
//   register: async (slug, p) => { const r = await http(`/workshops/${encodeURIComponent(slug)}/register`, { method: 'POST', body: JSON.stringify(p) }); regsCache.list.push(r); return r; }, // 409 on duplicate
//   cancel: async (slug) => { await http(`/workshops/${encodeURIComponent(slug)}/register`, { method: 'DELETE' }); regsCache.list = regsCache.list.filter((r) => r.slug !== slug); },
//   access: (slug) => http(`/workshops/${encodeURIComponent(slug)}/access`),              // 401 / 403 when not allowed
// };
// // Real registrations pages se pehle load karo (login ke baad / page load par):
// //   realApi.loadRegs = async () => { regsCache.list = await http('/me/registrations'); };
// const impl = CONFIG.USE_MOCK ? backend : realApi;
// const api = {
//   list: () => impl.list(), get: (s) => impl.get(s), session: () => impl.session(),
//   signup: (c) => impl.signup(c), login: (c) => impl.login(c), logout: () => impl.logout(),
//   myRegs: () => impl.myRegs(), myReg: (s) => impl.myReg(s),
//   register: (s, p) => impl.register(s, p), cancel: (s) => impl.cancel(s), access: (s) => impl.access(s),
// };

// /* ====================================================================
//    ROUTER (hash based)
//    ==================================================================== */
// const BASE = '/workshops';
// const PAGES = ['catalog', 'details', 'register', 'confirmation', 'watch', 'dashboard', 'feedback', 'login'];
// const NEEDS_W = ['details', 'register', 'confirmation', 'watch'];
// const DEFAULT_W = () => (CONFIG.OFFER && CONFIG.OFFER.registerSlug) || '';

// /** Internal path se real URL: '/register/abc' -> '/workshops/register?w=abc' */
// const toUrl = (p) => {
//   const [path, qs] = p.split('?');
//   const [a, b] = path.split('/').filter(Boolean);
//   // Slug ke hyphens path banenge: prompt-engineering-masterclass -> prompt/engineering/masterclass
//   const wPath = (s) => (s && s !== DEFAULT_W() ? '/' + s.split('-').join('/') : '');
//   let u = BASE;
//   if (a === 'workshops') { if (b) u += '/details' + wPath(b); }
//   else if (NEEDS_W.includes(a)) u += '/' + a + wPath(b);
//   else if (a) u += '/' + a;
//   return qs ? `${u}?${qs}` : u;
// };

// /** URL ke page naam se internal route parts */
// export function partsFromPage(page, w) {
//   if (!page) return ['workshops'];
//   if (page === 'details') return ['workshops', w || DEFAULT_W()];
//   if (NEEDS_W.includes(page)) return [page, w || DEFAULT_W()];
//   if (PAGES.includes(page)) return [page];
//   return ['workshops'];
// }

// function parseUrl() {
//   // Purane #/ links naye URL par bhej do
//   if (window.location.hash.startsWith('#/')) {
//     window.history.replaceState(null, '', toUrl(window.location.hash.slice(1)));
//   }
//     const segs = window.location.pathname.split('/').filter(Boolean).slice(1); // 'workshops' hata do
//   const page = segs[0] || '';
//   const query = new URLSearchParams(window.location.search);
//   const parts = partsFromPage(page, segs.slice(1).join('-') || query.get('w'));
//   return { parts, query, raw: parts.join('/') };
// }

// const RouteCtx = createContext({ parts: ['workshops'], query: new URLSearchParams(), raw: '' });

// const navigate = (p, replace = false) => {
//   window.history[replace ? 'replaceState' : 'pushState'](null, '', toUrl(p));
//   window.dispatchEvent(new Event('wkroute'));
// };
// const go = (p) => navigate(p);
// const replaceRoute = (p) => navigate(p, true);
// const useRouter = () => ({ push: go, replace: replaceRoute });
// const useSearchParams = () => useContext(RouteCtx).query;

// function Link({ href, children, onClick, ...p }) {
//   const click = (e) => {
//     if (onClick) onClick(e);
//     if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || p.target === '_blank') return;
//     e.preventDefault();
//     go(href);
//   };
//   return <a href={toUrl(href)} onClick={click} {...p}>{children}</a>;
// }

// function usePathRoute(initialParts) {
//   const [r, setR] = useState({ parts: initialParts || ['workshops'], query: new URLSearchParams(), raw: '' });
//   useEffect(() => {
//     const on = () => setR(parseUrl());
//     on();
//     window.addEventListener('popstate', on);
//     window.addEventListener('wkroute', on);
//     return () => { window.removeEventListener('popstate', on); window.removeEventListener('wkroute', on); };
//   }, []);
//   return r;
// }

// function setPageMeta(title, desc) {
//   document.title = title;
//   if (!desc) return;
//   let m = document.querySelector('meta[name="description"]');
//   if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
//   m.content = desc;
// }

// /* ====================================================================
//    SHARED STATE: workshops cache, auth, toasts
//    ==================================================================== */
// let cache = null;
// const invalidateWorkshops = () => { cache = null; };

// function useWorkshops() {
//   const [state, set] = useState({ data: null, error: null, loading: true });
//   const load = useCallback(() => {
//     set((s) => ({ ...s, loading: true, error: null }));
//     api.list()
//       .then((d) => { cache = d; set({ data: d, error: null, loading: false }); })
//       .catch((e) => set({ data: null, error: e, loading: false }));
//   }, []);
//   useEffect(() => {
//     if (cache) set({ data: cache, error: null, loading: false });
//     else load();
//   }, [load]);
//   return { ...state, reload: load };
// }

// const Ctx = createContext(null);

// function AppProviders({ children, openLogin }) {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);
//   const [toasts, setToasts] = useState([]);
//   const pending = useRef(null);

//   // Site login (popup) ke baad user detect karo
//   useEffect(() => {
//     const sync = () => {
//       SITE_USER = readSiteUser();
//       const u = SITE_USER || store.get('ilm_session', null);
//       setUser((prev) => (prev && u && prev.email === u.email ? prev : u));
//       setReady(true);
//       if (u && pending.current) { const n = pending.current; pending.current = null; go(n); }
//     };
//     sync();
//     window.addEventListener('storage', sync);
//     window.addEventListener('focus', sync);
//     const t = setInterval(sync, 1000);
//     return () => { window.removeEventListener('storage', sync); window.removeEventListener('focus', sync); clearInterval(t); };
//   }, []);

//   // Login chahiye: pehle safe page par jao, phir site ka popup kholo
//   const requireLogin = useCallback((next, back = '/workshops') => {
//     pending.current = next;
//     replaceRoute(back);
//     if (openLogin) openLogin(true);
//   }, [openLogin]);

//   const toast = useCallback((msg, kind = '') => {
//     const id = Date.now() + Math.random();
//     setToasts((t) => [...t, { id, msg, kind }]);
//     setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4600);
//   }, []);

//   const value = useMemo(() => ({
//     user, ready, toast, requireLogin,
//     logout: () => { api.logout(); setUser(null); },
//   }), [user, ready, toast, requireLogin]);

//   return (
//     <Ctx.Provider value={value}>
//       {children}
//       <div id="toasts" className="toasts" role="status" aria-live="polite">
//         {toasts.map((t) => <div key={t.id} className={`toast ${t.kind}`}>{t.msg}</div>)}
//       </div>
//     </Ctx.Provider>
//   );
// }

// const useApp = () => useContext(Ctx);

// /* ====================================================================
//    UI PIECES
//    ==================================================================== */
// const CAT_INFO = {
//   AI: 'Agents, prompts and AI for work', Development: 'Web, APIs, Git and delivery', Design: 'UX research, Figma and motion',
//   Marketing: 'Growth, SEO and brand', Business: 'Finance, pricing and strategy', Leadership: 'Managing people and change',
//   HR: 'Hiring, onboarding and people ops', 'Contact Center': 'QA, coaching and customer handling', Engineering: 'Cloud, DevOps and QA engineering',
// };

// /** Scroll-reveal wrapper (reduced motion mein seedha dikhta hai). */
// function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
//   const ref = useRef(null);
//   const [on, setOn] = useState(false);
//   useEffect(() => {
//     if (reduce() || typeof IntersectionObserver === 'undefined') { setOn(true); return undefined; }
//     const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
//     if (ref.current) io.observe(ref.current);
//     return () => io.disconnect();
//   }, []);
//   return <Tag ref={ref} className={`wkrv ${on ? 'wkrv-on' : ''} ${className}`} style={delay ? { transitionDelay: delay + 'ms' } : undefined}>{children}</Tag>;
// }

// /** Animated counter: viewport mein aate hi ginti shuru. */
// function Counter({ to }) {
//   const ref = useRef(null);
//   const [v, setV] = useState(0);
//   useEffect(() => {
//     if (to == null) return undefined;
//     if (reduce() || typeof IntersectionObserver === 'undefined') { setV(to); return undefined; }
//     let raf = 0, started = false;
//     const run = () => {
//       const t0 = performance.now();
//       const tick = (t) => {
//         const p = Math.min(1, (t - t0) / 1200);
//         setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
//         if (p < 1) raf = requestAnimationFrame(tick);
//       };
//       raf = requestAnimationFrame(tick);
//     };
//     const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; run(); } });
//     if (ref.current) io.observe(ref.current);
//     return () => { io.disconnect(); cancelAnimationFrame(raf); };
//   }, [to]);
//   return <span ref={ref}>{to == null ? '\u2013' : v}</span>;
// }

// const PlayIcon = ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden="true" style={{ marginLeft: 3 }}><path d="M7 4l13 8-13 8z" /></svg>;

// function Yt({ id, title }) {
//   const [on, setOn] = useState(false);
//   return (
//     <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 14, overflow: 'hidden', background: '#111' }}>
//       {on ? <iframe title={title} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
//         : <button type="button" onClick={() => setOn(true)} aria-label={`Play: ${title}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, cursor: 'pointer', background: `center/cover url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}>
//           <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,.25)' }}><span style={{ width: 68, height: 68, borderRadius: '50%', background: '#f97316', display: 'grid', placeItems: 'center' }}><PlayIcon /></span></span>
//         </button>}
//     </div>
//   );
// }

// /** Workshop ka real cover photo (category ke hisaab se, ya MEDIA.covers / w.coverUrl override). */
// const COVER_POS = {
//   'ai-agents-from-scratch': '50% 35%',
//   'prompt-engineering-masterclass': '50% 35%',
//   'growth-marketing-loops': '50% 35%',
// };
// function WorkshopArt({ w }) {
//   const c = CATEGORY_COVER[w.category] || { src: IMG.coding, pos: 'center' };
//   const src = MEDIA.covers[w.slug] || w.coverUrl || c.src;
//   return <img src={src} alt={`${w.title} workshop`} loading="lazy" style={{ objectPosition: COVER_POS[w.slug] || c.pos }} />;
// }

// function Avatar({ person, large = false }) {
//   const ph = MEDIA.instructors[Object.keys(INSTRUCTORS).find((k) => INSTRUCTORS[k].name === person.name)] || person.photoUrl;
//   if (ph) return <img className={`av ${large ? 'lg' : ''}`} src={ph} alt={person.name} loading="lazy" style={{ objectFit: 'cover' }} />;
//   return (
//     <span
//       className={`av ${large ? 'lg' : ''}`}
//       style={{ background: `linear-gradient(135deg,hsl(${person.hue} 75% 52%),hsl(${(person.hue + 22) % 360} 78% 36%))` }}
//       aria-hidden="true"
//     >
//       {initials(person.name)}
//     </span>
//   );
// }

// const FormatBadge = ({ w }) =>
//   w.format === 'live'
//     ? <span className="badge live"><i />Live</span>
//     : <span className="badge">Recorded</span>;

// const Skeletons = ({ n = 6, height }) => (
//   <>{Array.from({ length: n }, (_, i) => <div key={i} className="skel" style={height ? { height } : undefined} aria-hidden="true" />)}</>
// );

// const ErrorIcon = () => (
//   <svg width="52" height="52" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="32" cy="32" r="26" /><path d="M32 18v17M32 44v2" /></svg>
// );

// function StateBox({ title, text, children, icon }) {
//   return (
//     <div className="wrap">
//       <div className="state glass" style={{ marginTop: 30 }} role="alert">
//         {icon || <ErrorIcon />}
//         <h2>{title}</h2>
//         <p className="muted" style={{ maxWidth: '44ch' }}>{text}</p>
//         <div>{children}</div>
//       </div>
//     </div>
//   );
// }

// const LinkBtn = ({ href, children, ghost, sm, block, ...p }) => (
//   <Link href={href} className={`btn ${ghost ? 'btn-ghost' : 'btn-primary'} ${sm ? 'btn-sm' : ''} ${block ? 'btn-block' : ''}`} {...p}>{children}</Link>
// );

// const Spinner = () => <span className="spin" aria-hidden="true" />;

// function Field({ id, label, error, children }) {
//   return (
//     <div>
//       <label className="f" htmlFor={id}>{label}{children}</label>
//       <div className="err" id={`${id}-e`}>{error}</div>
//     </div>
//   );
// }

// const P = {
//   search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
//   calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
//   clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
//   level: <path d="M5 20V14M12 20V9M19 20V4" />,
//   play: <path d="M6 3l14 9-14 9z" />,
//   video: <><path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11" /><rect x="2" y="6" width="14" height="12" rx="2" /></>,
//   award: <><circle cx="12" cy="8" r="6" /><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" /></>,
//   qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4" /></>,
//   user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
//   users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
//   pen: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,
//   hash: <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />,
//   book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
//   download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
//   linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
//   building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></>,
//   mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
//   compass: <><circle cx="12" cy="12" r="10" /><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z" /></>,
//   select: <><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
//   present: <path d="M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3M12 16v5M8 21h8" />,
//   code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
//   assess: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></>,
//   trending: <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
//   briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
//   sparkles: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />,
//   palette: <><circle cx="13.5" cy="6.5" r="1" /><circle cx="17.5" cy="10.5" r="1" /><circle cx="8.5" cy="7.5" r="1" /><circle cx="6.5" cy="12.5" r="1" /><path d="M12 2a10 10 0 0 0 0 20 2 2 0 0 0 2-2c0-.6-.2-1-.5-1.4a2 2 0 0 1 1.5-3.3H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2z" /></>,
//   headset: <><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><path d="M21 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2z" /></>,
//   cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
//   bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></>,
//   file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
//   message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
// };
// const I = ({ n, s = 15 }) => (
//   <svg width={s} height={s} viewBox="0 0 24 24" fill={n === 'play' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}>{P[n]}</svg>
// );
// const CAT_ICON = { AI: 'sparkles', Development: 'code', Design: 'palette', Marketing: 'trending', Business: 'briefcase', Leadership: 'compass', HR: 'users', 'Contact Center': 'headset', Engineering: 'cog' };
// const Icons = {
//   cal: <I n="calendar" />, clock: <I n="clock" />, lvl: <I n="level" />, play: <I n="play" s={13} />, search: <I n="search" s={18} />,
// };

// function WorkshopCard({ w, registered = false }) {
//   const full = w.format === 'live' && w.seatsLeft === 0;
//   const featured = w.popularity >= 95;
//   return (
//     <article className={`card ${featured ? 'featured' : ''}`}>
//       <div className="art">
//         <WorkshopArt w={w} />
//         <div className="badges"><FormatBadge w={w} />{featured && <span className="badge feat">Featured</span>}{w.price === 0 && <span className="badge free">Free</span>}</div>
//       </div>
//       <div className="cbody">
//         <span className="cat">{w.category}</span>
//         <h3><Link href={`/workshops/${w.slug}`}>{w.title}</Link></h3>
//         <p className="sd">{w.short}</p>
//         <div className="inst"><Avatar person={w.instructor} /><span><b>{w.instructor.name}</b><small>{w.instructor.role}</small></span></div>
//         <div className="meta">
//           {w.format === 'live'
//             ? <span>{Icons.cal}{fmtD.format(w.start)}, {fmtT.format(w.start)}</span>
//             : <span>{Icons.play}Watch anytime</span>}
//           <span>{Icons.clock}{durTxt(w.duration)}</span>
//           <span>{Icons.lvl}{w.level}</span>
//           {w.seatsLeft != null && <span className={`seat ${w.seatsLeft < 20 ? 'low' : ''}`}><I n="users" s={13} />{w.seatsLeft === 0 ? 'No seats left' : `${w.seatsLeft} seats left`}</span>}
//           {w.rating ? <span>Rated {w.rating}/5</span> : null}
//         </div>
//         <div className="cfoot">
//           <span className={`price ${w.price === 0 ? 'free' : ''}`}>{money(w.price)}</span>
//           <span className="cta">
//             <Link className="btn btn-ghost btn-sm" href={`/workshops/${w.slug}`}>View details</Link>
//             {registered ? <Link className="btn btn-primary btn-sm" href={`/workshops/${w.slug}`}>Registered</Link>
//               : full ? <span className="btn btn-primary btn-sm" aria-disabled="true">Full</span>
//               : <Link className="btn btn-primary btn-sm" href={`/register/${w.slug}`} aria-label={`Register now for ${w.title}`}>Register now</Link>}
//           </span>
//         </div>
//       </div>
//     </article>
//   );
// }

// /* ====================================================================
//    PAGE SECTIONS (listing page): har section ko apni real photo / content
//    ==================================================================== */
// const PERKS = [
//   ['award', 'Certificate of completion', 'Issued from verified completion records, with a unique ID.'],
//   ['video', 'Session recording', 'Rewatch the workshop from your dashboard after you register.'],
//   ['message', 'Live Q&A with your instructor', 'Ask your own questions during live sessions.'],
//   ['file', 'Templates and resources', 'Download materials shared by the instructor.'],
//   ['bell', 'Reminders', 'Get notified before your live session starts.'],
//   ['building', 'Group and corporate batches', 'Bring your team or college to a private session.'],
// ];
// const FAQS = [
//   ['Are there any prerequisites?', 'No formal prerequisites for beginner workshops. Each workshop lists its level and what to prepare on its page.'],
//   ['When are the live sessions?', 'Live sessions run on Day 0, Day 1 and Day 2, with a bonus live showcase at the end. Exact dates are shown for each cohort.'],
//   ['What if I cannot attend a live session?', 'The week is designed around a working schedule: lessons Monday to Friday are self-paced. Registered learners can watch recordings from My learning when the instructor publishes them.'],
//   ['How much access do I get to instructors?', 'Instructors are active during live sessions to answer questions and give feedback. They may not reply to every individual message.'],
//   ['How much time do I need each week?', 'About 8 hours on each live weekend day and 2 to 3 hours a day for self-paced lessons.'],
//   ['What is included?', 'Live sessions, projects, lifetime access to project files, the learner community and a verified certificate after completion.'],
//   ['Will I get a certificate?', 'Yes, after your completion is verified. Each certificate has a unique ID and QR code so anyone can check it.'],
//   ['Can I get a refund?', 'If the workshop is not for you, request a refund within 24 hours of the session start. See our refund policy.'],
//   ['Can my team or college join together?', 'Yes. Contact us for group pricing, private batches and custom workshops.'],
// ];
// function useCountdown(ts) {
//   const [now, setNow] = useState(() => Date.now());
//   useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
//   const d = Math.max(0, ts - now), p = (n) => String(n).padStart(2, '0');
//   return [['Days', Math.floor(d / 864e5)], ['Hrs', p(Math.floor(d / 36e5) % 24)], ['Min', p(Math.floor(d / 6e4) % 60)], ['Sec', p(Math.floor(d / 1e3) % 60)]];
// }
// function Countdown({ ts }) { const c = useCountdown(ts); return <div className="cdn" role="timer">{c.map(([l, v]) => <div key={l}><b>{v}</b><small>{l}</small></div>)}</div>; }
// const Faq = () => (
//   <div className="faq2">
//     <h2 className="faq2-h">Frequently Asked Questions</h2>
//     <div className="faq2-list">
//       {FAQS.map(([q, a]) => (
//         <details key={q}>
//           <summary>{q}</summary>
//           <p>{a}</p>
//         </details>
//       ))}
//     </div>
//   </div>
// );

// const HERO_VIS = {
//   a: IMG.studentCollab,   // left polaroid
//   b: IMG.mentorGuidance,  // chhoti photo, neeche left
//   // main photo = MEDIA.heroPoster (ya MEDIA.heroVideo agar set ho)
// };

// const HERO3_CSS = `
// .wk .hero3 .hero2-bg img{filter:blur(22px) saturate(1.15) brightness(.55);transform:scale(1.12)}
// .wk .hero3 .hero2-shade{background:
//   radial-gradient(60% 80% at 82% 40%,rgba(249,115,22,.24),transparent 60%),
//   radial-gradient(40% 60% at 68% 95%,rgba(22,163,74,.24),transparent 60%),
//   linear-gradient(90deg,rgba(8,8,14,.92) 0%,rgba(8,8,14,.72) 55%,rgba(8,8,14,.5) 100%),
//   linear-gradient(0deg,rgba(8,8,14,.8),transparent 45%)}
// .wk .hero3 .hero2-in{align-items:center;padding-top:44px;padding-bottom:28px}
// @media(min-width:960px){.wk .hero3 .hero2-in{grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:36px}}

// /* collage stage */
// .wk .hv-stage{position:relative;width:100%;max-width:560px;margin-left:auto;aspect-ratio:1/.82}
// .wk .hv{position:absolute;transform:translate3d(calc(var(--mx,0) * var(--d,0) * 1px),calc(var(--my,0) * var(--d,0) * 1px),0);transition:transform .25s ease-out}
// .wk .hv-f{position:relative;width:100%;height:100%;margin:0;overflow:hidden;border-radius:24px;background:#14141f;border:1px solid rgba(255,255,255,.22);box-shadow:0 26px 54px rgba(0,0,0,.5);transform:rotate(var(--r,0deg));animation:hvin .9s cubic-bezier(.2,.8,.2,1) var(--e,0s) both,hvfloat 7s ease-in-out calc(var(--e,0s) + .9s) infinite}
// .wk .hv-f img,.wk .hv-f video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
// .wk .hv-f::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.5),transparent 55%);pointer-events:none}
// @keyframes hvin{from{opacity:0;translate:0 28px}}
// @keyframes hvfloat{50%{transform:rotate(var(--r,0deg)) translateY(-9px)}}
// .wk .hv-main{--r:2deg;--d:10;--e:.1s;right:0;top:0;width:82%;height:66%;z-index:1}
// .wk .hv-a{--r:-6deg;--d:22;--e:.3s;left:0;top:14%;width:33%;aspect-ratio:4/5;z-index:2}
// .wk .hv-b{--r:3deg;--d:30;--e:.5s;left:3%;bottom:0;width:28%;aspect-ratio:16/11;z-index:2}
// .wk .hv-a .hv-f,.wk .hv-b .hv-f{position:absolute;inset:0;width:auto;height:auto;border:4px solid #fff;border-radius:18px}
// .wk .hv-tag{position:absolute;left:10px;bottom:10px;z-index:2;display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:.66rem;font-weight:800;background:rgba(10,12,30,.76);color:#fff;backdrop-filter:blur(6px);white-space:nowrap}
// .wk .hv-main .hv-tag{top:12px;bottom:auto;left:12px}
// .wk .hv-tag i{width:7px;height:7px;border-radius:50%;background:#ff4d6d;animation:wkpulse 1.8s infinite}
// .wk .hv-tag.ok{background:var(--accent)}
// .wk .hv-glow{position:absolute;border-radius:50%;filter:blur(44px);opacity:.55;pointer-events:none}
// .wk .hv-glow.o{width:55%;aspect-ratio:1;right:-8%;top:-12%;background:#f97316}
// .wk .hv-glow.g{width:40%;aspect-ratio:1;left:8%;bottom:6%;background:#16a34a}
// .wk .hv-card{position:absolute;right:0;bottom:0;width:72%;z-index:4;box-shadow:0 20px 44px rgba(0,0,0,.45);animation:hvin .9s cubic-bezier(.2,.8,.2,1) .7s both}
// .wk .hv-card .btn{justify-self:start}

// @media(max-width:959px){
//   /* collage laptop jaisa hi rahega, card uske neeche aayega */
//   .wk .hv-stage{display:block;width:100%;max-width:540px;aspect-ratio:auto;margin:0 auto}
//   .wk .hv-collage{position:relative;inset:auto;display:block;width:100%;height:0;padding-bottom:82%;margin-bottom:14px}
//   .wk .hv-card{position:relative!important;right:auto!important;bottom:auto!important;left:auto!important;top:auto!important;width:100%!important;display:grid;opacity:1;z-index:4}
//   .wk .hv-tag{font-size:.6rem;padding:3px 8px}
// }
// @media(max-width:480px){
//   .wk .hv-a{width:36%;top:16%}
//   .wk .hv-b{width:34%;left:2%}
//   .wk .hv-a .hv-f,.wk .hv-b .hv-f{border-width:3px;border-radius:14px}
//   .wk .hv-tag{left:6px;bottom:6px;font-size:.54rem;padding:2px 6px;white-space:normal;line-height:1.15}
//   .wk .hv-main .hv-tag{left:8px;top:8px}
// }
// `;

// /** 1. Cinematic hero: left content, right image collage + next-session card. */
// function Hero({ data }) {
//   const bg = useRef(null);
//   const stage = useRef(null);
//   useEffect(() => {
//     if (reduce()) return undefined;
//     let raf = 0;
//     const on = () => {
//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(() => { if (bg.current) bg.current.style.transform = `translate3d(0,${Math.min(window.scrollY, 700) * 0.18}px,0) scale(1.08)`; });
//     };
//     window.addEventListener('scroll', on, { passive: true });
//     return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
//   }, []);

//   // Mouse parallax: photos alag-alag depth par halka sa hilte hain (touch / reduced motion par band)
//   const onMove = (e) => {
//     if (e.pointerType !== 'mouse' || reduce() || !stage.current) return;
//     const r = stage.current.getBoundingClientRect();
//     const c = (v) => Math.max(-1, Math.min(1, v));
//     stage.current.style.setProperty('--mx', c(((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
//     stage.current.style.setProperty('--my', c(((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
//   };
//   const onLeave = () => {
//     if (!stage.current) return;
//     stage.current.style.setProperty('--mx', 0);
//     stage.current.style.setProperty('--my', 0);
//   };

//   const upcoming = (data || []).filter((x) => x.format === 'live' && x.start > Date.now()).sort((a, b) => a.start - b.start);
//   const next = upcoming[0];
//   const stats = [
//     ['Workshops', data ? data.length : null],
//     ['Live sessions coming up', data ? upcoming.length : null],
//     ['Free workshops', data ? data.filter((x) => x.price === 0).length : null],
//     ['Topics', data ? new Set(data.map((x) => x.category)).size : null],
//   ];

//   return (
//     <section className="hero2 hero3" aria-labelledby="hero-h" onPointerMove={onMove} onPointerLeave={onLeave}>
//       <style dangerouslySetInnerHTML={{ __html: HERO3_CSS }} />
//       <div className="hero2-bg" ref={bg}>
//         <img src={MEDIA.heroPoster} alt="" />
//       </div>
//       <div className="hero2-shade" aria-hidden="true" />
//       <div className="wrap hero2-in">
//         <div>
//           <span className="livepill"><i />{data ? `${upcoming.length} live workshops open for registration` : 'Loading live workshops'}</span>
//           <h1 id="hero-h">Build real Java full-stack projects. Get certified.</h1>
//           <p className="lead">Learn Java, Spring Boot, databases and React by building a working application, step by step. Live build days with working instructors, self-paced lessons in between. Beginner friendly.</p>
//           <div className="chips">
//             <span className="chip"><I n="code" s={13} />10+ projects</span>
//             <span className="chip"><I n="video" s={13} />Live weekend sessions</span>
//             <span className="chip"><I n="award" s={13} />Verified certificate</span>
//           </div>
//           <div className="hero2-cta">
//             <button type="button" className="btn btn-primary btn-lg" onClick={() => go(CONFIG.OFFER.registerSlug ? `/register/${CONFIG.OFFER.registerSlug}` : '/catalog')}><I n="award" s={16} />Reserve my seat</button>
//             <button type="button" className="btn btn-line btn-lg" onClick={() => scrollToId('wk-roadmap')}><I n="compass" s={15} />See the roadmap</button>
//             <button type="button" className="btn btn-line btn-lg" onClick={() => go('/catalog')}><I n="search" s={15} />Browse all workshops</button>
//           </div>
//         </div>

//         <div className="hv-stage" ref={stage}>
//                     <div className="hv-collage" aria-hidden="true">
//             <span className="hv-glow o" />
//             <span className="hv-glow g" />
//             <div className="hv hv-main">
//               <figure className="hv-f">
//                 {MEDIA.heroVideo
//                   ? <video src={MEDIA.heroVideo} poster={MEDIA.heroPoster} autoPlay muted loop playsInline preload="metadata" />
//                   : <img src={MEDIA.heroPoster} alt="" />}
//                 <span className="hv-tag"><i />Live build days</span>
//               </figure>
//             </div>
//             <div className="hv hv-a">
//               <figure className="hv-f">
//                 <img src={HERO_VIS.a} alt="" loading="lazy" style={{ objectPosition: '50% 40%' }} />
//                 <span className="hv-tag ok">10+ projects</span>
//               </figure>
//             </div>
//             <div className="hv hv-b">
//               <figure className="hv-f">
//                 <img src={HERO_VIS.b} alt="" loading="lazy" style={{ objectPosition: '50% 40%' }} />
//                 <span className="hv-tag ok">Verified certificate</span>
//               </figure>
//             </div>
//           </div>
//           {next && (
//             <aside className="hero2-card hv-card" aria-label="Next live workshop">
//               <small>Next live session</small>
//               <h3>{next.title}</h3>
//               <p>with {next.instructor.name}. {fmtD.format(next.start)}, {fmtT.format(next.start)} IST</p>
//               <Countdown ts={next.start} />
//               <Link className="btn btn-light btn-sm" href={`/workshops/${next.slug}`}>Reserve my seat</Link>
//             </aside>
//           )}
//         </div>
//       </div>
//       <div className="wrap">
//         <dl className="hero2-stats" style={{ margin: 0 }}>
//           {stats.map(([l, v]) => <div key={l}><b><Counter to={v} /></b><span>{l}</span></div>)}
//         </dl>
//       </div>
//     </section>
//   );
// }

// /** 2. Video: real URL ho to play, nahi to clearly-labelled slot (fake video nahi). */
// function VideoModal({ v, onClose }) {
//   const btn = useRef(null);
//   useEffect(() => {
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';
//     const key = (e) => { if (e.key === 'Escape') onClose(); };
//     window.addEventListener('keydown', key);
//     if (btn.current) btn.current.focus();
//     return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', key); };
//   }, [onClose]);
//   return (
//     <div className="vm" role="dialog" aria-modal="true" aria-label={v.title} onClick={onClose}>
//       <div className="vm-box" onClick={(e) => e.stopPropagation()}>
//         <button type="button" className="vm-x" ref={btn} onClick={onClose} aria-label="Close video">
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
//         </button>
//         {v.youtube
//           ? <iframe title={v.title} src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
//           : <video src={v.src} poster={v.poster} controls autoPlay playsInline />}
//       </div>
//     </div>
//   );
// }
// function Experience() {
//   const [open, setOpen] = useState(null);
//   const playable = (v) => Boolean(v.youtube || v.src);
//   return (
//     <section className="wrap sec" id="wk-experience" aria-labelledby="xp-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="xp-h">Experience ILM ORA Workshops</h2><p>Illustrative previews of the learning environment. These are not recordings of past ILM ORA events.</p></div></div></Reveal>
//       <div className="xp">
//         {MEDIA.videos.map((v, i) => (
//           <Reveal key={v.id} className={`xp-card ${i === 0 ? 'lead' : ''}`} delay={i * 80}>
//             <button type="button" className="xp-btn" disabled={!playable(v)} onClick={() => setOpen(v)} aria-label={playable(v) ? `Play video: ${v.title}` : `${v.title}. Official video not uploaded yet`}>
//                             {v.poster
//                 ? <img src={v.poster} alt={v.alt} loading="lazy" style={{ objectPosition: v.pos || '50% 40%' }} />
//                 : <video src={`${v.src}#t=0.5`} preload="metadata" muted playsInline aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: v.pos || '50% 40%' }} />}
//               <span className="xp-shade" />
//               {playable(v) && <span className="xp-play"><PlayIcon size={20} /></span>}
//               <span className="xp-cap"><small>{v.tag}</small><b>{v.title}</b><em>{playable(v) ? v.text : 'Official ILM ORA video will be added here.'}</em></span>
//             </button>
//           </Reveal>
//         ))}
//       </div>
//       {open && <VideoModal v={open} onClose={() => setOpen(null)} />}
//     </section>
//   );
// }

// /** 3. Topics: real photo tiles, live count from data. */
// function TopicTiles({ data }) {
//   return (
//     <section className="wrap sec" aria-labelledby="top-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="top-h">Popular learning categories</h2><p>Pick a skill area and see every workshop in it.</p></div></div></Reveal>
//       <AutoRow label="Popular learning categories">
//         {Object.entries(CAT_INFO).map(([c, d]) => {
//           const cv = CATEGORY_COVER[c];
//           const n = data ? data.filter((w) => w.category === c).length : null;
//           return (
//             <Link key={c} className="tile" href={`/catalog?cat=${encodeURIComponent(c)}`} onClick={() => setTimeout(() => scrollToId('wk-explore'), 60)}>
//               <img src={cv.src} alt="" loading="lazy" style={{ objectPosition: cv.pos }} />
//               <div><span className="tic"><I n={CAT_ICON[c]} s={15} /></span><h3>{c}</h3><p>{d}{n != null ? ` (${n})` : ''}</p></div>
//             </Link>
//           );
//         })}
//       </AutoRow>
//     </section>
//   );
// }

// /** 4. Learning journey: 6 steps, har step ki real photo, scroll reveal. */
// function Journey() {
//   return (
//     <section className="wrap sec" aria-labelledby="jr-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="jr-h">Your learning journey, start to certificate</h2><p>Six steps from finding a workshop to holding a verified ILM ORA certificate.</p></div></div></Reveal>
//       <ol className="jr" style={{ listStyle: 'none', padding: 0, margin: '22px 0 0' }}>
//         {JOURNEY.map((s, i) => (
//           <Reveal as="li" key={s.t} className="jr-step">
//             <div className="jr-img"><img src={s.img} alt={s.alt} loading="lazy" style={{ objectPosition: s.pos }} /></div>
//             <div><div className="jr-top"><span className="jr-ic"><I n={s.ic} s={16} /></span><span className="jr-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span></div><h3>{s.t}</h3><p>{s.d}</p></div>
//           </Reveal>
//         ))}
//       </ol>
//     </section>
//   );
// }

// /** 5. Certificate showcase: real ILM ORA full stack certificate + ceremony photo. */
// function CertificateShowcase() {
//   const share = () => {
//     const url = window.location.origin + window.location.pathname;
//     window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
//   };
//   return (
//     <section className="wrap sec" aria-labelledby="ce-h">
//       <Reveal className="cert">
//         <div>
//           <div className="cert-frame">
//             <span className="tagc">Sample preview</span>
//             <img src={IMG.certFull} alt="Sample ILM ORA Full Stack certificate of completion" loading="lazy" />
//           </div>
//         </div>
//         <div>
//           <h2 className="h-xl" id="ce-h">Your skills deserve recognition</h2>
//           <p className="muted" style={{ marginTop: 10, maxWidth: '56ch' }}>Finish a workshop and your completion is recorded by ILM ORA. Verified learners receive a certificate they can download and share.</p>
//           <ul className="cert-list">
//             <li><I n="user" />Your name as registered</li>
//             <li><I n="book" />Workshop or course name</li>
//             <li><I n="pen" />Instructor signature</li>
//             <li><I n="hash" />Unique certificate ID</li>
//             <li><I n="calendar" />Issue date</li>
//             <li><I n="qr" />QR code to verify it online</li>
//           </ul>
//           <div className="cert-act">
//             <LinkBtn href="/dashboard"><I n="award" s={16} />View my certificates</LinkBtn>
//             <button type="button" className="btn btn-ghost" onClick={share}><I n="linkedin" s={16} />Share on LinkedIn</button>
//             <button type="button" className="btn btn-ghost" disabled aria-disabled="true" title="Available once your completion is verified"><I n="download" s={16} />Download certificate</button>
//           </div>
//           <p className="cert-note">The certificate shown is a sample design. Real certificates are generated only from verified completion records, and download unlocks after your completion is confirmed.</p>
//         </div>
//       </Reveal>
//           </section>
//   );
// }

// /** 6. Team + workshop instructors (instructors backend data se). */
// function Mentors() {
//   return (
//     <AutoRow label="ILM ORA mentors">
//       {MENTORS.map((m) => (
//         <figure className="mentor mentor-i" key={m.name} style={{ margin: 0 }}>
//           <div className="ph"><img src={m.img} alt={`${m.name}${m.role ? `, ${m.role}` : ''} at ILM ORA`} loading="lazy" style={{ objectPosition: m.pos }} draggable="false" /></div>
//           <figcaption>
//             <h3>{m.name}</h3>
//             <p className="role">{m.role}</p>
//             {m.org && <p className="org"><span className="ilm-g">ILM</span> <span className="ora-o">ORA</span></p>}
//           </figcaption>
//         </figure>
//       ))}
//     </AutoRow>
//   );
// }
// function Instructors({ data }) {
//   const list = useMemo(() => {
//     const m = new Map();
//     (data || []).forEach((w) => {
//       const e = m.get(w.instructor.name) || { p: w.instructor, n: 0, slug: w.slug };
//       e.n += 1; m.set(w.instructor.name, e);
//     });
//     return [...m.values()];
//   }, [data]);
//   return (
//     <section className="wrap sec" aria-labelledby="in-h">
//             <Reveal><div className="sechead"><div><h2 className="h-xl" id="in-h">Our mentors are the best at what they teach</h2><p>The founders and instructors who run your sessions.</p></div></div></Reveal>
//       <Mentors />
//       {list.length > 0 && (
//         <Reveal>
//           <div className="sechead" style={{ marginTop: 14 }}><div><h2 className="h-xl">Instructors teaching now</h2></div></div>
//           <ul className="ilist">
//             {list.map(({ p, n, slug }) => (
//               <li key={p.name}>
//                 <Avatar person={p} />
//                 <span><b><Link href={`/workshops/${slug}`}>{p.name}</Link></b><small>{p.role}{p.years ? `, ${p.years}+ years` : ''}. {n} workshop{n === 1 ? '' : 's'}</small></span>
//               </li>
//             ))}
//           </ul>
//         </Reveal>
//       )}
//     </section>
//   );
// }

// /** 7. Corporate training: real corporate training photo. */
// function Corporate() {
//   return (
//     <section className="wrap sec" aria-labelledby="co-h">
//       <Reveal className="band">
//         <img src={IMG.corp} alt="ILM ORA corporate training workshop in progress" loading="lazy" />
//         <div className="band-in">
//           <h2 id="co-h">Corporate training for your team</h2>
//           <p>Private batches, group pricing and custom workshops for companies and colleges, delivered live by ILM ORA instructors.</p>
//           <div className="cert-act">
//             <a className="btn btn-primary btn-lg" href={`mailto:${CONFIG.CONTACT_EMAIL}?subject=Group%20workshop%20enquiry`}><I n="mail" s={16} />Talk to us</a>
//             <button type="button" className="btn btn-ghost btn-lg" onClick={() => go('/catalog')}><I n="search" s={16} />Browse workshops</button>
//           </div>
//         </div>
//       </Reveal>
//     </section>
//   );
// }

// function FeedbackCard({ f, onPlay }) {
//   const playable = Boolean(f.youtube || f.video);
//   const poster = f.poster || (f.youtube ? `https://i.ytimg.com/vi/${f.youtube}/hqdefault.jpg` : '');
//   return (
//     <figure className="fb">
//       {playable && (
//         <button type="button" className="fb-vid" aria-label={`Play feedback from ${f.name}`}
//           onClick={() => onPlay({ title: `${f.name} feedback`, youtube: f.youtube, src: f.video, poster })}>
//           {poster ? <img src={poster} alt="" loading="lazy" /> : <span className="fb-ph" />}
//                   <span className="fb-play"><PlayIcon size={20} /></span>
//           <span className="fb-watch">Watch video</span>
//         </button>
//       )}
//       {f.shot && <img className="fb-shot" src={f.shot} alt={`Feedback screenshot from ${f.name}`} loading="lazy" />}
//       <figcaption className="fb-body">
//         <div className="fb-head">
//           {f.photo
//             ? <img className="av" src={f.photo} alt={f.name} loading="lazy" />
//             : <span className="av" style={{ background: 'linear-gradient(135deg,#f97316,#c2410c)' }} aria-hidden="true">{initials(f.name)}</span>}
//           <span><b>{f.name}</b>{f.role && <small>{f.role}</small>}</span>
//           {f.source && SOURCE_LABEL[f.source] && <span className="fb-src" title={f.source}>{SOURCE_LABEL[f.source]}</span>}
//         </div>
//                 {f.sample && <span className="fb-sample">Sample preview, not a real review</span>}
//         {f.text && <p className="fb-text">{'\u201C'}{f.text}{'\u201D'}</p>}
//         {(f.date || f.rating) && (
//           <div className="fb-foot">
//             <span>{f.date || ''}</span>
//             {f.rating ? <span className="fb-stars" aria-label={`${f.rating} out of 5`}>{'\u2605'.repeat(f.rating)}</span> : null}
//           </div>
//         )}
//       </figcaption>
//     </figure>
//   );
// }

// /** Home par feedback wall: pehle FEEDBACK_PREVIEW cards, neeche See more -> #/feedback */
// function WallOfLove() {
//   const [open, setOpen] = useState(null);
//   const list = FEEDBACK.slice(0, FEEDBACK_PREVIEW);
//   return (
//     <section className="wrap sec" id="wk-feedback" aria-labelledby="wl-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl wl-title" id="wl-h">Ambitious people <svg className="wl-heart" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="0"><stop offset="50%" stopColor="#16a34a" /><stop offset="50%" stopColor="#f97316" /></linearGradient></defs><path fill="url(#hg)" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.6 4.5 6.3 4.5c2 0 3.6 1 4.7 2.6l1 1.4 1-1.4c1.1-1.6 2.7-2.6 4.7-2.6 3.7 0 5.4 3.9 3.9 7.3C19.500 16.400 12 21 12 21z" /></svg> <span className="wl-ilm">ILM</span> <span className="wl-ora">ORA</span></h2><p>Real feedback from learners who built with us.</p></div></div></Reveal>
//       {list.length > 0 ? (
//         <>
//           <div className="wall">
//             {list.map((f, i) => <Reveal key={f.name + i} delay={(i % 4) * 60}><FeedbackCard f={f} onPlay={setOpen} /></Reveal>)}
//           </div>
//                    <div className="wall-more"><button type="button" className="btn btn-primary btn-lg" onClick={() => go('/feedback')}>{FEEDBACK.length > FEEDBACK_PREVIEW ? `See more (${FEEDBACK.length - FEEDBACK_PREVIEW}+)` : 'See all feedback'}</button></div>
//         </>
//       ) : <p className="empty-note">Written feedback and video testimonials will appear here once learners have given permission to publish them.</p>}
//       {open && <VideoModal v={open} onClose={() => setOpen(null)} />}
//     </section>
//   );
// }

// /** Poori feedback wall (#/feedback) with Load more */
// function FeedbackPage() {
//   const [open, setOpen] = useState(null);
//   const [shown, setShown] = useState(FEEDBACK_PAGE);
//   const list = FEEDBACK.slice(0, shown);
//   return (
//     <div className="wrap" style={{ paddingTop: 18 }}>
//       <Link className="btn btn-ghost btn-sm" href="/workshops">{'\u2190'} Back to workshops</Link>
//       <div className="sechead" style={{ marginTop: 18 }}><div><h1>What our learners say</h1><p>{FEEDBACK.length} real feedback{FEEDBACK.length === 1 ? '' : 's'} from ILM ORA workshops.</p></div></div>
//       {list.length > 0
//         ? <div className="wall">{list.map((f, i) => <div key={f.name + i} className="wkrv wkrv-on"><FeedbackCard f={f} onPlay={setOpen} /></div>)}</div>
//         : <p className="empty-note">Feedback will appear here once learners have given permission to publish it.</p>}
//       {shown < FEEDBACK.length && <div className="wall-more"><button type="button" className="btn btn-ghost btn-lg" onClick={() => setShown((s) => s + FEEDBACK_PAGE)}>Load more</button></div>}
//       {open && <VideoModal v={open} onClose={() => setOpen(null)} />}
//     </div>
//   );
// }

// /** 8. Gallery + learner stories (sirf real; abhi photos, testimonials MEDIA.stories se). */
// function Community() {
//   return (
//     <section className="wrap sec" aria-labelledby="gl-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="gl-h">Learner community and success stories</h2><p>Real moments from ILM ORA workshops.</p></div></div></Reveal>
//             <AutoRow label="Learner community photos">
//         {GALLERY.map((g) => (
//           <figure className="gal-i" key={g.cap}><img src={g.img} alt={g.cap} loading="lazy" style={{ objectPosition: g.pos }} /><figcaption>{g.cap}</figcaption></figure>
//         ))}
//       </AutoRow>
//           </section>
//   );
// }

// function Perks() {
//   return (
//     <section className="wrap sec" aria-labelledby="pk-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="pk-h">Included with every workshop</h2></div></div></Reveal>
//       <Reveal><ol className="plist">{PERKS.map(([ic, t, d]) => <li key={t}><div className="pi"><I n={ic} s={16} /></div><b>{t}</b><span>{d}</span></li>)}</ol></Reveal>
//     </section>
//   );
// }

// function FinalCta() {
//   return (
//     <section className="wrap sec" aria-labelledby="fc-h">
//       <Reveal className="band" style={{ minHeight: 300 }}>
//         <img src={IMG.celebration} alt="Learners celebrating together at an ILM ORA workshop" loading="lazy" />
//         <div className="band-in">
//           <h2 id="fc-h">Your next skill is one workshop away</h2>
//           <p>Pick a session, register in about a minute and start building.</p>
//                     <div className="cert-act">
//             <button type="button" className="btn btn-primary btn-lg" onClick={() => go('/catalog')}><I n="search" s={16} />Explore workshops</button>
//             <a className="btn btn-ghost btn-lg" href={`mailto:${CONFIG.CONTACT_EMAIL}?subject=Workshop%20enquiry`}><I n="mail" s={16} />Ask a question</a>
//           </div>
//           <div className="cert-act">
//             <LinkBtn href="/dashboard"><I n="award" s={16} />View my certificates</LinkBtn>
//             <button type="button" className="btn btn-ghost btn-lg" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + window.location.pathname)}`, '_blank', 'noopener,noreferrer')}><I n="linkedin" s={16} />Share on LinkedIn</button>
//             <button type="button" className="btn btn-ghost btn-lg" disabled aria-disabled="true" title="Available once your completion is verified"><I n="download" s={16} />Download certificate</button>
//           </div>
//           <p className="cert-note">The certificate shown is a sample design. Real certificates are generated only from verified completion records, and download unlocks after your completion is confirmed.</p>
//         </div>
//       </Reveal>
//     </section>
//   );
// }

// function DetailExtras({ w }) {
//   const live = w.format === 'live' && w.start;
//   const iso = (t) => new Date(t).toISOString().replace(/[-:]|\.\d{3}/g, '');
//   const gcal = live ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(w.title)}&dates=${iso(w.start)}/${iso(w.start + w.duration * 6e4)}` : null;
//   const url = typeof window !== 'undefined' ? window.location.href : '';
//   const share = async () => { try { navigator.share ? await navigator.share({ title: w.title, url }) : await navigator.clipboard.writeText(url); } catch (e) {} };
//   return (
//     <>
//       {live && w.start > Date.now() && <div className="nl" style={{ margin: '12px 0 0' }}><div><p style={{ fontWeight: 700 }}>Starts in</p></div><Countdown ts={w.start} /></div>}
//       <div className="panel glass" style={{ marginTop: 12 }}>
//         <h2>Your certificate</h2>
//         <div className="certmini">
//           <img src={IMG.certFull} alt="Sample ILM ORA certificate of completion" loading="lazy" />
//           <div>
//             <p>Complete this workshop and receive an ILM ORA certificate with a unique ID and QR verification.</p>
//             <p className="muted" style={{ fontSize: '.8rem', marginTop: 8 }}>Sample design shown. Your certificate is generated from your verified completion record.</p>
//           </div>
//         </div>
//       </div>
//       <div className="panel glass"><h2>What you get</h2><ol className="plist">{PERKS.map(([ic, t, d]) => <li key={t}><div className="pi"><I n={ic} s={16} /></div><b>{t}</b><span>{d}</span></li>)}</ol>
//         <div className="share">{gcal && <a className="btn btn-ghost btn-sm" href={gcal} target="_blank" rel="noopener noreferrer">Add to calendar</a>}<button type="button" className="btn btn-ghost btn-sm" onClick={share}>Share</button></div></div>
//       <Faq />
//     </>
//   );
// }

// /* ====================================================================
//    PAGES
//    ==================================================================== */
// /* ---------- B. CSS (WK_CSS ke baad naya const) ---------- */
// const GS_CSS = `
// .wk .offer{background:linear-gradient(90deg,#c2410c,var(--brand));color:#fff;text-align:center;font-weight:700;font-size:.8rem;padding:7px 14px;display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}
// .wk .offer .cdn div{background:rgba(0,0,0,.25);padding:2px 7px;min-width:40px}.wk .offer .cdn b{font-size:.85rem}.wk .offer .cdn small{font-size:.58rem}
// .wk .chips{display:flex;gap:7px;flex-wrap:wrap;margin-top:14px}
// .wk .chip{display:inline-flex;gap:6px;align-items:center;padding:5px 11px;border-radius:999px;font-size:.76rem;font-weight:700;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);color:#fff}
// .wk .fmt{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:6px}
// .wk .fmt div{padding:12px;border-radius:12px;border:1px solid var(--ln);background:var(--solid)}
// .wk .fmt b{display:block;font-size:.95rem;color:var(--brand)}.wk .fmt span{font-size:.76rem;color:var(--muted)}
// .wk .two-opt{display:grid;gap:12px}
// @media(min-width:760px){.wk .two-opt{grid-template-columns:1fr 1fr}}
// .wk .opt{padding:16px;border-radius:14px;border:1px solid var(--ln);background:var(--solid)}
// .wk .opt.bad{border-color:color-mix(in srgb,var(--err) 40%,var(--ln))}.wk .opt.good{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 6%,var(--solid))}
// .wk .opt h3{margin-bottom:8px}.wk .opt ul{margin:0;padding-left:18px;font-size:.84rem;color:var(--muted);display:grid;gap:5px}
// .wk .pain{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:6px}
// .wk .pain>div{padding:13px;border-radius:12px;border:1px solid var(--ln);background:var(--solid)}
// .wk .pain .pi{grid-row:auto;width:28px;height:28px;min-height:0;padding:0;border:0;border-radius:8px;margin-bottom:8px;display:grid;place-items:center;background:color-mix(in srgb,var(--brand) 12%,transparent);color:var(--brand)}.wk .pain b{display:block;font-size:.9rem}.wk .pain span{font-size:.78rem;color:var(--muted)}
// .wk .rm{position:relative;display:grid;gap:12px;margin-top:16px;padding-left:22px}
// .wk .rm::before{content:"";position:absolute;left:7px;top:6px;bottom:6px;width:2px;background:linear-gradient(var(--brand),var(--accent));border-radius:2px}
// .wk .rm-day{position:relative;padding:14px;border-radius:14px;border:1px solid var(--ln);background:var(--solid);box-shadow:var(--shadow)}
// .wk .rm-day::before{content:"";position:absolute;left:-22px;top:18px;width:16px;height:16px;border-radius:50%;background:var(--brand);border:3px solid var(--bg)}
// .wk .rm-day.brk::before{background:var(--accent)}
// .wk .rm-top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:.72rem;font-weight:800}
// .wk .rm-top .d{color:var(--brand)}.wk .rm-top .l{padding:2px 8px;border-radius:999px;background:#ff4d6d;color:#fff}.wk .rm-top .s{padding:2px 8px;border-radius:999px;background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--ok)}.wk .rm-top .t{color:var(--muted);font-weight:600}
// .wk .rm-day h3{margin:6px 0 4px;font-size:1rem}.wk .rm-day>p{color:var(--muted);font-size:.84rem;max-width:70ch}
// .wk .proj{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-top:10px}
// .wk .proj div{padding:9px 11px;border-radius:10px;background:color-mix(in srgb,var(--brand) 8%,transparent);font-size:.78rem}
// .wk .proj b{display:block;font-size:.84rem}.wk .proj span{color:var(--muted)}
// /* BIG INFINITE MOVING TOOLS MARQUEE */
// .wk .tools-marquee{
//   position:relative;
//   width:100%;
//   overflow:hidden;
//   margin-top:18px;
//   padding:12px 0 20px;
//   -webkit-mask-image:linear-gradient(
//     90deg,
//     transparent,
//     #000 5%,
//     #000 95%,
//     transparent
//   );
//   mask-image:linear-gradient(
//     90deg,
//     transparent,
//     #000 5%,
//     #000 95%,
//     transparent
//   );
// }

// .wk .tools-track{
//   display:flex;
//   align-items:stretch;
//   gap:18px;
//   width:max-content;
//   animation:tools-marquee-move 32s linear infinite;
//   will-change:transform;
// }

// .wk .tools-marquee:hover .tools-track{
//   animation-play-state:paused;
// }

// .wk .tool{
//   flex:0 0 180px;
//   min-height:125px;
//   padding:18px 14px;
//   display:flex;
//   flex-direction:column;
//   align-items:center;
//   justify-content:center;
//   gap:12px;
//   border-radius:18px;
//   border:1px solid var(--ln);
//   background:var(--solid);
//   box-shadow:var(--shadow);
//   font-size:.95rem;
//   font-weight:800;
//   text-align:center;
//   transition:transform .3s,border-color .3s,box-shadow .3s;
// }

// .wk .tool:hover{
//   transform:translateY(-7px) scale(1.04);
//   border-color:var(--brand);
//   box-shadow:0 14px 30px color-mix(in srgb,var(--brand) 20%,transparent);
// }

// /* Large, clearly visible tool logos */
// .wk .tool img{
//   display:block;
//   width:110px !important;
//   height:65px !important;
//   max-width:100%;
//   margin:0 auto !important;
//   object-fit:contain;
//   object-position:center;
//   flex-shrink:0;
//   background:transparent;
//   border-radius:8px;
// }

// /* Bigger cards */
// .wk .tool{
//   flex:0 0 200px;
//   min-height:155px;
//   padding:20px 14px;
//   display:flex;
//   flex-direction:column;
//   align-items:center;
//   justify-content:center;
//   gap:14px;
//   border-radius:18px;
//   border:1px solid var(--ln);
//   background:var(--solid);
//   box-shadow:var(--shadow);
//   font-size:1rem;
//   font-weight:800;
//   text-align:center;
// }

// /* Mobile */
// @media(max-width:640px){
//   .wk .tool{
//     flex-basis:165px;
//     min-height:135px;
//   }

//   .wk .tool img{
//     width:90px !important;
//     height:58px !important;
//   }
// }

// @keyframes tools-marquee-move{
//   from{transform:translateX(0)}
//   to{transform:translateX(-50%)}
// }

// @media(max-width:640px){
//   .wk .tools-track{gap:12px;animation-duration:25s}
//   .wk .tool{
//     flex-basis:145px;
//     min-height:110px;
//     padding:14px 10px;
//     font-size:.85rem;
//   }
//   .wk .tool img{
//     width:42px !important;
//     height:42px !important;
//   }
// }

// @media(prefers-reduced-motion:reduce){
//   .wk .tools-marquee{overflow-x:auto}
//   .wk .tools-track{animation:none}
// }
// .wk .price-card{display:grid;gap:16px;padding:clamp(16px,3vw,28px);border-radius:18px;border:2px solid var(--brand);background:var(--solid);box-shadow:var(--shadow)}
// @media(min-width:860px){.wk .price-card{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:center}}
// .wk .pc-price{font-size:clamp(2rem,5vw,2.8rem);font-weight:800;line-height:1}
// .wk .pc-price s{font-size:1.1rem;color:var(--muted);font-weight:600;margin-left:8px}
// .wk .pc-note{font-size:.78rem;color:var(--muted);margin-top:8px}
// .wk .pc-refund{margin-top:12px;padding:9px 12px;border-radius:10px;font-size:.78rem;font-weight:600;background:color-mix(in srgb,var(--ok) 10%,transparent);border:1px solid var(--ok)}
// .wk .gate{display:grid;gap:8px;font-size:.86rem}
// .wk .mq{overflow:hidden;width:100vw;margin-left:calc(50% - 50vw);padding:22px 0;background:transparent;border:0}
// .wk .mq-track{display:flex;align-items:center;gap:22px;width:max-content;margin:0;padding:0;list-style:none;animation:wkmq 45s linear infinite;will-change:transform}
// .wk .mq-tile{display:grid;place-items:center;min-width:170px;height:84px;padding:0 22px;border-radius:14px;background:linear-gradient(135deg,#14141f,#0b0b10);color:#fff;font-weight:800;font-size:1.02rem;letter-spacing:-.01em;white-space:nowrap;box-shadow:0 6px 18px rgba(20,12,4,.18);border-bottom:3px solid var(--brand)}
// .wk .mq:hover .mq-track,.wk .mq:focus-within .mq-track{animation-play-state:paused}
// .wk .mq-logo{flex:none;padding:0;background:none;border:0;box-shadow:none}
// .wk .mq-logo img{display:block;width:auto;height:auto;max-width:200px;max-height:104px;border-radius:14px;object-fit:contain;box-shadow:0 6px 18px rgba(20,12,4,.18)}
// @keyframes wkmq{to{transform:translateX(calc(-50% - 11px))}}
// @media(prefers-reduced-motion:reduce){.wk .mq-track{animation:none;flex-wrap:wrap;width:auto;justify-content:center}.wk .mq-logo[aria-hidden=true]{display:none}}
// .wk .mentors{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:6px;width:100%}
// @media(max-width:900px){.wk .mentors{grid-template-columns:repeat(2,minmax(0,1fr))}}
// @media(max-width:480px){.wk .mentors{gap:10px}}
// .wk .mentors>.wkrv{min-width:0}
// .wk .mentor{display:flex;flex-direction:column;gap:3px;padding:14px;border-radius:14px;border:1px solid var(--ln);background:var(--solid);box-shadow:var(--shadow);transition:transform .3s,box-shadow .3s;width:100%}
// .wk .mentor:hover{transform:translateY(-4px);box-shadow:0 16px 32px color-mix(in srgb,var(--brand) 20%,rgba(60,25,0,.16))}
// .wk .mentor .ph{aspect-ratio:1/1;border-radius:10px;overflow:hidden;background:#1a1a22;margin-bottom:10px}
// .wk .mentor .ph img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
// .wk .mentor:hover .ph img{transform:scale(1.05)}
// .wk .mentor h3{font-size:.95rem}
// .wk .mentor .role{font-size:.76rem;color:var(--muted);min-height:1.2em}
// .wk .mentor .org{margin-top:8px;padding-top:8px;border-top:1px dashed var(--ln);font-size:.78rem;font-weight:800;color:var(--brand);letter-spacing:.02em}
// .wk .wall{columns:1;column-gap:14px;margin-top:6px}
// @media(min-width:560px){.wk .wall{columns:2}}
// @media(min-width:900px){.wk .wall{columns:3}}
// @media(min-width:1250px){.wk .wall{columns:4}}
// .wk .wall>.wkrv{break-inside:avoid;margin:0 0 14px}
// .wk .fb{margin:0;overflow:hidden;border-radius:14px;border:1px solid var(--ln);background:var(--solid);box-shadow:var(--shadow);break-inside:avoid}
// .wk .fb-vid{position:relative;display:block;width:100%;aspect-ratio:16/10;border:0;padding:0;cursor:pointer;background:#111;overflow:hidden}
// .wk .fb-vid img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s}
// .wk .fb-vid:hover img{transform:scale(1.05)}
// .wk .fb-ph{position:absolute;inset:0;background:linear-gradient(135deg,#1a1a22,#2b2b38)}
// .wk .fb-play{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:var(--brand);display:grid;place-items:center;box-shadow:0 0 0 6px rgba(249,115,22,.28)}
// .wk .fb-shot{display:block;width:100%;height:auto}
// .wk .fb-body{padding:12px 13px 13px;display:grid;gap:8px}
// .wk .fb-head{display:flex;gap:9px;align-items:center}
// .wk .fb-head .av{width:34px;height:34px;font-size:.72rem;object-fit:cover}
// .wk .fb-head b{display:block;font-size:.84rem;line-height:1.2}
// .wk .fb-head small{display:block;font-size:.7rem;color:var(--muted);line-height:1.25}
// .wk .fb-src{margin-left:auto;flex:none;width:22px;height:22px;border-radius:5px;background:#1f1f2b;color:#fff;font-size:.62rem;font-weight:800;display:grid;place-items:center}
// .wk .fb-text{font-size:.82rem;color:var(--text);line-height:1.55}
// .wk .fb-foot{display:flex;justify-content:space-between;gap:8px;font-size:.7rem;color:var(--muted)}
// .wk .fb-stars{color:#f5a623;letter-spacing:1px}
// .wk .wall-more{display:flex;justify-content:center;margin-top:10px}
// .wk .fb-sample{justify-self:start;padding:2px 8px;border-radius:999px;font-size:.64rem;font-weight:700;background:color-mix(in srgb,var(--brand) 14%,transparent);color:var(--brand)}
// .wk .row.dragging{cursor:grabbing;user-select:none}
// .wk .row .cine{position:relative;flex:0 0 min(360px,78vw);aspect-ratio:4/5;border-radius:20px;overflow:hidden;background:#111318;color:#fff;box-shadow:0 14px 34px rgba(8,8,14,.28);border:1px solid rgba(255,255,255,.08);cursor:grab;transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s}
// .wk .row .cine:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 22px 46px rgba(8,8,14,.42),0 0 0 1px rgba(249,115,22,.55),0 0 34px rgba(249,115,22,.28)}
// .wk .cine img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.1);animation:wkkb 16s ease-in-out infinite alternate;transition:filter .45s;user-select:none;-webkit-user-drag:none}
// .wk .cine:hover img{filter:brightness(1.08) saturate(1.1)}
// @keyframes wkkb{from{transform:scale(1.1) translate3d(-1.5%,0,0)}to{transform:scale(1.2) translate3d(1.5%,-1%,0)}}
// .wk .cine-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(11,12,18,.94) 0%,rgba(11,12,18,.55) 42%,rgba(11,12,18,.05) 72%);pointer-events:none}
// .wk .cine::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--brand),var(--accent))}
// .wk .cine-in{position:absolute;left:0;right:0;bottom:0;padding:18px 18px 20px;display:grid;gap:7px}
// .wk .cine-tag{justify-self:start;padding:3px 10px;border-radius:999px;font-size:.68rem;font-weight:800;letter-spacing:.02em;background:var(--brand);color:#fff;box-shadow:0 0 16px rgba(249,115,22,.5)}
// .wk .cine h3{color:#fff;font-size:1.15rem;line-height:1.2}
// .wk .cine p{color:rgba(255,255,255,.82);font-size:.84rem;line-height:1.5;max-width:34ch}
// @media(max-width:640px){.wk .row .cine{aspect-ratio:3/4}.wk .cine h3{font-size:1.02rem}}
// .wk .cj{position:relative;overflow:hidden;width:100vw;margin-left:calc(50% - 50vw);padding:34px 0 52px;cursor:grab;touch-action:pan-y;user-select:none}
// .wk .cj.dragging{cursor:grabbing}
// .wk .cj-track{position:relative;display:flex;gap:30px;width:max-content;will-change:transform}
// .wk .cj-card{position:relative;flex:none;width:min(620px,80vw);aspect-ratio:16/10;border-radius:22px;overflow:hidden;color:#fff;background:#0e0e16;border:1px solid rgba(255,255,255,.1);box-shadow:0 18px 44px rgba(8,8,14,.34);will-change:transform,opacity;transform-origin:50% 50%}
// .wk .cj-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;-webkit-user-drag:none;pointer-events:none}
// .wk .cj-card::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,8,14,.94) 0%,rgba(8,8,14,.72) 42%,rgba(8,8,14,.1) 100%)}
// .wk .cj-card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;z-index:2;background:linear-gradient(90deg,var(--brand),var(--accent))}
// .wk .cj-in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:center;gap:9px;padding:clamp(16px,3vw,34px);max-width:62%}
// .wk .cj-top{display:flex;gap:8px;align-items:center;font-size:.7rem;font-weight:800}
// .wk .cj-top .n{color:#ffb27a;letter-spacing:.04em}
// .wk .cj-top .tg{padding:2px 9px;border-radius:999px;background:var(--brand);color:#fff}
// .wk .cj-card h3{color:#fff;font-size:clamp(1.05rem,2.2vw,1.55rem);line-height:1.15}
// .wk .cj-card p{color:rgba(255,255,255,.82);font-size:clamp(.78rem,1.2vw,.9rem);line-height:1.5}
// @media(max-width:640px){.wk .cj-card{aspect-ratio:4/5}.wk .cj-in{max-width:100%;justify-content:flex-end}.wk .cj-card::before{background:linear-gradient(0deg,rgba(8,8,14,.95) 0%,rgba(8,8,14,.55) 55%,rgba(8,8,14,.05) 100%)}}
// @media(prefers-reduced-motion:reduce){.wk .cj{overflow-x:auto;cursor:auto}.wk .cj-track{transform:none!important}}
// .wk .cj{position:relative;overflow:hidden;width:100vw;margin-left:calc(50% - 50vw);padding:34px 0 52px;cursor:grab;touch-action:pan-y;user-select:none}
// .wk .cj.dragging{cursor:grabbing}
// .wk .cj-track{position:relative;display:flex;gap:30px;width:max-content;will-change:transform}
// .wk .cj-card{position:relative;flex:none;width:min(620px,80vw);aspect-ratio:16/10;border-radius:22px;overflow:hidden;color:#fff;background:#0e0e16;border:1px solid rgba(255,255,255,.1);box-shadow:0 18px 44px rgba(8,8,14,.34);will-change:transform,opacity;transform-origin:50% 50%}
// .wk .cj-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;-webkit-user-drag:none;pointer-events:none}
// .wk .cj-card::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,8,14,.94) 0%,rgba(8,8,14,.72) 42%,rgba(8,8,14,.1) 100%)}
// .wk .cj-card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;z-index:2;background:linear-gradient(90deg,var(--brand),var(--accent))}
// .wk .cj-in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:center;gap:9px;padding:clamp(16px,3vw,34px);max-width:62%}
// .wk .cj-top{display:flex;gap:8px;align-items:center;font-size:.7rem;font-weight:800}
// .wk .cj-top .n{color:#ffb27a;letter-spacing:.04em}
// .wk .cj-top .tg{padding:2px 9px;border-radius:999px;background:var(--brand);color:#fff}
// .wk .cj-card h3{color:#fff;font-size:clamp(1.05rem,2.2vw,1.55rem);line-height:1.15}
// .wk .cj-card p{color:rgba(255,255,255,.82);font-size:clamp(.78rem,1.2vw,.9rem);line-height:1.5}
// @media(max-width:640px){.wk .cj-card{aspect-ratio:4/5}.wk .cj-in{max-width:100%;justify-content:flex-end}.wk .cj-card::before{background:linear-gradient(0deg,rgba(8,8,14,.95) 0%,rgba(8,8,14,.55) 55%,rgba(8,8,14,.05) 100%)}}
// @media(prefers-reduced-motion:reduce){.wk .cj{overflow-x:auto;cursor:auto}.wk .cj-track{transform:none!important}}
// `;


// /* ---------- C. DATA + COMPONENTS (WorkshopsList se pehle paste) ---------- */
// /** Har cheez yahan se edit karo. Naam / projects apne real syllabus ke hisaab se badlo. */
// const AUDIENCE_PAIN = [
//   ['code', 'Learn Java but never build', 'Syntax aata hai, par ek poora working project portfolio mein nahi hota.'],
//   ['book', 'Theory without practice', 'OOP aur collections yaad hain, par real backend ya API banana nahi aata.'],
//   ['compass', 'No clear full-stack roadmap', 'Pata nahi Java ke baad Spring Boot, database aur frontend kis order mein seekhein.'],
//   ['users', 'No mentor to ask', 'Error par atak jaate ho aur jawab dene wala koi nahi.'],
//   ['award', 'Nothing to show recruiters', 'Skills hain, par GitHub project aur verified certificate nahi.'],
// ];

// const ROADMAP = [
//   { day: 'DAY 0', when: 'Friday', live: true, time: '7PM to 9PM', title: 'Onboarding: set up your Java environment', desc: 'JDK, IDE and Git setup, the full-stack roadmap and your cohort. Ready to code from Day 1.', projects: [] },
//   { day: 'DAY 1', when: 'Saturday', live: true, time: '10AM to 7PM', title: 'Core Java and OOP, with your first project', desc: 'Classes, objects, collections and clean code, applied to a real console application.', projects: [['Console app', 'A working Java application'], ['OOP design', 'Classes that model a real problem'], ['GitHub repo', 'Your code saved and versioned']] },
//   { day: 'DAY 2', when: 'Sunday', live: true, time: '10AM to 7PM', title: 'Backend: Spring Boot, REST APIs and database', desc: 'Build an API, connect it to a database and test it like a professional.', projects: [['REST API', 'Create, read, update and delete'], ['Database schema', 'Tables and relationships'], ['Postman collection', 'Test every endpoint']] },
//   { day: 'DAY 3', when: 'Monday', live: false, time: 'Self-paced', title: 'Data layer: JPA, validation and error handling', desc: 'Guided lessons to make your backend reliable and production-minded.', projects: [['Entity mapping', 'Java objects to database rows'], ['Validation and errors', 'Clear API responses']] },
//   { day: 'DAY 4', when: 'Tuesday', live: false, time: 'Self-paced', title: 'Frontend: connect a React UI to your API', desc: 'Build screens and call your own backend end to end.', projects: [['React screens', 'List, form and detail pages'], ['API integration', 'UI talking to your Spring Boot backend']] },
//   { day: 'DAY 5', when: 'Break day', live: false, time: 'Catch-up', title: 'Catch up with your cohort', desc: 'Share progress, compare notes and unblock yourself before the final stretch.', projects: [], brk: true },
//   { day: 'DAY 6', when: 'Thursday', live: false, time: 'Self-paced', title: 'Capstone: build your full-stack application', desc: 'Plan and build the project you will present: backend, database and frontend together.', projects: [['Capstone app', 'Your best end-to-end work'], ['Demo walkthrough', 'A short recorded demo']] },
//   { day: 'DAY 7', when: 'Friday', live: false, time: 'Self-paced', title: 'Deploy and assessment', desc: 'Put your application online and get instructor review of your completed builds.', projects: [['Live deployment', 'A link you can share'], ['Assessment', 'Instructor-verified completion']] },
//   { day: 'BONUS', when: 'Saturday', live: true, time: 'Evening live', title: 'Showcase and interview readiness', desc: 'Present your capstone, polish your GitHub and resume, and practise common Java interview questions.', projects: [['GitHub and resume', 'Recruiter-ready profile'], ['Mock interview round', 'Practice with feedback']] },
// ];


// const INCLUDED = [
//   'Live sessions with working instructors',
//   'Build a real Java full-stack project, not just watch',
//   'Lifetime access to project files and templates',
//   'Private learner community',
//   'Instructor feedback and Q&A',
//   'Verified ILM ORA certificate with unique ID and QR',
// ];

// function OfferStrip() {
//   const o = CONFIG.OFFER;
//   const c = useCountdown(o && o.startsAt ? o.startsAt : Date.now());
//   if (!o || !o.on) return null;
//   return (
//     <div className="offer" role="note">
//       <span>{o.banner}</span>
//       {o.startsAt && o.startsAt > Date.now() && <span className="cdn" role="timer">{c.map(([l, v]) => <div key={l}><b>{v}</b><small>{l}</small></div>)}</span>}
//             <button type="button" className="btn btn-light btn-sm" onClick={() => go(o.registerSlug ? `/register/${o.registerSlug}` : '/catalog')}>Reserve my seat</button>
//     </div>
//   );
// }

// /** Hero ke neeche: format strip (live vs self-paced) + outcome chips ka data. */
// function FormatStrip() {
//   const o = CONFIG.OFFER || {};
//   return (
//     <section className="wrap sec" aria-label="Programme format">
//       <Reveal>
//         <div className="fmt">
//           <div><b>{o.cohort || 'Cohort dates: set real dates'}</b><span>Next cohort</span></div>
//           <div><b>Sat and Sun</b><span>LIVE sessions</span></div>
//           <div><b>Mon to Fri</b><span>Self-paced lessons, 2 to 3 hrs a day</span></div>
//           <div><b>10+ projects</b><span>Certificate on completion</span></div>
//         </div>
//       </Reveal>
//     </section>
//   );
// }

// function ProblemVsRoadmap() {
//   return (
//     <section className="wrap sec" aria-labelledby="pv-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="pv-h">Two ways to learn this skill</h2><p>Alone by trial and error, or with a proven roadmap and a cohort.</p></div></div></Reveal>
//       <Reveal className="two-opt">
//         <div className="opt bad"><h3>Stress, guesswork, trial and error</h3><ul><li>Random tutorials with no order</li><li>Projects that never get finished</li><li>No feedback on your work</li></ul></div>
//         <div className="opt good"><h3>Certainty, confidence, execution</h3><ul><li>Day-by-day roadmap with named projects</li><li>Live build days with your instructor</li><li>Verified certificate you can share</li></ul></div>
//       </Reveal>
//             <Reveal><div className="sechead" style={{ marginTop: 18 }}><div><h2 className="h-xl">This workshop is for you if you</h2></div></div></Reveal>
//       <Reveal className="pain">
//         {AUDIENCE_PAIN.map(([ic, t, d]) => <div key={t}><div className="pi"><I n={ic} s={16} /></div><b>{t}</b><span>{d}</span></div>)}
//       </Reveal>
//     </section>
//   );
// }

// /* ====================================================================
//    ROADMAP â†’ INTERACTIVE LEARNING JOURNEY
//    --------------------------------------------------------------------
//    KAISE LAGAYEIN (sirf ek jagah):
//    1. Purana `function Roadmap() { ... }` poora DELETE karo.
//    2. Is file ka poora content (neeche wala) us jagah paste karo, yaani
//       `const ROADMAP = [...]` ke baad. ROADMAP data ko TOUCH mat karo.
//    3. Home() mein <Roadmap /> already hai, wahan koi change nahi.
//    4. Naye imports nahi chahiye. Sab kuch pehle se file mein hai:
//       useState, useEffect, useMemo, useRef, I, IMG, CONFIG, ROADMAP,
//       scrollToId, reduce.
//    CSS is component ke andar hi hai (<style>), alag const/paste nahi.

//    DATA: Koi naya course, module, duration ya statistic nahi banaya.
//    Har stage ROADMAP ke existing din (index) ko group karta hai:
//      Discover Your Path        â†’ DAY 0
//      Learn Core Skills         â†’ DAY 1, DAY 2
//      Practice & Assignments    â†’ DAY 3, DAY 4, DAY 5
//      Build Real-World Projects â†’ DAY 6
//      Get Certified             â†’ DAY 7
//      Launch Your Career        â†’ BONUS
//    Card ka short text = us stage ke pehle din ka existing `desc`.
//    Chips (days / live / projects) ROADMAP se count hote hain.

//    STAGE STATUS:
//    - CONFIG.OFFER.startsAt set hai aur cohort shuru ho chuka hai
//      â†’ stage asli cohort din se nikalta hai (Completed / In progress / Upcoming).
//    - startsAt null hai (abhi ki setting) â†’ PREVIEW mode: visitor stage
//      kholta hai to wahan tak ka raasta "Unlocked" ho jata hai. Kisi ko
//      jhootha "Completed" nahi dikhta.
//    ==================================================================== */

// const JV_STAGES = [
//   { name: 'Discover Your Path', ic: 'compass', img: IMG.celebration, pos: '50% 40%', alt: 'Learners together at an ILM ORA workshop', days: [0] },
//   { name: 'Learn Core Skills', ic: 'book', img: IMG.javaLive, pos: '50% 40%', alt: 'Live Java workshop session', days: [1, 2] },
//   { name: 'Practice & Assignments', ic: 'assess', img: IMG.coding, pos: '50% 40%', alt: 'Learner coding during a focused workshop', days: [3, 4, 5] },
//   { name: 'Build Real-World Projects', ic: 'code', img: IMG.mentorGuidance, pos: '50% 40%', alt: 'Mentor guiding a learner who is working on a laptop', days: [6] },
//   { name: 'Get Certified', ic: 'award', img: IMG.certCeremony, pos: '50% 40%', alt: 'Learners receiving certificates at a Java workshop ceremony', days: [7] },
//   { name: 'Launch Your Career', ic: 'trending', img: IMG.javaCelebration, pos: '50% 40%', alt: 'Learners celebrating at a Java workshop', days: [8] },
// ];
// const JV_N = JV_STAGES.length;
// const JV_H = 96; // desktop path strip ki height (px)
// const jvY = (i) => (i % 2 === 0 ? 68 : 28); // node ka center, zig-zag
// const jvPath = (W) => {
//   const cw = W / JV_N, x = (i) => (i + 0.5) * cw;
//   let d = `M${x(0)} ${jvY(0)}`;
//   for (let i = 1; i < JV_N; i++) d += ` C${x(i - 1) + cw / 2} ${jvY(i - 1)} ${x(i) - cw / 2} ${jvY(i)} ${x(i)} ${jvY(i)}`;
//   return d;
// };
// const jvInfo = (s) => {
//   const d = s.days.map((i) => ROADMAP[i]);
//   return { d, live: d.filter((x) => x.live).length, proj: d.reduce((a, x) => a + x.projects.length, 0) };
// };
// /** Day label from ROADMAP: 'DAY 0', 'DAY 1\u20132', 'DAY 3\u20135', 'BONUS' (no invented data). */
// const jvDays = (s) => {
//   const d = s.days.map((i) => ROADMAP[i]);
//   if (d.length === 1) return d[0].day;
//   const n = (x) => x.day.replace('DAY ', '');
//   return `DAY ${n(d[0])}\u2013${n(d[d.length - 1])}`;
// };

// const JV_CSS = `
// .wk .jv-head{display:flex;justify-content:space-between;align-items:end;gap:14px;flex-wrap:wrap}
// .wk .jv-side{display:grid;gap:8px;min-width:min(100%,300px)}
// .wk .jv-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:.74rem;font-weight:700;color:var(--muted)}
// .wk .jv-legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:-1px}
// .wk .jv-legend .d i{background:var(--accent)}.wk .jv-legend .a i{background:var(--brand)}.wk .jv-legend .n i{border:2px dashed var(--muted)}
// .wk .jv-bar{height:6px;border-radius:6px;background:var(--ln);overflow:hidden}
// .wk .jv-bar i{display:block;height:100%;width:100%;transform-origin:left;background:linear-gradient(90deg,var(--accent),var(--brand));transition:transform 1s cubic-bezier(.2,.7,.2,1)}
// .wk .jv-bartxt{font-size:.78rem;font-weight:700}

// .wk .jv{position:relative;margin-top:18px}
// .wk .jv-list{list-style:none;margin:0;padding:0;display:grid;gap:14px;position:relative}
// .wk .jv-svg{display:none}

// /* ---------- mobile: vertical timeline ---------- */
// .wk .jv-step{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr);gap:14px;opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--i) * 110ms)}
// .wk .jv-step.on{opacity:1;transform:none}
// .wk .jv-step:not(:last-child)::before,.wk .jv-step:not(:last-child)::after{content:"";position:absolute;left:20px;top:22px;width:3px;height:calc(100% + 14px);border-radius:3px}
// .wk .jv-step::before{background:var(--ln)}
// .wk .jv-step::after{background:linear-gradient(var(--accent),var(--accent));transform:scaleY(0);transform-origin:top;transition:transform .8s ease;transition-delay:calc(var(--i) * 110ms + 250ms)}
// .wk .jv-step.done.on::after{transform:scaleY(1)}
// .wk .jv-top{position:relative;z-index:2}
// .wk .jv-node{position:relative;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--solid);border:2px dashed var(--muted);color:var(--muted);box-shadow:0 4px 12px rgba(40,25,10,.12)}
// .wk .jv-step.done .jv-node{background:var(--accent);border:2px solid var(--accent);color:#fff}
// .wk .jv-step.active .jv-node{background:var(--brand);border:2px solid var(--brand);color:#fff;animation:jvring 2.2s infinite}
// @keyframes jvring{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--brand) 55%,transparent)}70%,100%{box-shadow:0 0 0 12px transparent}}
// @keyframes jvtrav{from{transform:scale(.6);opacity:.9}to{transform:scale(2.2);opacity:0}}
// .wk .jv-tick{position:absolute;right:-5px;bottom:-4px;width:18px;height:18px;border-radius:50%;background:#fff;color:var(--accent);display:grid;place-items:center;box-shadow:0 1px 4px rgba(0,0,0,.25)}

// .wk .jv-card{position:relative;display:flex;flex-direction:column;min-width:0;border-radius:var(--r-lg);overflow:hidden;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,border-color .3s}
// .wk .jv-step.done .jv-card{border-color:color-mix(in srgb,var(--accent) 55%,var(--ln))}
// .wk .jv-step.active .jv-card{border-color:var(--brand);box-shadow:0 14px 34px color-mix(in srgb,var(--brand) 28%,transparent)}
// .wk .jv-art{position:relative;aspect-ratio:16/9;overflow:hidden;background:#1a1a22}
// .wk .jv-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1),filter .4s}
// .wk .jv-step.next .jv-art img{filter:grayscale(.55) brightness(.9)}
// .wk .jv-art::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.7),transparent 60%)}
// .wk .jv-no{position:absolute;left:12px;bottom:6px;z-index:1;color:#fff;font-size:1.9rem;font-weight:800;line-height:1;letter-spacing:-.03em;text-shadow:0 2px 10px rgba(0,0,0,.5)}
// .wk .jv-st{position:absolute;right:9px;top:9px;z-index:1;padding:3px 9px;border-radius:999px;font-size:.66rem;font-weight:800;background:rgba(10,12,30,.72);color:#fff;backdrop-filter:blur(6px)}
// .wk .jv-step.done .jv-st{background:var(--accent)}.wk .jv-step.active .jv-st{background:var(--brand)}
// .wk .jv-body{display:flex;flex-direction:column;gap:7px;padding:11px 13px 13px;flex:1}
// .wk .jv-body h3{font-size:.98rem}
// .wk .jv-body p{color:var(--muted);font-size:.8rem}
// .wk .jv-chips{display:flex;gap:5px;flex-wrap:wrap;margin-top:auto;padding-top:4px}
// .wk .jv-chip{padding:2px 8px;border-radius:999px;font-size:.68rem;font-weight:700;background:color-mix(in srgb,var(--text) 7%,transparent);color:var(--muted)}
// .wk .jv-chip.live{background:color-mix(in srgb,#ff4d6d 14%,transparent);color:#d1294a}
// .wk .jv-btn{align-self:flex-start;display:inline-flex;align-items:center;gap:6px;border:0;background:none;padding:0;margin-top:4px;font-weight:800;font-size:.8rem;color:var(--brand);cursor:pointer}
// .wk .jv-btn::after{content:"";position:absolute;inset:0;z-index:3}
// .wk .jv-btn:focus-visible{outline:none}
// .wk .jv-card:has(.jv-btn:focus-visible){outline:3px solid var(--accent);outline-offset:3px}
// .wk .jv-card:hover{transform:translateY(-4px);box-shadow:0 18px 36px color-mix(in srgb,var(--brand) 22%,rgba(60,25,0,.18))}
// .wk .jv-card:hover .jv-art img{transform:scale(1.07)}
// .wk .jv-card:hover .jv-art img,.wk .jv-step.next .jv-card:hover .jv-art img{filter:none}

// /* hover reveal (desktop) */
// .wk .jv-over{display:none}

// /* ---------- desktop: left to right journey ---------- */
// @media(min-width:1100px){
//   .wk .jv-list{grid-template-columns:repeat(6,minmax(0,1fr));gap:0}
//   .wk .jv-svg{display:block;position:absolute;left:0;top:0;width:100%;height:${JV_H}px;overflow:visible;pointer-events:none}
//   .wk .jv-p0,.wk .jv-p1{fill:none;stroke-width:4;stroke-linecap:round}
//   .wk .jv-p0{stroke:var(--ln)}
//   .wk .jv-p1{stroke:url(#jvg);stroke-dasharray:1;stroke-dashoffset:1}
//   .wk .jv-trav circle{fill:var(--brand);stroke:#fff;stroke-width:3}
//   .wk .jv-trav .ring{fill:color-mix(in srgb,var(--brand) 30%,transparent);stroke:none;animation:jvtrav 1.8s ease-out infinite;transform-box:fill-box;transform-origin:center}
//   .wk .jv-step{display:flex;flex-direction:column;gap:0;padding:0 8px}
//   .wk .jv-step::before,.wk .jv-step::after{display:none!important}
//   .wk .jv-top{height:${JV_H}px;display:flex;justify-content:center;align-items:flex-start}
//   .wk .jv-lo .jv-node{margin-top:${jvY(0) - 22}px}
//   .wk .jv-hi .jv-node{margin-top:${jvY(1) - 22}px}
//   .wk .jv-card{flex:1}
//   .wk .jv-over{display:block;position:absolute;inset:0;z-index:2;padding:14px 13px;overflow:auto;background:linear-gradient(180deg,rgba(11,12,18,.95),rgba(11,12,18,.97));color:#fff;opacity:0;pointer-events:none;transition:opacity .25s}
//   .wk .jv-over h4{font-size:.78rem;color:#ffb27a;margin-bottom:8px}
//   .wk .jv-over ol{list-style:none;margin:0;padding:0;display:grid;gap:9px}
//   .wk .jv-over b{display:block;font-size:.7rem;color:#ffb27a}
//   .wk .jv-over span{display:block;font-size:.78rem;line-height:1.3}
//   .wk .jv-over em{font-style:normal;font-size:.66rem;font-weight:800;opacity:.8}
// }
// @media(min-width:1100px) and (hover:hover){.wk .jv-card:hover .jv-over{opacity:1}}
// @media(min-width:1100px){.wk .jv-card:has(.jv-btn:focus-visible) .jv-over{opacity:1}}

// /* ---------- detail modal ---------- */
// .wk .jv-modal{position:fixed;inset:0;z-index:95;display:grid;place-items:center;padding:14px;background:rgba(5,5,10,.78);backdrop-filter:blur(4px);animation:jvfade .2s ease}
// @keyframes jvfade{from{opacity:0}}
// .wk .jv-mbox{position:relative;width:min(760px,100%);max-height:min(92vh,880px);display:flex;flex-direction:column;border-radius:20px;overflow:hidden;background:var(--solid);border:1px solid var(--ln);box-shadow:0 30px 70px rgba(0,0,0,.45);animation:jvpop .3s cubic-bezier(.2,.9,.2,1)}
// @keyframes jvpop{from{transform:translateY(18px) scale(.97);opacity:0}}
// .wk .jv-mhead{position:relative;flex:none;min-height:130px;color:#fff;display:flex;align-items:flex-end;padding:16px 18px;background:#111}
// .wk .jv-mhead img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
// .wk .jv-mhead::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(8,8,14,.92),rgba(8,8,14,.3))}
// .wk .jv-mhead>div{position:relative;z-index:2}
// .wk .jv-mhead h2{color:#fff;font-size:clamp(1.1rem,2.6vw,1.45rem)}
// .wk .jv-mhead small{display:flex;align-items:center;gap:7px;font-size:.74rem;font-weight:800;color:#ffb27a;margin-bottom:4px}
// .wk .jv-x{position:absolute;right:10px;top:10px;z-index:3;width:38px;height:38px;border-radius:50%;border:0;background:rgba(0,0,0,.65);color:#fff;display:grid;place-items:center;cursor:pointer}
// .wk .jv-mbody{overflow:auto;padding:16px 18px;display:grid;gap:12px}
// .wk .jv-day{padding:13px;border:1px solid var(--ln);border-radius:14px;background:var(--bg)}
// .wk .jv-day h3{margin:6px 0 4px;font-size:.98rem}
// .wk .jv-day>p{color:var(--muted);font-size:.84rem}
// .wk .jv-foot{flex:none;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 18px;border-top:1px solid var(--ln)}
// .wk .jv-foot .grp{display:flex;gap:8px;flex-wrap:wrap}
// `;

// function Roadmap() {
//   const rootRef = useRef(null);
//   const lastBtn = useRef(null);
//   const [seen, setSeen] = useState(false);
//   const [focus, setFocus] = useState(0); // preview mode: visitor ne kahan tak "travel" kiya
//   const [openI, setOpenI] = useState(null);
//   const [W, setW] = useState(960);
//   const [auto, setAuto] = useState(true); // preview mode mein journey khud chalti hai, user click kare to ruk jati hai
//   const p1Ref = useRef(null);
//   const travRef = useRef(null);
//   const dispRef = useRef(0);
//   const pausedRef = useRef(false);
//   const focusRef = useRef(0);
//   const modalRef = useRef(null);

//   const startsAt = CONFIG.OFFER && CONFIG.OFFER.startsAt;
//   const live = Boolean(startsAt && startsAt <= Date.now());
//   const current = useMemo(() => {
//     if (!live) return focus;
//     const day = Math.floor((Date.now() - startsAt) / 864e5);
//     if (day > ROADMAP.length - 1) return JV_N; // cohort poora ho gaya: sab Completed
//     const i = JV_STAGES.findIndex((s) => s.days.includes(day));
//     return i < 0 ? 0 : i;
//   }, [live, startsAt, focus]);

//   // scroll-triggered reveal: section viewport mein aate hi journey "chalti" hai
//   useEffect(() => {
//     const el = rootRef.current;
//     if (!el) return undefined;
//     if (reduce() || typeof IntersectionObserver === 'undefined') { setSeen(true); return undefined; }
//     const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.18 });
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   // SVG path asli width par banta hai, isliye stroke kabhi stretch nahi hota
//   useEffect(() => {
//     const el = rootRef.current;
//     if (!el) return undefined;
//     const set = () => { const w = el.querySelector('.jv-list'); if (w && w.clientWidth) setW(w.clientWidth); };
//     set();
//     if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', set); return () => window.removeEventListener('resize', set); }
//     const ro = new ResizeObserver(set);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const path = useMemo(() => jvPath(W), [W]);
//   const frac = current >= JV_N ? 1 : current / (JV_N - 1);
//   focusRef.current = focus;
//   modalRef.current = openI;

//   // Traveler marker + progress line: path par smoothly chalte hain
//   useEffect(() => {
//     const p1 = p1Ref.current, tv = travRef.current;
//     if (!p1 || !tv) return undefined;
//     const target = seen ? frac : 0;
//     const paint = (f) => {
//       p1.style.strokeDashoffset = String(1 - f);
//       try {
//         const pt = p1.getPointAtLength(p1.getTotalLength() * f);
//         tv.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
//       } catch (e) { /* hidden svg (mobile) */ }
//     };
//     if (reduce()) { dispRef.current = target; paint(target); return undefined; }
//     const from = dispRef.current, t0 = performance.now();
//     const dur = Math.min(1800, Math.max(500, 5500 * Math.abs(target - from)));
//     let raf = 0;
//     const tick = (t) => {
//       const p = Math.min(1, (t - t0) / dur);
//       const f = from + (target - from) * (1 - Math.pow(1 - p, 3));
//       dispRef.current = f;
//       paint(f);
//       if (p < 1) raf = requestAnimationFrame(tick);
//     };
//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [seen, frac, path]);

//   // Autoplay: stage 1 se 6 tak ek ke baad ek unlock. Hover, focus, modal ya click par ruk jata hai.
//   useEffect(() => {
//     if (!seen || live || !auto || reduce()) return undefined;
//     let t;
//     const loop = () => {
//       t = setTimeout(() => {
//         if (!pausedRef.current && modalRef.current == null) setFocus((f) => (f + 1) % JV_N);
//         loop();
//       }, focusRef.current === JV_N - 1 ? 3200 : 2000);
//     };
//     loop();
//     return () => clearTimeout(t);
//   }, [seen, live, auto]);
//   const statusOf = (i) => (i < current ? 'done' : i === current ? 'active' : 'next');
//   const label = (st) => (st === 'done' ? (live ? 'Completed' : 'Unlocked') : st === 'active' ? (live ? 'In progress' : 'You are here') : 'Upcoming');

//   const open = (i) => (e) => {
//     lastBtn.current = e.currentTarget;
//     setAuto(false);
//     setOpenI(i);
//     if (!live) setFocus(i);
//   };
//   const close = () => { setOpenI(null); if (lastBtn.current) lastBtn.current.focus(); };
//   const goTo = (i) => { setOpenI(i); if (!live) setFocus(i); };
//   const reserve = () => { setOpenI(null); setTimeout(() => scrollToId('wk-price'), 60); };

//     const barTxt = current >= JV_N ? 'Full roadmap complete' : `${jvDays(JV_STAGES[current])}: ${JV_STAGES[current].name}`;

//   return (
//     <section className="wrap sec" id="wk-roadmap" aria-labelledby="rm-h" ref={rootRef}>
//       <style dangerouslySetInnerHTML={{ __html: JV_CSS }} />
//       <Reveal>
//         <div className="jv-head">
//           <div className="sechead" style={{ marginBottom: 0 }}>
//             <div>
//               <h2 className="h-xl" id="rm-h">Your roadmap, day by day</h2>
//               <p>10+ projects. Live build days. One verified certificate. {live ? '' : 'Select a stage to open its modules.'}</p>
//             </div>
//           </div>
//           <div className="jv-side">
//             <div className="jv-bartxt" aria-live="polite">{barTxt}</div>
//             <div className="jv-bar" role="progressbar" aria-label="Journey progress" aria-valuemin={0} aria-valuemax={JV_N} aria-valuenow={Math.min(current + 1, JV_N)}>
//               <i style={{ transform: `scaleX(${seen ? Math.min(1, (Math.min(current, JV_N - 1) + 1) / JV_N) : 0})` }} />
//             </div>
//             <div className="jv-legend" aria-hidden="true">
//               <span className="d"><i />{live ? 'Completed' : 'Unlocked'}</span>
//               <span className="a"><i />{live ? 'In progress' : 'Current'}</span>
//               <span className="n"><i />Upcoming</span>
//             </div>
//           </div>
//         </div>
//       </Reveal>

//       <div
//         className="jv"
//         onMouseEnter={() => { pausedRef.current = true; }}
//         onMouseLeave={() => { pausedRef.current = false; }}
//         onFocus={() => { pausedRef.current = true; }}
//         onBlur={() => { pausedRef.current = false; }}
//       >
//         <svg className="jv-svg" width={W} height={JV_H} viewBox={`0 0 ${W} ${JV_H}`} aria-hidden="true" focusable="false">
//           <defs><linearGradient id="jvg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0"><stop offset="0" stopColor="#16a34a" /><stop offset="1" stopColor="#f97316" /></linearGradient></defs>
//           <path className="jv-p0" d={path} />
//           <path className="jv-p1" ref={p1Ref} d={path} pathLength="1" />
//           <g className="jv-trav" ref={travRef}><circle className="ring" r="9" /><circle r="6" /></g>
//         </svg>

//         <ol className="jv-list">
//           {JV_STAGES.map((s, i) => {
//             const st = statusOf(i);
//             const { d, live: nLive, proj } = jvInfo(s);
//             return (
//               <li key={s.name} className={`jv-step ${st} ${i % 2 === 0 ? 'jv-lo' : 'jv-hi'} ${seen ? 'on' : ''}`} style={{ '--i': i }} aria-current={st === 'active' ? 'step' : undefined}>
//                 <div className="jv-top">
//                   <span className="jv-node" aria-hidden="true">
//                     <I n={s.ic} s={19} />
//                     {st === 'done' && <span className="jv-tick"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10.5l3.2 3.2L15 6.8" /></svg></span>}
//                   </span>
//                 </div>
//                 <div className="jv-card">
//                   <div className="jv-art">
//                     <img src={s.img} alt={s.alt} loading="lazy" style={{ objectPosition: s.pos }} />
//                     <span className="jv-st">{label(st)}</span>
//                     <span className="jv-no">{jvDays(s)}</span>
//                   </div>
//                   <div className="jv-body">
//                    <h3><span className="sr">{jvDays(s)}: </span>{s.name}</h3>
//                                        <div className="jv-days">
//                       {d.map((x) => (
//                         <div className="jv-d" key={x.day}>
//                           <div className="jv-dt"><b>{x.day} | {x.when}</b><span className={x.live ? 'lv' : 'sp'}>{x.live ? 'LIVE' : 'SELF-PACED'}</span><em>{x.time}</em></div>
//                           <span className="jv-dn">{x.title}</span>
//                           {x.projects.length > 0 && <ul>{x.projects.map(([n, t]) => <li key={n}><b>{n}</b><span>{t}</span></li>)}</ul>}
//                         </div>
//                       ))}
//                     </div>
//                     <div className="jv-chips">
//                       <span className="jv-chip">{d.length} {d.length === 1 ? 'Day' : 'Days'}</span>
//                       {nLive > 0 && <span className="jv-chip live">{nLive} Live {nLive === 1 ? 'Session' : 'Sessions'}</span>}
//                       {proj > 0 && <span className="jv-chip">{proj} {proj === 1 ? 'Project' : 'Projects'}</span>}
//                     </div>
//                     <button type="button" className="jv-btn" onClick={open(i)} aria-haspopup="dialog">
//                       View modules<span className="sr">: {s.name}</span>
//                     </button>
//                   </div>
                  
//                 </div>
//               </li>
//             );
//           })}
//         </ol>
//       </div>

//       {openI != null && <JourneyModal i={openI} onClose={close} onGo={goTo} onReserve={reserve} />}
//     </section>
//   );
// }

// /** Stage ke poore existing modules (ROADMAP ka poora content: title, desc, time, projects). */
// function JourneyModal({ i, onClose, onGo, onReserve }) {
//   const s = JV_STAGES[i];
//   const { d } = jvInfo(s);
//   const box = useRef(null);
//   const closeBtn = useRef(null);

//   useEffect(() => {
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';
//     const key = (e) => {
//       if (e.key === 'Escape') { onClose(); return; }
//       if (e.key !== 'Tab' || !box.current) return;
//       const f = box.current.querySelectorAll('button:not([disabled]),a[href]');
//       if (!f.length) return;
//       const first = f[0], last = f[f.length - 1];
//       if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
//       else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
//     };
//     window.addEventListener('keydown', key);
//     return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', key); };
//   }, [onClose]);

//   useEffect(() => { if (closeBtn.current) closeBtn.current.focus(); if (box.current) box.current.querySelector('.jv-mbody').scrollTop = 0; }, [i]);

//   return (
//     <div className="jv-modal" onClick={onClose}>
//       <div className="jv-mbox" role="dialog" aria-modal="true" aria-labelledby="jv-mt" ref={box} onClick={(e) => e.stopPropagation()}>
//         <div className="jv-mhead">
//           <img src={s.img} alt="" style={{ objectPosition: s.pos }} />
//           <button type="button" className="jv-x" ref={closeBtn} onClick={onClose} aria-label="Close modules">
//             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
//           </button>
//           <div>
//               <small><I n={s.ic} s={14} />{jvDays(s)}</small>
//             <h2 id="jv-mt">{s.name}</h2>
//           </div>
//         </div>
//         <div className="jv-mbody">
//           {d.map((r) => (
//             <article className="jv-day" key={r.day}>
//               <div className="rm-top"><span className="d">{r.day} | {r.when}</span>{r.live ? <span className="l">LIVE</span> : <span className="s">SELF-PACED</span>}<span className="t">{r.time}</span></div>
//               <h3>{r.title}</h3>
//               <p>{r.desc}</p>
//               {r.projects.length > 0 && <div className="proj">{r.projects.map(([n, t]) => <div key={n}><b>{n}</b><span>{t}</span></div>)}</div>}
//             </article>
//           ))}
//         </div>
//         <div className="jv-foot">
//           <div className="grp">
//             <button type="button" className="btn btn-ghost btn-sm" disabled={i === 0} onClick={() => onGo(i - 1)}>{'\u2190'} Previous stage</button>
//             {i < JV_N - 1 && <button type="button" className="btn btn-ghost btn-sm" onClick={() => onGo(i + 1)}>Next stage {'\u2192'}</button>}
//           </div>
//           <button type="button" className="btn btn-primary btn-sm" onClick={onReserve}>Reserve my seat</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /** Cinematic learning journey: 4 alag images, seamless horizontal marquee (AutoRow). */
// const DAY_IMGS = [
//   [IMG.celebration, 'Learners together at an ILM ORA workshop'],
//   [IMG.javaLive, 'Live Java workshop session'],
//   [U(cineCoding), 'Student coding during an ILM ORA workshop'],
//   [U(cineAi), 'Learner exploring tools on a laptop'],
//   [U(cineMentor), 'Mentor guiding learners in a collaborative session'],
//   [IMG.studentCollab, 'Learners collaborating with a mentor'],
//   [IMG.coding, 'Learner coding during a focused workshop'],
//   [U(cinePresent), 'Presenter showcasing a product to a team'],
//   [IMG.javaCelebration, 'Learners celebrating at a Java workshop'],
// ];
// const CINE = ROADMAP.map((r, i) => ({ r, img: DAY_IMGS[i][0], alt: DAY_IMGS[i][1] }));

// function CinematicJourney() {
//   const boxRef = useRef(null);
//   const trackRef = useRef(null);
//   const copies = 3; // 3 copies: loop hamesha seamless rehta hai
//   const items = Array.from({ length: copies }, (_, k) => CINE.map((c, i) => ({ ...c, k, i }))).flat();

//   useEffect(() => {
//     const box = boxRef.current, track = trackRef.current;
//     if (!box || !track || reduce()) return undefined;
//     const cards = [...track.children];
//     let raf = 0, last = 0, pos = 0, hold = false, visible = true, resume = 0;
//     let dragging = false, sx = 0, sp = 0;

//     const loopLen = () => {
//       const a = cards[0], b = cards[CINE.length];
//       return a && b ? b.offsetLeft - a.offsetLeft : 0;
//     };
//     const paint = () => {
//       const half = box.clientWidth / 2;
//       for (const el of cards) {
//         const cx = el.offsetLeft + el.offsetWidth / 2 - pos;
//         const t = Math.max(-1, Math.min(1, (cx - half) / (box.clientWidth * 0.55)));
//         const a = Math.abs(t);
//         el.style.transform = `perspective(1300px) rotateY(${(-t * 30).toFixed(2)}deg) translateY(${(a * 16).toFixed(1)}px) scale(${(1 - a * 0.12).toFixed(3)})`;
//         el.style.opacity = (1 - a * 0.28).toFixed(2);
//         el.style.zIndex = String(Math.round((1 - a) * 10));
//       }
//     };
//     const wrap = () => {
//       const len = loopLen();
//       if (!len) return;
//       while (pos >= len) pos -= len;
//       while (pos < 0) pos += len;
//     };
//     const step = (t) => {
//       raf = requestAnimationFrame(step);
//       const dt = last ? Math.min(t - last, 50) : 16;
//       last = t;
//       if (!visible || document.hidden) return;
//       if (!hold && !dragging) { pos += 0.06 * dt; wrap(); }
//       track.style.transform = `translate3d(${-pos}px,0,0)`;
//       paint();
//     };

//     const enter = () => { hold = true; clearTimeout(resume); };
//     const leave = () => { clearTimeout(resume); resume = setTimeout(() => { hold = false; }, 600); };
//     const down = (e) => { dragging = true; sx = e.clientX; sp = pos; box.classList.add('dragging'); box.setPointerCapture && box.setPointerCapture(e.pointerId); };
//     const move = (e) => { if (!dragging) return; pos = sp - (e.clientX - sx); wrap(); };
//     const up = () => { if (!dragging) return; dragging = false; box.classList.remove('dragging'); };

//     box.addEventListener('mouseenter', enter);
//     box.addEventListener('mouseleave', leave);
//     box.addEventListener('pointerdown', down);
//     box.addEventListener('pointermove', move);
//     box.addEventListener('pointerup', up);
//     box.addEventListener('pointercancel', up);
//     const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }) : null;
//     if (io) io.observe(box);
//     raf = requestAnimationFrame(step);
//     return () => {
//       cancelAnimationFrame(raf); clearTimeout(resume); if (io) io.disconnect();
//       box.removeEventListener('mouseenter', enter);
//       box.removeEventListener('mouseleave', leave);
//       box.removeEventListener('pointerdown', down);
//       box.removeEventListener('pointermove', move);
//       box.removeEventListener('pointerup', up);
//       box.removeEventListener('pointercancel', up);
//     };
//   }, []);

//   return (
//         <section className="wrap sec" id="wk-roadmap" aria-labelledby="cj-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="cj-h">Explore Your Learning Journey</h2><p>{(CONFIG.OFFER && CONFIG.OFFER.cohort) || ''} Live Sat and Sun, self-paced Mon to Fri (2 to 3 hrs a day), 10+ projects, certificate on completion.</p></div></div></Reveal>
//       <div className="cj" ref={boxRef} role="region" aria-label="Explore your learning journey">
//         <div className="cj-track" ref={trackRef}>
//           {items.map((c) => (
//             <article className="cj-card" key={`${c.k}-${c.i}`} aria-hidden={c.k > 0 ? 'true' : undefined}>
//               <img src={c.img} alt={c.k === 0 ? c.alt : ''} loading="lazy" draggable="false" />
//                             <div className="cj-in">
//                 <div className="cj-top">
//                   <span className="n">{c.r.day} | {c.r.when.toUpperCase()}</span>
//                   {c.r.live ? <span className="tg live"><i />LIVE</span> : <span className="tg sp">SELF-PACED</span>}
//                   <span className="t">| {c.r.time}</span>
//                 </div>
//                 <h3>{c.r.title}</h3>
//                 <p>{c.r.desc}</p>
//                 {c.r.projects.length > 0 && (
//                   <>
//                     <b className="cj-ph">Projects</b>
//                     <ul className="cj-pl">{c.r.projects.map(([n, t]) => <li key={n}><b>{n}</b><span>{t}</span></li>)}</ul>
//                   </>
//                 )}
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// const CATS = ['All', 'AI', 'Development', 'Design', 'Marketing', 'Business', 'Leadership', 'HR', 'Contact Center', 'Engineering'];
// const PAGE = 6;
// const DEFAULTS = { date: 'any', price: 'any', level: 'any', sort: 'upcoming' };

// const sorters = {
//   upcoming: (a, b) => (a.format === 'live' && b.format === 'live' ? a.start - b.start : a.format === 'live' ? -1 : b.format === 'live' ? 1 : b.popularity - a.popularity),
//   popular: (a, b) => b.popularity - a.popularity,
//   'price-asc': (a, b) => a.price - b.price,
//   'price-desc': (a, b) => b.price - a.price,
// };

// function applyFilters(all, { q, cat, f }) {
//   const term = q.trim().toLowerCase();
//   return all.filter((w) => {
//     if (cat !== 'All' && w.category !== cat) return false;
//     if (term && !`${w.title} ${w.short} ${w.category} ${w.tags} ${w.instructor.name}`.toLowerCase().includes(term)) return false;
//     if (f.level !== 'any' && w.level !== f.level) return false;
//     if (f.price === 'free' && w.price !== 0) return false;
//     if (f.price === 'paid' && w.price === 0) return false;
//     if (f.price === 'u2000' && !(w.price > 0 && w.price <= 2000)) return false;
//     if (f.date === 'ondemand' && w.format !== 'ondemand') return false;
//     if (f.date === 'week' || f.date === 'fortnight') {
//       if (w.format !== 'live') return false;
//       const days = (w.start - Date.now()) / 864e5;
//       if (days > (f.date === 'week' ? 7 : 14)) return false;
//     }
//     return true;
//   });
// }

// /** Horizontal row jo khud scroll hoti hai (seamless loop). Hover, touch, focus, off-screen aur reduced-motion par ruk jati hai. */
// function AutoRow({ children, label }) {
//   const ref = useRef(null);
//   const copyRef = useRef(null);
//   const dupRef = useRef(null);
//   const [fits, setFits] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return undefined;
//     const measure = () => {
//       if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setFits(true); return; }
//       const c = copyRef.current && copyRef.current.children;
//       if (!c || !c.length) return;
//       const first = c[0], last = c[c.length - 1];
//       const total = last.offsetLeft + last.offsetWidth - first.offsetLeft;
//       setFits(total <= el.clientWidth - 40);
//     };
//     measure();
//     window.addEventListener('resize', measure);
//     return () => window.removeEventListener('resize', measure);
//   }, [children]);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el || fits) return undefined;
//     if (dupRef.current) dupRef.current.setAttribute('inert', '');
//     let raf = 0, last = 0, pos = el.scrollLeft, hold = false, visible = true, resumeTimer = 0;
//     const loopLen = () => {
//       const a = copyRef.current && copyRef.current.firstElementChild;
//       const b = dupRef.current && dupRef.current.firstElementChild;
//       return a && b ? b.offsetLeft - a.offsetLeft : 0;
//     };
//     const step = (t) => {
//       raf = requestAnimationFrame(step);
//       const dt = last ? Math.min(t - last, 50) : 16;
//       last = t;
//       if (hold || !visible || document.hidden) return;
//       const len = loopLen();
//       if (!len) return;
//       pos += 0.045 * dt;
//       if (pos >= len) pos -= len;
//       el.scrollLeft = pos;
//     };
//     const stop = () => { hold = true; clearTimeout(resumeTimer); };
//     const goOn = () => { pos = el.scrollLeft; hold = false; };
//     const goLater = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(goOn, 1800); };
//     el.addEventListener('mouseenter', stop); el.addEventListener('mouseleave', goOn);
//     el.addEventListener('touchstart', stop, { passive: true }); el.addEventListener('touchend', goLater, { passive: true });
//         el.addEventListener('focusin', stop); el.addEventListener('focusout', goOn);
//     let dragging = false, sx = 0, sl = 0;
//     const down = (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; dragging = true; sx = e.clientX; sl = el.scrollLeft; el.classList.add('dragging'); };
//     const move = (e) => {
//       if (!dragging) return;
//       let v = sl - (e.clientX - sx);
//       const len = loopLen();
//       if (len) { if (v >= len) { v -= len; sl -= len; } else if (v < 0) { v += len; sl += len; } }
//       el.scrollLeft = v; pos = v;
//     };
//     const up = () => { if (!dragging) return; dragging = false; el.classList.remove('dragging'); pos = el.scrollLeft; };
//     el.addEventListener('pointerdown', down); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
//     const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }) : null;
//     if (io) io.observe(el);
//     raf = requestAnimationFrame(step);
//     return () => {
//       cancelAnimationFrame(raf); clearTimeout(resumeTimer); if (io) io.disconnect();
//       el.removeEventListener('mouseenter', stop); el.removeEventListener('mouseleave', goOn);
//       el.removeEventListener('touchstart', stop); el.removeEventListener('touchend', goLater);
//             el.removeEventListener('focusin', stop); el.removeEventListener('focusout', goOn);
//       el.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
//     };
//   }, [fits]);

//   return (
//     <div className="row" ref={ref} tabIndex={0} aria-label={label}>
//       <div ref={copyRef} style={{ display: 'contents' }}>{children}</div>
//       {!fits && <div ref={dupRef} aria-hidden="true" style={{ display: 'contents' }}>{children}</div>}
//     </div>
//   );
// }

// function Catalog() {
//   const router = useRouter();
//   const sp = useSearchParams();
//   const catParam = sp.get('cat');
//   const urlCat = CATS.includes(catParam) ? catParam : 'All';
//   const [cat, setCatState] = useState(urlCat);
//   useEffect(() => setCatState(urlCat), [urlCat]); // footer / back-button changes follow karo
//   const { data, error, loading, reload } = useWorkshops();
//   const { user } = useApp();

//   const [q, setQ] = useState('');
//   const [f, setF] = useState(DEFAULTS);
//   const [open, setOpen] = useState(false);

//   const regs = useMemo(() => new Set(user ? api.myRegs().map((r) => r.slug) : []), [user, data]); // eslint-disable-line react-hooks/exhaustive-deps
//   const active = Boolean(q) || cat !== 'All' || f.date !== 'any' || f.price !== 'any' || f.level !== 'any';
//   const results = useMemo(() => (data ? applyFilters(data, { q, cat, f }).sort(sorters[f.sort]) : []), [data, q, cat, f]);
//   const live = results.filter((w) => w.format === 'live');
//   const onDemand = results.filter((w) => w.format === 'ondemand');
//   const featured = useMemo(() => [...results].sort(sorters.popular).slice(0, 5), [results]);

//   const setCat = (c) => {
//     setCatState(c);
//     router.replace(c === 'All' ? '/catalog' : `/catalog?cat=${c}`);
//   };
//   const setFilter = (k) => (e) => { setF((s) => ({ ...s, [k]: e.target.value })); };
//   const reset = () => { setQ(''); setF(DEFAULTS); router.replace('/catalog'); };

//   const renderSection = ({ id, title, sub, items }) => items.length === 0 ? null : (
//     <section className="sec" aria-labelledby={id} key={id}>
//       <div className="sechead"><div><h2 id={id}>{title}</h2><p>{sub}</p></div></div>
//       <AutoRow label={title}>{items.map((w) => <WorkshopCard key={w.slug} w={w} registered={regs.has(w.slug)} />)}</AutoRow>
//     </section>
//   );

//   return (
//     <>
//       <section className="wrap" style={{ paddingTop: 18 }}><Link className="btn btn-ghost btn-sm" href="/workshops">{'\u2190'} Back to the 7-day programme</Link></section>

//       <section className="wrap sec" id="wk-explore" aria-labelledby="ex-h" style={{ scrollMarginTop: 90 }}>
//                 <div className="textcard">
//           <h2 className="h-xl" id="ex-h">Explore workshops</h2>
//           <p className="muted" style={{ marginTop: 4, maxWidth: '62ch' }}>Learn a skill in an afternoon. Join a live session with a practitioner, or watch on demand whenever suits you.</p>
//         </div>
//         <form className="searchbox glass" role="search" onSubmit={(e) => e.preventDefault()}>
//           {Icons.search}
//           <label htmlFor="q" className="sr">Search workshops by title or topic</label>
//           <input id="q" type="search" placeholder="Search by title or topic, e.g. agents, Figma, pricing" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} />
//           <button type="button" className="btn btn-primary btn-sm" id="filtersBtn" aria-expanded={open} aria-controls="filters" onClick={() => setOpen((o) => !o)}>Filters</button>
//         </form>
//         <div className="cats" role="group" aria-label="Topics">
//           {CATS.map((c) => (
//             <button key={c} type="button" className="pill" aria-pressed={cat === c} onClick={() => setCat(c)}>
//               {c}{data && <small>{c === 'All' ? data.length : data.filter((w) => w.category === c).length}</small>}
//             </button>
//           ))}
//         </div>
//         <div className={`filters glass ${open ? 'open' : ''}`} id="filters">
//           <label className="f">When
//             <select value={f.date} onChange={setFilter('date')}><option value="any">Any time</option><option value="week">Next 7 days</option><option value="fortnight">Next 14 days</option><option value="ondemand">On-demand only</option></select>
//           </label>
//           <label className="f">Price
//             <select value={f.price} onChange={setFilter('price')}><option value="any">Any price</option><option value="free">Free</option><option value="u2000">Up to {'\u20B9'}2,000</option><option value="paid">Paid</option></select>
//           </label>
//           <label className="f">Level
//             <select value={f.level} onChange={setFilter('level')}><option value="any">All levels</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
//           </label>
//           <label className="f">Sort by
//             <select value={f.sort} onChange={setFilter('sort')}><option value="upcoming">Upcoming</option><option value="popular">Popular</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select>
//           </label>
//           <div style={{ display: 'flex', alignItems: 'end' }}><button type="button" className="btn btn-ghost btn-block" onClick={reset}>Reset filters</button></div>
//         </div>

//                 <p className="countpill" aria-live="polite">
//           {data && `${results.length} workshop${results.length === 1 ? '' : 's'} ${active ? 'match your filters' : 'available'}`}
//         </p>

//         {loading && <div className="sec"><div className="grid"><Skeletons n={6} /></div></div>}

//         {error && !loading && (
//           <div className="state glass" role="alert" style={{ marginTop: 30 }}>
//             <h2>We could not load workshops</h2>
//             <p className="muted">{error.message} Check your connection and try again.</p>
//             <button type="button" className="btn btn-primary" onClick={reload}>Try again</button>
//           </div>
//         )}

//         {data && results.length === 0 && (
//           <div className="state glass" style={{ marginTop: 26 }}>
//             <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><circle cx="28" cy="28" r="17" /><path d="M41 41l14 14M22 28h12" /></svg>
//             <h2>No workshops match yet</h2>
//             <p className="muted" style={{ maxWidth: '44ch' }}>Try a different keyword, or clear a filter to see more workshops.</p>
//             <button type="button" className="btn btn-primary" onClick={reset}>Clear all filters</button>
//           </div>
//         )}

//         {data && results.length > 0 && (
//           <>
//             {featured.length > 2 && !q && renderSection({ id: 'feat', title: 'Featured workshops', sub: 'The most popular sessions with learners right now.', items: featured })}
//             {renderSection({ id: 'up', title: 'Upcoming live workshops', sub: 'Live sessions you can join with the instructor.', items: live })}
//             {renderSection({ id: 'od', title: 'On-demand learning library', sub: 'Recorded and ready when you are.', items: onDemand })}
//           </>
//         )}
//       </section>

//       <TopicTiles data={data} />
//     </>
//   );
// }

// function CatalogTeaser({ data }) {
//   const { user } = useApp();
//   const regs = useMemo(() => new Set(user ? api.myRegs().map((r) => r.slug) : []), [user, data]); // eslint-disable-line react-hooks/exhaustive-deps
//   const top = useMemo(() => [...(data || [])].sort(sorters.popular).slice(0, 3), [data]);
//   if (!top.length) return null;
//   return (
//     <section className="wrap sec" aria-labelledby="ct-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="ct-h">More workshops to explore</h2><p>Short live and on-demand workshops across AI, development, design, business and more.</p></div><LinkBtn href="/catalog" sm>Browse all workshops</LinkBtn></div></Reveal>
//             <div className="grid teaser">{top.map((w) => <WorkshopCard key={w.slug} w={w} registered={regs.has(w.slug)} />)}</div>
//       {UPCOMING.length > 0 && <p className="muted" style={{ marginTop: 14 }}>Coming soon: {UPCOMING.join(', ')}</p>}
//     </section>
//   );
// }

// /** Config-driven sections: array khali ho to section dikhta hi nahi. Sirf real, verified data daalo. */
// const FEATURED_IN = []; // [{ name: 'Media name', src: U(importedLogo) }]
// const UPCOMING = [];    // Coming soon workshop names; add only confirmed workshops.
// const WHY_NOW = [];     // [{ value: '00%', label: 'stat description' }]  + WHY_NOW_SOURCE me source likho
// const WHY_NOW_SOURCE = '';

// function FeaturedIn() {
//   if (!FEATURED_IN.length) return null;
//   const list = [...FEATURED_IN, ...FEATURED_IN];
//   return (
//     <section className="wrap sec" aria-label="Featured in">
//       <Reveal><p className="muted" style={{ textAlign: 'center', fontWeight: 700 }}>Featured in</p></Reveal>
//       <div className="mq"><ul className="mq-track">{list.map((t, i) => (
//         <li className="mq-logo" key={t.name + i} aria-hidden={i >= FEATURED_IN.length ? 'true' : undefined}><img src={t.src} alt={i >= FEATURED_IN.length ? '' : t.name} loading="lazy" /></li>
//       ))}</ul></div>
//     </section>
//   );
// }

// function WhyNow() {
//   if (!WHY_NOW.length) return null;
//   return (
//     <section className="wrap sec" aria-labelledby="wn-h">
//       <Reveal><div className="sechead"><div><h2 className="h-xl" id="wn-h">Why learn this now</h2>{WHY_NOW_SOURCE && <p>Source: {WHY_NOW_SOURCE}</p>}</div></div></Reveal>
//       <Reveal className="fmt">{WHY_NOW.map((x) => <div key={x.label}><b>{x.value}</b><span>{x.label}</span></div>)}</Reveal>
//     </section>
//   );
// }

// /** Roadmap ke baad mid-page CTA (GrowthSchool jaisa repeated CTA). */
// function MidCta() {
//   const o = CONFIG.OFFER || {};
//   const target = o.registerSlug ? `/register/${o.registerSlug}` : '/catalog';
//   return (
//     <section className="wrap sec" aria-label="Reserve your seat">
//       <Reveal className="nl">
//         <div><h3 style={{ fontSize: '1.1rem' }}>Ready to build your first full-stack project?</h3><p style={{ marginTop: 4, fontSize: '.86rem' }}>{o.batchNote || 'Limited seats in every cohort.'}</p></div>
//         <button type="button" className="btn btn-light btn-lg" onClick={() => go(target)}>Reserve my seat{o.price ? ` for ${money(o.price)}` : ''}</button>
//       </Reveal>
//     </section>
//   );
// }

// /** Scroll ke baad neeche chipakne wala Reserve bar (mobile par dikhta hai, .stickybar CSS). */
// function StickyReserve() {
//   const o = CONFIG.OFFER || {};
//   if (!o.on) return null;
//   return (
//     <div className="stickybar gsbar" role="complementary" aria-label="Reserve your seat">
//       <div className="gsbar-in">
//         <div className="gsbar-price"><b>{money(o.price || 0)}</b>{o.original ? <s>{money(o.original)}</s> : null}</div>
//         <button type="button" className="btn btn-primary gsbar-btn" onClick={() => go(o.registerSlug ? `/register/${o.registerSlug}` : '/catalog')}>Register Now</button>
//       </div>
//     </div>
//   );
// }
// /* ---------- TOOLS SECTION ---------- */

// const WORKSHOP_TOOLS = [
//   { name: 'Claude', img: logo0 },
//   { name: 'Make', img: logo1 },
//   { name: 'Magnific AI', img: logo2 },
//   { name: 'Runway', img: logo3 },
//   { name: 'Luma AI', img: logo4 },
//   { name: 'Topaz Labs', img: logo5 },
//   { name: 'DaVinci Resolve', img: logo6 },
//   { name: 'Midjourney', img: logo7 },
//   { name: 'Perplexity', img: logo8 },
// ];

// function ToolsSection() {
//   return (
//     <section className="wrap sec" aria-labelledby="tools-heading">
//       <Reveal>
//         <div className="sechead">
//           <div>
//             <h2 className="h-xl" id="tools-heading">
//               Tools You'll Learn
//             </h2>
//             <p>
//               Explore industry-leading AI, development and creative tools
//               through practical workshops.
//             </p>
//           </div>
//         </div>
//       </Reveal>

//       <div className="tools-marquee" aria-label="Tools you'll learn">
//   <div className="tools-track">
//     {[...WORKSHOP_TOOLS, ...WORKSHOP_TOOLS].map((tool, index) => (
//       <div
//         className="tool"
//         key={`${tool.name}-${index}`}
//         aria-hidden={index >= WORKSHOP_TOOLS.length ? 'true' : undefined}
//       >
//         <img
//           src={U(tool.img)}
//           alt={index >= WORKSHOP_TOOLS.length ? '' : tool.name}
//           loading="lazy"
//         />
//         <span>{tool.name}</span>
//       </div>
//     ))}
//   </div>
// </div>
//   </section>
//   );
// }


// /* ---------- PRICING CARD ---------- */

// function PricingCard() {
//   const offer = CONFIG.OFFER || {};

//   return (
//     <section
//       className="wrap sec"
//       id="wk-price"
//       aria-labelledby="pricing-heading"
//     >
//       <Reveal className="price-card">
//         <div>
//           <span className="badge feat">LIMITED TIME OFFER</span>

//           <h2
//             className="h-xl"
//             id="pricing-heading"
//             style={{ marginTop: 12 }}
//           >
//             Start Your Learning Journey
//           </h2>

//           <p className="muted" style={{ marginTop: 8 }}>
//             Join ILM ORA workshops and learn through expert guidance,
//             practical projects and real-world experience.
//           </p>

//           <p className="pc-note">
//             {offer.batchNote}
//           </p>
//         </div>

//         <div>
//           <div className="pc-price">
//             {money(offer.price || 0)}
//             {offer.original > offer.price && (
//               <s>{money(offer.original)}</s>
//             )}
//           </div>

//           {offer.refund && (
//             <div className="pc-refund">
//               {offer.refund}
//             </div>
//           )}

//           <button
//             type="button"
//             className="btn btn-primary btn-lg"
//             style={{ marginTop: 16 }}
//             onClick={() =>
//               go(
//                 offer.registerSlug
//                   ? `/register/${offer.registerSlug}`
//                   : '/catalog'
//               )
//             }
//           >
//             Reserve My Seat
//           </button>
//         </div>
//       </Reveal>
//     </section>
//   );
// }
// function Home() {
//   const { data } = useWorkshops();
//   return (
//     <>
//       <OfferStrip />
//       <Hero data={data} />
//       <CinematicJourney />
//       <FeaturedIn />
//       <WhyNow />
      
//             <ToolsSection />
//       <Experience />
      
      
//       <Instructors data={data} />
//       <Community />
//       <WallOfLove />
//       <Corporate />
//       <CatalogTeaser data={data} />
//       <section className="wrap sec"><Faq /></section>
//       <FinalCta />
//       <StickyReserve />
//     </>
//   );
// }

// function AccessPanel({ w }) {
//   const [state, setState] = useState({ busy: false, url: null, error: null });
//   const reveal = async () => {
//     setState({ busy: true, url: null, error: null });
//     try {
//       const a = await api.access(w.slug);
//       setState({ busy: false, url: a.url, error: null });
//     } catch (e) {
//       setState({ busy: false, url: null, error: e.message });
//     }
//   };
//   return (
//     <>
//       <div className="alert good" role="status" style={{ marginBottom: 12 }}>You are registered for this workshop.</div>
//       {w.format === 'live' ? (
//         <>
//           <button type="button" className="btn btn-primary btn-block" onClick={reveal} disabled={state.busy || Boolean(state.url)}>
//             {state.url ? 'Join link shown below' : 'Show join link'}
//           </button>
//           <div style={{ marginTop: 12 }} aria-live="polite">
//             {state.url && (
//               <>
//                 <div className="linkbox"><a href={state.url} target="_blank" rel="noopener noreferrer">{state.url}</a></div>
//                 <p className="muted" style={{ fontSize: '.85rem', marginTop: 8 }}>Only you can see this link. Please do not share it.</p>
//               </>
//             )}
//             {state.error && <div className="alert bad" role="alert">{state.error}</div>}
//           </div>
//         </>
//       ) : (
//         <LinkBtn href={`/watch/${w.slug}`} block>Watch recordings</LinkBtn>
//       )}
//     </>
//   );
// }

// function WorkshopDetail({ slug }) {
//   const { user, ready } = useApp();
//   const { data: all } = useWorkshops();
//   const [state, setState] = useState({ w: null, error: null, loading: true });

//   const load = () => {
//     setState({ w: null, error: null, loading: true });
//     api.get(slug).then((w) => setState({ w, error: null, loading: false })).catch((e) => setState({ w: null, error: e, loading: false }));
//   };
//   useEffect(load, [slug]); // eslint-disable-line react-hooks/exhaustive-deps
//   // Per-workshop title, description aur structured data (SEO)
//   useEffect(() => {
//     const w = state.w;
//     if (!w) return undefined;
//     setPageMeta(`${w.title} | ILM ORA Workshops`, `${w.short} Taught by ${w.instructor.name}.`);
//     const ld = {
//       '@context': 'https://schema.org', '@type': w.format === 'live' ? 'Event' : 'Course', name: w.title, description: w.short,
//       ...(w.format === 'live' ? { startDate: new Date(w.start).toISOString(), eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode', location: { '@type': 'VirtualLocation', url: window.location.href } } : { provider: { '@type': 'Organization', name: 'ILM ORA' } }),
//       offers: { '@type': 'Offer', price: w.price, priceCurrency: 'INR' }, performer: { '@type': 'Person', name: w.instructor.name },
//     };
//     let el = document.getElementById('wk-ld');
//     if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.id = 'wk-ld'; document.head.appendChild(el); }
//     el.textContent = JSON.stringify(ld);
//     return () => { const x = document.getElementById('wk-ld'); if (x) x.remove(); };
//   }, [state.w]);

//   const { w, error, loading } = state;
//   if (loading) return <div className="wrap"><div className="skel" style={{ marginTop: 20, height: 220 }} /><div className="skel" style={{ marginTop: 14, height: 340 }} /></div>;
//   if (error) {
//     return error.code === 404
//       ? <StateBox title="Workshop not found" text="It may have been removed or the link is mistyped."><LinkBtn href="/catalog">Browse workshops</LinkBtn></StateBox>
//       : <StateBox title="We could not load this workshop" text={error.message}><button type="button" className="btn btn-primary" onClick={load}>Try again</button></StateBox>;
//   }

//   const live = w.format === 'live';
//   const full = live && w.seatsLeft === 0;
//   const reg = ready && user ? api.myReg(w.slug) : null;
//   const regs = new Set(user ? api.myRegs().map((r) => r.slug) : []);
//   const related = (all || []).filter((x) => x.slug !== w.slug && x.category === w.category)
//     .concat((all || []).filter((x) => x.slug !== w.slug && x.category !== w.category && x.level === w.level)).slice(0, 3);

//   const facts = [
//     live ? [Icons.cal, 'Date', fmtDL.format(w.start)] : [Icons.play, 'Format', 'Recorded, watch any time'],
//     live ? [Icons.clock, 'Time', `${fmtT.format(w.start)} \u2022 ${w.tz}`] : [Icons.clock, 'Total length', durTxt(w.duration)],
//     ...(live ? [[Icons.clock, 'Duration', durTxt(w.duration)]] : []),
//     [Icons.lvl, 'Level', w.level],
//     [Icons.play, 'Format', live ? 'Live online session' : 'On-demand recordings'],
//     [Icons.cal, 'Registration', full ? 'Closed, this session is full' : w.seatsLeft != null ? `Open, ${w.seatsLeft} seats left` : 'Open, enrol any time'],
//   ];

//   return (
//     <div className="wrap">
//       <nav className="crumbs" aria-label="Breadcrumb">
//         <Link href="/catalog">Workshops</Link> / <Link href={`/catalog?cat=${w.category}`}>{w.category}</Link> / <span aria-current="page">{w.title}</span>
//       </nav>
//       <div className="banner">
//         <WorkshopArt w={w} />
//         <div className="badges"><FormatBadge w={w} />{w.price === 0 && <span className="badge free">Free</span>}</div>
//       </div>

//       <div className="dgrid">
//         <div>
//           <div className="panel glass">
//             <h1 style={{ fontSize: 'clamp(1.25rem,2.6vw,1.65rem)' }}>{w.title}</h1>
//             <p className="lead muted" style={{ marginTop: 12 }}>{w.short}</p>
//             <p style={{ marginTop: 16 }}>{w.long}</p>
//           </div>
//           {MEDIA.promos[w.slug] && <div style={{ marginTop: 12 }}><Yt id={MEDIA.promos[w.slug]} title={`${w.title} preview`} /></div>}
//           <div className="panel glass"><h2>What you will learn</h2><ul className="ticks">{w.learn.map((x) => <li key={x}>{x}</li>)}</ul></div>
//           <div className="panel glass"><h2>Learning outcomes</h2><ul className="ticks">{w.outcomes.map((x) => <li key={x}>{x}</li>)}</ul></div>
//           <div className="panel glass">
//             <h2>{live ? 'Session agenda' : 'Modules'}</h2>
//             {w.agenda.map((a, i) => (
//               <details className="ag" key={a.title} open={i === 0}>
//                 <summary><span>{a.title}</span><span className="t">{a.time}</span></summary>
//                 <div className="d">{a.desc}</div>
//               </details>
//             ))}
//           </div>
//           <div className="panel glass twocol">
//             <div><h2>Before you join</h2><ul className="ticks" style={{ marginTop: 14 }}>{w.prereq.map((x) => <li key={x}>{x}</li>)}</ul></div>
//             <div><h2>Who this is for</h2><ul className="ticks" style={{ marginTop: 14 }}>{w.audience.map((x) => <li key={x}>{x}</li>)}</ul></div>
//           </div>
//           <div className="panel glass">
//             <h2>Your instructor</h2>
//             <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
//               <Avatar person={w.instructor} large />
//               <div style={{ flex: 1, minWidth: 220 }}>
//                 <h3>{w.instructor.name}</h3>
//                 <p className="muted">{w.instructor.role}{w.instructor.years ? ` \u2022 ${w.instructor.years}+ years of experience` : ''}</p>
//                 <p style={{ marginTop: 10 }}>{w.instructor.bio}</p>
//               </div>
//             </div>
//           </div>
//           <DetailExtras w={w} />
//         </div>

//         <aside className="aside">
//           <div className="panel glass" aria-label="Registration">
//             <div className="price" style={{ fontSize: '1.55rem' }}>{money(w.price)}</div>
//             <ul className="facts">
//               {facts.map(([icon, label, value]) => (
//                 <li key={label + value}><span aria-hidden="true">{icon}</span><span><b>{label}</b>{value}</span></li>
//               ))}
//             </ul>
//             <div>
//               {reg ? <AccessPanel w={w} /> : full ? (
//                 <>
//                   <button type="button" className="btn btn-primary btn-block" disabled>Sold out</button>
//                   <p className="muted" style={{ marginTop: 10, fontSize: '.9rem' }}>Registration is closed. Browse similar workshops below.</p>
//                 </>
//               ) : (
//                 <>
//                   <LinkBtn href={`/register/${w.slug}`} block>{w.price === 0 ? 'Register now, it is free' : 'Register now'}</LinkBtn>
//                   <p className="muted" style={{ marginTop: 10, fontSize: '.88rem' }}>Takes about a minute. No account needed.</p>
//                 </>
//               )}
//             </div>
//           </div>
//         </aside>
//       </div>

//       {related.length > 0 && (
//         <section className="sec" aria-labelledby="rel">
//           <div className="sechead"><h2 id="rel">Related workshops</h2></div>
//           <div className="grid">{related.map((x) => <WorkshopCard key={x.slug} w={x} registered={regs.has(x.slug)} />)}</div>
//         </section>
//       )}
//       {!reg && !full && (
//         <div className="stickybar"><div><b>{money(w.price)}</b>{w.seatsLeft != null && w.seatsLeft < 20 && <div style={{ fontSize: '.8rem', color: 'var(--err)' }}>Only {w.seatsLeft} seats left</div>}</div><LinkBtn href={`/register/${w.slug}`}>{w.price === 0 ? 'Register free' : 'Register now'}</LinkBtn></div>
//       )}
//     </div>
//   );
// }

// const luhn = (n) => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return s % 10 === 0; };
// function RegisterFlow({ slug }) {
//   const router = useRouter();
//   const { user, toast } = useApp();
//   const [w, setW] = useState(null);
//   const [loadErr, setLoadErr] = useState(null);
//   const [step, setStep] = useState(1);
//   const [d, setD] = useState({ name: '', email: '', phone: '', country: 'India', address: '' });
//   const [pay, setPay] = useState({ cnum: '', cexp: '', ccvc: '' });
//   const [promo, setPromo] = useState({ open: false, code: '', applied: false, error: '' });
//   const [errors, setErrors] = useState({});
//   const [formErr, setFormErr] = useState(null);
//   const [busy, setBusy] = useState(false);

//   // Guest checkout: login ki zaroorat nahi
//   useEffect(() => { if (user) setD((s) => ({ ...s, name: s.name || user.name, email: s.email || user.email })); }, [user]);
//   useEffect(() => { api.get(slug).then(setW).catch(setLoadErr); }, [slug]);
//   // Duplicate registration rokna
//   useEffect(() => {
//     if (user && api.myReg(slug)) { toast('You are already registered for this workshop.'); router.replace(`/workshops/${slug}`); }
//   }, [user, slug, router, toast]);

//   if (loadErr) return <StateBox title="We could not load this workshop" text={loadErr.message}><LinkBtn href="/catalog">Back to workshops</LinkBtn></StateBox>;
//   if (!w) return <div className="wrap"><div className="skel" style={{ marginTop: 24, height: 340, maxWidth: 900, marginInline: 'auto' }} /></div>;
//   if (w.format === 'live' && w.seatsLeft === 0) {
//     return <StateBox title="This workshop is full" text="Registration is closed for this session. Explore similar workshops instead."><LinkBtn href={`/catalog?cat=${w.category}`}>See more in {w.category}</LinkBtn></StateBox>;
//   }

//   const paid = w.price > 0;
//   const live = w.format === 'live';
//   const total = promo.applied ? Math.round(w.price * 0.9) : w.price;
//   const setField = (k) => (e) => setD((s) => ({ ...s, [k]: e.target.value }));
//   const inv = (k) => (errors[k] ? 'true' : 'false');

//   const submit = async () => {
//     setBusy(true); setFormErr(null);
//     try {
//       await api.register(slug, { ...d, level: '', goal: '', consent: true, paid });
//       invalidateWorkshops();
//       toast('You are registered.', 'ok');
//       router.push(`/confirmation/${slug}`);
//     } catch (e) {
//       setFormErr({ message: e.message, duplicate: e.code === 409 });
//       setBusy(false);
//       if (e.code === 401) router.replace(`/login?next=${encodeURIComponent(`/register/${slug}`)}`);
//     }
//   };

//   const onEmail = (ev) => {
//     ev.preventDefault();
//     if (!emailOK(d.email.trim())) { setErrors({ email: 'Enter a valid email address.' }); return; }
//     setErrors({}); setFormErr(null);
//     // Guest checkout: email se hi session ban jata hai (login zaroori nahi)
//     const em = d.email.trim().toLowerCase();
//     const cur = api.session();
//     if (!cur || (String(cur.id).startsWith('g-') && cur.email !== em)) {
//       store.set('ilm_session', { id: 'g-' + em, name: '', email: em });
//       window.dispatchEvent(new Event('focus'));
//     }
//     setStep(2);
//   };

//   const applyPromo = () => {
//     if (promo.code.trim().toUpperCase() === 'ILMORA10') setPromo((p) => ({ ...p, applied: true, error: '' }));
//     else setPromo((p) => ({ ...p, applied: false, error: 'This promo code is not valid.' }));
//   };

//   const onPay = (ev) => {
//     ev.preventDefault();
//     const e = {};
//     if (d.name.trim().length < 2) e.name = 'Enter your full name.';
//     if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(d.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit Indian mobile number.';
//     if (paid) {
//       const digits = pay.cnum.replace(/\s/g, '');
//       if (!(digits.length >= 13 && luhn(digits))) e.cnum = 'Enter a valid card number.';
//       const m = /^(\d{2})\/(\d{2})$/.exec(pay.cexp);
//       const now = new Date();
//       const okExp = m && +m[1] >= 1 && +m[1] <= 12 && (2000 + +m[2] > now.getFullYear() || (2000 + +m[2] === now.getFullYear() && +m[1] >= now.getMonth() + 1));
//       if (!okExp) e.cexp = 'Enter a valid, future expiry date as MM/YY.';
//       if (!/^\d{3,4}$/.test(pay.ccvc)) e.ccvc = 'Enter the 3 or 4 digit security code.';
//     }
//     setErrors(e);
//     if (Object.keys(e).length) { setFormErr({ message: 'Please fix the highlighted fields.' }); return; }
//     submit();
//   };

//   const alertBox = formErr && (
//     <div className="alert bad">{formErr.message}{formErr.duplicate && <> <Link href={`/workshops/${slug}`}>View your registration</Link></>}</div>
//   );

//   return (
//     <div className="wrap">
//       <div className="jn">
//                 <div className="jn-info panel glass">
//           <div className="banner" style={{ height: 150, marginTop: 0, marginBottom: 18 }}><WorkshopArt w={w} /></div>
//           <h1>{w.title}</h1>
//           <p className="jn-sub">with {w.instructor.name}</p>
//           <p className="jn-sub">{live ? `${fmtDL.format(w.start)}, ${fmtT.format(w.start)} IST` : 'On-demand, watch any time'}</p>
//           <div className="jn-line">
//             <span>1 seat</span>
//             <b>{money(w.price)}</b>
//           </div>
//           <ul className="jn-pts">
//             {w.seatsLeft != null && w.seatsLeft <= 20 && (
//               <li><span className="ic" aria-hidden="true">{Icons.lvl}</span><span><b>Limited seats</b>Only {w.seatsLeft} seats left</span></li>
//             )}
//             <li><span className="ic" aria-hidden="true">{Icons.clock}</span><span><b>{durTxt(w.duration)} {live ? 'live session' : 'of recordings'}</b>{w.level} level</span></li>
//             <li><span className="ic" aria-hidden="true">{Icons.cal}</span><span><b>Saved to My learning</b>{live ? 'Your join link unlocks there after you enroll.' : 'Your recordings unlock there after you enroll.'}</span></li>
//           </ul>
//         </div>

//                <div className="jn-right">
//           <div className="panel glass jn-card">
//             {step === 1 ? (
//               <>
//                 <h1 style={{ fontSize: '1.3rem', marginBottom: 14 }}>Enter your email</h1>
//                 <form className="form" onSubmit={onEmail} noValidate>
//                   <div role="alert">{alertBox}</div>
//                   <Field id="remail" label="" error={errors.email}>
//                     <input className="in" id="remail" type="email" autoComplete="email" aria-label="Email" value={d.email} onChange={setField('email')} aria-invalid={inv('email')} aria-describedby="remail-e" />
//                   </Field>
//                   <p className="muted" style={{ fontSize: '.72rem', marginTop: -6 }}>You will use this email to get your workshop updates.</p>
//                   <button className="btn btn-primary btn-block" type="submit">Continue</button>
//                   <p className="jn-note">By continuing, you agree to the workshop terms and privacy policy.</p>
//                 </form>
//                 <div className="jn-say">
//                   <Avatar person={w.instructor} large />
//                   <div className="jn-bub">I am excited to have you in the workshop! Once you enroll, you will get an email with next steps.</div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h1 style={{ fontSize: '1.3rem' }}>{paid ? 'Pay and enroll' : 'Confirm and enroll'}</h1>
//                 <p className="muted" style={{ fontSize: '.8rem', margin: '4px 0 14px' }}>
//                   {d.email} | <button type="button" className="linkbtn" onClick={() => { setStep(1); setFormErr(null); }}>not you?</button>
//                 </p>
//                 <form className="form" onSubmit={onPay} noValidate>
//                   <div role="alert">{alertBox}</div>
//                   {paid && (
//                     <>
//                       <Field id="cnum" label="Card number" error={errors.cnum}>
//                         <input className="in" id="cnum" inputMode="numeric" autoComplete="cc-number" placeholder="1234 1234 1234 1234" value={pay.cnum} onChange={(e) => setPay((s) => ({ ...s, cnum: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ') }))} aria-invalid={inv('cnum')} aria-describedby="cnum-e" />
//                       </Field>
//                       <div className="fr two">
//                         <Field id="cexp" label="Expiration date" error={errors.cexp}>
//                           <input className="in" id="cexp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" value={pay.cexp} onChange={(e) => { let x = e.target.value.replace(/\D/g, '').slice(0, 4); if (x.length > 2) x = x.slice(0, 2) + '/' + x.slice(2); setPay((s) => ({ ...s, cexp: x })); }} aria-invalid={inv('cexp')} aria-describedby="cexp-e" />
//                         </Field>
//                         <Field id="ccvc" label="Security code" error={errors.ccvc}>
//                           <input className="in" id="ccvc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={pay.ccvc} onChange={(e) => setPay((s) => ({ ...s, ccvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))} aria-invalid={inv('ccvc')} aria-describedby="ccvc-e" />
//                         </Field>
//                       </div>
//                     </>
//                   )}
//                   <Field id="rname" label="Full name" error={errors.name}>
//                     <input className="in" id="rname" autoComplete="name" value={d.name} onChange={setField('name')} aria-invalid={inv('name')} aria-describedby="rname-e" />
//                   </Field>
//                   <Field id="rphone" label="Mobile number" error={errors.phone}>
//                     <input className="in" id="rphone" type="tel" autoComplete="tel" placeholder="10-digit number" value={d.phone} onChange={setField('phone')} aria-invalid={inv('phone')} aria-describedby="rphone-e" />
//                   </Field>
//                   {paid && (
//                     <>
//                       <Field id="rcountry" label="Country or region" error="">
//                         <select id="rcountry" value={d.country} onChange={setField('country')}>
//                           {['India', 'United States', 'United Kingdom', 'United Arab Emirates', 'Singapore', 'Other'].map((c) => <option key={c}>{c}</option>)}
//                         </select>
//                       </Field>
//                       <Field id="raddr" label="Address" error="">
//                         <input className="in" id="raddr" autoComplete="street-address" value={d.address} onChange={setField('address')} />
//                       </Field>

//                       {promo.open ? (
//                         <div>
//                           <div style={{ display: 'flex', gap: 8 }}>
//                             <input className="in" placeholder="Promo code" aria-label="Promo code" value={promo.code} onChange={(e) => setPromo((p) => ({ ...p, code: e.target.value, applied: false, error: '' }))} />
//                             <button type="button" className="btn btn-ghost" onClick={applyPromo}>Apply</button>
//                           </div>
//                           <div className="err">{promo.error}</div>
//                           {promo.applied && <div className="muted" style={{ fontSize: '.78rem' }}>Promo applied: 10% off.</div>}
//                         </div>
//                       ) : (
//                         <button type="button" className="linkbtn" style={{ textAlign: 'left', fontSize: '.84rem' }} onClick={() => setPromo((p) => ({ ...p, open: true }))}>+ Apply promo code</button>
//                       )}

//                       <div className="jn-sum">
//                         <div><span>Subtotal ({money(w.price)} x 1 seat)</span><span>{money(w.price)}</span></div>
//                         {promo.applied && <div><span>Promo discount</span><span>-{money(w.price - total)}</span></div>}
//                         <div className="tot"><span>Total</span><span>{money(total)}</span></div>
//                       </div>
//                     </>
//                   )}
//                   <button className="btn btn-primary btn-block" type="submit" disabled={busy}>
//                     {busy ? <><Spinner />Processing</> : paid ? 'Pay and enroll' : 'Confirm free registration'}
//                   </button>
//                   {paid && <p className="jn-note">Demo payment form. No card is charged. Connect ILM ORA's payment gateway here.</p>}
//                 </form>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const COLORS = ['#f97316', '#16a34a', '#ffb27a', '#ffd166', '#2dd4bf'];
// const gcal = (w) => {
//   const f = (t) => new Date(t).toISOString().replace(/[-:]|\.\d{3}/g, '');
//   const end = w.start + w.duration * 60000;
//   return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(w.title)}&dates=${f(w.start)}/${f(end)}&details=${encodeURIComponent(`ILM ORA workshop with ${w.instructor.name}. Your join link is in My learning.`)}`;
// };

// function Confirmation({ slug }) {
//   const router = useRouter();
//   const { user, ready } = useApp();
//   const [w, setW] = useState(null);
//   const [reg, setReg] = useState(null);
//   const [error, setError] = useState(null);
//   const [pieces, setPieces] = useState([]);
//   const stage = useRef(null);
//   const ticket = useRef(null);

//   useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent(`/confirmation/${slug}`)}`); }, [ready, user, slug, router]);
//   useEffect(() => {
//     if (!ready || !user) return;
//     const r = api.myReg(slug);
//     if (!r) { router.replace(`/workshops/${slug}`); return; }
//     setReg(r);
//     api.get(slug).then(setW).catch(setError);
//   }, [ready, user, slug, router]);
//   useEffect(() => {
//     if (!w || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
//     setPieces(Array.from({ length: 60 }, (_, i) => ({ id: i, left: Math.random() * 100, color: COLORS[i % 5], dx: Math.random() * 200 - 100, dur: 2.2 + Math.random() * 2, delay: Math.random() * 0.6 })));
//     const t = setTimeout(() => setPieces([]), 5200);
//     return () => clearTimeout(t);
//   }, [w]);

//   if (error) return <StateBox title="We could not load your registration" text={error.message}><LinkBtn href="/dashboard">Go to my learning</LinkBtn></StateBox>;
//   if (!w || !reg) return <div className="wrap"><div className="skel" style={{ marginTop: 24, height: 340 }} /></div>;

//   const live = w.format === 'live';
//   const onMove = (e) => {
//     if (e.pointerType !== 'mouse') return;
//     const r = stage.current.getBoundingClientRect();
//     const t = ticket.current;
//     t.style.animation = 'none';
//     t.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 26 + 'deg');
//     t.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 20 + 'deg');
//   };
//   const onLeave = () => { ticket.current.style.setProperty('--ry', '-14deg'); ticket.current.style.setProperty('--rx', '8deg'); };

//   return (
//     <div className="wrap" style={{ textAlign: 'center', paddingTop: 26 }}>
//       {pieces.length > 0 && (
//         <div className="confetti" aria-hidden="true">
//           {pieces.map((p) => <i key={p.id} style={{ left: `${p.left}%`, background: p.color, '--dx': `${p.dx}px`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }} />)}
//         </div>
//       )}
//       <h1 style={{ fontSize: 'clamp(1.5rem,3.6vw,2.2rem)' }}>You are in, {(reg.name || user.name || 'learner').split(' ')[0]}.</h1>
//       <p className="lead muted" style={{ margin: '12px auto 0', maxWidth: '58ch' }}>A confirmation has been saved to your account. {live ? 'Your join link unlocks in My learning.' : 'Your recordings are ready to watch.'}</p>

//       <div className="ticketstage" ref={stage} onPointerMove={onMove} onPointerLeave={onLeave}>
//         <div className="ticket" ref={ticket}>
//           <div className="face" style={{ textAlign: 'left' }}>
//             <div className="top"><WorkshopArt w={w} /></div>
//             <div className="mid">
//               <h2 style={{ fontSize: '1.12rem' }}>{w.title}</h2>
//               <p className="muted" style={{ marginTop: 6 }}>with {w.instructor.name}</p>
//               <div className="meta" style={{ marginTop: 12, fontSize: '.92rem' }}>
//                 <span>{Icons.cal}{live ? fmtDL.format(w.start) : 'Watch any time'}</span>
//                 {live && <span>{Icons.clock}{fmtT.format(w.start)} IST</span>}
//                 <span>{Icons.clock}{durTxt(w.duration)}</span>
//               </div>
//             </div>
//             <div className="perf" />
//             <div className="bot">
//               <div>
//                 <div className="muted" style={{ fontSize: '.8rem' }}>Booking reference</div>
//                 <b style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '.06em' }}>{reg.id}</b>
//                 <div className="muted" style={{ fontSize: '.82rem', marginTop: 4 }}>{reg.paid ? `Paid ${money(reg.amount)}` : 'Free registration'}</div>
//               </div>
//               <div className="bars" aria-hidden="true" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
//         <LinkBtn href="/dashboard">Go to my learning</LinkBtn>
//         {live
//           ? <a className="btn btn-ghost" href={gcal(w)} target="_blank" rel="noopener noreferrer">Add to Google Calendar</a>
//           : <LinkBtn href={`/watch/${w.slug}`} ghost>Start watching</LinkBtn>}
//         <LinkBtn href="/catalog" ghost>Browse more workshops</LinkBtn>
//       </div>
//     </div>
//   );
// }

// function Row({ w, reg, onCancelled }) {
//   const { toast } = useApp();
//   const [link, setLink] = useState({ url: null, error: null, busy: false });
//   const [armed, setArmed] = useState(false);

//   const join = async () => {
//     setLink({ url: null, error: null, busy: true });
//     try { const a = await api.access(w.slug); setLink({ url: a.url, error: null, busy: false }); }
//     catch (e) { setLink({ url: null, error: e.message, busy: false }); }
//   };
//   const cancel = async () => {
//     if (!armed) { setArmed(true); setTimeout(() => setArmed(false), 4000); return; }
//     await api.cancel(w.slug);
//     invalidateWorkshops();
//     toast('Registration cancelled.', 'ok');
//     onCancelled();
//   };

//   return (
//     <article className="dcard glass">
//       <div className="art"><WorkshopArt w={w} /></div>
//       <div>
//         <div style={{ display: 'flex', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}><FormatBadge w={w} /></div>
//         <h2 style={{ fontSize: '1.02rem' }}><Link href={`/workshops/${w.slug}`} style={{ textDecoration: 'none' }}>{w.title}</Link></h2>
//         <p className="muted" style={{ marginTop: 4 }}>{w.format === 'live' ? `${fmtD.format(w.start)}, ${fmtT.format(w.start)} IST` : 'Watch any time'} {'\u2022'} with {w.instructor.name}</p>
//         <p className="muted" style={{ fontSize: '.85rem', marginTop: 4 }}>Reference {reg.id}</p>
//         <p className="muted" style={{ fontSize: '.8rem', marginTop: 4 }}>Certificate: issued after your completion is verified.</p>
//         <div style={{ marginTop: 10 }} aria-live="polite">
//           {link.url && <div className="linkbox"><a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a></div>}
//           {link.error && <div className="alert bad" role="alert">{link.error}</div>}
//         </div>
//       </div>
//       <div style={{ display: 'grid', gap: 8 }}>
//         {w.format === 'live'
//           ? <button type="button" className="btn btn-primary btn-sm" onClick={join} disabled={link.busy || Boolean(link.url)}>{link.url ? 'Join link shown' : 'Show join link'}</button>
//           : <LinkBtn href={`/watch/${w.slug}`} sm>Watch recordings</LinkBtn>}
//         <LinkBtn href={`/workshops/${w.slug}`} ghost sm>Details</LinkBtn>
//         <button type="button" className="btn btn-ghost btn-sm" onClick={cancel}>{armed ? 'Tap again to confirm' : 'Cancel registration'}</button>
//       </div>
//     </article>
//   );
// }

// function Dashboard() {
//   const router = useRouter();
//   const { user, ready } = useApp();
//   const { data, error, loading, reload } = useWorkshops();
//   const [tick, setTick] = useState(0);

//   useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent('/dashboard')}`); }, [ready, user, router]);

//   const rows = useMemo(() => {
//     if (!data || !user) return [];
//     return api.myRegs()
//       .map((reg) => ({ reg, w: data.find((x) => x.slug === reg.slug) }))
//       .filter((x) => x.w)
//       .sort((a, b) => (a.w.start || 1e15) - (b.w.start || 1e15));
//   }, [data, user, tick]); // eslint-disable-line react-hooks/exhaustive-deps

//   if (!ready || !user) return <div className="wrap" style={{ paddingTop: 36 }}><div className="dash"><Skeletons n={2} height={140} /></div></div>;
//   if (error) return <StateBox title="We could not load your workshops" text={error.message}><button type="button" className="btn btn-primary" onClick={reload}>Try again</button></StateBox>;

//   return (
//     <div className="wrap" style={{ paddingTop: 24 }}>
//       <h1 style={{ fontSize: 'clamp(1.5rem,3.6vw,2.2rem)' }}>My learning</h1>
//       <p className="lead muted">Signed in as {user.email}</p>
//       {loading ? <div className="dash"><Skeletons n={2} height={140} /></div>
//         : rows.length ? (
//           <div className="dash">{rows.map(({ reg, w }) => <Row key={reg.id} w={w} reg={reg} onCancelled={() => setTick((t) => t + 1)} />)}</div>
//         ) : (
//           <div className="state glass" style={{ marginTop: 30 }}>
//             <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><rect x="8" y="14" width="48" height="40" rx="6" /><path d="M8 26h48M22 8v10M42 8v10" /></svg>
//             <h2>No registered workshops yet</h2>
//             <p className="muted">Pick a workshop and it will appear here with your join link or recordings.</p>
//             <LinkBtn href="/catalog">Explore workshops</LinkBtn>
//           </div>
//         )}
//     </div>
//   );
// }

// /** Prototype player. Placeholder ki jagah backend ke signed URLs wala secure ILM ORA video player lagao. */
// function WatchPlayer({ slug }) {
//   const router = useRouter();
//   const { user, ready } = useApp();
//   const [data, setData] = useState({ w: null, access: null, error: null });
//   const [cur, setCur] = useState(0);
//   const [playing, setPlaying] = useState(false);
//   const [pct, setPct] = useState(0);

//   useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent(`/watch/${slug}`)}`); }, [ready, user, slug, router]);
//   useEffect(() => {
//     if (!ready || !user) return;
//     Promise.all([api.get(slug), api.access(slug)])
//       .then(([w, access]) => { if (access.type !== 'ondemand') router.replace(`/workshops/${slug}`); else setData({ w, access, error: null }); })
//       .catch((error) => setData({ w: null, access: null, error }));
//   }, [ready, user, slug, router]);
//   useEffect(() => {
//     if (!playing) return undefined;
//     const t = setInterval(() => setPct((p) => { if (p >= 100) { setPlaying(false); return 100; } return Math.min(100, p + 1.5); }), 250);
//     return () => clearInterval(t);
//   }, [playing]);

//   const { w, access, error } = data;
//   if (error) {
//     const forbidden = error.code === 403;
//     return (
//       <StateBox title={forbidden ? 'Registration required' : 'We could not open this content'} text={forbidden ? 'Recorded content is only available to registered learners.' : error.message}>
//         <LinkBtn href={`/workshops/${slug}`}>{forbidden ? 'Register for this workshop' : 'Back to workshop'}</LinkBtn>
//       </StateBox>
//     );
//   }
//   if (!w) return <div className="wrap"><div className="skel" style={{ marginTop: 24, height: 340 }} /></div>;

//   const pick = (i) => { setCur(i); setPct(0); setPlaying(false); };
//   return (
//     <div className="wrap">
//       <nav className="crumbs" aria-label="Breadcrumb"><Link href="/dashboard">My learning</Link> / <span aria-current="page">{w.title}</span></nav>
//       <div className="dgrid">
//         <div>
//           <div className="player">
//             <div className="bgp" style={{ position: 'absolute', inset: 0, opacity: 0.8 }}><WorkshopArt w={w} /></div>
//             <button type="button" className="btn btn-primary" onClick={() => setPlaying((p) => !p)} style={{ position: 'relative', borderRadius: '50%', width: 60, height: 60, padding: 0 }} aria-label={`${playing ? 'Pause' : 'Play'} lesson`}>
//               {playing
//                 ? <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
//                 : <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>}
//             </button>
//             <div className="ctrl">
//               <span style={{ fontWeight: 600, fontSize: '.9rem' }}>{access.lessons[cur].title}</span>
//               <div className="prog" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}><i style={{ width: `${pct}%` }} /></div>
//             </div>
//           </div>
//           <div className="panel glass" style={{ marginTop: 18 }}>
//             <h1 style={{ fontSize: '1.2rem' }}>{w.title}</h1>
//             <p className="muted" style={{ marginTop: 6 }}>Instructor: {w.instructor.name}</p>
//           </div>
//         </div>
//         <aside className="aside">
//           <div className="panel glass">
//             <h2 style={{ fontSize: '1rem', marginBottom: 10 }}>Modules</h2>
//             <ul className="lessons">
//               {access.lessons.map((l, i) => (
//                 <li key={l.id}><button type="button" onClick={() => pick(i)} aria-current={i === cur ? 'true' : undefined}><span>{l.title}</span><span className="muted">{l.mins} min</span></button></li>
//               ))}
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

// /* ---------------------------------------------------------------------
//    ROOT
//    --------------------------------------------------------------------- */
//    const COMPACT_CSS = `
// /* global spacing */
// .wk .wk-main{padding-bottom:24px}
// .wk .wk-main .wrap{--gx:clamp(12px,2.2vw,36px);max-width:1520px}
// .wk .wk-main .sec{margin-top:18px}
// .wk .wk-main .sechead{margin-bottom:10px}
// .wk .wk-main .sechead p{margin-top:2px}
// .wk .wk-main .grid{gap:12px}

// /* hero */
// .wk .wk-main .hero2{min-height:min(52vh,400px)}
// .wk .wk-main .hero3 .hero2-in{padding-top:28px;padding-bottom:16px;gap:20px}
// .wk .wk-main .hero3 .hv-stage{max-width:460px}
// .wk .wk-main .hero2-stats{padding:8px 0 10px}
// .wk .wk-main .hero2 h1{font-size:clamp(1.4rem,3.6vw,2.2rem)}

// /* explore your learning journey (cinematic cards) */
// .wk .wk-main .cj{padding:12px 0 22px}
// .wk .wk-main .cj-track{gap:16px}
// .wk .wk-main .cj-card{width:min(400px,78vw);aspect-ratio:16/9;border-radius:16px}
// .wk .wk-main .cj-in{padding:14px 16px;gap:6px;max-width:72%}
// .wk .wk-main .cj-card h3{font-size:clamp(.95rem,1.6vw,1.15rem)}
// .wk .wk-main .cj-card p{font-size:.74rem;line-height:1.4}
// @media(max-width:640px){
//   .wk .wk-main .cj-card{aspect-ratio:16/10;width:min(320px,84vw)}
//   .wk .wk-main .cj-in{max-width:100%;justify-content:flex-end}
// }

// /* roadmap (day-wise) */
// .wk .wk-main .jv{margin-top:10px}
// .wk .wk-main .jv-list{gap:10px}
// .wk .wk-main .jv-art{aspect-ratio:16/7}
// .wk .wk-main .jv-body{padding:9px 11px 11px;gap:5px}
// .wk .wk-main .jv-body h3{font-size:.92rem}
// .wk .wk-main .jv-no{left:9px;bottom:9px;font-size:.78rem;letter-spacing:.04em;line-height:1;padding:4px 10px;border-radius:999px;background:var(--brand);text-shadow:none}
// .wk .wk-main .jv-step.done .jv-no{background:var(--accent)}
// .wk .wk-main .jv-chip{font-size:.7rem;padding:3px 9px}

// /* tools marquee */
// .wk .wk-main .tools-marquee{margin-top:8px;padding:6px 0 10px}
// .wk .wk-main .tools-track{gap:12px}
// .wk .wk-main .tool{flex:0 0 150px;min-height:104px;padding:12px 10px;gap:8px;font-size:.85rem;border-radius:14px}
// .wk .wk-main .tool img{width:84px!important;height:48px!important}
// @media(max-width:640px){
//   .wk .wk-main .tool{flex-basis:124px;min-height:90px}
//   .wk .wk-main .tool img{width:64px!important;height:38px!important}
// }

// /* pricing, experience, certificate */
// .wk .wk-main .price-card{padding:16px 20px;gap:12px}
// .wk .wk-main .xp{gap:10px}
// .wk .wk-main .xp-card,.wk .wk-main .xp-btn{min-height:130px}
// @media(max-width:640px){.wk .wk-main .xp-card,.wk .wk-main .xp-btn{min-height:150px}}
// .wk .wk-main .cert{padding:12px 16px;gap:14px}
// .wk .wk-main .cert-frame{max-width:250px}
// .wk .wk-main .cert-list{margin:8px 0 10px;gap:6px}

// /* mentors */
// .wk .wk-main .mentors{max-width:900px;margin-left:auto;margin-right:auto;gap:12px}
// .wk .wk-main .mentor{padding:8px;gap:2px}
// .wk .wk-main .mentor .ph{aspect-ratio:1/1;margin-bottom:6px;border-radius:8px}
// .wk .wk-main .mentor h3{font-size:.88rem}
// .wk .wk-main .mentor .org{margin-top:5px;padding-top:5px}
// .wk .wk-main .mentors>.wkrv{height:100%}

// /* gallery: uniform tiles */
// .wk .wk-main .gal{display:grid;columns:auto;grid-template-columns:repeat(2,1fr);gap:8px}
// @media(min-width:800px){.wk .wk-main .gal{grid-template-columns:repeat(3,1fr)}}
// .wk .wk-main .gal figure{margin:0;aspect-ratio:16/10}
// .wk .wk-main .gal img{height:100%;object-fit:cover}

// /* bands (corporate + final CTA) */
// .wk .wk-main .band img{width:100%;height:100%;max-height:240px;object-fit:cover}
// .wk .wk-main .band-in{padding:16px 20px}
// .wk .wk-main .band .cert-act{margin-top:12px}
// .wk .wk-main .nl{margin:10px 0;padding:14px 18px}

// /* journey cards: reference style (day, live, time, projects inside) */
// .wk .wk-main .cj-card{width:min(600px,88vw);aspect-ratio:16/10;border-radius:16px}
// .wk .wk-main .cj-in{max-width:66%;gap:5px;padding:16px 18px;justify-content:center}
// .wk .wk-main .cj-top{flex-wrap:wrap;font-size:.64rem;gap:6px}
// .wk .wk-main .cj-top .t{color:rgba(255,255,255,.75);font-weight:600}
// .wk .wk-main .cj-top .tg.live{display:inline-flex;align-items:center;gap:5px;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.35)}
// .wk .wk-main .cj-top .tg.live i{width:6px;height:6px;border-radius:50%;background:#ff4d6d}
// .wk .wk-main .cj-top .tg.sp{background:var(--accent)}
// .wk .wk-main .cj-card h3{font-size:clamp(.98rem,1.8vw,1.2rem)}
// .wk .wk-main .cj-card p{font-size:.72rem;line-height:1.4}
// .wk .cj-ph{color:#fff;font-size:.74rem;margin-top:3px}
// .wk .cj-pl{list-style:none;margin:0;padding:0;display:grid;gap:4px}
// .wk .cj-pl li{position:relative;padding-left:14px;font-size:.68rem;line-height:1.3}
// .wk .cj-pl li::before{content:"\\2713";position:absolute;left:0;color:#ffb27a;font-weight:800}
// .wk .cj-pl b{display:block;color:#fff;font-size:.72rem}
// .wk .cj-pl span{color:rgba(255,255,255,.75)}
// @media(max-width:640px){
//   .wk .wk-main .cj-card{aspect-ratio:4/5;width:min(330px,88vw)}
//   .wk .wk-main .cj-in{max-width:100%;justify-content:flex-end}
// }

// /* roadmap cards: days + projects always visible */
// .wk .wk-main .jv-days{display:grid;gap:8px}
// .wk .wk-main .jv-d{display:grid;gap:3px;padding-top:6px;border-top:1px dashed var(--ln)}
// .wk .wk-main .jv-d:first-child{border-top:0;padding-top:0}
// .wk .wk-main .jv-dt{display:flex;flex-wrap:wrap;gap:4px 6px;align-items:center;font-size:.62rem}
// .wk .wk-main .jv-dt b{color:var(--brand);font-weight:800}
// .wk .wk-main .jv-dt .lv{padding:1px 6px;border-radius:999px;background:#ff4d6d;color:#fff;font-weight:800}
// .wk .wk-main .jv-dt .sp{padding:1px 6px;border-radius:999px;background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--ok);font-weight:800}
// .wk .wk-main .jv-dt em{font-style:normal;color:var(--muted);font-weight:600}
// .wk .wk-main .jv-dn{font-size:.76rem;font-weight:700;line-height:1.25}
// .wk .wk-main .jv-d ul{list-style:none;margin:2px 0 0;padding:0;display:grid;gap:3px}
// .wk .wk-main .jv-d li{position:relative;padding-left:13px;font-size:.68rem;line-height:1.3}
// .wk .wk-main .jv-d li::before{content:"\\2713";position:absolute;left:0;color:var(--ok);font-weight:800}
// .wk .wk-main .jv-d li b{display:block;font-size:.7rem}
// .wk .wk-main .jv-d li span{color:var(--muted)}

// /* always-visible bottom bar (all screens) */
// .wk .stickybar.gsbar{display:block;padding:0;background:var(--solid);border-top:1px solid var(--ln);box-shadow:0 -4px 16px rgba(0,0,0,.08)}
// .wk .gsbar-in{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;max-width:1520px;margin:0 auto;padding:10px clamp(14px,3vw,36px) calc(10px + env(safe-area-inset-bottom,0px))}
// .wk .gsbar-price b{font-size:1.15rem;font-weight:800}
// .wk .gsbar-price s{margin-left:8px;font-size:.8rem;color:var(--muted)}
// .wk .gsbar-btn{background:#2d1250;box-shadow:none;border-radius:8px;padding:8px 18px;min-height:38px}
// .wk .gsbar-btn:hover{background:#3d1a6a;box-shadow:none;transform:none}
// /* bar ke peeche content na chhupe */
// .wk .wk-main{padding-bottom:72px}

// /* FAQ: left heading, right list with + icons */
// .wk .faq2{display:grid;gap:18px;padding:clamp(14px,3vw,28px) 0}
// @media(min-width:800px){.wk .faq2{grid-template-columns:minmax(0,.8fr) minmax(0,1.6fr);gap:48px;align-items:start}}
// .wk .faq2-h{font-size:clamp(1.5rem,3.2vw,2.3rem);font-weight:600;line-height:1.2;letter-spacing:-.02em;max-width:9em}
// .wk .faq2-list{display:grid}
// .wk .faq2 details{border-bottom:1px solid var(--ln)}
// .wk .faq2 summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px;padding:16px 2px;font-size:.88rem;font-weight:500}
// .wk .faq2 summary::-webkit-details-marker{display:none}
// .wk .faq2 summary::marker{content:""}
// .wk .faq2 summary::after{content:"+";flex:none;font-size:1.5rem;font-weight:300;line-height:1;color:var(--muted);transition:transform .25s}
// .wk .faq2 details[open] summary::after{transform:rotate(45deg)}
// .wk .faq2 details p{padding:0 2px 16px;color:var(--muted);font-size:.84rem;max-width:62ch}

// /* ===== NO-CROP IMAGES + SMALLER CARDS + WOW ===== */

// /* 1. Journey cards (text left, full image right, nothing cut) */
// .wk .wk-main .cj-card{width:min(520px,86vw);aspect-ratio:16/9;border-radius:16px;background:linear-gradient(135deg,#14141f,#0b0b10);border:1px solid rgba(249,115,22,.35);box-shadow:0 14px 34px rgba(8,8,14,.34),0 0 0 1px rgba(255,255,255,.04) inset}
// .wk .wk-main .cj-card img{left:auto;right:0;width:44%;height:100%;object-fit:contain;object-position:center;background:#0b0b10}
// .wk .wk-main .cj-card::before{background:linear-gradient(90deg,rgba(11,11,16,.97) 0%,rgba(11,11,16,.9) 54%,rgba(11,11,16,0) 62%)}
// .wk .wk-main .cj-in{max-width:58%;padding:12px 14px;gap:4px}
// .wk .wk-main .cj-card h3{font-size:clamp(.9rem,1.5vw,1.05rem)}
// .wk .wk-main .cj-card p{font-size:.68rem;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}
// .wk .wk-main .cj-pl li{font-size:.64rem}
// .wk .wk-main .cj-pl b{font-size:.68rem}
// @media(max-width:640px){
//   .wk .wk-main .cj-card{aspect-ratio:auto;min-height:300px;width:min(300px,86vw)}
//   .wk .wk-main .cj-card img{width:100%;height:46%;top:0;right:0}
//   .wk .wk-main .cj-card::before{background:linear-gradient(0deg,rgba(11,11,16,.98) 0%,rgba(11,11,16,.92) 56%,rgba(11,11,16,0) 62%)}
//   .wk .wk-main .cj-in{max-width:100%;top:auto;height:56%;justify-content:flex-start}
// }

// /* 2. Workshop cards, tiles, banners: full image on dark backdrop */
// .wk .art{background:linear-gradient(135deg,#14141f,#0b0b10)}
// .wk .art img{object-fit:contain!important}
// .wk .art::after{display:none}
// .wk .banner{background:linear-gradient(135deg,#14141f,#0b0b10)}
// .wk .banner img{object-fit:contain!important}
// .wk .tile{background:linear-gradient(135deg,#14141f,#0b0b10)}
// .wk .tile img{object-fit:contain!important;height:70%}
// .wk .jv-art{background:#0b0b10}
// .wk .jv-art img{object-fit:contain!important}
// .wk .xp-btn{background:linear-gradient(135deg,#14141f,#0b0b10)}
// .wk .xp-btn img,.wk .xp-btn video{object-fit:contain!important}
// .wk .hv-f{background:#0b0b10}
// .wk .hv-f img,.wk .hv-f video{object-fit:contain!important}
// .wk .mq-logo img,.wk .tool img{object-fit:contain!important}

// /* 3. Mentors: natural image height, compact */
// .wk .wk-main .mentors{max-width:760px;gap:10px}
// .wk .wk-main .mentor{padding:6px;border-radius:12px}
// .wk .wk-main .mentor .ph{aspect-ratio:auto!important;background:#0b0b10;border-radius:8px;margin-bottom:6px}
// .wk .wk-main .mentor .ph img{height:auto!important;width:100%;object-fit:contain!important}
// .wk .wk-main .mentor h3{font-size:.82rem}
// .wk .wk-main .mentor .role{font-size:.7rem}
// .wk .wk-main .mentor .org{font-size:.7rem;margin-top:4px;padding-top:4px}

// /* 4. Gallery: masonry with natural heights (no cropping) */
// .wk .wk-main .gal{display:block;columns:2;column-gap:8px}
// @media(min-width:800px){.wk .wk-main .gal{columns:4}}
// .wk .wk-main .gal figure{aspect-ratio:auto;margin:0 0 8px;border-radius:10px}
// .wk .wk-main .gal img{height:auto;object-fit:contain}

// /* 5. Corporate + final CTA bands */
// .wk .wk-main .band{background:linear-gradient(135deg,#14141f,#0b0b10)}
// .wk .wk-main .band img{max-height:220px;height:auto;width:100%;object-fit:contain;background:#0b0b10}
// .wk .wk-main .band h2,.wk .wk-main .band p{color:#fff}
// .wk .wk-main .band p{opacity:.8}

// /* 6. Smaller grid cards */
// .wk .grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
// .wk .row .card{flex-basis:min(210px,74vw)}
// .wk .cbody{padding:8px 10px 10px;gap:4px}
// .wk .cbody p.sd{font-size:.74rem}
// .wk .tiles{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
// .wk .row .tile{flex-basis:min(170px,56vw)}
// .wk .wk-main .cert-frame{max-width:210px}

// /* 7. WOW: gradient borders, glow, lift */
// .wk .card,.wk .mentor,.wk .fb,.wk .opt,.wk .pain>div,.wk .tool,.wk .xp-btn{transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,border-color .35s}
// .wk .card:hover,.wk .mentor:hover,.wk .fb:hover,.wk .pain>div:hover{transform:translateY(-5px);border-color:var(--brand);box-shadow:0 16px 34px color-mix(in srgb,var(--brand) 24%,rgba(20,10,0,.2)),0 0 0 1px color-mix(in srgb,var(--brand) 45%,transparent)}
// .wk .card.featured{box-shadow:0 0 0 1px var(--brand),0 10px 26px color-mix(in srgb,var(--brand) 28%,transparent)}
// .wk .cj-card:hover{border-color:var(--brand);box-shadow:0 20px 44px rgba(8,8,14,.5),0 0 28px rgba(249,115,22,.35)}
// .wk .wk-main .sechead h2,.wk .wk-main h2.h-xl{background:linear-gradient(90deg,var(--text),color-mix(in srgb,var(--brand) 70%,var(--text)));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
// .wk .btn-primary{background-size:200% 100%;transition:background-position .4s,transform .18s,box-shadow .2s}
// .wk .btn-primary:hover{background-position:100% 0}
// .wk .gsbar-btn{background:#2d1250}

// /* ===== FIXES ===== */

// /* 1. Experience videos: no side bars */
// .wk .wk-main .xp-btn{background:#111}
// .wk .wk-main .xp-btn img,.wk .wk-main .xp-btn video{object-fit:cover!important}

// /* 2. Mentors: full width, 4 equal cards */
// .wk .wk-main .mentors{max-width:none;margin:6px 0 0;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
// @media(max-width:900px){.wk .wk-main .mentors{grid-template-columns:repeat(2,minmax(0,1fr))}}
// .wk .wk-main .mentor{height:100%;padding:8px}
// .wk .wk-main .mentor .ph{aspect-ratio:4/5!important;background:#1a1a22}
// .wk .wk-main .mentor .ph img{height:100%!important;width:100%;object-fit:cover!important;object-position:50% 20%}

// /* 3. Corporate / final CTA band: image fills, text visible */
// .wk .wk-main .band{background:linear-gradient(135deg,#14141f,#0b0b10);align-items:stretch}
// .wk .wk-main .band img{height:100%;max-height:260px;min-height:180px;object-fit:cover;object-position:50% 40%;background:none}
// .wk .wk-main .band .btn-ghost{color:#fff;border-color:rgba(255,255,255,.55)}
// .wk .wk-main .band .btn-ghost:hover{background:rgba(255,255,255,.14);border-color:#fff}

// /* 4. Workshop cards: image fills, teaser fills the row */
// .wk .art img{object-fit:cover!important}
// .wk .grid.teaser{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
// @media(max-width:900px){.wk .grid.teaser{grid-template-columns:repeat(2,minmax(0,1fr))}}
// @media(max-width:560px){.wk .grid.teaser{grid-template-columns:1fr}}
// .wk .grid.teaser .card.featured{box-shadow:var(--shadow);border-color:var(--ln)}
// .wk .grid.teaser .art{aspect-ratio:16/8}
// .wk .grid.teaser .art img{object-fit:cover!important}

// /* gallery: single moving row */
// .wk .gal-i{position:relative;flex:0 0 min(300px,72vw);margin:0;aspect-ratio:16/10;border-radius:12px;overflow:hidden;background:#111;box-shadow:var(--shadow);transition:transform .3s,box-shadow .3s}
// .wk .gal-i img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1);-webkit-user-drag:none}
// .wk .gal-i:hover{transform:translateY(-4px);box-shadow:0 14px 30px color-mix(in srgb,var(--brand) 26%,rgba(20,10,0,.2))}
// .wk .gal-i:hover img{transform:scale(1.06)}
// .wk .gal-i figcaption{position:absolute;left:0;right:0;bottom:0;padding:16px 10px 7px;color:#fff;font-size:.72rem;font-weight:600;background:linear-gradient(0deg,rgba(8,8,14,.78),transparent)}

// /* ===== BANDS: image full (no crop), text centered ===== */
// .wk .wk-main .band{display:grid;grid-template-columns:1fr;align-items:center;background:linear-gradient(135deg,#14141f,#0b0b10)}
// @media(min-width:760px){.wk .wk-main .band{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
// .wk .wk-main .band img{width:100%;height:auto!important;max-height:none!important;min-height:0!important;object-fit:contain;display:block;background:none;align-self:center}
// .wk .wk-main .band-in{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:6px;padding:16px 22px;min-width:0}
// .wk .wk-main .band h2{font-size:clamp(1rem,1.8vw,1.3rem);margin:0}
// .wk .wk-main .band p{font-size:.84rem;margin:0}
// .wk .wk-main .band .cert-act{margin-top:10px;gap:8px}
// .wk .wk-main .band .btn-lg{min-height:36px;padding:6px 16px;font-size:.82rem}
// .wk .wk-main .band{min-height:0!important}
// section .band[style]{min-height:0!important}

// /* ===== MENTORS: compact cards like reference ===== */
// .wk .wk-main .mentors{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;max-width:none;margin:8px 0 0}
// .wk .wk-main .mentors>.wkrv{flex:0 0 168px;width:168px;height:auto}
// @media(max-width:560px){.wk .wk-main .mentors>.wkrv{flex-basis:calc(50% - 6px);width:calc(50% - 6px)}}
// .wk .wk-main .mentor{padding:8px;border-radius:12px;gap:0;height:100%}
// .wk .wk-main .mentor .ph{aspect-ratio:1/1!important;border-radius:8px;margin-bottom:7px;background:#1a1a22}
// .wk .wk-main .mentor .ph img{width:100%;height:100%!important;object-fit:cover!important;object-position:50% 22%}
// .wk .wk-main .mentor h3{font-size:.8rem;line-height:1.2}
// .wk .wk-main .mentor .role{font-size:.68rem;min-height:0}
// .wk .wk-main .mentor .org{margin-top:6px;padding-top:6px;font-size:.68rem}

// /* ===== MENTORS: full-row, equal cards, brand colors ===== */
// .wk .wk-main .mentors{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;justify-content:stretch;max-width:none;margin:10px 0 0}
// @media(max-width:900px){.wk .wk-main .mentors{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}}
// .wk .wk-main .mentors>.wkrv{flex:none;width:auto;height:100%}
// .wk .wk-main .mentor{padding:12px;border-radius:14px;height:100%;background:#fcfcfb}
// .wk .wk-main .mentor .ph{aspect-ratio:1/1!important;border-radius:10px;margin-bottom:10px;background:#1a1a22}
// .wk .wk-main .mentor .ph img{width:100%;height:100%!important;object-fit:cover!important;object-position:50% 20%}
// .wk .wk-main .mentor h3{font-size:.98rem;font-weight:800;line-height:1.2}
// .wk .wk-main .mentor .role{font-size:.8rem;margin-top:2px}
// .wk .wk-main .mentor .org{margin-top:10px;padding-top:9px;border-top:1px dashed var(--ln);font-size:1rem;font-weight:800;letter-spacing:.03em}
// .wk .mentor .ilm-g{color:#16a34a}
// .wk .mentor .ora-o{color:#f97316}

// /* ===== text on background -> white card ===== */
// .wk .wk-main .sechead{align-items:center;background:var(--solid);border:1px solid var(--ln);border-radius:14px;padding:12px 16px;box-shadow:var(--shadow);margin-bottom:12px}
// .wk .wk-main .sechead p{max-width:70ch}
// .wk .wk-main .sechead .btn{flex:none}

// /* FAQ in white card */
// .wk .faq2{background:var(--solid);border:1px solid var(--ln);border-radius:16px;box-shadow:var(--shadow);padding:clamp(16px,3vw,28px)}

// /* certificate note inside dark band */
// .wk .wk-main .band .cert-note{color:rgba(255,255,255,.7);font-size:.7rem;margin-top:8px;max-width:60ch}
// .wk .wk-main .band .btn[disabled]{color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.3)}

// /* white cards for loose text */
// .wk .textcard{margin-top:12px;padding:14px 18px;background:var(--solid);border:1px solid var(--ln);border-radius:14px;box-shadow:var(--shadow)}
// .wk .countpill{display:inline-block;margin-top:14px;padding:6px 14px;background:var(--solid);border:1px solid var(--ln);border-radius:999px;box-shadow:var(--shadow);font-size:.82rem;font-weight:600;color:var(--text)}
// .wk .jn-info.panel{padding:16px;color:var(--text)}
// .wk .jn-info.panel h1,.wk .jn-info.panel .jn-sub,.wk .jn-info.panel .jn-line,.wk .jn-info.panel .jn-pts li{color:var(--text)}
// .wk .jn-info.panel .jn-sub{color:var(--muted)}
// .wk .jn-info.panel .banner{border-radius:12px}
// .wk .jn-pts li{background:color-mix(in srgb,var(--text) 4%,transparent);padding:8px 10px;border-radius:10px}

// /* heading brand colors (gradient text override) */
// .wk .wk-main h2.wl-title{background:none;-webkit-text-fill-color:initial;color:var(--text)}
// .wk .wl-title .wl-ilm{color:#16a34a;-webkit-text-fill-color:#16a34a}
// .wk .wl-title .wl-ora{color:#f97316;-webkit-text-fill-color:#f97316}
// .wk .wl-heart{display:inline-block;width:24px;height:24px;vertical-align:-4px;margin:0 2px}
// .wk .wk-main h2.wl-title{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
// .wk .wl-title .wl-ilm,.wk .wl-title .wl-ora{display:inline}

// /* mentors: same width, shorter height */
// .wk .wk-main .mentor{padding:8px;border-radius:12px}
// .wk .wk-main .mentor .ph{aspect-ratio:16/10!important;margin-bottom:6px;border-radius:8px}
// .wk .wk-main .mentor .ph img{object-position:50% 18%}
// .wk .wk-main .mentor h3{font-size:.86rem}
// .wk .wk-main .mentor .role{font-size:.72rem}
// .wk .wk-main .mentor .org{margin-top:6px;padding-top:6px;font-size:.84rem}

// /* mentors: head must not be cut */
// .wk .wk-main .mentor .ph{aspect-ratio:4/3!important}
// .wk .wk-main .mentor .ph img{object-fit:cover!important;object-position:50% 0%!important}

// /* mentors: moving row */
// .wk .row .mentor-i{flex:0 0 min(250px,70vw);min-width:0;height:auto}
// .wk .mentor-i .ph img{-webkit-user-drag:none}
// /* video feedback cards */
// .wk .fb-vid{aspect-ratio:16/10}
// .wk .fb-vid img{object-fit:cover}
// .wk .fb-vid::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.55),transparent 55%)}
// .wk .fb-play{z-index:1;transition:transform .25s}
// .wk .fb-vid:hover .fb-play{transform:scale(1.12)}
// .wk .fb-watch{position:absolute;left:10px;bottom:8px;z-index:1;padding:3px 10px;border-radius:999px;font-size:.66rem;font-weight:800;color:#fff;background:rgba(10,12,30,.72);backdrop-filter:blur(6px)}
// @media(max-width:520px){.wk .wk-main h2.wl-title{white-space:normal}}

// /* registration: equal cards */
// .wk .jn{align-items:stretch;max-width:1000px}
// .wk .jn-info.panel,.wk .jn-right,.wk .jn-right .jn-card{height:100%}
// .wk .jn-right{display:flex;flex-direction:column}
// .wk .jn-right .jn-card{flex:1;margin:0}
// .wk .jn-info.panel{margin:0}
// `;


// const TITLES = {
//   workshops: ['Explore Workshops | ILM ORA', 'Browse live and on-demand workshops in AI, development, design, marketing, business and leadership. Search, filter and register in minutes.'],
//      feedback: ['Learner feedback | ILM ORA', 'Real feedback and video testimonials from ILM ORA workshop learners.'],
//   catalog: ['All Workshops | ILM ORA', 'Browse every live and on-demand ILM ORA workshop. Search, filter and register in minutes.'],
//   dashboard: ['My learning | ILM ORA', 'Your registered workshops, join links and recordings.'],
//   login: ['Sign in | ILM ORA', 'Sign in or create your ILM ORA account to register for workshops.'],
//   register: ['Register for a workshop | ILM ORA', ''],
//   confirmation: ['You are registered | ILM ORA', ''],
//   watch: ['Watch workshop | ILM ORA', ''],
// };

// /** #/login?next=... aate hi site ka login popup kholta hai (in-page form nahi). */
// function LoginRoute() {
//   const { user, ready, requireLogin } = useApp();
//   const sp = useSearchParams();
//   const next = safeNext(sp.get('next'));
//   useEffect(() => {
//     if (!ready) return;
//     if (user) { replaceRoute(next); return; }
//     const m = /^\/(?:register|confirmation|watch)\/([^/?#]+)/.exec(next);
//     requireLogin(next, m ? `/workshops/${m[1]}` : '/workshops');
//   }, [ready, user, next, requireLogin]);
//   return null;
// }

// function Screen({ route }) {
//   const [a, slug] = route.parts;
//   if (a === 'workshops' && slug) return <WorkshopDetail slug={slug} />;
//   if (a === 'register' && slug) return <RegisterFlow slug={slug} />;
//   if (a === 'confirmation' && slug) return <Confirmation slug={slug} />;
//   if (a === 'watch' && slug) return <WatchPlayer slug={slug} />;
//   if (a === 'dashboard') return <Dashboard />;
//   if (a === 'login') return <LoginRoute />;
//     if (a === 'catalog') return <Catalog />;
//   if (a === 'feedback') return <FeedbackPage />;
//   if (!a || a === 'workshops') return <Home />;
//   return <StateBox title="We could not find that page" text="The link may be old or mistyped."><LinkBtn href="/catalog">Browse workshops</LinkBtn></StateBox>;
// }

// function WorkshopsApp({ openLogin, initialParts }) {
//   const route = usePathRoute(initialParts);
//   const mainRef = useRef(null);
//   const key = route.parts.join('/');
//   const first = route.parts[0] || 'workshops';

//   useEffect(() => {
//     const t = TITLES[first] || TITLES.workshops;
//     if (!(first === 'workshops' && route.parts[1])) setPageMeta(t[0], t[1]); // detail page apna title khud set karta hai
//     window.scrollTo({ top: 0 });
//     if (mainRef.current) mainRef.current.focus({ preventScroll: true });
//   }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <RouteCtx.Provider value={route}>
//       <div className="wk">
//         <style dangerouslySetInnerHTML={{ __html: WK_CSS }} />
//                 <style dangerouslySetInnerHTML={{ __html: GS_CSS }} />
//         <style dangerouslySetInnerHTML={{ __html: COMPACT_CSS }} />
//         <AppProviders openLogin={openLogin}>
//           <div className="wk-main" id="wk-main" tabIndex={-1} ref={mainRef}>
//             {CONFIG.USE_MOCK && <div className="notice" role="note">Preview mode: sample workshops, sign-in and payment are simulated.</div>}
//             <Screen route={route} />
//           </div>
//         </AppProviders>
//       </div>
//     </RouteCtx.Provider>
//   );
// }

// /**
//  * Full page: PublicLayout (Navbar + Footer) + .ilm theme wrapper + workshops app.
//  * Props router/page se aate hain (Ilmora-Microsoft / StudyAbroad / Careers jaise).
//  * Prop na mile to page apni theme state se chalta hai. `embedded` dene par sirf content render hota hai.
//  */
// export default function IlmoraWorkshops({ theme: themeProp, toggleTheme: toggleProp, setShowLoginModal, scrollToSection, embedded = false, initialParts }) {
//   const [localTheme, setLocalTheme] = useState('light');
//   useEffect(() => {
//     try { const t = window.localStorage.getItem('theme') || window.localStorage.getItem('ilmora-theme'); if (t) setLocalTheme(t); } catch {}
//   }, []);
//   const theme = themeProp ?? localTheme;
//   const toggleTheme = toggleProp ?? (() => {
//     const n = localTheme === 'dark' ? 'light' : 'dark';
//     setLocalTheme(n);
//     try { window.localStorage.setItem('theme', n); } catch {}
//   });
//   const openLogin = setShowLoginModal ?? (() => { window.location.href = '/onboarding'; });
//   const scrollTo = scrollToSection ?? ((id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

//   if (embedded) return <WorkshopsApp openLogin={openLogin} initialParts={initialParts} />;
//   return (
//     <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={openLogin} scrollToSection={scrollTo}>
//       <style dangerouslySetInnerHTML={{ __html: HOST_CSS }} />
//       <div className={"ilm" + (theme === "dark" ? " dark" : "")}>
//       <WorkshopsApp openLogin={openLogin} initialParts={initialParts} />
//       </div>
//     </PublicLayout>
//   );
// }




















"use client";
/**
 * ILM ORA Workshops: ek hi self-contained page component.
 *
 *   src/legacy-pages/Landing/Ilmora-workshops.jsx   (yehi file, koi nayi file nahi)
 *   app/(public)/Ilmora-workshops/client.jsx        renders <IlmoraWorkshops {...props} />
 *   app/(public)/Ilmora-workshops/page.jsx          metadata + <Client />
 *
 * Page ke andar navigation URL hash se hota hai:
 *   #/workshops              listing           #/dashboard         registered workshops
 *   #/workshops/<slug>       details           #/watch/<slug>      on-demand modules
 *   #/register/<slug>        registration      #/login             sign in / sign up
 *   #/confirmation/<slug>    confirmation
 *
 * IMAGES: src/assets/Workshop/ ke 10 real images neeche IMAGE IMPORTS mein hain.
 * Agar aapki files .jpg / .jpeg / .webp hain to sirf imports ka extension badal do.
 * Sabhi page sections IMG / MEDIA / TEAM / GALLERY / JOURNEY config se chalte hain.
 *
 * INTEGRATION: CONFIG block dekho. Real backend ke liye USE_MOCK = false karo.
 * Saare styles .wk ke andar scoped hain, isliye baaki pages affect nahi hote.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

// Same shared shell (AnnouncementBanner, Navbar, Footer) jo baaki Ilmora-* pages use karte hain.
import PublicLayout from "../Landing/components/PublicLayout";

/* ====================================================================
   IMAGE IMPORTS  (src/assets/Workshop)
   Extension .png assume kiya hai. Agar file .jpg / .webp hai to yahan badal do.
   ==================================================================== */
import imgCoding from '../../assets/Workshop/Focused Coding Workshop.webp';
import imgCeo from '../../assets/Workshop/ILM ORA CEO Corporate Profile.webp';
import imgDirector from '../../assets/Workshop/ILM ORA Corporate Portrait Banner.webp';
import imgCorp from '../../assets/Workshop/ILM ORA Corporate Training Workshop.webp';
import imgCertFull from '../../assets/Workshop/ILM ORA Full Stack Certificate.webp';
import imgJavaCelebration from '../../assets/Workshop/ILM ORA Java Workshop Celebration.webp';
import imgJavaLive from '../../assets/Workshop/ILM ORA Java Workshop Live.webp';
import imgCelebration from '../../assets/Workshop/ILM ORA Workshop Celebration.webp';
import imgInstructor from '../../assets/Workshop/ILM ORA Workshop Instructor Portrait.webp';
import imgCertCeremony from '../../assets/Workshop/Java Workshop Certificate Ceremony.webp';
import logo0 from '../../assets/Workshop/Logo/01_Claude.webp';
import logo1 from '../../assets/Workshop/Logo/02_Make.webp';
import logo2 from '../../assets/Workshop/Logo/03_Magnific_AI.webp';
import logo3 from '../../assets/Workshop/Logo/04_Runway.webp';
import logo4 from '../../assets/Workshop/Logo/05_Luma_AI.webp';
import logo5 from '../../assets/Workshop/Logo/06_Topaz_Labs.webp';
import logo6 from '../../assets/Workshop/Logo/07_DaVinci_Resolve.webp';
import logo7 from '../../assets/Workshop/Logo/08_Midjourney.webp';
import logo8 from '../../assets/Workshop/Logo/09_Perplexity.webp';
import mentorShibli from '../../assets/Workshop/Mentor/M Shibli.webp';
import mentorShareef from '../../assets/Workshop/Mentor/Shareef.webp';
import mentorRaghib from '../../assets/Workshop/Mentor/Raghib.webp';
import mentorVishesh from '../../assets/Workshop/Mentor/Vishesh.webp';
import mentorPrachi from '../../assets/Workshop/Mentor/Prachi Sharan.webp';
import mentorYash from '../../assets/Workshop/Mentor/Yash Kumar.webp';
import cineCoding from '../../assets/Workshop/ILM_ORA_Cinematic_Video_Images_WebP/01_student_coding.webp';
import cineMentor from '../../assets/Workshop/ILM_ORA_Cinematic_Video_Images_WebP/02_mentor_guidance.webp';
import cineAi from '../../assets/Workshop/ILM_ORA_Cinematic_Video_Images_WebP/03_ai_learning.webp';
import cinePresent from '../../assets/Workshop/ILM_ORA_Cinematic_Video_Images_WebP/04_product_presentation.webp';
import imgStudentCollab from '../../assets/Workshop/ILM_ORA_Workshops_Media/Images/01_student_collaboration.webp';
import imgMentorGuidance from '../../assets/Workshop/ILM_ORA_Workshops_Media/Images/02_mentor_guidance.webp';
import vidEnvironment from '../../assets/Workshop/ILM_ORA_Workshops_Media/Videos/01_workshop_environment.mp4';
import vidInstructor from '../../assets/Workshop/ILM_ORA_Workshops_Media/Videos/02_instructor_workspace.mp4';
import vidTraining from '../../assets/Workshop/ILM_ORA_Workshops_Media/Videos/03_training_session.mp4';

/* ====================================================================
   CONFIG
   ==================================================================== */

const CONFIG = {
  /** true  = sample data (UI preview only, page par clearly labelled).
   *  false = real backend through realApi below. */
  USE_MOCK: true,
  API_BASE: process.env.NEXT_PUBLIC_API_URL || '',
  /** Corporate / group enquiries ka email. Apna real email yahan daalo. */
  CONTACT_EMAIL: 'workshops@ilmora.example',
  /** Offer strip / pricing card. REAL values daalo (dates, price, refund policy). */
  OFFER: {
    on: true,
    banner: 'LIMITED SEATS: Register now at the launch price',
    cohort: 'Next cohort: SET REAL DATES',
    startsAt: null, // ms timestamp, e.g. Date.UTC(2026, 10, 27, 13, 30). null = countdown hidden
    price: 199, original: 9999,
    registerSlug: 'fullstack-nextjs-launchpad', // flagship workshop jiska register page 'Reserve my seat' kholega
    batchNote: 'Batch 1 price. Increases from the next batch.',
    refund: 'If you complete every build and the workshop is not for you, request a refund within 24 hours of the final live session.',
  },
};

/* ====================================================================
   MEDIA CONFIG  (images / videos ek hi jagah se badlo)
   ==================================================================== */
/** Next.js static import object {src,width,height} ya plain string, dono chalte hain. */
const U = (m) => (m && m.src) || m;

const IMG = {
  coding: U(imgCoding),
  ceo: U(imgCeo),
  director: U(imgDirector),
  corp: U(imgCorp),
  certFull: U(imgCertFull),
  javaCelebration: U(imgJavaCelebration),
  javaLive: U(imgJavaLive),
  celebration: U(imgCelebration),
  instructor: U(imgInstructor),
    certCeremony: U(imgCertCeremony),
  studentCollab: U(imgStudentCollab),
  mentorGuidance: U(imgMentorGuidance),
};

const MEDIA = {
  /** Hero ke liye real video (mp4 URL). Khali ho to hero photo use hota hai. */
  heroVideo: '',
  heroPoster: IMG.javaLive,
    /** Per-workshop cover override: { 'ai-agents-from-scratch': '/workshops/ai-agents.jpg' } */
  covers: {
        'ai-agents-from-scratch': U(cineAi),
    'prompt-engineering-masterclass': U(cineCoding),
    'genai-for-business-ops': U(cinePresent),
    'fullstack-nextjs-launchpad': IMG.javaLive,
    'api-design-that-scales': U(cineCoding),
    'git-and-ci-for-teams': IMG.mentorGuidance,
    'ux-research-in-a-day': IMG.studentCollab,
    'design-systems-figma': IMG.celebration,
    'motion-design-for-product': IMG.javaCelebration,
        'growth-marketing-loops': U(cinePresent),
    'seo-in-the-ai-era': IMG.studentCollab,
    'brand-storytelling-lab': IMG.celebration,
    'startup-finance-basics': IMG.corp,
    'product-strategy-bootcamp': U(cinePresent),
    'leading-through-change': IMG.corp,
    'first-time-manager-playbook': IMG.mentorGuidance,
    'executive-presence': IMG.instructor,
    'hiring-with-structured-interviews': IMG.studentCollab,
    'hr-onboarding-and-retention': IMG.celebration,
    'contact-center-qa-and-coaching': IMG.corp,
    'handling-difficult-customers': IMG.mentorGuidance,
    'devops-and-cicd-essentials': IMG.coding,
    'cloud-architecture-fundamentals': U(cineCoding),
  },
  /** Per-workshop promo video (YouTube ID) details page par. */
  promos: {},
  /** Workshop instructor photo override: { aarav: '/team/aarav.jpg' } */
     instructors: { shareef: U(mentorShareef), raghib: U(mentorRaghib), vishesh: U(mentorVishesh) },
  /** "Experience ILM ORA Workshops" videos. youtube = YouTube ID, src = mp4 URL.
   *  Dono khali = card "official video will be added" dikhata hai (fake video nahi). */
    videos: [
    { id: 'environment', tag: 'Illustrative preview', title: 'The learning environment', text: 'A look at the kind of collaborative room where hands-on sessions take place.', poster: '', pos: '50% 50%', alt: 'Illustrative video of a workshop room with learners at tables', youtube: '', src: vidEnvironment },
    { id: 'instructor', tag: 'Illustrative preview', title: 'Instructor at work', text: 'An instructor at a laptop, the way live build sessions are guided.', poster: '', pos: '50% 30%', alt: 'Illustrative video of an instructor working on a laptop', youtube: '', src: vidInstructor },
    { id: 'training', tag: 'Illustrative preview', title: 'A training session', text: 'A presentation-style training session with a group of learners.', poster: '', pos: '50% 50%', alt: 'Illustrative video of a training session with a presentation screen', youtube: '', src: vidTraining },
  ],
  /** Learner stories (sirf real, permission-cleared). Format:
   *  { name, role, workshop, quote, photo, youtube } */
  stories: [],
};

/** Har workshop category ka real cover photo. */
const CATEGORY_COVER = {
  AI: { src: IMG.coding, pos: '50% 40%' },
  Development: { src: IMG.javaLive, pos: '50% 40%' },
  Design: { src: IMG.celebration, pos: '50% 35%' },
  Marketing: { src: IMG.javaCelebration, pos: '50% 35%' },
  Business: { src: IMG.corp, pos: '50% 45%' },
  Leadership: { src: IMG.corp, pos: '30% 40%' },
  HR: { src: IMG.celebration, pos: '70% 40%' },
  'Contact Center': { src: IMG.corp, pos: '75% 45%' },
  Engineering: { src: IMG.coding, pos: '30% 50%' },
};

/** Mentors section: role apne real details se badlo. role khali ho to line khali rehti hai. */
const MENTORS = [
  {
    name: 'M. Shibli',
    role: 'Co-Founder',
    org: 'ILM ORA',
    img: U(mentorShibli),
    pos: '50% 20%',
  },
  {
    name: 'Shareef',
    role: 'Workshop Trainer',
    org: 'ILM ORA',
    img: U(mentorShareef),
    pos: '50% 25%',
  },
  {
    name: 'Raghib',
    role: 'Workshop Instructor',
    org: 'ILM ORA',
    img: U(mentorRaghib),
    pos: '50% 70%',
  },
  {
    name: 'Vishesh',
    role: 'Workshop Trainer',
    org: 'ILM ORA',
    img: U(mentorVishesh),
    pos: '50% 20%',
  },
  {
    name: 'Prachi Sharan',
    role: 'Workshop Coordinator',
    org: 'ILM ORA',
    img: U(mentorPrachi),
    pos: '50% 0%',
  },
  {
    name: 'Yash Kumar',
    role: 'Workshop Coordinator',
    org: 'ILM ORA',
    img: U(mentorYash),
    pos: '50% 0%',
  },
];

/** REAL learner feedback yahan daalo (sirf permission-cleared). Naya feedback upar add karo.
 *  Text card:   { name, role, text, source: 'linkedin' | 'x' | 'whatsapp' | 'google', date: 'Nov 2026', rating: 5 }
 *  Video card:  { name, role, text, youtube: 'YOUTUBE_ID' }  ya  { video: '/path/video.mp4', poster: U(img) }
 *  Screenshot:  { name, shot: U(importedImage) }
 *  photo: U(importedImage) optional. Baaki sab fields optional. */
/** Real feedback yahan daalo. Jab isme kuch bhi ho, sample cards apne aap hat jaate hain. */
const FEEDBACK_REAL = [
  { name: 'Learner 1', role: 'ILM ORA learner', youtube: 'VQL78M8Y7iY' },
  { name: 'Sample learner A', role: 'Sample role', text: 'Sample text: yahan learner ka real feedback aayega.', source: 'linkedin', date: 'Nov 2026', rating: 5, sample: true },
  { name: 'Sample learner B', role: 'Sample role', text: 'Sample text: live build days se kaafi kuch seekhne ko mila.', source: 'x', date: 'Nov 2026', rating: 5, sample: true },
  { name: 'Learner 2', role: 'ILM ORA learner', youtube: 'R2fnssUvazU' },
  { name: 'Sample learner C', role: 'Sample role', text: 'Sample text: instructor ne har doubt clear kiya.', source: 'linkedin', date: 'Nov 2026', rating: 5, sample: true },
  { name: 'Sample learner D', role: 'Sample role', text: 'Sample text: projects banane se confidence aaya.', source: 'whatsapp', date: 'Nov 2026', rating: 5, sample: true },
  { name: 'Learner 3', role: 'ILM ORA learner', youtube: 'PlHKF8dKZXA' },
  { name: 'Sample learner E', role: 'Sample role', text: 'Sample text: is jagah real review replace hoga.', source: 'google', date: 'Nov 2026', rating: 5, sample: true },
];

/** Sirf layout preview ke liye (USE_MOCK true hone par). Real nahi hain, "Sample" tag ke saath dikhte hain. */
const FEEDBACK_SAMPLE = Array.from({ length: 10 }, (_, i) => ({
  name: `Sample learner ${i + 1}`,
  role: 'Sample role',
  text: [
    'Sample text: yahan learner ka real feedback aayega.',
    'Sample text: live build days se kaafi kuch seekhne ko mila.',
    'Sample text: instructor ne har doubt clear kiya.',
    'Sample text: projects banane se confidence aaya.',
    'Sample text: is jagah real review replace hoga.',
  ][i % 5],
  source: ['linkedin', 'whatsapp', 'x', 'google'][i % 4],
  date: 'Nov 2026',
  rating: 5,
  sample: true,
}));

const FEEDBACK = FEEDBACK_REAL.length ? FEEDBACK_REAL : (CONFIG.USE_MOCK ? FEEDBACK_SAMPLE : []);
const FEEDBACK_PREVIEW = 6;  // home page par kitne cards
const FEEDBACK_PAGE = 12;    // /feedback page par ek baar mein kitne
const SOURCE_LABEL = { linkedin: 'in', x: 'X', whatsapp: 'WA', google: 'G' };

const GALLERY = [
  { img: IMG.javaCelebration, cap: 'Java workshop celebration', pos: '50% 40%' },
 
  { img: IMG.coding, cap: 'Focused coding session', pos: '50% 40%' },
  { img: IMG.corp, cap: 'Corporate training workshop', pos: '50% 45%' },
  { img: IMG.celebration, cap: 'Workshop celebration', pos: '50% 35%' },
  { img: IMG.javaLive, cap: 'Live Java workshop', pos: '50% 40%' },
];

const JOURNEY = [
  { ic: 'compass', t: 'Explore workshops', d: 'Search by topic, level, price or date. Every workshop shows its instructor, format, duration and seats left before you decide.', img: IMG.celebration, alt: 'Learners together at an ILM ORA workshop', pos: '50% 40%' },
  { ic: 'select', t: 'Select your workshop', d: 'Open the details page to read the agenda, outcomes and prerequisites, then register in about a minute.', img: IMG.corp, alt: 'ILM ORA corporate training workshop in a classroom', pos: '50% 45%' },
     { ic: 'present', t: 'Learn from experts', d: 'Join the live session with your instructor and ask questions in real time, or watch the recording whenever it suits you.', img: IMG.mentorGuidance, alt: 'Mentor guiding a learner who is working on a laptop', pos: '50% 40%' },
  { ic: 'code', t: 'Build practical projects', d: 'Apply every idea to a real task during the session and leave with working output you can show.', img: IMG.coding, alt: 'Learner coding during a focused workshop', pos: '50% 40%' },
  { ic: 'assess', t: 'Complete assessment', d: 'Finish the session or modules and your instructor confirms completion.', img: IMG.instructor, alt: 'ILM ORA workshop instructor', pos: '50% 25%' },
  { ic: 'award', t: 'Earn your certificate', d: 'Verified completions receive an ILM ORA certificate with a unique ID and QR verification.', img: IMG.certCeremony, alt: 'Learners receiving certificates at a Java workshop ceremony', pos: '50% 40%' },
];

/* ====================================================================
   SCOPED STYLES (sab kuch .wk ke andar)
   ==================================================================== */
const WK_CSS = `.wk{
  --bg:var(--wkbg,#fbfcfe); --solid:var(--card,#ffffff);
  --surface:color-mix(in srgb,var(--card,#fff) 94%,transparent);
  --text:var(--tx,#1f1b18); --muted:var(--mut,#6a5f57);
  --ln:var(--line,rgba(60,35,20,.14));
  --brand:var(--or,#f97316); --brand2:#fb8b3a; --accent:#16a34a; --ok:#0f7a58; --err:#c42c49;
  --shadow:0 8px 22px rgba(60,35,10,.12); --r-lg:16px; --r-md:12px; --r-sm:8px;
  position:relative; isolation:isolate; background-color:var(--bg); background-image:linear-gradient(var(--wkgrid,rgba(100,120,160,.16)) 1px,transparent 1px),linear-gradient(90deg,var(--wkgrid,rgba(100,120,160,.16)) 1px,transparent 1px); background-size:32px 32px; color:var(--text);
  min-height:60vh; font-family:inherit; font-size:14px; line-height:1.5; font-weight:400;
  overflow-x:clip; -webkit-font-smoothing:antialiased;
}
.wk *,.wk *::before,.wk *::after{box-sizing:border-box}
.wk h1,.wk h2,.wk h3,.wk h4{font-family:inherit;line-height:1.15;margin:0;letter-spacing:-.012em;color:var(--text)}
.wk h1{font-size:clamp(1.3rem,2.8vw,1.8rem);font-weight:700}
.wk h2{font-size:clamp(.98rem,1.6vw,1.15rem);font-weight:700}
.wk h3{font-size:.92rem;font-weight:700}
.wk p{margin:0}
.wk a{color:inherit}
.wk img{max-width:100%}
.wk button,.wk input,.wk select,.wk textarea{font:inherit;color:inherit}
.wk :focus-visible{outline:3px solid var(--accent);outline-offset:2px;border-radius:6px}
.wk .wrap{--gx:clamp(14px,3.2vw,56px);width:100%;max-width:1680px;margin:0 auto;padding:0 var(--gx)}
.wk .wk-main{position:relative;z-index:1;outline:none;padding-bottom:44px}
.wk .notice{background:color-mix(in srgb,var(--accent) 14%,transparent);border-bottom:1px solid color-mix(in srgb,var(--accent) 40%,transparent);padding:6px 14px;text-align:center;font-size:.78rem;font-weight:600}
.wk .sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);clip-path:inset(50%);white-space:nowrap;border:0}
.wk .muted{color:var(--muted)}

/* buttons, badges */
.wk .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:1px solid transparent;border-radius:999px;padding:7px 15px;min-height:36px;font-size:.86rem;font-weight:700;cursor:pointer;text-decoration:none;white-space:nowrap;transition:transform .18s,box-shadow .2s,background .2s,border-color .2s}
.wk .btn:active{transform:scale(.97)}
.wk .btn-primary{background:linear-gradient(135deg,var(--brand),var(--brand2));color:#fff;box-shadow:0 6px 16px color-mix(in srgb,var(--brand) 38%,transparent)}
.wk .btn-primary:hover{box-shadow:0 9px 22px color-mix(in srgb,var(--brand) 52%,transparent);transform:translateY(-1px)}
.wk .btn-ghost{background:transparent;border-color:var(--ln);color:var(--text)}
.wk .btn-ghost:hover{background:color-mix(in srgb,var(--brand) 9%,transparent);border-color:var(--brand)}
.wk .btn-green{background:var(--accent);color:#fff}
.wk .btn-green:hover{background:#12873e}
.wk .btn-light{background:#fff;color:#1f1b18}
.wk .btn-light:hover{background:#ffe9d6}
.wk .btn-line{background:transparent;border-color:rgba(255,255,255,.55);color:#fff}
.wk .btn-line:hover{background:rgba(255,255,255,.14);border-color:#fff}
.wk .btn[disabled],.wk .btn[aria-disabled="true"]{opacity:.55;cursor:not-allowed;transform:none;box-shadow:none}
.wk .btn-sm{padding:5px 11px;min-height:30px;font-size:.78rem}
.wk .btn-lg{padding:8px 18px;min-height:40px;font-size:.88rem}
.wk .btn-block{width:100%}
.wk .badge{display:inline-flex;align-items:center;gap:5px;padding:3px 8px;border-radius:999px;font-size:.68rem;font-weight:700;background:rgba(10,12,30,.72);color:#fff;backdrop-filter:blur(6px)}
.wk .badge.live i{width:7px;height:7px;border-radius:50%;background:#ff4d6d;animation:wkpulse 1.8s infinite}
.wk .badge.free{background:var(--accent);color:#fff}
.wk .badge.feat{background:var(--brand);color:#fff}
@keyframes wkpulse{70%{box-shadow:0 0 0 7px rgba(255,77,109,0)}100%{box-shadow:0 0 0 0 rgba(255,77,109,0)}}
.wk .glass{background:var(--surface);border:1px solid var(--ln);box-shadow:var(--shadow)}

/* reveal */
.wk .wkrv{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}
.wk .wkrv.wkrv-on{opacity:1;transform:none}

/* cinematic hero */
.wk .hero2{position:relative;color:#fff;overflow:hidden;background:#0b0b10;min-height:min(64vh,480px);display:flex;flex-direction:column;justify-content:flex-end}
.wk .hero2-bg{position:absolute;inset:-4% 0;transform:scale(1.08);will-change:transform}
.wk .hero2-bg img,.wk .hero2-bg video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.wk .hero2-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,8,14,.9) 0%,rgba(8,8,14,.62) 55%,rgba(8,8,14,.34) 100%),linear-gradient(0deg,rgba(8,8,14,.88),transparent 48%)}
.wk .hero2-in{position:relative;display:grid;gap:18px;padding-top:56px;padding-bottom:16px;align-items:end}
@media(min-width:960px){.wk .hero2-in{grid-template-columns:minmax(0,1.5fr) minmax(280px,.75fr)}}
.wk .hero2 h1{color:#fff;font-size:clamp(1.55rem,4.2vw,2.6rem);font-weight:800;line-height:1.08;letter-spacing:-.025em;max-width:22ch}
.wk .hero2 p.lead{color:rgba(255,255,255,.84);font-size:clamp(.84rem,1.3vw,.95rem);max-width:56ch;margin-top:10px}
.wk .hero2-cta{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
.wk .livepill{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);backdrop-filter:blur(8px);font-size:.74rem;font-weight:700;margin-bottom:12px}
.wk .livepill i{width:8px;height:8px;border-radius:50%;background:#ff4d6d;animation:wkpulse 1.8s infinite}
.wk .hero2-card{background:rgba(14,14,22,.58);border:1px solid rgba(255,255,255,.2);backdrop-filter:blur(14px);border-radius:16px;padding:14px;display:grid;gap:8px}
.wk .hero2-card small{font-size:.72rem;font-weight:700;color:#ffb27a}
.wk .hero2-card h3{color:#fff;font-size:.95rem}
.wk .hero2-card p{color:rgba(255,255,255,.78);font-size:.82rem}
.wk .cdn{display:flex;gap:8px}
.wk .cdn div{background:rgba(0,0,0,.28);border-radius:10px;padding:6px 10px;text-align:center;min-width:52px}
.wk .cdn b{display:block;font-size:1.15rem;font-variant-numeric:tabular-nums}
.wk .cdn small{font-size:.65rem;opacity:.85}
.wk .hero2-stats{position:relative;display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:0;padding:12px 0 16px;border-top:1px solid rgba(255,255,255,.2)}
@media(min-width:700px){.wk .hero2-stats{grid-template-columns:repeat(4,1fr)}}
.wk .hero2-stats b{display:block;font-size:clamp(1.15rem,2.2vw,1.5rem);font-weight:800;line-height:1;font-variant-numeric:tabular-nums}
.wk .hero2-stats span{font-size:.74rem;color:rgba(255,255,255,.74)}

/* explore: search + filters */
.wk .exhead h2.h-xl,.wk h2.h-xl{font-size:clamp(1.1rem,2vw,1.45rem);font-weight:700;letter-spacing:-.015em}
.wk .searchbox{display:flex;align-items:center;gap:8px;margin-top:16px;padding:5px 5px 5px 14px;border-radius:999px;max-width:640px}
.wk .searchbox svg{flex:none;opacity:.6}
.wk .searchbox input{flex:1;min-width:0;border:0;background:transparent;outline:0;font-size:.92rem;padding:7px 0}
.wk .searchbox:focus-within{box-shadow:0 0 0 3px color-mix(in srgb,var(--brand) 50%,transparent),var(--shadow)}
.wk .cats{display:flex;gap:6px;overflow-x:auto;padding:12px var(--gx) 4px;margin:0 calc(var(--gx) * -1);scrollbar-width:none}
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
.wk .sechead{display:flex;align-items:end;justify-content:space-between;gap:10px;margin-bottom:14px}
.wk .sechead p{color:var(--muted);margin-top:3px;font-size:.82rem;max-width:62ch}
.wk .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px}
.wk .row{display:flex;gap:14px;overflow-x:auto;padding:6px var(--gx) 14px;margin:0 calc(var(--gx) * -1);scrollbar-width:none}
.wk .row::-webkit-scrollbar{display:none}
@media(prefers-reduced-motion:reduce){.wk .row{scrollbar-width:thin}.wk .row::-webkit-scrollbar{display:block}}
.wk .row .card{flex:0 0 min(244px,78vw);min-width:0}
.wk .card{position:relative;min-width:0;display:flex;flex-direction:column;border-radius:var(--r-lg);background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);overflow:hidden;transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,border-color .3s}
.wk .card:hover{transform:translateY(-4px);box-shadow:0 18px 36px color-mix(in srgb,var(--brand) 22%,rgba(60,25,0,.18))}
.wk .card.featured{border-color:var(--brand)}
.wk .art{position:relative;overflow:hidden;aspect-ratio:16/9;background:#1a1a22}
.wk .art img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.wk .card:hover .art img{transform:scale(1.07)}
.wk .art::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.4),transparent 55%);pointer-events:none}
.wk .art .badges{position:absolute;left:9px;top:9px;display:flex;gap:5px;flex-wrap:wrap;z-index:1}
.wk .cbody{display:flex;flex-direction:column;gap:6px;padding:10px 12px 12px;flex:1}
.wk .cbody .cat{font-size:.72rem;font-weight:700;color:var(--brand)}
.wk .cbody h3 a{text-decoration:none}
.wk .cbody h3 a::before{content:"";position:absolute;inset:0;z-index:0;border-radius:inherit}
.wk .cbody p.sd{color:var(--muted);font-size:.8rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.wk .inst{display:flex;align-items:center;gap:9px;font-size:.8rem}
.wk .inst b{display:block;font-weight:700;line-height:1.2}
.wk .inst small{display:block;color:var(--muted);font-size:.7rem}
.wk .av{flex:none;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:.62rem;color:#fff;box-shadow:0 0 0 2px var(--solid)}
.wk .av.lg{width:58px;height:58px;font-size:1.1rem}
.wk .meta{display:flex;flex-wrap:wrap;gap:3px 11px;font-size:.74rem;color:var(--muted)}
.wk .meta span{display:inline-flex;align-items:center;gap:4px}
.wk .meta .seat{color:var(--ok);font-weight:700}
.wk .meta .seat.low{color:var(--err)}
.wk .cfoot{margin-top:auto;flex-wrap:wrap;display:flex;align-items:center;justify-content:space-between;gap:8px;padding-top:9px;border-top:1px dashed var(--ln)}
.wk .price{font-weight:800;font-size:1.04rem}
.wk .price.free{color:var(--ok)}
.wk .cta{display:flex;gap:6px;position:relative;z-index:2}
.wk .cta .btn-sm{padding:5px 9px;font-size:.74rem}
.wk .state{display:grid;place-items:center;text-align:center;gap:8px;padding:26px 16px;border-radius:var(--r-lg)}
.wk .state svg{opacity:.85}
.wk .skel{border-radius:var(--r-lg);height:300px;background:linear-gradient(100deg,var(--surface) 30%,color-mix(in srgb,var(--brand) 13%,var(--surface)) 50%,var(--surface) 70%);background-size:300% 100%;animation:wksh 1.3s infinite linear;border:1px solid var(--ln)}
@keyframes wksh{to{background-position:-100% 0}}

/* experience videos */
.wk .xp{display:grid;gap:16px}
@media(min-width:860px){.wk .xp{grid-template-columns:1.5fr 1fr;grid-template-rows:1fr 1fr}.wk .xp .lead{grid-row:1/3}}
.wk .xp-card{min-height:160px}
.wk .xp-btn{position:relative;display:block;width:100%;height:100%;min-height:160px;border:0;padding:0;border-radius:14px;overflow:hidden;cursor:pointer;background:#111;text-align:left;color:#fff}
.wk .xp-btn[disabled]{cursor:default}
.wk .xp-btn img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.wk .xp-btn:not([disabled]):hover img{transform:scale(1.05)}
.wk .xp-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.88),rgba(8,8,14,.15) 65%)}
.wk .xp-play{position:absolute;left:50%;top:42%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:var(--brand);display:grid;place-items:center;box-shadow:0 0 0 6px rgba(249,115,22,.28);transition:transform .25s}
.wk .xp-btn:hover .xp-play{transform:scale(1.1)}
.wk .xp-cap{position:absolute;left:0;right:0;bottom:0;padding:12px 14px;display:grid;gap:3px}
.wk .xp-cap small{font-size:.72rem;font-weight:700;color:#ffb27a}
.wk .xp-cap b{font-size:clamp(.88rem,1.4vw,1rem);line-height:1.2}
.wk .xp-cap em{font-style:normal;font-size:.74rem;color:rgba(255,255,255,.8);max-width:52ch}
.wk .vm{position:fixed;inset:0;z-index:95;background:rgba(5,5,10,.86);display:grid;place-items:center;padding:16px;backdrop-filter:blur(4px)}
.wk .vm-box{position:relative;width:min(960px,100%);aspect-ratio:16/9;background:#000;border-radius:16px;overflow:hidden}
.wk .vm-box iframe,.wk .vm-box video{position:absolute;inset:0;width:100%;height:100%;border:0}
.wk .vm-x{position:absolute;right:8px;top:8px;z-index:2;width:38px;height:38px;border-radius:50%;border:0;background:rgba(0,0,0,.65);color:#fff;display:grid;place-items:center;cursor:pointer}

/* topic tiles (real photos) */
.wk .tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}
.wk .tile{position:relative;display:block;border-radius:12px;overflow:hidden;aspect-ratio:16/10;text-decoration:none;color:#fff;background:#111}
.wk .tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.wk .tile:hover img{transform:scale(1.08)}
.wk .tile::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.92),rgba(8,8,14,.12) 62%)}
.wk .tile div{position:absolute;left:0;right:0;bottom:0;padding:9px 11px;z-index:1}
.wk .tile h3{color:#fff;font-size:.88rem}
.wk .tile p{font-size:.7rem;color:rgba(255,255,255,.86);margin-top:1px;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.wk .row .tile{flex:0 0 min(210px,62vw);min-width:0}

/* learning journey */
.wk .jr{display:grid;gap:14px;margin-top:14px}
.wk .jr-step{display:grid;gap:10px;align-items:center;padding:10px;border:1px solid var(--ln);border-radius:14px;background:var(--solid)}
@media(min-width:700px){.wk .jr-step{grid-template-columns:minmax(220px,320px) 1fr;gap:18px}}
.wk .jr-img{border-radius:10px;overflow:hidden;background:#fff;width:100%}
.wk .jr-img img{display:block;width:100%;height:auto;transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.wk .jr-step:hover .jr-img img{transform:scale(1.05)}
.wk .jr-no{font-size:1.1rem;font-weight:800;line-height:1;color:var(--brand)}
.wk .jr-step h3{font-size:.98rem;margin:6px 0 3px}
.wk .jr-step p{color:var(--muted);font-size:.84rem;max-width:60ch}

/* certificate showcase */
.wk .cert{display:grid;gap:18px;align-items:center;padding:clamp(12px,2.2vw,22px);border-radius:16px;background:linear-gradient(135deg,color-mix(in srgb,var(--brand) 10%,var(--solid)),var(--solid) 55%,color-mix(in srgb,var(--accent) 10%,var(--solid)));border:1px solid var(--ln);box-shadow:var(--shadow)}
@media(min-width:920px){.wk .cert{grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr)}}
.wk .cert-frame{position:relative;border-radius:10px;background:#fff;padding:5px;box-shadow:0 14px 30px rgba(60,25,0,.22);transform:rotate(-1deg);transition:transform .5s;max-width:380px;margin:0 auto}
.wk .cert-frame:hover{transform:rotate(0) scale(1.015)}
.wk .cert-frame img{display:block;width:100%;height:auto;border-radius:6px}
.wk .cert-frame .tagc{position:absolute;left:14px;top:-12px;background:var(--accent);color:#fff;font-size:.72rem;font-weight:700;padding:4px 11px;border-radius:999px}
.wk .cert-list{display:grid;gap:8px;margin:10px 0 14px;padding:0;list-style:none}
@media(min-width:560px){.wk .cert-list{grid-template-columns:1fr 1fr}}
.wk .cert-list li{display:flex;gap:8px;align-items:center;font-size:.82rem}
.wk .cert-list li svg{flex:none;color:var(--ok)}
.wk .cert-act{display:flex;gap:10px;flex-wrap:wrap}
.wk .cert-note{font-size:.72rem;color:var(--muted);margin-top:10px;max-width:60ch}

/* team */
.wk .team{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.wk .tm{border-radius:12px;overflow:hidden;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);height:100%}
.wk .tm .ph{overflow:hidden;background:#fff}
.wk .tm .ph img{display:block;width:100%;height:auto;transition:transform .7s}
.wk .tm:hover .ph img{transform:scale(1.05)}
.wk .tm .tx{padding:8px 10px}
.wk .tm p{color:var(--muted);font-size:.74rem;margin-top:1px}
.wk .ilist{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px 22px;margin-top:16px;padding:0;list-style:none}
.wk .ilist li{display:flex;gap:11px;align-items:flex-start;padding:10px 0;border-bottom:1px solid var(--ln)}
.wk .ilist b{display:block;font-size:.88rem}
.wk .ilist small{color:var(--muted);font-size:.76rem}

/* corporate + cta band */
.wk .band{display:grid;align-items:center;border-radius:16px;overflow:hidden;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow)}
.wk .band img{display:block;width:100%;height:auto}
@media(min-width:760px){.wk .band{grid-template-columns:minmax(0,1.1fr) minmax(0,1fr)}}
.wk .band-in{padding:clamp(16px,3vw,32px)}
.wk .band h2{font-size:clamp(1.05rem,2vw,1.4rem);font-weight:700}
.wk .band p{color:var(--muted);margin-top:8px;font-size:.88rem}
.wk .band .cert-act{margin-top:20px}
.wk .plist{display:grid;gap:0;margin-top:6px;padding:0;list-style:none}
@media(min-width:760px){.wk .plist{grid-template-columns:1fr 1fr;column-gap:44px}}
.wk .plist li{display:grid;grid-template-columns:32px 1fr;gap:1px 10px;padding:9px 0;border-bottom:1px solid var(--ln);align-items:center}
.wk .pi{grid-row:1/3;width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:color-mix(in srgb,var(--brand) 12%,transparent);color:var(--brand)}
.wk .plist b{font-size:.86rem}
.wk .plist span{color:var(--muted);font-size:.78rem}

/* gallery + stories */
.wk .gal{display:block;columns:2;column-gap:8px}
@media(min-width:800px){.wk .gal{columns:3}}
.wk .gal figure{position:relative;margin:0 0 8px;border-radius:10px;overflow:hidden;background:#111;break-inside:avoid}
@media(min-width:800px){.wk .gal figure{aspect-ratio:auto}}
.wk .gal img{display:block;width:100%;height:auto;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
.wk .gal figure:hover img{transform:scale(1.07)}
.wk .gal figcaption{position:absolute;left:0;right:0;bottom:0;padding:16px 10px 7px;color:#fff;font-size:.72rem;font-weight:600;background:linear-gradient(0deg,rgba(8,8,14,.78),transparent)}
.wk .stories{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
.wk .story{padding:20px;border:1px solid var(--ln);border-radius:var(--r-lg);background:var(--solid)}
.wk .story .qt{font-size:.95rem;margin:0 0 12px}
.wk .story .who{display:flex;gap:10px;align-items:center}
.wk .story img.ph{width:44px;height:44px;border-radius:50%;object-fit:cover}
.wk .empty-note{padding:16px 18px;border:1px dashed var(--ln);border-radius:var(--r-md);color:var(--muted);font-size:.86rem;margin-top:14px;max-width:70ch}

.wk .tic{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:8px;background:var(--brand);color:#fff;margin-bottom:5px}
.wk .jr-top{display:flex;align-items:center;gap:8px}
.wk .jr-ic{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;background:color-mix(in srgb,var(--brand) 14%,transparent);color:var(--brand)}
.wk .natfig{position:relative;margin:14px auto 0;max-width:820px;border-radius:12px;overflow:hidden;background:#111;border:1px solid var(--ln)}
.wk .natfig img{display:block;width:100%;height:auto}
.wk .natfig figcaption{padding:8px 12px;font-size:.78rem;color:var(--muted);background:var(--solid)}
.wk img,.wk video{max-width:100%}
.wk{-webkit-text-size-adjust:100%;text-size-adjust:100%}
@media(max-width:640px){.wk .hero2{min-height:auto}.wk .hero2-in{padding-top:40px}.wk .xp-card,.wk .xp-btn{min-height:190px}.wk .cfoot{gap:6px}.wk .sechead{flex-wrap:wrap}}
@media(min-width:768px) and (max-width:1100px){.wk .grid{grid-template-columns:repeat(auto-fill,minmax(220px,1fr))}.wk .tiles{grid-template-columns:repeat(auto-fill,minmax(180px,1fr))}}
@media(min-width:1800px){.wk{font-size:15px}.wk .tiles{grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}}
@media(max-width:900px){.wk .wk-main{padding-bottom:84px}}
/* details */
.wk .crumbs{padding-top:16px;font-size:.78rem;color:var(--muted)}
.wk .crumbs a{text-decoration:none}.wk .crumbs a:hover{text-decoration:underline}
.wk .banner{position:relative;margin-top:10px;border-radius:14px;overflow:hidden;box-shadow:var(--shadow);height:clamp(130px,18vw,230px);background:#111}
.wk .banner img{width:100%;height:100%;object-fit:cover;display:block}
.wk .banner::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.4),transparent 55%)}
.wk .banner .badges{position:absolute;left:14px;top:14px;display:flex;gap:6px;z-index:1}
.wk .dgrid{display:grid;gap:18px;margin-top:18px}
@media(min-width:960px){.wk .dgrid{grid-template-columns:minmax(0,1fr) 320px;align-items:start}}
.wk .panel{border-radius:var(--r-lg);padding:14px}
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
.wk .certmini{display:grid;gap:14px;align-items:center}
@media(min-width:640px){.wk .certmini{grid-template-columns:150px 1fr}}
.wk .certmini img{display:block;width:100%;height:auto;border-radius:8px;border:1px solid var(--ln);background:#fff}

/* forms */
.wk .formwrap{max-width:660px;margin:22px auto 0}
.wk .form{display:grid;gap:11px}
.wk .fr{display:grid;gap:11px}
@media(min-width:600px){.wk .fr.two{grid-template-columns:1fr 1fr}}
.wk .spin{width:15px;height:15px;border-radius:50%;border:2.5px solid rgba(255,255,255,.4);border-top-color:#fff;animation:wkrot .7s linear infinite}
@keyframes wkrot{to{transform:rotate(360deg)}}
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
.wk .ticket .top{height:100px;position:relative;transform:translateZ(26px);overflow:hidden}
.wk .ticket .top img{width:100%;height:100%;object-fit:cover;display:block}
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
.wk .player .bgp img{width:100%;height:100%;object-fit:cover;display:block}
.wk .player .ctrl{position:absolute;left:0;right:0;bottom:0;padding:11px;display:flex;align-items:center;gap:10px;background:linear-gradient(transparent,rgba(0,0,0,.7));color:#fff}
.wk .prog{flex:1;height:5px;border-radius:6px;background:rgba(255,255,255,.28);overflow:hidden}
.wk .prog i{display:block;height:100%;width:0;background:var(--accent);transition:width .25s linear}
.wk .lessons{display:grid;gap:6px;padding:0;list-style:none;margin:0}
.wk .lessons button{width:100%;text-align:left;display:flex;gap:8px;justify-content:space-between;padding:9px 11px;border-radius:var(--r-sm);border:1px solid var(--ln);background:var(--solid);cursor:pointer;font-weight:600;font-size:.84rem}
.wk .lessons button[aria-current="true"]{border-color:var(--brand);background:color-mix(in srgb,var(--brand) 11%,var(--solid))}
.wk .dash{display:grid;gap:12px;margin-top:16px}
.wk .dcard{display:grid;gap:12px;padding:13px;border-radius:var(--r-lg)}
@media(min-width:760px){.wk .dcard{grid-template-columns:130px 1fr auto;align-items:center}}
.wk .dcard .art{border-radius:var(--r-md)}
.wk #toasts{position:fixed;right:14px;bottom:14px;z-index:90;display:grid;gap:8px;max-width:min(340px,calc(100vw - 28px))}
.wk .toast{padding:9px 13px;border-radius:12px;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);font-weight:600;font-size:.84rem;border-left:4px solid var(--brand);animation:wktst .35s ease}
.wk .toast.ok{border-left-color:var(--ok)}.wk .toast.bad{border-left-color:var(--err)}
@keyframes wktst{from{transform:translateY(12px);opacity:0}}
.wk .nl{display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:18px 0;padding:18px 22px;border-radius:var(--r-lg);color:#fff;background:linear-gradient(120deg,#c2410c,var(--brand))}
.wk .nl h3,.wk .nl p{color:#fff}.wk .nl .btn{background:#fff;color:#c2410c}
.wk .qt{font-style:italic;margin-bottom:12px}
.wk .faq details{border-bottom:1px solid var(--ln);padding:12px 0}.wk .faq summary{cursor:pointer;font-weight:600}.wk .faq p{color:var(--muted);margin-top:8px}
.wk .share{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.wk .stickybar{position:fixed;left:0;right:0;bottom:0;z-index:40;display:none;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px calc(10px + env(safe-area-inset-bottom,0px));background:var(--solid);border-top:1px solid var(--ln);box-shadow:0 -6px 20px rgba(0,0,0,.12)}
@media(max-width:900px){.wk .stickybar{display:flex}}
@media(prefers-reduced-motion:reduce){.wk *,.wk *::before,.wk *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}.wk .wkrv{opacity:1;transform:none}.wk .hero2-bg{transform:none!important}}
`;

/** Theme + font variables, baaki Ilmora-* pages jaisa hi. */
const HOST_CSS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.ilm{--wkbg:#fbfcfe;--wkgrid:rgba(100,120,160,.16);--cream:#f6ede6;--white:#ffffff;--card:#ffffff;--tx:#1f1b18;--tx2:#3b332d;--mut:#6a5f57;--or:#f97316;--ord:#c2410c;--line:#e7d9cd;--w:1200px;background:var(--white);color:var(--tx);font-family:'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif;overflow-x:hidden;line-height:1.55}
.ilm *{box-sizing:border-box}
.ilm button{font-family:inherit;cursor:pointer}
.ilm.dark{--wkbg:#0c0c14;--wkgrid:rgba(255,255,255,.06);--cream:#0c0c14;--white:#0f0f18;--card:#13131e;--tx:#f1f5f9;--tx2:#cbd5e1;--mut:#94a3b8;--line:rgba(255,255,255,.1)}
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
/** Login ke baad sirf same-site relative redirect allow (open redirect se bachav). */
const safeNext = (n, fallback = '/dashboard') => (typeof n === 'string' && /^\/(?!\/)/.test(n) ? n : fallback);
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
};

/** Site ke asli login (popup) ka user, localStorage se. Keys apne login ke hisaab se adjust karo. */
let SITE_USER = null;
const readSiteUser = () => {
  const toUser = (o) => ({
    id: o.id || o._id || o.userId || o.user_id || o.sub || o.email,
    name: o.name || o.fullName || o.full_name || o.username || String(o.email).split('@')[0],
    email: o.email,
    hasId: Boolean(o.id || o._id || o.userId || o.user_id || o.sub),
  });
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
   MOCK DATA + MOCK BACKEND  (temporary, sirf UI preview; real API lagne par delete karo)
   ==================================================================== */
const INSTRUCTORS = {
  aarav: { name: 'Aarav Mehta', role: 'AI engineer and founder', years: 9, hue: 24, bio: 'Aarav has shipped AI assistants for fintech and education teams, and previously founded a small automation start-up. He teaches by building one working system from a blank folder.' },
  neha: { name: 'Neha Kapoor', role: 'Principal product designer', years: 11, hue: 8, bio: 'Neha leads design for a consumer learning app used by millions. She runs research sprints and design critiques for teams across India and Southeast Asia.' },
  rohan: { name: 'Rohan Iyer', role: 'Staff software engineer', years: 12, hue: 150, bio: 'Rohan builds and scales backend platforms. He mentors engineers on API design, testing and delivery habits that survive real deadlines.' },
  sana: { name: 'Sana Qureshi', role: 'Head of growth', years: 8, hue: 28, bio: 'Sana has grown subscription products from zero to seven-figure revenue. She focuses on repeatable loops rather than one-off campaigns.' },
  vikram: { name: 'Vikram Rao', role: 'Fractional CFO', years: 15, hue: 150, bio: 'Vikram advises early-stage founders on cash, pricing and fundraising. He explains finance without jargon.' },
  ishita: { name: 'Ishita Bose', role: 'Leadership coach', years: 13, hue: 18, bio: 'Ishita coaches first-time managers and senior leaders through change, hard conversations and team health.' },
  kabir: { name: 'Kabir Singh', role: 'Brand strategist', years: 10, hue: 12, bio: 'Kabir has built brand narratives for consumer and B2B companies, and writes about positioning and storytelling.' },
  meera: { name: 'Meera Joshi', role: 'HR director', years: 14, hue: 330, bio: 'Meera has built HR functions for fast-growing companies, from first hire to a few hundred people.' },
  dinesh: { name: 'Dinesh Nair', role: 'Contact center operations head', years: 16, hue: 190, bio: 'Dinesh has run multi-site customer support operations and trains QA teams and team leaders.' },
  tarun: { name: 'Tarun Verma', role: 'Cloud and DevOps engineer', years: 10, hue: 215, bio: 'Tarun designs cloud platforms and delivery pipelines and mentors engineers moving into DevOps.' },
    shareef: { name: 'Shareef', role: 'Workshop trainer, ILM ORA', years: 0, hue: 24, bio: 'Shareef trains learners in ILM ORA workshops and runs the live build sessions, guiding them through hands-on projects and answering questions in real time.' },
  ananya: { name: 'Ananya Das', role: 'Applied AI researcher', years: 7, hue: 175, bio: 'Ananya applies language models to analytics and operations. She helps non-technical teams find practical, safe uses for AI.' },
};

const TPL = {
  AI: { learn: ['How modern language models work, in plain terms', 'Writing instructions that produce reliable output', 'Connecting models to tools and your own data', 'Evaluating answers and catching mistakes', 'Keeping data private and usage safe', 'Turning a prototype into a repeatable workflow'], out: ['Ship a working AI workflow of your own', 'Judge when AI helps and when it does not', 'Write prompts you can reuse across tasks', 'Share a clear plan for your team'], aud: ['Professionals who want practical AI skills', 'Founders and product managers', 'Developers new to AI tooling'], seg: ['Welcome and what we will build', 'Core ideas, demystified', 'Live build lab', 'Testing, Q&A and next steps'] },
  Development: { learn: ['Project structure that stays tidy as it grows', 'Writing and testing code with confidence', 'Reading errors and debugging faster', 'Working with APIs and data', 'Deploying to a live environment', 'Habits that make code reviews painless'], out: ['Build and deploy a small but real project', 'Debug problems without guessing', 'Review code with a clear checklist', 'Leave with a reusable starter template'], aud: ['Developers moving up a level', 'Bootcamp graduates', 'Engineering team leads'], seg: ['Setup and goals', 'Core patterns', 'Hands-on build', 'Review, Q&A and next steps'] },
  Design: { learn: ['Framing the problem before opening a design tool', 'Gathering evidence from real users', 'Turning findings into layout decisions', 'Building reusable components', 'Giving and receiving critique', 'Presenting design work to stakeholders'], out: ['Produce a portfolio-ready case study', 'Run a lightweight research round', 'Build a small component library', 'Present with confidence'], aud: ['Designers building their craft', 'Product managers', 'Founders shaping their first product'], seg: ['Warm-up and goals', 'Method walkthrough', 'Studio exercise', 'Critique, Q&A and next steps'] },
  Marketing: { learn: ['Finding the one metric that matters', 'Designing channels that compound', 'Writing messages people act on', 'Running small experiments quickly', 'Reading results without fooling yourself', 'Planning a quarter of work'], out: ['Leave with a 90-day growth plan', 'Launch one experiment this week', 'Write a clear value proposition', 'Report results the team trusts'], aud: ['Marketers and growth teams', 'Founders doing their own marketing', 'Content and community leads'], seg: ['Context and goals', 'Framework deep dive', 'Plan-building workshop', 'Feedback, Q&A and next steps'] },
  Business: { learn: ['Reading the numbers that run a business', 'Pricing with confidence', 'Planning cash for the next 12 months', 'Making decisions with incomplete data', 'Prioritising a roadmap', 'Communicating strategy to a team'], out: ['Build a simple financial model', 'Set pricing you can defend', 'Create a one-page strategy', 'Know what to track every week'], aud: ['Founders and operators', 'Product and business managers', 'Career switchers entering business roles'], seg: ['Introductions and goals', 'Key concepts', 'Worked example', 'Q&A and next steps'] },
  Leadership: { learn: ['Setting expectations without micromanaging', 'Holding clear, kind conversations', 'Leading a team through uncertainty', 'Giving feedback that lands', 'Protecting focus and energy', 'Building trust over time'], out: ['Prepare for a hard conversation', 'Create a 30-60-90 day plan', 'Give feedback with a simple structure', 'Build a personal leadership habit'], aud: ['New and aspiring managers', 'Team leads', 'Senior professionals growing influence'], seg: ['Check-in and goals', 'Core practices', 'Role-play lab', 'Reflection, Q&A and next steps'] },
  HR: { learn: ['Hiring a strong team with structured interviews', 'Writing clear job descriptions and offers', 'Onboarding that makes people stay', 'Performance reviews and fair feedback', 'Handling conflict and sensitive cases', 'Basics of labour law and HR compliance'], out: ['Build a structured interview scorecard', 'Create a 30-day onboarding checklist', 'Draft a review and feedback template', 'Plan an HR calendar for the year'], aud: ['HR executives and recruiters', 'Founders hiring their first team', 'Team leads who manage people'], seg: ['Check-in and goals', 'Core HR practices', 'Case study lab', 'Q&A and next steps'] },
  'Contact Center': { learn: ['Call flow design and quality scripts', 'Handling difficult customers with empathy', 'Core metrics: AHT, CSAT, FCR and SLA', 'Workforce planning and shift scheduling', 'Quality monitoring and coaching agents', 'Using CRM, IVR and AI assist tools'], out: ['Create a QA scorecard', 'Build a call-handling playbook', 'Plan staffing for peak hours', 'Set up a weekly metrics dashboard'], aud: ['Agents and team leaders', 'QA and training specialists', 'Contact center managers and operations heads'], seg: ['Check-in and goals', 'Core practices', 'Live call simulation', 'Q&A and next steps'] },
  Engineering: { learn: ['Cloud fundamentals and reliable architecture', 'CI/CD pipelines and infrastructure as code', 'Monitoring, logging and incident response', 'Testing strategy and QA automation', 'Data pipelines and database basics', 'Security habits for engineering teams'], out: ['Set up a working CI/CD pipeline', 'Write an incident runbook', 'Design a test plan for a service', 'Draft a simple cloud architecture diagram'], aud: ['Engineers and DevOps beginners', 'QA and support engineers', 'Students moving into tech roles'], seg: ['Check-in and goals', 'Core concepts', 'Hands-on lab', 'Review, Q&A and next steps'] },
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
  mk('fullstack-nextjs-launchpad', 'Full-stack web apps launchpad', 'Development', 'Intermediate', 3499, 'live', 6, '11:00', 180, 88, 40, 215, 'shareef', 'react nextjs javascript web', 'Build and deploy a full-stack web app with routing, data and sign-in.', 'A three-hour guided build covering pages, data fetching, forms and authentication, finishing with a live deployment you can share.'),
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
  mk('hiring-with-structured-interviews', 'Hiring with structured interviews', 'HR', 'Beginner', 1299, 'live', 5, '18:00', 120, 76, 60, 330, 'meera', 'hiring recruitment interviews', 'Hire better with scorecards and consistent interview questions.', 'Build a scorecard, practise interview questions and learn to compare candidates fairly.'),
  mk('hr-onboarding-and-retention', 'Onboarding and retention for HR teams', 'HR', 'Intermediate', 0, 'ondemand', 0, '00:00', 100, 70, null, 335, 'meera', 'onboarding retention culture hr', 'Design an onboarding journey that helps new joiners stay.', 'Recorded modules on onboarding plans, check-ins and exit insights.'),
  mk('contact-center-qa-and-coaching', 'Contact center QA and coaching', 'Contact Center', 'Intermediate', 1499, 'live', 4, '17:00', 120, 78, 50, 190, 'dinesh', 'quality qa coaching agents', 'Score calls fairly and coach agents to improve CSAT.', 'Create a QA scorecard, review sample calls and practise coaching conversations.'),
  mk('handling-difficult-customers', 'Handling difficult customers', 'Contact Center', 'Beginner', 0, 'live', 2, '16:30', 75, 88, 150, 195, 'dinesh', 'customer service empathy de-escalation', 'Stay calm and resolve heated calls with proven techniques.', 'Live role-play on de-escalation, empathy statements and clear closing.'),
  mk('devops-and-cicd-essentials', 'DevOps and CI/CD essentials', 'Engineering', 'Beginner', 1999, 'live', 8, '19:00', 150, 82, 45, 215, 'tarun', 'devops cicd cloud pipelines', 'Set up a working delivery pipeline from commit to deployment.', 'Hands-on lab covering Git, automated tests, builds and deployment.'),
  mk('cloud-architecture-fundamentals', 'Cloud architecture fundamentals', 'Engineering', 'Intermediate', 1799, 'ondemand', 0, '00:00', 160, 74, null, 220, 'tarun', 'cloud aws azure architecture', 'Design reliable, secure and cost-aware cloud systems.', 'Recorded lessons on networking, storage, scaling and monitoring.'),
];

/** Jo real backend server-side rakhta hai. Authorisation check ke bina browser ko kabhi nahi jata. */
const PRIVATE = Object.fromEntries(
  WORKSHOPS.map((w, i) => [w.slug, {
    meetLink: `https://meet.ilmora.example/room/${w.slug}-${1000 + i * 37}`,
    lessons: TPL[w.category].seg.map((t, j) => ({ id: j, title: t, mins: Math.round(w.duration / 4) })),
  }]),
);

/** Workshop ka public shape: pure, server par bhi safe. */
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
  /** Private content tabhi milta hai jab signed-in user registered ho. */
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
   API LAYER (har component sirf `api` se baat karta hai)
   ==================================================================== */
const getAuthToken = () => { try { return window.localStorage.getItem('token'); } catch { return null; } }; // TODO: existing auth storage
const getSessionUser = () => { try { return JSON.parse(window.localStorage.getItem('user') || 'null'); } catch { return null; } }; // TODO: existing auth state

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
// Real registrations pages se pehle load karo (login ke baad / page load par):
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
const BASE = '/workshops';
const PAGES = ['catalog', 'details', 'register', 'confirmation', 'watch', 'dashboard', 'feedback', 'login'];
const NEEDS_W = ['details', 'register', 'confirmation', 'watch'];
const DEFAULT_W = () => (CONFIG.OFFER && CONFIG.OFFER.registerSlug) || '';

/** Internal path se real URL: '/register/abc' -> '/workshops/register?w=abc' */
const toUrl = (p) => {
  const [path, qs] = p.split('?');
  const [a, b] = path.split('/').filter(Boolean);
  // Slug ke hyphens path banenge: prompt-engineering-masterclass -> prompt/engineering/masterclass
  const wPath = (s) => (s && s !== DEFAULT_W() ? '/' + s.split('-').join('/') : '');
  let u = BASE;
  if (a === 'workshops') { if (b) u += '/details' + wPath(b); }
  else if (NEEDS_W.includes(a)) u += '/' + a + wPath(b);
  else if (a) u += '/' + a;
  return qs ? `${u}?${qs}` : u;
};

/** URL ke page naam se internal route parts */
export function partsFromPage(page, w) {
  if (!page) return ['workshops'];
  if (page === 'details') return ['workshops', w || DEFAULT_W()];
  if (NEEDS_W.includes(page)) return [page, w || DEFAULT_W()];
  if (PAGES.includes(page)) return [page];
  return ['workshops'];
}

function parseUrl() {
  // Purane #/ links naye URL par bhej do
  if (window.location.hash.startsWith('#/')) {
    window.history.replaceState(null, '', toUrl(window.location.hash.slice(1)));
  }
    const segs = window.location.pathname.split('/').filter(Boolean).slice(1); // 'workshops' hata do
  const page = segs[0] || '';
  const query = new URLSearchParams(window.location.search);
  const parts = partsFromPage(page, segs.slice(1).join('-') || query.get('w'));
  return { parts, query, raw: parts.join('/') };
}

const RouteCtx = createContext({ parts: ['workshops'], query: new URLSearchParams(), raw: '' });

const navigate = (p, replace = false) => {
  window.history[replace ? 'replaceState' : 'pushState'](null, '', toUrl(p));
  window.dispatchEvent(new Event('wkroute'));
};
const go = (p) => navigate(p);
const replaceRoute = (p) => navigate(p, true);
const useRouter = () => ({ push: go, replace: replaceRoute });
const useSearchParams = () => useContext(RouteCtx).query;

function Link({ href, children, onClick, ...p }) {
  const click = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || p.target === '_blank') return;
    e.preventDefault();
    go(href);
  };
  return <a href={toUrl(href)} onClick={click} {...p}>{children}</a>;
}

function usePathRoute(initialParts) {
  const [r, setR] = useState({ parts: initialParts || ['workshops'], query: new URLSearchParams(), raw: '' });
  useEffect(() => {
    const on = () => setR(parseUrl());
    on();
    window.addEventListener('popstate', on);
    window.addEventListener('wkroute', on);
    return () => { window.removeEventListener('popstate', on); window.removeEventListener('wkroute', on); };
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

  // Login chahiye: pehle safe page par jao, phir site ka popup kholo
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
const CAT_INFO = {
  AI: 'Agents, prompts and AI for work', Development: 'Web, APIs, Git and delivery', Design: 'UX research, Figma and motion',
  Marketing: 'Growth, SEO and brand', Business: 'Finance, pricing and strategy', Leadership: 'Managing people and change',
  HR: 'Hiring, onboarding and people ops', 'Contact Center': 'QA, coaching and customer handling', Engineering: 'Cloud, DevOps and QA engineering',
};

/** Scroll-reveal wrapper (reduced motion mein seedha dikhta hai). */
function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reduce() || typeof IntersectionObserver === 'undefined') { setOn(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`wkrv ${on ? 'wkrv-on' : ''} ${className}`} style={delay ? { transitionDelay: delay + 'ms' } : undefined}>{children}</Tag>;
}

/** Animated counter: viewport mein aate hi ginti shuru. */
function Counter({ to }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (to == null) return undefined;
    if (reduce() || typeof IntersectionObserver === 'undefined') { setV(to); return undefined; }
    let raf = 0, started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 1200);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; run(); } });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{to == null ? '\u2013' : v}</span>;
}

const PlayIcon = ({ size = 28 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden="true" style={{ marginLeft: 3 }}><path d="M7 4l13 8-13 8z" /></svg>;

function Yt({ id, title }) {
  const [on, setOn] = useState(false);
  return (
    <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 14, overflow: 'hidden', background: '#111' }}>
      {on ? <iframe title={title} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        : <button type="button" onClick={() => setOn(true)} aria-label={`Play: ${title}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, cursor: 'pointer', background: `center/cover url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)` }}>
          <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(0,0,0,.25)' }}><span style={{ width: 68, height: 68, borderRadius: '50%', background: '#f97316', display: 'grid', placeItems: 'center' }}><PlayIcon /></span></span>
        </button>}
    </div>
  );
}

/** Workshop ka real cover photo (category ke hisaab se, ya MEDIA.covers / w.coverUrl override). */
const COVER_POS = {
  'ai-agents-from-scratch': '50% 35%',
  'prompt-engineering-masterclass': '50% 35%',
  'growth-marketing-loops': '50% 35%',
};
function WorkshopArt({ w }) {
  const c = CATEGORY_COVER[w.category] || { src: IMG.coding, pos: 'center' };
  const src = MEDIA.covers[w.slug] || w.coverUrl || c.src;
  return <img src={src} alt={`${w.title} workshop`} loading="lazy" style={{ objectPosition: COVER_POS[w.slug] || c.pos }} />;
}

function Avatar({ person, large = false }) {
  const ph = MEDIA.instructors[Object.keys(INSTRUCTORS).find((k) => INSTRUCTORS[k].name === person.name)] || person.photoUrl;
  if (ph) return <img className={`av ${large ? 'lg' : ''}`} src={ph} alt={person.name} loading="lazy" style={{ objectFit: 'cover' }} />;
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
    : <span className="badge">Recorded</span>;

const Skeletons = ({ n = 6, height }) => (
  <>{Array.from({ length: n }, (_, i) => <div key={i} className="skel" style={height ? { height } : undefined} aria-hidden="true" />)}</>
);

const ErrorIcon = () => (
  <svg width="52" height="52" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="32" cy="32" r="26" /><path d="M32 18v17M32 44v2" /></svg>
);

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

const P = {
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  level: <path d="M5 20V14M12 20V9M19 20V4" />,
  play: <path d="M6 3l14 9-14 9z" />,
  video: <><path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 11" /><rect x="2" y="6" width="14" height="12" rx="2" /></>,
  award: <><circle cx="12" cy="8" r="6" /><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" /></>,
  qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4" /></>,
  user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  pen: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,
  hash: <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5M12 15V3" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" /></>,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  compass: <><circle cx="12" cy="12" r="10" /><path d="m16.2 7.8-2.1 6.3-6.3 2.1 2.1-6.3z" /></>,
  select: <><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  present: <path d="M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3M12 16v5M8 21h8" />,
  code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  assess: <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="m9 14 2 2 4-4" /></>,
  trending: <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  sparkles: <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />,
  palette: <><circle cx="13.5" cy="6.5" r="1" /><circle cx="17.5" cy="10.5" r="1" /><circle cx="8.5" cy="7.5" r="1" /><circle cx="6.5" cy="12.5" r="1" /><path d="M12 2a10 10 0 0 0 0 20 2 2 0 0 0 2-2c0-.6-.2-1-.5-1.4a2 2 0 0 1 1.5-3.3H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2z" /></>,
  headset: <><path d="M3 14v-2a9 9 0 0 1 18 0v2" /><path d="M21 15a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2z" /></>,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" /></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
  message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
};
const I = ({ n, s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={n === 'play' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: 'none' }}>{P[n]}</svg>
);
const CAT_ICON = { AI: 'sparkles', Development: 'code', Design: 'palette', Marketing: 'trending', Business: 'briefcase', Leadership: 'compass', HR: 'users', 'Contact Center': 'headset', Engineering: 'cog' };
const Icons = {
  cal: <I n="calendar" />, clock: <I n="clock" />, lvl: <I n="level" />, play: <I n="play" s={13} />, search: <I n="search" s={18} />,
};

function WorkshopCard({ w, registered = false }) {
  const full = w.format === 'live' && w.seatsLeft === 0;
  const featured = w.popularity >= 95;
  return (
    <article className={`card ${featured ? 'featured' : ''}`}>
      <div className="art">
        <WorkshopArt w={w} />
        <div className="badges"><FormatBadge w={w} />{featured && <span className="badge feat">Featured</span>}{w.price === 0 && <span className="badge free">Free</span>}</div>
      </div>
      <div className="cbody">
        <span className="cat">{w.category}</span>
        <h3><Link href={`/workshops/${w.slug}`}>{w.title}</Link></h3>
        <p className="sd">{w.short}</p>
        <div className="inst"><Avatar person={w.instructor} /><span><b>{w.instructor.name}</b><small>{w.instructor.role}</small></span></div>
        <div className="meta">
          {w.format === 'live'
            ? <span>{Icons.cal}{fmtD.format(w.start)}, {fmtT.format(w.start)}</span>
            : <span>{Icons.play}Watch anytime</span>}
          <span>{Icons.clock}{durTxt(w.duration)}</span>
          <span>{Icons.lvl}{w.level}</span>
          {w.seatsLeft != null && <span className={`seat ${w.seatsLeft < 20 ? 'low' : ''}`}><I n="users" s={13} />{w.seatsLeft === 0 ? 'No seats left' : `${w.seatsLeft} seats left`}</span>}
          {w.rating ? <span>Rated {w.rating}/5</span> : null}
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
   PAGE SECTIONS (listing page): har section ko apni real photo / content
   ==================================================================== */
const PERKS = [
  ['award', 'Certificate of completion', 'Issued from verified completion records, with a unique ID.'],
  ['video', 'Session recording', 'Rewatch the workshop from your dashboard after you register.'],
  ['message', 'Live Q&A with your instructor', 'Ask your own questions during live sessions.'],
  ['file', 'Templates and resources', 'Download materials shared by the instructor.'],
  ['bell', 'Reminders', 'Get notified before your live session starts.'],
  ['building', 'Group and corporate batches', 'Bring your team or college to a private session.'],
];
const FAQS = [
  ['Are there any prerequisites?', 'No formal prerequisites for beginner workshops. Each workshop lists its level and what to prepare on its page.'],
  ['When are the live sessions?', 'Live sessions run on Day 0, Day 1 and Day 2, with a bonus live showcase at the end. Exact dates are shown for each cohort.'],
  ['What if I cannot attend a live session?', 'The week is designed around a working schedule: lessons Monday to Friday are self-paced. Registered learners can watch recordings from My learning when the instructor publishes them.'],
  ['How much access do I get to instructors?', 'Instructors are active during live sessions to answer questions and give feedback. They may not reply to every individual message.'],
  ['How much time do I need each week?', 'About 8 hours on each live weekend day and 2 to 3 hours a day for self-paced lessons.'],
  ['What is included?', 'Live sessions, projects, lifetime access to project files, the learner community and a verified certificate after completion.'],
  ['Will I get a certificate?', 'Yes, after your completion is verified. Each certificate has a unique ID and QR code so anyone can check it.'],
  ['Can I get a refund?', 'If the workshop is not for you, request a refund within 24 hours of the session start. See our refund policy.'],
  ['Can my team or college join together?', 'Yes. Contact us for group pricing, private batches and custom workshops.'],
];
function useCountdown(ts) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, ts - now), p = (n) => String(n).padStart(2, '0');
  return [['Days', Math.floor(d / 864e5)], ['Hrs', p(Math.floor(d / 36e5) % 24)], ['Min', p(Math.floor(d / 6e4) % 60)], ['Sec', p(Math.floor(d / 1e3) % 60)]];
}
function Countdown({ ts }) { const c = useCountdown(ts); return <div className="cdn" role="timer">{c.map(([l, v]) => <div key={l}><b>{v}</b><small>{l}</small></div>)}</div>; }
const Faq = () => (
  <div className="faq2">
    <h2 className="faq2-h">Frequently Asked Questions</h2>
    <div className="faq2-list">
      {FAQS.map(([q, a]) => (
        <details key={q}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  </div>
);

const HERO_VIS = {
  a: IMG.studentCollab,   // left polaroid
  b: IMG.mentorGuidance,  // chhoti photo, neeche left
  // main photo = MEDIA.heroPoster (ya MEDIA.heroVideo agar set ho)
};

const HERO3_CSS = `
.wk .hero3 .hero2-bg img{filter:blur(22px) saturate(1.15) brightness(.55);transform:scale(1.12)}
.wk .hero3 .hero2-shade{background:
  radial-gradient(60% 80% at 82% 40%,rgba(249,115,22,.24),transparent 60%),
  radial-gradient(40% 60% at 68% 95%,rgba(22,163,74,.24),transparent 60%),
  linear-gradient(90deg,rgba(8,8,14,.92) 0%,rgba(8,8,14,.72) 55%,rgba(8,8,14,.5) 100%),
  linear-gradient(0deg,rgba(8,8,14,.8),transparent 45%)}
.wk .hero3 .hero2-in{align-items:center;padding-top:44px;padding-bottom:28px}
@media(min-width:960px){.wk .hero3 .hero2-in{grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:36px}}

/* collage stage */
.wk .hv-stage{position:relative;width:100%;max-width:560px;margin-left:auto;aspect-ratio:1/.82}
.wk .hv{position:absolute;transform:translate3d(calc(var(--mx,0) * var(--d,0) * 1px),calc(var(--my,0) * var(--d,0) * 1px),0);transition:transform .25s ease-out}
.wk .hv-f{position:relative;width:100%;height:100%;margin:0;overflow:hidden;border-radius:24px;background:#14141f;border:1px solid rgba(255,255,255,.22);box-shadow:0 26px 54px rgba(0,0,0,.5);transform:rotate(var(--r,0deg));animation:hvin .9s cubic-bezier(.2,.8,.2,1) var(--e,0s) both,hvfloat 7s ease-in-out calc(var(--e,0s) + .9s) infinite}
.wk .hv-f img,.wk .hv-f video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.wk .hv-f::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.5),transparent 55%);pointer-events:none}
@keyframes hvin{from{opacity:0;translate:0 28px}}
@keyframes hvfloat{50%{transform:rotate(var(--r,0deg)) translateY(-9px)}}
.wk .hv-main{--r:2deg;--d:10;--e:.1s;right:0;top:0;width:82%;height:66%;z-index:1}
.wk .hv-a{--r:-6deg;--d:22;--e:.3s;left:0;top:14%;width:33%;aspect-ratio:4/5;z-index:2}
.wk .hv-b{--r:3deg;--d:30;--e:.5s;left:3%;bottom:0;width:28%;aspect-ratio:16/11;z-index:2}
.wk .hv-a .hv-f,.wk .hv-b .hv-f{position:absolute;inset:0;width:auto;height:auto;border:4px solid #fff;border-radius:18px}
.wk .hv-tag{position:absolute;left:10px;bottom:10px;z-index:2;display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:999px;font-size:.66rem;font-weight:800;background:rgba(10,12,30,.76);color:#fff;backdrop-filter:blur(6px);white-space:nowrap}
.wk .hv-main .hv-tag{top:12px;bottom:auto;left:12px}
.wk .hv-tag i{width:7px;height:7px;border-radius:50%;background:#ff4d6d;animation:wkpulse 1.8s infinite}
.wk .hv-tag.ok{background:var(--accent)}
.wk .hv-glow{position:absolute;border-radius:50%;filter:blur(44px);opacity:.55;pointer-events:none}
.wk .hv-glow.o{width:55%;aspect-ratio:1;right:-8%;top:-12%;background:#f97316}
.wk .hv-glow.g{width:40%;aspect-ratio:1;left:8%;bottom:6%;background:#16a34a}
.wk .hv-card{position:absolute;right:0;bottom:0;width:72%;z-index:4;box-shadow:0 20px 44px rgba(0,0,0,.45);animation:hvin .9s cubic-bezier(.2,.8,.2,1) .7s both}
.wk .hv-card .btn{justify-self:start}

@media(max-width:959px){
  /* collage laptop jaisa hi rahega, card uske neeche aayega */
  .wk .hv-stage{display:block;width:100%;max-width:540px;aspect-ratio:auto;margin:0 auto}
  .wk .hv-collage{position:relative;inset:auto;display:block;width:100%;height:0;padding-bottom:82%;margin-bottom:14px}
  .wk .hv-card{position:relative!important;right:auto!important;bottom:auto!important;left:auto!important;top:auto!important;width:100%!important;display:grid;opacity:1;z-index:4}
  .wk .hv-tag{font-size:.6rem;padding:3px 8px}
}
@media(max-width:480px){
  .wk .hv-a{width:36%;top:16%}
  .wk .hv-b{width:34%;left:2%}
  .wk .hv-a .hv-f,.wk .hv-b .hv-f{border-width:3px;border-radius:14px}
  .wk .hv-tag{left:6px;bottom:6px;font-size:.54rem;padding:2px 6px;white-space:normal;line-height:1.15}
  .wk .hv-main .hv-tag{left:8px;top:8px}
}
`;

/** 1. Cinematic hero: left content, right image collage + next-session card. */
function Hero({ data }) {
  const bg = useRef(null);
  const stage = useRef(null);
  useEffect(() => {
    if (reduce()) return undefined;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { if (bg.current) bg.current.style.transform = `translate3d(0,${Math.min(window.scrollY, 700) * 0.18}px,0) scale(1.08)`; });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  // Mouse parallax: photos alag-alag depth par halka sa hilte hain (touch / reduced motion par band)
  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || reduce() || !stage.current) return;
    const r = stage.current.getBoundingClientRect();
    const c = (v) => Math.max(-1, Math.min(1, v));
    stage.current.style.setProperty('--mx', c(((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
    stage.current.style.setProperty('--my', c(((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
  };
  const onLeave = () => {
    if (!stage.current) return;
    stage.current.style.setProperty('--mx', 0);
    stage.current.style.setProperty('--my', 0);
  };

  const upcoming = (data || []).filter((x) => x.format === 'live' && x.start > Date.now()).sort((a, b) => a.start - b.start);
  const next = upcoming[0];
  const stats = [
    ['Workshops', data ? data.length : null],
    ['Live sessions coming up', data ? upcoming.length : null],
    ['Free workshops', data ? data.filter((x) => x.price === 0).length : null],
    ['Topics', data ? new Set(data.map((x) => x.category)).size : null],
  ];

  return (
    <section className="hero2 hero3" aria-labelledby="hero-h" onPointerMove={onMove} onPointerLeave={onLeave}>
      <style dangerouslySetInnerHTML={{ __html: HERO3_CSS }} />
      <div className="hero2-bg" ref={bg}>
        <img src={MEDIA.heroPoster} alt="" />
      </div>
      <div className="hero2-shade" aria-hidden="true" />
      <div className="wrap hero2-in">
        <div>
          <span className="livepill"><i />{data ? `${upcoming.length} live workshops open for registration` : 'Loading live workshops'}</span>
          <h1 id="hero-h">Build real Java full-stack projects. Get certified.</h1>
          <p className="lead">Learn Java, Spring Boot, databases and React by building a working application, step by step. Live build days with working instructors, self-paced lessons in between. Beginner friendly.</p>
          <div className="chips">
            <span className="chip"><I n="code" s={13} />10+ projects</span>
            <span className="chip"><I n="video" s={13} />Live weekend sessions</span>
            <span className="chip"><I n="award" s={13} />Verified certificate</span>
          </div>
          <div className="hero2-cta">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => go(CONFIG.OFFER.registerSlug ? `/register/${CONFIG.OFFER.registerSlug}` : '/catalog')}><I n="award" s={16} />Reserve my seat</button>
            <button type="button" className="btn btn-line btn-lg" onClick={() => scrollToId('wk-roadmap')}><I n="compass" s={15} />See the roadmap</button>
            <button type="button" className="btn btn-line btn-lg" onClick={() => go('/catalog')}><I n="search" s={15} />Browse all workshops</button>
          </div>
        </div>

        <div className="hv-stage" ref={stage}>
                    <div className="hv-collage" aria-hidden="true">
            <span className="hv-glow o" />
            <span className="hv-glow g" />
            <div className="hv hv-main">
              <figure className="hv-f">
                {MEDIA.heroVideo
                  ? <video src={MEDIA.heroVideo} poster={MEDIA.heroPoster} autoPlay muted loop playsInline preload="metadata" />
                  : <img src={MEDIA.heroPoster} alt="" />}
                <span className="hv-tag"><i />Live build days</span>
              </figure>
            </div>
            <div className="hv hv-a">
              <figure className="hv-f">
                <img src={HERO_VIS.a} alt="" loading="lazy" style={{ objectPosition: '50% 40%' }} />
                <span className="hv-tag ok">10+ projects</span>
              </figure>
            </div>
            <div className="hv hv-b">
              <figure className="hv-f">
                <img src={HERO_VIS.b} alt="" loading="lazy" style={{ objectPosition: '50% 40%' }} />
                <span className="hv-tag ok">Verified certificate</span>
              </figure>
            </div>
          </div>
          {next && (
            <aside className="hero2-card hv-card" aria-label="Next live workshop">
              <small>Next live session</small>
              <h3>{next.title}</h3>
              <p>with {next.instructor.name}. {fmtD.format(next.start)}, {fmtT.format(next.start)} IST</p>
              <Countdown ts={next.start} />
              <Link className="btn btn-light btn-sm" href={`/workshops/${next.slug}`}>Reserve my seat</Link>
            </aside>
          )}
        </div>
      </div>
      <div className="wrap">
        <dl className="hero2-stats" style={{ margin: 0 }}>
          {stats.map(([l, v]) => <div key={l}><b><Counter to={v} /></b><span>{l}</span></div>)}
        </dl>
      </div>
    </section>
  );
}

/** 2. Video: real URL ho to play, nahi to clearly-labelled slot (fake video nahi). */
function VideoModal({ v, onClose }) {
  const btn = useRef(null);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', key);
    if (btn.current) btn.current.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', key); };
  }, [onClose]);
  return (
    <div className="vm" role="dialog" aria-modal="true" aria-label={v.title} onClick={onClose}>
      <div className="vm-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="vm-x" ref={btn} onClick={onClose} aria-label="Close video">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        {v.youtube
          ? <iframe title={v.title} src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          : <video src={v.src} poster={v.poster} controls autoPlay playsInline />}
      </div>
    </div>
  );
}
function Experience() {
  const [open, setOpen] = useState(null);
  const playable = (v) => Boolean(v.youtube || v.src);
  return (
    <section className="wrap sec" id="wk-experience" aria-labelledby="xp-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="xp-h">Experience ILM ORA Workshops</h2><p>Illustrative previews of the learning environment. These are not recordings of past ILM ORA events.</p></div></div></Reveal>
      <div className="xp">
        {MEDIA.videos.map((v, i) => (
          <Reveal key={v.id} className={`xp-card ${i === 0 ? 'lead' : ''}`} delay={i * 80}>
            <button type="button" className="xp-btn" disabled={!playable(v)} onClick={() => setOpen(v)} aria-label={playable(v) ? `Play video: ${v.title}` : `${v.title}. Official video not uploaded yet`}>
                            {v.poster
                ? <img src={v.poster} alt={v.alt} loading="lazy" style={{ objectPosition: v.pos || '50% 40%' }} />
                : <video src={`${v.src}#t=0.5`} preload="metadata" muted playsInline aria-hidden="true" tabIndex={-1} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: v.pos || '50% 40%' }} />}
              <span className="xp-shade" />
              {playable(v) && <span className="xp-play"><PlayIcon size={20} /></span>}
              <span className="xp-cap"><small>{v.tag}</small><b>{v.title}</b><em>{playable(v) ? v.text : 'Official ILM ORA video will be added here.'}</em></span>
            </button>
          </Reveal>
        ))}
      </div>
      {open && <VideoModal v={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

/** 3. Topics: real photo tiles, live count from data. */
function TopicTiles({ data }) {
  return (
    <section className="wrap sec" aria-labelledby="top-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="top-h">Popular learning categories</h2><p>Pick a skill area and see every workshop in it.</p></div></div></Reveal>
      <AutoRow label="Popular learning categories">
        {Object.entries(CAT_INFO).map(([c, d]) => {
          const cv = CATEGORY_COVER[c];
          const n = data ? data.filter((w) => w.category === c).length : null;
          return (
            <Link key={c} className="tile" href={`/catalog?cat=${encodeURIComponent(c)}`} onClick={() => setTimeout(() => scrollToId('wk-explore'), 60)}>
              <img src={cv.src} alt="" loading="lazy" style={{ objectPosition: cv.pos }} />
              <div><span className="tic"><I n={CAT_ICON[c]} s={15} /></span><h3>{c}</h3><p>{d}{n != null ? ` (${n})` : ''}</p></div>
            </Link>
          );
        })}
      </AutoRow>
    </section>
  );
}

/** 4. Learning journey: 6 steps, har step ki real photo, scroll reveal. */
function Journey() {
  return (
    <section className="wrap sec" aria-labelledby="jr-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="jr-h">Your learning journey, start to certificate</h2><p>Six steps from finding a workshop to holding a verified ILM ORA certificate.</p></div></div></Reveal>
      <ol className="jr" style={{ listStyle: 'none', padding: 0, margin: '22px 0 0' }}>
        {JOURNEY.map((s, i) => (
          <Reveal as="li" key={s.t} className="jr-step">
            <div className="jr-img"><img src={s.img} alt={s.alt} loading="lazy" style={{ objectPosition: s.pos }} /></div>
            <div><div className="jr-top"><span className="jr-ic"><I n={s.ic} s={16} /></span><span className="jr-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span></div><h3>{s.t}</h3><p>{s.d}</p></div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/** 5. Certificate showcase: real ILM ORA full stack certificate + ceremony photo. */
function CertificateShowcase() {
  const share = () => {
    const url = window.location.origin + window.location.pathname;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
  };
  return (
    <section className="wrap sec" aria-labelledby="ce-h">
      <Reveal className="cert">
        <div>
          <div className="cert-frame">
            <span className="tagc">Sample preview</span>
            <img src={IMG.certFull} alt="Sample ILM ORA Full Stack certificate of completion" loading="lazy" />
          </div>
        </div>
        <div>
          <h2 className="h-xl" id="ce-h">Your skills deserve recognition</h2>
          <p className="muted" style={{ marginTop: 10, maxWidth: '56ch' }}>Finish a workshop and your completion is recorded by ILM ORA. Verified learners receive a certificate they can download and share.</p>
          <ul className="cert-list">
            <li><I n="user" />Your name as registered</li>
            <li><I n="book" />Workshop or course name</li>
            <li><I n="pen" />Instructor signature</li>
            <li><I n="hash" />Unique certificate ID</li>
            <li><I n="calendar" />Issue date</li>
            <li><I n="qr" />QR code to verify it online</li>
          </ul>
          <div className="cert-act">
            <LinkBtn href="/dashboard"><I n="award" s={16} />View my certificates</LinkBtn>
            <button type="button" className="btn btn-ghost" onClick={share}><I n="linkedin" s={16} />Share on LinkedIn</button>
            <button type="button" className="btn btn-ghost" disabled aria-disabled="true" title="Available once your completion is verified"><I n="download" s={16} />Download certificate</button>
          </div>
          <p className="cert-note">The certificate shown is a sample design. Real certificates are generated only from verified completion records, and download unlocks after your completion is confirmed.</p>
        </div>
      </Reveal>
          </section>
  );
}

/** 6. Team + workshop instructors (instructors backend data se). */
function Mentors() {
  return (
    <AutoRow label="ILM ORA mentors">
      {MENTORS.map((m) => (
        <figure className="mentor mentor-i" key={m.name} style={{ margin: 0 }}>
          <div className="ph"><img src={m.img} alt={`${m.name}${m.role ? `, ${m.role}` : ''} at ILM ORA`} loading="lazy" style={{ objectPosition: m.pos }} draggable="false" /></div>
          <figcaption>
            <h3>{m.name}</h3>
            <p className="role">{m.role}</p>
            {m.org && <p className="org"><span className="ilm-g">ILM</span> <span className="ora-o">ORA</span></p>}
          </figcaption>
        </figure>
      ))}
    </AutoRow>
  );
}
function Instructors({ data }) {
  const list = useMemo(() => {
    const m = new Map();
    (data || []).forEach((w) => {
      const e = m.get(w.instructor.name) || { p: w.instructor, n: 0, slug: w.slug };
      e.n += 1; m.set(w.instructor.name, e);
    });
    return [...m.values()];
  }, [data]);
  return (
    <section className="wrap sec" aria-labelledby="in-h">
            <Reveal><div className="sechead"><div><h2 className="h-xl" id="in-h">Our mentors are the best at what they teach</h2><p>The founders and instructors who run your sessions.</p></div></div></Reveal>
      <Mentors />
      {list.length > 0 && (
        <Reveal>
          <div className="sechead" style={{ marginTop: 14 }}><div><h2 className="h-xl">Instructors teaching now</h2></div></div>
          <ul className="ilist">
            {list.map(({ p, n, slug }) => (
              <li key={p.name}>
                <Avatar person={p} />
                <span><b><Link href={`/workshops/${slug}`}>{p.name}</Link></b><small>{p.role}{p.years ? `, ${p.years}+ years` : ''}. {n} workshop{n === 1 ? '' : 's'}</small></span>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}

/** 7. Corporate training: real corporate training photo. */
function Corporate() {
  return (
    <section className="wrap sec" aria-labelledby="co-h">
      <Reveal className="band">
        <img src={IMG.corp} alt="ILM ORA corporate training workshop in progress" loading="lazy" />
        <div className="band-in">
          <h2 id="co-h">Corporate training for your team</h2>
          <p>Private batches, group pricing and custom workshops for companies and colleges, delivered live by ILM ORA instructors.</p>
          <div className="cert-act">
            <a className="btn btn-primary btn-lg" href={`mailto:${CONFIG.CONTACT_EMAIL}?subject=Group%20workshop%20enquiry`}><I n="mail" s={16} />Talk to us</a>
            <button type="button" className="btn btn-ghost btn-lg" onClick={() => go('/catalog')}><I n="search" s={16} />Browse workshops</button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FeedbackCard({ f, onPlay }) {
  const playable = Boolean(f.youtube || f.video);
  const poster = f.poster || (f.youtube ? `https://i.ytimg.com/vi/${f.youtube}/hqdefault.jpg` : '');
  return (
    <figure className="fb">
      {playable && (
        <button type="button" className="fb-vid" aria-label={`Play feedback from ${f.name}`}
          onClick={() => onPlay({ title: `${f.name} feedback`, youtube: f.youtube, src: f.video, poster })}>
          {poster ? <img src={poster} alt="" loading="lazy" /> : <span className="fb-ph" />}
                  <span className="fb-play"><PlayIcon size={20} /></span>
          <span className="fb-watch">Watch video</span>
        </button>
      )}
      {f.shot && <img className="fb-shot" src={f.shot} alt={`Feedback screenshot from ${f.name}`} loading="lazy" />}
      <figcaption className="fb-body">
        <div className="fb-head">
          {f.photo
            ? <img className="av" src={f.photo} alt={f.name} loading="lazy" />
            : <span className="av" style={{ background: 'linear-gradient(135deg,#f97316,#c2410c)' }} aria-hidden="true">{initials(f.name)}</span>}
          <span><b>{f.name}</b>{f.role && <small>{f.role}</small>}</span>
          {f.source && SOURCE_LABEL[f.source] && <span className="fb-src" title={f.source}>{SOURCE_LABEL[f.source]}</span>}
        </div>
                {f.sample && <span className="fb-sample">Sample preview, not a real review</span>}
        {f.text && <p className="fb-text">{'\u201C'}{f.text}{'\u201D'}</p>}
        {(f.date || f.rating) && (
          <div className="fb-foot">
            <span>{f.date || ''}</span>
            {f.rating ? <span className="fb-stars" aria-label={`${f.rating} out of 5`}>{'\u2605'.repeat(f.rating)}</span> : null}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

/** Home par feedback wall: pehle FEEDBACK_PREVIEW cards, neeche See more -> #/feedback */
function WallOfLove() {
  const [open, setOpen] = useState(null);
  const list = FEEDBACK.slice(0, FEEDBACK_PREVIEW);
  return (
    <section className="wrap sec" id="wk-feedback" aria-labelledby="wl-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl wl-title" id="wl-h">Ambitious people <svg className="wl-heart" width="26" height="26" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="0"><stop offset="50%" stopColor="#16a34a" /><stop offset="50%" stopColor="#f97316" /></linearGradient></defs><path fill="url(#hg)" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.6 4.5 6.3 4.5c2 0 3.6 1 4.7 2.6l1 1.4 1-1.4c1.1-1.6 2.7-2.6 4.7-2.6 3.7 0 5.4 3.9 3.9 7.3C19.500 16.400 12 21 12 21z" /></svg> <span className="wl-ilm">ILM</span> <span className="wl-ora">ORA</span></h2><p>Real feedback from learners who built with us.</p></div></div></Reveal>
      {list.length > 0 ? (
        <>
          <div className="wall">
            {list.map((f, i) => <Reveal key={f.name + i} delay={(i % 4) * 60}><FeedbackCard f={f} onPlay={setOpen} /></Reveal>)}
          </div>
                   <div className="wall-more"><button type="button" className="btn btn-primary btn-lg" onClick={() => go('/feedback')}>{FEEDBACK.length > FEEDBACK_PREVIEW ? `See more (${FEEDBACK.length - FEEDBACK_PREVIEW}+)` : 'See all feedback'}</button></div>
        </>
      ) : <p className="empty-note">Written feedback and video testimonials will appear here once learners have given permission to publish them.</p>}
      {open && <VideoModal v={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

/** Poori feedback wall (#/feedback) with Load more */
function FeedbackPage() {
  const [open, setOpen] = useState(null);
  const [shown, setShown] = useState(FEEDBACK_PAGE);
  const list = FEEDBACK.slice(0, shown);
  return (
    <div className="wrap" style={{ paddingTop: 18 }}>
      <Link className="btn btn-ghost btn-sm" href="/workshops">{'\u2190'} Back to workshops</Link>
      <div className="sechead" style={{ marginTop: 18 }}><div><h1>What our learners say</h1><p>{FEEDBACK.length} real feedback{FEEDBACK.length === 1 ? '' : 's'} from ILM ORA workshops.</p></div></div>
      {list.length > 0
        ? <div className="wall">{list.map((f, i) => <div key={f.name + i} className="wkrv wkrv-on"><FeedbackCard f={f} onPlay={setOpen} /></div>)}</div>
        : <p className="empty-note">Feedback will appear here once learners have given permission to publish it.</p>}
      {shown < FEEDBACK.length && <div className="wall-more"><button type="button" className="btn btn-ghost btn-lg" onClick={() => setShown((s) => s + FEEDBACK_PAGE)}>Load more</button></div>}
      {open && <VideoModal v={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

/** 8. Gallery + learner stories (sirf real; abhi photos, testimonials MEDIA.stories se). */
function Community() {
  return (
    <section className="wrap sec" aria-labelledby="gl-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="gl-h">Learner community and success stories</h2><p>Real moments from ILM ORA workshops.</p></div></div></Reveal>
            <AutoRow label="Learner community photos">
        {GALLERY.map((g) => (
          <figure className="gal-i" key={g.cap}><img src={g.img} alt={g.cap} loading="lazy" style={{ objectPosition: g.pos }} /><figcaption>{g.cap}</figcaption></figure>
        ))}
      </AutoRow>
          </section>
  );
}

function Perks() {
  return (
    <section className="wrap sec" aria-labelledby="pk-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="pk-h">Included with every workshop</h2></div></div></Reveal>
      <Reveal><ol className="plist">{PERKS.map(([ic, t, d]) => <li key={t}><div className="pi"><I n={ic} s={16} /></div><b>{t}</b><span>{d}</span></li>)}</ol></Reveal>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="wrap sec" aria-labelledby="fc-h">
      <Reveal className="band" style={{ minHeight: 300 }}>
        <img src={IMG.celebration} alt="Learners celebrating together at an ILM ORA workshop" loading="lazy" />
        <div className="band-in">
          <h2 id="fc-h">Your next skill is one workshop away</h2>
          <p>Pick a session, register in about a minute and start building.</p>
                    <div className="cert-act">
            <button type="button" className="btn btn-primary btn-lg" onClick={() => go('/catalog')}><I n="search" s={16} />Explore workshops</button>
            <a className="btn btn-ghost btn-lg" href={`mailto:${CONFIG.CONTACT_EMAIL}?subject=Workshop%20enquiry`}><I n="mail" s={16} />Ask a question</a>
          </div>
          <div className="cert-act">
            <LinkBtn href="/dashboard"><I n="award" s={16} />View my certificates</LinkBtn>
            <button type="button" className="btn btn-ghost btn-lg" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + window.location.pathname)}`, '_blank', 'noopener,noreferrer')}><I n="linkedin" s={16} />Share on LinkedIn</button>
            <button type="button" className="btn btn-ghost btn-lg" disabled aria-disabled="true" title="Available once your completion is verified"><I n="download" s={16} />Download certificate</button>
          </div>
          <p className="cert-note">The certificate shown is a sample design. Real certificates are generated only from verified completion records, and download unlocks after your completion is confirmed.</p>
        </div>
      </Reveal>
    </section>
  );
}

function DetailExtras({ w }) {
  const live = w.format === 'live' && w.start;
  const iso = (t) => new Date(t).toISOString().replace(/[-:]|\.\d{3}/g, '');
  const gcal = live ? `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(w.title)}&dates=${iso(w.start)}/${iso(w.start + w.duration * 6e4)}` : null;
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const share = async () => { try { navigator.share ? await navigator.share({ title: w.title, url }) : await navigator.clipboard.writeText(url); } catch (e) {} };
  return (
    <>
      {live && w.start > Date.now() && <div className="nl" style={{ margin: '12px 0 0' }}><div><p style={{ fontWeight: 700 }}>Starts in</p></div><Countdown ts={w.start} /></div>}
      <div className="panel glass" style={{ marginTop: 12 }}>
        <h2>Your certificate</h2>
        <div className="certmini">
          <img src={IMG.certFull} alt="Sample ILM ORA certificate of completion" loading="lazy" />
          <div>
            <p>Complete this workshop and receive an ILM ORA certificate with a unique ID and QR verification.</p>
            <p className="muted" style={{ fontSize: '.8rem', marginTop: 8 }}>Sample design shown. Your certificate is generated from your verified completion record.</p>
          </div>
        </div>
      </div>
      <div className="panel glass"><h2>What you get</h2><ol className="plist">{PERKS.map(([ic, t, d]) => <li key={t}><div className="pi"><I n={ic} s={16} /></div><b>{t}</b><span>{d}</span></li>)}</ol>
        <div className="share">{gcal && <a className="btn btn-ghost btn-sm" href={gcal} target="_blank" rel="noopener noreferrer">Add to calendar</a>}<button type="button" className="btn btn-ghost btn-sm" onClick={share}>Share</button></div></div>
      <Faq />
    </>
  );
}

/* ====================================================================
   PAGES
   ==================================================================== */
/* ---------- B. CSS (WK_CSS ke baad naya const) ---------- */
const GS_CSS = `
.wk .offer{background:linear-gradient(90deg,#c2410c,var(--brand));color:#fff;text-align:center;font-weight:700;font-size:.8rem;padding:7px 14px;display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap}
.wk .offer .cdn div{background:rgba(0,0,0,.25);padding:2px 7px;min-width:40px}.wk .offer .cdn b{font-size:.85rem}.wk .offer .cdn small{font-size:.58rem}
.wk .chips{display:flex;gap:7px;flex-wrap:wrap;margin-top:14px}
.wk .chip{display:inline-flex;gap:6px;align-items:center;padding:5px 11px;border-radius:999px;font-size:.76rem;font-weight:700;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);color:#fff}
.wk .fmt{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-top:6px}
.wk .fmt div{padding:12px;border-radius:12px;border:1px solid var(--ln);background:var(--solid)}
.wk .fmt b{display:block;font-size:.95rem;color:var(--brand)}.wk .fmt span{font-size:.76rem;color:var(--muted)}
.wk .two-opt{display:grid;gap:12px}
@media(min-width:760px){.wk .two-opt{grid-template-columns:1fr 1fr}}
.wk .opt{padding:16px;border-radius:14px;border:1px solid var(--ln);background:var(--solid)}
.wk .opt.bad{border-color:color-mix(in srgb,var(--err) 40%,var(--ln))}.wk .opt.good{border-color:var(--ok);background:color-mix(in srgb,var(--ok) 6%,var(--solid))}
.wk .opt h3{margin-bottom:8px}.wk .opt ul{margin:0;padding-left:18px;font-size:.84rem;color:var(--muted);display:grid;gap:5px}
.wk .pain{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;margin-top:6px}
.wk .pain>div{padding:13px;border-radius:12px;border:1px solid var(--ln);background:var(--solid)}
.wk .pain .pi{grid-row:auto;width:28px;height:28px;min-height:0;padding:0;border:0;border-radius:8px;margin-bottom:8px;display:grid;place-items:center;background:color-mix(in srgb,var(--brand) 12%,transparent);color:var(--brand)}.wk .pain b{display:block;font-size:.9rem}.wk .pain span{font-size:.78rem;color:var(--muted)}
.wk .rm{position:relative;display:grid;gap:12px;margin-top:16px;padding-left:22px}
.wk .rm::before{content:"";position:absolute;left:7px;top:6px;bottom:6px;width:2px;background:linear-gradient(var(--brand),var(--accent));border-radius:2px}
.wk .rm-day{position:relative;padding:14px;border-radius:14px;border:1px solid var(--ln);background:var(--solid);box-shadow:var(--shadow)}
.wk .rm-day::before{content:"";position:absolute;left:-22px;top:18px;width:16px;height:16px;border-radius:50%;background:var(--brand);border:3px solid var(--bg)}
.wk .rm-day.brk::before{background:var(--accent)}
.wk .rm-top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:.72rem;font-weight:800}
.wk .rm-top .d{color:var(--brand)}.wk .rm-top .l{padding:2px 8px;border-radius:999px;background:#ff4d6d;color:#fff}.wk .rm-top .s{padding:2px 8px;border-radius:999px;background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--ok)}.wk .rm-top .t{color:var(--muted);font-weight:600}
.wk .rm-day h3{margin:6px 0 4px;font-size:1rem}.wk .rm-day>p{color:var(--muted);font-size:.84rem;max-width:70ch}
.wk .proj{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-top:10px}
.wk .proj div{padding:9px 11px;border-radius:10px;background:color-mix(in srgb,var(--brand) 8%,transparent);font-size:.78rem}
.wk .proj b{display:block;font-size:.84rem}.wk .proj span{color:var(--muted)}
/* BIG INFINITE MOVING TOOLS MARQUEE */
.wk .tools-marquee{
  position:relative;
  width:100%;
  overflow:hidden;
  margin-top:18px;
  padding:12px 0 20px;
  -webkit-mask-image:linear-gradient(
    90deg,
    transparent,
    #000 5%,
    #000 95%,
    transparent
  );
  mask-image:linear-gradient(
    90deg,
    transparent,
    #000 5%,
    #000 95%,
    transparent
  );
}

.wk .tools-track{
  display:flex;
  align-items:stretch;
  gap:18px;
  width:max-content;
  animation:tools-marquee-move 32s linear infinite;
  will-change:transform;
}

.wk .tools-marquee:hover .tools-track{
  animation-play-state:paused;
}

.wk .tool{
  flex:0 0 180px;
  min-height:125px;
  padding:18px 14px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:12px;
  border-radius:18px;
  border:1px solid var(--ln);
  background:var(--solid);
  box-shadow:var(--shadow);
  font-size:.95rem;
  font-weight:800;
  text-align:center;
  transition:transform .3s,border-color .3s,box-shadow .3s;
}

.wk .tool:hover{
  transform:translateY(-7px) scale(1.04);
  border-color:var(--brand);
  box-shadow:0 14px 30px color-mix(in srgb,var(--brand) 20%,transparent);
}

/* Large, clearly visible tool logos */
.wk .tool img{
  display:block;
  width:110px !important;
  height:65px !important;
  max-width:100%;
  margin:0 auto !important;
  object-fit:contain;
  object-position:center;
  flex-shrink:0;
  background:transparent;
  border-radius:8px;
}

/* Bigger cards */
.wk .tool{
  flex:0 0 200px;
  min-height:155px;
  padding:20px 14px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:14px;
  border-radius:18px;
  border:1px solid var(--ln);
  background:var(--solid);
  box-shadow:var(--shadow);
  font-size:1rem;
  font-weight:800;
  text-align:center;
}

/* Mobile */
@media(max-width:640px){
  .wk .tool{
    flex-basis:165px;
    min-height:135px;
  }

  .wk .tool img{
    width:90px !important;
    height:58px !important;
  }
}

@keyframes tools-marquee-move{
  from{transform:translateX(0)}
  to{transform:translateX(-50%)}
}

@media(max-width:640px){
  .wk .tools-track{gap:12px;animation-duration:25s}
  .wk .tool{
    flex-basis:145px;
    min-height:110px;
    padding:14px 10px;
    font-size:.85rem;
  }
  .wk .tool img{
    width:42px !important;
    height:42px !important;
  }
}

@media(prefers-reduced-motion:reduce){
  .wk .tools-marquee{overflow-x:auto}
  .wk .tools-track{animation:none}
}
.wk .price-card{display:grid;gap:16px;padding:clamp(16px,3vw,28px);border-radius:18px;border:2px solid var(--brand);background:var(--solid);box-shadow:var(--shadow)}
@media(min-width:860px){.wk .price-card{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:center}}
.wk .pc-price{font-size:clamp(2rem,5vw,2.8rem);font-weight:800;line-height:1}
.wk .pc-price s{font-size:1.1rem;color:var(--muted);font-weight:600;margin-left:8px}
.wk .pc-note{font-size:.78rem;color:var(--muted);margin-top:8px}
.wk .pc-refund{margin-top:12px;padding:9px 12px;border-radius:10px;font-size:.78rem;font-weight:600;background:color-mix(in srgb,var(--ok) 10%,transparent);border:1px solid var(--ok)}
.wk .gate{display:grid;gap:8px;font-size:.86rem}
.wk .mq{overflow:hidden;width:100vw;margin-left:calc(50% - 50vw);padding:22px 0;background:transparent;border:0}
.wk .mq-track{display:flex;align-items:center;gap:22px;width:max-content;margin:0;padding:0;list-style:none;animation:wkmq 45s linear infinite;will-change:transform}
.wk .mq-tile{display:grid;place-items:center;min-width:170px;height:84px;padding:0 22px;border-radius:14px;background:linear-gradient(135deg,#14141f,#0b0b10);color:#fff;font-weight:800;font-size:1.02rem;letter-spacing:-.01em;white-space:nowrap;box-shadow:0 6px 18px rgba(20,12,4,.18);border-bottom:3px solid var(--brand)}
.wk .mq:hover .mq-track,.wk .mq:focus-within .mq-track{animation-play-state:paused}
.wk .mq-logo{flex:none;padding:0;background:none;border:0;box-shadow:none}
.wk .mq-logo img{display:block;width:auto;height:auto;max-width:200px;max-height:104px;border-radius:14px;object-fit:contain;box-shadow:0 6px 18px rgba(20,12,4,.18)}
@keyframes wkmq{to{transform:translateX(calc(-50% - 11px))}}
@media(prefers-reduced-motion:reduce){.wk .mq-track{animation:none;flex-wrap:wrap;width:auto;justify-content:center}.wk .mq-logo[aria-hidden=true]{display:none}}
.wk .mentors{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:6px;width:100%}
@media(max-width:900px){.wk .mentors{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:480px){.wk .mentors{gap:10px}}
.wk .mentors>.wkrv{min-width:0}
.wk .mentor{display:flex;flex-direction:column;gap:3px;padding:14px;border-radius:14px;border:1px solid var(--ln);background:var(--solid);box-shadow:var(--shadow);transition:transform .3s,box-shadow .3s;width:100%}
.wk .mentor:hover{transform:translateY(-4px);box-shadow:0 16px 32px color-mix(in srgb,var(--brand) 20%,rgba(60,25,0,.16))}
.wk .mentor .ph{aspect-ratio:1/1;border-radius:10px;overflow:hidden;background:#1a1a22;margin-bottom:10px}
.wk .mentor .ph img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
.wk .mentor:hover .ph img{transform:scale(1.05)}
.wk .mentor h3{font-size:.95rem}
.wk .mentor .role{font-size:.76rem;color:var(--muted);min-height:1.2em}
.wk .mentor .org{margin-top:8px;padding-top:8px;border-top:1px dashed var(--ln);font-size:.78rem;font-weight:800;color:var(--brand);letter-spacing:.02em}
.wk .wall{columns:1;column-gap:14px;margin-top:6px}
@media(min-width:560px){.wk .wall{columns:2}}
@media(min-width:900px){.wk .wall{columns:3}}
@media(min-width:1250px){.wk .wall{columns:4}}
.wk .wall>.wkrv{break-inside:avoid;margin:0 0 14px}
.wk .fb{margin:0;overflow:hidden;border-radius:14px;border:1px solid var(--ln);background:var(--solid);box-shadow:var(--shadow);break-inside:avoid}
.wk .fb-vid{position:relative;display:block;width:100%;aspect-ratio:16/10;border:0;padding:0;cursor:pointer;background:#111;overflow:hidden}
.wk .fb-vid img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s}
.wk .fb-vid:hover img{transform:scale(1.05)}
.wk .fb-ph{position:absolute;inset:0;background:linear-gradient(135deg,#1a1a22,#2b2b38)}
.wk .fb-play{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:var(--brand);display:grid;place-items:center;box-shadow:0 0 0 6px rgba(249,115,22,.28)}
.wk .fb-shot{display:block;width:100%;height:auto}
.wk .fb-body{padding:12px 13px 13px;display:grid;gap:8px}
.wk .fb-head{display:flex;gap:9px;align-items:center}
.wk .fb-head .av{width:34px;height:34px;font-size:.72rem;object-fit:cover}
.wk .fb-head b{display:block;font-size:.84rem;line-height:1.2}
.wk .fb-head small{display:block;font-size:.7rem;color:var(--muted);line-height:1.25}
.wk .fb-src{margin-left:auto;flex:none;width:22px;height:22px;border-radius:5px;background:#1f1f2b;color:#fff;font-size:.62rem;font-weight:800;display:grid;place-items:center}
.wk .fb-text{font-size:.82rem;color:var(--text);line-height:1.55}
.wk .fb-foot{display:flex;justify-content:space-between;gap:8px;font-size:.7rem;color:var(--muted)}
.wk .fb-stars{color:#f5a623;letter-spacing:1px}
.wk .wall-more{display:flex;justify-content:center;margin-top:10px}
.wk .fb-sample{justify-self:start;padding:2px 8px;border-radius:999px;font-size:.64rem;font-weight:700;background:color-mix(in srgb,var(--brand) 14%,transparent);color:var(--brand)}
.wk .row.dragging{cursor:grabbing;user-select:none}
.wk .row .cine{position:relative;flex:0 0 min(360px,78vw);aspect-ratio:4/5;border-radius:20px;overflow:hidden;background:#111318;color:#fff;box-shadow:0 14px 34px rgba(8,8,14,.28);border:1px solid rgba(255,255,255,.08);cursor:grab;transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s}
.wk .row .cine:hover{transform:translateY(-6px) scale(1.02);box-shadow:0 22px 46px rgba(8,8,14,.42),0 0 0 1px rgba(249,115,22,.55),0 0 34px rgba(249,115,22,.28)}
.wk .cine img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.1);animation:wkkb 16s ease-in-out infinite alternate;transition:filter .45s;user-select:none;-webkit-user-drag:none}
.wk .cine:hover img{filter:brightness(1.08) saturate(1.1)}
@keyframes wkkb{from{transform:scale(1.1) translate3d(-1.5%,0,0)}to{transform:scale(1.2) translate3d(1.5%,-1%,0)}}
.wk .cine-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(11,12,18,.94) 0%,rgba(11,12,18,.55) 42%,rgba(11,12,18,.05) 72%);pointer-events:none}
.wk .cine::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--brand),var(--accent))}
.wk .cine-in{position:absolute;left:0;right:0;bottom:0;padding:18px 18px 20px;display:grid;gap:7px}
.wk .cine-tag{justify-self:start;padding:3px 10px;border-radius:999px;font-size:.68rem;font-weight:800;letter-spacing:.02em;background:var(--brand);color:#fff;box-shadow:0 0 16px rgba(249,115,22,.5)}
.wk .cine h3{color:#fff;font-size:1.15rem;line-height:1.2}
.wk .cine p{color:rgba(255,255,255,.82);font-size:.84rem;line-height:1.5;max-width:34ch}
@media(max-width:640px){.wk .row .cine{aspect-ratio:3/4}.wk .cine h3{font-size:1.02rem}}
.wk .cj{position:relative;overflow:hidden;width:100vw;margin-left:calc(50% - 50vw);padding:34px 0 52px;cursor:grab;touch-action:pan-y;user-select:none}
.wk .cj.dragging{cursor:grabbing}
.wk .cj-track{position:relative;display:flex;gap:30px;width:max-content;will-change:transform}
.wk .cj-card{position:relative;flex:none;width:min(620px,80vw);aspect-ratio:16/10;border-radius:22px;overflow:hidden;color:#fff;background:#0e0e16;border:1px solid rgba(255,255,255,.1);box-shadow:0 18px 44px rgba(8,8,14,.34);will-change:transform,opacity;transform-origin:50% 50%}
.wk .cj-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;-webkit-user-drag:none;pointer-events:none}
.wk .cj-card::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,8,14,.94) 0%,rgba(8,8,14,.72) 42%,rgba(8,8,14,.1) 100%)}
.wk .cj-card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;z-index:2;background:linear-gradient(90deg,var(--brand),var(--accent))}
.wk .cj-in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:center;gap:9px;padding:clamp(16px,3vw,34px);max-width:62%}
.wk .cj-top{display:flex;gap:8px;align-items:center;font-size:.7rem;font-weight:800}
.wk .cj-top .n{color:#ffb27a;letter-spacing:.04em}
.wk .cj-top .tg{padding:2px 9px;border-radius:999px;background:var(--brand);color:#fff}
.wk .cj-card h3{color:#fff;font-size:clamp(1.05rem,2.2vw,1.55rem);line-height:1.15}
.wk .cj-card p{color:rgba(255,255,255,.82);font-size:clamp(.78rem,1.2vw,.9rem);line-height:1.5}
@media(max-width:640px){.wk .cj-card{aspect-ratio:4/5}.wk .cj-in{max-width:100%;justify-content:flex-end}.wk .cj-card::before{background:linear-gradient(0deg,rgba(8,8,14,.95) 0%,rgba(8,8,14,.55) 55%,rgba(8,8,14,.05) 100%)}}
@media(prefers-reduced-motion:reduce){.wk .cj{overflow-x:auto;cursor:auto}.wk .cj-track{transform:none!important}}
.wk .cj{position:relative;overflow:hidden;width:100vw;margin-left:calc(50% - 50vw);padding:34px 0 52px;cursor:grab;touch-action:pan-y;user-select:none}
.wk .cj.dragging{cursor:grabbing}
.wk .cj-track{position:relative;display:flex;gap:30px;width:max-content;will-change:transform}
.wk .cj-card{position:relative;flex:none;width:min(620px,80vw);aspect-ratio:16/10;border-radius:22px;overflow:hidden;color:#fff;background:#0e0e16;border:1px solid rgba(255,255,255,.1);box-shadow:0 18px 44px rgba(8,8,14,.34);will-change:transform,opacity;transform-origin:50% 50%}
.wk .cj-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;-webkit-user-drag:none;pointer-events:none}
.wk .cj-card::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(8,8,14,.94) 0%,rgba(8,8,14,.72) 42%,rgba(8,8,14,.1) 100%)}
.wk .cj-card::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;z-index:2;background:linear-gradient(90deg,var(--brand),var(--accent))}
.wk .cj-in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;justify-content:center;gap:9px;padding:clamp(16px,3vw,34px);max-width:62%}
.wk .cj-top{display:flex;gap:8px;align-items:center;font-size:.7rem;font-weight:800}
.wk .cj-top .n{color:#ffb27a;letter-spacing:.04em}
.wk .cj-top .tg{padding:2px 9px;border-radius:999px;background:var(--brand);color:#fff}
.wk .cj-card h3{color:#fff;font-size:clamp(1.05rem,2.2vw,1.55rem);line-height:1.15}
.wk .cj-card p{color:rgba(255,255,255,.82);font-size:clamp(.78rem,1.2vw,.9rem);line-height:1.5}
@media(max-width:640px){.wk .cj-card{aspect-ratio:4/5}.wk .cj-in{max-width:100%;justify-content:flex-end}.wk .cj-card::before{background:linear-gradient(0deg,rgba(8,8,14,.95) 0%,rgba(8,8,14,.55) 55%,rgba(8,8,14,.05) 100%)}}
@media(prefers-reduced-motion:reduce){.wk .cj{overflow-x:auto;cursor:auto}.wk .cj-track{transform:none!important}}
`;


/* ---------- C. DATA + COMPONENTS (WorkshopsList se pehle paste) ---------- */
/** Har cheez yahan se edit karo. Naam / projects apne real syllabus ke hisaab se badlo. */
const AUDIENCE_PAIN = [
  ['code', 'Learn Java but never build', 'Syntax aata hai, par ek poora working project portfolio mein nahi hota.'],
  ['book', 'Theory without practice', 'OOP aur collections yaad hain, par real backend ya API banana nahi aata.'],
  ['compass', 'No clear full-stack roadmap', 'Pata nahi Java ke baad Spring Boot, database aur frontend kis order mein seekhein.'],
  ['users', 'No mentor to ask', 'Error par atak jaate ho aur jawab dene wala koi nahi.'],
  ['award', 'Nothing to show recruiters', 'Skills hain, par GitHub project aur verified certificate nahi.'],
];

const ROADMAP = [
  { day: 'DAY 0', when: 'Friday', live: true, time: '7PM to 9PM', title: 'Onboarding: set up your Java environment', desc: 'JDK, IDE and Git setup, the full-stack roadmap and your cohort. Ready to code from Day 1.', projects: [] },
  { day: 'DAY 1', when: 'Saturday', live: true, time: '10AM to 7PM', title: 'Core Java and OOP, with your first project', desc: 'Classes, objects, collections and clean code, applied to a real console application.', projects: [['Console app', 'A working Java application'], ['OOP design', 'Classes that model a real problem'], ['GitHub repo', 'Your code saved and versioned']] },
  { day: 'DAY 2', when: 'Sunday', live: true, time: '10AM to 7PM', title: 'Backend: Spring Boot, REST APIs and database', desc: 'Build an API, connect it to a database and test it like a professional.', projects: [['REST API', 'Create, read, update and delete'], ['Database schema', 'Tables and relationships'], ['Postman collection', 'Test every endpoint']] },
  { day: 'DAY 3', when: 'Monday', live: false, time: 'Self-paced', title: 'Data layer: JPA, validation and error handling', desc: 'Guided lessons to make your backend reliable and production-minded.', projects: [['Entity mapping', 'Java objects to database rows'], ['Validation and errors', 'Clear API responses']] },
  { day: 'DAY 4', when: 'Tuesday', live: false, time: 'Self-paced', title: 'Frontend: connect a React UI to your API', desc: 'Build screens and call your own backend end to end.', projects: [['React screens', 'List, form and detail pages'], ['API integration', 'UI talking to your Spring Boot backend']] },
  { day: 'DAY 5', when: 'Break day', live: false, time: 'Catch-up', title: 'Catch up with your cohort', desc: 'Share progress, compare notes and unblock yourself before the final stretch.', projects: [], brk: true },
  { day: 'DAY 6', when: 'Thursday', live: false, time: 'Self-paced', title: 'Capstone: build your full-stack application', desc: 'Plan and build the project you will present: backend, database and frontend together.', projects: [['Capstone app', 'Your best end-to-end work'], ['Demo walkthrough', 'A short recorded demo']] },
  { day: 'DAY 7', when: 'Friday', live: false, time: 'Self-paced', title: 'Deploy and assessment', desc: 'Put your application online and get instructor review of your completed builds.', projects: [['Live deployment', 'A link you can share'], ['Assessment', 'Instructor-verified completion']] },
  { day: 'BONUS', when: 'Saturday', live: true, time: 'Evening live', title: 'Showcase and interview readiness', desc: 'Present your capstone, polish your GitHub and resume, and practise common Java interview questions.', projects: [['GitHub and resume', 'Recruiter-ready profile'], ['Mock interview round', 'Practice with feedback']] },
];


const INCLUDED = [
  'Live sessions with working instructors',
  'Build a real Java full-stack project, not just watch',
  'Lifetime access to project files and templates',
  'Private learner community',
  'Instructor feedback and Q&A',
  'Verified ILM ORA certificate with unique ID and QR',
];

function OfferStrip() {
  const o = CONFIG.OFFER;
  const c = useCountdown(o && o.startsAt ? o.startsAt : Date.now());
  if (!o || !o.on) return null;
  return (
    <div className="offer" role="note">
      <span>{o.banner}</span>
      {o.startsAt && o.startsAt > Date.now() && <span className="cdn" role="timer">{c.map(([l, v]) => <div key={l}><b>{v}</b><small>{l}</small></div>)}</span>}
            <button type="button" className="btn btn-light btn-sm" onClick={() => go(o.registerSlug ? `/register/${o.registerSlug}` : '/catalog')}>Reserve my seat</button>
    </div>
  );
}

/** Hero ke neeche: format strip (live vs self-paced) + outcome chips ka data. */
function FormatStrip() {
  const o = CONFIG.OFFER || {};
  return (
    <section className="wrap sec" aria-label="Programme format">
      <Reveal>
        <div className="fmt">
          <div><b>{o.cohort || 'Cohort dates: set real dates'}</b><span>Next cohort</span></div>
          <div><b>Sat and Sun</b><span>LIVE sessions</span></div>
          <div><b>Mon to Fri</b><span>Self-paced lessons, 2 to 3 hrs a day</span></div>
          <div><b>10+ projects</b><span>Certificate on completion</span></div>
        </div>
      </Reveal>
    </section>
  );
}

function ProblemVsRoadmap() {
  return (
    <section className="wrap sec" aria-labelledby="pv-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="pv-h">Two ways to learn this skill</h2><p>Alone by trial and error, or with a proven roadmap and a cohort.</p></div></div></Reveal>
      <Reveal className="two-opt">
        <div className="opt bad"><h3>Stress, guesswork, trial and error</h3><ul><li>Random tutorials with no order</li><li>Projects that never get finished</li><li>No feedback on your work</li></ul></div>
        <div className="opt good"><h3>Certainty, confidence, execution</h3><ul><li>Day-by-day roadmap with named projects</li><li>Live build days with your instructor</li><li>Verified certificate you can share</li></ul></div>
      </Reveal>
            <Reveal><div className="sechead" style={{ marginTop: 18 }}><div><h2 className="h-xl">This workshop is for you if you</h2></div></div></Reveal>
      <Reveal className="pain">
        {AUDIENCE_PAIN.map(([ic, t, d]) => <div key={t}><div className="pi"><I n={ic} s={16} /></div><b>{t}</b><span>{d}</span></div>)}
      </Reveal>
    </section>
  );
}

/* ====================================================================
   ROADMAP â†’ INTERACTIVE LEARNING JOURNEY
   --------------------------------------------------------------------
   KAISE LAGAYEIN (sirf ek jagah):
   1. Purana `function Roadmap() { ... }` poora DELETE karo.
   2. Is file ka poora content (neeche wala) us jagah paste karo, yaani
      `const ROADMAP = [...]` ke baad. ROADMAP data ko TOUCH mat karo.
   3. Home() mein <Roadmap /> already hai, wahan koi change nahi.
   4. Naye imports nahi chahiye. Sab kuch pehle se file mein hai:
      useState, useEffect, useMemo, useRef, I, IMG, CONFIG, ROADMAP,
      scrollToId, reduce.
   CSS is component ke andar hi hai (<style>), alag const/paste nahi.

   DATA: Koi naya course, module, duration ya statistic nahi banaya.
   Har stage ROADMAP ke existing din (index) ko group karta hai:
     Discover Your Path        â†’ DAY 0
     Learn Core Skills         â†’ DAY 1, DAY 2
     Practice & Assignments    â†’ DAY 3, DAY 4, DAY 5
     Build Real-World Projects â†’ DAY 6
     Get Certified             â†’ DAY 7
     Launch Your Career        â†’ BONUS
   Card ka short text = us stage ke pehle din ka existing `desc`.
   Chips (days / live / projects) ROADMAP se count hote hain.

   STAGE STATUS:
   - CONFIG.OFFER.startsAt set hai aur cohort shuru ho chuka hai
     â†’ stage asli cohort din se nikalta hai (Completed / In progress / Upcoming).
   - startsAt null hai (abhi ki setting) â†’ PREVIEW mode: visitor stage
     kholta hai to wahan tak ka raasta "Unlocked" ho jata hai. Kisi ko
     jhootha "Completed" nahi dikhta.
   ==================================================================== */

const JV_STAGES = [
  { name: 'Discover Your Path', ic: 'compass', img: IMG.celebration, pos: '50% 40%', alt: 'Learners together at an ILM ORA workshop', days: [0] },
  { name: 'Learn Core Skills', ic: 'book', img: IMG.javaLive, pos: '50% 40%', alt: 'Live Java workshop session', days: [1, 2] },
  { name: 'Practice & Assignments', ic: 'assess', img: IMG.coding, pos: '50% 40%', alt: 'Learner coding during a focused workshop', days: [3, 4, 5] },
  { name: 'Build Real-World Projects', ic: 'code', img: IMG.mentorGuidance, pos: '50% 40%', alt: 'Mentor guiding a learner who is working on a laptop', days: [6] },
  { name: 'Get Certified', ic: 'award', img: IMG.certCeremony, pos: '50% 40%', alt: 'Learners receiving certificates at a Java workshop ceremony', days: [7] },
  { name: 'Launch Your Career', ic: 'trending', img: IMG.javaCelebration, pos: '50% 40%', alt: 'Learners celebrating at a Java workshop', days: [8] },
];
const JV_N = JV_STAGES.length;
const JV_H = 96; // desktop path strip ki height (px)
const jvY = (i) => (i % 2 === 0 ? 68 : 28); // node ka center, zig-zag
const jvPath = (W) => {
  const cw = W / JV_N, x = (i) => (i + 0.5) * cw;
  let d = `M${x(0)} ${jvY(0)}`;
  for (let i = 1; i < JV_N; i++) d += ` C${x(i - 1) + cw / 2} ${jvY(i - 1)} ${x(i) - cw / 2} ${jvY(i)} ${x(i)} ${jvY(i)}`;
  return d;
};
const jvInfo = (s) => {
  const d = s.days.map((i) => ROADMAP[i]);
  return { d, live: d.filter((x) => x.live).length, proj: d.reduce((a, x) => a + x.projects.length, 0) };
};
/** Day label from ROADMAP: 'DAY 0', 'DAY 1\u20132', 'DAY 3\u20135', 'BONUS' (no invented data). */
const jvDays = (s) => {
  const d = s.days.map((i) => ROADMAP[i]);
  if (d.length === 1) return d[0].day;
  const n = (x) => x.day.replace('DAY ', '');
  return `DAY ${n(d[0])}\u2013${n(d[d.length - 1])}`;
};

const JV_CSS = `
.wk .jv-head{display:flex;justify-content:space-between;align-items:end;gap:14px;flex-wrap:wrap}
.wk .jv-side{display:grid;gap:8px;min-width:min(100%,300px)}
.wk .jv-legend{display:flex;gap:14px;flex-wrap:wrap;font-size:.74rem;font-weight:700;color:var(--muted)}
.wk .jv-legend i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:-1px}
.wk .jv-legend .d i{background:var(--accent)}.wk .jv-legend .a i{background:var(--brand)}.wk .jv-legend .n i{border:2px dashed var(--muted)}
.wk .jv-bar{height:6px;border-radius:6px;background:var(--ln);overflow:hidden}
.wk .jv-bar i{display:block;height:100%;width:100%;transform-origin:left;background:linear-gradient(90deg,var(--accent),var(--brand));transition:transform 1s cubic-bezier(.2,.7,.2,1)}
.wk .jv-bartxt{font-size:.78rem;font-weight:700}

.wk .jv{position:relative;margin-top:18px}
.wk .jv-list{list-style:none;margin:0;padding:0;display:grid;gap:14px;position:relative}
.wk .jv-svg{display:none}

/* ---------- mobile: vertical timeline ---------- */
.wk .jv-step{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr);gap:14px;opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--i) * 110ms)}
.wk .jv-step.on{opacity:1;transform:none}
.wk .jv-step:not(:last-child)::before,.wk .jv-step:not(:last-child)::after{content:"";position:absolute;left:20px;top:22px;width:3px;height:calc(100% + 14px);border-radius:3px}
.wk .jv-step::before{background:var(--ln)}
.wk .jv-step::after{background:linear-gradient(var(--accent),var(--accent));transform:scaleY(0);transform-origin:top;transition:transform .8s ease;transition-delay:calc(var(--i) * 110ms + 250ms)}
.wk .jv-step.done.on::after{transform:scaleY(1)}
.wk .jv-top{position:relative;z-index:2}
.wk .jv-node{position:relative;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--solid);border:2px dashed var(--muted);color:var(--muted);box-shadow:0 4px 12px rgba(40,25,10,.12)}
.wk .jv-step.done .jv-node{background:var(--accent);border:2px solid var(--accent);color:#fff}
.wk .jv-step.active .jv-node{background:var(--brand);border:2px solid var(--brand);color:#fff;animation:jvring 2.2s infinite}
@keyframes jvring{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--brand) 55%,transparent)}70%,100%{box-shadow:0 0 0 12px transparent}}
@keyframes jvtrav{from{transform:scale(.6);opacity:.9}to{transform:scale(2.2);opacity:0}}
.wk .jv-tick{position:absolute;right:-5px;bottom:-4px;width:18px;height:18px;border-radius:50%;background:#fff;color:var(--accent);display:grid;place-items:center;box-shadow:0 1px 4px rgba(0,0,0,.25)}

.wk .jv-card{position:relative;display:flex;flex-direction:column;min-width:0;border-radius:var(--r-lg);overflow:hidden;background:var(--solid);border:1px solid var(--ln);box-shadow:var(--shadow);transition:transform .3s cubic-bezier(.2,.8,.2,1),box-shadow .3s,border-color .3s}
.wk .jv-step.done .jv-card{border-color:color-mix(in srgb,var(--accent) 55%,var(--ln))}
.wk .jv-step.active .jv-card{border-color:var(--brand);box-shadow:0 14px 34px color-mix(in srgb,var(--brand) 28%,transparent)}
.wk .jv-art{position:relative;aspect-ratio:16/9;overflow:hidden;background:#1a1a22}
.wk .jv-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1),filter .4s}
.wk .jv-step.next .jv-art img{filter:grayscale(.55) brightness(.9)}
.wk .jv-art::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.7),transparent 60%)}
.wk .jv-no{position:absolute;left:12px;bottom:6px;z-index:1;color:#fff;font-size:1.9rem;font-weight:800;line-height:1;letter-spacing:-.03em;text-shadow:0 2px 10px rgba(0,0,0,.5)}
.wk .jv-st{position:absolute;right:9px;top:9px;z-index:1;padding:3px 9px;border-radius:999px;font-size:.66rem;font-weight:800;background:rgba(10,12,30,.72);color:#fff;backdrop-filter:blur(6px)}
.wk .jv-step.done .jv-st{background:var(--accent)}.wk .jv-step.active .jv-st{background:var(--brand)}
.wk .jv-body{display:flex;flex-direction:column;gap:7px;padding:11px 13px 13px;flex:1}
.wk .jv-body h3{font-size:.98rem}
.wk .jv-body p{color:var(--muted);font-size:.8rem}
.wk .jv-chips{display:flex;gap:5px;flex-wrap:wrap;margin-top:auto;padding-top:4px}
.wk .jv-chip{padding:2px 8px;border-radius:999px;font-size:.68rem;font-weight:700;background:color-mix(in srgb,var(--text) 7%,transparent);color:var(--muted)}
.wk .jv-chip.live{background:color-mix(in srgb,#ff4d6d 14%,transparent);color:#d1294a}
.wk .jv-btn{align-self:flex-start;display:inline-flex;align-items:center;gap:6px;border:0;background:none;padding:0;margin-top:4px;font-weight:800;font-size:.8rem;color:var(--brand);cursor:pointer}
.wk .jv-btn::after{content:"";position:absolute;inset:0;z-index:3}
.wk .jv-btn:focus-visible{outline:none}
.wk .jv-card:has(.jv-btn:focus-visible){outline:3px solid var(--accent);outline-offset:3px}
.wk .jv-card:hover{transform:translateY(-4px);box-shadow:0 18px 36px color-mix(in srgb,var(--brand) 22%,rgba(60,25,0,.18))}
.wk .jv-card:hover .jv-art img{transform:scale(1.07)}
.wk .jv-card:hover .jv-art img,.wk .jv-step.next .jv-card:hover .jv-art img{filter:none}

/* hover reveal (desktop) */
.wk .jv-over{display:none}

/* ---------- desktop: left to right journey ---------- */
@media(min-width:1100px){
  .wk .jv-list{grid-template-columns:repeat(6,minmax(0,1fr));gap:0}
  .wk .jv-svg{display:block;position:absolute;left:0;top:0;width:100%;height:${JV_H}px;overflow:visible;pointer-events:none}
  .wk .jv-p0,.wk .jv-p1{fill:none;stroke-width:4;stroke-linecap:round}
  .wk .jv-p0{stroke:var(--ln)}
  .wk .jv-p1{stroke:url(#jvg);stroke-dasharray:1;stroke-dashoffset:1}
  .wk .jv-trav circle{fill:var(--brand);stroke:#fff;stroke-width:3}
  .wk .jv-trav .ring{fill:color-mix(in srgb,var(--brand) 30%,transparent);stroke:none;animation:jvtrav 1.8s ease-out infinite;transform-box:fill-box;transform-origin:center}
  .wk .jv-step{display:flex;flex-direction:column;gap:0;padding:0 8px}
  .wk .jv-step::before,.wk .jv-step::after{display:none!important}
  .wk .jv-top{height:${JV_H}px;display:flex;justify-content:center;align-items:flex-start}
  .wk .jv-lo .jv-node{margin-top:${jvY(0) - 22}px}
  .wk .jv-hi .jv-node{margin-top:${jvY(1) - 22}px}
  .wk .jv-card{flex:1}
  .wk .jv-over{display:block;position:absolute;inset:0;z-index:2;padding:14px 13px;overflow:auto;background:linear-gradient(180deg,rgba(11,12,18,.95),rgba(11,12,18,.97));color:#fff;opacity:0;pointer-events:none;transition:opacity .25s}
  .wk .jv-over h4{font-size:.78rem;color:#ffb27a;margin-bottom:8px}
  .wk .jv-over ol{list-style:none;margin:0;padding:0;display:grid;gap:9px}
  .wk .jv-over b{display:block;font-size:.7rem;color:#ffb27a}
  .wk .jv-over span{display:block;font-size:.78rem;line-height:1.3}
  .wk .jv-over em{font-style:normal;font-size:.66rem;font-weight:800;opacity:.8}
}
@media(min-width:1100px) and (hover:hover){.wk .jv-card:hover .jv-over{opacity:1}}
@media(min-width:1100px){.wk .jv-card:has(.jv-btn:focus-visible) .jv-over{opacity:1}}

/* ---------- detail modal ---------- */
.wk .jv-modal{position:fixed;inset:0;z-index:95;display:grid;place-items:center;padding:14px;background:rgba(5,5,10,.78);backdrop-filter:blur(4px);animation:jvfade .2s ease}
@keyframes jvfade{from{opacity:0}}
.wk .jv-mbox{position:relative;width:min(760px,100%);max-height:min(92vh,880px);display:flex;flex-direction:column;border-radius:20px;overflow:hidden;background:var(--solid);border:1px solid var(--ln);box-shadow:0 30px 70px rgba(0,0,0,.45);animation:jvpop .3s cubic-bezier(.2,.9,.2,1)}
@keyframes jvpop{from{transform:translateY(18px) scale(.97);opacity:0}}
.wk .jv-mhead{position:relative;flex:none;min-height:130px;color:#fff;display:flex;align-items:flex-end;padding:16px 18px;background:#111}
.wk .jv-mhead img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.wk .jv-mhead::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(0deg,rgba(8,8,14,.92),rgba(8,8,14,.3))}
.wk .jv-mhead>div{position:relative;z-index:2}
.wk .jv-mhead h2{color:#fff;font-size:clamp(1.1rem,2.6vw,1.45rem)}
.wk .jv-mhead small{display:flex;align-items:center;gap:7px;font-size:.74rem;font-weight:800;color:#ffb27a;margin-bottom:4px}
.wk .jv-x{position:absolute;right:10px;top:10px;z-index:3;width:38px;height:38px;border-radius:50%;border:0;background:rgba(0,0,0,.65);color:#fff;display:grid;place-items:center;cursor:pointer}
.wk .jv-mbody{overflow:auto;padding:16px 18px;display:grid;gap:12px}
.wk .jv-day{padding:13px;border:1px solid var(--ln);border-radius:14px;background:var(--bg)}
.wk .jv-day h3{margin:6px 0 4px;font-size:.98rem}
.wk .jv-day>p{color:var(--muted);font-size:.84rem}
.wk .jv-foot{flex:none;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:12px 18px;border-top:1px solid var(--ln)}
.wk .jv-foot .grp{display:flex;gap:8px;flex-wrap:wrap}
`;

function Roadmap() {
  const rootRef = useRef(null);
  const lastBtn = useRef(null);
  const [seen, setSeen] = useState(false);
  const [focus, setFocus] = useState(0); // preview mode: visitor ne kahan tak "travel" kiya
  const [openI, setOpenI] = useState(null);
  const [W, setW] = useState(960);
  const [auto, setAuto] = useState(true); // preview mode mein journey khud chalti hai, user click kare to ruk jati hai
  const p1Ref = useRef(null);
  const travRef = useRef(null);
  const dispRef = useRef(0);
  const pausedRef = useRef(false);
  const focusRef = useRef(0);
  const modalRef = useRef(null);

  const startsAt = CONFIG.OFFER && CONFIG.OFFER.startsAt;
  const live = Boolean(startsAt && startsAt <= Date.now());
  const current = useMemo(() => {
    if (!live) return focus;
    const day = Math.floor((Date.now() - startsAt) / 864e5);
    if (day > ROADMAP.length - 1) return JV_N; // cohort poora ho gaya: sab Completed
    const i = JV_STAGES.findIndex((s) => s.days.includes(day));
    return i < 0 ? 0 : i;
  }, [live, startsAt, focus]);

  // scroll-triggered reveal: section viewport mein aate hi journey "chalti" hai
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    if (reduce() || typeof IntersectionObserver === 'undefined') { setSeen(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // SVG path asli width par banta hai, isliye stroke kabhi stretch nahi hota
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    const set = () => { const w = el.querySelector('.jv-list'); if (w && w.clientWidth) setW(w.clientWidth); };
    set();
    if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', set); return () => window.removeEventListener('resize', set); }
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const path = useMemo(() => jvPath(W), [W]);
  const frac = current >= JV_N ? 1 : current / (JV_N - 1);
  focusRef.current = focus;
  modalRef.current = openI;

  // Traveler marker + progress line: path par smoothly chalte hain
  useEffect(() => {
    const p1 = p1Ref.current, tv = travRef.current;
    if (!p1 || !tv) return undefined;
    const target = seen ? frac : 0;
    const paint = (f) => {
      p1.style.strokeDashoffset = String(1 - f);
      try {
        const pt = p1.getPointAtLength(p1.getTotalLength() * f);
        tv.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
      } catch (e) { /* hidden svg (mobile) */ }
    };
    if (reduce()) { dispRef.current = target; paint(target); return undefined; }
    const from = dispRef.current, t0 = performance.now();
    const dur = Math.min(1800, Math.max(500, 5500 * Math.abs(target - from)));
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const f = from + (target - from) * (1 - Math.pow(1 - p, 3));
      dispRef.current = f;
      paint(f);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, frac, path]);

  // Autoplay: stage 1 se 6 tak ek ke baad ek unlock. Hover, focus, modal ya click par ruk jata hai.
  useEffect(() => {
    if (!seen || live || !auto || reduce()) return undefined;
    let t;
    const loop = () => {
      t = setTimeout(() => {
        if (!pausedRef.current && modalRef.current == null) setFocus((f) => (f + 1) % JV_N);
        loop();
      }, focusRef.current === JV_N - 1 ? 3200 : 2000);
    };
    loop();
    return () => clearTimeout(t);
  }, [seen, live, auto]);
  const statusOf = (i) => (i < current ? 'done' : i === current ? 'active' : 'next');
  const label = (st) => (st === 'done' ? (live ? 'Completed' : 'Unlocked') : st === 'active' ? (live ? 'In progress' : 'You are here') : 'Upcoming');

  const open = (i) => (e) => {
    lastBtn.current = e.currentTarget;
    setAuto(false);
    setOpenI(i);
    if (!live) setFocus(i);
  };
  const close = () => { setOpenI(null); if (lastBtn.current) lastBtn.current.focus(); };
  const goTo = (i) => { setOpenI(i); if (!live) setFocus(i); };
  const reserve = () => { setOpenI(null); setTimeout(() => scrollToId('wk-price'), 60); };

    const barTxt = current >= JV_N ? 'Full roadmap complete' : `${jvDays(JV_STAGES[current])}: ${JV_STAGES[current].name}`;

  return (
    <section className="wrap sec" id="wk-roadmap" aria-labelledby="rm-h" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: JV_CSS }} />
      <Reveal>
        <div className="jv-head">
          <div className="sechead" style={{ marginBottom: 0 }}>
            <div>
              <h2 className="h-xl" id="rm-h">Your roadmap, day by day</h2>
              <p>10+ projects. Live build days. One verified certificate. {live ? '' : 'Select a stage to open its modules.'}</p>
            </div>
          </div>
          <div className="jv-side">
            <div className="jv-bartxt" aria-live="polite">{barTxt}</div>
            <div className="jv-bar" role="progressbar" aria-label="Journey progress" aria-valuemin={0} aria-valuemax={JV_N} aria-valuenow={Math.min(current + 1, JV_N)}>
              <i style={{ transform: `scaleX(${seen ? Math.min(1, (Math.min(current, JV_N - 1) + 1) / JV_N) : 0})` }} />
            </div>
            <div className="jv-legend" aria-hidden="true">
              <span className="d"><i />{live ? 'Completed' : 'Unlocked'}</span>
              <span className="a"><i />{live ? 'In progress' : 'Current'}</span>
              <span className="n"><i />Upcoming</span>
            </div>
          </div>
        </div>
      </Reveal>

      <div
        className="jv"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onFocus={() => { pausedRef.current = true; }}
        onBlur={() => { pausedRef.current = false; }}
      >
        <svg className="jv-svg" width={W} height={JV_H} viewBox={`0 0 ${W} ${JV_H}`} aria-hidden="true" focusable="false">
          <defs><linearGradient id="jvg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0"><stop offset="0" stopColor="#16a34a" /><stop offset="1" stopColor="#f97316" /></linearGradient></defs>
          <path className="jv-p0" d={path} />
          <path className="jv-p1" ref={p1Ref} d={path} pathLength="1" />
          <g className="jv-trav" ref={travRef}><circle className="ring" r="9" /><circle r="6" /></g>
        </svg>

        <ol className="jv-list">
          {JV_STAGES.map((s, i) => {
            const st = statusOf(i);
            const { d, live: nLive, proj } = jvInfo(s);
            return (
              <li key={s.name} className={`jv-step ${st} ${i % 2 === 0 ? 'jv-lo' : 'jv-hi'} ${seen ? 'on' : ''}`} style={{ '--i': i }} aria-current={st === 'active' ? 'step' : undefined}>
                <div className="jv-top">
                  <span className="jv-node" aria-hidden="true">
                    <I n={s.ic} s={19} />
                    {st === 'done' && <span className="jv-tick"><svg width="11" height="11" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10.5l3.2 3.2L15 6.8" /></svg></span>}
                  </span>
                </div>
                <div className="jv-card">
                  <div className="jv-art">
                    <img src={s.img} alt={s.alt} loading="lazy" style={{ objectPosition: s.pos }} />
                    <span className="jv-st">{label(st)}</span>
                    <span className="jv-no">{jvDays(s)}</span>
                  </div>
                  <div className="jv-body">
                   <h3><span className="sr">{jvDays(s)}: </span>{s.name}</h3>
                                       <div className="jv-days">
                      {d.map((x) => (
                        <div className="jv-d" key={x.day}>
                          <div className="jv-dt"><b>{x.day} | {x.when}</b><span className={x.live ? 'lv' : 'sp'}>{x.live ? 'LIVE' : 'SELF-PACED'}</span><em>{x.time}</em></div>
                          <span className="jv-dn">{x.title}</span>
                          {x.projects.length > 0 && <ul>{x.projects.map(([n, t]) => <li key={n}><b>{n}</b><span>{t}</span></li>)}</ul>}
                        </div>
                      ))}
                    </div>
                    <div className="jv-chips">
                      <span className="jv-chip">{d.length} {d.length === 1 ? 'Day' : 'Days'}</span>
                      {nLive > 0 && <span className="jv-chip live">{nLive} Live {nLive === 1 ? 'Session' : 'Sessions'}</span>}
                      {proj > 0 && <span className="jv-chip">{proj} {proj === 1 ? 'Project' : 'Projects'}</span>}
                    </div>
                    <button type="button" className="jv-btn" onClick={open(i)} aria-haspopup="dialog">
                      View modules<span className="sr">: {s.name}</span>
                    </button>
                  </div>
                  
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {openI != null && <JourneyModal i={openI} onClose={close} onGo={goTo} onReserve={reserve} />}
    </section>
  );
}

/** Stage ke poore existing modules (ROADMAP ka poora content: title, desc, time, projects). */
function JourneyModal({ i, onClose, onGo, onReserve }) {
  const s = JV_STAGES[i];
  const { d } = jvInfo(s);
  const box = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !box.current) return;
      const f = box.current.querySelectorAll('button:not([disabled]),a[href]');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', key);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', key); };
  }, [onClose]);

  useEffect(() => { if (closeBtn.current) closeBtn.current.focus(); if (box.current) box.current.querySelector('.jv-mbody').scrollTop = 0; }, [i]);

  return (
    <div className="jv-modal" onClick={onClose}>
      <div className="jv-mbox" role="dialog" aria-modal="true" aria-labelledby="jv-mt" ref={box} onClick={(e) => e.stopPropagation()}>
        <div className="jv-mhead">
          <img src={s.img} alt="" style={{ objectPosition: s.pos }} />
          <button type="button" className="jv-x" ref={closeBtn} onClick={onClose} aria-label="Close modules">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div>
              <small><I n={s.ic} s={14} />{jvDays(s)}</small>
            <h2 id="jv-mt">{s.name}</h2>
          </div>
        </div>
        <div className="jv-mbody">
          {d.map((r) => (
            <article className="jv-day" key={r.day}>
              <div className="rm-top"><span className="d">{r.day} | {r.when}</span>{r.live ? <span className="l">LIVE</span> : <span className="s">SELF-PACED</span>}<span className="t">{r.time}</span></div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              {r.projects.length > 0 && <div className="proj">{r.projects.map(([n, t]) => <div key={n}><b>{n}</b><span>{t}</span></div>)}</div>}
            </article>
          ))}
        </div>
        <div className="jv-foot">
          <div className="grp">
            <button type="button" className="btn btn-ghost btn-sm" disabled={i === 0} onClick={() => onGo(i - 1)}>{'\u2190'} Previous stage</button>
            {i < JV_N - 1 && <button type="button" className="btn btn-ghost btn-sm" onClick={() => onGo(i + 1)}>Next stage {'\u2192'}</button>}
          </div>
          <button type="button" className="btn btn-primary btn-sm" onClick={onReserve}>Reserve my seat</button>
        </div>
      </div>
    </div>
  );
}

/** Cinematic learning journey: 4 alag images, seamless horizontal marquee (AutoRow). */
const DAY_IMGS = [
  [IMG.celebration, 'Learners together at an ILM ORA workshop'],
  [IMG.javaLive, 'Live Java workshop session'],
  [U(cineCoding), 'Student coding during an ILM ORA workshop'],
  [U(cineAi), 'Learner exploring tools on a laptop'],
  [U(cineMentor), 'Mentor guiding learners in a collaborative session'],
  [IMG.studentCollab, 'Learners collaborating with a mentor'],
  [IMG.coding, 'Learner coding during a focused workshop'],
  [U(cinePresent), 'Presenter showcasing a product to a team'],
  [IMG.javaCelebration, 'Learners celebrating at a Java workshop'],
];
const CINE = ROADMAP.map((r, i) => ({ r, img: DAY_IMGS[i][0], alt: DAY_IMGS[i][1] }));

function CinematicJourney() {
  const boxRef = useRef(null);
  const trackRef = useRef(null);
  const copies = 3; // 3 copies: loop hamesha seamless rehta hai
  const items = Array.from({ length: copies }, (_, k) => CINE.map((c, i) => ({ ...c, k, i }))).flat();

  useEffect(() => {
    const box = boxRef.current, track = trackRef.current;
    if (!box || !track || reduce()) return undefined;
    const cards = [...track.children];
    let raf = 0, last = 0, pos = 0, hold = false, visible = true, resume = 0;
    let dragging = false, sx = 0, sp = 0;

    const loopLen = () => {
      const a = cards[0], b = cards[CINE.length];
      return a && b ? b.offsetLeft - a.offsetLeft : 0;
    };
    const paint = () => {
      const half = box.clientWidth / 2;
      for (const el of cards) {
        const cx = el.offsetLeft + el.offsetWidth / 2 - pos;
        const t = Math.max(-1, Math.min(1, (cx - half) / (box.clientWidth * 0.55)));
        const a = Math.abs(t);
        el.style.transform = `perspective(1300px) rotateY(${(-t * 30).toFixed(2)}deg) translateY(${(a * 16).toFixed(1)}px) scale(${(1 - a * 0.12).toFixed(3)})`;
        el.style.opacity = (1 - a * 0.28).toFixed(2);
        el.style.zIndex = String(Math.round((1 - a) * 10));
      }
    };
    const wrap = () => {
      const len = loopLen();
      if (!len) return;
      while (pos >= len) pos -= len;
      while (pos < 0) pos += len;
    };
    const step = (t) => {
      raf = requestAnimationFrame(step);
      const dt = last ? Math.min(t - last, 50) : 16;
      last = t;
      if (!visible || document.hidden) return;
      if (!hold && !dragging) { pos += 0.06 * dt; wrap(); }
      track.style.transform = `translate3d(${-pos}px,0,0)`;
      paint();
    };

    const enter = () => { hold = true; clearTimeout(resume); };
    const leave = () => { clearTimeout(resume); resume = setTimeout(() => { hold = false; }, 600); };
    const down = (e) => { dragging = true; sx = e.clientX; sp = pos; box.classList.add('dragging'); box.setPointerCapture && box.setPointerCapture(e.pointerId); };
    const move = (e) => { if (!dragging) return; pos = sp - (e.clientX - sx); wrap(); };
    const up = () => { if (!dragging) return; dragging = false; box.classList.remove('dragging'); };

    box.addEventListener('mouseenter', enter);
    box.addEventListener('mouseleave', leave);
    box.addEventListener('pointerdown', down);
    box.addEventListener('pointermove', move);
    box.addEventListener('pointerup', up);
    box.addEventListener('pointercancel', up);
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }) : null;
    if (io) io.observe(box);
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(resume); if (io) io.disconnect();
      box.removeEventListener('mouseenter', enter);
      box.removeEventListener('mouseleave', leave);
      box.removeEventListener('pointerdown', down);
      box.removeEventListener('pointermove', move);
      box.removeEventListener('pointerup', up);
      box.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
        <section className="wrap sec" id="wk-roadmap" aria-labelledby="cj-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="cj-h">Explore Your Learning Journey</h2><p>{(CONFIG.OFFER && CONFIG.OFFER.cohort) || ''} Live Sat and Sun, self-paced Mon to Fri (2 to 3 hrs a day), 10+ projects, certificate on completion.</p></div></div></Reveal>
      <div className="cj" ref={boxRef} role="region" aria-label="Explore your learning journey">
        <div className="cj-track" ref={trackRef}>
          {items.map((c) => (
            <article className="cj-card" key={`${c.k}-${c.i}`} aria-hidden={c.k > 0 ? 'true' : undefined}>
              <img src={c.img} alt={c.k === 0 ? c.alt : ''} loading="lazy" draggable="false" />
                            <div className="cj-in">
                <div className="cj-top">
                  <span className="n">{c.r.day} | {c.r.when.toUpperCase()}</span>
                  {c.r.live ? <span className="tg live"><i />LIVE</span> : <span className="tg sp">SELF-PACED</span>}
                  <span className="t">| {c.r.time}</span>
                </div>
                <h3>{c.r.title}</h3>
                <p>{c.r.desc}</p>
                {c.r.projects.length > 0 && (
                  <>
                    <b className="cj-ph">Projects</b>
                    <ul className="cj-pl">{c.r.projects.map(([n, t]) => <li key={n}><b>{n}</b><span>{t}</span></li>)}</ul>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const CATS = ['All', 'AI', 'Development', 'Design', 'Marketing', 'Business', 'Leadership', 'HR', 'Contact Center', 'Engineering'];
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

/** Horizontal row jo khud scroll hoti hai (seamless loop). Hover, touch, focus, off-screen aur reduced-motion par ruk jati hai. */
function AutoRow({ children, label }) {
  const ref = useRef(null);
  const copyRef = useRef(null);
  const dupRef = useRef(null);
  const [fits, setFits] = useState(false);

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

  useEffect(() => {
    const el = ref.current;
    if (!el || fits) return undefined;
    if (dupRef.current) dupRef.current.setAttribute('inert', '');
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
      pos += 0.045 * dt;
      if (pos >= len) pos -= len;
      el.scrollLeft = pos;
    };
    const stop = () => { hold = true; clearTimeout(resumeTimer); };
    const goOn = () => { pos = el.scrollLeft; hold = false; };
    const goLater = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(goOn, 1800); };
    el.addEventListener('mouseenter', stop); el.addEventListener('mouseleave', goOn);
    el.addEventListener('touchstart', stop, { passive: true }); el.addEventListener('touchend', goLater, { passive: true });
        el.addEventListener('focusin', stop); el.addEventListener('focusout', goOn);
    let dragging = false, sx = 0, sl = 0;
    const down = (e) => { if (e.pointerType !== 'mouse' || e.button !== 0) return; dragging = true; sx = e.clientX; sl = el.scrollLeft; el.classList.add('dragging'); };
    const move = (e) => {
      if (!dragging) return;
      let v = sl - (e.clientX - sx);
      const len = loopLen();
      if (len) { if (v >= len) { v -= len; sl -= len; } else if (v < 0) { v += len; sl += len; } }
      el.scrollLeft = v; pos = v;
    };
    const up = () => { if (!dragging) return; dragging = false; el.classList.remove('dragging'); pos = el.scrollLeft; };
    el.addEventListener('pointerdown', down); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    const io = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; }) : null;
    if (io) io.observe(el);
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf); clearTimeout(resumeTimer); if (io) io.disconnect();
      el.removeEventListener('mouseenter', stop); el.removeEventListener('mouseleave', goOn);
      el.removeEventListener('touchstart', stop); el.removeEventListener('touchend', goLater);
            el.removeEventListener('focusin', stop); el.removeEventListener('focusout', goOn);
      el.removeEventListener('pointerdown', down); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
    };
  }, [fits]);

  return (
    <div className="row" ref={ref} tabIndex={0} aria-label={label}>
      <div ref={copyRef} style={{ display: 'contents' }}>{children}</div>
      {!fits && <div ref={dupRef} aria-hidden="true" style={{ display: 'contents' }}>{children}</div>}
    </div>
  );
}

function Catalog() {
  const router = useRouter();
  const sp = useSearchParams();
  const catParam = sp.get('cat');
  const urlCat = CATS.includes(catParam) ? catParam : 'All';
  const [cat, setCatState] = useState(urlCat);
  useEffect(() => setCatState(urlCat), [urlCat]); // footer / back-button changes follow karo
  const { data, error, loading, reload } = useWorkshops();
  const { user } = useApp();

  const [q, setQ] = useState('');
  const [f, setF] = useState(DEFAULTS);
  const [open, setOpen] = useState(false);

  const regs = useMemo(() => new Set(user ? api.myRegs().map((r) => r.slug) : []), [user, data]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = Boolean(q) || cat !== 'All' || f.date !== 'any' || f.price !== 'any' || f.level !== 'any';
  const results = useMemo(() => (data ? applyFilters(data, { q, cat, f }).sort(sorters[f.sort]) : []), [data, q, cat, f]);
  const live = results.filter((w) => w.format === 'live');
  const onDemand = results.filter((w) => w.format === 'ondemand');
  const featured = useMemo(() => [...results].sort(sorters.popular).slice(0, 5), [results]);

  const setCat = (c) => {
    setCatState(c);
    router.replace(c === 'All' ? '/catalog' : `/catalog?cat=${c}`);
  };
  const setFilter = (k) => (e) => { setF((s) => ({ ...s, [k]: e.target.value })); };
  const reset = () => { setQ(''); setF(DEFAULTS); router.replace('/catalog'); };

  const renderSection = ({ id, title, sub, items }) => items.length === 0 ? null : (
    <section className="sec" aria-labelledby={id} key={id}>
      <div className="sechead"><div><h2 id={id}>{title}</h2><p>{sub}</p></div></div>
      <AutoRow label={title}>{items.map((w) => <WorkshopCard key={w.slug} w={w} registered={regs.has(w.slug)} />)}</AutoRow>
    </section>
  );

  return (
    <>
      <section className="wrap" style={{ paddingTop: 18 }}><Link className="btn btn-ghost btn-sm" href="/workshops">{'\u2190'} Back to the 7-day programme</Link></section>

      <section className="wrap sec" id="wk-explore" aria-labelledby="ex-h" style={{ scrollMarginTop: 90 }}>
                <div className="textcard">
          <h2 className="h-xl" id="ex-h">Explore workshops</h2>
          <p className="muted" style={{ marginTop: 4, maxWidth: '62ch' }}>Learn a skill in an afternoon. Join a live session with a practitioner, or watch on demand whenever suits you.</p>
        </div>
        <form className="searchbox glass" role="search" onSubmit={(e) => e.preventDefault()}>
          {Icons.search}
          <label htmlFor="q" className="sr">Search workshops by title or topic</label>
          <input id="q" type="search" placeholder="Search by title or topic, e.g. agents, Figma, pricing" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} />
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

                <p className="countpill" aria-live="polite">
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
            {featured.length > 2 && !q && renderSection({ id: 'feat', title: 'Featured workshops', sub: 'The most popular sessions with learners right now.', items: featured })}
            {renderSection({ id: 'up', title: 'Upcoming live workshops', sub: 'Live sessions you can join with the instructor.', items: live })}
            {renderSection({ id: 'od', title: 'On-demand learning library', sub: 'Recorded and ready when you are.', items: onDemand })}
          </>
        )}
      </section>

      <TopicTiles data={data} />
    </>
  );
}

function CatalogTeaser({ data }) {
  const { user } = useApp();
  const regs = useMemo(() => new Set(user ? api.myRegs().map((r) => r.slug) : []), [user, data]); // eslint-disable-line react-hooks/exhaustive-deps
  const top = useMemo(() => [...(data || [])].sort(sorters.popular).slice(0, 3), [data]);
  if (!top.length) return null;
  return (
    <section className="wrap sec" aria-labelledby="ct-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="ct-h">More workshops to explore</h2><p>Short live and on-demand workshops across AI, development, design, business and more.</p></div><LinkBtn href="/catalog" sm>Browse all workshops</LinkBtn></div></Reveal>
            <div className="grid teaser">{top.map((w) => <WorkshopCard key={w.slug} w={w} registered={regs.has(w.slug)} />)}</div>
      {UPCOMING.length > 0 && <p className="muted" style={{ marginTop: 14 }}>Coming soon: {UPCOMING.join(', ')}</p>}
    </section>
  );
}

/** Config-driven sections: array khali ho to section dikhta hi nahi. Sirf real, verified data daalo. */
const FEATURED_IN = []; // [{ name: 'Media name', src: U(importedLogo) }]
const UPCOMING = [];    // Coming soon workshop names; add only confirmed workshops.
const WHY_NOW = [];     // [{ value: '00%', label: 'stat description' }]  + WHY_NOW_SOURCE me source likho
const WHY_NOW_SOURCE = '';

function FeaturedIn() {
  if (!FEATURED_IN.length) return null;
  const list = [...FEATURED_IN, ...FEATURED_IN];
  return (
    <section className="wrap sec" aria-label="Featured in">
      <Reveal><p className="muted" style={{ textAlign: 'center', fontWeight: 700 }}>Featured in</p></Reveal>
      <div className="mq"><ul className="mq-track">{list.map((t, i) => (
        <li className="mq-logo" key={t.name + i} aria-hidden={i >= FEATURED_IN.length ? 'true' : undefined}><img src={t.src} alt={i >= FEATURED_IN.length ? '' : t.name} loading="lazy" /></li>
      ))}</ul></div>
    </section>
  );
}

function WhyNow() {
  if (!WHY_NOW.length) return null;
  return (
    <section className="wrap sec" aria-labelledby="wn-h">
      <Reveal><div className="sechead"><div><h2 className="h-xl" id="wn-h">Why learn this now</h2>{WHY_NOW_SOURCE && <p>Source: {WHY_NOW_SOURCE}</p>}</div></div></Reveal>
      <Reveal className="fmt">{WHY_NOW.map((x) => <div key={x.label}><b>{x.value}</b><span>{x.label}</span></div>)}</Reveal>
    </section>
  );
}

/** Roadmap ke baad mid-page CTA (GrowthSchool jaisa repeated CTA). */
function MidCta() {
  const o = CONFIG.OFFER || {};
  const target = o.registerSlug ? `/register/${o.registerSlug}` : '/catalog';
  return (
    <section className="wrap sec" aria-label="Reserve your seat">
      <Reveal className="nl">
        <div><h3 style={{ fontSize: '1.1rem' }}>Ready to build your first full-stack project?</h3><p style={{ marginTop: 4, fontSize: '.86rem' }}>{o.batchNote || 'Limited seats in every cohort.'}</p></div>
        <button type="button" className="btn btn-light btn-lg" onClick={() => go(target)}>Reserve my seat{o.price ? ` for ${money(o.price)}` : ''}</button>
      </Reveal>
    </section>
  );
}

/** Scroll ke baad neeche chipakne wala Reserve bar (mobile par dikhta hai, .stickybar CSS). */
function StickyReserve() {
  const o = CONFIG.OFFER || {};
  if (!o.on) return null;
  return (
    <div className="stickybar gsbar" role="complementary" aria-label="Reserve your seat">
      <div className="gsbar-in">
        <div className="gsbar-price"><b>{money(o.price || 0)}</b>{o.original ? <s>{money(o.original)}</s> : null}</div>
        <button type="button" className="btn btn-primary gsbar-btn" onClick={() => go(o.registerSlug ? `/register/${o.registerSlug}` : '/catalog')}>Register Now</button>
      </div>
    </div>
  );
}
/* ---------- TOOLS SECTION ---------- */

const WORKSHOP_TOOLS = [
  { name: 'Claude', img: logo0 },
  { name: 'Make', img: logo1 },
  { name: 'Magnific AI', img: logo2 },
  { name: 'Runway', img: logo3 },
  { name: 'Luma AI', img: logo4 },
  { name: 'Topaz Labs', img: logo5 },
  { name: 'DaVinci Resolve', img: logo6 },
  { name: 'Midjourney', img: logo7 },
  { name: 'Perplexity', img: logo8 },
];

function ToolsSection() {
  return (
    <section className="wrap sec" aria-labelledby="tools-heading">
      <Reveal>
        <div className="sechead">
          <div>
            <h2 className="h-xl" id="tools-heading">
              Tools You'll Learn
            </h2>
            <p>
              Explore industry-leading AI, development and creative tools
              through practical workshops.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="tools-marquee" aria-label="Tools you'll learn">
  <div className="tools-track">
    {[...WORKSHOP_TOOLS, ...WORKSHOP_TOOLS].map((tool, index) => (
      <div
        className="tool"
        key={`${tool.name}-${index}`}
        aria-hidden={index >= WORKSHOP_TOOLS.length ? 'true' : undefined}
      >
        <img
          src={U(tool.img)}
          alt={index >= WORKSHOP_TOOLS.length ? '' : tool.name}
          loading="lazy"
        />
        <span>{tool.name}</span>
      </div>
    ))}
  </div>
</div>
  </section>
  );
}


/* ---------- PRICING CARD ---------- */

function PricingCard() {
  const offer = CONFIG.OFFER || {};

  return (
    <section
      className="wrap sec"
      id="wk-price"
      aria-labelledby="pricing-heading"
    >
      <Reveal className="price-card">
        <div>
          <span className="badge feat">LIMITED TIME OFFER</span>

          <h2
            className="h-xl"
            id="pricing-heading"
            style={{ marginTop: 12 }}
          >
            Start Your Learning Journey
          </h2>

          <p className="muted" style={{ marginTop: 8 }}>
            Join ILM ORA workshops and learn through expert guidance,
            practical projects and real-world experience.
          </p>

          <p className="pc-note">
            {offer.batchNote}
          </p>
        </div>

        <div>
          <div className="pc-price">
            {money(offer.price || 0)}
            {offer.original > offer.price && (
              <s>{money(offer.original)}</s>
            )}
          </div>

          {offer.refund && (
            <div className="pc-refund">
              {offer.refund}
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ marginTop: 16 }}
            onClick={() =>
              go(
                offer.registerSlug
                  ? `/register/${offer.registerSlug}`
                  : '/catalog'
              )
            }
          >
            Reserve My Seat
          </button>
        </div>
      </Reveal>
    </section>
  );
}
function Home() {
  const { data } = useWorkshops();
  return (
    <>
      <OfferStrip />
      <Hero data={data} />
      <CinematicJourney />
      <FeaturedIn />
      <WhyNow />
      
            <ToolsSection />
      <Experience />
      
      
      <Instructors data={data} />
      <Community />
      <WallOfLove />
      <Corporate />
      <CatalogTeaser data={data} />
      <section className="wrap sec"><Faq /></section>
      <FinalCta />
      <StickyReserve />
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
  // Per-workshop title, description aur structured data (SEO)
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
      ? <StateBox title="Workshop not found" text="It may have been removed or the link is mistyped."><LinkBtn href="/catalog">Browse workshops</LinkBtn></StateBox>
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

  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/catalog">Workshops</Link> / <Link href={`/catalog?cat=${w.category}`}>{w.category}</Link> / <span aria-current="page">{w.title}</span>
      </nav>
      <div className="banner">
        <WorkshopArt w={w} />
        <div className="badges"><FormatBadge w={w} />{w.price === 0 && <span className="badge free">Free</span>}</div>
      </div>

      <div className="dgrid">
        <div>
          <div className="panel glass">
            <h1 style={{ fontSize: 'clamp(1.25rem,2.6vw,1.65rem)' }}>{w.title}</h1>
            <p className="lead muted" style={{ marginTop: 12 }}>{w.short}</p>
            <p style={{ marginTop: 16 }}>{w.long}</p>
          </div>
          {MEDIA.promos[w.slug] && <div style={{ marginTop: 12 }}><Yt id={MEDIA.promos[w.slug]} title={`${w.title} preview`} /></div>}
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
                <p className="muted">{w.instructor.role}{w.instructor.years ? ` \u2022 ${w.instructor.years}+ years of experience` : ''}</p>
                <p style={{ marginTop: 10 }}>{w.instructor.bio}</p>
              </div>
            </div>
          </div>
          <DetailExtras w={w} />
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
              {reg ? <AccessPanel w={w} /> : full ? (
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
      {!reg && !full && (
        <div className="stickybar"><div><b>{money(w.price)}</b>{w.seatsLeft != null && w.seatsLeft < 20 && <div style={{ fontSize: '.8rem', color: 'var(--err)' }}>Only {w.seatsLeft} seats left</div>}</div><LinkBtn href={`/register/${w.slug}`}>{w.price === 0 ? 'Register free' : 'Register now'}</LinkBtn></div>
      )}
    </div>
  );
}

const luhn = (n) => { let s = 0, d = false; for (let i = n.length - 1; i >= 0; i--) { let x = +n[i]; if (d) { x *= 2; if (x > 9) x -= 9; } s += x; d = !d; } return s % 10 === 0; };
function RegisterFlow({ slug }) {
  const router = useRouter();
  const { user, toast } = useApp();
  const [w, setW] = useState(null);
  const [loadErr, setLoadErr] = useState(null);
  const [step, setStep] = useState(1);
  const [d, setD] = useState({ name: '', email: '', phone: '', country: 'India', address: '' });
  const [pay, setPay] = useState({ cnum: '', cexp: '', ccvc: '' });
  const [promo, setPromo] = useState({ open: false, code: '', applied: false, error: '' });
  const [errors, setErrors] = useState({});
  const [formErr, setFormErr] = useState(null);
  const [busy, setBusy] = useState(false);

  // Guest checkout: login ki zaroorat nahi
  useEffect(() => { if (user) setD((s) => ({ ...s, name: s.name || user.name, email: s.email || user.email })); }, [user]);
  useEffect(() => { api.get(slug).then(setW).catch(setLoadErr); }, [slug]);
  // Duplicate registration rokna
  useEffect(() => {
    if (user && api.myReg(slug)) { toast('You are already registered for this workshop.'); router.replace(`/workshops/${slug}`); }
  }, [user, slug, router, toast]);

  if (loadErr) return <StateBox title="We could not load this workshop" text={loadErr.message}><LinkBtn href="/catalog">Back to workshops</LinkBtn></StateBox>;
  if (!w) return <div className="wrap"><div className="skel" style={{ marginTop: 24, height: 340, maxWidth: 900, marginInline: 'auto' }} /></div>;
  if (w.format === 'live' && w.seatsLeft === 0) {
    return <StateBox title="This workshop is full" text="Registration is closed for this session. Explore similar workshops instead."><LinkBtn href={`/catalog?cat=${w.category}`}>See more in {w.category}</LinkBtn></StateBox>;
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
    } catch (e) {
      setFormErr({ message: e.message, duplicate: e.code === 409 });
      setBusy(false);
      if (e.code === 401) router.replace(`/login?next=${encodeURIComponent(`/register/${slug}`)}`);
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
                <div className="jn-info panel glass">
          <div className="banner" style={{ height: 150, marginTop: 0, marginBottom: 18 }}><WorkshopArt w={w} /></div>
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

               <div className="jn-right">
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

const COLORS = ['#f97316', '#16a34a', '#ffb27a', '#ffd166', '#2dd4bf'];
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
    if (!w || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
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
      <h1 style={{ fontSize: 'clamp(1.5rem,3.6vw,2.2rem)' }}>You are in, {(reg.name || user.name || 'learner').split(' ')[0]}.</h1>
      <p className="lead muted" style={{ margin: '12px auto 0', maxWidth: '58ch' }}>A confirmation has been saved to your account. {live ? 'Your join link unlocks in My learning.' : 'Your recordings are ready to watch.'}</p>

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
        <LinkBtn href="/catalog" ghost>Browse more workshops</LinkBtn>
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
        <p className="muted" style={{ fontSize: '.8rem', marginTop: 4 }}>Certificate: issued after your completion is verified.</p>
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
      <p className="lead muted">Signed in as {user.email}</p>
      {loading ? <div className="dash"><Skeletons n={2} height={140} /></div>
        : rows.length ? (
          <div className="dash">{rows.map(({ reg, w }) => <Row key={reg.id} w={w} reg={reg} onCancelled={() => setTick((t) => t + 1)} />)}</div>
        ) : (
          <div className="state glass" style={{ marginTop: 30 }}>
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><rect x="8" y="14" width="48" height="40" rx="6" /><path d="M8 26h48M22 8v10M42 8v10" /></svg>
            <h2>No registered workshops yet</h2>
            <p className="muted">Pick a workshop and it will appear here with your join link or recordings.</p>
            <LinkBtn href="/catalog">Explore workshops</LinkBtn>
          </div>
        )}
    </div>
  );
}

/** Prototype player. Placeholder ki jagah backend ke signed URLs wala secure ILM ORA video player lagao. */
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
    if (!playing) return undefined;
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

/* ---------------------------------------------------------------------
   ROOT
   --------------------------------------------------------------------- */
   const COMPACT_CSS = `
/* global spacing */
.wk .wk-main{padding-bottom:24px}
.wk .wk-main .wrap{--gx:clamp(12px,2.2vw,36px);max-width:1520px}
.wk .wk-main .sec{margin-top:18px}
.wk .wk-main .sechead{margin-bottom:10px}
.wk .wk-main .sechead p{margin-top:2px}
.wk .wk-main .grid{gap:12px}

/* hero */
.wk .wk-main .hero2{min-height:min(52vh,400px)}
.wk .wk-main .hero3 .hero2-in{padding-top:28px;padding-bottom:16px;gap:20px}
.wk .wk-main .hero3 .hv-stage{max-width:460px}
.wk .wk-main .hero2-stats{padding:8px 0 10px}
.wk .wk-main .hero2 h1{font-size:clamp(1.4rem,3.6vw,2.2rem)}

/* explore your learning journey (cinematic cards) */
.wk .wk-main .cj{padding:12px 0 22px}
.wk .wk-main .cj-track{gap:16px}
.wk .wk-main .cj-card{width:min(400px,78vw);aspect-ratio:16/9;border-radius:16px}
.wk .wk-main .cj-in{padding:14px 16px;gap:6px;max-width:72%}
.wk .wk-main .cj-card h3{font-size:clamp(.95rem,1.6vw,1.15rem)}
.wk .wk-main .cj-card p{font-size:.74rem;line-height:1.4}
@media(max-width:640px){
  .wk .wk-main .cj-card{aspect-ratio:16/10;width:min(320px,84vw)}
  .wk .wk-main .cj-in{max-width:100%;justify-content:flex-end}
}

/* roadmap (day-wise) */
.wk .wk-main .jv{margin-top:10px}
.wk .wk-main .jv-list{gap:10px}
.wk .wk-main .jv-art{aspect-ratio:16/7}
.wk .wk-main .jv-body{padding:9px 11px 11px;gap:5px}
.wk .wk-main .jv-body h3{font-size:.92rem}
.wk .wk-main .jv-no{left:9px;bottom:9px;font-size:.78rem;letter-spacing:.04em;line-height:1;padding:4px 10px;border-radius:999px;background:var(--brand);text-shadow:none}
.wk .wk-main .jv-step.done .jv-no{background:var(--accent)}
.wk .wk-main .jv-chip{font-size:.7rem;padding:3px 9px}

/* tools marquee */
.wk .wk-main .tools-marquee{margin-top:8px;padding:6px 0 10px}
.wk .wk-main .tools-track{gap:12px}
.wk .wk-main .tool{flex:0 0 150px;min-height:104px;padding:12px 10px;gap:8px;font-size:.85rem;border-radius:14px}
.wk .wk-main .tool img{width:84px!important;height:48px!important}
@media(max-width:640px){
  .wk .wk-main .tool{flex-basis:124px;min-height:90px}
  .wk .wk-main .tool img{width:64px!important;height:38px!important}
}

/* pricing, experience, certificate */
.wk .wk-main .price-card{padding:16px 20px;gap:12px}
.wk .wk-main .xp{gap:10px}
.wk .wk-main .xp-card,.wk .wk-main .xp-btn{min-height:130px}
@media(max-width:640px){.wk .wk-main .xp-card,.wk .wk-main .xp-btn{min-height:150px}}
.wk .wk-main .cert{padding:12px 16px;gap:14px}
.wk .wk-main .cert-frame{max-width:250px}
.wk .wk-main .cert-list{margin:8px 0 10px;gap:6px}

/* mentors */
.wk .wk-main .mentors{max-width:900px;margin-left:auto;margin-right:auto;gap:12px}
.wk .wk-main .mentor{padding:8px;gap:2px}
.wk .wk-main .mentor .ph{aspect-ratio:1/1;margin-bottom:6px;border-radius:8px}
.wk .wk-main .mentor h3{font-size:.88rem}
.wk .wk-main .mentor .org{margin-top:5px;padding-top:5px}
.wk .wk-main .mentors>.wkrv{height:100%}

/* gallery: uniform tiles */
.wk .wk-main .gal{display:grid;columns:auto;grid-template-columns:repeat(2,1fr);gap:8px}
@media(min-width:800px){.wk .wk-main .gal{grid-template-columns:repeat(3,1fr)}}
.wk .wk-main .gal figure{margin:0;aspect-ratio:16/10}
.wk .wk-main .gal img{height:100%;object-fit:cover}

/* bands (corporate + final CTA) */
.wk .wk-main .band img{width:100%;height:100%;max-height:240px;object-fit:cover}
.wk .wk-main .band-in{padding:16px 20px}
.wk .wk-main .band .cert-act{margin-top:12px}
.wk .wk-main .nl{margin:10px 0;padding:14px 18px}

/* journey cards: reference style (day, live, time, projects inside) */
.wk .wk-main .cj-card{width:min(600px,88vw);aspect-ratio:16/10;border-radius:16px}
.wk .wk-main .cj-in{max-width:66%;gap:5px;padding:16px 18px;justify-content:center}
.wk .wk-main .cj-top{flex-wrap:wrap;font-size:.64rem;gap:6px}
.wk .wk-main .cj-top .t{color:rgba(255,255,255,.75);font-weight:600}
.wk .wk-main .cj-top .tg.live{display:inline-flex;align-items:center;gap:5px;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.35)}
.wk .wk-main .cj-top .tg.live i{width:6px;height:6px;border-radius:50%;background:#ff4d6d}
.wk .wk-main .cj-top .tg.sp{background:var(--accent)}
.wk .wk-main .cj-card h3{font-size:clamp(.98rem,1.8vw,1.2rem)}
.wk .wk-main .cj-card p{font-size:.72rem;line-height:1.4}
.wk .cj-ph{color:#fff;font-size:.74rem;margin-top:3px}
.wk .cj-pl{list-style:none;margin:0;padding:0;display:grid;gap:4px}
.wk .cj-pl li{position:relative;padding-left:14px;font-size:.68rem;line-height:1.3}
.wk .cj-pl li::before{content:"\\2713";position:absolute;left:0;color:#ffb27a;font-weight:800}
.wk .cj-pl b{display:block;color:#fff;font-size:.72rem}
.wk .cj-pl span{color:rgba(255,255,255,.75)}
@media(max-width:640px){
  .wk .wk-main .cj-card{aspect-ratio:4/5;width:min(330px,88vw)}
  .wk .wk-main .cj-in{max-width:100%;justify-content:flex-end}
}

/* roadmap cards: days + projects always visible */
.wk .wk-main .jv-days{display:grid;gap:8px}
.wk .wk-main .jv-d{display:grid;gap:3px;padding-top:6px;border-top:1px dashed var(--ln)}
.wk .wk-main .jv-d:first-child{border-top:0;padding-top:0}
.wk .wk-main .jv-dt{display:flex;flex-wrap:wrap;gap:4px 6px;align-items:center;font-size:.62rem}
.wk .wk-main .jv-dt b{color:var(--brand);font-weight:800}
.wk .wk-main .jv-dt .lv{padding:1px 6px;border-radius:999px;background:#ff4d6d;color:#fff;font-weight:800}
.wk .wk-main .jv-dt .sp{padding:1px 6px;border-radius:999px;background:color-mix(in srgb,var(--accent) 16%,transparent);color:var(--ok);font-weight:800}
.wk .wk-main .jv-dt em{font-style:normal;color:var(--muted);font-weight:600}
.wk .wk-main .jv-dn{font-size:.76rem;font-weight:700;line-height:1.25}
.wk .wk-main .jv-d ul{list-style:none;margin:2px 0 0;padding:0;display:grid;gap:3px}
.wk .wk-main .jv-d li{position:relative;padding-left:13px;font-size:.68rem;line-height:1.3}
.wk .wk-main .jv-d li::before{content:"\\2713";position:absolute;left:0;color:var(--ok);font-weight:800}
.wk .wk-main .jv-d li b{display:block;font-size:.7rem}
.wk .wk-main .jv-d li span{color:var(--muted)}

/* always-visible bottom bar (all screens) */
.wk .stickybar.gsbar{display:block;padding:0;background:var(--solid);border-top:1px solid var(--ln);box-shadow:0 -4px 16px rgba(0,0,0,.08)}
.wk .gsbar-in{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;max-width:1520px;margin:0 auto;padding:10px clamp(14px,3vw,36px) calc(10px + env(safe-area-inset-bottom,0px))}
.wk .gsbar-price b{font-size:1.15rem;font-weight:800}
.wk .gsbar-price s{margin-left:8px;font-size:.8rem;color:var(--muted)}
.wk .gsbar-btn{background:#2d1250;box-shadow:none;border-radius:8px;padding:8px 18px;min-height:38px}
.wk .gsbar-btn:hover{background:#3d1a6a;box-shadow:none;transform:none}
/* bar ke peeche content na chhupe */
.wk .wk-main{padding-bottom:72px}

/* FAQ: left heading, right list with + icons */
.wk .faq2{display:grid;gap:18px;padding:clamp(14px,3vw,28px) 0}
@media(min-width:800px){.wk .faq2{grid-template-columns:minmax(0,.8fr) minmax(0,1.6fr);gap:48px;align-items:start}}
.wk .faq2-h{font-size:clamp(1.5rem,3.2vw,2.3rem);font-weight:600;line-height:1.2;letter-spacing:-.02em;max-width:9em}
.wk .faq2-list{display:grid}
.wk .faq2 details{border-bottom:1px solid var(--ln)}
.wk .faq2 summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:14px;padding:16px 2px;font-size:.88rem;font-weight:500}
.wk .faq2 summary::-webkit-details-marker{display:none}
.wk .faq2 summary::marker{content:""}
.wk .faq2 summary::after{content:"+";flex:none;font-size:1.5rem;font-weight:300;line-height:1;color:var(--muted);transition:transform .25s}
.wk .faq2 details[open] summary::after{transform:rotate(45deg)}
.wk .faq2 details p{padding:0 2px 16px;color:var(--muted);font-size:.84rem;max-width:62ch}

/* ===== NO-CROP IMAGES + SMALLER CARDS + WOW ===== */

/* 1. Journey cards (text left, full image right, nothing cut) */
.wk .wk-main .cj-card{width:min(520px,86vw);aspect-ratio:16/9;border-radius:16px;background:linear-gradient(135deg,#14141f,#0b0b10);border:1px solid rgba(249,115,22,.35);box-shadow:0 14px 34px rgba(8,8,14,.34),0 0 0 1px rgba(255,255,255,.04) inset}
.wk .wk-main .cj-card img{left:auto;right:0;width:44%;height:100%;object-fit:contain;object-position:center;background:#0b0b10}
.wk .wk-main .cj-card::before{background:linear-gradient(90deg,rgba(11,11,16,.97) 0%,rgba(11,11,16,.9) 54%,rgba(11,11,16,0) 62%)}
.wk .wk-main .cj-in{max-width:58%;padding:12px 14px;gap:4px}
.wk .wk-main .cj-card h3{font-size:clamp(.9rem,1.5vw,1.05rem)}
.wk .wk-main .cj-card p{font-size:.68rem;-webkit-line-clamp:3;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden}
.wk .wk-main .cj-pl li{font-size:.64rem}
.wk .wk-main .cj-pl b{font-size:.68rem}
@media(max-width:640px){
  .wk .wk-main .cj-card{aspect-ratio:auto;min-height:300px;width:min(300px,86vw)}
  .wk .wk-main .cj-card img{width:100%;height:46%;top:0;right:0}
  .wk .wk-main .cj-card::before{background:linear-gradient(0deg,rgba(11,11,16,.98) 0%,rgba(11,11,16,.92) 56%,rgba(11,11,16,0) 62%)}
  .wk .wk-main .cj-in{max-width:100%;top:auto;height:56%;justify-content:flex-start}
}

/* 2. Workshop cards, tiles, banners: full image on dark backdrop */
.wk .art{background:linear-gradient(135deg,#14141f,#0b0b10)}
.wk .art img{object-fit:contain!important}
.wk .art::after{display:none}
.wk .banner{background:linear-gradient(135deg,#14141f,#0b0b10)}
.wk .banner img{object-fit:contain!important}
.wk .tile{background:linear-gradient(135deg,#14141f,#0b0b10)}
.wk .tile img{object-fit:contain!important;height:70%}
.wk .jv-art{background:#0b0b10}
.wk .jv-art img{object-fit:contain!important}
.wk .xp-btn{background:linear-gradient(135deg,#14141f,#0b0b10)}
.wk .xp-btn img,.wk .xp-btn video{object-fit:contain!important}
.wk .hv-f{background:#0b0b10}
.wk .hv-f img,.wk .hv-f video{object-fit:contain!important}
.wk .mq-logo img,.wk .tool img{object-fit:contain!important}

/* 3. Mentors: natural image height, compact */
.wk .wk-main .mentors{max-width:760px;gap:10px}
.wk .wk-main .mentor{padding:6px;border-radius:12px}
.wk .wk-main .mentor .ph{aspect-ratio:auto!important;background:#0b0b10;border-radius:8px;margin-bottom:6px}
.wk .wk-main .mentor .ph img{height:auto!important;width:100%;object-fit:contain!important}
.wk .wk-main .mentor h3{font-size:.82rem}
.wk .wk-main .mentor .role{font-size:.7rem}
.wk .wk-main .mentor .org{font-size:.7rem;margin-top:4px;padding-top:4px}

/* 4. Gallery: masonry with natural heights (no cropping) */
.wk .wk-main .gal{display:block;columns:2;column-gap:8px}
@media(min-width:800px){.wk .wk-main .gal{columns:4}}
.wk .wk-main .gal figure{aspect-ratio:auto;margin:0 0 8px;border-radius:10px}
.wk .wk-main .gal img{height:auto;object-fit:contain}

/* 5. Corporate + final CTA bands */
.wk .wk-main .band{background:linear-gradient(135deg,#14141f,#0b0b10)}
.wk .wk-main .band img{max-height:220px;height:auto;width:100%;object-fit:contain;background:#0b0b10}
.wk .wk-main .band h2,.wk .wk-main .band p{color:#fff}
.wk .wk-main .band p{opacity:.8}

/* 6. Smaller grid cards */
.wk .grid{grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.wk .row .card{flex-basis:min(210px,74vw)}
.wk .cbody{padding:8px 10px 10px;gap:4px}
.wk .cbody p.sd{font-size:.74rem}
.wk .tiles{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))}
.wk .row .tile{flex-basis:min(170px,56vw)}
.wk .wk-main .cert-frame{max-width:210px}

/* 7. WOW: gradient borders, glow, lift */
.wk .card,.wk .mentor,.wk .fb,.wk .opt,.wk .pain>div,.wk .tool,.wk .xp-btn{transition:transform .35s cubic-bezier(.2,.8,.2,1),box-shadow .35s,border-color .35s}
.wk .card:hover,.wk .mentor:hover,.wk .fb:hover,.wk .pain>div:hover{transform:translateY(-5px);border-color:var(--brand);box-shadow:0 16px 34px color-mix(in srgb,var(--brand) 24%,rgba(20,10,0,.2)),0 0 0 1px color-mix(in srgb,var(--brand) 45%,transparent)}
.wk .card.featured{box-shadow:0 0 0 1px var(--brand),0 10px 26px color-mix(in srgb,var(--brand) 28%,transparent)}
.wk .cj-card:hover{border-color:var(--brand);box-shadow:0 20px 44px rgba(8,8,14,.5),0 0 28px rgba(249,115,22,.35)}
.wk .wk-main .sechead h2,.wk .wk-main h2.h-xl{background:linear-gradient(90deg,var(--text),color-mix(in srgb,var(--brand) 70%,var(--text)));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.wk .btn-primary{background-size:200% 100%;transition:background-position .4s,transform .18s,box-shadow .2s}
.wk .btn-primary:hover{background-position:100% 0}
.wk .gsbar-btn{background:#2d1250}

/* ===== FIXES ===== */

/* 1. Experience videos: no side bars */
.wk .wk-main .xp-btn{background:#111}
.wk .wk-main .xp-btn img,.wk .wk-main .xp-btn video{object-fit:cover!important}

/* 2. Mentors: full width, 4 equal cards */
.wk .wk-main .mentors{max-width:none;margin:6px 0 0;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
@media(max-width:900px){.wk .wk-main .mentors{grid-template-columns:repeat(2,minmax(0,1fr))}}
.wk .wk-main .mentor{height:100%;padding:8px}
.wk .wk-main .mentor .ph{aspect-ratio:4/5!important;background:#1a1a22}
.wk .wk-main .mentor .ph img{height:100%!important;width:100%;object-fit:cover!important;object-position:50% 20%}

/* 3. Corporate / final CTA band: image fills, text visible */
.wk .wk-main .band{background:linear-gradient(135deg,#14141f,#0b0b10);align-items:stretch}
.wk .wk-main .band img{height:100%;max-height:260px;min-height:180px;object-fit:cover;object-position:50% 40%;background:none}
.wk .wk-main .band .btn-ghost{color:#fff;border-color:rgba(255,255,255,.55)}
.wk .wk-main .band .btn-ghost:hover{background:rgba(255,255,255,.14);border-color:#fff}

/* 4. Workshop cards: image fills, teaser fills the row */
.wk .art img{object-fit:cover!important}
.wk .grid.teaser{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
@media(max-width:900px){.wk .grid.teaser{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:560px){.wk .grid.teaser{grid-template-columns:1fr}}
.wk .grid.teaser .card.featured{box-shadow:var(--shadow);border-color:var(--ln)}
.wk .grid.teaser .art{aspect-ratio:16/8}
.wk .grid.teaser .art img{object-fit:cover!important}

/* gallery: single moving row */
.wk .gal-i{position:relative;flex:0 0 min(300px,72vw);margin:0;aspect-ratio:16/10;border-radius:12px;overflow:hidden;background:#111;box-shadow:var(--shadow);transition:transform .3s,box-shadow .3s}
.wk .gal-i img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1);-webkit-user-drag:none}
.wk .gal-i:hover{transform:translateY(-4px);box-shadow:0 14px 30px color-mix(in srgb,var(--brand) 26%,rgba(20,10,0,.2))}
.wk .gal-i:hover img{transform:scale(1.06)}
.wk .gal-i figcaption{position:absolute;left:0;right:0;bottom:0;padding:16px 10px 7px;color:#fff;font-size:.72rem;font-weight:600;background:linear-gradient(0deg,rgba(8,8,14,.78),transparent)}

/* ===== BANDS: image full (no crop), text centered ===== */
.wk .wk-main .band{display:grid;grid-template-columns:1fr;align-items:center;background:linear-gradient(135deg,#14141f,#0b0b10)}
@media(min-width:760px){.wk .wk-main .band{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}}
.wk .wk-main .band img{width:100%;height:auto!important;max-height:none!important;min-height:0!important;object-fit:contain;display:block;background:none;align-self:center}
.wk .wk-main .band-in{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:6px;padding:16px 22px;min-width:0}
.wk .wk-main .band h2{font-size:clamp(1rem,1.8vw,1.3rem);margin:0}
.wk .wk-main .band p{font-size:.84rem;margin:0}
.wk .wk-main .band .cert-act{margin-top:10px;gap:8px}
.wk .wk-main .band .btn-lg{min-height:36px;padding:6px 16px;font-size:.82rem}
.wk .wk-main .band{min-height:0!important}
section .band[style]{min-height:0!important}

/* ===== MENTORS: compact cards like reference ===== */
.wk .wk-main .mentors{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;max-width:none;margin:8px 0 0}
.wk .wk-main .mentors>.wkrv{flex:0 0 168px;width:168px;height:auto}
@media(max-width:560px){.wk .wk-main .mentors>.wkrv{flex-basis:calc(50% - 6px);width:calc(50% - 6px)}}
.wk .wk-main .mentor{padding:8px;border-radius:12px;gap:0;height:100%}
.wk .wk-main .mentor .ph{aspect-ratio:1/1!important;border-radius:8px;margin-bottom:7px;background:#1a1a22}
.wk .wk-main .mentor .ph img{width:100%;height:100%!important;object-fit:cover!important;object-position:50% 22%}
.wk .wk-main .mentor h3{font-size:.8rem;line-height:1.2}
.wk .wk-main .mentor .role{font-size:.68rem;min-height:0}
.wk .wk-main .mentor .org{margin-top:6px;padding-top:6px;font-size:.68rem}

/* ===== MENTORS: full-row, equal cards, brand colors ===== */
.wk .wk-main .mentors{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;justify-content:stretch;max-width:none;margin:10px 0 0}
@media(max-width:900px){.wk .wk-main .mentors{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}}
.wk .wk-main .mentors>.wkrv{flex:none;width:auto;height:100%}
.wk .wk-main .mentor{padding:12px;border-radius:14px;height:100%;background:#fcfcfb}
.wk .wk-main .mentor .ph{aspect-ratio:1/1!important;border-radius:10px;margin-bottom:10px;background:#1a1a22}
.wk .wk-main .mentor .ph img{width:100%;height:100%!important;object-fit:cover!important;object-position:50% 20%}
.wk .wk-main .mentor h3{font-size:.98rem;font-weight:800;line-height:1.2}
.wk .wk-main .mentor .role{font-size:.8rem;margin-top:2px}
.wk .wk-main .mentor .org{margin-top:10px;padding-top:9px;border-top:1px dashed var(--ln);font-size:1rem;font-weight:800;letter-spacing:.03em}
.wk .mentor .ilm-g{color:#16a34a}
.wk .mentor .ora-o{color:#f97316}

/* ===== text on background -> white card ===== */
.wk .wk-main .sechead{align-items:center;background:var(--solid);border:1px solid var(--ln);border-radius:14px;padding:12px 16px;box-shadow:var(--shadow);margin-bottom:12px}
.wk .wk-main .sechead p{max-width:70ch}
.wk .wk-main .sechead .btn{flex:none}

/* FAQ in white card */
.wk .faq2{background:var(--solid);border:1px solid var(--ln);border-radius:16px;box-shadow:var(--shadow);padding:clamp(16px,3vw,28px)}

/* certificate note inside dark band */
.wk .wk-main .band .cert-note{color:rgba(255,255,255,.7);font-size:.7rem;margin-top:8px;max-width:60ch}
.wk .wk-main .band .btn[disabled]{color:rgba(255,255,255,.6);border-color:rgba(255,255,255,.3)}

/* white cards for loose text */
.wk .textcard{margin-top:12px;padding:14px 18px;background:var(--solid);border:1px solid var(--ln);border-radius:14px;box-shadow:var(--shadow)}
.wk .countpill{display:inline-block;margin-top:14px;padding:6px 14px;background:var(--solid);border:1px solid var(--ln);border-radius:999px;box-shadow:var(--shadow);font-size:.82rem;font-weight:600;color:var(--text)}
.wk .jn-info.panel{padding:16px;color:var(--text)}
.wk .jn-info.panel h1,.wk .jn-info.panel .jn-sub,.wk .jn-info.panel .jn-line,.wk .jn-info.panel .jn-pts li{color:var(--text)}
.wk .jn-info.panel .jn-sub{color:var(--muted)}
.wk .jn-info.panel .banner{border-radius:12px}
.wk .jn-pts li{background:color-mix(in srgb,var(--text) 4%,transparent);padding:8px 10px;border-radius:10px}

/* heading brand colors (gradient text override) */
.wk .wk-main h2.wl-title{background:none;-webkit-text-fill-color:initial;color:var(--text)}
.wk .wl-title .wl-ilm{color:#16a34a;-webkit-text-fill-color:#16a34a}
.wk .wl-title .wl-ora{color:#f97316;-webkit-text-fill-color:#f97316}
.wk .wl-heart{display:inline-block;width:24px;height:24px;vertical-align:-4px;margin:0 2px}
.wk .wk-main h2.wl-title{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wk .wl-title .wl-ilm,.wk .wl-title .wl-ora{display:inline}

/* mentors: same width, shorter height */
.wk .wk-main .mentor{padding:8px;border-radius:12px}
.wk .wk-main .mentor .ph{aspect-ratio:16/10!important;margin-bottom:6px;border-radius:8px}
.wk .wk-main .mentor .ph img{object-position:50% 18%}
.wk .wk-main .mentor h3{font-size:.86rem}
.wk .wk-main .mentor .role{font-size:.72rem}
.wk .wk-main .mentor .org{margin-top:6px;padding-top:6px;font-size:.84rem}

/* mentors: head must not be cut */
.wk .wk-main .mentor .ph{aspect-ratio:4/3!important}
.wk .wk-main .mentor .ph img{object-fit:cover!important;object-position:50% 0%!important}

/* mentors: moving row */
.wk .row .mentor-i{flex:0 0 min(250px,70vw);min-width:0;height:auto}
.wk .mentor-i .ph img{-webkit-user-drag:none}
/* video feedback cards */
.wk .fb-vid{aspect-ratio:16/10}
.wk .fb-vid img{object-fit:cover}
.wk .fb-vid::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,8,14,.55),transparent 55%)}
.wk .fb-play{z-index:1;transition:transform .25s}
.wk .fb-vid:hover .fb-play{transform:scale(1.12)}
.wk .fb-watch{position:absolute;left:10px;bottom:8px;z-index:1;padding:3px 10px;border-radius:999px;font-size:.66rem;font-weight:800;color:#fff;background:rgba(10,12,30,.72);backdrop-filter:blur(6px)}
@media(max-width:520px){.wk .wk-main h2.wl-title{white-space:normal}}

/* registration: equal cards */
.wk .jn{align-items:stretch;max-width:1000px}
.wk .jn-info.panel,.wk .jn-right,.wk .jn-right .jn-card{height:100%}
.wk .jn-right{display:flex;flex-direction:column}
.wk .jn-right .jn-card{flex:1;margin:0}
.wk .jn-info.panel{margin:0}

/* ===== UNBOLD: all headings and subheadings ===== */
.wk h1,.wk h2,.wk h3,.wk h4,
.wk .h-xl,.wk .faq2-h,.wk .hero2 h1,.wk .band h2,.wk .jn-info h1,
.wk .hero2-card h3,.wk .hero2-card small,.wk .xp-cap b,.wk .xp-cap small,
.wk .cbody .cat,.wk .cbody h3,.wk .tile h3,.wk .mentor h3,.wk .jr-step h3,.wk .jv-body h3,
.wk .cj-card h3,.wk .rm-day h3,.wk .jv-day h3,.wk .jv-dn,.wk .cj-ph,.wk .cj-pl b,
.wk .jv-d li b,.wk .plist b,.wk .ilist b,.wk .inst b,.wk .pain b,.wk .opt h3,
.wk .jn-pts b,.wk .facts b,.wk .fmt b,.wk .fb-head b,.wk .jv-mhead h2,.wk .jv-mhead small,
.wk .jv-bartxt,.wk .jv-over h4,.wk .jv-over b,.wk .proj b,.wk .jv-no,.wk .jr-no,
.wk .wl-title,.wk .wl-title .wl-ilm,.wk .wl-title .wl-ora,.wk .mentor .org,
.wk .nl h3,.wk .sechead h2,.wk .panel h2,.wk .panel h3,.wk .state h2{font-weight:400 !important}
`;


const TITLES = {
  workshops: ['Explore Workshops | ILM ORA', 'Browse live and on-demand workshops in AI, development, design, marketing, business and leadership. Search, filter and register in minutes.'],
     feedback: ['Learner feedback | ILM ORA', 'Real feedback and video testimonials from ILM ORA workshop learners.'],
  catalog: ['All Workshops | ILM ORA', 'Browse every live and on-demand ILM ORA workshop. Search, filter and register in minutes.'],
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
    if (a === 'catalog') return <Catalog />;
  if (a === 'feedback') return <FeedbackPage />;
  if (!a || a === 'workshops') return <Home />;
  return <StateBox title="We could not find that page" text="The link may be old or mistyped."><LinkBtn href="/catalog">Browse workshops</LinkBtn></StateBox>;
}

function WorkshopsApp({ openLogin, initialParts }) {
  const route = usePathRoute(initialParts);
  const mainRef = useRef(null);
  const key = route.parts.join('/');
  const first = route.parts[0] || 'workshops';

  useEffect(() => {
    const t = TITLES[first] || TITLES.workshops;
    if (!(first === 'workshops' && route.parts[1])) setPageMeta(t[0], t[1]); // detail page apna title khud set karta hai
    window.scrollTo({ top: 0 });
    if (mainRef.current) mainRef.current.focus({ preventScroll: true });
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RouteCtx.Provider value={route}>
      <div className="wk">
        <style dangerouslySetInnerHTML={{ __html: WK_CSS }} />
                <style dangerouslySetInnerHTML={{ __html: GS_CSS }} />
        <style dangerouslySetInnerHTML={{ __html: COMPACT_CSS }} />
        <AppProviders openLogin={openLogin}>
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
 * Full page: PublicLayout (Navbar + Footer) + .ilm theme wrapper + workshops app.
 * Props router/page se aate hain (Ilmora-Microsoft / StudyAbroad / Careers jaise).
 * Prop na mile to page apni theme state se chalta hai. `embedded` dene par sirf content render hota hai.
 */
export default function IlmoraWorkshops({ theme: themeProp, toggleTheme: toggleProp, setShowLoginModal, scrollToSection, embedded = false, initialParts }) {
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
  const openLogin = setShowLoginModal ?? (() => { window.location.href = '/onboarding'; });
  const scrollTo = scrollToSection ?? ((id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));

  if (embedded) return <WorkshopsApp openLogin={openLogin} initialParts={initialParts} />;
  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme} setShowLoginModal={openLogin} scrollToSection={scrollTo}>
      <style dangerouslySetInnerHTML={{ __html: HOST_CSS }} />
      <div className={"ilm" + (theme === "dark" ? " dark" : "")}>
      <WorkshopsApp openLogin={openLogin} initialParts={initialParts} />
      </div>
    </PublicLayout>
  );
}