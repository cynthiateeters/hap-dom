# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**HAP's Learning Lab: The DOM** — A 6-station Astro site where HAP guides beginner JavaScript students through DOM access and manipulation using a Robot ID Card as the running example.

- **Repo:** https://github.com/cynthiateeters/hap-dom
- **Live site:** https://hap-dom.netlify.app/
- **Local path:** /Users/cynthiateeters/Documents/Teaching/ai-augmented/HAP/hap-dom
- **MK channel:** hap-dom (all memory-keeper items use this channel)
- **Forked from:** https://github.com/cynthiateeters/hap-lab-astro-template

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm test           # Run Playwright review tests (needs preview server running)
npm run test:review # Run static checks + Playwright tests
```

## Automated review

The site has a two-layer automated review pipeline. See `reports/automated-review-workflow.md` for the full spec.

- **Layer 1 — Static analysis** (`tests/review/static-checks.sh`): voice compliance, copyright, CSS colors, image URLs, heading case, internal links, navigation contracts. No server needed.
- **Layer 2 — Playwright** (`tests/review/*.spec.ts`): smoke tests with screenshots at desktop + mobile, axe-core accessibility, navigation integrity, demo functionality. Requires `npm run preview` running on localhost:4321.
- Screenshots are written to `reports/screenshots/` as real `.png` files (uses `@playwright/test` npm package, not a Playwright MCP server).

### Navigation contracts

Stations, cheat sheets, and demos are linked by StationLayout props. When adding or modifying pages, keep these in sync:

- Stations 2, 3, 4 have `cheatSheetUrl`/`cheatSheetTitle` props
- Stations 3, 4, 5 have `demoUrl`/`demoLabel` props
- Station 1 has an embedded demo (no separate page)
- Hub page (`index.astro`) must link to all 6 stations, 3 demos, 3 cheat sheets

## Architecture

### Layout system

```text
src/layouts/
├── MainLayout.astro     # Base layout with header, footer, navigation
└── StationLayout.astro  # Wraps MainLayout with station-specific props
                         # Auto-calculates prev/next navigation from stationNumber
```

Station pages pass a `stationNumber` prop (1-6) to `StationLayout`, which handles navigation links automatically.

### Component hierarchy

```text
StationLayout (stationNumber, title, subtitle, introContent, ...)
    └── MainLayout (pageTitle, navigation, footer)
        ├── Header.astro (avatar, titles)
        ├── Navigation.astro (station dots, prev/next)
        ├── <slot /> (station content)
        └── Footer.astro (copyright, reminder)
```

### Syntax highlighting

Uses Astro's built-in Shiki with `css-variables` theme, customized in `src/styles/shiki-hap-theme.css`. The `CodeBlock.astro` component wraps Astro's `<Code>` component.

Supported languages: html, css, javascript, json, markdown, bash, text, nunjucks

## Content creation workflow

1. Complete `docs/reference-cards/station-blueprint-template.md` for each station
2. Copy template to `src/pages/stations/station[N].astro` or `src/pages/cheat-sheets/[topic].astro`
3. Replace all `[PLACEHOLDER_*]` markers with content
4. Use `station6-template.astro` for the final station (different structure)
5. Run `npm run build` to verify

### Template files

| Template                                   | Purpose                                |
| ------------------------------------------ | -------------------------------------- |
| `src/templates/hub-template.astro`         | Landing page → `src/pages/index.astro` |
| `src/templates/station-template.astro`     | Stations 1-5                           |
| `src/templates/station6-template.astro`    | Final station (different layout)       |
| `src/templates/cheat-sheet-template.astro` | Companion reference pages              |

## HAP's voice (critical)

HAP always speaks in **first-person apprentice voice**. This is non-negotiable.

- Required: "I learned from Prof. Teeters that...", "When I was practicing...", "This was tricky for me too..."
- Forbidden: "You should...", "Obviously...", "It's simple...", "Just", "simply"
- Share specific mistakes and what they taught

See `docs/reference-cards/hap-voice-card.md` for complete guidelines.

## Characters

| Character     | Role      | Voice                                                               |
| ------------- | --------- | ------------------------------------------------------------------- |
| HAP           | Narrator  | First-person, curious, humble, uses 🟠 emoji                        |
| Prof. Teeters | Mentor    | Calm, encouraging, uses analogies (sparingly, earn each appearance) |
| Grace Hopper  | Assistant | Precise, no contractions, no emojis (only when precision matters)   |

## CSS requirements

All colors must use **hsl() format** — never hex or rgb. Use "CSS custom property" terminology, never "CSS variable".

## HAP images

**Never guess image filenames.** Always verify against `skills/hap-image-validation/hap-cloudinary-complete-inventory.md`. Use `/hap-inventory` to check, `/hap-pose` or `/grace-pose` to generate new images.

## Heading case conventions

- **HTML files**: Title Case ("What You'll Learn")
- **Markdown files**: Sentence case ("What you'll learn")

## Copyright notice

All HTML files must include:

```html
<!--
HAP Educational Content © 2026 Cynthia Teeters. All rights reserved.
HyBit A. ProtoBot (HAP) character and the apprentice learning methodology are proprietary educational innovations.
-->
```

## StationLayout optional props

- **Demo banner:** Pass `demoUrl` and `demoLabel` for stations with interactive demos.
- **Cheat sheet banner:** Pass `cheatSheetUrl` and `cheatSheetTitle` for companion reference pages. Renders banners at top (eager) and bottom (lazy) of station.

Omit props for stations that don't need them.

## Key documentation

| Document                                                | Purpose                      |
| ------------------------------------------------------- | ---------------------------- |
| `docs/designing-labs/hap-narrative-and-scene-design.md` | Complete narrative framework |
| `docs/reference-cards/hap-voice-card.md`                | HAP voice quick reference    |
| `docs/reference-cards/station-blueprint-template.md`    | Pre-writing checklist        |
| `docs/reference-cards/character-quick-ref.md`           | All three characters         |
