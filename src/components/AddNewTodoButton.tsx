import React from 'react';
import './AddNewTodoButton.css'; // Import the CSS for this component

interface AddNewTodoButtonProps {
  onClick: () => void;
  isDisabled: boolean;
}

const AddNewTodoButton: React.FC<AddNewTodoButtonProps> = ({ onClick, isDisabled }) => {
  return (
    <button
      className="add-new-todo-button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label="Add a new todo item"
      title="Add a new todo item"
    >
      <span className="add-new-todo-button__icon" aria-hidden="true">+</span>
      <span className="add-new-todo-button__text">Add New Todo</span>
    </button>
  );
};

export default AddNewTodoButton;

/*
File: src/components/AddNewTodoButton.css
------------------------------------------
.add-new-todo-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border: none;
  border-radius: var(--border-radius-small);
  background-color: var(--color-add-new-todo-button-bg, #764ba2); /* Using the purple color as a variable */
  color: var(--color-add-new-todo-button-text, white);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: var(--shadow-small);
}

.add-new-todo-button:hover:not(:disabled) {
  background-color: var(--color-add-new-todo-button-hover-bg, #663e90); /* Darker purple on hover */
  box-shadow: var(--shadow-medium);
}

.add-new-todo-button:active:not(:disabled) {
  background-color: var(--color-add-new-todo-button-active-bg, #5c3480); /* Even darker purple on active */
  box-shadow: var(--shadow-inset);
}

.add-new-todo-button:disabled {
  background-color: var(--color-button-disabled-bg, #cccccc);
  color: var(--color-button-disabled-text, #666666);
  cursor: not-allowed;
  box-shadow: none;
}

.add-new-todo-button__icon {
  font-size: 1.5rem;
  margin-right: 8px;
  line-height: 1; /* Align icon vertically */
}

.add-new-todo-button__text {
  line-height: 1; /* Align text vertically */
}

*/