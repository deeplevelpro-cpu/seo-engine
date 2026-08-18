"use client";

import Link from "next/link";
import { useState } from "react";
import "./pricing.css";

const WHATSAPP = "923294433999";
const PAYMENT_ACCOUNT_TITLE = "EHRAM CHEMMA";
const PAYMENT_ACCOUNT_NUMBER = "+923217361507";
const PAYMENT_ACCOUNT_TYPE = "JazzCash + Easypaisa";


const plans = {
  trial: {
    name: "Free Trial",
    monthly: 0,
    yearly: 0,
    after: "Then $6 USD/month",
    label: "FIRST MONTH FREE",
  },
  standard: {
    name: "Standard",
    monthly: 5,
    yearly: 50,
    after: "$50 USD/year",
    label: "SAVE $10 YEARLY",
  },
  pro: {
    name: "Pro",
    monthly: 12,
    yearly: 120,
    after: "$120 USD/year",
    label: "MOST POPULAR",
  },
} as const;

type PlanKey = keyof typeof plans;

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanKey | null>(null);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("Easypaisa");
  const [screenshotName, setScreenshotName] = useState("");

  function openVerification(plan: PlanKey) {
    setSelectedPlan(plan);
    setAccountName("");
    setAccountNumber("");
    setAccountType("Easypaisa");
    setScreenshotName("");
  }

  function handleScreenshot(file: File | undefined) {
    if (!file) {
      setScreenshotName("");
      return;
    }

    const allowed = ["image/png", "image/jpeg", "image/webp"];

    if (!allowed.includes(file.type)) {
      alert("Please upload a PNG, JPG, JPEG or WEBP payment screenshot.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Payment screenshot must be smaller than 5 MB.");
      return;
    }

    setScreenshotName(file.name);
  }

  function submitVerification() {
    if (!selectedPlan) return;

    if (!accountName.trim() || !accountNumber.trim() || !screenshotName) {
      alert("Please enter account name, account number and upload payment screenshot.");
      return;
    }

    const plan = plans[selectedPlan];
    const amount =
      selectedPlan === "trial"
        ? "$0 first month"
        : billing === "yearly"
          ? `$${plan.yearly} USD/year`
          : `$${plan.monthly} USD/month`;

    const message = [
      "AI TOOL ENGINE — PAYMENT VERIFICATION",
      "",
      `Plan: ${plan.name}`,
      `Billing: ${billing}`,
      `Amount: ${amount}`,
      "",
      `Customer Account Holder Name: ${accountName.trim()}`,
      `Customer Account / Wallet Number: ${accountNumber.trim()}`,
      `Customer Account Type: ${accountType}`,
      "",
      `Payment Receiver: ${PAYMENT_ACCOUNT_TITLE}`,
      `Payment Number: ${PAYMENT_ACCOUNT_NUMBER}`,
      `Payment Method: ${PAYMENT_ACCOUNT_TYPE}`,
      `Payment Screenshot: ${screenshotName}`,
      "",
      "I am sending my payment screenshot for manual verification.",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="pricing-page">

      

      <section className="pricing-hero">
        <div className="pricing-eyebrow">✦ SIMPLE & FLEXIBLE PRICING</div>

        <h1>
          Choose the plan that
          <span> grows with you.</span>
        </h1>

        <p>
          Start free, upgrade when you need more, and send your payment for
          quick manual verification.
        </p>

        <div className="pricing-trust-row">
          <span>✓ Free first month</span>
          <span>✓ Monthly & yearly plans</span>
          <span>✓ Manual verification</span>
          <span>✓ WhatsApp support</span>
        </div>
      </section>

      <section className="billing-highlight">
        <div>
          <span className="billing-small">BILLING</span>
          <strong>Choose monthly or save with yearly pricing.</strong>
        </div>

        <div className="billing-pills">
          <button
            className={billing === "monthly" ? "selected" : ""}
            onClick={() => setBilling("monthly")}
            type="button"
          >
            Monthly
          </button>
          <button
            className={billing === "yearly" ? "selected" : ""}
            onClick={() => setBilling("yearly")}
            type="button"
          >
            Yearly · Save
          </button>
        </div>
      </section>

      <section className="pricing-grid">

        <article className="price-card">
          <div className="card-top">
            <div className="plan-icon free-icon">⚡</div>
            <div>
              <span className="plan-label">FIRST MONTH</span>
              <h2>Free Trial</h2>
            </div>
          </div>

          <p className="plan-description">
            Explore the platform before committing to a paid plan.
          </p>

          <div className="price-area">
            <span className="currency">$</span>
            <strong>0</strong>
            <div className="price-period">
              <span>USD</span>
              <small>first month</small>
            </div>
          </div>

          <div className="after-price">
            Then <strong>$6 USD/month</strong>
          </div>

          <button
            className="price-button free-button"
            type="button"
            onClick={() => openVerification("trial")}
          >
            Start Free Trial <span>→</span>
          </button>

          <div className="feature-title">WHAT YOU GET</div>

          <div className="feature-boxes">
            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>1 Month Free Access</strong>
                <small>Explore the platform before upgrading.</small>
              </div>
            </div>

            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>Essential AI & SEO Tools</strong>
                <small>Useful tools for daily digital workflows.</small>
              </div>
            </div>

            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>No Long-Term Commitment</strong>
                <small>Upgrade only when you are ready.</small>
              </div>
            </div>
          </div>
        </article>

        <article className="price-card">
          <div className="saving-badge">SAVE $10 / YEAR</div>

          <div className="card-top">
            <div className="plan-icon standard-icon">◆</div>
            <div>
              <span className="plan-label">REGULAR USERS</span>
              <h2>Standard</h2>
            </div>
          </div>

          <p className="plan-description">
            More access and advanced capabilities for regular users.
          </p>

          <div className="price-area">
            <span className="currency">$</span>
            <strong>5</strong>
            <div className="price-period">
              <span>USD</span>
              <small>/ month</small>
            </div>
          </div>

          <div className="after-price">
            Yearly <strong>$50 USD/year</strong>
          </div>

          <button
            className="price-button standard-button"
            type="button"
            onClick={() => openVerification("standard")}
          >
            Choose Standard <span>→</span>
          </button>

          <div className="feature-title">STANDARD INCLUDES</div>

          <div className="feature-boxes">
            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>Full Tool Access</strong>
                <small>Use the complete core collection.</small>
              </div>
            </div>

            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>Advanced SEO & Content Tools</strong>
                <small>Better SEO and content workflows.</small>
              </div>
            </div>

            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>Priority Tool Updates</strong>
                <small>Get improvements and new features.</small>
              </div>
            </div>
          </div>
        </article>

        <article className="price-card pro-card">
          <div className="popular-badge">★ MOST POPULAR</div>

          <div className="card-top">
            <div className="plan-icon pro-icon">✦</div>
            <div>
              <span className="plan-label pro-label">POWER USERS</span>
              <h2>Pro</h2>
            </div>
          </div>

          <p className="plan-description">
            Premium capabilities for professionals and serious workflows.
          </p>

          <div className="price-area">
            <span className="currency">$</span>
            <strong>12</strong>
            <div className="price-period">
              <span>USD</span>
              <small>/ month</small>
            </div>
          </div>

          <div className="after-price">
            Yearly <strong>$120 USD/year</strong>
          </div>

          <button
            className="price-button pro-button"
            type="button"
            onClick={() => openVerification("pro")}
          >
            Choose Pro <span>→</span>
          </button>

          <div className="feature-title">EVERYTHING YOU NEED</div>

          <div className="feature-boxes">
            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>Everything in Standard</strong>
                <small>All Standard benefits plus Pro.</small>
              </div>
            </div>

            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>Advanced Automation</strong>
                <small>Faster and smarter workflows.</small>
              </div>
            </div>

            <div className="feature-box">
              <span>✓</span>
              <div>
                <strong>Priority Support</strong>
                <small>Faster assistance when you need it.</small>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* VERIFICATION MODAL */}
      {selectedPlan && (
        <div
          className="payment-modal-backdrop"
          onClick={() => setSelectedPlan(null)}
        >
          <div
            className="payment-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setSelectedPlan(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-badge">PAYMENT VERIFICATION</div>

            <h2>Verify your {plans[selectedPlan].name}</h2>

            <p className="modal-intro">
              Enter your payment details and upload your payment screenshot.
              We will verify the payment manually through WhatsApp.
            </p>

            <div className="selected-plan-box">
              <strong>{plans[selectedPlan].name}</strong>
              <span>
                {selectedPlan === "trial"
                  ? "$0 first month"
                  : billing === "yearly"
                    ? `${plans[selectedPlan].yearly} USD/year`
                    : `${plans[selectedPlan].monthly} USD/month`}
              </span>
            </div>

            {selectedPlan === "trial" ? (
              <div className="trial-no-payment">
                <div className="trial-no-payment-icon">✓</div>
                <div>
                  <strong>No payment required</strong>
                  <small>
                    Your first month is completely free. You can start the
                    trial without sending any payment.
                  </small>
                </div>
              </div>
            ) : (
              <div className="payment-instructions">

                <div className="payment-instructions-header">
                  <span className="payment-method-icon">💳</span>

                  <div>
                    <strong>Payment Instructions</strong>
                    <small>
                      Send your payment using JazzCash or Easypaisa.
                    </small>
                  </div>
                </div>

                <div className="payment-method-badges">
                  <span>🟢 JazzCash</span>
                  <span>🟢 Easypaisa</span>
                </div>

                <div className="payment-account-grid">

                  <div>
                    <span>ACCOUNT TITLE</span>
                    <strong>{PAYMENT_ACCOUNT_TITLE}</strong>
                  </div>

                  <div>
                    <span>ACCOUNT NUMBER</span>
                    <strong>{PAYMENT_ACCOUNT_NUMBER}</strong>
                  </div>

                  <div>
                    <span>ACCOUNT TYPE</span>
                    <strong>{PAYMENT_ACCOUNT_TYPE}</strong>
                  </div>

                  <div>
                    <span>PAYMENT AMOUNT</span>
                    <strong>
                      {billing === "yearly"
                        ? `$${plans[selectedPlan].yearly} USD/year`
                        : `$${plans[selectedPlan].monthly} USD/month`}
                    </strong>
                  </div>

                </div>

                <div className="payment-step-note">
                  <strong>How to complete your payment</strong>
                  <br />
                  1. Send the exact amount to the account above.
                  <br />
                  2. Complete the payment through JazzCash or Easypaisa.
                  <br />
                  3. Take a clear screenshot of the successful payment.
                  <br />
                  4. Upload the screenshot below.
                  <br />
                  5. Submit for manual WhatsApp verification.
                </div>

              </div>
            )}

            {selectedPlan !== "trial" && (
              <>
                <label>
                  Account Holder Name
                  <input
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Enter account holder name"
                  />
                </label>

                <label>
                  Account / Wallet Number
                  <input
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account or wallet number"
                  />
                </label>

                <label>
                  Account Type
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option>Easypaisa</option>
                    <option>JazzCash</option>
                    <option>JazzCash + Easypaisa</option>
                    <option>Bank Account</option>
                    <option>Debit / Credit Card</option>
                  </select>
                </label>

                <label>
                  Payment Screenshot
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => handleScreenshot(e.target.files?.[0])}
                  />
                  <small className="upload-note">
                    PNG, JPG or WEBP · Maximum 5 MB
                  </small>
                </label>

                {screenshotName && (
                  <div className="upload-success">
                    ✓ Screenshot selected: {screenshotName}
                  </div>
                )}

                <button
                  type="button"
                  className="verification-submit"
                  onClick={submitVerification}
                >
                  Submit for WhatsApp Verification →
                </button>
              </>
            )}

            {selectedPlan === "trial" && (
              <div className="trial-action-area">
                <div className="trial-action-card">
                  <span className="trial-action-icon">✓</span>
                  <div>
                    <strong>Your first month is completely free.</strong>
                    <small>
                      No payment, account number or screenshot is required
                      for the Free Trial.
                    </small>
                  </div>
                </div>

                <button
                  type="button"
                  className="verification-submit trial-submit"
                  onClick={() => {
                    const message = [
                      "AI TOOL ENGINE — FREE TRIAL REQUEST",
                      "",
                      "I would like to start my Free Trial.",
                      "",
                      "Plan: Free Trial",
                      "First Month: $0 USD",
                      "Payment Required: No",
                    ].join("\\n");

                    window.open(
                      `https://wa.me/923294433999?text=${encodeURIComponent(message)}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  Continue with Free Trial →
                </button>
              </div>
            )}

            <p className="security-note">
              Do not upload passwords, PINs, OTPs or other highly sensitive
              banking information.
            </p>
          </div>
        </div>
      )}

    
      

</main>
  );
}
