import React from 'react';

type SeparatorProps = {
  className?: string;
};

export const Separator = ({ className = "" }: SeparatorProps) => (
  <div className={`shrink-0 bg-border h-px w-full ${className}`} />
);

