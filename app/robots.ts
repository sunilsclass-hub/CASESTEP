import type { MetadataRoute } from 'next';

/**
 * Static robots.txt for the static export. Next.js generates this at build
 * time (compatible with `output: 'export'`) — no server runtime required.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://casestep.in/sitemap.xml',
  };
}
