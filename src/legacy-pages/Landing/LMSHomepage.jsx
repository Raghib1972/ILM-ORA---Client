
// "use client";

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import SignupModal from "./SignupModal";
// import ForgotPasswordModal from "./ForgotPasswordModal";
// import SplitText from "../../components/SplitText";
// import {
//   ArrowRight,
//   Award,
//   BookOpen,
//   Bot,
//   ChevronLeft,
//   ChevronRight,
//   ClipboardList,
//   Clock,
//   Flame,
//   GraduationCap,
//   Heart,
//   Lightbulb,
//   Mic,
//   MessageSquare,
//   Quote,
//   PlayCircle,
//   Sparkles,
//   Star,
//   Target,
//   TrendingUp,
//   Trophy,
//     Users,
//   Wand2,
//   Zap,
//   BarChart3,
//   CalendarClock,
//   FileText,
//   Shield,
//   Video,
//   Cloud,
//   Globe,
//   Layers,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "@/lib/routerCompat";
// import heroVideo from "../../assets/hero-1.mp4";
// import heroStudent2 from "../../assets/hero-student-2.webp";
// import heroStudent3 from "../../assets/hero-student-3.webp";
// import hero4 from "../../assets/hero-4.webp";
// import hero5 from "../../assets/hero-5.webp";
// import hero6 from "../../assets/hero-6.webp";
// import hero7 from "../../assets/hero-7.webp";
// import hero8 from "../../assets/hero-8.webp";
// import heroStudent from "../../assets/hero-student.webp";
// import aiChatImg from "../../assets/AI Companion/AI_Chat.webp";
// import aiWriteImg from "../../assets/AI Companion/Help_Me_Write.webp";
// import aiNotesImg from "../../assets/AI Companion/Live_Notes.webp";
// import aiWorkflowsImg from "../../assets/AI Companion/Workflows.webp";
// import workspacePreviewImg from "../../assets/WorkspacePreview.webp";
// import workspaceDashboardImg from "../../assets/Dashboard.webp";
// import workspaceHostImg from "../../assets/Host Controller.webp";
// import workspaceRecordingsImg from "../../assets/RecordingsNotes.webp";
// import workspaceStartJoinImg from "../../assets/StartJoin.webp";
// import ctaStudent from "../../assets/cta-student.webp";
// import auth from "../../auth";
// import Navbar from "./components/Navbar";
// import AnnouncementBanner from "./components/AnnouncementBanner";
// import authService from "../../services/authService";
// import { courseService } from "../../services/courseService";
// import { subscribeNewsletter } from "../../services/notificationService";
// import TexoraFloatingWidget from "./components/TexoraFloatingWidget";
// import HorizontalCarousel from "./components/HorizontalCarousel";
// import CategoryTabScroller from "./components/CategoryTabScroller";
// import WatchNowSection from "./components/WatchNow";
// import Footer from "./components/Footer";

// // Renders children only after mounting in the browser (avoids hydration mismatch)
// function ClientOnly({ children, fallback = null }) {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);
//   return mounted ? children : fallback;
// }

// const GOOGLE_CLIENT_ID =
//   "572421778240-akk3kkb4f60ukuv9pcfrpg2ielm09thk.apps.googleusercontent.com";

// /* ── Fallback data for the "Top Global Companies" section ──
//    Used only while the backend call is loading or if it returns nothing. */
// const FALLBACK_TECH_PARTNERS = [
//   { src: "/aws.png", name: "AWS", desc: "Amazon Web Services" },
//   { src: "/Google.jpg", name: "Google Cloud", desc: "Google Cloud Platform" },
//   { src: "/Amazone.jpg", name: "Amazon AWS", desc: "Amazon Web Services" },
//   {
//     src: "/Micrososft.jpg",
//     name: "Microsoft Azure",
//     desc: "Microsoft Cloud Platform",
//   },
// ];

// const FALLBACK_BIZ_PARTNERS = [
//   { src: "/Picture1.jpg", name: "Texora AI", desc: "AI & Digital Solutions" },
//   {
//     src: "/UFS-Logo.jpg",
//     name: "UFS Network",
//     desc: "Unified Consultancy Services",
//   },
// ];

// const ECOSYSTEM_COLORS = ["blue", "orange", "purple", "green", "rose"];

// const FALLBACK_ECOSYSTEM = [
//   {
//     name: "TORA CX",
//     color: "blue",
//     desc: "Customer experience platform",
//     Icon: null,
//     svgPath: (
//       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//     ),
//   },
//   {
//     name: "UNIFIED CRM",
//     color: "orange",
//     desc: "AI-driven CRM for sales",
//     Icon: Users,
//   },
//   {
//     name: "ILM ORA",
//     color: "purple",
//     desc: "LMS with AI learning paths",
//     Icon: GraduationCap,
//   },
//   {
//     name: "INNOVORA AI",
//     color: "green",
//     desc: "AI-powered innovation suite",
//     Icon: Lightbulb,
//   },
//   {
//     name: "TASK ORBIT",
//     color: "rose",
//     desc: "AI-powered task management",
//     Icon: ClipboardList,
//   },
// ];

// // MentorTestimonialCarousel — horizontally scrollable testimonial cards with
// // arrow navigation + dot pagination. Purely presentational; consumes the
// // same `testimonials` array/state already loaded from the backend — no
// // data-fetching or business logic here.
// // ─────────────────────────────────────────────────────────────────────────────

// // Small avatar helper: shows the backend image in a circular frame,
// // falls back to initials if there's no image or the image fails to load.
// function MentorAvatar({ name, image, size = "w-9 h-9", showBadge = false }) {
//   const [imgError, setImgError] = useState(false);
//   const initials = (name || "").charAt(0).toUpperCase();

//   return (
//     <div className={`relative ${size} flex-shrink-0`}>
//       <div
//         className={`${size} rounded-full overflow-hidden bg-[#1E293B] dark:bg-[#F97316] flex items-center justify-center text-white font-bold`}
//       >
//         {image && !imgError ? (
//           <img
//             src={image}
//             alt={name}
//             className="w-full h-full object-cover"
//             onError={() => setImgError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//       {showBadge && (
//         <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#22C55E] border-2 border-white dark:border-gray-900 flex items-center justify-center">
//           <svg
//             viewBox="0 0 24 24"
//             fill="none"
//             className="w-2.5 h-2.5 sm:w-3 sm:h-3"
//           >
//             <path
//               d="M5 13l4 4L19 7"
//               stroke="white"
//               strokeWidth="3"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </span>
//       )}
//     </div>
//   );
// }

// function MentorTestimonialCarousel({ testimonials }) {
//   const scrollerRef = useRef(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   // UI-only: tracks which cards have "Read More" expanded. Does not touch
//   // backend data, carousel/scroll logic, or pagination logic below.
//   const [expandedCards, setExpandedCards] = useState({});
//   const toggleExpanded = (i) =>
//     setExpandedCards((prev) => ({ ...prev, [i]: !prev[i] }));

//   const scrollToIndex = (index) => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     const card = el.children[index];
//     if (card) {
//       el.scrollTo({
//         left: card.offsetLeft - el.offsetLeft,
//         behavior: "smooth",
//       });
//     }
//     setActiveIndex(index);
//   };

//   const handlePrev = () => scrollToIndex(Math.max(activeIndex - 1, 0));
//   const handleNext = () =>
//     scrollToIndex(Math.min(activeIndex + 1, testimonials.length - 1));

//   const handleScroll = () => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     let closest = 0;
//     let closestDist = Infinity;
//     Array.from(el.children).forEach((child, i) => {
//       const dist = Math.abs(child.offsetLeft - el.scrollLeft - el.offsetLeft);
//       if (dist < closestDist) {
//         closestDist = dist;
//         closest = i;
//       }
//     });
//     setActiveIndex(closest);
//   };

//   if (!testimonials || testimonials.length === 0) return null;

//   return (
//     <div className="w-full">
//       <style>{`
//         .mentor-scroll::-webkit-scrollbar { display: none; }
//         .mentor-scroll { -ms-overflow-style: none; scrollbar-width: none; }
//         @keyframes mentorFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>

//       <div className="relative flex items-center gap-3 sm:gap-4 lg:gap-6">
//         {/* Prev arrow — outside the card, desktop/tablet */}
//         <button
//           onClick={handlePrev}
//           aria-label="Previous testimonial"
//           disabled={activeIndex === 0}
//           className="hidden sm:flex flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.08)] items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] group transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
//         >
//           <ChevronLeft className="w-5 h-5 text-[#1E293B] dark:text-white group-hover:text-white transition-colors" />
//         </button>

//         {/* Scroller */}
//         {/* Scroller */}
//         <div
//           ref={scrollerRef}
//           onScroll={handleScroll}
//           style={{ scrollSnapType: "x mandatory" }}
//           className="mentor-scroll flex items-start overflow-x-auto flex-1 min-w-0 gap-6"
//         >
//           {testimonials.map((t, i) => {
//             const isExpanded = !!expandedCards[i];
//             return (
//               <div
//                 key={i}
//                 style={{ scrollSnapAlign: "start" }}
//                 className="w-full md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] min-w-0 flex-shrink-0"
//               >
//                 <div
//                   className="relative h-full bg-white dark:bg-gray-900 rounded-[22px] border border-[#ECECEC] dark:border-gray-800 shadow-[0_8px_24px_rgba(17,24,39,0.06)] p-5 flex flex-col transition-all duration-300 ease-out hover:shadow-[0_18px_38px_rgba(17,24,39,0.12)] hover:-translate-y-1.5"
//                   style={{ animation: "mentorFadeIn 0.4s ease both" }}
//                 >
//                   {/* Quote icon — top-left, solid orange */}
//                   <Quote
//                     className="w-9 h-9 text-[#F97316] mb-3 flex-shrink-0"
//                     fill="currentColor"
//                     strokeWidth={0}
//                   />

//                   {/* Testimonial text */}
//                   <p
//                     className="text-gray-600 dark:text-gray-300 text-[14px] sm:text-[15px] flex-1"
//                     style={{
//                       lineHeight: "170%",
//                       whiteSpace: "pre-wrap",
//                       overflowWrap: "break-word",
//                       wordBreak: "break-word",
//                       display: "-webkit-box",
//                       WebkitBoxOrient: "vertical",
//                       WebkitLineClamp: isExpanded ? "unset" : 6,
//                       overflow: isExpanded ? "visible" : "hidden",
//                     }}
//                   >
//                     {t.text}
//                   </p>

//                   {t.text && t.text.length > 160 && (
//                     <button
//                       type="button"
//                       onClick={() => toggleExpanded(i)}
//                       className="mt-2 text-[13px] font-bold text-[#F97316] hover:underline bg-transparent border-none p-0 cursor-pointer text-left w-fit"
//                     >
//                       {isExpanded ? "Read Less" : "Read More"}
//                     </button>
//                   )}

//                   {/* LinkedIn + date row */}
//                   <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F1F1F1] dark:border-gray-800 text-xs text-gray-400">
//                     <span className="inline-flex items-center gap-1 text-[#0A66C2] font-semibold">
//                       <svg
//                         viewBox="0 0 24 24"
//                         className="w-3.5 h-3.5"
//                         fill="currentColor"
//                       >
//                         <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
//                       </svg>
//                       LinkedIn
//                     </span>
//                     {t.date && (
//                       <>
//                         <span className="text-gray-300">•</span>
//                         <span>{t.date}</span>
//                       </>
//                     )}
//                   </div>

//                   {/* Bottom profile row */}
//                   <div className="flex items-center gap-3 mt-4">
//                     <MentorAvatar
//                       name={t.name}
//                       image={t.image}
//                       size="w-12 h-12"
//                       showBadge
//                     />
//                     <div className="min-w-0">
//                       <p className="font-bold text-[#1E293B] dark:text-white text-sm leading-snug truncate">
//                         {t.name}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug truncate">
//                         {t.role}
//                       </p>
//                       {t.experience && (
//                         <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-snug mt-0.5">
//                           {t.experience}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Next arrow — outside the card, desktop/tablet */}
//         <button
//           onClick={handleNext}
//           aria-label="Next testimonial"
//           disabled={activeIndex === testimonials.length - 1}
//           className="hidden sm:flex flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.08)] items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] group transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
//         >
//           <ChevronRight className="w-5 h-5 text-[#1E293B] dark:text-white group-hover:text-white transition-colors" />
//         </button>
//       </div>

//       {/* Arrows on mobile — sit below the card instead of overlapping it */}
//       <div className="flex sm:hidden items-center justify-center gap-4 mt-4">
//         <button
//           onClick={handlePrev}
//           aria-label="Previous testimonial"
//           disabled={activeIndex === 0}
//           className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center disabled:opacity-30"
//         >
//           <ChevronLeft className="w-4 h-4 text-[#1E293B] dark:text-white" />
//         </button>
//         <button
//           onClick={handleNext}
//           aria-label="Next testimonial"
//           disabled={activeIndex === testimonials.length - 1}
//           className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center disabled:opacity-30"
//         >
//           <ChevronRight className="w-4 h-4 text-[#1E293B] dark:text-white" />
//         </button>
//       </div>

//       {/* Dot pagination */}
//       <div className="flex items-center justify-center gap-2 mt-5 sm:mt-6">
//         {testimonials.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => scrollToIndex(i)}
//             aria-label={`Go to testimonial ${i + 1}`}
//             style={{
//               width: activeIndex === i ? "24px" : "8px",
//               height: "8px",
//               borderRadius: "9999px",
//               background: activeIndex === i ? "#F97316" : "#CBD5E1",
//               border: "none",
//               cursor: "pointer",
//               padding: 0,
//               transition: "width 300ms ease, background 300ms ease",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// function TopCompaniesCarousel({ logos }) {
//   const [duration, setDuration] = useState(30);
//   const [brokenSrcs, setBrokenSrcs] = useState(new Set());

//   // Responsive speed: desktop 30-35s, tablet 25-30s, mobile 20-25s
//   useEffect(() => {
//     const calcDuration = () => {
//       const w = window.innerWidth;
//       if (w >= 1024) setDuration(32);
//       else if (w >= 768) setDuration(27);
//       else setDuration(22);
//     };
//     calcDuration();
//     window.addEventListener("resize", calcDuration);
//     return () => window.removeEventListener("resize", calcDuration);
//   }, []);

//   if (!logos || logos.length === 0) return null;

//   // Always duplicate — required for a seamless CSS loop at translate(-50%)
//   const infiniteLogos = [...logos, ...logos];

//   return (
//     <div className="relative max-w-[1400px] mx-auto">
//       <style>{`
//         @keyframes ilmora-marquee {
//           0%   { transform: translate3d(0,0,0); }
//           100% { transform: translate3d(-50%,0,0); }
//         }
//         .ilmora-marquee-track {
//           display: flex;
//           width: max-content;
//           align-items: center;
//           animation: ilmora-marquee var(--marquee-duration, 30s) linear infinite;
//           will-change: transform;
//           transform: translate3d(0,0,0);
//         }
//         /* Pause on hover — desktop only, matches spec */
//         @media (hover: hover) and (pointer: fine) {
//           .ilmora-marquee-viewport:hover .ilmora-marquee-track {
//             animation-play-state: paused;
//           }
//         }
//       `}</style>

//       <div
//         className="ilmora-marquee-viewport bg-white dark:bg-[#111827] rounded-[18px] sm:rounded-[20px] lg:rounded-[22px] border border-gray-100 dark:border-white/[0.08] h-[88px] sm:h-[96px] lg:h-[104px] flex items-center overflow-hidden shadow-[0_15px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
//         style={{
//           paddingLeft: 40,
//           paddingRight: 40,
//           "--marquee-duration": `${duration}s`,
//         }}
//       >
//         <div className="ilmora-marquee-track h-full">
//           {infiniteLogos
//             .filter((logo) => logo?.name || logo?.src)
//             .map((logo, i) => {
//               const isBroken = logo.src && brokenSrcs.has(logo.src);
//               const showImage = Boolean(logo.src) && !isBroken;
//               const initials = (logo.name || "?")
//                 .trim()
//                 .split(/\s+/)
//                 .slice(0, 2)
//                 .map((w) => w[0])
//                 .join("")
//                 .toUpperCase();

//               return (
//                 <div
//                   key={`${logo.name}-${i}`}
//                   className="flex items-center justify-center h-full flex-shrink-0 px-4 sm:px-6 transition-transform duration-300 hover:scale-105"
//                   style={{ width: 160 }}
//                   title={logo.desc || logo.name}
//                 >
//                   {showImage ? (
//                     <img
//                       src={logo.src}
//                       alt={logo.name}
//                       loading="lazy"
//                       className="max-h-[45px] sm:max-h-[48px] max-w-full object-contain"
//                       onError={() =>
//                         setBrokenSrcs((prev) => new Set(prev).add(logo.src))
//                       }
//                     />
//                   ) : (
//                     <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1E293B] dark:bg-[#F97316] flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
//                       {initials}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }


//  // ─────────────────────────────────────────────────────────────────────────────
// // AiCompanionTeaser — preview card for the AI Companion product. Chips and
// // dots switch between the four feature screenshots (auto-rotates every 3.5s,
// // pauses on hover). Clicking the preview or CTA opens /ai-companion.
// // ─────────────────────────────────────────────────────────────────────────────
// function AiCompanionTeaser({ navigate }) {
//   const cardRef = useRef(null);
//   const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [paused, setPaused] = useState(false);

//   const features = [
//     { icon: MessageSquare, label: "AI Chat", img: aiChatImg },
//     { icon: Wand2, label: "Help Me Write", img: aiWriteImg },
//     { icon: Mic, label: "Live Notes", img: aiNotesImg },
//     { icon: Zap, label: "Workflows", img: aiWorkflowsImg },
//   ];
//   const activeImg = features[activeFeature].img;

//   // Auto-rotate every 3.5s; pauses while the user hovers the preview
//   useEffect(() => {
//     if (paused) return;
//     const t = setInterval(() => {
//       setActiveFeature((p) => (p + 1) % features.length);
//     }, 3500);
//     return () => clearInterval(t);
//   }, [activeFeature, paused]);

//   const handleMouseMove = (e) => {
//     const el = cardRef.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const px = (e.clientX - rect.left) / rect.width - 0.5;
//     const py = (e.clientY - rect.top) / rect.height - 0.5;
//     setTilt({ rx: py * -8, ry: px * 10 });
//   };
//   const resetTilt = () => setTilt({ rx: 0, ry: 0 });

//   const goToAiCompanion = () => navigate("/ai-companion");

//   return (
//     <section
//       id="ai-companion"
//       className="relative pt-4 pb-8 sm:pt-6 sm:pb-10 px-6 scroll-mt-20 overflow-hidden bg-[#F6EDE6] dark:bg-black"
//     >
//       <style>{`
//         @keyframes aicFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
//         @keyframes aicFade { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
//         .aic-img-float { animation: aicFloat 5s ease-in-out infinite; }
//         @media (prefers-reduced-motion: reduce) {
//           .aic-img-float { animation: none !important; }
//         }
//       `}</style>

//       {/* ambient background glow — static, low-cost */}
//       <div
//         className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full blur-2xl pointer-events-none opacity-40"
//         style={{ background: "radial-gradient(circle, rgba(249,115,22,0.35), transparent 70%)" }}
//       />
//       <div
//         className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-2xl pointer-events-none opacity-25"
//         style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)" }}
//       />

//       <div className="max-w-6xl mx-auto relative grid lg:grid-cols-2 items-center gap-10 lg:gap-12">
//         {/* left: copy + chips + CTA */}
//         <div className="text-center lg:text-left">
          

//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1E293B] dark:text-white mb-4 leading-tight">
//             Meet Your <br className="hidden lg:block" />
//             <span className="text-[#F97316]">AI Companion</span>
//           </h2>

//                     <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
//             Chat, write, transcribe meetings and automate workflows — one AI
//             sidebar that follows you across every course and session.
//           </p>

//           <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
//             {features.map((f, i) => (
//               <button
//                 type="button"
//                 key={f.label}
//                 onClick={() => setActiveFeature(i)}
//                 aria-pressed={activeFeature === i}
//                 className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 cursor-pointer ${
//                   activeFeature === i
//                     ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-500/30"
//                     : "bg-white dark:bg-transparent text-[#1E293B] dark:text-white border-[#1E293B]/10 hover:border-[#F97316]/40"
//                 }`}
//                 style={
//                   activeFeature === i
//                     ? undefined
//                     : { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }
//                 }
//               >
//                 <f.icon
//                   className={`w-3.5 h-3.5 ${
//                     activeFeature === i ? "text-white" : "text-[#F97316]"
//                   }`}
//                 />
//                 {f.label}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={goToAiCompanion}
//             className="inline-flex items-center justify-center gap-2 bg-[#EA580C] text-white font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base whitespace-nowrap hover:bg-[#C2410C] transition-all hover:scale-105 shadow-lg"
//           >
//             Explore AI Companion <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>

//         {/* right: switching preview image + dots */}
//         <div className="w-full">
//           <div
//             ref={cardRef}
//             onMouseMove={handleMouseMove}
//             onMouseEnter={() => setPaused(true)}
//             onMouseLeave={() => {
//               resetTilt();
//               setPaused(false);
//             }}
//             onClick={goToAiCompanion}
//             role="button"
//             tabIndex={0}
//             aria-label="Open AI Companion"
//             onKeyDown={(e) => e.key === "Enter" && goToAiCompanion()}
//             className="aic-img-float relative cursor-pointer select-none"
//             style={{
//               transformStyle: "preserve-3d",
//               transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
//               transition: "transform 0.15s ease-out",
//             }}
//           >
//               <img
//               key={activeFeature}
//               src={activeImg.src || activeImg}
//               alt={`AI Companion — ${features[activeFeature].label}`}
//               loading="lazy"
//               decoding="async"
//               className="w-full h-auto rounded-2xl shadow-2xl"
//               style={{ animation: "aicFade 0.35s ease both" }}
//             />
//           </div>

//           {/* Dot pagination */}
//           <div className="flex items-center justify-center gap-2 mt-5">
//             {features.map((f, i) => (
//               <button
//                 type="button"
//                 key={f.label}
//                 onClick={() => setActiveFeature(i)}
//                 aria-label={`Show ${f.label}`}
//                 style={{
//                   width: activeFeature === i ? "28px" : "10px",
//                   height: "10px",
//                   borderRadius: "9999px",
//                   background: activeFeature === i ? "#F97316" : "rgba(30,41,59,0.25)",
//                   border: "none",
//                   cursor: "pointer",
//                   padding: 0,
//                   transition: "width 0.35s ease, background 0.35s ease",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
       
// // ─────────────────────────────────────────────────────────────────────────────
// // CalendarShowcase — "ILM ORA Calendry" tab content (ported from ilmorameet.jsx)
// // ─────────────────────────────────────────────────────────────────────────────
// const CAL_FEATURES = [
//   {
//     key: "video",
//     Icon: Video,
//     label: "Live sessions",
//     badge: "Scheduling",
//     heading: "Book a seat with the world’s best mentors",
//     desc: "Giving you complete control over your calendar, ILM ORA makes it the easiest and most flexible way to find your next live class.",
//     linkText: "Learn more",
//     duration: 7200,
//   },
//   {
//     key: "spark",
//     Icon: Sparkles,
//     label: "AI-matched mentors",
//     badge: "AI matching",
//     heading: "Get matched to the right mentor, instantly",
//     desc: "Texora AI reads your goal and current level, then recommends the class and mentor most likely to move you forward this week.",
//     linkText: "See how matching works",
//     duration: 3200,
//   },
//   {
//     key: "shield",
//     Icon: Shield,
//     label: "Verified credentials",
//     badge: "Credentials",
//     heading: "A certificate employers can actually check",
//     desc: "Every certificate carries a verifiable link, so anyone you share it with can confirm it in seconds.",
//     linkText: "View a sample certificate",
//     duration: 3200,
//   },
//   {
//     key: "chat",
//     Icon: MessageSquare,
//     label: "Live chat support",
//     badge: "Support",
//     heading: "Help is one message away",
//     desc: "Stuck mid-assignment or unsure which track fits? Message a mentor or our support team and get a real answer, fast.",
//     linkText: "Message support",
//     duration: 3200,
//   },
// ];

// const CAL_DATE = 24;
// const CAL_SLOT = "2:00 PM";
// // October 2026 starts on a Thursday → 4 blank cells before day 1
// const CAL_BLANKS = 4;
// const CAL_TODAY = 3;

// function CalAvatar({ initials, from, to, size = "w-10 h-10" }) {
//   return (
//     <span
//       className={`${size} rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-bold text-[#1E293B]`}
//       style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
//     >
//       {initials}
//     </span>
//   );
// }

// function CalendarShowcase({ onLearnMore }) {
//   const [reduce, setReduce] = useState(false);
//   const [active, setActive] = useState(0);
//   const [pickedDate, setPickedDate] = useState(null);
//   const [pickedSlot, setPickedSlot] = useState(null);
//   const [confirming, setConfirming] = useState(false);
//   const [cursor, setCursor] = useState({ x: 24, y: 24, show: false });

//   const visualRef = useRef(null);
//   const dateElRef = useRef(null);
//   const slotElRef = useRef(null);
//   const confirmElRef = useRef(null);

//   const current = CAL_FEATURES[active];
//   const isVideoActive = active === 0;

//   useEffect(() => {
//     setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
//   }, []);

//   // Auto-advance through the 4 panels (each has its own dwell time)
//   useEffect(() => {
//     if (reduce) return;
//     const t = setTimeout(() => {
//       setActive((i) => (i + 1) % CAL_FEATURES.length);
//     }, CAL_FEATURES[active].duration);
//     return () => clearTimeout(t);
//   }, [reduce, active]);

//   // Fake-cursor demo — only while the calendar panel is on screen
//   useEffect(() => {
//     if (reduce) {
//       setPickedDate(CAL_DATE);
//       setPickedSlot(CAL_SLOT);
//       return;
//     }
//     if (!isVideoActive) {
//       setPickedDate(null);
//       setPickedSlot(null);
//       setConfirming(false);
//       setCursor((c) => ({ ...c, show: false }));
//       return;
//     }

//     let cancelled = false;
//     const wait = (ms) => new Promise((r) => setTimeout(r, ms));

//     const moveCursorTo = (el) => {
//       if (!el || !visualRef.current) return;
//       const target = el.getBoundingClientRect();
//       const box = visualRef.current.getBoundingClientRect();
//       setCursor({
//         x: target.left - box.left + target.width / 2,
//         y: target.top - box.top + target.height / 2,
//         show: true,
//       });
//     };

//     async function run() {
//       setPickedDate(null);
//       setPickedSlot(null);
//       setConfirming(false);
//       setCursor({ x: 24, y: 24, show: false });
//       await wait(500);
//       if (cancelled) return;

//       moveCursorTo(dateElRef.current);
//       await wait(650);
//       if (cancelled) return;
//       setPickedDate(CAL_DATE);
//       await wait(550);
//       if (cancelled) return;

//       moveCursorTo(slotElRef.current);
//       await wait(650);
//       if (cancelled) return;
//       setPickedSlot(CAL_SLOT);
//       await wait(550);
//       if (cancelled) return;

//       moveCursorTo(confirmElRef.current);
//       await wait(650);
//       if (cancelled) return;
//       setConfirming(true);
//       await wait(900);
//       if (cancelled) return;

//       setCursor((c) => ({ ...c, show: false }));
//     }
//     run();
//     return () => {
//       cancelled = true;
//     };
//   }, [isVideoActive, reduce]);

//   return (
//         <div className="max-w-5xl mx-auto relative pt-6">
//       <style>{`
//         @keyframes calFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
//         @keyframes calIn { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
//         @keyframes calClick { 0% { transform: scale(1); } 35% { transform: scale(.72); } 100% { transform: scale(1); } }
//         .cal-float { animation: calFloat 3.2s ease-in-out infinite; }
//         .cal-in { animation: calIn .5s cubic-bezier(.22,1,.36,1) both; }
//         .cal-cursor { position:absolute; left:0; top:0; pointer-events:none; opacity:0; z-index:5;
//           transition: transform .65s cubic-bezier(.22,1,.36,1), opacity .3s ease;
//           filter: drop-shadow(0 3px 6px rgba(0,0,0,.35)); }
//         .cal-cursor.show { opacity:1; }
//         .cal-cursor.click svg { animation: calClick .5s ease; }
//         @media (prefers-reduced-motion: reduce) { .cal-float, .cal-in { animation: none !important; } }
//       `}</style>

//       <div
//         className="relative rounded-[22px] px-3 sm:px-6 pt-8 pb-4 sm:pb-5"
//         style={{
//           background:
//             "linear-gradient(150deg,#1E293B 0%,#334155 55%,#9A3412 100%)",
//           boxShadow: "0 40px 80px -30px rgba(208,106,26,.45)",
//         }}
//       >
//         {/* Floating icons */}
//         <div
//           className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex gap-2 sm:gap-3.5 z-10"
//           role="tablist"
//           aria-label="ILM ORA calendar features"
//         >
//           {CAL_FEATURES.map(({ Icon, label }, i) => {
//             const isActive = active === i;
//             return (
//               <button
//                 key={label}
//                 type="button"
//                 role="tab"
//                 aria-selected={isActive}
//                 title={label}
//                 onClick={() => setActive(i)}
//                 style={{ animationDelay: `${i * 0.35}s` }}
//                 className={`group relative rounded-full flex items-center justify-center border-none cursor-pointer shadow-lg transition-all duration-200 ${
//                   reduce ? "" : "cal-float"
//                 } ${
//                   isActive
//                     ? "w-9 h-9 sm:w-11 sm:h-11 bg-[#1a1a2e] text-white ring-2 ring-white/55"
//                     : "w-8 h-8 sm:w-10 sm:h-10 bg-white text-gray-500 hover:text-[#1E293B]"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span
//                   className={`absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap bg-[#1a1a2e] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg pointer-events-none transition-opacity duration-200 ${
//                     isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
//                   }`}
//                 >
//                   {label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>

//           <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mt-5">
//           {/* left: glass info panel */}
//           <div
//             key={`info-${current.key}`}
//                         className="cal-in flex flex-col justify-center rounded-[18px] p-4 sm:p-5 text-white bg-white/15 backdrop-blur-md border border-white/35"
//           >
//             <span className="inline-flex self-start bg-white/25 text-[12px] font-semibold px-3 py-1 rounded-full mb-4">
//               {current.badge}
//             </span>
//                         <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight mb-2 text-white">
//               {current.heading}
//             </h3>
//                         <p className="text-xs sm:text-sm text-white/85 mb-3 max-w-md">
//               {current.desc}
//             </p>
//             <button
//               type="button"
//               onClick={onLearnMore}
//               className="inline-flex items-center gap-1.5 w-fit font-semibold text-white bg-transparent border-0 border-b-2 border-white/60 hover:border-white pb-0.5 cursor-pointer transition-colors"
//             >
//               {current.linkText} <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>

//           {/* right: visual */}
//           <div
//             ref={visualRef}
//             key={`visual-${current.key}`}
//             className="cal-in relative"
//             aria-hidden="true"
//           >
//             {current.key === "video" && (
//                             <div className="bg-white rounded-[18px] p-3 shadow-2xl text-[#1E293B] text-sm">
//                 <div className="flex items-center justify-between font-semibold mb-2">
//                   <span>October 2026</span>
//                   <span className="flex gap-1.5">
//                     <i className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
//                       <ChevronLeft className="w-3.5 h-3.5" />
//                     </i>
//                     <i className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
//                       <ChevronRight className="w-3.5 h-3.5" />
//                     </i>
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-7 text-center text-[11px] text-gray-500 mb-1.5">
//                   {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
//                     <span key={i}>{d}</span>
//                   ))}
//                 </div>
//                                 <div className="grid grid-cols-7 gap-0.5 mb-2">
//                   {Array.from({ length: CAL_BLANKS }).map((_, i) => (
//                     <span key={`b${i}`} />
//                   ))}
//                   {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
//                     const isToday = d === CAL_TODAY;
//                     const isPicked = d === pickedDate;
//                     return (
//                       <span
//                         key={d}
//                         ref={d === CAL_DATE ? dateElRef : null}
//                         className={`h-6 flex items-center justify-center rounded-md text-[11px] transition-colors duration-200 ${
//                           isPicked
//                             ? "bg-[#F97316] text-white font-semibold"
//                             : isToday
//                               ? "border-[1.5px] border-[#F97316] font-semibold"
//                               : ""
//                         }`}
//                       >
//                         {d}
//                       </span>
//                     );
//                   })}
//                 </div>
//                   <div className="grid grid-cols-3 gap-1.5 mb-2">
//                   {["10:00 AM", CAL_SLOT, "4:30 PM"].map((s) => (
//                     <span
//                       key={s}
//                       ref={s === CAL_SLOT ? slotElRef : null}
//                                             className={`rounded-lg px-2 py-1 text-[11px] text-center font-medium border-[1.5px] transition-colors duration-200 ${
//                         s === pickedSlot
//                           ? "border-[#F97316] bg-orange-50 text-[#d06a1a]"
//                           : "border-gray-200"
//                       }`}
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//                 <div
//                   ref={confirmElRef}
//                                     className={`text-center text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200 ${
//                     confirming ? "bg-[#0E7A5F] scale-[.97]" : "bg-[#1a1a2e]"
//                   }`}
//                 >
//                   {confirming ? "Seat confirmed" : "Confirm seat"}
//                 </div>
//               </div>
//             )}

//             {current.key === "spark" && (
//               <div className="bg-white rounded-[18px] p-4 shadow-2xl text-[#1E293B] flex flex-col gap-3 h-full justify-center">
//                 <span className="inline-flex self-start bg-orange-50 text-[#d06a1a] text-[12px] font-semibold px-2.5 py-1 rounded-full">
//                   Texora AI match
//                 </span>
//                 <div className="flex items-center gap-3 border-[1.5px] border-gray-200 rounded-xl px-3.5 py-3">
//                   <CalAvatar initials="MR" from="#FFE8A3" to="#FFC7B8" />
//                   <div>
//                     <b className="block text-[15px] leading-snug">Meera Rao</b>
//                     <small className="text-gray-500 text-[12px]">
//                       Product mentor · 98% fit for your goal
//                     </small>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 border-[1.5px] border-gray-200 rounded-xl px-3.5 py-3">
//                   <CalAvatar initials="AS" from="#9BE7D6" to="#CFE0FF" />
//                   <div>
//                     <b className="block text-[15px] leading-snug">
//                       Writing Specs Engineers Read
//                     </b>
//                     <small className="text-gray-500 text-[12px]">
//                       Recommended next class, Sunday 11:00
//                     </small>
//                   </div>
//                 </div>
//                 <div className="text-center text-white font-semibold py-3 rounded-xl bg-[#F97316]">
//                   View match
//                 </div>
//               </div>
//             )}

//             {current.key === "shield" && (
//               <div className="bg-white rounded-[22px] p-6 shadow-2xl text-[#1E293B] flex flex-col items-center justify-center text-center gap-2 h-full">
//                 <small className="text-gray-500">Certificate of completion</small>
//                 <h4 className="text-xl font-bold">Product Management</h4>
//                 <div className="font-semibold text-base">Ananya Sharma</div>
//                 <small className="text-gray-500">
//                   completed all sessions and assignments
//                 </small>
//                 <span className="inline-flex items-center gap-2 mt-2 bg-white rounded-2xl px-3.5 py-2 shadow-md text-[13px] font-semibold text-[#0E7A5F]">
//                   <svg
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2.6"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M20 6 9 17l-5-5" />
//                   </svg>
//                   Verified credential
//                 </span>
//               </div>
//             )}

//             {current.key === "chat" && (
//               <div className="bg-white rounded-[22px] p-6 shadow-2xl text-[#1E293B] flex flex-col gap-3 h-full justify-center">
//                 <div className="flex items-end gap-2">
//                   <CalAvatar initials="RK" from="#C3B3FF" to="#CFE0FF" size="w-7 h-7" />
//                   <span className="bg-[#EEF3FF] rounded-[14px_14px_14px_4px] px-3 py-2 text-[13px] leading-snug max-w-[82%]">
//                     Which metric should I pick for onboarding?
//                   </span>
//                 </div>
//                 <div className="flex items-end gap-2">
//                   <CalAvatar initials="MR" from="#FFE8A3" to="#FFC7B8" size="w-7 h-7" />
//                   <span className="bg-[#E6F8F3] rounded-[14px_14px_14px_4px] px-3 py-2 text-[13px] leading-snug max-w-[82%]">
//                     Start with activation rate in week one.
//                   </span>
//                 </div>
//                 <div className="text-center text-white font-semibold py-3 rounded-xl bg-[#F97316]">
//                   Ask a mentor
//                 </div>
//               </div>
//             )}

//             {!reduce && isVideoActive && (
//               <div
//                 className={`cal-cursor${cursor.show ? " show" : ""}${confirming ? " click" : ""}`}
//                 style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
//               >
//                 <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
//                   <path
//                     d="M2 1.5 19 9.2l-6.9 1.6L9 19 2 1.5Z"
//                     fill="#1a1a2e"
//                     stroke="#fff"
//                     strokeWidth="1.2"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function WorkspaceTeaser({
//   navigate,
//   to = "/workspace",
//   calendarTo = "/calendar", // apna real Calendar route yahan daalo
// }) {
//   const goToWorkspace = () => navigate(to);
//   const [activeFeature, setActiveFeature] = useState(0);

//   const workspaceFeatures = [
//     { icon: CalendarClock, label: "Start & Join", img: workspaceStartJoinImg },
//     { icon: Video, label: "Workshop", img: workspacePreviewImg },
//     { icon: Shield, label: "Host Controls", img: workspaceHostImg },
//     { icon: BarChart3, label: "Dashboard", img: workspaceDashboardImg },
//     { icon: FileText, label: "Recordings & Notes", img: workspaceRecordingsImg },
//   ];
//   const activeImg = workspaceFeatures[activeFeature].img;

//   // Top tab bar (image 1 jaisa). "workspace" yahan active tab hai.
//   const [activeTopTab, setActiveTopTab] = useState("workspace");
//   const topTabs = [
//     { key: "workspace", label: "ILM ORA Workspace", icon: Users, onClick: () => setActiveTopTab("workspace") },
//     { key: "calendar", label: "ILM ORA Calendry", icon: CalendarClock, onClick: () => setActiveTopTab("calendar") },
//   ];

//   // Auto-rotate every 3.5s; resets whenever user clicks a chip
//   useEffect(() => {
//     const t = setInterval(() => {
//       setActiveFeature((p) => (p + 1) % workspaceFeatures.length);
//     }, 3500);
//     return () => clearInterval(t);
//   }, [activeFeature]);

//   return (
//     <section
//       id="workspace-teaser"
//       className="relative pt-0 pb-6 sm:pb-8 px-6 scroll-mt-20 overflow-hidden bg-[#1E293B] dark:bg-gray-900"
//     >
//       <div
//         className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full blur-2xl pointer-events-none opacity-40"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(249,115,22,0.35), transparent 70%)",
//         }}
//       />

//       {/* ── Top tab bar ── */}
//       <div className="max-w-6xl mx-auto relative">
//                 <div className="flex items-center justify-center md:justify-start gap-6 sm:gap-10 border-b border-white/10 mb-5 sm:mb-6">
//           {topTabs.map((tab) => {
//             const isActive = activeTopTab === tab.key;
//             return (
//               <button
//                 type="button"
//                 key={tab.key}
//                 onClick={tab.onClick}
//                 aria-current={isActive ? "page" : undefined}
//                 className={`relative inline-flex items-center gap-2 px-2 sm:px-4 md:first:pl-0 py-3 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors duration-300 cursor-pointer bg-transparent border-none ${
//                   isActive ? "text-[#F97316]" : "text-white hover:text-[#F97316]"
//                 }`}
//               >
//                 <tab.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
//                 {tab.label}
//                 <span
//                   className={`absolute left-0 right-0 -bottom-px h-[2px] rounded-full bg-[#F97316] transition-opacity duration-300 ${
//                     isActive ? "opacity-100" : "opacity-0"
//                   }`}
//                 />
//                             </button>
//             );
//           })}
//         </div>
//       </div>

//       {activeTopTab === "calendar" && (
//         <CalendarShowcase onLearnMore={() => navigate(calendarTo)} />
//       )}

//       <div
//         className={`max-w-6xl mx-auto relative items-center gap-10 lg:gap-12 ${
//           activeTopTab === "calendar" ? "hidden" : "grid lg:grid-cols-2"
//         }`}
//       >
//         {/* left: copy + chips + CTA */}
//         <div className="text-center lg:text-left">
          

//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
//             Your Complete <br className="hidden lg:block" />
//             <span className="text-[#F97316]">Meeting Workspace</span>
//           </h2>

//             <p className="text-base sm:text-lg text-slate-300 max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
//             Schedule, host and review live sessions — everything before, during
//             and after the meeting, together in one place.
//           </p>

//           <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
//             {workspaceFeatures.map((f, i) => (
//               <button
//                 type="button"
//                 key={f.label}
//                 onClick={() => setActiveFeature(i)}
//                 aria-pressed={activeFeature === i}
//                 className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white border transition-all duration-300 cursor-pointer ${
//                   activeFeature === i
//                     ? "bg-[#F97316] border-[#F97316] shadow-lg shadow-orange-500/30"
//                     : "bg-white/10 border-white/15 hover:bg-white/20"
//                 }`}
//               >
//                 <f.icon
//                   className={`w-3.5 h-3.5 ${
//                     activeFeature === i ? "text-white" : "text-[#F97316]"
//                   }`}
//                 />
//                 {f.label}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={goToWorkspace}
//             className="inline-flex items-center justify-center gap-2 bg-[#EA580C] text-white font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base whitespace-nowrap hover:bg-[#C2410C] transition-all hover:scale-105 shadow-lg"
//           >
//             Explore Workspace <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>

//         {/* right: meeting-window preview image + dots */}
//         <div>
//           <div
//             onClick={goToWorkspace}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => e.key === "Enter" && goToWorkspace()}
//             aria-label="Open ILM ORA Meetings workspace"
//             className="cursor-pointer select-none hover:-translate-y-1 transition-transform duration-300"
//           >
//             <style>{`@keyframes wsFade { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }`}</style>
//             <img
//               key={activeFeature}
//               src={activeImg.src || activeImg}
//               alt={`ILM ORA Meetings — ${workspaceFeatures[activeFeature].label}`}
//               loading="lazy"
//               decoding="async"
//               className="w-full h-auto rounded-2xl shadow-2xl"
//               style={{ animation: "wsFade 0.35s ease both" }}
//             />
//           </div>

//           {/* Dot pagination */}
//           <div className="flex items-center justify-center gap-2 mt-5">
//             {workspaceFeatures.map((f, i) => (
//               <button
//                 type="button"
//                 key={f.label}
//                 onClick={() => setActiveFeature(i)}
//                 aria-label={`Show ${f.label}`}
//                 style={{
//                   width: activeFeature === i ? "28px" : "10px",
//                   height: "10px",
//                   borderRadius: "9999px",
//                   background:
//                     activeFeature === i ? "#F97316" : "rgba(255,255,255,0.4)",
//                   border: "none",
//                   cursor: "pointer",
//                   padding: 0,
//                   transition: "width 0.35s ease, background 0.35s ease",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// // ─────────────────────────────────────────────────────────────────────────────
// // ProductHubSection — "ILM ORA Platform" hub: left product list, middle copy +
// // feature chips + CTA, right preview image with dots. Pure UI, no backend.
// // ─────────────────────────────────────────────────────────────────────────────
// function ProductHubSection({ navigate }) {
//   const [activeProduct, setActiveProduct] = useState(0);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [paused, setPaused] = useState(false);

//   const products = [
//     {
//       key: "ai",
//       label: "AI Companion",
//       icon: MessageSquare,
//       badge: "NEW · POWERED BY AI",
//       line1: "Meet Your",
//       line2: "AI Companion",
//       desc: "Chat, write, summarize meetings and automate workflows — one AI assistant that helps you across every course and session.",
//       cta: "Explore AI Companion",
//       to: "/ai-companion",
//       features: [
//         { icon: MessageSquare, label: "AI Chat", img: aiChatImg },
//         { icon: Wand2, label: "Help Me Write", img: aiWriteImg },
//         { icon: Mic, label: "Live Notes", img: aiNotesImg },
//         { icon: Zap, label: "Workflows", img: aiWorkflowsImg },
//       ],
//     },
//     {
//       key: "workspace",
//       label: "ILM ORA Workspace",
//       icon: Users,
//       badge: "LIVE SESSIONS",
//       line1: "Your Complete",
//       line2: "Meeting Workspace",
//       desc: "Schedule, host and review live sessions — everything before, during and after the meeting, together in one place.",
//       cta: "Explore Workspace",
//       to: "/workspace",
//       features: [
//         { icon: CalendarClock, label: "Start & Join", img: workspaceStartJoinImg },
//         { icon: Video, label: "Workshop", img: workspacePreviewImg },
//         { icon: Shield, label: "Host Controls", img: workspaceHostImg },
//         { icon: BarChart3, label: "Dashboard", img: workspaceDashboardImg },
//         { icon: FileText, label: "Recordings & Notes", img: workspaceRecordingsImg },
//       ],
//     },
//     {
//       key: "calendar",
//       label: "ILM ORA Calendry",
//       icon: CalendarClock,
//       badge: "SMART SCHEDULING",
//       line1: "Book Your Seat With",
//       line2: "Top Mentors",
//       desc: "Complete control over your calendar — find, book and manage your next live class in a few clicks.",
//       cta: "Explore Calendar",
//       to: "/ilm-ora-meet",
//       // TODO: apne calendar ke screenshots yahan replace kar dena
//       features: [
//         { icon: CalendarClock, label: "Scheduling", img: workspaceStartJoinImg },
//         { icon: FileText, label: "Recordings & Notes", img: workspaceRecordingsImg },
//       ],
//     },
//   ];

//   const product = products[activeProduct];
//   const feature = product.features[activeFeature] || product.features[0];

//   const selectProduct = (i) => {
//     setActiveProduct(i);
//     setActiveFeature(0);
//   };

//     // Auto-rotate: features pehle, last feature ke baad agla product.
//   // Calendry tab me (jisme apna showcase hai) 12s baad wapas AI Companion.
//   useEffect(() => {
//     if (paused) return;
//     const isCalendar = product.key === "calendar";
//     const delay = isCalendar ? 12000 : 3500;
//     const t = setTimeout(() => {
//       if (isCalendar) {
//         setActiveProduct(0);
//         setActiveFeature(0);
//         return;
//       }
//       if (activeFeature >= product.features.length - 1) {
//         setActiveProduct((p) => (p + 1) % products.length);
//         setActiveFeature(0);
//       } else {
//         setActiveFeature((p) => p + 1);
//       }
//     }, delay);
//     return () => clearTimeout(t);
//   }, [activeProduct, activeFeature, paused]);
//   return (
//     <section
//             id="product-hub"
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//       className="relative py-4 sm:py-6 px-4 sm:px-6 scroll-mt-20 overflow-hidden bg-[#FFF7F2] dark:bg-gray-950"
//     >
//       <style>{`@keyframes hubFade { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }`}</style>

//             <div className="text-center mb-4 sm:mb-6">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1E293B] dark:text-white">
//           Explore the <span className="text-[#F97316]">ILM ORA Platform</span>
//         </h2>
//         <p className="mt-3 max-w-4xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
//           Pick a product, preview its features and open it with one click.
//         </p>
//       </div>

//       <div className="max-w-[1400px] mx-auto grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,1.35fr)] gap-6 lg:gap-8 items-center">
//                 {/* ── Left: product list ── */}
//         <div className="min-w-0">
          
//           <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//             {products.map((p, i) => {
//               const isActive = activeProduct === i;
//               return (
//                 <button
//                   type="button"
//                   key={p.key}
//                   onClick={() => selectProduct(i)}
//                   aria-pressed={isActive}
//                   className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-left whitespace-nowrap flex-shrink-0 lg:w-full transition-all duration-300 cursor-pointer border-none ${
//                     isActive
//                       ? "bg-orange-100 dark:bg-orange-500/15 text-[#F97316]"
//                       : "bg-transparent text-[#1E293B] dark:text-white hover:bg-orange-50 dark:hover:bg-white/5"
//                   }`}
//                 >
//                   <span
//                     className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                       isActive
//                         ? "bg-[#F97316] text-white"
//                         : "bg-gray-100 dark:bg-white/10 text-[#1E293B] dark:text-white"
//                     }`}
//                   >
//                     <p.icon className="w-5 h-5" />
//                   </span>
//                   <span className="font-semibold text-sm sm:text-base flex-1">
//                     {p.label}
//                   </span>
//                   <ChevronRight className="w-4 h-4 opacity-60 hidden lg:block" />
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ── Middle: copy + chips + CTA ── */}
//           <div key={product.key} className={`min-w-0 text-center lg:text-left ${product.key === "calendar" ? "hidden" : ""}`} style={{ animation: "hubFade 0.35s ease both" }}>
          
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1E293B] dark:text-white leading-tight mb-3">
//             {product.line1} <br className="hidden lg:block" />
//             <span className="text-[#F97316]">{product.line2}</span>
//           </h2>
//           <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
//             {product.desc}
//           </p>

//           <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
//             {product.features.map((f, i) => (
//               <button
//                 type="button"
//                 key={f.label}
//                 onClick={() => setActiveFeature(i)}
//                 aria-pressed={activeFeature === i}
//                 className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 cursor-pointer ${
//                   activeFeature === i
//                     ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-500/30"
//                     : "bg-white dark:bg-white/10 text-[#1E293B] dark:text-white border-gray-100 dark:border-white/15 hover:border-[#F97316]/40"
//                 }`}
//               >
//                 <f.icon className={`w-4 h-4 ${activeFeature === i ? "text-white" : ""}`} />
//                 {f.label}
//               </button>
//             ))}
//           </div>

//           <button
//             type="button"
//             onClick={() => navigate(product.to)}
//             className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base whitespace-nowrap hover:bg-[#EA580C] transition-all hover:scale-105 shadow-lg shadow-orange-500/30"
//           >
//             {product.cta} <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>

//                 {/* ── Calendar showcase (sirf Calendry tab me) ── */}
//         {product.key === "calendar" && (
//           <div className="lg:col-span-2 min-w-0">
//             <CalendarShowcase onLearnMore={() => navigate(product.to)} />
//           </div>
//         )}

//         {/* ── Right: preview + dots ── */}
//           <div className={`min-w-0 ${product.key === "calendar" ? "hidden" : ""}`}>
//           <div
//             onClick={() => navigate(product.to)}
//             onMouseEnter={() => setPaused(true)}
//             onMouseLeave={() => setPaused(false)}
//             role="button"
//             tabIndex={0}
//             aria-label={`Open ${product.label}`}
//             onKeyDown={(e) => e.key === "Enter" && navigate(product.to)}
//             className="cursor-pointer select-none hover:-translate-y-1 transition-transform duration-300"
//           >
//             <img
//               key={`${product.key}-${activeFeature}`}
//               src={feature.img.src || feature.img}
//               alt={`${product.label} — ${feature.label}`}
//               loading="lazy"
//               decoding="async"
//               className="w-full h-auto max-w-[520px] mx-auto rounded-2xl shadow-2xl"
//               style={{ animation: "hubFade 0.35s ease both" }}
//             />
//           </div>

//           <div className="flex items-center justify-center gap-2 mt-5">
//             {product.features.map((f, i) => (
//               <button
//                 type="button"
//                 key={f.label}
//                 onClick={() => setActiveFeature(i)}
//                 aria-label={`Show ${f.label}`}
//                 style={{
//                   width: activeFeature === i ? "28px" : "10px",
//                   height: "10px",
//                   borderRadius: "9999px",
//                   background: activeFeature === i ? "#F97316" : "rgba(100,116,139,0.35)",
//                   border: "none",
//                   cursor: "pointer",
//                   padding: 0,
//                   transition: "width 0.35s ease, background 0.35s ease",
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // CertificationShowcase — AWS / Microsoft / Cloud / Google certification cards
// // 3D tilt + glare + floating medal. Pure UI. Routes niche CERT_ITEMS me change karo.
// // ─────────────────────────────────────────────────────────────────────────────
// const CERT_ITEMS = [
//   {
//     key: "aws",
//     title: "AWS Certification",
//     sub: "Cloud Practitioner to Professional",
//     desc: "Prepare for AWS exams with live labs, mock tests and mentor-led doubt sessions.",
//     Icon: Award,
//     from: "#FB923C",
//     to: "#EA580C",
//     tags: ["Practitioner", "Associate", "Professional"],
//     path: "/ilmora-aws-certification",
//   },
//   {
//     key: "microsoft",
//     title: "Microsoft Certification",
//     sub: "Azure, M365 & Power Platform",
//     desc: "Get job-ready on Azure, Microsoft 365 and Power Platform with hands-on projects.",
//     Icon: Layers,
//     from: "#60A5FA",
//     to: "#2563EB",
//     tags: ["Azure", "M365", "Power Platform"],
//     path: "/ilmora-microsoft-certification",
//   },
//   {
//     key: "cloud",
//     title: "Cloud Certification",
//     sub: "Multi-cloud & vendor-neutral paths",
//     desc: "Learn cloud fundamentals that work across every provider, not just one.",
//     Icon: Cloud,
//     from: "#38BDF8",
//     to: "#6366F1",
//     tags: ["Multi-cloud", "DevOps", "Security"],
//         path: "/certification/cloud",
//     comingSoon: true,
//   },
//   {
//     key: "google",
//     title: "Google Certification",
//     sub: "Google Cloud & Workspace exams",
//     desc: "Crack Google Cloud and Workspace exams with structured paths and practice papers.",
//     Icon: Globe,
//     from: "#4ADE80",
//         to: "#16A34A",
//     tags: ["Cloud Digital Leader", "Associate", "Professional"],
//     path: "/certification/google",
//   },
// ];

// const CERT_BACK = {
//   aws: "Every topic ends with a hands-on project on real AWS services.",
//   microsoft: "Practice on live Azure and Microsoft 365 labs, not just slides.",
//   cloud: "Learn concepts that carry across AWS, Azure and Google Cloud.",
//   google: "Timed practice papers that match the real exam length and style.",
// };

// function CertCard({ item, index, navigate }) {
//   const [flipped, setFlipped] = useState(false);
//   const toggle = () => setFlipped((f) => !f);
//   const cardRef = useRef(null);

//   // Touch devices (no hover): flip once when the card scrolls into view
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     if (!window.matchMedia("(hover: none)").matches) return;
//     const el = cardRef.current;
//     if (!el || !("IntersectionObserver" in window)) return;
//     let t1, t2;
//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (!entry.isIntersecting) return;
//         io.disconnect();
//         t1 = setTimeout(() => setFlipped(true), 500 + index * 300);
//         t2 = setTimeout(() => setFlipped(false), 2600 + index * 300);
//       },
//       { threshold: 0.6 },
//     );
//     io.observe(el);
//     return () => {
//       io.disconnect();
//       clearTimeout(t1);
//       clearTimeout(t2);
//     };
//   }, [index]);
//     const go = (e) => {
//     e.stopPropagation();
//     if (item.comingSoon) return;
//     navigate(item.path);
//   };

//   return (
//     <div
//       className="cert-rise"
//       style={{
//         animationDelay: `${index * 0.12}s`,
//         "--c": item.from,
//         "--c2": item.to,
//       }}
//     >
//             <div
//         ref={cardRef}
//         className={`cert-flip ${flipped ? "is-flipped" : ""}`}
//         onClick={toggle}
//         onKeyDown={(e) => e.key === "Enter" && toggle()}
//         tabIndex={0}
//         aria-label={`${item.title} — hover or tap to flip`}
//       >
//         <div className="cert-flip-inner">
//           {/* ── Front ── */}
//           <div className="cert-card cert-face group p-6 flex flex-col select-none">
//             <div className="relative w-16 h-16 mb-5 flex-shrink-0">
//               <div
//                 className="absolute inset-0 rounded-2xl rotate-6 opacity-50 blur-md"
//                 style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }}
//               />
//               <div
//                 className="relative w-full h-full rounded-2xl flex items-center justify-center"
//                 style={{
//                   background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
//                   boxShadow:
//                     "0 14px 24px -10px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -4px 8px rgba(0,0,0,0.2)",
//                 }}
//               >
//                 <item.Icon className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.8} />
//               </div>
//             </div>

//             <h3 className="text-xl font-semibold tracking-tight text-[#1E293B] dark:text-white mb-1">
//               {item.title}
//             </h3>
//             <p
//               className="text-xs font-semibold uppercase tracking-wider mb-3"
//               style={{ color: item.from }}
//             >
//               {item.sub}
//             </p>
//             <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
//               {item.desc}
//             </p>

//             <div className="flex flex-wrap gap-1.5 mb-5">
//               {item.tags.map((t) => (
//                 <span key={t} className="cert-tag">
//                   {t}
//                 </span>
//               ))}
//             </div>

//             <button
//               type="button"
//               onClick={go}
//                             className="cert-btn mt-auto self-start border-0 cursor-pointer"
//               style={item.comingSoon ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
//             >
//               {item.comingSoon ? "Coming Soon" : "Explore"}
//               {!item.comingSoon && (
//                 <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
//               )}
//             </button>
//           </div>

//           {/* ── Back ── */}
//           <div className="cert-face cert-back select-none">
//             <h3 className="text-xl font-semibold tracking-tight mb-3">
//               {item.title}
//             </h3>
//             <p className="text-base leading-relaxed mb-6 text-white/95">
//               {CERT_BACK[item.key] || item.desc}
//             </p>
//             <button
//               type="button"
//               onClick={go}
//                             className="cert-btn self-start border-0 cursor-pointer"
//               style={{ background: "#fff", color: item.to, ...(item.comingSoon ? { opacity: 0.8, cursor: "not-allowed" } : {}) }}
//             >
//               {item.comingSoon ? "Coming Soon" : "Explore"}
//               {!item.comingSoon && <ArrowRight className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CertificationShowcase({ navigate }) {
//   return (
//     <section
//       id="certifications"
//           className="relative py-10 sm:py-14 px-4 sm:px-6 scroll-mt-20 overflow-hidden bg-white dark:bg-black"
//     >
//             <style>{`
//         @keyframes certRise { from { opacity: 0; transform: translateY(30px) scale(.97); } to { opacity: 1; transform: none; } }
//         @keyframes certFloat { 0%,100% { transform: translateZ(50px) translateY(0); } 50% { transform: translateZ(50px) translateY(-8px); } }
//         @keyframes certOrb { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-24px); } }
//         .cert-rise { animation: certRise .7s cubic-bezier(.22,1,.36,1) both; }
//         .cert-float { animation: certFloat 4s ease-in-out infinite; }

//         .cert-flip { perspective: 1200px; -webkit-perspective: 1200px; height: 100%; cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
//         .cert-flip-inner {
//           position: relative;
//           height: 100%;
//           min-height: 410px;
//           transform-style: preserve-3d;
//           -webkit-transform-style: preserve-3d;
//           will-change: transform;
//           transition: transform .7s cubic-bezier(.22,1,.36,1);
//         }
//         .cert-flip.is-flipped .cert-flip-inner { transform: rotateX(180deg); }
//         @media (hover: hover) and (pointer: fine) {
//           .cert-flip:hover .cert-flip-inner { transform: rotateX(180deg); }
//         }
//         .cert-face {
//           position: absolute;
//           inset: 0;
//           border-radius: 16px;
//           backface-visibility: hidden;
//           -webkit-backface-visibility: hidden;
//         }
//         .cert-back {
//           transform: rotateX(180deg);
//           background: linear-gradient(135deg, var(--c), var(--c2));
//           color: #fff;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           padding: 28px;
//           box-shadow: 0 24px 44px -14px color-mix(in srgb, var(--c) 55%, transparent);
//         }

//         .cert-card {
//           background: #F6EDE6;
//           border: 1px solid color-mix(in srgb, var(--c) 45%, #E5E7EB);
//           box-shadow: 0 10px 15px -3px rgba(0,0,0,.10), 0 4px 6px -4px rgba(0,0,0,.10);
//           transition: transform .18s ease-out, box-shadow .3s ease, border-color .3s ease;
//         }
//         .cert-card::before {
//           content: "";
//           position: absolute;
//           left: 0; top: 22px; bottom: 22px;
//           width: 4px;
//           border-radius: 0 4px 4px 0;
//           background: var(--c);
//         }
//         .cert-card:hover {
//           box-shadow: 0 24px 44px -14px color-mix(in srgb, var(--c) 45%, transparent), 0 8px 14px -6px rgba(0,0,0,.12);
//           border-color: var(--c);
//         }
//         .dark .cert-card {
//           background: #111827;
//           border-color: color-mix(in srgb, var(--c) 45%, #1F2937);
//           box-shadow: 0 10px 24px -6px rgba(0,0,0,.65), 0 4px 6px -4px rgba(0,0,0,.5);
//         }
//         .dark .cert-card:hover {
//           box-shadow: 0 24px 44px -14px color-mix(in srgb, var(--c) 55%, transparent), 0 8px 14px -6px rgba(0,0,0,.6);
//         }

//         .cert-tag {
//           font-size: 11px;
//           font-weight: 500;
//           padding: 3px 10px;
//           border-radius: 8px;
//           color: #334155;
//           background: color-mix(in srgb, var(--c) 14%, #ffffff);
//           border: 1px solid color-mix(in srgb, var(--c) 28%, #ffffff);
//         }
//         .dark .cert-tag {
//           color: #CBD5E1;
//           background: color-mix(in srgb, var(--c) 16%, #111827);
//           border-color: color-mix(in srgb, var(--c) 30%, #111827);
//         }

//         .cert-btn {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           padding: 9px 16px;
//           border-radius: 10px;
//           background: var(--c);
//           color: #fff;
//           font-size: 14px;
//           font-weight: 600;
//           transition: transform .2s, filter .2s;
//         }
//         .cert-card:hover .cert-btn { transform: translateY(-2px); filter: brightness(1.08); }

//         .cert-grid { opacity: .04; background-image: linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px); }
//         .dark .cert-grid { opacity: .07; background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px); }

//                 @media (prefers-reduced-motion: reduce) {
//           .cert-float { animation: none !important; }
//         }
//       `}</style>

//       {/* ambient glow orbs + subtle grid */}
//       <div
//         className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-25"
//         style={{
//           background: "radial-gradient(circle, rgba(249,115,22,0.4), transparent 70%)",
//           animation: "certOrb 9s ease-in-out infinite",
//         }}
//       />
//       <div
//         className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none opacity-15"
//         style={{
//           background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
//           animation: "certOrb 11s ease-in-out infinite reverse",
//         }}
//       />
      

//       <div className="max-w-7xl mx-auto relative">
//         <div className="text-center mb-10">
           
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1E293B] dark:text-white mt-3">
//             Get Certified. Get <span className="text-[#F97316]">Hired.</span>
//           </h2>
//                         <p className="mt-3 max-w-4xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
//             Pick a certification path, learn with mentors and earn credentials employers recognise.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
//           {CERT_ITEMS.map((item, i) => (
//             <CertCard key={item.key} item={item} index={i} navigate={navigate} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
// // ─────────────────────────────────────────────────────────────────────────────
// export default function LMSHomepage({ theme, toggleTheme }) {
//   const [activeTab, setActiveTab] = useState("product");
//   const [featuredPrograms, setFeaturedPrograms] = useState({});
//   const [programsLoading, setProgramsLoading] = useState(true);
//   const [wishlist, setWishlist] = useState(new Set());
//   // UI-only: which course-card descriptions are expanded via "Read More".
//   // Presentational state only — no data-fetching or business logic.
//   const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());

//   // ── Mentors (testimonials) — now backend-connected ──
//   const [testimonials, setTestimonials] = useState([]);

//   // ── Top Global Companies — now backend-connected ──
//   const [companyData, setCompanyData] = useState(null);
//   const [companiesLoading, setCompaniesLoading] = useState(true);

//   const [user, setUser] = useState(null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showSignupModal, setShowSignupModal] = useState(false);
//   const [showForgotModal, setShowForgotModal] = useState(false);
//   const [modalEmail, setModalEmail] = useState("");
//   const [modalPassword, setModalPassword] = useState("");
//   const [modalLoading, setModalLoading] = useState(false);
//   const [showModalPw, setShowModalPw] = useState(false);

//    const heroImages = [
//     heroStudent,
//     heroStudent2,
//     heroStudent3,
//     hero4,
//     hero5,
//     hero6,
//     hero7,
//     hero8,
//   ];
//     const heroImagePositions = [
//     "center 10%",
//     "center 10%",
//     "center 10%",
//     "center 10%",
//     "center 10%",
//     "center 10%",
//     "center 10%",
//     "center 10%",
//   ];
// // Index = currentSlide + 1  ->  0: video, 1: student, 2: high-five, 3: team, 4-8: hero-4 to hero-8
// const heroTexts = [
//   {
//     line1: "Empower Your",
//     line2: "Learning Journey",
//     desc: "Master in-demand skills through AI-powered learning, live sessions, certifications, and expert-led programs designed for students, professionals, trainers, and organizations.",
//   },
//   {
//     line1: "Your Skills Journey",
//     line2: "Starts Here",
//     desc: "Learn at your own pace with AI-powered courses, live classes, and certifications built for students ready to take the first step.",
//   },
//   {
//     line1: "Celebrate Every",
//     line2: "Career Win",
//     desc: "From your first job to your next promotion, our programs and career support help you reach goals worth celebrating.",
//   },
//   {
//     line1: "Learn Together",
//     line2: "With Expert Mentors",
//     desc: "Join small cohorts, get project reviews from industry mentors, and grow with a community that keeps you accountable.",
//   },
//   {
//     line1: "Build Skills That",
//     line2: "Get You Hired",
//     desc: "Hands-on projects, live mentor feedback, and verified certificates that help you stand out and step confidently into your dream role.",
//   },
//   {
//     line1: "Learn Anytime,",
//     line2: "Anywhere",
//     desc: "Access live classes, recorded sessions, and AI-powered study tools on any device, so learning fits around your schedule.",
//   },
//   {
//     line1: "Grow With a",
//     line2: "Community That Cares",
//     desc: "Connect with peers, share ideas, and stay motivated together with a supportive network of learners and mentors.",
//   },
//   {
//     line1: "Turn Knowledge Into",
//     line2: "Real Results",
//     desc: "Apply what you learn through real-world projects and assessments that prove your skills to top employers.",
//   },
//   {
//     line1: "Your Future Career",
//     line2: "Starts Today",
//     desc: "Take the next step with expert-led programs, career support, and certifications designed to open new doors.",
//   },
// ];
//   const [currentSlide, setCurrentSlide] = useState(0);
//   // Perf: don't fetch the hero video until the browser is idle, so it never
//   // competes with the LCP image/text for bandwidth on first paint.
//   const [videoReady, setVideoReady] = useState(false);
//   useEffect(() => {
//     const idle =
//     window.requestIdleCallback || ((cb) => setTimeout(cb, 0));
//     const cancel = window.cancelIdleCallback || clearTimeout;
//     const id = idle(() => setVideoReady(true));
//     return () => cancel(id);
//   }, []);
//   const carouselTimerRef = useRef(null);

//   const navigate = useNavigate();

//   const startCarouselTimer = () => {
//     clearInterval(carouselTimerRef.current);
//     carouselTimerRef.current = setInterval(() => {
//       setCurrentSlide((prev) => {
//         if (prev === -1) return 0;
//         if (prev >= heroImages.length - 1) return -1;
//         return prev + 1;
//       });
//     }, 3500);
//   };

//   useEffect(() => {
//     startCarouselTimer();
//     return () => clearInterval(carouselTimerRef.current);
//   }, []);

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//     startCarouselTimer();
//   };

//   /* ── Load real featured programs from the backend (courseService) ──
//      Falls back to the static `courses` object below if the API call
//      fails or returns no programs in any category. Includes the fuller
//      backend field mapping: thumbnails, banners, instructor photos,
//      LinkedIn, video URL, and only shows Published programs. */
//   useEffect(() => {
//     async function loadPrograms() {
//       try {
//         const { data } = await courseService.getFeaturedProgramsSummary();
//         const grouped = {};

//         data.forEach((p) => {
//           const cat = (p.category || "Other").trim();

//           if (!grouped[cat]) {
//             grouped[cat] = [];
//           }

//           grouped[cat].push({
//             id: p.id,
//             title: p.title,
//             instructor: p.instructorRole || p.instructorName,
//             instructorFull: p.instructorName,
//             instructorTitle: p.instructorRole || "",
//             duration: `${p.durationWeeks} weeks`,
//             students: p.studentsEnrolled,
//             rating: p.rating,
//             level: p.level,
//             description: p.shortDescription,
//             modules: [],
//             price: `₹${Number(p.price).toLocaleString("en-IN")}`,
//             thumbnailUrl: p.thumbnailUrl || "",
//             bannerUrl: p.bannerUrl || "",
//             instructorPhotoUrl: p.instructorPhotoUrl || "",
//             instructorLinkedIn: p.instructorLinkedIn || "",
//             videoUrl: p.videoUrl || "",
//             highlights: [],
//             learningOutcomes: [],
//             totalLessons: p.lessons,
//             projects: p.projects,
//             syllabusWeeks: [],
//             enrollmentUrl: p.enrollmentUrl || "",
//             liveSessions: p.liveSessions ?? "—",
//             // ── NEW: real badge flags from superadmin, plus discount pricing.
//             // Falls back to undefined/false if the backend hasn't been
//             // redeployed with the extended summary DTO yet, so this is safe
//             // to ship ahead of the backend if needed. ──
//             isFeatured: !!p.isFeatured,
//             isTrending: !!p.isTrending,
//             isBestseller: !!p.isBestseller,
//             isPopular: !!p.isPopular,
//             isRecommended: !!p.isRecommended,
//             isComingSoon: !!p.isComingSoon,
//             originalPrice: p.originalPrice
//               ? `₹${Number(p.originalPrice).toLocaleString("en-IN")}`
//               : "",
//             discountPercent: p.discountPercent || 0,
//           });
//         });

//         // Only use API data if we actually got programs
//         const hasPrograms = Object.values(grouped).some(
//           (arr) => arr.length > 0,
//         );
//         if (hasPrograms) {
//           setFeaturedPrograms(grouped);

//           const firstCategory = Object.keys(grouped)[0];

//           if (firstCategory) {
//             setActiveTab(firstCategory);
//           }
//         }
//         // else featuredPrograms stays empty → fallback to hardcoded courses
//       } catch (err) {
//         console.error("Failed to load featured programs", err);
//       } finally {
//         setProgramsLoading(false);
//       }
//     }
//     loadPrograms();
//   }, []);

//   /* ── Load real mentor feedback (testimonials) from the backend ── */
//   useEffect(() => {
//     async function loadMentorFeedback() {
//       try {
//         const { data } = await courseService.getActiveMentorFeedbacks();
//         const mapped = data.map((m) => {
//           console.log("Feedback:", m.feedbackMessage);

//           return {
//             name: m.candidateName,
//             role: `${m.designation} @ ${m.company}`,
//             text: m.feedbackMessage,
//             image: m.profileImage || m.image || m.imageUrl || m.photo || null,
//           };
//         });
//         setTestimonials(mapped);
//       } catch (err) {
//         console.error("Failed to load mentor feedback", err);
//       }
//     }
//     loadMentorFeedback();
//   }, []);

//   /* ── Load real companies (tech / business partners + product ecosystem) ── */
//   useEffect(() => {
//     async function loadCompanies() {
//       try {
//         const { data } = await courseService.getActiveCompanies();
//         setCompanyData(data);
//       } catch (err) {
//         console.error("Failed to load companies", err);
//       } finally {
//         setCompaniesLoading(false);
//       }
//     }
//     loadCompanies();
//   }, []);

//   useEffect(() => {
//     const userData = sessionStorage.getItem("user");
//     if (userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch {
//         sessionStorage.removeItem("user");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") setShowLoginModal(false);
//     };
//     if (showLoginModal) window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [showLoginModal]);

//   useEffect(() => {
//     const handler = (e) => {
//       const { tab } = e.detail || {};
//       if (tab) setActiveTab(tab);
//     };
//     window.addEventListener("mm-course-tab", handler);
//     return () => window.removeEventListener("mm-course-tab", handler);
//   }, []);

//   const scrollToSection = (sectionId, tabName = null) => {
//     if (window.location.pathname !== "/") {
//       navigate("/");
//       setTimeout(() => {
//         if (tabName) setActiveTab(tabName);
//         document
//           .getElementById(sectionId)
//           ?.scrollIntoView({ behavior: "smooth", block: "start" });
//       }, 150);
//     } else {
//       if (tabName) setActiveTab(tabName);
//       document
//         .getElementById(sectionId)
//         ?.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   /* ── Role-based redirect ──────────────────────────────────────────────────
//      Kept in sync with Login.jsx, AuthModals.jsx, and IlmOraDemoPage.jsx's
//      LoginModal — every login entry point in the app must land the user on
//      the same /ilm-demo page after signing in (SUPER_ADMIN is the only
//      exception). This used to send existing users straight to their real
//      dashboard route (/student, /trainer, /admin), which is why Google
//      sign-in on the homepage felt inconsistent with email/password login. */
//   const redirectByRole = (role) => {
//     switch ((role || "").toUpperCase()) {
//       case "SUPER_ADMIN":
//         navigate("/superadmin", { replace: true });
//         break;
//       default:
//         navigate("/ilm-demo", { replace: true });
//     }
//   };

//   const handleModalSubmit = async (e) => {
//     e.preventDefault();
//     if (modalLoading) return;
//     setModalLoading(true);
//     try {
//       const ok = await auth.login({
//         email: modalEmail,
//         password: modalPassword,
//       });
//       if (ok) {
//         const role = (auth.getCurrentRole() || "STUDENT").toUpperCase();
//         localStorage.setItem("role", role);
//         setShowLoginModal(false);
//         redirectByRole(role);
//       } else {
//         alert("Login failed! Check your credentials.");
//       }
//     } catch (err) {
//       alert("Login error: " + err.message);
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   /* ── Google Sign-In — full backend-aware flow ──────────────────────────────
//      Existing users: backend issues a token + role (+ organizationId) and we
//      redirect by role. Brand-new users: we hand off to /complete-profile so
//      they can finish signing up. */
//   const handleModalGoogle = async (res) => {
//     try {
//       localStorage.removeItem("lms_token");
//       localStorage.removeItem("lms_user");
//       localStorage.removeItem("role");

//       const dec = jwtDecode(res.credential);

//       const check = await authService.checkGoogleUser({
//         idToken: res.credential,
//       });

//       // ── EXISTING USER ──────────────────────────────────────────
//       if (check.isNewUser === false && check.token && check.role) {
//         const role = check.role.toUpperCase();
//         localStorage.setItem("lms_token", check.token);
//         localStorage.setItem("role", role);

//         if (check.organizationId) {
//           localStorage.setItem("organizationId", check.organizationId);
//         } else {
//           localStorage.removeItem("organizationId");
//         }

//         localStorage.setItem(
//           "lms_user",
//           JSON.stringify({
//             name: check.name || dec.name,
//             email: check.email || dec.email,
//             role: ["TENANT_ADMIN", "ADMIN", "BUSINESS"].includes(role)
//               ? "admin"
//               : role.toLowerCase(),
//             isGoogleUser: true,
//             profileCompleted: true,
//             organizationId: check.organizationId || null,
//           }),
//         );
//         setShowLoginModal(false);
//         redirectByRole(role);
//         return;
//       }

//       // ── BRAND NEW USER ─────────────────────────────────────────
//       const googleInfo = {
//         name: dec.name,
//         email: dec.email,
//         googleCredential: res.credential,
//       };
//       sessionStorage.setItem("ilmora_google_credential", res.credential);
//       sessionStorage.setItem("ilmora_google_user", JSON.stringify(googleInfo));

//       // Mark authenticated + new right away so IlmOraDemoPage's
//       // mount-time check (`user?.isNewUser === true`) opens the Step 4
//       // role-selection toast the instant the page loads — same
//       // mechanism IlmOraDemoPage's own login modal already uses.
//       localStorage.setItem(
//         "lms_user",
//         JSON.stringify({
//           name: dec.name,
//           email: dec.email,
//           isGoogleUser: true,
//           isNewUser: true,
//           profileCompleted: false,
//         }),
//       );

//       setShowLoginModal(false);
//       navigate("/ilm-demo", { replace: true });
//     } catch (err) {
//       // Surface the real backend message — blocked user / inactive org / etc.
//       const message =
//         err?.response?.data?.message ||
//         err?.message ||
//         "Google login failed. Please try again.";
//       alert(message);
//     }
//   };

//   /* ── Hidden subscriber-admin trigger (callable from elsewhere if needed) ── */
//   const openNewsletterAdmin = () => {
//     document.getElementById("newsletter-admin-trigger")?.click();
//   };

//   const courses = {
//     product: [
//       {
//         id: 1,
//         title: "Product Management Mastery",
//         instructor: "Ex-Google PM",
//         duration: "8 weeks",
//         students: "2,500+",
//         rating: 4.9,
//         level: "Intermediate",
//         description:
//           "Master product lifecycle from ideation to launch. Learn roadmapping, prioritization, stakeholder management & metrics that matter.",
//         modules: [
//           "Discovery & Research",
//           "Roadmapping",
//           "Prioritization Frameworks",
//           "Launch Strategy",
//           "Metrics & Analytics",
//         ],
//         price: "₹49,000",
//         highlights: [
//           "Live sessions with Google PMs",
//           "Real case studies",
//           "1:1 mentorship",
//           "Job referral support",
//         ],
//         liveSessions: 5,
//         totalLessons: 81,
//         projects: 3,
//       },
//       {
//         id: 2,
//         title: "Product Analytics",
//         instructor: "Ex-Amazon",
//         duration: "6 weeks",
//         students: "1,800+",
//         rating: 4.8,
//         level: "Advanced",
//         description:
//           "Data-driven product decisions. Master A/B testing, cohort analysis, funnel optimization & retention strategies.",
//         modules: [
//           "SQL for Product Managers",
//           "Experimentation",
//           "Funnel Analysis",
//           "Retention Metrics",
//           "Customer Segmentation",
//         ],
//         price: "₹39,000",
//         highlights: [
//           "Amazon case studies",
//           "Live SQL projects",
//           "Advanced Mixpanel",
//           "Retention frameworks",
//         ],
//         liveSessions: 4,
//         totalLessons: 60,
//         projects: 2,
//       },
//       {
//         id: 3,
//         title: "Product Strategy",
//         instructor: "Ex-Meta",
//         duration: "10 weeks",
//         students: "2,100+",
//         rating: 4.9,
//         level: "Advanced",
//         description:
//           "Strategic frameworks for product success. Positioning, competitive analysis, growth strategies & portfolio management.",
//         modules: [
//           "Market Analysis",
//           "Competitive Strategy",
//           "Growth Playbooks",
//           "Portfolio Management",
//           "Pricing Strategy",
//         ],
//         price: "₹59,000",
//         highlights: [
//           "Meta growth case studies",
//           "Strategy templates",
//           "Live workshops",
//           "Executive simulations",
//         ],
//         liveSessions: 6,
//         totalLessons: 90,
//         projects: 4,
//       },
//     ],
//     design: [
//       {
//         id: 4,
//         title: "UI/UX Design Bootcamp",
//         instructor: "Ex-Airbnb Designer",
//         duration: "12 weeks",
//         students: "3,200+",
//         rating: 5.0,
//         level: "Beginner",
//         description:
//           "Complete UI/UX journey from research to prototype. Figma mastery, design systems & portfolio projects.",
//         modules: [
//           "User Research",
//           "Wireframing",
//           "Prototyping",
//           "Design Systems",
//           "Portfolio Building",
//         ],
//         price: "₹69,000",
//         highlights: [
//           "Airbnb case studies",
//           "Figma certification",
//           "Live design reviews",
//           "Job ready portfolio",
//         ],
//         liveSessions: 8,
//         totalLessons: 110,
//         projects: 5,
//       },
//       {
//         id: 5,
//         title: "Design Systems",
//         instructor: "Ex-Netflix",
//         duration: "8 weeks",
//         students: "1,500+",
//         rating: 4.8,
//         level: "Advanced",
//         description:
//           "Build scalable design systems like Netflix. Components, tokens, documentation & developer handoff.",
//         modules: [
//           "Component Libraries",
//           "Design Tokens",
//           "Documentation",
//           "Dev Handoff",
//           "Scale Patterns",
//         ],
//         price: "₹45,000",
//         highlights: [
//           "Netflix system breakdown",
//           "Figma + Storybook",
//           "Live system audits",
//           "Enterprise patterns",
//         ],
//         liveSessions: 4,
//         totalLessons: 70,
//         projects: 3,
//       },
//       {
//         id: 6,
//         title: "User Research Pro",
//         instructor: "Ex-Microsoft",
//         duration: "6 weeks",
//         students: "1,900+",
//         rating: 4.7,
//         level: "Intermediate",
//         description:
//           "Research methods that drive product decisions. Interviews, surveys, usability testing & synthesis.",
//         modules: [
//           "Interview Techniques",
//           "Survey Design",
//           "Usability Testing",
//           "Synthesis Methods",
//           "Stakeholder Reports",
//         ],
//         price: "₹35,000",
//         highlights: [
//           "Microsoft research frameworks",
//           "Live user testing",
//           "Report templates",
//           "Stakeholder presentations",
//         ],
//         liveSessions: 3,
//         totalLessons: 55,
//         projects: 2,
//       },
//     ],
//     growth: [
//       {
//         id: 7,
//         title: "Growth Marketing",
//         instructor: "Ex-Uber Growth",
//         duration: "8 weeks",
//         students: "2,800+",
//         rating: 4.9,
//         level: "Intermediate",
//         description:
//           "Growth loops, viral mechanics & acquisition strategies that scale businesses.",
//         modules: [
//           "Growth Frameworks",
//           "Viral Loops",
//           "Acquisition Channels",
//           "Experimentation",
//           "Scaling",
//         ],
//         price: "₹49,000",
//         highlights: [
//           "Uber growth case studies",
//           "Live experiments",
//           "Channel deep dives",
//           "Scaling frameworks",
//         ],
//         liveSessions: 5,
//         totalLessons: 75,
//         projects: 3,
//       },
//       {
//         id: 8,
//         title: "SEO & Content Strategy",
//         instructor: "Ex-Spotify",
//         duration: "10 weeks",
//         students: "2,300+",
//         rating: 4.8,
//         level: "Intermediate",
//         description:
//           "Organic growth mastery. Technical SEO, content systems & link building at scale.",
//         modules: [
//           "Technical SEO",
//           "Content Systems",
//           "Link Building",
//           "Analytics",
//           "Scaling Organic",
//         ],
//         price: "₹55,000",
//         highlights: [
//           "Spotify SEO case studies",
//           "Live audits",
//           "Content calendars",
//           "Enterprise SEO",
//         ],
//         liveSessions: 5,
//         totalLessons: 85,
//         projects: 3,
//       },
//       {
//         id: 9,
//         title: "Performance Marketing",
//         instructor: "Ex-Swiggy",
//         duration: "8 weeks",
//         students: "2,600+",
//         rating: 4.9,
//         level: "Advanced",
//         description:
//           "Paid acquisition at scale. Facebook, Google, creative testing & LTV optimization.",
//         modules: [
//           "Facebook Ads",
//           "Google Ads",
//           "Creative Strategy",
//           "LTV Optimization",
//           "Scaling",
//         ],
//         price: "₹47,000",
//         highlights: [
//           "Swiggy ad case studies",
//           "Live campaign builds",
//           "Creative testing",
//           "ROAS frameworks",
//         ],
//         liveSessions: 5,
//         totalLessons: 72,
//         projects: 4,
//       },
//     ],
//   };

//   const features = [
//     {
//       icon: Target,
//       title: "Project-Based Learning",
//       description: "Build real-world projects that showcase your skills",
//     },
//     {
//       icon: Users,
//       title: "Expert Mentorship",
//       description: "Learn from professionals at top tech companies",
//     },
//     {
//       icon: Trophy,
//       title: "Career Support",
//       description: "Get help with resumes, interviews & job referrals",
//     },
//     {
//       icon: Zap,
//       title: "Live Sessions",
//       description: "Interactive workshops with industry experts",
//     },
//   ];

//   const stats = [
//     { value: "50K+", label: "Active Learners" },
//     { value: "95%", label: "Success Rate" },
//     { value: "100+", label: "Expert Mentors" },
//     { value: "4.9★", label: "Average Rating" },
//   ];

//   const mentorBenefits = [
//     { icon: Award, text: "1:1 mentorship and small cohort learning" },
//     { icon: TrendingUp, text: "Project reviews with detailed feedback" },
//     { icon: Users, text: "Peer community for accountability and networking" },
//   ];

//   const careerSupport = [
//     {
//       icon: Target,
//       title: "Portfolio Support",
//       description: "Turn your projects into case studies hiring managers love",
//     },
//     {
//       icon: Award,
//       title: "Interview Prep",
//       description:
//         "Mock interviews, feedback and guidance on role expectations",
//     },
//     {
//       icon: Users,
//       title: "Referrals & Network",
//       description: "Warm intros to hiring teams and community-led referrals",
//     },
//   ];

//   const getLevelColor = (level) =>
//     ({
//       Beginner:
//         "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
//       Intermediate: "bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20",
//       Advanced:
//         "bg-[#1E293B]/10 text-[#1E293B] dark:bg-white/10 dark:text-white border border-[#1E293B]/20 dark:border-white/20",
//     })[level] || "bg-gray-100 text-gray-700";

//   /* ── Presentational-only helpers for the redesigned course cards ──
//      These do not touch any API/data-fetching logic — they simply
//      derive display values (initials, strike-through price, discount
//      badge) from the existing course fields. */
//   const getInitials = (name = "") =>
//     name
//       .replace(/^Ex-/i, "")
//       .split(" ")
//       .filter(Boolean)
//       .slice(0, 2)
//       .map((w) => w[0])
//       .join("")
//       .toUpperCase() || "IN";

//   const getPricing = (price) => {
//     const current = parseInt(String(price).replace(/[^\d]/g, ""), 10) || 0;
//     const original = Math.round((current * 1.35) / 1000) * 1000;
//     const discount =
//       original > current
//         ? Math.round(((original - current) / original) * 100)
//         : 0;
//     return {
//       current: `₹${current.toLocaleString("en-IN")}`,
//       original: `₹${original.toLocaleString("en-IN")}`,
//       discount,
//     };
//   };

//   // UI-only toggle for the "Read More" link on course-card descriptions.
//   const toggleDescription = (id) => {
//     setExpandedDescriptions((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   const toggleWishlist = async (id) => {
//     // Not logged in → don't call the API, just prompt login
//     if (!user) {
//       setShowLoginModal(true);
//       return;
//     }

//     // Optimistic UI update
//     setWishlist((prev) => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });

//     try {
//       const { data } = await courseService.toggleWishlist(id);
//       // Reconcile with server truth
//       setWishlist((prev) => {
//         const next = new Set(prev);
//         if (data.wishlisted) next.add(id);
//         else next.delete(id);
//         return next;
//       });
//     } catch (err) {
//       // Roll back the optimistic update on failure
//       setWishlist((prev) => {
//         const next = new Set(prev);
//         next.has(id) ? next.delete(id) : next.add(id);
//         return next;
//       });
//       if (err?.response?.status === 401) {
//         setShowLoginModal(true);
//       } else {
//         console.error("Wishlist toggle failed", err);
//       }
//     }
//   };

//   // Adjust this to match whatever base URL the rest of courseService already
//   // uses for uploaded files (check courseService.js for an existing constant
//   // before hardcoding this — do not guess blindly in production).
//   const API_BASE_URL =
//     courseService.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

//   const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

//   const resolveImageUrl = (raw) => {
//     if (!isNonEmptyString(raw)) return "";
//     const trimmed = raw.trim();
//     if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
//       return trimmed; // already absolute
//     }
//     const base = API_BASE_URL.replace(/\/$/, "");
//     return `${base}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`; // relative → prepend base
//   };

//   const mapCompany = (c) => {
//     const rawSrc =
//       c.uploadedLogo ||
//       c.logoUrl ||
//       c.logo ||
//       c.image ||
//       c.imageUrl ||
//       c.logoPath ||
//       c.fileUrl ||
//       c.thumbnail ||
//       c.icon ||
//       c.imageURL ||
//       c.companyLogo ||
//       c.logoImage ||
//       c.picture ||
//       c.photo ||
//       c.mediaUrl ||
//       c.assetUrl ||
//       "";

//     const name = c.name || c.companyName || c.title || "";
//     const finalSrc = resolveImageUrl(rawSrc);

//     console.log("DEBUG company logo mapping →", {
//       name,
//       logo: c.logo,
//       logoUrl: c.logoUrl,
//       finalImageSource: finalSrc,
//     });

//     return {
//       src: finalSrc,
//       name,
//       desc: c.description || c.desc || c.about || "",
//     };
//   };

//   const findCategory = (data, ...aliases) => {
//     if (!data || typeof data !== "object") return [];
//     const keys = Object.keys(data);
//     const normalize = (s) => s.toLowerCase().replace(/[\s_-]/g, "");

//     // Pass 1: exact match
//     for (const alias of aliases) {
//       const target = normalize(alias);
//       const foundKey = keys.find((k) => normalize(k) === target);
//       if (foundKey && Array.isArray(data[foundKey])) return data[foundKey];
//     }

//     // Pass 2: fuzzy — key contains the alias, or alias contains the key
//     for (const alias of aliases) {
//       const target = normalize(alias);
//       const foundKey = keys.find((k) => {
//         const nk = normalize(k);
//         return (
//           Array.isArray(data[k]) && (nk.includes(target) || target.includes(nk))
//         );
//       });
//       if (foundKey) return data[foundKey];
//     }

//     return [];
//   };

//   const techPartnersRaw = findCategory(
//     companyData,
//     "Technology Partner",
//     "Technology Partners",
//     "Tech Partner",
//     "Tech Partners",
//     "technology",
//     "techPartner",
//     "techPartners",
//   );
//   const bizPartnersRaw = findCategory(
//     companyData,
//     "Business Partner",
//     "Business Partners",
//     "business",
//     "businessPartner",
//     "businessPartners",
//     "Partner Business",
//   );
//   const ecosystemRaw = findCategory(
//     companyData,
//     "Texora Product Ecosystem",
//     "Texora Products Ecosystem",
//     "Product Ecosystem",
//     "Texora Product",
//     "Texora Products",
//     "Ecosystem",
//     "products",
//     "texoraProducts",
//   );

//   const techPartners = techPartnersRaw
//     .map(mapCompany)
//     .filter((c) => c.src || c.name);
//   const bizPartners = bizPartnersRaw
//     .map(mapCompany)
//     .filter((c) => c.src || c.name);

//   const ECOSYSTEM_COLOR_CLASSES = {
//     blue: "bg-blue-50 text-blue-600 border-blue-100",
//     orange: "bg-orange-50 text-[#F97316] border-orange-100",
//     purple: "bg-purple-50 text-purple-600 border-purple-100",
//     green: "bg-green-50 text-green-600 border-green-100",
//     rose: "bg-rose-50 text-rose-600 border-rose-100",
//   };

//   const ecosystemProducts = ecosystemRaw.length
//     ? ecosystemRaw.map((c, i) => ({
//         ...mapCompany(c),
//                 color: ECOSYSTEM_COLORS[i % ECOSYSTEM_COLORS.length],
//       }))
//     : null;

//   // TEMP TEST: hydration error isolate karne ke liye
//   const [pageMounted, setPageMounted] = useState(false);
//   useEffect(() => {
//     setPageMounted(true);
//   }, []);
//   if (!pageMounted) {
//     return <div className="min-h-screen bg-[#F6EDE6] dark:bg-black" />;
//   }

//   return (
//     <div className="min-h-screen bg-[#F6EDE6] dark:bg-black text-[#1E293B] dark:text-white">
//       {/* ── Announcement Banner & Navbar ── */}
//             <ClientOnly>
//         <AnnouncementBanner />
//         <Navbar
//           theme={theme}
//           toggleTheme={toggleTheme}
//           setShowLoginModal={setShowLoginModal}
//         />
//       </ClientOnly>

//       {/* ── Hero ── */}
//         <section className="relative pt-24 pb-14 px-6 h-[68svh] min-h-[440px] flex items-center overflow-hidden bg-[#1E293B]">
//         {/* Full-bleed background video — loads only after idle, poster keeps a frame visible instantly */}
//           <video
//           src={videoReady ? heroVideo : undefined}
//           preload="auto"
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover"
//           style={{
//             opacity: currentSlide === -1 ? 1 : 0,
//             transition: "opacity 0.6s ease",
//             zIndex: 0,
//             pointerEvents: currentSlide === -1 ? "auto" : "none",
//           }}
//         />
//         {/* Full-bleed background images — cover fills the section, positioned per-image to keep faces in frame */}
//         {heroImages.map((img, index) => (
//           <img
//             key={index}
//             src={img.src}
//             alt={`Hero Student ${index + 1}`}
//             loading={index === 0 ? "eager" : "lazy"}
//             decoding="async"
//             fetchpriority={index === 0 ? "high" : "low"}
//             className="absolute inset-0 w-full h-full object-cover"
//             style={{
//               objectPosition: heroImagePositions[index] || "center 10%",
//               opacity: currentSlide === index ? 1 : 0,
//               transition: "opacity 0.6s ease",
//               zIndex: 0,
//               pointerEvents: currentSlide === index ? "auto" : "none",
//             }}
//           />
//         ))}

//         {/* Dark gradient overlay so text stays readable over any image/video */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/15 z-[1]" />

//         <div className="max-w-7xl mx-auto relative z-10 w-full">
//           <div className="max-w-2xl text-center lg:text-left">
//             <div className="mb-4 sm:mb-5 inline-flex">
              
//             </div>
//                         <style>{`@keyframes heroTextIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
//                         <ClientOnly
//               fallback={
//                 <h1 className="mb-5 leading-[1.1]">
//                 <span suppressHydrationWarning className="block whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white">
//                     {heroTexts[currentSlide + 1].line1}
//                   </span>
//                   <span suppressHydrationWarning className="block whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#F97316]">
//                     {heroTexts[currentSlide + 1].line2}
//                   </span>
//                 </h1>
//               }
//             >
//               <h1 key={`h-${currentSlide}`} className="mb-5 leading-[1.1]">
//                 <div className="block whitespace-nowrap">
//                   <SplitText
//                     text={heroTexts[currentSlide + 1].line1}
//                     className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white"
//                     splitType="chars"
//                     delay={60}
//                     duration={0.6}
//                   />
//                 </div>
//                 <div className="block whitespace-nowrap">
//                   <SplitText
//                     text={heroTexts[currentSlide + 1].line2}
//                     className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#F97316]"
//                     splitType="chars"
//                     delay={60}
//                     duration={0.6}
//                   />
//                 </div>
//               </h1>
//             </ClientOnly>
//                         <p
//               key={`p-${currentSlide}`}
//               suppressHydrationWarning
//               className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 max-w-xl leading-relaxed font-light"
//               style={{ animation: "heroTextIn 0.5s ease both" }}
//             >
//               {heroTexts[currentSlide + 1].desc}
//             </p>
//           </div>
//         </div>

//         {/* Slide indicator dots — bottom center, over the background */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
//           <button
//             onClick={() => goToSlide(-1)}
//             aria-label="Show video"
//             style={{
//               width: currentSlide === -1 ? "28px" : "10px",
//               height: "10px",
//               borderRadius: "9999px",
//               background:
//                 currentSlide === -1 ? "#22c55e" : "rgba(255,255,255,0.4)",
//               border: "none",
//               cursor: "pointer",
//               padding: 0,
//               transition: "width 0.35s ease, background 0.35s ease",
//             }}
//           />
//           {heroImages.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               aria-label={`Go to slide ${index + 1}`}
//               style={{
//                 width: currentSlide === index ? "28px" : "10px",
//                 height: "10px",
//                 borderRadius: "9999px",
//                 background:
//                   currentSlide === index ? "#F97316" : "rgba(255,255,255,0.4)",
//                 border: "none",
//                 cursor: "pointer",
//                 padding: 0,
//                 transition: "width 0.35s ease, background 0.35s ease",
//               }}
//             />
//           ))}
//         </div>
//             </section>

//       {/* ── Courses ── */}
//       <section
//         id="courses"
//         className="py-4 sm:py-5 scroll-mt-20 bg-[#F8FAFC] dark:bg-black"
//       >
//         <div className="max-w-[1440px] mx-auto px-6">
//           {/* ── Premium Section Header ── */}
//             <div className="text-center mb-3 sm:mb-4">
//                         {/* <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-[#F97316] bg-[#F97316]/10 border border-[#F97316]/20 px-4 py-1.5 rounded-full mb-2">
//               <Sparkles className="w-3.5 h-3.5" />
//               Handpicked for you
//             </span> */}
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 sm:mb-3 tracking-tight text-[#1E293B] dark:text-white">
//               Featured <span className="text-[#F97316]">Programs</span>
//             </h2>
//             <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
//               Choose your path and start building skills that matter — taught by
//               mentors who've shipped at the world's best companies.
//             </p>
//           </div>

//           <Tabs
//             value={activeTab}
//             onValueChange={setActiveTab}
//             className="w-full"
//           >
//             {/* ── Category Tabs: compact carousel, scales to 10/20/50+ categories
//                  without ever wrapping to multiple rows. Arrows + drag + wheel
//                  + native swipe, active tab always auto-scrolled into view. ── */}
//               <div className="mb-3 sm:mb-4 mx-auto w-fit max-w-full sm:max-w-3xl px-1 sm:px-0">
//               <div className="h-[42px] flex items-center px-1 sm:px-1.5 bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 shadow-md shadow-slate-200/50 dark:shadow-none overflow-hidden">
//                 <CategoryTabScroller activeKey={activeTab}>
//                   <TabsList className="flex w-max items-center justify-center gap-1.5 bg-transparent mx-auto h-full">
//                     {Object.keys(
//                       programsLoading
//                         ? courses
//                         : featuredPrograms &&
//                             Object.values(featuredPrograms).some(
//                               (a) => a.length > 0,
//                             )
//                           ? featuredPrograms
//                           : courses,
//                     ).map((tab) => (
//                       <TabsTrigger
//                         key={tab}
//                         value={tab}
//                         className="rounded-full capitalize font-semibold text-xs sm:text-sm whitespace-nowrap px-3.5 sm:px-5 h-[34px] flex-shrink-0 flex items-center text-[#1E293B] dark:text-gray-300 transition-all duration-300 ease-out data-[state=active]:bg-[#F97316] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/30"
//                       >
//                         {tab}
//                       </TabsTrigger>
//                     ))}
//                   </TabsList>
//                 </CategoryTabScroller>
//               </div>
//             </div>

//             {/* Real featured programs from the backend (with hardcoded
//                `courses` as the fallback while loading or if the API
//                returns nothing). */}
//             {Object.entries(
//               programsLoading
//                 ? courses
//                 : featuredPrograms &&
//                     Object.values(featuredPrograms).some((a) => a.length > 0)
//                   ? featuredPrograms
//                   : courses,
//             ).map(([category, categoryCourses]) => (
//                 <TabsContent key={category} value={category}>
//                 <ClientOnly>
//                 <HorizontalCarousel
//                   items={categoryCourses}
//                   ariaLabel={`${category} courses`}
//                   getKey={(course) => course.id}
//                   cardMinHeight={260}
//                   renderItem={(course, idx) => {
//                     const pricing = getPricing(course.price);
//                     // Real flags from superadmin now take priority — falls
//                     // back to the old rating guess only when a program has
//                     // none of the badge toggles set, so nothing regresses.
//                     const badgeLabel = course.isBestseller
//                       ? "Bestseller"
//                       : course.isTrending
//                         ? "Trending"
//                         : course.isFeatured
//                           ? "Featured"
//                           : course.isPopular
//                             ? "Popular"
//                             : course.isRecommended
//                               ? "Recommended"
//                               : course.rating >= 4.8
//                                 ? "Bestseller"
//                                 : "Featured";
//                     const lessons =
//                       course.totalLessons || course.modules?.length || 0;
//                     const isWishlisted = wishlist.has(course.id);
//                     const isDescExpanded = expandedDescriptions.has(course.id);
//                     // Presentational-only: pick the badge icon that matches
//                     // the same `badgeLabel` computed above — no new business
//                     // logic, just an icon lookup for the existing label.
//                     const BadgeIcon =
//                       {
//                         Bestseller: Flame,
//                         Featured: Star,
//                         Trending: TrendingUp,
//                         Popular: Zap,
//                         Recommended: Award,
//                       }[badgeLabel] || Sparkles;

//                     return (
//                       <div
//                         onClick={() =>
//                           navigate(`/course-details/${course.id}`, {
//                             state: { course },
//                           })
//                         }
//                         className="group relative flex flex-col min-w-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl hover:shadow-slate-300/40 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden cursor-pointer w-full h-full"
//                       >
//                         {/* ── Thumbnail / Banner ── */}
//                         <div className="relative h-32 sm:h-36 overflow-hidden bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#F97316] flex-shrink-0">
//                           {course.thumbnailUrl || course.bannerUrl ? (
//                             <img
//                               src={course.thumbnailUrl || course.bannerUrl}
//                               alt={course.title}
//                               className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
//                             />
//                           ) : (
//                             <>
//                               <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_35%),radial-gradient(circle_at_80%_60%,white,transparent_30%)]" />
//                               <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
//                                 <GraduationCap
//                                   className="w-16 h-16 sm:w-20 sm:h-20 text-white/25"
//                                   strokeWidth={1.25}
//                                 />
//                               </div>
//                             </>
//                           )}

//                           {/* Top badges */}
//                           <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
//                             <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide bg-white/95 text-orange-700 px-2.5 py-1 rounded-full shadow-sm">
//                               <BadgeIcon className="w-3 h-3 fill-current" />
//                               {badgeLabel}
//                             </span>

//                             <button
//                               type="button"
//                               aria-label={
//                                 isWishlisted
//                                   ? "Remove from wishlist"
//                                   : "Add to wishlist"
//                               }
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleWishlist(course.id);
//                               }}
//                               className="flex items-center justify-center w-8 h-8 rounded-full bg-white/95 shadow-sm hover:scale-110 active:scale-95 transition-transform duration-200"
//                             >
//                               <Heart
//                                 className={`w-4 h-4 transition-colors ${
//                                   isWishlisted
//                                     ? "fill-[#F97316] text-[#F97316]"
//                                     : "text-[#1E293B]"
//                                 }`}
//                               />
//                             </button>
//                           </div>

//                           {/* Difficulty badge */}
//                           <div className="absolute bottom-3 left-3 right-3 max-w-[70%]">
//                             <span
//                               className={`inline-block max-w-full truncate align-bottom text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${getLevelColor(course.level)} bg-white/95 dark:bg-white/95`}
//                             >
//                               {course.level}
//                             </span>
//                           </div>
//                         </div>

//                         {/* ── Body ── */}
//                         <div className="flex flex-col flex-1 min-w-0 p-3 sm:p-4 pt-3">
//                           <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-[#F97316] mb-1 truncate">
//                             {category}
//                           </span>

//                           <h3 className="text-sm sm:text-base font-bold text-[#1E293B] dark:text-white mb-1.5 leading-snug line-clamp-2 min-h-[2.5em] group-hover:text-[#F97316] transition-colors">
//                             {course.title}
//                           </h3>

//                           <p
//                             className={`text-xs text-gray-600 dark:text-gray-300 leading-relaxed ${
//                               isDescExpanded ? "" : "line-clamp-2 min-h-[2.2em]"
//                             }`}
//                           >
//                             {course.description}
//                           </p>

//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               toggleDescription(course.id);
//                             }}
//                             className="inline-flex items-center gap-1 text-xs font-semibold text-[#F97316] hover:underline bg-transparent border-none p-0 mt-0.5 mb-2 self-start cursor-pointer"
//                           >
//                             {isDescExpanded ? "Show Less" : "Read More"}
//                             <ArrowRight className="w-3 h-3" />
//                           </button>

//                           {/* Skill chips */}
//                           <div className="flex flex-wrap gap-1 mb-2 overflow-hidden max-h-[24px]">
//                             <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/15 whitespace-nowrap flex-shrink-0 truncate max-w-[120px]">
//                               {category}
//                             </span>
//                             <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#1E293B]/5 text-[#1E293B] dark:bg-white/10 dark:text-gray-200 border border-[#1E293B]/10 dark:border-white/10 whitespace-nowrap flex-shrink-0">
//                               {course.level}
//                             </span>
//                             {course.liveSessions !== undefined &&
//                               course.liveSessions !== "—" && (
//                                 <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 whitespace-nowrap flex-shrink-0">
//                                   {course.liveSessions} Live
//                                 </span>
//                               )}
//                           </div>

//                           {/* Stats */}
//                           <div className="grid grid-cols-4 gap-1 text-center mb-2 pb-2 border-b border-gray-100 dark:border-gray-800">
//                             <div className="flex flex-col items-center gap-0.5 min-w-0">
//                               <PlayCircle className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
//                               <span className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 truncate w-full">
//                                 {lessons ?? "—"}
//                               </span>
//                               <span className="text-[9px] text-gray-400 dark:text-gray-500 truncate w-full">
//                                 Lessons
//                               </span>
//                             </div>
//                             <div className="flex flex-col items-center gap-0.5 min-w-0">
//                               <Users className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
//                               <span className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 truncate w-full">
//                                 {course.students ?? "—"}
//                               </span>
//                               <span className="text-[9px] text-gray-400 dark:text-gray-500 truncate w-full">
//                                 Learners
//                               </span>
//                             </div>
//                             <div className="flex flex-col items-center gap-0.5 min-w-0">
//                               <Clock className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
//                               <span className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 truncate w-full">
//                                 {course.duration ?? "—"}
//                               </span>
//                               <span className="text-[9px] text-gray-400 dark:text-gray-500 truncate w-full">
//                                 Duration
//                               </span>
//                             </div>
//                             <div className="flex flex-col items-center gap-0.5 min-w-0">
//                               <Star className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
//                               <span className="text-[10px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 truncate w-full">
//                                 {course.rating ?? "—"}
//                               </span>
//                               <span className="text-[9px] text-gray-400 dark:text-gray-500 truncate w-full">
//                                 Rating
//                               </span>
//                             </div>
//                           </div>

//                           {/* CTA */}
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               navigate(`/course-details/${course.id}`, {
//                                 state: { course },
//                               });
//                             }}
//                             className="mt-auto w-full flex-shrink-0 bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:brightness-105 text-white py-2.5 rounded-lg font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-300 group-hover:scale-[1.02] shadow-sm shadow-orange-500/20"
//                           >
//                             View Details
//                             <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
//                           </button>
//                         </div>
//                       </div>
//                     );
//                                    }}
//                 />
//                 </ClientOnly>
//               </TabsContent>
//             ))}
//         </Tabs>
//         </div>
//       </section>

//             {/* ── ILM ORA Platform hub (AI Companion / Workspace / Calendry) ── */}
//       <ProductHubSection navigate={navigate} />

     

//       {/* ── Stats ── */}
//         {/* <section className="py-6 sm:py-8 px-6 bg-white dark:bg-gray-900/50">
//         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((stat, i) => (
//             <div
//               key={i}
//               className="bg-[#F6EDE6] dark:bg-gray-900 rounded-2xl p-4 sm:p-5 text-center border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
//             >
//               <div className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#F97316] mb-1.5">
//                 {stat.value}
//               </div>
//               <p className="text-gray-600 dark:text-gray-300 font-medium">
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section> */}
//       {/* ── WatchNow ── */}
//             <ClientOnly>
//         <WatchNowSection />
//       </ClientOnly>

//       {/* ── Mentors (testimonials — backend-connected) ── */}
//       <section
//         id="mentors"
//         className="py-4 sm:py-5 px-4 sm:px-6 scroll-mt-20 bg-[#FAF6F2] dark:bg-gray-900/30 overflow-x-hidden"
//       >
//         <div className="max-w-[1200px] mx-auto">
//           <div className="text-center max-w-[900px] lg:max-w-none mx-auto mb-5 sm:mb-5 lg:mb-5">
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-[#1E293B] dark:text-white leading-tight">
//               What Our <span className="text-[#F97316]">Learners</span> Have To
//               Say
//             </h2>
//             <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-300 text-sm sm:text-base font-medium">
//               <Star className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-[#F97316] text-[#F97316]" />
//               <span className="text-[#111827] dark:text-white font-bold">
//                 4.9
//               </span>
//               <span className="text-gray-400">•</span>
//               <span>Thousands of Happy Learners</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 sm:mb-6 lg:mb-6">
//             {mentorBenefits.map((item, i) => (
//               <div
//                 key={i}
//                 className="h-full flex items-center gap-3 bg-[#FAF6F2] dark:bg-gray-900 rounded-2xl p-4 border border-[#ECECEC] dark:border-gray-800 shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
//               >
//                 <div className="w-10 h-10 bg-[#1E293B] dark:bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
//                   <item.icon className="w-5 h-5 text-white" />
//                 </div>
//                 <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm leading-snug">
//                   {item.text}
//                 </p>
//               </div>
//             ))}
//           </div>

//                     <MentorTestimonialCarousel testimonials={testimonials} />
//         </div>
//       </section>

//       {/* ── Certifications (AWS / Microsoft / Cloud / Google) ── */}
//       <CertificationShowcase navigate={navigate} />

//       {/* ── Career Support ── */}
//       <section
//         id="successstories"
//         className="py-5 px-4 sm:px-6 lg:px-10 scroll-mt-20 bg-[#F6EDE6] dark:bg-black"
//       >
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-6">
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-[#1E293B] dark:text-white">
//               Career Support That{" "}
//               <span className="text-[#F97316]">Delivers Results</span>
//             </h2>
//             <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
//               Get help with interview prep, portfolios, referrals and role
//               mapping
//             </p>
//           </div>
//           <div className="grid lg:grid-cols-3 gap-5 mb-6">
//             {careerSupport.map((item, i) => (
//               <div
//                 key={i}
//                 className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
//               >
//                 <div className="w-12 h-12 bg-[#1E293B] dark:bg-[#F97316] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
//                   <item.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1E293B] dark:text-white mb-3">
//                   {item.title}
//                 </h3>
//                 <p className="text-base font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
//                   {item.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* ── Wide banner CTA ── */}
//           <div className="bg-[#F6EDE6] dark:bg-gray-900 rounded-3xl relative overflow-hidden border border-[#F97316]/20 shadow-xl">
//             <div className="flex flex-col lg:flex-row items-stretch">
//               {/* ── Left: full-bleed image, fixed height, cropped to fill ── */}
//               <div className="w-full lg:w-[280px] xl:w-[320px] h-40 sm:h-44 lg:h-auto flex-shrink-0 overflow-hidden">
//                 <img
//                   src={ctaStudent.src}
//                   alt="Student ready to transform their career"
//                   className="w-full h-full object-cover object-top"
//                 />
//               </div>

//               {/* ── Middle: Content ── */}
//               <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-6 lg:py-4">
//                 <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-2 text-[#1E293B] dark:text-white leading-tight">
//                   Ready to Transform Your Career?
//                 </h3>
//                 <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
//                   Join 5000+ professionals who've already taken the leap with
//                   our project-based programs and expert mentorship.
//                 </p>
//               </div>

//               {/* ── Right: CTA button ── */}
//               <div className="flex items-center justify-center lg:justify-end px-6 sm:px-10 pb-10 lg:pb-0 lg:pr-10">
//                 <button
//                   onClick={() => scrollToSection("courses")}
//                   className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap"
//                 >
//                   Explore Courses <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Features ── */}
//         <section className="py-5 sm:py-6 px-6 bg-[#F6EDE6] dark:bg-black">
//         <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-6">
//                         <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-[#1E293B] dark:text-white">
//               Why Choose
//               <span className="ml-2">
//                 <span className="text-green-600">ILM</span>{" "}
//                 <span className="text-[#F97316]">ORA</span>
//               </span>
//             </h2>
//             <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
//               Everything you need to accelerate your career growth
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {features.map((feature, i) => (
//               <div
//                 key={i}
//                 className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group"
//               >
//                                 <div className="w-11 h-11 bg-[#1E293B] dark:bg-[#F97316] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
//                   <feature.icon className="w-5 h-5 text-white" />
//                 </div>
//                   <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1E293B] dark:text-white mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-base font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//         <section className="py-5 sm:py-6 px-4 sm:px-6 relative overflow-hidden bg-white dark:bg-[#0F172A]">
//         <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-6" style={{ marginBottom: 16 }}>
//                         <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold">
//               TRUSTED BY LEADING ORGANIZATIONS
//             </p>

//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1E293B] dark:text-white mt-3">
//               Top Global <span className="text-[#F97316]">Companies</span>
//             </h2>

//             <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
//               We collaborate with leading technology providers and business
//               organizations to deliver innovative digital solutions.
//             </p>
//           </div>

//           <TopCompaniesCarousel
//             logos={[
//               ...techPartners,
//               ...bizPartners,
//               ...(ecosystemProducts || []),
//             ]}
//           />
//         </div>
//       </section>
//       {/* ── Footer ── */}
//             <ClientOnly>
//         <Footer scrollToSection={scrollToSection} />
//       </ClientOnly>
//       {/* ── Login Modal ── */}
//       {showLoginModal && (
//         <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//           <div
//             className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//             style={{
//               background: "rgba(0,0,0,0.55)",
//               backdropFilter: "blur(5px)",
//             }}
//             onClick={(e) => {
//               if (e.target === e.currentTarget) setShowLoginModal(false);
//             }}
//           >
//             <div
//               className="relative w-full max-w-md rounded-2xl shadow-2xl"
//               style={{
//                 background: "rgba(255,255,255,0.97)",
//                 border: "1px solid rgba(249,115,22,0.18)",
//                 padding: "20px 26px 18px",
//                 animation: "modalFadeUp 0.3s ease both",
//               }}
//             >
//               <style>{`@keyframes modalFadeUp { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>

//               <button
//                 onClick={() => setShowLoginModal(false)}
//                 className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition text-xl font-bold leading-none"
//                 aria-label="Close"
//               >
//                 ×
//               </button>

//               <div className="flex justify-center mb-2">
//                 <span className="text-3xl font-extrabold font-serif tracking-wide">
//                   <span className="text-green-600">ILM</span>
//                   <span className="text-[#F97316] ml-2">ORA</span>
//                 </span>
//               </div>

//               <div className="text-center mb-3">
//                 <h2 className="text-lg font-bold text-[#1e0e02] mb-0.5">
//                   Welcome back!
//                 </h2>
//               </div>

//               <div className="flex justify-center mb-3">
//                 <GoogleLogin
//                   onSuccess={handleModalGoogle}
//                   onError={() => console.error("Google OAuth failed")}
//                   theme="outline"
//                   size="large"
//                   text="continue_with"
//                   shape="rectangular"
//                   width="360"
//                   auto_select={false}
//                   cancel_on_tap_outside={true}
//                 />
//               </div>

//               <div className="flex items-center gap-2 mb-3">
//                 <div
//                   className="flex-1 h-px"
//                   style={{ background: "rgba(180,100,30,0.15)" }}
//                 />
//                 <span className="text-xs text-[#b8906a] uppercase tracking-widest font-medium">
//                   OR
//                 </span>
//                 <div
//                   className="flex-1 h-px"
//                   style={{ background: "rgba(180,100,30,0.15)" }}
//                 />
//               </div>

//               <form onSubmit={handleModalSubmit}>
//                 <div className="mb-2">
//                   <label className="block text-xs font-bold text-[#8a6040] mb-1 uppercase tracking-widest">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     placeholder="Enter your email"
//                     value={modalEmail}
//                     onChange={(e) => setModalEmail(e.target.value)}
//                     required
//                     disabled={modalLoading}
//                     className="w-full px-3.5 py-2 rounded-xl text-sm text-[#1a0e06] placeholder-[#c0a070] outline-none transition-all disabled:opacity-50"
//                     style={{
//                       background: "rgba(255,255,255,0.8)",
//                       border: "1.5px solid rgba(180,120,60,0.2)",
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = "#F97316";
//                       e.target.style.boxShadow =
//                         "0 0 0 3px rgba(249,115,22,0.1)";
//                       e.target.style.background = "#fff";
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = "rgba(180,120,60,0.2)";
//                       e.target.style.boxShadow = "none";
//                     }}
//                   />
//                 </div>
//                 <div className="mb-1.5">
//                   <label className="block text-xs font-bold text-[#8a6040] mb-1 uppercase tracking-widest">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showModalPw ? "text" : "password"}
//                       placeholder="Enter your password"
//                       value={modalPassword}
//                       onChange={(e) => setModalPassword(e.target.value)}
//                       required
//                       disabled={modalLoading}
//                       className="w-full px-3.5 py-2 pr-11 rounded-xl text-sm text-[#1a0e06] placeholder-[#c0a070] outline-none transition-all disabled:opacity-50"
//                       style={{
//                         background: "rgba(255,255,255,0.8)",
//                         border: "1.5px solid rgba(180,120,60,0.2)",
//                       }}
//                       onFocus={(e) => {
//                         e.target.style.borderColor = "#F97316";
//                         e.target.style.boxShadow =
//                           "0 0 0 3px rgba(249,115,22,0.1)";
//                         e.target.style.background = "#fff";
//                       }}
//                       onBlur={(e) => {
//                         e.target.style.borderColor = "rgba(180,120,60,0.2)";
//                         e.target.style.boxShadow = "none";
//                       }}
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowModalPw((p) => !p)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8906a] hover:text-[#F97316] transition p-0 bg-transparent border-none cursor-pointer"
//                       tabIndex={-1}
//                     >
//                       {showModalPw ? (
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
//                           <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
//                           <line x1="1" y1="1" x2="23" y2="23" />
//                         </svg>
//                       ) : (
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 24 24"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         >
//                           <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
//                           <circle cx="12" cy="12" r="3" />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 <div className="text-right mb-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowLoginModal(false);
//                       setShowForgotModal(true);
//                     }}
//                     className="text-xs text-[#F97316] hover:underline bg-transparent border-none cursor-pointer font-medium p-0"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={modalLoading}
//                   className="w-full py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                   style={{
//                     background: "linear-gradient(135deg,#F97316,#ea580c)",
//                     boxShadow: "0 4px 18px rgba(249,115,22,0.32)",
//                   }}
//                 >
//                   {modalLoading ? (
//                     <>
//                       <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
//                       Signing in…
//                     </>
//                   ) : (
//                     "Log in"
//                   )}
//                 </button>
//               </form>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowLoginModal(false);
//                   setShowSignupModal(true);
//                 }}
//                 className="w-full mt-2.5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
//                 style={{
//                   background: "transparent",
//                   border: "2px solid #16a34a",
//                   color: "#16a34a",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = "#16a34a";
//                   e.currentTarget.style.color = "#fff";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = "transparent";
//                   e.currentTarget.style.color = "#16a34a";
//                 }}
//               >
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
//                   <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
//                   <path d="M2 12h20" />
//                 </svg>
//                 Sign up
//               </button>

//               <div className="text-center mt-3">
//                 <button
//                   onClick={() => setShowLoginModal(false)}
//                   className="text-xs text-[#b8906a] hover:text-[#8a6040] bg-transparent border-none cursor-pointer transition-colors"
//                 >
//                   ← Back to home
//                 </button>
//               </div>
//             </div>
//           </div>
//         </GoogleOAuthProvider>
//       )}
//       {showSignupModal && (
//         <SignupModal
//           onClose={() => setShowSignupModal(false)}
//           onSwitchToLogin={() => {
//             setShowSignupModal(false);
//             setShowLoginModal(true);
//           }}
//         />
//       )}
//       {showForgotModal && (
//         <ForgotPasswordModal
//           onClose={() => setShowForgotModal(false)}
//           onSwitchToLogin={() => {
//             setShowForgotModal(false);
//             setShowLoginModal(true);
//           }}
//         />
//       )}
//            <ClientOnly>
//         <TexoraFloatingWidget />
//       </ClientOnly>
//     </div>
//   );
// }














































"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import SignupModal from "./SignupModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import SplitText from "../../components/SplitText";
import {
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Flame,
  GraduationCap,
  Heart,
  Lightbulb,
  Mic,
  MessageSquare,
  Quote,
  PlayCircle,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
    Users,
  Wand2,
  Zap,
  BarChart3,
  CalendarClock,
  FileText,
  Shield,
  Video,
  Cloud,
  Globe,
  Layers,
  Code2,
  Smartphone,
  Settings,
  PenTool,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@/lib/routerCompat";
import heroVideo from "../../assets/hero-1.mp4";
import heroStudent2 from "../../assets/hero-student-2.webp";
import heroStudent3 from "../../assets/hero-student-3.webp";
import hero4 from "../../assets/hero-4.webp";
import hero5 from "../../assets/hero-5.webp";
import hero6 from "../../assets/hero-6.webp";
import hero7 from "../../assets/hero-7.webp";
import hero8 from "../../assets/hero-8.webp";
import heroStudent from "../../assets/hero-student.webp";
import aiChatImg from "../../assets/AI Companion/AI_Chat.webp";
import aiWriteImg from "../../assets/AI Companion/Help_Me_Write.webp";
import aiNotesImg from "../../assets/AI Companion/Live_Notes.webp";
import aiWorkflowsImg from "../../assets/AI Companion/Workflows.webp";
import workspacePreviewImg from "../../assets/WorkspacePreview.webp";
import workspaceDashboardImg from "../../assets/Dashboard.webp";
import workspaceHostImg from "../../assets/Host Controller.webp";
import workspaceRecordingsImg from "../../assets/RecordingsNotes.webp";
import workspaceStartJoinImg from "../../assets/StartJoin.webp";
import ctaStudent from "../../assets/cta-student.webp";
import auth from "../../auth";
import Navbar from "./components/Navbar";
import AnnouncementBanner from "./components/AnnouncementBanner";
import authService from "../../services/authService";
import { courseService } from "../../services/courseService";
import { subscribeNewsletter } from "../../services/notificationService";
import TexoraFloatingWidget from "./components/TexoraFloatingWidget";
import HorizontalCarousel from "./components/HorizontalCarousel";
import CategoryTabScroller from "./components/CategoryTabScroller";
import WatchNowSection from "./components/WatchNow";
import Footer from "./components/Footer";

// Renders children only after mounting in the browser (avoids hydration mismatch)
function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted ? children : fallback;
}

const GOOGLE_CLIENT_ID =
  "572421778240-akk3kkb4f60ukuv9pcfrpg2ielm09thk.apps.googleusercontent.com";

/* ── Fallback data for the "Top Global Companies" section ──
   Used only while the backend call is loading or if it returns nothing. */
const FALLBACK_TECH_PARTNERS = [
  { src: "/aws.png", name: "AWS", desc: "Amazon Web Services" },
  { src: "/Google.jpg", name: "Google Cloud", desc: "Google Cloud Platform" },
  { src: "/Amazone.jpg", name: "Amazon AWS", desc: "Amazon Web Services" },
  {
    src: "/Micrososft.jpg",
    name: "Microsoft Azure",
    desc: "Microsoft Cloud Platform",
  },
];

const FALLBACK_BIZ_PARTNERS = [
  { src: "/Picture1.jpg", name: "Texora AI", desc: "AI & Digital Solutions" },
  {
    src: "/UFS-Logo.jpg",
    name: "UFS Network",
    desc: "Unified Consultancy Services",
  },
];

const ECOSYSTEM_COLORS = ["blue", "orange", "purple", "green", "rose"];

const FALLBACK_ECOSYSTEM = [
  {
    name: "TORA CX",
    color: "blue",
    desc: "Customer experience platform",
    Icon: null,
    svgPath: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
  },
  {
    name: "UNIFIED CRM",
    color: "orange",
    desc: "AI-driven CRM for sales",
    Icon: Users,
  },
  {
    name: "ILM ORA",
    color: "purple",
    desc: "LMS with AI learning paths",
    Icon: GraduationCap,
  },
  {
    name: "INNOVORA AI",
    color: "green",
    desc: "AI-powered innovation suite",
    Icon: Lightbulb,
  },
  {
    name: "TASK ORBIT",
    color: "rose",
    desc: "AI-powered task management",
    Icon: ClipboardList,
  },
];

// MentorTestimonialCarousel — horizontally scrollable testimonial cards with
// arrow navigation + dot pagination. Purely presentational; consumes the
// same `testimonials` array/state already loaded from the backend — no
// data-fetching or business logic here.
// ─────────────────────────────────────────────────────────────────────────────

// Small avatar helper: shows the backend image in a circular frame,
// falls back to initials if there's no image or the image fails to load.
function MentorAvatar({ name, image, size = "w-9 h-9", showBadge = false }) {
  const [imgError, setImgError] = useState(false);
  const initials = (name || "").charAt(0).toUpperCase();

  return (
    <div className={`relative ${size} flex-shrink-0`}>
      <div
        className={`${size} rounded-full overflow-hidden bg-[#1E293B] dark:bg-[#F97316] flex items-center justify-center text-white font-bold`}
      >
        {image && !imgError ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {showBadge && (
        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#22C55E] border-2 border-white dark:border-gray-900 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-2.5 h-2.5 sm:w-3 sm:h-3"
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}

function MentorTestimonialCarousel({ testimonials }) {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // UI-only: tracks which cards have "Read More" expanded. Does not touch
  // backend data, carousel/scroll logic, or pagination logic below.
  const [expandedCards, setExpandedCards] = useState({});
  const toggleExpanded = (i) =>
    setExpandedCards((prev) => ({ ...prev, [i]: !prev[i] }));

  const scrollToIndex = (index) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[index];
    if (card) {
      el.scrollTo({
        left: card.offsetLeft - el.offsetLeft,
        behavior: "smooth",
      });
    }
    setActiveIndex(index);
  };

  const handlePrev = () => scrollToIndex(Math.max(activeIndex - 1, 0));
  const handleNext = () =>
    scrollToIndex(Math.min(activeIndex + 1, testimonials.length - 1));

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - el.scrollLeft - el.offsetLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="w-full">
      <style>{`
        .mentor-scroll::-webkit-scrollbar { display: none; }
        .mentor-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes mentorFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="relative flex items-center gap-3 sm:gap-4 lg:gap-6">
        {/* Prev arrow — outside the card, desktop/tablet */}
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          disabled={activeIndex === 0}
          className="hidden sm:flex flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.08)] items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] group transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5 text-[#1E293B] dark:text-white group-hover:text-white transition-colors" />
        </button>

        {/* Scroller */}
        {/* Scroller */}
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          style={{ scrollSnapType: "x mandatory" }}
          className="mentor-scroll flex items-start overflow-x-auto flex-1 min-w-0 gap-6"
        >
          {testimonials.map((t, i) => {
            const isExpanded = !!expandedCards[i];
            return (
              <div
                key={i}
                style={{ scrollSnapAlign: "start" }}
                className="w-full md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] min-w-0 flex-shrink-0"
              >
                <div
                  className="relative h-full bg-white dark:bg-gray-900 rounded-[22px] border border-[#ECECEC] dark:border-gray-800 shadow-[0_8px_24px_rgba(17,24,39,0.06)] p-5 flex flex-col transition-all duration-300 ease-out hover:shadow-[0_18px_38px_rgba(17,24,39,0.12)] hover:-translate-y-1.5"
                  style={{ animation: "mentorFadeIn 0.4s ease both" }}
                >
                  {/* Quote icon — top-left, solid orange */}
                  <Quote
                    className="w-9 h-9 text-[#F97316] mb-3 flex-shrink-0"
                    fill="currentColor"
                    strokeWidth={0}
                  />

                  {/* Testimonial text */}
                  <p
                    className="text-gray-600 dark:text-gray-300 text-[14px] sm:text-[15px] flex-1"
                    style={{
                      lineHeight: "170%",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: isExpanded ? "unset" : 6,
                      overflow: isExpanded ? "visible" : "hidden",
                    }}
                  >
                    {t.text}
                  </p>

                  {t.text && t.text.length > 160 && (
                    <button
                      type="button"
                      onClick={() => toggleExpanded(i)}
                      className="mt-2 text-[13px] font-bold text-[#F97316] hover:underline bg-transparent border-none p-0 cursor-pointer text-left w-fit"
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}

                  {/* LinkedIn + date row */}
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F1F1F1] dark:border-gray-800 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1 text-[#0A66C2] font-semibold">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5"
                        fill="currentColor"
                      >
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                      </svg>
                      LinkedIn
                    </span>
                    {t.date && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span>{t.date}</span>
                      </>
                    )}
                  </div>

                  {/* Bottom profile row */}
                  <div className="flex items-center gap-3 mt-4">
                    <MentorAvatar
                      name={t.name}
                      image={t.image}
                      size="w-12 h-12"
                      showBadge
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-[#1E293B] dark:text-white text-sm leading-snug truncate">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug truncate">
                        {t.role}
                      </p>
                      {t.experience && (
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-snug mt-0.5">
                          {t.experience}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next arrow — outside the card, desktop/tablet */}
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          disabled={activeIndex === testimonials.length - 1}
          className="hidden sm:flex flex-shrink-0 w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.08)] items-center justify-center hover:bg-[#F97316] hover:border-[#F97316] group transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5 text-[#1E293B] dark:text-white group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Arrows on mobile — sit below the card instead of overlapping it */}
      <div className="flex sm:hidden items-center justify-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          aria-label="Previous testimonial"
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 text-[#1E293B] dark:text-white" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next testimonial"
          disabled={activeIndex === testimonials.length - 1}
          className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center disabled:opacity-30"
        >
          <ChevronRight className="w-4 h-4 text-[#1E293B] dark:text-white" />
        </button>
      </div>

      {/* Dot pagination */}
      <div className="flex items-center justify-center gap-2 mt-5 sm:mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            style={{
              width: activeIndex === i ? "24px" : "8px",
              height: "8px",
              borderRadius: "9999px",
              background: activeIndex === i ? "#F97316" : "#CBD5E1",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 300ms ease, background 300ms ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function TopCompaniesCarousel({ logos }) {
  const [duration, setDuration] = useState(30);
  const [brokenSrcs, setBrokenSrcs] = useState(new Set());

  // Responsive speed: desktop 30-35s, tablet 25-30s, mobile 20-25s
  useEffect(() => {
    const calcDuration = () => {
      const w = window.innerWidth;
      if (w >= 1024) setDuration(32);
      else if (w >= 768) setDuration(27);
      else setDuration(22);
    };
    calcDuration();
    window.addEventListener("resize", calcDuration);
    return () => window.removeEventListener("resize", calcDuration);
  }, []);

  if (!logos || logos.length === 0) return null;

  // Always duplicate — required for a seamless CSS loop at translate(-50%)
  const infiniteLogos = [...logos, ...logos];

  return (
    <div className="relative max-w-[1400px] mx-auto">
      <style>{`
        @keyframes ilmora-marquee {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        .ilmora-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          animation: ilmora-marquee var(--marquee-duration, 30s) linear infinite;
          will-change: transform;
          transform: translate3d(0,0,0);
        }
        /* Pause on hover — desktop only, matches spec */
        @media (hover: hover) and (pointer: fine) {
          .ilmora-marquee-viewport:hover .ilmora-marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>

      <div
        className="ilmora-marquee-viewport bg-white dark:bg-[#111827] rounded-[18px] sm:rounded-[20px] lg:rounded-[22px] border border-gray-100 dark:border-white/[0.08] h-[88px] sm:h-[96px] lg:h-[104px] flex items-center overflow-hidden shadow-[0_15px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          "--marquee-duration": `${duration}s`,
        }}
      >
        <div className="ilmora-marquee-track h-full">
          {infiniteLogos
            .filter((logo) => logo?.name || logo?.src)
            .map((logo, i) => {
              const isBroken = logo.src && brokenSrcs.has(logo.src);
              const showImage = Boolean(logo.src) && !isBroken;
              const initials = (logo.name || "?")
                .trim()
                .split(/\s+/)
                .slice(0, 2)
                .map((w) => w[0])
                .join("")
                .toUpperCase();

              return (
                <div
                  key={`${logo.name}-${i}`}
                  className="flex items-center justify-center h-full flex-shrink-0 px-4 sm:px-6 transition-transform duration-300 hover:scale-105"
                  style={{ width: 160 }}
                  title={logo.desc || logo.name}
                >
                  {showImage ? (
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      className="max-h-[45px] sm:max-h-[48px] max-w-full object-contain"
                      onError={() =>
                        setBrokenSrcs((prev) => new Set(prev).add(logo.src))
                      }
                    />
                  ) : (
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1E293B] dark:bg-[#F97316] flex items-center justify-center text-white font-bold text-sm sm:text-base flex-shrink-0">
                      {initials}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}


 // ─────────────────────────────────────────────────────────────────────────────
// AiCompanionTeaser — preview card for the AI Companion product. Chips and
// dots switch between the four feature screenshots (auto-rotates every 3.5s,
// pauses on hover). Clicking the preview or CTA opens /ai-companion.
// ─────────────────────────────────────────────────────────────────────────────
function AiCompanionTeaser({ navigate }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [activeFeature, setActiveFeature] = useState(0);
  const [paused, setPaused] = useState(false);

  const features = [
    { icon: MessageSquare, label: "AI Chat", img: aiChatImg },
    { icon: Wand2, label: "Help Me Write", img: aiWriteImg },
    { icon: Mic, label: "Live Notes", img: aiNotesImg },
    { icon: Zap, label: "Workflows", img: aiWorkflowsImg },
  ];
  const activeImg = features[activeFeature].img;

  // Auto-rotate every 3.5s; pauses while the user hovers the preview
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveFeature((p) => (p + 1) % features.length);
    }, 3500);
    return () => clearInterval(t);
  }, [activeFeature, paused]);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 10 });
  };
  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  const goToAiCompanion = () => navigate("/ai-companion");

  return (
    <section
      id="ai-companion"
      className="relative pt-4 pb-8 sm:pt-6 sm:pb-10 px-6 scroll-mt-20 overflow-hidden bg-[#F6EDE6] dark:bg-black"
    >
      <style>{`
        @keyframes aicFloat { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes aicFade { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .aic-img-float { animation: aicFloat 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .aic-img-float { animation: none !important; }
        }
      `}</style>

      {/* ambient background glow — static, low-cost */}
      <div
        className="absolute -top-24 -left-24 w-[380px] h-[380px] rounded-full blur-2xl pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.35), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full blur-2xl pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto relative grid lg:grid-cols-2 items-center gap-10 lg:gap-12">
        {/* left: copy + chips + CTA */}
        <div className="text-center lg:text-left">
          

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1E293B] dark:text-white mb-4 leading-tight">
            Meet Your <br className="hidden lg:block" />
            <span className="text-[#F97316]">AI Companion</span>
          </h2>

                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
            Chat, write, transcribe meetings and automate workflows — one AI
            sidebar that follows you across every course and session.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
            {features.map((f, i) => (
              <button
                type="button"
                key={f.label}
                onClick={() => setActiveFeature(i)}
                aria-pressed={activeFeature === i}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                  activeFeature === i
                    ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-500/30"
                    : "bg-white dark:bg-transparent text-[#1E293B] dark:text-white border-[#1E293B]/10 hover:border-[#F97316]/40"
                }`}
                style={
                  activeFeature === i
                    ? undefined
                    : { boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }
                }
              >
                <f.icon
                  className={`w-3.5 h-3.5 ${
                    activeFeature === i ? "text-white" : "text-[#F97316]"
                  }`}
                />
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={goToAiCompanion}
            className="inline-flex items-center justify-center gap-2 bg-[#EA580C] text-white font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base whitespace-nowrap hover:bg-[#C2410C] transition-all hover:scale-105 shadow-lg"
          >
            Explore AI Companion <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* right: switching preview image + dots */}
        <div className="w-full">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              resetTilt();
              setPaused(false);
            }}
            onClick={goToAiCompanion}
            role="button"
            tabIndex={0}
            aria-label="Open AI Companion"
            onKeyDown={(e) => e.key === "Enter" && goToAiCompanion()}
            className="aic-img-float relative cursor-pointer select-none"
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
              <img
              key={activeFeature}
              src={activeImg.src || activeImg}
              alt={`AI Companion — ${features[activeFeature].label}`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{ animation: "aicFade 0.35s ease both" }}
            />
          </div>

          {/* Dot pagination */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {features.map((f, i) => (
              <button
                type="button"
                key={f.label}
                onClick={() => setActiveFeature(i)}
                aria-label={`Show ${f.label}`}
                style={{
                  width: activeFeature === i ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background: activeFeature === i ? "#F97316" : "rgba(30,41,59,0.25)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.35s ease, background 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
       
// ─────────────────────────────────────────────────────────────────────────────
// CalendarShowcase — "ILM ORA Calendry" tab content (ported from ilmorameet.jsx)
// ─────────────────────────────────────────────────────────────────────────────
const CAL_FEATURES = [
  {
    key: "video",
    Icon: Video,
    label: "Live sessions",
    badge: "Scheduling",
    heading: "Book a seat with the world’s best mentors",
    desc: "Giving you complete control over your calendar, ILM ORA makes it the easiest and most flexible way to find your next live class.",
    linkText: "Learn more",
    duration: 7200,
  },
  {
    key: "spark",
    Icon: Sparkles,
    label: "AI-matched mentors",
    badge: "AI matching",
    heading: "Get matched to the right mentor, instantly",
    desc: "Texora AI reads your goal and current level, then recommends the class and mentor most likely to move you forward this week.",
    linkText: "See how matching works",
    duration: 3200,
  },
  {
    key: "shield",
    Icon: Shield,
    label: "Verified credentials",
    badge: "Credentials",
    heading: "A certificate employers can actually check",
    desc: "Every certificate carries a verifiable link, so anyone you share it with can confirm it in seconds.",
    linkText: "View a sample certificate",
    duration: 3200,
  },
  {
    key: "chat",
    Icon: MessageSquare,
    label: "Live chat support",
    badge: "Support",
    heading: "Help is one message away",
    desc: "Stuck mid-assignment or unsure which track fits? Message a mentor or our support team and get a real answer, fast.",
    linkText: "Message support",
    duration: 3200,
  },
];

const CAL_DATE = 24;
const CAL_SLOT = "2:00 PM";
// October 2026 starts on a Thursday → 4 blank cells before day 1
const CAL_BLANKS = 4;
const CAL_TODAY = 3;

function CalAvatar({ initials, from, to, size = "w-10 h-10" }) {
  return (
    <span
      className={`${size} rounded-full flex-shrink-0 flex items-center justify-center text-[12px] font-bold text-[#1E293B]`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {initials}
    </span>
  );
}

function CalendarShowcase({ onLearnMore }) {
  const [reduce, setReduce] = useState(false);
  const [active, setActive] = useState(0);
  const [pickedDate, setPickedDate] = useState(null);
  const [pickedSlot, setPickedSlot] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const [cursor, setCursor] = useState({ x: 24, y: 24, show: false });

  const visualRef = useRef(null);
  const dateElRef = useRef(null);
  const slotElRef = useRef(null);
  const confirmElRef = useRef(null);

  const current = CAL_FEATURES[active];
  const isVideoActive = active === 0;

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Auto-advance through the 4 panels (each has its own dwell time)
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => {
      setActive((i) => (i + 1) % CAL_FEATURES.length);
    }, CAL_FEATURES[active].duration);
    return () => clearTimeout(t);
  }, [reduce, active]);

  // Fake-cursor demo — only while the calendar panel is on screen
  useEffect(() => {
    if (reduce) {
      setPickedDate(CAL_DATE);
      setPickedSlot(CAL_SLOT);
      return;
    }
    if (!isVideoActive) {
      setPickedDate(null);
      setPickedSlot(null);
      setConfirming(false);
      setCursor((c) => ({ ...c, show: false }));
      return;
    }

    let cancelled = false;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    const moveCursorTo = (el) => {
      if (!el || !visualRef.current) return;
      const target = el.getBoundingClientRect();
      const box = visualRef.current.getBoundingClientRect();
      setCursor({
        x: target.left - box.left + target.width / 2,
        y: target.top - box.top + target.height / 2,
        show: true,
      });
    };

    async function run() {
      setPickedDate(null);
      setPickedSlot(null);
      setConfirming(false);
      setCursor({ x: 24, y: 24, show: false });
      await wait(500);
      if (cancelled) return;

      moveCursorTo(dateElRef.current);
      await wait(650);
      if (cancelled) return;
      setPickedDate(CAL_DATE);
      await wait(550);
      if (cancelled) return;

      moveCursorTo(slotElRef.current);
      await wait(650);
      if (cancelled) return;
      setPickedSlot(CAL_SLOT);
      await wait(550);
      if (cancelled) return;

      moveCursorTo(confirmElRef.current);
      await wait(650);
      if (cancelled) return;
      setConfirming(true);
      await wait(900);
      if (cancelled) return;

      setCursor((c) => ({ ...c, show: false }));
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [isVideoActive, reduce]);

  return (
        <div className="max-w-5xl mx-auto relative pt-6">
      <style>{`
        @keyframes calFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes calIn { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes calClick { 0% { transform: scale(1); } 35% { transform: scale(.72); } 100% { transform: scale(1); } }
        .cal-float { animation: calFloat 3.2s ease-in-out infinite; }
        .cal-in { animation: calIn .5s cubic-bezier(.22,1,.36,1) both; }
        .cal-cursor { position:absolute; left:0; top:0; pointer-events:none; opacity:0; z-index:5;
          transition: transform .65s cubic-bezier(.22,1,.36,1), opacity .3s ease;
          filter: drop-shadow(0 3px 6px rgba(0,0,0,.35)); }
        .cal-cursor.show { opacity:1; }
        .cal-cursor.click svg { animation: calClick .5s ease; }
        @media (prefers-reduced-motion: reduce) { .cal-float, .cal-in { animation: none !important; } }
      `}</style>

      <div
        className="relative rounded-[22px] px-3 sm:px-6 pt-8 pb-4 sm:pb-5"
        style={{
          background:
            "linear-gradient(150deg,#1E293B 0%,#334155 55%,#9A3412 100%)",
          boxShadow: "0 40px 80px -30px rgba(208,106,26,.45)",
        }}
      >
        {/* Floating icons */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex gap-2 sm:gap-3.5 z-10"
          role="tablist"
          aria-label="ILM ORA calendar features"
        >
          {CAL_FEATURES.map(({ Icon, label }, i) => {
            const isActive = active === i;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={isActive}
                title={label}
                onClick={() => setActive(i)}
                style={{ animationDelay: `${i * 0.35}s` }}
                className={`group relative rounded-full flex items-center justify-center border-none cursor-pointer shadow-lg transition-all duration-200 ${
                  reduce ? "" : "cal-float"
                } ${
                  isActive
                    ? "w-9 h-9 sm:w-11 sm:h-11 bg-[#1a1a2e] text-white ring-2 ring-white/55"
                    : "w-8 h-8 sm:w-10 sm:h-10 bg-white text-gray-500 hover:text-[#1E293B]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span
                  className={`absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap bg-[#1a1a2e] text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg pointer-events-none transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>

          <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mt-5">
          {/* left: glass info panel */}
          <div
            key={`info-${current.key}`}
                        className="cal-in flex flex-col justify-center rounded-[18px] p-4 sm:p-5 text-white bg-white/15 backdrop-blur-md border border-white/35"
          >
            <span className="inline-flex self-start bg-white/25 text-[12px] font-semibold px-3 py-1 rounded-full mb-4">
              {current.badge}
            </span>
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight mb-2 text-white">
              {current.heading}
            </h3>
                        <p className="text-xs sm:text-sm text-white/85 mb-3 max-w-md">
              {current.desc}
            </p>
            <button
              type="button"
              onClick={onLearnMore}
              className="inline-flex items-center gap-1.5 w-fit font-semibold text-white bg-transparent border-0 border-b-2 border-white/60 hover:border-white pb-0.5 cursor-pointer transition-colors"
            >
              {current.linkText} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* right: visual */}
          <div
            ref={visualRef}
            key={`visual-${current.key}`}
            className="cal-in relative"
            aria-hidden="true"
          >
            {current.key === "video" && (
                            <div className="bg-white rounded-[18px] p-3 shadow-2xl text-[#1E293B] text-sm">
                <div className="flex items-center justify-between font-semibold mb-2">
                  <span>October 2026</span>
                  <span className="flex gap-1.5">
                    <i className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </i>
                    <i className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </i>
                  </span>
                </div>
                <div className="grid grid-cols-7 text-center text-[11px] text-gray-500 mb-1.5">
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
                                <div className="grid grid-cols-7 gap-0.5 mb-2">
                  {Array.from({ length: CAL_BLANKS }).map((_, i) => (
                    <span key={`b${i}`} />
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                    const isToday = d === CAL_TODAY;
                    const isPicked = d === pickedDate;
                    return (
                      <span
                        key={d}
                        ref={d === CAL_DATE ? dateElRef : null}
                        className={`h-6 flex items-center justify-center rounded-md text-[11px] transition-colors duration-200 ${
                          isPicked
                            ? "bg-[#F97316] text-white font-semibold"
                            : isToday
                              ? "border-[1.5px] border-[#F97316] font-semibold"
                              : ""
                        }`}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>
                  <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {["10:00 AM", CAL_SLOT, "4:30 PM"].map((s) => (
                    <span
                      key={s}
                      ref={s === CAL_SLOT ? slotElRef : null}
                                            className={`rounded-lg px-2 py-1 text-[11px] text-center font-medium border-[1.5px] transition-colors duration-200 ${
                        s === pickedSlot
                          ? "border-[#F97316] bg-orange-50 text-[#d06a1a]"
                          : "border-gray-200"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div
                  ref={confirmElRef}
                                    className={`text-center text-white text-xs font-semibold py-2 rounded-lg transition-all duration-200 ${
                    confirming ? "bg-[#0E7A5F] scale-[.97]" : "bg-[#1a1a2e]"
                  }`}
                >
                  {confirming ? "Seat confirmed" : "Confirm seat"}
                </div>
              </div>
            )}

            {current.key === "spark" && (
              <div className="bg-white rounded-[18px] p-4 shadow-2xl text-[#1E293B] flex flex-col gap-3 h-full justify-center">
                <span className="inline-flex self-start bg-orange-50 text-[#d06a1a] text-[12px] font-semibold px-2.5 py-1 rounded-full">
                  Texora AI match
                </span>
                <div className="flex items-center gap-3 border-[1.5px] border-gray-200 rounded-xl px-3.5 py-3">
                  <CalAvatar initials="MR" from="#FFE8A3" to="#FFC7B8" />
                  <div>
                    <b className="block text-[15px] leading-snug">Meera Rao</b>
                    <small className="text-gray-500 text-[12px]">
                      Product mentor · 98% fit for your goal
                    </small>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-[1.5px] border-gray-200 rounded-xl px-3.5 py-3">
                  <CalAvatar initials="AS" from="#9BE7D6" to="#CFE0FF" />
                  <div>
                    <b className="block text-[15px] leading-snug">
                      Writing Specs Engineers Read
                    </b>
                    <small className="text-gray-500 text-[12px]">
                      Recommended next class, Sunday 11:00
                    </small>
                  </div>
                </div>
                <div className="text-center text-white font-semibold py-3 rounded-xl bg-[#F97316]">
                  View match
                </div>
              </div>
            )}

            {current.key === "shield" && (
              <div className="bg-white rounded-[22px] p-6 shadow-2xl text-[#1E293B] flex flex-col items-center justify-center text-center gap-2 h-full">
                <small className="text-gray-500">Certificate of completion</small>
                <h4 className="text-xl font-bold">Product Management</h4>
                <div className="font-semibold text-base">Ananya Sharma</div>
                <small className="text-gray-500">
                  completed all sessions and assignments
                </small>
                <span className="inline-flex items-center gap-2 mt-2 bg-white rounded-2xl px-3.5 py-2 shadow-md text-[13px] font-semibold text-[#0E7A5F]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Verified credential
                </span>
              </div>
            )}

            {current.key === "chat" && (
              <div className="bg-white rounded-[22px] p-6 shadow-2xl text-[#1E293B] flex flex-col gap-3 h-full justify-center">
                <div className="flex items-end gap-2">
                  <CalAvatar initials="RK" from="#C3B3FF" to="#CFE0FF" size="w-7 h-7" />
                  <span className="bg-[#EEF3FF] rounded-[14px_14px_14px_4px] px-3 py-2 text-[13px] leading-snug max-w-[82%]">
                    Which metric should I pick for onboarding?
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <CalAvatar initials="MR" from="#FFE8A3" to="#FFC7B8" size="w-7 h-7" />
                  <span className="bg-[#E6F8F3] rounded-[14px_14px_14px_4px] px-3 py-2 text-[13px] leading-snug max-w-[82%]">
                    Start with activation rate in week one.
                  </span>
                </div>
                <div className="text-center text-white font-semibold py-3 rounded-xl bg-[#F97316]">
                  Ask a mentor
                </div>
              </div>
            )}

            {!reduce && isVideoActive && (
              <div
                className={`cal-cursor${cursor.show ? " show" : ""}${confirming ? " click" : ""}`}
                style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path
                    d="M2 1.5 19 9.2l-6.9 1.6L9 19 2 1.5Z"
                    fill="#1a1a2e"
                    stroke="#fff"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceTeaser({
  navigate,
  to = "/workspace",
  calendarTo = "/calendar", // apna real Calendar route yahan daalo
}) {
  const goToWorkspace = () => navigate(to);
  const [activeFeature, setActiveFeature] = useState(0);

  const workspaceFeatures = [
    { icon: CalendarClock, label: "Start & Join", img: workspaceStartJoinImg },
    { icon: Video, label: "Workshop", img: workspacePreviewImg },
    { icon: Shield, label: "Host Controls", img: workspaceHostImg },
    { icon: BarChart3, label: "Dashboard", img: workspaceDashboardImg },
    { icon: FileText, label: "Recordings & Notes", img: workspaceRecordingsImg },
  ];
  const activeImg = workspaceFeatures[activeFeature].img;

  // Top tab bar (image 1 jaisa). "workspace" yahan active tab hai.
  const [activeTopTab, setActiveTopTab] = useState("workspace");
  const topTabs = [
    { key: "workspace", label: "ILM ORA Workspace", icon: Users, onClick: () => setActiveTopTab("workspace") },
    { key: "calendar", label: "ILM ORA Calendry", icon: CalendarClock, onClick: () => setActiveTopTab("calendar") },
  ];

  // Auto-rotate every 3.5s; resets whenever user clicks a chip
  useEffect(() => {
    const t = setInterval(() => {
      setActiveFeature((p) => (p + 1) % workspaceFeatures.length);
    }, 3500);
    return () => clearInterval(t);
  }, [activeFeature]);

  return (
    <section
      id="workspace-teaser"
      className="relative pt-0 pb-6 sm:pb-8 px-6 scroll-mt-20 overflow-hidden bg-[#1E293B] dark:bg-gray-900"
    >
      <div
        className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full blur-2xl pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.35), transparent 70%)",
        }}
      />

      {/* ── Top tab bar ── */}
      <div className="max-w-6xl mx-auto relative">
                <div className="flex items-center justify-center md:justify-start gap-6 sm:gap-10 border-b border-white/10 mb-5 sm:mb-6">
          {topTabs.map((tab) => {
            const isActive = activeTopTab === tab.key;
            return (
              <button
                type="button"
                key={tab.key}
                onClick={tab.onClick}
                aria-current={isActive ? "page" : undefined}
                className={`relative inline-flex items-center gap-2 px-2 sm:px-4 md:first:pl-0 py-3 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors duration-300 cursor-pointer bg-transparent border-none ${
                  isActive ? "text-[#F97316]" : "text-white hover:text-[#F97316]"
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                {tab.label}
                <span
                  className={`absolute left-0 right-0 -bottom-px h-[2px] rounded-full bg-[#F97316] transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                            </button>
            );
          })}
        </div>
      </div>

      {activeTopTab === "calendar" && (
        <CalendarShowcase onLearnMore={() => navigate(calendarTo)} />
      )}

      <div
        className={`max-w-6xl mx-auto relative items-center gap-10 lg:gap-12 ${
          activeTopTab === "calendar" ? "hidden" : "grid lg:grid-cols-2"
        }`}
      >
        {/* left: copy + chips + CTA */}
        <div className="text-center lg:text-left">
          

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
            Your Complete <br className="hidden lg:block" />
            <span className="text-[#F97316]">Meeting Workspace</span>
          </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
            Schedule, host and review live sessions — everything before, during
            and after the meeting, together in one place.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
            {workspaceFeatures.map((f, i) => (
              <button
                type="button"
                key={f.label}
                onClick={() => setActiveFeature(i)}
                aria-pressed={activeFeature === i}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white border transition-all duration-300 cursor-pointer ${
                  activeFeature === i
                    ? "bg-[#F97316] border-[#F97316] shadow-lg shadow-orange-500/30"
                    : "bg-white/10 border-white/15 hover:bg-white/20"
                }`}
              >
                <f.icon
                  className={`w-3.5 h-3.5 ${
                    activeFeature === i ? "text-white" : "text-[#F97316]"
                  }`}
                />
                {f.label}
              </button>
            ))}
          </div>

          <button
            onClick={goToWorkspace}
            className="inline-flex items-center justify-center gap-2 bg-[#EA580C] text-white font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base whitespace-nowrap hover:bg-[#C2410C] transition-all hover:scale-105 shadow-lg"
          >
            Explore Workspace <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* right: meeting-window preview image + dots */}
        <div>
          <div
            onClick={goToWorkspace}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && goToWorkspace()}
            aria-label="Open ILM ORA Meetings workspace"
            className="cursor-pointer select-none hover:-translate-y-1 transition-transform duration-300"
          >
            <style>{`@keyframes wsFade { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }`}</style>
            <img
              key={activeFeature}
              src={activeImg.src || activeImg}
              alt={`ILM ORA Meetings — ${workspaceFeatures[activeFeature].label}`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{ animation: "wsFade 0.35s ease both" }}
            />
          </div>

          {/* Dot pagination */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {workspaceFeatures.map((f, i) => (
              <button
                type="button"
                key={f.label}
                onClick={() => setActiveFeature(i)}
                aria-label={`Show ${f.label}`}
                style={{
                  width: activeFeature === i ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background:
                    activeFeature === i ? "#F97316" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.35s ease, background 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// ProductHubSection — "ILM ORA Platform" hub: left product list, middle copy +
// feature chips + CTA, right preview image with dots. Pure UI, no backend.
// ─────────────────────────────────────────────────────────────────────────────
function ProductHubSection({ navigate }) {
  const [activeProduct, setActiveProduct] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const [paused, setPaused] = useState(false);

  const products = [
    {
      key: "ai",
      label: "AI Companion",
      icon: MessageSquare,
      badge: "NEW · POWERED BY AI",
      line1: "Meet Your",
      line2: "AI Companion",
      desc: "Chat, write, summarize meetings and automate workflows — one AI assistant that helps you across every course and session.",
      cta: "Explore AI Companion",
      to: "/ai-companion",
      features: [
        { icon: MessageSquare, label: "AI Chat", img: aiChatImg },
        { icon: Wand2, label: "Help Me Write", img: aiWriteImg },
        { icon: Mic, label: "Live Notes", img: aiNotesImg },
        { icon: Zap, label: "Workflows", img: aiWorkflowsImg },
      ],
    },
    {
      key: "workspace",
      label: "ILM ORA Workspace",
      icon: Users,
      badge: "LIVE SESSIONS",
      line1: "Your Complete",
      line2: "Meeting Workspace",
      desc: "Schedule, host and review live sessions — everything before, during and after the meeting, together in one place.",
      cta: "Explore Workspace",
      to: "/workspace",
      features: [
        { icon: CalendarClock, label: "Start & Join", img: workspaceStartJoinImg },
        { icon: Video, label: "Workshop", img: workspacePreviewImg },
        { icon: Shield, label: "Host Controls", img: workspaceHostImg },
        { icon: BarChart3, label: "Dashboard", img: workspaceDashboardImg },
        { icon: FileText, label: "Recordings & Notes", img: workspaceRecordingsImg },
      ],
    },
    {
      key: "calendar",
      label: "ILM ORA Calendry",
      icon: CalendarClock,
      badge: "SMART SCHEDULING",
      line1: "Book Your Seat With",
      line2: "Top Mentors",
      desc: "Complete control over your calendar — find, book and manage your next live class in a few clicks.",
      cta: "Explore Calendar",
      to: "/ilm-ora-meet",
      // TODO: apne calendar ke screenshots yahan replace kar dena
      features: [
        { icon: CalendarClock, label: "Scheduling", img: workspaceStartJoinImg },
        { icon: FileText, label: "Recordings & Notes", img: workspaceRecordingsImg },
      ],
    },
  ];

  const product = products[activeProduct];
  const feature = product.features[activeFeature] || product.features[0];

  const selectProduct = (i) => {
    setActiveProduct(i);
    setActiveFeature(0);
  };

    // Auto-rotate: features pehle, last feature ke baad agla product.
  // Calendry tab me (jisme apna showcase hai) 12s baad wapas AI Companion.
  useEffect(() => {
    if (paused) return;
    const isCalendar = product.key === "calendar";
    const delay = isCalendar ? 12000 : 3500;
    const t = setTimeout(() => {
      if (isCalendar) {
        setActiveProduct(0);
        setActiveFeature(0);
        return;
      }
      if (activeFeature >= product.features.length - 1) {
        setActiveProduct((p) => (p + 1) % products.length);
        setActiveFeature(0);
      } else {
        setActiveFeature((p) => p + 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [activeProduct, activeFeature, paused]);
  return (
    <section
            id="product-hub"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative py-4 sm:py-6 px-4 sm:px-6 scroll-mt-20 overflow-hidden bg-[#FFF7F2] dark:bg-gray-950"
    >
      <style>{`@keyframes hubFade { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }`}</style>

            <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1E293B] dark:text-white">
          Explore the <span className="text-[#F97316]">ILM ORA Platform</span>
        </h2>
        <p className="mt-3 max-w-4xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Pick a product, preview its features and open it with one click.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)_minmax(0,1.35fr)] gap-6 lg:gap-8 items-center">
                {/* ── Left: product list ── */}
        <div className="min-w-0">
          
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {products.map((p, i) => {
              const isActive = activeProduct === i;
              return (
                <button
                  type="button"
                  key={p.key}
                  onClick={() => selectProduct(i)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-3 px-3 py-3 rounded-2xl text-left whitespace-nowrap flex-shrink-0 lg:w-full transition-all duration-300 cursor-pointer border-none ${
                    isActive
                      ? "bg-orange-100 dark:bg-orange-500/15 text-[#F97316]"
                      : "bg-transparent text-[#1E293B] dark:text-white hover:bg-orange-50 dark:hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isActive
                        ? "bg-[#F97316] text-white"
                        : "bg-gray-100 dark:bg-white/10 text-[#1E293B] dark:text-white"
                    }`}
                  >
                    <p.icon className="w-5 h-5" />
                  </span>
                  <span className="font-semibold text-sm sm:text-base flex-1">
                    {p.label}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-60 hidden lg:block" />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Middle: copy + chips + CTA ── */}
          <div key={product.key} className={`min-w-0 text-center lg:text-left ${product.key === "calendar" ? "hidden" : ""}`} style={{ animation: "hubFade 0.35s ease both" }}>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1E293B] dark:text-white leading-tight mb-3">
            {product.line1} <br className="hidden lg:block" />
            <span className="text-[#F97316]">{product.line2}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed">
            {product.desc}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
            {product.features.map((f, i) => (
              <button
                type="button"
                key={f.label}
                onClick={() => setActiveFeature(i)}
                aria-pressed={activeFeature === i}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                  activeFeature === i
                    ? "bg-[#F97316] text-white border-[#F97316] shadow-lg shadow-orange-500/30"
                    : "bg-white dark:bg-white/10 text-[#1E293B] dark:text-white border-gray-100 dark:border-white/15 hover:border-[#F97316]/40"
                }`}
              >
                <f.icon className={`w-4 h-4 ${activeFeature === i ? "text-white" : ""}`} />
                {f.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate(product.to)}
            className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base whitespace-nowrap hover:bg-[#EA580C] transition-all hover:scale-105 shadow-lg shadow-orange-500/30"
          >
            {product.cta} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

                {/* ── Calendar showcase (sirf Calendry tab me) ── */}
        {product.key === "calendar" && (
          <div className="lg:col-span-2 min-w-0">
            <CalendarShowcase onLearnMore={() => navigate(product.to)} />
          </div>
        )}

        {/* ── Right: preview + dots ── */}
          <div className={`min-w-0 ${product.key === "calendar" ? "hidden" : ""}`}>
          <div
            onClick={() => navigate(product.to)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${product.label}`}
            onKeyDown={(e) => e.key === "Enter" && navigate(product.to)}
            className="cursor-pointer select-none hover:-translate-y-1 transition-transform duration-300"
          >
            <img
              key={`${product.key}-${activeFeature}`}
              src={feature.img.src || feature.img}
              alt={`${product.label} — ${feature.label}`}
              loading="lazy"
              decoding="async"
              className="w-full h-auto max-w-[520px] mx-auto rounded-2xl shadow-2xl"
              style={{ animation: "hubFade 0.35s ease both" }}
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-5">
            {product.features.map((f, i) => (
              <button
                type="button"
                key={f.label}
                onClick={() => setActiveFeature(i)}
                aria-label={`Show ${f.label}`}
                style={{
                  width: activeFeature === i ? "28px" : "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  background: activeFeature === i ? "#F97316" : "rgba(100,116,139,0.35)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.35s ease, background 0.35s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CertificationShowcase — AWS / Microsoft / Cloud / Google certification cards
// 3D tilt + glare + floating medal. Pure UI. Routes niche CERT_ITEMS me change karo.
// ─────────────────────────────────────────────────────────────────────────────
const CERT_ITEMS = [
  {
    key: "aws",
    title: "AWS Certification",
    sub: "Cloud Practitioner to Professional",
    desc: "Prepare for AWS exams with live labs, mock tests and mentor-led doubt sessions.",
    Icon: Award,
    from: "#FB923C",
    to: "#EA580C",
    tags: ["Practitioner", "Associate", "Professional"],
    path: "/ilmora-aws-certification",
  },
  {
    key: "microsoft",
    title: "Microsoft Certification",
    sub: "Azure, M365 & Power Platform",
    desc: "Get job-ready on Azure, Microsoft 365 and Power Platform with hands-on projects.",
    Icon: Layers,
    from: "#60A5FA",
    to: "#2563EB",
    tags: ["Azure", "M365", "Power Platform"],
    path: "/ilmora-microsoft-certification",
  },
  {
    key: "cloud",
    title: "Cloud Certification",
    sub: "Multi-cloud & vendor-neutral paths",
    desc: "Learn cloud fundamentals that work across every provider, not just one.",
    Icon: Cloud,
    from: "#38BDF8",
    to: "#6366F1",
    tags: ["Multi-cloud", "DevOps", "Security"],
        path: "/certification/cloud",
    comingSoon: true,
  },
  {
    key: "google",
    title: "Google Certification",
    sub: "Google Cloud & Workspace exams",
    desc: "Crack Google Cloud and Workspace exams with structured paths and practice papers.",
    Icon: Globe,
    from: "#4ADE80",
        to: "#16A34A",
    tags: ["Cloud Digital Leader", "Associate", "Professional"],
    path: "/certification/google",
  },
];

const CERT_BACK = {
  aws: "Every topic ends with a hands-on project on real AWS services.",
  microsoft: "Practice on live Azure and Microsoft 365 labs, not just slides.",
  cloud: "Learn concepts that carry across AWS, Azure and Google Cloud.",
  google: "Timed practice papers that match the real exam length and style.",
};

function CertCard({ item, index, navigate }) {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);
  const cardRef = useRef(null);

  // Touch devices (no hover): flip once when the card scrolls into view
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: none)").matches) return;
    const el = cardRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let t1, t2;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        t1 = setTimeout(() => setFlipped(true), 500 + index * 300);
        t2 = setTimeout(() => setFlipped(false), 2600 + index * 300);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [index]);
    const go = (e) => {
    e.stopPropagation();
    if (item.comingSoon) return;
    navigate(item.path);
  };

  return (
    <div
      className="cert-rise"
      style={{
        animationDelay: `${index * 0.12}s`,
        "--c": item.from,
        "--c2": item.to,
      }}
    >
            <div
        ref={cardRef}
        className={`cert-flip ${flipped ? "is-flipped" : ""}`}
        onClick={toggle}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
        tabIndex={0}
        aria-label={`${item.title} — hover or tap to flip`}
      >
        <div className="cert-flip-inner">
          {/* ── Front ── */}
          <div className="cert-card cert-face group p-6 flex flex-col select-none">
            <div className="relative w-16 h-16 mb-5 flex-shrink-0">
              <div
                className="absolute inset-0 rounded-2xl rotate-6 opacity-50 blur-md"
                style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }}
              />
              <div
                className="relative w-full h-full rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${item.from}, ${item.to})`,
                  boxShadow:
                    "0 14px 24px -10px rgba(0,0,0,0.45), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <item.Icon className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.8} />
              </div>
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-[#1E293B] dark:text-white mb-1">
              {item.title}
            </h3>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: item.from }}
            >
              {item.sub}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {item.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {item.tags.map((t) => (
                <span key={t} className="cert-tag">
                  {t}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={go}
                            className="cert-btn mt-auto self-start border-0 cursor-pointer"
              style={item.comingSoon ? { opacity: 0.7, cursor: "not-allowed" } : undefined}
            >
              {item.comingSoon ? "Coming Soon" : "Explore"}
              {!item.comingSoon && (
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              )}
            </button>
          </div>

          {/* ── Back ── */}
          <div className="cert-face cert-back select-none">
            <h3 className="text-xl font-semibold tracking-tight mb-3">
              {item.title}
            </h3>
            <p className="text-base leading-relaxed mb-6 text-white/95">
              {CERT_BACK[item.key] || item.desc}
            </p>
            <button
              type="button"
              onClick={go}
                            className="cert-btn self-start border-0 cursor-pointer"
              style={{ background: "#fff", color: item.to, ...(item.comingSoon ? { opacity: 0.8, cursor: "not-allowed" } : {}) }}
            >
              {item.comingSoon ? "Coming Soon" : "Explore"}
              {!item.comingSoon && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Category name → sidebar icon (presentational only)
const getCategoryIcon = (name = "") => {
  const n = name.toLowerCase();
  if (/full\s?stack|web/.test(n)) return Layers;
  if (/data|analytic/.test(n)) return BarChart3;
  if (/\bai\b|machine|\bml\b/.test(n)) return Bot;
  if (/cloud/.test(n)) return Cloud;
  if (/mobile|android|ios/.test(n)) return Smartphone;
  if (/devops|tool/.test(n)) return Settings;
  if (/security|cyber/.test(n)) return Shield;
  if (/design|ux|ui/.test(n)) return PenTool;
  if (/program|code|develop/.test(n)) return Code2;
  return BookOpen;
};
function CertificationShowcase({ navigate }) {
  return (
    <section
      id="certifications"
          className="relative py-10 sm:py-14 px-4 sm:px-6 scroll-mt-20 overflow-hidden bg-white dark:bg-black"
    >
            <style>{`
        @keyframes certRise { from { opacity: 0; transform: translateY(30px) scale(.97); } to { opacity: 1; transform: none; } }
        @keyframes certFloat { 0%,100% { transform: translateZ(50px) translateY(0); } 50% { transform: translateZ(50px) translateY(-8px); } }
        @keyframes certOrb { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-24px); } }
        .cert-rise { animation: certRise .7s cubic-bezier(.22,1,.36,1) both; }
        .cert-float { animation: certFloat 4s ease-in-out infinite; }

        .cert-flip { perspective: 1200px; -webkit-perspective: 1200px; height: 100%; cursor: pointer; outline: none; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
        .cert-flip-inner {
          position: relative;
          height: 100%;
          min-height: 410px;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          will-change: transform;
          transition: transform .7s cubic-bezier(.22,1,.36,1);
        }
        .cert-flip.is-flipped .cert-flip-inner { transform: rotateX(180deg); }
        @media (hover: hover) and (pointer: fine) {
          .cert-flip:hover .cert-flip-inner { transform: rotateX(180deg); }
        }
        .cert-face {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .cert-back {
          transform: rotateX(180deg);
          background: linear-gradient(135deg, var(--c), var(--c2));
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 28px;
          box-shadow: 0 24px 44px -14px color-mix(in srgb, var(--c) 55%, transparent);
        }

        .cert-card {
          background: #F6EDE6;
          border: 1px solid color-mix(in srgb, var(--c) 45%, #E5E7EB);
          box-shadow: 0 10px 15px -3px rgba(0,0,0,.10), 0 4px 6px -4px rgba(0,0,0,.10);
          transition: transform .18s ease-out, box-shadow .3s ease, border-color .3s ease;
        }
        .cert-card::before {
          content: "";
          position: absolute;
          left: 0; top: 22px; bottom: 22px;
          width: 4px;
          border-radius: 0 4px 4px 0;
          background: var(--c);
        }
        .cert-card:hover {
          box-shadow: 0 24px 44px -14px color-mix(in srgb, var(--c) 45%, transparent), 0 8px 14px -6px rgba(0,0,0,.12);
          border-color: var(--c);
        }
        .dark .cert-card {
          background: #111827;
          border-color: color-mix(in srgb, var(--c) 45%, #1F2937);
          box-shadow: 0 10px 24px -6px rgba(0,0,0,.65), 0 4px 6px -4px rgba(0,0,0,.5);
        }
        .dark .cert-card:hover {
          box-shadow: 0 24px 44px -14px color-mix(in srgb, var(--c) 55%, transparent), 0 8px 14px -6px rgba(0,0,0,.6);
        }

        .cert-tag {
          font-size: 11px;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 8px;
          color: #334155;
          background: color-mix(in srgb, var(--c) 14%, #ffffff);
          border: 1px solid color-mix(in srgb, var(--c) 28%, #ffffff);
        }
        .dark .cert-tag {
          color: #CBD5E1;
          background: color-mix(in srgb, var(--c) 16%, #111827);
          border-color: color-mix(in srgb, var(--c) 30%, #111827);
        }

        .cert-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 10px;
          background: var(--c);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          transition: transform .2s, filter .2s;
        }
        .cert-card:hover .cert-btn { transform: translateY(-2px); filter: brightness(1.08); }

        .cert-grid { opacity: .04; background-image: linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px); }
        .dark .cert-grid { opacity: .07; background-image: linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px); }

                @media (prefers-reduced-motion: reduce) {
          .cert-float { animation: none !important; }
        }
      `}</style>

      {/* ambient glow orbs + subtle grid */}
      <div
        className="absolute -top-24 -left-24 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.4), transparent 70%)",
          animation: "certOrb 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)",
          animation: "certOrb 11s ease-in-out infinite reverse",
        }}
      />
      

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-10">
           
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1E293B] dark:text-white mt-3">
            Get Certified. Get <span className="text-[#F97316]">Hired.</span>
          </h2>
                        <p className="mt-3 max-w-4xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Pick a certification path, learn with mentors and earn credentials employers recognise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {CERT_ITEMS.map((item, i) => (
            <CertCard key={item.key} item={item} index={i} navigate={navigate} />
          ))}
        </div>
      </div>
    </section>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
export default function LMSHomepage({ theme, toggleTheme }) {
  const [activeTab, setActiveTab] = useState("product");
  const [featuredPrograms, setFeaturedPrograms] = useState({});
  const [programsLoading, setProgramsLoading] = useState(true);
  const [wishlist, setWishlist] = useState(new Set());
  // UI-only: which course-card descriptions are expanded via "Read More".
  // Presentational state only — no data-fetching or business logic.
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());

  // ── Mentors (testimonials) — now backend-connected ──
  const [testimonials, setTestimonials] = useState([]);

  // ── Top Global Companies — now backend-connected ──
  const [companyData, setCompanyData] = useState(null);
  const [companiesLoading, setCompaniesLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [modalEmail, setModalEmail] = useState("");
  const [modalPassword, setModalPassword] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [showModalPw, setShowModalPw] = useState(false);

   const heroImages = [
    heroStudent,
    heroStudent2,
    heroStudent3,
    hero4,
    hero5,
    hero6,
    hero7,
    hero8,
  ];
    const heroImagePositions = [
    "center 10%",
    "center 10%",
    "center 10%",
    "center 10%",
    "center 10%",
    "center 10%",
    "center 10%",
    "center 10%",
  ];
// Index = currentSlide + 1  ->  0: video, 1: student, 2: high-five, 3: team, 4-8: hero-4 to hero-8
const heroTexts = [
  {
    line1: "Empower Your",
    line2: "Learning Journey",
    desc: "Master in-demand skills through AI-powered learning, live sessions, certifications, and expert-led programs designed for students, professionals, trainers, and organizations.",
  },
  {
    line1: "Your Skills Journey",
    line2: "Starts Here",
    desc: "Learn at your own pace with AI-powered courses, live classes, and certifications built for students ready to take the first step.",
  },
  {
    line1: "Celebrate Every",
    line2: "Career Win",
    desc: "From your first job to your next promotion, our programs and career support help you reach goals worth celebrating.",
  },
  {
    line1: "Learn Together",
    line2: "With Expert Mentors",
    desc: "Join small cohorts, get project reviews from industry mentors, and grow with a community that keeps you accountable.",
  },
  {
    line1: "Build Skills That",
    line2: "Get You Hired",
    desc: "Hands-on projects, live mentor feedback, and verified certificates that help you stand out and step confidently into your dream role.",
  },
  {
    line1: "Learn Anytime,",
    line2: "Anywhere",
    desc: "Access live classes, recorded sessions, and AI-powered study tools on any device, so learning fits around your schedule.",
  },
  {
    line1: "Grow With a",
    line2: "Community That Cares",
    desc: "Connect with peers, share ideas, and stay motivated together with a supportive network of learners and mentors.",
  },
  {
    line1: "Turn Knowledge Into",
    line2: "Real Results",
    desc: "Apply what you learn through real-world projects and assessments that prove your skills to top employers.",
  },
  {
    line1: "Your Future Career",
    line2: "Starts Today",
    desc: "Take the next step with expert-led programs, career support, and certifications designed to open new doors.",
  },
];
  const [currentSlide, setCurrentSlide] = useState(0);
  // Perf: don't fetch the hero video until the browser is idle, so it never
  // competes with the LCP image/text for bandwidth on first paint.
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    const idle =
    window.requestIdleCallback || ((cb) => setTimeout(cb, 0));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setVideoReady(true));
    return () => cancel(id);
  }, []);
  const carouselTimerRef = useRef(null);

  const navigate = useNavigate();

  const startCarouselTimer = () => {
    clearInterval(carouselTimerRef.current);
    carouselTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === -1) return 0;
        if (prev >= heroImages.length - 1) return -1;
        return prev + 1;
      });
    }, 3500);
  };

  useEffect(() => {
    startCarouselTimer();
    return () => clearInterval(carouselTimerRef.current);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startCarouselTimer();
  };

  /* ── Load real featured programs from the backend (courseService) ──
     Falls back to the static `courses` object below if the API call
     fails or returns no programs in any category. Includes the fuller
     backend field mapping: thumbnails, banners, instructor photos,
     LinkedIn, video URL, and only shows Published programs. */
  useEffect(() => {
    async function loadPrograms() {
      try {
        const { data } = await courseService.getFeaturedProgramsSummary();
        const grouped = {};

        data.forEach((p) => {
          const cat = (p.category || "Other").trim();

          if (!grouped[cat]) {
            grouped[cat] = [];
          }

          grouped[cat].push({
            id: p.id,
            title: p.title,
            instructor: p.instructorRole || p.instructorName,
            instructorFull: p.instructorName,
            instructorTitle: p.instructorRole || "",
            duration: `${p.durationWeeks} weeks`,
            students: p.studentsEnrolled,
            rating: p.rating,
            level: p.level,
            description: p.shortDescription,
            modules: [],
            price: `₹${Number(p.price).toLocaleString("en-IN")}`,
            thumbnailUrl: p.thumbnailUrl || "",
            bannerUrl: p.bannerUrl || "",
            instructorPhotoUrl: p.instructorPhotoUrl || "",
            instructorLinkedIn: p.instructorLinkedIn || "",
            videoUrl: p.videoUrl || "",
            highlights: [],
            learningOutcomes: [],
            totalLessons: p.lessons,
            projects: p.projects,
            syllabusWeeks: [],
            enrollmentUrl: p.enrollmentUrl || "",
            liveSessions: p.liveSessions ?? "—",
            // ── NEW: real badge flags from superadmin, plus discount pricing.
            // Falls back to undefined/false if the backend hasn't been
            // redeployed with the extended summary DTO yet, so this is safe
            // to ship ahead of the backend if needed. ──
            isFeatured: !!p.isFeatured,
            isTrending: !!p.isTrending,
            isBestseller: !!p.isBestseller,
            isPopular: !!p.isPopular,
            isRecommended: !!p.isRecommended,
            isComingSoon: !!p.isComingSoon,
            originalPrice: p.originalPrice
              ? `₹${Number(p.originalPrice).toLocaleString("en-IN")}`
              : "",
            discountPercent: p.discountPercent || 0,
          });
        });

        // Only use API data if we actually got programs
        const hasPrograms = Object.values(grouped).some(
          (arr) => arr.length > 0,
        );
        if (hasPrograms) {
          setFeaturedPrograms(grouped);

          const firstCategory = Object.keys(grouped)[0];

          if (firstCategory) {
            setActiveTab(firstCategory);
          }
        }
        // else featuredPrograms stays empty → fallback to hardcoded courses
      } catch (err) {
        console.error("Failed to load featured programs", err);
      } finally {
        setProgramsLoading(false);
      }
    }
    loadPrograms();
  }, []);

  /* ── Load real mentor feedback (testimonials) from the backend ── */
  useEffect(() => {
    async function loadMentorFeedback() {
      try {
        const { data } = await courseService.getActiveMentorFeedbacks();
        const mapped = data.map((m) => {
          console.log("Feedback:", m.feedbackMessage);

          return {
            name: m.candidateName,
            role: `${m.designation} @ ${m.company}`,
            text: m.feedbackMessage,
            image: m.profileImage || m.image || m.imageUrl || m.photo || null,
          };
        });
        setTestimonials(mapped);
      } catch (err) {
        console.error("Failed to load mentor feedback", err);
      }
    }
    loadMentorFeedback();
  }, []);

  /* ── Load real companies (tech / business partners + product ecosystem) ── */
  useEffect(() => {
    async function loadCompanies() {
      try {
        const { data } = await courseService.getActiveCompanies();
        setCompanyData(data);
      } catch (err) {
        console.error("Failed to load companies", err);
      } finally {
        setCompaniesLoading(false);
      }
    }
    loadCompanies();
  }, []);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowLoginModal(false);
    };
    if (showLoginModal) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showLoginModal]);

  useEffect(() => {
    const handler = (e) => {
      const { tab } = e.detail || {};
      if (tab) setActiveTab(tab);
    };
    window.addEventListener("mm-course-tab", handler);
    return () => window.removeEventListener("mm-course-tab", handler);
  }, []);

  const scrollToSection = (sectionId, tabName = null) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        if (tabName) setActiveTab(tabName);
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } else {
      if (tabName) setActiveTab(tabName);
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ── Role-based redirect ──────────────────────────────────────────────────
     Kept in sync with Login.jsx, AuthModals.jsx, and IlmOraDemoPage.jsx's
     LoginModal — every login entry point in the app must land the user on
     the same /ilm-demo page after signing in (SUPER_ADMIN is the only
     exception). This used to send existing users straight to their real
     dashboard route (/student, /trainer, /admin), which is why Google
     sign-in on the homepage felt inconsistent with email/password login. */
  const redirectByRole = (role) => {
    switch ((role || "").toUpperCase()) {
      case "SUPER_ADMIN":
        navigate("/superadmin", { replace: true });
        break;
      default:
        navigate("/ilm-demo", { replace: true });
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (modalLoading) return;
    setModalLoading(true);
    try {
      const ok = await auth.login({
        email: modalEmail,
        password: modalPassword,
      });
      if (ok) {
        const role = (auth.getCurrentRole() || "STUDENT").toUpperCase();
        localStorage.setItem("role", role);
        setShowLoginModal(false);
        redirectByRole(role);
      } else {
        alert("Login failed! Check your credentials.");
      }
    } catch (err) {
      alert("Login error: " + err.message);
    } finally {
      setModalLoading(false);
    }
  };

  /* ── Google Sign-In — full backend-aware flow ──────────────────────────────
     Existing users: backend issues a token + role (+ organizationId) and we
     redirect by role. Brand-new users: we hand off to /complete-profile so
     they can finish signing up. */
  const handleModalGoogle = async (res) => {
    try {
      localStorage.removeItem("lms_token");
      localStorage.removeItem("lms_user");
      localStorage.removeItem("role");

      const dec = jwtDecode(res.credential);

      const check = await authService.checkGoogleUser({
        idToken: res.credential,
      });

      // ── EXISTING USER ──────────────────────────────────────────
      if (check.isNewUser === false && check.token && check.role) {
        const role = check.role.toUpperCase();
        localStorage.setItem("lms_token", check.token);
        localStorage.setItem("role", role);

        if (check.organizationId) {
          localStorage.setItem("organizationId", check.organizationId);
        } else {
          localStorage.removeItem("organizationId");
        }

        localStorage.setItem(
          "lms_user",
          JSON.stringify({
            name: check.name || dec.name,
            email: check.email || dec.email,
            role: ["TENANT_ADMIN", "ADMIN", "BUSINESS"].includes(role)
              ? "admin"
              : role.toLowerCase(),
            isGoogleUser: true,
            profileCompleted: true,
            organizationId: check.organizationId || null,
          }),
        );
        setShowLoginModal(false);
        redirectByRole(role);
        return;
      }

      // ── BRAND NEW USER ─────────────────────────────────────────
      const googleInfo = {
        name: dec.name,
        email: dec.email,
        googleCredential: res.credential,
      };
      sessionStorage.setItem("ilmora_google_credential", res.credential);
      sessionStorage.setItem("ilmora_google_user", JSON.stringify(googleInfo));

      // Mark authenticated + new right away so IlmOraDemoPage's
      // mount-time check (`user?.isNewUser === true`) opens the Step 4
      // role-selection toast the instant the page loads — same
      // mechanism IlmOraDemoPage's own login modal already uses.
      localStorage.setItem(
        "lms_user",
        JSON.stringify({
          name: dec.name,
          email: dec.email,
          isGoogleUser: true,
          isNewUser: true,
          profileCompleted: false,
        }),
      );

      setShowLoginModal(false);
      navigate("/ilm-demo", { replace: true });
    } catch (err) {
      // Surface the real backend message — blocked user / inactive org / etc.
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Google login failed. Please try again.";
      alert(message);
    }
  };

  /* ── Hidden subscriber-admin trigger (callable from elsewhere if needed) ── */
  const openNewsletterAdmin = () => {
    document.getElementById("newsletter-admin-trigger")?.click();
  };

  const courses = {
    product: [
      {
        id: 1,
        title: "Product Management Mastery",
        instructor: "Ex-Google PM",
        duration: "8 weeks",
        students: "2,500+",
        rating: 4.9,
        level: "Intermediate",
        description:
          "Master product lifecycle from ideation to launch. Learn roadmapping, prioritization, stakeholder management & metrics that matter.",
        modules: [
          "Discovery & Research",
          "Roadmapping",
          "Prioritization Frameworks",
          "Launch Strategy",
          "Metrics & Analytics",
        ],
        price: "₹49,000",
        highlights: [
          "Live sessions with Google PMs",
          "Real case studies",
          "1:1 mentorship",
          "Job referral support",
        ],
        liveSessions: 5,
        totalLessons: 81,
        projects: 3,
      },
      {
        id: 2,
        title: "Product Analytics",
        instructor: "Ex-Amazon",
        duration: "6 weeks",
        students: "1,800+",
        rating: 4.8,
        level: "Advanced",
        description:
          "Data-driven product decisions. Master A/B testing, cohort analysis, funnel optimization & retention strategies.",
        modules: [
          "SQL for Product Managers",
          "Experimentation",
          "Funnel Analysis",
          "Retention Metrics",
          "Customer Segmentation",
        ],
        price: "₹39,000",
        highlights: [
          "Amazon case studies",
          "Live SQL projects",
          "Advanced Mixpanel",
          "Retention frameworks",
        ],
        liveSessions: 4,
        totalLessons: 60,
        projects: 2,
      },
      {
        id: 3,
        title: "Product Strategy",
        instructor: "Ex-Meta",
        duration: "10 weeks",
        students: "2,100+",
        rating: 4.9,
        level: "Advanced",
        description:
          "Strategic frameworks for product success. Positioning, competitive analysis, growth strategies & portfolio management.",
        modules: [
          "Market Analysis",
          "Competitive Strategy",
          "Growth Playbooks",
          "Portfolio Management",
          "Pricing Strategy",
        ],
        price: "₹59,000",
        highlights: [
          "Meta growth case studies",
          "Strategy templates",
          "Live workshops",
          "Executive simulations",
        ],
        liveSessions: 6,
        totalLessons: 90,
        projects: 4,
      },
    ],
    design: [
      {
        id: 4,
        title: "UI/UX Design Bootcamp",
        instructor: "Ex-Airbnb Designer",
        duration: "12 weeks",
        students: "3,200+",
        rating: 5.0,
        level: "Beginner",
        description:
          "Complete UI/UX journey from research to prototype. Figma mastery, design systems & portfolio projects.",
        modules: [
          "User Research",
          "Wireframing",
          "Prototyping",
          "Design Systems",
          "Portfolio Building",
        ],
        price: "₹69,000",
        highlights: [
          "Airbnb case studies",
          "Figma certification",
          "Live design reviews",
          "Job ready portfolio",
        ],
        liveSessions: 8,
        totalLessons: 110,
        projects: 5,
      },
      {
        id: 5,
        title: "Design Systems",
        instructor: "Ex-Netflix",
        duration: "8 weeks",
        students: "1,500+",
        rating: 4.8,
        level: "Advanced",
        description:
          "Build scalable design systems like Netflix. Components, tokens, documentation & developer handoff.",
        modules: [
          "Component Libraries",
          "Design Tokens",
          "Documentation",
          "Dev Handoff",
          "Scale Patterns",
        ],
        price: "₹45,000",
        highlights: [
          "Netflix system breakdown",
          "Figma + Storybook",
          "Live system audits",
          "Enterprise patterns",
        ],
        liveSessions: 4,
        totalLessons: 70,
        projects: 3,
      },
      {
        id: 6,
        title: "User Research Pro",
        instructor: "Ex-Microsoft",
        duration: "6 weeks",
        students: "1,900+",
        rating: 4.7,
        level: "Intermediate",
        description:
          "Research methods that drive product decisions. Interviews, surveys, usability testing & synthesis.",
        modules: [
          "Interview Techniques",
          "Survey Design",
          "Usability Testing",
          "Synthesis Methods",
          "Stakeholder Reports",
        ],
        price: "₹35,000",
        highlights: [
          "Microsoft research frameworks",
          "Live user testing",
          "Report templates",
          "Stakeholder presentations",
        ],
        liveSessions: 3,
        totalLessons: 55,
        projects: 2,
      },
    ],
    growth: [
      {
        id: 7,
        title: "Growth Marketing",
        instructor: "Ex-Uber Growth",
        duration: "8 weeks",
        students: "2,800+",
        rating: 4.9,
        level: "Intermediate",
        description:
          "Growth loops, viral mechanics & acquisition strategies that scale businesses.",
        modules: [
          "Growth Frameworks",
          "Viral Loops",
          "Acquisition Channels",
          "Experimentation",
          "Scaling",
        ],
        price: "₹49,000",
        highlights: [
          "Uber growth case studies",
          "Live experiments",
          "Channel deep dives",
          "Scaling frameworks",
        ],
        liveSessions: 5,
        totalLessons: 75,
        projects: 3,
      },
      {
        id: 8,
        title: "SEO & Content Strategy",
        instructor: "Ex-Spotify",
        duration: "10 weeks",
        students: "2,300+",
        rating: 4.8,
        level: "Intermediate",
        description:
          "Organic growth mastery. Technical SEO, content systems & link building at scale.",
        modules: [
          "Technical SEO",
          "Content Systems",
          "Link Building",
          "Analytics",
          "Scaling Organic",
        ],
        price: "₹55,000",
        highlights: [
          "Spotify SEO case studies",
          "Live audits",
          "Content calendars",
          "Enterprise SEO",
        ],
        liveSessions: 5,
        totalLessons: 85,
        projects: 3,
      },
      {
        id: 9,
        title: "Performance Marketing",
        instructor: "Ex-Swiggy",
        duration: "8 weeks",
        students: "2,600+",
        rating: 4.9,
        level: "Advanced",
        description:
          "Paid acquisition at scale. Facebook, Google, creative testing & LTV optimization.",
        modules: [
          "Facebook Ads",
          "Google Ads",
          "Creative Strategy",
          "LTV Optimization",
          "Scaling",
        ],
        price: "₹47,000",
        highlights: [
          "Swiggy ad case studies",
          "Live campaign builds",
          "Creative testing",
          "ROAS frameworks",
        ],
        liveSessions: 5,
        totalLessons: 72,
        projects: 4,
      },
    ],
  };

  const features = [
    {
      icon: Target,
      title: "Project-Based Learning",
      description: "Build real-world projects that showcase your skills",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Learn from professionals at top tech companies",
    },
    {
      icon: Trophy,
      title: "Career Support",
      description: "Get help with resumes, interviews & job referrals",
    },
    {
      icon: Zap,
      title: "Live Sessions",
      description: "Interactive workshops with industry experts",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Learners" },
    { value: "95%", label: "Success Rate" },
    { value: "100+", label: "Expert Mentors" },
    { value: "4.9★", label: "Average Rating" },
  ];

  const mentorBenefits = [
    { icon: Award, text: "1:1 mentorship and small cohort learning" },
    { icon: TrendingUp, text: "Project reviews with detailed feedback" },
    { icon: Users, text: "Peer community for accountability and networking" },
  ];

  const careerSupport = [
    {
      icon: Target,
      title: "Portfolio Support",
      description: "Turn your projects into case studies hiring managers love",
    },
    {
      icon: Award,
      title: "Interview Prep",
      description:
        "Mock interviews, feedback and guidance on role expectations",
    },
    {
      icon: Users,
      title: "Referrals & Network",
      description: "Warm intros to hiring teams and community-led referrals",
    },
  ];

  const getLevelColor = (level) =>
    ({
      Beginner:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      Intermediate: "bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20",
      Advanced:
        "bg-[#1E293B]/10 text-[#1E293B] dark:bg-white/10 dark:text-white border border-[#1E293B]/20 dark:border-white/20",
    })[level] || "bg-gray-100 text-gray-700";

  /* ── Presentational-only helpers for the redesigned course cards ──
     These do not touch any API/data-fetching logic — they simply
     derive display values (initials, strike-through price, discount
     badge) from the existing course fields. */
  const getInitials = (name = "") =>
    name
      .replace(/^Ex-/i, "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "IN";

  const getPricing = (price) => {
    const current = parseInt(String(price).replace(/[^\d]/g, ""), 10) || 0;
    const original = Math.round((current * 1.35) / 1000) * 1000;
    const discount =
      original > current
        ? Math.round(((original - current) / original) * 100)
        : 0;
    return {
      current: `₹${current.toLocaleString("en-IN")}`,
      original: `₹${original.toLocaleString("en-IN")}`,
      discount,
    };
  };

  // UI-only toggle for the "Read More" link on course-card descriptions.
  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleWishlist = async (id) => {
    // Not logged in → don't call the API, just prompt login
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // Optimistic UI update
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

    try {
      const { data } = await courseService.toggleWishlist(id);
      // Reconcile with server truth
      setWishlist((prev) => {
        const next = new Set(prev);
        if (data.wishlisted) next.add(id);
        else next.delete(id);
        return next;
      });
    } catch (err) {
      // Roll back the optimistic update on failure
      setWishlist((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
      if (err?.response?.status === 401) {
        setShowLoginModal(true);
      } else {
        console.error("Wishlist toggle failed", err);
      }
    }
  };

  // Adjust this to match whatever base URL the rest of courseService already
  // uses for uploaded files (check courseService.js for an existing constant
  // before hardcoding this — do not guess blindly in production).
  const API_BASE_URL =
    courseService.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

  const resolveImageUrl = (raw) => {
    if (!isNonEmptyString(raw)) return "";
    const trimmed = raw.trim();
    if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
      return trimmed; // already absolute
    }
    const base = API_BASE_URL.replace(/\/$/, "");
    return `${base}${trimmed.startsWith("/") ? "" : "/"}${trimmed}`; // relative → prepend base
  };

  const mapCompany = (c) => {
    const rawSrc =
      c.uploadedLogo ||
      c.logoUrl ||
      c.logo ||
      c.image ||
      c.imageUrl ||
      c.logoPath ||
      c.fileUrl ||
      c.thumbnail ||
      c.icon ||
      c.imageURL ||
      c.companyLogo ||
      c.logoImage ||
      c.picture ||
      c.photo ||
      c.mediaUrl ||
      c.assetUrl ||
      "";

    const name = c.name || c.companyName || c.title || "";
    const finalSrc = resolveImageUrl(rawSrc);

    console.log("DEBUG company logo mapping →", {
      name,
      logo: c.logo,
      logoUrl: c.logoUrl,
      finalImageSource: finalSrc,
    });

    return {
      src: finalSrc,
      name,
      desc: c.description || c.desc || c.about || "",
    };
  };

  const findCategory = (data, ...aliases) => {
    if (!data || typeof data !== "object") return [];
    const keys = Object.keys(data);
    const normalize = (s) => s.toLowerCase().replace(/[\s_-]/g, "");

    // Pass 1: exact match
    for (const alias of aliases) {
      const target = normalize(alias);
      const foundKey = keys.find((k) => normalize(k) === target);
      if (foundKey && Array.isArray(data[foundKey])) return data[foundKey];
    }

    // Pass 2: fuzzy — key contains the alias, or alias contains the key
    for (const alias of aliases) {
      const target = normalize(alias);
      const foundKey = keys.find((k) => {
        const nk = normalize(k);
        return (
          Array.isArray(data[k]) && (nk.includes(target) || target.includes(nk))
        );
      });
      if (foundKey) return data[foundKey];
    }

    return [];
  };

  const techPartnersRaw = findCategory(
    companyData,
    "Technology Partner",
    "Technology Partners",
    "Tech Partner",
    "Tech Partners",
    "technology",
    "techPartner",
    "techPartners",
  );
  const bizPartnersRaw = findCategory(
    companyData,
    "Business Partner",
    "Business Partners",
    "business",
    "businessPartner",
    "businessPartners",
    "Partner Business",
  );
  const ecosystemRaw = findCategory(
    companyData,
    "Texora Product Ecosystem",
    "Texora Products Ecosystem",
    "Product Ecosystem",
    "Texora Product",
    "Texora Products",
    "Ecosystem",
    "products",
    "texoraProducts",
  );

  const techPartners = techPartnersRaw
    .map(mapCompany)
    .filter((c) => c.src || c.name);
  const bizPartners = bizPartnersRaw
    .map(mapCompany)
    .filter((c) => c.src || c.name);

  const ECOSYSTEM_COLOR_CLASSES = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    orange: "bg-orange-50 text-[#F97316] border-orange-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    green: "bg-green-50 text-green-600 border-green-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  const ecosystemProducts = ecosystemRaw.length
    ? ecosystemRaw.map((c, i) => ({
        ...mapCompany(c),
                color: ECOSYSTEM_COLORS[i % ECOSYSTEM_COLORS.length],
      }))
    : null;

  // TEMP TEST: hydration error isolate karne ke liye
  const [pageMounted, setPageMounted] = useState(false);
  useEffect(() => {
    setPageMounted(true);
  }, []);
  if (!pageMounted) {
    return <div className="min-h-screen bg-[#F6EDE6] dark:bg-black" />;
  }

  return (
    <div className="min-h-screen bg-[#F6EDE6] dark:bg-black text-[#1E293B] dark:text-white">
      {/* ── Announcement Banner & Navbar ── */}
            <ClientOnly>
        <AnnouncementBanner />
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          setShowLoginModal={setShowLoginModal}
        />
      </ClientOnly>

      {/* ── Hero ── */}
        <section className="relative pt-24 pb-14 px-6 h-[68svh] min-h-[440px] flex items-center overflow-hidden bg-[#1E293B]">
        {/* Full-bleed background video — loads only after idle, poster keeps a frame visible instantly */}
          <video
          src={videoReady ? heroVideo : undefined}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: currentSlide === -1 ? 1 : 0,
            transition: "opacity 0.6s ease",
            zIndex: 0,
            pointerEvents: currentSlide === -1 ? "auto" : "none",
          }}
        />
        {/* Full-bleed background images — cover fills the section, positioned per-image to keep faces in frame */}
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img.src}
            alt={`Hero Student ${index + 1}`}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchpriority={index === 0 ? "high" : "low"}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: heroImagePositions[index] || "center 10%",
              opacity: currentSlide === index ? 1 : 0,
              transition: "opacity 0.6s ease",
              zIndex: 0,
              pointerEvents: currentSlide === index ? "auto" : "none",
            }}
          />
        ))}

        {/* Dark gradient overlay so text stays readable over any image/video */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/15 z-[1]" />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="mb-4 sm:mb-5 inline-flex">
              
            </div>
                        <style>{`@keyframes heroTextIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                        <ClientOnly
              fallback={
                <h1 className="mb-5 leading-[1.1]">
                <span suppressHydrationWarning className="block whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white">
                    {heroTexts[currentSlide + 1].line1}
                  </span>
                  <span suppressHydrationWarning className="block whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#F97316]">
                    {heroTexts[currentSlide + 1].line2}
                  </span>
                </h1>
              }
            >
              <h1 key={`h-${currentSlide}`} className="mb-5 leading-[1.1]">
                <div className="block whitespace-nowrap">
                  <SplitText
                    text={heroTexts[currentSlide + 1].line1}
                    className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white"
                    splitType="chars"
                    delay={60}
                    duration={0.6}
                  />
                </div>
                <div className="block whitespace-nowrap">
                  <SplitText
                    text={heroTexts[currentSlide + 1].line2}
                    className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#F97316]"
                    splitType="chars"
                    delay={60}
                    duration={0.6}
                  />
                </div>
              </h1>
            </ClientOnly>
                        <p
              key={`p-${currentSlide}`}
              suppressHydrationWarning
              className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 max-w-xl leading-relaxed font-light"
              style={{ animation: "heroTextIn 0.5s ease both" }}
            >
              {heroTexts[currentSlide + 1].desc}
            </p>
          </div>
        </div>

        {/* Slide indicator dots — bottom center, over the background */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          <button
            onClick={() => goToSlide(-1)}
            aria-label="Show video"
            style={{
              width: currentSlide === -1 ? "28px" : "10px",
              height: "10px",
              borderRadius: "9999px",
              background:
                currentSlide === -1 ? "#22c55e" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.35s ease, background 0.35s ease",
            }}
          />
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: currentSlide === index ? "28px" : "10px",
                height: "10px",
                borderRadius: "9999px",
                background:
                  currentSlide === index ? "#F97316" : "rgba(255,255,255,0.4)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.35s ease, background 0.35s ease",
              }}
            />
          ))}
        </div>
            </section>

            {/* ── Courses ── */}
      <section
        id="courses"
        className="py-6 sm:py-8 scroll-mt-20 bg-[#F8FAFC] dark:bg-black"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          {(() => {
            const source = programsLoading
              ? courses
              : featuredPrograms &&
                  Object.values(featuredPrograms).some((a) => a.length > 0)
                ? featuredPrograms
                : courses;

            return (
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-6 lg:gap-8 items-start w-full"
              >
                {/* ── Left: category panel ── */}
                <div className="min-w-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4 sm:p-5 lg:sticky lg:top-24">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#6D28D9] dark:text-violet-400 mb-2">
                    Explore by category
                  </span>
                  <h2 className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#1E293B] dark:text-white leading-tight mb-4 whitespace-nowrap">
                    Featured Programs
                  </h2>

                  <TabsList className="flex lg:flex-col w-full h-auto items-stretch justify-start gap-1.5 bg-transparent p-0 overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {Object.keys(source).map((tab) => {
                      const CatIcon = getCategoryIcon(tab);
                      return (
                        <TabsTrigger
                          key={tab}
                          value={tab}
                          className="flex items-center justify-start gap-3 rounded-xl px-3.5 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0 lg:w-full text-[#1E293B] dark:text-gray-300 bg-transparent hover:bg-orange-50 dark:hover:bg-white/5 transition-all duration-300 data-[state=active]:bg-[#F97316] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/30"
                        >
                          <CatIcon className="w-5 h-5 flex-shrink-0" />
                          <span className="flex-1 text-left">{tab}</span>
                          <ChevronRight className="w-4 h-4 opacity-60 hidden lg:block flex-shrink-0" />
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>

                {/* ── Right: popular programs grid ── */}
                <div className="min-w-0">
                  {Object.entries(source).map(([category, categoryCourses]) => (
                    <TabsContent key={category} value={category} className="mt-0">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#1E293B] dark:text-white whitespace-nowrap">
                          Popular Programs
                        </h3>
                        <div className="flex-1 h-px bg-[#1E293B]/80 dark:bg-white/30" />
                        <button
                          type="button"
                          onClick={() => navigate("/all-courses")}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-[#F97316] hover:underline bg-transparent border-none p-0 cursor-pointer whitespace-nowrap"
                        >
                          View All <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      <ClientOnly>
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 min-[1360px]:grid-cols-4 gap-4">
                          {categoryCourses.slice(0, 8).map((course) => {
                            const badgeLabel = course.isBestseller
                              ? "Bestseller"
                              : course.isTrending
                                ? "Trending"
                                : course.isFeatured
                                  ? "Featured"
                                  : course.isPopular
                                    ? "Popular"
                                    : course.isRecommended
                                      ? "Recommended"
                                      : course.rating >= 4.8
                                        ? "Bestseller"
                                        : "Featured";
                            const lessons =
                              course.totalLessons || course.modules?.length || 0;
                            const isWishlisted = wishlist.has(course.id);
                            const BadgeIcon =
                              {
                                Bestseller: Flame,
                                Featured: Star,
                                Trending: TrendingUp,
                                Popular: Zap,
                                Recommended: Award,
                              }[badgeLabel] || Sparkles;
                            const goDetails = () =>
                              navigate(`/course-details/${course.id}`, {
                                state: { course },
                              });

                            return (
                              <div
                                key={course.id}
                                onClick={goDetails}
                                className="group relative flex flex-col min-w-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-slate-300/40 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden cursor-pointer"
                              >
                                {/* Thumbnail */}
                                <div className="relative h-28 sm:h-32 overflow-hidden bg-gradient-to-br from-[#1E293B] via-[#334155] to-[#F97316] flex-shrink-0">
                                  {course.thumbnailUrl || course.bannerUrl ? (
                                    <img
                                      src={course.thumbnailUrl || course.bannerUrl}
                                      alt={course.title}
                                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <GraduationCap
                                        className="w-14 h-14 text-white/25"
                                        strokeWidth={1.25}
                                      />
                                    </div>
                                  )}

                                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2">
                                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide bg-white/95 text-orange-600 px-2.5 py-1 rounded-full shadow-sm">
                                      <BadgeIcon className="w-3 h-3 fill-current" />
                                      {badgeLabel}
                                    </span>
                                    <button
                                      type="button"
                                      aria-label={
                                        isWishlisted
                                          ? "Remove from wishlist"
                                          : "Add to wishlist"
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWishlist(course.id);
                                      }}
                                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/95 shadow-sm hover:scale-110 active:scale-95 transition-transform duration-200"
                                    >
                                      <Heart
                                        className={`w-4 h-4 transition-colors ${
                                          isWishlisted
                                            ? "fill-[#F97316] text-[#F97316]"
                                            : "text-[#1E293B]"
                                        }`}
                                      />
                                    </button>
                                  </div>

                                  <div className="absolute bottom-2.5 left-2.5 max-w-[70%]">
                                    <span
                                      className={`inline-block max-w-full truncate align-bottom text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${getLevelColor(course.level)} bg-white/95 dark:bg-white/95`}
                                    >
                                      {course.level}
                                    </span>
                                  </div>
                                </div>

                                {/* Body */}
                                <div className="flex flex-col flex-1 min-w-0 p-3.5 pt-3">
                                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#EA580C] mb-1 truncate">
                                    {category}
                                  </span>
                                  <h3 className="text-base font-bold text-[#1E293B] dark:text-white leading-snug line-clamp-2 min-h-[2.5em] mb-3 group-hover:text-[#F97316] transition-colors">
                                    {course.title}
                                  </h3>

                                  <div className="grid grid-cols-4 gap-1 text-center mb-3">
                                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                                      <PlayCircle className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                                      <span className="text-xs font-semibold text-[#1E293B] dark:text-gray-200 truncate w-full">
                                        {lessons ?? "—"}
                                      </span>
                                      <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate w-full">
                                        Lessons
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                                      <Users className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                                      <span className="text-xs font-semibold text-[#1E293B] dark:text-gray-200 truncate w-full">
                                        {course.students ?? "—"}
                                      </span>
                                      <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate w-full">
                                        Learners
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                                      <Clock className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                                      <span className="text-xs font-semibold text-[#1E293B] dark:text-gray-200 truncate w-full">
                                        {course.duration ?? "—"}
                                      </span>
                                      <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate w-full">
                                        Duration
                                      </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-0.5 min-w-0">
                                      <Star className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                                      <span className="text-xs font-semibold text-[#1E293B] dark:text-gray-200 truncate w-full">
                                        {course.rating ?? "—"}
                                      </span>
                                      <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate w-full">
                                        Rating
                                      </span>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      goDetails();
                                    }}
                                    className="mt-auto inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] bg-transparent border-none py-1.5 cursor-pointer"
                                  >
                                    View Details
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </ClientOnly>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            );
          })()}
        </div>
      </section>

     

      {/* ── Stats ── */}
        {/* <section className="py-6 sm:py-8 px-6 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#F6EDE6] dark:bg-gray-900 rounded-2xl p-4 sm:p-5 text-center border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#F97316] mb-1.5">
                {stat.value}
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section> */}
      {/* ── WatchNow ── */}
            <ClientOnly>
        <WatchNowSection />
      </ClientOnly>

      {/* ── Mentors (testimonials — backend-connected) ── */}
      <section
        id="mentors"
        className="py-4 sm:py-5 px-4 sm:px-6 scroll-mt-20 bg-[#FAF6F2] dark:bg-gray-900/30 overflow-x-hidden"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-[900px] lg:max-w-none mx-auto mb-5 sm:mb-5 lg:mb-5">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-[#1E293B] dark:text-white leading-tight">
              What Our <span className="text-[#F97316]">Learners</span> Have To
              Say
            </h2>
            <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-300 text-sm sm:text-base font-medium">
              <Star className="w-4 h-4 sm:w-[18px] sm:h-[18px] fill-[#F97316] text-[#F97316]" />
              <span className="text-[#111827] dark:text-white font-bold">
                4.9
              </span>
              <span className="text-gray-400">•</span>
              <span>Thousands of Happy Learners</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 sm:mb-6 lg:mb-6">
            {mentorBenefits.map((item, i) => (
              <div
                key={i}
                className="h-full flex items-center gap-3 bg-[#FAF6F2] dark:bg-gray-900 rounded-2xl p-4 border border-[#ECECEC] dark:border-gray-800 shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-[#1E293B] dark:bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

                    <MentorTestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ── Certifications (AWS / Microsoft / Cloud / Google) ── */}
      <CertificationShowcase navigate={navigate} />

      {/* ── Career Support ── */}
      <section
        id="successstories"
        className="py-5 px-4 sm:px-6 lg:px-10 scroll-mt-20 bg-[#F6EDE6] dark:bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-[#1E293B] dark:text-white">
              Career Support That{" "}
              <span className="text-[#F97316]">Delivers Results</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Get help with interview prep, portfolios, referrals and role
              mapping
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-5 mb-6">
            {careerSupport.map((item, i) => (
              <div
                key={i}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-[#1E293B] dark:bg-[#F97316] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1E293B] dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-base font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── Wide banner CTA ── */}
          <div className="bg-[#F6EDE6] dark:bg-gray-900 rounded-3xl relative overflow-hidden border border-[#F97316]/20 shadow-xl">
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* ── Left: full-bleed image, fixed height, cropped to fill ── */}
              <div className="w-full lg:w-[280px] xl:w-[320px] h-40 sm:h-44 lg:h-auto flex-shrink-0 overflow-hidden">
                <img
                  src={ctaStudent.src}
                  alt="Student ready to transform their career"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* ── Middle: Content ── */}
              <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-6 lg:py-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mb-2 text-[#1E293B] dark:text-white leading-tight">
                  Ready to Transform Your Career?
                </h3>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Join 5000+ professionals who've already taken the leap with
                  our project-based programs and expert mentorship.
                </p>
              </div>

              {/* ── Right: CTA button ── */}
              <div className="flex items-center justify-center lg:justify-end px-6 sm:px-10 pb-10 lg:pb-0 lg:pr-10">
                <button
                  onClick={() => scrollToSection("courses")}
                  className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white font-semibold px-6 py-3.5 rounded-xl text-sm sm:text-base shadow-md hover:shadow-lg transition-all hover:scale-105 whitespace-nowrap"
                >
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
        <section className="py-5 sm:py-6 px-6 bg-[#F6EDE6] dark:bg-black">
        <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 text-[#1E293B] dark:text-white">
              Why Choose
              <span className="ml-2">
                <span className="text-green-600">ILM</span>{" "}
                <span className="text-[#F97316]">ORA</span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Everything you need to accelerate your career growth
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                                <div className="w-11 h-11 bg-[#1E293B] dark:bg-[#F97316] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-sm">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1E293B] dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-base font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

        <section className="py-5 sm:py-6 px-4 sm:px-6 relative overflow-hidden bg-white dark:bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6" style={{ marginBottom: 16 }}>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold">
              TRUSTED BY LEADING ORGANIZATIONS
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#1E293B] dark:text-white mt-3">
              Top Global <span className="text-[#F97316]">Companies</span>
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We collaborate with leading technology providers and business
              organizations to deliver innovative digital solutions.
            </p>
          </div>

          <TopCompaniesCarousel
            logos={[
              ...techPartners,
              ...bizPartners,
              ...(ecosystemProducts || []),
            ]}
          />
        </div>
      </section>
      {/* ── Footer ── */}
            <ClientOnly>
        <Footer scrollToSection={scrollToSection} />
      </ClientOnly>
      {/* ── Login Modal ── */}
      {showLoginModal && (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(5px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowLoginModal(false);
            }}
          >
            <div
              className="relative w-full max-w-md rounded-2xl shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(249,115,22,0.18)",
                padding: "20px 26px 18px",
                animation: "modalFadeUp 0.3s ease both",
              }}
            >
              <style>{`@keyframes modalFadeUp { from { opacity:0; transform:translateY(20px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }`}</style>

              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition text-xl font-bold leading-none"
                aria-label="Close"
              >
                ×
              </button>

              <div className="flex justify-center mb-2">
                <span className="text-3xl font-extrabold font-serif tracking-wide">
                  <span className="text-green-600">ILM</span>
                  <span className="text-[#F97316] ml-2">ORA</span>
                </span>
              </div>

              <div className="text-center mb-3">
                <h2 className="text-lg font-bold text-[#1e0e02] mb-0.5">
                  Welcome back!
                </h2>
              </div>

              <div className="flex justify-center mb-3">
                <GoogleLogin
                  onSuccess={handleModalGoogle}
                  onError={() => console.error("Google OAuth failed")}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                  width="360"
                  auto_select={false}
                  cancel_on_tap_outside={true}
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(180,100,30,0.15)" }}
                />
                <span className="text-xs text-[#b8906a] uppercase tracking-widest font-medium">
                  OR
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: "rgba(180,100,30,0.15)" }}
                />
              </div>

              <form onSubmit={handleModalSubmit}>
                <div className="mb-2">
                  <label className="block text-xs font-bold text-[#8a6040] mb-1 uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    required
                    disabled={modalLoading}
                    className="w-full px-3.5 py-2 rounded-xl text-sm text-[#1a0e06] placeholder-[#c0a070] outline-none transition-all disabled:opacity-50"
                    style={{
                      background: "rgba(255,255,255,0.8)",
                      border: "1.5px solid rgba(180,120,60,0.2)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#F97316";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(249,115,22,0.1)";
                      e.target.style.background = "#fff";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(180,120,60,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div className="mb-1.5">
                  <label className="block text-xs font-bold text-[#8a6040] mb-1 uppercase tracking-widest">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showModalPw ? "text" : "password"}
                      placeholder="Enter your password"
                      value={modalPassword}
                      onChange={(e) => setModalPassword(e.target.value)}
                      required
                      disabled={modalLoading}
                      className="w-full px-3.5 py-2 pr-11 rounded-xl text-sm text-[#1a0e06] placeholder-[#c0a070] outline-none transition-all disabled:opacity-50"
                      style={{
                        background: "rgba(255,255,255,0.8)",
                        border: "1.5px solid rgba(180,120,60,0.2)",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#F97316";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(249,115,22,0.1)";
                        e.target.style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(180,120,60,0.2)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowModalPw((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b8906a] hover:text-[#F97316] transition p-0 bg-transparent border-none cursor-pointer"
                      tabIndex={-1}
                    >
                      {showModalPw ? (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-right mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowLoginModal(false);
                      setShowForgotModal(true);
                    }}
                    className="text-xs text-[#F97316] hover:underline bg-transparent border-none cursor-pointer font-medium p-0"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={modalLoading}
                  className="w-full py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#F97316,#ea580c)",
                    boxShadow: "0 4px 18px rgba(249,115,22,0.32)",
                  }}
                >
                  {modalLoading ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>
              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false);
                  setShowSignupModal(true);
                }}
                className="w-full mt-2.5 py-2.5 rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                style={{
                  background: "transparent",
                  border: "2px solid #16a34a",
                  color: "#16a34a",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#16a34a";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#16a34a";
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <path d="M2 12h20" />
                </svg>
                Sign up
              </button>

              <div className="text-center mt-3">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="text-xs text-[#b8906a] hover:text-[#8a6040] bg-transparent border-none cursor-pointer transition-colors"
                >
                  ← Back to home
                </button>
              </div>
            </div>
          </div>
        </GoogleOAuthProvider>
      )}
      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
      {showForgotModal && (
        <ForgotPasswordModal
          onClose={() => setShowForgotModal(false)}
          onSwitchToLogin={() => {
            setShowForgotModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
           <ClientOnly>
        <TexoraFloatingWidget />
      </ClientOnly>
    </div>
  );
}