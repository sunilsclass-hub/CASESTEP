import React from 'react';

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string | { pathname?: string };
  children: React.ReactNode;
};

/** Test stub for next/link — renders a plain anchor (no router needed). */
export default function Link({ href, children, ...props }: LinkProps) {
  const url = typeof href === 'string' ? href : href?.pathname ?? '#';
  return (
    <a href={url} {...props}>
      {children}
    </a>
  );
}
