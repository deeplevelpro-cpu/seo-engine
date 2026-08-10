"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import toolsData from "@/data/tools";

export default function ToolPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const tool = toolsData[slug as keyof typeof toolsData];

  if (!tool) return <h1>Tool Not Found</h1>;

  const runAI = async () => {
    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({
        prompt: `You are a ${tool.title}. ${tool.description}.
User input: ${text}
Give best output.`
      })
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div>
      <h1>{tool.title}</h1>
      <p>{tool.description}</p>

      <textarea onChange={(e) => setText(e.target.value)} />

      <br />

      <button onClick={runAI}>Run AI Tool</button>

      <pre>{result}</pre>
    </div>
  );
}
