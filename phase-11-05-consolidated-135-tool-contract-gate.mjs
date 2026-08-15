import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;
let warnings = 0;

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => { console.log(`✗ ${m}`); failed++; };
const warn = (m) => { console.log(`⚠ ${m}`); warnings++; };

const file = (p) => path.join(ROOT, p);
const exists = (p) => fs.existsSync(file(p));
const read = (p) => fs.readFileSync(file(p), "utf8");

console.log("======================================================================");
console.log("PHASE 11.05 — CONSOLIDATED 135-TOOL CONTRACT GATE");
console.log("CATALOG + REGISTRY + CONTRACTS + LIVE ROUTES + SEO + BUILD");
console.log("READ-ONLY QA — PRODUCTION SOURCE PROTECTED");
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

for (const p of protectedFiles) {
  exists(p)
    ? pass(`Protected: ${p}`)
    : fail(`Missing: ${p}`);
}

console.log("\n===== 2. CATALOG RUNTIME COUNT =====");

let catalogCount = 0;

try {
  const probe = `
    import("./data/tools.ts").then(m => {
      const candidates = [
        m.tools,
        m.TOOLS,
        m.toolCatalog,
        m.catalog,
        m.default
      ];

      let value = candidates.find(x => Array.isArray(x));
      if (!value && candidates.some(x => x && typeof x === "object")) {
        value = candidates.find(x => x && typeof x === "object");
      }

      let count = Array.isArray(value)
        ? value.length
        : value && typeof value === "object"
          ? Object.keys(value).length
          : 0;

      console.log("CATALOG_COUNT=" + count);
    }).catch(e => {
      console.error(e.message);
      process.exit(1);
    });
  `;

  fs.writeFileSync(file(".phase-11-05-catalog-probe.mjs"), probe);

  const output = execSync(
    "node .phase-11-05-catalog-probe.mjs",
    { cwd: ROOT }
  ).toString();

  const match = output.match(/CATALOG_COUNT=(\d+)/);
  catalogCount = match ? Number(match[1]) : 0;

  catalogCount === 135
    ? pass("AUTHORITATIVE CATALOG = EXACTLY 135")
    : fail(`AUTHORITATIVE CATALOG = ${catalogCount}, expected 135`);

  fs.rmSync(file(".phase-11-05-catalog-probe.mjs"), { force: true });
  pass("Temporary catalog probe removed");
} catch {
  fs.rmSync(file(".phase-11-05-catalog-probe.mjs"), { force: true });
  fail("Could not resolve authoritative catalog at runtime");
}

console.log("\n===== 3. CATALOG KEY INTEGRITY =====");

const catalogSource = read("data/tools.ts");

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
  "compound-interest-calculator"
]) {
  catalogSource.includes(slug)
    ? pass(`Catalog contains: ${slug}`)
    : fail(`Catalog missing: ${slug}`);
}

for (const pattern of [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /slug-\d+/i
]) {
  pattern.test(catalogSource)
    ? fail(`Bad numbered SEO pattern detected: ${pattern}`)
    : pass(`No numbered SEO pattern: ${pattern}`);
}

console.log("\n===== 4. HANDLER REGISTRY COUNT + COVERAGE =====");

const registrySource = read("src/lib/tools/index.ts");

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
  "compound-interest-calculator"
]) {
  registrySource.includes(slug)
    ? pass(`Handler present: ${slug}`)
    : fail(`Handler missing: ${slug}`);
}

registrySource.includes("getToolHandler")
  ? pass("getToolHandler exists")
  : fail("getToolHandler missing");

const handlerKeyMatches = registrySource.match(
  /["'`]([a-z0-9]+(?:-[a-z0-9]+)+)["'`]\s*:/g
) || [];

const uniqueHandlerKeys = new Set(
  handlerKeyMatches.map(x => x.replace(/^["'`]|["'`]\s*:$/g, ""))
);

if (uniqueHandlerKeys.size >= 135) {
  pass(`Handler registry contains ${uniqueHandlerKeys.size}+ keyed handlers`);
} else {
  fail(`Handler registry detected only ${uniqueHandlerKeys.size} keyed handlers`);
}

registrySource.includes("text-to-slug")
  ? fail("Legacy text-to-slug handler detected")
  : pass("Legacy text-to-slug handler absent");

console.log("\n===== 5. UNIVERSAL TOOL CONTRACT =====");

const client = read("app/tools/[slug]/ToolClient.tsx");
const page = read("app/tools/[slug]/page.tsx");

for (const marker of [
  "inputSchema",
  "fields",
  "setText",
  "setResult",
  "setLoading",
  "Generate Result",
  "result",
  "loading",
  "getToolHandler"
]) {
  client.includes(marker)
    ? pass(`ToolClient contract: ${marker}`)
    : fail(`ToolClient contract missing: ${marker}`);
}

for (const marker of [
  "generateMetadata",
  "seoTitle",
  "seoDesc",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  page.includes(marker)
    ? pass(`Tool SEO contract: ${marker}`)
    : fail(`Tool SEO contract missing: ${marker}`);
}

console.log("\n===== 6. DISCOVERY CONTRACT =====");

const toolsPage = read("app/tools/page.tsx");
const categoriesPage = read("app/categories/page.tsx");
const categoryPage = read("app/categories/[category]/page.tsx");

toolsPage.includes("href")
  ? pass("Tools discovery navigation present")
  : fail("Tools discovery navigation missing");

categoriesPage.includes("href")
  ? pass("Categories navigation present")
  : fail("Categories navigation missing");

categoryPage.includes("tools")
  ? pass("Category → tools connection present")
  : fail("Category → tools connection missing");

console.log("\n===== 7. SITEMAP + ROBOTS CONTRACT =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

sitemap.includes("tools")
  ? pass("Sitemap integrates tool catalog")
  : fail("Sitemap tool integration missing");

robots.includes("userAgent")
  ? pass("Robots user-agent configured")
  : fail("Robots user-agent missing");

robots.includes("sitemap")
  ? pass("Robots sitemap configured")
  : fail("Robots sitemap missing");

console.log("\n===== 8. STALE ARCHITECTURE =====");

const stale = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
];

for (const p of stale) {
  exists(p)
    ? fail(`STALE FILE PRESENT: ${p}`)
    : pass(`Stale absent: ${p}`);
}

console.log("\n===== 9. LIVE SERVER + CORE ROUTES =====");

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

console.log("\n===== 10. REPRESENTATIVE TOOL ROUTES =====");

const representativeTools = [
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

for (const slug of representativeTools) {
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

console.log("\n===== 11. RUNTIME ERROR FORENSICS =====");

for (const slug of representativeTools.slice(0, 8)) {
  try {
    const html = execSync(
      `curl -s http://localhost:3000/tools/${slug}`,
      { cwd: ROOT, maxBuffer: 5 * 1024 * 1024 }
    ).toString();

    const badPatterns = [
      "Internal Server Error",
      "Application error",
      "Unhandled Runtime Error",
      "TypeError:",
      "ReferenceError:"
    ];

    const found = badPatterns.find(x => html.includes(x));

    found
      ? fail(`${slug} → leaked ${found}`)
      : pass(`${slug} → no runtime error leakage`);
  } catch {
    fail(`${slug} → HTML request failed`);
  }
}

console.log("\n===== 12. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: ROOT,
    stdio: "inherit"
  });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 13. PRODUCTION BUILD =====");

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
console.log("PHASE 11.05 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS : ${failed}`);
console.log(`WARNINGS      : ${warnings}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 11.05: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT MODIFY PRODUCTION ARCHITECTURE.");
  process.exit(1);
}

console.log("✅ PHASE 11.05: PASS");
console.log("135-TOOL CATALOG VERIFIED");
console.log("HANDLER REGISTRY VERIFIED");
console.log("TOOL CONTRACT VERIFIED");
console.log("DISCOVERY VERIFIED");
console.log("SEO VERIFIED");
console.log("LIVE ROUTES VERIFIED");
console.log("RUNTIME FORENSICS PASSED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.05 COMPLETE");
console.log("======================================================================");
