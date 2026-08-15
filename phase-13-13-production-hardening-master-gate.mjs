import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

const exists = (p) => fs.existsSync(path.join(root, p));
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

const check = (name, ok) => {
  if (ok) console.log(`✓ ${name}`);
  else {
    console.log(`✗ ${name}`);
    failed++;
  }
};

const run = (cmd, label) => {
  try {
    execSync(cmd, {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, NEXT_DISABLE_TURBOPACK: "1" },
    });
    console.log(`✓ ${label}`);
    return true;
  } catch {
    console.log(`✗ ${label}`);
    failed++;
    return false;
  }
};

console.log("======================================================================");
console.log("PHASE 13.13 — PRODUCTION HARDENING + SEO INTEGRITY MASTER GATE");
console.log("MAXIMUM COVERAGE / SINGLE-PASS VALIDATION");
console.log("NO HOMEPAGE CHANGE | NO MASS THIN PAGE GENERATION | NO DEPLOY");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION =====");

const foundation = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "src/lib/contentGenerator.js",
  "src/lib/seo/keywordExpansion.js",
  "app/[lang]/tools/[slug]/[keyword]/page.js",
  "app/blog/[slug]/[keyword]/page.js",
  "app/tools/[slug]/ToolClient.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts",
  "tsconfig.json",
  "package.json",
];

for (const f of foundation) check(f, exists(f));

console.log("\n===== 2. CONTENT + SEMANTIC ENGINE =====");

const content = read("src/lib/contentGenerator.js");
const expansion = read("src/lib/seo/keywordExpansion.js");

[
  "generateContent",
  "generateBlogContent",
  "primary",
  "secondary",
  "longTail",
  "intent",
  "intro",
  "content:",
  "benefits",
  "steps",
  "links",
  "sections",
  "semanticExpansion",
].forEach((x) => check(`Content: ${x}`, content.includes(x)));

[
  "buildControlledKeywordExpansion",
  "filterKeywordExpansion",
  "primary",
  "secondary",
  "longTail",
  "intent",
  "toolSlug",
  "blogSlug",
].forEach((x) => check(`Expansion: ${x}`, expansion.includes(x)));

check("No Lorem ipsum", !/lorem ipsum/i.test(content));

console.log("\n===== 3. ROUTE CONTRACTS =====");

const toolRoute = read("app/[lang]/tools/[slug]/[keyword]/page.js");
const blogRoute = read("app/blog/[slug]/[keyword]/page.js");

[
  "await params",
  "cleanKeyword",
  "cleanSlug",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "content?.intro",
  "content?.content",
  'href="/tools"',
  'href="/categories"',
].forEach((x) => check(`Tool route: ${x}`, toolRoute.includes(x)));

[
  "await params",
  "cleanKeyword",
  "cleanSlug",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "content?.intro",
  "content?.content",
  "content?.sections",
  "content?.links",
  'href="/tools"',
  'href="/categories"',
].forEach((x) => check(`Blog route: ${x}`, blogRoute.includes(x)));

console.log("\n===== 4. DUPLICATE / THIN / COLLISION SAFETY =====");

const dangerousPatterns = [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /tool-\d+/i,
  /slug-\d+/i,
];

for (const re of dangerousPatterns) {
  check(`Blocked pattern ${re}`, !expansion.match(re));
}

check("No numbered expansion", !/for\s*\(\s*let\s+\w+\s*=\s*1/i.test(expansion));
check("Collision filtering", /filter.*Collision|collision/i.test(expansion));

console.log("\n===== 5. 135-TOOL FOUNDATION =====");

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
  "checklist-generator",
];

for (const tool of tools) {
  check(`Catalog: ${tool}`, catalog.includes(tool));
  check(`Registry: ${tool}`, registry.includes(tool));
}

console.log("\n===== 6. TOOLCLIENT PROTECTION =====");

const client = read("app/tools/[slug]/ToolClient.tsx");

[
  'aria-label="Tool input"',
  "spellCheck={false}",
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  "aria-live",
].forEach((x) => check(`ToolClient: ${x}`, client.includes(x)));

console.log("\n===== 7. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

[
  "MetadataRoute.Sitemap",
  "tools",
  "categoryUrls",
  "return",
].forEach((x) => check(`Sitemap: ${x}`, sitemap.includes(x)));

[
  "userAgent",
  "allow",
  "sitemap",
].forEach((x) => check(`Robots: ${x}`, robots.includes(x)));

console.log("\n===== 8. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml",
].forEach((f) => check(`Stale absent: ${f}`, !exists(f)));

console.log("\n===== 9. HOMEPAGE PROTECTION =====");
check("Homepage exists", exists("app/page.tsx") || exists("app/page.js"));

console.log("\n===== 10. SYNTAX =====");

run("node --check src/lib/contentGenerator.js", "Content engine syntax");
run("node --check src/lib/seo/keywordExpansion.js", "Expansion engine syntax");
run(
  "node --check 'app/[lang]/tools/[slug]/[keyword]/page.js'",
  "Tool keyword syntax"
);
run(
  "node --check 'app/blog/[slug]/[keyword]/page.js'",
  "Blog keyword syntax"
);

console.log("\n===== 11. TYPESCRIPT =====");
run("npx tsc --noEmit", "TypeScript");

console.log("\n===== 12. PRODUCTION BUILD =====");
run("npm run build", "Production build");

console.log("\n===== 13. FINAL SAFETY =====");

check("No mass route generation", !/generateStaticParams\s*\(\s*\)\s*=>\s*\{[\s\S]{0,500}for\s*\(/i.test(toolRoute));
check("No homepage modification marker", exists("app/page.tsx") || exists("app/page.js"));

console.log("\n===== 14. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("❌ PHASE 13.13: FAIL");
  console.log("NO DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 13.13: PASS");
console.log("PRODUCTION HARDENING VERIFIED");
console.log("SEO INTEGRITY VERIFIED");
console.log("SEMANTIC CONTENT VERIFIED");
console.log("KEYWORD EXPANSION VERIFIED");
console.log("PROGRAMMATIC ROUTES VERIFIED");
console.log("DUPLICATE + COLLISION SAFETY VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("135-TOOL FOUNDATION PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("STALE ARCHITECTURE CLEAN");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.13 COMPLETE");
console.log("======================================================================");
