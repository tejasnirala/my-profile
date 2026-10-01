import React from 'react';
import { Mail, Linkedin, Github, Code2, Terminal, Globe } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { HIGHLIGHTS, PROFILE, SOCIAL_LINKS } from '@/constants/profile';

const SOCIAL_ICONS = { linkedin: Linkedin, github: Github, takeuforward: Code2 };
const HIGHLIGHT_ICONS = { terminal: Terminal, globe: Globe };

export const AboutSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
            {PROFILE.headline.lead} <br className="hidden md:block" />
            <span className="text-muted-foreground">{PROFILE.headline.emphasis}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {PROFILE.about}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href={`mailto:${PROFILE.email}`} className={buttonClasses()}>
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </a>
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.id];
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses('outline')}
                >
                  <Icon className="mr-2 h-4 w-4" /> {link.label}
                </a>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-80 shrink-0">
          <Card className="bg-secondary/20 border-border/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {PROFILE.skills.map(group => (
                <div key={group.label}>
                  <p className="text-sm font-semibold mb-2">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-2 gap-6">
        {HIGHLIGHTS.map((highlight) => {
          const Icon = HIGHLIGHT_ICONS[highlight.icon];
          return (
            <Card key={highlight.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" /> {highlight.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{highlight.body}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
