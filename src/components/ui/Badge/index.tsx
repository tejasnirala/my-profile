import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  className?: string;
};

// Badges are labels, not controls, so they get no hover or focus styles.
// Small text gets slightly positive tracking for legibility.
export const Badge = ({ children, variant = "default", className = "" }: BadgeProps) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    outline: "text-foreground",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-[0.01em] ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
