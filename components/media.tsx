'use client';

import Image from 'next/image';

/**
 * CaseStep media system.
 *
 * Every visual on this platform is either:
 *   (a) an original, flat-style SVG illustration authored for this project
 *       (public/media/**\/*.svg) — abstract/iconographic by design, so it can
 *       never be mistaken for a real clinical photograph, or
 *   (b) a clearly-labelled video placeholder (no video file is embedded).
 *
 * No stock photography, no real patient imagery, and no third-party media are
 * used anywhere. This keeps the platform ethically safe by construction and
 * avoids all image-optimisation/licensing concerns — SVGs are tiny,
 * resolution-independent, and load with zero additional network weight.
 */

/** Wraps any media block with a caption and the standard academic-integrity note. */
export function Figure({
  children,
  caption,
  note = 'Educational illustration — no real patient data used.',
}: {
  children: React.ReactNode;
  caption?: string;
  note?: string | false;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-ink-200 bg-white">
      {children}
      {(caption || note) && (
        <figcaption className="border-t border-ink-100 px-4 py-2.5 text-xs text-ink-500">
          {caption && <span className="font-medium text-ink-600">{caption}</span>}
          {caption && note && ' — '}
          {note && <span className="italic">{note}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * An original SVG illustration, served from /public/media. Using next/image
 * even in static-export mode gives us explicit width/height (no layout shift)
 * and native lazy-loading; `unoptimized` is already set globally since the
 * export has no image server, which is irrelevant for vector SVGs anyway.
 */
export function Illustration({
  src,
  alt,
  caption,
  note,
  className = '',
  aspect = 'aspect-[4/3]',
}: {
  src: string;
  alt: string;
  caption?: string;
  note?: string | false;
  className?: string;
  aspect?: string;
}) {
  return (
    <Figure caption={caption} note={note}>
      <div className={`relative ${aspect} w-full bg-gradient-to-br from-brand-50 to-indigo-50 ${className}`}>
        <Image src={src} alt={alt} fill className="object-contain p-6" sizes="(max-width: 768px) 100vw, 480px" />
      </div>
    </Figure>
  );
}

/**
 * A clearly-labelled video placeholder — no video file is embedded anywhere
 * on the platform. Institution-approved demonstration videos can replace this
 * component's contents once reviewed and cleared.
 */
export function VideoPlaceholder({
  title,
  objective,
  duration = '3–5 min (planned)',
}: {
  title: string;
  objective: string;
  duration?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-dashed border-ink-300 bg-ink-50">
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 bg-ink-100/60 p-6 text-center">
        <span
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink-400 shadow-card"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <p className="text-sm font-semibold text-ink-700">{title}</p>
        <p className="max-w-xs text-xs text-ink-500">
          Video placeholder — institution-approved demonstration video to be uploaded after review.
        </p>
      </div>
      <div className="border-t border-ink-200 bg-white px-4 py-3 text-xs text-ink-600">
        <p>
          <span className="font-medium text-ink-700">Learning objective: </span>
          {objective}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-400">
          <span>Planned duration: {duration}</span>
          <span aria-hidden>·</span>
          <span>Transcript: to be added with the final video</span>
          <span aria-hidden>·</span>
          <span>Captions: to be added with the final video</span>
        </p>
      </div>
    </div>
  );
}
