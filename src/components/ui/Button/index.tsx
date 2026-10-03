import React from 'react';

type Variant = "default" | "outline" | "ghost" | "secondary";
type Size = "default" | "sm" | "lg" | "icon";

// `default` is the amber call to action; everything else stays quiet and hairline.
const variants: Record<Variant, string> = {
  default: "bg-highlight text-highlight-foreground font-semibold hover:brightness-95",
  outline: "border border-input bg-background/60 hover:bg-secondary hover:border-foreground/40",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
};

// Touch screens get 44px targets (Apple's minimum); mice keep the denser sizes.
const sizes: Record<Size, string> = {
  default: "h-11 px-5",
  sm: "h-9 px-3 pointer-coarse:h-11",
  lg: "h-12 px-8",
  icon: "size-9 pointer-coarse:size-11",
};

/**
 * Shared button styling. Exported so links (`<a>`) can look like buttons
 * without needing an onClick handler — keeping those components server-rendered.
 * Press feedback (scale on `:active`) responds on pointer-down, not on release.
 * Controls don't show the iOS long-press link callout.
 */
export const buttonClasses = (
  variant: Variant = "default",
  size: Size = "default",
  className = "",
) =>
  `inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium select-none [-webkit-touch-callout:none] ring-offset-background transition-[color,background-color,border-color,filter,scale] duration-150 ease-out motion-safe:active:scale-[0.97] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export const Button = ({
  variant = "default",
  size = "default",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
};
