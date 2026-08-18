#!/usr/bin/env bash
set -euo pipefail

ARTICLE="${1:-}"
IMAGE="${2:-}"

if [ -z "$ARTICLE" ]; then
  echo "Usage: ./scripts/publish-article-safe.sh ARTICLE.md IMAGE.png"
  exit 1
fi

if [ ! -f "$ARTICLE" ]; then
  echo "❌ Article not found: $ARTICLE"
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP=".article-publish-backup-$STAMP"

mkdir -p "$BACKUP"
cp data/articles.ts "$BACKUP/articles.ts"

echo "============================================================"
echo "📝 PUBLISHING ARTICLE"
echo "============================================================"

if [ -n "$IMAGE" ]; then
  node scripts/publish-article.mjs --file "$ARTICLE" --image "$IMAGE"
else
  node scripts/publish-article.mjs --file "$ARTICLE"
fi

echo
echo "============================================================"
echo "🧪 TYPECHECK"
echo "============================================================"

if ! npx tsc --noEmit; then
  echo "❌ TYPECHECK FAILED"
  cp "$BACKUP/articles.ts" data/articles.ts
  echo "✓ Registry restored"
  exit 1
fi

echo "✓ TYPESCRIPT PASSED"

echo
echo "============================================================"
echo "🏗️ PRODUCTION BUILD"
echo "============================================================"

if ! npm run build; then
  echo "❌ BUILD FAILED"
  cp "$BACKUP/articles.ts" data/articles.ts
  echo "✓ Registry restored"
  exit 1
fi

echo
echo "============================================================"
echo "🎉 ARTICLE PUBLISH SUCCESSFUL"
echo "============================================================"
echo "✓ Registry updated"
echo "✓ Image handled"
echo "✓ Duplicate protection"
echo "✓ TypeScript passed"
echo "✓ Production build passed"
echo "✓ Backup: $BACKUP"
echo "============================================================"
