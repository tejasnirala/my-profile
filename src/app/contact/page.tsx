import { ContactSection } from '@/components/sections/ContactSection';
import { pageMetadata } from '@/lib/pages';

export const metadata = pageMetadata('contact');

export default function ContactPage() {
  return <ContactSection />;
}
