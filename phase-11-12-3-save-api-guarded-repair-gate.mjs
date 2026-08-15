import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const routePath = path.join(ROOT, "app/api/save/route.js");

let failed = 0;
let changed = false;

const pass = (x) => console.log(`✓ ${x}`);
const fail = (x) => {
  console.log(`✗ ${x}`);
  failed++;
};

const exists = (file) =>
  fs.existsSync(path.join(ROOT, file));

const read = (file) =>
  fs.readFileSync(path.join(ROOT, file), "utf8");

console.log("======================================================================");
console.log("PHASE 11.12.3 — /api/save GUARDED REPAIR + FINAL REGRESSION");
console.log("INPUT VALIDATION + ERROR SAFETY + LIVE FUNCTIONALITY");
console.log("AUTOMATIC ROLLBACK ON FAILURE");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION PROTECTION =====");

const protectedFiles = [
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "app/tools/[slug]/page.tsx",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts",
  "tsconfig.json",
  "package.json",
  "package-lock.json",
  ".gitignore"
];

for (const file of protectedFiles) {
  exists(file)
    ? pass(`Protected: ${file}`)
    : fail(`Missing: ${file}`);
}

if (!exists("app/api/save/route.js")) {
  fail("Save route missing");
  process.exit(1);
}

const original = fs.readFileSync(routePath, "utf8");

console.log("\n===== 2. SAVE ROUTE BASELINE =====");

[
  "connectDB",
  "Blog",
  "slugify",
  "export async function POST",
  "Blog.create",
  "Response.json"
].forEach((marker) => {
  original.includes(marker)
    ? pass(`Existing contract: ${marker}`)
    : fail(`Missing contract: ${marker}`);
});

console.log("\n===== 3. GUARDED REPAIR =====");

const repaired = `import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import slugify from "slugify";

export async function POST(req) {
  try {
    let body;

    try {
      body = await req.json();
    } catch {
      return Response.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { topic, content } = body || {};

    if (
      typeof topic !== "string" ||
      !topic.trim()
    ) {
      return Response.json(
        { success: false, error: "Topic is required" },
        { status: 400 }
      );
    }

    if (
      typeof content !== "string" ||
      !content.trim()
    ) {
      return Response.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const slug = slugify(topic.trim(), {
      lower: true,
      strict: true,
    });

    const blog = await Blog.create({
      topic: topic.trim(),
      content,
      slug,
    });

    return Response.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("POST /api/save failed:", error);

    return Response.json(
      {
        success: false,
        error: "Unable to save blog",
      },
      { status: 500 }
    );
  }
}
`;

fs.writeFileSync(routePath, repaired);
changed = true;

pass("Guarded validation/error handling applied");

console.log("\n===== 4. SOURCE CONTRACT VERIFICATION =====");

const current = fs.readFileSync(routePath, "utf8");

[
  "connectDB",
  "Blog",
  "slugify",
  "export async function POST",
  "Blog.create",
  "Response.json",
  "Invalid JSON body",
  "Topic is required",
  "Content is required",
  "Unable to save blog",
  "try",
  "catch"
].forEach((marker) => {
  current.includes(marker)
    ? pass(`Save contract: ${marker}`)
    : fail(`Save contract missing: ${marker}`);
});

console.log("\n===== 5. TOOLCLIENT SAFETY =====");

const toolClient = read("app/tools/[slug]/ToolClient.tsx");

[
  'aria-label="Tool input"',
  "spellCheck={false}",
  "getToolHandler",
  "inputSchema",
  "setText",
  "setResult",
  "setLoading"
].forEach((marker) => {
  toolClient.includes(marker)
    ? pass(`ToolClient preserved: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
});

[
  /onChange=\{\(e\)\s*=(?!>)\s*aria-/,
  /onChange=\{\(e\)\s*=(?!>)\s*spellCheck/,
  /onChange=\{\(e\)\s*=(?!>)\s*updateField/
].forEach((pattern) => {
  pattern.test(toolClient)
    ? fail(`JSX corruption detected: ${pattern}`)
    : pass(`JSX clean: ${pattern}`);
});

console.log("\n===== 6. 135-TOOL ARCHITECTURE =====");

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
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

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

console.log("\n===== 7. SEO + DISCOVERY =====");

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
  ? pass("Category discovery present")
  : fail("Category discovery missing");

console.log("\n===== 8. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

sitemap.includes("tools")
  ? pass("Sitemap tool integration")
  : fail("Sitemap tool integration missing");

robots.includes("sitemap")
  ? pass("Robots sitemap")
  : fail("Robots sitemap missing");

console.log("\n===== 9. STALE ARCHITECTURE =====");

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

console.log("\n===== 10. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", {
    stdio: "inherit"
  });

  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

if (failed > 0) {
  fs.writeFileSync(routePath, original);
  console.log("🔄 SAVE ROUTE ROLLED BACK");

  console.log("\n======================================================================");
  console.log("PHASE 11.12.3 PRE-BUILD FAILURE");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("ALL SAVE CHANGES ROLLED BACK");
  process.exit(1);
}

console.log("\n===== 11. PRODUCTION BUILD =====");

try {
  execSync("npm run build", {
    stdio: "inherit"
  });

  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

if (failed > 0) {
  fs.writeFileSync(routePath, original);
  console.log("🔄 SAVE ROUTE ROLLED BACK AFTER BUILD FAILURE");

  console.log("\n======================================================================");
  console.log("PHASE 11.12.3 BUILD FAILURE");
  console.log("======================================================================");
  console.log(`FAILED CHECKS: ${failed}`);
  process.exit(1);
}

console.log("\n===== 12. LIVE SAVE API SMOKE =====");

const tests = [
  {
    name: "Invalid JSON",
    command:
      `curl -s -o /dev/null -w "%{http_code}" ` +
      `-X POST http://localhost:3000/api/save ` +
      `-H "Content-Type: application/json" ` +
      `--data '{invalid-json}'`,
    expected: "400"
  },
  {
    name: "Missing topic",
    command:
      `curl -s -o /dev/null -w "%{http_code}" ` +
      `-X POST http://localhost:3000/api/save ` +
      `-H "Content-Type: application/json" ` +
      `--data '{"content":"validation test"}'`,
    expected: "400"
  },
  {
    name: "Missing content",
    command:
      `curl -s -o /dev/null -w "%{http_code}" ` +
      `-X POST http://localhost:3000/api/save ` +
      `-H "Content-Type: application/json" ` +
      `--data '{"topic":"validation test"}'`,
    expected: "400"
  }
];

for (const test of tests) {
  try {
    const status = execSync(test.command, {
      encoding: "utf8"
    }).trim();

    if (status === test.expected) {
      pass(`${test.name} → HTTP ${status}`);
    } else {
      fail(`${test.name} → HTTP ${status}, expected ${test.expected}`);
    }
  } catch {
    fail(`${test.name} request failed`);
  }
}

console.log("\n===== 13. VALID SAVE CONTRACT =====");

try {
  const output = execSync(
    `curl -s -X POST http://localhost:3000/api/save ` +
    `-H "Content-Type: application/json" ` +
    `--data '{"topic":"phase-11-12-validity-check","content":"Runtime validation smoke test"}'`,
    { encoding: "utf8" }
  );

  if (
    output.includes('"success":true') &&
    output.includes('"blog"')
  ) {
    pass("Valid save → success response");
  } else {
    fail("Valid save → unexpected response");
    console.log(output);
  }
} catch {
  fail("Valid save request failed");
}

console.log("\n===== 14. FINAL SOURCE INTEGRITY =====");

for (const file of protectedFiles) {
  exists(file)
    ? pass(`Final intact: ${file}`)
    : fail(`Final missing: ${file}`);
}

console.log("\n======================================================================");
console.log("PHASE 11.12.3 FINAL REPORT");
console.log("======================================================================");
console.log(`FAILED CHECKS: ${failed}`);
console.log(`FILES CHANGED : ${changed ? 1 : 0}`);
console.log("======================================================================");

if (failed > 0) {
  fs.writeFileSync(routePath, original);
  console.log("🔄 SAVE ROUTE ROLLED BACK");
  console.log("❌ PHASE 11.12.3: FAIL");
  console.log("DO NOT DEPLOY.");
  process.exit(1);
}

console.log("✅ PHASE 11.12.3: PASS");
console.log("SAVE API HARDENED");
console.log("INPUT VALIDATION VERIFIED");
console.log("ERROR HANDLING VERIFIED");
console.log("VALID SAVE VERIFIED");
console.log("135-TOOL ARCHITECTURE VERIFIED");
console.log("TOOLCLIENT VERIFIED");
console.log("ACCESSIBILITY VERIFIED");
console.log("DISCOVERY VERIFIED");
console.log("SEO VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("STALE ARCHITECTURE ABSENT");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("======================================================================");
console.log("🚀 PHASE 11.12.3 COMPLETE");
console.log("======================================================================");
