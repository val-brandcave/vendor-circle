import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, helperText, ...props }, ref) => (
    <div className="w-full">
      <input
        type={type}
        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? 'border-destructive focus:ring-destructive dark:border-destructive'
            : 'border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-transparent dark:focus:border-transparent'
        } ${className || ''}`}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive dark:text-destructive-400">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  )
);

Input.displayName = 'Input';

export { Input };
