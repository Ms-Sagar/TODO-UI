import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Used for temporary IDs if needed for new items, but the parent App.tsx usually assigns the final one.

// --- Types (Ensures component self-sufficiency for type definitions, matching TodoItem.tsx) ---
type Priority = 'low' | 'medium' | 'high';
type Status = 'pending' | 'in-progress' | 'completed';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string; // ISO string (e.g., 'YYYY-MM-DD')
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

// Form state interface, slightly different from Todo as it reflects current form inputs
interface TodoFormState {
  title: string;
  description: string;
  dueDate: string; // Stored as 'YYYY-MM-DD' for input type="date"
  priority: Priority;
  status: Status;
}

interface TodoFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: Partial<Todo>) => void; // Partial<Todo> allows for both creation (no id) and update (with id)
  editingTodo?: Todo; // If provided, the form is in edit mode, pre-populating fields
}

const defaultFormState: TodoFormState = {
  title: '',
  description: '',
  dueDate: '', // Empty string for no selected date
  priority: 'medium',
  status: 'pending',
};

const TodoFormModal: React.FC<TodoFormModalProps> = ({ isOpen, onClose, onSave, editingTodo }) => {
  const [formData, setFormData] = useState<TodoFormState>(defaultFormState);
  const titleInputRef = useRef<HTMLInputElement>(null); // For focusing the title input on modal open

  useEffect(() => {
    if (isOpen) {
      if (editingTodo) {
        // Pre-populate form fields when editing an existing todo
        setFormData({
          title: editingTodo.title,
          description: editingTodo.description,
          // Format date for input type="date" (YYYY-MM-DD)
          dueDate: editingTodo.dueDate ? new Date(editingTodo.dueDate).toISOString().split('T')[0] : '',
          priority: editingTodo.priority,
          status: editingTodo.status,
        });
      } else {
        // Reset form for adding a new todo
        setFormData(defaultFormState);
      }
      // Focus the title input when the modal opens
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, editingTodo]);

  // Handle keyboard events for accessibility (e.g., Escape key to close)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation: Title is required
    if (!formData.title.trim()) {
      alert('Todo title cannot be empty.');
      titleInputRef.current?.focus();
      return;
    }

    // Construct the todo object to be saved
    const todoToSave: Partial<Todo> = {
      ...formData,
      // Derive 'completed' status from the 'status' field
      completed: formData.status === 'completed',
      // Include the original ID if editing, otherwise it will be undefined for new todos
      ...(editingTodo && { id: editingTodo.id }),
      // `createdAt` and `updatedAt` are typically managed by the parent component (App.tsx)
      // or a backend service, so they are not included in the form's direct output.
    };

    onSave(todoToSave); // Call the onSave callback with the new/updated todo data
    onClose(); // Close the modal after saving
  };

  if (!isOpen) {
    return null; // Don't render anything if the modal is not open
  }

  // Unique ID for aria-labelledby to associate the modal title with the dialog
  const modalTitleId = 'todo-form-modal-title';

  return (
    <div
      className="modal-overlay"
      onClick={onClose} // Close modal if overlay is clicked
      aria-modal="true" // Indicate that the dialog is modal and blocks content behind it
      role="dialog" // Indicate that this is a dialog window
      aria-labelledby={modalTitleId} // Associate the dialog with its title
      tabIndex={-1} // Ensure the overlay can receive focus programmatically if needed, but not via tab key
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()} // Prevent clicks inside the modal content from closing the modal
        role="document" // Indicates that the element is a container for a set of related content
      >
        <div className="modal-header">
          <h2 id={modalTitleId}>{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal" // Provide accessible label for the close button
          >
            &times; {/* HTML entity for a multiplication sign, commonly used as a close icon */}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-group">
            <label htmlFor="title">Title <span className="required">*</span></label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Buy groceries"
              required // HTML5 built-in validation
              aria-required="true" // ARIA attribute for required fields
              ref={titleInputRef} // Ref to focus this input
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Milk, bread, eggs, vegetables..."
              rows={3}
              aria-description="Provide additional details for the todo item"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              aria-description="Select a due date for the todo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              aria-description="Select the priority level for the todo"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              aria-description="Select the current status of the todo"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingTodo ? 'Save Changes' : 'Add Todo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoFormModal;