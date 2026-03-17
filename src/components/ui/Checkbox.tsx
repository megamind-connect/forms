"use client";
import React from "react";
import { Check } from "lucide-react";

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (name: string, checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({
  name,
  checked,
  onChange,
  label,
  className = "",
}: CheckboxProps) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer ${className}`}>
      <div className="relative mt-1">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(name, e.target.checked)}
          className="appearance-none w-5 h-5 border-2 border-[#D9D9D9] rounded-md cursor-pointer checked:border-[#F43F46] checked:bg-[#F43F46] transition-all"
        />
        {checked && (
          <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
        )}
      </div>
      {label && <span className="text-sm font-medium text-[#57534E] leading-relaxed">{label}</span>}
    </label>
  );
}
