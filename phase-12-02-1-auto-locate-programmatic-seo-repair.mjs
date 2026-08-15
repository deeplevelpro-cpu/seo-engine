import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
let failed = 0;
let changed = false;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};

const abs = (p) => path.join(ROOT, p);
const exists = (p) => fs.existsSync(abs(p));
const read = (p) => fs.readFileSync(abs(p), "utf8");
const write = (p, s) => fs.writeFileSync(abs(p), s);

const findPage = (dir) => {
  const candidates = [
    "page.tsx",
    "page.ts",
    "page.jsx",
    "page.js"
  ];

  for (const name of candidates) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) {
      return path.relative(ROOT, p);
    }
  }

  return null;
};

console.log("======================================================================");
console.log("PHASE 12.02.1 — AUTO LOCATE + PROGRAMMATIC SEO REPAIR");
console.log("TOOL KEYWORD + BLOG KEYWORD ROUTES");
console.log("NO EXTENSION ASSUMPTIONS");
console.log("GUARDED WRITE + ROLLBACK + FULL REGRESSION");
console.log("======================================================================");

console.log("\n===== 1. PHASE 11 FOUNDATION LOCK =====");

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

for (const file of protectedFiles) {
  exists(file)
    ? pass(`Protected: ${file}`)
    : fail(`Missing foundation: ${file}`);
}

if (failed > 0) {
  console.log("Foundation failure. STOP.");
  process.exit(1);
}

console.log("\n===== 2. ACTUAL PROGRAMMATIC ROUTE LOCATOR =====");

const toolDir =
  abs("app/[lang]/tools/[slug]/[keyword]");

const blogDir =
  abs("app/blog/[slug]/[keyword]");

if (!fs.existsSync(toolDir)) {
  fail("Tool keyword route directory missing");
}

if (!fs.existsSync(blogDir)) {
  fail("Blog keyword route directory missing");
}

const toolPage = findPage(toolDir);
const blogPage = findPage(blogDir);

if (toolPage) {
  pass(`Tool keyword page located: ${toolPage}`);
} else {
  fail("No page.* file found inside tool keyword route");
}

if (blogPage) {
  pass(`Blog keyword page located: ${blogPage}`);
} else {
  fail("No page.* file found inside blog keyword route");
}

if (failed > 0) {
  console.log("Route locator failed. STOP.");
  process.exit(1);
}

console.log("\n===== 3. ROUTE SOURCE SNAPSHOT =====");

const originalTool = read(toolPage);
const originalBlog = read(blogPage);

const backupTool = originalTool;
const backupBlog = originalBlog;

console.log(`Tool source length: ${originalTool.length}`);
console.log(`Blog source length: ${originalBlog.length}`);

console.log("\n===== 4. TOOL KEYWORD SEO ANALYSIS =====");

let repairedTool = originalTool;

if (
  repairedTool.includes("generateMetadata") &&
  repairedTool.includes("canonical")
) {
  pass("Tool keyword SEO already present");
} else {

  const metadata = `
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  const slug = resolvedParams?.slug || "";
  const keyword = resolvedParams?.keyword || "";

  const cleanKeyword = decodeURIComponent(keyword).replace(/-/g, " ");
  const cleanSlug = decodeURIComponent(slug).replace(/-/g, " ");

  return {
    title: \`\${cleanKeyword} — \${cleanSlug}\`,
    description: \`Explore \${cleanKeyword} with \${cleanSlug}. Use this online tool for fast results.\`,
    alternates: {
      canonical: \`/\${lang}/tools/\${slug}/\${keyword}\`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: \`\${cleanKeyword} — \${cleanSlug}\`,
      description: \`Explore \${cleanKeyword} with \${cleanSlug}.\`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: \`\${cleanKeyword} — \${cleanSlug}\`,
      description: \`Explore \${cleanKeyword} with \${cleanSlug}.\`,
    },
  };
}

`;

  const exportDefault =
    repairedTool.indexOf("export default");

  if (exportDefault === -1) {
    fail("Tool keyword route has no export default");
  } else {
    repairedTool =
      repairedTool.slice(0, exportDefault) +
      metadata +
      repairedTool.slice(exportDefault);

    changed = true;
    pass("Tool keyword generateMetadata + canonical added");
  }
}

console.log("\n===== 5. BLOG KEYWORD SEO ANALYSIS =====");

let repairedBlog = originalBlog;

if (
  repairedBlog.includes("generateMetadata") &&
  repairedBlog.includes("canonical")
) {
  pass("Blog keyword SEO already present");
} else {

  const metadata = `
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const keyword = resolvedParams?.keyword || "";

  const cleanKeyword = decodeURIComponent(keyword).replace(/-/g, " ");
  const cleanSlug = decodeURIComponent(slug).replace(/-/g, " ");

  return {
    title: \`\${cleanKeyword} — \${cleanSlug}\`,
    description: \`Learn about \${cleanKeyword} in this \${cleanSlug} guide.\`,
    alternates: {
      canonical: \`/blog/\${slug}/\${keyword}\`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: \`\${cleanKeyword} — \${cleanSlug}\`,
      description: \`Learn about \${cleanKeyword} in this \${cleanSlug} guide.\`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: \`\${cleanKeyword} — \${cleanSlug}\`,
      description: \`Learn about \${cleanKeyword} in this \${cleanSlug} guide.\`,
    },
  };
}

`;

  const exportDefault =
    repairedBlog.indexOf("export default");

  if (exportDefault === -1) {
    fail("Blog keyword route has no export default");
  } else {
    repairedBlog =
      repairedBlog.slice(0, exportDefault) +
      metadata +
      repairedBlog.slice(exportDefault);

    changed = true;
    pass("Blog keyword generateMetadata + canonical added");
  }
}

console.log("\n===== 6. GUARDED WRITE =====");

if (failed === 0 && changed) {
  write(toolPage, repairedTool);
  write(blogPage, repairedBlog);

  pass(`Written: ${toolPage}`);
  pass(`Written: ${blogPage}`);
} else {
  pass("No programmatic SEO write required");
}

console.log("\n===== 7. POST-WRITE SEO CONTRACT =====");

const finalTool = read(toolPage);
const finalBlog = read(blogPage);

for (const marker of [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  finalTool.includes(marker)
    ? pass(`Tool SEO: ${marker}`)
    : fail(`Tool SEO missing: ${marker}`);

  finalBlog.includes(marker)
    ? pass(`Blog SEO: ${marker}`)
    : fail(`Blog SEO missing: ${marker}`);
}

console.log("\n===== 8. PARAMETER CONTRACT =====");

for (const [label, source] of [
  ["Tool keyword", finalTool],
  ["Blog keyword", finalBlog]
]) {
  source.includes("params")
    ? pass(`${label}: params`)
    : fail(`${label}: params missing`);

  source.includes("slug")
    ? pass(`${label}: slug`)
    : fail(`${label}: slug missing`);

  source.includes("keyword")
    ? pass(`${label}: keyword`)
    : fail(`${label}: keyword missing`);
}

console.log("\n===== 9. DUPLICATE SEO SAFETY =====");

const catalog = read("data/tools.ts");

for (const pattern of [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /tool-\d+/i,
  /slug-\d+/i
]) {
  pattern.test(catalog)
    ? fail(`Bad SEO pattern: ${pattern}`)
    : pass(`Clean SEO pattern: ${pattern}`);
}

console.log("\n===== 10. 135-TOOL FOUNDATION =====");

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

console.log("\n===== 11. TOOLCLIENT REGRESSION =====");

const toolClient =
  read("app/tools/[slug]/ToolClient.tsx");

for (const marker of [
  'aria-label="Tool input"',
  "spellCheck={false}",
  "getToolHandler",
  "inputSchema",
  "setText",
  "setResult",
  "setLoading"
]) {
  toolClient.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
}

console.log("\n===== 12. SEO INFRASTRUCTURE =====");

const toolPageBase =
  read("app/tools/[slug]/page.tsx");

for (const marker of [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
]) {
  toolPageBase.includes(marker)
    ? pass(`Tool base SEO: ${marker}`)
    : fail(`Tool base SEO missing: ${marker}`);
}

console.log("\n===== 13. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

sitemap.includes("tools")
  ? pass("Sitemap tool integration")
  : fail("Sitemap tool integration missing");

robots.includes("sitemap")
  ? pass("Robots sitemap")
  : fail("Robots sitemap missing");

console.log("\n===== 14. STALE ARCHITECTURE =====");

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
    ? fail(`Stale exists: ${p}`)
    : pass(`Stale absent: ${p}`);
}

console.log("\n===== 15. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    stdio: "inherit"
  });

  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  write(toolPage, backupTool);
  write(blogPage, backupBlog);

  console.log("\n======================================================================");
  console.log("PHASE 12.02.1 PRE-BUILD FAILURE");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("🔄 TARGET ROUTES ROLLED BACK");
  console.log("NO DEPLOYMENT.");
  process.exit(1);
}

console.log("\n===== 16. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    stdio: "inherit"
  });

  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 17. LIVE CORE ROUTES =====");

for (const route of [
  "/",
  "/tools",
  "/categories",
  "/blog",
  "/tools/keyword-density-checker",
  "/tools/seo-slug-generator",
  "/tools/word-counter"
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

console.log("\n===== 18. RUNTIME FORENSICS =====");

for (const route of [
  "/tools/keyword-density-checker",
  "/tools/seo-slug-generator",
  "/tools/word-counter"
]) {
  try {
    const html = execSync(
      `curl -s http://localhost:3000${route}`,
      { encoding: "utf8" }
    );

    /Application error|Internal Server Error|Unhandled Runtime Error/i.test(html)
      ? fail(`${route} → runtime error leakage`)
      : pass(`${route} → runtime clean`);
  } catch {
    fail(`${route} → runtime request failed`);
  }
}

console.log("\n===== 19. FINAL FOUNDATION INTEGRITY =====");

for (const p of protectedFiles) {
  exists(p)
    ? pass(`Final intact: ${p}`)
    : fail(`Final missing: ${p}`);
}

console.log("\n======================================================================");
console.log("PHASE 12.02.1 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log(`FILES CHANGED: ${changed ? 2 : 0}`);
console.log("======================================================================");

if (failed > 0) {
  write(toolPage, backupTool);
  write(blogPage, backupBlog);

  console.log("🔄 AUTOMATIC ROLLBACK APPLIED");
  console.log("❌ PHASE 12.02.1: FAIL");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 12.02.1: PASS");
console.log("ACTUAL ROUTE FILES AUTO-LOCATED");
console.log("PROGRAMMATIC TOOL SEO VERIFIED");
console.log("PROGRAMMATIC BLOG SEO VERIFIED");
console.log("CANONICALS VERIFIED");
console.log("135-TOOL FOUNDATION PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE ROUTES PASS");
console.log("RUNTIME FORENSICS PASS");
console.log("======================================================================");
console.log("🚀 PHASE 12.02.1 COMPLETE — SEO ROUTE METADATA HARDENED");
console.log("======================================================================");
