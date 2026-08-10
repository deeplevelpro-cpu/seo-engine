#!/bin/bash

echo "🚀 Creating SEO Tools..."

for i in {1..50}
do
  DIR="app/tools/seo-tool-$i"

  mkdir -p $DIR

  if [ ! -f "$DIR/page.js" ]; then
    cat <<EOF > $DIR/page.js
export default function Page() {
  return (
    <div style={{padding: "20px"}}>
      <h1>SEO Tool $i</h1>
      <p>Tool $i is working 🚀</p>
    </div>
  )
}
EOF
    echo "✅ Created seo-tool-$i"
  else
    echo "⚠️ seo-tool-$i already exists"
  fi
done

echo "🎉 All tools ready!"
