"use client";

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { isDarkTheme, subscribeToTheme, toggleTheme } from '@/lib/theme';

// Both icons are always rendered and CSS picks one from the `.dark` class, so the
// server HTML is already correct and there's no icon flicker on hydration.
// `aria-pressed` tells screen readers whether dark mode is on (WCAG 4.1.2).
const iconClasses =
  'absolute inset-0 size-4 transition-[opacity,rotate,scale] duration-200 ease-out';

export const ThemeToggle = () => {
  const isDark = useSyncExternalStore(subscribeToTheme, isDarkTheme, () => true);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={isDark}
      className="rounded-full"
    >
      <span className="relative size-4">
        <Sun
          aria-hidden
          className={`${iconClasses} opacity-0 dark:opacity-100 not-dark:motion-safe:-rotate-90 not-dark:motion-safe:scale-90`}
        />
        <Moon
          aria-hidden
          className={`${iconClasses} opacity-100 dark:opacity-0 dark:motion-safe:rotate-90 dark:motion-safe:scale-90`}
        />
      </span>
    </Button>
  );
};
