 "use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function VerifyEmailForm() {
  const params = useSearchParams();
  const token = params.get("token") || "";

  const [status, setStatus] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("Verification token is missing.");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus(data?.error || "Verification failed.");
          return;
        }

        setSuccess(true);
        setStatus(
          data?.message || "Your email has been verified successfully."
        );
      } catch {
        setStatus("Something went wrong. Please try again.");
      }
    }

    verify();
  }, [token]);

  return (
    <main className="auth-page">
      <section className="auth-centered-shell">
        <div className="auth-card auth-card-narrow auth-result-card">
          <div className={success ? "auth-result-icon success" : "auth-result-icon"}>
            {success ? "✓" : "!"}
          </div>

          <span className="auth-eyebrow">EMAIL VERIFICATION</span>
          <h2>{success ? "Email verified" : "Verify your email"}</h2>
          <p className={success ? "auth-success-text" : "auth-result-text"}>
            {status}
          </p>

          <Link href="/login" className="auth-primary-button">
            Continue to sign in
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="auth-page">
          <section className="auth-centered-shell">
            <div className="auth-card auth-card-narrow account-loading">
              Verifying your email...
            </div>
          </section>
        </main>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
