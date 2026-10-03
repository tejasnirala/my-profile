"use client";

import { useEffect, useState } from 'react';

type CopyButtonProps = {
  text: string;
  /** What's being copied, read after "Copy" by screen readers: "email address". */
  label: string;
  className?: string;
};

const labelClasses = 'col-start-1 row-start-1 transition-[opacity,translate] duration-150 ease-out';

/**
 * Copies `text` to the clipboard and confirms with "Copied" for a moment. Both
 * labels share one grid cell, so the button keeps the wider label's width and
 * the text beside it never shifts; they crossfade (with a small slide when
 * motion is allowed). Screen readers get the state from the live region.
 */
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
      className={`label-caps shrink-0 select-none border-l border-border px-4 max-[22.5rem]:px-3 text-muted-foreground [-webkit-touch-callout:none] transition-[color,background-color] hover:bg-secondary hover:text-foreground active:bg-secondary active:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${className}`}
    >
      <span aria-hidden className="grid text-center">
        <span className={`${labelClasses} ${copied ? 'opacity-0 motion-safe:-translate-y-1' : ''}`}>Copy</span>
        <span className={`${labelClasses} ${copied ? '' : 'opacity-0 motion-safe:translate-y-1'}`}>Copied</span>
      </span>
      <span className="sr-only" aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      <span className="sr-only"> {label}</span>
    </button>
  );
};
