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
  MoreVertical,
  Share2,
  Link2,
  Mail,
  Check,
  Copy,
  MessageCircle,
  Send,
} from "lucide-react";
import { useNavigate } from "@/lib/routerCompat";
import videoService from "@/services/videoService";

// Same background as the "Explore the ILM ORA Platform" section
const SECTION_BG = "#F8FAFC";

// Where the "Start your journey" button goes (change to your real route)
const START_PATH = "/courses";

// Personality Development videos: category name backend se aati hai.
// Agar aapki category ka naam "personality" se alag hai to is regex ko badlo.
const PD_CATEGORY_RE = /personality/i;
const isPdCategory = (c) => PD_CATEGORY_RE.test(String(c || ""));
// Explore More -> Personality Development page, seedha Video Section par
const PD_VIDEOS_PATH = "/personality-development?section=videos";

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

const GAP = 16; // px gap between cards
const SPEED = 45; // px per second (smaller = slower)
// card width never grows past this, so cards stay compact on big monitors
const MAX_CARD_W = 380;
// on phones the card is a fixed compact width, so the next card peeks in
const MAX_CARD_W_MOBILE = 270;

function getVisibleCount(width) {
  if (width >= 2200) return 6; // Very large monitors
  if (width >= 1800) return 5; // Large desktop / big iMac
  if (width >= 1200) return 4; // Desktop / laptop
  if (width >= 900) return 3; // iPad Pro / large tablet landscape
  if (width >= 641) return 2; // Tablets / iPad mini
  return 1; // Phones
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

// YouTube hqdefault/sddefault = 4:3 with black bars baked in.
// maxresdefault (1280x720) / mqdefault (320x180) = true 16:9 -> fills the card.
function ytCandidates(url) {
  const m = String(url || "").match(
    /^(https?:\/\/(?:i\.ytimg\.com|img\.youtube\.com)\/vi(?:_webp)?\/[\w-]{11}\/)(?:maxres|sd|hq|mq)?default(?:_live)?\.(jpg|webp)/i,
  );
  if (!m) return null;
  return [`${m[1]}maxresdefault.${m[2]}`, `${m[1]}mqdefault.${m[2]}`];
}

/* ============================================================
   Thumbnail
   ============================================================ */
function Thumb({ thumbnail, alt }) {
  const [src, setSrc] = useState(null);
  const [altIdx, setAltIdx] = useState(0);
  useEffect(() => {
    setAltIdx(0);
  }, [src]);

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
  // true 16:9 YouTube image so it fills the whole card
  const cands = ytCandidates(src);
  const shownSrc = cands ? cands[Math.min(altIdx, cands.length - 1)] : src;

  return (
    <>
      {!cands && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="absolute inset-0 w-full h-full max-w-full scale-110 blur-xl opacity-70 pointer-events-none"
          style={{ objectFit: "cover" }}
        />
      )}
      <img
        src={shownSrc}
        alt={alt}
        loading="lazy"
        draggable={false}
        onError={() => {
          if (cands && altIdx < cands.length - 1) setAltIdx(altIdx + 1);
        }}
        className="absolute inset-0 w-full h-full max-w-full"
        style={{
          objectFit: cands ? "cover" : "contain",
          objectPosition: "center",
        }}
      />
    </>
  );
}

/* ============================================================
   Share link + Share dialog (YouTube-style)
   ============================================================ */
function getShareUrl(item) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  if (!item || item.isDummy || !isRealId(item.id)) return `${origin}/watch-now`;
  return `${origin}/watch-now?video=${encodeURIComponent(item.id)}`;
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy copy */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

function ShareModal({ item, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;

  const url = getShareUrl(item);
  const text = item.quote || "Watch this on ILM ORA";
  const eu = encodeURIComponent(url);
  const et = encodeURIComponent(text);

  const targets = [
    {
      key: "wa",
      label: "WhatsApp",
      href: `https://wa.me/?text=${et}%20${eu}`,
      bg: "bg-[#25D366]",
      icon: <MessageCircle className="w-6 h-6 text-white" />,
    },
    {
      key: "x",
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${et}&url=${eu}`,
      bg: "bg-black",
      icon: <span className="text-white text-lg font-bold">X</span>,
    },
    {
      key: "fb",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${eu}`,
      bg: "bg-[#1877F2]",
      icon: <span className="text-white text-2xl font-bold leading-none">f</span>,
    },
    {
      key: "tg",
      label: "Telegram",
      href: `https://t.me/share/url?url=${eu}&text=${et}`,
      bg: "bg-[#229ED9]",
      icon: <Send className="w-5 h-5 text-white" />,
    },
    {
      key: "mail",
      label: "Email",
      href: `mailto:?subject=${et}&body=${et}%0A${eu}`,
      bg: "bg-slate-500",
      icon: <Mail className="w-5 h-5 text-white" />,
    },
  ];

  const handleCopy = async () => {
    const ok = await copyText(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";
  const nativeShare = () => {
    navigator.share({ title: text, text, url }).catch(() => {});
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Share video"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-[#1a1d27] rounded-2xl shadow-2xl p-5"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-transparent flex items-center justify-center border-none cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition"
        >
          <X className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </button>

        <h3 className="m-0 text-base font-semibold text-slate-900 dark:text-white">
          Share
        </h3>
        <p
          className="mt-1 mb-4 text-[12.5px] text-slate-500 dark:text-slate-400 truncate pr-8"
          title={text}
        >
          {text}
        </p>

        <div className="flex items-start gap-3 overflow-x-auto pb-2">
          {targets.map((t) => (
            <a
              key={t.key}
              href={t.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 shrink-0 w-16 no-underline"
            >
              <span
                className={`w-12 h-12 rounded-full ${t.bg} flex items-center justify-center shadow-md hover:scale-105 transition-transform`}
              >
                {t.icon}
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                {t.label}
              </span>
            </a>
          ))}
          {canNativeShare && (
            <button
              type="button"
              onClick={nativeShare}
              className="flex flex-col items-center gap-1.5 shrink-0 w-16 bg-transparent border-none cursor-pointer p-0"
            >
              <span className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center hover:scale-105 transition-transform">
                <Share2 className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                More
              </span>
            </button>
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/15 p-1.5 pl-3">
          <Link2 className="w-4 h-4 shrink-0 text-slate-400" />
          <input
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-[13px] text-slate-700 dark:text-slate-200"
          />
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold border-none cursor-pointer transition ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-[#F97316] text-white hover:bg-[#EA580C]"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ============================================================
   Three-dot menu on every card (opens in a portal so card
   overflow / carousel transform can never clip it)
   ============================================================ */
function CardMenu({ onShare }) {
  const [pos, setPos] = useState(null);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!pos) return undefined;
    const close = () => setPos(null);
    const onDoc = (e) => {
      if (menuRef.current?.contains(e.target)) return;
      if (btnRef.current?.contains(e.target)) return;
      close();
    };
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [pos]);

  const toggle = (e) => {
    e.stopPropagation();
    if (pos) {
      setPos(null);
      return;
    }
    const r = btnRef.current.getBoundingClientRect();
    const W = 176;
    const H = 52;
    const left = Math.max(8, Math.min(r.right - W, window.innerWidth - W - 8));
    const top = r.bottom + 4 + H > window.innerHeight ? r.top - H - 4 : r.bottom + 4;
    setPos({ left, top });
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label="More options"
        aria-haspopup="menu"
        aria-expanded={!!pos}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={toggle}
        className="w-7 h-7 shrink-0 rounded-full bg-transparent border-none cursor-pointer flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {pos &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ position: "fixed", left: pos.left, top: pos.top, width: 176 }}
            className="z-[110] py-1.5 bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-xl shadow-[0_10px_30px_rgba(15,23,42,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setPos(null);
                onShare();
              }}
              className="flex items-center gap-2.5 w-full text-left px-3.5 py-2 text-[13px] bg-transparent border-none cursor-pointer text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}

/* ============================================================
   Card
   ============================================================ */
function StoryCard({ item, onOpen, liked, onToggleLike, onShare }) {
  const views = item.views ?? item.viewCount ?? item.view_count ?? 0;
  const likes = Number(item.likes ?? item.likeCount ?? item.like_count ?? 0) || 0;

  return (
    <article
      onClick={onOpen}
      className="group h-full flex flex-col bg-white dark:bg-[#1a1d27] border border-slate-200/80 dark:border-white/10 rounded-2xl p-1.5 cursor-pointer shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Thumbnail (inset, rounded) */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black">
        <Thumb thumbnail={item.thumbnail} alt={item.title || item.personName} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {item.category && (
          <span className="absolute top-2 left-2 max-w-[70%] truncate text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/80 text-slate-800 backdrop-blur-md border border-white/70 shadow-md">
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
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md border-none cursor-pointer hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "text-red-500 fill-red-500" : "text-slate-500"
            }`}
          />
        </button>

        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="w-4 h-4 text-[#F97316] fill-[#F97316] ml-0.5" />
          </span>
        </span>

        {item.duration && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/70 text-white">
            <Clock className="w-3 h-3" /> {item.duration}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-2 pt-2 pb-1.5">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0 flex-1">
            <h3 className="m-0 text-sm font-normal text-slate-900 dark:text-slate-100 truncate leading-snug">
              {item.quote}
            </h3>
            {item.summary && (
              <p className="mt-0.5 mb-0 text-[12px] leading-snug text-slate-500 dark:text-slate-400 truncate">
                {item.summary}
              </p>
            )}
          </div>
          <CardMenu onShare={() => onShare?.(item)} />
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-6 h-6 shrink-0 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
              {initials(item.personName)}
            </span>
            <span className="text-[12px] font-medium text-slate-600 dark:text-slate-300 truncate">
              {item.personName}
            </span>
          </div>

          <span className="inline-flex items-center gap-2.5 shrink-0 text-[12px] text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              {formatViews(likes)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
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
    <div className="h-full bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-2xl p-1.5">
      <div className="aspect-video rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
      <div className="px-2 pt-2 pb-1.5 space-y-2">
        <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-5 w-1/2 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
    </div>
  );
}

/* ============================================================
   Journey modal — opens on card click
   ============================================================ */
function StoryModal({ item, onClose, onShare }) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white dark:bg-[#1a1d27] rounded-2xl sm:rounded-3xl shadow-2xl"
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
              className="group relative w-full max-w-full aspect-video overflow-hidden rounded-2xl cursor-pointer bg-black"
            >
              <Thumb thumbnail={item.thumbnail} alt={item.personName} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  <Play className="w-5 h-5 text-[#F97316] fill-[#F97316] ml-0.5" />
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
          <div className="p-4 md:p-5 md:pl-3 flex flex-col min-w-0">
            {item.category && (
              <span className="self-start text-[11px] font-semibold px-3 py-1 rounded-full bg-orange-50 text-[#F97316] dark:bg-orange-500/15">
                {item.category}
              </span>
            )}
            <h3
              className="mt-2 mb-1 text-lg font-normal text-slate-900 dark:text-white leading-snug"
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

            <p className="mt-3 mb-1.5 text-[13px] font-normal text-slate-800 dark:text-slate-100">
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

            <div className="mt-4 pt-1 flex flex-wrap gap-2.5">
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
              <button
                type="button"
                onClick={() => onShare?.(item)}
                aria-label="Share video"
                className="inline-flex items-center gap-2 bg-transparent text-slate-600 dark:text-slate-300 font-semibold px-3 py-2.5 rounded-xl text-sm border-none hover:text-[#F97316] transition cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> Share
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

function WatchNowCarousel({
  stories,
  onSelect,
  paused,
  favs,
  onToggleFav,
  onShare,
}) {
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

  const rawCardWidth =
    containerWidth > 0
      ? (containerWidth - GAP * (visibleCount - 1)) / visibleCount
      : 0;
  // compact cards: capped on phones and on very large screens
  const cardWidth = rawCardWidth
    ? Math.min(rawCardWidth, isMobile ? MAX_CARD_W_MOBILE : MAX_CARD_W)
    : 0;
  const step = cardWidth + GAP;

  // cards already screen par fit ho rahe hain -> no marquee, no duplicates
  const isStatic = stories.length <= visibleCount;

  const baseSet = useMemo(() => {
    if (isStatic || !stories.length || step <= 0) return stories;
    const repeats = Math.max(
      1,
      Math.ceil((containerWidth + step) / (stories.length * step)),
    );
    return Array.from({ length: repeats }).flatMap(() => stories);
  }, [stories, containerWidth, step, isStatic]);

  const setWidth = baseSet.length * step;

  const trackItems = useMemo(
    () =>
      (isStatic ? baseSet : [...baseSet, ...baseSet]).map((item, i) => ({
        item,
        key: `${i}-${item.id}`,
      })),
    [baseSet, isStatic],
  );

  useEffect(() => {
    if (!setWidth || isStatic) return undefined;
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
  }, [setWidth, isStatic]);

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
    if (isStatic) return;
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

  const showArrows = !isStatic;

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
          style={{
            gap: `${GAP}px`,
            willChange: isStatic ? "auto" : "transform",
            justifyContent: isStatic ? "center" : "flex-start",
            transform: isStatic ? "none" : undefined,
          }}
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
                onShare={onShare}
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
/* Personality Development videos ke just niche: Explore More */
function PdExploreMore() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-1.5 mt-4">
      <p className="text-[12px] sm:text-[13px] text-slate-500 dark:text-slate-400 m-0 text-center">
        Want more on personality development? Lessons, a 30-day plan and more videos.
      </p>
      <button
        type="button"
        onClick={() => navigate(PD_VIDEOS_PATH)}
        className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#EA580C] transition-all hover:scale-105 shadow-lg shadow-orange-500/25 border-none cursor-pointer"
      >
        Explore More <ArrowRight className="w-4 h-4" />
      </button>
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
  const [shareItem, setShareItem] = useState(null);
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

  const openShare = useCallback((item) => setShareItem(item), []);
  const closeShare = useCallback(() => setShareItem(null), []);

  return (
    <section
      // full-bleed: breaks out of any max-width parent and spans the whole screen
      className="relative left-1/2 -translate-x-1/2 w-screen max-w-none py-4 sm:py-5 overflow-x-clip dark:!bg-transparent"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-10">
        {/* Full-width white box: heading + subheading, each on one line */}
        <div className="text-center mb-3 relative left-1/2 -translate-x-1/2 w-screen max-w-none rounded-none border-y border-x-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm px-4 sm:px-6 py-2.5 overflow-hidden">
          <h2 className="text-base sm:text-xl md:text-2xl font-normal text-slate-800 dark:text-white leading-tight m-0 truncate">
            Learn Through, <span className="text-[#F97316]">Expert Sessions</span>
          </h2>
          <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400 leading-snug mt-0.5 mb-0 truncate">
            Live sessions, career guidance, interview prep and hands-on
            projects — real stories and walkthroughs to help you build skills
            that count.
          </p>
        </div>

        {/* Category chips + what-is-this line */}
        {!loading && categories.length > 2 && (
          <div className="mb-3">
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveCat(c)}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold border cursor-pointer transition ${
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
              <p className="text-center text-[12px] sm:text-[13px] text-slate-500 dark:text-slate-400 mt-2 mb-0 max-w-2xl mx-auto leading-snug">
                {catHint}
              </p>
            )}
          </div>
        )}

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {skeletons.map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <WatchNowCarousel
            key={activeCat}
            stories={filtered}
            onSelect={setSelected}
            paused={!!selected || !!shareItem}
            favs={favs}
            onToggleFav={toggleFav}
            onShare={openShare}
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

        {/* Personality Development videos ke just niche */}
        {!loading && isPdCategory(activeCat) && <PdExploreMore />}
      </div>

      <StoryModal
        item={selected}
        onClose={() => setSelected(null)}
        onShare={openShare}
      />
      <ShareModal item={shareItem} onClose={closeShare} />
    </section>
  );
}