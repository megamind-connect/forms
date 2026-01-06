"use client";
import React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex min-h-[160px] w-full rounded-md border-2 border-[#dedede8c] bg-transparent px-3 py-2 text-sm placeholder:text-[#8F8881] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-black ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
