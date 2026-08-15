import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const toolPath = path.join(root, "app/[lang]/tools/[slug]/[keyword]/page.js");
const blogPath = path.join(root, "app/blog/[slug]/[keyword]/page.js");

let failed = 0;
let changed = 0;

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => { console.log(`✗ ${m}`); failed++; };

console.log("======================================================================");
console.log("PHASE 13.02 — PROGRAMMATIC CONTENT RENDERING + SEO QUALITY GATE");
console.log("TOOL + BLOG KEYWORD PAGES");
console.log("GUARDED WRITE + AUTOMATIC ROLLBACK + FULL REGRESSION");
console.log("NO HOMEPAGE MODIFICATION");
console.log("135-TOOL FOUNDATION PROTECTED");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

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
];

for (const f of protectedFiles) {
  if (fs.existsSync(path.join(root, f))) pass(`Protected: ${f}`);
  else fail(`Missing foundation: ${f}`);
}

if (!fs.existsSync(toolPath) || !fs.existsSync(blogPath)) {
  fail("Programmatic target routes missing");
  process.exit(1);
}

console.log("\n===== 2. BACKUPS =====");

const toolBackup = `${toolPath}.phase-13-02-backup`;
const blogBackup = `${blogPath}.phase-13-02-backup`;

fs.copyFileSync(toolPath, toolBackup);
fs.copyFileSync(blogPath, blogBackup);

pass("Tool keyword route backup created");
pass("Blog keyword route backup created");

console.log("\n===== 3. TOOL ROUTE CONTENT RENDERING =====");

let tool = fs.readFileSync(toolPath, "utf8");

const oldToolReturn = /return\s*\(\s*<div[\s\S]*?\n\s*\);\s*}\s*$/m;

const newToolReturn = `
  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <nav aria-label="Breadcrumb">
        <a href="/tools">All Tools</a>
        {" / "}
        <a href="/categories">Categories</a>
      </nav>

      <h1>{cleanKeyword} ({lang})</h1>

      <p>{content.intro}</p>
      <p>{content.content}</p>

      {content.benefits?.length > 0 && (
        <>
          <h2>Why use this tool?</h2>
          <ul>
            {content.benefits.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}

      {content.steps?.length > 0 && (
        <>
          <h2>How to use it</h2>
          <ol>
            {content.steps.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </>
      )}

      <h2>Related Tools</h2>
      <div>
        {content.links?.map((link, i) => (
          <div key={i}>
            <a href={link}>{link}</a>
          </div>
        ))}
      </div>
    </main>
  );
}
`;

if (oldToolReturn.test(tool)) {
  tool = tool.replace(oldToolReturn, newToolReturn);
  fs.writeFileSync(toolPath, tool);
  changed++;
  pass("Tool keyword structured content rendering applied");
} else {
  fail("Tool page return block could not be safely located");
}

console.log("\n===== 4. BLOG ROUTE CONTENT RENDERING =====");

let blog = fs.readFileSync(blogPath, "utf8");

const oldBlogReturn = /return\s*\(\s*<div[\s\S]*?\n\s*\);\s*}\s*$/m;

const newBlogReturn = `
  return (
    <main style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <nav aria-label="Breadcrumb">
        <a href="/blog">Blog</a>
        {" / "}
        <a href="/categories">Categories</a>
      </nav>

      <h1>{content.title || cleanKeyword}</h1>

      <p>{content.intro}</p>
      <p>{content.content}</p>

      {content.sections?.map((section, i) => (
        <section key={i}>
          <h2>{section.heading}</h2>
          <p>{section.content}</p>
        </section>
      ))}

      <h2>Explore More</h2>
      <div>
        {content.links?.map((link, i) => (
          <div key={i}>
            <a href={link}>{link}</a>
          </div>
        ))}
      </div>
    </main>
  );
}
`;

if (oldBlogReturn.test(blog)) {
  blog = blog.replace(oldBlogReturn, newBlogReturn);
  fs.writeFileSync(blogPath, blog);
  changed++;
  pass("Blog keyword structured content rendering applied");
} else {
  fail("Blog page return block could not be safely located");
}

console.log("\n===== 5. SOURCE CONTRACT =====");

const toolAfter = fs.readFileSync(toolPath, "utf8");
const blogAfter = fs.readFileSync(blogPath, "utf8");

for (const marker of [
  "content.intro",
  "content.content",
  "content.benefits",
  "content.steps",
  'href="/tools"',
  'href="/categories"',
]) {
  toolAfter.includes(marker)
    ? pass(`Tool rendering: ${marker}`)
    : fail(`Tool rendering missing: ${marker}`);
}

for (const marker of [
  "content.intro",
  "content.content",
  "content.sections",
  "content.links",
  'href="/categories"',
]) {
  blogAfter.includes(marker)
    ? pass(`Blog rendering: ${marker}`)
    : fail(`Blog rendering missing: ${marker}`);
}

console.log("\n===== 6. PROGRAMMATIC SEO CONTRACT =====");

for (const [name, source] of [
  ["Tool", toolAfter],
  ["Blog", blogAfter],
]) {
  for (const marker of [
    "await params",
    "generateMetadata",
    "canonical",
    "robots",
  ]) {
    source.includes(marker)
      ? pass(`${name}: ${marker}`)
      : fail(`${name} missing: ${marker}`);
  }
}

console.log("\n===== 7. 135-TOOL FOUNDATION =====");

const catalog = fs.readFileSync(
  path.join(root, "data/tools.ts"),
  "utf8"
);
const registry = fs.readFileSync(
  path.join(root, "src/lib/tools/index.ts"),
  "utf8"
);

const tools = [
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
  "checklist-generator",
];

for (const slug of tools) {
  catalog.includes(slug)
    ? pass(`Catalog: ${slug}`)
    : fail(`Catalog missing: ${slug}`);

  registry.includes(slug)
    ? pass(`Registry: ${slug}`)
    : fail(`Registry missing: ${slug}`);
}

registry.includes("getToolHandler")
  ? pass("getToolHandler preserved")
  : fail("getToolHandler missing");

console.log("\n===== 8. TOOLCLIENT =====");

const client = fs.readFileSync(
  path.join(root, "app/tools/[slug]/ToolClient.tsx"),
  "utf8"
);

for (const marker of [
  'aria-label="Tool input"',
  "spellCheck={false}",
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  "aria-live",
]) {
  client.includes(marker)
    ? pass(`ToolClient: ${marker}`)
    : fail(`ToolClient missing: ${marker}`);
}

console.log("\n===== 9. SITEMAP + ROBOTS =====");

const sitemap = fs.readFileSync(
  path.join(root, "app/sitemap.ts"),
  "utf8"
);
const robots = fs.readFileSync(
  path.join(root, "app/robots.ts"),
  "utf8"
);

for (const marker of [
  "MetadataRoute.Sitemap",
  "categoryUrls",
  "/categories/",
  "/tools/",
  "return",
]) {
  sitemap.includes(marker)
    ? pass(`Sitemap: ${marker}`)
    : fail(`Sitemap missing: ${marker}`);
}

for (const marker of ["userAgent", "allow", "sitemap"]) {
  robots.includes(marker)
    ? pass(`Robots: ${marker}`)
    : fail(`Robots missing: ${marker}`);
}

console.log("\n===== 10. TYPESCRIPT =====");

try {
  execSync("npx tsc --noEmit", { stdio: "inherit" });
  pass("TypeScript PASS");
} catch {
  fail("TypeScript FAILED");
}

console.log("\n===== 11. PRODUCTION BUILD =====");

try {
  execSync("npm run build", { stdio: "inherit" });
  pass("Production build PASS");
} catch {
  fail("Production build FAILED");
}

console.log("\n===== 12. LIVE PROGRAMMATIC RUNTIME =====");

const routes = [
  "/en/tools/word-counter/test",
  "/en/tools/seo-slug-generator/test",
  "/en/tools/keyword-density-checker/test",
  "/blog/test/test",
];

for (const route of routes) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    const body = execSync(
      `curl -s "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    );

    if (status !== "200") {
      fail(`${route} → HTTP ${status}`);
      continue;
    }

    pass(`${route} → HTTP 200`);

    const text = body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (text.length >= 900) {
      pass(`${route} → rich rendered content (${text.length} chars)`);
    } else {
      fail(`${route} → insufficient rendered content (${text.length} chars)`);
    }

    for (const marker of ["<title", "description", "canonical"]) {
      body.toLowerCase().includes(marker)
        ? pass(`${route} → ${marker}`)
        : fail(`${route} → ${marker} missing`);
    }

    if (/Application error|Unhandled Runtime Error|TypeError:|ReferenceError:/i.test(body)) {
      fail(`${route} → runtime error leakage`);
    } else {
      pass(`${route} → runtime clean`);
    }
  } catch {
    fail(`${route} → runtime request failed`);
  }
}

console.log("\n===== 13. CORE ROUTES =====");

for (const route of [
  "/",
  "/tools",
  "/categories",
  "/blog",
  "/sitemap.xml",
  "/robots.txt",
]) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    status === "200"
      ? pass(`${route} → HTTP 200`)
      : fail(`${route} → HTTP ${status}`);
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 14. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("🔄 AUTOMATIC ROLLBACK");

  fs.copyFileSync(toolBackup, toolPath);
  fs.copyFileSync(blogBackup, blogPath);

  console.log("Tool keyword route restored.");
  console.log("Blog keyword route restored.");
  console.log("NO DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log(`FILES CHANGED: ${changed}`);
console.log("======================================================================");
console.log("✅ PHASE 13.02: PASS");
console.log("PROGRAMMATIC CONTENT RENDERING VERIFIED");
console.log("RICH TOOL PAGES VERIFIED");
console.log("RICH BLOG PAGES VERIFIED");
console.log("INTERNAL LINKING VERIFIED");
console.log("SEO METADATA VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE PROGRAMMATIC RUNTIME PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.02 COMPLETE");
console.log("======================================================================");
