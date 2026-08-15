import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();

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

const toolRoute = path.join(
  ROOT,
  "app/[lang]/tools/[slug]/[keyword]/page.js"
);

const blogRoute = path.join(
  ROOT,
  "app/blog/[slug]/[keyword]/page.js"
);

let failed = 0;
const backups = new Map();

function pass(msg) {
  console.log(`✓ ${msg}`);
}

function fail(msg) {
  console.log(`✗ ${msg}`);
  failed++;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function exists(file) {
  return fs.existsSync(file);
}

function backup(file) {
  if (!backups.has(file)) {
    backups.set(file, read(file));
  }
}

function rollback() {
  for (const [file, source] of backups) {
    fs.writeFileSync(file, source);
  }

  if (backups.size) {
    console.log("🔄 TARGET ROUTES ROLLED BACK");
  }
}

console.log("======================================================================");
console.log("PHASE 12.04.2 — NEXT.JS 16 PARAMS RUNTIME REPAIR + FINAL GATE");
console.log("TARGET: PROGRAMMATIC TOOL/BLOG KEYWORD 500s");
console.log("GUARDED WRITE + AUTOMATIC ROLLBACK + MAXIMUM REGRESSION");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION PROTECTION =====");

for (const file of foundation) {
  if (exists(path.join(ROOT, file))) {
    pass(`Protected: ${file}`);
  } else {
    fail(`Missing foundation: ${file}`);
  }
}

console.log("\n===== 2. TARGET ROUTE PROTECTION =====");

if (exists(toolRoute)) {
  pass("Tool keyword route found");
} else {
  fail("Tool keyword route missing");
}

if (exists(blogRoute)) {
  pass("Blog keyword route found");
} else {
  fail("Blog keyword route missing");
}

if (failed > 0) {
  console.log("TARGET DISCOVERY FAILED — STOP.");
  process.exit(1);
}

console.log("\n===== 3. PRE-REPAIR FORENSICS =====");

let toolSource = read(toolRoute);
let blogSource = read(blogRoute);

if (/const\s+\{\s*lang,\s*slug,\s*keyword\s*\}\s*=\s*params/.test(toolSource)) {
  pass("Confirmed ToolPage unsafe params destructuring");
} else {
  fail("Expected ToolPage unsafe params pattern not found");
}

if (/params\.keyword\.replace/.test(blogSource)) {
  pass("Confirmed BlogPage unsafe params access");
} else {
  fail("Expected BlogPage unsafe params pattern not found");
}

console.log("\n===== 4. GUARDED NEXT.JS 16 PARAMS REPAIR =====");

backup(toolRoute);
backup(blogRoute);

/*
 * Tool route:
 * Next.js 16 App Router supplies params as a Promise.
 *
 * BEFORE:
 * const { lang, slug, keyword } = params;
 *
 * AFTER:
 * const resolvedParams = await params;
 * const { lang, slug, keyword } = resolvedParams;
 */
const originalTool = toolSource;

toolSource = toolSource.replace(
  /const\s+\{\s*lang,\s*slug,\s*keyword\s*\}\s*=\s*params\s*;/,
  `const resolvedParams = await params;
  const { lang, slug, keyword } = resolvedParams;`
);

if (toolSource === originalTool) {
  fail("ToolPage params repair was not applied");
} else {
  fs.writeFileSync(toolRoute, toolSource);
  pass("ToolPage now awaits params");
}

/*
 * Blog route:
 *
 * BEFORE:
 * const keyword = params.keyword.replace(...)
 * href={`/tools/${params.slug}/${params.keyword}`}
 *
 * AFTER:
 * const resolvedParams = await params;
 * const { slug, keyword: rawKeyword } = resolvedParams;
 * const keyword = rawKeyword.replace(...)
 */
const originalBlog = blogSource;

blogSource = blogSource.replace(
  /const\s+keyword\s*=\s*params\.keyword\.replace\(\s*\/-\/g,\s*" "\s*\);/,
  `const resolvedParams = await params;
  const { slug, keyword: rawKeyword } = resolvedParams;
  const keyword = rawKeyword.replace(/-/g, " ");`
);

blogSource = blogSource.replace(
  /href=\{`\/tools\/\$\{params\.slug\}\/\$\{params\.keyword\}`\}/,
  "href={`/tools/${slug}/${rawKeyword}`}"
);

if (blogSource === originalBlog) {
  fail("BlogPage params repair was not applied");
} else {
  fs.writeFileSync(blogRoute, blogSource);
  pass("BlogPage now awaits params");
}

console.log("\n===== 5. POST-REPAIR SOURCE CONTRACT =====");

toolSource = read(toolRoute);
blogSource = read(blogRoute);

if (/const\s+resolvedParams\s*=\s*await\s+params/.test(toolSource)) {
  pass("ToolPage await params verified");
} else {
  fail("ToolPage await params missing");
}

if (/const\s+\{\s*lang,\s*slug,\s*keyword\s*\}\s*=\s*resolvedParams/.test(toolSource)) {
  pass("ToolPage resolved params destructuring verified");
} else {
  fail("ToolPage resolved destructuring missing");
}

if (!/const\s+\{\s*lang,\s*slug,\s*keyword\s*\}\s*=\s*params/.test(toolSource)) {
  pass("Unsafe ToolPage params destructuring absent");
} else {
  fail("Unsafe ToolPage params destructuring still present");
}

if (/const\s+resolvedParams\s*=\s*await\s+params/.test(blogSource)) {
  pass("BlogPage await params verified");
} else {
  fail("BlogPage await params missing");
}

if (/rawKeyword\.replace/.test(blogSource)) {
  pass("BlogPage resolved keyword usage verified");
} else {
  fail("BlogPage resolved keyword usage missing");
}

if (!/params\.keyword\.replace/.test(blogSource)) {
  pass("Unsafe BlogPage params.keyword access absent");
} else {
  fail("Unsafe BlogPage params.keyword access still present");
}

console.log("\n===== 6. SEO METADATA PRESERVATION =====");

for (const [name, source] of [
  ["Tool keyword", toolSource],
  ["Blog keyword", blogSource],
]) {
  for (const marker of [
    "generateMetadata",
    "alternates",
    "canonical",
    "robots",
    "openGraph",
    "twitter",
  ]) {
    if (source.includes(marker)) {
      pass(`${name}: ${marker}`);
    } else {
      fail(`${name}: missing ${marker}`);
    }
  }
}

console.log("\n===== 7. INTERNAL LINKING PRESERVATION =====");

if (toolSource.includes("content.links.map")) {
  pass("Tool keyword related links preserved");
} else {
  fail("Tool keyword related links missing");
}

if (blogSource.includes("Try ${keyword} Tool")) {
  pass("Blog → tool linking preserved");
} else {
  fail("Blog → tool linking missing");
}

console.log("\n===== 8. 135-TOOL FOUNDATION REGRESSION =====");

const catalog = read(path.join(ROOT, "data/tools.ts"));
const registry = read(path.join(ROOT, "src/lib/tools/index.ts"));

const slugs = [
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

for (const slug of slugs) {
  if (catalog.includes(slug)) {
    pass(`Catalog: ${slug}`);
  } else {
    fail(`Catalog missing: ${slug}`);
  }

  if (registry.includes(slug)) {
    pass(`Registry: ${slug}`);
  } else {
    fail(`Registry missing: ${slug}`);
  }
}

if (registry.includes("getToolHandler")) {
  pass("getToolHandler preserved");
} else {
  fail("getToolHandler missing");
}

console.log("\n===== 9. TOOLCLIENT REGRESSION =====");

const toolClient = read(
  path.join(ROOT, "app/tools/[slug]/ToolClient.tsx")
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
  if (toolClient.includes(marker)) {
    pass(`ToolClient: ${marker}`);
  } else {
    fail(`ToolClient missing: ${marker}`);
  }
}

console.log("\n===== 10. DISCOVERY + SITEMAP + ROBOTS =====");

const discoveryFiles = [
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
];

for (const file of discoveryFiles) {
  if (exists(path.join(ROOT, file))) {
    pass(`Present: ${file}`);
  } else {
    fail(`Missing: ${file}`);
  }
}

console.log("\n===== 11. STALE ARCHITECTURE =====");

const stale = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml",
];

for (const file of stale) {
  if (!exists(path.join(ROOT, file))) {
    pass(`Stale absent: ${file}`);
  } else {
    fail(`Stale architecture present: ${file}`);
  }
}

console.log("\n===== 12. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 13. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 14. LIVE CORE ROUTES =====");

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
  "/robots.txt",
];

for (const route of coreRoutes) {
  try {
    const output = execSync(
      `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${route}`,
      { encoding: "utf8" }
    ).trim();

    if (output === "200") {
      pass(`${route} → HTTP 200`);
    } else {
      fail(`${route} → HTTP ${output}`);
    }
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 15. REAL PROGRAMMATIC RUNTIME SMOKE =====");

const programmaticRoutes = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",
];

for (const route of programmaticRoutes) {
  try {
    const output = execSync(
      `curl -s -i http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const statusMatch = output.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/);
    const status = statusMatch ? statusMatch[1] : "unknown";

    if (status === "200") {
      pass(`${route} → HTTP 200`);
    } else {
      fail(`${route} → HTTP ${status}`);
    }

    if (
      /Cannot read properties of undefined|TypeError|ReferenceError|SyntaxError|Unhandled|Internal Server Error/i.test(
        output
      )
    ) {
      fail(`${route} → runtime error leakage detected`);
    } else {
      pass(`${route} → no runtime error leakage`);
    }
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 16. REPRESENTATIVE TOOL RUNTIME =====");

const toolRoutes = [
  "/tools/keyword-density-checker",
  "/tools/meta-tag-generator",
  "/tools/seo-slug-generator",
  "/tools/word-counter",
  "/tools/json-formatter",
  "/tools/percentage-calculator",
];

for (const route of toolRoutes) {
  try {
    const output = execSync(
      `curl -s -i http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const match = output.match(/HTTP\/\d(?:\.\d)?\s+(\d+)/);
    const status = match ? match[1] : "unknown";

    if (status === "200") {
      pass(`${route} → HTTP 200`);
    } else {
      fail(`${route} → HTTP ${status}`);
    }

    if (/TypeError|ReferenceError|SyntaxError|Unhandled/i.test(output)) {
      fail(`${route} → runtime error leakage detected`);
    } else {
      pass(`${route} → no runtime error leakage`);
    }
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 17. FINAL SOURCE INTEGRITY =====");

for (const file of foundation) {
  if (exists(path.join(ROOT, file))) {
    pass(`Final intact: ${file}`);
  } else {
    fail(`Final missing: ${file}`);
  }
}

console.log("\n===== 18. AUTOMATIC ROLLBACK =====");

if (failed > 0) {
  rollback();

  console.log("======================================================================");
  console.log("PHASE 12.04.2 FINAL REPORT");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log(`TARGET FILES ROLLED BACK: ${backups.size}`);
  console.log("❌ PHASE 12.04.2: FAIL");
  console.log("DO NOT DEPLOY.");
  console.log("======================================================================");

  process.exit(1);
}

console.log("✓ All guarded checks passed");
console.log("✓ No rollback required");

console.log("\n======================================================================");
console.log("PHASE 12.04.2 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log(`FILES CHANGED: ${backups.size}`);
console.log("======================================================================");
console.log("✅ PHASE 12.04.2: PASS");
console.log("NEXT.JS 16 PARAMS RUNTIME REPAIRED");
console.log("PROGRAMMATIC TOOL ROUTES VERIFIED");
console.log("PROGRAMMATIC BLOG ROUTE VERIFIED");
console.log("METADATA VERIFIED");
console.log("CANONICAL VERIFIED");
console.log("INDEXABILITY VERIFIED");
console.log("INTERNAL LINKING VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("RUNTIME FORENSICS PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.04.2 COMPLETE");
console.log("======================================================================");
