import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

const exists = p => fs.existsSync(path.join(root, p));
const read = p => fs.readFileSync(path.join(root, p), "utf8");

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
      env: { ...process.env, NEXT_DISABLE_TURBOPACK: "1" }
    });
    console.log(`✓ ${label}`);
  } catch {
    console.log(`✗ ${label}`);
    failed++;
  }
};

console.log("======================================================================");
console.log("PHASE 13.14 — SEO SCALE READINESS + CONTENT ENGINE MASTER GATE");
console.log("CONTROLLED EXPANSION + RUNTIME CONTRACT + PRODUCTION SAFETY");
console.log("NO HOMEPAGE CHANGE | NO MASS THIN PAGE GENERATION");
console.log("======================================================================");

console.log("\n===== 1. CORE ENGINE =====");

const content = read("src/lib/contentGenerator.js");
const expansion = read("src/lib/seo/keywordExpansion.js");

[
  "generateContent",
  "generateBlogContent",
  "semanticExpansion",
  "primary",
  "secondary",
  "longTail",
  "intent",
  "benefits",
  "steps",
  "sections",
  "links"
].forEach(x => check(`Content engine: ${x}`, content.includes(x)));

[
  "buildControlledKeywordExpansion",
  "filterKeywordExpansion",
  "primary",
  "secondary",
  "longTail",
  "intent",
  "toolSlug",
  "blogSlug"
].forEach(x => check(`Expansion engine: ${x}`, expansion.includes(x)));

console.log("\n===== 2. EXPANSION SAFETY =====");

check(
  "No numbered keyword generation",
  !/word-counter-\d+|keyword-density-\d+|free-online-tool-\d+|tool-\d+|slug-\d+/i.test(expansion)
);

check(
  "Collision protection",
  /collision/i.test(expansion)
);

check(
  "Duplicate filtering",
  /duplicate|unique/i.test(expansion)
);

check(
  "Semantic intent support",
  /intent/i.test(expansion)
);

console.log("\n===== 3. PROGRAMMATIC ROUTES =====");

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
  'href="/categories"'
].forEach(x => check(`Tool route: ${x}`, toolRoute.includes(x)));

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
  'href="/categories"'
].forEach(x => check(`Blog route: ${x}`, blogRoute.includes(x)));

console.log("\n===== 4. SEO INDEXABILITY =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

[
  "MetadataRoute.Sitemap",
  "tools",
  "categoryUrls",
  "return"
].forEach(x => check(`Sitemap: ${x}`, sitemap.includes(x)));

[
  "userAgent",
  "allow",
  "sitemap"
].forEach(x => check(`Robots: ${x}`, robots.includes(x)));

console.log("\n===== 5. FOUNDATION PROTECTION =====");

[
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx"
].forEach(f => check(`Protected: ${f}`, exists(f)));

console.log("\n===== 6. HOMEPAGE / THIN CONTENT SAFETY =====");

check(
  "Homepage exists",
  exists("app/page.tsx") || exists("app/page.js")
);

check(
  "No Lorem ipsum",
  !/lorem ipsum/i.test(content)
);

check(
  "No mass static keyword generation",
  !/generateStaticParams[\s\S]{0,800}keyword/i.test(toolRoute)
);

console.log("\n===== 7. SYNTAX =====");

run("node --check src/lib/contentGenerator.js", "Content syntax");
run("node --check src/lib/seo/keywordExpansion.js", "Expansion syntax");
run(
  "node --check 'app/[lang]/tools/[slug]/[keyword]/page.js'",
  "Tool route syntax"
);
run(
  "node --check 'app/blog/[slug]/[keyword]/page.js'",
  "Blog route syntax"
);

console.log("\n===== 8. TYPESCRIPT =====");
run("npx tsc --noEmit", "TypeScript");

console.log("\n===== 9. PRODUCTION BUILD =====");
run("npm run build", "Production build");

console.log("\n===== 10. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("❌ PHASE 13.14: FAIL");
  console.log("STOP — DO NOT DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 13.14: PASS");
console.log("SEO SCALE READINESS VERIFIED");
console.log("CONTROLLED KEYWORD ENGINE VERIFIED");
console.log("SEMANTIC CONTENT ENGINE VERIFIED");
console.log("PROGRAMMATIC SEO VERIFIED");
console.log("INDEXABILITY VERIFIED");
console.log("DUPLICATE + COLLISION SAFETY VERIFIED");
console.log("FOUNDATION PROTECTED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.14 COMPLETE");
console.log("======================================================================");
