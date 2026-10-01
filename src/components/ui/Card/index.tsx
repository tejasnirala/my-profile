import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const Card = ({ children, className = "", style }: CardProps) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`} style={style}>
    {children}
  </div>
);

type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
  /** Pick the level that continues the page's heading outline (default h3). */
  as?: "h2" | "h3";
};

export const CardTitle = ({ children, className = "", as: Heading = "h3" }: CardTitleProps) => (
  <Heading className={`text-2xl font-semibold leading-tight tracking-[-0.015em] ${className}`}>{children}</Heading>
);

type CardDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardDescription = ({ children, className = "" }: CardDescriptionProps) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardContent = ({ children, className = "" }: CardContentProps) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardFooter = ({ children, className = "" }: CardFooterProps) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
);

