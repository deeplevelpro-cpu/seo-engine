import { chromium } from "playwright";

const tools = [
  {
    slug: "social-media-caption-generator",
    input: "Launching our new SEO tool today!",
    expected: "Caption",
  },
  {
    slug: "call-to-action-generator",
    input: "Free SEO tools",
    expected: "Call",
  },
  {
    slug: "headline-generator",
    input: "SEO Tools",
    expected: "Headline",
  },
  {
    slug: "blog-title-generator",
    input: "SEO Tools",
    expected: "Title",
  },
  {
    slug: "content-brief-generator",
    input: "SEO Tools Guide",
    expected: "Content",
  },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

let passed = 0;
let failed = 0;

try {
  for (const tool of tools) {
    console.log(`===== ${tool.slug} =====`);

    try {
      await page.goto(
        `http://localhost:3000/tools/${tool.slug}`,
        { waitUntil: "networkidle" }
      );

      console.log("✓ Page loaded");

      const inputs = page.locator(
        'textarea, input:not([type="hidden"])'
      );

      const count = await inputs.count();

      if (count < 1) {
        throw new Error("No input field found");
      }

      await inputs.first().fill(tool.input);

      console.log(`✓ Input entered: ${tool.input}`);
      console.log("✓ Generate button found");

      const generateButton = page.getByRole("button", {
        name: /GENERATE RESULT/i,
      });

      await generateButton.click();

      await page.waitForTimeout(700);

      const resultBox = page.locator(".resultBox");
      const result = await resultBox.innerText();

      console.log("----- RESULT -----");
      console.log(result);
      console.log("------------------");

      if (!result.includes(tool.expected)) {
        throw new Error(
          `Expected "${tool.expected}" not found`
        );
      }

      console.log(
        `✓ Expected result "${tool.expected}" found`
      );

      const clearButton = page.getByRole("button", {
        name: /Clear All/i,
      });

      await clearButton.click();
      await page.waitForTimeout(200);

      console.log("✓ Clear All reset fields");

      passed++;
    } catch (error) {
      failed++;
      console.log(
        `✗ ${tool.slug} FAILED`
      );
      console.log(`Error: ${error.message}`);
    }

    console.log();
  }

  console.log("======================================");
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("======================================");

  if (failed > 0) {
    process.exit(1);
  }

  console.log("✓ SOCIAL / CONTENT REMAINING BATCH: PASS");
} finally {
  await browser.close();
}
