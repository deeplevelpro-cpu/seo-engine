 "use client";

import Link from "next/link";
import Image from "next/image";
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
  const [mobileOpen, setMobileOpen] = useState(false);

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


  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="universal-site-navbar">
      <div className="universal-site-navbar-inner">

        <Link
          href="/"
          className="universal-navbar-brand"
          aria-label="AI Tool Engine Home"
         onClick={closeMobileMenu}>
          <Image
              src="/ai-tool-engine-logo.webp"
              alt="AI Tool Engine"
              width={40}
              height={40}
              className="universal-navbar-logo"
              priority
            />
        </Link>

        <nav
          className={`universal-navbar-links ${
            mobileOpen ? "mobile-open" : ""
          }`}
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
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mobile-auth-actions">
            {!loadingAuth && user ? (
              <>
                <Link href="/account" onClick={closeMobileMenu}>Account</Link>
                <button
                  type="button"
                  onClick={async () => {
                    await fetch("/api/auth/logout", {
                      method: "POST",
                      credentials: "include",
                    });

                    setUser(null);
                    setMobileOpen(false);
                    router.push("/login");
                    router.refresh();
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <Link href="/login" onClick={closeMobileMenu}>Sign In</Link>
            )}
          </div>
        </nav>

        <div className="universal-navbar-actions">
          {!loadingAuth && user ? (
            <>
              <Link href="/account" className="universal-navbar-signin desktop-auth" onClick={closeMobileMenu}>
                Account
              </Link>

              <button
                type="button"
                className="universal-navbar-signin desktop-auth"
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
            <Link href="/login" className="universal-navbar-signin desktop-auth" onClick={closeMobileMenu}>
              Sign In
            </Link>
          )}

          <button
            type="button"
            className="universal-navbar-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>
    </header>
  );
}
