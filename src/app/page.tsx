import { AboutSection } from '@/components/sections/AboutSection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('about');

export default function Home() {
  return <AboutSection />;
}
