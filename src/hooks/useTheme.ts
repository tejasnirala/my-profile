import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const isDark = savedTheme ? savedTheme === 'dark' : true;
      setDarkMode(isDark);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (typeof window !== 'undefined') {
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  return { darkMode, toggleTheme };
};

