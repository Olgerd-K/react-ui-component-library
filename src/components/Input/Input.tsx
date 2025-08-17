import React, { useState } from 'react';
import './Input.css';

export interface InputProps {
  /** Input type */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel';
  /** Input placeholder */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Input label */
  label?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is clearable */
  clearable?: boolean;
  /** Error message */
  error?: string;
  /** Success state */
  success?: boolean;
  /** Input size */
  size?: 'small' | 'medium' | 'large';
  /** Maximum character count */
  maxLength?: number;
  /** Show character counter */
  showCounter?: boolean;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value = '',
  label,
  disabled = false,
  clearable = false,
  error,
  success = false,
  size = 'medium',
  maxLength,
  showCounter = false,
  onChange,
  onFocus,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasValue = inputValue.length > 0;
  const showClearButton = clearable && hasValue && !disabled;
  const showMaxLength = maxLength && showCounter;
  const isAtMaxLength = maxLength && inputValue.length >= maxLength;

  return (
    <div className={`input-container input--${size}`}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <div className={`input-wrapper ${isFocused ? 'input-wrapper--focused' : ''} ${error ? 'input-wrapper--error' : ''} ${success ? 'input-wrapper--success' : ''} ${isAtMaxLength ? 'input-wrapper--max-length' : ''}`}>
        <input
          type={inputType}
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="input-field"
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="input-icon input-icon--password"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
        
        {showClearButton && (
          <button
            type="button"
            className="input-icon input-icon--clear"
            onClick={handleClear}
            aria-label="Clear input"
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="input-footer">
        {error && (
          <div className="input-error">
            {error}
          </div>
        )}
        
        {showMaxLength && (
          <div className={`input-counter ${isAtMaxLength ? 'input-counter--max' : ''}`}>
            {inputValue.length}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
};
