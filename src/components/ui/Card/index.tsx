import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** `featured` gets the warm tint and orange edge, for the one card that leads a group. */
  variant?: "default" | "featured";
};

const cardVariants = {
  default: "border-border bg-card/70",
  featured: "border-brand/40 bg-brand/[0.06]",
};

export const Card = ({ children, className = "", style, variant = "default" }: CardProps) => (
  <div className={`border text-card-foreground ${cardVariants[variant]} ${className}`} style={style}>
    {children}
  </div>
);

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => (
  <div className={`flex flex-col gap-3 p-6 ${className}`}>{children}</div>
);

type CardKickerProps = {
  /** Zero-based position in the list; shown one-based and padded in orange ("01"). */
  index?: number;
  label: string;
  className?: string;
};

/** The small numbered caps line above a card title: "01  PR REVIEWS". */
export const CardKicker = ({ index, label, className = "" }: CardKickerProps) => (
  <p className={`label-caps flex items-center gap-3 text-muted-foreground ${className}`}>
    {index !== undefined && (
      <span className="font-bold tracking-normal text-brand">{String(index + 1).padStart(2, "0")}</span>
    )}
    {label}
  </p>
);

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
  /** Pick the level that continues the page's heading outline (default h3). */
  as?: "h2" | "h3";
};

export const CardTitle = ({ children, className = "", as: Heading = "h3" }: CardTitleProps) => (
  <Heading className={`text-lg font-bold leading-snug tracking-[-0.01em] ${className}`}>{children}</Heading>
);

type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardDescription = ({ children, className = "" }: CardDescriptionProps) => (
  <p className={`text-sm leading-relaxed text-muted-foreground ${className}`}>{children}</p>
);
