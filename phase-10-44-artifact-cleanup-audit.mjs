import fs from "fs";
import path from "path";

const root = process.cwd();
let failed = 0;

const entries = fs.readdirSync(root);

console.log("======================================================================");
console.log("PHASE 10.44 — SAFE ARTIFACT CLEANUP AUDIT");
console.log("IDENTIFY OLD QA + BACKUP ARTIFACTS");
console.log("READ-ONLY — NO FILES MODIFIED");
console.log("======================================================================");

console.log("");
console.log("===== 1. CURRENT PHASE SCRIPT =====");

const current = "phase-10-44-artifact-cleanup-audit.mjs";

if (fs.existsSync(path.join(root, current))) {
  console.log(`✓ Current audit script exists: ${current}`);
} else {
  console.log("✗ Current audit script missing");
  failed++;
}

console.log("");
console.log("===== 2. PHASE 10 QA SCRIPTS =====");

const qaFiles = entries
  .filter((name) =>
    /^phase-10-\d+.*\.(mjs|mts|js|ts)$/i.test(name)
  )
  .sort();

console.log(`QA scripts found: ${qaFiles.length}`);

for (const file of qaFiles) {
  const stat = fs.statSync(path.join(root, file));

  console.log(
    `  ${file} | ${(stat.size / 1024).toFixed(1)} KB`
  );
}

console.log("");
console.log("===== 3. BACKUP ARTIFACTS =====");

const backupFiles = entries
  .filter((name) =>
    /\.bak$/i.test(name) ||
    /\.before-[^/]+$/i.test(name) ||
    /^seo-backup-/i.test(name)
  )
  .sort();

console.log(`Backup artifacts found: ${backupFiles.length}`);

for (const file of backupFiles) {
  const stat = fs.statSync(path.join(root, file));

  if (stat.isDirectory()) {
    console.log(`  [DIR]  ${file}`);
  } else {
    console.log(
      `  [FILE] ${file} | ${(stat.size / 1024).toFixed(1)} KB`
    );
  }
}

console.log("");
console.log("===== 4. CRITICAL PRODUCTION FILE SAFETY =====");

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

for (const file of protectedFiles) {
  if (fs.existsSync(path.join(root, file))) {
    console.log(`✓ PROTECTED PRESENT: ${file}`);
  } else {
    console.log(`✗ PROTECTED MISSING: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 5. STALE PRODUCTION FILE SAFETY =====");

const staleFiles = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt"
];

for (const file of staleFiles) {
  if (fs.existsSync(path.join(root, file))) {
    console.log(`✗ STALE FILE EXISTS: ${file}`);
    failed++;
  } else {
    console.log(`✓ STALE FILE ABSENT: ${file}`);
  }
}

console.log("");
console.log("===== 6. ENV SAFETY =====");

if (fs.existsSync(path.join(root, ".env.local"))) {
  console.log("✓ .env.local exists locally");
  console.log("✓ .env.local will NOT be touched");
} else {
  console.log("✓ .env.local absent");
}

const gitignore = fs.existsSync(path.join(root, ".gitignore"))
  ? fs.readFileSync(path.join(root, ".gitignore"), "utf8")
  : "";

if (/\.env/.test(gitignore)) {
  console.log("✓ .env files covered by .gitignore");
} else {
  console.log("✗ .env ignore protection not detected");
  failed++;
}

console.log("");
console.log("===== 7. CLEANUP DECISION =====");

console.log("");
console.log("The audit above is READ-ONLY.");
console.log("NO QA SCRIPT WAS DELETED.");
console.log("NO BACKUP WAS DELETED.");
console.log("NO PRODUCTION SOURCE WAS MODIFIED.");
console.log("");

console.log("Recommended cleanup targets:");

for (const file of qaFiles) {
  if (file !== current) {
    console.log(`  QA: ${file}`);
  }
}

for (const file of backupFiles) {
  console.log(`  BACKUP: ${file}`);
}

console.log("");
console.log("======================================================================");
console.log("PHASE 10.44 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.44: FAIL");
  console.log("DO NOT CLEAN UP.");
  process.exit(1);
}

console.log("✅ PHASE 10.44: PASS");
console.log("PRODUCTION FILES SAFE");
console.log("STALE FILES ABSENT");
console.log("ENV SAFETY VERIFIED");
console.log("CLEANUP TARGETS IDENTIFIED");
console.log("NO FILES MODIFIED");
console.log("======================================================================");
