
"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "@/lib/routerCompat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Award,
  BarChart3,
  BookOpen,
  ChevronDown,
  Code2,
  FileText,
  GraduationCap,
  Lock,
  LogOut,
  Menu,
  Moon,
  Sparkles,
  Sun,
  User,
  UserCog,
  Users,
  LayoutDashboard,
  PenTool,
  CalendarCheck,
  ArrowRight,
  Cloud,
  Globe,
  Layers,
} from "lucide-react";
import MobileFullScreenMenu from "./MobileFullScreenMenu";

// ILM ORA Feature dropdown items, in this exact order: Student Hub,
// Trainer Hub, Manager Hub, Whiteboard, AI Companion, AI Resume Builder,
// Coding Lab.
const HUB_MENU_ITEMS = [
  { key: "student", title: "Student Hub", description: "AI-Powered Learning & Career Growth", icon: "GraduationCap" },
  { key: "trainer", title: "Trainer Hub", description: "Training Management & Mentorship", icon: "Users" },
  { key: "admin", title: "Manager Hub", description: "Analytics, Performance & Team Development", icon: "BarChart3" },
  { key: "whiteboard", title: "Whiteboard", description: "Draw, Design & Collaborate Visually", icon: "PenTool" },
  { key: "aiCompanion", title: "AI Companion", description: "Your personal AI tutor, 24/7", icon: "Sparkles" },
  { key: "resume", title: "AI Resume Builder", description: "Build a job-ready resume with AI", icon: "FileText" },
  { key: "codingLab", title: "Coding Lab", description: "Practice, Code & Build Real Projects", icon: "Code2" },
  { key: "studyPlan", title: "Study Plan", description: "Personalized Study Plans & Progress Tracking", icon: "CalendarCheck" },
];

// Product dropdown — ILM ORA Calendry (renamed from "ILM ORA Meet"; same
// route/functionality) and Workspace only. Resume Builder, AI Companion,
// and Whiteboard moved up into ILM ORA Feature above.
const PRODUCT_MENU_ITEMS = [
  { key: "meet", title: "ILM ORA Calendry", description: "Live classes & video sessions", icon: "LayoutDashboard" },
  { key: "workspace", title: "Workspace", description: "Your all-in-one collaborative space", icon: "Users" },
];

// Icon name (string) → actual lucide-react component.
const NAV_ICON_MAP = {
  GraduationCap,
  Users,
  BarChart3,
  FileText,
  LayoutDashboard,
  Sparkles,
  PenTool,
  Code2,
  CalendarCheck,
  Award,
  Cloud,
  Globe,
  Layers,
};
const HUB_ROUTES = {
  student: "/student-hub",
  trainer: "/trainer-hub",
  admin: "/manager-hub",
  whiteboard: "/whiteboard",
  aiCompanion: "/ai-companion",
  resume: "/resume-builder",
  codingLab: "/coding-lab",
  studyPlan: "/study-plan",
};
const PRODUCT_ROUTES = {
  meet: "/calendry",
  resume: "/resume-builder",
  workspace: "/workspace",
  aiCompanion: "/ai-companion",
  whiteboard: "/whiteboard",
};
const HUB_ICON_COLORS = {
  student: "text-green-600",
  trainer: "text-blue-600",
  admin: "text-purple-600",
  whiteboard: "text-orange-500",
  aiCompanion: "text-purple-500",
  resume: "text-green-600",
  codingLab: "text-cyan-600",
  studyPlan: "text-orange-500",
};
const PRODUCT_ICON_COLORS = {
  meet: "text-orange-500",
  workspace: "text-orange-500",
};

// "Skills" dropdown
const CERT_MENU_ITEMS = [
  { key: "aws", title: "AWS Certification", description: "Cloud Practitioner to Professional", icon: "Award" },
  { key: "microsoft", title: "Microsoft Certification", description: "Azure, M365 & Power Platform", icon: "Layers" },
    // { key: "cloud", title: "Cloud Certification", description: "Multi-cloud & vendor-neutral paths", icon: "Cloud", comingSoon: true },
  { key: "google", title: "Google Certification", description: "Google Cloud & Workspace exams", icon: "Globe" },
  { key: "cisco", title: "Cisco Certification", description: "CCNA, CCNP & CCIE exams and training", icon: "Award" },
];
const CERT_ROUTES = {
  aws: "/aws",
  microsoft: "/microsoft",
  cloud: "/ilmora-cloud-certification",
  google: "/google",
  cisco: "/cisco",
};
const CERT_ICON_COLORS = {
  aws: "text-orange-500",
  microsoft: "text-blue-500",
  cloud: "text-sky-500",
  google: "text-green-500",
  cisco: "text-sky-600",
};

// "Career Tracks" dropdown — replaces the old "Skills" tab (Skills is commented out for now).
// Career Tracks was removed from the "All Courses" dropdown and now lives here, classified by category.
// Edit titles/routes below to match your real /career page filters.
const CAREER_TRACK_ITEMS = [
  { key: "all-career", title: "All Career Tracks", route: "/career" },
  { key: "software-web", title: "Software & Web Development", route: "/career?category=software-web" },
  { key: "data-ai", title: "Data Science & AI", route: "/career?category=data-ai" },
  { key: "cloud-devops", title: "Cloud & DevOps", route: "/career?category=cloud-devops" },
  { key: "cybersecurity", title: "Cybersecurity", route: "/career?category=cybersecurity" },
  { key: "ui-ux-design", title: "UI/UX & Design", route: "/career?category=ui-ux-design" },
  { key: "business-management", title: "Business & Management", route: "/career?category=business-management" },
];

// All Courses dropdown — every item opens its own page (same pages as the
// sidebar on /all-courses).
const COURSE_CATEGORIES = [
  { key: "all", title: "All Courses", route: "/all-courses" },
  { key: "school-boards", title: "School Boards", route: "/board" },
  { key: "neet", title: "Competitive Exams – NEET", route: "/competitive/neet" },
  { key: "jee", title: "Competitive Exams – JEE", route: "/competitive/jee" },
  // { key: "career-tracks", title: "Career Tracks", route: "/career" },
  { key: "fde-academy", title: "FDE Academy", route: "/fde-academy" },
  { key: "ilm-ora-talk", title: "ILM ORA Talk", route: "/talk" },
  { key: "study-abroad", title: "Study Abroad", route: "/study-abroad" },
  { key: "ilm-ora-gulf", title: "ILM ORA Gulf", route: "/gulf" },
  { key: "ilm-ora-feature", title: "ILM ORA Feature", route: "/student-hub" },
];

// ── Maven-style mega menu data (built from the SAME items/routes above —
// nothing is duplicated, so editing the lists above still updates the menu).
const MEGA_MENUS = {
  courses: {
    label: "All Courses",
    eyebrow: "Browse",
    cardTitle: "All Courses",
    cardRoute: "/all-courses",
    triggerRoute: "/all-courses", // click on the tab itself still opens All Courses
    noChevron: true,
    items: COURSE_CATEGORIES.map((c) => ({ key: c.key, title: c.title, route: c.route })),
  },
  feature: {
    label: "ILM ORA Feature",
    eyebrow: "Explore",
    cardTitle: "ILM ORA Feature",
    items: HUB_MENU_ITEMS.map((i) => ({ key: i.key, title: i.title, route: HUB_ROUTES[i.key] })),
  },
  product: {
    label: "Product",
    eyebrow: "Explore",
    cardTitle: "Product",
    items: PRODUCT_MENU_ITEMS.map((i) => ({ key: i.key, title: i.title, route: PRODUCT_ROUTES[i.key] })),
  },
  
// Skills tab — commented out for now
/*
cert: {
  label: "Skills",
  eyebrow: "Explore skills",
  cardTitle: "Skills",
  cardRoute: "/all-courses",
  items: CERT_MENU_ITEMS.map((i) => ({
    key: i.key,
    title: i.title,
    route: CERT_ROUTES[i.key],
    comingSoon: !!i.comingSoon,
  })),
},
*/

career: {
  label: "Career Tracks",
  eyebrow: "Explore",
  cardTitle: "Career Tracks",
  cardRoute: "/career",
  items: CAREER_TRACK_ITEMS.map((i) => ({ key: i.key, title: i.title, route: i.route })),
},

};

/* ─────────────────────────────────────────────────────────────────
   NAVBAR — logo, desktop navigation, mega menu, dropdowns, user/login
   state, avatar/profile menu, logout, "Get Started" CTA, mobile menu
   button, theme toggle, scroll effects, sticky behavior.
───────────────────────────────────────────────────────────────── */
export default function Navbar({ theme, toggleTheme, setShowLoginModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Maven-style mega menu: which panel is open ("feature" | "product" | "cert" | null)
  const [openMenu, setOpenMenu] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Desktop trigger (chevron flips up + white underline while open, like Maven)
  const renderMegaTrigger = (key) => {
    const isOpen = openMenu === key;
    return (
      <div className="relative" data-mega-trigger onMouseEnter={() => setOpenMenu(key)}>
        <button
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => {
            if (MEGA_MENUS[key].triggerRoute) {
              setOpenMenu(null);
              navigate(MEGA_MENUS[key].triggerRoute);
            } else {
              setOpenMenu(key);
            }
          }}
          className={`relative font-medium transition-colors duration-300 px-3 xl:px-4 py-2 rounded-lg text-[13px] xl:text-[15px] whitespace-nowrap bg-transparent border-none cursor-pointer flex items-center gap-1 ${
            isOpen ? "text-white" : "text-white hover:text-[#F97316]"
          }`}
        >
          {MEGA_MENUS[key].label}
          {!MEGA_MENUS[key].noChevron && (
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          )}
          <span
            aria-hidden="true"
            className={`absolute left-3 right-3 xl:left-4 xl:right-4 bottom-0 h-[2px] rounded-full bg-white transition-opacity duration-200 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bug fix: this used to read sessionStorage["user"], a key the real
  // login flow never writes to — so this navbar never saw a logged-in
  // user. It now reads the SAME real session source IlmOraDemoPage.jsx
  // already uses (localStorage["lms_token"] / localStorage["lms_user"]),
  // so the same authenticated session is detected everywhere, including
  // after navigating away from /ilm-demo to a public page.
  useEffect(() => {
    const token = localStorage.getItem("lms_token");
    const rawUser = localStorage.getItem("lms_user");
    let parsedUser = null;
    try {
      parsedUser = rawUser ? JSON.parse(rawUser) : null;
    } catch {
      parsedUser = null;
    }

    // Same stale-data guard IlmOraDemoPage.jsx already runs on mount: a
    // bare isNewUser:true flag with no matching Google credential is
    // leftover data from an interrupted Google sign-in (tab/browser
    // closed before role selection finished) — sessionStorage clears on
    // session end but localStorage["lms_user"] doesn't, so this flag can
    // outlive the real session. Without this check, a public page loaded
    // first (before /ilm-demo ever mounts and cleans it up) would trust
    // the stale flag and show the avatar for a user who never logged in.
    const hasGoogleCred = !!sessionStorage.getItem("ilmora_google_credential");
    if (!token && parsedUser?.isNewUser === true && !hasGoogleCred) {
      localStorage.removeItem("lms_user");
      setUser(null);
      return;
    }

    if (token || parsedUser) {
      setUser(parsedUser || {});
    } else {
      setUser(null);
    }
  }, []);

  // Same fields the "Student Hub"/"Trainer Hub"/"Manager Hub" logic in
  // IlmOraDemoPage.jsx already normalizes role strings with — copied
  // here as a pure function (no shared/duplicate STATE, just the same
  // string-mapping logic) so "Go to Dashboard" below sends the user to
  // the correct role dashboard, same as it does on /ilm-demo.
  const normalizeAppRole = (raw) => {
    const r = (raw || "").toString().trim().toUpperCase();
    if (["TENANT_ADMIN", "ADMIN", "BUSINESS", "MANAGER", "PARTNERSHIP"].includes(r))
      return "admin";
    if (r === "TRAINER") return "trainer";
    if (r === "STUDENT") return "student";
    return "";
  };
  const DASHBOARD_ROUTE_BY_ROLE = {
    student: "/student/dashboard",
    trainer: "/trainer/dashboard",
    admin: "/admin/dashboard",
  };
  const goToDashboard = () => {
    const role =
      normalizeAppRole(user?.role) ||
      normalizeAppRole(localStorage.getItem("role")) ||
      "student";
    navigate(DASHBOARD_ROUTE_BY_ROLE[role] || "/ilm-demo");
  };
  // Same roleChangeUsed flag IlmOraDemoPage.jsx's hasUsedRoleChange()
  // already reads from lms_user — same source, read here too. Kept for
  // potential future use even though the public dropdown no longer
  // surfaces an "Edit Role" item itself.
  const hasUsedRoleChange = () => !!user?.roleChangeUsed;

  // Mirrors IlmOraDemoPage.jsx's handleSignOut exactly — same keys
  // cleared, so signing out here fully signs the user out everywhere,
  // not just on this page.
  const handleLogout = () => {
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_user");
    localStorage.removeItem("role");
    localStorage.removeItem("organizationId");
    localStorage.removeItem("selectedPlan");
    sessionStorage.removeItem("ilmora_google_user");
    sessionStorage.removeItem("ilmora_google_credential");
    sessionStorage.removeItem("ilmora_profile_return_path");
    setUser(null);
    navigate("/", { replace: true });
  };

          const navLinks = [
    {
      text: "Workshops",
      href: "#workshops",
      icon: BookOpen,
      color: "text-orange-500",
      description: "Hands-on Live Workshops",
      route: "/workshops",
    },
  ];

  const navButtons = [];

  return (
    <>
      {/* ── Full-Screen Mobile Menu ── */}
      {mobileMenuOpen && (
        <MobileFullScreenMenu
          onClose={() => setMobileMenuOpen(false)}
          navLinks={navLinks}
          navButtons={navButtons}
          user={user}
          navigate={navigate}
          handleLogout={handleLogout}
          setShowLoginModal={setShowLoginModal}
          productMenuItems={PRODUCT_MENU_ITEMS}
          productRoutes={PRODUCT_ROUTES}
          certMenuItems={CERT_MENU_ITEMS}
          // certRoutes={CERT_ROUTES}
                    certRoutes={CERT_ROUTES}
          careerItems={CAREER_TRACK_ITEMS}
        />
      )}

      {/* ── Nav ── */}
            <nav
        style={{ top: "var(--texora-banner-h, 0px)" }}
        onMouseLeave={() => setOpenMenu(null)}
        className={`fixed w-full z-50 transition-[background-color,box-shadow] duration-300 bg-[#1F1D1F]/95 border-b border-[#F97316]/20 ${
          scrolled
            ? "backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
            : "backdrop-blur-md"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
              onClick={() => navigate("/")}
            >
              <span className="text-[28px] sm:text-[32px] font-extrabold tracking-wide font-serif leading-none whitespace-nowrap">
                <span className="text-green-600">ILM</span>
                <span className="text-[#F97316] ml-1">ORA</span>
                <span className="inline-flex items-center bg-orange-50 border border-[#F97316] rounded ml-1.5 px-1.5 py-0.5 text-[0.45rem] sm:text-[0.5rem] font-sans font-semibold tracking-widest text-[#F97316] uppercase leading-snug align-middle">
                  Beta
                </span>
              </span>
            </div>

            {/* Desktop Nav — visible from lg (1024px) and above */}
            <div
              className="hidden lg:flex items-center gap-1 flex-1 justify-center mx-4 xl:mx-6"
              onMouseOver={(e) => {
                if (!e.target.closest("[data-mega-trigger]")) setOpenMenu(null);
              }}
            >
              {/* All Courses — Maven-style mega menu trigger (click still opens /all-courses) */}
              {renderMegaTrigger("courses")}

              {/* ILM ORA Feature + Product — Maven-style mega menu triggers
                  (the panel itself is rendered once, below the nav row) */}
              {renderMegaTrigger("feature")}
              {renderMegaTrigger("product")}

                        {/* Direct Nav Links — Workshop (Coming Soon) */}
              {navLinks.map((link) => (
                <button
                  key={link.text}
                  type="button"
                  disabled={!!link.comingSoon}
                  aria-disabled={!!link.comingSoon}
                  onClick={() => {
                    if (link.comingSoon) return;
                    if (link.route) {
                      navigate(link.route);
                    } else {
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`font-medium transition-colors duration-300 px-3 xl:px-4 py-2 rounded-lg text-[13px] xl:text-[15px] whitespace-nowrap bg-transparent border-none flex items-center gap-2 ${
                    link.comingSoon
                      ? "text-white/60 cursor-not-allowed"
                      : "text-white hover:text-[#F97316] hover:bg-[#F97316]/10 cursor-pointer"
                  }`}
                >
                  {link.text}
                  {link.comingSoon && (
                    <span className="text-[10px] font-semibold text-[#F97316] border border-[#F97316]/50 bg-[#F97316]/10 rounded-full px-2 py-0.5 whitespace-nowrap">
                      Coming Soon
                    </span>
                  )}
                </button>
              ))}

                            {/* Skills — commented out for now */}
              {/* {renderMegaTrigger("cert")} */}

              {/* Career Tracks — replaces Skills */}
              {renderMegaTrigger("career")}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/[0.08] hover:border-[#F97316] transition-colors duration-300 shadow-sm bg-[#2A2A2A] flex-shrink-0"
              >
                {theme === "dark" ? (
                  <Sun className="w-[18px] h-[18px] text-[#F97316]" />
                ) : (
                  <Moon className="w-[18px] h-[18px] text-gray-300" />
                )}
              </button>

              {user ? (
                <div className="hidden lg:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2 rounded-xl border-white/[0.08] bg-[#2A2A2A] hover:border-[#F97316] text-white h-10 px-3"
                      >
                        <Avatar className="w-7 h-7">
                          <AvatarImage src={user.picture} alt={user.name} />
                          <AvatarFallback className="bg-[#1E293B] text-white text-xs">
                            {user.name?.charAt(0) || (
                              <User className="w-3 h-3" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-72 bg-[#232323] border-white/[0.08]"
                    >
                      <div className="px-3 py-3 bg-[#2A2A2A] rounded-t-md">
                        <p className="font-semibold text-sm text-white truncate">
                          {user.name || "User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <DropdownMenuSeparator />
                      {/* Public/landing dropdown is intentionally minimal:
                          only "Go to Dashboard" here + "Sign Out" below.
                          Profile / Edit Role / Change Password are
                          dashboard-only items and live in
                          IlmOraDemoPage.jsx's own avatar dropdown — do not
                          add them back here; these two UI contexts are
                          intentionally different. */}
                      {[
                        {
                          icon: LayoutDashboard,
                          label: "Go to Dashboard",
                          desc: "Jump back into your dashboard",
                          onClick: goToDashboard,
                        },
                      ].map((item) => (
                        <DropdownMenuItem
                          key={item.label}
                          onClick={item.onClick}
                          className="gap-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-[#F97316]" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {item.label}
                            </p>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                          </div>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="gap-3 text-red-600 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="flex bg-gradient-to-br from-[#F97316] to-[#EA580C] hover:from-[#F97316] hover:to-[#EA580C] text-white font-bold px-3 sm:px-4 xl:px-5 py-2.5 rounded-xl items-center gap-1.5 sm:gap-2 shadow-md hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(249,115,22,0.35)] transition-all duration-300 text-[12px] sm:text-[13px] xl:text-[15px] h-10 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" /> Get Started
                </Button>
              )}

              {/* Hamburger — only shown below lg (below 1024px) */}
              <button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] hover:border-[#F97316] bg-[#2A2A2A] transition-colors duration-300 shadow-sm"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* ── MEGA MENU PANEL (Maven-style): full-width, white, directly under the nav ── */}
        {openMenu && MEGA_MENUS[openMenu] && (
          <div
            role="menu"
            className={`hidden lg:block absolute left-0 right-0 top-full border-b shadow-[0_28px_40px_-18px_rgba(0,0,0,0.28)] animate-in fade-in-0 slide-in-from-top-1 duration-200 ${
              theme === "dark" ? "bg-[#161616] border-white/10" : "bg-white border-slate-200"
            }`}
          >
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-start gap-8">
              {/* Left dark feature card */}
              <button
                type="button"
                tabIndex={MEGA_MENUS[openMenu].cardRoute ? 0 : -1}
                onClick={() => {
                  if (MEGA_MENUS[openMenu].cardRoute) {
                    const r = MEGA_MENUS[openMenu].cardRoute;
                    setOpenMenu(null);
                    navigate(r);
                  }
                }}
                className={`relative flex-shrink-0 w-[220px] h-[220px] rounded-md overflow-hidden text-left p-4 flex flex-col justify-end border border-white/10 ${
                  MEGA_MENUS[openMenu].cardRoute ? "cursor-pointer" : "cursor-default"
                }`}
                style={{ background: "linear-gradient(160deg,#0b1020 0%,#14182b 60%,#1b1224 100%)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(249,115,22,.16) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-0 h-[3px] bg-gradient-to-r from-green-600 via-[#F97316] to-transparent"
                />
                <span className="relative text-[13px] text-white underline underline-offset-2">
                  {MEGA_MENUS[openMenu].eyebrow}
                </span>
                <span className="relative text-[26px] font-semibold leading-tight text-white">
                  {MEGA_MENUS[openMenu].cardTitle}
                </span>
              </button>

              {/* Link columns — fill top→bottom, 5 per column, then next column */}
              <ul
                className="list-none m-0 p-0 grid grid-flow-col content-start gap-x-12"
                style={{ gridTemplateRows: "repeat(5, auto)", gridAutoColumns: "minmax(190px, 240px)" }}
              >
                {MEGA_MENUS[openMenu].items.map((item) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      role="menuitem"
                      disabled={item.comingSoon}
                      onClick={() => {
                        setOpenMenu(null);
                        navigate(item.route);
                      }}
                      className={`flex items-center gap-2 py-2 text-left text-[14px] font-medium bg-transparent border-none ${
                        theme === "dark" ? "text-slate-200" : "text-slate-800"
                      } ${
                        item.comingSoon
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer hover:text-[#F97316] hover:underline underline-offset-4"
                      }`}
                    >
                      {item.title}
                      {item.comingSoon && (
                        <>
                          <span className="text-[10px] font-semibold text-[#F97316] border border-[#F97316]/50 bg-[#F97316]/10 rounded-full px-2 py-0.5 whitespace-nowrap">
                            Coming Soon
                          </span>
                          <Lock className="w-3.5 h-3.5 text-gray-400" />
                        </>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}