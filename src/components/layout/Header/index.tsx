import Link from 'next/link';
import { NavLinks } from '@/components/layout/NavLinks';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { PAGES } from '@/constants/pages';
import { PROFILE } from '@/constants/profile';

// Only what the client needs: descriptions stay on the server.
const NAV_ITEMS = PAGES.map(({ path, navLabel }) => ({ path, label: navLabel }));

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full scroll-edge pt-[env(safe-area-inset-top)] bg-background/95 supports-backdrop-filter:bg-background/70 backdrop-blur-xl backdrop-saturate-150 reduce-transparency:bg-background reduce-transparency:backdrop-blur-none contrast-more:bg-background">
      <div className="gutter container mx-auto flex flex-col gap-2 py-2 md:flex-row md:gap-0 md:py-0 short:flex-row short:py-1 min-h-16 short:min-h-12 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg font-bold text-xl tracking-tight select-none transition-[scale] duration-150 ease-out motion-safe:active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            TN
          </span>
          <span>{PROFILE.name}</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-2">
          <NavLinks items={NAV_ITEMS} />
          <div className="pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};
