import "./reference-home.css";
import Link from "next/link";

const guides = [
  {
    category: "LINUX",
    title: "How to Fix Kali Linux APT Update Errors",
    description: "Step-by-step guide to fix APT update & repository issues.",
    icon: "⌁",
    href: "/articles/how-to-fix-kali-linux-apt-update-errors",
  },
  {
    category: "LINUX",
    title: "How to Fix Kali Linux WiFi Not Working",
    description: "Fix wireless adapter problems in Kali Linux quickly.",
    icon: "⌁",
    href: "/articles/how-to-fix-kali-linux-wifi-not-working-complete-troubleshooting-guide",
  },
  {
    category: "GUIDES",
    title: "Browse All Technical Guides",
    description: "Explore our complete collection of technical guides.",
    icon: "▤",
    href: "/articles",
  },
];

const categories = [
  {
    icon: "⌕",
    title: "SEO Tools",
    description: "Keyword research, SERP checker, and more",
    count: "21 Tools",
    href: "/categories/seo",
  },
  {
    icon: "▣",
    title: "Content Tools",
    description: "Grammar, plagiarism, text and writing tools",
    count: "18 Tools",
    href: "/categories/content",
  },
  {
    icon: "◎",
    title: "Web Tools",
    description: "Image converters, minifiers, web utilities",
    count: "15 Tools",
    href: "/tools",
  },
  {
    icon: "▶",
    title: "YouTube Tools",
    description: "Tag generator, thumbnail downloader, etc.",
    count: "10 Tools",
    href: "/tools",
  },
  {
    icon: "</>",
    title: "Developer Tools",
    description: "JSON formatter, code minifier, base64, etc.",
    count: "12 Tools",
    href: "/categories/developer",
  },
  {
    icon: "✦",
    title: "Productivity Tools",
    description: "Calculators, trackers, docs and more",
    count: "14 Tools",
    href: "/tools",
  },
];

const popularTools = [
  {
    icon: "▤",
    title: "Keyword Density Checker",
    description: "Check keyword density for better SEO",
    href: "/tools",
  },
  {
    icon: "▧",
    title: "Image Compressor",
    description: "Compress images without losing quality",
    href: "/tools",
  },
  {
    icon: "▣",
    title: "Meta Description Generator",
    description: "Generate SEO-friendly meta descriptions",
    href: "/tools",
  },
  {
    icon: "⌁",
    title: "Plagiarism Checker",
    description: "Check content uniqueness instantly",
    href: "/tools",
  },
];

export default function HomePage() {
  return (
      <>
    <main className="premium-home">

      {/* =====================================================
          NAVBAR
      ====================================================== */}
      

      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}
      <div className="premium-background-art" aria-hidden="true">
        <span className="bubble bubble-1" />
        <span className="bubble bubble-2" />
        <span className="bubble bubble-3" />
        <span className="bubble bubble-4" />
        <span className="bubble bubble-5" />
        <span className="bubble bubble-6" />
        <span className="bubble bubble-7" />
        <span className="bubble bubble-8" />
        <span className="bubble bubble-9" />
        <span className="bubble bubble-10" />
        <span className="dot-grid" />
        <span className="wave wave-1" />
        <span className="wave wave-2" />
      </div>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="premium-hero">

        <div className="premium-hero-left">

          <div className="premium-eyebrow">
            <span>ϟ</span>
            FREE ONLINE TOOLS FOR SEO &amp; CONTENT
          </div>

          <h1>
            Simple tools
            <br />
            to <span>create</span> and
            <br />
            <span>optimize</span> better
            <br />
            content.
          </h1>

          <p>
            Practical, browser-based tools for SEO, content,
            web &amp; productivity.
          </p>

          <div className="premium-hero-buttons">
            <Link href="/tools" className="premium-primary-button">
              Explore all tools <span>→</span>
            </Link>

            <Link href="/articles" className="premium-secondary-button">
              Browse guides <span>→</span>
            </Link>
          </div>

          <div className="premium-benefits">
            <span><b>✓</b> 100% Free</span>
            <span><b>ϟ</b> Instant Results</span>
            <span><b>◎</b> Easy to Use</span>
            <span><b>♙</b> No Signup</span>
          </div>

        </div>

        {/* AUTOMATION WORKFLOW */}
        <div className="premium-automation">

          <div className="automation-title">
            <h3>Automation &amp; Linking</h3>
            <p>
              Connect tools and automate your workflow
              for maximum productivity.
            </p>
          </div>

          <div className="automation-flow">

            <div className="flow-card">
              <span className="flow-icon">⌕</span>
              <div>
                <strong>Find Keywords</strong>
                <small>Use Keyword Density Checker</small>
              </div>
            </div>

            <div className="flow-line" />

            <div className="flow-card">
              <span className="flow-icon purple">▣</span>
              <div>
                <strong>Optimize Content</strong>
                <small>Improve with our SEO tools</small>
              </div>
            </div>

            <div className="flow-line" />

            <div className="flow-card">
              <span className="flow-icon blue">▥</span>
              <div>
                <strong>Analyze &amp; Improve</strong>
                <small>Get scoring &amp; suggestions</small>
              </div>
            </div>

            <div className="flow-line" />

            <div className="flow-card">
              <span className="flow-icon orange">🚀</span>
              <div>
                <strong>Publish &amp; Rank</strong>
                <small>Rank higher on search engines</small>
              </div>
            </div>

          </div>

        </div>

        {/* WORKSPACE */}
        <div className="premium-workspace">

          <div className="workspace-topbar">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>

            <strong>AI TOOL ENGINE</strong>

            <span className="live-status">
              <b /> LIVE
            </span>
          </div>

          <div className="workspace-body">

            <aside className="workspace-sidebar">
              <span className="sidebar-active">K</span>
              <span>✣</span>
              <span>⌕</span>
              <span>&lt;/&gt;</span>
            </aside>

            <div className="workspace-main">

              <div className="workspace-label">
                SEO WORKSPACE
              </div>

              <h2>Optimize your content</h2>

              <div className="workspace-select">
                <span>Keyword density checker</span>
                <b>⌄</b>
              </div>

              <div className="workspace-search">
                <span>⌕</span>
                <span>Search tool by name or key</span>
                <button>Search Tools →</button>
              </div>

              <div className="workspace-bottom">

                <div className="workspace-mini-card">
                  <span>✓</span>
                  <div>
                    <strong>Easy workflow</strong>
                    <small>No signup • No hassle</small>
                  </div>
                </div>

                <strong className="workspace-caption">
                  Free tools for SEO, content, web &amp; productivity
                </strong>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          GUIDES + WORKSPACE
      ====================================================== */}
      <section className="premium-content-grid">

        <div className="premium-guides-panel">

          <div className="panel-heading">
            <div>
              <span>LATEST GUIDES &amp; TROUBLESHOOTING</span>
            </div>

            <Link href="/articles">
              View all guides →
            </Link>
          </div>

          <div className="guide-grid">

            {guides.map((guide) => (
              <Link
                href={guide.href}
                className="premium-guide-card"
                key={guide.title}
              >
                <div className="guide-card-top">
                  <span className="guide-icon">{guide.icon}</span>
                  <span className="guide-category">
                    {guide.category}
                  </span>
                </div>

                <h3>{guide.title}</h3>

                <p>{guide.description}</p>

                <strong>
                  {guide.category === "GUIDES"
                    ? "Explore all →"
                    : "Read guide →"}
                </strong>
              </Link>
            ))}

          </div>

        </div>

        <div className="premium-seo-workspace-card">

          <div className="panel-heading">
            <span>YOUR SEO WORKSPACE</span>
            <span>⚙</span>
          </div>

          <div className="seo-stats">

            <div>
              <small>KEYWORDS ANALYZED</small>
              <strong>24</strong>
              <em>Analyzed</em>
            </div>

            <div>
              <small>OPTIMIZATION SCORE</small>
              <strong>92<span>%</span></strong>
              <em>Optimal</em>
            </div>

          </div>

          <div className="progress-label">
            <span>OVERALL PROGRESS</span>
            <strong>92%</strong>
          </div>

          <div className="progress-track">
            <span />
          </div>

        </div>

      </section>

      {/* =====================================================
          CATEGORIES + POPULAR TOOLS
      ====================================================== */}
      <section className="premium-bottom-grid">

        <div className="premium-category-panel">

          <div className="panel-heading">
            <span>BROWSE TOOLS BY CATEGORY</span>

            <Link href="/categories">
              View all categories →
            </Link>
          </div>

          <div className="category-grid">

            {categories.map((category) => (
              <Link
                href={category.href}
                className="premium-category-card"
                key={category.title}
              >
                <span className="category-icon">
                  {category.icon}
                </span>

                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <strong>{category.count}</strong>
                </div>
              </Link>
            ))}

          </div>

        </div>

        <div className="premium-popular-panel">

          <div className="panel-heading">
            <span>POPULAR TOOLS</span>

            <Link href="/tools">
              View all tools →
            </Link>
          </div>

          <div className="popular-list">

            {popularTools.map((tool) => (
              <Link
                href={tool.href}
                className="popular-tool"
                key={tool.title}
              >
                <span className="popular-icon">
                  {tool.icon}
                </span>

                <div>
                  <strong>{tool.title}</strong>
                  <small>{tool.description}</small>
                </div>

                <b>›</b>
              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          PHASE 18 — BLOG + FOOTER
      ====================================================== */}

      <section className="phase18-blog-section">

        <div className="phase18-blog-heading">
          <div>
            <span>LATEST FROM THE BLOG</span>
            <h2>Practical guides, tips &amp; useful insights.</h2>
            <p>
              Learn how to use SEO, content, developer and productivity tools
              with simple step-by-step guides.
            </p>
          </div>

          <Link href="/blog" className="phase18-blog-view">
            View all posts →
          </Link>
        </div>

        <div className="phase18-blog-grid">

          <Link
            href="/articles/how-to-fix-kali-linux-apt-update-errors"
            className="phase18-blog-card"
          >
            <div className="phase18-blog-icon">⌁</div>
            <span>TECHNICAL GUIDE</span>
            <h3>How to Fix Kali Linux APT Update Errors</h3>
            <p>
              Fix repository, DNS, GPG key and dependency issues step by step.
            </p>
            <strong>Read guide →</strong>
          </Link>

          <Link
            href="/articles/how-to-fix-kali-linux-wifi-not-working-complete-troubleshooting-guide"
            className="phase18-blog-card"
          >
            <div className="phase18-blog-icon">◉</div>
            <span>TROUBLESHOOTING</span>
            <h3>How to Fix Kali Linux WiFi Not Working</h3>
            <p>
              Troubleshoot wireless adapters, drivers, rfkill and NetworkManager.
            </p>
            <strong>Read guide →</strong>
          </Link>

          <Link
            href="/blog"
            className="phase18-blog-card phase18-blog-card-featured"
          >
            <div className="phase18-blog-icon">✦</div>
            <span>AI TOOL ENGINE BLOG</span>
            <h3>Explore More Practical Tool Guides</h3>
            <p>
              Discover useful tutorials, tool explanations and productivity tips.
            </p>
            <strong>Explore the blog →</strong>
          </Link>

        </div>

      </section>

    </main>


{/* AI TOOL ENGINE — PREMIUM FAQ */}
<section className="aie-premium-faq" aria-labelledby="aie-faq-title">
  <div className="aie-faq-header">
    <span className="aie-faq-eyebrow">✦ QUICK ANSWERS</span>
    <h2 id="aie-faq-title">Frequently Asked Questions</h2>
    <p>Everything you need to know about AI Tool Engine.</p>
  </div>

  <div className="aie-faq-grid">
    <details>
      <summary><span>What is AI Tool Engine?</span><b>+</b></summary>
      <p>AI Tool Engine is a free online platform offering practical tools for SEO, content, development, productivity, web utilities and everyday digital tasks.</p>
    </details>

    <details>
      <summary><span>Are the tools on AI Tool Engine free to use?</span><b>+</b></summary>
      <p>Yes. AI Tool Engine provides a growing collection of free browser-based tools designed to be simple and easy to use.</p>
    </details>

    <details>
      <summary><span>Do I need to create an account to use the tools?</span><b>+</b></summary>
      <p>Many tools are designed to work without signup, so you can start using them directly from your browser.</p>
    </details>

    <details>
      <summary><span>What types of tools are available?</span><b>+</b></summary>
      <p>You can find tools for SEO, content, developer workflows, web utilities, security, marketing, images, conversions, calculations and productivity.</p>
    </details>

    <details>
      <summary><span>Can I use AI Tool Engine on my phone?</span><b>+</b></summary>
      <p>Yes. The website is designed with responsive layouts so users can access its tools from phones, tablets and desktop browsers.</p>
    </details>

    <details>
      <summary><span>Is my data saved when I use a tool?</span><b>+</b></summary>
      <p>Data handling depends on the specific tool and how it works. Avoid entering sensitive or confidential information unless the tool clearly explains how that information is handled.</p>
    </details>

    <details>
      <summary><span>How can I find the right tool?</span><b>+</b></summary>
      <p>Use the Tools page search and category filters to quickly find a tool that matches your task.</p>
    </details>

    <details>
      <summary><span>How often are new tools added?</span><b>+</b></summary>
      <p>AI Tool Engine is continuously being expanded with new tools, resources and practical digital utilities.</p>
    </details>

    <details>
      <summary><span>Can I suggest a new tool or report a problem?</span><b>+</b></summary>
      <p>Yes. You can contact the AI Tool Engine team with suggestions, feedback, technical issues or other website-related questions.</p>
    </details>

    <details>
      <summary><span>How can I contact AI Tool Engine?</span><b>+</b></summary>
      <p>You can use the Contact page to reach the team through the available WhatsApp and email contact options.</p>
    </details>
  </div>
</section>


<footer className="aie-footer">
        <div className="aie-shell">

          <div className="aie-footer-main">
            <div className="aie-footer-brand">
      <img src="/ai-tool-engine-logo.webp" alt="AI Tool Engine" className="ai-engine-logo-image" />
              <div className="aie-logo">
                <span>⚡</span>
                AI TOOL <b>ENGINE</b>
              </div>
              <p>
                Simple browser-based tools for better SEO,
                content and digital workflows.
              </p>
            </div>

            <div className="aie-footer-column">
              <strong>Explore</strong>
              <Link href="/tools">All Tools</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/blog">SEO Blog</Link>
              <Link href="/posts">Posts</Link>
            </div>

            <div className="aie-footer-column">
              <strong>Company</strong>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div className="aie-footer-column">
              <strong>Legal</strong>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms</Link>
            </div>






          
<div className="aie-footer-column aie-footer-faq-final">
  <h4>FAQ</h4>
  <a
    href="#aie-faq-title"
    className="aie-footer-faq-final-link"
    aria-label="Open Frequently Asked Questions"
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

        </div>
      </footer>
      </>
  );
}
