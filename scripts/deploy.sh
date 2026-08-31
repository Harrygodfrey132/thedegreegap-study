#!/usr/bin/env bash
#
# Build the study site and ship it to the Apache box that serves
# thedegreegap.com/study/.
#
# The repo is not wired to any CI, so pushing to GitHub does not put anything
# live. This script is the step that does.
#
# Usage:
#   ./scripts/deploy.sh              # build and deploy
#   DRY_RUN=1 ./scripts/deploy.sh    # show what would change, transfer nothing
#
# Override any of these from the environment if the server moves:
#   DEPLOY_HOST, DEPLOY_USER, DEPLOY_PATH, DEPLOY_KEY

set -euo pipefail

DEPLOY_HOST="${DEPLOY_HOST:-18.134.153.45}"
DEPLOY_USER="${DEPLOY_USER:-ubuntu}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/html/study}"
DEPLOY_KEY="${DEPLOY_KEY:-$HOME/.ssh/id_ed25519}"

cd "$(dirname "$0")/.."

if [[ ! -f "$DEPLOY_KEY" ]]; then
  echo "SSH key not found at $DEPLOY_KEY" >&2
  exit 1
fi

echo "==> Building"
# --cleanDestinationDir so removed pages do not linger in public/ and get
# re-uploaded. enableGitInfo means this needs to run inside the git repo.
#
# No --minify: the stylesheet is already minified through the asset pipeline in
# baseof.html, and HTML minification was never part of this site's output, so
# turning it on here would ship something different from what gets tested.
hugo --cleanDestinationDir

# A `hugo server` left running renders over public/ with its own localhost
# baseURL, and it can do that between the build above and the rsync below.
# Shipping that would put <link rel="canonical" href="http://localhost:...">
# on every page and point every form's _next redirect at a dead address, so
# check the build we are about to send rather than trusting it.
if grep -rlq 'http://localhost:' public/ 2>/dev/null; then
  echo "ABORT: public/ contains localhost URLs, so a dev server has rendered over the build." >&2
  echo "       Stop any running 'hugo server' and re-run this script." >&2
  grep -rl 'http://localhost:' public/ 2>/dev/null | head -3 | sed 's/^/       e.g. /' >&2
  exit 1
fi

# Trailing slash on the source is load-bearing: it copies the contents of
# public/ into DEPLOY_PATH rather than nesting a public/ directory inside it.
RSYNC_ARGS=(
  -avz --delete
  --exclude '.DS_Store'
  -e "ssh -i $DEPLOY_KEY"
  public/
  "${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/"
)

if [[ -n "${DRY_RUN:-}" ]]; then
  echo "==> Dry run, nothing will be transferred"
  RSYNC_ARGS=(--dry-run "${RSYNC_ARGS[@]}")
fi

echo "==> Deploying to ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}"
rsync "${RSYNC_ARGS[@]}"

if [[ -z "${DRY_RUN:-}" ]]; then
  echo "==> Done. Verifying the new build is live"
  # The fingerprinted stylesheet only exists in the new build, so its presence
  # is proof the deploy landed rather than a cached copy of the old one.
  # Read the page into a variable first. Piping curl into `grep -q` makes grep
  # exit on the first match, which SIGPIPEs curl into exit 23, and pipefail then
  # reports every successful deploy as a failure.
  live_html="$(curl -sS -m 20 https://thedegreegap.com/study/ || true)"
  if grep -q 'main\.min\.[0-9a-f]\{64\}\.css' <<<"$live_html"; then
    echo "    live build confirmed"
  else
    echo "    WARNING: live page still references the old stylesheet." >&2
    echo "    Check DEPLOY_PATH is the docroot Apache serves at /study/," >&2
    echo "    then purge the Cloudflare cache." >&2
  fi
fi
