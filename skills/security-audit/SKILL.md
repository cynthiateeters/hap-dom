# JavaScript security audit

## Description

Systematic JavaScript security analysis for educational web projects. Validates code against OWASP Top 10 and identifies common vulnerabilities BEFORE writing any JavaScript. This Skill ensures HAP Learning Labs maintain strong security practices for client-side educational code.

## When to use this Skill

**ALWAYS** use this Skill:
- Before writing ANY new JavaScript
- After editing existing JavaScript
- When adding interactive features (demos, calculators, games)
- Before committing JavaScript files
- When loading external data (JSON, APIs)
- When using browser APIs (Clipboard, Storage, etc.)

**NEVER** write JavaScript without security validation.

## Progressive validation steps

### Step 1: Input validation check

Validate ALL user input and external data sources.

**User input sources to check**:
- [ ] URL parameters (query strings)
- [ ] Form inputs
- [ ] localStorage/sessionStorage
- [ ] Fetched JSON/data files
- [ ] User uploaded files

**Validation requirements**:
- [ ] **Whitelist validation** (NOT blacklist) — Only allow known-good inputs
- [ ] Type validation — Ensure data matches expected type
- [ ] Range validation — Check numeric values are within bounds
- [ ] Format validation — Verify strings match expected patterns

**Good pattern** (whitelist validation from easter-egg.js):
```javascript
// Only allow pre-defined parameters
if (data.allowedParams.includes(hybitParam)) {
    return getInsightMessage(data, hybitParam);
} else {
    // Unknown parameter - return safe default
    return getUnknownMessage(data);
}
```

**Bad patterns**:
- ❌ Using user input without validation
- ❌ Blacklist validation ("block these specific values")
- ❌ Assuming data from JSON is safe
- ❌ Direct use of URL parameters in DOM

### Step 2: XSS prevention check

Prevent Cross-Site Scripting by validating HTML insertion methods.

**Dangerous functions** (check for these):
- [ ] `innerHTML` — CAN be safe if content is sanitized
- [ ] `outerHTML` — CAN be safe if content is sanitized
- [ ] `document.write()` — ❌ NEVER use
- [ ] `eval()` — ❌ NEVER use
- [ ] `Function()` constructor — ❌ NEVER use
- [ ] `setTimeout(string, ...)` — ❌ Use function instead
- [ ] `setInterval(string, ...)` — ❌ Use function instead

**Safe alternatives**:
- ✅ `textContent` — For text-only content
- ✅ `createElement()` + `appendChild()` — For structured DOM
- ✅ Template literals with sanitized data
- ✅ `innerHTML` with whitelisted, pre-defined content only

**XSS-safe pattern** (from easter-egg.js):
```javascript
// Content comes from pre-defined JSON (whitelisted parameters)
// NOT from direct user input
const messageContent = getMessageContent(data, hybitParam);
dialog.innerHTML = `
    <div class="dialog-content">
        ${messageContent}
    </div>
`;
```

**XSS-vulnerable pattern** (❌ NEVER do this):
```javascript
// WRONG: Direct user input in innerHTML
const userInput = urlParams.get('message');
div.innerHTML = userInput; // ❌ XSS vulnerability!
```

**Defense in depth**:
- Only allow specific HTML tags (`<code>`, `<strong>`, `<em>`, `<p>`, `<ul>`, `<li>`)
- Document allowed tags in data structure
- Consider DOMPurify library for complex HTML

### Step 3: Dangerous functions check

Check for known dangerous JavaScript patterns.

**NEVER use**:
- [ ] `eval()` — Executes arbitrary code
- [ ] `Function()` constructor — Creates functions from strings
- [ ] `document.write()` — Deprecated, breaks page after load
- [ ] `innerHTML` with user input — XSS risk (only safe with sanitization)

**Check regex patterns** (ReDoS risk):
- [ ] Nested quantifiers: `(a+)+` or `(a*)*`
- [ ] Overlapping alternations: `(a|a)*`
- [ ] Complex backreferences

**Safe alternatives**:
- Instead of `eval()`: Use JSON.parse() for data, or refactor logic
- Instead of `Function()`: Define functions normally
- Instead of `document.write()`: Use DOM manipulation

**Example from easter-egg.js** (native JSON parsing):
```javascript
// SAFE: Native JSON parsing (no eval)
fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        initializeEasterEgg(data, hybitParam);
    });
```

### Step 4: Data source validation

Validate security of data sources and API calls.

**Check external data sources**:
- [ ] JSON files — Ensure files are under version control
- [ ] APIs — Validate response structure
- [ ] CDNs — Use Subresource Integrity (SRI) if possible
- [ ] User uploads — Never execute uploaded content

**Validation pattern**:
```javascript
// Check response is valid before parsing
fetch(jsonPath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load data');
        }
        return response.json();
    })
    .then(data => {
        // Validate data structure
        if (!data.allowedParams || !Array.isArray(data.allowedParams)) {
            throw new Error('Invalid data structure');
        }
        // Now safe to use data
    })
    .catch(error => {
        console.error('Data loading error:', error);
        showFallbackMessage(); // Safe fallback
    });
```

### Step 5: Browser API security check

Check secure usage of browser APIs.

**Clipboard API**:
- [ ] Always wrap in try/catch
- [ ] Handle permission denial gracefully
- [ ] Never assume success
- [ ] Provide user feedback

**Good pattern**:
```javascript
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(codeDisplay.textContent);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Code';
        }, 2000);
    } catch (err) {
        console.error('Copy failed:', err);
        copyBtn.textContent = 'Copy failed';
        // Provide alternative (manual copy)
    }
});
```

**localStorage/sessionStorage**:
- [ ] Always wrap in try/catch (can be disabled)
- [ ] Never store sensitive data
- [ ] Validate data when reading
- [ ] Handle quota exceeded errors

**Fetch API**:
- [ ] Always handle network errors
- [ ] Validate response status
- [ ] Set reasonable timeouts
- [ ] Sanitize response data

### Step 6: Security best practices

Check code follows security best practices.

**Content Security Policy (CSP) compatibility**:
- [ ] No inline event handlers (`onclick="..."`)
- [ ] Use addEventListener() instead
- [ ] No inline scripts (move to external .js files)
- [ ] No `javascript:` URLs

**Error handling**:
- [ ] Never expose sensitive info in error messages
- [ ] Log errors to console (for debugging)
- [ ] Show generic messages to users
- [ ] Provide safe fallbacks

**Code organization**:
- [ ] Minimize use of global variables
- [ ] Use strict mode (`'use strict';`)
- [ ] Validate function parameters
- [ ] Document security assumptions

### Step 7: Pre-commit security checklist

Before committing JavaScript, verify:

**Input validation**:
- [ ] All user input validated with whitelist
- [ ] URL parameters validated against allowed values
- [ ] External data structure validated before use

**XSS prevention**:
- [ ] No direct user input in innerHTML
- [ ] If using innerHTML, content is from pre-defined, whitelisted sources
- [ ] Documented which HTML tags are allowed
- [ ] Consider using textContent or createElement() for user content

**Dangerous functions**:
- [ ] No eval() or Function() constructor
- [ ] No document.write()
- [ ] No regex with ReDoS risk (nested quantifiers)

**Browser APIs**:
- [ ] Clipboard API wrapped in try/catch
- [ ] Fetch errors handled gracefully
- [ ] localStorage/sessionStorage wrapped in try/catch

**Error handling**:
- [ ] All async operations have .catch() or try/catch
- [ ] Errors logged to console
- [ ] User sees helpful (not technical) error messages
- [ ] Safe fallbacks provided

### Step 8: OWASP Top 10 validation

Check against OWASP Top 10 for web applications.

**A01:2021 - Broken Access Control**:
- [ ] Client-side code doesn't rely on security (no auth in JavaScript)
- [ ] Educational code only (no sensitive operations)

**A02:2021 - Cryptographic Failures**:
- [ ] No sensitive data in localStorage
- [ ] No hardcoded secrets or API keys
- [ ] No client-side encryption (not needed for educational content)

**A03:2021 - Injection (XSS)**:
- [ ] All user input sanitized before DOM insertion
- [ ] Whitelist validation used
- [ ] innerHTML only with pre-defined content

**A05:2021 - Security Misconfiguration**:
- [ ] No verbose error messages to users
- [ ] Console logging for development only
- [ ] No debug code in production

**A07:2021 - Identification and Authentication Failures**:
- [ ] N/A for client-side educational code (no auth)

**A08:2021 - Software and Data Integrity Failures**:
- [ ] JSON data files under version control
- [ ] CDN resources use SRI when possible
- [ ] No deserialization of untrusted data

**A09:2021 - Security Logging and Monitoring Failures**:
- [ ] Errors logged to console
- [ ] Fetch failures logged
- [ ] No sensitive data in logs

**A10:2021 - Server-Side Request Forgery (SSRF)**:
- [ ] N/A for client-side code (no server requests under user control)

## Common security mistakes

From HAP Learning Labs analysis:

1. **Direct URL parameter usage**
   - Issue: Using URL parameters directly in HTML
   - Fix: Whitelist validation — only allow known parameters

2. **innerHTML with dynamic content**
   - Issue: `innerHTML` can execute scripts if content contains `<script>`
   - Fix: Use pre-defined content only, or use textContent for user data

3. **Missing error handling**
   - Issue: Async operations without .catch() can fail silently
   - Fix: Always add .catch() or wrap in try/catch

4. **Assuming browser API success**
   - Issue: navigator.clipboard can fail or be denied
   - Fix: Wrap in try/catch, provide fallback options

5. **Regex comment stripping**
   - Issue: Using regex to parse complex formats (JSONC)
   - Fix: Use native response.json() or proper parser libraries

6. **No fallback for data loading failures**
   - Issue: Page breaks if JSON fails to load
   - Fix: Provide safe default message or graceful degradation

7. **Exposing technical errors to users**
   - Issue: Showing stack traces or file paths to users
   - Fix: Log details to console, show generic message to users

## Security audit template

When auditing JavaScript, follow this structure:

**1. Code inventory**:
- List all .js files
- List all inline `<script>` tags
- Note external libraries/CDN scripts

**2. Input sources**:
- Identify URL parameters used
- Identify form inputs
- Identify external data sources (JSON, APIs)

**3. Dangerous patterns**:
- Search for: eval, Function, innerHTML, document.write
- Check regex patterns for ReDoS
- Identify dynamic code execution

**4. Vulnerability assessment**:
- Critical: Immediate security risk (none expected for educational code)
- High: Significant vulnerability (direct XSS)
- Medium: Potential issue (regex parsing, missing sanitization)
- Low: Minor concern (missing try/catch)
- Informational: Best practice suggestions

**5. Recommendations**:
- Specific fixes for each issue
- Code examples of secure alternatives
- Priority order for fixes

## Testing procedures

**Quick security check** (5 minutes):
1. Search codebase for: `eval(`, `Function(`, `innerHTML`, `document.write`
2. Check URL parameter usage — all validated with whitelist?
3. Verify async operations have error handling

**Full security audit** (20-30 minutes):
1. Read all JavaScript files
2. Check each function against security checklist
3. Validate input handling patterns
4. Test error handling (break JSON, deny clipboard, etc.)
5. Document findings in security audit report

**Penetration testing** (optional):
1. Try XSS payloads in URL parameters
2. Break JSON structure, verify graceful failure
3. Deny browser permissions, verify fallbacks work

## Notes

- Educational JavaScript is lower risk than production applications (no auth, no sensitive data)
- Defense in depth: Multiple layers of protection (whitelist + sanitization + error handling)
- Whitelist validation is stronger than blacklist (allow known-good, not block known-bad)
- Native browser APIs (response.json(), textContent) are safer than custom parsing
- Comprehensive error handling prevents security info leakage

---

**Skill version**: 1.0
**Last updated**: October 2025
**Source**: HAP JavaScript Security Audit + easter-egg.js security patterns
**Standard**: OWASP Top 10 (2021)
