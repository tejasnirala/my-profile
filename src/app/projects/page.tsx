import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('projects');

export default function ProjectsPage() {
  return <ProjectsSection />;
}
