 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

          <Link href="/contact" className="universal-navbar-signin">
            Sign In
          </Link>
        </div>

      </div>
    </header>
  );
}
