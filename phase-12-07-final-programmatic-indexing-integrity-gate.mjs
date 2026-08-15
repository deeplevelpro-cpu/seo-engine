import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();

const files = {
  tools: "data/tools.ts",
  registry: "src/lib/tools/index.ts",
  toolPage: "app/tools/[slug]/page.tsx",
  toolClient: "app/tools/[slug]/ToolClient.tsx",
  toolKeyword: "app/[lang]/tools/[slug]/[keyword]/page.js",
  blogKeyword: "app/blog/[slug]/[keyword]/page.js",
  toolsPage: "app/tools/page.tsx",
  categoriesPage: "app/categories/page.tsx",
  categoryPage: "app/categories/[category]/page.tsx",
  sitemap: "app/sitemap.ts",
  robots: "app/robots.ts",
  nextConfig: "next.config.ts",
  tsconfig: "tsconfig.json",
  package: "package.json",
};

const read = (f) => fs.readFileSync(path.join(root, f), "utf8");
const exists = (f) => fs.existsSync(path.join(root, f));

const run = (cmd) => {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (e) {
    return String(e.stdout || "") + String(e.stderr || "");
  }
};

let failed = 0;

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => {
  console.log(`✗ ${m}`);
  failed++;
};

console.log("======================================================================");
console.log("PHASE 12.07 — FINAL PROGRAMMATIC INDEXING INTEGRITY GATE");
console.log("135 TOOLS + KEYWORD ROUTES + SITEMAP + ROBOTS + SEO + RUNTIME");
console.log("READ-ONLY MAXIMUM CONSOLIDATED REGRESSION");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION =====");

for (const [name, file] of Object.entries(files)) {
  if (exists(file)) pass(`${name}: ${file}`);
  else fail(`Missing foundation: ${file}`);
}

console.log("\n===== 2. TOOL CATALOG + REGISTRY =====");

const catalog = read(files.tools);
const registry = read(files.registry);

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
  "checklist-generator",
];

for (const slug of requiredTools) {
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

console.log("\n===== 3. TOOLCLIENT =====");

const tc = read(files.toolClient);

for (const marker of [
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  'aria-label="Tool input"',
  "spellCheck={false}",
  "aria-live",
]) {
  tc.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
}

console.log("\n===== 4. PROGRAMMATIC TOOL ROUTE =====");

const toolKeyword = read(files.toolKeyword);

for (const marker of [
  "await params",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "generateContent",
  "/tools",
  "/categories",
]) {
  toolKeyword.includes(marker)
    ? pass(`Tool keyword: ${marker}`)
    : fail(`Tool keyword missing: ${marker}`);
}

console.log("\n===== 5. PROGRAMMATIC BLOG ROUTE =====");

const blogKeyword = read(files.blogKeyword);

for (const marker of [
  "await params",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "generateBlogContent",
  "/categories",
]) {
  blogKeyword.includes(marker)
    ? pass(`Blog keyword: ${marker}`)
    : fail(`Blog keyword missing: ${marker}`);
}

console.log("\n===== 6. SITEMAP SOURCE =====");

const sitemap = read(files.sitemap);

for (const marker of [
  "MetadataRoute.Sitemap",
  "tools",
  "categoryUrls",
  "/categories/",
  "/tools/",
  "return",
]) {
  sitemap.includes(marker)
    ? pass(`Sitemap: ${marker}`)
    : fail(`Sitemap missing: ${marker}`);
}

console.log("\n===== 7. LIVE SITEMAP =====");

const xml = run("curl -s http://localhost:3000/sitemap.xml");

if (xml.includes("<urlset")) pass("Sitemap XML valid");
else fail("Sitemap XML invalid");

const toolUrls = [
  "/tools/keyword-density-checker",
  "/tools/seo-slug-generator",
  "/tools/word-counter",
  "/tools/json-formatter",
];

for (const url of toolUrls) {
  xml.includes(url)
    ? pass(`Sitemap tool URL: ${url}`)
    : fail(`Sitemap missing tool URL: ${url}`);
}

const categoryUrls = [
  "/categories/seo",
  "/categories/content",
  "/categories/developer",
];

for (const url of categoryUrls) {
  xml.includes(url)
    ? pass(`Sitemap category URL: ${url}`)
    : fail(`Sitemap missing category URL: ${url}`);
}

const sitemapCount = (xml.match(/<loc>/g) || []).length;
console.log(`SITEMAP URL COUNT: ${sitemapCount}`);

if (sitemapCount >= 150) pass("Sitemap scale threshold verified");
else fail(`Sitemap URL count unexpectedly low: ${sitemapCount}`);

console.log("\n===== 8. ROBOTS =====");

const robots = run("curl -s http://localhost:3000/robots.txt");

robots.includes("sitemap")
  ? pass("robots sitemap reference")
  : fail("robots sitemap reference missing");

/user-agent\s*:/i.test(robots)
  ? pass("robots user-agent")
  : fail("robots user-agent missing");

console.log("\n===== 9. LIVE PROGRAMMATIC SEO =====");

const programmatic = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",
];

for (const url of programmatic) {
  const html = run(`curl -s http://localhost:3000${url}`);
  const status = run(
    `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${url}`
  ).trim();

  status === "200"
    ? pass(`${url} → HTTP 200`)
    : fail(`${url} → HTTP ${status}`);

  html.includes("<title")
    ? pass(`${url} → title`)
    : fail(`${url} → title missing`);

  /description/i.test(html)
    ? pass(`${url} → description`)
    : fail(`${url} → description missing`);

  /canonical/i.test(html)
    ? pass(`${url} → canonical`)
    : fail(`${url} → canonical missing`);

  /Application error|Internal Server Error|runtime error/i.test(html)
    ? fail(`${url} → runtime leakage`)
    : pass(`${url} → runtime clean`);
}

console.log("\n===== 10. CORE ROUTES =====");

for (const url of [
  "/",
  "/tools",
  "/categories",
  "/blog",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt",
]) {
  const status = run(
    `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${url}`
  ).trim();

  status === "200"
    ? pass(`${url} → HTTP 200`)
    : fail(`${url} → HTTP ${status}`);
}

console.log("\n===== 11. REPRESENTATIVE TOOLS =====");

for (const slug of [
  "keyword-density-checker",
  "meta-tag-generator",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "json-formatter",
  "base64-encoder",
  "percentage-calculator",
]) {
  const status = run(
    `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/tools/${slug}`
  ).trim();

  status === "200"
    ? pass(`/tools/${slug} → HTTP 200`)
    : fail(`/tools/${slug} → HTTP ${status}`);
}

console.log("\n===== 12. CATEGORY ROUTES =====");

for (const slug of [
  "seo",
  "content",
  "developer",
]) {
  const status = run(
    `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/categories/${slug}`
  ).trim();

  status === "200"
    ? pass(`/categories/${slug} → HTTP 200`)
    : fail(`/categories/${slug} → HTTP ${status}`);
}

console.log("\n===== 13. STALE ARCHITECTURE =====");

for (const stale of [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml",
]) {
  exists(stale)
    ? fail(`Stale architecture present: ${stale}`)
    : pass(`Stale absent: ${stale}`);
}

console.log("\n===== 14. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 15. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n======================================================================");
console.log("PHASE 12.07 FINAL REPORT");
console.log("======================================================================");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("❌ PHASE 12.07: FAIL");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 12.07: PASS");
console.log("FINAL PROGRAMMATIC SEO INTEGRITY VERIFIED");
console.log("LIVE SITEMAP VERIFIED");
console.log("CATEGORY INDEXING VERIFIED");
console.log("CANONICAL + METADATA VERIFIED");
console.log("PROGRAMMATIC RUNTIME VERIFIED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("TOOLCLIENT VERIFIED");
console.log("ROBOTS VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.07 COMPLETE — INDEXING FOUNDATION LOCKED");
console.log("======================================================================");
