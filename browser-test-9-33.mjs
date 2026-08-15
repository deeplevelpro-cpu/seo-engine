import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
});

try {
  const page = await browser.newPage();

  const tests = [
    {
      slug: "age-calculator",
      fields: [
        { label: "Date of Birth", value: "2000-01-01" },
      ],
      expected: "years",
    },
    {
      slug: "date-difference-calculator",
      fields: [
        { label: "Start Date", value: "2026-01-01" },
        { label: "End Date", value: "2026-01-31" },
      ],
      expected: "30 days",
    },
    {
      slug: "time-difference-calculator",
      fields: [
        { label: "Start Time", value: "10:30" },
        { label: "End Time", value: "12:45" },
      ],
      expected: "2 hours 15 minutes",
    },
    {
      slug: "compound-interest-calculator",
      fields: [
        { label: "Principal", value: "1000" },
        { label: "Annual Interest Rate (%)", value: "10" },
        { label: "Compounds Per Year", value: "1" },
        { label: "Years", value: "2" },
      ],
      expected: "1210.00",
    },
    {
      slug: "list-randomizer",
      fields: [
        {
          label: "List",
          value: "Ahmad\nAli\nUsman",
        },
      ],
      expected: "Ahmad",
    },
    {
      slug: "checklist-generator",
      fields: [
        {
          label: "Checklist Items",
          value: "Study\nPractice\nReview",
        },
      ],
      expected: "Study",
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    console.log(`\n===== ${test.slug} =====`);

    await page.goto(`http://localhost:3000/tools/${test.slug}`, {
      waitUntil: "networkidle",
    });

    console.log("✓ Page loaded");

    const inputs = page.locator("input, textarea");
    const count = await inputs.count();

    console.log(`Inputs detected: ${count}`);

    if (count !== test.fields.length) {
      throw new Error(
        `Expected ${test.fields.length} inputs, found ${count}`
      );
    }

    for (let i = 0; i < test.fields.length; i++) {
      const field = inputs.nth(i);

      await field.fill(test.fields[i].value);

      const actual = await field.inputValue();

      if (actual !== test.fields[i].value) {
        throw new Error(
          `Field "${test.fields[i].label}" did not accept expected value`
        );
      }

      console.log(`✓ ${test.fields[i].label}`);
    }

    await page.getByRole("button", {
      name: /generate result/i,
    }).click();

    await page.waitForTimeout(700);

    const bodyText = await page.locator("body").innerText();

    if (!bodyText.includes(test.expected)) {
      throw new Error(
        `Expected "${test.expected}" not found in result`
      );
    }

    console.log(`✓ Expected result "${test.expected}" found`);

    passed++;
  }

  console.log("\n======================================");
  console.log(`PASSED: ${passed}`);
  console.log(`FAILED: ${failed}`);
  console.log("======================================");

  if (failed > 0) {
    process.exit(1);
  }

  console.log("✓ MULTI-INPUT BROWSER TEST: PASS");
} catch (error) {
  console.error("\n✗ BROWSER TEST FAILED");
  console.error(error);
  process.exit(1);
} finally {
  await browser.close();
}
