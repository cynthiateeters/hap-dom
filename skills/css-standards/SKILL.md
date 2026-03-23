# CSS color standards

## Description

Enforces modern HSL color format and CSS custom properties for all HAP Learning Labs. Prevents hardcoded hex/rgb colors and ensures single source of truth. This Skill must be consulted BEFORE writing ANY CSS to maintain color system consistency.

## When to use this Skill

**ALWAYS** use this Skill:

- Before writing ANY new CSS
- Before editing existing CSS files
- When adding new colors to the design system
- Before creating templates or demos
- When reviewing code for commit
- When AI suggests using hex codes (reject and use hsl() instead)

**NEVER** hardcode colors in hex or rgb() format.

## Core color standards

### Rule 1: Use hsl() format exclusively

**✅ CORRECT - Modern HSL format**:

```css
:root {
  --warm-orange: hsl(32, 76%, 63%);
  --teal-accent: hsl(168, 28%, 54%);
  --shadow-sm: 0 4px 6px hsl(28, 45%, 16% / 0.06); /* With alpha */
}
```

**❌ WRONG - Hex or RGB format**:

```css
:root {
  --warm-orange: #E8A557; /* NEVER use hex */
  --teal-accent: rgb(91, 166, 156); /* NEVER use rgb() */
  --shadow-sm: 0 4px 6px rgba(61, 40, 23, 0.06); /* Use hsl() instead */
}
```

**Why hsl()**:

- Human-readable (hue, saturation, lightness)
- Easy to create color variations (adjust lightness/saturation)
- Modern alpha syntax: `hsl(32, 76%, 63% / 0.5)` (not rgba)
- Better for accessibility adjustments
- Industry standard for design systems

### Rule 2: Single source of truth

**All colors MUST be defined in ONE place**: `css/style.css` in the `:root` block (lines 40-100).

**✅ CORRECT - Reference custom properties**:

```css
.button {
  background: var(--warm-orange);
  color: var(--cream-white);
  border: 2px solid var(--teal-darker);
}
```

**❌ WRONG - Hardcoded colors**:

```css
.button {
  background: hsl(32, 76%, 63%); /* Define in :root first */
  color: #FFF8F0; /* Use var(--cream-white) */
  border: 2px solid #3A7A70; /* Use var(--teal-darker) */
}
```

**Exception**: Context-aware color overrides in specific components (e.g., `prism-hap-theme.css`) MAY use local custom properties, but still in `hsl()` format:

```css
.prompt-box {
  --code-comment: hsl(32, 35%, 88%); /* Local override for this context */
}
```

### Rule 3: Use alpha channel correctly

**✅ CORRECT - Modern HSL alpha syntax**:

```css
.overlay {
  background: hsl(28, 45%, 16% / 0.8); /* 80% opacity */
  box-shadow: 0 4px 12px hsl(0, 0%, 0% / 0.15); /* 15% opacity */
}
```

**❌ WRONG - Old rgba() syntax**:

```css
.overlay {
  background: rgba(61, 40, 23, 0.8); /* Use hsl() instead */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Use hsl() instead */
}
```

### Rule 4: Name colors semantically

**✅ CORRECT - Semantic naming**:

```css
:root {
  --warm-orange: hsl(32, 76%, 63%); /* Base color */
  --orange-darker: hsl(32, 61%, 47%); /* Variant for accessibility */
  --orange-darkest: hsl(32, 64%, 33%); /* Variant for higher contrast */

  --success-green: hsl(102, 41%, 56%); /* Purpose-based */
  --error-darker: hsl(0, 73%, 50%); /* Purpose + variant */
}
```

**❌ WRONG - Generic or hex-based naming**:

```css
:root {
  --color-1: hsl(32, 76%, 63%); /* Not descriptive */
  --e8a557: hsl(32, 76%, 63%); /* NEVER name after hex code */
  --orange-light: hsl(32, 76%, 63%); /* Vague - light relative to what? */
}
```

## Progressive validation steps

### Step 1: Detect hardcoded colors

Before committing CSS, search for hardcoded colors:

**Validation commands**:

```bash
# Check for hex colors
grep -r '#[0-9A-Fa-f]\{3,6\}' css/

# Check for rgb/rgba
grep -r 'rgba\?\(' css/

# Should return: No matches (or only in comments)
```

**What to check**:

- [ ] No hex codes in CSS files (`#FFF`, `#E8A557`, etc.)
- [ ] No `rgb()` or `rgba()` functions
- [ ] No named colors (such as: pink, red, brown, blueviolet, etc)
- [ ] All colors use `var(--custom-property)` or `hsl()`
- [ ] Comments may reference hex for documentation (allowed)

### Step 2: Verify custom properties

Check all color values use CSS custom properties from `:root`:

**Good pattern**:

```css
.card {
  background: var(--cream-white);
  color: var(--dark-brown);
  border: 1px solid var(--teal-accent);
}
```

**Validation checklist**:

- [ ] All components reference `var(--*)` for colors
- [ ] No repeated color values (define once in `:root`)
- [ ] Fallback values provided for safety: `var(--warm-orange, hsl(32, 76%, 63%))`

### Step 3: Color addition workflow

When adding a NEW color to the design system:

1. **Define in `:root` first** (css/style.css lines 40-100):

   ```css
   :root {
     --new-color: hsl(180, 45%, 55%);
   }
   ```

2. **Document contrast ratio** (if used for text):

   ```css
   --new-color: hsl(180, 45%, 55%); /* 4.5:1 on cream background */
   ```

3. **Validate accessibility** (if used for text):
   - Check contrast ratio with WebAIM Contrast Checker
   - Normal text: 4.5:1 minimum
   - Large text: 3:1 minimum

4. **Use in components**:

   ```css
   .my-component {
     color: var(--new-color);
   }
   ```

### Step 4: Converting hex to hsl

If you find hex codes that need conversion:

**Conversion tools**:

1. DevTools: Shift+click on color swatch to cycle formats
2. Manual calculation (H: 0-360°, S: 0-100%, L: 0-100%)

**Example conversion**:

- Hex: `#E8A557`
- RGB: `rgb(232, 165, 87)`
- **HSL**: `hsl(32, 76%, 63%)` ✅

**Replace in code**:

```css
/* Before */
background: #E8A557;

/* After */
background: var(--warm-orange); /* Defined in :root as hsl(32, 76%, 63%) */
```

### Step 5: Pre-commit color checklist

Before committing ANY CSS file:

**Color format validation**:

- [ ] All colors in `hsl()` format (NOT hex or rgb)
- [ ] All component colors use `var(--custom-property)`
- [ ] New colors defined in `:root` first
- [ ] Alpha channels use modern syntax: `hsl(32, 76%, 63% / 0.5)`

**Single source of truth**:

- [ ] All color definitions in `css/style.css` `:root` block
- [ ] No duplicate color values (same color defined twice)
- [ ] Context-aware overrides documented (if any)

**Accessibility validation**:

- [ ] Text colors have documented contrast ratios
- [ ] WCAG AA compliance verified (4.5:1 or 3:1 for large text)
- [ ] Color never used as sole indicator (paired with icons/text)

**Documentation**:

- [ ] Complex colors have inline comments
- [ ] Variants named semantically (`-darker`, `-darkest`, `-accessible`)
- [ ] Purpose documented for non-obvious colors

## Common mistakes

From Colors project and general CSS analysis:

1. **AI defaults to hex codes**
   - Issue: Claude Code (and other AI) often suggests `#E8A557` format
   - Fix: Reject suggestion, use `var(--warm-orange)` or convert to `hsl()`

2. **Hardcoding colors for "quick fixes"**
   - Issue: Adding `color: #3A7A70` directly in component CSS
   - Fix: Define in `:root` as custom property first, then reference

3. **Using old rgba() syntax**
   - Issue: `rgba(61, 40, 23, 0.06)` for shadows/overlays
   - Fix: Use `hsl(28, 45%, 16% / 0.06)` instead

4. **Inconsistent color values**
   - Issue: Same orange defined as `#E8A557`, `hsl(32, 76%, 63%)`, `rgb(232, 165, 87)`
   - Fix: ONE definition in `:root`, referenced everywhere

5. **Missing contrast documentation**
   - Issue: Text color defined without contrast ratio comment
   - Fix: Add comment: `/* 4.5:1 on cream background */`

6. **Non-semantic naming**
   - Issue: `--color-1`, `--light-blue`, `--hex-e8a557`
   - Fix: Use `--warm-orange`, `--teal-darker`, `--success-green`

7. **Inline styles with hardcoded colors**
   - Issue: `<div style="background: #F4E8D8">`
   - Fix: Remove inline styles, use CSS classes with custom properties

## Enforcement patterns

### Pattern 1: Pre-commit hook (manual check)

Before every commit, run:

```bash
# Search for hex codes (should return empty)
grep -rn '#[0-9A-Fa-f]\{3,6\}' css/ --exclude='*.md'

# Search for rgb/rgba (should return empty)
grep -rn 'rgba\?\(' css/ --exclude='*.md'
```

If results found: Convert to `hsl()` and `var(--custom-property)`.

### Pattern 2: Code review checklist

When reviewing CSS changes:

- [ ] All colors in `hsl()` format
- [ ] No hardcoded color values
- [ ] New colors added to `:root` first
- [ ] Contrast ratios documented for text colors
- [ ] Semantic naming used

### Pattern 3: Template validation

When creating templates or demos:

- [ ] Templates use `var(--custom-property)` placeholders
- [ ] No example code with hardcoded hex
- [ ] Documentation shows correct `hsl()` format
- [ ] Comments reference CSS custom properties, not hex codes

## CSS custom properties reference

**Complete HAP color system** (see `css/style.css:40-100` for actual values):

**Base colors**:

- `--warm-orange` - HAP's primary brand color
- `--soft-orange` - Lighter orange variant
- `--peach-background` - Page background
- `--cream-white` - Content cards, code text
- `--dark-brown` - Primary text (9.5:1 contrast)
- `--medium-brown` - Secondary text (5.3:1 contrast)
- `--light-brown` - Tertiary text
- `--teal-accent` - Interactive elements, highlights
- `--success-green` - Success indicators
- `--warning-red` - Error indicators

**WCAG AA accessible variants**:

- `--teal-darker` - Links (4.5:1 contrast for normal text)
- `--orange-darker` - Large bold text (3.1:1 contrast)
- `--orange-darkest` - Normal text (4.5:1 contrast)
- `--success-darker` - Success text (4.5:1 contrast)
- `--error-darker` - Error text (4.5:1 contrast)

**Background variants**:

- `--success-bg-light` - Light green backgrounds
- `--error-bg-light` - Light red backgrounds
- `--teal-bg-light` - Light teal backgrounds
- `--warning-bg-light` - Light yellow backgrounds

**Code theme colors**:

- `--code-bg-dark` - Dark code block backgrounds
- `--code-text-light` - Light text on dark backgrounds

**UI neutrals**:

- `--ui-border-light` - Light borders, slider tracks
- `--text-muted` - Muted text (verify WCAG before using)
- `--teal-hover` - Hover states

**When to add new colors**:

- Accessibility requirements (need darker/lighter variant)
- New UI components (buttons, badges, alerts)
- New semantic meanings (info, warning, etc.)

**When NOT to add new colors**:

- One-off styling (use existing colors)
- Slight variations (adjust existing color instead)
- Decorative purposes (use existing palette)

## Notes

- **HSL is mandatory** - No exceptions for hex or rgb()
- **CSS custom properties are mandatory** - Define once, use everywhere
- **Single source of truth** - All colors in `css/style.css` `:root` block
- **AI will default to hex** - Always reject and convert to hsl()
- **Modern alpha syntax** - Use `hsl(32, 76%, 63% / 0.5)` not `rgba()`
- **Contrast ratios matter** - Document all text colors with ratios
- **Semantic naming** - Purpose-based names, not appearance-based

---

**Skill version**: 1.0
**Last updated**: October 2025
**Source**: HAP style guide + CSS best practices + WCAG 2.2 accessibility standards
**Standard**: Modern HSL format with CSS custom properties
