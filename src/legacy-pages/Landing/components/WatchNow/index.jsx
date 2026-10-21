// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useLayoutEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { createPortal } from "react-dom";
// import {
//   Play,
//   Heart,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   ArrowRight,
//   Clock,
//   X,
//   CheckCircle2,
//   Users,
// } from "lucide-react";
// import { useNavigate } from "@/lib/routerCompat";
// import videoService from "@/services/videoService";

// // Same background as the "Explore the ILM ORA Platform" section
// const SECTION_BG = "#F8FAFC";

// // Where the "Start your journey" button goes (change to your real route)
// const START_PATH = "/courses";

// /* ============================================================
//    Category meta — one line telling a normal person WHY this
//    category is useful. Add new categories here.
//    ============================================================ */
// const CATEGORY_INFO = {
//   "Career Stories":
//     "Real learners and team members share how they started, what they learned and where they reached — see a path you can follow.",
//   "Resume & Portfolio":
//     "Step-by-step help to build a job-ready resume and portfolio that gets noticed by recruiters.",
//   "Product Demos":
//     "Quick walkthroughs of ILM ORA tools so you know exactly what you can do with them before you start.",
//   "Interview Prep":
//     "Practice questions and tips to feel confident in your next interview.",
// };

// /* ============================================================
//    Dummy data — shown only when the API returns no published
//    stories (or the API fails). Real data always wins.
//    ============================================================ */
// const DUMMY_STORIES = [
//   {
//     id: "dummy-1",
//     isDummy: true,
//     thumbnail: null,
//     quote: "My Journey at Texora AI",
//     summary: "How a learner grew into a Full Stack Developer role.",
//     audience: "Freshers & career switchers",
//     takeaways: [
//       "Which skills to learn first",
//       "How projects helped in getting hired",
//       "Mistakes to avoid in the first year",
//     ],
//     personName: "Virjesh Choudary",
//     personRole: "Full Stack Developer",
//     category: "Career Stories",
//     duration: "4:32",
//     views: 128,
//   },
//   {
//     id: "dummy-2",
//     isDummy: true,
//     thumbnail: null,
//     quote: "Growing Through Learning at ILMORA",
//     summary: "From learning on ILMORA to working as an SDE-1.",
//     audience: "Students & working professionals",
//     takeaways: [
//       "How to build a daily learning habit",
//       "Using courses and sessions together",
//       "How to prepare for your first SDE role",
//     ],
//     personName: "Shareef Sheaik",
//     personRole: "SDE-1",
//     category: "Career Stories",
//     duration: "3:10",
//     views: 96,
//   },
//   {
//     id: "dummy-3",
//     isDummy: true,
//     thumbnail: null,
//     quote: "Create a Job-Ready Resume with AI",
//     summary: "Build a clean, recruiter-friendly resume in minutes.",
//     audience: "Job seekers",
//     takeaways: [
//       "What recruiters look for in a resume",
//       "Using AI to write strong bullet points",
//       "Showcasing projects in your portfolio",
//     ],
//     personName: "Sanya",
//     personRole: "Content Creation",
//     category: "Resume & Portfolio",
//     duration: "5:05",
//     views: 214,
//   },
//   {
//     id: "dummy-4",
//     isDummy: true,
//     thumbnail: null,
//     quote: "Smarter Customer Experiences, Powered by AI",
//     summary: "See how AI tools improve real customer conversations.",
//     audience: "Teams & product learners",
//     takeaways: [
//       "What the product can do",
//       "A live walkthrough of key features",
//       "How to apply it in your own work",
//     ],
//     personName: "Yash Kumar",
//     personRole: "AI Developer",
//     category: "Product Demos",
//     duration: "2:48",
//     views: 73,
//   },
// ];

// /* ============================================================
//    Helpers
//    ============================================================ */

// // thumbnail can be a full URL (YouTube) or a stored filename (needs stream url)
// async function resolveThumb(thumbnail) {
//   if (!thumbnail) return null;
//   if (/^https?:\/\//i.test(thumbnail)) return thumbnail;
//   return await videoService.getWatchNowStreamUrl(thumbnail);
// }

// function initials(name = "") {
//   return (
//     name
//       .trim()
//       .split(/\s+/)
//       .slice(0, 2)
//       .map((w) => w[0]?.toUpperCase())
//       .join("") || "•"
//   );
// }

// function formatViews(n) {
//   const num = Number(n) || 0;
//   if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
//   if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
//   return String(num);
// }

// const GAP = 20; // px gap between cards
// const SPEED = 45; // px per second (smaller = slower)

// function getVisibleCount(width) {
//   if (width >= 1200) return 4;
//   if (width >= 900) return 3;
//   if (width >= 641) return 2;
//   return 1;
// }

// function useVisibleCount() {
//   const [width, setWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 1280,
//   );
//   useEffect(() => {
//     const onResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);
//   return { visibleCount: getVisibleCount(width), isMobile: width < 641 };
// }

// /* ============================================================
//    Thumbnail
//    ============================================================ */
// function Thumb({ thumbnail, alt }) {
//   const [src, setSrc] = useState(null);

//   useEffect(() => {
//     let active = true;
//     setSrc(null);
//     if (!thumbnail) return undefined;
//     resolveThumb(thumbnail)
//       .then((u) => active && setSrc(u))
//       .catch(() => active && setSrc(""));
//     return () => {
//       active = false;
//     };
//   }, [thumbnail]);

//   // no thumbnail (dummy card) or it failed to load -> branded gradient
//   if (!thumbnail || src === "") {
//     return (
//       <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-purple-600" />
//     );
//   }
//   if (!src) {
//     return (
//       <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
//     );
//   }
//   return (
//     <img
//       src={src}
//       alt={alt}
//            loading="lazy"
//       draggable={false}
//             className="absolute inset-0 w-full h-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105"
//     />
//   );
// }

// /* ============================================================
//    Card
//    ============================================================ */
// function StoryCard({ item, onOpen }) {
//   const [liked, setLiked] = useState(false);
//   const views = item.views ?? item.viewCount ?? item.view_count ?? 0;

//   return (
//     <article
//       onClick={onOpen}
//       className="group h-full flex flex-col bg-white dark:bg-[#1a1d27] border border-slate-200/80 dark:border-white/10 rounded-[20px] p-2 cursor-pointer shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300"
//     >
//       {/* Thumbnail (inset, rounded) */}
//       <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
//         <Thumb thumbnail={item.thumbnail} alt={item.title || item.personName} />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

//         {item.category && (
//           <span className="absolute top-3 left-3 max-w-[70%] truncate text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/80 text-slate-800 backdrop-blur-md border border-white/70 shadow-md">
//             {item.category}
//           </span>
//         )}

//         <button
//           type="button"
//           aria-label={liked ? "Remove from favourites" : "Add to favourites"}
//           onClick={(e) => {
//             e.stopPropagation();
//             setLiked((v) => !v);
//           }}
//           className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md border-none cursor-pointer hover:scale-110 transition-transform"
//         >
//           <Heart
//             className={`w-[18px] h-[18px] transition-colors ${
//               liked ? "text-red-500 fill-red-500" : "text-slate-500"
//             }`}
//           />
//         </button>

//         <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <span className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
//             <Play className="w-5 h-5 text-[#F97316] fill-[#F97316] ml-0.5" />
//           </span>
//         </span>

//         {item.duration && (
//           <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md bg-black/70 text-white">
//             <Clock className="w-3 h-3" /> {item.duration}
//           </span>
//         )}
//       </div>

//       {/* Body */}
//       <div className="flex flex-col flex-1 px-2.5 pt-3 pb-2">
//         <h3 className="m-0 text-[15px] font-bold text-slate-900 dark:text-slate-100 truncate leading-snug">
//           {item.quote}
//         </h3>
//         {item.summary && (
//           <p className="mt-1 mb-0 text-[12.5px] leading-snug text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[2.4em]">
//             {item.summary}
//           </p>
//         )}

//         <div className="mt-auto pt-3 flex items-center justify-between gap-2">
//           <div className="flex items-center gap-2 min-w-0">
//             <span className="w-7 h-7 shrink-0 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
//               {initials(item.personName)}
//             </span>
//             <span className="text-[13px] font-medium text-slate-600 dark:text-slate-300 truncate">
//               {item.personName}
//             </span>
//           </div>

//           <span className="inline-flex items-center gap-1.5 shrink-0 text-[13px] text-slate-500 dark:text-slate-400">
//             <Eye className="w-4 h-4" />
//             {formatViews(views)}
//           </span>
//         </div>
//       </div>
//     </article>
//   );
// }

// function SkeletonCard() {
//   return (
//     <div className="h-full bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-[20px] p-2">
//       <div className="aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
//       <div className="px-2.5 pt-3 pb-2 space-y-2.5">
//         <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
//         <div className="h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    Journey modal — opens on card click
//    ============================================================ */
// function StoryModal({ item, onClose }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!item) return undefined;
//     const onKey = (e) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", onKey);
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = prev;
//     };
//   }, [item, onClose]);

//   if (!item) return null;

//   const takeaways =
//     Array.isArray(item.takeaways) && item.takeaways.length > 0
//       ? item.takeaways
//       : [
//           "Real experience from a real person",
//           "Practical steps you can apply right away",
//           "What to learn next on ILM ORA",
//         ];
//   const audience = item.audience || "Anyone who wants to learn and grow";
//   const about =
//     item.summary ||
//     item.description ||
//     `${item.personName} shares their experience as ${item.personRole}.`;

//   const watchFull = () => {
//     onClose();
//     navigate(item.isDummy ? "/watch-now" : `/watch-now?video=${item.id}`);
//   };
//   const startJourney = () => {
//     onClose();
//     navigate(START_PATH);
//   };

//     return createPortal(
//     <div
//       className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#1a1d27] rounded-3xl shadow-2xl"
//       >
//         <button
//           type="button"
//           aria-label="Close"
//           onClick={onClose}
//           className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md border-none cursor-pointer hover:scale-105 transition-transform"
//         >
//           <X className="w-4 h-4 text-slate-700" />
//         </button>

//                 <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
//           {/* Preview */}
//           <div className="p-3 min-w-0 overflow-hidden">
//             <div
//               onClick={watchFull}
//               className="group relative w-full max-w-full aspect-[4/3] md:aspect-auto md:h-full md:min-h-[300px] overflow-hidden rounded-2xl cursor-pointer bg-black"
//             >
//               <Thumb thumbnail={item.thumbnail} alt={item.personName} />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//               <span className="absolute inset-0 flex items-center justify-center">
//                 <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
//                   <Play className="w-6 h-6 text-[#F97316] fill-[#F97316] ml-0.5" />
//                 </span>
//               </span>
//               {item.duration && (
//                 <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md bg-black/70 text-white">
//                   <Clock className="w-3 h-3" /> {item.duration}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Details */}
//                     <div className="p-5 md:p-6 md:pl-3 flex flex-col min-w-0">
//             {item.category && (
//               <span className="self-start text-[11px] font-semibold px-3 py-1 rounded-full bg-orange-50 text-[#F97316] dark:bg-orange-500/15">
//                 {item.category}
//               </span>
//             )}
//                         <h3
//               className="mt-2 mb-1 text-xl font-bold text-slate-900 dark:text-white leading-snug"
//               style={{ overflowWrap: "anywhere" }}
//             >
//               {item.quote}
//             </h3>

//             <div className="flex items-center gap-2 mb-3">
//               <span className="w-8 h-8 shrink-0 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center">
//                 {initials(item.personName)}
//               </span>
//               <div className="min-w-0">
//                 <p className="m-0 text-[13px] font-semibold text-slate-800 dark:text-slate-100 truncate leading-tight">
//                   {item.personName}
//                 </p>
//                 <p className="m-0 text-[12px] text-slate-500 dark:text-slate-400 truncate leading-tight">
//                   {item.personRole}
//                 </p>
//               </div>
//             </div>

//             <p className="m-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
//               {about}
//             </p>

//             <p className="mt-3 mb-0 inline-flex items-center gap-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">
//               <Users className="w-4 h-4 text-[#F97316]" />
//               Best for: <span className="font-medium text-slate-700 dark:text-slate-200">{audience}</span>
//             </p>

//             <p className="mt-4 mb-2 text-[13px] font-semibold text-slate-800 dark:text-slate-100">
//               What you will learn
//             </p>
//             <ul className="m-0 p-0 list-none space-y-1.5">
//               {takeaways.map((t) => (
//                 <li
//                   key={t}
//                   className="flex items-start gap-2 text-[13px] text-slate-600 dark:text-slate-300"
//                 >
//                   <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
//                   {t}
//                 </li>
//               ))}
//             </ul>

//             <div className="mt-5 pt-1 flex flex-wrap gap-2.5">
//               <button
//                 type="button"
//                 onClick={watchFull}
//                 className="inline-flex items-center gap-2 bg-[#F97316] text-white font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-[#EA580C] transition shadow-lg shadow-orange-500/25 border-none cursor-pointer"
//               >
//                 <Play className="w-4 h-4 fill-white" /> Watch full video
//               </button>
//               <button
//                 type="button"
//                 onClick={startJourney}
//                 className="inline-flex items-center gap-2 bg-white dark:bg-transparent text-slate-800 dark:text-slate-100 font-semibold px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-white/20 hover:bg-orange-50 dark:hover:bg-white/10 transition cursor-pointer"
//               >
//                 Start your journey <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body,
//   );
// }

// /* Carousel */
// function NavButton({ direction, onClick, className = "" }) {
//   const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       aria-label={direction === "prev" ? "Previous" : "Next"}
//       className={`group w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center transition-all duration-200 hover:bg-[#F97316] hover:border-[#F97316] hover:scale-105 active:scale-95 cursor-pointer ${className}`}
//     >
//       <Icon className="w-5 h-5 text-[#1E293B] dark:text-white transition-colors group-hover:text-white" />
//     </button>
//   );
// }

// function WatchNowCarousel({ stories, onSelect, paused }) {
//   const { visibleCount, isMobile } = useVisibleCount();

//   const containerRef = useRef(null);
//   const trackRef = useRef(null);
//   const offsetRef = useRef(0);
//   const pendingRef = useRef(0);
//   const hoverRef = useRef(false);
//   const pausedRef = useRef(paused);
//   const movedRef = useRef(false);
//   const dragRef = useRef({
//     dragging: false,
//     lastX: 0,
//     startX: 0,
//     startY: 0,
//     axis: null,
//   });

//   const [containerWidth, setContainerWidth] = useState(0);

//   useEffect(() => {
//     pausedRef.current = paused;
//   }, [paused]);

//   useLayoutEffect(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     const update = () => setContainerWidth(el.offsetWidth);
//     update();
//     const ro = new ResizeObserver(update);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, []);

//   const cardWidth =
//     containerWidth > 0
//       ? (containerWidth - GAP * (visibleCount - 1)) / visibleCount
//       : 0;
//   const step = cardWidth + GAP;

//   const baseSet = useMemo(() => {
//     if (!stories.length || step <= 0) return stories;
//     const repeats = Math.max(
//       1,
//       Math.ceil((containerWidth + step) / (stories.length * step)),
//     );
//     return Array.from({ length: repeats }).flatMap(() => stories);
//   }, [stories, containerWidth, step]);

//   const setWidth = baseSet.length * step;

//   const trackItems = useMemo(
//     () =>
//       [...baseSet, ...baseSet].map((item, i) => ({
//         item,
//         key: `${i}-${item.id}`,
//       })),
//     [baseSet],
//   );

//   useEffect(() => {
//     if (!setWidth) return undefined;
//     let raf;
//     let last = performance.now();

//     const tick = (now) => {
//       const dt = Math.min(now - last, 64) / 1000;
//       last = now;
//       let o = offsetRef.current;

//       const p = pendingRef.current;
//       if (p) {
//         if (Math.abs(p) < 0.5) {
//           o += p;
//           pendingRef.current = 0;
//         } else {
//           const d = p * 0.15;
//           o += d;
//           pendingRef.current = p - d;
//         }
//       }

//       if (
//         !hoverRef.current &&
//         !pausedRef.current &&
//         !dragRef.current.dragging
//       ) {
//         o += SPEED * dt;
//       }

//       o = ((o % setWidth) + setWidth) % setWidth;
//       offsetRef.current = o;
//       if (trackRef.current) {
//         trackRef.current.style.transform = `translate3d(${-o}px,0,0)`;
//       }
//       raf = requestAnimationFrame(tick);
//     };

//     raf = requestAnimationFrame(tick);
//     return () => cancelAnimationFrame(raf);
//   }, [setWidth]);

//   const goNext = useCallback(() => {
//     pendingRef.current += step;
//   }, [step]);
//   const goPrev = useCallback(() => {
//     pendingRef.current -= step;
//   }, [step]);

//   const handleKeyDown = (e) => {
//     if (e.key === "ArrowLeft") goPrev();
//     else if (e.key === "ArrowRight") goNext();
//   };

//   const onPointerDown = (e) => {
//     movedRef.current = false;
//     dragRef.current = {
//       dragging: true,
//       lastX: e.clientX,
//       startX: e.clientX,
//       startY: e.clientY,
//       axis: null,
//     };
//   };

//   const onPointerMove = (e) => {
//     const ds = dragRef.current;
//     if (!ds.dragging) return;

//     if (ds.axis === null) {
//       const dx0 = e.clientX - ds.startX;
//       const dy0 = e.clientY - ds.startY;
//       if (Math.abs(dx0) < 8 && Math.abs(dy0) < 8) return;
//       ds.axis = Math.abs(dx0) > Math.abs(dy0) ? "x" : "y";
//       if (ds.axis === "y") {
//         ds.dragging = false;
//         return;
//       }
//     }
//     if (ds.axis === "x") {
//       movedRef.current = true;
//       e.preventDefault();
//       offsetRef.current -= e.clientX - ds.lastX;
//       ds.lastX = e.clientX;
//     }
//   };

//   const endDrag = () => {
//     dragRef.current.dragging = false;
//     dragRef.current.axis = null;
//   };

//   const swallowClickAfterDrag = (e) => {
//     if (movedRef.current) {
//       e.stopPropagation();
//       movedRef.current = false;
//     }
//   };

//   const showArrows = stories.length > 1;

//   return (
//     <div
//       ref={containerRef}
//       className="relative"
//       onMouseEnter={() => {
//         hoverRef.current = true;
//       }}
//       onMouseLeave={() => {
//         hoverRef.current = false;
//         endDrag();
//       }}
//       tabIndex={0}
//       role="region"
//       aria-label="Watch Now stories carousel"
//       onKeyDown={handleKeyDown}
//     >
//       <div
//         className="overflow-hidden"
//         style={{ touchAction: "pan-y" }}
//         onPointerDown={onPointerDown}
//         onPointerMove={onPointerMove}
//         onPointerUp={endDrag}
//         onPointerLeave={endDrag}
//         onPointerCancel={endDrag}
//       >
//         <div
//           ref={trackRef}
//           className="flex items-stretch select-none py-2"
//           style={{ gap: `${GAP}px`, willChange: "transform" }}
//         >
//           {trackItems.map(({ item, key }) => (
//             <div
//               key={key}
//               onClickCapture={swallowClickAfterDrag}
//               style={{
//                 width: cardWidth ? `${cardWidth}px` : `${100 / visibleCount}%`,
//                 flexShrink: 0,
//               }}
//             >
//               <StoryCard item={item} onOpen={() => onSelect(item)} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {showArrows && !isMobile && (
//         <>
//           <NavButton
//             direction="prev"
//             onClick={goPrev}
//             className="absolute -left-5 top-[38%] -translate-y-1/2 hidden sm:flex z-10"
//           />
//           <NavButton
//             direction="next"
//             onClick={goNext}
//             className="absolute -right-5 top-[38%] -translate-y-1/2 hidden sm:flex z-10"
//           />
//         </>
//       )}

//       {showArrows && isMobile && (
//         <div className="flex sm:hidden justify-center items-center gap-4 mt-3">
//           <NavButton direction="prev" onClick={goPrev} />
//           <NavButton direction="next" onClick={goNext} />
//         </div>
//       )}
//     </div>
//   );
// }
// /* ============================================================
//    Section
//    ============================================================ */
// export default function WatchNowSection() {
//   const navigate = useNavigate();
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeCat, setActiveCat] = useState("All");
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     let active = true;
//     videoService
//       .getWatchNowPublished()
//       .then(({ data }) => {
//         if (!active) return;
//         setStories(Array.isArray(data) ? data : []);
//       })
//       .catch((e) => console.error("WatchNow load failed", e))
//       .finally(() => active && setLoading(false));
//     return () => {
//       active = false;
//     };
//   }, []);

//   const skeletons = useMemo(() => [0, 1, 2, 3], []);

//   // real data when the API has published stories, otherwise dummy data
//   const list = stories.length > 0 ? stories : DUMMY_STORIES;

//   // categories come from the data itself
//   const categories = useMemo(() => {
//     const set = new Set();
//     list.forEach((s) => s.category && set.add(s.category));
//     return ["All", ...Array.from(set)];
//   }, [list]);

//   // if the active category disappears (data changed), go back to All
//   useEffect(() => {
//     if (!categories.includes(activeCat)) setActiveCat("All");
//   }, [categories, activeCat]);

//   const filtered = useMemo(
//     () =>
//       activeCat === "All" ? list : list.filter((s) => s.category === activeCat),
//     [list, activeCat]
//   );

//   const catHint =
//     activeCat === "All"
//       ? "Real stories, demos and guides — pick a topic to see what fits you."
//       : CATEGORY_INFO[activeCat] || "";

//   return (
//     <section
//       // full-bleed: breaks out of any max-width parent and spans the whole screen
//       className="relative left-1/2 -translate-x-1/2 w-screen max-w-none py-5 sm:py-6 dark:!bg-transparent"
//       style={{ backgroundColor: SECTION_BG }}
//     >
//       <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-10">
//         {/* Heading — same font/weight as "Explore the ILM ORA Platform" */}
//         <div className="text-center mx-auto mb-4 sm:mb-5">
//           <h2 className="text-3xl sm:text-[40px] font-semibold text-slate-800 dark:text-white leading-tight m-0">
//             Learn Through, <span className="text-[#F97316]">Expert Sessions</span>
//           </h2>
//           <p className="text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 leading-snug mt-1 mb-0">
//             Live sessions, career guidance, interview prep and hands-on
//             projects — real stories and walkthroughs to help you build skills
//             that count.
//           </p>
//         </div>

//         {/* Category chips + what-is-this line */}
//         {!loading && categories.length > 2 && (
//           <div className="mb-3">
//             <div className="flex flex-wrap justify-center gap-2">
//               {categories.map((c) => (
//                 <button
//                   key={c}
//                   type="button"
//                   onClick={() => setActiveCat(c)}
//                   className={`px-4 py-1.5 rounded-full text-[13px] font-semibold border cursor-pointer transition ${
//                     activeCat === c
//                       ? "bg-[#F97316] text-white border-[#F97316] shadow-md shadow-orange-500/25"
//                       : "bg-white dark:bg-[#1a1d27] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-orange-50 dark:hover:bg-white/10"
//                   }`}
//                 >
//                   {c}
//                 </button>
//               ))}
//             </div>
//             {catHint && (
//               <p className="text-center text-[13px] text-slate-500 dark:text-slate-400 mt-2 mb-0 max-w-2xl mx-auto leading-snug">
//                 {catHint}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Cards */}
//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {skeletons.map((i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : (
//                     <WatchNowCarousel
//             key={activeCat}
//             stories={filtered}
//             onSelect={setSelected}
//             paused={!!selected}
//           />
//         )}

//         {/* View all */}
//         {!loading && (
//           <div className="flex justify-center mt-3">
//             <button
//               type="button"
//               onClick={() => navigate("/watch-now")}
//               className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#EA580C] transition-all hover:scale-105 shadow-lg shadow-orange-500/25 border-none cursor-pointer"
//             >
//               View all videos <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </div>

//       <StoryModal item={selected} onClose={() => setSelected(null)} />
//     </section>
//   );
// }
















































"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  Play,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Clock,
  X,
  CheckCircle2,
  Users,
} from "lucide-react";
import { useNavigate } from "@/lib/routerCompat";
import videoService from "@/services/videoService";

// Same background as the "Explore the ILM ORA Platform" section
const SECTION_BG = "#F8FAFC";

// Where the "Start your journey" button goes (change to your real route)
const START_PATH = "/courses";

// same key as the /watch-now page, so hearts stay in sync
const FAV_KEY = "watchnow_favs";
const isRealId = (id) => !String(id).startsWith("dummy-");

/* ============================================================
   Category meta — one line telling a normal person WHY this
   category is useful. Add new categories here.
   ============================================================ */
const CATEGORY_INFO = {
  "Career Stories":
    "Real learners and team members share how they started, what they learned and where they reached — see a path you can follow.",
  "Resume & Portfolio":
    "Step-by-step help to build a job-ready resume and portfolio that gets noticed by recruiters.",
  "Product Demos":
    "Quick walkthroughs of ILM ORA tools so you know exactly what you can do with them before you start.",
  "Interview Prep":
    "Practice questions and tips to feel confident in your next interview.",
};

/* ============================================================
   Dummy data — shown only when the API returns no published
   stories (or the API fails). Real data always wins.
   ============================================================ */
const DUMMY_STORIES = [
  {
    id: "dummy-1",
    isDummy: true,
    thumbnail: null,
    quote: "My Journey at Texora AI",
    summary: "How a learner grew into a Full Stack Developer role.",
    audience: "Freshers & career switchers",
    takeaways: [
      "Which skills to learn first",
      "How projects helped in getting hired",
      "Mistakes to avoid in the first year",
    ],
    personName: "Virjesh Choudary",
    personRole: "Full Stack Developer",
    category: "Career Stories",
    duration: "4:32",
    views: 128,
  },
  {
    id: "dummy-2",
    isDummy: true,
    thumbnail: null,
    quote: "Growing Through Learning at ILMORA",
    summary: "From learning on ILMORA to working as an SDE-1.",
    audience: "Students & working professionals",
    takeaways: [
      "How to build a daily learning habit",
      "Using courses and sessions together",
      "How to prepare for your first SDE role",
    ],
    personName: "Shareef Sheaik",
    personRole: "SDE-1",
    category: "Career Stories",
    duration: "3:10",
    views: 96,
  },
  {
    id: "dummy-3",
    isDummy: true,
    thumbnail: null,
    quote: "Create a Job-Ready Resume with AI",
    summary: "Build a clean, recruiter-friendly resume in minutes.",
    audience: "Job seekers",
    takeaways: [
      "What recruiters look for in a resume",
      "Using AI to write strong bullet points",
      "Showcasing projects in your portfolio",
    ],
    personName: "Sanya",
    personRole: "Content Creation",
    category: "Resume & Portfolio",
    duration: "5:05",
    views: 214,
  },
  {
    id: "dummy-4",
    isDummy: true,
    thumbnail: null,
    quote: "Smarter Customer Experiences, Powered by AI",
    summary: "See how AI tools improve real customer conversations.",
    audience: "Teams & product learners",
    takeaways: [
      "What the product can do",
      "A live walkthrough of key features",
      "How to apply it in your own work",
    ],
    personName: "Yash Kumar",
    personRole: "AI Developer",
    category: "Product Demos",
    duration: "2:48",
    views: 73,
  },
];

/* ============================================================
   Helpers
   ============================================================ */

// thumbnail can be a full URL (YouTube) or a stored filename (needs stream url)
async function resolveThumb(thumbnail) {
  if (!thumbnail) return null;
  if (/^https?:\/\//i.test(thumbnail)) return thumbnail;
  return await videoService.getWatchNowStreamUrl(thumbnail);
}

function initials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "•"
  );
}

function formatViews(n) {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(num);
}

const GAP = 20; // px gap between cards
const SPEED = 45; // px per second (smaller = slower)

function getVisibleCount(width) {
  if (width >= 1200) return 4;
  if (width >= 900) return 3;
  if (width >= 641) return 2;
  return 1;
}

function useVisibleCount() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return { visibleCount: getVisibleCount(width), isMobile: width < 641 };
}

/* ============================================================
   Thumbnail
   ============================================================ */
function Thumb({ thumbnail, alt }) {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    let active = true;
    setSrc(null);
    if (!thumbnail) return undefined;
    resolveThumb(thumbnail)
      .then((u) => active && setSrc(u))
      .catch(() => active && setSrc(""));
    return () => {
      active = false;
    };
  }, [thumbnail]);

  // no thumbnail (dummy card) or it failed to load -> branded gradient
  if (!thumbnail || src === "") {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-purple-600" />
    );
  }
  if (!src) {
    return (
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
           loading="lazy"
      draggable={false}
            className="absolute inset-0 w-full h-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

/* ============================================================
   Card
   ============================================================ */
function StoryCard({ item, onOpen, liked, onToggleLike }) {
  const views = item.views ?? item.viewCount ?? item.view_count ?? 0;
  const likes = Number(item.likes ?? item.likeCount ?? item.like_count ?? 0) || 0;

  return (
    <article
      onClick={onOpen}
      className="group h-full flex flex-col bg-white dark:bg-[#1a1d27] border border-slate-200/80 dark:border-white/10 rounded-[20px] p-2 cursor-pointer shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Thumbnail (inset, rounded) */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800">
        <Thumb thumbnail={item.thumbnail} alt={item.title || item.personName} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {item.category && (
          <span className="absolute top-3 left-3 max-w-[70%] truncate text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/80 text-slate-800 backdrop-blur-md border border-white/70 shadow-md">
            {item.category}
          </span>
        )}

        <button
          type="button"
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md border-none cursor-pointer hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-[18px] h-[18px] transition-colors ${
              liked ? "text-red-500 fill-red-500" : "text-slate-500"
            }`}
          />
        </button>

        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="w-5 h-5 text-[#F97316] fill-[#F97316] ml-0.5" />
          </span>
        </span>

        {item.duration && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-md bg-black/70 text-white">
            <Clock className="w-3 h-3" /> {item.duration}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-2.5 pt-3 pb-2">
        <h3 className="m-0 text-[15px] font-bold text-slate-900 dark:text-slate-100 truncate leading-snug">
          {item.quote}
        </h3>
        {item.summary && (
          <p className="mt-1 mb-0 text-[12.5px] leading-snug text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[2.4em]">
            {item.summary}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 shrink-0 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
              {initials(item.personName)}
            </span>
            <span className="text-[13px] font-medium text-slate-600 dark:text-slate-300 truncate">
              {item.personName}
            </span>
          </div>

          <span className="inline-flex items-center gap-3 shrink-0 text-[13px] text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {formatViews(likes)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {formatViews(views)}
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="h-full bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-[20px] p-2">
      <div className="aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="px-2.5 pt-3 pb-2 space-y-2.5">
        <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-6 w-1/2 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
    </div>
  );
}

/* ============================================================
   Journey modal — opens on card click
   ============================================================ */
function StoryModal({ item, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  if (!item) return null;

  const takeaways =
    Array.isArray(item.takeaways) && item.takeaways.length > 0
      ? item.takeaways
      : [
          "Real experience from a real person",
          "Practical steps you can apply right away",
          "What to learn next on ILM ORA",
        ];
  const audience = item.audience || "Anyone who wants to learn and grow";
  const about =
    item.summary ||
    item.description ||
    `${item.personName} shares their experience as ${item.personRole}.`;

  const watchFull = () => {
    onClose();
    navigate(item.isDummy ? "/watch-now" : `/watch-now?video=${item.id}`);
  };
  const startJourney = () => {
    onClose();
    navigate(START_PATH);
  };

    return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#1a1d27] rounded-3xl shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md border-none cursor-pointer hover:scale-105 transition-transform"
        >
          <X className="w-4 h-4 text-slate-700" />
        </button>

                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* Preview */}
          <div className="p-3 min-w-0 overflow-hidden">
            <div
              onClick={watchFull}
              className="group relative w-full max-w-full aspect-[4/3] md:aspect-auto md:h-full md:min-h-[300px] overflow-hidden rounded-2xl cursor-pointer bg-black"
            >
              <Thumb thumbnail={item.thumbnail} alt={item.personName} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  <Play className="w-6 h-6 text-[#F97316] fill-[#F97316] ml-0.5" />
                </span>
              </span>
              {item.duration && (
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md bg-black/70 text-white">
                  <Clock className="w-3 h-3" /> {item.duration}
                </span>
              )}
            </div>
          </div>

          {/* Details */}
                    <div className="p-5 md:p-6 md:pl-3 flex flex-col min-w-0">
            {item.category && (
              <span className="self-start text-[11px] font-semibold px-3 py-1 rounded-full bg-orange-50 text-[#F97316] dark:bg-orange-500/15">
                {item.category}
              </span>
            )}
                        <h3
              className="mt-2 mb-1 text-xl font-bold text-slate-900 dark:text-white leading-snug"
              style={{ overflowWrap: "anywhere" }}
            >
              {item.quote}
            </h3>

            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 shrink-0 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center justify-center">
                {initials(item.personName)}
              </span>
              <div className="min-w-0">
                <p className="m-0 text-[13px] font-semibold text-slate-800 dark:text-slate-100 truncate leading-tight">
                  {item.personName}
                </p>
                <p className="m-0 text-[12px] text-slate-500 dark:text-slate-400 truncate leading-tight">
                  {item.personRole}
                </p>
              </div>
            </div>

            <p className="m-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {about}
            </p>

            <p className="mt-3 mb-0 inline-flex items-center gap-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">
              <Users className="w-4 h-4 text-[#F97316]" />
              Best for: <span className="font-medium text-slate-700 dark:text-slate-200">{audience}</span>
            </p>

            <p className="mt-4 mb-2 text-[13px] font-semibold text-slate-800 dark:text-slate-100">
              What you will learn
            </p>
            <ul className="m-0 p-0 list-none space-y-1.5">
              {takeaways.map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-2 text-[13px] text-slate-600 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-1 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={watchFull}
                className="inline-flex items-center gap-2 bg-[#F97316] text-white font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-[#EA580C] transition shadow-lg shadow-orange-500/25 border-none cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" /> Watch full video
              </button>
              <button
                type="button"
                onClick={startJourney}
                className="inline-flex items-center gap-2 bg-white dark:bg-transparent text-slate-800 dark:text-slate-100 font-semibold px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-white/20 hover:bg-orange-50 dark:hover:bg-white/10 transition cursor-pointer"
              >
                Start your journey <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* Carousel */
function NavButton({ direction, onClick, className = "" }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={`group w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center transition-all duration-200 hover:bg-[#F97316] hover:border-[#F97316] hover:scale-105 active:scale-95 cursor-pointer ${className}`}
    >
      <Icon className="w-5 h-5 text-[#1E293B] dark:text-white transition-colors group-hover:text-white" />
    </button>
  );
}

function WatchNowCarousel({ stories, onSelect, paused, favs, onToggleFav }) {
  const { visibleCount, isMobile } = useVisibleCount();

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const pendingRef = useRef(0);
  const hoverRef = useRef(false);
  const pausedRef = useRef(paused);
  const movedRef = useRef(false);
  const dragRef = useRef({
    dragging: false,
    lastX: 0,
    startX: 0,
    startY: 0,
    axis: null,
  });

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardWidth =
    containerWidth > 0
      ? (containerWidth - GAP * (visibleCount - 1)) / visibleCount
      : 0;
  const step = cardWidth + GAP;

  const baseSet = useMemo(() => {
    if (!stories.length || step <= 0) return stories;
    const repeats = Math.max(
      1,
      Math.ceil((containerWidth + step) / (stories.length * step)),
    );
    return Array.from({ length: repeats }).flatMap(() => stories);
  }, [stories, containerWidth, step]);

  const setWidth = baseSet.length * step;

  const trackItems = useMemo(
    () =>
      [...baseSet, ...baseSet].map((item, i) => ({
        item,
        key: `${i}-${item.id}`,
      })),
    [baseSet],
  );

  useEffect(() => {
    if (!setWidth) return undefined;
    let raf;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      let o = offsetRef.current;

      const p = pendingRef.current;
      if (p) {
        if (Math.abs(p) < 0.5) {
          o += p;
          pendingRef.current = 0;
        } else {
          const d = p * 0.15;
          o += d;
          pendingRef.current = p - d;
        }
      }

      if (
        !hoverRef.current &&
        !pausedRef.current &&
        !dragRef.current.dragging
      ) {
        o += SPEED * dt;
      }

      o = ((o % setWidth) + setWidth) % setWidth;
      offsetRef.current = o;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-o}px,0,0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setWidth]);

  const goNext = useCallback(() => {
    pendingRef.current += step;
  }, [step]);
  const goPrev = useCallback(() => {
    pendingRef.current -= step;
  }, [step]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") goPrev();
    else if (e.key === "ArrowRight") goNext();
  };

  const onPointerDown = (e) => {
    movedRef.current = false;
    dragRef.current = {
      dragging: true,
      lastX: e.clientX,
      startX: e.clientX,
      startY: e.clientY,
      axis: null,
    };
  };

  const onPointerMove = (e) => {
    const ds = dragRef.current;
    if (!ds.dragging) return;

    if (ds.axis === null) {
      const dx0 = e.clientX - ds.startX;
      const dy0 = e.clientY - ds.startY;
      if (Math.abs(dx0) < 8 && Math.abs(dy0) < 8) return;
      ds.axis = Math.abs(dx0) > Math.abs(dy0) ? "x" : "y";
      if (ds.axis === "y") {
        ds.dragging = false;
        return;
      }
    }
    if (ds.axis === "x") {
      movedRef.current = true;
      e.preventDefault();
      offsetRef.current -= e.clientX - ds.lastX;
      ds.lastX = e.clientX;
    }
  };

  const endDrag = () => {
    dragRef.current.dragging = false;
    dragRef.current.axis = null;
  };

  const swallowClickAfterDrag = (e) => {
    if (movedRef.current) {
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  const showArrows = stories.length > 1;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
        endDrag();
      }}
      tabIndex={0}
      role="region"
      aria-label="Watch Now stories carousel"
      onKeyDown={handleKeyDown}
    >
      <div
        className="overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={trackRef}
          className="flex items-stretch select-none py-2"
          style={{ gap: `${GAP}px`, willChange: "transform" }}
        >
          {trackItems.map(({ item, key }) => (
            <div
              key={key}
              onClickCapture={swallowClickAfterDrag}
              style={{
                width: cardWidth ? `${cardWidth}px` : `${100 / visibleCount}%`,
                flexShrink: 0,
              }}
            >
              <StoryCard
                item={item}
                onOpen={() => onSelect(item)}
                liked={favs.has(String(item.id))}
                onToggleLike={() => onToggleFav(item.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {showArrows && !isMobile && (
        <>
          <NavButton
            direction="prev"
            onClick={goPrev}
            className="absolute -left-5 top-[38%] -translate-y-1/2 hidden sm:flex z-10"
          />
          <NavButton
            direction="next"
            onClick={goNext}
            className="absolute -right-5 top-[38%] -translate-y-1/2 hidden sm:flex z-10"
          />
        </>
      )}

      {showArrows && isMobile && (
        <div className="flex sm:hidden justify-center items-center gap-4 mt-3">
          <NavButton direction="prev" onClick={goPrev} />
          <NavButton direction="next" onClick={goNext} />
        </div>
      )}
    </div>
  );
}
/* ============================================================
   Section
   ============================================================ */
export default function WatchNowSection() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");
  const [selected, setSelected] = useState(null);
  const [favs, setFavs] = useState(() => new Set());
  const favsRef = useRef(favs);
  favsRef.current = favs;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
      if (Array.isArray(saved)) {
        const s = new Set(saved.map(String));
        favsRef.current = s;
        setFavs(s);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const toggleFav = useCallback((storyId) => {
    const k = String(storyId);
    const wasLiked = favsRef.current.has(k);

    const save = (set) => {
      favsRef.current = set;
      setFavs(set);
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify([...set]));
      } catch {
        /* ignore */
      }
    };

    const next = new Set(favsRef.current);
    if (wasLiked) next.delete(k);
    else next.add(k);
    save(next);

    if (!isRealId(k)) return;

    const req = wasLiked
      ? videoService.unlikeWatchNow(storyId)
      : videoService.likeWatchNow(storyId);
    req
      .then((res) => {
        const c = res.data || {};
        setStories((prev) =>
          prev.map((s) =>
            String(s.id) === k
              ? {
                  ...s,
                  views: Number(c.views ?? s.views ?? 0),
                  likes: Number(c.likes ?? s.likes ?? 0),
                }
              : s,
          ),
        );
      })
      .catch((err) => {
        console.error(
          "WatchNow like failed:",
          err.response?.status,
          err.response?.data || err.message,
        );
        const back = new Set(favsRef.current);
        if (wasLiked) back.add(k);
        else back.delete(k);
        save(back);
      });
  }, []);

  useEffect(() => {
    let active = true;
    videoService
      .getWatchNowPublished()
      .then(({ data }) => {
        if (!active) return;
        setStories(Array.isArray(data) ? data : []);
      })
      .catch((e) => console.error("WatchNow load failed", e))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const skeletons = useMemo(() => [0, 1, 2, 3], []);

  // real data when the API has published stories, otherwise dummy data
  const list = stories.length > 0 ? stories : DUMMY_STORIES;

  // categories come from the data itself
  const categories = useMemo(() => {
    const set = new Set();
    list.forEach((s) => s.category && set.add(s.category));
    return ["All", ...Array.from(set)];
  }, [list]);

  // if the active category disappears (data changed), go back to All
  useEffect(() => {
    if (!categories.includes(activeCat)) setActiveCat("All");
  }, [categories, activeCat]);

  const filtered = useMemo(
    () =>
      activeCat === "All" ? list : list.filter((s) => s.category === activeCat),
    [list, activeCat]
  );

  const catHint =
    activeCat === "All"
      ? "Real stories, demos and guides — pick a topic to see what fits you."
      : CATEGORY_INFO[activeCat] || "";

  return (
    <section
      // full-bleed: breaks out of any max-width parent and spans the whole screen
      className="relative left-1/2 -translate-x-1/2 w-screen max-w-none py-5 sm:py-6 dark:!bg-transparent"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading — same font/weight as "Explore the ILM ORA Platform" */}
        <div className="text-center mx-auto mb-4 sm:mb-5">
          <h2 className="text-3xl sm:text-[40px] font-semibold text-slate-800 dark:text-white leading-tight m-0">
            Learn Through, <span className="text-[#F97316]">Expert Sessions</span>
          </h2>
          <p className="text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 leading-snug mt-1 mb-0">
            Live sessions, career guidance, interview prep and hands-on
            projects — real stories and walkthroughs to help you build skills
            that count.
          </p>
        </div>

        {/* Category chips + what-is-this line */}
        {!loading && categories.length > 2 && (
          <div className="mb-3">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCat(c)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-semibold border cursor-pointer transition ${
                    activeCat === c
                      ? "bg-[#F97316] text-white border-[#F97316] shadow-md shadow-orange-500/25"
                      : "bg-white dark:bg-[#1a1d27] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-orange-50 dark:hover:bg-white/10"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            {catHint && (
              <p className="text-center text-[13px] text-slate-500 dark:text-slate-400 mt-2 mb-0 max-w-2xl mx-auto leading-snug">
                {catHint}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skeletons.map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
                    <WatchNowCarousel
            key={activeCat}
            stories={filtered}
            onSelect={setSelected}
            paused={!!selected}
            favs={favs}
            onToggleFav={toggleFav}
          />
        )}

        {/* View all */}
        {!loading && (
          <div className="flex justify-center mt-3">
            <button
              type="button"
              onClick={() => navigate("/watch-now")}
              className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#EA580C] transition-all hover:scale-105 shadow-lg shadow-orange-500/25 border-none cursor-pointer"
            >
              View all videos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <StoryModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}