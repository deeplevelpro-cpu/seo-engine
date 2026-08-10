"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Word Counter Tool</h1>

      <textarea
        rows={10}
        style={{ width: "100%", padding: "10px", marginTop: "20px" }}
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: "20px" }}>
        <p><strong>Words:</strong> {wordCount}</p>
        <p><strong>Characters:</strong> {charCount}</p>
      </div>
    </div>
  );
}

