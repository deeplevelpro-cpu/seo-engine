import { chromium } from "playwright";

const tests = [
  {
    slug: "remove-duplicate-lines",
    input: "apple\nbanana\napple\norange\nbanana",
    expected: "apple",
  },
  {
    slug: "remove-empty-lines",
    input: "apple\n\nbanana\n\norange",
    expected: "apple",
  },
  {
    slug: "line-counter",
    input: "one\ntwo\nthree",
    expected: "Lines",
  },
  {
    slug: "word-frequency-counter",
    input: "SEO tools SEO tools are useful",
    expected: "Word",
  },
  {
    slug: "text-sorter",
    input: "banana\napple\norange",
    expected: "Sorted",
  },
  {
    slug: "lorem-ipsum-generator",
    input: "2",
    expected: "Lorem",
  },
  {
    slug: "text-cleaner",
    input: "  Hello   world  ",
    expected: "Clean",
  },
  {
    slug: "duplicate-word-finder",
    input: "hello world hello test world",
    expected: "Duplicate",
  },
  {
    slug: "palindrome-checker",
    input: "level",
    expected: "Palindrome",
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

  console.log("✓ TEXT REMAINING BATCH: PASS");
} finally {
  await browser.close();
}
