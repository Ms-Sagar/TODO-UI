import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button'; // Assuming Button.tsx is in the same directory and has a 'ghost' variant

interface ModalProps {
  /**
   * Whether the modal is currently open.
   */
  isOpen: boolean;
  /**
   * Callback function to close the modal.
   */
  onClose: () => void;
  /**
   * The title displayed in the modal header.
   */
  title: string;
  /**
   * The main content of the modal.
   */
  children: React.ReactNode;
  /**
   * Optional content for the modal footer (e.g., action buttons).
   */
  footer?: React.ReactNode;
  /**
   * Optional class name to apply to the modal content div for custom styling.
   */
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, className }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Effect to handle opening/closing and focus management
  useEffect(() => {
    if (isOpen) {
      // Store the element that was focused before the modal opened
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      // Set focus to the modal content
      // Use a timeout to ensure the modal is rendered and visible before attempting to focus
      const timer = setTimeout(() => {
        if (modalContentRef.current) {
          modalContentRef.current.focus();
        }
      }, 0); // 0ms timeout ensures it runs after DOM updates

      // Apply inert or aria-hidden to sibling elements to trap focus more robustly
      // For this basic implementation, we rely on aria-modal and programmatic focus.
      // A more complex solution would iterate over siblings of the modal container and apply aria-hidden=true.

      return () => {
        clearTimeout(timer); // Cleanup timeout on unmount or re-render
        // Return focus to the element that was focused before the modal opened
        if (previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
          previouslyFocusedElement.current = null; // Clear the reference
        }
      };
    } else {
      // If modal is closing and effect runs again (e.g., due to dependency change)
      // The return cleanup will handle focus.
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
        previouslyFocusedElement.current = null; // Clear the reference
      }
    }
  }, [isOpen]);

  // Effect to handle Escape key press for closing the modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        event.stopPropagation(); // Prevent other escape listeners from firing
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Handle click on the overlay to close the modal, but not on the modal content itself
  const handleOverlayClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  // Use createPortal to render the modal outside the main app div, typically directly under document.body.
  // This helps with z-index stacking context issues and ensures the modal is not clipped by parent `overflow: hidden` styles.
  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog" // ARIA role for a dialog
      aria-modal="true" // Indicates that this modal traps the user's focus
      aria-labelledby="modal-title" // Links to the modal title for accessibility
      // tabIndex={-1} // Not needed on overlay, focus managed on contentRef
    >
      <div
        ref={modalContentRef}
        className={`modal-content ${className || ''}`}
        // Add tabIndex to make the modal content itself focusable for programmatic focus management
        // and to allow it to receive keyboard events directly if needed.
        tabIndex={0}
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{title}</h2>
          <Button
            onClick={onClose}
            variant="ghost" // Assuming a 'ghost' variant for close buttons is available in Button.tsx
            aria-label="Close modal"
            className="modal-close-button"
          >
            &times;
          </Button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body // Append the modal to the body
  );
};

export default Modal;