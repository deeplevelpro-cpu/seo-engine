export function generateKeywords(seed) {
  const prefixes = ["best", "cheap", "top", "buy", "free"];
  const suffixes = ["tool", "software", "online", "generator", "checker"];

  let results = [];

  prefixes.forEach(p => {
    results.push(`${p} ${seed}`);
  });

  suffixes.forEach(s => {
    results.push(`${seed} ${s}`);
  });

  return results;
}

