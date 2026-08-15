import { chromium } from "playwright";

const tools = [
  {
    slug: "number-to-words-converter",
    input: "123",
    expected: "one hundred",
  },
  {
    slug: "words-to-number-converter",
    input: "one hundred twenty three",
    expected: "123",
  },
  {
    slug: "binary-to-decimal-converter",
    input: "1010",
    expected: "Decimal",
  },
  {
    slug: "decimal-to-binary-converter",
    input: "10",
    expected: "Binary",
  },
  {
    slug: "hex-to-decimal-converter",
    input: "FF",
    expected: "Decimal",
  },
  {
    slug: "decimal-to-hex-converter",
    input: "255",
    expected: "Hex",
  },
  {
    slug: "roman-numeral-converter",
    input: "XLII",
    expected: "42",
  },
  {
    slug: "character-limit-calculator",
    fields: [
      { index: 0, value: "10" },
      { index: 1, value: "Hello world" },
    ],
    expected: "Character",
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

      if (tool.fields) {
        for (const field of tool.fields) {
          await inputs.nth(field.index).fill(field.value);
        }

        console.log(
          `✓ ${tool.fields.length} input field(s) filled`
        );
      } else {
        await inputs.first().fill(tool.input);
        console.log(`✓ Input entered: ${tool.input}`);
      }

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
      console.log(`✗ ${tool.slug} FAILED`);
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

  console.log("✓ NUMBER + CALCULATOR BATCH: PASS");
} finally {
  await browser.close();
}
