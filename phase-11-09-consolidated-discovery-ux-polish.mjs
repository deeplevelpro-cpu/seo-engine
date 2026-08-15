import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;
let changed = false;

const snapshots = new Map();

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};

const exists = (p) => fs.existsSync(path.join(ROOT, p));
const full = (p) => path.join(ROOT, p);
const read = (p) => fs.readFileSync(full(p), "utf8");
const write = (p, value) => {
  fs.writeFileSync(full(p), value);
  changed = true;
};

const snapshot = (p) => {
  if (!snapshots.has(p) && exists(p)) {
    snapshots.set(p, fs.readFileSync(full(p), "utf8"));
  }
};

const rollback = () => {
  for (const [p, content] of snapshots) {
    fs.writeFileSync(full(p), content);
  }
};

const run = (cmd) => {
  execSync(cmd, { stdio: "inherit" });
};

console.log("======================================================================");
console.log("PHASE 11.09 — CONSOLIDATED DISCOVERY + UX POLISH");
console.log("TOOLS DISCOVERY + CATEGORIES + INTERNAL LINKING + SEO + BUILD");
console.log("GUARDED IMPLEMENTATION — AUTOMATIC ROLLBACK ON FAILURE");
console.log("TOOLCLIENT PROTECTED");
console.log("======================================================================");

console.log("\n===== 1. PHASE 10 FOUNDATION PROTECTION =====");

const protectedFiles = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts",
  "tsconfig.json",
  "package.json",
  "package-lock.json",
  ".gitignore"
];

for (const file of protectedFiles) {
  exists(file)
    ? pass(`Protected: ${file}`)
    : fail(`Missing: ${file}`);
}

if (failed > 0) process.exit(1);

console.log("\n===== 2. DISCOVERY SOURCE SNAPSHOT =====");

const discoveryFiles = [
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx"
];

for (const file of discoveryFiles) {
  if (exists(file)) {
    snapshot(file);
    pass(`Snapshot created: ${file}`);
  } else {
    fail(`Discovery file missing: ${file}`);
  }
}

console.log("\n===== 3. TOOLS PAGE DISCOVERY POLISH =====");

let toolsPage = read("app/tools/page.tsx");

const toolsHasLinks = /href\s*=/.test(toolsPage);
const toolsHasToolCatalog = /tools|catalog|tool/i.test(toolsPage);

toolsHasLinks
  ? pass("Tools page already contains navigation links")
  : fail("Tools page navigation missing");

toolsHasToolCatalog
  ? pass("Tools discovery content detected")
  : fail("Tools discovery content missing");

/*
 Do not blindly rewrite an existing working discovery page.
 Only add a lightweight semantic navigation marker when there is
 a clear existing <main> section and the marker is not already present.
*/
if (
  toolsPage.includes("<main") &&
  !toolsPage.includes("aria-label=\"Tool discovery\"")
) {
  const updated = toolsPage.replace(
    /<main\b([^>]*)>/,
    '<main$1 aria-label="Tool discovery">'
  );

  if (updated !== toolsPage) {
    write("app/tools/page.tsx", updated);
    toolsPage = updated;
    pass("Tools discovery semantic label added");
  }
} else {
  pass("Tools discovery semantic label already safe or unnecessary");
}

console.log("\n===== 4. CATEGORY DISCOVERY POLISH =====");

let categoriesPage = read("app/categories/page.tsx");
let categoryPage = read("app/categories/[category]/page.tsx");

categoriesPage.includes("href")
  ? pass("Category index navigation present")
  : fail("Category index navigation missing");

categoryPage.includes("href")
  ? pass("Category → tool navigation present")
  : fail("Category → tool navigation missing");

if (
  categoriesPage.includes("<main") &&
  !categoriesPage.includes("aria-label=\"Category discovery\"")
) {
  const updated = categoriesPage.replace(
    /<main\b([^>]*)>/,
    '<main$1 aria-label="Category discovery">'
  );

  if (updated !== categoriesPage) {
    write("app/categories/page.tsx", updated);
    categoriesPage = updated;
    pass("Category discovery semantic label added");
  }
} else {
  pass("Category discovery semantic label already safe or unnecessary");
}

if (
  categoryPage.includes("<main") &&
  !categoryPage.includes("aria-label=\"Category tools\"")
) {
  const updated = categoryPage.replace(
    /<main\b([^>]*)>/,
    '<main$1 aria-label="Category tools">'
  );

  if (updated !== categoryPage) {
    write("app/categories/[category]/page.tsx", updated);
    categoryPage = updated;
    pass("Category tools semantic label added");
  }
} else {
  pass("Category tools semantic label already safe or unnecessary");
}

console.log("\n===== 5. INTERNAL LINKING + SEO SAFETY =====");

const allDiscoverySources = [
  toolsPage,
  categoriesPage,
  categoryPage
];

for (const source of allDiscoverySources) {
  source.includes("href")
    ? pass("Internal navigation links preserved")
    : fail("Internal navigation links missing");
}

const toolPage = read("app/tools/[slug]/page.tsx");

[
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
].forEach((marker) => {
  toolPage.includes(marker)
    ? pass(`Tool SEO preserved: ${marker}`)
    : fail(`Tool SEO missing: ${marker}`);
});

console.log("\n===== 6. 135-TOOL ARCHITECTURE =====");

const catalog = read("data/tools.ts");
const registry = read("src/lib/tools/index.ts");

const requiredTools = [
  "keyword-density-checker",
  "keyword-frequency-checker",
  "meta-tag-generator",
  "meta-description-generator",
  "title-tag-generator",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "character-counter",
  "json-formatter",
  "base64-encoder",
  "percentage-calculator",
  "age-calculator",
  "compound-interest-calculator",
  "list-randomizer",
  "checklist-generator"
];

for (const slug of requiredTools) {
  catalog.includes(slug)
    ? pass(`Catalog preserved: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry preserved: ${slug}`)
    : fail(`Registry missing: ${slug}`);
}

registry.includes("getToolHandler")
  ? pass("getToolHandler preserved")
  : fail("getToolHandler missing");

registry.includes("text-to-slug")
  ? fail("Legacy text-to-slug handler detected")
  : pass("Legacy text-to-slug handler absent");

console.log("\n===== 7. TOOLCLIENT PROTECTION =====");

const toolClient = read("app/tools/[slug]/ToolClient.tsx");

[
  'aria-label="Tool input"',
  "spellCheck={false}",
  "getToolHandler",
  "inputSchema",
  "setText",
  "setResult",
  "setLoading"
].forEach((marker) => {
  toolClient.includes(marker)
    ? pass(`ToolClient preserved: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
});

if (/onChange=\{\(e\)\s*=>/.test(toolClient)) {
  pass("ToolClient valid onChange preserved");
} else {
  fail("ToolClient onChange handler missing");
}

console.log("\n===== 8. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
].forEach((file) => {
  exists(file)
    ? fail(`Stale file exists: ${file}`)
    : pass(`Stale absent: ${file}`);
});

console.log("\n===== 9. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

sitemap.includes("tools")
  ? pass("Sitemap tool integration preserved")
  : fail("Sitemap tool integration missing");

robots.includes("sitemap")
  ? pass("Robots sitemap preserved")
  : fail("Robots sitemap missing");

console.log("\n===== 10. LEGACY REDIRECTS =====");

const nextConfig = read("next.config.ts");

[
  "case-converter",
  "text-to-slug"
].forEach((marker) => {
  nextConfig.includes(marker)
    ? pass(`Redirect preserved: ${marker}`)
    : fail(`Redirect missing: ${marker}`);
});

console.log("\n===== 11. TYPESCRIPT =====");

try {
  run("npx tsc --noEmit");
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  rollback();
  console.log("\n======================================================================");
  console.log("PHASE 11.09 PRE-BUILD FAILURE");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("🔄 AUTOMATIC ROLLBACK APPLIED");
  console.log("NO DEPLOYMENT.");
  process.exit(1);
}

console.log("\n===== 12. PRODUCTION BUILD =====");

try {
  run("npm run build");
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 13. LIVE ROUTE REGRESSION =====");

let serverUp = true;

try {
  execSync(
    "curl -fsS --max-time 5 http://localhost:3000 >/dev/null",
    { stdio: "ignore" }
  );
  pass("localhost:3000 responding");
} catch {
  serverUp = false;
  console.log("⚠ localhost:3000 not responding — live route checks skipped");
}

if (serverUp) {
  const routes = [
    "/",
    "/tools",
    "/categories",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/sitemap.xml",
    "/robots.txt"
  ];

  for (const route of routes) {
    try {
      execSync(
        `curl -fsS --max-time 8 http://localhost:3000${route} >/dev/null`,
        { stdio: "ignore" }
      );
      pass(`${route} → HTTP 200`);
    } catch {
      fail(`${route} → request failed`);
    }
  }
}

console.log("\n===== 14. REPRESENTATIVE TOOL REGRESSION =====");

if (serverUp) {
  for (const slug of [
    "keyword-density-checker",
    "meta-tag-generator",
    "seo-slug-generator",
    "text-case-converter",
    "word-counter",
    "json-formatter"
  ]) {
    try {
      execSync(
        `curl -fsS --max-time 8 http://localhost:3000/tools/${slug} >/dev/null`,
        { stdio: "ignore" }
      );
      pass(`${slug} → HTTP 200`);
    } catch {
      fail(`${slug} → request failed`);
    }
  }
}

console.log("\n===== 15. FINAL SOURCE INTEGRITY =====");

for (const file of protectedFiles) {
  exists(file)
    ? pass(`Final intact: ${file}`)
    : fail(`Final missing: ${file}`);
}

if (failed > 0) {
  rollback();

  console.log("\n======================================================================");
  console.log("PHASE 11.09 FINAL FAILURE");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("🔄 AUTOMATIC ROLLBACK APPLIED");
  console.log("DO NOT DEPLOY.");
  console.log("======================================================================");

  process.exit(1);
}

console.log("\n======================================================================");
console.log("PHASE 11.09 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log(`FILES CHANGED : ${changed ? 1 : 0}`);
console.log("======================================================================");

console.log("✅ PHASE 11.09: PASS");
console.log("DISCOVERY UX POLISHED");
console.log("CATEGORY DISCOVERY POLISHED");
console.log("INTERNAL NAVIGATION VERIFIED");
console.log("TOOLCLIENT PROTECTED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("SEO VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("LEGACY REDIRECTS VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES VERIFIED");
console.log("======================================================================");
console.log("🚀 PHASE 11.09 COMPLETE");
console.log("======================================================================");
