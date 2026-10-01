import React from 'react';
import { Mail, Linkedin, Github, Code2, Terminal, Globe } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NewTabHint } from '@/components/ui/NewTabHint';
import { Separator } from '@/components/ui/Separator';
import { HIGHLIGHTS, PROFILE, SOCIAL_LINKS } from '@/constants/profile';
import { stagger } from '@/lib/motion';

const SOCIAL_ICONS = { linkedin: Linkedin, github: Github, takeuforward: Code2 };
const HIGHLIGHT_ICONS = { terminal: Terminal, globe: Globe };

export const AboutSection = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4">
          <h1
            className="enter text-4xl md:text-6xl lg:text-7xl short:text-4xl font-extrabold leading-[1.05] tracking-[-0.035em]"
            style={stagger(0)}
          >
            {PROFILE.headline.lead} <br className="hidden md:block" />
            <span className="text-muted-foreground">{PROFILE.headline.emphasis}</span>
          </h1>
          <p
            className="enter text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            style={stagger(1)}
          >
            {PROFILE.about}
          </p>
          <div className="enter flex flex-wrap gap-3 pt-4" style={stagger(2)}>
            <a href={`mailto:${PROFILE.email}`} className={buttonClasses()}>
              <Mail className="h-4 w-4" /> Contact Me
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
                  <Icon className="h-4 w-4" /> {link.label}
                  <NewTabHint />
                </a>
              );
            })}
          </div>
        </div>

        <div className="enter w-full md:w-80 shrink-0" style={stagger(3)}>
          <Card className="bg-secondary/20 border-border/50">
            <CardHeader>
              <CardTitle as="h2" className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                Tech Stack
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {PROFILE.skills.map(group => (
                <div key={group.label}>
                  <h3 className="text-sm font-semibold mb-2">{group.label}</h3>
                  <ul role="list" className="flex flex-wrap gap-2">
                    {group.items.map(s => <li key={s}><Badge variant="secondary">{s}</Badge></li>)}
                  </ul>
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
            <Card key={highlight.title} className="reveal">
              <CardHeader>
                <CardTitle as="h2" className="flex items-center gap-2">
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
