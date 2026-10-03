import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  variant?: "brand" | "outline" | "secondary";
  className?: string;
};

// Badges are labels, not controls, so they get no hover or focus styles.
// Small caps text gets wide positive tracking for legibility.
export const Badge = ({ children, variant = "outline", className = "" }: BadgeProps) => {
  const variants = {
    brand: "border-brand/40 bg-background/60 text-brand font-semibold",
    outline: "border-border bg-background/60 text-muted-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
  };
  return (
    <span className={`inline-flex items-center border px-2 py-1 text-xs uppercase tracking-[0.08em] ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
