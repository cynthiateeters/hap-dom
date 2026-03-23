# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**HAP's Learning Lab** - An Astro-based static site template for creating 6-station educational experiences. HAP (HyBit A. ProtoBot) is Prof. Teeters' apprentice who guides students through hands-on learning with his friendly first-person narrative.

To create a new lab, fork this repository and customize.

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

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
