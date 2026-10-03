import { CopyButton } from '@/components/ui/CopyButton';

type CommandLineProps = {
  /** Text after the `$` prompt. */
  command: string;
  /** What COPY puts on the clipboard (defaults to the command). */
  copyText?: string;
  copyLabel: string;
  className?: string;
};

/** A terminal-style line, `$ command`, with a COPY button on the right. */
export const CommandLine = ({ command, copyText = command, copyLabel, className = '' }: CommandLineProps) => (
  <div className={`flex h-14 items-stretch border border-input bg-card ${className}`}>
    <p className="flex min-w-0 flex-1 items-center gap-3 px-4 text-sm sm:text-base">
      <span aria-hidden className="text-brand">$</span>
      <span className="truncate">{command}</span>
    </p>
    <CopyButton text={copyText} label={copyLabel} />
  </div>
);
