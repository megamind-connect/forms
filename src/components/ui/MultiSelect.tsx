"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  name: string;
  value: string[];
  options: Option[];
  placeholder: string;
  onChange: (name: string, value: string[]) => void;
  className?: string;
}

export function MultiSelect({
  name,
  value = [],
  options,
  placeholder,
  onChange,
  className = "",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(name, newValue);
  };

  const removeOption = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation();
    onChange(name, value.filter((v) => v !== optionValue));
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between
          w-full border border-[#D9D9D9] rounded-md p-2 px-3 text-sm
          focus-within:border-red-500
          bg-transparent min-h-[48px] h-auto transition-all duration-300 ease-in-out cursor-pointer
        `}
      >
        <div className="flex flex-wrap gap-1 items-center">
          {value.length === 0 ? (
            <span className="text-[#8F8881]">{placeholder}</span>
          ) : (
            value.map((v) => {
              const opt = options.find((o) => o.value === v);
              return (
                <span
                  key={v}
                  className="bg-gray-100 text-black px-2 py-0.5 rounded-sm flex items-center gap-1 text-xs"
                >
                  {opt?.label || v}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-500"
                    onClick={(e) => removeOption(e, v)}
                  />
                </span>
              );
            })
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#8F8881]" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute shadow-2xl z-100 w-full mt-1 bg-white border border-[#D9D9D9] rounded-md max-h-60 overflow-auto"
          >
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => toggleOption(option.value)}
                className={`
                  px-3 py-2 text-sm cursor-pointer transition-colors flex items-center gap-2
                  ${value.includes(option.value) ? "bg-red-50 text-[#F43F46]" : "text-black hover:bg-gray-100"}
                `}
              >
                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${value.includes(option.value) ? "border-[#F43F46] bg-[#F43F46]" : "border-gray-300"}`}>
                  {value.includes(option.value) && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
