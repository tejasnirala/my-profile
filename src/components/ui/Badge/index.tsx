import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  variant?: "brand" | "outline";
  /** Uppercase caps label (default). Off for names that read better as written, e.g. skills. */
  caps?: boolean;
  className?: string;
};

const variants = {
  brand: "border-brand/40 bg-background/60 text-brand font-semibold",
  outline: "border-border bg-background/60 text-muted-foreground",
};

// Badges are labels, not controls, so they get no hover or focus styles.
// Caps use the shared `label-caps` size and tracking, like card kickers.
export const Badge = ({ children, variant = "outline", caps = true, className = "" }: BadgeProps) => (
  <span className={`inline-flex items-center border px-2 py-1 ${caps ? "label-caps" : "text-xs"} ${variants[variant]} ${className}`}>
    {children}
  </span>
);
