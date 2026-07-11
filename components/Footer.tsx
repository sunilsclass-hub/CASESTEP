import Link from 'next/link';
import { site, nav } from '@/data/site';
import { IconStethoscope } from './icons';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink-200 bg-white">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 text-white">
              <IconStethoscope width={16} height={16} />
            </span>
            <p className="text-lg font-bold text-ink-900">{site.name}</p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
            {site.projectTitle}.
          </p>
          <p className="mt-3 text-sm text-ink-500">
            Created by Dr. D. Sunil Kumar · Professor of Community Medicine &amp; Dean (Students’
            Welfare), JSS Medical College · JSS AHER, Mysuru.
          </p>
          <p className="mt-1.5 text-sm text-ink-500">
            Developed during the International FAIMER Fellowship in Health Professions Education.
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
        <div className="container-page py-5 text-center text-xs text-ink-500">
          <p>
            © {new Date().getFullYear()} Dr. D. Sunil Kumar · {site.name}. For educational and
            research use. Not a substitute for clinical judgment or medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
