import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

console.log("======================================================================");
console.log("PHASE 10.48 — FINAL AUTHORITATIVE CATALOG LOADER");
console.log("KNOWN-GOOD DOUBLE-DEFAULT MODULE INTEROP");
console.log("READ-ONLY — NO PRODUCTION SOURCE MODIFIED");
console.log("======================================================================");

console.log("");
console.log("===== 1. REMAINING QA ARTIFACTS =====");

const entries = fs.readdirSync(root);

const phaseScripts = entries
  .filter((name) => /^phase-10-\d+.*\.mjs$/i.test(name))
  .sort();

for (const file of phaseScripts) {
  console.log(`  ${file}`);
}

console.log(`Remaining Phase 10 scripts: ${phaseScripts.length}`);

const allowed = [
  "phase-10-44-artifact-cleanup-audit.mjs",
  "phase-10-46-post-cleanup-final-regression.mjs",
  "phase-10-48-final-authoritative-catalog-loader.mjs"
];

for (const file of phaseScripts) {
  if (allowed.includes(file)) {
    console.log(`✓ Allowed for final verification: ${file}`);
  } else {
    console.log(`✗ Unexpected Phase 10 artifact: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 2. BACKUP CHECK =====");

const backups = entries.filter((name) =>
  /\.bak$/i.test(name) ||
  /\.before-[^/]+$/i.test(name) ||
  /^seo-backup-/i.test(name)
);

if (backups.length === 0) {
  console.log("✓ ZERO backup artifacts");
} else {
  for (const file of backups) {
    console.log(`✗ Backup remains: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 3. AUTHORITATIVE CATALOG =====");

const temp = path.join(root, ".phase-10-48-catalog.mts");

fs.writeFileSync(
  temp,
  `
import * as toolsModule from "./data/tools.ts";

function findCatalog(value: any): any | null {
  if (!value || typeof value !== "object") return null;

  if (
    Object.prototype.hasOwnProperty.call(
      value,
      "keyword-density-checker"
    ) &&
    Object.prototype.hasOwnProperty.call(
      value,
      "text-case-converter"
    ) &&
    Object.prototype.hasOwnProperty.call(
      value,
      "seo-slug-generator"
    )
  ) {
    return value;
  }

  if (
    Object.prototype.hasOwnProperty.call(value, "default")
  ) {
    const found = findCatalog(value.default);
    if (found) return found;
  }

  if (
    Object.prototype.hasOwnProperty.call(value, "module.exports")
  ) {
    const found = findCatalog(value["module.exports"]);
    if (found) return found;
  }

  return null;
}

const catalog = findCatalog(toolsModule);

if (!catalog) {
  console.log("CATALOG_FOUND=false");
  process.exit(2);
}

console.log("CATALOG_FOUND=true");
console.log("CATALOG_COUNT=" + Object.keys(catalog).length);
console.log(
  "TEXT_CASE=" +
    Object.prototype.hasOwnProperty.call(
      catalog,
      "text-case-converter"
    )
);
console.log(
  "SEO_SLUG=" +
    Object.prototype.hasOwnProperty.call(
      catalog,
      "seo-slug-generator"
    )
);
console.log(
  "KEYWORD_DENSITY=" +
    Object.prototype.hasOwnProperty.call(
      catalog,
      "keyword-density-checker"
    )
);
`
);

try {
  const output = execSync(
    "npx --yes tsx .phase-10-48-catalog.mts",
    {
      cwd: root,
      encoding: "utf8"
    }
  );

  process.stdout.write(output);

  if (!output.includes("CATALOG_FOUND=true")) {
    console.log("✗ Authoritative catalog could not be resolved");
    failed++;
  } else {
    console.log("✓ Authoritative catalog resolved");

    const match = output.match(/CATALOG_COUNT=(\d+)/);
    const count = match ? Number(match[1]) : 0;

    if (count === 135) {
      console.log("✓ AUTHORITATIVE CATALOG = EXACTLY 135");
    } else {
      console.log(
        `✗ AUTHORITATIVE CATALOG = ${count}, expected 135`
      );
      failed++;
    }

    if (output.includes("TEXT_CASE=true")) {
      console.log("✓ text-case-converter present");
    } else {
      console.log("✗ text-case-converter missing");
      failed++;
    }

    if (output.includes("SEO_SLUG=true")) {
      console.log("✓ seo-slug-generator present");
    } else {
      console.log("✗ seo-slug-generator missing");
      failed++;
    }

    if (output.includes("KEYWORD_DENSITY=true")) {
      console.log("✓ keyword-density-checker present");
    } else {
      console.log("✗ keyword-density-checker missing");
      failed++;
    }
  }
} catch {
  console.log("✗ Catalog runtime verification failed");
  failed++;
} finally {
  if (fs.existsSync(temp)) {
    fs.unlinkSync(temp);
    console.log("✓ Temporary runtime file removed");
  }
}

console.log("");
console.log("===== 4. PRODUCTION FILE SAFETY =====");

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

for (const file of required) {
  if (fs.existsSync(path.join(root, file))) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ MISSING: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 5. STALE FILE SAFETY =====");

const stale = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt"
];

for (const file of stale) {
  if (!fs.existsSync(path.join(root, file))) {
    console.log(`✓ ABSENT: ${file}`);
  } else {
    console.log(`✗ STALE FILE EXISTS: ${file}`);
    failed++;
  }
}

console.log("");
console.log("===== 6. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    cwd: root,
    stdio: "inherit"
  });

  console.log("✓ TYPESCRIPT PASS");
} catch {
  console.log("✗ TYPESCRIPT FAILED");
  failed++;
}

console.log("");
console.log("===== 7. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit"
  });

  console.log("✓ PRODUCTION BUILD PASS");
} catch {
  console.log("✗ PRODUCTION BUILD FAILED");
  failed++;
}

console.log("");
console.log("======================================================================");
console.log("PHASE 10.48 REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.48: FAIL");
  console.log("DO NOT DELETE ANY FILES.");
  process.exit(1);
}

console.log("✅ PHASE 10.48: PASS");
console.log("AUTHORITATIVE CATALOG = 135");
console.log("PRODUCTION FILES SAFE");
console.log("STALE FILES ABSENT");
console.log("BACKUPS = ZERO");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
