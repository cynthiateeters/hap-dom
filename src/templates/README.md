# HAP Learning Lab Astro templates

This directory contains template files for creating new HAP Learning Labs using Astro.

## Quick start

1. **Plan first** - Complete `docs/reference-cards/station-blueprint-template.md` for each station
2. Copy `hub-template.astro` to `src/pages/index.astro`
3. Copy `station-template.astro` to `src/pages/stations/station[1-5].astro`
4. Copy `station6-template.astro` to `src/pages/stations/station6.astro` (fixed AI assistance structure)
5. Replace all `[PLACEHOLDER_*]` markers with your content
6. Validate with Claude Skills before committing
7. Run `npm run build` to verify

## Template files

| Template | Purpose | Copy to |
|----------|---------|---------|
| `hub-template.astro` | Main landing page with station grid | `src/pages/index.astro` |
| `station-template.astro` | Stations 1-5 (flexible structure) | `src/pages/stations/station[1-5].astro` |
| `station6-template.astro` | Station 6 (fixed 12-section AI assistance) | `src/pages/stations/station6.astro` |

## Station 6 special structure

Station 6 **always** teaches responsible AI assistance for your topic. It follows a fixed 12-section structure:

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

**Do not change the section order or remove sections** - only customize the content.

## Component API reference

### StationLayout props

```typescript
interface Props {
  stationNumber: number;        // 1-6
  title: string;                // Station title (without "Station N:")
  subtitle: string;             // Subtitle shown below title
  description: string;          // Meta description for SEO (150-160 chars)
  avatarImage: string;          // Cloudinary URL for HAP image
  avatarAlt: string;            // Alt text describing HAP's pose
  introContent: string;         // HTML string for intro box
  ogImage?: string;             // Open Graph image URL
  nextStationTitle?: string;    // Title for "Next: Station N - [Title]"
  footerReminder?: string;      // HAP's memorable takeaway
  labName?: string;             // Your Learning Lab topic name
}
```

### MainLayout props (for hub page)

```typescript
interface Props {
  title: string;                // Full page title
  description: string;          // Meta description
  ogImage?: string;             // Open Graph image
  headerTitle: string;          // Main heading
  headerSubtitle: string;       // Subtitle
  avatarImage: string;          // HAP avatar URL
  avatarAlt: string;            // Avatar alt text
  introContent: string;         // HTML for intro box
  showIntroImage?: boolean;     // Show image in intro (hub only)
  introImage?: string;          // Intro image URL
  introImageAlt?: string;       // Intro image alt text
  showNavigation?: boolean;     // Show station navigation
  stationNumber?: number;       // Current station (if showing nav)
  footerReminder?: string;      // Footer message
}
```

## Placeholder reference

### Station template placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `[PLACEHOLDER_STATION_TITLE]` | Station title | "JAMstack & Static Site Generators" |
| `[PLACEHOLDER_SUBTITLE]` | Subtitle | "Build-Time vs Runtime: A Mind-Blowing Discovery" |
| `[PLACEHOLDER_META_DESCRIPTION]` | SEO description (150-160 chars) | "Learn how JAMstack architecture..." |
| `[PLACEHOLDER_HAP_IMAGE]` | HAP image filename | "HAP-learner_dvehmt" |
| `[PLACEHOLDER_FOOTER_REMINDER]` | Memorable takeaway | "Static doesn't mean boring - it means FAST!" |
| `[PLACEHOLDER_LAB_NAME]` | Your lab topic | "CSS Grid Mastery" |

### Content section types

**Insight cards** - Always 3 cards in "What You'll Learn" section:

- Use `stat-large` for the big stat
- Add `stat-teal` or `stat-brown` for color variants

**Analysis grid** - 2-6 cards for comparing/contrasting:

- Good for step-by-step flows
- Good for pros/cons comparisons

**HAP callouts** - Notes with optional HAP image:

- `hap-note-callout` for the container
- `hap-note-image` for the image
- `hap-note-content` for the text

**Tip cards** - Numbered reference items:

- Use `tip-number` for the circle
- Always in "Quick Reference" section

## HAP image inventory

Always use images from the verified inventory at:
`docs/reference-cards/hap-image-inventory.md`

Common images:

- `HAP-learner_dvehmt` - Default learner pose
- `hap-laptop_xiewar` - At computer
- `hap-waving_dgzacg` - Greeting
- `hap-broke-things_qtbum4` - Confession pose
- `hap-brain-explodes_wu0or8` - Mind blown
- `hap-celebrating_bljvgl` - Success

## CSS classes reference

### Layout classes

- `content-section` - Main section wrapper
- `topic-section` - Topic content wrapper
- `content-container` - Centered container

### Component classes

- `overview-grid` - 3-column grid for insight cards
- `analysis-grid` - 2-column grid for analysis points
- `insight-card` - Card with icon, stat, description
- `analysis-point` - Simple card with title/content
- `tip-card` - Numbered reference card
- `hap-note-callout` - HAP note with image
- `intro-box` - Introduction box
- `prompt-box` - Code example box
- `warning-box` - Warning/important note

### Typography classes

- `section-heading-centered` - Centered h2
- `stat-large` - Large stat number
- `stat-teal` / `stat-brown` - Stat color variants
- `mt-1` / `mt-2` / `mb-2` - Margin utilities

## Building and testing

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## File structure after setup

```
your-learning-lab/
├── src/
│   ├── components/
│   │   ├── CodeBlock.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Navigation.astro
│   ├── layouts/
│   │   ├── MainLayout.astro
│   │   └── StationLayout.astro
│   ├── pages/
│   │   ├── index.astro          ← From hub-template.astro
│   │   └── stations/
│   │       ├── station1.astro   ← From station-template.astro
│   │       ├── station2.astro
│   │       ├── station3.astro
│   │       ├── station4.astro
│   │       ├── station5.astro
│   │       └── station6.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── shiki-hap-theme.css
│   └── templates/               ← Template source files
│       ├── hub-template.astro
│       ├── station-template.astro
│       └── README.md
├── public/
│   ├── fonts/
│   └── js/
├── docs/                        ← Documentation
│   ├── designing-labs/
│   └── reference-cards/
└── .claude/
    └── skills/                  ← Claude Skills for validation
```
