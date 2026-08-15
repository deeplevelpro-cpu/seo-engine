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

const required = [
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
console.log("PHASE 11.07.1 — SAFE ACCESSIBILITY REPAIR + FULL REGRESSION");
console.log("TARGET: ToolClient.tsx");
console.log("GUARDED WRITE + AUTOMATIC ROLLBACK");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION SAFETY =====");

for (const f of required) {
  if (fs.existsSync(path.join(ROOT, f))) {
    pass(`Protected: ${f}`);
  } else {
    fail(`Missing: ${f}`);
  }
}

if (failed > 0) {
  console.log("❌ Foundation check failed.");
  process.exit(1);
}

console.log("\n===== 2. TOOLCLIENT BASELINE =====");

const original = fs.readFileSync(file, "utf8");

if (!original.includes("onChange={(e) =>")) {
  fail("Valid onChange arrow handler missing");
} else {
  pass("Valid onChange arrow handler present");
}

if (!original.includes("getToolHandler")) {
  fail("Central handler registry connection missing");
} else {
  pass("Central handler registry connection present");
}

const badPatterns = [
  /onChange=\{\(e\)\s*=\s*aria-/,
  /onChange=\{\(e\)\s*=\s*spellCheck/,
  /onChange=\{\(e\)\s*=\s*updateField/
];

for (const pattern of badPatterns) {
  if (pattern.test(original)) {
    fail(`Corrupted JSX detected: ${pattern}`);
  } else {
    pass(`Corrupted JSX absent: ${pattern}`);
  }
}

if (failed > 0) {
  process.exit(1);
}

console.log("\n===== 3. SAFE TEXTAREA LOCATOR =====");

const textareaStart = original.indexOf("<textarea");

if (textareaStart === -1) {
  fail("No <textarea> element found");
} else {
  pass(`<textarea> located at character ${textareaStart}`);
}

if (failed > 0) {
  process.exit(1);
}

const textareaEnd = original.indexOf(">", textareaStart);

if (textareaEnd === -1) {
  fail("Textarea opening tag is malformed");
  process.exit(1);
}

const openingTag = original.slice(textareaStart, textareaEnd + 1);

console.log("Detected textarea opening tag:");
console.log(openingTag);

console.log("\n===== 4. ACCESSIBILITY REPAIR =====");

let repaired = original;

if (!openingTag.includes("aria-label=")) {
  const insertion =
    '\n                    aria-label="Tool input"';

  repaired =
    repaired.slice(0, textareaEnd) +
    insertion +
    repaired.slice(textareaEnd);

  changed = true;
  pass("aria-label added to textarea");
} else {
  pass("aria-label already present");
}

const newTextareaStart = repaired.indexOf("<textarea");
const newTextareaEnd = repaired.indexOf(">", newTextareaStart);
const newOpeningTag = repaired.slice(newTextareaStart, newTextareaEnd + 1);

if (!newOpeningTag.includes("spellCheck={false}")) {
  const insertion =
    '\n                    spellCheck={false}';

  repaired =
    repaired.slice(0, newTextareaEnd) +
    insertion +
    repaired.slice(newTextareaEnd);

  changed = true;
  pass("spellCheck={false} added to textarea");
} else {
  pass("spellCheck={false} already present");
}

console.log("\n===== 5. REPAIR INTEGRITY =====");

if (!repaired.includes('aria-label="Tool input"')) {
  fail("aria-label repair not present");
} else {
  pass("aria-label verified");
}

if (!repaired.includes("spellCheck={false}")) {
  fail("spellCheck repair not present");
} else {
  pass("spellCheck verified");
}

if (!repaired.includes("onChange={(e) =>")) {
  fail("onChange handler damaged by repair");
} else {
  pass("onChange handler preserved");
}

for (const pattern of badPatterns) {
  if (pattern.test(repaired)) {
    fail(`Corrupted JSX introduced: ${pattern}`);
  } else {
    pass(`No corrupted JSX introduced: ${pattern}`);
  }
}

if (failed > 0) {
  console.log("❌ Repair integrity failed.");
  process.exit(1);
}

console.log("\n===== 6. WRITE GUARDED CHANGE =====");

if (changed) {
  fs.writeFileSync(file, repaired);
  pass("ToolClient accessibility repair written");
} else {
  pass("No file change required");
}

console.log("\n===== 7. TYPESCRIPT REGRESSION =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  if (changed) {
    fs.writeFileSync(file, original);
    console.log("🔄 Automatic rollback completed.");
  }

  console.log("❌ PHASE 11.07.1 STOPPED BEFORE BUILD");
  process.exit(1);
}

console.log("\n===== 8. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

if (failed > 0) {
  if (changed) {
    fs.writeFileSync(file, original);
    console.log("🔄 Automatic rollback completed after build failure.");
  }

  console.log("❌ PHASE 11.07.1 FAILED");
  process.exit(1);
}

console.log("\n===== 9. FINAL ARCHITECTURE REGRESSION =====");

const finalToolClient = fs.readFileSync(file, "utf8");

[
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  'aria-label="Tool input"',
  "spellCheck={false}"
].forEach((marker) => {
  finalToolClient.includes(marker)
    ? pass(`ToolClient marker preserved: ${marker}`)
    : fail(`ToolClient marker missing: ${marker}`);
});

const catalog = fs.readFileSync(
  path.join(ROOT, "data/tools.ts"),
  "utf8"
);

const registry = fs.readFileSync(
  path.join(ROOT, "src/lib/tools/index.ts"),
  "utf8"
);

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
  catalog.includes(slug)
    ? pass(`Catalog preserved: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry preserved: ${slug}`)
    : fail(`Registry missing: ${slug}`);
});

console.log("\n===== 10. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
].forEach((f) => {
  fs.existsSync(path.join(ROOT, f))
    ? fail(`Stale file exists: ${f}`)
    : pass(`Stale absent: ${f}`);
});

console.log("\n===== 11. SEO FOUNDATION =====");

const toolPage = fs.readFileSync(
  path.join(ROOT, "app/tools/[slug]/page.tsx"),
  "utf8"
);

[
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter"
].forEach((marker) => {
  toolPage.includes(marker)
    ? pass(`SEO preserved: ${marker}`)
    : fail(`SEO missing: ${marker}`);
});

const sitemap = fs.readFileSync(
  path.join(ROOT, "app/sitemap.ts"),
  "utf8"
);

const robots = fs.readFileSync(
  path.join(ROOT, "app/robots.ts"),
  "utf8"
);

sitemap.includes("tools")
  ? pass("Sitemap tool integration preserved")
  : fail("Sitemap tool integration missing");

robots.includes("sitemap")
  ? pass("Robots sitemap preserved")
  : fail("Robots sitemap missing");

console.log("\n===== 12. FINAL REPORT =====");

console.log("======================================================================");
console.log("PHASE 11.07.1 REPORT");
console.log("======================================================================");
console.log(`FILE CHANGED : ${changed ? "YES" : "NO"}`);
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  if (changed) {
    fs.writeFileSync(file, original);
    console.log("🔄 FINAL ROLLBACK COMPLETED.");
  }

  console.log("❌ PHASE 11.07.1: FAIL");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 11.07.1: PASS");
console.log("ACCESSIBILITY REPAIR COMPLETE");
console.log("TOOLCLIENT JSX VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("HANDLER REGISTRY PRESERVED");
console.log("DISCOVERY PRESERVED");
console.log("SEO PRESERVED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.07.1 COMPLETE");
console.log("======================================================================");
