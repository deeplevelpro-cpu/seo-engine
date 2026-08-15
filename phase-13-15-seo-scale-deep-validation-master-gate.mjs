import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import http from "http";

const root = process.cwd();
let failed = 0;

const exists = p => fs.existsSync(path.join(root, p));
const read = p => fs.readFileSync(path.join(root, p), "utf8");

const check = (name, ok, detail = "") => {
  if (ok) {
    console.log(`✓ ${name}${detail ? ` — ${detail}` : ""}`);
  } else {
    console.log(`✗ ${name}${detail ? ` — ${detail}` : ""}`);
    failed++;
  }
};

const run = (cmd, label) => {
  try {
    execSync(cmd, {
      cwd: root,
      stdio: "inherit",
      env: {
        ...process.env,
        NEXT_DISABLE_TURBOPACK: "1"
      }
    });
    console.log(`✓ ${label}`);
  } catch {
    console.log(`✗ ${label}`);
    failed++;
  }
};

const fetchLocal = pathName =>
  new Promise((resolve, reject) => {
    const req = http.get(
      {
        hostname: "127.0.0.1",
        port: 3000,
        path: pathName,
        timeout: 10000,
        headers: {
          "User-Agent": "Phase-13.15-SEO-QA"
        }
      },
      res => {
        let body = "";

        res.setEncoding("utf8");

        res.on("data", chunk => {
          body += chunk;
        });

        res.on("end", () => {
          resolve({
            status: res.statusCode || 0,
            body,
            headers: res.headers
          });
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error("timeout"));
    });

    req.on("error", reject);
  });

const normalize = value =>
  String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

console.log("======================================================================");
console.log("PHASE 13.15 — SEO SCALE DEEP VALIDATION MASTER GATE");
console.log("KEYWORD OUTPUT + CONTENT UNIQUENESS + METADATA + RUNTIME");
console.log("SITEMAP + ROBOTS + ROUTES + FOUNDATION + BUILD");
console.log("NO HOMEPAGE CHANGE | NO MASS PAGE GENERATION | NO DEPLOY");
console.log("======================================================================");

console.log("\n===== 1. FOUNDATION LOCK =====");

[
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "src/lib/contentGenerator.js",
  "src/lib/seo/keywordExpansion.js",
  "app/[lang]/tools/[slug]/[keyword]/page.js",
  "app/blog/[slug]/[keyword]/page.js",
  "app/tools/[slug]/ToolClient.tsx",
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/categories/[category]/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "next.config.ts",
  "tsconfig.json",
  "package.json"
].forEach(f => check(`Foundation: ${f}`, exists(f)));

console.log("\n===== 2. CONTENT ENGINE CONTRACT =====");

const content = read("src/lib/contentGenerator.js");

[
  "generateContent",
  "generateBlogContent",
  "primary",
  "secondary",
  "longTail",
  "intent",
  "intro",
  "content",
  "benefits",
  "steps",
  "links",
  "sections",
  "semanticExpansion"
].forEach(x => check(`Content contract: ${x}`, content.includes(x)));

check("Content has no Lorem ipsum", !/lorem ipsum/i.test(content));

console.log("\n===== 3. KEYWORD EXPANSION ENGINE =====");

const expansion = read("src/lib/seo/keywordExpansion.js");

[
  "buildControlledKeywordExpansion",
  "filterKeywordExpansion",
  "primary",
  "secondary",
  "longTail",
  "intent",
  "toolSlug",
  "blogSlug"
].forEach(x => check(`Expansion contract: ${x}`, expansion.includes(x)));

check(
  "Numbered keyword expansion blocked",
  !/word-counter-\d+|keyword-density-\d+|free-online-tool-\d+|tool-\d+|slug-\d+/i.test(
    expansion
  )
);

check(
  "Duplicate protection present",
  /duplicate|unique/i.test(expansion)
);

check(
  "Collision protection present",
  /collision/i.test(expansion)
);

check(
  "Intent support present",
  /intent/i.test(expansion)
);

console.log("\n===== 4. ACTUAL KEYWORD ENGINE EXECUTION =====");

try {
  const mod = await import(
    new URL(
      "./src/lib/seo/keywordExpansion.js",
      import.meta.url
    )
  );

  const fn =
    mod.buildControlledKeywordExpansion ||
    mod.default?.buildControlledKeywordExpansion;

  check(
    "Expansion function importable",
    typeof fn === "function"
  );

  if (typeof fn === "function") {
    const samples = [
      "word-counter",
      "seo-slug-generator",
      "keyword-density-checker",
      "meta-description-generator"
    ];

    const outputs = [];

    for (const slug of samples) {
      try {
        const result = fn(slug);

        check(
          `Expansion output: ${slug}`,
          !!result && typeof result === "object"
        );

        if (result && typeof result === "object") {
          const primary = Array.isArray(result.primary)
            ? result.primary
            : [];

          const secondary = Array.isArray(result.secondary)
            ? result.secondary
            : [];

          const longTail = Array.isArray(result.longTail)
            ? result.longTail
            : [];

          const all = [
            ...primary,
            ...secondary,
            ...longTail
          ]
            .map(x => String(x).trim().toLowerCase())
            .filter(Boolean);

          outputs.push(...all);

          check(
            `${slug}: no duplicate variants`,
            new Set(all).size === all.length
          );

          check(
            `${slug}: no numbered variants`,
            !all.some(x =>
              /(?:word-counter|keyword-density|free-online-tool|tool|slug)-\d+$/i.test(
                x
              )
            )
          );

          check(
            `${slug}: semantic variants exist`,
            all.length > 0
          );
        }
      } catch (error) {
        console.log(
          `✗ Expansion execution: ${slug} — ${error.message}`
        );
        failed++;
      }
    }

    check(
      "Cross-tool keyword collision safety",
      new Set(outputs).size === outputs.length
    );
  }
} catch (error) {
  console.log(`✗ Expansion import failed — ${error.message}`);
  failed++;
}

console.log("\n===== 5. PROGRAMMATIC TOOL ROUTE =====");

const toolRoute = read(
  "app/[lang]/tools/[slug]/[keyword]/page.js"
);

[
  "await params",
  "cleanKeyword",
  "cleanSlug",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "content?.intro",
  "content?.content",
  "content?.benefits",
  "content?.steps",
  "content?.links",
  'href="/tools"',
  'href="/categories"'
].forEach(x =>
  check(`Tool route: ${x}`, toolRoute.includes(x))
);

console.log("\n===== 6. PROGRAMMATIC BLOG ROUTE =====");

const blogRoute = read(
  "app/blog/[slug]/[keyword]/page.js"
);

[
  "await params",
  "cleanKeyword",
  "cleanSlug",
  "generateMetadata",
  "canonical",
  "robots",
  "openGraph",
  "twitter",
  "content?.intro",
  "content?.content",
  "content?.sections",
  "content?.links",
  'href="/tools"',
  'href="/categories"'
].forEach(x =>
  check(`Blog route: ${x}`, blogRoute.includes(x))
);

console.log("\n===== 7. INTERNAL SEO GRAPH =====");

check(
  "Tool → /tools",
  toolRoute.includes('href="/tools"')
);

check(
  "Tool → /categories",
  toolRoute.includes('href="/categories"')
);

check(
  "Blog → /tools",
  blogRoute.includes('href="/tools"')
);

check(
  "Blog → /categories",
  blogRoute.includes('href="/categories"')
);

console.log("\n===== 8. SITEMAP + ROBOTS =====");

const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");

[
  "MetadataRoute.Sitemap",
  "tools",
  "categoryUrls",
  "return"
].forEach(x =>
  check(`Sitemap contract: ${x}`, sitemap.includes(x))
);

[
  "userAgent",
  "allow",
  "sitemap"
].forEach(x =>
  check(`Robots contract: ${x}`, robots.includes(x))
);

console.log("\n===== 9. 135-TOOL FOUNDATION REGRESSION =====");

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
].forEach(slug => {
  check(
    `Catalog: ${slug}`,
    catalog.includes(slug)
  );

  check(
    `Registry: ${slug}`,
    registry.includes(slug)
  );
});

console.log("\n===== 10. TOOLCLIENT PROTECTION =====");

const client = read(
  "app/tools/[slug]/ToolClient.tsx"
);

[
  'aria-label="Tool input"',
  "spellCheck={false}",
  "useState",
  "setText",
  "setResult",
  "setLoading",
  "inputSchema",
  "getToolHandler",
  "aria-live"
].forEach(x =>
  check(`ToolClient: ${x}`, client.includes(x))
);

console.log("\n===== 11. STALE ARCHITECTURE =====");

[
  "src/data/tools.ts",
  "app/tools/case-converter/page.js",
  "app/tools/text-to-slug/page.js",
  "app/text-to-slug/page.js",
  "app/text-to-slug/SlugTool.js",
  "public/robots.txt",
  "public/sitemap.xml"
].forEach(f =>
  check(`Stale absent: ${f}`, !exists(f))
);

console.log("\n===== 12. HOMEPAGE PROTECTION =====");

const homepage =
  exists("app/page.tsx")
    ? read("app/page.tsx")
    : exists("app/page.js")
      ? read("app/page.js")
      : "";

check(
  "Homepage exists",
  homepage.length > 0
);

check(
  "Homepage not touched by SEO keyword engine",
  !/buildControlledKeywordExpansion|semanticExpansion/i.test(homepage)
);

console.log("\n===== 13. MASS ROUTE SAFETY =====");

check(
  "No generateStaticParams keyword explosion",
  !/generateStaticParams[\s\S]{0,1200}(keyword|longTail|secondary|semanticExpansion)/i.test(
    toolRoute
  )
);

check(
  "No numbered route generation",
  !/for\s*\([^)]*\)[\s\S]{0,600}(keyword|slug)[\s\S]{0,600}\+\s*\d+/i.test(
    toolRoute
  )
);

console.log("\n===== 14. SYNTAX =====");

run(
  "node --check src/lib/contentGenerator.js",
  "Content syntax"
);

run(
  "node --check src/lib/seo/keywordExpansion.js",
  "Expansion syntax"
);

run(
  "node --check 'app/[lang]/tools/[slug]/[keyword]/page.js'",
  "Tool route syntax"
);

run(
  "node --check 'app/blog/[slug]/[keyword]/page.js'",
  "Blog route syntax"
);

console.log("\n===== 15. TYPESCRIPT =====");

run(
  "npx tsc --noEmit",
  "TypeScript"
);

console.log("\n===== 16. PRODUCTION BUILD =====");

run(
  "npm run build",
  "Production build"
);

console.log("\n===== 17. LIVE RUNTIME =====");

let live = false;

try {
  const home = await fetchLocal("/");
  live = true;

  check(
    "LIVE / → HTTP 200",
    home.status === 200
  );

  const tools = await fetchLocal("/tools");

  check(
    "LIVE /tools → HTTP 200",
    tools.status === 200
  );

  const categories = await fetchLocal("/categories");

  check(
    "LIVE /categories → HTTP 200",
    categories.status === 200
  );

  const blog = await fetchLocal("/blog");

  check(
    "LIVE /blog → HTTP 200",
    blog.status === 200
  );

  const sitemapLive = await fetchLocal("/sitemap.xml");

  check(
    "LIVE /sitemap.xml → HTTP 200",
    sitemapLive.status === 200
  );

  const robotsLive = await fetchLocal("/robots.txt");

  check(
    "LIVE /robots.txt → HTTP 200",
    robotsLive.status === 200
  );

  console.log("\n===== 18. LIVE TOOL SEO SAMPLE =====");

  const toolSamples = [
    "/en/tools/word-counter/test",
    "/en/tools/seo-slug-generator/test",
    "/en/tools/keyword-density-checker/test"
  ];

  for (const route of toolSamples) {
    const r = await fetchLocal(route);
    const body = r.body || "";

    check(
      `${route} → HTTP content`,
      r.status >= 200 && r.status < 400
    );

    check(
      `${route} → H1`,
      /<h1[\s\S]*?<\/h1>/i.test(body)
    );

    check(
      `${route} → title`,
      /<title[\s\S]*?<\/title>/i.test(body)
    );

    check(
      `${route} → meta description`,
      /<meta[^>]+name=["']description["'][^>]*>/i.test(body)
    );

    check(
      `${route} → canonical`,
      /<link[^>]+rel=["']canonical["'][^>]*>/i.test(body)
    );

    const text = normalize(body);

    check(
      `${route} → substantial content`,
      text.length >= 500
    );

    check(
      `${route} → /tools link`,
      body.includes('href="/tools"')
    );

    check(
      `${route} → /categories link`,
      body.includes('href="/categories"')
    );
  }

  console.log("\n===== 19. LIVE SITEMAP / ROBOTS CONTENT =====");

  const sm = await fetchLocal("/sitemap.xml");
  const rb = await fetchLocal("/robots.txt");

  check(
    "Sitemap contains /tools/",
    /\/tools\//i.test(sm.body)
  );

  check(
    "Sitemap contains /categories/",
    /\/categories\//i.test(sm.body)
  );

  check(
    "Robots User-Agent",
    /User-Agent/i.test(rb.body)
  );

  check(
    "Robots Allow",
    /Allow/i.test(rb.body)
  );

  check(
    "Robots Sitemap",
    /Sitemap/i.test(rb.body)
  );
} catch (error) {
  console.log(`✗ LIVE runtime unavailable — ${error.message}`);
  failed++;
}

console.log("\n===== 20. FINAL DECISION =====");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("❌ PHASE 13.15: FAIL");
  console.log("STOP — DO NOT DEPLOY.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 13.15: PASS");
console.log("KEYWORD OUTPUT VERIFIED");
console.log("SEMANTIC VARIANTS VERIFIED");
console.log("DUPLICATE + COLLISION SAFETY VERIFIED");
console.log("PROGRAMMATIC TOOL SEO VERIFIED");
console.log("PROGRAMMATIC BLOG SEO VERIFIED");
console.log("METADATA CONTRACT VERIFIED");
console.log("INTERNAL SEO GRAPH VERIFIED");
console.log("SITEMAP + ROBOTS VERIFIED");
console.log("135-TOOL FOUNDATION PRESERVED");
console.log("TOOLCLIENT PRESERVED");
console.log("STALE ARCHITECTURE CLEAN");
console.log("HOMEPAGE PROTECTED");
console.log("TYPESCRIPT PASS");
console.log("PRODUCTION BUILD PASS");
console.log("LIVE RUNTIME PASS");
console.log("======================================================================");
console.log("🚀 PHASE 13.15 COMPLETE — DEEP SEO SCALE VALIDATION LOCKED");
console.log("======================================================================");
