import { Download, ExternalLink } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NewTabHint } from '@/components/ui/NewTabHint';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TimelineItem } from '@/components/ui/TimelineItem';
import { EXPERIENCE } from '@/constants/experience';
import { EDUCATION } from '@/constants/education';
import { CERTIFICATIONS } from '@/constants/certification';
import { HOBBIES } from '@/constants/hobbies';
import { RESUME_INTRO } from '@/constants/profile';
import { stagger } from '@/lib/motion';

export const ResumeSection = () => {
  return (
    <>
      <Section innerClassName="flex flex-col gap-8 pt-6 md:flex-row md:items-end md:justify-between md:pt-10">
        <SectionHeader
          as="h1"
          eyebrow="resume"
          title="Experience &"
          emphasis="education."
          intro={RESUME_INTRO}
          className="enter"
          style={stagger(0)}
        />
        <a
          href="/Tejas_Nirala_Resume.pdf"
          download
          className={buttonClasses('default', 'default', 'enter group shrink-0 self-start md:self-auto')}
          style={stagger(1)}
        >
          <Download aria-hidden className="size-4 transition-[translate] duration-200 ease-out motion-safe:group-hover:translate-y-0.5" />
          Download resume
          <span className="sr-only"> (PDF)</span>
        </a>
      </Section>

      <Section innerClassName="space-y-10">
        <SectionHeader eyebrow="experience" title="Where I've" emphasis="worked." className="enter" style={stagger(2)} />
        <ol role="list">
          {EXPERIENCE.map((exp) => (
            <TimelineItem key={`${exp.company}-${exp.role}`} title={exp.role} period={exp.period} subtitle={exp.company} meta={exp.location}>
              <div className="space-y-6">
                {exp.engagements.map((engagement) => (
                  <div key={engagement.name}>
                    <h4 className="mb-3 text-sm font-semibold text-foreground">{engagement.name}</h4>
                    <ul role="list" className="ml-4 list-[square] space-y-2 text-sm text-muted-foreground marker:text-brand">
                      {engagement.achievements.map((ach) => (
                        <li key={ach} className="pl-1 leading-relaxed">{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TimelineItem>
          ))}
        </ol>
      </Section>

      <Section innerClassName="space-y-10">
        <SectionHeader eyebrow="education" title="Where I" emphasis="studied." className="reveal" />
        <ol role="list">
          {EDUCATION.map((edu) => (
            <TimelineItem key={edu.school} title={edu.degree} period={edu.period} subtitle={edu.school} meta={edu.location} />
          ))}
        </ol>
      </Section>

      <Section innerClassName="space-y-10">
        <SectionHeader eyebrow="certifications" title="Certifications &" emphasis="awards." className="reveal" />
        <ol role="list">
          {CERTIFICATIONS.map((cert) => (
            <TimelineItem key={cert.name} title={cert.name} period={cert.period} subtitle={cert.institution}>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
              {cert.file && (
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-2 -mx-1 inline-flex items-center gap-1.5 px-1 py-1 pointer-coarse:py-3 text-sm font-semibold text-brand select-none hover:underline transition-[scale] duration-150 ease-out motion-safe:active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <ExternalLink aria-hidden className="size-4" /> View certificate
                  <span className="sr-only">: {cert.name}</span>
                  <NewTabHint />
                </a>
              )}
            </TimelineItem>
          ))}
        </ol>
      </Section>

      <Section innerClassName="space-y-8">
        <SectionHeader eyebrow="beyond work" title="Hobbies &" emphasis="interests." className="reveal" />
        <ul role="list" className="reveal flex flex-wrap gap-3">
          {HOBBIES.map((hobby) => (
            <li key={hobby}>
              <Badge className="px-3 py-2 text-sm">{hobby}</Badge>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
};
