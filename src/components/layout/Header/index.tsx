"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonClasses } from '../../ui/Button';
import { ThemeToggle } from '../ThemeToggle';
import { PROFILE } from '../../../constants/profile';

const NAV_ITEMS = [
  { label: 'About', href: '/' },
  { label: 'Resume', href: '/resume' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex flex-col gap-4 md:gap-0 md:flex-row min-h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="mt-1 md:mt-0 flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            TN
          </div>
          <span className="sm:inline-block">{PROFILE.name}</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={buttonClasses(isActive ? 'secondary' : 'ghost', 'sm', 'text-xs sm:text-sm transition-all')}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};
