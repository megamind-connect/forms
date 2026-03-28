"use client";
import React from "react";

interface RadioOption {
  label: string;
  value: string | boolean;
}

interface RadioGroupProps {
  name: string;
  value: string | boolean | null;
  options: RadioOption[];
  onChange: (name: string, value: string | boolean) => void;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  options,
  onChange,
  className = "",
}: RadioGroupProps) {
  return (
    <div className={`flex flex-wrap gap-x-8 gap-y-4 ${className}`}>
      {options.map((opt, idx) => (
        <label
          key={idx}
          className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#57534E]"
        >
          <div className="relative flex items-center">
            <input
              type="radio"
              name={name}
              checked={value === opt.value}
              onChange={() => onChange(name, opt.value)}
              className="appearance-none w-5 h-5 border-2 border-[#D9D9D9] rounded-full cursor-pointer checked:border-[#F43F46] transition-all"
            />
            {value === opt.value && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#F43F46] rounded-full" />
            )}
          </div>
          {opt.label}
        </label>
      ))}
    </div>
  );
}
