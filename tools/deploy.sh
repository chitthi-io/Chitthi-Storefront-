#!/usr/bin/env bash
# =============================================================================
#  CHITTHI.IO — AUTOMATED TEMPLATE DEPLOYMENT  (Section IV)
# =============================================================================
#  Publishes a finished keepsake to its own GitHub Pages site and prints the
#  live URL ready to paste into WhatsApp.
#
#  USAGE
#     export GH_TOKEN=ghp_xxx            # needs repo + workflow scope
#     tools/deploy.sh <repo-name> "<commit subject>" [source-dir]
#
#  EXAMPLE
#     tools/deploy.sh Chitthi-Roast-And-Toast "launch Roast & Toast keepsake" build-roast
#
#  NOTES
#   * safe to re-run; creates the repo only if missing
#   * enables Pages via the API, then waits for the first 200
#   * never force-pushes over an existing history unless FORCE=1
# =============================================================================
set -euo pipefail

REPO="${1:?repo name required}"
MSG="${2:-"chore: update keepsake"}"
DIR="${3:-.}"
OWNER="${GH_OWNER:-chitthi-io}"
TOKEN="${GH_TOKEN:?export GH_TOKEN first}"
API="https://api.github.com"

say() { printf "  %s\n" "$*"; }

cd "$DIR"
say "deploying $OWNER/$REPO from $(pwd)"

# ---------------------------------------------------------------- 1. the repo
code=$(curl -sS -o /tmp/repo.json -w '%{http_code}' \
        -H "Authorization: token $TOKEN" "$API/repos/$OWNER/$REPO")
if [ "$code" = "404" ]; then
  say "repo missing — creating it"
  curl -sS -o /dev/null -X POST -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github+json" "$API/user/repos" \
    -d "{\"name\":\"$REPO\",\"private\":false,\"has_issues\":false,\"has_wiki\":false}"
else
  say "repo exists (HTTP $code)"
fi

# ------------------------------------------------------------------- 2. commit
[ -d .git ] || git init -q -b main
git config user.name  "${GIT_NAME:-chitthi-io}"
git config user.email "${GIT_EMAIL:-chitthi.io@users.noreply.github.com}"
git symbolic-ref HEAD refs/heads/main 2>/dev/null || true

git add -A
if git diff --cached --quiet; then
  say "nothing to commit"
else
  git -c commit.gpgsign=false commit -q -m "feat: $MSG"
  say "committed $(git rev-parse --short HEAD)"
fi

# --------------------------------------------------------------------- 3. push
PUSH_ARGS="main:main"
[ "${FORCE:-0}" = "1" ] && PUSH_ARGS="--force main:main"
git push -q "https://x-access-token:${TOKEN}@github.com/$OWNER/$REPO.git" $PUSH_ARGS
say "pushed to $OWNER/$REPO"

# -------------------------------------------------------------------- 4. pages
pg=$(curl -sS -o /dev/null -w '%{http_code}' -H "Authorization: token $TOKEN" \
      "$API/repos/$OWNER/$REPO/pages")
if [ "$pg" = "404" ]; then
  say "enabling GitHub Pages"
  curl -sS -o /dev/null -X POST -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github+json" "$API/repos/$OWNER/$REPO/pages" \
    -d '{"source":{"branch":"main","path":"/"}}'
else
  say "pages already enabled"
fi

# ------------------------------------------------------------------ 5. wait
URL="https://${OWNER}.github.io/${REPO}/"
say "waiting for $URL"
for i in $(seq 1 24); do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$URL?cb=$RANDOM")
  if [ "$c" = "200" ]; then
    say "live after $((i*10))s"
    break
  fi
  sleep 10
done

# --------------------------------------------------------------- 6. the link
echo
echo "==============================================================="
echo "  LIVE:  $URL"
echo "==============================================================="
