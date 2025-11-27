import React from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../ui/Card';
import { PROJECTS } from '../../../constants/projects';

export const ProjectsSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
        <p className="text-muted-foreground">A selection of projects I've engineered and led.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <Card key={index} className="flex flex-col h-full hover:border-primary/50 transition-colors duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <FolderGit2 className="h-8 w-8 mb-2 text-primary" />
                <a href={project.link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
              <CardTitle className="mt-2">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="grow">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.description}
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
        ))}
      </div>
    </div>
  );
};

