import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { site } from '@/data/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    'CaseStep delivers digital case-based learning modules in Community Medicine to enhance clinical reasoning in MBBS students, aligned with NMC CBME and the FAIMER project framework.',
  keywords: [
    'Community Medicine',
    'Case-Based Learning',
    'Clinical Reasoning',
    'NMC CBME',
    'FAIMER',
    'Script Concordance Test',
    'OSCE',
    'Medical Education',
  ],
  authors: [{ name: 'Dr. D. Sunil Kumar' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
