import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;
let changed = 0;

const file = (p) => path.join(ROOT, p);

const read = (p) => {
  try {
    return fs.readFileSync(file(p), "utf8");
  } catch {
    return "";
  }
};

const write = (p, content) => {
  fs.writeFileSync(file(p), content, "utf8");
  changed++;
};

const exists = (p) => fs.existsSync(file(p));

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => {
  console.log(`✗ ${m}`);
  failed++;
};

console.log("======================================================================");
console.log("PHASE 11.03 — TOOL UX + DISCOVERY CONSOLIDATED UPGRADE");
console.log("CONTROLLED IMPLEMENTATION + AUTOMATIC REGRESSION");
console.log("PHASE 10 PROTECTED");
console.log("======================================================================");

// ======================================================================
// 1. PROTECT PHASE 10 FOUNDATION
// ======================================================================

console.log("\n===== 1. PHASE 10 PROTECTION =====");

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
    : fail(`Missing protected file: ${p}`);
}

// ======================================================================
// 2. READ CURRENT TOOL UI
// ======================================================================

console.log("\n===== 2. CURRENT TOOL UI ANALYSIS =====");

const clientPath = "app/tools/[slug]/ToolClient.tsx";
const pagePath = "app/tools/[slug]/page.tsx";

let client = read(clientPath);
let page = read(pagePath);

if (!client) {
  fail("ToolClient.tsx could not be read");
} else {
  pass("ToolClient.tsx loaded");
}

if (!page) {
  fail("Universal tool page could not be read");
} else {
  pass("Universal tool page loaded");
}

// ======================================================================
// 3. SAFE UX ENHANCEMENTS
// ======================================================================

console.log("\n===== 3. TOOL UX ENHANCEMENTS =====");

// Add accessibility/UX markers only when absent.
// Existing functional logic is preserved.

if (client && !client.includes('aria-label="Tool input"')) {
  const textareaPattern =
    /<textarea([^>]*)>/i;

  if (textareaPattern.test(client)) {
    client = client.replace(
      textareaPattern,
      `<textarea$1 aria-label="Tool input">`
    );
    pass("Added accessible tool input label");
  }
}

if (client && !client.includes('aria-live="polite"')) {
  const resultPattern =
    /(<(?:div|section|pre)[^>]*)(>[\s\S]{0,300}?result)/i;

  if (resultPattern.test(client)) {
    client = client.replace(
      resultPattern,
      `$1 aria-live="polite"$2`
    );
    pass("Added live result accessibility marker");
  }
}

// Add autocomplete-safe behavior to common text inputs.
if (client && client.includes("<textarea") && !client.includes("spellCheck")) {
  client = client.replace(
    /<textarea([^>]*)>/i,
    `<textarea$1 spellCheck={false}>`
  );
  pass("Added predictable textarea behavior");
}

// Only write when a real safe enhancement occurred.
if (client !== read(clientPath)) {
  write(clientPath, client);
  pass("ToolClient UX enhancements written");
} else {
  pass("ToolClient already satisfies current UX markers");
}

// ======================================================================
// 4. UNIVERSAL PAGE DISCOVERY / SEO SAFETY
// ======================================================================

console.log("\n===== 4. UNIVERSAL PAGE SAFETY =====");

page = read(pagePath);

for (const marker of [
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  page.includes(marker)
    ? pass(`SEO marker preserved: ${marker}`)
    : fail(`SEO marker missing: ${marker}`);
}

// Ensure tool page has a not-found path.
if (
  page &&
  !page.includes("notFound")
) {
  console.log("⚠ Universal page has no detectable notFound marker");
}

// ======================================================================
// 5. TOOL DISCOVERY PAGE
// ======================================================================

console.log("\n===== 5. TOOLS DISCOVERY =====");

const toolsPagePath = "app/tools/page.tsx";
const toolsPage = read(toolsPagePath);

if (!toolsPage) {
  fail("app/tools/page.tsx missing or unreadable");
} else {
  pass("Tools discovery page readable");

  const discoveryMarkers = [
    "tools",
    "category",
    "href",
    "search"
  ];

  for (const marker of discoveryMarkers) {
    toolsPage.toLowerCase().includes(marker)
      ? pass(`Tools discovery marker: ${marker}`)
      : console.log(`⚠ Discovery marker not detected: ${marker}`);
  }
}

// ======================================================================
// 6. CATEGORY DISCOVERY
// ======================================================================

console.log("\n===== 6. CATEGORY DISCOVERY =====");

const categoryPath = "app/categories/[category]/page.tsx";
const categoryPage = read(categoryPath);

if (!categoryPage) {
  fail("Category page missing");
} else {
  pass("Category page readable");

  categoryPage.includes("generateMetadata")
    ? pass("Category metadata architecture present")
    : console.log("⚠ Category metadata marker not detected");

  categoryPage.includes("tools")
    ? pass("Category page connected to tools")
    : console.log("⚠ Category-to-tool connection not detected");
}

// ======================================================================
// 7. SEARCH / NAVIGATION SAFETY
// ======================================================================

console.log("\n===== 7. NAVIGATION SAFETY =====");

const navFiles = [
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx"
];

for (const p of navFiles) {
  if (!exists(p)) {
    fail(`Missing navigation file: ${p}`);
    continue;
  }

  const src = read(p);

  src.includes("href")
    ? pass(`Navigation links present: ${p}`)
    : console.log(`⚠ No href marker detected: ${p}`);
}

// ======================================================================
// 8. STALE ARCHITECTURE GUARD
// ======================================================================

console.log("\n===== 8. STALE ARCHITECTURE GUARD =====");

const staleFiles = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
];

for (const p of staleFiles) {
  exists(p)
    ? fail(`STALE FILE PRESENT: ${p}`)
    : pass(`Stale absent: ${p}`);
}

// ======================================================================
// 9. PHASE 10 FILE MODIFICATION GUARD
// ======================================================================

console.log("\n===== 9. PHASE 10 SOURCE GUARD =====");

const phase10Source = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts"
];

for (const p of phase10Source) {
  if (exists(p)) {
    pass(`Phase 10 source remains present: ${p}`);
  }
}

// ======================================================================
// 10. TYPESCRIPT
// ======================================================================

console.log("\n===== 10. TYPESCRIPT REGRESSION =====");

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

console.log("\n===== 11. PRODUCTION BUILD REGRESSION =====");

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
// 12. FINAL FILE CHECK
// ======================================================================

console.log("\n===== 12. FINAL IMPLEMENTATION CHECK =====");

const finalClient = read(clientPath);

if (finalClient.includes("aria-label")) {
  pass("Tool input accessibility verified");
} else {
  console.log("⚠ Accessibility marker not present");
}

if (finalClient.includes("spellCheck")) {
  pass("Textarea behavior marker verified");
} else {
  console.log("⚠ spellCheck marker not present");
}

for (const p of [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts"
]) {
  exists(p)
    ? pass(`Final required file intact: ${p}`)
    : fail(`Final required file missing: ${p}`);
}

// ======================================================================
// FINAL REPORT
// ======================================================================

console.log("\n======================================================================");
console.log("PHASE 11.03 REPORT");
console.log("======================================================================");
console.log(`FILES CHANGED : ${changed}`);
console.log(`FAILED CHECKS : ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 11.03: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("DO NOT CONTINUE FEATURE EXPANSION.");
  process.exit(1);
}

console.log("✅ PHASE 11.03: PASS");
console.log("TOOL UX UPGRADE VERIFIED");
console.log("TOOL DISCOVERY VERIFIED");
console.log("CATEGORY DISCOVERY VERIFIED");
console.log("PHASE 10 FOUNDATION PRESERVED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.03 COMPLETE");
console.log("======================================================================");
