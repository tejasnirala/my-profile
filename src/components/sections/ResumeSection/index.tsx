import React from 'react';
import { Download, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Separator } from '@/components/ui/Separator';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { EXPERIENCE } from '@/constants/experience';
import { EDUCATION } from '@/constants/education';
import { CERTIFICATIONS } from '@/constants/certification';
import { HOBBIES } from '@/constants/hobbies';

const sectionHeading = 'text-3xl font-bold tracking-tight mb-6';

export const ResumeSection = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
        <a
          href="/Tejas_Nirala_Resume.pdf"
          download
          className={buttonClasses("outline", "sm", "gap-2")}
        >
          <Download className="h-4 w-4" /> Download Resume
        </a>
      </div>

      <div className="space-y-10">
        {EXPERIENCE.map((exp) => (
          <TimelineItem key={`${exp.company}-${exp.role}`} title={exp.role} period={exp.period} subtitle={exp.company}>
            <div className="space-y-6">
              {exp.projects.map((project) => (
                <div key={project.name}>
                  <h4 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {project.name}
                  </h4>
                  <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-muted-foreground">
                    {project.achievements.map((ach) => (
                      <li key={ach} className="leading-relaxed">{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TimelineItem>
        ))}
      </div>

      <Separator className="my-8" />

      <h2 className={sectionHeading}>Education</h2>
      <div className="space-y-10">
        {EDUCATION.map((edu) => (
          <TimelineItem key={edu.school} title={edu.degree} period={edu.period} subtitle={edu.school}>
            <p className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4 shrink-0" /> {edu.location}
            </p>
          </TimelineItem>
        ))}
      </div>

      <Separator className="my-8" />

      <h2 className={sectionHeading}>Certifications & Awards</h2>
      <div className="space-y-10">
        {CERTIFICATIONS.map((cert) => (
          <TimelineItem key={cert.name} title={cert.name} period={cert.period} subtitle={cert.institution}>
            <p className="text-sm text-muted-foreground">{cert.description}</p>
            {cert.file && (
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" /> View Certificate
              </a>
            )}
          </TimelineItem>
        ))}
      </div>

      <Separator className="my-8" />

      <h2 className={sectionHeading}>Hobbies & Interests</h2>
      <div className="flex flex-wrap gap-3">
        {HOBBIES.map((hobby) => (
          <Badge key={hobby} variant="secondary" className="text-base px-4 py-2 bg-secondary/80">
            {hobby}
          </Badge>
        ))}
      </div>
    </div>
  );
};
