import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <span role="img" aria-label="Moon icon representing dark mode">🌙</span>
      ) : (
        <span role="img" aria-label="Sun icon representing light mode">☀️</span>
      )}
      {/* Visually hidden text for screen readers */}
      <span className="sr-only">{`Currently in ${theme} mode. Click to switch to ${theme === 'light' ? 'dark' : 'light'} mode.`}</span>
    </button>
  );
};

export default ThemeToggle;