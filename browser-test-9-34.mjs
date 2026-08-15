import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
});

try {
  const page = await browser.newPage();

  console.log("===== EMPTY INPUT TEST =====");

  await page.goto("http://localhost:3000/tools/percentage-calculator", {
    waitUntil: "networkidle",
  });

  await page.getByRole("button", {
    name: /generate result/i,
  }).click();

  await page.waitForTimeout(300);

  let body = await page.locator("body").innerText();

  if (!body.includes("Please enter some content first.")) {
    throw new Error("Empty-input validation message not found");
  }

  console.log("✓ Empty input handled correctly");

  console.log("\n===== PARTIAL INPUT TEST =====");

  const inputs = page.locator("input");
  await inputs.nth(0).fill("100");

  await page.getByRole("button", {
    name: /generate result/i,
  }).click();

  await page.waitForTimeout(300);

  body = await page.locator("body").innerText();

  if (
    body.includes("NaN") ||
    body.includes("Infinity") ||
    body.includes("undefined")
  ) {
    throw new Error("Invalid partial input produced invalid output");
  }

  console.log("✓ Partial input did not crash the page");

  console.log("\n===== EMPTY NUMERIC FIELD TEST =====");

  await inputs.nth(0).fill("");
  await inputs.nth(1).fill("");

  await page.getByRole("button", {
    name: /generate result/i,
  }).click();

  await page.waitForTimeout(300);

  body = await page.locator("body").innerText();

  if (
    body.includes("Application error") ||
    body.includes("Unhandled Runtime Error")
  ) {
    throw new Error("Empty numeric fields crashed the page");
  }

  console.log("✓ Empty numeric fields did not crash");

  console.log("\n===== PARTIAL NUMERIC FIELD TEST =====");

  await inputs.nth(0).fill("100");
  await inputs.nth(1).fill("");

  await page.getByRole("button", {
    name: /generate result/i,
  }).click();

  await page.waitForTimeout(300);

  body = await page.locator("body").innerText();

  if (
    body.includes("Application error") ||
    body.includes("Unhandled Runtime Error")
  ) {
    throw new Error("Partial numeric input crashed the page");
  }

  console.log("✓ Partial numeric input did not crash");

  console.log("\n===== DATE EDGE CASE =====");

  await page.goto(
    "http://localhost:3000/tools/date-difference-calculator",
    { waitUntil: "networkidle" }
  );

  const dateInputs = page.locator('input[type="date"]');

  if (await dateInputs.count() !== 2) {
    throw new Error("Expected two date inputs");
  }

  await dateInputs.nth(0).fill("2026-01-31");
  await dateInputs.nth(1).fill("2026-01-01");

  await page.getByRole("button", {
    name: /generate result/i,
  }).click();

  await page.waitForTimeout(300);

  body = await page.locator("body").innerText();

  if (
    body.includes("Application error") ||
    body.includes("Unhandled Runtime Error")
  ) {
    throw new Error("Reverse date range crashed the page");
  }

  console.log("✓ Reverse date range handled without crash");

  console.log("\n===== CLEAR AFTER ERROR =====");

  const clearButton = page.getByRole("button", {
    name: /clear all/i,
  });

  await clearButton.click();

  const values = await page.locator("input").evaluateAll(
    elements => elements.map(element => element.value)
  );

  if (values.some(value => value !== "")) {
    throw new Error("Clear All failed after edge-case test");
  }

  console.log("✓ Clear All works after error cases");

  console.log("\n======================================");
  console.log("ERROR / EDGE-CASE TEST: PASS");
  console.log("======================================");

} catch (error) {
  console.error("\n✗ ERROR / EDGE-CASE TEST FAILED");
  console.error(error);
  process.exit(1);
} finally {
  await browser.close();
}
