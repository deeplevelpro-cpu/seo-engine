"use client";
import { useState } from "react";

export default function ParagraphCounter() {
  const [text, setText] = useState("");

  const paragraphs = text.split(/\n+/).filter(p => p.trim() !== "").length;

  return (
    <div className="card">
      <textarea
        placeholder="Paste paragraphs..."
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

      <h3>Paragraphs: {paragraphs}</h3>
    </div>
  );
}
