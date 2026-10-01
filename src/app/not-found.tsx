import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonClasses } from '@/components/ui/Button';
import { NOT_FOUND, PAGES } from '@/constants/pages';
import { stagger } from '@/lib/motion';

// No canonical URL and no `index`: Next adds `noindex` to 404 responses itself.
export const metadata: Metadata = {
  title: NOT_FOUND.title,
};

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-6">
      <p className="enter text-sm font-semibold text-muted-foreground" style={stagger(0)}>404</p>
      <h1 className="enter text-4xl md:text-5xl font-extrabold leading-[1.05] tracking-[-0.03em]" style={stagger(1)}>
        {NOT_FOUND.title}
      </h1>
      <p className="enter text-muted-foreground" style={stagger(2)}>{NOT_FOUND.message}</p>
      <nav aria-label="Pages" className="enter flex flex-wrap justify-center gap-3" style={stagger(3)}>
        {PAGES.map((page, index) => (
          <Link key={page.id} href={page.path} className={buttonClasses(index === 0 ? 'default' : 'outline')}>
            {page.navLabel}
          </Link>
        ))}
      </nav>
    </div>
  );
}
