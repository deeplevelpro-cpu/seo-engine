cat << 'EOF' > create-missing-tools.sh
#!/bin/bash

BASE="app/tools"

for i in $(seq 51 100)
do
  DIR="$BASE/seo-tool-$i"

  mkdir -p "$DIR"

  cat > "$DIR/page.js" <<EOL
export default function Page() {
  return (
    <div style={{padding: "20px"}}>
      <h1>SEO Tool $i</h1>
      <p>Tool $i working ✅</p>
    </div>
  )
}
EOL

  echo "✅ Created seo-tool-$i"
done

echo "🔥 MISSING TOOLS CREATED (51–100)"
EOF
