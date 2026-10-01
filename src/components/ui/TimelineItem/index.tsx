import React from 'react';
import { Badge } from '@/components/ui/Badge';

type TimelineItemProps = {
  title: string;
  period: string;
  subtitle: string;
  children?: React.ReactNode;
};

/** One entry on the resume timeline: dot, title, period badge, subtitle, details. */
export const TimelineItem = ({ title, period, subtitle, children }: TimelineItemProps) => (
  <div className="relative pl-8 border-l border-border pb-2 last:pb-0">
    <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background" />

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <Badge variant="secondary" className="w-fit mt-1 sm:mt-0">{period}</Badge>
    </div>

    <p className="text-lg font-semibold text-foreground">{subtitle}</p>

    {children && <div className="mt-3">{children}</div>}
  </div>
);
