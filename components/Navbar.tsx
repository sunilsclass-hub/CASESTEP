'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { nav, site } from '@/data/site';
import { AuthWidget } from './AuthWidget';
import { IconMenu, IconX } from './icons';

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-white/80 backdrop-blur-lg">
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/media/logo/casestep-icon.svg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 flex-shrink-0"
          />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap text-lg font-bold text-ink-900">{site.name}</span>
            <span className="hidden whitespace-nowrap text-[11px] font-medium text-ink-500 2xl:block">
              Clinical Reasoning · Community Medicine
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-px xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`relative whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-brand-700'
                  : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg-brand-600" />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden flex-shrink-0 items-center gap-2 xl:flex">
          <AuthWidget />
          <Link href="/cases" className="btn-primary whitespace-nowrap">
            Start Learning
          </Link>
        </div>

        <button
          type="button"
          className="btn-ghost xl:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconX /> : <IconMenu />}
        </button>
      </nav>

      {open && (
        <div className="animate-fade-in-up border-t border-ink-200 bg-white/95 backdrop-blur xl:hidden">
          <div className="container-page grid grid-cols-2 gap-1 py-3 sm:grid-cols-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/cases"
              onClick={() => setOpen(false)}
              className="btn-primary col-span-2 mt-2 sm:col-span-3"
            >
              Start Learning
            </Link>
            <div className="col-span-2 mt-2 flex justify-center sm:col-span-3">
              <AuthWidget />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
