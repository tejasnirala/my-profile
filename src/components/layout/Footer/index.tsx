import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { NewTabHint } from '@/components/ui/NewTabHint';
import { PAGES } from '@/constants/pages';
import { PROFILE, socialsIn } from '@/constants/profile';

const linkClasses =
  'inline-block py-1 pointer-coarse:py-3 text-sm text-muted-foreground transition-colors hover:text-foreground active:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

const headingClasses = 'label-caps mb-4 font-bold text-brand';

export const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden border-t pb-[env(safe-area-inset-bottom)]">
      <div className="frame gutter grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-8 sm:grid-cols-3 sm:gap-10 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] md:gap-8 md:pt-16 md:pb-10">
        <div className="col-span-2 flex max-w-md flex-col gap-6 sm:col-span-3 md:col-span-1 md:max-w-sm">
          <Logo className="text-3xl" />
          <p className="text-sm leading-relaxed text-muted-foreground">{PROFILE.tagline}</p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span aria-hidden className="size-2 bg-success" />
            {PROFILE.availability}
          </p>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {PROFILE.name}</p>
        </div>

        <nav aria-labelledby="footer-pages">
          <h2 id="footer-pages" className={headingClasses}>Pages</h2>
          <ul role="list" className="space-y-1.5">
            {PAGES.map((page) => (
              <li key={page.id}>
                <Link href={page.path} className={linkClasses}>{page.navLabel}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-social">
          <h2 id="footer-social" className={headingClasses}>Elsewhere</h2>
          <ul role="list" className="space-y-1.5">
            {socialsIn('elsewhere').map((link) => (
              <li key={link.id}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  {link.label}
                  <NewTabHint />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-contact">
          <h2 id="footer-contact" className={headingClasses}>Contact</h2>
          <ul role="list" className="space-y-1.5">
            <li>
              <a href={`mailto:${PROFILE.email}`} className={linkClasses}>Email</a>
            </li>
            {socialsIn('contact').map((link) => (
              <li key={link.id}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  {link.label}
                  <NewTabHint />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* The oversized ghost wordmark that closes the page (see `wordmark-ghost`). */}
      <div aria-hidden className="frame gutter pointer-events-none select-none">
        <Logo className="wordmark-ghost block text-center text-[clamp(3rem,18vw,16rem)] leading-[1.1]" />
      </div>
    </footer>
  );
};
