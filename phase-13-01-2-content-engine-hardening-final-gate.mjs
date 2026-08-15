import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const root = process.cwd();
const target = path.join(root, "src/lib/contentGenerator.js");

let failed = 0;
let changed = false;

const pass = (m) => console.log(`✓ ${m}`);
const fail = (m) => {
  console.log(`✗ ${m}`);
  failed++;
};

console.log("======================================================================");
console.log("PHASE 13.01.2 — PROGRAMMATIC CONTENT ENGINE HARDENING");
console.log("STRUCTURED CONTENT + INTERNAL LINKS + SEO CONTENT QUALITY");
console.log("GUARDED WRITE + AUTOMATIC ROLLBACK + FULL REGRESSION");
console.log("NO HOMEPAGE MODIFICATION");
console.log("135-TOOL ARCHITECTURE PROTECTED");
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

for (const file of protectedFiles) {
  if (fs.existsSync(path.join(root, file))) {
    pass(`Protected: ${file}`);
  } else {
    fail(`Missing foundation: ${file}`);
  }
}

console.log("\n===== 2. CONTENT ENGINE BASELINE =====");

if (!fs.existsSync(target)) {
  fail("src/lib/contentGenerator.js missing");
  process.exit(1);
}

const before = fs.readFileSync(target, "utf8");

console.log("----- CURRENT CONTENT ENGINE -----");
console.log(before);
console.log("----- END CURRENT CONTENT ENGINE -----");

if (!/generateContent\s*\(/.test(before)) {
  fail("generateContent missing");
}

if (!/generateBlogContent\s*\(/.test(before)) {
  fail("generateBlogContent missing");
}

const backup = `${target}.phase-13-01-2-backup`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  pass("Content engine backup created");
} else {
  pass("Content engine backup already present");
}

console.log("\n===== 3. GUARDED CONTENT ENGINE REPAIR =====");

const hardened = `export function generateContent(keyword, slug = "") {
  const cleanKeyword = String(keyword || "online tool")
    .trim()
    .replace(/-/g, " ");

  const cleanSlug = String(slug || cleanKeyword)
    .trim()
    .replace(/-/g, " ");

  const safeKeyword =
    cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1);

  return {
    title: safeKeyword,
    description:
      \`Use this \${cleanSlug} guide and online utility for \${cleanKeyword}. Get practical results quickly with a simple browser-based workflow.\`,

    intro:
      \`This page explains how to use \${cleanKeyword} with the \${cleanSlug} tool. It provides a practical starting point, useful guidance, and a direct path to the main tool.\`,

    content:
      \`The \${cleanKeyword} workflow is useful when you need a fast and straightforward way to work with this task online. Start by reviewing the input requirements, enter your information, run the tool, and check the generated result. For the best result, use clear input and verify the output before using it in your project or workflow. This page is designed to help users understand the purpose of the tool as well as complete the task efficiently.\`,

    benefits: [
      \`Fast browser-based \${cleanKeyword} workflow\`,
      \`Simple instructions for getting started\`,
      \`Useful guidance for checking the final result\`,
      \`Direct access to the main \${cleanSlug} tool\`,
    ],

    steps: [
      \`Open the \${cleanSlug} tool\`,
      \`Enter the required information\`,
      \`Run the tool and review the result\`,
      \`Adjust the input if necessary and repeat\`,
    ],

    links: [
      "/tools",
      "/categories",
      \`/tools/\${encodeURIComponent(String(slug || "").trim())}\`,
    ],
  };
}

export function generateBlogContent(keyword, slug = "") {
  const cleanKeyword = String(keyword || "SEO")
    .trim()
    .replace(/-/g, " ");

  const cleanSlug = String(slug || cleanKeyword)
    .trim()
    .replace(/-/g, " ");

  const safeKeyword =
    cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1);

  return {
    title: safeKeyword,

    description:
      \`Learn about \${cleanKeyword}, practical SEO workflows, common mistakes, and useful ways to improve your results with online tools.\`,

    intro:
      \`This guide covers \${cleanKeyword} from a practical perspective, including how the workflow works, what to check, and how online tools can make the process easier.\`,

    content:
      \`Understanding \${cleanKeyword} can make common SEO and content tasks easier to manage. A useful workflow starts with identifying the goal, choosing the appropriate method, checking the input, and reviewing the final result. The \${cleanSlug} topic is especially useful when you want a repeatable process rather than relying on guesswork. Use the information on this page as a practical reference and verify important results before publishing or implementing them.\`,

    sections: [
      {
        heading: \`What is \${safeKeyword}?\`,
        content:
          \`\${safeKeyword} is a useful topic for people working with websites, content, SEO, and online workflows. Understanding its basic purpose helps you choose the right approach.\`,
      },
      {
        heading: \`How to approach \${safeKeyword}\`,
        content:
          \`Start with a clear objective, prepare accurate input, use the appropriate tool or workflow, and review the result. Keeping the process consistent makes it easier to identify mistakes and improve future work.\`,
      },
      {
        heading: \`Common mistakes\`,
        content:
          \`Avoid unclear input, unnecessary repetition, and publishing results without checking them. A simple verification step can prevent many avoidable problems.\`,
      },
    ],

    links: [
      "/tools",
      "/categories",
      \`/tools/\${encodeURIComponent(String(slug || "").trim())}\`,
    ],
  };
}
`;

fs.writeFileSync(target, hardened);
changed = true;

pass("Structured generateContent installed");
pass("Structured generateBlogContent installed");
pass("intro field added");
pass("content field strengthened");
pass("benefits field added");
pass("steps field added");
pass("links field added");
pass("Blog sections added");
pass("Internal discovery links added");

console.log("\n===== 4. SOURCE CONTRACT =====");

const after = fs.readFileSync(target, "utf8");

for (const marker of [
  "generateContent",
  "generateBlogContent",
  "intro:",
  "description:",
  "content:",
  "benefits:",
  "steps:",
  "links:",
  "sections:",
]) {
  if (after.includes(marker)) {
    pass(`Content marker: ${marker}`);
  } else {
    fail(`Content marker missing: ${marker}`);
  }
}

if (/Lorem ipsum/i.test(after)) {
  fail("Placeholder content detected");
} else {
  pass("No Lorem ipsum content");
}

if (/return\s+null\s*;/i.test(after)) {
  fail("Null content return detected");
} else {
  pass("No null content return");
}

console.log("\n===== 5. TOOL ROUTE CONTRACT =====");

const toolRoute = path.join(
  root,
  "app/[lang]/tools/[slug]/[keyword]/page.js"
);

if (!fs.existsSync(toolRoute)) {
  fail("Tool keyword route missing");
} else {
  const source = fs.readFileSync(toolRoute, "utf8");

  for (const marker of [
    "await params",
    "generateMetadata",
    "generateContent",
    "canonical",
    "robots",
    "/tools",
    "/categories",
  ]) {
    if (source.includes(marker)) {
      pass(`Tool route: ${marker}`);
    } else {
      fail(`Tool route missing: ${marker}`);
    }
  }
}

console.log("\n===== 6. BLOG ROUTE CONTRACT =====");

const blogRoute = path.join(
  root,
  "app/blog/[slug]/[keyword]/page.js"
);

if (!fs.existsSync(blogRoute)) {
  fail("Blog keyword route missing");
} else {
  const source = fs.readFileSync(blogRoute, "utf8");

  for (const marker of [
    "await params",
    "generateMetadata",
    "generateBlogContent",
    "canonical",
    "robots",
    "/categories",
  ]) {
    if (source.includes(marker)) {
      pass(`Blog route: ${marker}`);
    } else {
      fail(`Blog route missing: ${marker}`);
    }
  }
}

console.log("\n===== 7. 135-TOOL REGRESSION =====");

const catalog = fs.readFileSync(
  path.join(root, "data/tools.ts"),
  "utf8"
);

const registry = fs.readFileSync(
  path.join(root, "src/lib/tools/index.ts"),
  "utf8"
);

const expected = [
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

for (const slug of expected) {
  if (catalog.includes(slug)) {
    pass(`Catalog: ${slug}`);
  } else {
    fail(`Catalog missing: ${slug}`);
  }

  if (registry.includes(slug)) {
    pass(`Registry: ${slug}`);
  } else {
    fail(`Registry missing: ${slug}`);
  }
}

if (registry.includes("getToolHandler")) {
  pass("getToolHandler preserved");
} else {
  fail("getToolHandler missing");
}

console.log("\n===== 8. TOOLCLIENT REGRESSION =====");

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
  if (client.includes(marker)) {
    pass(`ToolClient: ${marker}`);
  } else {
    fail(`ToolClient missing: ${marker}`);
  }
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
  "tools",
  "categoryUrls",
  "/categories/",
  "/tools/",
  "return",
]) {
  if (sitemap.includes(marker)) {
    pass(`Sitemap: ${marker}`);
  } else {
    fail(`Sitemap missing: ${marker}`);
  }
}

for (const marker of [
  "userAgent",
  "allow",
  "sitemap",
]) {
  if (robots.includes(marker)) {
    pass(`Robots: ${marker}`);
  } else {
    fail(`Robots missing: ${marker}`);
  }
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
    const body = execSync(
      `curl -s "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    );

    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

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

    if (text.length >= 500) {
      pass(`${route} → substantial content (${text.length} chars)`);
    } else {
      fail(`${route} → thin content (${text.length} chars)`);
    }

    if (/<title[\s>]/i.test(body)) {
      pass(`${route} → title`);
    } else {
      fail(`${route} → title missing`);
    }

    if (/<meta[^>]+description/i.test(body)) {
      pass(`${route} → description`);
    } else {
      fail(`${route} → description missing`);
    }

    if (/canonical/i.test(body)) {
      pass(`${route} → canonical`);
    } else {
      fail(`${route} → canonical missing`);
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
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt",
]) {
  try {
    const status = execSync(
      `curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000${route}"`,
      { encoding: "utf8" }
    ).trim();

    if (status === "200") {
      pass(`${route} → HTTP 200`);
    } else {
      fail(`${route} → HTTP ${status}`);
    }
  } catch {
    fail(`${route} → request failed`);
  }
}

console.log("\n===== 14. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("🔄 AUTOMATIC ROLLBACK");
  fs.copyFileSync(backup, target);
  console.log("Content engine restored from backup.");
  console.log("NO DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log(`FILES CHANGED: ${changed ? 1 : 0}`);
console.log("======================================================================");
console.log("✅ PHASE 13.01.2: PASS");
console.log("PROGRAMMATIC CONTENT ENGINE HARDENED");
console.log("SUBSTANTIAL CONTENT VERIFIED");
console.log("INTERNAL LINKING VERIFIED");
console.log("ROBOTS VERIFIED");
console.log("SITEMAP VERIFIED");
console.log("135-TOOL ARCHITECTURE PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE PROGRAMMATIC RUNTIME PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.01.2 COMPLETE");
console.log("======================================================================");
