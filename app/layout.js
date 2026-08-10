export const metadata = {
  title: "Free SEO Tools - 100% Free Online Tools",
  description: "Use our free SEO tools to analyze, optimize and rank your website easily.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{padding: "20px", background: "#111", color: "#fff"}}>
          <h1>🔥 Free SEO Tools</h1>
        </header>

        {children}

        <footer style={{padding: "20px", background: "#111", color: "#fff"}}>
          <p>© 2026 Free SEO Tools</p>
        </footer>
      </body>
    </html>
  );
}
