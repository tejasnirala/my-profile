"use client";

import { useEffect, useState } from 'react';

type CopyButtonProps = {
  text: string;
  /** What's being copied, read after "Copy" by screen readers: "email address". */
  label: string;
  className?: string;
};

/** Copies `text` to the clipboard and confirms with "Copied" for a moment. */
export const CopyButton = ({ text, label, className = '' }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions). The text is
      // still on screen to select by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`label-caps shrink-0 select-none border-l border-border px-4 text-muted-foreground [-webkit-touch-callout:none] transition-[color,background-color] hover:bg-secondary hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${className}`}
    >
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      <span className="sr-only"> {label}</span>
    </button>
  );
};
