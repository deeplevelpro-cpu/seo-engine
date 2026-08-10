"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="card">
      <textarea
        placeholder="Type text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "15px",
          background: "#0f172a",
          color: "white",
          border: "1px solid #1e293b"
        }}
      />

      <h3>Words: {wordCount}</h3>
    </div>
  );
}
