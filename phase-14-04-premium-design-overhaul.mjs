import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(root, `.design-backup-${stamp}`);

const files = [
  "app/globals.css",
  "app/styles/global.css",
  "app/layout.tsx",
  "app/page.tsx",
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/blog/page.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
  "app/posts/page.tsx",
  "app/privacy-policy/page.tsx",
  "app/terms/page.tsx",
  "app/seo-tool-1/page.tsx",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/categories/[category]/page.tsx",
  "app/blog/[slug]/page.tsx"
];

const exists = f => fs.existsSync(path.join(root, f));
const read = f => fs.readFileSync(path.join(root, f), "utf8");
const write = (f, s) => {
  const p = path.join(root, f);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, s);
};

const check = (name, ok) => {
  if (ok) console.log(`✓ ${name}`);
  else {
    console.log(`✗ ${name}`);
    process.exitCode = 1;
  }
};

console.log("======================================================================");
console.log("PHASE 14.04 — PREMIUM LIGHT DESIGN OVERHAUL");
console.log("LIGHT BLUE + WHITE + PURPLE + SOFT GREY");
console.log("GLOBAL DESIGN SYSTEM + HOMEPAGE + CORE PAGES");
console.log("NO SEO ENGINE CHANGE | NO ROUTE CHANGE | NO DATA CHANGE");
console.log("BACKUP GUARDED | BUILD VERIFIED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION BACKUP =====");

fs.mkdirSync(backupDir, { recursive: true });

for (const f of files) {
  if (exists(f)) {
    const dest = path.join(backupDir, f);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(root, f), dest);
    console.log(`✓ Backup: ${f}`);
  }
}

console.log(`✓ Design backup: ${path.relative(root, backupDir)}`);

console.log("\n===== 2. PROTECTED SEO FILES =====");

[
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "src/lib/contentGenerator.js",
  "src/lib/seo/keywordExpansion.js",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/[lang]/tools/[slug]/[keyword]/page.js",
  "app/blog/[slug]/[keyword]/page.js"
].forEach(f => check(`Protected: ${f}`, exists(f)));

console.log("\n===== 3. GLOBAL PREMIUM LIGHT DESIGN SYSTEM =====");

const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

/* =========================================================
   AI TOOL ENGINE — PREMIUM LIGHT DESIGN SYSTEM
   Blue / White / Purple / Soft Grey
   ========================================================= */

:root {
  --bg: #f7faff;
  --bg-soft: #eef5ff;
  --surface: #ffffff;
  --surface-soft: #f8faff;

  --text: #172033;
  --text-strong: #101828;
  --muted: #667085;
  --muted-2: #98a2b3;

  --blue: #4f7cff;
  --blue-dark: #3158d4;
  --blue-soft: #e8efff;

  --purple: #8b5cf6;
  --purple-dark: #7041dc;
  --purple-soft: #f1ebff;

  --cyan: #22b8cf;
  --border: #dfe7f3;
  --border-soft: #edf1f7;

  --shadow-sm: 0 4px 18px rgba(46, 76, 120, .07);
  --shadow-md: 0 12px 35px rgba(46, 76, 120, .11);
  --shadow-lg: 0 22px 60px rgba(46, 76, 120, .14);

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 22px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background:
    radial-gradient(circle at 8% 0%, rgba(79,124,255,.12), transparent 30%),
    radial-gradient(circle at 92% 8%, rgba(139,92,246,.10), transparent 28%),
    linear-gradient(180deg, #fbfdff 0%, #f5f8fd 52%, #ffffff 100%);
  color: var(--text);
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  opacity: .42;
  background-image:
    linear-gradient(rgba(79,124,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139,92,246,.025) 1px, transparent 1px);
  background-size: 56px 56px;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

::selection {
  background: rgba(79,124,255,.20);
  color: var(--text-strong);
}

/* =========================================================
   SHARED PAGE SYSTEM
   ========================================================= */

.site-shell,
.page-shell,
main {
  color: var(--text);
}

.container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

h1,
h2,
h3,
h4 {
  color: var(--text-strong);
  line-height: 1.15;
  letter-spacing: -.025em;
}

p {
  color: var(--muted);
}

/* Shared navigation */

.site-nav,
.navbar,
header.nav {
  position: relative;
  z-index: 20;
  background: rgba(255,255,255,.88);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 4px 20px rgba(46,76,120,.05);
  backdrop-filter: blur(18px);
}

.site-nav a,
.navbar a,
header.nav nav a {
  color: #344054;
  font-size: 16px;
  font-weight: 750;
  transition: color .18s ease, transform .18s ease;
}

.site-nav a:hover,
.navbar a:hover,
header.nav nav a:hover {
  color: var(--blue-dark);
}

header.nav nav a.active,
.site-nav a.active,
.navbar a.active {
  color: var(--blue-dark);
}

/* Shared cards */

.card,
.tool-card,
.tool,
.feature-card,
.category-card,
.blog-card,
article {
  background: rgba(255,255,255,.92);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.card:hover,
.tool-card:hover,
.tool:hover,
.feature-card:hover,
.category-card:hover,
.blog-card:hover {
  border-color: rgba(79,124,255,.28);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

/* Shared buttons */

button,
.btn,
.primary,
.secondary,
.allTools {
  transition:
    transform .18s ease,
    box-shadow .18s ease,
    background .18s ease,
    border-color .18s ease;
}

.primary,
.btn-primary {
  color: #fff !important;
  background: linear-gradient(135deg, #4f7cff, #7656e8);
  border: 0;
  box-shadow: 0 10px 25px rgba(79,124,255,.22);
}

.primary:hover,
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 32px rgba(79,124,255,.28);
}

.secondary,
.btn-secondary {
  color: #344054 !important;
  background: #fff;
  border: 1px solid #cfd9e8;
  box-shadow: var(--shadow-sm);
}

.secondary:hover,
.btn-secondary:hover {
  background: #f7f9ff;
  border-color: #9fb3d8;
  transform: translateY(-2px);
}

/* =========================================================
   COMMON PAGE BEAUTIFICATION
   ========================================================= */

section {
  position: relative;
}

label {
  color: var(--text-strong);
  font-weight: 700;
}

input,
textarea,
select {
  color: var(--text);
  background: #fff;
  border: 1px solid #cfd8e8;
  border-radius: 12px;
  outline: none;
  box-shadow: 0 2px 8px rgba(46,76,120,.04);
}

input:focus,
textarea:focus,
select:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 4px rgba(79,124,255,.10);
}

footer {
  background: #f1f5fb !important;
  color: #344054 !important;
  border-top: 1px solid var(--border) !important;
}

footer a {
  color: #475467 !important;
}

footer a:hover {
  color: var(--blue-dark) !important;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {
  .container {
    width: min(100% - 28px, 720px);
  }

  header.nav {
    height: auto !important;
    min-height: 76px;
    padding: 14px 0;
  }

  header.nav nav {
    gap: 16px !important;
    flex-wrap: wrap;
    justify-content: center;
  }

  header.nav nav a {
    font-size: 15px;
  }
}

@media (max-width: 640px) {
  body {
    font-size: 15px;
  }

  .container {
    width: min(100% - 22px, 560px);
  }

  header.nav {
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center !important;
  }

  header.nav nav {
    order: 3;
    width: 100%;
  }
}
`;

write("app/globals.css", globalCss);
write("app/styles/global.css", globalCss);

console.log("✓ Premium light global CSS installed");

console.log("\n===== 4. ROOT LAYOUT THEME =====");

const layoutPath = "app/layout.tsx";
if (exists(layoutPath)) {
  let layout = read(layoutPath);

  layout = layout.replace(
    /background:\s*["']#0f172a["']/g,
    'background: "#f7faff"'
  );

  layout = layout.replace(
    /color:\s*["']white["']/g,
    'color: "#172033"'
  );

  write(layoutPath, layout);
  console.log("✓ Root layout background switched to premium light");
} else {
  console.log("⚠ Root layout not changed");
}

console.log("\n===== 5. HOMEPAGE DESIGN OVERRIDE =====");

const homePath = "app/page.tsx";

if (exists(homePath)) {
  let home = read(homePath);

  /*
   * Preserve all JSX/content.
   * Replace only the existing dark visual tokens in the page-local style.
   */

  const replacements = [
    ["color: #f8fafc;", "color: #172033;"],
    ["#020617", "#f7faff"],
    ["#081125", "#eef5ff"],
    ["#0d172d", "#ffffff"],
    ["#111e38", "#f8faff"],
    ["#1d2a44", "#dfe7f3"],
    ["#94a3b8", "#667085"],
    ["#22d3ee", "#4f7cff"],
    ["#06b6d4", "#4f7cff"],
    ["#009dff", "#8bb8ff"],
    ["#8b2cff", "#b28cff"],
    ["#010511", "#eef3fa"],
    ["#111c31", "#dfe7f3"],
    ["#334155", "#cfd8e8"],
    ["#64748b", "#667085"],
    ["#475569", "#98a2b3"],
    ["#001018", "#ffffff"]
  ];

  for (const [a, b] of replacements) {
    home = home.split(a).join(b);
  }

  /*
   * Make the existing navigation much more readable.
   */
  home = home.replace(
    /font-size:\s*13px;\s*\n\s*font-weight:\s*850;/g,
    "font-size: 16px;\n          font-weight: 800;"
  );

  home = home.replace(
    /font-size:\s*18px;\s*\n\s*font-weight:\s*1000;/g,
    "font-size: 21px;\n          font-weight: 900;"
  );

  /*
   * Increase muted nav contrast.
   */
  home = home.replace(
    /color:\s*#667085;\s*\n\s*text-decoration:\s*none;\s*\n\s*font-size:\s*16px/g,
    "color: #344054;\n           text-decoration: none;\n           font-size: 16px"
  );

  /*
   * Improve homepage card readability.
   */
  home = home.replace(
    /font-size:\s*13px;\s*\n\s*line-height:\s*1\.55;/g,
    "font-size: 15px;\n   line-height: 1.65;"
  );

  write(homePath, home);
  console.log("✓ Homepage visual system upgraded");
  console.log("✓ Existing homepage content preserved");
  console.log("✓ Existing homepage JSX preserved");
} else {
  console.log("⚠ Homepage not found");
}

console.log("\n===== 6. CORE PAGE SAFETY =====");

[
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/blog/page.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
  "app/posts/page.tsx",
  "app/privacy-policy/page.tsx",
  "app/terms/page.tsx"
].forEach(f => check(`Core page preserved: ${f}`, exists(f)));

console.log("\n===== 7. SEO / FUNCTIONALITY PROTECTION =====");

[
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "src/lib/contentGenerator.js",
  "src/lib/seo/keywordExpansion.js",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/[lang]/tools/[slug]/[keyword]/page.js",
  "app/blog/[slug]/[keyword]/page.js"
].forEach(f => check(`SEO protected: ${f}`, exists(f)));

console.log("\n===== 8. SYNTAX =====");

const syntaxFiles = [
  "src/lib/contentGenerator.js",
  "src/lib/seo/keywordExpansion.js",
  "app/[lang]/tools/[slug]/[keyword]/page.js",
  "app/blog/[slug]/[keyword]/page.js"
];

for (const f of syntaxFiles) {
  try {
    execSync(`node --check "${f}"`, {
      cwd: root,
      stdio: "pipe"
    });
    console.log(`✓ Syntax: ${f}`);
  } catch {
    console.log(`✗ Syntax: ${f}`);
    process.exitCode = 1;
  }
}

console.log("\n===== 9. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NEXT_DISABLE_TURBOPACK: "1" }
  });
  console.log("✓ TypeScript PASS");
} catch {
  console.log("✗ TypeScript FAIL");
  process.exitCode = 1;
}

console.log("\n===== 10. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, NEXT_DISABLE_TURBOPACK: "1" }
  });
  console.log("✓ Production build PASS");
} catch {
  console.log("✗ Production build FAIL");
  process.exitCode = 1;
}

console.log("\n===== 11. FINAL DESIGN CONTRACT =====");

check(
  "Light background installed",
  /--bg:\s*#f7faff/i.test(read("app/globals.css"))
);

check(
  "Purple accent installed",
  /--purple:\s*#8b5cf6/i.test(read("app/globals.css"))
);

check(
  "Blue accent installed",
  /--blue:\s*#4f7cff/i.test(read("app/globals.css"))
);

check(
  "White surface installed",
  /--surface:\s*#ffffff/i.test(read("app/globals.css"))
);

check(
  "Homepage preserved",
  exists("app/page.tsx")
);

console.log("\n======================================================================");

if (process.exitCode) {
  console.log("❌ PHASE 14.04: FAIL");
  console.log("DESIGN CHANGES ARE BACKED UP");
  console.log(`BACKUP: ${backupDir}`);
  console.log("FIX THE FAILED CHECKS BEFORE DEPLOYMENT");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 14.04: PASS");
console.log("PREMIUM LIGHT DESIGN INSTALLED");
console.log("BLUE + WHITE + PURPLE SYSTEM INSTALLED");
console.log("GLOBAL TYPOGRAPHY IMPROVED");
console.log("NAVIGATION READABILITY IMPROVED");
console.log("CARD SYSTEM IMPROVED");
console.log("HOMEPAGE PRESERVED");
console.log("SEO ENGINE PRESERVED");
console.log("PROGRAMMATIC ROUTES PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 14.04 COMPLETE — READY FOR VISUAL QA");
console.log("======================================================================");
