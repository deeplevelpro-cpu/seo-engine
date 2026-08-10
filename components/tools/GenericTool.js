"use client";

import { useState } from "react";

export default function GenericTool({ tool }) {
  const [text, setText] = useState("");

  return (
    <div>
      <textarea
        placeholder={`Use ${tool.name}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "150px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <p>Characters: {text.length}</p>
      <p>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</p>
      <p>Paragraphs: {text.split(/\n+/).filter(p => p.trim()).length}</p>
    </div>
  );
}
