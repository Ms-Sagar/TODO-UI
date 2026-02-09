import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from localStorage, or default to 'light'
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    // Optionally, you could detect system preference here:
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //   return 'dark';
    // }
    return 'light';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    // Apply theme to the document element for CSS variable scoping
    document.documentElement.setAttribute('data-theme', theme);
    // Set the document's color-scheme property
    document.documentElement.style.setProperty('color-scheme', theme);
    // Persist the theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Re-run effect whenever theme changes

  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};