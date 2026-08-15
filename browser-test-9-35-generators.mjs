import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
});

try {
  const tests = [
    {
      slug: "password-generator",
      expectedTitle: "Generated Password",
      expectedLength: 16,
    },
    {
      slug: "random-string-generator",
      expectedTitle: "Random String",
      expectedLength: 20,
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n===== ${test.slug} =====`);

    const page = await browser.newPage();

    try {
      await page.goto(`http://localhost:3000/tools/${test.slug}`, {
        waitUntil: "networkidle",
      });

      console.log("✓ Page loaded");

      const inputs = page.locator("input, textarea");
      const inputCount = await inputs.count();

      if (inputCount !== 0) {
        throw new Error(
          `Expected zero user-input fields, found ${inputCount}`
        );
      }

      console.log("✓ Zero-input generator confirmed");

      const generateButton = page.locator(".generateBtn");

      if (await generateButton.count() !== 1) {
        throw new Error("Expected exactly one Generate button");
      }

      console.log("✓ Generate button found");

      await generateButton.click();
      await page.waitForTimeout(700);

      const body = await page.locator("body").innerText();

      if (
        body.includes("Application error") ||
        body.includes("Unhandled Runtime Error")
      ) {
        throw new Error("Application/runtime error detected");
      }

      if (!body.includes(test.expectedTitle)) {
        throw new Error(
          `Expected result title "${test.expectedTitle}" not found`
        );
      }

      console.log(`✓ ${test.expectedTitle} generated`);

      const resultBoxText = await page.locator(".resultBox pre").innerText();

      // The result box contains the handler title followed by the generated value.
      // Extract the actual generated value from the final non-empty line.
      const resultLines = resultBoxText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      const resultText = resultLines.at(-1) ?? "";

      console.log(`Generated output: ${resultText}`);

      if (resultText.length !== test.expectedLength) {
        throw new Error(
          `Expected generated output length ${test.expectedLength}, got ${resultText.length}`
        );
      }

      console.log(
        `✓ Generated output length is exactly ${test.expectedLength} characters`
      );

      const clearButton = page.getByRole("button", {
        name: /clear all/i,
      });

      await clearButton.click();

      const afterClear = await page.locator(".resultBox").innerText();

      if (afterClear.includes(resultText)) {
        throw new Error("Clear All did not clear generated result");
      }

      console.log("✓ Clear All reset generated result");

      passed++;
    } catch (error) {
      console.error(`✗ ${test.slug} FAILED`);
      console.error(error);
      failed++;
    } finally {
      await page.close();
    }
  }

  console.log("\n======================================");
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("======================================");

  if (failed > 0) {
    process.exit(1);
  }

  console.log("✓ GENERATOR LIVE BROWSER TEST: PASS");
} finally {
  await browser.close();
}
