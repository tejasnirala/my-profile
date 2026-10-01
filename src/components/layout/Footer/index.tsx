import { PROFILE, SOCIAL_LINKS } from '@/constants/profile';

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 py-2 md:py-0 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-15 md:flex-row px-4 md:px-8 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {PROFILE.name}.</p>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

