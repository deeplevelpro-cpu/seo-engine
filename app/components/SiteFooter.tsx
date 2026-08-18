import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer-premium">
      <div className="aie-footer-main">

        <div className="aie-footer-brand">
          <a href="/" aria-label="AI Tool Engine Home">
            <img
              src="/ai-tool-engine-logo.webp"
              alt="AI Tool Engine"
              className="aie-footer-logo"
            />
          </a>

          <p>
            Simple browser-based tools for better SEO, content and digital
            workflows.
          </p>

          <strong>Follow us</strong>

          <div className="aie-social-row">
            <a href="#" aria-label="Facebook">f</a>

            <a
              href="https://wa.me/923294433999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              ◉
            </a>

            <a href="#" aria-label="X">X</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className="aie-footer-column">
          <h4>Explore</h4>
          <a href="/pricing">Pricing</a>
          <Link href="/tools">All Tools</Link>
          <Link href="/categories">Categories</Link>
          <Link href="/blog">SEO Blog</Link>
          <Link href="/posts">Posts</Link>
        </div>

        <div className="aie-footer-column">
          <h4>Company</h4>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="aie-footer-column">
          <h4>Legal</h4>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </div>

        <div className="aie-footer-column aie-footer-faq-final-column">
          <h4>FAQ</h4>

          <a
            href="#aie-faq-title"
            className="aie-footer-faq-final-link"
          >
            <span className="aie-footer-faq-final-icon">?</span>
            <span>Frequently Asked Questions</span>
          </a>
        </div>

      </div>

      <div className="aie-footer-bottom">
        <span>© 2026 AI Tool Engine. All rights reserved.</span>
        <span>Built for simple, useful digital work.</span>
      </div>
    </footer>
  );
}
