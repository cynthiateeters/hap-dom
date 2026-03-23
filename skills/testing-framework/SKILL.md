# Testing framework

## Description

Established testing approaches for HAP Learning Labs. Provides decision matrix for choosing testing tools and patterns to prevent the testing approach churn experienced in the Colors project (10+ testing plan files). Use this Skill BEFORE writing any test code.

## When to use this Skill

**ALWAYS** use this Skill:
- Before writing ANY test code
- When user requests testing or validation
- When choosing between testing tools (DevTools, Node.js, Lighthouse, Playwright)
- When creating test documentation
- When testing new features (demos, easter eggs, accessibility)

**NEVER** create test code without consulting this Skill's decision matrix.

## Progressive decision steps

### Step 1: Choose testing approach (decision matrix)

Based on what you're testing, choose the appropriate tool:

| What to test | Tool | Why | Time |
|--------------|------|-----|------|
| **Visual appearance** (full pages) | Chrome DevTools MCP (`take_screenshot`) | Full-page screenshots, native Chrome | 3-4 min |
| **Console errors** (JavaScript) | Chrome DevTools MCP (`list_console_messages`) | Automatic error detection | 2-3 min |
| **Network requests** (404s, assets) | Chrome DevTools MCP (`list_network_requests`) | See all HTTP requests | 2-3 min |
| **Performance** (Core Web Vitals) | DevTools MCP or Lighthouse CLI | DevTools MCP preferred, Lighthouse for batch testing | 3-10 min |
| **Accessibility** (WCAG AA) | DevTools MCP or Lighthouse CLI | DevTools MCP preferred, Lighthouse for batch testing | 2-5 min |
| **JSON structure** (data files) | Node.js script | Fast, no browser needed | 1 min |
| **DOM structure** (text-based) | Chrome DevTools MCP (`take_snapshot`) | Lighter than screenshots | 1-2 min |
| **Interactive elements** (clicks, forms) | Chrome DevTools MCP (`click`, `evaluate_script`) | Simulate user actions | 3-5 min |
| **Automated regression tests** | Playwright MCP | Full E2E test suites (if needed) | 10+ min setup |

**Decision flowchart**:

1. **Testing data/JSON structure?** → Use Node.js script
2. **Testing visual appearance?** → Use Chrome DevTools MCP screenshots
3. **Testing for errors?** → Use Chrome DevTools MCP console messages
4. **Testing accessibility?** → Use Lighthouse (accessibility category)
5. **Testing performance?** → Use Lighthouse (performance category)
6. **Testing interactive features?** → Use Chrome DevTools MCP or Playwright
7. **Need automated regression suite?** → Use Playwright MCP (setup overhead)

### Step 2: Testing patterns by tool

#### Pattern A: Chrome DevTools MCP testing

**When to use**:
- Visual verification (screenshots)
- Console error detection
- Network request analysis
- Interactive element testing
- Performance profiling

**Setup**: Zero setup (MCP server already configured)

**Common test scenarios**:

**Scenario 1: Visual smoke test (all pages)**
```
Use Chrome DevTools MCP to test all pages at localhost:5500.
Visit hub and all 6 stations, take full-page screenshots,
save to reports/screenshots/smoke-test/
```

**Claude will**:
1. Create new page with `new_page`
2. Navigate to each URL with `navigate_page`
3. Take screenshots with `take_screenshot`
4. Save to reports folder
5. Report any navigation failures

**Expected output**: 7 screenshots (hub + 6 stations)
**Expected time**: 3-4 minutes

**Scenario 2: Console error detection**
```
Use Chrome DevTools MCP to check for console errors.
Visit hub and all 6 stations, report any errors or warnings.
```

**Claude will**:
1. Navigate to each page
2. Call `list_console_messages` for each
3. Filter for errors and warnings
4. Report findings with ✅/⚠️/❌ indicators

**Expected output**: List of errors/warnings by page
**Expected time**: 2-3 minutes

**Scenario 3: Network request analysis**
```
Use Chrome DevTools MCP to check all assets load successfully.
Visit station3.html, list all network requests,
report any 404s or failed requests.
```

**Claude will**:
1. Navigate to page
2. Call `list_network_requests`
3. Filter for failed requests (status !== 200)
4. Report findings with URLs and status codes

**Expected output**: List of failed requests (if any)
**Expected time**: 1-2 minutes

#### Pattern B: Node.js testing (data structures)

**When to use**:
- Validating JSON structure
- Testing data integrity
- Fast validation without browser

**Setup**: None (Node.js available on system)

**Test pattern**:
```javascript
// Validate JSON structure
node -e "
  const fs = require('fs');
  const data = JSON.parse(fs.readFileSync('data/hybit-insights.json', 'utf8'));

  // Validation checks
  if (!data.allowedParams || !Array.isArray(data.allowedParams)) {
    console.error('❌ Missing or invalid allowedParams');
    process.exit(1);
  }

  if (!data.messages || typeof data.messages !== 'object') {
    console.error('❌ Missing or invalid messages object');
    process.exit(1);
  }

  // Check all params have messages
  data.allowedParams.forEach(param => {
    if (!data.messages[param]) {
      console.error(\`❌ Missing message for param: \${param}\`);
      process.exit(1);
    }
  });

  console.log('✅ JSON structure valid');
  console.log(\`✅ \${data.allowedParams.length} parameters defined\`);
  console.log(\`✅ \${Object.keys(data.messages).length} messages found\`);
"
```

**Expected output**: Validation results (✅/❌)
**Expected time**: < 1 minute

#### Pattern C: Lighthouse testing

**When to use**:
- Performance validation (target: 99-100/100)
- Accessibility validation (target: 100/100)
- Best practices validation (target: 100/100)
- SEO validation (target: 100/100)

**Setup**: Lighthouse installed via npm (`npm install` in project)

**Test pattern**:

**Single page audit**:
```bash
npx lighthouse http://127.0.0.1:5500/stations/station1.html \
  --only-categories=accessibility,performance,best-practices,seo \
  --output=json \
  --output-path=reports/station1-lighthouse.json \
  --quiet
```

**Batch audit** (all pages):
```bash
npm run lh:ci
```

**Validation criteria**:
- Performance: ≥99/100 (MANDATORY)
- Accessibility: 100/100 (MANDATORY)
- Best Practices: 100/100 (MANDATORY)
- SEO: 100/100 (MANDATORY)

**Expected time**: 5-10 minutes for all pages

#### Pattern D: Interactive element testing

**When to use**:
- Testing buttons, sliders, inputs
- Verifying generated code output
- Testing clipboard functionality

**Test pattern** (Chrome DevTools MCP):
```
Use Chrome DevTools MCP to test the dark-mode-demo.html:
1. Navigate to localhost:5500/demos/dark-mode-demo.html
2. Take screenshot of initial state
3. Click the light-dark toggle slider
4. Execute JavaScript to get the current generated CSS code
5. Verify code contains both @media queries
6. Take screenshot of final state
```

**Expected output**: Screenshots + code validation
**Expected time**: 3-5 minutes

### Step 3: Test documentation template

**ALWAYS** document tests using this structure:

```markdown
# [Feature] test checklist

**Test Date**: [Date]
**Testing**: [What feature/fix is being tested]
**Live Server**: [URL - typically http://localhost:5500]

## Pre-test setup

- [ ] Live-server is running
- [ ] Browser DevTools open (if manual testing)
- [ ] Console tab visible

## Test 1: [Test name]

**URL**: [Full URL with parameters if applicable]

**Expected behavior**:
- [ ] [Specific expectation 1]
- [ ] [Specific expectation 2]
- [ ] [Specific expectation 3]
- [ ] No errors in Console

**Result**: ☐ PASS / ☐ FAIL

**Notes** (if failed):
[Describe what went wrong]

---

## Test 2: [Test name]

[Repeat structure]

---

## Summary

**Total tests**: [N]
**Passed**: [N]
**Failed**: [N]

**Issues to fix**:
1. [Issue description with file location]
2. [Issue description with file location]

**Next steps**:
- [ ] Fix failing tests
- [ ] Re-run test suite
- [ ] Document fixes
```

### Step 4: Test coverage checklist

Before marking a feature complete, verify:

**Basic functionality**:
- [ ] Feature works on happy path
- [ ] Feature works with edge cases
- [ ] Feature handles errors gracefully

**Browser testing**:
- [ ] No console errors
- [ ] No network failures (404s)
- [ ] All assets load successfully

**Visual testing**:
- [ ] Mobile viewport (480px)
- [ ] Tablet viewport (768px)
- [ ] Desktop viewport (1024px+)

**Accessibility testing**:
- [ ] Lighthouse accessibility = 100/100
- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Color contrast meets WCAG AA

**Performance testing**:
- [ ] Lighthouse performance ≥99/100
- [ ] No layout shift (CLS)
- [ ] Images optimized (lazy loading)

**Documentation**:
- [ ] Test checklist created
- [ ] Test results documented
- [ ] Known issues noted

### Step 5: Anti-patterns (DO NOT)

**DO NOT**:
- ❌ Create multiple testing plans for the same feature (causes churn)
- ❌ Write Playwright test code without consulting decision matrix
- ❌ Skip documentation of test results
- ❌ Test without live-server running (causes CORS errors)
- ❌ Assume tests pass without verification
- ❌ Create tests that depend on external services
- ❌ Write brittle tests (tightly coupled to implementation)

**DO**:
- ✅ Choose simplest testing tool that works
- ✅ Document tests in checklist format
- ✅ Use Chrome DevTools MCP for most testing (zero setup)
- ✅ Use Lighthouse for performance/accessibility
- ✅ Use Node.js for data validation
- ✅ Save test results to reports/ folder

## Common testing scenarios

### Easter egg testing

**Tools**: Chrome DevTools MCP + Node.js

**Steps**:
1. **Validate JSON** (Node.js):
   - Check structure (allowedParams, messages, pageHelp, defaults)
   - Verify all params have messages
   - Validate message structure (title, content)

2. **Test functionality** (Chrome DevTools):
   - Empty parameter (`?hybit`) shows page help
   - Valid parameter shows specific message
   - Invalid parameter shows fallback
   - Close button works
   - No console errors

3. **Visual verification** (Chrome DevTools):
   - HAP avatar spins animation
   - Dialog appears after delay
   - Dialog styling correct

### Demo testing

**Tools**: Chrome DevTools MCP

**Steps**:
1. **Visual smoke test**: Screenshot of initial state
2. **Interactive test**: Click/drag controls, verify output updates
3. **Generated code test**: Extract code with JavaScript, verify correctness
4. **Copy button test**: Click copy, verify clipboard content
5. **Error handling**: Test edge cases (invalid inputs)
6. **Console check**: No errors during interaction

### Accessibility testing

**Tools**: Lighthouse + Manual keyboard testing

**Steps**:
1. **Lighthouse audit**: Run with `--only-categories=accessibility`
2. **Keyboard navigation**: Tab through all interactive elements
3. **Screen reader** (optional): Test with VoiceOver/NVDA
4. **Color contrast**: Verify with DevTools accessibility pane
5. **ARIA validation**: Check all landmarks have labels

### Performance testing

**Tools**: Lighthouse

**Steps**:
1. **Lighthouse audit**: Run with `--only-categories=performance`
2. **Core Web Vitals**:
   - LCP < 2.5s (Largest Contentful Paint)
   - FID < 100ms (First Input Delay)
   - CLS < 0.1 (Cumulative Layout Shift)
3. **Network analysis**: Check for oversized assets
4. **Image optimization**: Verify lazy loading, correct sizes

## Example test request

**Good request** (provides clear intent):
```
Test the easter egg system on station3.html:
1. Validate hybit-insights.json structure
2. Test empty parameter (?hybit)
3. Test valid parameter (?hybit=color-wheel)
4. Test invalid parameter (?hybit=testing123)
5. Check for console errors
6. Document results in reports/easter-egg-test-results.md
```

**Claude will**:
1. Use Node.js to validate JSON
2. Use Chrome DevTools MCP for browser testing
3. Create structured test checklist
4. Save results to reports folder
5. Provide pass/fail summary

**Bad request** (vague):
```
Test the easter egg
```
- Unclear what to test
- No tool specified
- No documentation requirements

## Notes

- Chrome DevTools MCP is preferred for most testing (zero setup overhead)
- Lighthouse is MANDATORY for accessibility and performance validation
- Node.js is fastest for data structure validation
- Always document tests in checklist format (reproducible)
- Colors project had 10+ testing plans due to approach churn — this Skill prevents that
- Choose simplest tool that validates the requirement

---

**Skill version**: 1.0
**Last updated**: October 2025
**Source**: HAP easter-egg testing checklist + Chrome DevTools MCP testing plan
**Tools**: Chrome DevTools MCP, Lighthouse, Node.js, Playwright (optional)
