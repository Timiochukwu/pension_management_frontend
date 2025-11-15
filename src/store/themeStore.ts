/**
 * THEME STORE (Zustand)
 *
 * Global state management for theme (light/dark mode)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,

      /**
       * TOGGLE THEME
       *
       * Switches between light and dark mode
       */
      toggleTheme: () =>
        set((state) => {
          const newMode = !state.isDarkMode;
          // Update DOM
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: newMode };
        }),

      /**
       * SET THEME
       *
       * Sets theme explicitly
       */
      setTheme: (isDark) =>
        set(() => {
          // Update DOM
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { isDarkMode: isDark };
        }),
    }),
    {
      name: 'theme-storage', // localStorage key
    }
  )
);
