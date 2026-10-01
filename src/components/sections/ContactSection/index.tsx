import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { NewTabHint } from '@/components/ui/NewTabHint';
import { CONTACT } from '@/constants/contact';
import { PROFILE, SOCIAL_LINKS } from '@/constants/profile';
import { stagger } from '@/lib/motion';

const CARD_SOCIALS = [
  { ...SOCIAL_LINKS.find((link) => link.id === 'linkedin')!, Icon: Linkedin },
  { ...SOCIAL_LINKS.find((link) => link.id === 'github')!, Icon: Github },
];

// Each row is one large tap target that opens the mail app or the dialer.
const rowClasses =
  'flex items-center gap-4 p-4 rounded-lg border bg-secondary/10 ring-offset-background transition-[background-color,border-color,scale] duration-150 ease-out hover:bg-secondary/40 motion-safe:active:scale-[0.98] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export const ContactSection = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="enter text-center space-y-2" style={stagger(0)}>
        <h1 className="text-3xl font-bold tracking-tight">{CONTACT.heading}</h1>
        <p className="text-muted-foreground">{CONTACT.intro}</p>
      </div>

      <Card className="enter" style={stagger(1)}>
        <CardHeader>
          <CardTitle as="h2">{CONTACT.cardTitle}</CardTitle>
          <CardDescription>{CONTACT.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <a href={`mailto:${PROFILE.email}`} className={rowClasses}>
            <span className="bg-primary/10 p-3 rounded-full shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-muted-foreground">Email</span>
              <span className="block text-base sm:text-lg font-semibold wrap-anywhere">{PROFILE.email}</span>
            </span>
          </a>

          <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`} className={rowClasses}>
            <span className="bg-primary/10 p-3 rounded-full shrink-0">
              <Phone className="h-6 w-6 text-primary" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-muted-foreground">Phone</span>
              <span className="block text-lg font-semibold">{PROFILE.phone}</span>
            </span>
          </a>

          <div className="grid grid-cols-2 gap-4 pt-2">
            {CARD_SOCIALS.map(({ id, href, label, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('outline', 'default', 'h-auto pointer-coarse:h-auto py-4 flex-col')}
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
                <NewTabHint />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="enter text-center text-sm text-muted-foreground" style={stagger(2)}>
        {CONTACT.closing}
      </p>
    </div>
  );
};
