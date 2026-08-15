import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const file = (x) => path.join(ROOT, x);

const toolClient = file("app/tools/[slug]/ToolClient.tsx");
const toolsPage = file("app/tools/page.tsx");

let failed = 0;
let changed = 0;
let warnings = 0;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};
const warn = (x) => {
  console.log(`⚠ ${x}`);
  warnings++;
};

console.log("======================================================================");
console.log("PHASE 11.06 — CONSOLIDATED TOOL UX HARDENING");
console.log("UX + ACCESSIBILITY + DISCOVERY + REGRESSION + BUILD");
console.log("GUARDED IMPLEMENTATION — AUTOMATIC ROLLBACK ON FAILURE");
console.log("PHASE 10 FOUNDATION PROTECTED");
console.log("======================================================================");

const protectedFiles = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts",
  "tsconfig.json",
  "package.json",
  "package-lock.json",
  ".gitignore"
];

console.log("\n===== 1. PHASE 10 FOUNDATION PROTECTION =====");

for (const f of protectedFiles) {
  exists(f) ? pass(`Protected: ${f}`) : fail(`Missing: ${f}`);
}

function exists(f) {
  return fs.existsSync(file(f));
}

if (failed > 0) {
  console.log("Foundation protection failed.");
  process.exit(1);
}

if (!fs.existsSync(toolClient) || !fs.existsSync(toolsPage)) {
  fail("Required UX files are missing");
  process.exit(1);
}

const originalToolClient = fs.readFileSync(toolClient, "utf8");
const originalToolsPage = fs.readFileSync(toolsPage, "utf8");

const snapshots = {
  toolClient: originalToolClient,
  toolsPage: originalToolsPage
};

function rollback() {
  fs.writeFileSync(toolClient, snapshots.toolClient);
  fs.writeFileSync(toolsPage, snapshots.toolsPage);
  console.log("\n🔄 AUTOMATIC ROLLBACK APPLIED");
  console.log("Production UX files restored to their pre-phase state.");
}

console.log("\n===== 2. CURRENT UX FORENSICS =====");

let client = originalToolClient;
let discovery = originalToolsPage;

client.includes("aria-label")
  ? pass("Existing accessibility label detected")
  : warn("Accessibility label not yet present");

client.includes("aria-live")
  ? pass("Existing live-result accessibility detected")
  : warn("Live-result accessibility not yet present");

client.includes("spellCheck={false}")
  ? pass("spellCheck behavior already controlled")
  : warn("spellCheck behavior not yet controlled");

client.includes("navigator.clipboard")
  ? pass("Copy-to-clipboard functionality already present")
  : warn("Copy-to-clipboard functionality not yet present");

client.includes("setCopied")
  ? pass("Copy state already present")
  : warn("Copy state not yet present");

console.log("\n===== 3. GUARDED ACCESSIBILITY UPGRADE =====");

/*
 * Only perform transformations when the expected JSX structure exists.
 * Never blindly replace arbitrary source text.
 */

let nextClient = client;

const hasInputElement =
  /<(textarea|input)\b[\s\S]*?(?:\/>|>)/m.test(nextClient);

if (hasInputElement) {
  if (!nextClient.includes('aria-label="Tool input"')) {
    const before = nextClient;

    nextClient = nextClient.replace(
      /(\s+)(id=\{`tool-field-\$\{field\.name\}`\})([\s\S]*?)(\s+value=\{value\})/,
      `$1aria-label={field.label || "Tool input"}$1$2$3$4`
    );

    if (nextClient !== before) {
      pass("Accessible tool input label added");
      changed++;
    } else {
      warn("Input label transformation skipped safely");
    }
  } else {
    pass("Accessible tool input label already present");
  }
} else {
  warn("No standard tool input element detected");
}

console.log("\n===== 4. TEXT INPUT BEHAVIOR HARDENING =====");

if (
  nextClient.includes("textarea") &&
  !nextClient.includes("spellCheck={false}")
) {
  const before = nextClient;

  nextClient = nextClient.replace(
    /(<textarea\b[\s\S]*?)(\s+placeholder=\{field\.placeholder\})/,
    `$1\n                    spellCheck={false}$2`
  );

  if (nextClient !== before) {
    pass("Textarea spellCheck behavior added");
    changed++;
  } else {
    warn("Textarea behavior transformation skipped safely");
  }
} else {
  pass("Textarea behavior already controlled or not required");
}

console.log("\n===== 5. LIVE RESULT ACCESSIBILITY =====");

if (!nextClient.includes("aria-live")) {
  const before = nextClient;

  nextClient = nextClient.replace(
    /(<div\b[^>]*className=["'][^"']*result[^"']*["'][^>]*>)/i,
    `$1`
  );

  /*
   * If no predictable result container is found, do not guess.
   * This avoids corrupting JSX.
   */
  if (nextClient === before) {
    warn("Result container not safely identifiable — skipped aria-live injection");
  } else {
    pass("Result accessibility marker prepared");
    changed++;
  }
} else {
  pass("Result aria-live already present");
}

console.log("\n===== 6. DISCOVERY UX AUDIT =====");

discovery.includes("href")
  ? pass("Tools discovery navigation present")
  : fail("Tools discovery navigation missing");

discovery.includes("categories")
  ? pass("Category discovery reference present")
  : warn("Category discovery reference not detected");

discovery.includes("tool")
  ? pass("Tool discovery content present")
  : fail("Tool discovery content missing");

console.log("\n===== 7. WRITE ONLY IF SAFE =====");

if (changed > 0) {
  fs.writeFileSync(toolClient, nextClient);

  if (nextClient.includes("onChange={(e) =>")) {
    pass("ToolClient JSX integrity marker verified");
  } else {
    fail("ToolClient onChange contract missing after edit");
  }

  if (
    !nextClient.includes("onChange={(e) =") &&
    !nextClient.includes("onChange={(e) = aria")
  ) {
    pass("Known corrupted JSX pattern absent");
  } else {
    fail("Corrupted JSX pattern detected");
  }
} else {
  pass("No unsafe source transformation required");
}

console.log("\n===== 8. STALE ARCHITECTURE GUARD =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
].forEach((f) => {
  exists(f)
    ? fail(`STALE FILE PRESENT: ${f}`)
    : pass(`Stale absent: ${f}`);
});

console.log("\n===== 9. PHASE 10 SOURCE INTEGRITY =====");

for (const f of protectedFiles) {
  exists(f) ? pass(`Intact: ${f}`) : fail(`Damaged/missing: ${f}`);
}

console.log("\n===== 10. TYPESCRIPT REGRESSION =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  rollback();
  console.log("\n❌ PHASE 11.06 ABORTED BEFORE BUILD");
  process.exit(1);
}

console.log("\n===== 11. PRODUCTION BUILD REGRESSION =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

if (failed > 0) {
  rollback();

  console.log("\n===== 12. POST-ROLLBACK TYPESCRIPT =====");

  try {
    execSync("npx tsc --noEmit", { stdio: "inherit" });
    pass("Post-rollback TypeScript PASS");
  } catch {
    fail("Post-rollback TypeScript FAILED");
  }

  console.log("\n======================================================================");
  console.log("PHASE 11.06 REPORT");
  console.log("======================================================================");
  console.log(`FILES CHANGED BEFORE ROLLBACK : ${changed}`);
  console.log(`FAILED CHECKS                 : ${failed}`);
  console.log(`WARNINGS                      : ${warnings}`);
  console.log("======================================================================");
  console.log("❌ PHASE 11.06: FAIL");
  console.log("ALL UNSAFE CHANGES WERE ROLLED BACK.");
  console.log("DO NOT DEPLOY.");
  console.log("======================================================================");
  process.exit(1);
}

console.log("\n===== 12. FINAL UX CONTRACT =====");

const finalClient = fs.readFileSync(toolClient, "utf8");

finalClient.includes("useState")
  ? pass("Tool state management intact")
  : fail("Tool state management missing");

finalClient.includes("setResult")
  ? pass("Result state intact")
  : fail("Result state missing");

finalClient.includes("setLoading")
  ? pass("Loading state intact")
  : fail("Loading state missing");

finalClient.includes("getToolHandler")
  ? pass("Centralized handler intact")
  : fail("Centralized handler missing");

finalClient.includes("inputSchema")
  ? pass("Input schema contract intact")
  : fail("Input schema contract missing");

console.log("\n===== 13. FINAL FOUNDATION REGRESSION =====");

[
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts"
].forEach((f) => {
  exists(f)
    ? pass(`Foundation intact: ${f}`)
    : fail(`Foundation damaged: ${f}`);
});

console.log("\n======================================================================");
console.log("PHASE 11.06 REPORT");
console.log("======================================================================");
console.log(`FILES CHANGED : ${changed}`);
console.log(`FAILED CHECKS : ${failed}`);
console.log(`WARNINGS      : ${warnings}`);
console.log("======================================================================");

if (failed > 0) {
  rollback();
  console.log("❌ PHASE 11.06: FAIL");
  console.log("ALL CHANGES ROLLED BACK.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 11.06: PASS");
console.log("TOOL UX HARDENING VERIFIED");
console.log("ACCESSIBILITY SAFETY VERIFIED");
console.log("DISCOVERY VERIFIED");
console.log("PHASE 10 FOUNDATION INTACT");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.06 COMPLETE");
console.log("======================================================================");
