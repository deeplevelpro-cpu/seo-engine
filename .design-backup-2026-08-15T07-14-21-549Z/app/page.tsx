"use client";

import toolsData from "@/data/tools";

export default function Home() {
  const tools = Object.entries(toolsData);

  return (
    <main className="home">
      <div className="glow glow1" />
      <div className="glow glow2" />

      <header className="nav">
        <a href="/" className="logo">
          <span>⚡</span> AI TOOL <b>ENGINE</b>
        </a>

        <nav>
          <a className="active" href="/">Home</a>
          <a href="/tools">Tools</a>
          <a href="/categories">Categories</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>

        <a href="/tools" className="allTools">
          ✦ All 100+ Tools
        </a>
      </header>

      <section className="hero">
        <div className="eyebrow">FREE ONLINE SEO TOOLS</div>

        <h1>
          Simple SEO tools that
          <br />
          help you <span>create,</span>
          <br />
          <span>analyze,</span> and optimize
          <br />
          content.
        </h1>

        <p>
          Use practical browser-based tools for content, keywords, text,
          metadata, and everyday SEO tasks.
        </p>

        <div className="buttons">
          <a href="/tools" className="primary">
            Explore all tools
          </a>

          <a href="/blog" className="secondary">
            Read the SEO blog
          </a>
        </div>

        <div className="trust">
          <span>✓ 100% FREE</span>
          <span>⚡ INSTANT RESULTS</span>
          <span>😊 EASY TO USE</span>
          <span>🔒 SECURE & PRIVATE</span>
        </div>
      </section>

      <section className="toolsSection">
        <div className="sectionTop">
          <div>
            <div className="label">FEATURED TOOLS</div>
            <h2>Start with our most useful tools</h2>
            <p>Fast, simple and practical tools for your daily workflow.</p>
          </div>

          <a href="/tools">View all tools →</a>
        </div>

        <div className="grid">
          {tools.slice(0, 12).map(([slug, tool], index) => (
            <a href={`/tools/${slug}`} className="tool" key={slug}>
              <div className={`toolIcon icon${index % 6}`}>
                {["W", "K", "S", "M", "P", "R"][index % 6]}
              </div>

              <div className="toolBody">
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
              </div>

              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>1000+</strong>
          <span>Tools Available</span>
        </div>

        <div>
          <strong>10K+</strong>
          <span>Happy Users</span>
        </div>

        <div>
          <strong>50K+</strong>
          <span>Results Generated</span>
        </div>

        <div>
          <strong>4.9/5</strong>
          <span>User Rating</span>
        </div>
      </section>

      <section className="why">
        <div className="label">WHY AI TOOL ENGINE?</div>

        <h2>
          Everything you need to
          <span> work smarter.</span>
        </h2>

        <p>
          No complicated software. No unnecessary setup. Just useful
          browser-based tools designed to save time and make SEO easier.
        </p>

        <div className="whyGrid">
          <article>
            <div>⚡</div>
            <h3>FAST</h3>
            <p>Get useful results in seconds with a clean workflow.</p>
          </article>

          <article>
            <div>🎯</div>
            <h3>ACCURATE</h3>
            <p>Designed around practical SEO and content tasks.</p>
          </article>

          <article>
            <div>🔒</div>
            <h3>PRIVATE</h3>
            <p>Your everyday content stays protected while using local tools.</p>
          </article>
        </div>
      </section>

      <footer>
        <div>
          <strong>⚡ AI TOOL ENGINE</strong>
          <p>Simple tools for better content and SEO.</p>
        </div>

        <div className="footerLinks">
          <a href="/tools">Tools</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>

      <style jsx>{`
        .home {
          min-height: 100vh;
          color: #f8fafc;
          background:
            radial-gradient(circle at 8% 30%, rgba(0,140,255,.16), transparent 25%),
            radial-gradient(circle at 92% 35%, rgba(150,40,255,.17), transparent 27%),
            radial-gradient(circle at 50% 0%, rgba(0,210,255,.07), transparent 32%),
            #020617;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
          overflow: hidden;
        }

        .home::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .35;
          background-image:
            linear-gradient(rgba(34,211,238,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,.025) 1px, transparent 1px);
          background-size: 55px 55px;
          mask-image: linear-gradient(to bottom, black, transparent 75%);
        }

        .glow {
          position: fixed;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(110px);
          opacity: .18;
          pointer-events: none;
          z-index: 0;
        }

        .glow1 {
          background: #009dff;
          left: -280px;
          top: 28%;
        }

        .glow2 {
          background: #8b2cff;
          right: -280px;
          top: 38%;
        }

        .nav {
          width: min(1260px, calc(100% - 48px));
          height: 82px;
          margin: auto;
          padding: 0 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(100,130,190,.18);
          position: relative;
          z-index: 10;
        }

        .logo {
          color: #fff;
          text-decoration: none;
          font-size: 18px;
          font-weight: 1000;
          letter-spacing: -.5px;
          display: flex;
          align-items: center;
          gap: 5px;
          text-shadow: 0 0 22px rgba(34,211,238,.2);
        }

        .logo span {
          color: #a855f7 !important;
          font-size: 21px;
        }

        .logo b {
          color: #22d3ee !important;
        }

        nav {
          display: flex;
          align-items: center;
          gap: 34px;
        }

        nav a {
          position: relative;
          color: #94a3b8;
          text-decoration: none;
          font-size: 13px;
          font-weight: 850;
          transition: .2s;
        }

        nav a::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -29px;
          width: 0;
          height: 3px;
          border-radius: 20px;
          background: linear-gradient(90deg,#2563eb,#a855f7);
          transform: translateX(-50%);
          transition: .2s;
        }

        nav a:hover,
        nav .active {
          color: #fff;
        }

        nav .active::after {
          width: 42px;
        }

        .allTools {
          text-decoration: none;
          color: white;
          padding: 12px 19px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 950;
          background: linear-gradient(100deg,#2563eb,#7c3aed,#c026d3);
          box-shadow:
            0 0 22px rgba(99,102,241,.28),
            inset 0 1px rgba(255,255,255,.25);
          transition: .2s;
        }

        .allTools:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 34px rgba(124,58,237,.45);
        }

        .hero {
          width: min(1260px, calc(100% - 48px));
          margin: auto;
          padding: 72px 0 65px;
          position: relative;
          z-index: 2;
        }

        .eyebrow,
        .label {
          color: #22d3ee;
          font-size: 12px;
          font-weight: 1000;
          letter-spacing: 2.4px;
        }

        .hero h1 {
          max-width: 900px;
          font-size: clamp(54px, 6.5vw, 88px);
          line-height: .96;
          letter-spacing: -5px;
          font-weight: 1000;
          margin: 18px 0 25px;
        }

        .hero h1 span {
          background: linear-gradient(90deg,#a855f7 5%,#d946ef 45%,#22d3ee 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero > p {
          max-width: 720px;
          color: #94a3b8;
          line-height: 1.75;
          font-size: 17px;
        }

        .buttons {
          display: flex;
          gap: 13px;
          margin-top: 30px;
        }

        .buttons a {
          text-decoration: none;
          padding: 14px 21px;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 950;
          transition: .2s;
        }

        .primary {
          color: #001018;
          background: linear-gradient(100deg,#22d3ee,#06b6d4);
          box-shadow: 0 10px 35px rgba(34,211,238,.2);
        }

        .primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 42px rgba(34,211,238,.32);
        }

        .secondary {
          color: #e2e8f0;
          border: 1px solid #263452;
          background: rgba(15,23,42,.65);
        }

        .secondary:hover {
          border-color: #64748b;
          transform: translateY(-2px);
        }

        .trust {
          display: flex;
          gap: 9px;
          flex-wrap: wrap;
          margin-top: 28px;
        }

        .trust span {
          color: #aab8ca;
          border: 1px solid rgba(100,130,190,.2);
          background: rgba(8,17,36,.72);
          border-radius: 999px;
          padding: 8px 13px;
          font-size: 10px;
          font-weight: 850;
        }

        .toolsSection,
        .why,
        .stats {
          width: min(1260px, calc(100% - 48px));
          margin: auto;
          position: relative;
          z-index: 2;
        }

        .toolsSection {
          padding-bottom: 30px;
        }

        .sectionTop {
          display: flex;
          align-items: end;
          justify-content: space-between;
          margin-bottom: 27px;
        }

        .sectionTop h2,
        .why h2 {
          margin: 8px 0;
          font-size: 32px;
          line-height: 1.05;
          font-weight: 1000;
          letter-spacing: -1.3px;
        }

        .sectionTop p,
        .why > p {
          color: #64748b;
          font-size: 13px;
          margin-top: 9px;
        }

        .sectionTop > a {
          color: #22d3ee;
          text-decoration: none;
          font-size: 12px;
          font-weight: 950;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0,1fr));
          gap: 16px;
        }

        .tool {
          min-height: 158px;
          padding: 21px;
          border: 1px solid rgba(70,100,170,.38);
          border-radius: 15px;
          background:
            radial-gradient(circle at 100% 0%, rgba(70,50,160,.12), transparent 42%),
            linear-gradient(145deg,rgba(13,26,52,.96),rgba(5,13,29,.96));
          text-decoration: none;
          color: white;
          position: relative;
          overflow: hidden;
          transition: transform .22s, border-color .22s, box-shadow .22s;
        }

        .tool::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(135deg,rgba(255,255,255,.035),transparent 35%);
        }

        .tool:hover {
          transform: translateY(-6px);
          border-color: rgba(34,211,238,.62);
          box-shadow:
            0 18px 45px rgba(0,0,0,.42),
            0 0 24px rgba(34,211,238,.08);
        }

        .toolIcon {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 1000;
          margin-bottom: 18px;
          box-shadow: inset 0 1px rgba(255,255,255,.18);
        }

        .icon0 { background:linear-gradient(135deg,#0b4773,#123c62);color:#38bdf8;box-shadow:0 0 18px rgba(56,189,248,.15); }
        .icon1 { background:linear-gradient(135deg,#54208a,#3b1b65);color:#d8a4ff;box-shadow:0 0 18px rgba(192,132,252,.15); }
        .icon2 { background:linear-gradient(135deg,#07565c,#063d43);color:#2dd4bf;box-shadow:0 0 18px rgba(45,212,191,.15); }
        .icon3 { background:linear-gradient(135deg,#72194d,#4a183b);color:#fb7185;box-shadow:0 0 18px rgba(251,113,133,.15); }
        .icon4 { background:linear-gradient(135deg,#6a5007,#463a0b);color:#facc15;box-shadow:0 0 18px rgba(250,204,21,.12); }
        .icon5 { background:linear-gradient(135deg,#17613b,#143e2a);color:#4ade80;box-shadow:0 0 18px rgba(74,222,128,.12); }

        .tool h3 {
          margin: 0 0 9px;
          padding-right: 25px;
          font-size: 14px;
          line-height: 1.25;
          font-weight: 1000;
          letter-spacing: .25px;
        }

        .tool p {
          color: #7f8da4;
          font-size: 11px;
          line-height: 1.55;
          margin: 0;
          max-width: 190px;
        }

        .arrow {
          position: absolute;
          right: 17px;
          bottom: 16px;
          width: 31px;
          height: 31px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(34,211,238,.35);
          border-radius: 50%;
          color: #22d3ee;
          font-size: 17px;
          transition: .2s;
        }

        .tool:hover .arrow {
          background: rgba(34,211,238,.08);
          transform: translateX(3px);
          box-shadow: 0 0 15px rgba(34,211,238,.15);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          margin-top: 30px;
          margin-bottom: 90px;
          padding: 18px 0;
          border: 1px solid rgba(70,100,180,.38);
          border-radius: 15px;
          background:
            linear-gradient(90deg,rgba(17,35,70,.82),rgba(9,18,42,.9));
          box-shadow: 0 15px 45px rgba(0,0,0,.2);
        }

        .stats div {
          text-align: center;
          padding: 10px 18px;
          border-right: 1px solid rgba(100,130,190,.2);
        }

        .stats div:last-child {
          border-right: 0;
        }

        .stats strong {
          display: block;
          font-size: 30px;
          font-weight: 1000;
          background: linear-gradient(90deg,#22d3ee,#a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stats span {
          color: #718096;
          font-size: 11px;
          font-weight: 700;
        }

        .why {
          padding-bottom: 100px;
        }

        .why h2 {
          font-size: clamp(36px,4.5vw,55px);
          margin-top: 12px;
        }

        .why h2 span {
          background: linear-gradient(90deg,#a855f7,#d946ef);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .why > p {
          max-width: 670px;
          line-height: 1.8;
          font-size: 14px;
        }

        .whyGrid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 16px;
          margin-top: 30px;
        }

        .whyGrid article {
          padding: 24px;
          border: 1px solid rgba(70,100,170,.3);
          border-radius: 15px;
          background: linear-gradient(145deg,rgba(13,26,52,.86),rgba(6,13,29,.9));
        }

        .whyGrid article > div {
          font-size: 25px;
          margin-bottom: 14px;
        }

        .whyGrid h3 {
          font-size: 13px;
          font-weight: 1000;
          letter-spacing: .5px;
        }

        .whyGrid p {
          color: #718096;
          font-size: 11px;
          line-height: 1.7;
        }

        footer {
          width: min(1260px, calc(100% - 48px));
          margin: auto;
          padding: 35px 0 60px;
          border-top: 1px solid rgba(100,130,190,.15);
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        footer strong {
          color: #fff;
          font-size: 15px;
        }

        footer p {
          color: #64748b;
          font-size: 11px;
        }

        .footerLinks {
          display: flex;
          gap: 25px;
        }

        .footerLinks a {
          color: #718096;
          text-decoration: none;
          font-size: 12px;
          font-weight: 750;
        }

        .footerLinks a:hover {
          color: #22d3ee;
        }

        @media(max-width:900px) {
          nav { display:none; }
          .grid { grid-template-columns:repeat(2,1fr); }
          .hero h1 { font-size:clamp(48px,8vw,72px); }
        }

        @media(max-width:600px) {
          .nav,
          .hero,
          .toolsSection,
          .why,
          .stats,
          footer {
            width: min(100% - 28px,1260px);
          }

          .hero {
            padding-top:55px;
          }

          .hero h1 {
            font-size:45px;
            letter-spacing:-3px;
          }

          .sectionTop {
            align-items:flex-start;
            flex-direction:column;
            gap:12px;
          }

          .grid,
          .whyGrid,
          .stats {
            grid-template-columns:1fr;
          }

          .stats div {
            border-right:0;
            border-bottom:1px solid rgba(100,130,190,.18);
          }

          .stats div:last-child {
            border-bottom:0;
          }

          footer {
            flex-direction:column;
            gap:20px;
          }
        }
      `}</style>
    </main>
  );
}
