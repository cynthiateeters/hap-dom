#!/usr/bin/env bash
# Layer 1: Static analysis checks for HAP's Learning Lab: The DOM
# Runs against source files — no browser or server needed.

set -euo pipefail

PAGES_DIR="src/pages"
INVENTORY="skills/hap-image-validation/hap-cloudinary-complete-inventory.md"
ERRORS=0
WARNINGS=0

red()    { printf '\033[0;31m%s\033[0m\n' "$1"; }
green()  { printf '\033[0;32m%s\033[0m\n' "$1"; }
yellow() { printf '\033[0;33m%s\033[0m\n' "$1"; }
bold()   { printf '\033[1m%s\033[0m\n' "$1"; }

# ─── 1.1 HAP Voice Compliance ───────────────────────────────────────────────

bold "═══ 1.1 HAP Voice Compliance ═══"

# Patterns to flag (case-insensitive)
VOICE_PATTERNS=(
  'you should'
  'obviously'
  "it's simple"
  'it is simple'
  'simply'
)

# "just" only in imperative patterns to reduce false positives
JUST_PATTERNS=(
  'just do'
  'just use'
  'just add'
  'just put'
  'just set'
  'just change'
  'just click'
  'just run'
  'just write'
  'just make'
  'just call'
  'just pass'
  'just wrap'
  'just copy'
)

voice_violations=0

for pattern in "${VOICE_PATTERNS[@]}"; do
  results=$(rg -i -n "$pattern" "$PAGES_DIR" --glob '*.astro' 2>/dev/null || true)
  if [ -n "$results" ]; then
    red "  VIOLATION: \"$pattern\""
    echo "$results" | while IFS= read -r line; do echo "    $line"; done
    voice_violations=$((voice_violations + 1))
  fi
done

for pattern in "${JUST_PATTERNS[@]}"; do
  # Match imperative "just X" but exclude negated forms like "doesn't just", "don't just", "not just"
  results=$(rg -i -n "\\b${pattern}\\b" "$PAGES_DIR" --glob '*.astro' 2>/dev/null | rg -v -i "n't just|not just|doesn't just|don't just" 2>/dev/null || true)
  if [ -n "$results" ]; then
    red "  VIOLATION: \"$pattern\""
    echo "$results" | while IFS= read -r line; do echo "    $line"; done
    voice_violations=$((voice_violations + 1))
  fi
done

if [ "$voice_violations" -eq 0 ]; then
  green "  ✓ No voice violations found"
else
  ERRORS=$((ERRORS + voice_violations))
fi

# ─── 1.2 Copyright Comment ──────────────────────────────────────────────────

bold "═══ 1.2 Copyright Comment ═══"

copyright_string="HAP Educational Content © 2026 Cynthia Teeters. All rights reserved."

for file in $(fd -e astro . "$PAGES_DIR"); do
  if ! rg -q "$copyright_string" "$file" 2>/dev/null; then
    red "  MISSING: $file"
    ERRORS=$((ERRORS + 1))
  else
    green "  ✓ $file"
  fi
done

# ─── 1.3 CSS Color Enforcement ──────────────────────────────────────────────

bold "═══ 1.3 CSS Color Enforcement ═══"

color_violations=0

for file in $(fd -e astro . "$PAGES_DIR"); do
  # Check for hex colors in style blocks and inline styles, excluding code examples
  # Skip lines inside CodeBlock template literals (backtick strings)
  results=$(rg -n '#[0-9a-fA-F]{3,8}\b' "$file" 2>/dev/null | \
    rg -v 'cloudinary|code\b.*=|`.*#|res\.cloudinary\.com' 2>/dev/null || true)

  if [ -n "$results" ]; then
    # Further filter: only flag if it looks like CSS (style= or inside <style>)
    style_results=$(echo "$results" | rg -i 'style|color|background|border|--' 2>/dev/null || true)
    if [ -n "$style_results" ]; then
      red "  HEX COLOR: $file"
      echo "$style_results" | while IFS= read -r line; do echo "    $line"; done
      color_violations=$((color_violations + 1))
    fi
  fi

  # Check for rgb( usage in styles
  rgb_results=$(rg -n 'rgb\(' "$file" 2>/dev/null | \
    rg -v '`.*rgb|code.*rgb' 2>/dev/null || true)
  if [ -n "$rgb_results" ]; then
    style_rgb=$(echo "$rgb_results" | rg -i 'style|color|background|border|--' 2>/dev/null || true)
    if [ -n "$style_rgb" ]; then
      red "  RGB COLOR: $file"
      echo "$style_rgb" | while IFS= read -r line; do echo "    $line"; done
      color_violations=$((color_violations + 1))
    fi
  fi
done

if [ "$color_violations" -eq 0 ]; then
  green "  ✓ No hex/rgb color violations found"
else
  ERRORS=$((ERRORS + color_violations))
fi

# ─── 1.4 Image URL Verification ─────────────────────────────────────────────

bold "═══ 1.4 Image URL Verification ═══"

image_issues=0

if [ -f "$INVENTORY" ]; then
  # Extract all Cloudinary URLs from .astro files
  for file in $(fd -e astro . "$PAGES_DIR"); do
    urls=$(rg -o 'https://res\.cloudinary\.com/[^"'"'"'\s)]+' "$file" 2>/dev/null || true)
    if [ -n "$urls" ]; then
      while IFS= read -r url; do
        # Extract filename (last segment before any query params)
        filename=$(echo "$url" | rg -o '[^/]+\.[a-z]{3,4}$' 2>/dev/null | head -1 || true)
        if [ -n "$filename" ]; then
          # Strip extension for inventory lookup
          base=$(echo "$filename" | sd '\.[a-z]{3,4}$' '')
          if ! rg -q "$base" "$INVENTORY" 2>/dev/null; then
            red "  NOT IN INVENTORY: $base ($file)"
            image_issues=$((image_issues + 1))
          fi
        fi
      done <<< "$urls"
    fi
  done

  if [ "$image_issues" -eq 0 ]; then
    green "  ✓ All image references found in inventory"
  else
    WARNINGS=$((WARNINGS + image_issues))
  fi
else
  yellow "  ⚠ Inventory file not found: $INVENTORY"
  WARNINGS=$((WARNINGS + 1))
fi

# ─── 1.5 Heading Case Enforcement ───────────────────────────────────────────

bold "═══ 1.5 Heading Case (manual review) ═══"

# Extract h2/h3 headings for review
for file in $(fd -e astro . "$PAGES_DIR"); do
  headings=$(rg -n '<h[23][^>]*>([^<]+)</h[23]>' "$file" -o --replace '$1' 2>/dev/null || true)
  if [ -n "$headings" ]; then
    echo "  $file:"
    echo "$headings" | while IFS= read -r h; do
      echo "    $h"
    done
  fi
done

# ─── 1.6 Internal Link Cross-reference ──────────────────────────────────────

bold "═══ 1.6 Internal Link Cross-reference ═══"

link_issues=0

for file in $(fd -e astro . "$PAGES_DIR"); do
  # Extract internal hrefs (starting with /)
  hrefs=$(rg -o 'href="(/[^"]*)"' "$file" --replace '$1' 2>/dev/null || true)
  if [ -n "$hrefs" ]; then
    while IFS= read -r href; do
      # Skip anchors and external
      if echo "$href" | rg -q '^/#' 2>/dev/null; then continue; fi

      # Map route to file: /stations/station1/ → src/pages/stations/station1.astro
      route=$(echo "$href" | sd '/$' '' | sd '^/' '')
      astro_file="$PAGES_DIR/${route}.astro"

      if [ ! -f "$astro_file" ]; then
        # Try index.astro
        astro_index="$PAGES_DIR/${route}/index.astro"
        if [ ! -f "$astro_index" ]; then
          red "  BROKEN LINK: $href (in $file)"
          link_issues=$((link_issues + 1))
        fi
      fi
    done <<< "$hrefs"
  fi
done

if [ "$link_issues" -eq 0 ]; then
  green "  ✓ All internal links resolve"
else
  ERRORS=$((ERRORS + link_issues))
fi

# ─── 1.7 Navigation Contract Verification ───────────────────────────────────

bold "═══ 1.7 Navigation Contracts ═══"

nav_issues=0

# Check station numbers (1-6, no gaps)
bold "  Station numbers:"
for i in 1 2 3 4 5 6; do
  file="$PAGES_DIR/stations/station${i}.astro"
  if [ -f "$file" ]; then
    sn=$(rg -o 'stationNumber=\{([0-9]+)\}' "$file" --replace '$1' 2>/dev/null | head -1 || true)
    if [ "$sn" = "$i" ]; then
      green "    ✓ station${i}.astro → stationNumber={${i}}"
    else
      red "    ✗ station${i}.astro → stationNumber={${sn}} (expected ${i})"
      nav_issues=$((nav_issues + 1))
    fi
  else
    red "    ✗ station${i}.astro missing"
    nav_issues=$((nav_issues + 1))
  fi
done

# Check cheat sheet links (stations 2, 3, 4)
bold "  Cheat sheet props:"

for sn in 2 3 4; do
  file="$PAGES_DIR/stations/station${sn}.astro"
  case $sn in
    2) expected="/cheat-sheets/pushing-back/" ;;
    3) expected="/cheat-sheets/selectors-and-reading/" ;;
    4) expected="/cheat-sheets/dom-security/" ;;
  esac
  actual=$(rg -o 'cheatSheetUrl="([^"]+)"' "$file" --replace '$1' 2>/dev/null | head -1 || true)
  if [ "$actual" = "$expected" ]; then
    green "    ✓ station${sn} → cheatSheetUrl=${expected}"
  else
    red "    ✗ station${sn} → cheatSheetUrl=${actual} (expected ${expected})"
    nav_issues=$((nav_issues + 1))
  fi

  # Verify the cheat sheet file exists
  cs_route=$(echo "$expected" | sd '/$' '' | sd '^/' '')
  cs_file="$PAGES_DIR/${cs_route}.astro"
  if [ -f "$cs_file" ]; then
    green "    ✓ ${cs_file} exists"
  else
    red "    ✗ ${cs_file} missing"
    nav_issues=$((nav_issues + 1))
  fi
done

# Check demo links (stations 3, 4, 5)
bold "  Demo props:"

for sn in 3 4 5; do
  file="$PAGES_DIR/stations/station${sn}.astro"
  case $sn in
    3) expected="/demos/selector-playground/" ;;
    4) expected="/demos/dom-modifier/" ;;
    5) expected="/demos/badge-builder/" ;;
  esac
  actual=$(rg -o 'demoUrl="([^"]+)"' "$file" --replace '$1' 2>/dev/null | head -1 || true)
  if [ "$actual" = "$expected" ]; then
    green "    ✓ station${sn} → demoUrl=${expected}"
  else
    red "    ✗ station${sn} → demoUrl=${actual} (expected ${expected})"
    nav_issues=$((nav_issues + 1))
  fi

  demo_route=$(echo "$expected" | sd '/$' '' | sd '^/' '')
  demo_file="$PAGES_DIR/${demo_route}.astro"
  if [ -f "$demo_file" ]; then
    green "    ✓ ${demo_file} exists"
  else
    red "    ✗ ${demo_file} missing"
    nav_issues=$((nav_issues + 1))
  fi
done

# Check hub completeness
bold "  Hub page links:"
hub_file="$PAGES_DIR/index.astro"

expected_routes=(
  "/stations/station1/"
  "/stations/station2/"
  "/stations/station3/"
  "/stations/station4/"
  "/stations/station5/"
  "/stations/station6/"
  "/demos/selector-playground/"
  "/demos/dom-modifier/"
  "/demos/badge-builder/"
  "/cheat-sheets/pushing-back/"
  "/cheat-sheets/selectors-and-reading/"
  "/cheat-sheets/dom-security/"
)

for route in "${expected_routes[@]}"; do
  if rg -q "\"${route}\"" "$hub_file" 2>/dev/null; then
    green "    ✓ hub → ${route}"
  else
    red "    ✗ hub missing link to ${route}"
    nav_issues=$((nav_issues + 1))
  fi
done

if [ "$nav_issues" -gt 0 ]; then
  ERRORS=$((ERRORS + nav_issues))
fi

# ─── Summary ────────────────────────────────────────────────────────────────

echo ""
bold "═══ Static Analysis Summary ═══"
if [ "$ERRORS" -gt 0 ]; then
  red "  ERRORS: $ERRORS"
fi
if [ "$WARNINGS" -gt 0 ]; then
  yellow "  WARNINGS: $WARNINGS"
fi
if [ "$ERRORS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
  green "  All checks passed!"
fi

exit "$ERRORS"
