# HAP image validation

## Description

Validate that HAP character images are emotionally appropriate for their content context and use correct Cloudinary URLs. This skill ensures consistent visual storytelling that reinforces HAP's apprentice learning journey across all educational content.

## When to use this Skill

**ALWAYS** use this Skill when:
- Creating new station HTML files
- Editing HAP note callouts or image placements
- Reviewing content before committing
- After changing content that might affect emotional context
- Before deployment to verify all image links work

## Progressive validation steps

### Step 1: Emotional context validation

For EACH HAP image in the file, verify the emotional context matches the appropriate image:

**Image inventory reference**: `hap-cloudinary-complete-inventory.md` (in this directory - DEFINITIVE source)

#### Emotional state mapping

**Neutral studying/learning**:
- ✅ Use: `hap-laptop_xiewar` (HAP studying on laptop)
- ✅ Use: `HAP-learner_dvehmt` (HAP with study book and tools)
- **Context**: Hero sections, general learning moments, steady practice

**Confusion/struggle/mistakes**:
- ✅ Use: `hap-confused-map_q8q0ej` (HAP looking confused)
- **Context**: HAP's mistakes, "what went wrong", confusion callouts, problem descriptions

**Breakthrough/aha moments**:
- ✅ Use: `hap-brain-explodes_wu0or8` (HAP mind blown)
- ✅ Use: `hap-celebrating_bljvgl` (HAP celebrating success)
- ✅ Use: `hap-thumbs-up_s4si0j` (HAP confident/got it)
- **Context**: Major realizations, paradigm shifts, victories
- ⚠️ **Reserve for genuine breakthroughs** (1 per station max for brain-explodes)

**Major celebrations/success**:
- ✅ Use: `hap-celebrating_bljvgl` (HAP celebrating coding success)
- **Context**: Challenge completion, major milestones, significant achievements

**Teaching/explaining**:
- ✅ Use: `hap-lectures_fjnxdj` (HAP teaching at blackboard)
- ✅ Use: `hap-scientist_safwtg` (HAP experimenting/testing)
- **Context**: When HAP transitions from learner to teacher, scientific approach

**Debugging/investigation**:
- ✅ Use: `hap-w-bug_fztbl6` (HAP debugging with magnifying glass)
- **Context**: Debugging sections, troubleshooting, problem investigation

**Welcoming/farewell**:
- ✅ Use: `hap-waving_dgzacg` (HAP waving)
- **Context**: Welcome messages, conclusion sections, "see you next time"

**Practice/reflection/encouragement**:
- ✅ Use: `HAP-learner_dvehmt` (most versatile)
- **Context**: Understanding checks, practice scenarios, encouragement, closing reflections

#### Common mismatches to fix

❌ **WRONG**: Using `hap-brain-explodes` for:
- Practice scenarios (use `HAP-learner` instead)
- Encouragement (use `hap-thumbs-up` instead)
- General reflections (use `HAP-learner` instead)

❌ **WRONG**: Using `hap-celebrating` for:
- Every positive moment (reserve for BIG victories only)
- Understanding checks (use `hap-thumbs-up` instead)

❌ **WRONG**: Using hallucinated images:
- Any filename not in the 24 real images list above
- IMMEDIATELY replace with real equivalent

✅ **CORRECT**: Reserve breakthrough images (`hap-brain-explodes`, `hap-celebrating`) for actual major moments only

### Step 2: URL validation

For EACH HAP image, verify the Cloudinary URL follows the correct pattern:

#### Standard URL patterns

**Most common pattern** (150px width for callouts):
```
https://res.cloudinary.com/cynthia-teeters/image/upload/f_auto,q_auto,w_150,c_limit/v[VERSION]/[FILENAME].jpg
```

**Hero image pattern** (200px width):
```
https://res.cloudinary.com/cynthia-teeters/image/upload/f_auto,q_auto,w_200,c_limit/v[VERSION]/[FILENAME].jpg
```

**Footer image pattern** (80px width):
```
https://res.cloudinary.com/cynthia-teeters/image/upload/f_auto,q_auto,w_80,c_limit/v[VERSION]/[FILENAME].jpg
```

**Horizontally flipped** (paintbrush image only):
```
https://res.cloudinary.com/cynthia-teeters/image/upload/f_auto,q_auto,w_150,c_limit,a_hflip/v[VERSION]/[FILENAME].jpg
```

#### Required URL components

✅ **MUST have**:
- `f_auto` - automatic format selection (WebP when supported)
- `q_auto` - automatic quality optimization
- `w_[SIZE]` - width constraint (80, 150, or 200)
- `c_limit` - limit scaling to prevent upscaling

#### Known REAL image filenames (verified from hap-poses/originals)

**CRITICAL**: Only these 24 images exist. Any other filename is HALLUCINATED.

**Most commonly used** (with known versions):
1. **hap-laptop_xiewar** - v1759495998
2. **hap-confused-map_q8q0ej** - v1759495999
3. **HAP-learner_dvehmt** - v1759497938
4. **hap-waving_dgzacg** - v1759495998
5. **hap-celebrating_bljvgl** - v1759495999
6. **hap-brain-explodes_wu0or8** - (version TBD)
7. **hap-thumbs-up_s4si0j** - (version TBD)
8. **hap-broke-things_qtbum4** - (version TBD)
9. **hap-sconcerned-laptop_frh5ua** - (version TBD)
10. **hap-lectures_fjnxdj** - (version TBD)
11. **hap-scientist_safwtg** - (version TBD)
12. **hap-w-bug_fztbl6** - (version TBD)
13. **hap-has-tools_kgoeys** - (version TBD)
14. **hap-juggles_v2zxeq** - (version TBD)
15. **hap-letters_ofhkso** - (version TBD)
16. **hap-tools-wave_d31zdx** - (version TBD)
17. **hap-recharges_pjgkdv** - (version TBD)
18. **hap-easter-egg_xw3o7x** - (version TBD)
19. **hap-dj.jpg** - (version TBD)
20. **hap-page-swirl_jad9ji** - (version TBD)
21. **HyBit_Handshake_reaching_out_to_shake_hands_symbolizing_teamwork_with_his_human_leader_viaz1v** - (version TBD)
22. **HyBit_wearing_a_rounded_space_helmet_ewi0xh** - (version TBD)
23. **HyBit_wearing_a_small_white_chef_hat_osbne9** - (version TBD)
24. **smaller_HyBit_Handshake_reaching_out_to_shake_hands_symbolizing_teamwork_with_his_human_leader_copy_cyppq3** - (version TBD)

**HALLUCINATED images to REJECT**:
- ❌ HyBit_frustrated_while_coding_and_looking_at_screen_wl4rzg
- ❌ hap-aha_ktnttc
- ❌ HyBit_excited_about_coding_bzrkl7
- ❌ HyBit_working_on_laptop_with_coffee_loxwue
- ❌ hap-reflecting_z6kbkg
- ❌ HyBit_holding_a_paintbrush_ycfapu
- ❌ HyBit_lecture (use hap-lectures_fjnxdj instead)
- ❌ hybit-w-bug_n1nxsj (use hap-w-bug_fztbl6 instead)

#### URL validation checklist

For each image URL:
- [ ] Starts with `https://res.cloudinary.com/cynthia-teeters/image/upload/`
- [ ] Contains `f_auto,q_auto`
- [ ] Has appropriate width: `w_80`, `w_150`, or `w_200`
- [ ] Contains `c_limit`
- [ ] Version number present (v17593... or v17594... or v17595...)
- [ ] **CRITICAL**: Filename matches one of the 24 REAL images listed above
- [ ] **CRITICAL**: Filename is NOT in the hallucinated list
- [ ] No `a_hflip` parameter (not used on any real HAP images)

### Step 3: Alt text validation

For EACH HAP image, verify alt text is descriptive and matches the image:

#### Correct alt text patterns

**From inventory** (use descriptive alt text for real images):

**Learning poses**:
1. `hap-laptop_xiewar`:
   - ✅ "HAP (HyBit A. ProtoBot) studying on his laptop"

2. `HAP-learner_dvehmt`:
   - ✅ "HAP with his study book and tools"

3. `hap-sconcerned-laptop_frh5ua`:
   - ✅ "HAP looking concerned while coding"

**Confusion/struggle poses**:
4. `hap-confused-map_q8q0ej`:
   - ✅ "HAP looking confused while studying a map"

5. `hap-broke-things_qtbum4`:
   - ✅ "HAP surrounded by tangled code with an 'oops' expression"

**Success/breakthrough poses**:
6. `hap-celebrating_bljvgl`:
   - ✅ "HAP celebrating a coding success"

7. `hap-brain-explodes_wu0or8`:
   - ✅ "HAP having a mind-blowing realization"

8. `hap-thumbs-up_s4si0j`:
   - ✅ "HAP giving a confident thumbs up"

**Teaching poses**:
9. `hap-lectures_fjnxdj`:
   - ✅ "HAP teaching at a blackboard with HTML code"

10. `hap-scientist_safwtg`:
   - ✅ "HAP in scientist mode with lab equipment"

**Friendly poses**:
11. `hap-waving_dgzacg`:
   - ✅ "HAP waving"

12. `hap-tools-wave_d31zdx`:
   - ✅ "HAP waving with his toolbox"

**Tool/activity poses**:
13. `hap-has-tools_kgoeys`:
   - ✅ "HAP holding his toolbox full of development tools"

14. `hap-w-bug_fztbl6`:
   - ✅ "HAP debugging code with magnifying glass"

15. `hap-juggles_v2zxeq`:
   - ✅ "HAP juggling web technologies"

16. `hap-letters_ofhkso`:
   - ✅ "HAP celebrating typography"

17. `hap-recharges_pjgkdv`:
   - ✅ "HAP recharging and taking a rest"

#### Alt text requirements

✅ **MUST be**:
- Descriptive (not "image of HAP")
- Action-oriented when appropriate
- Consistent with inventory descriptions

❌ **NEVER**:
- Generic ("HAP image", "image of HAP")
- Just emotional state without context ("HAP excited")
- Empty alt text (images are meaningful, not decorative)

### Step 4: HTML attribute validation

For EACH HAP image, verify required HTML attributes:

#### Required attributes checklist

```html
<img src="[CLOUDINARY_URL]"
    alt="[DESCRIPTIVE_TEXT]"
    width="[SIZE]"
    height="[SIZE]"
    class="hap-note-image" OR class="footer-hybit"
    decoding="async"
    loading="lazy" OR fetchpriority="high"
>
```

**Must have**:
- [ ] `src` - Valid Cloudinary URL
- [ ] `alt` - Descriptive text matching inventory
- [ ] `width` - Explicit dimension (80, 150, or 200)
- [ ] `height` - Explicit dimension (80, 150, or 200)
- [ ] `class` - Either `hap-note-image` or `footer-hybit`
- [ ] `decoding="async"` - For performance
- [ ] `loading` - Either `"lazy"` (below-fold) OR `fetchpriority="high"` (hero/LCP)

**Never**:
- ❌ Missing width/height (causes layout shift - CLS penalty)
- ❌ Using `loading="lazy"` on hero image (use `fetchpriority="high"`)
- ❌ Using `fetchpriority="high"` on below-fold images (use `loading="lazy"`)

### Step 5: Emotional journey analysis

Analyze the COMPLETE station for balanced emotional progression:

#### Recommended distribution per station

**Typical HAP Learning Lab station** should have:
- **1× Hero image** (`hap-laptop` or `HAP-learner`)
- **1-2× Confusion/struggle** (`hap-confused-map`)
- **1-2× Breakthrough** (`HyBit_holding_a_paintbrush`)
- **3-5× Practice/reflection** (`HAP-learner`)
- **1× Footer** (`HAP-learner`)

#### Warning signs

⚠️ **TOO MANY breakthroughs**:
- More than 2 uses of `HyBit_holding_a_paintbrush`
- Dilutes impact of genuine aha moments

⚠️ **TOO FEW struggles**:
- Zero uses of `hap-confused-map`
- Doesn't show HAP's authentic learning journey

⚠️ **UNBALANCED**:
- All positive images (no confusion/struggle shown)
- All struggle images (no breakthrough moments)

✅ **WELL-BALANCED**:
- Shows struggle → learning → breakthrough progression
- Uses `HAP-learner` for steady practice moments
- Reserves breakthrough image for 1-2 genuine aha moments

## Validation output format

Report findings in this structure:

```markdown
## HAP Image Validation Report - [Station Name]

### Summary
- Total HAP images: [N]
- Emotional context matches: [N/N]
- URL validation: [N/N]
- Alt text quality: [N/N]
- HTML attributes: [N/N]

### Image Distribution
- hap-laptop: [N] uses
- hap-confused-map: [N] uses
- HAP-learner: [N] uses
- HyBit_holding_a_paintbrush: [N] uses
- [other images if present]

### Issues Found

#### Emotional Context Mismatches
[List any images not matching content context]

#### URL Issues
[List any malformed or incorrect URLs]

#### Alt Text Issues
[List any missing or inadequate alt text]

#### HTML Attribute Issues
[List any missing required attributes]

### Recommendations
[Specific fixes needed]

### Overall Assessment
✅ PASS / ⚠️ NEEDS FIXES / ❌ FAIL
```

## Bash validation commands

Use these commands to quickly check images in a station file:

```bash
# Count total HAP images (exclude favicons)
grep -c 'cloudinary.*image/upload.*jpg' [station-file.html] | grep -v 'favicon'

# Find all HAP image src URLs
grep -o 'src="https://res.cloudinary.com[^"]*"' [station-file.html] | grep -v 'favicon'

# Check for required HTML attributes
grep -A3 'cloudinary.*image/upload' [station-file.html] | grep -E 'alt=|width=|height=|loading=|decoding='

# Count usage of each image type
grep -c 'hap-laptop_xiewar' [station-file.html]
grep -c 'hap-confused-map_q8q0ej' [station-file.html]
grep -c 'HAP-learner_dvehmt' [station-file.html]
grep -c 'HyBit_holding_a_paintbrush_ycfapu' [station-file.html]
```

## Common fixes

### Fix 1: Replace overused breakthrough image

**Before** (wrong context):
```html
<img src="https://res.cloudinary.com/cynthia-teeters/image/upload/f_auto,q_auto,w_150,c_limit,a_hflip/v1759331571/HyBit_holding_a_paintbrush_ycfapu.jpg"
    alt="HAP encouraging learners" ...>
<div class="hap-note-content">
    <h3>HAP's Encouragement:</h3>
```

**After** (correct):
```html
<img src="https://res.cloudinary.com/cynthia-teeters/image/upload/f_auto,q_auto,w_150,c_limit/v1759497938/HAP-learner_dvehmt.jpg"
    alt="HAP with his study book and tools" ...>
<div class="hap-note-content">
    <h3>HAP's Encouragement:</h3>
```

### Fix 2: Add missing attributes

**Before** (missing width/height):
```html
<img src="https://res.cloudinary.com/.../HAP-learner_dvehmt.jpg"
    alt="HAP with his study book and tools">
```

**After** (complete):
```html
<img src="https://res.cloudinary.com/.../HAP-learner_dvehmt.jpg"
    alt="HAP with his study book and tools"
    width="150"
    height="150"
    class="hap-note-image"
    decoding="async"
    loading="lazy">
```

### Fix 3: Improve alt text

**Before** (too generic):
```html
alt="HAP excited"
```

**After** (descriptive):
```html
alt="HAP excited after his breakthrough moment"
```

## References

- **Image inventory** (DEFINITIVE): `reports/hap-cloudinary-image-inventory-links.md`
- **Old inventory** (CONTAINS HALLUCINATED IMAGES): `reports/hap-cloudinary-image-inventory.md` - DO NOT USE
- **Accessibility standards**: `.claude/skills/accessibility-check/SKILL.md`
- **HAP voice guidelines**: `.claude/skills/hap-voice/SKILL.md`

## Success criteria

✅ **PASS** when:
- **CRITICAL**: All image filenames exist in the 24 real images list (no hallucinated images)
- All images match emotional context of their content
- All Cloudinary URLs are valid and optimized
- All alt text is descriptive and accurate
- All required HTML attributes present
- Emotional journey shows balanced progression (struggle → learning → breakthrough)
- No more than 1 `hap-brain-explodes` per station (reserve for biggest moment)
- No more than 1 `hap-celebrating` per station (reserve for major victory)
- At least 1 confusion/struggle image per station

❌ **FAIL** when:
- **CRITICAL**: Any hallucinated image filename detected
- Images don't exist in `/Users/cynthiateeters/Documents/Teaching/HAP/hap-poses/originals/`

This skill ensures visual storytelling uses ONLY real HAP images and reinforces authentic apprentice learning journey!
