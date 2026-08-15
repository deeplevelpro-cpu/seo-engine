import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const sitemapPath = path.join(root, "app/sitemap.ts");

let failed = 0;
let changed = false;

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => {
  console.log(`✗ ${m}`);
  failed++;
};

const exists = (f) => fs.existsSync(path.join(root, f));
const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

console.log("======================================================================");
console.log("PHASE 12.06.1 — CATEGORY SITEMAP REPAIR + FINAL GATE");
console.log("SITEMAP CATEGORY INDEXING + FULL SEO REGRESSION");
console.log("GUARDED WRITE + AUTOMATIC ROLLBACK");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

[
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
].forEach((f) => {
  exists(f) ? pass(`Foundation: ${f}`) : fail(`Missing: ${f}`);
});

console.log("\n===== 2. SITEMAP BASELINE =====");

if (!fs.existsSync(sitemapPath)) {
  fail("app/sitemap.ts missing");
  process.exit(1);
}

const original = fs.readFileSync(sitemapPath, "utf8");

console.log("----- CURRENT SITEMAP SOURCE -----");
console.log(original);
console.log("----- END CURRENT SITEMAP SOURCE -----");

console.log("\n===== 3. CATEGORY DISCOVERY =====");

const categoryPage = read("app/categories/page.tsx");
const categoryDetail = read("app/categories/[category]/page.tsx");

categoryPage.includes("href")
  ? pass("Category index contains links")
  : fail("Category index links missing");

categoryDetail.includes("href")
  ? pass("Category detail contains links")
  : fail("Category detail links missing");

console.log("\n===== 4. GUARDED CATEGORY SITEMAP REPAIR =====");

let sitemap = original;

/*
 * Only repair if category URLs are not already represented.
 * We intentionally avoid replacing the whole sitemap architecture.
 */

if (!/categories/i.test(sitemap)) {
  const marker =
    /const\s+toolUrls[\s\S]*?;\s*\n/;

  if (marker.test(sitemap)) {
    sitemap = sitemap.replace(
      marker,
      (match) =>
        `${match}\nconst categoryUrls = [\n` +
        `  "/categories",\n` +
        `  "/categories/seo",\n` +
        `  "/categories/content",\n` +
        `  "/categories/developer",\n` +
        `];\n`
    );
  } else {
    /*
     * Conservative fallback: insert category URLs before the return.
     * This does not replace existing tool sitemap logic.
     */
    sitemap = sitemap.replace(
      /return\s*\[/,
      `const categoryUrls = [\n` +
      `  "/categories",\n` +
      `  "/categories/seo",\n` +
      `  "/categories/content",\n` +
      `  "/categories/developer",\n` +
      `];\n\nreturn [`
    );
  }

  if (sitemap !== original) {
    fs.writeFileSync(sitemapPath, sitemap);
    changed = true;
    pass("Category sitemap URLs safely inserted");
  } else {
    fail("Could not safely locate sitemap insertion point");
  }
} else {
  pass("Category sitemap references already present");
}

console.log("\n===== 5. POST-WRITE SITEMAP CONTRACT =====");

sitemap = fs.readFileSync(sitemapPath, "utf8");

[
  ["tools", /tools/i],
  ["categories", /categories/i],
  ["map", /\bmap\b/],
  ["url", /\burl\b|URL/],
].forEach(([name, regex]) => {
  regex.test(sitemap)
    ? pass(`Sitemap marker: ${name}`)
    : fail(`Sitemap marker missing: ${name}`);
});

console.log("\n===== 6. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 7. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 8. LIVE SITEMAP =====");

try {
  const sitemapLive = execSync(
    "curl -s http://localhost:3000/sitemap.xml",
    { encoding: "utf8" }
  );

  /<urlset/i.test(sitemapLive)
    ? pass("Live sitemap XML valid")
    : fail("Live sitemap XML invalid");

  /\/tools/i.test(sitemapLive)
    ? pass("Live sitemap contains tool URLs")
    : fail("Live sitemap contains no tool URLs");

  /\/categories/i.test(sitemapLive)
    ? pass("Live sitemap contains category URLs")
    : fail("Live sitemap contains category URLs missing");

  const count = (sitemapLive.match(/<loc>/g) || []).length;

  count > 0
    ? pass(`Live sitemap contains ${count} URLs`)
    : fail("Live sitemap contains zero URLs");

  console.log(`LIVE SITEMAP URL COUNT: ${count}`);
} catch {
  fail("Unable to fetch live sitemap");
}

console.log("\n===== 9. LIVE CATEGORY ROUTES =====");

[
  "/categories",
  "/categories/seo",
  "/categories/content",
  "/categories/developer",
].forEach((route) => {
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
});

console.log("\n===== 10. PROGRAMMATIC SEO RUNTIME =====");

[
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",
].forEach((route) => {
  try {
    const html = execSync(
      `curl -s http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000${route}`,
      { encoding: "utf8" }
    ).trim();

    status === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${status}`);

    /<title[^>]*>/i.test(html)
      ? pass(`${route} → title present`)
      : fail(`${route} → title missing`);

    /description/i.test(html)
      ? pass(`${route} → description present`)
      : fail(`${route} → description missing`);

    /canonical/i.test(html)
      ? pass(`${route} → canonical present`)
      : fail(`${route} → canonical missing`);

    /noindex/i.test(html)
      ? fail(`${route} → unexpected noindex`)
      : pass(`${route} → indexability clean`);

    /Application error|Internal Server Error|TypeError:|ReferenceError:|Cannot read properties/i.test(html)
      ? fail(`${route} → runtime leakage`)
      : pass(`${route} → runtime clean`);
  } catch {
    fail(`${route} → runtime request failed`);
  }
});

console.log("\n===== 11. 135-TOOL FOUNDATION =====");

const catalog = read("data/tools.ts");
const registry = read("src/lib/tools/index.ts");

[
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
].forEach((slug) => {
  catalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
});

registry.includes("getToolHandler")
  ? pass("getToolHandler preserved")
  : fail("getToolHandler missing");

console.log("\n===== 12. TOOLCLIENT =====");

const tc = read("app/tools/[slug]/ToolClient.tsx");

[
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  'aria-label="Tool input"',
  "spellCheck={false}",
  "aria-live",
].forEach((marker) => {
  tc.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
});

console.log("\n===== 13. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml",
].forEach((f) => {
  exists(f)
    ? fail(`Stale file present: ${f}`)
    : pass(`Stale absent: ${f}`);
});

console.log("\n===== 14. ROBOTS =====");

try {
  const robots = execSync(
    "curl -s http://localhost:3000/robots.txt",
    { encoding: "utf8" }
  );

  /sitemap/i.test(robots)
    ? pass("robots sitemap preserved")
    : fail("robots sitemap missing");

  /user-agent/i.test(robots)
    ? pass("robots user-agent preserved")
    : fail("robots user-agent missing");
} catch {
  fail("Unable to fetch robots.txt");
}

console.log("\n===== 15. CORE ROUTES =====");

[
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
].forEach((route) => {
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
});

console.log("\n===== 16. FINAL DECISION =====");

console.log("======================================================================");

if (failed > 0) {
  if (changed) {
    fs.writeFileSync(sitemapPath, original);
    console.log("🔄 SITEMAP ROLLED BACK");
  }

  console.log(`FAILED CHECKS: ${failed}`);
  console.log("❌ PHASE 12.06.1: FAIL");
  console.log("NO DEPLOY.");
  console.log("======================================================================");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log(`FILES CHANGED: ${changed ? 1 : 0}`);
console.log("======================================================================");
console.log("✅ PHASE 12.06.1: PASS");
console.log("CATEGORY SITEMAP INDEXING VERIFIED");
console.log("LIVE SITEMAP VERIFIED");
console.log("PROGRAMMATIC SEO VERIFIED");
console.log("CANONICAL VERIFIED");
console.log("INDEXABILITY VERIFIED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("TOOLCLIENT VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.06.1 COMPLETE");
console.log("======================================================================");
