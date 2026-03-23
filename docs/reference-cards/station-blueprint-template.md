# Station blueprint template

**Purpose:** Complete this blueprint BEFORE writing any station content. This is the "thinking before rendering" phase.

---

## 1. Station identity

```
Station ID: station-[N]-[topic-slug]
Title (student-facing): [Short, friendly, concept-forward]
Lab context: [How this fits in the larger 6-station lab]
Prerequisites: [What students must already understand]
```

---

## 2. Learning intent

```
Primary concept: [ONE idea - the single thing students must walk away with]

Supporting concepts:
- [Idea that reinforces but doesn't compete]
- [Another supporting idea]

Explicit non-goals (what this station does NOT teach):
- [Topic to avoid]
- [Complexity to defer]
```

**Rule:** If you can't state the primary concept in one sentence, the station is unfocused.

---

## 3. Narrative design

### Characters present

```
- [x] HAP (always - narrator)
- [ ] Prof. Teeters (for guidance moments)
- [ ] Grace Hopper (for precision moments)
- [ ] Other entity: [buggy program, stubborn config, etc.]
```

### HAP's arc

```
Starting state: [What HAP is confused about]
Key question: [What HAP is trying to understand]
Ending state: [What HAP now confidently knows]
```

**Note:** Confidence may mean "knowing the next question" - partial resolution is valid.

---

## 4. Prof. Teeters moments

**Frequency:** Maximum once per station. If more, review for over-guidance.

```
- [ ] Opening perspective shift
- [ ] Mid-station guidance
- [ ] Validation of learning

Her key line: "[What Prof. Teeters says that shifts HAP's understanding]"
```

---

## 5. Grace Hopper moments (if applicable)

**Frequency:** Only when imprecision would cause misunderstanding later.

```
- [ ] Terminology correction
- [ ] Technical precision
- [ ] Reframing question

Her key line: "[What Grace clarifies, in her no-contractions voice]"
```

---

## 6. HAP's confessions

List 2-4 specific mistakes HAP made learning this topic:

```
1. [Specific mistake with consequence]
2. [Another mistake - possibly Grace-corrected] 😳
3. [Third mistake with lesson learned]
```

**Rule:** These must be real, specific errors - not vague "I was confused."

---

## 7. Code example contract

```
Primary role: [ ] Illustrative  [ ] Diagnostic  [ ] Comparative  [ ] Reinforcement

Constraints:
- [What code must include]
- [What code must NOT include]

Student interaction:
- What they should notice: [specific observation]
- What they should NOT change: [protected element]
```

**Rule:** Only one code role per station.

---

## 8. HAP pose selection

| Location | Pose intent | Cognitive state | Image filename |
|----------|-------------|-----------------|----------------|
| Intro | [intent] | [state] | [from inventory] |
| Confession | showing mistakes | embarrassed but learning | hap-broke-things_qtbum4 |
| Breakthrough | [intent] | [state] | [from inventory] |

**Rule:** Every image must have a stated reason. Consult hap-cloudinary-complete-inventory.md.

---

## 9. Station flow skeleton

Outline the sections before writing:

```
1. [Section name] - [purpose in narrative]
2. [Section name] - [purpose in narrative]
3. [Section name] - [purpose in narrative]
4. [Section name] - [purpose in narrative]
5. Quick Reference - [summary of key points]
```

---

## 10. Scene framing

```
Previous station ended with: [what was learned/unresolved]
This station opens with: [HAP's state, question, or discovery]
Connection point: [how they link narratively]
```

---

## Pre-writing checklist

Before starting prose:

- [ ] Primary concept is ONE sentence
- [ ] Non-goals are explicit
- [ ] HAP's arc has clear start/end states
- [ ] Prof. Teeters appears ≤1 time
- [ ] Grace appears only if precision required
- [ ] At least 2 specific confessions listed
- [ ] Code role is declared (one only)
- [ ] All images have stated reasons
- [ ] Flow skeleton complete

---

*Full documentation: docs/designing-labs/hap-narrative-and-scene-design.md*
