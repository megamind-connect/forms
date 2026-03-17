"use client";
import React from 'react';

// We can add variants later (e.g., for primary, secondary, destructive buttons)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost' | 'destructive';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-[#F43F46] text-white hover:bg-red-600 shadow-lg shadow-red-200',
      outline: 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
      destructive: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
      <button
        className={`inline-flex items-center justify-center rounded-md px-4 cursor-pointer py-2 text-sm font-medium transition-all focus:outline-none outline-none disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
