 "use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/articles", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/session", {
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setUser(data?.authenticated ? data.user : null);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoadingAuth(false);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  return (
    <header className="universal-site-navbar">
      <div className="universal-site-navbar-inner">

        <Link
          href="/"
          className="universal-navbar-brand"
          aria-label="AI Tool Engine Home"
        >
          <img
            src="/ai-tool-engine-logo.webp"
            alt="AI Tool Engine"
            className="universal-navbar-logo"
          />
        </Link>

        <nav
          className="universal-navbar-links"
          aria-label="Primary navigation"
        >
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : ""}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="universal-navbar-actions">
          <button
            type="button"
            className="universal-navbar-icon"
            aria-label="Search"
            title="Search"
          >
            ⌕
          </button>

          <button
            type="button"
            className="universal-navbar-icon"
            aria-label="Toggle theme"
            title="Theme"
          >
            ☼
          </button>

          {!loadingAuth && user ? (
            <>
              <Link href="/account" className="universal-navbar-signin">
                Account
              </Link>
              <button
                type="button"
                className="universal-navbar-signin"
                onClick={async () => {
                  await fetch("/api/auth/logout", {
                    method: "POST",
                    credentials: "include",
                  });
                  setUser(null);
                  router.push("/login");
                  router.refresh();
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <Link href="/login" className="universal-navbar-signin">
              Sign In
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
