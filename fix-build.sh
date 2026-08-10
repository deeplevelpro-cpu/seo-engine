#!/bin/bash

echo "🔧 Fixing contentGenerator..."

mkdir -p src/lib

cat <<EOL > src/lib/contentGenerator.js
export function generateContent(keyword) {
  return {
    title: keyword,
    description: \`Best tool for \${keyword}\`,
    content: \`This is a powerful SEO tool for \${keyword}. It helps improve rankings and traffic.\`
  };
}

export function generateBlogContent(keyword) {
  return {
    title: keyword,
    content: \`This is a detailed blog about \${keyword}. Learn SEO strategies and tips.\`
  };
}
EOL

echo "🔧 Fixing import paths..."

find app -type f -name "*.js" -exec sed -i 's|@/src/lib/contentGenerator|@/lib/contentGenerator|g' {} \;

echo "✅ FIX COMPLETE"
