"use client";

import { Moon, Sun } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useTheme } from '../../../hooks/useTheme';

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full h-8 w-8 cursor-pointer"
    >
      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};
