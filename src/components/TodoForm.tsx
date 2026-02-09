import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from './Button'; // Assuming Button.tsx is in the same directory

// Define types for priority, matching App.tsx
type Priority = 'low' | 'medium' | 'high';

/**
 * Props for the TodoForm component.
 */
interface TodoFormProps {
  /**
   * Callback function to add a new todo.
   * @param text The text of the new todo.
   * @param priority The priority of the new todo.
   */
  onAddTodo: (text: string, priority: Priority) => void;
  /**
   * Indicates if an operation is currently loading, disabling the form.
   */
  isLoading: boolean;
}

/**
 * A form component for adding new todos.
 * It includes an input field for the todo text, a priority selector, and an "Add Todo" button.
 * The form is disabled when isLoading is true.
 */
const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, isLoading }) => {
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [newTodoPriority, setNewTodoPriority] = useState<Priority>('medium');

  /**
   * Handles changes to the todo text input field.
   * @param e The change event from the input element.
   */
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  /**
   * Handles changes to the todo priority select field.
   * @param e The change event from the select element.
   */
  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewTodoPriority(e.target.value as Priority);
  };

  /**
   * Handles the form submission.
   * Prevents default form behavior, validates input, calls onAddTodo, and resets the form.
   * @param e The form submission event.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedText = newTodoText.trim();

    if (trimmedText) {
      onAddTodo(trimmedText, newTodoPriority);
      setNewTodoText(''); // Clear the input field after successful submission
      setNewTodoPriority('medium'); // Reset priority to default
    } else {
      // Optional: Provide user feedback (e.g., a toast or visual highlight) for empty input
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} aria-label="Add new todo form">
      <div className="todo-form__input-group">
        <label htmlFor="todo-text" className="visually-hidden">
          New Todo Text
        </label>
        <input
          type="text"
          id="todo-text"
          className="todo-form__input"
          placeholder="What needs to be done?"
          value={newTodoText}
          onChange={handleTextChange}
          disabled={isLoading}
          aria-label="Enter new todo text"
          required
          autoFocus // Focus on the input when the component mounts for better UX
        />

        <label htmlFor="todo-priority" className="visually-hidden">
          Priority
        </label>
        <select
          id="todo-priority"
          className="todo-form__priority-select"
          value={newTodoPriority}
          onChange={handlePriorityChange}
          disabled={isLoading}
          aria-label="Select todo priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <Button
        type="submit"
        className="todo-form__add-button" // Apply custom styling for the purple button
        disabled={isLoading || !newTodoText.trim()} // Disable if loading or text is empty
        aria-label="Add todo"
      >
        Add Todo
      </Button>
    </form>
  );
};

export default TodoForm;