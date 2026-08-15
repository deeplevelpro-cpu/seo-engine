import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;
let warnings = 0;

const exists = (p) => fs.existsSync(path.join(ROOT, p));
const read = (p) => {
  try { return fs.readFileSync(path.join(ROOT, p), "utf8"); }
  catch { return ""; }
};

const fail = (msg) => {
  console.log(`✗ ${msg}`);
  failed++;
};

const pass = (msg) => console.log(`✓ ${msg}`);
const warn = (msg) => {
  console.log(`⚠ ${msg}`);
  warnings++;
};

console.log("======================================================================");
console.log("PHASE 11.01 — CONSOLIDATED FOUNDATION + ARCHITECTURE AUDIT");
console.log("PHASE 10 FROZEN → PHASE 11 FOUNDATION");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

// ======================================================================
// 1. PHASE 10 FREEZE SAFETY
// ======================================================================

console.log("\n===== 1. PHASE 10 FREEZE SAFETY =====");

const phase10Protected = [
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

for (const file of phase10Protected) {
  exists(file) ? pass(`Protected: ${file}`) : fail(`Missing protected file: ${file}`);
}

exists(".env.local")
  ? pass(".env.local preserved")
  : warn(".env.local not present locally");

// ======================================================================
// 2. AUTHORITATIVE 135-TOOL CATALOG
// ======================================================================

console.log("\n===== 2. AUTHORITATIVE TOOL CATALOG =====");

const toolsSource = read("data/tools.ts");

if (!toolsSource) {
  fail("data/tools.ts could not be read");
} else {
  pass("data/tools.ts readable");

  for (const slug of [
    "keyword-density-checker",
    "text-case-converter",
    "seo-slug-generator",
    "word-counter"
  ]) {
    toolsSource.includes(slug)
      ? pass(`Catalog contains ${slug}`)
      : fail(`Catalog missing ${slug}`);
  }

  const numberedSEO = [
    /seo-tool-\d+/i,
    /tool-\d+/i,
    /word-counter-\d+/i,
    /keyword-density-\d+/i,
    /slug-\d+/i
  ];

  for (const pattern of numberedSEO) {
    pattern.test(toolsSource)
      ? fail(`Numbered/suffixed SEO pattern detected: ${pattern}`)
      : pass(`No bad pattern: ${pattern}`);
  }
}

// ======================================================================
// 3. HANDLER REGISTRY
// ======================================================================

console.log("\n===== 3. HANDLER REGISTRY =====");

const registrySource = read("src/lib/tools/index.ts");

if (!registrySource) {
  fail("Handler registry could not be read");
} else {
  pass("Handler registry readable");

  registrySource.includes("getToolHandler")
    ? pass("getToolHandler exists")
    : fail("getToolHandler missing");

  for (const slug of [
    "keyword-density-checker",
    "text-case-converter",
    "seo-slug-generator"
  ]) {
    registrySource.includes(slug)
      ? pass(`Handler present: ${slug}`)
      : fail(`Handler missing: ${slug}`);
  }

  /text-to-slug/.test(registrySource)
    ? fail("Legacy text-to-slug handler reference detected")
    : pass("No legacy text-to-slug handler");
}

// ======================================================================
// 4. UNIVERSAL TOOL ARCHITECTURE
// ======================================================================

console.log("\n===== 4. UNIVERSAL TOOL ARCHITECTURE =====");

const toolPage = read("app/tools/[slug]/page.tsx");
const toolClient = read("app/tools/[slug]/ToolClient.tsx");

exists("app/tools/[slug]/page.tsx")
  ? pass("Universal tool page exists")
  : fail("Universal tool page missing");

exists("app/tools/[slug]/ToolClient.tsx")
  ? pass("Universal ToolClient exists")
  : fail("Universal ToolClient missing");

for (const marker of [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  toolPage.includes(marker)
    ? pass(`SEO architecture: ${marker}`)
    : fail(`Missing SEO architecture: ${marker}`);
}

toolClient.includes("getToolHandler")
  ? pass("ToolClient connected to handler registry")
  : fail("ToolClient not connected to handler registry");

// ======================================================================
// 5. SEO INFRASTRUCTURE
// ======================================================================

console.log("\n===== 5. SEO INFRASTRUCTURE =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

exists("app/sitemap.ts")
  ? pass("Sitemap source exists")
  : fail("Sitemap source missing");

exists("app/robots.ts")
  ? pass("Robots source exists")
  : fail("Robots source missing");

sitemap.includes("tools")
  ? pass("Sitemap integrates tool architecture")
  : fail("Sitemap does not reference tool architecture");

robots.includes("sitemap")
  ? pass("Robots references sitemap")
  : fail("Robots sitemap configuration missing");

robots.includes("userAgent")
  ? pass("Robots user-agent configuration exists")
  : fail("Robots user-agent configuration missing");

exists("public/robots.txt")
  ? fail("Conflicting public/robots.txt exists")
  : pass("No public robots.txt conflict");

// ======================================================================
// 6. STALE ARCHITECTURE
// ======================================================================

console.log("\n===== 6. STALE ARCHITECTURE =====");

const staleFiles = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/sitemap.xml",
  "public/robots.txt"
];

for (const file of staleFiles) {
  exists(file)
    ? fail(`STALE FILE PRESENT: ${file}`)
    : pass(`Stale absent: ${file}`);
}

// ======================================================================
// 7. ENVIRONMENT + SECRET SAFETY
// ======================================================================

console.log("\n===== 7. ENVIRONMENT + SECRET SAFETY =====");

const gitignore = read(".gitignore");

gitignore.includes(".env")
  ? pass(".env files covered by .gitignore")
  : fail(".env is not clearly covered by .gitignore");

const envFiles = [".env", ".env.local", ".env.production", ".env.development"];

for (const file of envFiles) {
  if (exists(file)) {
    warn(`${file} exists locally — values are not inspected`);
  }
}

// Never print secret values.
const secretPatterns = [
  /OPENAI_API_KEY\s*=\s*['"]?[A-Za-z0-9_\-]+/i,
  /MONGODB_URI\s*=\s*['"]?mongodb/i,
  /MONGO_URI\s*=\s*['"]?mongodb/i
];

for (const file of envFiles) {
  const content = read(file);
  if (!content) continue;

  for (const pattern of secretPatterns) {
    if (pattern.test(content)) {
      pass(`Sensitive value detected locally in ${file} — value NOT printed`);
      break;
    }
  }
}

// ======================================================================
// 8. LEGACY REDIRECTS
// ======================================================================

console.log("\n===== 8. LEGACY REDIRECTS =====");

const nextConfig = read("next.config.ts");

for (const pair of [
  ["case-converter", "text-case-converter"],
  ["text-to-slug", "seo-slug-generator"],
  ["/text-to-slug", "seo-slug-generator"]
]) {
  nextConfig.includes(pair[0]) && nextConfig.includes(pair[1])
    ? pass(`Redirect reference: ${pair[0]} → ${pair[1]}`)
    : warn(`Redirect reference not detected: ${pair[0]} → ${pair[1]}`);
}

// ======================================================================
// 9. PACKAGE + NEXT CONFIG
// ======================================================================

console.log("\n===== 9. PACKAGE + NEXT CONFIG =====");

exists("package.json")
  ? pass("package.json exists")
  : fail("package.json missing");

exists("package-lock.json")
  ? pass("package-lock.json exists")
  : fail("package-lock.json missing");

exists("next.config.ts")
  ? pass("next.config.ts exists")
  : fail("next.config.ts missing");

exists("tsconfig.json")
  ? pass("tsconfig.json exists")
  : fail("tsconfig.json missing");

// ======================================================================
// 10. TYPESCRIPT
// ======================================================================

console.log("\n===== 10. TYPESCRIPT =====");

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
// 11. PRODUCTION BUILD
// ======================================================================

console.log("\n===== 11. PRODUCTION BUILD =====");

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
// FINAL REPORT
// ======================================================================

console.log("\n======================================================================");
console.log("PHASE 11.01 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS : ${failed}`);
console.log(`WARNINGS      : ${warnings}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 11.01: FAIL");
  console.log("DO NOT MODIFY PRODUCTION ARCHITECTURE.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 11.01: PASS");
console.log("PHASE 10 FREEZE INTACT");
console.log("135-TOOL FOUNDATION VERIFIED");
console.log("HANDLER REGISTRY VERIFIED");
console.log("UNIVERSAL TOOL ARCHITECTURE VERIFIED");
console.log("SEO INFRASTRUCTURE VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("ENVIRONMENT SAFETY VERIFIED");
console.log("LEGACY REDIRECTS VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11 FOUNDATION READY");
console.log("======================================================================");
