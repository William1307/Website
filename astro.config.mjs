// Astro configuration.
// WHY static output: the whole site is content + data files; there is no runtime
// backend (the contact form posts to Formspree). Any static host can serve dist/.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kwol.cloud',
  output: 'static',
  integrations: [sitemap()],
  // Trailing slashes are normalized so hreflang alternates and the sitemap
  // never emit duplicate URLs for the same page.
  trailingSlash: 'ignore',
  markdown: {
    // Dual Shiki themes: CSS variables emitted per token; global.css flips them
    // with the site's light/dark mechanism (data-theme attr + media query).
    shikiConfig: {
      themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
      defaultColor: 'light',
    },
  },
});
