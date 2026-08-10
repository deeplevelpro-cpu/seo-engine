"use client";
import { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  return (
    <div className="card">
      <textarea
        placeholder="Type or paste text..."
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

      <h3>Characters: {text.length}</h3>
    </div>
  );
}
