// Usage: npm run audit:responsive
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

const walk = (dir, out = []) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.jsx$/.test(e.name)) out.push(p);
  }
  return out;
};

const roleOf = (file) => {
  const p = file.replace(/\\/g, "/").toLowerCase();
  if (/\/superadmin\b/.test(p)) return "superadmin";
  if (/\/student\b/.test(p)) return "student";
  if (/\/trainer\b/.test(p)) return "trainer";
  if (/\/admin\b/.test(p)) return "admin";
  return "shared";
};

const count = (s, re) => (s.match(re) || []).length;

const RULES = [
  { key: "fixedWidth", weight: 3, label: "Fixed width >= 300px",
    fn: (s) => [...s.matchAll(/(?:min)?[wW]idth\s*:\s*["']?(\d{3,4})(?:px)?["']?/g)].filter((m) => +m[1] >= 300).length },
  { key: "fixedGrid", weight: 3, label: "grid repeat(N,) without auto-fit",
    fn: (s) => count(s, /(?:grid-template-columns|gridTemplateColumns)\s*:\s*["'`]?repeat\(\s*\d+\s*,/g) },
  { key: "tableNoScroll", weight: 4, label: "<table> without scroll wrapper",
    fn: (s) => (/overflowX|overflow-x|rs-scroll-x|overflow-auto/.test(s) ? 0 : count(s, /<table\b/g)) },
  { key: "fixedPos", weight: 2, label: "position: fixed overlay/modal",
    fn: (s) => count(s, /position\s*:\s*["']?fixed|["'\s]fixed\s+inset/g) },
  { key: "vh100", weight: 2, label: "100vh",
    fn: (s) => count(s, /100vh/g) },
  { key: "jsWidth", weight: 2, label: "innerWidth / matchMedia",
    fn: (s) => count(s, /window\.innerWidth|matchMedia/g) },
  { key: "overflowHidden", weight: 1, label: "overflow: hidden",
    fn: (s) => count(s, /overflow(?:X|Y)?\s*:\s*["']hidden|overflow-hidden/g) },
  { key: "smallFont", weight: 1, label: "font-size < 14px",
    fn: (s) =>
      [...s.matchAll(/fontSize\s*:\s*["']?(\d{1,2})(?:px)?["']?/g)].filter((m) => +m[1] < 14).length +
      [...s.matchAll(/text-\[(\d{1,2})px\]/g)].filter((m) => +m[1] < 14).length },
  { key: "hoverOnly", weight: 1, label: "onMouseEnter/Over handlers",
    fn: (s) => count(s, /onMouseEnter|onMouseOver/g) },
];

const files = fs.existsSync(SRC) ? walk(SRC) : [];
const rows = files.map((f) => {
  const s = fs.readFileSync(f, "utf8");
  const hits = {};
  let score = 0;
  for (const r of RULES) {
    const n = r.fn(s);
    if (n) { hits[r.key] = n; score += n * r.weight; }
  }
  return { file: path.relative(ROOT, f).replace(/\\/g, "/"), role: roleOf(f),
           lines: s.split("\n").length, score, hits };
}).filter((r) => r.score > 0);

rows.sort((a, b) => b.score - a.score);
const roles = ["student", "trainer", "admin", "superadmin", "shared"];
const totals = Object.fromEntries(roles.map((r) => [r, rows.filter((x) => x.role === r).reduce((a, x) => a + x.score, 0)]));

let md = `# RESPONSIVE AUDIT\n\nGenerated: ${new Date().toISOString()}\nFiles scanned: ${files.length} | Files with issues: ${rows.length}\n\n`;
md += `## Total risk score per role (baseline)\n\n| Role | Score |\n|---|---|\n`;
for (const r of roles) md += `| ${r} | ${totals[r]} |\n`;
md += `\nRules: ${RULES.map((r) => `${r.key} (x${r.weight})`).join(", ")}\n`;

for (const role of roles) {
  const top = rows.filter((r) => r.role === role).slice(0, 30);
  if (!top.length) continue;
  md += `\n## ${role} (top ${top.length})\n\n| # | File | Lines | Score | Hits |\n|---|---|---|---|---|\n`;
  top.forEach((r, i) => {
    md += `| ${i + 1} | \`${r.file}\` | ${r.lines} | ${r.score} | ${Object.entries(r.hits).map(([k, v]) => `${k}:${v}`).join(", ")} |\n`;
  });
}

fs.writeFileSync("RESPONSIVE_AUDIT.md", md);
fs.writeFileSync("RESPONSIVE_AUDIT.json", JSON.stringify({ totals, rows }, null, 2));
console.log("Done -> RESPONSIVE_AUDIT.md / .json");
console.log(totals);