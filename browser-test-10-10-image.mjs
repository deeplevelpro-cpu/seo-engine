import { chromium } from "playwright";

const tests = [
  {
    slug: "image-to-base64-converter",
    input: "data:image/png;base64,SGVsbG8=",
    expected: "Base64",
  },
  {
    slug: "base64-to-image-converter",
    input: "SGVsbG8=",
    expected: "Image",
  },
  {
    slug: "aspect-ratio-calculator",
    input: "1920 1080",
    expected: "Aspect",
  },
  {
    slug: "image-url-generator",
    input: "https://example.com/image.jpg",
    expected: "Image",
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

  console.log("✓ IMAGE REMAINING BATCH: PASS");
} finally {
  await browser.close();
}
