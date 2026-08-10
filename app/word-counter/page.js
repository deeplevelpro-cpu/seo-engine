"use client";

import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");

  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = text.length;

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Word Counter Tool</h1>

      <textarea
        rows={10}
        style={{ width: "100%", padding: "10px" }}
        placeholder="Paste your text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p>Words: {wordCount}</p>
      <p>Characters: {charCount}</p>

      <h2>What is Word Counter?</h2>
      <p>This tool helps you count words and characters instantly.</p>
    </div>
  );
}

