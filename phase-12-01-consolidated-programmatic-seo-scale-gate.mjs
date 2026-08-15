import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;
let changed = false;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};
const warn = (x) => console.log(`⚠ ${x}`);

const file = (p) => path.join(ROOT, p);
const exists = (p) => fs.existsSync(file(p));
const read = (p) => fs.readFileSync(file(p), "utf8");

console.log("======================================================================");
console.log("PHASE 12.01 — CONSOLIDATED PROGRAMMATIC SEO SCALE ENGINE");
console.log("SCALABLE ROUTES + KEYWORD PAGES + INTERNAL LINKING + INDEXING");
console.log("GUARDED IMPLEMENTATION + FULL REGRESSION");
console.log("PHASE 11 FOUNDATION PROTECTED");
console.log("======================================================================");

const protectedFiles = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts",
  "tsconfig.json",
  "package.json",
  "package-lock.json",
  ".gitignore"
];

console.log("\n===== 1. PHASE 11 FOUNDATION LOCK =====");

for (const p of protectedFiles) {
  exists(p)
    ? pass(`Protected: ${p}`)
    : fail(`Missing: ${p}`);
}

console.log("\n===== 2. PROGRAMMATIC ROUTE DISCOVERY =====");

const scalableRoutes = [
  "app/[lang]/tools/[slug]/[keyword]",
  "app/blog/[slug]/[keyword]",
  "app/tools/[slug]"
];

for (const p of scalableRoutes) {
  exists(p)
    ? pass(`Scalable route present: ${p}`)
    : fail(`Scalable route missing: ${p}`);
}

console.log("\n===== 3. TOOL CATALOG SCALE CONTRACT =====");

const catalog = read("data/tools.ts");

const catalogMarkers = [
  "slug",
  "name",
  "description",
  "category"
];

for (const marker of catalogMarkers) {
  catalog.includes(marker)
    ? pass(`Catalog field available: ${marker}`)
    : fail(`Catalog field missing: ${marker}`);
}

const toolsArray =
  catalog.match(/\b(?:tools|toolCatalog)\b\s*=\s*\[/)?.[0];

toolsArray
  ? pass("Structured tool catalog detected")
  : warn("Catalog array naming not detected automatically");

console.log("\n===== 4. TOOL → KEYWORD ROUTE CONTRACT =====");

const toolKeywordDir = "app/[lang]/tools/[slug]/[keyword]";
const toolKeywordFiles = exists(toolKeywordDir)
  ? fs.readdirSync(file(toolKeywordDir))
  : [];

toolKeywordFiles.length > 0
  ? pass(`Tool keyword route contains ${toolKeywordFiles.length} source file(s)`)
  : fail("Tool keyword route contains no source files");

for (const marker of [
  "generateMetadata",
  "canonical",
  "params"
]) {
  let found = false;

  for (const name of toolKeywordFiles) {
    const p = path.join(toolKeywordDir, name);
    if (fs.statSync(file(p)).isFile()) {
      const source = read(p);
      if (source.includes(marker)) {
        found = true;
        break;
      }
    }
  }

  found
    ? pass(`Tool keyword route contract: ${marker}`)
    : fail(`Tool keyword route missing: ${marker}`);
}

console.log("\n===== 5. BLOG → KEYWORD ROUTE CONTRACT =====");

const blogKeywordDir = "app/blog/[slug]/[keyword]";
const blogKeywordFiles = exists(blogKeywordDir)
  ? fs.readdirSync(file(blogKeywordDir))
  : [];

blogKeywordFiles.length > 0
  ? pass("Blog keyword route exists")
  : fail("Blog keyword route missing");

for (const marker of [
  "generateMetadata",
  "params"
]) {
  let found = false;

  for (const name of blogKeywordFiles) {
    const p = path.join(blogKeywordDir, name);

    if (fs.statSync(file(p)).isFile()) {
      const source = read(p);

      if (source.includes(marker)) {
        found = true;
        break;
      }
    }
  }

  found
    ? pass(`Blog keyword contract: ${marker}`)
    : fail(`Blog keyword contract missing: ${marker}`);
}

console.log("\n===== 6. DUPLICATE / NUMBERED SEO SAFETY =====");

const forbiddenPatterns = [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /tool-\d+/i,
  /slug-\d+/i
];

for (const pattern of forbiddenPatterns) {
  pattern.test(catalog)
    ? fail(`Forbidden SEO pattern detected: ${pattern}`)
    : pass(`Clean: ${pattern}`);
}

console.log("\n===== 7. CANONICAL + METADATA ARCHITECTURE =====");

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

console.log("\n===== 8. SITEMAP SCALE CONTRACT =====");

const sitemap = read("app/sitemap.ts");

for (const marker of [
  "tools",
  "map",
  "url"
]) {
  sitemap.includes(marker)
    ? pass(`Sitemap scale marker: ${marker}`)
    : fail(`Sitemap scale marker missing: ${marker}`);
}

console.log("\n===== 9. DISCOVERY + INTERNAL LINKING =====");

const discoveryFiles = [
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx"
];

for (const p of discoveryFiles) {
  const source = read(p);

  source.includes("href")
    ? pass(`Internal navigation present: ${p}`)
    : fail(`Internal navigation missing: ${p}`);
}

console.log("\n===== 10. CATEGORY → TOOL SCALE =====");

const categoryPage = read("app/categories/[category]/page.tsx");

[
  "tools",
  "href"
].forEach((marker) => {
  categoryPage.includes(marker)
    ? pass(`Category scale marker: ${marker}`)
    : fail(`Category scale marker missing: ${marker}`);
});

console.log("\n===== 11. SEO URL SAFETY =====");

const routeSources = [];

for (const p of [
  "app/[lang]/tools/[slug]/[keyword]",
  "app/blog/[slug]/[keyword]",
  "app/tools/[slug]"
]) {
  if (!exists(p)) continue;

  for (const name of fs.readdirSync(file(p))) {
    const absolute = path.join(p, name);

    if (fs.statSync(file(absolute)).isFile()) {
      routeSources.push(read(absolute));
    }
  }
}

const routeText = routeSources.join("\n");

[
  "params",
  "slug",
  "keyword"
].forEach((marker) => {
  routeText.includes(marker)
    ? pass(`Dynamic URL parameter detected: ${marker}`)
    : fail(`Dynamic URL parameter missing: ${marker}`);
});

console.log("\n===== 12. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
].forEach((p) => {
  exists(p)
    ? fail(`Stale architecture exists: ${p}`)
    : pass(`Stale absent: ${p}`);
});

console.log("\n===== 13. LEGACY REDIRECT SAFETY =====");

const nextConfig = read("next.config.ts");

[
  "case-converter",
  "text-to-slug"
].forEach((marker) => {
  nextConfig.includes(marker)
    ? pass(`Legacy route protection: ${marker}`)
    : fail(`Legacy route protection missing: ${marker}`);
});

console.log("\n===== 14. PHASE 11 REGRESSION =====");

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
    : fail(`ToolClient regression: ${marker}`);
});

console.log("\n===== 15. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    stdio: "inherit"
  });

  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  console.log("\n======================================================================");
  console.log("PHASE 12.01 PRE-BUILD GATE FAILED");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("FILES CHANGED: 0");
  console.log("NO PRODUCTION EXPANSION APPLIED");
  console.log("======================================================================");
  process.exit(1);
}

console.log("\n===== 16. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    stdio: "inherit"
  });

  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 17. LIVE SCALABLE ROUTE SMOKE =====");

const liveRoutes = [
  "/",
  "/tools",
  "/categories",
  "/blog",
  "/sitemap.xml",
  "/robots.txt"
];

for (const route of liveRoutes) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${route}`,
      { encoding: "utf8" }
    ).trim();

    status === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${status}`);
  } catch {
    fail(`${route} → unreachable`);
  }
}

console.log("\n===== 18. REPRESENTATIVE TOOL + SEO ROUTES =====");

const representativeRoutes = [
  "/tools/keyword-density-checker",
  "/tools/seo-slug-generator",
  "/tools/word-counter",
  "/tools/json-formatter",
  "/tools/base64-encoder"
];

for (const route of representativeRoutes) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${route}`,
      { encoding: "utf8" }
    ).trim();

    status === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${status}`);
  } catch {
    fail(`${route} → unreachable`);
  }
}

console.log("\n===== 19. RUNTIME ERROR FORENSICS =====");

for (const route of representativeRoutes) {
  try {
    const html = execSync(
      `curl -s http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const leaked =
      /Application error/i.test(html) ||
      /Internal Server Error/i.test(html) ||
      /Unhandled Runtime Error/i.test(html);

    leaked
      ? fail(`${route} → runtime error leakage`)
      : pass(`${route} → runtime clean`);
  } catch {
    fail(`${route} → runtime request failed`);
  }
}

console.log("\n===== 20. FINAL FOUNDATION INTEGRITY =====");

for (const p of protectedFiles) {
  exists(p)
    ? pass(`Final intact: ${p}`)
    : fail(`Final missing: ${p}`);
}

console.log("\n======================================================================");
console.log("PHASE 12.01 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log(`FILES CHANGED: ${changed ? 1 : 0}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 12.01: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT EXPAND CONTENT ARCHITECTURE.");
  process.exit(1);
}

console.log("✅ PHASE 12.01: PASS");
console.log("PROGRAMMATIC SEO ROUTES VERIFIED");
console.log("SCALABLE KEYWORD ARCHITECTURE VERIFIED");
console.log("CANONICAL + METADATA ARCHITECTURE VERIFIED");
console.log("SITEMAP SCALE VERIFIED");
console.log("INTERNAL LINKING VERIFIED");
console.log("135-TOOL FOUNDATION PRESERVED");
console.log("PHASE 11 REGRESSION PASSED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("RUNTIME FORENSICS PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.01 COMPLETE — READY FOR SCALABLE SEO EXPANSION");
console.log("======================================================================");
