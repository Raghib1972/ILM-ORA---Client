"use client";
// src/legacy-pages/Landing/ilmorasecurity.jsx
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PublicLayout from "./components/PublicLayout";
import "./ilmorasecurity.css";
import ENGINE from "./ilmorasecurityEngine";

// Logos (src/assets/security/logo)
import logo0 from "../../assets/security/logo/aws.webp";
import logo1 from "../../assets/security/logo/microsoft_azure.webp";
import logo2 from "../../assets/security/logo/google_cloud.webp";
import logo3 from "../../assets/security/logo/microsoft_defender.webp";
import logo4 from "../../assets/security/logo/microsoft_sentinel.webp";
import logo5 from "../../assets/security/logo/cisco.webp";
import logo6 from "../../assets/security/logo/palo_alto_networks.webp";
import logo7 from "../../assets/security/logo/fortinet.webp";
import logo8 from "../../assets/security/logo/crowdstrike.webp";
import logo9 from "../../assets/security/logo/splunk.webp";
import logo10 from "../../assets/security/logo/cloudflare.webp";
import logo11 from "../../assets/security/logo/wazuh.webp";
import logo12 from "../../assets/security/logo/wireshark.webp";
import logo13 from "../../assets/security/logo/burp_suite.webp";
import logo14 from "../../assets/security/logo/kali_linux.webp";
// Photos (src/assets/security) used on the "Explore all sections" cards
import photo0 from "../../assets/security/pexels-brett-sayles-4373997.webp";
import photo1 from "../../assets/security/pexels-brett-sayles-5480781.webp";
import photo2 from "../../assets/security/pexels-cookiecutter-17323801.webp";
import photo3 from "../../assets/security/pexels-shkrabaanthony-5475752.webp";
import photo4 from "../../assets/security/pexels-padrechaks-30695581.webp";
import photo5 from "../../assets/security/pexels-pixabay-60504.webp";
import photo6 from "../../assets/security/pexels-ann-hannes-45017-38482453.webp";
import photo7 from "../../assets/security/pexels-ann-hannes-45017-38486953.webp";
import photo8 from "../../assets/security/pexels-markus-winkler-1430818-30885916.webp";
import photo9 from "../../assets/security/pexels-sora-shimazaki-5935787.webp";
// Workshops tile photo (src/assets/Workshop)
import photo10 from "../../assets/Workshop/ILM ORA Java Workshop Live.webp";

// ─── HERO MEDIA (overview page) ───────────────────────────────────────────
// Video: Mixkit free licence. Best practice: download it and self-host, e.g.
//   public/security/hero.mp4  ->  HERO_VIDEO = "/security/hero.mp4"
// Set HERO_VIDEO = "" to turn the video off (poster image is used instead).
const HERO_VIDEO = "https://assets.mixkit.co/videos/50748/50748-360.mp4";
const HERO_POSTER = "https://assets.mixkit.co/videos/50748/50748-thumb-360-0.jpg";

// next/image-style static imports give { src, width, height }; plain strings also work
const u = (m) => (m && m.src ? m.src : m);

export default function IlmOraSecurity() {
  const pathname = usePathname();
  // Theme is shared with the site Navbar through PublicLayout
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
  }, []);

  useEffect(() => {
    // Assets must be on window before the engine runs the first time
    window.__ILM = {
      hero: { video: HERO_VIDEO, poster: HERO_POSTER },
      logos: {
    "Amazon Web Services": u(logo0),
    "Microsoft Azure": u(logo1),
    "Google Cloud": u(logo2),
    "Microsoft Defender": u(logo3),
    "Microsoft Sentinel": u(logo4),
    "Cisco": u(logo5),
    "Palo Alto Networks": u(logo6),
    "Fortinet": u(logo7),
    "CrowdStrike": u(logo8),
    "Splunk": u(logo9),
    "Cloudflare": u(logo10),
    "Wazuh": u(logo11),
    "Wireshark": u(logo12),
    "Burp Suite": u(logo13),
    "Kali Linux": u(logo14)
      },
      imgs: {
    "Services": u(photo0),
    "Solutions": u(photo1),
    "Assessment": u(photo2),
    "Consulting": u(photo3),
    "Training": u(photo4),
    "Quiz": u(photo5),
    "Leaders & Bootcamps": u(photo6),
    "Industries": u(photo7),
    "Resources": u(photo8),
    "Contact": u(photo9),
    "Workshops": u(photo10)
      },
    };
    // The page engine is loaded once per browser session, then re-initialised on every visit
    if (!window.__ilmEngine) {
      const s = document.createElement("script");
      s.text = ENGINE;
      document.body.appendChild(s);
      window.__ilmEngine = true;
    }
    // Real path routing: /security/<page>  (no # in the URL)
    // /security  or  old /security#services  ->  /security/overview  or  /security/services
    if (/^\/security\/?$/.test(window.location.pathname)) {
      const h = window.location.hash.replace(/^#/, "");
      window.history.replaceState(null, "", "/security/" + (h || "overview"));
    }
    window.ilmInit();
  }, []);

  // Navbar / browser navigation between /security/* pages -> re-render the matching page
  useEffect(() => {
    if (typeof window.ilmSync === "function") window.ilmSync();
  }, [pathname]);

  return (
    <PublicLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="ilm-sec" data-theme={theme}>
        {/* the page engine writes into #nav; it stays hidden (site Navbar is used instead) */}
        <nav id="nav" style={{ display: "none" }} />
        <div id="app" suppressHydrationWarning />
      </div>
    </PublicLayout>
  );
}