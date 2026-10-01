import type { Metadata } from 'next';
import { PAGES, type PageId } from '@/constants/pages';

export const getPage = (id: PageId) => {
  const page = PAGES.find((p) => p.id === id);
  if (!page) throw new Error(`Unknown page: ${id}`);
  return page;
};

/** Title, description and canonical URL for a page, from the page registry. */
export const pageMetadata = (id: PageId): Metadata => {
  const { path, title, description } = getPage(id);
  return {
    ...(title && { title }),
    ...(description && { description }),
    alternates: { canonical: path },
  };
};
