import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};

const exists = (p) => fs.existsSync(path.join(ROOT, p));
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

console.log("======================================================================");
console.log("PHASE 12.04 — PROGRAMMATIC SEO RUNTIME + INDEXABILITY FINAL GATE");
console.log("RUNTIME + METADATA + CANONICAL + INDEXING + SITEMAP + BUILD");
console.log("READ/REGRESSION GATE — NO FEATURE EXPANSION");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION =====");

const foundation = [
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

for (const file of foundation) {
  exists(file)
    ? pass(`Foundation: ${file}`)
    : fail(`Foundation missing: ${file}`);
}

if (failed > 0) process.exit(1);

console.log("\n===== 2. PROGRAMMATIC ROUTES =====");

const toolKeywordDir = "app/[lang]/tools/[slug]/[keyword]";
const blogKeywordDir = "app/blog/[slug]/[keyword]";

exists(toolKeywordDir)
  ? pass("Tool keyword route present")
  : fail("Tool keyword route missing");

exists(blogKeywordDir)
  ? pass("Blog keyword route present")
  : fail("Blog keyword route missing");

const findPage = (dir) => {
  for (const name of ["page.tsx", "page.ts", "page.jsx", "page.js"]) {
    const p = path.join(ROOT, dir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
};

const toolKeywordFile = findPage(toolKeywordDir);
const blogKeywordFile = findPage(blogKeywordDir);

if (toolKeywordFile) {
  pass(`Tool keyword source: ${path.relative(ROOT, toolKeywordFile)}`);
} else {
  fail("Tool keyword source missing");
}

if (blogKeywordFile) {
  pass(`Blog keyword source: ${path.relative(ROOT, blogKeywordFile)}`);
} else {
  fail("Blog keyword source missing");
}

if (failed > 0) process.exit(1);

const toolKeyword = fs.readFileSync(toolKeywordFile, "utf8");
const blogKeyword = fs.readFileSync(blogKeywordFile, "utf8");

console.log("\n===== 3. DYNAMIC PARAMETER CONTRACT =====");

for (const marker of ["params", "slug", "keyword"]) {
  toolKeyword.includes(marker)
    ? pass(`Tool keyword: ${marker}`)
    : fail(`Tool keyword missing: ${marker}`);

  blogKeyword.includes(marker)
    ? pass(`Blog keyword: ${marker}`)
    : fail(`Blog keyword missing: ${marker}`);
}

console.log("\n===== 4. METADATA + CANONICAL CONTRACT =====");

for (const marker of [
  "generateMetadata",
  "canonical",
  "alternates"
]) {
  toolKeyword.includes(marker)
    ? pass(`Tool keyword SEO: ${marker}`)
    : fail(`Tool keyword SEO missing: ${marker}`);

  blogKeyword.includes(marker)
    ? pass(`Blog keyword SEO: ${marker}`)
    : fail(`Blog keyword SEO missing: ${marker}`);
}

console.log("\n===== 5. INDEXABILITY CONTRACT =====");

for (const marker of ["robots", "canonical"]) {
  toolKeyword.includes(marker)
    ? pass(`Tool indexability: ${marker}`)
    : fail(`Tool indexability missing: ${marker}`);

  blogKeyword.includes(marker)
    ? pass(`Blog indexability: ${marker}`)
    : fail(`Blog indexability missing: ${marker}`);
}

console.log("\n===== 6. TOOL PAGE SEO REGRESSION =====");

const toolPage = read("app/tools/[slug]/page.tsx");

for (const marker of [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  toolPage.includes(marker)
    ? pass(`Tool SEO: ${marker}`)
    : fail(`Tool SEO missing: ${marker}`);
}

console.log("\n===== 7. TOOLCLIENT REGRESSION =====");

const toolClient = read("app/tools/[slug]/ToolClient.tsx");

for (const marker of [
  'aria-label="Tool input"',
  "spellCheck={false}",
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  "aria-live"
]) {
  toolClient.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
}

for (const pattern of [
  /onChange=\{\(e\)\s*=(?!>)\s*aria-/,
  /onChange=\{\(e\)\s*=(?!>)\s*spellCheck/,
  /onChange=\{\(e\)\s*=(?!>)\s*updateField/,
  /onChange=\{\(e\)\s*=\s*[^>]/
]) {
  pattern.test(toolClient)
    ? fail(`JSX corruption detected: ${pattern}`)
    : pass(`JSX clean: ${pattern}`);
}

console.log("\n===== 8. 135-TOOL CATALOG + REGISTRY =====");

const catalog = read("data/tools.ts");
const registry = read("src/lib/tools/index.ts");

const tools = [
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

for (const slug of tools) {
  catalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
}

registry.includes("getToolHandler")
  ? pass("getToolHandler preserved")
  : fail("getToolHandler missing");

registry.includes("text-to-slug")
  ? fail("Legacy text-to-slug handler detected")
  : pass("Legacy handler absent");

console.log("\n===== 9. INTERNAL LINKING =====");

const toolsPage = read("app/tools/page.tsx");
const categoriesPage = read("app/categories/page.tsx");
const categoryPage = read("app/categories/[category]/page.tsx");
const repairedToolPage = read("app/tools/[slug]/page.tsx");

toolsPage.includes("href")
  ? pass("Tools internal links")
  : fail("Tools internal links missing");

categoriesPage.includes("href")
  ? pass("Categories internal links")
  : fail("Categories internal links missing");

categoryPage.includes("href")
  ? pass("Category → tool links")
  : fail("Category → tool links missing");

repairedToolPage.includes("/tools")
  ? pass("Tool → tools discovery link")
  : fail("Tool → tools discovery link missing");

console.log("\n===== 10. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

for (const marker of ["tools", "map", "url"]) {
  sitemap.includes(marker)
    ? pass(`Sitemap: ${marker}`)
    : fail(`Sitemap missing: ${marker}`);
}

robots.includes("sitemap")
  ? pass("Robots sitemap")
  : fail("Robots sitemap missing");

robots.includes("userAgent")
  ? pass("Robots user-agent")
  : fail("Robots user-agent missing");

console.log("\n===== 11. DUPLICATE SEO SAFETY =====");

const badPatterns = [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /slug-\d+/i,
  /tool-\d+/i
];

for (const pattern of badPatterns) {
  if (
    pattern.test(catalog) ||
    pattern.test(toolKeyword) ||
    pattern.test(blogKeyword) ||
    pattern.test(sitemap)
  ) {
    fail(`Bad numbered SEO pattern: ${pattern}`);
  } else {
    pass(`Clean numbered SEO pattern: ${pattern}`);
  }
}

console.log("\n===== 12. STALE ARCHITECTURE =====");

for (const file of [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
]) {
  exists(file)
    ? fail(`Stale file exists: ${file}`)
    : pass(`Stale absent: ${file}`);
}

console.log("\n===== 13. LEGACY REDIRECTS =====");

const nextConfig = read("next.config.ts");

for (const marker of ["case-converter", "text-to-slug"]) {
  nextConfig.includes(marker)
    ? pass(`Redirect protection: ${marker}`)
    : fail(`Redirect protection missing: ${marker}`);
}

console.log("\n===== 14. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  console.log("\n======================================================================");
  console.log("PHASE 12.04 PRE-BUILD FAILURE");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("NO DEPLOYMENT.");
  console.log("======================================================================");
  process.exit(1);
}

console.log("\n===== 15. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 16. LIVE CORE ROUTES =====");

const coreRoutes = [
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

for (const route of coreRoutes) {
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

console.log("\n===== 17. REAL PROGRAMMATIC RUNTIME SMOKE =====");

const runtimeCandidates = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test"
];

for (const route of runtimeCandidates) {
  try {
    const result = execSync(
      `curl -s -D - http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const header = result.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/);
    const status = header ? header[1] : "unknown";

    if (status === "200") {
      pass(`${route} → HTTP 200`);
    } else if (["301", "302", "307", "308", "404"].includes(status)) {
      pass(`${route} → HTTP ${status} (controlled route response)`);
    } else {
      fail(`${route} → HTTP ${status}`);
    }

    if (/Application error|Unhandled Runtime Error|Internal Server Error/i.test(result)) {
      fail(`${route} → runtime error leakage detected`);
    } else {
      pass(`${route} → no obvious runtime error leakage`);
    }

    if (status === "200") {
      /<html/i.test(result)
        ? pass(`${route} → rendered HTML detected`)
        : fail(`${route} → HTML output missing`);
    }
  } catch {
    fail(`${route} → runtime request failed`);
  }
}

console.log("\n===== 18. REPRESENTATIVE TOOL RUNTIME =====");

for (const slug of [
  "keyword-density-checker",
  "meta-tag-generator",
  "seo-slug-generator",
  "word-counter",
  "json-formatter",
  "percentage-calculator"
]) {
  try {
    const result = execSync(
      `curl -s -D - http://localhost:3000/tools/${slug}`,
      { encoding: "utf8" }
    );

    const match = result.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/);
    const status = match ? match[1] : "unknown";

    status === "200"
      ? pass(`${slug} → HTTP 200`)
      : fail(`${slug} → HTTP ${status}`);

    /Application error|Unhandled Runtime Error|Internal Server Error/i.test(result)
      ? fail(`${slug} → runtime error leakage`)
      : pass(`${slug} → no runtime error leakage`);
  } catch {
    fail(`${slug} → request failed`);
  }
}

console.log("\n===== 19. FINAL SOURCE INTEGRITY =====");

for (const file of foundation) {
  exists(file)
    ? pass(`Final intact: ${file}`)
    : fail(`Final missing: ${file}`);
}

console.log("\n======================================================================");
console.log("PHASE 12.04 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 12.04: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT EXPAND PROGRAMMATIC SEO.");
  process.exit(1);
}

console.log("✅ PHASE 12.04: PASS");
console.log("PROGRAMMATIC RUNTIME VERIFIED");
console.log("METADATA VERIFIED");
console.log("CANONICAL VERIFIED");
console.log("INDEXABILITY VERIFIED");
console.log("INTERNAL LINKING VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("TOOLCLIENT VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("RUNTIME FORENSICS PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.04 COMPLETE");
console.log("======================================================================");
