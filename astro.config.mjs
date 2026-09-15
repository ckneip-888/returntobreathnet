// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/** @param {string} page */
function isIndexableMarketingUrl(page) {
  const { pathname } = new URL(page);
  if (pathname === '/en' || pathname === '/en/' || pathname.startsWith('/en/')) return false;
  if (pathname === '/regulate' || pathname === '/regulate/' || pathname.startsWith('/regulate/')) {
    return false;
  }
  return true;
}

export default defineConfig({
  site: 'https://returntobreath.net',
  trailingSlash: 'always',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: isIndexableMarketingUrl,
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', de: 'de' },
      },
      serialize(item) {
        if (item.links?.length) {
          const english = item.links.find((link) => link.lang === 'en');
          if (english && !item.links.some((link) => link.lang === 'x-default')) {
            item.links = [...item.links, { url: english.url, lang: 'x-default' }];
          }
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    format: 'directory',
  },
});
