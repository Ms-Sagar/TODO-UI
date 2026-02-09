import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="theme-toggle-button"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <span role="img" aria-label="Dark mode icon">🌙</span> // Moon icon for light mode, suggesting switch to dark
      ) : (
        <span role="img" aria-label="Light mode icon">☀️</span> // Sun icon for dark mode, suggesting switch to light
      )}
    </button>
  );
};

export default ThemeToggle;