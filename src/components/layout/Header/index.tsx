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

// The header is `fixed`, not `sticky`: Safari's rubber-band bounce drags a
// sticky header along with the page, while a fixed one stays put. Being fixed,
// it takes no room in the flow, so a spacer of the same height holds its place.
export const Header = () => {
  return (
    <>
      <div aria-hidden className="h-[calc(var(--header-h)+env(safe-area-inset-top,0px)+1px)] shrink-0 print:hidden" />
      <header className="fixed inset-x-0 top-0 z-50 border-b scroll-progress pt-[env(safe-area-inset-top)] bg-background/90 supports-backdrop-filter:bg-background/75 backdrop-blur-xl reduce-transparency:bg-background reduce-transparency:backdrop-blur-none contrast-more:bg-background">
        {/* Phones: logo and icons on the first row, the nav centred on its own row below.
            From md (and on landscape phones) it's one row: a grid with two equal
            side columns, so the nav sits at the exact centre of the page. */}
        <div className="frame gutter flex flex-wrap items-center justify-between gap-x-8 gap-y-0 content-center md:grid md:grid-cols-[1fr_auto_1fr] short:grid short:grid-cols-[1fr_auto_1fr] h-(--header-h)">
          <Link
            href="/"
            className="justify-self-start text-2xl select-none pointer-coarse:py-1.5 transition-[scale] duration-150 ease-out motion-safe:active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Logo />
            <span className="sr-only"> · {PROFILE.name}, home</span>
          </Link>

          <nav aria-label="Main" className="order-last w-full md:order-none md:w-auto short:order-none short:w-auto">
            <NavLinks items={NAV_ITEMS} />
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
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
    </>
  );
};
