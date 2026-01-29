import React from 'react';

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * FormField Component
 * 
 * Individual-type pattern for forms - wraps label + input + error message
 * Standardized spacing and styling for consistent form appearance
 * 
 * Usage:
 * <FormField label="Email" required error={errors.email}>
 *   <Input type="email" value={email} onChange={...} />
 * </FormField>
 */
const FormField = React.forwardRef<
  HTMLDivElement,
  FormFieldProps
>(
  ({ label, required, error, helperText, children, className }, ref) => (
    <div ref={ref} className={`w-full ${className || ''}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {children}
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

FormField.displayName = 'FormField';

export { FormField };
