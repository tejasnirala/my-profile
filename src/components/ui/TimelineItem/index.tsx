import React from 'react';
import { CardTitle } from '@/components/ui/Card';

type TimelineItemProps = {
  title: string;
  period: string;
  subtitle: string;
  /** Shown under the period, e.g. the location. */
  meta?: string;
  children?: React.ReactNode;
};

/**
 * One entry on the resume: the period in a narrow left column, the details on
 * the right, separated from the next entry by a hairline. Render inside an `<ol>`.
 */
export const TimelineItem = ({ title, period, subtitle, meta, children }: TimelineItemProps) => (
  <li className="reveal grid gap-3 border-t border-border py-8 first:border-t-0 first:pt-0 last:pb-0 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
    <div className="space-y-1">
      <p className="text-sm font-semibold text-brand">{period}</p>
      {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
    </div>

    <div>
      <CardTitle>{title}</CardTitle>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  </li>
);
