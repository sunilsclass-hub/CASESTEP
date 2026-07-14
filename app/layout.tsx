import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { PasswordRecoveryModal } from '@/components/PasswordRecoveryModal';
import { site } from '@/data/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const description =
  'CaseStep is a digital case-based learning platform strengthening clinical reasoning in undergraduate Community Medicine through branching cases, Script Concordance Testing, and OSCE/OSPE practice. Created by Dr. D. Sunil Kumar. Aligned with India’s NMC CBME curriculum.';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dr. D. Sunil Kumar',
  honorificPrefix: 'Dr.',
  jobTitle: 'Professor of Community Medicine; Dean (Students’ Welfare)',
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'JSS Medical College / JSS Academy of Higher Education & Research, Mysuru',
  },
  url: 'https://casestep.in/about/',
  // TODO: add sameAs (ORCID / Google Scholar / LinkedIn) once Dr. Kumar supplies them.
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: 'https://casestep.in/',
  description,
  author: personJsonLd,
  copyrightHolder: personJsonLd,
  publisher: personJsonLd,
  copyrightYear: 2026,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://casestep.in'),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description,
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
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/media/logo/casestep-favicon.svg', type: 'image/svg+xml' },
      { url: '/media/logo/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/media/logo/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/media/logo/app-icon-180.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description,
    locale: 'en_US',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <PasswordRecoveryModal />
        </Providers>
      </body>
    </html>
  );
}
