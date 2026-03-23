# HAP Learning Lab Starter Template

A ready-to-use Astro template for creating 6-station educational learning experiences with HAP (HyBit A. ProtoBot) as your guide.

## What is HAP's Learning Lab?

HAP's Learning Lab is an educational website format featuring:

- **6 learning stations** - Progressive lessons on any topic
- **HAP as narrator** - A friendly robot apprentice who shares his learning journey
- **Prof. Teeters as mentor** - HAP's teacher who provides guidance
- **Grace Hopper as assistant** - A precision-focused helper for technical details
- **Consistent design system** - HAP-themed CSS with accessibility in mind
- **Zero JavaScript runtime** - Static site with build-time syntax highlighting and JS for the `Copy Button for Code Blocks`

## Getting started

### Prerequisites

- Node.js 18+ installed
- A code editor (VS Code recommended)
- Basic familiarity with HTML and CSS

### Quick start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4321` to see the placeholder page.

### Creating your learning lab

1. **Read the documentation** - Start with `docs/designing-labs/hap-narrative-and-scene-design.md`

2. **Plan your stations** - Fill out the blueprint template for each station:
   - `docs/reference-cards/station-blueprint-template.md`

3. **Create hub page** - Copy and customize:
   - From: `src/templates/hub-template.astro`
   - To: `src/pages/index.astro`

4. **Create station pages** - Copy and customize (6 times):
   - From: `src/templates/station-template.astro`
   - To: `src/pages/stations/station[1-6].astro`

5. **Replace placeholders** - Search for `[PLACEHOLDER_*]` and replace with your content

6. **Validate content** - Use the Claude Skills in `.claude/skills/` for validation

## Project structure

```
starter-template/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── CodeBlock.astro  # Syntax-highlighted code blocks
│   │   ├── Header.astro     # Page header with HAP avatar
│   │   ├── Footer.astro     # Footer with copyright
│   │   └── Navigation.astro # Station navigation
│   ├── layouts/
│   │   ├── MainLayout.astro    # Base layout
│   │   └── StationLayout.astro # Station-specific layout
│   ├── pages/
│   │   ├── index.astro         # Hub page (replace with your content)
│   │   └── stations/           # Station pages go here
│   ├── styles/
│   │   ├── global.css          # HAP design system
│   │   └── shiki-hap-theme.css # Syntax highlighting theme
│   └── templates/              # Templates to copy from
│       ├── hub-template.astro
│       ├── station-template.astro
│       └── README.md
├── public/
│   ├── fonts/               # Nunito and Source Code Pro
│   └── js/
│       └── copy-button.js   # Code block copy functionality
├── docs/
│   ├── designing-labs/      # Narrative and voice guidelines
│   └── reference-cards/     # Quick reference for AI agents
├── .claude/
│   └── skills/              # Claude Skills for validation
├── astro.config.mjs
├── package.json
├── CLAUDE.md                # AI assistant instructions
└── README.md                # This file
```

## HAP's voice

HAP speaks in **first-person apprentice voice**:

- "I was confused when I first saw..."
- "Prof. Teeters explained that..."
- "This is what helped me understand..."

See `docs/reference-cards/hap-voice-card.md` for quick reference.

## Documentation

| Document | Purpose |
|----------|---------|
| `docs/designing-labs/hap-narrative-and-scene-design.md` | Complete narrative guide |
| `docs/reference-cards/hap-voice-card.md` | HAP voice quick reference |
| `docs/reference-cards/station-blueprint-template.md` | Pre-writing checklist |
| `docs/reference-cards/character-quick-ref.md` | All three characters |
| `src/templates/README.md` | Template usage guide |

## Claude Skills

The `.claude/skills/` directory contains validation skills:

- `hap-voice/` - Voice and personality enforcement
- `accessibility-check/` - WCAG 2.2 Level AA validation
- `css-standards/` - HSL color format enforcement
- `security-audit/` - Security pattern validation
- `station-content/` - Station structure patterns
- `demo-builder/` - Interactive demo patterns
- `testing-framework/` - Performance testing
- `hap-image-validation/` - HAP image inventory

## CSS standards

All colors must use HSL format:

```css
/* Correct */
color: hsl(32, 76%, 63%);

/* Wrong - never use */
color: #E8A557;
```

See `.claude/skills/css-standards/SKILL.md` for details.

## Licensing

- **Code**: MIT License
- **HAP Character**: Proprietary (Cynthia Teeters)
- **Educational Content**: Proprietary (academic use allowed)

## Credits

- **HAP Character & Methodology**: Prof. Cynthia Teeters
- **Visual Elements**: Created with AI assistance
- **Built with**: [Astro](https://astro.build)

---

HAP Educational Content © 2026 Cynthia Teeters. All rights reserved.
HyBit A. ProtoBot (HAP) character and the apprentice learning methodology are proprietary educational innovations.
