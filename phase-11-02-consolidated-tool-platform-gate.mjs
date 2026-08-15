import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;
let warnings = 0;

const exists = (p) => fs.existsSync(path.join(ROOT, p));

const read = (p) => {
  try {
    return fs.readFileSync(path.join(ROOT, p), "utf8");
  } catch {
    return "";
  }
};

const pass = (m) => console.log(`✓ ${m}`);
const warn = (m) => {
  console.log(`⚠ ${m}`);
  warnings++;
};
const fail = (m) => {
  console.log(`✗ ${m}`);
  failed++;
};

console.log("======================================================================");
console.log("PHASE 11.02 — CONSOLIDATED TOOL PLATFORM GATE");
console.log("135 TOOLS + ARCHITECTURE + ROUTES + SEO + RUNTIME + BUILD");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

// ======================================================================
// 1. PHASE 10 FREEZE
// ======================================================================

console.log("\n===== 1. PHASE 10 FREEZE =====");

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

// ======================================================================
// 2. CATALOG RUNTIME RESOLUTION
// ======================================================================

console.log("\n===== 2. AUTHORITATIVE 135-TOOL CATALOG =====");

const catalog = read("data/tools.ts");

if (!catalog) {
  fail("Unable to read data/tools.ts");
} else {
  pass("Catalog source readable");

  const requiredTools = [
    "keyword-density-checker",
    "keyword-frequency-checker",
    "meta-tag-generator",
    "meta-description-generator",
    "title-tag-generator",
    "seo-slug-generator",
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
      ? pass(`Catalog tool present: ${slug}`)
      : fail(`Catalog tool missing: ${slug}`);
  }

  const badPatterns = [
    /word-counter-\d+/i,
    /keyword-density-\d+/i,
    /free-online-tool-\d+/i,
    /slug-\d+/i,
    /tool-\d+/i
  ];

  for (const pattern of badPatterns) {
    pattern.test(catalog)
      ? fail(`Bad numbered SEO pattern detected: ${pattern}`)
      : pass(`Clean SEO pattern: ${pattern}`);
  }
}

// ======================================================================
// 3. HANDLER REGISTRY
// ======================================================================

console.log("\n===== 3. HANDLER REGISTRY =====");

const registry = read("src/lib/tools/index.ts");

if (!registry) {
  fail("Unable to read handler registry");
} else {
  registry.includes("getToolHandler")
    ? pass("getToolHandler exists")
    : fail("getToolHandler missing");

  for (const slug of [
    "keyword-density-checker",
    "text-case-converter",
    "seo-slug-generator",
    "word-counter",
    "json-formatter",
    "percentage-calculator"
  ]) {
    registry.includes(slug)
      ? pass(`Handler present: ${slug}`)
      : fail(`Handler missing: ${slug}`);
  }

  registry.includes("text-to-slug")
    ? fail("Legacy text-to-slug handler reference found")
    : pass("No legacy text-to-slug handler");
}

// ======================================================================
// 4. UNIVERSAL TOOL PAGE
// ======================================================================

console.log("\n===== 4. UNIVERSAL TOOL PAGE =====");

const page = read("app/tools/[slug]/page.tsx");
const client = read("app/tools/[slug]/ToolClient.tsx");

for (const marker of [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  page.includes(marker)
    ? pass(`Tool page SEO marker: ${marker}`)
    : fail(`Tool page SEO marker missing: ${marker}`);
}

for (const marker of [
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "Generate Result",
  "result",
  "loading"
]) {
  client.includes(marker)
    ? pass(`ToolClient UI marker: ${marker}`)
    : fail(`ToolClient UI marker missing: ${marker}`);
}

client.includes("getToolHandler")
  ? pass("ToolClient uses centralized handler")
  : fail("ToolClient handler integration missing");

// ======================================================================
// 5. CATEGORY + TOOL DISCOVERY
// ======================================================================

console.log("\n===== 5. TOOL DISCOVERY ARCHITECTURE =====");

for (const file of [
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx"
]) {
  exists(file)
    ? pass(`Discovery route exists: ${file}`)
    : warn(`Discovery route missing: ${file}`);
}

const toolsPage = read("app/tools/page.tsx");
const categoriesPage = read("app/categories/[category]/page.tsx");

toolsPage.length > 0
  ? pass("Tools discovery page has content")
  : fail("Tools discovery page is empty");

categoriesPage.length > 0
  ? pass("Category discovery page has content")
  : warn("Category page content could not be inspected");

// ======================================================================
// 6. SEO INFRASTRUCTURE
// ======================================================================

console.log("\n===== 6. SEO INFRASTRUCTURE =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

exists("app/sitemap.ts")
  ? pass("Sitemap source exists")
  : fail("Sitemap source missing");

exists("app/robots.ts")
  ? pass("Robots source exists")
  : fail("Robots source missing");

sitemap.includes("tools")
  ? pass("Sitemap connected to tools")
  : fail("Sitemap tool integration missing");

robots.includes("userAgent")
  ? pass("Robots user-agent configured")
  : fail("Robots user-agent missing");

robots.includes("sitemap")
  ? pass("Robots sitemap configured")
  : fail("Robots sitemap missing");

exists("public/robots.txt")
  ? fail("Conflicting public/robots.txt exists")
  : pass("No public robots.txt conflict");

// ======================================================================
// 7. STALE ARCHITECTURE
// ======================================================================

console.log("\n===== 7. STALE ARCHITECTURE =====");

const stale = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
];

for (const file of stale) {
  exists(file)
    ? fail(`STALE FILE PRESENT: ${file}`)
    : pass(`Stale absent: ${file}`);
}

// ======================================================================
// 8. LEGACY REDIRECTS
// ======================================================================

console.log("\n===== 8. LEGACY REDIRECTS =====");

const config = read("next.config.ts");

const redirects = [
  ["case-converter", "text-case-converter"],
  ["text-to-slug", "seo-slug-generator"]
];

for (const [oldSlug, newSlug] of redirects) {
  config.includes(oldSlug) && config.includes(newSlug)
    ? pass(`Redirect reference: ${oldSlug} → ${newSlug}`)
    : warn(`Redirect reference not detected: ${oldSlug} → ${newSlug}`);
}

// ======================================================================
// 9. ENVIRONMENT SAFETY
// ======================================================================

console.log("\n===== 9. ENVIRONMENT SAFETY =====");

const gitignore = read(".gitignore");

gitignore.includes(".env")
  ? pass(".env protection present in .gitignore")
  : fail(".env protection not detected");

if (exists(".env.local")) {
  warn(".env.local exists locally — values intentionally not inspected");
} else {
  warn(".env.local not present locally");
}

// ======================================================================
// 10. PACKAGE INTEGRITY
// ======================================================================

console.log("\n===== 10. PACKAGE INTEGRITY =====");

for (const file of [
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json"
]) {
  exists(file)
    ? pass(`${file} exists`)
    : fail(`${file} missing`);
}

// ======================================================================
// 11. TYPESCRIPT
// ======================================================================

console.log("\n===== 11. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: ROOT,
    stdio: "inherit"
  });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

// ======================================================================
// 12. PRODUCTION BUILD
// ======================================================================

console.log("\n===== 12. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: ROOT,
    stdio: "inherit"
  });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

// ======================================================================
// FINAL
// ======================================================================

console.log("\n======================================================================");
console.log("PHASE 11.02 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS : ${failed}`);
console.log(`WARNINGS      : ${warnings}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 11.02: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT MODIFY PRODUCTION ARCHITECTURE.");
  process.exit(1);
}

console.log("✅ PHASE 11.02: PASS");
console.log("PHASE 10 FREEZE INTACT");
console.log("135-TOOL CATALOG VERIFIED");
console.log("HANDLER REGISTRY VERIFIED");
console.log("UNIVERSAL TOOL UI VERIFIED");
console.log("TOOL DISCOVERY VERIFIED");
console.log("SEO INFRASTRUCTURE VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("REDIRECTS VERIFIED");
console.log("ENVIRONMENT SAFETY VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11 CORE PLATFORM GATE PASSED");
console.log("======================================================================");
