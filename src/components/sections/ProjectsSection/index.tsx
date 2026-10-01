import React from 'react';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { FEATURED_PROJECTS, FEATURED_PROJECTS_INTRO } from '@/constants/experience';
import { stagger } from '@/lib/motion';

export const ProjectsSection = () => {
  return (
    <div className="space-y-8">
      <div className="enter flex flex-col space-y-2" style={stagger(0)}>
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-muted-foreground">{FEATURED_PROJECTS_INTRO}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_PROJECTS.map((project, index) => (
          // The whole card is the link, so it's a big, honest target on touch screens.
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="enter group block rounded-xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={stagger(index + 1)}
          >
            <Card className="reveal flex flex-col h-full transition-[border-color,translate,scale] duration-200 ease-out group-hover:border-primary/40 motion-safe:group-hover:-translate-y-1 motion-safe:group-active:scale-[0.98]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <FolderGit2 className="h-8 w-8 mb-2 text-primary" />
                  <ArrowUpRight
                    aria-hidden
                    className="h-5 w-5 text-muted-foreground transition-[color,translate] duration-200 ease-out group-hover:text-primary motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                </div>
                <CardTitle className="mt-2">
                  {project.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="grow">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.summary}
                </p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2 pt-4 mt-auto border-t bg-secondary/10">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </CardFooter>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};
