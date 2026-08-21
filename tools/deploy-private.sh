#!/usr/bin/env bash
# =============================================================================
#  CHITTHI.IO — PRIVATE ORDER DEPLOYMENT (Netlify)
# =============================================================================
#  REAL customer keepsakes must not have readable source. This script:
#    1. creates the keepsake repo PRIVATE on GitHub (source locked away)
#    2. pushes the single-file build
#    3. publishes it to a Netlify site (GitHub Pages needs a paid plan for
#       private repos, so Netlify is the host for real orders)
#    4. waits for the first HTTP 200 and prints the live URL
#
#  The keepsake HTML already carries noindex,nofollow — the URL stays
#  private-by-obscurity, exactly like the studio's existing delivery model.
#
#  USAGE
#     export GH_TOKEN=ghp_xxx            # repo scope
#     export NETLIFY_AUTH_TOKEN=nfp_xxx  # owner's Netlify token (see below)
#     tools/deploy-private.sh <repo-name> <site-slug> "<commit subject>" [source-dir]
#
#  EXAMPLE
#     tools/deploy-private.sh Chitthi-Anya-Bday chitthi-anya-bday \
#       "personalise for Anya's birthday" build-anya
#
#  GETTING NETLIFY_AUTH_TOKEN (owner, 2 minutes, one time only)
#     https://app.netlify.com/user/applications#personal-access-tokens
#       → New access token → copy it → export NETLIFY_AUTH_TOKEN=nfp_...
#
#  NOTES
#     * slug must be unique across all of Netlify, lowercase, dashes only
#     * never reuse a slug from another customer
#     * re-running with the same slug updates the same site (revisions!)
#     * DRY=1 prints the plan without making any calls
# =============================================================================
set -euo pipefail

REPO="${1:?repo name required}"
SLUG="${2:?netlify site slug required}"
MSG="${3:-"chore: update keepsake"}"
DIR="${4:-.}"

OWNER="${GH_OWNER:-chitthi-io}"
TOKEN="${GH_TOKEN:-}"
NLTOKEN="${NETLIFY_AUTH_TOKEN:-}"
API="https://api.github.com"
NL="https://api.netlify.com/api/v1"
URL="https://${SLUG}.netlify.app/"

say() { printf "  %s\n" "$*"; }

if [ "${DRY:-0}" = "1" ]; then
  say "DRY RUN — nothing will be created or published:"
  say "  repo    : $OWNER/$REPO (private)"
  say "  source  : $DIR"
  say "  message : $MSG"
  say "  netlify : $URL (slug: $SLUG)"
  exit 0
fi

[ -n "$TOKEN" ] || { say "GH_TOKEN is required — export it first."; exit 1; }

cd "$DIR"
say "deploying $OWNER/$REPO → $URL"

# ------------------------------------------------------------------ 1. repo
code=$(curl -sS -o /tmp/priv_repo.json -w '%{http_code}' \
        -H "Authorization: token $TOKEN" "$API/repos/$OWNER/$REPO")
if [ "$code" = "404" ]; then
  say "repo missing — creating it PRIVATE"
  curl -sS -o /dev/null -X POST -H "Authorization: token $TOKEN" \
    -H "Accept: application/vnd.github+json" "$API/user/repos" \
    -d "{\"name\":\"$REPO\",\"private\":true,\"has_issues\":false,\"has_wiki\":false}"
else
  priv=$(python3 -c "import json;print(json.load(open('/tmp/priv_repo.json')).get('private'))" 2>/dev/null || echo "?")
  [ "$priv" = "True" ] || say "WARNING: repo exists but is NOT private ($priv) — customer source is exposed!"
fi

# ------------------------------------------------------------------ 2. commit
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

# ------------------------------------------------------------------ 3. push
git push -q "https://x-access-token:${TOKEN}@github.com/$OWNER/$REPO.git" main:main
say "pushed to private repo $OWNER/$REPO"

# ------------------------------------------------------------- 4. netlify
if [ -z "$NLTOKEN" ]; then
  say ""
  say "NETLIFY_AUTH_TOKEN not set — source is locked in the private repo,"
  say "but the keepsake is NOT published yet. Get the token from"
  say "https://app.netlify.com/user/applications#personal-access-tokens"
  say "then re-run this exact command to publish:"
  say ""
  say "  export NETLIFY_AUTH_TOKEN=nfp_xxx"
  say "  tools/deploy-private.sh $REPO $SLUG \"$MSG\" $DIR"
  exit 0
fi

site_json=$(curl -sS -H "Authorization: Bearer $NLTOKEN" "$NL/sites/$SLUG")
if echo "$site_json" | grep -q '"code":404'; then
  say "netlify site missing — creating for slug $SLUG"
  site_json=$(curl -sS -X POST -H "Authorization: Bearer $NLTOKEN" \
    -H "Content-Type: application/json" "$NL/sites" \
    -d "{\"name\":\"$SLUG\"}")
else
  say "netlify site exists — updating it (revision deploy)"
fi
SITE_ID=$(echo "$site_json" | python3 -c "import json,sys;print(json.load(sys.stdin)['id'])")

say "uploading build to netlify"
rm -f /tmp/chitthi_deploy.zip
zip -r -q /tmp/chitthi_deploy.zip .
curl -sS -o /tmp/priv_deploy.json -X POST \
  -H "Authorization: Bearer $NLTOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @/tmp/chitthi_deploy.zip \
  "$NL/sites/$SITE_ID/deploys" >/dev/null
rm -f /tmp/chitthi_deploy.zip

# ------------------------------------------------------------------ 5. wait
say "waiting for $URL"
for i in $(seq 1 24); do
  c=$(curl -sS -o /dev/null -w '%{http_code}' "$URL?cb=$RANDOM")
  if [ "$c" = "200" ]; then
    say "live after $((i*10))s"
    break
  fi
  sleep 10
done

# ------------------------------------------------------------------ 6. link
echo
echo "==============================================================="
echo "  LIVE (private source):  $URL"
echo "==============================================================="
