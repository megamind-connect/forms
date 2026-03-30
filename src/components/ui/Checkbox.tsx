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
    <label className={`flex items-start gap-3 cursor-pointer ${className} group`}>
      <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-0.5 md:mt-1">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(name, e.target.checked)}
          className="peer absolute m-0 appearance-none w-full h-full border-2 border-[#D9D9D9] rounded-md cursor-pointer checked:border-[#F43F46] checked:bg-[#F43F46] transition-all"
        />
        {checked && (
          <Check className="relative z-10 w-3.5 h-3.5 text-white pointer-events-none" strokeWidth={3} />
        )}
      </div>
      {label && <span className="text-sm font-medium text-[#57534E] leading-relaxed group-hover:text-black transition-colors">{label}</span>}
    </label>
  );
}
