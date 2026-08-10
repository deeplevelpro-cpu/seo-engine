"use client";
import { useState } from "react";

export default function Tool() {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Random String Generator (Free Online)</h1>

      <p>Generate random strings for testing and development.</p>

      <textarea
        rows="6"
        cols="50"
        placeholder="Enter your text..."
        onChange={(e) => setText(e.target.value)}
      />

      <h2>Output:</h2>
      <p>{text}</p>

      <h3>About this tool</h3>
      <p>
        This online tool helps you perform text operations quickly and efficiently.
      </p>
    </div>
  );
}
