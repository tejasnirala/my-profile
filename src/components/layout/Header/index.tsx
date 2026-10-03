import Link from 'next/link';
import { Github } from 'lucide-react';
import { NavLinks } from '@/components/layout/NavLinks';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { buttonClasses } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { NewTabHint } from '@/components/ui/NewTabHint';
import { PAGES } from '@/constants/pages';
import { PROFILE, SOCIAL_LINKS } from '@/constants/profile';

// Only what the client needs: descriptions stay on the server.
const NAV_ITEMS = PAGES.map(({ path, navLabel }) => ({ path, label: navLabel }));
const GITHUB = SOCIAL_LINKS.find((link) => link.id === 'github')!;

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b scroll-progress pt-[env(safe-area-inset-top)] bg-background/90 supports-backdrop-filter:bg-background/75 backdrop-blur-xl reduce-transparency:bg-background reduce-transparency:backdrop-blur-none contrast-more:bg-background">
      {/* Phones: logo and icons on the first row, the nav on its own row below.
          From md (and on landscape phones) it's all one row. */}
      <div className="frame gutter flex flex-wrap items-center justify-between gap-x-8 gap-y-1 py-2 md:flex-nowrap md:py-0 short:flex-nowrap short:py-1 min-h-16 short:min-h-12">
        <Link
          href="/"
          className="text-2xl select-none transition-[scale] duration-150 ease-out motion-safe:active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
          <span className="sr-only"> · {PROFILE.name}, home</span>
        </Link>

        <nav aria-label="Main" className="order-last -mx-2.5 w-full md:order-none md:mx-0 md:w-auto md:flex-1 short:order-none short:mx-0 short:w-auto short:flex-1">
          <NavLinks items={NAV_ITEMS} />
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={GITHUB.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses('outline', 'icon')}
          >
            <Github aria-hidden className="size-4" />
            <span className="sr-only">{GITHUB.label}</span>
            <NewTabHint />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
