'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { nav, site } from '@/data/site';
import { IconMenu, IconX, IconStethoscope } from './icons';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
            <IconStethoscope width={20} height={20} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold text-ink-900">{site.name}</span>
            <span className="hidden text-[11px] font-medium text-ink-500 sm:block">
              Clinical Reasoning · Community Medicine
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link href="/cases" className="btn-primary">
            Start Learning
          </Link>
        </div>

        <button
          type="button"
          className="btn-ghost lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-200 bg-white lg:hidden">
          <div className="container-page grid grid-cols-2 gap-1 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cases"
              onClick={() => setOpen(false)}
              className="btn-primary col-span-2 mt-2"
            >
              Start Learning
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
