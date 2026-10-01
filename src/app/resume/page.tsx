import type { Metadata } from 'next';
import { ResumeSection } from '@/components/sections/ResumeSection';
import { PROFILE } from '@/constants/profile';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    `${PROFILE.name}'s professional experience, education, certifications, and skills. ${PROFILE.title} with ${PROFILE.yearsOfExperience} years building scalable web applications.`,
  alternates: { canonical: '/resume' },
};

export default function ResumePage() {
  return <ResumeSection />;
}
