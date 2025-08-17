import React, { useEffect, useState } from 'react';
import './Toast.css';

export interface ToastProps {
  /** Toast type */
  type?: 'success' | 'error' | 'warning' | 'info';
  /** Toast message */
  message: string;
  /** Toast title */
  title?: string;
  /** Auto-dismiss duration in milliseconds */
  duration?: number;
  /** Whether to show close button */
  closable?: boolean;
  /** Whether toast is visible */
  visible?: boolean;
  /** Toast position */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  /** Close handler */
  onClose?: () => void;
  /** Action button text */
  actionText?: string;
  /** Action button handler */
  onAction?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  title,
  duration = 5000,
  closable = true,
  visible = true,
  position = 'bottom-right',
  onClose,
  actionText,
  onAction,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (duration > 0 && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, isVisible]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300); // Match CSS transition duration
  };

  const handleAction = () => {
    onAction?.();
    handleClose();
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getTypeClass = () => `toast--${type}`;
  const getPositionClass = () => `toast--${position.replace('-', '-')}`;

  return (
    <div className={`toast ${getTypeClass()} ${getPositionClass()} ${isExiting ? 'toast--exiting' : ''}`}>
      <div className="toast-content">
        <div className="toast-icon">
          {getIcon()}
        </div>
        
        <div className="toast-body">
          {title && (
            <div className="toast-title">
              {title}
            </div>
          )}
          <div className="toast-message">
            {message}
          </div>
        </div>

        {actionText && (
          <button
            className="toast-action"
            onClick={handleAction}
          >
            {actionText}
          </button>
        )}

        {closable && (
          <button
            className="toast-close"
            onClick={handleClose}
            aria-label="Close toast"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
