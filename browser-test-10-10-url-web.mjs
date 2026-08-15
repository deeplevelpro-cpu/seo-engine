import { chromium } from "playwright";

const tests = [
  {
    slug: "mime-type-lookup",
    input: "json",
    expected: "MIME",
  },
  {
    slug: "user-agent-parser",
    input: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    expected: "User Agent",
  },
  {
    slug: "domain-name-parser",
    input: "https://www.example.com/path",
    expected: "Domain",
  },
  {
    slug: "email-link-generator",
    input: "ahmad@example.com",
    expected: "Email",
  },
  {
    slug: "tel-link-generator",
    input: "+923001234567",
    expected: "Tel",
  },
  {
    slug: "anchor-link-generator",
    input: "https://example.com",
    expected: "Anchor",
  },
  {
    slug: "random-number-generator",
    input: "1 100",
    expected: "Random",
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

  console.log("✓ URL / WEB REMAINING BATCH: PASS");
} finally {
  await browser.close();
}
