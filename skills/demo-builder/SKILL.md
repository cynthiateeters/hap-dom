# Demo builder

## Description

Provides structure patterns, CSS classes, and JavaScript conventions for building interactive HAP Learning Lab demos. Ensures demos are accessible, performant, and follow HAP design system standards.

## When to use this Skill

Use this Skill when:

- Creating a new interactive demo for a learning station
- Adding interactive elements (sliders, color pickers, calculators)
- Building visualizations or comparison tools
- Adding copy-to-clipboard functionality
- Creating system preference detection (dark mode, reduced motion)
- Implementing real-time code generation demos
- Building side-by-side comparisons

## Demo HTML structure

### Required elements

**Standard demo page structure**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HAP's [Demo Name] - Station [N]</title>
    <meta name="description" content="[Educational description]">

    <!-- Favicons (required) -->
    <link rel="icon" type="image/png" sizes="16x16"
        href="https://res.cloudinary.com/cynthia-teeters/image/upload/f_png,q_auto,w_16,h_16/v1759596416/hap-favicon-h_gosgur.jpg">
    <link rel="icon" type="image/png" sizes="32x32"
        href="https://res.cloudinary.com/cynthia-teeters/image/upload/f_png,q_auto,w_32,h_32/v1759596416/hap-favicon-h_gosgur.jpg">
    <link rel="apple-touch-icon" sizes="180x180"
        href="https://res.cloudinary.com/cynthia-teeters/image/upload/f_png,q_auto,w_180,h_180/v1759596416/hap-favicon-h_gosgur.jpg">

    <!-- HAP Design System (required) -->
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <!-- Accessibility skip link (required) -->
    <a href="#main-content" class="sr-only">Skip to main content</a>

    <!-- Top navigation (required) -->
    <nav class="page-navigation" aria-label="Demo navigation">
        <a href="../stations/station[N].html">← Back to Station [N]</a>
        <span>Demo [N]: [Name]</span>
    </nav>

    <!-- Main content -->
    <main id="main-content">
        <div class="demo-container">
            <!-- Demo sections here -->
        </div>
    </main>

    <!-- Bottom navigation (required) -->
    <nav class="page-navigation" aria-label="Demo navigation">
        <a href="../stations/station[N].html">← Back to Station [N]</a>
        <a href="../index.html">Return to Hub →</a>
    </nav>

    <!-- Screen reader announcements (required if using JavaScript) -->
    <div id="announcement" class="sr-only" aria-live="polite" aria-atomic="true"></div>

    <!-- Copyright (required) -->
    <!--
    HAP™ Educational Content © 2025 Cynthia Teeters. All rights reserved.
    HyBit A. ProtoBot™ (HAP™) character and the apprentice learning methodology are proprietary educational innovations.
    Character concept, teaching methodology, and all written content created by Prof. Cynthia Teeters.
    Visual elements created with AI assistance.
    -->
</body>
</html>
```

### Demo container sections

**Standard section order**:

1. **Header** - Title and description
2. **Interactive controls** - Sliders, inputs, toggles
3. **Output/preview** - Visual results
4. **Code output** - Generated code (if applicable)
5. **Tips aside** - HAP's educational tips

**Example structure**:

```html
<div class="demo-container">
    <!-- 1. Header -->
    <header style="text-align: center; margin-bottom: 2rem;">
        <h1 style="color: hsl(32 62% 47%); margin-bottom: 0.5rem;">
            HAP's [Demo Name]
        </h1>
        <p style="font-size: 1.125rem; color: var(--dark-brown);">
            [Educational tagline]
        </p>
    </header>

    <!-- 2. Interactive section -->
    <section aria-label="[Section purpose]">
        <!-- Controls and inputs -->
    </section>

    <!-- 3. Output section -->
    <section class="output-section" aria-labelledby="output-heading">
        <h3 id="output-heading">Generated Output</h3>
        <pre><code id="output" class="language-css"></code></pre>
        <button id="copy-btn" class="demo-copy-btn"
                aria-label="Copy code to clipboard">Copy Code</button>
    </section>

    <!-- 4. HAP's tips -->
    <aside class="tips-box" aria-labelledby="tips-heading">
        <h3 id="tips-heading">🟠 HAP's [Topic] Tips</h3>
        <ul>
            <li><strong>Tip title:</strong> Explanation...</li>
        </ul>
    </aside>
</div>
```

## CSS class library

### Container classes

**`.demo-container`** - Main wrapper for all demo content

- Full-width responsive container
- Handles spacing and padding
- Already styled in HAP design system

**`.preview-grid`** - Side-by-side comparison layout

```html
<div class="preview-grid">
    <div class="preview-card">Left preview</div>
    <div class="preview-card">Right preview</div>
</div>
```

- Responsive 2-column grid (stacks on mobile)
- Equal-height columns
- Proper gap spacing

**`.preview-card`** - Individual preview container

- Bordered card with padding
- Background styling
- Consistent spacing

### Section classes

**`.system-status`** - System preference detection display

```html
<section class="system-status" aria-label="System status">
    <p>Your system is: <strong id="mode">VALUE</strong></p>
</section>
```

**`.comparison-section`** - Comparison tables or lists

```html
<section class="comparison-section" aria-labelledby="heading-id">
    <h3 id="heading-id">What Changed?</h3>
    <table class="comparison-table">...</table>
</section>
```

**`.output-section`** - Code output display

```html
<section class="output-section" aria-labelledby="code-heading">
    <h3 id="code-heading">Generated Code</h3>
    <pre><code id="output" class="language-css"></code></pre>
</section>
```

**`.tips-box`** - HAP's educational tips aside

```html
<aside class="tips-box" aria-labelledby="tips-heading">
    <h3 id="tips-heading">🟠 HAP's Tips</h3>
    <ul>
        <li><strong>Key point:</strong> Explanation</li>
    </ul>
</aside>
```

### Interactive element classes

**`.demo-copy-btn`** - Copy to clipboard button

```html
<button id="copy-btn" class="demo-copy-btn"
        aria-label="Copy code to clipboard">Copy Code</button>
```

**`.sample-button`** - Sample button for previews

**`.sample-link`** - Sample link for previews

**`.sample-content`** - Container for sample elements

**`.status-row`** - Row of status indicators

```html
<div class="status-row" role="list" aria-label="Status indicators">
    <span class="status success" role="listitem">✓ Success</span>
    <span class="status warning" role="listitem">⚠ Warning</span>
    <span class="status error" role="listitem">✕ Error</span>
</div>
```

### Comparison table classes

**`.comparison-table`** - Styled comparison table

```html
<table class="comparison-table">
    <thead>
        <tr>
            <th scope="col">Element</th>
            <th scope="col">Before</th>
            <th scope="col">After</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Background</strong></td>
            <td><code>old value</code></td>
            <td><code>new value</code></td>
        </tr>
    </tbody>
</table>
```

- Responsive table styling
- Alternating row colors
- Code formatting support

### Utility classes

**`.sr-only`** - Screen reader only content

```html
<h2 class="sr-only">Accessible heading for context</h2>
```

**`.hint`** - Instructional hints

```html
<p class="hint">Try this: Open DevTools and...</p>
```

## JavaScript patterns

### Initialization pattern

**Standard DOMContentLoaded structure**:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Initialize demo state
    updateDisplay();
    generateCode();

    // Set up event listeners
    setupEventListeners();
});
```

### Event listener pattern

**Separate setup function**:

```javascript
function setupEventListeners() {
    // Input listeners
    document.getElementById('hue-slider')
        .addEventListener('input', handleHueChange);

    // Button listeners
    document.getElementById('copy-btn')
        .addEventListener('click', handleCopy);

    // System preference listeners
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', handleThemeChange);
}
```

### Copy to clipboard pattern

**With fallback for older browsers**:

```javascript
async function handleCopy() {
    const code = document.getElementById('output').textContent;
    const btn = document.getElementById('copy-btn');

    try {
        // Modern clipboard API
        await navigator.clipboard.writeText(code);
        btn.classList.add('copied');
        btn.textContent = 'Copied ✅';
        btn.disabled = true;
        announce('Code copied to clipboard');

        setTimeout(() => {
            btn.classList.remove('copied');
            btn.textContent = 'Copy Code';
            btn.disabled = false;
        }, 3000);
    } catch (err) {
        console.error('Copy failed:', err);

        // Fallback: select the code for manual copy
        const range = document.createRange();
        range.selectNodeContents(document.getElementById('output'));
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        btn.textContent = 'Press Ctrl+C';
        announce('Copy failed. Code is selected - press Ctrl+C to copy manually.');

        setTimeout(() => {
            btn.textContent = 'Copy Code';
            selection.removeAllRanges();
        }, 4000);
    }
}
```

### Screen reader announcement pattern

**ARIA live region updates**:

```javascript
function announce(message) {
    const announcement = document.getElementById('announcement');
    if (announcement) {
        announcement.textContent = message;
    }
}

// Usage in event handlers:
slider.addEventListener('input', (e) => {
    updateDisplay(e.target.value);
    announce(`Hue changed to ${e.target.value} degrees`);
});
```

### System preference detection

**matchMedia API pattern**:

```javascript
function updateSystemStatus() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const modeText = isDark ? 'DARK MODE' : 'LIGHT MODE';
    const modeIcon = isDark ? '🌙' : '🌞';

    document.getElementById('system-mode').textContent = modeText;
    document.getElementById('mode-icon').textContent = modeIcon;
}

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
        updateSystemStatus();
        announce(e.matches ?
            'System switched to dark mode' :
            'System switched to light mode');
    });
```

### Code generation pattern

**Template literal for CSS/HTML output**:

```javascript
function generateCSSCode() {
    const hue = parseInt(document.getElementById('hue').value);
    const sat = parseInt(document.getElementById('sat').value);
    const light = parseInt(document.getElementById('light').value);

    const code = `/* Generated HSL color */
:root {
  --custom-color: hsl(${hue}, ${sat}%, ${light}%);
}

.example {
  background: var(--custom-color);
}`;

    document.getElementById('output').textContent = code;

    // Syntax highlighting if using Prism.js
    if (window.Prism) {
        Prism.highlightElement(document.getElementById('output'));
    }
}
```

### Input sanitization pattern

**Always validate and sanitize user input**:

```javascript
function handleHueChange(e) {
    // Sanitize: ensure value is within valid range
    let hue = parseInt(e.target.value);
    hue = Math.max(0, Math.min(360, hue));

    // Update display
    e.target.value = hue; // Correct input if out of range
    updateDisplay();
}
```

## Accessibility requirements

### Required ARIA attributes

**Navigation landmarks**:

```html
<nav class="page-navigation" aria-label="Demo navigation">
```

**Section labels**:

```html
<section aria-label="Interactive controls">
<section aria-labelledby="heading-id">
```

**Live regions for dynamic updates**:

```html
<div id="announcement" class="sr-only" aria-live="polite" aria-atomic="true"></div>
```

**Button labels**:

```html
<button aria-label="Copy code to clipboard">Copy</button>
```

**Input labels**:

```html
<label for="hue-slider">Hue (0-360)</label>
<input id="hue-slider" type="range" min="0" max="360"
       aria-valuemin="0" aria-valuemax="360" aria-valuenow="180">
```

### Keyboard navigation

**All interactive elements must be keyboard accessible**:

- Buttons: Use `<button>` (not `<div onclick>`)
- Links: Use `<a href>` with valid href
- Custom controls: Add `tabindex="0"` and keyboard event listeners

**Example keyboard support**:

```javascript
slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        slider.value = Math.max(0, parseInt(slider.value) - 1);
        updateDisplay();
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        slider.value = Math.min(360, parseInt(slider.value) + 1);
        updateDisplay();
    }
});
```

### Focus management

**Visible focus indicators** (already in HAP design system):

- All interactive elements have focus styles
- Never use `outline: none` without replacement
- Use `:focus-visible` for keyboard-only focus

**Skip link** (required):

```html
<a href="#main-content" class="sr-only">Skip to main content</a>
```

### Screen reader support

**Announce dynamic changes**:

```javascript
// After user interaction
announce('Color updated to hsl(180, 50%, 50%)');

// After system changes
announce('System switched to dark mode');

// After copy success
announce('Code copied to clipboard');
```

**Hidden decorative content**:

```html
<span aria-hidden="true">🎨</span>
```

## Anti-patterns to avoid

### 1. Inline styles everywhere

**❌ WRONG**:

```html
<div style="background: hsl(32, 76%, 63%); padding: 20px; margin: 10px;">
    Content
</div>
```

**✅ CORRECT**:

```html
<div class="preview-card">
    Content
</div>
```

Use CSS classes from HAP design system. Inline styles acceptable only for:

- Demo-specific dynamic values (updated by JavaScript)
- One-off header styling in demos (minimal use)

### 2. Hardcoded colors

**❌ WRONG**:

```javascript
element.style.background = '#E8A557';
element.style.color = 'rgb(61, 40, 23)';
```

**✅ CORRECT**:

```javascript
element.style.background = 'var(--warm-orange)';
element.style.color = 'var(--dark-brown)';
// OR dynamically generated:
element.style.background = `hsl(${hue}, ${sat}%, ${light}%)`;
```

### 3. Missing error handling

**❌ WRONG**:

```javascript
navigator.clipboard.writeText(code);
btn.textContent = 'Copied!';
```

**✅ CORRECT**:

```javascript
try {
    await navigator.clipboard.writeText(code);
    btn.textContent = 'Copied ✅';
} catch (err) {
    console.error('Copy failed:', err);
    // Provide fallback (text selection)
}
```

### 4. No accessibility announcements

**❌ WRONG**:

```javascript
slider.addEventListener('input', (e) => {
    updateDisplay(e.target.value);
    // Screen reader users don't know value changed
});
```

**✅ CORRECT**:

```javascript
slider.addEventListener('input', (e) => {
    updateDisplay(e.target.value);
    announce(`Hue changed to ${e.target.value} degrees`);
});
```

### 5. Non-semantic HTML

**❌ WRONG**:

```html
<div onclick="copyCode()">Copy</div>
<span class="link" onclick="navigate()">Click here</span>
```

**✅ CORRECT**:

```html
<button onclick="copyCode()">Copy</button>
<a href="#section">Navigate here</a>
```

### 6. Missing input validation

**❌ WRONG**:

```javascript
function updateHue(value) {
    hue = value; // Could be anything
    generateCode();
}
```

**✅ CORRECT**:

```javascript
function updateHue(value) {
    hue = Math.max(0, Math.min(360, parseInt(value) || 0));
    generateCode();
}
```

### 7. Global scope pollution

**❌ WRONG**:

```javascript
var hue = 180;
var saturation = 50;

function updateColor() {
    // Variables in global scope
}
```

**✅ CORRECT**:

```javascript
(function() {
    let hue = 180;
    let saturation = 50;

    function updateColor() {
        // Scoped to IIFE or module
    }

    // Only expose what's needed
    window.demoAPI = { updateColor };
})();
```

## Progressive validation steps

### Step 1: Structure validation

**HTML structure checklist**:

- [ ] `<!DOCTYPE html>` declaration
- [ ] Proper `<head>` with meta tags
- [ ] All required favicons (16x16, 32x32, 180x180)
- [ ] HAP design system CSS linked
- [ ] Skip link for accessibility
- [ ] Top navigation with back link
- [ ] `<main id="main-content">` wrapper
- [ ] `.demo-container` for demo content
- [ ] Bottom navigation (back + hub)
- [ ] Screen reader announcement div
- [ ] Copyright notice comment

### Step 2: Accessibility validation

**ARIA and semantic HTML**:

- [ ] All navigation has `aria-label`
- [ ] All sections have `aria-label` or `aria-labelledby`
- [ ] All headings have associated IDs for labelledby
- [ ] All buttons have descriptive `aria-label`
- [ ] All inputs have `<label>` elements
- [ ] Skip link points to `#main-content`
- [ ] Screen reader announcements on dynamic changes
- [ ] No `<div>` buttons (use actual `<button>`)
- [ ] Decorative elements have `aria-hidden="true"`

### Step 3: JavaScript pattern validation

**Code organization**:

- [ ] All code inside DOMContentLoaded listener
- [ ] Event listeners in separate setup function
- [ ] Input validation on all user inputs
- [ ] Error handling on async operations (clipboard, fetch)
- [ ] Screen reader announcements for all state changes
- [ ] No global scope pollution (use IIFE or modules)
- [ ] Copy button has fallback for older browsers

### Step 4: Styling validation

**CSS usage**:

- [ ] Using HAP design system classes (`.demo-container`, `.tips-box`, etc.)
- [ ] No hardcoded hex/rgb colors
- [ ] Using CSS custom properties: `var(--warm-orange)`
- [ ] Inline styles only for dynamic/demo-specific values
- [ ] All interactive elements have focus styles
- [ ] Responsive layout (mobile, tablet, desktop)

### Step 5: Performance validation

**Optimization checklist**:

- [ ] No unnecessary JavaScript libraries
- [ ] Syntax highlighting only if showing code
- [ ] Images use Cloudinary with `f_auto,q_auto`
- [ ] Below-fold images use `loading="lazy"`
- [ ] Scripts use `defer` attribute (if not inline)
- [ ] CSS loaded in `<head>`
- [ ] No layout shift (CLS = 0)

## Common demo types

### Type 1: Color calculator

**Features**:

- Sliders for H, S, L values
- Live preview of color
- Generated CSS code output
- Copy button

**Required elements**:

- Input controls with labels
- Range sliders with `aria-valuemin/max/now`
- Live preview box
- Code output with syntax highlighting
- Copy button with fallback

### Type 2: Side-by-side comparison

**Features**:

- Two preview panels (before/after, light/dark)
- Comparison table
- System preference detection (if applicable)

**Required elements**:

- `.preview-grid` with 2 `.preview-card`
- `.comparison-table` with proper headers
- System status detection (if using matchMedia)

### Type 3: Interactive form

**Features**:

- Multiple inputs (text, select, checkbox)
- Real-time validation
- Generated code based on selections

**Required elements**:

- All inputs have `<label>` elements
- Validation feedback (visual + announced)
- Error messages with ARIA
- Submit or generate button

### Type 4: Animation demo

**Features**:

- Play/pause controls
- Speed adjustment
- CSS animation code output

**Required elements**:

- Play/pause button with state
- Speed control with range slider
- Respect `prefers-reduced-motion`
- Code output showing keyframes

## Notes

- **Always use HAP design system classes** - Don't recreate styling
- **Accessibility is mandatory** - Not optional
- **Test with keyboard only** - Tab through entire demo
- **Test with screen reader** - VoiceOver (Mac) or NVDA (Windows)
- **Validate contrast ratios** - All text must meet WCAG AA
- **No external dependencies** - Unless absolutely necessary (Prism.js OK for syntax highlighting)
- **Mobile-first** - Test on mobile, tablet, desktop
- **Copy button pattern** - Always include fallback for older browsers
- **Announce everything** - Screen reader users need context on changes

---

**Skill version**: 1.0
**Last updated**: October 2025
**Source**: dark-mode-demo.html + HAP design system standards
**Related Skills**: accessibility-check, css-standards, hap-voice
