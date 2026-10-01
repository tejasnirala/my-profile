import { AboutSection } from '@/components/sections/AboutSection';
import { pageMetadata } from '@/lib/pages';

export const metadata = pageMetadata('about');

export default function Home() {
  return <AboutSection />;
}
