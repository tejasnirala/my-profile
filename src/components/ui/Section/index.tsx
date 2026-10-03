import React from 'react';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Classes for the inner content column. */
  innerClassName?: string;
};

/**
 * One full-width band of a page. Bands are divided by hairlines that run edge to
 * edge, while their content stays in the shared `frame` column.
 */
export const Section = ({ children, className = '', innerClassName = '' }: SectionProps) => (
  <section className={`border-b border-border last:border-b-0 ${className}`}>
    <div className={`frame gutter py-14 md:py-20 short:py-10 ${innerClassName}`}>{children}</div>
  </section>
);
