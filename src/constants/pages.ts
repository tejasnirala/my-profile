import { PROFILE, socialsIn } from './profile';

/** "email, LinkedIn, Instagram or X (Twitter)": the channels the Contact page lists. */
const contactChannels = (() => {
  const names = ['email', ...socialsIn('contact').map((link) => link.label)];
  return `${names.slice(0, -1).join(', ')} or ${names.at(-1)}`;
})();

export type PageId = 'about' | 'resume' | 'projects' | 'contact';

export type Page = {
  id: PageId;
  path: string;
  navLabel: string;
  /** Omitted for the home page, which uses the site-wide default title. */
  title?: string;
  /** ≤155 characters. Omitted for the home page, which uses the site description. */
  description?: string;
  /** ≤110 characters, for link previews (Open Graph / X). Omitted for the home page. */
  socialDescription?: string;
};

/** Every page on the site, in navigation order. */
export const PAGES: Page[] = [
  {
    id: 'about',
    path: '/',
    navLabel: 'About',
  },
  {
    id: 'resume',
    path: '/resume',
    navLabel: 'Resume',
    title: 'Resume',
    description: `${PROFILE.name}'s experience, education, certifications and skills. ${PROFILE.title} with ${PROFILE.experienceDuration} building scalable web applications.`,
    socialDescription: `Experience, education and certifications of ${PROFILE.name}, ${PROFILE.title}.`,
  },
  {
    id: 'projects',
    path: '/projects',
    navLabel: 'Projects',
    title: 'Projects',
    description: `Featured projects engineered and led by ${PROFILE.name} — including AI platforms, HR/accounting systems, and blockchain supply-chain SDK work.`,
    socialDescription: `AI platforms, HR/accounting systems and blockchain SDK work engineered and led by ${PROFILE.name}.`,
  },
  {
    id: 'contact',
    path: '/contact',
    navLabel: 'Contact',
    title: 'Contact',
    description: `Get in touch with ${PROFILE.name}, ${PROFILE.title} in ${PROFILE.address.city}, ${PROFILE.address.country}. Open to new opportunities — reach out via ${contactChannels}.`,
    socialDescription: `Open to new opportunities. Reach ${PROFILE.name} via ${contactChannels}.`,
  },
];

/** Shown for any URL that isn't a page. */
export const NOT_FOUND = {
  title: 'Page not found',
  message: "This page doesn't exist or has moved. Try one of these instead:",
};
