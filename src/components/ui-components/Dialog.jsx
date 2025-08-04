import React from "react";

/**
 * Dialog Component - A modal dialog system
 *
 * This is the main container for modal dialogs. It creates a full-screen overlay
 * that centers the dialog content and handles click-outside-to-close functionality.
 *
 * @param {boolean} open - Controls whether the dialog is visible
 * @param {function} onOpenChange - Callback function called when dialog should close
 * @param {React.ReactNode} children - The content to render inside the dialog
 */
const Dialog = ({ open, onOpenChange, children }) => {
  // Early return if dialog is not open - prevents unnecessary rendering
  if (!open) return null;

  /**
   * Handles clicks on the overlay background
   * Only closes the dialog if the click target is the overlay itself,
   * not any child elements (like the dialog content)
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md"
      onClick={handleOverlayClick}
      style={{
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  );
};

/**
 * DialogContent Component - The actual dialog box container
 *
 * This component provides the white content box with styling, shadows,
 * and responsive sizing. It's the visual container for the dialog content.
 *
 * @param {React.ReactNode} children - The content to render inside the dialog box
 * @param {string} className - Additional CSS classes to apply
 */
const DialogContent = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 border border-gray-200 max-h-[85vh] overflow-y-auto ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * DialogHeader Component - Header section for dialog content
 *
 * Provides consistent spacing and centering for dialog headers.
 * Typically contains the DialogTitle and DialogDescription.
 *
 * @param {React.ReactNode} children - Usually DialogTitle and DialogDescription
 * @param {string} className - Additional CSS classes to apply
 */
const DialogHeader = ({ children, className = "" }) => {
  return <div className={`text-center mb-4 ${className}`}>{children}</div>;
};

/**
 * DialogTitle Component - Main title/heading for the dialog
 *
 * Renders the primary heading for the dialog with consistent typography.
 * Should be used within DialogHeader for proper spacing.
 *
 * @param {React.ReactNode} children - The title text or elements
 * @param {string} className - Additional CSS classes to apply
 */
const DialogTitle = ({ children, className = "" }) => {
  return (
    <h2 className={`text-xl font-semibold text-black ${className}`}>
      {children}
    </h2>
  );
};

/**
 * DialogDescription Component - Subtitle/description for the dialog
 *
 * Provides secondary information below the title with muted styling.
 * Should be used within DialogHeader after DialogTitle.
 *
 * @param {React.ReactNode} children - The description text or elements
 * @param {string} className - Additional CSS classes to apply
 */
const DialogDescription = ({ children, className = "" }) => {
  return (
    <p className={`text-sm text-gray-600 mt-2 ${className}`}>{children}</p>
  );
};

// Export all dialog components for use in other parts of the application
export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle };
