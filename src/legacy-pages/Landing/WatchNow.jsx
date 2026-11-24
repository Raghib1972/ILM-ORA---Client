"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Play,
  Heart,
  Eye,
  Clock,
  X,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  MoreVertical,
  Share2,
  Link2,
  Mail,
  Check,
  Copy,
  MessageCircle,
  Send,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useNavigate } from "@/lib/routerCompat";
import videoService from "@/services/videoService";
// Same shared shell (navbar + footer) used by Whiteboard, Careers, Pricing etc.
// Path Whiteboard file jaisa hi rakha hai. Agar WatchNow alag folder mein hai to path adjust karna.
import PublicLayout from "../Landing/components/PublicLayout";

// Same background as the "Explore the ILM ORA Platform" section
const SECTION_BG = "#F8FAFC";

// Where the "Start your journey" button goes (change to your real route)
const START_PATH = "/courses";

// Page (grid) variant: how many cards per "Load more" step
const PAGE_SIZE = 12;

// favourites (heart) are remembered in this browser; counts live in the backend
const FAV_KEY = "watchnow_favs";
// same video opened again within this window is not counted twice
const VIEW_DEDUPE_MS = 30 * 1000;
const VIEWED_KEY = "watchnow_viewed";
const isRealId = (id) => !String(id).startsWith("dummy-");

// a video this short (seconds) or shorter is treated as a "Short"
const SHORT_MAX_SEC = 60;

// localStorage key jisme app ka theme save hota hai (apne app ke key se match karo)
const THEME_KEY = "theme";

// Personality Development videos: category name backend se aati hai.
// Agar aapki category ka naam "personality" se alag hai to is regex ko badlo.
const PD_CATEGORY_RE = /personality/i;
const isPdCategory = (c) => PD_CATEGORY_RE.test(String(c || ""));
// Explore More -> Personality Development page, seedha Video Section par
const PD_VIDEOS_PATH = "/personality-development?section=videos";

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
   stories. Real data always wins. Delete this block (and the
   fallback in WatchNowSection) if you don't want dummy cards.
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
   parseVideoUrl — detects YouTube (watch/shorts/embed), Vimeo,
   or a direct video file URL, and returns either
   { type: "iframe", url } or { type: "video", url }.
   ============================================================ */
function parseVideoUrl(rawUrl) {
  if (!rawUrl) return null;
  const url = rawUrl.trim();

  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([\w-]{11})/,
  );
  if (ytMatch) {
    return {
      type: "iframe",
      url: `https://www.youtube.com/embed/${ytMatch[1]}`,
    };
  }

  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return {
      type: "iframe",
      url: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  if (/\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url)) {
    return { type: "video", url };
  }

  // Unknown format — best effort, treat as embeddable iframe
  return { type: "iframe", url };
}

/* ============================================================
   getVideoSourceUrl — resolves whichever URL field is present:
   an uploaded file (presigned URL from backend, async) or an
   external YouTube/Vimeo/direct link.
   ============================================================ */
async function getVideoSourceUrl(item) {
  if (item.videoFileName) {
    return await videoService.getWatchNowStreamUrl(item.videoFileName);
  }
  return item.externalVideoUrl || "";
}

/* ============================================================
   WatchNowSmartPlayer — <video> for uploaded/direct files,
   <iframe> for YouTube/Vimeo. Mounted only while playing, so
   unmounting it stops playback immediately.
   ============================================================ */
function WatchNowSmartPlayer({ item, onEnded }) {
  const [rawUrl, setRawUrl] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let active = true;
    setRawUrl(null);
    getVideoSourceUrl(item)
      .then((url) => {
        if (active) setRawUrl(url);
      })
      .catch((err) =>
        console.error(
          "Video URL fetch failed:",
          err.response?.status,
          err.response?.data || err.message,
        ),
      );
    return () => {
      active = false;
    };
    // depend on the video source, not the whole object (counts change it)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id, item.videoFileName, item.externalVideoUrl]);

  // Explicit destroy-on-unmount for <video> sources.
  useEffect(() => {
    return () => {
      const videoEl = videoRef.current;
      if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
      }
    };
  }, []);

  if (!rawUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black rounded-2xl">
        <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-[#F97316] animate-spin" />
      </div>
    );
  }

  if (item.videoFileName) {
    return (
      <video
        ref={videoRef}
        src={rawUrl}
        controls
        autoPlay
        playsInline
        onEnded={onEnded}
        className="w-full h-full rounded-2xl bg-black object-contain"
      />
    );
  }

  const parsed = parseVideoUrl(rawUrl);
  if (!parsed) return null;

  if (parsed.type === "video") {
    return (
      <video
        ref={videoRef}
        src={parsed.url}
        controls
        autoPlay
        playsInline
        onEnded={onEnded}
        className="w-full h-full rounded-2xl bg-black object-cover"
      />
    );
  }

  const sep = parsed.url.includes("?") ? "&" : "?";
  return (
    <iframe
      src={`${parsed.url}${sep}autoplay=1`}
      title={item.personName || "WatchNow video"}
      className="w-full h-full rounded-2xl bg-black"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

/* ============================================================
   Helpers
   ============================================================ */
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
  if (num >= 1_000_000)
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(num);
}

const getViews = (s) => Number(s.views ?? s.viewCount ?? s.view_count ?? 0) || 0;
const getLikes = (s) => Number(s.likes ?? s.likeCount ?? s.like_count ?? 0) || 0;
const getShares = (s) =>
  Number(s.shares ?? s.shareCount ?? s.share_count ?? 0) || 0;
const getTime = (s) =>
  Date.parse(s.createdAt ?? s.publishedAt ?? s.created_at ?? "") || 0;

// "4:32" or "1:02:03" -> seconds
function durationToSec(d) {
  if (!d) return 0;
  const parts = String(d).split(":").map(Number);
  if (parts.some((n) => Number.isNaN(n))) return 0;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

// Short = explicit flag, a /shorts/ link, or duration <= 60s
function isShortVideo(s) {
  const vt = String(s.videoType ?? s.type ?? "").toLowerCase();
  if (vt === "short") return true;
  if (vt === "long") return false;
  if (s.isShort === true) return true;
  if (/youtube\.com\/shorts\//i.test(s.externalVideoUrl || "")) return true;
  const sec = durationToSec(s.duration);
  return sec > 0 && sec <= SHORT_MAX_SEC;
}

const AVATAR_COLORS = [
  "bg-emerald-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-fuchsia-500",
  "bg-sky-500",
];
function avatarColor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h + name.charCodeAt(i)) % 997;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

/* ============================================================
   CAROUSEL CONFIG
   ============================================================ */
const GAP = 16; // px gap between cards, also used in width math
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
   Thumbnail (uploaded thumbnails need an async presigned URL)
   `spinner` -> dark gradient + spinner while loading (page grid)
   ============================================================ */
function Thumb({ thumbnail, alt, spinner = false, portrait = false }) {
  const [src, setSrc] = useState(null);
  const [altIdx, setAltIdx] = useState(0);
  useEffect(() => {
    setAltIdx(0);
  }, [src]);

  useEffect(() => {
    let active = true;
    setSrc(null);
    if (!thumbnail) return undefined;
    Promise.resolve(videoService.getWatchNowStreamUrl(thumbnail))
      .then((u) => active && setSrc(u))
      .catch((err) => {
        console.error(
          "Thumbnail URL fetch failed:",
          err.response?.status,
          err.response?.data || err.message,
        );
        if (active) setSrc("");
      });
    return () => {
      active = false;
    };
  }, [thumbnail]);

  // no thumbnail (or it failed) -> branded gradient
  if (!thumbnail || src === "") {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-purple-600" />
    );
  }
  if (!src) {
    if (spinner) {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-blue-900 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white/70 animate-spin" />
        </div>
      );
    }
    return (
      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
    );
  }
  // landscape cards -> use a true 16:9 YouTube image so it fills the whole card
  const cands = !portrait ? ytCandidates(src) : null;
  const shownSrc = cands ? cands[Math.min(altIdx, cands.length - 1)] : src;

  // portrait (Shorts) card -> center-crop to fill the whole 9:16 card, like YouTube Shorts
  return (
    <>
      {!portrait && !cands && (
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
          objectFit: portrait || cands ? "cover" : "contain",
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
   Story card (carousel / homepage) — click opens the modal
   ============================================================ */
function StoryCard({ item, onOpen, liked, onToggleLike, onShare }) {
  const views = getViews(item);
  const likes = getLikes(item);

  return (
    <article
      onClick={onOpen}
      className="group h-full flex flex-col bg-white dark:bg-[#1a1d27] border border-slate-200/80 dark:border-white/10 rounded-2xl p-1.5 cursor-pointer shadow-[0_2px_10px_rgba(15,23,42,0.06)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black">
        <Thumb thumbnail={item.thumbnail} alt={item.personName} />
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

/* ============================================================
   Page card (uniform grid on /watch-now) — every card has the
   same width AND the same thumbnail ratio, so all sizes match.
   ============================================================ */
function PageCard({ item, liked, onToggleLike, onOpen, onShare, short = false }) {
  const views = getViews(item);
  const likes = getLikes(item);

  return (
    <article
      onClick={onOpen}
      className="group h-full flex flex-col bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden cursor-pointer shadow-[0_1px_4px_rgba(15,23,42,0.05)] hover:shadow-[0_10px_28px_rgba(15,23,42,0.12)] transition-shadow duration-300"
    >
      {/* fixed ratio -> identical thumbnail size on every card */}
      <div
        className={`relative w-full shrink-0 overflow-hidden bg-black ${
          short ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <Thumb
          thumbnail={item.thumbnail}
          alt={item.personName}
          spinner
          portrait={short}
        />

        {/* play badge appears on hover — these are videos */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
          <span className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
            <Play className="w-4 h-4 text-[#F97316] fill-[#F97316] ml-0.5" />
          </span>
        </span>

        <button
          type="button"
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md border-none cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              liked ? "text-red-500 fill-red-500" : "text-slate-500"
            }`}
          />
        </button>

        {item.duration && (
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-black/70 text-white">
            <Clock className="w-3 h-3" /> {item.duration}
          </span>
        )}
      </div>

      <div className="pl-3 pr-1.5 pt-2 pb-2.5 mt-auto">
        <div className="flex items-center justify-between gap-1">
          <h3 className="m-0 min-w-0 flex-1 text-[13px] font-normal text-slate-900 dark:text-slate-100 truncate">
            {item.quote}
          </h3>
          <CardMenu onShare={() => onShare?.(item)} />
        </div>
        <div className="mt-1.5 pr-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-6 h-6 shrink-0 rounded-full ${avatarColor(
                item.personName,
              )} text-white text-[9px] font-bold flex items-center justify-center`}
            >
              {initials(item.personName)}
            </span>
            <span className="text-[12px] text-slate-500 dark:text-slate-400 truncate">
              {item.personName}
            </span>
          </div>
          <span className="inline-flex items-center gap-2.5 shrink-0 text-[12px] text-slate-400">
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

/* ============================================================
   Journey modal — details + inline video player
   ============================================================ */
function StoryModal({ item, onClose, liked, onToggleLike, onShare }) {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  // new item -> back to preview state
  useEffect(() => {
    setPlaying(false);
    // only when a different video is opened (not when its counts change)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id]);

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

  const hasVideo = !item.isDummy && (item.videoFileName || item.externalVideoUrl);

  const watch = () => {
    if (hasVideo) {
      setPlaying(true);
    } else {
      // dummy card (no real video) -> full page
      onClose();
      navigate("/watch-now");
    }
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
          {/* Preview / player */}
          <div className="p-3 min-w-0 overflow-hidden">
            <div
              className={`group relative max-w-full overflow-hidden rounded-2xl bg-black mx-auto ${
                isShortVideo(item)
                  ? "aspect-[9/16] w-full max-w-[300px]"
                  : "aspect-video w-full"
              }`}
            >
              {playing ? (
                <WatchNowSmartPlayer
                  item={item}
                  onEnded={() => setPlaying(false)}
                />
              ) : (
                <div onClick={watch} className="absolute inset-0 cursor-pointer">
                  <Thumb
                    thumbnail={item.thumbnail}
                    alt={item.personName}
                    portrait={isShortVideo(item)}
                  />
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

            <div className="flex flex-wrap items-center gap-4 mb-3 text-[13px] text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {formatViews(getViews(item))} views
              </span>
              <button
                type="button"
                onClick={onToggleLike}
                aria-label={liked ? "Remove from favourites" : "Add to favourites"}
                className="inline-flex items-center gap-1.5 p-0 bg-transparent border-none cursor-pointer text-inherit hover:text-red-500 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${liked ? "text-red-500 fill-red-500" : ""}`}
                />
                {formatViews(getLikes(item))} likes
              </button>
              <button
                type="button"
                onClick={() => onShare?.(item)}
                aria-label="Share video"
                className="inline-flex items-center gap-1.5 p-0 bg-transparent border-none cursor-pointer text-inherit hover:text-[#F97316] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <p
              className="m-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
              style={{ overflowWrap: "anywhere" }}
            >
              {about}
            </p>

            <p className="mt-3 mb-0 inline-flex items-center gap-1.5 text-[12.5px] text-slate-500 dark:text-slate-400">
              <Users className="w-4 h-4 text-[#F97316]" />
              Best for:{" "}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {audience}
              </span>
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
              {!playing && (
                <button
                  type="button"
                  onClick={watch}
                  className="inline-flex items-center gap-2 bg-[#F97316] text-white font-semibold px-4 py-2.5 rounded-xl text-sm hover:bg-[#EA580C] transition shadow-lg shadow-orange-500/25 border-none cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch full video
                </button>
              )}
              <button
                type="button"
                onClick={startJourney}
                className={`inline-flex items-center gap-2 font-semibold px-4 py-2.5 rounded-xl text-sm transition cursor-pointer ${
                  playing
                    ? "bg-[#F97316] text-white border-none hover:bg-[#EA580C] shadow-lg shadow-orange-500/25"
                    : "bg-white dark:bg-transparent text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-white/20 hover:bg-orange-50 dark:hover:bg-white/10"
                }`}
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

/* ============================================================
   Nav button + dots
   ============================================================ */
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

function DotPagination({ count, activeIndex, onDotClick }) {
  if (count <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-2 mt-2">
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onDotClick(idx)}
          aria-label={`Go to slide ${idx + 1}`}
          className={`h-2 rounded-full border-none p-0 cursor-pointer transition-all duration-300 ${
            idx === activeIndex
              ? "w-6 bg-[#F97316]"
              : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}

/* ============================================================
   Carousel — continuous marquee (like "Explore more on ILM ORA").
   Glides smoothly, pauses on hover / drag / modal open.
   Drag, swipe and arrows still work.
   ============================================================ */
const SPEED = 45; // px per second — chhota = slow, bada = fast

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
  const offsetRef = useRef(0); // current scroll position (px)
  const pendingRef = useRef(0); // arrow-click distance still to glide
  const hoverRef = useRef(false);
  const pausedRef = useRef(paused);
  const movedRef = useRef(false); // last pointer gesture was a drag
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

  // Measure container width responsively
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

  // One "set" is repeated until it is wider than the screen,
  // then rendered twice so the loop never shows a gap.
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

  // Animation loop
  useEffect(() => {
    if (!setWidth || isStatic) return undefined;
    let raf;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      let o = offsetRef.current;

      // arrow click -> smooth glide
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

      // constant auto movement
      if (
        !hoverRef.current &&
        !pausedRef.current &&
        !dragRef.current.dragging
      ) {
        o += SPEED * dt;
      }

      o = ((o % setWidth) + setWidth) % setWidth; // seamless wrap
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

  // Drag / swipe (pointer events cover mouse + touch)
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
        ds.dragging = false; // let the page scroll vertically
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

  // swallow the click that follows a drag so the modal doesn't open
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

function ViewAllButton() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate("/watch-now")}
      className="inline-flex items-center justify-center gap-2 bg-[#F97316] text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-[#EA580C] transition-all hover:scale-105 shadow-lg shadow-orange-500/25 border-none cursor-pointer"
    >
      View all videos <ArrowRight className="w-4 h-4" />
    </button>
  );
}

/* ============================================================
   Format tabs (Home / Videos / Shorts) — YouTube channel style.
   Format = how long the video is. Topic chips sit below it.
   ============================================================ */
const FORMAT_TABS = [
  { key: "home", label: "Home" },
  { key: "videos", label: "Videos" },
  { key: "shorts", label: "Shorts" },
];

function FormatTabs({ tab, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Video format"
      className="mb-3 flex items-center gap-1 sm:gap-2 border-b border-slate-200 dark:border-white/10"
    >
      {FORMAT_TABS.map((t) => {
        const active = tab === t.key;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.key)}
            className={`relative px-4 py-2.5 text-[13px] sm:text-sm font-medium bg-transparent border-none cursor-pointer transition-colors ${
              active
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {t.label}
            {active && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-slate-900 dark:bg-white" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   Page toolbar — filter tabs (left) + Daily picks dropdown (right)
   ============================================================ */
const TABS = [
  { key: "all", label: "All" },
  { key: "viewed", label: "Most Viewed" },
  { key: "latest", label: "Latest" },
  { key: "liked", label: "Most Liked" },
  { key: "favourite", label: "My Favourite" },
  { key: "trending", label: "Trending" },
];

const PICKS_PRIMARY = [
  { key: "trending", label: "Trending" },
  { key: "today", label: "Today's posts" },
  { key: "latest", label: "New" },
];
const PICKS_SECONDARY = [
  { key: "viewed", label: "Most viewed" },
  { key: "liked", label: "Most liked" },
  { key: "shared", label: "Most shared" },
];

function PicksMenu({ sortKey, onPick }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const renderItem = (o) => (
    <button
      key={o.key}
      type="button"
      onClick={() => {
        onPick(o.key);
        setOpen(false);
      }}
      className={`block w-full text-left px-3.5 py-2 text-[13px] bg-transparent border-none cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-white/10 ${
        sortKey === o.key
          ? "text-[#F97316] font-semibold"
          : "text-slate-500 dark:text-slate-300"
      }`}
    >
      {o.label}
    </button>
  );

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium bg-white dark:bg-[#1a1d27] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 transition"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Daily picks
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-44 py-1.5 z-30 bg-white dark:bg-[#1a1d27] border border-slate-200 dark:border-white/10 rounded-xl shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
        >
          {PICKS_PRIMARY.map(renderItem)}
          <div className="my-1.5 border-t border-slate-200 dark:border-white/10" />
          {PICKS_SECONDARY.map(renderItem)}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Page grid (uniform) + Load more — used on /watch-now
   ============================================================ */
function WatchNowGrid({
  items,
  favs,
  onToggleFav,
  onSelect,
  onShare,
  sortKey,
  onSortChange,
  emptyText,
  short = false,
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  // filter/sort changed -> start from the first page again
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [sortKey, items.length]);

  const shown = items.slice(0, visible);
  const hasMore = visible < items.length;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => onSortChange(t.key)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-medium border cursor-pointer transition ${
                sortKey === t.key
                  ? "bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-300 dark:border-indigo-400/30"
                  : "bg-white dark:bg-[#1a1d27] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <PicksMenu sortKey={sortKey} onPick={onSortChange} />
      </div>

      {/* Uniform grid — all cards same width + same height */}
      {shown.length === 0 ? (
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-14">
          {sortKey === "favourite"
            ? "No favourites yet — tap the heart on any video to save it here."
            : emptyText || "Nothing to show here yet."}
        </p>
      ) : (
        <div
          className={`grid gap-3 sm:gap-4 items-stretch ${
            short
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[1800px]:grid-cols-6"
              : "grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1800px]:grid-cols-5 min-[2200px]:grid-cols-6"
          }`}
        >
          {shown.map((item) => (
            <PageCard
              short={short}
              key={item.id}
              item={item}
              liked={favs.has(String(item.id))}
              onToggleLike={() => onToggleFav(item.id)}
              onOpen={() => onSelect(item)}
              onShare={onShare}
            />
          ))}
        </div>
      )}

      {/* Load more */}
      {items.length > 0 && (
        <div className="flex flex-col items-center mt-6 mb-2">
          <button
            type="button"
            disabled={!hasMore}
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className={`px-8 py-2.5 rounded-xl text-sm font-medium border transition ${
              hasMore
                ? "bg-white dark:bg-[#1a1d27] text-slate-800 dark:text-slate-100 border-slate-300 dark:border-white/20 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10"
                : "bg-slate-100 dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10 cursor-default"
            }`}
          >
            {hasMore ? "Load more visuals →" : "Showing all visuals"}
          </button>
          <p className="mt-2 mb-0 text-xs text-slate-400">
            Sign up free to unlock unlimited access
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   WatchNowSection — used on the homepage and on /watch-now.
   - variant "carousel": homepage carousel
   - variant "page":     full gallery grid (auto when path is /watch-now)
   Fetches published stories, filters by category, opens the
   journey modal on click (also for /watch-now?video=<id>).
   ============================================================ */
export default function WatchNowSection({
  id = "watch-now",
  variant,
  // PublicLayout ke liye (Whiteboard page jaisa)
  theme = "light",
  toggleTheme,
  scrollToSection,
  setShowLoginModal,
}) {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");
  const [selected, setSelected] = useState(null);
  const [shareItem, setShareItem] = useState(null);
  const [sortKey, setSortKey] = useState("all");
  const [fmtTab, setFmtTab] = useState("home");
    const [favs, setFavs] = useState(() => new Set());
  const deepLinkHandled = useRef(false);

  // Parent theme/toggleTheme de to wahi use hoga, warna yahan khud sambhalo
  const [localTheme, setLocalTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch {
      /* ignore */
    }
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  useEffect(() => {
    if (toggleTheme) return; // parent manage kar raha hai
    const root = document.documentElement;
    root.classList.toggle("dark", localTheme === "dark");
    root.setAttribute("data-theme", localTheme);
    try {
      localStorage.setItem(THEME_KEY, localTheme);
    } catch {
      /* ignore */
    }
  }, [localTheme, toggleTheme]);

  const effectiveTheme = toggleTheme ? theme : localTheme;
  const effectiveToggleTheme =
    toggleTheme ||
    (() => setLocalTheme((p) => (p === "dark" ? "light" : "dark")));

  // explicit prop wins; otherwise /watch-now* = page layout
  const [isPage, setIsPage] = useState(() => {
    if (variant) return variant === "page";
    return (
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/watch-now")
    );
  });

  // client-side navigation par URL render ke baad update hota hai,
  // isliye mount ke baad dobara check karo
  useEffect(() => {
    if (variant) {
      setIsPage(variant === "page");
      return;
    }
    setIsPage(window.location.pathname.startsWith("/watch-now"));
  }, [variant]);

  useEffect(() => {
    let active = true;
    videoService
      .getWatchNowPublished()
      .then(({ data }) => {
        if (active) setStories(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to load WatchNow stories", err))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  // real data when the API has published stories, otherwise dummy data
  const list = stories.length > 0 ? stories : DUMMY_STORIES;

  // keep the latest favourites readable inside callbacks
  const favsRef = useRef(favs);
  favsRef.current = favs;

  // load saved hearts once (browser only)
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

  // put the real { views, likes } from the backend into the list + open modal
  const patchCounts = useCallback((storyId, counts) => {
    if (!counts) return;
    const merge = (s) =>
      String(s.id) === String(storyId)
        ? {
            ...s,
            views: Number(counts.views ?? s.views ?? 0),
            likes: Number(counts.likes ?? s.likes ?? 0),
          }
        : s;
    setStories((prev) => prev.map(merge));
    setSelected((prev) => (prev ? merge(prev) : prev));
  }, []);

  // open the modal + count one view on the backend
  const openStory = useCallback(
    (item) => {
      setSelected(item);
      if (!item || item.isDummy || !isRealId(item.id)) return;

      const key = String(item.id);
      const now = Date.now();
      let seen = {};
      try {
        seen = JSON.parse(sessionStorage.getItem(VIEWED_KEY) || "{}");
      } catch {
        seen = {};
      }
      if (now - (seen[key] || 0) < VIEW_DEDUPE_MS) return;
      seen[key] = now;
      try {
        sessionStorage.setItem(VIEWED_KEY, JSON.stringify(seen));
      } catch {
        /* ignore */
      }

      videoService
        .incrementWatchNowView(item.id)
        .then((res) => patchCounts(item.id, res.data))
        .catch((err) =>
          console.error(
            "WatchNow view count failed:",
            err.response?.status,
            err.response?.data || err.message,
          ),
        );
    },
    [patchCounts],
  );

  // /watch-now?video=<id> -> open that story's modal once
  useEffect(() => {
    if (loading || deepLinkHandled.current || typeof window === "undefined")
      return;
    deepLinkHandled.current = true;
    const vid = new URLSearchParams(window.location.search).get("video");
    if (!vid) return;
    const found = list.find((s) => String(s.id) === String(vid));
    if (found) openStory(found);
  }, [loading, list]);

  // format tab first (Home = everything, Videos = long, Shorts = short)
  const tabList = useMemo(() => {
    if (fmtTab === "videos") return list.filter((s) => !isShortVideo(s));
    if (fmtTab === "shorts") return list.filter((s) => isShortVideo(s));
    return list;
  }, [list, fmtTab]);

  // topic chips only show topics that have videos in the current tab
  const categories = useMemo(() => {
    const set = new Set();
    tabList.forEach((s) => s.category && set.add(s.category));
    return ["All", ...Array.from(set)];
  }, [tabList]);

  useEffect(() => {
    if (!categories.includes(activeCat)) setActiveCat("All");
  }, [categories, activeCat]);

  const filtered = useMemo(
    () =>
      activeCat === "All"
        ? tabList
        : tabList.filter((s) => s.category === activeCat),
    [tabList, activeCat],
  );

  // page grid: apply tab / Daily picks ordering on top of the category filter
  const pageItems = useMemo(() => {
    const arr = [...filtered];
    switch (sortKey) {
      case "viewed":
        return arr.sort((a, b) => getViews(b) - getViews(a));
      case "liked":
        return arr.sort((a, b) => getLikes(b) - getLikes(a));
      case "shared":
        return arr.sort((a, b) => getShares(b) - getShares(a));
      case "trending":
        return arr.sort(
          (a, b) =>
            getViews(b) + getLikes(b) * 3 - (getViews(a) + getLikes(a) * 3),
        );
      case "latest": {
        const hasDates = arr.some((s) => getTime(s) > 0);
        return hasDates
          ? arr.sort((a, b) => getTime(b) - getTime(a))
          : arr.reverse();
      }
      case "today": {
        const hasDates = arr.some((s) => getTime(s) > 0);
        if (!hasDates) return arr;
        const today = new Date().toDateString();
        return arr.filter(
          (s) => getTime(s) > 0 && new Date(getTime(s)).toDateString() === today,
        );
      }
      case "favourite":
        return arr.filter((s) => favs.has(String(s.id)));
      default:
        return arr;
    }
  }, [filtered, sortKey, favs]);

  const toggleFav = useCallback(
    (storyId) => {
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
      save(next); // heart changes instantly

      if (!isRealId(k)) return; // dummy card -> local only

      const req = wasLiked
        ? videoService.unlikeWatchNow(storyId)
        : videoService.likeWatchNow(storyId);
      req
        .then((res) => patchCounts(storyId, res.data))
        .catch((err) => {
          console.error(
            "WatchNow like failed:",
            err.response?.status,
            err.response?.data || err.message,
          );
          // revert the heart if the backend rejected it
          const back = new Set(favsRef.current);
          if (wasLiked) back.add(k);
          else back.delete(k);
          save(back);
        });
    },
    [patchCounts],
  );

  const catHint =
    activeCat === "All"
      ? "Real stories, demos and guides — pick a topic to see what fits you."
      : CATEGORY_INFO[activeCat] || "";

  const closeModal = useCallback(() => setSelected(null), []);
  const openShare = useCallback((item) => setShareItem(item), []);
  const closeShare = useCallback(() => setShareItem(null), []);

  // Full-width white box: heading + subheading, each on one line
  const heading = (
    <div className="text-center mb-3 relative left-1/2 -translate-x-1/2 w-screen max-w-none rounded-none border-y border-x-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm px-4 sm:px-6 py-2.5 overflow-hidden">
      <h2 className="text-base sm:text-xl md:text-2xl font-normal text-slate-800 dark:text-white leading-tight m-0 truncate">
        Learn Through, <span className="text-[#F97316]">Expert Sessions</span>
      </h2>
      <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400 leading-snug mt-0.5 mb-0 truncate">
        Live sessions, career guidance, interview prep and hands-on projects —
        real stories and walkthroughs to help you build skills that count.
      </p>
    </div>
  );

  const categoryChips = !loading && categories.length > 2 && (
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
  );

  const shareDialog = <ShareModal item={shareItem} onClose={closeShare} />;

  /* ---------- Page (uniform gallery grid) ---------- */
  if (isPage) {
    const emptyText =
      fmtTab === "shorts"
        ? "No shorts yet — short videos (1 min or less) will show up here."
        : "Nothing to show here yet.";

    const content = loading ? (
      <div className="flex justify-center py-16">
        <div className="w-6 h-6 rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-[#F97316] animate-spin" />
      </div>
    ) : (
      <WatchNowGrid
        key={`${fmtTab}-${activeCat}`}
        short={fmtTab === "shorts"}
        items={pageItems}
        favs={favs}
        onToggleFav={toggleFav}
        onSelect={openStory}
        onShare={openShare}
        sortKey={sortKey}
        onSortChange={setSortKey}
        emptyText={emptyText}
      />
    );

    return (
            <PublicLayout
        theme={effectiveTheme}
        toggleTheme={effectiveToggleTheme}
        setShowLoginModal={setShowLoginModal}
        scrollToSection={scrollToSection}
      >
        <section
          id={id}
          className="w-full py-4 sm:py-6 scroll-mt-20 bg-white dark:!bg-black overflow-x-clip"
        >
          <div className="w-full max-w-[2200px] mx-auto px-3 sm:px-6 lg:px-10">
            {heading}
            <FormatTabs tab={fmtTab} onChange={setFmtTab} />
            {categoryChips}

            {content}

            {!loading && isPdCategory(activeCat) && <PdExploreMore />}
          </div>

          <StoryModal
            item={selected}
            onClose={closeModal}
            liked={!!selected && favs.has(String(selected.id))}
            onToggleLike={() => selected && toggleFav(selected.id)}
            onShare={openShare}
          />
          {shareDialog}
        </section>
      </PublicLayout>
    );
  }

  /* ---------- Homepage (carousel) ---------- */
  return (
    <section
      id={id}
      // full-bleed: breaks out of any max-width parent and spans the whole screen
      className="relative left-1/2 -translate-x-1/2 w-screen max-w-none py-4 sm:py-5 scroll-mt-20 overflow-x-clip dark:!bg-black"
      style={{ backgroundColor: SECTION_BG }}
    >
      <div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-10">
        {heading}
        {categoryChips}

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 rounded-full border-2 border-gray-200 dark:border-gray-700 border-t-[#F97316] animate-spin" />
          </div>
        ) : (
          <WatchNowCarousel
            key={activeCat}
            stories={filtered}
            onSelect={openStory}
            paused={!!selected || !!shareItem}
            favs={favs}
            onToggleFav={toggleFav}
            onShare={openShare}
          />
        )}

        {!loading && (
          <div className="flex flex-col items-center mt-3">
            <ViewAllButton />
            {isPdCategory(activeCat) && <PdExploreMore />}
          </div>
        )}
      </div>

      <StoryModal
        item={selected}
        onClose={closeModal}
        liked={!!selected && favs.has(String(selected.id))}
        onToggleLike={() => selected && toggleFav(selected.id)}
        onShare={openShare}
      />
      {shareDialog}
    </section>
  );
}