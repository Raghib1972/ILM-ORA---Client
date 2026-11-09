// Usage (PowerShell):
//   $env:TOKEN_STUDENT="eyJ..." ; $env:ROLES="student" ; npm run check:responsive
// Optional env: BASE_URL, ROLES, ONLY (route substring), QUICK=1 (3 viewports only),
//   TOKEN_<ROLE>, USER_<ROLE> (JSON string for lms_user), ROLE_<ROLE> (value for localStorage "role")
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const ROLES = (process.env.ROLES || "student").split(",").map((s) => s.trim().toLowerCase());
const ONLY = process.env.ONLY || "";

let VIEWPORTS = [
  [360, 800], [390, 844], [412, 915], [744, 1133], [820, 1180],
  [1024, 768], [1366, 768], [1440, 900], [1920, 1080], [2560, 1080],
];
if (process.env.QUICK) VIEWPORTS = [[360, 800], [820, 1180], [1440, 900]];

const APP_DIR = fs.existsSync("src/app") ? "src/app" : "app";

const routes = [];
const walk = (dir, segs = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    if (e.name.startsWith("_") || e.name.startsWith("@")) continue;
    const isGroup = /^\(.*\)$/.test(e.name);
    const next = isGroup ? segs : [...segs, e.name];
    const hasPage = ["page.jsx", "page.js", "page.tsx"].some((f) => fs.existsSync(path.join(dir, e.name, f)));
    if (hasPage && !next.some((s) => s.includes("["))) routes.push("/" + next.join("/"));
    walk(path.join(dir, e.name), next);
  }
};
walk(APP_DIR);

const roleOfRoute = (r) => r.split("/")[1]?.toLowerCase();
const targets = routes
  .filter((r) => ROLES.includes(roleOfRoute(r)))
  .filter((r) => !ONLY || r.includes(ONLY))
  .filter((r) => !/login|register|signup/.test(r));

console.log(`Routes: ${targets.length} x Viewports: ${VIEWPORTS.length}`);

const authFor = (role) => {
  const R = role.toUpperCase();
  const token = process.env[`TOKEN_${R}`];
  if (!token) return null;
  const roleVal = process.env[`ROLE_${R}`] || R;
  const user = process.env[`USER_${R}`] ||
    JSON.stringify({ role: role === "student" || role === "trainer" ? role : "admin", profileCompleted: true });
  return { token, roleVal, user };
};

// ---- page load with wait + retry + blank detection ----
const loadPage = async (page, url) => {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    } catch (e) {
      if (attempt === 2) return { ok: false, reason: "GOTO_FAIL: " + String(e.message || e).slice(0, 80) };
      continue;
    }
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.waitForSelector("main, [role=main], #__next main", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(1000);
    const len = await page.evaluate(() => (document.body?.innerText || "").trim().length).catch(() => 0);
    if (len >= 50) return { ok: true };
    if (attempt === 2) return { ok: false, reason: "BLANK" };
    await page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
  }
  return { ok: false, reason: "BLANK" };
};

const browser = await chromium.launch({ channel: "msedge" });
const results = [];

for (const role of ROLES) {
  const auth = authFor(role);
  if (!auth) { console.warn(`! TOKEN_${role.toUpperCase()} not set, skipping ${role}`); continue; }
  const rts = targets.filter((r) => roleOfRoute(r) === role);

  for (const [w, h] of VIEWPORTS) {
    for (const route of rts) {
      // fresh context per route x viewport -> no stale sidebar/localStorage state
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: w < 1024 });
      await ctx.addInitScript(({ token, roleVal, user }) => {
        localStorage.setItem("lms_token", token);
        localStorage.setItem("role", roleVal);
        localStorage.setItem("lms_user", user);
      }, auth);
      const page = await ctx.newPage();

      const rec = {
        role, route, viewport: `${w}x${h}`,
        overflow: false, blank: false, drawerOpen: false,
        scrollWidth: 0, offenders: [], authFailed: false, error: null,
      };
      try {
        const res = await loadPage(page, BASE + route);
        if (!res.ok) {
          if (res.reason === "BLANK") rec.blank = true;
          else rec.error = res.reason;
        }
        if (/login/.test(new URL(page.url()).pathname)) rec.authFailed = true;

        // screenshot first (as the user sees it, with clip intact)
        const slug = route.replace(/\//g, "_").replace(/^_/, "") || "root";
        const dir = path.join("responsive-shots", role, slug);
        fs.mkdirSync(dir, { recursive: true });
        await page.screenshot({ path: path.join(dir, `${w}x${h}.png`), fullPage: false });

        if (!rec.blank && !rec.error) {
          // strict: remove clip so hidden overflow becomes visible to measurement
          await page.addStyleTag({
            content: "html,body{overflow-x:visible !important}",
          });
          await page.waitForTimeout(200);

          const info = await page.evaluate(() => {
            const iw = window.innerWidth;
            const sw = Math.max(
              document.documentElement.scrollWidth,
              document.body ? document.body.scrollWidth : 0
            );
            // only real scroll containers (auto/scroll) count as safe.
            // hidden/clip are NOT safe: they hide the problem.
            const inScroller = (el) => {
              for (let p = el.parentElement; p && p !== document.body && p !== document.documentElement; p = p.parentElement) {
                const ox = getComputedStyle(p).overflowX;
                if (ox === "auto" || ox === "scroll") return true;
              }
              return false;
            };
            const off = [];
            for (const el of document.querySelectorAll("body *")) {
              const r = el.getBoundingClientRect();
              if (r.width === 0 || r.height === 0) continue;
              if (r.right <= iw + 1 && r.left >= -1) continue;
              if (inScroller(el)) continue;
              const pos = getComputedStyle(el).position;
              if (pos === "fixed") continue;
              const cls = typeof el.className === "string" ? el.className.trim().split(/\s+/).slice(0, 3).join(".") : "";
              off.push(`${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${cls ? "." + cls : ""} left=${Math.round(r.left)} right=${Math.round(r.right)}`);
              if (off.length >= 10) break;
            }
            // drawer/sidebar eating the viewport on narrow screens
            let drawer = false;
            if (iw < 768) {
              for (const el of document.querySelectorAll("aside, nav, [class*=sidebar i], [class*=drawer i]")) {
                const r = el.getBoundingClientRect();
                const cs = getComputedStyle(el);
                if (cs.display === "none" || cs.visibility === "hidden") continue;
                if (r.height > window.innerHeight * 0.6 && r.width > iw * 0.4 && r.right > 0 && r.left < iw * 0.5) {
                  drawer = true;
                  break;
                }
              }
            }
            return { iw, sw, off, drawer };
          });
          rec.scrollWidth = info.sw;
          rec.overflow = info.sw > info.iw || info.off.length > 0;
          rec.offenders = info.off;
          rec.drawerOpen = info.drawer;
        }
      } catch (e) {
        rec.error = String(e.message || e);
      }
      results.push(rec);
      const tag = rec.error ? "ERROR   " : rec.blank ? "BLANK   " : rec.overflow ? "OVERFLOW" : rec.drawerOpen ? "DRAWER  " : "ok      ";
      console.log(`${tag} ${role} ${route} ${w}x${h}${rec.authFailed ? " (redirected to login)" : ""}`);
      await ctx.close();
    }
  }
}
await browser.close();

const total = results.length;
const bad = results.filter((r) => r.overflow).length;
const blank = results.filter((r) => r.blank).length;
const errs = results.filter((r) => r.error).length;
const drawer = results.filter((r) => r.drawerOpen).length;
const authBad = results.filter((r) => r.authFailed).length;
fs.writeFileSync("responsive-report.json", JSON.stringify(results, null, 2));

let md = `# Responsive Check\n\n`;
md += `- **${bad} of ${total}** overflow (strict, clip removed)\n`;
md += `- **${blank}** BLANK pages (not valid results)\n`;
md += `- **${errs}** errors\n`;
md += `- **${drawer}** with drawer/sidebar covering narrow viewport\n`;
if (authBad) md += `\n> ${authBad} combos redirected to login, so token or localStorage keys are probably wrong.\n`;
md += `\n| Role | Route | Viewport | Status | scrollWidth | Offenders |\n|---|---|---|---|---|---|\n`;
for (const r of results.filter((x) => x.overflow || x.blank || x.error || x.drawerOpen)) {
  const status = r.error ? "ERROR" : r.blank ? "BLANK" : r.overflow ? "OVERFLOW" : "DRAWER";
  md += `| ${r.role} | ${r.route} | ${r.viewport} | ${status} | ${r.scrollWidth} | ${r.offenders.slice(0, 3).join("; ")} |\n`;
}
fs.writeFileSync("responsive-report.md", md);
console.log(`\nBASELINE: overflow ${bad}, blank ${blank}, error ${errs}, drawer-open ${drawer} of ${total} -> responsive-report.md`);