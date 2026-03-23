/**
 * Copy Button for Code Blocks
 * Adds a "Copy" button to all <pre> elements that copies code to clipboard
 */

document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks (works with both Shiki and Prism)
  document.querySelectorAll('pre').forEach(function(codeBlock) {
    // Skip if already has a copy button
    if (codeBlock.parentElement?.classList.contains('code-block-wrapper')) {
      return;
    }

    // Create copy button
    var button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    // Handle click
    button.addEventListener('click', function() {
      // Get code text (handle both <code> child and direct text)
      var code = codeBlock.querySelector('code');
      var text = code ? code.textContent : codeBlock.textContent;

      // Copy to clipboard
      navigator.clipboard.writeText(text).then(function() {
        // Show success state
        button.textContent = 'Copied!';
        button.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(function() {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        button.textContent = 'Error';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      });
    });

    // Wrap code block for positioning
    var wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
    wrapper.appendChild(button);
  });
});
