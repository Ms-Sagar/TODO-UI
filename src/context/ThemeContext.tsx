import React, { createContext, useState, useEffect, ReactNode } from 'react';

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
    // Attempt to read theme from localStorage on initial render
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }
    // If no theme is stored, check the user's system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Effect to apply the theme to the document and persist it
  useEffect(() => {
    // Apply data-theme attribute to the root HTML element
    document.documentElement.setAttribute('data-theme', theme);
    // Set the document's color-scheme property
    document.documentElement.style.setProperty('color-scheme', theme);
    // Persist the current theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Rerun effect whenever the theme state changes

  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // The context value provides both the current theme and the toggle function
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};