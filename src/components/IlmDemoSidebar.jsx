"use client";


import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Briefcase,
  Building2,
  GitBranch,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  ClipboardEdit,
  Code2,
  DollarSign,
  FileCode2,
  FileSearch,
  FileText,
  FolderOpen,
  GraduationCap,
  History,
  Layers,
  LayoutDashboard,
  LineChart,
  Menu,
  MessageCircleQuestion,
  MessageSquareText,
  MessageSquare,
  NotebookPen,
  PanelTop,
  PlayCircle,
  Radio,
  Receipt,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  Users,
  Video,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import React from "react";
import { Phone } from "lucide-react";
import { useLocation, useNavigate } from "@/lib/routerCompat";
import auth from "../auth";
import userService from "../services/userService";
import { useAvatarContext } from "../context/AvatarContext";
// ── Sidebar styling — colors matched 1:1 to the Workspace sidebar
// (see Student/StudentMeeting/workspace-styles.css :root /
// .workspace-shell.dark) per your instruction: same violet brand
// (#7c3aed / #a855f7 / #6d28d9), same slate text/border/muted values,
// same soft-tint active/hover states. Only the two CSS variable blocks
// below changed — none of the nav/active-detection logic below them
// was touched.
import { FONT_FAMILY } from "@/design-system";

/* ================================================================
   ILM DEMO SIDEBAR — used ONLY by IlmOraDemoPage.jsx.

   Visual style rebuilt to match the reference screenshot exactly:
     - plain white sidebar, no dark-mode variant
     - logo block with "<ROLE> PORTAL" subtitle under ILM ORA
     - flat nav items, bold dark label + icon, chevron-right for groups
     - active item = light peach background + orange text/icon
     - no footer (no theme toggle, no user card, no logout) — the
       screenshot's dark-mode toggle / avatar live in the top navbar,
       not in this sidebar
================================================================ */
const SIDEBAR_WIDTHS = {
  full: 256,
  icon: 64,
  hidden: 0,
};

// Drag-to-resize bounds for "full" mode — user can grab the right edge
// of the sidebar and drag it narrower/wider within this range.
const SIDEBAR_MIN_WIDTH = 200;
const SIDEBAR_MAX_WIDTH = 340;

/* ================================================================
   MENUS — identical to Sidebar.jsx
================================================================ */
const studentMenus = [
  {
    name: "Dashboard",
    path: "/student",
    icon: LayoutDashboard,
  },

  // ================= Learning =================
  {
    name: "Learning",
    icon: GraduationCap,
    children: [
      {
        name: "My Courses",
        path: "/student/courses",
        icon: BookOpen,
      },
      {
        name: "Video Lectures",
        path: "/student/videos",
        icon: Video,
      },
      {
        name: "Documents",
        path: "/student/documents",
        icon: FileText,
      },
      {
        name: "Assignments",
        path: "/student/assignments",
        icon: ClipboardEdit,
      },
      {
        name: "Assessments",
        path: "/student/assessments",
        icon: ClipboardCheck,
      },
      {
        name: "Quiz History",
        path: "/student/my-quizzes",
        icon: History,
      },
      {
        name: "Attendance",
        path: "/student/attendance",
        icon: CalendarDays,
      },
    ],
  },
{ name: "Roadmap", path: "/student/roadmap-upgraded", icon: GitBranch },
  // ================= Classes (dropdown) =================
  {
    name: "Classes",
    icon: Radio,
    children: [
      {
        name: "Live Classes",
        path: "/student/live-classes",
        icon: Radio,
      },
      {
        name: "Recorded Classes",
        path: "/student/recorded-classes",
        icon: PlayCircle,
      },
    ],
  },
  

  // ================= Workspace (top-level) =================
  {
    name: "Workspace",
    path: "/student/workspace",
    icon: Video,
  },

  // ================= Skill & Growth (flattened) =================
  {
    name: "Skill Map",
    path: "/student/skill-map",
    icon: Brain,
  },
  {
    name: "Certificates",
    path: "/student/certificates",
    icon: Award,
  },
  {
    name: "Study Plan",
    path: "/student/study-plan",
    icon: CalendarDays,
  },

  // ================= AI Tools (flattened) =================
  {
    name: "Notebook AI",
    path: "/student/notebook",
    icon: NotebookPen,
  },
  {
    name: "Resume Builder",
    path: "/student/resume-builder",
    icon: FileCode2,
  },
  {
    name: "Coding Lab",
    path: "/student/compiler",
    icon: FileText,
  },

  // ================= Support =================
  {
    name: "Support",
    icon: MessageCircleQuestion,
    children: [
      {
        name: "Feedback",
        path: "/student/feedback",
        icon: MessageSquare,
      },
    ],
  },
];

const trainerMenus = [
  // ═══════════════════════════════════════════════════════════════
  // 1. DASHBOARD
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Dashboard",
    path: "/trainer",
    icon: LayoutDashboard,
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. BATCH MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Batch Management",
    path: "/trainer/batches",
    icon: Layers,
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. WORKSPACE
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Workspace",
    path: "/trainer/workspace",
    icon: Video,
  },
   { name: "Roadmap", path: "/trainer/roadmap-upgraded", icon: GitBranch },

  // ═══════════════════════════════════════════════════════════════
  // 4. AI COMPANION (top-level)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "AI Companion",
    path: "/trainer/ai-companion",
    icon: Bot,
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. WHITEBOARD (top-level)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Whiteboard",
    path: "/trainer/whiteboard",
    icon: PanelTop,
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. CODING LAB (top-level)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Coding Lab",
    path: "/trainer/compiler",
    icon: Code2,
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. STUDY PLAN (top-level)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Study Plan",
    path: "/trainer/study-plan",
    icon: BookOpen,
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. CONTENT MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Content Management",
    icon: FileText,
    children: [
      {
        name: "Upload Videos",
        path: "/trainer/upload-videos",
        icon: Video,
      },
      {
        name: "Course Management",
        path: "/trainer/course-management",
        icon: BookOpen,
      },
      {
        name: "Assessments",
        path: "/trainer/assessments",
        icon: ClipboardCheck,
      },
      {
        name: "Attendance",
        path: "/trainer/attendance",
        icon: CalendarDays,
      },
      {
        name: "Doubts Management",
        path: "/trainer/doubts-management",
        icon: MessageCircleQuestion,
      },
      {
        name: "Feedback",
        path: "/trainer/feedback",
        icon: MessageSquareText,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. LIVE CLASSES
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Live Classes",
    icon: Video,
    children: [
      {
        name: "Live Dashboard",
        path: "/trainer/live",
        icon: LayoutDashboard,
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. REPORTS & ANALYTICS
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Reports & Analytics",
    icon: BarChart3,
    children: [
      {
        name: "Student Reports",
        path: "/trainer/student-reports",
        icon: FileSearch,
      },
      {
        name: "Batch Reports",
        path: "/trainer/batch-reports",
        icon: FileText,
      },
      {
        name: "Performance Analysis",
        path: "/trainer/performance",
        icon: TrendingUp,
      },
      {
        name: "Skill Analytics",
        path: "/trainer/skill-analytics",
        icon: Brain,
      },
    ],
  },
];

const adminMenus = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "WorkSpace", path: "/admin/workspace", icon: Video },
  {
    name: "Organisation Manager",
    icon: Building2,
    path: "/admin/organisation-overview",
  },
   {
    name: "Access Control",
    icon: ShieldCheck,
    path: "/admin/access-control",
  },
  { name: "Roadmap", icon: GitBranch, path: "/admin/roadmap-upgraded" },
   
  {
    name: "Assessment System",
    icon: ClipboardCheck,
    path: "/admin/assessment-system",
  },
  {
    name: "Course Management",
    icon: BookOpen,
    children: [{ name: "All Courses", path: "/admin/courses", icon: BookOpen }],
  },
  {
    name: "Video Management",
    icon: Video,
    children: [{ name: "Admin Videos", path: "/admin/videos", icon: Video }],
  },
  {
    name: "File Management",
    icon: FileText,
    children: [{ name: "Admin Files", path: "/admin/files", icon: FileText }],
  },
  {
    name: "Live & Recorded Control",
    icon: Video,
    children: [
      {
        name: "Admin Live Sessions",
        path: "/admin/live-sessions",
        icon: Radio,
      },
    ],
  },
  {
    name: "Document Generator",
    icon: FileText,
    children: [
      { name: "Certificates", path: "/admin/certificates", icon: Award },
      { name: "Reports", path: "/admin/reports", icon: FileText },
    ],
  },
  {
    name: "Insight Review",
    icon: BarChart3,
    children: [
      { name: "Usage Analytics", path: "/admin/usage", icon: LineChart },
      { name: "Skill Analytics", path: "/admin/skill-analytics", icon: Brain },
      {
        name: "Feedback Review",
        path: "/admin/feedback-review",
        icon: MessageCircleQuestion,
      },
      { name: "Attendance", path: "/admin/attendance", icon: CalendarDays },
      { name: "Settings", path: "/admin/settings", icon: Settings },
    ],
  },
];

const businessMenus = [
  { name: "Dashboard", path: "/business", icon: LayoutDashboard },
  {
    name: "Hiring Manager",
    icon: Briefcase,
    children: [
      { name: "Job Openings", path: "/business/jobs", icon: Briefcase },
      {
        name: "Applications",
        path: "/business/applications",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    name: "Lead Management",
    icon: Target,
    children: [
      { name: "All Leads", path: "/business/leads", icon: Users },
      { name: "Follow Ups", path: "/business/followups", icon: TrendingUp },
    ],
  },
  {
    name: "Enrollments",
    icon: BookOpen,
    children: [
      {
        name: "New Enrollments",
        path: "/business/enrollments",
        icon: BookOpen,
      },
      { name: "Renewals", path: "/business/renewals", icon: BookOpen },
    ],
  },
  {
    name: "Financial",
    icon: DollarSign,
    children: [
      { name: "Invoices", path: "/business/invoices", icon: Receipt },
      { name: "Payments", path: "/business/payments", icon: DollarSign },
    ],
  },
  {
    name: "Marketing",
    icon: BarChart3,
    children: [
      { name: "Campaigns", path: "/business/campaigns", icon: Activity },
      { name: "Sources", path: "/business/sources", icon: FolderOpen },
    ],
  },
  {
    name: "Team Targets",
    icon: Target,
    children: [
      { name: "Targets", path: "/business/targets", icon: Target },
      { name: "Performance", path: "/business/performance", icon: TrendingUp },
    ],
  },
];

const roleConfig = {
  student: { label: "Student" },
  trainer: { label: "Trainer" },
  admin: { label: "Admin" },
  business: { label: "Admin" },
  superAdmin: { label: "Super Admin" },
};

// The "Dashboard" item's path for each role — clicking it (or calling
// goToFeature with it) clears the ?section= param and goes back to the
// ILM ORA demo landing/overview instead of showing a section page.
const ROLE_HOME_PATH = {
  student: "/student",
  trainer: "/trainer",
  admin: "/admin",
  business: "/business",
  superAdmin: "/admin",
};

// Flat path -> { name, icon, roleKey, parent? } lookup built from every
// menu set above. IlmOraDemoPage uses this to label whatever section is
// currently selected (via ?section=<path>) without needing its own copy
// of every menu's name/icon.
const ALL_MENUS_BY_ROLE = {
  student: studentMenus,
  trainer: trainerMenus,
  admin: adminMenus,
  business: businessMenus,
  superAdmin: adminMenus,
};

function buildSectionIndex() {
  const index = {};
  Object.entries(ALL_MENUS_BY_ROLE).forEach(([roleKey, menus]) => {
    menus.forEach((item) => {
      if (item.path && !index[item.path]) {
        index[item.path] = { name: item.name, icon: item.icon, roleKey };
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (!index[child.path]) {
            index[child.path] = {
              name: child.name,
              icon: child.icon,
              roleKey,
              parent: item.name,
            };
          }
        });
      }
    });
  });
  return index;
}

const SECTION_INDEX = buildSectionIndex();

/* ================================================================
   SIDEBAR
================================================================ */
const IlmDemoSidebar = ({
  sidebarMode: sidebarModeProp,
  setSidebarMode: setSidebarModeProp,
  roleOverride,
  onNavigate, // Steps 7-10 gate from IlmOraDemoPage: checks profileCompleted before navigating
  activeSection = null, // NEW: which "path" is currently shown in IlmOraDemoPage's content
  // area (via ?section=). We no longer do a real router navigate() when
  // onNavigate is supplied, so we can't rely on location.pathname to know
  // which item is active anymore — the parent tells us via this prop.
  theme = "light", // "light" | "dark" — passed down from IlmOraDemoPage so the sidebar stays in sync with the navbar toggle
} = {}) => {
  const location = useNavigate ? useLocation() : { pathname: "/" };
  const navigate = useNavigate();
  // Step 7: every tab click in this sidebar goes through the gate (if given).
  const go = onNavigate || navigate;
  // When we're being driven by IlmOraDemoPage (onNavigate is set), active
  // highlighting is based on activeSection, not the real browser URL —
  // clicking a menu item never changes location.pathname anymore.
  const currentPath = onNavigate
    ? activeSection || ROLE_HOME_PATH[roleOverride] || "/student"
    : location.pathname;

  const { profileImage } = useAvatarContext();

  const isTrainer = location.pathname.startsWith("/trainer");
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isBusiness = location.pathname.startsWith("/business");
  const isSuperAdmin = location.pathname.startsWith("/super-admin");

  let menus = studentMenus;
  let roleKey = "student";

  if (roleOverride) {
    roleKey = roleOverride;
    if (roleOverride === "trainer") {
      menus = trainerMenus;
    } else if (roleOverride === "admin") {
      menus = adminMenus;
    }
    // "Business & Partnership" is really the tenant-admin experience —
    // it should reuse the admin sidebar (Organisation Manager, Assessment
    // System, etc.), not the unrelated `businessMenus` set (which was for
    // a different hiring/CRM-style role and doesn't match the
    // ROLE_CONFIG.business features on IlmOraDemoPage — those already use
    // /admin/... routes).
    else if (roleOverride === "business") {
      menus = adminMenus;
    } else {
      menus = studentMenus;
      roleKey = "student";
    }
  } else if (isSuperAdmin) {
    menus = adminMenus;
    roleKey = "superAdmin";
  } else if (isTrainer) {
    menus = trainerMenus;
    roleKey = "trainer";
  } else if (isAdminRoute) {
    menus = adminMenus;
    roleKey = "admin";
  } else if (isBusiness) {
    menus = businessMenus;
    roleKey = "business";
  }

  const role = roleConfig[roleKey] || roleConfig.student;
  const portalLabel = `${role.label.toUpperCase()} PORTAL`;

  const sidebarStorageKey = `sidebarMode:ilmdemo:${roleKey}`;

  // --- BUG FIX ---
  // "hidden" is meant to be a TRANSIENT state (mobile drawer closed via
  // the backdrop click). It was being persisted to localStorage exactly
  // like "full"/"icon", so once ANY role's sidebar got set to "hidden"
  // (e.g. a mobile backdrop click, or an accidental resize/collapse),
  // that role's desktop sidebar would stay permanently invisible on every
  // future load — width:0, opacity:0, pointer-events:none — even though
  // the content area still reserves the 280px margin for it (looks like
  // "sidebar missing" but it's actually just stuck hidden).
  // Fix: never *load* "hidden" as a starting mode, and never *persist*
  // "hidden" going forward — only "full"/"icon" get saved.
  const readStoredMode = () => {
    try {
      const stored = localStorage.getItem(sidebarStorageKey);
      return stored && stored !== "hidden" ? stored : "full";
    } catch {
      return "full";
    }
  };

  const [internalMode, setInternalMode] = React.useState(readStoredMode);
  const sidebarMode = sidebarModeProp ?? internalMode;
  const setSidebarMode = setSidebarModeProp ?? setInternalMode;

  React.useEffect(() => {
    if (sidebarModeProp !== undefined) return;
    setInternalMode(readStoredMode());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleKey]);

  React.useEffect(() => {
    try {
      if (sidebarMode === "hidden") {
        // Don't persist the transient mobile-closed state — remove any
        // stale entry instead, so next load defaults back to "full".
        localStorage.removeItem(sidebarStorageKey);
      } else {
        localStorage.setItem(sidebarStorageKey, sidebarMode);
      }
    } catch (_) {}
  }, [sidebarMode, sidebarStorageKey]);

  // --- FIX: guard against an invalid/unexpected sidebarMode value ---
  // Previously, if sidebarMode was ever anything other than exactly
  // "full" / "icon" / "hidden" (e.g. stale/corrupt localStorage value,
  // undefined during a race, etc.), BOTH `collapsed` and `hidden`
  // evaluated to false, which made the header render condition
  // (`!collapsed && !hidden` for full header, `collapsed && !hidden`
  // for the icon-only logo) behave inconsistently and the logo/
  // "STUDENT PORTAL" block could disappear entirely (as seen in the
  // cut-off screenshot). We now clamp to a known-good mode first.
  const safeModeRaw = SIDEBAR_WIDTHS.hasOwnProperty(sidebarMode)
    ? sidebarMode
    : "full";

  // --- FIX: "icon" mode has no backdrop — it's meant for desktop, where
  // content sits beside it with a real margin. On phones/tablets content
  // has NO margin (it's a full-width page under a drawer), so a
  // permanent 72px icon rail with no backdrop just sits on top of
  // content with no way to dismiss it — exactly the "hidden/cut-off
  // content" bug seen on phone. sidebarMode is also persisted per ROLE,
  // not per device, so a user who chose "icon" on their laptop then
  // opens the same role on a phone would load that broken state.
  // Below 1024px, icon mode is simply not allowed — it collapses back
  // to "full" (a normal open/close drawer, which already works).
  const [isMobile, setIsMobile] = React.useState(
    () => typeof window !== "undefined" && window.innerWidth <= 1024,
  );
  React.useEffect(() => {
    const onResize = () =>
      setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  React.useEffect(() => {
    if (isMobile && safeModeRaw === "icon") {
      setSidebarMode("full");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, safeModeRaw]);

  const safeMode = isMobile && safeModeRaw === "icon" ? "full" : safeModeRaw;
  const collapsed = safeMode === "icon";
  const hidden = safeMode === "hidden";

  // --- Drag-to-resize (only meaningful in "full" mode) ---------------
  // Width is persisted per-role, separately from sidebarMode, so
  // switching roles doesn't fight over a single stored number.
  const sidebarWidthStorageKey = `sidebarWidth:ilmdemo:${roleKey}`;
  const readStoredWidth = () => {
    try {
      const stored = parseInt(localStorage.getItem(sidebarWidthStorageKey), 10);
      if (!Number.isNaN(stored)) {
        return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, stored));
      }
    } catch (_) {}
    return SIDEBAR_WIDTHS.full;
  };

  const [fullWidth, setFullWidth] = React.useState(readStoredWidth);
  const [isResizing, setIsResizing] = React.useState(false);
  const resizeStartX = React.useRef(0);
  const resizeStartWidth = React.useRef(0);

  React.useEffect(() => {
    setFullWidth(readStoredWidth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleKey]);

  const handleResizeStart = (e) => {
    if (collapsed || hidden || isMobile) return;
    e.preventDefault();
    resizeStartX.current = e.clientX;
    resizeStartWidth.current = fullWidth;
    setIsResizing(true);
  };

  React.useEffect(() => {
    if (!isResizing) return;
    const onMouseMove = (e) => {
      const delta = e.clientX - resizeStartX.current;
      const next = Math.min(
        SIDEBAR_MAX_WIDTH,
        Math.max(SIDEBAR_MIN_WIDTH, resizeStartWidth.current + delta),
      );
      setFullWidth(next);
    };
    const onMouseUp = () => setIsResizing(false);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  React.useEffect(() => {
    if (isResizing) return; // only persist once the drag settles
    try {
      localStorage.setItem(sidebarWidthStorageKey, String(fullWidth));
    } catch (_) {}
  }, [fullWidth, isResizing, sidebarWidthStorageKey]);

  const sidebarWidth = safeMode === "full" ? fullWidth : SIDEBAR_WIDTHS[safeMode];

  const [openGroups, setOpenGroups] = React.useState({});
  const [flyoutGroup, setFlyoutGroup] = React.useState(null);
  const flyoutCloseTimer = React.useRef(null);

  // Keep the expanded dropdown in sync with the active route: whichever
  // group contains the currently active child stays open on its own,
  // and every other group auto-collapses — so switching to a page
  // outside a dropdown closes it without the user having to click it
  // shut manually. Manual clicks (below) still work for browsing before
  // navigating; this effect just re-syncs after every navigation.
  React.useEffect(() => {
    const activeGroup = menus.find(
      (item) =>
        item.children && item.children.some((child) => child.path === currentPath),
    );
    setOpenGroups(activeGroup ? { [activeGroup.name]: true } : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, roleKey]);

  const currentRole = localStorage.getItem("role");
  const showRoleDropdown = false;
  const currentRolePath = "/ilm-demo";

  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || "User",
  );

  React.useEffect(() => {
    userService
      .getMyProfile()
      .then((res) => {
        const name = res.data?.displayName || res.data?.name || "User";
        setUserName(name);
        localStorage.setItem("userName", name);
      })
      .catch(() => {});
  }, []);

  const openFlyout = (name) => {
    if (flyoutCloseTimer.current) clearTimeout(flyoutCloseTimer.current);
    setFlyoutGroup(name);
  };
  const scheduleCloseFlyout = () => {
    if (flyoutCloseTimer.current) clearTimeout(flyoutCloseTimer.current);
    flyoutCloseTimer.current = setTimeout(() => setFlyoutGroup(null), 150);
  };

  return (
    <>
      <style>{`
        .ilm-sb-root[data-theme="light"] {
          /* Neutral, warm-gray palette to match the Claude app's own
             left sidebar: white background, near-black text, soft gray
             hover/active pills — no colored (violet) accents on icons,
             text, or active state. Brand color is kept only in the
             two-tone "ILM ORA" wordmark itself. */
          --sb-bg: #F5F4F0;
          --sb-border: rgba(31,30,28,0.08);
          --sb-logo-bg: transparent;
          --sb-logo-border: transparent;
          --sb-text-muted: #83827A;
          --sb-text: #1F1E1B;
          --sb-item-hover-bg: rgba(31,30,28,0.045);
          --sb-active-bg: rgba(31,30,28,0.07);
          --sb-active-border: transparent;
          --sb-active-color: #1f1e1c;
          --sb-child-color: #6b6a63;
          --sb-child-hover-bg: rgba(31,30,28,0.045);
          --sb-connector-border: #ececea;
          --sb-flyout-bg: #fdfcfa;
          --sb-flyout-border: #ececea;
          --sb-flyout-shadow: 0 16px 40px rgba(0,0,0,0.12);
          --sb-chevron: #b3b1a8;
          --sb-scrollbar-thumb: rgba(31,30,28,0.18);
          --sb-ai-color: #83827a;
        }
        .ilm-sb-root[data-theme="dark"] {
          /* Same neutral idea, dark surface — matches Claude's dark
             sidebar tone rather than a tinted violet-black. */
          --sb-bg: #191817;
          --sb-border: rgba(255,255,255,0.08);
          --sb-logo-bg: transparent;
          --sb-logo-border: transparent;
          --sb-text-muted: #a3a29b;
          --sb-text: #f2f1ee;
          --sb-item-hover-bg: rgba(255,255,255,0.06);
          --sb-active-bg: rgba(255,255,255,0.1);
          --sb-active-border: transparent;
          --sb-active-color: #ffffff;
          --sb-child-color: #a3a29b;
          --sb-child-hover-bg: rgba(255,255,255,0.05);
          --sb-connector-border: rgba(255,255,255,0.08);
          --sb-flyout-bg: #211f1e;
          --sb-flyout-border: rgba(255,255,255,0.08);
          --sb-flyout-shadow: 0 16px 40px rgba(0,0,0,0.6);
          --sb-chevron: rgba(255,255,255,0.32);
          --sb-scrollbar-thumb: rgba(255,255,255,0.16);
          --sb-ai-color: #a3a29b;
        }

        .ilm-sb-root {
          position: fixed; top: 68px; left: 0;
          background: var(--sb-bg);
          border-right: 1px solid var(--sb-border);
          font-family: ${FONT_FAMILY};
          transition: width .28s ease, margin .28s ease, transform .28s ease, background .3s, border-color .3s;
          z-index: 90;
        }
        .ilm-sb-root[data-mode="hidden"] {
          border-right-width: 0;
          pointer-events: none;
        }

        .ilm-sb-resize-handle {
          position: absolute; top: 0; right: -3px; width: 6px; height: 100%;
          cursor: col-resize; z-index: 96; background: transparent;
        }
        .ilm-sb-resize-handle::after {
          content: ""; position: absolute; top: 0; right: 2px;
          width: 2px; height: 100%; background: transparent;
          transition: background .15s ease;
        }
        .ilm-sb-resize-handle:hover::after,
        .ilm-sb-resize-handle.active::after {
          background: var(--sb-text-muted, #83827a);
          opacity: 0.6;
        }
        .ilm-sb-resize-tooltip {
          position: absolute; top: 50%; right: 12px; transform: translateY(-50%);
          background: #1f1e1c; color: #fff; padding: 6px 10px; border-radius: 7px;
          font-size: 11px; font-weight: 600; white-space: nowrap;
          box-shadow: 0 6px 18px rgba(0,0,0,0.25);
          pointer-events: none; opacity: 0; transition: opacity .12s ease;
          z-index: 97;
        }
        .ilm-sb-resize-handle:hover .ilm-sb-resize-tooltip,
        .ilm-sb-resize-handle.active .ilm-sb-resize-tooltip {
          opacity: 1;
        }
        .ilm-sb-resize-tooltip small {
          display: block; font-weight: 400; font-size: 10px; color: #cbd5e1; margin-top: 1px;
        }

        .ilm-sb-nav::-webkit-scrollbar { width: 5px; }
        .ilm-sb-nav::-webkit-scrollbar-track { background: transparent; }
        .ilm-sb-nav::-webkit-scrollbar-thumb { background: var(--sb-scrollbar-thumb); border-radius: 10px; }

        .ilm-sb-header { padding: 20px 18px 16px; }

        .ilm-sb-toggle-btn {
          width: 28px; height: 28px; border-radius: 7px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: transparent; border: none;
          color: var(--sb-text-muted); cursor: pointer;
          transition: background .15s ease, border-color .15s ease, color .15s ease;
        }
        .ilm-sb-toggle-btn:hover { background: var(--sb-item-hover-bg); color: var(--sb-text); }
        .ilm-sb-toggle-btn:active { transform: scale(0.96); }

        .ilm-sb-logo-icon-box {
          width: 30px; height: 30px; border-radius: 8px;
          background: var(--sb-logo-bg); border: 1px solid var(--sb-logo-border);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .ilm-sb-logo-sub {
          font-size: 9.5px; font-weight: 600; color: var(--sb-text-muted);
          letter-spacing: 0.08em; margin: 3px 0 0; text-transform: uppercase;
        }

        .ilm-sb-nav-item {
          width: 100%; display: flex; align-items: center;
          padding: 10px 12px; border-radius: 8px; font-size: 14.5px;
          font-weight: 500; transition: all 0.15s ease; cursor: pointer;
          border: none; background: transparent; text-align: left; gap: 11px;
          position: relative; color: var(--sb-text);
          line-height: 1.25;
        }
        .ilm-sb-nav-item svg { flex-shrink: 0; color: var(--sb-text-muted); stroke-width: 1.75; }
        .ilm-sb-nav-item:hover { background: var(--sb-item-hover-bg); }
        .ilm-sb-nav-item.active {
          background: var(--sb-active-bg); color: var(--sb-active-color);
          box-shadow: inset 0 0 0 1px var(--sb-active-border);
          font-weight: 600;
        }
        .ilm-sb-nav-item.active svg { color: var(--sb-active-color); }
        .ilm-sb-nav-item.group-active { color: var(--sb-active-color); }
        .ilm-sb-nav-item.group-active svg { color: var(--sb-active-color); }

        .ilm-sb-nav-item.ai-group svg { color: var(--sb-ai-color); }

        .ilm-sb-child-item {
          width: 100%; display: flex; align-items: center;
          gap: 9px; padding: 8px 12px; border-radius: 7px;
          font-size: 13.5px; font-weight: 450; transition: all 0.14s ease;
          cursor: pointer; border: none; background: transparent; text-align: left;
          color: var(--sb-child-color);
          line-height: 1.25;
        }
        .ilm-sb-child-item svg { flex-shrink: 0; color: var(--sb-text-muted); stroke-width: 1.75; }
        .ilm-sb-child-item:hover  { color: var(--sb-active-color); background: var(--sb-child-hover-bg); }
        .ilm-sb-child-item.active { color: var(--sb-active-color); background: var(--sb-active-bg); font-weight: 600; }
        .ilm-sb-child-item.active svg { color: var(--sb-active-color); }

        .ilm-sb-connector {
          margin-left: 18px; padding-left: 10px;
          margin-top: 2px; margin-bottom: 3px;
          border-left: 1px solid var(--sb-connector-border);
          display: flex; flex-direction: column; gap: 1px;
        }

        .ilm-sb-flyout {
          position: absolute; left: calc(100% + 6px); top: -4px;
          min-width: 190px; border-radius: 10px; padding: 6px; z-index: 95;
          display: flex; flex-direction: column; gap: 1px;
          background: var(--sb-flyout-bg); border: 1px solid var(--sb-flyout-border);
          box-shadow: var(--sb-flyout-shadow);
          animation: ilmSbFlyoutIn 0.14s ease;
        }
        @keyframes ilmSbFlyoutIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .ilm-sb-flyout-title {
          font-size: 10.5px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.05em; padding: 5px 8px 4px; color: var(--sb-text-muted);
        }

        .ilm-sb-chevron { color: var(--sb-chevron); transition: transform 0.2s; flex-shrink: 0; margin-left: auto; }
        .ilm-sb-nav-item.group-active .ilm-sb-chevron { color: var(--sb-text-muted); }

        .ilm-sb-nav-label {
          flex: 1; text-align: left;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        .ilm-sb-root[data-mode="icon"] .ilm-sb-nav-item { justify-content: center; padding: 10px 0; }
        .ilm-sb-root[data-mode="icon"] .ilm-sb-nav { padding-left: 0; padding-right: 0; align-items: center; }
        .ilm-sb-root[data-mode="icon"] .ilm-sb-nav > div { width: 100%; display: flex; justify-content: center; }

        .ilm-sb-backdrop { display: none; }
        /* Unified with the 1024px breakpoint the parent page (IlmOraDemoPage)
           already uses to reset content's left margin — previously this was
           768px, so on tablets (iPad/iPad mini portrait ≈768–1024px) content
           lost its margin but the sidebar had no backdrop/elevated z-index
           yet, causing it to sit on top of content with no way to dismiss it. */
        @media (max-width: 1024px) {
          .ilm-sb-root[data-mode="full"] {
            z-index: 170;
            box-shadow: 8px 0 32px rgba(0,0,0,0.25);
            /* Never let the drawer be wider than the viewport itself
               (small phones like iPhone SE ~375px). */
            width: min(280px, 85vw) !important;
          }
          .ilm-sb-backdrop[data-show="true"] {
            display: block; position: fixed; inset: 0;
            background: rgba(15,23,42,0.45); z-index: 165;
            animation: ilmSbFlyoutIn 0.2s ease;
          }
        }

        /* Reopen affordance — shown only on mobile/tablet (≤1024px) once the
           drawer has been dismissed via the backdrop. Without this there was
           no way to bring the sidebar back except a full page refresh. */
        .ilm-sb-reopen { display: none; }
        @media (max-width: 1024px) {
          .ilm-sb-reopen {
            display: flex; align-items: center; justify-content: center;
            position: fixed; left: 14px; top: 72px; z-index: 150;
            width: 36px; height: 36px; border-radius: 9px;
            cursor: pointer; box-shadow: 0 4px 14px rgba(15,23,42,0.15);
            transition: transform .15s ease;
          }
          .ilm-sb-reopen:active { transform: scale(0.94); }
          .ilm-sb-reopen[data-theme="light"] {
            background: #ffffff; border: 1px solid #DEDAD2; color: #1F1E1B;
          }
          .ilm-sb-reopen[data-theme="dark"] {
            background: #111111; border: 1px solid rgba(255,255,255,0.08); color: #ffffff;
          }
        }
        @media (max-width: 480px) {
          .ilm-sb-reopen { top: 68px; }
        }
      `}</style>

      <div
        className="ilm-sb-backdrop"
        data-show={safeMode === "full"}
        onClick={() => setSidebarMode("hidden")}
      />

      {hidden && (
        <button
          type="button"
          className="ilm-sb-reopen"
          data-theme={theme}
          onClick={() => setSidebarMode("full")}
          aria-label="Open menu"
        >
          <Menu size={16} />
        </button>
      )}

      <aside
        className="ilm-sb-root"
        data-mode={safeMode}
        data-theme={theme}
        aria-hidden={hidden}
        style={{
          width: sidebarWidth,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 68px)",
          overflow: "hidden",
          opacity: hidden ? 0 : 1,
          transition: isResizing
            ? "none"
            : "width .28s ease, margin .28s ease, transform .28s ease, background .3s, border-color .3s",
        }}
      >
        {!collapsed && !hidden && !isMobile && (
          <div
            className={`ilm-sb-resize-handle ${isResizing ? "active" : ""}`}
            onMouseDown={handleResizeStart}
            title=""
          >
            <div className="ilm-sb-resize-tooltip">
              Drag to resize
              <small>{fullWidth}px</small>
            </div>
          </div>
        )}
        <div
          className="ilm-sb-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && !hidden && (
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ minWidth: 0 }}>
                <p
                  className="text-[20px] font-bold font-serif leading-none whitespace-nowrap"
                  style={{ margin: 0 }}
                >
                  <span className="text-green-600">ILM</span>
                  <span className="text-orange-500 ml-1">ORA</span>
                </p>
                <p className="ilm-sb-logo-sub">{portalLabel}</p>
              </div>
            </div>
          )}

          {/* Hamburger toggle — click cycles the desktop sidebar between
              "full" (labels visible) and "icon" (icons only), matching the
              TaskOrbit reference. This is independent of the mobile
              hidden/backdrop drawer flow above. */}
          <button
            type="button"
            className="ilm-sb-toggle-btn"
            onClick={() => {
              if (isMobile) {
                // No icon rail on phones/tablets — the toggle just
                // opens/closes the full drawer instead.
                setSidebarMode(safeMode === "hidden" ? "full" : "hidden");
              } else {
                setSidebarMode(safeMode === "icon" ? "full" : "icon");
              }
            }}
            aria-label={safeMode === "icon" ? "Expand sidebar" : "Collapse sidebar"}
            title={safeMode === "icon" ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu size={16} />
          </button>
        </div>

        <nav
          className="ilm-sb-nav"
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "visible",
            padding: "6px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "1px",
          }}
        >
          {menus.map((item) => {
            const Icon = item.icon;
            const isOpen = openGroups[item.name] ?? false;
            const isAI = item.name === "AI Tools";
            const isFlyoutOpen = collapsed && flyoutGroup === item.name;

            if (item.children) {
              const isGroupActive = item.children.some(
                (c) => currentPath === c.path,
              );
              return (
                <div
                  key={item.name}
                  style={{ position: "relative" }}
                  onMouseEnter={() => collapsed && openFlyout(item.name)}
                  onMouseLeave={() => collapsed && scheduleCloseFlyout()}
                >
                  <button
                    className={`ilm-sb-nav-item ${isGroupActive ? "group-active" : ""} ${isAI ? "ai-group" : ""}`}
                    onClick={() => {
                      if (collapsed) {
                        setFlyoutGroup((prev) =>
                          prev === item.name ? null : item.name,
                        );
                      } else {
                        setOpenGroups((p) => ({ ...p, [item.name]: !isOpen }));
                      }
                    }}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon size={16} />
                    {!collapsed && !hidden && (
                      <>
                        <span className="ilm-sb-nav-label">{item.name}</span>
                        <ChevronRight
                          size={13}
                          className="ilm-sb-chevron"
                          style={{
                            transform: isOpen
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                          }}
                        />
                      </>
                    )}
                  </button>

                  {!collapsed && !hidden && isOpen && (
                    <div className="ilm-sb-connector">
                      {item.children.map((child) => {
                        const active = currentPath === child.path;
                        const ChildIcon = child.icon;
                        return (
                          <button
                            key={child.name}
                            className={`ilm-sb-child-item ${active ? "active" : ""}`}
                            onClick={() => go(child.path)}
                          >
                            <ChildIcon size={13} />
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {child.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isFlyoutOpen && (
                    <div
                      className="ilm-sb-flyout"
                      onMouseEnter={() => openFlyout(item.name)}
                      onMouseLeave={() => scheduleCloseFlyout()}
                    >
                      <div className="ilm-sb-flyout-title">{item.name}</div>
                      {item.children.map((child) => {
                        const active = currentPath === child.path;
                        const ChildIcon = child.icon;
                        return (
                          <button
                            key={child.name}
                            className={`ilm-sb-child-item ${active ? "active" : ""}`}
                            onClick={() => {
                              go(child.path);
                              setFlyoutGroup(null);
                            }}
                          >
                            <ChildIcon size={13} />
                            <span
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {child.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const active = currentPath === item.path;
            return (
              <button
                key={item.name}
                className={`ilm-sb-nav-item ${active ? "active" : ""}`}
                onClick={() => go(item.path)}
                title={collapsed ? item.name : undefined}
              >
                <Icon size={16} />
                {!collapsed && !hidden && (
                  <span className="ilm-sb-nav-label">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default IlmDemoSidebar;
export { SIDEBAR_WIDTHS, SECTION_INDEX, ROLE_HOME_PATH };