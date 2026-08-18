"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Action = {
  type: "page";
  label: string;
  href: string;
} | null;

export default function FloatingAIAssistant() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm the AI Tool Engine Assistant. Tell me what you want to do and I'll help you find the right place.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState<Action>(null);

  async function sendMessage(event?: FormEvent) {
    event?.preventDefault();

    const question = input.trim();

    if (!question || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: question,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setLastAction(null);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: question,
          pathname,
          history: nextMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "AI assistant request failed."
        );
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data?.result ||
            "I couldn't generate an answer right now.",
        },
      ]);

      setLastAction(data?.action || null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `Sorry — ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function quickQuestion(text: string) {
    setInput(text);
  }

  return (
    <div className="aie-floating-assistant">

      {open && (
        <div className="aie-assistant-panel">

          <div className="aie-assistant-header">
            <div className="aie-assistant-avatar">✦</div>

            <div className="aie-assistant-header-copy">
              <strong>AI Assistant</strong>
              <span>
                <i /> Online
              </span>
            </div>

            <button
              type="button"
              className="aie-assistant-close"
              onClick={() => setOpen(false)}
              aria-label="Close AI Assistant"
            >
              ×
            </button>
          </div>

          <div className="aie-assistant-body">

            <div className="aie-chat-scroll">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "aie-chat-row user"
                      : "aie-chat-row assistant"
                  }
                >
                  <div className="aie-chat-bubble aie-ai-result-text">
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="aie-chat-row assistant">
                  <div className="aie-chat-bubble aie-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {lastAction && !loading && (
                <Link
                  href={lastAction.href}
                  className="aie-ai-action-button"
                  onClick={() => setOpen(false)}
                >
                  {lastAction.label}
                </Link>
              )}
            </div>

            <div className="aie-quick-actions">
              <button
                type="button"
                onClick={() => quickQuestion("Which tool should I use?")}
              >
                Find a Tool
              </button>

              <button
                type="button"
                onClick={() =>
                  quickQuestion("Show me a useful guide.")
                }
              >
                Guides
              </button>

              <button
                type="button"
                onClick={() =>
                  quickQuestion("What pricing plans do you offer?")
                }
              >
                Pricing
              </button>
            </div>

            <form
              className="aie-assistant-input"
              onSubmit={sendMessage}
            >
              <input
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Ask about our tools..."
                disabled={loading}
                aria-label="Ask AI Tool Engine Assistant"
              />

              <button
                type="submit"
                aria-label="Send"
                disabled={loading || !input.trim()}
              >
                ➤
              </button>
            </form>

            <div className="aie-assistant-powered">
              ⚡ Powered by AI Tool Engine
            </div>

          </div>
        </div>
      )}

      <button
        type="button"
        className={`aie-assistant-fab ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={
          open ? "Close AI Assistant" : "Open AI Assistant"
        }
      >
        <span className="aie-fab-ring" />
        <span className="aie-fab-icon">✦</span>
        {!open && <span className="aie-fab-dot" />}
      </button>

    </div>
  );
}
