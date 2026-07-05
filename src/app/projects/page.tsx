import type { Metadata } from 'next';
import { ProjectsSection } from '../../components/sections/ProjectsSection';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Featured projects engineered and led by Tejas Nirala — including AI platforms, HR/accounting systems, and blockchain supply-chain SDK work.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
  return <ProjectsSection />;
}
