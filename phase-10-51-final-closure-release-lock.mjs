import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;
let warnings = 0;

const exists = (p) => fs.existsSync(path.join(root, p));

const fail = (msg) => {
  console.log(`✗ ${msg}`);
  failed++;
};

const pass = (msg) => console.log(`✓ ${msg}`);

const section = (n, title) => {
  console.log("");
  console.log("======================================================================");
  console.log(`${n}. ${title}`);
  console.log("======================================================================");
};

console.log("======================================================================");
console.log("PHASE 10.51 — FINAL CLOSURE + RELEASE LOCK");
console.log("CONSOLIDATED READ-ONLY FINAL RELEASE VERIFICATION");
console.log("NO PRODUCTION SOURCE MODIFICATION");
console.log("======================================================================");

/* ============================================================
   1. REQUIRED PRODUCTION FILES
============================================================ */

section(1, "REQUIRED PRODUCTION FILES");

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
  ".gitignore",
];

for (const file of required) {
  exists(file) ? pass(file) : fail(`Missing: ${file}`);
}

/* ============================================================
   2. AUTHORITATIVE CATALOG
============================================================ */

section(2, "AUTHORITATIVE 135-TOOL CATALOG");

const catalogRuntime = path.join(root, ".phase-10-51-catalog-test.mjs");

fs.writeFileSync(
  catalogRuntime,
  `
import * as mod from "./data/tools.ts";

function unwrap(value, depth = 0) {
  if (depth > 6 || value == null) return value;

  if (
    typeof value === "object" &&
    Object.keys(value).length === 1 &&
    Object.prototype.hasOwnProperty.call(value, "default")
  ) {
    return unwrap(value.default, depth + 1);
  }

  return value;
}

const raw = unwrap(mod);

const catalog =
  raw?.tools ??
  raw?.catalog ??
  raw?.default ??
  raw;

console.log(
  "CATALOG_COUNT=" +
  (
    catalog && typeof catalog === "object"
      ? Object.keys(catalog).length
      : 0
  )
);

console.log(
  "TEXT_CASE=" +
  !!(
    catalog &&
    Object.prototype.hasOwnProperty.call(
      catalog,
      "text-case-converter"
    )
  )
);

console.log(
  "SEO_SLUG=" +
  !!(
    catalog &&
    Object.prototype.hasOwnProperty.call(
      catalog,
      "seo-slug-generator"
    )
  )
);

console.log(
  "KEYWORD_DENSITY=" +
  !!(
    catalog &&
    Object.prototype.hasOwnProperty.call(
      catalog,
      "keyword-density-checker"
    )
  )
);
`
);

try {
  const output = execSync(
    `npx --yes tsx "${catalogRuntime}"`,
    {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  process.stdout.write(output);

  const count = Number(
    output.match(/CATALOG_COUNT=(\d+)/)?.[1] || 0
  );

  count === 135
    ? pass("AUTHORITATIVE CATALOG = EXACTLY 135")
    : fail(`AUTHORITATIVE CATALOG = ${count}, expected 135`);

  /TEXT_CASE=true/.test(output)
    ? pass("text-case-converter present")
    : fail("text-case-converter missing");

  /SEO_SLUG=true/.test(output)
    ? pass("seo-slug-generator present")
    : fail("seo-slug-generator missing");

  /KEYWORD_DENSITY=true/.test(output)
    ? pass("keyword-density-checker present")
    : fail("keyword-density-checker missing");
} catch {
  fail("Unable to resolve authoritative catalog");
} finally {
  if (exists(".phase-10-51-catalog-test.mjs")) {
    fs.rmSync(catalogRuntime, { force: true });
    pass("Temporary catalog test removed");
  }
}

/* ============================================================
   3. HANDLER REGISTRY
============================================================ */

section(3, "135-HANDLER REGISTRY");

const registryRuntime = path.join(root, ".phase-10-51-registry-test.mjs");

fs.writeFileSync(
  registryRuntime,
  `
import * as mod from "./src/lib/tools/index.ts";

function unwrap(value, depth = 0) {
  if (depth > 6 || value == null) return value;

  if (
    typeof value === "object" &&
    Object.keys(value).length === 1 &&
    Object.prototype.hasOwnProperty.call(value, "default")
  ) {
    return unwrap(value.default, depth + 1);
  }

  return value;
}

const raw = unwrap(mod);

const registry =
  mod.toolRegistry ??
  raw?.toolRegistry ??
  raw?.default ??
  raw;

console.log(
  "REGISTRY_COUNT=" +
  (
    registry && typeof registry === "object"
      ? Object.keys(registry).length
      : 0
  )
);

console.log(
  "TEXT_CASE=" +
  !!(
    registry &&
    Object.prototype.hasOwnProperty.call(
      registry,
      "text-case-converter"
    )
  )
);

console.log(
  "SEO_SLUG=" +
  !!(
    registry &&
    Object.prototype.hasOwnProperty.call(
      registry,
      "seo-slug-generator"
    )
  )
);

console.log(
  "GET_HANDLER=" +
  (typeof mod.getToolHandler === "function")
);
`
);

try {
  const output = execSync(
    `npx --yes tsx "${registryRuntime}"`,
    {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  process.stdout.write(output);

  const count = Number(
    output.match(/REGISTRY_COUNT=(\d+)/)?.[1] || 0
  );

  count === 135
    ? pass("HANDLER REGISTRY = EXACTLY 135")
    : fail(`HANDLER REGISTRY = ${count}, expected 135`);

  /TEXT_CASE=true/.test(output)
    ? pass("text-case-converter handler present")
    : fail("text-case-converter handler missing");

  /SEO_SLUG=true/.test(output)
    ? pass("seo-slug-generator handler present")
    : fail("seo-slug-generator handler missing");

  /GET_HANDLER=true/.test(output)
    ? pass("getToolHandler available")
    : fail("getToolHandler missing");
} catch {
  fail("Unable to resolve handler registry");
} finally {
  if (exists(".phase-10-51-registry-test.mjs")) {
    fs.rmSync(registryRuntime, { force: true });
    pass("Temporary registry test removed");
  }
}

/* ============================================================
   4. STALE / BACKUP / QA HYGIENE
============================================================ */

section(4, "STALE / BACKUP / QA ARTIFACT HYGIENE");

const staleFiles = [
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
];

for (const file of staleFiles) {
  !exists(file)
    ? pass(`Stale absent: ${file}`)
    : fail(`STALE FILE PRESENT: ${file}`);
}

const rootEntries = fs.readdirSync(root);

const backups = rootEntries.filter((name) =>
  name.includes("before-step-") ||
  name.includes("seo-backup-")
);

if (backups.length === 0) {
  pass("ZERO backup artifacts");
} else {
  fail(`Backup artifacts remain: ${backups.join(", ")}`);
}

const qaScripts = rootEntries.filter((name) =>
  name.startsWith("phase-10-") && name.endsWith(".mjs")
);

const allowedQA = new Set([
  "phase-10-44-artifact-cleanup-audit.mjs",
  "phase-10-46-post-cleanup-final-regression.mjs",
  "phase-10-48-final-authoritative-catalog-loader.mjs",
  "phase-10-49-final-post-cleanup-regression.mjs",
  "phase-10-50-final-release-gate.mjs",
  "phase-10-51-final-closure-release-lock.mjs",
]);

const unexpectedQA = qaScripts.filter(
  (name) => !allowedQA.has(name)
);

console.log(`Phase 10 scripts currently present: ${qaScripts.length}`);

if (unexpectedQA.length === 0) {
  pass("No unexpected Phase 10 QA artifacts");
} else {
  fail(
    `Unexpected Phase 10 artifacts: ${unexpectedQA.join(", ")}`
  );
}

/* ============================================================
   5. ENVIRONMENT SAFETY
============================================================ */

section(5, "ENVIRONMENT + SECRET SAFETY");

if (exists(".env.local")) {
  pass(".env.local present locally");
} else {
  console.log("⚠ .env.local not present locally");
  warnings++;
}

const gitignore = exists(".gitignore")
  ? fs.readFileSync(
      path.join(root, ".gitignore"),
      "utf8"
    )
  : "";

if (
  gitignore.includes(".env") ||
  gitignore.includes(".env*") ||
  gitignore.includes(".env.local")
) {
  pass("Environment files covered by .gitignore");
} else {
  fail("Environment ignore rule not detected");
}

try {
  const tracked = execSync(
    "git ls-files",
    {
      cwd: root,
      encoding: "utf8",
    }
  );

  const trackedFiles = tracked
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

  const secretTracked = trackedFiles.filter((file) => {
    const lower = file.toLowerCase();

    return (
      lower === ".env" ||
      lower.startsWith(".env.") ||
      lower.endsWith(".pem") ||
      lower.endsWith(".key")
    );
  });

  if (secretTracked.length === 0) {
    pass("No obvious secret files Git-tracked");
  } else {
    fail(
      `Potential secret files Git-tracked: ${secretTracked.join(", ")}`
    );
  }
} catch {
  warnings++;
  console.log("⚠ Git tracking check unavailable");
}

/* ============================================================
   6. SEO INFRASTRUCTURE
============================================================ */

section(6, "SEO INFRASTRUCTURE");

const toolPage = exists("app/tools/[slug]/page.tsx")
  ? fs.readFileSync(
      path.join(root, "app/tools/[slug]/page.tsx"),
      "utf8"
    )
  : "";

const seoMarkers = [
  "generateMetadata",
  "alternates",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
];

for (const marker of seoMarkers) {
  toolPage.includes(marker)
    ? pass(marker)
    : fail(`Missing SEO marker: ${marker}`);
}

const sitemap = exists("app/sitemap.ts")
  ? fs.readFileSync(
      path.join(root, "app/sitemap.ts"),
      "utf8"
    )
  : "";

const robots = exists("app/robots.ts")
  ? fs.readFileSync(
      path.join(root, "app/robots.ts"),
      "utf8"
    )
  : "";

sitemap.includes("tools")
  ? pass("Sitemap tool catalog integration")
  : fail("Sitemap catalog integration missing");

robots.includes("userAgent")
  ? pass("Robots User-agent configuration")
  : fail("Robots User-agent configuration missing");

robots.includes("sitemap")
  ? pass("Robots Sitemap configuration")
  : fail("Robots Sitemap configuration missing");

/* ============================================================
   7. LEGACY REDIRECTS
============================================================ */

section(7, "LEGACY REDIRECTS");

const nextConfig = exists("next.config.ts")
  ? fs.readFileSync(
      path.join(root, "next.config.ts"),
      "utf8"
    )
  : "";

const redirects = [
  [
    "/tools/case-converter",
    "/tools/text-case-converter",
  ],
  [
    "/tools/text-to-slug",
    "/tools/seo-slug-generator",
  ],
  [
    "/text-to-slug",
    "/tools/seo-slug-generator",
  ],
];

for (const [from, to] of redirects) {
  if (
    nextConfig.includes(from) &&
    nextConfig.includes(to)
  ) {
    pass(`${from} → ${to}`);
  } else {
    fail(`Missing redirect: ${from} → ${to}`);
  }
}

/* ============================================================
   8. TYPESCRIPT
============================================================ */

section(8, "TYPESCRIPT");

try {
  execSync("npx tsc --noEmit", {
    cwd: root,
    stdio: "inherit",
  });

  pass("TypeScript compilation");
} catch {
  fail("TypeScript compilation failed");
}

/* ============================================================
   9. PRODUCTION BUILD
============================================================ */

section(9, "PRODUCTION BUILD");

try {
  execSync("npm run build", {
    cwd: root,
    stdio: "inherit",
  });

  pass("Production build");
} catch {
  fail("Production build failed");
}

/* ============================================================
   10. GIT RELEASE STATE
============================================================ */

section(10, "GIT RELEASE STATE");

try {
  const status = execSync(
    "git status --short",
    {
      cwd: root,
      encoding: "utf8",
    }
  ).trim();

  if (!status) {
    pass("Git working tree clean");
  } else {
    warnings++;
    console.log("⚠ Git working tree has changes:");
    console.log(status);
    console.log("⚠ Informational only — does not fail gate");
  }

  const branch = execSync(
    "git branch --show-current",
    {
      cwd: root,
      encoding: "utf8",
    }
  ).trim();

  console.log(
    `Current Git branch: ${branch || "(detached/unknown)"}`
  );
} catch {
  warnings++;
  console.log("⚠ Git release-state check unavailable");
}

/* ============================================================
   FINAL REPORT
============================================================ */

console.log("");
console.log("======================================================================");
console.log("PHASE 10.51 FINAL CLOSURE REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS : ${failed}`);
console.log(`WARNINGS      : ${warnings}`);
console.log("======================================================================");

if (failed > 0) {
  console.log("❌ PHASE 10.51: FAIL");
  console.log("DO NOT CLOSE PHASE 10.");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 10.51: PASS");
console.log("135-TOOL CATALOG VERIFIED");
console.log("135-TOOL HANDLER REGISTRY VERIFIED");
console.log("STALE PRODUCTION FILES ABSENT");
console.log("BACKUPS VERIFIED");
console.log("QA ARTIFACT HYGIENE VERIFIED");
console.log("ENVIRONMENT SAFETY VERIFIED");
console.log("SEO INFRASTRUCTURE VERIFIED");
console.log("LEGACY REDIRECTS VERIFIED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🔒 PHASE 10 READY TO BE FROZEN");
console.log("======================================================================");
