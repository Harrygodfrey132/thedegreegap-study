#!/usr/bin/env bash
# check-ai-score.sh — Originality.ai pre-save check for a level-page _index.md
#
# Usage:  scripts/check-ai-score.sh <path-to-_index.md>
# Env:    ORIGINALITY_API_KEY  (required — get from originality.ai)
# Tunable: AI_THRESHOLD (default 0.30; reject above)
#
# Exit codes:
#   0  pass (AI score below threshold) or skipped (no API key)
#   1  fail (AI score above threshold) — caller should rewrite
#   2  usage / IO error

set -u

FILE="${1:-}"
THRESHOLD="${AI_THRESHOLD:-0.30}"

if [[ -z "$FILE" || ! -f "$FILE" ]]; then
  echo "usage: $0 <path-to-_index.md>" >&2
  exit 2
fi

if [[ -z "${ORIGINALITY_API_KEY:-}" ]]; then
  echo "[ai-check] ORIGINALITY_API_KEY not set — skipping AI detection scan." >&2
  echo "          To enable: export ORIGINALITY_API_KEY='<your-key>' (sign up at originality.ai)." >&2
  exit 0
fi

# Extract the body text we want scored: hero_lead, first_lesson_context, tutor_strip_body,
# pathway bodies, and FAQ answers. These are the LLM-written paragraphs.
# Reviews are excluded (real customer text, would skew the score downward and isn't ours to "fix").
BODY=$(python3 - <<PY "$FILE"
import sys, re
path = sys.argv[1]
with open(path) as f:
    text = f.read()

# Parse the YAML frontmatter region
m = re.match(r'---\s*\n(.*?\n)---', text, re.S)
if not m:
    sys.exit("no frontmatter found")
fm = m.group(1)

fields = ["hero_lead", "first_lesson_context", "tutor_strip_body",
          "faq_1_a", "faq_2_a", "faq_3_a", "faq_4_a"]

out = []
for fname in fields:
    fm_re = re.search(rf'^{fname}:\s*"((?:[^"\\]|\\.)*)"', fm, re.M)
    if fm_re:
        out.append(fm_re.group(1).replace('\\"', '"'))

# Pathway bodies use block scalar (> indented). Pull each block body.
for block in re.finditer(r'^\s+body:\s*>\s*\n((?:^\s{6,}.*\n)+)', fm, re.M):
    out.append(' '.join(line.strip() for line in block.group(1).splitlines()))

print('\n\n'.join(out))
PY
)

if [[ -z "$BODY" ]]; then
  echo "[ai-check] could not extract body text from $FILE" >&2
  exit 2
fi

WORDS=$(echo "$BODY" | wc -w | tr -d ' ')
if (( WORDS < 50 )); then
  echo "[ai-check] body has fewer than 50 words — skipping (too short to score)." >&2
  exit 0
fi

# Call Originality.ai
TITLE="$(basename "$(dirname "$FILE")")-$(basename "$(dirname "$(dirname "$FILE")")")"
JSON_PAYLOAD=$(python3 -c 'import json,sys; print(json.dumps({"content":sys.stdin.read(),"title":sys.argv[1],"aiModelVersion":"1"}))' "$TITLE" <<<"$BODY")

RESP=$(curl -sS -X POST https://api.originality.ai/api/v1/scan/ai \
  -H "X-OAI-API-KEY: $ORIGINALITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD")

AI_SCORE=$(echo "$RESP" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("score",{}).get("ai", "ERROR"))' 2>/dev/null)

if [[ "$AI_SCORE" == "ERROR" || -z "$AI_SCORE" ]]; then
  echo "[ai-check] could not parse Originality.ai response:" >&2
  echo "$RESP" >&2
  exit 2
fi

# Compare with threshold (python for float arithmetic)
VERDICT=$(python3 -c "print('FAIL' if float('$AI_SCORE') > float('$THRESHOLD') else 'PASS')")

printf "[ai-check] %s  AI=%s  threshold=%s  %s\n" \
  "$(basename "$(dirname "$FILE")")/$(basename "$(dirname "$(dirname "$FILE")")")" \
  "$AI_SCORE" "$THRESHOLD" "$VERDICT"

if [[ "$VERDICT" == "FAIL" ]]; then
  exit 1
fi
exit 0
