import { ArrowUpRight } from 'lucide-react';
import { CommandLine } from '@/components/ui/CommandLine';
import { NewTabHint } from '@/components/ui/NewTabHint';
import { Section } from '@/components/ui/Section';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CONTACT } from '@/constants/contact';
import { PROFILE, SOCIAL_LINKS } from '@/constants/profile';
import { stagger } from '@/lib/motion';

type Channel = { label: string; value: string; href: string; external?: boolean };

const CHANNELS: Channel[] = [
  { label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/[^+\d]/g, '')}` },
  ...SOCIAL_LINKS.map((link) => ({
    label: link.label,
    value: PROFILE.socials[link.id],
    href: link.href,
    external: true,
  })),
];

export const ContactSection = () => {
  return (
    <Section innerClassName="space-y-10 pt-10 md:pt-16">
      <SectionHeader
        as="h1"
        eyebrow="contact"
        title="Get in"
        emphasis="touch."
        intro={CONTACT.intro}
        className="enter"
        style={stagger(0)}
      />

      <div className="enter max-w-2xl space-y-3" style={stagger(1)}>
        <p className="label-caps text-muted-foreground">Fastest: copy my email</p>
        <CommandLine command={`mail ${PROFILE.email}`} copyText={PROFILE.email} copyLabel="email address" />
      </div>

      <section aria-labelledby="contact-channels" className="enter space-y-4" style={stagger(2)}>
        <h2 id="contact-channels" className="sr-only">{CONTACT.cardTitle}</h2>
        {/* Each row is one large tap target that opens the mail app, the dialer or the profile. */}
        <ul role="list" className="border-t border-border">
          {CHANNELS.map((channel) => (
            <li key={channel.label} className="border-b border-border">
              <a
                href={channel.href}
                {...(channel.external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 py-5 transition-[background-color] hover:bg-secondary/60 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:px-3"
              >
                <span className="label-caps text-brand">{channel.label}</span>
                <span className="col-start-1 row-start-2 text-base font-semibold wrap-anywhere sm:col-start-2 sm:row-start-1 sm:text-lg">
                  {channel.value}
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="col-start-2 row-span-2 row-start-1 size-5 text-muted-foreground transition-[color,translate] duration-200 ease-out group-hover:text-brand motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 sm:col-start-3 sm:row-span-1"
                />
                {channel.external && <NewTabHint />}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="enter text-sm text-muted-foreground" style={stagger(3)}>
        <span aria-hidden className="text-brand">{'// '}</span>
        {CONTACT.closing}
      </p>
    </Section>
  );
};
