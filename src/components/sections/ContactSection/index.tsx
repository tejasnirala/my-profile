import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { buttonClasses } from '../../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { CONTACT } from '../../../constants/contact';
import { PROFILE } from '../../../constants/profile';

export const ContactSection = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{CONTACT.heading}</h2>
        <p className="text-muted-foreground">{CONTACT.intro}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{CONTACT.cardTitle}</CardTitle>
          <CardDescription>{CONTACT.cardDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4 p-4 rounded-lg border bg-secondary/10">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <a href={`mailto:${PROFILE.email}`} className="text-lg font-semibold hover:underline">
                {PROFILE.email}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 rounded-lg border bg-secondary/10">
            <div className="bg-primary/10 p-3 rounded-full">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="text-lg font-semibold">{PROFILE.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a href={`https://${PROFILE.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "default", "h-auto py-4 flex flex-col gap-2")}>
              <Linkedin className="h-6 w-6" />
              <span>LinkedIn</span>
            </a>
            <a href={`https://${PROFILE.socials.github}`} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", "default", "h-auto py-4 flex flex-col gap-2")}>
              <Github className="h-6 w-6" />
              <span>GitHub</span>
            </a>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">{CONTACT.closing}</p>
      </div>
    </div>
  );
};

