import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
let failed = 0;

const exists = p => fs.existsSync(path.join(root, p));
const read = p => fs.readFileSync(path.join(root, p), "utf8");

function check(name, ok, critical = true) {
  if (ok) console.log(`✓ ${name}`);
  else {
    console.log(`${critical ? "✗" : "⚠"} ${name}`);
    if (critical) failed++;
  }
}

function run(cmd, name) {
  try {
    execSync(cmd, {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, NEXT_DISABLE_TURBOPACK: "1" }
    });
    console.log(`✓ ${name}`);
  } catch {
    console.log(`✗ ${name}`);
    failed++;
  }
}

console.log("======================================================================");
console.log("PHASE 14.03 — PRODUCTION DEPLOYMENT READINESS");
console.log("MAIN WEB + SEO + ENVIRONMENT + BUILD + RUNTIME CHECK");
console.log("NO HOMEPAGE CHANGE | NO MASS SEO GENERATION | NO DEPLOY YET");
console.log("======================================================================");

console.log("\n===== 1. NEXT.JS FOUNDATION =====");

check("package.json", exists("package.json"));
check("next.config.ts/js/mjs", exists("next.config.ts") || exists("next.config.js") || exists("next.config.mjs"));
check("tsconfig.json", exists("tsconfig.json"));
check("app directory", exists("app"));

console.log("\n===== 2. PRODUCTION ROUTES =====");

[
  "app/page.tsx",
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/blog/page.js",
  "app/sitemap.ts",
  "app/robots.ts"
].forEach(f => {
  check(`Route/file: ${f}`, exists(f), false);
});

check(
  "Homepage exists",
  exists("app/page.tsx") || exists("app/page.js")
);

check(
  "Tools page exists",
  exists("app/tools/page.tsx") || exists("app/tools/page.js")
);

check(
  "Categories page exists",
  exists("app/categories/page.tsx") || exists("app/categories/page.js")
);

check(
  "Sitemap exists",
  exists("app/sitemap.ts") || exists("app/sitemap.js")
);

check(
  "Robots exists",
  exists("app/robots.ts") || exists("app/robots.js")
);

console.log("\n===== 3. SEO FOUNDATION =====");

const sitemap = exists("app/sitemap.ts")
  ? read("app/sitemap.ts")
  : exists("app/sitemap.js")
    ? read("app/sitemap.js")
    : "";

const robots = exists("app/robots.ts")
  ? read("app/robots.ts")
  : exists("app/robots.js")
    ? read("app/robots.js")
    : "";

check("Sitemap MetadataRoute", /MetadataRoute\.Sitemap/i.test(sitemap));
check("Sitemap tools", /tools/i.test(sitemap));
check("Sitemap categories", /categor/i.test(sitemap));
check("Robots userAgent", /userAgent/i.test(robots));
check("Robots allow", /allow/i.test(robots));
check("Robots sitemap", /sitemap/i.test(robots));

console.log("\n===== 4. ENVIRONMENT SAFETY =====");

check(
  ".env.local exists",
  exists(".env.local"),
  false
);

if (exists(".env.local")) {
  const env = read(".env.local");

  const secretLines = env
    .split("\n")
    .filter(x => x.trim() && !x.trim().startsWith("#"))
    .map(x => x.split("=")[0])
    .filter(Boolean);

  console.log(`✓ Local environment keys detected: ${secretLines.length}`);
  console.log("✓ Secret VALUES are not printed");
}

check(
  ".gitignore exists",
  exists(".gitignore")
);

if (exists(".gitignore")) {
  const gi = read(".gitignore");

  check(
    ".env.local ignored",
    /\.env\.local/i.test(gi)
  );

  check(
    "node_modules ignored",
    /node_modules/i.test(gi)
  );
}

console.log("\n===== 5. PACKAGE / BUILD CONTRACT =====");

const pkg = JSON.parse(read("package.json"));

check("build script exists", !!pkg.scripts?.build);
check("start script exists", !!pkg.scripts?.start);
check("next dependency exists", !!pkg.dependencies?.next || !!pkg.devDependencies?.next);

console.log("\n===== 6. SOURCE SAFETY =====");

const content = read("src/lib/contentGenerator.js");
const expansion = read("src/lib/seo/keywordExpansion.js");

check("No Lorem ipsum", !/lorem ipsum/i.test(content));
check(
  "Controlled expansion present",
  /buildControlledKeywordExpansion/i.test(expansion)
);
check(
  "Duplicate filtering present",
  /filterKeywordExpansion/i.test(expansion)
);

console.log("\n===== 7. SYNTAX =====");

run(
  "node --check src/lib/contentGenerator.js",
  "Content engine syntax"
);

run(
  "node --check src/lib/seo/keywordExpansion.js",
  "Keyword expansion syntax"
);

run(
  "node --check 'app/[lang]/tools/[slug]/[keyword]/page.js'",
  "Tool keyword route syntax"
);

run(
  "node --check 'app/blog/[slug]/[keyword]/page.js'",
  "Blog keyword route syntax"
);

console.log("\n===== 8. TYPESCRIPT =====");

run(
  "npx tsc --noEmit",
  "TypeScript"
);

console.log("\n===== 9. PRODUCTION BUILD =====");

run(
  "npm run build",
  "Production build"
);

console.log("\n===== 10. GIT / DEPLOYMENT STATE =====");

try {
  const branch = execSync("git branch --show-current", {
    cwd: root,
    encoding: "utf8"
  }).trim();

  console.log(`✓ Git branch: ${branch || "(detached)"}`);
} catch {
  console.log("⚠ Git branch unavailable");
}

try {
  const status = execSync("git status --short", {
    cwd: root,
    encoding: "utf8"
  }).trim();

  if (status) {
    console.log("⚠ Uncommitted changes exist — review before deployment");
    console.log(status);
  } else {
    console.log("✓ Working tree clean");
  }
} catch {
  console.log("⚠ Git status unavailable");
}

console.log("\n===== 11. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("❌ PHASE 14.03: FAIL");
  console.log("STOP — FIX CRITICAL DEPLOYMENT BLOCKERS.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 14.03: PASS");
console.log("PRODUCTION FOUNDATION READY");
console.log("SEO FOUNDATION READY");
console.log("ENVIRONMENT SAFETY READY");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("DEPLOYMENT READINESS PASS");
console.log("======================================================================");
console.log("🚀 READY FOR LIVE DEPLOYMENT");
console.log("======================================================================");
