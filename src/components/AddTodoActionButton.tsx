import React from 'react';

// Define the props interface for the AddTodoActionButton component
interface AddTodoActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content to be rendered inside the button, typically text like "Add Todo".
   */
  children: React.ReactNode;
  // Any additional specific props can be added here if needed,
  // but standard HTML button attributes are already covered by extends React.ButtonHTMLAttributes.
}

/**
 * A reusable button component specifically styled for "Add Todo" actions.
 * It provides a consistent look, typically green to signify a success or creation action.
 *
 * This component will apply a base class `add-todo-button` which should be styled
 * in `src/App.css` to achieve the desired green color and other button styles.
 *
 * @param {AddTodoActionButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered button component.
 */
const AddTodoActionButton: React.FC<AddTodoActionButtonProps> = ({
  children,
  className = '', // Allows consumers to add extra classes for specific overrides
  type = 'button', // Default to 'button' type to prevent unintended form submissions if not explicitly inside a form or meant to submit
  ...props // Spreads any other standard HTML button attributes (e.g., onClick, disabled, style)
}) => {
  // Determine an appropriate aria-label for accessibility.
  // If children is a string, use it. Otherwise, provide a default descriptive label.
  const ariaLabel = typeof children === 'string' ? children : 'Add new todo item';

  return (
    <button
      type={type}
      className={`add-todo-button ${className}`} // 'add-todo-button' class will be styled in App.css for the green theme
      aria-label={ariaLabel}
      {...props} // Apply all other passed-through props
    >
      {children}
    </button>
  );
};

export default AddTodoActionButton;