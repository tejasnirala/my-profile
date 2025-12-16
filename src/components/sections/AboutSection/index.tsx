import React from 'react';
import { Mail, Linkedin, Github, Code2, Terminal, Globe } from 'lucide-react';
import { Button } from '../../ui/Button';
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
            <Button onClick={() => window.open(`mailto:${PROFILE.email}`)}>
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
            <Button variant="outline" onClick={() => window.open(`https://${PROFILE.socials.linkedin}`)}>
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Button>
            <Button variant="outline" onClick={() => window.open(`https://${PROFILE.socials.takeuforward}`)}>
              <Code2 className="mr-2 h-4 w-4" /> TakeUForward
            </Button>
            <Button variant="outline" onClick={() => window.open(`https://${PROFILE.socials.github}`)}>
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
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
            <div>
              <p className="text-sm font-medium mb-2">Core</p>
              <div className="flex flex-wrap gap-2">
                {PROFILE.skills.languages.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Frontend</p>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'React', 'Tailwind', 'Shadcn'].map(s => <Badge key={s} variant="outline">{s}</Badge>)}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Backend & DevOps</p>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Docker', 'AWS', 'SQL'].map(s => <Badge key={s} variant="outline">{s}</Badge>)}
              </div>
            </div>
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
              Focus on performance metrics, reducing initial load times by 35% through code-splitting.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

