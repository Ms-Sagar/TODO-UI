import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Determine the next theme and corresponding label/icon
  const isDarkMode = theme === 'dark';
  const nextThemeLabel = isDarkMode ? 'Light Mode' : 'Dark Mode';
  // Display current theme's opposite icon to suggest switching to it
  const icon = isDarkMode ? '☀️' : '🌙'; 

  return (
    <button
      type="button" // Explicitly set type to button to prevent default form submission
      onClick={toggleTheme}
      className="theme-toggle" // Class for applying styles defined in App.css or index.css
      aria-label={`Toggle ${nextThemeLabel}`} // Accessible label for screen readers
      title={`Switch to ${nextThemeLabel}`} // Tooltip for visual users
    >
      <span role="img" aria-hidden="true">{icon}</span> {/* Visual icon */}
      <span className="theme-toggle-text">{nextThemeLabel}</span> {/* Text label */}
    </button>
  );
};

export default ThemeToggle;