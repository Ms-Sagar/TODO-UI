import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <>
          <span role="img" aria-label="sun icon">☀️</span> Light
        </>
      ) : (
        <>
          <span role="img" aria-label="moon icon">🌙</span> Dark
        </>
      )}
    </button>
  );
};

export default ThemeToggle;