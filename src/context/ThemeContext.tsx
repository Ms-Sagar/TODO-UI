import React, { createContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';

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
    // Attempt to read theme from localStorage for persistence
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    // If no theme is stored, check the user's system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // Default to light theme if no preference is found
    return 'light';
  });

  // Function to toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []); // useCallback ensures this function's reference is stable

  // Effect to apply the theme to the document and persist it in localStorage
  useEffect(() => {
    // Apply the current theme to the document's root element as a data attribute
    // This allows CSS to apply different styles based on [data-theme="light"] or [data-theme="dark"]
    document.documentElement.setAttribute('data-theme', theme);

    // Set the document's color-scheme property for browser-level UI elements (like scrollbars)
    document.documentElement.style.setProperty('color-scheme', theme);

    // Persist the current theme to localStorage so it remembers user's choice
    localStorage.setItem('theme', theme);
  }, [theme]); // Re-run this effect whenever the theme state changes

  // Memoize the context value to prevent unnecessary re-renders of consuming components
  // unless 'theme' or 'toggleTheme' (which is stable) actually changes.
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};