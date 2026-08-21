"use client";

import { useState } from "react";
import { getToolHandler } from "@/lib/tools";

type ExtraToolsProps = {
  slug: string;
};

export default function ExtraTools({ slug }: ExtraToolsProps) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function runTool() {
    setLoading(true);

    try {
      const handler = getToolHandler(slug);

      const response = await handler({
        text: input,
      });

      setResult(
        typeof response === "string"
          ? response
          : response.content || JSON.stringify(response)
      );
    } catch (error) {
      setResult("Unable to process this tool.");
    }

    setLoading(false);
  }

  return (
    <div className="extra-tool-shell">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text here..."
        rows={8}
      />

      <button onClick={runTool} disabled={loading}>
        {loading ? "Processing..." : "Run Tool"}
      </button>

      {result && (
        <pre>
          {result}
        </pre>
      )}
    </div>
  );
}
