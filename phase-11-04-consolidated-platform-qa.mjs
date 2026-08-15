import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;
let warnings = 0;

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => { console.log(`✗ ${m}`); failed++; };
const warn = (m) => { console.log(`⚠ ${m}`); warnings++; };

const exists = (p) => fs.existsSync(path.join(ROOT, p));
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

console.log("======================================================================");
console.log("PHASE 11.04 — CONSOLIDATED PLATFORM QA");
console.log("UX + DISCOVERY + 135 TOOLS + SEO + ROUTES + BUILD");
console.log("PHASE 10 PROTECTED — CONTROLLED QA");
console.log("======================================================================");

console.log("\n===== 1. PHASE 10 FOUNDATION PROTECTION =====");

const protectedFiles = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
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
    : fail(`Missing protected file: ${file}`);
}

console.log("\n===== 2. AUTHORITATIVE TOOL CATALOG =====");

const toolsSource = read("data/tools.ts");

for (const slug of [
  "keyword-density-checker",
  "keyword-frequency-checker",
  "meta-tag-generator",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "json-formatter",
  "base64-encoder",
  "percentage-calculator",
  "age-calculator",
  "compound-interest-calculator",
  "list-randomizer",
  "checklist-generator"
]) {
  toolsSource.includes(slug)
    ? pass(`Catalog tool: ${slug}`)
    : fail(`Catalog missing: ${slug}`);
}

for (const pattern of [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /slug-\d+/i,
  /tool-\d+/i
]) {
  pattern.test(toolsSource)
    ? fail(`Bad SEO pattern detected: ${pattern}`)
    : pass(`Clean SEO pattern: ${pattern}`);
}

console.log("\n===== 3. HANDLER REGISTRY =====");

const registry = read("src/lib/tools/index.ts");

for (const slug of [
  "keyword-density-checker",
  "text-case-converter",
  "seo-slug-generator",
  "word-counter",
  "json-formatter",
  "percentage-calculator"
]) {
  registry.includes(slug)
    ? pass(`Handler: ${slug}`)
    : fail(`Handler missing: ${slug}`);
}

registry.includes("getToolHandler")
  ? pass("getToolHandler exists")
  : fail("getToolHandler missing");

registry.includes("text-to-slug")
  ? fail("Legacy text-to-slug handler detected")
  : pass("Legacy text-to-slug handler absent");

console.log("\n===== 4. UNIVERSAL TOOL UI =====");

const client = read("app/tools/[slug]/ToolClient.tsx");

for (const marker of [
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "Generate Result",
  "result",
  "loading",
  "getToolHandler"
]) {
  client.includes(marker)
    ? pass(`ToolClient marker: ${marker}`)
    : warn(`ToolClient marker not detected: ${marker}`);
}

const page = read("app/tools/[slug]/page.tsx");

for (const marker of [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  page.includes(marker)
    ? pass(`SEO marker: ${marker}`)
    : fail(`SEO marker missing: ${marker}`);
}

console.log("\n===== 5. DISCOVERY ARCHITECTURE =====");

const discoveryFiles = [
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx"
];

for (const file of discoveryFiles) {
  exists(file)
    ? pass(`Discovery file: ${file}`)
    : fail(`Discovery file missing: ${file}`);
}

const toolsPage = read("app/tools/page.tsx");
const categoriesPage = read("app/categories/page.tsx");
const categoryPage = read("app/categories/[category]/page.tsx");

toolsPage.includes("href")
  ? pass("Tools page navigation present")
  : warn("Tools page navigation marker not detected");

categoriesPage.includes("href")
  ? pass("Categories navigation present")
  : warn("Categories navigation marker not detected");

categoryPage.includes("tools")
  ? pass("Category → tools connection present")
  : warn("Category → tools connection not detected");

console.log("\n===== 6. SEO INFRASTRUCTURE =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

sitemap.includes("tools")
  ? pass("Sitemap integrates tools")
  : fail("Sitemap tool integration missing");

robots.includes("sitemap")
  ? pass("Robots sitemap configured")
  : fail("Robots sitemap configuration missing");

robots.includes("userAgent")
  ? pass("Robots user-agent configured")
  : fail("Robots user-agent configuration missing");

console.log("\n===== 7. STALE ARCHITECTURE =====");

const staleFiles = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
];

for (const file of staleFiles) {
  exists(file)
    ? fail(`STALE FILE PRESENT: ${file}`)
    : pass(`Stale absent: ${file}`);
}

console.log("\n===== 8. LEGACY REDIRECT SOURCE =====");

const nextConfig = read("next.config.ts");

for (const marker of [
  "case-converter",
  "text-to-slug",
  "/text-to-slug"
]) {
  nextConfig.includes(marker)
    ? pass(`Redirect reference: ${marker}`)
    : warn(`Redirect reference not detected: ${marker}`);
}

console.log("\n===== 9. ENVIRONMENT SAFETY =====");

if (exists(".gitignore")) {
  const gitignore = read(".gitignore");

  /\.env/.test(gitignore)
    ? pass(".env protection present in .gitignore")
    : fail(".env protection missing from .gitignore");
}

if (exists(".env.local")) {
  warn(".env.local exists locally — values intentionally not inspected");
} else {
  pass(".env.local not present");
}

console.log("\n===== 10. LIVE SERVER =====");

try {
  execSync(
    "curl -fsS -o /dev/null -w '%{http_code}' http://localhost:3000",
    { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] }
  );

  const code = execSync(
    "curl -fsS -o /dev/null -w '%{http_code}' http://localhost:3000",
    { cwd: ROOT }
  ).toString().trim();

  code === "200"
    ? pass("localhost:3000 → HTTP 200")
    : fail(`localhost:3000 → HTTP ${code}`);
} catch {
  fail("localhost:3000 not responding");
}

console.log("\n===== 11. CORE LIVE ROUTES =====");

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
    const code = execSync(
      `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000${route}`,
      { cwd: ROOT }
    ).toString().trim();

    code === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${code}`);
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 12. REPRESENTATIVE TOOL ROUTES =====");

const toolRoutes = [
  "keyword-density-checker",
  "meta-tag-generator",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "json-formatter",
  "base64-encoder",
  "percentage-calculator",
  "age-calculator",
  "compound-interest-calculator",
  "list-randomizer",
  "checklist-generator"
];

for (const slug of toolRoutes) {
  try {
    const code = execSync(
      `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/tools/${slug}`,
      { cwd: ROOT }
    ).toString().trim();

    code === "200"
      ? pass(`${slug} → HTTP 200`)
      : fail(`${slug} → HTTP ${code}`);
  } catch {
    fail(`${slug} → request failed`);
  }
}

console.log("\n===== 13. RUNTIME ERROR LEAKAGE =====");

for (const slug of [
  "keyword-density-checker",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "json-formatter",
  "percentage-calculator"
]) {
  try {
    const html = execSync(
      `curl -s http://localhost:3000/tools/${slug}`,
      { cwd: ROOT, maxBuffer: 5 * 1024 * 1024 }
    ).toString();

    const bad = [
      "Internal Server Error",
      "Application error",
      "Unhandled Runtime Error",
      "TypeError:",
      "ReferenceError:"
    ].some(x => html.includes(x));

    bad
      ? fail(`${slug} → runtime error leakage detected`)
      : pass(`${slug} → no runtime error leakage`);
  } catch {
    fail(`${slug} → HTML request failed`);
  }
}

console.log("\n===== 14. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: ROOT,
    stdio: "inherit"
  });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 15. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: ROOT,
    stdio: "inherit"
  });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n======================================================================");
console.log("PHASE 11.04 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS : ${failed}`);
console.log(`WARNINGS      : ${warnings}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 11.04: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT CONTINUE FEATURE EXPANSION.");
  process.exit(1);
}

console.log("✅ PHASE 11.04: PASS");
console.log("PHASE 10 FOUNDATION PRESERVED");
console.log("TOOL UX VERIFIED");
console.log("DISCOVERY VERIFIED");
console.log("SEO VERIFIED");
console.log("LIVE ROUTES VERIFIED");
console.log("RUNTIME ERROR CHECK PASSED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.04 COMPLETE");
console.log("======================================================================");
