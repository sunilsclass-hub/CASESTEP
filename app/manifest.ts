import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

/**
 * Static web app manifest for the static export. Next.js generates this at
 * build time (compatible with `output: 'export'`) — no server runtime
 * required. Colors match the site's existing teal brand token, not the
 * logo's navy/gold, since this controls browser/OS chrome around the
 * actual (still teal-themed) UI.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description:
      'Digital case-based learning platform strengthening clinical reasoning in undergraduate Community Medicine.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0d9488',
    icons: [
      { src: '/media/logo/app-icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/media/logo/app-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
