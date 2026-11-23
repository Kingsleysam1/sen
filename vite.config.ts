import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

// Link previews (WhatsApp, LinkedIn, X) ignore relative image URLs, so the share
// image is written into the built HTML as an absolute URL. Vercel exposes the
// production domain at build time; SITE_URL overrides it for any other host.
// With neither set, no image tag is written rather than a broken one.
function socialImage(): Plugin {
  const host = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const origin = host ? (host.startsWith('http') ? host : `https://${host}`).replace(/\/$/, '') : '';
  return {
    name: 'social-image',
    transformIndexHtml() {
      if (!origin) return [];
      const url = `${origin}/og-image.jpg`;
      const alt = 'Shalom C. Ernest, Management Consultant and Executive Leadership Trainer';
      return [
        { tag: 'meta', attrs: { property: 'og:image', content: url }, injectTo: 'head' as const },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' }, injectTo: 'head' as const },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' }, injectTo: 'head' as const },
        { tag: 'meta', attrs: { property: 'og:image:alt', content: alt }, injectTo: 'head' as const },
        { tag: 'meta', attrs: { name: 'twitter:image', content: url }, injectTo: 'head' as const },
      ];
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), socialImage()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
