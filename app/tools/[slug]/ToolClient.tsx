"use client";

import { useMemo, useState } from "react";
import toolsData from "@/data/tools";
import { getToolHandler } from "@/lib/tools";
import { getToolInputSchema } from "@/lib/tools/schema";
import ExtraTools from "./ExtraTools";


type ToolClientProps = {
  slug: string;
};

export default function ToolClient({ slug }: ToolClientProps) {

  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const tool = toolsData[slug as keyof typeof toolsData];
  const inputSchema = getToolInputSchema(slug);

  const wordCount = useMemo(
    () => text.trim() ? text.trim().split(/\s+/).length : 0,
    [text]
  );

  if (!tool) {
    return (
      <main className="notFound">
        <h1>Tool Not Found</h1>
        <p>The tool you&apos;re looking for doesn&apos;t exist.</p>
        <a href="/">← Back to Home</a>
      </main>
    );
  }

  const extraTool = <ExtraTools slug={slug} />;

  /*
   * EXTRA TOOLS USE THE SAME PREMIUM PAGE SHELL AS NORMAL TOOLS.
   * Tool functionality remains inside ExtraTools.tsx.
   */
  const isExtraTool =
    [
      "base64-encoder",
      "base64-decoder",
      "url-encoder",
      "url-decoder",
      "uuid-generator",
      "password-generator",
      "timestamp-converter",
      "unix-timestamp-converter",
      "binary-to-decimal-converter",
      "decimal-to-binary-converter",
      "text-to-slug-generator",
      "character-limit-calculator",
    ].includes(slug);

  if (isExtraTool) {
    return (
      <main className="page extraToolUnifiedPage">
        <div className="ambient ambientOne" />
        <div className="ambient ambientTwo" />

        

        <section className="hero" aria-live="polite">
          <div className="badge">✦ FREE ONLINE SEO TOOL</div>

          <h1>{tool.title}</h1>

          <p className="heroText">
            {tool.description}
          </p>

          <div className="trustRow">
            <span>✓ 100% FREE</span>
            <span>⚡ INSTANT RESULTS</span>
            <span>🔒 SIMPLE & SECURE</span>
          </div>
        </section>

        <section className="toolCard extraToolCard">
          <div className="cardHeader">
            <div className="headerIcon">✎</div>

            <div>
              <h2>TOOL WORKSPACE</h2>
              <p>
                Use this free online tool instantly in your browser.
              </p>
            </div>

            <div className="counter">
              FREE TOOL
            </div>
          </div>

          <div className="extraToolMount">
            {extraTool}
          </div>
        </section>

        <section className="features">
          <div>
            <b>🎯 ACCURATE</b>
            <span>Clean and useful results.</span>
          </div>

          <div>
            <b>⚡ FAST</b>
            <span>Get results instantly.</span>
          </div>

          <div>
            <b>🛡 SECURE</b>
            <span>Your data stays in your browser.</span>
          </div>

          <div>
            <b>😊 EASY TO USE</b>
            <span>Simple interface for everyone.</span>
          </div>
        </section>

        <section className="about">
          <div className="sectionLabel">ABOUT THIS TOOL</div>

          <h2>
            What is <span>{tool.title}</span>?
          </h2>

          <p className="aboutIntro">
            {tool.description} This free online tool is designed to make
            everyday digital and SEO tasks faster, easier and more accessible.
          </p>

          <div className="aboutGrid">
            <article>
              <div className="aboutIcon purple">?</div>
              <h3>WHAT IS THIS TOOL?</h3>
              <p>
                A simple browser-based utility designed for creators,
                developers, marketers, bloggers and website owners.
              </p>
            </article>

            <article>
              <div className="aboutIcon blue">☷</div>
              <h3>HOW TO USE</h3>
              <p>
                Enter your information, use the available controls and
                instantly get your result.
              </p>
            </article>

            <article>
              <div className="aboutIcon green">✓</div>
              <h3>BENEFITS</h3>
              <p>
                Save time and complete everyday digital tasks without
                installing complicated software.
              </p>
            </article>
          </div>
        </section>

        <section className="cta">
          <div>
            <small>EXPLORE MORE</small>
            <h2>More powerful tools for you.</h2>
            <p>
              Access hundreds of useful tools from one simple dashboard.
            </p>
          </div>

          <a href="/tools">Browse All Tools →</a>
        </section>

        <footer>
          <strong>⚡ AI TOOL ENGINE</strong>
          <span>Free online tools for everyone.</span>
        </footer>

<style jsx global>{`
          /*
           * Unified ExtraTools presentation.
           * Functionality remains untouched.
           */

          .extraToolCard {
            overflow: hidden;
          }

          .extraToolMount {
            width: 100%;
          }

          .extraToolMount .extra-tool-shell {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 24px 0 8px !important;
            background: transparent !important;
            border: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          .extraToolMount .extra-tool-shell h2 {
            display: none !important;
          }

          .extraToolMount .extra-tool-shell textarea,
          .extraToolMount .extra-tool-shell input:not([type="range"]) {
            box-sizing: border-box !important;
          }

          .extraToolMount .extra-tool-shell button {
            font-family: inherit !important;
          }

          .extraToolUnifiedPage .hero {
            margin-bottom: 26px;
          }

          .extraToolUnifiedPage .toolCard {
            margin-bottom: 28px;
          }

          @media (max-width: 760px) {
            .extraToolUnifiedPage .nav {
              gap: 12px;
            }

            .extraToolMount .extra-tool-shell {
              padding-top: 18px !important;
            }
          }
        `}</style>

        <style jsx global>{`
          /*
           * ==========================================================
           * EXTRA TOOLS — SAME PREMIUM VISUAL SYSTEM
           * Uses the exact ToolClient design system above.
           * Functionality remains untouched.
           * ==========================================================
           */

          .extraToolUnifiedPage {
            min-height: 100vh;
          }

          /*
           * Keep the exact normal-tool navigation.
           */
          .extraToolUnifiedPage .nav {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
          }

          .extraToolUnifiedPage .nav nav {
            display: flex !important;
            align-items: center !important;
            gap: 28px !important;
          }

          .extraToolUnifiedPage .nav nav a {
            display: inline-flex !important;
          }

          .extraToolUnifiedPage .logo {
            display: inline-flex !important;
            align-items: center !important;
          }

          /*
           * Workspace should look like the normal premium tool card,
           * not like a second random white box.
           */
          .extraToolCard {
            overflow: hidden !important;
          }

          .extraToolMount {
            width: 100% !important;
            padding: 4px 0 0 !important;
          }

          .extraToolMount .extra-tool-shell {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 18px 0 4px !important;
            background: transparent !important;
            border: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          /*
           * The individual ExtraTools title is redundant because
           * the page hero already contains the real tool title.
           */
          .extraToolMount .extra-tool-shell > h2 {
            display: none !important;
          }

          /*
           * Premium controls.
           */
          .extraToolMount button {
            appearance: none !important;
            border: 0 !important;
            border-radius: 12px !important;
            padding: 12px 20px !important;
            background: linear-gradient(135deg, #5267ff, #7545e8) !important;
            color: #fff !important;
            font-weight: 700 !important;
            font-size: 14px !important;
            cursor: pointer !important;
            box-shadow: 0 8px 22px rgba(82,103,255,.20) !important;
            transition: transform .18s ease, box-shadow .18s ease !important;
          }

          .extraToolMount button:hover {
            transform: translateY(-1px) !important;
            box-shadow: 0 12px 28px rgba(82,103,255,.27) !important;
          }

          .extraToolMount input:not([type="range"]),
          .extraToolMount textarea {
            box-sizing: border-box !important;
            width: 100% !important;
            border: 1px solid #dce4f2 !important;
            border-radius: 14px !important;
            background: #fff !important;
            color: #17223d !important;
            font-family: inherit !important;
            font-size: 15px !important;
            outline: none !important;
            transition: border-color .18s ease, box-shadow .18s ease !important;
          }

          .extraToolMount input:not([type="range"]) {
            min-height: 52px !important;
            padding: 14px 16px !important;
          }

          .extraToolMount textarea {
            padding: 15px 16px !important;
          }

          .extraToolMount input:not([type="range"]):focus,
          .extraToolMount textarea:focus {
            border-color: #7182ff !important;
            box-shadow: 0 0 0 4px rgba(82,103,255,.09) !important;
          }

          /*
           * Range input.
           */
          .extraToolMount input[type="range"] {
            width: 100% !important;
            accent-color: #5b63f6 !important;
          }

          /*
           * TextAreaTool output/input spacing.
           */
          .extraToolMount textarea + textarea {
            margin-top: 16px !important;
            background: #f8faff !important;
          }

          /*
           * Give the workspace breathing room.
           */
          .extraToolMount > .extra-tool-shell > * {
            max-width: 100% !important;
          }

          /*
           * Keep premium feature/about/CTA sections aligned with
           * normal ToolClient pages.
           */
          .extraToolUnifiedPage .features {
            margin-top: 8px !important;
          }

          .extraToolUnifiedPage .about {
            margin-top: 30px !important;
          }

          .extraToolUnifiedPage .cta {
            margin-top: 30px !important;
          }

          @media (max-width: 900px) {
            .extraToolUnifiedPage .nav {
              flex-wrap: wrap !important;
            }

            .extraToolUnifiedPage .nav nav {
              gap: 16px !important;
            }
          }

          @media (max-width: 650px) {
            .extraToolUnifiedPage .nav nav {
              display: none !important;
            }

            .extraToolUnifiedPage .hero h1 {
              font-size: clamp(38px, 10vw, 58px) !important;
            }

            .extraToolMount .extra-tool-shell {
              padding-top: 12px !important;
            }
          }
        `}</style>

      </main>
    );
  }

  const runTool = async () => {
    const schemaValues = Object.fromEntries(
      inputSchema.fields.map((field) => [
        field.name,
        fields[field.name] ?? "",
      ])
    );

    const hasSchemaInput = Object.values(schemaValues).some(
      (value) => value.trim()
    );

    const isZeroInputTool = inputSchema.fields.length === 0;

    if (!isZeroInputTool && !hasSchemaInput && !text.trim()) {
      setResult("Please enter some content first.");
      return;
    }

    setLoading(true);
    setResult("");

    await new Promise((resolve) => setTimeout(resolve, 450));

    // Convert schema fields into the existing handler text contract.
    // Existing handlers intentionally remain unchanged.
    const handlerInput = (() => {
      switch (slug) {
        case "percentage-calculator":
          return `${schemaValues.value ?? ""} ${schemaValues.percentage ?? ""}`;

        case "percentage-increase-calculator":
        case "percentage-decrease-calculator":
          return `${schemaValues.original ?? ""} ${schemaValues.new ?? ""}`;

        case "average-calculator":
          return schemaValues.numbers ?? "";

        case "ratio-calculator":
          return `${schemaValues.first ?? ""}:${schemaValues.second ?? ""}`;

        case "proportion-calculator":
          return `${schemaValues.a ?? ""} ${schemaValues.b ?? ""} ${schemaValues.c ?? ""}`;

        case "age-calculator":
          return schemaValues.birthDate ?? "";

        case "date-difference-calculator":
          return `${schemaValues.startDate ?? ""} ${schemaValues.endDate ?? ""}`;

        case "time-difference-calculator":
          return `${schemaValues.startTime ?? ""} ${schemaValues.endTime ?? ""}`;

        case "character-limit-calculator":
          return `${schemaValues.limit ?? ""} ${schemaValues.text ?? ""}`;

        case "compound-interest-calculator":
          return [
            schemaValues.principal ?? "",
            schemaValues.rate ?? "",
            schemaValues.compounds ?? "",
            schemaValues.years ?? "",
          ].join(" ");

        case "find-and-replace-text":
          return schemaValues.text || text;

        case "list-randomizer":
        case "checklist-generator":
          return schemaValues.text || text;

        case "hsl-color-converter": {
          const value = schemaValues.text || text;
          const parts = value
            .split(",")
            .map((part) => part.trim());

          if (parts.length === 3 && parts.every(Boolean)) {
            return `hsl(${parts[0]}, ${parts[1]}%, ${parts[2]}%)`;
          }

          return value;
        }

        default:
          return schemaValues.text || text;
      }
    })();

    // Execute through the centralized tool registry.
    const handler = getToolHandler(slug);

    const toolResult = await handler({
      text: handlerInput,
      keyword:
        slug === "find-and-replace-text"
          ? `${schemaValues.find ?? ""} => ${schemaValues.replace ?? ""}`
          : fields.keyword ?? keyword,
    });

    setResult(
      toolResult.title
        ? `${toolResult.title}\n\n${toolResult.content}`
        : toolResult.content
    );

    setLoading(false);
  };

  return (
    <main className="page">
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />
<section className="hero" aria-live="polite">
        <div className="badge">✦ FREE ONLINE SEO TOOL</div>

        <h1>
          {tool.title}
        </h1>

        <p className="heroText">
          {tool.description}
        </p>

        <div className="trustRow">
          <span>✓ 100% FREE</span>
          <span>⚡ INSTANT RESULTS</span>
          <span>🔒 SIMPLE & SECURE</span>
        </div>
      </section>

      <section className="toolCard">
        <div className="cardHeader">
          <div className="headerIcon">✎</div>

          <div>
            <h2>YOUR INPUT</h2>
            <p>Paste your content below and let the tool do the magic.</p>
          </div>

          <div className="counter">
            {text.length} Characters
          </div>
        </div>

        <div className="dynamicFields">
          {inputSchema.fields.map((field) => {
            const value =
              field.name === "text"
                ? fields[field.name] ?? text
                : fields[field.name] ?? "";

            const updateField = (nextValue: string) => {
              setFields((current) => ({
                ...current,
                [field.name]: nextValue,
              }));

              if (field.name === "text") {
                setText(nextValue);
              }
            };

            return (
              <div className="dynamicField" key={field.name}>
                <label htmlFor={`tool-field-${field.name}`}>
                  {field.label}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={`tool-field-${field.name}`}
                    aria-label="Tool input"
                    value={value}
                    spellCheck={false}
                    onChange={(e) => updateField(e.target.value)}
                    placeholder={field.placeholder}
                    className="mainInput"
                  />
                ) : (
                  <input
                    id={`tool-field-${field.name}`}
                    type={field.type}
                    value={value}
                    onChange={(e) => updateField(e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="inputFooter">
          <span>{wordCount} words</span>

          <button
            onClick={() => {
              setText("");
              setKeyword("");
              setFields({});
              setResult("");
            }}
            className="clearBtn"
          >
            Clear All
          </button>

          <button onClick={runTool} className="generateBtn">
            {loading ? "⏳ ANALYZING..." : "✦ GENERATE RESULT"}
          </button>

          
        </div>
      </section>

      <section className="resultCard">
        <div className="cardHeader">
          <div className="headerIcon blue">▣</div>

          <div>
            <h2>YOUR RESULT</h2>
            <p>Your generated result will appear here.</p>
          </div>

          <button
            className="copyBtn"
            onClick={() => navigator.clipboard?.writeText(result)}
            disabled={!result}
          >
            ⧉ Copy Result
          </button>
        </div>

        <div className="resultBox">
          {result ? (
            <pre>{result}</pre>
          ) : (
            <div className="emptyResult">
              <div className="emptyIcon">✦</div>
              <strong>Your result will appear here</strong>
              <span>Enter your content above and click “Generate Result”.</span>
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <div>
          <b>🎯 ACCURATE</b>
          <span>Clean and useful SEO analysis.</span>
        </div>

        <div>
          <b>⚡ FAST</b>
          <span>Get results in seconds.</span>
        </div>

        <div>
          <b>🛡 SECURE</b>
          <span>Your content stays in your browser.</span>
        </div>

        <div>
          <b>😊 EASY TO USE</b>
          <span>Simple interface for everyone.</span>
        </div>
      </section>

      <section className="about">
        <div className="sectionLabel">ABOUT THIS TOOL</div>

        <h2>
          What is <span>{tool.title}</span>?
        </h2>

        <p className="aboutIntro">
          {tool.description} This free online tool is designed to make
          everyday SEO and content tasks faster, easier and more accessible.
        </p>

        <div className="aboutGrid">
          <article>
            <div className="aboutIcon purple">?</div>
            <h3>WHAT IS THIS TOOL?</h3>
            <p>
              A simple browser-based SEO utility designed for creators,
              bloggers, marketers and website owners.
            </p>
          </article>

          <article>
            <div className="aboutIcon blue">☷</div>
            <h3>HOW TO USE</h3>
            <p>
              Enter your content, choose the relevant option and click
              Generate Result to instantly analyze your data.
            </p>
          </article>

          <article>
            <div className="aboutIcon green">✓</div>
            <h3>BENEFITS</h3>
            <p>
              Save time, improve your workflow and get practical SEO
              information without complicated software.
            </p>
          </article>
        </div>
      </section>

      <section className="cta">
        <div>
          <small>EXPLORE MORE</small>
          <h2>More powerful SEO tools for you.</h2>
          <p>Access hundreds of useful tools from one simple dashboard.</p>
        </div>

        <a href="/tools">Browse All Tools →</a>
      </section>

      <footer>
        <strong>⚡ AI TOOL ENGINE</strong>
        <span>Free online SEO tools for everyone.</span>
      </footer>

      <style jsx global>{`

/* ============================================================
   PHASE 14.10 — PREMIUM LIGHT TOOL EXPERIENCE
   Shared visual shell for ALL tool pages
   LOGIC PRESERVED
   HANDLERS PRESERVED
   SEO PRESERVED
   ============================================================ */

:root {
  --tool-bg: #f7f9ff;
  --tool-white: #ffffff;
  --tool-blue: #4169f5;
  --tool-blue-soft: #eef3ff;
  --tool-purple: #7b4de8;
  --tool-purple-soft: #f3edff;
  --tool-cyan: #17a9c1;
  --tool-green: #20a66a;
  --tool-text: #17223d;
  --tool-muted: #687793;
  --tool-light: #8b97ab;
  --tool-border: #e2e8f3;
  --tool-border-soft: #edf1f7;
  --tool-shadow: 0 14px 40px rgba(42, 61, 105, .07);
  --tool-shadow-lg: 0 24px 70px rgba(47, 67, 115, .10);
}

/* ------------------------------------------------------------
   PAGE
   ------------------------------------------------------------ */

.page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  color: var(--tool-text);

  background:
    radial-gradient(
      circle at 5% 5%,
      rgba(76, 118, 255, .10),
      transparent 30%
    ),
    radial-gradient(
      circle at 96% 8%,
      rgba(143, 78, 236, .10),
      transparent 31%
    ),
    linear-gradient(
      180deg,
      #fbfcff 0%,
      #f5f8ff 100%
    );

  padding-bottom: 70px;
}

/* Soft ambient decorations */

.ambient {
  position: absolute;
  pointer-events: none;
  filter: blur(2px);
  z-index: 0;
}

.ambientOne {
  width: min(420px, 100%);
  height: 420px;
  top: 180px;
  left: -240px;
  border-radius: 50%;
  background: rgba(91, 123, 255, .08);
}

.ambientTwo {
  width: min(420px, 100%);
  height: 420px;
  top: 350px;
  right: -250px;
  border-radius: 50%;
  background: rgba(155, 90, 238, .08);
}

/* ------------------------------------------------------------
   NAVIGATION
   ------------------------------------------------------------ */

.nav {
  position: relative;
  z-index: 10;

  width: min(1420px, calc(100% - 64px));
  min-height: 72px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;

  padding: 0 8px;

  border-bottom: 1px solid rgba(224, 230, 241, .85);
  background: rgba(255,255,255,.82);
  backdrop-filter: blur(18px);
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;

  color: var(--tool-text);
  text-decoration: none;

  font-size: 16px;
  font-weight: 850;
  letter-spacing: -.02em;
  white-space: normal;
}

.logo span:last-child {
  color: #4e6cf0;
}

.logoIcon {
  display: grid;
  place-items: center;

  width: 34px;
  height: 34px;

  border-radius: 11px;

  background: linear-gradient(135deg, #edf2ff, #f1eaff);
  color: #526df1;

  font-size: 19px;
  box-shadow: 0 7px 20px rgba(80, 91, 220, .10);
}

.nav nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.nav nav a {
  color: #526079;
  text-decoration: none;

  font-size: 13px;
  font-weight: 700;

  transition:
    color .18s ease,
    transform .18s ease;
}

.nav nav a:hover {
  color: var(--tool-blue);
  transform: translateY(-1px);
}

.allTools {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 42px;
  padding: 0 17px;

  border-radius: 12px;

  color: white !important;
  text-decoration: none;

  background: linear-gradient(
    135deg,
    #416df4,
    #824be8
  );

  font-size: 12px;
  font-weight: 800;

  box-shadow:
    0 10px 25px rgba(85, 82, 220, .20);

  transition:
    transform .18s ease,
    box-shadow .18s ease;
}

.allTools:hover {
  transform: translateY(-2px);
  box-shadow:
    0 14px 32px rgba(85, 82, 220, .26);
}

/* ------------------------------------------------------------
   HERO
   ------------------------------------------------------------ */

.hero {
  position: relative;
  z-index: 2;

  width: min(1420px, calc(100% - 64px));
  margin: 0 auto;

  padding: 48px 0 34px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;

  min-height: 30px;
  padding: 0 13px;

  border: 1px solid #dce5fa;
  border-radius: 999px;

  background: rgba(255,255,255,.90);
  color: #5274df;

  font-size: 10px;
  font-weight: 850;
  letter-spacing: .08em;

  box-shadow: 0 7px 22px rgba(66, 87, 137, .06);
}

.hero h1 {
  max-width: 900px;
  margin: 17px 0 10px;

  color: var(--tool-text);

  font-size: clamp(42px, 5vw, 64px);
  line-height: 1.04;

  font-weight: 850;
  letter-spacing: -.045em;
}

.hero h1::after {
  content: "";
  display: block;

  width: 75px;
  height: 5px;

  margin-top: 17px;

  border-radius: 999px;

  background:
    linear-gradient(
      90deg,
      #416df4,
      #8550e8
    );
}

.heroText {
  max-width: 820px;
  margin: 18px 0 18px;

  color: var(--tool-muted);

  font-size: 16px;
  line-height: 1.7;
}

.trustRow {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.trustRow span {
  display: inline-flex;
  align-items: center;

  min-height: 34px;
  padding: 0 12px;

  border: 1px solid #e1e7f1;
  border-radius: 999px;

  background: rgba(255,255,255,.88);

  color: #63718a;

  font-size: 11px;
  font-weight: 750;

  box-shadow: 0 6px 18px rgba(49, 68, 110, .045);
}

/* ------------------------------------------------------------
   MAIN TOOL CARD
   ------------------------------------------------------------ */

.toolCard {
  position: relative;
  z-index: 3;

  width: min(1420px, calc(100% - 64px));
  margin: 0 auto;

  padding: 30px;

  border: 1px solid var(--tool-border);
  border-radius: 22px;

  background:
    linear-gradient(
      145deg,
      rgba(255,255,255,.98),
      rgba(249,251,255,.96)
    );

  box-shadow: var(--tool-shadow-lg);
}

/* Header */

.cardHeader {
  display: flex;
  align-items: center;
  gap: 14px;

  margin-bottom: 22px;
}

.headerIcon {
  flex: 0 0 auto;

  display: grid;
  place-items: center;

  width: 48px;
  height: 48px;

  border-radius: 14px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #4d6ff3,
      #854ce8
    );

  box-shadow:
    0 10px 25px rgba(77, 94, 224, .20);

  font-size: 20px;
}

.headerIcon.blue {
  background:
    linear-gradient(
      135deg,
      #3f82f5,
      #4c64eb
    );
}

.cardHeader h2 {
  margin: 0;

  color: var(--tool-text);

  font-size: 18px;
  font-weight: 850;
  letter-spacing: -.02em;
}

.cardHeader p {
  margin: 4px 0 0;

  color: var(--tool-muted);

  font-size: 12px;
  line-height: 1.5;
}

.counter {
  margin-left: auto;

  padding: 8px 11px;

  border: 1px solid #e4e9f2;
  border-radius: 9px;

  background: #f8faff;

  color: #7b879b;

  font-size: 11px;
  font-weight: 700;
}

/* ------------------------------------------------------------
   DYNAMIC INPUTS
   ------------------------------------------------------------ */

.dynamicFields {
  display: grid;
  gap: 18px;
}

.dynamicField {
  display: grid;
  gap: 8px;
}

.dynamicField label {
  color: #34415d;

  font-size: 13px;
  font-weight: 800;
}

.dynamicField input,
.dynamicField textarea,
.mainInput {
  width: 100%;
  box-sizing: border-box;

  border: 1px solid #dce4f0;
  border-radius: 13px;

  background: #fff;

  color: #273651;

  font-family: inherit;
  font-size: 14px;

  box-shadow:
    inset 0 1px 2px rgba(40, 57, 96, .025),
    0 5px 18px rgba(49, 67, 109, .035);

  transition:
    border-color .18s ease,
    box-shadow .18s ease;
}

.dynamicField input {
  min-height: 52px;
  padding: 0 15px;
}

.dynamicField textarea,
.mainInput {
  min-height: 270px;
  padding: 16px;

  resize: vertical;
  line-height: 1.65;
}

.dynamicField input::placeholder,
.dynamicField textarea::placeholder,
.mainInput::placeholder {
  color: #a0abc0;
}

.dynamicField input:focus,
.dynamicField textarea:focus,
.mainInput:focus {
  outline: none;

  border-color: #7188ef;

  box-shadow:
    0 0 0 4px rgba(84, 108, 232, .09),
    0 10px 25px rgba(55, 73, 128, .06);
}

/* ------------------------------------------------------------
   INPUT FOOTER
   ------------------------------------------------------------ */

.inputFooter {
  display: flex;
  align-items: center;
  gap: 12px;

  margin-top: 17px;
}

.inputFooter > span {
  color: #8490a5;

  font-size: 11px;
  font-weight: 650;
}

.clearBtn {
  min-height: 46px;
  padding: 0 17px;

  border: 1px solid #e0e5ee;
  border-radius: 11px;

  background: #f1f4f8;
  color: #4b5870;

  font-weight: 800;

  cursor: pointer;
}

.generateBtn {
  flex: 1;

  min-height: 50px;
  padding: 0 22px;

  border: 0;
  border-radius: 12px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #386df2,
      #8849e7
    );

  font-size: 14px;
  font-weight: 850;

  cursor: pointer;

  box-shadow:
    0 12px 27px rgba(77, 79, 220, .22);

  transition:
    transform .18s ease,
    box-shadow .18s ease;
}

.generateBtn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 16px 34px rgba(77, 79, 220, .28);
}

.generateBtn:disabled {
  opacity: .65;
  cursor: wait;
}

/* ------------------------------------------------------------
   RESULT
   ------------------------------------------------------------ */

.resultCard {
  position: relative;
  z-index: 3;

  width: min(1420px, calc(100% - 64px));
  margin: 22px auto 0;

  padding: 27px;

  border: 1px solid var(--tool-border);
  border-radius: 20px;

  background: rgba(255,255,255,.96);

  box-shadow: var(--tool-shadow);
}

.resultCard .cardHeader {
  margin-bottom: 15px;
}

.copyBtn {
  margin-left: auto;

  min-height: 38px;
  padding: 0 13px;

  border: 1px solid #dfe5ef;
  border-radius: 9px;

  background: #f7f9fd;
  color: #56647c;

  font-size: 11px;
  font-weight: 800;

  cursor: pointer;
}

.resultBox {
  min-height: 160px;

  padding: 18px;

  border: 1px solid #e2e8f1;
  border-radius: 14px;

  background:
    linear-gradient(
      145deg,
      #fbfcff,
      #f6f8ff
    );

  color: #46546d;

  white-space: pre-wrap;
  line-height: 1.7;
}

.emptyResult {
  min-height: 150px;

  display: grid;
  place-items: center;

  color: #8d99ad;

  text-align: center;
}

.emptyIcon {
  display: grid;
  place-items: center;

  width: 46px;
  height: 46px;
  margin: 0 auto 9px;

  border-radius: 14px;

  background: #eef2ff;
  color: #6174e8;

  font-size: 20px;
}

/* ------------------------------------------------------------
   FEATURES
   ------------------------------------------------------------ */

.features {
  position: relative;
  z-index: 3;

  width: min(1420px, calc(100% - 64px));
  margin: 22px auto 0;

  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  gap: 13px;
}

.features > div {
  min-height: 120px;

  padding: 19px;

  border: 1px solid var(--tool-border);
  border-radius: 17px;

  background: rgba(255,255,255,.91);

  box-shadow:
    0 10px 30px rgba(48, 67, 111, .055);
}

.features > div:nth-child(1) {
  background:
    linear-gradient(
      135deg,
      #f2f5ff,
      #ffffff
    );
}

.features > div:nth-child(2) {
  background:
    linear-gradient(
      135deg,
      #f5efff,
      #ffffff
    );
}

.features > div:nth-child(3) {
  background:
    linear-gradient(
      135deg,
      #edfbff,
      #ffffff
    );
}

.features > div:nth-child(4) {
  background:
    linear-gradient(
      135deg,
      #effbf5,
      #ffffff
    );
}

.features h3 {
  margin: 0 0 7px;

  color: var(--tool-text);

  font-size: 13px;
  font-weight: 850;
}

.features p {
  margin: 0;

  color: var(--tool-muted);

  font-size: 11px;
  line-height: 1.65;
}

/* ------------------------------------------------------------
   ABOUT / INFORMATION SECTION
   ------------------------------------------------------------ */

.about {
  position: relative;
  z-index: 3;

  width: min(1420px, calc(100% - 64px));
  margin: 28px auto 0;

  padding: 32px;

  border: 1px solid #e0e6f2;
  border-radius: 22px;

  background:
    linear-gradient(
      135deg,
      rgba(255,255,255,.98),
      #f7f8ff
    );

  box-shadow: var(--tool-shadow);
}

.sectionLabel {
  display: inline-flex;

  padding: 7px 10px;

  border-radius: 8px;

  background: #eef2ff;
  color: #536ee0;

  font-size: 10px;
  font-weight: 850;
  letter-spacing: .09em;
}

.aboutIntro {
  max-width: 900px;
  margin: 13px 0 24px;

  color: var(--tool-muted);

  font-size: 14px;
  line-height: 1.75;
}

.aboutGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0,1fr));
  gap: 15px;
}

.aboutGrid > div {
  padding: 19px;

  border: 1px solid #e5eaf3;
  border-radius: 16px;

  background: #fff;
}

.aboutGrid h3 {
  margin: 0 0 7px;

  color: var(--tool-text);

  font-size: 13px;
  font-weight: 850;
}

.aboutGrid p {
  margin: 0;

  color: var(--tool-muted);

  font-size: 11px;
  line-height: 1.65;
}

.aboutIcon {
  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;
  margin-bottom: 12px;

  border-radius: 11px;

  font-weight: 850;
}

.aboutIcon.purple {
  background: #f1eaff;
  color: #8554e6;
}

.aboutIcon.blue {
  background: #eaf1ff;
  color: #4d72ed;
}

.aboutIcon.green {
  background: #eafaf2;
  color: #20a86c;
}

/* ------------------------------------------------------------
   CTA
   ------------------------------------------------------------ */

.cta {
  position: relative;
  z-index: 3;

  width: min(1420px, calc(100% - 64px));
  margin: 24px auto 0;

  padding: 34px;

  overflow: hidden;

  border: 1px solid #dddafa;
  border-radius: 22px;

  background:
    radial-gradient(
      circle at 85% 25%,
      rgba(132, 80, 232, .17),
      transparent 34%
    ),
    linear-gradient(
      135deg,
      #eef4ff,
      #f5efff
    );

  box-shadow:
    0 18px 48px rgba(70, 71, 138, .09);
}

.cta h2 {
  margin: 0 0 8px;

  color: #263a8d;

  font-size: 24px;
  font-weight: 850;
  letter-spacing: -.03em;
}

.cta p {
  max-width: 650px;
  margin: 0 0 18px;

  color: #687492;

  font-size: 13px;
  line-height: 1.7;
}

.cta a {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 44px;
  padding: 0 18px;

  border-radius: 11px;

  background:
    linear-gradient(
      135deg,
      #456ff3,
      #844ce7
    );

  color: white;
  text-decoration: none;

  font-size: 12px;
  font-weight: 800;

  box-shadow:
    0 10px 24px rgba(78, 80, 216, .20);
}

/* ------------------------------------------------------------
   NOT FOUND
   ------------------------------------------------------------ */

.notFound {
  min-height: 70vh;

  display: grid;
  place-content: center;

  padding: 40px;

  background: #f7f9ff;

  color: var(--tool-text);
}

.notFound h1 {
  font-size: clamp(2rem, 5vw, 2.625rem);
  margin-bottom: 10px;
}

.notFound p {
  color: var(--tool-muted);
}

/* ------------------------------------------------------------
   RESPONSIVE
   ------------------------------------------------------------ */

@media (max-width: 900px) {

  .nav,
  .hero,
  .toolCard,
  .resultCard,
  .features,
  .about,
  .cta {
    width: min(100% - 32px, 1420px);
  }

  .nav {
    min-height: 68px;
  }

  .nav nav {
    gap: 15px;
  }

  .features {
    grid-template-columns: repeat(2, minmax(0,1fr));
  }

  .aboutGrid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: clamp(40px, 8vw, 58px);
  }
}

@media (max-width: 650px) {

  .page {
    padding-bottom: 35px;
  }

  .nav {
    width: calc(100% - 24px);
    min-height: 64px;

    gap: 10px;
  }

  .nav nav {
    display: none;
  }

  .logo {
    font-size: 14px;
  }

  .logoIcon {
    width: 31px;
    height: 31px;
  }

  .allTools {
    min-height: 38px;
    padding: 0 11px;
    font-size: 10px;
  }

  .hero,
  .toolCard,
  .resultCard,
  .features,
  .about,
  .cta {
    width: calc(100% - 24px);
  }

  .hero {
    padding: 34px 0 25px;
  }

  .hero h1 {
    font-size: clamp(1.75rem, 8vw, 2.25rem);
    line-height: 1.06;
  }

  .heroText {
    font-size: 14px;
  }

  .trustRow span {
    font-size: 9px;
  }

  .toolCard,
  .resultCard,
  .about,
  .cta {
    padding: 18px;
    border-radius: 17px;
  }

  .cardHeader {
    align-items: flex-start;
  }

  .counter {
    display: none;
  }

  .dynamicField textarea,
  .mainInput {
    min-height: 210px;
  }

  .inputFooter {
    flex-wrap: wrap;
  }

  .generateBtn {
    width: 100%;
    flex-basis: 100%;
  }

  .clearBtn {
    flex: 1;
  }

  .features {
    grid-template-columns: 1fr;
  }

  .cta h2 {
    font-size: 21px;
  }
}

`}</style>
    </main>
  );
}
