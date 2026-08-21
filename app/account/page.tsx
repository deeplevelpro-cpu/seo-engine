"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SessionUser = {
  userId?: string;
  name?: string;
  email?: string;
  role?: string;
};

export default function AccountPage() {
  const router = useRouter();

  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!data?.authenticated) {
          router.replace("/login");
          return;
        }

        setUser(data.user);
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, [router]);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="account-page">
        <div className="account-loading">
          Loading your account...
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="account-page">
      <section className="account-shell">
        <div className="account-hero-card">
          <div>
            <span className="auth-eyebrow">YOUR WORKSPACE</span>
            <h1>Welcome back{user.name ? `, ${user.name}` : ""}.</h1>
            <p>
              Your AI Tool Engine account is ready. More workspace features
              can be added here as the platform grows.
            </p>
          </div>

          <button
            type="button"
            className="account-logout-button"
            onClick={logout}
          >
            Log out
          </button>
        </div>

        <div className="account-grid">
          <article className="account-card">
            <span className="account-card-icon">✦</span>
            <span className="account-card-label">ACCOUNT</span>
            <h2>Profile</h2>
            <p>
              <strong>Name:</strong> {user.name || "Not set"}
            </p>
            <p>
              <strong>Email:</strong> {user.email || "Not available"}
            </p>
          </article>

          <article className="account-card">
            <span className="account-card-icon">⚡</span>
            <span className="account-card-label">TOOLS</span>
            <h2>Explore tools</h2>
            <p>
              Jump back into the full collection of browser-based tools.
            </p>
            <Link href="/tools" className="account-card-link">
              Browse tools →
            </Link>
          </article>

          <article className="account-card">
            <span className="account-card-icon">◇</span>
            <span className="account-card-label">GUIDES</span>
            <h2>Learn something useful</h2>
            <p>
              Explore step-by-step guides, articles, and practical resources.
            </p>
            <Link href="/articles" className="account-card-link">
              Browse guides →
            </Link>
          </article>

          <article className="account-card">
            <span className="account-card-icon">◈</span>
            <span className="account-card-label">PLAN</span>
            <h2>Choose your plan</h2>
            <p>
              Review the available plans and choose what fits your workflow.
            </p>
            <Link href="/pricing" className="account-card-link">
              View pricing →
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
