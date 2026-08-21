"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to process request.");
      } else {
        setMessage(
          data?.message ||
            "If an account exists, reset instructions can be generated."
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-centered-shell">
        <div className="auth-card auth-card-narrow">
          <div className="auth-card-header">
            <span className="auth-eyebrow">ACCOUNT RECOVERY</span>
            <h2>Forgot password?</h2>
            <p>Enter your email and we’ll start the reset process.</p>
          </div>

          <form onSubmit={submit} className="auth-form">
            <label htmlFor="forgot-email">Email address</label>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}

            <button
              type="submit"
              className="auth-primary-button"
              disabled={loading}
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>

          <Link href="/login" className="auth-secondary-button auth-back-link">
            ← Back to sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
