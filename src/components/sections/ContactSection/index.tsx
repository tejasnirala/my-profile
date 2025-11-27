import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { PROFILE } from '../../../constants/profile';

export const ContactSection = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
        <p className="text-muted-foreground">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>Feel free to reach out through any of these platforms.</CardDescription>
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
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => window.open(`https://${PROFILE.socials.linkedin}`)}>
              <Linkedin className="h-6 w-6" />
              <span>LinkedIn</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => window.open(`https://${PROFILE.socials.github}`)}>
              <Github className="h-6 w-6" />
              <span>GitHub</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Looking forward to building something amazing together.
        </p>
      </div>
    </div>
  );
};

