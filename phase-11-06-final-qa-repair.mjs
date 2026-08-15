import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const P = (x) => path.join(ROOT, x);

let failed = 0;
let warnings = 0;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};
const warn = (x) => {
  console.log(`⚠ ${x}`);
  warnings++;
};

const exists = (x) => fs.existsSync(P(x));
const read = (x) => fs.readFileSync(P(x), "utf8");

console.log("======================================================================");
console.log("PHASE 11.06 — FINAL QA REPAIR + CONSOLIDATED REGRESSION");
console.log("FIX FALSE JSX CORRUPTION DETECTOR");
console.log("NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

console.log("\n===== 1. PRODUCTION FOUNDATION =====");

[
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
].forEach((f) => {
  exists(f)
    ? pass(`Protected: ${f}`)
    : fail(`Missing: ${f}`);
});

console.log("\n===== 2. TOOLCLIENT JSX FORENSICS =====");

const client = read("app/tools/[slug]/ToolClient.tsx");

client.includes("onChange={(e) =>")
  ? pass("Valid onChange arrow handler detected")
  : fail("Valid onChange arrow handler missing");

/*
 * IMPORTANT:
 * Do NOT search for:
 *   onChange={(e) =
 *
 * because that substring also exists inside the valid:
 *   onChange={(e) =>
 *
 * Exact corruption requires the arrow to be absent.
 */
const corruptedPatterns = [
  /onChange=\{\(e\)\s*=\s*[^>]/,
  /onChange=\{\(e\)\s*=\s*aria-/,
  /onChange=\{\(e\)\s*=\s*spellCheck/,
  /onChange=\{\(e\)\s*=\s*updateField/
];

for (const pattern of corruptedPatterns) {
  pattern.test(client)
    ? fail(`Corrupted JSX pattern detected: ${pattern}`)
    : pass(`Corrupted JSX absent: ${pattern}`);
}

console.log("\n===== 3. TOOL UX CONTRACT =====");

[
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler"
].forEach((marker) => {
  client.includes(marker)
    ? pass(`ToolClient marker: ${marker}`)
    : fail(`ToolClient marker missing: ${marker}`);
});

client.includes("aria-live")
  ? pass("Live result accessibility present")
  : warn("aria-live marker not detected");

client.includes("aria-label")
  ? pass("Accessible input label present")
  : warn("aria-label marker not detected");

console.log("\n===== 4. PHASE 10 FOUNDATION INTEGRITY =====");

const page = read("app/tools/[slug]/page.tsx");
const toolsPage = read("app/tools/page.tsx");
const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

[
  ["tool page", page],
  ["tools discovery", toolsPage],
  ["sitemap", sitemap],
  ["robots", robots]
].forEach(([name, content]) => {
  content.length > 100
    ? pass(`${name} source readable`)
    : fail(`${name} source unexpectedly small`);
});

console.log("\n===== 5. SEO CONTRACT =====");

[
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
].forEach((marker) => {
  page.includes(marker)
    ? pass(`SEO marker: ${marker}`)
    : fail(`SEO marker missing: ${marker}`);
});

console.log("\n===== 6. DISCOVERY =====");

toolsPage.includes("href")
  ? pass("Tools navigation present")
  : fail("Tools navigation missing");

toolsPage.includes("tool")
  ? pass("Tool discovery content present")
  : fail("Tool discovery content missing");

exists("app/categories/page.tsx")
  ? pass("Categories discovery page exists")
  : fail("Categories discovery page missing");

exists("app/categories/[category]/page.tsx")
  ? pass("Category page exists")
  : fail("Category page missing");

console.log("\n===== 7. 135-TOOL ARCHITECTURE =====");

const catalog = read("data/tools.ts");
const registry = read("src/lib/tools/index.ts");

[
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
].forEach((slug) => {
  catalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
});

registry.includes("getToolHandler")
  ? pass("getToolHandler present")
  : fail("getToolHandler missing");

registry.includes("text-to-slug")
  ? fail("Legacy text-to-slug handler detected")
  : pass("Legacy text-to-slug handler absent");

console.log("\n===== 8. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
].forEach((f) => {
  exists(f)
    ? fail(`STALE FILE PRESENT: ${f}`)
    : pass(`Stale absent: ${f}`);
});

console.log("\n===== 9. SITEMAP + ROBOTS =====");

sitemap.includes("tools")
  ? pass("Sitemap integrates tools")
  : fail("Sitemap tool integration missing");

robots.includes("userAgent")
  ? pass("Robots user-agent configured")
  : fail("Robots user-agent missing");

robots.includes("sitemap")
  ? pass("Robots sitemap configured")
  : fail("Robots sitemap missing");

console.log("\n===== 10. LIVE CORE ROUTES =====");

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
    const code = execSync(
      `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000${route}`
    ).toString().trim();

    code === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${code}`);
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 11. REPRESENTATIVE TOOL ROUTES =====");

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
      `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/tools/${slug}`
    ).toString().trim();

    code === "200"
      ? pass(`${slug} → HTTP 200`)
      : fail(`${slug} → HTTP ${code}`);
  } catch {
    fail(`${slug} → request failed`);
  }
}

console.log("\n===== 12. RUNTIME ERROR FORENSICS =====");

for (const slug of toolRoutes.slice(0, 8)) {
  try {
    const html = execSync(
      `curl -s http://localhost:3000/tools/${slug}`,
      { maxBuffer: 5 * 1024 * 1024 }
    ).toString();

    const badMarkers = [
      "Internal Server Error",
      "Application error",
      "Unhandled Runtime Error",
      "ReferenceError:",
      "SyntaxError:"
    ];

    const leaked = badMarkers.find((x) => html.includes(x));

    leaked
      ? fail(`${slug} → ${leaked}`)
      : pass(`${slug} → no runtime error leakage`);
  } catch {
    fail(`${slug} → HTML request failed`);
  }
}

console.log("\n===== 13. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  console.log("\n======================================================================");
  console.log("PHASE 11.06 PRE-BUILD REPORT");
  console.log("======================================================================");
  console.log(`FAILED CHECKS : ${failed}`);
  console.log(`WARNINGS      : ${warnings}`);
  console.log("======================================================================");
  console.log("❌ PHASE 11.06: FAIL");
  console.log("NO PRODUCTION SOURCE WAS MODIFIED.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("\n===== 14. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n======================================================================");
console.log("PHASE 11.06 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS : ${failed}`);
console.log(`WARNINGS      : ${warnings}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 11.06: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT CONTINUE FEATURE EXPANSION.");
  process.exit(1);
}

console.log("✅ PHASE 11.06: PASS");
console.log("FALSE JSX DETECTOR REPAIRED");
console.log("TOOLCLIENT JSX VERIFIED");
console.log("TOOL UX CONTRACT VERIFIED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("DISCOVERY VERIFIED");
console.log("SEO VERIFIED");
console.log("LIVE ROUTES VERIFIED");
console.log("RUNTIME FORENSICS PASSED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.06 CLOSED");
console.log("======================================================================");
