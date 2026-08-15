import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
});

const tests = [
  {
    slug: "percentage-calculator",
    fields: ["100", "20"],
    expected: "20",
  },
  {
    slug: "age-calculator",
    fields: ["2000-01-01"],
    expected: "years",
  },
  {
    slug: "date-difference-calculator",
    fields: ["2026-01-01", "2026-01-31"],
    expected: "30 days",
  },
  {
    slug: "time-difference-calculator",
    fields: ["10:30", "12:45"],
    expected: "2 hours 15 minutes",
  },
  {
    slug: "compound-interest-calculator",
    fields: ["1000", "10", "1", "2"],
    expected: "1210.00",
  },
  {
    slug: "list-randomizer",
    fields: ["Ahmad\nAli\nUsman"],
    expected: "Ahmad",
  },
  {
    slug: "checklist-generator",
    fields: ["Study\nPractice\nReview"],
    expected: "Study",
  },
  {
    slug: "word-counter",
    fields: ["This is a simple test sentence."],
    expected: "Words",
  },
  {
    slug: "character-counter",
    fields: ["Hello World"],
    expected: "Characters",
  },
  {
    slug: "json-formatter",
    fields: ['{"name":"Ahmad","age":20}'],
    expected: "JSON",
  },
  {
    slug: "password-generator",
    fields: ["generate password"],
    expected: "Password",
  },
  {
    slug: "random-string-generator",
    fields: ["generate string"],
    expected: "Random",
  },
  {
    slug: "keyword-density-checker",
    fields: ["seo tools are useful seo tools", "seo tools"],
    expected: "Keyword",
  },
];

try {
  const page = await browser.newPage();

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n===== ${test.slug} =====`);

    try {
      await page.goto(`http://localhost:3000/tools/${test.slug}`, {
        waitUntil: "networkidle",
      });

      console.log("✓ Page loaded");

      const generatorTool =
        test.slug === "password-generator" ||
        test.slug === "random-string-generator";

      const inputs = page.locator("input, textarea");
      const count = await inputs.count();

      if (!generatorTool) {
        if (count !== test.fields.length) {
          throw new Error(
            `Expected ${test.fields.length} fields, found ${count}`
          );
        }

        for (let i = 0; i < test.fields.length; i++) {
          await inputs.nth(i).fill(test.fields[i]);
        }

        console.log(`✓ ${count} input field(s) accepted values`);
      } else {
        console.log("✓ Generator correctly tested without required user input");
      }

      const generateButton = page.getByRole("button", {
        name: /generate result/i,
      });

      if (await generateButton.count() === 0) {
        throw new Error("Generate button not found");
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

      if (!body.includes(test.expected)) {
        throw new Error(
          `Expected result containing "${test.expected}" not found`
        );
      }

      console.log(`✓ Expected result "${test.expected}" found`);

      const clearButton = page.getByRole("button", {
        name: /clear all/i,
      });

      await clearButton.click();

      const values = await page.locator("input, textarea").evaluateAll(
        elements => elements.map(element => element.value)
      );

      if (values.some(value => value !== "")) {
        throw new Error("Clear All did not reset every field");
      }

      console.log("✓ Clear All reset fields");

      passed++;
    } catch (error) {
      console.error(`✗ ${test.slug} FAILED`);
      console.error(error);
      failed++;
    }
  }

  console.log("\n======================================");
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("======================================");

  if (failed > 0) {
    console.log("✗ FINAL UNIVERSAL UI REGRESSION: FAILED");
    process.exit(1);
  }

  console.log("✓ FINAL UNIVERSAL UI REGRESSION: PASS");
} finally {
  await browser.close();
}
