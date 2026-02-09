import React from 'react';
import { useTheme } from '../hooks/useTheme';

/**
 * ThemeToggle component provides a button to switch between light and dark modes.
 * It uses the `useTheme` hook to access the current theme and the theme toggling function.
 *
 * The button displays an icon (moon for light mode, sun for dark mode) representing
 * the theme it will switch to upon click.
 *
 * Accessibility is ensured with `aria-label` and `title` attributes,
 * and a visually hidden span for screen readers using the 'sr-only' class.
 */
const ThemeToggle: React.FC = () => {
  // Destructure the current theme and the toggle function from the theme context
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      // Accessibility label indicating the action the button will perform
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      // Title for hover tooltip, also indicating the action
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // If current theme is light, display a moon icon, implying it will switch to dark mode
        <span role="img" aria-label="moon icon">🌙</span>
      ) : (
        // If current theme is dark, display a sun icon, implying it will switch to light mode
        <span role="img" aria-label="sun icon">☀️</span>
      )}
      {/*
        A span with 'sr-only' class provides text for screen readers.
        This text explicitly describes the action, enhancing accessibility,
        while being visually hidden for sighted users.
      */}
      <span className="sr-only">
        {`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      </span>
    </button>
  );
};

export default ThemeToggle;