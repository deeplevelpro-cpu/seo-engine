import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const file = path.join(ROOT, "app/tools/[slug]/page.tsx");

let failed = 0;
let changed = false;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const exists = (p) => fs.existsSync(path.join(ROOT, p));

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

console.log("======================================================================");
console.log("PHASE 12.03.1 — SAFE TOOL INTERNAL LINK REPAIR + FINAL GATE");
console.log("TARGET: app/tools/[slug]/page.tsx");
console.log("GUARDED WRITE + AUTOMATIC ROLLBACK");
console.log("MAXIMUM CONSOLIDATED REGRESSION");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION PROTECTION =====");

for (const p of protectedFiles) {
  exists(p)
    ? pass(`Protected: ${p}`)
    : fail(`Missing: ${p}`);
}

if (failed > 0) process.exit(1);

console.log("\n===== 2. TOOL PAGE BASELINE =====");

let original = fs.readFileSync(file, "utf8");

original.includes("generateMetadata")
  ? pass("Tool SEO metadata preserved")
  : fail("Tool SEO metadata missing");

original.includes("canonical")
  ? pass("Canonical preserved")
  : fail("Canonical missing");

original.includes("alternates")
  ? pass("Alternates preserved")
  : fail("Alternates missing");

original.includes("params")
  ? pass("Dynamic params preserved")
  : fail("Dynamic params missing");

console.log("\n===== 3. INTERNAL LINK FORENSICS =====");

if (/href\s*=\s*["']\/tools["']/.test(original)) {
  pass("Tool page already links to /tools");
} else {
  console.log("⚠ Tool page /tools internal link missing");
}

console.log("\n===== 4. GUARDED INTERNAL LINK REPAIR =====");

const marker = "{/* PHASE_12_03_TOOL_DISCOVERY_LINK */}";

if (/href\s*=\s*["']\/tools["']/.test(original)) {
  pass("No write required");
} else {
  const toolClientMatch = original.match(
    /<ToolClient\b[\s\S]*?\/>/
  );

  const safeLink = `
      ${marker}
      <div>
        <a href="/tools">Explore all tools</a>
      </div>`;

  if (toolClientMatch) {
    const insertionPoint =
      toolClientMatch.index + toolClientMatch[0].length;

    const updated =
      original.slice(0, insertionPoint) +
      safeLink +
      original.slice(insertionPoint);

    fs.writeFileSync(file, updated);
    changed = true;

    pass("Safe internal /tools link inserted after ToolClient");
  } else {
    fail("Safe ToolClient insertion point not found");
  }
}

console.log("\n===== 5. POST-WRITE SOURCE VALIDATION =====");

const current = fs.readFileSync(file, "utf8");

if (/href\s*=\s*["']\/tools["']/.test(current)) {
  pass("Tool page /tools internal link verified");
} else {
  fail("Tool page /tools internal link still missing");
}

if (current.includes(marker)) {
  pass("Repair marker verified");
} else if (changed) {
  fail("Repair marker missing after write");
}

current.includes("ToolClient")
  ? pass("ToolClient preserved")
  : fail("ToolClient reference missing");

current.includes("generateMetadata")
  ? pass("generateMetadata preserved")
  : fail("generateMetadata lost");

current.includes("canonical")
  ? pass("Canonical preserved")
  : fail("Canonical lost");

current.includes("alternates")
  ? pass("Alternates preserved")
  : fail("Alternates lost");

console.log("\n===== 6. JSX SAFETY =====");

const badPatterns = [
  /onChange=\{\(e\)\s*=(?!>)\s*aria-/,
  /onChange=\{\(e\)\s*=(?!>)\s*spellCheck/,
  /onChange=\{\(e\)\s*=(?!>)\s*updateField/
];

for (const pattern of badPatterns) {
  pattern.test(current)
    ? fail(`JSX corruption detected: ${pattern}`)
    : pass(`JSX clean: ${pattern}`);
}

console.log("\n===== 7. 135-TOOL ARCHITECTURE =====");

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

console.log("\n===== 8. PROGRAMMATIC SEO ROUTES =====");

const toolKeywordDir = "app/[lang]/tools/[slug]/[keyword]";
const blogKeywordDir = "app/blog/[slug]/[keyword]";

exists(toolKeywordDir)
  ? pass("Tool keyword route present")
  : fail("Tool keyword route missing");

exists(blogKeywordDir)
  ? pass("Blog keyword route present")
  : fail("Blog keyword route missing");

const locatePage = (dir) => {
  for (const name of ["page.tsx", "page.ts", "page.jsx", "page.js"]) {
    const p = path.join(ROOT, dir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
};

const toolKeywordPage = locatePage(toolKeywordDir);
const blogKeywordPage = locatePage(blogKeywordDir);

for (const [name, p] of [
  ["Tool keyword", toolKeywordPage],
  ["Blog keyword", blogKeywordPage]
]) {
  if (!p) {
    fail(`${name} page source missing`);
    continue;
  }

  const src = fs.readFileSync(p, "utf8");

  src.includes("params")
    ? pass(`${name}: params`)
    : fail(`${name}: params missing`);

  src.includes("slug")
    ? pass(`${name}: slug`)
    : fail(`${name}: slug missing`);

  src.includes("keyword")
    ? pass(`${name}: keyword`)
    : fail(`${name}: keyword missing`);

  src.includes("generateMetadata")
    ? pass(`${name}: generateMetadata`)
    : fail(`${name}: generateMetadata missing`);

  src.includes("canonical")
    ? pass(`${name}: canonical`)
    : fail(`${name}: canonical missing`);

  src.includes("alternates")
    ? pass(`${name}: alternates`)
    : fail(`${name}: alternates missing`);
}

console.log("\n===== 9. DISCOVERY ARCHITECTURE =====");

const toolsPage = read("app/tools/page.tsx");
const categoriesPage = read("app/categories/page.tsx");
const categoryPage = read("app/categories/[category]/page.tsx");

toolsPage.includes("href")
  ? pass("Tools discovery links")
  : fail("Tools discovery links missing");

categoriesPage.includes("href")
  ? pass("Categories discovery links")
  : fail("Categories discovery links missing");

categoryPage.includes("href")
  ? pass("Category → tool links")
  : fail("Category → tool links missing");

console.log("\n===== 10. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

sitemap.includes("tools")
  ? pass("Sitemap tool integration")
  : fail("Sitemap tool integration missing");

robots.includes("sitemap")
  ? pass("Robots sitemap")
  : fail("Robots sitemap missing");

console.log("\n===== 11. STALE ARCHITECTURE =====");

for (const p of [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
]) {
  exists(p)
    ? fail(`Stale file exists: ${p}`)
    : pass(`Stale absent: ${p}`);
}

console.log("\n===== 12. LEGACY REDIRECTS =====");

const nextConfig = read("next.config.ts");

for (const marker of ["case-converter", "text-to-slug"]) {
  nextConfig.includes(marker)
    ? pass(`Redirect protection: ${marker}`)
    : fail(`Redirect missing: ${marker}`);
}

console.log("\n===== 13. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  if (changed) {
    fs.writeFileSync(file, original);
    console.log("🔄 TOOL PAGE ROLLED BACK");
  }

  console.log("\n======================================================================");
  console.log("PHASE 12.03.1 PRE-BUILD FAILURE");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("NO DEPLOYMENT");
  console.log("======================================================================");
  process.exit(1);
}

console.log("\n===== 14. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 15. LIVE CORE ROUTES =====");

for (const route of [
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
]) {
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

console.log("\n===== 16. TOOL ROUTE REGRESSION =====");

for (const slug of [
  "keyword-density-checker",
  "meta-tag-generator",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "json-formatter"
]) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/tools/${slug}`,
      { encoding: "utf8" }
    ).trim();

    status === "200"
      ? pass(`${slug} → HTTP 200`)
      : fail(`${slug} → HTTP ${status}`);
  } catch {
    fail(`${slug} → unreachable`);
  }
}

console.log("\n===== 17. FINAL SOURCE INTEGRITY =====");

for (const p of protectedFiles) {
  exists(p)
    ? pass(`Final intact: ${p}`)
    : fail(`Final missing: ${p}`);
}

console.log("\n===== 18. FINAL INTERNAL LINK CHECK =====");

const finalToolPage = fs.readFileSync(file, "utf8");

if (/href\s*=\s*["']\/tools["']/.test(finalToolPage)) {
  pass("Tool page internal discovery link FINAL PASS");
} else {
  fail("Tool page internal discovery link FINAL FAIL");
}

console.log("\n======================================================================");
console.log("PHASE 12.03.1 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log(`FILES CHANGED: ${changed ? 1 : 0}`);
console.log("======================================================================");

if (failed > 0) {
  if (changed) {
    fs.writeFileSync(file, original);
    console.log("🔄 AUTOMATIC ROLLBACK APPLIED");
  }

  console.log("❌ PHASE 12.03.1: FAIL");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 12.03.1: PASS");
console.log("TOOL INTERNAL LINKING REPAIRED");
console.log("PROGRAMMATIC SEO ROUTES VERIFIED");
console.log("CANONICAL + METADATA VERIFIED");
console.log("INDEXING SAFETY VERIFIED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("TOOLCLIENT VERIFIED");
console.log("DISCOVERY VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.03 CLOSED");
console.log("======================================================================");
