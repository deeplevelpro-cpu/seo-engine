"use client";

import { useState } from "react";
import Adsense from "../components/Adsense";

export default function BlogPage() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");

  const generate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    setContent(data.content);
    await fetch("/api/save", {

      method: "POST",

      body: JSON.stringify({ topic, content: data.content }),

    });
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>📝 AI Blog Generator</h1>

      <input
        placeholder="Enter topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{ padding: "10px", width: "300px", marginTop: "20px" }}
      />

      <br />

      <button onClick={generate} style={{ marginTop: "10px" }}>
        Generate Blog
      </button>

      <Adsense />

      <div style={{ marginTop: "30px", whiteSpace: "pre-wrap" }}>
        {content}
      </div>
    </main>
  );
}
