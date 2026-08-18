"use client";

import SiteNav from "@/components/SiteNav";

export default function ContactPage() {
  return (
    <main className="contact-premium-page">
      <SiteNav />
      <style jsx>{`
        .contact-premium-page {
          min-height: 100vh;
          padding: 34px 24px 80px;
          background:
            radial-gradient(circle at 8% 5%, rgba(99,102,241,.11), transparent 27%),
            radial-gradient(circle at 92% 8%, rgba(168,85,247,.12), transparent 29%),
            linear-gradient(180deg, #f8faff 0%, #f5f7ff 100%);
          color: #101a35;
        }

        .contact-shell {
          width: min(100%, 1120px);
          margin: 0 auto;
        }

        .contact-hero {
          position: relative;
          overflow: hidden;
          padding: 58px;
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

        .contact-hero::after {
          content: "";
          position: absolute;
          width: 380px;
          height: 380px;
          right: -150px;
          top: -170px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(98,88,255,.12),
            rgba(170,113,255,.03)
          );
          pointer-events: none;
        }

        .contact-eyebrow {
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
          font-weight: 850;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .contact-hero h1 {
          position: relative;
          z-index: 2;
          margin: 22px 0 13px;
          color: #0c1632;
          font-size: clamp(45px, 7vw, 70px);
          line-height: 1;
          letter-spacing: -3px;
          font-weight: 850;
        }

        .contact-hero h1 span {
          background: linear-gradient(100deg, #315fff, #7541ef);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .contact-hero > p {
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0;
          color: #596b8d;
          font-size: 17px;
          line-height: 1.75;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 18px;
          margin-top: 28px;
        }

        .contact-card {
          border: 1px solid #dfe4f0;
          border-radius: 18px;
          background: rgba(255,255,255,.96);
          box-shadow: 0 15px 40px rgba(42,57,105,.07);
        }

        .owner-card {
          padding: 38px;
        }

        .card-label {
          display: inline-block;
          margin-bottom: 12px;
          color: #5264ee;
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 1.7px;
          text-transform: uppercase;
        }

        .owner-head {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }

        .owner-avatar {
          width: 66px;
          height: 66px;
          flex: 0 0 66px;
          display: grid;
          place-items: center;
          border-radius: 17px;
          color: white;
          background: linear-gradient(135deg, #315fff, #793ff0);
          box-shadow: 0 12px 25px rgba(78,72,235,.20);
          font-size: 23px;
          font-weight: 850;
        }

        .owner-head h2 {
          margin: 0;
          color: #121c38;
          font-size: 28px;
          letter-spacing: -.8px;
        }

        .owner-head p {
          margin: 4px 0 0;
          color: #5a6b8b;
          font-size: 14px;
          font-weight: 650;
        }

        .owner-description {
          margin: 0;
          color: #62728f;
          font-size: 15px;
          line-height: 1.8;
        }

        .specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 24px;
        }

        .specialty {
          padding: 8px 11px;
          border: 1px solid #e0e4f3;
          border-radius: 999px;
          color: #4c5d7e;
          background: #f8f9ff;
          font-size: 12px;
          font-weight: 700;
        }

        .email-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100%;
          padding: 34px;
          color: white;
          background:
            radial-gradient(circle at 85% 15%, rgba(255,255,255,.16), transparent 27%),
            linear-gradient(135deg, #263e9d, #6837ca);
          box-shadow: 0 18px 45px rgba(65,61,190,.18);
        }

        .email-icon {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          margin-bottom: 25px;
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 14px;
          background: rgba(255,255,255,.13);
          font-size: 23px;
        }

        .email-card h2 {
          margin: 0 0 9px;
          font-size: 28px;
          letter-spacing: -.8px;
        }

        .email-card p {
          margin: 0;
          color: rgba(255,255,255,.77);
          font-size: 14px;
          line-height: 1.7;
        }

        .email-address {
          display: block;
          margin-top: 24px;
          color: white;
          font-size: 16px;
          font-weight: 800;
          word-break: break-word;
          text-decoration: none;
        }

        .email-address:hover {
          text-decoration: underline;
        }

        .email-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          margin-top: 27px;
          padding: 0 17px;
          border-radius: 9px;
          color: #2938bb;
          background: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 850;
          transition: transform .18s ease;
        }

        .email-button:hover {
          transform: translateY(-2px);
        }

        .why-section {
          margin-top: 55px;
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

        .why-section h2 {
          margin: 0;
          color: #101a35;
          font-size: 38px;
          letter-spacing: -1.4px;
        }

        .why-section > p {
          max-width: 700px;
          margin: 10px 0 22px;
          color: #667795;
          font-size: 15px;
          line-height: 1.7;
        }

        .reason-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
        }

        .reason-card {
          padding: 25px;
          border: 1px solid #dfe4f0;
          border-radius: 16px;
          background: white;
          box-shadow: 0 11px 30px rgba(42,57,105,.055);
        }

        .reason-icon {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          margin-bottom: 16px;
          border-radius: 12px;
          color: #4e5cf0;
          background: #eef0ff;
          font-size: 19px;
        }

        .reason-card h3 {
          margin: 0 0 8px;
          color: #17213d;
          font-size: 17px;
        }

        .reason-card p {
          margin: 0;
          color: #6a7995;
          font-size: 13px;
          line-height: 1.7;
        }

        .contact-bottom {
          position: relative;
          overflow: hidden;
          margin-top: 55px;
          padding: 39px;
          border-radius: 19px;
          color: white;
          background:
            radial-gradient(circle at 90% 10%, rgba(255,255,255,.14), transparent 24%),
            linear-gradient(110deg, #315fff, #713ff0);
          box-shadow: 0 20px 50px rgba(74,66,220,.18);
        }

        .contact-bottom h2 {
          margin: 0 0 10px;
          font-size: 30px;
          letter-spacing: -1px;
        }

        .contact-bottom p {
          max-width: 700px;
          margin: 0;
          color: rgba(255,255,255,.81);
          font-size: 14px;
          line-height: 1.75;
        }

        @media (max-width: 800px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .reason-grid {
            grid-template-columns: 1fr 1fr;
          }

          .contact-hero {
            padding: 43px 30px;
          }
        }

        @media (max-width: 560px) {
          .contact-premium-page {
            padding: 18px 14px 55px;
          }

          .contact-hero {
            padding: 31px 21px;
            border-radius: 16px;
          }

          .contact-hero h1 {
            font-size: 44px;
            letter-spacing: -2px;
          }

          .contact-hero > p {
            font-size: 15px;
          }

          .owner-card,
          .email-card {
            padding: 27px;
          }

          .reason-grid {
            grid-template-columns: 1fr;
          }

          .why-section h2 {
            font-size: 30px;
          }

          .contact-bottom {
            padding: 29px 24px;
          }
        }
      `}</style>

      <div className="contact-shell">
        <section className="contact-hero">
          <span className="contact-eyebrow">✦ Get in touch</span>

          <h1>
            Let's build
            <br />
            <span>something useful.</span>
          </h1>

          <p>
            Have a question, suggestion, collaboration idea, or need help
            with a website or SEO project? Get in touch directly with the
            owner of AI Tool Engine.
          </p>
        </section>

        <section className="contact-grid">
          <div className="contact-card owner-card">
            <span className="card-label">Website Owner</span>

            <div className="owner-head">
              <div className="owner-avatar">MA</div>

              <div>
                <h2>Team Contact</h2>
                <p>WhatsApp & Website Support</p>
              </div>
            </div>

            <p className="owner-description">
              M Ahmad is a professional SEO and web developer focused on
              building fast, useful, search-friendly websites and digital
              experiences. His work combines modern web development,
              technical SEO, content strategy, website performance, and
              scalable online platforms.
            </p>

            <div className="specialties">
              <span className="specialty">SEO</span>
              <span className="specialty">Web Development</span>
              <span className="specialty">Technical SEO</span>
              <span className="specialty">Website Performance</span>
              <span className="specialty">Content Strategy</span>
              <span className="specialty">Digital Products</span>
            </div>
          </div>

          <div className="contact-card email-card">
            <div>
              <div className="email-icon">✉</div>

              <h2>Contact by Email</h2>

              <p>
                For business inquiries, collaboration, feedback, website
                projects, SEO discussions, or general questions, send an
                email directly.
              </p>

              <a
                className="email-address"
                href="mailto:ahmadarshad113114@gmail.com"
              >
                ahmadarshad113114@gmail.com
              </a>
            </div>

            <a
              className="email-button"
              href="mailto:ahmadarshad113114@gmail.com"
            >
              Send an Email →
            </a>
          </div>
        </section>

        <section className="why-section">
          <span className="section-label">What you can contact us about</span>

          <h2>Let's talk about your next project.</h2>

          <p>
            Whether you have a technical question or want to discuss a
            digital project, you can reach out directly.
          </p>

          <div className="reason-grid">
            <article className="reason-card">
              <div className="reason-icon">⌕</div>
              <h3>SEO & Search Visibility</h3>
              <p>
                Discuss technical SEO, content strategy, site structure,
                performance, and search-focused website improvements.
              </p>
            </article>

            <article className="reason-card">
              <div className="reason-icon">⌘</div>
              <h3>Web Development</h3>
              <p>
                Questions about modern websites, scalable web applications,
                user experiences, or performance-focused development.
              </p>
            </article>

            <article className="reason-card">
              <div className="reason-icon">✦</div>
              <h3>Collaboration & Feedback</h3>
              <p>
                Share ideas, suggestions, partnership opportunities, or
                feedback that can help improve AI Tool Engine.
              </p>
            </article>
          </div>
        </section>

        <section className="contact-bottom">
          <h2>Have something to say?</h2>

          <p>
            Your message is welcome. For the fastest way to reach M Ahmad,
            use the email address above and include enough detail to explain
            what you need.
          </p>
        </section>
      </div>
    
      <section
        style={{
          margin: "34px auto 0",
          width: "min(100% - 40px, 1080px)",
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "20px",
        }}
      >
        <a
          href="https://wa.me/923294433999"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            padding: "28px",
            borderRadius: "22px",
            background: "linear-gradient(135deg,#f0fff5,#ffffff)",
            border: "1px solid #ccefd9",
            boxShadow: "0 14px 35px rgba(16,185,129,.10)",
            textDecoration: "none",
          }}
        >
          <div style={{fontSize:"34px",marginBottom:"12px"}}>🟢</div>
          <h3 style={{margin:"0 0 7px",color:"#172033"}}>Team Contact</h3>
          <p style={{margin:"0 0 12px",color:"#667085"}}>
            Contact us directly on WhatsApp for general questions and website inquiries.
          </p>
          <strong style={{color:"#16a34a"}}>Chat on WhatsApp →</strong>
        </a>

        <a
          href="mailto:ahmadarshad113114@gmail.com"
          style={{
            display: "block",
            padding: "28px",
            borderRadius: "22px",
            background: "linear-gradient(135deg,#f5f7ff,#ffffff)",
            border: "1px solid #dce3ff",
            boxShadow: "0 14px 35px rgba(79,124,255,.10)",
            textDecoration: "none",
          }}
        >
          <div style={{fontSize:"34px",marginBottom:"12px"}}>✉️</div>
          <h3 style={{margin:"0 0 7px",color:"#172033"}}>Technical Support</h3>
          <p style={{margin:"0 0 12px",color:"#667085"}}>
            Get help with tools, technical issues, website problems and support.
          </p>
          <strong style={{color:"#3158d4"}}>ahmadarshad113114@gmail.com →</strong>
        </a>

        <div
          style={{
            padding: "28px",
            borderRadius: "22px",
            background: "linear-gradient(135deg,#fbf7ff,#ffffff)",
            border: "1px solid #e4d8ff",
            boxShadow: "0 14px 35px rgba(139,92,246,.10)",
          }}
        >
          <div style={{fontSize:"34px",marginBottom:"12px"}}>💼</div>
          <h3 style={{margin:"0 0 7px",color:"#172033"}}>Sales Team</h3>
          <p style={{margin:"0 0 12px",color:"#667085"}}>
            For partnerships, advertising, business inquiries and commercial opportunities.
          </p>
          <a
            href="mailto:ahmadarshad113114@gmail.com"
            style={{color:"#7041dc",fontWeight:700}}
          >
            Contact Sales →
          </a>
        </div>
      </section>

</main>
  );
}

