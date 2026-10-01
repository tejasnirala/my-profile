"use client";

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { toggleTheme } from '@/lib/theme';

// Both icons are always rendered and CSS picks one from the `.dark` class, so the
// server HTML is already correct and there's no icon flicker on hydration.
export const ThemeToggle = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="rounded-full h-8 w-8 cursor-pointer"
    >
      <Sun aria-hidden className="hidden h-4 w-4 dark:block" />
      <Moon aria-hidden className="h-4 w-4 dark:hidden" />
    </Button>
  );
};
