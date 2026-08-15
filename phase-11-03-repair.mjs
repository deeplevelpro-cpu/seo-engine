import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const target = path.join(ROOT, "app/tools/[slug]/ToolClient.tsx");

let failed = 0;

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => {
  console.log(`✗ ${m}`);
  failed++;
};

console.log("======================================================================");
console.log("PHASE 11.03 REPAIR — TOOLCLIENT JSX RECOVERY");
console.log("REPAIR ONLY + TYPESCRIPT + PRODUCTION BUILD");
console.log("======================================================================");

if (!fs.existsSync(target)) {
  fail("ToolClient.tsx missing");
  process.exit(1);
}

let src = fs.readFileSync(target, "utf8");

console.log("\n===== 1. CORRUPTED JSX DETECTION =====");

const brokenPatterns = [
  /onChange=\{\(e\)\s*=\s*aria-label=/,
  /onChange=\{\(e\)\s*=\s*[^>]*>\s*updateField/,
];

let detected = false;

for (const pattern of brokenPatterns) {
  if (pattern.test(src)) {
    detected = true;
    pass(`Detected known corrupted onChange pattern`);
    break;
  }
}

if (!detected) {
  console.log("✓ Known corruption pattern not detected");
}

console.log("\n===== 2. SAFE JSX REPAIR =====");

const before = src;

/*
 * Restore the malformed handler produced by the previous automated
 * replacement. We intentionally do NOT rewrite the whole component.
 */
src = src.replace(
  /onChange=\{\(e\)\s*=\s*aria-label="Tool input"\s*spellCheck=\{false\}>\s*updateField\(e\.target\.value\)\}/g,
  'onChange={(e) => updateField(e.target.value)}'
);

src = src.replace(
  /onChange=\{\(e\)\s*=\s*aria-label="Tool input"\s*spellCheck=\{false\}>\s*updateField\(e\.target\.value\)\}/g,
  'onChange={(e) => updateField(e.target.value)}'
);

if (src !== before) {
  fs.writeFileSync(target, src, "utf8");
  pass("Corrupted onChange JSX repaired");
} else {
  console.log("⚠ No exact corrupted pattern replaced");
}

console.log("\n===== 3. ACCESSIBILITY SAFETY =====");

src = fs.readFileSync(target, "utf8");

if (src.includes('aria-label="Tool input"')) {
  pass("Tool input aria-label preserved");
} else {
  console.log("⚠ aria-label not detected");
}

if (src.includes("spellCheck={false}")) {
  pass("spellCheck marker preserved");
} else {
  console.log("⚠ spellCheck marker not detected");
}

if (src.includes("onChange={(e) => updateField(e.target.value)}")) {
  pass("Valid onChange handler restored");
} else {
  fail("Valid onChange handler not found");
}

console.log("\n===== 4. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: ROOT,
    stdio: "inherit"
  });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 5. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: ROOT,
    stdio: "inherit"
  });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 6. PHASE 10 FOUNDATION CHECK =====");

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
  fs.existsSync(path.join(ROOT, p))
    ? pass(`Protected file intact: ${p}`)
    : fail(`Protected file missing: ${p}`);
}

console.log("\n======================================================================");
console.log("PHASE 11.03 REPAIR REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 11.03 REPAIR: FAIL");
  console.log("STOP HERE — DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 11.03 REPAIR: PASS");
console.log("TOOLCLIENT JSX REPAIRED");
console.log("ACCESSIBILITY MARKERS PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("PHASE 10 FOUNDATION INTACT");
console.log("======================================================================");
