/**
 * Controlled semantic keyword expansion engine.
 *
 * Generates deterministic intent variants only.
 * It does NOT create routes by itself.
 * Duplicate and low-value variants are filtered.
 */

const STOPWORDS = new Set([
  "the", "a", "an", "for", "to", "of", "and",
  "in", "on", "with", "from", "by"
]);

function clean(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\\s-]/g, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function filterNumberedCollisions(values) {
  return values.filter((value) => !/-(?:\\d+)$/.test(String(value).trim()));
}

function unique(values) {
  return [...new Set(values.map(clean).filter(Boolean))];
}

export function buildControlledKeywordExpansion(keyword, slug = "") {
  const base = clean(keyword || slug);

  if (!base) {
    return {
      primary: "",
      secondary: [],
      longTail: [],
      intent: "informational",
    };
  }

  const words = base
    .split(" ")
    .filter((word) => word && !STOPWORDS.has(word));

  const core = words.join(" ") || base;

  const secondary = unique([
    `free ${core} tool`,
    `online ${core} tool`,
    `${core} checker`,
    `${core} generator`,
    `${core} calculator`,
    `${core} analyzer`,
  ]).filter((value) => value !== base);

  const longTail = unique([
    `how to use ${core}`,
    `how does ${core} work`,
    `${core} online free`,
    `${core} tool free online`,
    `best way to use ${core}`,
    `${core} examples and guide`,
  ]).filter(
    (value) =>
      value !== base &&
      !secondary.includes(value)
  );

  let intent = "informational";

  if (
    /calculator|checker|generator|converter|formatter|encoder|randomizer/i.test(
      slug || base
    )
  ) {
    intent = "transactional";
  } else if (/how|guide|tutorial|tips|examples|learn/i.test(base)) {
    intent = "informational";
  }

  return {
    primary: titleCase(base),
    secondary,
    longTail,
    intent,
    toolSlug: clean(slug).replace(/\\s+/g, "-"),
    blogSlug: clean(slug).replace(/\\s+/g, "-"),
  };
}

export function filterKeywordExpansion(cluster) {
  if (!cluster) return [];

  const values = unique([
    cluster.primary,
    ...(cluster.secondary || []),
    ...(cluster.longTail || []),
  ]);

  return values.filter((keyword) => {
    if (keyword.length < 3) return false;
    if (/^(test|tool|free tool|online tool)$/i.test(keyword)) return false;
    if (/[-_]\\d+$/i.test(keyword)) return false;
    return true;
  });
}
