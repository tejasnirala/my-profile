import { CopyButton } from '@/components/ui/CopyButton';

type CommandLineProps = {
  /** Text after the `$` prompt. */
  command: string;
  /** Optional word before the command ("mail"), dropped on phones so the
      command itself (e.g. a full email address) fits without truncating. */
  verb?: string;
  /** What COPY puts on the clipboard (defaults to the command). */
  copyText?: string;
  copyLabel: string;
  className?: string;
};

/** A terminal-style line, `$ command`, with a COPY button on the right. */
export const CommandLine = ({ command, verb, copyText = command, copyLabel, className = '' }: CommandLineProps) => (
  <div className={`flex h-14 items-stretch border border-input bg-card ${className}`}>
    <p className="flex min-w-0 flex-1 items-center gap-2 px-3 text-[0.8125rem] max-[22.5rem]:text-xs sm:gap-3 sm:px-4 sm:text-base">
      <span aria-hidden className="text-brand">$</span>
      {/* Phones get the bare command; from sm the verb is included. Two
          elements rather than a split string, so each renders as one text run. */}
      <span className={`truncate ${verb ? 'max-sm:hidden' : ''}`}>{verb ? `${verb} ${command}` : command}</span>
      {verb && <span className="truncate sm:hidden">{command}</span>}
    </p>
    <CopyButton text={copyText} label={copyLabel} />
  </div>
);
