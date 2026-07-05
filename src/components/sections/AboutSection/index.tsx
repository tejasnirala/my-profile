import React from 'react';
import { Mail, Linkedin, Github, Code2, Terminal, Globe } from 'lucide-react';
import { buttonClasses } from '../../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Separator } from '../../ui/Separator';
import { PROFILE } from '../../../constants/profile';

export const AboutSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
            Building digital <br className="hidden md:block" />
            <span className="text-muted-foreground">experiences that matter.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {PROFILE.about}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href={`mailto:${PROFILE.email}`} className={buttonClasses()}>
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </a>
            <a href={`https://${PROFILE.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline")}>
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </a>
            <a href={`https://${PROFILE.socials.takeuforward}`} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline")}>
              <Code2 className="mr-2 h-4 w-4" /> TakeUForward
            </a>
            <a href={`https://${PROFILE.socials.github}`} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline")}>
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
        
        <Card className="w-full md:w-80 bg-secondary/20 border-border/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              Tech Stack
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {PROFILE.skills.map(group => (
              <div key={group.label}>
                <p className="text-sm font-medium mb-2 font-semibold">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-8" />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Terminal className="h-5 w-5" /> Backend & Systems</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Experience optimizing blockchain throughput by 15% and reducing API latency. 
              Proficient in C++, TypeScript, and Node.js microservices.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" /> Frontend Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Expert in building scalable UI libraries with React and MUI.
              Focus on performance metrics, reducing initial load times by 40% through code-splitting.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

