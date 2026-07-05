import type { Metadata } from 'next';
import { ContactSection } from '../../components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Tejas Nirala, Software Engineer based in Jaipur, India. Open to new opportunities — reach out via email, LinkedIn, or GitHub.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactSection />;
}
