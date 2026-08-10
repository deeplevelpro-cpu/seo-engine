#!/bin/bash

TOOLS=(
"case-converter|Case Converter Tool|Convert text to uppercase, lowercase, and more."
"password-generator|Password Generator Tool|Generate strong and secure passwords instantly."
"text-to-slug|Text to Slug Tool|Convert text into SEO-friendly URL slugs."
"random-string-generator|Random String Generator|Generate random strings for testing and development."
"text-reverser|Text Reverser Tool|Reverse any text instantly online."
)

for tool in "${TOOLS[@]}"; do
  IFS="|" read slug title desc <<< "$tool"

  mkdir -p app/tools/$slug

  cat > app/tools/$slug/page.js <<EOL
"use client";
import { useState } from "react";

export default function Tool() {
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <h1>$title (Free Online)</h1>

      <p>$desc</p>

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
EOL

done

echo "✅ Tools generated successfully!"
