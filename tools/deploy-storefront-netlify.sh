#!/usr/bin/env bash
# =============================================================================
#  CHITTHI.IO — STOREFRONT → NETLIFY (manual upload deploy)
# =============================================================================
#  Publishes the storefront to chitthi-io.netlify.app via a MANUAL zip upload.
#
#  WHY THIS EXISTS
#    The Netlify account hit "credit usage exceeded" on 21 Aug 2026, which
#    made every GitHub-linked auto-build fail ("Skipped due to account
#    credit usage exceeded"). Manual uploads do NOT consume build minutes,
#    so this keeps the canonical storefront deployable while the credit
#    situation is resolved (wait for monthly reset or upgrade the plan).
#
#  USAGE
#     export NETLIFY_AUTH_TOKEN=nfp_xxx      # once (see docs/HANDOFF.md)
#     tools/deploy-storefront-netlify.sh "what changed"
#
#  NOTES
#     * deploys exactly the storefront site files (no build-*/, .git, etc.)
#     * safe to re-run — each run creates a new deploy, last one publishes
# =============================================================================
set -euo pipefail

MSG="${1:-"storefront update"}"
NLTOKEN="${NETLIFY_AUTH_TOKEN:-}"
SITE_ID="d3b6cec3-0a8b-45b6-bb0f-5835086f4f9f"      # the chitthi-io site
URL="https://chitthi-io.netlify.app/"
NL="https://api.netlify.com/api/v1"

[ -n "$NLTOKEN" ] || { echo "export NETLIFY_AUTH_TOKEN first"; exit 1; }
cd "$(dirname "$0")/.."

say() { printf "  %s\n" "$*"; }
say "packing storefront for manual deploy → $URL"

rm -f /tmp/storefront_deploy.zip
zip -r -q /tmp/storefront_deploy.zip \
  index.html 404.html netlify.toml .nojekyll LICENSE \
  assets sitemap.xml robots.txt \
  -x "*.DS_Store"

say "uploading…"
curl -sS -o /tmp/sf_deploy.json -X POST \
  -H "Authorization: Bearer $NLTOKEN" \
  -H "Content-Type: application/zip" \
  --data-binary @/tmp/storefront_deploy.zip \
  "$NL/sites/$SITE_ID/deploys" >/dev/null
rm -f /tmp/storefront_deploy.zip
DEPLOY_ID=$(python3 -c "import json;print(json.load(open('/tmp/sf_deploy.json'))['id'])")
say "deploy $DEPLOY_ID — waiting for ready"

for i in $(seq 1 12); do
  state=$(curl -sS -H "Authorization: Bearer $NLTOKEN" "$NL/deploys/$DEPLOY_ID" \
          | python3 -c "import json,sys;print(json.load(sys.stdin).get('state',''))" 2>/dev/null || echo "")
  [ "$state" = "ready" ] && break
  sleep 10
done

if [ "$state" = "ready" ]; then
  echo
  echo "==============================================================="
  echo "  STOREFRONT LIVE (manual deploy):  $URL"
  echo "==============================================================="
else
  say "deploy did not reach ready (state=$state) — check https://app.netlify.com/projects/chitthi-io/deploys"
  exit 1
fi
