import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardDescription, CardKicker } from '@/components/ui/Card';
import { NewTabHint } from '@/components/ui/NewTabHint';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FEATURED_PROJECTS, FEATURED_PROJECTS_INTRO } from '@/constants/experience';
import { stagger } from '@/lib/motion';

export const ProjectsSection = () => {
  return (
    <Section innerClassName="space-y-10 pt-10 md:pt-16">
      <SectionHeader
        as="h1"
        eyebrow="projects"
        title="Featured"
        emphasis="work."
        intro={FEATURED_PROJECTS_INTRO}
        className="enter"
        style={stagger(0)}
      />

      <ul role="list" className="grid gap-4 md:grid-cols-2">
        {FEATURED_PROJECTS.map((project, index) => (
          <li key={project.title} className="enter" style={stagger(index + 1)}>
            {/* The whole card is the link, so it's a big, honest target on touch screens. */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Card
                variant={index === 0 ? 'featured' : 'default'}
                className="reveal flex h-full flex-col gap-4 p-6 transition-[border-color,scale] duration-200 ease-out group-hover:border-brand/60 motion-safe:group-active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-4">
                  <CardKicker index={String(index + 1).padStart(2, '0')} label={project.company} />
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-muted-foreground transition-[color,translate] duration-200 ease-out group-hover:text-brand motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold leading-snug tracking-[-0.01em]">
                    {project.title}
                    <NewTabHint />
                  </h2>
                  <p className="text-xs text-muted-foreground">{project.role}</p>
                </div>
                <CardDescription className="grow">{project.summary}</CardDescription>
                <ul role="list" aria-label="Technologies" className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag, tagIndex) => (
                    <li key={tag}>
                      <Badge variant={tagIndex === 0 ? 'brand' : 'outline'}>{tag}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
};
