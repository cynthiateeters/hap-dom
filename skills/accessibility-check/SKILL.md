# Accessibility validation (WCAG 2.2 Level AA)

## Description

Systematic validation of WCAG 2.2 Level AA accessibility compliance BEFORE committing ANY HTML. This Skill prevents the accessibility issues that required 5+ Lighthouse audit cycles in the Colors project by catching problems early in development.

## When to use this Skill

**ALWAYS** use this Skill:
- Before committing ANY HTML file
- After creating new stations or demos
- After editing existing HTML content
- Before running Lighthouse audits
- When adding new color combinations
- When adding interactive elements

**NEVER** commit HTML without running through this checklist.

## Progressive validation steps

### Step 1: Text contrast validation

Check ALL text meets minimum contrast ratios against backgrounds.

**WCAG AA requirements**:
- Normal text (< 18px): **4.5:1 contrast minimum**
- Large text (≥18px or ≥14px bold): **3:1 contrast minimum**

**HAP Learning Lab color system** (pre-validated for cream/peach backgrounds):

> **Single source of truth**: All color values are defined in `css/style.css` using `hsl()` format with alpha channel where needed. See `:root` variables (lines 40-100) for actual color values.

**Text on cream/peach backgrounds** (`--cream-white`, `--peach-background`):
- [ ] Normal body text uses `--dark-brown` — 9.5:1 contrast ✅
- [ ] Secondary text uses `--medium-brown` — 5.3:1 contrast ✅
- [ ] Links/interactive uses `--teal-darker` — 4.5:1 contrast ✅
- [ ] Large bold orange uses `--orange-darker` — 3.1:1 contrast ✅
- [ ] Normal orange text uses `--orange-darkest` — 4.5:1 contrast ✅

**Status indicators**:
- [ ] Success text uses `--success-darker` — 4.5:1 contrast ✅
- [ ] Error text uses `--error-darker` — 4.5:1 contrast ✅

**Validation tools**:
1. Chrome DevTools → Elements → Accessibility pane (shows contrast ratio)
2. WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
3. Lighthouse audit (catches contrast issues)

**Common mistakes**:
- ❌ Using base `--warm-orange` for normal text (only 2.7:1 contrast — fails WCAG AA)
- ❌ Using light colors on light backgrounds
- ❌ Hardcoding hex or rgb() colors instead of using CSS custom properties
- ❌ Custom colors without validation

### Step 2: Semantic HTML validation

Check page uses proper semantic elements (NOT generic divs).

**Required semantic structure**:
- [ ] `<header>` for page header (NOT `<div class="header">`)
- [ ] `<nav>` for navigation sections (with `aria-label`)
- [ ] `<main id="main-content">` for main content (ONE per page)
- [ ] `<article>` for station content
- [ ] `<section>` for content sections
- [ ] `<footer>` for page footer
- [ ] `<aside>` for supplementary content (if applicable)

**Heading hierarchy validation**:
- [ ] ONE `<h1>` per page (page title)
- [ ] `<h2>` for section headings
- [ ] `<h3>` for subsection headings
- [ ] NO skipped levels (h1 → h3 without h2)
- [ ] NO empty headings (`<h3></h3>`)

**Validation command** (run in DevTools console):
```javascript
// Check for empty headings
Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  .filter(h => h.textContent.trim() === '').length
// Should return: 0
```

### Step 3: ARIA labels validation

Check all landmarks and navigation have descriptive labels.

**Required ARIA labels**:
- [ ] `<nav aria-label="Page navigation">` — Top station navigation
- [ ] `<nav aria-label="Bottom navigation">` — Bottom station navigation
- [ ] `<nav aria-label="Learning stations">` — Hub page stations grid
- [ ] `<main id="main-content">` — Main content landmark

**Interactive elements**:
- [ ] Buttons have descriptive `aria-label` when icon-only
- [ ] Links have descriptive text (NOT "click here")
- [ ] Form inputs have associated `<label>` elements

**Validation check**:
- [ ] All `<nav>` elements have `aria-label`
- [ ] All interactive elements have accessible names
- [ ] No generic labels ("Navigation 1", "Section 2")

### Step 4: Keyboard navigation validation

Check all interactive elements are keyboard accessible.

**Tab order validation**:
- [ ] Skip link is FIRST element in `<body>`
- [ ] Tab order follows visual order
- [ ] ALL interactive elements receive focus
- [ ] Focus indicator visible on ALL elements

**Skip link requirement** (MUST be first in body):
```html
<body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- Rest of page -->
</body>
```

**Main content ID**:
```html
<main id="main-content">
```

**Test procedure**:
1. Load page in browser
2. Press Tab key repeatedly
3. Verify skip link appears first
4. Verify all interactive elements get focus
5. Verify focus indicator clearly visible

### Step 5: Color independence validation

Check information is NOT conveyed by color alone.

**Requirements**:
- [ ] Success/error states have icons AND color (NOT just green/red)
- [ ] Links distinguishable from text (underline, bold, or icon)
- [ ] Interactive elements have text labels (NOT just colored backgrounds)
- [ ] Charts/graphs have labels AND colors

**Good patterns**:
- ✅ "✅ RIGHT: What I Learned" (checkmark + color + text)
- ✅ "❌ WRONG: HAP's Old Way" (X + color + text)
- ✅ Links with underline + color

**Bad patterns**:
- ❌ Red text only for errors (no icon)
- ❌ Green background only for success (no text/icon)
- ❌ Color-only status indicators

### Step 6: Image accessibility validation

Check ALL images have proper alt text and attributes.

**Required image attributes**:
```html
<img src="[url]"
     alt="[Descriptive text]"
     width="[width]"
     height="[height]"
     decoding="async"
     [loading="lazy"]
     [fetchpriority="high"]>
```

**Alt text rules**:
- [ ] ALL images have `alt` attribute (required)
- [ ] Descriptive alt text (NOT "image of...")
- [ ] Decorative images: `alt=""` (empty, not omitted)
- [ ] Complex images: alt + longdesc or caption
- [ ] HAP character: "HAP at his laptop" / "HAP looking excited" (describes expression)

**Image loading optimization**:
- [ ] `width` and `height` attributes present (prevents layout shift)
- [ ] `decoding="async"` on most images
- [ ] `loading="lazy"` on below-fold images
- [ ] `fetchpriority="high"` ONLY on LCP image (HAP avatar)

**Validation**:
```javascript
// Check for images without alt
Array.from(document.querySelectorAll('img')).filter(img => !img.hasAttribute('alt')).length
// Should return: 0
```

### Step 7: Pre-commit checklist

Run this checklist before EVERY commit:

**Accessibility fundamentals**:
- [ ] Skip link is first element in body
- [ ] Main content has `id="main-content"`
- [ ] All nav elements have `aria-label`
- [ ] One `<h1>` per page, proper heading hierarchy
- [ ] All images have alt text
- [ ] All images have width/height attributes

**Color and contrast**:
- [ ] All text meets 4.5:1 contrast (or 3:1 for large text)
- [ ] Using approved HAP color variables for text
- [ ] No color-only information (always paired with text/icons)

**Semantic HTML**:
- [ ] Using semantic elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [ ] No empty headings
- [ ] No skipped heading levels

**Keyboard navigation**:
- [ ] Tab through entire page works
- [ ] Focus indicators visible
- [ ] All interactive elements reachable by keyboard

### Step 8: Lighthouse validation

After passing manual checks, validate with Lighthouse.

**Run Lighthouse audit**:
1. Open page in Chrome
2. DevTools → Lighthouse tab
3. Select "Accessibility" category
4. Click "Analyze page load"

**Target score**: **100/100** (MANDATORY for all HAP Learning Labs)

**Common Lighthouse issues caught**:
- Insufficient color contrast
- Missing form labels
- Missing ARIA labels on landmarks
- Images without alt text
- Empty headings
- Links without descriptive text
- Duplicate IDs

**If score < 100**:
1. Review each failed audit
2. Fix issues in HTML
3. Re-run Lighthouse
4. Repeat until 100/100

## Common accessibility mistakes

From Colors project analysis (5 Lighthouse audit cycles):

1. **Missing nav landmark on hub page**
   - Issue: Station cards not wrapped in `<nav>` element
   - Fix: Wrap stations grid with `<nav aria-label="Learning stations">`

2. **Empty headings**
   - Issue: `<h3></h3>` tags with no content
   - Fix: Add text content, remove heading, or use `aria-hidden="true"`

3. **Missing aria-labels on navigation**
   - Issue: Multiple `<nav>` elements without descriptive labels
   - Fix: Add unique `aria-label` to each nav

4. **Insufficient contrast for orange text**
   - Issue: Using base `--warm-orange` for normal text
   - Fix: Use `--orange-darkest` for normal text, `--orange-darker` for large bold

5. **Images without width/height**
   - Issue: Images cause layout shift (CLS)
   - Fix: Add `width` and `height` attributes to ALL images

6. **Missing skip link**
   - Issue: Keyboard users must tab through entire nav
   - Fix: Add skip link as first element in body

7. **Color-only status indicators**
   - Issue: Success/error shown only with color
   - Fix: Add icons (✅/❌) and text labels

8. **Links without descriptive text**
   - Issue: "Click here" or "Read more" links
   - Fix: Use descriptive link text: "Read HAP's guide to color systems"

## Testing procedures

### Quick accessibility test (2 minutes)

Run before every commit:

1. **Visual scan**:
   - [ ] All text readable (good contrast)
   - [ ] Focus indicators visible when tabbing
   - [ ] Images loaded with correct sizing

2. **Keyboard test**:
   - [ ] Press Tab → Skip link appears
   - [ ] Press Enter → Jumps to main content
   - [ ] Tab through all interactive elements

3. **DevTools check**:
   - [ ] Elements → Accessibility pane shows no contrast issues
   - [ ] Console has no accessibility warnings

### Full accessibility audit (5-10 minutes)

Run before marking station complete:

1. **Lighthouse audit**: Accessibility category = 100/100
2. **Manual WCAG checklist**: All items in this Skill checked
3. **Screen reader test** (optional but recommended):
   - Enable VoiceOver (Mac) or NVDA (Windows)
   - Navigate page with keyboard only
   - Verify all content accessible

## Validation example

**Scenario**: Adding a new HAP note callout

**Before committing, check**:

1. **Semantic HTML**:
   ```html
   <div class="hap-note-callout">
       <img src="[url]" alt="HAP at his laptop" width="100" height="100">
       <div class="hap-note-content">
           <h3>HAP's Discovery</h3>
           <p>When Prof. Teeters showed me...</p>
       </div>
   </div>
   ```
   - ✅ Image has alt text
   - ✅ Image has width/height
   - ✅ Heading has text content
   - ✅ Using semantic heading (`<h3>`)

2. **Color contrast**:
   - Content uses `--dark-brown` text on gradient background
   - Border uses `--warm-orange` (decorative only, not text)
   - ✅ Contrast validated

3. **Keyboard navigation**:
   - Callout is not interactive
   - No keyboard navigation needed
   - ✅ N/A

4. **Lighthouse**:
   - Re-run after adding callout
   - ✅ Still 100/100

**Result**: Safe to commit ✅

## Notes

- Accessibility is NOT optional — 100/100 Lighthouse score is MANDATORY
- Colors project required 5 audit cycles due to skipping pre-commit checks
- Using this Skill prevents 90%+ of accessibility issues before Lighthouse
- Most common issue: insufficient text contrast (always use approved HAP color variables)
- Second most common: missing ARIA labels on navigation elements
- Skip link is often forgotten — it must be FIRST element in body

---

**Skill version**: 1.0
**Last updated**: October 2025
**Source**: HAP style guide + Colors project accessibility audit results
**WCAG Level**: AA (Level 2.2)
