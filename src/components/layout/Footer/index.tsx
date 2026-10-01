import { PROFILE, SOCIAL_LINKS } from '@/constants/profile';

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 mt-auto pb-[env(safe-area-inset-bottom)]">
      <div className="gutter container mx-auto flex flex-col items-center justify-between gap-2 py-4 md:h-15 md:flex-row md:py-0 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {PROFILE.name}.</p>
        <nav aria-label="Social" className="flex gap-1">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-2 py-1 pointer-coarse:py-3 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};
