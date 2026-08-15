import fs from "fs";
import path from "path";
import http from "http";
import https from "https";

const root = process.cwd();
let failed = 0;

const check = (name, ok) => {
  if (ok) console.log(`✓ ${name}`);
  else {
    console.log(`✗ ${name}`);
    failed++;
  }
};

const fetchPage = (url) =>
  new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;

    const req = client.get(url, {
      headers: {
        "User-Agent": "SEO-Engine-Visual-QA/1.0"
      }
    }, res => {
      let data = "";

      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        resolve({
          status: res.statusCode || 0,
          html: data
        });
      });
    });

    req.setTimeout(10000, () => {
      req.destroy(new Error("timeout"));
    });

    req.on("error", reject);
  });

const exists = f => fs.existsSync(path.join(root, f));
const read = f => fs.readFileSync(path.join(root, f), "utf8");

console.log("======================================================================");
console.log("PHASE 14.05 — VISUAL QA + LIVE DESIGN + DEPLOYMENT READINESS");
console.log("LIGHT UI + NAVIGATION + CORE ROUTES + SEO PRESERVATION");
console.log("NO FILE MODIFICATION");
console.log("======================================================================");

console.log("\n===== 1. DESIGN SYSTEM =====");

const css = read("app/globals.css");

check("Light background", /--bg:\s*#f7faff/i.test(css));
check("White surface", /--surface:\s*#ffffff/i.test(css));
check("Blue accent", /--blue:\s*#4f7cff/i.test(css));
check("Purple accent", /--purple:\s*#8b5cf6/i.test(css));
check("Soft grey border", /--border:\s*#dfe7f3/i.test(css));
check("Readable base font", /font-size:\s*16px/i.test(css));

console.log("\n===== 2. HOMEPAGE =====");

const home = read("app/page.tsx");

check("Homepage exists", exists("app/page.tsx"));
check("Navigation exists", /<nav>/i.test(home));
check("Home link", /href="\/"/i.test(home));
check("Tools link", /href="\/tools"/i.test(home));
check("Categories link", /href="\/categories"/i.test(home));
check("Blog link", /href="\/blog"/i.test(home));
check("Contact link", /href="\/contact"/i.test(home));
check("Hero exists", /<h1>/i.test(home));
check("Featured tools", /FEATURED TOOLS/i.test(home));
check("Tool cards", /className=.*tool/i.test(home));

console.log("\n===== 3. PROTECTED SEO FOUNDATION =====");

[
  "data/tools.ts",
  "src/lib/tools/index.ts",
  "src/lib/contentGenerator.js",
  "src/lib/seo/keywordExpansion.js",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/[lang]/tools/[slug]/[keyword]/page.js",
  "app/blog/[slug]/[keyword]/page.js"
].forEach(f => check(`Protected: ${f}`, exists(f)));

console.log("\n===== 4. CORE PAGE STRUCTURE =====");

[
  "app/tools/page.tsx",
  "app/categories/page.tsx",
  "app/blog/page.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
  "app/posts/page.tsx",
  "app/privacy-policy/page.tsx",
  "app/terms/page.tsx"
].forEach(f => check(`Page exists: ${f}`, exists(f)));

console.log("\n===== 5. LIVE SERVER =====");

let base = "http://localhost:3000";

let serverReady = false;

try {
  const r = await fetchPage(base);
  serverReady = r.status >= 200 && r.status < 500;
  check("Local server reachable", serverReady);
} catch {
  check("Local server reachable", false);
}

if (serverReady) {
  console.log("\n===== 6. LIVE CORE ROUTES =====");

  const routes = [
    "/",
    "/tools",
    "/categories",
    "/blog",
    "/about",
    "/contact",
    "/posts",
    "/privacy-policy",
    "/terms",
    "/sitemap.xml",
    "/robots.txt"
  ];

  for (const route of routes) {
    try {
      const r = await fetchPage(base + route);
      check(
        `${route} → HTTP ${r.status}`,
        r.status >= 200 && r.status < 400
      );

      if (route !== "/sitemap.xml" && route !== "/robots.txt") {
        check(
          `${route} → HTML`,
          /<html|<!DOCTYPE/i.test(r.html)
        );
      }
    } catch {
      check(`${route} → reachable`, false);
    }
  }

  console.log("\n===== 7. LIVE DESIGN SIGNALS =====");

  try {
    const r = await fetchPage(base + "/");

    check(
      "Homepage contains light theme",
      /#f7faff|#ffffff|#4f7cff/i.test(r.html)
    );

    check(
      "Homepage contains navigation",
      /href="\/tools"|href="\/categories"/i.test(r.html)
    );

    check(
      "Homepage contains hero",
      /Simple SEO tools|SEO TOOLS/i.test(r.html)
    );

    check(
      "Homepage not blank",
      r.html.length > 5000
    );

    check(
      "No obvious Lorem ipsum",
      !/lorem ipsum/i.test(r.html)
    );
  } catch {
    check("Homepage visual fetch", false);
  }

  console.log("\n===== 8. LIVE SEO CORE =====");

  try {
    const r = await fetchPage(base + "/sitemap.xml");

    check(
      "Sitemap has tools",
      /tools/i.test(r.html)
    );

    check(
      "Sitemap has categories",
      /categories/i.test(r.html)
    );
  } catch {
    check("Sitemap live verification", false);
  }

  try {
    const r = await fetchPage(base + "/robots.txt");

    check(
      "Robots User-agent",
      /user-agent/i.test(r.html)
    );

    check(
      "Robots Allow",
      /allow/i.test(r.html)
    );

    check(
      "Robots Sitemap",
      /sitemap/i.test(r.html)
    );
  } catch {
    check("Robots live verification", false);
  }
} else {
  console.log("\n⚠ Local server unavailable");
  console.log("Skipping live HTTP checks.");
  console.log("Source/build checks remain valid.");
}

console.log("\n===== 9. BUILD SAFETY =====");

try {
  const { execSync } = await import("child_process");

  execSync("node --check src/lib/contentGenerator.js", {
    cwd: root,
    stdio: "inherit"
  });

  execSync("node --check src/lib/seo/keywordExpansion.js", {
    cwd: root,
    stdio: "inherit"
  });

  execSync(
    "node --check 'app/[lang]/tools/[slug]/[keyword]/page.js'",
    { cwd: root, stdio: "inherit" }
  );

  execSync(
    "node --check 'app/blog/[slug]/[keyword]/page.js'",
    { cwd: root, stdio: "inherit" }
  );

  console.log("✓ Critical JavaScript syntax PASS");
} catch {
  console.log("✗ Critical JavaScript syntax FAIL");
  failed++;
}

console.log("\n======================================================================");
console.log("PHASE 14.05 FINAL DECISION");
console.log("======================================================================");

if (failed > 0) {
  console.log(`FAILED CHECKS: ${failed}`);
  console.log("❌ PHASE 14.05: FAIL");
  console.log("DO NOT DEPLOY YET.");
  process.exit(1);
}

console.log("FAILED CHECKS: 0");
console.log("======================================================================");
console.log("✅ PHASE 14.05: PASS");
console.log("VISUAL DESIGN FOUNDATION PASS");
console.log("LIGHT THEME PASS");
console.log("NAVIGATION PASS");
console.log("CORE ROUTES PASS");
console.log("SEO FOUNDATION PRESERVED");
console.log("SITEMAP / ROBOTS PASS");
console.log("CRITICAL SYNTAX PASS");
console.log("======================================================================");
console.log("🚀 READY FOR FINAL LIVE DEPLOYMENT");
console.log("======================================================================");
