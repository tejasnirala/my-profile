import React from 'react';
import { Download, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { EXPERIENCE } from '@/constants/experience';
import { EDUCATION } from '@/constants/education';
import { CERTIFICATION } from '@/constants/certification';
import { HOBBIES } from '@/constants/hobbies';

export const ResumeSection = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Tejas_Nirala_Resume.pdf';
    link.download = 'Tejas_Nirala_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
        <Button variant="outline" size="sm" className="gap-2" onClick={handleDownloadResume}>
          <Download className="h-4 w-4" /> Download Resume
        </Button>
      </div>

      <div className="space-y-10">
        {EXPERIENCE.map((exp, index) => (
          <div key={index} className="relative pl-8 border-l border-border pb-2 last:pb-0">
            <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="text-xl font-bold text-primary">{exp.role}</h3>
              <Badge variant="secondary" className="w-fit mt-1 sm:mt-0">{exp.period}</Badge>
            </div>
            
            <div className="flex items-center text-lg font-semibold text-foreground mb-4">
              {exp.company}
            </div>
            
            <div className="space-y-6">
              {exp.projects.map((project, pIndex) => (
                <div key={pIndex} className="mt-2">
                  <h4 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    {project.name}
                  </h4>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-muted-foreground">
                    {project.achievements.map((ach, i) => (
                      <li key={i} className="leading-relaxed">{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-8" />

      <h2 className="text-3xl font-bold tracking-tight mb-6">Education</h2>
      <div className="space-y-10">
        {EDUCATION.map((edu, index) => (
          <div key={index} className="relative pl-8 border-l border-border pb-2 last:pb-0">
            <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="text-xl font-bold text-primary">{edu.degree}</h3>
              <Badge variant="secondary" className="w-fit mt-1 sm:mt-0">{edu.period}</Badge>
            </div>
            
            <div className="flex items-center text-lg font-semibold text-foreground mb-2">
              {edu.school}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" /> {edu.location}
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-8" />

      <h2 className="text-3xl font-bold tracking-tight mb-6">Certifications & Awards</h2>
      <div className="space-y-10">
        {CERTIFICATION.certifications.map((cert, index) => (
          <div key={index} className="relative pl-8 border-l border-border pb-2 last:pb-0">
            <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="text-xl font-bold text-primary">{cert.name}</h3>
              <Badge variant="secondary" className="w-fit mt-1 sm:mt-0">{cert.period}</Badge>
            </div>
            
            <div className="flex items-center text-lg font-semibold text-foreground mb-2">
              {cert.institution}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {cert.description}
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-8" />

      <h2 className="text-3xl font-bold tracking-tight mb-6">Hobbies & Interests</h2>
      <div className="flex flex-wrap gap-3">
        {HOBBIES.map((hobby, index) => (
          <Badge key={index} variant="secondary" className="text-base px-4 py-2 bg-secondary/80">
            {hobby}
          </Badge>
        ))}
      </div>
    </div>
  );
};

