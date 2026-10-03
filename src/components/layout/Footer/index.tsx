import Link from 'next/link';
import { CommandLine } from '@/components/ui/CommandLine';
import { Logo } from '@/components/ui/Logo';
import { NewTabHint } from '@/components/ui/NewTabHint';
import { PAGES } from '@/constants/pages';
import { PROFILE, SOCIAL_LINKS } from '@/constants/profile';

const linkClasses =
  'inline-block py-1 pointer-coarse:py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring';

const headingClasses = 'label-caps mb-4 font-bold text-brand';

export const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden border-t pb-[env(safe-area-inset-bottom)]">
      <div className="frame gutter grid grid-cols-1 gap-12 py-14 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] md:gap-8 md:py-16">
        <div className="space-y-6">
          <Logo className="text-3xl" />
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{PROFILE.tagline}</p>
          <CommandLine command={`mail ${PROFILE.email}`} copyText={PROFILE.email} copyLabel="email address" />
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span aria-hidden className="size-2 bg-success" />
            {PROFILE.availability} · {PROFILE.address.city}, {PROFILE.address.countryCode}
          </p>
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
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  {link.label}
                  <NewTabHint />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClasses}>Contact</h2>
          <ul role="list" className="space-y-1.5">
            <li>
              <a href={`mailto:${PROFILE.email}`} className={linkClasses}>Email</a>
            </li>
            <li>
              <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`} className={linkClasses}>Phone</a>
            </li>
            <li>
              <a href="/Tejas_Nirala_Resume.pdf" download className={linkClasses}>
                Resume<span className="sr-only"> (PDF)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="frame gutter flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {PROFILE.name} · Built with Next.js</p>
          <p>{PROFILE.title} · {PROFILE.address.city}, {PROFILE.address.country}</p>
        </div>
      </div>

      {/* The oversized, barely-there wordmark that closes the page. */}
      <div aria-hidden className="frame gutter pointer-events-none select-none pb-6">
        <Logo className="block text-center text-[clamp(3rem,18vw,12rem)] leading-none text-foreground/[0.06] [&_span]:text-foreground/[0.06]" />
      </div>
    </footer>
  );
};
