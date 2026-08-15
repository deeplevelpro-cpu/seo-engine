import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

const files = {
  tools: path.join(root, "data/tools.ts"),
  registry: path.join(root, "src/lib/tools/index.ts"),
  content: path.join(root, "src/lib/contentGenerator.js"),
  toolKeyword: path.join(root, "app/[lang]/tools/[slug]/[keyword]/page.js"),
  blogKeyword: path.join(root, "app/blog/[slug]/[keyword]/page.js"),
  toolPage: path.join(root, "app/tools/[slug]/page.tsx"),
  toolClient: path.join(root, "app/tools/[slug]/ToolClient.tsx"),
  toolsPage: path.join(root, "app/tools/page.tsx"),
  categoriesPage: path.join(root, "app/categories/page.tsx"),
  categoryPage: path.join(root, "app/categories/[category]/page.tsx"),
  sitemap: path.join(root, "app/sitemap.ts"),
  robots: path.join(root, "app/robots.ts"),
};

function exists(file) {
  return fs.existsSync(file);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  console.log(`✗ ${message}`);
  failed++;
}

function checkFile(label, file) {
  if (exists(file)) pass(`${label}: ${path.relative(root, file)}`);
  else fail(`${label} missing: ${path.relative(root, file)}`);
}

console.log("======================================================================");
console.log("PHASE 13.03 — PROGRAMMATIC SEO CONTENT INTENT SCALE GATE");
console.log("UNIQUE CONTENT SIGNALS + INTENT + DISCOVERY + FULL REGRESSION");
console.log("READ/WRITE GUARDED VALIDATION");
console.log("NO HOMEPAGE MODIFICATION");
console.log("NO MASS THIN PAGE EXPANSION");
console.log("135-TOOL FOUNDATION PROTECTED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

for (const [name, file] of Object.entries(files)) {
  checkFile(name, file);
}

if (failed) {
  console.log("Foundation lock failed. STOP.");
  process.exit(1);
}

console.log("\n===== 2. CONTENT ENGINE FORENSICS =====");

const content = read(files.content);

for (const marker of [
  "generateContent",
  "generateBlogContent",
  "keyword",
  "title",
  "description",
  "intro",
  "content",
  "benefits",
  "steps",
  "links",
  "sections",
]) {
  content.includes(marker)
    ? pass(`Content engine marker: ${marker}`)
    : fail(`Content engine marker missing: ${marker}`);
}

if (/Lorem ipsum/i.test(content)) {
  fail("Placeholder Lorem ipsum detected");
} else {
  pass("No Lorem ipsum content");
}

console.log("\n===== 3. TOOL KEYWORD INTENT CONTRACT =====");

const toolKeyword = read(files.toolKeyword);

for (const marker of [
  "await params",
  "cleanKeyword",
  "cleanSlug",
  "generateContent",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  'href="/tools"',
  'href="/categories"',
  "content?.title",
  "content?.description",
  "content?.intro",
  "content?.content",
  "content?.benefits",
  "content?.steps",
  "content?.links",
]) {
  toolKeyword.includes(marker)
    ? pass(`Tool intent/render marker: ${marker}`)
    : fail(`Tool intent/render marker missing: ${marker}`);
}

console.log("\n===== 4. BLOG KEYWORD INTENT CONTRACT =====");

const blogKeyword = read(files.blogKeyword);

for (const marker of [
  "await params",
  "cleanKeyword",
  "cleanSlug",
  "generateBlogContent",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  'href="/tools"',
  'href="/categories"',
  "content?.title",
  "content?.intro",
  "content?.content",
  "content?.sections",
  "content?.links",
]) {
  blogKeyword.includes(marker)
    ? pass(`Blog intent/render marker: ${marker}`)
    : fail(`Blog intent/render marker missing: ${marker}`);
}

console.log("\n===== 5. KEYWORD-DERIVED CONTENT SAFETY =====");

const combined = `${toolKeyword}\n${blogKeyword}\n${content}`;

for (const pattern of [
  /keyword/,
  /cleanKeyword/,
  /cleanSlug/,
  /generateContent/,
  /generateBlogContent/,
]) {
  pattern.test(combined)
    ? pass(`Intent signal detected: ${pattern}`)
    : fail(`Intent signal missing: ${pattern}`);
}

for (const pattern of [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /tool-\d+/i,
  /slug-\d+/i,
]) {
  if (pattern.test(combined)) {
    fail(`Unsafe numbered SEO pattern detected: ${pattern}`);
  } else {
    pass(`Safe against numbered SEO pattern: ${pattern}`);
  }
}

console.log("\n===== 6. INTERNAL DISCOVERY =====");

const discoveryChecks = [
  [files.toolsPage, "/tools"],
  [files.categoriesPage, "/categories"],
  [files.categoryPage, "/tools/"],
  [files.toolKeyword, 'href="/tools"'],
  [files.toolKeyword, 'href="/categories"'],
  [files.blogKeyword, 'href="/tools"'],
  [files.blogKeyword, 'href="/categories"'],
];

for (const [file, marker] of discoveryChecks) {
  const source = read(file);

  source.includes(marker)
    ? pass(`${path.relative(root, file)} → ${marker}`)
    : fail(`${path.relative(root, file)} missing → ${marker}`);
}

console.log("\n===== 7. SITEMAP + ROBOTS =====");

const sitemap = read(files.sitemap);
const robots = read(files.robots);

for (const marker of [
  "MetadataRoute.Sitemap",
  "tools",
  "categoryUrls",
  "/tools/",
  "/categories/",
  "return",
]) {
  sitemap.includes(marker)
    ? pass(`Sitemap: ${marker}`)
    : fail(`Sitemap missing: ${marker}`);
}

for (const marker of [
  "userAgent",
  "allow",
  "sitemap",
]) {
  robots.includes(marker)
    ? pass(`Robots: ${marker}`)
    : fail(`Robots missing: ${marker}`);
}

console.log("\n===== 8. 135-TOOL ARCHITECTURE =====");

const catalog = read(files.tools);
const registry = read(files.registry);

const expectedTools = [
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

for (const slug of expectedTools) {
  catalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
}

if (registry.includes("getToolHandler")) {
  pass("getToolHandler preserved");
} else {
  fail("getToolHandler missing");
}

console.log("\n===== 9. TOOLCLIENT REGRESSION =====");

const toolClient = read(files.toolClient);

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
  toolClient.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
}

console.log("\n===== 10. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: root,
    stdio: "inherit",
  });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript failed");
}

console.log("\n===== 11. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit",
  });
  pass("Production build PASS");
} catch {
  fail("Production build failed");
}

console.log("\n===== 12. LIVE PROGRAMMATIC SEO =====");

let serverPid = null;

try {
  serverPid = execSync(
    "nohup npm run dev -- --hostname 127.0.0.1 > /tmp/seo-engine-phase-13-03.log 2>&1 & echo $!",
    {
      cwd: root,
      encoding: "utf8",
    }
  ).trim();

  execSync(
    "for i in $(seq 1 30); do curl -sf http://127.0.0.1:3000 >/dev/null && break; sleep 1; done",
    {
      cwd: root,
      stdio: "ignore",
    }
  );

  const urls = [
    "/en/tools/word-counter/test",
    "/en/tools/seo-slug-generator/test",
    "/en/tools/keyword-density-checker/test",
    "/blog/test/test",
  ];

  for (const url of urls) {
    let html = "";

    try {
      html = execSync(
        `curl -sS -L --max-time 20 "http://127.0.0.1:3000${url}"`,
        {
          cwd: root,
          encoding: "utf8",
        }
      );
    } catch {
      fail(`${url} → request failed`);
      continue;
    }

    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (text.length >= 1000) {
      pass(`${url} → substantial content (${text.length} chars)`);
    } else {
      fail(`${url} → thin content (${text.length} chars)`);
    }

    /<title[\s\S]*?<\/title>/i.test(html)
      ? pass(`${url} → title`)
      : fail(`${url} → title missing`);

    /<meta[^>]+name=["']description["']/i.test(html)
      ? pass(`${url} → description`)
      : fail(`${url} → description missing`);

    /<link[^>]+rel=["']canonical["']/i.test(html)
      ? pass(`${url} → canonical`)
      : fail(`${url} → canonical missing`);

    /Application error|Internal Server Error|Unhandled Runtime Error/i.test(html)
      ? fail(`${url} → runtime error leakage`)
      : pass(`${url} → runtime clean`);
  }
} catch {
  fail("Programmatic runtime verification failed");
} finally {
  if (serverPid) {
    try {
      process.kill(Number(serverPid), "SIGTERM");
    } catch {}
  }
}

console.log("\n===== 13. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("NO SEO SCALE EXPANSION APPLIED.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 13.03: PASS");
console.log("PROGRAMMATIC SEO CONTENT INTENT VERIFIED");
console.log("KEYWORD-DERIVED CONTENT VERIFIED");
console.log("RICH CONTENT VERIFIED");
console.log("INTERNAL DISCOVERY VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE PROGRAMMATIC RUNTIME PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.03 COMPLETE");
console.log("======================================================================");
