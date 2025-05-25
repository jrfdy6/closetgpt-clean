'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    console.log('ThemeToggle mounted, current theme:', theme);
  }, [theme]);

  const handleThemeChange = () => {
    try {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      console.log('Changing theme from', theme, 'to', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error changing theme:', error);
    }
  };

  return (
    <button
      data-testid="theme-toggle"
      onClick={handleThemeChange}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle; 