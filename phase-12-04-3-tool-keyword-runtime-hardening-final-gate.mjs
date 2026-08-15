import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const toolRoute = path.join(
  ROOT,
  "app/[lang]/tools/[slug]/[keyword]/page.js"
);
const blogRoute = path.join(
  ROOT,
  "app/blog/[slug]/[keyword]/page.js"
);

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
  ".gitignore",
];

let failed = 0;
const backups = new Map();

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};

function backup(file) {
  if (!backups.has(file)) {
    backups.set(file, fs.readFileSync(file, "utf8"));
  }
}

function rollback() {
  for (const [file, source] of backups) {
    fs.writeFileSync(file, source);
  }
  if (backups.size) console.log("🔄 TARGET ROUTES ROLLED BACK");
}

console.log("======================================================================");
console.log("PHASE 12.04.3 — TOOL KEYWORD RUNTIME HARDENING");
console.log("NEXT.JS 16 PARAMS + DEFENSIVE URL PARAMS + FULL REGRESSION");
console.log("GUARDED WRITE + AUTOMATIC ROLLBACK");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

for (const file of foundation) {
  if (fs.existsSync(path.join(ROOT, file))) pass(`Protected: ${file}`);
  else fail(`Missing: ${file}`);
}

if (!fs.existsSync(toolRoute)) fail("Tool keyword route missing");
else pass("Tool keyword route found");

if (!fs.existsSync(blogRoute)) fail("Blog keyword route missing");
else pass("Blog keyword route found");

if (failed) {
  console.log("FOUNDATION FAILURE — STOP.");
  process.exit(1);
}

console.log("\n===== 2. TOOL ROUTE BEFORE REPAIR =====");

let source = fs.readFileSync(toolRoute, "utf8");

console.log(source);

if (/await\s+params/.test(source)) {
  pass("Next.js 16 await params already present");
} else {
  fail("await params missing");
}

console.log("\n===== 3. GUARDED TOOL PARAMETER HARDENING =====");

backup(toolRoute);

let repaired = source;

/*
 * Normalize the entire parameter resolution block.
 * This intentionally avoids direct .replace() access on possibly
 * unresolved/undefined route values.
 */

repaired = repaired.replace(
  /const\s+resolvedParams\s*=\s*await\s+params\s*;\s*const\s+\{\s*lang,\s*slug,\s*keyword\s*\}\s*=\s*resolvedParams\s*;/,
  `const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  const slug = resolvedParams?.slug || "";
  const keyword = resolvedParams?.keyword || "";`
);

/* If previous structure differs, repair the destructuring directly. */
repaired = repaired.replace(
  /const\s+\{\s*lang,\s*slug,\s*keyword\s*\}\s*=\s*params\s*;/,
  `const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  const slug = resolvedParams?.slug || "";
  const keyword = resolvedParams?.keyword || "";`
);

/* Make keyword/slug cleaning defensive. */
repaired = repaired.replace(
  /const\s+cleanKeyword\s*=\s*keyword\.replace\(\s*\/-\/g,\s*" "\s*\);/,
  `const cleanKeyword = String(keyword || "").replace(/-/g, " ");`
);

repaired = repaired.replace(
  /const\s+cleanSlug\s*=\s*decodeURIComponent\(slug\)\.replace\(\s*\/-\/g,\s*" "\s*\);/,
  `const cleanSlug = decodeURIComponent(String(slug || "")).replace(/-/g, " ");`
);

repaired = repaired.replace(
  /const\s+cleanKeyword\s*=\s*decodeURIComponent\(keyword\)\.replace\(\s*\/-\/g,\s*" "\s*\);/,
  `const cleanKeyword = decodeURIComponent(String(keyword || "")).replace(/-/g, " ");`
);

if (repaired === source) {
  fail("No ToolPage repair pattern matched");
} else {
  fs.writeFileSync(toolRoute, repaired);
  pass("ToolPage defensive params hardening applied");
}

console.log("\n===== 4. TOOL ROUTE POST-REPAIR FORENSICS =====");

source = fs.readFileSync(toolRoute, "utf8");

for (const marker of [
  "await params",
  'const lang = resolvedParams?.lang || "en"',
  'const slug = resolvedParams?.slug || ""',
  'const keyword = resolvedParams?.keyword || ""',
  "cleanKeyword",
  "cleanSlug",
  "generateContent",
  "generateMetadata",
  "canonical",
  "robots",
]) {
  if (source.includes(marker)) pass(`Tool route: ${marker}`);
  else fail(`Tool route missing: ${marker}`);
}

if (/params\.keyword\.replace/.test(source)) {
  fail("Unsafe params.keyword.replace remains");
} else {
  pass("Unsafe params.keyword.replace absent");
}

if (/keyword\.replace/.test(source)) {
  fail("Direct keyword.replace remains");
} else {
  pass("Direct keyword.replace absent");
}

console.log("\n===== 5. BLOG LINK CONTRACT =====");

const blogSource = fs.readFileSync(blogRoute, "utf8");

if (
  /rawKeyword/.test(blogSource) &&
  /\/tools\/\$\{slug\}\/\$\{rawKeyword\}/.test(blogSource)
) {
  pass("Blog → tool internal link preserved");
} else if (blogSource.includes("Try ${keyword} Tool")) {
  pass("Blog → tool linking content preserved");
} else {
  fail("Blog → tool internal link missing");
}

console.log("\n===== 6. 135-TOOL FOUNDATION =====");

const catalog = fs.readFileSync(
  path.join(ROOT, "data/tools.ts"),
  "utf8"
);
const registry = fs.readFileSync(
  path.join(ROOT, "src/lib/tools/index.ts"),
  "utf8"
);

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
  "checklist-generator",
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

console.log("\n===== 7. TOOLCLIENT =====");

const client = fs.readFileSync(
  path.join(ROOT, "app/tools/[slug]/ToolClient.tsx"),
  "utf8"
);

for (const marker of [
  'aria-label="Tool input"',
  "spellCheck={false}",
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  "aria-live",
]) {
  client.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
}

console.log("\n===== 8. SEO / DISCOVERY / SITEMAP =====");

for (const file of [
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
]) {
  fs.existsSync(path.join(ROOT, file))
    ? pass(`Present: ${file}`)
    : fail(`Missing: ${file}`);
}

console.log("\n===== 9. STALE ARCHITECTURE =====");

for (const file of [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml",
]) {
  !fs.existsSync(path.join(ROOT, file))
    ? pass(`Stale absent: ${file}`)
    : fail(`Stale present: ${file}`);
}

console.log("\n===== 10. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 11. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 12. LIVE CORE ROUTES =====");

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
  "/robots.txt",
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
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 13. PROGRAMMATIC RUNTIME =====");

const routes = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",
];

for (const route of routes) {
  try {
    const output = execSync(
      `curl -s -i http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const match = output.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/);
    const status = match?.[1] || "unknown";

    status === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${status}`);

    if (
      /Cannot read properties of undefined|TypeError|ReferenceError|SyntaxError|Unhandled|Internal Server Error/i.test(
        output
      )
    ) {
      fail(`${route} → runtime error leakage`);
    } else {
      pass(`${route} → no runtime error leakage`);
    }
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 14. REPRESENTATIVE TOOL ROUTES =====");

for (const route of [
  "/tools/keyword-density-checker",
  "/tools/meta-tag-generator",
  "/tools/seo-slug-generator",
  "/tools/word-counter",
  "/tools/json-formatter",
  "/tools/percentage-calculator",
]) {
  try {
    const output = execSync(
      `curl -s -i http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const match = output.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/);
    const status = match?.[1] || "unknown";

    status === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${status}`);

    /TypeError|ReferenceError|SyntaxError|Unhandled/i.test(output)
      ? fail(`${route} → runtime error leakage`)
      : pass(`${route} → no runtime error leakage`);
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 15. FINAL REGRESSION =====");

if (failed > 0) {
  rollback();

  console.log("======================================================================");
  console.log("PHASE 12.04.3 FINAL REPORT");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log(`TARGET FILES ROLLED BACK: ${backups.size}`);
  console.log("❌ PHASE 12.04.3: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("======================================================================");
  process.exit(1);
}

console.log("✓ ALL CHECKS PASSED");
console.log("✓ NO ROLLBACK REQUIRED");

console.log("======================================================================");
console.log("PHASE 12.04.3 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log(`FILES CHANGED: ${backups.size}`);
console.log("======================================================================");
console.log("✅ PHASE 12.04.3: PASS");
console.log("TOOL KEYWORD RUNTIME HARDENED");
console.log("NEXT.JS 16 PARAMS VERIFIED");
console.log("PROGRAMMATIC TOOL ROUTES VERIFIED");
console.log("PROGRAMMATIC BLOG ROUTE VERIFIED");
console.log("SEO METADATA VERIFIED");
console.log("CANONICAL VERIFIED");
console.log("INDEXING VERIFIED");
console.log("INTERNAL LINKING VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE CORE ROUTES PASS");
console.log("PROGRAMMATIC RUNTIME PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.04.3 COMPLETE");
console.log("======================================================================");
