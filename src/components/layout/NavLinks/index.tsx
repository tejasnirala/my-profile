"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonClasses } from '@/components/ui/Button';

type NavLinksProps = {
  items: { path: string; label: string }[];
};

/**
 * Clips the full-width pill layer down to the active link. Clip-path stays on the
 * GPU, and a CSS transition retargets from wherever it is, so rapid clicks glide
 * instead of restarting.
 */
const placeIndicator = (nav: HTMLElement, indicator: HTMLElement, animate: boolean) => {
  const active = nav.querySelector<HTMLElement>('[aria-current="page"]');
  if (!active) {
    indicator.style.opacity = '0';
    return;
  }
  const left = active.offsetLeft;
  const right = nav.clientWidth - left - active.offsetWidth;
  indicator.style.transition = animate ? '' : 'none';
  indicator.style.clipPath = `inset(0 ${right}px 0 ${left}px)`;
  indicator.style.opacity = '1';
  // Hand the active background from the link (server-rendered fallback) to the pill.
  nav.dataset.ready = '';
};

export const NavLinks = ({ items }: NavLinksProps) => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const placedRef = useRef(false);

  // Before paint: jump into place on first load, glide on route changes.
  useLayoutEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    placeIndicator(navRef.current, indicatorRef.current, placedRef.current);
    placedRef.current = true;
  }, [pathname]);

  // Rotation, resizing and font loading move the links; follow them without animating.
  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;
    const observer = new ResizeObserver(() => placeIndicator(nav, indicator, false));
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={navRef} className="group relative flex items-center gap-0.5 sm:gap-1">
      <span
        ref={indicatorRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-secondary opacity-0 transition-[clip-path] duration-250 ease-in-out motion-reduce:transition-none"
      />
      {items.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          aria-current={pathname === item.path ? 'page' : undefined}
          className={buttonClasses(
            'ghost',
            'sm',
            // Inactive links are muted and the active one is full-contrast, so the
            // current page isn't signalled by the faint pill alone (WCAG 1.4.11);
            // forced-colors mode drops backgrounds, so it gets an underline.
            'relative px-2.5 text-[0.8125rem] sm:px-3 sm:text-sm text-muted-foreground hover:text-foreground aria-[current=page]:bg-secondary aria-[current=page]:text-foreground forced-colors:aria-[current=page]:underline group-data-ready:aria-[current=page]:bg-transparent',
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};
