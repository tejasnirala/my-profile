import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../../ui/Button';
import { PROFILE } from '../../../constants/profile';

type HeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
};

export const Header = ({ activeTab, setActiveTab, darkMode, toggleTheme }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex flex-col gap-4 md:gap-0 md:flex-row min-h-16 items-center justify-between px-4 md:px-8">
        <div className="mt-1 md:mt-0 flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer" onClick={() => setActiveTab('about')}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            TN
          </div>
          <span className="sm:inline-block">{PROFILE.name}</span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-4">
          {['About', 'Resume', 'Projects', 'Contact'].map((item) => (
            <Button
              key={item}
              variant={activeTab === item.toLowerCase() ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(item.toLowerCase())}
              className="text-xs sm:text-sm transition-all cursor-pointer"
            >
              {item}
            </Button>
          ))}
          <div className="ml-2 pl-2 border-l border-border">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-8 w-8 cursor-pointer">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

