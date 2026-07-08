import type { MetadataRoute } from 'next';
import { getReadyCases } from '@/data/cases';

const BASE_URL = 'https://casestep.in';

/**
 * Static sitemap for the static export. Next.js generates this at build time
 * (compatible with `output: 'export'`) — no server runtime required.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '/',
    '/about/',
    '/cases/',
    '/sct/',
    '/osce/',
    '/dashboard/student/',
    '/dashboard/faculty/',
    '/expert-review/',
    '/research/',
    '/contact/',
  ];
  const staticRoutes = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const caseRoutes = getReadyCases().map((c) => ({
    url: `${BASE_URL}/cases/${c.slug}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...caseRoutes];
}
