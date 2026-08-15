import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});

const page = await browser.newPage();

try {
  console.log("===== OPEN PAGE =====");

  await page.goto(
    "http://localhost:3000/tools/percentage-calculator",
    { waitUntil: "networkidle" }
  );

  console.log("✓ Page loaded");

  console.log("===== CHECK INPUTS =====");

  const inputs = await page.locator("input").count();
  console.log(`Inputs found: ${inputs}`);

  if (inputs < 2) {
    throw new Error(`Expected at least 2 inputs, found ${inputs}`);
  }

  console.log("✓ Calculator inputs present");

  console.log("===== ENTER VALUES =====");

  await page.locator('input[type="number"]').nth(0).fill("100");
  await page.locator('input[type="number"]').nth(1).fill("20");

  console.log("✓ Value = 100");
  console.log("✓ Percentage = 20");

  console.log("===== GENERATE RESULT =====");

  await page.getByRole("button", {
    name: /generate result/i,
  }).click();

  await page.waitForTimeout(700);

  const bodyText = await page.locator("body").innerText();

  if (!bodyText.includes("20")) {
    throw new Error("Expected result containing 20 was not found");
  }

  console.log("✓ Result generated");
  console.log("✓ Expected value 20 found");

  console.log("===== CLEAR =====");

  await page.getByRole("button", {
    name: /clear all/i,
  }).click();

  const values = await page.locator("input").evaluateAll(
    els => els.map(el => el.value)
  );

  console.log("Input values after Clear:", values);

  if (values.some(value => value !== "")) {
    throw new Error("Clear All did not reset every input");
  }

  console.log("✓ Clear All reset inputs");

  console.log("======================================");
  console.log("BROWSER TEST: PASS");
  console.log("======================================");
} finally {
  await browser.close();
}
