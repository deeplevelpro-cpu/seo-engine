import { chromium } from "playwright";

const tests = [
  {
    slug: "keyword-frequency-checker",
    input: "SEO SEO tools are useful for SEO.",
    expected: "Keyword",
  },
  {
    slug: "canonical-url-generator",
    input: "https://example.com/page",
    expected: "Canonical",
  },
  {
    slug: "open-graph-generator",
    input: "My SEO Tool",
    expected: "Open Graph",
  },
  {
    slug: "twitter-card-generator",
    input: "My SEO Tool",
    expected: "Twitter",
  },
  {
    slug: "faq-schema-generator",
    input: "What is SEO?",
    expected: "FAQ",
  },
  {
    slug: "article-schema-generator",
    input: "SEO Guide",
    expected: "Article",
  },
  {
    slug: "breadcrumb-schema-generator",
    input: "Home > SEO > Tools",
    expected: "Breadcrumb",
  },
  {
    slug: "local-business-schema-generator",
    input: "Ahmad SEO Tools",
    expected: "Local",
  },
  {
    slug: "organization-schema-generator",
    input: "AI Tool Engine",
    expected: "Organization",
  },
  {
    slug: "website-schema-generator",
    input: "AI Tool Engine",
    expected: "Website",
  },
  {
    slug: "seo-slug-generator",
    input: "Best SEO Tools Online",
    expected: "Slug",
  },
  {
    slug: "seo-title-checker",
    input: "Best SEO Tools Online",
    expected: "Title",
  },
  {
    slug: "meta-description-length-checker",
    input: "This is a useful SEO meta description for testing.",
    expected: "Meta",
  },
  {
    slug: "heading-structure-checker",
    input: "# Main Heading\n## Sub Heading",
    expected: "Heading",
  },
  {
    slug: "internal-link-checker",
    input: "https://example.com/page",
    expected: "Link",
  },
  {
    slug: "keyword-placement-checker",
    input: "SEO tools help with SEO optimization.",
    expected: "Keyword",
  },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

let passed = 0;
let failed = 0;

try {
  for (const test of tests) {
    console.log();
    console.log(`===== ${test.slug} =====`);

    try {
      await page.goto(
        `http://localhost:3000/tools/${test.slug}`,
        { waitUntil: "networkidle" }
      );

      console.log("✓ Page loaded");

      const inputs = page.locator(
        'input:not([type="hidden"]), textarea'
      );

      const count = await inputs.count();

      if (count < 1) {
        throw new Error("No usable input field found");
      }

      await inputs.first().fill(test.input);

      console.log(`✓ Input entered: ${test.input}`);

      const generateButton = page.getByRole("button", {
        name: /generate result/i,
      });

      if (await generateButton.count() === 0) {
        throw new Error("Generate button not found");
      }

      console.log("✓ Generate button found");

      await generateButton.click();

      await page.waitForTimeout(800);

      const resultBox = page.locator(".resultBox");
      const result = await resultBox.innerText();

      console.log("----- RESULT -----");
      console.log(result);
      console.log("------------------");

      if (!result.toLowerCase().includes(test.expected.toLowerCase())) {
        throw new Error(
          `Expected "${test.expected}" not found`
        );
      }

      console.log(
        `✓ Expected result "${test.expected}" found`
      );

      const clearButton = page.getByRole("button", {
        name: /clear all/i,
      });

      if (await clearButton.count()) {
        await clearButton.click();
        await page.waitForTimeout(200);
        console.log("✓ Clear All reset fields");
      }

      passed++;
    } catch (error) {
      failed++;
      console.log(`✗ ${test.slug} FAILED`);
      console.log(error.message);
    }
  }

  console.log();
  console.log("======================================");
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("======================================");

  if (failed > 0) {
    process.exit(1);
  }

  console.log("✓ SEO REMAINING BATCH: PASS");
} finally {
  await browser.close();
}
