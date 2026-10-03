import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import { Card, CardDescription, CardHeader, CardKicker, CardTitle } from '@/components/ui/Card';
import { CommandLine } from '@/components/ui/CommandLine';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CONTACT } from '@/constants/contact';
import { HIGHLIGHTS, PROFILE, STATS } from '@/constants/profile';
import { stagger } from '@/lib/motion';

/** "01", "02"… for numbered cards. */
const pad = (index: number) => String(index + 1).padStart(2, '0');

const ctaLinks = [
  { href: '/resume', label: 'Resume' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export const AboutSection = () => {
  return (
    <>
      <Section innerClassName="space-y-8 pt-10 md:pt-16">
        <Link
          href="/contact"
          className="enter group inline-flex min-h-10 pointer-coarse:min-h-11 items-center gap-3 border border-input bg-background/60 px-4 text-sm transition-[border-color] hover:border-foreground/40 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          style={stagger(0)}
        >
          <span aria-hidden className="size-2 shrink-0 bg-brand" />
          {PROFILE.availability.toLowerCase()}
          <ArrowRight aria-hidden className="size-4 text-brand transition-[translate] duration-200 ease-out motion-safe:group-hover:translate-x-0.5" />
        </Link>

        <div className="space-y-5">
          <p className="enter text-sm text-muted-foreground" style={stagger(1)}>
            <span aria-hidden className="text-brand">{'// '}</span>
            {PROFILE.title.toLowerCase()} · {PROFILE.address.city.toLowerCase()}, {PROFILE.address.country.toLowerCase()}
          </p>
          <h1
            className="enter text-[2.125rem] leading-[1.08] font-extrabold tracking-[-0.045em] sm:text-6xl lg:text-7xl short:text-5xl"
            style={stagger(2)}
          >
            {PROFILE.headline.lead}
            <br />
            <span className="text-brand">{PROFILE.headline.emphasis}</span>
          </h1>
          <p className="enter max-w-3xl text-base leading-[1.8] text-muted-foreground md:text-lg" style={stagger(3)}>
            {PROFILE.about}
          </p>
        </div>

        <div className="enter max-w-2xl space-y-4" style={stagger(4)}>
          <CommandLine command={`mail ${PROFILE.email}`} copyText={PROFILE.email} copyLabel="email address" />
          <div className="grid grid-cols-2 gap-4">
            <a href={`mailto:${PROFILE.email}`} className={buttonClasses('default', 'lg', 'px-3')}>
              <Mail aria-hidden className="hidden size-4 sm:block" /> Get in touch
            </a>
            <Link href="/resume" className={buttonClasses('outline', 'lg', 'group px-3')}>
              Resume
              <ArrowRight aria-hidden className="size-4 transition-[translate] duration-200 ease-out motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <ul role="list" className="enter grid gap-4 sm:grid-cols-2" style={stagger(5)}>
          {STATS.map((stat) => (
            <li key={stat.label}>
              <Card variant={'featured' in stat ? 'featured' : 'default'} className="flex h-full flex-col gap-2 p-6">
                <p className="flex items-baseline justify-between gap-4">
                  <span className="text-3xl font-bold tracking-[-0.04em] tabular-nums">
                    {stat.value}
                    {stat.unit && <span className="ml-1 text-base font-normal tracking-normal text-muted-foreground">{stat.unit}</span>}
                  </span>
                  <span className="label-caps text-right text-brand">{stat.label}</span>
                </p>
                <p className="text-sm text-muted-foreground">{stat.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section innerClassName="py-10 md:py-12 space-y-6">
        <p className="label-caps flex items-center justify-center gap-3 text-center text-muted-foreground">
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand" />
          Daily drivers
        </p>
        <ul role="list" className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-base font-semibold text-foreground/80 md:gap-x-12">
          {PROFILE.featuredSkills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </Section>

      <Section innerClassName="space-y-10">
        <SectionHeader eyebrow="capabilities" title="Full stack." emphasis="Built to scale." className="reveal" />
        <ul role="list" className="grid gap-4 md:grid-cols-2">
          {HIGHLIGHTS.map((highlight, index) => (
            <li key={highlight.title} className="reveal">
              <Card className="h-full">
                <CardHeader>
                  <CardKicker index={pad(index)} label={highlight.label} />
                  <CardTitle>{highlight.title}</CardTitle>
                  <CardDescription>{highlight.body}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section innerClassName="space-y-10">
        <SectionHeader
          eyebrow="tech stack"
          title="Tools I"
          emphasis="ship with."
          intro="The languages, frameworks and infrastructure I reach for, from the first commit to production."
          className="reveal"
        />
        <ul role="list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROFILE.skills.map((group, index) => (
            <li key={group.label} className="reveal">
              <Card variant={index === 0 ? 'featured' : 'default'} className="h-full">
                <CardHeader>
                  <CardKicker index={pad(index)} label={`${group.items.length} tools`} />
                  <CardTitle>{group.label}</CardTitle>
                  <ul role="list" className="flex flex-wrap gap-2 pt-1">
                    {group.items.map((item) => (
                      <li key={item} className="border border-border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <Card className="reveal flex flex-col items-center gap-6 px-6 py-12 text-center md:px-12">
          <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">{CONTACT.cta.title}</h2>
          <p className="max-w-lg text-sm text-muted-foreground md:text-base">{CONTACT.cta.body}</p>
          <CommandLine
            command={`mail ${PROFILE.email}`}
            copyText={PROFILE.email}
            copyLabel="email address"
            className="w-full max-w-xl text-left"
          />
          <ul role="list" className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {ctaLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 py-1 pointer-coarse:py-2.5 text-sm font-semibold text-brand focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                  <ArrowRight aria-hidden className="size-4 transition-[translate] duration-200 ease-out motion-safe:group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </Section>
    </>
  );
};
