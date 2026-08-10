"use client";
import { useState } from "react";

export default function Tool() {
  const [text, setText] = useState("");

  const cleaned = text.replace(/\s+/g, " ").trim();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Whitespace Remover</h1>

      <textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: "150px" }}
      />

      <h2>Clean Text:</h2>
      <p>{cleaned}</p>

      <button onClick={() => navigator.clipboard.writeText(cleaned)}>
        Copy Text
      </button>

      <h2>What is Whitespace Remover?</h2>
      <p>
        This tool removes extra spaces, line breaks, and tabs from your text to
        make it clean and readable.
      </p>
    </div>
  );
}
