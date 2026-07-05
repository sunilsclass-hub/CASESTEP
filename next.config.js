/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export makes CaseStep deployable to Netlify, Vercel, GitHub Pages,
  // or any static host with zero server runtime. All interactivity (branching
  // cases, SCT scoring, progress) runs client-side via localStorage.
  output: 'export',
  // Required for `output: 'export'` since there is no image optimization server.
  images: { unoptimized: true },
  // Trailing slashes produce clean folder-based URLs on static hosts.
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
