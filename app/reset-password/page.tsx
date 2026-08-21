 "use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const valid = useMemo(
    () => password.length >= 8 && password === confirm,
    [password, confirm]
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Reset token is missing.");
      return;
    }

    if (!valid) {
      setError("Use a matching password of at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Unable to reset password.");
      } else {
        setMessage("Password reset successfully. You can sign in now.");
        setPassword("");
        setConfirm("");
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
            <span className="auth-eyebrow">NEW PASSWORD</span>
            <h2>Reset password</h2>
            <p>Create a new password for your account.</p>
          </div>

          <form onSubmit={submit} className="auth-form">
            <label htmlFor="reset-password">New password</label>

            <div className="auth-password-wrap">
              <input
                id="reset-password"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShow((v) => !v)}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>

            <label htmlFor="reset-confirm">Confirm password</label>
            <input
              id="reset-confirm"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Repeat your new password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success">{message}</div>}

            <button
              type="submit"
              className="auth-primary-button"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update password"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-page">
          <section className="auth-centered-shell">
            <div className="auth-card auth-card-narrow account-loading">
              Loading reset form...
            </div>
          </section>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
