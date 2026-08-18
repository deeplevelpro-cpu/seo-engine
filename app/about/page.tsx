"use client";

import SiteNav from "@/components/SiteNav";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="about-premium-page">
      <SiteNav />
      <style jsx>{`
        .about-premium-page {
          min-height: 100vh;
          padding: 34px 24px 80px;
          background:
            radial-gradient(circle at 8% 5%, rgba(99,102,241,.11), transparent 27%),
            radial-gradient(circle at 92% 8%, rgba(168,85,247,.12), transparent 29%),
            linear-gradient(180deg, #f8faff 0%, #f5f7ff 100%);
          color: #101a35;
        }

        .about-shell {
          width: min(100%, 1120px);
          margin: 0 auto;
        }

        .about-hero {
          position: relative;
          overflow: hidden;
          padding: 62px 58px 60px;
          border: 1px solid rgba(105,118,255,.17);
          border-radius: 20px;
          background:
            radial-gradient(circle at 91% 8%, rgba(128,91,255,.19), transparent 27%),
            radial-gradient(circle at 3% 25%, rgba(71,112,255,.11), transparent 29%),
            rgba(255,255,255,.94);
          box-shadow:
            0 25px 70px rgba(42,57,112,.10),
            inset 0 1px 0 rgba(255,255,255,.95);
        }

        .about-hero::before {
          content: "";
          position: absolute;
          right: -70px;
          top: -90px;
          width: 430px;
          height: 350px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 30% 35%, rgba(255,255,255,.8) 0 2px, transparent 3px),
            radial-gradient(circle at 65% 25%, rgba(255,255,255,.65) 0 2px, transparent 3px),
            linear-gradient(135deg, transparent 15%, rgba(113,87,255,.09) 16% 72%, transparent 73%);
          transform: rotate(-12deg);
          pointer-events: none;
        }

        .about-eyebrow {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border: 1px solid #dfe3ff;
          border-radius: 999px;
          color: #5264ee;
          background: #f7f7ff;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .about-hero h1 {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: 22px 0 16px;
          color: #0c1632;
          font-size: clamp(45px, 7vw, 72px);
          line-height: .98;
          letter-spacing: -3.5px;
          font-weight: 850;
        }

        .about-hero h1 span {
          background: linear-gradient(100deg, #315fff, #7541ef);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .about-hero p {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0;
          color: #596b8d;
          font-size: 18px;
          line-height: 1.75;
        }

        .hero-stats {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          max-width: 720px;
          margin-top: 34px;
        }

        .hero-stat {
          padding: 18px;
          border: 1px solid #e0e5f2;
          border-radius: 13px;
          background: rgba(255,255,255,.75);
        }

        .hero-stat strong {
          display: block;
          color: #17213d;
          font-size: 24px;
          font-weight: 850;
        }

        .hero-stat span {
          display: block;
          margin-top: 4px;
          color: #70809e;
          font-size: 12px;
        }

        .section {
          margin-top: 58px;
        }

        .section-heading {
          margin-bottom: 22px;
        }

        .section-label {
          display: inline-block;
          margin-bottom: 8px;
          color: #5264ee;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .section-heading h2 {
          margin: 0;
          color: #101a35;
          font-size: clamp(30px, 4vw, 42px);
          line-height: 1.08;
          letter-spacing: -1.5px;
        }

        .section-heading p {
          max-width: 700px;
          margin: 11px 0 0;
          color: #667795;
          font-size: 15px;
          line-height: 1.7;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .feature-card {
          padding: 25px;
          border: 1px solid #dfe4f0;
          border-radius: 16px;
          background: rgba(255,255,255,.94);
          box-shadow: 0 12px 30px rgba(42,57,105,.06);
          transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          border-color: #cbd2ff;
          box-shadow: 0 19px 38px rgba(42,57,105,.10);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          margin-bottom: 20px;
          border-radius: 13px;
          color: white;
          background: linear-gradient(135deg, #315fff, #793ff0);
          box-shadow: 0 10px 22px rgba(78,72,235,.19);
          font-size: 22px;
        }

        .feature-card h3 {
          margin: 0 0 9px;
          color: #15203c;
          font-size: 19px;
          letter-spacing: -.3px;
        }

        .feature-card p {
          margin: 0;
          color: #657694;
          font-size: 14px;
          line-height: 1.7;
        }

        .mission-card {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          overflow: hidden;
          border: 1px solid #dfe4f0;
          border-radius: 19px;
          background: white;
          box-shadow: 0 17px 42px rgba(42,57,105,.08);
        }

        .mission-copy {
          padding: 40px;
        }

        .mission-copy h2 {
          margin: 0 0 15px;
          color: #111b38;
          font-size: 34px;
          letter-spacing: -1.2px;
        }

        .mission-copy p {
          margin: 0;
          color: #617291;
          font-size: 15px;
          line-height: 1.8;
        }

        .mission-visual {
          min-height: 310px;
          display: grid;
          place-items: center;
          padding: 30px;
          background:
            radial-gradient(circle at 25% 25%, rgba(255,255,255,.28), transparent 20%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,.17), transparent 28%),
            linear-gradient(135deg, #243d9b, #6436c8);
        }

        .visual-panel {
          width: min(100%, 300px);
          padding: 25px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 17px;
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 45px rgba(10,17,55,.22);
        }

        .visual-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          color: white;
          font-weight: 800;
        }

        .visual-bolt {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          background: rgba(255,255,255,.18);
          font-size: 18px;
        }

        .visual-line {
          height: 10px;
          margin-top: 12px;
          border-radius: 999px;
          background: rgba(255,255,255,.25);
        }

        .visual-line.short {
          width: 65%;
        }

        .workflow-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 13px;
        }

        .workflow-card {
          position: relative;
          padding: 23px 20px;
          border: 1px solid #dfe4f0;
          border-radius: 15px;
          background: white;
        }

        .workflow-number {
          display: inline-grid;
          place-items: center;
          width: 35px;
          height: 35px;
          margin-bottom: 15px;
          border-radius: 10px;
          color: #4d5cf0;
          background: #eef0ff;
          font-size: 12px;
          font-weight: 850;
        }

        .workflow-card h3 {
          margin: 0 0 7px;
          color: #18223e;
          font-size: 16px;
        }

        .workflow-card p {
          margin: 0;
          color: #71809c;
          font-size: 13px;
          line-height: 1.65;
        }

        .about-cta {
          position: relative;
          overflow: hidden;
          margin-top: 58px;
          padding: 42px;
          border-radius: 20px;
          color: white;
          background:
            radial-gradient(circle at 85% 20%, rgba(255,255,255,.16), transparent 24%),
            linear-gradient(110deg, #315fff, #713ff0);
          box-shadow: 0 20px 50px rgba(74,66,220,.20);
        }

        .about-cta h2 {
          margin: 0 0 10px;
          font-size: 31px;
          letter-spacing: -1px;
        }

        .about-cta p {
          max-width: 690px;
          margin: 0;
          color: rgba(255,255,255,.82);
          line-height: 1.7;
          font-size: 15px;
        }

        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 25px;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 45px;
          padding: 0 18px;
          border-radius: 9px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          transition: transform .18s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
        }

        .cta-primary {
          color: #2634bb;
          background: white;
        }

        .cta-secondary {
          color: white;
          border: 1px solid rgba(255,255,255,.35);
          background: rgba(255,255,255,.10);
        }

        @media (max-width: 850px) {
          .about-hero {
            padding: 42px 30px;
          }

          .feature-grid {
            grid-template-columns: 1fr 1fr;
          }

          .mission-card {
            grid-template-columns: 1fr;
          }

          .workflow-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .about-premium-page {
            padding: 18px 14px 55px;
          }

          .about-hero {
            padding: 30px 20px;
            border-radius: 16px;
          }

          .about-hero h1 {
            font-size: 43px;
            letter-spacing: -2px;
          }

          .about-hero p {
            font-size: 15px;
          }

          .hero-stats,
          .feature-grid,
          .workflow-grid {
            grid-template-columns: 1fr;
          }

          .mission-copy {
            padding: 27px;
          }

          .mission-copy h2 {
            font-size: 29px;
          }

          .mission-visual {
            min-height: 250px;
          }

          .about-cta {
            padding: 30px 24px;
          }

          .about-cta h2 {
            font-size: 27px;
          }
        }
      `}</style>

      <div className="about-shell">
        <section className="about-hero">
          <span className="about-eyebrow">⚡ About AI Tool Engine</span>

          <h1>
            Powerful tools.
            <br />
            <span>Simple workflow.</span>
          </h1>

          <p>
            AI Tool Engine is built to make everyday digital work faster,
            simpler, and more accessible through a growing collection of
            practical online tools.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>Free</strong>
              <span>Useful tools without unnecessary complexity</span>
            </div>

            <div className="hero-stat">
              <strong>Fast</strong>
              <span>Focused experiences designed for quick results</span>
            </div>

            <div className="hero-stat">
              <strong>Growing</strong>
              <span>More tools and resources added over time</span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <span className="section-label">What we provide</span>
            <h2>Tools built around real tasks.</h2>
            <p>
              Instead of making users navigate complicated software for simple
              jobs, AI Tool Engine focuses on straightforward browser-based
              utilities that help get work done.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Practical</h3>
              <p>
                Each tool is designed around a specific task so users can get
                from input to result with as little friction as possible.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">✦</div>
              <h3>AI-Powered Workflows</h3>
              <p>
                AI features help turn repetitive content and productivity
                tasks into simpler, more useful workflows.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">⌘</div>
              <h3>One Useful Hub</h3>
              <p>
                SEO, content, developer, web, marketing, conversion,
                calculation, and productivity utilities can live in one place.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="mission-card">
            <div className="mission-copy">
              <span className="section-label">Our approach</span>

              <h2>Make useful technology easier to use.</h2>

              <p>
                Our goal is to create a clean utility platform where visitors
                can discover a tool, understand what it does, use it quickly,
                and move on with their work. Every part of the experience is
                intended to stay focused on usefulness rather than unnecessary
                complexity.
              </p>
            </div>

            <div className="mission-visual">
              <div className="visual-panel">
                <div className="visual-top">
                  <span className="visual-bolt">⚡</span>
                  AI Tool Engine
                </div>

                <div className="visual-line" />
                <div className="visual-line" />
                <div className="visual-line short" />
                <div className="visual-line short" />
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <span className="section-label">How it works</span>
            <h2>From task to result.</h2>
            <p>
              The platform is designed around a simple workflow that keeps the
              user focused on the task instead of the interface.
            </p>
          </div>

          <div className="workflow-grid">
            <article className="workflow-card">
              <span className="workflow-number">01</span>
              <h3>Choose a tool</h3>
              <p>Find the utility that matches the task you need to complete.</p>
            </article>

            <article className="workflow-card">
              <span className="workflow-number">02</span>
              <h3>Enter your input</h3>
              <p>Provide the text, data, URL, or information required by the tool.</p>
            </article>

            <article className="workflow-card">
              <span className="workflow-number">03</span>
              <h3>Generate or process</h3>
              <p>Let the selected utility handle the work and produce a result.</p>
            </article>

            <article className="workflow-card">
              <span className="workflow-number">04</span>
              <h3>Use your result</h3>
              <p>Copy, download, review, or continue working with the output.</p>
            </article>
          </div>
        </section>

        <section className="about-cta">
          <h2>Ready to get something done?</h2>

          <p>
            Explore the tool collection and find a practical utility for your
            next task.
          </p>

          <div className="cta-actions">
            <a href="/tools" className="cta-button cta-primary">
              Explore Tools →
            </a>

            <a href="/categories" className="cta-button cta-secondary">
              Browse Categories
            </a>
          </div>
        </section>
      </div>
    
      {/* M Ahmad — Founder / Mission Section */}
      <section
        aria-labelledby="ahmad-founder-section"
        style={{
          maxWidth: "1120px",
          margin: "70px auto 0",
          padding: "48px",
          borderRadius: "22px",
          border: "1px solid #e1e5f2",
          background:
            "linear-gradient(135deg, rgba(255,255,255,.98), rgba(246,248,255,.96))",
          boxShadow: "0 20px 55px rgba(35,48,100,.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(180px, 250px) 1fr",
            gap: "38px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              padding: "30px 22px",
              borderRadius: "18px",
              textAlign: "center",
              color: "#fff",
              background: "linear-gradient(135deg, #315fff, #763bea)",
              boxShadow: "0 15px 35px rgba(75,70,220,.20)",
            }}
          >
            <div
              style={{
                width: "78px",
                height: "78px",
                margin: "0 auto 18px",
                display: "grid",
                placeItems: "center",
                borderRadius: "20px",
                background: "rgba(255,255,255,.16)",
                border: "1px solid rgba(255,255,255,.22)",
                fontSize: "25px",
                fontWeight: 850,
              }}
            >
              MA
            </div>

            <h3
              style={{
                margin: 0,
                fontSize: "24px",
                letterSpacing: "-.7px",
              }}
            >
              M Ahmad
            </h3>

            <p
              style={{
                margin: "8px 0 0",
                color: "rgba(255,255,255,.82)",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              Professional SEO & Web Developer
            </p>
          </div>

          <div>
            <div
              style={{
                display: "inline-block",
                marginBottom: "10px",
                color: "#5264ee",
                fontSize: "11px",
                fontWeight: 850,
                letterSpacing: "1.7px",
                textTransform: "uppercase",
              }}
            >
              Founder & Mission
            </div>

            <h2
              id="ahmad-founder-section"
              style={{
                margin: "0 0 16px",
                color: "#101a35",
                fontSize: "clamp(30px, 4vw, 43px)",
                lineHeight: 1.08,
                letterSpacing: "-1.5px",
              }}
            >
              Built with a simple mission:
              <br />
              <span
                style={{
                  background: "linear-gradient(100deg, #315fff, #763bea)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                make useful tools accessible to everyone.
              </span>
            </h2>

            <p
              style={{
                margin: 0,
                color: "#61718f",
                fontSize: "15px",
                lineHeight: 1.85,
              }}
            >
              M Ahmad is a professional SEO and web developer focused on
              creating useful, fast, accessible, and search-friendly digital
              experiences. Through AI Tool Engine, his goal is to bring
              practical online tools into one simple platform where people can
              solve everyday digital tasks without unnecessary complexity.
              From SEO utilities and content tools to developer helpers,
              converters, calculators, and other web utilities, the vision is
              to continuously build resources that are genuinely useful,
              easy to understand, and available to everyone. Ahmad believes
              that good web products should not only look professional but
              should also provide real value, perform quickly, work across
              devices, and respect the time of their users. The long-term
              mission is to grow AI Tool Engine into a trusted destination for
              free online tools, helpful guides, practical resources, and
              high-quality digital utilities. Rather than creating tools just
              for the sake of having more pages, the focus is on solving real
              problems and making useful technology easier to access. Every
              improvement to the platform is guided by this mission: build
              better tools, publish genuinely helpful resources, and create a
              website that users can return to whenever they need a reliable
              solution.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "9px",
                marginTop: "24px",
              }}
            >
              {[
                "SEO",
                "Web Development",
                "Technical SEO",
                "Free Online Tools",
                "Website Performance",
                "Digital Products",
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "999px",
                    border: "1px solid #dfe4f1",
                    background: "#f8f9ff",
                    color: "#506080",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    
</main>
  );
}
