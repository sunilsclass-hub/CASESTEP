import Link from 'next/link';
import { site, nav } from '@/data/site';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-200 bg-white">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="text-lg font-bold text-ink-900">{site.name}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600">
            {site.projectTitle}.
          </p>
          <p className="mt-3 text-sm text-ink-500">
            {site.program} · {site.institution}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-900">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.slice(0, 6).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-600 hover:text-brand-700">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-900">Frameworks</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-600">
            <li>NMC CBME Curriculum</li>
            <li>FAIMER Project Framework</li>
            <li>Kern’s 6-Step Model · ADDIE</li>
            <li>TPACK · Clinical Reasoning</li>
            <li>Script Concordance · OSCE/OSPE</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-200">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. For educational and research use.</p>
          <p>Principal Investigator: Dr. D. Sunil Kumar · JSS AHER, Mysuru</p>
        </div>
      </div>
    </footer>
  );
}
