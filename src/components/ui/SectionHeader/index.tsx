import React from 'react';

type SectionHeaderProps = {
  /** Code-comment eyebrow, shown as "// eyebrow". */
  eyebrow: string;
  title: string;
  /** Second half of the title, set in orange. */
  emphasis?: string;
  intro?: React.ReactNode;
  as?: 'h1' | 'h2';
  id?: string;
  className?: string;
  style?: React.CSSProperties;
};

/** "// eyebrow", then a heading whose second half is orange, then an optional intro. */
export const SectionHeader = ({
  eyebrow,
  title,
  emphasis,
  intro,
  as: Heading = 'h2',
  id,
  className = '',
  style,
}: SectionHeaderProps) => (
  <div className={`space-y-4 ${className}`} style={style}>
    <p className="text-sm text-brand">
      <span aria-hidden>{'// '}</span>
      {eyebrow}
    </p>
    <Heading
      id={id}
      className={`font-bold tracking-[-0.03em] ${Heading === 'h1' ? 'text-4xl leading-[1.1] md:text-5xl' : 'text-3xl leading-[1.15] md:text-4xl'}`}
    >
      {title}
      {emphasis && <> <span className="text-brand">{emphasis}</span></>}
    </Heading>
    {intro && <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>}
  </div>
);
