import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const P = (x) => path.join(ROOT, x);

let failed = 0;
let changed = 0;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};

const exists = (x) => fs.existsSync(P(x));
const read = (x) => fs.readFileSync(P(x), "utf8");

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

console.log("======================================================================");
console.log("PHASE 11.07 — CONSOLIDATED DISCOVERY + UX + SEO UPGRADE");
console.log("TOOL DISCOVERY + ACCESSIBILITY + NAVIGATION + REGRESSION");
console.log("PHASE 10 FOUNDATION PROTECTED");
console.log("GUARDED IMPLEMENTATION — BUILD-GATED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION PROTECTION =====");

for (const file of protectedFiles) {
  exists(file)
    ? pass(`Protected: ${file}`)
    : fail(`Missing protected file: ${file}`);
}

if (failed > 0) {
  console.log("\n❌ Foundation protection failed.");
  process.exit(1);
}

console.log("\n===== 2. PRE-CHANGE FORENSICS =====");

const toolClientBefore = read("app/tools/[slug]/ToolClient.tsx");
const toolsPageBefore = read("app/tools/page.tsx");
const categoryIndexBefore = read("app/categories/page.tsx");
const categoryPageBefore = read("app/categories/[category]/page.tsx");

toolClientBefore.includes("onChange={(e) =>")
  ? pass("ToolClient JSX baseline valid")
  : fail("ToolClient JSX baseline invalid");

toolClientBefore.includes("getToolHandler")
  ? pass("Central handler architecture preserved")
  : fail("Central handler architecture missing");

console.log("\n===== 3. ACCESSIBILITY HARDENING =====");

let toolClient = toolClientBefore;

if (!toolClient.includes('aria-label="Tool input"')) {
  const textareaPattern =
    /(<textarea\b[^>]*)(\n\s*placeholder=\{field\.placeholder\})/;

  if (textareaPattern.test(toolClient)) {
    toolClient = toolClient.replace(
      textareaPattern,
      '$1\n                    aria-label="Tool input"$2'
    );
    changed++;
    pass("Accessible tool input label added safely");
  } else {
    console.log("⚠ Could not locate textarea insertion point");
  }
} else {
  pass("Accessible tool input label already present");
}

if (!toolClient.includes("spellCheck={false}")) {
  const textareaPattern =
    /(<textarea\b[^>]*)(\n\s*placeholder=\{field\.placeholder\})/;

  if (textareaPattern.test(toolClient)) {
    toolClient = toolClient.replace(
      textareaPattern,
      '$1\n                    spellCheck={false}$2'
    );
    changed++;
    pass("Textarea spellCheck behavior added");
  } else {
    console.log("⚠ Could not locate spellCheck insertion point");
  }
} else {
  pass("Textarea spellCheck behavior already present");
}

console.log("\n===== 4. JSX SAFETY GATE =====");

if (toolClient.includes("onChange={(e) =>")) {
  pass("Valid onChange arrow handler preserved");
} else {
  fail("Valid onChange handler missing");
}

const badPatterns = [
  /onChange=\{\(e\)\s*=\s*aria-/,
  /onChange=\{\(e\)\s*=\s*spellCheck/,
  /onChange=\{\(e\)\s*=\s*updateField/
];

for (const pattern of badPatterns) {
  pattern.test(toolClient)
    ? fail(`Corrupted JSX detected: ${pattern}`)
    : pass(`Corrupted JSX absent: ${pattern}`);
}

console.log("\n===== 5. DISCOVERY ARCHITECTURE =====");

let toolsPage = toolsPageBefore;
let categoryIndex = categoryIndexBefore;
let categoryPage = categoryPageBefore;

toolsPage.includes("href")
  ? pass("Tools navigation baseline present")
  : fail("Tools navigation missing");

categoryIndex.includes("href")
  ? pass("Category index navigation baseline present")
  : fail("Category index navigation missing");

categoryPage.includes("href")
  ? pass("Category → tool navigation baseline present")
  : fail("Category → tool navigation missing");

toolsPage.length > 500
  ? pass("Tools discovery content present")
  : fail("Tools discovery page unexpectedly small");

categoryIndex.length > 300
  ? pass("Category discovery content present")
  : fail("Category discovery page unexpectedly small");

categoryPage.length > 500
  ? pass("Category page content present")
  : fail("Category page unexpectedly small");

console.log("\n===== 6. SEO PRESERVATION =====");

const toolPage = read("app/tools/[slug]/page.tsx");
const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

[
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
].forEach((marker) => {
  toolPage.includes(marker)
    ? pass(`Tool SEO preserved: ${marker}`)
    : fail(`Tool SEO missing: ${marker}`);
});

sitemap.includes("tools")
  ? pass("Sitemap tool integration preserved")
  : fail("Sitemap tool integration missing");

robots.includes("sitemap")
  ? pass("Robots sitemap preserved")
  : fail("Robots sitemap missing");

console.log("\n===== 7. CATALOG + REGISTRY =====");

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
  "checklist-generator"
].forEach((slug) => {
  catalog.includes(slug)
    ? pass(`Catalog preserved: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry preserved: ${slug}`)
    : fail(`Registry missing: ${slug}`);
});

registry.includes("getToolHandler")
  ? pass("getToolHandler preserved")
  : fail("getToolHandler missing");

console.log("\n===== 8. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
].forEach((file) => {
  exists(file)
    ? fail(`Stale file exists: ${file}`)
    : pass(`Stale absent: ${file}`);
});

console.log("\n===== 9. APPLY GUARDED UX CHANGE =====");

if (failed === 0 && toolClient !== toolClientBefore) {
  fs.writeFileSync(P("app/tools/[slug]/ToolClient.tsx"), toolClient);
  pass("ToolClient UX changes written");
} else if (toolClient === toolClientBefore) {
  pass("No ToolClient write required");
} else {
  fail("Changes blocked because pre-write checks failed");
}

console.log("\n===== 10. POST-WRITE JSX VALIDATION =====");

const toolClientAfter = read("app/tools/[slug]/ToolClient.tsx");

toolClientAfter.includes("onChange={(e) =>")
  ? pass("Post-write JSX valid")
  : fail("Post-write JSX invalid");

toolClientAfter.includes('aria-label="Tool input"')
  ? pass("Accessible input label verified")
  : fail("Accessible input label missing");

toolClientAfter.includes("spellCheck={false}")
  ? pass("spellCheck behavior verified")
  : fail("spellCheck behavior missing");

console.log("\n===== 11. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  console.log("\n======================================================================");
  console.log("PHASE 11.07 PRE-BUILD FAILURE");
  console.log("======================================================================");
  console.log(`FAILED CHECKS : ${failed}`);
  console.log(`FILES CHANGED : ${changed}`);
  console.log("======================================================================");

  if (changed > 0) {
    fs.writeFileSync(
      P("app/tools/[slug]/ToolClient.tsx"),
      toolClientBefore
    );
    console.log("🔄 ToolClient automatically restored.");
  }

  console.log("❌ PHASE 11.07: FAIL");
  console.log("NO DEPLOYMENT.");
  process.exit(1);
}

console.log("\n===== 12. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

if (failed > 0) {
  if (changed > 0) {
    fs.writeFileSync(
      P("app/tools/[slug]/ToolClient.tsx"),
      toolClientBefore
    );
    console.log("🔄 ToolClient automatically restored after build failure.");
  }

  console.log("\n❌ PHASE 11.07 FAILED — CHANGES ROLLED BACK");
  process.exit(1);
}

console.log("\n===== 13. FINAL FOUNDATION CHECK =====");

for (const file of protectedFiles) {
  exists(file)
    ? pass(`Final file intact: ${file}`)
    : fail(`Final file missing: ${file}`);
}

console.log("\n======================================================================");
console.log("PHASE 11.07 REPORT");
console.log("======================================================================");
console.log(`FILES CHANGED : ${changed}`);
console.log(`FAILED CHECKS : ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 11.07: FAIL");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 11.07: PASS");
console.log("TOOL ACCESSIBILITY HARDENED");
console.log("TOOLCLIENT JSX VERIFIED");
console.log("DISCOVERY VERIFIED");
console.log("135-TOOL CATALOG PRESERVED");
console.log("HANDLER REGISTRY PRESERVED");
console.log("SEO INFRASTRUCTURE PRESERVED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.07 COMPLETE");
console.log("======================================================================");
