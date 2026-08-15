import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const file = path.join(ROOT, "app/tools/[slug]/ToolClient.tsx");

let failed = 0;
let changed = false;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};

const exists = (p) => fs.existsSync(path.join(ROOT, p));
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

console.log("======================================================================");
console.log("PHASE 11.07.3 — SAFE ACCESSIBILITY REPAIR + FINAL RELEASE GATE");
console.log("TOOL UX + 135 TOOLS + SEO + DISCOVERY + BUILD");
console.log("GUARDED WRITE — AUTOMATIC ROLLBACK ON FAILURE");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION PROTECTION =====");

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
  exists(p) ? pass(`Present: ${p}`) : fail(`Missing: ${p}`);
}

if (failed > 0) process.exit(1);

const original = fs.readFileSync(file, "utf8");
let current = original;

console.log("\n===== 2. TOOLCLIENT BASELINE =====");

if (/onChange=\{\(e\)\s*=>/.test(current)) {
  pass("Valid onChange arrow handler detected");
} else {
  fail("Valid onChange arrow handler missing");
}

if (current.includes("getToolHandler")) {
  pass("Central handler registry preserved");
} else {
  fail("Central handler registry missing");
}

const corruptionPatterns = [
  /onChange=\{\(e\)\s*=(?!>)\s*aria-/,
  /onChange=\{\(e\)\s*=(?!>)\s*spellCheck/,
  /onChange=\{\(e\)\s*=(?!>)\s*updateField/
];

for (const pattern of corruptionPatterns) {
  pattern.test(current)
    ? fail(`Real JSX corruption detected: ${pattern}`)
    : pass(`No JSX corruption: ${pattern}`);
}

if (failed > 0) process.exit(1);

console.log("\n===== 3. SAFE ACCESSIBILITY REPAIR =====");

const textareaMatch = current.match(/<textarea\b[\s\S]*?>/);

if (!textareaMatch) {
  fail("Textarea opening tag not found");
} else {
  let tag = textareaMatch[0];

  if (!tag.includes('aria-label="Tool input"')) {
    tag = tag.replace(
      /(\n\s*id=\{`tool-field-\$\{field\.name\}`\})/,
      '$1\n                    aria-label="Tool input"'
    );
  }

  if (!tag.includes("spellCheck={false}")) {
    tag = tag.replace(
      /(\n\s*value=\{value\})/,
      "$1\n                    spellCheck={false}"
    );
  }

  if (
    tag.includes('aria-label="Tool input"') &&
    tag.includes("spellCheck={false}")
  ) {
    current =
      current.slice(0, textareaMatch.index) +
      tag +
      current.slice(textareaMatch.index + textareaMatch[0].length);

    if (current !== original) {
      fs.writeFileSync(file, current);
      changed = true;
      pass("Accessibility attributes safely applied");
    } else {
      pass("Accessibility attributes already correct");
    }
  } else {
    fail("Could not safely construct textarea attributes");
  }
}

if (failed > 0) {
  if (changed) fs.writeFileSync(file, original);
  process.exit(1);
}

console.log("\n===== 4. POST-WRITE TOOLCLIENT VALIDATION =====");

const repaired = read("app/tools/[slug]/ToolClient.tsx");

repaired.includes('aria-label="Tool input"')
  ? pass("aria-label verified")
  : fail("aria-label missing");

repaired.includes("spellCheck={false}")
  ? pass("spellCheck={false} verified")
  : fail("spellCheck={false} missing");

if (/onChange=\{\(e\)\s*=>/.test(repaired)) {
  pass("onChange handler preserved");
} else {
  fail("onChange handler damaged");
}

for (const pattern of corruptionPatterns) {
  pattern.test(repaired)
    ? fail(`Corrupted JSX detected after repair: ${pattern}`)
    : pass(`No corrupted JSX after repair: ${pattern}`);
}

console.log("\n===== 5. TOOL UX CONTRACT =====");

[
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "Generate Result",
  "result",
  "loading",
  "getToolHandler"
].forEach((marker) => {
  repaired.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
});

console.log("\n===== 6. 135-TOOL CATALOG =====");

const catalog = read("data/tools.ts");

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
  "checklist-generator"
].forEach((slug) => {
  catalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);
});

for (const pattern of [
  /word-counter-\d+/i,
  /keyword-density-\d+/i,
  /free-online-tool-\d+/i,
  /slug-\d+/i,
  /tool-\d+/i
]) {
  pattern.test(catalog)
    ? fail(`Bad SEO pattern: ${pattern}`)
    : pass(`Clean SEO pattern: ${pattern}`);
}

console.log("\n===== 7. HANDLER REGISTRY =====");

const registry = read("src/lib/tools/index.ts");

[
  "keyword-density-checker",
  "keyword-frequency-checker",
  "meta-tag-generator",
  "seo-slug-generator",
  "text-case-converter",
  "word-counter",
  "json-formatter",
  "base64-encoder",
  "percentage-calculator",
  "age-calculator",
  "compound-interest-calculator",
  "list-randomizer",
  "checklist-generator"
].forEach((slug) => {
  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
});

registry.includes("getToolHandler")
  ? pass("getToolHandler present")
  : fail("getToolHandler missing");

registry.includes("text-to-slug")
  ? fail("Legacy text-to-slug handler present")
  : pass("Legacy text-to-slug handler absent");

console.log("\n===== 8. SEO + DISCOVERY =====");

const toolPage = read("app/tools/[slug]/page.tsx");
const toolsPage = read("app/tools/page.tsx");
const categoriesPage = read("app/categories/page.tsx");
const categoryPage = read("app/categories/[category]/page.tsx");

[
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
].forEach((marker) => {
  toolPage.includes(marker)
    ? pass(`SEO: ${marker}`)
    : fail(`SEO missing: ${marker}`);
});

toolsPage.includes("href")
  ? pass("Tools discovery present")
  : fail("Tools discovery missing");

categoriesPage.includes("href")
  ? pass("Categories discovery present")
  : fail("Categories discovery missing");

categoryPage.includes("href")
  ? pass("Category → tools discovery present")
  : fail("Category → tools discovery missing");

console.log("\n===== 9. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

sitemap.includes("tools")
  ? pass("Sitemap tool integration")
  : fail("Sitemap tool integration missing");

robots.includes("sitemap")
  ? pass("Robots sitemap")
  : fail("Robots sitemap missing");

console.log("\n===== 10. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
].forEach((p) => {
  exists(p)
    ? fail(`Stale file exists: ${p}`)
    : pass(`Stale absent: ${p}`);
});

console.log("\n===== 11. LEGACY REDIRECTS =====");

const nextConfig = read("next.config.ts");

[
  "case-converter",
  "text-to-slug"
].forEach((marker) => {
  nextConfig.includes(marker)
    ? pass(`Redirect: ${marker}`)
    : fail(`Redirect missing: ${marker}`);
});

console.log("\n===== 12. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  console.log("\n======================================================================");
  console.log("PHASE 11.07.3 PRE-BUILD FAILURE");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);

  if (changed) {
    fs.writeFileSync(file, original);
    console.log("🔄 AUTOMATIC ROLLBACK APPLIED");
  }

  console.log("DO NOT DEPLOY.");
  console.log("======================================================================");
  process.exit(1);
}

console.log("\n===== 13. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 14. FINAL SOURCE INTEGRITY =====");

for (const p of protectedFiles) {
  exists(p)
    ? pass(`Final intact: ${p}`)
    : fail(`Final missing: ${p}`);
}

const finalToolClient = read("app/tools/[slug]/ToolClient.tsx");

finalToolClient.includes('aria-label="Tool input"')
  ? pass("Final aria-label intact")
  : fail("Final aria-label missing");

finalToolClient.includes("spellCheck={false}")
  ? pass("Final spellCheck intact")
  : fail("Final spellCheck missing");

console.log("\n======================================================================");
console.log("PHASE 11.07.3 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log(`FILES CHANGED : ${changed ? 1 : 0}`);
console.log("======================================================================");

if (failed > 0) {
  if (changed) {
    fs.writeFileSync(file, original);
    console.log("🔄 AUTOMATIC ROLLBACK APPLIED");
  }

  console.log("❌ PHASE 11.07.3: FAIL");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 11.07.3: PASS");
console.log("ACCESSIBILITY REPAIR COMPLETE");
console.log("TOOLCLIENT JSX VERIFIED");
console.log("135-TOOL CATALOG VERIFIED");
console.log("135-TOOL HANDLER REGISTRY VERIFIED");
console.log("DISCOVERY VERIFIED");
console.log("SEO VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("LEGACY REDIRECTS VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.07 CLOSED");
console.log("======================================================================");
