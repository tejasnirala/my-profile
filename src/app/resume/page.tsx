import { ResumeSection } from '@/components/sections/ResumeSection';
import { pageMetadata } from '@/lib/pages';

export const metadata = pageMetadata('resume');

export default function ResumePage() {
  return <ResumeSection />;
}
