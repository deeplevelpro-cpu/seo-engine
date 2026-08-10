import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIContent(keyword) {
  const prompt = `
Write a detailed SEO optimized article about "${keyword} tool".

Include:
- Introduction
- What is it
- How to use
- Benefits
- FAQs (3)

Make it simple, human readable, and 800+ words.
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return res.choices[0].message.content;
}
