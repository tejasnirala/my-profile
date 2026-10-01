import { PROFILE } from './profile';

export type PageId = 'about' | 'resume' | 'projects' | 'contact';

export type Page = {
  id: PageId;
  path: string;
  navLabel: string;
  /** Omitted for the home page, which uses the site-wide default title. */
  title?: string;
  /** ≤155 characters. Omitted for the home page, which uses the site description. */
  description?: string;
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
    description: `${PROFILE.name}'s professional experience, education, certifications, and skills. ${PROFILE.title} with ${PROFILE.yearsOfExperience} years building scalable web applications.`,
  },
  {
    id: 'projects',
    path: '/projects',
    navLabel: 'Projects',
    title: 'Projects',
    description: `Featured projects engineered and led by ${PROFILE.name} — including AI platforms, HR/accounting systems, and blockchain supply-chain SDK work.`,
  },
  {
    id: 'contact',
    path: '/contact',
    navLabel: 'Contact',
    title: 'Contact',
    description: `Get in touch with ${PROFILE.name}, ${PROFILE.title} based in ${PROFILE.address.city}, ${PROFILE.address.country}. Open to new opportunities — reach out via email, LinkedIn, or GitHub.`,
  },
];

/** Shown for any URL that isn't a page. */
export const NOT_FOUND = {
  title: 'Page not found',
  message: "This page doesn't exist or has moved. Try one of these instead:",
};
