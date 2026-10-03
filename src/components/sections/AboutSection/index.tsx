import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { buttonClasses } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardDescription, CardHeader, CardKicker, CardTitle } from '@/components/ui/Card';
import { CommandLine } from '@/components/ui/CommandLine';
import { Portrait } from '@/components/ui/Portrait';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CONTACT } from '@/constants/contact';
import { PAGES } from '@/constants/pages';
import { HIGHLIGHTS, PROFILE, SKILLS_INTRO, STATS } from '@/constants/profile';
import { stagger } from '@/lib/motion';

/** The closing box links to every other page. */
const ctaLinks = PAGES.filter((page) => page.id !== 'about');

export const AboutSection = () => {
  return (
    <>
      <Section innerClassName="space-y-8 pt-6 md:pt-10">
        <Link
          href="/contact"
          className="enter group inline-flex min-h-10 pointer-coarse:min-h-11 items-center gap-2 border border-input bg-background/60 px-3 text-sm select-none sm:gap-3 sm:px-4 transition-[border-color,scale] duration-150 ease-out hover:border-foreground/40 motion-safe:active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          style={stagger(0)}
        >
          <span aria-hidden className="size-2 shrink-0 bg-brand" />
          {PROFILE.availability.toLowerCase()}
          <ArrowRight aria-hidden className="size-4 text-brand transition-[translate] duration-200 ease-out motion-safe:group-hover:translate-x-0.5" />
        </Link>

        {/* Phones: centred portrait, then the text.
            Tablets (md): portrait beside the headline, summary and buttons full
            width below; the text column dissolves (`md:contents`) so its parts
            become grid cells.
            Desktop (lg+): headline, summary and buttons on the left, portrait
            beside all three. Column widths keep the headline on two lines. */}
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_15rem] md:gap-y-2 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_21rem] 2xl:grid-cols-[minmax(0,1fr)_25rem] 2xl:gap-12">
          <div className="min-w-0 space-y-6 md:contents md:space-y-0 lg:block lg:space-y-6">
            <div className="space-y-5 md:col-start-1 md:row-start-1 lg:col-auto lg:row-auto">
              <h1
                className="enter text-[clamp(1.75rem,8.5vw,2.125rem)] leading-[1.08] font-extrabold tracking-[-0.045em] sm:text-5xl md:text-[2.75rem] xl:text-6xl short:text-5xl"
                style={stagger(2)}
              >
                {PROFILE.headline.lead}
                <br />
                <span className="text-brand">{PROFILE.headline.emphasis}</span>
              </h1>
            </div>
            <p className="enter text-base leading-[1.8] text-muted-foreground md:col-span-2 md:text-lg lg:col-auto" style={stagger(3)}>
              {PROFILE.about}
            </p>
            <div className="enter grid max-w-2xl grid-cols-2 gap-4 pt-2 md:col-span-2 lg:col-auto" style={stagger(4)}>
              <a href={`mailto:${PROFILE.email}`} className={buttonClasses('default', 'lg', 'px-3')}>
                <Mail aria-hidden className="hidden size-4 sm:block" /> Get in touch
              </a>
              <Link href="/resume" className={buttonClasses('outline', 'lg', 'group px-3')}>
                Resume
                <ArrowRight aria-hidden className="size-4 transition-[translate] duration-200 ease-out motion-safe:group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <Portrait
            style={stagger(1)}
            className="enter order-first mx-auto w-60 sm:w-64 max-md:short:w-44 md:order-none md:col-start-2 md:row-start-1 md:mx-0 md:w-full lg:col-auto lg:row-auto"
            sizes="(min-width: 96rem) 25rem, (min-width: 80rem) 21rem, (min-width: 64rem) 18rem, (min-width: 48rem) 15rem, (min-width: 40rem) 16rem, 15rem"
          />
        </div>

        <ul role="list" className="enter grid grid-cols-2 gap-3 sm:gap-4" style={stagger(5)}>
          {STATS.map((stat) => (
            <li key={stat.label}>
              <Card variant={'featured' in stat ? 'featured' : 'default'} className="flex h-full flex-col gap-2 p-4 sm:p-6">
                <p className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <span className="text-3xl font-bold tracking-[-0.03em] tabular-nums">
                    {stat.parts.map((part, index) => (
                      <span key={part.unit || index} className={index > 0 ? 'ml-2' : undefined}>
                        {part.value}
                        {part.unit && <span className="ml-1 text-base font-normal tracking-normal text-muted-foreground">{part.unit}</span>}
                      </span>
                    ))}
                  </span>
                  <span className="label-caps text-brand sm:text-right">{stat.label}</span>
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
                  <CardKicker index={index} label={highlight.label} />
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
          intro={SKILLS_INTRO}
          className="reveal"
        />
        <ul role="list" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PROFILE.skills.map((group, index) => (
            <li key={group.label} className="reveal">
              <Card variant={index === 0 ? 'featured' : 'default'} className="h-full">
                <CardHeader>
                  <CardKicker index={index} label={`${group.items.length} tools`} />
                  <CardTitle>{group.label}</CardTitle>
                  <ul role="list" className="flex flex-wrap gap-2 pt-1">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge caps={false} className="px-2.5">{item}</Badge>
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
        <Card className="reveal flex flex-col items-center gap-6 px-3 py-12 text-center sm:px-6 md:px-12">
          <h2 className="text-2xl font-bold tracking-[-0.03em] md:text-3xl">{CONTACT.cta.title}</h2>
          <p className="max-w-lg text-sm text-muted-foreground md:text-base">{CONTACT.cta.body}</p>
          <CommandLine
            verb="mail"
            command={PROFILE.email}
            copyText={PROFILE.email}
            copyLabel="email address"
            // Below 360px the line borrows 8px of the box padding per side so the
            // full address fits next to COPY.
            className="w-full max-w-xl text-left max-[22.5rem]:-mx-2 max-[22.5rem]:w-[calc(100%+1rem)]"
          />
          <ul role="list" className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {ctaLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="group inline-flex items-center gap-2 py-1 pointer-coarse:py-3 text-sm font-semibold text-brand select-none transition-[opacity] active:opacity-70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.navLabel}
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
