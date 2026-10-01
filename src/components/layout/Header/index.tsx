import Link from 'next/link';
import { NavLinks } from '@/components/layout/NavLinks';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { PROFILE } from '@/constants/profile';

export const Header = () => {
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
          <NavLinks />
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};
