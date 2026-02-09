import React, { ButtonHTMLAttributes, FC } from 'react';

// Define the possible variants for the button
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'text' | 'success';

// Extend standard HTML button attributes to allow passing any native button props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content to be rendered inside the button.
   */
  children: React.ReactNode;
  /**
   * The visual style variant of the button.
   * Defaults to 'primary'.
   */
  variant?: ButtonVariant;
  /**
   * Additional CSS class names to apply to the button.
   */
  className?: string;
  /**
   * If true, the button will be disabled.
   */
  disabled?: boolean;
  /**
   * Callback function to be executed when the button is clicked.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Specifies the type of the button.
   * Defaults to 'button'.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * An accessible label for the button, especially important for icon-only buttons.
   */
  'aria-label'?: string;
}

/**
 * A reusable Button component with support for different visual variants.
 * Styles are defined in global CSS using classes like `button`, `button--primary`, etc.
 */
const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary', // Default variant is 'primary'
  className = '',
  disabled = false,
  onClick,
  type = 'button', // Default type is 'button'
  ...rest // Spread any other standard HTML button attributes
}) => {
  // Combine base class with variant-specific class and any custom classes
  // The trim() ensures no extra spaces if className is empty
  const buttonClasses = `button button--${variant} ${className}`.trim();

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...rest} // Pass all other HTML button attributes to the native button element
    >
      {children}
    </button>
  );
};

export default Button;