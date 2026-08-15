import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
});

const tests = [
  {
    slug: "uuid-generator",
    fields: [],
    expected: "UUID",
    zeroInput: true,
  },
  {
    slug: "keyword-placement-checker",
    fields: [
      "SEO tools are useful for SEO beginners.",
      "SEO",
    ],
    expected: "Keyword",
  },
  {
    slug: "find-and-replace-text",
    fields: [
      "Hello world. Hello Ahmad.",
      "Hello",
      "Hi",
    ],
    expected: "Hi",
  },
  {
    slug: "regex-tester",
    fields: [
      "hello 123 world",
      "\\d+",
    ],
    expected: "Regex",
  },
  {
    slug: "anchor-link-generator",
    fields: [
      "https://example.com",
      "Visit Example",
    ],
    expected: "example.com",
  },
  {
    slug: "hmac-generator",
    fields: [
      "hello world",
      "secret",
    ],
    expected: "HMAC",
  },
];

try {
  const page = await browser.newPage();

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n===== ${test.slug} =====`);

    try {
      await page.goto(
        `http://localhost:3000/tools/${test.slug}`,
        { waitUntil: "networkidle" }
      );

      console.log("✓ Page loaded");

      const inputs = page.locator("input, textarea");
      const count = await inputs.count();

      if (test.zeroInput) {
        if (count !== 0) {
          throw new Error(
            `Expected zero inputs, found ${count}`
          );
        }

        console.log("✓ Zero-input tool confirmed");
      } else {
        if (count !== test.fields.length) {
          throw new Error(
            `Expected ${test.fields.length} fields, found ${count}`
          );
        }

        for (let i = 0; i < test.fields.length; i++) {
          await inputs.nth(i).fill(test.fields[i]);
        }

        console.log(
          `✓ ${count} input field(s) accepted values`
        );
      }

      const generateButton = page.getByRole("button", {
        name: /generate result/i,
      });

      if (await generateButton.count() === 0) {
        throw new Error("Generate button not found");
      }

      await generateButton.click();

      await page.waitForTimeout(700);

      const body = await page.locator("body").innerText();

      if (
        body.includes("Application error") ||
        body.includes("Unhandled Runtime Error")
      ) {
        throw new Error(
          "Application/runtime error detected"
        );
      }

      if (!body.includes(test.expected)) {
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

      await clearButton.click();

      await page.waitForTimeout(200);

      const values = await page
        .locator("input, textarea")
        .evaluateAll((elements) =>
          elements.map((element) => element.value)
        );

      if (values.some((value) => value !== "")) {
        throw new Error(
          "Clear All did not reset every input"
        );
      }

      console.log("✓ Clear All reset fields");

      passed++;
    } catch (error) {
      console.error(
        `✗ ${test.slug} FAILED`
      );
      console.error(error);
      failed++;
    }
  }

  console.log("\n======================================");
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("======================================");

  if (failed > 0) {
    process.exit(1);
  }

  console.log(
    "✓ SPECIALIZED TOOLS BROWSER TEST: PASS"
  );
} finally {
  await browser.close();
}
