"use client";
import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`flex h-10 w-full rounded-md border-2 border-[#dedede8c] bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 text-black ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

