export default function Home() {
  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
        🚀 AI Blog Engine
      </h1>

      <p style={{ marginTop: "10px", color: "#94a3b8" }}>
        Auto generate SEO blogs using AI tools
      </p>

      <a href="/blog">
        <button style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#22c55e",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Go to Blog →
        </button>
      </a>
    </main>
  );
}
