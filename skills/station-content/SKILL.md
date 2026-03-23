# Station content structure

## Description

Complete station structure template for HAP Learning Labs using Astro. Validates that all required sections are present with correct HAP components, heading hierarchy, and accessibility features. Prevents structural inconsistencies across stations.

## When to use this Skill

**ALWAYS** use this Skill:

- When creating a new station page
- When editing existing station structure
- Before committing station content
- When reviewing station completeness

## Progressive validation steps

### Step 1: Pre-writing requirements

Before writing ANY station content:

- [ ] Complete station blueprint (`docs/reference-cards/station-blueprint-template.md`)
- [ ] Review HAP voice guidelines (`docs/reference-cards/hap-voice-card.md`)
- [ ] Select HAP poses from image inventory (`.claude/skills/hap-image-validation/`)

### Step 2: Station structure validation

#### Stations 1-5 (flexible structure)

Use `src/templates/station-template.astro`. Required sections:

1. **StationLayout wrapper** with all props
2. **"What You'll Learn" section** (EXACTLY 3 insight cards + HAP's Confession)
3. **Main content sections** (2-4 topic sections)
4. **Quick Reference section** (4-6 tip cards)

#### Station 6 (fixed structure)

Use `src/templates/station6-template.astro`. Required 12 sections:

1. What You'll Learn (3 insight cards + confession)
2. What AI Can and Can't Do
3. First Specific Topic Example with AI
4. Second Specific Topic Example with AI
5. AI for [Topic] Accessibility
6. Optimizing [Topic] Performance with AI
7. Try It Yourself: AI [Topic] Challenge
8. HAP's Rules for Working with AI (6 rules)
9. Advanced Prompt Strategies
10. When NOT to Use AI
11. Quick Reference: AI [Topic] Tasks
12. Learning Objectives Checklist

**Do not change the section order or remove sections for Station 6.**

### Step 3: Component usage validation

#### StationLayout props (required)

```astro
<StationLayout
    stationNumber={1}
    title="[Station Title]"
    subtitle="[Subtitle]"
    description="[Meta description 150-160 chars]"
    avatarImage="https://res.cloudinary.com/cynthia-teeters/image/upload/f_auto,q_auto,w_200,c_limit/v1759497938/[HAP_IMAGE].jpg"
    avatarAlt="[Describe HAP's pose and context]"
    introContent={introContent}
    ogImage="[OG image URL]"
    nextStationTitle="[Next station title]"
    footerReminder="[HAP's memorable takeaway]"
    labName="[Your Learning Lab Topic]"
>
```

**Validation checklist**:

- [ ] All required props provided
- [ ] `stationNumber` matches filename (station1.astro = 1)
- [ ] `description` is 150-160 characters
- [ ] `avatarImage` uses image from verified inventory
- [ ] `avatarAlt` is descriptive (not just "HAP")
- [ ] `introContent` uses HAP's first-person voice
- [ ] `introContent` ends with 🟠 emoji

#### Intro content pattern

```javascript
const introContent = `
    <p><strong>Welcome to Station [N]!</strong> [HAP's opening - personal story]</p>
    <p class="mt-1">[HAP's question or confusion]</p>
    <p class="mt-1">Prof. Teeters [explanation or guidance]</p>
    <p class="mt-1">[HAP's "aha" moment]</p>
    <p class="mt-1">Let me show you [transition]... 🟠</p>
`;
```

**Validation checklist**:

- [ ] Starts with "Welcome to Station [N]!"
- [ ] Uses HAP's first-person voice throughout
- [ ] References Prof. Teeters as mentor
- [ ] Ends with 🟠 emoji
- [ ] Uses `mt-1` class for paragraph spacing

#### "What You'll Learn" section

```html
<section class="content-section">
    <h2 class="section-heading-centered">What You'll Learn at This Station</h2>

    <div class="intro-box">
        <p><strong>HAP's Discovery:</strong> [What HAP learned and why it matters]</p>
    </div>

    <div class="overview-grid mt-2">
        <!-- EXACTLY 3 insight cards -->
        <div class="insight-card">
            <h3><span class="insight-icon">[EMOJI]</span> [Title]</h3>
            <p class="stat-large">[Key stat]</p>
            <p>[Description]</p>
        </div>
        <!-- Card 2 with stat-teal -->
        <!-- Card 3 with stat-brown -->
    </div>

    <!-- HAP's Confession -->
    <div class="hap-note-callout">
        <img src="[hap-broke-things image]" ... />
        <div class="hap-note-content">
            <h3>HAP's Confession:</h3>
            <ul>
                <li>[Mistake 1]</li>
                <li>[Mistake 2]</li>
                <li>[Mistake 3]</li>
            </ul>
        </div>
    </div>
</section>
```

**Validation checklist**:

- [ ] EXACTLY 3 insight cards (no more, no less)
- [ ] Stat variations: `stat-large`, `stat-teal`, `stat-brown`
- [ ] HAP's Confession callout with specific mistakes
- [ ] All content uses HAP's first-person voice

#### Code blocks with CodeBlock component

```astro
---
import CodeBlock from '../../components/CodeBlock.astro';
---

<div class="prompt-box">
    <div class="prompt-label">[Description]:</div>
    <CodeBlock code={`[your code here]`} lang="css" />
    <p class="code-comment mt-1">[HAP's explanation]</p>
</div>
```

**Supported languages**: html, css, javascript, json, markdown, bash, text, nunjucks

**Validation checklist**:

- [ ] Using CodeBlock component (not raw `<pre><code>`)
- [ ] Valid language specified
- [ ] Code wrapped in template literal (backticks)
- [ ] Explanation in HAP's voice

#### HAP note callout

```html
<div class="hap-note-callout">
    <img src="https://res.cloudinary.com/cynthia-teeters/image/upload/f_auto,q_auto,w_150,c_limit/v[VERSION]/[HAP_IMAGE].jpg"
        alt="[Descriptive alt text]"
        width="150" height="150"
        class="hap-note-image"
        decoding="async"
        loading="lazy">
    <div class="hap-note-content">
        <h3>[Title]:</h3>
        <p>[First-person narrative]</p>
    </div>
</div>
```

**Validation checklist**:

- [ ] Image from verified inventory
- [ ] `loading="lazy"` for below-fold images
- [ ] `width` and `height` attributes present
- [ ] Descriptive alt text
- [ ] Content in HAP's first-person voice

#### Quick Reference section

```html
<section class="content-section">
    <div class="tips-container">
        <h2 class="section-heading-centered">🎓 [Topic] Quick Reference</h2>

        <div class="tip-card">
            <div class="tip-number">1</div>
            <div>
                <h3>[Tip Title]</h3>
                <p>[Tip content]</p>
            </div>
        </div>
        <!-- 4-6 total tip cards -->
    </div>
</section>
```

**Validation checklist**:

- [ ] 4-6 tip cards (not more, not less)
- [ ] Numbered sequentially
- [ ] Always last content section

### Step 4: Heading hierarchy validation

**Required hierarchy**:

```
h1 (page title - in StationLayout) - ONE per page
└── h2 (main sections) - "What You'll Learn", topic headings, Quick Reference
    └── h3 (subsections) - Insight cards, HAP notes, tip cards
```

**Validation**:

- [ ] NO manual `<h1>` tags (handled by StationLayout)
- [ ] `<h2>` for all main sections
- [ ] `<h3>` for subsections and components
- [ ] NO skipped levels (no h2 → h4 without h3)
- [ ] NO empty headings

### Step 5: Image validation

**All HAP images must come from the verified inventory.**

**Header avatar (LCP image)**:

- [ ] Uses `fetchpriority="high"` (handled by MainLayout)
- [ ] Uses image from inventory with correct version number

**Content images (below fold)**:

- [ ] Use `loading="lazy"`
- [ ] Use `decoding="async"`
- [ ] Have `width` and `height` attributes
- [ ] Have descriptive `alt` text
- [ ] Use images from verified inventory

**Never**:

- ❌ Guess image filenames
- ❌ Make up version numbers
- ❌ Use images not in inventory

### Step 6: Content length guidelines

**Per station**:

- Main content sections: 2-4 sections
- Code examples: 3-5 per station
- HAP note callouts: 2-4 per station
- Quick reference tips: 4-6 tips

**Too short**:

- May not cover topic adequately
- Check for missing sections

**Too long**:

- May be overwhelming for students
- Consider splitting into multiple stations

### Step 7: Pre-commit checklist

**Structure**:

- [ ] Correct template used (station-template vs station6-template)
- [ ] All required sections present
- [ ] StationLayout props complete

**Content**:

- [ ] HAP's voice in all narrative sections (use `hap-voice` Skill)
- [ ] Code examples use CodeBlock component
- [ ] 2-4 main content sections
- [ ] Quick Reference section present

**Images**:

- [ ] All images from verified inventory
- [ ] Below-fold images have `loading="lazy"`
- [ ] All images have `width` and `height`
- [ ] All images have descriptive `alt` text

**Accessibility**:

- [ ] Heading hierarchy correct
- [ ] No empty headings
- [ ] HAP images have meaningful alt text

## Common mistakes

1. **Wrong number of insight cards**
   - Issue: 2 cards or 4 cards instead of exactly 3
   - Fix: Always use exactly 3 insight cards in "What You'll Learn"

2. **Using raw `<pre><code>` instead of CodeBlock**
   - Issue: Code blocks don't have HAP theme styling
   - Fix: Use `<CodeBlock code={...} lang="..." />`

3. **Missing HAP's Confession**
   - Issue: "What You'll Learn" section without mistakes shared
   - Fix: Add hap-note-callout with specific mistakes HAP made

4. **Inconsistent HAP voice**
   - Issue: Switching from first-person to instructional mid-station
   - Fix: Use `hap-voice` Skill to validate all content

5. **Hallucinated HAP images**
   - Issue: Using image filenames that don't exist
   - Fix: Always check `.claude/skills/hap-image-validation/hap-cloudinary-complete-inventory.md`

6. **Missing labName prop**
   - Issue: Page title shows generic "Your Learning Lab Topic"
   - Fix: Add `labName="[Your Topic]"` to StationLayout

7. **Station 6 structure modified**
   - Issue: Changing section order or removing sections
   - Fix: Station 6 has fixed 12-section structure - customize content only

8. **Empty headings**
   - Issue: `<h3></h3>` tags with no content
   - Fix: Remove empty headings or add content

## HAP component library reference

| Component | Class | Use case |
|-----------|-------|----------|
| Insight cards | `.insight-card` | "What You'll Learn" section (3 cards) |
| HAP note callout | `.hap-note-callout` | HAP's personal insights/tips/mistakes |
| Warning box | `.warning-box` | Wrong vs. Right comparisons |
| Prompt box | `.prompt-box` | Code examples with explanation |
| Tip cards | `.tip-card` | Quick reference tips (numbered) |
| Analysis grid | `.analysis-grid` | Comparing/contrasting concepts |
| Overview grid | `.overview-grid` | 3-column grid for cards |
| Intro box | `.intro-box` | Introduction text |

## Notes

- Station structure validation ensures consistency across all HAP Learning Labs
- EXACTLY 3 insight cards is an established pattern - don't deviate
- HAP's Confession humanizes the learning experience - always include mistakes
- Code examples should be copy-paste ready (tested and working)
- Quick reference section helps students remember key points
- Station 6 has a fixed structure - don't modify section order

---

**Skill version**: 2.0
**Last updated**: January 2026
**Source**: HAP Learning Lab Astro template structure
