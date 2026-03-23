// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Update this to your deployment URL
  site: 'https://example.com',
  build: {
    assets: 'assets'
  },
  markdown: {
    shikiConfig: {
      // Use css-variables theme for HAP custom styling
      theme: 'css-variables',
      // Languages commonly used in HAP Learning Labs
      langs: ['html', 'css', 'javascript', 'json', 'markdown', 'bash', 'text', 'nunjucks'],
      // Wrap code blocks for styling
      wrap: true
    }
  }
});
