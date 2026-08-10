"use client";
import { useState } from "react";

export default function SlugTool() {
  const [text, setText] = useState("");

  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Text to Slug Generator</h1>

      <textarea
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: "150px" }}
      />

      <h2>Slug Output:</h2>
      <p>{slug}</p>

      <button onClick={() => navigator.clipboard.writeText(slug)}>
        Copy Slug
      </button>

      <h2>What is a Slug?</h2>
      <p>
        A slug is the part of a URL that identifies a page in a readable format.
      </p>
    </div>
  );
}
