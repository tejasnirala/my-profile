import { PROFILE } from '@/constants/profile';

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/50 py-2 md:py-0 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-15 md:flex-row px-4 md:px-8 text-sm text-muted-foreground">
        <p>© 2025 Tejas Nirala. Built with NextJs & Tailwind.</p>
        <div className="flex gap-4">
          <a href={`https://${PROFILE.socials.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          <a href={`https://${PROFILE.socials.github}`} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

