import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type Theme = 'light' | 'dark'; // Reintroduce dark mode as a possible theme

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void; // Reintroduce the function to toggle themes
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Helper function to determine the initial theme
const getInitialTheme = (): Theme => {
  // 1. Check localStorage for a user-preferred theme
  if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
    const storedTheme = localStorage.getItem('theme');
    // Ensure the stored theme is valid; default to 'light' if invalid or not 'dark'
    return (storedTheme === 'dark' ? 'dark' : 'light');
  }

  // 2. Check system preference (e.g., OS dark mode setting)
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  // 3. Default to light theme if no preference is found
  return 'light';
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // State to hold the current theme, initialized by getInitialTheme
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Memoized function to toggle the theme between 'light' and 'dark'
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []); // Dependencies array is empty as it doesn't depend on any props or state outside of prevTheme

  // Effect to apply the theme to the document and persist it to localStorage
  useEffect(() => {
    const rootElement = document.documentElement;

    // Set the 'data-theme' attribute on the root HTML element
    // This allows CSS to apply theme-specific styles using selectors like `[data-theme="dark"]`
    rootElement.setAttribute('data-theme', theme);

    // Set the 'color-scheme' CSS property on the root HTML element
    // This advises the browser on default form controls, scrollbars, etc., colors
    rootElement.style.setProperty('color-scheme', theme);

    // Persist the current theme to localStorage so it's remembered across sessions
    localStorage.setItem('theme', theme);
  }, [theme]); // Rerun this effect whenever the 'theme' state changes

  // The context value provides both the current theme and the function to toggle it
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