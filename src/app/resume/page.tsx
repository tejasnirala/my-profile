import type { Metadata } from 'next';
import { ResumeSection } from '../../components/sections/ResumeSection';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    "Tejas Nirala's professional experience, education, certifications, and skills. Full Stack Developer with 2.5+ years building scalable web applications.",
  alternates: { canonical: '/resume' },
};

export default function ResumePage() {
  return <ResumeSection />;
}
