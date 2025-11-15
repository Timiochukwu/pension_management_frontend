/**
 * THEME TOGGLE COMPONENT
 *
 * Button to switch between light and dark mode
 */

import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme, setTheme } = useThemeStore();

  // Initialize theme on mount
  useEffect(() => {
    setTheme(isDarkMode);
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600" />
      )}
    </button>
  );
};
