#!/usr/bin/env bash
# check-readability.sh — readability pre-save check for a level-page _index.md
#
# Usage:  scripts/check-readability.sh <path-to-_index.md>
# Tunable env vars:
#   MIN_FLESCH      default 50  — reject if Flesch Reading Ease BELOW this
#   MAX_GRADE       default 11  — reject if Flesch-Kincaid Grade Level ABOVE this
#
# Exit codes:
#   0  pass, or skipped (textstat not installed)
#   1  fail (readability outside target range) — caller should simplify
#   2  usage / IO error
#
# Setup: pip3 install textstat   (one-time, free)

set -u

FILE="${1:-}"

if [[ -z "$FILE" || ! -f "$FILE" ]]; then
  echo "usage: $0 <path-to-_index.md>" >&2
  exit 2
fi

# Level-aware default thresholds:
#   GCSE pages target a parent-of-Year-11 audience → Grade 9-10 sweet spot.
#   A-Level pages target a parent-of-Year-12/13 audience and use unavoidable
#   higher-grade vocab (UCAS, specification, evaluation) → Grade 10-12 OK.
LEVEL=$(grep -m1 '^level:' "$FILE" | sed -E 's/level: *"?([^"]+)"?.*/\1/')
if [[ "$LEVEL" == "A-Level" ]]; then
  MIN_FLESCH="${MIN_FLESCH:-45}"
  MAX_GRADE="${MAX_GRADE:-12}"
else
  MIN_FLESCH="${MIN_FLESCH:-50}"
  MAX_GRADE="${MAX_GRADE:-11}"
fi

# Detect textstat
if ! python3 -c "import textstat" 2>/dev/null; then
  echo "[readability] python3 textstat package not installed — skipping check." >&2
  echo "             To enable: pip3 install textstat  (free, one-time)" >&2
  exit 0
fi

# Extract body text (same fields as the AI-detection helper used)
BODY=$(python3 - <<'PY' "$FILE"
import sys, re
path = sys.argv[1]
with open(path) as f:
    text = f.read()
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

for block in re.finditer(r'^\s+body:\s*>\s*\n((?:^\s{6,}.*\n)+)', fm, re.M):
    out.append(' '.join(line.strip() for line in block.group(1).splitlines()))

print('\n\n'.join(out))
PY
)

if [[ -z "$BODY" ]]; then
  echo "[readability] could not extract body text from $FILE" >&2
  exit 2
fi

WORDS=$(echo "$BODY" | wc -w | tr -d ' ')
if (( WORDS < 50 )); then
  echo "[readability] body has fewer than 50 words — skipping (too short to score reliably)." >&2
  exit 0
fi

# Score it
RESULT=$(python3 - "$BODY" <<'PY'
import sys, textstat
text = sys.argv[1]
flesch = textstat.flesch_reading_ease(text)
grade  = textstat.flesch_kincaid_grade(text)
smog   = textstat.smog_index(text)
print(f"{flesch:.1f}|{grade:.1f}|{smog:.1f}")
PY
)

FLESCH=$(echo "$RESULT" | cut -d'|' -f1)
GRADE=$(echo "$RESULT" | cut -d'|' -f2)
SMOG=$(echo "$RESULT" | cut -d'|' -f3)

VERDICT=$(python3 -c "
flesch, grade = float('$FLESCH'), float('$GRADE')
min_f, max_g = float('$MIN_FLESCH'), float('$MAX_GRADE')
print('FAIL' if (flesch < min_f or grade > max_g) else 'PASS')
")

PATH_LABEL="$(basename "$(dirname "$(dirname "$FILE")")")/$(basename "$(dirname "$FILE")")"
printf "[readability] %s  Flesch=%s  Grade=%s  SMOG=%s  %s  (target: Flesch≥%s, Grade≤%s)\n" \
  "$PATH_LABEL" "$FLESCH" "$GRADE" "$SMOG" "$VERDICT" "$MIN_FLESCH" "$MAX_GRADE"

if [[ "$VERDICT" == "FAIL" ]]; then
  cat >&2 <<HINT
[readability] To improve readability:
  - Cut long sentences (target avg < 18 words)
  - Replace multi-syllable words (e.g. "demonstrate" -> "show", "additionally" already banned)
  - Add contractions ("it's", "don't", "we'd")
  - Cut "that" where the sentence still works
HINT
  exit 1
fi
exit 0
