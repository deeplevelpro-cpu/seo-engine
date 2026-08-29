export type ToolSeoContent = {
  intro: string;
  howTo: string[];
  useCases: string[];
  tips: string[];
};

function toolType(title: string): string {
  const t = title.toLowerCase();

  if (t.includes("calculator")) return "calculator";
  if (t.includes("converter")) return "converter";
  if (t.includes("generator")) return "generator";
  if (t.includes("checker")) return "checker";
  if (t.includes("validator")) return "validator";
  if (t.includes("formatter")) return "formatter";
  if (t.includes("counter")) return "counter";
  if (t.includes("parser")) return "parser";
  if (t.includes("builder")) return "builder";
  if (t.includes("encoder") || t.includes("decoder")) return "transformer";
  if (t.includes("minifier")) return "minifier";
  if (t.includes("finder")) return "finder";
  if (t.includes("preview")) return "preview";

  return "utility";
}

export function getToolSeoContent(
  title: string,
  category: string
): ToolSeoContent {
  const type = toolType(title);
  const name = title.toLowerCase();
  const cat = category.toLowerCase();

  // Category-aware SEO context keeps tool pages relevant
  // without creating a separate hard-coded page for every tool.
  const categoryContext: Record<string, {
    intro: string;
    workflow: string;
    use: string;
    tip: string;
  }> = {
    seo: {
      intro: "This SEO utility is designed for practical search optimization, content analysis, and website metadata workflows.",
      workflow: "Use the result when reviewing a page, improving search visibility, or checking an SEO implementation.",
      use: "SEO audits, content optimization, metadata review, and search-focused website maintenance.",
      tip: "Treat the result as an optimization aid and review it against the actual page and search intent."
    },
    developer: {
      intro: "This developer utility helps process, inspect, validate, transform, or prepare technical data during web development workflows.",
      workflow: "Use the output while debugging, testing, preparing data, or moving information between development formats.",
      use: "Development, debugging, API work, data preparation, testing, and technical troubleshooting.",
      tip: "Review generated or transformed output before placing it into production code."
    },
    calculators: {
      intro: "This calculator provides a quick way to work with the relevant values and reduce repetitive manual calculations.",
      workflow: "Enter accurate values, check the applicable units or assumptions, then review the calculated result.",
      use: "Planning, comparisons, estimates, everyday calculations, and quick numerical checks.",
      tip: "For important decisions, verify the inputs, formula, units, and final result independently."
    },
    conversion: {
      intro: "This conversion utility transforms supported values or data between two representations so they can be used in another workflow.",
      workflow: "Provide the source value or data, select the required representation when applicable, and review the converted output.",
      use: "Data preparation, format changes, interoperability, development workflows, and quick conversion checks.",
      tip: "Keep the original input available and confirm that the destination format matches your next system or workflow."
    },
    content: {
      intro: "This content utility helps writers, editors, students, and publishers analyze or transform text for a cleaner writing workflow.",
      workflow: "Paste or enter your text, run the requested operation, then review the output before using it in your document.",
      use: "Writing, editing, proofreading, content preparation, text cleanup, and publishing workflows.",
      tip: "Always review automated text changes so the final content keeps the intended meaning and context."
    },
    image: {
      intro: "This image utility helps with common visual-content tasks such as image information, dimensions, color values, or web-ready image data.",
      workflow: "Provide the supported image, value, or URL information and review the resulting visual or technical output.",
      use: "Web design, image optimization, accessibility, frontend development, and visual-content workflows.",
      tip: "Check the final visual or technical result in the environment where the image will actually be used."
    },
    marketing: {
      intro: "This marketing utility helps prepare content and campaign information for digital marketing, social media, and audience-focused workflows.",
      workflow: "Enter the relevant topic, campaign details, or content information and review the generated or processed result.",
      use: "Social media, content marketing, campaign planning, audience engagement, and promotional workflows.",
      tip: "Adapt the result to your audience, brand voice, platform requirements, and campaign objective."
    },
    security: {
      intro: "This security utility provides a focused way to generate, inspect, or transform security-related values for appropriate development and testing workflows.",
      workflow: "Provide only the information required by the tool and review the result before using it in your intended environment.",
      use: "Development, testing, security workflows, identifiers, hashes, and application utilities.",
      tip: "Never expose sensitive secrets or credentials unnecessarily, and use secure storage for real production secrets."
    },
    web: {
      intro: "This web utility helps inspect, construct, or work with common website, URL, HTTP, and browser-related information.",
      workflow: "Enter the relevant URL or web value, run the tool, and review the resulting technical information.",
      use: "Website troubleshooting, URL management, HTTP diagnostics, web development, and link workflows.",
      tip: "Verify important web configuration changes in the actual environment before deployment."
    },
    productivity: {
      intro: "This productivity utility helps simplify small organizational tasks so you can prepare information and complete routine work more efficiently.",
      workflow: "Enter the items or information required by the tool, run the operation, and review the result.",
      use: "Planning, organization, task preparation, quick decisions, and everyday workflows.",
      tip: "Review the output and adjust it to your actual priorities before relying on it."
    }
  };

  const context = categoryContext[cat] ?? {
    intro: "This browser-based utility provides a focused way to complete its supported task without unnecessary setup.",
    workflow: "Enter the required information, run the tool, and review the result before using it elsewhere.",
    use: "Quick task completion, preparation, checking, and everyday workflows.",
    tip: "Review important inputs and outputs before using the result in another system."
  };

  // Tool-specific wording for high-value search intents.
  const specific: Record<string, Partial<ToolSeoContent>> = {
    "keyword density checker": {
      intro: "Keyword Density Checker measures how frequently a target keyword appears compared with the total words in your content.",
      useCases: [
        "Review keyword usage across an article or landing page.",
        "Identify unusually frequent or underused target terms.",
        "Support content optimization without relying on manual word counting."
      ],
      tips: [
        "Focus on natural language and search intent rather than targeting an arbitrary keyword percentage.",
        "Review related terms and overall content quality alongside keyword frequency.",
        "Recheck the page after meaningful content edits."
      ]
    },
    "json formatter": {
      intro: "JSON Formatter restructures JSON into a readable format so developers can inspect nested objects, arrays, and values more easily.",
      useCases: [
        "Make minified JSON easier to read during development.",
        "Inspect API responses and configuration data.",
        "Prepare structured JSON for debugging or review."
      ],
      tips: [
        "Validate JSON when formatting fails or the input contains syntax errors.",
        "Keep sensitive API responses and credentials private.",
        "Compare formatted output with the original data before making changes."
      ]
    },
    "percentage calculator": {
      intro: "Percentage Calculator helps calculate common percentage values quickly, making comparisons and everyday numerical checks easier.",
      useCases: [
        "Calculate percentages of a given value.",
        "Check percentage changes and comparisons.",
        "Speed up routine calculations without manual arithmetic."
      ],
      tips: [
        "Confirm which percentage relationship you need before entering values.",
        "Use consistent units and values.",
        "Verify important financial or business calculations independently."
      ]
    },
    "password generator": {
      intro: "Password Generator creates random password values for accounts, applications, and testing workflows where strong unique credentials are required.",
      useCases: [
        "Create unique passwords for individual accounts.",
        "Generate test credentials during development.",
        "Avoid predictable manually created passwords."
      ],
      tips: [
        "Use a unique password for every important account.",
        "Store production credentials in a trusted password manager.",
        "Never share generated passwords or secrets unnecessarily."
      ]
    }
  };

  const custom = specific[name];

  switch (type) {
    case "calculator":
      return {
        intro:
          `${title} calculates the result you need from the relevant input values. ` +
          `It is useful for checking calculations quickly without doing repetitive arithmetic manually.`,
        howTo: [
          "Enter the values required by the calculator.",
          "Check that the inputs and units are correct.",
          "Run the calculation and review the result.",
          "Use the result in your planning, analysis, or workflow."
        ],
        useCases: [
          `Use ${name} for quick calculations during everyday planning or analysis.`,
          "Compare different inputs and see how they affect the result.",
          "Reduce repetitive manual arithmetic when checking multiple values."
        ],
        tips: [
          "Double-check important inputs before relying on the result.",
          "Keep units consistent when measurements are involved.",
          "Verify critical calculations independently when accuracy is important."
        ]
      };

    case "converter":
      return {
        intro:
          `${title} converts supported information from one format or representation into another. ` +
          `It provides a convenient way to transform values without installing separate software.`,
        howTo: [
          "Enter or paste the source value or data.",
          "Select the required conversion format when applicable.",
          "Run the conversion.",
          "Review and copy the converted result."
        ],
        useCases: [
          `Use ${name} when information needs to be transformed into another format.`,
          "Prepare values for another application or workflow.",
          "Quickly verify the converted representation before using it elsewhere."
        ],
        tips: [
          "Review converted output before importing or publishing it.",
          "Keep the original input when transforming important information.",
          "Make sure the destination system supports the resulting format."
        ]
      };

    case "generator":
      return {
        intro:
          `${title} generates a starting result from the information you provide. ` +
          `It can reduce repetitive work and help you prepare an initial result faster.`,
        howTo: [
          "Review the inputs available in the generator.",
          "Provide clear information relevant to the result you want.",
          "Generate the output.",
          "Review and customize the result before using it."
        ],
        useCases: [
          `Use ${name} to create a starting point for a specific task.`,
          "Reduce repetitive preparation work.",
          "Generate an initial result that can be reviewed and customized."
        ],
        tips: [
          "Use clear and relevant input for better results.",
          "Review generated output before publishing or deploying it.",
          "Customize generated results to match your actual requirements."
        ]
      };

    case "checker":
      return {
        intro:
          `${title} examines a specific property or condition in the supplied input and reports the result. ` +
          `It can help you identify potential issues before completing a workflow.`,
        howTo: [
          "Provide the input requested by the checker.",
          "Run the check.",
          "Review the reported result or warnings.",
          "Investigate and correct anything that requires attention."
        ],
        useCases: [
          `Use ${name} as a quick verification step before publishing or sharing.`,
          "Identify potential issues that deserve further investigation.",
          "Recheck content or data after making important changes."
        ],
        tips: [
          "Investigate important warnings instead of ignoring them.",
          "Fix the underlying issue rather than only changing the reported value.",
          "Run the check again after significant changes."
        ]
      };

    case "validator":
      return {
        intro:
          `${title} checks whether supplied input follows the expected structure or rules. ` +
          `It can help identify malformed data before another system processes it.`,
        howTo: [
          "Enter or paste the data you want to validate.",
          "Run the validation.",
          "Review validation errors or messages.",
          "Correct the input and validate it again."
        ],
        useCases: [
          "Catch malformed data before sending it to another system.",
          "Verify structured input during development and testing.",
          "Use validation as a troubleshooting or pre-deployment check."
        ],
        tips: [
          "Fix the underlying syntax or structure reported by the validator.",
          "Test representative inputs, including edge cases.",
          "Confirm that the final data matches the receiving system's requirements."
        ]
      };

    case "formatter":
      return {
        intro:
          `${title} restructures supported input into a cleaner and easier-to-read format. ` +
          `It is useful when code, text, or structured data is difficult to inspect.`,
        howTo: [
          "Paste the supported input into the formatter.",
          "Run the formatting operation.",
          "Review the formatted output.",
          "Copy the result back into your workflow."
        ],
        useCases: [
          "Make code or structured data easier to read.",
          "Improve consistency when reviewing or sharing content.",
          "Prepare messy input for debugging or further editing."
        ],
        tips: [
          "Review formatting changes before committing important files.",
          "Keep the original source available.",
          "Follow project-specific formatting rules when required."
        ]
      };

    default:
      return {
        intro:
          `${title} provides a focused browser-based utility for completing a specific task. ` +
          `It helps you process, inspect, create, or transform information without unnecessary setup.`,
        howTo: [
          "Review the inputs and options provided by the tool.",
          "Enter or paste the information required for the task.",
          "Run the tool and inspect the result.",
          "Copy or apply the result in your workflow."
        ],
        useCases: [
          `Use ${name} to complete its supported task quickly.`,
          "Use the result as a preparation or verification step.",
          "Reduce repetitive manual work in your normal workflow."
        ],
        tips: [
          "Review your input before processing it.",
          "Check important results before using them elsewhere.",
          "Keep the original input when making transformations or cleanup changes."
        ]
      };
  }
}
