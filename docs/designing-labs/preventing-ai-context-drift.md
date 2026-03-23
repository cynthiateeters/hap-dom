# Preventing AI context drift

**Purpose:** Strategies for maintaining alignment with HAP's design philosophy when using AI agents to build Learning Lab content across multiple sessions.

---

## The context drift problem

When building a 6-station Learning Lab with AI assistance, context drift occurs when:

- The AI "forgets" HAP's voice partway through a station
- Station 5 uses different patterns than Station 1
- Code examples drift from established conventions
- Character interactions become inconsistent
- The narrative arc loses coherence

**Root cause:** AI context windows are finite. As conversations grow, early instructions get summarized or dropped. Without explicit reminders, the AI reverts to generic patterns.

---

## Prevention strategies

### Strategy 1: Blueprint-first workflow

**Never write content without a completed blueprint.**

Before asking the AI to generate ANY station content:

1. Complete `docs/reference-cards/station-blueprint-template.md`
2. Include the blueprint in your prompt
3. Reference specific sections as the AI works

**Why this works:** The blueprint acts as a "contract" that keeps both you and the AI aligned on learning intent, narrative role, and structure.

**Example prompt:**
```
Here is the blueprint for Station 3:
[paste completed blueprint]

Generate the "What You'll Learn" section following this blueprint.
Use HAP's first-person voice as defined in docs/reference-cards/hap-voice-card.md.
```

---

### Strategy 2: Reference cards as context anchors

Keep these files in your AI's context:

| File | When to include |
|------|-----------------|
| `hap-voice-card.md` | Every content generation request |
| `character-quick-ref.md` | When Prof. Teeters or Grace appears |
| `station-blueprint-template.md` | When planning new stations |

**How to use:**

```
Before generating content, read docs/reference-cards/hap-voice-card.md
and follow the voice rules exactly.
```

**Why this works:** These condensed reference cards (~100 lines each) fit in context windows and provide explicit guardrails.

---

### Strategy 3: One station per session

**Avoid generating multiple stations in a single conversation.**

Instead:

1. Complete Station 1 in one session
2. Start a fresh session for Station 2
3. Begin each session by loading reference cards

**Why this works:** Fresh sessions prevent accumulated drift. Each station starts with clean context and explicit guidelines.

**Session startup checklist:**

- [ ] Load `hap-voice-card.md` into context
- [ ] Load completed blueprint for this station
- [ ] Reference the previous station for continuity (if needed)
- [ ] Explicitly state: "Continue HAP's voice from Station [N-1]"

---

### Strategy 4: Validate before proceeding

After generating each section, validate before moving on:

1. **Voice check:** Does every paragraph use first-person?
2. **Character check:** Is Prof. Teeters credited for insights?
3. **Structure check:** Does it match the template structure?
4. **Code check:** Are CodeBlock components used correctly?

**Use Claude Skills for validation:**

```
Validate this content against .claude/skills/hap-voice/SKILL.md
```

**Why this works:** Catching drift early prevents compounding errors. A voice slip in Section 1 becomes normalized if not corrected.

---

### Strategy 5: Explicit course correction

When you notice drift, correct immediately with explicit instructions:

**Bad (vague):**
```
This doesn't sound like HAP. Fix it.
```

**Good (explicit):**
```
This section uses second-person ("you should").
Rewrite using HAP's first-person voice:
- Replace "you should" with "I learned"
- Add a Prof. Teeters reference
- Include a specific mistake HAP made
See docs/reference-cards/hap-voice-card.md for examples.
```

---

### Strategy 6: Continuity anchors

When starting a new session, provide continuity context:

```
We're continuing work on [Lab Name] Learning Lab.

Previously completed:
- Station 1: [title] - HAP learned about [concept]
- Station 2: [title] - HAP struggled with [challenge]

Current station: Station 3
Blueprint: [paste blueprint]

HAP's arc so far: Started confused about [topic], had breakthrough
in Station 2 when Prof. Teeters explained [insight].

Continue this narrative in Station 3.
```

**Why this works:** The AI can't remember previous sessions, but you can provide the narrative thread explicitly.

---

### Strategy 7: Pattern consistency checks

Before finalizing any station, check for pattern consistency:

**Structural patterns:**

- [ ] "What You'll Learn" has exactly 3 insight cards
- [ ] HAP's Confession appears in first section
- [ ] Quick Reference has 4-6 tip cards
- [ ] Code uses CodeBlock component

**Voice patterns:**

- [ ] Every introduction starts with "Welcome to Station [N]!"
- [ ] Every introduction ends with 🟠
- [ ] Prof. Teeters is referenced at least once
- [ ] At least one specific mistake is shared

**Cross-station consistency:**

- [ ] Same terminology used across stations
- [ ] Character voices match (Prof. Teeters sounds the same)
- [ ] Difficulty progression makes sense
- [ ] References to earlier stations are accurate

---

## Session templates

### Starting a new station

```
I'm building Station [N] of a HAP Learning Lab about [topic].

Context files to follow:
1. docs/reference-cards/hap-voice-card.md - HAP's voice rules
2. docs/reference-cards/character-quick-ref.md - Character interactions
3. .claude/skills/station-content/SKILL.md - Structure requirements

Blueprint for this station:
[paste completed blueprint]

Previous stations summary:
- Station 1: [brief summary]
- Station 2: [brief summary]
...

Generate the introContent following HAP's first-person voice.
```

### Continuing within a session

```
Continue with Section [N] of Station [X].

Remember:
- HAP's first-person voice throughout
- Reference Prof. Teeters for key insights
- Use CodeBlock component for code examples
- Follow the blueprint structure

Blueprint section for this part:
[paste relevant section]
```

### Recovering from drift

```
The previous section drifted from HAP's voice. Before continuing:

1. Review docs/reference-cards/hap-voice-card.md
2. Note these specific issues to avoid:
   - [specific issue 1]
   - [specific issue 2]

Now rewrite [section] following HAP's voice exactly.
```

---

## Common drift patterns to watch for

### Voice drift

| Symptom | Correct pattern |
|---------|-----------------|
| "You should..." | "I learned to..." |
| "This tutorial explains..." | "Prof. Teeters showed me..." |
| "Obviously..." | "I was confused until..." |
| "Simply do X" | "What helped me was..." |
| Generic explanations | Specific HAP experiences |

### Character drift

| Symptom | Correct pattern |
|---------|-----------------|
| Prof. Teeters lecturing | Prof. Teeters mentoring gently |
| Grace being harsh | Grace being precise but helpful |
| HAP being confident | HAP being humble and learning |
| Characters disappearing | Regular character interactions |

### Structure drift

| Symptom | Correct pattern |
|---------|-----------------|
| 2 or 4 insight cards | Exactly 3 insight cards |
| Missing HAP's Confession | Always include specific mistakes |
| Raw `<pre><code>` blocks | CodeBlock component |
| Generic tip cards | HAP-voiced quick reference |

---

## The 3-file rule

**When in doubt, include these three files in every content request:**

1. **`hap-voice-card.md`** - Keeps HAP's voice consistent
2. **Your station blueprint** - Keeps structure aligned
3. **`station-content/SKILL.md`** - Validates component usage

These three files total ~400 lines and fit comfortably in context windows while providing comprehensive guardrails.

---

## Recovery checklist

If you discover drift after content is written:

1. **Identify the drift point** - Where did it start going wrong?
2. **Load reference cards** - Refresh the AI's context
3. **Show specific examples** - "This line drifts: [example]"
4. **Request targeted fixes** - One section at a time
5. **Validate the fix** - Use Claude Skills before proceeding
6. **Document the pattern** - Note what caused drift for future sessions

---

## Summary

| Strategy | When to use |
|----------|-------------|
| Blueprint-first | Before ANY content generation |
| Reference cards | Every content request |
| One station per session | Always (prevents accumulated drift) |
| Validate before proceeding | After each section |
| Explicit course correction | When drift is detected |
| Continuity anchors | Starting new sessions |
| Pattern consistency checks | Before finalizing stations |

**The golden rule:** AI agents don't maintain state between sessions. YOU are the keeper of continuity. Use blueprints, reference cards, and explicit context to keep every session aligned with your design philosophy.

---

*This document is part of the HAP Learning Lab design system.*
